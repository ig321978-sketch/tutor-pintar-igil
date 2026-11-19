import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, kartu, kotak, lorong, papanJatah, teks, tokoh, judul } from "./k4b1h-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/*
 * Cerita orisinal IGIL "Papan Jatah Bu Ratna" (Kelas 4 Bab 1 Sub-Bab H), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1h.md. Bagian ini: pembuka (lemari papan jatah), Equal Sharing (Bagi Rata), dan terapannya.
 */

export const NAMA_METODE = ["Equal Sharing", "Repeated Subtraction", "Long Division"] as const;
export const NAMA_METODE_ID = ["Bagi Rata", "Kurang Berulang", "Bagi Susun"] as const;

const KUNING_KARTU = "#FEF3C7";
const BIRU_MUDA = "#BFDBFE";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di lorong kamar, Bu Ratna membuka lemari yang penuh papan jatah dan kartu.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk membagi bilangan, supaya semua kamar mendapat bagian yang adil.";
const SUARA_O3 = "Tiga cara itu: Equal Sharing, Repeated Subtraction, dan Long Division.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bagi Rata, Kurang Berulang, dan Bagi Susun.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Lemari papan jatah Bu Ratna",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Malam di Lorong"), ...lorong("lr", 150), ...tokoh("br", 60, 184, "Bu Ratna")),
      tambah("lemari", kotak("lm", 196, 96, 86, 54, "#C99A63", W.kayuTua, { rx: 3, z: 1 }), kotak("lm-d", 237, 98, 2, 50, W.kayuTua, undefined, { rx: 0, tebal: 0, z: 2 })),
      tambah("papan", ...kartu("pn", 202, 104, 32, 38, KUNING_KARTU, ["papan"], 7)),
      tambah("kartu.", ...kartu("kr", 242, 104, 32, 38, BIRU_MUDA, ["kartu"], 7)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 200, 70, "3 cara", 12, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 20 + i * 30, 50, 26, 30, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 33 + i * 30, 69, "cara", 6.4, W.biru)])),
      tambah("adil.", teks("ad", 150, 118, "bagian yang adil", 9, W.hijauTua), emo("ok", 60, 120, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...papanJatah("pt", 8, 28, 284, 124), teks("n3", 150, 50, "3 cara", 11, W.ungu)),
      tambah("Equal", teks("m0", 150, 76, "1. Equal Sharing", 11, W.biru)),
      tambah("Repeated", teks("m1", 150, 102, "2. Repeated Subtraction", 11, W.biru)),
      tambah("Long", teks("m2", 150, 128, "3. Long Division", 11, W.biru)),
    ),
    k(
      SUARA_O4,
      tambah("Bagi", teks("g0", 150, 88, "Bagi Rata", 9, W.ungu)),
      tambah("Kurang", teks("g1", 150, 114, "Kurang Berulang", 9, W.ungu)),
      tambah("Bagi@2", teks("g2", 150, 140, "Bagi Susun", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Equal Sharing: konsep ------------------------------ */
const SUARA_R1 = "Cara pertama, Equal Sharing, atau Bagi Rata.";
const SUARA_R2 = "Benda dibagikan satu per satu ke tiap wadah, bergiliran, sampai habis.";
const SUARA_R3 = "Banyaknya benda di satu wadah adalah hasil bagi.";
const SUARA_R4 = "Kalau ada benda yang tersisa dan tidak cukup untuk satu putaran, itulah sisanya.";
const WX = [50, 125, 200];
const WY = 104;
/** Tempat benda ke-`i` (0 sampai 11) setelah dibagi: wadah `i mod 3`, kolom putaran `i div 3`. */
const tempat = (i: number): { x: number; y: number } => ({ x: WX[i % 3] + 10 + Math.floor(i / 3) * 12, y: WY + 18 });
const awalBenda = (i: number): Obj => bulat(`it${i}`, 40 + i * 18, 48, 4.5, i % 2 === 0 ? "#FDBA74" : "#93C5FD", "#7C2D12", { tebal: 0.9, z: 4 });
const putaran = (r: number) => [0, 1, 2].map((j) => ({ id: `it${r * 3 + j}`, ...tempat(r * 3 + j) }));

export const ADEGAN_LUAR_RATA: AdeganStory = {
  id: "luar-rata",
  judul: "Equal Sharing: Bagi Rata",
  sumber: "Metode global: Equal Sharing (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Cara 1: Equal Sharing"), ...papanJatah("pt", 8, 28, 284, 124)),
      tambah("Equal", teks("nm", 150, 60, "Equal Sharing", 16, W.merah)),
      tambah("Bagi", teks("ni", 150, 84, "Bagi Rata", 12, W.biru)),
      tambah("Rata.", ...WX.map((x, i) => kotak(`w${i}`, x, WY, 56, 30, "#E0F2FE", W.biru, { rx: 4, z: 1 }))),
    ),
    k(
      SUARA_R2,
      hapus("Benda", "nm", "ni"),
      tambah("Benda", ...Array.from({ length: 12 }, (_, i) => awalBenda(i))),
      tambah("satu", teks("s1", 150, 78, "1 per 1", 10, W.merah)),
      { at: "satu", ubah: putaran(0) },
      { at: "satu@2", ubah: putaran(1) },
      { at: "tiap", ubah: putaran(2) },
      { at: "bergiliran,", ubah: putaran(3) },
      tambah("habis.", teks("hb", 150, 150, "habis", 10, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      hapus("Banyaknya", "hb"),
      sorotkan("satu", "w1", "it1", "it4", "it7", "it10"),
      tambah("wadah", teks("b4", 153, 148, "4", 16, W.hijauTua)),
      tambah("hasil", teks("hs", 222, 148, "hasil bagi", 10, W.merah)),
    ),
    k(
      SUARA_R4,
      tambah("tersisa", bulat("it12", 262, 118, 4.5, "#FDBA74", "#7C2D12", { tebal: 0.9, z: 4 }), bulat("it13", 270, 118, 4.5, "#93C5FD", "#7C2D12", { tebal: 0.9, z: 4 })),
      tambah("putaran,", teks("pt1", 110, 174, "1 putaran", 10, W.coklat)),
      tambah("itulah", teks("sr", 266, 148, "sisa", 10, W.merah)),
      ubah("sisanya.", { id: "it12", warna: "#FCA5A5" }, { id: "it13", warna: "#FCA5A5" }),
    ),
  ],
};

/* ------------------------------ Equal Sharing: terapan ------------------------------ */
const SUARA_T1 = "Genta membagikan dua puluh empat kartu ke enam kotak secara bergiliran.";
const SUARA_T2 = "Tiap kotak mendapat empat kartu, dan tidak ada sisa.";
const SUARA_T3 = "Cocok untuk benda yang bisa dilihat dan dipegang.";
const SUARA_T4 = "Kurang cocok kalau bilangannya sangat besar, karena membagi satu per satu terlalu lama.";
const KX = (i: number): number => 22 + i * 44;
/** Empat kartu kecil dalam kotak `i`: dua baris dua kolom. */
const kartuIsi = (i: number): Obj[] => [0, 1, 2, 3].map((j) => kotak(`kk${i}${j}`, KX(i) + 5 + (j % 2) * 15, 86 + Math.floor(j / 2) * 13, 12, 10, i % 2 === 0 ? "#FEF3C7" : "#BFDBFE", W.coklat, { rx: 1.5, tebal: 0.9, z: 3 }));
const RAMAI: Obj[] = Array.from({ length: 36 }, (_, i) => bulat(`rm${i}`, 30 + (i % 14) * 18, 54 + Math.floor(i / 14) * 16, 3.6, i % 2 === 0 ? "#FDBA74" : "#93C5FD", "#7C2D12", { tebal: 0.8, z: 4 }));

export const ADEGAN_LUAR_RATA_TERAPAN: AdeganStory = {
  id: "luar-rata-terapan",
  judul: "Bagi Rata: kapan cocok",
  sumber: "Metode global: Equal Sharing (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Genta Membagi Kartu"), ...papanJatah("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("dua", teks("n24", 150, 54, "24 kartu", 12, W.merah)),
      tambah("enam", teks("n6", 240, 54, "6 kotak", 12, W.merah)),
      tambah("kotak", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`kt${i}`, KX(i), 80, 36, 34, "#E0F2FE", W.biru, { rx: 4, z: 1 }))),
    ),
    k(
      SUARA_T2,
      tambah("mendapat", ...[0, 1, 2, 3, 4, 5].flatMap((i) => kartuIsi(i))),
      tambah("empat", teks("n4", 150, 132, "4 kartu tiap kotak", 10, W.hijauTua)),
      tambah("sisa.", emo("ok", 262, 148, E.benar, 20), teks("ns", 215, 150, "tanpa sisa", 9, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ma", 120, 168, E.mata, 20)),
      tambah("dilihat", emo("tg", 170, 168, E.tangan, 20)),
      tambah("dipegang.", teks("ny", 230, 172, "benda nyata", 9, W.coklat)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kalau Sangat Banyak"), ...papanJatah("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("bilangannya", ...RAMAI),
      tambah("satu", teks("s1", 150, 118, "1 per 1", 10, W.coklat)),
      tambah("terlalu", teks("tl", 150, 140, "terlalu lama", 12, W.merah), emo("xs", 262, 148, E.salah, 20)),
    ),
  ],
};
