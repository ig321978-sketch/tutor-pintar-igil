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
const SUARA_K1 = "Mari periksa semua kunci dengan hitungan sendiri. Aturannya: penyebut sepuluh berarti satu angka di belakang koma, penyebut seratus berarti dua angka.";
const SUARA_K2 = "Nomor satu: empat, lima, dan tiga per sepuluh menjadi nol koma empat, nol koma lima, dan nol koma tiga. Nomor dua: satu, lima, dan sembilan per sepuluh menjadi nol koma satu, nol koma lima, dan nol koma sembilan.";
const SUARA_K3 = "Nomor tiga: lima belas, enam puluh dua, dan delapan puluh satu per seratus menjadi nol koma satu lima, nol koma enam dua, dan nol koma delapan satu. Semuanya memakai dua angka di belakang koma.";
const SUARA_K4 = "Sembilan jawaban diperiksa, semuanya benar. Tidak ada kunci yang perlu dikoreksi, karena kunci panduan guru cocok dengan hitungan mandiri.";

const LEBAR_KUNCI = [50, 112, 112];

export const ADEGAN_PERIKSA_KUNCI: AdeganStory = {
  id: "periksa-kunci",
  judul: "Memeriksa sembilan kunci dengan hitungan mandiri",
  sumber: "Panduan Guru hlm. 105–106",
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
      tambah(0, judul("Nomor 1 dan nomor 2")),
      tambah(0, ...barisTabel("pd0", 13, 36, LEBAR_KUNCI, ["nomor", "pecahan", "desimal"], 22, 8.4, true)),
      tambah("Nomor", ...barisTabel("pd1", 13, 58, LEBAR_KUNCI, ["1", "4/10  5/10  3/10", "0,4  0,5  0,3"], 22, 8.8)),
      tambah("Nomor@2", ...barisTabel("pd2", 13, 80, LEBAR_KUNCI, ["2", "1/10  5/10  9/10", "0,1  0,5  0,9"], 22, 8.8)),
      tambah("sembilan", emo("pd3", 150, 140, "✅", 26)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Nomor 3")),
      tambah(0, ...barisTabel("pe0", 13, 36, LEBAR_KUNCI, ["nomor", "pecahan", "desimal"], 22, 8.4, true)),
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
      tambah("koreksi,", ...kartu("ph", 30, 138, 240, 34, W.hijauMuda, ["tidak ada kunci yang perlu dikoreksi"], 9.2)),
    ),
  ],
};

/* ------------------------------ 10. Diferensiasi (Panduan Guru hlm. 106-107) ------------------------------ */
const SUARA_D1 = "Diferensiasi dari panduan guru: karakteristik murid di tiap sekolah berbeda, dan hanya guru yang memahami kondisinya. Model pembelajaran yang disarankan adalah Problem Based Learning.";
const SUARA_D2 = "Kelompok dibentuk menurut karakteristik atau keberagaman murid. Ketua kelompok adalah murid berkemampuan tinggi, dengan anggota berkemampuan sedang atau kurang.";
const SUARA_D3 = "Murid yang cepat belajar diminta mengerjakan latihan tanpa bantuan, dan guru dapat memberi soal tambahan. Pada saat yang sama guru mendampingi murid yang mengalami kesulitan.";
const SUARA_D4 = "Bila tidak ada murid berkemampuan tinggi, model yang sama membuat semua anggota kelompok bekerja sama. Bila model itu tidak memungkinkan, guru memakai metode diskusi tentang pecahan desimal persepuluhan dan perseratusan.";
const SUARA_D5 = "Usul soal tambahan dari video, bukan dari buku: sepuluh bagian dengan enam terwarnai, tuliskan pecahan biasa dan desimalnya. Untuk perseratusan: tiga puluh empat per seratus, desimalnya nol koma tiga empat.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Diferensiasi dari Panduan Guru dan usulan soal tambahan",
  sumber: "Panduan Guru hlm. 106–107; usulan video",
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
      tambah(0, judul("Diferensiasi")),
      tambah("karakteristik", ...kartu("da", 14, 34, 272, 34, W.hijauMuda, ["murid tiap sekolah berbeda-beda"], 9.4)),
      tambah("hanya", ...kartu("db", 14, 76, 272, 34, W.krem, ["hanya guru yang memahami kondisinya"], 9.4)),
      tambah("Model", ...kartu("dc", 14, 118, 272, 44, W.emas, ["model yang disarankan:", "Problem Based Learning"], 9.6)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Kelompok belajar")),
      tambah("Kelompok", emo("dd", 40, 62, "👥", 28), ...kartu("de", 64, 36, 222, 40, W.langit, ["dibentuk menurut karakteristik", "atau keberagaman murid"], 8.8)),
      tambah("Ketua", ...kartu("df", 14, 92, 272, 32, W.hijauMuda, ["ketua: murid berkemampuan tinggi"], 9.4)),
      tambah("anggota", ...kartu("dg", 14, 132, 272, 32, W.krem, ["anggota: kemampuan sedang atau kurang"], 9.4)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Murid cepat dan murid kesulitan")),
      tambah("cepat", ...kartu("dh", 14, 34, 272, 32, W.hijauMuda, ["murid cepat: latihan tanpa bantuan"], 9.4)),
      tambah("soal", ...kartu("di", 14, 74, 272, 32, W.langit, ["guru dapat memberi soal tambahan"], 9.4)),
      tambah("mendampingi", ...kartu("dj", 14, 114, 272, 32, W.pink, ["guru mendampingi yang kesulitan"], 9.4)),
      tambah("kesulitan.", emo("dk", 150, 178, "🤝", 24)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bila tidak ada murid tinggi")),
      tambah("tidak", ...kartu("dl", 14, 34, 272, 44, W.krem, ["tidak ada murid berkemampuan tinggi:", "semua anggota bekerja sama"], 9)),
      tambah("tidak@2", ...kartu("dm", 14, 90, 272, 44, W.langit, ["model tidak memungkinkan:", "guru memakai metode diskusi"], 9)),
      tambah("diskusi", emo("dn", 150, 170, "💬", 26)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Usul soal tambahan")),
      tambah("sepuluh", ...batang("do", 20, 34, 26, 6)),
      tambah("enam", teks("dp", 150, 82, "6 dari 10 bagian", 9.4, W.coklat)),
      tambah("tuliskan", ...kartu("dq", 14, 94, 272, 30, W.hijauMuda, ["jawaban: 6/10 = 0,6"], 10)),
      tambah("tiga", ...kartu("dr", 14, 134, 272, 30, W.langit, ["34/100  →  0,34"], 10)),
      tambah("empat@2", emo("ds", 150, 186, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 11. Catatan temuan buku dan ringkasan (Buku Siswa hlm. 71-75; Panduan Guru hlm. 104-107) ------------------------------ */
const SUARA_T1 = "Catatan temuan buku. Semua kunci cocok dengan hitungan mandiri. Namun nomor tiga tidak memakai gambar, dan seratus biskuit di buku tidak digambar, jadi kisi seratus kotak di video ini dirancang sendiri.";
const SUARA_T2 = "Panduan guru menulis pengalaman belajar yang sama dengan subbab berikutnya: murid juga diharapkan menghubungkan pecahan desimal perseratusan dengan konsep persen. Bagian itu belum dikerjakan di subbab ini.";
const SUARA_T3 = "Catatan kecil: panduan guru menulis perintah ubahkan, sedangkan buku siswa menulis ubahlah. Nomor satu dan dua hanya memakai penyebut sepuluh, nomor tiga hanya seratus, jadi murid belum diminta membandingkan keduanya.";
const SUARA_T4 = "Ringkasnya: satu angka di belakang koma berarti persepuluhan, dua angka berarti perseratusan. Tuliskan pembilang di belakang koma, dan tambahkan nol di depannya bila perlu, misalnya tujuh per seratus menjadi nol koma nol tujuh.";

export const ADEGAN_CATATAN_BUKU: AdeganStory = {
  id: "catatan-buku",
  judul: "Catatan temuan buku dan ringkasan Subbab D",
  sumber: "Buku Siswa hlm. 71–75; Panduan Guru hlm. 104–107",
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
      tambah(0, judul("Catatan temuan buku")),
      tambah("kunci", ...kartu("ta", 14, 34, 272, 32, W.hijauMuda, ["9 kunci: semua cocok dengan hitungan"], 9.4)),
      tambah("tiga", ...kartu("tb", 14, 74, 272, 32, W.krem, ["nomor 3 tanpa gambar"], 9.4)),
      tambah("biskuit", ...kartu("tc", 14, 114, 272, 32, W.pink, ["100 biskuit tidak digambar di buku"], 9.4)),
      tambah("dirancang", ...kartu("td", 14, 154, 272, 30, W.emas, ["kisi 100 kotak: rancangan video"], 9.4)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar yang terbawa")),
      tambah("pengalaman", ...kartu("te", 14, 36, 272, 44, W.krem, ["pengalaman belajar di Panduan Guru", "sama dengan subbab berikutnya"], 9)),
      tambah("menghubungkan", ...kartu("tf", 14, 92, 272, 44, W.langit, ["menghubungkan pecahan perseratusan", "dengan konsep persen"], 9)),
      tambah("belum", ...kartu("tg", 40, 148, 220, 30, W.merahMuda, ["bagian itu belum dikerjakan di sini"], 9)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Catatan kecil")),
      tambah("ubahkan,", ...kartu("th", 14, 34, 272, 34, W.krem, ["guru: ubahkan   siswa: ubahlah"], 9.6)),
      tambah("Nomor", ...kartu("ti", 14, 76, 272, 44, W.langit, ["nomor 1 dan 2: penyebut 10", "nomor 3: penyebut 100"], 9.4)),
      tambah("belum", ...kartu("tj", 14, 130, 272, 44, W.emas, ["murid belum diminta", "membandingkan keduanya"], 9.4)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Ringkasan Subbab D")),
      tambah("satu", ...kartu("tk", 14, 34, 272, 32, W.hijauMuda, ["1 angka di belakang koma: persepuluhan"], 9.4)),
      tambah("dua", ...kartu("tl", 14, 74, 272, 32, W.langit, ["2 angka di belakang koma: perseratusan"], 9.4)),
      tambah("Tuliskan", ...kartu("tm", 14, 114, 272, 32, W.krem, ["pembilang di belakang koma, nol di depan"], 9.4)),
      tambah("misalnya", ...kartu("tn", 14, 154, 272, 30, W.emas, ["7/100 = 0,07"], 11)),
    ),
  ],
};
