import type { AdeganStory } from "./logika-story";
import { E, W, deret, deretEmo, emo, garis, ikatan, judul, kartu, meja, teks } from "./k1b1d-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b1d-bantu";

/* Lanjutan "Pesta Rumah Rapi": mencari semua pasangan enam dengan balon, lalu pasangan sepuluh dengan kursi. */

/* ------------------------------ 4. Semua pasangan enam ------------------------------ */
const SUARA_B1 = "Igil mengikat enam balon di dua tiang pagar depan rumah.";
const SUARA_B2 = "Enam bisa dibagi nol dan enam, satu dan lima, dua dan empat, atau tiga dan tiga.";
const SUARA_B3 = "Igil menyusunnya berurutan, mulai dari nol, supaya tidak ada pasangan yang terlewat.";
export const PASANGAN_ENAM: [number, number][] = [
  [0, 6],
  [1, 5],
  [2, 4],
  [3, 3],
];
const BALON = deret(6, 70, 32, 70);

export const ADEGAN_BALON: AdeganStory = {
  id: "pasangan-enam",
  judul: "Semua pasangan enam",
  sumber: "Materi: mencari semua pasangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Enam balon, dua tiang")), tambah("enam", ...deretEmo(E.balon, "bl", BALON, 24)), tambah("tiang", garis("t1", 40, 60, 0, 120, W.coklat, 4), garis("t2", 260, 60, 0, 120, W.coklat, 4))),
    k(
      SUARA_B2,
      ...PASANGAN_ENAM.map(([a, b], i) => tambah(["nol", "satu", "dua", "tiga@2"][i], teks(`ps${i}`, 150, 104 + i * 22, `${a} dan ${b}`, 12, W.biru))),
      ubah("tiga@2", ...BALON.map((_, i) => ({ id: `bl${i}`, x: i < 3 ? 70 + i * 24 : 182 + (i - 3) * 24 }))),
    ),
    k(SUARA_B3, sorotkan("nol,", "ps0"), tambah("berurutan,", teks("ar", 216, 140, "1 lebih banyak", 8.6, W.hijau), garis("pa", 200, 98, 0, 66, W.hijau, 2)), tambah("terlewat.", emo("ok", 92, 140, "\u{2705}", 22))),
  ],
};

/* ------------------------------ 5. Pasangan sepuluh: kursi ------------------------------ */
const SUARA_R1 = "Ada sepuluh kursi pesta. Mamah ingin kursi dibagi ke meja dalam dan meja teras.";
const SUARA_R2 = "Bisa tujuh dan tiga, delapan dan dua, atau lima dan lima. Banyak pilihannya.";
const SUARA_R3 = "Semua pasangan itu utuhnya sepuluh. Mamah memilih lima dan lima supaya adil.";
export const PASANGAN_SEPULUH: [number, number][] = [
  [7, 3],
  [8, 2],
  [5, 5],
];
const KURSI = deret(10, 24, 28, 60);

export const ADEGAN_KURSI: AdeganStory = {
  id: "pasangan-sepuluh",
  judul: "Pasangan sepuluh kursi",
  sumber: "Materi: pasangan sepuluh",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Sepuluh kursi")), tambah("sepuluh", ...deretEmo(E.kursi, "kr", KURSI, 22), ...kartu("k10", 110, 70, 80, 20, W.emas, ["10 kursi"], 9)), tambah("dalam", ...meja("md", 14, 150, 120, "Meja dalam")), tambah("teras.", ...meja("mt", 166, 150, 120, "Meja teras"))),
    k(
      SUARA_R2,
      hapus(0, "k10-k", "k10-t0"),
      ...PASANGAN_SEPULUH.map(([a, b], i) => tambah(["tujuh", "delapan", "lima"][i], ...ikatan(`ik${i}`, 52 + i * 98, 80, "10", String(a), String(b), 26, 13))),
    ),
    k(
      SUARA_R3,
      sorotkan("utuhnya", "ik0-u", "ik1-u", "ik2-u"),
      hapus("lima", ...[0, 1, 2].flatMap((i) => ["ga", "gb", "u", "a", "b", "tu", "ta", "tb"].map((x) => `ik${i}-${x}`))),
      ubah("lima", ...KURSI.map((_, i) => ({ id: `kr${i}`, x: i < 5 ? 26 + i * 22 : 178 + (i - 5) * 22, y: 146 }))),
      tambah("adil.", ...kartu("ad", 90, 84, 120, 24, W.hijauMuda, ["5 dan 5: adil"], 10)),
    ),
  ],
};
