import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB11, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB11 = "Bab 11: Pola Bilangan dan Pola Gambar";

export const MODUL_MTK1_BAB11: ModulResmiPai = {
  id: "mtk-1-bab11",
  judul: JUDUL_MTK1_BAB11,
  pola: /pola\s+bilangan\s+dan\s+pola\s+gambar\b|pabrik manik biru|burung beo biru/,
  motivasi:
    "Rara, Bimo, dan Rara belajar pola berulang bersama burung hantu Igil, dari pagar bendera sampai membuat pola sendiri.",
  kunciJawaban: "B,C,B,B,C,C,B,C,A,B",
  sketsaKartu: [
    "Rara, Bimo, dan Rara menemukan pola bendera di pagar sekolah bersama burung hantu Igil.",
    "Papan pengulangan gambar dan dua jenis pola angka.",
    "Igil menjadi perancang di pabrik manik.",
    "Poin penting dan lembar evaluasi pola gambar dan pola bilangan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Pola merah, kuning, merah, kuning. Berikutnya...
A) Hijau
B) Merah
C) Igil
D) Bebas`,
    `[Soal 2 - PG - Tipe: LOTS]
Berapa panjang pengulangan segitiga, kotak, kotak?
A) 2
B) 4
C) 3
D) 1`,
    `[Soal 3 - PG - Tipe: LOTS]
5, 10, 15, 20. Berikutnya...
A) 30
B) 25
C) 22
D) 15`,
    `[Soal 4 - PG - Tipe: HOTS]
30, 27, 24. Angka berikutnya...
A) 22
B) 21
C) 20
D) 18`,
    `[Soal 5 - PG - Tipe: LOTS]
Ungu, ungu, oranye berulang. Panjang pengulangannya...
A) 2
B) 6
C) 3
D) 4`,
    `[Soal 6 - PG - Tipe: HOTS]
8, 16, 24, 32 termasuk pola...
A) Berulang
B) Langkah tetap turun
C) Langkah tetap naik
D) Bebas`,
    `[Soal 7 - PG - Tipe: HOTS]
60, 55, 50, kotak, 40, 35. Angka yang hilang...
A) 48
B) 45
C) 47
D) 44`,
    `[Soal 8 - PG - Tipe: HOTS]
Pola biru, hijau. Warna manik ke-7...
A) Hijau
B) Merah
C) Igil
D) Bebas`,
    `[Soal 9 - PG - Tipe: HOTS]
Pola merah, kuning, hijau. Setelah hijau, warnanya...
A) Merah
B) Kuning
C) Hijau
D) Igil`,
    `[Soal 10 - PG - Tipe: HOTS]
Pola segitiga, lingkaran, lingkaran. Bentuk pada posisi ke-11...
A) Segitiga
B) Lingkaran
C) Bebas
D) Tidak bisa ditentukan`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Pagar Sekolah Igil",
      pengantar:
        "Rara, Bimo, dan Rara mencari bagian yang berulang. Kalau pengulangannya ketemu, bagian berikutnya bisa ditebak.",
      labelDaftar: "Lima adegan pola",
      kolom: 1,
      item: [
        {
          nama: "Pola berulang",
          singkat: "Bagian yang kembali",
          uraian: "Merah, kuning, merah, kuning. Satu pengulangan adalah merah lalu kuning. Berikutnya mulai lagi dari merah.",
          contoh: "Bola, basket, bola, basket. Berikutnya basket.",
        },
        {
          nama: "Panjang pengulangan",
          singkat: "Hitung isinya",
          uraian: "Pola biru, biru, hijau punya tiga manik dalam satu pengulangan. Manik ke-13 sama dengan manik pertama.",
          contoh: "Segitiga, kotak, kotak. Panjangnya tiga.",
        },
        {
          nama: "Melanjutkan gambar",
          singkat: "Ulangi dari awal",
          uraian: "Bintang, hati, hati diulang terus. Setelah bintang terakhir, berikutnya hati lalu hati.",
          contoh: "Ikan besar, ikan kecil, ikan kecil.",
        },
        {
          nama: "Pola bilangan",
          singkat: "Naik, turun, atau kembali",
          uraian: "2, 4, 6, 8 naik 2. 1, 2, 3, 1, 2, 3 kembali ke awal. 30, 27, 24 turun 3.",
          contoh: "5, 10, 15, 20, berikutnya 25.",
        },
        {
          nama: "Pola buatan sendiri",
          singkat: "Sekali pilih, diulang",
          uraian: "Pilih tiga bentuk, tentukan urutannya, lalu ulangi tiga kali dengan urutan yang sama.",
          contoh: "Bintang, hati, bunga diulang terus.",
        },
      ],
      kuis: [
        { pertanyaan: "Setelah bola, basket, bola, basket, bola, apa berikutnya?", alias: ["basket"] },
        { pertanyaan: "Gambar bentuk berikutnya setelah bunga matahari, tulip.", alias: ["tulip"] },
        { pertanyaan: "Berapa bentuk dalam pengulangan segitiga, kotak, kotak?", alias: ["3", "tiga"] },
        { pertanyaan: "Tunjukkan satu pengulangan apel, pisang, anggur.", alias: ["apel", "pisang", "anggur"] },
        { pertanyaan: "Setelah ikan kecil terakhir pada pola ikan besar, ikan kecil, ikan kecil, apa berikutnya?", alias: ["ikan besar", "hiu"] },
        { pertanyaan: "Gambar tiga bentuk berikutnya: segitiga, kotak, kotak.", alias: ["segitiga kotak kotak"] },
        { pertanyaan: "5, 10, 15, 20. Angka berikutnya?", alias: ["25", "dua puluh lima"] },
        { pertanyaan: "30, 27, 24. Dua angka berikutnya?", alias: ["21", "18"] },
        { pertanyaan: "Setelah bintang pada pola bintang, hati, bunga, apa berikutnya?", alias: ["hati"] },
        { pertanyaan: "Buat pola tiga bentuk dan ulangi tiga kali.", alias: ["ulang"] },
        { pertanyaan: "Setelah merah, hijau, merah, hijau, merah, apa berikutnya?", alias: ["hijau"] },
        { pertanyaan: "Pasangkan panjang pengulangan.", alias: ["2", "3", "4"] },
        { pertanyaan: "Susun kotak, lingkaran, kotak, lingkaran.", alias: ["kotak lingkaran"] },
        { pertanyaan: "Periksa tiga pernyataan pola.", alias: ["benar", "salah"] },
        { pertanyaan: "Deret mana yang tidak berpola?", alias: ["hijau hijau merah kuning"] },
      ],
      voice: [
        [
          "Pola adalah bagian yang berulang dengan cara yang sama.",
          "Cari satu pengulangan dulu, lalu ulangi dari awal.",
          "Pola angka bisa naik, turun, atau kembali ke awal.",
          "Pola buatan sendiri boleh bebas, asal urutannya tidak berubah.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Papan Pola Gambar dan Angka",
      pengantar: "Panjang pengulangan, lanjutan gambar, dan dua jenis pola angka.",
      labelDaftar: "Lima papan pola",
      kolom: 1,
      item: [
        {
          nama: "Apa itu pola",
          singkat: "Mulai lagi dari awal",
          uraian: "Anjing, kucing berulang. Setelah kucing, berikutnya anjing.",
          contoh: "Permen lolipop, permen, lalu lolipop lagi.",
        },
        {
          nama: "Panjang pengulangan",
          singkat: "Dua atau tiga",
          uraian: "Segitiga, kotak, kotak panjangnya tiga. Apel, pisang panjangnya dua, jadi bentuk ke-5 adalah apel.",
          contoh: "Bola, bola, basket.",
        },
        {
          nama: "Melanjutkan gambar",
          singkat: "Dua langkah",
          uraian: "Bunga, matahari, matahari. Setelah bunga terakhir, berikutnya dua matahari.",
          contoh: "Bentuk ke-10 pada segitiga, lingkaran, lingkaran adalah segitiga.",
        },
        {
          nama: "Pola bilangan",
          singkat: "Naik, turun, berulang",
          uraian: "3, 6, 9, 12 berikutnya 15. 40, 35, 30, 25 berikutnya 20. 2, 4, 6 berulang, setelah 2 berikutnya 4.",
          contoh: "10, 20, 30, 40 berikutnya 50.",
        },
        {
          nama: "Membuat pola",
          singkat: "Jangan berubah",
          uraian: "Pilih isi, tentukan urutan, ulangi terus.",
          contoh: "Mobil, mobil, pesawat. Setelah mobil terakhir, berikutnya mobil.",
        },
      ],
      kuis: [
        { pertanyaan: "Setelah lolipop, permen, lolipop, permen, lolipop, apa berikutnya?", alias: ["lolipop"] },
        { pertanyaan: "Gambar bentuk berikutnya setelah matahari, bulan.", alias: ["bulan"] },
        { pertanyaan: "Berapa bentuk dalam pengulangan merah, kuning, biru?", alias: ["3", "tiga"] },
        { pertanyaan: "Tarik garis pemisah bola, bola, basket.", alias: ["bola bola basket"] },
        { pertanyaan: "Setelah kura-kura pada pola kura, kelinci, kelinci, apa berikutnya?", alias: ["kelinci"] },
        { pertanyaan: "Gambar empat bentuk berikutnya: kotak, lingkaran, lingkaran.", alias: ["kotak lingkaran lingkaran kotak"] },
        { pertanyaan: "10, 20, 30, 40. Angka berikutnya?", alias: ["50", "lima puluh"] },
        { pertanyaan: "100, 90, 80. Dua angka berikutnya?", alias: ["70", "60"] },
        { pertanyaan: "Setelah mobil pada pola mobil, mobil, pesawat, apa berikutnya?", alias: ["mobil"] },
        { pertanyaan: "Buat pola dua bentuk dan ulangi empat kali.", alias: ["ulang"] },
        { pertanyaan: "Ungu, ungu, oranye panjangnya berapa?", alias: ["3"] },
        { pertanyaan: "Pasangkan jenis pola angka.", alias: ["naik", "turun", "berulang"] },
        { pertanyaan: "Susun 4, 8, 12, 16, 20.", alias: ["4 8 12 16 20"] },
        { pertanyaan: "Periksa tiga pernyataan pola.", alias: ["benar", "salah"] },
        { pertanyaan: "60, 55, 50, kotak, 40. Angka yang hilang?", alias: ["45"] },
      ],
      voice: [
        [
          "Pola adalah bagian yang berulang. Sudah sampai ujung, mulai lagi dari awal.",
          "Hitung berapa benda dalam satu putaran.",
          "Pola angka: lihat naik berapa, turun berapa, atau kembali ke awal.",
          "Pola buatan sendiri tidak boleh berubah di tengah.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pabrik Manik Igil",
      pengantar: "Siswa menjadi perancang manik. Setiap pesanan punya pola yang harus ditemukan lalu dilanjutkan.",
      labelDaftar: "Sepuluh pesanan pabrik",
      kolom: 1,
      item: [
        {
          nama: "Gelang pesanan",
          singkat: "Cari pengulangannya",
          uraian: "Igil hijau bergantian. Merah merah kuning berulang tiga. Angka manik naik atau turun dengan langkah tetap.",
          contoh: "Setelah hijau pada merah kuning hijau, berikutnya merah.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB11),
      voice: [
        [
          "Kalian menjadi perancang manik. Temukan pengulangannya, lalu lanjutkan dengan warna yang tepat.",
          "Kalau angkanya naik atau turun dengan jumlah yang sama, itulah langkah tetap.",
          "Sepuluh pesanan selesai, sepuluh manik biru terkumpul, pabrik otomatis terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pola gambar dan pola bilangan.",
      labelDaftar: "Lembar evaluasi pola",
      kolom: 1,
      item: [
        {
          nama: "Melanjutkan dan memeriksa",
          singkat: "Posisi dalam putaran",
          uraian: "Kepik, lebah, lebah. Posisi ke-11 pada segitiga, lingkaran, lingkaran adalah lingkaran. Warna ke-6 pada merah, hijau adalah hijau.",
          contoh: "7, 14, 21 berikutnya 28.",
        },
        {
          nama: "Gelang putus",
          singkat: "Tiga langkah",
          uraian: "Hijau, merah, merah. Manik ke-10 hijau. Manik ke-11 dan ke-12 merah. Dalam 12 manik ada 4 pengulangan penuh.",
          contoh: "30, 24, 18, 12, 6 turun 6.",
        },
      ],
      kuis: [
        { pertanyaan: "Gambar tiga bentuk berikutnya: kepik, lebah, lebah.", alias: ["lebah lebah kepik"] },
        { pertanyaan: "Bentuk apa pada posisi ke-11 pola segitiga, lingkaran, lingkaran?", alias: ["lingkaran"] },
        { pertanyaan: "Setelah oranye, ungu, oranye, ungu, oranye, warna apa berikutnya?", alias: ["ungu"] },
        { pertanyaan: "Apakah warna ke-6 pada merah, hijau adalah hijau?", alias: ["benar", "hijau"] },
        { pertanyaan: "Pasangkan jenis pola angka.", alias: ["naik", "turun", "berulang"] },
        { pertanyaan: "Buat pola tiga bentuk dan ulangi tiga kali.", alias: ["ulang"] },
        { pertanyaan: "7, 14, 21, kotak, 35. Angka yang hilang?", alias: ["28"] },
        { pertanyaan: "Susun supaya turun 6: 30, 24, 18, 12, 6.", alias: ["30 24 18 12 6"] },
        { pertanyaan: "3, 6, 9, 12. Sebutkan angka berikutnya dan alasannya.", alias: ["15", "lima belas"] },
        { pertanyaan: "Pola hijau, merah, merah. Manik ke-10, dua manik berikutnya, dan jumlah pengulangan dalam 12 manik?", alias: ["hijau", "merah", "4"] },
      ],
      voice: [
        [
          "Ada sepuluh soal. Cari pengulangannya dulu, lalu ulangi dari awal.",
          "Untuk pola angka, lihat naik berapa atau turun berapa.",
          "Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
