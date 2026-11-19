/**
 * Mind-map Kelas 2 Bab 7 Sub-Bab B (Membandingkan dan Mengurutkan Bilangan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Tabel Seratus, Bilangan Patokan, Urut Kartu).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
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

export const KARTU_PAPAN: readonly KartuPeta[] = [
  kt("Garis bilangan", ["Mana yang lebih besar?", "Kita ingin tahu bilangan mana yang lebih besar."], ["Lihat garis bilangan", "Bilangan tersusun berurutan pada sebuah garis."], ["Kanan besar, kiri kecil", "Bilangan di kanan lebih besar, bilangan di kiri lebih kecil."], ["masalah"]),
  kt("Maju dan mundur", ["Bilangan setelah melompat?", "Setelah melompat beberapa langkah, bilangannya jadi berapa?"], ["Hitung langkahnya", "Awalnya tidak dihitung, langkah pertama menuju bilangan berikutnya."], ["Maju lebih, mundur kurang", "Maju berarti bertambah dan mundur berarti berkurang."]),
  kt("Teka-teki bilangan", ["Bilangan apakah aku?", "Teka-teki memberi petunjuk tentang sebuah bilangan."], ["Berpikir terbalik", "Mundur dulu dari petunjuk untuk mencari bilangan awal."], ["Periksa dengan maju", "Periksa jawabannya dengan melompat kembali."]),
  kt("Puluhan dulu", ["Dua bilangan, mana besar?", "Dua bilangan berbeda, mana yang lebih besar?"], ["Lihat puluhannya dulu", "Bandingkan angka puluhan kedua bilangan lebih dulu."], ["Puluhan banyak, lebih besar", "Puluhan yang lebih banyak membuat bilangan lebih besar."]),
  kt("Puluhan sama", ["Puluhannya sama, lalu?", "Kalau puluhannya sama, apa yang dilihat berikutnya?"], ["Lihat satuannya", "Bandingkan angka satuan kedua bilangan."], ["Satuan banyak, lebih besar", "Satuan yang lebih banyak membuat bilangan lebih besar."]),
  kt("Kata dan tanda", ["Bagaimana menuliskannya?", "Hasil perbandingan dituliskan dengan kata atau tanda."], ["Pilih kata atau tanda", "Pilih lebih besar dari, lebih kecil dari, atau sama dengan."], ["Mulut buaya ke yang besar", "Tanda perbandingan terbuka ke arah bilangan yang lebih besar."]),
  kt("Cara pintar: Tabel Seratus", ["Berapa jauh jaraknya?", "Kita ingin melihat jarak antara dua bilangan."], ["Tabel Seratus", "Bilangan satu sampai seratus tersusun dalam sepuluh baris."], ["Turun satu baris, tambah sepuluh", "Turun satu baris menambah sepuluh, geser satu kotak menambah satu."]),
  kt("Cara pintar: Bilangan Patokan", ["Mana yang besar, cepat?", "Kita ingin memilih yang lebih besar dengan cepat."], ["Bilangan Patokan", "Pilih bilangan yang mudah sebagai patokan, lalu bandingkan."], ["Lebih dari patokan, besar", "Lebih dari patokan berarti besar, kurang dari patokan berarti kecil."]),
  kt("Cara pintar: Urut Kartu", ["Bagaimana mengurutkan banyak?", "Bagaimana mengurutkan banyak bilangan sekaligus?"], ["Urut Kartu", "Tulis tiap bilangan pada kartu, lalu tukar sampai berurutan."], ["Kecil di kiri, besar di kanan", "Kartu paling kiri paling kecil, kartu paling kanan paling besar."]),
];

export const TEMA_KARTU_PAPAN: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F9F7}", judul: "Tali garis angka", latar: "#FEF3C7", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): papan pengumuman di tengah, satu gambar per kartu. */
export const RINGKASAN_PAPAN: RingkasanPeta = {
  pusat: "\u{1F4E2}",
  ikon: ["\u{1F41E}", "\u{23E9}", "\u{2753}", "\u{1F51F}", "\u{1F9EE}", "\u{1F40A}", "\u{1F522}", "\u{1F6A9}", "\u{1F0CF}"],
  suara: "Ini peta pengumuman. Papan pengumuman ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_PAPAN =
  "Ini tali garis angka. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_PAPAN = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: spanduk bersih (lima kartu pengumpul + poster) ------------------------------ */
export const KOLOM_INFO_PAPAN = ["Banyak botol", "Puluhan dan satuan", "Urutan terbanyak"] as const;
const bi = (ikon: string, nama: string, banyak: [string, string], ps: [string, string], urutan: string, contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [{ t: banyak[0], s: banyak[1] }, { t: ps[0], s: ps[1] }, { t: urutan }],
  contoh,
});
export const BARIS_INFO_PAPAN: readonly BarisInfo[] = [
  bi("\u{1F7E8}", "Tim Kuning", ["74", "tujuh puluh empat"], ["7 dan 4", "tujuh dan empat"], "Pertama", [0, 1, 2]),
  bi("\u{1F913}", "Dika", ["68", "enam puluh delapan"], ["6 dan 8", "enam dan delapan"], "Kedua", []),
  bi("\u{1F9E2}", "Nia", ["63", "enam puluh tiga"], ["6 dan 3", "enam dan tiga"], "Ketiga", []),
  bi("\u{1F7E9}", "Tim Hijau", ["58", "lima puluh delapan"], ["5 dan 8", "lima dan delapan"], "Keempat", []),
  bi("\u{1F7E6}", "Tim Biru", ["47", "empat puluh tujuh"], ["4 dan 7", "empat dan tujuh"], "Kelima", []),
];
export const TEMA_INFO_PAPAN: TemaInfo = { bingkai: "#16A34A", latar: "#F0FDF4", aksen: "#166534", teduh: "#DCFCE7", ikon: "\u{1F3C6}", judul: "Pengumuman Sekolah Bersih" };
export const SUARA_INFO_PAPAN =
  "Ini pengumuman Sekolah Bersih. Ada lima kartu, satu kartu satu pengumpul botol. Isi banyak botolnya, puluhan dan satuannya, dan urutan terbanyaknya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_PAPAN = "Pengumuman lengkap! Banyak botol, puluhan dan satuan, serta urutan terbanyak berjalan bersama supaya perbandingannya adil.";
