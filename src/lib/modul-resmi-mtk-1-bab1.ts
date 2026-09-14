import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB1 = "Bab 1: Ayo Berhitung!";
export const JUDUL_MTK1_BAB1_LAMA = "Bab 1: Ayo Membilang sampai dengan 10";

export const MODUL_MTK1_BAB1: ModulResmiPai = {
  id: "mtk-1-bab1",
  judul: JUDUL_MTK1_BAB1,
  pola: /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10|dunia\s+angka/,
  motivasi:
    "Hore! Berhitung itu seru. Hitung benda di sekitarmu, mulai dari nol sampai lima.",
  kunciJawaban: "C,A,D,B,A,C,B,D,A,C",
  sketsaKartu: [
    "Ali dan Nia menghitung apel dan donat di taman sekolah.",
    "Lima apel berjajar dari satu sampai lima.",
    "Piring kosong artinya nol.",
    "Anak mengumpulkan pensil saat bermain detektif berhitung.",
    "Anak mengisi lembar evaluasi: menghitung, menulis angka, dan membandingkan benda.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Perhatikan gambar burung: lima ekor burung. Ada berapa banyak jumlah burung di atas?
A) 3
B) 4
C) 5
D) 2`,
    `[Soal 2 - PG - Tipe: Reguler]
Nia memiliki kotak pensil kosong. Tidak ada pensil sama sekali di dalamnya. Lambang bilangan yang tepat untuk kotak pensil Nia adalah...
A) 0
B) 1
C) 2
D) 5`,
    `[Soal 3 - PG - Tipe: Reguler]
Ali mengeluarkan empat apel dari kotak bekal. Lambang bilangan yang tepat adalah...
A) 2
B) 3
C) 5
D) 4`,
    `[Soal 4 - PG - Tipe: Reguler]
Nia menghitung donat: satu, dua, tiga. Jumlah donat Nia adalah...
A) 2
B) 3
C) 4
D) 1`,
    `[Soal 5 - PG - Tipe: Reguler]
Gambar 🍎🍎 artinya bilangan...
A) 2
B) 3
C) 4
D) 5`,
    `[Soal 6 - PG - Tipe: Reguler]
Cara membaca angka 5 adalah...
A) Empat
B) Tiga
C) Lima
D) Satu`,
    `[Soal 7 - PG - Tipe: Reguler]
Jika piringmu kosong, tidak ada buah sama sekali, itu artinya...
A) Satu
B) Nol
C) Dua
D) Lima`,
    `[Soal 8 - PG - Tipe: Reguler]
Tiga balon cocok dengan angka...
A) 2
B) 4
C) 5
D) 3`,
    `[Soal 9 - PG - Tipe: HOTS]
Ada 2 mobil, lalu datang 2 mobil lagi. Jumlah mobil sekarang...
A) 4
B) 2
C) 3
D) 5`,
    `[Soal 10 - PG - Tipe: HOTS]
Piring kosong lalu ibu meletakkan 1 apel. Sekarang jumlah apel adalah...
A) 0
B) 2
C) 1
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Taman Sekolah",
      pengantar:
        "Saat jam istirahat, Ali dan Nia duduk di dekat pohon rindang sambil membuka bekal. Mereka belajar berhitung dari benda yang dibawa.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Ali membawa apel",
          singkat: "Empat apel merah",
          uraian:
            "Ali mengeluarkan apel dari kotaknya, lalu menghitung bersama Nia: satu, dua, tiga, empat. Ada empat apel!",
          contoh: "Satu... dua... tiga... empat!",
        },
        {
          nama: "Nia membawa donat",
          singkat: "Tiga kue donat",
          uraian:
            "Nia meminta Ali membantu menghitung donat di piring: satu, dua, tiga. Berhitung terasa seru dan mudah.",
          contoh: "Satu... dua... tiga!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa apel milik Ali?",
          alias: ["empat", "4", "empat apel", "ada empat"],
        },
        {
          pertanyaan: "2. Ada berapa donat milik Nia?",
          alias: ["tiga", "3", "tiga donat", "ada tiga"],
        },
        {
          pertanyaan: "3. Berhitung itu rasanya apa menurut Ali?",
          alias: ["seru", "mudah", "seru dan mudah", "asyik", "menyenangkan"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita pergi ke taman bermain sekolah saat jam istirahat. Ali dan Nia duduk di dekat pohon rindang sambil membuka bekal.",
          "Ali berkata, Nia, lihat deh! Ibuku membawakan buah apel merah yang manis sekali. Ali mengeluarkan beberapa apel dari kotaknya.",
          "Nia bertanya, ada berapa banyak buah apelmu? Kamu bisa menghitungnya tidak? Ali menjawab, tentu saja bisa! Yuk, kita hitung sama-sama.",
          "Satu. Dua. Tiga. Empat. Ada empat apel!",
        ],
        [
          "Sekarang gantian. Nia membawa kue donat. Satu. Dua. Tiga. Hore! Berhitung itu seru dan mudah sekali.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Dunia Angka",
      pengantar:
        "Setiap tumpukan benda punya lambang bilangan dan cara membacanya. Ikuti titik-titik dari satu sampai lima, lalu kenali nol jika piring kosong.",
      labelDaftar: "Kamus Mini Angka",
      kolom: 1,
      item: [
        {
          nama: "Satu sampai lima",
          singkat: "1 SATU sampai 5 LIMA",
          uraian:
            "Satu apel dibaca satu. Dua apel dibaca dua. Tiga apel dibaca tiga. Empat apel dibaca empat. Lima apel dibaca lima.",
          contoh: "🍎🍎🍎 = 3 = TIGA",
        },
        {
          nama: "Nol",
          singkat: "0 NOL",
          uraian:
            "Jika piringmu kosong, tidak ada buah sama sekali, itu artinya nol. Nol bukan hilang, tetapi belum ada benda yang dihitung.",
          contoh: "Piring kosong = 0 = NOL",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tiga balon cocok dengan angka berapa?",
          alias: ["tiga", "3", "angka 3", "angka tiga"],
        },
        {
          pertanyaan: "2. Dua mobil cocok dengan angka berapa?",
          alias: ["dua", "2", "angka 2", "angka dua"],
        },
        {
          pertanyaan: "3. Empat bintang cocok dengan angka berapa?",
          alias: ["empat", "4", "angka 4", "angka empat"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di dunia angka. Satu apel dibaca satu. Dua apel dibaca dua. Tiga apel dibaca tiga.",
          "Empat apel dibaca empat. Lima apel dibaca lima. Ikuti titik-titik angka supaya tangan kita terbiasa menulis lambangnya.",
        ],
        [
          "Kalau piringmu kosong, tidak ada buah sama sekali, itu artinya nol. Nol adalah angka untuk tidak ada benda. Jangan lupa, nol juga penting!",
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
            "Guru membagi siswa 3 sampai 4 anak. Guru menyebut angka, misalnya tunjukkan angka 6. Kelompok mencari benda sebanyak itu, lalu meletakkannya di meja. Yang paling tepat dan cepat mendapat bintang.",
          contoh: "Kumpulkan 6 pensil di atas meja.",
        },
        {
          nama: "Bantu Ibu di Dapur",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak ke dapur. Minta anak mengambil benda dengan jumlah tertentu, lalu puji atau peluk setelah menghitung dengan benar.",
          contoh: "Tolong ambilkan 3 jeruk di kulkas.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di kelas, siswa mencari benda sesuai apa yang disebut guru?",
          alias: ["angka", "bilangan", "jumlah", "angka acak"],
        },
        {
          pertanyaan: "2. Ibu meminta kakak mengambil berapa jeruk?",
          alias: ["tiga", "3", "tiga jeruk", "tiga buah"],
        },
        {
          pertanyaan: "3. Setelah anak menghitung benar, orang tua sebaiknya memberi apa?",
          alias: ["pujian", "pelukan", "pujian atau pelukan", "peluk", "memuji"],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Detektif Berhitung. Guru menyebut sebuah angka. Kelompok mencari benda sebanyak angka itu. Misalnya, tunjukkan angka enam, kumpulkan enam pensil.",
          "Kelompok yang menghitung paling tepat dan cepat mendapat bintang penghargaan.",
        ],
        [
          "Di rumah, bantu ibu di dapur. Tolong ambilkan tiga jeruk, atau hitung ada berapa sendok di meja makan.",
          "Kalau anak menghitung dengan benar, berilah pujian atau pelukan hangat. Itu membuat hati berani berhitung lagi.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan berhitung sampai 10. Hitung benda, tulis lambang dan nama bilangan, bandingkan banyaknya, lalu jawab soal cerita.",
      labelDaftar: "Empat Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Menghitung dan mewarnai",
          uraian:
            "Hitung benda di dalam kotak, lalu pilih angka yang sesuai: kupu-kupu, es krim, dan topi.",
          contoh: "6 kupu-kupu, 8 es krim, 4 topi.",
        },
        {
          nama: "Kelompok B",
          singkat: "Menulis lambang bilangan",
          uraian:
            "Hitung semangka, boneka, dan sepeda. Tulis angka dan nama bilangannya.",
          contoh: "7 tujuh, 3 tiga, 9 sembilan.",
        },
        {
          nama: "Kelompok C",
          singkat: "Membandingkan banyak benda",
          uraian:
            "Bandingkan kotak kiri dan kanan. Pilih lebih banyak, lebih sedikit, atau sama banyak.",
          contoh: "5 ikan lebih banyak dari 3 kepiting.",
        },
        {
          nama: "Kelompok D",
          singkat: "Tantangan penalaran",
          uraian:
            "Baca soal cerita pendek. Kosong artinya nol. Habis diambil semua juga artinya nol.",
          contoh: "Susi tidak punya kelereng: 0. Jeruk habis diambil: 0.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa kupu-kupu?",
          alias: ["enam", "6", "angka 6"],
        },
        {
          pertanyaan: "2. Ada berapa es krim?",
          alias: ["delapan", "8", "angka 8"],
        },
        {
          pertanyaan: "3. Ada berapa topi?",
          alias: ["empat", "4", "angka 4"],
        },
        {
          pertanyaan: "4. Tujuh semangka ditulis angka dan huruf apa?",
          alias: ["7", "tujuh"],
        },
        {
          pertanyaan: "5. Tiga boneka ditulis angka dan huruf apa?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "6. Sembilan sepeda ditulis angka dan huruf apa?",
          alias: ["9", "sembilan"],
        },
        {
          pertanyaan: "7. Lima ikan dibanding tiga kepiting?",
          alias: ["lebih banyak", "banyak"],
        },
        {
          pertanyaan: "8. Dua katak dibanding empat bebek?",
          alias: ["lebih sedikit", "sedikit"],
        },
        {
          pertanyaan: "9. Empat lebah dibanding empat kumbang?",
          alias: ["sama banyak", "sama"],
        },
        {
          pertanyaan: "10. Susi tidak punya kelereng. Jumlahnya?",
          alias: ["nol", "0", "kosong"],
        },
        {
          pertanyaan: "11. Tujuh jeruk diambil semua. Sisanya?",
          alias: ["nol", "0", "habis"],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi. Kita menghitung, menulis angka, membandingkan, lalu menjawab soal cerita.",
          "Kelompok A: hitung kupu-kupu, es krim, dan topi, lalu pilih angkanya. Kelompok B: tulis lambang bilangan dan nama bilangannya.",
        ],
        [
          "Kelompok C: bandingkan kotak kiri dan kanan. Pilih lebih banyak, lebih sedikit, atau sama banyak.",
          "Kelompok D: kalau kantong kosong atau jeruk habis diambil semua, jawabannya nol. Semangat mengerjakan sampai tuntas!",
        ],
      ],
    },
  ],
};
