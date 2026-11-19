import type { AdeganStory } from "./logika-story";
import { E, W, batang, emo, garis, gulungan, idGulungan, idMeteran, judul, kandang, kartu, kotak, meja, meteran, panah, penggaris, rumput, teks, tokoh } from "./k3b3A-gambar";
import { hapus, k, redamkan, sorotkan, tambah } from "./k3b3A-bantu";

/*
 * Cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Kelas 3 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3a.md. Bagian ini: Benchmark Measuring (Ukuran Acuan), Strip Ruler (Pita Penggaris), terapan keduanya, dan ringkasan.
 */
const PITA = "#FBCFE8";

/* ------------------------------ Benchmark Measuring: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Benchmark Measuring, atau Ukuran Acuan.";
const SUARA_C2 = "Kita hafalkan ukuran benda yang sudah dikenal, misalnya lebar kuku jari sekitar satu sentimeter.";
const SUARA_C3 = "Satu langkah anak kira-kira setengah meter.";
const SUARA_C4 = "Dengan acuan, kita bisa memperkirakan panjang benda lain tanpa alat ukur.";

export const ADEGAN_LUAR_ACUAN: AdeganStory = {
  id: "luar-acuan",
  judul: "Benchmark Measuring: Ukuran Acuan",
  sumber: "Metode global: Benchmark Measuring (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Benchmark Measuring"), ...rumput("rt", 150)),
      tambah("Benchmark", emo("jr", 150, 100, E.jari, 36)),
      tambah("Ukuran", teks("nm", 150, 140, "Ukuran Acuan", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah("ukuran", teks("ab", 150, 44, "ukuran yang dikenal", 10, W.ungu)),
      tambah("kuku", kotak("fj", 120, 70, 40, 70, "#FCD9B6", "#B45309", { rx: 18, z: 1 }), kotak("ku", 130, 76, 20, 22, "#FBCFE8", "#BE185D", { rx: 6, z: 2 })),
      tambah("lebar", garis("br", 130, 66, 20, 0, W.merah, 2), garis("b1", 130, 62, 0, 8, W.merah, 2), garis("b2", 150, 62, 0, 8, W.merah, 2)),
      tambah("satu", teks("n1", 196, 72, "1 cm", 14, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "fj", "ku", "br", "b1", "b2", "n1", "ab"),
      tambah("Satu", teks("sl", 135, 100, "1 langkah", 13, W.ungu)),
      tambah("anak", emo("kk", 90, 140, E.kaki, 24, { z: 2 })),
      tambah("kira-kira", emo("k2", 180, 140, E.kaki, 24, { z: 2 })),
      tambah("setengah", garis("lk", 96, 152, 84, 0, W.merah, 2.5)),
      tambah("meter", teks("sm", 138, 174, "½ m", 16, W.hijauTua)),
    ),
    k(
      SUARA_C4,
      hapus(0, "sl", "sm", "lk"),
      tambah("acuan", teks("ac", 150, 48, "pakai acuan", 11, W.ungu)),
      tambah("memperkirakan", ...kandang("kd", 60, 76, 180, 64)),
      tambah("tanpa", emo("pg", 150, 112, E.penggaris, 22), emo("xs", 178, 112, E.salah, 18)),
      tambah("ukur", emo("ok", 262, 60, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Benchmark Measuring: terapan ------------------------------ */
const SUARA_M1 = "Bima mengukur kandang dengan langkahnya: enam langkah, kira-kira tiga meter.";
const SUARA_M2 = "Lalu ia memeriksanya dengan meteran, dan hasilnya hampir sama.";
const SUARA_M3 = "Cocok kalau tidak ada alat ukur di tangan.";
const SUARA_M4 = "Kurang cocok untuk ukuran yang harus pas, karena langkah setiap anak berbeda.";

export const ADEGAN_LUAR_ACUAN_TERAPAN: AdeganStory = {
  id: "luar-acuan-terapan",
  judul: "Benchmark Measuring: langkah Bima",
  sumber: "Metode global: Benchmark Measuring (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mengukur dengan Langkah"), ...rumput("rt", 150), ...tokoh("bm", 268, 184, "Bima")),
      tambah("kandang", ...kandang("kd", 40, 80, 200, 66)),
      tambah(5, ...Array.from({ length: 6 }, (_, i) => emo(`f${i}`, 50 + i * 34, 168, E.kaki, 14, { z: 2 })), teks("n6", 150, 118, "6 langkah", 12, W.hijauTua)),
      tambah(8, teks("n3", 150, 64, "≈ 3 m", 16, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah("memeriksanya", ...gulungan("gl", 262, 100)),
      tambah("meteran", ...meteran("mt", 30, 30, 3, 80)),
      tambah("hampir", teks("hm", 222, 64, "hampir sama", 10, W.hijauTua)),
      tambah("sama.", emo("ok", 270, 64, E.benar, 18)),
    ),
    k(
      SUARA_M3,
      hapus(0, ...idMeteran("mt", 3), ...idGulungan("gl"), "hm", "ok"),
      tambah("Cocok", emo("ok", 262, 100, E.benar, 22)),
      tambah("tidak", teks("td", 150, 98, "tanpa alat ukur", 10, W.merah)),
      tambah("alat", emo("pg", 40, 108, E.penggaris, 20), emo("xs", 68, 108, E.salah, 18)),
      tambah("tangan", emo("tg", 262, 134, E.tangan, 18)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "pg", "xs", "tg", "td"),
      tambah("Kurang", emo("xs2", 262, 100, E.salah, 22)),
      tambah("langkah", emo("k1", 120, 138, E.kaki, 30, { z: 2 }), emo("k2", 190, 138, E.kaki, 12, { z: 2 })),
      tambah("berbeda", teks("ne", 156, 100, "≠", 22, W.merah)),
    ),
  ],
};

/* ------------------------------ Strip Ruler: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Strip Ruler, atau Pita Penggaris.";
const SUARA_P2 = "Pita kertas panjang bergaris sentimeter, dengan angka nol tepat di ujung pita.";
const SUARA_P3 = "Kita menempelkan ujung pita di ujung benda, jadi tidak mungkin salah mulai.";
const SUARA_P4 = "Lalu kita membaca angka di ujung benda yang lain.";

export const ADEGAN_LUAR_PITA: AdeganStory = {
  id: "luar-pita",
  judul: "Strip Ruler: Pita Penggaris",
  sumber: "Metode global: Strip Ruler (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 3: Strip Ruler"), ...meja("mj", 106)),
      tambah("Strip", ...penggaris("pt", 20, 90, 20, 13, 1, PITA)),
      tambah("Pita", teks("nm", 150, 150, "Pita Penggaris", 13, W.ungu)),
    ),
    k(
      SUARA_P2,
      tambah("bergaris", teks("cm", 150, 76, "bergaris sentimeter", 10, W.hijauTua)),
      tambah("nol", teks("z0", 20, 70, "0", 18, W.hijau)),
      tambah("tepat", panah("pz", 20, 74, 0, 12, W.hijau, 2.2)),
      sorotkan("pita@2", "pt"),
    ),
    k(
      SUARA_P3,
      hapus(0, "cm", "z0", "pz", "nm"),
      tambah("menempelkan", ...batang("bn", 20, 56, 150, 22, "#FDE68A", "benda", 9)),
      tambah("pita", garis("pj", 20, 80, 0, 10, W.merah, 2.2)),
      tambah("benda,", garis("pk", 170, 80, 0, 10, W.merah, 2.2)),
      tambah("jadi", teks("jm", 150, 44, "mulai pasti dari nol", 10, W.hijauTua)),
      tambah("mulai", emo("ok", 262, 66, E.benar, 20)),
    ),
    k(
      SUARA_P4,
      tambah("membaca", emo("mt", 212, 66, E.mata, 20)),
      tambah("angka", teks("lb", 100, 150, "baca angkanya", 10, W.hijauTua)),
      tambah("ujung", teks("q", 170, 134, "?", 20, W.merah)),
      sorotkan("lain", "pk"),
    ),
  ],
};

/* ------------------------------ Strip Ruler: terapan ------------------------------ */
const SUARA_Q1 = "Raka membuat pita penggaris dari kertas dan mengukur panjang kardus pakan.";
const SUARA_Q2 = "Ujung pita di ujung kardus, dan ujung kardus yang lain di angka empat puluh.";
const SUARA_Q3 = "Jadi panjang kardus empat puluh sentimeter.";
const SUARA_Q4 = "Cocok untuk benda yang tidak muat di penggaris, tetapi kurang cocok kalau pitanya meregang atau kusut.";

export const ADEGAN_LUAR_PITA_TERAPAN: AdeganStory = {
  id: "luar-pita-terapan",
  judul: "Strip Ruler: kardus pakan",
  sumber: "Metode global: Strip Ruler (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Pita Penggaris Raka"), ...meja("mj", 118), ...tokoh("rk", 30, 184, "Raka")),
      tambah("pita", ...penggaris("pt", 20, 102, 40, 6, 5, PITA)),
      tambah("kertas", emo("kt", 262, 60, E.catat, 22)),
      tambah("kardus", ...batang("kr", 20, 72, 240, 26, "#D6A15E", "kardus pakan", 10)),
    ),
    k(
      SUARA_Q2,
      tambah("Ujung", panah("pl", 20, 50, 0, 18, W.merah, 2.4)),
      tambah("lain", panah("pr", 260, 50, 0, 18, W.merah, 2.4)),
      tambah("empat", teks("m40", 260, 44, "40", 14, W.merah)),
    ),
    k(
      SUARA_Q3,
      tambah("Jadi", panah("pp", 150, 58, 0, 10, W.hijau, 2.2)),
      sorotkan("kardus", "kr"),
      tambah("empat", teks("p40", 150, 50, "40 cm", 18, W.hijauTua)),
      tambah("sentimeter", emo("ok", 222, 48, E.benar, 20)),
    ),
    k(
      SUARA_Q4,
      hapus(0, "pl", "pr", "m40", "p40", "pp", "ok"),
      tambah("Cocok", emo("ok", 262, 150, E.benar, 20)),
      tambah("penggaris,", ...penggaris("p2", 80, 134, 10, 12, 2)),
      tambah("kurang", emo("xs", 262, 120, E.salah, 20)),
      tambah("meregang", teks("rg", 200, 176, "meregang", 10, W.merah)),
      tambah("kusut", emo("pu", 232, 156, E.pusing, 18)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin memeriksa hasil, pakai Perkirakan dan Periksa. Tidak ada alat ukur, pakai Ukuran Acuan.";
const SUARA_R3 = "Ingin selalu mulai dari nol, pakai Pita Penggaris. Apa pun caranya, hasilnya ditulis dengan satuan baku.";
const SUARA_R4 = "Menurutmu, untuk mengukur panjang kandang, cara mana yang paling pas?";
const KUNING_KARTU = "#FEF3C7";
const NAMA_KARTU: string[][] = [["Perkirakan", "dan Periksa"], ["Ukuran", "Acuan"], ["Pita", "Penggaris"]];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara mengukur",
  sumber: "Ringkasan: tiga cara mengukur",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan"), teks("n3", 150, 40, "3 cara", 12, W.ungu)),
      tambah("sudah", ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 14 + i * 96, 56, 88, 50, KUNING_KARTU, NAMA_KARTU[i], 8.4))),
      tambah("Mana", teks("tq", 150, 140, "?", 30, W.merah)),
      tambah("keadaan", emo("pk", 260, 140, E.pikir, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq", "pk"),
      tambah("memeriksa", teks("g0", 58, 124, "memeriksa hasil", 8, W.hijauTua)),
      sorotkan("Perkirakan", "r0-k"),
      redamkan("Tidak", "r0-k"),
      tambah("Ukuran", teks("g1", 154, 124, "tanpa alat ukur", 8, W.hijauTua)),
      sorotkan("Ukuran", "r1-k"),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      tambah("mulai", teks("g2", 250, 124, "mulai dari 0", 8, W.hijauTua)),
      sorotkan("Pita", "r2-k"),
      tambah("hasilnya", ...tokoh("kt", 150, 184, "Kak Tari")),
      tambah("satuan", teks("sb", 222, 172, "cm dan m", 12, W.merah)),
    ),
    k(
      SUARA_R4,
      hapus(0, "g0", "g1", "g2", "sb"),
      redamkan(0, "r2-k"),
      tambah("mengukur", emo("pg", 70, 134, E.penggaris, 22)),
      tambah("kandang", ...kandang("kd", 110, 120, 80, 28)),
      tambah("cara", teks("tq", 236, 142, "?", 30, W.merah)),
      tambah("pas", emo("pk", 236, 100, E.pikir, 22)),
    ),
  ],
};
