/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab E (Penjumlahan Bilangan sampai 1.000) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Susun ke Bawah, Tambah Per Tempat, Genapkan Dulu).
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

export const KARTU_RESEPSI: readonly KartuPeta[] = [
  kt("Menggabung", ["Berapa semuanya?", "Berapa banyak semuanya bila dua banyak digabung?"], ["Dijumlahkan", "Dua bilangan digabung dengan penjumlahan."], ["Jumlah didapat", "Hasil penggabungan disebut jumlah."], ["masalah"]),
  kt("Bersusun", ["Bilangannya besar?", "Bagaimana menjumlahkan bilangan yang besar dengan rapi?"], ["Ditulis ke bawah", "Satuan di bawah satuan, puluhan di bawah puluhan, ratusan di bawah ratusan."], ["Rapi dan jelas", "Tiap tempat jelas letaknya, jadi tidak tertukar."]),
  kt("Dari kanan", ["Mulai dari mana?", "Mulai menjumlahkan dari tempat yang mana?"], ["Dari satuan", "Mulai dari satuan, lalu puluhan, lalu ratusan."], ["Urut dari kanan", "Ketiga tempat dijumlahkan satu per satu dari kanan ke kiri."]),
  kt("Menyimpan", ["Hasilnya sepuluh lebih?", "Bagaimana bila jumlah satu tempat sepuluh atau lebih?"], ["Tulis sisa, simpan satu", "Tulis sisa angkanya, lalu pindahkan satu ke tempat di kirinya."], ["Sepuluh jadi satu", "Sepuluh satuan menjadi satu puluhan, dan sepuluh puluhan menjadi satu ratusan."]),
  kt("Simpanan", ["Ada yang terlupa?", "Bagaimana agar simpanan tidak terlupa?"], ["Simpanan ikut", "Simpanan ditambahkan pada tempat di kirinya."], ["Hasil lebih besar", "Tanpa simpanan hasilnya terlalu kecil, dengan simpanan hasilnya tepat."]),
  kt("Memeriksa", ["Yakin hasilnya benar?", "Bagaimana memastikan hasil penjumlahan tidak keliru?"], ["Dibulatkan", "Bulatkan satu bilangan, jumlahkan, lalu sesuaikan."], ["Hasil sama", "Hasil pembulatan harus sama dengan hasil penjumlahan bersusun."]),
  kt("Cara pintar: Susun ke Bawah", ["Rapi dan bisa diperiksa?", "Bagaimana menjumlahkan bilangan besar dengan langkah yang rapi?"], ["Susun ke Bawah", "Tulis bilangan ke bawah, jumlahkan dari kanan, dan simpan bila perlu."], ["Langkah rapi", "Setiap langkah bisa diperiksa satu per satu."]),
  kt("Cara pintar: Tambah Per Tempat", ["Isi tiap tempat jelas?", "Bagaimana melihat isi tiap tempat dengan jelas?"], ["Tambah Per Tempat", "Jumlahkan ratusan, puluhan, dan satuan sendiri-sendiri."], ["Digabung", "Semua hasil sementara dijumlahkan menjadi hasil akhir."]),
  kt("Cara pintar: Genapkan Dulu", ["Bilangannya hampir bulat?", "Bagaimana menjumlahkan bilangan yang hampir bulat dengan cepat?"], ["Genapkan Dulu", "Bulatkan satu bilangan, jumlahkan, lalu sesuaikan dengan kelebihannya."], ["Cepat dan tepat", "Hasil cepat didapat dalam kepala dan tetap tepat."]),
];

export const TEMA_KARTU_RESEPSI: TemaPeta = { bingkai: "#166534", ikon: "\u{1F6CE}", judul: "Meja resepsi", latar: "#DCFCE7", garisLatar: "#15803D" };
/** Peta radial awal (tanpa kata): lonceng resepsi di tengah, satu gambar per kartu. */
export const RINGKASAN_RESEPSI: RingkasanPeta = {
  pusat: "\u{1F6CE}",
  ikon: ["\u{2795}", "\u{1F4DD}", "\u{27A1}", "\u{1F4E6}", "\u{1F9F3}", "\u{1F50D}", "\u{1F522}", "\u{1F9E9}", "\u{1F501}"],
  suara: "Ini peta menjumlahkan bilangan sampai seribu. Gambar lonceng ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_RESEPSI =
  "Ini peta meja resepsi. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_RESEPSI = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar resepsi (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_RESEPSI = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_RESEPSI: readonly BarisInfo[] = [
  bi("\u{1F4DD}", "Menulis bersusun", "Tulis ke bawah", "Tempat segaris", "Satuan di bawah satuan", [0, 1, 2]),
  bi("\u{27A1}", "Menjumlahkan", "Mulai dari kanan", "Satuan dulu", "Urut tiap tempat", []),
  bi("\u{1F4E6}", "Menyimpan", "Tulis sisa", "Simpan satu", "Sepuluh jadi satu", []),
  bi("\u{1F9E9}", "Tiga bilangan", "Dua dulu", "Lalu tambah lagi", "Satu hasil akhir", []),
  bi("\u{1F501}", "Memeriksa", "Bulatkan dulu", "Hasil disesuaikan", "Salah langsung ketahuan", []),
];
export const TEMA_INFO_RESEPSI: TemaInfo = { bingkai: "#14532D", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F4CB}", judul: "Daftar resepsi" };
export const SUARA_INFO_RESEPSI = "Ini daftar resepsi. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_RESEPSI = "Daftar resepsi lengkap! Susun, simpan, dan periksa.";
