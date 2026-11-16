import type { AdeganStory } from "./logika-story";
import { W, deret, emo, judul, kartu, kotak, kalimat, tabel, teks } from "./k3b2B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b2B-bantu";

/* ------------------------------ 1. Dua anak dan permen ------------------------------ */
const SUARA_A1 = "Kira dan Halim masing-masing punya beberapa permen.";
const SUARA_A2 = "Permen Kira sudah kita ketahui, yaitu tiga. Permen Halim belum kita ketahui.";
const SUARA_A3 = "Selisih permen mereka juga sudah diketahui, yaitu satu.";
const SUARA_A4 = "Dapatkah kita mencari banyak permen Halim yang belum diketahui itu?";

export const ADEGAN_DUA_ANAK: AdeganStory = {
  id: "dua-anak",
  judul: "Dua anak dan permen",
  sumber: "Materi: dua anak dan permen",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Dua anak dan permen")),
      tambah("Kira", emo("ek", 75, 54, "\u{1F467}", 30), teks("nk", 75, 68, "Kira", 9.6)),
      tambah("Halim", emo("eh", 225, 54, "\u{1F466}", 30), teks("nh", 225, 68, "Halim", 9.6)),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "tiga"), ...deret("pk", 3, 46, 80, "#F87171", { r: 7, jarak: 17 }), teks("tk", 75, 124, "3", 20, W.merah)),
      tambah(idx(SUARA_A2, "Halim"), kotak("bh", 170, 80, 110, 22, W.krem, W.biru, { rx: 6, putus: true }), teks("th", 225, 97, "?", 16, W.merah)),
    ),
    k(SUARA_A3, tambah("Selisih", ...kartu("sl", 70, 138, 160, 30, W.emas, ["selisih permen: 1"], 11)), sorotkan("satu.", "sl-k")),
    k(SUARA_A4, redamkan(0, "sl-k"), sorotkan("Halim", "bh"), tambah("Dapatkah", emo("tn", 150, 192, "❓", 26))),
  ],
};

/* ------------------------------ 2. Tabel permen ------------------------------ */
const TB = tabel("tp", ["Kira", "Halim", "Selisih"], [["3", "?", "1"], ["?", "6", "3"]], { y: 32 });
const SUARA_B1 = "Kita buat tabel. Isinya permen Kira, permen Halim, dan selisihnya.";
const SUARA_B2 = "Baris pertama: permen Kira tiga, permen Halim belum diketahui, selisihnya satu.";
const SUARA_B3 = "Baris kedua: permen Kira belum diketahui, permen Halim enam, selisihnya tiga.";
const SUARA_B4 = "Tiap baris bisa kita tulis sebagai bentuk pengurangan.";
const SUARA_B5 = "Tiga kurang titik-titik sama dengan satu. Titik-titik kurang enam sama dengan tiga.";

export const ADEGAN_TABEL_PERMEN: AdeganStory = {
  id: "tabel-permen",
  judul: "Tabel permen",
  sumber: "Materi: tabel permen",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Tabel permen")), tambah(idx(SUARA_B1, "Kira"), ...TB.kepala.slice(0, 2)), tambah(idx(SUARA_B1, "Halim"), ...TB.kepala.slice(2, 4)), tambah("selisihnya.", ...TB.kepala.slice(4, 6))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "tiga"), ...TB.sel(0, 0)), tambah("belum", ...TB.sel(0, 1)), tambah(idx(SUARA_B2, "satu."), ...TB.sel(0, 2))),
    k(SUARA_B3, tambah("belum", ...TB.sel(1, 0)), tambah("enam,", ...TB.sel(1, 1)), tambah(idx(SUARA_B3, "tiga."), ...TB.sel(1, 2))),
    k(SUARA_B4, tambah("pengurangan.", kalimat("k1", 140, "3 − … = 1", 20), kalimat("k2", 172, "… − 6 = 3", 20))),
    k(SUARA_B5, sorotkan("Tiga", "k1"), redamkan("Titik-titik", "k1"), sorotkan("Titik-titik", "k2")),
  ],
};

/* ------------------------------ 3. Kalimat Matematika ------------------------------ */
const SUARA_C1 = "Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika.";
const SUARA_C2 = "Titik-titik itu menunjukkan bilangan yang belum diketahui.";
const SUARA_C3 = "Tugas kita adalah mencari bilangan yang cocok untuk titik-titik itu.";
const SUARA_C4 = "Ada dua cara mencari. Satu untuk titik-titik di tengah, satu lagi untuk titik-titik di depan.";

export const ADEGAN_KALIMAT_MTK: AdeganStory = {
  id: "kalimat-mtk",
  judul: "Kalimat Matematika",
  sumber: "Materi: kalimat Matematika",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Kalimat Matematika")), tambah("pengurangan", kalimat("km", 90, "3 − … = 1", 34)), tambah("kalimat", ...kartu("kn", 50, 140, 200, 30, W.emas, ["kalimat Matematika"], 12))),
    k(SUARA_C2, hapus(0, "kn-k", "kn-t0"), sorotkan("Titik-titik", "km"), tambah("belum", ...kartu("bd", 50, 140, 200, 30, W.pink, ["bilangan belum diketahui"], 11))),
    k(SUARA_C3, redamkan(0, "km"), hapus(0, "bd-k", "bd-t0"), tambah("mencari", emo("lp", 150, 160, "\u{1F50D}", 40))),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Dua cara mencari")),
      tambah("tengah,", kalimat("k1", 76, "3 − … = 1", 24), ...kartu("t1", 40, 90, 220, 26, W.hijauMuda, ["titik-titik di tengah"], 10)),
      tambah("depan.", kalimat("k2", 150, "… − 6 = 3", 24), ...kartu("t2", 40, 164, 220, 26, W.langit, ["titik-titik di depan"], 10), emo("h1", 22, 100, "👉", 22), emo("h2", 22, 182, "👉", 22)),
    ),
  ],
};
