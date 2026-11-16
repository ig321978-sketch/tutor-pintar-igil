import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, busurSemua, daftar, deret, isiKotak, judul, kaleng, kartu, kisiPengayaan1, kisiPengayaan2, suku, tabel, teks } from "./k4b3b-gambar";
import { bersih, k, tambah } from "./k4b3b-bantu";

/** Sel tabel (baris r, kolom c): kotak dan tulisannya. */
const sel = (objs: Obj[], id: string, r: number, c: number): Obj[] => objs.filter((o) => o.id === `${id}-s${r}${c}` || o.id === `${id}-t${r}${c}`);

/* ------------------------------ 12. Uji Kompetensi 9-10: soal cerita (Buku Siswa hlm. 102; Panduan Guru hlm. 135) ------------------------------ */
const KL = { bw: 30, gap: 6, u: 10.4 };
const D_KEL = deret("kl", 27, 84, ["36", "31", "26", "21", "16", "11", "6"], KL);
const B_KEL = busurSemua("kl", 27, 84, ["−5", "−5", "−5", "−5", "−5", "−5"], { ...KL, tinggi: 10 });
const BS = { bw: 24, gap: 3, u: 10 };
const D_BIO = deret("bi", 16.5, 84, ["10", "14", "18", "22", "26", "30", "34", "38", "42", "46"], BS);
const B_BIO = busurSemua("bi", 16.5, 84, Array(9).fill("+4"), { ...BS, tinggi: 9 });
export const ADEGAN_UK_CERITA: AdeganStory = {
  id: "uk-cerita",
  judul: "Uji 9 dan 10: soal cerita",
  sumber: "Materi: uji soal cerita",
  latar: "#F0FDF4",
  kutipan: [
    "Seorang petani sedang mencatat penjualan buah kelapa",
    "Hari Pertama",
    "36 buah",
    "Tentukan banyak kelapa yang dipanen pada hari ke 7 !",
    "Banyak kelapa yang dipanen pada hari ke 7 adalah 6 buah",
    "Di suatu gedung bioskop terdapat 10 baris kursi.",
    "Banyak kursi yang tersedia pada baris terakhir adalah 46",
    "Baris Kesepuluh",
    "42 + 4",
  ],
  ketukan: [
    k(
      "Uji sembilan: petani mencatat kelapa selama tujuh hari berturut-turut, dan jumlahnya menurun. Hari pertama tiga puluh enam, kedua tiga puluh satu, ketiga dua puluh enam, keempat dua puluh satu.",
      bersih(0),
      tambah(0, judul("Uji 9: kelapa menurun", W.merah)),
      tambah("pertama", ...suku(D_KEL, 0)),
      tambah("kedua", ...suku(D_KEL, 1)),
      tambah("ketiga", ...suku(D_KEL, 2)),
      tambah("keempat", ...suku(D_KEL, 3)),
      tambah("kedua", ...B_KEL[0]),
      tambah("ketiga", ...B_KEL[1]),
      tambah("keempat", ...B_KEL[2]),
      tambah("keempat", teks("klh", 150, 132, "hari 1 sampai hari 4", 9, W.coklat)),
    ),
    k(
      "Selisihnya kurang lima setiap hari. Hari kelima enam belas, hari keenam sebelas, hari ketujuh enam. Jadi kelapa pada hari ketujuh adalah enam buah.",
      tambah("Selisihnya", teks("klb", 150, 146, "beda tetap: −5", 9.6, W.merah)),
      tambah("kelima", ...suku(D_KEL, 4), ...B_KEL[3]),
      tambah("keenam", ...suku(D_KEL, 5), ...B_KEL[4]),
      tambah("ketujuh", ...suku(D_KEL, 6), ...B_KEL[5]),
      isiKotak("Jadi", "kl", 6, "6"),
      tambah("Jadi", ...kartu("klk", 40, 160, 220, 28, W.hijauMuda, ["hari ke-7: 6 buah"], 10)),
    ),
    k(
      "Cara cepat: dari hari pertama ke hari ketujuh ada enam loncatan kurang lima. Tiga puluh enam kurang tiga puluh adalah enam.",
      bersih(0),
      tambah(0, judul("Cara cepat: enam loncatan")),
      tambah("hari", ...kartu("kc1", 20, 40, 260, 30, W.krem, ["hari 1 → hari 7: 6 loncatan"], 9.6)),
      tambah("kurang", ...kartu("kc2", 20, 82, 260, 30, W.merahMuda, ["6 × 5 = 30"], 11)),
      tambah("Tiga", ...kartu("kc3", 20, 124, 260, 30, W.hijauMuda, ["36 − 30 = 6"], 11)),
    ),
    k(
      "Uji sepuluh: gedung bioskop punya sepuluh baris kursi. Baris pertama sepuluh kursi, baris kedua empat belas, baris ketiga delapan belas. Selisihnya empat.",
      bersih(0),
      tambah(0, judul("Uji 10: kursi bioskop")),
      tambah("pertama", ...suku(D_BIO, 0)),
      tambah("kedua", ...suku(D_BIO, 1)),
      tambah("ketiga", ...suku(D_BIO, 2)),
      tambah("Selisihnya", ...B_BIO[0], ...B_BIO[1]),
      tambah("empat@2", teks("bih", 150, 132, "baris 1 sampai baris 10", 9, W.coklat)),
    ),
    k(
      "Baris terakhir adalah baris kesepuluh. Terus tambah empat: dua puluh dua, dua puluh enam, tiga puluh, tiga puluh empat, tiga puluh delapan, empat puluh dua, empat puluh enam. Baris terakhir punya empat puluh enam kursi.",
      tambah("Terus", ...[3, 4, 5, 6, 7, 8, 9].flatMap((i) => suku(D_BIO, i)), ...B_BIO.slice(2).flat()),
      isiKotak("terakhir@2", "bi", 9, "46"),
      tambah("kursi.", ...kartu("bik", 40, 150, 220, 28, W.hijauMuda, ["baris 10: 46 kursi"], 10)),
    ),
    k(
      "Cara cepat: sepuluh ditambah sembilan loncatan empat. Sembilan kali empat tiga puluh enam, ditambah sepuluh sama dengan empat puluh enam.",
      bersih(0),
      tambah(0, judul("Cara cepat: sembilan loncatan")),
      tambah("sepuluh", ...kartu("bc1", 20, 40, 260, 30, W.krem, ["baris 1 → baris 10: 9 loncatan"], 9.6)),
      tambah("Sembilan@2", ...kartu("bc2", 20, 82, 260, 30, W.langit, ["9 × 4 = 36"], 11)),
      tambah("ditambah@2", ...kartu("bc3", 20, 124, 260, 30, W.hijauMuda, ["10 + 36 = 46"], 11)),
    ),
  ],
};

/* ------------------------------ 13. Rubrik penilaian (Panduan Guru hlm. 134-138) ------------------------------ */
const TAB_RUBRIK = tabel(
  "rb",
  15,
  40,
  [60, 100, 110],
  [
    ["Butir", "Isi", "Bobot"],
    ["1–4", "pola gambar", "4 × 10 = 40"],
    ["5–10", "pola bilangan", "6 × 10 = 60"],
    ["Jumlah", "", "40 + 60 = 100"],
  ],
  22,
  9.6,
);
const KUNCI_UK = [
  ["1", "9"],
  ["2", "8"],
  ["3", "4"],
  ["4", "9"],
  ["5", "21"],
  ["6", "18, 30"],
  ["7", "6"],
  ["8", "28, 10"],
  ["9", "6"],
  ["10", "46"],
];
const TAB_KUNCI_1 = tabel("q1", 20, 36, [50, 70], [["Soal", "Kunci"], ...KUNCI_UK.slice(0, 5)], 17, 9);
const TAB_KUNCI_2 = tabel("q2", 160, 36, [50, 70], [["Soal", "Kunci"], ...KUNCI_UK.slice(5)], 17, 9);
export const ADEGAN_RUBRIK: AdeganStory = {
  id: "rubrik",
  judul: "Rubrik penilaian dan kunci",
  sumber: "Panduan Guru hlm. 134–138",
  latar: "#FDF4FF",
  kutipan: [
    "Kunci Jawaban",
    "Tabel 3.2 Pedoman Penilaian Hasil Belajar",
    "Lengkapilah benda dibawah sesuai dengan pola gambar yang diberikan!",
    "Peserta didik tidak menjawab sama sekali",
    "Peserta didik bisa menemukan pola tetapi jawaban kurang tepat",
    "Peserta didik dapat menemukan pola dan jawaban tepat",
    "Tabel 3.3 Penilaian Aktivitas Tugas Proyek",
    "Ketepatan dalam menentukan pola gambar dan bilangan",
    "Keterampilan dalam membuat gambar sesuai pola",
    "Banyak benda selanjutnya sesuai pola gambar adalah 4",
    "Banyak kursi yang tersedia pada baris terakhir adalah 46",
  ],
  ketukan: [
    k(
      "Rubrik penilaian kognitif, Tabel tiga titik dua: sepuluh butir pertanyaan, bobot tiap butir sepuluh. Butir satu sampai empat pola gambar, butir lima sampai sepuluh pola bilangan. Jumlah bobotnya seratus.",
      bersih(0),
      tambah(0, judul("Rubrik kognitif: Tabel 3.2")),
      tambah("Rubrik", ...barisTabel(TAB_RUBRIK, "rb", 0)),
      tambah("butir@3", ...barisTabel(TAB_RUBRIK, "rb", 1)),
      tambah("butir@4", ...barisTabel(TAB_RUBRIK, "rb", 2)),
      tambah("Jumlah", ...barisTabel(TAB_RUBRIK, "rb", 3)),
    ),
    k(
      "Skor tiap butir: nol bila tidak menjawab sama sekali, lima bila murid menemukan pola tetapi jawabannya kurang tepat, sepuluh bila pola dan jawaban tepat.",
      ...daftar("sk", "Kriteria skor tiap butir", [
        { at: "nol", t: "0: tidak menjawab sama sekali", w: W.merahMuda, u: 9.4 },
        { at: "lima", t: "5: pola ketemu, jawaban kurang tepat", w: W.krem, u: 9 },
        { at: "sepuluh", t: "10: pola dan jawaban tepat", w: W.hijauMuda, u: 9.4 },
      ]),
    ),
    k(
      "Penilaian keterampilan, Tabel tiga titik tiga, menilai tugas proyek dengan dua aspek: ketepatan menentukan pola gambar dan bilangan, serta keterampilan membuat gambar sesuai pola.",
      ...daftar("kt", "Keterampilan: Tabel 3.3", [
        { at: "ketepatan", t: "aspek 1: tepat menentukan pola", w: W.langit, u: 9.4 },
        { at: "keterampilan@2", t: "aspek 2: terampil membuat gambar pola", w: W.pink, u: 9 },
      ]),
    ),
    k(
      "Kunci Uji Kompetensi cocok dengan hitungan mandiri: sembilan, delapan, empat, sembilan; dua puluh satu; delapan belas dan tiga puluh; enam; dua puluh delapan dan sepuluh; enam; empat puluh enam.",
      bersih(0),
      tambah(0, judul("Kunci Uji Kompetensi")),
      tambah(0, ...barisTabel(TAB_KUNCI_1, "q1", 0), ...barisTabel(TAB_KUNCI_2, "q2", 0)),
      tambah("sembilan,", ...barisTabel(TAB_KUNCI_1, "q1", 1)),
      tambah("delapan,", ...barisTabel(TAB_KUNCI_1, "q1", 2)),
      tambah("empat,", ...barisTabel(TAB_KUNCI_1, "q1", 3)),
      tambah("sembilan@2", ...barisTabel(TAB_KUNCI_1, "q1", 4)),
      tambah("dua", ...barisTabel(TAB_KUNCI_1, "q1", 5)),
      tambah("delapan@2", ...barisTabel(TAB_KUNCI_2, "q2", 1)),
      tambah("enam", ...barisTabel(TAB_KUNCI_2, "q2", 2)),
      tambah("dua@2", ...barisTabel(TAB_KUNCI_2, "q2", 3)),
      tambah("enam@2", ...barisTabel(TAB_KUNCI_2, "q2", 4)),
      tambah("empat@2", ...barisTabel(TAB_KUNCI_2, "q2", 5)),
    ),
  ],
};

/* ------------------------------ 14. Pengayaan 1-2: persegi satuan (Panduan Guru hlm. 140-142) ------------------------------ */
const TAB_P1 = tabel(
  "pa",
  12,
  100,
  [60, 54, 54, 54, 54],
  [
    ["Pola", "1", "2", "3", "4"],
    ["biru", "1", "2", "3", "4"],
    ["putih", "8", "10", "12", "14"],
  ],
  17,
  9,
);
const TAB_P2 = tabel(
  "pb",
  12,
  100,
  [60, 54, 54, 54, 54],
  [
    ["Pola", "1", "2", "3", "4"],
    ["biru", "1", "4", "9", "16"],
    ["putih", "8", "12", "16", "20"],
  ],
  17,
  9,
);
const G1 = [1, 2, 3, 4].map((n, i) => kisiPengayaan1(`g1${i}`, [28, 84, 140, 196][i], 34, 9, n));
const G2 = [1, 2, 3, 4].map((n, i) => kisiPengayaan2(`g2${i}`, [16, 66, 126, 196][i], 32, 7, n));
export const ADEGAN_PENGAYAAN_1: AdeganStory = {
  id: "pengayaan-1",
  judul: "Tantangan 1 dan 2: persegi satuan",
  sumber: "Materi: tantangan persegi satuan",
  latar: "#EFF6FF",
  kutipan: [
    "Soal-soal Pengayaan",
    "Tentukan banyak persegi satu satuan berwarna putih ketika banyak persegi",
    "satu satuan berwarna gelap 4!",
    "satu satuan berwarna gelap 16!",
    "persegi satu satuan biru",
    "persegi satu satuan putih",
    "Pola 1",
    "Pola 4",
  ],
  ketukan: [
    k(
      "Tantangan satu dan dua memakai persegi satuan. Pada tantangan satu, pola pertama punya satu persegi biru dan delapan putih. Tiap pola, biru bertambah satu dan putih bertambah dua: delapan, sepuluh, dua belas, empat belas. Jadi saat biru empat, putih empat belas.",
      bersih(0),
      tambah(0, judul("Tantangan 1: biru dan putih")),
      tambah("pertama", ...G1[0]),
      tambah("Tiap", ...G1[1], ...G1[2], ...G1[3], ...barisTabel(TAB_P1, "pa", 0), ...barisTabel(TAB_P1, "pa", 1)),
      tambah("putih@2", ...sel(TAB_P1, "pa", 2, 0)),
      tambah("delapan@2", ...sel(TAB_P1, "pa", 2, 1)),
      tambah("sepuluh,", ...sel(TAB_P1, "pa", 2, 2)),
      tambah("belas", ...sel(TAB_P1, "pa", 2, 3)),
      tambah("belas@2", ...sel(TAB_P1, "pa", 2, 4)),
      tambah("Jadi", ...kartu("pak", 40, 158, 220, 28, W.hijauMuda, ["biru 4 → putih 14"], 10)),
    ),
    k(
      "Tantangan dua: persegi biru satu, empat, sembilan, enam belas, dalam kisi yang makin besar. Putihnya delapan, dua belas, enam belas, dua puluh, bertambah empat. Jadi saat biru enam belas, putih dua puluh.",
      bersih(0),
      tambah(0, judul("Tantangan 2: kisi makin besar")),
      tambah(0, ...barisTabel(TAB_P2, "pb", 0), ...sel(TAB_P2, "pb", 1, 0), ...sel(TAB_P2, "pb", 2, 0)),
      tambah("satu,", ...G2[0], ...sel(TAB_P2, "pb", 1, 1)),
      tambah("empat,", ...G2[1], ...sel(TAB_P2, "pb", 1, 2)),
      tambah("sembilan,", ...G2[2], ...sel(TAB_P2, "pb", 1, 3)),
      tambah("belas,", ...G2[3], ...sel(TAB_P2, "pb", 1, 4)),
      tambah("delapan,", ...sel(TAB_P2, "pb", 2, 1)),
      tambah("belas@2", ...sel(TAB_P2, "pb", 2, 2)),
      tambah("belas@3", ...sel(TAB_P2, "pb", 2, 3)),
      tambah("puluh", ...sel(TAB_P2, "pb", 2, 4)),
      tambah("bertambah", ...kartu("pbk", 40, 158, 220, 28, W.krem, ["putih bertambah 4 tiap pola"], 9.6)),
    ),
    k(
      "Cek sendiri: pola empat tantangan satu berukuran tiga kali enam, delapan belas kotak, biru empat, jadi putih empat belas. Pola empat tantangan dua berukuran enam kali enam, tiga puluh enam kotak, biru enam belas, jadi putih dua puluh.",
      bersih(0),
      tambah(0, judul("Cek: kotak seluruhnya")),
      tambah("Cek", ...kartu("pc1", 12, 38, 276, 54, W.hijauMuda, ["tantangan 1, pola 4: 3 × 6 = 18 kotak", "18 − 4 = 14 putih"], 10.4)),
      tambah("Pola@2", ...kartu("pc2", 12, 104, 276, 54, W.langit, ["tantangan 2, pola 4: 6 × 6 = 36 kotak", "36 − 16 = 20 putih"], 10.4)),
    ),
  ],
};

/* ------------------------------ 15. Pengayaan 3-5: beda berubah (Panduan Guru hlm. 140-143) ------------------------------ */
const P3 = { bw: 36, gap: 24 };
const D_P3 = deret("p3", 42, 144, ["10", "9", "7", "4"], P3);
const B_P3 = busurSemua("p3", 42, 144, ["−1", "−2", "−3"], { ...P3, tinggi: 10 });
const KAL = [kaleng("p3a", 60, 108, [1, 2, 3, 4], 9), kaleng("p3b", 120, 108, [2, 3, 4], 9), kaleng("p3c", 180, 108, [3, 4], 9), kaleng("p3d", 240, 108, [4], 9)];
const P4 = { bw: 36, gap: 18 };
const D_P4 = deret("p4", 24, 84, ["10", "11", "13", "16", "20"], P4);
const B_P4 = busurSemua("p4", 24, 84, ["+1", "+2", "+3", "+4"], P4);
const D_P5 = deret("p5", 24, 84, ["50", "49", "47", "44", "40"], P4);
const B_P5 = busurSemua("p5", 24, 84, ["−1", "−2", "−3", "−4"], P4);
export const ADEGAN_PENGAYAAN_2: AdeganStory = {
  id: "pengayaan-2",
  judul: "Tantangan 3 sampai 5: beda berubah",
  sumber: "Materi: tantangan beda berubah",
  latar: "#FFFBEB",
  kutipan: [
    "Tentukan banyak benda selanjutnya sesuai pola gambar yang diberikan!",
    "Tentukan bilangan yang tepat sesuai pola bilangan yang diberikan!",
    "+1 +2 +3 +4",
    "-1 -2 -3 -4",
    "Kunci Jawaban",
    "Untuk pengembangan materi ini dapat diberikan pola gambar",
    "dan pola bilangan dengan selisih angka yang berbeda",
  ],
  ketukan: [
    k(
      "Tantangan tiga: tumpukan kaleng sepuluh, sembilan, tujuh. Berkurang satu, lalu dua, jadi berikutnya berkurang tiga, yaitu empat kaleng.",
      bersih(0),
      tambah(0, judul("Tantangan 3: kaleng", W.merah)),
      tambah("sepuluh,", ...KAL[0], ...suku(D_P3, 0)),
      tambah("sembilan,", ...KAL[1], ...suku(D_P3, 1)),
      tambah("tujuh.", ...KAL[2], ...suku(D_P3, 2)),
      tambah("satu,", ...B_P3[0]),
      tambah("dua,", ...B_P3[1]),
      tambah("tiga@2", ...B_P3[2]),
      tambah("empat", ...KAL[3], ...suku(D_P3, 3)),
    ),
    k(
      "Tantangan empat: sepuluh, sebelas, tiga belas, enam belas. Bedanya tidak tetap: tambah satu, tambah dua, tambah tiga. Beda berikutnya tambah empat, jadi bilangan berikutnya dua puluh.",
      bersih(0),
      tambah(0, judul("Tantangan 4: beda bertambah")),
      tambah("sepuluh,", ...suku(D_P4, 0)),
      tambah("sebelas,", ...suku(D_P4, 1)),
      tambah("belas@2", ...suku(D_P4, 2)),
      tambah("belas@3", ...suku(D_P4, 3)),
      tambah("satu,", ...B_P4[0]),
      tambah("dua,", ...B_P4[1]),
      tambah("tiga@2", ...B_P4[2]),
      tambah("empat@2", ...B_P4[3]),
      tambah("dua@2", ...suku(D_P4, 4)),
      tambah("tidak", teks("p4t", 150, 132, "beda berubah: +1, +2, +3, +4", 9.6, W.coklat)),
    ),
    k(
      "Tantangan lima: lima puluh, empat puluh sembilan, empat puluh tujuh, empat puluh empat. Dikurangi satu, dua, tiga, jadi berikutnya dikurangi empat, yaitu empat puluh.",
      bersih(0),
      tambah(0, judul("Tantangan 5: beda bertambah", W.merah)),
      tambah("puluh,", ...suku(D_P5, 0)),
      tambah("sembilan,", ...suku(D_P5, 1)),
      tambah("tujuh,", ...suku(D_P5, 2)),
      tambah("empat@4", ...suku(D_P5, 3)),
      tambah("satu,", ...B_P5[0]),
      tambah("dua,", ...B_P5[1]),
      tambah("tiga,", ...B_P5[2]),
      tambah("dikurangi@2", ...B_P5[3]),
      tambah("yaitu", ...suku(D_P5, 4)),
      tambah("yaitu", teks("p5t", 150, 132, "beda berubah: −1, −2, −3, −4", 9.6, W.coklat)),
    ),
    k(
      "Pada tantangan tiga sampai lima, bedanya sendiri berpola, naik atau turun satu setiap langkah. Beda tetap adalah dasarnya, beda yang berubah adalah tantangan.",
      ...daftar("pt", "Dua macam beda", [
        { at: "bedanya", t: "tantangan 3 sampai 5: beda berpola", w: W.pink, u: 9.2 },
        { at: "tetap", t: "beda tetap: dasar", w: W.hijauMuda, u: 10 },
        { at: "berubah", t: "beda berubah: tantangan", w: W.langit, u: 10 },
      ]),
    ),
  ],
};

/* ------------------------------ 16. Penutup bab: remedial, pengayaan, refleksi, orang tua, ringkasan (Buku Siswa hlm. 102; Panduan Guru hlm. 138-144) ------------------------------ */
export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup-b",
  judul: "Remedial, refleksi, dan penutup bab",
  sumber: "Buku Siswa hlm. 102; Panduan Guru hlm. 138–144",
  latar: "#FDF4FF",
  kutipan: [
    "Remedial dibutuhkan untuk dilaksanakan jika peserta didik belum mencapai",
    "Pemberian bimbingan secara individu",
    "Pemberian bimbingan secara berkelompok",
    "Pemberian pembelajaran berulang dengan metode dan media yang",
    "Tutor sebaya",
    "Kegiatan pengayaan dapat dikembangkan pada materi pola gambar dan",
    "dengan selisih angka yang berbeda",
    "Belajar kelompok",
    "Belajar mandiri",
    "Pada bab ini, kalian sudah mempelajari materi pola gambar dan pola bilangan.",
    "diskusikanlah dengan temanmu",
    "Kalian juga dapat meminta guru untuk membantu.",
    "Kalian juga dapat menentukan bilangan yang mengikuti pola tertentu.",
    "Ajarkanlah materi ini kepada orang lain",
    "Guru dapat menambahkan pertanyaan refleksi sesuai kebutuhan.",
    "Keberhasilan peserta didik dalam proses pembelajaran tidak hanya menjadi",
    "buku komunikasi",
    "Guru setiap semester dapat mengadakan rapat dengan orang tua peserta",
    "Guru dapat membuat grup komunitas untuk setiap kelas dengan para",
    "Guru menyediakan setiap minggu untuk konseling orang tua peserta didik.",
    "Guru dapat juga mengunjungi orang tua khusus untuk peserta didik yang",
    "Guru mengadakan seminar atau layanan konsultasi tiap bulan",
    "Sumber Bacaan",
    "Buku Siswa",
  ],
  ketukan: [
    k(
      "Panduan remedial untuk murid yang belum mencapai tujuan: bimbingan individu, bimbingan kelompok, pembelajaran berulang dengan metode dan media berbeda, dan tutor sebaya.",
      ...daftar("rm", "Panduan remedial", [
        { at: "individu,", t: "1. bimbingan individu", w: W.hijauMuda, u: 10 },
        { at: "kelompok,", t: "2. bimbingan kelompok", w: W.langit, u: 10 },
        { at: "berulang", t: "3. diulang dengan metode dan media beda", w: W.krem, u: 8.8 },
        { at: "tutor", t: "4. tutor sebaya", w: W.pink, u: 10 },
      ]),
    ),
    k(
      "Pedoman pengayaan: beri pola gambar dan pola bilangan dengan selisih berbeda. Bisa lewat belajar kelompok memecahkan masalah dunia nyata, atau belajar mandiri dengan tugas proyek lalu menjadi tutor bagi teman.",
      ...daftar("pe", "Pedoman pengayaan", [
        { at: "selisih", t: "pola dengan selisih angka yang berbeda", w: W.krem, u: 9 },
        { at: "kelompok", t: "belajar kelompok: masalah dunia nyata", w: W.hijauMuda, u: 9 },
        { at: "mandiri", t: "belajar mandiri: tugas proyek, jadi tutor", w: W.langit, u: 8.8 },
      ]),
    ),
    k(
      "Refleksi murid: apakah masih ingat, adakah bagian yang sulit? Diskusikan dengan teman atau minta guru membantu. Kini murid bisa menentukan banyak benda sesuai pola dan bilangan yang mengikuti pola. Ajarkan kepada orang lain agar semakin paham.",
      ...daftar("rf", "Refleksi murid", [
        { at: "masih", t: "masih ingat? ada yang sulit?", w: W.krem, u: 9.4 },
        { at: "Diskusikan", t: "diskusi dengan teman atau minta guru", w: W.hijauMuda, u: 9 },
        { at: "benda", t: "bisa menentukan benda dan bilangan berpola", w: W.langit, u: 8.8 },
        { at: "Ajarkan", t: "ajarkan kepada orang lain", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Refleksi guru ada sembilan pertanyaan, dari apa yang berjalan baik sampai pertanyaan tambahan. Interaksi dengan orang tua ada enam cara: buku komunikasi, rapat tiap semester, grup kelas, konseling mingguan, kunjungan bagi murid yang sulit, dan seminar bulanan.",
      ...daftar(
        "ot",
        "Refleksi guru dan orang tua",
        [
          { at: "sembilan", t: "refleksi guru: 9 pertanyaan", w: W.pink, u: 9 },
          { at: "komunikasi,", t: "1. buku komunikasi", w: W.krem, u: 8.6 },
          { at: "rapat", t: "2. rapat tiap semester", w: W.krem, u: 8.6 },
          { at: "grup", t: "3. grup kelas orang tua", w: W.krem, u: 8.6 },
          { at: "konseling", t: "4. konseling mingguan", w: W.krem, u: 8.6 },
          { at: "kunjungan", t: "5. kunjungan bagi murid yang sulit", w: W.krem, u: 8.6 },
          { at: "seminar", t: "6. seminar atau konsultasi bulanan", w: W.krem, u: 8.6 },
        ],
        { tinggi: 19, jarak: 4, y: 32 },
      ),
    ),
    k(
      "Ringkasan: pola bilangan membesar bila ditambah dan mengecil bila dikurangi. Carilah bedanya, lalu lanjutkan polanya. Sumber bacaan murid: Buku Siswa dan sumber belajar Kemendikbud, guru juga memakai Buku Panduan Guru.",
      ...daftar("sm", "Ringkasan Sub-Bab B", [
        { at: "membesar", t: "membesar: tambah, mengecil: kurang", w: W.hijauMuda, u: 9 },
        { at: "bedanya,", t: "cari beda, lalu lanjutkan pola", w: W.krem, u: 9.6 },
        { at: "Sumber", t: "sumber: Buku Siswa, Panduan Guru, Kemendikbud", w: W.langit, u: 8.2 },
      ]),
    ),
  ],
};
