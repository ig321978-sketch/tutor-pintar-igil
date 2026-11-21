/**
 * Mind-map K4 Bab 2 Sub-Bab B (Membandingkan dan Mengurutkan Pecahan Berpenyebut Sama) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Banding Pembilang, Batang Pecahan, Urut di Garis).
 * Label tanpa digit, tiap kata paling banyak dua belas huruf (muat di layar sempit); arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris dari kejadian Story.
 * Ikon peta radial hanya benda bertema pewarna dan kain batik.
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

export const KARTU_WARNA: readonly KartuPeta[] = [
  kt("Penyebut sama", ["Mana lebih banyak?", "Bagaimana membandingkan dua pecahan yang penyebutnya sama?"], ["Bagian sama besar", "Penyebut yang sama berarti semua bagian sama besar."], ["Lihat pembilang", "Yang berbeda hanya banyaknya bagian, yaitu pembilang."], ["masalah"]),
  kt("Pembilang", ["Apa arti pembilang?", "Apa yang ditunjukkan angka di atas garis pecahan?"], ["Bagian diambil", "Pembilang menunjukkan banyak bagian yang diambil."], ["Makin banyak makin besar", "Pembilang yang lebih besar berarti pecahan yang lebih besar."]),
  kt("Penyebut", ["Apa arti penyebut?", "Apa yang ditunjukkan angka di bawah garis pecahan?"], ["Bagian seluruhnya", "Penyebut menunjukkan banyak bagian seluruhnya."], ["Ukuran bagian", "Penyebut memberi tahu ukuran tiap bagian."]),
  kt("Lebih besar", ["Bagaimana menulisnya?", "Bagaimana menulis pecahan yang lebih besar dari pecahan lain?"], ["Tanda lebih dari", "Pakai tanda lebih dari di antara kedua pecahan."], ["Mulut ke besar", "Mulut tanda selalu menghadap pecahan yang lebih besar."]),
  kt("Lebih kecil dan sama", ["Kalau lebih kecil?", "Bagaimana menulis pecahan yang lebih kecil, atau yang sama besar?"], ["Kurang dari, sama dengan", "Tanda kurang dari untuk yang lebih kecil, tanda sama dengan kalau pembilangnya sama."], ["Tiga tanda", "Ada tiga tanda: kurang dari, lebih dari, dan sama dengan."]),
  kt("Mengurutkan", ["Banyak pecahan?", "Bagaimana mengurutkan beberapa pecahan berpenyebut sama?"], ["Urut pembilang", "Urutkan pembilangnya, karena penyebutnya sama."], ["Naik atau turun", "Dari terkecil ke terbesar disebut naik, dari terbesar ke terkecil disebut turun."]),
  kt("Cara pintar: Banding Pembilang", ["Cara cepat?", "Bagaimana membandingkan dua pecahan dengan cepat?"], ["Banding Pembilang", "Lihat pembilang kedua pecahan saja, karena penyebutnya sama."], ["Cepat dan tepat", "Cocok untuk dua pecahan, tanpa menghitung hal lain."]),
  kt("Cara pintar: Batang Pecahan", ["Mau lihat bentuknya?", "Bagaimana menunjukkan pecahan kepada orang lain dengan jelas?"], ["Batang Pecahan", "Gambar batang sama panjang, lalu warnai sebanyak pembilang."], ["Warna lebih panjang", "Batang dengan warna lebih panjang menunjukkan pecahan yang lebih besar."]),
  kt("Cara pintar: Urut di Garis", ["Pecahan banyak sekali?", "Bagaimana mengurutkan banyak pecahan sekaligus?"], ["Urut di Garis", "Taruh pecahan pada garis dari nol sampai satu."], ["Kanan lebih besar", "Pecahan yang lebih ke kanan selalu lebih besar."]),
];

export const TEMA_KARTU_WARNA: TemaPeta = { bingkai: "#7C2D12", ikon: "\u{1F3A8}", judul: "Bak Warna", latar: "#FFF7ED", garisLatar: "#C2410C" };
/** Peta radial awal (tanpa kata): palet di tengah, satu gambar bertema pewarna dan kain per kartu. */
export const RINGKASAN_WARNA: RingkasanPeta = {
  pusat: "\u{1F3A8}",
  ikon: ["\u{1F3FA}", "\u{1F4A7}", "\u{1F308}", "\u{1F455}", "\u{1F457}", "\u{1F458}", "\u{1F380}", "\u{1F454}", "\u{1F45A}"],
  suara: "Ini peta membandingkan dan mengurutkan pecahan berpenyebut sama. Gambar palet warna ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_WARNA =
  "Ini bak warna. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_WARNA = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar bak warna (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_WARNA = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_WARNA: readonly BarisInfo[] = [
  bi("\u{1F3FA}", "Penyebut sama", "Lihat penyebut", "Bagian sama besar", "Sama dulu", [0, 1, 2]),
  bi("\u{1F4A7}", "Banding pembilang", "Lihat pembilang", "Pembilang besar menang", "Cukup dua pecahan", []),
  bi("\u{1F308}", "Pilih tanda", "Tanda di tengah", "Kurang dari atau lebih dari", "Mulut ke yang besar", []),
  bi("\u{1F455}", "Batang pecahan", "Warnai bagian", "Batang lebih panjang", "Lihat tanpa hitung", []),
  bi("\u{1F458}", "Urut di garis", "Taruh pada garis", "Kanan lebih besar", "Kiri lebih kecil", []),
];
export const TEMA_INFO_WARNA: TemaInfo = { bingkai: "#9A3412", latar: "#FFF7ED", aksen: "#C2410C", teduh: "#FED7AA", ikon: "\u{1F3A8}", judul: "Daftar bak warna" };
export const SUARA_INFO_WARNA = "Ini daftar bak warna. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_WARNA = "Daftar bak warna lengkap! Lihat penyebut, banding pembilang, dan urutkan pecahan di garis.";
