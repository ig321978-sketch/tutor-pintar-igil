import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, emo, jalur, judul, kartu, panah, rantai, teks } from "./k4b1h-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k4b1h-luar-1";

/** Benda rantai (lihat `rantai`) yang id-nya cocok dengan pola `re`, untuk menampilkan rantai sebagian demi sebagian. */
const ambil = (objs: Obj[], re: RegExp): Obj[] => objs.filter((o) => re.test(o.id));

/* ------------------------------ 6. Inverse of Multiply: konsep ------------------------------ */
const SUARA_T1 = "Metode ketiga, Inverse of Multiply, atau Kebalikan Kali. Pembagian adalah kebalikan perkalian, jadi soal bagi dijawab dengan mencari pasangan kalinya.";
const SUARA_T2 = "Ambil tiga bilangan: empat, dua belas, dan empat puluh delapan. Mereka satu keluarga fakta.";
const SUARA_T3 = "Dari keluarga ini lahir empat kalimat: empat dikali dua belas, dua belas dikali empat, empat puluh delapan dibagi empat, dan empat puluh delapan dibagi dua belas.";
const SUARA_T4 = "Jadi untuk empat puluh delapan dibagi empat, tanyakan: berapa dikali empat sama dengan empat puluh delapan? Jawabannya dua belas.";

export const ADEGAN_LUAR_KALI_BALIK: AdeganStory = {
  id: "luar-kali-balik",
  judul: "Inverse of Multiply: pembagian adalah kebalikan perkalian",
  sumber: "Metode luar: Inverse of Multiply",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Inverse of Multiply")),
      tambah("Metode", kepala(2)),
      tambah("Pembagian", ...kartu("tb", 30, 62, 240, 34, W.hijauMuda, ["bagi: 48 : 4 = ?"], 11)),
      tambah("kebalikan@2", emo("tr", 150, 118, "🔁", 22)),
      tambah("pasangan", ...kartu("tk", 30, 126, 240, 34, W.langit, ["kali: ? × 4 = 48"], 11)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Keluarga fakta: 4, 12, 48")),
      tambah(0, kepala(2)),
      tambah("tiga", jalur("tg", 90, 62, "M60 0 L0 84 L120 84 Z", W.krem, W.biru, { tebal: 2 })),
      tambah("empat,", teks("t4", 118, 138, "4", 16, W.hijau)),
      tambah("belas,", teks("t12", 182, 138, "12", 16, W.hijau)),
      tambah("puluh", teks("t48", 150, 110, "48", 20, W.merah)),
      tambah("keluarga", teks("tf", 150, 168, "keluarga fakta", 9.6, W.coklat)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Empat kalimat dari satu keluarga")),
      tambah(0, kepala(2)),
      tambah(6, ...kartu("f1", 12, 62, 134, 44, W.hijauMuda, ["4 × 12 = 48"], 12)),
      tambah(10, ...kartu("f2", 154, 62, 134, 44, W.hijauMuda, ["12 × 4 = 48"], 12)),
      tambah(14, ...kartu("f3", 12, 118, 134, 44, W.langit, ["48 : 4 = 12"], 12)),
      tambah(20, ...kartu("f4", 154, 118, 134, 44, W.langit, ["48 : 12 = 4"], 12)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Tanyakan pasangan kalinya")),
      tambah(0, kepala(2)),
      tambah("untuk", ...kartu("g1", 30, 62, 240, 38, W.hijauMuda, ["48 : 4 = ?"], 13)),
      tambah("berapa", panah("gp", 150, 104, 0, 16, W.merah, 2), ...kartu("g2", 30, 124, 240, 38, W.langit, ["? × 4 = 48"], 13)),
      ubah("Jawabannya", { id: "g1-t0", isi: "48 : 4 = 12" }, { id: "g2-t0", isi: "12 × 4 = 48" }),
      sorotkan("Jawabannya", "g2-k"),
    ),
  ],
};

/* ------------------------------ 7. Inverse of Multiply: penerapan (memeriksa kunci) ------------------------------ */
const SUARA_U1 = "Gunakan Kebalikan Kali untuk memeriksa hasil pembagian. Soal c: sembilan puluh enam dibagi enam hasilnya enam belas, dan enam belas dikali enam memang sembilan puluh enam.";
const SUARA_U2 = "Soal d: tujuh puluh dua dibagi tiga hasilnya dua puluh empat, sebab dua puluh empat dikali tiga adalah tujuh puluh dua.";
const SUARA_U3 = "Soal e: tujuh puluh lima dibagi lima hasilnya lima belas, sebab lima belas dikali lima adalah tujuh puluh lima. Soal cerita b: enam belas dikali empat adalah enam puluh empat.";
const SUARA_U4 = "Semua hasil lolos pemeriksaan. Kali balik bukan hanya cara menghitung, tetapi juga cara memeriksa pembagian.";

const KOL_U = [46, 74, 50, 110];
const BARIS_U: [string, string, string, string][] = [
  ["c", "96 : 6", "16", "16 × 6 = 96"],
  ["d", "72 : 3", "24", "24 × 3 = 72"],
  ["e", "75 : 5", "15", "15 × 5 = 75"],
  ["cerita b", "64 : 4", "16", "16 × 4 = 64"],
];

export const ADEGAN_LUAR_KALI_BALIK_TERAPAN: AdeganStory = {
  id: "luar-kali-balik-terapan",
  judul: "Inverse of Multiply: memeriksa hasil dengan perkalian",
  sumber: "Metode luar: Inverse of Multiply",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Periksa hasil dengan kali")),
      tambah("Gunakan", kepala(2)),
      tambah("Gunakan", ...barisTabel("uh", 10, 56, KOL_U, ["soal", "bagi", "hasil", "cek kali"], 20, 8.4, true)),
      tambah("Soal", ...barisTabel("ur0", 10, 76, KOL_U, BARIS_U[0], 22, 9)),
    ),
    k(SUARA_U2, tambah("Soal", ...barisTabel("ur1", 10, 98, KOL_U, BARIS_U[1], 22, 9))),
    k(
      SUARA_U3,
      tambah("Soal", ...barisTabel("ur2", 10, 120, KOL_U, BARIS_U[2], 22, 9)),
      tambah("cerita", ...barisTabel("ur3", 10, 142, KOL_U, BARIS_U[3], 22, 9)),
    ),
    k(
      SUARA_U4,
      tambah("Semua", emo("uc", 270, 44, "✅", 22)),
      tambah("Kali", ...kartu("ud", 12, 170, 276, 26, W.emas, ["bagi dan kali saling memeriksa"], 9.6)),
      sorotkan("Semua", "ur0-t3", "ur1-t3", "ur2-t3", "ur3-t3"),
    ),
  ],
};

/* ------------------------------ 8. Repeated Subtraction: konsep ------------------------------ */
const SUARA_V1 = "Metode keempat, Repeated Subtraction, atau Pengurangan Berulang. Kurangi bilangan yang dibagi dengan pembagi, ulangi sampai habis, lalu hitung berapa kali mengurangi.";
const SUARA_V2 = "Contoh: sepuluh kelereng dibagi lima. Sepuluh dikurangi lima sisa lima, dikurangi lima lagi sisa nol.";
const SUARA_V3 = "Mengurangi dua kali sampai habis, jadi sepuluh dibagi lima sama dengan dua.";
const SUARA_V4 = "Kalau tidak habis: sepuluh dikurangi tiga, tiga kali, menyisakan satu. Hasil bagi tiga, sisa satu.";

const RC = rantai("rc", 16, 96, 56, 50, [10, 5, 0], ["− 5", "− 5"]);
const RS = rantai("rs", 5, 96, 50, 30, [10, 7, 4, 1], ["− 3", "− 3", "− 3"]);

export const ADEGAN_LUAR_KURANG_ULANG: AdeganStory = {
  id: "luar-kurang-ulang",
  judul: "Repeated Subtraction: kurangi sampai habis lalu hitung",
  sumber: "Metode luar: Repeated Subtraction",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Repeated Subtraction")),
      tambah("Metode", kepala(3)),
      tambah("Kurangi", ...kartu("v1", 30, 60, 240, 30, W.hijauMuda, ["kurangi dengan pembagi"], 9.6)),
      tambah("ulangi", ...kartu("v2", 30, 100, 240, 30, W.langit, ["ulangi sampai 0"], 9.6)),
      tambah("hitung", ...kartu("v3", 30, 140, 240, 40, W.emas, ["banyak pengurangan", "= hasil bagi"], 9.6)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Contoh: 10 dibagi 5")),
      tambah(0, kepala(3)),
      tambah("Contoh", teks("vq", 150, 80, "10 : 5 = ?", 16, W.biru)),
      tambah("Sepuluh@2", ...ambil(RC, /^rc-k0(-|$)/)),
      tambah("dikurangi", ...ambil(RC, /^rc-(p0|l0|k1)(-|$)/)),
      tambah("dikurangi@2", ...ambil(RC, /^rc-(p1|l1)(-|$)/)),
      tambah("nol.", ...ambil(RC, /^rc-k2(-|$)/)),
    ),
    k(
      SUARA_V3,
      tambah("Mengurangi", teks("vn1", 97, 138, "kurang ke-1", 8.4, W.coklat), teks("vn2", 203, 138, "kurang ke-2", 8.4, W.coklat)),
      ubah("jadi", { id: "vq", isi: "10 : 5 = 2" }),
      tambah("dua@2", ...kartu("vk", 40, 156, 220, 32, W.emas, ["2 kali kurang: hasil bagi 2"], 9.6)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Bila tidak habis: ada sisa")),
      tambah(0, kepala(3)),
      tambah("Kalau", ...RS.filter((o) => /^rs-k0(-|$)/.test(o.id))),
      tambah("dikurangi", ...RS.filter((o) => /^rs-(p0|l0|k1)(-|$)/.test(o.id))),
      tambah("tiga@2", ...RS.filter((o) => /^rs-(p1|l1|k2)(-|$)/.test(o.id))),
      tambah("menyisakan", ...RS.filter((o) => /^rs-(p2|l2|k3)(-|$)/.test(o.id))),
      tambah("Hasil", ...kartu("vs", 30, 144, 240, 40, W.merahMuda, ["3 kali kurang: hasil bagi 3", "sisa 1"], 9.4)),
    ),
  ],
};

/* ------------------------------ 9. Repeated Subtraction: penerapan (soal buku) ------------------------------ */
const SUARA_W1 = "Permen Pak Wicak: mengurangi empat satu per satu sampai habis terlalu panjang. Jadi kurangi sepuluh kelompok sekaligus, sepuluh kali empat adalah empat puluh.";
const SUARA_W2 = "Sisa delapan, kurangi empat dua kali lagi sampai nol. Sepuluh tambah dua, jadi dua belas kali mengurangi, hasil bagi dua belas.";
const SUARA_W3 = "Soal d: sembilan puluh enam telur, tiap kotak delapan. Kurangi delapan sebanyak sepuluh kali, jadi delapan puluh, sisa enam belas. Kurangi lagi dua kali, habis. Jadi dua belas kotak.";
const SUARA_W4 = "Soal c: delapan puluh satu kue, tiap kotak tiga. Kurangi tiga sebanyak sepuluh kali, sisa lima puluh satu. Sepuluh kali lagi, sisa dua puluh satu. Tujuh kali lagi, habis. Jadi dua puluh tujuh kotak.";

const RW = rantai("rw", 16, 96, 56, 50, [48, 8, 0], ["− 40", "− 8"]);
const RD = rantai("rd", 16, 96, 56, 50, [96, 16, 0], ["− 80", "− 16"]);
const RK = rantai("rk", 5, 96, 50, 30, [81, 51, 21, 0], ["− 30", "− 30", "− 21"]);

export const ADEGAN_LUAR_KURANG_ULANG_TERAPAN: AdeganStory = {
  id: "luar-kurang-ulang-terapan",
  judul: "Repeated Subtraction pada soal 48, 96, dan 81",
  sumber: "Metode luar: Repeated Subtraction",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Pengurangan berulang: 48 : 4")),
      tambah("Permen", kepala(3)),
      tambah("Jadi", ...ambil(RW, /^rw-(k0|p0|l0|k1)(-|$)/)),
      tambah("kelompok", teks("wn1", 97, 138, "10 kali kurangi 4", 8.4, W.coklat)),
    ),
    k(
      SUARA_W2,
      tambah("Sisa", ...ambil(RW, /^rw-(p1|l1|k2)(-|$)/)),
      tambah("dua@2", teks("wn2", 203, 138, "2 kali kurangi 4", 8.4, W.coklat)),
      tambah("jadi", ...kartu("wk", 30, 156, 240, 32, W.emas, ["10 + 2 = 12 kali: 48 : 4 = 12"], 9.4)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, judul("Soal d: 96 : 8")),
      tambah(0, kepala(3)),
      tambah("Soal", ...ambil(RD, /^rd-(k0|p0|l0|k1)(-|$)/), teks("wd1", 97, 138, "10 kali kurangi 8", 8.4, W.coklat)),
      tambah("Kurangi@2", ...ambil(RD, /^rd-(p1|l1|k2)(-|$)/), teks("wd2", 203, 138, "2 kali kurangi 8", 8.4, W.coklat)),
      tambah(idx(SUARA_W3, "kotak", 2), ...kartu("wdk", 30, 156, 240, 32, W.emas, ["10 + 2 = 12 kotak"], 10)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Soal c: 81 : 3")),
      tambah(0, kepala(3)),
      tambah("Soal", ...ambil(RK, /^rk-(k0|p0|l0|k1)(-|$)/), teks("wc1", 70, 138, "10 kali", 8.4, W.coklat)),
      tambah("Sepuluh@2", ...ambil(RK, /^rk-(p1|l1|k2)(-|$)/), teks("wc2", 150, 138, "10 kali", 8.4, W.coklat)),
      tambah("Tujuh", ...ambil(RK, /^rk-(p2|l2|k3)(-|$)/), teks("wc3", 230, 138, "7 kali", 8.4, W.coklat)),
      tambah(idx(SUARA_W4, "kotak", 2), ...kartu("wck", 30, 156, 240, 32, W.emas, ["10 + 10 + 7 = 27 kotak"], 10)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
const SUARA_X1 = "Ringkasan empat metode. Bagi Rata mencari isi tiap kelompok, Bagi Ukur mencari banyak kelompok, Kebalikan Kali mencari pasangan kali, Pengurangan Berulang menghitung banyak pengurangan.";
const SUARA_X2 = "Keempatnya memberi jawaban yang sama. Ambil soal d, sembilan puluh enam telur dengan delapan telur per kotak: semua metode berujung pada dua belas.";
const SUARA_X3 = "Pilih cara yang masuk akal: berbagi kepada orang cocok dengan Bagi Rata, berapa kotak cocok dengan Bagi Ukur, memeriksa jawaban cocok dengan Kebalikan Kali, dan menghitung langkah cocok dengan Pengurangan Berulang.";

const KOL_X = [100, 110, 70];
const BARIS_X: [string, string, string][] = [
  ["Bagi Rata", "isi tiap kelompok", "48 : 4 = 12"],
  ["Bagi Ukur", "banyak kelompok", "81 : 3 = 27"],
  ["Kebalikan Kali", "pasangan kali", "12 × 4 = 48"],
  ["Pengurangan Berulang", "banyak pengurangan", "10 : 5 = 2"],
];
const IKON_X = ["🍬", "📦", "✅", "➖"];
const ISI_X: [string, string][] = [
  ["8 kotak", "tiap kotak 12"],
  ["tiap kotak 8", "12 kotak"],
  ["12 × 8 = 96", "periksa dengan kali"],
  ["96 − 80 − 16 = 0", "10 + 2 = 12 kali"],
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan: empat metode, satu hasil",
  sumber: "Ringkasan empat metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Ringkasan", ...barisTabel("xh", 10, 34, KOL_X, ["metode", "yang dicari", "contoh soal"], 22, 8.4, true)),
      ...BARIS_X.map((b, i) => tambah(idx(SUARA_X1, ["Rata", "Ukur", "Kebalikan", "Pengurangan"][i]), ...barisTabel(`xr${i}`, 10, 56 + i * 26, KOL_X, b, 26, 8.4))),
    ),
    k(
      SUARA_X2,
      bersih(0),
      tambah(0, judul("Soal d: 96 : 8 = 12")),
      ...NAMA_METODE_ID.map((m, i) => tambah([idx(SUARA_X2, "Keempatnya"), idx(SUARA_X2, "Ambil"), idx(SUARA_X2, "delapan", 1), idx(SUARA_X2, "semua")][i], ...kartu(`xs${i}`, 12, 34 + i * 40, 276, 36, WARNA_METODE[i], [m, ISI_X[i][0] + "; " + ISI_X[i][1]], 8.4))),
    ),
    k(
      SUARA_X3,
      bersih(0),
      tambah(0, judul("Pilih cara yang masuk akal")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_X3, ["berbagi", "berapa", "memeriksa", "menghitung"][i]), emo(`xe${i}`, 24, 54 + i * 40, IKON_X[i], 22), ...kartu(`xc${i}`, 44, 36 + i * 40, 244, 32, WARNA_METODE[i], [["berbagi ke orang: " + NAMA_METODE_ID[0], "berapa kotak: " + NAMA_METODE_ID[1], "memeriksa: " + NAMA_METODE_ID[2], "menghitung langkah: " + NAMA_METODE_ID[3]][i]], 8.6))),
    ),
  ],
};

