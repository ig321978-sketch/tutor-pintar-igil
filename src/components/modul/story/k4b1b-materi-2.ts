import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kotakKarton, papan4, tandaiSel, teks, tokoh, tumpukan } from "./k4b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b1b-bantu";

/*
 * Cerita orisinal IGIL "Gudang Handuk Pak Laode" (Kelas 4 Bab 1 Sub-Bab B), lanjutan Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1b.md. Bagian ini: salah langkah Satria (angka tiga artinya tiga), tiga kotak berarti tiga ratus, dan angka yang sama di tempat berbeda.
 */

/* ------------------------------ 4. Salah tiga ------------------------------ */
const SUARA_S1 = "Satria menunjuk angka tiga pada bilangan itu dan berkata, angka tiga artinya tiga handuk.";
const SUARA_S2 = "Ia yakin sekali dan menepuk dadanya.";
const SUARA_S3 = "Kalau aku salah, aku melipat semua handuk di gudang, katanya.";

export const ADEGAN_SALAH_TIGA: AdeganStory = {
  id: "salah-tiga",
  judul: "Satria mengira angka tiga artinya tiga",
  sumber: "Materi: salah langkah angka tiga",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Salah Langkah"), ...tokoh("sa", 40, 184, "Satria")),
      tambah("bilangan", ...papan4("sp", 70, 40, 50, [2, 3, 0, 4])),
      tambah("tiga", tandaiSel("st", 70, 40, 50, 1)),
      tambah("artinya", teks("bb", 170, 116, "3 = 3 handuk?", 11, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("yakin", teks("yk", 170, 142, "yakin!", 12, W.merah)),
      tambah("menepuk", emo("lg", 86, 148, E.lengan, 20)),
      tambah("dadanya", emo("kl", 108, 150, E.kilau, 16)),
    ),
    k(
      SUARA_S3,
      tambah("Kalau", teks("tr", 170, 96, "taruhan!", 11, W.tanya)),
      tambah("melipat", ...tumpukan("tm", 232, 150, 6, 34)),
      tambah("semua", emo("pk", 214, 112, E.pusing, 18)),
      tambah("katanya", emo("gl", 266, 112, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 5. Harga tempat ------------------------------ */
const SUARA_R1 = "Genta mengambil tiga kotak handuk dan menaruhnya di depan Satria.";
const SUARA_R2 = "Satu kotak berisi seratus lembar, jadi tiga kotak berisi tiga ratus lembar.";
const SUARA_R3 = "Angka tiga di tempat ratusan berarti tiga ratus, bukan tiga.";
const KX = [100, 136, 172];

export const ADEGAN_HARGA: AdeganStory = {
  id: "harga",
  judul: "Tiga kotak berarti tiga ratus",
  sumber: "Materi: tiga kotak tiga ratus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah("Genta", judul("Tiga Kotak"), ...tokoh("ge", 40, 184, "Genta")),
      tambah("tiga", teks("n3", 150, 62, "3 kotak", 10, W.ungu)),
      tambah("kotak", ...KX.flatMap((x, i) => kotakKarton(`kb${i}`, x, 96, 28))),
      tambah("Satria", ...tokoh("sa", 260, 184, "Satria")),
    ),
    k(
      SUARA_R2,
      hapus(0, "n3"),
      tambah("Satu", teks("u1", 150, 62, "1 kotak = 100 lembar", 9.5, W.biru)),
      tambah("seratus", ...KX.map((x, i) => teks(`ts${i}`, x + 14, 114, "100", 8, W.coklat, { z: 4 }))),
      tambah("tiga@1", teks("u2", 150, 140, "3 kotak = 300 lembar", 10, W.merah)),
      sorotkan("ratus@2", "kb0", "kb1", "kb2"),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Harga Tempat"), ...tokoh("ge", 40, 184, "Genta"), ...tokoh("sa", 260, 184, "Satria")),
      tambah("tempat", ...papan4("hp", 50, 34, 50, [2, 3, 0, 4])),
      tambah("ratusan", tandaiSel("ht", 50, 34, 50, 1)),
      tambah("ratus@2", teks("t300", 150, 118, "3 = 300", 14, W.hijauTua)),
      tambah("bukan", teks("bk", 150, 142, "bukan 3", 11, W.merah), emo("xs", 214, 140, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 6. Tempat ------------------------------ */
const SUARA_T1 = "Laras menjelaskan, angka dua di tempat ribuan berarti dua ribu.";
const SUARA_T2 = "Angka empat di tempat satuan hanya berarti empat.";
const SUARA_T3 = "Angka yang sama bisa berarti lain, tergantung tempatnya.";
const SAMA = ["3", "30", "300", "3.000"];

export const ADEGAN_TEMPAT: AdeganStory = {
  id: "tempat",
  judul: "Angka sama, tempat berbeda",
  sumber: "Materi: tempat menentukan arti",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah("Laras", judul("Arti Tiap Tempat"), ...tokoh("la", 268, 184, "Laras")),
      tambah("angka", ...papan4("tp", 30, 36, 60, [2, 3, 0, 4])),
      tambah("ribuan", tandaiSel("t0", 30, 36, 60, 0)),
      tambah("berarti", teks("a1", 150, 118, "2 = 2.000", 13, W.hijauTua)),
    ),
    k(
      SUARA_T2,
      tambah("empat", tandaiSel("t3", 30, 36, 60, 3, 30, W.oranye)),
      tambah("satuan", teks("a2", 150, 142, "4 = 4", 12, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Tempat Menentukan")),
      tambah("sama", ...kartu("m0", 14, 70, 60, 28, "#BFDBFE", [SAMA[0]], 12)),
      tambah("berarti", ...kartu("m1", 80, 70, 60, 28, "#BBF7D0", [SAMA[1]], 12), ...kartu("m2", 146, 70, 60, 28, "#FDE68A", [SAMA[2]], 12)),
      tambah("tergantung", ...kartu("m3", 212, 70, 74, 28, "#FBCFE8", [SAMA[3]], 12)),
      tambah("tempatnya", ...tokoh("sa", 40, 184, "Satria"), emo("cm", 92, 154, E.cemberut, 20)),
    ),
  ],
};
