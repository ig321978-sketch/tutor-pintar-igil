import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, blok, emo, judul, kartu, teks } from "./k3b1A-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1A-bantu";

export const NAMA_METODE_ID = ["Balok Dienes", "Tabel Nilai Tempat", "Nama Bilangan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar bilangan dan lambang bilangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Balok Dienes, Tabel Nilai Tempat, dan Nama Bilangan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara membaca dan menulis bilangan tiga angka dengan benar?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang membangun bilangan dari balok, ada yang mengisi tabel tempat, dan ada yang melatih cara menyebutnya. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk bilangan tiga angka",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Balok"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Tabel"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Nama"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F522}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara membaca dan", "menulis bilangan tiga angka?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F9F1}", 36), emo("a2", 150, 100, "\u{1F4CB}", 36), emo("a3", 230, 100, "\u{1F4AC}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bangun, isi, dan sebut")),
      tambah(idx(SUARA_O5, "membangun"), teks("kt0", 150, 70, "membangun dari balok", 14, W.ungu)),
      tambah(idx(SUARA_O5, "mengisi"), teks("kt1", 150, 100, "mengisi tabel tempat", 14, W.ungu)),
      tambah(idx(SUARA_O5, "melatih"), teks("kt2", 150, 130, "menyebut dengan benar", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Balok Dienes: konsep ------------------------------ */
const SUARA_B1 = "Metode pertama bernama Balok Dienes. Balok mengubah bilangan menjadi benda yang bisa dilihat.";
const SUARA_B2 = "Kotak kecil mewakili satu satuan. Batang mewakili satu puluhan. Lempeng mewakili satu ratusan.";
const SUARA_B3 = "Kalau ada sepuluh kotak kecil, kita tukar dengan satu batang. Kalau ada sepuluh batang, kita tukar dengan satu lempeng.";
const SUARA_B4 = "Itulah Balok Dienes. Bilangan dibangun dari lempeng, batang, dan kotak kecil.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Balok Dienes: kotak, batang, lempeng",
  sumber: "Metode luar: Balok Dienes",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "benda"), emo("bl", 150, 120, "\u{1F9F1}", 44))),
    k(
      SUARA_B2,
      hapus(0, "bl"),
      tambah(idx(SUARA_B2, "Kotak"), blok("s", 1, 42, 96, 14, 14), teks("lb0", 49, 128, "1 satuan", 9.4)),
      tambah(idx(SUARA_B2, "Batang"), blok("p", 1, 128, 54, 14, 56), teks("lb1", 135, 128, "1 puluhan", 9.4)),
      tambah(idx(SUARA_B2, "Lempeng"), blok("r", 1, 198, 54, 66, 56), teks("lb2", 231, 128, "1 ratusan", 9.4)),
    ),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "kotak"), ...kartu("kz1", 14, 140, 272, 24, W.merahMuda, ["10 satuan = 1 puluhan"], 10.5)),
      tambah(idx(SUARA_B3, "Kalau", 2), ...kartu("kz2", 14, 168, 272, 24, W.langit, ["10 puluhan = 1 ratusan"], 10.5)),
    ),
    k(SUARA_B4, bersih(0), tambah(0, judul("Dibangun dari balok"), emo("bm", 150, 76, "\u{1F9F1}", 44)), tambah(idx(SUARA_B4, "Bilangan"), ...kartu("bz", 30, 100, 240, 34, W.emas, ["bilangan dibangun dari balok"], 11)), tambah(idx(SUARA_B4, "kotak"), emo("bk", 150, 164, "✅", 30))),
  ],
};

/* ------------------------------ 3. Balok Dienes: terapan ------------------------------ */
const SUARA_C1 = "Terapkan pada soal ini. Kira menyusun dua lempeng, tiga batang, dan empat kotak kecil.";
const SUARA_C2 = "Bilangan berapa yang ditunjukkan balok ini? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Dua ratus tiga puluh empat.";
const SUARA_C4 = "Dengan balok, bilangan menjadi mudah dilihat dan dihitung.";
const FLAT = (i: number) => blok("r", i, 30 + (i - 1) * 56, 56, 50, 50);
const ROD = (i: number) => blok("p", i, 150 + (i - 1) * 14, 56, 10, 50);
const UNIT = (i: number) => blok("s", i, 220 + ((i - 1) % 2) * 14, 56 + Math.floor((i - 1) / 2) * 14, 10, 10);

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Balok Dienes: balok susunan Kira",
  sumber: "Metode luar: Balok Dienes",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_C1, "dua"), FLAT(1), FLAT(2)),
      tambah(idx(SUARA_C1, "tiga"), ROD(1), ROD(2), ROD(3)),
      tambah(idx(SUARA_C1, "empat"), UNIT(1), UNIT(2), UNIT(3), UNIT(4)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Bilangan"), teks("tanya", 150, 124, "berapa bilangan balok ini?", 12, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(132, ["243", "234", "324"], 16))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c2-k"), tambah(idx(SUARA_C3, "Dua"), cap("200 + 30 + 4 = 234"))),
    k(SUARA_C4, redamkan(0, "c2-k"), hapus(0, "tanya", "cp", ...idPilihan(3)), tambah(idx(SUARA_C4, "mudah"), ...kartu("bt", 30, 132, 240, 34, W.emas, ["lempeng, batang, kotak kecil"], 11))),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita memahami bilangan tiga angka.";
const SUARA_Y2 = "Metode Balok Dienes, bilangan dibangun dari lempeng, batang, dan kotak kecil.";
const SUARA_Y3 = "Metode Tabel Nilai Tempat, setiap angka diisi pada tempatnya.";
const SUARA_Y4 = "Metode Nama Bilangan, menyebut ratusan dahulu, lalu puluhan, lalu satuan.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Balok"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "dibangun dari balok"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Tabel"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "angka diisi pada tempatnya"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Nama"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "sebut ratusan, puluhan, satuan"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};

