import type { AdeganStory, Obj } from "./logika-story";
import { EMO_PERMEN, W, bendaDi, emo, garisBil, jumlahG, judul, kartu, kartuAngka, kotak, namaG, penanda, pusatBenda, teks, xBil, type GeoG, type Titik } from "./k2b1C-gambar";
import { bersih, hapus, hitungAksi, idx, ids, k, loncatAksi, pindahKe, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";

/* ------------------------------ Letak permen ------------------------------ */
/** Stoples Kira berisi dua puluh enam permen: tujuh kolom, empat baris (baris terakhir lima). */
export const BANYAK_PERMEN = 26;
export const titikToples = (i: number): Titik => ({ x: 92 + 22 * (i % 7), y: 84 + 26 * Math.floor(i / 7) });
/** Permen ditata sepuluh-sepuluh: baris ke-r dari atas. */
export const titikBarisSepuluh = (i: number): Titik => ({ x: 26 + 25 * (i % 10), y: 64 + 40 * Math.floor(i / 10) });
const ptsToples = Array.from({ length: BANYAK_PERMEN }, (_, i) => titikToples(i));
const ptsRapi = Array.from({ length: BANYAK_PERMEN }, (_, i) => titikBarisSepuluh(i));
const stoples = (): Obj[] => [kotak("jr", 76, 50, 168, 118, W.langit, W.biru, { rx: 10, tebal: 2 }), kotak("jt", 100, 42, 120, 10, W.emas, W.biru, { rx: 3 })];
const permen = (): Obj[] => bendaDi("a", EMO_PERMEN, ptsToples);

/* ------------------------------ 1. Stoples permen Kira ------------------------------ */
const SUARA_P1 = "Hari ini Kira berulang tahun. Kira punya satu stoples berisi permen.";
const SUARA_P2 = "Dapatkah kalian menebak, berapa banyak permen di dalam stoples itu?";
const SUARA_P3 = "Malosi menebak, jumlahnya dua puluh permen.";
const SUARA_P4 = "Halim menebak, jumlahnya tiga puluh permen.";
const SUARA_P5 = "Menebak boleh saja. Tetapi kita harus membuktikannya dengan menghitung.";

export const ADEGAN_STOPLES: AdeganStory = {
  id: "stoples-kira",
  judul: "Stoples permen Kira",
  sumber: "Materi: menebak banyak permen",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Ulang tahun Kira"), emo("kue", 262, 30, "\u{1F382}", 22)), tambah(idx(SUARA_P1, "stoples"), ...stoples()), tambah(idx(SUARA_P1, "permen"), ...permen())),
    k(SUARA_P2, tambah("menebak,", emo("pk1", 38, 150, "\u{1F914}", 30)), tambah("berapa", emo("pk2", 262, 150, "❓", 30))),
    k(SUARA_P3, tambah("dua", ...kartu("gm", 4, 60, 66, 50, W.hijauMuda, ["Malosi", "20"], 10))),
    k(SUARA_P4, tambah("tiga", ...kartu("gh", 234, 60, 62, 50, W.pink, ["Halim", "30"], 10))),
    k(SUARA_P5, tambah("Menebak", ...kartu("tb", 60, 174, 180, 24, W.krem, ["tebak, lalu hitung"], 10)), sorotkan("membuktikannya", "tb-k")),
  ],
};

/* ------------------------------ 2. Menghitung permen sepuluh-sepuluh ------------------------------ */
const SUARA_H1 = "Ayo kita buktikan dengan menghitung permen di dalam stoples.";
const SUARA_H2 = "Pertama, kita kelompokkan setiap sepuluh permen menjadi satu kelompok.";
const SUARA_H3 = "Kelompok pertama berisi sepuluh. Kelompok kedua juga berisi sepuluh, jadi sekarang kita punya dua puluh.";
const SUARA_H4 = "Sisanya kita tata di baris ketiga. Isinya belum sampai sepuluh, jadi tidak kita bingkai.";
const SUARA_H5 = "Sekarang hitung sisanya satu per satu: dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima, dua puluh enam.";
const SUARA_H6 = "Ternyata ada dua puluh enam permen di dalam stoples.";
const SUARA_H7 = "Tebakan Malosi dua puluh dan tebakan Halim tiga puluh belum tepat. Hasil hitungannya dua puluh enam.";

const bingkaiBaris = (r: number): Obj[] => [kotak(`pf${r}-k`, 10, 42 + 40 * r, 252, 30, "#FEF3C7", W.merah, { rx: 6, tebal: 1.4, putus: true, z: -1 })];
const sepuluhBaris = (r: number, isi: string): Obj => teks(`pf${r}-ln`, 282, 58 + 40 * r, isi, 11, W.merah);

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung-permen",
  judul: "Menghitung permen sepuluh-sepuluh",
  sumber: "Materi: menghitung dengan kelompok sepuluh",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hitung permen")), tambah(idx(SUARA_H1, "stoples"), ...stoples(), ...permen())),
    k(
      SUARA_H2,
      hapus(idx(SUARA_H2, "kelompokkan"), "jr", "jt"),
      pindahKe(idx(SUARA_H2, "kelompokkan"), "a", ptsRapi.slice(0, 10), 0),
      tambah(idx(SUARA_H2, "kelompokkan"), ...bingkaiBaris(0)),
      tambah(idx(SUARA_H2, "sepuluh"), sepuluhBaris(0, "10")),
    ),
    k(SUARA_H3, pindahKe(idx(SUARA_H3, "kedua"), "a", ptsRapi.slice(10, 20), 10), tambah(idx(SUARA_H3, "kedua"), ...bingkaiBaris(1)), tambah(idx(SUARA_H3, "dua"), sepuluhBaris(1, "20"))),
    k(SUARA_H4, pindahKe(idx(SUARA_H4, "Sisanya"), "a", ptsRapi.slice(20), 20), sorotkan(idx(SUARA_H4, "bingkai"), ...ids("ea", 20, 25))),
    k(SUARA_H5, redamkan(0, ...ids("ea", 20, 25)), ...hitungAksi(SUARA_H5, "ea", pusatBenda(ptsRapi), { dari: 21, awal: 20 })),
    k(SUARA_H6, tambah("Ternyata", namaG("a", 96, 194, "Permen")), tambah("permen", jumlahG("a", 160, 194, "26"))),
    k(SUARA_H7, tambah("Tebakan", ...kartu("hm", 14, 158, 132, 22, W.hijauMuda, ["tebakan Malosi: 20"], 9.4)), tambah("Halim", ...kartu("hh", 154, 158, 132, 22, W.pink, ["tebakan Halim: 30"], 9.4)), sorotkan("hitungannya", "ea-ln")),
  ],
};

/* ------------------------------ 3. Tebakan siapa yang lebih dekat ------------------------------ */
export const G_MALOSI: GeoG = { x0: 18, y: 80, dx: 26, dari: 20, sampai: 30 };
export const G_HALIM: GeoG = { x0: 18, y: 160, dx: 26, dari: 20, sampai: 30 };
const SUARA_D1 = "Sekarang kita periksa, tebakan siapa yang lebih dekat. Kita pakai jalur bilangan.";
const SUARA_D2 = "Hasil hitungan kita adalah dua puluh enam. Kita tandai di kedua jalur.";
const SUARA_D3 = "Tebakan Malosi dua puluh. Kita mulai dari sini.";
const SUARA_D4 = "Kita loncat ke kanan: satu, dua, tiga, empat, lima, enam.";
const SUARA_D5 = "Dari dua puluh maju ke dua puluh enam ada enam langkah.";
const SUARA_D6 = "Sekarang tebakan Halim tiga puluh. Kita mulai dari sini.";
const SUARA_D7 = "Kita loncat ke kiri: satu, dua, tiga, empat.";
const SUARA_D8 = "Dari tiga puluh mundur ke dua puluh enam ada empat langkah.";
const SUARA_D9 = "Empat langkah lebih sedikit daripada enam langkah. Jadi tebakan Halim lebih dekat.";
const hopM = (n: number): string[] => Array.from({ length: n }, (_, i) => [`gbm-h${i}`, `gbm-hn${i}`]).flat();
const hopH = (n: number): string[] => Array.from({ length: n }, (_, i) => [`gbh-h${i}`, `gbh-hn${i}`]).flat();

export const ADEGAN_TEBAKAN_DEKAT: AdeganStory = {
  id: "tebakan-dekat",
  judul: "Tebakan siapa yang lebih dekat?",
  sumber: "Materi: jarak tebakan di jalur bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Siapa lebih dekat?")), tambah(idx(SUARA_D1, "jalur"), ...garisBil("m", G_MALOSI), ...garisBil("h", G_HALIM))),
    k(SUARA_D2, tambah("dua", penanda("m", G_MALOSI, 26), penanda("h", G_HALIM, 26))),
    k(SUARA_D3, tambah("Malosi", penanda("m", G_MALOSI, 20, W.hijau), teks("cm", 18, 44, "Malosi", 9.4, W.biru, { anchor: "start" }))),
    k(SUARA_D4, ...loncatAksi(SUARA_D4, "m", G_MALOSI, 20, 1, 6)),
    k(SUARA_D5, sorotkan("langkah", ...hopM(6)), tambah("enam@2", teks("lm", 100, 44, "6 langkah", 10, W.merah))),
    k(SUARA_D6, tambah("Halim", penanda("h", G_HALIM, 30, W.ungu), teks("ch", 282, 124, "Halim", 9.4, W.biru, { anchor: "end" })), redamkan(0, ...hopM(6))),
    k(SUARA_D7, ...loncatAksi(SUARA_D7, "h", G_HALIM, 30, -1, 4)),
    k(SUARA_D8, sorotkan("langkah", ...hopH(4)), tambah("empat", teks("lh", 220, 124, "4 langkah", 10, W.merah))),
    k(SUARA_D9, redamkan(0, ...hopH(4)), tambah("Jadi", emo("ok", 150, 124, "✅", 22)), sorotkan("Jadi", "lh")),
  ],
};
export const POSISI_BIL = (g: GeoG, n: number): number => xBil(g, n);

/* ------------------------------ 4. Tebakan lebih kecil, lebih besar, atau sama ------------------------------ */
const SUARA_B1 = "Tebakan boleh lebih kecil, lebih besar, atau tepat sama. Kita bandingkan dengan hasil hitungan.";
const SUARA_B2 = "Dua puluh lebih kecil daripada dua puluh enam. Jadi tebakan Malosi terlalu kecil.";
const SUARA_B3 = "Tiga puluh lebih besar daripada dua puluh enam. Jadi tebakan Halim terlalu besar.";
const SUARA_B4 = "Kalau tebakannya persis sama, kita bilang sama. Dua puluh enam sama dengan dua puluh enam.";
const SUARA_B5 = "Menebak melatih kita memperkirakan banyak benda. Menghitung memastikan jawabannya.";
const ex = (isi: string, id = "ex", x = 150, y = 160, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

export const ADEGAN_TEBAK_BANDING: AdeganStory = {
  id: "tebak-bandingkan",
  judul: "Tebakan dan hitungan dibandingkan",
  sumber: "Materi: membandingkan tebakan dan hitungan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tebakan dan hitungan")),
      tambah(idx(SUARA_B1, "bandingkan"), ...kartuAngka("gm", 20, 52, "20", W.hijauMuda, 70, 50, 26), ...kartuAngka("hc", 115, 52, "26", W.krem, 70, 50, 26), ...kartuAngka("gh", 210, 52, "30", W.pink, 70, 50, 26), teks("nm1", 55, 122, "Malosi", 9.4), teks("nm2", 150, 122, "hitungan", 9.4), teks("nm3", 245, 122, "Halim", 9.4)),
    ),
    k(SUARA_B2, sorotkan("Dua", "gm-k", "gm-t", "hc-k", "hc-t"), tambah("kecil", ex("20 < 26"))),
    k(SUARA_B3, redamkan(0, "gm-k", "gm-t"), sorotkan("Tiga", "gh-k", "gh-t"), ubah("besar", { id: "ex", isi: "30 > 26" })),
    k(SUARA_B4, redamkan(0, "gh-k", "gh-t"), ubah("persis", { id: "ex", isi: "26 = 26" })),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Tebak, lalu hitung")),
      tambah("Menebak", ...kartu("tt", 20, 56, 120, 70, W.hijauMuda, ["menebak"], 12), emo("te", 80, 112, "\u{1F914}", 26)),
      tambah("Menghitung", ...kartu("th", 160, 56, 120, 70, W.krem, ["menghitung"], 12), emo("tf", 220, 112, "✅", 26)),
    ),
  ],
};
