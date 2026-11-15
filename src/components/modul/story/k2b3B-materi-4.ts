import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, WARNA_KEPING, P, angkaKeping, bg, emo, garisUrai, judul, kartu, persegi, segiBanyak, teks, type Titik } from "./k2b3B-gambar";
import { bersih, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b3B-bantu";
import { CARA_DUA } from "./k2b3B-materi-1";
import { dariPojok } from "./k2b3B-materi-3";

const keping = (i: number, pts: Titik[], o: Partial<Obj> = {}): Obj => bg(`kp${i}`, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });
const ok = (x = 262, y = 84): Obj => emo("ok", x, y, "✅", 24);

/* ------------------------------ 15. Latihan 1: garis miring pada persegi ------------------------------ */
const SQ = persegi(110, 36, 80);
const SUARA_P1 = "Latihan satu. Halim menarik garis miring pada sebuah persegi.";
const SUARA_P2 = "Garis miring itu membuat persegi terurai menjadi apa? Ketuk jawabannya.";
const SUARA_P3 = "Betul! Garis miring membuat dua segitiga.";
const SUARA_P4 = "Dua segitiga ini bisa disusun kembali menjadi persegi. Hebat!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan satu: garis miring pada persegi",
  sumber: "Materi: latihan garis miring",
  latar: "#FEF9C3",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan satu")), tambah(idx(SUARA_P1, "Halim"), bg("ut", SQ, W.krem)), tambah(idx(SUARA_P1, "menarik"), garisUrai(0, SQ[0], SQ[2]))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Ketuk"), ...pilihKata(134, ["2 segitiga", "2 segi empat", "3 segitiga"], 9.6))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul!"), "c1-k"), tambah(idx(SUARA_P3, "dua"), keping(0, [SQ[0], SQ[1], SQ[2]]), keping(1, [SQ[0], SQ[2], SQ[3]]), teks("hs", 150, 188, "2 segitiga", 11, W.merah))),
    k(SUARA_P4, redamkan(0, "c1-k"), tambah(idx(SUARA_P4, "Hebat!"), ok())),
  ],
};

/* ------------------------------ 16. Latihan 2: dua garis bersilangan ------------------------------ */
const SUARA_Q1 = "Latihan dua. Upe menarik dua garis yang bersilangan pada sebuah persegi panjang.";
const SUARA_Q2 = "Berapa keping yang terbentuk? Ketuk jawabannya.";
const SUARA_Q3 = "Betul, empat keping! Ada dua segitiga dan dua segi empat.";
const SUARA_Q4 = "Hitung lagi: satu, dua, tiga, empat. Hebat!";
const POS_Q4 = urutBilangan(SUARA_Q4, 1, 4, "lagi:");
const KOTAK_A = [P(70, 50), P(230, 50), P(230, 110), P(70, 110)];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan dua: menghitung keping",
  sumber: "Materi: latihan menghitung keping",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan dua")), tambah(idx(SUARA_Q1, "Upe"), bg("ut", KOTAK_A, W.krem)), tambah(idx(SUARA_Q1, "garis"), garisUrai(0, CARA_DUA[1][0], P(190, 110))), tambah(idx(SUARA_Q1, "bersilangan"), garisUrai(1, CARA_DUA[1][1], P(110, 110)))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Ketuk"), ...pilihKata(126, ["3 keping", "4 keping", "5 keping"], 10.4))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul,"), "c2-k"), tambah(idx(SUARA_Q3, "Ada"), ...CARA_DUA.map((p, i) => keping(i, p)), teks("hs", 150, 180, "2 segitiga + 2 segi empat", 10.4, W.merah))),
    k(SUARA_Q4, redamkan(0, "c2-k"), ...POS_Q4.map((p, q) => tambah(p, angkaKeping(q, CARA_DUA[q], String(q + 1), 9)))),
  ],
};

/* ------------------------------ 17. Latihan 3: segi enam dari satu pojok ------------------------------ */
export const HEX_KECIL = segiBanyak(6, 150, 72, 38);
const TRI_HEX = dariPojok(HEX_KECIL);
const SUARA_R1 = "Latihan tiga. Kira menarik garis dari satu pojok pada sebuah segi enam.";
const SUARA_R2 = "Berapa segitiga yang terbentuk? Ingat polanya, lalu ketuk jawabannya.";
const SUARA_R3 = "Betul, empat segitiga! Enam dikurangi dua sama dengan empat.";
const SUARA_R4 = "Hitung lagi: satu, dua, tiga, empat. Hebat!";
const POS_R4 = urutBilangan(SUARA_R4, 1, 4, "lagi:");

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan tiga: segi enam dari satu pojok",
  sumber: "Materi: latihan pola segitiga",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Latihan tiga")), tambah(idx(SUARA_R1, "Kira"), bg("ut", HEX_KECIL, W.krem)), tambah(idx(SUARA_R1, "menarik"), garisUrai(0, HEX_KECIL[0], HEX_KECIL[2]), garisUrai(1, HEX_KECIL[0], HEX_KECIL[3]), garisUrai(2, HEX_KECIL[0], HEX_KECIL[4]))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "ketuk"), ...pilihKata(128, ["3 segitiga", "4 segitiga", "5 segitiga"], 9.6))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul,"), "c2-k"), tambah(idx(SUARA_R3, "Enam"), ...TRI_HEX.map((p, i) => keping(i, p)), teks("rm", 150, 184, "6 − 2 = 4", 12, W.merah))),
    k(SUARA_R4, redamkan(0, "c2-k"), ...POS_R4.map((p, q) => tambah(p, angkaKeping(q, TRI_HEX[q], String(q + 1), 8.6)))),
  ],
};

/* ------------------------------ 18. Latihan 4: dua segitiga menjadi apa ------------------------------ */
const TA = [P(110, 36), P(190, 36), P(110, 116)];
const TB = [P(190, 36), P(190, 116), P(110, 116)];
const SUARA_S1 = "Latihan empat. Malosi punya dua segitiga yang sama besar dan ingin menyusunnya.";
const SUARA_S2 = "Kalau sisi miringnya ditempelkan, bentuk apa yang jadi? Ketuk jawabannya.";
const SUARA_S3 = "Betul, sebuah persegi! Dua segitiga sama besar menjadi satu persegi.";
const SUARA_S4 = "Hebat! Mengurai dan menyusun saling berlawanan.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan empat: menyusun dua segitiga",
  sumber: "Materi: latihan menyusun",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Latihan empat")), tambah(idx(SUARA_S1, "dua"), keping(0, TA, { x: -52 }), keping(1, TB, { x: 52 }))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "Ketuk"), ...pilihKata(134, ["persegi", "segitiga besar", "segi lima"], 9.6))),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Betul,"), "c1-k"), ubah(idx(SUARA_S3, "Dua"), { id: "kp0", x: 0 }, { id: "kp1", x: 0 }), tambah(idx(SUARA_S3, "persegi!"), bg("ht", SQ, "none", { tebal: 2.4, z: 2 }))),
    k(SUARA_S4, redamkan(0, "c1-k"), tambah(idx(SUARA_S4, "Hebat!"), ok())),
  ],
};

/* ------------------------------ 19. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Mengurai artinya memecah satu bangun menjadi beberapa keping.";
const SUARA_Z2 = "Menyusun artinya menggabungkan beberapa keping menjadi satu bentuk baru.";
const SUARA_Z3 = "Cara mengurai dan cara menyusun memengaruhi hasilnya. Garis berbeda, hasilnya berbeda.";
const SUARA_Z4 = "Pada segi banyak, banyak segitiga dari satu pojok adalah banyak sisi dikurangi dua.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Mengurai"), ...kartu("p1", 14, 30, 272, 36, W.hijauMuda, ["mengurai: 1 bangun", "jadi beberapa keping"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Menyusun"), ...kartu("p2", 14, 72, 272, 36, W.krem, ["menyusun: beberapa keping", "jadi 1 bentuk baru"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Cara"), ...kartu("p3", 14, 114, 272, 36, W.langit, ["cara berbeda,", "hasil berbeda"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Pada"), ...kartu("p4", 14, 156, 272, 36, W.pink, ["dari satu pojok:", "segitiga = sisi − 2"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
