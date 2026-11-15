import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, benda, bola, emo, judul, kartu, kotakBenda, panah, teks } from "./k2b4A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b4A-bantu";

/* ------------------------------ 14. Latihan 1: bola di sebelah mana kotak ------------------------------ */
const SUARA_L1 = "Latihan satu. Wei melihat sebuah bola dan sebuah kotak di layar.";
const SUARA_L2 = "Bola ada di sebelah mana kotak? Ketuk jawaban yang tepat.";
const SUARA_L3 = "Betul! Bola ada di sebelah kiri kotak. Hebat!";
const SUARA_L4 = "Ingat, kiri dan kanan kita lihat dari arah kita sendiri. Jangan terburu-buru.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: bola di sebelah mana kotak",
  sumber: "Materi: latihan kata posisi",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_L1, "bola"), bola(76, 96, 14)), tambah(idx(SUARA_L1, "kotak"), kotakBenda(196, 96, 56, 44))),
    k(SUARA_L2, tambah(idx(SUARA_L2, "jawaban"), ...pilihKata(150, ["atas", "kiri", "bawah"], 13))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k"), tambah(idx(SUARA_L3, "Hebat!"), emo("ow", 150, 196, OWL, 16))),
    k(SUARA_L4, hapus(0, "ow"), tambah(idx(SUARA_L4, "arah"), emo("mt", 150, 70, "\u{1F440}", 24))),
  ],
};

/* ------------------------------ 15. Latihan 2: siapa di sebelah kiri Kira ------------------------------ */
const SUARA_M1 = "Latihan dua. Igil melihat empat anak berderet di layar.";
const SUARA_M2 = "Siapa yang ada di sebelah kiri Kira? Ketuk jawaban yang tepat.";
const SUARA_M3 = "Betul! Wei ada di sebelah kiri Kira. Hebat!";
const SUARA_M4 = "Sekarang, siapa yang ada di sebelah kanan Kira? Upe ada di sebelah kanan Kira.";
/** Empat anak berderet dari kiri ke kanan. */
export const URUT_LATIHAN_DUA = ["malosi", "wei", "kira", "upe"];
export const X_LATIHAN_DUA = [60, 120, 180, 240];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: siapa di sebelah kiri Kira",
  sumber: "Materi: latihan kanan dan kiri siapa",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_M1, "anak"), ...URUT_LATIHAN_DUA.flatMap((s, i) => anak(s, X_LATIHAN_DUA[i], 66))),
    ),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "Kira?"), "ob-kira"), tambah(idx(SUARA_M2, "jawaban"), ...pilihKata(150, ["Malosi", "Wei", "Upe"], 11))),
    k(SUARA_M3, redamkan(0, "ob-kira"), sorotkan(idx(SUARA_M3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_M3, "Wei"), "ob-wei"), tambah(idx(SUARA_M3, "Hebat!"), emo("ow", 150, 196, OWL, 16))),
    k(
      SUARA_M4,
      hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t", "ow"),
      redamkan(0, "ob-wei"),
      sorotkan(idx(SUARA_M4, "Kira?"), "ob-kira"),
      tambah(idx(SUARA_M4, "Upe"), panah("pu", 186, 38, 54, 0)),
      sorotkan(idx(SUARA_M4, "Upe"), "ob-upe"),
    ),
  ],
};

/* ------------------------------ 16. Latihan 3: lengkapi kalimat berlawanan ------------------------------ */
const SUARA_N1 = "Latihan tiga. Igil melihat boneka dan kursi di layar. Boneka ada di atas kursi.";
const SUARA_N2 = "Jadi kursi ada di sebelah mana boneka? Ketuk kata yang tepat.";
const SUARA_N3 = "Betul! Kursi ada di bawah boneka. Hebat!";
const SUARA_N4 = "Ingat, kalau satu kata sudah kita tahu, lawannya pasti ketemu.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lengkapi kalimat berlawanan",
  sumber: "Materi: latihan kata berlawanan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_N1, "boneka"), benda("boneka", 150, 66, 34)), tambah(idx(SUARA_N1, "kursi"), benda("kursi", 150, 122, 40))),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "kursi"), "ob-kursi"), tambah(idx(SUARA_N2, "kata"), ...pilihKata(164, ["atas", "bawah", "kanan"], 13))),
    k(SUARA_N3, redamkan(0, "ob-kursi"), sorotkan(idx(SUARA_N3, "Betul!"), "c2-k"), tambah(idx(SUARA_N3, "Hebat!"), emo("ow", 262, 100, OWL, 16))),
    k(SUARA_N4, hapus(0, "ow"), tambah(idx(SUARA_N4, "lawannya"), teks("lw", 232, 104, "↕", 28, W.merah), teks("lx", 232, 124, "berlawanan", 8.6, W.ungu))),
  ],
};

/* ------------------------------ 17. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang posisi benda.";
const SUARA_Z2 = "Pertama, enam kata posisi, yaitu atas, bawah, depan, belakang, kanan, dan kiri.";
const SUARA_Z3 = "Kedua, kanan dan kiri pada gambar kita lihat dari arah kita sendiri.";
const SUARA_Z4 = "Ketiga, gabungkan dua petunjuk posisi untuk menemukan satu benda.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga hal tentang", "posisi benda"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["enam kata posisi:", "atas, bawah, depan, belakang, kanan, kiri"], 8.6))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["kanan dan kiri pada gambar", "dilihat dari arah kita"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["gabungkan dua petunjuk", "untuk menemukan satu benda"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};

