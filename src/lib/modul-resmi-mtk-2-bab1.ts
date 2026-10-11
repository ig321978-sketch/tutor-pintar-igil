import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /bilangan cacah sampai 100|desa angka|kakek tono|ikat( menjadi)? puluhan|nilai tempat puluhan|bilangan 1 sampai( dengan)? 1.?000|bilangan 1 sampai 100|rumah tinggal angka/,
  motivasi:
    "Hore! Kamu sudah membantu Kakek Tono di Desa Angka. Ikat setiap 10 jadi 1 puluhan. 25 = 2 puluhan + 5 satuan. Pantang menyerah!",
  kunciJawaban: "B,B,C,B,B,B,A,C,B,A",
  sketsaKartu: [
    "Kakek Tono kebingungan memegang keranjang penuh apel merah di kebun Desa Angka.",
    "Anak mengikat sedotan setiap 10 batang, lalu menaruh 2 ikat di rumah puluhan dan 5 batang di rumah satuan untuk angka 25.",
    "Anak melingkari jeruk per 10, menjodohkan 37-62-85, dan mengisi 49 serta 71.",
    "Anak menarik garis cara baca, menggeser puluhan atau satuan, mengurutkan 24-49-71, dan menulis 25.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
1 ikat sedotan berisi 10 batang disebut...
A) 1 Satuan
B) 1 Puluhan
C) 10 Puluhan
D) 2 Puluhan`,
    `[Soal 2 - PG - Tipe: Reguler]
Pada angka 25, angka 2 menempati tempat...
A) Satuan, nilainya 2
B) Puluhan, nilainya 20
C) Ratusan, nilainya 200
D) Puluhan, nilainya 2`,
    `[Soal 3 - PG - Tipe: Reguler]
Jeruk Kakek Tono: 2 ikat puluhan dan 4 sisa satuan. Total jeruknya...
A) 14
B) 6
C) 24
D) 42`,
    `[Soal 4 - PG - Tipe: HOTS]
Angka 100 terdiri dari...
A) 10 puluhan dan 10 satuan
B) 1 ratusan, 0 puluhan, dan 0 satuan
C) 100 puluhan
D) 1 satuan saja`,
    `[Soal 5 - PG - Tipe: Reguler]
Cara membaca 37 adalah...
A) Tiga tujuh
B) Tiga puluh tujuh
C) Tujuh puluh tiga
D) Tiga puluh`,
    `[Soal 6 - PG - Tipe: Reguler]
49 = ... puluhan + ... satuan
A) 9 puluhan + 4 satuan
B) 4 puluhan + 9 satuan
C) 49 puluhan + 0 satuan
D) 4 satuan + 9 puluhan`,
    `[Soal 7 - PG - Tipe: Reguler]
71 terdiri dari...
A) 7 puluhan + 1 satuan
B) 1 puluhan + 7 satuan
C) 71 satuan saja
D) 7 satuan`,
    `[Soal 8 - PG - Tipe: Reguler]
Cara membaca 85 adalah...
A) Delapan lima
B) Lima puluh delapan
C) Delapan puluh lima
D) Delapan puluh`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa kita mengikat benda setiap 10 buah saat menghitung sampai 100?
A) Supaya bendanya kelihatan lebih banyak
B) Agar menghitung cepat tanpa menghitung satu per satu
C) Karena satuan lebih besar dari puluhan
D) Karena angka 100 tidak punya rumah`,
    `[Soal 10 - PG - Tipe: Reguler]
Cara membaca 62 adalah...
A) Enam puluh dua
B) Dua puluh enam
C) Enam dua
D) Enam puluh`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membantu Kakek Tono di Desa Angka",
      pengantar:
        "Target hari ini: membilang dan menulis 21 sampai 100, lalu menentukan puluhan dan satuan. Kakek Tono baru panen apel. Apelnya lebih dari 20. Yuk bantu Kakek menghitung cepat sampai 100!",
      labelDaftar: "Target, cerita apersepsi, dan ikat puluhan",
      kolom: 1,
      item: [
        {
          nama: "Target belajarku hari ini",
          singkat: "21 sampai 100",
          uraian:
            "Aku bisa membilang dan menuliskan angka dari 21 sampai 100 dengan tepat. Aku juga bisa menentukan nilai tempat puluhan dan satuan suatu bilangan.",
          contoh: "Aku bisa menulis 25 dan tahu 2 puluhan + 5 satuan.",
        },
        {
          nama: "Cerita Kakek Tono",
          singkat: "Apel lebih dari 20",
          uraian:
            "Kakek Tono memanen apel di kebun Desa Angka. Keranjangnya penuh apel merah. Kakek bingung karena jumlahnya lebih dari 20. Duh, bagaimana menghitung apel sebanyak ini dengan cepat?",
          contoh: "Yuk bantu Kakek menghitung sampai 100!",
        },
        {
          nama: "Rahasia ikat puluhan",
          singkat: "Setiap 10 jadi 1 ikat",
          uraian:
            "Jangan hitung satu per satu sampai lelah. Kelompokkan setiap 10 benda. 1 ikat sedotan 10 batang = 1 puluhan. 2 ikat = 20 batang = 2 puluhan. Sisa yang belum sampai 10 disebut satuan.",
          contoh: "1 ikat = 10 = 1 puluhan. 2 ikat = 20 = 2 puluhan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1 ikat sedotan berisi 10 batang disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "2 ikat sedotan berisi 20 batang disebut ... puluhan.",
        alias: ["2", "dua", "2 puluhan", "dua puluhan"],
      },
      voice: [
        [
          "Halo anak-anak hebat kelas 2! Hari ini kita berpetualang di Desa Angka. Targetnya: membilang dan menulis 21 sampai 100, lalu menentukan puluhan dan satuan.",
          "Lihat Kakek Tono. Beliau baru panen apel. Keranjangnya penuh apel merah. Kakek bingung karena apelnya lebih dari 20. Duh, bagaimana menghitung yang banyak ini dengan cepat?",
          "Rahasianya: ikat menjadi puluhan! Setiap 10 benda jadi 1 ikat. 1 ikat 10 batang disebut 1 puluhan. 2 ikat 20 batang disebut 2 puluhan. Yuk bantu Kakek Tono!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Rumah Nilai Tempat Puluhan dan Satuan",
      pengantar:
        "Setiap angka punya rumah agar tidak tertukar. Rumah puluhan di kiri, rumah satuan di kanan. Pada 25: angka 2 nilainya 20, angka 5 nilainya 5. Dibaca dua puluh lima.",
      labelDaftar: "Rumah 25 dan angka 100",
      kolom: 1,
      item: [
        {
          nama: "Rumah puluhan di kiri",
          singkat: "Nilainya puluhan",
          uraian:
            "Angka di kiri menempati rumah puluhan. Pada 25, angka 2 ada di rumah puluhan. Dua ikat sedotan artinya nilainya 20.",
          contoh: "Angka 2 pada 25 = 20.",
        },
        {
          nama: "Rumah satuan di kanan",
          singkat: "Nilainya tetap",
          uraian:
            "Angka di kanan menempati rumah satuan. Pada 25, angka 5 ada di rumah satuan. Lima batang sedotan artinya nilainya 5. 20 + 5 = 25.",
          contoh: "Angka 5 pada 25 = 5.",
        },
        {
          nama: "Tahukah kamu: angka 100",
          singkat: "1 ratusan",
          uraian:
            "Angka 100 adalah bilangan cacah tiga angka yang pertama. 100 terdiri dari 1 ratusan, 0 puluhan, dan 0 satuan.",
          contoh: "100 = 1 ratusan + 0 puluhan + 0 satuan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pada angka 25, angka 2 menempati rumah apa dan nilainya berapa?",
          alias: ["puluhan", "20", "dua puluh"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tuliskan cara membaca 25.",
        alias: ["dua puluh lima", "25", "2 puluhan 5 satuan"],
      },
      voice: [
        [
          "Setiap angka punya rumah. Rumah puluhan di kiri, rumah satuan di kanan. Lihat angka 25.",
          "Angka 2 di rumah puluhan, dua ikat sedotan, nilainya 20. Angka 5 di rumah satuan, lima batang, nilainya 5. Dibaca dua puluh lima.",
          "Tahukah kamu? Angka 100 adalah bilangan cacah tiga angka yang pertama. 100 terdiri dari 1 ratusan, 0 puluhan, dan 0 satuan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Jadi detektif angka: lingkari jeruk setiap 10. 2 ikat + 4 sisa = 24, dua puluh empat. Jodohkan 37, 62, dan 85. Isi 49 dan 71. Lalu lingkari perasaanmu hari ini.",
      labelDaftar: "Detektif jeruk, pasangkan, kotak misteri, jurnal",
      kolom: 1,
      item: [
        {
          nama: "Detektif jeruk Kakek Tono",
          singkat: "2 puluhan + 4 satuan",
          uraian:
            "Lingkari setiap 10 jeruk. Ada 2 ikat puluhan dan 4 sisa satuan. Total jeruk Kakek 24, dibaca dua puluh empat.",
          contoh: "2 puluhan + 4 satuan = 24.",
        },
        {
          nama: "Pasangkan dan kotak misteri",
          singkat: "37, 62, 85, 49, 71",
          uraian:
            "37 = tiga puluh tujuh. 62 = enam puluh dua. 85 = delapan puluh lima. 49 = 4 puluhan + 9 satuan. 71 = 7 puluhan + 1 satuan.",
          contoh: "49 = 4 + 9 satuan. 71 = 7 + 1 satuan.",
        },
        {
          nama: "Jurnal perasaanku",
          singkat: "Refleksi",
          uraian:
            "Bagaimana perasaanmu di Desa Angka hari ini? Seru, aku sudah paham. Sedikit bingung, mau latihan lagi. Atau susah, butuh bantuan tutor. Kamu hebat dan pantang menyerah!",
          contoh: "Hore! Kakek Tono sudah tertolong.",
        },
      ],
      kuis: [
        { pertanyaan: "2 ikat + 4 sisa jeruk sama dengan berapa?", alias: ["24", "dua puluh empat"] },
        { pertanyaan: "37 dibaca apa?", alias: ["tiga puluh tujuh"] },
        { pertanyaan: "62 dibaca apa?", alias: ["enam puluh dua"] },
        { pertanyaan: "85 dibaca apa?", alias: ["delapan puluh lima"] },
        { pertanyaan: "49 terdiri dari berapa puluhan?", alias: ["4", "empat", "empat puluhan"] },
        { pertanyaan: "71 terdiri dari berapa satuan?", alias: ["1", "satu", "satu satuan"] },
      ],
      voice: [
        [
          "Jadi detektif angka. Lingkari jeruk setiap 10. Ada 2 ikat puluhan dan 4 satuan. Total 24, dua puluh empat.",
        ],
        [
          "Pasangkan: 37 tiga puluh tujuh, 62 enam puluh dua, 85 delapan puluh lima. 49 = 4 puluhan + 9 satuan. 71 = 7 puluhan + 1 satuan. Hore, Kakek Tono sudah tertolong!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis cara baca 37, 62, 85. Masukkan ikat ke rumah puluhan dan batang ke rumah satuan. Urutkan 24, 49, 71. Coretkan 25. Lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "37 = tiga puluh tujuh. 62 = enam puluh dua. 85 = delapan puluh lima. Dua ikat masuk rumah puluhan. Lima batang masuk rumah satuan. Urutan: 24, 49, 71.",
          contoh: "2 ikat = puluhan. 5 batang = satuan.",
        },
        {
          nama: "Permainan D, E, dan pesan tutor",
          singkat: "Kanvas dan detektif",
          uraian:
            "Coretkan 25 untuk dua puluh lima. 100 = 1 ratusan, 0 puluhan, 0 satuan. Angka 2 pada 25 nilainya 20, bukan 2. Kamu anak hebat. Sampai jumpa di petualangan berikutnya!",
          contoh: "Coretkan 25. BENAR lalu SALAH.",
        },
      ],
      kuis: [
        { pertanyaan: "37 dibaca?", alias: ["tiga puluh tujuh"] },
        { pertanyaan: "2 ikat ke rumah mana?", alias: ["puluhan"] },
        { pertanyaan: "Urutan 24 49 71?", alias: ["24", "49", "71"] },
        { pertanyaan: "100 punya 1 ratusan?", alias: ["benar"] },
        { pertanyaan: "Angka 2 pada 25 nilainya 2?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan lambang dua puluh lima.",
        alias: ["25", "dua puluh lima"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis 37 ke tiga puluh tujuh, 62 ke enam puluh dua, 85 ke delapan puluh lima.",
          "Masukkan 2 ikat ke rumah puluhan, 5 batang ke rumah satuan. Urutkan 24, 49, lalu 71. Coretkan 25.",
          "Detektif: 100 = 1 ratusan, 0 puluhan, 0 satuan. Angka 2 pada 25 nilainya 20. Kamu hebat dan pantang menyerah!",
        ],
      ],
    },
  ],
};
