/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab B (Tempat Angka) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Tempat Angka, Kartu Angka Montessori, Bentuk Uraian).
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

export const KARTU_KARTU: readonly KartuPeta[] = [
  kt("Tempat angka", ["Angka punya tempat?", "Setiap angka pada bilangan tiga angka punya tempat: ratusan, puluhan, atau satuan."], ["Baca dari kiri", "Baca bilangan dari kiri: ratusan lebih dulu, lalu puluhan, lalu satuan."], ["Tiga tempat dikenal", "Bilangan tiga angka punya tiga tempat: ratusan, puluhan, dan satuan."], ["masalah"]),
  kt("Jumlah tiap angka", ["Angka mewakili berapa?", "Kita ingin tahu jumlah yang diwakili sebuah angka."], ["Lihat tempatnya", "Jumlah yang diwakili bergantung pada tempat angka itu."], ["Ratusan, puluhan, satuan", "Angka di ratusan mewakili ratusan, di puluhan mewakili puluhan, dan di satuan mewakili satuan."]),
  kt("Angka sama, tempat beda", ["Angka sama, jumlah sama?", "Angka yang sama bisa muncul di tempat yang berbeda."], ["Cek tempatnya", "Periksa dulu di tempat mana angka itu berada."], ["Jumlahnya berbeda", "Angka yang sama di tempat berbeda mewakili jumlah berbeda."]),
  kt("Cara pintar: Tempat Angka", ["Cara melihat isi bilangan?", "Kita ingin cara cepat untuk melihat isi sebuah bilangan."], ["Tempat Angka", "Setiap angka punya tempat, dan tempat itu menentukan seberapa besar angka tersebut."], ["Jumlah satu angka", "Cocok untuk menjawab berapa jumlah yang diwakili satu angka tertentu."]),
  kt("Menyusun bilangan", ["Bilangan dari bagian?", "Kita ingin menyusun bilangan dari beberapa bagian."], ["Kartu seratus, sepuluh, satu", "Tiap tempat diisi kartu yang sesuai, lalu semuanya disatukan."], ["Bilangan tersusun", "Kartu di tiap tempat bersama-sama menjadi satu bilangan."]),
  kt("Cara pintar: Kartu Angka Montessori", ["Menyusun dengan tangan?", "Kita ingin menyusun dan memisahkan bilangan dengan tangan."], ["Kartu Angka Montessori", "Kartu seratus menutup kartu sepuluh, dan kartu sepuluh menutup kartu satu."], ["Tiga bagian terlihat", "Dengan menumpuk, bilangan terlihat tersusun dari tiga bagian."]),
  kt("Cara pintar: Bentuk Uraian", ["Bagaimana memeriksa?", "Kita ingin memeriksa apakah sebuah bilangan sudah disusun benar."], ["Bentuk Uraian", "Tulis bilangan sebagai jumlah ratusan, puluhan, dan satuannya."], ["Dijumlah kembali", "Bila dijumlahkan lagi, hasilnya kembali ke bilangan semula."]),
  kt("Angka nol", ["Tempat kosong?", "Kadang sebuah tempat tidak punya isi sama sekali."], ["Isi dengan nol", "Tempat yang kosong tetap ditulis nol."], ["Tempat tetap terjaga", "Nol menjaga angka lain tetap berada di tempatnya."]),
  kt("Tabel tiga tempat", ["Cara mengisi tabel?", "Kita ingin mengisi tabel ratusan, puluhan, dan satuan dengan benar."], ["Satu angka tiap tempat", "Tabel hanya diisi satu angka di tiap tempat, bukan jumlahnya."], ["Bilangan beda terbaca", "Bilangan yang angkanya sama tetapi tempatnya berbeda adalah bilangan yang berbeda."]),
];

export const TEMA_KARTU_KARTU: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F3F7}\u{FE0F}", judul: "Peta tempat angka", latar: "#FFFBEB", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): tiga tempat di tengah, satu gambar per kartu. */
export const RINGKASAN_KARTU: RingkasanPeta = {
  pusat: "\u{1F522}",
  ikon: ["\u{1F4CD}", "\u{2696}\u{FE0F}", "\u{1F501}", "\u{1F50D}", "\u{1F9E9}", "\u{1F0CF}", "\u{2795}", "\u{2B55}", "\u{1F4CA}"],
  suara: "Ini peta tempat angka. Bilangan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KARTU =
  "Ini peta tempat angka. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KARTU = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan tempat angka (lima baris dari data Story) ------------------------------ */
export const KOLOM_INFO_KARTU = ["Angka", "Mewakili", "Keterangan"] as const;
const bi = (ikon: string, nama: string, isi: BarisInfo["isi"], contoh: number[]): BarisInfo => ({ ikon, nama, isi, contoh });
export const BARIS_INFO_KARTU: readonly BarisInfo[] = [
  bi("\u{1F7E9}", "Ratusan", [{ t: "2", s: "dua" }, { t: "Dua ratus" }, { t: "Kartu hijau" }], [0, 1, 2]),
  bi("\u{1F7E6}", "Puluhan", [{ t: "5", s: "lima" }, { t: "Lima puluh" }, { t: "Kartu biru" }], []),
  bi("\u{1F7E5}", "Satuan", [{ t: "1", s: "satu" }, { t: "Satu" }, { t: "Kartu merah" }], []),
  bi("\u{2B55}", "Nol", [{ t: "0", s: "nol" }, { t: "Tidak ada" }, { t: "Tempat dijaga" }], []),
  bi("\u{1F4CA}", "Tabel", [{ t: "9 8 7", s: "sembilan, delapan, tujuh" }, { t: "Satu tiap tempat" }, { t: "Bukan jumlah" }], []),
];
export const TEMA_INFO_KARTU: TemaInfo = { bingkai: "#B45309", latar: "#FFFBEB", aksen: "#92400E", teduh: "#FEF3C7", ikon: "\u{1F3F7}\u{FE0F}", judul: "Papan Tempat Angka" };
export const SUARA_INFO_KARTU =
  "Ini papan tempat angka. Ada lima baris: ratusan, puluhan, satuan, nol, dan tabel. Isi angkanya, jumlah yang diwakili, dan keterangannya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KARTU = "Papan lengkap! Angka, jumlah yang diwakili, dan keterangan berjalan bersama supaya tempat angka mudah dipahami.";
