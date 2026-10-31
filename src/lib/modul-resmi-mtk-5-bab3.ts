import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB3 } from "@/lib/misi-mtk-5-bab3";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB3 = "Bab 3: Bilangan Pecahan";

export const MODUL_MTK5_BAB3: ModulResmiPai = {
  id: "mtk-5-bab3",
  judul: JUDUL_MTK5_BAB3,
  pola: /^bab 3: bilangan pecahan$/,
  motivasi:
    "Sari, Bima, dan Wulan memotong roti bulan di tepi sungai bersama burung hantu Igil. Mereka membandingkan, menjumlah, dan mengurang pecahan.",
  kunciJawaban: "B,A,B,C,B,C,A,A,C,A",
  sketsaKartu: [
    "Sari, Bima, dan Wulan di dapur roti bulan bersama Igil.",
    "Peta bentuk, urutan, jumlah, dan selisih pecahan.",
    "Sepuluh pos tepi sungai.",
    "Poin penting dan lembar evaluasi pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Empat bagian dari delapan bagian yang sama ditulis...
A) 4/4
B) 4/8
C) 8/4
D) 1/8`,
    `[Soal 2 - PG - Tipe: MOTS]
2 3/4 diubah menjadi pecahan biasa menjadi...
A) 11/4
B) 8/4
C) 6/4
D) 5/4`,
    `[Soal 3 - PG - Tipe: MOTS]
Mana yang lebih kecil?
A) 1/2
B) 1/5
C) keduanya sama
D) 2/5`,
    `[Soal 4 - PG - Tipe: MOTS]
Dari 2 1/4, 2 2/5, dan 2 1/2, yang terpendek adalah...
A) 2 1/2
B) 2 2/5
C) 2 1/4
D) 2 3/4`,
    `[Soal 5 - PG - Tipe: MOTS]
1/4 + 3/4 = ...
A) 4/8
B) 1
C) 3/4
D) 2/4`,
    `[Soal 6 - PG - Tipe: MOTS]
1/2 + 1/3 = ...
A) 2/5
B) 1/6
C) 5/6
D) 2/6`,
    `[Soal 7 - PG - Tipe: MOTS]
2/3 − 1/3 = ...
A) 1/3
B) 1/6
C) 1
D) 3/3`,
    `[Soal 8 - PG - Tipe: MOTS]
2/3 − 1/2 = ...
A) 1/6
B) 1/3
C) 1/5
D) 4/6`,
    `[Soal 9 - PG - Tipe: HOTS]
1 1/2 kg gula dan 2 1/2 kg tepung. Berat semuanya...
A) 3 kg
B) 3 1/2 kg
C) 4 kg
D) 4 1/2 kg`,
    `[Soal 10 - PG - Tipe: HOTS]
2 1/4 kg dikurangi 2 1/5 kg. Sisanya...
A) 1/20 kg
B) 1/9 kg
C) 4/9 kg
D) 1/2 kg`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dapur Roti Bulan",
      pengantar: "Sari, Bima, Wulan, dan Igil memotong roti bulan sambil belajar pecahan.",
      labelDaftar: "Empat adegan dapur roti",
      kolom: 1,
      item: [
        { nama: "Bentuk pecahan", singkat: "Bagian dari utuh", uraian: "Pembilang adalah bagian yang diambil. Penyebut adalah banyak bagian semuanya. Pecahan biasa hanya pembilang dan penyebut. Pecahan campuran punya bilangan bulat di depan.", contoh: "1 bagian dari 2 ditulis 1/2." },
        { nama: "Banding dan urut", singkat: "Samakan dulu", uraian: "2 3/4 = 11/4. 3 1/2 = 7/2. Dengan penyebut 8, urutannya 7/8, lalu 2 3/4, lalu 3 1/2. Pita terpendek ke terpanjang: 2 1/4, 2 2/5, 2 1/2.", contoh: "Makin ke kanan pada garis, nilainya makin besar." },
        { nama: "Jumlah penyebut sama", singkat: "Pembilang ditambah", uraian: "2/8 + 1/8 = 3/8. 2/10 + 3/10 = 5/10. Campuran: jumlahkan bulatnya, lalu pecahannya. 2 1/5 + 3 1/5 = 5 2/5.", contoh: "Penyebut tidak ikut dijumlah." },
        { nama: "Jumlah dan selisih beda", singkat: "KPK penyebut", uraian: "1/2 + 1/3 = 5/6. 1/3 + 4/6 = 1. Jarak 1 1/2 + 2 1/4 + 1/200 = 3 151/200. 2/3 − 1/2 = 1/6. 4 1/2 − 2 1/3 = 2 1/6.", contoh: "Samakan penyebut, baru hitung pembilang." },
      ],
      kuis: [
        { pertanyaan: "Tiga bagian dari empat.", alias: ["3/4", "tiga per empat"] },
        { pertanyaan: "Dua bagian dari lima.", alias: ["2/5", "dua per lima"] },
        { pertanyaan: "Mana yang lebih kecil, 1/2 atau 1/5.", alias: ["1/5", "seperlima"] },
        { pertanyaan: "Urutkan pita dari yang terpendek.", alias: ["2 1/4", "2 2/5", "2 1/2"] },
        { pertanyaan: "1/4 + 3/4.", alias: ["1", "satu", "4/4"] },
        { pertanyaan: "1 1/2 + 2 1/2.", alias: ["4", "empat"] },
        { pertanyaan: "4/5 + 1/4.", alias: ["21/20", "1 1/20"] },
        { pertanyaan: "3/5 + 1/3.", alias: ["14/15"] },
        { pertanyaan: "2/7 − 1/7.", alias: ["1/7"] },
        { pertanyaan: "1/3 − 1/5.", alias: ["2/15"] },
        { pertanyaan: "Tanda antara 1/2 dan 1/3.", alias: [">"] },
        { pertanyaan: "Urutkan 7/8, 2 3/4, dan 3 1/2.", alias: ["7/8", "2 3/4", "3 1/2"] },
        { pertanyaan: "Tiga pernyataan pecahan.", alias: ["salah", "benar", "salah"] },
        { pertanyaan: "5/10 disederhanakan.", alias: ["1/2"] },
        { pertanyaan: "Pasangkan jumlah roti.", alias: ["3/8", "5 2/5", "5/6"] },
      ],
      voice: [[
        "Di dapur tepi sungai, roti dipotong sama besar.",
        "Pecahan menyebut bagian yang diambil dari seluruh potongan.",
        "Penyebut disamakan dulu sebelum dijumlah atau dikurang.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Peta Pecahan",
      pengantar: "Peta cara membaca, mengurutkan, menjumlah, dan mengurang pecahan.",
      labelDaftar: "Empat peta pecahan",
      kolom: 1,
      item: [
        { nama: "Nama bagian", singkat: "Atas dan bawah", uraian: "Angka atas pembilang. Angka bawah penyebut. 1/2 berarti satu dari dua bagian.", contoh: "Empat dari enam ditulis 4/6." },
        { nama: "Garis dan penyebut", singkat: "22/8", uraian: "2 3/4 = 22/8. 3 1/2 = 28/8. 7/8 tetap 7/8. Yang terjauh 3 1/2.", contoh: "Bandingkan pembilang setelah penyebut sama." },
        { nama: "Jumlah", singkat: "Pembilang saja", uraian: "Penyebut sama: jumlahkan pembilang. Penyebut beda: cari KPK, buat pecahan senilai, lalu jumlahkan.", contoh: "1/2 + 1/3 = 3/6 + 2/6 = 5/6." },
        { nama: "Selisih", singkat: "Pembilang dikurang", uraian: "2/3 − 1/3 = 1/3. 5 2/3 − 2 1/3 = 3 1/3. 2/3 − 1/2 = 4/6 − 3/6 = 1/6. 4 1/2 − 2 1/3 = 2 1/6.", contoh: "Sisa gula 2 1/4 − 2 1/5 = 1/20." },
      ],
      kuis: [
        { pertanyaan: "Satu bagian dari dua.", alias: ["1/2"] },
        { pertanyaan: "Empat bagian dari enam.", alias: ["4/6", "2/3"] },
        { pertanyaan: "Lompatan yang terjauh.", alias: ["3 1/2", "7/2"] },
        { pertanyaan: "2 3/4 dengan penyebut 8.", alias: ["22/8"] },
        { pertanyaan: "2/8 + 1/8.", alias: ["3/8"] },
        { pertanyaan: "2 1/5 + 3 1/5.", alias: ["5 2/5", "27/5"] },
        { pertanyaan: "1/2 + 1/3.", alias: ["5/6"] },
        { pertanyaan: "1 1/2 + 2 1/4 + 1/200.", alias: ["3 151/200", "751/200"] },
        { pertanyaan: "2 1/4 − 2 1/5.", alias: ["1/20"] },
        { pertanyaan: "6/8 − 2/8.", alias: ["4/8", "1/2"] },
        { pertanyaan: "Pasangkan selisih.", alias: ["1/3", "3 1/3", "1/6"] },
        { pertanyaan: "Tiga pernyataan selisih.", alias: ["salah", "benar", "benar"] },
        { pertanyaan: "4 1/2 − 2 1/3.", alias: ["2 1/6"] },
        { pertanyaan: "Urutkan 1/6, 1/3, dan 1/2.", alias: ["1/6", "1/3", "1/2"] },
        { pertanyaan: "KPK dari 3 dan 6.", alias: ["6"] },
      ],
      voice: [[
        "Peta ini merangkum cara di dapur roti bulan.",
        "Garis bilangan dan penyebut yang sama dipakai untuk mengurutkan.",
        "KPK penyebut dipakai saat penyebutnya berbeda.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Tepi Sungai",
      pengantar: "Sepuluh soal pola di jalan batu. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos roti",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret naik satu pembilang. Bagian yang hilang. Analogi jumlah. Pecahan yang nilainya beda. Dua soal suara dan dua soal tulis.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB3),
      voice: [[
        "Igil menjaga sepuluh pos di tepi sungai.",
        "Ada deret, bagian hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pecahan dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi dapur roti",
      kolom: 1,
      item: [
        {
          nama: "Hitung pecahan",
          singkat: "Samakan penyebut",
          uraian: "Jumlah dan selisih pecahan memakai penyebut yang sama. Pecahan campuran boleh diubah menjadi pecahan biasa sebelum dihitung.",
          contoh: "Periksa dengan pecahan senilai.",
        },
      ],
      kuis: [
        { pertanyaan: "2/5 + 1/5.", alias: ["3/5"] },
        { pertanyaan: "1/20 + 1/6.", alias: ["13/60"] },
        { pertanyaan: "3/10 − 1/8.", alias: ["7/40"] },
        { pertanyaan: "1 1/8 − 1/8.", alias: ["1"] },
        { pertanyaan: "Pasangkan hasil hitung.", alias: ["6/7", "2 7/8", "3 33/40"] },
        { pertanyaan: "2 1/3 − 1 5/6.", alias: ["1/2"] },
        { pertanyaan: "Deret 2/9, 4/9, 6/9, berikutnya.", alias: ["8/9"] },
        { pertanyaan: "1/4 + 1 1/3.", alias: ["1 7/12"] },
        { pertanyaan: "1 1/8 − 1/2.", alias: ["5/8"] },
        { pertanyaan: "KPK dari 4 dan 5.", alias: ["20"] },
      ],
      voice: [[
        "Sepuluh soal dapur roti. Baca pelan, lalu hitung.",
        "Samakan penyebut. Pembilang yang dijumlah atau dikurang.",
      ]],
    },
  ],
};
