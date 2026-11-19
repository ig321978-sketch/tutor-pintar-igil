/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan sampai Sepuluh Ribu) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Kartu Angka, Baca Per Bagian, Periksa Nol).
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

export const KARTU_TIKET: readonly KartuPeta[] = [
  kt("Empat tempat", ["Nomornya panjang?", "Bagaimana membaca nomor yang panjang?"], ["Pakai empat tempat", "Bilangan empat angka punya empat tempat: ribuan, ratusan, puluhan, dan satuan."], ["Tempat dikenal", "Tiap angka punya tempatnya sendiri."], ["masalah"]),
  kt("Membaca dari kiri", ["Mulai dari mana?", "Dari mana bilangan mulai dibaca?"], ["Dari ribuan", "Bilangan dibaca dari kiri, dimulai dari ribuan."], ["Terbaca urut", "Ribuan, ratusan, puluhan, lalu satuan terbaca berurutan."]),
  kt("Nama tempat", ["Apa namanya?", "Bagaimana menyebut tiap bagian bilangan?"], ["Sebut ribu dan ratus", "Sebut nama tempatnya pada bagian yang berisi angka."], ["Bilangan terbaca", "Bilangan terbaca lengkap dengan nama tempatnya."]),
  kt("Angka nol", ["Nolnya dibaca?", "Apakah angka nol ikut dibaca?"], ["Nol dilewati", "Angka nol tidak disebut, tetapi tempatnya tetap dihitung."], ["Tempat terjaga", "Nol menjaga tempat supaya angka lain tidak bergeser."]),
  kt("Menulis dari ucapan", ["Menulis dari ucapan?", "Bagaimana menulis bilangan yang diucapkan?"], ["Taruh di tempatnya", "Taruh tiap angka di tempatnya, mulai dari ribuan."], ["Tulisan benar", "Tempat yang kosong diisi nol sehingga tulisan benar."]),
  kt("Membaca ulang", ["Sudah benar?", "Bagaimana memastikan tulisan sudah benar?"], ["Dibaca lagi", "Bacalah tulisan sekali lagi dari ribuan."], ["Cocok dengan ucapan", "Bacaan sama dengan ucapan yang didengar."]),
  kt("Cara pintar: Kartu Angka", ["Angka tertukar?", "Bagaimana menjaga angka tidak tertukar?"], ["Kartu Angka", "Taruh tiap angka pada satu kartu, lalu susun dari ribuan sampai satuan."], ["Tempat terlihat", "Urutan kartu menunjukkan tempat tiap angka."]),
  kt("Cara pintar: Baca Per Bagian", ["Terlalu panjang?", "Bagaimana membaca bilangan panjang dengan lancar?"], ["Baca Per Bagian", "Bagi bilangan menjadi bagian, lalu baca dari kiri."], ["Lancar terbaca", "Bagian bernol dilewati dan bilangan terbaca lancar."]),
  kt("Cara pintar: Periksa Nol", ["Ada yang hilang?", "Bagaimana memastikan tidak ada angka yang hilang?"], ["Periksa Nol", "Hitung banyak angka, lalu isi tempat yang kosong dengan nol."], ["Angka lengkap", "Tidak ada angka yang hilang."]),
];

export const TEMA_KARTU_TIKET: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F3AB}", judul: "Loket tiket", latar: "#FFF7ED", garisLatar: "#C2410C" };
/** Peta radial awal (tanpa kata): tiket di tengah, satu gambar per kartu. */
export const RINGKASAN_TIKET: RingkasanPeta = {
  pusat: "\u{1F3AB}",
  ikon: ["\u{1F522}", "\u{27A1}", "\u{1F4E2}", "\u{2B55}", "\u{270F}", "\u{1F501}", "\u{1F0CF}", "\u{1F5E3}", "\u{1F50D}"],
  suara: "Ini peta membaca dan menulis bilangan. Gambar tiket ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TIKET =
  "Ini kartu loket tiket. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TIKET = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar tiket (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TIKET = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TIKET: readonly BarisInfo[] = [
  bi("\u{1F5E3}", "Membaca bilangan", "Baca dari kiri", "Ribuan lebih dulu", "Terbaca lengkap", [0, 1, 2]),
  bi("\u{270F}", "Menulis bilangan", "Taruh di tempatnya", "Tulisan terbentuk", "Angka berurutan", []),
  bi("\u{2B55}", "Menjaga nol", "Isi tempat kosong", "Nol menjaga tempat", "Angka tidak bergeser", []),
  bi("\u{1F50D}", "Memeriksa tulisan", "Hitung banyak angka", "Jumlah angka cocok", "Angka hilang ketahuan", []),
  bi("\u{1F501}", "Membaca ulang", "Bacalah lagi", "Sama dengan ucapan", "Siap diumumkan", []),
];
export const TEMA_INFO_TIKET: TemaInfo = { bingkai: "#9A3412", latar: "#FFF7ED", aksen: "#C2410C", teduh: "#FFEDD5", ikon: "\u{1F4CB}", judul: "Daftar tiket" };
export const SUARA_INFO_TIKET = "Ini daftar tiket. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TIKET = "Daftar tiket lengkap! Baca, tulis, dan periksa nol.";
