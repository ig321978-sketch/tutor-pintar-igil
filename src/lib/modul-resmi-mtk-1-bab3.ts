import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB3 = "Bab 3: Pengurangan sampai 10";
export const JUDUL_MTK1_BAB3_LAMA = "Bab 3: Pengurangan sampai dengan 10";

export const MODUL_MTK1_BAB3: ModulResmiPai = {
  id: "mtk-1-bab3",
  judul: JUDUL_MTK1_BAB3,
  pola: /pengurangan\s+sampai(\s+dengan)?\s+10/,
  motivasi:
    "Hore! Mengurangi itu menghitung sisa. Kalau benda diambil atau pergi, jumlahnya jadi semakin sedikit.",
  kunciJawaban: "C,A,D,B,A,C,B,A,D,C",
  sketsaKartu: [
    "Ali membagikan kue lapis kepada Nia di halaman sekolah.",
    "Lima balon, dua pecah, tersisa tiga balon utuh.",
    "Burung terbang dari pohon di papan tulis.",
    "Anak mengisi lembar evaluasi: menghitung sisa, memilih jawaban, dan mencocokkan hasil pengurangan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Ali punya 6 kue. Nia mengambil 2 kue. Sisa kue Ali adalah...
A) 5
B) 3
C) 4
D) 2`,
    `[Soal 2 - PG - Tipe: Reguler]
Tanda ➖ dalam matematika disebut...
A) Minus atau dikurang
B) Plus
C) Sama dengan
D) Ditambah`,
    `[Soal 3 - PG - Tipe: Reguler]
Tanda ＝ dalam matematika disebut...
A) Minus
B) Dikurang
C) Plus
D) Sama dengan`,
    `[Soal 4 - PG - Tipe: Reguler]
Ada 5 balon. 2 balon pecah. Sisa balon yang utuh adalah...
A) 2
B) 3
C) 4
D) 5`,
    `[Soal 5 - PG - Tipe: Reguler]
Ada 7 burung di pohon. 3 burung terbang pergi. Sisa burung di pohon adalah...
A) 4
B) 3
C) 5
D) 7`,
    `[Soal 6 - PG - Tipe: Reguler]
Ada 8 balok. 4 balok diruntuhkan. Sisa balok yang masih berdiri adalah...
A) 3
B) 5
C) 4
D) 2`,
    `[Soal 7 - PG - Tipe: Reguler]
Hasil dari 8 ➖ 3 adalah...
A) 4
B) 5
C) 6
D) 3`,
    `[Soal 8 - PG - Tipe: Reguler]
Nia membawa 7 pensil. Dia meminjamkan 2 pensil kepada Ali. Sisa pensil Nia adalah...
A) 5
B) 6
C) 7
D) 4`,
    `[Soal 9 - PG - Tipe: HOTS]
Tono punya 4 permen. Dia memakan semua permennya sampai habis. Sisa permen Tono adalah...
A) 4
B) 1
C) 2
D) 0`,
    `[Soal 10 - PG - Tipe: HOTS]
Hasil dari 10 ➖ 3 adalah...
A) 6
B) 8
C) 7
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Halaman Sekolah",
      pengantar:
        "Di halaman sekolah, Ali membawa kantong berisi kue lapis kecil. Nia ingin mencicipi, lalu mereka menghitung sisa kue di kantong.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Enam kue, diambil dua",
          singkat: "6 kue ➖ 2 kue",
          uraian:
            "Ali punya 6 butir kue lapis. Nia mengambil 2 butir dan memakannya. Jumlah kue di kantong jadi berkurang.",
          contoh: "6 kue dikurangi 2 kue.",
        },
        {
          nama: "Menghitung sisa artinya pengurangan",
          singkat: "6 ➖ 2 ＝ 4",
          uraian:
            "Setelah diambil 2, mereka menghitung sisa: satu, dua, tiga, empat. Tersisa 4 kue. Kalau diambil atau dimakan, jumlah benda jadi semakin sedikit. Itu namanya pengurangan.",
          contoh: "6 ➖ 2 ＝ 4",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Awalnya ada berapa kue di kantong Ali?",
          alias: ["enam", "6", "enam kue", "enam butir"],
        },
        {
          pertanyaan: "2. Setelah Nia mengambil 2 kue, sisanya berapa?",
          alias: ["empat", "4", "empat kue", "empat butir"],
        },
        {
          pertanyaan: "3. Kalau benda diambil atau dimakan, namanya apa?",
          alias: ["pengurangan", "dikurang", "kurang", "mengurangi"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita ke halaman sekolah. Ali membawa kantong berisi beberapa butir kue tradisional.",
          "Ali berkata, Nia, aku punya enam butir kue lapis kecil di dalam kantongku. Kamu mau?",
          "Nia menjawab, wah, mau sekali, Ali! Terima kasih banyak ya. Nia mengambil dua butir kue dari kantong Ali dan langsung memakannya.",
        ],
        [
          "Ali berkata, sama-sama, Nia! Hmm, sekarang mari kita hitung kue yang tersisa di kantongku. Tadi ada enam, diambil dua. Jadi tinggal satu, dua, tiga, empat! Tersisa empat butir kue!",
          "Nia berkata, oh, aku tahu! Berarti kalau diambil atau dimakan, jumlah bendanya jadi semakin sedikit ya. Itu namanya pengurangan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Hitung Sisa",
      pengantar:
        "Jumlah awal dikurangi benda yang hilang. Tanda minus artinya dikurang. Tanda sama dengan menunjukkan sisa yang tinggal.",
      labelDaftar: "Kenalan dengan Simbol Minus",
      kolom: 1,
      item: [
        {
          nama: "Balon yang pecah",
          singkat: "5 ➖ 2 ＝ 3",
          uraian:
            "Ada 5 balon. 2 balon pecah. Sisa balon yang utuh ada 3.",
          contoh: "🎈🎈🎈🎈🎈 ➖ 🎈🎈 ＝ 🎈🎈🎈",
        },
        {
          nama: "Simbol minus dan sama dengan",
          singkat: "➖ dan ＝",
          uraian:
            "Tanda minus disebut minus atau dikurang. Tanda sama dengan disebut sama dengan. Bisa ditulis dengan angka: 5 ➖ 2 ＝ 3.",
          contoh: "5 ➖ 2 ＝ 3",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lima balon dikurangi dua balon pecah, sisanya berapa?",
          alias: ["tiga", "3", "tiga balon", "angka 3"],
        },
        {
          pertanyaan: "2. Tanda minus disebut apa?",
          alias: ["minus", "dikurang", "minus atau dikurang", "kurang"],
        },
        {
          pertanyaan: "3. Tanda sama dengan disebut apa?",
          alias: ["sama dengan", "sama", "hasil"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di hitung sisa. Lihat lima balon. Lalu dua balon pecah. Sisa balon yang utuh ada tiga.",
          "Lima dikurangi dua sama dengan tiga. Mengurangi artinya menghitung sisa setelah sebagian benda hilang.",
        ],
        [
          "Sekarang kenalan dengan simbol minus. Tanda minus disebut minus atau dikurang. Tanda sama dengan disebut sama dengan.",
          "Kita bisa menulisnya dengan angka: lima minus dua sama dengan tiga.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pengurangan di Sekolah dan di Rumah",
      pengantar:
        "Pengurangan makin kuat kalau dipraktikkan. Di sekolah kita bermain Burung Terbang dari Pohon. Di rumah kita meruntuhkan menara balok.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Burung Terbang dari Pohon",
          singkat: "Untuk guru",
          uraian:
            "Guru menempelkan 7 gambar burung di pohon. Seorang siswa menjadi angin dan mengambil 3 burung seolah terbang pergi. Kelas menghitung sisa burung di pohon.",
          contoh: "7 burung ➖ 3 burung ＝ 4 burung.",
        },
        {
          nama: "Menara Balok yang Runtuh",
          singkat: "Untuk orang tua",
          uraian:
            "Anak menyusun menara 8 balok, lalu meruntuhkan 4 balok. Tanya dengan ceria berapa balok yang masih berdiri, lalu biarkan anak menghitung sendiri.",
          contoh: "8 balok ➖ 4 balok ＝ 4 balok.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tujuh burung dikurangi tiga yang terbang, sisanya berapa?",
          alias: ["empat", "4", "empat burung"],
        },
        {
          pertanyaan: "2. Delapan balok dikurangi empat yang runtuh, sisanya berapa?",
          alias: ["empat", "4", "empat balok"],
        },
        {
          pertanyaan: "3. Nama kegiatan pengurangan di rumah apa?",
          alias: [
            "menara balok yang runtuh",
            "menara balok",
            "balok yang runtuh",
            "menara",
          ],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Burung Terbang dari Pohon. Guru menempelkan tujuh gambar burung di pohon. Seorang siswa menjadi angin, lalu mengambil tiga burung seolah mereka terbang pergi.",
          "Seluruh kelas menghitung bersama: tujuh dikurangi tiga sama dengan empat.",
        ],
        [
          "Di rumah, bermain Menara Balok yang Runtuh. Susun delapan balok menjadi menara, lalu runtuhkan empat balok dengan hati-hati.",
          "Tadi ada delapan balok, sekarang diambil empat. Biarkan anak menghitung sendiri sisa balok yang masih berdiri.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan pengurangan sampai 10. Hitung sisa benda, pilih jawaban yang benar, lalu cocokkan hasil pengurangannya.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Hitung sisa benda",
          uraian:
            "Hitung jumlah seluruh benda, coret yang dikurangi, lalu tulis sisanya.",
          contoh: "4 ➖ 1 ＝ 3, 6 ➖ 3 ＝ 3, 5 ➖ 2 ＝ 3.",
        },
        {
          nama: "Kelompok B",
          singkat: "Pilihan ganda",
          uraian:
            "Pilih satu jawaban yang paling benar: 8 ➖ 3, pensil Nia, dan permen yang habis dimakan.",
          contoh: "8 ➖ 3 ＝ 5. Habis dimakan semua artinya nol.",
        },
        {
          nama: "Kelompok C",
          singkat: "Menghubungkan garis",
          uraian:
            "Cocokkan soal pengurangan dengan angka sisa yang benar.",
          contoh: "9 ➖ 5 ＝ 4, 6 ➖ 4 ＝ 2, 10 ➖ 3 ＝ 7.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Empat ikan dikurangi satu, sisanya berapa?",
          alias: ["tiga", "3", "4 - 1 = 3"],
        },
        {
          pertanyaan: "2. Enam bunga dikurangi tiga, sisanya berapa?",
          alias: ["tiga", "3", "6 - 3 = 3"],
        },
        {
          pertanyaan: "3. Lima es krim dikurangi dua, sisanya berapa?",
          alias: ["tiga", "3", "5 - 2 = 3"],
        },
        {
          pertanyaan: "4. Hasil 8 dikurangi 3 adalah?",
          alias: ["lima", "5", "b"],
        },
        {
          pertanyaan: "5. Tujuh pensil dikurangi dua, sisanya berapa?",
          alias: ["lima", "5", "a"],
        },
        {
          pertanyaan: "6. Empat permen dimakan semua, sisanya berapa?",
          alias: ["nol", "0", "c", "habis"],
        },
        {
          pertanyaan: "7. Sembilan dikurangi lima sama dengan berapa?",
          alias: ["empat", "4"],
        },
        {
          pertanyaan: "8. Enam dikurangi empat sama dengan berapa?",
          alias: ["dua", "2"],
        },
        {
          pertanyaan: "9. Sepuluh dikurangi tiga sama dengan berapa?",
          alias: ["tujuh", "7"],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi Bab 3. Kita menghitung sisa benda, memilih jawaban, lalu mencocokkan hasilnya.",
          "Kelompok A: hitung benda yang masih ada setelah sebagian dicoret. Kelompok B: pilih satu jawaban yang paling benar.",
        ],
        [
          "Kelompok C: cocokkan soal pengurangan dengan angka sisanya. Ingat, kalau habis diambil semua, jawabannya nol. Semangat mengerjakan sampai tuntas!",
        ],
      ],
    },
  ],
};
