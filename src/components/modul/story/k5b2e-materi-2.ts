import type { AdeganStory } from "./logika-story";
import { E, PAPAN_100, PRIMA_100, W, bilanganPapan, bingkaiPapan, cincinPapan, emo, garis, judul, kartu, kelipatanDari, kotak, lantai, simpul, idBilanganPapan, tali, teks, tokoh } from "./k5b2e-gambar";
import { bersih, k, pudarkan, sorotkan, tambah, ubah } from "./k5b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Kelas 5 Bab 2 Sub-Bab E), akhir cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2e.md. Bagian ini: Citra menjelaskan kenapa satu bukan prima, Bima menyaring papan satu sampai seratus (25 prima), dan Citra membuat pohon faktor 12 dan 18.
 */

/* ------------------------------ 4. Satu bukan prima ------------------------------ */
const SUARA_PERIKSA1 = "Citra menjelaskan: satu hanya punya satu faktor, padahal bilangan prima harus punya dua faktor.";
const SUARA_PERIKSA2 = "Karena itu, satu bukan bilangan prima, dan dua adalah bilangan prima yang terkecil.";
const SUARA_PERIKSA3 = "Fajar mencoret papan sampai spidolnya menempel di hidung, dan semua orang tertawa.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Satu hanya punya satu faktor",
  sumber: "Materi: satu bukan bilangan prima",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_PERIKSA1,
      tambah(0, judul("Satu Hanya Punya Satu"), ...lantai("lt", 156)),
      tambah("Citra", ...tokoh("ci", 40, 184, "Citra")),
      tambah("satu", ...kartu("k1", 90, 44, 120, 40, "#DBEAFE", ["bilangan 1", "faktor: 1 saja"], 10)),
      tambah("dua", ...kartu("k2", 90, 98, 120, 40, "#DCFCE7", ["bilangan prima", "faktor: ada 2"], 10)),
    ),
    k(
      SUARA_PERIKSA2,
      tambah("bukan", emo("x1", 242, 66, E.salah, 24)),
      ubah("bukan", { id: "k1-k", warna: "#FEE2E2" }),
      tambah("dua", emo("o2", 242, 120, E.benar, 24)),
      tambah("terkecil", ...kartu("tk", 196, 140, 98, 24, "#FEF9C3", ["prima terkecil: 2"], 9)),
    ),
    k(
      SUARA_PERIKSA3,
      bersih(0),
      tambah(0, judul("Fajar Mencoret Papan"), ...lantai("lt", 156), ...tokoh("fa", 150, 184, "Fajar", 34)),
      tambah("papan", kotak("mp", 60, 36, 180, 84, W.papan, W.kayuTua, { rx: 4, tebal: 2.4 }), teks("mt", 150, 62, "1 2 3 4 5", 12, W.biru)),
      tambah("mencoret", garis("c1", 72, 48, 70, 60, W.merah, 3), garis("c2", 142, 108, 90, -50, "#111827", 3)),
      tambah("hidung", garis("c3", 150, 150, 0, -22, "#111827", 3), kotak("spd", 146, 146, 8, 12, "#111827", "#030712", { rx: 1, z: 2 })),
      tambah("tertawa", emo("t1", 40, 100, E.tertawa, 26), emo("t2", 262, 100, E.tertawa, 26), emo("t3", 262, 150, E.tertawa, 22)),
    ),
  ],
};

/* ------------------------------ 5. Saringan Eratosthenes ------------------------------ */
const SUARA_SARING1 = "Bima memakai saringan Eratosthenes: hapus satu, ambil dua lalu hapus semua kelipatannya.";
const SUARA_SARING2 = "Lalu ambil tiga, lima, dan tujuh, dan hapus semua kelipatannya juga.";
const SUARA_SARING3 = "Bilangan yang tersisa adalah bilangan prima, dan jumlahnya dua puluh lima sampai seratus.";

const KELIPATAN_2 = kelipatanDari(2, 100);
/** Kelipatan 3, 5, dan 7 yang belum terhapus oleh kelipatan 2. */
const KELIPATAN_357 = [...new Set([3, 5, 7].flatMap((p) => kelipatanDari(p, 100)))].filter((n) => n % 2 !== 0).sort((a, b) => a - b);
export const ADEGAN_SARING: AdeganStory = {
  id: "saring",
  judul: "Bima menyaring bilangan prima",
  sumber: "Materi: saringan Eratosthenes sampai seratus",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_SARING1,
      tambah(0, judul("Saringan Eratosthenes"), ...lantai("lt", 156), bingkaiPapan("pp", 100, PAPAN_100), ...bilanganPapan("pp", 100, PAPAN_100)),
      tambah("Bima", ...tokoh("bi", 256, 140, "Bima")),
      pudarkan("hapus", "pp-n1"),
      tambah("ambil", cincinPapan("pp", 2, PAPAN_100)),
      pudarkan("kelipatannya", ...idBilanganPapan("pp", KELIPATAN_2)),
    ),
    k(
      SUARA_SARING2,
      tambah("tiga", cincinPapan("pp", 3, PAPAN_100)),
      tambah(3, cincinPapan("pp", 5, PAPAN_100)),
      tambah("tujuh", cincinPapan("pp", 7, PAPAN_100)),
      pudarkan("kelipatannya", ...idBilanganPapan("pp", KELIPATAN_357)),
    ),
    k(
      SUARA_SARING3,
      tambah("tersisa", ...PRIMA_100.filter((n) => n > 7).map((n) => cincinPapan("pp", n, PAPAN_100))),
      tambah("jumlahnya", teks("jm", 256, 90, "25", 22, W.merah), teks("jt", 256, 104, "prima", 10, W.hijauTua)),
      tambah("seratus", teks("js", 256, 66, "1 - 100", 9, W.biru)),
    ),
  ],
};

/* ------------------------------ 6. Pohon faktor 12 dan 18 ------------------------------ */
const SUARA_POHON1 = "Citra membuat pohon faktor dua belas: dua belas patah menjadi dua dan enam, lalu enam menjadi dua dan tiga.";
const SUARA_POHON2 = "Daun pohonnya semua prima, jadi dua belas sama dengan dua kali dua kali tiga.";
const SUARA_POHON3 = "Untuk delapan belas, daunnya dua, tiga, tiga: dua kali tiga kali tiga.";

/** Posisi simpul pohon: akar, anak kiri dan kanan, lalu anak dari simpul kanan. */
const P = { r: [150, 48], a: [118, 86], b: [182, 86], c: [160, 124], d: [204, 124] } as const;
const pohonDua = (id: string, akar: number, kanan: number, daunKiri: number, daunC: number, daunD: number) => ({
  akar: simpul(`${id}r`, P.r[0], P.r[1], akar, false),
  a: simpul(`${id}a`, P.a[0], P.a[1], daunKiri, true),
  b: simpul(`${id}b`, P.b[0], P.b[1], kanan, false),
  c: simpul(`${id}c`, P.c[0], P.c[1], daunC, true),
  d: simpul(`${id}d`, P.d[0], P.d[1], daunD, true),
  ta: tali(`${id}ta`, P.r[0], P.r[1], P.a[0], P.a[1]),
  tb: tali(`${id}tb`, P.r[0], P.r[1], P.b[0], P.b[1]),
  tc: tali(`${id}tc`, P.b[0], P.b[1], P.c[0], P.c[1]),
  td: tali(`${id}td`, P.b[0], P.b[1], P.d[0], P.d[1]),
});
const P12 = pohonDua("p", 12, 6, 2, 2, 3);
const P18 = pohonDua("q", 18, 9, 2, 3, 3);
export const ADEGAN_POHON: AdeganStory = {
  id: "pohon",
  judul: "Citra membuat pohon faktor",
  sumber: "Materi: pohon faktor 12 dan 18",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_POHON1,
      tambah(0, judul("Pohon Faktor 12"), ...lantai("lt", 156)),
      tambah("Citra", ...tokoh("ci", 40, 184, "Citra")),
      tambah("pohon", ...P12.akar),
      tambah(8, P12.ta, P12.tb),
      tambah(10, ...P12.a),
      tambah(12, ...P12.b),
      tambah(14, P12.tc, P12.td),
      tambah(16, ...P12.c),
      tambah(18, ...P12.d),
    ),
    k(
      SUARA_POHON2,
      sorotkan("Daun", "pa", "pc", "pd"),
      tambah("jadi", teks("rm", 150, 154, "12 =", 12, W.merahTua)),
      ubah(9, { id: "rm", isi: "12 = 2" }),
      ubah(11, { id: "rm", isi: "12 = 2 × 2" }),
      ubah(13, { id: "rm", isi: "12 = 2 × 2 × 3" }),
    ),
    k(
      SUARA_POHON3,
      bersih(0),
      tambah(0, judul("Pohon Faktor 18"), ...lantai("lt", 156)),
      tambah(1, ...tokoh("ci", 40, 184, "Citra"), ...P18.akar),
      tambah(3, P18.ta, P18.tb, ...P18.a, ...P18.b),
      tambah(5, P18.tc, P18.td, ...P18.c, ...P18.d),
      tambah(7, teks("rm", 150, 154, "18 = 2", 12, W.merahTua)),
      ubah(9, { id: "rm", isi: "18 = 2 × 3" }),
      ubah(11, { id: "rm", isi: "18 = 2 × 3 × 3" }),
    ),
  ],
};
