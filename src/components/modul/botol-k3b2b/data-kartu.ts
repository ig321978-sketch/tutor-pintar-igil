/**
 * Isi Mind-map (Pos Jaga) dan Infografis (Catatan Persediaan) Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Mind-map berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek. Hanya poin pelajaran (tanpa nama tokoh atau benda cerita).
 * Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Keluarga Fakta, Menghitung Naik, Garis Bilangan). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis: satu tabel lima baris dari kejadian Story. Data simulasi ada di data-sim.ts. Diuji: scripts/uji-botol-k3b2b.mjs.
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

export const KARTU_BOTOL: readonly KartuPeta[] = [
  kt(
    "Kalimat dengan titik-titik",
    ["Ada yang belum diketahui?", "Ada bilangan yang belum diketahui pada sebuah pengurangan."],
    ["Tulis titik-titik", "Bilangan yang belum diketahui ditandai dengan titik-titik."],
    ["Kalimat Matematika", "Kalimat pengurangan yang memuat titik-titik disebut kalimat Matematika."],
    ["masalah"],
  ),
  kt(
    "Mencari yang dikurangkan",
    ["Berapa yang diambil?", "Berapa banyak yang diambil, yaitu bilangan yang dikurangkan?"],
    ["Awal dikurangi sisa", "Bilangan yang dikurangkan dicari dengan bilangan awal dikurangi sisa."],
    ["Dikurangkan didapat", "Bilangan yang dikurangkan sudah ketemu."],
  ),
  kt(
    "Mencari bilangan awal",
    ["Berapa mula-mula?", "Berapa bilangan mula-mula sebelum ada yang diambil?"],
    ["Dikurangkan ditambah sisa", "Bilangan awal dicari dengan menambahkan bilangan yang dikurangkan dan sisa."],
    ["Awal didapat", "Bilangan awal sudah ketemu, bukan hasil pengurangan."],
  ),
  kt(
    "Bagan batang",
    ["Ingin melihat bagian?", "Bagaimana melihat bilangan awal dan bagian-bagiannya sekaligus?"],
    ["Gambar bagan", "Batang atas adalah bilangan awal, dan dua batang di bawahnya adalah dua bagian."],
    ["Awal dan bagian jelas", "Bilangan awal dan kedua bagian terlihat dalam satu gambar."],
  ),
  kt(
    "Memeriksa hasil",
    ["Sudah benar?", "Bagaimana kita tahu jawabannya sudah benar?"],
    ["Kurangkan lagi", "Bilangan awal dikurangi bilangan yang dikurangkan, lalu lihat hasilnya."],
    ["Cocok dengan sisa", "Bila hasilnya sama dengan sisa, jawabannya benar."],
  ),
  kt(
    "Banyak kemungkinan",
    ["Hanya awal diketahui?", "Bagaimana bila hanya bilangan awal yang diketahui?"],
    ["Cari pasangan", "Cari pasangan bilangan yang dikurangkan dan sisa yang jumlahnya sama dengan bilangan awal."],
    ["Ada banyak pasangan", "Ada banyak kemungkinan pasangan yang cocok."],
  ),
  kt(
    "Cara pintar: Keluarga Fakta",
    ["Tambah atau kurang?", "Bagaimana memilih tambah atau kurang untuk mencari bilangan yang hilang?"],
    ["Keluarga Fakta", "Tiga bilangan satu keluarga: dua bagian dan satu jumlah, dengan dua kalimat tambah dan dua kalimat kurang."],
    ["Kalimat tambah dan kurang", "Bilangan yang hilang dicari dari kalimat yang sudah dikenal."],
  ),
  kt(
    "Cara pintar: Menghitung Naik",
    ["Dua bilangan berdekatan?", "Bagaimana mencari selisih dua bilangan yang berdekatan?"],
    ["Menghitung Naik", "Mulai dari bilangan kecil, naik ke puluhan terdekat, lalu naik sampai bilangan besar."],
    ["Jarak didapat", "Jarak yang dinaiki adalah bilangan yang dicari."],
  ),
  kt(
    "Cara pintar: Garis Bilangan",
    ["Ingin melihat lompatan?", "Bagaimana melihat pengurangan sebagai lompatan?"],
    ["Garis Bilangan", "Bilangan awal ditaruh di garis, lalu melompat mundur puluhan dulu, baru satuan."],
    ["Mendarat di sisa", "Tempat mendarat adalah sisanya."],
  ),
];

export const TEMA_KARTU_BOTOL: TemaPeta = { bingkai: "#14532D", ikon: "\u{1F332}", judul: "Peta pos jaga", latar: "#ECFDF5", garisLatar: "#16A34A" };
/** Peta radial awal (tanpa kata): tanda kurang di tengah, satu gambar per kartu. */
export const RINGKASAN_BOTOL: RingkasanPeta = {
  pusat: "\u{2796}",
  ikon: ["\u{1F4DD}", "\u{1F9EE}", "\u{2795}", "\u{1F4CA}", "\u{2705}", "\u{1F3AF}", "\u{1F46A}", "\u{1F4C8}", "\u{1F4CF}"],
  suara: "Ini peta kalimat pengurangan. Tanda kurang ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_BOTOL =
  "Ini peta pos jaga. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_BOTOL = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: catatan persediaan (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_BOTOL = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_BOTOL: readonly BarisInfo[] = [
  bi("\u{1F4DD}", "Kalimat titik-titik", "Tulis titik-titik", "Kalimat Matematika", "Ada yang belum diketahui", [0, 1, 2]),
  bi("\u{2796}", "Mencari yang dikurangkan", "Awal dikurangi sisa", "Dikurangkan didapat", "Kurangi awal dengan sisa", []),
  bi("\u{2795}", "Mencari bilangan awal", "Dikurangkan ditambah sisa", "Awal didapat", "Awal itu satu tumpukan", []),
  bi("\u{2705}", "Memeriksa hasil", "Kurangkan lagi", "Cocok dengan sisa", "Hasil diperiksa lagi", []),
  bi("\u{1F522}", "Hanya awal diketahui", "Cari pasangan", "Ada banyak pasangan", "Banyak kemungkinan", []),
];
export const TEMA_INFO_BOTOL: TemaInfo = { bingkai: "#14532D", latar: "#F0FDF4", aksen: "#15803D", teduh: "#DCFCE7", ikon: "\u{1F4CB}", judul: "Catatan persediaan" };
export const SUARA_INFO_BOTOL = "Ini catatan persediaan. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_BOTOL = "Catatan persediaan lengkap! Awal dikurangi sisa, dikurangkan ditambah sisa, dan hasilnya diperiksa lagi.";
