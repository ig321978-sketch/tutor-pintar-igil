/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab C (Mengukur Berat dengan Satuan Baku) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Mengangkat dan Merasakan, Berat Acuan, Cek Angka Nol).
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

export const KARTU_TIMBANG: readonly KartuPeta[] = [
  kt("Timbangan", ["Berapa beratnya?", "Berapa berat sebuah benda?"], ["Pakai timbangan", "Berat benda diukur dengan timbangan."], ["Berat terukur", "Timbangan menunjukkan berat benda."], ["masalah"]),
  kt("Gram dan kilogram", ["Satuan apa?", "Satuan apa yang dipakai untuk berat?"], ["Ringan gram, berat kilogram", "Gram untuk benda ringan dan kilogram untuk benda berat."], ["Ditulis g atau kg", "Gram ditulis g dan kilogram ditulis kg."]),
  kt("Pilih timbangan", ["Timbangan yang mana?", "Timbangan apa yang cocok untuk benda itu?"], ["Sesuaikan dengan benda", "Pilih timbangan digital, duduk, atau badan sesuai bendanya."], ["Satuan mengikuti berat", "Satuan dipilih sesuai berat benda."]),
  kt("Mulai dari nol", ["Jarum belum nol?", "Bagaimana bila jarum atau layar belum di nol?"], ["Setel ke nol", "Putar jarum atau tekan tombol sampai tepat di nol."], ["Timbangan siap", "Setelah di nol, timbangan siap dipakai."]),
  kt("Baca dan tulis", ["Berapa angkanya?", "Bagaimana mencatat berat benda?"], ["Baca layar atau jarum", "Baca angka pada layar atau jarum dengan teliti."], ["Tulis dengan satuan", "Berat ditulis lengkap dengan satuannya."]),
  kt("Selisih berat", ["Beda berapa?", "Bagaimana mencari beda dua berat?"], ["Kurangi dua berat", "Berat yang besar dikurangi berat yang kecil."], ["Selisih berat", "Hasil pengurangan adalah selisih berat, dengan satuan yang sama."]),
  kt("Cara pintar: Mengangkat dan Merasakan", ["Ingin tahu cepat?", "Bagaimana memperkirakan mana yang lebih berat?"], ["Mengangkat dan Merasakan", "Angkat dua benda, rasakan mana yang lebih berat, lalu pastikan dengan timbangan."], ["Perkiraan lalu dipastikan", "Rasa tangan memperkirakan, dan timbangan yang menentukan."]),
  kt("Cara pintar: Berat Acuan", ["Tidak ada timbangan?", "Bagaimana memperkirakan berat tanpa timbangan?"], ["Berat Acuan", "Ingat berat benda yang sudah dikenal, lalu bandingkan."], ["Berat diperkirakan", "Berat benda lain diperkirakan dari benda acuan."]),
  kt("Cara pintar: Cek Angka Nol", ["Hasilnya meleset?", "Bagaimana mencegah hasil timbangan meleset?"], ["Cek Angka Nol", "Selalu periksa jarum atau layar di angka nol sebelum menimbang."], ["Hasil tepat", "Dengan awal tepat di nol, hasil timbangan tepat."]),
];

export const TEMA_KARTU_TIMBANG: TemaPeta = { bingkai: "#3F6212", ikon: "\u{1F955}", judul: "Keranjang pakan", latar: "#F7FEE7", garisLatar: "#65A30D" };
/** Peta radial awal (tanpa kata): timbangan di tengah, satu gambar per kartu. */
export const RINGKASAN_TIMBANG: RingkasanPeta = {
  pusat: "\u{2696}",
  ikon: ["\u{1F9FA}", "\u{1F524}", "\u{1F9EE}", "\u{2B55}", "\u{1F4DD}", "\u{2796}", "\u{270B}", "\u{1F95A}", "\u{1F50D}"],
  suara: "Ini peta mengukur berat. Gambar timbangan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TIMBANG =
  "Ini keranjang pakan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TIMBANG = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: catatan berat (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TIMBANG = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TIMBANG: readonly BarisInfo[] = [
  bi("\u{2696}", "Menimbang benda", "Pakai timbangan", "Berat terukur", "Gram atau kilogram", [0, 1, 2]),
  bi("\u{2B55}", "Mulai dari nol", "Setel ke nol", "Timbangan siap", "Nol dulu, baru timbang", []),
  bi("\u{1F4DD}", "Membaca berat", "Baca layar atau jarum", "Berat dengan satuan", "Tulis satuannya", []),
  bi("\u{1F9EE}", "Memilih timbangan", "Sesuaikan dengan benda", "Timbangan yang cocok", "Ringan gram, berat kilogram", []),
  bi("\u{2796}", "Mencari selisih", "Kurangi dua berat", "Selisih berat", "Satuan tetap sama", []),
];
export const TEMA_INFO_TIMBANG: TemaInfo = { bingkai: "#854D0E", latar: "#FEFCE8", aksen: "#A16207", teduh: "#FEF9C3", ikon: "\u{1F4D2}", judul: "Catatan berat" };
export const SUARA_INFO_TIMBANG = "Ini catatan berat. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TIMBANG = "Catatan berat lengkap! Mulai dari nol, baca dengan satuan, dan cari selisihnya.";
