import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, bibit, emo, judul, kartu, keranjang, pagar, rumput, teks, tempatPetak, tokoh } from "./k2b5B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b5B-bantu";

/*
 * Cerita orisinal IGIL "Bibit untuk Dua Petak" (Kelas 2 Bab 5 Sub-Bab B, setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5b.md. Bagian ini: bibit datang, salah bagi (Chacha), dan bagi satu-satu (Nia).
 */

/** Letak tempat bibit pada bedeng standar (pojok 70, 60, lebar 160, tinggi 50). */
export const BD = { x: 70, y: 60, w: 160, h: 50 };
export const slot = (sisi: 0 | 1, i: number) => tempatPetak(BD.x, BD.y, BD.w, BD.h, sisi, i);

/* ------------------------------ 1. Bibit datang ------------------------------ */
const SUARA_1A = "Keranjang bibit cabai Bu Wati terguling, dan bibit-bibitnya berserakan di bedeng!";
const SUARA_1B = "Bibit itu harus ditanam sama banyak di dua petak, kata Bu Sari.";
const SUARA_1C = "Kalau tidak sama banyak, satu petak jadi sepi, dan panennya tidak adil.";

export const ADEGAN_BIBIT_DATANG: AdeganStory = {
  id: "bibit-datang",
  judul: "Bibit Bu Wati berserakan",
  sumber: "Materi: bibit datang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_1A,
      tambah(0, judul("Bibit Berserakan"), rumput("rm", 118), ...pagar("pg", 28)),
      tambah(idx(SUARA_1A, "Keranjang"), ...keranjang("kj", 40, 134, 0)),
      tambah(idx(SUARA_1A, "Wati"), ...tokoh("bw", 254, 164, "Bu Wati")),
      tambah(idx(SUARA_1A, "terguling,"), ...keranjang("kj", 46, 138, 82), emo("tb", 70, 128, E.tabrak, 16)),
      tambah(idx(SUARA_1A, "berserakan"), bibit("b0", 82, 150), bibit("b1", 100, 142), bibit("b2", 74, 166), bibit("b3", 112, 160)),
      tambah(idx(SUARA_1A, "bedeng!"), ...bedeng("bd", BD.x, BD.y, BD.w, BD.h)),
    ),
    k(
      SUARA_1B,
      hapus(0, "tb"),
      tambah(0, ...tokoh("bs", 170, 168, "Bu Sari")),
      tambah(idx(SUARA_1B, "ditanam"), emo("pa", 120, 128, "\u{27A1}\u{FE0F}", 14)),
      tambah(idx(SUARA_1B, "sama"), teks("sm", 218, 132, "sama banyak", 9, W.hijau)),
      tambah(idx(SUARA_1B, "dua"), teks("d2", 150, 52, "2 petak", 9, W.merah)),
      sorotkan(idx(SUARA_1B, "petak,"), "bd-l", "bd-r"),
    ),
    k(
      SUARA_1C,
      hapus(0, "pa"),
      ubah(0, { id: "bd-l", sorot: false }, { id: "bd-r", sorot: false }),
      tambah(idx(SUARA_1C, "banyak,"), emo("no", 150, 90, E.salah, 18)),
      tambah(idx(SUARA_1C, "satu"), teks("s1", 252, 52, "1 petak", 8.6, W.merah)),
      ubah(idx(SUARA_1C, "sepi,"), { id: "bd-r", warna: "#FECACA" }),
      tambah(idx(SUARA_1C, "panennya"), emo("c0", 94, 80, E.cabai, 12), emo("c1", 116, 80, E.cabai, 12), emo("c2", 138, 80, E.cabai, 12), emo("c3", 105, 96, E.cabai, 12), emo("c4", 127, 96, E.cabai, 12)),
      tambah(idx(SUARA_1C, "adil."), teks("ad", 150, 140, "tidak adil", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Salah bagi (salah langkah, momen lucu) ------------------------------ */
const SUARA_2A = "Chacha menghitung enam bibit, lalu menaruh empat di petak kiri dan dua di petak kanan.";
const SUARA_2B = "Dika mengerutkan dahi. Petak kiri lebih banyak, Chacha. Itu bukan setengah!";
const SUARA_2C = "Bibit di tangan Chacha jatuh ke topinya, dan ia tertawa karena topinya ikut tertanam!";
const AWAL6 = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 24 + 15 * i, y: 142 }));

export const ADEGAN_SALAH_BAGI: AdeganStory = {
  id: "salah-bagi",
  judul: "Chacha salah membagi bibit",
  sumber: "Materi: salah bagi",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_2A,
      tambah(0, judul("Salah Bagi"), rumput("rm2", 118), ...bedeng("bd2", BD.x, BD.y, BD.w, BD.h)),
      tambah(idx(SUARA_2A, "Chacha"), ...tokoh("ch", 52, 176, "Chacha")),
      ...AWAL6.map((p, i) => tambah(idx(SUARA_2A, "bibit,"), bibit(`q${i}`, p.x, p.y))),
      tambah(idx(SUARA_2A, "enam"), teks("n6", 64, 130, "6 bibit", 9, W.merah)),
      ...[0, 1, 2, 3].map((i) => ubah(idx(SUARA_2A, "empat"), { id: `q${i}`, x: slot(0, i).x, y: slot(0, i).y })),
      tambah(idx(SUARA_2A, "empat"), teks("n4", 110, 124, "4", 13, W.merah)),
      ...[4, 5].map((i) => ubah(idx(SUARA_2A, "dua"), { id: `q${i}`, x: slot(1, i - 4).x, y: slot(1, i - 4).y })),
      tambah(idx(SUARA_2A, "dua"), teks("n2", 190, 124, "2", 13, W.merah)),
    ),
    k(
      SUARA_2B,
      hapus(0, "n6"),
      tambah(0, ...tokoh("dk", 258, 174, "Dika")),
      tambah(idx(SUARA_2B, "dahi."), emo("pk", 226, 150, E.pikir, 18)),
      sorotkan(idx(SUARA_2B, "kiri"), "q0", "q1", "q2", "q3"),
      tambah(idx(SUARA_2B, "banyak,"), emo("x1", 150, 100, E.salah, 18)),
      tambah(idx(SUARA_2B, "setengah!"), teks("bs2", 176, 150, "bukan setengah", 9.6, W.merah)),
    ),
    k(
      SUARA_2C,
      hapus(0, "bs2", "pk", "x1", "n4", "n2"),
      ubah(0, { id: "q0", sorot: false }, { id: "q1", sorot: false }, { id: "q2", sorot: false }, { id: "q3", sorot: false }),
      tambah(idx(SUARA_2C, "tangan"), bibit("bj", 56, 124, 14, { z: 5 })),
      ubah(idx(SUARA_2C, "jatuh"), { id: "bj", y: 142 }),
      tambah(idx(SUARA_2C, "topinya,"), emo("tp", 52, 156, E.topi, 16, { z: 2 })),
      tambah(idx(SUARA_2C, "tertawa"), emo("tw", 84, 160, E.tertawa, 18)),
      ubah(idx(SUARA_2C, "tertanam!"), { id: "bj", u: 24, x: 52, y: 146 }),
    ),
  ],
};

/* ------------------------------ 3. Satu-satu ------------------------------ */
const SUARA_3A = "Nia punya cara. Satu bibit untuk petak kiri, satu bibit untuk petak kanan, bergantian.";
const SUARA_3B = "Terus begitu sampai bibit habis. Setiap petak mendapat tiga bibit.";
const SUARA_3C = "Dua bagian sama banyak, jadi setengah dari enam bibit adalah tiga.";
const AWAL3 = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 24 + 15 * i, y: 144 }));

export const ADEGAN_SATU_SATU: AdeganStory = {
  id: "satu-satu",
  judul: "Bagi satu-satu bergantian",
  sumber: "Materi: bagi satu-satu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_3A,
      tambah(0, judul("Satu untuk Kiri, Satu untuk Kanan"), rumput("rm3", 118), ...bedeng("bd3", BD.x, BD.y, BD.w, BD.h), ...AWAL3.map((p, i) => bibit(`r${i}`, p.x, p.y))),
      tambah(idx(SUARA_3A, "Nia"), ...tokoh("ni", 252, 174, "Nia")),
      ubah(idx(SUARA_3A, "kiri,"), { id: "r0", x: slot(0, 0).x, y: slot(0, 0).y }),
      tambah(idx(SUARA_3A, "kiri,"), teks("cl", 110, 124, "1", 14, W.merah)),
      ubah(idx(SUARA_3A, "kanan,"), { id: "r1", x: slot(1, 0).x, y: slot(1, 0).y }),
      tambah(idx(SUARA_3A, "kanan,"), teks("cr", 190, 124, "1", 14, W.merah)),
    ),
    k(
      SUARA_3B,
      ubah(idx(SUARA_3B, "Terus"), { id: "r2", x: slot(0, 1).x, y: slot(0, 1).y }, { id: "r3", x: slot(1, 1).x, y: slot(1, 1).y }, { id: "cl", isi: "2" }, { id: "cr", isi: "2" }),
      ubah(idx(SUARA_3B, "habis."), { id: "r4", x: slot(0, 2).x, y: slot(0, 2).y }, { id: "r5", x: slot(1, 2).x, y: slot(1, 2).y }, { id: "cl", isi: "3" }, { id: "cr", isi: "3" }),
      tambah(idx(SUARA_3B, "petak"), teks("pt", 150, 148, "petak kiri dan kanan", 9, W.hijau)),
      sorotkan(idx(SUARA_3B, "tiga"), "cl", "cr"),
    ),
    k(
      SUARA_3C,
      hapus(0, "pt"),
      tambah(idx(SUARA_3C, "Dua"), teks("d2", 150, 52, "2 bagian", 9.6, W.merah)),
      tambah(idx(SUARA_3C, "sama"), teks("sa", 150, 130, "=", 18, W.hijau)),
      tambah(idx(SUARA_3C, "setengah"), ...kartu("lb", 50, 150, 200, 24, W.krem, ["setengah dari 6 adalah 3"], 10)),
      sorotkan(idx(SUARA_3C, "tiga."), "cl", "cr"),
    ),
  ],
};
