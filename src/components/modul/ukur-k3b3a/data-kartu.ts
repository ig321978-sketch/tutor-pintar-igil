/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab A (Mengukur Panjang dengan Satuan Baku) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Perkirakan dan Periksa, Ukuran Acuan, Pita Penggaris).
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

export const KARTU_UKUR: readonly KartuPeta[] = [
  kt("Satuan baku", ["Ukurannya beda-beda?", "Mengukur dengan jengkal tangan menghasilkan ukuran yang berbeda untuk tiap orang."], ["Pakai satuan baku", "Satuan baku sama untuk semua orang."], ["Ukuran sama untuk semua", "Dengan satuan baku, semua orang mendapat ukuran yang sama."], ["masalah"]),
  kt("Sentimeter dan meter", ["Satuan apa yang baku?", "Satuan apa yang dipakai untuk mengukur panjang?"], ["Sentimeter dan meter", "Satuan baku panjang adalah sentimeter dan meter."], ["Ditulis cm dan m", "Sentimeter ditulis cm, dan meter ditulis m."]),
  kt("Pilih alat ukur", ["Alat apa yang pas?", "Alat apa yang dipakai untuk mengukur panjang benda?"], ["Penggaris atau meteran", "Penggaris dan meteran adalah alat ukur panjang."], ["Pendek penggaris, panjang meteran", "Benda pendek diukur dengan penggaris, dan benda panjang dengan meteran."]),
  kt("Mulai dari nol", ["Mulai dari mana?", "Dari angka berapa benda mulai diukur?"], ["Ujung di angka nol", "Ujung benda diletakkan tepat di angka nol pada alat ukur."], ["Mulai tepat dari nol", "Bila mulai dari angka nol, bacaan di ujung lain sudah benar."]),
  kt("Baca ujung lain", ["Berapa panjangnya?", "Bagaimana mengetahui panjang benda?"], ["Baca ujung lain", "Baca angka yang ada di ujung benda yang lain."], ["Panjang didapat", "Angka di ujung lain adalah panjang benda."]),
  kt("Tulis dengan satuan", ["Cukup angkanya?", "Apakah hasil ukur cukup ditulis dengan angka saja?"], ["Tulis dengan satuan", "Hasil ukur ditulis dengan angka dan satuannya."], ["Angka dan satuan lengkap", "Ukuran yang lengkap memuat angka dan satuan."]),
  kt("Cara pintar: Perkirakan dan Periksa", ["Ingin yakin benar?", "Bagaimana memastikan hasil ukur tidak salah baca?"], ["Perkirakan dan Periksa", "Perkirakan panjangnya dulu, lalu ukur dan bandingkan."], ["Salah baca ketahuan", "Bila jauh berbeda, periksa lagi apakah ujungnya sudah di nol."]),
  kt("Cara pintar: Ukuran Acuan", ["Tidak ada alat ukur?", "Bagaimana memperkirakan panjang bila tidak ada alat ukur?"], ["Ukuran Acuan", "Pakai ukuran benda yang sudah dikenal, seperti lebar kuku jari."], ["Panjang kira-kira", "Dengan acuan, kita mendapat perkiraan panjang benda."]),
  kt("Cara pintar: Pita Penggaris", ["Benda terlalu panjang?", "Bagaimana mengukur benda yang tidak muat di penggaris?"], ["Pita Penggaris", "Pita bergaris dengan angka nol di ujung, ditempel di ujung benda."], ["Mulai pasti dari nol", "Dengan pita, tidak mungkin salah mulai."]),
];

export const TEMA_KARTU_UKUR: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F4CF}", judul: "Papan nama kandang", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): penggaris di tengah, satu gambar per kartu. */
export const RINGKASAN_UKUR: RingkasanPeta = {
  pusat: "\u{1F4CF}",
  ikon: ["\u{270B}", "\u{1F522}", "\u{1F527}", "\u{1F3AF}", "\u{1F440}", "\u{1F4DD}", "\u{1F50D}", "\u{1F463}", "\u{1F380}"],
  suara: "Ini peta mengukur panjang dengan satuan baku. Gambar penggaris ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_UKUR =
  "Ini papan nama kandang. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_UKUR = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar ukuran (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_UKUR = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_UKUR: readonly BarisInfo[] = [
  bi("\u{1F4CF}", "Mengukur dengan penggaris", "Ujung di angka nol", "Panjang terbaca", "Mulai dari nol", [0, 1, 2]),
  bi("\u{1F527}", "Memilih alat ukur", "Pendek atau panjang", "Penggaris atau meteran", "Sesuai panjang benda", []),
  bi("\u{1F4DD}", "Menulis hasil ukur", "Angka dan satuan", "Ukuran lengkap", "Bukan hanya angka", []),
  bi("\u{1F50D}", "Memeriksa hasil ukur", "Perkirakan dulu", "Salah baca ketahuan", "Periksa selalu", []),
  bi("\u{1F380}", "Mengukur benda panjang", "Tempel ujung pita", "Baca ujung lain", "Mulai pasti dari nol", []),
];
export const TEMA_INFO_UKUR: TemaInfo = { bingkai: "#166534", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F4CB}", judul: "Daftar ukuran" };
export const SUARA_INFO_UKUR = "Ini daftar ukuran. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_UKUR = "Daftar ukuran lengkap! Mulai dari nol, pilih alat yang tepat, dan tulis dengan satuan.";
