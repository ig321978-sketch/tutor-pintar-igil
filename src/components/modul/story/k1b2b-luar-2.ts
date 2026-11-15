import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, bulat, emo, garis, isiBingkai, judul, kartu, kelompok, kotak, teks } from "./k1b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b2b-luar-1";

/** Bagan bagian dan utuh: lingkaran utuh `wh` di atas, lingkaran bagian `pa` dan `pb` di bawah, dua garis penghubung. Isi: teks `wh-t`, `pa-t`, `pb-t`. */
const bagan = (): Obj[] => [
  garis("bg1", 150, 102, -50, 20, W.biru, 2),
  garis("bg2", 150, 102, 50, 20, W.biru, 2),
  bulat("wh", 150, 78, 24, W.emas, W.biru),
  bulat("pa", 100, 142, 22, W.langit, W.biru),
  bulat("pb", 200, 142, 22, W.hijauMuda, W.biru),
];
const isi = (id: string, x: number, y: number, t: string, u = 22, w: string = W.merah): Obj => teks(`${id}-t`, x, y + u * 0.35, t, u, w);

/* ------------------------------ 1. Part-Part-Whole: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Part-Part-Whole, atau Bagian-Utuh. Dua bagian membentuk satu utuh.";
const SUARA_C2 = "Lingkaran besar adalah jumlah, atau utuh. Dua lingkaran kecil adalah bagiannya.";
const SUARA_C3 = "Misalnya bagian pertama tiga dan bagian kedua dua. Kita gabungkan, jadinya lima.";
const SUARA_C4 = "Dua bagian ini bisa ditukar tempat, tetapi jumlahnya tetap lima.";

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Part-Part-Whole: dua bagian, satu utuh",
  sumber: "Metode luar: Part-Part-Whole",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua,", ...kepala(1)), tambah("Dua", ...bagan())),
    k(
      SUARA_C2,
      tambah("besar", teks("sw", 232, 82, "jumlah (utuh)", 9.4, W.ungu)),
      sorotkan("besar", "wh"),
      tambah("kecil", teks("sa", 48, 176, "bagian", 9.4, W.ungu), teks("sb", 252, 176, "bagian", 9.4, W.ungu)),
    ),
    k(
      SUARA_C3,
      tambah(idx(SUARA_C3, "tiga"), isi("pa", 100, 142, "3")),
      tambah(idx(SUARA_C3, "dua", 1), isi("pb", 200, 142, "2")),
      tambah("lima.", isi("wh", 150, 78, "5", 26)),
    ),
    k(
      SUARA_C4,
      ubah("ditukar", { id: "pa-t", isi: "2" }, { id: "pb-t", isi: "3" }),
      sorotkan("tetap", "wh"),
      tambah("tetap", teks("tp", 150, 192, "jumlahnya tetap 5", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Part-Part-Whole: terapan ------------------------------ */
const SUARA_D1 = "Sekarang ada enam apel dan tiga jeruk. Berapa jumlah buahnya?";
const SUARA_D2 = "Bagian pertama adalah enam apel. Bagian kedua adalah tiga jeruk.";
const SUARA_D3 = "Kita gabungkan dua bagian itu. Jumlahnya sembilan buah.";
const SUARA_D4 = "Bagan ini membantu kita melihat dua bagian dan satu jumlah sekaligus.";

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Part-Part-Whole: enam apel dan tiga jeruk",
  sumber: "Metode luar: Part-Part-Whole, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah("Sekarang", ...kepala(1)),
      tambah("enam", ...kelompok("apel", "da", 6, 74, 40, 44, 11)),
      tambah(idx(SUARA_D1, "tiga"), ...kelompok("jeruk", "db", 3, 124, 84, 44, 11)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, ...kepala(1), ...bagan()),
      tambah("enam", isi("pa", 100, 142, "6")),
      tambah(idx(SUARA_D2, "tiga"), isi("pb", 200, 142, "3")),
      tambah("apel.", emo("ea", 60, 150, "\u{1F34E}", 22)),
      tambah("jeruk.", emo("ej", 240, 150, "\u{1F34A}", 22)),
    ),
    k(SUARA_D3, sorotkan("gabungkan", "pa", "pb"), tambah("sembilan", isi("wh", 150, 78, "9", 26)), tambah("sembilan", teks("d9", 150, 192, "6 + 3 = 9", 20, W.hijau))),
    k(SUARA_D4, bersih(0), tambah(0, ...kepala(1), emo("ow", 150, 90, "\u{1F989}", 44)), tambah("bagan", ...kartu("dk", 40, 124, 220, 34, W.emas, ["dua bagian, satu jumlah"], 10.5))),
  ],
};

/* ------------------------------ 3. Ten Frame Add: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Ten Frame Add, atau Jumlah di Bingkai Sepuluh. Bingkai ini punya sepuluh kotak.";
const SUARA_E2 = "Kita isi titik merah untuk bilangan pertama, yaitu lima. Lima titik memenuhi baris atas.";
const SUARA_E3 = "Lalu kita isi titik biru untuk bilangan kedua, yaitu empat. Baris bawah terisi empat titik.";
const SUARA_E4 = "Masih ada satu kotak kosong. Lima tambah empat sama dengan sembilan. Satu titik lagi, dan bingkainya penuh sepuluh.";
const BIRU = "#2563EB";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame Add: bingkai sepuluh kotak",
  sumber: "Metode luar: Ten Frame Add",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah("punya", ...bingkai("bk", 85, 62, 0, 26)),
      tambah(idx(SUARA_E1, "sepuluh", 2), teks("b10", 150, 138, "10", 26, W.merah)),
    ),
    k(SUARA_E2, tambah("lima.", ...isiBingkai("bk", 85, 62, 0, 5, 26), teks("e5", 250, 84, "5", 30, W.merah))),
    k(SUARA_E3, tambah("empat.", ...isiBingkai("bk", 85, 62, 5, 9, 26, {}, BIRU), teks("e4", 250, 124, "4", 30, BIRU))),
    k(SUARA_E4, sorotkan("kosong.", "bk-c9"), tambah("sembilan.", teks("e9", 150, 180, "5 + 4 = 9", 24, W.hijau)), sorotkan("penuh", "bk-c9")),
  ],
};

/* ------------------------------ 4. Ten Frame Add: terapan ------------------------------ */
const SUARA_F1 = "Wei punya sembilan bola merah di dalam bingkai, dan satu bola biru di luar bingkai.";
const SUARA_F2 = "Bola biru kita masukkan ke kotak yang masih kosong.";
const SUARA_F3 = "Bingkainya penuh! Sembilan tambah satu sama dengan sepuluh.";
const SUARA_F4 = "Bingkai membantu kita menemukan pasangan sepuluh dengan cepat. Apakah kamu menemukan pasangan lainnya?";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame Add: sembilan tambah satu",
  sumber: "Metode luar: Ten Frame Add, terapan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Wei", ...kepala(2)),
      tambah("sembilan", ...bingkai("bu", 85, 62, 9, 26), teks("f9", 250, 88, "9", 30, W.merah)),
      tambah("satu", bulat("bz", 260, 150, 10, BIRU, BIRU)),
    ),
    k(SUARA_F2, ubah("masukkan", { id: "bz", x: 85 + 4 * 26 + 13, y: 62 + 26 + 13 }), sorotkan("kosong.", "bu-c9")),
    k(SUARA_F3, tambah("Bingkainya", kotak("fr", 85, 62, 130, 52, "none", W.hijau, { rx: 0, tebal: 3 })), tambah("sepuluh.", teks("f10", 150, 150, "9 + 1 = 10", 28, W.hijau))),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, ...kepala(2), emo("ow", 150, 84, "\u{1F989}", 44)),
      tambah("pasangan", ...kartu("fq", 40, 114, 220, 44, W.emas, ["? + ? = 10", "cari pasangan lain"], 10.5)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Counting On: simpan bilangan pertama, lalu maju.";
const SUARA_R3 = "Part-Part-Whole: dua bagian membentuk jumlah. Ten Frame Add: isi bingkai sepuluh kotak sampai penuh.";
const SUARA_R4 = "Ketiganya membantu kita menjumlahkan dengan benar. Terima kasih sudah belajar.";
const DESKRIPSI = ["simpan bilangan pertama, lalu maju", "dua bagian membentuk jumlah", "isi 10 kotak sampai penuh"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 9.6, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Counting", "rm0-k"), tambah("simpan", deskripsi(0))),
    k(SUARA_R3, sorotkan("Part-Part-Whole:", "rm1-k"), tambah("bagian", deskripsi(1)), sorotkan("Frame", "rm2-k"), tambah("isi", deskripsi(2))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, "\u{1F989}", 54)),
      tambah("menjumlahkan", ...kartu("rz", 60, 124, 180, 34, W.emas, ["menjumlahkan dengan benar"], 10.5)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
