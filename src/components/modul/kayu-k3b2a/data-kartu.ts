/**
 * Mind-map Kelas 3 Bab 2 Sub-Bab A (Kalimat Matematika Penjumlahan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Bagan Batang, Menghitung Maju, Timbangan Seimbang).
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

export const KARTU_KAYU: readonly KartuPeta[] = [
  kt("Titik-titik", ["Ada yang belum diketahui?", "Ada bilangan yang belum diketahui dalam sebuah cerita penjumlahan."], ["Pakai titik-titik", "Bilangan yang belum diketahui ditulis dengan titik-titik."], ["Kalimat Matematika", "Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika."], ["masalah"]),
  kt("Depan atau tengah", ["Titik-titik di mana?", "Titik-titik bisa berada di depan atau di tengah kalimat."], ["Depan atau tengah", "Titik-titik di depan atau titik-titik di tengah, kalimatnya tetap penjumlahan."], ["Sama saja caranya", "Letak titik-titik tidak mengubah cara mencari bilangannya."]),
  kt("Kurangi jumlah", ["Bagaimana mencarinya?", "Bagaimana mencari bilangan yang belum diketahui?"], ["Jumlah dikurangi bagian", "Kurangi jumlah semuanya dengan bagian yang diketahui."], ["Bilangan ditemukan", "Hasil pengurangan adalah bilangan yang belum diketahui."]),
  kt("Jangan dijumlahkan", ["Dijumlahkan saja?", "Apakah kedua bilangan pada kalimat cukup dijumlahkan?"], ["Ingat jumlah semuanya", "Bilangan setelah tanda sama dengan adalah jumlah semuanya, bukan bagian."], ["Dikurangi, bukan dijumlah", "Mencari bagian yang belum diketahui dilakukan dengan mengurangkan."]),
  kt("Periksa hasilnya", ["Sudah benar?", "Bagaimana tahu bilangan yang ditemukan sudah benar?"], ["Jumlahkan lagi", "Periksa dengan menjumlahkan bagian yang diketahui dan bilangan yang ditemukan."], ["Hasil cocok", "Hasilnya sama dengan jumlah semuanya, jadi jawabannya benar."]),
  kt("Banyak kemungkinan", ["Hanya jumlah diketahui?", "Bagaimana bila hanya jumlah semuanya yang diketahui?"], ["Banyak pasangan", "Ada banyak pasangan bilangan yang jumlahnya sama."], ["Jawaban tidak tunggal", "Jawabannya tidak hanya satu, ada banyak kemungkinan."]),
  kt("Cara pintar: Bagan Batang", ["Ingin melihat bagiannya?", "Bagaimana melihat jumlah dan bagian sebagai gambar?"], ["Bagan Batang", "Batang atas adalah jumlah semuanya, dua batang di bawahnya adalah bagian-bagiannya."], ["Jumlah dan bagian jelas", "Bagian yang belum diketahui terlihat seperti potongan."]),
  kt("Cara pintar: Menghitung Maju", ["Ingin melompat saja?", "Bagaimana mencari bilangan dengan melompat di garis?"], ["Menghitung Maju", "Mulai dari bilangan yang diketahui, lalu melompat maju sampai jumlah semuanya."], ["Lompatan dihitung", "Banyaknya lompatan adalah bilangan yang belum diketahui."]),
  kt("Cara pintar: Timbangan Seimbang", ["Ingin melihat sama besar?", "Bagaimana melihat arti tanda sama dengan?"], ["Timbangan Seimbang", "Kedua sisi timbangan harus sama, jadi titik-titik diisi bilangan yang pas."], ["Tanda sama dengan jelas", "Kedua sisi seimbang berarti jumlahnya sama."]),
];

export const TEMA_KARTU_KAYU: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F525}", judul: "Keranjang kayu", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): api unggun di tengah, satu gambar per kartu. */
export const RINGKASAN_KAYU: RingkasanPeta = {
  pusat: "\u{1F525}",
  ikon: ["\u{1F4DD}", "\u{1F500}", "\u{2796}", "\u{1F6AB}", "\u{2705}", "\u{1F4AD}", "\u{1F4CA}", "\u{1F463}", "\u{2696}"],
  suara: "Ini peta kalimat Matematika penjumlahan. Gambar api unggun ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KAYU =
  "Ini keranjang kayu. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KAYU = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan kayu (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_KAYU = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_KAYU: readonly BarisInfo[] = [
  bi("\u{1F4DD}", "Cerita dengan titik-titik", "Pakai titik-titik", "Kalimat Matematika", "Belum diketahui", [0, 1, 2]),
  bi("\u{2796}", "Mencari yang belum diketahui", "Jumlah dikurangi bagian", "Bilangan ditemukan", "Kurangi, bukan jumlahkan", []),
  bi("\u{1F4CA}", "Bagan batang", "Batang atas jumlah", "Bagian terlihat", "Atas jumlah, bawah bagian", []),
  bi("\u{2705}", "Memeriksa hasil", "Jumlahkan lagi", "Hasil cocok", "Periksa selalu", []),
  bi("\u{1F500}", "Banyak kemungkinan", "Hanya jumlah diketahui", "Banyak pasangan", "Bukan satu jawaban", []),
];
export const TEMA_INFO_KAYU: TemaInfo = { bingkai: "#166534", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F4CC}", judul: "Papan kayu" };
export const SUARA_INFO_KAYU = "Ini papan kayu. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KAYU = "Papan kayu lengkap! Titik-titik, kurangi jumlah, dan periksa dengan menjumlahkan.";
