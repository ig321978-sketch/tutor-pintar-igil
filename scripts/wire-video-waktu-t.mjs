/**
 * Aktifkan waktu suara (t) pada semua video Story K4–K6 (kecuali *-umum).
 * Jalankan: node scripts/wire-video-waktu-t.mjs
 */
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "src/components/modul");
const files = fs.readdirSync(dir).filter((f) => /^video-k[456].*\.tsx$/.test(f) && !f.includes("umum") && !f.includes("visual"));

const MINIMAL = `{ waktu: true, minimal: { 0: 3.5, 1: 5.5, 2: 4.5, 3: 4 } }`;
let ubah = 0;

for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, "utf8");
  const asal = s;

  // Pass t ke AdeganVisual
  s = s.replace(
    /function Komponen\(\{\s*k\s*\}: PropsAdegan\)/g,
    "function Komponen({ k, t }: PropsAdegan)",
  );
  s = s.replace(
    /<AdeganVisual kode=\{KODE\} v=\{v\} a=\{a\} k=\{k\}\s*\/>/g,
    "<AdeganVisual kode={KODE} v={v} a={a} k={k} t={t} />",
  );
  // Pastikan t sudah ada di props bila hanya k
  s = s.replace(
    /<AdeganVisual kode=\{KODE\} v=\{v\} a=\{a\} k=\{k\} t=\{t\}\s*\/>/g,
    "<AdeganVisual kode={KODE} v={v} a={a} k={k} t={t} />",
  );

  // buatAdegan tanpa opsi waktu → tambah
  s = s.replace(
    /buatAdegan\(ad,\s*Adegan\(\{\s*v:\s*vi,\s*a:\s*ai\s*\}\)\)/g,
    `buatAdegan(ad, Adegan({ v: vi, a: ai }), ${MINIMAL})`,
  );
  // sudah punya waktu:true (K5B4) — biarkan, kecuali belum ada waktu
  if (!s.includes("waktu: true") && s.includes("buatAdegan(ad,")) {
    s = s.replace(
      /buatAdegan\(ad,\s*Adegan\(\{\s*v:\s*vi,\s*a:\s*ai\s*\}\)(?:,\s*\{[^}]*\})?\)/g,
      `buatAdegan(ad, Adegan({ v: vi, a: ai }), ${MINIMAL})`,
    );
  }

  if (s !== asal) {
    fs.writeFileSync(p, s);
    ubah++;
    console.log("wire", f);
  }
}
console.log(`selesai: ${ubah}/${files.length} berkas`);
