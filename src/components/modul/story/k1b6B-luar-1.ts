import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, idDeret, judul, kartu, kotak, orang, teks } from "./k1b6B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";

/* Video metode global Sub-Bab B "Loket Karcis": pembuka, Doubles Plus One (Kembar Tambah Satu), dan terapannya. */

export const NAMA_METODE = ["Doubles Plus One", "Part-Whole Model", "Number Line Jumps"];
export const NAMA_METODE_ID = ["Kembar Tambah Satu", "Bagan Bagian dan Keseluruhan", "Lompat di Garis Bilangan"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Sebaris `n` titik `${id}{i}` mulai x0 pada tinggi y berjarak dx. */
export const titikBaris = (id: string, n: number, x0: number, y: number, dx: number, warna: string = W.merah, r = 5): Obj[] =>
  Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, x0 + i * dx, y, r, warna, W.biru, { tebal: 1.2 }));

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di laci loket, Abang menemukan tiga kartu rahasia kasir. Igil bertanya, mana yang paling cepat untuk menjumlah karcis?";
const SUARA_O2 = "Tiga metode itu: Doubles Plus One, Part-Whole Model, dan Number Line Jumps.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Kembar Tambah Satu, Bagan Bagian dan Keseluruhan, dan Lompat di Garis Bilangan. Ketiganya membantu menggabungkan dua bilangan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu rahasia kasir",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Laci loket Abang")),
      tambah("loket,", kotak("lc", 34, 88, 56, 18, W.coklat, W.biru, { rx: 3, tebal: 1.8 }), teks("lc-t", 62, 101, "laci", 9, W.putih)),
      tambah("Abang", ...orang("ab", 62, 146, E.abang, "Abang")),
      ...[0, 1, 2].map((i) => tambah(idx(SUARA_O1, "kartu"), ...kartu(`rk${i}`, 120 + i * 52, 40, 46, 38, W.emas, ["?"], 14))),
      tambah("tiga", teks("n3", 196, 100, "3 kartu rahasia", 10, W.ungu)),
      tambah("Igil", ...orang("ig", 120, 146, E.igil, "Igil")),
      tambah("cepat", emo("tn", 148, 128, E.tanya, 20)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O2, ["Doubles", "Part-Whole", "Number"][i]), ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Kembar", "Bagan", "Lompat"][i]), ...kartu(`n${i}`, 20, 34 + i * 40, 260, 32, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
      tambah("Ketiganya", teks("g2", 150, 176, "2 bilangan jadi 1 hasil", 12, W.merah)),
      sorotkan("menggabungkan", "n0-k", "n1-k", "n2-k"),
    ),
  ],
};

/* ------------------------------ 2. Doubles Plus One: konsep ------------------------------ */
const SUARA_K1 = "Metode pertama, Doubles Plus One, atau Kembar Tambah Satu. Kembar artinya dua bilangan sama, misalnya enam dan enam.";
const SUARA_K2 = "Enam ditambah enam sama dengan dua belas.";
const SUARA_K3 = "Kalau salah satu lebih satu, tambahkan satu ke hasil kembarnya.";
const SUARA_K4 = "Enam ditambah tujuh sama dengan dua belas ditambah satu, yaitu tiga belas.";
const [K1_1, K1_2, K1_6a, K1_6b] = urutBilangan(SUARA_K1, [1, 2, 6, 6]);
const [K4_6, K4_7, K4_12, K4_1, K4_13] = urutBilangan(SUARA_K4, [6, 7, 12, 1, 13]);

export const ADEGAN_LUAR_KEMBAR: AdeganStory = {
  id: "luar-kembar",
  judul: "Doubles Plus One: kembar tambah satu",
  sumber: "Metode global: Doubles Plus One",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah("pertama,", ...kepala(0)),
      tambah(K1_1, teks("p1", 262, 66, "+1", 14, W.hijau)),
      tambah(K1_2, teks("kb", 80, 72, "2 bilangan sama", 10, W.ungu)),
      tambah(K1_6a, ...titikBaris("a", 6, 40, 100, 14), teks("la", 75, 128, "6", 14, W.merah)),
      tambah(K1_6b, ...titikBaris("b", 6, 170, 100, 14, W.biru), teks("lb", 205, 128, "6", 14, W.merah)),
    ),
    k(
      SUARA_K2,
      tambah("ditambah", teks("pl", 150, 106, "+", 22, W.ungu)),
      sorotkan("sama", ...idDeret("a", 0, 5), ...idDeret("b", 0, 5)),
      tambah("dua", teks("eq", 150, 168, "6 + 6 = 12", 20, W.merah)),
    ),
    k(
      SUARA_K3,
      hapus(0, "eq", "kb"),
      sorotkan("Kalau", ...idDeret("a", 0, 5), ...idDeret("b", 0, 5)),
      tambah("lebih", bulat("bx", 254, 100, 5, W.oranye, W.biru, { tebal: 1.2, sorot: true }), teks("lbx", 254, 128, "7", 14, W.merah)),
      ubah("lebih", { id: "p1", sorot: true }),
      tambah("tambahkan", teks("kt", 150, 168, "kembar + 1", 16, W.hijau)),
    ),
    k(
      SUARA_K4,
      hapus(0, "kt", "pl"),
      ubah(0, ...idDeret("a", 0, 5).map((id) => ({ id, sorot: false })), ...idDeret("b", 0, 5).map((id) => ({ id, sorot: false }))),
      tambah(K4_6, teks("e1", 150, 158, "6 + 7", 18, W.biru)),
      ubah(K4_12, { id: "e1", isi: "6 + 7 = 12" }),
      ubah(K4_1, { id: "e1", isi: "6 + 7 = 12 + 1" }),
      ubah(K4_13, { id: "e1", isi: "6 + 7 = 12 + 1 = 13", warna: W.merah }),
      sorotkan(K4_7, "bx"),
    ),
  ],
};

/* ------------------------------ 3. Doubles Plus One: terapan ------------------------------ */
const SUARA_T1 = "Abang menjumlah tujuh ditambah delapan. Kembar tujuh dan tujuh sama dengan empat belas.";
const SUARA_T2 = "Delapan itu tujuh lebih satu, jadi empat belas ditambah satu sama dengan lima belas.";
const SUARA_T3 = "Cara ini kilat bila kedua bilangan hampir sama.";
const SUARA_T4 = "Tetapi kurang cocok untuk tiga ditambah sepuluh, karena tidak ada kembarannya.";
const [T1_7a, T1_8] = urutBilangan(SUARA_T1, [7, 8]);
const [T1_7b, , T1_14] = urutBilangan(SUARA_T1, [7, 7, 14], "Kembar");
const [T2_8, , T2_1, T2_14, , T2_15] = urutBilangan(SUARA_T2, [8, 7, 1, 14, 1, 15]);
const [T4_3, T4_10] = urutBilangan(SUARA_T4, [3, 10]);

export const ADEGAN_LUAR_KEMBAR_TERAPAN: AdeganStory = {
  id: "luar-kembar-terapan",
  judul: "Doubles Plus One: tujuh ditambah delapan",
  sumber: "Metode global: Doubles Plus One, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0)),
      tambah("Abang", ...orang("ab", 40, 156, E.abang, "Abang")),
      tambah(T1_7a, ...titikBaris("a", 7, 30, 100, 13), teks("la", 69, 128, "7", 14, W.merah), teks("pl", 130, 106, "+", 20, W.ungu)),
      tambah(T1_8, ...titikBaris("b", 8, 150, 100, 13, W.biru), teks("lb", 195, 128, "8", 14, W.merah)),
      sorotkan(T1_7b, ...idDeret("a", 0, 6), ...idDeret("b", 0, 6)),
      tambah(T1_14, teks("e1", 170, 168, "7 + 7 = 14", 18, W.merah)),
    ),
    k(
      SUARA_T2,
      ubah(0, ...idDeret("a", 0, 6).map((id) => ({ id, sorot: false })), ...idDeret("b", 0, 6).map((id) => ({ id, sorot: false }))),
      ubah(T2_8, { id: "b7", warna: W.oranye, sorot: true }),
      tambah(T2_1, teks("p1", 241, 82, "+1", 14, W.hijau)),
      ubah(T2_14, { id: "e1", isi: "14 + 1" }),
      ubah(T2_15, { id: "e1", isi: "14 + 1 = 15" }),
    ),
    k(
      SUARA_T3,
      hapus(0, ...idDeret("a", 0, 6), ...idDeret("b", 0, 7), "la", "lb", "pl", "e1", "p1"),
      tambah("Cara", ...kartu("kl", 40, 70, 220, 32, W.hijauMuda, ["bilangan hampir sama: kilat!"], 10.5)),
      tambah("kilat", emo("kk", 150, 140, E.kilat, 34)),
    ),
    k(
      SUARA_T4,
      hapus(0, ...["kl-k", "kl-t0", "kk"]),
      tambah(T4_3, teks("e2", 150, 88, "3 + 10", 24, W.biru)),
      tambah(T4_10, emo("sx", 150, 130, E.salah, 24)),
      tambah("kembarannya.", ...kartu("tk", 70, 140, 160, 24, W.merahMuda, ["tidak ada kembarnya"], 10)),
    ),
  ],
};
