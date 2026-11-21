import type { AdeganStory } from "./logika-story";
import { E, G5, W, angkaBilangan, emo, judul, kotak, tabelKosong, tanah, teks, titik, tokoh } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k5b1a-bantu";
import { KP } from "./k5b1a-luar-1";

/*
 * Cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Kelas 5 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1a.md. Bagian ini: Read by Period (Baca per Periode), terapannya, dan ringkasan memilih cara yang pas.
 */

/* ------------------------------ Read by Period: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Read by Period, atau Baca per Periode.";
const SUARA_P2 = "Kita memberi titik tiap tiga angka dari kanan, sehingga bilangan terpecah menjadi dua periode.";
const SUARA_P3 = "Periode kiri dibaca dengan tambahan kata ribu, dan periode kanan dibaca seperti biasa.";
const SUARA_P4 = "Dengan begitu bilangan lima angka dibaca seperti dua bilangan pendek yang disambung.";

export const ADEGAN_LUAR_PERIODE: AdeganStory = {
  id: "luar-periode",
  judul: "Read by Period: Periode",
  sumber: "Metode global: Read by Period (konsep)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 3: Read by Period"), kotak("pt", 8, 32, 284, 120, "#1E293B", "#0F172A", { rx: 6, tebal: 1.4, z: -1 })),
      tambah("Read", teks("nm", 150, 74, "Read by Period", 14, KP.merah, { z: 3 })),
      tambah("Baca", teks("ni", 150, 96, "Baca per Periode", 10, KP.kapur, { z: 3 })),
      tambah("Periode.", emo("ik", 150, 134, E.mata, 24, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Titik tiap Tiga Angka"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Kita", ...angkaBilangan("tb", 67482, G5)),
      tambah("titik", titik("tk", 2, G5), teks("tkn", 124, 148, "titik", 8.4, W.merah, { z: 3 })),
      tambah("tiga", teks("t3", 212, 148, "3 angka", 8.4, W.coklat, { z: 3 })),
      tambah("terpecah", kotak("gl", 20, 116, 104, 16, W.biruMuda, W.biru, { rx: 2, tebal: 1.2, z: 1 }), teks("pl", 72, 128, "periode kiri", 8, W.biru, { z: 3 })),
      tambah("kanan,", kotak("gr", 124, 116, 156, 16, W.hijauMuda, W.hijauTua, { rx: 2, tebal: 1.2, z: 1 }), teks("pr", 202, 128, "periode kanan", 8, W.hijauTua, { z: 3 })),
      tambah("dua", teks("t2", 60, 148, "2 periode", 8.4, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_P3,
      hapus(0, "t2", "t3"),
      sorotkan("kiri", "gl"),
      ubah("tambahan", { id: "pl", isi: "67 + kata ribu" }),
      redamkan("kanan", "gl"),
      sorotkan("kanan", "gr"),
      ubah("biasa.", { id: "pr", isi: "482 seperti biasa" }),
    ),
    k(
      SUARA_P4,
      redamkan(0, "gr"),
      tambah("lima", teks("a5", 70, 162, "5 angka", 9, W.hijauTua, { z: 3 })),
      tambah("dua", teks("b2", 206, 162, "= 2 bilangan pendek", 9, W.hijauTua, { z: 3 })),
      tambah("disambung.", emo("ok", 262, 142, E.benar, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Read by Period: terapan ------------------------------ */
const SUARA_Q1 = "Fajar membaca catatan Bu Ningsih: enam puluh tujuh ribu empat ratus delapan puluh dua.";
const SUARA_Q2 = "Periode kiri enam puluh tujuh disambung ribu, lalu periode kanan empat ratus delapan puluh dua.";
const SUARA_Q3 = "Cocok untuk membaca bilangan yang sudah tertulis, karena kita tinggal membaca dua bagian pendek.";
const SUARA_Q4 = "Kurang cocok untuk menulis dari ucapan, karena kita belum tahu di mana titik harus diletakkan.";

export const ADEGAN_LUAR_PERIODE_TERAPAN: AdeganStory = {
  id: "luar-periode-terapan",
  judul: "Baca Periode: kapan cocok",
  sumber: "Metode global: Read by Period (terapan)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Catatan Bu Ningsih"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("enam", teks("bl", 150, 40, "67.482", 16, W.merah, { z: 3 })),
      tambah(idx(SUARA_Q1, "dua"), ...angkaBilangan("tb", 67482, G5)),
    ),
    k(
      SUARA_Q2,
      tambah("Periode", titik("tk", 2, G5)),
      tambah("kiri", kotak("gl", 20, 116, 104, 16, W.biruMuda, W.biru, { rx: 2, tebal: 1.2, z: 1 }), teks("pl", 72, 128, "67 ribu", 9, W.biru, { z: 3 })),
      tambah("kanan", kotak("gr", 124, 116, 156, 16, W.hijauMuda, W.hijauTua, { rx: 2, tebal: 1.2, z: 1 }), teks("pr", 202, 128, "482", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_Q3,
      tambah("Cocok", emo("ok", 262, 142, E.benar, 22, { z: 3 })),
      tambah("tertulis,", teks("tt", 150, 150, "sudah tertulis", 9, W.hijauTua, { z: 3 })),
      tambah("dua", teks("b2", 150, 164, "2 bagian pendek", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_Q4,
      hapus(0, "ok", "tt", "b2"),
      tambah("Kurang", emo("xs", 262, 142, E.salah, 22, { z: 3 })),
      tambah("menulis", teks("mu", 150, 150, "menulis dari ucapan", 9, W.merah, { z: 3 })),
      tambah("titik", teks("tq", 124, 168, "titik di mana?", 9, W.merah, { z: 3 }), emo("bc", 200, 166, E.bicara, 18, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan: memilih cara yang pas ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Ningsih, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Menulis dari ucapan, pakai Isi Kotak Tempat. Bilangan banyak nol, pakai Jaga Nol. Membaca bilangan tertulis, pakai Baca per Periode.";
const SUARA_R3 = "Apa pun caranya, periksa dulu apakah banyak angka dan banyak kolomnya sudah sama.";
const SUARA_R4 = "Menurutmu, untuk bilangan empat puluh ribu tujuh, cara mana yang paling cepat?";
const KARTU = ["Isi Kotak Tempat", "Jaga Nol", "Baca per Periode"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("Tiga", ...KARTU.flatMap((n, i) => [kotak(`r${i}-k`, 8 + i * 98, 60, 88, 40, "#14532D", W.putih, { rx: 6, tebal: 1.4 }), teks(`r${i}-t`, 52 + i * 98, 84, n, 8.4, KP.kapur, { z: 2 })])),
      tambah("Ningsih", ...tokoh("bn", 150, 184, "Bu Ningsih")),
    ),
    k(
      SUARA_R2,
      sorotkan(idx(SUARA_R2, "Menulis"), "r0-k"),
      tambah(idx(SUARA_R2, "Menulis"), emo("ok1", 52, 124, E.benar, 20)),
      redamkan(idx(SUARA_R2, "Bilangan"), "r0-k"),
      sorotkan(idx(SUARA_R2, "Bilangan"), "r1-k"),
      tambah(idx(SUARA_R2, "Bilangan"), emo("ok2", 150, 124, E.benar, 20)),
      tambah(idx(SUARA_R2, "nol", 1), teks("z0", 150, 144, "banyak 0", 8.4, W.merah)),
      redamkan(idx(SUARA_R2, "Membaca"), "r1-k"),
      sorotkan(idx(SUARA_R2, "Membaca"), "r2-k"),
      tambah(idx(SUARA_R2, "Membaca"), emo("ok3", 248, 124, E.benar, 20)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r2-k"),
      hapus(0, "ok1", "ok2", "ok3", "z0"),
      tambah("banyak", teks("ps", 150, 140, "banyak angka = banyak kolom", 9, W.hijauTua)),
      tambah("sama.", emo("ok", 262, 124, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas"), ...tanah("tn", 150)),
      tambah("empat", teks("bl", 150, 66, "40.007", 22, W.merah)),
      tambah("cara", ...KARTU.flatMap((n, i) => [kotak(`p${i}-k`, 8 + i * 98, 92, 88, 30, "#14532D", W.putih, { rx: 6, tebal: 1.4 }), teks(`p${i}-t`, 52 + i * 98, 111, n, 8.4, KP.kapur, { z: 2 })])),
      tambah("cepat?", teks("tq", 150, 148, "?", 26, W.merah), emo("ik", 262, 148, E.pikir, 22)),
    ),
  ],
};
