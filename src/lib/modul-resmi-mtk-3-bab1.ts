import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_BAB1 } from "@/lib/misi-mtk-3-bab1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_BAB1 = "Bab 1: Bilangan sampai 10.000";

export const MODUL_MTK3_BAB1: ModulResmiPai = {
  id: "mtk-3-bab1",
  judul: JUDUL_MTK3_BAB1,
  pola: /bilangan sampai 10\.?000/,
  motivasi:
    "Aldi, Naya, dan Fikri belajar membaca, membandingkan, dan mengurutkan bilangan sampai 10.000 bersama burung hantu Igil.",
  kunciJawaban: "A,B,C,C,A,C,C,A,D,A",
  sketsaKartu: [
    "Aldi, Naya, dan Fikri membaca 4.725 bersama Igil.",
    "Empat rak angka: ribuan, ratusan, puluhan, dan satuan.",
    "Igil menjadi juri di papan skor kejuaraan.",
    "Poin penting dan lembar evaluasi bilangan sampai 10.000.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Bagaimana membaca 5.037?
A) Lima ribu tiga puluh tujuh
B) Lima ribu tiga ratus tujuh
C) Lima ribu tujuh
D) Lima puluh ribu tiga puluh tujuh`,
    `[Soal 2 - PG - Tipe: HOTS]
Pada bilangan 3.764, angka 6 bernilai...
A) 6
B) 60
C) 600
D) 6.000`,
    `[Soal 3 - PG - Tipe: HOTS]
Deret 4.200 – 4.400 – 4.600 – ⬜. Angka berikutnya...
A) 4.700
B) 4.750
C) 4.800
D) 4.900`,
    `[Soal 4 - PG - Tipe: MOTS]
Mana skor terbesar: 5.009, 5.090, atau 5.900?
A) 5.009
B) 5.090
C) 5.900
D) Semua sama`,
    `[Soal 5 - PG - Tipe: MOTS]
Bagaimana membaca 6.305?
A) Enam ribu tiga ratus lima
B) Enam ribu tiga puluh lima
C) Enam ribu tiga ratus lima puluh
D) Enam puluh tiga ribu lima`,
    `[Soal 6 - PG - Tipe: MOTS]
Pada bilangan 8.247, nilai angka 2 adalah...
A) 2
B) 20
C) 200
D) 2.000`,
    `[Soal 7 - PG - Tipe: HOTS]
Deret naik 250: 1.000 – 1.250 – 1.500 – ⬜. Berikutnya...
A) 1.600
B) 1.700
C) 1.750
D) 2.000`,
    `[Soal 8 - PG - Tipe: HOTS]
Mana yang lebih besar, 8.000 atau 7.999?
A) 8.000
B) 7.999
C) Keduanya sama
D) Tidak bisa ditentukan`,
    `[Soal 9 - PG - Tipe: MOTS]
Pada papan 3.⬜56, petunjuknya rak kosong. Angka yang hilang...
A) 2
B) 3
C) 4
D) 0`,
    `[Soal 10 - PG - Tipe: HOTS]
Skor Biru 3.480, Merah 3.408, Hijau 3.840, Kuning 3.084. Juara pertama adalah...
A) Hijau
B) Biru
C) Merah
D) Kuning`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar:
        "Aldi, Naya, Fikri, dan burung hantu Igil membaca, membandingkan, lalu mengurutkan bilangan sampai 10.000. Infografis tiap sub-bab ada di dalam materi.",
      labelDaftar: "Lima sub-bab, infografis di dalam materi",
      kolom: 1,
      item: [
        {
          nama: "Membaca bilangan ribuan",
          singkat: "Empat angka",
          uraian:
            "Bilangan 4.725 dibaca empat ribu tujuh ratus dua puluh lima. 4 ribuan, 7 ratusan, 2 puluhan, 5 satuan. Titik pada 4.725 adalah pemisah ribuan, bukan desimal. 4.725 dan 4725 adalah bilangan yang sama.",
          contoh: "Baca dari kiri ke kanan sesuai nama rumahnya.",
        },
        {
          nama: "Nilai tempat",
          singkat: "Posisi mengubah nilai",
          uraian:
            "Pada 6.482, angka 6 bernilai 6.000, angka 4 bernilai 400, angka 8 bernilai 80, dan angka 2 bernilai 2. 6.482 = 6.000 + 400 + 80 + 2. Pindah satu rumah ke kiri, nilainya dikali 10.",
          contoh: "Rumah kiri selalu lebih besar.",
        },
        {
          nama: "Membandingkan",
          singkat: "Dari kiri",
          uraian:
            "3.842 lebih besar dari 3.291 karena ribuan sama dan ratusan 8 lebih besar dari 2. 8.000 lebih besar dari 7.999 karena ribuannya sudah berbeda.",
          contoh: "Beda di kiri, berhenti di situ.",
        },
        {
          nama: "Mengurutkan",
          singkat: "Kelompok ribuan",
          uraian:
            "Skor 6.540, 2.180, 6.290, 9.050, dan 2.990 diurutkan 2.180, 2.990, 6.290, 6.540, 9.050. Kelompokkan ribuan dulu, lalu rapikan di dalam kelompok.",
          contoh: "Kecil ke besar atau besar ke kecil.",
        },
        {
          nama: "Bilangan dengan angka nol",
          singkat: "Rumah kosong",
          uraian:
            "6.084 dibaca enam ribu delapan puluh empat. Angka nol menandai rumah kosong: tidak disebut, tetapi wajib ditulis. Tanpa nol, 6.084 berubah menjadi 684.",
          contoh: "Nol tidak diucapkan, tetapi wajib ditulis.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca bilangan 3.568 dengan lengkap.", alias: ["tiga ribu lima ratus enam puluh delapan", "3568"] },
        { pertanyaan: "Tulis enam ribu dua ratus sembilan puluh tiga.", alias: ["6293"] },
        { pertanyaan: "Berapa nilai angka 3 pada 5.374?", alias: ["tiga ratus", "300"] },
        { pertanyaan: "Tulis pemecahan 7.916.", alias: ["7000 900 10 6"] },
        { pertanyaan: "Mana yang lebih besar, 5.671 atau 5.619?", alias: ["5671", "lima ribu enam ratus tujuh puluh satu"] },
        { pertanyaan: "Tulis simbol antara 4.086 dan 4.806.", alias: ["lebih kecil", "kurang dari"] },
        { pertanyaan: "Sebutkan yang paling kecil: 7.300, 3.700, 7.030.", alias: ["3700", "tiga ribu tujuh ratus"] },
        { pertanyaan: "Urutkan 5.482, 1.905, 8.040, 3.276 dari kecil ke besar.", alias: ["1905 3276 5482 8040"] },
        { pertanyaan: "Baca 5.402 dan sebutkan rumah yang kosong.", alias: ["5402", "puluhan"] },
        { pertanyaan: "Tulis tujuh ribu sembilan ratus lima dan sebutkan rumah yang kosong.", alias: ["7905", "puluhan"] },
        { pertanyaan: "Berapa nilai angka 4 pada 8.463?", alias: ["400"] },
        { pertanyaan: "Pasangkan 3.507, 9.270, dan 6.003 dengan bacaannya.", alias: ["tiga ribu lima ratus tujuh", "sembilan ribu dua ratus tujuh puluh", "enam ribu tiga"] },
        { pertanyaan: "Susun 7.040, 4.700, 7.400, 4.070 dari terkecil.", alias: ["4070", "4700", "7040", "7400"] },
        { pertanyaan: "Periksa tiga pernyataan tentang bilangan ribuan.", alias: ["benar", "salah"] },
        { pertanyaan: "Deret 2.500 – 3.000 – 3.500 – ⬜ – 4.500. Angka yang hilang?", alias: ["4000"] },
      ],
      voice: [
        [
          "Sampai sekarang kalian sudah bisa menghitung sampai 999. Sekarang kita naik sampai 10.000.",
          "Bilangan ribuan punya empat angka. Angka paling kiri menunjukkan ribuan.",
          "Nilai tempat tergantung posisi. Untuk membandingkan dan mengurutkan, periksa dari kiri.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar:
        "Papan infografis sudah masuk ke tiap sub-bab materi. Latihan ini menguji bacaan, nilai tempat, perbandingan, urutan, dan angka nol.",
      labelDaftar: "Latihan mengikuti lima sub-bab",
      kolom: 1,
      item: [
        {
          nama: "Membaca dan menulis",
          singkat: "Nol di tengah diam",
          uraian:
            "6.084 dibaca enam ribu delapan puluh empat. Ratusan 0 tidak disebut. Rumah ribuan dikali 1.000, ratusan dikali 100, puluhan dikali 10, satuan dikali 1.",
          contoh: "Nol di tengah, tidak usah disebut.",
        },
        {
          nama: "Nilai tempat",
          singkat: "Kali sepuluh",
          uraian: "8.359 = 8.000 + 300 + 50 + 9. Pindah satu rumah ke kiri, nilainya dikali sepuluh.",
          contoh: "Makin ke kiri, makin besar.",
        },
        {
          nama: "Membandingkan",
          singkat: "Empat langkah",
          uraian:
            "4.376 lebih besar dari 4.365. Ribuan sama, ratusan sama, puluhan 7 lebih besar dari 6. Kalau sudah beda, berhenti.",
          contoh: "Sama terus? Lanjut. Beda? Berhenti.",
        },
        {
          nama: "Mengurutkan",
          singkat: "Kantong ribuan",
          uraian: "5.208, 1.940, 5.080, dan 3.612 diurutkan 1.940, 3.612, 5.080, 5.208.",
          contoh: "Kelompokkan dulu, rapikan kemudian.",
        },
        {
          nama: "Bilangan dengan angka nol",
          singkat: "Rumah yang tidak disebut",
          uraian:
            "4.050 dibaca empat ribu lima puluh. Ratusan dan satuan tidak disebut, jadi keduanya diisi nol. 6.084 dan 6.840 memakai angka yang sama, tetapi rumah angka 8 berbeda.",
          contoh: "Rumah yang tidak disebut, isinya nol.",
        },
      ],
      kuis: [
        { pertanyaan: "Baca bilangan 5.402.", alias: ["lima ribu empat ratus dua", "5402"] },
        { pertanyaan: "Tulis tujuh ribu sembilan ratus lima.", alias: ["7905"] },
        { pertanyaan: "Berapa nilai angka 7 pada 2.745?", alias: ["tujuh ratus", "700"] },
        { pertanyaan: "Tulis pemecahan 9.123.", alias: ["9000 100 20 3"] },
        { pertanyaan: "Mana yang lebih besar, 6.512 atau 6.521?", alias: ["6521"] },
        { pertanyaan: "Tulis simbol antara 3.908 dan 3.890.", alias: ["lebih besar"] },
        { pertanyaan: "Sebutkan yang paling kecil: 4.500, 4.050, 4.005.", alias: ["4005", "empat ribu lima"] },
        { pertanyaan: "Urutkan 2.760, 2.067, 2.670 dari kecil ke besar.", alias: ["2067 2670 2760"] },
        { pertanyaan: "Baca 8.007 dan sebutkan rumah yang kosong.", alias: ["8007", "ratusan", "puluhan"] },
        { pertanyaan: "Tulis sembilan ribu enam puluh.", alias: ["9060"] },
        { pertanyaan: "Manakah bacaan yang benar untuk 7.050?", alias: ["tujuh ribu lima puluh"] },
        { pertanyaan: "Pasangkan angka 6, 4, dan 8 pada 6.487 dengan nilainya.", alias: ["6000", "400", "80"] },
        { pertanyaan: "Susun 3.099, 9.003, 3.909, 9.300 dari terbesar.", alias: ["9300", "9003", "3909", "3099"] },
        { pertanyaan: "Periksa tiga pernyataan tentang bacaan dan nilai tempat.", alias: ["benar", "salah"] },
        { pertanyaan: "Ribuan 5, ratusan 0, puluhan 7, satuan 2. Bilangan berapa?", alias: ["5072"] },
      ],
      voice: [
        [
          "Bilangan ribuan punya empat angka. Kita membacanya dari kiri ke kanan.",
          "Kalau ada angka nol di tengah, kita tidak perlu menyebutnya.",
          "Untuk membandingkan, periksa dari kiri. Untuk mengurutkan, kelompokkan ribuan dulu.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Papan Skor Kejuaraan Igil",
      pengantar: "Siswa menjadi juri pencatat skor. Sepuluh pos selesai, sepuluh piala terkumpul.",
      labelDaftar: "Sepuluh pos papan skor",
      kolom: 1,
      item: [
        {
          nama: "Catatan skor",
          singkat: "Baca, bandingkan, urutkan",
          uraian:
            "Level 1 membaca 4.827. Level 2 memeriksa angka 6 pada 7.063, nilainya 60. Level 3 membandingkan 3.462 dengan 3.426. Level 4 mengurutkan lima skor. Level 5 memeriksa bahwa 6 ribu 0 ratus 8 puluh 4 sama dengan 6.084. Kumpulkan 10 piala.",
          contoh: "Level 2 dan Level 5 soal yang berbeda.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_BAB1),
        { pertanyaan: "Bagaimana membaca skor 6.305?", alias: ["enam ribu tiga ratus lima"] },
        { pertanyaan: "Pada 8.247, berapa nilai angka 2?", alias: ["200"] },
        { pertanyaan: "Pasangkan 2.090, 5.701, dan 4.008 dengan bacaannya.", alias: ["dua ribu sembilan puluh", "lima ribu tujuh ratus satu", "empat ribu delapan"] },
        { pertanyaan: "Urutkan 4.560, 4.065, 4.650, 4.506 dari terkecil.", alias: ["4065 4506 4560 4650"] },
        { pertanyaan: "Periksa tiga pernyataan papan skor.", alias: ["benar", "salah"] },
        { pertanyaan: "Pada 3.056, angka di rumah kosong adalah berapa?", alias: ["0"] },
        { pertanyaan: "Mana skor terbesar: 5.009, 5.090, atau 5.900?", alias: ["5900"] },
        { pertanyaan: "Deret naik 250: 1.000, 1.250, 1.500, berikutnya?", alias: ["1750"] },
        { pertanyaan: "Ucapkan angka empat ribu sembilan ratus tiga puluh.", alias: ["4930", "empat ribu sembilan ratus tiga puluh"] },
        { pertanyaan: "Tulis pemecahan nilai tempat dari 6.751.", alias: ["6000 700 50 1"] },
      ],
      voice: [
        [
          "Kalian menjadi pencatat skor di turnamen besar. Setiap pemain punya skor ribuan.",
          "Tugas kalian membaca, membandingkan, dan mengurutkan skor. Kalau catatan benar, menara naik satu tingkat.",
          "Sepuluh pos selesai, sepuluh piala terkumpul, podium juara terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca, nilai tempat, membandingkan, dan mengurutkan bilangan sampai 10.000.",
      labelDaftar: "Lembar evaluasi bilangan",
      kolom: 1,
      item: [
        {
          nama: "Nilai tempat dan urutan",
          singkat: "Periksa dari kiri",
          uraian:
            "9.406 = 9.000 + 400 + 0 + 6. Pada 3.764 angka 6 bernilai 60. Urutan 6.075, 6.507, 6.705, 6.750. Dari terbesar: 9.900, 9.099, 9.090, 9.009. 8.001 lebih besar dari 7.899 karena ribuannya 8.",
          contoh: "Kelompokkan dulu sebelum mengurutkan.",
        },
        {
          nama: "Kejuaraan Igil",
          singkat: "Tiga langkah",
          uraian:
            "Hijau 3.840 juara pertama. Kuning 3.084 peringkat terakhir. Selisihnya 3.840 dikurangi 3.084 sama dengan 756.",
          contoh: "Bandingkan, urutkan, lalu hitung selisih.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis pemecahan nilai tempat 9.406.", alias: ["9000 400 0 6"] },
        { pertanyaan: "Bagaimana membaca 5.037?", alias: ["lima ribu tiga puluh tujuh"] },
        { pertanyaan: "Ucapkan angka dari delapan ribu sembilan puluh.", alias: ["8090", "delapan ribu sembilan puluh"] },
        { pertanyaan: "Pada 3.764, apakah angka 6 bernilai 6?", alias: ["60"] },
        { pertanyaan: "Pasangkan 4.829, 8.042, dan 2.984 dengan angka terbesarnya.", alias: ["satuan 9", "ribuan 8", "ratusan 9"] },
        { pertanyaan: "Urutkan 6.075, 6.750, 6.507, 6.705 dari terkecil.", alias: ["6075 6507 6705 6750"] },
        { pertanyaan: "Deret 4.200 – 4.400 – 4.600 – ⬜ – 5.000. Angka yang hilang?", alias: ["4800"] },
        { pertanyaan: "Susun 9.009, 9.900, 9.090, 9.099 dari terbesar.", alias: ["9900", "9099", "9090", "9009"] },
        { pertanyaan: "Mana yang lebih besar, 7.899 atau 8.001, dan mengapa?", alias: ["8001", "delapan ribu satu"] },
        { pertanyaan: "Siapa juara, siapa terakhir, dan berapa selisih 3.840 dengan 3.084?", alias: ["hijau", "kuning", "756"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang bilangan sampai 10.000.",
          "Beberapa soal meminta membaca bilangan, beberapa menentukan nilai tempat, dan beberapa membandingkan atau mengurutkan.",
          "Periksa dari kiri, dan kelompokkan dulu sebelum mengurutkan. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
