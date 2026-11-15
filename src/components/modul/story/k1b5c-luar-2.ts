import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, emo, judul, kartu, kotak, pusatSel, teks, titik, titikBingkai } from "./k1b5c-gambar";
import { bersih, hapus, hitungSatu, idx, k, munculBilangan, pindahBilangan, redamkan, rumus, sorotkan, tambah, ubah } from "./k1b5c-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b5c-luar-1";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Sepuluh dan Satuan: titik Malosi ------------------------------ */
export const ID_TITIK17 = Array.from({ length: 17 }, (_, i) => `tt${i}`);
export const titikAwal = (i: number): { x: number; y: number } => ({ x: 164 + 22 * (i % 5), y: 70 + 24 * Math.floor(i / 5) });
export const titikBlok = (i: number): { x: number; y: number } => ({ x: 36 + 20 * (i % 5), y: 70 + 24 * Math.floor(i / 5) });
export const titikSisa = (j: number): { x: number; y: number } => ({ x: 40 + 30 * j, y: 152 });
export const RING = { x: 24, y: 56, w: 104, h: 56 };

const SUARA_Q1 = "Malosi punya tujuh belas titik di layar. Ayo kita ketuk sepuluh titik dulu, lalu kita lihat sisanya.";
const SUARA_Q2 = "Ketuk titiknya sambil menghitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_Q3 = "Sepuluh titik sudah di dalam lingkaran. Satu lingkaran berisi sepuluh titik, itulah satu puluhan.";
const SUARA_Q4 = "Titik yang di luar lingkaran adalah satuan. Satu, dua, tiga, empat, lima, enam, tujuh. Ada tujuh satuan.";
const SUARA_Q5 = "Jadi kalimatnya: sepuluh ditambah tujuh sama dengan tujuh belas. Satu puluhan dan tujuh satuan.";
const titikTujuhBelas = (i: number): Obj => {
  const p = i < 10 ? titikAwal(i) : titikSisa(i - 10);
  return titik(ID_TITIK17[i], p.x, p.y, i < 10 ? W.titik : W.oranye);
};

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Sepuluh dan Satuan: titik Malosi",
  sumber: "Metode luar: Sepuluh dan Satuan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1)),
      tambah("Malosi", emo("a-Malosi", 268, 152, ANAK, 24), teks("n-Malosi", 268, 166, "Malosi", 8.4)),
      tambah("titik", ...ID_TITIK17.map((_, i) => titikTujuhBelas(i))),
      tambah("sepuluh", teks("t10", 208, 58, "10", 12, W.merah)),
    ),
    k(
      SUARA_Q2,
      hapus(0, "t10"),
      ...pindahBilangan(SUARA_Q2, ID_TITIK17.slice(0, 10), titikBlok, 1, "menghitung:"),
      tambah(idx(SUARA_Q2, "sepuluh"), kotak("ring", RING.x, RING.y, RING.w, RING.h, "#FEE2E2", W.merah, { rx: 10, tebal: 2, z: -1 })),
    ),
    k(SUARA_Q3, sorotkan("lingkaran.", "ring"), tambah("puluhan.", teks("l1", 76, 126, "1 puluhan", 10, W.merah))),
    k(SUARA_Q4, redamkan(0, "ring"), ...hitungSatu(SUARA_Q4, ID_TITIK17.slice(10), "satuan", "ch", 130, 176, "satuan.", 1, true, W.merah, 10)),
    k(SUARA_Q5, redamkan(0, "tt16"), ...rumus(SUARA_Q5, "rm", 194, 10, 7, "kalimatnya:", 16)),
  ],
};

/* ------------------------------ 2. Dua Bingkai Sepuluh: konsep ------------------------------ */
export const BINGKAI_A = { x: 30, y: 76 };
export const BINGKAI_B = { x: 170, y: 76 };
const titikSel = (id: string, f: { x: number; y: number }, i: number): Obj => titikBingkai(id, pusatSel(f.x, f.y, i).x, pusatSel(f.x, f.y, i).y);
export const ID_SEL_A = Array.from({ length: 10 }, (_, i) => `fa${i}`);

const SUARA_R1 = "Cara ketiga, Dua Bingkai Sepuluh. Satu bingkai sepuluh punya sepuluh kotak: dua baris, dan tiap baris lima kotak.";
const SUARA_R2 = "Isi bingkai pertama sampai penuh sambil menghitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_R3 = "Bingkai kedua kita pakai untuk satuan. Isi titik di bingkai kedua sambil menghitung: satu, dua, tiga, empat.";
const SUARA_R4 = "Satu bingkai penuh dan empat titik sama dengan satu puluhan dan empat satuan. Itulah empat belas.";
const SUARA_R5 = "Dua bingkai membantu kita melihat sepuluh dan sisanya dengan cepat, tanpa menghitung satu per satu.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Dua Bingkai Sepuluh: bingkai penuh dan bingkai satuan",
  sumber: "Metode luar: Dua Bingkai Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(2)), tambah("kotak:", ...bingkai("fa", BINGKAI_A.x, BINGKAI_A.y)), tambah(idx(SUARA_R1, "sepuluh", 3), teks("t10", 85, 140, "10 kotak", 11, W.merah))),
    k(SUARA_R2, tambah("pertama", teks("hA", 85, 68, "puluhan", 9.4)), ...munculBilangan(SUARA_R2, Array.from({ length: 10 }, (_, i) => titikSel(`ba${i}`, BINGKAI_A, i)), 1, "menghitung:")),
    k(
      SUARA_R3,
      tambah(0, ...bingkai("fb", BINGKAI_B.x, BINGKAI_B.y), teks("hB", 225, 68, "satuan", 9.4)),
      ...munculBilangan(SUARA_R3, Array.from({ length: 4 }, (_, i) => titikSel(`bb${i}`, BINGKAI_B, i)), 1, "menghitung:"),
    ),
    k(
      SUARA_R4,
      hapus(0, "t10"),
      tambah(idx(SUARA_R4, "puluhan"), teks("l1", 85, 140, "1 puluhan", 10, W.merah)),
      tambah(idx(SUARA_R4, "satuan"), teks("l2", 225, 140, "4 satuan", 10, W.merah)),
      tambah(idx(SUARA_R4, "belas"), teks("n14", 150, 176, "14", 30, W.merah)),
    ),
    k(SUARA_R5, sorotkan("sepuluh", ...ID_SEL_A), tambah("cepat,", emo("kc", 155, 98, "\u{26A1}", 20))),
  ],
};

/* ------------------------------ 3. Dua Bingkai Sepuluh: titik Wei ------------------------------ */
const SUARA_S1 = "Wei menunjukkan delapan belas titik di dua bingkai. Bingkai pertama kita isi sampai penuh.";
const SUARA_S2 = "Mari kita isi bingkai pertama sampai penuh: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_S3 = "Sekarang bingkai kedua: satu, dua, tiga, empat, lima, enam, tujuh, delapan. Ada delapan titik di bingkai kedua.";
const SUARA_S4 = "Jadi delapan belas adalah satu puluhan dan delapan satuan. Sepuluh ditambah delapan sama dengan delapan belas.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Dua Bingkai Sepuluh: titik Wei",
  sumber: "Metode luar: Dua Bingkai Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, ...kepala(2)),
      tambah("Wei", emo("a-Wei", 262, 170, ANAK, 26), teks("n-Wei", 262, 184, "Wei", 8.4)),
      tambah("dua", ...bingkai("fa", BINGKAI_A.x, BINGKAI_A.y), ...bingkai("fb", BINGKAI_B.x, BINGKAI_B.y), teks("hA", 85, 68, "puluhan", 9.4), teks("hB", 225, 68, "satuan", 9.4)),
    ),
    k(
      SUARA_S2,
      ...munculBilangan(SUARA_S2, Array.from({ length: 10 }, (_, i) => titikSel(`ba${i}`, BINGKAI_A, i)), 1, "penuh:"),
      tambah(idx(SUARA_S2, "sepuluh"), teks("t10", 85, 140, "10 titik", 10, W.merah)),
    ),
    k(SUARA_S3, ...munculBilangan(SUARA_S3, Array.from({ length: 8 }, (_, i) => titikSel(`bb${i}`, BINGKAI_B, i)), 1, "kedua:")),
    k(
      SUARA_S4,
      ubah(idx(SUARA_S4, "puluhan"), { id: "t10", isi: "1 puluhan" }),
      tambah(idx(SUARA_S4, "satuan"), teks("l2", 225, 140, "8 satuan", 10, W.merah)),
      ...rumus(SUARA_S4, "rw", 178, 10, 8, "satuan.", 18),
    ),
  ],
};

/* ------------------------------ 4. Ringkasan tiga metode ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga cara dari luar tadi. Cara pertama, Hitung sampai dua puluh: kita menghitung terus melewati sepuluh.";
const SUARA_Y2 = "Cara kedua, Sepuluh dan Satuan: kita lihat sepuluh ditambah sisanya. Sebelas sampai dua puluh selalu begitu.";
const SUARA_Y3 = "Cara ketiga, Dua Bingkai Sepuluh: kita isi satu bingkai sampai penuh, lalu bingkai kedua untuk satuan.";
const SUARA_Y4 = "Hebat sekali, anak-anak! Tiga cara tadi membantu kita membaca puluhan dan satuan. Teruslah berlatih di layar, ya.";
const DESKRIPSI = ["hitung terus melewati 10", "10 ditambah sisanya", "bingkai penuh, lalu bingkai satuan"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, NAMA_METODE[i], 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah("Hitung", ...kartuMetode(0)), tambah("menghitung", deskripsi(0)), sorotkan("Hitung", "rm0-k")),
    k(SUARA_Y2, redamkan(0, "rm0-k"), tambah(0, ...kartuMetode(1)), sorotkan(0, "rm1-k"), tambah("sisanya.", deskripsi(1))),
    k(SUARA_Y3, redamkan(0, "rm1-k"), tambah(0, ...kartuMetode(2)), sorotkan(0, "rm2-k"), tambah("kedua", deskripsi(2))),
    k(SUARA_Y4, bersih(0), tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)), tambah("layar,", ...kartu("rz", 40, 124, 220, 34, W.emas, ["puluhan dan satuan"], 11)), tambah("Teruslah", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu))),
  ],
};
