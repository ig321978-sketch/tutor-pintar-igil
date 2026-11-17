import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaTabel, emo, garis, judul, kantongIkan, kartu, karet, keranjang, kerikil, kotak, orang, rentang, sekatKe, tabel, teks, type UkuranTabel } from "./k1b5c-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b5c-bantu";

/* Lanjutan "Kemas Pakan dan Kantong": tiga belas kantong ikan dan keranjang isi sepuluh, sebelas kerang (angka sama, tempat beda), dan dua puluh kerikil tanpa sisa. */

type Ub = Partial<Obj> & { id: string };

/* ------------------------------ 4. Kantong ikan dan keranjang ------------------------------ */
const SUARA_K1 = "Pembeli hanya mau kantong ikan yang rapi. Tiga belas kantong ikan dimasukkan ke keranjang isi sepuluh.";
const SUARA_K2 = "Keranjang penuh, jadi satu puluhan. Tiga kantong tersisa di luar, jadi tiga satuan.";
const SUARA_K3 = "Di tabel, satu di puluhan dan tiga di satuan. Tiga belas adalah sepuluh dan tiga.";
/** Kantong ikan ke-i (0 sampai 12): mula-mula lepas di kanan, lalu sepuluh pertama masuk keranjang di (14, 62). */
const LEPAS = (i: number): [number, number] => [150 + (i % 5) * 26, 66 + Math.floor(i / 5) * 26];
const SEKAT = (i: number): [number, number] => [sekatKe(14, 62, i).x + 1, sekatKe(14, 62, i).y + 1];
const TK: UkuranTabel = { x: 40, y: 156, w: 200, hk: 14, hb: 28 };

export const ADEGAN_KANTONG: AdeganStory = {
  id: "kantong-ikan",
  judul: "Tiga belas kantong ikan",
  sumber: "Materi: kantong ikan dan keranjang",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kantong ikan yang rapi")),
      tambah("Pembeli", emo("pb", 276, 42, E.pembeli, 20)),
      tambah("Tiga", ...keranjang("kj", 14, 62)),
      tambah("belas", teks("j13", 150, 48, "13 kantong ikan", 10, W.ungu)),
      tambah(idx(SUARA_K1, "kantong", 2), ...rentang(0, 12).flatMap((i) => kantongIkan(`kt${i}`, LEPAS(i)[0], LEPAS(i)[1], i))),
      ubah("dimasukkan", ...rentang(0, 9).flatMap((i): Ub[] => [{ id: `kt${i}`, x: SEKAT(i)[0], y: SEKAT(i)[1] }, { id: `kt${i}-f`, x: SEKAT(i)[0] + 10, y: SEKAT(i)[1] + 11 }, { id: `kt${i}-f-m`, x: SEKAT(i)[0] + 10 + 1.8, y: SEKAT(i)[1] + 11 - 0.5 }])),
      tambah("sepuluh.", teks("is", 69, 122, "isi 10", 9.4, W.merah)),
    ),
    k(
      SUARA_K2,
      hapus(0, "is"),
      sorotkan("Keranjang", ...rentang(0, 9).map((i) => `kjc${i}`)),
      tambah("puluhan.", teks("lp", 69, 122, "1 puluhan", 11, W.merah)),
      sorotkan(idx(SUARA_K2, "Tiga"), "kt10", "kt11", "kt12"),
      tambah("satuan.", teks("ls", 176, 152, "3 satuan", 11, W.merah)),
    ),
    k(
      SUARA_K3,
      hapus(0, "lp", "ls"),
      tambah("tabel,", ...tabel("tk", TK)),
      tambah(idx(SUARA_K3, "satu"), angkaTabel("tk", TK, 0, "1", 18, 190)),
      tambah(idx(SUARA_K3, "tiga"), angkaTabel("tk", TK, 1, "3", 18, 190)),
      tambah(idx(SUARA_K3, "belas"), teks("l13", 75, 132, "13: 10 dan 3", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Sebelas kerang: angka sama, tempat beda ------------------------------ */
const SUARA_S1 = "Berikutnya sebelas kerang hias. Igil menulis satu dan satu, lalu berseru, dua angka satu itu artinya sama!";
const SUARA_S2 = "Tunggu, kata Kaka. Lihat tempatnya. Satu di kiri artinya satu puluhan, yaitu sepuluh kerang.";
const SUARA_S3 = "Satu di kanan artinya satu satuan, yaitu satu kerang. Angkanya sama, tempatnya beda, jadi artinya beda.";
const T5: UkuranTabel = { x: 50, y: 92, w: 200, hk: 20, hb: 50 };
const KERANG = (i: number): [number, number] => (i < 6 ? [60 + i * 24, 56] : [72 + (i - 6) * 24, 80]);

export const ADEGAN_SEBELAS: AdeganStory = {
  id: "sebelas",
  judul: "Sebelas kerang: angka sama, tempat beda",
  sumber: "Materi: arti angka menurut tempatnya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Sebelas kerang hias")),
      tambah("sebelas", teks("j11", 246, 62, "11 kerang", 9.4, W.ungu)),
      tambah("kerang", ...rentang(0, 10).map((i) => emo(`kr${i}`, KERANG(i)[0], KERANG(i)[1], E.kerang, 18))),
      tambah("Igil", ...orang("ig", 24, 182, E.igil, "Igil")),
      tambah("menulis", ...tabel("tb", T5)),
      tambah(idx(SUARA_S1, "satu", 1), angkaTabel("tb", T5, 0, "1", 26)),
      tambah(idx(SUARA_S1, "satu", 2), angkaTabel("tb", T5, 1, "1", 26)),
      tambah("berseru,", ...kartu("sr", 50, 170, 110, 22, W.krem, ["2 angka 1 sama!"], 8.6)),
    ),
    k(
      SUARA_S2,
      hapus(0, "sr-k", "sr-t0"),
      tambah("Kaka.", ...orang("kk", 276, 182, E.kaka, "Kaka")),
      sorotkan(idx(SUARA_S2, "Satu"), "tb-hl", "tb-bl"),
      sorotkan(idx(SUARA_S2, "sepuluh"), ...rentang(0, 9).map((i) => `kr${i}`)),
      tambah(idx(SUARA_S2, "kerang."), teks("k10", 100, 182, "10 kerang", 9.4, W.merah)),
    ),
    k(
      SUARA_S3,
      redamkan(0, "tb-hl", "tb-bl", ...rentang(0, 9).map((i) => `kr${i}`)),
      sorotkan(idx(SUARA_S3, "Satu"), "tb-hr", "tb-br"),
      sorotkan(idx(SUARA_S3, "kerang."), "kr10"),
      tambah("kerang.", teks("k1", 200, 182, "1 kerang", 9.4, W.merah)),
      tambah("Angkanya", teks("bd", 150, 196, "angka sama, tempat beda", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Dua puluh kerikil: nol satuan ------------------------------ */
const SUARA_D1 = "Kerikil hias ada dua puluh. Igil mengikatnya, sepuluh, dan sepuluh lagi.";
const SUARA_D2 = "Dua ikatan penuh, jadi dua puluhan. Tidak ada kerikil lepas, jadi nol satuan. Igil sampai mencari sisanya ke kolong meja!";
const SUARA_D3 = "Di tabel, dua di puluhan dan nol di satuan. Dibaca dua puluh. Nol artinya tidak ada sisa.";
const T6: UkuranTabel = { x: 50, y: 40, w: 200, hk: 22, hb: 60 };
const KRIKIL = (i: number): [number, number] => [(i < 10 ? 40 : 170) + (i % 5) * 14, 44 + Math.floor((i % 10) / 5) * 14];

export const ADEGAN_DUA_PULUH: AdeganStory = {
  id: "dua-puluh",
  judul: "Dua puluh kerikil, tanpa sisa",
  sumber: "Materi: dua puluh, nol satuan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Kerikil hias"), kotak("mj", 14, 74, 272, 10, "#F5D0A9", W.coklat, { rx: 3, tebal: 2, z: -3 }), garis("kl", 30, 84, 0, 66, W.coklat, 3), garis("kn", 270, 84, 0, 66, W.coklat, 3)),
      tambah("Kerikil", ...rentang(0, 19).map((i) => kerikil(`kb${i}`, KRIKIL(i)[0], KRIKIL(i)[1], i))),
      tambah("puluh.", teks("j20", 150, 102, "20 kerikil", 11, W.ungu)),
      tambah("Igil", ...orang("ig", 24, 182, E.igil, "Igil")),
      tambah(idx(SUARA_D1, "sepuluh,"), karet("ka", 32, 36, 72, 30), teks("s1", 68, 32, "10", 10, W.merah)),
      tambah(idx(SUARA_D1, "sepuluh", 2), karet("kb", 162, 36, 72, 30), teks("s2", 198, 32, "10", 10, W.merah)),
    ),
    k(
      SUARA_D2,
      tambah("puluhan,", teks("p2", 70, 122, "2 puluhan", 10, W.merah)),
      tambah("nol", teks("s0", 230, 122, "0 satuan", 10, W.merah)),
      ubah("sampai", { id: "ig", x: 150, y: 134 }, { id: "ig-n", x: 150, y: 147 }),
      tambah("kolong", emo("kc", 194, 134, E.kaca, 20)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Dua puluh di tabel"), ...tabel("tj", T6)),
      tambah(idx(SUARA_D3, "dua"), angkaTabel("tj", T6, 0, "2", 30)),
      tambah(idx(SUARA_D3, "nol"), angkaTabel("tj", T6, 1, "0", 30)),
      tambah("Dibaca", teks("dp", 150, 128, "20 dibaca dua puluh", 10, W.ungu)),
      tambah(idx(SUARA_D3, "nol", 2), ...kartu("ns", 60, 142, 180, 22, W.krem, ["0 artinya tidak ada sisa"], 9)),
    ),
  ],
};
