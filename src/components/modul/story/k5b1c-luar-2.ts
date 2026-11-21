import type { AdeganStory } from "./logika-story";
import { E, W, angkaSlot, bundel, emo, idSlot, judul, kartu, kotak, lantai, panah, slotKolom, teks, tokoh } from "./k5b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b1c-bantu";

/*
 * Cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Kelas 5 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1c.md. Bagian ini: Swap Bundles (Tukar Bundel), Build It Back (Susun Kembali), dan ringkasan.
 */

/* ------------------------------ Swap Bundles: konsep ------------------------------ */
const SUARA_W1 = "Cara kedua, Swap Bundles, atau Tukar Bundel.";
const SUARA_W2 = "Sepuluh bundel kecil ditukar dengan satu bundel di kolom sebelah kiri, atau sebaliknya.";
const SUARA_W3 = "Banyak bundelnya berubah, tetapi jumlah seluruhnya tidak berubah sedikit pun.";
const SUARA_W4 = "Cara ini membuat bilangan yang sama bisa disusun dengan beberapa susunan.";

export const ADEGAN_LUAR_TUKAR: AdeganStory = {
  id: "luar-tukar",
  judul: "Swap Bundles: Tukar",
  sumber: "Metode global: Swap Bundles (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Cara 2"), ...lantai("lt", 150)),
      tambah("Swap", teks("m1", 150, 60, "Swap Bundles", 14, W.merah, { z: 3 })),
      tambah("Tukar", teks("m2", 150, 84, "Tukar Bundel", 11, W.hijauTua, { z: 3 })),
      tambah("Bundel", ...bundel("bd", 90, 124, "dus", 2, 26), ...bundel("bp", 190, 124, "pak", 5, 16)),
    ),
    k(
      SUARA_W2,
      bersih(0),
      tambah(0, judul("Sepuluh jadi satu"), ...lantai("lt", 150), ...bundel("pa", 40, 60, "pak", 5, 16), ...bundel("pb", 40, 76, "pak", 5, 16), teks("tl", 70, 106, "10 bundel kecil", 8.6, W.coklat, { z: 3 })),
      tambah("ditukar", panah("a1", 112, 66, 84, 0, W.biru, 2.4, { z: 2 })),
      tambah("satu", ...bundel("dd", 240, 68, "dus", 1), teks("tr", 240, 106, "1 bundel kiri", 9, W.coklat, { z: 3 })),
      tambah("sebaliknya", panah("a2", 196, 82, -84, 0, W.merah, 2.4, { z: 2 })),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, judul("Jumlah tidak berubah"), ...lantai("lt", 150), teks("bb", 150, 60, "banyak bundel: berubah", 11, W.merah, { z: 3 })),
      tambah("jumlah", teks("jt", 150, 100, "jumlah: tetap 1.000", 11, W.biru, { z: 3 })),
      tambah("pun", emo("ok", 150, 136, E.benar, 28, { z: 3 })),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Banyak susunan"), ...lantai("lt", 150)),
      tambah("bilangan", teks("tb", 150, 44, "bilangan 3.500", 12, W.merah, { z: 3 })),
      tambah("disusun", kotak("s0", 30, 56, 240, 26, W.langit, W.biru, { rx: 6, tebal: 1.4, z: 1 }), teks("x0", 150, 73, "3 dus + 5 pak", 10, W.biru, { z: 3 })),
      tambah("beberapa", kotak("s1", 30, 88, 240, 26, W.rumput, W.hijau, { rx: 6, tebal: 1.4, z: 1 }), teks("x1", 150, 105, "2 dus + 15 pak", 10, W.hijauTua, { z: 3 })),
      tambah("susunan", kotak("s2", 30, 120, 240, 26, W.pink, W.merah, { rx: 6, tebal: 1.4, z: 1 }), teks("x2", 150, 137, "35 pak", 10, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Swap Bundles: terapan ------------------------------ */
const SUARA_X1 = "Fajar punya tiga dus dan lima pak, lalu menukar satu dus dengan sepuluh pak.";
const SUARA_X2 = "Sekarang ia punya dua dus dan lima belas pak, dan totalnya tetap tiga ribu lima ratus.";
const SUARA_X3 = "Cocok untuk persiapan mengurangi, karena kolom yang kekurangan bisa dipinjami.";
const SUARA_X4 = "Kurang cocok untuk menulis bilangan biasa, karena satu kolom bisa berisi lebih dari sembilan.";

export const ADEGAN_LUAR_TUKAR_TERAPAN: AdeganStory = {
  id: "luar-tukar-terapan",
  judul: "Tukar Bundel: kapan cocok",
  sumber: "Metode global: Swap Bundles (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Fajar menukar bundel"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("tiga", ...bundel("ra", 112, 52, "dus", 3, 22), teks("l1", 62, 56, "3 dus", 9.4, W.coklat, { z: 3 })),
      tambah("lima", ...bundel("rb", 112, 82, "pak", 5, 15), teks("l2", 62, 86, "5 pak", 9.4, W.coklat, { z: 3 })),
      tambah("satu", teks("tk", 150, 114, "tukar 1 dus", 10, W.merah, { z: 3 })),
      tambah("sepuluh", teks("sp", 150, 132, "= 10 pak", 10, W.merah, { z: 3 })),
    ),
    k(
      SUARA_X2,
      bersih(0),
      tambah(0, judul("Sesudah ditukar"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("dua", ...bundel("rc", 112, 52, "dus", 2, 22), teks("l3", 62, 56, "2 dus", 9.4, W.coklat, { z: 3 })),
      tambah("lima", ...bundel("rd", 112, 80, "pak", 8, 15), ...bundel("re", 112, 94, "pak", 7, 15), teks("l4", 62, 88, "15 pak", 9.4, W.coklat, { z: 3 })),
      tambah("tiga", teks("tt", 150, 124, "= 3.500", 16, W.biru, { z: 3 })),
    ),
    k(
      SUARA_X3,
      bersih(0),
      tambah(0, judul("Persiapan mengurangi"), ...lantai("lt", 150), emo("ok", 262, 60, E.benar, 28, { z: 3 })),
      tambah("kolom", teks("kk", 130, 70, "kolom yang kurang", 11, W.merah, { z: 3 })),
      tambah("dipinjami", teks("pj", 130, 100, "pinjam dari kolom kiri", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_X4,
      bersih(0),
      tambah(0, judul("Tidak untuk bilangan biasa"), ...lantai("lt", 150), emo("xx", 262, 60, E.salah, 28, { z: 3 })),
      tambah("satu", teks("s1", 130, 70, "1 kolom bisa berisi", 11, W.merah, { z: 3 })),
      tambah("sembilan", teks("s9", 130, 100, "lebih dari 9", 13, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Build It Back: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Build It Back, atau Susun Kembali.";
const SUARA_B2 = "Kita menaruh tiap bagian ke kolomnya, mengisi nol di kolom yang kosong, lalu menulis angkanya berurutan.";
const SUARA_B3 = "Hasilnya adalah bentuk lazim, yaitu bilangan yang biasa kita tulis dan baca.";
const SUARA_B4 = "Terakhir kita periksa apakah banyak angkanya sama dengan banyak kolom yang dipakai.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Build It Back: Susun",
  sumber: "Metode global: Build It Back (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3"), ...lantai("lt", 150)),
      tambah("Build", teks("m1", 150, 52, "Build It Back", 14, W.merah, { z: 3 })),
      tambah("Susun", teks("m2", 150, 76, "Susun Kembali", 11, W.hijauTua, { z: 3 })),
      tambah("Back", ...slotKolom("sl", 96)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Taruh ke kolomnya"), ...lantai("lt", 150), ...slotKolom("sl", 70)),
      tambah("bagian", angkaSlot("sl", 0, 70, "6"), angkaSlot("sl", 2, 70, "2"), angkaSlot("sl", 4, 70, "5")),
      tambah("nol", angkaSlot("sl", 1, 70, "0", W.hijauTua), angkaSlot("sl", 3, 70, "0", W.hijauTua)),
      tambah("berurutan", teks("hs", 150, 146, "60.205", 16, W.biru, { z: 3 })),
    ),
    k(
      SUARA_B3,
      tambah("bentuk", teks("lz", 150, 126, "bentuk lazim", 10, W.coklat, { z: 3 })),
      ubah("biasa", { id: "hs", warna: W.hijau }),
      tambah("baca", emo("ok", 262, 142, E.benar, 24, { z: 3 })),
    ),
    k(
      SUARA_B4,
      sorotkan("periksa", ...idSlot("sl").filter((i) => i.endsWith("-k"))),
      tambah("angkanya", teks("a5", 80, 172, "5 angka", 11, W.merah, { z: 3 })),
      tambah("sama", teks("sm", 125, 172, "=", 11, W.merah, { z: 3 })),
      tambah("kolom", teks("k5", 170, 172, "5 kolom", 11, W.merah, { z: 3 })),
      tambah("dipakai", emo("ok2", 232, 170, E.benar, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Build It Back: terapan ------------------------------ */
const SUARA_Y1 = "Citra mendapat uraian tujuh puluh ribu ditambah lima ratus ditambah delapan puluh.";
const SUARA_Y2 = "Kolom ribuan dan satuan kosong, jadi ia mengisi nol, dan hasilnya tujuh puluh ribu lima ratus delapan puluh.";
const SUARA_Y3 = "Cocok untuk mengubah uraian menjadi bilangan biasa tanpa kehilangan nol.";
const SUARA_Y4 = "Kurang cocok kalau uraiannya tidak berurutan, karena kita harus menyusunnya dulu menurut kolom.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Susun Kembali: kapan cocok",
  sumber: "Metode global: Build It Back (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Citra mendapat uraian"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("tujuh", teks("u1", 90, 64, "70.000", 12, W.biru, { z: 3 })),
      tambah("lima", teks("u2", 150, 64, "+ 500", 12, W.biru, { z: 3 })),
      tambah("delapan", teks("u3", 205, 64, "+ 80", 12, W.biru, { z: 3 })),
    ),
    k(
      SUARA_Y2,
      tambah(0, ...slotKolom("sl", 84)),
      tambah("mengisi", angkaSlot("sl", 0, 84, "7"), angkaSlot("sl", 1, 84, "0", W.hijauTua), angkaSlot("sl", 2, 84, "5"), angkaSlot("sl", 3, 84, "8"), angkaSlot("sl", 4, 84, "0", W.hijauTua)),
      tambah("tujuh", teks("hs", 150, 146, "70.580", 16, W.biru, { z: 3 })),
    ),
    k(
      SUARA_Y3,
      tambah(0, emo("ok", 270, 44, E.benar, 26, { z: 3 })),
      sorotkan("tanpa", "sl1-k", "sl4-k"),
      tambah("nol", teks("tn", 190, 170, "tanpa kehilangan nol", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_Y4,
      hapus(0, "ok", "tn", "u1", "u2", "u3"),
      tambah(0, emo("xx", 270, 44, E.salah, 26, { z: 3 })),
      tambah("tidak", teks("ac", 150, 64, "80 + 70.000 + 500", 12, W.merah, { z: 3 })),
      tambah("menyusunnya", teks("sd", 190, 170, "urutkan dulu menurut kolom", 9, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Lestari, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Memeriksa angka, pakai Urai Bilangan. Menyusun dengan banyak cara, pakai Tukar Bundel. Menulis bilangan biasa, pakai Susun Kembali.";
const SUARA_R3 = "Apa pun caranya, jumlah seluruhnya tidak boleh berubah.";
const SUARA_R4 = "Menurutmu, kalau satu bundel hilang, di cara mana kita paling cepat menyadarinya?";

const BARIS_RINGKAS: { kiri: string; kanan: string; at: string }[] = [
  { kiri: "Memeriksa angka", kanan: "Urai Bilangan", at: "Memeriksa" },
  { kiri: "Banyak cara", kanan: "Tukar Bundel", at: "Menyusun" },
  { kiri: "Menulis biasa", kanan: "Susun Kembali", at: "Menulis" },
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga cara"), ...lantai("lt", 150), teks("n3", 170, 44, "3 cara", 14, W.merah, { z: 3 })),
      tambah("Lestari", ...tokoh("bu", 40, 184, "Bu Lestari")),
      tambah("masing", ...kartu("c0", 80, 70, 66, 30, W.langit, "Urai Bilangan", 8), ...kartu("c1", 150, 70, 66, 30, W.rumput, "Tukar Bundel", 8), ...kartu("c2", 220, 70, 66, 30, W.pink, "Susun Kembali", 8)),
      tambah("tepat", emo("ok", 170, 124, E.benar, 28, { z: 3 })),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih cara yang tepat"), ...lantai("lt", 150)),
      ...BARIS_RINGKAS.map((b, i) =>
        tambah(
          b.at,
          kotak(`r${i}-k`, 10, 40 + i * 36, 280, 28, W.putih, W.biru, { rx: 6, tebal: 1.2, z: 1 }),
          teks(`r${i}-a`, 78, 58 + i * 36, b.kiri, 8.6, W.coklat, { z: 3 }),
          panah(`r${i}-p`, 124, 54 + i * 36, 44, 0, W.biru, 2, { z: 2 }),
          teks(`r${i}-b`, 230, 58 + i * 36, b.kanan, 9.4, W.hijauTua, { z: 3 }),
        ),
      ),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Jumlah tetap"), ...lantai("lt", 150)),
      tambah("jumlah", teks("jt", 150, 66, "jumlah tidak boleh berubah", 12, W.merah, { z: 3 })),
      tambah("seluruhnya", teks("bl", 150, 104, "24.350", 18, W.biru, { z: 3 })),
      tambah("berubah", emo("ok", 150, 140, E.benar, 28, { z: 3 })),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Satu bundel hilang?"), ...lantai("lt", 150), ...tokoh("bu", 40, 184, "Bu Lestari")),
      tambah("satu", teks("s1", 170, 52, "1 bundel hilang", 13, W.merah, { z: 3 })),
      tambah("cara", ...kartu("c0", 100, 76, 56, 24, W.langit, "Urai", 8.6), ...kartu("c1", 160, 76, 56, 24, W.rumput, "Tukar", 8.6), ...kartu("c2", 220, 76, 56, 24, W.pink, "Susun", 8.6)),
      tambah("menyadarinya", emo("qq", 190, 140, E.tanya, 34, { z: 3 })),
    ),
  ],
};
