import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, gambarTokoh, hapus, k, kotak, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { IGIL, NIKO, TALA, benda, lambang, rumput } from "./kit/dunia-k1";
import {
  APEL,
  BK,
  LATAR_KEBUN,
  LATAR_TERANG,
  U_APEL,
  WARNA_JALUR,
  anak,
  bingkaiSepuluh,
  hitungBenda,
  idBenda,
  idBingkai,
  idPenghitung,
  isiPetak,
  jalurDi,
  keranjangKebun,
  penghitung,
  petak,
  slotKr,
  tandaTanya,
} from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 6): langkah ISI (nampan berlubang sepuluh, sekilas), membaca lambang, dan label dari Niko. */

/* ------------------------------ ISI: nampan Nenek berlubang sepuluh ------------------------------ */
const nampan = (): Obj => kotak("nmp", 57, 72, 186, 84, "#D9A441", W.coklat, { rx: 10, tebal: 1.8 });
const apelNampan = (dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, i) => benda("f" + (dari + i), petak(dari + i - 1)[0], petak(dari + i - 1)[1], APEL, 24));

export const ADEGAN_ISI: AdeganStory = {
  id: "isi",
  judul: "Isi: nampan berlubang sepuluh",
  sumber: "Metode: isi bingkai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    k("Nampan Nenek ini bingkai sepuluh.", tambah(0, nampan(), ...bingkaiSepuluh(), ...anak(TALA, 30)), tambah(4, ...penghitung("10"))),
    k("Isi dari baris atas, kiri ke kanan.", tambah(3, emo("pk", petak(0)[0], BK.y - 12, "\u{1F447}", 24)), ubah(6, { id: "pk", x: petak(4)[0] })),
    k("Satu, dua, tiga, empat, lima, enam.", hapus(0, "pk"), ...[1, 2, 3, 4, 5, 6].flatMap((n) => isiPetak(n - 1, n, APEL))),
    k("Banyaknya apel sama dengan petak yang terisi.", sorotkan(1, ...idBenda("f", 6)), sorotkan(4, ...idBingkai.slice(0, 6))),
    k("Nampan penuh. Banyaknya sepuluh.", redamkan(0, ...idBenda("f", 6), ...idBingkai.slice(0, 6)), tambah(1, ...apelNampan(7, 10)), ubah(3, { id: "cn-t", isi: "10" })),
    k("Nampan kosong. Banyaknya nol.", hapus(1, ...idBenda("f", 10)), ubah(3, { id: "cn-t", isi: "0" })),
  ],
};

/* ------------------------------ ISI: mengenali sekilas dua, tiga, empat, lalu memeriksa dengan menghitung ------------------------------ */
const PERIKSA: Record<number, string> = { 2: "Kita periksa. Satu, dua.", 3: "Kita periksa. Satu, dua, tiga.", 4: "Kita periksa. Satu, dua, tiga, empat." };

/** Satu putaran: apel tampil sebentar lalu hilang (ketukan pertama), lalu diperiksa dengan menghitung satu per satu (ketukan kedua). */
const putaran = (n: number, prev: number | null, awal: boolean) => {
  const ids = idBenda("f", n);
  const lama = prev === null ? [] : [...idBenda("f", prev), ...idPenghitung];
  return [
    k(
      "Lihat sekilas. Berapa apelnya?",
      ...(awal ? [tambah(0, nampan(), ...bingkaiSepuluh(), ...anak(TALA, 30))] : []),
      ...(lama.length ? [hapus(0, ...lama)] : []),
      tambah(0, ...apelNampan(1, n)),
      hapus(2, ...ids),
      tambah(3, tandaTanya("qm", 268, 100)),
    ),
    k(PERIKSA[n], hapus(0, "qm"), tambah(1, ...apelNampan(1, n)), tambah(2, ...penghitung("1")), ...hitungBenda(ids, 2)),
  ];
};

export const ADEGAN_SEKILAS: AdeganStory = {
  id: "sekilas",
  judul: "Isi: lihat sekilas lalu periksa",
  sumber: "Metode: kenali sekilas, periksa dengan hitung",
  latar: LATAR_TERANG,
  ketukan: [...putaran(2, null, true), ...putaran(3, 2, false), ...putaran(4, 3, false)],
};

/* ------------------------------ Membaca lambang nol sampai sepuluh ------------------------------ */
/** Kartu lambang kecil dengan n titik di bawahnya (dua kolom). Id awalan-k, awalan-t, awalan-d1 sampai awalan-dn. */
const kartuBaca = (id: string, x: number, y: number, n: number, w = 40, h = 34, u = 18): Obj[] => [
  kotak(id + "-k", x, y, w, h, W.krem, W.biru, { rx: 6, tebal: 1.6 }),
  teks(id + "-t", x + w / 2, y + h / 2 + u * 0.35, String(n), u, W.merah),
  ...Array.from({ length: n }, (_, i) => bulat(id + "-d" + (i + 1), x + w / 2 + (i % 2 === 0 ? -6 : 6), y + h + 10 + Math.floor(i / 2) * 8, 2.8, W.merah, W.merah, { tebal: 0.5 })),
];
const idKartuBaca = (id: string, n: number): string[] => [id + "-k", id + "-t", ...Array.from({ length: n }, (_, i) => id + "-d" + (i + 1))];
const BARIS_KARTU = 34;

export const ADEGAN_BACA: AdeganStory = {
  id: "baca",
  judul: "Baca: lambang nol sampai sepuluh",
  sumber: "Metode: baca lambang nol sampai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Lambang bilangan adalah tulisan angkanya.",
      tambah(0, kotak("pp", 14, 30, 272, 90, W.putih, W.biru, { rx: 10 }), ...gambarTokoh(IGIL, 30, 150)),
      tambah(4, ...lambang("lx1", 30, 44, "2", 60, 60, 40), ...lambang("lx2", 120, 44, "5", 60, 60, 40), ...lambang("lx3", 210, 44, "8", 60, 60, 40)),
    ),
    k(
      "Nol, satu, dua, tiga, empat, lima.",
      hapus(0, "pp", "lx1-k", "lx1-t", "lx2-k", "lx2-t", "lx3-k", "lx3-t"),
      ...[0, 1, 2, 3, 4, 5].flatMap((n) => [tambah(n, ...kartuBaca("q" + n, 14 + 46 * n, BARIS_KARTU, n)), ubah(n, { id: "q" + n + "-k", sorot: true }, ...(n > 0 ? [{ id: "q" + (n - 1) + "-k", sorot: false }] : []))]),
    ),
    k(
      "Enam, tujuh, delapan, sembilan, sepuluh.",
      hapus(0, ...[0, 1, 2, 3, 4, 5].flatMap((n) => idKartuBaca("q" + n, n))),
      ...[6, 7, 8, 9, 10].flatMap((n, i) => [tambah(i, ...kartuBaca("q" + n, 30 + 50 * i, BARIS_KARTU, n)), ubah(i, { id: "q" + n + "-k", sorot: true }, ...(i > 0 ? [{ id: "q" + (n - 1) + "-k", sorot: false }] : []))]),
    ),
    k(
      "Sekarang dicampur. Enam, tiga, sembilan, nol.",
      hapus(0, ...[6, 7, 8, 9, 10].flatMap((n) => idKartuBaca("q" + n, n))),
      ...[6, 3, 9, 0].flatMap((n, i) => [tambah(2 + i, ...kartuBaca("r" + n, 22 + 72 * i, BARIS_KARTU, n)), ubah(2 + i, { id: "r" + n + "-k", sorot: true }, ...(i > 0 ? [{ id: "r" + [6, 3, 9, 0][i - 1] + "-k", sorot: false }] : []))]),
    ),
    k(
      "Enam dan sembilan mirip. Lihat lingkarannya.",
      hapus(0, ...[6, 3, 9, 0].flatMap((n) => idKartuBaca("r" + n, n))),
      tambah(0, ...lambang("b6", 70, 40, "6", 64, 64, 46)),
      tambah(2, ...lambang("b9", 166, 40, "9", 64, 64, 46)),
      tambah(4, bulat("m6", 102, 82, 12, "none", W.merah, { tebal: 2.5 })),
      tambah(5, bulat("m9", 198, 62, 12, "none", W.merah, { tebal: 2.5 })),
    ),
  ],
};

/* ------------------------------ Label dari Niko: satu kesalahan lucu (sembilan padahal enam), dibetulkan Tala ------------------------------ */
/** Enam diputar setengah putaran: satu goresan yang terbaca sembilan. */
const JALUR_SALAH = "M12 88 C40 80 52 48 52 26 C52 0 4 0 4 26 C4 48 42 48 52 26";
const OX_LABEL = 202;
const OY_LABEL = 8;

export const ADEGAN_LABEL: AdeganStory = {
  id: "label",
  judul: "Tulis: label dari Niko",
  sumber: "Metode: tulis label untuk keranjang",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Di keranjang ada enam apel. Niko menulis labelnya.",
      tambah(
        0,
        rumput(150),
        ...anak(NIKO, 34),
        ...anak(TALA, 86),
        ...keranjangKebun(),
        ...Array.from({ length: 6 }, (_, i) => benda("a" + (i + 1), slotKr(i)[0], slotKr(i)[1], APEL, U_APEL)),
        kotak("bp", 196, 6, 68, 94, W.putih, W.coklat, { rx: 8, tebal: 1.8 }),
      ),
      tambah(3, ...penghitung("6")),
      tambah(6, emo("jr", 282, 72, "\u{1F446}", 26)),
      tambah(7, { id: "jl-x", t: "jalur", x: OX_LABEL, y: OY_LABEL, d: JALUR_SALAH, warna: "none", garis: WARNA_JALUR[0], tebal: 6, gambar: true, sorot: true }),
    ),
    k("Tala menunjuk. Itu sembilan, bukan enam.", tambah(3, ...lambang("nm", 100, 28, "9", 36, 36, 24)), tambah(4, emo("sl", 230, 56, "\u{274C}", 28))),
    k(
      "Niko menulis lagi. Lengkung turun, lingkaran bawah.",
      hapus(0, "jl-x", "sl", "nm-k", "nm-t"),
      tambah(3, { ...jalurDi("6", 0, OX_LABEL, OY_LABEL), sorot: true }),
      ubah(5, { id: "jl-6-0", sorot: false }),
      tambah(5, { ...jalurDi("6", 1, OX_LABEL, OY_LABEL), sorot: true }),
    ),
    k("Sekarang benar. Labelnya enam.", ubah(0, { id: "jl-6-1", sorot: false }), tambah(1, emo("ok", 230, 56, "\u{2705}", 30))),
  ],
};
