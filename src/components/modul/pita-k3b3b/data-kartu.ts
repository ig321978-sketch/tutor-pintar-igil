/**
 * Isi Mind-map (Gulungan Pita) dan Infografis (Tabel Pita) Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Mind-map berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek. Hanya poin pelajaran (tanpa nama tokoh atau benda cerita).
 * Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Tabel Perbandingan, Garis Bilangan, Cara Memecah). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis: satu tabel lima baris dari kejadian Story. Data simulasi ada di data-sim.ts. Diuji: scripts/uji-pita-k3b3b.mjs.
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

export const KARTU_PITA: readonly KartuPeta[] = [
  kt(
    "Seratus sentimeter satu meter",
    ["Satu meter berapa sentimeter?", "Berapa sentimeter panjang satu meter?"],
    ["Tarik meteran", "Tarik meteran dari angka nol sampai angka seratus."],
    ["Seratus sentimeter satu meter", "Seratus sentimeter sama dengan satu meter."],
    ["masalah"],
  ),
  kt(
    "Meter jadi sentimeter",
    ["Meter jadi sentimeter?", "Bagaimana mengubah ukuran meter menjadi sentimeter?"],
    ["Kalikan seratus", "Meter ke sentimeter dikalikan dengan seratus."],
    ["Sentimeter didapat", "Banyak sentimeter sudah ketemu."],
  ),
  kt(
    "Sentimeter jadi meter",
    ["Sentimeter jadi meter?", "Bagaimana mengubah ukuran sentimeter menjadi meter?"],
    ["Bagi seratus", "Sentimeter ke meter dibagi dengan seratus."],
    ["Meter didapat", "Banyak meter sudah ketemu."],
  ),
  kt(
    "Ukuran ditulis bersama",
    ["Meter dan sentimeter bersama?", "Bagaimana menulis ukuran dengan meter dan sentimeter bersama?"],
    ["Ambil tiap seratus", "Tiap seratus sentimeter diambil menjadi satu meter, sisanya tetap sentimeter."],
    ["Ditulis meter dan sentimeter", "Ukuran boleh ditulis dengan meter dan sentimeter bersama atau dengan sentimeter saja."],
  ),
  kt(
    "Menyambung dua ukuran",
    ["Menyambung dua pita?", "Bagaimana menjumlahkan dua ukuran panjang?"],
    ["Jumlahkan sejenis", "Meter dijumlah dengan meter, sentimeter dengan sentimeter."],
    ["Tukar seratus jadi meter", "Bila sentimeternya lebih dari seratus, tukar seratus sentimeter menjadi satu meter."],
  ),
  kt(
    "Memotong ukuran",
    ["Memotong tali?", "Bagaimana mengurangkan dua ukuran panjang?"],
    ["Kurangkan sejenis", "Meter dikurang meter, sentimeter dikurang sentimeter."],
    ["Pinjam satu meter", "Bila sentimeternya kurang, pinjam satu meter menjadi seratus sentimeter."],
  ),
  kt(
    "Cara pintar: Tabel Perbandingan",
    ["Banyak ukuran sekaligus?", "Bagaimana mengubah banyak ukuran sekaligus?"],
    ["Tabel Perbandingan", "Tabel dua baris meter dan sentimeter, tiap kolom menunjukkan ukuran yang sama panjang."],
    ["Pola ketemu", "Meter bertambah satu, sentimeter bertambah seratus."],
  ),
  kt(
    "Cara pintar: Garis Bilangan",
    ["Mana yang lebih panjang?", "Bagaimana membandingkan dua ukuran panjang?"],
    ["Garis Bilangan", "Taruh ukuran pada garis sentimeter yang ditandai tiap seratus."],
    ["Lebih jauh dari nol", "Ukuran yang lebih jauh dari nol lebih panjang."],
  ),
  kt(
    "Cara pintar: Cara Memecah",
    ["Menjumlah ukuran gabungan?", "Bagaimana menjumlahkan atau mengurangkan ukuran meter dan sentimeter?"],
    ["Cara Memecah", "Pecah menjadi bagian meter dan bagian sentimeter, hitung masing-masing, lalu gabungkan hasilnya."],
    ["Hasil digabung", "Hasil bagian meter dan bagian sentimeter digabung kembali."],
  ),
];

export const TEMA_KARTU_PITA: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F9F5}", judul: "Peta bengkel pita", latar: "#FFFBEB", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): gulungan pita di tengah, satu gambar per kartu. */
export const RINGKASAN_PITA: RingkasanPeta = {
  pusat: "\u{1F9F5}",
  ikon: ["\u{1F4AF}", "\u{2716}", "\u{2797}", "\u{1F522}", "\u{2795}", "\u{2796}", "\u{1F4CA}", "\u{1F4CF}", "\u{1F9E9}"],
  suara: "Ini peta pita ukur. Gulungan pita ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_PITA =
  "Ini peta bengkel pita. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_PITA = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: tabel pita (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_PITA = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_PITA: readonly BarisInfo[] = [
  bi("\u{1F4CF}", "Meter ke sentimeter", "Kalikan seratus", "Sentimeter didapat", "Meter dikali seratus", [0, 1, 2]),
  bi("\u{1F522}", "Sentimeter ke meter", "Bagi seratus", "Meter didapat", "Sentimeter dibagi seratus", []),
  bi("\u{1F4DD}", "Ukuran bersama", "Ambil tiap seratus", "Meter dan sentimeter", "Ditulis bersama", []),
  bi("\u{1F9F5}", "Menyambung pita", "Jumlahkan sejenis", "Tukar seratus jadi meter", "Meter dengan meter", []),
  bi("\u{2702}", "Memotong tali", "Kurangkan sejenis", "Pinjam satu meter", "Sentimeter dengan sentimeter", []),
];
export const TEMA_INFO_PITA: TemaInfo = { bingkai: "#92400E", latar: "#FFFBEB", aksen: "#B45309", teduh: "#FEF3C7", ikon: "\u{1F4CB}", judul: "Tabel pita" };
export const SUARA_INFO_PITA = "Ini tabel pita. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_PITA = "Tabel pita lengkap! Meter dikali seratus, sentimeter dibagi seratus, dan ukuran sejenis dihitung bersama.";
