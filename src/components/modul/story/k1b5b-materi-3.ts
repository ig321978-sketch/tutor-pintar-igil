import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, WB, angka, bulat, emo, garisBilangan, glX, judul, kartu, panah, teks } from "./k1b5b-gambar";
import { bersih, bilKe, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5b-bantu";

/* ------------------------------ 1. Mesin deret: maju atau mundur ------------------------------ */
const SUARA_R1 = "Mesin deret menunjukkan beberapa bilangan. Tugas kita, tentukan deret ini maju atau mundur.";
const SUARA_R2 = "Lihat dua bilangan pertama. Tiga belas, lalu empat belas. Bilangannya makin besar.";
const SUARA_R3 = "Kalau makin besar, deretnya maju. Jadi bilangan berikutnya adalah enam belas.";
const SUARA_R4 = "Deret yang lain: delapan belas, tujuh belas, enam belas, lalu satu kotak kosong.";
const SUARA_R5 = "Bilangannya makin kecil, jadi deretnya mundur. Bilangan berikutnya adalah lima belas.";
const SUARA_R6 = "Ucapkan lagi mengikuti suara guru. Maju, tiga belas, empat belas, lima belas, enam belas. Mundur, delapan belas, tujuh belas, enam belas, lima belas.";
const RX = [20, 90, 160, 230];
const baris = (id: string, y: number, isi: (number | null)[], warna: string): Obj[] => isi.flatMap((v, i) => angka(`${id}${i}`, RX[i], y, v === null ? "?" : v, 56, 40, v === null ? W.krem : warna, 18));
const P_R4 = urutBil(SUARA_R4, [18, 17, 16]);
const P_R6a = urutBil(SUARA_R6, [13, 14, 15, 16], "Maju,");
const P_R6b = urutBil(SUARA_R6, [18, 17, 16, 15], "Mundur,");

export const ADEGAN_MESIN: AdeganStory = {
  id: "mesin-deret",
  judul: "Mesin deret: maju atau mundur",
  sumber: "Materi: arah deret bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mesin deret")),
      tambah("bilangan.", baris("ra", 34, [13, 14, 15, null], WB.biru)),
      tambah("maju", teks("ca", 150, 98, "maju atau mundur?", 11, W.merah)),
    ),
    k(
      SUARA_R2,
      sorotkan("Lihat", "ra0-k", "ra1-k"),
      ubah("makin", { id: "ca", isi: "makin besar", warna: W.hijau }),
      tambah("besar.", panah("pg", 60, 86, 90, 0, W.hijau, 2.4)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "ra0-k", "ra1-k"),
      hapus(0, "pg"),
      ubah("maju.", { id: "ca", isi: "deretnya maju", warna: W.hijau }),
      ubah(bilKe(SUARA_R3, 16), { id: "ra3-t0", isi: "16", warna: W.biru }, { id: "ra3-k", warna: W.hijauMuda, sorot: true }),
    ),
    k(
      SUARA_R4,
      redamkan(0, "ra3-k"),
      tambah(0, teks("cb", 150, 160, "deret yang lain", 11, W.ungu)),
      tambah(P_R4[0], ...angka("rb0", RX[0], 104, 18, 56, 40, WB.pink, 18)),
      tambah(P_R4[1], ...angka("rb1", RX[1], 104, 17, 56, 40, WB.pink, 18)),
      tambah(P_R4[2], ...angka("rb2", RX[2], 104, 16, 56, 40, WB.pink, 18)),
      tambah("kosong.", ...angka("rb3", RX[3], 104, "?", 56, 40, W.krem, 18)),
    ),
    k(
      SUARA_R5,
      sorotkan("makin", "rb0-k", "rb1-k", "rb2-k"),
      ubah("kecil,", { id: "cb", isi: "makin kecil: mundur", warna: W.merah }),
      redamkan("Bilangan@2", "rb0-k", "rb1-k", "rb2-k"),
      ubah(bilKe(SUARA_R5, 15), { id: "rb3-t0", isi: "15", warna: W.biru }, { id: "rb3-k", warna: W.merahMuda, sorot: true }),
    ),
    k(
      SUARA_R6,
      redamkan(0, "rb3-k"),
      hapus(0, "ca", "cb"),
      tambah(0, emo("uc", 150, 175, "\u{1F4AC}", 30)),
      ...P_R6a.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `ra${i - 1}-k`)] : []), sorotkan(p, `ra${i}-k`)]),
      redamkan(P_R6b[0], "ra3-k"),
      ...P_R6b.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `rb${i - 1}-k`)] : []), sorotkan(p, `rb${i}-k`)]),
    ),
  ],
};

/* ------------------------------ 2. Tetangga bilangan: sebelum, sesudah, di antara ------------------------------ */
const SUARA_T1 = "Bilangan punya tetangga. Ada bilangan sebelum, ada bilangan sesudah, dan ada bilangan di antara.";
const SUARA_T2 = "Bilangan sebelum lima belas adalah empat belas.";
const SUARA_T3 = "Bilangan sesudah lima belas adalah enam belas. Sesudah artinya datang setelahnya.";
const SUARA_T4 = "Tiga belas ada di antara dua belas dan empat belas. Di antara artinya di tengah dua bilangan.";
const SUARA_T5 = "Sekarang tebak. Bilangan sebelum delapan belas adalah bilangan apa? Ketuk jawabannya.";
const SUARA_T6 = "Sebelum delapan belas adalah tujuh belas. Hebat! Sesudah delapan belas adalah sembilan belas.";
const TX = [30, 120, 210];
const tiga = (id: string, a: number, b: number, c: number, warna: string): Obj[] => [...angka(`${id}0`, TX[0], 60, a, 60, 54, warna, 24), ...angka(`${id}1`, TX[1], 60, b, 60, 54, warna, 24), ...angka(`${id}2`, TX[2], 60, c, 60, 54, warna, 24)];

export const ADEGAN_TETANGGA: AdeganStory = {
  id: "tetangga",
  judul: "Tetangga bilangan: sebelum, sesudah, di antara",
  sumber: "Materi: sebelum, sesudah, di antara",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tetangga bilangan")),
      tambah("sebelum,", ...kartu("ta", 30, 70, 76, 34, W.hijauMuda, ["sebelum"], 11)),
      tambah("sesudah,", ...kartu("tb", 112, 70, 76, 34, W.langit, ["sesudah"], 11)),
      tambah("antara.", ...kartu("tc", 194, 70, 76, 34, W.pink, ["di antara"], 11)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Sebelum")),
      tambah("sebelum", ...tiga("ts", 14, 15, 16, W.langit)),
      tambah("sebelum", teks("tt0", TX[0] + 30, 140, "sebelum", 10, W.hijau)),
      sorotkan("empat", "ts0-k"),
    ),
    k(
      SUARA_T3,
      redamkan(0, "ts0-k"),
      hapus(0, "tt0"),
      ubah(0, { id: "jud", isi: "Sesudah" }),
      tambah("sesudah", teks("tt2", TX[2] + 30, 140, "sesudah", 10, W.hijau)),
      sorotkan("enam", "ts2-k"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Di antara")),
      tambah("Tiga", ...tiga("tu", 12, 13, 14, W.krem)),
      sorotkan("Tiga", "tu1-k"),
      tambah("antara", teks("tt3", TX[1] + 30, 140, "di antara", 10, W.hijau)),
      tambah("tengah", panah("pu", TX[0] + 60, 96, 30, 0, W.merah, 2), panah("pv", TX[2], 96, -30, 0, W.merah, 2)),
    ),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Tebak bilangannya")),
      tambah("Sekarang", ...angka("sa", 120, 34, 18, 60, 46, W.langit, 22)),
      tambah("apa?", teks("sq", 150, 104, "bilangan sebelum ini?", 11, W.merah)),
      tambah("Ketuk", ...angka("sb0", 30, 124, 17, 60, 46, W.krem, 22), ...angka("sb1", 120, 124, 19, 60, 46, W.krem, 22), ...angka("sb2", 210, 124, 20, 60, 46, W.krem, 22)),
    ),
    k(
      SUARA_T6,
      sorotkan(bilKe(SUARA_T6, 17), "sb0-k"),
      tambah("Hebat!", emo("ow", 150, 198, "\u{1F989}", 20)),
      redamkan("Sesudah", "sb0-k"),
      sorotkan(bilKe(SUARA_T6, 19), "sb1-k"),
      ubah("Sesudah", { id: "sq", isi: "bilangan sesudah ini?" }),
    ),
  ],
};

/* ------------------------------ 3. Latihan 1: ulat bilangan ------------------------------ */
const SUARA_S1 = "Latihan satu. Ulat bilangan punya badan bertanda empat belas, lima belas, satu kotak kosong, dan tujuh belas.";
const SUARA_S2 = "Bilangan apa yang hilang? Pilih kartu angka yang pas. Pilihannya lima belas, enam belas, atau delapan belas.";
const SUARA_S3 = "Seret kartu enam belas ke badan ulat yang kosong. Benar! Empat belas, lima belas, enam belas, tujuh belas.";
const SUARA_S4 = "Kita periksa dengan menghitung mundur. Tujuh belas, enam belas, lima belas, empat belas. Cocok!";
const SUARA_S5 = "Ucapkan lagi mengikuti suara guru. Bilangan yang hilang adalah enam belas.";
const SX = [25, 85, 145, 205];
const ruasS = (i: number, isi: number | null): Obj[] => [
  bulat(`su${i}`, SX[i] + 24, 70, 24, isi === null ? W.krem : WB.kuning, W.biru, { tebal: 1.8 }),
  teks(`sut${i}`, SX[i] + 24, 76, isi === null ? "?" : String(isi), 15, isi === null ? W.merah : W.biru),
];
const P_S3 = urutBil(SUARA_S3, [14, 15, 16, 17], "Benar!");
const P_S4 = urutBil(SUARA_S4, [17, 16, 15, 14], "mundur.");

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: ulat bilangan",
  sumber: "Materi: latihan bilangan yang hilang",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_S1, "empat"), ...ruasS(0, 14)),
      tambah(idx(SUARA_S1, "lima"), ...ruasS(1, 15)),
      tambah("kosong,", ...ruasS(2, null)),
      tambah(idx(SUARA_S1, "tujuh"), ...ruasS(3, 17), bulat("su-h", 274, 70, 18, W.hijau, W.biru, { tebal: 1.8 }), emo("su-m", 274, 76, "\u{1F60A}", 16)),
    ),
    k(
      SUARA_S2,
      tambah("Pilih", ...angka("sk0", 30, 130, 15, 60, 46, W.langit, 22), ...angka("sk1", 120, 130, 16, 60, 46, W.langit, 22), ...angka("sk2", 210, 130, 18, 60, 46, W.langit, 22)),
      sorotkan("apa", "su2"),
    ),
    k(
      SUARA_S3,
      redamkan(0, "su2"),
      sorotkan("Seret", "sk1-k"),
      ubah(idx(SUARA_S3, "kosong"), { id: "sk1-k", x: 139, y: 47, sorot: false }, { id: "sk1-t0", x: 169, y: 78 }),
      ubah("Benar!", { id: "sut2", isi: "" }),
      ...P_S3.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `su${i - 1}`)] : []), sorotkan(p, `su${i}`)]),
    ),
    k(
      SUARA_S4,
      redamkan(0, "su3"),
      tambah(0, panah("pr", 230, 112, -190, 0, W.merah, 2.6)),
      ...P_S4.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `su${4 - i}`)] : []), sorotkan(p, `su${3 - i}`)]),
      tambah("Cocok!", cocok2("sc", 150, 190)),
    ),
    k(
      SUARA_S5,
      redamkan(0, "su0"),
      hapus(0, "pr", "sc"),
      tambah(0, emo("uc", 150, 190, "\u{1F4AC}", 30)),
      sorotkan("hilang", "sk1-k"),
      tambah("enam", teks("sh", 150, 160, "yang hilang: 16", 13, W.hijau)),
    ),
  ],
};
function cocok2(id: string, x: number, y: number): Obj {
  return emo(id, x, y, "\u{2705}", 22);
}

/* ------------------------------ 4. Latihan 2: roket hitung mundur ------------------------------ */
const SUARA_O1 = "Latihan dua. Kira punya sebuah roket. Ada lima lampu bertanda lima belas sampai sebelas.";
const SUARA_O2 = "Kita hitung mundur dari lima belas. Ketuk lampu satu per satu, mulai dari bilangan yang paling besar.";
const SUARA_O3 = "Lima belas, empat belas, tiga belas. Tiga lampu sudah padam.";
const SUARA_O4 = "Dua belas, sebelas. Semua lampu padam, dan roket meluncur!";
const SUARA_O5 = "Lampu terakhir yang padam bertanda sebelas. Ucapkan lagi mengikuti suara guru. Lima belas sampai sebelas, mundur satu demi satu.";
const OX = [40, 95, 150, 205, 260];
const LAMPU = (i: number): Obj[] => [
  bulat(`lm${i}`, OX[i], 70, 20, WB.kuning, W.biru, { tebal: 1.8 }),
  teks(`lmt${i}`, OX[i], 76, String(15 - i), 15, W.biru),
];
const padam = (at: number, i: number): Aksi => ubah(at, { id: `lm${i}`, warna: W.abu, sorot: false });
const P_O3 = urutBil(SUARA_O3, [15, 14, 13]);
const P_O4 = urutBil(SUARA_O4, [12, 11]);

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: roket hitung mundur",
  sumber: "Materi: latihan menghitung mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Latihan 2")),
      tambah("roket.", emo("rk", 150, 170, "\u{1F680}", 40)),
      tambah("lampu", [0, 1, 2, 3, 4].flatMap(LAMPU)),
    ),
    k(
      SUARA_O2,
      tambah("Ketuk", emo("tg", OX[0], 118, "\u{1F446}", 22)),
      sorotkan("Ketuk", "lm0"),
      tambah("besar.", teks("tp", 150, 194, "mulai dari 15", 11, W.ungu)),
    ),
    k(
      SUARA_O3,
      padam(P_O3[0], 0),
      sorotkan(P_O3[1], "lm1"),
      ubah(P_O3[1], { id: "tg", x: OX[1] }),
      padam(P_O3[1], 1),
      sorotkan(P_O3[2], "lm2"),
      ubah(P_O3[2], { id: "tg", x: OX[2] }),
      padam(P_O3[2], 2),
      tambah("padam.", teks("pp", 150, 140, "tiga lampu padam", 10, W.merah)),
    ),
    k(
      SUARA_O4,
      hapus(0, "pp"),
      ubah(P_O4[0], { id: "tg", x: OX[3] }),
      padam(P_O4[0], 3),
      ubah(P_O4[1], { id: "tg", x: OX[4] }),
      padam(P_O4[1], 4),
      ubah("meluncur!", { id: "rk", y: 128 }),
      tambah("meluncur!", emo("ap", 150, 196, "\u{1F525}", 20)),
    ),
    k(
      SUARA_O5,
      hapus(0, "tg", "ap"),
      sorotkan("terakhir", "lmt4"),
      tambah("sebelas.", ...kartu("lt", 60, 150, 180, 30, W.emas, ["lampu terakhir: 11"], 11)),
      tambah(idx(SUARA_O5, "Ucapkan"), emo("uc", 40, 190, "\u{1F4AC}", 24)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 3: garis bilangan dua belas sampai sembilan belas ------------------------------ */
const SUARA_G1 = "Latihan tiga. Garis bilangan ini dari dua belas sampai sembilan belas, tetapi ada dua tanda tanya.";
const SUARA_G2 = "Ketuk tanda tanya yang pertama. Dari tiga belas maju satu langkah, bilangannya empat belas.";
const SUARA_G3 = "Ketuk tanda tanya yang kedua. Dari delapan belas mundur satu langkah, bilangannya tujuh belas.";
const SUARA_G4 = "Kodok mulai di sembilan belas dan mundur tiga langkah. Delapan belas, tujuh belas, enam belas.";
const SUARA_G5 = "Pilih bilangan tempat kodok berhenti. Pilihannya lima belas, enam belas, atau tujuh belas. Enam belas yang benar.";
const LY = 110;
const xg = (n: number): number => glX(n, 12, 19);
const labelG = (n: number, isi: string, warna: string = W.biru): Obj => teks(`lat${n}`, xg(n), LY + 21, isi, 11, warna);
const kodokG = (n: number) => ({ id: "kd", x: xg(n), y: LY - 12 });
const P_G4 = urutBil(SUARA_G4, [18, 17, 16], "mundur");

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: garis bilangan",
  sumber: "Materi: latihan garis bilangan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Latihan 3")),
      tambah("garis", ...garisBilangan("la", 12, 19, LY, (n) => n !== 14 && n !== 17)),
      tambah("tanda", labelG(14, "?", W.merah), labelG(17, "?", W.merah)),
    ),
    k(
      SUARA_G2,
      sorotkan("pertama.", "lat14"),
      tambah("Dari", emo("kd", xg(13), LY - 12, "\u{1F438}", 24)),
      ubah(bilKe(SUARA_G2, 14), { id: "lat14", isi: "14", warna: W.hijau }, kodokG(14)),
    ),
    k(
      SUARA_G3,
      redamkan(0, "lat14"),
      sorotkan("kedua.", "lat17"),
      ubah("Dari", kodokG(18)),
      ubah(bilKe(SUARA_G3, 17), { id: "lat17", isi: "17", warna: W.hijau }, kodokG(17)),
    ),
    k(
      SUARA_G4,
      redamkan(0, "lat17"),
      ubah("mulai", kodokG(19)),
      ...P_G4.map((p, i) => ubah(p, kodokG(18 - i))),
      tambah("tiga", ...kartu("kg", 60, 160, 180, 30, W.merahMuda, ["mundur tiga langkah"], 10.5)),
    ),
    k(
      SUARA_G5,
      hapus(0, "kg-k", "kg-t0"),
      tambah("Pilih", ...angka("gp0", 30, 144, 15, 60, 38, W.langit, 20), ...angka("gp1", 120, 144, 16, 60, 38, W.langit, 20), ...angka("gp2", 210, 144, 17, 60, 38, W.langit, 20)),
      sorotkan(bilKe(SUARA_G5, 16, 2), "gp1-k"),
      tambah("benar.", cocok2("gc", 150, 198)),
    ),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Menghitung maju, dari bilangan kecil ke bilangan besar. Menghitung mundur, dari bilangan besar ke bilangan kecil.";
const SUARA_Z2 = "Langkahnya sama, satu demi satu. Kita bisa mencari bilangan yang hilang, bilangan sebelum, bilangan sesudah, dan bilangan di antara.";
const SUARA_Z3 = "Sekarang giliranmu. Ketuk, seret, pilih jawaban, dan ucapkan lagi mengikuti suara guru.";
const SUARA_Z4 = "Sampai jumpa, anak-anak. Terima kasih sudah belajar bersama Igil. Sampai bertemu lagi!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: maju dan mundur",
  sumber: "Materi: rangkuman dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Kita ingat lagi")),
      tambah("maju,", ...kartu("zm", 20, 40, 260, 44, W.hijauMuda, ["maju: kecil ke besar", "10, 11, 12, 13"], 10)),
      tambah("mundur,", ...kartu("zn", 20, 98, 260, 44, W.merahMuda, ["mundur: besar ke kecil", "13, 12, 11, 10"], 10)),
    ),
    k(
      SUARA_Z2,
      tambah("Langkahnya", ...kartu("zl", 20, 152, 260, 30, W.emas, ["langkah sama: satu demi satu"], 10.5)),
      tambah("hilang,", teks("zh", 150, 196, "hilang, sebelum, sesudah, di antara", 9.4, W.ungu)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Giliranmu")),
      tambah("Ketuk,", ...kartu("zq", 20, 50, 80, 40, W.langit, ["ketuk"], 12), emo("zq2", 60, 124, "\u{1F446}", 30)),
      tambah("seret,", ...kartu("zr", 110, 50, 80, 40, W.hijauMuda, ["seret"], 12), emo("zr2", 150, 124, "\u{2194}", 30)),
      tambah("pilih", ...kartu("zs", 200, 50, 80, 40, W.pink, ["pilih"], 12), emo("zs2", 240, 124, "\u{2705}", 30)),
    ),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("zo", 150, 110, "\u{1F989}", 56)), tambah("Terima", ...kartu("zt", 60, 140, 180, 34, W.krem, ["terima kasih, Igil"], 11))),
  ],
};
