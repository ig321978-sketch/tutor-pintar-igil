/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab E (Papan Pameran Bu Tuti) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Persen Perseratusan, Kisi Seratus, Jembatan Persen).
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

export const KARTU_PAMERAN: readonly KartuPeta[] = [
  kt("Persen", ["Apa itu persen?", "Apa yang dimaksud dengan persen?"], ["Per seratus", "Persen berarti per seratus bagian."], ["Satu dari seratus bagian", "Satu persen adalah satu bagian dari seratus bagian sama besar."], ["masalah"]),
  kt("Pecahan per seratus", ["Persen seperti pecahan?", "Apakah persen bisa ditulis sebagai pecahan?"], ["Penyebut seratus", "Persen ditulis sebagai pecahan dengan penyebut seratus."], ["Pembilang jadi persen", "Pembilangnya menjadi angka persen."]),
  kt("Desimal perseratus", ["Apa itu perseratus?", "Apa yang dimaksud dengan desimal perseratus?"], ["Dua angka setelah koma", "Perseratus ditulis dengan dua angka di belakang koma."], ["Nol koma dua angka", "Desimal perseratus ditulis nol koma lalu dua angka."]),
  kt("Desimal ke persen", ["Desimal jadi persen?", "Bagaimana mengubah desimal menjadi persen?"], ["Geser koma ke kanan", "Geser koma dua tempat ke kanan."], ["Tulis tanda persen", "Setelah koma digeser, tulis tanda persen di belakangnya."]),
  kt("Persen ke desimal", ["Persen jadi desimal?", "Bagaimana mengubah persen menjadi desimal?"], ["Geser koma ke kiri", "Hilangkan tanda persen lalu geser koma dua tempat ke kiri."], ["Desimal didapat", "Hasilnya adalah desimal perseratus."]),
  kt("Nol di ujung", ["Nol di ujung berarti?", "Apakah nol di ujung belakang koma mengubah besarnya?"], ["Tambah atau buang nol", "Nol di ujung belakang koma boleh ditambah atau dibuang."], ["Besarnya sama", "Besarnya tidak berubah."]),
  kt("Cara pintar: Persen Perseratusan", ["Ingin langsung ke persen?", "Bagaimana langsung mendapat persen dari pecahan per seratus?"], ["Persen Perseratusan", "Salin pembilang dari pecahan per seratus menjadi angka persen."], ["Tanda persen di belakang", "Tulis tanda persen di belakang angka itu."]),
  kt("Cara pintar: Kisi Seratus", ["Ingin melihat artinya?", "Bagaimana melihat arti persen dengan gambar?"], ["Kisi Seratus", "Warnai kotak pada kisi seratus kotak sama besar."], ["Kotak berwarna, persen", "Banyak kotak berwarna adalah persennya."]),
  kt("Cara pintar: Jembatan Persen", ["Ingin bolak-balik cepat?", "Bagaimana mengubah desimal dan persen dengan cepat?"], ["Jembatan Persen", "Geser koma dua tempat, ke kanan atau ke kiri."], ["Dua arah, sama besar", "Jembatan bekerja dua arah dan besarnya tidak berubah."]),
];

export const TEMA_KARTU_PAMERAN: TemaPeta = { bingkai: "#9A3412", ikon: "\u{1F3A8}", judul: "Papan pameran batik", latar: "#FFF7ED", garisLatar: "#C2410C" };
/** Peta radial awal (tanpa kata): palet pameran di tengah, satu gambar per kartu (benda pameran batik). */
export const RINGKASAN_PAMERAN: RingkasanPeta = {
  pusat: "\u{1F3A8}",
  ikon: ["\u{1F4AF}", "\u{1F455}", "\u{1F457}", "\u{1F380}", "\u{1F45C}", "\u{1F3EE}", "\u{1F388}", "\u{1F389}", "\u{1F452}"],
  suara: "Ini peta papan pameran batik. Gambar palet ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_PAMERAN =
  "Ini papan pameran batik. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_PAMERAN = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar pameran (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_PAMERAN = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_PAMERAN: readonly BarisInfo[] = [
  bi("\u{1F3A8}", "Mewarnai kisi", "Warnai kotak", "Kotak jadi persen", "Kisi Seratus", [0, 1, 2]),
  bi("\u{1F455}", "Menulis pecahan", "Pembilang disalin", "Angka persen", "Persen Perseratusan", []),
  bi("\u{1F457}", "Desimal ke persen", "Geser koma kanan", "Tanda persen ditulis", "Dua tempat", []),
  bi("\u{1F45C}", "Persen ke desimal", "Geser koma kiri", "Desimal didapat", "Jembatan Persen", []),
  bi("\u{1F3EE}", "Nol di ujung", "Tambah atau buang nol", "Besarnya sama", "Persen berarti per seratus", []),
];
export const TEMA_INFO_PAMERAN: TemaInfo = { bingkai: "#7C2D12", latar: "#FFF7ED", aksen: "#C2410C", teduh: "#FFEDD5", ikon: "\u{1F4CB}", judul: "Daftar pameran" };
export const SUARA_INFO_PAMERAN = "Ini daftar pameran. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_PAMERAN = "Daftar pameran lengkap! Persen perseratusan, kisi seratus, dan jembatan persen.";
