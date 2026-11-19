import type { AdeganStory } from "./logika-story";
import { E, W, bilah, bulat, emo, garis, judul, kartu, lengkung, paku, panah, penggaris, rumput, teks, tokoh } from "./k3b4A-gambar";
import { hapus, k, redamkan, sorotkan, tambah } from "./k3b4A-bantu";

/*
 * Cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Kelas 3 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4a.md. Bagian ini: Measure Twice (Ukur Dua Kali), Label and Name (Beri Nama Huruf), terapan keduanya, dan ringkasan.
 */
const BAMBU = "#D9B44A";
const SEGI = { a: { x: 150, y: 52 }, b: { x: 90, y: 122 }, c: { x: 210, y: 122 } };

/** Segitiga dari tiga bilah (garis tebal) dengan tiga paku: `${id}1`, `${id}2`, `${id}3`, `${id}p1`..`${id}p3`. */
const segitiga = (id: string) => [
  garis(`${id}1`, SEGI.b.x, SEGI.b.y, SEGI.a.x - SEGI.b.x, SEGI.a.y - SEGI.b.y, BAMBU, 5),
  garis(`${id}2`, SEGI.b.x, SEGI.b.y, SEGI.c.x - SEGI.b.x, 0, BAMBU, 5),
  garis(`${id}3`, SEGI.c.x, SEGI.c.y, SEGI.a.x - SEGI.c.x, SEGI.a.y - SEGI.c.y, BAMBU, 5),
  paku(`${id}p1`, SEGI.a.x, SEGI.a.y, 4),
  paku(`${id}p2`, SEGI.b.x, SEGI.b.y, 4),
  paku(`${id}p3`, SEGI.c.x, SEGI.c.y, 4),
];

/* ------------------------------ Measure Twice: konsep ------------------------------ */
const SUARA_U1 = "Cara kedua, Measure Twice, atau Ukur Dua Kali.";
const SUARA_U2 = "Kita mengukur ruas garis, lalu mengukurnya sekali lagi dari ujung yang lain.";
const SUARA_U3 = "Kedua hasil harus sama. Kalau berbeda, kita periksa apakah ujungnya sudah di angka nol.";
const SUARA_U4 = "Lalu kita tulis hasilnya dengan satuan sentimeter dan milimeter.";

export const ADEGAN_LUAR_UKUR: AdeganStory = {
  id: "luar-ukur",
  judul: "Measure Twice: Ukur Dua Kali",
  sumber: "Metode global: Measure Twice (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cara 2: Measure Twice"), ...penggaris("pr", 40, 112, 8, 20)),
      tambah("Measure", ...bilah("bb", 40, 98, 100, 8)),
      tambah("Ukur", teks("nm", 150, 160, "Ukur Dua Kali", 13, W.ungu), teks("k2", 150, 60, "diukur 2 kali", 11, W.merah)),
    ),
    k(
      SUARA_U2,
      hapus(0, "k2"),
      tambah("mengukur", panah("a1", 40, 90, 100, 0, W.hijau, 2.4), teks("lk", 190, 92, "dari kiri", 9, W.hijauTua)),
      tambah("lagi", panah("a2", 140, 80, -100, 0, W.oranye, 2.4), teks("lr", 190, 74, "dari kanan", 9, W.oranye)),
    ),
    k(
      SUARA_U3,
      hapus(0, "a1", "a2", "lk", "lr", "nm"),
      tambah("hasil", teks("hs", 150, 50, "hasil sama", 12, W.hijauTua)),
      tambah("berbeda,", emo("tq", 250, 70, E.tanya, 22)),
      tambah("periksa", emo("mg", 230, 140, E.lupa, 22)),
      tambah("nol.", garis("pz", 40, 94, 0, 14, W.hijau, 2.6), teks("z0", 40, 160, "0", 18, W.hijau), emo("ok", 70, 158, E.benar, 16)),
    ),
    k(
      SUARA_U4,
      hapus(0, "hs", "tq", "mg", "pz", "z0", "ok"),
      tambah("tulis", ...kartu("sh", 90, 36, 120, 40, "#FEF9C3", ["hasil: … cm", "atau … mm"], 10)),
      tambah("sentimeter", teks("uc", 240, 56, "cm", 18, W.merah)),
      tambah("milimeter.", teks("um", 270, 56, "mm", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ Measure Twice: terapan ------------------------------ */
const SUARA_V1 = "Bima mengukur bilah bambu dari ujung kiri dan mendapat lima sentimeter.";
const SUARA_V2 = "Ia membaliknya dan mengukur dari ujung kanan, lalu hasilnya sama.";
const SUARA_V3 = "Cocok untuk menangkap salah baca, misalnya salah mulai bukan dari angka nol.";
const SUARA_V4 = "Kurang cocok kalau bilahnya melengkung, karena penggaris hanya untuk ruas garis lurus.";

export const ADEGAN_LUAR_UKUR_TERAPAN: AdeganStory = {
  id: "luar-ukur-terapan",
  judul: "Measure Twice: bilah Bima",
  sumber: "Metode global: Measure Twice (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Bima Mengukur Dua Kali"), ...penggaris("pr", 40, 108, 8, 20), ...tokoh("bm", 262, 184, "Bima")),
      tambah("bilah", ...bilah("bb", 40, 94, 100, 8)),
      tambah("ujung", panah("a1", 40, 82, 60, 0, W.hijau, 2.4)),
      tambah("lima", teks("n5", 190, 96, "5 cm", 13, W.merah)),
    ),
    k(
      SUARA_V2,
      tambah("membaliknya", emo("bk", 200, 60, "\u{1F504}", 20)),
      tambah("kanan,", panah("a2", 140, 72, -100, 0, W.oranye, 2.4)),
      tambah("sama.", teks("sm", 150, 46, "5 cm = 5 cm", 12, W.hijauTua)),
    ),
    k(
      SUARA_V3,
      hapus(0, "a1", "a2", "bk"),
      tambah("Cocok", emo("ok", 262, 50, E.benar, 24)),
      tambah("salah", bilah("bs", 80, 70, 100, 8, undefined), teks("m2", 130, 62, "mulai di 2", 9, W.merah)),
      tambah("nol.", teks("z0", 40, 84, "0", 16, W.hijauTua)),
    ),
    k(
      SUARA_V4,
      hapus(0, "ok", "bs", "m2", "z0", "bb"),
      tambah("Kurang", emo("xs", 262, 50, E.salah, 24)),
      tambah("melengkung,", lengkung("kv", 40, 140, 96, 16, W.merah)),
      tambah("lurus.", teks("hl", 190, 76, "hanya lurus", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Label and Name: konsep ------------------------------ */
const SUARA_H1 = "Cara ketiga, Label and Name, atau Beri Nama Huruf.";
const SUARA_H2 = "Kita memberi huruf pada setiap titik sudut bangun datar.";
const SUARA_H3 = "Lalu kita menyebut sisinya dengan dua huruf titik ujungnya.";
const SUARA_H4 = "Dengan begitu tidak ada sisi yang terhitung dua kali atau terlewat.";

export const ADEGAN_LUAR_HURUF: AdeganStory = {
  id: "luar-huruf",
  judul: "Label and Name: Beri Nama Huruf",
  sumber: "Metode global: Label and Name (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Cara 3: Label and Name"), ...rumput("rt", 150)),
      tambah("Label", emo("ct", 150, 100, E.catat, 36)),
      tambah("Beri", teks("nm", 150, 140, "Beri Nama Huruf", 13, W.ungu)),
    ),
    k(
      SUARA_H2,
      hapus(0, "ct", "nm"),
      tambah("memberi", ...segitiga("sg")),
      tambah("huruf", teks("hA", 150, 40, "A", 14, W.merah), teks("hB", 76, 132, "B", 14, W.merah), teks("hC", 224, 132, "C", 14, W.merah)),
      tambah("titik", teks("tt", 150, 160, "titik sudut", 10, W.ungu)),
    ),
    k(
      SUARA_H3,
      hapus(0, "tt"),
      sorotkan("sisinya", "sg1"),
      tambah("dua", teks("d2", 150, 160, "2 huruf", 11, W.hijauTua)),
      tambah("ujungnya.", teks("sA", 100, 80, "AB", 12, W.hijauTua), teks("sB", 150, 142, "BC", 12, W.hijauTua), teks("sC", 200, 80, "AC", 12, W.hijauTua)),
    ),
    k(
      SUARA_H4,
      hapus(0, "d2"),
      tambah("tidak", emo("xs", 262, 50, E.salah, 22)),
      tambah("dua", teks("d2b", 150, 100, "2 kali", 12, W.merah)),
      tambah("terlewat.", teks("tl", 150, 160, "terlewat", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Label and Name: terapan ------------------------------ */
const SUARA_X1 = "Raka memberi huruf P, Q, dan R pada rangka segitiga kecil.";
const SUARA_X2 = "Ia menyebut sisinya PQ, QR, dan PR, dan jumlahnya tiga.";
const SUARA_X3 = "Cocok untuk menghitung dan menyebut sisi dengan rapi.";
const SUARA_X4 = "Kurang cocok untuk bangun bundar, karena tepinya tidak punya sisi lurus.";

export const ADEGAN_LUAR_HURUF_TERAPAN: AdeganStory = {
  id: "luar-huruf-terapan",
  judul: "Label and Name: segitiga PQR",
  sumber: "Metode global: Label and Name (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Rangka Kecil Raka"), ...tokoh("rk", 40, 184, "Raka")),
      tambah(1, ...segitiga("sg")),
      tambah(3, teks("hP", 150, 40, "P", 14, W.merah)),
      tambah(4, teks("hQ", 76, 132, "Q", 14, W.merah)),
      tambah(6, teks("hR", 224, 132, "R", 14, W.merah)),
    ),
    k(
      SUARA_X2,
      tambah(3, teks("sA", 100, 80, "PQ", 12, W.hijauTua)),
      tambah(4, teks("sB", 150, 142, "QR", 12, W.hijauTua)),
      tambah(6, teks("sC", 200, 80, "PR", 12, W.hijauTua)),
      tambah("tiga", teks("n3", 150, 100, "3 sisi", 12, W.ungu)),
    ),
    k(
      SUARA_X3,
      hapus(0, "n3"),
      tambah("Cocok", emo("ok", 262, 50, E.benar, 24)),
      tambah("menghitung", ...kartu("kk", 104, 84, 92, 24, "#FDE68A", ["PQ QR PR"], 10)),
      tambah("rapi.", emo("jm", 262, 100, E.jempol, 22)),
    ),
    k(
      SUARA_X4,
      hapus(0, "ok", "kk-k", "kk-t0", "jm", "sg1", "sg2", "sg3", "sgp1", "sgp2", "sgp3", "hP", "hQ", "hR", "sA", "sB", "sC"),
      tambah("Kurang", emo("xs", 262, 50, E.salah, 24)),
      tambah("bundar,", bulat("tk", 150, 96, 38, "#E2E8F0", W.biru, { tebal: 2, z: 1 })),
      tambah("sisi", teks("sl", 150, 100, "tanpa sisi lurus", 9, W.merah, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin mengenali jenis garis, pakai Cari yang Beda. Ingin hasil ukur yang pasti, pakai Ukur Dua Kali.";
const SUARA_R3 = "Ingin menyebut sisi dengan rapi, pakai Beri Nama Huruf. Apa pun caranya, ukuran ditulis dengan satuan.";
const SUARA_R4 = "Menurutmu, untuk memeriksa panjang bilah bambu, cara mana yang paling pas?";
const KARTU_R = ["#DBEAFE", "#DCFCE7", "#FCE7F3"];
const ISI_R = [["Cari yang", "Beda"], ["Ukur", "2 kali"], ["Beri Nama", "Huruf"]];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), teks("n3", 150, 44, "3 cara", 11, W.ungu)),
      tambah("sudah", ...[0, 1, 2].flatMap((i) => kartu(`r${i}`, 20 + i * 88, 60, 84, 40, KARTU_R[i], ISI_R[i], 9))),
      tambah("Mana", teks("tq", 150, 130, "?", 22, W.merah)),
      tambah("tergantung", emo("pk", 262, 130, E.pikir, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq", "pk"),
      sorotkan("Cari", "r0-k"),
      tambah("pasti,", emo("ok", 150, 130, E.benar, 22)),
      redamkan("Dua", "r0-k"),
      sorotkan("Dua", "r1-k"),
    ),
    k(
      SUARA_R3,
      hapus(0, "ok"),
      redamkan("Beri", "r1-k"),
      sorotkan("Beri", "r2-k"),
      tambah("satuan.", teks("sb", 150, 130, "cm dan mm", 14, W.merah), ...tokoh("br", 40, 184, "Bu Ratih")),
    ),
    k(
      SUARA_R4,
      hapus(0, "sb"),
      redamkan("Menurutmu,", "r2-k"),
      tambah("panjang", ...bilah("bk", 80, 124, 140, 8)),
      tambah("cara", teks("tq", 150, 114, "?", 20, W.merah)),
      tambah("pas?", emo("pk", 262, 130, E.pikir, 22)),
    ),
  ],
};
