import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kalimat, kartu, orang, teks, tikar } from "./k1b2a-gambar";
import { bingkai } from "./k1b1a-gambar";
import { bersih, hitungMainan, k, sorotkan, tambah, ubah } from "./k1b2a-bantu";
import { WARNA_METODE, kepala } from "./k1b2a-luar-1";

/* Video metode global Sub-Bab A: Part-Part-Whole (Bagian-Bagian-Utuh), Ten Frame (Bingkai Sepuluh), dan ringkasan. */

/* ------------------------------ 4. Part-Part-Whole: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua, Part-Part-Whole, atau Bagian-Bagian-Utuh. Ada tikar dengan satu kotak utuh dan dua kotak bagian.";
const SUARA_P2 = "Benda di kotak bagian pertama dan bagian kedua adalah dua kumpulan yang terpisah.";
const SUARA_P3 = "Kalau semua benda dipindah ke kotak utuh, kita tahu banyak semuanya.";
const SUARA_P4 = "Jadi, bagian dan bagian digabung menjadi utuh.";
const T = { x: 40, y: 58, w: 200 };

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Part-Part-Whole: bagian-bagian-utuh",
  sumber: "Metode global: Part-Part-Whole",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah("kedua,", ...kepala(1)), tambah("tikar", ...tikar("tk", T.x, T.y, T.w))),
    k(SUARA_P2, tambah("pertama", teks("ba", 88, 140, "bagian 1", 10, W.biru)), tambah("kedua", teks("bb", 192, 140, "bagian 2", 10, W.biru)), tambah("terpisah.", teks("ts", 140, 182, "dua kumpulan terpisah", 9, W.ungu))),
    k(SUARA_P3, sorotkan("utuh,", "tk-u"), tambah("semuanya.", teks("ut", 140, 86, "semuanya", 11, W.biru))),
    k(SUARA_P4, ubah("digabung", { id: "ts", isi: "bagian dan bagian jadi utuh" }), tambah("utuh.", emo("ok", 270, 160, E.benar, 22))),
  ],
};

/* ------------------------------ 5. Part-Part-Whole: terapan ------------------------------ */
const SUARA_Q1 = "Kaka menanam dua bibit terong di pot kiri. Igil menanam tiga bibit terong di pot kanan.";
const SUARA_Q2 = "Dua terong masuk bagian pertama, tiga terong masuk bagian kedua.";
const SUARA_Q3 = "Pindahkan semuanya ke kotak utuh. Satu, dua, tiga, empat, lima.";
const SUARA_Q4 = "Bagian dua dan bagian tiga, utuhnya lima. Dua ditambah tiga sama dengan lima.";
const BAG = [
  { x: 66, y: 142 },
  { x: 94, y: 142 },
  { x: 166, y: 142 },
  { x: 192, y: 142 },
  { x: 218, y: 142 },
];
const UTUH = [0, 1, 2, 3, 4].map((i) => ({ x: 84 + i * 28, y: 90 }));

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Part-Part-Whole: bibit terong",
  sumber: "Metode global: Part-Part-Whole, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(1)), tambah("Kaka", ...orang("kk", 40, 100, E.kaka, "Kaka")), tambah("dua", emo("tr0", 30, 150, E.terong, 20), emo("tr1", 54, 150, E.terong, 20)), tambah("Igil", ...orang("ig", 250, 100, E.igil, "Igil")), tambah("tiga", emo("tr2", 222, 150, E.terong, 20), emo("tr3", 248, 150, E.terong, 20), emo("tr4", 274, 150, E.terong, 20))),
    k(SUARA_Q2, bersih(0), tambah(0, ...kepala(1), ...tikar("tk", T.x, T.y, T.w)), tambah("Dua", ...BAG.slice(0, 2).map((p, i) => emo(`tr${i}`, p.x, p.y, E.terong, 20))), tambah("tiga", ...BAG.slice(2).map((p, i) => emo(`tr${2 + i}`, p.x, p.y, E.terong, 20)))),
    k(SUARA_Q3, ubah("Pindahkan", ...UTUH.map((p, i) => ({ id: `tr${i}`, x: p.x, y: p.y }))), ...hitungMainan(SUARA_Q3, "tr", UTUH, 20, "utuh.")),
    k(SUARA_Q4, bersih(0), tambah(0, ...kepala(1)), tambah("Bagian", teks("ga", 90, 120, "2", 22, W.biru)), tambah("bagian@2", teks("gb", 210, 120, "3", 22, W.biru)), tambah("utuhnya", teks("gu", 150, 80, "5", 26, W.merah)), tambah("ditambah", ...kalimat("kl", 150, 170, ["2", "+", "3", "=", "5"], 18, 26))),
  ],
};

/* ------------------------------ 6. Ten Frame: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Ten Frame, atau Bingkai Sepuluh. Bingkai punya dua baris, tiap baris lima kotak.";
const SUARA_F2 = "Isi kotak dari kiri ke kanan, baris atas dulu. Satu kotak, satu benda.";
const SUARA_F3 = "Baris atas penuh berarti lima. Kotak kosong menunjukkan berapa lagi sampai sepuluh.";
const SUARA_F4 = "Dengan bingkai, kita bisa melihat banyaknya tanpa menghitung satu per satu.";
const F = { x: 85, y: 80, s: 26 };
const tengah = (i: number) => ({ x: F.x + (i % 5) * F.s + F.s / 2, y: F.y + Math.floor(i / 5) * F.s + F.s / 2 });

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: bingkai sepuluh",
  sumber: "Metode global: Ten Frame",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("Bingkai@2", ...bingkai("bf", F.x, F.y, 0, F.s)), tambah("lima", teks("l5", 150, 70, "2 baris x 5 kotak", 9, W.ungu))),
    k(SUARA_F2, ubah(0, { id: "l5", isi: "kiri ke kanan" }), ...[0, 1, 2].map((i) => tambah(["Isi", "kanan,", "dulu."][i], emo(`fj${i}`, tengah(i).x, tengah(i).y + 6, E.jagung, 18)))),
    k(SUARA_F3, tambah("penuh", emo("fj3", tengah(3).x, tengah(3).y + 6, E.jagung, 18), emo("fj4", tengah(4).x, tengah(4).y + 6, E.jagung, 18), teks("t5", 236, 98, "5", 14, W.merah)), sorotkan("kosong", "bf-c5", "bf-c6", "bf-c7", "bf-c8", "bf-c9"), tambah("sepuluh.", teks("t10", 150, 154, "5 lagi sampai 10", 10, W.merah))),
    k(SUARA_F4, tambah("bingkai,", ...kartu("cp", 70, 168, 160, 24, W.hijauMuda, ["lihat, bukan hitung"], 10)), tambah("satu.@2", emo("ok", 262, 180, E.benar, 20))),
  ],
};

/* ------------------------------ 7. Ten Frame: terapan ------------------------------ */
const SUARA_G1 = "Mamah menanam lima bibit jagung. Baris atas bingkai jadi penuh.";
const SUARA_G2 = "Lalu Mamah menanam tiga bibit jagung lagi di baris bawah.";
const SUARA_G3 = "Lima di atas dan tiga di bawah. Kita langsung tahu, semuanya delapan.";
const SUARA_G4 = "Masih ada dua kotak kosong. Lima ditambah tiga sama dengan delapan.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: bibit jagung",
  sumber: "Metode global: Ten Frame, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2), ...bingkai("bf", F.x, F.y, 0, F.s)), tambah("Mamah", ...orang("mm", 40, 110, E.mamah, "Mamah")), tambah("lima", ...[0, 1, 2, 3, 4].map((i) => emo(`gj${i}`, tengah(i).x, tengah(i).y + 6, E.jagung, 18))), tambah("penuh.", teks("t5", 236, 98, "5", 14, W.merah))),
    k(SUARA_G2, tambah("tiga", ...[5, 6, 7].map((i) => emo(`gj${i}`, tengah(i).x, tengah(i).y + 6, E.jagung, 18))), tambah("bawah.", teks("t3", 236, 124, "3", 14, W.merah))),
    k(SUARA_G3, sorotkan("Lima", "t5"), sorotkan("tiga", "t3"), tambah("delapan.", ...kartu("d8", 100, 150, 100, 24, W.emas, ["semuanya 8"], 11))),
    k(SUARA_G4, sorotkan("kosong.", "bf-c8", "bf-c9"), tambah("Lima", ...kalimat("kl", 150, 196, ["5", "+", "3", "=", "8"], 16, 24))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk penjumlahan.";
const SUARA_Z2 = "Counting On: simpan bilangan pertama, lalu hitung maju.";
const SUARA_Z3 = "Part-Part-Whole: dua bagian digabung menjadi utuh.";
const SUARA_Z4 = "Ten Frame: isi bingkai, lalu lihat baris yang penuh dan kotak yang kosong.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("penjumlahan.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Counting", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Counting On", "simpan, lalu hitung maju"], 9.4))),
    k(SUARA_Z3, tambah("Part-Part-Whole:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Part-Part-Whole", "bagian dan bagian jadi utuh"], 9.4))),
    k(SUARA_Z4, tambah("Ten", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Ten Frame", "lihat baris penuh dan kotak kosong"], 9.4))),
  ],
};
