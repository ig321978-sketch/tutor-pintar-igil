// Uji data CPA Opsi 2 Kelas 1 Bab 1 Sub-Bab A: tahap Concrete (src/data/opsi2/k1b1a-cpa.ts).
// Pakai: node --no-warnings scripts/uji-opsi2-k1a-concrete.mjs
import { register } from "node:module";
import fs from "node:fs";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const M = await import("../src/lib/opsi2/index.ts");
const { CPA_K1B1A } = await import("../src/data/opsi2/k1b1a-cpa.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };

// Urutan tindakan yang disetujui (katalog bagian 6, urutan bebas; tiap tahap sepuluh tindakan berbeda).
const KATALOG_CONCRETE = {
  "c-ketuk-hitung": "ketuk apel satu per satu lalu pilih banyaknya",
  "c-geser-piring": "geser apel ke piring lalu sebut banyaknya",
  "c-seret-keranjang": "seret apel ke keranjang sampai tepat n",
  "c-melingkar-bendera": "hitung benda melingkar dengan bendera",
  "c-sekilas": "lihat sekilas satu sampai empat",
  "c-pilah-apel": "pilah apel dari jeruk lalu hitung apel",
  "c-jejer-deret": "jejerkan benda berserakan menjadi satu deret",
  "c-isi-nampan": "isi nampan bingkai sepuluh sampai tepat n",
  "c-keranjang-kosong": "pilih keranjang kosong (nol)",
  "c-cari-terlewat": "cari apel yang terlewat dihitung",
};

const c = CPA_K1B1A.concrete;
cek(c.status === "lengkap", "Concrete berstatus lengkap");
cek(c.soal.length === 10, "tepat sepuluh soal");
cek(c.soal.map((s) => s.nomor).join() === "1,2,3,4,5,6,7,8,9,10", "nomor 1 sampai 10 berurutan");
cek(M.validasiKatalog(c.soal, "concrete").length === 0, `validator katalog: ${M.validasiKatalog(c.soal, "concrete").join(" | ")}`);
cek(new Set(c.soal.map((s) => s.tindakan)).size === 10, "sepuluh tindakan berbeda");
cek(JSON.stringify(c.soal.map((s) => s.tindakan).sort()) === JSON.stringify(Object.keys(KATALOG_CONCRETE).sort()), "tindakan sesuai katalog bagian 6 (sepuluh, tanpa lebih atau kurang)");
for (const s of c.soal) {
  const g = [...M.periksaTeks(s.instruksi.replace(/\{\w+\}/g, "tujuh"), `soal ${s.nomor} instruksi`)];
  cek(g.length === 0, g.join(" | "));
  cek(s.instruksi.trim().length > 8, `soal ${s.nomor}: instruksi terisi`);
  cek(/\{n\}/.test(s.instruksi) === ["c-seret-keranjang", "c-isi-nampan"].includes(s.tindakan), `soal ${s.nomor}: sisipan {n} hanya pada soal yang menyebut banyaknya`);
  cek(!/\d/.test(JSON.stringify(s.instruksi)), `soal ${s.nomor}: instruksi tanpa digit`);
}
// Instruksi unik dan orisinal (tidak ada dua soal berinstruksi sama; tidak ada kalimat dari buku: dipindai uji-orisinalitas).
cek(new Set(c.soal.map((s) => s.instruksi)).size === 10, "instruksi tiap soal berbeda");
// Rentang param: bilangan 0 sampai 10.
for (const s of c.soal) for (const [k, v] of Object.entries(s.param)) if (/rentang/.test(k)) cek(v[0] >= 0 && v[1] <= 10 && v[0] <= v[1], `soal ${s.nomor}: ${k} dalam nol sampai sepuluh`);
// Setiap soal terbangkitkan untuk beberapa benih dan memenuhi aturan umum.
for (const s of c.soal) for (let b = 1; b <= 50; b += 1) {
  const g = M.periksaInstansUmum(M.buatSoal(s, b), "concrete");
  cek(g.length === 0, g.join(" | "));
}
// Nama tokoh pada instruksi hanya yang diizinkan; tanpa gelar.
const DIIZINKAN = new Set(["Lintang", "Niko", "Tala", "Igil", "Nenek"]);
for (const s of c.soal) for (const m of s.instruksi.matchAll(/(?<=[a-z,] )([A-Z][a-z]{2,})\b/g)) cek(DIIZINKAN.has(m[1]), `soal ${s.nomor}: nama "${m[1]}" tidak diizinkan`);
// Nol dipakai (soal keranjang kosong) dan lambang tidak jadi jawaban.
cek(c.soal.some((s) => s.tindakan === "c-keranjang-kosong"), "soal nol ada");
// Kerangka Picture dan Abstract: sepuluh soal bernomor lengkap, ditandai jelas belum ditulis.
for (const t of ["picture", "abstract"]) {
  const d = CPA_K1B1A[t];
  cek(d.soal.length === 10 && d.soal.map((s) => s.nomor).join() === "1,2,3,4,5,6,7,8,9,10", `${t}: struktur sepuluh soal`);
  cek(d.status === "belum-ditulis" || M.validasiKatalog(d.soal, t).length === 0, `${t}: ditandai belum-ditulis atau lengkap dan sah`);
  cek(new Set(d.soal.map((s) => s.tindakan)).size === 10, `${t}: sepuluh tindakan berbeda`);
}
// Berkas ekspor tahap tersedia dan memakai TahapOpsi2.
const ekspor = fs.existsSync("src/components/modul/opsi2/k1b1a-concrete.tsx") ? fs.readFileSync("src/components/modul/opsi2/k1b1a-concrete.tsx", "utf8") : "";
cek(/export (function|const) ConcreteK1B1KA/.test(ekspor) && /TahapOpsi2/.test(ekspor) && /CPA_K1B1A/.test(ekspor), "k1b1a-concrete.tsx mengekspor ConcreteK1B1KA berbasis TahapOpsi2 dan data Concrete");

console.log(`Uji Concrete K1 Bab 1 Sub-Bab A: ${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal ? 1 : 0);
