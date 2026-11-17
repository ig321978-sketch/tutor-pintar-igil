import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WI, emo, garis, garisBil, geserMenara, ikan, judul, kartu, idMenara, menara, orang, penanda, puncak, teks } from "./k1b5d-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5d-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b5d-luar-1";

/* Video metode global Sub-Bab D: Cube Towers (Menara Kubus), Number Line Order (Urut di Garis Bilangan), dan ringkasan. */

const DASAR = 172;
const lantai = (id = "lt"): Obj => garis(id, 30, DASAR, 240, 0, W.coklat, 2);
const label = (id: string, x: number, isi: string, u = 10, warna: string = W.merah): Obj => teks(id, x, 186, isi, u, warna);

/* ------------------------------ 4. Cube Towers: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Cube Towers, atau Menara Kubus. Tiap kumpulan disusun menjadi menara kubus.";
const SUARA_C2 = "Satu kubus untuk satu benda. Menara yang lebih tinggi berarti lebih banyak.";
const SUARA_C3 = "Menara yang sama tinggi berarti sama banyak.";
const SUARA_C4 = "Menara disusun berdampingan, jadi mudah melihat mana yang tertinggi dan terendah.";

export const ADEGAN_LUAR_MENARA: AdeganStory = {
  id: "luar-menara",
  judul: "Cube Towers: menara kubus",
  sumber: "Metode global: Cube Towers",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("Tiap", lantai()),
      tambah("kumpulan", ...menara("ta", 110, DASAR, 5, WI.guppy)),
      tambah("disusun", ...menara("tb", 190, DASAR, 3, WI.koki)),
    ),
    k(
      SUARA_C2,
      tambah("Satu", ...kartu("sk", 60, 58, 180, 24, W.krem, ["1 kubus untuk 1 benda"], 10)),
      sorotkan("tinggi", ...idMenara("ta", 5)),
      tambah("banyak.", teks("lt1", 150, 112, "lebih tinggi: lebih banyak", 9.4, W.hijau)),
    ),
    k(
      SUARA_C3,
      tambah("sama", ...menara("tb", 190, DASAR, 5, WI.koki).slice(3)),
      ubah("sama", { id: "lt1", isi: "sama tinggi: sama banyak", warna: W.ungu }),
      sorotkan("sama", ...idMenara("tb", 5)),
      tambah("banyak.", emo("ok", 262, 150, E.benar, 20)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1), lantai()),
      tambah("berdampingan,", ...menara("ma", 70, DASAR, 12, WI.guppy), ...menara("mb", 150, DASAR, 6, WI.koki), ...menara("mc", 230, DASAR, 9, WI.neon)),
      tambah("tertinggi", emo("mk", 70, puncak(DASAR, 12) - 4, E.mahkota, 16), teks("tt", 112, 106, "tertinggi", 8.6, W.hijau)),
      tambah("terendah.", emo("tn", 150, puncak(DASAR, 6) - 4, "\u{1F53B}", 14), teks("tr", 150, 118, "terendah", 8.6, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Cube Towers: terapan pada tiga akuarium ------------------------------ */
const SUARA_D1 = "Igil menyusun menara untuk tiga akuarium: delapan belas, sembilan, dan tiga belas.";
const SUARA_D2 = "Menara delapan belas paling tinggi, menara sembilan paling rendah.";
const SUARA_D3 = "Kaka menyusun menara dari yang terendah ke yang tertinggi: sembilan, tiga belas, delapan belas.";
const SUARA_D4 = "Menara cocok untuk mencari paling banyak dan mengurutkan, tetapi butuh banyak kubus.";
const [D1_3, D1_18, D1_9, D1_13] = urutBilangan(SUARA_D1, [3, 18, 9, 13]);
const [D2_18, D2_9] = urutBilangan(SUARA_D2, [18, 9]);
const [D3_9, D3_13, D3_18] = urutBilangan(SUARA_D3, [9, 13, 18]);
const XT = { a: 90, b: 160, c: 230 };

export const ADEGAN_LUAR_MENARA_TERAPAN: AdeganStory = {
  id: "luar-menara-terapan",
  judul: "Cube Towers: tiga akuarium",
  sumber: "Metode global: Cube Towers, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), lantai()),
      tambah("Igil", ...orang("ig", 30, 148, E.igil, "Igil")),
      tambah(D1_3, teks("tm", 268, 70, "3 menara", 8.6, W.ungu)),
      tambah(D1_18, ...menara("t18", XT.a, DASAR, 18, WI.guppy), label("l18", XT.a, "18")),
      tambah(D1_9, ...menara("t9", XT.b, DASAR, 9, WI.koki), label("l9", XT.b, "9")),
      tambah(D1_13, ...menara("t13", XT.c, DASAR, 13, WI.neon), label("l13", XT.c, "13")),
    ),
    k(
      SUARA_D2,
      sorotkan(D2_18, ...idMenara("t18", 18)),
      tambah("tinggi,", emo("mk", XT.a, puncak(DASAR, 18) - 4, E.mahkota, 16), teks("pt", 132, 78, "paling tinggi", 8.6, W.hijau)),
      sorotkan(D2_9, ...idMenara("t9", 9)),
      tambah("rendah.", emo("tn", XT.b, puncak(DASAR, 9) - 4, "\u{1F53B}", 14), teks("pr", XT.b, 106, "paling rendah", 8.6, W.ungu)),
    ),
    k(
      SUARA_D3,
      hapus(0, "ig", "ig-n", "pt", "pr", "mk", "tn", "tm"),
      tambah("Kaka", ...orang("kk", 270, 148, E.kaka, "Kaka")),
      tambah("terendah", teks("rt", 125, 70, "rendah ke tinggi", 8.6, W.ungu)),
      ubah("terendah", ...geserMenara("t9", 9, XT.a), ...geserMenara("t13", 13, XT.b), ...geserMenara("t18", 18, XT.c), { id: "l9", x: XT.a }, { id: "l13", x: XT.b }, { id: "l18", x: XT.c }),
      sorotkan(D3_9, "l9"),
      sorotkan(D3_13, "l13"),
      sorotkan(D3_18, "l18"),
    ),
    k(
      SUARA_D4,
      hapus(0, "rt"),
      tambah("cocok", ...kartu("cc", 8, 54, 76, 44, W.hijauMuda, ["cocok:", "paling banyak,", "urutan"], 8), emo("ok", 46, 116, E.benar, 16)),
      tambah("butuh", teks("bb", 150, 198, "butuh banyak kubus", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Number Line Order: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Number Line Order, atau Urut di Garis Bilangan. Letakkan bilangan di garis, dari nol sampai dua puluh.";
const SUARA_E2 = "Bilangan yang lebih kecil ada di kiri. Bilangan yang lebih besar ada di kanan.";
const SUARA_E3 = "Untuk mengurutkan dari terkecil, baca dari kiri ke kanan.";
const SUARA_E4 = "Untuk mengurutkan dari terbesar, baca dari kanan ke kiri.";
const panah = (id: string, x: number, x2: number, warna: string): Obj => ({ id, t: "panah", x, y: 150, x2, y2: 0, warna, tebal: 2.4 });

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Order: urut di garis bilangan",
  sumber: "Metode global: Number Line Order",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah(idx(SUARA_E1, "Garis"), ...garisBil("gb")),
      sorotkan("nol", "gb-a0"),
      sorotkan("puluh.", "gb-a20"),
      tambah("puluh.", teks("rg", 150, 168, "dari 0 sampai 20", 10, W.ungu)),
    ),
    k(
      SUARA_E2,
      hapus(0, "rg"),
      tambah("kiri.", ...penanda("p9", 9, W.langit), panah("pk", 120, -90, W.ungu), teks("kc", 64, 168, "lebih kecil: kiri", 9.4, W.ungu)),
      tambah("kanan.", ...penanda("p18", 18, W.hijauMuda), panah("pb", 180, 90, W.hijau), teks("bs", 236, 168, "lebih besar: kanan", 9.4, W.hijau)),
    ),
    k(
      SUARA_E3,
      hapus(0, "pk", "pb", "kc", "bs"),
      tambah("terkecil,", ...penanda("p13", 13, W.krem)),
      tambah("kiri", panah("pr", 40, 220, W.hijau)),
      tambah("kanan.", teks("so", 150, 170, "terkecil: 9, 13, 18", 10, W.hijau)),
    ),
    k(
      SUARA_E4,
      hapus(0, "pr", "so"),
      tambah("terbesar,", panah("pl", 260, -220, W.ungu)),
      tambah("kiri.", teks("sb", 150, 170, "terbesar: 18, 13, 9", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 7. Number Line Order: terapan pada pesanan ------------------------------ */
const SUARA_F1 = "Pak RT memesan enam belas ikan, tetangga sembilan belas. Keduanya diberi tanda di garis bilangan.";
const SUARA_F2 = "Enam belas ada di kiri sembilan belas, jadi enam belas lebih sedikit.";
const SUARA_F3 = "Isi akuarium dua belas, lima belas, dan dua puluh juga ditandai. Dari terkecil: dua belas, lima belas, dua puluh.";
const SUARA_F4 = "Garis bilangan paling cepat untuk mengurutkan banyak bilangan, tetapi kurang menunjukkan bendanya.";
const [F1_16, F1_19] = urutBilangan(SUARA_F1, [16, 19]);
const [F3_12, F3_15, F3_20] = urutBilangan(SUARA_F3, [12, 15, 20]);
const [F3_12b, F3_15b, F3_20b] = urutBilangan(SUARA_F3, [12, 15, 20], "terkecil:");
const xN = (n: number): number => 20 + n * 13;

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Order: pesanan dan isi akuarium",
  sumber: "Metode global: Number Line Order, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2), ...garisBil("gb")),
      tambah(F1_16, ...penanda("p16", 16, W.langit), teks("n16", xN(16), 88, "Pak RT", 9.5, W.ungu)),
      tambah(F1_19, ...penanda("p19", 19, W.hijauMuda), teks("n19", xN(19), 88, "Tetangga", 9.5, W.ungu)),
    ),
    k(
      SUARA_F2,
      tambah("kiri", panah("pa", xN(19) - 4, -(xN(19) - xN(16)) + 8, W.merah)),
      sorotkan("kiri", "p16"),
      tambah("lebih", teks("kt", 150, 172, "16 di kiri 19: lebih sedikit", 9.4, W.merah)),
    ),
    k(
      SUARA_F3,
      hapus(0, "p16", "p16-n", "p19", "p19-n", "n16", "n19", "pa", "kt"),
      tambah(F3_12, ...penanda("p12", 12, W.langit)),
      tambah(F3_15, ...penanda("p15", 15, W.krem)),
      tambah(F3_20, ...penanda("p20", 20, W.hijauMuda)),
      sorotkan(F3_12b, "p12"),
      sorotkan(F3_15b, "p15"),
      sorotkan(F3_20b, "p20"),
      tambah("terkecil:", teks("ur", 150, 172, "dari terkecil: 12, 15, 20", 9.4, W.hijau)),
    ),
    k(
      SUARA_F4,
      hapus(0, "ur"),
      tambah("paling", ...kartu("cp", 20, 56, 260, 26, W.hijauMuda, ["paling cepat untuk mengurutkan"], 10)),
      tambah("kurang", ...kartu("kb", 40, 150, 220, 26, W.merahMuda, ["kurang menunjukkan bendanya"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global. Mana yang paling cocok untuk lapak Abang? Itu tergantung masalahnya.";
const SUARA_Z2 = "Pasangkan Satu-Satu cocok bila hanya dua kumpulan dan ingin tahu sisanya. Menara Kubus cocok untuk mencari yang paling banyak.";
const SUARA_Z3 = "Garis bilangan paling cepat untuk mengurutkan banyak bilangan. Ketiganya sama: perhatikan mana yang lebih banyak.";
const SUARA_Z4 = "Menurutmu, kalau ada lima akuarium yang harus diurutkan, alat mana yang paling cepat?";
const DESKRIPSI = ["2 kumpulan, 1 dengan 1: lihat sisa", "mencari yang paling banyak", "mengurutkan banyak bilangan"];
const kartuRingkas = (i: number): Obj[] => kartu(`r${i}`, 14, 30 + i * 36, 272, 32, WARNA_METODE[i], [NAMA_METODE[i], DESKRIPSI[i]], 8.6);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan")),
      tambah("tiga", emo("rk", 150, 76, E.lapak, 40), ...kartu("rt", 60, 98, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("masalahnya.", teks("mm", 150, 146, "tergantung masalahnya", 10, W.ungu)),
      tambah("Abang?", ...ikan("ik0", 110, 176, WI.guppy, 1.1), ...ikan("ik1", 150, 176, WI.koki, 1.1), ...ikan("ik2", 190, 176, WI.neon, 1.1)),
    ),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Pasangkan", ...kartuRingkas(0)), tambah("Menara", ...kartuRingkas(1))),
    k(
      SUARA_Z3,
      tambah("Garis", ...kartuRingkas(2)),
      tambah("Ketiganya", teks("sm", 150, 156, "Ketiganya sama: lihat yang lebih banyak", 9, W.ungu)),
    ),
    k(
      SUARA_Z4,
      hapus(0, "sm"),
      tambah("lima", ...kartu("lm", 60, 146, 180, 26, W.emas, ["5 akuarium: alat mana?"], 10.5)),
      tambah("cepat?", emo("tq", 268, 164, E.tanya, 18)),
    ),
  ],
};
