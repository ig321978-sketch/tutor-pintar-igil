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

// Benda keseharian, keranjang, pohon, lambang: di dalam kanvas, id unik, ujung garis relatif.
const sedia = [
  ...K1.kumpulBenda("ap", 10, 40, 60, K1.BENDA.apel),
  ...K1.keranjang("kr", 100, 120, 90, 44),
  ...K1.pohon("ph", 240, 150, 1),
  ...K1.lambang("lb", 20, 20, "7"),
  K1.rumput(150),
  K1.jalanSetapak("js"),
];
cek(new Set(sedia.map((o) => o.id)).size === sedia.length, "id benda kit unik");
cek(sedia.every(dalamKanvas), "benda kit di dalam kanvas");
cek(K1.kumpulBenda("ap", 10, 40, 60, K1.BENDA.apel).map((o) => o.id).join(",") === K1.idKumpul("ap", 1, 10).join(","), "idKumpul sama dengan benda yang dibuat");
cek(K1.idKeranjang("kr").length === 2 && K1.keranjang("kr", 0, 0).length === 2, "keranjang dua benda");
cek(K1.idPohon("ph").length === 2 && K1.idLambang("lb").length === 2, "id pohon dan lambang");
const js = K1.jalanSetapak("js");
cek(js.x2 >= 0 && js.x2 < 300 && js.y2 === 0, "jalan setapak memakai ujung relatif (x2 positif pendek, y2 nol)");
const kodeMaks = (s) => [...s].reduce((m, ch) => Math.max(m, ch.codePointAt(0)), 0);
for (const [nama, e] of Object.entries(K1.BENDA)) cek(kodeMaks(e) <= 0x1fa95, `emoji benda ${nama} paling tinggi U+1FA95`);
const ap = K1.benda("a", 10, 10, K1.BENDA.apel, 20, true);
cek(ap.sorot === true && K1.benda("b", 10, 10, K1.BENDA.apel).sorot === undefined, "benda menyorot hanya bila diminta");
cek(K1.KALIMAT_KUNCI_1A.split(" ").length === 8, "kalimat kunci delapan kata");

// Judul: kelengkapan dan keunikan, tanpa gelar dan tanpa kata terlarang.
cek(Object.keys(K1.JUDUL_BAB_K1).length === 8, "delapan judul bab");
cek(Object.keys(K1.JUDUL_SUB_K1).length === 25, "dua puluh lima judul sub-bab");
const semuaJudul = [...Object.values(K1.JUDUL_BAB_K1), ...Object.values(K1.JUDUL_SUB_K1)];
cek(new Set(semuaJudul).size === semuaJudul.length, "judul tidak ada yang kembar");
for (const j of semuaJudul) cek(!/\b(kelompok|kelas|buku|teman)\b/i.test(j), `judul tanpa kata terlarang: ${j}`);

console.log(`uji-kit-story-opsi2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
