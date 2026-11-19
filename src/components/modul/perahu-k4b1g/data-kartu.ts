/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab G (Baris Perahu Bu Marni) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Tambah Berulang, Urai Lalu Kali, Kali Susun).
 * Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk. Infografis: satu tabel lima baris dari kegiatan Story.
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

export const KARTU_PERAHU: readonly KartuPeta[] = [
  kt("Perkalian", ["Banyak yang sama, berapa?", "Bagaimana menghitung banyak benda dalam beberapa bagian yang sama?"], ["Jumlahkan berulang", "Bilangan yang sama dijumlahkan berkali-kali."], ["Hasil kali", "Jumlah seluruhnya disebut hasil kali."], ["masalah"]),
  kt("Dua angka kali satu angka", ["Bilangan dua angka dikali?", "Bagaimana mengalikan bilangan dua angka dengan satu angka?"], ["Pecah jadi dua bagian", "Pecah bilangan menjadi puluhan dan satuan."], ["Puluhan dan satuan", "Setiap bagian dikalikan sendiri-sendiri."]),
  kt("Urai puluhan dan satuan", ["Bagian mana dikali?", "Bagian mana yang harus dikalikan dengan pengali?"], ["Kalikan keduanya", "Kalikan puluhan dan kalikan satuan."], ["Jumlahkan hasilnya", "Kedua hasil kali dijumlahkan menjadi hasil akhir."]),
  kt("Awas satuan terlewat", ["Satuan boleh dilewati?", "Apakah satuan boleh tidak dikalikan?"], ["Satuan ikut dikali", "Satuan harus dikalikan dengan pengali yang sama."], ["Hasil tidak kurang", "Hasilnya lengkap, tidak kurang dari seharusnya."]),
  kt("Kali susun", ["Ada cara yang pendek?", "Adakah cara menulis yang lebih pendek dan rapi?"], ["Satuan dikali dulu", "Tulis bilangan ke bawah, lalu kalikan satuan lebih dulu."], ["Tulis dan simpan", "Angka satuan ditulis, angka puluhan disimpan."]),
  kt("Simpanan", ["Simpanan dipakai ke mana?", "Ke mana simpanan dipakai?"], ["Tambah ke puluhan", "Simpanan ditambahkan pada hasil kali puluhan."], ["Hasil akhir didapat", "Hasil kali puluhan ditambah simpanan menjadi hasil akhir."]),
  kt("Cara pintar: Tambah Berulang", ["Ingin paham maknanya?", "Bagaimana memahami arti perkalian dengan jelas?"], ["Tambah Berulang", "Jumlahkan bilangan yang sama sebanyak pengalinya."], ["Cocok untuk faktor kecil", "Cara ini cocok bila pengalinya kecil."]),
  kt("Cara pintar: Urai Lalu Kali", ["Ingin pakai fakta hafal?", "Bagaimana memakai perkalian dasar yang sudah dihafal?"], ["Urai Lalu Kali", "Uraikan bilangan, lalu kalikan tiap bagian."], ["Dua hasil dijumlah", "Jumlahkan kedua hasil kali bagian."]),
  kt("Cara pintar: Kali Susun", ["Ingin cepat dan rapi?", "Bagaimana mengalikan dengan cepat dan rapi?"], ["Kali Susun", "Tulis ke bawah, satuan dulu, simpan bila perlu."], ["Periksa dengan cara lain", "Hasil diperiksa dengan cara yang lain."]),
];

export const TEMA_KARTU_PERAHU: TemaPeta = { bingkai: "#0369A1", ikon: "\u{26F5}", judul: "Baris perahu", latar: "#F0F9FF", garisLatar: "#0EA5E9" };
/** Peta radial awal (tanpa kata): perahu di tengah, satu gambar per kartu. */
export const RINGKASAN_PERAHU: RingkasanPeta = {
  pusat: "\u{26F5}",
  ikon: ["\u{2795}", "\u{1F522}", "\u{2702}", "\u{1F50D}", "\u{1F4DD}", "\u{1F4E6}", "\u{1F6F6}", "\u{1F4A1}", "\u{26A1}"],
  suara: "Ini peta baris perahu. Gambar perahu ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_PERAHU =
  "Ini baris perahu. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_PERAHU = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar perahu (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_PERAHU = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_PERAHU: readonly BarisInfo[] = [
  bi("\u{2795}", "Menjumlah berulang", "Bilangan sama berkali-kali", "Hasil kali", "Kali itu tambah berulang", [0, 1, 2]),
  bi("\u{2702}", "Mengurai bilangan", "Puluhan dan satuan", "Dua hasil kecil", "Kalikan keduanya", []),
  bi("\u{2716}", "Menyusun ke bawah", "Satuan dikali dulu", "Tulis dan simpan", "Simpanan ditambah", []),
  bi("\u{1F4E6}", "Menjaga satuan", "Satuan ikut dikali", "Hasil tidak kurang", "Jangan terlewat", []),
  bi("\u{1F50D}", "Memeriksa hasil", "Pakai cara lain", "Hasil sama", "Periksa dulu", []),
];
export const TEMA_INFO_PERAHU: TemaInfo = { bingkai: "#0F766E", latar: "#F0FDFA", aksen: "#0D9488", teduh: "#CCFBF1", ikon: "\u{1F4CB}", judul: "Daftar perahu" };
export const SUARA_INFO_PERAHU = "Ini daftar perahu. Ada lima baris, satu baris satu kegiatan dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_PERAHU = "Daftar perahu lengkap! Tambah berulang, urai lalu kali, dan kali susun.";
