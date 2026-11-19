import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kartu, kotak, lantai, papanTulis, teks, tokoh } from "./k3b5A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k3b5A-bantu";

/*
 * Cerita orisinal IGIL "Catatan Pak Hasan" (Kelas 3 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b5a.md. Bagian ini: pembuka (kotak perkakas), Number Order Line (Garis Urutan), dan terapannya.
 */

export const NAMA_METODE = ["Number Order Line", "Range Check", "Tally Count"] as const;
export const NAMA_METODE_ID = ["Garis Urutan", "Cek Jangkauan", "Hitung Turus"] as const;

const KUNING_KARTU = "#FEF3C7";

/** Garis bilangan nol sampai sembilan pada tinggi y: garis dasar `gl`, tanda `tk0`.., angka `tn0`... */
const xGaris = (i: number): number => Math.round((30 + (i * 240) / 9) * 10) / 10;
function garisAngka(y: number): Obj[] {
  return [
    garis("gl", 20, y, 260, 0, W.kapur, 2.4, { z: 2 }),
    ...Array.from({ length: 10 }, (_, i) => garis(`tk${i}`, xGaris(i), y - 6, 0, 12, W.kapur, 1.6, { z: 2 })),
    ...Array.from({ length: 10 }, (_, i) => teks(`tn${i}`, xGaris(i), y + 20, String(i), 9, W.kapur, { z: 2 })),
  ];
}
/** Titik data `${id}` pada garis bilangan di angka `n` dan tinggi y. */
const titik = (id: string, n: number, y: number, warna = "#FACC15", r = 6): Obj => bulat(id, xGaris(n), y, r, warna, W.putih, { tebal: 1.4, z: 4 });
const DATA_STORY = [3, 5, 6, 7, 8, 9];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di belakang bengkel, Pak Hasan membuka kotak perkakas yang penuh catatan.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk membaca data tanpa keliru, supaya hasil catatan selalu tepat.";
const SUARA_O3 = "Tiga cara itu: Number Order Line, Range Check, dan Tally Count.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Garis Urutan, Cek Jangkauan, dan Hitung Turus.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak perkakas Pak Hasan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Di Belakang Bengkel"), ...lantai("lt", 150)),
      tambah("belakang", kotak("rk", 190, 140, 96, 5, "#B7814A", W.coklat, { rx: 1, z: 1 })),
      tambah("Pak", ...tokoh("ph", 60, 184, "Pak Hasan")),
      tambah("kotak", kotak("pt", 212, 120, 56, 20, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 208, 110, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("catatan.", ...kartu("cn", 20, 50, 100, 26, KUNING_KARTU, ["penuh catatan"], 9)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 236, 90, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 48, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 66, "cara", 6.4, W.biru)])),
      tambah("keliru,", emo("xs", 150, 50, E.salah, 18)),
      tambah("tepat.", emo("ok", 150, 80, E.benar, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Number", teks("m0", 112, 70, "1. Number Order Line", 10, W.biru), emo("i0", 30, 72, E.penggaris, 16)),
      tambah("Range", teks("m1", 112, 120, "2. Range Check", 10, W.biru), emo("i1", 30, 122, E.ulang, 16)),
      tambah("Tally", teks("m2", 112, 170, "3. Tally Count", 10, W.biru), emo("i2", 30, 172, E.catat, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Garis", teks("g0", 240, 70, "Garis Urutan", 8, W.ungu), garis("l0", 208, 75, 64, 0, W.ungu, 1)),
      tambah("Cek", teks("g1", 240, 120, "Cek Jangkauan", 8, W.ungu), garis("l1", 208, 125, 64, 0, W.ungu, 1)),
      tambah("Hitung", teks("g2", 240, 170, "Hitung Turus", 8, W.ungu), garis("l2", 208, 175, 64, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Number Order Line: konsep ------------------------------ */
const SUARA_G1 = "Cara pertama, Number Order Line, atau Garis Urutan.";
const SUARA_G2 = "Kita menaruh setiap bilangan data pada satu garis, dari yang terkecil di kiri sampai yang terbesar di kanan.";
const SUARA_G3 = "Bilangan paling kiri adalah data terkecil, dan paling kanan adalah data terbesar.";
const SUARA_G4 = "Dengan garis itu, tidak ada bilangan yang terlewat atau tertukar tempatnya.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Order Line: Garis Urutan",
  sumber: "Metode global: Number Order Line (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 1: Number Order Line"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Number", teks("nm", 150, 54, "Number Order Line", 13, W.kapurMerah)),
      tambah("Garis", teks("ni", 150, 74, "Garis Urutan", 11, W.kapur)),
      tambah("Urutan.", ...garisAngka(112)),
    ),
    k(
      SUARA_G2,
      tambah("bilangan", ...DATA_STORY.map((n) => titik(`d${n}`, n, 112))),
      tambah("satu", teks("s1", 244, 54, "1 garis", 10, W.kapurMerah)),
      tambah("terkecil", teks("lk", 40, 144, "kecil", 9, W.kapur)),
      tambah("terbesar", teks("lb", 262, 144, "besar", 9, W.kapur)),
    ),
    k(
      SUARA_G3,
      sorotkan("kiri", "d3"),
      tambah("terkecil,", teks("kk", 110, 96, "terkecil", 9, W.kapurMerah)),
      sorotkan("kanan", "d9"),
      tambah("terbesar.", teks("kb", 266, 96, "terbesar", 9, W.kapurMerah)),
    ),
    k(
      SUARA_G4,
      sorotkan("Dengan", ...DATA_STORY.map((n) => `d${n}`)),
      hapus("Dengan", "lk", "lb"),
      tambah("terlewat", teks("tw", 90, 146, "tidak terlewat", 10, W.kapur)),
      tambah("tertukar", teks("tu", 214, 146, "tidak tertukar", 10, W.kapur)),
      tambah("tempatnya.", emo("ok", 30, 54, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Number Order Line: terapan ------------------------------ */
const SUARA_T1 = "Salsa menaruh banyak sepeda enam hari pada sebuah garis.";
const SUARA_T2 = "Paling kiri tiga dan paling kanan sembilan, jadi ujungnya langsung tampak.";
const SUARA_T3 = "Cocok untuk mencari data terkecil dan terbesar dengan cepat.";
const SUARA_T4 = "Kurang cocok kalau datanya sangat banyak, karena garisnya jadi terlalu penuh.";
/** Banyak titik kecil pada garis untuk menggambarkan data yang sangat banyak. */
const RAMAI = Array.from({ length: 24 }, (_, i) => bulat(`pn${i}`, 26 + i * 10.4, 112, 3.2, i % 2 === 0 ? "#FACC15" : "#FCA5A5", W.putih, { tebal: 0.8, z: 5 }));

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Urutan: kapan cocok",
  sumber: "Metode global: Number Order Line (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Garis Urutan Salsa"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sl", 40, 184, "Salsa"), ...garisAngka(112)),
      tambah("banyak", ...DATA_STORY.map((n) => titik(`d${n}`, n, 112))),
      tambah("enam", teks("h6", 244, 54, "6 hari", 11, W.kapurMerah)),
    ),
    k(
      SUARA_T2,
      tambah("kiri", teks("a3", 110, 90, "3", 20, W.kapurMerah)),
      tambah("kanan", teks("a9", 270, 90, "9", 20, W.kapurMerah)),
      sorotkan("ujungnya", "d3", "d9"),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 30, 52, E.benar, 20)),
      tambah("terkecil", teks("lk", 40, 144, "kecil", 9, W.kapur)),
      tambah("cepat.", teks("cp", 150, 144, "ujung cepat", 11, W.kapur)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "cp", "a3", "a9"),
      tambah("datanya", ...RAMAI),
      tambah("penuh.", teks("tp", 150, 144, "terlalu penuh", 11, W.kapurMerah), emo("xs", 30, 52, E.salah, 20)),
      redamkan("terlalu", "d3", "d9"),
    ),
  ],
};
