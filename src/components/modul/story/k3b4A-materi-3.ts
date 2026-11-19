import type { AdeganStory } from "./logika-story";
import { E, W, WL, bilah, bulat, emo, garis, judul, kartu, kotak, paku, padi, rumput, teks, tokoh } from "./k3b4A-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b4A-bantu";

/*
 * Cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Kelas 3 Bab 4 Sub-Bab A), awal cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4a.md. Bagian ini: sisi bangun datar (segitiga EFG), menghitung sisi, dan penutup (jembatan ke Sub-Bab B).
 */
const BAMBU = "#D9B44A";

/* ------------------------------ 7. Sisi ------------------------------ */
const SUARA_S1 = "Bu Ratih membentuk tiga bilah bambu menjadi rangka segitiga dan memberi nama E, F, dan G pada titik sudutnya.";
const SUARA_S2 = "Ruas garis yang menjadi batas bangun datar disebut sisi.";
const SUARA_S3 = "Sisinya EF, FG, dan EG, jadi segitiga EFG punya tiga sisi.";
const E_ = { x: 150, y: 52 };
const F_ = { x: 80, y: 122 };
const G_ = { x: 220, y: 122 };

export const ADEGAN_SISI: AdeganStory = {
  id: "sisi",
  judul: "Sisi bangun datar",
  sumber: "Materi: sisi bangun datar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Segitiga dari Bilah Bambu")),
      tambah("Ratih", ...tokoh("br", 262, 184, "Bu Ratih")),
      tambah("tiga", garis("e1", F_.x, F_.y, E_.x - F_.x, E_.y - F_.y, BAMBU, 6), garis("e2", F_.x, F_.y, G_.x - F_.x, 0, BAMBU, 6), garis("e3", G_.x, G_.y, E_.x - G_.x, E_.y - G_.y, BAMBU, 6), teks("n3", 150, 98, "3 bilah", 10, W.ungu)),
      tambah(12, paku("pE", E_.x, E_.y, 4), teks("lE", E_.x + 14, E_.y - 4, "E", 13, W.merah)),
      tambah(13, paku("pF", F_.x, F_.y, 4), teks("lF", F_.x - 12, F_.y + 6, "F", 13, W.merah)),
      tambah(15, paku("pG", G_.x, G_.y, 4), teks("lG", G_.x + 12, G_.y + 6, "G", 13, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "n3"),
      sorotkan("Ruas", "e1", "e2", "e3"),
      tambah("batas", teks("bt", 150, 34, "batas bangun datar", 9, W.hijauTua)),
      tambah("sisi", teks("ss", 150, 102, "sisi", 16, W.merah)),
    ),
    k(
      SUARA_S3,
      hapus(0, "bt", "ss"),
      sorotkan("EF,", "e1"),
      tambah("EF,", teks("tE", 98, 80, "EF", 12, W.merah)),
      tambah("FG,", teks("tF", 150, 144, "FG", 12, W.merah)),
      tambah("EG,", teks("tG", 204, 80, "EG", 12, W.merah)),
      tambah("EFG", teks("tS", 150, 34, "segitiga EFG", 10, W.ungu)),
      tambah("tiga", teks("n3s", 150, 100, "3 sisi", 12, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 8. Menghitung sisi ------------------------------ */
const SUARA_H1 = "Bima memegang kertas persegi, dan Salsa menghitung empat sisi lurus.";
const SUARA_H2 = "Tutup kaleng bundar tidak punya sisi lurus, karena tepinya satu kurva.";
const SUARA_H3 = "Jadi menghitung sisi berarti menghitung ruas garis pembatas bangun.";

export const ADEGAN_HITUNG_SISI: AdeganStory = {
  id: "hitung-sisi",
  judul: "Menghitung sisi",
  sumber: "Materi: menghitung sisi",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Menghitung Sisi"), ...tokoh("bm", 40, 184, "Bima")),
      tambah("kertas", kotak("ps", 110, 60, 80, 80, "#FBCFE8", W.biru, { rx: 2, z: 1 })),
      tambah("Salsa", ...tokoh("sl", 262, 184, "Salsa")),
      tambah("menghitung", teks("q1", 150, 52, "1", 12, W.merah), teks("q2", 202, 104, "2", 12, W.merah), teks("q3", 150, 152, "3", 12, W.merah)),
      tambah("empat", teks("q4", 98, 104, "4", 12, W.merah), teks("n4", 150, 106, "4 sisi", 12, W.hijauTua)),
    ),
    k(
      SUARA_H2,
      hapus(0, "ps", "q1", "q2", "q3", "q4", "n4"),
      tambah("Tutup", bulat("tk", 150, 98, 38, "#E2E8F0", W.biru, { tebal: 2, z: 1 }), teks("kl", 150, 102, "tutup kaleng", 8, W.biru, { z: 2 })),
      tambah("sisi", teks("sx", 252, 98, "sisi lurus", 9, W.merah)),
      tambah("lurus,", emo("xs", 252, 80, E.salah, 18)),
      tambah("satu", teks("k1", 150, 152, "1 kurva", 12, W.hijauTua)),
    ),
    k(
      SUARA_H3,
      hapus(0, "tk", "kl", "sx", "xs", "k1"),
      tambah("menghitung", ...kartu("kk", 50, 50, 200, 28, "#FDE68A", ["sisi = ruas garis pembatas"], 9)),
      tambah("ruas", ...bilah("rb", 100, 96, 100, 8)),
      tambah("bangun", kotak("pq", 126, 112, 48, 34, undefined, WL.bambuTua, { rx: 2, tebal: 2.4, z: 1 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Raka menepati taruhannya dan menyapu lapangan sambil bersungut-sungut.";
const SUARA_P2 = "Besok Kak Anton, pelatih lomba, akan datang membawa busur derajat dan kertas lipat.";
const SUARA_P3 = "Menurutmu, kalau dua bilah bambu bertemu di satu ujung, apa yang terbentuk di sana? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Bu Ratih!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup dan jembatan ke sudut",
  sumber: "Materi: penutup",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Raka Menepati Taruhan"), ...rumput("rt", 150)),
      tambah("taruhannya", ...padi("pd", 124)),
      tambah("Raka", ...tokoh("rk", 30, 184, "Raka")),
      tambah("menyapu", emo("sp", 62, 166, E.sapu, 22)),
      tambah("bersungut-sungut.", emo("cb", 30, 138, E.cemberut, 18), emo("db", 90, 164, "\u{1F4A8}", 16)),
    ),
    k(
      SUARA_P2,
      tambah("Anton,", ...tokoh("ka", 252, 118, "Kak Anton", 18)),
      tambah("busur", emo("bs", 228, 108, E.segitiga, 14)),
      tambah("kertas", emo("kl", 276, 108, E.kertas, 14)),
    ),
    k(
      SUARA_P3,
      tambah("dua", garis("w1", 90, 100, 110, 0, BAMBU, 6), garis("w2", 90, 100, 60, -44, BAMBU, 6), teks("n2", 150, 60, "2 bilah", 10, W.ungu, { op: 1 })),
      tambah("terbentuk", teks("tq", 112, 90, "?", 16, W.merah)),
      tambah("satu", paku("pw", 90, 100, 4), teks("n1", 60, 122, "1 ujung", 10, W.hijauTua)),
      tambah("Terima", ...tokoh("sl", 66, 184, "Salsa"), ...tokoh("bm", 102, 184, "Bima"), ...tokoh("pj", 138, 184, "Pak Joko"), ...tokoh("br", 188, 184, "Bu Ratih")),
      tambah("kasih,", emo("lb", 230, 160, E.lambai, 20)),
    ),
  ],
};
