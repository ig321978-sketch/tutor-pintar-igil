import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB15, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB15 = "Bab 15: Uang dan Pemecahan Masalah";

export const MODUL_MTK1_BAB15: ModulResmiPai = {
  id: "mtk-1-bab15",
  judul: JUDUL_MTK1_BAB15,
  pola: /uang\s+dan\s+pemecahan\s+masalah\b|warung celi|celengan babi kecil/,
  motivasi:
    "Lala, Bima, dan Raka belajar nilai uang, total harga, dan kembalian bersama celengan babi kecil Celi di Warung Celi.",
  kunciJawaban: "D,B,B,B,B,A,C,B,B,C",
  sketsaKartu: [
    "Lala, Bima, dan Raka menghitung uang mainan bersama celengan babi kecil Celi.",
    "Papan pecahan uang, tukar, total harga, dan kembalian.",
    "Celi menjaga Warung Celi dan menghitung koin warung.",
    "Poin penting dan lembar evaluasi uang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Mana uang yang nilainya paling besar?
A) 1.000
B) 2.000
C) 5.000
D) 10.000`,
    `[Soal 2 - PG - Tipe: LOTS]
Lima ribu sama dengan berapa lembar uang seribu?
A) 2
B) 5
C) 10
D) 4`,
    `[Soal 3 - PG - Tipe: LOTS]
Roti 3.000 ditambah susu 2.000 sama dengan...
A) 1.000
B) 5.000
C) 6.000
D) 4.000`,
    `[Soal 4 - PG - Tipe: HOTS]
Barang berharga 4.000 dibayar 10.000. Kembaliannya...
A) 14.000
B) 6.000
C) 4.000
D) 5.000`,
    `[Soal 5 - PG - Tipe: LOTS]
Satu uang 2.000 dibanding dua uang 1.000 nilainya...
A) Tidak sama
B) Sama
C) Lebih besar
D) Lebih kecil`,
    `[Soal 6 - PG - Tipe: LOTS]
Harga 1.000, 3.000, 5.000, dan 2.000. Yang paling murah adalah...
A) 1.000
B) 3.000
C) 5.000
D) 2.000`,
    `[Soal 7 - PG - Tipe: HOTS]
Menabung 2.000 setiap hari selama 3 hari. Jumlah tabungannya...
A) 4.000
B) 5.000
C) 6.000
D) 8.000`,
    `[Soal 8 - PG - Tipe: HOTS]
Uang 5.000 untuk barang 8.000. Yang benar adalah...
A) Cukup, kembalian 3.000
B) Tidak cukup, kurang 3.000
C) Cukup, tanpa kembalian
D) Tidak cukup, kurang 5.000`,
    `[Soal 9 - PG - Tipe: HOTS]
Harga naik 2.000: 1.000, 3.000, 5.000. Berikutnya...
A) 6.000
B) 7.000
C) 8.000
D) 9.000`,
    `[Soal 10 - PG - Tipe: HOTS]
Mana yang nilainya berbeda: 5.000, 1.000 × 5, 2.000 + 2.000, atau 1.000 × 5?
A) 5.000
B) 1.000 × 5 yang pertama
C) 2.000 + 2.000
D) 1.000 × 5 yang kedua`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Meja Uang Lala",
      pengantar: "Lala, Bima, dan Raka mengenal pecahan rupiah, menukar uang, lalu menghitung total dan kembalian.",
      labelDaftar: "Lima adegan uang",
      kolom: 1,
      item: [
        {
          nama: "Pecahan rupiah",
          singkat: "Kertas dan logam",
          uraian: "Uang kertas: 1.000, 2.000, 5.000, dan 10.000. Uang logam: 100, 200, 500, dan 1.000. Angka di uang menunjukkan nilainya.",
          contoh: "Angka besar, nilai besar.",
        },
        {
          nama: "Nilai tukar",
          singkat: "Jumlahnya sama",
          uraian: "5.000 sama dengan lima lembar 1.000. 10.000 sama dengan dua lembar 5.000 atau sepuluh lembar 1.000.",
          contoh: "1.000 kertas sama dengan 1.000 logam.",
        },
        {
          nama: "Total harga",
          singkat: "Harga dijumlahkan",
          uraian: "Roti 3.000 ditambah susu 2.000 sama dengan 5.000. Roti 3.000 ditambah kue 5.000 sama dengan 8.000.",
          contoh: "Banyak barang, harga dijumlahkan.",
        },
        {
          nama: "Kembalian",
          singkat: "Bayar dikurangi harga",
          uraian: "Bayar 5.000 untuk harga 3.000, kembaliannya 2.000. Bayar 10.000 untuk harga 3.000, kembaliannya 7.000.",
          contoh: "Kembalian = uang dibayar − harga barang.",
        },
        {
          nama: "Menabung",
          singkat: "Lebih dari satu langkah",
          uraian: "Nabung 2.000 selama 3 hari menjadi 6.000. Mainan 10.000 masih kurang 4.000.",
          contoh: "Tambah dulu, lalu kurang.",
        },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih besar, 1.000 atau 5.000?", alias: ["lima ribu"] },
        { pertanyaan: "Urutkan 1.000, 2.000, 5.000, dan 10.000.", alias: ["seribu dua ribu lima ribu sepuluh ribu"] },
        { pertanyaan: "Apakah 2.000 sama dengan dua lembar 1.000?", alias: ["sama"] },
        { pertanyaan: "Berapa lembar 1.000 supaya sama dengan 5.000?", alias: ["lima lembar"] },
        { pertanyaan: "Berapa total 2.000 dan 3.000?", alias: ["lima ribu"] },
        { pertanyaan: "Berapa total 4.000, 2.000, dan 1.000?", alias: ["tujuh ribu"] },
        { pertanyaan: "Bayar 10.000 untuk harga 4.000. Berapa kembaliannya?", alias: ["enam ribu"] },
        { pertanyaan: "Bayar 5.000 untuk harga 2.000. Tulis kalimatnya.", alias: ["5 000 - 2 000 = 3 000"] },
        { pertanyaan: "Nabung 1.000 selama tiga hari. Berapa jumlahnya?", alias: ["tiga ribu"] },
        { pertanyaan: "5.000 + 3.000, lalu 8.000 − 6.000. Berapa hasil akhirnya?", alias: ["delapan ribu dua ribu"] },
        { pertanyaan: "Mana uang yang nilainya paling besar?", alias: ["10 000"] },
        { pertanyaan: "Pasangkan 5.000, 10.000, dan 2.000 dengan tukarannya.", alias: ["lima", "sepuluh", "dua"] },
        { pertanyaan: "Susun harga dari yang paling kecil.", alias: ["1 000", "2 000", "3 000"] },
        { pertanyaan: "Periksa tiga pernyataan tentang uang.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana nilai yang berbeda dari 5.000?", alias: ["4 000"] },
      ],
      voice: [
        [
          "Uang di Indonesia namanya rupiah. Ada uang kertas dan uang logam. Angka di uang menunjukkan nilainya.",
          "Uang bisa ditukar asal jumlah nilainya sama.",
          "Kalau membeli banyak barang, harganya dijumlahkan. Kalau membayar lebih, kembaliannya dikurangi.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Papan Kasir",
      pengantar: "Membaca pecahan uang, menukar, menjumlahkan harga, dan menghitung kembalian.",
      labelDaftar: "Lima papan kasir",
      kolom: 1,
      item: [
        {
          nama: "Dua jenis uang",
          singkat: "Kertas dan logam",
          uraian: "Uang kertas biasanya nilainya besar. Uang logam nilainya lebih kecil. Semakin besar angkanya, semakin besar nilainya.",
          contoh: "2.000 lebih besar dari 500.",
        },
        {
          nama: "Tukar dengan nilai sama",
          singkat: "Lembarnya boleh beda",
          uraian: "1.000 bisa ditukar dua uang 500. 2.000 bisa ditukar empat uang 500. 5.000 sama dengan lima uang 1.000.",
          contoh: "Jumlah nilainya harus sama.",
        },
        {
          nama: "Total harga",
          singkat: "Semua dijumlahkan",
          uraian: "Roti 3.000 ditambah susu 2.000 sama dengan 5.000.",
          contoh: "Banyak barang, harga dijumlahkan.",
        },
        {
          nama: "Kembalian",
          singkat: "Bayar kurang harga",
          uraian: "Harga 3.000 dibayar 5.000, kembalian 2.000. Harga 4.000 dibayar 10.000, kembalian 6.000.",
          contoh: "Bayar dikurangi harga.",
        },
        {
          nama: "Soal campuran",
          singkat: "Satu langkah dulu",
          uraian: "Nabung 2.000 selama 3 hari menjadi 6.000. Untuk mainan 10.000 masih kurang 4.000.",
          contoh: "Kerjakan langkah berikutnya setelah langkah pertama selesai.",
        },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih besar, 100 atau 500?", alias: ["lima ratus"] },
        { pertanyaan: "Urutkan uang logam 100, 200, 500, dan 1.000.", alias: ["seratus dua ratus lima ratus seribu"] },
        { pertanyaan: "Berapa uang 200 supaya sama dengan 1.000?", alias: ["lima"] },
        { pertanyaan: "5.000 sama dengan berapa lembar 1.000?", alias: ["lima lembar"] },
        { pertanyaan: "Berapa total 1.000 dan 2.000?", alias: ["tiga ribu"] },
        { pertanyaan: "Berapa total 4.000, 2.000, dan 1.000?", alias: ["tujuh ribu"] },
        { pertanyaan: "Bayar 5.000 untuk harga 1.000. Berapa kembaliannya?", alias: ["empat ribu"] },
        { pertanyaan: "Bayar 10.000 untuk harga 3.000. Tulis kalimatnya.", alias: ["10 000 - 3 000 = 7 000"] },
        { pertanyaan: "Nabung 1.000 selama tiga hari. Berapa jumlahnya?", alias: ["tiga ribu"] },
        { pertanyaan: "4.000 + 4.000, lalu 8.000 − 5.000. Berapa hasil akhirnya?", alias: ["delapan ribu tiga ribu"] },
        { pertanyaan: "Hitungan kembalian mana yang benar untuk harga 4.000 dibayar 10.000?", alias: ["6 000"] },
        { pertanyaan: "Pasangkan belanjaan dengan totalnya.", alias: ["5 000", "4 000", "6 000"] },
        { pertanyaan: "Susun uang dari yang paling kecil.", alias: ["100", "500", "1 000", "5 000", "10 000"] },
        { pertanyaan: "Periksa tiga pernyataan hitungan.", alias: ["benar", "salah"] },
        { pertanyaan: "Harga 6.000 dibayar 10.000. Berapa kembaliannya?", alias: ["empat ribu"] },
      ],
      voice: [
        [
          "Uang kertas biasanya nilainya besar. Uang logam nilainya lebih kecil.",
          "Uang bisa ditukar asal jumlah nilainya sama.",
          "Kembalian dihitung dengan mengurangi harga dari uang yang dibayar.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Warung Celi",
      pengantar: "Siswa menjadi penjaga warung. Setiap transaksi meminta total harga atau kembalian yang tepat.",
      labelDaftar: "Sepuluh pos warung",
      kolom: 1,
      item: [
        {
          nama: "Transaksi warung",
          singkat: "Total lalu kembalian",
          uraian: "Kenali uang, jumlahkan harga, lalu hitung kembalian. Sepuluh transaksi selesai, sepuluh koin warung terkumpul.",
          contoh: "Salah hitung tidak mengurangi koin. Coba lagi.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB15),
      voice: [
        [
          "Kalian menjadi penjaga warung. Pelanggan membeli barang dan membayar dengan uang.",
          "Hitung total harga dan kembaliannya. Kalau benar, kalian mendapat koin.",
          "Sepuluh transaksi selesai, sepuluh koin terkumpul, warung besar terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca nilai uang, menghitung total, dan memberi kembalian.",
      labelDaftar: "Lembar evaluasi uang",
      kolom: 1,
      item: [
        {
          nama: "Nilai dan kembalian",
          singkat: "Jumlah atau kurang",
          uraian: "Membeli berarti harga dijumlahkan. Membayar lebih berarti kembalian dikurangi. Uang yang lebih kecil dari harga berarti belum cukup.",
          contoh: "Periksa dulu apakah uangnya cukup.",
        },
        {
          nama: "Warung ramai",
          singkat: "Tiga langkah",
          uraian: "Lima roti seharga 3.000 menjadi 15.000. Kembalian 10.000 untuk satu roti adalah 7.000. Uang 15.000 belum cukup untuk barang 20.000.",
          contoh: "Kerjakan satu bagian, lalu bagian berikutnya.",
        },
      ],
      kuis: [
        { pertanyaan: "Urutkan 100, 500, 1.000, 5.000, dan 10.000.", alias: ["seratus lima ratus seribu lima ribu sepuluh ribu"] },
        { pertanyaan: "Berapa total roti 3.000 dan kue 4.000?", alias: ["tujuh ribu"] },
        { pertanyaan: "Bayar 10.000 untuk harga 4.000. Berapa kembaliannya?", alias: ["enam ribu"] },
        { pertanyaan: "Bima bayar 5.000 untuk barang 7.000 dan mengira dapat kembalian. Apakah ia benar?", alias: ["tidak cukup"] },
        { pertanyaan: "Pasangkan transaksi dengan total atau kembaliannya.", alias: ["total", "kembalian"] },
        { pertanyaan: "Buku 3.000 dan pensil 2.000 dibayar 10.000. Tulis total dan kembalian.", alias: ["total lima ribu kembalian lima ribu"] },
        { pertanyaan: "Berapa uang 500 supaya sama dengan 5.000?", alias: ["sepuluh"] },
        { pertanyaan: "Susun langkah belanja dari awal sampai akhir.", alias: ["pilih barang hitung total bayar"] },
        { pertanyaan: "Uang 5.000 untuk barang 8.000. Cukup atau tidak, dan mengapa?", alias: ["tidak cukup"] },
        { pertanyaan: "Lima roti 3.000, kembalian satu roti dari 10.000, dan cukupkah 15.000 untuk 20.000?", alias: ["lima belas ribu", "tujuh ribu"] },
      ],
      voice: [
        [
          "Sekarang saatnya kalian mengerjakan sendiri. Ada sepuluh soal.",
          "Sebagian meminta nilai uang, sebagian menghitung total harga, dan sebagian memberi kembalian.",
          "Kalau membeli, harganya dijumlahkan. Kalau membayar, kembaliannya dikurangi.",
        ],
      ],
    },
  ],
};
