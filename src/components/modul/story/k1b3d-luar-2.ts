import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, bulat, deretBilangan, emo, judul, kartu, kotak, teks, titikBingkai, type Titik } from "./k1b3d-gambar";
import { bersih, coretAksi, hapus, hitungMuncul, k, langkahDeret, redamkan, sorotkan, tambah } from "./k1b3d-bantu";
import { NAMA_METODE_ID, RINGKAS_METODE, WARNA_METODE, kepala } from "./k1b3d-luar-1";

const IGIL = "\u{1F989}";
const KATAK = "\u{1F438}";
const JERUK = "\u{1F34A}";
const x = (v: number): number => 33 + 26 * (v - 1);
const BX = 85;
const BY = 66;
const PETAK: Titik[] = Array.from({ length: 10 }, (_, i) => titikBingkai(BX, BY, i));
const merah = (id: string, i: number): Obj => bulat(id, PETAK[i].x, PETAK[i].y, 8.3, W.merah, W.merah, { tebal: 1 });

/* ------------------------------ 1. Hitung Mundur: konsep ------------------------------ */
const SUARA_M1 = "Metode kedua, Hitung Mundur. Mulai dari bilangan awal, lalu mundur.";
const SUARA_M2 = "Misalnya sembilan dikurangi tiga. Kita mulai dari bilangan sembilan.";
const SUARA_M3 = "Lalu mundur tiga langkah: delapan, tujuh, enam. Kita berhenti di enam.";
const SUARA_M4 = "Jadi sembilan dikurangi tiga sama dengan enam. Cara ini cepat kalau yang pergi hanya sedikit.";

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Hitung Mundur: mulai dari bilangan awal",
  sumber: "Metode luar: Hitung Mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah("kedua,", ...kepala(1)), tambah("Mulai", emo("mj", 100, 100, KATAK, 46)), tambah("mundur.", emo("pm", 190, 100, "⬅️", 46))),
    k(SUARA_M2, hapus(0, "mj", "pm"), tambah(0, ...deretBilangan("mu", 90)), tambah("sembilan.", emo("up", x(9), 86, KATAK, 22)), sorotkan("sembilan.", "muk9"), tambah("Misalnya", ...kartu("mq", 60, 56, 180, 24, W.krem, ["9 − 3 = ?"], 11))),
    k(SUARA_M3, ...langkahDeret(SUARA_M3, [8, 7, 6], "mu", 90, "langkah:"), tambah("mundur", ...kartu("ml", 40, 136, 220, 26, W.langit, ["mundur 3 langkah dari 9"], 10))),
    k(SUARA_M4, redamkan(0, "muk6"), sorotkan(0, "muk6"), tambah("sama", ...kartu("mh", 60, 170, 180, 26, W.emas, ["9 − 3 = 6"], 12)), tambah("Jadi", emo("ok", 262, 56, "✅", 26))),
  ],
};

/* ------------------------------ 2. Hitung Mundur: terapan ------------------------------ */
const SUARA_N1 = "Soal cerita: Kira punya tujuh kue. Kira memberikan empat kue kepada Wei. Berapa sisa kue Kira?";
const SUARA_N2 = "Mulai dari tujuh. Mundur empat langkah: enam, lima, empat, tiga.";
const SUARA_N3 = "Kita berhenti di tiga. Tujuh dikurangi empat sama dengan tiga.";
const SUARA_N4 = "Jawabannya, sisa kue Kira ada tiga. Dengan mundur, kita tidak perlu menghitung semuanya dari awal.";

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Hitung Mundur: kue Kira",
  sumber: "Metode luar: Hitung Mundur, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, ...kepala(1), ...deretBilangan("nu", 100)),
      tambah("Soal", ...kartu("nq", 30, 56, 240, 24, W.krem, ["Kira: 7 kue, memberi 4 kue"], 10)),
      tambah("tujuh", emo("up", x(7), 96, KATAK, 22)),
      sorotkan("tujuh", "nuk7"),
    ),
    k(SUARA_N2, ...langkahDeret(SUARA_N2, [6, 5, 4, 3], "nu", 100, "langkah:"), tambah("empat", ...kartu("nl", 40, 140, 220, 24, W.langit, ["mundur 4 langkah dari 7"], 10))),
    k(SUARA_N3, tambah("Tujuh", ...kartu("nh", 70, 170, 160, 26, W.emas, ["7 − 4 = 3"], 12))),
    k(SUARA_N4, hapus(0, "nh-k", "nh-t0"), tambah("kue", ...kartu("nj", 20, 170, 220, 26, W.hijauMuda, ["Sisa kue Kira ada 3."], 10.4)), tambah("Jawabannya,", emo("ok", 262, 184, "✅", 28))),
  ],
};

/* ------------------------------ 3. Kurang di Bingkai: konsep ------------------------------ */
const SUARA_G1 = "Metode ketiga, Kurang di Bingkai. Bingkai sepuluh punya sepuluh petak.";
const SUARA_G2 = "Ketuk petak untuk mengisi titik merah: satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_G3 = "Sekarang kosongkan tiga titik: satu, dua, tiga. Titik yang dikosongkan pergi.";
const SUARA_G4 = "Delapan dikurangi tiga sama dengan lima. Tinggal lima titik di bingkai.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Kurang di Bingkai: kosongkan titik di bingkai",
  sumber: "Metode luar: Kurang di Bingkai",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah("ketiga,", ...kepala(2)), tambah("Bingkai", ...bingkai("bf", BX, BY, 0)), tambah("sepuluh@2", teks("tp", 150, 148, "10 petak", 12, W.merah))),
    k(SUARA_G2, ...hitungMuncul(SUARA_G2, "bt", PETAK.slice(0, 8), (i) => merah(`bm${i}`, i), "merah:", false)),
    k(SUARA_G3, ...coretAksi(SUARA_G3, "bm", PETAK, [5, 6, 7], "tiga"), tambah("Sekarang", ...kartu("gk", 80, 160, 140, 24, W.merahMuda, ["3 titik dikosongkan"], 10))),
    k(SUARA_G4, hapus(0, "gk-k", "gk-t0"), tambah("Delapan", ...kartu("gj", 80, 156, 140, 26, W.emas, ["8 − 3 = 5"], 13)), sorotkan("Tinggal", "bf-c0", "bf-c4")),
  ],
};

/* ------------------------------ 4. Kurang di Bingkai: terapan ------------------------------ */
const SUARA_H1 = "Soal cerita: ada sepuluh jeruk. Empat jeruk dimakan. Sisa jeruk ada berapa? Kita isi bingkai sepuluh.";
const SUARA_H2 = "Ketuk petak untuk sepuluh jeruk: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_H3 = "Kosongkan empat titik untuk empat jeruk yang dimakan: satu, dua, tiga, empat.";
const SUARA_H4 = "Sepuluh dikurangi empat sama dengan enam. Sisa jeruk ada enam.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Kurang di Bingkai: jeruk",
  sumber: "Metode luar: Kurang di Bingkai, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(2), ...bingkai("bf", BX, BY, 0)), tambah("sepuluh", emo("je", 100, 168, JERUK, 26), teks("jn", 100, 190, "10 jeruk", 8.6)), tambah("dimakan.", teks("jd", 200, 190, "4 dimakan", 8.6, W.merah), emo("jx", 200, 168, "❌", 22))),
    k(SUARA_H2, ...hitungMuncul(SUARA_H2, "bt", PETAK, (i) => merah(`bm${i}`, i), "jeruk:", false)),
    k(SUARA_H3, ...coretAksi(SUARA_H3, "bm", PETAK, [6, 7, 8, 9], "dimakan:")),
    k(SUARA_H4, sorotkan("dikurangi", "bf-c0", "bf-c5"), tambah("Sepuluh", ...kartu("bj", 80, 134, 140, 26, W.emas, ["10 − 4 = 6"], 13)), tambah("Sisa", emo("ok", 262, 100, "✅", 26))),
  ],
};

/* ------------------------------ 5. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Mengambil: ambil sebagian dari kumpulan. Hitung Mundur: mundur dari bilangan awal.";
const SUARA_R3 = "Kurang di Bingkai: kosongkan kotak pada bingkai, lalu lihat sisanya.";
const SUARA_R4 = "Ketiganya membantu kita mengerjakan soal cerita pengurangan sampai sepuluh. Terima kasih sudah belajar.";
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, NAMA_METODE_ID[i], 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, RINGKAS_METODE[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Mengambil:", "rm0-k"), tambah("ambil@2", deskripsi(0)), redamkan("Hitung", "rm0-k"), sorotkan("Hitung", "rm1-k"), tambah("mundur@2", deskripsi(1))),
    k(SUARA_R3, redamkan(0, "rm1-k"), sorotkan("Kurang", "rm2-k"), tambah("kosongkan", deskripsi(2))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)),
      tambah("sampai", ...kartu("rz", 60, 124, 180, 34, W.emas, ["pengurangan sampai 10"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
