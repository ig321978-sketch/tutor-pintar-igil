/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab I (Papan Jadwal Kak Yoga) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Pasangan Faktor, Daftar Kelipatan, Cek Bagi Habis).
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

export const KARTU_JADWAL: readonly KartuPeta[] = [
  kt("Faktor", ["Apa itu faktor?", "Apa yang dimaksud dengan faktor suatu bilangan?"], ["Membagi habis", "Faktor adalah bilangan yang membagi habis bilangan itu."], ["Tanpa sisa", "Faktor membagi bilangan itu tanpa sisa."], ["masalah"]),
  kt("Mencari faktor", ["Faktornya apa saja?", "Bagaimana mencari semua faktor suatu bilangan?"], ["Bagi mulai dari satu", "Bagi bilangan itu dengan satu, dua, tiga, dan seterusnya."], ["Semua faktor didapat", "Semua bilangan yang habis membagi adalah faktornya."]),
  kt("Pasangan faktor", ["Faktor berpasangan?", "Apakah faktor bisa dicari berpasangan?"], ["Kali sama dengan bilangan", "Dua bilangan yang dikalikan menjadi bilangan itu adalah pasangan faktor."], ["Dua faktor sekaligus", "Tiap pasangan memberi dua faktor sekaligus."]),
  kt("Kelipatan", ["Apa itu kelipatan?", "Apa yang dimaksud dengan kelipatan suatu bilangan?"], ["Kali bilangan asli", "Kelipatan adalah hasil kali bilangan itu dengan bilangan asli."], ["Daftar kelipatan", "Hasil kalinya membentuk daftar kelipatan."]),
  kt("Faktor dan kelipatan", ["Apa hubungannya?", "Apa hubungan faktor dengan kelipatan?"], ["Bagi dan kali", "Faktor membagi habis, kelipatan adalah hasil kali."], ["Saling berhubungan", "Faktor dan kelipatan saling berhubungan lewat pembagian dan perkalian."]),
  kt("Bukan faktor", ["Kapan bukan faktor?", "Kapan suatu bilangan bukan faktor?"], ["Bagi dan lihat sisa", "Bagi bilangan itu, lalu lihat sisanya."], ["Ada sisa, bukan faktor", "Kalau masih ada sisa, bilangan itu bukan faktor."]),
  kt("Cara pintar: Pasangan Faktor", ["Takut ada yang terlewat?", "Bagaimana agar tidak ada faktor yang terlewat?"], ["Pasangan Faktor", "Cari dua bilangan yang dikalikan menjadi bilangan itu, mulai dari satu."], ["Berhenti saat berulang", "Berhenti kalau pasangannya sudah berulang atau bertukar."]),
  kt("Cara pintar: Daftar Kelipatan", ["Ingin jadwal berulang?", "Bagaimana membuat daftar yang berulang dan tetap?"], ["Daftar Kelipatan", "Tulis hasil kali atau tambah berulang, lalu catat hasilnya."], ["Berhenti di batas", "Daftar berhenti kalau sudah sampai batas yang diminta."]),
  kt("Cara pintar: Cek Bagi Habis", ["Ingin menguji satu bilangan?", "Bagaimana menguji apakah satu bilangan adalah faktor?"], ["Cek Bagi Habis", "Bagi bilangan itu dan lihat sisanya."], ["Sisa menentukan", "Tanpa sisa berarti faktor, ada sisa berarti bukan faktor."]),
];

export const TEMA_KARTU_JADWAL: TemaPeta = { bingkai: "#6D28D9", ikon: "\u{1F4C5}", judul: "Papan jadwal pantai", latar: "#F5F3FF", garisLatar: "#7C3AED" };
/** Peta radial awal (tanpa kata): jadwal di tengah, satu gambar per kartu. */
export const RINGKASAN_JADWAL: RingkasanPeta = {
  pusat: "\u{1F4C5}",
  ikon: ["\u{1F4A1}", "\u{1F50D}", "\u{1F9E9}", "\u{1F501}", "\u{1F517}", "\u{26D4}", "\u{1F3EE}", "\u{2B50}", "\u{1F50E}"],
  suara: "Ini peta papan jadwal pantai. Gambar jadwal ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_JADWAL =
  "Ini papan jadwal pantai. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_JADWAL = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar jadwal (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_JADWAL = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_JADWAL: readonly BarisInfo[] = [
  bi("\u{1F302}", "Menyusun payung", "Baris sama banyak", "Pasangan faktor", "Kali jadi bilangan", [0, 1, 2]),
  bi("\u{1F50D}", "Mencari faktor", "Bagi mulai satu", "Semua faktor", "Jangan ada terlewat", []),
  bi("\u{1F3EE}", "Menulis kelipatan", "Kali atau tambah", "Daftar kelipatan", "Berhenti di batas", []),
  bi("\u{26F5}", "Membaca jadwal", "Loncat sama besar", "Waktu berulang", "Perahu tiap kelipatan", []),
  bi("\u{1F50E}", "Menguji faktor", "Bagi lalu lihat sisa", "Habis atau bersisa", "Cek Bagi Habis", []),
];
export const TEMA_INFO_JADWAL: TemaInfo = { bingkai: "#4C1D95", latar: "#F5F3FF", aksen: "#7C3AED", teduh: "#EDE9FE", ikon: "\u{1F4C5}", judul: "Daftar jadwal" };
export const SUARA_INFO_JADWAL = "Ini daftar jadwal. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_JADWAL = "Daftar jadwal lengkap! Pasangan faktor, daftar kelipatan, dan cek bagi habis.";
