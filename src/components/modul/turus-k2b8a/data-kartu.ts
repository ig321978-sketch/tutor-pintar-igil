/**
 * Mind-map Kelas 2 Bab 8 Sub-Bab A (Diagram Turus) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Alas Pilah, Hitung Lima-Lima, Diagram Benda Nyata).
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

export const KARTU_TURUS: readonly KartuPeta[] = [
  kt("Memilah dan menghitung", ["Benda campur aduk?", "Benda bercampur dan sulit dihitung."], ["Dipilah, hitung satu-satu", "Pilah menurut jenisnya, lalu hitung tiap jenis satu per satu."], ["Tidak ada terlewat", "Setiap benda terhitung satu kali, tidak terlewat dan tidak dobel."], ["masalah"]),
  kt("Mencatat turus", ["Bagaimana mencatatnya?", "Bagaimana mencatat banyak benda dengan cepat?"], ["Satu benda satu garis", "Tulis satu garis tegak untuk satu benda."], ["Garis sama banyak", "Garis yang ditulis sama banyak dengan bendanya."]),
  kt("Bundel lima", ["Garisnya terlalu panjang?", "Garis yang berderet panjang sulit dihitung."], ["Empat garis lalu coretan", "Empat garis tegak, garis kelima mencoret miring."], ["Satu bundel lima", "Satu bundel berisi lima turus."]),
  kt("Diagram turus", ["Bagaimana menyajikannya?", "Bagaimana menyajikan hasil turus dengan rapi?"], ["Tabel tiga kolom", "Tabel dengan kolom nama, turus, dan banyaknya, lalu diberi judul."], ["Mudah dibaca", "Tabel berjudul mudah dibaca orang lain."]),
  kt("Membaca diagram", ["Apa yang bisa dibaca?", "Apa yang bisa dibaca dari diagram turus?"], ["Bandingkan baris", "Bandingkan panjang turus tiap baris."], ["Paling banyak, lebih, kurang", "Terbaca jenis paling banyak, paling sedikit, sama banyak, lebihnya, dan kurangnya."]),
  kt("Data sendiri", ["Ingin tahu pilihan anak?", "Kita ingin mengumpulkan data sendiri dengan bertanya."], ["Tanya, catat satu garis", "Tiap anak menjawab satu kali, tulis satu garis di baris yang tepat."], ["Data terkumpul", "Data terkumpul dan siap dibaca dalam diagram."]),
  kt("Cara pintar: Alas Pilah", ["Benda masih campur?", "Bagaimana memilah benda yang bercampur dengan rapi?"], ["Alas Pilah", "Alas punya satu baris untuk tiap jenis, satu benda di satu baris."], ["Terpilah tanpa tercampur", "Tiap baris bisa dihitung tanpa takut tercampur."]),
  kt("Cara pintar: Hitung Lima-Lima", ["Turus sudah dibundel?", "Bagaimana menghitung turus yang sudah dibundel lima-lima?"], ["Hitung Lima-Lima", "Lompat lima-lima per bundel, sisanya dihitung satu-satu."], ["Cepat dan tepat", "Banyak turus terhitung cepat dan tepat."]),
  kt("Cara pintar: Diagram Benda Nyata", ["Ingin cepat membandingkan?", "Bagaimana membandingkan jenis benda dengan cepat?"], ["Diagram Benda Nyata", "Benda asli disusun berbaris dari garis dasar yang sama."], ["Terpanjang paling banyak", "Lajur terpanjang berarti benda paling banyak."]),
];

export const TEMA_KARTU_TURUS: TemaPeta = { bingkai: "#B91C1C", ikon: "\u{1F3AD}", judul: "Peti alat musik", latar: "#FEE2E2", garisLatar: "#991B1B" };
/** Peta radial awal (tanpa kata): topeng panggung di tengah, satu gambar per kartu. */
export const RINGKASAN_TURUS: RingkasanPeta = {
  pusat: "\u{1F3AD}",
  ikon: ["\u{1F9FA}", "\u{270F}", "\u{270B}", "\u{1F4CB}", "\u{1F50D}", "\u{1F64B}", "\u{1F7E6}", "\u{23E9}", "\u{1F4CA}"],
  suara: "Ini peta diagram turus. Topeng panggung ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TURUS =
  "Ini peti alat musik. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TURUS = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan catatan (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TURUS = ["Cara mencatat", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TURUS: readonly BarisInfo[] = [
  bi("\u{1F941}", "Peti campur", "Dipilah menurut jenis", "Satu jenis satu baris", "Tidak ada terlewat", [0, 1, 2]),
  bi("\u{1F38D}", "Angklung sembilan", "Satu bundel, empat garis", "Sembilan turus", "Bundel lima", []),
  bi("\u{1F4CB}", "Tabel alat musik", "Nama, turus, banyaknya", "Angklung paling banyak", "Berjudul dan rapi", []),
  bi("\u{1F3B6}", "Gendang dan rebana", "Turus sama panjang", "Sama banyak", "Empat dan empat", []),
  bi("\u{1F64B}", "Penampilan pilihan", "Satu garis tiap jawaban", "Tari paling banyak", "Dua belas anak", []),
];
export const TEMA_INFO_TURUS: TemaInfo = { bingkai: "#9A3412", latar: "#FFF7ED", aksen: "#C2410C", teduh: "#FFEDD5", ikon: "\u{1F4DD}", judul: "Papan catatan" };
export const SUARA_INFO_TURUS = "Ini papan catatan. Ada lima baris, satu baris satu kejadian dari cerita. Isi cara mencatat, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TURUS = "Papan catatan lengkap! Satu garis untuk satu benda, lima turus dibundel, dan tabel turus dibaca dengan membandingkan barisnya.";
