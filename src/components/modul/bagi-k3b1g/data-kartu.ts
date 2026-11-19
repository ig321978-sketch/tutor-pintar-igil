/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab G (Pembagian sampai Seratus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Bagi Rata, Kurang Berulang, Keluarga Fakta).
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

export const KARTU_BAGI: readonly KartuPeta[] = [
  kt("Membagi sama banyak", ["Bagaimana membagi adil?", "Kita ingin membagi barang supaya semua bagian sama banyak."], ["Bagikan sama banyak", "Barang dibagikan sampai tiap bagian mendapat jumlah yang sama."], ["Tiap bagian sama banyak", "Setelah dibagi, semua bagian berisi sama banyak."], ["masalah"]),
  kt("Cara pintar: Bagi Rata", ["Berapa isi tiap bagian?", "Kita ingin tahu berapa isi tiap bagian setelah dibagi."], ["Bagi Rata", "Barang dibagikan satu-satu ke tiap bagian secara bergiliran sampai habis."], ["Isi tiap bagian didapat", "Banyak barang di tiap bagian setelah habis adalah hasil bagi."]),
  kt("Cara pintar: Kurang Berulang", ["Bisa tanpa membagikan?", "Kita ingin membagi tanpa membagikan barangnya satu per satu."], ["Kurang Berulang", "Kurangi bilangan yang dibagi dengan pembagi berulang sampai nol."], ["Banyak kurang jadi hasil bagi", "Banyak pengurangan sampai nol sama dengan hasil bagi."]),
  kt("Menulis pembagian", ["Bagaimana menuliskannya?", "Kita ingin menuliskan pembagian dengan lambang."], ["Tulis dengan titik dua", "Pembagian ditulis dengan tanda titik dua dan tanda sama dengan."], ["Dibaca dibagi, sama dengan", "Tanda titik dua dibaca dibagi, dan hasilnya dibaca sama dengan."]),
  kt("Nama bilangan", ["Apa nama tiap bilangan?", "Kita ingin menyebut tiap bilangan pada kalimat pembagian."], ["Dibagi, pembagi, hasil bagi", "Bilangan pertama dibagi, bilangan kedua pembagi, dan hasilnya hasil bagi."], ["Tiap bilangan punya nama", "Pembagi adalah banyak bagian, hasil bagi adalah isi tiap bagian."]),
  kt("Cara pintar: Keluarga Fakta", ["Ada kaitan dengan kali?", "Kita ingin tahu hubungan pembagian dengan perkalian."], ["Keluarga Fakta", "Tiga bilangan yang sama membentuk dua perkalian dan dua pembagian."], ["Kali membantu mencari bagi", "Perkalian yang sudah dihafal bisa dipakai untuk mencari hasil bagi."]),
  kt("Periksa dengan kali", ["Apakah hasilnya benar?", "Kita ingin memastikan hasil bagi sudah benar."], ["Kalikan hasil bagi dengan pembagi", "Hasil bagi dikali pembagi harus sama dengan bilangan yang dibagi."], ["Sama berarti hasilnya benar", "Bila hasil kali sama dengan bilangan yang dibagi, pembagiannya benar."]),
  kt("Dibagi satu dan bilangan sama", ["Bagaimana dibagi satu?", "Kita ingin tahu hasil pembagian yang khusus."], ["Dibagi satu tetap sama", "Bilangan dibagi satu hasilnya bilangan itu sendiri."], ["Dibagi sama, hasilnya satu", "Bilangan dibagi bilangan yang sama hasilnya satu."]),
  kt("Cerita hitungan", ["Bagaimana dengan cerita?", "Kita ingin menyelesaikan cerita yang memakai pembagian."], ["Tulis kalimat bagi, lalu hitung", "Cari jumlah seluruhnya dan banyak bagian, tulis pembagian, lalu hitung."], ["Jawab dengan satuan", "Tulis jawabannya dengan satuan yang tepat, misalnya buah atau orang."]),
];

export const TEMA_KARTU_BAGI: TemaPeta = { bingkai: "#B45309", ikon: "\u{1F9FA}", judul: "Keranjang bingkisan pembagian", latar: "#FFFBEB", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): bingkisan di tengah, satu gambar per kartu. */
export const RINGKASAN_BAGI: RingkasanPeta = {
  pusat: "\u{1F381}",
  ikon: ["\u{1F37D}", "\u{1F9FA}", "\u{2796}", "\u{270D}", "\u{1F3F7}", "\u{1F46A}", "\u{2716}", "\u{1F522}", "\u{1F4D6}"],
  suara: "Ini peta keranjang bingkisan. Bingkisan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_BAGI =
  "Ini keranjang bingkisan pembagian. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_BAGI = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan pesta (lima pembagian dari Story) ------------------------------ */
export const KOLOM_INFO_BAGI = ["Dibagi", "Hasil bagi", "Periksa kali"] as const;
const bi = (ikon: string, nama: string, dibagi: [string, string], hasil: [string, string], periksa: [string, string], contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [
    { t: dibagi[0], s: dibagi[1] },
    { t: hasil[0], s: hasil[1] },
    { t: periksa[0], s: periksa[1] },
  ],
  contoh,
});
export const BARIS_INFO_BAGI: readonly BarisInfo[] = [
  bi("\u{1F381}", "Bingkisan", ["24 : 4", "dua puluh empat dibagi empat"], ["6", "enam"], ["6 × 4", "enam kali empat"], [0, 1, 2]),
  bi("\u{1F36C}", "Permen", ["36 : 9", "tiga puluh enam dibagi sembilan"], ["4", "empat"], ["4 × 9", "empat kali sembilan"], []),
  bi("\u{1F4FF}", "Manik", ["15 : 3", "lima belas dibagi tiga"], ["5", "lima"], ["5 × 3", "lima kali tiga"], []),
  bi("\u{1F370}", "Kue", ["18 : 3", "delapan belas dibagi tiga"], ["6", "enam"], ["6 × 3", "enam kali tiga"], []),
  bi("\u{1F95A}", "Telur", ["28 : 4", "dua puluh delapan dibagi empat"], ["7", "tujuh"], ["7 × 4", "tujuh kali empat"], []),
];
export const TEMA_INFO_BAGI: TemaInfo = { bingkai: "#C2410C", latar: "#FFF7ED", aksen: "#9A3412", teduh: "#FFEDD5", ikon: "\u{1F389}", judul: "Papan Pesta Pembagian" };
export const SUARA_INFO_BAGI =
  "Ini papan pesta pembagian. Ada lima kartu, satu kartu satu pembagian. Isi bilangan yang dibagi, hasil bagi, dan periksa kalinya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_BAGI = "Papan pesta lengkap! Hasil bagi dikali pembagi selalu sama dengan bilangan yang dibagi.";
