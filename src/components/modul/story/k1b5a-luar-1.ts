import type { AdeganStory, Obj } from "./logika-story";
import { W, benda, deret, emo, judul, kartu, kartuAngka, tangan, teks, type Titik } from "./k1b5a-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah } from "./k1b5a-bantu";

export const NAMA_METODE_ID = ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Tiga kartu pilihan bilangan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihanBil = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 18));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara menghitung yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Hitung sampai dua puluh, Sepuluh dan Satuan, dan Dua Bingkai Sepuluh.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana menghitung benda yang lebih dari sepuluh dengan rapi dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan benda sehari-hari, seperti kelereng, bola, balon, dan sedotan.";
const SUARA_O5 = "Semua contoh memakai bilangan sebelas sampai dua puluh. Kamu cukup mengetuk dan melihat layar dengan teliti.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk berhitung",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Hitung", "Sepuluh", "Bingkai"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F446}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana menghitung benda", "yang lebih dari 10", "dengan rapi dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda sehari-hari")),
      tambah("kelereng,", ...benda("kelereng", "ob0", 50, 90, 14, 1)),
      tambah("bola,", ...benda("bola", "ob1", 110, 90, 14)),
      tambah("balon,", ...benda("balon", "ob2", 175, 86, 14, 0)),
      tambah("sedotan.", ...benda("sedotan", "ob3", 245, 90, 14, 2)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan sebelas sampai dua puluh")),
      ...[11, 12, 13, 14, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 14 + i * 56, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink, W.lavender][i], 46, 36, 18))),
      tambah("dua", ...kartuAngka("ob5", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("mengetuk", tangan(150, 168)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai dua puluh: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Hitung sampai dua puluh. Kita menghitung benda satu per satu, lalu terus melewati sepuluh.";
const SUARA_A2 = "Mulai dari satu. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_A3 = "Setelah sepuluh, jangan berhenti. Ada dua kelereng lagi. Lanjut menghitung, sebelas, dua belas.";
const SUARA_A4 = "Bilangan terakhir yang disebut adalah dua belas. Jadi banyak kelereng seluruhnya dua belas.";
const SUARA_A5 = "Jadi dengan metode ini, kita terus menyebut bilangan berikutnya, melewati sepuluh. Ucapkan lagi mengikuti suara guru.";
const P12: Titik[] = Array.from({ length: 12 }, (_, i) => (i < 6 ? { x: 40 + i * 44, y: 76 } : { x: 40 + (i - 6) * 44, y: 134 }));
const IDLH = Array.from({ length: 12 }, (_, i) => `lh${i}`);

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Hitung sampai dua puluh: terus melewati sepuluh",
  sumber: "Metode luar: Hitung sampai 20",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("benda", ...deret("kelereng", "lh", P12.slice(0, 10), 8)), tambah("melewati", teks("lt", 150, 196, "terus melewati 10", 9.2, W.ungu))),
    k(SUARA_A2, ...hitungAksi(SUARA_A2, "lh", P12.slice(0, 10), { setelah: "satu." })),
    k(
      SUARA_A3,
      redamkan(0, ...IDLH.slice(0, 10)),
      tambah("kelereng", ...[10, 11].flatMap((i) => benda("kelereng", `lh${i}`, P12[i].x, P12[i].y, 8, i))),
      ...hitungAksi(SUARA_A3, "lh", P12, { setelah: "menghitung,", dari: 11, awal: 10, tanganAda: true }),
    ),
    k(SUARA_A4, sorotkan("terakhir", "lh11", "lhn11"), tambah("Jadi", ...kartu("lk", 60, 168, 180, 24, W.emas, ["12 kelereng"], 11))),
    k(SUARA_A5, hapus(0, "tg"), tambah("Ucapkan", emo("ucap", 262, 168, "\u{1F5E3}", 26))),
  ],
};

/* ------------------------------ 3. Hitung sampai dua puluh: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada empat belas bola. Bola ada di lapangan, dan kita menghitung semuanya.";
const SUARA_B2 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas.";
const SUARA_B3 = "Bilangan terakhir adalah empat belas. Jadi ada empat belas bola. Kita tidak berhenti di sepuluh.";
const SUARA_B4 = "Coba pilih jawabannya. Ada tiga belas, empat belas, atau lima belas? Ketuk bilangan yang tepat.";
const P14: Titik[] = Array.from({ length: 14 }, (_, i) => ({ x: 34 + (i % 7) * 38.7, y: 84 + Math.floor(i / 7) * 56 }));

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung sampai dua puluh: empat belas bola",
  sumber: "Metode luar: Hitung sampai 20, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("bola", ...deret("bola", "lb", P14, 9)), tambah("empat", teks("bn", 150, 186, "banyak bola: 14", 10, W.ungu))),
    k(SUARA_B2, ...hitungAksi(SUARA_B2, "lb", P14, { turun: 0, naik: 14 })),
    k(SUARA_B3, hapus(0, "bn"), sorotkan("terakhir", "lb13", "lbn13"), tambah("Jadi", ...kartu("lj", 60, 172, 180, 24, W.emas, ["14 bola"], 11))),
    k(SUARA_B4, hapus(0, "lj-k", "lj-t0"), tambah("Coba", ...pilihanBil(146, ["13", "14", "15"])), tambah("Ketuk", tangan(150, 198)), sorotkan("empat", "c2-k")),
  ],
};
