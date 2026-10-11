import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /bilangan cacah sampai 100|kantong permen sani|permen ulang tahun|desa angka|kakek tono|ikat( menjadi)? puluhan|nilai tempat puluhan|bilangan 1 sampai( dengan)? 1.?000|bilangan 1 sampai 100|rumah tinggal angka|ayo menghitung sampai 100/,
  motivasi:
    "Hore! Kamu sudah membantu Sani merapikan permen. 1 kantong besar = 10 permen = 1 puluhan. Permen di luar kantong = satuan.",
  kunciJawaban: "B,A,B,A,B,B,C,A,C,B",
  sketsaKartu: [
    "Sani menghitung tumpukan permen ulang tahun di atas meja.",
    "Sani memasukkan setiap 10 permen ke kantong besar, sisanya di luar.",
    "Anak menghitung 3 kantong besar dan 2 permen eceran milik Sani.",
    "Anak mengisi lembar kerja tantangan para juara tentang puluhan dan satuan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Siti punya 4 kantong besar dan 3 permen di luar. Dayu punya 3 kantong besar dan 14 permen di luar. Siapa yang permennya paling banyak?
A) Siti
B) Dayu
C) Permen mereka sama banyak
D) Tidak bisa dihitung`,
    `[Soal 2 - PG - Tipe: HOTS]
Beni ingin 75 permen. Sekarang ada beberapa kantong besar dan 5 permen di luar. Berapa kantong besar yang dibutuhkan agar jumlahnya 75?
A) 7 Kantong
B) 5 Kantong
C) 2 Kantong
D) 6 Kantong`,
    `[Soal 3 - PG - Tipe: HOTS]
Angka Sani ada di antara 60 dan 70. Jika jumlah kantong dan permen eceran digabung hasilnya 9. Angkanya...
A) 69
B) 63
C) 36
D) 72`,
    `[Soal 4 - PG - Tipe: MOTS]
Toni punya 8 kantong besar dan 7 permen eceran. Jumlah permen Toni...
A) 78
B) 87
C) 80
D) 17`,
    `[Soal 5 - PG - Tipe: HOTS]
Edo menulis: 82 permen = 2 kantong puluhan dan 8 permen satuan. Pernyataan Edo...
A) Benar, karena angka 2 ditulis di depan angka 8 jika dibalik
B) Salah, seharusnya 8 kantong puluhan dan 2 permen satuan di luar
C) Salah, seharusnya 80 kantong puluhan dan 2 permen satuan di luar
D) Benar, karena 2 + 8 = 10`,
    `[Soal 6 - PG - Tipe: LOTS]
Sani punya permen sebanyak "sembilan puluh satu". Lambang angkanya...
A) 19
B) 91
C) 90
D) 81`,
    `[Soal 7 - PG - Tipe: HOTS]
Permen Lani lebih dari 45, kurang dari 50, dan satuan angkanya genap. Jumlah yang mungkin...
A) 47 atau 49
B) 46 atau 47
C) 46 atau 48
D) 45 atau 50`,
    `[Soal 8 - PG - Tipe: HOTS]
Tangga angka Sani meloncat 10: 20, 30, kotak A, 50, kotak B, 70. Isi kotak A dan B...
A) 40 dan 60
B) 35 dan 55
C) 45 dan 65
D) 30 dan 50`,
    `[Soal 9 - PG - Tipe: HOTS]
Kartu angka 4 dan 7. Bilangan paling besar dan paling kecil adalah...
A) 47 dan 74
B) 44 dan 77
C) 74 dan 47
D) 47 dan 44`,
    `[Soal 10 - PG - Tipe: HOTS]
Riko punya 100 permen. Sudah masuk 9 kantong besar. Sisa permen eceran di luar...
A) 1
B) 10
C) 9
D) 0`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Permen Ulang Tahun",
      pengantar:
        "🌟 Target hari ini: menghitung benda dari 21 sampai 100 dengan cepat, lalu memisahkan puluhan dan satuan. 🗺️ Sani baru ulang tahun. Di meja ada banyak permen dari paman.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "21 sampai 100",
          uraian:
            "🎯 Aku bisa menghitung banyak benda dari 21 sampai 100 dengan cepat. 🎯 Aku bisa memisahkan kelompok puluhan dan satuan dengan tepat.",
          contoh: "Hitung cepat, pisahkan puluhan dan satuan.",
        },
        {
          nama: "🗺️ Berbagi permen ulang tahun",
          singkat: "Permen pemberian paman",
          uraian:
            "Sani ingin menghitung semua permennya. Kalau dihitung satu per satu dari angka 1, melelahkan dan mudah salah. Bagaimana cara menghitung yang banyak ini dengan cepat dan rapi?",
          contoh: "Yuk bantu Sani membungkus permen ke dalam kantong!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang punya banyak permen ulang tahun?",
          alias: ["sani"],
        },
        {
          pertanyaan: "2. Mengapa Sani bingung menghitung permennya?",
          alias: ["banyak", "satu per satu", "lelah", "salah", "melelahkan"],
        },
        {
          pertanyaan: "3. Kita akan memasukkan setiap 10 permen ke dalam apa?",
          alias: ["kantong", "kantong besar", "plastik"],
        },
      ],
      voice: [
        [
          "Hari ini kita bantu Sani. Targetnya: menghitung benda dari 21 sampai 100 dengan cepat, lalu memisahkan puluhan dan satuan.",
          "Sani baru ulang tahun. Di atas meja ada banyak permen pemberian paman. Kalau dihitung satu per satu, melelahkan dan mudah salah.",
          "Sani bertanya, bagaimana cara menghitung permen yang banyak ini dengan cepat dan rapi? Yuk, kita bantu Sani membungkus permen ke dalam kantong!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Kantong Permen",
      pengantar:
        "🍬 Trik cepat Sani: bungkus setiap 10 permen. 🛍️ 1 kantong besar berisi 10 permen disebut 1 puluhan. Permen sisa di luar kantong disebut satuan.",
      labelDaftar: "Kantong besar dan permen eceran",
      kolom: 1,
      item: [
        {
          nama: "🍬 Bungkus setiap 10 permen",
          singkat: "1 kantong = 1 puluhan",
          uraian:
            "🛍️ 1 kantong besar = 10 permen = 1 puluhan. 🛍️🛍️ 2 kantong = 20 permen = 2 puluhan. 🛍️🛍️🛍️ 3 kantong = 30 permen = 3 puluhan. Permen sisa yang kurang dari 10 diletakkan di luar sebagai satuan.",
          contoh: "1 kantong besar = 1 puluhan.",
        },
        {
          nama: "📦 Kantong besar dan permen di luar",
          singkat: "25 = dua puluh lima",
          uraian:
            "Ada 2 kantong besar dan 5 permen di luar. Di kantong nilainya 20. Di luar nilainya 5. Ditulis 25. Dibaca dua puluh lima.",
          contoh: "2 kantong + 5 permen = 25.",
        },
        {
          nama: "💡 Tahukah kamu",
          singkat: "10 kantong = 100",
          uraian:
            "Jika Sani mempunyai tepat 10 kantong besar berisi permen, semua permennya berjumlah 100.",
          contoh: "10 kantong besar = 100.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 1 kantong besar berisi 10 permen disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
        {
          pertanyaan: "2. 2 kantong besar dan 5 permen di luar sama dengan berapa?",
          alias: ["25", "dua puluh lima"],
        },
        {
          pertanyaan: "3. 10 kantong besar berisi berapa permen?",
          alias: ["100", "seratus"],
        },
      ],
      voice: [
        [
          "Trik cepat Sani: bungkus setiap 10 permen ke dalam 1 kantong besar. Satu kantong besar disebut 1 puluhan. Dua kantong disebut 2 puluhan. Tiga kantong disebut 3 puluhan.",
          "Kalau ada permen sisa yang tidak sampai 10, biarkan di luar kantong. Itu satuan, atau permen eceran.",
        ],
        [
          "Lihat meja Sani. Ada 2 kantong besar dan 5 permen di luar. Nilainya 20 tambah 5. Ditulis 25. Dibaca dua puluh lima.",
          "Tahukah kamu? Kalau Sani punya tepat 10 kantong besar, semua permennya berjumlah 100.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Membantu Sani Menghitung",
      pengantar:
        "🕵️‍♂️ Lihat permen Sani yang sudah rapi. Ada 3 kantong besar dan 2 permen di luar. Hitung puluhan, satuan, lalu tulis angkanya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "3 kantong dan 2 permen",
          uraian:
            "Ada 3 kantong besar. Ada 2 permen di luar. Itu 3 puluhan dan 2 satuan. Lambangnya 32. Dibaca tiga puluh dua.",
          contoh: "3 kantong + 2 permen = 32.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Seru banget, aku sudah paham! 😐 Sedikit bingung, mau latihan lagi. 😢 Susah, butuh bantuan tutor kembali.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa kantong besar Sani?",
          alias: ["3", "tiga", "3 puluhan", "tiga puluhan"],
        },
        {
          pertanyaan: "2. Ada berapa permen di luar kantong?",
          alias: ["2", "dua", "2 satuan", "dua satuan"],
        },
        {
          pertanyaan: "3. 3 kantong besar dan 2 permen di luar sama dengan berapa?",
          alias: ["32", "tiga puluh dua"],
        },
      ],
      voice: [
        [
          "Yuk bantu Sani. Ada 3 kantong besar dan 2 permen di luar. Kantong besar ada 3, itu 3 puluhan. Permen di luar ada 2, itu 2 satuan.",
          "Lambang bilangannya 32. Dibaca tiga puluh dua.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Kerja Siswa",
      pengantar:
        "📝 Tantangan para juara! Hitung kantong besar dan permen eceran milik Siti, Dayu, Beni, Toni, Edo, Lani, dan Riko.",
      labelDaftar: "LKS pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Siti 43, Dayu 44. Beni butuh 7 kantong untuk 75. Misteri Sani 63. Toni 78. Edo salah: 82 itu 8 kantong dan 2 satuan.",
          contoh: "Dayu lebih banyak. Toni 78.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Sembilan puluh satu = 91. Lani 46 atau 48. Tangga 40 dan 60. Kartu 74 dan 47. Sisa 10 permen dari 100.",
          contoh: "91, 46 atau 48, 10.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Siapa yang permennya paling banyak, Siti atau Dayu?", alias: ["dayu"] },
        { pertanyaan: "2. Beni butuh berapa kantong besar untuk 75 permen jika sisa 5?", alias: ["7", "tujuh"] },
        { pertanyaan: "3. Angka misteri Sani antara 60 dan 70, jumlah digit 9?", alias: ["63"] },
        { pertanyaan: "4. 8 kantong dan 7 permen eceran sama dengan berapa?", alias: ["78"] },
        { pertanyaan: "5. 82 permen artinya berapa kantong puluhan?", alias: ["8", "delapan"] },
        { pertanyaan: "6. Sembilan puluh satu ditulis angka berapa?", alias: ["91"] },
        { pertanyaan: "7. Permen Lani yang mungkin?", alias: ["46", "48"] },
        { pertanyaan: "8. Kotak A pada tangga 20 30 A 50 B 70?", alias: ["40"] },
        { pertanyaan: "9. Kartu 4 dan 7, bilangan paling besar?", alias: ["74"] },
        { pertanyaan: "10. 9 kantong dari 100, sisa permen eceran?", alias: ["10", "sepuluh"] },
      ],
      voice: [
        [
          "Ini lembar kerja tantangan para juara. Hitung kantong besar dan permen di luar. Siti 4 kantong dan 3 permen. Dayu 3 kantong dan 14 permen. Dayu lebih banyak.",
          "Beni ingin 75, sisa 5 permen, jadi butuh 7 kantong. Misteri Sani 63. Toni 78. Edo salah, 82 itu 8 kantong dan 2 satuan.",
        ],
        [
          "Sembilan puluh satu ditulis 91. Permen Lani 46 atau 48. Tangga angka 40 dan 60. Kartu 4 dan 7 jadi 74 atau 47. Sisa dari 100 setelah 9 kantong adalah 10 permen.",
        ],
      ],
    },
  ],
};
