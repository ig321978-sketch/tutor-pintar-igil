/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab B (Waktu) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia.
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 */
import type { KartuPeta, RingkasanPeta, TemaPeta } from "../peta-kartu/PetaKartu";

const kt = (judul: string, masalah: [string, string], cara: [string, string], hasil: [string, string], contoh: KartuPeta["contoh"] = []): KartuPeta => ({
  judul,
  masalah: { label: masalah[0], arti: masalah[1] },
  cara: { label: cara[0], arti: cara[1] },
  hasil: { label: hasil[0], arti: hasil[1] },
  contoh,
});

export const KARTU_JADWAL: readonly KartuPeta[] = [
  kt("Membaca jam", ["Pukul berapa sekarang?", "Kita ingin tahu sekarang pukul berapa."], ["Jarum pendek, lalu panjang", "Jarum pendek menunjukkan jam, jarum panjang menunjukkan menit."], ["Pukul diketahui", "Sekarang kita tahu pukul berapa."], ["masalah"]),
  kt("Pukul tepat", ["Kapan disebut pukul tepat?", "Kapan waktu disebut pukul tepat?"], ["Jarum panjang di angka dua belas", "Lihat jarum panjang. Bila di angka dua belas, waktunya pukul tepat."], ["Jarum pendek menunjuk jam", "Jarum pendek menunjukkan jam yang disebut."], ["cara"]),
  kt("Jam digital", ["Jam ditulis dengan angka?", "Bagaimana menulis jam dengan angka?"], ["Jam digital", "Jam digital menunjukkan waktu dengan angka, bukan jarum."], ["Dua angka jam, dua angka menit", "Dua angka pertama jam, dua angka sesudah titik menit."]),
  kt("Dua puluh empat jam", ["Pukul empat sore ditulis apa?", "Bagaimana menulis pukul empat sore di jam digital?"], ["Pakai dua puluh empat jam", "Jam digital sering memakai dua puluh empat jam."], ["Enam belas titik nol nol", "Pukul empat sore ditulis enam belas titik nol nol."]),
  kt("Bagian hari", ["Pukul enam, pagi atau sore?", "Pukul enam bisa pagi, bisa juga sore."], ["Sebut bagian harinya", "Tambahkan kata pagi, siang, sore, atau malam."], ["Pagi, siang, sore, malam", "Satu hari terdiri dari empat bagian."]),
  kt("Cara pintar: Garis Waktu Hari", ["Kegiatan mana lebih dulu?", "Bagaimana mengurutkan kegiatan dalam satu hari?"], ["Garis Waktu Hari", "Taruh tiap kegiatan di tempat jamnya pada garis."], ["Yang lebih awal di depan", "Kegiatan yang lebih awal ada di sebelah kiri."]),
  kt("Lebih lama atau lebih sebentar", ["Mana yang lebih lama?", "Dua kegiatan, mana yang memerlukan waktu lebih lama?"], ["Bandingkan lamanya", "Bandingkan berapa lama tiap kegiatan."], ["Lebih lama atau lebih sebentar", "Kegiatan yang satu lebih lama, yang lain lebih sebentar."]),
  kt("Cara pintar: Jalur Jam", ["Berapa jam kegiatannya?", "Berapa jam sebuah kegiatan berlangsung?"], ["Jalur Jam", "Satu kotak satu jam, dari jam mulai sampai jam selesai."], ["Hitung kotak jam", "Banyaknya kotak adalah lama kegiatan dalam jam."]),
  kt("Cara pintar: Batang Lama Kegiatan", ["Banyak kegiatan, mana lama?", "Bagaimana membandingkan lama banyak kegiatan sekaligus?"], ["Batang Lama Kegiatan", "Satu batang untuk satu kegiatan, satu kotak satu jam."], ["Batang panjang paling lama", "Batang yang lebih panjang adalah kegiatan yang lebih lama."]),
];

export const TEMA_KARTU_JADWAL: TemaPeta = { bingkai: "#DC2626", ikon: "\u{1F3C1}", judul: "Lintasan lari", latar: "#FEE2E2", garisLatar: "#F87171" };
/** Peta radial awal (tanpa kata): jam di tengah, satu gambar per kartu. */
export const RINGKASAN_JADWAL: RingkasanPeta = {
  pusat: "⏰",
  ikon: ["\u{1F550}", "\u{1F55B}", "\u{1F522}", "\u{1F4DF}", "\u{1F305}", "\u{1F6A9}", "⏳", "\u{1F3C1}", "\u{1F4CA}"],
  suara: "Ini peta waktu. Jam ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_JADWAL =
  "Ini lintasan lari. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_JADWAL = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";
