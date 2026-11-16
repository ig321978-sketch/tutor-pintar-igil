import type { Aksi, AdeganStory, Obj } from "./logika-story";
import { W, emo, gambarTokoh, hapus, kartuAngka, kotak, panah, redamkan, sorotkan, tambah, ubah } from "./kit/dasar";
import { IGIL, benda, keranjang, lambang, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, LATAR_TERANG, U_APEL, idApel, idPenghitung, penghitung, tandaTanya, titikMundur } from "./o2k1a-bantu";

/** Video materi Sub-Bab A (bagian 4): tiga latihan. Tiap latihan: ajakan "Coba jawab dulu", jeda (hitung mundur visual), lalu pembahasan. */

const pilihan = (isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, 40 + i * 88, 166, t, W.krem, 44, 36, 22));
/** Menghapus tiga titik hitung mundur pada kata nomor 1, 2, 3 (satu titik tiap kata). */
const habisTitik = (): Aksi[] => ["jd1", "jd2", "jd3"].map((id, i) => hapus(i + 1, id));

/* ------------------------------ Latihan 1: hitung apel di dalam keranjang saja ------------------------------ */
const DI_KERANJANG: [number, number][] = [[146, 84], [172, 82], [198, 84], [224, 86], [158, 106], [206, 106]];
const DI_RUMPUT: [number, number][] = [[30, 134], [60, 144], [90, 132]];

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-1",
  judul: "Latihan pertama: menghitung apel di keranjang",
  sumber: "Materi: latihan menghitung apel",
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
    { suara: "Hitung apel di keranjang saja. Tunjuk satu per satu.", aksi: [sorotkan(3, "mj"), tambah(5, emo("hd", 272, 112, "\u{1F446}", 26))] },
    { suara: "Ada berapa apel di keranjang?", aksi: [redamkan(0, "mj"), tambah(1, ...pilihan(["5", "7", "6"]), tandaTanya("qm", 272, 70))] },
    {
      suara: "Tunggu sebentar. Pikirkan dulu.",
      aksi: [hapus(0, "qm", "hd"), tambah(0, ...titikMundur(30, 30), emo("jm", 272, 70, "⏳", 32)), ...habisTitik()],
    },
    {
      suara: "Ayo hitung dengan suara. Satu, dua, tiga, empat, lima, enam.",
      aksi: [
        hapus(0, "jm"),
        tambah(0, ...penghitung("1")),
        ...idApel(1, 6).map((id, i) => ubah(4 + i, { id, sorot: true }, ...(i > 0 ? [{ id: `a${i}`, sorot: false }] : []), { id: "cn-t", isi: String(i + 1) })),
      ],
    },
    { suara: "Yang terakhir enam. Jawabannya enam.", aksi: [redamkan(0, "a6"), ubah(3, { id: "c3-k", sorot: true })] },
  ],
};

/* ------------------------------ Latihan 2: Igil menunjuk lambang delapan ------------------------------ */
const KARTU_X = [8, 106, 204];
const WARNA_KARTU = ["#DBEAFE", "#DCFCE7", "#FEF9C3"];
const GARIS_KARTU = [W.nila, W.hijau, W.oranye];
const BANYAK_KARTU = [7, 8, 9];
const kartuApel = (): Obj[] => [
  ...KARTU_X.map((x, g) => kotak(`c${g + 1}-k`, x, 108, 88, 62, WARNA_KARTU[g], GARIS_KARTU[g], { rx: 8, tebal: 2 })),
  ...KARTU_X.flatMap((x, g) => Array.from({ length: BANYAK_KARTU[g] }, (_, i) => benda(`g${g + 1}-${i + 1}`, x + 14 + (i % 5) * 15.5, i < 5 ? 136 : 158, APEL, 15))),
];
const idGrup2 = Array.from({ length: 8 }, (_, i) => `g2-${i + 1}`);

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-2",
  judul: "Latihan kedua: lambang delapan",
  sumber: "Materi: latihan membaca lambang",
  latar: LATAR_TERANG,
  ketukan: [
    { suara: "Latihan kedua. Coba jawab dulu.", aksi: [tambah(0, ...gambarTokoh(IGIL, 36, 24), ...kartuApel())] },
    {
      suara: "Igil menunjuk lambang delapan. Cari kumpulan delapan apel.",
      aksi: [tambah(2, ...lambang("lb", 112, 14, "8", 76, 70, 52)), tambah(4, panah("pn", 150, 88, 0, 18, W.merah, 3))],
    },
    { suara: "Tunggu sebentar. Pikirkan dulu.", aksi: [hapus(0, "pn"), tambah(0, ...titikMundur(212, 40), emo("jm", 270, 80, "⏳", 28)), ...habisTitik()] },
    {
      suara: "Satu, dua, tiga, empat, lima, enam, tujuh, delapan.",
      aksi: [
        hapus(0, "jm"),
        tambah(0, ...penghitung("1", 252, 18)),
        ...idGrup2.map((id, i) => ubah(i, { id, sorot: true }, ...(i > 0 ? [{ id: idGrup2[i - 1], sorot: false }] : []), { id: "cn-t", isi: String(i + 1) })),
      ],
    },
    { suara: "Kumpulan ini ada delapan apel.", aksi: [hapus(0, ...idPenghitung), redamkan(0, "g2-8"), ubah(1, { id: "c2-k", sorot: true })] },
    { suara: "Kumpulan lain bukan delapan.", aksi: [ubah(0, { id: "c1-k", op: 0.45 }, { id: "c3-k", op: 0.45 })] },
  ],
};

/* ------------------------------ Latihan 3: keranjang kosong ------------------------------ */
export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-3",
  judul: "Latihan ketiga: keranjang kosong",
  sumber: "Materi: latihan keranjang kosong",
  latar: LATAR_KEBUN,
  ketukan: [
    { suara: "Latihan ketiga. Coba jawab dulu.", aksi: [tambah(0, rumput(120), ...keranjang("kr", 130, 56, 110, 56))] },
    { suara: "Ada berapa apel di keranjang?", aksi: [tambah(1, ...pilihan(["0", "10", "1"]), tandaTanya("qm", 272, 80))] },
    {
      suara: "Tunggu sebentar. Pikirkan dulu.",
      aksi: [hapus(0, "qm"), tambah(0, ...titikMundur(30, 30), emo("jm", 272, 80, "⏳", 32)), ...habisTitik()],
    },
    { suara: "Tidak ada apel untuk dihitung.", aksi: [hapus(0, "jm"), ubah(0, { id: "kr-bd", sorot: true }, { id: "kr-tp", sorot: true })] },
    { suara: "Jadi jawabannya adalah nol.", aksi: [redamkan(0, "kr-bd", "kr-tp"), ubah(3, { id: "c1-k", sorot: true })] },
  ],
};

