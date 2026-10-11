import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB2 = "Bab 2: Penjumlahan sampai 10";
export const JUDUL_MTK1_BAB2_LAMA = "Bab 2: Penjumlahan sampai dengan 10";

export const MODUL_MTK1_BAB2: ModulResmiPai = {
  id: "mtk-1-bab2",
  judul: JUDUL_MTK1_BAB2,
  pola: /penjumlahan\s+sampai(\s+dengan)?\s+10|robot ali|kotak gabung/,
  motivasi:
    "Hore! Kamu sudah membantu Ali dan Nia menggabungkan robot. 3 robot ditambah 2 robot sama dengan 5. Menjumlahkan itu menggabungkan.",
  kunciJawaban: "C,A,D,B,A,C,B,A,D,C",
  sketsaKartu: [
    "Ali dan Nia menggabungkan robot kotak merah dan kotak biru di ruang tengah.",
    "Tiga mobil digabung dengan dua mobil menjadi lima, plus artinya ditambah.",
    "Anak menghitung 3 robot dan 2 robot, lalu menulis 3 + 2 = 5.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang penjumlahan sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di kotak merah ada 3 robot. Di kotak biru ada 2 robot. Setelah digabung, jumlah robot adalah...
A) 4
B) 3
C) 5
D) 2`,
    `[Soal 2 - PG - Tipe: LOTS]
Tanda ➕ dalam matematika disebut...
A) Plus atau ditambah
B) Kurang
C) Kali
D) Bagi`,
    `[Soal 3 - PG - Tipe: LOTS]
Tanda ＝ dalam matematika disebut...
A) Plus
B) Ditambah
C) Kurang
D) Sama dengan`,
    `[Soal 4 - PG - Tipe: MOTS]
Kantong A berisi 4 stik. Kantong B berisi 3 stik. Setelah dituang ke Kantong C, jumlahnya...
A) 6
B) 7
C) 8
D) 5`,
    `[Soal 5 - PG - Tipe: LOTS]
Dua biskuit ditambah tiga biskuit sama dengan...
A) 5
B) 4
C) 6
D) 3`,
    `[Soal 6 - PG - Tipe: LOTS]
Hasil dari 5 ➕ 2 adalah...
A) 6
B) 8
C) 7
D) 9`,
    `[Soal 7 - PG - Tipe: MOTS]
Ali punya 4 pensil warna. Nia memberi 3 pensil lagi. Jumlah pensil Ali sekarang...
A) 6
B) 7
C) 8
D) 5`,
    `[Soal 8 - PG - Tipe: HOTS]
Ibu membeli 6 jeruk. Ayah membawa 0 jeruk. Total jeruk di rumah adalah...
A) 6
B) 0
C) 5
D) 7`,
    `[Soal 9 - PG - Tipe: HOTS]
Operasi 3 ➕ 3 ＝ .... Hasil yang benar adalah...
A) 5
B) 7
C) 9
D) 6`,
    `[Soal 10 - PG - Tipe: HOTS]
Ada 7 kupu-kupu, lalu datang 1 kupu-kupu lagi. Jumlahnya sekarang...
A) 6
B) 7
C) 8
D) 9`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Robot di Ruang Tengah",
      pengantar:
        "🗺️ Ali dan Nia bermain robot di ruang tengah. Mereka menggabungkan kotak merah dan kotak biru.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Penjumlahan sampai 10",
          uraian:
            "🎯 Aku bisa menggabungkan dua kelompok benda sampai 10. 🎯 Aku bisa menulis penjumlahan dengan tanda ➕ dan ＝.",
          contoh: "Gabungkan, tulis ➕ dan ＝.",
        },
        {
          nama: "🗺️ Menggabungkan robot",
          singkat: "3 robot dan 2 robot",
          uraian:
            "Di kotak merah ada 3 robot. Di kotak biru ada 2 robot. Kalau digabung ke satu kotak besar, jumlahnya bertambah. Menjumlahkan itu menggabungkan benda.",
          contoh: "Yuk bantu Ali dan Nia menggabungkan robot!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa robot di kotak merah?",
          alias: ["tiga", "3", "tiga robot", "ada tiga"],
        },
        {
          pertanyaan: "2. Setelah digabung, total robot jadi berapa?",
          alias: ["lima", "5", "lima robot", "ada lima"],
        },
        {
          pertanyaan: "3. Menjumlahkan itu artinya apa?",
          alias: ["menggabungkan", "gabung", "menggabungkan benda", "menggabung", "menyatukan"],
        },
      ],
      voice: [
        [
          "Hari ini kita ke ruang tengah rumah Ali. Ali dan Nia mengelompokkan robot. Di kotak merah ada 3 robot. Di kotak biru ada 2 robot.",
          "Kalau semua robot digabung ke satu kotak besar, jumlahnya bertambah. Yuk, kita bantu mereka menggabungkan robot!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Kotak Gabung",
      pengantar:
        "🚗 Trik cepat Ali: gabungkan dua kelompok benda. ➕ disebut plus atau ditambah. ＝ disebut sama dengan. 3 mobil ditambah 2 mobil sama dengan 5.",
      labelDaftar: "Kantong gabung dan simbol matematika",
      kolom: 1,
      item: [
        {
          nama: "🚗 Gabungkan dua kelompok",
          singkat: "3 ➕ 2 ＝ 5",
          uraian:
            "🚗🚗🚗 3 mobil. 🚗🚗 2 mobil. Digabung menjadi 5 mobil. Ditulis 3 ➕ 2 ＝ 5.",
          contoh: "3 ➕ 2 ＝ 5",
        },
        {
          nama: "📦 Contoh robot Ali",
          singkat: "3 + 2 = 5",
          uraian:
            "Ada 3 robot merah dan 2 robot biru. Digabung nilainya 5. Ditulis 3 ➕ 2 ＝ 5.",
          contoh: "3 robot + 2 robot = 5.",
        },
        {
          nama: "💡 Tahukah kamu",
          singkat: "➕ dan ＝",
          uraian:
            "Tanda plus disebut plus atau ditambah. Tanda sama dengan disebut sama dengan. Ditambah nol hasilnya tetap.",
          contoh: "6 ➕ 0 ＝ 6.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tiga mobil ditambah dua mobil sama dengan berapa?",
          alias: ["lima", "5", "lima mobil", "angka 5"],
        },
        {
          pertanyaan: "2. Tanda plus disebut apa?",
          alias: ["plus", "ditambah", "plus atau ditambah", "tambah"],
        },
        {
          pertanyaan: "3. Empat stik ditambah tiga stik sama dengan berapa?",
          alias: ["tujuh", "7", "tujuh stik"],
        },
      ],
      voice: [
        [
          "Trik cepat Ali: gabungkan dua kelompok benda. Tiga mobil ditambah dua mobil sama dengan lima mobil.",
          "Tanda plus disebut plus atau ditambah. Tanda sama dengan disebut sama dengan.",
        ],
        [
          "Lihat robot Ali. Ada 3 robot merah dan 2 robot biru. Digabung jadi 5. Ditulis 3 plus 2 sama dengan 5.",
          "Tahukah kamu? Kalau ditambah nol, hasilnya tetap. Enam ditambah nol tetap enam.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Membantu Ali Menjumlahkan",
      pengantar:
        "🕵️‍♂️ Lihat robot yang sudah rapi. Ada 3 robot di kotak merah dan 2 robot di kotak biru. Gabungkan, lalu tulis hasilnya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "3 robot dan 2 robot",
          uraian:
            "Ada 3 robot merah. Ada 2 robot biru. Digabung jadi 5. Ditulis 3 ➕ 2 ＝ 5. Dibaca lima.",
          contoh: "3 + 2 = 5.",
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
          pertanyaan: "1. Ada berapa robot di kotak merah?",
          alias: ["3", "tiga", "tiga robot"],
        },
        {
          pertanyaan: "2. Ada berapa robot di kotak biru?",
          alias: ["2", "dua", "dua robot"],
        },
        {
          pertanyaan: "3. 3 robot ditambah 2 robot sama dengan berapa?",
          alias: ["5", "lima", "lima robot"],
        },
      ],
      voice: [
        [
          "Yuk bantu Ali. Ada 3 robot di kotak merah dan 2 robot di kotak biru. Robot merah ada 3. Robot biru ada 2.",
          "Digabung jadi 5. Ditulis 3 plus 2 sama dengan 5. Dibaca lima.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Jumlahkan robot, pensil, jeruk, dan benda milik Ali, Nia, Edo, dan ibu.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "3 robot + 2 robot = 5. Ali butuh 4 pensil agar 4 + 3 = 7. Misteri 3 + 3 = 6. Lima mobil. Edo salah: 6 + 0 = 6.",
          contoh: "5 robot. Edo salah.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Plus atau ditambah. 5 + 2 = 7. Tangga 7 dan 9. 4 + 5 = 9. 7 + 1 = 8.",
          contoh: "7, 9, 8.",
        },
      ],
      kuis: [
        { pertanyaan: "1. 3 robot ditambah 2 robot sama dengan berapa?", alias: ["5", "lima"] },
        { pertanyaan: "2. Ali ingin 7 pensil. Nia beri 3. Berapa pensil Ali dari awal?", alias: ["4", "empat"] },
        { pertanyaan: "3. Hasil 3 ditambah 3?", alias: ["6", "enam"] },
        { pertanyaan: "4. Tiga mobil ditambah dua mobil?", alias: ["5", "lima"] },
        { pertanyaan: "5. Enam ditambah nol sama dengan berapa?", alias: ["6", "enam"] },
        { pertanyaan: "6. Tanda plus disebut apa?", alias: ["plus", "ditambah", "tambah"] },
        { pertanyaan: "7. Hasil 5 ditambah 2?", alias: ["7", "tujuh"] },
        { pertanyaan: "8. Kotak A pada tangga 5 6 A 8 B 10?", alias: ["7", "tujuh"] },
        { pertanyaan: "9. Empat ditambah lima?", alias: ["9", "sembilan"] },
        { pertanyaan: "10. Tujuh kupu-kupu ditambah satu?", alias: ["8", "delapan"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Jumlahkan robot dan pensil. Tiga robot ditambah dua robot sama dengan lima. Ali ingin 7 pensil, Nia beri 3, jadi Ali punya 4 dari awal.",
          "Misteri 3 ditambah 3 sama dengan 6. Tiga mobil ditambah dua mobil sama dengan 5. Edo salah, 6 ditambah 0 tetap 6.",
        ],
        [
          "Tanda plus disebut plus atau ditambah. Lima ditambah dua sama dengan 7. Tangga angka 7 dan 9. Empat ditambah lima sama dengan 9. Tujuh ditambah satu sama dengan 8.",
        ],
      ],
    },
  ],
};
