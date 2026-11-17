import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kardus, karton, kartu, label, lapangan, orang, deret, segitigaRel, sisiKe, sudutKe, sudutMutlak, teks, tutupKaleng, bulat } from "./k1b4a-gambar";
import { bersih, hapus, hitungMainan, k, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";

/*
 * Cerita orisinal IGIL "Bahan dari Gudang" (Kelas 1 Bab 4 Sub-Bab A, mengenal bentuk), awal cerita Festival Mainan Kardus.
 * Masalah: kampung mengadakan festival mainan; barang bekas dari gudang bercampur, padahal mainan butuh roda, atap, dan badan.
 * Penyelesaian: amati tepi benda, hitung sisi lurus dan sudut, beri nama bentuk (lengkung, segitiga, segi empat).
 */

/* ------------------------------ 1. Pengumuman festival ------------------------------ */
const SUARA_N1 = "Pak RT mengumumkan festival mainan kardus di lapangan kampung. Igil, Kaka, Abang, dan Mamah ingin ikut.";
const SUARA_N2 = "Abang membawa sekeranjang barang bekas dari gudang. Ada tutup kaleng, potongan karton, dan kardus, semuanya bercampur.";
const SUARA_N3 = "Mainan butuh roda, atap, dan badan. Bahan mana yang cocok? Kenali dulu bentuknya.";

export const ADEGAN_FESTIVAL: AdeganStory = {
  id: "pengumuman-festival",
  judul: "Pengumuman festival mainan",
  sumber: "Materi: masalah bahan festival",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Festival mainan kardus"), lapangan("lp", 128)),
      tambah("RT", ...orang("rt", 36, 66, E.pakRT, "Pak RT")),
      tambah("mengumumkan", emo("toa", 74, 58, E.toa, 16)),
      tambah("festival", ...kartu("pg", 96, 34, 190, 40, W.emas, ["Festival Mainan Kardus", "di lapangan kampung"], 9.4)),
      tambah("lapangan", emo("tn", 262, 118, E.tenda, 30)),
      tambah("Igil,", ...orang("ig", 50, 168, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 110, 168, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 170, 168, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 230, 168, E.mamah, "Mamah")),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Bahan dari gudang"), emo("gd", 44, 84, E.gudang, 38), teks("gdn", 44, 100, "gudang", 8.4, W.coklat)),
      tambah("Abang", ...orang("ab", 44, 160, E.abang, "Abang")),
      tambah("sekeranjang", emo("kr", 112, 150, E.keranjang, 34)),
      tambah("tutup", ...tutupKaleng("c0", 190, 72, 16)),
      tambah("karton,", karton("t0", 240, 76, 16)),
      tambah("kardus,", ...kardus("d0", 215, 112, 50, 30)),
      tambah("bercampur.", ...tutupKaleng("c1", 272, 118, 11), karton("t1", 166, 120, 12, { rot: 200 }), ...kardus("d1", 278, 80, 24, 18)),
    ),
    k(
      SUARA_N3,
      hapus(0, "ab", "ab-n", "kr"),
      tambah("roda,", ...tutupKaleng("ir", 56, 148, 8), ...label("nr", 14, 162, 84, "roda", W.langit)),
      tambah("atap,", emo("ia", 150, 154, E.rumah, 18), ...label("na", 108, 162, 84, "atap", W.pink)),
      tambah("badan.", emo("ib", 244, 154, E.kardus, 18), ...label("nb", 202, 162, 84, "badan", W.hijauMuda)),
      tambah("cocok?", teks("tq", 150, 42, "bahan mana yang cocok?", 10, W.merah)),
      ubah("bentuknya.", { id: "tq", isi: "kenali dulu bentuknya" }),
      tambah("bentuknya.", emo("kc", 118, 84, E.kaca, 22)),
    ),
  ],
};

/* ------------------------------ 2. Tutup kaleng yang lengkung ------------------------------ */
const SUARA_T1 = "Igil meraba tepi tutup kaleng. Tepinya melengkung terus, tanpa sisi lurus dan tanpa sudut.";
const SUARA_T2 = "Bentuknya lengkung. Saat didorong, tutup kaleng menggelinding. Cocok untuk roda!";
const SUARA_T3 = "Igil menghitung tutup kaleng. Satu, dua, tiga, empat. Ada empat roda.";
const KALENG = deret(4, 75, 50, 98);

export const ADEGAN_KALENG: AdeganStory = {
  id: "tutup-kaleng",
  judul: "Tutup kaleng yang lengkung",
  sumber: "Materi: bentuk lengkung",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tutup kaleng"), ...orang("ig", 36, 168, E.igil, "Igil"), ...tutupKaleng("bt", 120, 90, 38)),
      tambah("meraba", emo("tg", 120, 150, "\u{1F446}", 18)),
      sorotkan("melengkung", "bt"),
      tambah("melengkung", bulat("bt-o", 120, 90, 44, "none", W.merah, { tebal: 2, putus: true })),
      tambah("sisi", teks("ts", 240, 72, "tanpa sisi lurus", 9, W.merah)),
      tambah("sudut.", teks("tu", 240, 94, "tanpa sudut", 9, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "ts", "tu", "tg"),
      tambah("lengkung.", ...label("nm", 78, 146, 84, "lengkung", W.langit)),
      tambah("didorong,", emo("tg", 70, 96, "\u{1F449}", 20)),
      tambah("menggelinding.", garis("jl", 120, 134, 110, 0, W.abu, 2, { putus: true, z: -1 }), emo("ag", 176, 118, E.angin, 16)),
      ubah("menggelinding.", { id: "bt", x: 230 }, { id: "bt-d", x: 230 }, { id: "bt-o", x: 230 }),
      tambah("roda!", ...label("ur", 188, 150, 84, "untuk roda", W.emas), emo("rd", 270, 186, E.mobil, 16)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Empat tutup kaleng"), ...orang("ig", 36, 168, E.igil, "Igil")),
      tambah("tutup", ...KALENG.flatMap((p, i) => tutupKaleng(`tk${i}`, p.x, p.y, 18))),
      ...hitungMainan(SUARA_T3, "tk", KALENG, 22, "kaleng."),
      tambah("roda.", ...label("rd", 110, 148, 100, "4 roda", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Karton segitiga untuk atap ------------------------------ */
const SUARA_S1 = "Kaka menyusuri tepi potongan karton dan menghitung sisi lurus. Satu, dua, tiga.";
const SUARA_S2 = "Lalu ia menghitung sudut, tempat sisi lurus bertemu. Satu, dua, tiga.";
const SUARA_S3 = "Tiga sisi lurus dan tiga sudut, bentuknya segitiga. Cocok untuk atap. Ada dua karton segitiga.";
const SG = sudutMutlak(140, 102, segitigaRel(48));
const posS1 = urutKata(SUARA_S1, ["satu,", "dua,", "tiga."], "lurus.");
const posS2 = urutKata(SUARA_S2, ["satu,", "dua,", "tiga."], "bertemu.");

export const ADEGAN_KARTON: AdeganStory = {
  id: "karton-segitiga",
  judul: "Karton segitiga untuk atap",
  sumber: "Materi: bentuk segitiga",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Karton segitiga"), ...orang("kk", 36, 168, E.kaka, "Kaka"), karton("sg", 140, 102, 48)),
      sorotkan("menyusuri", "sg"),
      ...posS1.map((p, i) => tambah(p, ...sisiKe("sg", SG, i))),
    ),
    k(
      SUARA_S2,
      hapus(0, "sg-a0", "sg-a1", "sg-a2"),
      tambah("sudut,", teks("ts", 250, 60, "sudut: sisi bertemu", 8.4, W.hijau)),
      ...posS2.map((p, i) => tambah(p, ...sudutKe("sg", SG, i))),
    ),
    k(
      SUARA_S3,
      hapus(0, "ts", "sg-b0", "sg-b1", "sg-b2"),
      tambah("Tiga", ...label("ls", 210, 38, 84, "3 sisi lurus", W.merahMuda, 9)),
      tambah("sudut,", ...label("lu", 210, 64, 84, "3 sudut", W.hijauMuda, 9)),
      tambah("bentuknya", ...label("nm", 98, 160, 84, "segitiga", W.emas)),
      tambah("atap.", emo("ap", 252, 116, E.rumah, 24)),
      tambah("dua", karton("kt0", 236, 150, 12), karton("kt1", 268, 150, 12), teks("l2", 252, 180, "2 atap", 10, W.ungu)),
    ),
  ],
};
