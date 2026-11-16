import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, gambarTokoh, hapus, k, kotak, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { IGIL, LINTANG, NIKO, TALA, benda, lambang, rumput } from "./kit/dunia-k1";
import {
  APEL,
  LATAR_KEBUN,
  LATAR_TERANG,
  U_APEL,
  WARNA_JALUR,
  anak,
  bingkaiSepuluh,
  idBenda,
  idBingkai,
  idPenghitung,
  jalurDi,
  judulLangkah,
  kainTutup,
  keNampan,
  keRumput,
  keranjangKebun,
  nampan,
  penghitung,
  posSebar,
  slotKr,
} from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 6): langkah ISI (nampan berlubang sepuluh, sekilas), membaca lambang, dan label dari Niko. */

const apelRumput = (dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, i) => benda("a" + (dari + i), posSebar(dari + i - 1)[0], posSebar(dari + i - 1)[1], APEL, U_APEL));
const ubahCn = (kata: number, n: number) => ubah(kata, { id: "cn-t", isi: String(n) });

/* ------------------------------ ISI: nampan Nenek berlubang sepuluh, dari kosong sampai penuh ------------------------------ */
export const ADEGAN_ISI: AdeganStory = {
  id: "isi",
  judul: "Isi: nampan berlubang sepuluh",
  sumber: "Metode: isi Bingkai Sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Ini Bingkai Sepuluh, nampan Nenek.",
      tambah(0, rumput(150), nampan(), ...bingkaiSepuluh(), ...anak(LINTANG, 30), ...apelRumput(1, 10), judulLangkah("ISI")),
      tambah(1, teks("bs", 150, 150, "Bingkai Sepuluh", 10, W.ungu)),
      tambah(2, ...penghitung("10")),
    ),
    k("Nampan masih kosong. Nol.", ubahCn(3, 0)),
    k(
      "Lintang mengisi dari kiri atas. Satu, dua, tiga, empat, lima.",
      ...[1, 2, 3, 4, 5].flatMap((n) => [keNampan(4 + n, n), ubahCn(4 + n, n)]),
    ),
    k("Baris bawah. Enam, tujuh, delapan, sembilan, sepuluh.", ...[6, 7, 8, 9, 10].flatMap((n) => [keNampan(n - 4, n), ubahCn(n - 4, n)])),
    k("Satu petak, satu apel.", sorotkan(1, ...idBingkai), sorotkan(3, ...idBenda("a", 10))),
    k("Nampan penuh. Banyaknya sepuluh.", redamkan(0, ...idBingkai, ...idBenda("a", 10)), tambah(1, emo("ck", 268, 100, "\u{2705}", 28))),
  ],
};

/* ------------------------------ ISI: mengenali sekilas tiga, satu, empat; apel ditutup sebelum ditebak, lalu diperiksa ------------------------------ */
/** Satu putaran: apel tampil sekitar satu setengah detik, ditutup kain, lalu kain dibuka dan apel dihitung satu per satu. */
const putaran = (n: number, prev: number | null, suara: string, awal: boolean) => {
  const lama = prev === null ? [] : idBenda("a", prev);
  return k(
    suara,
    ...(awal ? [tambah(0, rumput(150), nampan(), ...bingkaiSepuluh(), ...anak(TALA, 30), ...apelRumput(1, 10))] : [hapus(0, ...idPenghitung), ...lama.map((_, i) => keRumput(0, i + 1)), ubah(0, ...lama.map((id) => ({ id, sorot: false })))]),
    ...idBenda("a", n).map((_, i) => keNampan(awal ? 0 : 1, i + 1)),
    tambah(3, kainTutup()),
    hapus(5, "tt"),
    tambah(6, ...penghitung("1")),
    ...idBenda("a", n).flatMap((id, i) => [ubah(6 + i, { id, sorot: true }, ...(i > 0 ? [{ id: "a" + i, sorot: false }] : []), { id: "cn-t", isi: String(i + 1) })]),
  );
};

export const ADEGAN_SEKILAS: AdeganStory = {
  id: "sekilas",
  judul: "Isi: lihat sekilas, ditutup, lalu periksa",
  sumber: "Metode: kenali sekilas, periksa dengan hitung",
  latar: LATAR_TERANG,
  ketukan: [
    putaran(3, null, "Lihat sekilas. Tala menutup! Kita periksa. Satu, dua, tiga.", true),
    putaran(1, 3, "Lihat sekilas. Tala menutup! Kita periksa. Satu apel.", false),
    putaran(4, 1, "Lihat sekilas. Tala menutup! Kita periksa. Satu, dua, tiga, empat.", false),
  ],
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
const CONTOH = ["lx1-k", "lx1-t", "lx2-k", "lx2-t", "lx3-k", "lx3-t"];

export const ADEGAN_BACA: AdeganStory = {
  id: "baca",
  judul: "Baca: lambang nol sampai sepuluh",
  sumber: "Metode: baca lambang nol sampai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Lintang bertanya, tulisan ini apa?",
      tambah(0, kotak("pp", 14, 30, 272, 90, W.putih, W.biru, { rx: 10 }), ...gambarTokoh(IGIL, 30, 150), ...gambarTokoh(LINTANG, 270, 150)),
      tambah(2, ...lambang("lx1", 30, 44, "2", 60, 60, 40), ...lambang("lx2", 120, 44, "5", 60, 60, 40), ...lambang("lx3", 210, 44, "8", 60, 60, 40)),
    ),
    k("Igil berkata, lambang bilangan.", sorotkan(0, "tk-igil"), sorotkan(2, "lx1-k", "lx2-k", "lx3-k")),
    k(
      "Nol, satu, dua, tiga, empat, lima.",
      hapus(0, "pp", ...CONTOH),
      ubah(0, { id: "tk-igil", sorot: false }),
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

/* ------------------------------ Label dari Niko: satu kesalahan lucu (sembilan untuk enam), Niko sendiri yang menyadari ------------------------------ */
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
        ...[5, 6, 7, 8, 9, 10].map((n) => benda("a" + n, slotKr(n - 5)[0], slotKr(n - 5)[1], APEL, U_APEL)),
        ...apelRumput(1, 4),
        kotak("bp", 196, 6, 68, 94, W.putih, W.coklat, { rx: 8, tebal: 1.8 }),
      ),
      tambah(3, ...penghitung("6")),
      tambah(6, emo("jr", 282, 72, "\u{1F446}", 26)),
      tambah(7, { id: "jl-x", t: "jalur", x: OX_LABEL, y: OY_LABEL, d: JALUR_SALAH, warna: "none", garis: WARNA_JALUR[0], tebal: 6, gambar: true, sorot: true }),
    ),
    k("Niko berkata, lingkarannya di atas. Eh, itu sembilan!", tambah(5, emo("sl", 230, 56, "\u{274C}", 28)), tambah(7, ...lambang("nm", 100, 28, "9", 36, 36, 24))),
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
