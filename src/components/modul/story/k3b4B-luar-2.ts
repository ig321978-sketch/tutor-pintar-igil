import type { AdeganStory } from "./logika-story";
import { E, W, busurDerajat, emo, garis, judul, juring, kaki, kartu, kotak, rumput, teks, tokoh } from "./k3b4B-gambar";
import { hapus, k, redamkan, sorotkan, tambah } from "./k3b4B-bantu";

/*
 * Cerita orisinal IGIL "Sudut Kak Anton" (Kelas 3 Bab 4 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4b.md. Bagian ini: Benchmark Angles (Sudut Acuan), Protractor Walk (Langkah Busur), terapan keduanya, dan ringkasan.
 */
const ABU = "#64748B";

/* ------------------------------ Benchmark Angles: konsep ------------------------------ */
const SUARA_A1 = "Cara kedua, Benchmark Angles, atau Sudut Acuan.";
const SUARA_A2 = "Kita hafalkan dua sudut acuan, yaitu siku-siku dan lurus.";
const SUARA_A3 = "Sudut yang lebih kecil daripada siku-siku pasti lancip, dan yang lebih besar tetapi belum lurus pasti tumpul.";
const SUARA_A4 = "Dengan acuan, kita bisa memperkirakan jenis sudut sebelum mengukurnya.";

export const ADEGAN_LUAR_ACUAN: AdeganStory = {
  id: "luar-acuan",
  judul: "Benchmark Angles: Sudut Acuan",
  sumber: "Metode global: Benchmark Angles (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Cara 2: Benchmark Angles"), ...rumput("rt", 150)),
      tambah("Benchmark", emo("sg", 150, 100, E.segitiga, 36)),
      tambah("Sudut", teks("nm", 150, 140, "Sudut Acuan", 13, W.ungu)),
    ),
    k(
      SUARA_A2,
      hapus(0, "sg", "nm"),
      tambah("dua", teks("n2", 150, 56, "2 acuan", 11, W.ungu)),
      tambah("siku-siku", kaki("a1", 50, 140, 50, 0, W.hijau, 4), kaki("a2", 50, 140, 50, 90, W.hijau, 4), kotak("ms", 50, 126, 14, 14, undefined, W.merah, { rx: 0, tebal: 1.4, z: 4 }), teks("l90", 84, 100, "90°", 11, W.hijauTua)),
      tambah("lurus.", kaki("e1", 200, 140, 48, 0, W.biru, 4), kaki("e2", 200, 140, 48, 180, W.biru, 4), teks("l180", 200, 120, "180°", 11, W.biru)),
    ),
    k(
      SUARA_A3,
      tambah("kecil", kaki("k40", 50, 140, 40, 40, W.merah, 3, { putus: true })),
      tambah("lancip,", teks("lc", 62, 164, "lancip", 10, W.merah)),
      tambah("besar", kaki("k130", 200, 140, 40, 130, W.oranye, 3, { putus: true })),
      tambah("tumpul.", teks("tm", 200, 164, "tumpul", 10, W.oranye)),
    ),
    k(
      SUARA_A4,
      tambah("memperkirakan", emo("pk", 262, 60, E.pikir, 24)),
      tambah("jenis", teks("jn", 150, 186, "jenis sudut ketahuan", 10, W.ungu)),
      tambah("sebelum", emo("ok", 262, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Benchmark Angles: terapan ------------------------------ */
const SUARA_M1 = "Bima melihat sudut tali dan menyebutnya lancip, karena kurang dari pojok kertas.";
const SUARA_M2 = "Ia lalu mengukurnya dengan busur, dan hasilnya memang kurang dari sembilan puluh derajat.";
const SUARA_M3 = "Cocok untuk memeriksa apakah hasil baca busur masuk akal.";
const SUARA_M4 = "Kurang cocok untuk mencari besar sudut yang pas, karena acuan hanya perkiraan.";

export const ADEGAN_LUAR_ACUAN_TERAPAN: AdeganStory = {
  id: "luar-acuan-terapan",
  judul: "Benchmark Angles: sudut tali Bima",
  sumber: "Metode global: Benchmark Angles (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Sudut Tali Bima"), ...rumput("rt", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("sudut", kaki("t1", 160, 140, 80, 0, W.coklat, 3), kaki("t2", 160, 140, 80, 50, W.merah, 3), juring("jr", 160, 140, 26, 0, 50)),
      tambah("lancip,", teks("lc", 250, 110, "lancip", 10, W.hijauTua)),
      tambah("pojok", kotak("pj", 160, 112, 28, 28, undefined, ABU, { rx: 0, tebal: 1.2, putus: true })),
    ),
    k(
      SUARA_M2,
      tambah("busur,", emo("bs", 262, 56, E.segitiga, 22)),
      tambah("hasilnya", teks("d90", 120, 60, "kurang dari 90°", 10, W.hijauTua)),
      tambah("memang", emo("ok", 262, 84, E.benar, 20)),
    ),
    k(
      SUARA_M3,
      hapus(0, "bs", "ok"),
      tambah("Cocok", emo("ok2", 262, 56, E.benar, 24)),
      tambah("hasil", teks("hb", 250, 134, "hasil baca", 9, W.hijauTua)),
      tambah("akal.", teks("ma", 250, 150, "masuk akal", 9, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok2", "hb", "ma", "d90"),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 24)),
      tambah("pas,", teks("pq", 120, 60, "besar pas = ?", 10, W.merah)),
      tambah("perkiraan.", teks("ap", 250, 134, "acuan ≈", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Protractor Walk: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Protractor Walk, atau Langkah Busur.";
const SUARA_B2 = "Langkah satu, titik tengah busur di titik sudut.";
const SUARA_B3 = "Langkah dua, garis nol di kaki pertama. Langkah tiga, lihat kaki kedua dan baca skala dari nol.";
const SUARA_B4 = "Langkah empat, tulis hasilnya dengan satuan derajat.";

export const ADEGAN_LUAR_BUSUR: AdeganStory = {
  id: "luar-busur",
  judul: "Protractor Walk: Langkah Busur",
  sumber: "Metode global: Protractor Walk (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Protractor Walk"), ...rumput("rt", 150)),
      tambah("Protractor", ...busurDerajat("pt", 150, 128, 60)),
      tambah("Langkah", teks("nm", 150, 172, "Langkah Busur", 13, W.ungu)),
    ),
    k(
      SUARA_B2,
      hapus(0, "nm"),
      tambah("satu,", teks("st1", 256, 60, "1. titik tengah", 9, W.hijauTua)),
      tambah("titik", kaki("s1", 150, 128, 70, 0, W.bambu, 3), kaki("s2", 150, 128, 70, 50, W.merah, 3)),
      sorotkan("sudut.", "pt-c"),
    ),
    k(
      SUARA_B3,
      tambah("dua,", teks("st2", 256, 80, "2. garis nol", 9, W.hijauTua)),
      sorotkan("nol", "pt-a0"),
      tambah("tiga,", teks("st3", 256, 100, "3. baca skala", 9, W.hijauTua)),
      sorotkan("kedua", "s2"),
      sorotkan("skala", ...[0, 30, 60, 90, 120, 150, 180].map((t) => `pt-a${t}`)),
    ),
    k(
      SUARA_B4,
      tambah("empat,", teks("st4", 256, 120, "4. tulis derajat", 9, W.hijauTua)),
      tambah("hasilnya", teks("h50", 160, 58, "50°", 12, W.merah)),
      tambah("derajat.", emo("ps", 262, 150, E.pensil, 20)),
    ),
  ],
};

/* ------------------------------ Protractor Walk: terapan ------------------------------ */
const SUARA_P1 = "Raka mengukur sudut tali dengan empat langkah itu, satu per satu.";
const SUARA_P2 = "Ia membaca skala yang dimulai dari nol, dan hasilnya masuk akal.";
const SUARA_P3 = "Cocok untuk mengukur besar sudut dengan tepat.";
const SUARA_P4 = "Kurang cocok kalau langkahnya dilompati, karena skala yang salah memberi bacaan yang salah.";

export const ADEGAN_LUAR_BUSUR_TERAPAN: AdeganStory = {
  id: "luar-busur-terapan",
  judul: "Protractor Walk: Raka mengukur tali",
  sumber: "Metode global: Protractor Walk (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Raka Mengukur Tali"), ...rumput("rt", 150)),
      tambah("Raka", ...tokoh("rk", 30, 184, "Raka")),
      tambah("sudut", ...busurDerajat("bs", 160, 148, 70), kaki("b1", 160, 148, 74, 0, W.bambu, 3), kaki("b2", 160, 148, 74, 50, W.merah, 3)),
      tambah("empat", teks("n4", 262, 70, "4 langkah", 10, W.merah)),
      tambah("satu", teks("n1", 262, 100, "1 per 1", 10, W.hijauTua)),
    ),
    k(
      SUARA_P2,
      sorotkan("skala", ...[0, 30, 60, 90, 120, 150, 180].map((t) => `bs-a${t}`)),
      tambah("hasilnya", teks("t50", 168, 62, "50°", 12, W.hijauTua)),
      tambah("akal.", emo("ok", 262, 130, E.benar, 20)),
    ),
    k(
      SUARA_P3,
      hapus(0, "n4", "n1"),
      redamkan("Cocok", ...[0, 30, 60, 90, 120, 150, 180].map((t) => `bs-a${t}`)),
      tambah("mengukur", emo("ok2", 262, 70, E.benar, 26)),
      tambah("tepat.", teks("tp", 262, 100, "tepat", 11, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      hapus(0, "ok2", "tp", "ok"),
      tambah("Kurang", emo("xs", 262, 70, E.salah, 26)),
      sorotkan("skala", ...[0, 30, 60, 90, 120, 150, 180].map((t) => `bs-b${t}`)),
      tambah("bacaan", teks("s130", 262, 100, "130°", 11, W.merah, { op: 0.6 })),
      tambah("salah.", garis("cr", 244, 104, 36, -12, W.merah, 2)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin memeriksa siku-siku, pakai Lipat Kertas. Ingin memeriksa hasil baca, pakai Sudut Acuan.";
const SUARA_R3 = "Ingin besar sudut yang tepat, pakai Langkah Busur. Apa pun caranya, besar sudut ditulis dengan derajat.";
const SUARA_R4 = "Menurutmu, untuk mengetahui besar sudut tali layang-layang, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara memeriksa sudut",
  sumber: "Metode global: ringkasan tiga cara",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Memilih Cara")),
      tambah("Tiga", teks("n3", 150, 44, "3 cara", 11, W.ungu)),
      tambah("cara", ...kartu("r0", 8, 60, 90, 44, "#FEF3C7", ["Lipat Kertas"], 9), ...kartu("r1", 105, 60, 90, 44, "#DBEAFE", ["Sudut Acuan"], 9), ...kartu("r2", 202, 60, 90, 44, "#DCFCE7", ["Langkah Busur"], 9)),
      tambah("keadaan.", teks("tq", 150, 162, "?", 30, W.merah)),
    ),
    k(
      SUARA_R2,
      sorotkan("Lipat", "r0-k"),
      tambah("Kertas.", teks("g0", 56, 128, "siku-siku?", 8, W.hijauTua)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Sudut", "r1-k"),
      tambah("Acuan.", teks("g1", 150, 128, "hasil baca?", 8, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Langkah", "r2-k"),
      tambah("Busur.", teks("g2", 246, 128, "besar sudut?", 8, W.hijauTua)),
      tambah("derajat.", teks("sb", 150, 188, "besar sudut ditulis dengan derajat", 9, W.ungu)),
    ),
    k(
      SUARA_R4,
      hapus(0, "g0", "g1", "g2", "sb", "tq"),
      redamkan("Menurutmu", "r2-k"),
      tambah("layang-layang,", emo("ly", 250, 160, E.layang, 28)),
      tambah("cara", teks("tq2", 150, 150, "?", 30, W.merah)),
      sorotkan("pas?", "r0-k", "r1-k", "r2-k"),
    ),
  ],
};
