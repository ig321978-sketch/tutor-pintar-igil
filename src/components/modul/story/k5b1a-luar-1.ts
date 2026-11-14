import type { AdeganStory } from "./logika-story";
import { NILAI_TEMPAT, W, angkaTabel, emo, judul, kartu, lambang, panah, tabelTempat, teks, tumpukBlok } from "./k5b1a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k5b1a-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const NAMA_METODE = ["Place-Value Chart", "Extended Dienes", "Number Reading", "Period Grouping"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["📊", "🧱", "🗣", "🔢"];
const SUARA_O1 = "Bagaimana kita membaca dan menulis bilangan besar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Place-Value Chart, Extended Dienes, Number Reading, dan Period Grouping.";
const SUARA_O3 = "Semuanya menjawab pertanyaan yang sama, yaitu bagaimana mengenali bilangan lima angka. Caranya berbeda: memakai tabel, balok, kata, atau titik pemisah.";
const SUARA_O4 = "Angkanya dari buku: empat belas ribu lima ratus, enam puluh enam ribu lima ratus, dan dua puluh enam ribu sembilan ratus tiga puluh dua.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membaca dan menulis bilangan besar",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 5–8",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("bilangan", ...kartu("pb", 40, 40, 100, 44, W.krem, ["14.500"], 14)),
      tambah("berbagai", emo("gl", 215, 78, "🌍", 46)),
      tambah("angka", teks("pa", 150, 136, "bilangan lima angka dari buku", 9.4, W.biru), teks("pc", 150, 154, "sampai 100.000", 9.4, W.biru)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O2, ["Place-Value", "Extended", "Number", "Period"][i]), ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("tabel,", emo("i1", 45, 80, IKON_METODE[0], 34), teks("i1t", 45, 112, "tabel", 8.6, W.biru)),
      tambah("balok,", emo("i2", 112, 80, IKON_METODE[1], 34), teks("i2t", 112, 112, "balok", 8.6, W.biru)),
      tambah("kata,", emo("i3", 188, 80, IKON_METODE[2], 34), teks("i3t", 188, 112, "kata", 8.6, W.biru)),
      tambah("titik", emo("i4", 255, 80, IKON_METODE[3], 34), teks("i4t", 255, 112, "titik", 8.6, W.biru)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("belas", ...kartu("a1", 14, 34, 272, 32, W.hijauMuda, ["14.500: harga buku tulis Yohana"], 9.6)),
      tambah("enam@2", ...kartu("a2", 14, 76, 272, 32, W.langit, ["66.500: harga obat batuk"], 9.6)),
      tambah("dua@2", ...kartu("a3", 14, 118, 272, 32, W.krem, ["26.932: penduduk Kayu Tanam"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Place-Value Chart: konsep ------------------------------ */
export const TB_PV = { x: 20, y: 44, cw: 52, o: { ch: 30, u: 9 } };
const KOSONG5 = [["", "", "", "", ""]];
const OTAB5 = { ch: 30, u: 16 };
const nilaiPV = (j: number) => angkaTabel("pv", TB_PV.x, TB_PV.y, TB_PV.cw, 0, j, lambang(NILAI_TEMPAT[j]), TB_PV.o, W.coklat);
const SUARA_PV1 = "Metode pertama, Place-Value Chart, atau tabel nilai tempat. Gambar tabel dengan lima kolom: puluh ribuan, ribuan, ratusan, puluhan, dan satuan.";
const SUARA_PV2 = "Tiap kolom punya nilai satu angka. Dari kanan ke kiri, satu angka bernilai satu, sepuluh, seratus, seribu, dan sepuluh ribu, makin ke kiri makin besar.";
const SUARA_PV4 = "Keuntungan tabel: nilai angka tergantung kolomnya. Angka lima di ratusan bernilai lima ratus, tetapi angka lima di satuan hanya bernilai lima.";
const SUARA_PV3 = "Cara memakainya tiga langkah: dengarkan bilangannya, isi angka tiap kolom dari kiri, dan isi nol pada kolom yang kosong supaya angka lain tidak bergeser.";

export const ADEGAN_LUAR_PV: AdeganStory = {
  id: "luar-pv",
  judul: "Place-Value Chart: tabel nilai tempat",
  sumber: "Metode luar: Place-Value Chart",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_PV1,
      tambah(0, judul("Place-Value Chart")),
      tambah(idx(SUARA_PV1, "Gambar"), ...tabelTempat("pv", TB_PV.x, TB_PV.y, TB_PV.cw, KOSONG5, TB_PV.o)),
      tambah("lima", ...kartu("pq", 40, 118, 220, 30, W.krem, ["5 kolom, 5 nilai tempat"], 10)),
    ),
    k(
      SUARA_PV2,
      tambah(idx(SUARA_PV2, "satu", 3), nilaiPV(4)),
      tambah(idx(SUARA_PV2, "sepuluh", 1), nilaiPV(3)),
      tambah(idx(SUARA_PV2, "seratus"), nilaiPV(2)),
      tambah(idx(SUARA_PV2, "seribu"), nilaiPV(1)),
      tambah(idx(SUARA_PV2, "sepuluh", 2), nilaiPV(0)),
      tambah("makin", panah("pw", 250, 160, -200, 0, W.merah, 2), teks("pz", 150, 178, "makin ke kiri makin besar", 9.6, W.merah)),
    ),
    k(
      SUARA_PV3,
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah(idx(SUARA_PV3, "dengarkan"), ...kartu("l1", 14, 34, 272, 32, W.hijauMuda, ["1. dengarkan bilangannya"], 9.6)),
      tambah(idx(SUARA_PV3, "isi", 1), ...kartu("l2", 14, 76, 272, 32, W.langit, ["2. isi angka tiap kolom dari kiri"], 9.6)),
      tambah(idx(SUARA_PV3, "isi", 2), ...kartu("l3", 14, 118, 272, 32, W.krem, ["3. kolom kosong diisi 0"], 9.6)),
    ),
    k(
      SUARA_PV4,
      bersih(0),
      tambah(0, judul("Nilai tergantung kolom")),
      tambah(0, ...tabelTempat("pr", TB_PV.x, 34, TB_PV.cw, KOSONG5, OTAB5), ...tabelTempat("ps", TB_PV.x, 106, TB_PV.cw, KOSONG5, OTAB5)),
      tambah(idx(SUARA_PV4, "ratusan"), angkaTabel("pr", TB_PV.x, 34, TB_PV.cw, 0, 2, "5", OTAB5), teks("pra", 150, 100, "5 di ratusan: nilainya 500", 10, W.merah)),
      tambah(idx(SUARA_PV4, "satuan"), angkaTabel("ps", TB_PV.x, 106, TB_PV.cw, 0, 4, "5", OTAB5), teks("psa", 150, 172, "5 di satuan: nilainya 5", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Place-Value Chart: penerapan pada 26.932 dan 14.500 ------------------------------ */
const OTAB = { ch: 30, u: 16 };
const angkaPV = (id: string, j: number, d: string) => angkaTabel(id, TB_PV.x, TB_PV.y, TB_PV.cw, 0, j, d, OTAB);
const SUARA_PT1 = "Terapkan pada penduduk Kayu Tanam, dua puluh enam ribu sembilan ratus tiga puluh dua. Isi tabel dari kiri: dua, enam, sembilan, tiga, dua.";
const SUARA_PT2 = "Angka dua muncul dua kali, tetapi tempatnya berbeda. Dua di puluh ribuan bernilai dua puluh ribu, sedangkan dua di satuan hanya bernilai dua.";
const SUARA_PT3 = "Sekarang empat belas ribu lima ratus. Ratusan berisi lima, puluhan nol, satuan nol, dan dua nol itu menjaga agar angka lima tidak bergeser.";
const SUARA_PT4 = "Cek dengan membaca ulang dari kiri ke kanan: dua puluh enam ribu sembilan ratus tiga puluh dua. Bacaan itu harus sama dengan bilangan yang diucapkan.";

export const ADEGAN_LUAR_PV_TERAPAN: AdeganStory = {
  id: "luar-pv-terapan",
  judul: "Place-Value Chart pada 26.932 dan 14.500",
  sumber: "Metode luar: Place-Value Chart; angka Buku Siswa hlm. 6–7",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_PT1,
      tambah(0, judul("26.932 di tabel")),
      tambah(0, ...tabelTempat("pt", TB_PV.x, TB_PV.y, TB_PV.cw, KOSONG5, OTAB)),
      tambah("Kayu", teks("pb", 150, 140, "26.932", 26, W.merah)),
      tambah(idx(SUARA_PT1, "dua", 3), angkaPV("pt", 0, "2")),
      tambah(idx(SUARA_PT1, "enam", 2), angkaPV("pt", 1, "6")),
      tambah(idx(SUARA_PT1, "sembilan", 2), angkaPV("pt", 2, "9")),
      tambah(idx(SUARA_PT1, "tiga", 2), angkaPV("pt", 3, "3")),
      tambah(idx(SUARA_PT1, "dua", 4), angkaPV("pt", 4, "2")),
    ),
    k(
      SUARA_PT2,
      sorotkan(idx(SUARA_PT2, "dua", 3), "pt-c0-0"),
      tambah(idx(SUARA_PT2, "ribu"), teks("n1", 46, 110, "20.000", 11, W.merah)),
      sorotkan(idx(SUARA_PT2, "dua", 5), "pt-c0-4"),
      tambah(idx(SUARA_PT2, "dua", 6), teks("n2", 254, 110, "2", 11, W.merah)),
    ),
    k(
      SUARA_PT3,
      bersih(0),
      tambah(0, judul("14.500 di tabel")),
      tambah(0, ...tabelTempat("pu", TB_PV.x, TB_PV.y, TB_PV.cw, KOSONG5, OTAB)),
      tambah("Sekarang", teks("pb2", 150, 140, "14.500", 26, W.merah)),
      tambah(idx(SUARA_PT3, "empat"), angkaPV("pu", 0, "1")),
      tambah(idx(SUARA_PT3, "belas"), angkaPV("pu", 1, "4")),
      tambah(idx(SUARA_PT3, "lima", 2), angkaPV("pu", 2, "5")),
      tambah(idx(SUARA_PT3, "nol", 1), angkaPV("pu", 3, "0")),
      tambah(idx(SUARA_PT3, "nol", 2), angkaPV("pu", 4, "0")),
      tambah("menjaga", ...kartu("pj", 40, 160, 220, 28, W.emas, ["dua nol menjaga tempat"], 9.6)),
    ),
    k(
      SUARA_PT4,
      bersih(0),
      tambah(0, judul("Baca ulang dan cocokkan")),
      tambah("Cek", teks("c1", 150, 70, "26.932", 30, W.merah)),
      tambah("dua@1", teks("c2", 150, 106, "dua puluh enam ribu", 11, W.biru), teks("c3", 150, 124, "sembilan ratus tiga puluh dua", 11, W.biru)),
      tambah("Bacaan", ...kartu("c4", 70, 146, 160, 30, W.hijauMuda, ["bacaan sama dengan bilangan"], 8.8), emo("c5", 252, 168, "✔", 22, { warna: W.hijau })),
    ),
  ],
};

/* ------------------------------ 4. Extended Dienes: konsep ------------------------------ */
export const CX = [38, 94, 150, 206, 262];
export const NAMA_KECIL = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const SUARA_DN1 = "Metode kedua, Extended Dienes, atau balok nilai tempat. Dienes biasanya punya balok satuan, puluhan, ratusan, dan ribuan; di sini diperluas dengan satu balok lagi untuk puluh ribuan.";
const SUARA_DN2 = "Satu balok pada satu tingkat bernilai sepuluh kali balok di tingkat sebelah kanannya. Sepuluh balok ribuan, misalnya, dapat ditukar dengan satu balok puluh ribuan.";
const SUARA_DN4 = "Keuntungan balok: besarnya bilangan bisa dilihat. Satu balok puluh ribuan bernilai sepuluh ribu satuan, jauh lebih besar daripada satu balok satuan.";
const SUARA_DN3 = "Cara memakainya: hitung banyak balok pada tiap tingkat, tulis angkanya dari kiri ke kanan, dan tingkat yang tidak punya balok ditulis nol.";
const kolomBlok = (j: number) => [teks(`dn${j}n`, CX[j], 114, NAMA_KECIL[j], 6.8, W.biru), teks(`dn${j}v`, CX[j], 130, lambang(NILAI_TEMPAT[j]), 9, W.coklat), ...tumpukBlok(`dn${j}`, CX[j], 60, j, 1)];

export const ADEGAN_LUAR_DIENES: AdeganStory = {
  id: "luar-dienes",
  judul: "Extended Dienes: balok nilai tempat",
  sumber: "Metode luar: Extended Dienes",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_DN1,
      tambah(0, judul("Extended Dienes")),
      tambah(idx(SUARA_DN1, "satuan,"), ...kolomBlok(4)),
      tambah(idx(SUARA_DN1, "puluhan,"), ...kolomBlok(3)),
      tambah(idx(SUARA_DN1, "ratusan,"), ...kolomBlok(2)),
      tambah(idx(SUARA_DN1, "ribuan", 1), ...kolomBlok(1)),
      tambah(idx(SUARA_DN1, "puluh"), ...kolomBlok(0)),
    ),
    k(
      SUARA_DN2,
      bersih(0),
      tambah(0, judul("Tukar sepuluh balok")),
      tambah(0, ...tumpukBlok("tk", 90, 44, 1, 10)),
      tambah(idx(SUARA_DN2, "Sepuluh", 2), teks("tl", 90, 150, "10 balok ribuan", 9, W.biru)),
      tambah("ditukar", panah("tp", 140, 90, 40, 0, W.merah, 2)),
      tambah(idx(SUARA_DN2, "satu", 3), ...tumpukBlok("tm", 210, 70, 0, 1), teks("tn", 210, 150, "1 balok puluh ribuan", 9, W.biru)),
    ),
    k(
      SUARA_DN3,
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah(idx(SUARA_DN3, "hitung"), ...kartu("d1", 14, 34, 272, 32, W.hijauMuda, ["1. hitung balok tiap tingkat"], 9.6)),
      tambah(idx(SUARA_DN3, "tulis"), ...kartu("d2", 14, 76, 272, 32, W.langit, ["2. tulis angkanya dari kiri"], 9.6)),
      tambah(idx(SUARA_DN3, "tingkat", 2), ...kartu("d3", 14, 118, 272, 32, W.krem, ["3. tanpa balok ditulis 0"], 9.6)),
    ),
    k(
      SUARA_DN4,
      bersih(0),
      tambah(0, judul("Besar bilangan terlihat")),
      tambah(idx(SUARA_DN4, "puluh"), ...tumpukBlok("bp", 100, 70, 0, 1), teks("bpn", 100, 124, "10.000", 11, W.coklat)),
      tambah(idx(SUARA_DN4, "sepuluh"), ...kartu("bq", 20, 140, 120, 28, W.jingga, ["1 balok = 10.000"], 9)),
      tambah(idx(SUARA_DN4, "satuan", 2), ...tumpukBlok("bs", 220, 85, 4, 1), teks("bsn", 220, 124, "1", 11, W.coklat)),
      tambah("jauh", ...kartu("br", 160, 140, 120, 28, W.emas, ["1 balok = 1"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Extended Dienes: penerapan pada 14.500 dan 13.578 ------------------------------ */
/** Baris cek mandiri: banyak balok dikali nilai tempat (kiri) dan hasilnya (kanan). */
export const NILAI_BARIS = [
  ["1 × 10.000", "10.000"],
  ["3 × 1.000", "3.000"],
  ["5 × 100", "500"],
  ["7 × 10", "70"],
  ["8 × 1", "8"],
];
const kepalaKolom = () => NAMA_KECIL.map((n, j) => teks(`eh${j}`, CX[j], 34, n, 6.8, W.biru));
const blokKolom = (id: string, j: number, jumlah: number) => tumpukBlok(`${id}${j}`, CX[j], 46, j, jumlah);
const cacah = (id: string, j: number, d: string) => teks(`${id}${j}c`, CX[j], 118, d, 16, W.merah);
const SUARA_ET1 = "Wujudkan empat belas ribu lima ratus dengan balok. Satu balok puluh ribuan, empat balok ribuan, lima balok ratusan, tanpa balok puluhan dan satuan.";
const SUARA_ET2 = "Hitung banyak balok pada tiap tingkat: satu, empat, lima, nol, dan nol. Ditulis berderet, jadi empat belas ribu lima ratus.";
const SUARA_ET4 = "Cek mandiri nilai balok: satu kali sepuluh ribu, tiga kali seribu, lima kali seratus, tujuh kali sepuluh, dan delapan kali satu. Semuanya membentuk tiga belas ribu lima ratus tujuh puluh delapan.";
const SUARA_ET3 = "Sekarang tiga belas ribu lima ratus tujuh puluh delapan, penduduk perempuan Kayu Tanam. Balok yang dipakai: satu, tiga, lima, tujuh, dan delapan.";

export const ADEGAN_LUAR_DIENES_TERAPAN: AdeganStory = {
  id: "luar-dienes-terapan",
  judul: "Extended Dienes pada 14.500 dan 13.578",
  sumber: "Metode luar: Extended Dienes; angka Buku Siswa hlm. 6–7",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_ET1,
      tambah(0, judul("Balok untuk 14.500")),
      tambah(0, ...kepalaKolom()),
      tambah("Wujudkan", teks("eb", 150, 160, "14.500", 26, W.merah)),
      tambah(idx(SUARA_ET1, "Satu"), ...blokKolom("ea", 0, 1)),
      tambah(idx(SUARA_ET1, "empat", 2), ...blokKolom("ea", 1, 4)),
      tambah(idx(SUARA_ET1, "lima", 2), ...blokKolom("ea", 2, 5)),
      tambah("tanpa", teks("en", 206, 70, "tidak ada", 7.6, W.abu), teks("en2", 262, 70, "tidak ada", 7.6, W.abu)),
    ),
    k(
      SUARA_ET2,
      tambah(idx(SUARA_ET2, "satu"), cacah("ea", 0, "1")),
      tambah(idx(SUARA_ET2, "empat"), cacah("ea", 1, "4")),
      tambah(idx(SUARA_ET2, "lima"), cacah("ea", 2, "5")),
      tambah(idx(SUARA_ET2, "nol", 1), cacah("ea", 3, "0")),
      tambah(idx(SUARA_ET2, "nol", 2), cacah("ea", 4, "0")),
    ),
    k(
      SUARA_ET3,
      bersih(0),
      tambah(0, judul("Balok untuk 13.578")),
      tambah(0, ...kepalaKolom()),
      tambah("Sekarang", teks("eb2", 150, 160, "13.578", 26, W.merah)),
      tambah(idx(SUARA_ET3, "satu"), ...blokKolom("eb", 0, 1), cacah("eb", 0, "1")),
      tambah(idx(SUARA_ET3, "tiga", 2), ...blokKolom("eb", 1, 3), cacah("eb", 1, "3")),
      tambah(idx(SUARA_ET3, "lima", 2), ...blokKolom("eb", 2, 5), cacah("eb", 2, "5")),
      tambah(idx(SUARA_ET3, "tujuh", 2), ...blokKolom("eb", 3, 7), cacah("eb", 3, "7")),
      tambah(idx(SUARA_ET3, "delapan", 2), ...blokKolom("eb", 4, 8), cacah("eb", 4, "8")),
    ),
    k(
      SUARA_ET4,
      bersih(0),
      tambah(0, judul("Nilai semua balok 13.578")),
      ...NILAI_BARIS.map((r, i) => tambah(idx(SUARA_ET4, "kali", i + 1), teks(`ev${i}a`, 140, 42 + i * 24, r[0], 12, W.biru, { anchor: "end" }), teks(`ev${i}b`, 210, 42 + i * 24, r[1], 12, W.merah))),
      tambah("Semuanya", teks("evt", 150, 178, "13.578", 26, W.merah)),
    ),
  ],
};
