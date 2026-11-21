/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab C (Pecahan yang Sama Besar) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Cocokkan Daerah, Kali Bentuk Satu, Bagi Keduanya).
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

export const KARTU_JAHIT: readonly KartuPeta[] = [
  kt("Sama besar", ["Beda bagian?", "Bisakah dua pecahan yang bagiannya berbeda sama besar?"], ["Bisa sama besar", "Potongan dengan bagian berbeda bisa punya arsiran yang sama panjang."], ["Pecahan sama besar", "Pecahan yang sama besar ditulis dengan angka berbeda."], ["masalah"]),
  kt("Menumpuk", ["Sudah sama?", "Bagaimana memastikan dua pecahan sama besar?"], ["Tumpuk potongan", "Tumpuk dua potongan kain, lalu lihat ujung arsirannya."], ["Ujung arsiran sama", "Ujung arsiran yang sama berarti pecahan sama besar."]),
  kt("Ditambah?", ["Ditambah saja?", "Bolehkah pembilang dan penyebut ditambah bilangan yang sama?"], ["Menambah keliru", "Menambah bilangan yang sama tidak menjaga besar pecahan."], ["Besar berubah", "Pecahannya menjadi lebih besar atau lebih kecil."]),
  kt("Dikali sama", ["Cara yang benar?", "Cara apa yang menjaga besar pecahan?"], ["Kali keduanya", "Kalikan pembilang dan penyebut dengan bilangan yang sama."], ["Besar tetap", "Besar pecahan tetap sama, hanya bagiannya yang lebih banyak."]),
  kt("Dibagi sama", ["Angka kebesaran?", "Bagaimana membuat angka pecahan lebih kecil?"], ["Bagi keduanya", "Bagi pembilang dan penyebut dengan bilangan yang sama."], ["Angka lebih kecil", "Besar pecahan tetap dan angkanya lebih kecil."]),
  kt("Berhenti", ["Sampai kapan?", "Sampai kapan pecahan terus dibagi?"], ["Sampai habis", "Bagi sampai tidak ada bilangan lain yang membagi habis keduanya."], ["Paling sederhana", "Pecahan itu sudah paling sederhana."]),
  kt("Cara pintar: Cocokkan Daerah", ["Ingin melihat?", "Bagaimana melihat alasannya dengan gambar?"], ["Cocokkan Daerah", "Gambar dua bangun sama besar dengan bagian berbeda, lalu cocokkan arsirannya."], ["Terlihat jelas", "Luas arsiran yang sama berarti pecahan sama besar."]),
  kt("Cara pintar: Kali Bentuk Satu", ["Perlu penyebut baru?", "Bagaimana mendapat penyebut yang diinginkan?"], ["Kali Bentuk Satu", "Kalikan pecahan dengan pecahan yang besarnya sama dengan satu."], ["Penyebut baru", "Penyebut sesuai keinginan dan besar pecahan tidak berubah."]),
  kt("Cara pintar: Bagi Keduanya", ["Ingin sederhana?", "Bagaimana menulis pecahan paling sederhana?"], ["Bagi Keduanya", "Bagi pembilang dan penyebut dengan bilangan yang sama."], ["Jawaban singkat", "Pecahan tertulis dalam bentuk paling sederhana."]),
];

export const TEMA_KARTU_JAHIT: TemaPeta = { bingkai: "#9D174D", ikon: "\u{1F457}", judul: "Meja jahit", latar: "#FDF2F8", garisLatar: "#BE185D" };
/** Peta radial awal (tanpa kata): baju di tengah, satu gambar per kartu. */
export const RINGKASAN_JAHIT: RingkasanPeta = {
  pusat: "\u{1F457}",
  ikon: ["\u{1F9F5}", "\u{1F4D1}", "\u{2795}", "\u{1F522}", "\u{2797}", "\u{270B}", "\u{1F4D0}", "\u{1F380}", "\u{1F4CF}"],
  suara: "Ini peta pecahan yang sama besar. Gambar baju ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_JAHIT =
  "Ini kartu meja jahit. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_JAHIT = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: nota pesanan (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_JAHIT = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_JAHIT: readonly BarisInfo[] = [
  bi("\u{1F4D1}", "Menumpuk potongan", "Tumpuk dua kain", "Ujung arsiran sama", "Pecahan sama besar", [0, 1, 2]),
  bi("\u{2795}", "Menambah angka", "Tambah bilangan sama", "Besar berubah", "Cara yang keliru", []),
  bi("\u{1F522}", "Mengalikan", "Kali pembilang penyebut", "Pecahan baru", "Besar tetap sama", []),
  bi("\u{2797}", "Membagi", "Bagi pembilang penyebut", "Angka makin kecil", "Besar tidak berubah", []),
  bi("\u{2705}", "Sederhanakan", "Bagi sampai habis", "Pecahan sederhana", "Tak bisa dibagi lagi", []),
];
export const TEMA_INFO_JAHIT: TemaInfo = { bingkai: "#9D174D", latar: "#FDF2F8", aksen: "#BE185D", teduh: "#FCE7F3", ikon: "\u{1F4CB}", judul: "Nota pesanan" };
export const SUARA_INFO_JAHIT = "Ini nota pesanan. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_JAHIT = "Nota pesanan lengkap! Kali dan bagi menjaga besar pecahan.";
