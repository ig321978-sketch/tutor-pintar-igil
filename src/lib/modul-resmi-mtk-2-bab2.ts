import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB2 = "Bab 2: Penjumlahan dan Pengurangan";
export const JUDUL_MTK2_BAB2_LAMA = "Bab 2: Penjumlahan dan Pengurangan Bersusun";

export const MODUL_MTK2_BAB2: ModulResmiPai = {
  id: "mtk-2-bab2",
  judul: JUDUL_MTK2_BAB2,
  pola:
    /bab\s*2[:.]\s*penjumlahan dan pengurangan(?!\s+bilangan)|penjumlahan dan pengurangan bersusun|panen jambu( air)?|berbagai cara melakukan (penjumlahan|pengurangan)|pesta permen sani|hitung bersusun trik kantong/,
  motivasi:
    "Hore! Kamu sudah bantu Tika dan Kira memanen jambu air. Hitung maju, susun puluhan-satuan, atau pakai pasangan sepuluh. Kurangi dengan mundur. Baca kata lebihnya, kurangnya, selisih, dan jumlah.",
  kunciJawaban: "B,A,C,B,A,C,B,A,C,B",
  sketsaKartu: [
    "Tika memetik 12 jambu air. Kira memetik 6 lebih banyak. Igil ikut menghitung di halaman rumah Tika.",
    "Tiga cara penjumlahan: maju, bersusun, dan pasangan bilangan. Lalu 18 + 2 menjadi 20.",
    "Sepuluh jambu di keranjang panen: tambah, kurang, dan soal cerita.",
    "Lembar kerja tantangan juara panen jambu air.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Tika memetik 12 jambu air. Kira memetik 6 lebih banyak. Berapa jambu air Kira?
A) 6
B) 18
C) 12`,
    `[Soal 2 - PG - Tipe: LOTS]
12 + 6 dengan menghitung maju. Hasilnya...
A) 18
B) 16
C) 6`,
    `[Soal 3 - PG - Tipe: MOTS]
Penjumlahan bersusun 12 + 6. Satuan 2 + 6 sama dengan...
A) 2
B) 6
C) 8`,
    `[Soal 4 - PG - Tipe: MOTS]
Kira punya 18 jambu. Dia memetik lagi 2. 8 satuan + 2 satuan = 10 satuan = 1 puluhan. Hasil 18 + 2 adalah...
A) 18
B) 20
C) 10`,
    `[Soal 5 - PG - Tipe: LOTS]
Kira punya 18 jambu. Tika punya 12 jambu. Selisihnya...
A) 6
B) 30
C) 18`,
    `[Soal 6 - PG - Tipe: MOTS]
Tika punya 12 jambu. Dia memberi 8 kepada Lili. 2 satuan kurang dari 8, jadi puluhan diurai. Sisa jambu Tika...
A) 8
B) 20
C) 4`,
    `[Soal 7 - PG - Tipe: HOTS]
Tika punya 12 donat. Malosi punya 5 kurangnya dari donat Tika. Donat Malosi...
A) 17
B) 7
C) 5`,
    `[Soal 8 - PG - Tipe: HOTS]
Halim memberi 4 jeruk kepada Lili. Sisa jeruk Halim 12. Jeruk Halim sebelumnya...
A) 16
B) 8
C) 12`,
    `[Soal 9 - PG - Tipe: HOTS]
Tika 5 boneka, Kira 7 boneka, Lili 8 boneka. Jumlah semua boneka...
A) 12
B) 15
C) 20`,
    `[Soal 10 - PG - Tipe: HOTS]
Upe punya 11 kelereng. Kelereng Upe 3 lebihnya dari kelereng Halim. Kelereng Halim...
A) 14
B) 8
C) 11`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Panen Jambu Air",
      pengantar:
        "Di halaman rumah Tika ada pohon jambu air. Tika memetik 12. Kira memetik 6 lebih banyak. Igil ikut menghitung.",
      labelDaftar: "Cerita panen dan tiga cara penjumlahan",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Tambah dan kurang sampai 20",
          uraian:
            "Siswa dapat menjumlahkan dengan menghitung maju, bersusun, dan pasangan bilangan. Siswa dapat mengurangkan dengan menghitung mundur, bersusun, dan pasangan bilangan. Siswa dapat menyelesaikan soal cerita dengan kata lebihnya, kurangnya, selisih, dan jumlah.",
          contoh: "12 + 6 = 18. 18 - 12 = 6.",
        },
        {
          nama: "Cerita panen",
          singkat: "12 dan 6 lebihnya",
          uraian:
            "Tika memetik 12 jambu air. Kira memetik 6 lebih banyak dari Tika. 12 + 6 = 18. Jambu Kira 18 buah. Jumlah Tika dan Kira 12 + 18 = 30. Selisihnya 18 - 12 = 6.",
          contoh: "6 lebihnya artinya ditambah 6.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Tika 12 jambu, Kira 6 lebih banyak. Berapa jambu Kira?",
          alias: ["18", "delapan belas"],
        },
        {
          pertanyaan: "Tuliskan 12 + 6.",
          alias: ["18", "12 + 6 = 18", "12+6=18"],
        },
        {
          pertanyaan: "1 puluhan sama dengan berapa satuan?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "Tuliskan 18 + 2.",
          alias: ["20", "18 + 2 = 20", "18+2=20"],
        },
        {
          pertanyaan: "Hitung maju dari 12: 13, 14, 15, lalu berapa?",
          alias: ["16", "enam belas"],
        },
        {
          pertanyaan: "10 + 6 sama dengan berapa?",
          alias: ["16", "enam belas"],
        },
        {
          pertanyaan: "Tika 5, Kira 7, Lili 8 boneka. Jumlahnya?",
          alias: ["20", "dua puluh"],
        },
        {
          pertanyaan: "6 pesawat dan 13 mobil. Jumlah mainan?",
          alias: ["19", "sembilan belas"],
        },
      ],
      voice: [
        [
          "Di halaman rumah Tika ada pohon jambu air. Tika memetik 12 buah. Kira memetik 6 lebih banyak. Igil si burung hantu ikut menghitung.",
          "Enam lebihnya artinya ditambah enam. Dua belas tambah enam sama dengan delapan belas. Jambu Kira ada delapan belas.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pengurangan dan Soal Cerita",
      pengantar:
        "Kurangi dengan mundur, bersusun, atau pasangan sepuluh. Baca kata lebihnya, kurangnya, selisih, dan jumlah.",
      labelDaftar: "Tiga cara pengurangan dan soal cerita",
      kolom: 1,
      item: [
        {
          nama: "Pengurangan",
          singkat: "18 - 12 = 6",
          uraian:
            "Kira 18 jambu. Tika 12 jambu. Selisih 18 - 12 = 6. Mundur dari 18 sebanyak 12 langkah sampai 6. Bersusun: satuan dulu, lalu puluhan. Pasangan: 18 adalah 10 dan 8, 12 adalah 10 dan 2.",
          contoh: "18 - 12 = 6.",
        },
        {
          nama: "Soal cerita",
          singkat: "Lebihnya, kurangnya, selisih, jumlah",
          uraian:
            "Tika 12 donat. Malosi 5 kurangnya. Donat Malosi 7. Jumlah 19. Halim sisa 12 setelah memberi 4. Semula 16. Tika 5, Kira 7, Lili 8 boneka. Jumlah 20.",
          contoh: "Kurangnya artinya dikurangi. Jumlah artinya dijumlahkan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Selisih 18 dan 12 berapa?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Tuliskan 18 - 12.",
          alias: ["6", "18 - 12 = 6", "18-12=6"],
        },
        {
          pertanyaan: "Tika 12 jambu, beri 8 ke Lili. Sisanya berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "Tuliskan 12 - 8.",
          alias: ["4", "12 - 8 = 4", "12-8=4"],
        },
        {
          pertanyaan: "Malosi 5 kurangnya dari 12 donat Tika. Berapa donat Malosi?",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan: "Tuliskan 12 - 5.",
          alias: ["7", "12 - 5 = 7", "12-5=7"],
        },
        {
          pertanyaan: "Halim sisa 12 jeruk setelah beri 4. Semula berapa?",
          alias: ["16", "enam belas"],
        },
        {
          pertanyaan: "Tika 5, Kira 7, Lili 8 boneka. Jumlahnya?",
          alias: ["20", "dua puluh"],
        },
      ],
      voice: [
        [
          "Kira punya 18 jambu. Tika punya 12 jambu. Kurangi dengan mundur, bersusun, atau pasangan sepuluh. Delapan belas kurang dua belas sama dengan enam.",
          "Tika memberi 8 jambu kepada Lili. Dua satuan kurang dari delapan. Urai satu puluhan. Sisa empat.",
        ],
        [
          "Kata lebihnya artinya ditambah. Kata kurangnya artinya dikurangi. Selisih artinya dikurangi. Jumlah artinya dijumlahkan.",
          "Donat Malosi lima kurangnya dari dua belas, jadi tujuh. Jeruk Halim semula enam belas. Boneka Tika, Kira, dan Lili jumlahnya dua puluh.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Keranjang Panen Igil",
      pengantar:
        "Bantu Igil mengisi 10 jambu ke keranjang. Tambah, kurang, dan baca soal cerita.",
      labelDaftar: "Sepuluh misi keranjang panen",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih jambu, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu jambu. Igil membacakan misi. Jawaban benar mendapat 1 bintang panen. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
          contoh: "12 + 6 = 18. 18 - 12 = 6. Donat Malosi 7.",
        },
        {
          nama: "Daun rapi",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: jambu bergoyang, lalu muncul jejak hitung, lalu Igil menghitung bersama.",
        },
      ],
      kuis: [
        { pertanyaan: "12 + 6 sama dengan berapa?", alias: ["18", "delapan belas"] },
        { pertanyaan: "10 + 6 sama dengan berapa?", alias: ["16", "enam belas"] },
        { pertanyaan: "Tuliskan 14 + 3.", alias: ["17", "empat belas"] },
        { pertanyaan: "Selisih 18 dan 12?", alias: ["6", "enam"] },
        { pertanyaan: "18 - 12 sama dengan berapa?", alias: ["6", "enam"] },
        { pertanyaan: "12 - 8 sama dengan berapa?", alias: ["4", "empat"] },
        { pertanyaan: "Tuliskan 15 - 4.", alias: ["11", "sebelas"] },
        { pertanyaan: "5 kurangnya dari 12 donat?", alias: ["7", "tujuh"] },
        { pertanyaan: "5 + 7 + 8 boneka sama dengan berapa?", alias: ["20", "dua puluh"] },
        { pertanyaan: "Sisa 12 setelah beri 4. Semula berapa?", alias: ["16", "enam belas"] },
      ],
      voice: [
        [
          "Igil menjaga keranjang panen. Ada sepuluh jambu dari yang pertama sampai piala.",
          "Jambu hijau untuk menghitung maju. Jambu biru untuk bersusun. Jambu kuning untuk pasangan sepuluh. Jambu ungu untuk soal cerita.",
          "Jawaban benar mendapat satu bintang panen. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Hitung maju atau mundur. Susun puluhan dan satuan. Baca kata lebihnya dan kurangnya. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Maju, susun, pasangan, cerita",
          uraian:
            "Tambah dengan maju, bersusun, atau pasangan sepuluh. Kurang dengan mundur, bersusun, atau pasangan sepuluh. Satuan di bawah satuan. 10 satuan = 1 puluhan. Lebihnya ditambah. Kurangnya dikurangi. Selisih dikurangi. Jumlah dijumlahkan.",
          contoh: "Hitung maju atau mundur, susun puluhan-satuan, baca kata ceritanya.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "Jambu Kira 18. 12 + 6 = 18. Satuan 2 + 6 = 8. 18 + 2 = 20. Selisih 6. Sisa 4. Donat Malosi 7. Jeruk semula 16. Boneka 20. Kelereng Halim 8.",
          contoh: "Jawaban latihan: B, A, C, B, A, C, B, A, C, B.",
        },
      ],
      kuis: [
        { pertanyaan: "Tika 12, Kira 6 lebih banyak. Jambu Kira?", alias: ["18", "delapan belas", "b"] },
        { pertanyaan: "12 + 6 dengan maju. Hasilnya?", alias: ["18", "a"] },
        { pertanyaan: "Satuan 2 + 6 pada 12 + 6?", alias: ["8", "delapan", "c"] },
        { pertanyaan: "18 + 2 sama dengan berapa?", alias: ["20", "dua puluh", "b"] },
        { pertanyaan: "Selisih 18 dan 12?", alias: ["6", "enam", "a"] },
        { pertanyaan: "12 - 8 sisa berapa?", alias: ["4", "empat", "c"] },
        { pertanyaan: "5 kurangnya dari 12 donat?", alias: ["7", "tujuh", "b"] },
        { pertanyaan: "Sisa 12 setelah beri 4. Semula?", alias: ["16", "enam belas", "a"] },
        { pertanyaan: "5 + 7 + 8 boneka?", alias: ["20", "dua puluh", "c"] },
        { pertanyaan: "Upe 11, 3 lebihnya dari Halim. Kelereng Halim?", alias: ["8", "delapan", "b"] },
      ],
      voice: [
        [
          "Poin penting. Tambah dengan maju, bersusun, atau pasangan sepuluh. Kurang dengan mundur, bersusun, atau pasangan sepuluh. Satuan di bawah satuan.",
          "Sepuluh satuan sama dengan satu puluhan. Lebihnya ditambah. Kurangnya dikurangi. Selisih dikurangi. Jumlah dijumlahkan.",
        ],
        [
          "Jambu Kira delapan belas. Dua belas tambah enam delapan belas. Satuan dua tambah enam delapan. Delapan belas tambah dua dua puluh.",
          "Selisih enam. Sisa empat. Donat Malosi tujuh. Jeruk semula enam belas. Boneka dua puluh. Kelereng Halim delapan.",
        ],
      ],
    },
  ],
};
