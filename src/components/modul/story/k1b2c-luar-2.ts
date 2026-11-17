import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kalimat, kartu, kotak, pesan, teks } from "./k1b2c-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b2c-bantu";
import { WARNA_METODE, kepala } from "./k1b2c-luar-1";

/* Video metode global Sub-Bab C: Read-Draw-Write (Baca-Gambar-Tulis), Bar Model (Model Batang), dan ringkasan. */

/* ------------------------------ 4. Read-Draw-Write: konsep ------------------------------ */
const SUARA_R1 = "Metode kedua, Read-Draw-Write, atau Baca-Gambar-Tulis. Ada tiga kotak: baca, gambar, dan tulis.";
const SUARA_R2 = "Pertama, baca ceritanya. Kedua, gambar bulatan sederhana sesuai cerita.";
const SUARA_R3 = "Ketiga, tulis kalimat penjumlahan dan jawabannya.";
const SUARA_R4 = "Gambar sederhana sudah cukup. Tidak perlu gambar yang bagus.";

export const ADEGAN_LUAR_RDW: AdeganStory = {
  id: "luar-rdw",
  judul: "Read-Draw-Write: baca, gambar, tulis",
  sumber: "Metode global: Read-Draw-Write",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah("kedua,", ...kepala(1)), tambah("baca,", ...kartu("kb", 10, 60, 90, 120, W.langit, ["baca"], 11)), tambah("gambar,", ...kartu("kg", 105, 60, 90, 120, W.emas, ["gambar"], 11)), tambah("tulis.", ...kartu("kt", 200, 60, 90, 120, W.pink, ["tulis"], 11))),
    k(SUARA_R2, sorotkan("baca", "kb-k"), tambah("gambar", ...[0, 1, 2, 3].map((i) => bulat(`d${i}`, 128 + (i % 2) * 22, 140 + Math.floor(i / 2) * 20, 6, W.biru, W.biru))), sorotkan("gambar", "kg-k")),
    k(SUARA_R3, sorotkan("tulis", "kt-k"), tambah("kalimat", teks("tk", 245, 150, "2 + 2 = 4", 11, W.merah))),
    k(SUARA_R4, tambah("cukup.", emo("ok", 150, 196, E.benar, 18))),
  ],
};

/* ------------------------------ 5. Read-Draw-Write: terapan ------------------------------ */
const ISI = "Mamah memetik tiga terong di pagi hari dan enam terong di sore hari. Berapa terong semuanya?";
const SUARA_D1 = "Baca: Mamah memetik tiga terong di pagi hari dan enam terong di sore hari.";
const SUARA_D2 = "Gambar: tiga bulatan, lalu enam bulatan. Hitung semua bulatannya.";
const SUARA_D4 = "Gambar bulatan membantu kita menghitung tanpa salah, lalu kalimatnya menjadi jawaban.";
const SUARA_D3 = "Tulis: tiga ditambah enam sama dengan sembilan. Jadi, ada sembilan terong.";

export const ADEGAN_LUAR_RDW_TERAPAN: AdeganStory = {
  id: "luar-rdw-terapan",
  judul: "Read-Draw-Write: terong pagi dan sore",
  sumber: "Metode global: Read-Draw-Write, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(1)), tambah("Baca:", ...pesan("ps", 20, 54, 260, ISI, 10.5))),
    k(SUARA_D2, tambah("tiga", ...[0, 1, 2].map((i) => bulat(`a${i}`, 40 + i * 22, 140, 8, W.langit, W.biru))), tambah("enam", ...[0, 1, 2, 3, 4, 5].map((i) => bulat(`b${i}`, 130 + i * 22, 140, 8, W.pink, W.biru))), tambah("Hitung", teks("h9", 262, 166, "9", 14, W.merah))),
    k(SUARA_D3, tambah("Tulis:", ...kalimat("kl", 110, 186, ["3", "+", "6", "=", "9"], 16, 24)), tambah("Jadi,", ...kartu("jw", 196, 174, 90, 22, W.hijauMuda, ["9 terong"], 10))),
    k(SUARA_D4, sorotkan("bulatan", "a0", "a1", "a2", "b0", "b1", "b2", "b3", "b4", "b5"), sorotkan("jawaban.", "jw-k")),
  ],
};

/* ------------------------------ 6. Bar Model: konsep ------------------------------ */
const SUARA_B1 = "Metode ketiga, Bar Model, atau Model Batang. Bilangan dalam cerita digambar sebagai batang.";
const SUARA_B2 = "Batang pertama untuk bilangan pertama, batang kedua untuk bilangan kedua.";
const SUARA_B3 = "Dua batang disambung menjadi satu batang panjang. Itulah semuanya.";
const SUARA_B4 = "Model batang membantu kita melihat cerita dengan jelas.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: model batang",
  sumber: "Metode global: Bar Model",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah("ketiga,", ...kepala(2)), tambah("batang.", kotak("ba", 40, 80, 100, 26, W.langit, W.biru, { rx: 4, tebal: 2 }), kotak("bb", 150, 80, 110, 26, W.pink, W.biru, { rx: 4, tebal: 2 }))),
    k(SUARA_B2, tambah("pertama", teks("ta", 90, 98, "bilangan 1", 9, W.biru)), tambah("kedua@2", teks("tb", 205, 98, "bilangan 2", 9, W.biru))),
    k(SUARA_B3, tambah("disambung", kotak("bu", 40, 130, 220, 26, W.emas, W.biru, { rx: 4, tebal: 2 }), teks("tu", 150, 148, "semuanya", 10, W.biru))),
    k(SUARA_B4, tambah("jelas.", emo("ok", 150, 192, E.benar, 20))),
  ],
};

/* ------------------------------ 7. Bar Model: terapan ------------------------------ */
const SUARA_M1 = "Ceritanya: Igil membawa dua kentang, lalu Abang membawa enam kentang ke dapur.";
const SUARA_M2 = "Batang Igil dua kotak, batang Abang enam kotak.";
const SUARA_M3 = "Disambung menjadi delapan kotak. Dua ditambah enam sama dengan delapan. Jadi, ada delapan kentang.";
const SUARA_M4 = "Batang panjang adalah semuanya. Batang pendek adalah bagian-bagian dari cerita.";
const sel = (id: string, n: number, x0: number, y: number, warna: string) => Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x0 + i * 26, y, 26, 24, warna, W.biru, { rx: 2, tebal: 1.4 }));

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: kentang ke dapur",
  sumber: "Metode global: Bar Model, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(2)), tambah("dua", emo("k0", 60, 80, E.kentang, 20), emo("k1", 84, 80, E.kentang, 20)), tambah("enam", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`k${2 + i}`, 130 + i * 24, 80, E.kentang, 20)))),
    k(SUARA_M2, tambah("Igil", ...sel("si", 2, 46, 104, W.langit)), tambah("Abang", ...sel("sa", 6, 122, 104, W.pink))),
    k(SUARA_M3, tambah("Disambung", ...sel("ss", 8, 46, 140, W.emas), teks("t8", 260, 158, "8", 14, W.merah)), tambah("Dua", ...kalimat("kl", 120, 192, ["2", "+", "6", "=", "8"], 15, 22)), tambah("Jadi,", ...kartu("jw", 200, 176, 90, 22, W.hijauMuda, ["8 kentang"], 10))),
    k(SUARA_M4, sorotkan("panjang", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `ss${i}`)), sorotkan("pendek", "si0", "si1", "sa0", "sa1", "sa2", "sa3", "sa4", "sa5")),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk soal cerita.";
const SUARA_Z2 = "Act It Out: peragakan cerita dengan benda sungguhan.";
const SUARA_Z3 = "Read-Draw-Write: baca ceritanya, gambar bulatan, lalu tulis kalimatnya.";
const SUARA_Z4 = "Bar Model: gambar bilangan sebagai batang, lalu sambung menjadi semuanya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("cerita.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Act", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Act It Out", "peragakan dengan benda"], 9.4))),
    k(SUARA_Z3, tambah("Read-Draw-Write:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Read-Draw-Write", "baca, gambar, tulis"], 9.4))),
    k(SUARA_Z4, tambah("Bar", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Bar Model", "batang disambung jadi semuanya"], 9.4))),
  ],
};
