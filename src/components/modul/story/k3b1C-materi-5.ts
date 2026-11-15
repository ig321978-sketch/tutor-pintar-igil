import type { AdeganStory } from "./logika-story";
import { OWL, W, arah, emo, judul, kartu, kartuBil, papan, tanda, teks } from "./k3b1C-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihBaris, pilihKata, pindah, redamkan, slotX, sorotkan, tambah } from "./k3b1C-bantu";

/* ------------------------------ 15. Latihan 1: memilih tanda ------------------------------ */
const SUARA_A1 = "Latihan satu. Papan kiri berisi empat ratus lima puluh enam, papan kanan berisi empat ratus enam puluh lima.";
const SUARA_A2 = "Tanda apa yang tepat di antara dua bilangan ini? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Ratusannya sama. Lima kurang dari enam, jadi empat ratus lima puluh enam kurang dari empat ratus enam puluh lima.";
const SUARA_A4 = "Mulut tanda kurang dari terbuka ke bilangan yang lebih besar, yaitu papan kanan.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: memilih tanda",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_A1, "kiri"), ...papan("a", 456)), tambah(idx(SUARA_A1, "kanan"), ...papan("b", 465))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Tanda"), teks("tanya", 150, 128, "tanda yang tepat?", 12, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(136, ["<", ">", "="], 20))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c1-k"), tambah(idx(SUARA_A3, "jadi"), tanda("<"))),
    k(SUARA_A4, redamkan(0, "c1-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_A4, "Mulut"), ...kartu("ml", 40, 138, 220, 30, W.emas, ["mulut tanda ke yang lebih besar"], 11))),
  ],
};

/* ------------------------------ 16. Latihan 2: paling kecil ------------------------------ */
const SUARA_B1 = "Latihan dua. Halim memegang tiga kartu bilangan, yaitu tiga ratus lima puluh dua, tiga ratus dua puluh lima, dan lima ratus dua puluh tiga.";
const SUARA_B2 = "Bilangan mana yang paling kecil? Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Tiga ratus dua puluh lima paling kecil. Lihat, dua kurang dari lima pada tempat puluhan.";
const SUARA_B4 = "Kartu lima ratus dua puluh tiga paling besar, sebab ratusannya lima.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: bilangan paling kecil",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_B1, "tiga", 2), ...kartuBil(0, slotX(0), 50, 352)),
      tambah(idx(SUARA_B1, "tiga", 3), ...kartuBil(1, slotX(1), 50, 325)),
      tambah(idx(SUARA_B1, "lima", 3), ...kartuBil(2, slotX(2), 50, 523)),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Bilangan"), teks("tanya", 150, 112, "paling kecil yang mana?", 12, W.ungu)), tambah(idx(SUARA_B2, "jawaban"), ...pilihKata(120, ["352", "325", "523"], 16))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_B3, "Tiga"), "bk1-k")),
    k(SUARA_B4, redamkan(0, "c2-k", "bk1-k"), hapus(0, "tanya", ...idPilihan(3)), sorotkan(idx(SUARA_B4, "lima"), "bk2-k"), tambah(idx(SUARA_B4, "ratusannya"), emo("bs", 150, 150, "\u{1F451}", 34))),
  ],
};

/* ------------------------------ 17. Latihan 3: urutan naik ------------------------------ */
const SUARA_C1 = "Latihan tiga. Igil punya tiga kartu bilangan, yaitu delapan ratus empat puluh, delapan ratus empat, dan empat ratus delapan puluh.";
const SUARA_C2 = "Urutan naik yang mana? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Mulai dari yang terkecil, yaitu empat ratus delapan puluh, delapan ratus empat, lalu delapan ratus empat puluh.";
const SUARA_C4 = "Empat ratus delapan puluh paling kecil karena ratusannya empat. Delapan ratus empat kurang dari delapan ratus empat puluh karena puluhannya nol.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: urutan naik",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_C1, "delapan"), ...kartuBil(0, slotX(0), 44, 840)),
      tambah(idx(SUARA_C1, "delapan", 2), ...kartuBil(1, slotX(1), 44, 804)),
      tambah(idx(SUARA_C1, "dan"), ...kartuBil(2, slotX(2), 44, 480)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Urutan"), teks("tanya", 150, 100, "urutan naik yang mana?", 12, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihBaris(108, ["480, 804, 840", "840, 804, 480", "804, 480, 840"], 13))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c1-k")),
    k(
      SUARA_C4,
      redamkan(0, "c1-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      pindah(idx(SUARA_C4, "Empat"), 2, slotX(0)),
      pindah(idx(SUARA_C4, "Delapan", 2), 1, slotX(1)),
      pindah(idx(SUARA_C4, "delapan", 3), 0, slotX(2)),
      tambah(idx(SUARA_C4, "karena"), arah("urutan naik", 130)),
    ),
  ],
};

/* ------------------------------ 18. Penutup ------------------------------ */
const SUARA_E1 = "Wah, kita sudah belajar membandingkan dan mengurutkan bilangan. Igil mengajak kita mengingat lagi bersama.";
const SUARA_E2 = "Pertama, bandingkan ratusannya dahulu. Bila sama, lanjut ke puluhan, lalu satuan.";
const SUARA_E3 = "Kedua, catat hasilnya dengan tanda kurang dari, lebih dari, atau sama dengan.";
const SUARA_E4 = "Ketiga, urutan naik dimulai dari yang terkecil, dan urutan turun dimulai dari yang terbesar.";
const SUARA_E5 = "Hebat! Sekarang kamu sudah bisa membandingkan dan mengurutkan bilangan tiga angka. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_E1, "belajar"), emo("ow", 150, 62, OWL, 36)), tambah(idx(SUARA_E1, "mengajak"), ...kartu("r0", 14, 80, 272, 26, W.emas, ["tiga hal yang kita pelajari"], 11))),
    k(SUARA_E2, hapus(0, ...idKartu("r0")), tambah(idx(SUARA_E2, "Pertama,"), ...kartu("r1", 14, 70, 272, 30, W.hijauMuda, ["1. ratusan, puluhan, lalu satuan"], 11))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "Kedua,"), ...kartu("r2", 14, 106, 272, 38, W.langit, ["2. tanda: <, >, atau =", "mulut ke yang lebih besar"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Ketiga,"), ...kartu("r3", 14, 150, 272, 38, W.pink, ["3. urutan naik: terkecil dulu", "urutan turun: terbesar dulu"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_E5, "membandingkan"), emo("rk", 150, 160, "✅", 30))),
  ],
};
