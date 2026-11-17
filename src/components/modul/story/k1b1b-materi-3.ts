import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, lemari, orang, teks } from "./k1b1b-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b1b-bantu";

/* Akhir cerita "Hadiah Nenek untuk Rak yang Lebih Sedikit": papan banding dan penutup. Tanpa latihan (latihan ada di tahap lain). */

/* ------------------------------ 7. Papan banding ------------------------------ */
const SUARA_T1 = "Abang menulis papan banding. Mobil lima dan boneka enam, jadi boneka lebih banyak.";
const SUARA_T2 = "Setelah hadiah datang, mobil enam dan boneka enam. Hasilnya sama banyak.";
const SUARA_T3 = "Kereta nol dan bola tiga. Kereta lebih sedikit, jadi kereta mendapat hadiah.";

/** Baris papan banding: rak satu, rak dua, hasil. Angka sama dengan hasil adegan sebelumnya. */
export const ISI_PAPAN: { kiri: string; kanan: string; hasil: string }[] = [
  { kiri: "5 mobil", kanan: "6 boneka", hasil: "boneka lebih banyak" },
  { kiri: "6 mobil", kanan: "6 boneka", hasil: "sama banyak" },
  { kiri: "0 kereta", kanan: "3 bola", hasil: "kereta lebih sedikit" },
];
const PB = { x: 14, y: 34, kol: [74, 74, 124], kepala: 20, baris: 34 };
const xKol = (c: number) => PB.x + PB.kol.slice(0, c).reduce((a, b) => a + b, 0);
const yBaris = (i: number) => PB.y + PB.kepala + i * PB.baris;
const sel = (i: number, c: number, isi: string): Obj => teks(`pv${i}${c}`, xKol(c) + PB.kol[c] / 2, yBaris(i) + 21, isi, c === 2 ? 9 : 10, c === 2 ? W.putih : W.emas);
const barisSel = (i: number): Obj[] => [0, 1, 2].map((c) => sel(i, c, [ISI_PAPAN[i].kiri, ISI_PAPAN[i].kanan, ISI_PAPAN[i].hasil][c]));

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan-banding",
  judul: "Papan banding Abang",
  sumber: "Materi: mencatat hasil banding",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Papan banding")),
      tambah(
        "papan",
        kotak("pp", PB.x - 4, PB.y - 4, 280, 132, "#14532D", W.coklat, { rx: 8, tebal: 3, z: -2 }),
        ...[0, 1, 2].map((c) => teks(`ph${c}`, xKol(c) + PB.kol[c] / 2, PB.y + 14, ["Rak satu", "Rak dua", "Hasil"][c], 9, W.emas)),
        ...[0, 1, 2].map((i) => garis(`pg${i}`, PB.x, yBaris(i), 272, 0, W.putih, 1, { op: 0.5 })),
      ),
      tambah("lima", sel(0, 0, ISI_PAPAN[0].kiri)),
      tambah("enam,", sel(0, 1, ISI_PAPAN[0].kanan)),
      tambah("jadi", sel(0, 2, ISI_PAPAN[0].hasil)),
    ),
    k(SUARA_T2, tambah("mobil", sel(1, 0, ISI_PAPAN[1].kiri)), tambah("enam.", sel(1, 1, ISI_PAPAN[1].kanan)), tambah("sama", sel(1, 2, ISI_PAPAN[1].hasil))),
    k(
      SUARA_T3,
      tambah("nol", sel(2, 0, ISI_PAPAN[2].kiri)),
      tambah("tiga.", sel(2, 1, ISI_PAPAN[2].kanan)),
      tambah("sedikit,", sel(2, 2, ISI_PAPAN[2].hasil)),
      tambah("hadiah.", ...orang("ab", 40, 186, E.abang, "Abang"), emo("jp", 260, 186, E.jempol, 24)),
    ),
  ],
};
export const barisPapan = barisSel;

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Mamah datang. Wah, hadiah Nenek sampai ke rak yang tepat!";
const SUARA_Z2 = "Ingat, pasangkan satu-satu. Yang bersisa lebih banyak. Tanpa sisa, sama banyak. Nol paling sedikit.";
const SUARA_Z3 = "Besok kita rapikan gudang di loteng. Terima kasih, sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: hadiah sampai di rak yang tepat",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Rak yang tepat"), garis("lantai", 10, 172, 280, 0, W.coklat, 2.5), ...orang("mm", 50, 150, E.mamah, "Mamah")),
      tambah("hadiah", ...lemari("lm", 110, 40, 110, 128, 2), ...[0, 1, 2, 3, 4, 5].map((i) => emo(`zm${i}`, 124 + i * 16, 96, E.mobil, 14)), ...[0, 1, 2, 3, 4, 5].map((i) => emo(`zb${i}`, 124 + i * 16, 158, E.boneka, 14))),
      tambah("tepat!", emo("ht", 256, 90, E.hati, 30)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Ingat, ya!")),
      tambah("pasangkan", ...kartu("p1", 14, 32, 272, 32, W.hijauMuda, ["pasangkan satu-satu"], 9.6)),
      tambah("bersisa", ...kartu("p2", 14, 72, 272, 32, W.langit, ["yang bersisa lebih banyak"], 9.6)),
      tambah("Tanpa", ...kartu("p3", 14, 112, 272, 32, W.krem, ["tanpa sisa: sama banyak"], 9.6)),
      tambah("Nol", ...kartu("p4", 14, 152, 272, 32, W.pink, ["nol paling sedikit"], 9.6)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("lt", 150, 80, E.rumah, 40), ...kartu("gd", 80, 92, 140, 24, W.emas, ["besok: gudang loteng"], 9)),
      tambah("Terima", ...orang("ig", 60, 160, E.igil, "Igil"), ...orang("kk", 120, 160, E.kaka, "Kaka"), ...orang("ab", 180, 160, E.abang, "Abang"), ...orang("mm", 240, 160, E.mamah, "Mamah")),
      sorotkan("jumpa!", "gd-k"),
    ),
  ],
};
