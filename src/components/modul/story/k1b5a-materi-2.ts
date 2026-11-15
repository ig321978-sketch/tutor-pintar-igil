import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, duaBingkai, emo, judul, kartu, kartuAngka, pusatDua, teks, titikDua, tulisAngka } from "./k1b5a-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b5a-bantu";

/* ------------------------------ 1. Sampai lima belas ------------------------------ */
const SUARA_L1 = "Halim terus menghitung kelereng di luar kotak. Kotak pertama sudah penuh, berisi sepuluh.";
const SUARA_L2 = "Sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_L3 = "Kotak berisi sepuluh, di luar kotak ada lima. Sepuluh ditambah lima menjadi lima belas.";
const SUARA_L4 = "Ternyata Halim punya lima belas kelereng. Kelereng di luar kotak masuk ke kotak kedua.";
const SUARA_L5 = "Perhatikan nama bilangannya. Setelah sebelas dan dua belas, nama bilangan memakai kata belas.";
const SUARA_L6 = "Belas artinya sepuluh dan beberapa lagi. Tiga belas itu sepuluh dan tiga. Lima belas itu sepuluh dan lima.";
const SUARA_L7 = "Ayo ucapkan lagi mengikuti suara guru. Sebelas, dua belas, tiga belas, empat belas, lima belas.";
const OL = Array.from({ length: 5 }, (_, i) => ({ x: 90 + i * 30, y: 136 }));
const nama15: [string, string, number][] = [["11", "sebelas", 14], ["12", "dua belas", 104], ["13", "tiga belas", 194]];
const pos7 = urutBilangan(SUARA_L7, 11, 15, "suara");

export const ADEGAN_LIMA_BELAS: AdeganStory = {
  id: "lima-belas",
  judul: "Sampai lima belas",
  sumber: "Materi: bilangan sampai lima belas",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kotak penuh dan sisanya"), ...duaBingkai("fb", 30)),
      tambah("kotak", ...titikDua("fb", 30, 10)),
      tambah("luar", ...OL.flatMap((p, i) => benda("kelereng", `o${i}`, p.x, p.y, 8, i))),
      tambah("penuh,", ...kartu("kp", 60, 92, 180, 20, W.krem, ["kotak penuh: 10"], 8.8)),
    ),
    k(SUARA_L2, hapus(0, "kp-k", "kp-t0"), ...hitungAksi(SUARA_L2, "o", OL, { dari: 11 })),
    k(
      SUARA_L3,
      hapus(0, "tg", ...OL.map((_, i) => `on${i}`)),
      tambah("Sepuluh@2", ...kartu("kj", 60, 92, 180, 24, W.langit, ["10 + 5 = 15"], 11)),
      sorotkan("lima.", ...OL.map((_, i) => `o${i}`)),
    ),
    k(
      SUARA_L4,
      hapus(0, "kj-k", "kj-t0"),
      ...OL.map((_, i) => ubah("masuk", { id: `o${i}`, x: pusatDua(10 + i, 30).x, y: pusatDua(10 + i, 30).y, sorot: false })),
      tambah("Ternyata", teks("b15", 150, 122, "15", 28, W.merah)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Nama bilangan memakai belas")),
      ...nama15.flatMap(([n, nm, x], i) => tambah(["sebelas", "dua", "belas."][i] === "belas." ? "kata" : ["sebelas", "dua"][i], ...kartuAngka(`nb${i}`, x, 50, n, W.krem, 92, 40, 20), teks(`nm${i}`, x + 46, 112, nm, 10, W.ungu))),
    ),
    k(
      SUARA_L6,
      bersih(0),
      tambah(0, judul("Belas: sepuluh dan sisanya")),
      tambah("Tiga", ...kartu("e1", 30, 44, 240, 36, W.hijauMuda, ["13 = 10 + 3"], 14)),
      tambah("Lima", ...kartu("e2", 30, 96, 240, 36, W.pink, ["15 = 10 + 5"], 14)),
      tambah("Belas", emo("ow", 150, 176, OWL, 34)),
    ),
    k(
      SUARA_L7,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("ucap", 150, 150, "\u{1F5E3}", 34)),
      ...pos7.map((p, i) => tambah(p, ...kartuAngka(`uc${i}`, 14 + i * 56, 60, String(11 + i), [W.krem, W.langit, W.hijauMuda, W.pink, W.lavender][i], 46, 40, 20))),
    ),
  ],
};

/* ------------------------------ 2. Membaca nama bilangan 11 sampai 20 ------------------------------ */
const SUARA_B1 = "Sekarang kita belajar membaca bilangan sebelas sampai dua puluh. Ada dua baris bilangan di papan Igil. Kita baca satu per satu.";
const SUARA_B2 = "Ketuk yang pertama. Bilangan ini dibaca sebelas. Lambangnya angka satu dan angka satu.";
const SUARA_B3 = "Berikutnya, dua belas. Lambangnya angka satu, lalu angka dua.";
const SUARA_B4 = "Tiga belas, empat belas, dan lima belas. Semuanya dimulai dengan angka satu.";
const SUARA_B5 = "Enam belas, tujuh belas, delapan belas, dan sembilan belas. Semuanya juga dimulai dengan angka satu.";
const SUARA_B6 = "Yang terakhir dua puluh. Lambangnya angka dua dan angka nol. Dua puluh adalah bilangan terbesar di sini.";
const SUARA_B7 = "Lihat tiga belas. Angka di kiri menunjukkan banyak sepuluh. Angka di kanan menunjukkan sisanya.";
const warnaB = [W.krem, W.langit, W.hijauMuda, W.pink, W.lavender];
const kartuBil = (n: number): Obj[] => kartuAngka(`bk${n}`, 14 + ((n - 11) % 5) * 56, n < 16 ? 32 : 72, String(n), warnaB[(n - 11) % 5], 44, 30, 16);
const NM = (isi: string): Obj => teks("nm", 150, 130, isi, 17, W.ungu);
const LB = (isi: string): Obj => teks("lb", 150, 154, isi, 9.4, W.merah);

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-nama",
  judul: "Membaca bilangan sebelas sampai dua puluh",
  sumber: "Materi: membaca nama bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Papan bilangan Igil")), tambah("papan", ...Array.from({ length: 10 }, (_, i) => kartuBil(11 + i)).flat()), tambah("Kita", emo("ig", 262, 172, OWL, 30))),
    k(SUARA_B2, tambah("pertama.", NM("sebelas")), sorotkan("pertama.", "bk11-k"), tambah("Lambangnya", LB("angka 1 dan angka 1"))),
    k(SUARA_B3, redamkan(0, "bk11-k"), sorotkan("dua", "bk12-k"), ubah("dua", { id: "nm", isi: "dua belas" }, { id: "lb", isi: "angka 1, lalu angka 2" })),
    k(
      SUARA_B4,
      redamkan(0, "bk12-k"),
      sorotkan("Tiga", "bk13-k"),
      ubah("Tiga", { id: "nm", isi: "tiga belas" }, { id: "lb", isi: "angka 1, lalu angka 3" }),
      sorotkan(idx(SUARA_B4, "empat"), "bk14-k"),
      ubah(idx(SUARA_B4, "empat"), { id: "nm", isi: "empat belas" }, { id: "lb", isi: "angka 1, lalu angka 4" }),
      sorotkan(idx(SUARA_B4, "lima"), "bk15-k"),
      ubah(idx(SUARA_B4, "lima"), { id: "nm", isi: "lima belas" }, { id: "lb", isi: "angka 1, lalu angka 5" }),
    ),
    k(
      SUARA_B5,
      redamkan(0, "bk13-k", "bk14-k", "bk15-k"),
      sorotkan("Enam", "bk16-k"),
      ubah("Enam", { id: "nm", isi: "enam belas" }, { id: "lb", isi: "angka 1, lalu angka 6" }),
      sorotkan(idx(SUARA_B5, "tujuh"), "bk17-k"),
      ubah(idx(SUARA_B5, "tujuh"), { id: "nm", isi: "tujuh belas" }, { id: "lb", isi: "angka 1, lalu angka 7" }),
      sorotkan(idx(SUARA_B5, "delapan"), "bk18-k"),
      ubah(idx(SUARA_B5, "delapan"), { id: "nm", isi: "delapan belas" }, { id: "lb", isi: "angka 1, lalu angka 8" }),
      sorotkan(idx(SUARA_B5, "sembilan"), "bk19-k"),
      ubah(idx(SUARA_B5, "sembilan"), { id: "nm", isi: "sembilan belas" }, { id: "lb", isi: "angka 1, lalu angka 9" }),
    ),
    k(
      SUARA_B6,
      redamkan(0, "bk16-k", "bk17-k", "bk18-k", "bk19-k"),
      sorotkan("terakhir", "bk20-k"),
      ubah("terakhir", { id: "nm", isi: "dua puluh" }, { id: "lb", isi: "angka 2 dan angka 0" }),
    ),
    k(
      SUARA_B7,
      bersih(0),
      tambah(0, judul("Angka kiri dan angka kanan")),
      tambah("Lihat", ...kartuAngka("pk", 70, 40, "1", W.hijauMuda, 64, 62, 38), ...kartuAngka("ps", 166, 40, "3", W.pink, 64, 62, 38)),
      tambah("kiri", teks("pk1", 102, 124, "10", 14, W.merah), teks("pk2", 102, 142, "banyak sepuluh", 8.6, W.biru)),
      tambah("kanan", teks("ps1", 198, 124, "3", 14, W.merah), teks("ps2", 198, 142, "sisanya", 8.6, W.biru)),
      tambah("tiga", teks("pt", 150, 182, "13 = 10 + 3", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Menulis angka ------------------------------ */
const SUARA_W1 = "Sekarang kita belajar menulis lambang bilangan. Lihat Igil menulis. Perhatikan geraknya, pelan-pelan dari atas.";
const SUARA_W2 = "Pertama angka satu, lalu angka dua. Jadi dua belas ditulis dengan angka satu dan angka dua.";
const SUARA_W3 = "Sekarang lima belas. Tulis angka satu lebih dulu, lalu angka lima.";
const SUARA_W4 = "Tujuh belas. Tulis angka satu, lalu angka tujuh. Jangan lupa, angka satu selalu di kiri.";
const SUARA_W5 = "Terakhir dua puluh. Tulis angka dua, lalu angka nol.";
const SUARA_W6 = "Ucapkan lagi mengikuti suara guru. Dua belas, lima belas, tujuh belas, dan dua puluh.";
const urut = (s: string, a: string[]) => a.map((x) => idx(s, x));

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-angka",
  judul: "Menulis lambang bilangan",
  sumber: "Materi: menulis lambang bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Igil menulis")), tambah("Igil", emo("ig", 56, 100, OWL, 40)), tambah("pelan-pelan", teks("pn", 150, 170, "dari atas, pelan-pelan", 10, W.ungu))),
    k(
      SUARA_W2,
      hapus(0, "pn"),
      tambah("Pertama", ...tulisAngka("w", 112, 40, "1", 1.6)),
      tambah("dua.", ...tulisAngka("w", 112, 40, "12", 1.6).slice(1)),
      tambah("Jadi", teks("wn", 170, 170, "dua belas = 12", 12, W.hijau)),
    ),
    k(
      SUARA_W3,
      hapus(0, "w0", "w1", "wn"),
      tambah("Sekarang", teks("wn", 170, 170, "lima belas = 15", 12, W.hijau)),
      tambah("satu", ...tulisAngka("w", 112, 40, "1", 1.6)),
      tambah("lima.", ...tulisAngka("w", 112, 40, "15", 1.6).slice(1)),
    ),
    k(
      SUARA_W4,
      hapus(0, "w0", "w1", "wn"),
      tambah("Tujuh", teks("wn", 170, 170, "tujuh belas = 17", 12, W.hijau)),
      tambah("satu,", ...tulisAngka("w", 112, 40, "1", 1.6)),
      tambah("tujuh.", ...tulisAngka("w", 112, 40, "17", 1.6).slice(1)),
      tambah("kiri.", teks("kr", 100, 130, "kiri", 9, W.merah)),
    ),
    k(
      SUARA_W5,
      hapus(0, "w0", "w1", "wn", "kr"),
      tambah("Terakhir", teks("wn", 170, 170, "dua puluh = 20", 12, W.hijau)),
      tambah("dua,", ...tulisAngka("w", 112, 40, "2", 1.6)),
      tambah("nol.", ...tulisAngka("w", 112, 40, "20", 1.6).slice(1)),
    ),
    k(
      SUARA_W6,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("ucap", 150, 150, "\u{1F5E3}", 32)),
      ...urut(SUARA_W6, ["Dua", "lima", "tujuh"]).map((p, i) => tambah(p, ...kartuAngka(`ul${i}`, 20 + i * 66, 50, ["12", "15", "17"][i], [W.krem, W.langit, W.hijauMuda][i], 56, 44, 22))),
      tambah("puluh.", ...kartuAngka("ul3", 218, 50, "20", W.pink, 56, 44, 22)),
    ),
  ],
};

/* ------------------------------ 4. Dua puluh: dua kotak penuh ------------------------------ */
const SUARA_D1 = "Bagaimana kalau kelerengnya lebih banyak? Kotak pertama penuh, dan kotak kedua sudah berisi lima. Ada lima belas kelereng.";
const SUARA_D2 = "Kita tambah satu per satu. Enam belas, tujuh belas, delapan belas, sembilan belas.";
const SUARA_D3 = "Kotak kedua tinggal satu petak yang kosong. Kalau kita isi, kotak kedua juga penuh.";
const SUARA_D4 = "Dua kotak penuh. Sepuluh ditambah sepuluh menjadi dua puluh. Ada dua puluh kelereng.";
const SUARA_D5 = "Dua puluh adalah bilangan terbesar yang kita pelajari di bab ini. Lambangnya angka dua dan angka nol.";
const SUARA_D6 = "Ayo hitung lagi dari sepuluh sampai dua puluh. Sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.";
const BIL = (isi: string, warna: string = W.merah): Obj => teks("bil", 150, 128, isi, 30, warna);
const pos2 = urutBilangan(SUARA_D2, 16, 19, "satu");
const pos6 = urutBilangan(SUARA_D6, 10, 20, "sepuluh");
const titikB = (i: number): Obj => titikDua("dd", 30, i + 1, i)[0];

export const ADEGAN_DUA_PULUH: AdeganStory = {
  id: "dua-puluh",
  judul: "Dua kotak penuh, dua puluh",
  sumber: "Materi: bilangan dua puluh",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Dua kotak sepuluh"), ...duaBingkai("dd", 30)), tambah("Kotak", ...titikDua("dd", 30, 15), BIL("15"))),
    k(SUARA_D2, ...pos2.map((p, i) => tambah(p, titikB(15 + i))), ...pos2.map((p, i) => ubah(p, { id: "bil", isi: String(16 + i) }))),
    k(SUARA_D3, sorotkan("tinggal", "ddb-c9"), ubah("kosong.", { id: "ddb-c9", warna: W.emas }), tambah("Kalau", emo("tn", 244, 108, "\u{1F446}", 22))),
    k(
      SUARA_D4,
      hapus(0, "tn"),
      tambah("dua@2", titikB(19)),
      ubah("Dua", { id: "ddb-c9", warna: W.putih }),
      ubah("dua@2", { id: "bil", isi: "20" }),
      tambah("Sepuluh", ...kartu("dj", 60, 154, 180, 28, W.langit, ["10 + 10 = 20"], 12)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Dua puluh"), ...tulisAngka("ts", 112, 50, "20", 1.6)),
      tambah("terbesar", ...kartu("tb", 40, 150, 220, 30, W.emas, ["bilangan terbesar di bab ini"], 9.6)),
      tambah("Lambangnya", teks("t20", 150, 134, "dua puluh: 20", 11, W.ungu)),
    ),
    k(
      SUARA_D6,
      bersih(0),
      tambah(0, judul("Hitung dari sepuluh"), ...duaBingkai("dd", 30), ...titikDua("dd", 30, 20)),
      tambah(0, BIL("10", W.hijau)),
      ...pos6.slice(1).map((p, i) => ubah(p, { id: "bil", isi: String(11 + i), warna: i === 9 ? W.merah : W.hijau })),
    ),
  ],
};
