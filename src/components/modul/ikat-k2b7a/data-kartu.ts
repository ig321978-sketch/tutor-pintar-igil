/**
 * Mind-map Kelas 2 Bab 7 Sub-Bab A (Menghitung, membaca, menulis bilangan sampai seratus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Bingkai Sepuluh, Hitung Loncat, Balok Puluhan).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris dari data Story.
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

export const KARTU_IKAT: readonly KartuPeta[] = [
  kt("Mengikat benda", ["Berapa bendanya?", "Kita ingin tahu banyak benda."], ["Diikat sepuluh", "Benda diikat sepuluh-sepuluh."], ["Satu ikat satu puluhan", "Sepuluh satuan sama dengan satu puluhan, yaitu satu ikat."], ["masalah"]),
  kt("Puluhan dan satuan", ["Ada ikat dan benda lepas?", "Ada ikat penuh dan benda yang masih lepas."], ["Puluhan tambah satuan", "Hitung puluhan dulu, lalu tambah satuan."], ["Bilangan dua angka", "Hasilnya bilangan dengan puluhan dan satuan."]),
  kt("Papan puluhan dan satuan", ["Bagaimana menuliskannya?", "Bagaimana menulis banyak puluhan dan satuan?"], ["Papan dua kolom", "Taruh angka di papan puluhan dan satuan."], ["Puluhan di kiri", "Angka puluhan di kiri dan satuan di kanan."]),
  kt("Pasangan bilangan", ["Adakah cara lain?", "Adakah cara lain menuliskan bilangan?"], ["Dipecah jadi pasangan", "Bilangan dipecah menjadi puluhan dan satuan."], ["Bilangan sama, cara beda", "Dua cara menunjukkan bilangan yang sama."]),
  kt("Membaca dan menulis", ["Angkanya tertukar?", "Apa yang terjadi bila angka puluhan dan satuan tertukar?"], ["Puluhan dulu", "Baca dan tulis puluhan dulu, lalu satuan."], ["Bilangannya berbeda", "Angka yang tertukar membuat bilangan yang berbeda."]),
  kt("Memperkirakan", ["Kira-kira berapa?", "Kita kira-kira dulu banyak benda yang belum terhitung."], ["Ikat untuk membuktikan", "Ikat sepuluh-sepuluh untuk membuktikan perkiraan."], ["Perkiraan terbukti", "Kita tahu banyak benda sebenarnya, dan perkiraan boleh keliru."]),
  kt("Cara pintar: Bingkai Sepuluh", ["Benda tidak terlalu banyak?", "Bagaimana menghitung benda yang tidak terlalu banyak?"], ["Bingkai Sepuluh", "Isi bingkai sepuluh kotak, satu kotak satu benda."], ["Bingkai penuh satu puluhan", "Bingkai yang penuh adalah satu puluhan."]),
  kt("Cara pintar: Hitung Loncat", ["Benda sudah diikat?", "Bagaimana menghitung ikat dengan cepat?"], ["Hitung Loncat", "Sebut bilangan sambil melompat sepuluh-sepuluh."], ["Sepuluh puluhan seratus", "Sepuluh lompatan puluhan sama dengan seratus."]),
  kt("Cara pintar: Balok Puluhan", ["Mau lihat puluhan jelas?", "Bagaimana melihat puluhan dan satuan dengan jelas?"], ["Balok Puluhan", "Batang untuk puluhan dan kotak kecil untuk satuan."], ["Sepuluh kotak jadi batang", "Sepuluh kotak kecil boleh ditukar satu batang."]),
];

export const TEMA_KARTU_IKAT: TemaPeta = { bingkai: "#15803D", ikon: "\u{267B}", judul: "Gerobak botol", latar: "#DCFCE7", garisLatar: "#166534" };
/** Peta radial awal (tanpa kata): lambang daur ulang di tengah, satu gambar per kartu. */
export const RINGKASAN_IKAT: RingkasanPeta = {
  pusat: "\u{267B}",
  ikon: ["\u{1F9F6}", "\u{1F4E6}", "\u{1F4CB}", "\u{1F46B}", "\u{1F4DD}", "\u{1F914}", "\u{1F7E8}", "\u{1F998}", "\u{1F9F1}"],
  suara: "Ini peta bilangan sampai seratus. Lambang daur ulang ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_IKAT =
  "Ini gerobak botol. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_IKAT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan setoran (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_IKAT = ["Cara menghitung", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_IKAT: readonly BarisInfo[] = [
  bi("\u{1F37E}", "Sepuluh botol", "Diikat tali rafia", "Satu ikat", "Satu puluhan", [0, 1, 2]),
  bi("\u{1F6D2}", "Gerobak penuh", "Melompat sepuluh", "Sepuluh ikat", "Seratus botol", []),
  bi("\u{1F7E1}", "Tim Kuning", "Tiga ikat, delapan lepas", "Tiga puluh delapan", "Puluhan tambah satuan", []),
  bi("\u{1F4DD}", "Laporan terbalik", "Angka tertukar", "Delapan puluh tiga", "Puluhan dulu, lalu satuan", []),
  bi("\u{1F96B}", "Setumpuk kaleng", "Kira-kira lalu ikat", "Empat puluh enam", "Perkiraan dekat", []),
];
export const TEMA_INFO_IKAT: TemaInfo = { bingkai: "#B45309", latar: "#FFFBEB", aksen: "#CA8A04", teduh: "#FEF3C7", ikon: "\u{1F4E3}", judul: "Papan setoran" };
export const SUARA_INFO_IKAT = "Ini papan setoran. Ada lima baris, satu baris satu kejadian dari cerita. Isi cara menghitung, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_IKAT = "Papan setoran lengkap! Satu ikat adalah satu puluhan, puluhan dibaca lebih dulu, dan perkiraan dibuktikan dengan mengikat.";
