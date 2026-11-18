import type { AdeganStory } from "./logika-story";
import { E, W, angkaNampan, bandingan, emo, idBandingan, isiTabelPS, judul, kartu, kotakKolom, kotakSepuluh, lantai, nampan, tabelPS, teks, tokoh } from "./k2b1C-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";

/*
 * Cerita orisinal IGIL "Dua Nampan untuk Pesta Kue" (Kelas 2 Bab 1 Sub-Bab C).
 * Naskah suara dari naskah/story-naskah-k2b1c.md. Bagian ini: puluhan dulu, tanda bandingan, dan puluhan sama sehingga satuan dilihat.
 */

/* ------------------------------ 4. Puluhan dulu ------------------------------ */
const SUARA_P1 = "Tiga puluh delapan punya tiga puluhan, dan empat puluh satu punya empat puluhan.";
const SUARA_P2 = "Empat puluhan lebih banyak dari tiga puluhan, jadi nampan donat lebih banyak.";
const SUARA_P3 = "Chacha menepuk dahinya. Nampan lapis ternyata lebih sedikit, padahal satuannya lebih besar!";

const TB = { x: 55, y: 30 };
const KOSONG = [
  { nama: "Lapis", angka: "", p: "", s: "" },
  { nama: "Donat", angka: "", p: "", s: "" },
];
const kotakLapis = [0, 1, 2].map((i) => `kl${i}`);
const kotakDonat = [0, 1, 2, 3].map((i) => `kd${i}`);

export const ADEGAN_PULUHAN_DULU: AdeganStory = {
  id: "puluhan-dulu",
  judul: "Puluhan dulu",
  sumber: "Materi: tabel puluhan dan satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Puluhan dulu"), lantai("lt", 150), tabelPS("tb", TB.x, TB.y, KOSONG)),
      tambah("Tiga", isiTabelPS("tb", TB.x, TB.y, 0, 1, "38")),
      tambah("delapan", isiTabelPS("tb", TB.x, TB.y, 0, 3, "8")),
      tambah("tiga@2", isiTabelPS("tb", TB.x, TB.y, 0, 2, "3", W.hijau)),
      sorotkan("tiga@2", "tb-r0c"),
      tambah("empat", isiTabelPS("tb", TB.x, TB.y, 1, 1, "41")),
      tambah("satu", isiTabelPS("tb", TB.x, TB.y, 1, 3, "1")),
      tambah("empat@2", isiTabelPS("tb", TB.x, TB.y, 1, 2, "4", W.hijau)),
      sorotkan("empat@2", "tb-r1c"),
    ),
    k(
      SUARA_P2,
      sorotkan("Empat", ...kotakKolom("tb", 2, 2)),
      tambah("Empat", teks("ld", 58, 140, "donat", 8.4, W.coklat), ...[0, 1, 2, 3].flatMap((i) => kotakSepuluh(`kd${i}`, 90 + 28 * i, 128))),
      tambah("tiga", teks("ll", 58, 112, "lapis", 8.4, W.coklat), ...[0, 1, 2].flatMap((i) => kotakSepuluh(`kl${i}`, 90 + 28 * i, 100))),
      sorotkan("donat", ...kotakDonat),
      tambah("jadi", emo("mk", 226, 140, E.mahkota, 20)),
    ),
    k(
      SUARA_P3,
      redamkan("Chacha", ...kotakDonat, ...kotakKolom("tb", 2, 2)),
      tambah("Chacha", ...tokoh("ch", 272, 172, "chacha")),
      ubah("menepuk", { id: "ch", isi: E.menepuk }),
      sorotkan("sedikit,", ...kotakLapis),
      sorotkan("satuannya", ...kotakKolom("tb", 3, 2)),
      tambah("besar!", ...kartu("sb", 40, 152, 190, 32, W.merahMuda, ["satuan 8 lebih dari 1,", "tetapi puluhan 3 kurang dari 4"], 8.2)),
    ),
  ],
};

/* ------------------------------ 5. Tanda bandingan ------------------------------ */
const SUARA_T1 = "Nia menggambar tanda yang mulutnya selalu terbuka ke bilangan yang lebih besar.";
const SUARA_T2 = "Tiga puluh delapan lebih kecil dari empat puluh satu, dan sebaliknya.";
const SUARA_T3 = "Kalau kedua bilangan sama banyak, pakai tanda sama dengan.";

export const ADEGAN_TANDA: AdeganStory = {
  id: "tanda",
  judul: "Tanda lebih besar, lebih kecil, sama dengan",
  sumber: "Materi: tanda bandingan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tanda bandingan"), lantai("lt", 150)),
      tambah("Nia", ...tokoh("ni", 28, 172, "nia")),
      tambah("tanda", teks("tk1", 100, 100, "<", 54, W.merah), teks("tk2", 200, 100, ">", 54, W.merah)),
      tambah("mulutnya", ...kartu("ml", 60, 122, 180, 20, W.krem, ["mulut terbuka ke yang besar"], 8.6)),
      tambah("besar.", emo("bs", 150, 92, E.bintang, 20)),
    ),
    k(
      SUARA_T2,
      hapus(0, "tk1", "tk2", "ml-k", "ml-t0", "bs"),
      tambah("Tiga", teks("b10", 102, 86, "38", 26, W.biru)),
      tambah("lebih", teks("b11", 150, 86, "<", 30, W.merah)),
      tambah("empat", teks("b12", 198, 86, "41", 26, W.biru)),
      tambah("sebaliknya.", ...bandingan("b2", 150, 134, "41", ">", "38", 26, 48)),
    ),
    k(
      SUARA_T3,
      hapus(0, ...idBandingan("b1"), ...idBandingan("b2")),
      tambah("kedua", teks("e0", 102, 96, "27", 26, W.biru), teks("e2", 198, 96, "27", 26, W.biru)),
      tambah("pakai", teks("e1", 150, 96, "=", 30, W.merah)),
      tambah("banyak,", ...kartu("sm", 90, 120, 120, 20, W.hijauMuda, ["sama banyak"], 8.8)),
      tambah("dengan.", emo("tb", 150, 62, E.timbang, 22)),
    ),
  ],
};

/* ------------------------------ 6. Puluhan sama, lihat satuan ------------------------------ */
const SUARA_L1 = "Bu Dewi membawa pastel tiga puluh dua dan bolu tiga puluh lima.";
const SUARA_L2 = "Puluhannya sama, jadi lihat satuannya. Dua lebih kecil dari lima.";
const SUARA_L3 = "Jadi pastel lebih sedikit, dan bolu lebih banyak.";

const TB2 = { x: 55, y: 100 };
const PASTEL_BOLU = [
  { nama: "Pastel", angka: "32", p: "3", s: "2" },
  { nama: "Bolu", angka: "35", p: "3", s: "5" },
];

export const ADEGAN_SATUAN_LANJUT: AdeganStory = {
  id: "satuan-lanjut",
  judul: "Puluhannya sama, lihat satuannya",
  sumber: "Materi: puluhan sama, satuan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Pastel dan bolu"), lantai("lt", 150)),
      tambah("Dewi", ...tokoh("dw", 28, 172, "dewi")),
      tambah("pastel", ...nampan("p1", 50, 54, 96, E.pastel), teks("np1", 98, 48, "pastel", 8.6)),
      tambah("dua", angkaNampan("p1", 50, 54, 96, 32)),
      tambah("bolu", ...nampan("p2", 154, 54, 96, E.bolu), teks("np2", 202, 48, "bolu", 8.6)),
      tambah("lima.", angkaNampan("p2", 154, 54, 96, 35)),
    ),
    k(
      SUARA_L2,
      tambah("Puluhannya", ...tabelPS("tb", TB2.x, TB2.y, PASTEL_BOLU)),
      sorotkan("Puluhannya", ...kotakKolom("tb", 2, 2)),
      redamkan("satuannya", ...kotakKolom("tb", 2, 2)),
      sorotkan("satuannya", ...kotakKolom("tb", 3, 2)),
      sorotkan("Dua", "tb-r0dt"),
      sorotkan("lima.", "tb-r1dt"),
    ),
    k(
      SUARA_L3,
      redamkan("Jadi", ...kotakKolom("tb", 3, 2)),
      ubah("pastel", { id: "p1", warna: "#BFDBFE" }),
      ubah("bolu", { id: "p2", warna: "#FECACA" }),
      tambah("banyak.", emo("mk", 240, 54, E.mahkota, 16), ...bandingan("kb", 150, 184, "32", "<", "35", 18, 36)),
    ),
  ],
};
