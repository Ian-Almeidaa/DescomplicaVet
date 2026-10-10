import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const sourceDirectory = ".migration-backup/original/src/assets";
const origin = "https://descomplicavetmt.com.br";
let metadata;
try {
  const assets = (await fs.readdir(sourceDirectory)).filter((file) => file.endsWith(".asset.json"));
  metadata = await Promise.all(
    assets.map(async (file) =>
      JSON.parse(await fs.readFile(path.join(sourceDirectory, file), "utf8")),
    ),
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  // A fresh checkout already contains the images and their provenance. The
  // ignored export backup is only needed for the initial recovery.
  metadata = JSON.parse(
    await fs.readFile("docs/preparacao-cloudflare/imagens-recuperadas.json", "utf8"),
  ).map((record) => ({
    original_filename: record.filename,
    url: record.source,
    size: record.bytes,
    sha256: record.sha256,
  }));
}
const records = [];
await fs.mkdir("public/images", { recursive: true });
await fs.mkdir("docs/preparacao-cloudflare", { recursive: true });
for (const asset of metadata) {
  if (path.basename(asset.original_filename) !== asset.original_filename)
    throw new Error("Invalid filename");
  const source = new URL(asset.url, origin);
  if (source.origin !== origin) throw new Error("Unexpected asset origin");
  const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw new Error(`Download failed: ${asset.original_filename}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!bytes.subarray(0, 8).equals(signature))
    throw new Error(`Not a PNG: ${asset.original_filename}`);
  if (bytes.length !== asset.size)
    throw new Error(
      `Original size mismatch: ${asset.original_filename}: ${bytes.length} != ${asset.size}`,
    );
  const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
  if (asset.sha256 && asset.sha256 !== sha256)
    throw new Error(`Original hash mismatch: ${asset.original_filename}`);
  const destination = `public/images/${asset.original_filename}`;
  await fs.writeFile(destination, bytes);
  records.push({
    filename: asset.original_filename,
    source: source.href,
    destination,
    bytes: bytes.length,
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    sha256,
    recoveredAt: new Date().toISOString(),
  });
  console.log(
    `Recovered ${asset.original_filename}: ${bytes.length} bytes, ${records.at(-1).width}x${records.at(-1).height}`,
  );
}
await fs.writeFile(
  "docs/preparacao-cloudflare/imagens-recuperadas.json",
  `${JSON.stringify(records, null, 2)}\n`,
);
