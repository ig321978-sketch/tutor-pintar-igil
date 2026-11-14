import type { AdeganStory, Aksi } from "./logika-story";
import { W, busurSemua, daftar, deret, emo, judul, kartu, mesin, muncul, teks } from "./k4b3b-gambar";
import { bersih, k, tambah } from "./k4b3b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pola bilangan",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 95–102",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana belajar pola bilangan dengan baik? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.",
      bersih(0),
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 30, 128, 240, 34, W.krem, ["pola bilangan: angka dari buku"], 9.4)),
    ),
    k(
      "Empat metode itu: Arithmetic Sequence, Function Machine, Table of Values, dan Number Line Jumps.",
      ...daftar("pm", "Empat metode", [
        { at: "Sequence,", t: "1. Arithmetic Sequence", w: W.hijauMuda, u: 9.6 },
        { at: "Machine,", t: "2. Function Machine", w: W.langit, u: 9.6 },
        { at: "Values,", t: "3. Table of Values", w: W.krem, u: 9.6 },
        { at: "Jumps.", t: "4. Number Line Jumps", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: berapa bedanya, aturan apa yang mengubah nomor menjadi bilangan, bagaimana mencatat nomor dan nilainya, dan bagaimana bilangan melompat di garis bilangan?",
      ...daftar("pq", "Empat pertanyaan", [
        { at: "bedanya,", t: "berapa bedanya?", w: W.hijauMuda, u: 9.6 },
        { at: "aturan", t: "aturan apa mengubah nomor jadi bilangan?", w: W.langit, u: 8.6 },
        { at: "mencatat", t: "bagaimana mencatat nomor dan nilai?", w: W.krem, u: 9 },
        { at: "melompat", t: "bagaimana bilangan melompat?", w: W.pink, u: 9.6 },
      ]),
    ),
  ],
};

/* ------------------------------ 2. Arithmetic Sequence: konsep ------------------------------ */
const AS = { bw: 36, gap: 18 };
const D_AS = deret("as", 24, 84, ["3", "5", "7", "9", "11"], AS);
const B_AS = busurSemua("as", 24, 84, ["+2", "+2", "+2", "+2"], AS);
export const ADEGAN_LUAR_AS: AdeganStory = {
  id: "luar-as",
  judul: "Arithmetic Sequence (Barisan Aritmetika Sederhana)",
  sumber: "Metode luar: Arithmetic Sequence",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Arithmetic Sequence atau Barisan Aritmetika Sederhana. Barisan bilangan yang selisih antarsukunya selalu sama, dan selisih itu disebut beda.",
      bersih(0),
      tambah(0, judul("Arithmetic Sequence")),
      tambah("Sederhana.", ...kartu("as1", 50, 30, 200, 28, W.krem, ["Barisan Aritmetika Sederhana"], 9)),
      ...muncul(D_AS, B_AS, ["Barisan@2", "bilangan", "yang", "selisih", "antarsukunya"], ["selalu", "sama,", "selisih@2", "itu"]),
      tambah("beda.", ...kartu("as2", 90, 130, 120, 28, W.hijauMuda, ["beda = +2"], 10.4)),
    ),
    k(
      "Suku pertama kita sebut a, beda kita sebut b. Suku ke-n adalah a ditambah n kurang satu kali b. Rumus ini berlaku untuk pola membesar dan mengecil, dengan beda negatif pada pola mengecil.",
      bersih(0),
      tambah(0, judul("Rumus suku ke-n")),
      tambah("pertama", ...kartu("as3", 12, 38, 132, 30, W.langit, ["a = suku pertama"], 9.4)),
      tambah("beda", ...kartu("as4", 156, 38, 132, 30, W.krem, ["b = beda"], 9.4)),
      tambah("ditambah", ...kartu("as5", 30, 86, 240, 36, W.hijauMuda, ["Un = a + (n − 1) × b"], 12)),
      tambah("negatif", ...kartu("as6", 30, 136, 240, 30, W.merahMuda, ["mengecil: b bernilai negatif"], 9.4)),
    ),
    k(
      "Cukup periksa satu beda, lalu pastikan sama di semua pasangan suku. Bila ada satu pasangan yang berbeda, barisan itu bukan aritmetika.",
      ...daftar("as7", "Memeriksa barisan", [
        { at: "satu", t: "1. hitung beda dua suku berurutan", w: W.hijauMuda, u: 9 },
        { at: "pastikan", t: "2. cek: semua pasangan beda sama?", w: W.krem, u: 9 },
        { at: "berbeda,", t: "3. ada yang beda: bukan aritmetika", w: W.merahMuda, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 3. Arithmetic Sequence: penerapan ------------------------------ */
type Kasus = { id: string; judul: string; vals: [string, string, string]; beda: string; kartuAB: string; rumus: string; warna: string; suara: string; kotakAt: string[]; busurAt: string[]; abAt: string; rumusAt: string };
const OPS3 = { bw: 44, gap: 28 };
function ketukanAS(c: Kasus) {
  const d = deret(c.id, 56, 76, c.vals, OPS3);
  const b = busurSemua(c.id, 56, 76, [c.beda, c.beda], OPS3);
  const aksi: Aksi[] = [
    bersih(0),
    tambah(0, judul(c.judul, c.warna === W.merahMuda ? W.merah : W.ungu)),
    ...muncul(d, b, c.kotakAt, c.busurAt),
    tambah(c.abAt, ...kartu(`${c.id}a`, 12, 118, 276, 30, W.krem, [c.kartuAB], 10)),
    tambah(c.rumusAt, ...kartu(`${c.id}r`, 12, 158, 276, 32, c.warna, [c.rumus], 11)),
  ];
  return k(c.suara, ...aksi);
}
export const ADEGAN_LUAR_AS_TERAPAN: AdeganStory = {
  id: "luar-as-terapan",
  judul: "Arithmetic Sequence diterapkan pada angka buku",
  sumber: "Metode luar: Arithmetic Sequence pada soal Buku Siswa",
  latar: "#F0FDF4",
  ketukan: [
    ketukanAS({
      id: "ae",
      judul: "Telur: a dan b",
      vals: ["20", "28", "36"],
      beda: "+8",
      kartuAB: "a = 20, b = 8",
      rumus: "hari 5: 20 + 4 × 8 = 52",
      warna: W.hijauMuda,
      suara: "Telur: dua puluh, dua puluh delapan, tiga puluh enam. Bedanya delapan. Hari kelima: dua puluh tambah empat kali delapan sama dengan lima puluh dua.",
      kotakAt: ["puluh,", "delapan,", "enam."],
      busurAt: ["Bedanya", "delapan@2"],
      abAt: "Bedanya",
      rumusAt: "kelima:",
    }),
    ketukanAS({
      id: "ab",
      judul: "Kursi bioskop: a dan b",
      vals: ["10", "14", "18"],
      beda: "+4",
      kartuAB: "a = 10, b = 4",
      rumus: "baris 10: 10 + 9 × 4 = 46",
      warna: W.hijauMuda,
      suara: "Kursi bioskop: sepuluh, empat belas, delapan belas. Bedanya empat. Baris kesepuluh: sepuluh tambah sembilan kali empat sama dengan empat puluh enam.",
      kotakAt: ["sepuluh,", "belas,", "belas@2"],
      busurAt: ["Bedanya", "empat@2"],
      abAt: "Bedanya",
      rumusAt: "Baris",
    }),
    ketukanAS({
      id: "ak",
      judul: "Kelapa: a dan b negatif",
      vals: ["36", "31", "26"],
      beda: "−5",
      kartuAB: "a = 36, b = −5",
      rumus: "hari 7: 36 − 6 × 5 = 6",
      warna: W.merahMuda,
      suara: "Kelapa: tiga puluh enam, tiga puluh satu, dua puluh enam. Bedanya kurang lima. Hari ketujuh: tiga puluh enam kurang enam kali lima sama dengan enam.",
      kotakAt: ["enam,", "satu,", "enam@2"],
      busurAt: ["Bedanya", "lima."],
      abAt: "Bedanya",
      rumusAt: "Hari",
    }),
    ketukanAS({
      id: "ag",
      judul: "Kursi gedung: a dan b",
      vals: ["20", "23", "26"],
      beda: "+3",
      kartuAB: "a = 20, b = 3",
      rumus: "baris 7: 20 + 6 × 3 = 38",
      warna: W.hijauMuda,
      suara: "Kursi gedung: dua puluh, dua puluh tiga, dua puluh enam. Bedanya tiga. Baris ketujuh: dua puluh tambah enam kali tiga sama dengan tiga puluh delapan.",
      kotakAt: ["puluh,", "tiga,", "enam."],
      busurAt: ["Bedanya", "tiga@2"],
      abAt: "Bedanya",
      rumusAt: "Baris",
    }),
  ],
};

/* ------------------------------ 4. Function Machine: konsep ------------------------------ */
export const ADEGAN_LUAR_FM: AdeganStory = {
  id: "luar-fm",
  judul: "Function Machine (Mesin Fungsi)",
  sumber: "Metode luar: Function Machine",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Function Machine atau Mesin Fungsi. Nomor urutan dimasukkan ke mesin, aturan di dalam mesin mengubahnya, dan keluarlah suku pada urutan itu.",
      bersih(0),
      tambah(0, judul("Function Machine")),
      tambah("Mesin", ...mesin("fa", 100, 70, "aturan mesin", 100, 44)),
      tambah("dimasukkan", teks("fai", 52, 82, "urutan n", 9.6, W.coklat)),
      tambah("keluarlah", teks("fao", 262, 82, "suku", 9.6, W.hijau)),
      tambah("Fungsi.", ...kartu("fak", 60, 140, 180, 28, W.krem, ["Mesin Fungsi"], 10.4)),
    ),
    k(
      "Aturan mesin biasanya berbentuk kali beda, lalu tambah atau kurang bilangan tetap. Beda dua berarti mesin mengalikan urutan dengan dua.",
      bersih(0),
      tambah(0, judul("Bentuk aturan mesin")),
      tambah("Aturan", ...mesin("fb", 90, 60, "× b ± c", 120, 44)),
      tambah("dua", ...kartu("fbk", 40, 128, 220, 30, W.hijauMuda, ["beda 2: kali 2"], 10.4)),
    ),
    k(
      "Cara mencari aturannya: lihat bedanya, lalu cocokkan dengan suku pertama. Bila cocok, aturan itu berlaku untuk urutan mana pun.",
      ...daftar("fc", "Mencari aturan mesin", [
        { at: "bedanya,", t: "1. lihat bedanya: itu pengali", w: W.hijauMuda, u: 9.4 },
        { at: "cocokkan", t: "2. cocokkan dengan suku pertama", w: W.krem, u: 9.4 },
        { at: "mana", t: "3. cocok: berlaku untuk semua urutan", w: W.langit, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 5. Function Machine: penerapan ------------------------------ */
type KasusFM = { id: string; judul: string; aturan: string; masuk: string; keluar: string; suara: string; mesinAt: string; masukAt: string; eq: string; eqAt: string; keluarAt: string; catatan: string; catatanAt: string; warna: string };
function ketukanFM(c: KasusFM) {
  return k(
    c.suara,
    bersih(0),
    tambah(0, judul(c.judul)),
    tambah(c.mesinAt, ...mesin(c.id, 100, 56, c.aturan, 110, 44)),
    tambah(c.masukAt, teks(`${c.id}i`, 52, 84, c.masuk, 12, W.coklat)),
    tambah(c.eqAt, ...kartu(`${c.id}e`, 12, 124, 276, 30, W.krem, [c.eq], 10.4)),
    tambah(c.keluarAt, teks(`${c.id}o`, 262, 84, c.keluar, 12, W.hijau)),
    tambah(c.catatanAt, ...kartu(`${c.id}c`, 12, 162, 276, 28, c.warna, [c.catatan], 9.4)),
  );
}
export const ADEGAN_LUAR_FM_TERAPAN: AdeganStory = {
  id: "luar-fm-terapan",
  judul: "Function Machine diterapkan pada angka buku",
  sumber: "Metode luar: Function Machine pada soal Buku Siswa",
  latar: "#EFF6FF",
  ketukan: [
    ketukanFM({
      id: "fa",
      judul: "Pola 3, 5, 7, 9, 11",
      aturan: "× 2 + 1",
      masuk: "6",
      keluar: "13",
      suara: "Pola tiga, lima, tujuh, sembilan, sebelas punya aturan: kali dua tambah satu. Masukan enam: enam kali dua tambah satu sama dengan tiga belas. Cocok dengan buku.",
      mesinAt: "aturan:",
      masukAt: "Masukan",
      eq: "6 × 2 + 1 = 13",
      eqAt: "enam@2",
      keluarAt: "belas@2",
      catatan: "cocok: suku ke-6 buku adalah 13",
      catatanAt: "Cocok",
      warna: W.hijauMuda,
    }),
    ketukanFM({
      id: "fb",
      judul: "Rak buku Ali",
      aturan: "× 4 + 1",
      masuk: "5",
      keluar: "21",
      suara: "Rak buku: lima, sembilan, tiga belas. Aturannya kali empat tambah satu. Rak kelima: lima kali empat tambah satu sama dengan dua puluh satu.",
      mesinAt: "Aturannya",
      masukAt: "kelima:",
      eq: "5 × 4 + 1 = 21",
      eqAt: "lima@3",
      keluarAt: "satu@3",
      catatan: "rak 1: 1 × 4 + 1 = 5 cocok",
      catatanAt: "Rak@2",
      warna: W.hijauMuda,
    }),
    ketukanFM({
      id: "fk",
      judul: "Kursi gedung pertemuan",
      aturan: "× 3 + 17",
      masuk: "7",
      keluar: "38",
      suara: "Kursi gedung: dua puluh, dua puluh tiga, dua puluh enam. Aturannya kali tiga tambah tujuh belas. Baris ketujuh: tujuh kali tiga tambah tujuh belas sama dengan tiga puluh delapan.",
      mesinAt: "Aturannya",
      masukAt: "ketujuh:",
      eq: "7 × 3 + 17 = 38",
      eqAt: "tujuh@3",
      keluarAt: "delapan.",
      catatan: "baris 1: 1 × 3 + 17 = 20 cocok",
      catatanAt: "Baris",
      warna: W.hijauMuda,
    }),
    k(
      "Produksi televisi mengecil: aturannya tujuh puluh enam kurang enam kali urutan. Juni urutan keenam: tujuh puluh enam kurang tiga puluh enam sama dengan empat puluh. Agustus urutan kedelapan: kurang empat puluh delapan sama dengan dua puluh delapan.",
      bersih(0),
      tambah(0, judul("Produksi televisi", W.merah)),
      tambah("aturannya", ...mesin("ft", 100, 50, "76 − 6 × n", 110, 44)),
      tambah("Juni", ...kartu("fte", 12, 112, 276, 30, W.krem, ["Juni: 76 − 6 × 6 = 40"], 10.4)),
      tambah("Agustus", ...kartu("ftf", 12, 150, 276, 30, W.merahMuda, ["Agustus: 76 − 6 × 8 = 28"], 10.4)),
    ),
  ],
};
