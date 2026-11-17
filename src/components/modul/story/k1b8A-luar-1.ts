import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, bulat, emo, judul, kartu, kotak, lingkaran, orang, pakPos, tanah, teks } from "./k1b8A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8A-bantu";

/* Video metode global Sub-Bab A "Kotak Cerita Berantakan": pembuka, Sorting Hoops (Lingkaran Pilah), dan terapannya. */

export const NAMA_METODE = ["Sorting Hoops", "One-to-One Matching", "Frequency Table"];
export const NAMA_METODE_ID = ["Lingkaran Pilah", "Pasangkan Satu-Satu", "Tabel Frekuensi"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Ketika merapikan kotak kartu peminjam, Igil menemukan tiga kartu bergambar terselip di dasarnya.";
const SUARA_O2 = "Pak Pos Pustaka tertawa. Itu kartu cara mencatat benda dari petugas pustaka zaman dulu!";
const SUARA_O3 = "Tiga cara itu: Sorting Hoops, One-to-One Matching, dan Frequency Table.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Lingkaran Pilah, Pasangkan Satu-Satu, dan Tabel Frekuensi.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu cara mencatat benda",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara mencatat benda"), tanah("tn", 150)),
      tambah("kotak", kotak("kl", 60, 104, 110, 46, "#D6A15E", W.coklat, { rx: 4, tebal: 2.4 }), kotak("kl2", 60, 104, 110, 8, "#B45309", W.coklat, { rx: 3, tebal: 1.6, z: 1 })),
      tambah("peminjam,", teks("kt", 115, 136, "kartu peminjam", 8.6, W.biru, { z: 2 })),
      tambah("Igil", ...orang("ig", 268, 176, E.igil, "Igil")),
      tambah("tiga", ...[E.bintang, E.hati, E.bulan].flatMap((e, i) => [kotak(`kk${i}`, 74 + i * 28, 84, 22, 28, W.putih, W.biru, { rx: 3, tebal: 1.4 }), emo(`ke${i}`, 85 + i * 28, 104, e, 14)])),
      tambah("terselip", ...kartu("tk", 190, 60, 90, 22, W.krem, ["3 kartu"], 9.4)),
    ),
    k(
      SUARA_O2,
      hapus(0, "tk-k", "tk-t0"),
      tambah("Pak", ...pakPos("pp", 222, 176)),
      tambah("tertawa.", emo("tw", 250, 140, E.tertawa, 24)),
      tambah("kartu", emo("kr", 200, 100, "\u{1F4C4}", 24)),
      tambah("zaman", ...kartu("zm", 150, 44, 140, 22, W.krem, ["cara dari zaman dulu"], 8.6)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      tambah(3, ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Sorting Hoops"], 11)),
      tambah(5, ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. One-to-One Matching"], 11)),
      tambah(8, ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Frequency Table"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah(4, ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Lingkaran Pilah"], 11)),
      tambah(6, ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Pasangkan Satu-Satu"], 11)),
      tambah(9, ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Tabel Frekuensi"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Sorting Hoops: konsep ------------------------------ */
const SUARA_H1 = "Cara pertama, Sorting Hoops, atau Lingkaran Pilah.";
const SUARA_H2 = "Letakkan lingkaran tali di tanah, satu lingkaran untuk satu jenis.";
const SUARA_H3 = "Masukkan setiap benda ke lingkaran jenisnya.";
const SUARA_H4 = "Setelah semua masuk, hitung isi tiap lingkaran.";

const LX = [56, 150, 244];
const LY = 96;
const WARNA_L = ["#FEF9C3", "#FBCFE8", "#DBEAFE"];
const E_BENDA = [E.bintang, E.hati, E.bulan];
/** Posisi benda di dalam lingkaran (relatif pusat). */
const DALAM = [[-13, -11], [13, -11], [-13, 12], [13, 12]];
/** Benda berserakan di rumput: nomor 0 sampai 8, urut bintang, hati, bulan tetapi letaknya diacak. */
const SEBAR_H: [number, number][] = [[30, 168], [64, 182], [96, 160], [128, 178], [160, 164], [192, 184], [224, 162], [256, 176], [284, 160]];
const URUT_ACAK = [0, 4, 7, 2, 5, 8, 1, 3, 6];
const bendaKe = (n: number): number => (n < 4 ? 0 : n < 7 ? 1 : 2);
const nomorDalam = (n: number): number => (n < 4 ? n : n < 7 ? n - 4 : n - 7);

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Sorting Hoops: lingkaran pilah",
  sumber: "Metode global: Sorting Hoops",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(0), tanah("tn", 124)),
      tambah("Sorting", ...URUT_ACAK.flatMap((n, s) => [emo(`bd${n}`, SEBAR_H[s][0], SEBAR_H[s][1], E_BENDA[bendaKe(n)], 17)])),
      tambah("Lingkaran", ...kartu("lc", 60, 64, 180, 40, W.putih, ["Lingkaran Pilah"], 15)),
    ),
    k(
      SUARA_H2,
      hapus(0, "lc-k", "lc-t0"),
      tambah("lingkaran", ...LX.map((x, i) => lingkaran(`ln${i}`, x, LY, 34, WARNA_L[i]))),
      tambah("tali", ...LX.map((x, i) => bulat(`lt${i}`, x, LY, 28, "none", "#D97706", { tebal: 1.2, op: 0.6, z: -1 }))),
      tambah("jenis.", ...LX.map((x, i) => teks(`jn${i}`, x, 55, `jenis ${i + 1}`, 8.4, WK.bingkai))),
    ),
    k(
      SUARA_H3,
      ...[0, 1, 2, 3].map((n) => ubah("benda", { id: `bd${n}`, x: LX[0] + DALAM[n][0], y: LY + DALAM[n][1] + 5 })),
      ...[4, 5, 6].map((n) => ubah("lingkaran", { id: `bd${n}`, x: LX[1] + DALAM[nomorDalam(n)][0], y: LY + DALAM[nomorDalam(n)][1] + 5 })),
      ...[7, 8].map((n) => ubah("jenisnya.", { id: `bd${n}`, x: LX[2] + DALAM[nomorDalam(n)][0], y: LY + DALAM[nomorDalam(n)][1] + 5 })),
    ),
    k(
      SUARA_H4,
      tambah("hitung", teks("hc0", LX[0], 146, "4", 14, W.merah)),
      tambah("isi", teks("hc1", LX[1], 146, "3", 14, W.merah)),
      tambah("tiap", teks("hc2", LX[2], 146, "2", 14, W.merah)),
      sorotkan("lingkaran.", "ln0", "ln1", "ln2"),
    ),
  ],
};

/* ------------------------------ 3. Sorting Hoops: terapan ------------------------------ */
const SUARA_I1 = "Abang memilah stempel pustaka ke tiga lingkaran. Bintang lima, hati tiga, bulat dua.";
const SUARA_I2 = "Semuanya sepuluh stempel, dan yang paling banyak adalah bintang.";
const SUARA_I3 = "Cocok kalau bendanya kecil dan bisa dipindahkan, supaya yang sejenis berkumpul.";
const SUARA_I4 = "Kurang cocok kalau bendanya berat atau tidak bisa dipindahkan, misalnya pohon di halaman.";

const E_STEMPEL = [E.bintang, E.hati, E.biru];
const ISI5: [number, number][] = [[-13, -11], [13, -11], [0, 1], [-13, 13], [13, 13]];
const isiLingkaran = (n: number): [number, number][] => (n === 5 ? ISI5 : (DALAM.slice(0, n) as [number, number][]));
const stempel = (j: number, n: number, y = LY): Obj[] => isiLingkaran(n).map(([dx, dy], i) => emo(`st${j}${i}`, LX[j] + dx, y + dy + 5, E_STEMPEL[j], 15));

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Lingkaran pilah: stempel pustaka",
  sumber: "Metode global: Sorting Hoops, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, ...kepala(0), tanah("tn", 138)),
      tambah("Abang", ...orang("ab", 150, 176, E.abang, "Abang")),
      tambah("tiga", ...LX.map((x, i) => lingkaran(`ln${i}`, x, LY, 34, WARNA_L[i]))),
      tambah("tiga", ...kartu("l3", 8, 150, 84, 18, W.krem, ["3 lingkaran"], 8.6)),
      tambah("lima,", ...stempel(0, 5), teks("sc0", LX[0], 146, "5", 14, W.merah)),
      tambah("tiga@2", ...stempel(1, 3), teks("sc1", LX[1], 146, "3", 14, W.merah)),
      tambah("dua.", ...stempel(2, 2), teks("sc2", LX[2], 146, "2", 14, W.merah)),
    ),
    k(
      SUARA_I2,
      hapus(0, "l3-k", "l3-t0"),
      tambah("sepuluh", ...kartu("sp", 194, 150, 92, 18, W.putih, ["10 stempel"], 9.4)),
      sorotkan("bintang.", "ln0"),
      tambah("banyak", teks("pb", LX[0], 58, "paling banyak", 8, W.merah)),
    ),
    k(
      SUARA_I3,
      hapus(0, "sp-k", "sp-t0", "pb", "sc0", "sc1", "sc2"),
      ubah(0, { id: "ln0", sorot: false }),
      tambah("Cocok", emo("ok", 262, 176, E.benar, 28)),
      tambah("kecil", ...kartu("kc", 24, 150, 118, 18, W.hijauMuda, ["kecil, bisa dipindah"], 8.6)),
      sorotkan("berkumpul.", "ln0", "ln1", "ln2"),
    ),
    k(
      SUARA_I4,
      bersih(0),
      tambah(0, ...kepala(0), tanah("tn", 150)),
      tambah("berat", ...kartu("br", 150, 70, 130, 22, W.merahMuda, ["berat atau tertanam"], 8.6)),
      tambah("dipindahkan,", emo("sl", 112, 100, E.salah, 30)),
      tambah("pohon", emo("ph", 62, 112, E.pohon, 46)),
      tambah("halaman.", teks("hl", 62, 168, "pohon di halaman", 8.4, W.biru)),
    ),
  ],
};
