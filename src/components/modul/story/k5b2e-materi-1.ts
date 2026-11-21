import type { AdeganStory } from "./logika-story";
import { E, PAPAN_100, W, bilanganPapan, bingkaiPapan, chip, emo, judul, kartu, kotak, lantai, panah, teks, tokoh } from "./k5b2e-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Kelas 5 Bab 2 Sub-Bab E), akhir cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2e.md. Bagian ini: Kak Lintang membawa papan, arti bilangan prima, dan salah Fajar (satu dianggap prima, taruhan mencoret papan).
 */

/* ------------------------------ 1. Papan bilangan ------------------------------ */
const SUARA_PAPAN1 = "Kak Lintang membawa papan besar berisi bilangan satu sampai seratus untuk spanduk pasar.";
const SUARA_PAPAN2 = "Ia ingin menandai bilangan istimewa yang hanya punya dua faktor.";
const SUARA_PAPAN3 = "Bima, Citra, dan Fajar mendekat sambil membawa spidol warna-warni.";

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan",
  judul: "Kak Lintang membawa papan",
  sumber: "Materi: papan bilangan satu sampai seratus",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_PAPAN1,
      tambah(0, judul("Papan Bilangan Pasar"), ...lantai("lt", 156)),
      tambah("Lintang", ...tokoh("kl", 258, 140, "Kak Lintang")),
      tambah("papan", bingkaiPapan("pp", 100, PAPAN_100)),
      tambah("bilangan", ...bilanganPapan("pp", 100, PAPAN_100)),
      tambah("spanduk", kotak("sd", 206, 32, 88, 22, "#FEE2E2", W.merah, { rx: 4 }), teks("sd-t", 250, 47, "PASAR MALAM", 10, W.merahTua)),
    ),
    k(
      SUARA_PAPAN2,
      sorotkan("menandai", "kl-sp"),
      tambah("istimewa", ...kartu("is", 206, 60, 88, 22, "#FEF9C3", ["istimewa"], 10), emo("ks", 288, 58, E.kilau, 12)),
      tambah("dua", ...kartu("ft", 206, 86, 88, 22, "#DBEAFE", ["hanya 2 faktor"], 9)),
    ),
    k(
      SUARA_PAPAN3,
      tambah("Bima", ...tokoh("bi", 36, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 100, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 164, 184, "Fajar")),
      tambah("spidol", kotak("s1", 58, 160, 4, 14, "#2563EB", "#1E3A8A", { rx: 1, z: 2 }), kotak("s2", 122, 160, 4, 14, "#DC2626", "#7F1D1D", { rx: 1, z: 2 }), kotak("s3", 186, 160, 4, 14, "#16A34A", "#14532D", { rx: 1, z: 2 })),
    ),
  ],
};

/* ------------------------------ 2. Bilangan prima ------------------------------ */
const SUARA_PRIMA1 = "Bilangan prima hanya bisa dibagi oleh satu dan oleh bilangan itu sendiri.";
const SUARA_PRIMA2 = "Contohnya dua, tiga, lima, tujuh, sebelas, tiga belas, dan tujuh belas.";
const SUARA_PRIMA3 = "Bima menulisnya di papan, dan Citra menambahkan sepuluh bilangan lain di bawahnya.";

/** Tujuh contoh pertama (dua sampai tujuh belas), diikuti sepuluh bilangan tambahan Citra. */
const CONTOH = [2, 3, 5, 7, 11, 13, 17];
const TAMBAHAN_1 = [19, 23, 29, 31, 37];
const TAMBAHAN_2 = [41, 43, 47, 53, 59];
export const ADEGAN_PRIMA: AdeganStory = {
  id: "prima",
  judul: "Apa itu bilangan prima",
  sumber: "Materi: bilangan prima dan contohnya",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_PRIMA1,
      tambah(0, judul("Bilangan Prima"), ...lantai("lt", 156)),
      tambah("prima", ...chip("pr", 150, 66, 7, W.emas, 22, 20), teks("pl", 150, 102, "bilangan prima", 9, W.unguTua)),
      tambah("dibagi", panah("a1", 138, 90, -50, 30, W.coklat, 1.8), panah("a2", 162, 90, 50, 30, W.coklat, 1.8)),
      tambah("satu", ...kartu("b1", 30, 124, 96, 30, "#DBEAFE", ["7 ÷ 1 = 7"], 11)),
      tambah("sendiri", ...kartu("b2", 174, 124, 96, 30, "#DCFCE7", ["7 ÷ 7 = 1"], 11)),
    ),
    k(
      SUARA_PRIMA2,
      bersih(0),
      tambah(0, judul("Contoh Bilangan Prima"), ...lantai("lt", 156)),
      ...[1, 2, 3, 4, 5, 7, 10].map((at, i) => tambah(at, ...chip(`c${i}`, 24 + i * 42, 96, CONTOH[i], W.hijauMuda))),
      tambah(8, teks("cl", 150, 140, "semuanya prima", 10, W.hijauTua)),
    ),
    k(
      SUARA_PRIMA3,
      hapus(0, "cl"),
      tambah("Bima", ...tokoh("bi", 30, 184, "Bima")),
      tambah("papan", kotak("fr", 8, 78, 284, 36, W.papan, W.kayuTua, { rx: 4, tebal: 2, z: -1 })),
      tambah("Citra", ...tokoh("ci", 270, 184, "Citra")),
      tambah("sepuluh", ...TAMBAHAN_1.flatMap((n, i) => chip(`d${i}`, 60 + i * 45, 128, n, W.hijauMuda, 10, 10)), teks("pt", 150, 172, "+10 prima", 9, W.unguTua)),
      tambah("lain", ...TAMBAHAN_2.flatMap((n, i) => chip(`e${i}`, 60 + i * 45, 152, n, W.hijauMuda, 10, 10))),
    ),
  ],
};

/* ------------------------------ 3. Salah Fajar: satu bukan prima ------------------------------ */
const SUARA_SALAH1 = "Fajar berseru bahwa satu pasti bilangan prima karena hanya bisa dibagi satu.";
const SUARA_SALAH2 = "Satu itu prima, kan? Kalau salah, aku mencoret semua papan dengan spidol, katanya.";
const SUARA_SALAH3 = "Kak Lintang menyodorkan spidol hitam yang paling tebal dengan senyum lebar.";

export const ADEGAN_SALAH_SATU: AdeganStory = {
  id: "salah-satu",
  judul: "Fajar berseru satu itu prima",
  sumber: "Materi: salah langkah dan taruhan Fajar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_SALAH1,
      tambah(0, judul("Fajar Berseru"), ...lantai("lt", 156), ...tokoh("fa", 150, 184, "Fajar", 34)),
      tambah("berseru", ...kartu("sr", 190, 50, 100, 34, "#FEE2E2", ["satu prima!"], 11)),
      tambah("satu", ...chip("sat", 62, 84, 1, W.emas, 20, 18)),
      tambah("dibagi", ...kartu("db", 18, 118, 96, 28, "#DBEAFE", ["1 ÷ 1 = 1"], 11)),
    ),
    k(
      SUARA_SALAH2,
      tambah("Kalau", ...kartu("tr", 168, 100, 124, 40, "#FEF9C3", ["Kalau salah,", "aku coret papan!"], 10)),
      tambah("mencoret", kotak("spd", 20, 150, 6, 20, "#111827", "#030712", { rx: 1, z: 2 })),
      tambah("papan", kotak("mp", 40, 154, 70, 4, W.kayu, W.kayuTua, { rx: 1, tebal: 1 })),
      sorotkan("spidol", "spd"),
    ),
    k(
      SUARA_SALAH3,
      tambah("Lintang", ...tokoh("kl", 40, 184, "Kak Lintang")),
      ubah("spidol", { id: "spd", x: 70, y: 150, w: 8, h: 26 }),
      tambah("tebal", teks("tb", 70, 144, "paling tebal", 9, W.biru)),
      tambah("senyum", emo("sn", 40, 138, E.senyum, 18)),
    ),
  ],
};
