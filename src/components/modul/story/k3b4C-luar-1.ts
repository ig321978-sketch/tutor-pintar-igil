import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WL, emo, garisAbs, judul, kartu, kotak, petakGrid, poligon, rumput, tali, tenda, teks, tokoh, ukurTegak, bulat } from "./k3b4C-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b4C-bantu";

/*
 * Cerita orisinal IGIL "Lintasan Pak Samsul" (Kelas 3 Bab 4 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4c.md. Bagian ini: pembuka (tiga cara memeriksa garis dan bangun), Grid Paper Check (Cek Kertas Petak), dan terapannya.
 */

export const NAMA_METODE = ["Grid Paper Check", "Fold and Match", "Shape Sort"] as const;
export const NAMA_METODE_ID = ["Cek Kertas Petak", "Lipat dan Cocokkan", "Pilah Bangun"] as const;

/** Ikon kecil tiga cara: kertas petak, pojok kertas, dan tiga bangun. Pojok kiri-atas (x, y). */
const ikonPetak = (x: number, y: number): Obj[] => [kotak("i0k", x, y, 28, 16, WL.petak, W.hijau, { rx: 0, tebal: 1.2 }), garisAbs("i0a", x, y + 6, x + 28, y + 6, W.hijau, 1), garisAbs("i0b", x + 10, y, x + 10, y + 16, W.hijau, 1), garisAbs("i0c", x + 19, y, x + 19, y + 16, W.hijau, 1)];
const ikonPojok = (x: number, y: number): Obj[] => [poligon("i1k", [[x, y + 16], [x + 18, y + 16], [x + 18, y], [x, y]], W.kertas, W.kertasGaris, { tebal: 1.2 })];
const ikonBangun = (x: number, y: number): Obj[] => [poligon("i2a", [[x + 6, y], [x, y + 14], [x + 12, y + 14]], W.emas, "#92400E", { tebal: 1 }), kotak("i2b", x + 14, y + 3, 11, 11, "#BBF7D0", "#166534", { rx: 0, tebal: 1 }), bulat("i2c", x + 34, y + 8, 6, "#FDBA74", "#9A3412", { tebal: 1 })];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di tenda panitia, Pak Samsul membuka papan alat lomba yang sudah usang.";
const SUARA_O2 = "Di atasnya ada tiga cara untuk memeriksa garis dan bangun tanpa keliru.";
const SUARA_O3 = "Tiga cara itu: Grid Paper Check, Fold and Match, dan Shape Sort.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Cek Kertas Petak, Lipat dan Cocokkan, dan Pilah Bangun.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga cara memeriksa garis dan bangun",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Papan Alat Lomba"), ...rumput("tn", 150)),
      tambah("tenda", ...tenda("td", 22, 100, 100)),
      tambah("Samsul", ...tokoh("ps", 190, 184, "Pak Samsul")),
      tambah("papan", kotak("pa", 150, 46, 130, 70, "#D6A15E", WL.kayuTua, { rx: 4, tebal: 2 }), teks("pt", 215, 84, "papan alat lomba", 9, W.coklat)),
      tambah("usang.", teks("us", 215, 102, "sudah usang", 9, W.coklat)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara Memeriksa"), ...rumput("tn", 150)),
      tambah("tiga", teks("n3", 252, 40, "3 cara", 10, W.ungu)),
      tambah("cara", ...kartu("c0", 14, 56, 88, 40, W.langit, ["cara"], 9), ...kartu("c1", 106, 56, 88, 40, W.hijauMuda, ["cara"], 9), ...kartu("c2", 198, 56, 88, 40, W.krem, ["cara"], 9)),
      tambah("garis", garisAbs("g0a", 28, 120, 88, 120, W.tali1, 3), garisAbs("g0b", 28, 138, 88, 138, W.tali2, 3), poligon("g1", [[124, 140], [158, 140], [158, 108], [124, 108]], W.kertas, W.kertasGaris, { tebal: 1.4 })),
      tambah("bangun", poligon("g2a", [[222, 140], [208, 112], [236, 112]], W.emas, "#92400E", { tebal: 1.4 }), bulat("g2b", 262, 126, 14, "#FDBA74", "#9A3412", { tebal: 1.6 })),
      tambah("keliru.", emo("ok", 150, 172, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Memeriksa"), teks("n3", 252, 40, "3 cara", 10, W.ungu)),
      tambah("Grid", teks("m0", 60, 78, "1. Grid Paper Check", 9.6, W.biru, { anchor: "start" }), ...ikonPetak(18, 66)),
      tambah("Fold", teks("m1", 60, 128, "2. Fold and Match", 9.6, W.biru, { anchor: "start" }), ...ikonPojok(18, 116)),
      tambah("Shape", teks("m2", 60, 178, "3. Shape Sort", 9.6, W.biru, { anchor: "start" }), ...ikonBangun(14, 166)),
    ),
    k(
      SUARA_O4,
      tambah("Cek", teks("g0", 290, 78, "Cek Kertas Petak", 9, W.ungu, { anchor: "end" })),
      tambah("Lipat", teks("g1", 290, 128, "Lipat dan Cocokkan", 9, W.ungu, { anchor: "end" })),
      tambah("Pilah", teks("g2", 290, 178, "Pilah Bangun", 9, W.ungu, { anchor: "end" })),
    ),
  ],
};

/* ------------------------------ Grid Paper Check: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Grid Paper Check, atau Cek Kertas Petak.";
const SUARA_P2 = "Kita menaruh dua garis pada kertas berpetak.";
const SUARA_P3 = "Lalu kita menghitung jarak kedua garis di kedua ujungnya.";
const SUARA_P4 = "Kalau jaraknya sama, garisnya sejajar. Kalau berbeda, garisnya tidak sejajar.";

export const ADEGAN_LUAR_PETAK: AdeganStory = {
  id: "luar-petak",
  judul: "Grid Paper Check atau Cek Kertas Petak",
  sumber: "Metode global: Cek Kertas Petak",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Grid Paper Check")),
      tambah("Grid", ...petakGrid("pg", 45, 34, 14, 8, 15)),
      tambah("Check,", teks("nm", 150, 174, "Grid Paper Check", 13, W.hijauTua)),
      tambah("Petak.", teks("nm2", 150, 190, "Cek Kertas Petak", 9, W.ungu)),
    ),
    k(
      SUARA_P2,
      tambah("dua", teks("n2", 150, 50, "2 garis", 10, W.biru), ...tali("ef", 60, 64, 240, 64, W.tali1)),
      tambah("garis", ...tali("gh", 60, 109, 240, 109, W.tali2)),
    ),
    k(
      SUARA_P3,
      tambah("menghitung", ...ukurTegak("ua", 75, 64, 109, W.hijauTua), teks("lk", 82, 90, "ujung kiri", 8.4, W.hijauTua, { anchor: "start" })),
      tambah("ujungnya.", ...ukurTegak("ub", 225, 64, 109, W.hijauTua), teks("lr", 218, 90, "ujung kanan", 8.4, W.hijauTua, { anchor: "end" })),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Sama atau Berbeda"), ...tali("l1", 24, 50, 136, 50, W.tali1), ...tali("l2", 24, 92, 136, 92, W.tali2), ...ukurTegak("la", 40, 50, 92, W.hijauTua), ...ukurTegak("lb", 120, 50, 92, W.hijauTua)),
      tambah("sama,", teks("ls", 80, 74, "jarak sama", 8.4, W.hijauTua)),
      tambah("sejajar.", teks("lt", 80, 116, "sejajar", 10, W.hijauTua), emo("lo", 80, 140, E.benar, 22)),
      tambah("berbeda,", ...tali("m1", 164, 50, 276, 50, W.tali1), ...tali("m2", 164, 80, 276, 112, W.tali2), ...ukurTegak("ma", 180, 50, 84, W.merah), ...ukurTegak("mb", 260, 50, 108, W.merah), teks("ms", 220, 70, "jarak berbeda", 8.4, W.merah)),
      tambah("sejajar.@2", teks("mt", 220, 130, "tidak sejajar", 10, W.merah), emo("mo", 220, 154, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Grid Paper Check: terapan ------------------------------ */
const SUARA_T1 = "Bima mengukur dua patok pagar pada kertas petak.";
const SUARA_T2 = "Jaraknya tiga petak di ujung kiri dan tiga petak di ujung kanan, jadi pagar itu sejajar.";
const SUARA_T3 = "Cocok untuk memeriksa garis sejajar dengan pasti.";
const SUARA_T4 = "Kurang cocok kalau garisnya terlalu pendek, karena jaraknya sulit dibandingkan.";

export const ADEGAN_LUAR_PETAK_TERAPAN: AdeganStory = {
  id: "luar-petak-terapan",
  judul: "Bima mengukur dua patok pagar",
  sumber: "Metode global: terapan Cek Kertas Petak",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bima Mengukur Pagar"), ...rumput("tn", 150), ...tokoh("bm", 36, 184, "Bima")),
      tambah("dua", teks("n2", 160, 52, "2 patok", 10, W.biru), ...tali("r1", 80, 66, 240, 66, W.tali1)),
      tambah("patok", ...tali("r2", 80, 111, 240, 111, W.tali2)),
      tambah("kertas", ...petakGrid("pg", 70, 36, 12, 7, 15)),
    ),
    k(
      SUARA_T2,
      tambah("tiga", ...ukurTegak("ua", 94, 66, 111, W.hijauTua), teks("la", 100, 90, "3 petak", 9, W.hijauTua, { anchor: "start" })),
      tambah("tiga@2", ...ukurTegak("ub", 226, 66, 111, W.hijauTua), teks("lb", 220, 90, "3 petak", 9, W.hijauTua, { anchor: "end" })),
      tambah("sejajar.", teks("sj", 160, 128, "sejajar", 11, W.hijauTua), emo("ok", 276, 108, E.benar, 22)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", teks("ck", 160, 28, "cocok", 11, W.hijauTua)),
      sorotkan("garis", "r1", "r2"),
      tambah("pasti.", teks("ps", 160, 146, "pasti", 10, W.biru)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Garis Terlalu Pendek"), ...rumput("tn", 150), ...petakGrid("pg", 100, 40, 6, 6, 15)),
      tambah("garisnya", ...tali("s1", 130, 70, 154, 70, W.tali1), ...tali("s2", 130, 100, 154, 100, W.tali2)),
      tambah("pendek,", teks("pd", 150, 134, "terlalu pendek", 10, W.merah)),
      tambah("jaraknya", ...ukurTegak("sa", 168, 70, 100, W.merah), teks("sq", 180, 90, "? petak", 9, W.merah, { anchor: "start" })),
      tambah("sulit", emo("xs", 150, 160, E.salah, 22)),
    ),
  ],
};
