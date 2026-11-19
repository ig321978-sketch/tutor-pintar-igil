/**
 * Mind-map Kelas 3 Bab 5 Sub-Bab B (Tabel Bu Wulan) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Turus Berlima, Isi Tabel, Baca dan Tanya).
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

export const KARTU_TABEL: readonly KartuPeta[] = [
  kt("Turus berlima", ["Data banyak, dicatat bagaimana?", "Bagaimana mencatat data yang banyak dengan rapi?"], ["Empat tegak, satu miring", "Empat garis tegak dicoret satu garis miring."], ["Satu bundel lima", "Satu bundel turus berisi lima data."], ["masalah"]),
  kt("Menghitung turus", ["Banyaknya berapa?", "Bagaimana menghitung banyak seluruhnya dari turus?"], ["Bundel kali lima", "Hitung bundelnya dikali lima, lalu tambahkan garis sisa."], ["Banyak seluruhnya", "Hasilnya adalah banyak seluruhnya."]),
  kt("Tabel tiga kolom", ["Tabel punya kolom apa?", "Kolom apa saja yang dimiliki tabel data?"], ["Jenis, turus, banyak", "Tabel punya tiga kolom: jenis, turus, dan banyak."], ["Data tersusun rapi", "Data menjadi rapi dan mudah dibaca."]),
  kt("Dari benda ke tabel", ["Benda jadi tabel?", "Bagaimana mengubah benda menjadi tabel?"], ["Cacah, turus, angka", "Cacah bendanya, tulis turus, lalu salin angkanya."], ["Tabel terisi lengkap", "Setiap baris tabel terisi turus dan angka banyaknya."]),
  kt("Membaca tabel", ["Mana yang terbanyak?", "Bagaimana mencari yang terbanyak dan yang tersedikit?"], ["Lihat kolom banyak", "Bandingkan angka pada kolom banyak."], ["Urutkan dulu", "Data yang diurutkan membuat terbanyak dan tersedikit mudah dilihat."]),
  kt("Lebih dari dan kurang dari", ["Lebih dari berapa?", "Bagaimana mencari yang lebih dari atau kurang dari sebuah bilangan?"], ["Bandingkan dengan acuan", "Bandingkan tiap angka dengan bilangan acuan."], ["Yang sama tidak ikut", "Angka yang tepat sama dengan acuan tidak ikut dihitung."]),
  kt("Cara pintar: Turus Berlima", ["Takut salah hitung?", "Bagaimana agar tidak salah menghitung data yang banyak?"], ["Turus Berlima", "Gabungkan lima turus menjadi satu bundel."], ["Hitung bundelnya", "Cukup hitung bundelnya, bukan garisnya satu per satu."]),
  kt("Cara pintar: Isi Tabel", ["Data masih berantakan?", "Bagaimana menyusun data supaya rapi?"], ["Isi Tabel", "Isi turus lebih dulu, lalu salin banyaknya sebagai angka."], ["Tiap jenis satu baris", "Setiap jenis punya barisnya sendiri."]),
  kt("Cara pintar: Baca dan Tanya", ["Apa kesimpulannya?", "Bagaimana mengambil kesimpulan dari tabel?"], ["Baca dan Tanya", "Ajukan pertanyaan pada tabel, lalu cari jawabannya di kolom banyak."], ["Kesimpulan didapat", "Jawaban dari tabel menjadi kesimpulan."]),
];

export const TEMA_KARTU_TABEL: TemaPeta = { bingkai: "#0F766E", ikon: "\u{1F4CA}", judul: "Tabel klub sepeda", latar: "#F0FDFA", garisLatar: "#0D9488" };
/** Peta radial awal (tanpa kata): grafik di tengah, satu gambar per kartu. */
export const RINGKASAN_TABEL: RingkasanPeta = {
  pusat: "\u{1F4CA}",
  ikon: ["\u{270F}", "\u{1F9EE}", "\u{1F4CB}", "\u{1F4E6}", "\u{1F440}", "\u{2696}", "\u{2B50}", "\u{1F5C2}", "\u{1F64B}"],
  suara: "Ini peta tabel klub sepeda. Gambar grafik ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TABEL =
  "Ini tabel klub sepeda. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TABEL = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: tabel klub (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TABEL = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TABEL: readonly BarisInfo[] = [
  bi("\u{270F}", "Menulis turus", "Empat tegak, satu miring", "Satu bundel lima", "Miring ikut lima", [0, 1, 2]),
  bi("\u{1F9EE}", "Menghitung turus", "Bundel kali lima", "Banyak seluruhnya", "Tambah garis sisa", []),
  bi("\u{1F4CB}", "Menyusun tabel", "Isi turus dulu", "Tiga kolom rapi", "Jenis, turus, banyak", []),
  bi("\u{1F522}", "Mengurutkan baris", "Sedikit ke banyak", "Mudah dibandingkan", "Urutkan dulu", []),
  bi("\u{1F64B}", "Membaca tabel", "Baca kolom banyak", "Terbanyak, tersedikit", "Baca dan Tanya", []),
];
export const TEMA_INFO_TABEL: TemaInfo = { bingkai: "#1E3A8A", latar: "#EFF6FF", aksen: "#2563EB", teduh: "#DBEAFE", ikon: "\u{1F4CB}", judul: "Tabel klub" };
export const SUARA_INFO_TABEL = "Ini tabel klub. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TABEL = "Tabel klub lengkap! Turus berlima, isi tabel, dan baca dan tanya.";
