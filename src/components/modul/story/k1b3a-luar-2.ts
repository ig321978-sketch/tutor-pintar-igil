import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, kartu, kepingBingkai, kotak, pusatSel, selBingkai, silang, teks } from "./k1b3a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b3a-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b3a-luar-1";

const BX = 25;
const BY = 54;
const SEL = 50;
const pusat = (i: number) => pusatSel(BX, BY, i, SEL);

/* ------------------------------ 1. Kurang di Bingkai: konsep (tujuh keping, tiga dikosongkan) ------------------------------ */
const SUARA_A1 = "Metode ketiga bernama Kurang di Bingkai. Kita kosongkan petak pada bingkai sepuluh.";
const SUARA_A2 = "Contohnya ada tujuh keping merah di bingkai. Keping mengisi petak dari kiri ke kanan.";
const SUARA_A3 = "Kita kosongkan tiga petak. Ketuk tiga keping terakhir, lalu coret keping itu.";
const SUARA_A4 = "Petak yang kosong sekarang ada tiga. Tiga keping sudah pergi. Sisanya tinggal empat keping.";
const SUARA_A5 = "Tujuh dikurangi tiga sama dengan empat. Bingkai sepuluh membantu kita melihat sisa dengan sekali pandang.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Kurang di Bingkai: kosongkan petak",
  sumber: "Metode luar: Kurang di Bingkai",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_A1, tambah("ketiga", ...kepala(2)), tambah("bingkai@2", ...selBingkai("bk", BX, BY, SEL)), tambah("sepuluh.", teks("b10", 150, 176, "10 petak", 11, W.ungu))),
    k(SUARA_A2, hapus(0, "b10"), tambah("tujuh", ...kepingBingkai("kb", BX, BY, 0, 7, W.merah, SEL))),
    k(
      SUARA_A3,
      tambah(idx(SUARA_A3, "Ketuk"), emo("tg", pusat(6).x, pusat(6).y + 30, "\u{1F446}", 22)),
      tambah(idx(SUARA_A3, "coret"), ...silang("cr6", pusat(6).x, pusat(6).y, 14)),
      ubah(idx(SUARA_A3, "keping", 2), { id: "tg", x: pusat(5).x }),
      tambah(idx(SUARA_A3, "keping", 2), ...silang("cr5", pusat(5).x, pusat(5).y, 14)),
      ubah(idx(SUARA_A3, "itu"), { id: "tg", x: pusat(4).x, y: pusat(4).y + 30 }),
      tambah(idx(SUARA_A3, "itu"), ...silang("cr4", pusat(4).x, pusat(4).y, 14)),
    ),
    k(
      SUARA_A4,
      hapus(2, "tg", "kb4", "kb5", "kb6", "cr4a", "cr4b", "cr5a", "cr5b", "cr6a", "cr6b"),
      sorotkan(12, "kb0", "kb1", "kb2", "kb3"),
    ),
    k(SUARA_A5, tambah("Tujuh", ...kartu("bj", 80, 164, 140, 28, W.emas, ["7 − 3 = 4"], 13))),
  ],
};

/* ------------------------------ 2. Kurang di Bingkai: terapan (sepuluh kelereng, empat dikosongkan) ------------------------------ */
const SUARA_B1 = "Terapkan pada kelereng Upe. Bingkai sepuluh ini penuh dengan sepuluh kelereng.";
const SUARA_B2 = "Upe memberi empat kelereng kepada Wei. Ketuk empat kelereng terakhir, lalu coret kelereng itu.";
const SUARA_B3 = "Empat petak sekarang kosong. Kelereng yang pergi sudah tidak ada. Sisanya enam kelereng.";
const SUARA_B4 = "Sepuluh dikurangi empat sama dengan enam. Bingkai yang penuh selalu berarti sepuluh. Dari situ kita mudah menemukan sisanya.";
const PINK = "#F472B6";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Kurang di Bingkai: kelereng Upe",
  sumber: "Metode luar: Kurang di Bingkai, terapan",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_B1, tambah("pada", ...kepala(2)), tambah("penuh", ...selBingkai("rk", BX, BY, SEL), ...kepingBingkai("rg", BX, BY, 0, 10, PINK, SEL)), tambah(idx(SUARA_B1, "sepuluh", 2), teks("r10", 150, 176, "10 kelereng", 11, W.ungu))),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "Ketuk"), emo("tg", pusat(9).x, pusat(9).y + 30, "\u{1F446}", 22)),
      tambah(10, ...silang("cs9", pusat(9).x, pusat(9).y, 14)),
      ubah(11, { id: "tg", x: pusat(8).x }),
      tambah(11, ...silang("cs8", pusat(8).x, pusat(8).y, 14)),
      ubah(12, { id: "tg", x: pusat(7).x }),
      tambah(12, ...silang("cs7", pusat(7).x, pusat(7).y, 14)),
      ubah(13, { id: "tg", x: pusat(6).x }),
      tambah(13, ...silang("cs6", pusat(6).x, pusat(6).y, 14)),
    ),
    k(
      SUARA_B3,
      hapus(3, "tg", "r10", "rg6", "rg7", "rg8", "rg9", "cs6a", "cs6b", "cs7a", "cs7b", "cs8a", "cs8b", "cs9a", "cs9b"),
      sorotkan(11, "rg0", "rg1", "rg2", "rg3", "rg4", "rg5"),
    ),
    k(SUARA_B4, tambah("Sepuluh", ...kartu("rj", 80, 164, 140, 28, W.emas, ["10 − 4 = 6"], 13)), tambah("penuh", emo("ro", 262, 196, OWL, 26))),
  ],
};

/* ------------------------------ 3. Ringkasan tiga metode ------------------------------ */
const SUARA_Z1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_Z2 = "Mengambil: keluarkan sebagian benda dari kumpulan. Hitung Mundur: mulai dari bilangan awal, lalu mundur.";
const SUARA_Z3 = "Kurang di Bingkai: kosongkan petak pada bingkai sepuluh sampai tinggal sisanya.";
const SUARA_Z4 = "Tiga cara ini membantu kita mencari sisa sampai sepuluh dengan cepat dan benar. Terima kasih sudah belajar.";
const DESKRIPSI = ["keluarkan sebagian dari kumpulan", "mulai dari awal, lalu mundur", "kosongkan petak di bingkai 10"];
const kartuMetode = (i: number) => [
  kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }),
  teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${i + 1}. ${NAMA_METODE_ID[i]}`, 9.6, W.biru),
];
const deskripsi = (i: number) => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, teks("rj", 150, 20, "Tiga metode dari luar", 11, W.ungu)), tambah("ringkas", ...[0, 1, 2].flatMap(kartuMetode))),
    k(SUARA_Z2, tambah(0, deskripsi(0)), tambah("Hitung", deskripsi(1))),
    k(SUARA_Z3, tambah(0, deskripsi(2)), sorotkan("bingkai", "rm2-k")),
    k(SUARA_Z4, bersih(0), tambah(0, teks("rj", 150, 20, "Terima kasih!", 12, W.ungu), emo("rs", 150, 110, OWL, 56)), tambah("sampai", teks("r10", 150, 170, "sisa sampai 10", 12, W.merah))),
  ],
};
