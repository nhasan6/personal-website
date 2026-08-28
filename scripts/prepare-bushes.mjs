// Trim the transparent margins off the source bush drawings, downscale them to
// web size, and write them into public/bushes/.
//
// A plain alpha bounding box is not enough: the drawings contain a few stray
// specks well away from the bush (a red dot, a blue streak), which stretch the
// box and leave the bush floating above the bottom of its own file. So instead
// a row/column counts as "content" only when enough of its pixels are opaque.
// Run it from the project root after adding or redrawing a bush:
//   node scripts/prepare-bushes.mjs        (add --dry to preview the numbers)
// Then copy the reported output sizes into ART in components/BerryBush.tsx.
//
// sharp comes along with Next.js, so there is nothing extra to install.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "art/bushes");
const OUT = path.join(ROOT, "public/bushes");
const TARGET_WIDTH = 900; // ~2x the largest on-screen size
const ALPHA_MIN = 40; // ignore near-transparent antialiasing
const COVERAGE = 0.004; // a line needs this share of opaque pixels to count
const SPECK_RATIO = 0.001; // blobs under this share of the bush are stray marks

const dryRun = process.argv.includes("--dry");

// Erase stray specks: isolated blobs thousands of times smaller than the bush
// itself (an accidental brush dot). Left in place they both show up on the page
// and, if one sits above the bush, stretch the crop so the bush renders too tall.
function eraseSpecks(data, width, height) {
  const label = new Int32Array(width * height).fill(-1);
  const members = [];
  const stack = [];

  for (let start = 0; start < width * height; start++) {
    if (label[start] !== -1 || data[start * 4 + 3] < ALPHA_MIN) continue;
    const id = members.length;
    members.push([]);
    label[start] = id;
    stack.push(start);
    while (stack.length) {
      const p = stack.pop();
      members[id].push(p);
      const x = p % width;
      const y = (p - x) / width;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const q = ny * width + nx;
        if (label[q] === -1 && data[q * 4 + 3] >= ALPHA_MIN) {
          label[q] = id;
          stack.push(q);
        }
      }
    }
  }

  const largest = members.reduce((m, c) => Math.max(m, c.length), 0);
  const cutoff = largest * SPECK_RATIO;
  let removed = 0;
  for (const cell of members) {
    if (cell.length >= cutoff) continue;
    removed += cell.length;
    for (const p of cell) data[p * 4 + 3] = 0;
  }
  return { removed, blobs: members.length };
}

function contentBox(data, width, height) {
  const rowCount = new Int32Array(height);
  const colCount = new Int32Array(width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] >= ALPHA_MIN) {
        rowCount[y]++;
        colCount[x]++;
      }
    }
  }

  const rowMin = Math.max(1, Math.floor(width * COVERAGE));
  const colMin = Math.max(1, Math.floor(height * COVERAGE));

  let top = 0;
  while (top < height && rowCount[top] < rowMin) top++;
  let bottom = height - 1;
  while (bottom > top && rowCount[bottom] < rowMin) bottom--;
  let left = 0;
  while (left < width && colCount[left] < colMin) left++;
  let right = width - 1;
  while (right > left && colCount[right] < colMin) right--;

  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.png$/i.test(f)).sort();

for (const file of files) {
  const src = path.join(SRC, file);
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { removed, blobs } = eraseSpecks(data, info.width, info.height);
  const box = contentBox(data, info.width, info.height);
  const finalW = Math.min(TARGET_WIDTH, box.width);
  const finalH = Math.round((box.height / box.width) * finalW);

  console.log(
    `${file.padEnd(22)} ${info.width}x${info.height} -> content ${box.width}x${box.height} ` +
      `(ratio ${(box.width / box.height).toFixed(2)}) -> out ${finalW}x${finalH}` +
      (removed ? `   [erased ${removed}px of specks from ${blobs} blobs]` : ""),
  );

  if (dryRun) continue;

  // Build from the cleaned pixels, not the file, so the specks stay erased.
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
    .resize({ width: finalW })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(OUT, file.replace(/\.png$/i, ".png")));
}
