import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_UANG } from "@/lib/misi-mtk-3-uang";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_UANG = "Bab 8: Uang";

export const MODUL_MTK3_UANG: ModulResmiPai = {
  id: "mtk-3-uang",
  judul: JUDUL_MTK3_UANG,
  pola: /^bab 8: uang$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menghitung pecahan rupiah, jumlah belanja, dan kembalian bersama burung hantu Igil di warung koin.",
  kunciJawaban: "B,B,B,B,B,C,B,C,D,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta berjaga di warung koin bersama burung hantu Igil.",
    "Pecahan rupiah, jumlah uang, harga belanja, kembalian, dan uang cukup.",
    "Sepuluh pos pola di warung.",
    "Poin penting dan lembar evaluasi uang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Mana yang lebih besar, Rp2.000 atau Rp10.000?
A) Rp2.000
B) Rp10.000
C) Keduanya sama
D) Rp500`,
    `[Soal 2 - PG - Tipe: MOTS]
2 keping Rp500 sama dengan...
A) Rp500
B) Rp1.000
C) Rp2.000
D) Rp5.000`,
    `[Soal 3 - PG - Tipe: MOTS]
Rp5.000 + Rp3.000 = ...
A) Rp2.000
B) Rp8.000
C) Rp15.000
D) Rp53.000`,
    `[Soal 4 - PG - Tipe: MOTS]
3 pensil, tiap pensil Rp2.000. Jumlahnya...
A) Rp5.000
B) Rp6.000
C) Rp2.000
D) Rp9.000`,
    `[Soal 5 - PG - Tipe: HOTS]
Harga Rp4.000, dibayar Rp10.000. Kembaliannya...
A) Rp14.000
B) Rp6.000
C) Rp4.000
D) Rp10.000`,
    `[Soal 6 - PG - Tipe: HOTS]
Punya Rp3.000, harga Rp8.000. Uangnya...
A) Cukup
B) Lebih
C) Kurang
D) Sama`,
    `[Soal 7 - PG - Tipe: HOTS]
Deret 1.000 – 3.000 – 5.000 – ⬜. Berikutnya...
A) 6.000
B) 7.000
C) 8.000
D) 4.000`,
    `[Soal 8 - PG - Tipe: HOTS]
⬜ + 4.000 = 10.000. Angka yang hilang...
A) 14.000
B) 4.000
C) 6.000
D) 10.000`,
    `[Soal 9 - PG - Tipe: MOTS]
Mana yang bukan pecahan uang: Rp1.000, Rp5.000, Rp10.000, penggaris?
A) Rp1.000
B) Rp5.000
C) Rp10.000
D) Penggaris`,
    `[Soal 10 - PG - Tipe: HOTS]
Bayar Rp20.000. Beli Rp8.000 dan Rp7.000. Kembaliannya...
A) Rp5.000
B) Rp15.000
C) Rp35.000
D) Rp8.000`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil berjaga di warung koin.",
      labelDaftar: "Lima adegan warung",
      kolom: 1,
      item: [
        {
          nama: "Pecahan uang",
          singkat: "Bandingkan nilai",
          uraian: "Lembar Rp10.000 lebih besar dari keping Rp1.000.",
          contoh: "Lihat angkanya, lalu bandingkan.",
        },
        {
          nama: "Jumlah pecahan",
          singkat: "Tambahkan",
          uraian: "Rp5.000 ditambah Rp2.000 menjadi Rp7.000.",
          contoh: "Jumlahkan lembar dan keping.",
        },
        {
          nama: "Harga belanja",
          singkat: "Jumlah atau kali",
          uraian: "Buku Rp6.000 dan rautan Rp2.000 menjadi Rp8.000.",
          contoh: "Banyak barang dikali harga satuannya.",
        },
        {
          nama: "Kembalian",
          singkat: "Dibayar kurangi harga",
          uraian: "Bayar Rp20.000 untuk harga Rp12.000, kembalian Rp8.000.",
          contoh: "Uang dibayar dikurangi harga.",
        },
        {
          nama: "Cukup atau kurang",
          singkat: "Bandingkan",
          uraian: "Punya Rp6.000, harga Rp10.000, masih kurang Rp4.000.",
          contoh: "Uang cukup jika sama atau lebih besar dari harga.",
        },
      ],
      kuis: [
        { pertanyaan: "Rp2.000 atau Rp5.000. Mana yang lebih besar?", alias: ["5000", "lima ribu"] },
        { pertanyaan: "Dua keping Rp500. Berapa jumlahnya?", alias: ["1000", "seribu"] },
        { pertanyaan: "Rp10.000 ditambah Rp1.000.", alias: ["11000", "sebelas ribu"] },
        { pertanyaan: "Rp2.000 ditambah Rp500.", alias: ["2500", "dua ribu lima ratus"] },
        { pertanyaan: "Susu Rp4.000 dan roti Rp3.000.", alias: ["7000", "tujuh ribu"] },
        { pertanyaan: "2 pensil, tiap pensil Rp3.000.", alias: ["6000", "enam ribu"] },
        { pertanyaan: "Harga Rp9.000, dibayar Rp10.000. Kembalian?", alias: ["1000", "seribu"] },
        { pertanyaan: "Harga Rp4.000, dibayar Rp10.000. Kembalian?", alias: ["6000", "enam ribu"] },
        { pertanyaan: "Punya Rp8.000, harga Rp6.000. Cukup atau kurang?", alias: ["cukup"] },
        { pertanyaan: "Punya Rp3.000, harga Rp5.000. Berapa kurangnya?", alias: ["2000", "dua ribu"] },
        { pertanyaan: "Mana pecahan terbesar?", alias: ["20000"] },
        { pertanyaan: "Pasangkan pecahan dan bacaannya.", alias: ["lima ratus", "dua ribu", "dua puluh ribu"] },
        { pertanyaan: "Susun dari yang terkecil.", alias: ["500", "1000", "5000", "10000"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Bayar Rp20.000, harga Rp15.000. Kembalian?", alias: ["5000"] },
      ],
      voice: [["Sabtu pagi warung koin dibuka. Kita mengenal pecahan, menghitung belanja, lalu mencari kembalian."]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan warung: pecahan, jumlah, harga, kembalian, dan cek uang.",
      labelDaftar: "Lima papan uang",
      kolom: 1,
      item: [
        {
          nama: "Nilai pecahan",
          singkat: "Satu, dua, sepuluh",
          uraian: "1 lembar Rp10.000 sama dengan 2 lembar Rp5.000 atau 10 keping Rp1.000.",
          contoh: "Nilainya yang dibandingkan.",
        },
        {
          nama: "Jumlah di tangan",
          singkat: "Tambahkan",
          uraian: "Rp5.000 + Rp2.000 + Rp1.000 + Rp500 = Rp8.500.",
          contoh: "Jumlahkan semua pecahan.",
        },
        {
          nama: "Jumlah harga",
          singkat: "Barang ditambah",
          uraian: "Buku Rp5.000, pensil Rp3.000, penghapus Rp1.000. Jumlah Rp9.000.",
          contoh: "Banyak dikali harga satuan.",
        },
        {
          nama: "Kembalian",
          singkat: "Kurangi",
          uraian: "Dibayar Rp10.000, harga Rp7.000, kembalian Rp3.000.",
          contoh: "Dibayar dikurangi harga.",
        },
        {
          nama: "Cukup",
          singkat: "Selisih",
          uraian: "Punya Rp4.000, harga Rp9.000, kurang Rp5.000.",
          contoh: "Bandingkan uang dan harga.",
        },
      ],
      kuis: [
        { pertanyaan: "Rp50.000 atau Rp20.000. Mana yang lebih besar?", alias: ["50000"] },
        { pertanyaan: "Lima keping Rp1.000.", alias: ["5000"] },
        { pertanyaan: "Tiga lembar Rp2.000.", alias: ["6000"] },
        { pertanyaan: "Rp10.000 ditambah Rp500.", alias: ["10500"] },
        { pertanyaan: "3 stiker, tiap stiker Rp1.000.", alias: ["3000"] },
        { pertanyaan: "2 susu, tiap susu Rp4.000.", alias: ["8000"] },
        { pertanyaan: "Harga Rp6.000, dibayar Rp20.000.", alias: ["14000"] },
        { pertanyaan: "Harga Rp8.000, dibayar Rp10.000.", alias: ["2000"] },
        { pertanyaan: "Punya Rp12.000, harga Rp12.000.", alias: ["cukup"] },
        { pertanyaan: "Punya Rp7.000, harga Rp10.000. Berapa kurangnya?", alias: ["3000"] },
        { pertanyaan: "4 dikali Rp2.000.", alias: ["8000"] },
        { pertanyaan: "Pasangkan hitungan dan hasilnya.", alias: ["2000", "10000", "6000"] },
        { pertanyaan: "Susun dari yang terkecil.", alias: ["500", "1500", "2500", "7000"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Punya Rp15.000. Beli Rp6.000 dan Rp4.000. Sisa?", alias: ["5000"] },
      ],
      voice: [["Papan ini merangkum pecahan, jumlah belanja, dan kembalian. Bandingkan dulu, lalu hitung."]],
    },
    {
      kode: "C",
      judul: "C. Warung Koin Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau yang tidak cocok.",
          contoh: "Salah boleh diulang. Koin tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_UANG),
      voice: [["Sepuluh soal pola. Pilih satu pos, lalu jawab."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pecahan, belanja, dan kembalian.",
      labelDaftar: "Lembar evaluasi uang",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Membandingkan pecahan, menjumlah harga, dan menghitung kembalian.",
          contoh: "Periksa lagi sebelum mengunci jawaban.",
        },
      ],
      kuis: [
        { pertanyaan: "Bayar Rp20.000, harga tas Rp11.000. Kembalian?", alias: ["9000"] },
        { pertanyaan: "6 keping Rp1.000 atau 1 lembar Rp5.000?", alias: ["6 keping"] },
        { pertanyaan: "Harga Rp7.000, dibayar Rp10.000. Kembalian?", alias: ["3000"] },
        { pertanyaan: "5 dikali Rp2.000.", alias: ["10000"] },
        { pertanyaan: "Pasangkan hitungan.", alias: ["8000", "1000", "3000"] },
        { pertanyaan: "Rp5.000 + Rp2.000 + Rp500.", alias: ["7500"] },
        { pertanyaan: "Susun dari yang terkecil.", alias: ["500", "2000", "7500", "10000"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Punya Rp6.000, harga Rp9.000. Cukup atau kurang?", alias: ["kurang"] },
        { pertanyaan: "Punya Rp10.000. Beli Rp2.000 dan Rp3.000. Sisa?", alias: ["5000"] },
      ],
      voice: [["Sepuluh soal. Bandingkan pecahan, jumlahkan harga, lalu hitung kembalian."]],
    },
  ],
};
