import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, balokPanjang, buSari, emo, judul, kartu, kotak, kubusKecil, lantai, nia, teks, tokoh } from "./k2b1B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b1B-bantu";

/* Video metode global Sub-Bab B "Pesanan Kue Hari Olahraga": pembuka, Base-Ten Blocks (Balok Puluhan dan Satuan), dan terapannya. */

export const NAMA_METODE = ["Base-Ten Blocks", "Place Value Chart", "Expanded Form"];
export const NAMA_METODE_ID = ["Balok Puluhan dan Satuan", "Bagan Puluhan dan Satuan", "Bentuk Panjang"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di rak dapur, Dika menemukan sebuah kotak balok kayu dan tiga lembar kertas bergambar.";
const SUARA_O2 = "Bu Sari tersenyum. Itu alat bantu anak-anak yang belajar puluhan dan satuan di dapur dulu!";
const SUARA_O3 = "Tiga cara itu: Base-Ten Blocks, Place Value Chart, dan Expanded Form.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Balok Puluhan dan Satuan, Bagan Puluhan dan Satuan, dan Bentuk Panjang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga alat bantu di rak dapur",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara membaca puluhan dan satuan"), lantai("tn", 150)),
      tambah("rak", kotak("rk", 20, 44, 250, 70, WK.meja, W.coklat, { rx: 4, tebal: 2.2, z: -1 })),
      tambah("Dika", ...tokoh("dk", 278, 150, E.dika, "Dika")),
      tambah("kotak", kotak("kb", 34, 62, 64, 46, WK.kotak, W.coklat, { rx: 3, tebal: 2 })),
      tambah("balok", ...[0, 1, 2].flatMap((i) => balokPanjang(`bb${i}`, 46 + i * 16, 66, 36))),
      tambah("tiga", ...[0, 1, 2].map((i) => kotak(`kt${i}`, 118 + i * 50, 60, 36, 46, WK.kertas, W.coklat, { rx: 2, tebal: 1.4 })), ...kartu("t3", 120, 120, 140, 18, W.krem, ["3 lembar kertas"], 8.6)),
    ),
    k(
      SUARA_O2,
      tambah("Bu", ...buSari("bs", 24, 150)),
      tambah("tersenyum.", emo("sy", 24, 122, E.senyum, 22)),
      tambah("alat", ...kartu("al", 70, 150, 160, 18, W.hijauMuda, ["alat bantu belajar"], 8.6)),
      tambah("dulu!", emo("lp", 262, 126, E.lampu, 24)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      tambah("Base-Ten", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Base-Ten Blocks"], 11)),
      tambah("Place", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Place Value Chart"], 11)),
      tambah("Expanded", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Expanded Form"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah("Balok", ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Balok Puluhan dan Satuan"], 11)),
      tambah("Bagan", ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Bagan Puluhan dan Satuan"], 11)),
      tambah("Bentuk", ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Bentuk Panjang"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Base-Ten Blocks: konsep ------------------------------ */
const SUARA_B1 = "Cara pertama, Base-Ten Blocks, atau Balok Puluhan dan Satuan.";
const SUARA_B2 = "Satu balok panjang mewakili sepuluh, dan satu kubus kecil mewakili satu.";
const SUARA_B3 = "Susun balok panjang untuk puluhan, lalu kubus kecil untuk satuan.";
const SUARA_B4 = "Hitung balok panjangnya dulu, lalu kubus kecilnya.";

/** Tiga balok panjang di kolom puluhan dan empat kubus kecil di kolom satuan. */
const BX = (i: number): number => 44 + i * 30;
const KX = (i: number): [number, number] => [190 + (i % 2) * 24, 88 + Math.floor(i / 2) * 26];

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Base-Ten Blocks: balok puluhan dan satuan",
  sumber: "Metode global: Base-Ten Blocks",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Base-Ten", ...balokPanjang("bp", 80, 58, 84, 22)),
      tambah("Blocks,", kubusKecil("bc", 180, 98, 30)),
      tambah("Balok", teks("bl1", 91, 172, "balok panjang", 8.6, W.coklat)),
      tambah("Satuan.", teks("bl2", 195, 172, "kubus kecil", 8.6, W.coklat)),
    ),
    k(
      SUARA_B2,
      tambah("Satu", teks("c1", 50, 106, "1", 18, W.merah)),
      tambah("sepuluh,", teks("v10", 134, 106, "= 10", 18, W.merah)),
      tambah(idx(SUARA_B2, "satu", 2), teks("c2", 150, 134, "1", 18, W.merah)),
      tambah(idx(SUARA_B2, "satu", 3), teks("v1", 240, 134, "= 1", 18, W.merah)),
      sorotkan("panjang", "bp"),
      sorotkan("kecil", "bc"),
    ),
    k(
      SUARA_B3,
      hapus(0, ...["bp", ...Array.from({ length: 9 }, (_, i) => `bp-s${i}`)], "bc", "bl1", "bl2", "c1", "v10", "c2", "v1"),
      tambah("balok", kotak("zp", 20, 56, 130, 112, WK.puluhan, W.biru, { rx: 4, tebal: 2, z: -2 }), kotak("zs", 160, 56, 120, 112, WK.satuan, W.biru, { rx: 4, tebal: 2, z: -2 })),
      tambah("panjang", ...[0, 1, 2].flatMap((i) => balokPanjang(`bz${i}`, BX(i), 84, 70, 16))),
      tambah("puluhan,", teks("zpt", 85, 72, "Puluhan", 10, W.biru)),
      tambah("kubus", ...[0, 1, 2, 3].map((i) => kubusKecil(`kz${i}`, KX(i)[0], KX(i)[1], 16))),
      tambah("satuan.", teks("zst", 220, 72, "Satuan", 10, W.biru)),
    ),
    k(
      SUARA_B4,
      tambah("balok", ...[0, 1, 2].map((i) => teks(`cb${i}`, BX(i) + 8, 164, String((i + 1) * 10), 10, W.merah))),
      sorotkan("panjangnya", "bz0", "bz1", "bz2"),
      tambah("dulu,", emo("jr", 85, 190, E.jari, 12)),
      tambah("kubus", ...[0, 1, 2, 3].map((i) => teks(`ck${i}`, KX(i)[0] + 8, KX(i)[1] + 28, String(31 + i), 8.6, W.merah))),
      sorotkan("kecilnya.", "kz0", "kz1", "kz2", "kz3"),
    ),
  ],
};

/* ------------------------------ 3. Base-Ten Blocks: terapan ------------------------------ */
const SUARA_T1 = "Nia menyusun empat balok panjang dan tujuh kubus kecil.";
const SUARA_T2 = "Empat puluh ditambah tujuh sama dengan empat puluh tujuh.";
const SUARA_T3 = "Cocok kalau kita ingin melihat dan memegang besarnya bilangan.";
const SUARA_T4 = "Kurang cocok kalau balok tidak ada di dekat kita, karena kita harus membayangkannya.";

const TX = (i: number): number => 92 + i * 20;
const TK = (i: number): [number, number] => [204 + (i % 4) * 16, 96 + Math.floor(i / 4) * 16];

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Balok puluhan dan satuan: terapan",
  sumber: "Metode global: Base-Ten Blocks (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0), lantai("tn", 150), ...nia("ni", 24, 150)),
      tambah("empat", ...[0, 1, 2, 3].flatMap((i) => balokPanjang(`tb${i}`, TX(i), 58, 72, 14)), teks("l4", 128, 150, "4", 16, W.merah)),
      tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map((i) => kubusKecil(`tk${i}`, TK(i)[0], TK(i)[1], 12)), teks("l7", 236, 150, "7", 16, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Empat", teks("eq", 150, 182, "4", 18, W.merah)),
      ubah("puluh", { id: "eq", isi: "40" }),
      sorotkan("Empat", "tb0", "tb1", "tb2", "tb3"),
      ubah("ditambah", { id: "eq", isi: "40 +" }),
      ubah("tujuh", { id: "eq", isi: "40 + 7" }),
      sorotkan("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map((i) => `tk${i}`)),
      ubah("sama", { id: "eq", isi: "40 + 7 =" }),
      ubah(idx(SUARA_T2, "empat", 2), { id: "eq", isi: "40 + 7 = 4" }),
      ubah(idx(SUARA_T2, "puluh", 2), { id: "eq", isi: "40 + 7 = 40" }),
      ubah(idx(SUARA_T2, "tujuh", 2), { id: "eq", isi: "40 + 7 = 47" }),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 56, 66, E.benar, 22)),
      tambah("melihat", emo("ms", 56, 96, E.mata, 22)),
      tambah("memegang", emo("tg", 56, 126, E.raba, 22)),
      tambah("bilangan.", emo("lp", 262, 66, E.lampu, 22)),
    ),
    k(
      SUARA_T4,
      ubah("Kurang", { id: "ok", isi: E.salah }),
      ubah("balok", ...[0, 1, 2, 3].map((i) => ({ id: `tb${i}`, op: 0.2 })), ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ id: `tk${i}`, op: 0.2 }))),
      tambah("dekat", emo("tq", 262, 66, E.tanya, 22)),
      tambah("membayangkannya.", emo("pk", 150, 112, E.pikir, 30)),
    ),
  ],
};
