import type { AdeganStory } from "./logika-story";
import { W, anak, bagianEq, deretBintang, emo, judul, kartu } from "./k3b2A-gambar";
import { hapus, idPilihan, idx, k, pilihKata, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/* ------------------------------ Latihan 1: memilih kalimat dari cerita ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira punya sejumlah bintang. Ia mendapat dua puluh bintang lagi, jadi semuanya lima puluh lima.";
const SUARA_L2 = "Kalimat Matematika yang cocok yang mana? Ketuk jawabanmu.";
const SUARA_L3 = "Betul! Titik-titik tambah dua puluh sama dengan lima puluh lima.";
const SUARA_L4 = "Titik-titik itu bisa dicari dengan lima puluh lima dikurangi dua puluh.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: memilih kalimat",
  sumber: "Materi: Latihan satu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_L1, "Kira"), ...anak("kira", 40, 70)),
      tambah(idx(SUARA_L1, "mendapat"), ...deretBintang("bn", 4, 110, 70, 18, 4, 15), ...kartu("dp", 100, 90, 88, 22, W.emas, ["dapat 20 lagi"], 9.4)),
      tambah(idx(SUARA_L1, "semuanya"), ...kartu("jm", 202, 70, 88, 38, W.hijauMuda, ["jumlah", "55"], 10)),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Kalimat"), ...pilihKata(132, ["20 + 55 = …", "… + 20 = 55", "… + 20 = 75"], 11))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k"), tambah(idx(SUARA_L3, "Titik-titik"), emo("ok", 150, 190, "✅", 24))),
    k(SUARA_L4, hapus(0, "ok", ...idPilihan(3)), tambah(idx(SUARA_L4, "dikurangi"), ...kartu("ky", 50, 130, 200, 32, W.emas, ["55 − 20 = 35"], 14))),
  ],
};

/* ------------------------------ Latihan 2: titik di belakang ------------------------------ */
const SUARA_M1 = "Latihan dua. Isi titik-titik pada kalimat ini: dua belas tambah titik-titik sama dengan empat puluh.";
const SUARA_M2 = "Kurangi dulu jumlahnya dengan bilangan yang diketahui. Pilih bilangan yang tepat.";
const SUARA_M3 = "Betul! Empat puluh dikurangi dua belas sama dengan dua puluh delapan.";
const SUARA_M4 = "Periksa: dua belas tambah dua puluh delapan sama dengan empat puluh.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: mengisi titik-titik",
  sumber: "Materi: Latihan dua",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_M1, "dua"), bagianEq("eq", 0, "12", 60)),
      tambah(idx(SUARA_M1, "tambah"), bagianEq("eq", 1, "+", 60, 24, W.emas)),
      tambah(idx(SUARA_M1, "titik-titik", 2), bagianEq("eq", 2, "…", 60, 24, W.merahMuda)),
      tambah(idx(SUARA_M1, "sama"), bagianEq("eq", 3, "=", 60, 24, W.emas)),
      tambah(idx(SUARA_M1, "empat"), bagianEq("eq", 4, "40", 60)),
    ),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Kurangi"), ...kartu("ky", 60, 94, 180, 28, W.emas, ["40 − 12 = ?"], 14)), tambah(idx(SUARA_M2, "Pilih"), ...pilihKata(138, ["52", "38", "28"], 16))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c3-k"), ubah(idx(SUARA_M3, "dua", 2), { id: "ky-t0", isi: "40 − 12 = 28" })),
    k(SUARA_M4, hapus(0, ...idPilihan(3)), ubah(0, { id: "eq2-t", isi: "28" }), sorotkan(idx(SUARA_M4, "Periksa:"), "eq2-k"), tambah(idx(SUARA_M4, "tambah"), ...kartu("pk", 50, 148, 200, 30, W.hijauMuda, ["12 + 28 = 40"], 14))),
  ],
};

/* ------------------------------ Latihan 3: titik di depan ------------------------------ */
const SUARA_N1 = "Latihan tiga. Titik-titik tambah dua puluh lima sama dengan tujuh puluh.";
const SUARA_N2 = "Titik-titiknya ada di depan. Kurangi jumlahnya, lalu pilih jawabannya.";
const SUARA_N3 = "Betul! Tujuh puluh dikurangi dua puluh lima sama dengan empat puluh lima.";
const SUARA_N4 = "Periksa: empat puluh lima tambah dua puluh lima sama dengan tujuh puluh.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: titik-titik di depan",
  sumber: "Materi: Latihan tiga",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_N1, "Titik-titik"), bagianEq("eq", 0, "…", 60, 24, W.merahMuda)),
      tambah(idx(SUARA_N1, "tambah"), bagianEq("eq", 1, "+", 60, 24, W.emas)),
      tambah(idx(SUARA_N1, "dua"), bagianEq("eq", 2, "25", 60)),
      tambah(idx(SUARA_N1, "sama"), bagianEq("eq", 3, "=", 60, 24, W.emas)),
      tambah(idx(SUARA_N1, "tujuh"), bagianEq("eq", 4, "70", 60)),
    ),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Kurangi"), ...kartu("ky", 60, 94, 180, 28, W.emas, ["70 − 25 = ?"], 14)), tambah(idx(SUARA_N2, "pilih"), ...pilihKata(138, ["45", "95", "55"], 16))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Betul!"), "c1-k"), ubah(idx(SUARA_N3, "empat"), { id: "ky-t0", isi: "70 − 25 = 45" })),
    k(SUARA_N4, hapus(0, ...idPilihan(3)), ubah(0, { id: "eq0-t", isi: "45" }), sorotkan(idx(SUARA_N4, "Periksa:"), "eq0-k"), tambah(idx(SUARA_N4, "tambah"), ...kartu("pk", 50, 148, 200, 30, W.hijauMuda, ["45 + 25 = 70"], 14))),
  ],
};

