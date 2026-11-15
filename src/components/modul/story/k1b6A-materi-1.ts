import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, OWL, W, baris, deret, emo, judul, kartu, kotak, pasangGaris, teks, type Titik } from "./k1b6A-gambar";
import { hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah } from "./k1b6A-bantu";

/** Tulisan nama kelompok di kiri baris benda (rata kiri). */
export const nama = (id: string, y: number, isi: string, warna: string = W.biru): Obj => teks(id, 4, y + 3, isi, 8.4, warna, { anchor: "start" });
export const BARIS_ATAS = 66;
export const BARIS_BAWAH = 126;
export const PA: Titik[] = baris(7, BARIS_ATAS);
export const PB: Titik[] = baris(6, BARIS_BAWAH);
export const IDS_A = Array.from({ length: 7 }, (_, i) => `d${i}`);
export const IDS_B = Array.from({ length: 6 }, (_, i) => `e${i}`);
export const GARIS_PASANG = pasangGaris("pr", PB.map((p) => p.x), BARIS_ATAS, BARIS_BAWAH, 8);

/* ------------------------------ 1. Halim dan Kira membuat donat ------------------------------ */
const SUARA_D1 = "Hari Minggu yang cerah. Halim dan Kira membuat donat di dapur. Igil, si burung hantu, melihat dari jendela.";
const SUARA_D2 = "Halim menghias tujuh donat. Kira menghias enam donat. Donat mereka ditaruh dalam dua baris, supaya mudah dilihat.";
const SUARA_D3 = "Siapa yang punya donat lebih banyak? Kita hitung dulu donat Halim. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_D4 = "Sekarang donat Kira. Satu, dua, tiga, empat, lima, enam. Jadi donat Kira ada enam.";
const SUARA_D5 = "Donat Halim ada tujuh, donat Kira ada enam. Sekarang kita bandingkan banyak keduanya.";

export const ADEGAN_DONAT: AdeganStory = {
  id: "membuat-donat",
  judul: "Halim dan Kira membuat donat",
  sumber: "Materi: cerita membuat donat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Membuat donat")),
      tambah("Halim", emo("a-Halim", 60, 70, ANAK_EMO, 30), teks("n-Halim", 60, 90, "Halim", 8.6)),
      tambah("Kira", emo("a-Kira", 150, 70, ANAK_EMO, 30), teks("n-Kira", 150, 90, "Kira", 8.6)),
      tambah("Igil,", emo("a-Igil", 240, 70, OWL, 30), teks("n-Igil", 240, 90, "Igil", 8.6, W.ungu)),
      tambah("donat", emo("dn", 150, 152, "\u{1F369}", 40)),
    ),
    k(
      SUARA_D2,
      hapus(0, "a-Halim", "n-Halim", "a-Kira", "n-Kira", "a-Igil", "n-Igil", "dn"),
      tambah("Halim", nama("rn-a", BARIS_ATAS, "Halim")),
      tambah("tujuh", ...deret("donat", "d", PA, 8)),
      tambah("Kira", nama("rn-b", BARIS_BAWAH, "Kira")),
      tambah("enam", ...deret("donat", "e", PB, 8)),
    ),
    k(SUARA_D3, ...hitungAksi(SUARA_D3, "d", PA, { setelah: "Halim.", turun: 22 })),
    k(SUARA_D4, ...hitungAksi(SUARA_D4, "e", PB, { setelah: "Kira.", turun: 22, tanganAda: true, naik: 14 })),
    k(
      SUARA_D5,
      hapus(0, "tg"),
      tambah("Donat", ...kartu("ca", 14, 164, 132, 28, W.pink, ["donat Halim: 7"], 9.4)),
      tambah("Kira", ...kartu("cb", 154, 164, 132, 28, W.langit, ["donat Kira: 6"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Pasangkan satu-satu ------------------------------ */
const SUARA_P1 = "Untuk membandingkan, kita pasangkan donat satu per satu. Satu donat Halim dengan satu donat Kira.";
const SUARA_P2 = "Donat pertama Halim berpasangan dengan donat pertama Kira. Kita hubungkan keduanya dengan garis.";
const SUARA_P3 = "Lanjut. Donat kedua dengan donat kedua, sampai donat Kira habis dipasangkan. Enam pasang, semuanya tersambung.";
const SUARA_P4 = "Lihat donat Halim yang terakhir. Dia tidak punya pasangan. Tidak ada garis yang menyambungnya.";
const SUARA_P5 = "Donat yang tidak punya pasangan itulah lebihnya. Donat Halim lebihnya satu.";
const SUARA_P6 = "Jadi donat Halim lebih banyak dari donat Kira. Tujuh lebih dari enam.";
const SUARA_P7 = "Dan donat Kira lebih sedikit dari donat Halim. Enam kurang dari tujuh. Donat Kira satu kurangnya.";

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan-satu",
  judul: "Memasangkan donat satu per satu",
  sumber: "Materi: pasangkan satu-satu",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pasangkan satu-satu"), nama("rn-a", BARIS_ATAS, "Halim"), nama("rn-b", BARIS_BAWAH, "Kira"), ...deret("donat", "d", PA, 8), ...deret("donat", "e", PB, 8))),
    k(SUARA_P2, tambah("hubungkan", GARIS_PASANG[0]), sorotkan("pertama", "d0", "e0")),
    k(
      SUARA_P3,
      redamkan(0, "d0", "e0"),
      tambah("kedua", GARIS_PASANG[1]),
      tambah("habis", ...GARIS_PASANG.slice(2)),
      tambah("Enam", teks("ep", 262, 100, "6 pasang", 9.2, W.hijau)),
    ),
    k(SUARA_P4, hapus(0, "ep"), sorotkan("terakhir", "d6"), tambah("pasangan.", emo("tn", 262, 96, "❓", 22)), tambah("Tidak", teks("tp", 150, 40, "tidak punya pasangan", 9.2, W.merah))),
    k(SUARA_P5, hapus(0, "tn", "tp"), tambah("lebihnya", ...kartu("lb", 50, 158, 200, 28, W.emas, ["lebihnya: 1 donat"], 10))),
    k(SUARA_P6, hapus(0, "lb-k", "lb-t0"), tambah("lebih", ...kartu("jb", 14, 158, 132, 28, W.hijauMuda, ["7 lebih dari 6"], 9.6))),
    k(SUARA_P7, tambah("kurang", ...kartu("jk", 154, 158, 132, 28, W.merahMuda, ["6 kurang dari 7"], 9.6)), tambah("Donat@2", emo("ow", 150, 40, OWL, 26))),
  ],
};

/* ------------------------------ 3. Kata pembanding ------------------------------ */
const SUARA_K1 = "Sekarang kita belajar kata yang dipakai untuk membandingkan. Ada kata lebih dari, kurang dari, lebihnya, dan kurangnya.";
const SUARA_K2 = "Kata lebih dari dipakai untuk benda yang banyaknya lebih besar. Tujuh donat lebih dari enam donat.";
const SUARA_K3 = "Kata kurang dari dipakai untuk benda yang banyaknya lebih kecil. Enam donat kurang dari tujuh donat.";
const SUARA_K4 = "Lebihnya adalah benda yang tidak punya pasangan, pada barisan yang lebih banyak. Lebihnya donat Halim satu.";
const SUARA_K5 = "Kurangnya adalah benda yang masih dibutuhkan, supaya dua barisan sama banyak. Donat Kira satu kurangnya.";
const SUARA_K6 = "Perhatikan, lebihnya dan kurangnya selalu sama besar. Di sini keduanya satu.";
const KOTAK_KATA = [
  { id: "wa", x: 10, y: 32, warna: W.hijauMuda, kata: "lebih dari" },
  { id: "wb", x: 154, y: 32, warna: W.merahMuda, kata: "kurang dari" },
  { id: "wc", x: 10, y: 96, warna: W.krem, kata: "lebihnya" },
  { id: "wd", x: 154, y: 96, warna: W.langit, kata: "kurangnya" },
];
const kataKartu = (i: number): Obj[] => {
  const c = KOTAK_KATA[i];
  return [kotak(`${c.id}-k`, c.x, c.y, 136, 56, c.warna, W.biru, { rx: 8 }), teks(`${c.id}-t`, c.x + 68, c.y + 22, c.kata, 11, W.ungu)];
};
const contoh = (i: number, isi: string): Obj => teks(`${KOTAK_KATA[i].id}-e`, KOTAK_KATA[i].x + 68, KOTAK_KATA[i].y + 44, isi, 9.4, W.biru);

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-pembanding",
  judul: "Kata untuk membandingkan",
  sumber: "Materi: kata pembanding",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kata pembanding")),
      tambah(idx(SUARA_K1, "lebih"), ...kataKartu(0)),
      tambah(idx(SUARA_K1, "kurang"), ...kataKartu(1)),
      tambah("lebihnya,", ...kataKartu(2)),
      tambah("kurangnya.", ...kataKartu(3)),
    ),
    k(SUARA_K2, sorotkan(0, "wa-k"), tambah("Tujuh", contoh(0, "7 lebih dari 6"))),
    k(SUARA_K3, redamkan(0, "wa-k"), sorotkan(0, "wb-k"), tambah("Enam", contoh(1, "6 kurang dari 7"))),
    k(SUARA_K4, redamkan(0, "wb-k"), sorotkan(0, "wc-k"), tambah("Lebihnya@2", contoh(2, "lebihnya: 1"))),
    k(SUARA_K5, redamkan(0, "wc-k"), sorotkan(0, "wd-k"), tambah("Donat", contoh(3, "kurangnya: 1"))),
    k(SUARA_K6, redamkan(0, "wd-k"), tambah("sama", ...kartu("ks", 40, 162, 220, 28, W.emas, ["lebihnya sama dengan kurangnya"], 9.4)), tambah("Perhatikan", emo("ow", 150, 150, OWL, 20))),
  ],
};

