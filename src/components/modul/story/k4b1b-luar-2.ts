import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaSel, emo, judul, kartu, kepalaSel, kotak, lantai, panah, papan4, selKosong, tandaiSel, teks, tokoh } from "./k4b1b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b1b-bantu";

/*
 * Cerita orisinal IGIL "Gudang Handuk Pak Laode" (Kelas 4 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1b.md. Bagian ini: Place Chart (Bagan Tempat) dan terapannya, Digit Swap (Tukar Tempat) dan terapannya, dan ringkasan.
 */

const sel = (id: string, x: number, y: number, cw: number, ch = 30) => [0, 1, 2, 3].map((c) => selKosong(id, x, y + 14, cw, c, ch));
const kep = (id: string, x: number, y: number, cw: number, dari: number, sampai: number): Obj[] => [dari, sampai].length ? Array.from({ length: sampai - dari + 1 }, (_, i) => kepalaSel(id, x, y, cw, dari + i)).flat() : [];

/* ------------------------------ Place Chart: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Place Chart, atau Bagan Tempat.";
const SUARA_B2 = "Kita menggambar bagan dengan kolom ribuan, ratusan, puluhan, dan satuan.";
const SUARA_B3 = "Setiap angka ditulis pada kolomnya, dan kolom kosong diisi nol.";
const SUARA_B4 = "Dari bagan, kita membaca banyaknya tiap angka, yaitu angka dikali tempatnya.";
const BX = 30;
const BW = 60;
const BY = 44;

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Place Chart: Bagan Tempat",
  sumber: "Metode global: Place Chart (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 2: Place Chart"), ...lantai("hl", 150)),
      tambah("Place", ...sel("bg", BX, BY, BW, 34)),
      tambah("Bagan", teks("nm", 150, 140, "Bagan Tempat", 13, W.ungu)),
    ),
    k(
      SUARA_B2,
      tambah("menggambar", teks("kk", 150, 32, "4 kolom", 9, W.merah)),
      tambah("ribuan,", ...kep("bg", BX, BY, BW, 0, 0)),
      tambah("ratusan,", ...kep("bg", BX, BY, BW, 1, 1)),
      tambah("puluhan,", ...kep("bg", BX, BY, BW, 2, 2)),
      tambah("satuan.", ...kep("bg", BX, BY, BW, 3, 3)),
    ),
    k(
      SUARA_B3,
      hapus(0, "kk", "nm"),
      tambah("angka", angkaSel("bg", BX, BY, BW, 0, 4, { ch: 34, u: 20 })),
      tambah("ditulis", angkaSel("bg", BX, BY, BW, 2, 3, { ch: 34, u: 20 }), angkaSel("bg", BX, BY, BW, 3, 5, { ch: 34, u: 20 })),
      tambah("kosong", tandaiSel("bz", BX, BY, BW, 1, 34, W.merah)),
      tambah("nol.", angkaSel("bg", BX, BY, BW, 1, 0, { ch: 34, u: 20 }), teks("kz", 150, 130, "kosong = 0", 11, W.merah)),
    ),
    k(
      SUARA_B4,
      hapus(0, "bz", "kz"),
      tambah("banyaknya", ...["4.000", "0", "30", "5"].map((t, c) => teks(`pr${c}`, BX + c * BW + BW / 2, 112, t, 11, W.hijauTua))),
      tambah("dikali", teks("rm", 150, 134, "angka × tempatnya", 11, W.ungu)),
      tambah("tempatnya", emo("ok", 150, 160, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Place Chart: terapan ------------------------------ */
const SUARA_Q1 = "Laras menaruh lima, nol, tujuh, dan dua pada bagan tempat.";
const SUARA_Q2 = "Angka tujuh di kolom puluhan berarti tujuh puluh, bukan tujuh.";
const SUARA_Q3 = "Cocok untuk bilangan besar, karena bagan tidak pernah kehabisan ruang.";
const SUARA_Q4 = "Kurang cocok kalau kita tidak punya kertas, karena bagannya harus digambar lebih dulu.";

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Place Chart: terapan",
  sumber: "Metode global: Place Chart (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Bagan Laras"), ...tokoh("la", 268, 184, "Laras")),
      tambah("bagan", ...papan4("lq", 30, 40, 60, ["", "", "", ""])),
      tambah("lima,", angkaSel("lq", 30, 40, 60, 0, 5)),
      tambah("nol,", angkaSel("lq", 30, 40, 60, 1, 0)),
      tambah("tujuh,", angkaSel("lq", 30, 40, 60, 2, 7)),
      tambah("dua", angkaSel("lq", 30, 40, 60, 3, 2)),
    ),
    k(
      SUARA_Q2,
      tambah("puluhan", tandaiSel("lt", 30, 40, 60, 2)),
      tambah("berarti", teks("a1", 150, 126, "7 = 70", 14, W.hijauTua)),
      tambah("bukan", teks("a2", 150, 150, "bukan 7", 11, W.merah), emo("xs", 206, 148, E.salah, 16)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "a1", "a2", "xs", "lt"),
      tambah("Cocok", emo("ok", 150, 126, E.benar, 22)),
      tambah("besar", teks("bs", 150, 152, "9.999", 18, W.merah)),
      tambah("ruang", kotak("rg", 26, 34, 248, 82, undefined, W.hijau, { tebal: 2.4, rx: 6, putus: true, z: 6 })),
    ),
    k(
      SUARA_Q4,
      hapus(0, "ok", "bs", "rg"),
      tambah("Kurang", emo("xs2", 220, 134, E.salah, 22)),
      tambah("kertas", emo("kr", 150, 140, E.kertas, 32)),
      tambah("digambar", emo("pn", 104, 134, E.pensil, 22), teks("gd", 150, 170, "gambar dulu", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Digit Swap: konsep ------------------------------ */
const SUARA_W1 = "Cara ketiga, Digit Swap, atau Tukar Tempat.";
const SUARA_W2 = "Kita menukar dua angka pada sebuah bilangan, lalu membandingkan dua bilangannya.";
const SUARA_W3 = "Angka yang sama akan berarti lain bila tempatnya berbeda.";
const SUARA_W4 = "Cara ini membuktikan bahwa tempat angka sama pentingnya dengan angkanya.";
const KX = [60, 110, 160, 210];

export const ADEGAN_LUAR_TUKAR: AdeganStory = {
  id: "luar-tukar",
  judul: "Digit Swap: Tukar Tempat",
  sumber: "Metode global: Digit Swap (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Cara 3: Digit Swap"), ...lantai("hl", 150)),
      tambah("Digit", emo("jr", 150, 104, "\u{1F501}", 36)),
      tambah("Tukar", teks("nm", 150, 140, "Tukar Tempat", 13, W.ungu)),
    ),
    k(
      SUARA_W2,
      hapus(0, "jr", "nm"),
      tambah("menukar", ...[4, 1, 6, 2].flatMap((a, i) => kartu(`ka${i}`, KX[i] - 20, 50, 40, 36, "#FDE68A", [String(a)], 16))),
      tambah("dua", teks("d2", 270, 44, "2 angka", 9, W.merah), panah("sw1", 117, 94, 36, 0, W.ungu, 2, { z: 6 }), panah("sw2", 153, 100, -36, 0, W.ungu, 2, { z: 6 })),
      tambah("bilangan,", teks("o1", 90, 128, "4.162", 14, W.biru)),
      tambah("bilangannya", teks("o2", 210, 128, "4.612", 14, W.merah)),
    ),
    k(
      SUARA_W3,
      tambah("Angka", teks("e1", 90, 150, "6 = 60", 12, W.hijauTua)),
      tambah("berarti", teks("e2", 210, 150, "6 = 600", 12, W.hijauTua)),
      sorotkan("tempatnya", "ka1-k", "ka2-k"),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Sama Pentingnya")),
      tambah("tempat", ...kartu("pt", 30, 70, 100, 46, "#BFDBFE", ["tempat"], 12)),
      tambah("sama", teks("sm", 150, 98, "=", 22, W.merah)),
      tambah("angkanya.", ...kartu("pa", 170, 70, 100, 46, "#BBF7D0", ["angka"], 12), emo("bt", 150, 150, E.bintang, 22)),
    ),
  ],
};

/* ------------------------------ Digit Swap: terapan ------------------------------ */
const SUARA_X1 = "Satria menukar angka tiga dan dua pada bilangan dua ribu tiga ratus empat.";
const SUARA_X2 = "Hasilnya tiga ribu dua ratus empat, dan angka tiga kini berarti tiga ribu.";
const SUARA_X3 = "Cocok untuk menghapus salah paham bahwa angka selalu berarti sama.";
const SUARA_X4 = "Kurang cocok untuk menghitung jumlah, karena cara ini hanya menunjukkan perbedaan tempat.";

export const ADEGAN_LUAR_TUKAR_TERAPAN: AdeganStory = {
  id: "luar-tukar-terapan",
  judul: "Digit Swap: terapan",
  sumber: "Metode global: Digit Swap (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Satria Menukar"), ...tokoh("sa", 40, 184, "Satria")),
      tambah("angka", ...papan4("ta", 50, 36, 50, [2, 3, 0, 4])),
      tambah("tiga", tandaiSel("tx0", 50, 36, 50, 0, 30, W.merah), tandaiSel("tx1", 50, 36, 50, 1, 30, W.merah)),
      tambah("bilangan", teks("o1", 276, 68, "2.304", 10, W.biru)),
    ),
    k(
      SUARA_X2,
      tambah("Hasilnya", ...papan4("tb", 50, 100, 50, [3, 2, 0, 4])),
      tambah("ribu", teks("o2", 276, 132, "3.204", 10, W.merah)),
      tambah("kini", tandaiSel("ty", 50, 100, 50, 0, 30, W.hijau)),
      tambah("berarti", teks("e2", 150, 168, "3 = 3.000", 12, W.hijauTua)),
    ),
    k(
      SUARA_X3,
      hapus(0, "e2"),
      tambah("Cocok", emo("ok", 250, 160, E.benar, 20)),
      tambah("salah", teks("s3", 150, 168, "3 = 3?", 12, W.merah), emo("xs", 196, 166, E.salah, 16)),
      tambah("selalu", teks("sl", 150, 186, "tidak selalu sama", 9, W.hijauTua)),
    ),
    k(
      SUARA_X4,
      hapus(0, "ok", "s3", "xs", "sl"),
      tambah("Kurang", emo("xs3", 250, 160, E.salah, 20)),
      tambah("menghitung", teks("jm", 150, 168, "2.304 + 3.204 = ?", 11, W.merah)),
      tambah("perbedaan", teks("tp", 150, 186, "hanya beda tempat", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_S1 = "Tiga cara sudah kita lihat bersama Pak Laode. Mana yang pas tergantung keadaan.";
const SUARA_S2 = "Ingin melihat banyaknya, pakai Balok Cacah. Ingin mencatat dengan rapi, pakai Bagan Tempat.";
const SUARA_S3 = "Ingin membuktikan pentingnya tempat, pakai Tukar Tempat. Apa pun caranya, sebut tempat tiap angka.";
const SUARA_S4 = "Menurutmu, untuk membaca angka tujuh pada bilangan lima ribu tujuh puluh dua, cara mana yang paling pas?";
const KARTU_RINGKAS = ["#FEF3C7", "#DCFCE7", "#DBEAFE"];
const NAMA_RINGKAS: [string, string][] = [["Balok", "Cacah"], ["Bagan", "Tempat"], ["Tukar", "Tempat"]];
const RK = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 60, 88, 50, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));
const RK_KECIL = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 146, 88, 40, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara memahami tempat angka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tiga Cara"), teks("n3", 150, 40, "3 cara", 12, W.ungu)),
      tambah("lihat", ...RK),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
    ),
    k(
      SUARA_S2,
      hapus(0, "tq"),
      sorotkan("Balok", "r0-k"),
      tambah("melihat", emo("my", 62, 134, E.mata, 20)),
      redamkan("Bagan", "r0-k"),
      sorotkan("Bagan", "r1-k"),
      tambah("rapi,", emo("rp", 156, 134, E.benar, 20)),
    ),
    k(
      SUARA_S3,
      redamkan(0, "r1-k"),
      sorotkan("Tukar", "r2-k"),
      tambah("sebut", emo("gb", 250, 134, E.gelembung, 20)),
      tambah("angka.", emo("ok", 150, 168, E.benar, 20)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Cara Mana?"), ...RK_KECIL),
      tambah("angka", ...papan4("rp", 40, 34, 55, [5, 0, 7, 2])),
      tambah("tujuh", tandaiSel("rt", 40, 34, 55, 2)),
      tambah("ribu", teks("rb", 150, 120, "5.072", 14, W.merah)),
      tambah("pas?", emo("qs", 266, 120, E.tanya, 26)),
    ),
  ],
};
