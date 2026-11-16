// Uji Kitab Dunia Cerita Opsi 2: nama tokoh dan judul harus orisinal terhadap buku dan Modul Kesatu.
// Pakai: node --no-warnings scripts/uji-kitab-opsi2.mjs   (butuh sumber/ekstrak untuk pemeriksaan buku; bila tak ada, bagian itu dilewati)
import fs from "node:fs";
import { register } from "node:module";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const K1 = await import("../src/components/modul/story/kit/dunia-k1.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
const jaccard = (a, b) => { const A = new Set(a), B = new Set(b); const sama = [...A].filter((x) => B.has(x)).length; return sama / (A.size + B.size - sama || 1); };

// 1) Nama tokoh: bukan tokoh lama, bukan nama dalam teks buku.
const TOKOH_LAMA = ["Malosi", "Kira", "Upe", "Wei", "Halim"];
const adaBuku = fs.existsSync("sumber/ekstrak");
const teksBuku = adaBuku ? fs.readdirSync("sumber/ekstrak").filter((f) => f.endsWith(".txt")).map((f) => fs.readFileSync(`sumber/ekstrak/${f}`, "utf8")).join("\n") : "";
for (const t of K1.TOKOH_K1) {
  if (t.nama === "Igil") continue; // maskot tetap
  cek(!TOKOH_LAMA.includes(t.nama), `tokoh ${t.nama} bukan tokoh lama`);
  if (adaBuku) cek(!new RegExp(`\\b${t.nama}\\b`).test(teksBuku), `nama ${t.nama} tidak ada di teks buku`);
}
if (!adaBuku) console.log("sumber/ekstrak tidak ada: pemeriksaan nama terhadap buku dilewati");

// 2) Judul baru berbeda dari judul Modul Kesatu (kelas1-bab*.json).
const asli = [];
for (let n = 1; n <= 8; n += 1) {
  const j = JSON.parse(fs.readFileSync(`src/data/kelas1-bab${n}.json`, "utf8"));
  asli.push({ kunci: `bab ${n}`, judul: String(j.title ?? "").replace(/^BAB \d+:\s*/i, "") });
  for (const s of Object.values(j.subBabs ?? {})) asli.push({ kunci: `bab ${n}`, judul: String(s.title ?? s.fullTitle ?? "").replace(/^Sub-Bab [A-Z]:\s*/i, "") });
}
const baru = [
  ...Object.entries(K1.JUDUL_BAB_K1).map(([n, j]) => [`bab ${n}`, j]),
  ...Object.entries(K1.JUDUL_SUB_K1).map(([n, j]) => [`sub ${n}`, j]),
];
for (const [kunci, j] of baru) {
  const nb = norm(j);
  for (const a of asli) {
    const na = norm(a.judul);
    if (!na.length) continue;
    cek(nb.join(" ") !== na.join(" "), `${kunci} "${j}" tidak sama dengan judul Modul Kesatu "${a.judul}"`);
    cek(!nb.join(" ").includes(na.join(" ")) || na.length < 2, `${kunci} "${j}" tidak memuat utuh judul Modul Kesatu "${a.judul}"`);
    cek(jaccard(nb, na) <= 0.6, `${kunci} "${j}" cukup berbeda dari "${a.judul}" (kemiripan kata ${jaccard(nb, na).toFixed(2)})`);
  }
}

console.log(`uji-kitab-opsi2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
