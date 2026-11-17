import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WT, Y_TANAH, balok, emo, geserTiang, judul, kartu, kotak, orang, panah, putus, tali, taliTegak, tanah, teks, tiang } from "./k1b7A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b7A-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b7A-luar-1";

/* Video metode global Sub-Bab A "Tiang dan Tangga": Indirect Comparison (Banding dengan Perantara), Seriation (Menyusun Tangga), dan ringkasan. */

/* ------------------------------ 4. Indirect Comparison: konsep ------------------------------ */
const SUARA_I1 = "Cara kedua, Indirect Comparison, atau Banding dengan Perantara.";
const SUARA_I2 = "Kalau dua benda tidak bisa didekatkan, pakai perantara, misalnya seutas tali.";
const SUARA_I3 = "Tarik tali sepanjang benda pertama, tandai ujungnya.";
const SUARA_I4 = "Bawa tali itu ke benda kedua, lalu lihat apakah tali pas, kurang, atau lebih.";

export const ADEGAN_LUAR_PERANTARA: AdeganStory = {
  id: "luar-perantara",
  judul: "Indirect Comparison: banding dengan perantara",
  sumber: "Metode global: Indirect Comparison",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, ...kepala(1), tanah("tn")),
      tambah("Indirect", ...tiang("ta", 50, Y_TANAH, 56, WT.merah)),
      tambah("Perantara.", ...tiang("tb", 250, Y_TANAH, 72, WT.kuning), teks("jh", 150, 110, "berjauhan", 11, W.merah)),
    ),
    k(
      SUARA_I2,
      tambah("dua", teks("dn", 150, 80, "2 benda", 12, W.biru)),
      tambah("tidak", emo("sl", 150, 134, E.salah, 22)),
      tambah("perantara,", tali("tl", 92, 118, 116, WT.tali)),
      tambah("tali.", teks("pt", 150, 166, "perantara: tali", 9.4, WT.tali)),
    ),
    k(
      SUARA_I3,
      hapus(0, "tl", "dn", "sl", "jh", "pt"),
      tambah("Tarik", taliTegak("tt", 68, Y_TANAH - 56, 56)),
      tambah("tandai", putus("gm", 56, Y_TANAH - 56, 80, Y_TANAH - 56, W.merah, 2), teks("tn2", 150, 90, "tandai ujungnya", 9.4, W.merah)),
    ),
    k(
      SUARA_I4,
      hapus(0, "tn2"),
      ubah("Bawa", { id: "tt", x: 232 }, { id: "gm", x: 220 }),
      tambah("pas,", ...kartu("c1", 20, 168, 80, 22, W.krem, ["pas"], 10)),
      tambah("kurang,", ...kartu("c2", 110, 168, 80, 22, "#BFDBFE", ["kurang"], 10)),
      tambah("lebih.", ...kartu("c3", 200, 168, 80, 22, "#FECACA", ["lebih"], 10)),
      sorotkan("kurang,", "tt"),
    ),
  ],
};

/* ------------------------------ 5. Indirect Comparison: terapan ------------------------------ */
const SUARA_J1 = "Abang ingin tahu, pintu rumah pohon atau pagar halaman yang lebih tinggi. Keduanya berjauhan.";
const SUARA_J2 = "Tali ditarik setinggi pintu, lalu dibawa ke pagar. Ujung tali tidak sampai ke atas, jadi pagar lebih tinggi.";
const SUARA_J3 = "Cocok untuk benda yang berjauhan dan tidak bisa dipindah.";
const SUARA_J4 = "Kurang cocok kalau talinya melar atau tidak lurus, karena hasilnya jadi keliru.";
const PAGAR = [0, 1, 2, 3].map((i) => kotak(`pg${i}`, 226 + i * 16, Y_TANAH - 76, 10, 76, WT.putih, W.biru, { rx: 2, tebal: 1.4 }));

export const ADEGAN_LUAR_PERANTARA_TERAPAN: AdeganStory = {
  id: "luar-perantara-terapan",
  judul: "Perantara tali: pintu dan pagar",
  sumber: "Metode global: Indirect Comparison, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, ...kepala(1), tanah("tn")),
      tambah("Abang", ...orang("ab", 150, 176, E.abang, "Abang")),
      tambah("pintu", kotak("pn", 40, Y_TANAH - 56, 30, 56, WT.kayu, W.biru, { rx: 3, tebal: 1.6 }), teks("lp", 55, 164, "pintu", 9, W.biru)),
      tambah("pagar", ...PAGAR, teks("lg", 250, 164, "pagar", 9, W.biru)),
      tambah("Keduanya", teks("jh", 150, 120, "berjauhan", 11, W.merah)),
    ),
    k(
      SUARA_J2,
      hapus(0, "jh"),
      tambah("Tali", taliTegak("tt", 82, Y_TANAH - 56, 56)),
      ubah("dibawa", { id: "tt", x: 212 }),
      tambah("tidak", teks("kr", 150, 90, "tali kurang", 10, W.merah)),
      tambah("tinggi@2", ...kartu("pl", 90, 34, 120, 22, WT.kuning, ["pagar lebih tinggi"], 9.4)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Cocok", emo("ok", 150, 100, E.benar, 40)),
      tambah("berjauhan", ...kartu("cc", 50, 116, 200, 22, "#BBF7D0", ["benda berjauhan"], 10)),
      tambah("dipindah.", ...kartu("cd", 50, 146, 200, 22, W.krem, ["tidak bisa dipindah"], 10)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("talinya", { id: "tw", t: "jalur", x: 60, y: 100, d: "M0 0 Q20 -16 40 0 T80 0 T120 0 T180 0", warna: "none", garis: WT.tali, tebal: 5 }),
      tambah("melar", teks("mr", 150, 132, "tali melar", 10, W.merah)),
      tambah("keliru.", emo("sl", 150, 160, E.salah, 26), teks("hk", 150, 188, "hasil keliru", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Seriation: konsep ------------------------------ */
const SUARA_T1 = "Cara ketiga, Seriation, atau Menyusun Tangga.";
const SUARA_T2 = "Beberapa benda disusun dari yang paling pendek sampai yang paling panjang.";
const SUARA_T3 = "Tiap benda lebih panjang dari yang di sebelah kirinya.";
const SUARA_T4 = "Benda yang sama panjang boleh bertukar tempat.";
const TINGGI5 = [48, 92, 28, 70, 48];
const WARNA5 = ["#F59E0B", "#B45309", "#D97706", "#A16207", "#92400E"];
const X_ACAK = [70, 110, 150, 190, 230];
/** Urutan dari paling pendek: indeks 2, 0, 4, 3, 1. */
const X_URUT: Record<number, number> = { 2: 70, 0: 110, 4: 150, 3: 190, 1: 230 };
const lima = (id: string, xs: number[]): Obj[] => TINGGI5.flatMap((h, i) => tiang(`${id}${i}`, xs[i], Y_TANAH, h, WARNA5[i]));

export const ADEGAN_LUAR_TANGGA: AdeganStory = {
  id: "luar-tangga",
  judul: "Seriation: menyusun tangga",
  sumber: "Metode global: Seriation",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, ...kepala(2), tanah("tn")),
      tambah("Seriation,", ...lima("t", X_ACAK)),
      tambah("Tangga.", teks("ac", 150, 166, "urutan masih acak", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus("disusun", "ac"),
      ubah("disusun", ...TINGGI5.flatMap((h, i) => geserTiang(`t${i}`, X_URUT[i], Y_TANAH, h))),
      tambah("pendek", teks("lk", 66, 166, "paling pendek", 9, W.hijau)),
      tambah("panjang.", teks("lg", 232, 166, "paling panjang", 9, W.biru)),
      tambah("sampai", panah("pa", 90, 176, 210, 176, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("lebih", putus("s0", 70, Y_TANAH - 28, 110, Y_TANAH - 48, W.merah, 2), putus("s1", 110, Y_TANAH - 48, 150, Y_TANAH - 48, W.merah, 2), putus("s2", 150, Y_TANAH - 48, 190, Y_TANAH - 70, W.merah, 2), putus("s3", 190, Y_TANAH - 70, 230, Y_TANAH - 92, W.merah, 2)),
      tambah("kirinya.", teks("mk", 150, 192, "makin ke kanan, makin panjang", 9, W.merah)),
    ),
    k(
      SUARA_T4,
      hapus(0, "mk"),
      sorotkan("sama", "t0", "t4"),
      tambah("bertukar", panah("p1", 118, 92, 142, 92, W.biru, { tebal: 2.4 }), panah("p2", 142, 98, 118, 98, W.biru, { tebal: 2.4 })),
      ubah("tempat.", ...geserTiang("t0", 150, Y_TANAH, 48), ...geserTiang("t4", 110, Y_TANAH, 48), { id: "t0", sorot: false }, { id: "t4", sorot: false }),
    ),
  ],
};

/* ------------------------------ 7. Seriation: terapan ------------------------------ */
const SUARA_U1 = "Mamah mengacak lima tongkat kayu. Kaka menyusunnya menjadi tangga.";
const SUARA_U2 = "Tongkat paling pendek di kiri, dan paling panjang di kanan. Satu tongkat yang salah tempat langsung terlihat patah.";
const SUARA_U3 = "Cara ini cocok untuk banyak benda sekaligus.";
const SUARA_U4 = "Untuk dua benda saja, tangga terlalu repot. Cukup pakai Banding Langsung.";
const TINGGI_TK = [64, 36, 88, 52, 26];
const X_TK_ACAK = [70, 110, 150, 190, 230];
/** Urutan dari paling pendek: tk4 (26), tk1 (36), tk3 (52), tk0 (64), tk2 (88). */
const X_TK_URUT: Record<number, number> = { 4: 70, 1: 110, 3: 150, 0: 190, 2: 230 };
const tongkat = (xs: number[]): Obj[] => TINGGI_TK.flatMap((h, i) => tiang(`tk${i}`, xs[i], Y_TANAH, h, WARNA5[i]));

export const ADEGAN_LUAR_TANGGA_TERAPAN: AdeganStory = {
  id: "luar-tangga-terapan",
  judul: "Menyusun tangga dari lima tongkat",
  sumber: "Metode global: Seriation, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      bersih(0),
      tambah(0, ...kepala(2), tanah("tn")),
      tambah("Mamah", ...orang("mm", 36, 176, E.mamah, "Mamah")),
      tambah("lima", teks("ln", 262, 90, "5 tongkat", 11, W.biru)),
      tambah("tongkat", ...tongkat(X_TK_ACAK)),
      tambah("Kaka", ...orang("kk", 262, 176, E.kaka, "Kaka")),
    ),
    k(
      SUARA_U2,
      hapus(0, "ln"),
      ubah("kiri,", ...TINGGI_TK.flatMap((h, i) => geserTiang(`tk${i}`, X_TK_URUT[i], Y_TANAH, h))),
      ubah("Satu", ...geserTiang("tk0", 150, Y_TANAH, 64), ...geserTiang("tk3", 190, Y_TANAH, 52)),
      tambah("Satu", teks("sa", 150, 172, "1 tongkat salah tempat", 9.4, W.merah)),
      sorotkan("patah.", "tk3"),
      tambah("patah.", emo("pt", 190, 74, E.salah, 22)),
    ),
    k(
      SUARA_U3,
      hapus(0, "sa", "pt"),
      ubah(0, { id: "tk3", sorot: false }, ...geserTiang("tk0", 190, Y_TANAH, 64), ...geserTiang("tk3", 150, Y_TANAH, 52)),
      tambah("cocok", emo("ok", 262, 120, E.benar, 26)),
      tambah("banyak", ...kartu("bn", 80, 164, 140, 22, "#BBF7D0", ["banyak benda"], 10)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("dua", balok("ka", 60, 76, 120, WT.kuning), balok("kb", 60, 100, 90, WT.hijau), teks("dn", 232, 90, "2 benda", 12, W.biru)),
      tambah("repot.", emo("sl", 232, 130, E.salah, 24)),
      tambah("Banding", ...kartu("bl", 70, 140, 160, 26, W.emas, ["Banding Langsung"], 11)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_R2 = "Dua benda yang bisa digeser, pakai Banding Langsung. Benda yang berjauhan, pakai perantara.";
const SUARA_R3 = "Banyak benda yang ingin diurutkan, pakai tangga.";
const SUARA_R4 = "Menurutmu, untuk membandingkan sepuluh tongkat kayu, kamu pilih yang mana?";
const TINGGI10 = [40, 72, 28, 60, 84, 34, 66, 48, 78, 54];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara membandingkan panjang",
  sumber: "Metode global: ringkasan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("3 cara tadi")),
      ...NAMA_METODE.map((m, i) => tambah(["tiga", "pas?", "tergantung"][i], ...kartu(`r${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [m], 11))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Mana yang pas?")),
      tambah("Dua", ...kartu("q0", 20, 40, 260, 40, W.hijauMuda, ["2 benda digeser: Banding Langsung"], 10.4)),
      tambah("berjauhan,", ...kartu("q1", 20, 90, 260, 40, W.krem, ["berjauhan: Banding dengan Perantara"], 10.4)),
    ),
    k(SUARA_R3, tambah("Banyak", ...kartu("q2", 20, 140, 260, 40, W.pink, ["banyak benda: Menyusun Tangga"], 10.4))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih yang mana?"), tanah("tn", 170)),
      tambah("tongkat", ...TINGGI10.flatMap((h, i) => tiang(`tj${i}`, 36 + i * 25, 170, h, WARNA5[i % 5]))),
      tambah("sepuluh", teks("sp", 150, 44, "10 tongkat", 12, W.biru)),
      tambah("mana?", emo("tq", 150, 192, E.tanya, 22)),
    ),
  ],
};
