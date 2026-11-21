import type { AdeganStory } from "./logika-story";
import { E, K, W, bagianKain, emo, garis, judul, kotak, papanTulis, serambi, teks, tokoh } from "./k4b2a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2a-bantu";

/*
 * Cerita orisinal IGIL "Kain Lipat Bu Wulan" (Kelas 4 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2a.md. Bagian ini: pembuka (keranjang kain), Unit Fraction Strip (Pita Pecahan), dan terapannya.
 */

export const NAMA_METODE = ["Unit Fraction Strip", "Fold the Paper", "Fraction Number Line"] as const;
export const NAMA_METODE_ID = ["Pita Pecahan", "Lipat Kertas", "Garis Pecahan"] as const;

const MALAM = "#312E81";
const WARNA_POTONG = ["#FBCFE8", "#C4B5FD", "#FDE68A"];
/** Judul adegan malam berwarna krem supaya terbaca di latar gelap. */
const judulMalam = (isi: string) => judul(isi, W.krem);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di serambi sanggar, Bu Wulan membuka keranjang kain yang berisi potongan dalam berbagai ukuran.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pecahan pembilang satu mudah dibandingkan, tanpa tertukar.";
const SUARA_O3 = "Tiga cara itu: Unit Fraction Strip, Fold the Paper, dan Fraction Number Line.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pita Pecahan, Lipat Kertas, dan Garis Pecahan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Keranjang kain Bu Wulan",
  sumber: "Metode global: pembuka",
  latar: MALAM,
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judulMalam("Malam di Serambi"), ...serambi("tr", 150), emo("bl", 262, 44, "\u{1F319}", 26)),
      tambah("Bu", ...tokoh("bw", 60, 184, "Bu Wulan")),
      tambah("keranjang", kotak("kb", 170, 120, 84, 30, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 166, 110, 92, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("berisi", ...[0, 1, 2].map((i) => kotak(`ks${i}`, 178 + i * 24, 96 + (i % 2) * 4, 20, 14, WARNA_POTONG[i], W.biru, { rx: 2, tebal: 1, z: 1 }))),
      tambah("ukuran.", teks("nt", 212, 86, "potongan kain", 8, W.krem)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 110, 70, "3 cara", 12, W.krem)),
      tambah("cara", ...[0, 1, 2].map((i) => [kotak(`c${i}-k`, 96 + i * 34, 84, 28, 26, WARNA_POTONG[i], W.biru, { rx: 4 }), teks(`c${i}-t`, 110 + i * 34, 101, "cara", 6.4, W.biru)]).flat()),
      tambah("pembilang", teks("pb", 230, 76, "pembilang 1", 8, W.krem)),
      tambah("tertukar.", emo("xs", 240, 100, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judulMalam("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.krem)),
      tambah("Unit", teks("m0", 112, 70, "1. Unit Fraction Strip", 10, W.krem), emo("i0", 30, 72, "\u{1F380}", 16)),
      tambah("Fold", teks("m1", 112, 120, "2. Fold the Paper", 10, W.krem), emo("i1", 30, 122, "\u{1F458}", 16)),
      tambah("Fraction", teks("m2", 112, 170, "3. Fraction Number Line", 10, W.krem), emo("i2", 30, 172, "\u{1F4CF}", 16)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", kotak("bk", 196, 52, 100, 130, "#4338CA", W.krem, { rx: 6, tebal: 1, z: -1 })),
      tambah("Pita", teks("g0", 246, 70, "Pita Pecahan", 9, K.kapurMerah)),
      tambah("Lipat", teks("g1", 246, 120, "Lipat Kertas", 9, K.kapurMerah)),
      tambah("Garis", teks("g2", 246, 170, "Garis Pecahan", 9, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Unit Fraction Strip: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Unit Fraction Strip, atau Pita Pecahan.";
const SUARA_C2 = "Kita menyiapkan pita-pita sama panjang, lalu membagi tiap pita menjadi bagian sama besar.";
const SUARA_C3 = "Satu pita utuh, satu pita dibagi dua, satu pita dibagi empat, dan seterusnya, ditumpuk berurutan.";
const SUARA_C4 = "Dengan pita, kita bisa melihat langsung bagian mana yang lebih panjang.";

export const ADEGAN_LUAR_PITA: AdeganStory = {
  id: "luar-pita",
  judul: "Unit Fraction Strip: Pita Pecahan",
  sumber: "Metode global: Unit Fraction Strip (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Unit Fraction Strip"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Unit", teks("nm", 150, 56, "Unit Fraction Strip", 13, K.kapurMerah)),
      tambah("Pita", teks("ni", 150, 76, "Pita Pecahan", 11, K.kapur), ...bagianKain("q1", 40, 90, 220, 18, 1, [])),
    ),
    k(
      SUARA_C2,
      tambah("pita-pita", ...bagianKain("q2", 40, 112, 220, 18, 1, []), ...bagianKain("q3", 40, 134, 220, 14, 1, [])),
      tambah("sama", teks("sp", 150, 86, "sama panjang", 8, K.kapur)),
      sorotkan("tiap", "q1", "q2", "q3"),
    ),
    k(
      SUARA_C3,
      hapus(0, "sp"),
      tambah("utuh,", teks("w1", 22, 102, "1", 9, K.kapur)),
      tambah("dibagi", ...bagianKain("q2", 40, 112, 220, 18, 2, [0]), teks("w2", 22, 124, "1/2", 9, K.kapur)),
      tambah("empat,", ...bagianKain("q3", 40, 134, 220, 14, 4, [0]), teks("w4", 22, 145, "1/4", 9, K.kapur)),
      sorotkan("berurutan.", "q1", "q2", "q3"),
    ),
    k(
      SUARA_C4,
      tambah("pita,", emo("my", 272, 56, E.mata, 18)),
      tambah("langsung", garis("g4", 95, 106, 0, 44, K.kapurMerah, 1.6, { putus: true }), garis("g2", 150, 106, 0, 44, K.kapurBiru, 1.6, { putus: true })),
      tambah("panjang.", teks("lp", 236, 84, "yang lebih panjang", 8, K.kapur)),
    ),
  ],
};

/* ------------------------------ Unit Fraction Strip: terapan ------------------------------ */
const SUARA_D1 = "Laras menumpuk pita satu per empat di atas pita satu per delapan.";
const SUARA_D2 = "Pita satu per empat ternyata dua kali lebih panjang daripada pita satu per delapan.";
const SUARA_D3 = "Cocok untuk membandingkan dua pecahan dengan cepat, karena panjangnya tampak jelas.";
const SUARA_D4 = "Kurang cocok kalau penyebutnya sangat besar, karena pitanya terlalu pendek untuk dilihat.";

export const ADEGAN_LUAR_PITA_TERAPAN: AdeganStory = {
  id: "luar-pita-terapan",
  judul: "Pita Pecahan: kapan cocok",
  sumber: "Metode global: Unit Fraction Strip (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Pita Pecahan Laras"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras")),
      tambah("pita", ...bagianKain("a4", 40, 60, 220, 18, 4, [0]), teks("l4", 22, 72, "1/4", 9, K.kapur)),
      tambah("satu@2", ...bagianKain("a8", 40, 92, 220, 18, 8, [0]), teks("l8", 22, 104, "1/8", 9, K.kapur)),
    ),
    k(
      SUARA_D2,
      tambah("empat", garis("g4", 95, 56, 0, 66, K.kapurMerah, 1.6, { putus: true }), garis("g8", 67.5, 56, 0, 66, K.kapurBiru, 1.6, { putus: true })),
      tambah("dua", ...bagianKain("a8", 40, 92, 220, 18, 8, [0, 1]), teks("kl", 150, 134, "2 kali lebih panjang", 9, K.kapurBiru)),
    ),
    k(
      SUARA_D3,
      hapus(0, "kl"),
      tambah("Cocok", emo("ok", 28, 50, E.benar, 20)),
      tambah("dua", teks("bd", 150, 46, "bandingkan 2 pecahan", 9, K.kapur)),
      tambah("cepat,", emo("cp", 272, 50, "\u{1F680}", 18)),
      sorotkan("jelas.", "a4-c0", "a8-c0", "a8-c1"),
    ),
    k(
      SUARA_D4,
      hapus(0, "ok", "bd", "cp", "g4", "g8"),
      tambah("Kurang", emo("xs", 28, 50, E.salah, 20)),
      tambah("sangat", teks("sg", 150, 50, "1/50", 14, K.kapurMerah), kotak("pk", 150, 122, 3, 14, K.kapurMerah, undefined, { rx: 0, tebal: 0, z: 3 })),
      tambah("pendek", teks("tp", 150, 146, "terlalu pendek", 9, K.kapur)),
    ),
  ],
};
