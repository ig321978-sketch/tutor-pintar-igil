import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, hurufItem, item, judul, kartu, kodeDari, kodeTeks, kurungSatuan, tanda, tata } from "./k2b4B-gambar";
import { bersih, hapus, hapusKartu, idx, isiKosong, k, munculHuruf, munculItem, pilihKata, redamkan, sorotkan, tambah, urutKata } from "./k2b4B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b4B-luar-1";

const T6 = tata(6, 20, 12);
const T9 = tata(9, 20, 7);
const hurufSemua = (suara: string, kata: string, b: string, seq: string[], t: ReturnType<typeof tata>, cy: number, yKode: number) =>
  tambah(idx(suara, kata), ...kodeDari(seq).map((h, i) => hurufItem(b, i, h, t, cy)), kodeTeks(b, kodeDari(seq), yKode));

/* ------------------------------ 4. Pola AB dan ABC: mengenali jenis satuan ------------------------------ */
export const AB_SATU = ["bunga", "hati", "bunga", "hati", "bunga", "hati"];
export const AB_DUA = ["bunga", "bintang", "hati", "bunga", "bintang", "hati"];
const SUARA_A1 = "Metode kedua bernama Pola AB dan ABC. Kita mengenali jenis satuan pola.";
const SUARA_A2 = "Barisan pertama: bunga, hati, bunga, hati, bunga, hati. Ada dua jenis benda, jadi kodenya A, B.";
const SUARA_A3 = "Barisan kedua: bunga, bintang, hati, bunga, bintang, hati. Ada tiga jenis benda, jadi kodenya A, B, C.";
const SUARA_A4 = "Pola A B punya dua jenis benda dalam satuannya. Pola A B C punya tiga jenis benda.";
const SUARA_A5 = "Untuk mengenali jenisnya, lihat satuan polanya, lalu hitung jenis bendanya.";

export const ADEGAN_LUAR_AB: AdeganStory = {
  id: "luar-ab",
  judul: "Pola AB dan ABC: jenis satuan pola",
  sumber: "Metode luar: Pola AB dan ABC",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_A1, tambah(0, ...kepala(1)), tambah(idx(SUARA_A1, "mengenali"), ...kartu("kk", 30, 76, 240, 44, W.langit, ["kenali jenis", "satuan pola"], 11))),
    k(SUARA_A2, hapus(0, "kk-k", "kk-t0", "kk-t1"), ...munculItem(SUARA_A2, "ba", AB_SATU, T6, 70, { setelah: "pertama:" }), hurufSemua(SUARA_A2, "kodenya", "ba", AB_SATU, T6, 70, 112)),
    k(SUARA_A3, ...munculItem(SUARA_A3, "bb", AB_DUA, T6, 146, { setelah: "kedua:" }), hurufSemua(SUARA_A3, "kodenya", "bb", AB_DUA, T6, 146, 188)),
    k(SUARA_A4, tambah(idx(SUARA_A4, "dua"), kurungSatuan("ba", 0, 2, T6, 70)), tambah(idx(SUARA_A4, "tiga"), kurungSatuan("bb", 0, 3, T6, 146))),
    k(SUARA_A5, bersih(0), tambah(0, ...kepala(1)), tambah(idx(SUARA_A5, "lihat"), ...kartu("l1", 30, 56, 240, 40, W.krem, ["lihat satuan polanya"], 11)), tambah(idx(SUARA_A5, "hitung"), ...kartu("l2", 30, 110, 240, 40, W.pink, ["hitung jenis bendanya"], 11))),
  ],
};

/* ------------------------------ 5. Pola AB dan ABC: terapan ------------------------------ */
export const ABC_TERAPAN = ["lingkaran", "bunga", "persegi", "lingkaran", "bunga", "persegi"];
export const AB_TERAPAN = ["hati", "persegi", "hati", "persegi", "hati", "persegi"];
const SUARA_B1 = "Sekarang giliranmu. Lihat barisan ini: lingkaran, bunga, persegi, lingkaran, bunga, persegi.";
const SUARA_B2 = "Jenis apa satuan polanya? Ketuk jawabanmu.";
const SUARA_B3 = "Betul, A, B, C! Satuannya punya tiga jenis benda, jadi ini pola A B C.";
const SUARA_B4 = "Barisan lain: hati, persegi, hati, persegi, hati, persegi. Hanya ada dua jenis benda, jadi ini pola A B.";

export const ADEGAN_LUAR_AB_TERAPAN: AdeganStory = {
  id: "luar-ab-terapan",
  judul: "Pola AB dan ABC: mengenali jenisnya",
  sumber: "Metode luar: Pola AB dan ABC, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(1)), ...munculItem(SUARA_B1, "ba", ABC_TERAPAN, T6, 62, { setelah: "ini:" })),
    k(SUARA_B2, hurufSemua(SUARA_B2, "Jenis", "ba", ABC_TERAPAN, T6, 62, 98), tambah(idx(SUARA_B2, "Ketuk"), ...pilihKata(128, ["A B", "A B C", "A A B"], 11))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul"), "c2-k"), tambah(idx(SUARA_B3, "Satuannya"), kurungSatuan("ba", 0, 3, T6, 62))),
    k(SUARA_B4, hapusKartu(0, 3), ...munculItem(SUARA_B4, "bb", AB_TERAPAN, T6, 150, { setelah: "lain:" })),
  ],
};

/* ------------------------------ 6. Buat Pola: menyusun pola sendiri ------------------------------ */
export const BUAT_ISI = ["persegi", "lingkaran", "lingkaran", "persegi", "lingkaran", "lingkaran", "persegi", "lingkaran", "lingkaran"];
const SUARA_C1 = "Metode ketiga bernama Buat Pola. Kita menyusun pola sendiri dari benda yang kita pilih.";
const SUARA_C2 = "Igil memilih dua benda: persegi dan lingkaran.";
const SUARA_C3 = "Susun satuannya dulu: persegi, lingkaran, dan lingkaran.";
const SUARA_C4 = "Lalu ulangi satuan itu sampai barisan penuh: persegi, lingkaran, lingkaran, persegi, lingkaran, lingkaran, persegi, lingkaran, lingkaran.";
const SUARA_C5 = "Barisan Igil berulang dan teratur, jadi ini pola. Kodenya A, B, B, A, B, B, A, B, B.";

export const ADEGAN_LUAR_BUAT: AdeganStory = {
  id: "luar-buat",
  judul: "Buat Pola: menyusun pola sendiri",
  sumber: "Metode luar: Buat Pola",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, ...kepala(2)), tambah(idx(SUARA_C1, "menyusun"), ...kartu("kk", 30, 76, 240, 44, W.pink, ["susun pola sendiri", "dari benda pilihan"], 11))),
    k(SUARA_C2, hapus(0, "kk-k", "kk-t0", "kk-t1"), ...munculItem(SUARA_C2, "lg", ["persegi", "lingkaran"], tata(2, 26, 30), 96, { setelah: "benda:" })),
    k(SUARA_C3, hapus(0, "lg_0_persegi", "lg_1_lingkaran"), ...munculItem(SUARA_C3, "ba", BUAT_ISI.slice(0, 3), T9, 84, { setelah: "dulu:" }), tambah(idx(SUARA_C3, "lingkaran", 2), kurungSatuan("ba", 0, 3, T9, 84))),
    k(SUARA_C4, ...munculItem(SUARA_C4, "ba", BUAT_ISI, T9, 84, { dari: 3, setelah: "penuh:" })),
    k(SUARA_C5, tambah(idx(SUARA_C5, "berulang"), kurungSatuan("ba", 1, 3, T9, 84), kurungSatuan("ba", 2, 3, T9, 84)), tambah(idx(SUARA_C5, "pola"), tanda("ba", true, 84, 284)), ...munculHuruf(SUARA_C5, "ba", BUAT_ISI, T9, 84, { setelah: "Kodenya" }), tambah(SUARA_C5.split(/\s+/).length - 1, kodeTeks("ba", kodeDari(BUAT_ISI), 126))),
  ],
};

/* ------------------------------ 7. Buat Pola: terapan ------------------------------ */
export const BUAT_TERAPAN = ["bintang", "bunga", "hati", "bintang", "bunga", "hati"];
const T6B = tata(6, 24, 10);
const SUARA_D1 = "Sekarang giliranmu. Upe merancang pola: bintang, bunga, hati, bintang, kotak kosong, lalu hati.";
const SUARA_D2 = "Cari satuan polanya: bintang, bunga, dan hati. Satuannya terdiri dari tiga benda.";
const SUARA_D3 = "Benda apa yang cocok untuk kotak kosong? Ketuk jawabanmu.";
const SUARA_D4 = "Betul, bunga! Setelah bintang, yang datang berikutnya bunga.";
const SUARA_D5 = "Sekarang giliranmu merancang pola sendiri. Ketuk kotaknya untuk mengganti benda.";
const POS_D1 = urutKata(SUARA_D1, ["bintang", "bunga", "hati", "bintang"], "pola:");

export const ADEGAN_LUAR_BUAT_TERAPAN: AdeganStory = {
  id: "luar-buat-terapan",
  judul: "Buat Pola: melengkapi dan merancang",
  sumber: "Metode luar: Buat Pola, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(2)),
      ...BUAT_TERAPAN.slice(0, 4).map((s, i) => tambah(POS_D1[i], item("ba", i, s, T6B, 66))),
      tambah(idx(SUARA_D1, "kotak"), item("ba", 4, "kosong", T6B, 66)),
      tambah(idx(SUARA_D1, "hati", 2), item("ba", 5, "hati", T6B, 66)),
    ),
    k(SUARA_D2, tambah(idx(SUARA_D2, "Satuannya"), kurungSatuan("ba", 0, 3, T6B, 66))),
    k(SUARA_D3, tambah(idx(SUARA_D3, "Ketuk"), ...pilihKata(126, ["hati", "bunga", "bintang"], 11))),
    k(SUARA_D4, sorotkan(idx(SUARA_D4, "Betul"), "c2-k"), isiKosong(idx(SUARA_D4, "bunga", 2), "ba", 4, "bunga", T6B, 66)),
    k(
      SUARA_D5,
      hapusKartu(0, 3),
      redamkan(0, "ba_4_bunga"),
      tambah(idx(SUARA_D5, "Ketuk"), ...[0, 1, 2, 3, 4, 5].map((i) => item("bb", i, "kosong", T6B, 130)), emo("tg", 150, 176, "\u{1F446}", 24)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi tiga metode dari luar.";
const SUARA_R2 = "Pola Berulang: satuan pola menentukan lanjutannya.";
const SUARA_R3 = "Pola AB dan ABC: kenali jenis satuan pola.";
const SUARA_R4 = "Buat Pola: susun pola sendiri dari benda pilihanmu.";
const SUARA_R5 = "Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan tiga metode")), tambah(idx(SUARA_R1, "ingat"), emo("ib", 150, 110, "\u{1F4DD}", 44))),
    k(SUARA_R2, { at: 0, hapus: "ib" }, tambah(idx(SUARA_R2, "satuan"), ...kartu("r0", 14, 30, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "satuan pola menentukan lanjutan"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "kenali"), ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "kenali jenis satuan pola"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "susun"), ...kartu("r2", 14, 126, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "susun pola sendiri"], 9.2))),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Terima"), emo("ow", 150, 190, OWL, 30))),
  ],
};
