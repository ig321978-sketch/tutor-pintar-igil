/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab F (Pengurangan Bersusun sampai Seribu) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Susun dan Pinjam, Hitung Maju, Periksa dengan Tambah).
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

export const KARTU_SISA: readonly KartuPeta[] = [
  kt("Pengurangan", ["Berapa yang tersisa?", "Bagaimana mengetahui banyaknya yang tersisa setelah sebagian berkurang?"], ["Dikurangkan", "Bilangan yang berkurang dikurangkan dari bilangan awal."], ["Sisa didapat", "Hasil pengurangan menunjukkan banyaknya yang tersisa."], ["masalah"]),
  kt("Susun ke bawah", ["Angkanya bertumpuk?", "Bagaimana menulis dua bilangan supaya mudah dikurangkan?"], ["Tulis ke bawah", "Tulis bilangan yang sama tempat angkanya pada kolom yang sama, lalu beri garis."], ["Kolom rapi", "Satuan, puluhan, dan ratusan berada lurus ke bawah."]),
  kt("Dari satuan", ["Mulai dari mana?", "Tempat angka mana yang dikurangkan lebih dulu?"], ["Mulai dari satuan", "Kurangkan satuan, lalu puluhan, lalu ratusan."], ["Ke arah kiri", "Pengurangan bergerak dari kanan ke kiri."]),
  kt("Mengambil", ["Angka atas lebih kecil?", "Bagaimana mengurangkan kalau angka di atas lebih kecil?"], ["Ambil dari kiri", "Ambil satu dari tempat di kirinya, lalu coret angkanya."], ["Satu jadi sepuluh", "Satu yang diambil menjadi sepuluh di tempat kanan."]),
  kt("Mengambil dua kali", ["Dua tempat kurang?", "Bagaimana kalau dua tempat sama-sama kurang?"], ["Ambil dua kali", "Ambil dari kiri setiap kali ada angka atas yang lebih kecil."], ["Semua kolom cukup", "Setelah mengambil, tiap tempat bisa dikurangkan."]),
  kt("Membalik angka", ["Angka dibalik?", "Mengapa angka tidak boleh dibalik di tiap tempat?"], ["Jangan dibalik", "Angka atas tetap di atas, dan kekurangan ditutup dengan mengambil."], ["Hasil tepat", "Hasil pengurangan tidak meleset."]),
  kt("Cara pintar: Susun dan Pinjam", ["Hitungannya panjang?", "Bagaimana mengurangkan bilangan besar dengan rapi?"], ["Susun dan Pinjam", "Tulis ke bawah, kurangkan dari satuan, dan ambil dari kiri bila perlu."], ["Langkah jelas", "Tiap langkah mudah diperiksa."]),
  kt("Cara pintar: Hitung Maju", ["Dua bilangan berdekatan?", "Bagaimana mencari selisih dua bilangan yang berdekatan?"], ["Hitung Maju", "Mulai dari bilangan kecil, lompat ke puluhan bulat dan ratusan bulat, lalu ke bilangan besar."], ["Jumlah lompatan", "Jumlah semua lompatan sama dengan selisih."]),
  kt("Cara pintar: Periksa dengan Tambah", ["Yakin hasilnya benar?", "Bagaimana memastikan hasil pengurangan tidak keliru?"], ["Periksa dengan Tambah", "Tambahkan hasil dengan bilangan yang dikurangkan."], ["Harus sama", "Hasilnya harus sama dengan bilangan awal, kalau tidak hitung ulang."]),
];

export const TEMA_KARTU_SISA: TemaPeta = { bingkai: "#0F766E", ikon: "\u{2693}", judul: "Papan Sisa", latar: "#CCFBF1", garisLatar: "#0F766E" };
/** Peta radial awal (tanpa kata): jangkar di tengah, satu gambar per kartu. */
export const RINGKASAN_SISA: RingkasanPeta = {
  pusat: "\u{2693}",
  ikon: ["\u{2796}", "\u{1F4DD}", "\u{27A1}", "\u{1F4E5}", "\u{270C}", "\u{1F500}", "\u{1F9F0}", "\u{1F4CF}", "\u{2705}"],
  suara: "Ini peta pengurangan bersusun. Gambar jangkar ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_SISA =
  "Ini papan sisa. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_SISA = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar sisa (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_SISA = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_SISA: readonly BarisInfo[] = [
  bi("\u{1F4DD}", "Menyusun ke bawah", "Tulis sejajar", "Kolom rapi", "Garis di bawahnya", [0, 1, 2]),
  bi("\u{1F4E5}", "Mengambil dari kiri", "Coret lalu tulis baru", "Satu jadi sepuluh", "Angka atas cukup", []),
  bi("\u{1F500}", "Salah membalik angka", "Angka dibalik", "Hasil meleset", "Jangan dibalik", []),
  bi("\u{27A1}", "Hitung maju", "Lompat bertahap", "Jumlah lompatan", "Selisih dekat", []),
  bi("\u{2705}", "Memeriksa hasil", "Tambahkan kembali", "Sama dengan awal", "Salah langsung ketahuan", []),
];
export const TEMA_INFO_SISA: TemaInfo = { bingkai: "#115E59", latar: "#F0FDFA", aksen: "#0F766E", teduh: "#CCFBF1", ikon: "\u{1F4CB}", judul: "Daftar sisa" };
export const SUARA_INFO_SISA = "Ini daftar sisa. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_SISA = "Daftar sisa lengkap! Susun, ambil, hitung maju, dan periksa.";
