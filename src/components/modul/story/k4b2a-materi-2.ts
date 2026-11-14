import type { AdeganStory } from "./logika-story";
import { BENTUK_LATIHAN, W, barisTabel, bulat, emo, garis, judul, kartu, kincir, kipas, kisi, lingkaranBagi, panah, pecahan, segitigaBagi, teks } from "./k4b2a-gambar";
import { bersih, idx, k, sorotkan, tambah, hapus } from "./k4b2a-bantu";

/* ------------------------------ 5. Ayo Mengamati: pizza dibagi empat (Buku Siswa hlm. 58–59; Panduan Guru hlm. 94) ------------------------------ */
const SUARA_Z1 = "Ayo mengamati. Ibu guru membawa sebuah pizza dan memotongnya menjadi empat bagian yang sama. Potongan itu akan dibagikan kepada empat siswa yang mendapat nilai tertinggi.";
const SUARA_Z2 = "Pertanyaan buku: berapa bagian pizza yang didapatkan masing-masing siswa? Jawaban murid dalam buku masih terputus: tiap anak mendapatkan satu, dan seterusnya.";
const SUARA_Z3 = "Ibu guru melanjutkan: tiap anak mendapatkan satu dari empat bagian pizza utuh. Untuk menyatakannya dipakai bilangan pecahan, yang ditulis satu per empat.";
const SUARA_Z4 = "Panduan guru: guru meminta murid mengamati gambar pizza yang telah dipotong. Kegiatan ini boleh diganti dengan benda di sekitar murid, asalkan dekat dengan kehidupan mereka.";

const SISWA: [number, number][] = [
  [205, 78],
  [255, 78],
  [205, 128],
  [255, 128],
];

export const ADEGAN_AMATI_PIZZA: AdeganStory = {
  id: "amati-pizza",
  judul: "Ayo Mengamati: pizza dibagi empat",
  sumber: "Buku Siswa hlm. 58–59; Panduan Guru hlm. 94",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Mengamati",
    "Ibu guru membawa sebuah pizza. Beliau akan memotong pizza tersebut menjadi 4 bagian yang sama.",
    "Ibu guru akan membagi potongan-potongan pizza tersebut kepada 4 siswa yang mendapat nilai tertinggi.",
    "Berapa bagian pizza yang didapatkan masing-masing siswa?",
    "Tiap anak mendapatkan 1 Bu",
    "Ya, tiap anak mendapatkan 1 dari 4 bagian pizza utuh, untuk menyatakannya kita menggunakan bilangan pecahan.",
    "Pernyataan pecahan tersebut dapat dituliskan menjadi",
    "Guru meminta peserta didik untuk mengamati gambar pizza yang telah dipotong.",
    "Kegiatan ini dapat diganti disesuaikan kondisi di dalam kelas masing-masing guru",
    "sehingga apa yang disajikan adalah sesuatu yang ada di sekitar peserta didik.",
  ],
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ayo Mengamati: pizza")),
      tambah("pizza", bulat("pa0", 90, 100, 50, W.jingga, W.coklat, { tebal: 2 })),
      tambah(idx(SUARA_Z1, "empat", 1), ...lingkaranBagi("pa", 90, 100, 50, 4, 0, W.jingga)),
      hapus(idx(SUARA_Z1, "empat", 1), "pa0"),
      tambah(idx(SUARA_Z1, "empat", 2), ...SISWA.flatMap(([x, y], i) => [emo(`ps${i}`, x, y, "🧒", 28), teks(`ps${i}n`, x, y + 14, String(i + 1), 8.6, W.biru)])),
      tambah("tertinggi.", ...kartu("pk", 20, 166, 260, 26, W.krem, ["4 siswa dengan nilai tertinggi"], 9)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Tanya jawab di buku")),
      tambah("Pertanyaan", emo("pg", 30, 62, "🧕", 30), ...kartu("pt", 52, 30, 236, 48, W.langit, ["berapa bagian pizza yang didapatkan", "masing-masing siswa?"], 8.6)),
      tambah("Jawaban", ...kartu("pj", 14, 100, 210, 48, W.krem, ["tiap anak mendapatkan 1 Bu…", "(kalimat terputus)"], 8.8), emo("pm", 258, 134, "🧒", 30)),
      tambah("satu,", teks("pl", 150, 176, "dilanjutkan Ibu guru", 8.8, W.coklat)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("1 dari 4 bagian pizza utuh")),
      tambah("tiap", ...lingkaranBagi("pu", 78, 108, 46, 4, 1, W.jingga)),
      tambah("satu", ...kartu("pv", 140, 40, 150, 46, W.hijauMuda, ["1 dari 4 bagian", "pizza utuh"], 9.2)),
      tambah("pecahan,", teks("pw", 215, 106, "bilangan pecahan", 8.8, W.coklat)),
      tambah("ditulis", ...pecahan("pf", 215, 140, "1", "4", 26)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Catatan Panduan Guru")),
      tambah("meminta", ...kartu("pc1", 14, 32, 272, 34, W.hijauMuda, ["mengamati gambar pizza yang dipotong"], 9)),
      tambah("diganti", ...kartu("pc2", 14, 74, 272, 34, W.langit, ["boleh diganti benda di sekitar murid"], 9)),
      tambah("sekitar", emo("pc3", 80, 150, "🍞", 30), emo("pc4", 150, 150, "🍉", 30), emo("pc5", 220, 150, "🍕", 30)),
      tambah("dekat", teks("pc6", 150, 184, "dekat dengan kehidupan murid", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 6. Pembilang dan penyebut (Buku Siswa hlm. 59; Panduan Guru hlm. 92–93) ------------------------------ */
const SUARA_B1 = "Pecahan satu per empat tersusun dari dua bilangan yang dipisah sebuah garis. Bilangan satu di atas garis adalah pembilang.";
const SUARA_B2 = "Bilangan empat di bawah garis adalah penyebut. Penyebut menunjukkan banyak bagian yang sama dalam satu pizza utuh, dan pembilang menunjukkan berapa bagian yang diambil.";
const SUARA_B3 = "Murid dalam buku menyimpulkan: jadi kita menggunakan pecahan. Pecahan seperti satu per empat, yang pembilangnya satu, itulah yang dipelajari di subbab ini.";
const SUARA_B4 = "Panduan guru menyebut pembilang sebagai bilangan terbagi. Di Buku Siswa istilah ini muncul lewat panah berlabel pembilang dan penyebut di samping pecahan satu per empat.";

export const ADEGAN_PEMBILANG: AdeganStory = {
  id: "pembilang-penyebut",
  judul: "Pembilang dan penyebut",
  sumber: "Buku Siswa hlm. 59; Panduan Guru hlm. 92–93",
  latar: "#F0F9FF",
  kutipan: [
    "Pembilang",
    "Penyebut",
    "Oh begitu ya Bu. Jadi kita menggunakan pecahan",
    "Pembilang adalah bilangan terbagi.",
    "di atas garis pemisah disebut dengan pembilang",
    "sedangkan bilangan di bagian bawah disebut penyebut.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pecahan satu per empat")),
      tambah("tersusun", ...pecahan("pb", 100, 104, "1", "4", 46)),
      tambah("garis.", teks("pz", 100, 176, "garis pecahan", 8.8, W.coklat)),
      tambah("pembilang.", ...kartu("pl", 180, 56, 104, 28, W.biruMuda, ["Pembilang"], 9.6, { op: 1 }), panah("pla", 180, 70, -50, 14, W.biruMuda, 1.8)),
    ),
    k(
      SUARA_B2,
      tambah("penyebut.", ...kartu("pn", 180, 120, 104, 28, W.merahMuda, ["Penyebut"], 9.6), panah("pna", 180, 134, -50, 12, W.merah, 1.8)),
      tambah("pizza", ...lingkaranBagi("pp", 250, 176, 18, 4, 1, W.jingga)),
      sorotkan("diambil.", "pl-t0"),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Pecahan dengan pembilang satu")),
      tambah("menyimpulkan:", ...kartu("pc", 20, 30, 260, 28, W.krem, ["murid: jadi kita menggunakan pecahan"], 8.8)),
      tambah("seperti", ...pecahan("pq1", 40, 110, "1", "2", 20), ...pecahan("pq2", 100, 110, "1", "3", 20), ...pecahan("pq3", 160, 110, "1", "4", 20)),
      tambah("pembilangnya", ...pecahan("pq4", 220, 110, "1", "5", 20), ...pecahan("pq5", 270, 110, "1", "10", 20)),
      tambah("subbab", ...kartu("pr", 40, 158, 220, 30, W.emas, ["pembilang selalu satu"], 9.6)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Istilah di Panduan Guru dan buku")),
      tambah("terbagi.", ...kartu("pu", 14, 32, 272, 30, W.krem, ["pembilang: bilangan terbagi"], 9.2)),
      tambah("panah", ...pecahan("pv", 70, 112, "1", "4", 34)),
      tambah(idx(SUARA_B4, "pembilang", 2), teks("pw1", 190, 100, "Pembilang", 9.6, W.biruMuda), panah("pw1a", 150, 96, -62, 0, W.biruMuda, 1.8)),
      tambah(idx(SUARA_B4, "penyebut", 1), teks("pw2", 190, 140, "Penyebut", 9.6, W.merah), panah("pw2a", 150, 136, -62, 0, W.merah, 1.8)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih: bentuk pecahan dari gambar (Buku Siswa hlm. 59–60; Panduan Guru hlm. 94–95) ------------------------------ */
const SUARA_T1 = "Ayo berlatih: tuliskan bentuk pecahan dari gambar, bagian yang diarsir dari keseluruhan. Pada nomor satu, segitiga terbagi dua bagian sama dan satu bagian diarsir. Jawabannya satu per dua.";
const SUARA_T2 = "Nomor dua: batang terbagi empat bagian sama, satu diarsir, jadi satu per empat. Nomor tiga: kisi lima kolom dan dua baris, jadi sepuluh bagian sama, satu diarsir, sehingga satu per sepuluh.";
const SUARA_T3 = "Nomor empat: tiga segitiga bertemu di satu titik, satu diarsir, jadi satu per tiga. Nomor lima: kipas dengan lima kelopak sama, satu diarsir, jadi satu per lima.";
const SUARA_T4 = "Kunci panduan guru: satu per dua, satu per empat, satu per sepuluh, satu per tiga, dan satu per lima. Hitungan mandiri cocok: tiap gambar terbagi bagian sama dan satu bagian diarsir.";

export const ADEGAN_BERLATIH_BENTUK: AdeganStory = {
  id: "berlatih-bentuk",
  judul: "Ayo Berlatih: bentuk pecahan dari gambar",
  sumber: "Buku Siswa hlm. 59–60; Panduan Guru hlm. 94–95",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berlatih",
    "Tuliskan bentuk pecahan dari gambar berikut! (diarsir dari keseluruhan)",
    "Guru meminta peserta didik untuk mengamati gambar pizza yang telah dipotong.",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Nomor 1: segitiga")),
      tambah("segitiga", ...segitigaBagi("b1", 60, 40, 110, 96, 2, 1)),
      tambah("terbagi", ...kartu("b1k", 30, 152, 240, 30, W.krem, ["2 bagian sama, 1 bagian diarsir"], 9)),
      tambah("Jawabannya", ...pecahan("b1r", 235, 92, "1", "2", 32)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Nomor 2 dan nomor 3")),
      tambah("batang", ...kisi("b2", 20, 38, 4, 1, 32, 30, 1)),
      tambah(idx(SUARA_T2, "jadi", 1), ...pecahan("b2r", 215, 52, "1", "4", 24)),
      tambah("kisi", ...kisi("b3", 20, 104, 5, 2, 28, 26, 1)),
      tambah("sehingga", ...pecahan("b3r", 215, 124, "1", "10", 24)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Nomor 4 dan nomor 5")),
      tambah("segitiga", ...kincir("b4", 60, 100, 54, 1)),
      tambah(idx(SUARA_T3, "jadi", 1), ...pecahan("b4r", 140, 100, "1", "3", 24)),
      tambah("kipas", ...kipas("b5", 235, 150, 54, 5, 22, -130, 1)),
      tambah(idx(SUARA_T3, "jadi", 2), ...pecahan("b5r", 250, 60, "1", "5", 24)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kunci: bagian sama dan arsiran")),
      tambah("Kunci", ...barisTabel("kt0", 15, 30, [34, 100, 66, 70], ["no", "bagian sama", "diarsir", "pecahan"], 22, 8.4, true)),
      ...BENTUK_LATIHAN.map(([n, a], i) => tambah(["dua,", "empat,", "sepuluh,", "tiga,", "lima."][i], ...barisTabel(`kt${i + 1}`, 15, 30 + (i + 1) * 22, [34, 100, 66, 70], [String(i + 1), String(n), String(a), `${a}/${n}`], 22, 8.8))),
      tambah("cocok:", ...kartu("kz", 40, 168, 220, 24, W.hijauMuda, ["hitungan mandiri cocok dengan kunci"], 8.6)),
    ),
  ],
};

/* ------------------------------ 8. Membandingkan: 1/2 dan 1/4 (Buku Siswa hlm. 60–61; Panduan Guru hlm. 95) ------------------------------ */
const SUARA_D1 = "Membandingkan pecahan dengan pembilang satu. Buku memberi dua gambar dari benda yang berukuran sama. Gambar pertama dibagi dua, satu bagian diarsir. Gambar kedua dibagi empat, satu bagian diarsir.";
const SUARA_D2 = "Pertanyaannya: daerah arsir mana yang lebih besar? Lihat panjang arsirannya. Arsiran satu per dua lebih panjang daripada arsiran satu per empat.";
const SUARA_D3 = "Jadi daerah arsir satu per dua lebih besar dari daerah arsir satu per empat. Maka satu per dua lebih dari satu per empat, ditulis dengan tanda lebih dari.";

export const ADEGAN_BANDING_BESAR: AdeganStory = {
  id: "banding-besar",
  judul: "Membandingkan: setengah dan seperempat",
  sumber: "Buku Siswa hlm. 60–61; Panduan Guru hlm. 95",
  latar: "#F0FDF4",
  kutipan: [
    "Membandingkan pecahan dengan pembilang satu",
    "Ayo Mengamati",
    "Amati gambar di atas. Bandingkan daerah arsir antara kedua pecahan tersebut.",
    "Daerah arsir mana yang lebih besar?",
    "lebih besar dari daerah arsir",
    "Atau dapat ditulis sebagai berikut:",
    "Guru meminta peserta didik untuk mengamati 2 gambar yang ada di buku",
    "siswa tentang pecahan berbeda dari benda yang berukuran sama",
    "Peserta didik dapat menentukan mana pecahan yang lebih besar atau lebih kecil.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dua gambar, benda sama besar")),
      tambah("pertama", ...kisi("d1", 30, 40, 2, 1, 60, 34, 1), ...pecahan("d1r", 215, 57, "1", "2", 26)),
      tambah("kedua", ...kisi("d2", 30, 112, 4, 1, 30, 34, 1), ...pecahan("d2r", 215, 129, "1", "4", 26)),
      tambah("sama.", teks("dsm", 75, 98, "keseluruhan sama besar", 8, W.coklat)),
    ),
    k(
      SUARA_D2,
      hapus(0, "dsm"),
      tambah("Lihat", garis("dk1", 30, 84, 60, 0, W.merah, 2.6), teks("dt1", 60, 96, "lebih panjang", 8.2, W.merah)),
      tambah("daripada", garis("dk2", 30, 156, 30, 0, W.merah, 2.6), teks("dt2", 45, 168, "lebih pendek", 8.2, W.merah)),
      sorotkan("Arsiran", "d1-c0"),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Lebih dari")),
      tambah("daerah", ...kisi("d3p", 20, 150, 2, 1, 30, 18, 1), ...kisi("d3q", 190, 150, 4, 1, 15, 18, 1)),
      tambah("Maka", ...pecahan("d3a", 80, 90, "1", "2", 34), ...pecahan("d3b", 220, 90, "1", "4", 34)),
      tambah("tanda", teks("d3c", 150, 100, ">", 34, W.merah)),
      sorotkan("lebih@3", "d3c"),
    ),
  ],
};
