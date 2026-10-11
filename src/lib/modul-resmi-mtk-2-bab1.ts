import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /bilangan cacah sampai 100|desa angka|kakek tono|ikat( menjadi)? puluhan|nilai tempat puluhan|bilangan 1 sampai( dengan)? 1.?000|bilangan 1 sampai 100|rumah tinggal angka|ayo menghitung sampai 100|dunia angka sampai 100/,
  motivasi:
    "Hore! Berhitung sampai 100 itu seru. Hitung sepuluh-sepuluh dulu, lalu hitung sisanya.",
  kunciJawaban: "B,B,C,B,B,B,A,C,B,A",
  sketsaKartu: [
    "Ali dan Nia menghitung apel dan jeruk di taman sekolah, sepuluh-sepuluh dulu.",
    "Anak melihat gambar benda, lalu menulis angka 10, 20, 25, dan 100.",
    "Anak mengumpulkan pensil di kelas dan jeruk di dapur sesuai jumlah yang disebut.",
    "Anak mengisi lembar evaluasi: menghitung, menulis nama bilangan, dan membandingkan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
10 apel disebut...
A) 1 satuan
B) 1 puluhan
C) 10 puluhan
D) 2 puluhan`,
    `[Soal 2 - PG - Tipe: Reguler]
25 = 20 + 5. Angka 20 disebut...
A) 2 satuan
B) 2 puluhan
C) 2 ratusan
D) 25 satuan`,
    `[Soal 3 - PG - Tipe: Reguler]
Ada 10 jeruk, 10 jeruk, dan 4 jeruk lagi. Jumlahnya...
A) 14
B) 6
C) 24
D) 42`,
    `[Soal 4 - PG - Tipe: HOTS]
Angka 100 dibaca...
A) Sepuluh
B) Seratus
C) Sepuluh puluh
D) Satu`,
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
Mengapa kita hitung sepuluh-sepuluh jika bendanya banyak?
A) Supaya bendanya kelihatan lebih banyak
B) Agar menghitung cepat tanpa menghitung satu per satu
C) Karena satuan lebih besar dari puluhan
D) Karena angka 100 tidak bisa dihitung`,
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
      judul: "A. Dialog di Taman Sekolah",
      pengantar:
        "Saat jam istirahat, Ali dan Nia duduk di dekat pohon rindang. Dulu mereka menghitung 4 apel. Hari ini apel dan jeruknya lebih banyak, jadi mereka hitung sepuluh-sepuluh dulu.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Ali membawa apel",
          singkat: "Dua puluh lima apel",
          uraian:
            "Ali mengeluarkan apel dari kotaknya. Ia menghitung: sepuluh, sepuluh, lima. Ada dua puluh lima apel!",
          contoh: "Sepuluh... sepuluh... lima! Ada 25 apel.",
        },
        {
          nama: "Nia membawa jeruk",
          singkat: "Dua puluh empat jeruk",
          uraian:
            "Nia menghitung jeruknya: sepuluh, sepuluh, empat. Ada dua puluh empat jeruk. Berhitung tetap seru dan mudah.",
          contoh: "Sepuluh... sepuluh... empat! Ada 24 jeruk.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa apel milik Ali?",
          alias: ["25", "dua puluh lima", "dua puluh lima apel", "25 apel"],
        },
        {
          pertanyaan: "2. Ada berapa jeruk milik Nia?",
          alias: ["24", "dua puluh empat", "dua puluh empat jeruk", "24 jeruk"],
        },
        {
          pertanyaan: "3. Kalau bendanya banyak, Ali dan Nia menghitung bagaimana?",
          alias: ["sepuluh", "sepuluh-sepuluh", "puluh", "puluhan"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita ke taman sekolah saat jam istirahat. Ali dan Nia duduk di dekat pohon rindang sambil membuka bekal.",
          "Ali berkata, Nia, dulu apelku cuma empat. Sekarang lebih banyak! Yuk hitung sepuluh-sepuluh dulu.",
          "Sepuluh. Sepuluh. Lima. Ada dua puluh lima apel!",
        ],
        [
          "Sekarang gantian. Nia membawa jeruk. Sepuluh. Sepuluh. Empat. Ada dua puluh empat jeruk. Hore! Berhitung itu tetap seru dan mudah.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Dunia Angka",
      pengantar:
        "Setiap tumpukan benda punya angka dan cara membacanya. Sepuluh benda disebut satu puluhan. Yang kurang dari sepuluh disebut satuan.",
      labelDaftar: "Kamus Mini Angka",
      kolom: 1,
      item: [
        {
          nama: "Sepuluh, dua puluh, dua puluh lima",
          singkat: "10, 20, 25",
          uraian:
            "10 apel dibaca sepuluh. 20 apel dibaca dua puluh. 25 apel dibaca dua puluh lima. 25 artinya 20 tambah 5.",
          contoh: "🍎×10 + 🍎×10 + 🍎×5 = 25 = DUA PULUH LIMA",
        },
        {
          nama: "Seratus",
          singkat: "100",
          uraian:
            "Kalau ada 10 kelompok yang masing-masing 10, jumlahnya 100. Dibaca seratus.",
          contoh: "10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = 100 = SERATUS",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sepuluh apel cocok dengan angka berapa?",
          alias: ["10", "sepuluh", "angka 10"],
        },
        {
          pertanyaan: "2. Dua puluh lima apel cocok dengan angka berapa?",
          alias: ["25", "dua puluh lima", "angka 25"],
        },
        {
          pertanyaan: "3. Seratus cocok dengan angka berapa?",
          alias: ["100", "seratus", "angka 100"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di dunia angka. Sepuluh apel dibaca sepuluh. Dua puluh apel dibaca dua puluh. Dua puluh lima apel dibaca dua puluh lima.",
          "Sepuluh benda disebut satu puluhan. Yang kurang dari sepuluh disebut satuan. Jadi 25 itu 2 puluhan dan 5 satuan.",
        ],
        [
          "Kalau ada sepuluh kelompok, tiap kelompok sepuluh, jumlahnya seratus. Seratus ditulis 100. Jangan lupa, seratus juga penting!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Berhitung di Sekolah dan di Rumah",
      pengantar:
        "Berhitung makin kuat kalau dipraktikkan. Di sekolah kita jadi detektif benda. Di rumah kita membantu ibu menghitung di dapur.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Detektif Berhitung di Kelas",
          singkat: "Untuk guru",
          uraian:
            "Guru membagi siswa 3 sampai 4 anak. Guru menyebut angka, misalnya tunjukkan angka 25. Kelompok membuat 2 kelompok 10 pensil, lalu 5 pensil lagi. Yang paling tepat dan cepat mendapat bintang.",
          contoh: "Kumpulkan 25 pensil: 10, 10, dan 5.",
        },
        {
          nama: "Bantu Ibu di Dapur",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak ke dapur. Minta anak mengambil jeruk atau sendok dengan jumlah tertentu, dihitung sepuluh-sepuluh. Puji atau peluk setelah menghitung benar.",
          contoh: "Tolong ambil 30 jeruk: 10, 10, dan 10.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di kelas, siswa mencari benda sesuai apa yang disebut guru?",
          alias: ["angka", "bilangan", "jumlah"],
        },
        {
          pertanyaan: "2. Guru meminta kumpulkan 25 pensil. Itu 10, 10, dan berapa lagi?",
          alias: ["5", "lima", "lima pensil"],
        },
        {
          pertanyaan: "3. Setelah anak menghitung benar, orang tua sebaiknya memberi apa?",
          alias: ["pujian", "pelukan", "pujian atau pelukan", "peluk", "memuji"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Detektif Berhitung. Guru menyebut sebuah angka. Kelompok mencari benda sebanyak angka itu. Misalnya, tunjukkan angka dua puluh lima. Kumpulkan sepuluh, sepuluh, dan lima pensil.",
          "Kelompok yang menghitung paling tepat dan cepat mendapat bintang penghargaan.",
        ],
        [
          "Di rumah, bantu ibu di dapur. Tolong ambilkan tiga puluh jeruk. Hitung sepuluh, sepuluh, sepuluh.",
          "Kalau anak menghitung dengan benar, berilah pujian atau pelukan hangat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan berhitung sampai 100. Hitung benda, tulis lambang dan nama bilangan, bandingkan banyaknya, lalu jawab soal cerita.",
      labelDaftar: "Empat Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Menghitung dan mewarnai",
          uraian:
            "Hitung benda di dalam kotak, lalu pilih angkanya: jeruk, apel, dan pensil.",
          contoh: "24 jeruk, 25 apel, 30 pensil.",
        },
        {
          nama: "Kelompok B",
          singkat: "Menulis lambang bilangan",
          uraian: "Tulis angka dan nama bilangannya: 25, 37, dan 62.",
          contoh: "25 dua puluh lima, 37 tiga puluh tujuh, 62 enam puluh dua.",
        },
        {
          nama: "Kelompok C",
          singkat: "Membandingkan banyak benda",
          uraian:
            "Bandingkan kotak kiri dan kanan. Pilih lebih banyak, lebih sedikit, atau sama banyak.",
          contoh: "25 apel lebih banyak dari 20 jeruk.",
        },
        {
          nama: "Kelompok D",
          singkat: "Tantangan penalaran",
          uraian:
            "Baca soal cerita pendek. Ali punya 20 kelereng lalu dapat 5. Seratus stiker ditulis 100.",
          contoh: "20 + 5 = 25. 100 dibaca seratus.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Ada berapa jeruk?", alias: ["24", "dua puluh empat"] },
        { pertanyaan: "2. Ada berapa apel?", alias: ["25", "dua puluh lima"] },
        { pertanyaan: "3. Ada berapa pensil?", alias: ["30", "tiga puluh"] },
        { pertanyaan: "4. Dua puluh lima ditulis angka dan huruf apa?", alias: ["25", "dua puluh lima"] },
        { pertanyaan: "5. Tiga puluh tujuh ditulis angka dan huruf apa?", alias: ["37", "tiga puluh tujuh"] },
        { pertanyaan: "6. Enam puluh dua ditulis angka dan huruf apa?", alias: ["62", "enam puluh dua"] },
        { pertanyaan: "7. Dua puluh lima apel dibanding dua puluh jeruk?", alias: ["lebih banyak", "banyak"] },
        { pertanyaan: "8. Dua puluh apel dibanding tiga puluh tujuh jeruk?", alias: ["lebih sedikit", "sedikit"] },
        { pertanyaan: "9. Dua puluh lima apel dibanding dua puluh lima jeruk?", alias: ["sama banyak", "sama"] },
        { pertanyaan: "10. Ali punya 20 kelereng, lalu dapat 5. Jumlahnya?", alias: ["25", "dua puluh lima"] },
        { pertanyaan: "11. Seratus stiker ditulis angka berapa?", alias: ["100", "seratus"] },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi. Kita menghitung, menulis angka, membandingkan, lalu menjawab soal cerita.",
          "Kelompok A: hitung jeruk, apel, dan pensil, lalu pilih angkanya. Kelompok B: tulis lambang bilangan dan nama bilangannya.",
        ],
        [
          "Kelompok C: bandingkan kotak kiri dan kanan. Pilih lebih banyak, lebih sedikit, atau sama banyak.",
          "Kelompok D: dua puluh tambah lima sama dengan dua puluh lima. Seratus ditulis 100. Semangat mengerjakan sampai tuntas!",
        ],
      ],
    },
  ],
};
