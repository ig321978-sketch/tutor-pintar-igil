import type { AdeganStory, Obj } from "./logika-story";
import { E, W, baris, bingkai, bulat, deretMainan, emo, judul, kartu, orang } from "./k1b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1b-bantu";

/* Video metode global Sub-Bab B "Hadiah Nenek untuk Rak yang Lebih Sedikit": pembuka dan Ten Frame (Bingkai Sepuluh). */

export const NAMA_METODE = ["Ten Frame", "Number Line", "One More, One Less"];
export const NAMA_METODE_ID = ["Bingkai Sepuluh", "Garis Bilangan", "Satu Lebih Banyak, Satu Lebih Sedikit"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], i === 2 ? 7.6 : 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Hadiah Nenek sudah sampai di rak yang tepat. Kaka bercerita, anak-anak di negara lain juga belajar membandingkan. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Ten Frame, Number Line, dan One More, One Less.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Bingkai Sepuluh, Garis Bilangan, dan Satu Lebih Banyak, Satu Lebih Sedikit.";
const SUARA_O4 = "Semua metode menjawab pertanyaan Igil: mana yang lebih banyak, dan mana yang lebih sedikit?";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk membandingkan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), emo("kd", 150, 96, E.hadiah, 40)),
      tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")),
      tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Frame,", "Line,", "More,"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Bingkai", "Garis", "Satu"][i], ...kartu(`n${i}`, 14, 40 + i * 48, 272, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], i === 2 ? 9.4 : 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan"), emo("i2", 150, 90, E.igil, 40)),
      tambah("banyak,", ...kartu("q1", 14, 120, 130, 34, W.hijauMuda, ["lebih banyak?"], 10)),
      tambah("sedikit?", ...kartu("q2", 156, 120, 130, 34, W.merahMuda, ["lebih sedikit?"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Ten Frame: konsep ------------------------------ */
const SUARA_F1 = "Metode pertama, Ten Frame, atau Bingkai Sepuluh. Bingkai ini punya sepuluh kotak, lima di atas dan lima di bawah.";
const SUARA_F2 = "Satu kotak diisi satu benda. Isi baris atas dulu sampai penuh, baru baris bawah.";
const SUARA_F3 = "Bingkai yang lebih penuh berisi lebih banyak. Bingkai yang kotak kosongnya banyak berisi lebih sedikit.";
const SUARA_F4 = "Jadi kita cukup melihat bingkainya, tanpa memasangkan satu per satu.";
const SEL = 22;
/** Titik merah di sel ke-i bingkai berpojok (x, y). */
const titikSel = (id: string, x: number, y: number, i: number): Obj => bulat(`${id}-t${i}`, x + (i % 5) * SEL + SEL / 2, y + Math.floor(i / 5) * SEL + SEL / 2, SEL * 0.32, W.merah, W.merah, { tebal: 1 });

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: bingkai sepuluh kotak",
  sumber: "Metode global: Ten Frame",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_F1,
      tambah("pertama,", ...kepala(0)),
      tambah("Bingkai@2", ...bingkai("fa", 95, 70, 0, SEL)),
      tambah("sepuluh@2", ...kartu("fk", 110, 128, 80, 24, W.emas, ["10 kotak"], 10)),
      sorotkan("atas", "fa-c0", "fa-c1", "fa-c2", "fa-c3", "fa-c4"),
    ),
    k(
      SUARA_F2,
      hapus(0, "fk-k", "fk-t0"),
      ubah(0, ...[0, 1, 2, 3, 4].map((i) => ({ id: `fa-c${i}`, sorot: false }))),
      tambah("Isi", ...[0, 1, 2, 3, 4].map((i) => titikSel("fa", 95, 70, i))),
      tambah("bawah.", titikSel("fa", 95, 70, 5), titikSel("fa", 95, 70, 6)),
    ),
    k(
      SUARA_F3,
      ubah(0, ...Array.from({ length: 10 }, (_, i) => ({ id: `fa-c${i}`, x: 20 + (i % 5) * SEL })), ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ id: `fa-t${i}`, x: 20 + (i % 5) * SEL + SEL / 2 }))),
      tambah(0, ...bingkai("fb", 170, 70, 3, SEL)),
      tambah("banyak.", ...kartu("fl", 20, 124, 110, 22, W.hijauMuda, ["7: lebih banyak"], 9)),
      tambah("kosongnya", ...kartu("fs", 170, 124, 110, 22, W.merahMuda, ["3: lebih sedikit"], 9)),
    ),
    k(SUARA_F4, tambah("melihat", emo("mt", 150, 176, E.mata, 26)), tambah("tanpa", emo("ok", 200, 176, "✅", 24))),
  ],
};

/* ------------------------------ 3. Ten Frame: terapan ------------------------------ */
const SUARA_G1 = "Igil membandingkan enam mobil dan tiga bola dari raknya.";
const SUARA_G2 = "Mobil masuk ke bingkai pertama. Satu, dua, tiga, empat, lima, enam.";
const SUARA_G3 = "Bola masuk ke bingkai kedua. Satu, dua, tiga.";
const SUARA_G4 = "Bingkai mobil lebih penuh. Jadi mobil lebih banyak, dan bola lebih sedikit.";
/** Pusat sel ke-i bingkai berpojok (x, y) untuk emoji (garis dasar teks sedikit ke bawah). */
const diSel = (x: number, y: number, i: number) => ({ x: x + (i % 5) * SEL + SEL / 2, y: y + Math.floor(i / 5) * SEL + SEL / 2 + 6 });
const posMobil = urutKata(SUARA_G2, ["Satu,", "dua,", "tiga,", "empat,", "lima,", "enam."]);
const posBola = urutKata(SUARA_G3, ["Satu,", "dua,", "tiga."]);

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: mobil dan bola Igil",
  sumber: "Metode global: Ten Frame, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(0)),
      tambah("enam", ...deretMainan(E.mobil, "mb", baris(6, 22, 20, 74), 16)),
      tambah("bola", ...deretMainan(E.bola, "bl", baris(3, 196, 22, 74), 16)),
      tambah("raknya.", ...bingkai("ga", 20, 96, 0, SEL), ...bingkai("gb", 170, 96, 0, SEL)),
    ),
    k(SUARA_G2, ...posMobil.map((p, i) => ubah(p, { id: `mb${i}`, ...diSel(20, 96, i) }))),
    k(SUARA_G3, ...posBola.map((p, i) => ubah(p, { id: `bl${i}`, ...diSel(170, 96, i) }))),
    k(
      SUARA_G4,
      sorotkan("penuh.", "ga-c0", "ga-c1", "ga-c2", "ga-c3", "ga-c4", "ga-c5"),
      tambah("Jadi", ...kartu("gl", 14, 158, 130, 24, W.hijauMuda, ["6 mobil: lebih banyak"], 8.6)),
      tambah("bola", ...kartu("gs", 156, 158, 130, 24, W.merahMuda, ["3 bola: lebih sedikit"], 8.6)),
    ),
  ],
};
