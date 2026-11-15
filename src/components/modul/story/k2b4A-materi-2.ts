import type { AdeganStory } from "./logika-story";
import { W, anak, benda, bola, emo, judul, kartu, kotakBenda, panah } from "./k2b4A-gambar";
import { idx, k, redamkan, sorotkan, tambah } from "./k2b4A-bantu";

/** Enam anak berderet dari kiri ke kanan (urut baru dengan tokoh tetap). */
export const URUT_BARIS = ["upe", "wei", "halim", "kira", "malosi", "igil"];
export const X_BARIS = [30, 76, 122, 168, 214, 260];
export const Y_BARIS = 90;

/* ------------------------------ 7. Enam anak berderet ------------------------------ */
const SUARA_B1 = "Enam anak berdiri berderet di taman. Dari kiri ke kanan: Upe, Wei, Halim, Kira, Malosi, dan Igil.";
const SUARA_B2 = "Siapa yang ada di sebelah kanan Wei? Halim ada di sebelah kanan Wei.";
const SUARA_B3 = "Siapa yang ada di sebelah kiri Malosi? Kira ada di sebelah kiri Malosi.";
const SUARA_B4 = "Upe berdiri paling kiri. Tidak ada anak di sebelah kiri Upe.";
const SUARA_B5 = "Igil berdiri paling kanan. Tidak ada anak di sebelah kanan Igil.";

export const ADEGAN_BARIS_ANAK: AdeganStory = {
  id: "baris-anak",
  judul: "Enam anak berderet",
  sumber: "Materi: kanan dan kiri siapa",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Enam anak berderet")),
      tambah(idx(SUARA_B1, "Upe,"), ...anak("upe", X_BARIS[0], Y_BARIS)),
      tambah(idx(SUARA_B1, "Wei,"), ...anak("wei", X_BARIS[1], Y_BARIS)),
      tambah(idx(SUARA_B1, "Halim,"), ...anak("halim", X_BARIS[2], Y_BARIS)),
      tambah(idx(SUARA_B1, "Kira,"), ...anak("kira", X_BARIS[3], Y_BARIS)),
      tambah(idx(SUARA_B1, "Malosi,"), ...anak("malosi", X_BARIS[4], Y_BARIS)),
      tambah(idx(SUARA_B1, "Igil."), ...anak("igil", X_BARIS[5], Y_BARIS)),
    ),
    k(
      SUARA_B2,
      sorotkan(idx(SUARA_B2, "Wei?"), "ob-wei"),
      tambah(idx(SUARA_B2, "Halim"), panah("pn", 84, 62, 34, 0)),
      sorotkan(idx(SUARA_B2, "Halim"), "ob-halim"),
    ),
    k(
      SUARA_B3,
      redamkan(0, "ob-wei", "ob-halim"),
      sorotkan(idx(SUARA_B3, "Malosi?"), "ob-malosi"),
      tambah(idx(SUARA_B3, "Kira"), panah("pm", 208, 62, -34, 0)),
      sorotkan(idx(SUARA_B3, "Kira"), "ob-kira"),
    ),
    k(
      SUARA_B4,
      redamkan(0, "ob-malosi", "ob-kira"),
      sorotkan(idx(SUARA_B4, "Upe"), "ob-upe"),
      tambah(idx(SUARA_B4, "Tidak"), emo("x0", 9, 95, "❌", 14)),
    ),
    k(
      SUARA_B5,
      redamkan(0, "ob-upe"),
      sorotkan(idx(SUARA_B5, "Igil"), "ob-igil"),
      tambah(idx(SUARA_B5, "Tidak"), emo("x1", 291, 95, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 8. Anak membelakangi kita ------------------------------ */
const SUARA_M1 = "Sekarang Halim berdiri membelakangi kita. Kita hanya melihat punggungnya.";
const SUARA_M2 = "Ayam ada di sebelah kiri Halim.";
const SUARA_M3 = "Rumput ada di sebelah kanan Halim. Rumput berada di sisi kanan layar kita.";
const SUARA_M4 = "Halim menghadap ke arah yang sama dengan kita. Jadi kanan dan kiri Halim sama dengan kanan dan kiri kita.";
const SUARA_M5 = "Halim berkata, ayam di sebelah kiri saya. Kita setuju, sebab arah kita sama.";
const HALIM_BK = anak("halim", 150, 108, true);

export const ADEGAN_MEMBELAKANGI: AdeganStory = {
  id: "membelakangi",
  judul: "Anak membelakangi kita",
  sumber: "Materi: anak membelakangi kita",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Halim membelakangi kita")),
      tambah(idx(SUARA_M1, "Halim"), ...HALIM_BK.filter((o) => o.id !== "ob-halim-bk")),
      tambah(idx(SUARA_M1, "punggungnya."), ...HALIM_BK.filter((o) => o.id === "ob-halim-bk")),
    ),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Ayam"), benda("ayam", 56, 120, 36)), sorotkan(idx(SUARA_M2, "kiri"), "ob-ayam")),
    k(SUARA_M3, redamkan(0, "ob-ayam"), tambah(idx(SUARA_M3, "Rumput"), benda("rumput", 244, 120, 36)), sorotkan(idx(SUARA_M3, "kanan"), "ob-rumput")),
    k(
      SUARA_M4,
      redamkan(0, "ob-rumput"),
      tambah(idx(SUARA_M4, "arah"), ...kartu("hd", 196, 34, 96, 24, W.krem, ["arah hadap sama"], 9)),
      sorotkan(idx(SUARA_M4, "kiri"), "ob-ayam"),
      redamkan(idx(SUARA_M4, "kita", 2), "ob-ayam"),
      sorotkan(idx(SUARA_M4, "kita", 2), "ob-rumput"),
    ),
    k(
      SUARA_M5,
      redamkan(0, "ob-rumput"),
      tambah(idx(SUARA_M5, "ayam"), ...kartu("uc", 14, 34, 120, 24, W.putih, ["ayam di kiri saya"], 9)),
      sorotkan(idx(SUARA_M5, "kiri"), "ob-ayam"),
      tambah(idx(SUARA_M5, "setuju,"), emo("ok", 262, 190, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 9. Tiga bagian kalimat posisi ------------------------------ */
const SUARA_Q1 = "Kalimat posisi punya tiga bagian. Kita pakai contoh bola dan kotak.";
const SUARA_Q2 = "Bagian pertama adalah benda yang diceritakan, yaitu bola.";
const SUARA_Q3 = "Bagian kedua adalah kata posisi, yaitu di atas.";
const SUARA_Q4 = "Bagian ketiga adalah benda acuan, yaitu kotak. Jadi bola ada di atas kotak.";
const SUARA_Q5 = "Dengan tiga bagian ini, kalimat posisimu jelas dan mudah dipahami.";

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat-posisi",
  judul: "Tiga bagian kalimat posisi",
  sumber: "Materi: tiga bagian kalimat posisi",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Kalimat posisi")), tambah(idx(SUARA_Q1, "bola"), bola(150, 110, 13)), tambah(idx(SUARA_Q1, "kotak."), kotakBenda(150, 152, 64, 36))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "pertama"), ...kartu("kb0", 8, 30, 90, 44, W.hijauMuda, ["bola", "benda yang", "diceritakan"], 9)), sorotkan(idx(SUARA_Q2, "bola."), "ob-bola")),
    k(SUARA_Q3, redamkan(0, "ob-bola"), tambah(idx(SUARA_Q3, "kedua"), ...kartu("kb1", 105, 30, 90, 44, W.pink, ["di atas", "kata", "posisi"], 9))),
    k(
      SUARA_Q4,
      tambah(idx(SUARA_Q4, "ketiga"), ...kartu("kb2", 202, 30, 90, 44, W.langit, ["kotak", "benda", "acuan"], 9)),
      sorotkan(idx(SUARA_Q4, "kotak."), "ob-kotak"),
      redamkan(idx(SUARA_Q4, "Jadi"), "ob-kotak"),
      tambah(idx(SUARA_Q4, "Jadi"), ...kartu("kal0", 80, 176, 140, 22, W.krem, ["bola di atas kotak"], 9)),
    ),
    k(SUARA_Q5, sorotkan(idx(SUARA_Q5, "tiga"), "kb0-k", "kb1-k", "kb2-k")),
  ],
};
