import type { AdeganStory } from "./logika-story";
import { W, deret, emo, idDeret, judul, kartu, kelompok, teks } from "./k4b1g-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, warnai } from "./k4b1g-bantu";

export const NAMA_METODE = ["Equal Groups", "Array Model", "Times Table Fluency", "Doubling"];
export const NAMA_METODE_ID = ["Kelompok Sama Banyak", "Model Susunan", "Kefasihan Tabel Kali", "Penggandaan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
export const IKON_METODE = ["🍩", "🧮", "🔢", "🔁"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita menghitung benda yang tersusun dalam kelompok sama, seperti dua belas kotak donat berisi empat donat? Guru di berbagai negara punya cara berbeda. Video ini memperlihatkan empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Equal Groups, Array Model, Times Table Fluency, dan Doubling.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Kelompok Sama Banyak, Model Susunan, Kefasihan Tabel Kali, dan Penggandaan. Metode keempat adalah tambahan yang cocok dengan soal pensil dan donat di buku.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: berapa jumlah seluruhnya? Dengan menjumlahkan kelompok sama, membaca baris dan kolom, mengingat fakta kali, dan menggandakan angka.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk perkalian",
  sumber: "Metode luar: pembuka; BS hlm. 39–43",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("kotak", ...kelompok("po", 22, 34, 12, 4, 6, 40, 30, 2, W.pink, W.krem)),
      tambah("berisi", teks("poq", 150, 132, "12 × 4 = ?", 16, W.merah)),
      tambah("berbagai", emo("pog", 250, 182, "🌍", 30)),
      tambah("empat@2", ...kartu("pok", 20, 150, 180, 30, W.emas, ["4 metode dari luar"], 9.6)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Equal", "Array", "Times", "Doubling"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Kelompok", "Susunan", "Kefasihan", "Penggandaan"][i], ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("tambahan", emo("n4", 270, 140, "⭐", 18)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menjumlahkan", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "jumlah kelompok", 7.6, W.biru)),
      tambah("membaca", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "baris dan kolom", 7.6, W.biru)),
      tambah("mengingat", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "fakta kali", 7.6, W.biru)),
      tambah("menggandakan", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "gandakan", 7.6, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 40, 136, 220, 30, W.emas, ["berapa jumlah seluruhnya?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Equal Groups: konsep ------------------------------ */
const SUARA_G1 = "Metode pertama, Equal Groups, atau Kelompok Sama Banyak. Perkalian berarti sejumlah kelompok yang masing-masing berisi sama banyak.";
const SUARA_G2 = "Langkah pertama: hitung banyak kelompok, yaitu dua belas kotak. Langkah kedua: lihat isi tiap kelompok, yaitu empat donat.";
const SUARA_G3 = "Langkah ketiga: tambahkan isi kelompok sebanyak kelompoknya. Empat ditambah berulang dua belas kali, hasilnya empat puluh delapan donat.";
const SUARA_G4 = "Jadi perkalian adalah cara singkat menulis penjumlahan berulang: dua belas kali empat sama dengan empat puluh delapan.";

export const ADEGAN_LUAR_KELOMPOK: AdeganStory = {
  id: "luar-kelompok",
  judul: "Equal Groups: kelompok sama banyak",
  sumber: "Metode luar: Equal Groups",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, kepala(0)),
      tambah("sejumlah", ...kelompok("eg", 22, 58, 12, 4, 6, 40, 30, 2, W.pink, W.krem)),
      tambah("masing-masing", teks("egt", 150, 146, "12 kelompok, tiap kelompok 4", 9.6, W.biru)),
    ),
    k(
      SUARA_G2,
      tambah("hitung", teks("eg1", 150, 164, "banyak kelompok: 12", 10, W.hijau)),
      tambah("isi", teks("eg2", 150, 182, "isi tiap kelompok: 4", 10, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus("Langkah", "eg1", "eg2"),
      tambah("tambahkan", ...kartu("egk", 40, 160, 220, 36, W.emas, ["4 + 4 + ... + 4  (12 suku)", "hasil: 48 donat"], 9)),
      sorotkan("hasilnya", "egt"),
    ),
    k(
      SUARA_G4,
      ubah("Jadi", { id: "egk-t1", isi: "12 × 4 = 48", warna: W.hijau, u: 11 }),
    ),
  ],
};

/* ------------------------------ 3. Equal Groups: penerapan ------------------------------ */
const SUARA_H1 = "Terapan: soal ayam Asep. Ada dua belas kelompok ayam, tiap kelompok menghabiskan tiga mangkok makanan.";
const SUARA_H2 = "Tambahkan tiga sebanyak dua belas kali, hasilnya tiga puluh enam mangkok.";
const SUARA_H3 = "Sekarang soal kucing Azizah: dua puluh satu kelompok, tiap kelompok empat kaki. Empat ditambah berulang dua puluh satu kali sama dengan delapan puluh empat.";
const SUARA_H4 = "Dalam perkalian, tulis dua puluh satu kali empat. Hasilnya delapan puluh empat kaki, cocok dengan kunci buku.";

export const ADEGAN_LUAR_KELOMPOK_TERAPAN: AdeganStory = {
  id: "luar-kelompok-terapan",
  judul: "Equal Groups: ayam Asep dan kucing Azizah",
  sumber: "Metode luar: Equal Groups, soal buku",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, kepala(0)),
      tambah("dua", ...kelompok("ea", 22, 58, 12, 3, 6, 40, 30, 3, W.jingga, W.hijauMuda)),
      tambah("tiga", teks("eat", 150, 146, "12 kelompok, tiap kelompok 3 mangkok", 9.6, W.biru)),
    ),
    k(
      SUARA_H2,
      tambah("Tambahkan", teks("eas", 150, 170, "3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 = 36", 8, W.hijau)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, kepala(0)),
      tambah("Azizah:", ...kelompok("ec", 8, 58, 21, 4, 7, 38, 22, 2, W.hitam, W.krem)),
      tambah("tiap", teks("ect", 150, 152, "21 kelompok, tiap kelompok 4 kaki", 9.6, W.biru)),
      tambah("delapan", teks("ecs", 150, 174, "4 + 4 + ... + 4  (21 suku) = 84", 10, W.merah)),
    ),
    k(
      SUARA_H4,
      tambah("tulis", teks("ech", 150, 196, "21 × 4 = 84 kaki", 12, W.hijau)),
      sorotkan("Hasilnya", "ecs"),
    ),
  ],
};

/* ------------------------------ 4. Array Model: konsep ------------------------------ */
const SUARA_A1 = "Metode kedua, Array Model, atau Model Susunan. Benda disusun dalam baris dan kolom yang rapi, lalu jumlahnya adalah banyak baris kali banyak kolom.";
const SUARA_A2 = "Donat tadi bisa disusun empat baris dan dua belas kolom. Empat kali dua belas sama dengan dua belas kali empat, jadi urutannya boleh ditukar.";
const SUARA_A3 = "Pisahkan kolom menjadi sepuluh dan dua. Sepuluh kolom berisi empat puluh bulatan, dua kolom berisi delapan bulatan.";
const SUARA_A4 = "Jumlahnya empat puluh ditambah delapan, yaitu empat puluh delapan. Ini sama dengan memecah dua belas menjadi sepuluh dan dua.";

export const ADEGAN_LUAR_SUSUNAN: AdeganStory = {
  id: "luar-susunan",
  judul: "Array Model: baris dan kolom",
  sumber: "Metode luar: Array Model",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, kepala(1)),
      tambah("disusun", ...deret("ar", 73, 70, 12, 4, 14, 5, W.pink)),
      tambah("baris", teks("arj", 150, 140, "4 baris × 12 kolom", 10, W.biru)),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "empat", 2), teks("ar1", 150, 160, "4 × 12 = 48", 11, W.hijau)),
      tambah(idx(SUARA_A2, "dua", 3), teks("ar2", 150, 180, "12 × 4 = 48", 11, W.hijau)),
    ),
    k(
      SUARA_A3,
      hapus("Pisahkan", "ar1", "ar2"),
      warnai("Sepuluh", W.emas, ...idDeret("ar", 12, 4, 0, 10)),
      warnai("dua", W.biruMuda, ...idDeret("ar", 12, 4, 10, 12)),
      tambah(idx(SUARA_A3, "sepuluh", 2), teks("ar3a", 100, 160, "10 × 4 = 40", 11, W.coklat)),
      tambah("kolom@3", teks("ar3b", 224, 160, "2 × 4 = 8", 11, W.biru)),
    ),
    k(
      SUARA_A4,
      tambah("Jumlahnya", teks("ar4", 150, 184, "40 + 8 = 48", 18, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Array Model: penerapan ------------------------------ */
const SUARA_B1 = "Terapan: kancing baju seragam. Empat belas baju, tiap baju tujuh kancing. Susun tujuh baris dan empat belas kolom.";
const SUARA_B2 = "Pisahkan empat belas kolom menjadi sepuluh dan empat. Sepuluh kali tujuh sama dengan tujuh puluh, empat kali tujuh sama dengan dua puluh delapan.";
const SUARA_B3 = "Jumlahkan: tujuh puluh tambah dua puluh delapan sama dengan sembilan puluh delapan kancing, sama dengan kunci buku.";

export const ADEGAN_LUAR_SUSUNAN_TERAPAN: AdeganStory = {
  id: "luar-susunan-terapan",
  judul: "Array Model: kancing baju seragam",
  sumber: "Metode luar: Array Model, soal buku",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, kepala(1)),
      tambah("Susun", ...deret("ak", 72, 64, 14, 7, 12, 4.6, W.pink)),
      tambah("baris", teks("akj", 150, 160, "7 baris × 14 kolom", 10, W.biru)),
    ),
    k(
      SUARA_B2,
      warnai("sepuluh", W.emas, ...idDeret("ak", 14, 7, 0, 10)),
      warnai("empat@2", W.biruMuda, ...idDeret("ak", 14, 7, 10, 14)),
      tambah(idx(SUARA_B2, "sepuluh", 2), teks("ak1", 100, 176, "10 × 7 = 70", 11, W.coklat)),
      tambah(idx(SUARA_B2, "empat", 3), teks("ak2", 224, 176, "4 × 7 = 28", 11, W.biru)),
    ),
    k(
      SUARA_B3,
      tambah("Jumlahkan:", teks("ak3", 150, 196, "70 + 28 = 98", 14, W.hijau)),
      sorotkan("kunci", "ak1", "ak2"),
    ),
  ],
};
