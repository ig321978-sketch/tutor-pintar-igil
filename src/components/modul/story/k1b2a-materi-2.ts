import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, bedengSepuluh, deret, deretEmo, emo, judul, kalimat, kotak, label, lubang, orang, petak, teks } from "./k1b2a-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b2a-bantu";

/* Lanjutan "Bibit Kiriman Nenek": menggabungkan dua keranjang tomat di bedeng sepuluh lubang, selada dan nol, sawi sampai sepuluh. */

/* ------------------------------ 4. Dua keranjang tomat digabung ------------------------------ */
const SUARA_T1 = "Kaka membawa keranjang berisi tiga bibit tomat. Igil membawa keranjang berisi lima bibit tomat.";
const SUARA_T2 = "Semua bibit tomat ditanam bersama di satu bedeng. Dua kumpulan digabung menjadi satu.";
const SUARA_T3 = "Bedeng ini punya dua baris lubang, seperti bingkai sepuluh. Terisi delapan, kosong dua. Tiga ditambah lima sama dengan delapan.";
const BS = { x: 85, y: 144, s: 22 };
const KIRI = deret(3, 30, 30, 126);
const KANAN = deret(5, 170, 26, 126);
const TOMAT = [...KIRI, ...KANAN];
const DI_BEDENG = TOMAT.map((_, i) => {
  const p = petak(BS.x, BS.y, i, BS.s);
  return { x: p.x, y: p.y + 6 };
});

export const ADEGAN_TOMAT: AdeganStory = {
  id: "tomat-digabung",
  judul: "Dua keranjang tomat digabung",
  sumber: "Materi: menggabungkan dua kumpulan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Dua keranjang tomat")),
      tambah("Kaka", ...orang("kk", 60, 70, E.kaka, "Kaka")),
      tambah("tiga", kotak("kr1", 10, 106, 120, 30, "#FDE68A", W.coklat, { rx: 6, z: -1 }), ...deretEmo(E.tomat, "tm", KIRI, 20)),
      tambah("Igil", ...orang("ig", 222, 70, E.igil, "Igil")),
      tambah("lima", kotak("kr2", 152, 106, 140, 30, "#FDE68A", W.coklat, { rx: 6, z: -1 }), ...KANAN.map((p, i) => emo(`tm${3 + i}`, p.x, p.y, E.tomat, 20))),
    ),
    k(
      SUARA_T2,
      tambah("bedeng.", ...bedengSepuluh("bs", BS.x, BS.y, BS.s)),
      hapus("digabung", "kr1", "kr2"),
      ubah("digabung", ...DI_BEDENG.map((p, i) => ({ id: `tm${i}`, x: p.x, y: p.y, u: 16 }))),
      tambah("satu.@2", ...label("gb", 106, 106, 88, "jadi satu", W.hijauMuda)),
    ),
    k(
      SUARA_T3,
      hapus(0, "gb-k", "gb-t0"),
      tambah("bingkai", teks("bk", 150, 132, "bingkai sepuluh", 9, W.coklat)),
      sorotkan("kosong", "bsc8", "bsc9"),
      tambah("Tiga", ...kalimat("kl", 150, 108, ["3", "+", "5", "=", "8"], 18, 26)),
    ),
  ],
};

/* ------------------------------ 5. Selada dan nol ------------------------------ */
const SUARA_N1 = "Bedeng selada sudah berisi tujuh bibit. Keranjang selada yang kedua ternyata kosong.";
const SUARA_N2 = "Kosong artinya nol. Tujuh ditambah nol sama dengan tujuh. Tidak ada yang bertambah.";
const SUARA_N3 = "Jadi Mamah cukup menggali tujuh lubang untuk selada, tidak lebih.";
const SELADA = deret(7, 34, 24, 146);

export const ADEGAN_NOL: AdeganStory = {
  id: "selada-nol",
  judul: "Selada dan nol",
  sumber: "Materi: menambah dengan nol",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Selada dan nol"), ...bedeng("bd", 14, 118, 186, 42)),
      tambah("tujuh", ...deretEmo(E.selada, "sl", SELADA, 18)),
      tambah("Keranjang", kotak("kr", 214, 118, 74, 42, "#FDE68A", W.coklat, { rx: 6, z: -1 })),
      tambah("kosong.", teks("ks", 251, 144, "kosong", 9, W.coklat)),
    ),
    k(
      SUARA_N2,
      tambah("nol.", teks("n0", 251, 104, "0", 22, W.merah)),
      tambah("Tujuh", ...kalimat("kl", 120, 70, ["7", "+", "0", "=", "7"], 18, 26)),
      sorotkan("Tidak", "bd"),
    ),
    k(
      SUARA_N3,
      hapus(0, "kr", "ks", "n0"),
      tambah("Mamah", ...orang("mm", 250, 150, E.mamah, "Mamah")),
      tambah("lubang", ...SELADA.map((p, i) => lubang(`lb${i}`, p.x, 155, 4))),
      tambah("lebih.", ...label("tj", 214, 88, 76, "7 lubang", W.emas)),
    ),
  ],
};

/* ------------------------------ 6. Bedeng sawi penuh sepuluh ------------------------------ */
const SUARA_S1 = "Bedeng terakhir untuk sawi. Abang menanam enam bibit sawi.";
const SUARA_S2 = "Mamah menambah empat bibit lagi. Mulai dari enam, lalu tujuh, delapan, sembilan, sepuluh.";
const SUARA_S3 = "Enam ditambah empat sama dengan sepuluh. Semua lubang di bedeng terisi penuh.";
const BW = { x: 85, y: 118, s: 26 };
const SAWI = Array.from({ length: 10 }, (_, i) => {
  const p = petak(BW.x, BW.y, i, BW.s);
  return { x: p.x, y: p.y + 7 };
});
const posS2 = urutKata(SUARA_S2, ["enam,", "tujuh,", "delapan,", "sembilan,", "sepuluh."], "dari");

export const ADEGAN_SAWI: AdeganStory = {
  id: "sawi-sepuluh",
  judul: "Bedeng sawi penuh sepuluh",
  sumber: "Materi: penjumlahan sampai sepuluh",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bedeng sawi"), ...bedengSepuluh("bs", BW.x, BW.y, BW.s)),
      tambah("Abang", ...orang("ab", 38, 90, E.abang, "Abang")),
      tambah("enam", ...deretEmo(E.sawi, "sw", SAWI.slice(0, 6), 18)),
    ),
    k(
      SUARA_S2,
      tambah("Mamah", ...orang("mm", 262, 90, E.mamah, "Mamah")),
      tambah(posS2[0], teks("hn5", SAWI[5].x, 194, "6", 11, W.merah)),
      ...[6, 7, 8, 9].map((i, n) => tambah(posS2[n + 1], emo(`sw${i}`, SAWI[i].x, SAWI[i].y, E.sawi, 18), teks(`hn${i}`, SAWI[i].x, 194, String(i + 1), 11, W.merah))),
    ),
    k(
      SUARA_S3,
      tambah("Enam", ...kalimat("kl", 150, 60, ["6", "+", "4", "=", "10"], 18, 28)),
      sorotkan("Semua", ...SAWI.map((_, i) => `bsc${i}`)),
      tambah("penuh.", ...label("pn", 110, 76, 80, "penuh!", W.hijauMuda)),
    ),
  ],
};
