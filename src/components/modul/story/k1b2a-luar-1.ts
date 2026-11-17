import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, deretEmo, emo, judul, kalimat, kartu, orang, panahObj, teks } from "./k1b2a-gambar";
import { jalur, tengahPetak } from "./k1b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah, urutKata } from "./k1b2a-bantu";

/* Video metode global Sub-Bab A "Bibit Kiriman Nenek": pembuka dan Counting On (Menghitung Maju). */

export const NAMA_METODE = ["Counting On", "Part-Part-Whole", "Ten Frame"];
export const NAMA_METODE_ID = ["Menghitung Maju", "Bagian-Bagian-Utuh", "Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Bibit sudah tertanam. Kaka bercerita, anak-anak di negara lain juga belajar penjumlahan. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Counting On, Part-Part-Whole, dan Ten Frame.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Menghitung Maju, Bagian-Bagian-Utuh, dan Bingkai Sepuluh.";
const SUARA_O4 = "Semua metode menjawab pertanyaan Mamah: kalau bibit bertambah, berapa semuanya?";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk penjumlahan",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode global"), emo("bb", 150, 96, E.bibit, 40)), tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")), tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)), tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11))),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Counting", "Part-Part-Whole,", "Frame."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Menghitung", "Bagian-Bagian-Utuh,", "Bingkai"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Satu pertanyaan"), ...orang("mm", 150, 90, E.mamah, "Mamah")), tambah("bertambah,", ...deretEmo(E.bibit, "bt", deret(3, 70, 30, 150), 22), emo("bt3", 210, 150, E.bibit, 22), panahObj("pa", 168, 144, 24, 0, W.hijau)), tambah("semuanya?", teks("tq", 150, 186, "berapa semuanya?", 11, W.merah))),
  ],
};

/* ------------------------------ 2. Counting On: konsep ------------------------------ */
const SUARA_N1 = "Metode pertama, Counting On, atau Menghitung Maju. Kita mulai dari bilangan pertama, tidak dari satu.";
const SUARA_N2 = "Simpan bilangan pertama di kepala. Lalu sebut bilangan berikutnya satu per satu.";
const SUARA_N3 = "Kalau bisa, mulai dari bilangan yang lebih besar supaya hitungannya pendek.";
const SUARA_N4 = "Menghitung maju lebih cepat daripada menghitung semua dari awal.";
const J = { x0: 20, y: 110, s: 26 };

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: menghitung maju",
  sumber: "Metode global: Counting On",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah("pertama,", ...kepala(0)), tambah("bilangan", ...jalur("jl", J.x0, J.y, J.s), ...kartu("sl", 110, 56, 80, 26, W.emas, ["5 + 3"], 13)), sorotkan("pertama,@2", "jl4")),
    k(
      SUARA_N2,
      tambah("kepala.", emo("ot", 137, 104, "\u{1F9E0}", 18)),
      ...["6", "7", "8"].map((n, i) => tambah(["berikutnya", "satu", "satu@2"][i], panahObj(`ln${i}`, tengahPetak(J.x0, J.y, 4 + i, J.s).x + 4, J.y + 34, 18, 0, W.merah), teks(`lt${i}`, tengahPetak(J.x0, J.y, 5 + i, J.s).x, J.y + 46, n, 11, W.merah))),
    ),
    k(SUARA_N3, tambah("besar", ...kartu("bs", 30, 166, 240, 26, W.hijauMuda, ["3 + 5: mulai dari 5"], 10))),
    k(SUARA_N4, ubah("cepat", { id: "sl-t0", isi: "5 + 3 = 8" }), tambah("awal.", emo("ok", 262, 78, E.benar, 22))),
  ],
};

/* ------------------------------ 3. Counting On: terapan ------------------------------ */
const SUARA_T1 = "Di kebun ada tujuh bibit wortel. Abang membawa dua bibit wortel lagi.";
const SUARA_T2 = "Kita tidak menghitung dari satu. Simpan tujuh di kepala.";
const SUARA_T3 = "Lalu hitung maju: delapan, sembilan. Jadi ada sembilan bibit wortel.";
const SUARA_T4 = "Kalimatnya, tujuh ditambah dua sama dengan sembilan.";
const WORTEL = deret(7, 30, 28, 110);
const posT3 = urutKata(SUARA_T3, ["delapan,", "sembilan."], "maju:");

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On: bibit wortel",
  sumber: "Metode global: Counting On, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0)), tambah("tujuh", ...deretEmo(E.wortel, "wt", WORTEL, 22)), tambah("Abang", ...orang("ab", 262, 166, E.abang, "Abang")), tambah("dua", emo("wt7", 230, 110, E.wortel, 22), emo("wt8", 258, 110, E.wortel, 22))),
    k(SUARA_T2, sorotkan("Simpan", ...WORTEL.map((_, i) => `wt${i}`)), tambah("tujuh", ...kartu("k7", 96, 60, 60, 24, W.emas, ["7"], 14))),
    k(SUARA_T3, tambah(posT3[0], teks("h8", 230, 86, "8", 13, W.merah)), tambah(posT3[1], teks("h9", 258, 86, "9", 13, W.merah)), tambah("Jadi", ...kartu("sm", 60, 146, 140, 26, W.hijauMuda, ["9 bibit wortel"], 11))),
    k(SUARA_T4, tambah("tujuh", ...kalimat("kl", 130, 190, ["7", "+", "2", "=", "9"], 16, 24))),
  ],
};
