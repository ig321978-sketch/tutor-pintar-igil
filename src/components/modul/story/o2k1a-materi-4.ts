import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, gambarTokoh, hapus, kotak, panah, redamkan, sorotkan, tambah, ubah } from "./kit/dasar";
import { BENDA, IGIL, TALA, benda, keranjang, lambang, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, LATAR_TERANG, U_APEL, anak, bingkaiSepuluh, habisTitik, hitungBenda, idApel, idBenda, idPenghitung, penghitung, petak, pilihanAngka, tandaTanya, titikMundur } from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 4): empat latihan. Tiap latihan: "Coba jawab dulu", jeda (hitung mundur visual), lalu pembahasan dengan menghitung. */

/* ------------------------------ Latihan pertama: hitung apel di dalam keranjang saja ------------------------------ */
const DI_KERANJANG: [number, number][] = [[146, 84], [172, 82], [198, 84], [224, 86], [158, 106], [206, 106]];
const DI_RUMPUT: [number, number][] = [[30, 134], [60, 144], [90, 132]];

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
          ...keranjang("kr", 130, 56, 110, 56),
          ...DI_KERANJANG.map(([x, y], i) => benda(`a${i + 1}`, x, y, APEL, U_APEL)),
          ...DI_RUMPUT.map(([x, y], i) => benda(`o${i + 1}`, x, y, APEL, U_APEL)),
        ),
      ],
    },
    { suara: "Ada berapa apel di keranjang saja?", aksi: [sorotkan(4, "mj"), tambah(1, ...pilihanAngka(["5", "7", "6"]), tandaTanya("qm", 272, 70))] },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [redamkan(0, "mj"), hapus(0, "qm"), tambah(0, ...titikMundur(30, 30), emo("jm", 272, 70, "⏳", 32)), ...habisTitik()] },
    {
      suara: "Satu, dua, tiga, empat, lima, enam.",
      aksi: [hapus(0, "jm"), tambah(0, ...penghitung("1")), ...hitungBenda(idApel(1, 6))],
    },
    { suara: "Yang terakhir enam. Jawabannya enam.", aksi: [redamkan(0, "a6"), ubah(3, { id: "c3-k", sorot: true })] },
  ],
};

/* ------------------------------ Latihan kedua: Igil menunjuk lambang delapan ------------------------------ */
const KARTU_X = [8, 106, 204];
const WARNA_KARTU = ["#DBEAFE", "#DCFCE7", "#FEF9C3"];
const GARIS_KARTU = [W.nila, W.hijau, W.oranye];
const BANYAK_KARTU = [4, 8, 6];
const kartuApel = (): Obj[] => [
  ...KARTU_X.map((x, g) => kotak(`c${g + 1}-k`, x, 108, 88, 62, WARNA_KARTU[g], GARIS_KARTU[g], { rx: 8, tebal: 2 })),
  ...KARTU_X.flatMap((x, g) => Array.from({ length: BANYAK_KARTU[g] }, (_, i) => benda(`g${g + 1}-${i + 1}`, x + 14 + (i % 5) * 15.5, i < 5 ? 136 : 158, APEL, 15))),
];

export const ADEGAN_LATIHAN_2: AdeganStory = {
  id: "latihan-2",
  judul: "Latihan kedua: lambang delapan",
  sumber: "Latihan: memilih kumpulan delapan",
  latar: LATAR_TERANG,
  ketukan: [
    { suara: "Latihan kedua. Coba jawab dulu.", aksi: [tambah(0, ...gambarTokoh(IGIL, 36, 24), ...kartuApel())] },
    {
      suara: "Igil menunjuk lambang delapan. Pilih kumpulannya.",
      aksi: [tambah(3, ...lambang("lb", 112, 14, "8", 76, 70, 52)), tambah(4, panah("pn", 150, 88, 0, 18, W.merah, 3))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [hapus(0, "pn"), tambah(0, ...titikMundur(212, 40), emo("jm", 270, 80, "⏳", 28)), ...habisTitik()] },
    {
      suara: "Kumpulan tengah. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.",
      aksi: [hapus(0, "jm"), tambah(2, ...penghitung("1", 252, 18)), ...hitungBenda(idBenda("g2-", 8), 2)],
    },
    {
      suara: "Kumpulan tengah delapan. Lainnya bukan.",
      aksi: [hapus(0, ...idPenghitung), redamkan(0, "g2-8"), ubah(1, { id: "c2-k", sorot: true }), ubah(3, { id: "c1-k", op: 0.45 }, { id: "c3-k", op: 0.45 })],
    },
  ],
};

/* ------------------------------ Latihan ketiga: Igil menunjuk lambang sembilan, apa namanya? ------------------------------ */
export const ADEGAN_LATIHAN_3: AdeganStory = {
  id: "latihan-3",
  judul: "Latihan ketiga: nama lambang sembilan",
  sumber: "Latihan: membaca lambang sembilan",
  latar: LATAR_TERANG,
  ketukan: [
    { suara: "Latihan ketiga. Coba jawab dulu.", aksi: [tambah(0, ...gambarTokoh(IGIL, 36, 24), emo("bk", 80, 34, "💭", 24))] },
    {
      suara: "Igil menunjuk lambang ini. Apa namanya?",
      aksi: [tambah(3, ...lambang("lb", 112, 14, "9", 76, 70, 52)), tambah(5, ...pilihanAngka(["sembilan", "tujuh", "enam"], 72, 14))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [tambah(0, ...titikMundur(212, 40), emo("jm", 270, 80, "⏳", 28)), ...habisTitik()] },
    {
      suara: "Lingkaran di atas, garis turun. Namanya sembilan.",
      aksi: [hapus(0, "jm"), tambah(0, bulat("mk", 150, 36, 16, "none", W.merah, { tebal: 2.5 })), ubah(6, { id: "c1-k", sorot: true })],
    },
    {
      suara: "Lingkaran di bawah, namanya enam.",
      aksi: [hapus(0, "mk"), tambah(0, ...lambang("l6", 212, 18, "6", 60, 56, 40)), tambah(2, bulat("m6", 242, 60, 12, "none", W.merah, { tebal: 2.5 }))],
    },
  ],
};

/* ------------------------------ Latihan keempat: tujuh bunga di bingkai sepuluh ------------------------------ */
export const ADEGAN_LATIHAN_4: AdeganStory = {
  id: "latihan-4",
  judul: "Latihan keempat: bunga di bingkai",
  sumber: "Latihan: bunga di bingkai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    {
      suara: "Latihan keempat. Coba jawab dulu.",
      aksi: [tambah(0, ...anak(TALA, 30), ...bingkaiSepuluh(), ...idBenda("f", 7).map((id, i) => benda(id, petak(i)[0], petak(i)[1], BENDA.bunga, 24)))],
    },
    { suara: "Ada berapa bunga di bingkai?", aksi: [tambah(1, ...pilihanAngka(["7", "9", "8"]), tandaTanya("qm", 268, 50))] },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [hapus(0, "qm"), tambah(0, ...titikMundur(30, 30), emo("jm", 268, 50, "⏳", 32)), ...habisTitik()] },
    {
      suara: "Satu, dua, tiga, empat, lima, enam, tujuh.",
      aksi: [hapus(0, "jm"), tambah(0, ...penghitung("1")), ...hitungBenda(idBenda("f", 7))],
    },
    { suara: "Yang terakhir tujuh. Jawabannya tujuh.", aksi: [redamkan(0, "f7"), ubah(3, { id: "c1-k", sorot: true })] },
  ],
};
