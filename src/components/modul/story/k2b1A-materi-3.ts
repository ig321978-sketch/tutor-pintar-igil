import type { AdeganStory, Obj } from "./logika-story";
import { EMO_APEL, OWL, W, angkaKotak, bendaDi, emo, jalur, jumlahG, judul, kartu, kotakSepuluh, letakKotak, namaG, panah, teks, titikGrid, titikKotak } from "./k2b1A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotJalur, sorotkan, tambah, ubah } from "./k2b1A-bantu";

const YJ = 80;
const panahJalur = (id: string, dari: number, ke: number, isi: string): Obj[] => {
  const cx = (i: number) => 7 + 26 * i + 13;
  return [panah(`${id}a`, cx(dari), YJ - 8, cx(ke) - cx(dari), 0, W.merah, 2.2), teks(`${id}l`, (cx(dari) + cx(ke)) / 2, YJ - 18, isi, 10, W.merah)];
};

/* ------------------------------ 9. Menghitung maju ------------------------------ */
const SUARA_M1 = "Kita juga bisa menghitung maju. Menghitung maju berarti bilangannya makin besar. Lihat jalur bilangan ini.";
const SUARA_M2 = "Mulai dari dua puluh. Lalu maju: dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima.";
const SUARA_M3 = "Terus maju: dua puluh enam, dua puluh tujuh, dua puluh delapan, dua puluh sembilan, tiga puluh. Kita sampai di tiga puluh.";
const SUARA_M4 = "Setiap langkah maju, bilangannya bertambah satu. Dari dua puluh ke dua puluh satu, bilangannya lebih besar satu.";
const JALUR_20_30 = Array.from({ length: 11 }, (_, i) => 20 + i);

export const ADEGAN_MAJU: AdeganStory = {
  id: "menghitung-maju",
  judul: "Menghitung maju",
  sumber: "Materi: menghitung maju",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Menghitung maju")), tambah(idx(SUARA_M1, "jalur"), ...jalur(JALUR_20_30, YJ), emo("mg", 262, 160, "➡️", 30))),
    k(SUARA_M2, ...sorotJalur(SUARA_M2, 20, [20, 21, 22, 23, 24, 25], "dari")),
    k(SUARA_M3, redamkan(0, "nl5-k"), ...sorotJalur(SUARA_M3, 20, [26, 27, 28, 29, 30])),
    k(SUARA_M4, redamkan(0, "nl10-k"), ...sorotJalur(SUARA_M4, 20, [20, 21], "Dari"), tambah(idx(SUARA_M4, "ke"), ...panahJalur("ma", 0, 1, "+1"))),
  ],
};

/* ------------------------------ 10. Menghitung mundur ------------------------------ */
const SUARA_N1 = "Sekarang kita menghitung mundur. Menghitung mundur berarti bilangannya makin kecil. Lihat jalur bilangan ini.";
const SUARA_N2 = "Mulai dari tiga puluh. Lalu mundur: dua puluh sembilan, dua puluh delapan, dua puluh tujuh, dua puluh enam, dua puluh lima.";
const SUARA_N3 = "Terus mundur: dua puluh empat, dua puluh tiga, dua puluh dua, dua puluh satu, dua puluh. Kita sampai di dua puluh.";
const SUARA_N4 = "Setiap langkah mundur, bilangannya berkurang satu. Dari tiga puluh ke dua puluh sembilan, bilangannya lebih kecil satu.";

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "menghitung-mundur",
  judul: "Menghitung mundur",
  sumber: "Materi: menghitung mundur",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Menghitung mundur")), tambah(idx(SUARA_N1, "jalur"), ...jalur(JALUR_20_30, YJ), emo("mg", 38, 160, "⬅️", 30))),
    k(SUARA_N2, ...sorotJalur(SUARA_N2, 20, [30, 29, 28, 27, 26, 25], "dari")),
    k(SUARA_N3, redamkan(0, "nl5-k"), ...sorotJalur(SUARA_N3, 20, [24, 23, 22, 21, 20])),
    k(SUARA_N4, redamkan(0, "nl0-k"), ...sorotJalur(SUARA_N4, 20, [30, 29], "Dari"), tambah(idx(SUARA_N4, "ke"), ...panahJalur("mb", 10, 9, "-1"))),
  ],
};

/* ------------------------------ 11. Sebelum dan sesudah ------------------------------ */
const SUARA_E1 = "Setiap bilangan punya tetangga di jalur bilangan. Ada bilangan sebelumnya dan bilangan sesudahnya.";
const SUARA_E2 = "Perhatikan empat puluh. Sesudah empat puluh datang empat puluh satu. Sebelum empat puluh ada tiga puluh sembilan.";
const SUARA_E3 = "Sekarang kita melengkapi urutan. Ada satu petak yang disembunyikan, ditandai tanda tanya. Bilangan apa yang cocok?";
const SUARA_E4 = "Sebelum tanda tanya ada empat puluh satu. Sesudahnya ada empat puluh tiga. Jadi bilangannya empat puluh dua.";
const YE = 70;

export const ADEGAN_SEBELUM_SESUDAH: AdeganStory = {
  id: "sebelum-sesudah",
  judul: "Sebelum dan sesudah",
  sumber: "Materi: sebelum dan sesudah",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Sebelum dan sesudah")), tambah(idx(SUARA_E1, "jalur"), ...jalur([39, 40, 41, 42, 43], YE, 44))),
    k(
      SUARA_E2,
      ...sorotJalur(SUARA_E2, 39, [40, 41, 39]),
      tambah(idx(SUARA_E2, "Sesudah"), teks("lsd", 150, 116, "sesudah", 9.6, W.ungu)),
      tambah(idx(SUARA_E2, "Sebelum"), teks("lsb", 62, 116, "sebelum", 9.6, W.ungu)),
    ),
    k(SUARA_E3, redamkan(0, "nl0-k"), hapus(0, "lsd", "lsb"), ubah(idx(SUARA_E3, "ditandai"), { id: "nl3", isi: "?" }), sorotkan(idx(SUARA_E3, "tanda"), "nl3-k")),
    k(
      SUARA_E4,
      redamkan(0, "nl3-k"),
      sorotkan(idx(SUARA_E4, "empat", 1), "nl2-k"),
      redamkan(idx(SUARA_E4, "Sesudahnya"), "nl2-k"),
      sorotkan(idx(SUARA_E4, "empat", 2), "nl4-k"),
      redamkan(idx(SUARA_E4, "Jadi"), "nl4-k"),
      ubah(idx(SUARA_E4, "empat", 3), { id: "nl3", isi: "42" }),
      sorotkan(idx(SUARA_E4, "empat", 3), "nl3-k"),
      tambah(idx(SUARA_E4, "dua."), emo("ow", 150, 156, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 12. Tebak dan buktikan ------------------------------ */
const N_APEL = 34;
const longgar = () => titikGrid(N_APEL, 30, 66, 30, 26, 9);
const Y_T = 50;
const SUARA_G1 = "Sekarang kita belajar menebak. Menebak berarti memperkirakan banyaknya benda sebelum menghitung.";
const SUARA_G2 = "Lihat apel di keranjang Wei ini. Kira-kira ada berapa apel? Ayo tebak dulu!";
const SUARA_G3 = "Wei menebak, apelnya sekitar tiga puluh. Tebakan ini boleh kurang tepat.";
const SUARA_G4 = "Sekarang kita buktikan dengan menghitung. Kita kelompokkan apelnya, setiap sepuluh dalam satu kotak.";
const SUARA_G5 = "Tiga kotak penuh, yaitu tiga puluh. Lalu masih tersisa empat apel. Jadi ada tiga puluh empat apel.";
const SUARA_G6 = "Tebakan Wei, tiga puluh, hampir tepat. Hasil menghitungnya tiga puluh empat. Menebak membantu, dan menghitung memastikan.";
const pindahApel = (at: string | number): { at: string | number; ubah: { id: string; x: number; y: number }[] } => ({
  at,
  ubah: Array.from({ length: N_APEL }, (_, i) => ({ id: `ea${i}`, x: titikKotak(i, Y_T).x, y: titikKotak(i, Y_T).y })),
});

export const ADEGAN_TEBAK: AdeganStory = {
  id: "tebak-buktikan",
  judul: "Tebak dulu, lalu buktikan",
  sumber: "Materi: menebak dan membuktikan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Menebak banyaknya")), tambah(idx(SUARA_G1, "memperkirakan"), emo("ts", 150, 120, "\u{1F914}", 50))),
    k(SUARA_G2, bersih(0), tambah(0, judul("Apel di keranjang")), tambah(idx(SUARA_G2, "keranjang"), namaG("a", 4, 46, "Apel"), ...bendaDi("a", EMO_APEL, longgar(), 15)), tambah(idx(SUARA_G2, "berapa"), emo("q", 276, 176, "❓", 26))),
    k(SUARA_G3, hapus(0, "q"), tambah(idx(SUARA_G3, "tiga"), ...kartu("tb", 70, 164, 160, 28, W.krem, ["tebakan: 30"], 11))),
    k(
      SUARA_G4,
      tambah(idx(SUARA_G4, "Kita", 2), ...[0, 1, 2, 3].flatMap((f) => kotakSepuluh("a", f, letakKotak(f, Y_T)))),
      { ...pindahApel(idx(SUARA_G4, "setiap")) },
      tambah(idx(SUARA_G4, "sepuluh"), angkaKotak("a", 0, "10", Y_T)),
      hapus(idx(SUARA_G4, "setiap"), "tb-k", "tb-t0"),
      tambah(idx(SUARA_G4, "setiap"), ...kartu("tc", 130, 104, 150, 28, W.krem, ["tebakan: 30"], 11)),
    ),
    k(SUARA_G5, tambah(idx(SUARA_G5, "puluh,"), angkaKotak("a", 2, "30", Y_T)), tambah(idx(SUARA_G5, "tersisa"), angkaKotak("a", 3, "34", Y_T)), tambah(idx(SUARA_G5, "Jadi"), jumlahG("a", 210, 166, "34", 20))),
    k(SUARA_G6, sorotkan(idx(SUARA_G6, "Tebakan"), "tc-k"), redamkan(idx(SUARA_G6, "Hasil"), "tc-k"), sorotkan(idx(SUARA_G6, "Hasil"), "ea-ln"), tambah(idx(SUARA_G6, "memastikan."), emo("ok", 262, 190, "✅", 20))),
  ],
};
