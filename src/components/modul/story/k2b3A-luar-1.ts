import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_BENTUK, WT, angkaSisi, bangun, bangunTitik, emo, judul, kartu, karung, papanPaku, relBeraturan, rumahBurung, rumput, tarikKaret, teks, titikPaku, tokoh, type Titik } from "./k2b3A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b3A-bantu";

/*
 * Cerita orisinal IGIL "Ubin untuk Taman Bermain" (Kelas 2 Bab 3 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b3a.md. Bagian ini: pembuka (tiga kartu tua tukang ubin), Geoboard (Papan Paku), dan terapannya.
 */

export const NAMA_METODE = ["Geoboard", "Venn Diagram", "Shape Hunt"] as const;
export const NAMA_METODE_ID = ["Papan Paku", "Diagram Venn", "Berburu Bentuk"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di dasar karung ubin yang terakhir, Chacha menemukan tiga kartu tua milik tukang ubin zaman dulu.";
const SUARA_O2 = "Pak Tono tertawa. Itu kartu cara tukang ubin mengenali bentuk sebelum memasangnya!";
const SUARA_O3 = "Tiga cara itu: Geoboard, Venn Diagram, dan Shape Hunt.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Papan Paku, Diagram Venn, dan Berburu Bentuk.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu tua tukang ubin",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Tua Tukang Ubin"), rumput("rp")),
      tambah("dasar", ...karung("kr", 24, 124)),
      tambah("Chacha,", ...tokoh("ch", 150, 178, "Chacha")),
      tambah("menemukan", ...[0, 1, 2].flatMap((i) => kartu(`rk${i}`, 84 + i * 62, 92, 54, 32, W.krem, ["kartu"], 8.4))),
      tambah("tiga", teks("n3", 176, 66, "3 kartu", 11, W.ungu)),
      ubah("tua", ...[0, 1, 2].map((i) => ({ id: `rk${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Pak", ...tokoh("pt", 262, 178, "Pak Tono")),
      ubah("tertawa.", { id: "pt", isi: E.tertawa }),
      ubah("kartu", ...[0, 1, 2].map((i) => ({ id: `rk${i}-k`, sorot: true }))),
      tambah("mengenali", emo("kc", 214, 150, E.kaca, 22)),
      tambah("bentuk", bangun("ub1", relBeraturan(6, 11), 96, 62, WT.ubinKuning), bangun("ub2", relBeraturan(5, 11), 150, 62, WT.ubinHijau), bangun("ub3", relBeraturan(3, 12), 204, 62, WARNA_BENTUK[3])),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tukang Ubin")),
      tambah("Geoboard,", teks("m0", 80, 62, "1. Geoboard", 14, W.biru), bangun("i0", relBeraturan(5, 9), 284, 58, WT.ubinHijau)),
      tambah("Venn", teks("m1", 80, 98, "2. Venn Diagram", 14, W.biru), bangun("i1", relBeraturan(6, 9), 284, 94, WT.ubinKuning)),
      tambah("Shape", teks("m2", 80, 134, "3. Shape Hunt", 14, W.biru), bangun("i2", relBeraturan(3, 10), 284, 130, WARNA_BENTUK[3])),
    ),
    k(
      SUARA_O4,
      tambah("Papan", teks("n0", 225, 62, "Papan Paku", 11, W.ungu)),
      tambah("Diagram", teks("n1", 225, 98, "Diagram Venn", 11, W.ungu)),
      tambah("Berburu", teks("n2", 225, 134, "Berburu Bentuk", 11, W.ungu)),
    ),
  ],
};

/* ------------------------------ Geoboard: konsep ------------------------------ */
const SUARA_G1 = "Cara pertama, Geoboard, atau Papan Paku.";
const SUARA_G2 = "Papan ini punya deretan paku, dan karet gelang direntangkan di antara paku-paku itu.";
const SUARA_G3 = "Karet yang rapat membentuk segi banyak, dan banyak sisinya sama dengan banyak karet yang lurus.";
const SUARA_G4 = "Karet tidak boleh bersilangan supaya bentuknya tertutup dan jelas.";

const PEG4: [number, number][] = [[1, 0], [3, 1], [2, 3], [0, 2]];
const titik = (p: [number, number]): Titik => titikPaku(p[0], p[1]);
const ptsPeg4 = PEG4.map(titik);

export const ADEGAN_LUAR_PAPAN: AdeganStory = {
  id: "luar-papan",
  judul: "Geoboard: Papan Paku",
  sumber: "Metode global: Geoboard (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 1: Geoboard"), ...papanPaku()),
      tambah("Geoboard,", teks("gn", 150, 184, "Geoboard", 12, W.ungu)),
      ubah("Paku.", { id: "gn", isi: "Papan Paku" }),
    ),
    k(
      SUARA_G2,
      sorotkan("paku,", "pg00", "pg01", "pg02", "pg03", "pg10", "pg11", "pg12", "pg13"),
      tambah("karet", tarikKaret(0, PEG4[3], PEG4[0])),
      tambah("direntangkan", tarikKaret(1, PEG4[0], PEG4[1])),
      tambah("antara", tarikKaret(2, PEG4[1], PEG4[2])),
    ),
    k(
      SUARA_G3,
      hapus(0, "gn"),
      redamkan(0, "pg00", "pg01", "pg02", "pg03", "pg10", "pg11", "pg12", "pg13"),
      tambah("rapat", bangunTitik("fl", ptsPeg4, "#BFDBFE", { z: -1, tebal: 0 })),
      tambah("membentuk", tarikKaret(3, PEG4[2], PEG4[3])),
      tambah("segi", teks("sb", 150, 184, "segi banyak", 11, W.ungu)),
      tambah("sisinya", ...ptsPeg4.map((_, i) => angkaSisi("fl", ptsPeg4, i, 9))),
      tambah("karet@2", teks("sk", 150, 170, "sisi = karet yang lurus", 8.6, W.merah)),
    ),
    k(
      SUARA_G4,
      hapus(0, "sb", "sk"),
      tambah("tidak", tarikKaret(4, [0, 0], [3, 3]), emo("xs", 232, 70, E.salah, 22)),
      ubah("tidak", { id: "kr4", warna: "#F97316" }),
      tambah("bersilangan", teks("tb", 150, 184, "karet tidak bersilangan", 10, W.merah)),
      tambah("tertutup", teks("tp", 150, 172, "tertutup dan jelas", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ Geoboard: terapan ------------------------------ */
const SUARA_T1 = "Nia merentangkan karet di lima paku, lalu menutupnya di paku pertama.";
const SUARA_T2 = "Ia menghitung karet yang lurus, ada lima, jadi bentuknya segi lima.";
const SUARA_T3 = "Cocok kalau kita ingin membuat bentuk sendiri sambil menghitung sisinya.";
const SUARA_T4 = "Kurang cocok kalau bendanya sudah jadi dan tidak bisa dipasang di papan.";

const PEG5: [number, number][] = [[0, 1], [1, 0], [3, 0], [3, 3], [1, 3]];
const ptsPeg5 = PEG5.map(titik);

export const ADEGAN_LUAR_PAPAN_TERAPAN: AdeganStory = {
  id: "luar-papan-terapan",
  judul: "Geoboard: segi lima Nia",
  sumber: "Metode global: Geoboard (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Segi Lima Nia"), ...papanPaku()),
      tambah("Nia", ...tokoh("ni", 36, 178, "Nia")),
      tambah("merentangkan", tarikKaret(0, PEG5[0], PEG5[1])),
      tambah("karet", tarikKaret(1, PEG5[1], PEG5[2])),
      tambah("lima", teks("p5", 150, 184, "5 paku", 11, W.merah), ...PEG5.map((p, i) => ({ id: `ph${i}`, t: "bulat" as const, x: titik(p).x, y: titik(p).y, r: 5.4, warna: "none", garis: W.merah, tebal: 2, z: 4 }))),
      tambah("lalu", tarikKaret(2, PEG5[2], PEG5[3]), tarikKaret(3, PEG5[3], PEG5[4])),
      tambah("menutupnya", tarikKaret(4, PEG5[4], PEG5[0])),
      sorotkan("pertama.", "ph0"),
    ),
    k(
      SUARA_T2,
      hapus(0, "p5"),
      tambah("menghitung", bangunTitik("fl", ptsPeg5, "#FBCFE8", { z: -1, tebal: 0 })),
      tambah("lurus,", ...ptsPeg5.map((_, i) => angkaSisi("fl", ptsPeg5, i, 9))),
      tambah("ada", teks("a5", 232, 70, "5", 18, W.merah)),
      sorotkan("lima,", "a5"),
      tambah("segi", teks("n5", 150, 184, "segi lima", 11, W.ungu)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("membuat", bangun("sg", relBeraturan(5, 24), 150, 66, WARNA_BENTUK[5])),
      tambah("sendiri", ...kartu("cc", 70, 120, 160, 26, W.hijauMuda, ["buat bentuk sendiri"], 10)),
      ubah("sisinya.", { id: "cc-k", sorot: true }),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("jadi", ...rumahBurung("rb", 150, 80, 40, 44)),
      tambah("tidak", ...kartu("kc", 50, 140, 200, 26, W.merahMuda, ["sudah jadi, tak bisa dipasang"], 9.4)),
    ),
  ],
};
