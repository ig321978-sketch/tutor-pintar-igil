// Uji kit adegan bersama Story Opsi 2 (src/components/modul/story/kit/) dan dunia Kelas 1.
// Pakai: node --no-warnings scripts/uji-kit-story-opsi2.mjs
import { register } from "node:module";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const D = await import("../src/components/modul/story/kit/dasar.ts");
const K1 = await import("../src/components/modul/story/kit/dunia-k1.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };

// Pengeja bilangan: contoh pasti, lalu seluruh 0..999 tanpa digit dan tanpa kata ganda.
const CONTOH = { 0: "nol", 1: "satu", 10: "sepuluh", 11: "sebelas", 12: "dua belas", 20: "dua puluh", 21: "dua puluh satu", 100: "seratus", 101: "seratus satu", 111: "seratus sebelas", 200: "dua ratus", 999: "sembilan ratus sembilan puluh sembilan" };
for (const [n, s] of Object.entries(CONTOH)) cek(D.eja(Number(n)) === s, `eja(${n}) = "${s}", dapat "${D.eja(Number(n))}"`);
for (let n = 0; n <= 999; n += 1) { const s = D.eja(n); cek(s.length > 0 && !/\d/.test(s) && !/\s{2,}/.test(s), `eja(${n}) tanpa digit`); }

// Idx: kata ketemu dan galat bila tidak ada.
cek(D.idx("Ayo hitung satu per satu", "satu", 2) === 4, "idx kemunculan kedua");
let galat = false;
try { D.idx("Ayo hitung", "dua"); } catch { galat = true; }
cek(galat, "idx galat bila kata tidak ada");

// Tokoh: paling banyak empat, termasuk Igil, nama berbeda, id benda gambar unik.
cek(K1.TOKOH_K1.length <= 4 && K1.TOKOH_K1.some((t) => t.nama === "Igil"), "tokoh Kelas 1 paling banyak empat dan memuat Igil");
cek(new Set(K1.TOKOH_K1.map((t) => t.nama)).size === K1.TOKOH_K1.length, "nama tokoh unik");
cek(!K1.TOKOH_K1.some((t) => ["Malosi", "Kira", "Upe", "Wei", "Halim"].includes(t.nama)), "tidak memakai tokoh lama");
const KANVAS = { w: 300, h: 208 };
const dalamKanvas = (o) => {
  const x = o.x ?? 0, y = o.y ?? 0;
  if (o.t === "bulat") return x - (o.r ?? 0) >= -1 && x + (o.r ?? 0) <= KANVAS.w + 1 && y - (o.r ?? 0) >= -1 && y + (o.r ?? 0) <= KANVAS.h + 1;
  if (o.t === "kotak") return x >= -1 && y >= -1 && x + (o.w ?? 0) <= KANVAS.w + 1 && y + (o.h ?? 0) <= KANVAS.h + 1;
  return x >= -1 && x <= KANVAS.w + 1 && y >= -1 && y <= KANVAS.h + 1;
};
for (const t of K1.TOKOH_K1) {
  const g = D.gambarTokoh(t, 60, 80);
  cek(g.length > 0 && g.every(dalamKanvas), `gambar tokoh ${t.nama} di dalam kanvas`);
  cek(JSON.stringify(g.map((o) => o.id)) === JSON.stringify(D.idTokoh(t)), `id tokoh ${t.nama} sesuai idTokoh`);
}

// Lentera dan Papan Lentera: id unik, di dalam kanvas, jumlah menyala sesuai.
const papan = K1.papanLentera("pl", 10, 4);
cek(new Set(papan.map((o) => o.id)).size === papan.length, "id Papan Lentera unik");
cek(papan.every(dalamKanvas), "Papan Lentera di dalam kanvas");
cek(papan.filter((o) => o.id.endsWith("-bd") && o.sorot).length === 4, "empat lentera menyala di Papan");
cek(JSON.stringify(papan.map((o) => o.id).sort()) === JSON.stringify(K1.idPapan("pl", 10).sort()), "idPapan sama dengan benda yang dibuat");
const sebagian = K1.papanLentera("pq", 7, 0);
cek(sebagian.filter((o) => o.id.endsWith("-no")).map((o) => o.isi).join(",") === "1,2,3,4,5,6,7", "nomor Papan berurutan");
const na = K1.nyalakan(0, "pl1");
cek(na.ubah.length === 2 && na.ubah[0].sorot === true, "nyalakan mengubah badan dan api");
const pa = K1.padamkan(0, "pl1");
cek(pa.ubah[0].sorot === false, "padamkan mematikan sorot");

// Judul: kelengkapan dan keunikan, tanpa gelar dan tanpa kata terlarang.
cek(Object.keys(K1.JUDUL_BAB_K1).length === 8, "delapan judul bab");
cek(Object.keys(K1.JUDUL_SUB_K1).length === 25, "dua puluh lima judul sub-bab");
const semuaJudul = [...Object.values(K1.JUDUL_BAB_K1), ...Object.values(K1.JUDUL_SUB_K1)];
cek(new Set(semuaJudul).size === semuaJudul.length, "judul tidak ada yang kembar");
for (const j of semuaJudul) cek(!/\b(kelompok|kelas|buku|teman)\b/i.test(j), `judul tanpa kata terlarang: ${j}`);

console.log(`uji-kit-story-opsi2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
