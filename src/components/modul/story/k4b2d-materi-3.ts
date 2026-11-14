import type { AdeganStory } from "./logika-story";
import { LATIHAN_DUA, LATIHAN_SATU, LATIHAN_TIGA, W, barisTabel, batang, emo, judul, kartu, teks } from "./k4b2d-gambar";
import { bersih, k, tambah } from "./k4b2d-bantu";

/** Tabel kunci sembilan jawaban, dikumpulkan dari data buku (pembilang, penyebut, desimal). */
export const KUNCI_SEMBILAN: readonly (readonly [string, number, number, string])[] = [
  ...LATIHAN_SATU.map((d, i) => [`1${"abc"[i]}`, d.bagian, d.total, d.desimal] as const),
  ...LATIHAN_DUA.map(([n, d], i) => [`2${"abc"[i]}`, n, 10, d] as const),
  ...LATIHAN_TIGA.map(([n, d], i) => [`3${"abc"[i]}`, n, 100, d] as const),
];

/* ------------------------------ 9. Memeriksa kunci dengan hitungan mandiri (Panduan Guru hlm. 105-106) ------------------------------ */
const SUARA_K1 = "Mari periksa semua jawaban dengan hitungan sendiri. Aturannya: penyebut sepuluh berarti satu angka di belakang koma, penyebut seratus berarti dua angka.";
const SUARA_K2 = "Latihan satu: empat, lima, dan tiga per sepuluh menjadi nol koma empat, nol koma lima, dan nol koma tiga. Latihan dua: satu, lima, dan sembilan per sepuluh menjadi nol koma satu, nol koma lima, dan nol koma sembilan.";
const SUARA_K3 = "Latihan tiga: lima belas, enam puluh dua, dan delapan puluh satu per seratus menjadi nol koma satu lima, nol koma enam dua, dan nol koma delapan satu. Semuanya memakai dua angka di belakang koma.";
const SUARA_K4 = "Sembilan jawaban diperiksa, semuanya benar. Tidak ada jawaban yang perlu dikoreksi, karena semuanya cocok dengan hitungan sendiri.";

const LEBAR_KUNCI = [50, 112, 112];

export const ADEGAN_PERIKSA_KUNCI: AdeganStory = {
  id: "periksa-kunci",
  judul: "Memeriksa sembilan jawaban dengan hitungan sendiri",
  sumber: "Materi: memeriksa jawaban",
  latar: "#ECFDF5",
  kutipan: [
    "Ayo Berlatih",
    "4 10 = 0,4 5 10 = 0,5 3 10 = 0,3",
    "a. 1 10 = 0,1 b. 5 10 = 0,5 c.",
    "9 10 = 0,9 15 100 = 0,15 62 100 = 0,62 81 100 = 0,81",
    "15 100 = 0,15",
    "2. Ubahkan pecahan biasa berikut menjadi pecahan desimal persepuluhan",
    "3. Ubahlah pecahan biasa berikut menjadi pecahan desimal perseratusan!",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Periksa dengan hitungan sendiri")),
      tambah("penyebut", ...kartu("pa", 14, 40, 128, 50, W.hijauMuda, ["penyebut 10", "1 angka"], 10)),
      tambah("seratus", ...kartu("pb", 158, 40, 128, 50, W.langit, ["penyebut 100", "2 angka"], 10)),
      tambah("koma.", emo("pc", 150, 130, "🔍", 30)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Latihan 1 dan latihan 2")),
      tambah(0, ...barisTabel("pd0", 13, 36, LEBAR_KUNCI, ["latihan", "pecahan", "desimal"], 22, 8.4, true)),
      tambah("Latihan", ...barisTabel("pd1", 13, 58, LEBAR_KUNCI, ["1", "4/10  5/10  3/10", "0,4  0,5  0,3"], 22, 8.8)),
      tambah("Latihan@2", ...barisTabel("pd2", 13, 80, LEBAR_KUNCI, ["2", "1/10  5/10  9/10", "0,1  0,5  0,9"], 22, 8.8)),
      tambah("sembilan", emo("pd3", 150, 140, "✅", 26)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Latihan 3")),
      tambah(0, ...barisTabel("pe0", 13, 36, LEBAR_KUNCI, ["latihan", "pecahan", "desimal"], 22, 8.4, true)),
      tambah("lima", ...barisTabel("pe1", 13, 58, LEBAR_KUNCI, ["3a", "15/100", "0,15"], 22, 9.6)),
      tambah("enam", ...barisTabel("pe2", 13, 80, LEBAR_KUNCI, ["3b", "62/100", "0,62"], 22, 9.6)),
      tambah("delapan", ...barisTabel("pe3", 13, 102, LEBAR_KUNCI, ["3c", "81/100", "0,81"], 22, 9.6)),
      tambah("Semuanya", ...kartu("pe4", 40, 138, 220, 32, W.emas, ["seratus  →  2 angka di belakang koma"], 8.8)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Hasil pemeriksaan")),
      tambah("Sembilan", teks("pf", 150, 69, "9 dari 9 benar", 22, W.hijau)),
      tambah("semuanya", emo("pg", 150, 118, "✅", 40)),
      tambah("koreksi,", ...kartu("ph", 30, 138, 240, 34, W.hijauMuda, ["tidak ada jawaban yang perlu dikoreksi"], 9.2)),
    ),
  ],
};

/* ------------------------------ 10. Belajar bersama dan soal tambahan (pesan guru; id adegan tetap diferensiasi) ------------------------------ */
const SUARA_D1 = "Setiap murid punya cara dan kecepatan belajar yang berbeda, dan itu wajar. Jadi pelajari desimal dengan caramu sendiri, lalu saling bantu dengan temanmu.";
const SUARA_D2 = "Belajarlah dalam kelompok kecil. Teman yang sudah paham membantu menjelaskan, dan anggota lain berani bertanya.";
const SUARA_D3 = "Bila kamu cepat selesai, coba kerjakan soal tambahan tanpa bantuan. Bila kamu masih kesulitan, jangan malu minta didampingi guru atau temanmu.";
const SUARA_D4 = "Bila tidak ada yang paham sekali di kelompokmu, tidak apa-apa. Bekerjalah bersama, dan diskusikan pecahan desimal persepuluhan dan perseratusan.";
const SUARA_D5 = "Soal tambahan untukmu: sepuluh bagian dengan enam terwarnai, tuliskan pecahan biasa dan desimalnya. Untuk perseratusan: tiga puluh empat per seratus, desimalnya nol koma tiga empat.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Belajar bersama dan soal tambahan",
  sumber: "Materi: belajar bersama",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Karakteristik peserta didik di masing-masing sekolah akan berbeda-beda,",
    "kondisi seperti ini hanya guru yang memahami.",
    "Model pembelajaran yang disarankan untuk bab ini adalah Problem",
    "Based Learning.",
    "ditentukan ketua kelompok adalah peserta didik dengan",
    "tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan",
    "(advanced), minta mereka mengerjakan Latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "semua anggota kelompok dapat bekerja sama untuk",
    "guru dapat menerapkan metode diskusi dengan melibatkan peserta didik dalam",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Belajar bersama")),
      tambah("cara", ...kartu("da", 14, 34, 272, 34, W.hijauMuda, ["tiap murid belajar dengan cara berbeda"], 9.4)),
      tambah("wajar", ...kartu("db", 14, 76, 272, 34, W.krem, ["perbedaan itu wajar"], 9.4)),
      tambah("saling", ...kartu("dc", 14, 118, 272, 44, W.emas, ["saling bantu", "dengan teman"], 9.6)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Kelompok belajar")),
      tambah("Kelompok", emo("dd", 40, 62, "👥", 28), ...kartu("de", 64, 36, 222, 40, W.langit, ["belajar dalam", "kelompok kecil"], 8.8)),
      tambah("paham", ...kartu("df", 14, 92, 272, 32, W.hijauMuda, ["yang sudah paham membantu menjelaskan"], 9.4)),
      tambah("anggota", ...kartu("dg", 14, 132, 272, 32, W.krem, ["anggota lain berani bertanya"], 9.4)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Cepat selesai atau masih sulit")),
      tambah("cepat", ...kartu("dh", 14, 34, 272, 32, W.hijauMuda, ["cepat selesai: kerjakan tanpa bantuan"], 9.4)),
      tambah("soal", ...kartu("di", 14, 74, 272, 32, W.langit, ["coba soal tambahan"], 9.4)),
      tambah("didampingi", ...kartu("dj", 14, 114, 272, 32, W.pink, ["masih sulit: minta didampingi"], 9.4)),
      tambah("kesulitan.", emo("dk", 150, 178, "🤝", 24)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bila belum ada yang paham sekali")),
      tambah("tidak", ...kartu("dl", 14, 34, 272, 44, W.krem, ["belum ada yang paham sekali:", "tidak apa-apa"], 9)),
      tambah("tidak@2", ...kartu("dm", 14, 90, 272, 44, W.langit, ["bekerjalah bersama:", "diskusikan desimalnya"], 9)),
      tambah("diskusi", emo("dn", 150, 170, "💬", 26)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Soal tambahan")),
      tambah("sepuluh", ...batang("do", 20, 34, 26, 6)),
      tambah("enam", teks("dp", 150, 82, "6 dari 10 bagian", 9.4, W.coklat)),
      tambah("tuliskan", ...kartu("dq", 14, 94, 272, 30, W.hijauMuda, ["jawaban: 6/10 = 0,6"], 10)),
      tambah("tiga", ...kartu("dr", 14, 134, 272, 30, W.langit, ["34/100  →  0,34"], 10)),
      tambah("empat@2", emo("ds", 150, 186, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 11. Ringkasan pecahan desimal (id adegan tetap catatan-buku) ------------------------------ */
const SUARA_T1 = "Mari kita rangkum. Pecahan desimal persepuluhan punya penyebut sepuluh, dan hanya satu angka di belakang koma. Contohnya tiga per sepuluh ditulis nol koma tiga.";
const SUARA_T2 = "Pecahan desimal perseratusan punya penyebut seratus, dan ada dua angka di belakang koma. Contohnya dua puluh lima per seratus ditulis nol koma dua lima.";
const SUARA_T3 = "Ingat selalu: satu angka di belakang koma berarti persepuluhan, dua angka berarti perseratusan. Tuliskan pembilang di belakang koma, dan tambahkan nol di depannya bila perlu, misalnya tujuh per seratus menjadi nol koma nol tujuh.";

export const ADEGAN_CATATAN_BUKU: AdeganStory = {
  id: "catatan-buku",
  judul: "Ringkasan pecahan desimal",
  sumber: "Materi: ringkasan pecahan desimal",
  latar: "#FEFCE8",
  kutipan: [
    "setelah mempelajari sub bab ini, Peserta didik diharapkan mampu",
    "serta menghubungkan pecahan desimal perseratusan dengan konsep persen.",
    "2. Ubahkan pecahan biasa berikut menjadi pecahan desimal persepuluhan",
    "2. Ubahlah pecahan biasa berikut menjadi pecahan desimal persepuluhan!",
    "3. Ubahlah pecahan biasa berikut menjadi pecahan desimal perseratusan!",
    "lalu 1 biskuit dilapisi selai coklat.",
    "Contoh pecahan desimal",
    "Karena terdapat 2 angka di belakang koma, maka nilai penyebut 100",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Ringkasan: persepuluhan")),
      tambah("persepuluhan", ...kartu("ta", 14, 34, 272, 32, W.hijauMuda, ["persepuluhan: penyebut 10"], 9.4)),
      tambah("satu", ...kartu("tb", 14, 74, 272, 32, W.krem, ["1 angka di belakang koma"], 9.4)),
      tambah("Contohnya", ...kartu("tc", 14, 114, 272, 32, W.emas, ["3/10 = 0,3"], 11)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Ringkasan: perseratusan")),
      tambah("perseratusan", ...kartu("te", 14, 34, 272, 32, W.langit, ["perseratusan: penyebut 100"], 9.4)),
      tambah("dua", ...kartu("tf", 14, 74, 272, 32, W.krem, ["2 angka di belakang koma"], 9.4)),
      tambah("Contohnya", ...kartu("tg", 14, 114, 272, 32, W.emas, ["25/100 = 0,25"], 11)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Ringkasan pecahan desimal")),
      tambah("satu", ...kartu("tk", 14, 34, 272, 32, W.hijauMuda, ["1 angka di belakang koma: persepuluhan"], 9.4)),
      tambah("dua", ...kartu("tl", 14, 74, 272, 32, W.langit, ["2 angka di belakang koma: perseratusan"], 9.4)),
      tambah("Tuliskan", ...kartu("tm", 14, 114, 272, 32, W.krem, ["pembilang di belakang koma, nol di depan"], 9.4)),
      tambah("misalnya", ...kartu("tn", 14, 154, 272, 30, W.emas, ["7/100 = 0,07"], 11)),
    ),
  ],
};
