/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab A (Pecahan Berpembilang Satu) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Pita Pecahan, Lipat Kertas, Garis Pecahan).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Ikon peta memakai benda kain dan batik (benang, gunting, penggaris, bunga). Infografis: satu tabel lima baris dari kejadian Story.
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

export const KARTU_LIPAT: readonly KartuPeta[] = [
  kt("Bagian sama besar", ["Dibagi adil?", "Bagaimana membagi kain supaya adil?"], ["Bagi sama besar", "Semua bagian harus sama besar."], ["Bagian adil", "Tiap bagian sama besar."], ["masalah"]),
  kt("Satu bagian", ["Ditulis apa?", "Bagaimana menulis satu bagian dari kain?"], ["Satu per sekian", "Tulis satu bagian dari seluruh bagian sama besar."], ["Pecahan terbentuk", "Satu bagian menjadi sebuah pecahan."]),
  kt("Pembilang dan penyebut", ["Angka atas bawah?", "Apa nama angka atas dan angka bawah?"], ["Beri nama", "Angka atas disebut pembilang, angka bawah disebut penyebut."], ["Nama dikenal", "Pembilang menunjukkan bagian yang diambil, penyebut menunjukkan seluruh bagian."]),
  kt("Membaca pecahan", ["Bacanya apa?", "Bagaimana membaca sebuah pecahan?"], ["Sebut per", "Sebut pembilang, kata per, lalu penyebut."], ["Terbaca benar", "Pecahan terbaca dengan jelas."]),
  kt("Banding pecahan", ["Mana lebih besar?", "Bagaimana tahu pecahan mana yang lebih besar?"], ["Lihat bagiannya", "Bandingkan besar tiap bagian dari seluruh yang sama."], ["Terbanding", "Pecahan yang lebih besar ketahuan."]),
  kt("Makin banyak, makin kecil", ["Penyebut besar?", "Apa arti penyebut yang lebih besar?"], ["Bagian bertambah", "Penyebut lebih besar berarti bagian lebih banyak."], ["Bagian mengecil", "Bagian lebih banyak membuat tiap bagian lebih kecil."]),
  kt("Cara pintar: Pita Pecahan", ["Sulit dilihat?", "Bagaimana melihat langsung pecahan mana yang lebih panjang?"], ["Pita Pecahan", "Tumpuk pita yang dibagi menjadi bagian sama besar."], ["Terlihat jelas", "Panjang tiap bagian terlihat langsung."]),
  kt("Cara pintar: Lipat Kertas", ["Yakin sama besar?", "Bagaimana yakin semua bagian sama besar?"], ["Lipat Kertas", "Lipat kertas sesuai penyebut."], ["Bagian pasti sama", "Lipatan menjamin semua bagian sama besar."]),
  kt("Cara pintar: Garis Pecahan", ["Banyak pecahan?", "Bagaimana mengurutkan banyak pecahan sekaligus?"], ["Garis Pecahan", "Letakkan pecahan pada garis dari nol sampai satu."], ["Urutan terlihat", "Makin ke kiri makin kecil pecahannya."]),
];

export const TEMA_KARTU_LIPAT: TemaPeta = { bingkai: "#5B21B6", ikon: "\u{1F9F5}", judul: "Meja lipat", latar: "#F5F3FF", garisLatar: "#7C3AED" };
/** Peta radial awal (tanpa kata): benang di tengah, satu gambar per kartu (benda kain, batik, dan alat sanggar). */
export const RINGKASAN_LIPAT: RingkasanPeta = {
  pusat: "\u{1F9F5}",
  ikon: ["✂", "🧵", "👚", "🧶", "👗", "🧣", "🎀", "👘", "📏"],
  suara: "Ini peta pecahan berpembilang satu. Gambar benang ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_LIPAT =
  "Ini kartu meja lipat. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_LIPAT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar lipat (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_LIPAT = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: { t: string; s?: string }, b: { t: string; s?: string }, c: { t: string; s?: string }, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [a, b, c], contoh });
export const BARIS_INFO_LIPAT: readonly BarisInfo[] = [
  bi("✂", "Melipat kain", { t: "Lipat sama besar" }, { t: "Bagian sama besar" }, { t: "Siap diarsir" }, [0, 1, 2]),
  bi("\u{1F9F5}", "Menulis pecahan", { t: "Satu bagian" }, { t: "1/4", s: "satu per empat" }, { t: "Pembilang satu" }, []),
  bi("\u{1F4CF}", "Banding", { t: "Tumpuk pita" }, { t: "Panjang terlihat" }, { t: "Bagian makin kecil" }, []),
  bi("\u{1F9F7}", "Garis pecahan", { t: "Jepit pada garis" }, { t: "Terurut kiri kanan" }, { t: "Kiri lebih kecil" }, []),
  bi("\u{1F338}", "Mengurutkan", { t: "Susun potongan" }, { t: "Terkecil lebih dulu" }, { t: "Urutan benar" }, []),
];
export const TEMA_INFO_LIPAT: TemaInfo = { bingkai: "#6D28D9", latar: "#F5F3FF", aksen: "#7C3AED", teduh: "#EDE9FE", ikon: "\u{1F4CB}", judul: "Daftar lipat" };
export const SUARA_INFO_LIPAT = "Ini daftar lipat. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_LIPAT = "Daftar lipat lengkap! Bagi, bandingkan, dan urutkan.";
