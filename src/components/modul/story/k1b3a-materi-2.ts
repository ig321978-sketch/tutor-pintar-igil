import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, bangku, deret, deretEmo, emo, isiDi, judul, kalimatK, kotakBekal, kotakSekat, label, orang, sekat, teks } from "./k1b3a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b3a-bantu";

/* Lanjutan "Bekal untuk Nenek": penumpang turun dan hitung mundur, kotak minuman bersekat sepuluh, lalu sisa nol dan dikurangi nol. */

/* ------------------------------ 4. Penumpang turun, hitung mundur ------------------------------ */
const SUARA_P1 = "Di bangku panjang depan Igil duduk tujuh penumpang. Kereta berhenti di stasiun kecil.";
const SUARA_P2 = "Tiga penumpang turun. Igil tidak menghitung ulang dari satu. Ia mulai dari tujuh, lalu mundur: enam, lima, empat.";
const SUARA_P3 = "Tinggal empat penumpang. Tujuh dikurangi tiga sama dengan empat. Ada tiga kursi kosong untuk Kaka, Abang, dan Igil.";
const PN = deret(7, 46, 34, 104);
const posP2 = urutKata(SUARA_P2, ["tujuh,", "enam,", "lima,", "empat."], "mulai");

export const ADEGAN_TURUN: AdeganStory = {
  id: "penumpang-turun",
  judul: "Penumpang turun di stasiun kecil",
  sumber: "Materi: hitung mundur",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Penumpang turun"), ...bangku("bk", 24, 118, 252)),
      tambah("Igil", ...orang("ig", 40, 166, E.igil, "Igil")),
      tambah("tujuh", ...deretEmo(E.penumpang, "pn", PN, 22)),
      tambah("stasiun", emo("st", 236, 164, E.stasiun, 26), teks("sk", 236, 192, "stasiun kecil", 8.4, W.ungu)),
    ),
    k(
      SUARA_P2,
      sorotkan("turun.", "pn4", "pn5", "pn6"),
      tambah(posP2[0], teks("h7", PN[6].x, 78, "7", 12, W.merah)),
      tambah(posP2[1], teks("h6", PN[5].x, 78, "6", 12, W.merah)),
      ubah(posP2[1], { id: "pn6", op: 0.25, sorot: false }),
      ubah(posP2[2], { id: "pn5", op: 0.25, sorot: false }),
      tambah(posP2[2], teks("h5", PN[4].x, 78, "5", 12, W.merah)),
      ubah(posP2[3], { id: "pn4", op: 0.25, sorot: false }),
      tambah(posP2[3], teks("h4", PN[3].x, 78, "4", 12, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "pn4", "pn5", "pn6", "h7", "h6", "h5"),
      tambah("Tujuh", ...kalimatK("kl", 150, 52, ["7", KURANG, "3", "=", "4"], 20, 28)),
      tambah("kursi", ...[4, 5, 6].map((i) => emo(`ks${i}`, PN[i].x, PN[i].y, E.kursi, 22))),
      sorotkan("Igil.", "ig"),
    ),
  ],
};

/* ------------------------------ 5. Kotak minuman bersekat sepuluh ------------------------------ */
const SUARA_M1 = "Abang membawa kotak minuman. Sekatnya dua baris, tiap baris lima, seperti bingkai sepuluh. Isinya penuh sepuluh botol.";
const SUARA_M2 = "Igil, Kaka, dan Abang masing-masing minum satu botol. Tiga sekat menjadi kosong.";
const SUARA_M3 = "Baris atas masih lima, baris bawah tinggal dua. Sisanya tujuh botol. Sepuluh dikurangi tiga sama dengan tujuh.";
const KS = { x: 85, y: 96, s: 26 };
const SEKAT = Array.from({ length: 10 }, (_, i) => sekat(KS.x, KS.y, i, KS.s));

export const ADEGAN_MINUMAN: AdeganStory = {
  id: "kotak-minuman",
  judul: "Kotak minuman bersekat sepuluh",
  sumber: "Materi: bingkai sepuluh",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Kotak minuman Abang"), ...orang("ab", 40, 120, E.abang, "Abang")),
      tambah("kotak", ...kotakSekat("ks", KS.x, KS.y, KS.s)),
      tambah("bingkai", teks("bk", 150, 80, "seperti bingkai sepuluh", 9, W.ungu)),
      tambah("sepuluh@2", ...isiDi(E.minuman, "mn", SEKAT, 18)),
      tambah("botol.", teks("t10", 252, 126, "10", 16, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, "t10"),
      ubah("minum", { id: "mn9", op: 0.3 }, { id: "mn8", op: 0.3 }, { id: "mn7", op: 0.3 }),
      hapus("kosong.", "mn7", "mn8", "mn9"),
      sorotkan("kosong.", "ksc7", "ksc8", "ksc9"),
      tambah("Tiga", teks("t3", 252, 170, "diminum 3", 9, W.merah)),
    ),
    k(
      SUARA_M3,
      tambah("atas", teks("ta", 238, 113, "5", 14, W.biru)),
      tambah("bawah", teks("tw", 238, 139, "2", 14, W.biru)),
      tambah("tujuh", ...label("ss", 104, 156, 92, "sisa 7", W.emas)),
      tambah("Sepuluh", ...kalimatK("kl", 150, 196, ["10", KURANG, "3", "=", "7"], 16, 28)),
    ),
  ],
};

/* ------------------------------ 6. Sisa nol dan dikurangi nol ------------------------------ */
const SUARA_Z1 = "Di stasiun berikutnya, tiga penumpang di bangku depan turun semua.";
const SUARA_Z2 = "Tidak ada yang tersisa. Tiga dikurangi tiga sama dengan nol.";
const SUARA_Z3 = "Lalu tidak ada lagi yang makan kue. Yang diambil nol, jadi kuenya tetap enam. Enam dikurangi nol sama dengan enam.";
const DEPAN = deret(3, 110, 40, 100);
const KUE6 = deret(6, 75, 30, 108);

export const ADEGAN_NOL: AdeganStory = {
  id: "sisa-nol",
  judul: "Sisa nol dan dikurangi nol",
  sumber: "Materi: pengurangan dengan nol",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Bangku depan"), ...bangku("bk", 70, 114, 160), ...deretEmo(E.penumpang, "pn", DEPAN, 22)),
      tambah("stasiun", emo("st", 40, 70, E.stasiun, 26)),
      ubah("turun", ...DEPAN.map((p, i) => ({ id: `pn${i}`, y: 166, op: 0.35 }))),
    ),
    k(
      SUARA_Z2,
      hapus(0, "pn0", "pn1", "pn2"),
      tambah("tersisa.", teks("t0", 150, 102, "0", 26, W.merah)),
      tambah("Tiga", ...kalimatK("kl", 150, 170, ["3", KURANG, "3", "=", "0"], 20, 28)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Kue tetap enam"), ...kotakBekal("kt", 52, 88, 196, 40), ...deretEmo(E.kue, "ku", KUE6, 20)),
      tambah("nol,", ...label("a0", 100, 48, 100, "diambil 0", W.langit)),
      sorotkan("tetap", ...KUE6.map((_, i) => `ku${i}`)),
      tambah("tetap", teks("t6", 150, 150, "tetap 6", 11, W.hijau)),
      tambah("dikurangi", ...kalimatK("kl", 150, 184, ["6", KURANG, "0", "=", "6"], 18, 26)),
    ),
  ],
};
