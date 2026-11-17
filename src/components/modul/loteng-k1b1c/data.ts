/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab C "Tangga Gudang Loteng".
 * Angka Story (naik satu sampai sepuluh, turun sepuluh sampai nol, dari lima ke delapan, sebelum dan sesudah enam, hilang tiga dan tujuh,
 * jalur empat, hitung lanjut enam ke sembilan, tongkat tujuh dan tiga dari lima) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai angka lain dan melanjutkan "Misi Gudang Loteng" bagian satu sampai sepuluh. Diuji: scripts/uji-loteng-k1b1c.mjs.
 */
import type { Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: tangga belajar (hanya poin pelajaran) ------------------------------ */
export const PUSAT_TANGGA = "Menghitung maju dan mundur";
export const KELOMPOK_TANGGA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Lantai", ikon: "\u{2753}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah. Tempelkan di lantai yang merah." },
  metode: { nama: "Penyelesaian", letak: "Anak tangga", ikon: "\u{1F463}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di anak tangga yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Loteng", ikon: "\u{2B50}", isi: "#C7D2FE", garis: "#4338CA", petunjuk: "Label ini ungu. Tempelkan di loteng yang ungu." },
};
export const TEMPAT_TANGGA: Tempat[] = [
  tp("lt-1", "masalah", "Angka berapa sesudahnya?"),
  tp("lt-2", "masalah", "Angka berapa sebelumnya?"),
  tp("lt-3", "masalah", "Angka mana yang hilang?"),
  tp("at-1", "metode", "Hitung maju: makin besar", 1),
  tp("at-2", "metode", "Hitung mundur: makin kecil", 2),
  tp("at-3", "metode", "Mulai dari angka mana saja", 3),
  tp("at-4", "metode", "Hitung lanjut dari angka itu", 4),
  tp("at-5", "metode", "Sebelum: satu lebih sedikit", 5),
  tp("at-6", "metode", "Sesudah: satu lebih banyak", 6),
  tp("at-7", "metode", "Jalur angka: lihat tetangga", 7),
  tp("at-8", "metode", "Tongkat: mulai nol atau lima", 8),
  tp("at-9", "metode", "Lengkapi yang hilang", 9),
  tp("lo-1", "hasil", "Bisa hitung maju"),
  tp("lo-2", "hasil", "Bisa hitung mundur"),
  tp("lo-3", "hasil", "Bisa mencari yang hilang"),
];
export const PETUNJUK_URUT_TANGGA = "Warnanya sudah benar. Nomor anak tangganya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_TANGGA =
  "Ini tangga belajar menghitung maju dan mundur. Lantai berisi masalah. Anak tangga kuning berisi langkah yang berurutan, naik sesuai nomornya. Loteng berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan gabus catatan loteng ------------------------------ */
export const KOLOM_GABUS = ["Angka", "Cara", "Hasil"] as const;
export const BARIS_GABUS: { kejadian: string; ikon: string; angka: string; cara: string; hasil: string }[] = [
  { kejadian: "Naik tangga", ikon: "\u{2B06}\u{FE0F}", angka: "1 sampai 10", cara: "Hitung maju", hasil: "Makin besar" },
  { kejadian: "Turun tangga", ikon: "\u{2B07}\u{FE0F}", angka: "10 sampai 0", cara: "Hitung mundur", hasil: "Makin kecil" },
  { kejadian: "Kardus jatuh", ikon: "\u{1F4E6}", angka: "5, 6, 7, 8", cara: "Mulai dari tengah", hasil: "Tidak dari 1" },
  { kejadian: "Kardus nomor 6", ikon: "\u{1F4E6}", angka: "5 dan 7", cara: "Sebelum, sesudah", hasil: "Tetangga 6" },
  { kejadian: "Barisan maju", ikon: "\u{2753}", angka: "1, 2, ?, 4", cara: "Lengkapi maju", hasil: "Hilang 3" },
  { kejadian: "Barisan mundur", ikon: "\u{2753}", angka: "9, 8, ?, 6", cara: "Lengkapi mundur", hasil: "Hilang 7" },
];
export const TEMPAT_GABUS: Tempat[] = BARIS_GABUS.flatMap((b, i) => [tp(`g${i}-angka`, "angka", b.angka), tp(`g${i}-cara`, "cara", b.cara), tp(`g${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_GABUS: Record<string, string> = {
  angka: "Label ini berisi deret angka. Tempelkan di kolom Angka.",
  cara: "Label ini cara menghitung. Tempelkan di kolom Cara.",
  hasil: "Label ini hasilnya. Tempelkan di kolom Hasil.",
};
export const SUARA_GABUS = "Ini papan gabus catatan loteng dari cerita. Tiap baris satu kejadian. Tempelkan deret angkanya, caranya, dan hasilnya.";

/* ------------------------------ Simulasi: Misi Gudang Loteng bagian satu ------------------------------ */
/** Kardus tanpa nomor berbeda dari Story (tiga dan tujuh): empat dan sembilan. */
export const HILANG_SIM = [4, 9];
export const MISI_LOTENG = "Misi Gudang Loteng: bawa Igil naik dan turun tangga sambil menghitung, lalu susun kardus urut dan lengkapi nomor yang hilang.";

/* ------------------------------ CPA: lanjutan Misi Gudang Loteng ------------------------------ */
const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Gudang Loteng 2: kardus mainan", "Kardus mainan harus dibawa ke loteng berurutan.", [
    { tipe: "susun", deret: [3, 4, 5, 6, 7] },
    { tipe: "jalur", n: 8, tanya: "sesudah" },
    { tipe: "lanjut", mulai: 2, langkah: 4, arah: "maju" },
    { tipe: "tongkat", tutup: 7, dari: 10 },
  ]),
  C(2, "kanvas", "Misi Gudang Loteng 3: tangga kayu", "Abang menggambar di kanvas untuk menandai tangga dan kardus.", [
    { tipe: "susun", deret: [10, 9, 8, 7, 6] },
    { tipe: "jalur", n: 3, tanya: "sebelum" },
    { tipe: "lanjut", mulai: 7, langkah: 2, arah: "mundur" },
    { tipe: "tongkat", tutup: 8, dari: 10 },
  ]),
  C(3, "suara", "Misi Gudang Loteng 4: panggilan dari loteng", "Kaka memanggil dari loteng. Jawab dengan suaramu.", [
    { tipe: "lengkapi", deret: [3, 2, null, 0] },
    { tipe: "jalur", n: 1, tanya: "sebelum" },
    { tipe: "lanjut", mulai: 7, langkah: 3, arah: "maju" },
    { tipe: "tongkat", tutup: 3, dari: 0 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Gudang Loteng 5: denah kardus", "Abang membuat denah kardus dengan kartu titik.", [
    { tipe: "susun", deret: [4, 5, 6, 7, 8] },
    { tipe: "jalur", n: 5, tanya: "sesudah" },
    { tipe: "lanjut", mulai: 1, langkah: 3, arah: "maju" },
    { tipe: "tongkat", tutup: 9, dari: 10 },
  ]),
  P(2, "kanvas", "Misi Gudang Loteng 6: gambar jalur", "Kaka meminjamkan papan gambar. Tarik garis dan tulis.", [
    { tipe: "susun", deret: [7, 6, 5, 4, 3] },
    { tipe: "jalur", n: 9, tanya: "sebelum" },
    { tipe: "lanjut", mulai: 10, langkah: 3, arah: "mundur" },
    { tipe: "tongkat", tutup: 2, dari: 0 },
  ]),
  P(3, "suara", "Misi Gudang Loteng 7: laporan gambar", "Abang melaporkan gambarnya ke Mamah. Sebutkan jawabanmu.", [
    { tipe: "lengkapi", deret: [null, 9, 8, 7] },
    { tipe: "jalur", n: 0, tanya: "sesudah" },
    { tipe: "lanjut", mulai: 3, langkah: 2, arah: "maju" },
    { tipe: "tongkat", tutup: 0, dari: 5 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Gudang Loteng 8: kartu angka", "Kaka menulis nomor kardus dengan angka saja.", [
    { tipe: "susun", deret: [9, 8, 7, 6, 5] },
    { tipe: "jalur", n: 7, tanya: "sebelum" },
    { tipe: "lanjut", mulai: 4, langkah: 4, arah: "maju" },
    { tipe: "tongkat", tutup: 1, dari: 0 },
  ]),
  A(2, "kanvas", "Misi Gudang Loteng 9: tulis nomor", "Abang meminta Igil menulis nomor kardus di kanvas.", [
    { tipe: "susun", deret: [2, 3, 4, 5, 6] },
    { tipe: "jalur", n: 2, tanya: "sesudah" },
    { tipe: "lanjut", mulai: 9, langkah: 4, arah: "mundur" },
    { tipe: "tongkat", tutup: 4, dari: 5 },
  ]),
  A(3, "suara", "Misi Gudang Loteng 10: loteng rapi", "Loteng sudah rapi. Bacakan nomor terakhir untuk Mamah.", [
    { tipe: "lengkapi", deret: [7, 8, 9, null] },
    { tipe: "jalur", n: 1, tanya: "sebelum" },
    { tipe: "lanjut", mulai: 4, langkah: 2, arah: "mundur" },
    { tipe: "tongkat", tutup: 9, dari: 10 },
  ]),
];

export const POIN_PENTING = [
  "Hitung maju: angkanya makin besar.",
  "Hitung mundur: angkanya makin kecil.",
  "Boleh mulai menghitung dari angka mana saja.",
  "Angka sebelum satu lebih sedikit, angka sesudah satu lebih banyak.",
  "Hitung lanjut dari angka yang sudah diketahui.",
  "Untuk mencari yang hilang, hitung maju atau mundur dari tetangganya.",
];

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F4E6}", nama: "Concrete", cara: "Kardus dan tangga: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Kartu titik, jalur, dan tongkat: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Angka saja: ketuk, tulis, dan ucapkan" },
} as const;
