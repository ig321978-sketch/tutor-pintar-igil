/**
 * Mind-map Kelas 3 Bab 5 Sub-Bab A (Mengurutkan dan Membandingkan Data) berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek.
 * Hanya poin pelajaran (tanpa nama tokoh atau benda cerita). Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Garis Urutan, Cek Jangkauan, Hitung Turus).
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

export const KARTU_PAPAN: readonly KartuPeta[] = [
  kt("Data", ["Angkanya berserakan?", "Bagaimana mengatur angka yang berserakan di papan catatan?"], ["Dikumpulkan", "Angka yang dicatat dikumpulkan menjadi satu kumpulan."], ["Itu data", "Kumpulan bilangan hasil pencatatan disebut data."], ["masalah"]),
  kt("Mengurutkan", ["Mana yang kecil?", "Bagaimana mengetahui bilangan yang kecil dan yang besar?"], ["Diurutkan", "Data ditulis ulang dari yang terkecil ke yang terbesar."], ["Kecil ke besar", "Data yang berurutan dari kecil ke besar mudah dibaca."]),
  kt("Terkecil dan terbesar", ["Ujungnya yang mana?", "Data mana yang paling kecil dan paling besar?"], ["Lihat ujung", "Setelah diurutkan, lihat kedua ujungnya."], ["Terkecil, terbesar", "Ujung kiri adalah data terkecil dan ujung kanan adalah data terbesar."]),
  kt("Jangkauan", ["Seberapa jauh bedanya?", "Seberapa jauh selisih data terkecil dan data terbesar?"], ["Dikurangkan", "Data terbesar dikurangi data terkecil."], ["Jangkauan didapat", "Selisih itu disebut jangkauan."]),
  kt("Membandingkan", ["Mana yang lebih banyak?", "Bagaimana membandingkan dua data?"], ["Dicari selisihnya", "Kurangkan bilangan yang besar dengan bilangan yang kecil."], ["Lebih banyak, lebih sedikit", "Bilangan yang besar lebih banyak, bilangan yang kecil lebih sedikit, dan selisihnya menunjukkan bedanya."]),
  kt("Turus dan banyak", ["Menghitung lalu lupa?", "Bagaimana menghitung data yang datang satu per satu tanpa lupa?"], ["Satu garis, satu data", "Tiap data dicatat dengan satu garis tegak, dan garis kelima mencoret miring."], ["Banyak didapat", "Banyak data didapat dari bundel lima ditambah garis sisanya."]),
  kt("Cara pintar: Garis Urutan", ["Ada yang terlewat?", "Bagaimana memastikan tidak ada bilangan yang terlewat?"], ["Garis Urutan", "Taruh tiap bilangan pada garis dari yang terkecil di kiri sampai yang terbesar di kanan."], ["Ujung langsung tampak", "Titik paling kiri dan paling kanan langsung menunjukkan data terkecil dan terbesar."]),
  kt("Cara pintar: Cek Jangkauan", ["Yakin hitungannya benar?", "Bagaimana memastikan jangkauan tidak keliru?"], ["Cek Jangkauan", "Tambahkan jangkauan kembali ke data terkecil."], ["Harus sama", "Hasilnya harus sama dengan data terbesar, kalau tidak hitung ulang."]),
  kt("Cara pintar: Hitung Turus", ["Terhitung dua kali?", "Bagaimana menghitung banyak data tanpa terhitung dua kali?"], ["Hitung Turus", "Catat tiap data dengan satu garis, hitung bundelnya, lalu garis sisanya."], ["Banyak tepat", "Tidak ada data yang terlewat atau terhitung dua kali."]),
];

export const TEMA_KARTU_PAPAN: TemaPeta = { bingkai: "#92400E", ikon: "\u{1F6B2}", judul: "Catatan Pak Hasan", latar: "#FEF3C7", garisLatar: "#B45309" };
/** Peta radial awal (tanpa kata): sepeda di tengah, satu gambar per kartu. */
export const RINGKASAN_PAPAN: RingkasanPeta = {
  pusat: "\u{1F6B2}",
  ikon: ["\u{1F4C4}", "\u{1F522}", "\u{1F4CF}", "\u{2796}", "\u{2696}", "\u{1F4DD}", "\u{27A1}", "\u{1F501}", "\u{270F}"],
  suara: "Ini peta mengurutkan dan membandingkan data. Gambar sepeda ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_PAPAN =
  "Ini catatan Pak Hasan. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_PAPAN = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: daftar sepeda (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_PAPAN = ["Yang dikerjakan", "Hasilnya", "Katanya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_PAPAN: readonly BarisInfo[] = [
  bi("\u{1F522}", "Mengurutkan data", "Tulis ulang", "Kecil ke besar", "Data berurutan", [0, 1, 2]),
  bi("\u{1F4CF}", "Mencari ujung", "Lihat kedua ujung", "Terkecil, terbesar", "Ujung langsung tampak", []),
  bi("\u{2796}", "Menghitung jangkauan", "Kurangkan ujung", "Selisih didapat", "Besar dikurangi kecil", []),
  bi("\u{1F501}", "Memeriksa jangkauan", "Tambahkan kembali", "Sama dengan terbesar", "Salah langsung ketahuan", []),
  bi("\u{1F4DD}", "Menghitung turus", "Satu garis satu data", "Bundel dan sisa", "Garis kelima miring", []),
];
export const TEMA_INFO_PAPAN: TemaInfo = { bingkai: "#1E3A8A", latar: "#EFF6FF", aksen: "#1D4ED8", teduh: "#DBEAFE", ikon: "\u{1F4CB}", judul: "Daftar sepeda" };
export const SUARA_INFO_PAPAN = "Ini daftar sepeda. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan katanya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_PAPAN = "Daftar sepeda lengkap! Urutkan, cari ujung, dan hitung turus.";
