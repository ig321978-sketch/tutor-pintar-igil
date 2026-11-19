import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batangPuluh, benda, bingkai, bulat, busur, emo, garis, ikat, judul, kartu, kotakSatuan, lantai, panah, teks, tokoh } from "./k2b7A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k2b7A-bantu";
import { NAMA_METODE_ID } from "./k2b7A-luar-1";

/*
 * Cerita orisinal IGIL "Botol Pak Ujang" (Kelas 2 Bab 7 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b7a.md. Bagian ini: Skip Counting (Hitung Loncat), Base Ten Blocks (Balok Puluhan), dan ringkasan.
 */

/** Garis lompatan mendatar `${id}` dari x1 sampai x2 di tinggi y. */
const talang = (id: string, x1: number, x2: number, y: number): Obj => garis(id, x1, y, x2 - x1, 0, W.biru, 2.4);
/** Tanda angka: tick `${id}` dan angka `${id}-n` di bawahnya. */
const tanda = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.ungu): Obj[] => [garis(id, x, y - 4, 0, 8, W.biru, 1.6), teks(`${id}-n`, x, y + 16, isi, u, warna)];

/* ------------------------------ Skip Counting: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Skip Counting, atau Hitung Loncat.";
const SUARA_C2 = "Kita menyebut bilangan sambil melompat, misalnya melompat sepuluh-sepuluh.";
const SUARA_C3 = "Sepuluh, dua puluh, tiga puluh. Setiap lompatan menambah satu puluhan.";
const SUARA_C4 = "Setelah puluhan habis, lanjutkan satu-satu untuk benda yang lepas.";

export const ADEGAN_LUAR_LONCAT: AdeganStory = {
  id: "luar-loncat",
  judul: "Skip Counting: Hitung Loncat",
  sumber: "Metode global: Skip Counting (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Skip Counting"), talang("gl", 30, 270, 120)),
      tambah("Skip", busur("c0", 40, 100, 114, 30), busur("c1", 100, 160, 114, 30), busur("c2", 160, 220, 114, 30)),
      tambah("Hitung", teks("nm", 150, 172, "Hitung Loncat", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("menyebut", emo("mb", 62, 70, "\u{1F4AC}", 22)),
      tambah("melompat,", ...[0, 1, 2].map((i) => teks(`p${i}`, 70 + i * 60, 88, "+10", 11, W.merah))),
      tambah("sepuluh", teks("n10", 150, 50, "10 demi 10", 11, W.ungu)),
    ),
    k(
      SUARA_C3,
      hapus(0, "mb", "p0", "p1", "p2", "n10"),
      tambah("Sepuluh", ...tanda("s0", 100, 120, "10", 12, W.merah)),
      tambah("dua", ...tanda("s1", 160, 120, "20", 12, W.merah)),
      tambah("tiga", ...tanda("s2", 220, 120, "30", 12, W.merah)),
      tambah("Setiap", ...kartu("kt", 60, 44, 180, 24, W.krem, ["1 lompatan = 1 puluhan"], 9)),
    ),
    k(
      SUARA_C4,
      hapus(0, "kt-k", "kt-t0"),
      tambah("Setelah", ...[0, 1, 2].map((i) => busur(`k${i}`, 220 + i * 18, 238 + i * 18, 116, 8, W.hijau))),
      tambah("satu-satu", teks("ks", 250, 76, "+1 +1 +1", 10, W.hijau)),
      tambah("lepas.", ...benda("lb0", 252, 150, "botol"), ...benda("lb1", 266, 150, "botol"), ...benda("lb2", 280, 150, "botol")),
    ),
  ],
};

/* ------------------------------ Skip Counting: terapan ------------------------------ */
const SUARA_T1 = "Nia menghitung ikat koran: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh.";
const SUARA_T2 = "Lalu dua koran lepas: lima puluh satu, lima puluh dua. Jadi semuanya lima puluh dua.";
const SUARA_T3 = "Cocok kalau bendanya sudah diikat sepuluh-sepuluh, karena cepat sekali.";
const SUARA_T4 = "Kurang cocok kalau bendanya masih berserakan, karena harus diikat dulu.";

const KORAN_X = [6, 52, 98, 144, 190];

export const ADEGAN_LUAR_LONCAT_TERAPAN: AdeganStory = {
  id: "luar-loncat-terapan",
  judul: "Skip Counting: ikat koran Nia",
  sumber: "Metode global: Skip Counting (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Ikat Koran Nia"), ...lantai("lt", 150), ...tokoh("ni", 270, 184, "Nia"), ...KORAN_X.flatMap((x, i) => ikat(`k${i}`, x, 96, "koran"))),
      tambah("sepuluh,", busur("b0", 12, 25, 90, 14), teks("a0", 25, 140, "10", 11, W.merah)),
      tambah("dua", busur("b1", 25, 71, 90, 14), teks("a1", 71, 140, "20", 11, W.merah)),
      tambah("tiga", busur("b2", 71, 117, 90, 14), teks("a2", 117, 140, "30", 11, W.merah)),
      tambah("empat", busur("b3", 117, 163, 90, 14), teks("a3", 163, 140, "40", 11, W.merah)),
      tambah("lima", busur("b4", 163, 209, 90, 14), teks("a4", 209, 140, "50", 11, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Lalu", ...benda("l0", 244, 112, "koran"), ...benda("l1", 262, 112, "koran"), teks("n2", 253, 138, "2 lepas", 9, W.ungu)),
      tambah("satu", teks("u1", 244, 100, "51", 10, W.hijau)),
      tambah("dua@2", teks("u2", 262, 100, "52", 10, W.hijau)),
      tambah("semuanya", ...kartu("sm", 90, 154, 120, 26, W.hijauMuda, ["semuanya 52"], 10)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...[0, 1, 2].flatMap((i) => ikat(`g${i}`, 40 + i * 50, 90, "koran"))),
      tambah("Cocok", emo("ok", 262, 70, E.benar, 28)),
      tambah("diikat", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["sudah diikat"], 10)),
      tambah("sepuluh-sepuluh,", teks("n10", 150, 140, "10 demi 10", 11, W.ungu)),
      tambah("cepat", emo("jm", 150, 172, E.jempol, 22)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 262, 70, E.salah, 28)),
      tambah("berserakan,", ...[[60, 100], [110, 130], [150, 96], [190, 134], [80, 160], [230, 110], [130, 170], [210, 168]].flatMap(([x, y], i) => benda(`bs${i}`, x, y, "koran"))),
      tambah("diikat", ...ikat("ik", 112, 44, "koran")),
      tambah("dulu.", teks("gd", 150, 194, "harus diikat dulu", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Base Ten Blocks: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Base Ten Blocks, atau Balok Puluhan.";
const SUARA_B2 = "Satu batang panjang mewakili satu puluhan, dan satu kotak kecil mewakili satu satuan.";
const SUARA_B3 = "Sepuluh kotak kecil boleh ditukar dengan satu batang panjang.";
const SUARA_B4 = "Dengan begitu bilangan besar bisa digambar dengan sedikit balok.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Base Ten Blocks: Balok Puluhan",
  sumber: "Metode global: Base Ten Blocks (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Base Ten Blocks")),
      tambah("Base", ...batangPuluh("b1", 100, 150, 14, 8), ...batangPuluh("b2", 124, 150, 14, 8)),
      tambah("Balok", ...[0, 1, 2].map((i) => kotakSatuan(`q${i}`, 156 + i * 14, 150, 12)), teks("nm", 150, 180, "Balok Puluhan", 13, W.ungu)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Batang dan Kotak"), ...batangPuluh("p1", 70, 154, 20, 8), kotakSatuan("q1", 200, 154, 20)),
      tambah("batang", teks("l1", 80, 40, "1 batang", 10, W.ungu), teks("l2", 80, 172, "1 puluhan", 11, W.merah)),
      tambah("kotak", teks("l3", 210, 114, "1 kotak", 10, W.ungu), teks("l4", 210, 172, "1 satuan", 11, W.hijau)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Ditukar Sepuluh"), ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => kotakSatuan(`q${i}`, 28 + i * 11, 100, 10))),
      tambah("kotak", teks("n10", 85, 60, "10 kotak", 11, W.ungu)),
      tambah("ditukar", panah("pn", 140, 90, 54, 0, W.merah, 2.6)),
      tambah("satu", ...batangPuluh("bt", 222, 150, 14, 8), teks("n1", 229, 176, "1 batang", 10, W.ungu)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Sedikit Balok")),
      tambah("bilangan", teks("bs", 150, 44, "bilangan besar", 12, W.ungu)),
      tambah("digambar", ...[0, 1, 2, 3, 4, 5, 6].flatMap((i) => batangPuluh(`d${i}`, 44 + i * 26, 160, 18, 8))),
      tambah("sedikit", ...[0, 1, 2, 3].map((i) => kotakSatuan(`e${i}`, 100 + i * 16, 184, 12)), emo("ok", 262, 80, E.jempol, 22)),
    ),
  ],
};

/* ------------------------------ Base Ten Blocks: terapan ------------------------------ */
const SUARA_R1 = "Dika menggambar dua puluh enam: dua batang dan enam kotak kecil.";
const SUARA_R2 = "Ia menambah empat kotak lagi. Sepuluh kotak kecil ditukar satu batang, jadi ada tiga batang.";
const SUARA_R3 = "Cocok kalau kita ingin melihat puluhan dan satuan dengan jelas.";
const SUARA_R4 = "Kurang cocok kalau bendanya sangat banyak, karena gambarnya jadi panjang.";

const satuanDi = (id: string, n: number, x: number, yb: number): Obj[] => Array.from({ length: n }, (_, i) => kotakSatuan(`${id}${i}`, x + (i % 5) * 12, yb - Math.floor(i / 5) * 12, 10));

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Base Ten Blocks: gambar Dika",
  sumber: "Metode global: Base Ten Blocks (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Gambar Dika"), ...tokoh("dk", 30, 184, "Dika")),
      tambah("dua", teks("n26", 150, 44, "26", 18, W.ungu)),
      tambah("batang", ...batangPuluh("m1", 90, 150, 18, 8), ...batangPuluh("m2", 114, 150, 18, 8), teks("nb", 111, 168, "2 batang", 9, W.merah)),
      tambah("enam@2", ...satuanDi("s", 6, 160, 150), teks("nk", 184, 168, "6 kotak", 9, W.hijau)),
    ),
    k(
      SUARA_R2,
      tambah("menambah", ...satuanDi("s", 10, 160, 150).slice(6)),
      tambah("empat", teks("n4", 236, 100, "+4", 12, W.merah)),
      tambah("Sepuluh", teks("n10", 236, 116, "10 kotak", 10, W.ungu)),
      hapus("ditukar", ...satuanDi("s", 10, 160, 150).map((o) => o.id), "nk"),
      tambah("ditukar", ...batangPuluh("m3", 160, 150, 18, 8), teks("n1", 169, 168, "1 batang", 9, W.ungu)),
      tambah("tiga", teks("n3", 111, 184, "3 batang", 11, W.hijau)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...batangPuluh("c1", 80, 150, 16, 8), ...batangPuluh("c2", 102, 150, 16, 8), ...satuanDi("cs", 4, 140, 150)),
      tambah("Cocok", emo("ok", 262, 70, E.benar, 28)),
      tambah("puluhan", teks("tp", 100, 172, "puluhan", 10, W.merah)),
      tambah("satuan", teks("ts", 164, 172, "satuan", 10, W.hijau)),
      tambah("jelas.", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["terlihat jelas"], 10)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 262, 70, E.salah, 28)),
      tambah("sangat", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((i) => batangPuluh(`w${i}`, 14 + i * 24, 120, 16, 4))),
      tambah("gambarnya", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((i) => batangPuluh(`x${i}`, 14 + i * 24, 178, 16, 4))),
      tambah("panjang.", teks("pj", 150, 194, "gambarnya panjang", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_G2 = "Benda tidak terlalu banyak dan ingin cepat, pakai Bingkai Sepuluh. Benda sudah diikat, pakai Hitung Loncat.";
const SUARA_G3 = "Ingin melihat puluhan dan satuan dengan jelas, pakai Balok Puluhan. Apa pun caranya, hitunglah sepuluh-sepuluh.";
const SUARA_G4 = "Menurutmu, untuk menghitung seratus tutup botol, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara metode global",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara Menghitung")),
      tambah("tiga", teks("t3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Mana", ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 20, 52 + i * 44, 206, 34, [W.krem, W.langit, W.pink][i], [`${i + 1}. ${NAMA_METODE_ID[i]}`], 12))),
      tambah("tergantung", emo("tq", 276, 100, E.tanya, 22)),
    ),
    k(
      SUARA_G2,
      sorotkan("Benda", "r0-k"),
      tambah("Bingkai", ...bingkai("ia", 240, 62, 10, 5), emo("ok", 262, 100, E.jempol, 16)),
      redamkan("diikat,", "r0-k"),
      sorotkan("diikat,", "r1-k"),
      tambah("diikat,", ...ikat("sd", 238, 104, "koran")),
    ),
    k(
      SUARA_G3,
      redamkan(0, "r1-k"),
      sorotkan("Balok", "r2-k"),
      tambah("jelas,", ...batangPuluh("sk", 244, 176, 8, 2.8), kotakSatuan("sl", 258, 176, 7)),
      tambah("sepuluh-sepuluh.", teks("n10", 150, 192, "hitung 10 demi 10", 10, W.hijau)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas")),
      tambah("seratus", teks("n100", 150, 52, "100 tutup botol", 14, W.ungu)),
      tambah("tutup", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => bulat(`tu${i}`, 40 + i * 24, 88, 8, "#F87171", "#7F1D1D", { tebal: 1.2, z: 2 }))),
      tambah("pilih", ...[0, 1, 2].flatMap((i) => kartu(`p${i}`, 24 + i * 90, 124, 84, 38, [W.krem, W.langit, W.pink][i], [NAMA_METODE_ID[i]], 9))),
      tambah("mana?", emo("tq", 150, 192, E.tanya, 24)),
    ),
  ],
};

