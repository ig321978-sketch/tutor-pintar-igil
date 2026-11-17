/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab B "Panen Pertama dan
 * Keranjang Sepuluh". Angka Story (tomat tiga dan timun dua ditukar, cabai enam lalu tiga, wortel empat dan empat, dua dan dua,
 * timun tujuh dan tiga; terong lima dan empat, bawang tiga dan tiga, kentang delapan dan dua) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Panen" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-panen-k1b2b.mjs.
 */
import type { Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";
import { pilihanKalimat } from "../kebun-k1b2a/data";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export { EMOJI } from "../kebun-k1b2a/data";

/* ------------------------------ Mind-map: gerobak panen (hanya poin pelajaran) ------------------------------ */
export const PUSAT_GEROBAK = "Berbagai cara menjumlah";
export const KELOMPOK_GEROBAK: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Bendera gerobak", ikon: "\u{1F6A9}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah. Tempelkan di bendera gerobak." },
  metode: { nama: "Penyelesaian", letak: "Karung", ikon: "\u{1F33E}", isi: "#E7D3B0", garis: "#7C4A1E", petunjuk: "Label ini cokelat muda. Tempelkan di karung yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Peti", ikon: "\u{1F4E6}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di peti di depan gerobak." },
};
export const TEMPAT_GEROBAK: Tempat[] = [
  tp("bd-1", "masalah", "Sayur cepat layu"),
  tp("bd-2", "masalah", "Keranjang muat sepuluh"),
  tp("bd-3", "masalah", "Hitung satu-satu lama"),
  tp("kr-1", "metode", "Pasangan bilangan", 1),
  tp("kr-2", "metode", "Tukar tempat, hasil sama", 2),
  tp("kr-3", "metode", "Hitung maju melompat", 3),
  tp("kr-4", "metode", "Penjumlahan berulang", 4),
  tp("kr-5", "metode", "Pasangan sepuluh", 5),
  tp("kr-6", "metode", "Garis bilangan", 6),
  tp("kr-7", "metode", "Hafal penjumlahan kembar", 7),
  tp("kr-8", "metode", "Membuat sepuluh", 8),
  tp("pt-1", "hasil", "Menjumlah lebih cepat"),
  tp("pt-2", "hasil", "Ditukar hasilnya tetap"),
  tp("pt-3", "hasil", "Keranjang penuh sepuluh"),
];
export const PETUNJUK_URUT_GEROBAK = "Warnanya sudah benar. Nomor karungnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_GEROBAK =
  "Ini gerobak panen belajar berbagai cara menjumlah. Bendera berisi masalah. Karung bernomor di bak gerobak berisi langkah yang berurutan, ikuti nomornya. Peti di depan gerobak berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: nota panen ------------------------------ */
export const KOLOM_NOTA = ["Bilangan", "Cara", "Kalimat"] as const;
export const BARIS_NOTA: { benda: string; nama: string; bilangan: string; cara: string; kalimat: string }[] = [
  { benda: "tomat", nama: "Tomat", bilangan: "3 dan 2", cara: "Tukar tempat", kalimat: "2 + 3 = 5" },
  { benda: "cabai", nama: "Cabai", bilangan: "6 dan 3", cara: "Hitung maju", kalimat: "6 + 3 = 9" },
  { benda: "wortel", nama: "Wortel", bilangan: "4 dan 4", cara: "Kembar", kalimat: "4 + 4 = 8" },
  { benda: "wortel", nama: "Wortel kecil", bilangan: "2 dan 2", cara: "Kembar", kalimat: "2 + 2 = 4" },
  { benda: "timun", nama: "Timun", bilangan: "7 dan 3", cara: "Pasangan sepuluh", kalimat: "7 + 3 = 10" },
];
export const TEMPAT_NOTA: Tempat[] = BARIS_NOTA.flatMap((b, i) => [tp(`n${i}-bilangan`, "bilangan", b.bilangan), tp(`n${i}-cara`, "cara", b.cara), tp(`n${i}-kalimat`, "kalimat", b.kalimat)]);
export const KELOMPOK_NOTA: Record<string, string> = {
  bilangan: "Label ini dua bilangan. Tempelkan di kolom Bilangan.",
  cara: "Label ini cara menjumlah. Tempelkan di kolom Cara.",
  kalimat: "Label ini kalimat penjumlahan. Tempelkan di kolom Kalimat.",
};
export const SUARA_NOTA = "Ini nota panen dari cerita. Tiap baris satu sayur. Tulis dua bilangannya, cara menjumlahnya, dan kalimat penjumlahannya.";

/* ------------------------------ Simulasi: Misi Panen bagian satu, meja kemas ------------------------------ */
/** Bilangan awal berbeda dari Story: keranjang kiri tiga, kanan satu. */
export const AWAL_SIM = { a: 3, b: 1 };
export const MISI_PANEN = "Misi Panen: isi dua keranjang di meja kemas, coba tukar tempat, buat yang kembar dan yang penuh sepuluh, lalu catat kalimatnya.";

/* ------------------------------ CPA: lanjutan Misi Panen ------------------------------ */
const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, benda: string, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    benda,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });
const tukar = (a: number, b: number, geser: number): Langkah => ({ tipe: "tukar", a, b, pilihan: pilihanKalimat(b, a, geser) });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "jagung", "Misi Panen 2: gerobak jagung", "Gerobak jagung siap dikemas. Bantu Kaka memakai cara cepat.", [tukar(4, 1, 2), { tipe: "garis", a: 1, b: 4 }, { tipe: "berulang", n: 2, k: 3 }, { tipe: "sepuluh", a: 9 }]),
  C(2, "kanvas", "kentang", "Misi Panen 3: catatan di karung", "Abang menggambar di karung kosong. Beri tanda dan tulis jawabanmu.", [tukar(2, 6, 0), { tipe: "garis", a: 4, b: 3 }, { tipe: "berulang", n: 1, k: 2 }, { tipe: "sepuluh", a: 6 }]),
  C(3, "suara", "bawang", "Misi Panen 4: tetangga menelepon", "Tetangga menelepon dan bertanya. Jawab dengan suaramu.", [{ tipe: "pasangan", a: 7, b: 1 }, { tipe: "garis", a: 1, b: 2 }, { tipe: "berulang", n: 5, k: 2 }, { tipe: "sepuluh", a: 1 }]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "bibit", "Misi Panen 5: denah gudang", "Mamah menggambar denah gudang panen dengan titik.", [tukar(5, 2, 1), { tipe: "garis", a: 3, b: 4 }, { tipe: "berulang", n: 3, k: 3 }, { tipe: "sepuluh", a: 5 }]),
  P(2, "kanvas", "bibit", "Misi Panen 6: papan gudang", "Mamah meminjamkan papan gudang. Lingkari, beri tanda, dan tulis.", [tukar(1, 7, 2), { tipe: "garis", a: 6, b: 2 }, { tipe: "berulang", n: 1, k: 4 }, { tipe: "sepuluh", a: 4 }]),
  P(3, "suara", "bibit", "Misi Panen 7: laporan gudang", "Kaka melaporkan denah gudang ke Nenek. Sebutkan jawabanmu.", [{ tipe: "pasangan", a: 1, b: 0 }, { tipe: "garis", a: 2, b: 1 }, { tipe: "berulang", n: 5, k: 2 }, { tipe: "sepuluh", a: 10 }]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "bibit", "Misi Panen 8: nota kiriman", "Kaka menulis nota kiriman dengan angka dan tanda saja.", [tukar(1, 8, 0), { tipe: "garis", a: 5, b: 1 }, { tipe: "berulang", n: 2, k: 4 }, { tipe: "sepuluh", a: 3 }]),
  A(2, "kanvas", "bibit", "Misi Panen 9: tulis nota", "Abang meminta Igil menulis jawabannya di kanvas.", [tukar(2, 7, 1), { tipe: "garis", a: 8, b: 1 }, { tipe: "berulang", n: 1, k: 2 }, { tipe: "sepuluh", a: 0 }]),
  A(3, "suara", "bibit", "Misi Panen 10: siap dikirim", "Semua sayur siap dikirim. Bacakan jawaban terakhir untuk Mamah.", [{ tipe: "pasangan", a: 2, b: 1 }, { tipe: "garis", a: 3, b: 1 }, { tipe: "berulang", n: 1, k: 5 }, { tipe: "sepuluh", a: 9 }]),
];

export const POIN_PENTING = [
  "Pasangan bilangan boleh ditukar tempat, hasilnya tetap sama: 3 + 2 = 2 + 3.",
  "Hitung maju: mulai dari bilangan pertama, lalu melompat sebanyak bilangan kedua.",
  "Penjumlahan kembar: dua bilangan yang sama ditambahkan, misalnya 4 + 4 = 8.",
  "Penjumlahan berulang: bilangan yang sama ditambahkan beberapa kali.",
  "Pasangan sepuluh: 9 dan 1, 8 dan 2, 7 dan 3, 6 dan 4, 5 dan 5.",
];
/** Poin penting untuk suara (tanpa lambang dan digit). */
export const POIN_PENTING_SUARA = [
  "Pasangan bilangan boleh ditukar tempat, hasilnya tetap sama.",
  "Hitung maju: mulai dari bilangan pertama, lalu melompat sebanyak bilangan kedua.",
  "Penjumlahan kembar: dua bilangan yang sama ditambahkan, misalnya empat ditambah empat sama dengan delapan.",
  "Penjumlahan berulang: bilangan yang sama ditambahkan beberapa kali.",
  "Pasangan sepuluh: sembilan dan satu, delapan dan dua, tujuh dan tiga, enam dan empat, lima dan lima.",
];

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9FA}", nama: "Concrete", cara: "Sayur panen: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Titik, garis bilangan, dan bingkai: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
