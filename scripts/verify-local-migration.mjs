import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";

const outputDirectory = "docs/preparacao-cloudflare";
fs.mkdirSync(outputDirectory, { recursive: true });
const read = (file) => fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
const json = (file) => JSON.parse(read(file));
const save = (name, value) =>
  fs.writeFileSync(`${outputDirectory}/${name}.json`, `${JSON.stringify(value, null, 2)}\n`);
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const env = { ...process.env, WRANGLER_SEND_METRICS: "false", CI: "true" };
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });

function runNode(script, args, timeout = 120000) {
  const result = spawnSync(process.execPath, [script, ...args], {
    env,
    encoding: "utf8",
    windowsHide: true,
    timeout,
    maxBuffer: 4 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const evidence = {
    command: ["node", script, ...args],
    status: result.status,
    error: result.error?.message,
    outputHash: hash(output),
    output,
  };
  if (result.status !== 0) console.error(output);
  return evidence;
}

function findLovable(text) {
  return /@lovable\.dev\/|__lovable|\b(?:[a-z0-9-]+\.)?lovable\.(?:app|dev|com)|\/__l5e\//i.test(
    text,
  );
}

function independence() {
  assert(findLovable('import "@lovable.dev/vite-tanstack-config";'), "Positive control failed");
  assert(findLovable('src="/__l5e/assets-v1/test/image.png"'), "Asset positive control failed");
  assert(!findLovable('src="/images/capa-cris.png"'), "Local asset control failed");
  const files = [
    ...walk("src").filter((file) => /\.(tsx?|css|json)$/.test(file)),
    "package.json",
    "bun.lock",
    "vite.config.ts",
    "wrangler.jsonc",
    "bunfig.toml",
  ];
  for (const file of files) assert(!findLovable(read(file)), `Active Lovable reference in ${file}`);
  const manifest = json("package.json");
  assert(!manifest.dependencies["@tanstack/react-query"]);
  assert(!manifest.devDependencies.nitro);
  assert(manifest.devDependencies["@cloudflare/vite-plugin"]);
  assert(!fs.existsSync(".lovable"), "Retired project metadata is still active");
  if (fs.existsSync("dist/client/assets")) {
    for (const file of walk("dist/client/assets").filter((file) => /\.(js|css)$/.test(file))) {
      assert(!findLovable(read(file)), `Lovable reference in client build: ${file}`);
      assert(!read(file).includes("x-internal-csp-nonce"), `Server code leaked to client: ${file}`);
    }
  }
  save("independencia", {
    checkedAt: new Date().toISOString(),
    files: files.length,
    positiveControlsPassed: true,
    directDependencies:
      Object.keys(manifest.dependencies).length + Object.keys(manifest.devDependencies).length,
    hashes: Object.fromEntries(files.map((file) => [file, hash(fs.readFileSync(file))])),
  });
  console.log("INDEPENDENCE_OK");
}

function assets() {
  const records = json(`${outputDirectory}/imagens-recuperadas.json`);
  const expected = [
    "capa-cris.png",
    "capa-ebook.png",
    "descomplica-circle.png",
    "descomplica-mark.png",
  ];
  assert.deepEqual(records.map((record) => record.filename).sort(), expected.sort());
  for (const record of records) {
    const bytes = fs.readFileSync(`public/images/${record.filename}`);
    assert.equal(hash(bytes), record.sha256, record.filename);
    assert.equal(bytes.length, record.bytes, record.filename);
    assert.equal(bytes.readUInt32BE(16), record.width);
    assert.equal(bytes.readUInt32BE(20), record.height);
    assert(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])));
    assert.equal(new URL(record.source).origin, "https://descomplicavetmt.com.br");
    assert(read("src/lib/site-assets.ts").includes(`/images/${record.filename}`));
  }
  console.log("ORIGINAL_ASSETS_OK");
}

function toolchain() {
  const commands = [
    ["node_modules/wrangler/bin/wrangler.js", ["types"]],
    ["node_modules/vite/bin/vite.js", ["build"]],
    ["node_modules/typescript/bin/tsc", ["--noEmit", "--pretty", "false"]],
    [
      "node_modules/eslint/bin/eslint.js",
      ["src", "vite.config.ts", "eslint.config.js", "scripts", "--max-warnings", "0"],
    ],
  ];
  const results = [];
  for (const [script, args] of commands) {
    const result = runNode(script, args);
    results.push(result);
    save("toolchain", { checkedAt: new Date().toISOString(), results });
    assert.equal(result.status, 0, `Failed: ${script} ${args.join(" ")}`);
  }
  console.log("TOOLCHAIN_OK");
}

function audit() {
  const bun =
    process.env.BUN_EXECUTABLE ??
    (process.platform === "win32"
      ? path.join(process.env.APPDATA, "npm/node_modules/bun/bin/bun.exe")
      : "bun");
  const result = spawnSync(bun, ["audit", "--json"], {
    env,
    encoding: "utf8",
    windowsHide: true,
    timeout: 60000,
  });
  assert(
    [0, 1].includes(result.status),
    `Audit process failed: ${result.error?.message ?? result.stderr}`,
  );
  const advisories = JSON.parse(result.stdout);
  assert(advisories && typeof advisories === "object" && !Array.isArray(advisories));
  assert(Object.values(advisories).every(Array.isArray));
  const records = Object.values(advisories).flat();
  const relevant = records.filter((record) => ["high", "critical"].includes(record.severity));
  save("auditoria-dependencias", {
    checkedAt: new Date().toISOString(),
    status: result.status,
    advisories,
  });
  assert.equal(
    relevant.length,
    0,
    `High/critical advisories: ${relevant.map((record) => record.title).join(", ")}`,
  );
  console.log(`DEPENDENCY_AUDIT_OK: ${records.length} remaining advisory records`);
}

async function runtime() {
  const port = 4175;
  const base = `http://127.0.0.1:${port}`;
  let output = "";
  const server = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
      "--strictPort",
    ],
    { env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (data) => {
    output += data.toString();
  });
  server.stderr.on("data", (data) => {
    output += data.toString();
  });
  const results = [];
  try {
    let ready = false;
    const deadline = Date.now() + 45000;
    while (Date.now() < deadline) {
      assert.equal(server.exitCode, null, `Preview exited: ${output}`);
      try {
        const response = await fetch(base, { signal: AbortSignal.timeout(2000) });
        if (response.status === 200) {
          ready = true;
          break;
        }
      } catch {
        /* The runtime is still starting. */
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    assert(ready, `Preview did not become ready: ${output}`);
    const pages = [
      ["/", 200],
      ["/politica-de-privacidade", 200],
      ["/sitemap.xml", 200],
      ["/robots.txt", 200],
      ["/favicon.png", 200],
      ["/auditoria-rota-inexistente", 404],
    ];
    const assetRecords = json(`${outputDirectory}/imagens-recuperadas.json`);
    const probes = [...pages, ...assetRecords.map((record) => [`/images/${record.filename}`, 200])];
    let firstNonce;
    for (const [pathname, expectedStatus] of probes) {
      const response = await fetch(`${base}${pathname}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.equal(response.status, expectedStatus, pathname);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff", pathname);
      assert.equal(response.headers.get("x-frame-options"), "DENY", pathname);
      const text = bytes.toString("utf8");
      if (response.headers.get("content-type")?.includes("text/html")) {
        const csp = response.headers.get("content-security-policy");
        const nonce = csp?.match(/'nonce-([^']+)'/)?.[1];
        assert(nonce, `Missing nonce CSP: ${pathname}`);
        assert(!findLovable(text), pathname);
        const executableScripts = [...text.matchAll(/<script\b([^>]*)>/g)].filter(
          ([, attrs]) => !/type="application\/ld\+json"/.test(attrs),
        );
        assert(executableScripts.length > 0, pathname);
        for (const [, attrs] of executableScripts)
          assert(
            attrs.includes(`nonce="${nonce}"`),
            `Script missing matching nonce: ${pathname}: ${attrs}`,
          );
        assert.equal(response.headers.get("cache-control"), "no-store");
        if (pathname === "/") {
          firstNonce = nonce;
          assert(text.includes("Consultoria e Assessoria Técnica Especializada"));
          assert(text.includes("https://descomplicavetmt.com.br/images/capa-cris.png"));
          for (const asset of assetRecords) assert(text.includes(`/images/${asset.filename}`));
          const linkedAssets = [
            ...new Set(
              [...text.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)].map((match) => match[1]),
            ),
          ];
          for (const asset of linkedAssets)
            assert.equal((await fetch(`${base}${asset}`)).status, 200, asset);
        }
      }
      if (pathname === "/sitemap.xml") {
        assert(response.headers.get("content-type").includes("application/xml"));
        assert(text.includes("<loc>https://descomplicavetmt.com.br/</loc>"));
        assert(text.includes("<loc>https://descomplicavetmt.com.br/politica-de-privacidade</loc>"));
      }
      const asset = assetRecords.find((record) => pathname === `/images/${record.filename}`);
      if (asset) {
        assert(response.headers.get("content-type").includes("image/png"));
        assert.equal(hash(bytes), asset.sha256, pathname);
      }
      results.push({
        pathname,
        status: response.status,
        bytes: bytes.length,
        headers: Object.fromEntries(response.headers),
      });
    }
    const nextPage = await fetch(base);
    assert.notEqual(
      nextPage.headers.get("content-security-policy")?.match(/'nonce-([^']+)'/)?.[1],
      firstNonce,
    );
    const suppliedNonce = "attacker-supplied-value";
    const parallelPages = await Promise.all(
      Array.from({ length: 3 }, async () => {
        const response = await fetch(base, { headers: { "x-internal-csp-nonce": suppliedNonce } });
        assert.equal(response.status, 200);
        const nonce = response.headers
          .get("content-security-policy")
          ?.match(/'nonce-([^']+)'/)?.[1];
        assert(nonce && nonce !== suppliedNonce);
        const html = await response.text();
        for (const [, attrs] of html.matchAll(/<script\b([^>]*)>/g)) {
          if (!/type="application\/ld\+json"/.test(attrs))
            assert(attrs.includes(`nonce="${nonce}"`));
        }
        return nonce;
      }),
    );
    assert.equal(new Set(parallelPages).size, parallelPages.length, "Nonce shared across requests");
    for (const pathname of [
      "/",
      "/sitemap.xml",
      "/images/capa-cris.png",
      "/auditoria-rota-inexistente",
    ]) {
      const response = await fetch(`${base}${pathname}`, { method: "HEAD" });
      assert.equal((await response.arrayBuffer()).byteLength, 0, `HEAD body: ${pathname}`);
      assert.equal(response.status, pathname.includes("inexistente") ? 404 : 200, pathname);
    }
    const dryRun = runNode("node_modules/wrangler/bin/wrangler.js", ["deploy", "--dry-run"]);
    assert.equal(dryRun.status, 0, "Deployment dry-run failed");
    save("runtime-cloudflare", {
      checkedAt: new Date().toISOString(),
      runtime: "Cloudflare Vite production preview / workerd",
      results,
      nonceRotation: true,
      nonceIsolationAndSpoofProtection: true,
      headChecks: true,
      dryRun,
      previewOutput: output,
    });
    console.log("CLOUDFLARE_LOCAL_OK");
  } catch (error) {
    save("runtime-cloudflare-failure", {
      checkedAt: new Date().toISOString(),
      results,
      previewOutput: output,
      error: error.message,
    });
    throw error;
  } finally {
    server.kill();
    await new Promise((resolve) => {
      if (server.exitCode !== null) resolve();
      else server.once("exit", resolve);
    });
  }
}

const checks = { independence, assets, toolchain, audit, runtime };
const selected = process.argv[2] ?? "all";
if (selected === "all") {
  for (const check of Object.values(checks)) await check();
} else {
  assert(checks[selected], `Unknown verification: ${selected}`);
  await checks[selected]();
}
