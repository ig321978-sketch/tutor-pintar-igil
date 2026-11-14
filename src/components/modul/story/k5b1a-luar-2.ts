import type { AdeganStory } from "./logika-story";
import { W, angkaTabel, deretDigit, emo, judul, kartu, panah, tabelTempat, teks, titikRibuan } from "./k5b1a-gambar";
import { bersih, idx, k, tambah } from "./k5b1a-bantu";

/* ------------------------------ 6. Number Reading: konsep ------------------------------ */
/** Susunan kartu bagian kiri, kata ribu, dan bagian kanan untuk membaca bilangan besar. */
const tumpukBaca = (id: string, y: number, kiriAngka: string, kiriKata: string, kananAngka: string, kananKata: string) => [
  ...kartu(`${id}a`, 14, y, 272, 36, W.hijauMuda, [`bagian kiri: ${kiriAngka}`, kiriKata], 8.8),
  ...kartu(`${id}b`, 14, y + 42, 272, 28, W.krem, ["lalu kata ribu"], 9.2),
  ...kartu(`${id}c`, 14, y + 76, 272, 36, W.langit, [`bagian kanan: ${kananAngka}`, kananKata], 8.8),
];
const SUARA_NR1 = "Metode ketiga, Number Reading, atau membaca bilangan besar. Titik ribuan membagi bilangan menjadi dua bagian: bagian kiri dibaca seperti bilangan kecil, lalu diikuti kata ribu.";
const SUARA_NR2 = "Bagian kanan, tiga angka terakhir, dibaca seperti bilangan ratusan biasa. Jadi enam puluh enam, ribu, lima ratus.";
const SUARA_NR4 = "Satu kasus lagi: nol di tengah. Pada sembilan ribu lima puluh, ratusannya nol, jadi bagian kanan hanya lima puluh dan kita tidak menyebut nol sama sekali.";
const SUARA_NR3 = "Angka nol tidak dibaca. Pada empat puluh ribu tiga ratus lima puluh, satuannya nol, jadi bagian kanan hanya tiga ratus lima puluh.";

export const ADEGAN_LUAR_BACA: AdeganStory = {
  id: "luar-baca",
  judul: "Number Reading: membaca bilangan besar dua bagian",
  sumber: "Metode luar: Number Reading; angka Buku Siswa hlm. 7",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_NR1,
      tambah(0, judul("Number Reading")),
      tambah(0, teks("nb", 150, 64, "66.500", 30, W.merah)),
      tambah(idx(SUARA_NR1, "kiri"), ...kartu("nk", 14, 84, 124, 40, W.hijauMuda, ["bagian kiri", "66"], 9.6)),
      tambah(idx(SUARA_NR1, "Titik"), teks("nt", 150, 116, ".", 22, W.merah)),
      tambah(idx(SUARA_NR1, "ribu", 1), teks("nz", 150, 150, "dibaca seperti bilangan kecil + kata ribu", 8.6, W.biru)),
    ),
    k(
      SUARA_NR2,
      bersih(0),
      tambah(0, judul("Bagian kanan dibaca biasa")),
      tambah("Bagian", ...tumpukBaca("nq", 30, "66", "enam puluh enam", "500", "lima ratus")),
      tambah(idx(SUARA_NR2, "Jadi"), teks("nh", 150, 172, "66.500", 20, W.merah)),
    ),
    k(
      SUARA_NR3,
      bersih(0),
      tambah(0, judul("Angka nol tidak dibaca")),
      tambah(0, teks("n3", 150, 62, "40.350", 30, W.merah)),
      tambah(idx(SUARA_NR3, "empat"), teks("n4", 150, 90, "empat puluh ribu", 11, W.biru), teks("n5", 150, 106, "tiga ratus lima puluh", 11, W.biru)),
      tambah(idx(SUARA_NR3, "satuannya"), ...kartu("n6", 40, 120, 220, 28, W.merahMuda, ["satuan 0: tidak dibaca"], 9.2)),
      tambah(idx(SUARA_NR3, "kanan"), ...kartu("n7", 40, 154, 220, 28, W.emas, ["bagian kanan: 350"], 9.6)),
    ),
    k(
      SUARA_NR4,
      bersih(0),
      tambah(0, judul("Nol di tengah")),
      tambah(0, teks("n8", 150, 56, "9.050", 26, W.merah)),
      tambah(idx(SUARA_NR4, "sembilan"), ...kartu("n8a", 14, 70, 130, 40, W.hijauMuda, ["bagian kiri", "9"], 9.2), teks("n8d", 79, 132, "sembilan", 9, W.biru)),
      tambah(idx(SUARA_NR4, "ratusannya"), ...kartu("n8c", 156, 70, 130, 40, W.langit, ["bagian kanan", "050"], 9.2)),
      tambah(idx(SUARA_NR4, "kanan"), teks("n8e", 221, 132, "lima puluh", 9, W.biru)),
      tambah(idx(SUARA_NR4, "nol", 3), ...kartu("n8f", 14, 150, 272, 28, W.merahMuda, ["nol di ratusan tidak dibaca"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Number Reading: penerapan pada 26.932, 88.976, dan 13.456 ------------------------------ */
/** Bilangan dengan dua kartu bagian dan bacaannya di bawah. */
const belahBaca = (id: string, kiriAngka: string, kananAngka: string, kiriKata: string, kananKata: string, besar: string) => [
  teks(`${id}b`, 150, 56, besar, 26, W.merah),
  ...kartu(`${id}a`, 14, 70, 130, 40, W.hijauMuda, ["bagian kiri", kiriAngka], 9.2),
  ...kartu(`${id}c`, 156, 70, 130, 40, W.langit, ["bagian kanan", kananAngka], 9.2),
  teks(`${id}d`, 79, 132, kiriKata, 9, W.biru),
  teks(`${id}e`, 221, 132, kananKata, 9, W.biru),
];
const SUARA_NT1 = "Terapkan pada dua puluh enam ribu sembilan ratus tiga puluh dua. Bagian kiri dua puluh enam, bagian kanan sembilan ratus tiga puluh dua.";
const SUARA_NT2 = "Gabungkan: dua puluh enam, ribu, sembilan ratus tiga puluh dua. Hasilnya sama dengan jawaban di panduan guru.";
const SUARA_NT3 = "Sekarang delapan puluh delapan ribu sembilan ratus tujuh puluh enam dari Ayo Berlatih. Bagian kiri delapan puluh delapan, bagian kanan sembilan ratus tujuh puluh enam.";
const SUARA_NT4 = "Dan tiga belas ribu empat ratus lima puluh enam: tiga belas, ribu, empat ratus lima puluh enam. Semua bilangan lima angka dibaca dengan cara yang sama.";

export const ADEGAN_LUAR_BACA_TERAPAN: AdeganStory = {
  id: "luar-baca-terapan",
  judul: "Number Reading pada 26.932, 88.976, dan 13.456",
  sumber: "Metode luar: Number Reading; angka Buku Siswa hlm. 7–9",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_NT1,
      tambah(0, judul("Baca 26.932")),
      tambah(0, teks("n1b", 150, 56, "26.932", 26, W.merah)),
      tambah(idx(SUARA_NT1, "kiri"), ...kartu("n1a", 14, 70, 130, 40, W.hijauMuda, ["bagian kiri", "26"], 9.2), teks("n1d", 79, 132, "dua puluh enam", 9, W.biru)),
      tambah(idx(SUARA_NT1, "kanan"), ...kartu("n1c", 156, 70, 130, 40, W.langit, ["bagian kanan", "932"], 9.2), teks("n1e", 221, 132, "sembilan ratus tiga puluh dua", 9, W.biru)),
    ),
    k(
      SUARA_NT2,
      bersih(0),
      tambah(0, judul("Gabungkan tiga bagian")),
      tambah(0, ...kartu("n2a", 14, 30, 272, 32, W.hijauMuda, ["26: dua puluh enam"], 9.2)),
      tambah(idx(SUARA_NT2, "ribu"), ...kartu("n2b", 14, 68, 272, 26, W.krem, ["ribu"], 9.2)),
      tambah(idx(SUARA_NT2, "sembilan"), ...kartu("n2c", 14, 100, 272, 32, W.langit, ["932: sembilan ratus tiga puluh dua"], 9.2)),
      tambah("Hasilnya", teks("n2d", 150, 156, "26.932", 26, W.merah), emo("n2e", 252, 178, "✔", 22, { warna: W.hijau })),
    ),
    k(
      SUARA_NT3,
      bersih(0),
      tambah(0, judul("Baca 88.976")),
      tambah(0, ...belahBaca("n3", "88", "976", "delapan puluh delapan", "sembilan ratus tujuh puluh enam", "88.976")),
    ),
    k(
      SUARA_NT4,
      bersih(0),
      tambah(0, judul("Baca 13.456")),
      tambah(0, ...belahBaca("n4", "13", "456", "tiga belas", "empat ratus lima puluh enam", "13.456")),
      tambah("Semua", ...kartu("n4f", 40, 150, 220, 28, W.emas, ["semua bilangan lima angka sama"], 9.6)),
    ),
  ],
};

/* ------------------------------ 8. Period Grouping: konsep ------------------------------ */
export const DG = { x: 60, y: 60, cw: 36, ch: 40 };
const periode = (id: string, n: number, cw: number, x: number, y: number, ch: number) => [
  teks(`${id}k`, x + ((n - 3) * cw) / 2, y + ch + 24, "periode ribuan", 8, W.biru),
  teks(`${id}r`, x + (n - 3) * cw + 1.5 * cw, y + ch + 24, "periode ratusan", 8, W.biru),
];
const SUARA_PG1 = "Metode keempat, Period Grouping, atau pengelompokan per periode. Mulailah dari angka paling kanan, lalu kelompokkan tiga angka tiga angka ke kiri.";
const SUARA_PG2 = "Di antara dua kelompok kita taruh titik. Titik itu menandai ribuan: kelompok kiri dibaca bersama kata ribu.";
const SUARA_PG4 = "Aturan yang sama berlaku untuk bilangan lebih pendek. Pada tiga ribu empat ratus lima puluh enam, satu angka di kiri dan tiga angka di kanan, titiknya tetap di antara keduanya.";
const SUARA_PG3 = "Tanpa titik, lima angka berderet mudah membuat kita salah baca. Dengan titik, mata langsung melihat ribuan dan ratusannya.";

export const ADEGAN_LUAR_PERIODE: AdeganStory = {
  id: "luar-periode",
  judul: "Period Grouping: kelompok tiga angka dan titik ribuan",
  sumber: "Metode luar: Period Grouping",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_PG1,
      tambah(0, judul("Period Grouping")),
      tambah(idx(SUARA_PG1, "Mulailah"), ...deretDigit("pg", DG.x, DG.y, DG.cw, DG.ch, "14500", true, 20)),
      tambah(idx(SUARA_PG1, "kelompokkan"), ...periode("pg", 5, DG.cw, DG.x, DG.y, DG.ch)),
    ),
    k(
      SUARA_PG2,
      tambah(idx(SUARA_PG2, "titik", 1), titikRibuan("pg-p", DG.x, DG.y, DG.cw, DG.ch, 2)),
      tambah(idx(SUARA_PG2, "ribuan"), teks("pgt", 132, 150, "titik = tanda ribuan", 9.6, W.merah)),
      tambah(idx(SUARA_PG2, "kata"), teks("pgh", 150, 178, "14.500", 20, W.merah)),
    ),
    k(
      SUARA_PG3,
      bersih(0),
      tambah(0, judul("Dengan titik lebih jelas")),
      tambah("Tanpa", teks("p1", 120, 70, "14500", 28, W.hitam), teks("p2", 120, 88, "sulit dibaca", 8.6, W.biru), emo("p3", 240, 66, "❌", 26)),
      tambah("Dengan", teks("p4", 120, 140, "14.500", 28, W.merah), teks("p5", 120, 158, "mudah dibaca", 8.6, W.biru), emo("p6", 240, 136, "✅", 26)),
    ),
    k(
      SUARA_PG4,
      bersih(0),
      tambah(0, judul("Bilangan empat angka")),
      tambah(0, ...deretDigit("pz", 78, DG.y, DG.cw, DG.ch, "3456", true, 20)),
      tambah(idx(SUARA_PG4, "angka", 2), ...periode("pz", 4, DG.cw, 78, DG.y, DG.ch)),
      tambah(idx(SUARA_PG4, "titiknya"), titikRibuan("pz-p", 78, DG.y, DG.cw, DG.ch, 1)),
      tambah(idx(SUARA_PG4, "keduanya"), teks("pza", 150, 172, "3.456", 24, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Period Grouping: penerapan pada 88.976, 54.675, dan 100.000 ------------------------------ */
const SUARA_PU1 = "Terapkan pada deretan angka delapan, delapan, sembilan, tujuh, enam tanpa titik. Kelompokkan tiga angka dari kanan: sembilan, tujuh, enam.";
const SUARA_PU2 = "Taruh titik di antara kelompok. Hasilnya delapan puluh delapan ribu sembilan ratus tujuh puluh enam, tertulis seperti di layar.";
const SUARA_PU3 = "Sekarang lima, empat, enam, tujuh, lima. Kelompok kanan enam, tujuh, lima, kelompok kiri lima dan empat. Jadi lima puluh empat ribu enam ratus tujuh puluh lima.";
const SUARA_PU4 = "Titik hanya memisahkan ribuan, bukan koma desimal. Karena itu seratus ribu ditulis dengan satu titik, yaitu angka satu diikuti tiga nol.";

export const ADEGAN_LUAR_PERIODE_TERAPAN: AdeganStory = {
  id: "luar-periode-terapan",
  judul: "Period Grouping pada 88.976, 54.675, dan 100.000",
  sumber: "Metode luar: Period Grouping; angka Buku Siswa hlm. 9",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_PU1,
      tambah(0, judul("Deretan tanpa titik")),
      tambah(0, ...deretDigit("pu", DG.x, DG.y, DG.cw, DG.ch, "88976", false, 20)),
      tambah(idx(SUARA_PU1, "Kelompokkan"), ...deretDigit("pu", DG.x, DG.y, DG.cw, DG.ch, "88976", true, 20), ...periode("pu", 5, DG.cw, DG.x, DG.y, DG.ch)),
    ),
    k(
      SUARA_PU2,
      tambah(idx(SUARA_PU2, "titik"), titikRibuan("pu-p", DG.x, DG.y, DG.cw, DG.ch, 2)),
      tambah(idx(SUARA_PU2, "Hasilnya"), teks("pua", 150, 172, "88.976", 24, W.merah)),
    ),
    k(
      SUARA_PU3,
      bersih(0),
      tambah(0, judul("Deretan lima angka lain")),
      tambah(0, ...deretDigit("pv", DG.x, DG.y, DG.cw, DG.ch, "54675", true, 20)),
      tambah(idx(SUARA_PU3, "Kelompok"), ...periode("pv", 5, DG.cw, DG.x, DG.y, DG.ch), titikRibuan("pv-p", DG.x, DG.y, DG.cw, DG.ch, 2)),
      tambah(idx(SUARA_PU3, "Jadi"), teks("pva", 150, 172, "54.675", 24, W.merah)),
    ),
    k(
      SUARA_PU4,
      bersih(0),
      tambah(0, judul("Titik bukan koma")),
      tambah(0, ...deretDigit("pw", 45, DG.y, 35, DG.ch, "100000", true, 20)),
      tambah(idx(SUARA_PU4, "satu", 2), titikRibuan("pw-p", 45, DG.y, 35, DG.ch, 3)),
      tambah(idx(SUARA_PU4, "seratus"), teks("pwa", 150, 150, "100.000", 26, W.merah)),
      tambah(idx(SUARA_PU4, "koma"), ...kartu("pwb", 50, 160, 200, 26, W.krem, ["titik pemisah, bukan koma"], 9.2)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
export const TB_R = { x: 20, y: 40, cw: 52, o: { ch: 30, u: 16 } };
const KOSONG5 = [["", "", "", "", ""]];
const SUARA_R1 = "Ringkasan: bilangan tiga belas ribu empat ratus lima puluh enam, dari Ayo Berlatih nomor dua, kita tulis dengan empat cara.";
const SUARA_R2 = "Tabel nilai tempat menaruh satu angka tiap kolom: satu, tiga, empat, lima, enam. Extended Dienes menghitung balok dengan angka yang sama.";
const SUARA_R3 = "Number Reading membaca tiga belas, ribu, lalu empat ratus lima puluh enam. Period Grouping menaruh titik di antara kelompok tiga angka.";
const SUARA_R4 = "Keempat cara menuju bilangan yang sama. Pilih yang paling nyaman, lalu periksa dengan cara lain.";
const NAMA2 = [["Place-Value", "Chart"], ["Extended", "Dienes"], ["Number", "Reading"], ["Period", "Grouping"]];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan: empat metode untuk satu bilangan",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 9",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Satu bilangan, empat cara")),
      tambah(0, teks("rb", 150, 64, "13.456", 30, W.merah)),
      ...NAMA2.map((n, i) => tambah(idx(SUARA_R1, "empat", 2), ...kartu(`rm${i}`, 8 + i * 73, 96, 68, 40, [W.hijauMuda, W.langit, W.krem, W.pink][i], n, 7.6))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Tabel dan balok")),
      tambah(0, ...tabelTempat("rt", TB_R.x, TB_R.y, TB_R.cw, KOSONG5, TB_R.o)),
      tambah(idx(SUARA_R2, "satu", 2), angkaTabel("rt", TB_R.x, TB_R.y, TB_R.cw, 0, 0, "1", TB_R.o)),
      tambah(idx(SUARA_R2, "tiga"), angkaTabel("rt", TB_R.x, TB_R.y, TB_R.cw, 0, 1, "3", TB_R.o)),
      tambah(idx(SUARA_R2, "empat"), angkaTabel("rt", TB_R.x, TB_R.y, TB_R.cw, 0, 2, "4", TB_R.o)),
      tambah(idx(SUARA_R2, "lima"), angkaTabel("rt", TB_R.x, TB_R.y, TB_R.cw, 0, 3, "5", TB_R.o)),
      tambah(idx(SUARA_R2, "enam"), angkaTabel("rt", TB_R.x, TB_R.y, TB_R.cw, 0, 4, "6", TB_R.o)),
      tambah(idx(SUARA_R2, "Extended"), ...kartu("rd", 30, 112, 240, 32, W.langit, ["balok: 1, 3, 4, 5, 6 balok"], 9.2)),
      tambah("angka@2", panah("rp", 150, 148, 0, 18, W.merah, 2)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kata dan titik")),
      tambah(0, ...kartu("rx", 14, 34, 272, 48, W.krem, ["Number Reading", "13 | ribu | 456"], 9.6)),
      tambah(idx(SUARA_R3, "Period"), ...kartu("ry", 14, 98, 272, 48, W.pink, ["Period Grouping", "13.456"], 9.6)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih dan periksa")),
      tambah("Keempat", emo("r5", 150, 78, "🎯", 44)),
      tambah("Pilih", ...kartu("r6", 30, 100, 240, 30, W.emas, ["pilih cara yang paling nyaman"], 9.6)),
      tambah("periksa", ...kartu("r7", 30, 140, 240, 30, W.hijauMuda, ["periksa dengan cara lain"], 9.6)),
    ),
  ],
};
