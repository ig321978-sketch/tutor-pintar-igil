import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, hurufItem, item, judul, kartu, kodeDari, kodeTeks, kotak, kurungSatuan, tanda, tata, teks } from "./k2b4B-gambar";
import { hapus, hapusKartu, idBaris, idx, isiKosong, k, munculHuruf, munculItem, pilihKata, redamkan, sorotkan, tambah, urutKata } from "./k2b4B-bantu";

/* ------------------------------ 16. Tabel pola ------------------------------ */
type BarisTabel = { b: string; label: string; seq: string[]; satuan: number };
export const TABEL: BarisTabel[] = [
  { b: "t1", label: "Warna", seq: ["merah", "biru", "merah", "biru", "merah", "biru"], satuan: 2 },
  { b: "t2", label: "Bentuk", seq: ["hati", "hati", "segitiga", "hati", "hati", "segitiga"], satuan: 3 },
  { b: "t3", label: "Suara", seq: ["keras", "pelan", "keras", "pelan"], satuan: 2 },
  { b: "t4", label: "Gerakan", seq: ["membungkuk", "berdiri", "membungkuk", "berdiri"], satuan: 2 },
];
const T_TAB = tata(6, 12, 4, -30);
const CY_TAB = [60, 92, 124, 156];
const KOL = { sat: 198, kd: 236, ul: 272 };
const kepalaTabel = (): Obj[] => [
  teks("th0", 36, 34, "Jenis", 9, W.ungu),
  teks("th1", KOL.sat, 34, "Satuan", 9, W.ungu),
  teks("th2", KOL.kd, 34, "Kode", 9, W.ungu),
  teks("th3", KOL.ul, 34, "Ulang", 9, W.ungu),
  ...CY_TAB.map((cy, r) => kotak(`tr${r}`, 8, cy - 15, 284, 30, r % 2 === 0 ? W.krem : W.hijauMuda, W.biru, { rx: 4, tebal: 1.2, z: 0 })),
];
const labelTabel = (): Obj[] => TABEL.map((r, i) => teks(`${r.b}-lb`, 36, CY_TAB[i] + 3.5, r.label, 9, W.biru, { z: 3 }));
const sel = (i: number, apa: "sat" | "kd" | "ul"): Obj => {
  const r = TABEL[i];
  const isi = apa === "sat" ? String(r.satuan) : apa === "kd" ? kodeDari(r.seq.slice(0, r.satuan)).join("") : String(r.seq.length / r.satuan);
  return teks(`${r.b}-${apa}`, KOL[apa], CY_TAB[i] + 4, isi, 11, W.merah, { z: 3 });
};

const SUARA_Q1 = "Mari kita rangkum dalam tabel. Setiap baris menunjukkan satu jenis pola.";
const SUARA_Q2 = "Pola warna: merah, biru, merah, biru, merah, biru. Satuannya dua benda, kodenya A, B, dan ada tiga satuan.";
const SUARA_Q3 = "Pola bentuk: hati, hati, segitiga, hati, hati, segitiga. Satuannya tiga benda, kodenya A, A, B, dan ada dua satuan.";
const SUARA_Q4 = "Pola suara: keras, pelan, keras, pelan. Satuannya dua bunyi, kodenya A, B, dan ada dua satuan.";
const SUARA_Q5 = "Pola gerakan: membungkuk, berdiri, membungkuk, berdiri. Satuannya dua gerakan, kodenya A, B, dan ada dua satuan.";
const SUARA_TAB = [SUARA_Q2, SUARA_Q3, SUARA_Q4, SUARA_Q5];
const KATA_SAT = ["dua", "tiga", "dua", "dua"];
const KATA_UL = ["tiga", "dua", "dua", "dua"];
const SETELAH = ["warna:", "bentuk:", "suara:", "gerakan:"];

export const ADEGAN_POLA_TABEL: AdeganStory = {
  id: "pola-tabel",
  judul: "Tabel pola: satuan dan kode",
  sumber: "Materi: tabel pola",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Tabel pola")), tambah(idx(SUARA_Q1, "tabel"), ...kepalaTabel()), tambah(idx(SUARA_Q1, "baris"), ...labelTabel())),
    ...TABEL.map((r, i) =>
      k(
        SUARA_TAB[i],
        ...munculItem(SUARA_TAB[i], r.b, r.seq, T_TAB, CY_TAB[i], { setelah: SETELAH[i] }),
        tambah(idx(SUARA_TAB[i], KATA_SAT[i]), sel(i, "sat")),
        tambah(idx(SUARA_TAB[i], "kodenya"), sel(i, "kd")),
        tambah(idx(SUARA_TAB[i], KATA_UL[i], KATA_UL[i] === KATA_SAT[i] ? 2 : 1), sel(i, "ul")),
      ),
    ),
  ],
};

/* ------------------------------ 17. Latihan satu: melanjutkan warna ------------------------------ */
const T6 = tata(6, 24, 10);
export const LATIHAN_SATU = ["biru", "kuning", "biru", "kuning", "biru", "kuning"];
const SUARA_X1 = "Latihan satu. Barisan warna: biru, kuning, biru, kuning, biru, lalu ada kotak kosong.";
const SUARA_X2 = "Satuan polanya biru dan kuning. Warna apa untuk kotak kosong? Ketuk jawabanmu.";
const SUARA_X3 = "Betul, kuning! Satuan polanya biru dan kuning, jadi yang berikutnya kuning.";
const SUARA_X4 = "Kode barisan ini A, B, A, B, A, B. Hanya ada dua jenis benda, jadi satuannya terdiri dari dua benda.";
const POS_X4 = urutKata(SUARA_X4, ["A", "B", "A", "B", "A", "B"], "ini");

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan: melanjutkan pola warna",
  sumber: "Materi: Latihan melanjutkan pola warna",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Latihan satu")), ...munculItem(SUARA_X1, "ba", LATIHAN_SATU.slice(0, 5), T6, 66, { setelah: "warna:" }), tambah(idx(SUARA_X1, "kotak"), item("ba", 5, "kosong", T6, 66))),
    k(SUARA_X2, tambah(idx(SUARA_X2, "Satuan"), kurungSatuan("ba", 0, 2, T6, 66)), tambah(idx(SUARA_X2, "Ketuk"), ...pilihKata(126, ["biru", "hijau", "kuning"], 11))),
    k(SUARA_X3, sorotkan(idx(SUARA_X3, "Betul"), "c3-k"), isiKosong(idx(SUARA_X3, "kuning", 3), "ba", 5, "kuning", T6, 66)),
    k(SUARA_X4, hapusKartu(0, 3), redamkan(0, "ba_5_kuning"), ...munculHuruf(SUARA_X4, "ba", LATIHAN_SATU, T6, 66, { setelah: "ini" }), tambah(POS_X4[5], kodeTeks("ba", kodeDari(LATIHAN_SATU), 112))),
  ],
};

/* ------------------------------ 18. Latihan dua: mencari satuan pola ------------------------------ */
export const LATIHAN_DUA = ["persegi", "persegi", "lingkaran", "persegi", "persegi", "lingkaran", "persegi", "persegi", "lingkaran"];
const T9 = tata(9, 20, 7);
const SUARA_Y1 = "Latihan dua. Perhatikan barisan: persegi, persegi, lingkaran, persegi, persegi, lingkaran, persegi, persegi, lingkaran.";
const SUARA_Y2 = "Mana satuan pola barisan ini? Pilih bagian terkecil yang berulang dari awal. Ketuk jawabanmu.";
const SUARA_Y3 = "Betul, A, A, B! Satuannya persegi, persegi, dan lingkaran.";
const SUARA_Y4 = "Ada tiga satuan yang sama, jadi barisan ini adalah pola.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan: mencari satuan pola",
  sumber: "Materi: Latihan mencari satuan pola",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Latihan dua")), ...munculItem(SUARA_Y1, "ba", LATIHAN_DUA, T9, 56, { setelah: "barisan:" })),
    k(
      SUARA_Y2,
      tambah(idx(SUARA_Y2, "Mana"), ...kodeDari(LATIHAN_DUA).map((h, i) => hurufItem("ba", i, h, T9, 56)), kodeTeks("ba", kodeDari(LATIHAN_DUA), 98)),
      tambah(idx(SUARA_Y2, "Ketuk"), ...pilihKata(128, ["A B", "A A B", "A A B A"], 11)),
    ),
    k(SUARA_Y3, sorotkan(idx(SUARA_Y3, "Betul"), "c2-k"), tambah(idx(SUARA_Y3, "Satuannya"), kurungSatuan("ba", 0, 3, T9, 56))),
    k(SUARA_Y4, hapusKartu(0, 3), tambah(idx(SUARA_Y4, "Ada"), kurungSatuan("ba", 1, 3, T9, 56)), tambah(idx(SUARA_Y4, "sama"), kurungSatuan("ba", 2, 3, T9, 56)), tambah(idx(SUARA_Y4, "pola"), tanda("ba", true, 56, 284))),
  ],
};

/* ------------------------------ 19. Latihan tiga: pola atau bukan ------------------------------ */
export const LATIHAN_TIGA = ["bintang", "bintang", "bunga", "bintang", "bunga", "bunga"];
export const LATIHAN_TIGA_BARU = ["bintang", "bintang", "bunga", "bintang", "bintang", "bunga"];
const SUARA_Z1 = "Latihan tiga. Lihat barisan ini: bintang, bintang, bunga, bintang, bunga, bunga.";
const SUARA_Z2 = "Apakah barisan ini pola atau bukan pola? Ketuk jawabanmu.";
const SUARA_Z3 = "Betul, bukan pola! Tidak ada bagian terkecil yang berulang dengan teratur.";
const SUARA_Z4 = "Kalau barisannya bintang, bintang, bunga, bintang, bintang, bunga, itu baru pola.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan: pola atau bukan pola",
  sumber: "Materi: Latihan pola atau bukan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Latihan tiga")), ...munculItem(SUARA_Z1, "ba", LATIHAN_TIGA, T6, 66, { setelah: "ini:" })),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Ketuk"), ...pilihKata(126, ["pola", "bukan pola"], 11))),
    k(SUARA_Z3, sorotkan(idx(SUARA_Z3, "Betul"), "c2-k"), tambah(idx(SUARA_Z3, "Tidak"), tanda("ba", false, 66))),
    k(
      SUARA_Z4,
      hapusKartu(0, 2),
      hapus(0, ...idBaris("ba", LATIHAN_TIGA), "ba-tanda"),
      ...munculItem(SUARA_Z4, "ba", LATIHAN_TIGA_BARU, T6, 66, { setelah: "barisannya" }),
      tambah(idx(SUARA_Z4, "itu"), kurungSatuan("ba", 0, 3, T6, 66)),
      tambah(idx(SUARA_Z4, "pola"), tanda("ba", true, 66)),
    ),
  ],
};

/* ------------------------------ 20. Latihan empat: mengisi bagian yang hilang ------------------------------ */
export const LATIHAN_EMPAT = ["segitiga", "bintang", "segitiga", "bintang", "segitiga", "bintang"];
const SUARA_V1 = "Latihan empat. Ada satu bagian yang hilang: segitiga, bintang, segitiga, bintang, lalu kotak kosong, lalu bintang.";
const SUARA_V2 = "Satuan polanya terdiri dari dua benda. Gambar apa yang hilang? Ketuk jawabanmu.";
const SUARA_V3 = "Betul, segitiga! Satuan polanya segitiga dan bintang.";
const SUARA_V4 = "Barisan sudah lengkap: segitiga, bintang, segitiga, bintang, segitiga, bintang. Kodenya A, B, A, B, A, B.";
const POS_V1 = urutKata(SUARA_V1, LATIHAN_EMPAT.slice(0, 4), "hilang:");
const POS_V4 = urutKata(SUARA_V4, ["A", "B", "A", "B", "A", "B"], "Kodenya");

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan: mengisi bagian yang hilang",
  sumber: "Materi: Latihan mengisi bagian hilang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Latihan empat")),
      ...LATIHAN_EMPAT.slice(0, 4).map((s, i) => tambah(POS_V1[i], item("ba", i, s, T6, 66))),
      tambah(idx(SUARA_V1, "kotak"), item("ba", 4, "kosong", T6, 66)),
      tambah(idx(SUARA_V1, "bintang", 3), item("ba", 5, "bintang", T6, 66)),
    ),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Satuan"), kurungSatuan("ba", 0, 2, T6, 66)), tambah(idx(SUARA_V2, "Ketuk"), ...pilihKata(126, ["bintang", "hati", "segitiga"], 11))),
    k(SUARA_V3, sorotkan(idx(SUARA_V3, "Betul"), "c3-k"), isiKosong(idx(SUARA_V3, "segitiga", 1), "ba", 4, "segitiga", T6, 66)),
    k(SUARA_V4, hapusKartu(0, 3), redamkan(0, "ba_4_segitiga"), ...munculHuruf(SUARA_V4, "ba", LATIHAN_EMPAT, T6, 66, { setelah: "Kodenya" }), tambah(POS_V4[5], kodeTeks("ba", kodeDari(LATIHAN_EMPAT), 112))),
  ],
};

/* ------------------------------ 21. Penutup ------------------------------ */
const SUARA_E1 = "Mari kita ingat lagi. Pola adalah hal yang berulang dan teratur.";
const SUARA_E2 = "Satuan pola adalah bagian terkecil yang berulang. Dari satuan itu, kita bisa melanjutkan dan mengisi pola.";
const SUARA_E3 = "Kamu juga bisa merancang pola sendiri. Terima kasih, sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan pola",
  sumber: "Materi: ringkasan pola",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Ringkasan pola")), tambah(idx(SUARA_E1, "Pola"), ...kartu("e1", 14, 36, 272, 40, W.krem, ["Pola", "berulang dan teratur"], 10))),
    k(SUARA_E2, tambah(idx(SUARA_E2, "terkecil"), ...kartu("e2", 14, 84, 272, 40, W.langit, ["Satuan pola", "bagian terkecil yang berulang"], 10)), tambah(idx(SUARA_E2, "melanjutkan"), ...kartu("e3", 14, 132, 272, 30, W.hijauMuda, ["lanjutkan dan isi pola"], 10))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "merancang"), ...kartu("e4", 40, 168, 220, 24, W.pink, ["rancang pola sendiri"], 10)), tambah(idx(SUARA_E3, "Terima"), emo("ow", 270, 188, OWL, 22))),
  ],
};
