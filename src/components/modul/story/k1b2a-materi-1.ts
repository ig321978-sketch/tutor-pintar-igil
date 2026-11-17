import type { AdeganStory, Obj } from "./logika-story";
import { E, TANAH_MUDA, W, bedeng, deret, deretDi, deretEmo, emo, judul, kalimat, kotak, label, lubang, orang, papan, teks } from "./k1b2a-gambar";
import { hapus, hitungMainan, k, sorotkan, tambah, ubah, urutKata } from "./k1b2a-bantu";

/*
 * Cerita orisinal IGIL "Bibit Kiriman Nenek" (Kelas 1 Bab 2 Sub-Bab A, cerita penjumlahan), awal cerita Kebun Sayur Mamah.
 * Masalah: satu bibit perlu satu lubang tanam, padahal bibit datang sedikit demi sedikit; lubang yang digali harus pas.
 * Penyelesaian: bertambah dan hitung maju, menulis kalimat penjumlahan, menggabungkan, bedeng sepuluh lubang, nol, sampai sepuluh.
 */

/* ------------------------------ 1. Halaman belakang yang kosong ------------------------------ */
const SUARA_H1 = "Halaman belakang rumah Igil masih kosong. Mamah ingin membuat kebun sayur di sana.";
const SUARA_H2 = "Kata Mamah, satu bibit perlu satu lubang tanam. Kalau lubangnya kurang, bibit bisa layu.";
const SUARA_H3 = "Masalahnya, bibit datang sedikit demi sedikit. Berapa lubang yang harus digali semuanya?";

export const ADEGAN_KEBUN: AdeganStory = {
  id: "halaman-kosong",
  judul: "Halaman belakang yang kosong",
  sumber: "Materi: masalah lubang tanam",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Halaman belakang kosong"), kotak("tn", 10, 128, 280, 64, TANAH_MUDA, W.coklat, { rx: 10, z: -2 })),
      tambah("Igil", ...orang("ig", 36, 96, E.igil, "Igil")),
      tambah("Mamah", ...orang("mm", 264, 96, E.mamah, "Mamah")),
      tambah("sayur", ...label("ide", 92, 52, 116, "kebun sayur", W.hijauMuda), emo("sy", 150, 108, E.selada, 30)),
    ),
    k(
      SUARA_H2,
      hapus(0, "ide-k", "ide-t0", "sy"),
      tambah("bibit", emo("b1", 110, 156, E.bibit, 24)),
      tambah("lubang", lubang("l1", 110, 172, 7), teks("sl", 150, 70, "1 bibit, 1 lubang", 11, W.hijau)),
      tambah("layu.", emo("ly", 210, 160, E.layu, 24), teks("tl", 210, 186, "tanpa lubang", 8.4, W.merah)),
    ),
    k(
      SUARA_H3,
      hapus(0, "ly", "tl", "sl"),
      tambah("datang", ...deretEmo(E.bibit, "bd", deret(3, 160, 26, 160), 20)),
      tambah("sedikit@2", emo("bd3", 240, 160, E.bibit, 20)),
      tambah("Berapa", teks("tq", 150, 66, "berapa lubang semuanya?", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Bibit cabai bertambah ------------------------------ */
const SUARA_C1 = "Igil menanam empat bibit cabai di bedeng. Satu, dua, tiga, empat.";
const SUARA_C2 = "Lalu Nenek datang membawa dua bibit cabai lagi. Bibitnya bertambah.";
const SUARA_C3 = "Igil tidak menghitung ulang dari satu. Ia mulai dari empat, lalu lima, enam. Semuanya enam bibit.";
const CABAI = deret(6, 70, 32, 160);
const posC3 = urutKata(SUARA_C3, ["lima,", "enam."], "empat,");

export const ADEGAN_CABAI: AdeganStory = {
  id: "cabai-bertambah",
  judul: "Bibit cabai bertambah",
  sumber: "Materi: bertambah dan hitung maju",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Bibit cabai bertambah"), ...bedeng("bd", 46, 138, 220, 36), ...orang("ig", 30, 80, E.igil, "Igil")),
      tambah("empat", ...deretEmo(E.cabai, "cb", CABAI.slice(0, 4), 20)),
      ...hitungMainan(SUARA_C1, "cb", CABAI.slice(0, 4), 20, "bedeng."),
    ),
    k(
      SUARA_C2,
      hapus(0, "tg"),
      tambah("Nenek", ...orang("nn", 262, 80, E.nenek, "Nenek")),
      tambah("dua", emo("cb4", 220, 112, E.cabai, 20), emo("cb5", 246, 112, E.cabai, 20)),
      ubah("bertambah.", { id: "cb4", ...CABAI[4] }, { id: "cb5", ...CABAI[5] }),
      tambah("bertambah.", ...label("tb", 104, 58, 92, "bertambah", W.pink)),
    ),
    k(
      SUARA_C3,
      hapus(0, "tb-k", "tb-t0"),
      sorotkan("mulai", "cbn3"),
      tambah(posC3[0], teks("cbn4", CABAI[4].x, CABAI[4].y - 21, "5", 11, W.merah)),
      tambah(posC3[1], teks("cbn5", CABAI[5].x, CABAI[5].y - 21, "6", 11, W.merah)),
      tambah("Semuanya", ...label("sm", 98, 58, 104, "semuanya 6", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Menulis kalimat penjumlahan ------------------------------ */
const SUARA_K1 = "Abang menuliskan cerita cabai di papan kebun dengan angka dan tanda.";
const SUARA_K2 = "Empat, tanda tambah, dua, tanda sama dengan, enam. Dibaca, empat ditambah dua sama dengan enam.";
const SUARA_K3 = "Tanda tambah berarti bertambah atau digabung. Tanda sama dengan menunjukkan hasilnya.";
const KAL: Obj[] = kalimat("kl", 170, 96, ["4", "+", "2", "=", "6"], 22, 30);
const lambang = (...i: number[]): Obj[] => i.map((n) => KAL[n]);

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat-penjumlahan",
  judul: "Menulis kalimat penjumlahan",
  sumber: "Materi: tanda tambah dan sama dengan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kalimat penjumlahan"), ...orang("ab", 30, 100, E.abang, "Abang")),
      tambah("cerita", ...deretDi(E.cabai, "cc", 6, 98, 30, 170, 18)),
      tambah("papan", ...papan("pp", 70, 50, 200, 66)),
      tambah("angka", ...lambang(0, 2, 4)),
      tambah("tanda.", ...lambang(1, 3)),
    ),
    k(
      SUARA_K2,
      sorotkan("Empat,", "kl0"),
      sorotkan("tambah,", "kl1"),
      sorotkan("dua,", "kl2"),
      sorotkan("dengan,", "kl3"),
      sorotkan("enam.", "kl4"),
      tambah("Dibaca,", teks("bc", 170, 144, "empat ditambah dua sama dengan enam", 9, W.ungu)),
    ),
    k(
      SUARA_K3,
      hapus(0, "bc", "cc0", "cc1", "cc2", "cc3", "cc4", "cc5"),
      tambah("Tanda", ...label("t1", 14, 150, 132, "+ artinya bertambah", W.hijauMuda, 9)),
      tambah("digabung.", ...label("t2", 14, 176, 132, "atau digabung", W.hijauMuda, 9)),
      tambah("sama", ...label("t3", 156, 150, 132, "= artinya hasilnya", W.langit, 9)),
    ),
  ],
};
