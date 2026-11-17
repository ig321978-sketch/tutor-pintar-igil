/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab B "Teras Penuh Barang",
 * lanjutan cerita Festival Mainan Kardus. Angka Story (sembilan barang: lengkung tiga, segitiga dua, segi empat empat; merah lima, biru empat;
 * besar tiga, kecil enam) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai barang dan bilangan lain dan melanjutkan
 * "Misi Festival" bagian satu sampai sepuluh. Diuji: scripts/uji-teras-k1b4b.mjs.
 */
import type { Aturan, Benda, Bentuk, Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, bd, bds, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar potongan bahan di Concrete (menurut bentuk): piringan lengkung, bendera segitiga, kotak kado segi empat. */
export const EMOJI: Record<Bentuk, string> = { lengkung: "\u{1F94F}", segitiga: "\u{1F6A9}", segiempat: "\u{1F381}" };
/** Nama benda untuk pembaca layar di Concrete. */
export const NAMA_BENDA: Record<Bentuk, string> = { lengkung: "piringan", segitiga: "bendera", segiempat: "kotak" };
/** Warna isi dan garis tiap warna barang. */
export const WARNA: Record<string, [string, string]> = { merah: ["#F87171", "#B91C1C"], biru: ["#60A5FA", "#1D4ED8"], kuning: ["#FDE047", "#A16207"] };
export const IKON_ATURAN: Record<Aturan, string> = { bentuk: "\u{1F537}", warna: "\u{1F3A8}", ukuran: "\u{1F4CF}" };

/* ------------------------------ Mind-map: pagar teras (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PAGAR = "Mengelompokkan benda";
export const KELOMPOK_PAGAR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Keset", ikon: "\u{1F9E9}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di keset depan pagar." },
  metode: { nama: "Penyelesaian", letak: "Papan pagar", ikon: "\u{1F528}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di papan pagar yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Pot gantung", ikon: "\u{1F33C}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di pot gantung." },
};
export const TEMPAT_PAGAR: Tempat[] = [
  tp("ks-1", "masalah", "Benda bercampur"),
  tp("ks-2", "masalah", "Sulit mencari bahan"),
  tp("ks-3", "masalah", "Perlu aturan memilah"),
  tp("pg-1", "metode", "Pilih satu aturan", 1),
  tp("pg-2", "metode", "Periksa tiap benda", 2),
  tp("pg-3", "metode", "Taruh di keranjangnya", 3),
  tp("pg-4", "metode", "Beri nama, hitung isi", 4),
  tp("pg-5", "metode", "Pilah ciri", 5),
  tp("pg-6", "metode", "Tebak aturan", 6),
  tp("pg-7", "metode", "Cari yang beda", 7),
  tp("pt-1", "hasil", "Benda rapi, mudah dicari"),
  tp("pt-2", "hasil", "Nama memberi tahu isi"),
  tp("pt-3", "hasil", "Semua isi = semua benda"),
  tp("pt-4", "hasil", "Ganti aturan, bisa pindah"),
];
export const PETUNJUK_URUT_PAGAR = "Warnanya sudah benar. Nomor papannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAGAR =
  "Ini pagar teras. Keset berisi masalah. Papan pagar bernomor berisi langkah yang berurutan, ikuti nomornya. Pot gantung berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: karton telur di teras ------------------------------ */
export const KOLOM_TELUR = ["Keranjang", "Isi tiap keranjang", "Semua"] as const;
export const BARIS_TELUR: { aturan: Aturan; keranjang: string; isi: string; semua: string }[] = [
  { aturan: "bentuk", keranjang: "lengkung, segitiga, segi empat", isi: "3, 2, 4", semua: "3 + 2 + 4 = 9" },
  { aturan: "warna", keranjang: "merah, biru", isi: "5, 4", semua: "5 + 4 = 9" },
  { aturan: "ukuran", keranjang: "besar, kecil", isi: "3, 6", semua: "3 + 6 = 9" },
];
export const TEMPAT_TELUR: Tempat[] = BARIS_TELUR.flatMap((b, i) => [tp(`t${i}-kr`, "keranjang", b.keranjang), tp(`t${i}-isi`, "isi", b.isi), tp(`t${i}-sm`, "semua", b.semua)]);
export const KELOMPOK_TELUR: Record<string, string> = {
  keranjang: "Label ini nama keranjang. Tempelkan di kolom Keranjang.",
  isi: "Label ini isi tiap keranjang. Tempelkan di kolom Isi tiap keranjang.",
  semua: "Label ini jumlah semua barang. Tempelkan di kolom Semua.",
};
export const SUARA_TELUR =
  "Ini catatan di karton telur, berisi data dari cerita. Tiap baris satu aturan: bentuk, warna, dan ukuran. Tempelkan nama keranjang, isi tiap keranjang, dan jumlah semuanya.";

/* ------------------------------ Simulasi: Misi Festival bagian satu, rak teras ------------------------------ */
/** Delapan barang berbeda dari Story; belum ada yang kuning, jadi keranjang kuning mula-mula kosong. */
export const BARANG_SIM: Benda[] = bds("Lm+", "Sb-", "Em-", "Lb-", "Sm+", "Eb+", "Lm-", "Eb-");
export const MISI_TERAS =
  "Misi Festival bagian satu: rak teras. Pilih aturan bentuk, warna, atau ukuran, lalu lihat barang pindah keranjang. Ketuk barang, cat, atau ubah ukurannya.";

/* ------------------------------ CPA: lanjutan Misi Festival ------------------------------ */
const pilah = (aturan: Aturan, tanya: string, ...isi: string[]): Extract<Langkah, { tipe: "pilah" }> => ({ tipe: "pilah", aturan, tanya, isi: bds(...isi) });
const ganti = (dari: Aturan, ke: Aturan, tanya: string, ...isi: string[]): Langkah => ({ tipe: "ganti", dari, ke, tanya, isi: bds(...isi) });
const tebak = (aturan: Aturan, kiri: string[], kanan: string[], tanya?: "kiri" | "kanan"): Langkah =>
  tanya ? { tipe: "tebak", aturan, kiri: bds(...kiri), kanan: bds(...kanan), tanya } : { tipe: "tebak", aturan, kiri: bds(...kiri), kanan: bds(...kanan) };
const beda = (...isi: string[]): Langkah => ({ tipe: "beda", isi: isi.map(bd) });

const misi =
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

const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Festival 2: keranjang cat", "Abang memilah potongan bahan sebelum dicat. Bantu Igil menaruh tiap potongan di keranjangnya.", [
    { ...pilah("warna", "kuning", "Lm+", "Sb-", "Em-", "Lb+", "Sm+", "Eb-"), klaim: { tokoh: "Igil", angka: 3, alasan: "Igil menghitung barang besar, padahal aturannya warna. Tidak ada barang kuning, jadi keranjang kuning kosong." } },
    ganti("bentuk", "ukuran", "besar", "Lm+", "Lk-", "Sb+", "Sk+", "Em+", "Eb-", "Ek+", "Lb-"),
    tebak("warna", ["Lb+", "Sb-", "Eb+", "Lb-"], ["Sm+", "Ek-", "Lm-"]),
    beda("Lb+", "Lb-", "Lk+", "Lb-"),
  ]),
  C(2, "kanvas", "Misi Festival 3: tanda di teras", "Kaka menandai potongan bahan di lantai teras. Lingkari, lalu tulis jawabanmu.", [
    pilah("bentuk", "lengkung", "Lm-", "Sb+", "Ek-", "Lb+", "Em+", "Sk-", "Eb-"),
    ganti("warna", "bentuk", "segitiga", "Sm+", "Lm-", "Sb-", "Eb+", "Sk+", "Lk-", "Sm-"),
    tebak("ukuran", ["Lm+", "Sb+", "Ek+"], ["Em-", "Lb-", "Sk-", "Lk-"]),
    beda("Em+", "Eb+", "Ek+", "Em+", "Eb-", "Ek+", "Em+"),
  ]),
  C(3, "suara", "Misi Festival 4: telepon Mamah", "Mamah menelepon dari pasar dan bertanya isi keranjang. Jawab dengan suaramu.", [
    pilah("ukuran", "kecil", "Lm-", "Sb-", "Ek-", "Lk-", "Sm+", "Eb-", "Lb-", "Sk-", "Em-", "Lb+"),
    ganti("ukuran", "warna", "kuning", "Lm+", "Sk-", "Eb+", "Lb-", "Sm-", "Em+"),
    tebak("warna", ["Lm+", "Sm-", "Em+", "Lm-", "Sm+", "Em-", "Lm-"], ["Sb+", "Ek-"], "kiri"),
    beda("Sm+", "Sb-", "Sk+", "Sm-", "Sb+", "Lk-", "Sm+", "Sb-", "Sk-", "Sm+"),
  ]),
];

const P = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Festival 5: gambar bangun", "Kaka menggambar tiap potongan bahan sebagai bangun polos berwarna.", [
    { ...pilah("bentuk", "segitiga", "Sm-", "Lb+", "Sk+", "Em-", "Sb-", "Lk-", "Sm+", "Eb+"), klaim: { tokoh: "Kaka", angka: 4, alasan: "Kaka memeriksa tiap barang. Semua yang punya tiga sudut masuk keranjang segitiga, warna dan ukurannya tidak dihiraukan." } },
    ganti("warna", "ukuran", "kecil", "Lm-", "Sm-", "Em+", "Lm-", "Sb-", "Eb-", "Lb+", "Ek-", "Sk-"),
    tebak("bentuk", ["Lm+", "Lb-", "Lk+"], ["Sm+", "Eb-", "Sk-", "Em+"]),
    beda("Lk+", "Eb+", "Lb+", "Ek+", "Lk-", "Eb+"),
  ]),
  P(2, "kanvas", "Misi Festival 6: tanda di gambar", "Abang meminta Igil melingkari bangun di gambar, lalu menulis jawabannya.", [
    pilah("warna", "biru", "Lb+", "Sm-", "Eb-", "Lk+", "Sb+", "Em-"),
    ganti("bentuk", "warna", "merah", "Lb+", "Sk-", "Em+", "Eb-", "Lk-"),
    tebak("warna", ["Sk+", "Lk-", "Ek-", "Sk-"], ["Lm+", "Eb-", "Sb+"]),
    beda("Lb+", "Sb-", "Eb+", "Lb-", "Sm+", "Eb-", "Lb+", "Sb-", "Eb+"),
  ]),
  P(3, "suara", "Misi Festival 7: lapor ke Abang", "Abang sedang mengecat di halaman. Laporkan isi keranjang dengan suaramu.", [
    pilah("warna", "kuning", "Lm+", "Sb-", "Em-", "Lb-", "Sm+", "Eb+", "Sb+"),
    ganti("ukuran", "bentuk", "lengkung", "Lm+", "Lb+", "Sk+", "Lk+", "Lm-", "Eb-", "Lb-", "Lk-", "Sm-"),
    tebak("ukuran", ["Lm-", "Sb-", "Ek-", "Lb-", "Em-"], ["Sm+", "Lk+"], "kanan"),
    beda("Lm+", "Sb+", "Ek+", "Sm+", "Eb+", "Lk+", "Em+", "Sb-", "Lb+", "Ek+"),
  ]),
];

const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Festival 8: kartu kata", "Kaka menulis ciri tiap potongan bahan di kartu kecil, tanpa gambar.", [
    { ...pilah("ukuran", "kecil", "Lm+", "Sb-", "Ek+", "Lk-", "Sm+", "Eb-", "Lb+"), klaim: { tokoh: "Abang", angka: 4, alasan: "Abang ikut menghitung segi empat kuning yang besar. Aturannya ukuran, jadi hitung yang kecil saja." } },
    ganti("bentuk", "warna", "biru", "Lb+", "Lb-", "Lb+", "Sb+", "Sb-", "Sk-", "Eb+", "Eb-", "Eb+", "Em-"),
    tebak("ukuran", ["Lm-", "Sb-", "Ek-"], ["Lb+", "Sm+", "Ek+", "Em+"]),
    beda("Em+", "Ek+", "Em-", "Lk-", "Ek-"),
  ]),
  A(2, "kanvas", "Misi Festival 9: tulis jawaban", "Kaka meminta Igil melingkari kartu, lalu menulis jawabannya di kanvas.", [
    pilah("bentuk", "lengkung", "Sb+", "Lm-", "Ek+", "Sk-", "Eb-"),
    ganti("warna", "ukuran", "besar", "Lm-", "Sm+", "Eb-", "Lb-", "Sk+", "Ek-"),
    tebak("bentuk", ["Sm+", "Sb-", "Sk+", "Sm-"], ["Lb+", "Em-", "Ek+"]),
    beda("Lk+", "Sk-", "Ek+", "Lk-", "Sm+", "Ek-", "Lk+", "Sk-"),
  ]),
  A(3, "suara", "Misi Festival 10: teras rapi", "Semua bahan sudah rapi. Bacakan jawaban terakhir untuk Mamah.", [
    pilah("bentuk", "segitiga", "Lm+", "Eb-", "Lk-", "Em+", "Lb-", "Ek+"),
    ganti("ukuran", "warna", "merah", "Lm+", "Sm+", "Em+", "Eb+", "Lm-", "Sm-", "Em-", "Sk-"),
    tebak("bentuk", ["Em+", "Eb-", "Ek+", "Em-", "Eb+"], ["Lm+", "Sb-", "Lk-"], "kiri"),
    beda("Lm-", "Sb-", "Ek-", "Sm-", "Eb-", "Lk-", "Em-", "Lb+", "Sk-", "Eb-"),
  ]),
];

export const POIN_PENTING = [
  "Pilih satu aturan dulu: bentuk, warna, atau ukuran.",
  "Periksa tiap benda, lalu taruh di keranjang yang cocok dengan aturannya.",
  "Beri nama tiap keranjang, lalu hitung isinya. Keranjang boleh kosong, isinya 0.",
  "Isi semua keranjang jika dijumlahkan sama dengan banyak semua benda.",
  "Kalau aturan diganti, benda yang sama bisa pindah ke keranjang lain.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/0/g, "nol"));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9FA}", nama: "Concrete", cara: "Potongan bahan: ketuk, lingkari, dan ucapkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Bangun polos: ketuk, lingkari, dan ucapkan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;
