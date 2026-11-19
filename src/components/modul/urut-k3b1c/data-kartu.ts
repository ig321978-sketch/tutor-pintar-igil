/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia
 * (Banding per Tempat, Garis Bilangan Ratusan, Mengurutkan). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis memakai data Story (Gudang Utara 465, Selatan 456, Timur 546).
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

export const KARTU_URUT: readonly KartuPeta[] = [
  kt("Membandingkan dua bilangan", ["Mana yang lebih besar?", "Kita ingin tahu bilangan mana yang lebih besar atau lebih kecil."], ["Mulai dari ratusan", "Bilangan tiga angka dibandingkan mulai dari tempat ratusan."], ["Ratusan besar, bilangan besar", "Kalau ratusannya berbeda, bilangan dengan ratusan lebih besar yang lebih besar."], ["masalah"]),
  kt("Ratusan sama", ["Ratusan sama besar", "Kadang kedua bilangan punya angka ratusan yang sama."], ["Lihat puluhan", "Kalau ratusan sama, kita pindah ke tempat puluhan."], ["Puluhan menentukan", "Angka puluhan yang lebih besar berarti bilangan yang lebih besar."]),
  kt("Puluhan sama", ["Puluhan juga sama", "Kadang ratusan dan puluhan sama-sama sama."], ["Lihat satuan", "Kalau ratusan dan puluhan sama, barulah lihat satuan."], ["Satuan menentukan", "Angka satuan yang lebih besar berarti bilangan yang lebih besar."]),
  kt("Cara pintar: Banding per Tempat", ["Bilangan yang mirip", "Dua bilangan yang mirip sulit dibedakan sekilas."], ["Banding per Tempat", "Bandingkan angka pada tempat yang sama, mulai dari ratusan."], ["Tempat pertama beda menentukan", "Tempat pertama yang berbeda menentukan bilangan mana yang lebih besar."]),
  kt("Tanda perbandingan", ["Menulis hasil banding", "Kita ingin menulis hasil membandingkan dengan tanda."], ["Mulut ke yang besar", "Tanda seperti mulut yang terbuka ke bilangan yang lebih besar."], ["Lebih, kurang, sama", "Ada tiga tanda: lebih besar, lebih kecil, dan sama dengan."]),
  kt("Bilangan yang sama", ["Semua tempat sama", "Kadang ratusan, puluhan, dan satuan semuanya sama."], ["Pakai tanda sama dengan", "Dua bilangan yang persis sama memakai tanda sama dengan."], ["Sama besar", "Kedua bilangan itu sama besar, tidak ada yang lebih."]),
  kt("Cara pintar: Garis Bilangan Ratusan", ["Ingin melihat jarak", "Kita ingin tahu siapa lebih besar dan seberapa jauh jaraknya."], ["Garis Bilangan Ratusan", "Bilangan diletakkan pada garis dengan loncatan seratus."], ["Kanan makin besar", "Makin ke kanan makin besar, makin ke kiri makin kecil."]),
  kt("Cara pintar: Mengurutkan", ["Banyak bilangan sekaligus", "Kadang ada banyak bilangan yang harus berderet rapi."], ["Mengurutkan", "Cari yang paling kecil, taruh di depan, lalu ulangi."], ["Berderet rapi", "Semua bilangan berderet dari yang kecil sampai yang besar."]),
  kt("Naik dan turun", ["Urutan dibalik", "Kadang kita ingin urutan dari yang terbesar."], ["Balik urutannya", "Urutan dari terbesar adalah kebalikan urutan dari terkecil."], ["Urutan naik atau turun", "Urutan naik dari terkecil, urutan turun dari terbesar."]),
];

export const TEMA_KARTU_URUT: TemaPeta = { bingkai: "#B45309", ikon: "\u{1F69A}", judul: "Bak truk membandingkan bilangan", latar: "#FFFBEB", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): timbangan di tengah, satu gambar per kartu. */
export const RINGKASAN_URUT: RingkasanPeta = {
  pusat: "\u{2696}",
  ikon: ["\u{1F4AF}", "\u{1F51F}", "\u{1F3AF}", "\u{1F9E9}", "\u{1F40A}", "\u{1F91D}", "\u{1F4CF}", "\u{1F4F6}", "\u{1F501}"],
  suara: "Ini peta bak truk. Timbangan ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_URUT =
  "Ini bak truk membandingkan bilangan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_URUT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan urut (lima perbandingan dari Story) ------------------------------ */
export const KOLOM_INFO_URUT = ["Bilangan", "Tempat", "Hasil"] as const;
const bi = (ikon: string, nama: string, bilangan: [string, string], tempat: string, hasil: string, contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [{ t: bilangan[0], s: bilangan[1] }, { t: tempat }, { t: hasil }],
  contoh,
});
export const BARIS_INFO_URUT: readonly BarisInfo[] = [
  bi("\u{1F4AF}", "Timur dan Utara", ["546, 465", "lima ratus empat puluh enam dan empat ratus enam puluh lima"], "Ratusan", "Timur lebih besar", [0, 1, 2]),
  bi("\u{1F51F}", "Utara dan Selatan", ["465, 456", "empat ratus enam puluh lima dan empat ratus lima puluh enam"], "Puluhan", "Utara lebih besar", []),
  bi("\u{1F91D}", "Dua kartu sama", ["300, 300", "tiga ratus dan tiga ratus"], "Tidak ada", "Sama dengan", []),
  bi("\u{1F4F6}", "Tiga gudang", ["456, 465, 546", "empat ratus lima puluh enam, empat ratus enam puluh lima, dan lima ratus empat puluh enam"], "Ratusan, puluhan", "Urutan naik", []),
  bi("\u{1F4CF}", "Garis bilangan", ["400, 500", "empat ratus dan lima ratus"], "Titik di antara", "Kanan makin besar", []),
];
export const TEMA_INFO_URUT: TemaInfo = { bingkai: "#92400E", latar: "#FFFBEB", aksen: "#B45309", teduh: "#FEF3C7", ikon: "\u{1F69A}", judul: "Papan Urut Gudang" };
export const SUARA_INFO_URUT =
  "Ini papan urut gudang. Ada lima kartu, satu kartu satu perbandingan. Isi bilangannya, tempat yang menentukan, dan hasilnya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_URUT = "Papan urut lengkap! Bilangan, tempat yang menentukan, dan hasil berjalan bersama supaya perbandingan mudah dibaca.";
