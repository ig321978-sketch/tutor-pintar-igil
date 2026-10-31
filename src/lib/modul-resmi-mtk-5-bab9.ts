import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB9 } from "@/lib/misi-mtk-5-bab9";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB9 = "Bab 9: Bilangan Cacah Sampai 1.000.000";

export const MODUL_MTK5_BAB9: ModulResmiPai = {
  id: "mtk-5-bab9",
  judul: JUDUL_MTK5_BAB9,
  pola: /^bab 9: bilangan cacah sampai 1\.000\.000$/,
  motivasi:
    "Saka, Leni, dan Farhan menghitung tiket kapal di Pasar Kapal Senja bersama burung hantu Igil. Mereka membaca bilangan sampai 1.000.000, membandingkan harga, lalu menyusun uang.",
  kunciJawaban: "B,B,D,A,B,B,B,A,C,A",
  sketsaKartu: [
    "Saka, Leni, dan Farhan di pasar kapal bersama Igil.",
    "Enam rak nilai tempat dan perbandingan tiket.",
    "Sepuluh pos di pasar.",
    "Poin penting dan lembar evaluasi bilangan sampai 1.000.000.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
1.000.000 dibaca...
A) seratus ribu
B) satu juta
C) sepuluh ribu
D) seribu`,
    `[Soal 2 - PG - Tipe: LOTS]
Pada 246.813, angka 4 menempati rak...
A) ratus ribuan
B) puluh ribuan
C) ribuan
D) ratusan`,
    `[Soal 3 - PG - Tipe: MOTS]
Nilai angka 6 pada 246.813 adalah...
A) 6
B) 60
C) 600
D) 6.000`,
    `[Soal 4 - PG - Tipe: MOTS]
508.020 dibaca...
A) lima ratus delapan ribu dua puluh
B) lima ratus delapan puluh ribu dua ratus
C) lima puluh delapan ribu dua puluh
D) lima ratus delapan ribu dua ratus`,
    `[Soal 5 - PG - Tipe: MOTS]
Tanda yang tepat untuk 612.400 ... 621.400 adalah...
A) >
B) <
C) =
D) tidak ada`,
    `[Soal 6 - PG - Tipe: MOTS]
Urutan dari yang terkecil untuk 430.000, 403.000, dan 340.000 adalah...
A) 430.000, 403.000, 340.000
B) 340.000, 403.000, 430.000
C) 403.000, 340.000, 430.000
D) 340.000, 430.000, 403.000`,
    `[Soal 7 - PG - Tipe: MOTS]
3 ratus ribuan + 5 puluh ribuan + 2 ratusan sama dengan...
A) 352.000
B) 350.200
C) 305.200
D) 35.200`,
    `[Soal 8 - PG - Tipe: MOTS]
Uraian yang tepat untuk 704.050 adalah...
A) 7 ratus ribuan, 4 ribuan, dan 5 puluhan
B) 7 puluh ribuan, 4 ratusan, dan 5 satuan
C) 7 ratus ribuan, 4 puluh ribuan, dan 5 ratusan
D) 7 ribuan, 4 ratusan, dan 5 puluhan`,
    `[Soal 9 - PG - Tipe: HOTS]
Bilangan yang paling besar adalah...
A) 890.001
B) 809.100
C) 898.001
D) 889.100`,
    `[Soal 10 - PG - Tipe: HOTS]
2 lembar seratus ribuan, 4 lembar sepuluh ribuan, dan 5 lembar seribuan berjumlah...
A) 245.000
B) 245
C) 2.450.000
D) 24.500`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Pasar Kapal Senja",
      pengantar: "Saka, Leni, Farhan, dan Igil membaca tiket sampai ratus ribuan.",
      labelDaftar: "Membaca dan nilai tempat",
      kolom: 1,
      item: [
        { nama: "Enam rak", singkat: "Dari satuan sampai ratus ribuan", uraian: "Bilangan cacah sampai 1.000.000 memakai enam rak: satuan, puluhan, ratusan, ribuan, puluh ribuan, dan ratus ribuan. Titik memisahkan kelompok ribuan.", contoh: "486.275 dibaca empat ratus delapan puluh enam ribu dua ratus tujuh puluh lima." },
        { nama: "Nilai angka", singkat: "Nama rak dan besarnya", uraian: "Nilai tempat adalah nama rak. Nilai angka adalah besar uang pada rak itu. Angka 4 pada 486.275 berdiri di rak ratus ribuan dan bernilai 400.000.", contoh: "1.000.000 dibaca satu juta." },
        { nama: "Cara membaca", singkat: "Kiri dulu, lalu ribu", uraian: "Baca tiga angka di kiri titik, sebut kata ribu, lalu baca tiga angka di kanan. Nol di tengah tidak selalu diucapkan.", contoh: "Kelompok 486 disebut dulu, baru kelompok 275." },
      ],
      kuis: [
        { pertanyaan: "Baca 250.014.", alias: ["250014", "dua ratus lima puluh ribu empat belas"] },
        { pertanyaan: "Tulis empat ratus enam ribu tiga puluh.", alias: ["406030", "406.030"] },
        { pertanyaan: "Nilai angka 3 pada 739.254.", alias: ["30000", "30.000"] },
        { pertanyaan: "Rak angka 9 pada 902.180.", alias: ["ratus ribuan"] },
        { pertanyaan: "Pasangkan nilai angka 4.", alias: ["40000", "4000", "400"] },
        { pertanyaan: "Urutan membaca.", alias: ["kiri", "ribu", "kanan"] },
      ],
      voice: [[
        "Saka, Leni, dan Farhan membaca tiket kapal bersama Igil.",
        "Enam rak dibaca dari kiri. Titik memisahkan ribuan.",
        "Satu juta ditulis 1.000.000.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Tiket dan Uang",
      pengantar: "Bandingkan dari rak kiri, lalu susun atau urai.",
      labelDaftar: "Banding, urut, susun, urai",
      kolom: 1,
      item: [
        { nama: "Banding dari kiri", singkat: "Rak yang beda menentukan", uraian: "Dua bilangan dibandingkan dari rak paling kiri. Jika rak itu sama, geser ke kanan sampai ada angka yang berbeda. Angka yang lebih besar memenangkan bilangannya.", contoh: "320.000 lebih besar daripada 280.000 karena 3 lebih besar daripada 2." },
        { nama: "Urutan", singkat: "Dari kecil atau dari besar", uraian: "Untuk mengurutkan, bandingkan rak kiri dulu pada setiap pasangan. Bilangan yang rak kirinya lebih kecil diletakkan lebih awal jika urutannya dari yang terkecil.", contoh: "Kalau semua rak sama, kedua bilangan sama besar." },
        { nama: "Susun", singkat: "Lembar uang dijumlahkan", uraian: "Komposisi menyusun bilangan dari lembar uang atau dari rak. Dua lembar seratus ribuan, tiga lembar sepuluh ribuan, dan empat lembar seribuan menjadi 234.000.", contoh: "100.000 dijumlahkan dua kali, 10.000 tiga kali, dan 1.000 empat kali." },
        { nama: "Urai", singkat: "Bilangan dipecah ke rak", uraian: "Dekomposisi mengurai bilangan ke raknya. 234.000 terdiri atas 2 ratus ribuan, 3 puluh ribuan, dan 4 ribuan.", contoh: "Rak yang nol tidak menambah jumlah." },
      ],
      kuis: [
        { pertanyaan: "Mana yang lebih besar, 681.240 atau 618.240.", alias: ["681240", "enam ratus delapan puluh satu ribu"] },
        { pertanyaan: "Bilangan tengah dari 205.000, 250.000, dan 200.500.", alias: ["205000"] },
        { pertanyaan: "Tanda 734.090 dan 734.900.", alias: ["lebih kecil"] },
        { pertanyaan: "Urutan 109.000, 190.000, dan 901.000.", alias: ["109000", "190000", "901000"] },
        { pertanyaan: "4 ratus ribuan, 2 ribuan, dan 5 satuan.", alias: ["402005"] },
        { pertanyaan: "5 lembar seratus ribuan dan 2 lembar sepuluh ribuan.", alias: ["520000"] },
        { pertanyaan: "Uraian 810.006.", alias: ["ratus ribuan", "satuan"] },
        { pertanyaan: "Tiga pernyataan banding dan susun.", alias: ["benar", "benar", "salah"] },
      ],
      voice: [[
        "Bandingkan tiket dari rak paling kiri.",
        "Uang disusun dengan menjumlahkan nilai lembarnya.",
        "Mengurai berarti memecah bilangan ke setiap rak.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Pasar",
      pengantar: "Sepuluh soal pola. Semuanya pilihan.",
      labelDaftar: "Sepuluh pos bilangan",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Ada deret, angka hilang, analogi rak, dan bilangan yang beda.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB9),
      voice: [[
        "Igil menjaga sepuluh pos di Pasar Kapal Senja.",
        "Setiap pos dijawab dengan pilihan.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal bilangan sampai 1.000.000.",
      labelDaftar: "Lembar evaluasi bilangan",
      kolom: 1,
      item: [
        {
          nama: "Uji bilangan",
          singkat: "Baca, banding, susun",
          uraian: "Bilangan sampai 1.000.000 dibaca dari enam rak. Perbandingan mulai dari rak kiri. Komposisi dan dekomposisi saling berkebalikan.",
          contoh: "Dua soal ditulis dan dua soal dijawab dengan suara.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis enam ratus delapan ribu tujuh puluh.", alias: ["608070"] },
        { pertanyaan: "Nilai angka 2 pada 120.450.", alias: ["20000"] },
        { pertanyaan: "Baca 390.008.", alias: ["390008", "tiga ratus sembilan puluh ribu delapan"] },
        { pertanyaan: "Bilangan paling besar.", alias: ["576890"] },
        { pertanyaan: "Pasangkan susunan.", alias: ["304000", "30400", "3004"] },
        { pertanyaan: "Jumlah lembar uang.", alias: ["406200"] },
        { pertanyaan: "Tanda 880.010 dan 880.100.", alias: ["lebih kecil"] },
        { pertanyaan: "Urutan dari yang terbesar.", alias: ["210000", "201000", "120000"] },
        { pertanyaan: "Nilai angka 5 pada 75.000.", alias: ["5000", "lima ribu"] },
        { pertanyaan: "Komposisi 900.045.", alias: ["ratus ribuan", "satuan"] },
      ],
      voice: [[
        "Sepuluh soal bilangan besar. Baca pelan, lalu cek rak kirinya.",
        "Titik memisahkan kelompok ribuan.",
      ]],
    },
  ],
};
