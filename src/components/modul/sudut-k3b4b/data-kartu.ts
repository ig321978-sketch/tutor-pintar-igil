/**
 * Mind-map Kelas 3 Bab 4 Sub-Bab B (Sudut pada Bidang Datar) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Lipat Kertas, Sudut Acuan, Langkah Busur).
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

export const KARTU_SUDUT: readonly KartuPeta[] = [
  kt("Apa itu sudut", ["Apa itu sudut?", "Dua kaki yang bertemu di satu titik membentuk sebuah sudut."], ["Dua kaki bertemu", "Dua garis atau dua bilah bertemu di satu titik."], ["Titik sudut dan kaki", "Titik pertemuan disebut titik sudut, dan kedua garis disebut kaki sudut."], ["masalah"]),
  kt("Sudut siku-siku", ["Ada sudut yang pas?", "Adakah sudut yang bisa dipakai sebagai pembanding untuk sudut lain?"], ["Lipat kertas dua kali", "Kertas dilipat dua kali, lalu pojoknya dipakai sebagai pembanding."], ["Pojok siku-siku", "Pojok kertas lipat adalah sudut siku-siku."]),
  kt("Lancip dan tumpul", ["Lebih kecil atau besar?", "Bagaimana membedakan sudut yang lebih kecil dan yang lebih besar daripada pojok kertas?"], ["Banding dengan pojok", "Letakkan pojok kertas pada sudut itu lalu bandingkan."], ["Lancip atau tumpul", "Lebih kecil daripada pojok kertas berarti lancip, lebih besar tetapi belum lurus berarti tumpul."]),
  kt("Lurus dan refleks", ["Sudut yang sangat besar?", "Bagaimana dengan sudut yang lebih besar lagi daripada tumpul?"], ["Banding dengan lurus", "Sudut lurus membentuk satu garis lurus, sama dengan dua pojok kertas."], ["Lurus dan refleks", "Lebih besar daripada sudut lurus disebut sudut refleks."]),
  kt("Satuan baku", ["Ukurannya beda-beda?", "Mengukur sudut dengan irisan besar dan irisan kecil memberi bilangan yang berbeda."], ["Pakai satuan derajat", "Derajat adalah satuan baku untuk besar sudut."], ["Ukuran sama untuk semua", "Dengan derajat, semua orang mendapat ukuran sudut yang sama."]),
  kt("Busur derajat", ["Berapa besarnya?", "Bagaimana mengetahui besar sudut dalam derajat?"], ["Ukur dengan busur", "Busur derajat dipasang pada sudut, lalu skalanya dibaca."], ["Besar dalam derajat", "Hasil ukur sudut ditulis dengan satuan derajat."]),
  kt("Cara pintar: Lipat Kertas", ["Cek siku-siku tanpa alat?", "Bagaimana memeriksa sudut siku-siku tanpa alat ukur?"], ["Lipat Kertas", "Pojok kertas lipat ditempelkan pada sudut yang diperiksa."], ["Pas atau tidak pas", "Kalau kaki sudut pas dengan pojok, sudutnya siku-siku."]),
  kt("Cara pintar: Sudut Acuan", ["Perkiraan jenis sudut?", "Bagaimana memperkirakan jenis sudut sebelum mengukurnya?"], ["Sudut Acuan", "Hafalkan dua acuan, yaitu siku-siku dan lurus, lalu bandingkan."], ["Jenis sudut ketahuan", "Dengan acuan, jenis sudut bisa diperkirakan dan hasil baca busur bisa diperiksa."]),
  kt("Cara pintar: Langkah Busur", ["Takut salah baca?", "Bagaimana agar skala busur tidak salah dibaca?"], ["Langkah Busur", "Titik tengah di titik sudut, garis nol di kaki pertama, lalu baca dari nol."], ["Baca skala dari nol", "Dengan langkah yang berurutan, bacaan skala pasti tepat."]),
];

export const TEMA_KARTU_SUDUT: TemaPeta = { bingkai: "#1D4ED8", ikon: "\u{1F9ED}", judul: "Kotak busur", latar: "#DBEAFE", garisLatar: "#2563EB" };
/** Peta radial awal (tanpa kata): busur di tengah, satu gambar per kartu. */
export const RINGKASAN_SUDUT: RingkasanPeta = {
  pusat: "\u{1F4D0}",
  ikon: ["\u{1F4CD}", "\u{1F4C4}", "\u{1F53A}", "\u{2194}", "\u{1F355}", "\u{1F9ED}", "\u{2702}", "\u{1F3AF}", "\u{1F463}"],
  suara: "Ini peta sudut pada bidang datar. Gambar busur ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_SUDUT =
  "Ini kotak busur. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_SUDUT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: tabel sudut (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_SUDUT = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_SUDUT: readonly BarisInfo[] = [
  bi("\u{1F4C4}", "Memeriksa dengan pojok kertas", "Lipat kertas dua kali", "Siku-siku atau bukan", "Pojok jadi pembanding", [0, 1, 2]),
  bi("\u{1F53A}", "Menamai jenis sudut", "Banding dengan siku-siku", "Lancip atau tumpul", "Kecil atau besar", []),
  bi("\u{1F9ED}", "Mengukur dengan busur", "Titik tengah di titik sudut", "Besar sudut terbaca", "Mulai dari garis nol", []),
  bi("\u{1F50D}", "Membaca skala busur", "Kaki pertama di nol", "Derajat dari nol", "Pilih skala yang tepat", []),
  bi("\u{1F504}", "Mencari sudut pasangan", "Kurangi dari satu putaran", "Dua sudut jadi putaran", "Refleks berpasangan lancip", []),
];
export const TEMA_INFO_SUDUT: TemaInfo = { bingkai: "#1D4ED8", latar: "#EFF6FF", aksen: "#2563EB", teduh: "#DBEAFE", ikon: "\u{1F4D0}", judul: "Tabel sudut" };
export const SUARA_INFO_SUDUT = "Ini tabel sudut. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_SUDUT = "Tabel sudut lengkap! Pojok kertas, busur dari nol, dan derajat yang tepat.";
