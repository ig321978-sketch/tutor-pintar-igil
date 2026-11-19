/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab H (Pembagian sampai Seratus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Bagi Rata, Kurang Berulang, Bagi Susun).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris.
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

export const KARTU_JATAH: readonly KartuPeta[] = [
  kt("Membagi", ["Bagaimana membagi rata?", "Bagaimana menaruh benda sama banyak ke tiap tempat?"], ["Bagi sama banyak", "Benda ditaruh sama banyak ke tiap tempat sampai habis."], ["Itu pembagian", "Membagi sebuah bilangan sama banyak disebut pembagian."], ["masalah"]),
  kt("Pembagi", ["Ada berapa tempatnya?", "Berapa banyak tempat yang menerima bagian?"], ["Hitung tempatnya", "Banyaknya tempat yang menerima bagian dihitung lebih dulu."], ["Itu pembagi", "Banyaknya tempat itu dinamakan pembagi."]),
  kt("Hasil bagi", ["Tiap tempat dapat berapa?", "Berapa benda yang diterima tiap tempat?"], ["Bagikan bergiliran", "Bagikan satu per satu ke tiap tempat, lalu hitung satu tempat."], ["Itu hasil bagi", "Banyak benda di satu tempat adalah hasil bagi."]),
  kt("Sisa", ["Kalau ada yang lebih?", "Bagaimana kalau benda tidak habis terbagi?"], ["Hitung yang lebih", "Benda yang tidak cukup untuk satu putaran dihitung terpisah."], ["Sisa lebih kecil", "Sisa pembagian selalu lebih kecil daripada pembagi."]),
  kt("Memeriksa", ["Yakin hasilnya benar?", "Bagaimana memastikan hasil bagi tidak keliru?"], ["Dikalikan lagi", "Kalikan hasil bagi dengan pembagi, lalu tambahkan sisa."], ["Sama dengan awal", "Hasilnya harus sama dengan bilangan yang dibagi."]),
  kt("Pembagian bersusun", ["Bilangannya dua angka?", "Bagaimana membagi bilangan dua angka dengan rapi?"], ["Mulai dari puluhan", "Bagi angka puluhan dahulu, lalu turunkan angka satuan."], ["Hasil di atas", "Hasil bagi ditulis di atas dan sisa akhir di bawah."]),
  kt("Cara pintar: Bagi Rata", ["Ingin melihat bendanya?", "Bagaimana membagi sambil melihat bendanya?"], ["Bagi Rata", "Bagikan benda satu per satu ke tiap wadah, bergiliran, sampai habis."], ["Cocok benda nyata", "Cocok untuk benda yang bisa dilihat dan dipegang."]),
  kt("Cara pintar: Kurang Berulang", ["Ingin tahu maknanya?", "Bagaimana memahami arti pembagian?"], ["Kurang Berulang", "Kurangi bilangan awal dengan pembagi berkali-kali."], ["Banyak kurang", "Banyaknya pengurangan adalah hasil bagi."]),
  kt("Cara pintar: Bagi Susun", ["Ingin cara cepat?", "Bagaimana membagi bilangan dua angka dengan cepat?"], ["Bagi Susun", "Bagi dari puluhan ke satuan, bagian demi bagian."], ["Cepat dan rapi", "Hasilnya tertulis rapi, dan sisa akhir tampak di bawah."]),
];

export const TEMA_KARTU_JATAH: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F9EE}", judul: "Papan Jatah", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): satu gambar per kartu. */
export const RINGKASAN_JATAH: RingkasanPeta = {
  pusat: "\u{1F9EE}",
  ikon: ["\u{1F9F3}", "\u{1F4E6}", "\u{1F9FA}", "\u{2797}", "\u{2705}", "\u{1F4DD}", "\u{1F6CF}", "\u{1F501}", "\u{1F522}"],
  suara: "Ini peta pembagian sampai seratus. Gambar hitung ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_JATAH =
  "Ini papan jatah. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_JATAH = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar jatah (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_JATAH = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_JATAH: readonly BarisInfo[] = [
  bi("\u{1F9FA}", "Membagi rata", "Bagikan bergiliran", "Sama banyak", "Tiap tempat adil", [0, 1, 2]),
  bi("\u{1F501}", "Mengurangi berulang", "Kurangi pembagi", "Hitung pengurangan", "Banyaknya hasil bagi", []),
  bi("\u{1F4DD}", "Membagi bersusun", "Bagi lalu turunkan", "Hasil di atas", "Puluhan ke satuan", []),
  bi("\u{2797}", "Mencari sisa", "Bagi sampai kurang", "Sisa dihitung", "Sisa lebih kecil", []),
  bi("\u{2705}", "Memeriksa hasil", "Kalikan hasil bagi", "Tambah sisa", "Sama dengan awal", []),
];
export const TEMA_INFO_JATAH: TemaInfo = { bingkai: "#1E3A8A", latar: "#EFF6FF", aksen: "#1D4ED8", teduh: "#DBEAFE", ikon: "\u{1F4CB}", judul: "Daftar jatah" };
export const SUARA_INFO_JATAH = "Ini daftar jatah. Ada lima baris, satu baris satu pekerjaan membagi. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_JATAH = "Daftar jatah lengkap! Bagi rata, kurangi berulang, dan bagi bersusun.";
