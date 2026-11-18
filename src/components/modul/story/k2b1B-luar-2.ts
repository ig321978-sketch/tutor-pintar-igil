import type { AdeganStory } from "./logika-story";
import { E, W, WK, bagan, emo, judul, kartu, kartuAngka, lantai, teks, tokoh } from "./k2b1B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b1B-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k2b1B-luar-1";

/* Video metode global Sub-Bab B: Place Value Chart (Bagan Puluhan dan Satuan), Expanded Form (Bentuk Panjang), dan ringkasan. */

/* ------------------------------ 4. Place Value Chart: konsep ------------------------------ */
const SUARA_G1 = "Cara kedua, Place Value Chart, atau Bagan Puluhan dan Satuan.";
const SUARA_G2 = "Bagan ini punya dua kolom, puluhan di kiri dan satuan di kanan.";
const SUARA_G3 = "Tulis satu angka di tiap kolom, sesuai banyak puluhan dan satuannya.";
const SUARA_G4 = "Letak angka menentukan artinya, jadi angka tidak boleh tertukar.";

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Place Value Chart: bagan puluhan dan satuan",
  sumber: "Metode global: Place Value Chart",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(1)),
      tambah("Place", ...bagan("bg", 88, 56, "", "")),
      tambah("Bagan", teks("bt", 150, 152, "Bagan Puluhan dan Satuan", 10, W.coklat)),
    ),
    k(
      SUARA_G2,
      hapus(0, "bt"),
      tambah("dua", ...kartu("k2", 98, 134, 104, 18, W.krem, ["2 kolom"], 9)),
      sorotkan("puluhan", "bg-kp"),
      tambah("kiri", teks("lk", 66, 104, "kiri", 9, W.merah)),
      sorotkan("satuan", "bg-ks"),
      tambah("kanan.", teks("lr", 234, 104, "kanan", 9, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus(0, "k2-k", "k2-t0", "lk", "lr"),
      tambah("satu", ...kartu("a1", 98, 134, 104, 18, W.krem, ["1 angka"], 9)),
      tambah("puluhan", teks("bg-ap", 119, 104, "2", 30, W.biru, { z: 1 })),
      tambah("satuannya.", teks("bg-as", 181, 104, "5", 30, W.biru, { z: 1 })),
    ),
    k(
      SUARA_G4,
      hapus(0, "a1-k", "a1-t0"),
      sorotkan("Letak", "bg-kp", "bg-ks"),
      tambah("artinya,", emo("lp", 262, 90, E.lampu, 24)),
      tambah("tidak", emo("sl", 150, 148, E.salah, 22)),
      ubah("tertukar.", { id: "bg-ap", isi: "5" }, { id: "bg-as", isi: "2" }),
    ),
  ],
};

/* ------------------------------ 5. Place Value Chart: terapan ------------------------------ */
const SUARA_Q1 = "Dika menulis tiga puluh enam. Angka tiga di kolom puluhan, angka enam di kolom satuan.";
const SUARA_Q2 = "Kalau angkanya tertukar jadi enam puluh tiga, artinya sudah berbeda jauh.";
const SUARA_Q3 = "Cocok untuk memeriksa angka mana yang ada di puluhan dan di satuan.";
const SUARA_Q4 = "Kurang cocok kalau bilangannya hanya satu angka, karena kolom puluhan akan kosong.";

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Bagan puluhan dan satuan: terapan",
  sumber: "Metode global: Place Value Chart (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1), lantai("tn", 150), ...tokoh("dk", 28, 150, E.dika, "Dika")),
      tambah("menulis", ...bagan("bg", 88, 56, "", "")),
      tambah("tiga", teks("n36", 256, 96, "3", 28, W.merah)),
      ubah("puluh", { id: "n36", isi: "30" }),
      ubah("enam.", { id: "n36", isi: "36" }),
      tambah(idx(SUARA_Q1, "tiga", 2), teks("bg-ap", 119, 104, "3", 30, W.biru, { z: 1 })),
      sorotkan(idx(SUARA_Q1, "kolom", 1), "bg-kp"),
      tambah(idx(SUARA_Q1, "enam", 2), teks("bg-as", 181, 104, "6", 30, W.biru, { z: 1 })),
      sorotkan(idx(SUARA_Q1, "kolom", 2), "bg-ks"),
    ),
    k(
      SUARA_Q2,
      ubah("tertukar", { id: "bg-ap", isi: "6" }, { id: "bg-as", isi: "3" }),
      ubah("enam", { id: "n36", isi: "6" }),
      ubah("puluh", { id: "n36", isi: "60" }),
      ubah("tiga,", { id: "n36", isi: "63" }),
      tambah("berbeda", teks("ne", 150, 176, "36 ≠ 63", 16, W.merah)),
      tambah("jauh.", emo("kg", 262, 130, E.kaget, 22)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "ne", "kg"),
      redamkan(0, "bg-kp", "bg-ks"),
      tambah("Cocok", emo("ok", 262, 66, E.benar, 24)),
      sorotkan("puluhan", "bg-kp"),
      sorotkan("satuan.", "bg-ks"),
    ),
    k(
      SUARA_Q4,
      hapus(0, "ok", "n36", "bg-ap"),
      ubah("hanya", { id: "bg-as", isi: "7" }),
      tambah("Kurang", emo("sl", 262, 66, E.salah, 24)),
      tambah("satu", ...kartu("a1", 98, 134, 104, 18, W.krem, ["1 angka"], 9)),
      tambah("kosong.", emo("tq", 119, 108, E.tanya, 26)),
    ),
  ],
};

/* ------------------------------ 6. Expanded Form: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Expanded Form, atau Bentuk Panjang.";
const SUARA_P2 = "Bilangan diuraikan menjadi puluhan ditambah satuan.";
const SUARA_P3 = "Misalnya empat puluh dua sama dengan empat puluh ditambah dua.";
const SUARA_P4 = "Dengan cara ini, arti tiap angka terlihat jelas dalam satu kalimat.";

export const ADEGAN_LUAR_PANJANG: AdeganStory = {
  id: "luar-panjang",
  judul: "Expanded Form: bentuk panjang",
  sumber: "Metode global: Expanded Form",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(2)),
      tambah("Expanded", ...kartu("ep", 30, 70, 240, 40, W.krem, ["Expanded Form"], 14)),
      tambah("Bentuk", ...kartu("bp", 30, 124, 240, 40, W.putih, ["Bentuk Panjang"], 14)),
    ),
    k(
      SUARA_P2,
      hapus(0, "ep-k", "ep-t0", "bp-k", "bp-t0"),
      tambah("Bilangan", ...kartu("u0", 14, 76, 80, 34, W.krem, ["bilangan"], 10)),
      tambah("diuraikan", teks("s1", 102, 100, "=", 18, W.merah)),
      tambah("puluhan", ...kartu("u1", 112, 76, 80, 34, WK.puluhan, ["puluhan"], 10)),
      tambah("ditambah", teks("s2", 200, 100, "+", 18, W.merah)),
      tambah("satuan.", ...kartu("u2", 210, 76, 80, 34, WK.satuan, ["satuan"], 10)),
    ),
    k(
      SUARA_P3,
      hapus(0, "u0-k", "u0-t0", "s1", "u1-k", "u1-t0", "s2", "u2-k", "u2-t0"),
      tambah("empat", teks("eq", 150, 100, "4", 26, W.merah)),
      ubah("puluh", { id: "eq", isi: "40" }),
      ubah("dua", { id: "eq", isi: "42" }),
      ubah("sama", { id: "eq", isi: "42 =" }),
      ubah(idx(SUARA_P3, "empat", 2), { id: "eq", isi: "42 = 4" }),
      ubah(idx(SUARA_P3, "puluh", 2), { id: "eq", isi: "42 = 40" }),
      ubah("ditambah", { id: "eq", isi: "42 = 40 +" }),
      ubah(idx(SUARA_P3, "dua", 2), { id: "eq", isi: "42 = 40 + 2" }),
    ),
    k(
      SUARA_P4,
      hapus(0, "eq"),
      tambah("Dengan", teks("p42", 62, 100, "42", 26, W.biru), teks("s1", 106, 100, "=", 22, W.merah)),
      tambah("cara", teks("p40", 156, 100, "40", 26, W.biru), teks("s2", 202, 100, "+", 22, W.merah), teks("p2", 238, 100, "2", 26, W.biru)),
      tambah("arti", teks("m1", 156, 128, "4 puluhan", 9.4, W.coklat), teks("m2", 238, 128, "2 satuan", 9.4, W.coklat)),
      sorotkan("terlihat", "p40", "p2"),
      tambah(idx(SUARA_P4, "satu"), ...kartu("kl", 90, 150, 120, 20, W.krem, ["1 kalimat"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Expanded Form: terapan ------------------------------ */
const SUARA_X1 = "Chacha menguraikan dua puluh sembilan menjadi dua puluh ditambah sembilan.";
const SUARA_X2 = "Lalu ia menyatukannya lagi, dua puluh ditambah sembilan sama dengan dua puluh sembilan.";
const SUARA_X3 = "Cocok untuk melatih menulis bilangan tanpa alat bantu.";
const SUARA_X4 = "Kurang cocok kalau kita belum paham arti puluhan, karena uraiannya tidak terlihat bendanya.";

export const ADEGAN_LUAR_PANJANG_TERAPAN: AdeganStory = {
  id: "luar-panjang-terapan",
  judul: "Bentuk panjang: terapan",
  sumber: "Metode global: Expanded Form (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, ...kepala(2), lantai("tn", 150), ...tokoh("ch", 24, 150, E.chacha, "Chacha")),
      tambah("dua", teks("eq", 150, 84, "2", 24, W.merah)),
      ubah("puluh", { id: "eq", isi: "20" }),
      ubah("sembilan", { id: "eq", isi: "29" }),
      ubah("menjadi", { id: "eq", isi: "29 =" }),
      ubah(idx(SUARA_X1, "dua", 2), { id: "eq", isi: "29 = 2" }),
      ubah(idx(SUARA_X1, "puluh", 2), { id: "eq", isi: "29 = 20" }),
      ubah("ditambah", { id: "eq", isi: "29 = 20 +" }),
      ubah(idx(SUARA_X1, "sembilan", 2), { id: "eq", isi: "29 = 20 + 9" }),
    ),
    k(
      SUARA_X2,
      tambah("menyatukannya", emo("tk", 150, 112, E.tukar, 18)),
      tambah(idx(SUARA_X2, "dua", 1), teks("e2", 150, 142, "2", 24, W.biru)),
      ubah("puluh", { id: "e2", isi: "20" }),
      ubah("ditambah", { id: "e2", isi: "20 +" }),
      ubah("sembilan", { id: "e2", isi: "20 + 9" }),
      ubah("sama", { id: "e2", isi: "20 + 9 =" }),
      ubah(idx(SUARA_X2, "dua", 2), { id: "e2", isi: "20 + 9 = 2" }),
      ubah(idx(SUARA_X2, "puluh", 2), { id: "e2", isi: "20 + 9 = 20" }),
      ubah(idx(SUARA_X2, "sembilan", 2), { id: "e2", isi: "20 + 9 = 29" }),
    ),
    k(
      SUARA_X3,
      hapus(0, "tk"),
      tambah("Cocok", emo("ok", 262, 66, E.benar, 24)),
      tambah("menulis", emo("ps", 262, 112, E.pensil, 24)),
      tambah("alat", emo("tg", 262, 150, E.jempol, 22)),
    ),
    k(
      SUARA_X4,
      ubah("Kurang", { id: "ok", isi: E.salah }),
      tambah("paham", emo("tq", 262, 84, E.tanya, 24)),
      tambah("uraiannya", emo("kb", 262, 150, E.kaca, 22)),
      tambah("bendanya.", emo("pk", 150, 112, E.pikir, 28)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung kebutuhan.";
const SUARA_R2 = "Ingin melihat bendanya, pakai Balok Puluhan dan Satuan. Ingin memeriksa letak angka, pakai Bagan Puluhan dan Satuan.";
const SUARA_R3 = "Ingin menulis tanpa alat, pakai Bentuk Panjang. Apa pun caranya, ingat selalu bahwa letak angka menentukan artinya.";
const SUARA_R4 = "Menurutmu, untuk menjelaskan arti angka tiga pada tiga puluh empat, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("3 cara, mana yang pas?")),
      tambah("tiga", ...kartu("r0", 14, 40, 244, 38, WARNA_METODE[0], [`1. ${NAMA_METODE[0]}`], 11)),
      tambah("cara.", ...kartu("r1", 14, 88, 244, 38, WARNA_METODE[1], [`2. ${NAMA_METODE[1]}`], 11)),
      tambah("pas?", ...kartu("r2", 14, 136, 244, 38, WARNA_METODE[2], [`3. ${NAMA_METODE[2]}`], 11)),
      tambah("kebutuhan.", emo("tq", 280, 100, E.tanya, 16)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      tambah("melihat", emo("ms", 280, 59, E.mata, 22)),
      ubah("Balok", { id: "r0-k", sorot: true }),
      tambah("memeriksa", emo("kc", 280, 107, E.kaca, 22)),
      ubah("Bagan", { id: "r1-k", sorot: true }),
    ),
    k(
      SUARA_R3,
      hapus(0, "ms", "kc"),
      tambah("menulis", emo("ps", 280, 155, E.pensil, 22)),
      ubah("Bentuk", { id: "r2-k", sorot: true }),
      tambah("letak", ...kartu("lt", 30, 178, 220, 18, W.putih, ["letak angka menentukan artinya"], 9)),
      tambah("artinya.", emo("lp", 280, 100, E.lampu, 22)),
    ),
    k(
      SUARA_R4,
      hapus(0, "ps", "lt-k", "lt-t0", "lp", "r0-k", "r0-t0", "r1-k", "r1-t0", "r2-k", "r2-t0"),
      tambah(0, ...kartu("c0", 10, 140, 88, 30, WARNA_METODE[0], ["Balok"], 9), ...kartu("c1", 106, 140, 88, 30, WARNA_METODE[1], ["Bagan"], 9), ...kartu("c2", 202, 140, 88, 30, WARNA_METODE[2], ["Bentuk Panjang"], 9)),
      tambah(idx(SUARA_R4, "tiga", 1), ...kartuAngka("k3", 122, 62, "3")),
      sorotkan(idx(SUARA_R4, "tiga", 2), "k3"),
      tambah("empat,", ...kartuAngka("k4", 158, 62, "4"), teks("t34", 140, 118, "34", 20, W.merah)),
      tambah("pilih", emo("pk", 262, 70, E.pikir, 26)),
      tambah("mana?", emo("tq", 150, 192, E.tanya, 18)),
    ),
  ],
};
