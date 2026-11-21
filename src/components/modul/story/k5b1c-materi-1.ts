import type { AdeganStory } from "./logika-story";
import { E, W, bundel, emo, judul, kotak, lantai, rak, teks, tokoh, type Jenis } from "./k5b1c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b1c-bantu";

/*
 * Cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Kelas 5 Bab 1 Sub-Bab C, menguraikan bilangan), lanjutan cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1c.md. Bagian ini: masuk gudang tiket dan mengambil bundel untuk Tribun Utara.
 */

/* ------------------------------ 1. Gudang ------------------------------ */
const SUARA_G1 = "Bu Lestari, bendahara klub, mengajak Bima, Citra, dan Fajar ke gudang tiket.";
const SUARA_G2 = "Tiket disimpan dalam bundel: kardus sepuluh ribu, dus seribu, pak seratus, dan ikat sepuluh.";
const SUARA_G3 = "Mereka menyiapkan tiket Tribun Utara, yaitu dua puluh empat ribu tiga ratus lima puluh.";

const JENIS_GUDANG: { jenis: Jenis; nama: string; angka: string; at: string }[] = [
  { jenis: "kardus", nama: "kardus", angka: "10.000", at: "kardus" },
  { jenis: "dus", nama: "dus", angka: "1.000", at: "dus@2" },
  { jenis: "pak", nama: "pak", angka: "100", at: "pak" },
  { jenis: "ikat", nama: "ikat", angka: "10", at: "ikat" },
];

export const ADEGAN_GUDANG: AdeganStory = {
  id: "gudang",
  judul: "Gudang tiket stadion",
  sumber: "Materi: gudang tiket",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gudang Tiket Stadion"), ...lantai("lt", 150), ...rak("rk", 12, 28, 276, 100)),
      tambah("Lestari", ...tokoh("bu", 40, 184, "Bu Lestari")),
      tambah("Bima", ...tokoh("bm", 100, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 160, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 220, 184, "Fajar")),
    ),
    k(
      SUARA_G2,
      ...JENIS_GUDANG.map((j, i) =>
        tambah(
          j.at,
          kotak(`c${i}-k`, 18 + i * 70, 36, 60, 72, W.putih, W.kayuTua, { rx: 5, tebal: 1.4, z: 1 }),
          ...bundel(`g${i}-`, 48 + i * 70, 58, j.jenis, 1),
          teks(`c${i}-n`, 48 + i * 70, 86, j.nama, 8.6, W.coklat, { z: 3 }),
          teks(`c${i}-v`, 48 + i * 70, 101, j.angka, 9.4, W.merah, { z: 3 }),
        ),
      ),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Tiket Tribun Utara"), ...lantai("lt", 150), ...rak("rk", 12, 28, 276, 100)),
      tambah("Tribun", kotak("tk", 50, 40, 200, 74, W.krem, W.merah, { rx: 6, tebal: 2, z: 1 }), teks("tn", 150, 62, "Tribun Utara", 11, W.merah, { z: 3 })),
      tambah("dua", teks("tj", 150, 96, "24.350 tiket", 16, W.biru, { z: 3 })),
      tambah("lima", emo("tt", 268, 146, E.tiket, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Bundel yang diambil Bima ------------------------------ */
const SUARA_B1 = "Bima mengambil dua kardus, empat dus, tiga pak, dan lima ikat.";
const SUARA_B2 = "Berarti dua puluh ribu, empat ribu, tiga ratus, dan lima puluh.";
const SUARA_B3 = "Lembar satuan tidak dipakai sama sekali, jadi kolom satuannya nol.";

const BARIS: { jenis: Jenis; nama: string; n: number; angka: string; gap: number }[] = [
  { jenis: "kardus", nama: "kardus", n: 2, angka: "= 20.000", gap: 26 },
  { jenis: "dus", nama: "dus", n: 4, angka: "= 4.000", gap: 21 },
  { jenis: "pak", nama: "pak", n: 3, angka: "= 300", gap: 16 },
  { jenis: "ikat", nama: "ikat", n: 5, angka: "= 50", gap: 13 },
];
const yBaris = (i: number): number => 40 + i * 24;

export const ADEGAN_BUNDEL: AdeganStory = {
  id: "bundel",
  judul: "Bima mengambil bundel",
  sumber: "Materi: bundel Tribun Utara",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bundel Tribun Utara"), ...lantai("lt", 150), ...tokoh("bm", 268, 184, "Bima"), ...BARIS.map((b, i) => teks(`r${i}l`, 34, yBaris(i) + 4, b.nama, 8.6, W.coklat, { z: 3 })), teks("r4l", 34, yBaris(4) + 4, "lembar", 8.6, W.coklat, { z: 3 })),
      ...BARIS.map((b, i) => tambah(["dua", "empat", "tiga", "lima"][i], teks(`r${i}c`, 72, yBaris(i) + 4, String(b.n), 11, W.merah, { z: 3 }), ...bundel(`r${i}b`, 104, yBaris(i), b.jenis, b.n, b.gap))),
    ),
    k(
      SUARA_B2,
      ...BARIS.map((b, i) => tambah(["dua", "empat", "tiga", "lima"][i], teks(`r${i}v`, 232, yBaris(i) + 4, b.angka, 9.4, W.biru, { z: 3 }))),
    ),
    k(
      SUARA_B3,
      sorotkan(0, "r4l"),
      tambah("nol", teks("r4c", 72, yBaris(4) + 4, "0", 11, W.merah, { z: 3 }), teks("r4v", 232, yBaris(4) + 4, "= 0", 9.4, W.biru, { z: 3 }), emo("e4", 150, yBaris(4) + 4, E.benar, 12, { z: 3 })),
    ),
  ],
};
