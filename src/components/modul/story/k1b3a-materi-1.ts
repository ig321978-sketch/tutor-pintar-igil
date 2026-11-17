import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kalimatK, kotak, kotakBekal, label, orang, teks, xLambang } from "./k1b3a-gambar";
import { hapus, hitungMainan, k, sorotkan, tambah, ubah } from "./k1b3a-bantu";

/*
 * Cerita orisinal IGIL "Bekal untuk Nenek" (Kelas 1 Bab 3 Sub-Bab A, cerita pengurangan), awal cerita Kereta ke Rumah Nenek.
 * Masalah: kue di kotak bekal adalah oleh-oleh untuk Nenek, tetapi perjalanan panjang dan semua lapar; tiap kali ada yang makan,
 * harus tahu berapa kue yang tersisa supaya Nenek tetap kebagian.
 * Penyelesaian: mula-mula, berkurang, sisa; kalimat pengurangan; hitung mundur; kotak bersekat sepuluh; sisa nol dan dikurangi nol.
 */

/* ------------------------------ 1. Naik kereta ke rumah Nenek ------------------------------ */
const SUARA_N1 = "Pagi ini Igil, Kaka, Abang, dan Mamah naik kereta. Mereka pergi ke rumah Nenek di desa.";
const SUARA_N2 = "Mamah membawa kotak berisi delapan kue. Kue itu oleh-oleh untuk Nenek.";
const SUARA_N3 = "Masalahnya, perjalanan masih panjang dan semua mulai lapar. Kalau kue dimakan, berapa yang tersisa untuk Nenek?";
const KUE_KECIL = Array.from({ length: 8 }, (_, i) => ({ x: 105 + (i % 4) * 30, y: 60 + Math.floor(i / 4) * 24 }));

export const ADEGAN_KERETA: AdeganStory = {
  id: "naik-kereta",
  judul: "Naik kereta ke rumah Nenek",
  sumber: "Materi: masalah bekal untuk Nenek",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Naik kereta ke rumah Nenek"), kotak("rel", 10, 186, 280, 6, "#94A3B8", W.biru, { rx: 2, z: -2 })),
      tambah("Igil,", ...orang("ig", 45, 150, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 150, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 150, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 255, 150, E.mamah, "Mamah")),
      tambah("kereta.", emo("kr", 110, 78, E.kereta, 44)),
      tambah("desa.", emo("rm", 240, 70, E.rumah, 30), teks("ds", 240, 96, "desa Nenek", 8.4, W.ungu)),
    ),
    k(
      SUARA_N2,
      hapus(0, "kr", "rm", "ds"),
      tambah("kotak", ...kotakBekal("kt", 88, 44, 124, 56)),
      tambah("delapan", ...KUE_KECIL.map((p, i) => emo(`ku${i}`, p.x, p.y + 6, E.kue, 18))),
      tambah("Nenek.", teks("un", 150, 116, "8 kue untuk Nenek", 10, W.ungu)),
    ),
    k(
      SUARA_N3,
      tambah("lapar.", emo("lp", 45, 118, E.lapar, 18), emo("lp2", 185, 118, E.lapar, 18)),
      ubah("lapar.", { id: "un", isi: "perjalanan masih panjang" }),
      tambah("tersisa", teks("tq", 150, 196, "berapa yang tersisa?", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Kue di kotak berkurang ------------------------------ */
const SUARA_K1 = "Abang mengambil satu kue. Igil juga mengambil satu kue. Kuenya diambil dua.";
const SUARA_K2 = "Mula-mula ada delapan kue. Sekarang kuenya berkurang, lebih sedikit dari tadi.";
const SUARA_K3 = "Igil menghitung kue yang tersisa. Satu, dua, tiga, empat, lima, enam. Sisanya enam kue.";
const KUE = deret(8, 46, 30, 100);

export const ADEGAN_KUE: AdeganStory = {
  id: "kue-berkurang",
  judul: "Kue di kotak berkurang",
  sumber: "Materi: berkurang dan sisa",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kue di kotak berkurang"), ...kotakBekal("kt", 26, 80, 248, 40), ...deretEmo(E.kue, "ku", KUE, 20)),
      tambah("Abang", ...orang("ab", 50, 166, E.abang, "Abang")),
      ubah("satu", { id: "ku7", x: 82, y: 168 }),
      tambah("Igil", ...orang("ig", 250, 166, E.igil, "Igil")),
      ubah("satu@2", { id: "ku6", x: 218, y: 168 }),
      tambah("dua.", ...label("da", 110, 140, 80, "diambil 2", W.pink)),
    ),
    k(
      SUARA_K2,
      hapus(0, "da-k", "da-t0"),
      tambah("Mula-mula", teks("t8", 80, 60, "mula-mula 8", 10, W.biru)),
      tambah("berkurang,", teks("tb", 220, 60, "berkurang", 10, W.merah)),
      ubah("sedikit", { id: "ku6", op: 0.3 }, { id: "ku7", op: 0.3 }),
    ),
    k(
      SUARA_K3,
      hapus(0, "t8", "tb"),
      ...hitungMainan(SUARA_K3, "ku", KUE.slice(0, 6), 20, "tersisa."),
      tambah("Sisanya", ...label("ss", 110, 140, 80, "sisa 6", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Menulis kalimat pengurangan ------------------------------ */
const SUARA_L1 = "Kaka menulis cerita kue di catatan perjalanan dengan angka dan tanda.";
const SUARA_L2 = "Delapan, tanda kurang, dua, tanda sama dengan, enam. Dibaca, delapan dikurangi dua sama dengan enam.";
const SUARA_L3 = "Tanda kurang berarti diambil, pergi, atau berkurang. Tanda sama dengan menunjukkan sisanya.";
const SUARA_L4 = "Jadi kalimat pengurangan punya tiga bagian: mula-mula, yang berkurang, dan sisa.";
const KX = 176;
const KAL: Obj[] = kalimatK("kl", KX, 94, ["8", KURANG, "2", "=", "6"], 24, 32);
const lambang = (...i: number[]): Obj[] => i.map((n) => KAL[n]);

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat-pengurangan",
  judul: "Menulis kalimat pengurangan",
  sumber: "Materi: tanda kurang dan sama dengan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kalimat pengurangan"), ...orang("kk", 34, 100, E.kaka, "Kaka")),
      tambah("cerita", ...deretEmo(E.kue, "cc", deret(8, 70, 30, 172), 18)),
      tambah("catatan", kotak("ct", 70, 46, 212, 72, "#FFFFFF", W.biru, { rx: 6, tebal: 2, z: -1 }), emo("ce", 270, 54, E.catatan, 16)),
      tambah("angka", ...lambang(0, 2, 4)),
      tambah("tanda.", ...lambang(1, 3)),
      ubah("tanda.", { id: "cc6", op: 0.3 }, { id: "cc7", op: 0.3 }),
    ),
    k(
      SUARA_L2,
      sorotkan("Delapan,", "kl0"),
      sorotkan("kurang,", "kl1"),
      sorotkan("dua,", "kl2"),
      sorotkan("dengan,", "kl3"),
      sorotkan("enam.", "kl4"),
      tambah("Dibaca,", teks("bc", KX, 140, "delapan dikurangi dua sama dengan enam", 8.6, W.ungu)),
    ),
    k(
      SUARA_L3,
      hapus(0, "bc", ...Array.from({ length: 8 }, (_, i) => `cc${i}`)),
      tambah("Tanda", ...label("t1", 14, 150, 136, `${KURANG} artinya diambil`, W.merahMuda, 9)),
      tambah("berkurang.", ...label("t2", 14, 176, 136, "pergi atau berkurang", W.merahMuda, 9)),
      tambah("sama", ...label("t3", 156, 150, 130, "= artinya sisanya", W.langit, 9)),
    ),
    k(
      SUARA_L4,
      hapus(0, "t1-k", "t1-t0", "t2-k", "t2-t0", "t3-k", "t3-t0"),
      tambah("tiga", ...label("tb", 90, 160, 120, "tiga bagian", W.emas, 10)),
      tambah("mula-mula,", teks("b0", xLambang(KX, 5, 0, 32), 64, "mula-mula", 8, W.biru)),
      tambah("berkurang,", teks("b2", xLambang(KX, 5, 2, 32), 64, "berkurang", 8, W.merah)),
      tambah("sisa.", teks("b4", xLambang(KX, 5, 4, 32), 64, "sisa", 8, W.hijau)),
    ),
  ],
};
