import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kaki, kartu, kotak, panah, poligon, rumput, teks, tokoh } from "./k3b4B-gambar";
import { bersih, hapus, k, tambah } from "./k3b4B-bantu";

/*
 * Cerita orisinal IGIL "Sudut Kak Anton" (Kelas 3 Bab 4 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4b.md. Bagian ini: pembuka (tas alat sudut), Paper Folding (Lipat Kertas), dan terapannya.
 */

export const NAMA_METODE = ["Paper Folding", "Benchmark Angles", "Protractor Walk"] as const;
export const NAMA_METODE_ID = ["Lipat Kertas", "Sudut Acuan", "Langkah Busur"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di tenda pelatih, Kak Anton membuka tas kulit tua berisi alat sudut.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengenali dan mengukur sudut tanpa keliru.";
const SUARA_O3 = "Tiga cara itu: Paper Folding, Benchmark Angles, dan Protractor Walk.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Lipat Kertas, Sudut Acuan, dan Langkah Busur.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tas alat sudut Kak Anton",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tenda Kak Anton"), ...rumput("rt", 150)),
      tambah("tenda", poligon("td", [[20, 150], [70, 86], [120, 150]], "#FDE68A", W.coklat, { z: 0 }), kotak("pt", 58, 122, 24, 28, "#B45309", W.coklat, { rx: 2, z: 1 })),
      tambah("Kak", ...tokoh("ka", 176, 184, "Kak Anton")),
      tambah("tas", kotak("ts", 212, 132, 56, 22, "#A16207", W.coklat, { rx: 4, z: 1 }), kotak("tt", 208, 122, 64, 10, "#92400E", W.coklat, { rx: 3, z: 2 })),
      tambah("sudut.", emo("sg", 240, 114, E.segitiga, 16)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 236, 92, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 58, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 76, "cara", 6.4, W.biru)])),
      tambah("mengukur", ...kartu("pn", 20, 28, 100, 24, "#FDE68A", ["sudut tali"], 9)),
      tambah("keliru.", emo("xs", 140, 46, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mengukur Sudut"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Paper", teks("m0", 120, 70, "1. Paper Folding", 10, W.biru), emo("i0", 30, 72, E.kertas, 16)),
      tambah("Benchmark", teks("m1", 120, 120, "2. Benchmark Angles", 10, W.biru), emo("i1", 30, 122, E.segitiga, 16)),
      tambah("Protractor", teks("m2", 120, 170, "3. Protractor Walk", 10, W.biru), poligon("i2", [[16, 176], [44, 176], [40, 164], [30, 160], [20, 164]], W.busur, W.biru, { z: 1 })),
    ),
    k(
      SUARA_O4,
      tambah("Lipat", teks("g0", 244, 70, "Lipat Kertas", 8, W.ungu)),
      tambah("Sudut", teks("g1", 244, 120, "Sudut Acuan", 8, W.ungu)),
      tambah("Langkah", teks("g2", 244, 170, "Langkah Busur", 8, W.ungu)),
    ),
  ],
};

/* ------------------------------ Paper Folding: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Paper Folding, atau Lipat Kertas.";
const SUARA_C2 = "Kita melipat kertas dua kali, dan pojoknya menjadi sudut siku-siku.";
const SUARA_C3 = "Pojok itu kita tempelkan pada sudut yang ingin diperiksa.";
const SUARA_C4 = "Kalau kaki sudut pas dengan pojok, sudutnya siku-siku.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Paper Folding: Lipat Kertas",
  sumber: "Metode global: Paper Folding (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Paper Folding"), ...rumput("rt", 150)),
      tambah("Paper", emo("kt", 150, 100, E.kertas, 36)),
      tambah("Lipat", teks("nm", 150, 172, "Lipat Kertas", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "kt", "nm"),
      tambah("kertas", kotak("kr", 60, 56, 100, 84, W.putih, W.biru, { rx: 0, z: 1 })),
      tambah("dua", garis("f1", 60, 98, 100, 0, W.merah, 1.6, { putus: true, z: 2 }), garis("f2", 110, 56, 0, 84, W.merah, 1.6, { putus: true, z: 2 }), teks("n2", 220, 76, "2 kali", 11, W.merah)),
      tambah("pojoknya", kotak("sk", 60, 132, 8, 8, undefined, W.merah, { rx: 0, tebal: 1.4, z: 4 })),
      tambah("siku-siku.", teks("ss", 220, 110, "siku-siku", 10, W.hijauTua)),
    ),
    k(
      SUARA_C3,
      hapus(0, "f1", "f2", "n2", "ss"),
      tambah("kita", kaki("t1", 230, 140, 50, 0, W.merah, 3), kaki("t2", 230, 140, 50, 70, W.merah, 3), bulat("tv", 230, 140, 3.5, W.merah, W.biru, { z: 4 })),
      tambah("tempelkan", kotak("pj", 230, 114, 26, 26, undefined, W.merah, { rx: 0, tebal: 1.4, putus: true, z: 5 }), panah("pn", 168, 134, 54, 4, W.hijauTua, 2)),
      tambah("diperiksa.", emo("mg", 262, 96, "\u{1F50D}", 20)),
    ),
    k(
      SUARA_C4,
      hapus(0, "mg"),
      tambah("kaki", teks("kk", 150, 188, "kaki sudut", 9, W.hijauTua)),
      { at: "pas", ubah: [{ id: "t2", x2: 0, y2: -50 }] },
      tambah("pojok,", emo("ok", 270, 100, E.benar, 22)),
      tambah("siku-siku.", teks("s2", 264, 160, "siku-siku", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Paper Folding: terapan ------------------------------ */
const SUARA_T1 = "Salsa melipat kertas dan memeriksa sudut pada bingkai layang-layang.";
const SUARA_T2 = "Kaki bingkai pas dengan pojok kertas, jadi sudutnya siku-siku.";
const SUARA_T3 = "Cocok untuk memeriksa siku-siku tanpa alat ukur.";
const SUARA_T4 = "Kurang cocok untuk mengetahui besar sudut yang tepat, karena hanya menjawab siku-siku atau bukan.";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Paper Folding: bingkai layang-layang",
  sumber: "Metode global: Paper Folding (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bingkai Layang-layang"), ...rumput("rt", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("melipat", kotak("kr", 62, 110, 30, 30, W.putih, W.biru, { rx: 0, z: 1 })),
      tambah("sudut", poligon("bk", [[200, 46], [244, 96], [200, 146], [156, 96]], undefined, W.bambu, { tebal: 3, z: 0 })),
      tambah("layang-layang.", garis("v1", 200, 46, 0, 100, W.bambu, 3), garis("h1", 156, 96, 88, 0, W.bambu, 3)),
    ),
    k(
      SUARA_T2,
      tambah("bingkai", kotak("pj", 200, 70, 26, 26, undefined, W.merah, { rx: 0, tebal: 1.6, putus: true, z: 5 })),
      tambah("pojok", emo("ok", 270, 120, E.benar, 22)),
      tambah("siku-siku.", teks("ss", 262, 70, "siku-siku", 9, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok2", 40, 80, E.benar, 26)),
      tambah("siku-siku", teks("pk", 62, 66, "pojok pas", 9, W.hijauTua)),
      tambah("tanpa", emo("pg", 270, 160, E.penggaris, 22), emo("xs", 270, 138, E.salah, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok2", "pk", "pg", "xs"),
      tambah("Kurang", emo("xs2", 40, 80, E.salah, 26)),
      tambah("besar", teks("bq", 250, 160, "besar sudut = ?", 9, W.merah)),
      tambah("menjawab", emo("pq", 270, 138, E.tanya, 20)),
    ),
  ],
};
