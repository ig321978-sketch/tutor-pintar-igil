// Uji Rapor per BAB (src/lib/bab-rapor.ts): kode bab lintas mata pelajaran dan kelas, pemisahan bab aktif dan tuntas,
// urutan terbaru, catatan Ujian lama, kode tidak resmi diabaikan, dan huruf Sub-Bab.
// Jalankan: node --no-warnings scripts/uji-bab-rapor.mjs
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const R = await import("../src/lib/bab-rapor.ts");
const C = await import("../src/lib/capaian.ts");

let lulus = 0;
let gagal = 0;
const cek = (ok, pesan) => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

/* Kode bab */
sama(R.uraiKodeBab("mtk-1-bab3"), { mapel: "Matematika", kelas: 1, nomor: 3 }, "uraikan mtk-1-bab3");
sama(R.uraiKodeBab("mtk-2-bab8"), { mapel: "Matematika", kelas: 2, nomor: 8 }, "uraikan mtk-2-bab8");
sama(R.uraiKodeBab("pai-1-bab2"), { mapel: "PAI", kelas: 1, nomor: 2 }, "mapel lain dikenali dari awalan");
for (const x of ["mtk-1-bab1-lama", "mtk-1-bab2-p3", "mtk-1-bab2-laporan", "bab1", ""]) cek(R.uraiKodeBab(x) === null, `bukan kode resmi: ${x}`);
sama(R.labelBab("mtk-2-bab5"), "Matematika · Kelas 2", "label bab");

/* Bab aktif dan tuntas, lintas kelas */
let g = {};
g = C.catatSubBab(g, "mtk-1-bab1", "A", new Date("2026-11-01T01:00:00Z"));
g = C.catatSubBab(g, "mtk-2-bab3", "A", new Date("2026-11-05T01:00:00Z"));
g = C.catatSubBab(g, "mtk-1-bab3", "A", new Date("2026-11-03T01:00:00Z"));
g = C.catatSubBab(g, "mtk-1-bab2-lama", "A", new Date("2026-11-06T01:00:00Z"));
g = C.catatUjian(g, "mtk-1-bab1", 100, new Date("2026-11-07T01:00:00Z"));

let h = R.babDariCapaian(g, C.babUjianSempurna(g));
sama(h.aktif.map((b) => b.kode), ["mtk-2-bab3", "mtk-1-bab3"], "bab aktif lintas kelas, terbaru di atas, bab tuntas dan kode tidak resmi keluar");
sama(h.selesai.map((b) => b.kode), ["mtk-1-bab1"], "bab tuntas terpisah");
cek(h.aktif.every((b) => !b.ringkas.ujianSempurna), "bab aktif belum Ujian 100%");

/* Persen materi: Kelas 1 diketahui, Kelas 2 belum diketahui */
sama(h.aktif.find((b) => b.kode === "mtk-1-bab3").ringkas.materiPersen, 25, "Bab 3 Kelas 1: satu dari empat Sub-Bab");
sama(h.aktif.find((b) => b.kode === "mtk-2-bab3").ringkas.materiPersen, 0, "Kelas 2: jumlah Sub-Bab belum diketahui, tidak mengarang persen");

/* Ujian lama (catatan terpisah) tetap tuntas */
h = R.babDariCapaian(g, new Set(["mtk-1-bab3"]));
sama(h.selesai.map((b) => b.kode).sort(), ["mtk-1-bab1", "mtk-1-bab3"], "ujian lama menuntaskan bab");
cek(!h.aktif.some((b) => b.kode === "mtk-1-bab3"), "bab tuntas lama tidak lagi aktif");

/* Bab yang hanya ada di catatan ujian lama dan belum ada catatan lain */
h = R.babDariCapaian({}, new Set(["mtk-2-bab1"]));
sama(h.selesai.map((b) => b.kode), ["mtk-2-bab1"], "ujian lama tanpa catatan lain tetap tampil tuntas");
sama(R.babDariCapaian({}, new Set()), { aktif: [], selesai: [] }, "gudang kosong");

/* Bab berisi catatan kosong tidak dianggap sedang dipelajari */
h = R.babDariCapaian({ "mtk-1-bab5": C.babKosong() }, new Set());
sama(h.aktif, [], "catatan kosong bukan bab aktif");

/* Huruf Sub-Bab */
sama(R.hurufSubBab("mtk-1-bab3", ["A"]), ["A", "B", "C", "D"], "huruf lengkap bila jumlah diketahui");
sama(R.hurufSubBab("mtk-2-bab3", ["B", "A"]), ["A", "B"], "huruf hanya yang selesai bila jumlah belum diketahui");
sama(R.hurufSubBab("mtk-2-bab3", []), [], "tanpa Sub-Bab selesai");

console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
