/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab B (Gudang Handuk Pak Laode) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Balok Cacah, Bagan Tempat, Tukar Tempat).
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

export const KARTU_HANDUK: readonly KartuPeta[] = [
  kt("Empat tempat angka", ["Bilangan besar, tempatnya apa?", "Apa nama tempat angka pada bilangan empat angka?"], ["Satuan sampai ribuan", "Dari kanan: satuan, puluhan, ratusan, lalu ribuan."], ["Tiap angka punya tempat", "Setiap angka menempati satu tempat."], ["masalah"]),
  kt("Sepuluh kali lebih besar", ["Tempat kiri berapa kali?", "Berapa kali tempat di kiri dibanding tempat di kanannya?"], ["Sepuluh kali kanannya", "Tiap tempat sepuluh kali tempat di kanannya."], ["Satu, sepuluh, seratus", "Satu satuan, sepuluh puluhan, seratus ratusan, dan seribu ribuan."]),
  kt("Banyaknya tiap angka", ["Angka tiga artinya tiga?", "Apakah sebuah angka selalu berarti dirinya sendiri?"], ["Angka dikali tempatnya", "Kalikan angka dengan tempatnya."], ["Banyaknya angka didapat", "Hasil kali itu banyaknya angka pada tempatnya."]),
  kt("Angka nol", ["Kenapa perlu angka nol?", "Mengapa tempat yang kosong tetap ditulis nol?"], ["Nol menjaga tempat", "Nol mengisi tempat yang kosong."], ["Angka lain tidak bergeser", "Angka lain tetap berada di tempatnya."]),
  kt("Tabel tempat angka", ["Bagaimana mencatat per tempat?", "Bagaimana menuliskan angka menurut tempatnya?"], ["Satu kolom satu tempat", "Tulis satu angka pada tiap kolom."], ["Angka tersusun rapi", "Angka tersusun rapi menurut tempatnya."]),
  kt("Angka sama, tempat beda", ["Angka sama, artinya sama?", "Apakah angka yang sama selalu berarti sama?"], ["Lihat tempatnya", "Periksa dulu tempat angkanya."], ["Tempat menentukan arti", "Arti angka bergantung pada tempatnya."]),
  kt("Cara pintar: Balok Cacah", ["Mau melihat banyaknya?", "Bagaimana melihat banyaknya sebuah angka?"], ["Balok Cacah", "Susun balok sebanyak angka pada tiap tempat."], ["Banyaknya terlihat jelas", "Banyaknya tiap angka dapat dilihat dan dipegang."]),
  kt("Cara pintar: Bagan Tempat", ["Mau mencatat dengan rapi?", "Bagaimana mencatat angka tiap tempat dengan rapi?"], ["Bagan Tempat", "Gambar bagan dengan kolom ribuan, ratusan, puluhan, dan satuan."], ["Angka di kolomnya", "Setiap angka berada di kolom tempatnya."]),
  kt("Cara pintar: Tukar Tempat", ["Mau buktikan tempat penting?", "Bagaimana membuktikan bahwa tempat angka penting?"], ["Tukar Tempat", "Tukar dua angka, lalu bandingkan bilangan barunya."], ["Bilangan jadi lain", "Bilangan menjadi lain walau angkanya sama."]),
];

export const TEMA_KARTU_HANDUK: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F9FA}", judul: "Tempat angka", latar: "#FFFBEB", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): keranjang di tengah, satu gambar per kartu. */
export const RINGKASAN_HANDUK: RingkasanPeta = {
  pusat: "\u{1F9FA}",
  ikon: ["\u{1F522}", "\u{2716}", "\u{1F4E6}", "\u{2B55}", "\u{1F4CB}", "\u{1F500}", "\u{1F9F1}", "\u{1F4D0}", "\u{1F501}"],
  suara: "Ini peta tempat angka. Gambar keranjang ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_HANDUK =
  "Ini tempat angka. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_HANDUK = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: tabel tempat angka (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_HANDUK = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_HANDUK: readonly BarisInfo[] = [
  bi("\u{1F522}", "Membaca tempat", "Hitung dari kanan", "Satuan sampai ribuan", "Tiap angka punya tempat", [0, 1, 2]),
  bi("\u{2716}", "Mencari banyaknya", "Angka dikali tempatnya", "Banyaknya angka", "Bukan angkanya saja", []),
  bi("\u{2B55}", "Menjaga tempat kosong", "Isi dengan nol", "Angka lain tidak bergeser", "Nol itu penjaga", []),
  bi("\u{1F4CB}", "Mengisi bagan", "Satu kolom satu angka", "Bilangan tertulis benar", "Bagan Tempat", []),
  bi("\u{1F501}", "Menukar tempat", "Tukar dua angka", "Bilangan menjadi lain", "Tukar Tempat", []),
];
export const TEMA_INFO_HANDUK: TemaInfo = { bingkai: "#92400E", latar: "#FFFBEB", aksen: "#D97706", teduh: "#FDE68A", ikon: "\u{1F4CB}", judul: "Tabel tempat angka" };
export const SUARA_INFO_HANDUK = "Ini tabel tempat angka. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_HANDUK = "Tabel tempat angka lengkap! Balok cacah, bagan tempat, dan tukar tempat.";
