import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB7 = "Bab 7: Pengukuran Berat Standar";

export const MODUL_MTK2_BAB7: ModulResmiPai = {
  id: "mtk-2-bab7",
  judul: JUDUL_MTK2_BAB7,
  pola:
    /pengukuran berat standar|timbangan toko permen|dunia timbangan|satuan g dan kg|tabel dan grafik|mengenal satuan g/,
  motivasi:
    "Hore! Kamu sudah membantu Sani menimbang bahan permen. g untuk benda ringan, kg untuk benda berat. 1 kg = 1.000 g. Besar belum tentu lebih berat.",
  kunciJawaban: "C,A,B,A,A,A,A,A,A,A",
  sketsaKartu: [
    "Paman membawa kantong gula berat dan bungkus garam enteng ke meja Sani.",
    "Timbangan menunjuk angka. g untuk benda ringan, kg untuk benda berat. 1 kg = 1.000 g.",
    "Anak menjadi petugas timbang: lolipop dan cokelat pakai g, karung dan badan pakai kg.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang pengukuran berat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Paket Siti dan Paket Dayu sama-sama 1 kg, tetapi kotak Siti lebih besar. Beni bilang Siti lebih berat. Pendapat yang tepat...
A) Benar, karena benda besar selalu lebih berat
B) Salah, Dayu lebih berat karena kotak kayu lebih keras
C) Salah, keduanya sama berat karena timbangannya 1 kg
D) Benar jika plastik lebih ringan`,
    `[Soal 2 - PG - Tipe: HOTS]
Semangka 4 kg dipotong tepat di tengah. Berat satu potongan...
A) 2 kg
B) 8 kg
C) 200 g
D) 4 kg`,
    `[Soal 3 - PG - Tipe: HOTS]
(1) Jeruk 150 g. (2) Ayam 2 kg. (3) Penghapus kecil 5 kg. Mana yang tidak masuk akal?
A) Nomor (1) saja
B) Nomor (3) saja
C) Nomor (2) dan (3)
D) Semuanya salah`,
    `[Soal 4 - PG - Tipe: MOTS]
Adonan stroberi 600 g digabung adonan susu 300 g. Totalnya...
A) 900 gram
B) 300 gram
C) 90 gram
D) 600 gram`,
    `[Soal 5 - PG - Tipe: HOTS]
Lani 2 kg, Mita 1 kg lebih 500 g, Dodi 2.500 g. Urutan dari yang paling ringan...
A) Mita, Lani, Dodi
B) Lani, Mita, Dodi
C) Dodi, Lani, Mita
D) Mita, Dodi, Lani`,
    `[Soal 6 - PG - Tipe: LOTS]
2.000 gram diubah ke kilogram...
A) 2
B) 20
C) 200
D) 2.000`,
    `[Soal 7 - PG - Tipe: HOTS]
Cokelat 850 g, diambil 200 g lalu 350 g. Sisanya...
A) 300
B) 650
C) 500
D) 150`,
    `[Soal 8 - PG - Tipe: HOTS]
Klip kertas pakai gram, karung beras pakai kilogram. Pasangan yang tepat...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
Wadah 100 g diisi permen 400 g. Berat di timbangan...
A) 500
B) 400
C) 100
D) 300`,
    `[Soal 10 - PG - Tipe: HOTS]
Keranjang plus mangga 7 kg, keranjang kosong 1 kg. Berat bersih mangga...
A) 6
B) 8
C) 7
D) 1`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Kantong Gula yang Bocor",
      pengantar:
        "🗺️ Paman membawa kantong gula yang berat dan bungkus garam yang enteng. Sani ingin tahu berat pastinya di timbangan.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Timbang dengan benar",
          uraian:
            "🎯 Aku bisa mengenal timbangan sebagai alat ukur berat baku. 🎯 Aku bisa membedakan satuan g dan kg serta hubungannya.",
          contoh: "Jarum timbangan menunjuk angka berat.",
        },
        {
          nama: "🗺️ Kantong gula yang bocor",
          singkat: "Gula berat, garam enteng",
          uraian:
            "Kantong gula terasa mantap dan berat. Bungkus garam terasa sangat enteng. Paman mengeluarkan timbangan bermangkuk dan berjarum.",
          contoh: "Yuk bantu Sani menimbang bahan permen!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Benda mana yang terasa lebih berat di tangan Sani?",
          alias: ["gula", "kantong gula", "gula pasir"],
        },
        {
          pertanyaan: "2. Benda mana yang terasa enteng?",
          alias: ["garam", "bungkus garam", "garam halus"],
        },
        {
          pertanyaan: "3. Alat besi yang dikeluarkan Paman namanya apa?",
          alias: ["timbangan", "timbang"],
        },
      ],
      voice: [
        [
          "Paman membawa kantong gula pasir dan bungkus garam. Kantong gula terasa berat, bungkus garam terasa enteng.",
          "Paman mengeluarkan timbangan bermangkuk dan berjarum. Yuk, kita bantu Sani menimbang bahan permen!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Timbangan Gram dan Kilogram",
      pengantar:
        "⚖️ Jangan hanya mengira dengan tangan. Pakai timbangan. Jarum menunjuk angka berat. g untuk benda ringan, kg untuk benda berat. 1 kg = 1.000 g.",
      labelDaftar: "Alat baku dan satuan berat",
      kolom: 1,
      item: [
        {
          nama: "⚖️ Mengenal timbangan",
          singkat: "Jarum menunjuk angka",
          uraian:
            "Benda ditaruh di atas timbangan. Jarum berputar ke sebuah angka. Angka itu adalah berat benda.",
          contoh: "Angka jarum = berat.",
        },
        {
          nama: "🍬 Gram dan kilogram",
          singkat: "g ringan, kg berat",
          uraian:
            "Gram (g) untuk permen, garam kecil, kertas. Kilogram (kg) untuk karung gula, keranjang apel, berat badan.",
          contoh: "Permen = g. Karung = kg.",
        },
        {
          nama: "🏃‍♂️ Rumus lompatan berat",
          singkat: "1 kg = 1.000 g",
          uraian:
            "Seribu benda seberat 1 gram sama dengan 1 kilogram. g dan kg bersahabat erat.",
          contoh: "1 kg = 1.000 g.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satuan untuk benda ringan ditulis singkat apa?",
          alias: ["g", "gram"],
        },
        {
          pertanyaan: "2. Satuan untuk benda berat ditulis singkat apa?",
          alias: ["kg", "kilogram"],
        },
        {
          pertanyaan: "3. 1 kilogram sama dengan berapa gram?",
          alias: ["1000", "1.000", "seribu"],
        },
      ],
      voice: [
        [
          "Jangan hanya mengira dengan tangan. Pakai timbangan. Jarum menunjuk angka berat. Gram untuk benda ringan, kilogram untuk benda berat.",
          "Satu kilogram sama dengan seribu gram.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Petugas Timbang Toko",
      pengantar:
        "🕵️‍♂️ Tempel stiker g atau kg. Lolipop 50 dan cokelat 100 pakai g. Karung 25 dan badan Riko 28 pakai kg.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "A g, B kg, C g, D kg",
          uraian:
            "Benda ringan dipegang anak: A dan C, satuannya g. Benda diangkat dua tangan: B dan D, satuannya kg.",
          contoh: "50 g. 25 kg. 100 g. 28 kg.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, aku tahu kenapa benda besar bisa terasa berat! 😐 Sedikit bingung menghitung nol pada gram. 😢 Masih tertukar menulis g dan kg.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lolipop mini 50 memakai satuan apa?",
          alias: ["g", "gram"],
        },
        {
          pertanyaan: "2. Karung tepung 25 memakai satuan apa?",
          alias: ["kg", "kilogram"],
        },
        {
          pertanyaan: "3. 1 kg sama dengan berapa g?",
          alias: ["1000", "1.000", "seribu"],
        },
      ],
      voice: [
        [
          "Yuk jadi petugas timbang. Lolipop lima puluh dan cokelat seratus pakai gram. Karung dua puluh lima dan badan Riko dua puluh delapan pakai kilogram.",
          "Benda ringan dipegang anak memakai g. Benda yang diangkat dua tangan memakai kg.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Bandingkan paket 1 kg, potong semangka, dan baca label gram-kilogram. Besar belum tentu lebih berat.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Kedua paket 1 kg sama berat. Setengah semangka 2 kg. Penghapus 5 kg tidak masuk akal. 600+300=900. Mita 1.500 g paling ringan.",
          contoh: "Sama 1 kg. 2 kg. 900 g.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "2.000 g = 2 kg. Sisa cokelat 300 g. Klip = g, karung = kg. Wadah plus permen 500 g. Mangga bersih 6 kg.",
          contoh: "2. 300. 500. 6.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Dua paket 1 kg, apakah yang lebih besar lebih berat?", alias: ["sama", "salah"] },
        { pertanyaan: "2. Semangka 4 kg dipotong dua, satu potong?", alias: ["2"] },
        { pertanyaan: "3. Penghapus 5 kg masuk akal?", alias: ["tidak", "3"] },
        { pertanyaan: "4. 600 g + 300 g?", alias: ["900"] },
        { pertanyaan: "5. Paket paling ringan?", alias: ["mita"] },
        { pertanyaan: "6. 2.000 gram sama dengan berapa kg?", alias: ["2"] },
        { pertanyaan: "7. 850 potong 200 lalu 350, sisa?", alias: ["300"] },
        { pertanyaan: "8. Klip dan karung beras, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. Wadah 100 g plus permen 400 g?", alias: ["500"] },
        { pertanyaan: "10. Total 7 kg, keranjang 1 kg, mangga bersih?", alias: ["6"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Dua paket satu kilogram sama berat. Setengah semangka empat kilogram adalah dua kilogram. Penghapus lima kilogram tidak masuk akal.",
          "Enam ratus tambah tiga ratus sama dengan sembilan ratus. Mita seribu lima ratus gram paling ringan, lalu Lani, lalu Dodi.",
        ],
        [
          "Dua ribu gram sama dengan dua kilogram. Sisa cokelat tiga ratus gram. Klip memakai gram, karung memakai kilogram. Wadah plus permen lima ratus. Mangga bersih enam kilogram.",
        ],
      ],
    },
  ],
};
