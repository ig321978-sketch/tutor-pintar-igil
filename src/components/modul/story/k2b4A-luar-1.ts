import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, bola, bulat, emo, judul, kartu, kotak, teks } from "./k2b4A-gambar";
import { bersih, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b4A-bantu";

export const NAMA_METODE_ID = ["Bahasa Posisi", "Tampak Peta", "Acuan Patokan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk menceritakan posisi benda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Bahasa Posisi, Tampak Peta, dan satu lagi, Acuan Patokan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menceritakan letak benda dengan tepat?";
const SUARA_O4 = "Kita memakai benda di layar. Kamu cukup mengetuk, menyeret, dan melihat dengan teliti.";
const SUARA_O5 = "Letak benda diceritakan dengan enam kata posisi. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk posisi benda",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Bahasa"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Tampak"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Acuan"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F4CD}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menceritakan", "letak benda dengan tepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", bulat("al0", 70, 96, 18, W.oranye), kotak("al1", 132, 78, 36, 36, W.langit, W.biru, { rx: 5, tebal: 2 }), emo("al2", 230, 104, "\u{1F697}", 34)),
      tambah("mengetuk,", emo("tg", 160, 140, "\u{1F446}", 22)),
      tambah("melihat", teks("al-t", 150, 178, "benda di layar", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Enam kata posisi")),
      tambah("enam", teks("kt0", 150, 74, "atas  bawah  depan", 14, W.ungu), teks("kt1", 150, 104, "belakang  kanan  kiri", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 172, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Bahasa Posisi: konsep ------------------------------ */
const SUARA_V1 = "Metode pertama bernama Bahasa Posisi. Tiap letak punya kata posisi yang cocok.";
const SUARA_V2 = "Boneka ada di atas kursi. Kata atas cocok untuk letak yang lebih tinggi.";
const SUARA_V3 = "Mobil-mobilan ada di sebelah kanan kursi. Kata kanan cocok untuk letak di sisi kanan kita.";
const SUARA_V4 = "Bola ada di sebelah kiri kursi. Kata kiri cocok untuk letak di sisi kiri kita.";
const SUARA_V5 = "Pilih kata yang tepat, lalu ceritakan letak benda dengan jelas.";

export const ADEGAN_LUAR_BAHASA: AdeganStory = {
  id: "luar-bahasa",
  judul: "Bahasa Posisi: kata yang cocok",
  sumber: "Metode luar: Bahasa Posisi",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), tambah(idx(SUARA_V1, "letak"), benda("kursi", 150, 118, 44))),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Boneka"), benda("boneka", 150, 70, 32)), sorotkan(idx(SUARA_V2, "atas"), "ob-boneka")),
    k(SUARA_V3, redamkan(0, "ob-boneka"), tambah(idx(SUARA_V3, "Mobil-mobilan"), benda("mobil", 232, 118, 34)), sorotkan(idx(SUARA_V3, "kanan"), "ob-mobil")),
    k(SUARA_V4, redamkan(0, "ob-mobil"), tambah(idx(SUARA_V4, "Bola"), bola(68, 118, 14)), sorotkan(idx(SUARA_V4, "kiri"), "ob-bola")),
    k(SUARA_V5, redamkan(0, "ob-bola"), tambah(idx(SUARA_V5, "jelas."), emo("ok", 150, 178, "✅", 26))),
  ],
};

/* ------------------------------ 3. Bahasa Posisi: terapan ------------------------------ */
const SUARA_W1 = "Terapkan pada soal ini. Kira melihat seekor ayam dan sebuah kotak di layar.";
const SUARA_W2 = "Ayam ada di sebelah mana kotak? Ketuk kata posisi yang tepat.";
const SUARA_W3 = "Lihat dengan teliti. Ayam lebih rendah daripada kotak.";
const SUARA_W4 = "Betul! Ayam ada di bawah kotak. Hebat!";

export const ADEGAN_LUAR_BAHASA_TERAPAN: AdeganStory = {
  id: "luar-bahasa-terapan",
  judul: "Bahasa Posisi: ayam dan kotak",
  sumber: "Metode luar: Bahasa Posisi",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(0)), tambah(idx(SUARA_W1, "ayam"), benda("ayam", 150, 138, 36)), tambah(idx(SUARA_W1, "kotak"), kotak("ob-kotak", 122, 66, 56, 40, W.langit, W.biru, { rx: 5, tebal: 2 }))),
    k(SUARA_W2, tambah(idx(SUARA_W2, "tepat."), ...pilihKata(166, ["atas", "bawah", "kanan"], 13))),
    k(SUARA_W3, tambah(idx(SUARA_W3, "rendah"), { id: "pw", t: "panah", x: 212, y: 90, x2: 0, y2: 36, warna: W.merah, tebal: 2.6 }), sorotkan(idx(SUARA_W3, "Ayam"), "ob-ayam")),
    k(SUARA_W4, redamkan(0, "ob-ayam"), sorotkan(idx(SUARA_W4, "Betul!"), "c2-k"), tambah(idx(SUARA_W4, "Hebat!"), emo("ok", 262, 108, "✅", 22))),
  ],
};

/* ------------------------------ 4. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita menceritakan posisi benda.";
const SUARA_R2 = "Metode Bahasa Posisi, sebut letak dengan enam kata posisi.";
const SUARA_R3 = "Metode Tampak Peta, lihat letak benda dari atas pada peta petak.";
const SUARA_R4 = "Metode Acuan Patokan, sebut letak dari satu benda patokan.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Bahasa"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "sebut dengan kata posisi"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Tampak"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "lihat letak dari atas"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Acuan"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "sebut dari benda patokan"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
