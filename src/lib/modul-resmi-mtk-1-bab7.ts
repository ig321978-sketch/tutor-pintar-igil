import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB7 =
  "Bab 7: Penjumlahan dan Pengurangan sampai 20";
export const JUDUL_MTK1_BAB7_LAMA =
  "Bab 6: Penjumlahan dan Pengurangan sampai dengan 20";
export const JUDUL_MTK1_BAB7_ALIAS =
  "Bab 7: Penjumlahan dan Pengurangan sampai dengan 20";

export const MODUL_MTK1_BAB7: ModulResmiPai = {
  id: "mtk-1-bab7",
  judul: JUDUL_MTK1_BAB7,
  pola: /penjumlahan\s+dan\s+pengurangan\s+sampai(\s+dengan)?\s+20/,
  motivasi:
    "Jari cuma 10? Simpan angka besar di kepala, lalu hitung maju atau mundur dengan jari!",
  kunciJawaban: "B,B,A,C,B,A,C,B,A,C",
  sketsaKartu: [
    "Ali menyimpan angka 9 di kepala lalu membuka 5 jari untuk menghitung maju sampai 14.",
    "Infografis dua kolom: hitung maju 8+4=12 dan hitung mundur 13-4=9.",
    "Siswa mengetuk meja pada permainan Tepuk Angka, orang tua menghitung mundur mainan.",
    "Anak mengisi soal cerita 11+4 dan 15-4 pada lembar evaluasi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Hasil dari 12 + 5 adalah...
A) 16
B) 17
C) 18
D) 15`,
    `[Soal 2 - PG - Tipe: Reguler]
Hasil dari 15 - 4 adalah...
A) 10
B) 11
C) 12
D) 19`,
    `[Soal 3 - PG - Tipe: Reguler]
8 + 6 sama dengan...
A) 14
B) 13
C) 15
D) 16`,
    `[Soal 4 - PG - Tipe: Reguler]
12 + 7 sama dengan...
A) 18
B) 17
C) 19
D) 20`,
    `[Soal 5 - PG - Tipe: Reguler]
16 - 5 sama dengan...
A) 10
B) 11
C) 12
D) 21`,
    `[Soal 6 - PG - Tipe: Reguler]
13 - 0 sama dengan...
A) 13
B) 0
C) 12
D) 14`,
    `[Soal 7 - PG - Tipe: Reguler]
Budi punya 11 buku, ayah menambah 4 buku. Jumlahnya...
A) 14
B) 7
C) 15
D) 16`,
    `[Soal 8 - PG - Tipe: Reguler]
Siti punya 15 telur, 4 pecah. Sisa telur utuh...
A) 10
B) 11
C) 19
D) 12`,
    `[Soal 9 - PG - Tipe: HOTS]
11 + kotak = 15. Angka di kotak adalah...
A) 4
B) 5
C) 3
D) 26`,
    `[Soal 10 - PG - Tipe: HOTS]
17 - kotak = 12. Angka di kotak adalah...
A) 4
B) 6
C) 5
D) 29`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Trik Simpan di Kepala",
      pengantar:
        "Ali ingin menghitung 9 + 5, tetapi jarinya hanya ada 10. Nia mengajarkan trik Simpan di Kepala: simpan angka besar, lalu hitung maju atau mundur dengan jari.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Hitung maju",
          singkat: "Penjumlahan",
          uraian:
            "Simpan angka 9 di kepala, buka 5 jari, lalu hitung maju setelah 9: sepuluh, sebelas, dua belas, tiga belas, empat belas. Hasilnya 14.",
          contoh: "9 + 5 = 14.",
        },
        {
          nama: "Hitung mundur",
          singkat: "Pengurangan",
          uraian:
            "Untuk pengurangan, hitung mundur. Contoh 12 - 3: simpan 12 di kepala, buka 3 jari, hitung mundur: sebelas, sepuluh, sembilan.",
          contoh: "12 - 3 = 9.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 9 ditambah 5 hasilnya berapa?",
          alias: ["empat belas", "14"],
        },
        {
          pertanyaan: "2. 12 dikurangi 3 hasilnya berapa?",
          alias: ["sembilan", "9"],
        },
        {
          pertanyaan: "3. Penjumlahan memakai hitung maju atau mundur?",
          alias: ["maju", "hitung maju"],
        },
      ],
      voice: [
        [
          "Ali berkata, Nia, aku ingin menghitung 9 tambah 5. Tapi jariku cuma ada 10, tidak cukup!",
          "Nia menjawab, gunakan trik Simpan di Kepala, Ali! Simpan angka 9 di kepalamu, lalu buka 5 jarimu. Hitung maju setelah 9: sepuluh, sebelas, dua belas, tiga belas, empat belas!",
        ],
        [
          "Ali berkata, wah, berhasil! Hasilnya 14! Kalau pengurangan bagaimana?",
          "Nia berkata, sama saja, tapi hitung mundur. Misalnya 12 kurang 3. Simpan 12 di kepala, buka 3 jari, hitung mundur: sebelas, sepuluh, sembilan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Trik Hitung Cepat",
      pengantar:
        "Penjumlahan memakai hitung maju. Pengurangan memakai hitung mundur. Ketuk langkahnya, lalu lihat jari dan hasilnya.",
      labelDaftar: "Dua strategi",
      kolom: 2,
      item: [
        {
          nama: "Strategi penjumlahan",
          singkat: "Hitung maju",
          uraian:
            "Simpan angka yang besar di dalam ingatan, lalu lanjutkan hitungan menggunakan jari. Contoh 9 + 5: simpan 9, buka 5 jari, hitung maju 10, 11, 12, 13, 14. Contoh infografis: 8 + 4 = 12.",
          contoh: "8 + 4: 9, 10, 11, 12.",
        },
        {
          nama: "Strategi pengurangan",
          singkat: "Hitung mundur",
          uraian:
            "Simpan angka total di kepala, lalu hitung mundur dengan jari. Contoh 14 - 3: simpan 14, buka 3 jari, hitung mundur 13, 12, 11. Contoh infografis: 13 - 4 = 9.",
          contoh: "13 - 4: 12, 11, 10, 9.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 8 ditambah 4 hasilnya berapa?",
          alias: ["dua belas", "12"],
        },
        {
          pertanyaan: "2. 13 dikurangi 4 hasilnya berapa?",
          alias: ["sembilan", "9"],
        },
        {
          pertanyaan: "3. Pengurangan memakai hitung maju atau mundur?",
          alias: ["mundur", "hitung mundur"],
        },
      ],
      voice: [
        [
          "Infografis trik hitung cepat. Penjumlahan, hitung maju. Soal 8 tambah 4. Simpan 8 di kepala. Buka 4 jari. Hitung maju dari 8: 9, 10, 11, 12!",
        ],
        [
          "Pengurangan, hitung mundur. Soal 13 kurang 4. Simpan 13 di kepala. Buka 4 jari. Hitung mundur dari 13: 12, 11, 10, 9!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tepuk Angka dan Mainan",
      pengantar:
        "Latihan makin seru kalau bergerak. Di sekolah kita bermain Tepuk Angka. Di rumah kita menghitung mundur sisa mainan.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Tepuk Angka",
          singkat: "Untuk guru",
          uraian:
            "Buat permainan Tepuk Angka. Guru menyebutkan soal, misalnya 11 + 3, lalu siswa berlomba memperagakan hitung maju dengan mengetuk meja dan berteriak hasilnya, 14!",
          contoh: "11 + 3 = 14.",
        },
        {
          nama: "Hitung Mundur Mainan",
          singkat: "Untuk orang tua",
          uraian:
            "Gunakan mainan anak. Taruh 12 mainan, ambil 4, lalu ajak anak menghitung mundur sisa mainan yang ada.",
          contoh: "12 - 4 = 8.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nama permainan mengetuk meja di sekolah apa?",
          alias: ["tepuk angka", "tepuk"],
        },
        {
          pertanyaan: "2. 11 ditambah 3 hasilnya berapa?",
          alias: ["empat belas", "14"],
        },
        {
          pertanyaan: "3. 12 dikurangi 4 hasilnya berapa?",
          alias: ["delapan", "8"],
        },
      ],
      voice: [
        [
          "Di sekolah, bermain Tepuk Angka. Guru menyebut soal, misalnya 11 tambah 3. Siswa mengetuk meja sambil hitung maju, lalu berteriak 14!",
        ],
        [
          "Di rumah, taruh 12 mainan. Ambil 4. Hitung mundur sisa mainan: 11, 10, 9, 8. Sisa 8 mainan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan menjumlah dan mengurangi sampai 20. Pilih jawaban, isi hasil cepat, susun kalimat matematika, lalu temukan angka misterius.",
      labelDaftar: "Empat Jenis Soal",
      kolom: 1,
      item: [
        {
          nama: "Pilihan ganda",
          singkat: "12+5 dan 15-4",
          uraian: "12 + 5 = 17. 15 - 4 = 11.",
          contoh: "12 + 5 = 17.",
        },
        {
          nama: "Matematika berantai",
          singkat: "Isian cepat",
          uraian: "8 + 6 = 14. 12 + 7 = 19. 16 - 5 = 11. 13 - 0 = 13.",
          contoh: "13 - 0 = 13.",
        },
        {
          nama: "Soal cerita dan kotak misterius",
          singkat: "Penalaran",
          uraian:
            "Budi 11 + 4 = 15. Siti 15 - 4 = 11. 11 + kotak = 15, kotaknya 4. 17 - kotak = 12, kotaknya 5.",
          contoh: "11 + 4 = 15. 17 - 5 = 12.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 12 ditambah 5 hasilnya berapa?",
          alias: ["17", "tujuh belas"],
        },
        {
          pertanyaan: "2. 15 dikurangi 4 hasilnya berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "3. 8 ditambah 6 hasilnya berapa?",
          alias: ["14", "empat belas"],
        },
        {
          pertanyaan: "4. 12 ditambah 7 hasilnya berapa?",
          alias: ["19", "sembilan belas"],
        },
        {
          pertanyaan: "5. 16 dikurangi 5 hasilnya berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "6. 13 dikurangi 0 hasilnya berapa?",
          alias: ["13", "tiga belas"],
        },
        {
          pertanyaan: "7. Budi 11 buku ditambah 4, jumlahnya berapa?",
          alias: ["15", "lima belas"],
        },
        {
          pertanyaan: "8. Siti 15 telur dikurangi 4, sisanya berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "9. 11 ditambah kotak sama dengan 15. Kotaknya berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "10. 17 dikurangi kotak sama dengan 12. Kotaknya berapa?",
          alias: ["5", "lima"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi Bab 7. 12 tambah 5 sama dengan 17. 15 kurang 4 sama dengan 11. Isi cepat: 8 tambah 6, 12 tambah 7, 16 kurang 5, 13 kurang 0.",
        ],
        [
          "Budi punya 11 buku, ayah menambah 4, jumlah 15. Siti punya 15 telur, 4 pecah, sisa 11. 11 tambah kotak sama dengan 15, kotaknya 4. 17 kurang kotak sama dengan 12, kotaknya 5. Semangat!",
        ],
      ],
    },
  ],
};
