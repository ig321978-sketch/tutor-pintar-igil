import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kertas, panah, papan, sikat, tanah, teks, tiang, tokoh } from "./k3b3B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b3B-bantu";

/*
 * Cerita orisinal IGIL "Pita Pak Wayan" (Kelas 3 Bab 3 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k3b3b.md. Bagian ini: salah langkah Raka (taruhan), sentimeter ke meter, dan ukuran ditulis bersama.
 */

/* ------------------------------ 4. Salah langkah ------------------------------ */
const SUARA_K1 = "Raka berseru, empat meter itu empat puluh sentimeter! Kalau salah, aku menyikat semua kura-kura!";
const SUARA_K2 = "Salsa menggeleng. Satu meter itu seratus sentimeter, bukan sepuluh.";
const SUARA_K3 = "Empat meter sama dengan empat kali seratus, yaitu empat ratus sentimeter.";

export const ADEGAN_SALAH_KALI: AdeganStory = {
  id: "salah-kali",
  judul: "Salah langkah dan taruhan Raka",
  sumber: "Materi: salah langkah mengalikan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Taruhan Raka"), ...tanah("tn", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("berseru,", kertas("ks", 74, 38, 170, 64)),
      tambah("empat", teks("c1", 110, 80, "4 m", 18, W.meter)),
      tambah("itu", teks("c2", 142, 80, "=", 18, W.biru)),
      tambah("empat@2", teks("c3", 194, 80, "40 cm", 18, W.merah)),
      tambah("menyikat", ...sikat("sk", 58, 144)),
      tambah("kura-kura!", emo("kr1", 236, 146, E.kura, 20), emo("kr2", 266, 146, E.kura, 16)),
    ),
    k(
      SUARA_K2,
      tambah("Salsa", ...tokoh("sl", 92, 184, "Salsa")),
      ubah("menggeleng.", { id: "sl", isi: E.pikir }),
      tambah("Satu", teks("s1", 160, 126, "1 m = 100 cm", 14, W.hijauTua)),
      tambah("bukan", teks("s2", 160, 146, "bukan 10", 10, W.merah)),
      ubah("bukan", { id: "c3", op: 0.35 }),
    ),
    k(
      SUARA_K3,
      hapus(0, "s1", "s2"),
      tambah(0, teks("f1", 160, 128, "4 × 100", 14, W.biru)),
      ubah("yaitu", { id: "f1", isi: "4 × 100 = 400" }),
      ubah("ratus", { id: "c3", isi: "400 cm", warna: W.hijauTua, op: 1 }),
      tambah("sentimeter.", emo("ok", 232, 112, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 5. Sentimeter ke meter ------------------------------ */
const SUARA_C1 = "Sebaliknya, papan sepanjang tujuh ratus sentimeter dibagi seratus.";
const SUARA_C2 = "Tujuh ratus dibagi seratus sama dengan tujuh, jadi tujuh meter.";
const SUARA_C3 = "Meter ke sentimeter dikali, sentimeter ke meter dibagi.";

export const ADEGAN_CM_KE_M: AdeganStory = {
  id: "cm-ke-m",
  judul: "Sentimeter ke meter, bagi seratus",
  sumber: "Materi: sentimeter ke meter",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Papan Panjang"), ...tanah("tn", 150), ...tokoh("bm", 36, 184, "Bima")),
      tambah("papan", ...papan("pn", 70, 100, 200, 14)),
      tambah("tujuh", teks("l7", 170, 88, "700 cm", 14, W.senti)),
      tambah("dibagi", panah("pa", 170, 118, 0, 12, W.ungu, 2.4)),
      tambah("seratus.", teks("op", 170, 142, "dibagi 100", 11, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("Tujuh", teks("e1", 170, 162, "700 : 100", 14, W.biru)),
      ubah("sama", { id: "e1", isi: "700 : 100 = 7" }),
      tambah("jadi", teks("h7", 170, 182, "7 m", 16, W.meter)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Kali atau Bagi"), ...kartu("km", 20, 70, 80, 30, "#DBEAFE", ["meter"], 11)),
      tambah("sentimeter", ...kartu("ks", 200, 70, 80, 30, "#FFEDD5", ["sentimeter"], 9.6)),
      tambah("dikali,", panah("p1", 104, 78, 92, 0, W.hijau, 2.6), teks("lk", 150, 68, "dikali", 9, W.hijauTua)),
      tambah("dibagi.", panah("p2", 196, 94, -92, 0, W.merah, 2.6), teks("lb", 150, 112, "dibagi", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Ukuran ditulis bersama ------------------------------ */
const SUARA_G1 = "Tinggi Bima satu meter dua puluh dua sentimeter.";
const SUARA_G2 = "Satu meter sama dengan seratus sentimeter, ditambah dua puluh dua menjadi seratus dua puluh dua sentimeter.";
const SUARA_G3 = "Ukuran boleh ditulis dengan meter dan sentimeter bersama, atau dengan sentimeter saja.";

export const ADEGAN_GABUNG: AdeganStory = {
  id: "gabung",
  judul: "Ukuran ditulis dengan meter dan sentimeter",
  sumber: "Materi: meter dan sentimeter bersama",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tinggi Bima"), ...tanah("tn", 150)),
      tambah("Bima", ...tokoh("bm", 100, 184, "Bima")),
      tambah("Tinggi", tiang("tu", 134, 46, 104, 10)),
      tambah("satu", teks("t1", 182, 80, "1 m", 14, W.meter)),
      tambah("dua@2", teks("t2", 240, 80, "22 cm", 14, W.senti)),
    ),
    k(
      SUARA_G2,
      sorotkan("Satu", "t1"),
      tambah("seratus", teks("g1", 190, 106, "1 m = 100 cm", 11, W.hijauTua)),
      tambah("ditambah", teks("g2", 190, 124, "+ 22 cm", 11, W.senti)),
      tambah("menjadi", teks("g3", 190, 144, "100 + 22 = 122 cm", 11, W.biru)),
    ),
    k(
      SUARA_G3,
      hapus(0, "t1", "t2", "g1", "g2", "g3", "tu"),
      tambah("Ukuran", ...kartu("w1", 20, 70, 124, 34, "#DBEAFE", ["1 m 22 cm"], 12)),
      tambah("bersama,", teks("lw", 82, 60, "bersama", 9, W.meter)),
      tambah("atau", ...kartu("w2", 156, 70, 124, 34, "#FFEDD5", ["122 cm"], 12)),
      tambah("saja.", teks("ls", 218, 60, "saja", 9, W.senti)),
    ),
  ],
};
