import type { Aksi, AdeganStory, KetukanStory, Obj } from "./logika-story";
import { W, bulat, emo, gambarTokoh, hapus, kotak, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { BENDA, IGIL, LINTANG, NIKO, TALA, benda, keranjang, lambang, rumput } from "./kit/dunia-k1";
import {
  APEL,
  LATAR_KEBUN,
  LATAR_TERANG,
  U_APEL,
  anak,
  bingkaiSepuluh,
  habisTitik,
  hitungBenda,
  idBenda,
  nampan,
  penghitung,
  petak,
  pilihanAngka,
  posSebar,
  tandaTanya,
  titikMundur,
} from "./o2k1a-bantu";

/**
 * Video Sub-Bab A (bagian 4): empat latihan. Tiap latihan: "Coba jawab dulu", pertanyaan dengan pilihan yang dibacakan (kartu berwarna beda),
 * jeda berpikir dua ketukan (titik hitung mundur, lalu "Tiga, dua, satu."), dan pembahasan. Angka jawaban baru tampil sesudah hitungan.
 */

const BINGKAI_SEPULUH = (): Obj => teks("bs", 150, 150, "Bingkai Sepuluh", 10, W.ungu);

/** Jeda pertama: titik kuning habis satu per satu dan jam pasir. `qm` (tanda tanya) diganti jam pasir di (xj, yj). */
const jedaA = (xt: number, yt: number, xj: number, yj: number, ekstra: string[] = [], awal: Aksi[] = []): KetukanStory => ({
  suara: "Tunggu sebentar. Pikirkan dulu.",
  aksi: [...awal, hapus(0, "qm", ...ekstra), tambah(0, ...titikMundur(xt, yt), emo("jm", xj, yj, "⏳", 30)), ...habisTitik()],
});
/** Jeda kedua: angka tiga, dua, satu tampil bergantian. */
const jedaB = (x: number, y: number): KetukanStory => ({
  suara: "Tiga, dua, satu. Sudah?",
  aksi: [tambah(0, teks("tg", x, y, "3", 26, W.merah)), ubah(1, { id: "tg", isi: "2" }), ubah(2, { id: "tg", isi: "1" }), hapus(3, "tg", "jm")],
});

/* ------------------------------ Latihan pertama: hitung apel di dalam keranjang saja (enam di keranjang, empat di rumput) ------------------------------ */
const DI_KERANJANG: [number, number][] = [[146, 84], [172, 82], [198, 84], [224, 86], [158, 106], [206, 106]];
const DI_RUMPUT: [number, number][] = [[30, 134], [62, 148], [94, 134], [140, 150]];

export const ADEGAN_LATIHAN_1: AdeganStory = {
  id: "latihan-1",
  judul: "Latihan pertama: apel di keranjang",
  sumber: "Latihan: menghitung apel di keranjang",
  latar: LATAR_KEBUN,
  ketukan: [
    {
      suara: "Latihan pertama. Coba jawab dulu.",
      aksi: [
        tambah(
          0,
          rumput(120),
          kotak("mj", 112, 48, 148, 72, "#FDE68A", W.coklat, { rx: 10 }),
          ...gambarTokoh(LINTANG, 40, 40),
          ...keranjang("kr", 130, 56, 110, 56),
          ...DI_KERANJANG.map(([x, y], i) => benda("a" + (i + 1), x, y, APEL, U_APEL)),
          ...DI_RUMPUT.map(([x, y], i) => benda("a" + (i + 7), x, y, APEL, U_APEL)),
        ),
      ],
    },
    {
      suara: "Ada berapa apel di keranjang saja? Sepuluh, empat, atau enam?",
      aksi: [sorotkan(4, "mj"), tambah(1, ...pilihanAngka(["10", "4", "6"]), tandaTanya("qm", 272, 70))],
    },
    jedaA(150, 28, 272, 70, [], [redamkan(0, "mj")]),
    jedaB(150, 34),
    {
      suara: "Satu, dua, tiga, empat, lima, enam. Jawabannya enam.",
      aksi: [tambah(0, ...penghitung("1", 258, 8)), ...hitungBenda(idBenda("a", 6)), redamkan(6, "a6"), ubah(6, { id: "c3-k", sorot: true })],
    },
  ],
};

/* ------------------------------ Latihan kedua: Bingkai Sepuluh kosong, pilihan satu, nol, sepuluh (menguji nol) ------------------------------ */
const apelRumput = (): Obj[] => Array.from({ length: 10 }, (_, i) => benda("a" + (i + 1), posSebar(i)[0], posSebar(i)[1], APEL, U_APEL));

export const ADEGAN_LATIHAN_2: AdeganStory = {
  id: "latihan-2",
  judul: "Latihan kedua: Bingkai Sepuluh kosong",
  sumber: "Latihan: nampan kosong, nol",
  latar: LATAR_TERANG,
  ketukan: [
    { suara: "Latihan kedua. Coba jawab dulu.", aksi: [tambah(0, rumput(150), nampan(), ...bingkaiSepuluh(), ...anak(NIKO, 30, 112), ...apelRumput(), BINGKAI_SEPULUH())] },
    {
      suara: "Ada berapa apel di Bingkai Sepuluh? Satu, nol, atau sepuluh?",
      aksi: [sorotkan(4, "nmp"), tambah(1, ...pilihanAngka(["1", "0", "10"], 44, 22, 10), tandaTanya("qm", 270, 100))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [redamkan(0, "nmp"), hapus(0, "qm"), tambah(0, ...titikMundur(10, 70), emo("jm", 270, 100, "⏳", 30)), ...habisTitik()] },
    jedaB(270, 62),
    { suara: "Tidak ada apel di nampan. Jawabannya nol.", aksi: [sorotkan(3, "nmp"), ubah(5, { id: "c2-k", sorot: true })] },
  ],
};

/* ------------------------------ Latihan ketiga: Igil menunjuk lambang sembilan, apa namanya? ------------------------------ */
export const ADEGAN_LATIHAN_3: AdeganStory = {
  id: "latihan-3",
  judul: "Latihan ketiga: nama lambang sembilan",
  sumber: "Latihan: membaca lambang sembilan",
  latar: LATAR_TERANG,
  ketukan: [
    { suara: "Latihan ketiga. Coba jawab dulu.", aksi: [tambah(0, ...gambarTokoh(IGIL, 36, 24), emo("bk", 80, 34, "\u{1F4AD}", 24))] },
    {
      suara: "Igil menunjuk lambang ini. Apa namanya? Sembilan, tujuh, atau enam?",
      aksi: [tambah(3, ...lambang("lb", 112, 14, "9", 76, 70, 52)), tambah(6, ...pilihanAngka(["sembilan", "tujuh", "enam"], 72, 14))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [tambah(0, ...titikMundur(212, 40), emo("jm", 270, 80, "⏳", 28)), ...habisTitik()] },
    jedaB(240, 52),
    {
      suara: "Lingkaran di atas, garis turun. Namanya sembilan.",
      aksi: [tambah(0, bulat("mk", 150, 36, 16, "none", W.merah, { tebal: 2.5 })), ubah(6, { id: "c1-k", sorot: true })],
    },
  ],
};

/* ------------------------------ Latihan keempat: tujuh bunga di Bingkai Sepuluh ------------------------------ */
export const ADEGAN_LATIHAN_4: AdeganStory = {
  id: "latihan-4",
  judul: "Latihan keempat: bunga di bingkai",
  sumber: "Latihan: bunga di bingkai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    {
      suara: "Latihan keempat. Coba jawab dulu.",
      aksi: [tambah(0, nampan(), ...anak(TALA, 30), ...gambarTokoh(LINTANG, 272, 40), ...bingkaiSepuluh(), ...idBenda("f", 7).map((id, i) => benda(id, petak(i)[0], petak(i)[1], BENDA.bunga, 24)), BINGKAI_SEPULUH())],
    },
    {
      suara: "Ada berapa bunga di Bingkai Sepuluh? Tujuh, sembilan, atau delapan?",
      aksi: [tambah(1, ...pilihanAngka(["7", "9", "8"]), tandaTanya("qm", 268, 132))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [hapus(0, "qm"), tambah(0, ...titikMundur(130, 28), emo("jm", 268, 132, "⏳", 30)), ...habisTitik()] },
    jedaB(150, 34),
    {
      suara: "Satu, dua, tiga, empat, lima, enam, tujuh. Jawabannya tujuh.",
      aksi: [tambah(0, ...penghitung("1")), ...hitungBenda(idBenda("f", 7)), redamkan(7, "f7"), ubah(7, { id: "c1-k", sorot: true })],
    },
  ],
};
