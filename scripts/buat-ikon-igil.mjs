import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const akar = join(dirname(fileURLToPath(import.meta.url)), "..");
const publik = join(akar, "public");
const app = join(akar, "src", "app");

function svgIkon({ size, hanyaDolar = false, maskable = false }) {
  const pad = maskable ? size * 0.2 : size * 0.12;
  const dalam = size - pad * 2;
  const dolarY = hanyaDolar ? pad + dalam * 0.12 : pad + dalam * 0.02;
  const dolarH = hanyaDolar ? dalam * 0.76 : dalam * 0.62;
  const dolarSize = Math.round(dolarH);
  const labelY = pad + dalam * 0.92;
  const labelSize = Math.round(dalam * 0.18);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#1C01A5"/>
  <text
    x="${size / 2}"
    y="${dolarY + dolarH * 0.82}"
    text-anchor="middle"
    font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-size="${dolarSize}"
    font-weight="900"
    fill="#F0AB00"
  >$</text>
  ${
    hanyaDolar
      ? ""
      : `<text
    x="${size / 2}"
    y="${labelY}"
    text-anchor="middle"
    font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-size="${labelSize}"
    font-weight="900"
    fill="#FFFFFF"
    letter-spacing="${Math.round(size * 0.02)}"
  >IGIL</text>`
  }
</svg>`;
}

async function tulisPng(jalur, svg) {
  mkdirSync(dirname(jalur), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(jalur);
}

async function main() {
  const svgSumber = svgIkon({ size: 512 });
  writeFileSync(join(publik, "icon-igil.svg"), svgSumber);

  await Promise.all([
    tulisPng(join(publik, "favicon-32.png"), svgIkon({ size: 32, hanyaDolar: true })),
    tulisPng(join(publik, "icon-192.png"), svgIkon({ size: 192 })),
    tulisPng(join(publik, "icon-512.png"), svgIkon({ size: 512 })),
    tulisPng(join(publik, "icon-maskable-512.png"), svgIkon({ size: 512, maskable: true })),
    tulisPng(join(publik, "apple-touch-icon.png"), svgIkon({ size: 180 })),
    tulisPng(join(app, "icon.png"), svgIkon({ size: 192 })),
    tulisPng(join(app, "apple-icon.png"), svgIkon({ size: 180 })),
  ]);

  await sharp(join(publik, "favicon-32.png"))
    .resize(32, 32)
    .toFile(join(publik, "favicon.ico"));

  console.log("Ikon IGIL siap.");
}

await main();
