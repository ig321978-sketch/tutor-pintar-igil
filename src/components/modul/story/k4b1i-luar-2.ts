import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, judul, kartu, panah, papanJadwal, pasir, teks, tokoh } from "./k4b1i-gambar";
import { hapus, k, redamkan, sorotkan, tambah } from "./k4b1i-bantu";

/*
 * Cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Kelas 4 Bab 1 Sub-Bab I), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1i.md. Bagian ini: Multiples List (Daftar Kelipatan) dan terapannya, Divisibility Check (Cek Bagi Habis) dan terapannya, dan ringkasan.
 */

const idKartu = (id: string): string[] => [`${id}-k`, `${id}-t0`];

/* ------------------------------ Multiples List: konsep ------------------------------ */
const SUARA_D1 = "Cara kedua, Multiples List, atau Daftar Kelipatan.";
const SUARA_D2 = "Kita menulis hasil kali bilangan itu dengan satu, dua, tiga, dan seterusnya.";
const SUARA_D3 = "Atau menambah bilangan itu berulang-ulang, dan mencatat setiap hasilnya.";
const SUARA_D4 = "Kita berhenti kalau sudah sampai batas yang diminta.";
const TIGA = [0, 3, 6, 9, 12];
const xTiga = (n: number): number => 30 + (n / 12) * 240;
const LONCAT3 = [0, 1, 2, 3].flatMap((i) => [panah(`lj${i}`, xTiga(3 * i), 96, xTiga(3) - xTiga(0), 0, W.ungu, 2.4, { z: 4 }), teks(`ll${i}`, xTiga(3 * i) + 30, 88, "+3", 9, W.ungu, { z: 4 })]);
const ID_D2 = [...["m1", "m2", "m3", "md"].flatMap(idKartu), "hd"];

export const ADEGAN_LUAR_DAFTAR: AdeganStory = {
  id: "luar-daftar",
  judul: "Multiples List: Daftar Kelipatan",
  sumber: "Metode global: Multiples List (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Cara 2: Multiples List"), ...pasir("hl", 150)),
      tambah("Multiples", emo("jr", 150, 104, E.daftar, 36)),
      tambah("Daftar", teks("nm", 150, 140, "Daftar Kelipatan", 13, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "jr", "nm"),
      tambah("hasil", teks("hd", 150, 40, "hasil kali bilangan", 11, W.ungu)),
      tambah("satu", ...kartu("m1", 80, 52, 140, 22, W.krem, ["3 x 1 = 3"], 10)),
      tambah("dua", ...kartu("m2", 80, 78, 140, 22, W.krem, ["3 x 2 = 6"], 10)),
      tambah("tiga", ...kartu("m3", 80, 104, 140, 22, W.krem, ["3 x 3 = 9"], 10)),
      tambah("seterusnya", ...kartu("md", 80, 130, 140, 22, W.krem, ["..."], 10)),
    ),
    k(
      SUARA_D3,
      hapus(0, ...ID_D2),
      tambah("menambah", garis("lg", xTiga(0), 110, xTiga(12) - xTiga(0), 0, W.biru, 2, { z: 1 }), ...TIGA.map((n) => garis(`lt${n}`, xTiga(n), 106, 0, 8, W.biru, 1.6, { z: 1 }))),
      tambah("berulang", ...LONCAT3),
      tambah("mencatat", ...TIGA.map((n) => teks(`ln${n}`, xTiga(n), 130, String(n), 10, W.biru))),
      sorotkan("hasilnya", ...TIGA.slice(1).map((n) => `ln${n}`)),
    ),
    k(
      SUARA_D4,
      tambah("berhenti", emo("sp", 270, 80, "\u{1F6D1}", 22)),
      tambah("batas", garis("bg", xTiga(12), 60, 0, 90, W.merah, 2.4, { z: 5 }), teks("bt", 262, 52, "batas", 10, W.merah)),
      tambah("diminta", teks("bh", 150, 160, "berhenti di batas", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Multiples List: terapan ------------------------------ */
const SUARA_E1 = "Genta menulis kelipatan lima sampai empat puluh.";
const SUARA_E2 = "Hasilnya lima, sepuluh, lima belas, dua puluh, dan seterusnya sampai empat puluh.";
const SUARA_E3 = "Cocok untuk jadwal yang berulang dan tetap.";
const SUARA_E4 = "Kurang cocok kalau batasnya sangat jauh, karena daftarnya jadi sangat panjang.";
const kartuLima = (i: number): Obj[] => kartu(`kl${i}`, 24 + i * 33, 90, 30, 26, W.hijauMuda, [String((i + 1) * 5)], 11);

export const ADEGAN_LUAR_DAFTAR_TERAPAN: AdeganStory = {
  id: "luar-daftar-terapan",
  judul: "Multiples List: terapan",
  sumber: "Metode global: Multiples List (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Kelipatan Lima"), ...pasir("hl", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("lima", teks("k5", 150, 44, "kelipatan 5", 12, W.ungu)),
      tambah("puluh", teks("b40", 150, 64, "sampai 40", 11, W.merah)),
    ),
    k(
      SUARA_E2,
      tambah("lima", ...kartuLima(0)),
      tambah("sepuluh", ...kartuLima(1)),
      tambah("belas", ...kartuLima(2)),
      tambah("puluh", ...kartuLima(3)),
      tambah("seterusnya", ...kartuLima(4), ...kartuLima(5), ...kartuLima(6)),
      tambah("puluh@2", ...kartuLima(7)),
    ),
    k(
      SUARA_E3,
      tambah(0, emo("ok", 262, 140, E.benar, 22)),
      tambah("jadwal", ...papanJadwal("jd", 90, 128, 120, 20, "JADWAL TETAP", 9)),
      tambah("berulang", emo("ul", 40, 134, "\u{1F501}", 20)),
    ),
    k(
      SUARA_E4,
      hapus(0, "ok", "jd", "jd-t", "ul"),
      tambah(0, emo("xs", 262, 140, E.salah, 22)),
      tambah("jauh", teks("jh", 150, 152, "batas 1000", 12, W.merah)),
      tambah("daftarnya", teks("dt", 150, 134, "... 995 1000", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Divisibility Check: konsep ------------------------------ */
const SUARA_F1 = "Cara ketiga, Divisibility Check, atau Cek Bagi Habis.";
const SUARA_F2 = "Untuk mengetahui apakah suatu bilangan faktor, kita membaginya dan melihat sisanya.";
const SUARA_F3 = "Kalau sisanya nol, bilangan itu faktor, dan kalau ada sisa, bukan faktor.";
const SUARA_F4 = "Pengujian ini sama dengan memeriksa apakah ada sisa pada pembagian.";

export const ADEGAN_LUAR_CEK: AdeganStory = {
  id: "luar-cek",
  judul: "Divisibility Check: Cek Bagi Habis",
  sumber: "Metode global: Divisibility Check (konsep)",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Cara 3: Divisibility Check"), ...pasir("hl", 150)),
      tambah("Divisibility", emo("jr", 150, 104, E.periksa, 36)),
      tambah("Cek", teks("nm", 150, 140, "Cek Bagi Habis", 13, W.ungu)),
    ),
    k(
      SUARA_F2,
      hapus(0, "jr", "nm"),
      tambah("apakah", ...kartu("qq", 60, 48, 180, 26, W.krem, ["apakah d faktor n?"], 10)),
      tambah("membaginya", teks("bg", 150, 100, "n : d = ...", 14, W.biru)),
      tambah("sisanya", teks("sx", 150, 128, "sisa = ?", 13, W.merah)),
    ),
    k(
      SUARA_F3,
      hapus(0, "qq-k", "qq-t0", "bg", "sx"),
      tambah("nol", ...kartu("ya", 14, 50, 100, 34, W.hijauMuda, ["sisa 0"], 12)),
      tambah("faktor", ...kartu("yb", 14, 92, 100, 34, W.hijauMuda, ["faktor"], 12), emo("oy", 132, 112, E.benar, 20)),
      tambah("sisa@2", ...kartu("za", 166, 50, 100, 34, W.pink, ["ada sisa"], 12)),
      tambah("bukan", ...kartu("zb", 166, 92, 100, 34, W.pink, ["bukan faktor"], 12), emo("oz", 284, 112, E.salah, 20)),
    ),
    k(
      SUARA_F4,
      hapus(0, "oy", "oz", ...["ya", "yb", "za", "zb"].flatMap(idKartu)),
      tambah(0, ...kartu("pg", 60, 52, 180, 26, W.krem, ["pengujian faktor"], 10)),
      tambah("memeriksa", emo("lp", 150, 110, E.lupa, 30)),
      tambah("sisa", teks("sk", 220, 114, "sisa?", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ Divisibility Check: terapan ------------------------------ */
const SUARA_G1 = "Satria menguji apakah tiga faktor dari tiga puluh enam.";
const SUARA_G2 = "Tiga puluh enam dibagi tiga sama dengan dua belas tanpa sisa, jadi tiga faktor tiga puluh enam.";
const SUARA_G3 = "Cocok untuk menguji satu bilangan dengan cepat.";
const SUARA_G4 = "Kurang cocok untuk mencari semua faktor, karena kita harus menguji satu per satu.";

export const ADEGAN_LUAR_CEK_TERAPAN: AdeganStory = {
  id: "luar-cek-terapan",
  judul: "Divisibility Check: terapan",
  sumber: "Metode global: Divisibility Check (terapan)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Uji Tiga"), ...pasir("hl", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("tiga", teks("a3", 90, 80, "3", 20, W.merah)),
      tambah("faktor", teks("af", 150, 80, "faktor dari", 11, W.biru)),
      tambah("enam", teks("a36", 220, 80, "36 ?", 20, W.merah)),
    ),
    k(
      SUARA_G2,
      hapus(0, "a3", "af", "a36"),
      tambah("dibagi", teks("d1", 150, 52, "36 : 3", 16, W.biru)),
      tambah("belas", teks("d2", 150, 78, "= 12", 16, W.biru)),
      tambah("sisa", teks("d3", 150, 104, "sisa 0", 13, W.hijauTua)),
      tambah("faktor", emo("ok", 230, 104, E.benar, 20), teks("d4", 150, 130, "3 faktor 36", 12, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus(0, "d1", "d2", "d3", "d4", "ok"),
      tambah(0, emo("ok", 262, 60, E.benar, 22)),
      tambah("satu", teks("sb", 150, 80, "1 bilangan", 13, W.ungu)),
      tambah("cepat", emo("pt", 150, 120, E.petir, 26)),
    ),
    k(
      SUARA_G4,
      hapus(0, "sb", "pt", "ok"),
      tambah(0, emo("xs", 262, 60, E.salah, 22)),
      tambah("semua", teks("u1", 70, 92, "1 ?", 11, W.biru), teks("u2", 110, 92, "2 ?", 11, W.biru), teks("u3", 150, 92, "3 ?", 11, W.biru), teks("u4", 190, 92, "4 ?", 11, W.biru), teks("u5", 230, 92, "...", 11, W.biru)),
      tambah("satu", teks("sp", 150, 130, "1 per 1", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Kak Yoga. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin mencari semua faktor, pakai Pasangan Faktor. Ingin membuat jadwal berulang, pakai Daftar Kelipatan.";
const SUARA_R3 = "Ingin menguji satu bilangan, pakai Cek Bagi Habis. Apa pun caranya, periksa sisanya.";
const SUARA_R4 = "Menurutmu, untuk mengetahui apakah tujuh faktor dari empat puluh dua, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara memilih",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu), ...pasir("hl", 150)),
      tambah("Yoga", ...tokoh("ky", 262, 184, "Kak Yoga")),
      tambah("lihat", ...kartu("r0", 14, 56, 86, 44, W.krem, ["Pasangan", "Faktor"], 9), ...kartu("r1", 107, 56, 86, 44, W.krem, ["Daftar", "Kelipatan"], 9), ...kartu("r2", 200, 56, 86, 44, W.krem, ["Cek Bagi", "Habis"], 9)),
      tambah("keadaan", teks("tq", 130, 130, "mana yang pas?", 11, W.ungu)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      sorotkan("Pasangan", "r0-k"),
      tambah("faktor", teks("h0", 57, 118, "semua faktor", 8.4, W.hijauTua)),
      redamkan("Daftar", "r0-k"),
      sorotkan("Daftar", "r1-k"),
      tambah("jadwal", teks("h1", 150, 118, "jadwal berulang", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      tambah("satu", teks("h2", 243, 118, "1 bilangan", 8.4, W.hijauTua)),
      sorotkan("Cek", "r2-k"),
      tambah("sisanya", emo("lp", 190, 140, E.lupa, 20)),
    ),
    k(
      SUARA_R4,
      hapus(0, "lp"),
      redamkan(0, "r2-k"),
      tambah("tujuh", teks("q7", 60, 142, "7", 18, W.merah)),
      tambah("faktor", teks("qf", 130, 142, "faktor dari", 11, W.biru)),
      tambah("dua", teks("q42", 200, 142, "42 ?", 18, W.merah)),
      tambah("pas", emo("tn", 250, 140, E.tanya, 20)),
    ),
  ],
};
