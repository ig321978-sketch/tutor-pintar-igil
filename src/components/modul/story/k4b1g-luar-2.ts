import type { AdeganStory } from "./logika-story";
import { E, W, dermaga, emo, judul, kartu, laut, panah, papanSusun, teks, tokoh } from "./k4b1g-gambar";
import { bersih, hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k4b1g-bantu";

/*
 * Cerita orisinal IGIL "Baris Perahu Bu Marni" (Kelas 4 Bab 1 Sub-Bab G), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1g.md. Bagian ini: Split and Multiply (Urai Lalu Kali) dan terapannya, Column Multiply (Kali Susun) dan terapannya, dan ringkasan.
 */

/* ------------------------------ Split and Multiply: konsep ------------------------------ */
const SUARA_U1 = "Cara kedua, Split and Multiply, atau Urai Lalu Kali.";
const SUARA_U2 = "Bilangan dua angka diurai menjadi puluhan dan satuan.";
const SUARA_U3 = "Puluhan dan satuannya dikalikan terpisah, lalu hasilnya dijumlahkan.";
const SUARA_U4 = "Cara ini memakai fakta perkalian yang sudah kita hafal.";

export const ADEGAN_LUAR_URAI: AdeganStory = {
  id: "luar-urai",
  judul: "Split and Multiply: Urai Lalu Kali",
  sumber: "Metode global: Split and Multiply (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cara 2: Split and Multiply"), ...laut("lt", 150)),
      tambah("Split", emo("jr", 150, 104, "\u{2702}", 36)),
      tambah("Urai", teks("nm", 150, 140, "Urai Lalu Kali", 13, W.ungu)),
    ),
    k(
      SUARA_U2,
      hapus(0, "jr", "nm"),
      tambah("angka", teks("a37", 150, 56, "37", 24, W.biru), teks("n2", 262, 56, "2 angka", 9, W.ungu)),
      tambah("diurai", panah("ar1", 140, 66, -28, 22, W.ungu, 2), panah("ar2", 160, 66, 28, 22, W.ungu, 2), teks("a30", 110, 104, "30", 18, W.biru), teks("a7", 190, 104, "7", 18, W.biru)),
      tambah("puluhan", teks("lp", 110, 126, "puluhan", 9, W.ungu)),
      tambah("satuan.", teks("ls", 190, 126, "satuan", 9, W.ungu)),
    ),
    k(
      SUARA_U3,
      tambah("Puluhan", teks("p1", 110, 148, "30 × 2 = 60", 11, W.biru)),
      tambah("satuannya", teks("p2", 190, 148, "7 × 2 = 14", 11, W.biru)),
      tambah("hasilnya", teks("tt", 150, 168, "jumlahkan", 9, W.ungu)),
      tambah("dijumlahkan.", teks("p3", 150, 186, "60 + 14 = 74", 13, W.merah)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Fakta Hafalan")),
      tambah("fakta", ...kartu("kf", 60, 50, 180, 70, "#FEF3C7", ["3 × 2 = 6", "7 × 2 = 14"], 12)),
      tambah("perkalian", emo("lp", 262, 86, E.lampu, 24)),
      tambah("hafal.", emo("ok", 150, 150, E.benar, 24), teks("hf", 150, 178, "sudah hafal", 11, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Split and Multiply: terapan ------------------------------ */
const SUARA_T1 = "Laras mengalikan empat belas dengan empat penumpang per kursi.";
const SUARA_T2 = "Sepuluh kali empat empat puluh, empat kali empat enam belas, jadi lima puluh enam.";
const SUARA_T3 = "Cocok untuk bilangan dua angka yang tidak terlalu besar.";
const SUARA_T4 = "Kurang cocok kalau kita lupa menjumlahkan kedua hasilnya, karena hasilnya akan kurang.";

export const ADEGAN_LUAR_URAI_TERAPAN: AdeganStory = {
  id: "luar-urai-terapan",
  judul: "Split and Multiply: terapan",
  sumber: "Metode global: Split and Multiply (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Kursi Perahu"), ...laut("lt", 120), ...dermaga("dm", 166), ...tokoh("la", 30, 184, "Laras")),
      tambah("empat", teks("t1", 150, 60, "14 × 4", 24, W.biru)),
      tambah("penumpang", teks("t2", 150, 96, "4 per kursi", 11, W.ungu)),
      tambah("kursi.", emo("kr", 230, 98, E.layar, 18)),
    ),
    k(
      SUARA_T2,
      hapus(0, "t2", "kr"),
      tambah(0, teks("u1", 110, 100, "10 × 4 = 40", 11, W.biru)),
      tambah("belas,", teks("u2", 200, 100, "4 × 4 = 16", 11, W.biru)),
      tambah("jadi", teks("u3", 150, 140, "40 + 16 = 56", 13, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(0, "u1", "u2", "u3"),
      tambah("Cocok", emo("ok", 262, 126, E.benar, 20)),
      tambah("dua", teks("d2", 150, 96, "2 angka", 16, W.biru)),
      tambah("besar.", teks("dk", 150, 134, "tidak terlalu besar", 10, W.hijauTua)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "d2", "dk"),
      tambah("Kurang", emo("xs", 262, 126, E.salah, 20)),
      tambah("lupa", teks("l40", 110, 100, "40", 20, W.biru), teks("lpl", 150, 100, "+", 20, W.ungu), teks("l16", 190, 100, "16", 20, W.biru)),
      pudarkan("hasilnya,", "l16", "lpl"),
      tambah("kurang@2", teks("kr2", 150, 140, "hanya 40, kurang", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Column Multiply: konsep ------------------------------ */
const SUARA_K1 = "Cara ketiga, Column Multiply, atau Kali Susun.";
const SUARA_K2 = "Bilangan ditulis ke bawah, lalu kita mengalikan satuan dulu.";
const SUARA_K3 = "Kalau hasilnya sepuluh atau lebih, kita menulis satuannya dan menyimpan puluhannya. Kalau kurang dari sepuluh, langsung ditulis tanpa menyimpan.";
const SUARA_K4 = "Simpanan itu ditambahkan pada hasil perkalian puluhan.";

export const ADEGAN_LUAR_KALI: AdeganStory = {
  id: "luar-kali",
  judul: "Column Multiply: Kali Susun",
  sumber: "Metode global: Column Multiply (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara 3: Column Multiply"), ...laut("lt", 150)),
      tambah("Column", emo("jr", 150, 104, "\u{2716}", 36)),
      tambah("Kali", teks("nm", 150, 140, "Kali Susun", 13, W.ungu)),
    ),
    k(
      SUARA_K2,
      hapus(0, "jr", "nm"),
      tambah(0, ...papanSusun("ks", 100, 34, 26, 3)),
      sorotkan("satuan", "ks-a0", "ks-b"),
      tambah("dulu.", teks("sn", 250, 70, "satuan dulu", 9, W.ungu)),
    ),
    k(
      SUARA_K3,
      tambah(0, teks("f18", 250, 92, "6 × 3 = 18", 10, W.biru)),
      tambah("sepuluh", teks("t10", 250, 56, "10 atau lebih", 9, W.ungu)),
      tambah("menulis", teks("kw", 152, 102, "8", 18, W.merah)),
      tambah("menyimpan", teks("ky", 130, 40, "1", 10, W.ungu)),
      tambah("tanpa", teks("ts", 250, 112, "tanpa simpan", 11, W.merah)),
    ),
    k(
      SUARA_K4,
      sorotkan(0, "ky"),
      tambah("ditambahkan", teks("f2", 250, 128, "2 × 3 + 1 = 7", 10, W.biru)),
      tambah("puluhan.", teks("kz", 130, 102, "7", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ Column Multiply: terapan ------------------------------ */
const SUARA_R1 = "Satria mengalikan lima belas dengan enam.";
const SUARA_R2 = "Lima kali enam tiga puluh, tulis nol dan simpan tiga, lalu satu kali enam ditambah tiga sama dengan sembilan.";
const SUARA_R3 = "Cocok untuk perkalian bilangan dua angka dengan satu angka, secara cepat dan rapi.";
const SUARA_R4 = "Kurang cocok kalau lupa menyimpan, karena hasilnya bisa keliru.";

export const ADEGAN_LUAR_KALI_TERAPAN: AdeganStory = {
  id: "luar-kali-terapan",
  judul: "Column Multiply: terapan",
  sumber: "Metode global: Column Multiply (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Kali Susun"), ...dermaga("dm", 166), ...tokoh("sa", 30, 184, "Satria")),
      tambah("lima", ...papanSusun("rs", 100, 34, 15, 6)),
      tambah("belas", teks("t15", 250, 50, "15 × 6", 14, W.biru)),
      tambah("enam.", teks("hs", 250, 92, "hasil = ?", 10, W.tanya)),
    ),
    k(
      SUARA_R2,
      hapus(0, "t15", "hs"),
      tambah(0, teks("m1", 250, 56, "5 × 6 = 30", 10, W.biru)),
      tambah("tulis", teks("r0", 152, 102, "0", 18, W.merah)),
      tambah("simpan", teks("cy", 130, 40, "3", 10, W.ungu)),
      tambah("satu", teks("m2", 250, 96, "1 × 6 + 3 = 9", 10, W.biru)),
      tambah("sembilan.", teks("r1", 130, 102, "9", 18, W.merah)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Cocok Untuk")),
      tambah("Cocok", emo("ok", 262, 126, E.benar, 20)),
      tambah("dua", teks("d2", 100, 80, "2 angka", 14, W.biru), teks("kx", 150, 80, "×", 22, W.merah)),
      tambah("satu", teks("d1", 200, 80, "1 angka", 14, W.biru)),
      tambah("cepat", emo("kl", 90, 140, E.kilat, 24)),
      tambah("rapi.", emo("rp", 210, 140, E.catat, 24)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Lupa Menyimpan"), ...papanSusun("rk", 100, 34, 15, 6)),
      tambah("lupa", teks("w0", 152, 102, "0", 18, W.merah), teks("w6", 130, 102, "6", 18, W.merah)),
      tambah("menyimpan,", teks("tn", 250, 70, "simpanan 3 hilang", 9, W.ungu)),
      tambah("keliru.", emo("xs", 250, 112, E.salah, 22), teks("kb", 250, 140, "60 salah", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_S1 = "Tiga cara sudah kita lihat bersama Bu Marni. Mana yang pas tergantung keadaan.";
const SUARA_S2 = "Ingin paham maknanya, pakai Tambah Berulang. Ingin memakai fakta yang hafal, pakai Urai Lalu Kali.";
const SUARA_S3 = "Ingin cara yang cepat dan rapi, pakai Kali Susun. Apa pun caranya, periksa dengan cara lain.";
const SUARA_S4 = "Menurutmu, untuk mengalikan tiga belas dengan tiga, cara mana yang paling pas?";
const KARTU_RINGKAS = ["#FEF3C7", "#DCFCE7", "#DBEAFE"];
const NAMA_RINGKAS: [string, string][] = [["Tambah", "Berulang"], ["Urai", "Lalu Kali"], ["Kali", "Susun"]];
const RK = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 60, 88, 50, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));
const RK_KECIL = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 146, 88, 40, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara mengalikan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tiga Cara"), teks("n3", 150, 40, "3 cara", 12, W.ungu)),
      tambah("lihat", ...RK),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
    ),
    k(
      SUARA_S2,
      hapus(0, "tq"),
      tambah("maknanya,", emo("mk", 62, 134, E.lampu, 20)),
      sorotkan("Tambah", "r0-k"),
      redamkan("memakai", "r0-k"),
      tambah("hafal,", emo("hf", 156, 134, E.jempol, 20)),
      sorotkan("Urai", "r1-k"),
    ),
    k(
      SUARA_S3,
      redamkan(0, "r1-k"),
      tambah("cepat", emo("cp", 250, 134, E.kilat, 20)),
      sorotkan("Kali", "r2-k"),
      tambah("periksa", emo("ls", 62, 168, E.lupa, 20)),
      tambah("lain.", emo("ok", 150, 168, E.benar, 20)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Cara Mana?"), ...RK_KECIL),
      tambah("mengalikan", emo("ly", 262, 70, E.layar, 22)),
      tambah("tiga", teks("q13", 150, 50, "13 × 3", 20, W.biru)),
      tambah("pas?", emo("qs", 150, 112, E.tanya, 28)),
    ),
  ],
};
