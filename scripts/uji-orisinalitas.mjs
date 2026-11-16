// Uji orisinalitas: bandingkan teks konten IGIL dengan teks buku resmi hasil ekstrak (sumber/ekstrak/*.txt).
// Pakai: node scripts/uji-orisinalitas.mjs [--dir src/components/modul/story] [--n 5] [--min 2] [--awalan k3b2] [--semua]
//  - n   : panjang runtun kata yang dianggap sama (bawaan 5, karena kalimat soal matematika pendek).
//  - min : jumlah runtun berbeda yang cocok dalam satu kalimat supaya ditandai (bawaan 2).
//  - Blok `kutipan: [...]` dilaporkan terpisah (memang salinan buku, sedang ditinjau).
//  - Nama diri yang sering muncul di buku (kandidat tokoh buku) dicek terhadap konten.
// Keluaran: ringkasan per awalan berkas dan daftar temuan teratas; laporan penuh ke sumber/laporan-orisinalitas.json (tidak di-commit).
import fs from "fs";
import path from "path";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const DIR = arg("dir", "src/components/modul/story");
const N = Number(arg("n", 5));
const MIN = Number(arg("min", 2));
const AWALAN = arg("awalan", "");
const SEMUA = process.argv.includes("--semua");
const DIZINKAN = new Set(["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"]);

const kata = (s) => s.toLowerCase().replace(/[^a-z0-9À-ɏ\s]/g, " ").split(/\s+/).filter(Boolean);

// 1) Indeks runtun-N dari semua teks buku.
const dirEkstrak = "sumber/ekstrak";
if (!fs.existsSync(dirEkstrak)) { console.error("sumber/ekstrak belum ada. Ekstrak PDF dulu."); process.exit(2); }
const runtun = new Map();
const kandidatNama = new Map();
for (const f of fs.readdirSync(dirEkstrak).filter((x) => x.endsWith(".txt"))) {
  const jenis = f.includes("-BS-") ? "BS" : "BG";
  const teks = fs.readFileSync(path.join(dirEkstrak, f), "utf8");
  const hal = teks.split("\f");
  hal.forEach((h, hi) => {
    const w = kata(h);
    for (let i = 0; i + N <= w.length; i += 1) {
      const k = w.slice(i, i + N).join(" ");
      if (!runtun.has(k)) runtun.set(k, `${f.replace(".txt", "")} hlm ${hi + 1}`);
    }
  });
  if (jenis === "BS") {
    for (const m of teks.matchAll(/(?<=[a-z,] )([A-Z][a-z]{2,})\b/g)) kandidatNama.set(m[1], (kandidatNama.get(m[1]) ?? 0) + 1);
  }
}
// Nama diri: huruf kapital di tengah kalimat dan jarang muncul huruf kecil di buku.
const teksBS = fs.readdirSync(dirEkstrak).filter((x) => x.includes("-BS-")).map((f) => fs.readFileSync(path.join(dirEkstrak, f), "utf8")).join("\n");
const namaBuku = new Set();
for (const [nama, c] of kandidatNama) {
  if (c < 6) continue;
  const kecil = (teksBS.match(new RegExp(`\\b${nama.toLowerCase()}\\b`, "g")) ?? []).length;
  if (kecil <= c * 0.1) namaBuku.add(nama);
}
const UMUM = new Set(["Indonesia", "Matematika", "Mari", "Ayo", "Tuhan", "Rupiah", "Kalimat", "Bilangan"]);
for (const u of UMUM) namaBuku.delete(u);

// 2) Ambil string literal dari berkas konten (blok kutipan dipisah).
const berkas = fs.readdirSync(DIR).filter((f) => /\.(ts|tsx)$/.test(f) && f.startsWith(AWALAN));
const literal = /"((?:[^"\\\n]|\\.){25,})"|`((?:[^`\\]|\\.){25,})`/g;
const hasil = [];
const ringkas = {};
for (const f of berkas) {
  let src = fs.readFileSync(path.join(DIR, f), "utf8");
  const kutipan = [];
  src = src.replace(/kutipan:\s*\[[\s\S]*?\]/g, (b) => { kutipan.push(b); return ""; });
  const awal = (f.match(/^(k\d+b\d+[A-Za-z]?)/) ?? [, f])[1];
  const r = (ringkas[awal] ||= { berkas: 0, kalimat: 0, ditandai: 0, kutipanBlok: 0, namaBuku: 0 });
  r.berkas += 1;
  r.kutipanBlok += kutipan.length;
  for (const m of src.matchAll(literal)) {
    const s = (m[1] ?? m[2] ?? "").replace(/\\n/g, " ");
    if (!/\s/.test(s) || /^[#./@\w-]+$/.test(s)) continue;
    r.kalimat += 1;
    const w = kata(s);
    const cocok = new Map();
    for (let i = 0; i + N <= w.length; i += 1) {
      const k = w.slice(i, i + N).join(" ");
      if (runtun.has(k)) cocok.set(k, runtun.get(k));
    }
    const nama = s.match(/\b[A-Z][a-z]{2,}\b/g)?.filter((x) => namaBuku.has(x) && !DIZINKAN.has(x)) ?? [];
    if (cocok.size >= MIN || nama.length) {
      if (cocok.size >= MIN) r.ditandai += 1;
      if (nama.length) r.namaBuku += 1;
      hasil.push({ berkas: f, kalimat: s.slice(0, 140), jumlahRuntun: cocok.size, contoh: [...cocok].slice(0, 2).map(([k, v]) => `"${k}" (${v})`), namaBuku: [...new Set(nama)] });
    }
  }
}

fs.writeFileSync("sumber/laporan-orisinalitas.json", JSON.stringify({ n: N, min: MIN, dir: DIR, ringkas, hasil }, null, 1));
const jumlah = Object.values(ringkas).reduce((a, r) => ({ kalimat: a.kalimat + r.kalimat, ditandai: a.ditandai + r.ditandai, namaBuku: a.namaBuku + r.namaBuku, kutipanBlok: a.kutipanBlok + r.kutipanBlok }), { kalimat: 0, ditandai: 0, namaBuku: 0, kutipanBlok: 0 });
console.log(`Nama diri kandidat tokoh buku (${namaBuku.size}): ${[...namaBuku].slice(0, 40).join(", ")}`);
console.log(`Dipindai ${berkas.length} berkas, ${jumlah.kalimat} kalimat; ditandai mirip ${jumlah.ditandai}; memuat nama buku ${jumlah.namaBuku}; blok kutipan ${jumlah.kutipanBlok}.`);
console.log("Per awalan (ditandai/kalimat, nama, blok kutipan):");
for (const [a, r] of Object.entries(ringkas).sort()) if (SEMUA || r.ditandai || r.namaBuku || r.kutipanBlok) console.log(`  ${a}: ${r.ditandai}/${r.kalimat}, nama ${r.namaBuku}, kutipan ${r.kutipanBlok}`);
console.log("Temuan teratas:");
for (const h of hasil.sort((a, b) => b.jumlahRuntun - a.jumlahRuntun).slice(0, 8)) console.log(`  ${h.berkas}: ${h.jumlahRuntun} runtun ${h.namaBuku.length ? `nama ${h.namaBuku}` : ""} | ${h.kalimat}`);
process.exit(jumlah.ditandai || jumlah.namaBuku ? 1 : 0);
