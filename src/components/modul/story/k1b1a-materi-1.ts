import type { AdeganStory, Obj } from "./logika-story";
import { W, deret, emo, garis, judul, kartu, kotak, tata, teks } from "./k1b1a-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b1a-bantu";

/* Mainan taman dari bentuk sederhana. */
const ayunan = (id: string, x: number, y: number): Obj[] => [
  garis(`${id}-a`, x - 14, y, 28, 0, W.coklat, 3),
  garis(`${id}-b`, x - 8, y, 0, 34, W.abu, 1.5),
  garis(`${id}-c`, x + 8, y, 0, 34, W.abu, 1.5),
  kotak(`${id}-d`, x - 11, y + 34, 22, 5, W.merah, W.biru, { rx: 2, tebal: 1.2 }),
];
const perosotan = (id: string, x: number, y: number): Obj[] => [
  garis(`${id}-a`, x, y, 24, 34, "#FB923C", 4),
  garis(`${id}-b`, x, y, 0, 34, W.coklat, 3),
  garis(`${id}-c`, x - 5, y, 10, 0, W.coklat, 3),
];
const jungkat = (id: string, x: number, y: number): Obj[] => [
  { id: `${id}-s`, t: "jalur", x, y: y + 14, d: "M0 0 L10 20 L-10 20 Z", warna: W.krem, garis: W.coklat, tebal: 1.5 },
  garis(`${id}-a`, x - 38, y + 26, 76, -24, W.oranye, 4),
];

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Matahari bersinar cerah di atas mereka.";
const SUARA_C2 = "Mereka gembira sekali. Igil mengajak mereka menghitung benda-benda di taman. Ayo, kita ikut bermain sambil belajar bersama mereka.";
const SUARA_C3 = "Kita akan menghitung dari satu sampai sepuluh. Pelan-pelan saja, ya.";
const SUARA_C4 = "Di taman ada satu jungkat-jungkit, dua ayunan, dan tiga perosotan. Kita hitung dulu satu kelompok, lalu kelompok berikutnya.";
const SUARA_C5 = "Di dekat ayunan ada bola. Berapa banyak bola itu? Ayo kita cari tahu.";

const ANAK: [string, number, string][] = [["Malosi", 40, "Malosi"], ["Kira", 95, "Kira"], ["Upe", 150, "Upe"], ["Wei", 205, "Wei"]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("sekali.", emo("senyum", 150, 84, "\u{1F604}", 22)),
      ubah("Igil", { id: "a-Igil", y: 100 }),
      tambah("menghitung", ...kartu("bb", 60, 36, 180, 28, W.krem, ["Igil: Ayo kita hitung!"], 9)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Menghitung 1 sampai 10"), emo("ig3", 150, 170, "\u{1F989}", 30)),
      tambah("satu", teks("u-ang", 24, 100, "1  2  3  4  5  6  7  8  9", 14, W.merah, { anchor: "start" })),
      tambah("sepuluh", teks("u-10", 250, 100, "10", 14, W.merah)),
      tambah("Pelan-pelan", ...kartu("pp", 70, 128, 160, 26, W.langit, ["Pelan-pelan saja"], 9)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Mainan di taman"), garis("tanah", 14, 150, 272, 0, W.hijau, 3)),
      tambah("satu", ...jungkat("jk", 50, 90), teks("l1", 50, 176, "1", 16, W.merah)),
      tambah("dua", ...ayunan("ay0", 135, 80), ...ayunan("ay1", 165, 80), teks("l2", 150, 176, "2", 16, W.merah)),
      tambah("tiga", ...perosotan("ps0", 205, 90), ...perosotan("ps1", 235, 90), ...perosotan("ps2", 265, 90), teks("l3", 235, 176, "3", 16, W.merah)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Berapa banyak bola?")),
      tambah("bola.", ...deret("bola", "q", tata(5, 96), 11)),
      tambah("Berapa", emo("tanya", 150, 160, "❓", 34)),
      tambah(idx(SUARA_C5, "tahu"), ...kartu("cr", 70, 172, 160, 24, W.emas, ["Ayo kita cari tahu"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Hitung satu per satu ------------------------------ */
const SUARA_H1 = "Cara menghitung: sentuh satu benda, lalu sebut satu angka. Jangan terburu-buru, ya, supaya tidak ada yang terlewat.";
const SUARA_H2 = "Ayo hitung bola ini. Satu, dua, tiga, empat, lima.";
const SUARA_H3 = "Lihat, tiap bola kita sentuh satu kali saja. Tidak ada yang terlewat.";
const SUARA_H4 = "Bagaimana kalau bolanya berantakan? Kita rapikan dulu supaya mudah dihitung.";
const SUARA_H5 = "Bola yang sudah dihitung kita geser ke samping. Jadi tidak ada yang dihitung dua kali. Itu cara yang aman dan rapi.";
const SUARA_H6 = "Hebat! Kalau setiap benda dihitung satu kali, hasil hitungannya pasti benar. Kamu sudah bisa menghitung dengan baik.";
const SUARA_HX = "Kalau kita lupa menyebut satu angka, hitungannya jadi salah. Karena itu kita harus pelan-pelan dan teliti.";
const P5 = tata(5, 92);
const IDB = ["b0", "b1", "b2", "b3", "b4"];

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung-satu",
  judul: "Menghitung satu per satu",
  sumber: "Materi: hitung satu per satu",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hitung satu per satu")),
      tambah("sentuh", ...deret("bola", "b", P5, 11)),
      tambah("angka.", ...kartu("kt", 60, 150, 180, 26, W.krem, ["satu benda, satu angka"], 9.4)),
    ),
    k(SUARA_H2, ...hitungAksi(SUARA_H2, "b", P5, "ini.")),
    k(
      SUARA_H3,
      sorotkan("sentuh", ...IDB),
      tambah("terlewat.", teks("tl", 150, 192, "Tidak ada yang terlewat", 8.8, W.hijau)),
    ),
    k(SUARA_HX, tambah("pelan-pelan", emo("kura", 250, 150, "\u{1F422}", 30)), tambah("teliti.", teks("kt2", 250, 178, "teliti", 9, W.hijau))),
    k(
      SUARA_H4,
      hapus(0, "tg", "kt-k", "kt-t0", "tl", "kura", "kt2", ...IDB.map((b) => `bn${b.slice(1)}`)),
      ubah("berantakan", { id: "b0", x: 70, y: 52, sorot: false }, { id: "b1", x: 215, y: 76, sorot: false }, { id: "b2", x: 130, y: 120, sorot: false }, { id: "b3", x: 250, y: 140, sorot: false }, { id: "b4", x: 40, y: 140, sorot: false }),
      ubah("rapikan", ...IDB.map((b, i) => ({ id: b, x: P5[i].x, y: P5[i].y }))),
    ),
    k(
      SUARA_H5,
      ubah("geser", { id: "b0", y: 150 }, { id: "b1", y: 150 }, { id: "b2", y: 150 }),
      tambah("samping.", teks("sd", 100, 182, "sudah dihitung", 9, W.hijau)),
    ),
    k(
      SUARA_H6,
      tambah("Hebat!", emo("ow", 240, 160, "\u{1F989}", 32)),
      tambah("benar.", teks("bn", 240, 126, "Benar!", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Bilangan terakhir ------------------------------ */
const SUARA_T1 = "Sekarang kita hitung balon. Satu, dua, tiga, empat.";
const SUARA_T2 = "Kita berhenti di angka empat. Angka terakhir yang kita sebut adalah empat.";
const SUARA_T3 = "Artinya, banyak balon seluruhnya ada empat. Banyaknya sama dengan angka terakhir. Jadi kita tidak perlu menghitung lagi.";
const SUARA_T4 = "Sekarang kelereng. Satu, dua, tiga. Berapa banyak kelereng seluruhnya?";
const SUARA_T5 = "Angka terakhir adalah tiga. Jadi ada tiga kelereng.";
const SUARA_T6 = "Ingat ya, angka terakhir yang kita sebut menunjukkan banyak seluruh benda. Ucapkan terus sampai kamu hafal.";
const SUARA_TX = "Coba tutup mata sebentar. Kalau ada yang bertanya berapa balon, kamu cukup ingat angka terakhir tadi, yaitu empat.";
const P4 = tata(4, 92);
const P3 = tata(3, 92);

export const ADEGAN_TERAKHIR: AdeganStory = {
  id: "bilangan-terakhir",
  judul: "Angka terakhir adalah banyaknya",
  sumber: "Materi: angka terakhir",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Angka terakhir"), ...deret("balon", "c", P4, 12)), ...hitungAksi(SUARA_T1, "c", P4, "balon.")),
    k(
      SUARA_T2,
      ubah("berhenti", { id: "cn0", op: 0.3 }, { id: "cn1", op: 0.3 }, { id: "cn2", op: 0.3 }),
      ubah(idx(SUARA_T2, "terakhir"), { id: "cn3", u: 18 }),
      sorotkan(idx(SUARA_T2, "terakhir"), "c3"),
    ),
    k(
      SUARA_T3,
      tambah("empat.", ...kartu("bw", 60, 150, 180, 34, W.emas, ["Ada 4 balon"], 14)),
      sorotkan("terakhir.", "bw-k"),
    ),
    k(SUARA_TX, tambah("tutup", emo("mata", 262, 168, "\u{1F648}", 30)), tambah("empat.", teks("tx4", 262, 140, "4", 22, W.merah))),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Hitung kelereng"), ...deret("kelereng", "d", P3, 18)),
      ...hitungAksi(SUARA_T4, "d", P3, "kelereng."),
      tambah("Berapa", ...kartu("qb", 70, 164, 160, 26, W.langit, ["Berapa banyak?"], 10)),
    ),
    k(
      SUARA_T5,
      hapus(0, "qb-k", "qb-t0"),
      sorotkan("terakhir", "d2", "dn2"),
      tambah("Jadi", ...kartu("ak", 70, 164, 160, 28, W.emas, ["Ada 3 kelereng"], 12)),
    ),
    k(
      SUARA_T6,
      bersih(0),
      tambah(0, judul("Ingat!"), emo("ow6", 150, 100, "\u{1F989}", 44)),
      tambah("terakhir", ...kartu("in", 40, 118, 220, 50, W.hijauMuda, ["angka terakhir", "= banyak seluruh benda"], 11)),
    ),
  ],
};
