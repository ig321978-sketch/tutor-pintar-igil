import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, bandingan, bulat, emo, gs, judul, kartu, kotak, lantai, panah, teks, tokoh } from "./k2b1C-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k2b1C-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b1C-luar-1";

/* Video metode global Sub-Bab C "Dua Nampan untuk Pesta Kue": Benchmark Numbers (Bilangan Patokan), Bar Model (Model Batang), dan ringkasan. */

/* ------------------------------ Bilangan Patokan: papan patokan ------------------------------ */
const PATOK = [10, 20, 30, 40, 50];
/** Letak mendatar patokan dan bilangan lain pada garis patokan: sepuluh di x = 40, lima puluh di x = 260. */
const px = (n: number): number => Number((40 + 5.5 * (n - 10)).toFixed(1));
const Y_GARIS = 110;
const Y_BENDERA = 62;
const Y_TITIK = 122;
const tiangPatokan = (): Obj[] => [gs("pg", 28, Y_GARIS, 272, Y_GARIS, W.biru, 2.4), ...PATOK.map((n, i) => gs(`pt${i}`, px(n), Y_BENDERA, px(n), Y_GARIS, WK.kayuTua, 2.4))];
const benderaPatokan = (): Obj[] => PATOK.map((_, i) => kotak(`bd${i}`, px(PATOK[i]) - 15, Y_BENDERA, 30, 16, W.merahMuda, W.biru, { rx: 3, tebal: 1.4, z: 1 }));
const angkaBendera = (i: number): Obj => teks(`bn${i}`, px(PATOK[i]), Y_BENDERA + 12, String(PATOK[i]), 10, W.biru, { z: 2 });
/** Titik bilangan n pada garis patokan: bulatan `${id}` dan angka `${id}-n` di bawahnya. */
const titikPatokan = (id: string, n: number, warna: string, yAngka = 142): Obj[] => [bulat(id, px(n), Y_TITIK, 5, warna, W.biru, { z: 2 }), teks(`${id}-n`, px(n), yAngka, String(n), 11, warna === W.merah ? W.merah : W.biru, { z: 2 })];

/* ------------------------------ 4. Benchmark Numbers: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Benchmark Numbers, atau Bilangan Patokan.";
const SUARA_P2 = "Pilih bilangan patokan yang mudah, misalnya sepuluh, dua puluh, tiga puluh, empat puluh, atau lima puluh.";
const SUARA_P3 = "Lihat bilangan itu lebih dekat ke patokan yang mana.";
const SUARA_P4 = "Dari situ kita bisa memperkirakan mana yang lebih besar sebelum menghitung.";

export const ADEGAN_LUAR_PATOKAN: AdeganStory = {
  id: "luar-patokan",
  judul: "Benchmark Numbers: bilangan patokan",
  sumber: "Metode global: Benchmark Numbers",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara kedua"), lantai("lt", 150), kepala(1)),
      tambah("Benchmark", ...tiangPatokan()),
      tambah("Numbers,", ...benderaPatokan()),
      tambah("Bilangan", ...kartu("kp", 40, 128, 220, 20, W.krem, ["patokan = bilangan yang mudah"], 8.6)),
      tambah("Patokan.", emo("pn", 150, 56, "\u{1F4CD}", 14)),
    ),
    k(
      SUARA_P2,
      hapus("Pilih", "kp-k", "kp-t0", "pn"),
      tambah("mudah,", emo("ok", 150, 150, E.benar, 20)),
      tambah("sepuluh,", angkaBendera(0)),
      tambah("dua", angkaBendera(1)),
      tambah("tiga", angkaBendera(2)),
      tambah("empat", angkaBendera(3)),
      tambah("lima", angkaBendera(4)),
    ),
    k(
      SUARA_P3,
      hapus("Lihat", "ok"),
      tambah("bilangan", ...titikPatokan("t33", 33, W.merah)),
      tambah("dekat", panah("pa", px(33) - 4, Y_TITIK, px(30) + 6, Y_TITIK, W.merah)),
      sorotkan("patokan", "bd2"),
      tambah("mana?", emo("tn", 150, 172, E.tanya, 22)),
    ),
    k(
      SUARA_P4,
      hapus("Dari", "t33", "t33-n", "pa", "tn"),
      tambah("memperkirakan", ...titikPatokan("t23", 23, W.biru), ...titikPatokan("t46", 46, W.merah)),
      tambah("besar", emo("mk", px(46), 160, E.mahkota, 20)),
      tambah("menghitung.", ...kartu("pk", 50, 164, 200, 22, W.hijauMuda, ["perkiraan dulu, hitung kemudian"], 8.6)),
    ),
  ],
};

/* ------------------------------ 5. Benchmark Numbers: terapan ------------------------------ */
const SUARA_Q1 = "Nia membandingkan empat puluh enam dan dua puluh tiga.";
const SUARA_Q2 = "Empat puluh enam dekat dengan lima puluh, dan dua puluh tiga dekat dengan dua puluh.";
const SUARA_Q3 = "Jadi empat puluh enam jelas lebih besar. Cocok untuk perkiraan cepat kalau selisihnya jauh.";
const SUARA_Q4 = "Kurang cocok kalau bilangannya berdekatan, karena patokannya bisa sama.";

export const ADEGAN_LUAR_PATOKAN_TERAPAN: AdeganStory = {
  id: "luar-patokan-terapan",
  judul: "Benchmark Numbers: kapan dipakai",
  sumber: "Metode global: terapan Benchmark Numbers",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Bilangan patokan"), lantai("lt", 150), kepala(1), tiangPatokan(), benderaPatokan(), PATOK.map((_, i) => angkaBendera(i))),
      tambah("Nia", ...tokoh("ni", 28, 172, "nia")),
      tambah("empat", ...titikPatokan("a46", 46, W.merah)),
      tambah("dua", ...titikPatokan("a23", 23, W.biru)),
    ),
    k(
      SUARA_Q2,
      sorotkan("Empat", "a46"),
      tambah("lima", panah("pa", px(46) + 4, Y_TITIK, px(50) - 6, Y_TITIK, W.merah)),
      sorotkan("lima", "bd4"),
      sorotkan("dua", "a23"),
      tambah("dua@2", panah("pb", px(23) - 4, Y_TITIK, px(20) + 6, Y_TITIK, W.biru)),
      sorotkan("dua@2", "bd1"),
    ),
    k(
      SUARA_Q3,
      hapus("Jadi", "pa", "pb"),
      tambah("besar.", ...bandingan("bq", 150, 192, "46", ">", "23", 18, 36)),
      tambah("Cocok", ...kartu("cc", 50, 152, 200, 22, W.hijauMuda, ["cocok: selisih jauh"], 8.8)),
      tambah("cepat", emo("ok", 272, 160, E.benar, 20)),
    ),
    k(
      SUARA_Q4,
      hapus("Kurang", "a46", "a46-n", "a23", "a23-n", "cc-k", "cc-t0", "ok", "bq0", "bq1", "bq2"),
      redamkan("Kurang", "bd1", "bd4"),
      tambah("Kurang", emo("sl", 272, 160, E.salah, 20)),
      tambah("berdekatan,", ...titikPatokan("c41", 41, W.merah), ...titikPatokan("c43", 43, W.biru, 154)),
      tambah("patokannya", panah("pc", px(41), 106, px(40), 82, W.merah)),
      tambah("sama.", ...kartu("sm", 50, 162, 200, 22, W.merahMuda, ["patokannya sama: 40"], 8.8)),
    ),
  ],
};

/* ------------------------------ Bar Model: batang ------------------------------ */
const X0 = 70;
const batangKe = (id: string, y: number, n: number, sat: number, warna: string): Obj[] => [kotak(id, X0, y, Number((n * sat).toFixed(1)), 14, warna, W.biru, { rx: 2, tebal: 1.6 })];
const labelBatang = (id: string, y: number, n: number, sat: number, warna: string = W.biru): Obj => teks(`${id}-n`, Number((X0 + n * sat + 11).toFixed(1)), y + 11, String(n), 10, warna);

/* ------------------------------ 6. Bar Model: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Bar Model, atau Model Batang.";
const SUARA_B2 = "Setiap bilangan digambar sebagai batang panjang yang sesuai besarnya.";
const SUARA_B3 = "Letakkan batang-batang itu sejajar dari garis yang sama.";
const SUARA_B4 = "Batang yang lebih panjang berarti bilangan yang lebih besar.";

const BARIS = [64, 92, 120];
const NILAI = [12, 18, 24];
const WARNA_B = ["#BAE6FD", "#BBF7D0", "#FDE68A"];

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: model batang",
  sumber: "Metode global: Bar Model",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara ketiga"), lantai("lt", 160), kepala(2)),
      tambah("Bar", gs("dasar", X0, 56, X0, 148, W.biru, 2.6, { z: 1 })),
      tambah("atau", ...batangKe("bx", 92, 15, 6, WARNA_B[1])),
      tambah("Batang.", emo("bt", 190, 118, "\u{1F4CA}", 24)),
    ),
    k(
      SUARA_B2,
      hapus("Setiap", "bx", "bt"),
      tambah("digambar", ...batangKe("b0", BARIS[0], NILAI[0], 6, WARNA_B[0])),
      tambah("batang", ...batangKe("b1", BARIS[1], NILAI[1], 6, WARNA_B[1])),
      tambah("sesuai", ...batangKe("b2", BARIS[2], NILAI[2], 6, WARNA_B[2])),
      tambah("besarnya.", ...NILAI.map((n, i) => labelBatang(`b${i}`, BARIS[i], n, 6))),
    ),
    k(
      SUARA_B3,
      tambah("Letakkan", emo("tg", 40, 100, E.tangan, 20)),
      sorotkan("batang-batang", "b0", "b1", "b2"),
      sorotkan("garis", "dasar"),
      tambah("sama.", ...kartu("sj", 70, 150, 160, 20, W.krem, ["mulai dari garis yang sama"], 8.6)),
    ),
    k(
      SUARA_B4,
      hapus("Batang", "tg", "sj-k", "sj-t0"),
      sorotkan("panjang", "b2"),
      sorotkan("bilangan", "b2-n"),
      tambah("besar.", emo("mk", 232, 112, E.mahkota, 22)),
    ),
  ],
};

/* ------------------------------ 7. Bar Model: terapan ------------------------------ */
const SUARA_C1 = "Chacha menggambar batang untuk tiga puluh dan tiga puluh empat.";
const SUARA_C2 = "Batang tiga puluh empat lebih panjang empat petak.";
const SUARA_C3 = "Cocok kalau kita ingin melihat selisih dengan jelas.";
const SUARA_C4 = "Kurang cocok kalau bilangannya banyak sekali, karena batangnya terlalu padat.";

const SAT = 6;
const WARNA_RAPAT = ["#BAE6FD", "#BBF7D0", "#FDE68A", "#FBCFE8", "#DDD6FE", "#FED7AA", "#BAE6FD", "#BBF7D0", "#FDE68A"];

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: kapan dipakai",
  sumber: "Metode global: terapan Bar Model",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Model batang"), lantai("lt", 160), kepala(2)),
      tambah("Chacha", ...tokoh("ch", 28, 180, "chacha")),
      tambah("batang", gs("dasar", X0, 60, X0, 130, W.biru, 2.6, { z: 1 })),
      tambah("tiga", ...batangKe("c30", 70, 30, SAT, WARNA_B[0])),
      tambah("puluh", labelBatang("c30", 70, 30, SAT)),
      tambah("tiga@2", ...batangKe("c34", 98, 34, SAT, WARNA_B[1])),
      tambah("empat.", labelBatang("c34", 98, 34, SAT)),
    ),
    k(
      SUARA_C2,
      sorotkan("Batang", "c34"),
      tambah("lebih", kotak("sl", X0 + 30 * SAT, 98, 4 * SAT, 14, W.merahMuda, W.merah, { rx: 2, tebal: 1.6, z: 2 })),
      tambah("empat@2", teks("s4", X0 + 32 * SAT, 134, "4", 12, W.merah)),
      tambah("petak.", ...kartu("pk", 80, 142, 140, 20, W.krem, ["lebih panjang 4 petak"], 8.6)),
    ),
    k(
      SUARA_C3,
      hapus("Cocok", "pk-k", "pk-t0"),
      tambah("Cocok", emo("ok", 272, 160, E.benar, 20)),
      sorotkan("selisih", "sl"),
      tambah("jelas.", emo("kc", X0 + 32 * SAT, 76, E.kaca, 20)),
    ),
    k(
      SUARA_C4,
      hapus("Kurang", "c30", "c30-n", "c34", "c34-n", "sl", "s4", "ok", "kc", "dasar"),
      tambah("Kurang", emo("sal", 272, 160, E.salah, 20)),
      tambah("banyak", ...WARNA_RAPAT.slice(0, 5).map((w, i) => kotak(`r${i}`, X0, 58 + 9 * i, 40 + 14 * i, 7, w, W.biru, { rx: 1, tebal: 0.8 }))),
      tambah("sekali,", ...WARNA_RAPAT.slice(5).map((w, i) => kotak(`r${i + 5}`, X0, 58 + 9 * (i + 5), 40 + 14 * (i + 5), 7, w, W.biru, { rx: 1, tebal: 0.8 }))),
      tambah("padat.", ...kartu("pd", 60, 150, 180, 20, W.merahMuda, ["terlalu padat, sulit dibaca"], 8.6)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bilangannya.";
const SUARA_R2 = "Bilangannya berdekatan, pakai Garis Bilangan. Ingin perkiraan cepat, pakai Bilangan Patokan.";
const SUARA_R3 = "Ingin melihat selisihnya, pakai Model Batang. Apa pun caranya, periksa puluhannya dulu.";
const SUARA_R4 = "Menurutmu, untuk membandingkan empat puluh dan empat puluh lima, kamu pilih cara yang mana?";

const PILIH = [
  { atas: "bilangan berdekatan", bawah: "pakai Garis Bilangan" },
  { atas: "ingin perkiraan cepat", bawah: "pakai Bilangan Patokan" },
  { atas: "ingin melihat selisih", bawah: "pakai Model Batang" },
];
const LETAK_PILIH = [54, 94, 134];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("3 cara membandingkan"), lantai("lt", 150)),
      tambah("melihat", ...kartu("r0", 14, 40, 272, 28, WARNA_METODE[0], [`1. ${NAMA_METODE[0]} · ${NAMA_METODE_ID[0]}`], 9)),
      tambah("cara.", ...kartu("r1", 14, 76, 272, 28, WARNA_METODE[1], [`2. ${NAMA_METODE[1]} · ${NAMA_METODE_ID[1]}`], 9)),
      tambah("Mana", ...kartu("r2", 14, 112, 272, 28, WARNA_METODE[2], [`3. ${NAMA_METODE[2]} · ${NAMA_METODE_ID[2]}`], 9)),
      tambah("pas?", emo("tn", 150, 172, E.tanya, 24)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih cara yang pas")),
      tambah("Bilangannya", ...kartu("q0", 14, LETAK_PILIH[0], 272, 34, WARNA_METODE[0], [PILIH[0].atas, PILIH[0].bawah], 8.8)),
      sorotkan("Garis", "q0-k"),
      tambah("perkiraan", ...kartu("q1", 14, LETAK_PILIH[1], 272, 34, WARNA_METODE[1], [PILIH[1].atas, PILIH[1].bawah], 8.8)),
      sorotkan("Patokan.", "q1-k"),
    ),
    k(
      SUARA_R3,
      tambah("Ingin", ...kartu("q2", 14, LETAK_PILIH[2], 272, 34, WARNA_METODE[2], [PILIH[2].atas, PILIH[2].bawah], 8.8)),
      sorotkan("Model", "q2-k"),
      tambah("periksa", ...kartu("pu", 14, 176, 272, 20, W.emas, ["apa pun caranya: puluhan dulu"], 9)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara yang mana?")),
      tambah("empat", teks("n40", 80, 90, "40", 30, W.biru)),
      tambah("empat@2", teks("n45", 220, 90, "45", 30, W.biru)),
      tambah("kamu", ...[0, 1, 2].flatMap((i) => kartu(`pc${i}`, 14 + 94 * i, 126, 86, 32, WARNA_METODE[i], [NAMA_METODE_ID[i]], 8.4))),
      tambah("mana?", teks("qq", 150, 92, "?", 34, W.merah)),
    ),
  ],
};
