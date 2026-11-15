import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, garisBilangan, judul, kartu, kotak, teks, xGaris } from "./k1b5d-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5d-bantu";

/** Satu puluhan: kotak berisi sepuluh titik (dua baris lima). Kotak `${id}b`, titik `${id}p0` sampai `${id}p9`. */
export const puluhan = (id: string, x: number, y: number, dx: number, r: number, warna: string, baris = 22): Obj[] => [
  kotak(`${id}b`, x, y, dx * 5 + 0, baris * 2 + 4, W.putih, W.biru, { rx: 5, tebal: 1.6 }),
  ...Array.from({ length: 10 }, (_, i) => bulat(`${id}p${i}`, x + dx / 2 + (i % 5) * dx, y + baris / 2 + 2 + Math.floor(i / 5) * baris, r, warna, W.biru, { tebal: 1.3 })),
];
/** Satuan lepas: `n` titik sebaris mulai (x, y) berjarak dx. Titik `${id}s0` dan seterusnya. */
export const satuan = (id: string, x: number, y: number, n: number, dx: number, r: number, warna: string): Obj[] => Array.from({ length: n }, (_, i) => bulat(`${id}s${i}`, x + i * dx, y, r, warna, W.biru, { tebal: 1.3 }));
export const ids = (p: string, n: number, huruf: string): string[] => Array.from({ length: n }, (_, i) => `${p}${huruf}${i}`);

/* ------------------------------ 1. Dua stoples: puluhan sama, lihat satuan ------------------------------ */
const SUARA_P1 = "Ada dua stoples kelereng. Stoples A berisi tiga belas kelereng. Itu satu puluhan dan tiga satuan.";
const SUARA_P2 = "Stoples B berisi enam belas kelereng. Itu satu puluhan dan enam satuan.";
const SUARA_P3 = "Kita bandingkan. Pertama lihat puluhannya. Puluhan stoples A satu, puluhan stoples B juga satu. Puluhannya sama.";
const SUARA_P4 = "Karena puluhannya sama, kita lihat satuannya. Satuan stoples A ada tiga. Satuan stoples B ada enam.";
const SUARA_P5 = "Tiga lebih sedikit dari enam. Jadi kelereng di stoples A lebih sedikit dari kelereng di stoples B.";
const SUARA_P6 = "Jadi tiga belas lebih kecil dari enam belas. Atau enam belas lebih besar dari tiga belas.";
const WA = "#38BDF8";
const WB = "#F472B6";

export const ADEGAN_STOPLES: AdeganStory = {
  id: "dua-stoples",
  judul: "Dua stoples kelereng",
  sumber: "Materi: dua stoples, puluhan sama",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Dua stoples"), teks("sa", 75, 38, "Stoples A", 9.6, W.ungu)),
      ubahAt(SUARA_P1, "belas", { id: "sa", isi: "Stoples A: 13", warna: W.merah }),
      tambah("puluhan", ...puluhan("a", 20, 46, 22, 7, WA)),
      tambah("satuan.", ...satuan("a", 31, 110, 3, 22, 7, WA), teks("ac", 75, 142, "10 + 3", 11, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah(0, teks("sb", 217, 38, "Stoples B", 9.6, W.ungu)),
      ubahAt(SUARA_P2, "belas", { id: "sb", isi: "Stoples B: 16", warna: W.merah }),
      tambah("puluhan", ...puluhan("b", 162, 46, 22, 7, WB)),
      tambah("satuan.", ...satuan("b", 173, 110, 6, 22, 7, WB), teks("bc", 217, 142, "10 + 6", 11, W.merah)),
    ),
    k(SUARA_P3, sorotkan("puluhannya.", "ab", "bb"), tambah("Puluhan", ...kartu("pc", 40, 158, 220, 26, W.krem, ["puluhan: 1 dan 1, sama"], 10)), sorotkan("sama.", ...ids("a", 10, "p"), ...ids("b", 10, "p"))),
    k(
      SUARA_P4,
      redamkan(0, "ab", "bb", ...ids("a", 10, "p"), ...ids("b", 10, "p")),
      hapus(0, "pc-k", "pc-t0"),
      sorotkan("satuannya.", ...ids("a", 3, "s"), ...ids("b", 6, "s")),
      tambah("tiga.", teks("ad", 75, 128, "3 satuan", 9.6, W.merah)),
      tambah("enam.", teks("bd", 217, 128, "6 satuan", 9.6, W.merah)),
    ),
    k(SUARA_P5, redamkan(0, ...ids("a", 3, "s"), ...ids("b", 6, "s")), tambah("sedikit", ...kartu("hs", 14, 160, 134, 26, W.langit, ["A: lebih sedikit"], 9.6)), tambah("stoples@2", ...kartu("hb", 152, 160, 134, 26, W.pink, ["B: lebih banyak"], 9.6))),
    k(SUARA_P6, hapus(0, "hs-k", "hs-t0", "hb-k", "hb-t0"), tambah("Jadi", ...kartu("jk", 30, 158, 240, 22, W.hijauMuda, ["13 lebih kecil dari 16"], 10)), tambah("Atau", ...kartu("jb", 30, 184, 240, 14, W.emas, ["16 lebih besar dari 13"], 9))),
  ],
};

/** Ubah benda pada kata `kata` (kemunculan pertama) dalam `suara`; galat bila kata tidak ada. */
function ubahAt(suara: string, kata: string, u: { id: string } & Partial<Obj>) {
  return ubah(idx(suara, kata), u);
}

/* ------------------------------ 2. Puluhan beda: dua puluh dan delapan belas ------------------------------ */
const SUARA_Q1 = "Sekarang bilangan dua puluh dan delapan belas. Dua puluh itu dua puluhan, tidak ada satuan.";
const SUARA_Q2 = "Delapan belas itu satu puluhan dan delapan satuan.";
const SUARA_Q3 = "Kita lihat puluhannya dulu. Bilangan A punya dua puluhan. Bilangan B hanya punya satu puluhan.";
const SUARA_Q4 = "Dua puluhan lebih banyak dari satu puluhan. Jadi dua puluh lebih besar dari delapan belas. Satuannya tidak perlu dilihat.";
const SUARA_Q5 = "Ingat, lihat puluhan dulu. Kalau puluhannya beda, yang puluhannya lebih banyak lebih besar. Kalau sama, baru lihat satuan.";

export const ADEGAN_PULUHAN_BEDA: AdeganStory = {
  id: "puluhan-beda",
  judul: "Puluhan berbeda: dua puluh dan delapan belas",
  sumber: "Materi: puluhan berbeda",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Dua bilangan"), teks("qa", 80, 38, "A: 20", 10, W.merah)),
      tambah(idx(SUARA_Q1, "belas"), teks("qb", 210, 38, "B: 18", 10, W.merah)),
      tambah("dua", ...puluhan("a", 40, 46, 16, 5.5, WA, 16)),
      tambah("puluhan,", ...puluhan("c", 40, 84, 16, 5.5, WA, 16)),
      tambah("satuan.", teks("qs", 80, 132, "tanpa satuan", 8.6, W.ungu)),
    ),
    k(SUARA_Q2, tambah("satu", ...puluhan("b", 170, 46, 16, 5.5, WB, 16)), tambah("delapan@2", ...satuan("b", 164, 100, 8, 15, 5.5, WB))),
    k(
      SUARA_Q3,
      hapus(0, "qs"),
      sorotkan(idx(SUARA_Q3, "A"), "ab", "cb"),
      tambah("dua", teks("q2", 80, 132, "2 puluhan", 9.6, W.merah)),
      tambah("hanya", teks("q1", 210, 132, "1 puluhan", 9.6, W.merah)),
      sorotkan(idx(SUARA_Q3, "B"), "bb"),
    ),
    k(SUARA_Q4, redamkan(0, "ab", "cb", "bb"), tambah("Jadi", ...kartu("qk", 30, 152, 240, 26, W.emas, ["20 lebih besar dari 18"], 10.4)), tambah("Satuannya", emo("qm", 262, 192, "\u{1F44D}", 18))),
    k(SUARA_Q5, hapus(0, "qm"), tambah("Ingat,", ...kartu("qi", 20, 184, 260, 14, W.krem, ["puluhan dulu, kalau sama baru satuan"], 8.6))),
  ],
};

/* ------------------------------ 3. Garis bilangan ------------------------------ */
const SUARA_G1 = "Garis bilangan juga membantu kita membandingkan. Ini garis bilangan dari sepuluh sampai dua puluh.";
const SUARA_G2 = "Kita hitung maju: sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas. Bilangannya makin besar ke kanan.";
const SUARA_G3 = "Ayo bandingkan lima belas dan sebelas. Lima belas ada di sebelah kanan sebelas. Jadi lima belas lebih besar dari sebelas.";
const SUARA_G4 = "Sebelas ada di sebelah kiri lima belas. Jadi sebelas lebih kecil dari lima belas. Yang lebih ke kiri lebih kecil.";
const SUARA_G5 = "Sekarang tiga belas dan delapan belas. Ketuk tiga belas, lalu ketuk delapan belas. Delapan belas ada di kanan, jadi delapan belas lebih besar.";
const SUARA_G6 = "Ingat, di garis bilangan, yang lebih ke kanan lebih besar. Dan yang lebih ke kiri lebih kecil.";
const GY = 104;
const tanda = (id: string, v: number, warna: string): Obj => bulat(id, xGaris(v), GY - 10, 6, warna, W.biru, { tebal: 1.4 });
/** Panah mendatar dari bilangan `dari` ke bilangan `ke` pada tinggi `y`. */
const panah = (id: string, dari: number, ke: number, y: number): Obj[] => {
  const x1 = xGaris(dari);
  const x2 = xGaris(ke);
  const s = x2 > x1 ? 1 : -1;
  return [garis(id, x1, y, x2 - x1, 0, W.merah, 2.4), garis(`${id}a`, x2, y, -8 * s, -5, W.merah, 2.4), garis(`${id}b`, x2, y, -8 * s, 5, W.merah, 2.4)];
};
const POS_G2 = (): number[] => urutBil(SUARA_G2, 10, 15, "maju");

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-bilangan",
  judul: "Membandingkan di garis bilangan",
  sumber: "Materi: garis bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan")), tambah("Ini", ...garisBilangan("g", GY))),
    k(
      SUARA_G2,
      tambah("maju", emo("fr", xGaris(10), GY - 12, "\u{1F438}", 20)),
      ...POS_G2().flatMap((p, i) => [ubah(p, { id: "fr", x: xGaris(10 + i) }), ...(i > 0 ? [redamkan(p, `gk${9 + i}`)] : []), sorotkan(p, `gk${10 + i}`)]),
      tambah("makin", ...kartu("g2", 40, 150, 220, 26, W.krem, ["makin ke kanan, makin besar"], 10)),
    ),
    k(
      SUARA_G3,
      hapus(0, "fr", "g2-k", "g2-t0"),
      redamkan(0, "gk15"),
      tambah(idx(SUARA_G3, "lima", 1), tanda("m15", 15, W.merah)),
      tambah(idx(SUARA_G3, "sebelas", 1), tanda("m11", 11, W.hijau)),
      tambah("kanan", ...panah("pn", 11, 15, 70), teks("pt", 150, 62, "ke kanan", 9.6, W.merah)),
      tambah("besar", ...kartu("g3", 40, 150, 220, 26, W.hijauMuda, ["15 lebih besar dari 11"], 10)),
    ),
    k(
      SUARA_G4,
      hapus(0, "pn", "pna", "pnb", "g3-k", "g3-t0"),
      redamkan(0, "gk11"),
      tambah("kiri", ...panah("pm", 15, 11, 70)),
      ubah("kiri", { id: "pt", isi: "ke kiri" }),
      tambah("kecil.", ...kartu("g4", 40, 150, 220, 26, W.langit, ["11 lebih kecil dari 15"], 10)),
    ),
    k(
      SUARA_G5,
      hapus(0, "pm", "pma", "pmb", "m15", "m11", "g4-k", "g4-t0"),
      ubah(0, { id: "pt", isi: "ke kanan" }),
      tambah(idx(SUARA_G5, "belas", 1), tanda("m13", 13, W.hijau)),
      tambah(idx(SUARA_G5, "belas", 2), tanda("m18", 18, W.merah)),
      tambah("Ketuk", ...panah("pq", 13, 18, 70)),
      tambah("kanan,", ...kartu("g5", 40, 150, 220, 26, W.pink, ["18 lebih besar dari 13"], 10)),
    ),
    k(
      SUARA_G6,
      bersih(0),
      tambah(0, judul("Ingat"), ...garisBilangan("g", GY)),
      tambah("kanan", ...kartu("g6a", 160, 150, 126, 26, W.hijauMuda, ["kanan: lebih besar"], 9.4)),
      tambah("kiri.", ...kartu("g6b", 14, 150, 126, 26, W.langit, ["kiri: lebih kecil"], 9.4)),
    ),
  ],
};

/* ------------------------------ 4. Tanda lebih dari, kurang dari, sama dengan ------------------------------ */
const SUARA_T1 = "Ada tanda untuk membandingkan. Tanda ini seperti mulut yang terbuka. Mulutnya menghadap ke bilangan yang lebih besar.";
const SUARA_T2 = "Lima belas lebih dari sebelas. Mulutnya terbuka ke lima belas, karena lima belas lebih besar.";
const SUARA_T3 = "Sebelas kurang dari lima belas. Mulutnya tetap terbuka ke lima belas. Tandanya jadi begini.";
const SUARA_T4 = "Kalau dua bilangan sama banyak, kita pakai tanda sama dengan. Dua belas sama dengan dua belas.";
const SUARA_T5 = "Sekarang pilih tanda untuk tujuh belas dan sebelas. Ketuk pilihannya: lebih dari, kurang dari, atau sama dengan. Tujuh belas lebih dari sebelas.";
const IFADE = (isi: string, warna: string = W.biru): Obj => teks("ex", 150, 92, isi, 30, warna);

export const ADEGAN_TANDA: AdeganStory = {
  id: "tanda-banding",
  judul: "Tanda lebih dari, kurang dari, sama dengan",
  sumber: "Materi: tanda pembanding",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tanda pembanding")), tambah("mulut", IFADE("15 ? 11")), tambah("besar.", emo("mu", 150, 148, "\u{1F40A}", 34))),
    k(SUARA_T2, hapus(0, "mu"), ubah("Mulutnya", { id: "ex", isi: "15 > 11", warna: W.merah }), tambah("dari", ...kartu("lb", 70, 124, 160, 28, W.hijauMuda, ["lebih dari"], 11)), sorotkan("karena", "lb-k")),
    k(SUARA_T3, redamkan(0, "lb-k"), hapus(0, "lb-k", "lb-t0"), ubah("Tandanya", { id: "ex", isi: "11 < 15", warna: W.merah }), tambah("kurang", ...kartu("kd", 70, 124, 160, 28, W.langit, ["kurang dari"], 11))),
    k(SUARA_T4, hapus(0, "kd-k", "kd-t0"), ubah("Dua", { id: "ex", isi: "12 = 12", warna: W.hijau }), tambah("sama@2", ...kartu("sd", 70, 124, 160, 28, W.pink, ["sama dengan"], 11))),
    k(
      SUARA_T5,
      hapus(0, "sd-k", "sd-t0"),
      ubah(0, { id: "ex", isi: "17 ? 11", warna: W.biru }),
      tambah("Ketuk", ...kartu("o1", 14, 130, 90, 28, W.hijauMuda, ["lebih dari"], 9.4), ...kartu("o2", 106, 130, 90, 28, W.langit, ["kurang dari"], 9.4), ...kartu("o3", 198, 130, 90, 28, W.pink, ["sama dengan"], 9.4)),
      sorotkan("Tujuh@2", "o1-k"),
      ubah("Tujuh@2", { id: "ex", isi: "17 > 11", warna: W.merah }),
    ),
  ],
};
