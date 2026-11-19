/**
 * Mind-map K4 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Banding dari Kiri, Garis Bilangan, Urut Kartu).
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

export const KARTU_DERMAGA: readonly KartuPeta[] = [
  kt("Membandingkan", ["Mana yang lebih besar?", "Bagaimana mengetahui bilangan mana yang lebih besar dari dua bilangan empat angka?"], ["Dari kiri", "Bandingkan mulai dari tempat paling kiri."], ["Tempat kiri dulu", "Tempat paling kiri dibandingkan lebih dulu, yaitu ribuan."], ["masalah"]),
  kt("Angka yang sama", ["Ribuannya sama?", "Apa yang dilakukan kalau angka ribuan kedua bilangan sama?"], ["Lihat ke kanan", "Pindah ke tempat di kanannya, yaitu ratusan, lalu puluhan, lalu satuan."], ["Sampai beda", "Terus ke kanan sampai ketemu angka yang berbeda."]),
  kt("Angka berbeda", ["Siapa yang menang?", "Angka mana yang menentukan bilangan yang lebih besar?"], ["Angka beda pertama", "Lihat angka berbeda pertama dari kiri."], ["Besar menang", "Bilangan yang angkanya lebih besar di tempat itu adalah bilangan yang lebih besar."]),
  kt("Kurang dari", ["Bagaimana menulisnya?", "Bagaimana menulis bahwa satu bilangan lebih kecil dari bilangan lain?"], ["Tanda kurang dari", "Pakai tanda kurang dari di antara kedua bilangan."], ["Mulut ke besar", "Mulut tanda selalu menghadap bilangan yang lebih besar."]),
  kt("Lebih dari dan sama", ["Kalau lebih besar?", "Bagaimana menulis bilangan yang lebih besar, dan kalau kedua bilangan sama?"], ["Lebih dari, sama dengan", "Tanda lebih dari untuk bilangan yang lebih besar, tanda sama dengan kalau semua tempat sama."], ["Tiga tanda", "Ada tiga tanda: kurang dari, lebih dari, dan sama dengan."]),
  kt("Mengurutkan", ["Banyak bilangan?", "Bagaimana mengurutkan beberapa bilangan sekaligus?"], ["Diurutkan", "Bandingkan bilangan satu per satu dari tempat paling kiri."], ["Naik atau turun", "Dari terkecil ke terbesar disebut naik, dari terbesar ke terkecil disebut turun."]),
  kt("Cara pintar: Banding dari Kiri", ["Cara cepat?", "Bagaimana membandingkan dua bilangan dengan cepat?"], ["Banding dari Kiri", "Mulai dari tempat paling kiri sampai ketemu angka yang berbeda."], ["Cepat dan tepat", "Cocok untuk dua bilangan, tanpa menghitung."]),
  kt("Cara pintar: Garis Bilangan", ["Mau lihat jaraknya?", "Bagaimana melihat urutan dan jarak antar bilangan sekaligus?"], ["Garis Bilangan", "Taruh bilangan pada garis, yang kecil di kiri dan yang besar di kanan."], ["Kanan lebih besar", "Bilangan yang lebih ke kanan selalu lebih besar."]),
  kt("Cara pintar: Urut Kartu", ["Bilangan banyak sekali?", "Bagaimana mengurutkan banyak bilangan sekaligus?"], ["Urut Kartu", "Tulis tiap bilangan pada satu kartu, lalu geser kartunya sampai urut."], ["Urutan rapi", "Kartu yang salah tempat cukup digeser."]),
];

export const TEMA_KARTU_DERMAGA: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F6A4}", judul: "Papan Dermaga", latar: "#E0F2FE", garisLatar: "#0369A1" };
/** Peta radial awal (tanpa kata): perahu di tengah, satu gambar per kartu. */
export const RINGKASAN_DERMAGA: RingkasanPeta = {
  pusat: "\u{1F6A4}",
  ikon: ["\u{1F522}", "\u{27A1}", "\u{1F440}", "\u{1F4DD}", "\u{2696}", "\u{1F501}", "\u{1F448}", "\u{1F4CF}", "\u{1F0CF}"],
  suara: "Ini peta membandingkan dan mengurutkan bilangan. Gambar perahu ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_DERMAGA =
  "Ini papan dermaga. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_DERMAGA = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar dermaga (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_DERMAGA = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_DERMAGA: readonly BarisInfo[] = [
  bi("\u{1F448}", "Membandingkan dari kiri", "Mulai dari kiri", "Angka beda pertama", "Ribuan dulu", [0, 1, 2]),
  bi("\u{27A1}", "Lanjut ke kanan", "Ribuan sama, lanjut", "Ratusan, puluhan, satuan", "Sampai ada yang beda", []),
  bi("\u{2696}", "Memilih tanda", "Tanda di tengah", "Kurang dari atau lebih dari", "Mulut ke yang besar", []),
  bi("\u{1F4CF}", "Memakai garis bilangan", "Taruh pada garis", "Kanan lebih besar", "Kiri lebih kecil", []),
  bi("\u{1F0CF}", "Mengurutkan kartu", "Geser kartu", "Naik atau turun", "Salah tempat digeser", []),
];
export const TEMA_INFO_DERMAGA: TemaInfo = { bingkai: "#075985", latar: "#F0F9FF", aksen: "#0369A1", teduh: "#BAE6FD", ikon: "\u{1F4CB}", judul: "Daftar dermaga" };
export const SUARA_INFO_DERMAGA = "Ini daftar dermaga. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_DERMAGA = "Daftar dermaga lengkap! Bandingkan dari kiri, pakai garis bilangan, dan urutkan kartu.";
