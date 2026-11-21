/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab A (Pola Gambar) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Gambar Berikutnya, Tabel Selisih, Susun Per Lima).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Ikon peta memakai benda musik angklung (nada, lonceng, mik, drum, piano, partitur, biola, saksofon, terompet).
 * Infografis: satu tabel lima baris dari kejadian Story.
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

export const KARTU_ANGKLUNG: readonly KartuPeta[] = [
  kt("Pola gambar", ["Deret berpola?", "Bagaimana tahu susunan deret itu berpola?"], ["Lihat selisih", "Bandingkan banyak dua deret yang berurutan."], ["Pola terlihat", "Selisih yang tetap membuat susunan menjadi pola."], ["masalah"]),
  kt("Selisih tetap", ["Ubahnya berapa?", "Berapa banyak yang berubah tiap deret?"], ["Hitung selisih", "Kurangi banyak deret berikutnya dengan banyak deret sebelumnya."], ["Selisih sama", "Selisihnya sama di setiap pasangan deret."]),
  kt("Pola membesar", ["Makin banyak?", "Apa nama pola yang makin lama makin banyak?"], ["Selisih tambah", "Tiap deret bertambah dengan selisih yang sama."], ["Membesar", "Pola yang makin banyak disebut membesar."]),
  kt("Pola mengecil", ["Makin sedikit?", "Apa nama pola yang makin lama makin sedikit?"], ["Selisih kurang", "Tiap deret berkurang dengan selisih yang sama."], ["Mengecil", "Pola yang makin sedikit disebut mengecil."]),
  kt("Bukan angkanya", ["Angka besar?", "Apakah angka yang besar berarti pola membesar?"], ["Lihat arah", "Lihat arah perubahan, bukan besar angkanya."], ["Jenis benar", "Jenis pola ditentukan oleh arah perubahan."]),
  kt("Melanjutkan deret", ["Deret berikutnya?", "Bagaimana mencari deret yang berikutnya?"], ["Tambah selisih", "Tambah atau kurangi dengan selisih yang sama."], ["Deret lanjut", "Deret berikutnya ditemukan."]),
  kt("Cara pintar: Gambar Berikutnya", ["Sulit dibayangkan?", "Bagaimana membayangkan deret yang belum ada?"], ["Gambar Berikutnya", "Gambar deret selanjutnya dengan perubahan yang sama."], ["Terlihat jelas", "Pola tampak langsung bertambah atau berkurang."]),
  kt("Cara pintar: Tabel Selisih", ["Yakin selisih sama?", "Bagaimana memastikan selisihnya selalu sama?"], ["Tabel Selisih", "Tulis banyak tiap deret, lalu selisihnya di bawah."], ["Selisih terbukti", "Selisih yang sama membuktikan pola."]),
  kt("Cara pintar: Susun Per Lima", ["Terlalu banyak?", "Bagaimana menghitung benda yang banyak dengan cepat?"], ["Susun Per Lima", "Susun benda dalam baris berisi lima."], ["Cepat terbaca", "Banyaknya terbaca sekilas."]),
];

export const TEMA_KARTU_ANGKLUNG: TemaPeta = { bingkai: "#B45309", ikon: "\u{1F3B6}", judul: "Rak angklung", latar: "#FFFBEB", garisLatar: "#D97706" };
/** Peta radial awal (tanpa kata): nada di tengah, satu gambar per kartu (benda musik angklung). */
export const RINGKASAN_ANGKLUNG: RingkasanPeta = {
  pusat: "\u{1F3B6}",
  ikon: ["\u{1F3B5}", "\u{1F514}", "\u{1F3A4}", "\u{1F941}", "\u{1F3B9}", "\u{1F3BC}", "\u{1F3BB}", "\u{1F3B7}", "\u{1F3BA}"],
  suara: "Ini peta pola gambar. Gambar nada ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_ANGKLUNG =
  "Ini kartu rak angklung. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_ANGKLUNG = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar angklung (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_ANGKLUNG = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: { t: string; s?: string }, b: { t: string; s?: string }, c: { t: string; s?: string }, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [a, b, c], contoh });
export const BARIS_INFO_ANGKLUNG: readonly BarisInfo[] = [
  bi("\u{1F3B5}", "Menata deret", { t: "Tata deret" }, { t: "2, 4, 6", s: "dua, empat, enam" }, { t: "Tambah dua" }, [0, 1, 2]),
  bi("\u{1F3BC}", "Tabel selisih", { t: "Tulis selisih" }, { t: "Selisih sama" }, { t: "Pola membesar" }, []),
  bi("\u{1F514}", "Deret penabuh", { t: "Makin sedikit" }, { t: "7, 5, 3", s: "tujuh, lima, tiga" }, { t: "Pola mengecil" }, []),
  bi("\u{1F3A4}", "Salah kira", { t: "Angka besar" }, { t: "Dikira membesar" }, { t: "Lihat selisih" }, []),
  bi("\u{1F941}", "Melanjutkan", { t: "Tambah selisih" }, { t: "10", s: "sepuluh" }, { t: "Deret kelima" }, []),
];
export const TEMA_INFO_ANGKLUNG: TemaInfo = { bingkai: "#B45309", latar: "#FFFBEB", aksen: "#D97706", teduh: "#FEF3C7", ikon: "\u{1F4CB}", judul: "Daftar angklung" };
export const SUARA_INFO_ANGKLUNG = "Ini daftar angklung. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_ANGKLUNG = "Daftar angklung lengkap! Tata, hitung selisih, dan lanjutkan deret.";
