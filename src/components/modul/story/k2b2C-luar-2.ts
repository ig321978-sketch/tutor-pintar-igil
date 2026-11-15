import type { AdeganStory, Obj } from "./logika-story";
import { EMO, OWL, W, batang, bendaDi, emo, judul, kartu, kotak, namaG, selisihBatang, teks, titikBaris } from "./k2b2C-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b2C-luar-1";

const ex = (isi: string, id = "ex", x = 150, y = 150, u = 15): Obj => teks(id, x, y, isi, u, W.merah);

/** Tinggi batang pertama dan kedua pada adegan Model Batang Cerita. */
export const Y_BATANG_1 = 66;
export const Y_BATANG_2 = 104;

/* ------------------------------ 4. Model Batang Cerita: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Model Batang Cerita. Kita membuat batang untuk setiap bilangan. Batang membantu kita melihat cerita sebelum menghitung.";
const SUARA_B2 = "Halim punya tiga belas stiker. Batang Halim panjangnya tiga belas.";
const SUARA_B3 = "Wei punya enam kurangnya dari Halim. Jadi batang Wei lebih pendek enam.";
const SUARA_B4 = "Batang Wei kita cari dengan mengurangi. Tiga belas dikurangi enam sama dengan tujuh.";
const SUARA_B5 = "Kita periksa. Tujuh ditambah enam sama dengan tiga belas. Panjangnya sama dengan batang Halim.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Model Batang Cerita: batang pendek dan batang panjang",
  sumber: "Metode luar: Model Batang Cerita",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(1)), tambah(idx(SUARA_B1, "batang"), emo("bt", 150, 118, "\u{1F4CF}", 46))),
    k(SUARA_B2, hapus(0, "bt"), tambah(idx(SUARA_B2, "Halim"), ...batang("h", Y_BATANG_1, 13, W.hijauMuda, "Halim", "13"))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "Wei"), ...batang("w", Y_BATANG_2, 7, W.pink, "Wei", "?")), tambah(idx(SUARA_B3, "kurangnya"), ...selisihBatang("w", Y_BATANG_2, 7, 6, "6"))),
    k(SUARA_B4, ubah(idx(SUARA_B4, "Tiga"), { id: "bmw-ln", isi: "7" }), tambah(idx(SUARA_B4, "Tiga"), ex("13 − 6 = 7", "ex", 150, 150))),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Tujuh"), ex("7 + 6 = 13", "xk", 130, 174, 14)), sorotkan(idx(SUARA_B5, "Panjangnya"), "bmh-k", "bdw-k"), tambah(idx(SUARA_B5, "Halim"), emo("ok", 222, 174, "✅", 16))),
  ],
};

/* ------------------------------ 5. Model Batang Cerita: penerapan ------------------------------ */
const SUARA_C1 = "Ayo coba. Malosi punya sebelas stiker. Kira punya empat lebihnya dari Malosi.";
const SUARA_C2 = "Batang Kira lebih panjang empat dari batang Malosi.";
const SUARA_C3 = "Kita mencari batang yang lebih panjang, jadi kita tambah. Pilih jawabannya.";
const SUARA_C4 = "Sebelas ditambah empat sama dengan lima belas. Jawabannya pilihan kedua.";
const SUARA_C5 = "Kita periksa. Lima belas dikurangi empat sama dengan sebelas. Cocok.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Model Batang Cerita: mencari batang yang panjang",
  sumber: "Metode luar: Model Batang Cerita, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah(0, ...kepala(1)), tambah(idx(SUARA_C1, "Malosi"), ...batang("m", Y_BATANG_1, 11, W.hijauMuda, "Malosi", "11")), tambah(idx(SUARA_C1, "Kira"), teks("bmk-nm", 30, Y_BATANG_2 - 4, "Kira", 9, W.biru, { anchor: "start" }))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Kira"), ...batang("k", Y_BATANG_2, 15, W.pink, "Kira", "?").filter((o) => o.id !== "bmk-nm")), tambah(idx(SUARA_C2, "lebih"), ...selisihBatang("k", Y_BATANG_2, 11, 4, "4"))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Pilih"), ...pilihKata(156, ["7", "15", "16"], 14))),
    k(SUARA_C4, ubah(idx(SUARA_C4, "Sebelas"), { id: "bmk-ln", isi: "15" }), tambah(idx(SUARA_C4, "Sebelas"), ex("11 + 4 = 15", "ex", 150, 146)), sorotkan(idx(SUARA_C4, "kedua"), "c2-k", "c2-t")),
    k(SUARA_C5, redamkan(0, "c2-k", "c2-t"), ubah(idx(SUARA_C5, "Lima"), { id: "ex", isi: "15 − 4 = 11" }), tambah(idx(SUARA_C5, "Cocok"), emo("ok", 262, 146, "✅", 18))),
  ],
};

/* ------------------------------ 6. Pilih Operasi: konsep ------------------------------ */
export const KARTU_TAMBAH = ["digabung", "dapat lagi", "semua dihitung"];
export const KARTU_KURANG = ["diberikan", "dimakan", "hilang", "tersisa", "selisih"];
const kartuOp = (id: string, kiri: boolean, baris: number, isi: string): Obj[] => kartu(id, kiri ? 20 : 166, 78 + 24 * baris, 114, 20, W.putih, [isi], 9.6);
const SUARA_O1 = "Cara ketiga, Pilih Operasi. Kita pilih tambah atau kurang dari arti ceritanya.";
const SUARA_O2 = "Kalau ceritanya digabung, dapat lagi, atau semua dihitung, kita pilih tambah.";
const SUARA_O3 = "Kalau ceritanya diberikan, dimakan, hilang, atau tersisa, kita pilih kurang.";
const SUARA_O4 = "Kata selisih juga berarti kurang. Bilangan besar dikurangi bilangan kecil.";
const SUARA_O5 = "Selalu bayangkan ceritanya dulu. Baru kita pilih tanda.";

export const ADEGAN_LUAR_OPERASI: AdeganStory = {
  id: "luar-operasi",
  judul: "Pilih Operasi: arti cerita menentukan tanda",
  sumber: "Metode luar: Pilih Operasi",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_O1, "tambah"), kotak("bk0", 8, 54, 138, 144, W.hijauMuda, W.hijau, { rx: 10, z: -1 }), teks("bh0", 77, 70, "tambah (+)", 11, W.biru)),
      tambah(idx(SUARA_O1, "kurang"), kotak("bk1", 154, 54, 138, 144, W.merahMuda, W.merah, { rx: 10, z: -1 }), teks("bh1", 223, 70, "kurang (−)", 11, W.biru)),
    ),
    k(SUARA_O2, tambah(idx(SUARA_O2, "digabung"), ...kartuOp("ct0", true, 0, KARTU_TAMBAH[0])), tambah(idx(SUARA_O2, "lagi"), ...kartuOp("ct1", true, 1, KARTU_TAMBAH[1])), tambah(idx(SUARA_O2, "dihitung"), ...kartuOp("ct2", true, 2, KARTU_TAMBAH[2]))),
    k(
      SUARA_O3,
      tambah(idx(SUARA_O3, "diberikan"), ...kartuOp("ck0", false, 0, KARTU_KURANG[0])),
      tambah(idx(SUARA_O3, "dimakan"), ...kartuOp("ck1", false, 1, KARTU_KURANG[1])),
      tambah(idx(SUARA_O3, "hilang"), ...kartuOp("ck2", false, 2, KARTU_KURANG[2])),
      tambah(idx(SUARA_O3, "tersisa"), ...kartuOp("ck3", false, 3, KARTU_KURANG[3])),
    ),
    k(SUARA_O4, tambah(idx(SUARA_O4, "selisih"), ...kartuOp("ck4", false, 4, KARTU_KURANG[4])), sorotkan(idx(SUARA_O4, "kurang"), "ck4-k")),
    k(SUARA_O5, bersih(0), tambah(0, judul("Bayangkan dulu")), tambah(idx(SUARA_O5, "ceritanya"), ...kartu("by", 40, 60, 220, 44, W.krem, ["bayangkan ceritanya"], 12)), tambah(idx(SUARA_O5, "tanda"), ...kartu("tn", 40, 114, 220, 44, W.emas, ["lalu pilih tanda"], 12), emo("bk", 150, 186, "\u{1F914}", 26))),
  ],
};

/* ------------------------------ 7. Pilih Operasi: penerapan ------------------------------ */
const Y_MANGGA_A = 86;
const Y_MANGGA_B = 114;
const mangga = (): Obj[] => [...bendaDi("a", EMO.mangga, titikBaris(8, 26, Y_MANGGA_A, 26), 17), ...bendaDi("b", EMO.mangga, titikBaris(5, 26, Y_MANGGA_B, 26), 17)];
const stiker = (): Obj[] => [...bendaDi("a", EMO.bintang, titikBaris(9, 26, Y_MANGGA_A, 26), 17), ...bendaDi("b", EMO.bintang, titikBaris(8, 26, Y_MANGGA_B, 26), 17)];
const SUARA_T1 = "Ayo coba. Upe punya tiga belas mangga. Upe memakan lima mangga. Berapa mangga yang tersisa?";
const SUARA_T2 = "Ayo pilih tanda yang paling tepat untuk soal ini.";
const SUARA_T3 = "Memakan artinya berkurang, jadi kita pilih kurang. Tiga belas dikurangi lima sama dengan delapan.";
const SUARA_T4 = "Soal kedua. Wei punya sembilan stiker. Wei dapat delapan stiker lagi. Berapa semua stiker Wei?";
const SUARA_T5 = "Dapat lagi artinya bertambah, jadi kita pilih tambah. Sembilan ditambah delapan sama dengan tujuh belas.";

export const ADEGAN_LUAR_OPERASI_TERAPAN: AdeganStory = {
  id: "luar-operasi-terapan",
  judul: "Pilih Operasi: coba pilih tanda",
  sumber: "Metode luar: Pilih Operasi, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(2)), tambah(idx(SUARA_T1, "Upe"), namaG("a", 8, 70, "Upe punya 13 mangga")), tambah(idx(SUARA_T1, "tiga"), ...mangga()), tambah(idx(SUARA_T1, "memakan"), teks("cm", 290, Y_MANGGA_B - 4, "dimakan: 5", 9.4, W.merah, { anchor: "end" }))),
    k(SUARA_T2, tambah(idx(SUARA_T2, "pilih"), ...pilihKata(134, ["tambah (+)", "kurang (−)"], 11))),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "kurang"), "c2-k", "c2-t"), sorotkan(idx(SUARA_T3, "Memakan"), "eb0", "eb1", "eb2", "eb3", "eb4"), tambah(idx(SUARA_T3, "Tiga"), ex("13 − 5 = 8", "ex", 150, 186))),
    k(SUARA_T4, bersih(0), tambah(0, ...kepala(2)), tambah(idx(SUARA_T4, "sembilan"), ...stiker()), tambah(idx(SUARA_T4, "Berapa"), ...pilihKata(134, ["tambah (+)", "kurang (−)"], 11))),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "tambah"), "c1-k", "c1-t"), tambah(idx(SUARA_T5, "Sembilan"), ex("9 + 8 = 17", "ex", 150, 186))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Sekarang kita ingat kembali tiga metode dari luar.";
const SUARA_R2 = "Cerita Bagian–Utuh: dua bagian digabung menjadi satu utuh.";
const SUARA_R3 = "Model Batang Cerita: panjang batang menunjukkan banyaknya, dan selisih terlihat jelas.";
const SUARA_R4 = "Pilih Operasi: arti cerita menentukan kita menambah atau mengurangi.";
const SUARA_R5 = "Pilih cara yang paling kamu mengerti. Semua cara memberi jawaban yang sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Tiga metode dari luar")), tambah("tiga", emo("rk", 150, 110, "\u{1F4DA}", 50))),
    k(SUARA_R2, hapus(0, "rk"), tambah(idx(SUARA_R2, "Cerita"), ...kartu("r0", 14, 40, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "dua bagian jadi satu utuh"], 9.6))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Model"), ...kartu("r1", 14, 90, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "batang panjang dan pendek"], 9.6))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Pilih"), ...kartu("r2", 14, 140, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "arti cerita menentukan tanda"], 9.6))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Kerja bagus!")), tambah(0, emo("pe", 150, 108, "\u{1F389}", 54), emo("ow", 262, 170, OWL, 28))),
  ],
};
