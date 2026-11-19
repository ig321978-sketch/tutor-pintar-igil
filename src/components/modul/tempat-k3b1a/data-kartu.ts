/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab A (Bilangan Tiga Angka) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Balok Dienes, Tabel Tiga Tempat, Nama Bilangan).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris dari kejadian Story.
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

export const KARTU_TEMPAT: readonly KartuPeta[] = [
  kt("Satuan, puluhan, ratusan", ["Bagaimana menyebut ukuran?", "Bagaimana kita menyebut ukuran satu, sepuluh, dan seratus?"], ["Satuan, puluhan, ratusan", "Satu disebut satuan, sepuluh disebut puluhan, dan seratus disebut ratusan."], ["Tiga ukuran dikenal", "Satuan, puluhan, dan ratusan sudah dikenal."], ["masalah"]),
  kt("Tukar sepuluh", ["Sepuluh sudah banyak?", "Sepuluh benda yang lepas sudah banyak dan merepotkan."], ["Tukar sepuluh jadi satu", "Sepuluh yang lepas ditukar menjadi satu kemasan yang lebih besar."], ["Tempatnya naik", "Sepuluh satuan menjadi satu puluhan, dan sepuluh puluhan menjadi satu ratusan."]),
  kt("Papan tiga tempat", ["Di mana tiap angka?", "Di mana angka ratusan, puluhan, dan satuan ditulis?"], ["Papan tiga tempat", "Papan punya tiga tempat: ratusan hijau, puluhan biru, dan satuan merah."], ["Tiap angka punya tempat", "Angka di tiap tempat menunjukkan banyaknya."]),
  kt("Membaca dari kiri", ["Dibaca dari mana?", "Dari mana bilangan tiga angka mulai dibaca?"], ["Baca dari kiri", "Baca ratusan dulu, lalu puluhan, lalu satuan."], ["Bilangan terbaca", "Bilangan terbaca urut dan tidak tertukar."]),
  kt("Angka nol", ["Nol dibaca apa?", "Bagaimana membaca tempat yang berisi nol?"], ["Nol tidak diucapkan", "Angka nol tidak diucapkan, tetapi tempatnya tetap dijaga."], ["Bacaan tepat", "Bilangan yang memuat nol terbaca tepat, tanpa kata nol."]),
  kt("Menulis dari kata", ["Bagaimana menulis angkanya?", "Bagaimana menulis angka dari kata bilangan?"], ["Tulis angka tiap tempat", "Cari angka tiap tempat, lalu isi tempat yang kosong dengan nol."], ["Nol penjaga tempat", "Nol menjaga tempat supaya bilangan tidak berubah jauh."]),
  kt("Cara pintar: Balok Dienes", ["Ingin melihat bendanya?", "Bagaimana melihat bilangan sebagai benda?"], ["Balok Dienes", "Kubus, batang, dan lempeng menunjukkan satuan, puluhan, dan ratusan."], ["Bisa dihitung dan ditukar", "Bilangan bisa dihitung dan ditukar sepuluh jadi satu."]),
  kt("Cara pintar: Tabel Tiga Tempat", ["Ingin menulis rapi?", "Bagaimana membaca dan menulis bilangan dengan rapi?"], ["Tabel Tiga Tempat", "Tiga kolom ratusan, puluhan, dan satuan diisi satu angka tiap kolom."], ["Rapi dan tidak tertukar", "Bilangan terbaca dan tertulis rapi."]),
  kt("Cara pintar: Nama Bilangan", ["Ingin menulis dari kata?", "Bagaimana membaca atau menulis bilangan lewat kata?"], ["Nama Bilangan", "Bilangan diucapkan menurut urutan ratusan, puluhan, lalu satuan."], ["Kata menjadi angka", "Dengan nama yang benar, bilangan bisa ditulis dari kata."]),
];

export const TEMA_KARTU_TEMPAT: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F522}", judul: "Rak bilangan", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): angka di tengah, satu gambar per kartu. */
export const RINGKASAN_TEMPAT: RingkasanPeta = {
  pusat: "\u{1F522}",
  ikon: ["\u{1F9CA}", "\u{1F501}", "\u{1F5C2}", "\u{1F5E3}", "\u{2B55}", "\u{270D}", "\u{1F9F1}", "\u{1F4CB}", "\u{1F3F7}"],
  suara: "Ini peta bilangan tiga angka. Gambar angka ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TEMPAT =
  "Ini rak bilangan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TEMPAT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan stok (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TEMPAT = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TEMPAT: readonly BarisInfo[] = [
  bi("\u{1F4E6}", "Tiga ukuran kemasan", "Satu, sepuluh, seratus", "Satuan, puluhan, ratusan", "Tiga ukuran", [0, 1, 2]),
  bi("\u{1F501}", "Sepuluh yang lepas", "Ditukar jadi satu", "Tempatnya naik", "Sepuluh jadi satu", []),
  bi("\u{1F5C2}", "Papan stok", "Tiga tempat berwarna", "Angka di tiap tempat", "Hijau, biru, merah", []),
  bi("\u{2B55}", "Angka nol", "Tidak diucapkan", "Tempat tetap dijaga", "Nol penjaga tempat", []),
  bi("\u{270D}", "Menulis dari kata", "Angka tiap tempat", "Tempat kosong diisi nol", "Dengar, lalu tulis", []),
];
export const TEMA_INFO_TEMPAT: TemaInfo = { bingkai: "#166534", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F5C2}", judul: "Papan stok" };
export const SUARA_INFO_TEMPAT = "Ini papan stok. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TEMPAT = "Papan stok lengkap! Sepuluh jadi satu, baca dari kiri, dan nol menjaga tempat.";
