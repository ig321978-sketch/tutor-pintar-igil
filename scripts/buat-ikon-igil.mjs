import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const akar = join(dirname(fileURLToPath(import.meta.url)), "..");
const publik = join(akar, "public");
const app = join(akar, "src", "app");
const sumber = join(dirname(fileURLToPath(import.meta.url)), "ikon-hulu-sumber.jpg");
const NAVY = { r: 28, g: 1, b: 165 };

function kotakBurung(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const latar = Math.abs(r - NAVY.r) < 36 && g < 48 && b > 110 && b < 210;
      if (latar) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, minY, maxX, maxY };
}

async function kanvas(longgar) {
  const gambar = sharp(sumber).ensureAlpha();
  const { data, info } = await gambar.raw().toBuffer({ resolveWithObject: true });
  const kotak = kotakBurung(data, info.width, info.height, info.channels);
  const lebar = kotak.maxX - kotak.minX + 1;
  const tinggi = kotak.maxY - kotak.minY + 1;
  const sisi = Math.max(lebar, tinggi);
  const jarak = Math.round(sisi * (longgar ? 0.28 : 0.08));
  const ukuran = sisi + jarak * 2;
  const kiri = Math.max(0, Math.round(kotak.minX - (ukuran - lebar) / 2));
  const atas = Math.max(0, Math.round(kotak.minY - (ukuran - tinggi) / 2));
  const potong = Math.min(ukuran, info.width - kiri, info.height - atas);
  return sharp(sumber)
    .extract({ left: kiri, top: atas, width: potong, height: potong })
    .resize(1024, 1024, { fit: "contain", background: NAVY })
    .png();
}

async function tulis(jalur, ukuran, longgar = false) {
  mkdirSync(dirname(jalur), { recursive: true });
  if (!longgar) {
    await (await kanvas(false)).resize(ukuran, ukuran).png().toFile(jalur);
    return;
  }
  const dalam = Math.round(ukuran * 0.72);
  const offset = Math.round((ukuran - dalam) / 2);
  const { data, info } = await (await kanvas(false))
    .resize(dalam, dalam)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const latar = { r: data[0], g: data[1], b: data[2] };
  for (let i = 0; i < data.length; i += info.channels) {
    const jarak = Math.abs(data[i] - latar.r) + Math.abs(data[i + 1] - latar.g) + Math.abs(data[i + 2] - latar.b);
    if (jarak < 48) {
      data[i] = latar.r;
      data[i + 1] = latar.g;
      data[i + 2] = latar.b;
    }
  }
  const isi = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: ukuran, height: ukuran, channels: 3, background: latar },
  })
    .composite([{ input: isi, left: offset, top: offset }])
    .png()
    .toFile(jalur);
}

async function main() {
  await Promise.all([
    tulis(join(publik, "favicon-32.png"), 32),
    tulis(join(publik, "icon-192.png"), 192),
    tulis(join(publik, "icon-512.png"), 512),
    tulis(join(publik, "icon-maskable-512.png"), 512, true),
    tulis(join(publik, "apple-touch-icon.png"), 180),
    tulis(join(app, "icon.png"), 192),
    tulis(join(app, "apple-icon.png"), 180),
  ]);

  await sharp(join(publik, "favicon-32.png")).resize(32, 32).toFile(join(publik, "favicon.ico"));
  copyFileSync(join(publik, "favicon.ico"), join(app, "favicon.ico"));
  console.log("Ikon burung hantu IGIL siap.");
}

await main();
