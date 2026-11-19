import type { AdeganStory } from "./logika-story";
import { E, K, W, angkaKartu, emo, judul, kartu, kartuKosong, namaKartu, panah, papanTulis, teks, tokoh } from "./k4b1a-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1a-bantu";

/*
 * Cerita orisinal IGIL "Loket Tiket Bu Maya" (Kelas 4 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1a.md. Bagian ini: Chunk and Read (Baca Per Bagian), Zero Check (Periksa Nol), terapannya, dan ringkasan.
 */

const WARNA_BAGIAN = ["#BFDBFE", "#BBF7D0", "#FDE68A", "#FBCFE8"];
const kartuBagian = (id: string, i: number) => kartuKosong(id, i, 100, WARNA_BAGIAN[i]);

/* ------------------------------ Chunk and Read: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Chunk and Read, atau Baca Per Bagian.";
const SUARA_B2 = "Bilangan dibagi menjadi bagian ribuan, ratusan, puluhan, dan satuan, lalu dibaca dari kiri.";
const SUARA_B3 = "Kita menyebut nama tempatnya, seperti ribu dan ratus, pada setiap bagian yang berisi angka.";
const SUARA_B4 = "Bagian yang berisi nol tidak disebut, tetapi tempatnya tetap dihitung.";

export const ADEGAN_LUAR_BACA: AdeganStory = {
  id: "luar-baca",
  judul: "Chunk and Read: Baca Per Bagian",
  sumber: "Metode global: Chunk and Read (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 2: Chunk and Read"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Chunk", teks("nm", 150, 56, "Chunk and Read", 13, K.kapurMerah)),
      tambah("Baca", teks("ni", 150, 76, "Baca Per Bagian", 11, K.kapur)),
      tambah("Bagian.", teks("bn", 150, 124, "7.025", 30, K.kapur)),
    ),
    k(
      SUARA_B2,
      hapus(0, "nm", "ni"),
      ubah(0, { id: "bn", y: 84, u: 22 }),
      tambah("bagian", ...[0, 1, 2, 3].map((i) => kartuBagian("g", i))),
      tambah("ribuan,", angkaKartu("g", 0, "7.000", 100, 10), namaKartu("g", 0)),
      tambah("ratusan,", angkaKartu("g", 1, "0", 100, 14), namaKartu("g", 1)),
      tambah("puluhan,", angkaKartu("g", 2, "20", 100, 14), namaKartu("g", 2)),
      tambah("satuan,", angkaKartu("g", 3, "5", 100, 14), namaKartu("g", 3)),
      tambah("kiri.", panah("ar", 55, 96, 196, 0, K.kapurMerah, 2)),
    ),
    k(
      SUARA_B3,
      hapus(0, "ar"),
      tambah("ribu", teks("sb0", 77, 95, "ribu", 9, K.kapurMerah)),
      tambah("ratus,", teks("sb1", 129, 95, "ratus", 9, K.kapurMerah)),
      tambah("angka.", emo("ok", 150, 50, E.benar, 18)),
    ),
    k(
      SUARA_B4,
      hapus(0, "ok"),
      sorotkan("nol", "gk1"),
      ubah("tidak", { id: "ga1", op: 0.35 }),
      tambah("tempatnya", emo("jr", 129, 86, E.tunjuk, 14)),
      tambah("dihitung.", emo("ok2", 150, 50, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ Chunk and Read: terapan ------------------------------ */
const SUARA_E1 = "Genta membaca lima ribu delapan puluh bagian demi bagian.";
const SUARA_E2 = "Lima ribu, lalu delapan puluh, sedangkan ratusan dan satuan berisi nol dan dilewati.";
const SUARA_E3 = "Cocok untuk membaca bilangan di papan dan tiket dengan cepat dan lantang.";
const SUARA_E4 = "Kurang cocok kalau kita belum hafal nama ribu, ratus, dan puluh, karena bisa keliru menyebutnya.";

export const ADEGAN_LUAR_BACA_TERAPAN: AdeganStory = {
  id: "luar-baca-terapan",
  judul: "Baca Per Bagian: kapan cocok",
  sumber: "Metode global: Chunk and Read (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Baca Per Bagian Genta"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("ge", 40, 184, "Genta"), teks("bn", 150, 100, "5.080", 34, K.kapur)),
      sorotkan("lima", "bn"),
      tambah("delapan", emo("mt", 262, 56, E.mata, 18)),
      tambah("bagian", teks("bd", 150, 140, "bagian demi bagian", 9, K.kapurMerah)),
    ),
    k(
      SUARA_E2,
      hapus(0, "bd"),
      ubah(0, { id: "bn", y: 60, u: 20 }),
      tambah("Lima", teks("b5", 75, 112, "5.000", 14, K.kapurBiru)),
      tambah("delapan", teks("b8", 135, 112, "80", 14, K.kapurBiru)),
      tambah("nol", teks("z1", 195, 112, "0", 14, K.kapurMerah, { op: 0.45 }), teks("z2", 250, 112, "0", 14, K.kapurMerah, { op: 0.45 })),
      tambah("dilewati.", teks("dl", 222, 136, "dilewati", 8, K.kapur)),
    ),
    k(
      SUARA_E3,
      hapus(0, "b5", "b8", "z1", "z2", "dl", "mt"),
      tambah("Cocok", emo("ok", 28, 52, E.benar, 20)),
      tambah("papan", teks("pp", 90, 120, "papan", 11, K.kapur)),
      tambah("tiket", teks("tk", 150, 120, "tiket", 11, K.kapur)),
      tambah("lantang.", emo("mf", 262, 52, E.megafon, 18)),
    ),
    k(
      SUARA_E4,
      hapus("Kurang", "ok", "pp", "tk", "mf"),
      tambah("Kurang", emo("xs", 28, 52, E.salah, 20)),
      tambah("hafal", emo("pk", 262, 52, E.pikir, 18)),
      tambah("ribu,", teks("r1", 75, 120, "ribu?", 11, K.kapurMerah)),
      tambah("ratus,", teks("r2", 135, 120, "ratus?", 11, K.kapurMerah)),
      tambah("puluh,", teks("r3", 195, 120, "puluh?", 11, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Zero Check: konsep ------------------------------ */
const SUARA_Z1 = "Cara ketiga, Zero Check, atau Periksa Nol.";
const SUARA_Z2 = "Setelah menulis, kita hitung kembali apakah bilangannya tetap empat angka.";
const SUARA_Z3 = "Kalau ada tempat yang kosong, kita isi dengan nol supaya angka lain tidak bergeser.";
const SUARA_Z4 = "Bilangan tanpa nol yang seharusnya ada akan berubah menjadi bilangan lain.";

export const ADEGAN_LUAR_NOL: AdeganStory = {
  id: "luar-nol",
  judul: "Zero Check: Periksa Nol",
  sumber: "Metode global: Zero Check (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Cara 3: Zero Check"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Zero", teks("nm", 150, 56, "Zero Check", 13, K.kapurMerah)),
      tambah("Periksa", teks("ni", 150, 76, "Periksa Nol", 11, K.kapur), teks("z0", 150, 130, "0", 40, K.kapurMerah)),
    ),
    k(
      SUARA_Z2,
      hapus(0, "z0"),
      tambah("menulis,", ...[0, 1, 2, 3].map((i) => kartuKosong("c", i))),
      tambah("kembali", angkaKartu("c", 0, "7"), angkaKartu("c", 2, "2"), angkaKartu("c", 3, "5")),
      tambah("empat", teks("e4", 150, 92, "4 angka?", 11, K.kapur)),
      sorotkan("angka.", "ck1"),
    ),
    k(
      SUARA_Z3,
      hapus(0, "e4"),
      sorotkan("kosong,", "ck1"),
      tambah("isi", emo("ps", 80, 90, E.pensil, 16)),
      tambah("nol", angkaKartu("c", 1, "0")),
      tambah("bergeser.", teks("bg", 150, 92, "angka lain tidak bergeser", 9, K.kapur)),
    ),
    k(
      SUARA_Z4,
      hapus(0, "bg", "ps"),
      tambah("tanpa", teks("tw", 150, 92, "tanpa 0", 12, K.kapurMerah)),
      ubah("berubah", { id: "ca1", op: 0.25 }),
      tambah("lain.", teks("bl", 150, 150, "7.25 bukan 7.025", 9, K.kapur)),
    ),
  ],
};

/* ------------------------------ Zero Check: terapan ------------------------------ */
const SUARA_N1 = "Satria menulis tiga ribu empat ratus enam dan memeriksa jumlah angkanya.";
const SUARA_N2 = "Tiga angka saja, padahal bilangan ribuan harus empat angka, jadi ia menambahkan nol.";
const SUARA_N3 = "Cocok untuk menangkap angka yang hilang pada bilangan dengan nol.";
const SUARA_N4 = "Kurang cocok untuk bilangan tanpa nol, karena pemeriksaannya hanya menghitung jumlah angka.";

export const ADEGAN_LUAR_NOL_TERAPAN: AdeganStory = {
  id: "luar-nol-terapan",
  judul: "Periksa Nol: kapan cocok",
  sumber: "Metode global: Zero Check (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Periksa Nol Satria"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("sa", 40, 184, "Satria"), ...[0, 1, 2, 3].map((i) => kartuKosong("c", i))),
      tambah("tiga", teks("uc", 150, 64, "3.406", 22, K.kapur)),
      tambah("empat", angkaKartu("c", 0, "3"), angkaKartu("c", 1, "4")),
      tambah("enam", angkaKartu("c", 3, "6")),
      tambah("memeriksa", emo("mt", 262, 56, E.mata, 18)),
    ),
    k(
      SUARA_N2,
      tambah(0, teks("t3", 90, 94, "3 angka", 10, K.kapurMerah)),
      tambah("empat", teks("t4", 210, 94, "4 angka", 10, K.kapurBiru)),
      sorotkan("menambahkan", "ck2"),
      tambah("nol", angkaKartu("c", 2, "0")),
    ),
    k(
      SUARA_N3,
      hapus(0, "t3", "t4"),
      tambah("Cocok", emo("ok", 28, 52, E.benar, 20)),
      tambah("menangkap", emo("tg", 262, 52, E.tangan, 18)),
      tambah("hilang", teks("hl", 150, 92, "angka hilang tertangkap", 9, K.kapur)),
      redamkan("nol.", "ck2"),
    ),
    k(
      SUARA_N4,
      hapus("Kurang", "ok", "tg", "hl"),
      tambah("Kurang", emo("xs", 28, 52, E.salah, 20)),
      tambah("tanpa", teks("tw", 150, 92, "tanpa 0", 11, K.kapurMerah)),
      tambah("menghitung", teks("jm", 150, 150, "hanya hitung jumlah angka", 9, K.kapur)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Bu Maya. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin menulis dari ucapan, pakai Kartu Angka. Ingin membaca dengan lantang, pakai Baca Per Bagian.";
const SUARA_R3 = "Ingin memastikan tidak ada angka yang hilang, pakai Periksa Nol. Apa pun caranya, bacalah hasilnya sekali lagi.";
const SUARA_R4 = "Menurutmu, untuk menulis nomor tiket dari ucapan petugas, cara mana yang paling pas?";
const KARTU_CARA = ["Kartu Angka", "Baca Per Bagian", "Periksa Nol"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan"), teks("n3", 150, 36, "3 cara", 10, W.ungu), ...KARTU_CARA.flatMap((c, i) => kartu(`r${i}`, 14 + i * 92, 44, 88, 40, ["#DBEAFE", "#DCFCE7", "#FEF9C3"][i], [c], 9))),
      tambah("Bu", ...tokoh("bm", 40, 184, "Bu Maya")),
      tambah("pas", emo("tq", 150, 140, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      sorotkan("Kartu", "r0-k"),
      tambah("Angka.", emo("ok1", 58, 108, E.benar, 18)),
      redamkan("Baca", "r0-k"),
      sorotkan("Baca", "r1-k"),
      tambah("Bagian.", emo("ok2", 150, 108, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      sorotkan("Periksa", "r2-k"),
      tambah("Nol.", teks("z0", 232, 108, "0", 22, W.merah), emo("ok3", 268, 110, E.benar, 18)),
      tambah("bacalah", emo("mt", 200, 160, E.mata, 18)),
      tambah("lagi.", emo("ul", 236, 160, E.ulang, 18)),
    ),
    k(
      SUARA_R4,
      hapus(0, "n3", "ok1", "ok2", "ok3", "z0", "mt", "ul"),
      redamkan(0, "r2-k"),
      tambah(0, teks("tq2", 150, 120, "?", 44, W.merah)),
      tambah("tiket", emo("tk", 90, 130, E.tiket, 22)),
      tambah("petugas,", emo("mf", 210, 130, E.megafon, 22)),
    ),
  ],
};
