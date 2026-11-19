import type { AdeganStory, Obj } from "./logika-story";
import { E, W, alat, bulat, busur, emo, garis, idAlat, idTurus, judul, kartu, lantai, teks, tokoh, turus } from "./k2b8A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b8A-bantu";

/*
 * Cerita orisinal IGIL "Alat Musik Pak Hendra" (Kelas 2 Bab 8 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b8a.md. Bagian ini: Count by Fives (Hitung Lima-Lima), Real Graph (Diagram Benda Nyata), dan ringkasan.
 */

/** Tanda angka pada garis bilangan: garis kecil `${id}` dan angka `${id}-n` di bawahnya. */
const tanda = (id: string, x: number, y: number, isi: string, u = 11, warna: string = W.merah): Obj[] => [garis(id, x, y - 4, 0, 8, W.biru, 1.8), teks(`${id}-n`, x, y + 18, isi, u, warna)];
/** Deret alat musik `n` buah dengan id `${id}0`..: pusat pertama (x0, y), jarak g. */
const deretAlat = (id: string, x0: number, y: number, n: number, jenis: "angklung" | "seruling" | "gendang" | "rebana", g = 17, s = 1): Obj[] => Array.from({ length: n }, (_, i) => alat(`${id}${i}`, x0 + i * g, y, jenis, s)).flat();
const idDeret = (id: string, n: number, jenis: "angklung" | "seruling" | "gendang" | "rebana"): string[] => Array.from({ length: n }, (_, i) => idAlat(`${id}${i}`, jenis)).flat();

/* ------------------------------ Count by Fives: konsep ------------------------------ */
const SUARA_L1 = "Cara kedua, Count by Fives, atau Hitung Lima-Lima.";
const SUARA_L2 = "Kita menghitung dengan melompat lima-lima, sambil menunjuk satu bundel turus.";
const SUARA_L3 = "Lima, sepuluh, lima belas. Setiap lompatan menambah lima.";
const SUARA_L4 = "Garis sisa yang belum penuh bundel kita hitung satu-satu.";

export const ADEGAN_LUAR_LIMA: AdeganStory = {
  id: "luar-lima",
  judul: "Count by Fives: Hitung Lima-Lima",
  sumber: "Metode global: Count by Fives (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 2: Count by Fives")),
      tambah("Count", ...turus("tf", 90, 70, 15, W.biru, 40, 8, 3)),
      tambah("Hitung", teks("nm", 150, 150, "Hitung Lima-Lima", 13, W.ungu)),
    ),
    k(
      SUARA_L2,
      tambah("melompat", busur("b0", 102, 138, 64, 16), busur("b1", 138, 174, 64, 16)),
      tambah("lima-lima,", teks("p0", 120, 46, "+5", 11, W.merah), teks("p1", 156, 46, "+5", 11, W.merah)),
      sorotkan("menunjuk", ...idTurus("tf", 5)),
      tambah("satu", teks("n1", 150, 132, "1 bundel", 10, W.ungu)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Lompat Lima-Lima"), garis("ga", 30, 120, 240, 0, W.biru, 2.4), ...tanda("t0", 30, 120, "0", 11, W.biru)),
      tambah("Lima,", ...tanda("t5", 110, 120, "5"), busur("a1", 30, 110, 118, 30)),
      tambah("sepuluh,", ...tanda("t10", 190, 120, "10"), busur("a2", 110, 190, 118, 30)),
      tambah("lima@2", ...tanda("t15", 270, 120, "15"), busur("a3", 190, 270, 118, 30)),
      tambah("lompatan", teks("q1", 70, 84, "+5", 11, W.merah), teks("q2", 150, 84, "+5", 11, W.merah), teks("q3", 230, 84, "+5", 11, W.merah)),
      tambah("lima@3", teks("pt", 150, 172, "1 lompatan = +5", 11, W.hijau)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Garis Sisa"), ...turus("ts", 90, 70, 8, W.biru, 40, 8, 3)),
      ubah("sisa", ...["ts-g5", "ts-g6", "ts-g7"].map((id) => ({ id, warna: W.merah, tebal: 3.6 }))),
      tambah("belum", teks("bp", 150, 50, "belum penuh", 10, W.merah)),
      tambah("hitung", teks("c5", 102, 62, "5", 10, W.merah), teks("c6", 126, 62, "6", 10, W.merah), teks("c7", 134, 62, "7", 10, W.merah), teks("c8", 142, 62, "8", 10, W.merah)),
      tambah("satu-satu.", teks("n1", 150, 140, "+1 +1 +1", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ Count by Fives: terapan ------------------------------ */
const SUARA_T1 = "Dika menghitung turus tepuk tangan: bundel pertama lima, bundel kedua sepuluh, bundel ketiga lima belas.";
const SUARA_T2 = "Lalu dua garis sisa: enam belas, tujuh belas. Jadi semuanya tujuh belas.";
const SUARA_T3 = "Cocok kalau turusnya banyak dan sudah dibundel lima-lima.";
const SUARA_T4 = "Kurang cocok kalau turusnya sedikit, karena menghitung satu-satu sudah cepat.";

const T17 = turus("tt", 100, 70, 17, W.biru, 34, 7, 2.4);
const ID_15 = new Set(idTurus("tt", 15));

export const ADEGAN_LUAR_LIMA_TERAPAN: AdeganStory = {
  id: "luar-lima-terapan",
  judul: "Count by Fives: turus tepuk tangan Dika",
  sumber: "Metode global: Count by Fives (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Turus Tepuk Tangan"), ...lantai("lt", 150), ...tokoh("dk", 44, 184, "Dika")),
      tambah("turus", ...T17.filter((o) => ID_15.has(o.id))),
      tambah("lima,", teks("c5", 110, 62, "5", 10, W.merah)),
      tambah("sepuluh,", teks("c10", 142, 62, "10", 10, W.merah)),
      tambah("lima@2", teks("c15", 174, 62, "15", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("dua", ...T17.filter((o) => !ID_15.has(o.id)), teks("n2", 205, 62, "2 garis", 9, W.ungu)),
      ubah("dua", { id: "tt-g15", warna: W.merah }, { id: "tt-g16", warna: W.merah }),
      tambah("enam", teks("c16", 196, 50, "16", 10, W.merah)),
      tambah("tujuh", teks("c17", 210, 50, "17", 10, W.merah)),
      tambah("semuanya", teks("tot", 150, 140, "semuanya 17", 11, W.hijau)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("turusnya", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["turus banyak, sudah dibundel"], 9)),
      tambah("banyak", ...turus("tb", 30, 76, 30, W.biru, 34, 5, 2)),
      tambah("lima-lima.", teks("l5", 150, 140, "5 + 5 + 5 + 5", 12, W.merah)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("sedikit,", ...turus("tc", 110, 76, 3, W.biru, 34, 8, 3)),
      tambah("satu-satu", teks("s1", 150, 140, "1, 2, 3", 12, W.merah)),
      tambah("cepat.", emo("cp", 230, 100, "\u{26A1}", 24), teks("cs", 150, 168, "cukup satu-satu", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ Real Graph: konsep ------------------------------ */
const SUARA_N1 = "Cara ketiga, Real Graph, atau Diagram Benda Nyata.";
const SUARA_N2 = "Benda aslinya disusun berbaris, satu jenis satu lajur, dari garis dasar yang sama.";
const SUARA_N3 = "Lajur yang paling panjang berarti bendanya paling banyak.";
const SUARA_N4 = "Kita bisa membandingkan tanpa menghitung, cukup melihat panjang lajurnya.";

export const ADEGAN_LUAR_NYATA: AdeganStory = {
  id: "luar-nyata",
  judul: "Real Graph: Diagram Benda Nyata",
  sumber: "Metode global: Real Graph (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cara 3: Real Graph")),
      tambah("Real", garis("gd", 70, 50, 0, 90, W.biru, 2.4, { z: 1 }), ...deretAlat("rn", 84, 126, 3, "rebana")),
      tambah("Diagram", teks("nm", 190, 160, "Diagram Benda Nyata", 12, W.ungu)),
    ),
    k(
      SUARA_N2,
      hapus(0, "nm"),
      tambah("disusun", ...deretAlat("an", 84, 66, 7, "angklung"), ...deretAlat("gn", 84, 96, 5, "gendang")),
      tambah("berbaris,", teks("l0", 36, 69, "Angklung", 8.4, W.ungu), teks("l1", 36, 99, "Gendang", 8.4, W.ungu), teks("l2", 36, 129, "Rebana", 8.4, W.ungu)),
      tambah("satu", teks("n1", 190, 160, "1 jenis = 1 lajur", 9, W.merah)),
      ubah("garis", { id: "gd", warna: W.merah, tebal: 4 }),
      tambah("sama.", emo("ok", 270, 96, E.benar, 22)),
    ),
    k(
      SUARA_N3,
      hapus(0, "n1"),
      sorotkan("panjang", ...idDeret("an", 7, "angklung")),
      tambah("paling", emo("st", 270, 66, E.bintang, 20)),
      tambah("banyak.", teks("pb", 150, 160, "paling banyak", 11, W.hijau)),
    ),
    k(
      SUARA_N4,
      hapus(0, "pb"),
      tambah("membandingkan", garis("gp", 127, 50, 0, 90, W.hijau, 1.6, { putus: true, z: 4 })),
      tambah("menghitung,", teks("tg", 220, 140, "tanpa hitung", 10, W.ungu)),
      tambah("melihat", emo("mt", 240, 100, E.mata, 22)),
      tambah("lajurnya.", teks("pj", 150, 168, "lihat panjang lajur", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ Real Graph: terapan ------------------------------ */
const SUARA_Q1 = "Nia menjajarkan seruling di satu lajur dan rebana di lajur lain.";
const SUARA_Q2 = "Lajur seruling lebih panjang, jadi seruling lebih banyak daripada rebana!";
const SUARA_Q3 = "Cocok kalau bendanya kecil, sama ukurannya, dan boleh dijajarkan.";
const SUARA_Q4 = "Kurang cocok kalau bendanya besar atau berat, karena sulit dijajarkan.";

export const ADEGAN_LUAR_NYATA_TERAPAN: AdeganStory = {
  id: "luar-nyata-terapan",
  judul: "Real Graph: lajur seruling dan rebana Nia",
  sumber: "Metode global: Real Graph (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Dua Lajur"), ...lantai("lt", 150), ...tokoh("ni", 36, 184, "Nia"), garis("gd", 88, 52, 0, 70, W.biru, 2.4, { z: 1 })),
      tambah("seruling", teks("l0", 64, 73, "Seruling", 8.4, W.ungu), ...deretAlat("sr", 100, 70, 6, "seruling", 18)),
      tambah("satu", teks("n1", 248, 70, "1 lajur", 9, W.merah)),
      tambah("rebana", teks("l1", 64, 107, "Rebana", 8.4, W.ungu), ...deretAlat("rb", 100, 104, 4, "rebana", 18)),
    ),
    k(
      SUARA_Q2,
      sorotkan("panjang,", ...idDeret("sr", 6, "seruling")),
      tambah("banyak", teks("sm", 150, 140, "seruling lebih banyak", 11, W.hijau)),
      tambah("rebana!", emo("ok", 270, 70, E.benar, 22)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("kecil,", ...deretAlat("kc", 60, 80, 7, "rebana", 26, 0.8)),
      tambah("sama", ...kartu("cc", 80, 104, 140, 24, W.hijauMuda, ["sama ukuran"], 9)),
      tambah("dijajarkan.", garis("gd", 40, 66, 0, 60, W.biru, 2.4), teks("bj", 150, 160, "boleh dijajarkan", 11, W.hijau)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("besar", ...alat("bg", 100, 100, "gendang", 4.5)),
      tambah("berat,", teks("br", 210, 90, "berat!", 14, W.merah)),
      tambah("sulit", emo("pz", 230, 130, E.pusing, 22), teks("sl", 150, 168, "sulit dijajarkan", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung datanya.";
const SUARA_R2 = "Benda campur aduk, pakai Alas Pilah. Turus sudah dibundel lima-lima, pakai Hitung Lima-Lima.";
const SUARA_R3 = "Ingin membandingkan dengan cepat, pakai Diagram Benda Nyata. Apa pun caranya, satu benda dihitung satu kali.";
const SUARA_R4 = "Menurutmu, untuk mendata seratus tiket pentas, kamu pilih cara yang mana?";

const KARTU_PILIH = [
  { id: "r0", nama: "Alas Pilah", warna: "#DBEAFE" },
  { id: "r1", nama: "Hitung Lima-Lima", warna: "#FEF3C7" },
  { id: "r2", nama: "Diagram Benda Nyata", warna: "#DCFCE7" },
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Cara yang Pas")),
      tambah("tiga", ...KARTU_PILIH.flatMap((c, i) => kartu(c.id, 30, 40 + i * 34, 240, 26, c.warna, [c.nama], 10))),
      tambah("cara.", teks("n3", 262, 18, "3 cara", 10, W.ungu)),
      tambah("pas?", emo("tq", 150, 164, E.tanya, 22)),
      tambah("tergantung", teks("tg", 150, 184, "tergantung datanya", 10, W.hijau)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      sorotkan("Alas", "r0-k"),
      tambah("campur", emo("cp", 150, 164, E.campur, 22)),
      redamkan("Turus", "r0-k"),
      tambah("lima-lima,", teks("n5", 150, 150, "5 + 5", 11, W.merah)),
      sorotkan("Hitung", "r1-k"),
    ),
    k(
      SUARA_R3,
      hapus(0, "tg", "cp", "n5"),
      redamkan("Ingin", "r1-k"),
      sorotkan("Diagram", "r2-k"),
      tambah("satu", teks("n1", 150, 160, "1 benda = 1 kali", 11, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Seratus Tiket Pentas")),
      tambah("seratus", teks("n100", 150, 36, "100 tiket", 11, W.ungu), ...Array.from({ length: 100 }, (_, i) => bulat(`tk${i}`, 105 + (i % 10) * 10, 48 + Math.floor(i / 10) * 9, 3.2, "#FDE68A", W.coklat, { tebal: 0.8, z: 2 }))),
      tambah("pilih", ...kartu("p0", 8, 150, 88, 22, "#DBEAFE", ["Alas Pilah"], 8), ...kartu("p1", 106, 150, 88, 22, "#FEF3C7", ["Hitung Lima-Lima"], 8), ...kartu("p2", 204, 150, 88, 22, "#DCFCE7", ["Diagram Benda Nyata"], 7.6)),
      tambah("mana?", emo("tq", 150, 192, E.tanya, 18)),
    ),
  ],
};

