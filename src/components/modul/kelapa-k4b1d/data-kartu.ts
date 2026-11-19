/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab D (Menyusun dan Menguraikan Bilangan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir sebelum Memeriksa dengan nama Indonesia (Pecah Bilangan, Susun Bilangan, Bagan Bagian Utuh).
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

export const KARTU_KELAPA: readonly KartuPeta[] = [
  kt("Menyusun", ["Bagian jadi satu?", "Bagaimana menyatukan bagian-bagian menjadi satu bilangan?"], ["Digabung", "Semua bagian digabung dari ribuan sampai satuan."], ["Satu bilangan", "Hasil gabungan adalah satu bilangan utuh."], ["masalah"]),
  kt("Menguraikan", ["Bilangan dipecah?", "Bagaimana memecah satu bilangan menjadi bagian-bagiannya?"], ["Per tempat angka", "Tiap angka ditulis dengan harga tempatnya."], ["Bagian bertempat", "Ada bagian ribuan, ratusan, puluhan, dan satuan."]),
  kt("Tempat angka", ["Angka ini berarti apa?", "Apa arti satu angka di dalam bilangan besar?"], ["Lihat tempatnya", "Angka yang sama berarti lain bila tempatnya lain."], ["Harga tempat", "Harga satu angka bergantung pada tempat angkanya."]),
  kt("Tempat kosong", ["Ada tempat kosong?", "Apa yang dilakukan bila ada tempat tanpa bagian?"], ["Diisi nol", "Saat menyusun, tempat kosong diisi nol."], ["Tidak ditulis", "Saat menguraikan, bagian nol tidak perlu ditulis."]),
  kt("Lebih dari satu cara", ["Hanya satu cara?", "Apakah satu bilangan hanya punya satu uraian?"], ["Dibagi dua", "Bilangan dibagi menjadi dua bagian dengan berbagai cara."], ["Banyak cara benar", "Bilangan yang sama dapat diuraikan dengan lebih dari satu cara."]),
  kt("Cara pintar: Pecah Bilangan", ["Ada bagian tertinggal?", "Bagaimana memecah bilangan tanpa ada bagian yang tertinggal?"], ["Pecah Bilangan", "Pecah bilangan menjadi ribuan, ratusan, puluhan, dan satuan."], ["Isi bilangan tampak", "Tiap bagian terlihat jelas bersama harga tempatnya."]),
  kt("Cara pintar: Susun Bilangan", ["Angkanya salah tempat?", "Bagaimana merakit bilangan tanpa salah menaruh angka?"], ["Susun Bilangan", "Taruh tiap bagian pada tempatnya dan isi nol bila kosong."], ["Bilangan utuh terbaca", "Hasil susunan dapat dibaca kembali sebagai bilangan utuh."]),
  kt("Cara pintar: Bagan Bagian Utuh", ["Satu bagian hilang?", "Bagaimana mencari bagian yang belum diketahui?"], ["Bagan Bagian Utuh", "Taruh bilangan utuh di kotak besar dan bagiannya di dua kotak kecil."], ["Bagian dicari dengan kurang", "Bagian yang hilang didapat dengan mengurangkan."]),
  kt("Memeriksa", ["Yakin sudah benar?", "Bagaimana memastikan hasilnya benar?"], ["Digabung kembali", "Jumlahkan kembali semua bagian."], ["Harus sama", "Jumlah semua bagian harus sama dengan bilangan semula."]),
];

export const TEMA_KARTU_KELAPA: TemaPeta = { bingkai: "#C2410C", ikon: "\u{1F965}", judul: "Kios Pak Darwis", latar: "#FFEDD5", garisLatar: "#EA580C" };
/** Peta radial awal (tanpa kata): kelapa di tengah, satu gambar per kartu. */
export const RINGKASAN_KELAPA: RingkasanPeta = {
  pusat: "\u{1F965}",
  ikon: ["\u{1F9FA}", "\u{2702}", "\u{1F4CD}", "\u{26AA}", "\u{1F500}", "\u{1F528}", "\u{1F9F1}", "\u{1F4CA}", "\u{2705}"],
  suara: "Ini peta menyusun dan menguraikan bilangan. Gambar kelapa ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KELAPA =
  "Ini kios kelapa Pak Darwis. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KELAPA = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar kios (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_KELAPA = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_KELAPA: readonly BarisInfo[] = [
  bi("\u{1F528}", "Menguraikan bilangan", "Pecah per tempat", "Bagian bertempat", "Nol tidak ditulis", [0, 1, 2]),
  bi("\u{1F9F1}", "Menyusun bilangan", "Gabung semua bagian", "Satu bilangan utuh", "Tempat kosong diisi nol", []),
  bi("\u{1F4CA}", "Mencari bagian hilang", "Utuh dikurangi bagian", "Bagian lain didapat", "Bagan bagian utuh", []),
  bi("\u{1F500}", "Mencari cara lain", "Bagi bilangan jadi dua", "Banyak cara benar", "Jumlahnya tetap sama", []),
  bi("\u{2705}", "Memeriksa hasil", "Jumlahkan kembali", "Sama dengan bilangan", "Salah langsung ketahuan", []),
];
export const TEMA_INFO_KELAPA: TemaInfo = { bingkai: "#166534", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F4CB}", judul: "Daftar kios" };
export const SUARA_INFO_KELAPA = "Ini daftar kios. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KELAPA = "Daftar kios lengkap! Pecah, susun, dan periksa bilangan.";
