import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB1 } from "@/lib/misi-mtk-5-bab1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB1 = "Bab 1: Bilangan Cacah Sampai 100.000";

export const MODUL_MTK5_BAB1: ModulResmiPai = {
  id: "mtk-5-bab1",
  judul: JUDUL_MTK5_BAB1,
  pola: /^bab 1: bilangan cacah sampai 100\.?000$/,
  motivasi:
    "Arun, Mira, dan Kiran menghitung tiket di Dermaga Lentera bersama Igil. Mereka membaca, membandingkan, menyusun, dan menghitung sampai 100.000.",
  kunciJawaban: "B,C,A,B,C,A,B,D,A,C",
  sketsaKartu: [
    "Arun, Mira, Kiran, dan Igil di dermaga lentera.",
    "Rak, banding harga, susun uang, lalu operasi hitung.",
    "Sepuluh pos pola di dermaga.",
    "Poin penting dan lembar evaluasi sampai 100.000.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Bagaimana membaca 26.932?
A) Dua puluh enam ratus sembilan ratus tiga puluh dua
B) Dua puluh enam ribu sembilan ratus tiga puluh dua
C) Dua enam sembilan tiga dua
D) Dua puluh enam ribu tiga puluh dua`,
    `[Soal 2 - PG - Tipe: MOTS]
Pada 54.675, angka 7 bernilai...
A) 7.000
B) 700
C) 70
D) 7`,
    `[Soal 3 - PG - Tipe: MOTS]
Mana yang lebih besar?
A) 75.360
B) 65.750
C) 57.000
D) 56.560`,
    `[Soal 4 - PG - Tipe: HOTS]
Urutan harga dari yang paling murah: 56.560, 65.750, 57.000, 75.360
A) 57.000, 56.560, 65.750, 75.360
B) 56.560, 57.000, 65.750, 75.360
C) 75.360, 65.750, 57.000, 56.560
D) 56.560, 65.750, 57.000, 75.360`,
    `[Soal 5 - PG - Tipe: MOTS]
3 lembar sepuluh ribuan, 8 lembar seribuan, dan 6 keping seratusan menjadi...
A) 3.860
B) 30.860
C) 38.600
D) 386.000`,
    `[Soal 6 - PG - Tipe: HOTS]
57.500 + 22.000 = ...
A) 79.500
B) 79.000
C) 75.900
D) 80.500`,
    `[Soal 7 - PG - Tipe: HOTS]
47.900 − 45.750 = ...
A) 2.250
B) 2.150
C) 1.150
D) 3.150`,
    `[Soal 8 - PG - Tipe: MOTS]
12 × 5.000 = ...
A) 6.000
B) 17.000
C) 50.000
D) 60.000`,
    `[Soal 9 - PG - Tipe: MOTS]
64.000 ÷ 4 = ...
A) 16.000
B) 14.000
C) 1.600
D) 60.000`,
    `[Soal 10 - PG - Tipe: HOTS]
Dua porsi seharga 27.500 berjumlah...
A) 27.500
B) 54.000
C) 55.000
D) 53.000`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dermaga Lentera",
      pengantar: "Arun, Mira, Kiran, dan Igil membaca tiket sampai 100.000.",
      labelDaftar: "Empat bagian bilangan cacah",
      kolom: 1,
      item: [
        {
          nama: "Membaca dan nilai tempat",
          singkat: "Lima rak",
          uraian:
            "Empat belas ribu lima ratus ditulis 14.500. 66.500 dibaca enam puluh enam ribu lima ratus. Titik hanya pemisah ribuan.",
          contoh: "Baca dari kiri. Rak kosong tetap ditulis nol.",
        },
        {
          nama: "Membandingkan dan mengurutkan",
          singkat: "Dari kiri",
          uraian: "56.560 lebih kecil daripada 57.000 karena rak ribuannya lebih kecil.",
          contoh: "Bandingkan rak kiri dulu.",
        },
        {
          nama: "Komposisi dan dekomposisi",
          singkat: "Susun dan urai",
          uraian: "6 lembar sepuluh ribuan, 3 lembar seribuan, dan 5 keping seratusan menjadi 63.500.",
          contoh: "Satu bilangan bisa disusun dengan lebih dari satu cara.",
        },
        {
          nama: "Operasi hitung",
          singkat: "Tambah, kurang, kali, bagi",
          uraian: "57.500 + 22.000 = 79.500. 47.900 − 45.750 = 2.150. 12 × 5.000 = 60.000. 64.000 ÷ 4 = 16.000.",
          contoh: "Jumlahkan dari rak kanan. Kali bisa dipecah. Bagi berarti dibagi rata.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca 44.567.", alias: ["44567", "empat puluh empat ribu lima ratus enam puluh tujuh"] },
        { pertanyaan: "Tulis lima belas ribu sembilan ratus lima puluh.", alias: ["15950", "15.950"] },
        { pertanyaan: "Mana yang lebih kecil, 97.768 atau 89.876?", alias: ["89876", "89.876"] },
        { pertanyaan: "Urutkan 56.560, 65.750, dan 75.360 dari yang murah.", alias: ["56560", "65750", "75360"] },
        { pertanyaan: "3 puluh ribuan, 8 ribuan, dan 6 ratusan.", alias: ["38600", "38.600"] },
        { pertanyaan: "Urai 57.500.", alias: ["50000", "7000", "500"] },
        { pertanyaan: "32.500 + 13.250.", alias: ["45750", "45.750"] },
        { pertanyaan: "67.987 − 13.453.", alias: ["54534", "54.534"] },
        { pertanyaan: "Pasangkan bilangan dengan bacaannya.", alias: ["14500", "66500", "26932"] },
        { pertanyaan: "Susun dari yang kecil.", alias: ["43217", "56475", "78897"] },
        { pertanyaan: "Benar atau salah tentang bacaan dan nilai.", alias: ["benar", "salah"] },
        { pertanyaan: "Selisih 34.000 dan 30.000.", alias: ["4000", "4.000"] },
      ],
      voice: [[
        "Di Dermaga Lentera, tiket dibaca dari rak kiri.",
        "Puluh ribuan, ribuan, ratusan, puluhan, lalu satuan.",
        "Titik pada 14.500 hanya pemisah ribuan.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Peta Bilangan 100.000",
      pengantar: "Empat peta: baca, banding, susun, dan hitung.",
      labelDaftar: "Peta empat bagian",
      kolom: 1,
      item: [
        {
          nama: "Peta baca",
          singkat: "Lima rak",
          uraian: "66.500 punya 6 di puluh ribuan dan 6 di ribuan.",
          contoh: "Nol di rak tetap ditulis.",
        },
        {
          nama: "Peta banding",
          singkat: "Rak kiri",
          uraian: "76.675 lebih besar daripada 67.765.",
          contoh: "Kalau rak kiri sama, geser ke kanan.",
        },
        {
          nama: "Peta susun",
          singkat: "Lebih dari satu cara",
          uraian: "45.600 = 4 puluh ribuan + 5 ribuan + 6 ratusan. Sepuluh ratusan dapat ditukar menjadi satu ribuan.",
          contoh: "Urai, lalu susun kembali.",
        },
        {
          nama: "Peta operasi",
          singkat: "Empat operasi",
          uraian: "Penjumlahan dan pengurangan mengikuti rak. Perkalian dapat dipecah. Pembagian membagi rata.",
          contoh: "Periksa hasil dengan operasi baliknya.",
        },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih besar, 86.567 atau 86.576?", alias: ["86576", "86.576"] },
        { pertanyaan: "Isi bilangan yang hilang pada lompatan seratus.", alias: ["85450", "85.450"] },
        { pertanyaan: "9 puluh ribuan, 7 ribuan, dan 5 ratusan.", alias: ["97500", "97.500"] },
        { pertanyaan: "3 puluh ribuan dan 4 ribuan.", alias: ["34000", "34.000"] },
        { pertanyaan: "Dua kali 27.500.", alias: ["55000", "55.000"] },
        { pertanyaan: "76.598 + 12.456.", alias: ["89054", "89.054"] },
        { pertanyaan: "Sisa 100.000 setelah dua pembelian.", alias: ["23000", "23.000"] },
        { pertanyaan: "Pasangkan operasi dengan hasil.", alias: ["79500", "60000", "16000"] },
        { pertanyaan: "Susun harga buah dari yang murah.", alias: ["15000", "17000", "23500", "32000", "34000"] },
        { pertanyaan: "Benar atau salah tentang harga buah.", alias: ["benar", "salah"] },
        { pertanyaan: "Paket yang lebih hemat untuk dua porsi.", alias: ["paket b", "2000"] },
      ],
      voice: [[
        "Peta ini mengulang empat cara hitung di dermaga.",
        "Bandingkan dari kiri, susun dari pecahan uang, lalu hitung dari rak kanan.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Dermaga",
      pengantar: "Sepuluh soal pola. Dua dijawab dengan suara, dua ditulis.",
      labelDaftar: "Sepuluh pos",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, hilang, analogi, beda",
          uraian: "Deret naik tetap, angka hilang, analogi kali, dan bilangan yang berbeda.",
          contoh: "Dua pos suara dan dua pos tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB1),
      voice: [[
        "Igil menjaga sepuluh pos di ujung dermaga.",
        "Ada deret, angka hilang, analogi, dan yang berbeda.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca, menyusun, dan menghitung sampai 100.000.",
      labelDaftar: "Lembar evaluasi dermaga",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi bab",
          singkat: "Sepuluh soal",
          uraian:
            "14.500 dibaca empat belas ribu lima ratus. 57.500 + 22.000 = 79.500. 12 × 5.000 = 60.000. 64.000 ÷ 4 = 16.000.",
          contoh: "Bandingkan dari kiri. Jumlahkan dari kanan.",
        },
      ],
      kuis: [
        { pertanyaan: "3 puluh ribuan, 7 ribuan, dan 10 ratusan.", alias: ["38000", "38.000"] },
        { pertanyaan: "47.900 − 32.500.", alias: ["15400", "15.400"] },
        { pertanyaan: "Baca 16.667.", alias: ["16667", "enam belas ribu enam ratus enam puluh tujuh"] },
        { pertanyaan: "Harga yang harus dibayar tiap anak.", alias: ["47000", "47.000"] },
        { pertanyaan: "Pasangkan hitungan dengan hasil.", alias: ["26932", "9610", "30000"] },
        { pertanyaan: "75.360 − 56.560.", alias: ["18800", "18.800"] },
        { pertanyaan: "Deret 40.350, 40.450, 40.550.", alias: ["40650", "40.650"] },
        { pertanyaan: "Jumlah pecahan uang.", alias: ["59000", "59.000"] },
        { pertanyaan: "Baca 25.786.", alias: ["25786", "dua puluh lima ribu tujuh ratus delapan puluh enam"] },
        { pertanyaan: "Sepuluh keping seratusan sama dengan...", alias: ["1000", "1.000"] },
      ],
      voice: [[
        "Sepuluh soal dermaga. Baca pelan, lalu hitung.",
        "Kalau rak kiri sama, geser ke rak di kanannya.",
      ]],
    },
  ],
};
