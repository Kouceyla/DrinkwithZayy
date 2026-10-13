// Normalise les illustrations de boissons : recadre le verre, le centre dans
// un carré avec une marge identique, et exporte en WebP léger.
// Usage : npm run images  (lit public/images/drinks-src, écrit public/images/drinks)
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "public/images/drinks-src";
const OUT = "public/images/drinks";
const SIZE = 800;
const MARGIN = 0.1; // marge autour du verre, en fraction du carré

await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const input = path.join(SRC, file);

  // Couleur du papier = pixel du coin haut-gauche, utilisée pour recompléter le carré.
  const { data } = await sharp(input).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const background = { r: data[0], g: data[1], b: data[2], alpha: 1 };

  const trimmed = await sharp(input).flatten({ background }).trim({ background, threshold: 25 }).toBuffer();
  const inner = Math.round(SIZE * (1 - 2 * MARGIN));
  const out = path.join(OUT, file.replace(/\.\w+$/, ".webp").toLowerCase());

  await sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background })
    .extend({ top: (SIZE - inner) / 2, bottom: (SIZE - inner) / 2, left: (SIZE - inner) / 2, right: (SIZE - inner) / 2, background })
    .webp({ quality: 82 })
    .toFile(out);

  console.log(`${file} → ${out}`);
}
