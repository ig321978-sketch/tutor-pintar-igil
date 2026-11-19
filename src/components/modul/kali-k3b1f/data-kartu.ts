/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab F (Perkalian sampai 100) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Isi Sama, Susunan Baris Kolom, Lompat Hitung).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris dari data Story (telur, botol, pensil).
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

export const KARTU_KALI: readonly KartuPeta[] = [
  kt("Kotak isi sama", ["Berapa semuanya?", "Kita ingin tahu banyak semua barang dalam beberapa kotak yang isinya sama."], ["Tambah berulang", "Jumlahkan isi satu kotak berulang sebanyak kotaknya."], ["Jumlah semua didapat", "Hasil penjumlahan berulang adalah banyak semua barang."], ["masalah"]),
  kt("Menulis perkalian", ["Tambahannya terlalu panjang?", "Penjumlahan berulang yang panjang itu melelahkan untuk ditulis."], ["Ditulis perkalian", "Penjumlahan berulang dengan isi yang sama ditulis sebagai perkalian."], ["Kotak kali isi", "Banyak kotak dikali isi tiap kotak sama dengan banyak semua barang."]),
  kt("Bagian perkalian", ["Apa arti tiap bilangan?", "Kita ingin tahu arti dua bilangan pada perkalian."], ["Kotak dan isi", "Bilangan pertama menyatakan banyak kotak dan bilangan kedua menyatakan isi tiap kotak."], ["Dibaca dengan benar", "Perkalian dibaca dengan menyebut banyak kotak, kali, lalu isi tiap kotak."]),
  kt("Cara pintar: Isi Sama", ["Barang sudah dikemas rapi?", "Barang dikemas dalam beberapa kotak yang isinya sama banyak."], ["Isi Sama", "Isi satu kotak dijumlah berulang sebanyak kotaknya, itulah perkalian."], ["Cepat dan tepat", "Banyak semua barang terhitung cepat dan tepat."]),
  kt("Cara pintar: Susunan Baris Kolom", ["Barang bisa dijajarkan?", "Barang bisa ditata rapi dalam baris dan kolom."], ["Susunan Baris Kolom", "Barang ditata dalam baris dan kolom, tiap baris sama panjang."], ["Baris kali kolom", "Banyak baris dikali banyak kolom sama dengan banyak semua barang."]),
  kt("Menukar urutan", ["Susunan diputar?", "Susunan baris dan kolom bisa diputar seperempat putaran."], ["Tukar urutan bilangan", "Baris menjadi kolom dan kolom menjadi baris, jadi dua bilangan bertukar tempat."], ["Hasil tetap sama", "Urutan bilangan pada perkalian boleh ditukar dan hasilnya tidak berubah."]),
  kt("Cara pintar: Lompat Hitung", ["Ingin cepat menghafal?", "Kita ingin menghitung perkalian dengan cepat dan mudah diingat."], ["Lompat Hitung", "Melompat dengan besar sama dari nol, banyak lompatan sama dengan banyak kotak."], ["Bilangan terakhir hasilnya", "Titik pendaratan terakhir adalah hasil perkalian."]),
  kt("Cerita perkalian", ["Ada cerita tentang kotak?", "Cerita perkalian menyebut banyak kotak dan isi tiap kotak."], ["Cari kotak dan isi", "Cari banyak kotak, cari isi tiap kotak, lalu tulis perkaliannya."], ["Jawab dengan satuan", "Tulis hasilnya beserta nama bendanya."]),
  kt("Memeriksa hasil", ["Yakin hasilnya benar?", "Kita ingin memastikan hasil perkalian sudah tepat."], ["Periksa berulang", "Periksa dengan penjumlahan berulang atau dengan lompatan pada garis bilangan."], ["Hasil meyakinkan", "Hasil yang sama pada dua cara berarti hasilnya yakin benar."]),
];

export const TEMA_KARTU_KALI: TemaPeta = { bingkai: "#A97B3F", ikon: "\u{1F95A}", judul: "Rak telur perkalian", latar: "#FDE9C8", garisLatar: "#A97B3F" };
/** Peta radial awal (tanpa kata): telur di tengah, satu gambar per kartu. */
export const RINGKASAN_KALI: RingkasanPeta = {
  pusat: "\u{1F95A}",
  ikon: ["\u{1F4E6}", "\u{2716}", "\u{1F9E9}", "\u{1F9FA}", "\u{1F4D0}", "\u{1F504}", "\u{1F438}", "\u{1F4D6}", "\u{2705}"],
  suara: "Ini peta rak telur perkalian. Telur ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KALI =
  "Ini rak telur perkalian. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KALI = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: rak botol dan telur (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_KALI = ["Banyaknya", "Isinya", "Semuanya"] as const;
const bi = (ikon: string, nama: string, a: [string, string], b: [string, string], c: [string, string], contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [
    { t: a[0], s: a[1] },
    { t: b[0], s: b[1] },
    { t: c[0], s: c[1] },
  ],
  contoh,
});
export const BARIS_INFO_KALI: readonly BarisInfo[] = [
  bi("\u{1F95A}", "Kotak telur", ["4 kotak", "empat kotak"], ["5 telur", "lima telur"], ["20 telur", "dua puluh telur"], [0, 1, 2]),
  bi("\u{1F9FD}", "Telur dijumlah", ["3 kotak", "tiga kotak"], ["6 telur", "enam telur"], ["18 telur", "delapan belas telur"], []),
  bi("\u{1F37C}", "Botol di rak", ["3 baris", "tiga baris"], ["7 botol", "tujuh botol"], ["21 botol", "dua puluh satu botol"], []),
  bi("\u{1F504}", "Rak diputar", ["7 baris", "tujuh baris"], ["3 botol", "tiga botol"], ["21 botol", "dua puluh satu botol"], []),
  bi("\u{270F}", "Kotak pensil", ["6 kotak", "enam kotak"], ["10 pensil", "sepuluh pensil"], ["60 pensil", "enam puluh pensil"], []),
];
export const TEMA_INFO_KALI: TemaInfo = { bingkai: "#7C2D12", latar: "#FFF7ED", aksen: "#9A3412", teduh: "#FFEDD5", ikon: "\u{1F37C}", judul: "Rak botol dan telur" };
export const SUARA_INFO_KALI = "Ini rak botol dan telur. Ada lima baris, satu baris satu kejadian dari cerita. Isi banyaknya, isinya, dan semuanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KALI = "Rak lengkap! Banyak kotak kali isi tiap kotak sama dengan semuanya, dan urutan bilangan boleh ditukar.";
