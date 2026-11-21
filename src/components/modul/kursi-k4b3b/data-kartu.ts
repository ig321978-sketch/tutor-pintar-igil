/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab B (Barisan Kursi Pak Gunawan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Rantai Loncat, Mesin Aturan, Tabel Urutan).
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

export const KARTU_KURSI: readonly KartuPeta[] = [
  kt("Beda", ["Apa itu beda?", "Apa yang dimaksud dengan beda pada pola bilangan?"], ["Selisih berurutan", "Beda adalah selisih dua bilangan yang berurutan."], ["Selalu sama", "Beda yang tetap sama pada setiap pasangan bilangan."], ["masalah"]),
  kt("Pola membesar", ["Kapan membesar?", "Kapan sebuah pola bilangan disebut membesar?"], ["Beda tambah", "Beda berupa tambah, jadi bilangan makin besar."], ["Pola membesar", "Pola dengan beda tambah disebut pola membesar."]),
  kt("Pola mengecil", ["Kapan mengecil?", "Kapan sebuah pola bilangan disebut mengecil?"], ["Beda kurang", "Beda berupa kurang, jadi bilangan makin kecil."], ["Pola mengecil", "Pola dengan beda kurang disebut pola mengecil."]),
  kt("Melanjutkan pola", ["Bilangan berikutnya?", "Bagaimana mencari bilangan berikutnya pada pola?"], ["Pakai beda sama", "Tambah atau kurangi beda yang sama dari bilangan terakhir."], ["Pola berlanjut", "Pola bisa dilanjutkan tanpa menggambar bendanya."]),
  kt("Urutan jauh", ["Urutan yang jauh?", "Bagaimana mencari bilangan pada urutan yang jauh?"], ["Hitung lompatan", "Banyak lompatan satu kurang dari nomor urutan."], ["Bilangan didapat", "Bilangan itu didapat dari beda sebanyak lompatan."]),
  kt("Berhenti di nol", ["Sampai kapan mengecil?", "Sampai kapan pola mengecil boleh dilanjutkan?"], ["Kurangi sampai habis", "Terus kurangi beda selama bilangannya belum habis."], ["Nol paling kecil", "Pola mengecil berhenti di nol."]),
  kt("Cara pintar: Rantai Loncat", ["Ingin melihat urutan?", "Bagaimana melihat urutan bilangan dan bedanya sekaligus?"], ["Rantai Loncat", "Gambar loncatan dari satu bilangan ke bilangan berikutnya."], ["Beda tiap loncatan", "Tiap loncatan memuat beda yang sama."]),
  kt("Cara pintar: Mesin Aturan", ["Ingin cepat melanjutkan?", "Bagaimana melanjutkan pola beberapa langkah dengan cepat?"], ["Mesin Aturan", "Masukkan bilangan ke mesin beraturan tambah atau kurang."], ["Keluar bilangan baru", "Bilangan yang keluar menjadi bilangan berikutnya."]),
  kt("Cara pintar: Tabel Urutan", ["Ingin urutan jauh?", "Bagaimana mencari bilangan pada urutan yang sangat jauh?"], ["Tabel Urutan", "Tulis nomor urutan di atas dan bilangan pola di bawahnya."], ["Cari lewat lompatan", "Tambahkan beda sebanyak lompatan dari urutan pertama."]),
];

export const TEMA_KARTU_KURSI: TemaPeta = { bingkai: "#9A3412", ikon: "\u{1F3BC}", judul: "Papan kursi konser", latar: "#FFFBEB", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): not musik di tengah, satu gambar per kartu (benda panggung konser angklung). */
export const RINGKASAN_KURSI: RingkasanPeta = {
  pusat: "\u{1F3BC}",
  ikon: ["\u{1F3B6}", "\u{1F3B5}", "\u{1F3A4}", "\u{1F941}", "\u{1F3B9}", "\u{1F514}", "\u{1F4A1}", "\u{1F388}", "\u{1F389}"],
  suara: "Ini peta papan kursi konser. Gambar not musik ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_KURSI =
  "Ini papan kursi konser. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_KURSI = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar kursi (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_KURSI = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_KURSI: readonly BarisInfo[] = [
  bi("\u{1F3B6}", "Mencari beda", "Hitung selisih", "Beda yang sama", "Berurutan saja", [0, 1, 2]),
  bi("\u{1F3B5}", "Melanjutkan", "Tambah beda lagi", "Bilangan berikutnya", "Rantai Loncat", []),
  bi("\u{1F3A4}", "Memakai mesin", "Masukkan bilangan", "Keluar bilangan baru", "Mesin Aturan", []),
  bi("\u{1F941}", "Urutan jauh", "Hitung lompatan", "Bilangan pada urutan", "Tabel Urutan", []),
  bi("\u{1F514}", "Mengecil", "Kurangi beda", "Berhenti di nol", "Dua arah pola", []),
];
export const TEMA_INFO_KURSI: TemaInfo = { bingkai: "#7C2D12", latar: "#FFFBEB", aksen: "#B45309", teduh: "#FEF3C7", ikon: "\u{1F4CB}", judul: "Daftar kursi" };
export const SUARA_INFO_KURSI = "Ini daftar kursi. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_KURSI = "Daftar kursi lengkap! Rantai loncat, mesin aturan, dan tabel urutan.";
