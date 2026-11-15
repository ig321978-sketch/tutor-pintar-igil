import type { AdeganStory, Obj } from "./logika-story";
import { W, WARNA_KEPING, P, angkaKeping, angkaSisi, bg, bulat, emo, garisSisi, panah, garisUrai, idSisi, judul, kartu, kotak, namaBangun, persegi, segiBanyak, teks, type Titik } from "./k2b3B-gambar";
import { bersih, hapus, idx, k, tambah, urutBilangan } from "./k2b3B-bantu";

const keping = (i: number, pts: Titik[], o: Partial<Obj> = {}): Obj => bg(`kp${i}`, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });
const rumusTeks = (isi: string, y = 184): Obj => teks("rm", 150, y, isi, 12, W.merah);

/** Segitiga dari satu pojok (pojok 0) ke semua pojok lain pada segi banyak `pts`. */
export const dariPojok = (pts: Titik[]): Titik[][] => Array.from({ length: pts.length - 2 }, (_, i) => [pts[0], pts[i + 1], pts[i + 2]]);
/** Segitiga dari titik tengah `c` ke tiap sisi segi banyak `pts`. */
export const dariTengah = (pts: Titik[], c: Titik): Titik[][] => pts.map((p, i) => [c, p, pts[(i + 1) % pts.length]]);

/* ------------------------------ 9b. Segi empat dari satu pojok ------------------------------ */
export const SEGI_EMPAT = [P(110, 50), P(200, 50), P(180, 120), P(90, 120)];
const SUARA_Y1 = "Halim punya segi empat yang miring. Hitung sisinya: satu, dua, tiga, empat.";
const SUARA_Y2 = "Dari satu pojok, kita tarik garis ke pojok yang tidak bersebelahan. Ada satu garis.";
const SUARA_Y3 = "Segi empat terurai menjadi dua keping: satu, dua.";
const SUARA_Y4 = "Semuanya segitiga. Empat dikurangi dua sama dengan dua.";
const POS_Y1 = urutBilangan(SUARA_Y1, 1, 4, "sisinya:");
const POS_Y3 = urutBilangan(SUARA_Y3, 1, 2, "keping:");
const TRI_EMPAT = dariPojok(SEGI_EMPAT);

export const ADEGAN_POLA_EMPAT: AdeganStory = {
  id: "pola-empat",
  judul: "Segi empat dari satu pojok",
  sumber: "Materi: pola segitiga pada segi empat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Segi empat")),
      tambah(idx(SUARA_Y1, "segi"), bg("ut", SEGI_EMPAT, W.krem), namaBangun("ut", 150, 160, "segi empat")),
      ...POS_Y1.map((p, q) => tambah(p, garisSisi("ut", SEGI_EMPAT, q), angkaSisi("ut", SEGI_EMPAT, q))),
    ),
    k(SUARA_Y2, hapus(idx(SUARA_Y2, "Dari"), ...idSisi("ut", 4)), tambah(idx(SUARA_Y2, "tarik"), garisUrai(0, SEGI_EMPAT[0], SEGI_EMPAT[2]))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "terurai"), ...TRI_EMPAT.map((p, i) => keping(i, p))), ...POS_Y3.map((p, q) => tambah(p, angkaKeping(q, TRI_EMPAT[q], String(q + 1), 9)))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Empat"), rumusTeks("4 − 2 = 2"))),
  ],
};

/* ------------------------------ 10. Segi lima dari satu pojok ------------------------------ */
export const SEGI_LIMA = segiBanyak(5, 150, 92, 52);
const SUARA_L1 = "Upe punya segi lima. Hitung sisinya: satu, dua, tiga, empat, lima.";
const SUARA_L2 = "Dari satu pojok, kita tarik garis ke pojok yang tidak bersebelahan. Ada dua garis.";
const SUARA_L3 = "Segi lima terurai menjadi tiga keping: satu, dua, tiga.";
const SUARA_L4 = "Semuanya segitiga. Lima dikurangi dua sama dengan tiga.";
const POS_L1 = urutBilangan(SUARA_L1, 1, 5, "sisinya:");
const POS_L3 = urutBilangan(SUARA_L3, 1, 3, "keping:");
const TRI_LIMA = dariPojok(SEGI_LIMA);

export const ADEGAN_POLA_LIMA: AdeganStory = {
  id: "pola-lima",
  judul: "Segi lima dari satu pojok",
  sumber: "Materi: pola segitiga pada segi lima",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Segi lima")),
      tambah(idx(SUARA_L1, "segi"), bg("ut", SEGI_LIMA, W.krem), namaBangun("ut", 150, 160, "segi lima")),
      ...POS_L1.map((p, q) => tambah(p, garisSisi("ut", SEGI_LIMA, q), angkaSisi("ut", SEGI_LIMA, q))),
    ),
    k(SUARA_L2, hapus(idx(SUARA_L2, "Dari"), ...idSisi("ut", 5)), tambah(idx(SUARA_L2, "tarik"), garisUrai(0, SEGI_LIMA[0], SEGI_LIMA[2])), tambah(idx(SUARA_L2, "dua"), garisUrai(1, SEGI_LIMA[0], SEGI_LIMA[3]))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "terurai"), ...TRI_LIMA.map((p, i) => keping(i, p))), ...POS_L3.map((p, q) => tambah(p, angkaKeping(q, TRI_LIMA[q], String(q + 1), 9)))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "Lima"), rumusTeks("5 − 2 = 3"))),
  ],
};

/* ------------------------------ 11. Segi enam dari satu pojok ------------------------------ */
export const SEGI_ENAM = segiBanyak(6, 150, 90, 50);
const SUARA_M1 = "Wei punya segi enam. Hitung sisinya: satu, dua, tiga, empat, lima, enam.";
const SUARA_M2 = "Dari satu pojok, kita tarik garis ke pojok yang tidak bersebelahan. Ada tiga garis.";
const SUARA_M3 = "Segi enam terurai menjadi empat keping: satu, dua, tiga, empat.";
const SUARA_M4 = "Semuanya segitiga. Enam dikurangi dua sama dengan empat.";
const POS_M1 = urutBilangan(SUARA_M1, 1, 6, "sisinya:");
const POS_M3 = urutBilangan(SUARA_M3, 1, 4, "keping:");
const TRI_ENAM = dariPojok(SEGI_ENAM);

export const ADEGAN_POLA_ENAM: AdeganStory = {
  id: "pola-enam",
  judul: "Segi enam dari satu pojok",
  sumber: "Materi: pola segitiga pada segi enam",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Segi enam")),
      tambah(idx(SUARA_M1, "segi"), bg("ut", SEGI_ENAM, W.krem), namaBangun("ut", 150, 160, "segi enam")),
      ...POS_M1.map((p, q) => tambah(p, garisSisi("ut", SEGI_ENAM, q), angkaSisi("ut", SEGI_ENAM, q))),
    ),
    k(SUARA_M2, hapus(idx(SUARA_M2, "Dari"), ...idSisi("ut", 6)), tambah(idx(SUARA_M2, "tarik"), garisUrai(0, SEGI_ENAM[0], SEGI_ENAM[2])), tambah(idx(SUARA_M2, "bersebelahan."), garisUrai(1, SEGI_ENAM[0], SEGI_ENAM[3])), tambah(idx(SUARA_M2, "tiga"), garisUrai(2, SEGI_ENAM[0], SEGI_ENAM[4]))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "terurai"), ...TRI_ENAM.map((p, i) => keping(i, p))), ...POS_M3.map((p, q) => tambah(p, angkaKeping(q, TRI_ENAM[q], String(q + 1), 9)))),
    k(SUARA_M4, tambah(idx(SUARA_M4, "Enam"), rumusTeks("6 − 2 = 4"))),
  ],
};

/* ------------------------------ 12. Dari titik tengah ------------------------------ */
const PUSAT_ENAM = P(150, 90);
export const PUSAT_LIMA = P(150, 92);
const SUARA_T1 = "Sekarang kita pakai titik tengah. Wei menandai titik di tengah segi enam.";
const SUARA_T2 = "Dari titik tengah, kita tarik garis ke setiap pojok. Ada enam garis.";
const SUARA_T3 = "Segi enam terurai menjadi keping: satu, dua, tiga, empat, lima, enam.";
const SUARA_T4 = "Ada enam segitiga. Banyaknya sama dengan banyak sisi, yaitu enam.";
const SUARA_T5 = "Segi lima juga begitu. Dari titik tengah, lima garis membuat lima segitiga.";
const TENGAH_ENAM = dariTengah(SEGI_ENAM, PUSAT_ENAM);
const TENGAH_LIMA = dariTengah(SEGI_LIMA, PUSAT_LIMA);
const POS_T3 = urutBilangan(SUARA_T3, 1, 6, "keping:");

export const ADEGAN_POLA_TENGAH: AdeganStory = {
  id: "pola-tengah",
  judul: "Segitiga dari titik tengah",
  sumber: "Materi: pola segitiga dari titik tengah",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Titik tengah")), tambah(idx(SUARA_T1, "Sekarang"), bg("ut", SEGI_ENAM, W.krem), namaBangun("ut", 150, 160, "segi enam")), tambah(idx(SUARA_T1, "menandai"), bulat("tt", 150, 90, 3.6, W.merah, W.biru, { z: 6 }))),
    k(SUARA_T2, ...SEGI_ENAM.map((p, i) => tambah(i === 0 ? idx(SUARA_T2, "tarik") : i === 5 ? idx(SUARA_T2, "enam") : idx(SUARA_T2, "setiap"), garisUrai(i, PUSAT_ENAM, p)))),
    k(SUARA_T3, ...TENGAH_ENAM.map((p, q) => tambah(POS_T3[q], keping(q, p), angkaKeping(q, p, String(q + 1), 8.6)))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "Ada"), teks("hs", 150, 182, "6 segitiga = 6 sisi", 11, W.merah))),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Segi lima, titik tengah")),
      tambah(idx(SUARA_T5, "Segi"), bg("ut", SEGI_LIMA, W.krem), namaBangun("ut", 150, 160, "segi lima"), bulat("tt", 150, 92, 3.6, W.merah, W.biru, { z: 6 })),
      tambah(idx(SUARA_T5, "garis"), ...TENGAH_LIMA.map((p, i) => keping(i, p)), ...SEGI_LIMA.map((p, i) => garisUrai(i, PUSAT_LIMA, p))),
      tambah(idx(SUARA_T5, "lima", 3), teks("hs", 150, 182, "5 segitiga = 5 sisi", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 13. Tabel pola ------------------------------ */
export const TABEL_POLA = [
  ["segitiga", "3", "1"],
  ["segi empat", "4", "2"],
  ["segi lima", "5", "3"],
  ["segi enam", "6", "4"],
];
const KOLX = [40, 150, 205, 260];
const barisTabel = (r: number): Obj[] =>
  TABEL_POLA[r].flatMap((isi, c) => [
    kotak(`tb-r${r}c${c}-k`, KOLX[c], 54 + 26 * r, KOLX[c + 1] - KOLX[c], 26, r % 2 === 0 ? W.krem : W.hijauMuda, W.biru, { rx: 2, tebal: 1.2 }),
    teks(`tb-r${r}c${c}`, (KOLX[c] + KOLX[c + 1]) / 2, 54 + 26 * r + 17.5, isi, c === 0 ? 9.6 : 13, c === 0 ? W.biru : W.merah),
  ]);
const kepalaTabel = (): Obj[] =>
  ["Bangun", "Sisi", "Segitiga"].flatMap((isi, c) => [
    kotak(`tb-h${c}-k`, KOLX[c], 32, KOLX[c + 1] - KOLX[c], 22, W.lavender, W.biru, { rx: 2, tebal: 1.2 }),
    teks(`tb-h${c}`, (KOLX[c] + KOLX[c + 1]) / 2, 46, isi, 9.2, W.ungu),
  ]);

const SUARA_K1 = "Kita catat hasilnya dalam tabel. Segitiga punya tiga sisi dan hanya menjadi satu keping.";
const SUARA_K2 = "Segi empat punya empat sisi. Dari satu pojok, ia terurai menjadi dua segitiga.";
const SUARA_K3 = "Segi lima punya lima sisi, dan terurai menjadi tiga segitiga.";
const SUARA_K4 = "Segi enam punya enam sisi, dan terurai menjadi empat segitiga.";
const SUARA_K5 = "Lihat polanya. Banyak segitiga sama dengan banyak sisi dikurangi dua.";

export const ADEGAN_POLA_TABEL: AdeganStory = {
  id: "pola-tabel",
  judul: "Tabel pola banyak segitiga",
  sumber: "Materi: tabel pola segitiga",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Tabel pola"), ...kepalaTabel()), tambah(idx(SUARA_K1, "Segitiga"), ...barisTabel(0))),
    k(SUARA_K2, tambah(idx(SUARA_K2, "Segi"), ...barisTabel(1))),
    k(SUARA_K3, tambah(idx(SUARA_K3, "Segi"), ...barisTabel(2))),
    k(SUARA_K4, tambah(idx(SUARA_K4, "Segi"), ...barisTabel(3))),
    k(SUARA_K5, tambah(idx(SUARA_K5, "polanya."), ...kartu("pl", 40, 168, 220, 24, W.emas, ["segitiga = sisi − 2"], 11))),
  ],
};

/* ------------------------------ 14. Mengurai dan menyusun saling berlawanan ------------------------------ */
export const BALIK = {
  utuhAtas: persegi(50, 40, 40),
  kepingAtas: [[P(200, 40), P(240, 40), P(240, 80)], [P(200, 40), P(240, 80), P(200, 80)]],
  kepingBawah: [[P(50, 125), P(90, 125), P(90, 165)], [P(50, 125), P(90, 165), P(50, 165)]],
  utuhBawah: persegi(200, 125, 40),
};
const SUARA_Z1 = "Igil mengajak kita melihat dua kegiatan yang saling berlawanan. Pertama, mengurai.";
const SUARA_Z2 = "Satu persegi diurai menjadi dua keping. Satu bangun menjadi banyak keping.";
const SUARA_Z3 = "Kedua, menyusun. Kita mulai dari dua keping yang terpisah.";
const SUARA_Z4 = "Dua keping disusun kembali menjadi satu persegi. Banyak keping menjadi satu bangun.";
const SUARA_Z5 = "Jadi mengurai dan menyusun saling berlawanan, dan bentuknya kembali seperti semula.";

export const ADEGAN_BALIK: AdeganStory = {
  id: "urai-susun-balik",
  judul: "Mengurai dan menyusun saling berlawanan",
  sumber: "Materi: urai dan susun berlawanan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Dua kegiatan")), tambah(idx(SUARA_Z1, "Pertama,"), bg("bt", BALIK.utuhAtas, W.krem), teks("tl1", 70, 94, "1 bangun", 9, W.biru), panah("pa", 110, 60, 40, 0), teks("ta", 130, 52, "mengurai", 8.6, W.ungu))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "dua"), keping(0, BALIK.kepingAtas[0], { x: 8 }), keping(1, BALIK.kepingAtas[1], { x: -8 })), tambah(idx(SUARA_Z2, "banyak"), teks("tl2", 220, 94, "2 keping", 9, W.biru))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), keping(2, BALIK.kepingBawah[0], { x: 8 }), keping(3, BALIK.kepingBawah[1], { x: -8 }), teks("tl3", 70, 180, "2 keping", 9, W.biru))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "disusun"), panah("pb", 110, 145, 40, 0), teks("tb", 130, 137, "menyusun", 8.6, W.ungu)), tambah(idx(SUARA_Z4, "persegi"), bg("bb", BALIK.utuhBawah, W.krem), teks("tl4", 220, 180, "1 bangun", 9, W.biru))),
    k(SUARA_Z5, tambah(idx(SUARA_Z5, "saling"), emo("ul", 150, 112, "\u{1F501}", 22))),
  ],
};
