/**
 * Isi Mind-map (Peta Lintasan) dan Infografis (Papan Lomba) Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Mind-map berbentuk sembilan kartu geser: tiap kartu satu rantai Masalah, Cara, Hasil dengan label pendek. Hanya poin pelajaran (tanpa nama tokoh atau benda cerita).
 * Tiga metode global tampak di tiga kartu terakhir dengan nama Indonesia (Cek Kertas Petak, Lipat dan Cocokkan, Pilah Bangun). Label tanpa digit; arti diucapkan guru saat label atau kotak diketuk.
 * Infografis: satu tabel lima baris dari kejadian Story. Data simulasi ada di data-sim.ts. Diuji: scripts/uji-lintasan-k3b4c.mjs.
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

export const KARTU_LINTASAN: readonly KartuPeta[] = [
  kt(
    "Garis tegak lurus",
    ["Bertemu di sudut apa?", "Dua garis bertemu pada sudut apa?"],
    ["Pojok kertas lipat", "Kertas dilipat dua kali supaya punya pojok siku-siku, lalu pojok itu dicocokkan di tempat dua garis bertemu."],
    ["Garis tegak lurus", "Bila pojok kertas pas, dua garis itu disebut garis tegak lurus."],
    ["masalah"],
  ),
  kt(
    "Lambang tegak lurus",
    ["Cara menulisnya?", "Bagaimana menuliskan dua garis yang tegak lurus?"],
    ["Lambang T terbalik", "Garis tegak lurus ditulis dengan lambang yang seperti huruf T terbalik di antara nama kedua garis."],
    ["Dibaca tegak lurus", "Tulisan itu dibaca, garis pertama tegak lurus garis kedua."],
  ),
  kt(
    "Garis sejajar",
    ["Tidak pernah bertemu?", "Bagaimana dua garis yang tidak pernah bertemu?"],
    ["Jarak selalu sama", "Dua garis yang jaraknya selalu sama, di mana pun diukur, tidak akan bertemu walaupun diperpanjang."],
    ["Garis sejajar", "Dua garis seperti itu disebut garis sejajar dan ditulis dengan dua garis miring."],
  ),
  kt(
    "Memeriksa garis sejajar",
    ["Sejajar atau bukan?", "Bagaimana memeriksa dua garis sejajar atau bukan?"],
    ["Cek jarak kedua ujung", "Jarak kedua garis diukur di ujung yang satu dan di ujung yang lain."],
    ["Jarak sama berarti sejajar", "Bila jaraknya sama, garis sejajar. Bila berbeda, garis tidak sejajar walaupun tampak tidak bertemu."],
  ),
  kt(
    "Segitiga",
    ["Bangun bersisi tiga?", "Bangun apa yang punya tiga sisi lurus?"],
    ["Hitung sisi dan sudut", "Sisi lurus dan sudut bangun dihitung satu per satu."],
    ["Segitiga", "Bangun dengan tiga sisi dan tiga sudut disebut segitiga."],
  ),
  kt(
    "Persegi panjang dan persegi",
    ["Bangun bersisi empat?", "Bangun apa yang punya empat sisi dan empat sudut siku-siku?"],
    ["Periksa pojok dan sisi", "Pojok kertas dicocokkan di tiap sudut, lalu panjang sisinya dibandingkan."],
    ["Persegi panjang atau persegi", "Empat sisi dan empat sudut siku-siku disebut persegi panjang, dan bila keempat sisinya sama panjang disebut persegi."],
  ),
  kt(
    "Cara pintar: Cek Kertas Petak",
    ["Garis tampak sejajar?", "Bagaimana memastikan dua garis sejajar?"],
    ["Cek Kertas Petak", "Dua garis ditaruh pada kertas berpetak, lalu petak di antara keduanya dihitung di kedua ujung."],
    ["Jarak dibandingkan", "Jarak di kedua ujung dibandingkan untuk memutuskan garis sejajar atau bukan."],
  ),
  kt(
    "Cara pintar: Lipat dan Cocokkan",
    ["Garis tampak tegak?", "Bagaimana memastikan dua garis tegak lurus tanpa alat ukur?"],
    ["Lipat dan Cocokkan", "Kertas dilipat dua kali, lalu pojoknya dicocokkan dengan tempat dua garis bertemu."],
    ["Pojok pas, tegak lurus", "Bila pojok pas, garisnya tegak lurus. Bila tidak pas, garisnya bukan tegak lurus."],
  ),
  kt(
    "Cara pintar: Pilah Bangun",
    ["Bangun apa ini?", "Bagaimana menyebut nama sebuah bangun datar?"],
    ["Pilah Bangun", "Bangun dipilah menurut banyak sisi dan sudutnya, dan lingkaran dibatasi satu garis lengkung tanpa sudut."],
    ["Nama dari ciri", "Nama bangun disebut dari cirinya: segitiga, persegi panjang, persegi, atau lingkaran."],
  ),
];

export const TEMA_KARTU_LINTASAN: TemaPeta = { bingkai: "#C2410C", ikon: "\u{1F4E3}", judul: "Peta lintasan lomba", latar: "#FFF7ED", garisLatar: "#FB923C" };
/** Peta radial awal (tanpa kata): bendera finis di tengah, satu gambar per kartu. */
export const RINGKASAN_LINTASAN: RingkasanPeta = {
  pusat: "\u{1F3C1}",
  ikon: ["\u{1F4D0}", "\u{270D}\u{FE0F}", "\u{1F4CF}", "\u{1F9F5}", "\u{1F53A}", "\u{1F7E6}", "\u{1F5FA}\u{FE0F}", "\u{1F4C4}", "\u{1F9E9}"],
  suara: "Ini peta lintasan lomba. Bendera finis ada di tengah, dan sembilan gambar mengelilinginya. Ketuk satu gambar untuk membuka kartunya. Centang hijau berarti kartunya selesai.",
};
export const SUARA_KARTU_LINTASAN =
  "Ini peta lintasan lomba. Ada sembilan kartu. Tiap kartu punya tiga kotak: masalah, cara, dan hasil. Kotak bertanda contoh sudah terisi, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_KARTU_LINTASAN = "Semua kartu lengkap! Dari masalah, lewat cara, sampai hasil.";

/* ------------------------------ Infografis: papan lomba (satu tabel lima baris) ------------------------------ */
export const KOLOM_INFO_LINTASAN = ["Yang dikerjakan", "Hasilnya", "Cirinya"] as const;
const bi = (ikon: string, nama: string, a: string, b: string, c: string, contoh: number[]): BarisInfo => ({ ikon, nama, isi: [{ t: a }, { t: b }, { t: c }], contoh });
export const BARIS_INFO_LINTASAN: readonly BarisInfo[] = [
  bi("\u{1F4D0}", "Garis tegak lurus", "Cek pojok kertas", "Pojok pas", "Sudut siku-siku", [0, 1, 2]),
  bi("\u{1F4CF}", "Garis sejajar", "Cek jarak ujung", "Jarak sama", "Tidak pernah bertemu", []),
  bi("\u{1F53A}", "Segitiga", "Hitung sisi dan sudut", "Tiga sisi", "Tiga sudut", []),
  bi("\u{1F7E6}", "Persegi panjang dan persegi", "Periksa pojok dan sisi", "Empat sisi", "Empat sudut siku-siku", []),
  bi("\u{2B55}", "Lingkaran", "Lihat garis tepi", "Garis lengkung", "Tanpa sudut", []),
];
export const TEMA_INFO_LINTASAN: TemaInfo = { bingkai: "#C2410C", latar: "#FFF7ED", aksen: "#EA580C", teduh: "#FFEDD5", ikon: "\u{1F4CB}", judul: "Papan lomba" };
export const SUARA_INFO_LINTASAN = "Ini papan lomba. Ada lima baris, satu baris satu kejadian dari cerita. Isi yang dikerjakan, hasilnya, dan cirinya. Baris pertama sudah terisi penuh sebagai contoh. Ketuk label, lalu ketuk kotak yang cocok.";
export const SELESAI_INFO_LINTASAN = "Papan lomba lengkap! Pojok pas berarti tegak lurus, jarak sama berarti sejajar, dan bangun disebut dari cirinya.";
