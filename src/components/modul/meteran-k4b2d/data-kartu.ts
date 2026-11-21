/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab D (Pecahan Desimal Per Sepuluh dan Per Seratus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek (kata paling panjang sekitar dua belas huruf).
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu sebelum Memeriksa dengan nama Indonesia (Kisi Persepuluhan, Kisi Perseratusan, Jembatan Desimal).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Ikon peta sesuai tema meteran dan kain (penggaris, benang, wol, pita, gunting, syal, kaus, gaun, kaus kaki). Infografis: satu tabel lima baris dari kejadian Story.
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

export const KARTU_METERAN: readonly KartuPeta[] = [
  kt("Per sepuluh", ["Dibagi sepuluh?", "Bagaimana menyebut potongan dari kain yang dibagi sepuluh bagian sama?"], ["Pecahan per sepuluh", "Tiap bagian adalah satu per sepuluh meter."], ["Tiga per sepuluh", "Tiga bagian dari sepuluh bagian sama disebut tiga per sepuluh."], ["masalah"]),
  kt("Satu angka koma", ["Ditulis apa?", "Bagaimana menulis pecahan per sepuluh dengan koma?"], ["Satu angka", "Pecahan per sepuluh punya satu angka di belakang koma."], ["Persepuluhan", "Angka itu menunjukkan persepuluhan."]),
  kt("Per seratus", ["Dibagi seratus?", "Bagaimana menyebut potongan dari kain yang dibagi seratus bagian sama?"], ["Pecahan per seratus", "Tiap bagian adalah satu per seratus meter."], ["Dua puluh tujuh", "Dua puluh tujuh bagian dari seratus bagian sama disebut dua puluh tujuh per seratus."]),
  kt("Dua angka koma", ["Ditulis bagaimana?", "Bagaimana menulis pecahan per seratus dengan koma?"], ["Dua angka", "Pecahan per seratus punya dua angka di belakang koma."], ["Perseratusan", "Angka kedua menunjukkan perseratusan."]),
  kt("Nol penjaga", ["Satu angka saja?", "Apa yang dilakukan bila pembilang per seratus hanya satu angka?"], ["Isi nol", "Tempat persepuluhan diisi nol supaya ada dua angka."], ["Nol koma nol tiga", "Tiga per seratus ditulis nol koma nol tiga."]),
  kt("Cara pintar: Kisi Persepuluhan", ["Sulit terbayang?", "Bagaimana melihat pecahan per sepuluh dengan gambar?"], ["Kisi Persepuluhan", "Gambar sepuluh kolom sama besar, lalu warnai kolomnya."], ["Satu angka tampak", "Banyak kolom berwarna menjadi angka di belakang koma."]),
  kt("Cara pintar: Kisi Perseratusan", ["Dua angka sulit?", "Bagaimana melihat pecahan per seratus dengan gambar?"], ["Kisi Perseratusan", "Gambar seratus kotak sama besar, lalu warnai kotaknya."], ["Dua angka tampak", "Baris penuh dan kotak lepas menjadi dua angka di belakang koma."]),
  kt("Cara pintar: Jembatan Desimal", ["Ingin cepat?", "Bagaimana mengubah pecahan menjadi desimal tanpa menggambar?"], ["Jembatan Desimal", "Tulis pecahan di kiri, desimal di kanan, lalu hubungkan."], ["Besar sama", "Pecahan dan desimal yang dihubungkan menunjukkan besar yang sama."]),
  kt("Memeriksa", ["Yakin benar?", "Bagaimana memastikan desimalnya benar?"], ["Hitung angka koma", "Cocokkan banyak angka di belakang koma dengan penyebutnya."], ["Harus cocok", "Penyebut sepuluh berarti satu angka, penyebut seratus berarti dua angka."]),
];

export const TEMA_KARTU_METERAN: TemaPeta = { bingkai: "#4338CA", ikon: "\u{1F4CF}", judul: "Meteran Pak Bagas", latar: "#E0E7FF", garisLatar: "#6366F1" };
/** Peta radial awal (tanpa kata): benang di tengah, satu gambar benda kain atau ukur per kartu. */
export const RINGKASAN_METERAN: RingkasanPeta = {
  pusat: "\u{1F9F5}",
  ikon: ["\u{1F4CF}", "\u{1F9F6}", "\u{1F380}", "\u{2702}", "\u{1F9E3}", "\u{1F455}", "\u{1F457}", "\u{1F9E6}", "\u{1F9E4}"],
  suara: "Ini peta pecahan desimal. Gambar benang ada di tengah, dan sembilan gambar kain dan alat ukur mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_METERAN =
  "Ini meteran kain Pak Bagas. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_METERAN = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar meteran (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_METERAN = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_METERAN: readonly BarisInfo[] = [
  bi("\u{1F9F5}", "Per sepuluh", "Bagi jadi sepuluh", "Satu angka koma", "Nol koma tiga", [0, 1, 2]),
  bi("\u{1F9F6}", "Per seratus", "Bagi jadi seratus", "Dua angka koma", "Nol koma dua tujuh", []),
  bi("\u{1F380}", "Nol penjaga", "Isi tempat kosong", "Nol di depan", "Nol koma nol tiga", []),
  bi("\u{1F4CF}", "Jembatan", "Pecahan ke desimal", "Besar sama", "Dua tulisan, satu besar", []),
  bi("\u{2702}", "Memeriksa", "Hitung angka koma", "Cocok penyebut", "Salah langsung ketahuan", []),
];
export const TEMA_INFO_METERAN: TemaInfo = { bingkai: "#9D174D", latar: "#FDF2F8", aksen: "#DB2777", teduh: "#FCE7F3", ikon: "\u{1F4CB}", judul: "Daftar meteran" };
export const SUARA_INFO_METERAN = "Ini daftar meteran. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_METERAN = "Daftar meteran lengkap! Per sepuluh, per seratus, dan jembatan desimal.";
