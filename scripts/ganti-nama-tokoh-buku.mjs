// Sekali jalan: mengganti nama tokoh buku resmi di Story Kelas 4 sampai 6 (dan skrip ujinya) dengan enam tokoh IGIL.
// Pemetaan per sub-bab (awalan berkas): nama berbeda dipetakan ke tokoh IGIL berbeda sesuai urutan kemunculan.
import fs from "node:fs";
const DIR = "src/components/modul/story/";
const NAMA = ["Lukas", "Yohana", "Asep", "Komang", "Nisa", "Helen", "Dhien", "Slamet", "Agam", "Karel", "Anggi", "Azizah", "Anike", "Putu", "Andi", "Tigor", "Chandra", "Budi", "Tenri", "Hasan", "Ahmad", "Dini", "Bajuri", "Toni", "Wicak", "Wayan", "Bejo", "Rudi", "Sudi", "Rahmad", "Jaya"];
const IGIL = ["Kira", "Halim", "Upe", "Wei", "Malosi", "Igil"];
const re = new RegExp(`\\b(${NAMA.join("|")})\\b`, "g");
const berkas = fs.readdirSync(DIR).filter((f) => /^k[456]b.*\.ts$/.test(f)).sort();
const kelompok = {};
for (const f of berkas) (kelompok[f.match(/^(k\d+b\d+[a-z]?)/i)[1]] ||= []).push(f);
let total = 0;
for (const [awalan, daftar] of Object.entries(kelompok)) {
  const teksSemua = daftar.map((f) => fs.readFileSync(DIR + f, "utf8"));
  const urut = [];
  const uji = `scripts/uji-story-${awalan}.mjs`;
  const teksUji = fs.existsSync(uji) ? fs.readFileSync(uji, "utf8") : "";
  for (const t of [...teksSemua, teksUji]) for (const m of t.matchAll(re)) if (!urut.includes(m[1])) urut.push(m[1]);
  if (!urut.length) continue;
  const geser = [...awalan].reduce((a, c) => a + c.charCodeAt(0), 0);
  const peta = Object.fromEntries(urut.map((n, i) => [n, IGIL[(i + geser) % IGIL.length]]));
  daftar.forEach((f, i) => {
    const baru = teksSemua[i].replace(re, (n) => { total += 1; return peta[n]; });
    if (baru !== teksSemua[i]) fs.writeFileSync(DIR + f, baru);
  });
  if (teksUji) { const b = teksUji.replace(re, (n) => peta[n]); if (b !== teksUji) fs.writeFileSync(uji, b); }
}
console.log(`penggantian: ${total}`);
