import type { AdeganStory } from "./logika-story";
import { E, W, angkaTempat, bulat, emo, garis, judul, kartu, kotak, labelTempat, lantai, panah, tabel3, teks, toples, tokoh } from "./k3b1A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1A-bantu";

/*
 * Cerita orisinal IGIL "Toples Permen Pak Joko" (Kelas 3 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1a.md. Bagian ini: Place-Value Chart (Tabel Tiga Tempat), Number Names (Nama Bilangan), dan ringkasan.
 */

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Place-Value Chart: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Place-Value Chart, atau Tabel Tiga Tempat.";
const SUARA_C2 = "Tabel punya tiga kolom: ratusan, puluhan, dan satuan, dari kiri ke kanan.";
const SUARA_C3 = "Tiap kolom hanya diisi satu angka. Kolom kosong diisi nol.";
const SUARA_C4 = "Bilangan dibaca dari kolom paling kiri.";

const TX = 30;
const TW = 240;
const TY = 50;

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Place-Value Chart: Tabel Tiga Tempat",
  sumber: "Metode global: Place-Value Chart (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Place-Value Chart")),
      tambah("Place-Value", ...tabel3("tb", TX, TY, TW, 18, 50)),
      tambah("Tabel", teks("nm", 150, 150, "Tabel Tiga Tempat", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nm"),
      tambah("tiga", teks("n3", 150, 40, "3 kolom", 10, W.ungu)),
      tambah("ratusan,", labelTempat("tb", TX, TW, TY, 0)),
      tambah("puluhan,", labelTempat("tb", TX, TW, TY, 1)),
      tambah("satuan,", labelTempat("tb", TX, TW, TY, 2)),
      tambah("kiri", panah("pk", 40, 134, 220, 0, W.merah, 3), teks("kk", 150, 156, "dari kiri ke kanan", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "pk", "kk"),
      tambah("satu", teks("sa", 150, 140, "1 angka tiap kolom", 10, W.ungu), angkaTempat("tb", TX, TW, 104, 0, "3", 30), angkaTempat("tb", TX, TW, 104, 2, "6", 30)),
      tambah("kosong", teks("ks", 150, 88, "kosong", 8, W.abu)),
      tambah("nol.", angkaTempat("tb", TX, TW, 104, 1, "0", 30), teks("kn", 150, 170, "kosong diisi 0", 10, W.merah)),
      hapus("nol.", "ks"),
    ),
    k(
      SUARA_C4,
      hapus(0, "sa", "kn"),
      tambah("dibaca", panah("pk", 40, 134, 220, 0, W.merah, 3)),
      sorotkan("kiri.", "tb-d0", "tb-h0"),
      tambah("paling", teks("dk", 150, 160, "mulai dari kiri", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Place-Value Chart: terapan ------------------------------ */
const SUARA_T1 = "Salsa memasukkan lima ratus delapan ke tabel: lima di ratusan, nol di puluhan, delapan di satuan.";
const SUARA_T2 = "Ia membaca dari kiri dan mendapat lima ratus delapan.";
const SUARA_T3 = "Cocok untuk membaca dan menulis bilangan tiga angka dengan rapi.";
const SUARA_T4 = "Kurang cocok kalau yang ditanya banyak benda nyata, karena tabel tidak memperlihatkan bendanya.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Place-Value Chart: tabel Salsa",
  sumber: "Metode global: Place-Value Chart (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tabel Salsa"), ...lantai("lt", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("tabel:", ...tabel3("tb", 80, 40, 200, 18, 50)),
      tambah("delapan", teks("n508", 180, 160, "508", 20, W.merah)),
      tambah("lima@2", labelTempat("tb", 80, 200, 40, 0), angkaTempat("tb", 80, 200, 94, 0, "5", 28)),
      tambah("nol", labelTempat("tb", 80, 200, 40, 1), angkaTempat("tb", 80, 200, 94, 1, "0", 28)),
      tambah("delapan@2", labelTempat("tb", 80, 200, 40, 2), angkaTempat("tb", 80, 200, 94, 2, "8", 28)),
    ),
    k(
      SUARA_T2,
      tambah("membaca", panah("pk", 90, 122, 180, 0, W.merah, 3)),
      tambah("kiri", teks("w0", 113, 140, "lima ratus", 8.4, W.hijauTua)),
      tambah("mendapat", teks("w2", 247, 140, "delapan", 8.4, W.sat)),
      sorotkan("lima", "n508"),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("menulis", ...tabel3("tb", 50, 50, 170, 18, 44), angkaTempat("tb", 50, 170, 100, 0, "2", 26), angkaTempat("tb", 50, 170, 100, 1, "4", 26), angkaTempat("tb", 50, 170, 100, 2, "7", 26)),
      tambah("tiga", teks("n3", 135, 40, "3 angka", 10, W.ungu)),
      tambah("rapi.", teks("rp", 135, 150, "rapi", 12, W.hijauTua), emo("rk", 135, 176, E.senyum, 20)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("benda", ...[0, 1, 2, 3].map((i) => toples(`tp${i}`, 20 + i * 22, 90, 18, 24)).flat(), teks("bd", 62, 76, "banyak benda", 9, W.ungu)),
      tambah("tabel", ...tabel3("tb", 160, 62, 120, 18, 36), angkaTempat("tb", 160, 120, 108, 0, "4", 20), angkaTempat("tb", 160, 120, 108, 1, "0", 20), angkaTempat("tb", 160, 120, 108, 2, "0", 20)),
      tambah("memperlihatkan", emo("tq", 120, 104, E.tanya, 22), teks("tt", 150, 160, "benda tidak tampak", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Number Names: konsep ------------------------------ */
const SUARA_N1 = "Cara ketiga, Number Names, atau Nama Bilangan.";
const SUARA_N2 = "Kita mengucapkan bilangan menurut aturan: ratusan, lalu puluhan, lalu satuan.";
const SUARA_N3 = "Angka nol tidak diucapkan, dan sebelas sampai sembilan belas punya nama khusus.";
const SUARA_N4 = "Dengan nama yang benar, kita bisa menulis angkanya dari kata.";

export const ADEGAN_LUAR_NAMA: AdeganStory = {
  id: "luar-nama",
  judul: "Number Names: Nama Bilangan",
  sumber: "Metode global: Number Names (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cara 3: Number Names")),
      tambah("Number", ...kartu("kw", 70, 52, 160, 40, KUNING_KARTU, ["tujuh ratus enam"], 11)),
      tambah("ketiga,", emo("sp", 150, 124, "\u{1F5E3}", 28)),
      tambah("Nama", teks("nm", 150, 160, "Nama Bilangan", 13, W.ungu)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Urutan Mengucapkan")),
      tambah("ratusan,", ...kartu("r0", 18, 70, 78, 40, "#DCFCE7", ["ratusan"], 10)),
      tambah("puluhan,", ...kartu("r1", 111, 70, 78, 40, "#DBEAFE", ["puluhan"], 10), panah("a1", 98, 90, 11, 0, W.merah, 2.4)),
      tambah("satuan.", ...kartu("r2", 204, 70, 78, 40, "#FEE2E2", ["satuan"], 10), panah("a2", 191, 90, 11, 0, W.merah, 2.4)),
      tambah("aturan:", teks("at", 150, 140, "ratusan, lalu puluhan, lalu satuan", 10, W.ungu)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Nol dan Nama Khusus")),
      tambah("nol", teks("n0", 60, 90, "0", 40, W.merah), emo("xs", 100, 78, E.salah, 22), teks("tn", 60, 120, "tidak diucapkan", 9, W.merah)),
      tambah("sebelas", ...kartu("k11", 150, 52, 60, 36, KUNING_KARTU, ["11"], 16)),
      tambah("sembilan", ...kartu("k19", 222, 52, 60, 36, KUNING_KARTU, ["19"], 16)),
      tambah("khusus.", teks("nk", 216, 112, "nama khusus", 10, W.ungu), garis("dd", 214, 70, 6, 0, W.merah, 2)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Dari Kata ke Angka")),
      tambah("nama", ...kartu("kw", 20, 70, 130, 40, KUNING_KARTU, ["tiga ratus dua"], 11)),
      tambah("menulis", panah("pa", 154, 90, 36, 0, W.merah, 3)),
      tambah("angkanya", teks("n302", 236, 100, "302", 26, W.merah)),
      tambah("kata.", teks("pk", 150, 150, "dengar, lalu tulis", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Number Names: terapan ------------------------------ */
const SUARA_M1 = "Bima mendengar tujuh ratus enam belas, lalu menulisnya dengan tiga angka.";
const SUARA_M2 = "Ia memeriksa dengan mengucapkan kembali, dan bunyinya sama.";
const SUARA_M3 = "Cocok kalau bilangan dibacakan atau ditulis dengan kata.";
const SUARA_M4 = "Kurang cocok kalau bilangannya banyak sekali, karena kata menjadi panjang dan sulit diingat.";

export const ADEGAN_LUAR_NAMA_TERAPAN: AdeganStory = {
  id: "luar-nama-terapan",
  judul: "Number Names: catatan Bima",
  sumber: "Metode global: Number Names (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Catatan Bima"), ...lantai("lt", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("mendengar", emo("td", 40, 118, "\u{1F442}", 20), ...kartu("kw", 90, 46, 150, 38, KUNING_KARTU, ["tujuh ratus enam belas"], 9)),
      tambah("menulisnya", kotak("kc", 120, 96, 90, 44, W.putih, W.biru, { rx: 3, z: 1 }), teks("n716", 165, 128, "716", 24, W.merah, { z: 2 })),
      tambah("tiga", teks("n3", 255, 120, "3 angka", 10, W.ungu)),
    ),
    k(
      SUARA_M2,
      tambah("memeriksa", panah("pb", 165, 92, 0, -6, W.merah, 2)),
      tambah("mengucapkan", emo("sp", 250, 66, "\u{1F5E3}", 22)),
      tambah("sama.", emo("ok", 250, 100, E.benar, 24), teks("sm", 250, 136, "sama", 10, W.hijauTua)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("dibacakan", emo("sp", 80, 100, "\u{1F50A}", 30), teks("db", 80, 130, "dibacakan", 9, W.ungu)),
      tambah("kata.", ...kartu("kw", 130, 70, 110, 36, KUNING_KARTU, ["lima ratus empat"], 9), teks("dk", 185, 130, "ditulis dengan kata", 9, W.ungu)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("banyak", ...[0, 1, 2, 3].map((i) => kartu(`kk${i}`, 24 + (i % 2) * 118, 40 + Math.floor(i / 2) * 44, 110, 36, KUNING_KARTU, ["kata panjang"], 9)).flat()),
      tambah("panjang", teks("pj", 150, 150, "kata menjadi panjang", 10, W.merah)),
      tambah("diingat.", emo("pz", 150, 178, E.pusing, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung apa yang ingin kamu ketahui.";
const SUARA_R2 = "Ingin melihat bendanya, pakai Balok Dienes. Ingin menulis rapi, pakai Tabel Tiga Tempat.";
const SUARA_R3 = "Ingin membaca atau menulis dari kata, pakai Nama Bilangan. Apa pun caranya, angka nol tetap menjaga tempat.";
const SUARA_R4 = "Menurutmu, untuk membaca bilangan di papan harga toko, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Mendata Bilangan"), teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Tiga", ...kartu("r0", 20, 56, 78, 60, "#DBEAFE", ["Balok", "Dienes"], 10)),
      tambah("cara", ...kartu("r1", 111, 56, 78, 60, "#DCFCE7", ["Tabel", "Tiga Tempat"], 9)),
      tambah("lihat.", ...kartu("r2", 202, 56, 78, 60, "#FCE7F3", ["Nama", "Bilangan"], 10)),
      tambah("tergantung", emo("tq", 150, 184, E.tanya, 24)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      sorotkan("bendanya,", "r0-k"),
      tambah("bendanya,", teks("g0", 59, 140, "lihat benda", 8.4, W.ungu)),
      ubah("rapi,", { id: "r0-k", sorot: false }),
      sorotkan("rapi,", "r1-k"),
      tambah("rapi,", teks("g1", 150, 140, "tulis rapi", 8.4, W.ungu)),
    ),
    k(
      SUARA_R3,
      ubah("membaca", { id: "r1-k", sorot: false }),
      sorotkan("kata,", "r2-k"),
      tambah("kata,", teks("g2", 241, 140, "dari kata", 8.4, W.ungu)),
      tambah("nol", bulat("rg", 150, 180, 13, "#FEE2E2", W.merah, { tebal: 2 }), teks("zr", 150, 186, "0", 16, W.merah, { z: 4 })),
      tambah("menjaga", teks("jg", 215, 186, "penjaga tempat", 9, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Papan Harga Toko")),
      tambah("papan", kotak("ph", 70, 44, 160, 60, "#FEF3C7", W.coklat, { rx: 4, tebal: 2.4 }), teks("hg", 150, 86, "750", 34, W.merah)),
      tambah("cara", ...kartu("p0", 20, 118, 78, 38, "#DBEAFE", ["Balok"], 10), ...kartu("p1", 111, 118, 78, 38, "#DCFCE7", ["Tabel"], 10), ...kartu("p2", 202, 118, 78, 38, "#FCE7F3", ["Nama"], 10)),
      tambah("cepat?", emo("tq", 150, 176, E.tanya, 26)),
    ),
  ],
};
