import type { AdeganStory, Obj } from "./logika-story";
import { W, balonW, emo, judul, kartu, kelompok, kotak, silang, teks, telur } from "./k1b3b-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b3b-bantu";

/** Nama tiga metode luar dalam bahasa Indonesia (satu-satunya nama yang dipakai di video). */
export const NAMA_METODE_ID = ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE_ID[i]}`], 9.4);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk mengurangkan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Mengambil, Hitung Mundur, dan Kurang di Bingkai.";
const SUARA_O3 = "Ketiganya menjawab satu pertanyaan yang sama: berapa yang tersisa setelah ada yang pergi?";
const SUARA_O4 = "Kita memakai benda yang akrab, seperti apel, telur, dan balon.";
const SUARA_O5 = "Semua metode kita coba di layar. Kita ketuk, kita seret, dan kita coret benda yang pergi.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengurangkan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode dari luar")),
      tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)),
      tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil,", "Mundur,", "Bingkai."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F34E}", 36), emo("i2", 150, 90, "\u{1F440}", 36), emo("i3", 240, 90, "\u{2753}", 36)),
      tambah("berapa", ...kartu("iq", 20, 120, 260, 44, W.emas, ["berapa yang tersisa", "setelah ada yang pergi?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda yang akrab")),
      tambah("apel,", ...kelompok("apel", "tb", 1, 100, 60, 1, 16)),
      tambah("telur,", telur("tc", 150, 100, false, 34)),
      tambah("balon.", ...balonW("td", 240, 100, "#F87171", 18)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Di layar kita")),
      tambah("ketuk,", ...kartu("ya", 20, 50, 80, 40, W.langit, ["ketuk"], 12), emo("yb", 60, 124, "\u{1F446}", 30)),
      tambah("seret,", ...kartu("yc", 110, 50, 80, 40, W.hijauMuda, ["seret"], 12), emo("yd", 150, 124, "\u{2194}", 30)),
      tambah("coret", ...kartu("ye", 200, 50, 80, 40, W.pink, ["coret"], 12), ...silang("yf", 240, 124, 14)),
    ),
  ],
};

/* ------------------------------ 2. Mengambil: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Mengambil. Kita mulai dari kumpulan benda, lalu mengambil sebagian keluar dari kumpulan.";
const SUARA_A2 = "Misalnya ada tujuh apel di kumpulan. Kita ambil tiga apel keluar. Seret tiga apel itu ke luar.";
const SUARA_A3 = "Sekarang hitung apel yang tinggal di kumpulan. Satu, dua, tiga, empat.";
const SUARA_A4 = "Tinggal empat apel. Tujuh dikurangi tiga sama dengan empat. Itulah cara Mengambil.";
const AX = (i: number): number => 30 + i * 40;
const PTS_AP = Array.from({ length: 4 }, (_, i) => ({ x: AX(i), y: 84 }));

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Mengambil: ambil sebagian dari kumpulan",
  sumber: "Metode luar: Mengambil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, ...kepala(0)),
      tambah("kumpulan", kotak("kp", 14, 58, 272, 52, W.putih, W.hijau, { rx: 8, tebal: 1.8 }), teks("lk", 150, 126, "kumpulan", 10, W.ungu)),
      tambah("sebagian", emo("ar", 150, 168, "\u{27A1}", 30)),
    ),
    k(
      SUARA_A2,
      hapus(0, "ar"),
      tambah("tujuh", ...kelompok("apel", "ak", 7, 84, 30, 40, 11)),
      ubah(idx(SUARA_A2, "tiga", 2), ...[4, 5, 6].map((i) => ({ id: `ak${i}`, y: 140 + 11 * 0.77 }))),
      tambah("Seret", teks("lo", 150, 166, "yang keluar: 3 apel", 10, W.merah)),
    ),
    k(SUARA_A3, ...hitungAksi(SUARA_A3, "ak", PTS_AP, "kumpulan.")),
    k(SUARA_A4, hapus(0, "tg", "akn0", "akn1", "akn2", "akn3"), sorotkan("Tinggal", "ak0", "ak1", "ak2", "ak3"), tambah("Tujuh", teks("as", 150, 196, "7 − 3 = 4", 22, W.hijau))),
  ],
};

/* ------------------------------ 3. Mengambil: terapan ------------------------------ */
const SUARA_B1 = "Kira punya delapan telur. Tiga telur pecah.";
const SUARA_B2 = "Ketuk telur yang pecah. Telur itu kita ambil dari kumpulan.";
const SUARA_B3 = "Sekarang hitung telur yang tersisa. Satu, dua, tiga, empat, lima.";
const SUARA_B4 = "Delapan dikurangi tiga sama dengan lima. Telur yang tersisa ada lima.";
const P8 = [...Array.from({ length: 5 }, (_, i) => ({ x: 50 + i * 50, y: 78 })), ...Array.from({ length: 3 }, (_, i) => ({ x: 50 + i * 50, y: 128 }))];

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Mengambil: delapan telur, tiga pecah",
  sumber: "Metode luar: Mengambil, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("delapan", ...P8.map((p, i) => telur(`tr${i}`, p.x, p.y))),
      ubah("pecah.", ...[5, 6, 7].map((i) => ({ id: `tr${i}`, isi: "\u{1F373}" }))),
    ),
    k(SUARA_B2, ...[5, 6, 7].map((i) => tambah("pecah.", ...silang(`tx${i}`, P8[i].x, P8[i].y, 10))), ubah("ambil", ...[5, 6, 7].map((i) => ({ id: `tr${i}`, op: 0.3 })))),
    k(SUARA_B3, ...hitungAksi(SUARA_B3, "tr", P8.slice(0, 5), "tersisa.")),
    k(SUARA_B4, hapus(0, "tg", "trn0", "trn1", "trn2", "trn3", "trn4"), sorotkan("tersisa", "tr0", "tr1", "tr2", "tr3", "tr4"), tambah("Delapan", teks("bs", 150, 192, "8 − 3 = 5", 22, W.hijau))),
  ],
};
