import type { AdeganStory } from "./logika-story";
import { MAINAN, SAYUR, W, diagram, emo, judul, kartu, tabel, teks, turus } from "./k1b8B-gambar";
import { bersih, hitungAksi, idx, k, redamkan, sorotkan, tambah } from "./k1b8B-bantu";

/* ------------------------------ 6. Diagram gambar mendatar ------------------------------ */
export const DD = diagram("sd", "datar", SAYUR, "Sayur Kesukaan", "anak");
const SUARA_M1 = "Ini bentuk lain diagram gambar. Gambarnya berjajar ke samping, jadi disebut diagram mendatar.";
const SUARA_M2 = "Barisnya jagung, wortel, brokoli, dan kol. Datanya sama dengan diagram tegak.";
const SUARA_M3 = "Jagung tiga gambar, wortel empat gambar, brokoli tiga gambar, dan kol dua gambar.";
const SUARA_M4 = "Angka di bawah menunjukkan banyaknya gambar pada tiap baris.";
const SUARA_M5 = "Baris wortel paling panjang, jadi wortel paling banyak disukai.";
const SUARA_M6 = "Tegak atau mendatar, datanya sama. Kita boleh memilih salah satu.";

export const ADEGAN_MENDATAR: AdeganStory = {
  id: "diagram-mendatar",
  judul: "Diagram gambar mendatar",
  sumber: "Materi: diagram gambar mendatar",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_M1, tambah(0, ...DD.dasar)),
    k(SUARA_M2, tambah("jagung,", DD.label(0)), tambah("wortel,", DD.label(1)), tambah("brokoli,", DD.label(2)), tambah("kol.", DD.label(3))),
    k(
      SUARA_M3,
      tambah(idx(SUARA_M3, "tiga", 1), ...DD.gambar(0)),
      tambah("empat", ...DD.gambar(1)),
      tambah(idx(SUARA_M3, "tiga", 2), ...DD.gambar(2)),
      tambah("dua", ...DD.gambar(3)),
    ),
    k(SUARA_M4, sorotkan("angka", ...DD.idSumbu)),
    k(SUARA_M5, redamkan(0, ...DD.idSumbu), sorotkan("Baris", ...DD.idGambar(1))),
    k(SUARA_M6, redamkan(0, ...DD.idGambar(1)), tambah("Tegak", ...kartu("tm", 30, 162, 240, 18, W.emas, ["tegak atau mendatar: data sama"], 9.6))),
  ],
};

/* ------------------------------ 7. Turus ------------------------------ */
export const TR = turus("tu", MAINAN, "Mainan Kesukaan");
const JAWABAN = ["\u{1F3C0}", "\u{1F697}", "\u{1F3C0}", "\u{1F9F8}", "\u{1F3C0}", "\u{1F697}", "\u{1F3C0}", "\u{1F9F8}", "\u{1F697}", "\u{1F3C0}", "\u{1F3C0}", "\u{1F697}", "\u{1F9F8}"];
const strip = JAWABAN.map((e, i) => emo(`jb${i}`, 26 + (i % 7) * 41, i < 7 ? 70 : 108, e, 24));
const SUARA_U1 = "Wei mencatat mainan kesukaan anak-anak. Ada tiga belas jawaban di layar.";
const SUARA_U2 = "Cara mencatatnya adalah turus. Setiap jawaban kita beri satu goresan tegak.";
const SUARA_U3 = "Bola ada enam. Satu, dua, tiga, empat, lima, enam. Goresan kelima miring, menutup empat goresan tadi.";
const SUARA_U4 = "Mobil ada empat. Satu, dua, tiga, empat.";
const SUARA_U5 = "Boneka ada tiga. Satu, dua, tiga.";
const SUARA_U6 = "Lima goresan menjadi satu ikat. Karena itu, turus mudah dihitung.";
const SUARA_U7 = "Jumlah semuanya tiga belas, karena enam, empat, dan tiga.";

export const ADEGAN_TURUS: AdeganStory = {
  id: "turus",
  judul: "Mencatat data dengan turus",
  sumber: "Materi: turus",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Jawaban anak-anak")), tambah("Ada", ...strip), tambah("tiga", ...kartu("jw", 90, 140, 120, 24, W.krem, ["13 jawaban"], 10))),
    k(SUARA_U2, bersih(0), tambah(0, TR.jd), tambah("turus.", TR.label(0), TR.label(1), TR.label(2))),
    k(
      SUARA_U3,
      ...hitungAksi(SUARA_U3, TR.goresan(0), { setelah: "enam." }),
      tambah(idx(SUARA_U3, "enam", 2), TR.angka(0)),
      sorotkan("miring,", "tus0_4"),
    ),
    k(SUARA_U4, redamkan(0, "tus0_4"), ...hitungAksi(SUARA_U4, TR.goresan(1), { setelah: "empat." }), tambah(idx(SUARA_U4, "empat", 2), TR.angka(1))),
    k(SUARA_U5, ...hitungAksi(SUARA_U5, TR.goresan(2), { setelah: "tiga." }), tambah(idx(SUARA_U5, "tiga", 2), TR.angka(2))),
    k(SUARA_U6, sorotkan("ikat.", "tus0_4"), tambah("Lima", ...kartu("ik", 60, 170, 180, 22, W.hijauMuda, ["5 goresan = 1 ikat"], 10))),
    k(SUARA_U7, redamkan(0, "tus0_4"), tambah("tiga", teks("jm", 150, 150, "6 + 4 + 3 = 13", 13, W.coklat))),
  ],
};

/* ------------------------------ 8. Tabel menurun ------------------------------ */
export const TM = tabel("tm", "menurun", MAINAN, "Mainan Kesukaan", "mainan");
const KOLOM_ISI = [0, 1, 2, 3].map((r) => `tmx${r}_1`);
const SUARA_V1 = "Data turus bisa kita pindahkan ke tabel. Ini tabel menurun, nama mainan turun ke bawah.";
const SUARA_V2 = "Mulai dari baris pertama. Bola ada enam.";
const SUARA_V3 = "Baris kedua, mobil ada empat. Baris ketiga, boneka ada tiga.";
const SUARA_V4 = "Tabel punya judul, baris, dan kolom. Baris membentang ke samping. Kolom turun ke bawah.";
const SUARA_V5 = "Jumlah semuanya tiga belas. Hasilnya ada di baris paling bawah.";

export const ADEGAN_TABEL_MENURUN: AdeganStory = {
  id: "tabel-menurun",
  judul: "Tabel menurun",
  sumber: "Materi: tabel menurun",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_V1, tambah(0, ...TM.kepala)),
    k(SUARA_V2, tambah("bola", ...TM.isi(0))),
    k(SUARA_V3, tambah("mobil", ...TM.isi(1)), tambah("boneka", ...TM.isi(2))),
    k(
      SUARA_V4,
      sorotkan("judul,", "tmjd"),
      redamkan("Baris@2", "tmjd"),
      sorotkan("Baris@2", ...TM.selBaris(2)),
      redamkan("Kolom@2", ...TM.selBaris(2)),
      sorotkan("Kolom@2", ...KOLOM_ISI),
    ),
    k(SUARA_V5, redamkan(0, ...KOLOM_ISI), tambah("tiga", ...TM.total)),
  ],
};

/* ------------------------------ 9. Tabel mendatar ------------------------------ */
export const TN = tabel("tn", "mendatar", MAINAN, "Mainan Kesukaan", "mainan");
const SUARA_N1 = "Sekarang ada tabel mendatar. Nama mainan berderet ke samping.";
const SUARA_N2 = "Bola ada enam, mobil ada empat, dan boneka ada tiga.";
const SUARA_N3 = "Tabel menurun dan tabel mendatar memuat data yang sama. Hanya letaknya yang berbeda.";
const SUARA_N4 = "Jumlah semuanya tiga belas, sama seperti tadi.";

export const ADEGAN_TABEL_MENDATAR: AdeganStory = {
  id: "tabel-mendatar",
  judul: "Tabel mendatar",
  sumber: "Materi: tabel mendatar",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_N1, tambah(0, ...TN.kepala)),
    k(SUARA_N2, tambah("Bola", ...TN.isi(0)), tambah("mobil", ...TN.isi(1)), tambah("boneka", ...TN.isi(2))),
    k(SUARA_N3, tambah("Tabel", ...kartu("sm", 30, 160, 240, 28, W.emas, ["data sama, letak berbeda"], 10))),
    k(SUARA_N4, tambah("tiga", ...TN.total)),
  ],
};

/* ------------------------------ 10. Dari tabel ke diagram gambar ------------------------------ */
export const DM = diagram("mt", "tegak", MAINAN, "Mainan Kesukaan", "anak");
const SUARA_P1 = "Sekarang kita ubah tabel menjadi diagram gambar.";
const SUARA_P2 = "Kita pilih diagram tegak. Gambar bola, mobil, dan boneka akan tersusun ke atas.";
const SUARA_P3 = "Bola ada enam. Satu, dua, tiga, empat, lima, enam. Kita susun enam gambar bola.";
const SUARA_P4 = "Mobil ada empat, jadi empat gambar. Boneka ada tiga, jadi tiga gambar.";
const SUARA_P5 = "Diagram gambar sudah selesai. Datanya sama dengan tabel.";

export const ADEGAN_TABEL_KE_DIAGRAM: AdeganStory = {
  id: "tabel-ke-diagram",
  judul: "Dari tabel ke diagram gambar",
  sumber: "Materi: tabel menjadi diagram",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...TN.semua)),
    k(SUARA_P2, bersih(0), tambah(0, ...DM.dasar), tambah("bola,", DM.label(0)), tambah("mobil,", DM.label(1)), tambah("boneka", DM.label(2))),
    k(SUARA_P3, ...hitungAksi(SUARA_P3, DM.gambar(0), { setelah: "enam." }), tambah(idx(SUARA_P3, "enam", 2), DM.angka(0))),
    k(SUARA_P4, tambah("empat,", ...DM.gambar(1), DM.angka(1)), tambah(idx(SUARA_P4, "tiga", 1), ...DM.gambar(2), DM.angka(2))),
    k(SUARA_P5, sorotkan("selesai.", ...DM.idGambar(0), ...DM.idGambar(1), ...DM.idGambar(2)), tambah("tabel.", ...kartu("tt", 150, 30, 140, 24, W.hijauMuda, ["data sama dengan tabel"], 8.8))),
  ],
};
