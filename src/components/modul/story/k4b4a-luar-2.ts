import type { AdeganStory, Obj } from "./logika-story";
import { E, K, W, emo, judul, kotak, panah, papanTulis, petak, tanah, teks, tokoh } from "./k4b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b4a-bantu";
import { petakKapur } from "./k4b4a-luar-1";

/*
 * Cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Kelas 4 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b4a.md. Bagian ini: Rows and Columns (Baris dan Kolom) dan terapannya, Unit Square Ladder (Tangga Satuan) dan terapannya, ringkasan.
 */

/* ------------------------------ Rows and Columns: konsep ------------------------------ */
const SUARA_T1 = "Cara kedua, Rows and Columns, atau Baris dan Kolom.";
const SUARA_T2 = "Kita menghitung banyak petak dalam satu baris, lalu banyak baris, dan keduanya dikalikan.";
const SUARA_T3 = "Perkalian itu cara cepat menghitung persegi satuan yang berderet rapi.";
const SUARA_T4 = "Hasilnya selalu sama dengan menghitung petak satu per satu.";

export const ADEGAN_LUAR_BARIS: AdeganStory = {
  id: "luar-baris",
  judul: "Rows and Columns: Baris dan Kolom",
  sumber: "Metode global: Rows and Columns (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Cara 2: Rows and Columns"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Rows", teks("nm", 150, 56, "Rows and Columns", 13, K.kapurMerah)),
      tambah("Baris", teks("ni", 150, 74, "Baris dan Kolom", 10, K.kapur)),
      tambah("Kolom.", ...petakKapur("g", 106, 82, 3, 4, 22)),
    ),
    k(
      SUARA_T2,
      sorotkan("petak", "g-c0", "g-c1", "g-c2", "g-c3"),
      tambah("satu", teks("r1", 240, 94, "1 baris", 10, K.kapurBiru)),
      tambah("banyak@2", teks("rb", 240, 116, "3 baris", 10, K.kapurBiru)),
      tambah("dikalikan.", teks("kl", 240, 134, "3 × 4", 11, K.kapurMerah)),
    ),
    k(
      SUARA_T3,
      tambah("Perkalian", teks("pk", 240, 68, "3 × 4 = 12", 10, K.kapur)),
      tambah("cepat", emo("rk", 270, 118, E.roket, 18)),
      tambah("rapi.", emo("ok", 270, 148, E.benar, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "rk", "ok", "pk"),
      tambah("Hasilnya", teks("hs", 240, 68, "12 petak", 10, K.kapur)),
      tambah("sama", teks("sm", 240, 148, "sama!", 10, K.kapurBiru)),
      tambah("satu", teks("sp", 150, 154, "1 per 1", 8.4, K.kapur)),
    ),
  ],
};

/* ------------------------------ Rows and Columns: terapan ------------------------------ */
const SUARA_U1 = "Genta melihat denah dengan empat baris dan lima kolom petak.";
const SUARA_U2 = "Ia menduga dulu, lalu mengalikan empat dengan lima dan mendapat dua puluh sentimeter persegi.";
const SUARA_U3 = "Cocok untuk bidang persegi panjang, karena barisnya sama panjang.";
const SUARA_U4 = "Kurang cocok untuk bentuk yang bengkok, karena baris dan kolomnya tidak rata, jadi harus dipotong dulu.";

export const ADEGAN_LUAR_BARIS_TERAPAN: AdeganStory = {
  id: "luar-baris-terapan",
  judul: "Baris dan Kolom: kapan cocok",
  sumber: "Metode global: Rows and Columns (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Denah Genta"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("denah", ...petakKapur("g", 110, 50, 4, 5, 16)),
      tambah("empat", teks("b4", 78, 84, "4 baris", 9, K.kapurBiru)),
      tambah("lima", teks("k5", 150, 44, "5 kolom", 9, K.kapurBiru)),
    ),
    k(
      SUARA_U2,
      tambah("menduga", teks("dg", 62, 128, "duga dulu", 9, K.kapurBiru)),
      tambah("mengalikan", teks("ft", 150, 128, "4 × 5 = 20", 11, K.kapurMerah)),
      tambah("dua", teks("ls", 150, 144, "20 cm²", 11, K.kapur)),
      sorotkan("persegi.", "ls"),
    ),
    k(
      SUARA_U3,
      tambah("Cocok", emo("ok", 100, 172, E.benar, 20)),
      tambah("persegi", teks("pk", 170, 170, "persegi panjang", 9, W.hijauTua)),
      tambah("barisnya", teks("sp", 254, 170, "baris sama", 9, W.hijauTua)),
    ),
    k(
      SUARA_U4,
      hapus(0, "ok", "pk", "sp"),
      tambah("Kurang", emo("xs", 100, 172, E.salah, 20)),
      tambah("bengkok,", teks("bg", 170, 170, "bentuk bengkok", 9, W.merah)),
      tambah("tidak", teks("tr", 254, 170, "tidak rata", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ Unit Square Ladder: konsep ------------------------------ */
const SUARA_L1 = "Cara ketiga, Unit Square Ladder, atau Tangga Satuan.";
const SUARA_L2 = "Kita menyusun satuan luas dari yang kecil ke yang besar seperti anak tangga.";
const SUARA_L3 = "Satu meter persegi sama dengan sepuluh ribu sentimeter persegi, dan itu satu anak tangga besar.";
const SUARA_L4 = "Naik tangga berarti mengurangi bilangan, dan turun tangga berarti memperbanyak bilangan.";

export const ADEGAN_LUAR_TANGGA: AdeganStory = {
  id: "luar-tangga",
  judul: "Unit Square Ladder: Tangga Satuan",
  sumber: "Metode global: Unit Square Ladder (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 3: Unit Square Ladder"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Unit", teks("nm", 150, 56, "Unit Square Ladder", 13, K.kapurMerah)),
      tambah("Tangga", teks("ni", 150, 74, "Tangga Satuan", 10, K.kapur)),
    ),
    k(
      SUARA_L2,
      tambah("kecil", kotak("a", 100, 112, 50, 28, "#1F6B3F", K.kapur, { rx: 0, tebal: 1.4, z: 2 }), teks("at", 125, 130, "cm²", 11, K.kapur, { z: 3 })),
      tambah("besar", kotak("b", 150, 84, 50, 56, "#1F6B3F", K.kapur, { rx: 0, tebal: 1.4, z: 2 }), teks("bt", 175, 116, "m²", 11, K.kapur, { z: 3 })),
      tambah("tangga.", teks("tg", 150, 152, "anak tangga", 8.4, K.kapurBiru)),
    ),
    k(
      SUARA_L3,
      sorotkan("Satu", "b"),
      hapus(0, "tg"),
      tambah("sepuluh", teks("ek", 150, 152, "1 m² = 10.000 cm²", 9, K.kapur)),
      tambah("itu", teks("ee", 235, 100, "1 anak tangga", 8.4, K.kapurMerah)),
    ),
    k(
      SUARA_L4,
      hapus(0, "ee"),
      tambah("Naik", panah("pn", 245, 128, 0, -26, W.hijau, 2.4, { z: 3 }), teks("tn", 245, 66, "naik: kurang", 9, K.kapur)),
      tambah("turun", panah("pd", 62, 76, 0, 26, W.merah, 2.4, { z: 3 }), teks("td", 62, 66, "turun: banyak", 9, K.kapur)),
    ),
  ],
};

/* ------------------------------ Unit Square Ladder: terapan ------------------------------ */
const SUARA_M1 = "Satria mengubah dua meter persegi menjadi sentimeter persegi dengan menuruni tangga.";
const SUARA_M2 = "Dua dikali sepuluh ribu sama dengan dua puluh ribu sentimeter persegi.";
const SUARA_M3 = "Cocok untuk mengganti satuan luas dengan cepat dan tepat, tanpa harus menggambar ribuan petak.";
const SUARA_M4 = "Kurang cocok kalau kita lupa seratus kali seratus, karena anak tangganya akan salah hitung.";

export const ADEGAN_LUAR_TANGGA_TERAPAN: AdeganStory = {
  id: "luar-tangga-terapan",
  judul: "Tangga Satuan: kapan cocok",
  sumber: "Metode global: Unit Square Ladder (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Dua Meter Persegi"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("dua", teks("da", 80, 80, "2 m²", 14, K.kapurMerah)),
      tambah("menjadi", panah("pa", 112, 76, 40, 0, K.kapur, 2.4, { z: 3 })),
      tambah("sentimeter", teks("db", 220, 80, "? cm²", 14, K.kapurBiru)),
      tambah("menuruni", emo("tr", 150, 120, "\u{1F53D}", 20)),
    ),
    k(
      SUARA_M2,
      tambah("Dua", teks("hk", 150, 134, "2 × 10.000 = 20.000", 11, K.kapur)),
      sorotkan("sepuluh", "da"),
      ubah("ribu@2", { id: "db", isi: "20.000 cm²" }),
    ),
    k(
      SUARA_M3,
      tambah("Cocok", emo("ok", 100, 172, E.benar, 20)),
      tambah("cepat", teks("cp", 170, 170, "cepat dan tepat", 9, W.hijauTua)),
      tambah("ribuan", teks("rb", 254, 170, "bukan gambar", 9, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "cp", "rb"),
      tambah("Kurang", emo("xs", 100, 172, E.salah, 20)),
      tambah("lupa", teks("lp", 170, 170, "100 × 100", 10, W.merah)),
      tambah("salah", teks("sh", 254, 170, "salah hitung", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Sinta. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin melihat luas dengan nyata, pakai Tutup Lantai. Ingin menghitung dengan cepat, pakai Baris dan Kolom.";
const SUARA_R3 = "Ingin mengganti satuan, pakai Tangga Satuan. Apa pun caranya, tulis satuan di belakang bilangannya.";
const SUARA_R4 = "Menurutmu, untuk menghitung luas lapangan yang sangat besar, cara mana yang paling pas?";
const kartuCara = (id: string, y: number, isi: string): Obj[] => [kotak(`${id}-k`, 96, y, 190, 28, "#FDE68A", W.ubinTua, { rx: 6, tebal: 1.6, z: 1 }), teks(`${id}-t`, 191, y + 19, isi, 11, W.biru, { z: 2 })];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 48, 78, "3 cara", 14, W.merah)),
      tambah("sudah", ...kartuCara("r0", 40, "Tutup Lantai")),
      tambah("pelajari", ...kartuCara("r1", 76, "Baris dan Kolom")),
      tambah("Sinta.", ...kartuCara("r2", 112, "Tangga Satuan"), ...tokoh("bs", 40, 184, "Bu Sinta")),
      tambah("Mana", emo("pk", 258, 160, E.pikir, 20)),
    ),
    k(
      SUARA_R2,
      hapus(0, "pk"),
      sorotkan("melihat", "r0-k"),
      tambah("Lantai.", emo("ok1", 270, 54, E.benar, 18)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("menghitung", "r1-k"),
      tambah("Kolom.", emo("ok2", 270, 90, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("mengganti", "r2-k"),
      tambah("Satuan.", teks("s5", 191, 150, "satuan di belakang", 8, W.hijauTua), emo("ok3", 270, 126, E.benar, 18)),
      tambah("tulis", teks("ps", 250, 164, "tulis satuan", 8, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara Mana?"), ...tanah("tn", 150), ...tokoh("bs", 40, 184, "Bu Sinta")),
      tambah("lapangan", ...petak("lp", 96, 44, 5, 10, 12), teks("sp", 156, 120, "lapangan sangat besar", 9, W.coklat)),
      tambah("cara", teks("tq", 260, 70, "?", 30, W.merah)),
      tambah("pas?", emo("i0", 214, 170, "\u{1F9F1}", 18), emo("i1", 240, 170, "\u{1F4CA}", 18), emo("i2", 266, 170, "\u{1F4F6}", 18)),
    ),
  ],
};
