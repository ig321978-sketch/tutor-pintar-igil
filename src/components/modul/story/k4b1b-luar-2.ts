import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, panah, teks } from "./k4b1b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah } from "./k4b1b-bantu";
import { NAMA_METODE, NAMA_METODE_ID } from "./k4b1b-luar-1";

const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Expanded Form: konsep ------------------------------ */
const SUARA_U1 = "Metode ketiga, Expanded Form, atau Bentuk Uraian. Bilangan ditulis sebagai jumlah dari nilai tiap tempat.";
const SUARA_U2 = "Langkah satu: tulis nilai tiap angka menurut tempatnya. Langkah dua: hubungkan nilai-nilai itu dengan tanda tambah. Nilai nol boleh tidak ditulis.";
const SUARA_U3 = "Contoh kecil: tiga puluh dua ditulis tiga puluh ditambah dua. Bentuk ini memperlihatkan bahwa angka tiga ada di puluhan, bukan sekadar tiga.";
const SUARA_U4 = "Bentuk uraian dan tabel nilai tempat saling melengkapi: dari tabel kita menulis penjumlahannya, dan dari penjumlahan kita mengisi tabel.";

export const ADEGAN_LUAR_URAIAN: AdeganStory = {
  id: "luar-uraian",
  judul: "Expanded Form: bilangan sebagai jumlah nilai",
  sumber: "Metode luar: Expanded Form",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Expanded Form")),
      tambah("ketiga,", kepala(2)),
      tambah("Bilangan", ...kartu("b1", 60, 58, 180, 30, W.putih, ["sebuah bilangan"], 9.6)),
      tambah("jumlah", panah("bp", 150, 92, 0, 14, W.ungu, 2), ...kartu("b2", 14, 110, 272, 36, W.emas, ["jumlah dari nilai tiap tempat"], 9.6)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Dua langkah menguraikan")),
      tambah(0, kepala(2)),
      tambah(idx(SUARA_U2, "satu:"), ...kartu("l1", 14, 60, 272, 30, W.hijauMuda, ["1. tulis nilai tiap angka menurut tempatnya"], 8.8)),
      tambah(idx(SUARA_U2, "dua:"), ...kartu("l2", 14, 100, 272, 30, W.langit, ["2. hubungkan nilai-nilainya dengan tanda +"], 8.8)),
      tambah("nol", ...kartu("l3", 14, 140, 272, 30, W.pink, ["nilai nol boleh tidak ditulis"], 8.8)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Contoh kecil")),
      tambah(0, kepala(2)),
      tambah("Contoh", ...kartu("cv", 80, 60, 140, 24, W.emas, ["contoh kecil"], 9)),
      tambah("ditulis", teks("ek", 150, 116, "30 + 2 = 32", 24, W.merah)),
      tambah("puluhan,", teks("ep", 150, 156, "angka 3 di puluhan bernilai 30", 9.6, W.hijau)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Tabel dan bentuk uraian")),
      tambah(0, kepala(2)),
      tambah("tabel", ...kartu("ta", 14, 70, 110, 44, W.hijauMuda, ["tabel nilai", "tempat"], 9.4)),
      tambah("uraian", ...kartu("ur", 176, 70, 110, 44, W.krem, ["bentuk", "uraian"], 9.4)),
      tambah("menulis", panah("a1", 128, 82, 44, 0, W.ungu, 2)),
      tambah("mengisi", panah("a2", 172, 104, -44, 0, W.ungu, 2)),
    ),
  ],
};

/* ------------------------------ 2. Expanded Form: penerapan ------------------------------ */
const SUARA_UT1 = "Uraikan dua ribu seratus lima puluh: dua ribu ditambah seratus ditambah lima puluh. Nolnya tidak perlu ditulis, dan jumlahnya kembali dua ribu seratus lima puluh.";
const SUARA_UT2 = "Uraikan tujuh ribu tiga ratus lima puluh: tujuh ribu ditambah tiga ratus ditambah lima puluh. Uraikan sembilan ribu lima ratus: sembilan ribu ditambah lima ratus.";
const SUARA_UT3 = "Uraikan tujuh ribu delapan ratus dua belas, bilangan latihan tadi: tujuh ribu ditambah delapan ratus ditambah sepuluh ditambah dua.";
const SUARA_UT4 = "Uraikan enam ribu seratus sembilan puluh dua dari tabel tadi: enam ribu ditambah seratus ditambah sembilan puluh ditambah dua.";

export const ADEGAN_LUAR_URAIAN_TERAPAN: AdeganStory = {
  id: "luar-uraian-terapan",
  judul: "Expanded Form pada angka-angka kita",
  sumber: "Metode luar: Expanded Form (penerapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_UT1,
      tambah(0, kepala(2)),
      tambah("Uraikan", teks("bl", 150, 70, "2.150", 18, W.merah)),
      tambah("ditambah", teks("q1", 150, 106, "2.000 + 100 + 50 = 2.150", 13, W.hijau)),
      tambah("Nolnya", ...kartu("nt", 40, 130, 220, 30, W.pink, ["angka 0 di satuan tidak ditulis"], 9)),
    ),
    k(
      SUARA_UT2,
      hapus(0, "bl", "q1", "nt-k", "nt-t0"),
      tambah(idx(SUARA_UT2, "Uraikan"), teks("q2", 150, 90, "7.000 + 300 + 50 = 7.350", 13, W.hijau)),
      tambah(idx(SUARA_UT2, "Uraikan", 2), teks("q3", 150, 130, "9.000 + 500 = 9.500", 13, W.hijau)),
    ),
    k(
      SUARA_UT3,
      hapus(0, "q2", "q3"),
      tambah("Uraikan", teks("q4", 150, 100, "7.000 + 800 + 10 + 2 = 7.812", 12, W.hijau)),
      tambah("latihan", ...kartu("jb", 40, 130, 220, 30, W.emas, ["bilangan dari latihan tadi"], 9)),
    ),
    k(
      SUARA_UT4,
      hapus(0, "q4", "jb-k", "jb-t0"),
      tambah("Uraikan", teks("q5", 150, 100, "6.000 + 100 + 90 + 2 = 6.192", 12, W.hijau)),
      tambah("tabel", ...kartu("kn", 40, 130, 220, 30, W.emas, ["bilangan dari tabel tadi"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Ringkasan ------------------------------ */
const SUARA_R1 = "Ringkasan empat metode, dengan angka yang dipakai. Nilai Tempat memakai dua ribu seratus lima puluh serta empat bilangan latihan tadi. Tukar Sepuluh memakai dua ribu seratus lima puluh dan sembilan ribu lima ratus.";
const SUARA_R2 = "Bentuk Uraian memakai tujuh ribu tiga ratus lima puluh, sembilan ribu lima ratus, tujuh ribu delapan ratus dua belas, dan enam ribu seratus sembilan puluh dua.";
const SUARA_R3 = "Cakram Nilai Tempat memakai dua ribu seratus lima puluh, tujuh ribu tiga ratus lima puluh, sembilan ribu lima ratus, serta dua bilangan latihan tadi.";
const SUARA_R4 = "Keempat metode menjawab pertanyaan yang sama, dengan jawaban yang sama: nilai sebuah angka ditentukan oleh tempatnya. Pelajaran kita sendiri memakai kardus, kartu, dan tabel nilai tempat.";

/** Isi ringkasan: nama metode dan angka buku yang dipakainya. */
export const ANGKA_METODE: readonly (readonly [string, string])[] = [
  ["Nilai Tempat", "2.150; 8.463, 4.675, 6.789, 1.236"],
  ["Tukar Sepuluh (10 : 1)", "2.150, 9.500"],
  ["Bentuk Uraian", "2.150, 7.350, 9.500, 7.812, 6.192"],
  ["Cakram Nilai Tempat", "2.150, 7.350, 9.500, 8.463, 4.675"],
];
const kartuRingkas = (i: number) => kartu(`rt${i + 1}`, 14, 30 + i * 42, 272, 36, WARNA_METODE[i], [ANGKA_METODE[i][0], ANGKA_METODE[i][1]], 8.4);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dan angka yang dipakai",
  sumber: "Ringkasan empat metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah(idx(SUARA_R1, "Nilai"), ...kartuRingkas(0)),
      tambah(idx(SUARA_R1, "Tukar"), ...kartuRingkas(1)),
    ),
    k(
      SUARA_R2,
      tambah("Bentuk", ...kartuRingkas(2)),
      sorotkan("Bentuk", "rt3-k"),
    ),
    k(
      SUARA_R3,
      tambah("Cakram", ...kartuRingkas(3)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Satu jawaban, empat cara")),
      tambah("Keempat", ...kartu("jw", 20, 34, 260, 50, W.emas, ["nilai sebuah angka", "ditentukan oleh tempatnya"], 10)),
      tambah("metode", emo("e1", 45, 126, "🔢", 26), teks("e1t", 45, 148, "Nilai Tempat", 7.8, W.biru)),
      tambah("metode", emo("e2", 112, 126, "🧱", 26), teks("e2t", 112, 148, "Tukar Sepuluh", 7.8, W.biru)),
      tambah("metode", emo("e3", 188, 126, "➕", 26), teks("e3t", 188, 148, "Bentuk Uraian", 7.8, W.biru)),
      tambah("metode", emo("e4", 258, 126, "🔵", 26), teks("e4t", 258, 148, "Cakram", 7.8, W.biru)),
      tambah("Pelajaran", ...kartu("bk", 30, 162, 240, 28, W.krem, ["pelajaran: kardus, kartu, tabel nilai"], 8.6)),
    ),
  ],
};
