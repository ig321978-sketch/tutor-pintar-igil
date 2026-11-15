import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, judul, kartu, kotak, lepasKe, panah, pusatSel, tabelSeratus, teks, tumpukBil, wadahKe, idLepas, idWadah, type Kel } from "./k2b7A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, idPilihan } from "./k2b7A-bantu";
import { kepala } from "./k2b7A-luar-1";

/* ------------------------------ 4. Puluhan dan Satuan: konsep ------------------------------ */
const BT: Kel = { id: "bt", w: 4, s: 5, x: 110, y: 62, bentuk: "batang", warna: "#BBF7D0", warnaS: "#FDE68A" };
const LEGENDA: Obj[] = [
  kotak("lg-bt", 60, 62, 9, 34, BT.warna, W.biru, { rx: 2, tebal: 1.3 }),
  teks("lg-tb", 76, 84, "batang = 10", 11, W.ungu, { anchor: "start" }),
  kotak("lg-kt", 170, 75, 9, 9, BT.warnaS, W.biru, { rx: 1.5, tebal: 1.2 }),
  teks("lg-tk", 184, 84, "kotak = 1", 11, W.ungu, { anchor: "start" }),
];
const idLegenda = LEGENDA.map((o) => o.id);
const SUARA_Y1 = "Metode kedua bernama Puluhan dan Satuan. Kita memakai batang untuk puluhan dan kotak kecil untuk satuan.";
const SUARA_Y2 = "Langkah pertama, hitung batang puluhan. Ada empat batang, jadi empat puluhan.";
const SUARA_Y3 = "Langkah kedua, hitung kotak satuan. Ada lima kotak satuan, jadi lima satuan.";
const SUARA_Y4 = "Langkah ketiga, gabungkan. Empat puluhan lima satuan dibaca empat puluh lima.";
const SUARA_Y5 = "Jadi Puluhan dan Satuan berarti memisahkan bilangan menjadi batang puluhan dan kotak satuan.";

export const ADEGAN_LUAR_PULUHAN: AdeganStory = {
  id: "luar-puluhan",
  judul: "Puluhan dan Satuan: batang dan kotak",
  sumber: "Metode luar: Puluhan dan Satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Y1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Y1, "batang"), LEGENDA[0], LEGENDA[1]), tambah(idx(SUARA_Y1, "kotak"), LEGENDA[2], LEGENDA[3])),
    k(
      SUARA_Y2,
      hapus(0, ...idLegenda),
      tambah(idx(SUARA_Y2, "empat"), ...wadahKe(BT, 1), ...wadahKe(BT, 2)),
      tambah(idx(SUARA_Y2, "batang,", 2), ...wadahKe(BT, 3)),
      tambah(idx(SUARA_Y2, "puluhan.", 2), ...wadahKe(BT, 4)),
    ),
    k(
      SUARA_Y3,
      tambah(idx(SUARA_Y3, "lima"), ...[1, 2, 3].flatMap((j) => lepasKe(BT, j))),
      tambah(idx(SUARA_Y3, "lima", 2), ...[4, 5].flatMap((j) => lepasKe(BT, j))),
    ),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Empat"), ...kartu("uk", 20, 146, 170, 30, W.emas, ["4 puluhan 5 satuan"], 11)), tambah(idx(SUARA_Y4, "dibaca"), teks("uj", 240, 172, "45", 30, W.merah))),
    k(SUARA_Y5, sorotkan(idx(SUARA_Y5, "batang"), ...idWadah(BT)), sorotkan(idx(SUARA_Y5, "kotak"), ...idLepas(BT)), tambah(idx(SUARA_Y5, "memisahkan"), emo("pz", 262, 80, "\u{1F9E9}", 26))),
  ],
};

/* ------------------------------ 5. Puluhan dan Satuan: terapan ------------------------------ */
const BU: Kel = { id: "bu", w: 7, s: 4, x: 105, y: 54, bentuk: "batang", warna: "#BBF7D0", warnaS: "#FDE68A" };
const SUARA_P1 = "Terapkan pada soal ini. Wei punya tujuh batang puluhan dan empat kotak satuan.";
const SUARA_P2 = "Berapa banyak semuanya? Ketuk jawaban yang tepat.";
const SUARA_P3 = "Betul! Tujuh puluhan dan empat satuan, yaitu tujuh puluh empat.";
const SUARA_P4 = "Awas, jangan menukar. Tujuh puluh empat berbeda dari empat puluh tujuh.";

export const ADEGAN_LUAR_PULUHAN_TERAPAN: AdeganStory = {
  id: "luar-puluhan-terapan",
  judul: "Puluhan dan Satuan: batang Wei",
  sumber: "Metode luar: Puluhan dan Satuan",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_P1, "tujuh"), ...[1, 2, 3, 4].flatMap((q) => wadahKe(BU, q))),
      tambah(idx(SUARA_P1, "batang"), ...[5, 6, 7].flatMap((q) => wadahKe(BU, q))),
      tambah(idx(SUARA_P1, "empat"), ...lepasKe(BU, 1), ...lepasKe(BU, 2)),
      tambah(idx(SUARA_P1, "satuan."), ...lepasKe(BU, 3), ...lepasKe(BU, 4)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Berapa"), teks("tanya", 150, 128, "berapa banyak?", 12, W.ungu)), tambah(idx(SUARA_P2, "jawaban"), ...pilihKata(140, ["74", "47", "11"], 16))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul!"), "c1-k")),
    k(
      SUARA_P4,
      redamkan(0, "c1-k"),
      hapus(idx(SUARA_P4, "Awas,"), "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_P4, "Tujuh"), ...tumpukBil("bl1", 14, 120, 74, W.hijauMuda, 128), teks("bl1-ok", 126, 130, "✅", 14)),
      tambah(idx(SUARA_P4, "empat", 2), ...tumpukBil("bl2", 158, 120, 47, W.merahMuda, 128), teks("bl2-x", 270, 130, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 6. Tabel Seratus: konsep ------------------------------ */
const GRID = tabelSeratus(1, 10, 28);
const baris1 = (dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `th-1-${dari + q}-k`);
/** Panah menurun (satu baris) di sisi kanan dalam sel (r, c), dari sel itu ke sel di bawahnya. */
const panahTurun = (r: number, c: number, rAwal: number, yAtas: number): Obj => {
  const p = pusatSel(r, c, rAwal, yAtas);
  return panah("th-p", p.x + 9, p.y, 0, 17, W.merah, 2);
};
/** Panah ke kanan (satu kotak) di dasar sel (r, c), dari sel itu ke sel di sebelah kanannya. */
const panahKanan = (r: number, c: number, rAwal: number, yAtas: number): Obj => {
  const p = pusatSel(r, c, rAwal, yAtas);
  return panah("th-p", p.x + 6, p.y + 6, 21, 0, W.merah, 2);
};
const SUARA_X1 = "Metode ketiga bernama Tabel Seratus. Tabel ini memuat bilangan satu sampai seratus, dalam sepuluh baris.";
const SUARA_X2 = "Setiap baris berisi sepuluh bilangan. Baris pertama dari satu sampai sepuluh.";
const SUARA_X3 = "Mulai dari tiga puluh empat. Turun satu baris, bilangannya bertambah sepuluh, jadi empat puluh empat.";
const SUARA_X4 = "Sekarang dari tiga puluh empat, geser satu kotak ke kanan. Bilangannya bertambah satu, jadi tiga puluh lima.";
const SUARA_X5 = "Jadi turun satu baris tambah sepuluh, dan geser satu kotak ke kanan tambah satu.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Tabel Seratus: pola di tabel",
  sumber: "Metode luar: Tabel Seratus",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Tabel Seratus")), tambah(idx(SUARA_X1, "memuat"), ...GRID)),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "satu"), ...baris1(1, 1)), sorotkan(idx(SUARA_X2, "sepuluh.", 2), ...baris1(2, 10))),
    k(
      SUARA_X3,
      redamkan(0, ...baris1(1, 10)),
      sorotkan(idx(SUARA_X3, "tiga"), "th-4-4-k"),
      tambah(idx(SUARA_X3, "Turun"), panahTurun(4, 4, 1, 28)),
      sorotkan(idx(SUARA_X3, "empat", 2), "th-5-4-k"),
    ),
    k(
      SUARA_X4,
      hapus(0, "th-p"),
      redamkan(0, "th-5-4-k"),
      tambah(idx(SUARA_X4, "geser"), panahKanan(4, 4, 1, 28)),
      sorotkan(idx(SUARA_X4, "tiga", 2), "th-4-5-k"),
    ),
    k(
      SUARA_X5,
      bersih(0),
      tambah(0, judul("Dua pola di tabel")),
      tambah(idx(SUARA_X5, "turun"), ...kartu("pt", 14, 50, 272, 44, W.hijauMuda, ["turun satu baris", "tambah sepuluh"], 11), emo("pe1", 40, 82, "⬇️", 20)),
      tambah(idx(SUARA_X5, "geser"), ...kartu("pk", 14, 112, 272, 44, W.langit, ["ke kanan satu kotak", "tambah satu"], 11), emo("pe2", 40, 144, "➡️", 20)),
    ),
  ],
};

/* ------------------------------ 7. Tabel Seratus: terapan ------------------------------ */
const SEBAGIAN: Obj[] = tabelSeratus(3, 5, 28).map((o) => (o.id === "th-4-7" ? { ...o, isi: "?" } : o.id === "th-4-7-k" ? { ...o, warna: W.emas } : o));
const SUARA_Z1 = "Terapkan pada soal ini. Upe mulai dari dua puluh tujuh. Ia turun satu baris.";
const SUARA_Z2 = "Bilangan di kotak tanda tanya berapa? Ketuk jawaban yang tepat.";
const SUARA_Z3 = "Betul! Turun satu baris, bilangannya bertambah sepuluh. Dua puluh tujuh menjadi tiga puluh tujuh.";
const SUARA_Z4 = "Sekarang geser satu kotak ke kanan dari tiga puluh tujuh. Bilangannya bertambah satu, jadi tiga puluh delapan.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Tabel Seratus: langkah Upe",
  sumber: "Metode luar: Tabel Seratus",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Tabel Seratus")),
      tambah(idx(SUARA_Z1, "Terapkan"), ...SEBAGIAN),
      sorotkan(idx(SUARA_Z1, "dua"), "th-3-7-k"),
      tambah(idx(SUARA_Z1, "turun"), panahTurun(3, 7, 3, 28)),
    ),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Bilangan"), teks("tanya", 150, 108, "bilangan di tanda tanya?", 12, W.ungu)), tambah(idx(SUARA_Z2, "jawaban"), ...pilihKata(120, ["27", "37", "47"], 16))),
    k(SUARA_Z3, sorotkan(idx(SUARA_Z3, "Betul!"), "c2-k"), ubah(idx(SUARA_Z3, "menjadi"), { id: "th-4-7", isi: "37" }, { id: "th-4-7-k", warna: W.hijauMuda })),
    k(
      SUARA_Z4,
      redamkan(0, "c2-k", "th-3-7-k"),
      hapus(idx(SUARA_Z4, "Sekarang"), "th-p", "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_Z4, "geser"), panahKanan(4, 7, 3, 28)),
      sorotkan(idx(SUARA_Z4, "jadi"), "th-4-8-k"),
    ),
  ],
};
