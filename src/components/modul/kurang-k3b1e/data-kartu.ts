/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab E (Pengurangan sampai Seratus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Pengurangan Bersusun, Menghitung Naik, Pinjam Puluhan).
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

export const KARTU_KURANG: readonly KartuPeta[] = [
  kt("Mengurangi", ["Berapa sisanya?", "Kita ingin tahu berapa yang tersisa setelah sebagian diambil."], ["Dikurangi", "Banyak yang diambil dikurangkan dari banyak semula."], ["Sisa didapat", "Hasil pengurangan adalah sisanya."], ["masalah"]),
  kt("Susun pendek", ["Bagaimana menulisnya?", "Kita perlu cara menulis pengurangan dua bilangan dengan rapi."], ["Susun ke bawah", "Bilangan ditulis ke bawah, puluhan lurus dengan puluhan dan satuan lurus dengan satuan."], ["Rapi dan mudah dihitung", "Dengan tempat yang lurus, tiap tempat mudah dikurangi."]),
  kt("Cara pintar: Pengurangan Bersusun", ["Mulai dari mana?", "Kita ingin tahu tempat mana yang dikurangi lebih dulu."], ["Pengurangan Bersusun", "Pengurangan Bersusun mengurangi tempat demi tempat, dimulai dari kanan."], ["Satuan dulu, lalu puluhan", "Kurangi satuan lebih dulu, baru puluhan."]),
  kt("Cara pintar: Pinjam Puluhan", ["Satuan atas terlalu kecil?", "Kadang satuan di atas lebih kecil dari satuan di bawahnya."], ["Pinjam Puluhan", "Pinjam Puluhan membuka satu puluhan menjadi sepuluh satuan."], ["Puluhan berkurang satu", "Satuan atas bertambah sepuluh dan puluhan di atas berkurang satu."]),
  kt("Susun panjang", ["Adakah cara lain?", "Selain susun pendek, ada cara yang menguraikan bilangan."], ["Uraikan puluhan dan satuan", "Bilangan diuraikan menjadi puluhan dan satuan, lalu tiap bagian dikurangi."], ["Hasil bagian digabung", "Hasil puluhan dan hasil satuan ditambahkan, hasilnya sama dengan susun pendek."]),
  kt("Cara pintar: Menghitung Naik", ["Dua bilangan berdekatan?", "Bila dua bilangan berdekatan, ada cara yang lebih cepat."], ["Menghitung Naik", "Menghitung Naik naik dari bilangan kecil sampai bilangan besar."], ["Jumlah langkah naik", "Jumlah semua langkah naik adalah selisihnya."]),
  kt("Memeriksa", ["Apakah hasilnya benar?", "Kita ingin memastikan hasil pengurangan tidak keliru."], ["Tambahkan kembali", "Hasil ditambah bilangan yang dikurangkan."], ["Kembali ke bilangan awal", "Bila jumlahnya sama dengan bilangan awal, hasilnya benar."]),
  kt("Hasil nol", ["Sisanya habis?", "Kadang semua benda terambil sehingga tidak ada sisa."], ["Kurangi bilangan sama", "Bilangan yang sama saling dikurangi."], ["Hasilnya nol", "Hasil nol berarti tidak ada yang tersisa."]),
  kt("Cerita pengurangan", ["Sisa atau selisih?", "Cerita pengurangan menanyakan sisa atau selisih."], ["Tulis kalimat kurang", "Tulis kalimat pengurangannya, lalu hitung."], ["Jawab dengan satuan", "Tulis jawaban lengkap dengan satuannya."]),
];

export const TEMA_KARTU_KURANG: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F35C}", judul: "Rak pengurangan", latar: "#FFFBEB", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): tanda kurang di tengah, satu gambar per kartu. */
export const RINGKASAN_KURANG: RingkasanPeta = {
  pusat: "\u{2796}",
  ikon: ["\u{1F6D2}", "\u{1F4CF}", "\u{1F522}", "\u{1F4E6}", "\u{1F9E9}", "\u{1F4C8}", "\u{2705}", "\u{2B55}", "\u{1F4DD}"],
  suara: "Ini peta rak pengurangan. Tanda kurang ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KURANG =
  "Ini rak pengurangan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KURANG = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: catatan sisa (lima kejadian dari Story) ------------------------------ */
export const KOLOM_INFO_KURANG = ["Dikurangi", "Sisa", "Cara"] as const;
const bi = (ikon: string, nama: string, kurang: [string, string], sisa: [string, string], cara: string, contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [{ t: kurang[0], s: kurang[1] }, { t: sisa[0], s: sisa[1] }, { t: cara }],
  contoh,
});
export const BARIS_INFO_KURANG: readonly BarisInfo[] = [
  bi("\u{1F35C}", "Mi di rak", ["35", "tiga puluh lima"], ["33", "tiga puluh tiga"], "Pengurangan bersusun", [0, 1, 2]),
  bi("\u{1F4E6}", "Mi esok hari", ["28", "dua puluh delapan"], ["43", "empat puluh tiga"], "Pinjam puluhan", []),
  bi("\u{1F96B}", "Kaleng susu", ["54", "lima puluh empat"], ["36", "tiga puluh enam"], "Pinjam puluhan", []),
  bi("\u{2B55}", "Rak habis", ["24", "dua puluh empat"], ["0", "nol"], "Bilangan sama", []),
  bi("\u{1F4C8}", "Dua bilangan dekat", ["76", "tujuh puluh enam"], ["6", "enam"], "Menghitung naik", []),
];
export const TEMA_INFO_KURANG: TemaInfo = { bingkai: "#B45309", latar: "#FFFBEB", aksen: "#92400E", teduh: "#FEF3C7", ikon: "\u{1F9FE}", judul: "Catatan Sisa Stok" };
export const SUARA_INFO_KURANG =
  "Ini catatan sisa stok. Ada lima baris, satu baris satu kejadian. Isi bilangan yang dikurangkan, sisanya, dan caranya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KURANG = "Catatan lengkap! Bilangan yang dikurangkan, sisa, dan cara berjalan bersama supaya sisa stok benar.";
