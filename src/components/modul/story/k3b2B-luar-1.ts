import type { AdeganStory } from "./logika-story";
import { E, W, busur, deretBotol, emo, garis, judul, kartu, kertas, panah, poligon, pos, rak, segitigaFakta, tanah, teks, tokoh } from "./k3b2B-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/*
 * Cerita orisinal IGIL "Botol Air Pak Darto" (Kelas 3 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b2b.md. Bagian ini: pembuka (tiga alat penjaga hutan), Fact Family (Keluarga Fakta), dan terapannya.
 */

export const NAMA_METODE = ["Fact Family", "Counting Up", "Number Line"] as const;
export const NAMA_METODE_ID = ["Keluarga Fakta", "Menghitung Naik", "Garis Bilangan"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu di pos jaga, Pak Darto menunjukkan tiga alat untuk mencari bilangan yang belum diketahui pada pengurangan.";
const SUARA_O2 = "Alat itu dipakai penjaga hutan untuk mencatat persediaan dengan cepat.";
const SUARA_O3 = "Tiga cara itu: Fact Family, Counting Up, dan Number Line.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Keluarga Fakta, Menghitung Naik, dan Garis Bilangan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga alat penjaga hutan",
  sumber: "Metode global: pembuka",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga Alat di Pos Jaga"), ...tanah("tn", 150)),
      tambah("pos", ...pos("ps", 20, 102, 84, 44)),
      tambah("Darto", ...tokoh("pd", 262, 184, "Pak Darto")),
      tambah("tiga", teks("n3", 170, 48, "3 alat", 10, W.ungu)),
      tambah("alat", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 122 + i * 44, 62, 38, 38, KUNING_KARTU, ["alat"], 7))),
      tambah("belum", emo("tq", 262, 128, E.tanya, 22)),
    ),
    k(
      SUARA_O2,
      sorotkan("dipakai", "c0-k", "c1-k", "c2-k"),
      tambah("mencatat", kertas("kc", 118, 108, 100, 22), emo("ps2", 122, 124, E.pensil, 14)),
      tambah("persediaan", ...rak("rk", 124, 148, 100, 24), ...deretBotol("bt", 130, 135, 8, 11, 12)),
      tambah("cepat.", emo("cp", 250, 90, "\u{23E9}", 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mencari yang Belum Diketahui"), teks("n3", 252, 44, "3 cara", 10, W.ungu)),
      tambah("Fact", teks("m0", 150, 76, "1. Fact Family", 10.5, W.biru), poligon("sg", [[34, 58], [52, 90], [16, 90]], "#BFDBFE", W.awal, { z: 1 })),
      tambah("Counting", teks("m1", 150, 128, "2. Counting Up", 10.5, W.biru), panah("nk", 18, 138, 32, -24, W.hijau, 2.6)),
      tambah("Number", teks("m2", 150, 180, "3. Number Line", 10.5, W.biru), garis("gl", 16, 176, 40, 0, W.biru, 2), busur("bs", 20, 50, 176, 14, W.merah)),
    ),
    k(
      SUARA_O4,
      tambah("Keluarga", teks("g0", 250, 76, "Keluarga Fakta", 9, W.ungu)),
      tambah("Menghitung", teks("g1", 250, 128, "Menghitung Naik", 9, W.ungu)),
      tambah("Garis", teks("g2", 250, 180, "Garis Bilangan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Fact Family: konsep ------------------------------ */
const SUARA_F1 = "Cara pertama, Fact Family, atau Keluarga Fakta.";
const SUARA_F2 = "Tiga bilangan yang berkaitan membentuk satu keluarga: dua bagian dan satu jumlah.";
const SUARA_F3 = "Dari tiga bilangan itu ada dua kalimat tambah dan dua kalimat kurang.";
const SUARA_F4 = "Jadi, bilangan yang hilang bisa dicari dari kalimat yang sudah kita kenal.";

export const ADEGAN_LUAR_KELUARGA: AdeganStory = {
  id: "luar-keluarga",
  judul: "Fact Family atau Keluarga Fakta",
  sumber: "Metode global: Keluarga Fakta",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Fact Family"), ...segitigaFakta("sg", 150, 62, 120, 80, 15)),
      tambah("Fact", teks("nm", 150, 172, "Fact Family", 12, W.awal)),
      tambah("Keluarga", teks("nm2", 150, 190, "Keluarga Fakta", 9, W.ungu)),
    ),
    k(
      SUARA_F2,
      tambah("Tiga", teks("n3", 52, 66, "3 bilangan", 9, W.ungu)),
      tambah("satu", teks("n1", 248, 66, "1 keluarga", 9, W.ungu)),
      tambah("dua", teks("n2", 52, 156, "2 bagian", 9, W.bagA), teks("tb", 100, 148, "bagian", 6.4, W.bagA), teks("tc", 200, 148, "bagian", 6.4, W.bagB)),
      tambah("satu@2", teks("n1b", 248, 156, "1 jumlah", 9, W.awal), teks("ta", 150, 65, "jumlah", 6.4, W.awal)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Empat Kalimat dalam Satu Keluarga"), teks("n3", 150, 40, "3 bilangan", 9, W.ungu)),
      tambah("dua", teks("h1", 80, 70, "2 kalimat tambah", 9, W.bagB), ...kartu("t1", 24, 78, 112, 24, "#DCFCE7", ["tambah"], 9), ...kartu("t2", 24, 108, 112, 24, "#DCFCE7", ["tambah"], 9)),
      tambah("dua@2", teks("h2", 220, 70, "2 kalimat kurang", 9, W.bagA), ...kartu("r1", 164, 78, 112, 24, "#FEE2E2", ["kurang"], 9), ...kartu("r2", 164, 108, 112, 24, "#FEE2E2", ["kurang"], 9)),
    ),
    k(
      SUARA_F4,
      tambah("hilang", ...kartu("hl", 100, 146, 100, 32, KUNING_KARTU, ["bilangan hilang"], 9)),
      tambah("dicari", panah("pa", 80, 134, 40, 10, W.ungu, 2.2), panah("pb", 220, 134, -40, 10, W.ungu, 2.2)),
      sorotkan("kalimat", "t1-k", "t2-k", "r1-k", "r2-k"),
      tambah("kenal.", emo("ok", 230, 164, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Fact Family: terapan ------------------------------ */
const SUARA_T1 = "Bima punya keluarga tiga bilangan: dua puluh tujuh, empat puluh lima, dan tujuh puluh dua.";
const SUARA_T2 = "Dua puluh tujuh tambah empat puluh lima sama dengan tujuh puluh dua, dan tujuh puluh dua dikurangi dua puluh tujuh sama dengan empat puluh lima.";
const SUARA_T3 = "Cocok untuk memeriksa hasil dan memilih tambah atau kurang.";
const SUARA_T4 = "Kurang cocok kalau hanya satu bilangan yang diketahui, karena keluarganya belum lengkap.";

export const ADEGAN_LUAR_KELUARGA_TERAPAN: AdeganStory = {
  id: "luar-keluarga-terapan",
  judul: "Keluarga tiga bilangan Bima",
  sumber: "Metode global: terapan Keluarga Fakta",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Keluarga Bima"), ...tanah("tn", 150), ...tokoh("bm", 36, 184, "Bima")),
      tambah("keluarga", ...segitigaFakta("sg", 190, 50, 80, 62, 13)),
      tambah("tiga", teks("n3", 70, 64, "3 bilangan", 9, W.ungu)),
      tambah("dua", teks("tb", 150, 116, "27", 11, W.bagA)),
      tambah("empat", teks("tc", 230, 116, "45", 11, W.bagB)),
      tambah("tujuh@2", teks("ta", 190, 54, "72", 11, W.awal)),
    ),
    k(
      SUARA_T2,
      tambah("Dua", teks("e1", 96, 146, "27", 13, W.bagA, { anchor: "start" })),
      ubah("empat", { id: "e1", isi: "27 + 45" }),
      ubah("sama", { id: "e1", isi: "27 + 45 = 72" }),
      tambah("tujuh@3", teks("e2", 96, 168, "72", 13, W.awal, { anchor: "start" })),
      ubah("dikurangi", { id: "e2", isi: "72 − 27" }),
      ubah("sama@2", { id: "e2", isi: "72 − 27 = 45" }),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 270, 166, E.benar, 24)),
      tambah("memeriksa", ...kartu("p1", 246, 68, 46, 20, "#DCFCE7", ["periksa"], 7.4)),
      tambah("tambah", ...kartu("p2", 246, 94, 46, 20, "#DCFCE7", ["tambah"], 7.4)),
      tambah("kurang.", ...kartu("p3", 246, 120, 46, 20, "#FEE2E2", ["kurang"], 7.4)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Satu Bilangan Saja"), ...tanah("tn", 150), ...tokoh("bm", 36, 184, "Bima"), ...segitigaFakta("sg", 190, 50, 80, 62, 13)),
      tambah("hanya", emo("xs", 262, 140, E.salah, 24)),
      tambah("satu", teks("n1", 70, 64, "1 bilangan", 9, W.ungu), teks("ta", 190, 54, "72", 11, W.awal)),
      tambah("belum", teks("tb", 150, 116, "?", 13, W.bagA), teks("tc", 230, 116, "?", 13, W.bagB)),
      tambah("lengkap.", teks("bl", 190, 150, "belum lengkap", 9, W.merah)),
      redamkan("karena", "xs"),
    ),
  ],
};

