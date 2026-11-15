import type { AdeganStory } from "./logika-story";
import { OWL, W, bagian, bagikan, emo, hbAtas, idKartu, idPilihan, istilah, jumlahBagian, judul, kartu, namaIstilah, pilihKata, teks, tumpukan } from "./k3b1G-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1G-bantu";

/* ------------------------------ 15. Latihan 1: tiap anak dapat berapa ------------------------------ */
const SUARA_A1 = "Latihan satu. Upe punya dua puluh apel untuk dibagi sama banyak ke empat anak.";
const SUARA_A2 = "Berapa apel yang didapat tiap anak? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Lima apel, sebab dua puluh dibagi empat sama dengan lima.";
const SUARA_A4 = "Kita periksa dengan kali. Lima kali empat sama dengan dua puluh.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: tiap anak dapat berapa?",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_A1, "dua"), ...tumpukan("apel", 20)), tambah(idx(SUARA_A1, "empat"), ...bagian(["Malosi", "Kira", "Wei", "Halim"]))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), teks("tanya", 150, 124, "tiap bagian dapat berapa?", 11, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(134, ["4", "5", "6"], 16))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c2-k"), tambah(idx(SUARA_A3, "dua"), hbAtas("20 : 4 = 5"))),
    k(
      SUARA_A4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      ubah(idx(SUARA_A4, "Lima"), bagikan("apel", 4, 1, 20)),
      tambah(idx(SUARA_A4, "Lima"), ...[0, 1, 2, 3].map((g) => jumlahBagian(g, 4, 5))),
      tambah(idx(SUARA_A4, "empat"), teks("pr", 150, 66, "5 × 4 = 20", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 16. Latihan 2: mana pembagi ------------------------------ */
const SUARA_B1 = "Latihan dua. Lihat pembagian dua puluh delapan dibagi tujuh sama dengan empat.";
const SUARA_B2 = "Apa pembagi pada pembagian itu? Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Tujuh adalah pembagi, sebab tujuh adalah banyak bagian yang menerima.";
const SUARA_B4 = "Dua puluh delapan adalah bilangan yang dibagi, dan empat adalah hasil bagi.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: mana pembagi?",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_B1, "pembagian"), ...istilah(28, 7, 4))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Apa"), teks("tanya", 150, 124, "pembagi pada 28 : 7 = 4?", 11, W.ungu)), tambah(idx(SUARA_B2, "jawaban"), ...pilihKata(134, ["4", "28", "7"], 16))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c3-k"), tambah(idx(SUARA_B3, "Tujuh"), namaIstilah("b", "pembagi"))),
    k(
      SUARA_B4,
      redamkan(0, "c3-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_B4, "bilangan"), namaIstilah("a", "yang dibagi")),
      tambah(idx(SUARA_B4, "hasil"), namaIstilah("c", "hasil bagi")),
    ),
  ],
};

/* ------------------------------ 17. Latihan 3: periksa dengan kali ------------------------------ */
const SUARA_C1 = "Latihan tiga. Upe tahu dua puluh empat dibagi enam sama dengan empat.";
const SUARA_C2 = "Berapa kali enam sama dengan dua puluh empat? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Empat kali enam sama dengan dua puluh empat.";
const SUARA_C4 = "Kali dan bagi berkaitan, jadi pembagian bisa diperiksa dengan perkalian.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: periksa dengan kali",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_C1, "dua"), teks("hb2", 150, 56, "24 : 6 = 4", 18, W.merah))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Berapa"), teks("tanya", 150, 100, "? × 6 = 24", 14, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(112, ["3", "4", "5"], 16))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c2-k"), tambah(idx(SUARA_C3, "Empat"), teks("pr", 150, 165, "4 × 6 = 24", 12, W.ungu))),
    k(SUARA_C4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_C4, "Kali"), ...kartu("kk", 40, 100, 220, 30, W.emas, ["kali dan bagi berkaitan"], 12))),
  ],
};

/* ------------------------------ 18. Penutup ------------------------------ */
const SUARA_E1 = "Hebat! Kita sudah belajar pembagian. Igil mengajak kita mengingat lagi bersama.";
const SUARA_E2 = "Pertama, membagi berarti memberi sama banyak kepada beberapa bagian.";
const SUARA_E3 = "Kedua, pembagian adalah pengurangan berulang sampai habis. Banyak pengurangan itulah hasil bagi.";
const SUARA_E4 = "Ketiga, kali dan bagi berpasangan. Kita bisa memeriksa hasil bagi dengan perkalian.";
const SUARA_E5 = "Sekarang kamu sudah bisa membagi sampai seratus. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_E1, "belajar"), emo("ow", 150, 62, OWL, 36)), tambah(idx(SUARA_E1, "mengajak"), ...kartu("r0", 14, 80, 272, 26, W.emas, ["tiga hal tentang pembagian"], 11))),
    k(SUARA_E2, hapus(0, ...idKartu("r0")), tambah(idx(SUARA_E2, "Pertama,"), ...kartu("r1", 14, 70, 272, 30, W.hijauMuda, ["1. bagi sama banyak"], 11))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "Kedua,"), ...kartu("r2", 14, 106, 272, 38, W.langit, ["2. kurangi berulang sampai nol", "banyak pengurangan = hasil bagi"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Ketiga,"), ...kartu("r3", 14, 150, 272, 38, W.pink, ["3. kali dan bagi berpasangan", "periksa hasil bagi dengan kali"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_E5, "membagi"), emo("rk", 150, 160, "✅", 30))),
  ],
};
