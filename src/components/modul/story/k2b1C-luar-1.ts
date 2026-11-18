import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, bulat, emo, garisBilangan, gs, idGarisBilangan, judul, kartu, kotak, lantai, mejaPesta, panah, teks, titikBil, tokoh, xBil } from "./k2b1C-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k2b1C-bantu";

/* Video metode global Sub-Bab C "Dua Nampan untuk Pesta Kue": pembuka, Number Line (Garis Bilangan), dan terapannya. */

export const NAMA_METODE = ["Number Line", "Benchmark Numbers", "Bar Model"];
export const NAMA_METODE_ID = ["Garis Bilangan", "Bilangan Patokan", "Model Batang"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Saat menggulung taplak Pesta Kue, Chacha menemukan tiga lembar kertas lipat di bawahnya.";
const SUARA_O2 = "Bu Sari tertawa. Itu cara membandingkan bilangan dari penjaga kantin zaman dulu!";
const SUARA_O3 = "Tiga cara itu: Number Line, Benchmark Numbers, dan Bar Model.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Garis Bilangan, Bilangan Patokan, dan Model Batang.";

const KERTAS = ["#FDE68A", "#BAE6FD", "#FBCFE8"];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kertas lipat di bawah taplak",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("3 cara membandingkan"), lantai("lt", 150), ...mejaPesta("mj", 40, 80, 220)),
      tambah("menggulung", bulat("gl", 232, 72, 9, WK.taplak, W.biru, { tebal: 2 }), bulat("gl2", 232, 72, 4, W.merah, W.biru)),
      tambah("Chacha", ...tokoh("ch", 28, 172, "chacha")),
      tambah("tiga", ...KERTAS.map((w, i) => kotak(`kr${i}`, 108 + 40 * i, 118, 32, 24, w, W.biru, { rx: 3, tebal: 1.6 }))),
      tambah("lembar", ...kartu("lb", 110, 148, 80, 20, W.krem, ["3 lembar"], 9)),
      tambah("bawahnya.", emo("sr", 150, 108, E.seru, 18)),
    ),
    k(
      SUARA_O2,
      hapus("Sari", "sr"),
      tambah("Sari", ...tokoh("sr2", 272, 172, "sari")),
      tambah("tertawa.", emo("tw", 272, 140, E.tertawa, 24)),
      tambah("cara", ...kartu("cr", 70, 32, 160, 22, W.krem, ["cara dari zaman dulu"], 8.8)),
      tambah("zaman", emo("zm", 150, 66, E.pasir, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      tambah("Number", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Number Line"], 11)),
      tambah("Benchmark", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Benchmark Numbers"], 11)),
      tambah("Bar", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Bar Model"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah("Garis", ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Garis Bilangan"], 11)),
      tambah("Bilangan@2", ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Bilangan Patokan"], 11)),
      tambah("Model", ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Model Batang"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara pertama, Number Line, atau Garis Bilangan.";
const SUARA_G2 = "Letakkan bilangan berurutan pada garis, dari kiri yang kecil ke kanan yang besar.";
const SUARA_G3 = "Bilangan yang lebih ke kanan lebih besar.";
const SUARA_G4 = "Bilangan yang lebih ke kiri lebih kecil.";

const GB = { x: 24, y: 100, w: 252 };
const di = (n: number): number => xBil(GB.x, GB.w, 20, 40, n);
const GARIS = garisBilangan("gb", GB.x, GB.y, GB.w, 20, 40, 5);
const SUMBU = GARIS.filter((o) => o.id === "gb-g");
const TANDA = GARIS.filter((o) => o.t === "garis" && o.id !== "gb-g");
const ANGKA = GARIS.filter((o) => o.t === "teks");

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: garis bilangan",
  sumber: "Metode global: Number Line",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara pertama"), lantai("lt", 150), kepala(0)),
      tambah("Number", ...SUMBU),
      tambah("Line,", ...TANDA),
      tambah("Garis", ...ANGKA),
      tambah("Bilangan.", emo("pg", 150, 76, E.penggaris, 22)),
    ),
    k(
      SUARA_G2,
      hapus("Letakkan", "pg"),
      tambah("berurutan", ...[22, 27, 33].map((n, i) => bulat(`dt${i}`, di(n), GB.y, 4.5, WK.biruMuda, W.biru, { z: 2 }))),
      tambah("kiri", teks("kc", 40, 160, "kecil", 10, W.biru)),
      tambah("kanan", teks("bs", 258, 160, "besar", 10, W.merah), panah("pn", 60, 140, 240, 140, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus("Bilangan", "dt0", "dt1", "dt2"),
      tambah("lebih", bulat("kn", di(37), GB.y, 5, W.merah, W.biru, { z: 2 })),
      tambah("kanan", emo("jr", di(37), 76, E.jari, 20)),
      tambah("besar.", ...kartu("kb", 50, 166, 200, 20, W.merahMuda, ["lebih ke kanan = lebih besar"], 8.6)),
    ),
    k(
      SUARA_G4,
      hapus("Bilangan", "kn", "jr", "kb-k", "kb-t0"),
      tambah("lebih", bulat("ki", di(23), GB.y, 5, WK.biruMuda, W.biru, { z: 2 })),
      tambah("kiri", emo("jl", di(23), 76, E.jariKiri, 20)),
      tambah("kecil.", ...kartu("kk", 50, 166, 200, 20, W.langit, ["lebih ke kiri = lebih kecil"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Number Line: terapan ------------------------------ */
const SUARA_T1 = "Dika menaruh dua puluh tujuh dan tiga puluh satu pada garis bilangan.";
const SUARA_T2 = "Tiga puluh satu berada lebih ke kanan, jadi tiga puluh satu lebih besar.";
const SUARA_T3 = "Cocok kalau kedua bilangan berdekatan, karena jaraknya mudah dilihat.";
const SUARA_T4 = "Kurang cocok kalau bilangannya jauh sekali, karena garisnya jadi panjang.";

const GB2 = { x: 24, y: 104, w: 252 };
const di2 = (n: number): number => xBil(GB2.x, GB2.w, 20, 40, n);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line: kapan dipakai",
  sumber: "Metode global: terapan Number Line",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Garis bilangan"), lantai("lt", 150), kepala(0), garisBilangan("gb", GB2.x, GB2.y, GB2.w, 20, 40, 5)),
      tambah("Dika", ...tokoh("dk", 28, 172, "dika")),
      tambah("dua", ...titikBil("p27", di2(27), GB2.y, "27", W.biru)),
      tambah("tiga", ...titikBil("p31", di2(31), GB2.y, "31", W.hijau)),
    ),
    k(
      SUARA_T2,
      sorotkan("Tiga", "p31"),
      tambah("kanan,", panah("pk", di2(27), 140, di2(31), 140, W.merah)),
      tambah("besar.", ...kartu("bs", 70, 150, 160, 22, W.hijauMuda, ["31 lebih besar dari 27"], 8.6)),
    ),
    k(
      SUARA_T3,
      hapus("Cocok", "pk", "bs-k", "bs-t0"),
      tambah("Cocok", emo("ok", 272, 150, E.benar, 20)),
      tambah("berdekatan,", ...kartu("dk2", 50, 150, 200, 22, W.hijauMuda, ["cocok: bilangan berdekatan"], 8.6)),
      tambah("dilihat.", emo("kc", di2(29), 76, E.kaca, 20)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "kc", "dk2-k", "dk2-t0", "p27", "p27-n", "p31", "p31-n", ...idGarisBilangan("gb", 20, 40, 5)),
      tambah("Kurang", emo("sl", 272, 150, E.salah, 20)),
      tambah("jauh", gs("gl", 10, 104, 290, 104, W.biru, 2.4), ...titikBil("q5", 14, 104, "5", W.biru), ...titikBil("q50", 286, 104, "50", W.merah)),
      tambah("sekali,", teks("tt", 150, 100, "......", 14, W.abu)),
      tambah("panjang.", ...kartu("pj", 50, 150, 200, 22, W.merahMuda, ["kurang cocok: garis terlalu panjang"], 8.4)),
    ),
  ],
};
