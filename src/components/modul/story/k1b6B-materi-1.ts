import type { AdeganStory } from "./logika-story";
import { ANAK_EMO, OWL, W, deret, emo, judul, kartu, teks, type Titik } from "./k1b6B-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah } from "./k1b6B-bantu";

const baris = (n: number, y: number, x0 = 28, dx = 38): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
const idr = (p: string, a: number, b: number): string[] => Array.from({ length: b - a }, (_, i) => `${p}${a + i}`);

/* ------------------------------ 1. Cerita donat Kira dan Wei ------------------------------ */
const SUARA_C1 = "Sore ini Kira dan Wei membeli donat di toko kue. Igil, si burung hantu, melihat mereka dari dahan pohon.";
const SUARA_C2 = "Kira membeli tujuh donat. Wei membeli enam donat. Mari kita lihat donat mereka.";
const SUARA_C3 = "Berapa jumlah donat Kira dan Wei? Jumlah artinya kedua kumpulan donat digabung menjadi satu.";
const SUARA_C4 = "Hari ini kita belajar menjumlahkan dua bilangan. Hasilnya kurang dari dua puluh. Igil akan menunjukkan beberapa caranya.";
const SUARA_C5 = "Pertama, kita gabungkan semua donat dalam satu piring. Lalu kita hitung jumlahnya.";
const KIRA7 = baris(7, 122);
const WEI6 = baris(6, 164);

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-donat",
  judul: "Kira dan Wei membeli donat",
  sumber: "Materi: cerita donat Kira dan Wei",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Donat Kira dan Wei")),
      tambah("Kira", emo("a-Kira", 60, 66, ANAK_EMO, 30), teks("n-Kira", 60, 86, "Kira", 8.6)),
      tambah("Wei", emo("a-Wei", 150, 66, ANAK_EMO, 30), teks("n-Wei", 150, 86, "Wei", 8.6)),
      tambah("Igil,", emo("a-Igil", 250, 66, OWL, 30), teks("n-Igil", 250, 86, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("tujuh", ...deret("donat", "k", KIRA7, 8), teks("vk", 278, 128, "7", 16, W.merah)),
      tambah("enam", ...deret("donat", "w", WEI6, 8), teks("vw", 278, 170, "6", 16, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("Berapa", emo("tn", 222, 104, "❓", 26)),
      tambah("digabung", ...kartu("gb", 40, 180, 220, 18, W.krem, ["jumlah: donat digabung"], 8.8)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tn", "gb-k", "gb-t0"),
      tambah("Hasilnya", ...kartu("hs", 40, 180, 220, 18, W.langit, ["hasilnya kurang dari 20"], 8.8)),
      sorotkan("Igil", "a-Igil"),
    ),
    k(
      SUARA_C5,
      hapus(0, "hs-k", "hs-t0"),
      redamkan(0, "a-Igil"),
      sorotkan("gabungkan", ...idr("k", 0, 7), ...idr("w", 0, 6)),
      tambah("hitung", emo("ok", 222, 104, "\u{1F449}", 24)),
    ),
  ],
};

/* ------------------------------ 2. Gabung dan hitung semua ------------------------------ */
const SUARA_G1 = "Kita gabung semua donatnya di satu piring besar. Donat Kira dan donat Wei sekarang bergabung.";
const SUARA_G2 = "Sekarang hitung semuanya dari awal, satu per satu. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.";
const SUARA_G3 = "Jumlahnya ada tiga belas donat. Tujuh ditambah enam sama dengan tiga belas.";
const SUARA_G4 = "Tetapi menghitung dari satu itu lama. Kalau donatnya sangat banyak, kita bisa lelah dan keliru.";
const SUARA_G5 = "Ada cara yang lebih cepat. Kita sudah tahu donat Kira ada tujuh. Jadi tidak perlu menghitungnya lagi.";
const SUARA_G6 = "Itu sebabnya hari ini kita belajar beberapa cara yang cepat. Cara pertama adalah menghitung maju.";
const P13: Titik[] = Array.from({ length: 13 }, (_, i) => (i < 7 ? { x: 28 + i * 38, y: 70 } : { x: 28 + (i - 7) * 38, y: 120 }));
const LABEL_G = Array.from({ length: 13 }, (_, i) => `gn${i}`);

export const ADEGAN_GABUNG: AdeganStory = {
  id: "gabung-donat",
  judul: "Gabung dan hitung semua donat",
  sumber: "Materi: gabung dan hitung semua",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gabung semua donat")),
      tambah("piring", { id: "pr", t: "kotak", x: 12, y: 40, w: 276, h: 108, warna: W.krem, garis: W.coklat, rx: 10, tebal: 2, z: -2 }),
      tambah("donat", ...deret("donat", "g", P13, 8)),
    ),
    k(SUARA_G2, ...hitungAksi(SUARA_G2, "g", P13, { setelah: "awal." })),
    k(
      SUARA_G3,
      sorotkan("Jumlahnya", "gn12"),
      tambah("Tujuh", ...kartu("gj", 60, 168, 180, 24, W.emas, ["7 + 6 = 13"], 11)),
    ),
    k(
      SUARA_G4,
      hapus(0, "tg", ...LABEL_G),
      tambah("lelah", emo("lh", 262, 190, "\u{1F613}", 24)),
    ),
    k(
      SUARA_G5,
      hapus(0, "lh", "gj-k", "gj-t0"),
      sorotkan("Kira", ...idr("g", 0, 7)),
      tambah("tujuh.", ...kartu("kr", 40, 168, 220, 24, W.hijauMuda, ["donat Kira: 7, tidak dihitung lagi"], 9)),
    ),
    k(
      SUARA_G6,
      bersih(0),
      tambah(0, judul("Beberapa cara yang cepat")),
      tambah("Cara", ...kartu("c1", 30, 50, 240, 30, W.hijauMuda, ["Cara 1: menghitung maju"], 11)),
      tambah("pertama", emo("ow", 150, 146, OWL, 40)),
      tambah("menghitung", ...kartu("c2", 30, 160, 240, 30, W.langit, ["lalu cara lain menyusul"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Menghitung maju ------------------------------ */
const SUARA_M1 = "Cara pertama adalah menghitung maju. Kita mulai dari bilangan yang pertama, yaitu tujuh. Tidak perlu menghitung dari satu lagi.";
const SUARA_M2 = "Sekarang ketuk donat Wei satu per satu. Setiap ketukan, sebut bilangan berikutnya.";
const SUARA_M3 = "Delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.";
const SUARA_M4 = "Bilangan terakhir yang kita sebut adalah tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas.";
const SUARA_M5 = "Perhatikan, kita hanya menghitung donat Wei, sebanyak enam kali. Donat Kira tidak perlu dihitung ulang.";
const SUARA_M6 = "Ini cara yang cepat. Bilangan yang besar tidak kita hitung lagi, kita langsung maju dari sana.";
const MK7 = baris(7, 62);
const MW6 = baris(6, 122);

export const ADEGAN_MAJU: AdeganStory = {
  id: "hitung-maju",
  judul: "Cara 1: menghitung maju",
  sumber: "Materi: menghitung maju",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Cara 1: menghitung maju")),
      tambah("mulai", ...deret("donat", "k", MK7, 8)),
      tambah("tujuh.", teks("vk", 278, 68, "7", 18, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah("donat", ...deret("donat", "w", MW6, 8)),
      tambah("Wei", { id: "tg", t: "teks", x: MW6[0].x, y: MW6[0].y + 24, isi: "\u{1F446}", u: 20, warna: W.biru }),
    ),
    k(SUARA_M3, ...hitungAksi(SUARA_M3, "w", MW6, { dari: 8, tanganAda: true })),
    k(
      SUARA_M4,
      sorotkan("terakhir", "w5", "wn5"),
      tambah("Jadi", ...kartu("hj", 60, 166, 180, 24, W.emas, ["7 + 6 = 13"], 11)),
    ),
    k(
      SUARA_M5,
      hapus(0, "hj-k", "hj-t0", "tg"),
      redamkan(0, "w5", "wn5"),
      tambah("enam", ...kartu("hm", 40, 166, 220, 24, W.krem, ["mulai 7, maju 6 kali"], 10)),
      sorotkan("Kira", ...idr("k", 0, 7)),
    ),
    k(
      SUARA_M6,
      redamkan(0, ...idr("k", 0, 7)),
      tambah("Ini", emo("ow", 262, 100, OWL, 30)),
      tambah("langsung", emo("pj", 250, 150, "\u{1F449}", 22)),
    ),
  ],
};
