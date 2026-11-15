import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BOLA, EMO_BONEKA, EMO_KERETA, EMO_MOBIL, OWL, W, bendaDi, emo, jumlahG, judul, kartu, namaG, pusatBenda, titikBaris, type Titik } from "./k1b8A-gambar";
import { bersih, gilir, hitungAksi, idx, ids, k, pindahKe, redamkan, sorotkan, tambah } from "./k1b8A-bantu";

/** Mainan di toko Halim: kunci kelompok, nama, gambar, banyaknya (jumlah semuanya delapan belas). */
export type Kel = { key: string; nama: string; e: string; n: number };
export const TOKO: Kel[] = [
  { key: "a", nama: "Kereta", e: EMO_KERETA, n: 6 },
  { key: "b", nama: "Mobil", e: EMO_MOBIL, n: 4 },
  { key: "c", nama: "Boneka", e: EMO_BONEKA, n: 5 },
  { key: "d", nama: "Bola", e: EMO_BOLA, n: 3 },
];
export const BARIS_Y = [58, 96, 134, 172];
export const X0B = 76;
export const DXB = 26;
export const titikRapi = (r: number): Titik[] => titikBaris(TOKO[r].n, X0B, BARIS_Y[r], DXB);

/** Letak mainan berserakan: delapan belas titik tersebar, jenis menurut pola di bawah. */
const POLA = "acbdacbacadbcabcad";
const SEBAR: Titik[] = Array.from({ length: 18 }, (_, i) => {
  const c = i % 6;
  const r = Math.floor(i / 6);
  return { x: 30 + c * 48 + (((r * 7 + c * 5) % 9) - 4) * 2, y: 70 + r * 55 + (((c * 11 + r * 3) % 7) - 3) * 3 };
});
/** Titik berserakan untuk kelompok `key`. */
export const titikSebar = (key: string): Titik[] => SEBAR.filter((_, i) => POLA[i] === key);
/** Semua mainan berserakan (benda `e{huruf}{i}`). */
export const sebarObjs = (): Obj[] => TOKO.flatMap((g) => bendaDi(g.key, g.e, titikSebar(g.key)));
const idsKel = (key: string, n: number): string[] => ids(`e${key}`, 0, n - 1);
/** Baris rapi satu kelompok (benda dan nama). */
export const barisRapi = (r: number): Obj[] => [namaG(TOKO[r].key, BARIS_Y[r], TOKO[r].nama), ...bendaDi(TOKO[r].key, TOKO[r].e, titikRapi(r))];

/* ------------------------------ 1. Toko mainan yang berantakan ------------------------------ */
const SUARA_B1 = "Hari ini Kira membantu Halim di toko mainan. Aduh, toko mainan Halim sangat berantakan!";
const SUARA_B2 = "Ada kereta, mobil, boneka, dan bola. Semuanya berserakan di lantai.";
const SUARA_B3 = "Kira ingin tahu, ada berapa banyak tiap jenis mainan? Kalau berantakan begini, kita sulit menghitungnya.";
const SUARA_B4 = "Hitungannya bisa terlewat, atau satu mainan terhitung dua kali. Kira jadi bingung.";
const SUARA_B5 = "Karena itu, kita mengelompokkan dulu. Mengelompokkan artinya mengumpulkan benda yang sejenis di satu tempat.";
const SUARA_B6 = "Ayo, kita bantu Kira merapikan toko mainan!";

export const ADEGAN_BERANTAKAN: AdeganStory = {
  id: "toko-berantakan",
  judul: "Toko mainan yang berantakan",
  sumber: "Materi: benda yang berserakan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Toko mainan")), tambah(idx(SUARA_B1, "Aduh"), ...sebarObjs())),
    k(
      SUARA_B2,
      ...gilir(SUARA_B2, [
        ["kereta", idsKel("a", 6)],
        ["mobil", idsKel("b", 4)],
        ["boneka", idsKel("c", 5)],
        ["bola", idsKel("d", 3)],
      ]),
    ),
    k(SUARA_B3, redamkan(0, ...idsKel("d", 3)), tambah("sulit", emo("q", 150, 34, "\u{1F914}", 24))),
    k(SUARA_B4, tambah("bingung", emo("bg", 262, 34, "\u{1F615}", 24))),
    k(SUARA_B5, bersih(0), tambah(0, judul("Mengelompokkan")), tambah("artinya", ...kartu("kk", 14, 66, 272, 72, W.krem, ["mengelompokkan:", "mengumpulkan benda", "yang sejenis"], 11))),
    k(SUARA_B6, bersih(0), tambah(0, judul("Ayo merapikan!")), tambah("merapikan", emo("kr", 150, 120, "\u{1F9FA}", 54), emo("ow", 262, 170, OWL, 28))),
  ],
};

/* ------------------------------ 2. Toko mainan yang sudah rapi ------------------------------ */
const SUARA_R1 = "Sekarang Kira merapikan toko. Mainan yang jenisnya sama dikumpulkan di rak yang sama.";
const SUARA_R2 = "Pertama, kereta. Semua kereta kita kumpulkan di rak paling atas.";
const SUARA_R3 = "Kedua, mobil. Semua mobil kita kumpulkan di rak berikutnya.";
const SUARA_R4 = "Ketiga, boneka. Semua boneka berkumpul di rak ketiga. Terakhir, bola. Semua bola berkumpul di rak keempat.";
const SUARA_R5 = "Lihat! Sekarang toko Halim sudah rapi. Mainan sejenis ada di tempat yang sama.";
const SUARA_R6 = "Itulah yang disebut mengelompokkan. Kita mengumpulkan benda menurut jenisnya.";
const SUARA_R7 = "Mainan yang sudah dikelompokkan jauh lebih mudah dihitung. Ayo kita hitung satu per satu.";

export const ADEGAN_RAPI: AdeganStory = {
  id: "toko-rapi",
  judul: "Toko mainan yang sudah rapi",
  sumber: "Materi: mengelompokkan benda",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Merapikan toko"), ...sebarObjs())),
    k(SUARA_R2, pindahKe(idx(SUARA_R2, "Semua"), "a", titikRapi(0)), tambah(idx(SUARA_R2, "Semua"), namaG("a", BARIS_Y[0], "Kereta"))),
    k(SUARA_R3, pindahKe(idx(SUARA_R3, "Semua"), "b", titikRapi(1)), tambah(idx(SUARA_R3, "Semua"), namaG("b", BARIS_Y[1], "Mobil"))),
    k(
      SUARA_R4,
      pindahKe(idx(SUARA_R4, "Semua", 1), "c", titikRapi(2)),
      tambah(idx(SUARA_R4, "Semua", 1), namaG("c", BARIS_Y[2], "Boneka")),
      pindahKe(idx(SUARA_R4, "Semua", 2), "d", titikRapi(3)),
      tambah(idx(SUARA_R4, "Semua", 2), namaG("d", BARIS_Y[3], "Bola")),
    ),
    k(SUARA_R5, tambah("Lihat!", emo("ok", 276, 28, "✅", 22))),
    k(SUARA_R6, sorotkan(0, "ea-nm", "eb-nm", "ec-nm", "ed-nm")),
    k(SUARA_R7, redamkan(0, "ea-nm", "eb-nm", "ec-nm", "ed-nm"), tambah("jauh", ...kartu("kh", 50, 178, 200, 22, W.hijauMuda, ["mudah dihitung"], 9.6))),
  ],
};

/* ------------------------------ 3. Menghitung tiap kelompok ------------------------------ */
const SUARA_H1 = "Sekarang kita hitung tiap kelompok mainan. Kita hitung satu kelompok dulu, lalu kelompok berikutnya.";
const SUARA_H2 = "Kita hitung kereta dulu. Satu, dua, tiga, empat, lima, enam. Ada enam kereta.";
const SUARA_H3 = "Sekarang mobil. Satu, dua, tiga, empat. Ada empat mobil.";
const SUARA_H4 = "Lalu boneka. Satu, dua, tiga, empat, lima. Ada lima boneka.";
const SUARA_H5 = "Terakhir bola. Satu, dua, tiga. Ada tiga bola.";
const SUARA_H6 = "Jadi kereta ada enam, mobil ada empat, boneka ada lima, dan bola ada tiga.";
const SUARA_H7 = "Setiap jenis mainan punya banyaknya sendiri. Banyaknya mainan inilah yang kita sebut data.";
const hitungKel = (suara: string, r: number, setelah: string, kataJumlah: string, ke = 2) => [
  ...hitungAksi(suara, `e${TOKO[r].key}`, pusatBenda(titikRapi(r)), { setelah }),
  tambah(idx(suara, kataJumlah, ke), jumlahG(TOKO[r].key, BARIS_Y[r], String(TOKO[r].n))),
];

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung-kelompok",
  judul: "Menghitung tiap kelompok",
  sumber: "Materi: menghitung tiap kelompok",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hitung tiap kelompok")), tambah(idx(SUARA_H1, "kelompok"), ...[0, 1, 2, 3].flatMap(barisRapi))),
    k(SUARA_H2, ...hitungKel(SUARA_H2, 0, "dulu.", "enam")),
    k(SUARA_H3, ...hitungKel(SUARA_H3, 1, "mobil.", "empat")),
    k(SUARA_H4, ...hitungKel(SUARA_H4, 2, "boneka.", "lima")),
    k(SUARA_H5, ...hitungKel(SUARA_H5, 3, "bola.", "tiga")),
    k(
      SUARA_H6,
      ...gilir(SUARA_H6, [
        ["enam", ["ea-ln"]],
        ["empat", ["eb-ln"]],
        ["lima", ["ec-ln"]],
        ["tiga", ["ed-ln"]],
      ]),
    ),
    k(SUARA_H7, redamkan(0, "ed-ln"), tambah("data.", ...kartu("dt", 40, 178, 220, 22, W.krem, ["data: keterangan banyaknya"], 9.4))),
  ],
};
