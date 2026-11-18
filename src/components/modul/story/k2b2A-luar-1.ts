import type { AdeganStory } from "./logika-story";
import { E, W, WK, emo, judul, kardus, kartu, kotakPensil, lantai, panah, pensil, pindahPensil, teks, tokoh, xPetak } from "./k2b2A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2A-bantu";

/*
 * Cerita orisinal IGIL "Kiriman dari Gudang" (Kelas 2 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b2a.md. Bagian ini: pembuka (tiga lembar cara dari Pak Ujang), Make a Ten (Membuat Sepuluh), dan terapannya.
 */

export const NAMA_METODE = ["Make a Ten", "Doubles Plus One", "Round and Adjust"] as const;
export const NAMA_METODE_ID = ["Membuat Sepuluh", "Kembar Tambah Satu", "Bulatkan Lalu Sesuaikan"] as const;

const X0 = 30;
const Y0 = 66;
const CY = 84;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Saat membongkar kardus terakhir, Nia menemukan tiga lembar cara yang diselipkan Pak Ujang.";
const SUARA_O2 = "Pak Ujang tertawa. Itu cara menjumlahkan cepat yang dipakai para penjaga toko di kota!";
const SUARA_O3 = "Tiga cara itu: Make a Ten, Doubles Plus One, dan Round and Adjust.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Membuat Sepuluh, Kembar Tambah Satu, dan Bulatkan Lalu Sesuaikan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar cara dari Pak Ujang",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga Lembar Cara"), lantai("lt", 168), ...kardus("kd", 90, 100, 120, 56)),
      tambah("Nia", ...tokoh("ni", 40, 178, "Nia")),
      ubah("menemukan", { id: "ni", isi: E.kaget }),
      tambah("tiga", teks("n3", 150, 86, "3 lembar cara", 11, W.ungu)),
      tambah("lembar", ...[0, 1, 2].flatMap((i) => kartu(`lb${i}`, 30 + i * 90, 34, 60, 34, W.krem, ["cara"], 9))),
      sorotkan("diselipkan", "lb0-k", "lb1-k", "lb2-k"),
      tambah("Pak", ...tokoh("pu", 262, 178, "Pak Ujang")),
    ),
    k(
      SUARA_O2,
      ubah("tertawa.", { id: "pu", isi: E.tertawa }, { id: "ni", isi: E.nia }),
      ubah("cara", { id: "lb0-k", sorot: false }, { id: "lb1-k", sorot: false }, { id: "lb2-k", sorot: false }),
      tambah("cepat", emo("cp", 232, 120, E.petir, 26)),
      tambah("penjaga", ...tokoh("bs", 150, 178, "Bu Sari")),
      tambah("toko", emo("tk", 40, 126, "\u{1F3EA}", 26)),
      tambah("kota!", emo("kt", 262, 76, "\u{1F306}", 26)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Menjumlahkan")),
      tambah("Make", teks("m0", 78, 62, "1. Make a Ten", 13, W.biru)),
      tambah("Doubles", teks("m1", 78, 98, "2. Doubles Plus One", 13, W.biru)),
      tambah("Round", teks("m2", 78, 134, "3. Round and Adjust", 13, W.biru)),
    ),
    k(
      SUARA_O4,
      tambah("Membuat", teks("n0", 228, 62, "Membuat Sepuluh", 10, W.ungu)),
      tambah("Sepuluh,", teks("s10", 288, 62, "10", 11, W.merah)),
      tambah("Kembar", teks("n1", 228, 98, "Kembar Tambah Satu", 10, W.ungu)),
      tambah("Satu,", teks("s1", 290, 98, "+1", 11, W.merah)),
      tambah("Bulatkan", teks("n2", 228, 134, "Bulatkan Lalu Sesuaikan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Make a Ten: konsep ------------------------------ */
const SUARA_S1 = "Cara pertama, Make a Ten, atau Membuat Sepuluh.";
const SUARA_S2 = "Ambil sedikit dari bilangan kecil untuk melengkapi bilangan besar menjadi sepuluh.";
const SUARA_S3 = "Sepuluh itu bilangan yang mudah, jadi sisanya tinggal ditambahkan.";
const SUARA_S4 = "Cara ini enak dipakai kalau salah satu bilangannya hampir sepuluh.";

const hijauP = Array.from({ length: 8 }, (_, i) => i);

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Make a Ten: Membuat Sepuluh",
  sumber: "Metode global: Make a Ten (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 1: Make a Ten"), lantai("lt", 168)),
      tambah("Make", ...kotakPensil("kp", X0, Y0)),
      tambah("Ten,", teks("t10", 150, 50, "10", 20, W.merah)),
      tambah("Membuat", teks("ms", 150, 130, "Membuat Sepuluh", 12, W.ungu)),
    ),
    k(
      SUARA_S2,
      hapus(0, "ms"),
      tambah("Ambil", teks("am", 120, 148, "ambil dari bilangan kecil", 9, W.coklat)),
      tambah("bilangan", ...hijauP.flatMap((i) => pensil(`g${i}`, xPetak(X0, i), CY, WK.hijau))),
      tambah("kecil", ...[0, 1, 2, 3].flatMap((i) => pensil(`b${i}`, 212 + i * 12, 136, WK.biru))),
      ubah("melengkapi", ...pindahPensil("b0", xPetak(X0, 8), CY), ...pindahPensil("b1", xPetak(X0, 9), CY)),
      sorotkan("besar", ...hijauP.map((i) => `g${i}`)),
      sorotkan("sepuluh.", "kp", "t10"),
    ),
    k(
      SUARA_S3,
      hapus(0, "am"),
      ubah(0, ...hijauP.map((i) => ({ id: `g${i}`, sorot: false })), { id: "t10", sorot: false, warna: "#15803D" }),
      tambah("mudah,", emo("sn", 56, 140, E.senyum, 26)),
      sorotkan("sisanya", "b2", "b3", "b2-x", "b3-x"),
      tambah("ditambahkan.", teks("js", 130, 160, "10 + sisa", 12, W.merah)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Cocok untuk Bilangan Hampir 10"), lantai("lt", 168)),
      tambah("enak", emo("sn", 258, 140, E.senyum, 26)),
      tambah("salah", ...kartu("c9", 70, 80, 50, 40, W.hijauMuda, ["9"], 20)),
      tambah("satu", teks("sb", 150, 56, "1 bilangan hampir 10", 12, W.ungu)),
      tambah("bilangannya", ...kartu("c4", 180, 80, 50, 40, W.langit, ["4"], 20)),
      tambah("hampir", panah("pn", 95, 124, 95, 142, W.merah)),
      tambah("sepuluh.", teks("h10", 95, 160, "10", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ Make a Ten: terapan ------------------------------ */
const SUARA_T1 = "Chacha menjumlahkan delapan pensil dan lima pensil. Delapan butuh dua lagi supaya menjadi sepuluh.";
const SUARA_T2 = "Ambil dua dari lima, sehingga tinggal tiga. Sepuluh ditambah tiga sama dengan tiga belas.";
const SUARA_T3 = "Cocok kalau salah satu bilangan hampir sepuluh, seperti delapan atau sembilan.";
const SUARA_T4 = "Kurang cocok kalau kedua bilangan masih jauh dari sepuluh, seperti dua ditambah tiga.";

const ax = (i: number): number => 40 + i * 12;
const bx = (i: number): number => 190 + i * 12;

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Make a Ten: delapan tambah lima",
  sumber: "Metode global: Make a Ten (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Delapan Pensil dan Lima Pensil"), lantai("lt", 168), ...tokoh("ch", 30, 178, "Chacha")),
      tambah("delapan", ...Array.from({ length: 8 }, (_, i) => pensil(`a${i}`, ax(i), 80, WK.hijau)), teks("la", 82, 112, "8", 14, "#15803D")),
      tambah("lima", ...Array.from({ length: 5 }, (_, i) => pensil(`b${i}`, bx(i), 80, WK.biru)), teks("lb", 214, 112, "5", 14, W.biru)),
      sorotkan(idx(SUARA_T1, "delapan", 2), ...Array.from({ length: 8 }, (_, i) => `a${i}`)),
      tambah("dua", teks("bt", 82, 132, "butuh 2 lagi", 11, W.merah)),
      tambah("sepuluh.", teks("jd", 82, 152, "jadi 10", 11, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "bt", "jd"),
      ubah("dua", ...pindahPensil("b0", ax(8), 80), ...pindahPensil("b1", ax(9), 80)),
      ubah("tiga.", { id: "lb", isi: "3" }),
      ubah(idx(SUARA_T2, "Sepuluh"), { id: "la", isi: "10", warna: "#15803D" }),
      tambah(idx(SUARA_T2, "Sepuluh"), teks("e1", 96, 142, "10", 16, W.biru)),
      tambah(idx(SUARA_T2, "ditambah"), teks("e2", 118, 142, "+", 16, W.merah)),
      tambah(9, teks("e3", 138, 142, "3", 16, W.biru)),
      tambah(idx(SUARA_T2, "sama"), teks("e4", 158, 142, "=", 16, W.merah)),
      tambah(12, teks("e5", 184, 142, "13", 16, "#15803D")),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cocok"), lantai("lt", 168), emo("ok", 150, 70, E.benar, 30)),
      tambah("salah", teks("sb", 150, 100, "1 bilangan", 11, W.ungu)),
      tambah("hampir", teks("hs", 150, 160, "hampir 10", 14, W.merah)),
      tambah("delapan", ...kartu("c8", 80, 108, 44, 34, W.hijauMuda, ["8"], 20)),
      tambah("sembilan.", ...kartu("c9", 176, 108, 44, 34, W.langit, ["9"], 20)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kurang Cocok"), lantai("lt", 168), emo("xs", 150, 70, E.salah, 30)),
      tambah("kedua", teks("kd", 150, 100, "kedua bilangan kecil", 11, W.ungu)),
      tambah("jauh", teks("jh", 150, 160, "jauh dari 10", 14, W.merah)),
      tambah(10, ...kartu("c2", 80, 108, 44, 34, W.hijauMuda, ["2"], 20)),
      tambah("tiga.", ...kartu("c3", 176, 108, 44, 34, W.langit, ["3"], 20)),
    ),
  ],
};
