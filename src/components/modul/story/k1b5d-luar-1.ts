import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WI, akuariumIsi, barisIkan, emo, garisPasang, idIkan, judul, kartu, orang, teks } from "./k1b5d-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5d-bantu";

/* Video metode global Sub-Bab D "Lapak Ikan Dibuka": pembuka dan One-to-One Matching (Pasangkan Satu-Satu). */

export const NAMA_METODE = ["One-to-One Matching", "Cube Towers", "Number Line Order"];
export const NAMA_METODE_ID = ["Pasangkan Satu-Satu", "Menara Kubus", "Urut di Garis Bilangan"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Dua baris ikan berpasangan: baris atas `${a}` (n1 ikan) di y=84 dan baris bawah `${b}` (n2 ikan) di y=128, jarak dx, mulai x0. */
const duaBaris = (n1: number, n2: number, x0: number, dx: number, wa: string, wb: string, s = 0.6): Obj[] => [
  ...barisIkan("a", n1, x0, 84, dx, wa, s),
  ...barisIkan("b", n2, x0, 128, dx, wb, s),
];

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Tetangga membawa selembar kertas lomba dengan tiga cara membandingkan isi akuarium. Abang bertanya, mana yang paling pas untuk lapakku?";
const SUARA_O2 = "Tiga metode itu: One-to-One Matching, Cube Towers, dan Number Line Order.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pasangkan Satu-Satu, Menara Kubus, dan Urut di Garis Bilangan.";
const SUARA_O4 = "Semua metode membantu kita menentukan mana yang lebih banyak dan mana yang lebih sedikit.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk membandingkan isi akuarium",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara membandingkan")),
      tambah("Tetangga", ...orang("tg", 36, 100, E.warga, "Tetangga")),
      tambah("kertas", emo("kr", 90, 100, E.kertas, 30)),
      tambah("tiga", ...kartu("pk", 124, 78, 160, 32, W.emas, ["3 cara membandingkan"], 10)),
      tambah("akuarium.", ...akuariumIsi("aq", 100, 128, 100, 44, 10, WI.guppy)),
      tambah("Abang", ...orang("ab", 258, 166, E.abang, "Abang")),
      tambah("lapakku?", emo("lp", 40, 168, E.lapak, 28)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O2, ["One-to-One", "Cube", "Number"][i]), ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Pasangkan", "Menara", "Urut"][i]), ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Mana yang lebih banyak?")),
      tambah("metode", ...akuariumIsi("sa", 24, 56, 112, 48, 15, WI.guppy), ...akuariumIsi("sb", 164, 56, 112, 48, 12, WI.koki)),
      tambah("banyak", ...kartu("sk", 36, 122, 88, 24, W.hijauMuda, ["lebih banyak"], 10), emo("mk", 80, 52, E.mahkota, 16)),
      tambah("sedikit.", ...kartu("ss", 176, 122, 88, 24, W.lavender, ["lebih sedikit"], 10)),
    ),
  ],
};

/* ------------------------------ 2. One-to-One Matching: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, One-to-One Matching, atau Pasangkan Satu-Satu. Dua kumpulan benda dipasangkan, satu dengan satu.";
const SUARA_A2 = "Benda yang punya pasangan sama banyak. Benda yang tersisa tanpa pasangan menunjukkan kumpulan yang lebih banyak.";
const SUARA_A3 = "Kumpulan yang habis lebih dulu adalah yang lebih sedikit.";
const SUARA_A4 = "Bila semuanya berpasangan, kedua kumpulan sama banyak.";

export const ADEGAN_LUAR_PASANG: AdeganStory = {
  id: "luar-pasang",
  judul: "One-to-One Matching: pasangkan satu-satu",
  sumber: "Metode global: One-to-One Matching",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Dua", teks("kp", 150, 66, "2 kumpulan", 10, W.ungu), ...duaBaris(4, 4, 76, 32, WI.guppy, WI.koki)),
      tambah("dipasangkan,", ...garisPasang("pg", 4, 76, 32, 91, 121)),
      tambah(idx(SUARA_A1, "satu"), teks("ps", 150, 160, "1 dengan 1", 10, W.merah)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, ...kepala(0), ...duaBaris(6, 4, 52, 34, WI.guppy, WI.koki), ...garisPasang("pg", 4, 52, 34, 91, 121)),
      tambah("banyak.", teks("sm", 150, 66, "punya pasangan: sama banyak", 9, W.hijau)),
      sorotkan("tersisa", ...idIkan("a", 4, 5)),
      tambah("banyak.@2", teks("sl", 150, 160, "sisa: lebih banyak", 10, W.merah)),
    ),
    k(
      SUARA_A3,
      hapus(0, "sm", "sl"),
      tambah("habis", teks("hd2", 150, 66, "habis lebih dulu", 10, W.ungu)),
      sorotkan("habis", ...idIkan("b", 0, 3)),
      tambah("sedikit.", ...kartu("sd", 70, 152, 160, 24, W.lavender, ["koki: lebih sedikit"], 10)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, ...kepala(0), ...duaBaris(5, 5, 60, 40, WI.cupang, WI.koki), ...garisPasang("pg", 5, 60, 40, 91, 121)),
      sorotkan("berpasangan,", "pg0", "pg1", "pg2", "pg3", "pg4"),
      tambah("sama", ...kartu("sb", 80, 152, 140, 24, W.hijauMuda, ["sama banyak"], 12), emo("ok", 262, 106, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 3. One-to-One Matching: terapan pada pesanan ------------------------------ */
const SUARA_B1 = "Abang memasangkan guppy lima belas dengan neon dua puluh.";
const SUARA_B2 = "Guppy habis lebih dulu, lima neon tanpa pasangan. Jadi neon lebih banyak.";
const SUARA_B3 = "Cupang dua belas dan koki dua belas berpasangan semua. Sama banyak.";
const SUARA_B4 = "Cara ini jelas dan tanpa menghitung, tetapi lama bila bendanya sangat banyak.";
const [B1_15, B1_20] = urutBilangan(SUARA_B1, [15, 20]);
const [B3_12a, B3_12b] = urutBilangan(SUARA_B3, [12, 12]);

export const ADEGAN_LUAR_PASANG_TERAPAN: AdeganStory = {
  id: "luar-pasang-terapan",
  judul: "One-to-One Matching: guppy, neon, cupang, koki",
  sumber: "Metode global: One-to-One Matching, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Abang", ...orang("ab", 262, 178, E.abang, "Abang")),
      tambah(B1_15, ...barisIkan("g", 15, 16, 84, 13.5, WI.guppy, 0.42), teks("lg", 16, 68, "guppy: 15", 9.4, W.biru, { anchor: "start" })),
      tambah(B1_20, ...barisIkan("n", 20, 16, 128, 13.5, WI.neon, 0.42), teks("ln", 16, 150, "neon: 20", 9.4, W.biru, { anchor: "start" })),
      tambah("puluh.", ...garisPasang("pg", 15, 16, 13.5, 90, 122)),
    ),
    k(
      SUARA_B2,
      sorotkan("lima", ...idIkan("n", 15, 19)),
      tambah("tanpa", teks("sa", 246, 150, "sisa 5", 9.4, W.merah)),
      ubah("banyak.", { id: "ln", isi: "neon: 20, lebih banyak", warna: W.hijau }),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah(B3_12a, ...barisIkan("c", 12, 18, 84, 18, WI.cupang, 0.55), teks("lc", 18, 68, "cupang: 12", 9.4, W.biru, { anchor: "start" })),
      tambah(B3_12b, ...barisIkan("o", 12, 18, 128, 18, WI.koki, 0.55), teks("lo", 18, 150, "koki: 12", 9.4, W.biru, { anchor: "start" })),
      tambah("berpasangan", ...garisPasang("pg", 12, 18, 18, 90, 122)),
      tambah("Sama", ...kartu("sb", 80, 160, 140, 24, W.hijauMuda, ["sama banyak"], 12)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("jelas", ...kartu("jl", 40, 60, 220, 32, W.hijauMuda, ["jelas, tanpa menghitung"], 10.5), emo("ok", 276, 82, E.benar, 18)),
      tambah("lama", ...kartu("lm", 40, 108, 220, 32, W.merahMuda, ["lama bila sangat banyak"], 10.5), emo("jm", 276, 130, E.jam, 18)),
    ),
  ],
};
