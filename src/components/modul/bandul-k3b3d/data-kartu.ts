/**
 * Isi Mind-map (Rak Bandul) dan Infografis (Papan Kenyang) Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Mind-map berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek. Hanya poin pelajaran (tanpa nama tokoh atau benda cerita).
 * Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Tabel Tempat Angka, Garis Bilangan Ganda, Pecah Seribu-Seribu). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis: satu tabel lima baris dari kejadian Story. Data simulasi ada di data-sim.ts. Diuji: scripts/uji-bandul-k3b3d.mjs.
 */
import type { KartuPeta, RingkasanPeta, TemaPeta } from "../peta-kartu/PetaKartu";
import type { BarisInfo, TemaInfo } from "../peta-kartu/InfografisKartu";

const kt = (judul: string, masalah: [string, string], cara: [string, string], hasil: [string, string], contoh: KartuPeta["contoh"] = []): KartuPeta => ({
  judul,
  masalah: { label: masalah[0], arti: masalah[1] },
  cara: { label: cara[0], arti: cara[1] },
  hasil: { label: hasil[0], arti: hasil[1] },
  contoh,
});

export const KARTU_BANDUL: readonly KartuPeta[] = [
  kt(
    "Bandul timbangan kodok",
    ["Bagaimana menimbang?", "Bagaimana menimbang benda dengan timbangan kodok?"],
    ["Pasang bandul", "Benda ditaruh di satu piring, dan bandul dipasang di piring lain sampai timbangan seimbang."],
    ["Seimbang", "Bila timbangan seimbang, berat benda sama dengan jumlah berat bandul."],
    ["masalah"],
  ),
  kt(
    "Jumlah berat bandul",
    ["Berapa beratnya?", "Berapa berat benda yang sedang ditimbang?"],
    ["Jumlahkan bandul", "Berat semua bandul yang terpasang dijumlahkan."],
    ["Berat didapat", "Jumlah berat bandul adalah berat benda."],
  ),
  kt(
    "Kilogram, ons, dan gram",
    ["Satu kilogram berapa gram?", "Satu kilogram sama dengan berapa ons dan berapa gram?"],
    ["Sepuluh ons, seribu gram", "Satu kilogram sama dengan sepuluh ons dan seribu gram, sedangkan satu ons sama dengan seratus gram."],
    ["Hubungan satuan", "Kilogram, ons, dan gram saling berhubungan."],
  ),
  kt(
    "Kilogram ke gram",
    ["Kilogram jadi gram?", "Bagaimana mengubah kilogram menjadi gram?"],
    ["Kali seribu", "Kilogram diubah ke gram dengan dikalikan seribu."],
    ["Gram didapat", "Hasilnya adalah berat dalam gram, dan bilangannya makin besar."],
  ),
  kt(
    "Gram ke kilogram",
    ["Gram jadi kilogram?", "Bagaimana mengubah gram menjadi kilogram?"],
    ["Ambil seribu", "Ambil tiap seribu gram sebagai satu kilogram."],
    ["Kilogram dan gram", "Hasilnya kilogram penuh dan sisa gram yang kurang dari seribu."],
  ),
  kt(
    "Jumlah dan kurang berat",
    ["Berat dicampur atau diambil?", "Bagaimana menjumlahkan atau mengurangkan dua berat?"],
    ["Ubah ke gram dulu", "Satuan kedua berat disamakan dulu, misalnya diubah ke gram, lalu dijumlahkan atau dikurangkan."],
    ["Berat gabungan atau sisa", "Hasilnya boleh dipecah lagi menjadi kilogram dan gram."],
  ),
  kt(
    "Cara pintar: Tabel Tempat Angka",
    ["Ingin angka yang rapi?", "Bagaimana menulis berat dengan angka yang rapi?"],
    ["Tabel Tempat Angka", "Kolom kilogram mewakili ribuan gram, lalu ada kolom ratusan, puluhan, dan satuan gram."],
    ["Dibaca dari kiri", "Berat dibaca dari kolom paling kiri sampai kolom satuan gram."],
  ),
  kt(
    "Cara pintar: Garis Bilangan Ganda",
    ["Ingin melihat pasangan?", "Bagaimana melihat pasangan kilogram dan gram sekaligus?"],
    ["Garis Bilangan Ganda", "Garis atas untuk kilogram dan garis bawah untuk gram, dan titik yang sejajar sama beratnya."],
    ["Pasangan sejajar", "Pasangan ukuran dibaca dari titik yang sejajar di kedua garis."],
  ),
  kt(
    "Cara pintar: Pecah Seribu-Seribu",
    ["Gram sangat banyak?", "Bagaimana memecah gram yang banyak menjadi kilogram?"],
    ["Pecah Seribu-Seribu", "Gram dipecah menjadi potongan seribu-seribu dan sisanya."],
    ["Potongan jadi kilogram", "Tiap potongan seribu gram menjadi satu kilogram, dan sisanya tetap gram."],
  ),
];

export const TEMA_KARTU_BANDUL: TemaPeta = { bingkai: "#0E7490", ikon: "\u{1F43E}", judul: "Peta ruang periksa", latar: "#ECFEFF", garisLatar: "#06B6D4" };
/** Peta radial awal (tanpa kata): timbangan di tengah, satu gambar per kartu. */
export const RINGKASAN_BANDUL: RingkasanPeta = {
  pusat: "\u{2696}\u{FE0F}",
  ikon: ["\u{1F3CB}", "\u{1F9EE}", "\u{1F51F}", "\u{2716}\u{FE0F}", "\u{2797}", "\u{2795}", "\u{1F4CA}", "\u{1F4CF}", "\u{1F9E9}"],
  suara: "Ini peta berat dan satuannya. Timbangan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_BANDUL =
  "Ini peta ruang periksa. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_BANDUL = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan kenyang (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_BANDUL = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_BANDUL: readonly BarisInfo[] = [
  bi("\u{1F3CB}", "Bandul timbangan", "Pasang bandul", "Berat dijumlah", "Timbangan seimbang", [0, 1, 2]),
  bi("\u{1F51F}", "Kilogram, ons, gram", "Bandingkan satuan", "Sepuluh ons, seribu gram", "Satu ons seratus gram", []),
  bi("\u{2716}\u{FE0F}", "Kilogram ke gram", "Kali seribu", "Gram didapat", "Satuan kecil, angka besar", []),
  bi("\u{2797}", "Gram ke kilogram", "Ambil seribu", "Kilogram dan gram", "Pecah seribu-seribu", []),
  bi("\u{2795}", "Jumlah dan kurang berat", "Ubah ke gram dulu", "Berat gabungan", "Satuan harus sama", []),
];
export const TEMA_INFO_BANDUL: TemaInfo = { bingkai: "#0E7490", latar: "#ECFEFF", aksen: "#0891B2", teduh: "#CFFAFE", ikon: "\u{1F4CB}", judul: "Papan kenyang" };
export const SUARA_INFO_BANDUL = "Ini papan kenyang. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_BANDUL = "Papan kenyang lengkap! Kali seribu ke gram, ambil seribu ke kilogram, dan satuan disamakan dulu.";
