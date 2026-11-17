import type { AdeganStory } from "./logika-story";
import { E, W, bagan, busur, emo, garisAngka, judul, kartu, orang, teks, titikBil, xG } from "./k1b6B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";
import { NAMA_METODE, kepala } from "./k1b6B-luar-1";

/* Video metode global Sub-Bab B: Part-Whole Model, Number Line Jumps, terapannya, dan ringkasan. */

const YG = 120;
const kid = (id: string): string[] => [`${id}-k`, `${id}-t0`];
const BAGAN = ["bg-l0", "bg-l1", "bg-w", "bg-w-t", "bg-p0", "bg-p0-t", "bg-p1", "bg-p1-t"];

/* ------------------------------ 4. Part-Whole Model: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua, Part-Whole Model, atau Bagan Bagian dan Keseluruhan. Dua bagian di bawah, keseluruhan di atas.";
const SUARA_G2 = "Bagian dipisah supaya mudah dijumlah. Bilangan yang dipisah menjadi dua bilangan lebih kecil.";
const SUARA_G3 = "Delapan ditambah sembilan: pisahkan sembilan menjadi dua dan tujuh.";
const SUARA_G4 = "Delapan dan dua sepuluh, ditambah tujuh sama dengan tujuh belas.";
const [G1_2] = urutBilangan(SUARA_G1, [2]);
const [G2_2] = urutBilangan(SUARA_G2, [2]);
const [G3_8, G3_9a, G3_9b, G3_2, G3_7] = urutBilangan(SUARA_G3, [8, 9, 9, 2, 7]);
const [G4_8, G4_2, G4_10, G4_7, G4_17] = urutBilangan(SUARA_G4, [8, 2, 10, 7, 17]);

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Part-Whole Model: bagan bagian dan keseluruhan",
  sumber: "Metode global: Part-Whole Model",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah("kedua,", ...kepala(1)),
      tambah("Bagan", ...bagan("bg", 150, 84, "?", "?", "?", 42)),
      tambah(G1_2, teks("bb", 150, 184, "2 bagian", 12, W.ungu)),
      sorotkan("bawah,", "bg-p0", "bg-p1"),
      tambah("keseluruhan@2", teks("ks", 232, 84, "keseluruhan", 8.6, W.merah)),
      sorotkan("atas.", "bg-w"),
    ),
    k(
      SUARA_G2,
      hapus(0, "bb", "ks"),
      ubah("dipisah", { id: "bg-w-t", isi: "9" }, { id: "bg-p0-t", isi: "4" }, { id: "bg-p1-t", isi: "5" }),
      tambah(G2_2, teks("kc", 150, 184, "2 bilangan lebih kecil", 11, W.hijau)),
      sorotkan("kecil.", "bg-p0", "bg-p1"),
    ),
    k(
      SUARA_G3,
      hapus(0, "kc"),
      ubah(0, { id: "bg-w", sorot: false }, { id: "bg-p0", sorot: false }, { id: "bg-p1", sorot: false }),
      tambah(G3_8, teks("pj", 60, 70, "8 + 9", 16, W.biru)),
      ubah(G3_9a, { id: "bg-w-t", isi: "9", sorot: true }),
      ubah(G3_9b, { id: "bg-w", sorot: true }),
      ubah(G3_2, { id: "bg-p0-t", isi: "2" }),
      ubah(G3_7, { id: "bg-p1-t", isi: "7" }),
    ),
    k(
      SUARA_G4,
      ubah(0, { id: "bg-w", sorot: false }),
      tambah(G4_8, teks("s1", 75, 184, "8 + 2 = 10", 12, W.hijau)),
      sorotkan(G4_2, "bg-p0"),
      ubah(G4_10, { id: "s1", sorot: true }),
      tambah(G4_7, teks("s2", 225, 184, "10 + 7 = 17", 12, W.merah)),
      sorotkan(G4_7, "bg-p1"),
      ubah(G4_17, { id: "pj", isi: "8 + 9 = 17" }),
    ),
  ],
};

/* ------------------------------ 5. Part-Whole Model: terapan ------------------------------ */
const SUARA_H1 = "Kaka menjumlah tujuh ditambah enam. Enam dipisah menjadi tiga dan tiga.";
const SUARA_H2 = "Tujuh ditambah tiga sama dengan sepuluh, ditambah tiga sama dengan tiga belas.";
const SUARA_H3 = "Bagan membuat langkah rapi dan mudah diperiksa.";
const SUARA_H4 = "Tetapi menggambar bagan lama kalau bilangannya kecil dan bisa langsung dijumlah.";
const [H1_7, H1_6a, H1_6b, H1_3a, H1_3b] = urutBilangan(SUARA_H1, [7, 6, 6, 3, 3]);
const [H2_7, H2_3a, H2_10, H2_3b, H2_13] = urutBilangan(SUARA_H2, [7, 3, 10, 3, 13]);

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Part-Whole Model: tujuh ditambah enam",
  sumber: "Metode global: Part-Whole Model, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(1)),
      tambah("Kaka", ...orang("kk", 30, 156, E.kaka, "Kaka")),
      tambah(H1_7, teks("pj", 60, 70, "7 + 6", 16, W.biru)),
      tambah(H1_6a, ...bagan("bg", 150, 84, "6", "?", "?", 42)),
      sorotkan(H1_6b, "bg-w"),
      ubah(H1_3a, { id: "bg-p0-t", isi: "3" }),
      ubah(H1_3b, { id: "bg-p1-t", isi: "3" }),
    ),
    k(
      SUARA_H2,
      ubah(0, { id: "bg-w", sorot: false }),
      tambah(H2_7, teks("s1", 75, 184, "7 + 3 = 10", 12, W.hijau)),
      sorotkan(H2_3a, "bg-p0"),
      ubah(H2_10, { id: "s1", sorot: true }),
      tambah(H2_3b, teks("s2", 225, 184, "10 + 3 = 13", 12, W.merah)),
      sorotkan(H2_3b, "bg-p1"),
      ubah(H2_13, { id: "pj", isi: "7 + 6 = 13" }),
    ),
    k(
      SUARA_H3,
      hapus(0, ...BAGAN, "pj", "s1", "s2"),
      tambah("Bagan", ...kartu("ra", 70, 66, 160, 26, W.hijauMuda, ["langkah rapi"], 11), emo("c1", 250, 84, E.benar, 20)),
      tambah("mudah", ...kartu("rb", 70, 106, 160, 26, W.krem, ["mudah diperiksa"], 11), emo("c2", 250, 124, E.benar, 20)),
    ),
    k(
      SUARA_H4,
      hapus(0, ...kid("ra"), ...kid("rb"), "c1", "c2"),
      tambah("menggambar", emo("jm", 70, 100, E.jam, 30)),
      tambah("kecil", ...kartu("kk2", 110, 78, 150, 26, W.merahMuda, ["bilangan kecil"], 11)),
      tambah("langsung", teks("e2", 185, 134, "2 + 1 = 3", 18, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Number Line Jumps: konsep ------------------------------ */
const SUARA_J1 = "Metode ketiga, Number Line Jumps, atau Lompat di Garis Bilangan. Mulai dari bilangan pertama.";
const SUARA_J2 = "Lompat ke kanan sebanyak bilangan kedua. Tempat mendarat adalah jumlahnya.";
const SUARA_J3 = "Lompatan besar boleh dipecah, misalnya lompat menuju sepuluh dulu.";
const SUARA_J4 = "Dari dua belas lompat tiga langkah, mendarat di lima belas.";
const [J4_12, J4_3, J4_15] = urutBilangan(SUARA_J4, [12, 3, 15]);
const [J3_10] = urutBilangan(SUARA_J3, [10]);

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Number Line Jumps: lompat di garis bilangan",
  sumber: "Metode global: Number Line Jumps",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_J1,
      tambah("ketiga,", ...kepala(2)),
      tambah("Garis", ...garisAngka("gb", YG)),
      tambah("Mulai", titikBil("st", 6, YG), teks("ms", xG(6), 96, "mulai", 9, W.hijau)),
    ),
    k(
      SUARA_J2,
      tambah("Lompat", busur("jb", 6, 13, YG, W.merah, 26)),
      tambah("kanan", teks("kn", 170, 80, "ke kanan", 10, W.merah)),
      tambah("mendarat", titikBil("ld", 13, YG, W.oranye), teks("mt", xG(13), 96, "mendarat", 9, W.biru)),
    ),
    k(
      SUARA_J3,
      hapus(0, "jb", "ld", "mt", "kn"),
      tambah("dipecah,", busur("j1", 6, 10, YG, W.merah, 16)),
      tambah("menuju", teks("sp", xG(10), 90, "ke 10 dulu", 9, W.ungu)),
      ubah(J3_10, { id: "gb-a10", sorot: true }),
      tambah(J3_10, busur("j2", 10, 13, YG, W.ungu, 14), titikBil("ld", 13, YG, W.oranye)),
    ),
    k(
      SUARA_J4,
      hapus(0, "st", "ms", "j1", "j2", "ld", "sp"),
      ubah(0, { id: "gb-a10", sorot: false }),
      tambah(J4_12, titikBil("s12", 12, YG, W.hijau)),
      tambah("lompat", busur("q0", 12, 13, YG, W.merah, 10)),
      tambah(J4_3, busur("q1", 13, 14, YG, W.ungu, 10), teks("p3", xG(13) + 6.5, 92, "+3", 12, W.merah)),
      tambah("langkah,", busur("q2", 14, 15, YG, W.merah, 10)),
      tambah(J4_15, titikBil("e15", 15, YG, W.oranye)),
    ),
  ],
};

/* ------------------------------ 7. Number Line Jumps: terapan ------------------------------ */
const SUARA_L1 = "Igil menjumlah sembilan ditambah lima. Dari sembilan, lompat satu menuju sepuluh.";
const SUARA_L2 = "Lalu lompat empat lagi, mendarat di empat belas.";
const SUARA_L3 = "Cocok untuk melihat urutan langkah dengan jelas.";
const SUARA_L4 = "Kurang cocok bila bilangan kedua besar, karena lompatannya banyak.";
const [L1_9a, L1_5, L1_9b, L1_1, L1_10] = urutBilangan(SUARA_L1, [9, 5, 9, 1, 10]);
const [L2_4, L2_14] = urutBilangan(SUARA_L2, [4, 14]);
const BESAR = Array.from({ length: 15 }, (_, i) => busur(`m${i}`, 2 + i, 3 + i, YG, i % 2 ? W.ungu : W.merah, 8, 1.6));

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Number Line Jumps: sembilan ditambah lima",
  sumber: "Metode global: Number Line Jumps, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, ...kepala(2), ...garisAngka("gb", YG)),
      tambah("Igil", ...orang("ig", 30, 74, E.igil, "Igil")),
      tambah(L1_9a, teks("eq", 150, 74, "9 + 5", 16, W.biru)),
      sorotkan(L1_5, "eq"),
      tambah(L1_9b, titikBil("st", 9, YG)),
      tambah(L1_1, busur("j1", 9, 10, YG, W.merah, 12), teks("p1", xG(9) + 6.5, 98, "+1", 11, W.hijau)),
      ubah(L1_10, { id: "gb-a10", sorot: true }),
    ),
    k(
      SUARA_L2,
      ubah(0, { id: "gb-a10", sorot: false }, { id: "eq", sorot: false }),
      tambah(L2_4, busur("j2", 10, 14, YG, W.ungu, 16), teks("p4", xG(12), 90, "+4", 11, W.ungu)),
      tambah("mendarat", titikBil("ld", 14, YG, W.oranye)),
      ubah(L2_14, { id: "eq", isi: "9 + 5 = 14" }),
    ),
    k(
      SUARA_L3,
      tambah("Cocok", ...kartu("s1", 20, 150, 120, 22, W.hijauMuda, ["1. lompat ke 10"], 9.6)),
      tambah("langkah", ...kartu("s2", 160, 150, 120, 22, W.krem, ["2. lompat ke 14"], 9.6)),
    ),
    k(
      SUARA_L4,
      hapus(0, ...kid("s1"), ...kid("s2"), "j1", "j2", "p1", "p4", "st", "ld"),
      ubah(0, { id: "eq", isi: "2 + 15", warna: W.merah }),
      tambah("besar,", ...BESAR.slice(0, 8)),
      tambah("banyak.", ...BESAR.slice(8), teks("bk", 150, 56, "banyak lompatan", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga metode. Mana yang paling pas? Tergantung bilangannya.";
const SUARA_R2 = "Kembar Tambah Satu cocok bila dua bilangan hampir sama. Bagan cocok untuk langkah yang rapi.";
const SUARA_R3 = "Garis Bilangan cocok untuk melihat urutan lompatan. Ketiganya menggabungkan dua bilangan menjadi satu hasil.";
const SUARA_R4 = "Menurutmu, untuk sembilan ditambah sembilan, kamu pakai cara yang mana?";
const KARTU_R = [0, 1, 2].map((i) => kartu(`r${i}`, 20, 40 + i * 34, 260, 28, [W.hijauMuda, W.krem, W.pink][i], [`${i + 1}. ${NAMA_METODE[i]}`], 11));

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan: tiga metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mana yang paling pas?")),
      ...KARTU_R.map((kt, i) => tambah(["tiga", "Mana", "Tergantung"][i], ...kt)),
    ),
    k(
      SUARA_R2,
      tambah("Kembar", teks("c0", 150, 138, "hampir sama: Kembar Tambah Satu", 10, W.hijau)),
      sorotkan("Kembar", "r0-k"),
      tambah("Bagan", teks("c1", 150, 154, "langkah rapi: Bagan", 10, W.hijau)),
      sorotkan("Bagan", "r1-k"),
    ),
    k(
      SUARA_R3,
      ubah(0, { id: "r0-k", sorot: false }, { id: "r1-k", sorot: false }),
      tambah("Garis", teks("c2", 150, 170, "urutan lompatan: Garis Bilangan", 10, W.hijau)),
      sorotkan("Garis", "r2-k"),
      sorotkan("Ketiganya", "r0-k", "r1-k"),
      tambah("hasil.", emo("ok", 262, 186, E.benar, 18)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Menurutmu, cara yang mana?")),
      tambah("sembilan", teks("q", 150, 80, "9 + 9", 30, W.merah)),
      ...[0, 1, 2].map((i) => tambah(["kamu", "pakai", "cara"][i], ...kartu(`s${i}`, 20, 104 + i * 30, 260, 24, [W.hijauMuda, W.krem, W.pink][i], [NAMA_METODE[i]], 11))),
      tambah("mana?", emo("tn", 262, 80, E.tanya, 26)),
    ),
  ],
};
