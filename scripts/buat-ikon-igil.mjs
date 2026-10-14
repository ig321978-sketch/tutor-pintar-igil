import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const akar = join(dirname(fileURLToPath(import.meta.url)), "..");
const publik = join(akar, "public");
const app = join(akar, "src", "app");
const sumber = join(dirname(fileURLToPath(import.meta.url)), "ikon-hulu-sumber.jpg");
const BIRU = { r: 28, g: 1, b: 165 };
const EMAS = { r: 240, g: 171, b: 0 };

function hsv(r, g, b) {
  const merah = r / 255;
  const hijau = g / 255;
  const biru = b / 255;
  const max = Math.max(merah, hijau, biru);
  const min = Math.min(merah, hijau, biru);
  const jarak = max - min;
  let hue = 0;
  if (jarak) {
    if (max === merah) hue = ((hijau - biru) / jarak) % 6;
    else if (max === hijau) hue = (biru - merah) / jarak + 2;
    else hue = (merah - hijau) / jarak + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  return { h: hue, s: max ? jarak / max : 0, v: max };
}

function campur(awal, akhir, kadar) {
  return {
    r: awal.r + (akhir.r - awal.r) * kadar,
    g: awal.g + (akhir.g - awal.g) * kadar,
    b: awal.b + (akhir.b - awal.b) * kadar,
  };
}

function batas(nilai) {
  return Math.max(0, Math.min(255, Math.round(nilai)));
}

async function warnai(pipeline) {
  const { data, info } = await pipeline.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const { h, s, v } = hsv(r, g, b);
    if (h > 210 && h < 270 && b > r + 15 && b > g + 10 && r < 130) {
      data[i] = BIRU.r;
      data[i + 1] = BIRU.g;
      data[i + 2] = BIRU.b;
      continue;
    }
    if (h >= 38 && h <= 55 && s >= 0.45 && v >= 0.72 && b < 150) {
      const terang = Math.min(1, Math.max(0, (v - 0.72) / 0.28));
      const warna = terang < 0.55
        ? campur({ r: 196, g: 122, b: 0 }, EMAS, terang / 0.55)
        : campur(EMAS, { r: 255, g: 214, b: 48 }, (terang - 0.55) / 0.45);
      const pudar = Math.max(0, 0.62 - s);
      data[i] = batas(warna.r + (255 - warna.r) * pudar);
      data[i + 1] = batas(warna.g + (255 - warna.g) * pudar * 0.65);
      data[i + 2] = batas(warna.b + (255 - warna.b) * pudar * 0.15);
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
}

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
      const latar = b > r + 15 && b > g + 10 && r < 130;
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
  return warnai(
    sharp(sumber)
      .extract({ left: kiri, top: atas, width: potong, height: potong })
      .resize(1024, 1024, { fit: "contain", background: BIRU }),
  );
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
  const latar = BIRU;
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
