import type { AdeganStory } from "./logika-story";
import { E, W, bengkel, emo, garis, halaman, judul, kotak, papanNama, sepeda, teks, tokoh, turus } from "./k3b5B-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b5B-bantu";

/*
 * Cerita orisinal IGIL "Tabel Bu Wulan" (Kelas 3 Bab 5 Sub-Bab B, menyajikan data dalam bentuk tabel), akhir cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5b.md. Bagian ini: klub di halaman bengkel, turus berlima, dan mencatat dengan turus.
 */

/* ------------------------------ 1. Klub ------------------------------ */
const SUARA_K1 = "Keesokan harinya mereka kembali ke bengkel, dan Bu Wulan, ketua klub sepeda berhelm kuning, sudah menunggu.";
const SUARA_K2 = "Ia membawa papan kosong dan spidol.";
const SUARA_K3 = "Hari ini data kerusakan sepeda klub akan disajikan dalam sebuah tabel.";

export const ADEGAN_KLUB: AdeganStory = {
  id: "klub",
  judul: "Klub sepeda di halaman bengkel",
  sumber: "Materi: klub sepeda",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Halaman Bengkel"), ...halaman("hl", 150), ...papanNama("pn", 62, 44)),
      tambah("bengkel,", ...bengkel("bk", 14, 96, 96, 54)),
      tambah("Wulan,", ...tokoh("bw", 252, 184, "Bu Wulan")),
      tambah("sepeda", ...sepeda("s1", 128, 146, 0.8), ...sepeda("s2", 162, 146, 0.8, "#2563EB"), ...sepeda("s3", 196, 146, 0.8, "#16A34A")),
      sorotkan("kuning,", "bw-hl"),
    ),
    k(
      SUARA_K2,
      tambah("papan", kotak("pb", 200, 96, 60, 40, W.putih, W.coklat, { rx: 4, tebal: 1.6, z: 2 })),
      tambah("kosong", teks("pk", 230, 120, "kosong", 8, W.abu)),
      tambah("spidol.", garis("sd", 244, 150, 12, -12, W.merah, 2.4, { z: 3 })),
    ),
    k(
      SUARA_K3,
      tambah(0, ...tokoh("ph", 62, 150, "Pak Hasan"), ...tokoh("pj", 100, 184, "Pak Joko"), ...tokoh("rk", 138, 184, "Raka")),
      tambah("data", ...tokoh("sl", 176, 184, "Salsa"), ...tokoh("bm", 214, 184, "Bima")),
      tambah("kerusakan", emo("pr", 150, 126, E.perkakas, 16)),
      tambah("tabel.", teks("tbl", 230, 120, "tabel", 9, W.ungu)),
      hapus("tabel.", "pk"),
    ),
  ],
};

/* ------------------------------ 2. Turus lima ------------------------------ */
const SUARA_T1 = "Bu Wulan menulis turus: empat garis tegak, lalu garis kelima mencoret miring.";
const SUARA_T2 = "Lima turus menjadi satu bundel yang mudah dihitung.";
const SUARA_T3 = "Banyak seluruhnya adalah bundel lima ditambah garis sisa.";
const TB = turus("tb", 110, 62, 5, 36, 8);
const TS = turus("ts", 150, 62, 3, 36, 8);

export const ADEGAN_TURUS_LIMA: AdeganStory = {
  id: "turus-lima",
  judul: "Turus berlima",
  sumber: "Materi: turus berlima",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Turus Lima"), ...tokoh("bw", 30, 184, "Bu Wulan"), kotak("pb", 60, 30, 220, 100, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 0 })),
      tambah("empat", ...TB.slice(0, 4), teks("n4", 123, 118, "4 garis tegak", 9, W.ungu)),
      tambah("mencoret", TB[4]),
      sorotkan("miring.", "tb-b0m"),
    ),
    k(
      SUARA_T2,
      hapus(0, "n4"),
      tambah(0, teks("n5", 190, 80, "5 turus", 10, W.merah)),
      tambah("satu", kotak("bd", 104, 56, 38, 48, undefined, W.merah, { tebal: 2.4, rx: 6, z: 4 }), teks("n1", 123, 118, "1 bundel", 9, W.ungu)),
      tambah("dihitung.", emo("ok", 230, 112, E.benar, 18)),
    ),
    k(
      SUARA_T3,
      hapus(0, "n5", "ok"),
      sorotkan("bundel", "tb-b0m"),
      tambah("lima", teks("l5", 190, 80, "5", 14, W.merah)),
      tambah("ditambah", teks("pl", 143, 84, "+", 14, W.ungu), ...TS),
      tambah("sisa.", teks("l3", 185, 118, "3 garis sisa", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Catat ------------------------------ */
const SUARA_C1 = "Bima membacakan kerusakan sepeda satu per satu: ban bocor, rantai lepas, rem blong.";
const SUARA_C2 = "Salsa membuat turus untuk tiap jenis, dan mencoret miring di garis kelima.";
const SUARA_C3 = "Setelah selesai, ban bocor punya dua bundel dan tiga garis.";
const R1 = turus("r1", 232, 49, 13, 14, 3.2);
const R2 = turus("r2", 232, 71, 10, 14, 3.2);
const R3 = turus("r3", 232, 93, 6, 14, 3.2);
const tegak = (o: ReturnType<typeof turus>) => o.filter((x) => !x.id.endsWith("m"));
const miring = (o: ReturnType<typeof turus>) => o.filter((x) => x.id.endsWith("m"));

export const ADEGAN_CATAT: AdeganStory = {
  id: "catat",
  judul: "Mencatat dengan turus",
  sumber: "Materi: mencatat dengan turus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Mencatat Kerusakan"), ...tokoh("bm", 36, 184, "Bima"), kotak("dk", 64, 36, 108, 72, W.putih, W.biru, { rx: 6, z: 1 })),
      tambah("ban", teks("d1", 118, 58, "1. ban bocor", 8.4, W.biru, { z: 2 })),
      tambah("rantai", teks("d2", 118, 78, "2. rantai lepas", 8.4, W.biru, { z: 2 })),
      tambah("rem", teks("d3", 118, 98, "3. rem blong", 8.4, W.biru, { z: 2 })),
    ),
    k(
      SUARA_C2,
      tambah("Salsa", ...tokoh("sl", 270, 184, "Salsa"), kotak("pn", 182, 36, 112, 82, W.putih, W.coklat, { rx: 4, z: 1 })),
      tambah("turus", teks("e1", 196, 60, "ban", 7.4, W.biru, { z: 2 }), teks("e2", 196, 82, "rantai", 7.4, W.biru, { z: 2 }), teks("e3", 196, 104, "rem", 7.4, W.biru, { z: 2 }), ...tegak(R1), ...tegak(R2), ...tegak(R3)),
      tambah("mencoret", ...miring(R1), ...miring(R2), ...miring(R3)),
    ),
    k(
      SUARA_C3,
      sorotkan("ban", "r1-b0m", "r1-b1m"),
      tambah("dua", teks("c2", 214, 138, "2 bundel", 8, W.ungu)),
      tambah("tiga", teks("c3", 264, 138, "3 garis", 8, W.ungu)),
    ),
  ],
};
