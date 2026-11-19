/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab D (Penjumlahan sampai 100) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia
 * (Penjumlahan Bersusun, Pasangan Bilangan, Menghitung Maju). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis: satu tabel lima baris dari data Story.
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

export const KARTU_TAMBAH: readonly KartuPeta[] = [
  kt("Susun pendek", ["Menjumlah dua bilangan?", "Dua bilangan dua angka perlu dijumlah dengan rapi."], ["Susun ke bawah, satuan dulu", "Tulis bilangan bersusun, puluhan lurus dengan puluhan, lalu jumlahkan satuan dulu."], ["Jumlah didapat", "Jumlah kedua bilangan didapat."], ["masalah"]),
  kt("Susun panjang", ["Ada cara yang lebih jelas?", "Adakah cara yang memperlihatkan tiap tempat angka dengan jelas?"], ["Uraikan puluhan dan satuan", "Uraikan tiap bilangan menjadi puluhan dan satuan, lalu jumlahkan tiap bagian."], ["Hasilnya sama", "Hasilnya sama dengan susun pendek."]),
  kt("Menyimpan", ["Satuannya sepuluh atau lebih?", "Jumlah satuan sepuluh atau lebih tidak muat di satu tempat."], ["Tukar sepuluh jadi satu puluhan", "Sepuluh satuan ditukar menjadi satu puluhan, lalu disimpan ke tempat puluhan."], ["Simpanan masuk puluhan", "Satu puluhan simpanan dijumlahkan bersama puluhan."]),
  kt("Tiga bilangan", ["Ada tiga bilangan?", "Bagaimana menjumlah tiga bilangan sekaligus?"], ["Jumlah dua-dua", "Jumlahkan dua bilangan dulu, lalu tambahkan bilangan ketiga."], ["Urutan tidak mengubah", "Urutan menjumlah tidak mengubah hasilnya."]),
  kt("Cerita penjumlahan", ["Kata apa yang dicari?", "Kata tambah, jumlah seluruhnya, dan semuanya menandakan penjumlahan."], ["Tulis kalimat hitungnya", "Tulis kalimat penjumlahan dari cerita, lalu hitung."], ["Jawab dengan satuan", "Tulis jawabannya dengan satuan yang tepat."]),
  kt("Memeriksa", ["Apakah hasilnya benar?", "Bagaimana memastikan hasil penjumlahan sudah benar?"], ["Tukar urutan, kira-kira", "Tukar urutan kedua bilangan, dan kira-kira dulu dengan bilangan bulat puluhan."], ["Hasil yakin", "Hasil yang sama dan masuk akal berarti yakin benar."]),
  kt("Cara pintar: Penjumlahan Bersusun", ["Bilangan dua angka biasa?", "Bilangan dua angka yang tidak mudah dihitung di kepala."], ["Penjumlahan Bersusun", "Tulis bersusun, mulai dari satuan, simpan bila perlu."], ["Rapi dan tepat", "Hasilnya rapi dan tepat."]),
  kt("Cara pintar: Pasangan Bilangan", ["Hampir puluhan penuh?", "Salah satu bilangan hampir menggenapi puluhan."], ["Pasangan Bilangan", "Pecah bilangan supaya menggenapi puluhan, lalu tambahkan sisanya."], ["Hitungan jadi mudah", "Menjumlah jadi lebih mudah."]),
  kt("Cara pintar: Menghitung Maju", ["Salah satu bilangan kecil?", "Salah satu bilangan kecil dan mudah dihitung maju."], ["Menghitung Maju", "Mulai dari bilangan yang besar, maju per sepuluh lalu per satu."], ["Berhenti di jumlahnya", "Bilangan terakhir yang dicapai adalah jumlahnya."]),
];

export const TEMA_KARTU_TAMBAH: TemaPeta = { bingkai: "#BE185D", ikon: "\u{1F370}", judul: "Nampan kue", latar: "#FCE7F3", garisLatar: "#9D174D" };
/** Peta radial awal (tanpa kata): kue di tengah, satu gambar per kartu. */
export const RINGKASAN_TAMBAH: RingkasanPeta = {
  pusat: "\u{1F370}",
  ikon: ["\u{1F4CF}", "\u{1F9E9}", "\u{1F51F}", "\u{2795}", "\u{1F4D6}", "\u{2705}", "\u{1F9EE}", "\u{1F517}", "\u{23E9}"],
  suara: "Ini peta penjumlahan. Kue ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_TAMBAH =
  "Ini nampan kue. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_TAMBAH = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar pesanan (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_TAMBAH = ["Caranya", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_TAMBAH: readonly BarisInfo[] = [
  bi("\u{1F370}", "Dua kotak kue", "Susun, satuan dulu", "Jumlah kue didapat", "Puluhan lurus", [0, 1, 2]),
  bi("\u{1F9C1}", "Lupa menyimpan", "Tukar sepuluh butir", "Simpan satu puluhan", "Hasil jadi benar", []),
  bi("\u{1F4E6}", "Tiga kotak", "Jumlah dua-dua", "Tujuh puluh kue", "Urutan bebas", []),
  bi("\u{1F35E}", "Roti di rak", "Kata tambah", "Roti jadi lebih banyak", "Jawab dengan satuan", []),
  bi("\u{1F504}", "Tukar urutan", "Dibalik, hasil sama", "Hasil sama", "Kira-kira dulu", []),
];
export const TEMA_INFO_TAMBAH: TemaInfo = { bingkai: "#9D174D", latar: "#FDF2F8", aksen: "#BE185D", teduh: "#FCE7F3", ikon: "\u{1F9FE}", judul: "Daftar pesanan" };
export const SUARA_INFO_TAMBAH = "Ini daftar pesanan. Ada lima baris, satu baris satu kejadian dari cerita. Isi caranya, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_TAMBAH = "Daftar pesanan lengkap! Susun satuan dulu, simpan puluhan bila perlu, jumlah dua-dua untuk tiga bilangan, dan periksa dengan menukar urutan.";
