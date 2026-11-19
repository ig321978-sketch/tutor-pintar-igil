/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab A (Berat) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia.
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
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

export const KARTU_TIMBANG: readonly KartuPeta[] = [
  kt("Mengetahui berat", ["Berapa beratnya?", "Kita ingin tahu seberapa berat sebuah benda."], ["Ditimbang", "Benda ditaruh di timbangan."], ["Berat didapat", "Sekarang kita tahu beratnya."], ["masalah"]),
  kt("Membandingkan dua benda", ["Mana yang lebih berat?", "Ada dua benda. Mana yang lebih berat?"], ["Jungkat-jungkit", "Taruh satu benda di tiap ujung papan."], ["Yang turun lebih berat", "Ujung papan yang turun memuat benda yang lebih berat."], ["cara"]),
  kt("Besar atau berat?", ["Apakah besar sama dengan berat?", "Apakah benda yang besar pasti berat?"], ["Timbang", "Jangan menilai dari besarnya saja. Timbang dulu."], ["Besar belum tentu berat", "Balon besar itu ringan, dan batu kecil terasa berat."]),
  kt("Tiga benda atau lebih", ["Mana paling berat dan paling ringan?", "Dari banyak benda, mana yang paling berat dan paling ringan?"], ["Bandingkan satu per satu", "Bandingkan dua benda, lalu dua benda lain, sampai semuanya."], ["Paling berat, paling ringan", "Benda paling berat dan benda paling ringan sudah ketemu."]),
  kt("Mengukur dengan satuan", ["Berapa satuannya?", "Berapa satuan tidak baku yang sama beratnya dengan benda ini?"], ["Isi satuan sampai seimbang", "Taruh satuan satu per satu sampai timbangan seimbang."], ["Banyak satuan adalah hasil ukur", "Banyaknya satuan itulah hasil pengukuran."]),
  kt("Satuan yang berbeda", ["Satuan beda, hasil sama?", "Kalau satuannya berbeda, apakah hasil ukurnya sama?"], ["Coba satuan lain", "Ukur benda yang sama dengan satuan yang lain."], ["Satuan ringan, hitungan banyak", "Satuan yang lebih ringan memerlukan jumlah yang lebih banyak."]),
  kt("Cara pintar: Model Batang", ["Banyak benda sekaligus?", "Bagaimana membandingkan banyak benda dalam satu gambar?"], ["Model Batang", "Satu batang untuk satu benda. Makin berat, makin tinggi."], ["Batang tertinggi paling berat", "Batang yang paling tinggi adalah benda yang paling berat."]),
  kt("Cara pintar: Neraca Titik", ["Berapa selisih beratnya?", "Berapa lebih beratnya benda yang satu dari yang lain?"], ["Neraca Titik", "Beri titik di tiap piringan sesuai beratnya."], ["Hitung titik, ketemu selisih", "Selisih titik adalah selisih beratnya."]),
  kt("Cara pintar: Berat di Dasar", ["Bagaimana menata benda?", "Bagaimana menata banyak benda supaya kokoh?"], ["Berat di Dasar", "Urutkan dari yang paling berat sebelum menata."], ["Paling berat paling bawah", "Benda paling berat di bawah, benda ringan di atas."]),
];

export const TEMA_KARTU_TIMBANG: TemaPeta = { bingkai: "#475569", ikon: "\u{1F6D2}", judul: "Troli peralatan", latar: "#E2E8F0", garisLatar: "#64748B" };
/** Peta radial awal (tanpa kata): timbangan di tengah, satu gambar per kartu. */
export const RINGKASAN_TIMBANG: RingkasanPeta = {
  pusat: "⚖️",
  ikon: ["❓", "\u{1F19A}", "\u{1F388}", "\u{1F947}", "\u{1F3BE}", "\u{1F501}", "\u{1F4CA}", "\u{1F535}", "\u{1F9FA}"],
  suara: "Ini peta berat. Timbangan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TIMBANG =
  "Ini troli peralatan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TIMBANG = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan lapangan (lima kartu kejadian + poster) ------------------------------ */
export const KOLOM_INFO_TIMBANG = ["Cara menimbang", "Yang terjadi", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TIMBANG: readonly BarisInfo[] = [
  bi("\u{1F6A7}", "Kerucut dan kantong", "Dua tangan", "Terasa berat", "Lebih berat", [0, 1, 2]),
  bi("\u{1F45C}", "Dua kantong", "Gantungan baju", "Satu turun", "Yang turun lebih berat", [0]),
  bi("⚽", "Dua bola", "Jungkat-jungkit", "Papan datar", "Sama berat", [1]),
  bi("\u{1F42F}", "Boneka harimau", "Bola tenis", "Seimbang", "Empat bola tenis", [2]),
  bi("\u{1F96D}", "Rantai buah", "Berpasangan", "Pepaya sama dua mangga", "Empat manggis", []),
];
export const TEMA_INFO_TIMBANG: TemaInfo = { bingkai: "#16A34A", latar: "#ECFDF5", aksen: "#16A34A", teduh: "#DCFCE7", ikon: "\u{1F4E3}", judul: "Papan lapangan" };
export const SUARA_INFO_TIMBANG = "Ini papan lapangan. Ada lima kartu, satu kartu satu kejadian dari cerita. Isi cara menimbang, yang terjadi, dan katanya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TIMBANG = "Papan lapangan lengkap! Yang turun lebih berat, papan datar berarti sama berat, dan satuan dihitung banyaknya.";
