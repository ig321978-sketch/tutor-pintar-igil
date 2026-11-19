/**
 * Mind-map Kelas 2 Bab 8 Sub-Bab B (Diagram Gambar) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu dengan nama Indonesia (Diagram Kertas Tempel, Detektif Diagram, Banding Baris).
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

export const KARTU_GAMBAR: readonly KartuPeta[] = [
  kt("Satu gambar, satu benda", ["Bagaimana menunjukkan banyak?", "Kita ingin menunjukkan banyak benda dengan gambar."], ["Satu gambar mewakili satu", "Setiap gambar mewakili satu benda yang dihitung."], ["Banyak gambar sama banyak benda", "Banyak gambar pada satu baris sama dengan banyak bendanya."], ["masalah"]),
  kt("Memilih lambang", ["Gambar apa yang dipakai?", "Kita perlu memilih gambar sebagai lambang diagram."], ["Bintang, hati, lingkaran, wajah", "Lambang boleh bintang, lingkaran, hati, atau wajah tersenyum."], ["Semua gambar sama rata", "Semua gambar harus sama bentuk, sama ukuran, dan sama jaraknya."]),
  kt("Judul dan keterangan", ["Pembaca bisa keliru", "Tanpa penjelasan, pembaca bisa salah paham."], ["Tulis judul dan keterangan", "Judul menyebut isi diagram, keterangan menyebut arti satu gambar."], ["Diagram mudah dipahami", "Dengan judul dan keterangan, pembaca langsung paham."]),
  kt("Membuat diagram", ["Dari turus ke gambar?", "Data dari diagram turus bisa disajikan dengan gambar."], ["Nama kiri, gambar ke kanan", "Nama jenis ditulis di kolom kiri, lalu gambar berjajar ke kanan tanpa celah."], ["Baris rapi dan mudah dihitung", "Barisnya rapi, sehingga mudah dihitung dan dibandingkan."]),
  kt("Cara pintar: Diagram Kertas Tempel", ["Mengumpulkan data langsung?", "Kita ingin mengumpulkan data langsung dari banyak orang."], ["Diagram Kertas Tempel", "Tiap orang menempel satu kertas kecil di lajur pilihannya."], ["Diagram jadi sendiri", "Satu kertas berarti satu pilihan, jadi diagram terbentuk tanpa menggambar."]),
  kt("Cara pintar: Detektif Diagram", ["Bagaimana membaca diagram?", "Kita ingin membaca diagram baru dengan teliti."], ["Detektif Diagram", "Baca berurutan: judul, keterangan, nama jenis, lalu hitung gambar."], ["Tidak ada petunjuk terlewat", "Dengan urutan itu, semua petunjuk terbaca dan hasil hitungan tepat."]),
  kt("Paling banyak, paling sedikit", ["Mana yang terbanyak?", "Kita ingin tahu jenis yang paling banyak dan paling sedikit."], ["Bandingkan panjang baris", "Baris paling panjang paling banyak, baris paling pendek paling sedikit."], ["Sama panjang, sama banyak", "Dua baris yang sama panjang berarti sama banyak."]),
  kt("Cara pintar: Banding Baris", ["Berapa lebihnya?", "Kita ingin tahu berapa lebihnya dan kurangnya dua jenis."], ["Banding Baris", "Dua baris diletakkan sejajar, mulai dari garis yang sama."], ["Selisih jadi lebihnya", "Selisih panjang baris adalah lebihnya, dan baris yang pendek kurang sebanyak selisih itu."]),
  kt("Jumlah dan penyajian", ["Berapa jumlahnya?", "Kita ingin tahu jumlah dua jenis atau jumlah semua jenis."], ["Gabungkan baris, lalu tambah", "Hitung gambar tiap baris yang dipilih, lalu tambahkan hasilnya."], ["Sajikan dengan percaya diri", "Sebutkan judul, paling banyak, paling sedikit, lebihnya, dan kurangnya dengan jelas."]),
];

export const TEMA_KARTU_GAMBAR: TemaPeta = { bingkai: "#9D174D", ikon: "\u{1F3AD}", judul: "Tirai merah diagram gambar", latar: "#FFF1F2", garisLatar: "#BE123C" };
/** Peta radial awal (tanpa kata): papan layar di tengah, satu gambar per kartu. */
export const RINGKASAN_GAMBAR: RingkasanPeta = {
  pusat: "\u{1F4CA}",
  ikon: ["\u{2B50}", "\u{1F3A8}", "\u{1F3F7}", "\u{1F4D0}", "\u{1F4DD}", "\u{1F50D}", "\u{1F4C8}", "\u{2696}", "\u{2795}"],
  suara: "Ini peta tirai merah. Papan layar ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_GAMBAR =
  "Ini tirai merah diagram gambar. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_GAMBAR = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan layar (lima pertanyaan data + poster) ------------------------------ */
export const KOLOM_INFO_GAMBAR = ["Jawaban", "Banyaknya", "Cara membaca"] as const;
const bi = (ikon: string, nama: string, jawab: string, banyak: [string, string], cara: string, contoh: number[]): BarisInfo => ({
  ikon,
  nama,
  isi: [{ t: jawab }, { t: banyak[0], s: banyak[1] }, { t: cara }],
  contoh,
});
export const BARIS_INFO_GAMBAR: readonly BarisInfo[] = [
  bi("\u{1F4C8}", "Paling banyak", "Merah", ["7", "tujuh"], "Baris terpanjang", [0, 1, 2]),
  bi("\u{1F4C9}", "Paling sedikit", "Hijau", ["3", "tiga"], "Baris terpendek", []),
  bi("\u{1F91D}", "Sama banyak", "Kuning, biru", ["5", "lima"], "Sama panjang", []),
  bi("\u{2696}", "Lebihnya", "Merah, kuning", ["2", "dua"], "Banding baris", []),
  bi("\u{2795}", "Jumlah semua", "Semua warna", ["20", "dua puluh"], "Tambah semua", []),
];
export const TEMA_INFO_GAMBAR: TemaInfo = { bingkai: "#7E22CE", latar: "#FAF5FF", aksen: "#6B21A8", teduh: "#F3E8FF", ikon: "\u{1F3AB}", judul: "Papan Layar Selendang Penari" };
export const SUARA_INFO_GAMBAR =
  "Ini papan layar selendang penari. Ada lima kartu, satu kartu satu pertanyaan tentang data. Isi jawabannya, banyaknya, dan cara membacanya. Kotak bertanda contoh sudah terisi. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_GAMBAR = "Papan layar lengkap! Jawaban, banyaknya, dan cara membaca berjalan bersama supaya diagram mudah dipahami.";
