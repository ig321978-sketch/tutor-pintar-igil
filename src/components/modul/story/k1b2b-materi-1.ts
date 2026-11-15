import type { AdeganStory } from "./logika-story";
import { W, apelDua, emo, judul, kartu, kelompok, keranjang, teks, tata } from "./k1b2b-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah } from "./k1b2b-bantu";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Kira membawa sebuah keranjang.";
const SUARA_C2 = "Di dalam keranjang Kira ada lima buah apel. Tiga apel berwarna merah dan dua apel berwarna hijau.";
const SUARA_C3 = "Igil bertanya, berapa semuanya kalau apel itu digabung? Bagaimana caramu menjumlahkan?";
const SUARA_C4 = "Hari ini kita belajar tiga hal. Pertama, pasangan bilangan. Kedua, maju dari bilangan pertama. Ketiga, bilangan kembar.";
const SUARA_C5 = "Kita memakai bilangan yang kecil saja. Pelan-pelan, ya. Kalau bingung, kita ulangi lagi, tidak apa-apa.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Kira dan keranjang apel di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), { id: "tanah", t: "garis", x: 14, y: 142, x2: 272, y2: 0, warna: W.hijau, tebal: 3 }),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
      tambah("keranjang.", ...keranjang("kz", 110, 154, 80, 34)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Keranjang Kira")),
      tambah("keranjang", ...keranjang("ck", 70, 110, 160, 56)),
      tambah("Tiga", ...kelompok("apel", "cm", 3, 100, 100, 30, 12)),
      tambah("dua", ...kelompok("apelhijau", "ch", 2, 100, 190, 30, 12)),
      tambah("merah", teks("tm", 130, 184, "3 merah", 9.4, W.merah)),
      tambah("hijau.", teks("th", 205, 184, "2 hijau", 9.4, W.hijau)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Berapa semuanya?"), emo("ig3", 150, 90, "\u{1F989}", 44)),
      tambah("Bagaimana", ...kartu("cq", 50, 130, 200, 30, W.emas, ["Bagaimana caramu?"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Tiga hal hari ini")),
      tambah("Pertama,", ...kartu("h1", 20, 36, 260, 36, W.langit, ["Pasangan bilangan"], 10)),
      tambah("Kedua,", ...kartu("h2", 20, 82, 260, 36, W.hijauMuda, ["Maju dari bilangan pertama"], 10)),
      tambah("Ketiga,", ...kartu("h3", 20, 128, 260, 36, W.pink, ["Bilangan kembar"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Pelan-pelan saja"), emo("kura", 150, 100, "\u{1F422}", 50)),
      tambah(idx(SUARA_C5, "ulangi"), ...kartu("ap", 60, 130, 180, 30, W.krem, ["tidak apa-apa"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Menggabungkan apel: tanda tambah dan sama dengan ------------------------------ */
const SUARA_G1 = "Sekarang kita lihat dua keranjang kecil. Keranjang pertama berisi tiga apel merah.";
const SUARA_G2 = "Keranjang kedua berisi dua apel hijau. Dua keranjang ini akan kita gabungkan.";
const SUARA_G3 = "Semua apel kita letakkan dalam sebuah baris. Satu, dua, tiga, empat, lima. Semuanya ada lima apel.";
const SUARA_G4 = "Tiga apel ditambah dua apel. Kata ditambah kita tulis dengan tanda tambah, di antara tiga dan dua.";
const SUARA_G5 = "Kata sama dengan kita tulis dengan dua garis kecil. Jadi tiga tambah dua sama dengan lima.";
const SUARA_G6 = "Lima ini kita sebut jumlah. Jumlah adalah hasil dari menggabungkan dua bagian.";
const SUARA_G7 = "Itulah penjumlahan. Dua bagian digabung, lalu kita cari jumlahnya.";
const P5 = tata(5, 100);

export const ADEGAN_GABUNG: AdeganStory = {
  id: "gabung",
  judul: "Menggabungkan apel merah dan apel hijau",
  sumber: "Materi: menggabungkan dan tanda tambah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Dua keranjang kecil")),
      tambah("pertama", ...keranjang("g1", 20, 100, 110, 44)),
      tambah("tiga", ...kelompok("apel", "ga", 3, 86, 45, 30, 11)),
      tambah("merah.", teks("gl1", 75, 164, "3 apel merah", 9.4, W.merah)),
    ),
    k(
      SUARA_G2,
      tambah("kedua", ...keranjang("g2", 170, 100, 110, 44)),
      tambah(idx(SUARA_G2, "dua", 1), ...kelompok("apelhijau", "gb", 2, 86, 200, 30, 11)),
      tambah("hijau.", teks("gl2", 225, 164, "2 apel hijau", 9.4, W.hijau)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Semua apel")),
      tambah("baris.", ...apelDua("ap", 100, 50, 50, 3, 2, 13)),
      ...hitungAksi(SUARA_G3, "ap", P5, "baris."),
      tambah("Semuanya", teks("lm", 150, 186, "ada 5 apel", 12, W.ungu)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Tanda tambah")),
      tambah("Tiga", teks("f3", 55, 110, "3", 44, W.merah)),
      tambah("dua", teks("f2", 155, 110, "2", 44, W.merah)),
      tambah("tanda", teks("fp", 105, 110, "+", 44, W.hijau)),
      tambah("tambah,", ...kartu("fk", 60, 140, 180, 30, W.emas, ["ditambah = +"], 11)),
    ),
    k(
      SUARA_G5,
      hapus(0, "fk-k", "fk-t0"),
      tambah("garis", teks("fe", 205, 110, "=", 44, W.hijau)),
      tambah("lima.", teks("f5", 255, 110, "5", 44, W.merah)),
      tambah("sama", ...kartu("fm", 60, 140, 180, 30, W.krem, ["sama dengan = ="], 11)),
    ),
    k(
      SUARA_G6,
      hapus(0, "fm-k", "fm-t0"),
      sorotkan("jumlah.", "f5"),
      tambah(idx(SUARA_G6, "jumlah", 2), ...kartu("fj", 80, 140, 140, 30, W.hijauMuda, ["5 adalah jumlah"], 11)),
    ),
    k(
      SUARA_G7,
      bersih(0),
      tambah(0, judul("Penjumlahan"), emo("ow7", 150, 76, "\u{1F989}", 44)),
      tambah("Dua", ...kartu("gz", 30, 104, 240, 46, W.langit, ["gabungkan dua bagian", "cari jumlahnya"], 10.5)),
    ),
  ],
};

/* ------------------------------ 3. Tukar tempat dan pasangan bilangan ------------------------------ */
const SUARA_T1 = "Sekarang kita tukar tempat apelnya. Apel hijau di kiri, apel merah di kanan.";
const SUARA_T2 = "Dua apel hijau, lalu tiga apel merah. Kita gabungkan lagi, dan jumlahnya tetap lima.";
const SUARA_T3 = "Jadi dua tambah tiga sama dengan lima. Hasilnya sama dengan tiga tambah dua. Boleh ditukar tempat.";
const SUARA_T4 = "Dua bilangan yang digabung disebut pasangan bilangan. Dua dan tiga adalah pasangan bilangan untuk lima.";
const SUARA_T5 = "Lima apel punya pasangan lain. Satu dan empat. Dua dan tiga. Tiga dan dua. Empat dan satu.";
const SUARA_T6 = "Semua pasangan itu jumlahnya lima. Pasangan bilangan boleh ditukar tempat, jumlahnya tidak berubah.";
const PASANGAN5: [string, number][] = [["1 + 4", idx(SUARA_T5, "satu", 1)], ["2 + 3", idx(SUARA_T5, "dua", 1)], ["3 + 2", idx(SUARA_T5, "tiga", 2)], ["4 + 1", idx(SUARA_T5, "empat", 2)]];
const WARNA_P = [W.langit, W.hijauMuda, W.pink, W.krem];

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar",
  judul: "Tukar tempat: pasangan bilangan",
  sumber: "Materi: pasangan bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tukar tempat")),
      tambah("hijau", ...apelDua("tk", 90, 50, 50, 2, 3, 13).map((o, i) => (i < 2 ? { ...o, isi: "\u{1F34F}" } : { ...o, isi: "\u{1F34E}" }))),
      tambah("kanan.", teks("tz", 150, 150, "hijau di kiri, merah di kanan", 9.4, W.ungu)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Dua tambah tiga")),
      tambah("Dua", teks("u2", 70, 110, "2", 44, W.merah)),
      tambah("tiga", teks("u3", 150, 110, "3", 44, W.merah)),
      tambah("jumlahnya", teks("up", 110, 110, "+", 44, W.hijau)),
      tambah("lima.", teks("ue", 190, 110, "=", 44, W.hijau), teks("u5", 235, 110, "5", 44, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Boleh ditukar")),
      tambah("dua", teks("v1", 150, 76, "2 + 3 = 5", 30, W.hijau)),
      tambah("tiga", teks("v2", 150, 130, "3 + 2 = 5", 30, W.hijau)),
      tambah("Boleh", emo("ow3", 262, 190, "\u{1F989}", 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Pasangan bilangan")),
      tambah("Dua", teks("w1", 80, 100, "2", 48, W.merah), teks("w2", 220, 100, "3", 48, W.merah)),
      tambah("pasangan", ...kartu("wk", 40, 130, 220, 34, W.emas, ["pasangan untuk 5"], 11)),
    ),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Pasangan untuk lima")),
      ...PASANGAN5.map(([t, at], i) => tambah(at, ...kartu(`pr${i}`, 10 + i * 72, 60, 66, 34, WARNA_P[i], [t], 11), teks(`ph${i}`, 43 + i * 72, 120, "= 5", 14, W.merah))),
    ),
    k(
      SUARA_T6,
      bersih(0),
      tambah(0, judul("Jumlahnya tetap"), emo("ow6", 150, 76, "\u{1F989}", 44)),
      tambah("ditukar", ...kartu("tt", 30, 108, 240, 46, W.hijauMuda, ["pasangan ditukar tempat", "jumlah tidak berubah"], 10.5)),
    ),
  ],
};
