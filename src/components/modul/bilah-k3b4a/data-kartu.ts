/**
 * Mind-map Kelas 3 Bab 4 Sub-Bab A (Ruas Garis dan Sisi Bangun Datar) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Cari yang Beda, Ukur Dua Kali, Beri Nama Huruf).
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

export const KARTU_BILAH: readonly KartuPeta[] = [
  kt("Titik dan ruas garis", ["Garis lurus berujung?", "Apa nama garis lurus yang punya dua titik ujung?"], ["Dua titik ujung", "Dua titik ujung menandai awal dan akhir garis lurus."], ["Ruas garis ada panjangnya", "Ruas garis punya panjang tertentu yang bisa diukur."], ["masalah"]),
  kt("Sinar garis dan garis", ["Ujungnya ada berapa?", "Bagaimana membedakan sinar garis dan garis?"], ["Lihat ujungnya", "Sinar garis berpangkal di satu titik, sedangkan garis tidak punya ujung."], ["Sinar satu arah", "Sinar garis menuju satu arah, garis ke dua arah."]),
  kt("Kurva dan jalan terpendek", ["Banyak jalan antara dua titik?", "Apakah antara dua titik hanya ada satu jalan?"], ["Kurva melengkung", "Jalan yang melengkung atau berkelok disebut kurva."], ["Yang lurus paling pendek", "Ruas garis yang lurus adalah jalan terpendek antara dua titik."]),
  kt("Sentimeter dan milimeter", ["Satu sentimeter berapa milimeter?", "Satu sentimeter sama dengan berapa milimeter?"], ["Dibagi sepuluh bagian", "Satu sentimeter dibagi menjadi sepuluh bagian kecil, yaitu milimeter."], ["Sepuluh milimeter", "Satu sentimeter sama dengan sepuluh milimeter."]),
  kt("Mulai dari nol", ["Mulai dari mana?", "Dari angka berapa ruas garis mulai diukur?"], ["Ujung di angka nol", "Ujung ruas garis diletakkan tepat di angka nol pada penggaris."], ["Bacaan ujung lain benar", "Bila mulai dari angka nol, bacaan di ujung lain adalah panjangnya."]),
  kt("Tulis dengan satuan", ["Cukup angkanya?", "Apakah hasil ukur cukup ditulis dengan angka saja?"], ["Tulis dengan satuan", "Hasil ukur ditulis dengan angka dan satuannya."], ["Angka dan satuan lengkap", "Ukuran yang lengkap memuat angka dan satuan."]),
  kt("Cara pintar: Cari yang Beda", ["Jenisnya yang mana?", "Bagaimana mengenali jenis garis dengan cepat?"], ["Cari yang Beda", "Lihat beberapa gambar, lalu cari satu yang jenisnya tidak sama."], ["Jenis garis dikenali", "Dengan menyebut alasannya, kita hafal ciri tiap jenis garis."]),
  kt("Cara pintar: Ukur Dua Kali", ["Yakin hasilnya benar?", "Bagaimana memastikan hasil ukur tidak salah baca?"], ["Ukur Dua Kali", "Ukur ruas garis, lalu ukur sekali lagi dari ujung yang lain."], ["Salah mulai ketahuan", "Kedua hasil harus sama, bila berbeda periksa apakah ujungnya sudah di nol."]),
  kt("Cara pintar: Beri Nama Huruf", ["Sisi yang mana?", "Bagaimana menyebut dan menghitung sisi bangun datar dengan rapi?"], ["Beri Nama Huruf", "Beri huruf pada tiap titik sudut, lalu sebut sisi dengan dua hurufnya."], ["Sisi dihitung rapi", "Tidak ada sisi yang terhitung dua kali atau terlewat."]),
];

export const TEMA_KARTU_BILAH: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F4CF}", judul: "Rangka layang-layang", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): penggaris di tengah, satu gambar per kartu. */
export const RINGKASAN_BILAH: RingkasanPeta = {
  pusat: "\u{1F4CF}",
  ikon: ["\u{1F4CD}", "\u{1F526}", "\u{1F300}", "\u{1F522}", "\u{1F3AF}", "\u{1F4DD}", "\u{1F50D}", "\u{1F501}", "\u{1F3F7}"],
  suara: "Ini peta ruas garis dan sisi bangun datar. Gambar penggaris ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_BILAH =
  "Ini rangka layang-layang. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_BILAH = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar bilah (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_BILAH = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_BILAH: readonly BarisInfo[] = [
  bi("\u{1F50D}", "Mengenali jenis garis", "Lihat ujungnya", "Sinar, garis, ruas, kurva", "Beda ujung beda nama", [0, 1, 2]),
  bi("\u{1F4CF}", "Mengukur ruas garis", "Ujung di angka nol", "Panjang terbaca", "Mulai dari nol", []),
  bi("\u{1F522}", "Mengubah satuan", "Kali sepuluh", "Milimeter didapat", "Sentimeter jadi milimeter", []),
  bi("\u{1F501}", "Memeriksa ukuran", "Ukur dua kali", "Salah mulai ketahuan", "Hasil harus sama", []),
  bi("\u{1F3F7}", "Menyebut sisi", "Beri nama huruf", "Sisi dihitung rapi", "Ruas garis pembatas", []),
];
export const TEMA_INFO_BILAH: TemaInfo = { bingkai: "#7C2D12", latar: "#FFF7ED", aksen: "#C2410C", teduh: "#FFEDD5", ikon: "\u{1F4CB}", judul: "Daftar bilah" };
export const SUARA_INFO_BILAH = "Ini daftar bilah. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_BILAH = "Daftar bilah lengkap! Kenali jenis garis, ukur dari nol, dan beri nama huruf.";
