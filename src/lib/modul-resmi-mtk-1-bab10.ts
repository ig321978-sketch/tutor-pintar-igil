import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB10, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB10 = "Bab 10: Penjumlahan dan Pengurangan sampai 100";

export const MODUL_MTK1_BAB10: ModulResmiPai = {
  id: "mtk-1-bab10",
  judul: JUDUL_MTK1_BAB10,
  pola: /penjumlahan\s+dan\s+pengurangan\s+sampai\s+100\b|toko kelontong kolu|ekspedisi kereta barang/,
  motivasi:
    "Rara, Bimo, dan Igil belajar menjumlah dan mengurangi sampai 100 di toko Igil, dari tanpa menyimpan sampai soal cerita.",
  kunciJawaban: "A,B,A,C,A,B,C,A,B,C",
  sketsaKartu: [
    "Rara dan Bimo menghitung kelereng di toko kelontong bersama koala Igil.",
    "Rumah puluhan dan satuan untuk menjumlah, mengurangi, menyimpan, dan meminjam.",
    "Igil menjadi kepala stasiun kereta barang dengan gerbong puluhan dan satuan.",
    "Poin penting dan lembar evaluasi penjumlahan dan pengurangan sampai 100.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
43 + 25 = ...
A) 68
B) 78
C) 58
D) 18`,
    `[Soal 2 - PG - Tipe: HOTS]
47 + 28 = ...
A) 65
B) 75
C) 85
D) 715`,
    `[Soal 3 - PG - Tipe: LOTS]
68 − 34 = ...
A) 34
B) 44
C) 24
D) 32`,
    `[Soal 4 - PG - Tipe: HOTS]
52 − 27 = ...
A) 35
B) 15
C) 25
D) 27`,
    `[Soal 5 - PG - Tipe: HOTS]
56 + 27 perlu menyimpan. Pernyataan itu...
A) Benar
B) Salah
C) Tidak bisa dihitung
D) Hasilnya 73`,
    `[Soal 6 - PG - Tipe: HOTS]
45 − 32 perlu meminjam. Pernyataan itu...
A) Benar
B) Salah
C) Hasilnya 23
D) Hasilnya 13`,
    `[Soal 7 - PG - Tipe: HOTS]
Toko punya 38 jeruk. Datang kiriman 45 jeruk. Jeruk sekarang...
A) 73
B) 13
C) 83
D) 93`,
    `[Soal 8 - PG - Tipe: HOTS]
Ada 72 apel. Sebanyak 29 apel terjual. Sisanya...
A) 43
B) 53
C) 41
D) 33`,
    `[Soal 9 - PG - Tipe: HOTS]
Kata "terjual" artinya...
A) Ditambah
B) Dikurangi
C) Sama dengan
D) Disimpan`,
    `[Soal 10 - PG - Tipe: HOTS]
Pagi ada 65 kue. Siang terjual 28. Sore datang 19. Kue di akhir hari...
A) 93
B) 47
C) 56
D) 65`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Toko Kelontong Igil",
      pengantar:
        "Rara, Bimo, dan Igil belajar menjumlah dan mengurangi di toko Igil. Satuan dikerjakan dulu, lalu puluhan.",
      labelDaftar: "Lima cara hitung sampai 100",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan dan dengan menyimpan",
          singkat: "Satuan dulu",
          uraian:
            "23 + 14 = 37 karena 3 + 4 = 7 dan 2 + 1 = 3. Kalau satuan lebih dari 9, tulis satuannya dan simpan 1 ke puluhan. 28 + 47 = 75.",
          contoh: "8 + 7 = 15, tulis 5, simpan 1.",
        },
        {
          nama: "Tanpa meminjam, meminjam, dan soal cerita",
          singkat: "Bawah lebih besar, pinjam",
          uraian:
            "46 − 23 = 23 tanpa meminjam. 52 − 28 perlu meminjam: 12 − 8 = 4 dan 4 − 2 = 2, hasilnya 24. Kata datang artinya tambah. Kata terjual artinya kurang.",
          contoh: "38 + 45 = 83. 72 − 29 = 43.",
        },
      ],
      kuis: [
        { pertanyaan: "Pada 42 + 35, berapa 2 + 5?", alias: ["7", "tujuh"] },
        { pertanyaan: "Hitung 51 + 26.", alias: ["77"] },
        { pertanyaan: "Pada 36 + 45, simpan berapa ke puluhan?", alias: ["1", "satu"] },
        { pertanyaan: "Hitung 29 + 36 dan tulis simpanannya.", alias: ["65", "1"] },
        { pertanyaan: "Pada 78 − 35, berapa 8 − 5?", alias: ["3", "tiga"] },
        { pertanyaan: "Hitung 95 − 42.", alias: ["53"] },
        { pertanyaan: "Setelah 6 dipinjam satu, puluhannya jadi berapa?", alias: ["5", "lima"] },
        { pertanyaan: "Hitung 71 − 38.", alias: ["33"] },
        { pertanyaan: "Kata terjual artinya ditambah atau dikurangi?", alias: ["dikurangi", "kurang"] },
        { pertanyaan: "Tuliskan 56 − 18 dan hasilnya.", alias: ["38"] },
        { pertanyaan: "Berapa hasil 47 + 38?", alias: ["85"] },
        { pertanyaan: "Pasangkan 25 + 13, 62 − 38, 19 + 19, dan 90 − 45.", alias: ["38", "24", "45"] },
        { pertanyaan: "Susun 34 + 18 = 52.", alias: ["34 + 18 = 52"] },
        { pertanyaan: "Periksa tiga pernyataan tentang menyimpan dan meminjam.", alias: ["benar", "salah"] },
        { pertanyaan: "Kotak mana yang hasilnya berbeda dari 65?", alias: ["75", "38 + 37"] },
      ],
      voice: [
        [
          "Kita jumlahkan satuan dulu, lalu puluhan. Kalau satuan muat, tidak perlu menyimpan.",
          "Kalau satuan lebih dari sembilan, tulis satuannya dan simpan satu ke puluhan.",
          "Kalau angka bawah lebih kecil, kurangi langsung. Kalau lebih besar, pinjam satu puluhan.",
          "Soal cerita: cari angka, cari kata kunci, tulis kalimatnya, lalu hitung.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Menjumlah, Mengurangi, dan Soal Cerita",
      pengantar:
        "Puluhan dan satuan punya aturan tetap. Lebih dari sembilan, simpan. Bawah lebih besar, pinjam.",
      labelDaftar: "Lima papan cara menghitung",
      kolom: 1,
      item: [
        {
          nama: "Menjumlah",
          singkat: "Simpan kalau lebih dari 9",
          uraian: "43 + 25 = 68 tanpa menyimpan. 47 + 28 = 75 karena 7 + 8 = 15.",
          contoh: "58 + 27 = 85.",
        },
        {
          nama: "Mengurangi dan cerita",
          singkat: "Pinjam kalau bawah lebih besar",
          uraian:
            "68 − 34 = 34. 52 − 27 = 25 setelah meminjam. Kata datang lagi artinya tambah. Kata terjual atau diberikan artinya kurang.",
          contoh: "65 − 28 = 37.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa hasil 61 + 27?", alias: ["88", "delapan puluh delapan"] },
        { pertanyaan: "Hitung 54 + 32.", alias: ["86"] },
        { pertanyaan: "Pada 39 + 46, apa yang disimpan?", alias: ["1", "satu"] },
        { pertanyaan: "Hitung 58 + 27.", alias: ["85"] },
        { pertanyaan: "Berapa hasil 87 − 43?", alias: ["44", "empat puluh empat"] },
        { pertanyaan: "Hitung 99 − 56.", alias: ["43"] },
        { pertanyaan: "Setelah 8 dipinjam, puluhannya jadi berapa?", alias: ["7", "tujuh"] },
        { pertanyaan: "Hitung 63 − 28.", alias: ["35"] },
        { pertanyaan: "Kata diberikan artinya tambah atau kurang?", alias: ["kurang"] },
        { pertanyaan: "Tuliskan 65 − 28 dan hasilnya.", alias: ["37"] },
        { pertanyaan: "Soal mana yang perlu meminjam?", alias: ["62 - 47"] },
        { pertanyaan: "Pasangkan soal dengan tekniknya.", alias: ["menyimpan", "meminjam"] },
        { pertanyaan: "Urutkan hasil 34 + 41, 90 − 12, 25 + 25, dan 71 − 60.", alias: ["11", "50", "75", "78"] },
        { pertanyaan: "Periksa tiga pernyataan hitungan.", alias: ["salah", "benar"] },
        { pertanyaan: "Angka berapa yang hilang supaya ditambah 39 sama dengan 87?", alias: ["48"] },
      ],
      voice: [
        [
          "Satuan dulu. Kalau jumlahnya sembilan atau kurang, tidak perlu menyimpan.",
          "Lebih dari sembilan, pecah jadi puluhan dan satuan. Simpanan ikut dihitung.",
          "Bawah lebih kecil, boleh langsung kurang. Bawah lebih besar, pinjam dulu.",
          "Soal cerita diterjemahkan dulu: angka, kata kunci, kalimat, baru hitung.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ekspedisi Kereta Barang Igil",
      pengantar:
        "Siswa menjadi kepala stasiun. Menggabung gerbong artinya menambah. Melepas gerbong artinya mengurangi.",
      labelDaftar: "Sepuluh pos stasiun",
      kolom: 1,
      item: [
        {
          nama: "Gerbong puluhan dan satuan",
          singkat: "Penuh, pindahkan satu",
          uraian:
            "Muatan digabung per rumah. Kalau satuan lebih dari sembilan, satu kotak pindah ke gerbong depan. Kalau satuan kurang untuk diturunkan, pinjam satu dari gerbong depan.",
          contoh: "43 + 35 = 78. 76 − 49 = 27.",
        },
        {
          nama: "Rel ekspres",
          singkat: "Sepuluh roda gigi",
          uraian:
            "Jawaban benar pertama mendapat tiga roda gigi. Lampu sorot membantu, tetapi mengurangi roda gigi. Sepuluh roda gigi membuka rel cepat.",
          contoh: "82 − 47 = 35.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB10),
      voice: [
        [
          "Kamu kepala stasiun. Gerbong depan untuk puluhan, gerbong belakang untuk satuan.",
          "Gerbong digabung, muatannya ditambah. Gerbong dilepas, muatannya dikurangi.",
          "Satuan lebih dari sembilan, pindahkan satu ke depan. Satuan kurang, pinjam dari depan.",
          "Sepuluh pos selesai, sepuluh roda gigi terkumpul, rel cepat terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal menjumlah dan mengurangi sampai seratus, termasuk soal cerita.",
      labelDaftar: "Lembar evaluasi hitung sampai 100",
      kolom: 1,
      item: [
        {
          nama: "Jejak hitungan",
          singkat: "Tulis caranya",
          uraian: "63 + 25 = 88. 56 + 37 = 93 karena ada simpanan. 71 − 46 = 25 setelah meminjam.",
          contoh: "72 − 38 = 34.",
        },
        {
          nama: "Dua langkah",
          singkat: "Jual dulu, kiriman kemudian",
          uraian: "65 kue, terjual 28, tinggal 37. Datang 19, menjadi 56. 56 lebih sedikit dari 65.",
          contoh: "Dimakan artinya kurang.",
        },
      ],
      kuis: [
        { pertanyaan: "Hitung 63 + 25 dan tunjukkan caranya.", alias: ["88"] },
        { pertanyaan: "Berapa hasil benar 56 + 37?", alias: ["93"] },
        { pertanyaan: "Bacalah angka 74.", alias: ["tujuh puluh empat"] },
        { pertanyaan: "Apakah 72 − 38 = 46 benar?", alias: ["34", "salah"] },
        { pertanyaan: "Pasangkan soal dengan tekniknya.", alias: ["menyimpan", "meminjam"] },
        { pertanyaan: "Hitung 71 − 46 dengan jejak meminjam.", alias: ["25"] },
        { pertanyaan: "Angka puluhan berapa yang hilang pada kotak 8 + 34 = 92?", alias: ["58"] },
        { pertanyaan: "Urutkan hasil 45 + 47, 90 − 28, 33 + 39, dan 71 − 55.", alias: ["16", "62", "72", "92"] },
        { pertanyaan: "Kata dimakan artinya tambah atau kurang?", alias: ["kurang", "dimakan"] },
        { pertanyaan: "65 kue, terjual 28, lalu datang 19. Berapa di akhir hari?", alias: ["56", "37"] },
      ],
      voice: [
        [
          "Satuan dulu, puluhan kemudian.",
          "Lebih dari sembilan, simpan satu ke atas. Simpanan itu ikut dihitung.",
          "Bawah lebih besar, pinjam dulu. Puluhan yang dipinjam berkurang satu.",
          "Soal cerita: cari angka, cari kata kunci, tulis, lalu hitung.",
        ],
      ],
    },
  ],
};
