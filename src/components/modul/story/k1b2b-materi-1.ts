import type { AdeganStory } from "./logika-story";
import { E, W, bedengSepuluh, deret, deretEmo, emo, judul, kalimat, kartu, kotak, label, lompat, orang, pagar, teks, xPagar } from "./k1b2b-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b2b-bantu";

/*
 * Cerita orisinal IGIL "Panen Pertama dan Keranjang Sepuluh" (Kelas 1 Bab 2 Sub-Bab B, berbagai cara menjumlah),
 * lanjutan "Bibit Kiriman Nenek". Masalah: sayur harus cepat dikemas ke keranjang yang muat tepat sepuluh dan kantong
 * yang sama banyak, padahal menghitung satu per satu terlalu lama. Penyelesaian: pasangan bilangan dan tukar tempat,
 * hitung maju dengan lompatan, penjumlahan kembar, dan pasangan sepuluh.
 */

/* ------------------------------ 1. Panen pertama ------------------------------ */
const SUARA_P1 = "Dua minggu kemudian, bibit di kebun Mamah tumbuh besar. Hari ini panen pertama!";
const SUARA_P2 = "Nenek minta dikirimi satu keranjang sayur. Keranjangnya punya sepuluh lubang, jadi muat tepat sepuluh.";
const SUARA_P3 = "Masalahnya, sayur cepat layu kalau menunggu. Menghitung satu per satu terlalu lama. Kita perlu cara yang cepat.";

export const ADEGAN_PANEN: AdeganStory = {
  id: "panen-pertama",
  judul: "Panen pertama",
  sumber: "Materi: masalah mengemas panen",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Panen pertama"), kotak("tn", 10, 132, 280, 60, "#D6A15E", W.coklat, { rx: 10, z: -2 })),
      tambah("tumbuh", ...deretEmo(E.tomat, "sy", deret(4, 40, 30, 160), 22), emo("sy4", 160, 160, E.cabai, 22), emo("sy5", 190, 160, E.wortel, 22), emo("sy6", 220, 160, E.timun, 22), emo("sy7", 250, 160, E.selada, 22)),
      tambah("panen", ...orang("mm", 150, 100, E.mamah, "Mamah"), emo("mt", 262, 56, E.matahari, 28)),
    ),
    k(
      SUARA_P2,
      hapus(0, "mm", "mm-n"),
      tambah("Nenek", ...orang("nn", 40, 100, E.nenek, "Nenek")),
      tambah("keranjang", emo("kj", 236, 104, E.keranjang, 30)),
      tambah("lubang,", ...bedengSepuluh("bs", 100, 44, 18)),
      tambah("sepuluh.", ...label("s10", 104, 96, 92, "muat 10", W.emas)),
    ),
    k(
      SUARA_P3,
      hapus(0, "mt"),
      tambah("layu", emo("ly", 262, 56, E.layu, 26)),
      tambah("lama.", emo("jm", 36, 56, E.jam, 26)),
      tambah("cepat.", teks("tq", 150, 124, "cara yang cepat?", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Pasangan bilangan dan tukar tempat ------------------------------ */
const SUARA_T1 = "Kaka memetik tiga tomat merah. Igil memetik dua timun.";
const SUARA_T2 = "Tiga ditambah dua sama dengan lima. Tiga dan dua adalah pasangan bilangan dari lima.";
const SUARA_T3 = "Igil menukar tempat keranjangnya. Sekarang dua ditambah tiga, hasilnya tetap lima.";
const MERAH = deret(3, 40, 26, 116);
const HIJAU = deret(2, 196, 26, 116);
const HIJAU_KIRI = deret(2, 54, 26, 116);
const MERAH_KANAN = deret(3, 182, 26, 116);

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar-tempat",
  judul: "Pasangan bilangan dan tukar tempat",
  sumber: "Materi: pasangan bilangan, tukar tempat",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tomat dan timun")),
      tambah("Kaka", ...orang("kk", 70, 64, E.kaka, "Kaka"), kotak("k1", 20, 98, 112, 30, "#FDE68A", W.coklat, { rx: 6, z: -1 })),
      tambah("tiga", ...deretEmo(E.tomat, "tm", MERAH, 20)),
      tambah("Igil", ...orang("ig", 222, 64, E.igil, "Igil"), kotak("k2", 168, 98, 112, 30, "#FDE68A", W.coklat, { rx: 6, z: -1 })),
      tambah("dua", ...HIJAU.map((p, i) => emo(`th${i}`, p.x, p.y, E.timun, 20))),
    ),
    k(SUARA_T2, tambah("Tiga", ...kalimat("ka", 150, 162, ["3", "+", "2", "=", "5"], 18, 26)), tambah("pasangan", ...label("ps", 70, 176, 160, "pasangan dari 5", W.hijauMuda, 9))),
    k(
      SUARA_T3,
      hapus(0, "ps-k", "ps-t0"),
      ubah("menukar", ...HIJAU_KIRI.map((p, i) => ({ id: `th${i}`, x: p.x })), ...MERAH_KANAN.map((p, i) => ({ id: `tm${i}`, x: p.x }))),
      ubah("Sekarang", { id: "ka0", isi: "2" }, { id: "ka2", isi: "3" }),
      sorotkan("tetap", "ka4"),
      tambah("tetap", ...label("tt", 100, 176, 100, "hasil sama", W.emas, 9)),
    ),
  ],
};

/* ------------------------------ 3. Hitung maju di pagar bernomor ------------------------------ */
const SUARA_M1 = "Abang memetik enam cabai, lalu tiga cabai lagi. Ia memakai pagar kayu bernomor di pinggir kebun.";
const SUARA_M2 = "Mulai dari enam, lalu melompat tiga kali. Tujuh, delapan, sembilan.";
const SUARA_M3 = "Enam ditambah tiga sama dengan sembilan. Tidak perlu menghitung lagi dari satu.";
const PG = { x0: 20, y: 120, s: 26 };
const posM2 = urutKata(SUARA_M2, ["Tujuh,", "delapan,", "sembilan."]);

export const ADEGAN_MAJU: AdeganStory = {
  id: "maju-pagar",
  judul: "Melompat di pagar bernomor",
  sumber: "Materi: hitung maju dengan lompatan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Pagar bernomor")),
      tambah("Abang", ...orang("ab", 30, 66, E.abang, "Abang")),
      tambah("enam", ...deretEmo(E.cabai, "cb", deret(6, 70, 22, 56), 18)),
      tambah("tiga", ...deretEmo(E.cabai, "cc", deret(3, 214, 22, 56), 18)),
      tambah("pagar", ...pagar("pg", PG.x0, PG.y, PG.s)),
    ),
    k(
      SUARA_M2,
      tambah("enam,", emo("ab2", xPagar(PG.x0, 6, PG.s), PG.y - 30, E.abang, 18)),
      sorotkan("enam,", "pga6"),
      ...[0, 1, 2].map((i) => tambah(posM2[i], lompat(`lp${i}`, PG.x0, PG.y, 6 + i, PG.s))),
      ...[0, 1, 2].map((i) => ubah(posM2[i], { id: "ab2", x: xPagar(PG.x0, 7 + i, PG.s) }, { id: `pga${7 + i}`, sorot: true })),
    ),
    k(SUARA_M3, tambah("Enam", ...kalimat("km", 150, 180, ["6", "+", "3", "=", "9"], 18, 26)), tambah("satu.", ...kartu("ns", 14, 84, 90, 22, W.hijauMuda, ["bukan dari 1"], 9))),
  ],
};
