import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB5 =
  "Bab 5: Bilangan yang Lebih Besar (11 sampai 20)";
export const JUDUL_MTK1_BAB5_LAMA = "Bab 5: Ayo Membilang sampai dengan 20";

export const MODUL_MTK1_BAB5: ModulResmiPai = {
  id: "mtk-1-bab5",
  judul: JUDUL_MTK1_BAB5,
  pola: /bilangan\s+yang\s+lebih\s+besar|ayo\s+membilang\s+sampai(\s+dengan)?\s+20/,
  motivasi:
    "Hore! Setelah 10, hitungannya lanjut ke belasan. Sebelas, dua belas, sampai dua puluh!",
  kunciJawaban: "C,A,D,B,A,C,B,A,D,C",
  sketsaKartu: [
    "Ali dan Nia mengumpulkan daun kering di halaman sekolah sampai 13.",
    "Kelompok 10 bintang ditambah satuan membentuk angka belasan sampai 20.",
    "Siswa berbaris seperti kereta api nomor 11 sampai 20.",
    "Anak mengisi lembar evaluasi: melengkapi urutan, memilih lambang, dan mencocokkan jumlah.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Nia punya 10 daun, Ali punya 3 daun. Jika digabung, jumlah daunnya...
A) 10
B) 12
C) 13
D) 11`,
    `[Soal 2 - PG - Tipe: Reguler]
Lambang bilangan dari nama angka sebelas adalah...
A) 11
B) 12
C) 10
D) 21`,
    `[Soal 3 - PG - Tipe: Reguler]
Cara membaca angka 12 adalah...
A) Dua puluh
B) Dua satu
C) Seblas
D) Dua belas`,
    `[Soal 4 - PG - Tipe: Reguler]
Hitung maju: 14, 15, .... Angka berikutnya adalah...
A) 13
B) 16
C) 17
D) 15`,
    `[Soal 5 - PG - Tipe: Reguler]
Lambang bilangan dari nama angka lima belas adalah...
A) 15
B) 51
C) 14
D) 16`,
    `[Soal 6 - PG - Tipe: Reguler]
Lambang bilangan 14 jika dibaca menjadi...
A) Empat puluh
B) Satu empat
C) Empat belas
D) Empat`,
    `[Soal 7 - PG - Tipe: Reguler]
Cara membaca angka 20 adalah...
A) Dua belas
B) Dua puluh
C) Dua nol
D) Sepuluh dua`,
    `[Soal 8 - PG - Tipe: Reguler]
Hitung mundur: 20, 19, .... Angka berikutnya adalah...
A) 18
B) 21
C) 17
D) 16`,
    `[Soal 9 - PG - Tipe: HOTS]
Sepuluh pensil ditambah 6 pensil sama dengan...
A) 15
B) 14
C) 26
D) 16`,
    `[Soal 10 - PG - Tipe: HOTS]
Kereta api maju berbaris dari angka terkecil. Gerbong pertama adalah...
A) 20
B) 10
C) 11
D) 12`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Halaman Sekolah",
      pengantar:
        "Di halaman sekolah, Ali dan Nia mengumpulkan daun-daun kering yang gugur untuk tugas kerajinan tangan. Jumlah daunnya melewati angka 10.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Sepuluh daun di genggaman Nia",
          singkat: "Kelompok 10",
          uraian:
            "Nia sudah mengumpulkan 10 daun kering. Itu satu kelompok penuh, sama seperti sepuluh jari kita.",
          contoh: "10 daun = sepuluh.",
        },
        {
          nama: "Ditambah tiga daun Ali",
          singkat: "Lanjut ke belasan",
          uraian:
            "Ali punya 3 daun lagi. Digabung: sebelas, dua belas, tiga belas. Sekarang ada 13 daun. Menghitung belasan artinya melanjutkan hitungan setelah 10.",
          contoh: "10 daun ➕ 3 daun ＝ 13 daun.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nia mengumpulkan berapa daun di genggamannya?",
          alias: ["sepuluh", "10", "sepuluh daun"],
        },
        {
          pertanyaan: "2. Kalau 10 daun ditambah 3 daun, hasilnya berapa?",
          alias: ["tiga belas", "13", "tigabelas"],
        },
        {
          pertanyaan: "3. Setelah angka 10, hitungan belasan dimulai dari angka berapa?",
          alias: ["sebelas", "11"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita di halaman sekolah. Ali dan Nia mengumpulkan daun kering untuk kerajinan tangan.",
          "Nia berkata, Ali, aku sudah mengumpulkan 10 daun kering di dalam genggamanku!",
          "Ali menjawab, wah, banyak sekali, Nia! Aku juga punya 3 daun lagi di tanganku. Kalau kita gabungkan semua daun ini, jumlahnya jadi melewati angka 10 ya?",
        ],
        [
          "Nia berkata, benar! Mari kita hitung lanjut setelah angka 10. Sebelas... dua belas... tiga belas! Sekarang kita punya 13 daun!",
          "Ali berkata, hore! Ternyata menghitung angka belasan itu mudah ya, tinggal melanjutkan hitungan setelah angka 10!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Melompat ke Angka Belasan",
      pengantar:
        "Angka belasan terdiri dari satu kelompok 10 ditambah satuan. Ketuk gerbong kereta untuk melihat lambang angka dan cara membacanya.",
      labelDaftar: "Dari 11 sampai 20",
      kolom: 1,
      item: [
        {
          nama: "Kelompok 10 plus satuan",
          singkat: "11 sampai 19",
          uraian:
            "Sepuluh bintang ditambah 1 menjadi 11, sebelas. Ditambah 2 menjadi 12, dua belas. Begitu seterusnya sampai 19, sembilan belas.",
          contoh: "10 ➕ 3 ＝ 13, tiga belas.",
        },
        {
          nama: "Dua puluh dan hitung maju mundur",
          singkat: "20 dan urutan",
          uraian:
            "Sepuluh ditambah sepuluh menjadi 20, dua puluh. Maju makin besar: 11 sampai 20. Mundur makin kecil: 20 sampai 11.",
          contoh: "Maju 11, 12, 13. Mundur 20, 19, 18.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Cara membaca angka 11 apa?",
          alias: ["sebelas"],
        },
        {
          pertanyaan: "2. Cara membaca angka 20 apa?",
          alias: ["dua puluh", "duapuluh"],
        },
        {
          pertanyaan: "3. Hitung maju setelah 15 angka berapa?",
          alias: ["enam belas", "16", "enambelas"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di infografis Melompat ke Angka Belasan. Sepuluh bintang adalah satu kelompok. Ditambah satu bintang menjadi sebelas. Ditambah dua menjadi dua belas. Ditambah tiga menjadi tiga belas.",
        ],
        [
          "Sepuluh ditambah sepuluh menjadi dua puluh. Hitung maju: 11, 12, 13, 14, 15, 16, 17, 18, 19, 20. Hitung mundur: 20, 19, 18, 17, 16, 15, 14, 13, 12, 11.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Kereta Api dan Lompat Tangga",
      pengantar:
        "Angka belasan makin kuat kalau diurutkan sambil bergerak. Di sekolah kita bermain Kereta Api Nomor Belasan. Di rumah kita lompat tangga angka.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Kereta Api Nomor Belasan",
          singkat: "Untuk guru",
          uraian:
            "Bagikan kartu angka 11 sampai 20 kepada 10 siswa. Saat peluit, siswa berbaris dari 11 ke 20 seperti kereta. Aba-aba Kereta Api Mundur mengurutkan dari 20 ke 11.",
          contoh: "Maju: 11 ke 20. Mundur: 20 ke 11.",
        },
        {
          nama: "Lompat Tangga Angka",
          singkat: "Untuk orang tua",
          uraian:
            "Tulis angka 11 sampai 20 di anak tangga atau kotak di lantai. Setiap lompat, anak menyebutkan angkanya: 11, 12, 13, sampai 20.",
          contoh: "Naik tangga sambil menyebut 11 sampai 20.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nama kegiatan berbaris angka di sekolah apa?",
          alias: [
            "kereta api",
            "kereta api nomor belasan",
            "kereta",
          ],
        },
        {
          pertanyaan: "2. Kereta api maju dimulai dari angka berapa?",
          alias: ["sebelas", "11"],
        },
        {
          pertanyaan: "3. Nama kegiatan melompat angka di rumah apa?",
          alias: [
            "lompat tangga",
            "lompat tangga angka",
            "tangga angka",
          ],
        },
      ],
      voice: [
        [
          "Di sekolah, bermain Kereta Api Nomor Belasan. Guru membagikan kartu 11 sampai 20. Peluit berbunyi, kereta api maju, bersiap! Siswa berbaris dari 11 ke 20 sambil mengepakkan tangan seperti roda kereta.",
        ],
        [
          "Di rumah, bermain Lompat Tangga Angka. Tulis 11 sampai 20 di tangga atau kotak lantai. Setiap langkah, sebut angkanya dengan lantang: 11, 12, 13, sampai 20.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan membilang 11 sampai 20. Lengkapi angka yang hilang, pilih lambang yang benar, lalu cocokkan jumlah benda.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Lengkapi angka yang hilang",
          uraian:
            "Isi urutan hitung maju dan hitung mundur pada kotak yang kosong.",
          contoh: "Maju: 13 dan 16. Mundur: 18 dan 15.",
        },
        {
          nama: "Kelompok B",
          singkat: "Pilihan ganda",
          uraian:
            "Pilih lambang lima belas, cara baca 14, dan angka di antara 13 dan 15.",
          contoh: "Lima belas = 15. 14 = empat belas.",
        },
        {
          nama: "Kelompok C",
          singkat: "Menghubungkan garis",
          uraian:
            "Cocokkan 11 apel, 14 bintang, dan 16 pensil dengan lambang angkanya.",
          contoh: "11 apel = 11. 14 bintang = 14. 16 pensil = 16.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Hitung maju: setelah 12 angka berapa?",
          alias: ["13", "tiga belas"],
        },
        {
          pertanyaan: "2. Hitung maju: setelah 15 angka berapa?",
          alias: ["16", "enam belas"],
        },
        {
          pertanyaan: "3. Hitung mundur: setelah 19 angka berapa?",
          alias: ["18", "delapan belas"],
        },
        {
          pertanyaan: "4. Hitung mundur: setelah 16 angka berapa?",
          alias: ["15", "lima belas"],
        },
        {
          pertanyaan: "5. Lambang lima belas berapa?",
          alias: ["15", "b"],
        },
        {
          pertanyaan: "6. Angka 14 dibaca apa?",
          alias: ["empat belas", "a"],
        },
        {
          pertanyaan: "7. Di antara 13 dan 15 angkanya berapa?",
          alias: ["14", "b"],
        },
        {
          pertanyaan: "8. Sebelas apel sama dengan angka berapa?",
          alias: ["11", "sebelas"],
        },
        {
          pertanyaan: "9. Empat belas bintang sama dengan angka berapa?",
          alias: ["14", "empat belas"],
        },
        {
          pertanyaan: "10. Enam belas pensil sama dengan angka berapa?",
          alias: ["16", "enam belas"],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi Bab 5. Lengkapi angka yang hilang, pilih jawaban, lalu cocokkan jumlah benda dengan angkanya.",
          "Kelompok A: hitung maju 11, 12, titik-titik, 14, 15, titik-titik. Hitung mundur 20, 19, titik-titik, 17, 16, titik-titik.",
        ],
        [
          "Kelompok B: lima belas itu 15. Empat belas itu cara baca 14. Di antara 13 dan 15 ada 14. Kelompok C: cocokkan apel, bintang, dan pensil dengan angkanya. Semangat!",
        ],
      ],
    },
  ],
};
