import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WL, batang, bola, bulat, emo, garis, judul, kantong, kartu, kerucut, kotak, lapangan, panah, raket, teks, tokoh, troli } from "./k2b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b6A-bantu";

/*
 * Cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Kelas 2 Bab 6 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b6a.md. Bagian ini: pembuka (tiga kertas lipat pelatih), Bar Model (Model Batang), dan terapannya.
 */

export const NAMA_METODE = ["Bar Model", "Dot Balance", "Heavy First"] as const;
export const NAMA_METODE_ID = ["Model Batang", "Neraca Titik", "Berat di Dasar"] as const;

const BIRU_BATANG = "#93C5FD";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di dasar troli, Nia menemukan tiga kertas lipat milik pelatih zaman dulu, berisi cara menimbang.";
const SUARA_O2 = "Pak Anton tersenyum. Itu cara pelatih memilih peralatan supaya lomba selalu adil!";
const SUARA_O3 = "Tiga cara itu: Bar Model, Dot Balance, dan Heavy First.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Model Batang, Neraca Titik, dan Berat di Dasar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kertas lipat pelatih",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kertas Tua Pelatih"), ...lapangan("lp", 134)),
      tambah("troli,", ...troli("tr", 40, 150)),
      tambah("Nia", ...tokoh("ni", 120, 184, "Nia")),
      tambah("tiga", teks("n3", 222, 50, "3 kertas", 10, W.ungu)),
      tambah("kertas", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 160 + i * 42, 62, 36, 30, W.krem, ["kertas"], 8))),
      ubah("lipat", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#E7D3A8" }))),
      tambah("menimbang.", emo("nr", 60, 120, "\u{2696}", 26)),
    ),
    k(
      SUARA_O2,
      tambah("Anton", ...tokoh("pa", 252, 184, "Pak Anton")),
      ubah("tersenyum.", { id: "pa", isi: E.senyum }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("peralatan", ...kerucut("kc", 60, 150, 14), ...kantong("kp", 160, 160, 18, 12)),
      tambah("adil!", emo("ok", 200, 128, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Pelatih")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Bar", teks("m0", 130, 76, "1. Bar Model", 13, W.biru), ...batang("ib", 24, 90, 8, 3, 8, BIRU_BATANG), ...batang("ic", 34, 90, 8, 2, 8, "#BFDBFE")),
      tambah("Dot", teks("m1", 130, 126, "2. Dot Balance", 13, W.biru), garis("id1", 20, 130, 34, 0, WL.besiTua, 2.4), bulat("id2", 22, 140, 5, "#FDE68A", W.coklat), bulat("id3", 52, 142, 5, "#FDE68A", W.coklat)),
      tambah("Heavy", teks("m2", 130, 176, "3. Heavy First", 13, W.biru), kotak("ih1", 20, 170, 36, 10, "#B45309", W.coklat, { rx: 1 }), kotak("ih2", 26, 160, 24, 10, "#D6A15E", W.coklat, { rx: 1 }), kotak("ih3", 32, 150, 12, 10, "#FEF3C7", W.coklat, { rx: 1 })),
    ),
    k(
      SUARA_O4,
      tambah("Model", teks("n0", 245, 76, "Model Batang", 10, W.ungu)),
      tambah("Neraca", teks("n1", 245, 126, "Neraca Titik", 10, W.ungu)),
      tambah("Berat", teks("n2", 245, 176, "Berat di Dasar", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Bar Model: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Bar Model, atau Model Batang.";
const SUARA_C2 = "Gambar satu batang untuk setiap benda. Makin berat bendanya, makin tinggi batangnya.";
const SUARA_C3 = "Tinggi batang dibaca dengan menghitung kotak kecil di sampingnya, satu kotak untuk satu satuan.";
const SUARA_C4 = "Batang tertinggi adalah benda yang paling berat, dan batang terpendek adalah benda yang paling ringan.";

/** Tiga batang berdiri di alas y 160 untuk kantong pasir (tinggi enam), bola (empat), dan raket (dua); satu kotak = 12. */
const BATANG_KONSEP = [
  { id: "b1", x: 56, n: 6 },
  { id: "b2", x: 136, n: 4 },
  { id: "b3", x: 216, n: 2 },
];
const batangKonsep = (i: number): Obj[] => batang(BATANG_KONSEP[i].id, BATANG_KONSEP[i].x, 160, 28, BATANG_KONSEP[i].n, 12, BIRU_BATANG);
const bendaKonsep = (): Obj[][] => [kantong("kp", 56, 164, 28, 17), bola("bo", 150, 172, 9), raket("rk", 230, 170, 7)];

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: Model Batang",
  sumber: "Metode global: Bar Model (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Bar Model")),
      tambah("Bar", ...batang("ib1", 96, 140, 30, 2, 16, "#BFDBFE"), ...batang("ib2", 134, 140, 30, 5, 16, BIRU_BATANG), ...batang("ib3", 172, 140, 30, 3, 16, "#BFDBFE")),
      tambah("Model", garis("al", 80, 144, 140, 0, W.biru, 2.4)),
      tambah("Batang.", teks("nm", 150, 172, "Model Batang", 12, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satu Batang Tiap Benda"), garis("al", 30, 160, 240, 0, W.biru, 2.4)),
      tambah("satu", teks("n1", 150, 44, "1 batang", 10, W.ungu), ...batangKonsep(0), ...bendaKonsep()[0]),
      tambah("setiap", ...batangKonsep(1), ...bendaKonsep()[1], ...batangKonsep(2), ...bendaKonsep()[2]),
      tambah("berat", panah("pa", 270, 150, 0, -64, W.merah, 2.6), teks("tb", 270, 70, "berat", 9, W.merah)),
      tambah("tinggi", teks("tt", 150, 66, "makin berat, makin tinggi", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "n1", "pa", "tb", "tt"),
      tambah("menghitung", teks("c6", 70, 92, "6", 10, W.ungu), teks("c4", 150, 116, "4", 10, W.ungu), teks("c2", 230, 140, "2", 10, W.ungu)),
      tambah("kecil", ...[0, 1, 2].map((i) => garis(`sk${i}`, 36, 160 - i * 12, 8, 0, W.merah, 2))),
      tambah("satu@2", teks("n1", 150, 44, "1 kotak = 1 satuan", 10, W.ungu)),
    ),
    k(
      SUARA_C4,
      hapus(0, "n1", "sk0", "sk1", "sk2"),
      tambah("tertinggi", emo("mk", 70, 74, E.mahkota, 18)),
      sorotkan("tertinggi", "b1"),
      tambah("berat,", teks("l1", 70, 196, "paling berat", 8, W.merah)),
      tambah("terpendek", emo("aw", 230, 128, E.awan, 18)),
      sorotkan("terpendek", "b3"),
      tambah("ringan.", teks("l3", 230, 196, "paling ringan", 8, W.hijau)),
    ),
  ],
};

/* ------------------------------ Bar Model: terapan ------------------------------ */
const SUARA_T1 = "Dika menggambar batang untuk kantong pasir, bola basket, dan bola voli. Batang pasir tertinggi, yaitu sembilan kotak.";
const SUARA_T2 = "Batang bola basket enam kotak, dan batang bola voli tiga kotak. Urutannya langsung terlihat.";
const SUARA_T3 = "Cocok kalau kita ingin membandingkan banyak benda sekaligus dalam satu gambar.";
const SUARA_T4 = "Kurang cocok kalau hanya ada dua benda dan kita ingin hasil cepat, karena harus menggambar dulu.";

const bT = (id: string, x: number, n: number): Obj[] => batang(id, x, 160, 30, n, 10, BIRU_BATANG);

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: batang Dika",
  sumber: "Metode global: Bar Model (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Batang Dika"), ...lapangan("lp", 166), garis("al", 90, 160, 160, 0, W.biru, 2.4)),
      tambah("Dika", ...tokoh("dk", 30, 184, "Dika")),
      tambah("kantong", ...bT("bk", 100, 9), ...kantong("kp", 101, 164, 28, 14)),
      tambah("basket,", ...bT("bb", 160, 6), ...bola("bs", 175, 172, 8, "#F97316", "#7C2D12")),
      tambah("voli.", ...bT("bv", 220, 3), ...bola("bl", 235, 172, 8, "#FEF9C3", "#A16207")),
      tambah("sembilan", teks("t9", 115, 54, "9 kotak", 10, W.ungu), emo("mk", 115, 40, E.mahkota, 14)),
    ),
    k(
      SUARA_T2,
      tambah("enam", teks("t6", 175, 84, "6 kotak", 10, W.ungu)),
      tambah("tiga", teks("t3", 235, 114, "3 kotak", 10, W.ungu)),
      tambah("Urutannya", teks("r1", 115, 197, "1", 9, W.merah), teks("r2", 175, 197, "2", 9, W.merah), teks("r3", 235, 197, "3", 9, W.merah)),
      tambah("terlihat.", emo("ok", 270, 120, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), garis("al", 50, 150, 200, 0, W.biru, 2.4)),
      tambah("Cocok", emo("ok", 262, 70, E.benar, 28)),
      tambah("banyak", ...kartu("cc", 40, 40, 170, 24, W.hijauMuda, ["banyak benda sekaligus"], 9)),
      tambah("benda", ...[2, 5, 3, 6, 4].flatMap((n, i) => batang(`g${i}`, 62 + i * 36, 150, 26, n, 10, BIRU_BATANG))),
      tambah("satu", teks("n1", 150, 176, "1 gambar", 10, W.ungu)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), garis("al", 90, 150, 120, 0, W.biru, 2.4)),
      tambah("Kurang", emo("xs", 262, 70, E.salah, 28)),
      tambah("dua", teks("n2", 150, 44, "2 benda", 10, W.ungu), ...batang("h1", 116, 150, 26, 5, 10, BIRU_BATANG), ...batang("h2", 158, 150, 26, 3, 10, BIRU_BATANG)),
      tambah("cepat,", emo("jm", 50, 100, E.jam, 26)),
      tambah("menggambar", emo("pn", 250, 130, "\u{270F}", 24)),
      tambah("dulu.", teks("gd", 150, 176, "harus gambar dulu", 9, W.merah)),
    ),
  ],
};
