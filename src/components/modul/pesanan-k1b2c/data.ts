/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab C "Pesanan Tetangga",
 * sub-bab terakhir dan akhir cerita Kebun Sayur Mamah. Angka Story (tomat empat dan tiga, timun dua dan lima, wortel enam dan
 * jagung empat; bawang tiga dan dua, terong tiga dan enam, kentang dua dan enam) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Pesanan" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-pesanan-k1b2c.mjs.
 */
import type { Cara, Jenis, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";
import { pilihanKalimat } from "../kebun-k1b2a/data";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export { EMOJI } from "../kebun-k1b2a/data";

/* ------------------------------ Mind-map: loker pos (hanya poin pelajaran) ------------------------------ */
export const PUSAT_LOKER = "Soal cerita penjumlahan";
export const KELOMPOK_LOKER: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Amplop masuk", ikon: "\u{2709}\u{FE0F}", isi: "#FEF3C7", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di amplop masuk." },
  metode: { nama: "Penyelesaian", letak: "Loker", ikon: "\u{1F4EE}", isi: "#C7D2FE", garis: "#4338CA", petunjuk: "Label ini ungu muda. Tempelkan di loker yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Kantong kirim", ikon: "\u{1F69A}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di kantong kirim." },
};
export const TEMPAT_LOKER: Tempat[] = [
  tp("am-1", "masalah", "Pesanan berbentuk cerita"),
  tp("am-2", "masalah", "Kiriman harus tepat"),
  tp("am-3", "masalah", "Berapa semuanya?"),
  tp("lk-1", "metode", "Baca ceritanya", 1),
  tp("lk-2", "metode", "Cari dua bilangan", 2),
  tp("lk-3", "metode", "Pilih tanda tambah", 3),
  tp("lk-4", "metode", "Tulis kalimatnya", 4),
  tp("lk-5", "metode", "Jawab kalimat lengkap", 5),
  tp("lk-6", "metode", "Periksa jawaban", 6),
  tp("lk-7", "metode", "Peragakan", 7),
  tp("lk-8", "metode", "Baca, gambar, tulis", 8),
  tp("lk-9", "metode", "Model batang", 9),
  tp("kk-1", "hasil", "Pesanan terkirim tepat"),
  tp("kk-2", "hasil", "Bisa menjawab lengkap"),
  tp("kk-3", "hasil", "Jawaban sudah diperiksa"),
];
export const PETUNJUK_URUT_LOKER = "Warnanya sudah benar. Nomor lokernya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_LOKER =
  "Ini loker pos belajar soal cerita. Amplop masuk berisi masalah. Loker bernomor berisi langkah yang berurutan, ikuti nomornya. Kantong kirim berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: label kiriman ------------------------------ */
export const KOLOM_LABEL = ["Bilangan", "Kalimat", "Jawaban"] as const;
export const BARIS_LABEL: { benda: string; nama: string; untuk: string; bilangan: string; kalimat: string; jawaban: string }[] = [
  { benda: "tomat", nama: "Tomat", untuk: "Tetangga sebelah", bilangan: "4 dan 3", kalimat: "4 + 3 = 7", jawaban: "Jadi, 7 tomat" },
  { benda: "timun", nama: "Timun", untuk: "Tetangga ujung jalan", bilangan: "2 dan 5", kalimat: "2 + 5 = 7", jawaban: "Jadi, 7 timun" },
  { benda: "jagung", nama: "Sayur", untuk: "Nenek", bilangan: "6 dan 4", kalimat: "6 + 4 = 10", jawaban: "Jadi, 10 sayur" },
];
export const TEMPAT_LABEL: Tempat[] = BARIS_LABEL.flatMap((b, i) => [tp(`l${i}-bilangan`, "bilangan", b.bilangan), tp(`l${i}-kalimat`, "kalimat", b.kalimat), tp(`l${i}-jawaban`, "jawaban", b.jawaban)]);
export const KELOMPOK_LABEL: Record<string, string> = {
  bilangan: "Label ini dua bilangan dari cerita. Tempelkan di kolom Bilangan.",
  kalimat: "Label ini kalimat penjumlahan. Tempelkan di kolom Kalimat.",
  jawaban: "Label ini jawaban lengkap. Tempelkan di kolom Jawaban.",
};
export const SUARA_LABEL = "Ini label kiriman dari cerita. Tiap label satu pesanan. Tempelkan dua bilangannya, kalimat penjumlahannya, dan jawaban lengkapnya.";

/* ------------------------------ Simulasi: Misi Pesanan bagian satu ------------------------------ */
export const MISI_PESANAN = "Misi Pesanan: buat cerita pesananmu sendiri, periksa jawabannya, lalu kirim pesanannya.";

/* ------------------------------ CPA: lanjutan Misi Pesanan ------------------------------ */
const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, benda: string, nama: string, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    benda,
    nama,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, nama);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });
const kal = (a: number, b: number, jenis: Jenis, geser: number): Langkah => ({ tipe: "kalimat", a, b, jenis, pilihan: pilihanKalimat(a, b, geser) });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "wortel", "wortel", "Misi Pesanan 2: pesanan wortel", "Pesanan wortel datang. Bantu Igil membaca dan menghitungnya.", [kal(3, 5, "gabung", 1), { tipe: "peraga", a: 1, b: 5, jenis: "datang" }, { tipe: "gambar", a: 2, b: 2, jenis: "gabung" }, { tipe: "batang", a: 5, b: 3, jenis: "datang" }]),
  C(2, "kanvas", "jagung", "jagung", "Misi Pesanan 3: catatan jagung", "Kaka mencatat pesanan jagung di kanvas. Beri tanda, gambar, dan tulis.", [kal(1, 8, "datang", 2), { tipe: "peraga", a: 4, b: 5, jenis: "gabung" }, { tipe: "gambar", a: 1, b: 2, jenis: "datang" }, { tipe: "batang", a: 7, b: 3, jenis: "gabung" }]),
  C(3, "suara", "kentang", "kentang", "Misi Pesanan 4: pesan suara kentang", "Ada pesan suara tentang kentang. Jawab dengan suaramu.", [{ tipe: "cerita", a: 6, b: 1, jenis: "datang" }, { tipe: "peraga", a: 0, b: 2, jenis: "gabung" }, { tipe: "gambar", a: 1, b: 0, jenis: "datang" }, { tipe: "batang", a: 4, b: 1, jenis: "gabung" }]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "bibit", "bawang", "Misi Pesanan 5: denah pesanan", "Abang menggambar pesanan bawang dengan titik dan batang.", [kal(5, 1, "datang", 0), { tipe: "peraga", a: 3, b: 3, jenis: "gabung" }, { tipe: "gambar", a: 1, b: 6, jenis: "datang" }, { tipe: "batang", a: 8, b: 1, jenis: "gabung" }]),
  P(2, "kanvas", "bibit", "terong", "Misi Pesanan 6: papan pesanan", "Abang meminjamkan papan pesanan. Lingkari, gambar, dan tulis.", [kal(4, 4, "gabung", 2), { tipe: "peraga", a: 0, b: 5, jenis: "datang" }, { tipe: "gambar", a: 3, b: 1, jenis: "gabung" }, { tipe: "batang", a: 9, b: 1, jenis: "datang" }]),
  P(3, "suara", "bibit", "selada", "Misi Pesanan 7: laporan pesanan", "Kaka melaporkan pesanan selada ke Mamah. Sebutkan jawabanmu.", [{ tipe: "cerita", a: 1, b: 2, jenis: "gabung" }, { tipe: "peraga", a: 2, b: 0, jenis: "datang" }, { tipe: "gambar", a: 1, b: 0, jenis: "gabung" }, { tipe: "batang", a: 5, b: 3, jenis: "datang" }]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "bibit", "timun", "Misi Pesanan 8: catatan pesanan", "Kaka menulis pesanan timun dengan angka dan tanda.", [kal(7, 2, "datang", 1), { tipe: "peraga", a: 4, b: 2, jenis: "gabung" }, { tipe: "gambar", a: 3, b: 5, jenis: "datang" }, { tipe: "batang", a: 5, b: 4, jenis: "gabung" }]),
  A(2, "kanvas", "bibit", "tomat", "Misi Pesanan 9: tulis jawaban", "Abang meminta Igil menulis jawaban pesanan tomat di kanvas.", [kal(2, 8, "gabung", 0), { tipe: "peraga", a: 1, b: 6, jenis: "datang" }, { tipe: "gambar", a: 4, b: 1, jenis: "gabung" }, { tipe: "batang", a: 8, b: 2, jenis: "datang" }]),
  A(3, "suara", "bibit", "sawi", "Misi Pesanan 10: pesanan terakhir", "Ini pesanan terakhir sebelum pesta panen. Bacakan jawabannya untuk Mamah.", [{ tipe: "cerita", a: 3, b: 1, jenis: "datang" }, { tipe: "peraga", a: 1, b: 2, jenis: "gabung" }, { tipe: "gambar", a: 2, b: 0, jenis: "datang" }, { tipe: "batang", a: 1, b: 0, jenis: "gabung" }]),
];

export const POIN_PENTING = [
  "Baca ceritanya pelan-pelan.",
  "Cari dua bilangan yang dipakai dalam cerita.",
  "Kata datang lagi, digabung, dan semuanya berarti memakai tanda +.",
  "Tulis kalimat penjumlahan, misalnya 4 + 3 = 7.",
  "Jawab dengan kalimat lengkap: Jadi, 7 tomat.",
  "Periksa lagi dengan tukar tempat atau hitung maju.",
];
/** Poin penting untuk suara (tanpa lambang dan digit). */
export const POIN_PENTING_SUARA = [
  "Baca ceritanya pelan-pelan.",
  "Cari dua bilangan yang dipakai dalam cerita.",
  "Kata datang lagi, digabung, dan semuanya berarti memakai tanda tambah.",
  "Tulis kalimat penjumlahan, misalnya empat ditambah tiga sama dengan tujuh.",
  "Jawab dengan kalimat lengkap: jadi, tujuh tomat.",
  "Periksa lagi dengan tukar tempat atau hitung maju.",
];

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F69A}", nama: "Concrete", cara: "Sayur pesanan: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F5FA}\u{FE0F}", nama: "Pictorial", cara: "Titik dan batang: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{2709}\u{FE0F}", nama: "Abstract", cara: "Angka, tanda, dan kata saja: ketuk, tulis, dan ucapkan" },
} as const;
