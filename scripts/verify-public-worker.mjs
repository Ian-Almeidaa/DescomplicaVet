import fs from "node:fs";
import assert from "node:assert/strict";
import crypto from "node:crypto";

const origin = new URL(process.argv[2] ?? "https://descomplicavetmt.studiocriandoweb.workers.dev");
assert.equal(origin.protocol, "https:");
assert(
  origin.hostname === "descomplicavetmt.studiocriandoweb.workers.dev" ||
    ["descomplicavetmt.com.br", "www.descomplicavetmt.com.br"].includes(origin.hostname),
);
assert.equal(origin.pathname, "/");
const assets = JSON.parse(
  fs.readFileSync("docs/preparacao-cloudflare/imagens-recuperadas.json", "utf8"),
);
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const probes = [
  ["/", 200],
  ["/politica-de-privacidade", 200],
  ["/sitemap.xml", 200],
  ["/robots.txt", 200],
  ["/favicon.png", 200],
  ["/verificacao-rota-inexistente", 404],
  ...assets.map((asset) => [`/images/${asset.filename}`, 200]),
];
const evidence = { checkedAt: new Date().toISOString(), origin: origin.origin, results: [] };
let firstNonce;
const output = `docs/preparacao-cloudflare/publico-${origin.hostname}.json`;
try {
  for (const [pathname, status] of probes) {
    const response = await fetch(new URL(pathname, origin), { signal: AbortSignal.timeout(30000) });
    const bytes = Buffer.from(await response.arrayBuffer());
    const text = bytes.toString("utf8");
    evidence.results.push({
      pathname,
      url: response.url,
      status: response.status,
      bytes: bytes.length,
      sha256: hash(bytes),
      headers: Object.fromEntries(response.headers),
    });
    assert.equal(response.status, status, pathname);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff", pathname);
    assert.equal(response.headers.get("x-frame-options"), "DENY", pathname);
    if (response.headers.get("content-type")?.includes("text/html")) {
      const nonce = response.headers.get("content-security-policy")?.match(/'nonce-([^']+)'/)?.[1];
      assert(nonce, `Missing CSP nonce: ${pathname}`);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert(response.headers.get("strict-transport-security")?.includes("max-age=31536000"));
      assert(
        !/@lovable\.dev|__lovable|\/__l5e\//i.test(text),
        `Lovable runtime reference: ${pathname}`,
      );
      const scripts = [...text.matchAll(/<script\b([^>]*)>/g)];
      assert(scripts.length > 0);
      for (const [, attributes] of scripts) {
        if (!/type="application\/ld\+json"/.test(attributes))
          assert(attributes.includes(`nonce="${nonce}"`), `Nonce mismatch: ${pathname}`);
      }
      if (pathname === "/") {
        firstNonce = nonce;
        assert(text.includes("Consultoria e Assessoria Técnica Especializada"));
        for (const asset of assets) assert(text.includes(`/images/${asset.filename}`));
        assert(text.includes("https://descomplicavetmt.com.br/images/capa-cris.png"));
        const linked = [
          ...new Set(
            [...text.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)].map((match) => match[1]),
          ),
        ];
        assert(
          linked.some((asset) => asset.endsWith(".js")) &&
            linked.some((asset) => asset.endsWith(".css")),
        );
        for (const asset of linked) {
          const linkedResponse = await fetch(new URL(asset, origin), {
            signal: AbortSignal.timeout(30000),
          });
          assert.equal(linkedResponse.status, 200, asset);
        }
      }
    }
    if (pathname === "/sitemap.xml") {
      assert(response.headers.get("content-type")?.includes("application/xml"));
      assert(text.includes("<loc>https://descomplicavetmt.com.br/</loc>"));
      assert(text.includes("<loc>https://descomplicavetmt.com.br/politica-de-privacidade</loc>"));
    }
    const asset = assets.find((asset) => pathname === `/images/${asset.filename}`);
    if (asset) {
      assert(response.headers.get("content-type")?.includes("image/png"));
      assert.equal(hash(bytes), asset.sha256, pathname);
    }
  }
  const next = await fetch(origin, { signal: AbortSignal.timeout(30000) });
  assert.equal(next.status, 200);
  const nextNonce = next.headers.get("content-security-policy")?.match(/'nonce-([^']+)'/)?.[1];
  assert(nextNonce && nextNonce !== firstNonce, "Nonce did not rotate");
  const head = await fetch(origin, { method: "HEAD", signal: AbortSignal.timeout(30000) });
  assert.equal(head.status, 200);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
  evidence.nonceRotation = true;
  evidence.head = true;
  evidence.success = true;
  console.log(`PUBLIC_WORKER_OK: ${origin.origin}`);
} catch (error) {
  evidence.success = false;
  evidence.error = error.message;
  throw error;
} finally {
  fs.writeFileSync(output, `${JSON.stringify(evidence, null, 2)}\n`);
}
