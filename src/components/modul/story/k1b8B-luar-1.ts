import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, kartuAngka, pilihan, turus, type Kat } from "./k1b8B-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotHitung, sorotkan, tambah } from "./k1b8B-bantu";

export const NAMA_METODE_ID = ["Turus", "Diagram Gambar", "Banding Kategori"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Data bola warna untuk tiga metode luar: merah tujuh, biru lima, hijau tiga (jumlah lima belas). */
export const WARNA: Kat[] = [
  { nama: "merah", n: 7, emo: "\u{1F534}" },
  { nama: "biru", n: 5, emo: "\u{1F535}" },
  { nama: "hijau", n: 3, emo: "\u{1F7E2}" },
];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Buang judul diagram (judul adegan luar diganti kepala metode). */
export const tanpaJudul = (objs: Obj[]): Obj[] => objs.filter((o) => !/jd$/.test(o.id));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk mengolah data. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Turus, Diagram Gambar, dan Banding Kategori.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana kita menyajikan data supaya mudah dibaca?";
const SUARA_O4 = "Kita memakai bola warna di layar. Ada bola merah, bola biru, dan bola hijau.";
const SUARA_O5 = "Semua jumlahnya tidak lebih dari dua puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengolah data",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Turus,", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah("Diagram", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah("Banding", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F4CA}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana menyajikan data", "supaya mudah dibaca?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Bola warna di layar")),
      tambah("merah,", emo("bm", 60, 100, WARNA[0].emo, 40)),
      tambah("biru,", emo("bb", 150, 100, WARNA[1].emo, 40)),
      tambah("hijau.", emo("bh", 240, 100, WARNA[2].emo, 40)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai dua puluh")),
      ...[7, 5, 3, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 20 + i * 66, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink][i], 54, 36, 18))),
      tambah("dua", ...kartuAngka("ob4", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Turus: konsep ------------------------------ */
const URUT_BOLA = [0, 1, 0, 2, 0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0];
const strip = (): Obj[] => URUT_BOLA.map((c, i) => emo(`bz${i}`, 24 + (i % 8) * 36, i < 8 ? 100 : 136, WARNA[c].emo, 22));
const TW = turus("tw", WARNA, "Bola warna", { y0: 70, gap: 38 });
const SUARA_A1 = "Metode pertama bernama Turus. Ada lima belas bola warna di layar.";
const SUARA_A2 = "Setiap bola kita beri satu goresan tegak. Kita mulai dari bola merah.";
const SUARA_A3 = "Merah ada tujuh. Satu, dua, tiga, empat, lima, enam, tujuh. Goresan kelima miring.";
const SUARA_A4 = "Biru ada lima. Satu, dua, tiga, empat, lima.";
const SUARA_A5 = "Hijau ada tiga. Satu, dua, tiga.";
const SUARA_A6 = "Lima goresan menjadi satu ikat. Jumlah semuanya lima belas.";

export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Turus: satu goresan satu data",
  sumber: "Metode luar: Turus",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("lima", ...strip()), tambah("belas", ...kartu("lb", 100, 166, 100, 22, W.krem, ["15 bola"], 10))),
    k(SUARA_A2, hapus(0, ...URUT_BOLA.map((_, i) => `bz${i}`), "lb-k", "lb-t0"), tambah("goresan", TW.label(0), TW.label(1), TW.label(2))),
    k(SUARA_A3, ...hitungAksi(SUARA_A3, TW.goresan(0), { setelah: "tujuh." }), tambah(idx(SUARA_A3, "tujuh", 2), TW.angka(0)), sorotkan("kelima", "tws0_4")),
    k(SUARA_A4, redamkan(0, "tws0_4"), ...hitungAksi(SUARA_A4, TW.goresan(1), { setelah: "lima." }), tambah(idx(SUARA_A4, "lima", 2), TW.angka(1))),
    k(SUARA_A5, ...hitungAksi(SUARA_A5, TW.goresan(2), { setelah: "tiga." }), tambah(idx(SUARA_A5, "tiga", 2), TW.angka(2))),
    k(SUARA_A6, sorotkan("ikat.", "tws0_4", "tws1_4"), tambah("Jumlah", ...kartu("lt", 60, 172, 180, 22, W.emas, ["7 + 5 + 3 = 15"], 11))),
  ],
};

/* ------------------------------ 3. Turus: terapan ------------------------------ */
const KUNING: Kat[] = [{ nama: "kuning", n: 8, emo: "\u{1F7E1}" }];
const TX = turus("tx", KUNING, "Bola kuning", { y0: 80, gap: 38 });
const SUARA_B1 = "Terapkan pada bola kuning. Ini turus untuk bola kuning. Ada beberapa goresan.";
const SUARA_B2 = "Satu ikat bernilai lima. Lalu enam, tujuh, delapan.";
const SUARA_B3 = "Berapa semuanya? Ketuk jawabannya. Tujuh, delapan, atau sembilan?";
const SUARA_B4 = "Betul! Kuning ada delapan. Satu ikat dan tiga goresan.";

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Turus: bola kuning",
  sumber: "Metode luar: Turus, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("turus", TX.label(0)), tambah("goresan.", ...TX.goresan(0))),
    k(SUARA_B2, sorotkan("ikat", "txs0_4"), ...sorotHitung(SUARA_B2, ["txs0_5", "txs0_6", "txs0_7"], { dari: 6 })),
    k(SUARA_B3, redamkan(0, "txs0_4", "txs0_5", "txs0_6", "txs0_7"), tambah("Berapa", ...pilihan(150, ["7", "8", "9"]))),
    k(SUARA_B4, sorotkan("Betul!", "c2-k"), tambah("delapan.", TX.angka(0))),
  ],
};
