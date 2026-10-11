import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB9 = "Bab 9: Penjumlahan dan Pengurangan";

export const MODUL_MTK2_BAB9: ModulResmiPai = {
  id: "mtk-2-bab9",
  judul: JUDUL_MTK2_BAB9,
  pola:
    /gudang ratusan sani|penjumlahan dan pengurangan bilangan besar|bab 9: penjumlahan dan pengurangan|ratusan bersusun|rumah tiga lantai|dus raksasa/,
  motivasi:
    "Hore! Kamu sudah membantu Sani menghitung gudang ratusan. Sejajarkan ratusan dengan ratusan, puluhan dengan puluhan, satuan dengan satuan. Hitung dari kanan dulu.",
  kunciJawaban: "B,B,A,A,A,A,A,A,A,A",
  sketsaKartu: [
    "Truk pusat mengantar dus raksasa, kantong, dan eceran ke gudang Sani.",
    "Sani menjumlahkan 345 + 132 bersusun menjadi 477, lalu mengurangkan 145 untuk panti.",
    "Anak menjadi manajer gudang: 526 + 253 dan 789 - 465.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang bilangan ratusan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Siti menghitung 768 - 342 bersusun dan menulis 424. Dayu bilang salah di bagian paling belakang. Yang salah...
A) Kolom ratusan, 7 - 3 seharusnya 5
B) Kolom satuan, 8 - 2 seharusnya 6, bukan 4
C) Hitungan Siti sudah benar
D) Kolom puluhan, 6 - 4 seharusnya 3`,
    `[Soal 2 - PG - Tipe: HOTS]
Sani mengambil 231 permen, sisanya 345. Mula-mula di kotak rahasia...
A) 114
B) 576
C) 586
D) 345`,
    `[Soal 3 - PG - Tipe: HOTS]
Bilangan ratusan dikurangi 124 hasilnya 532. Bilangan itu...
A) 656
B) 408
C) 658
D) 532`,
    `[Soal 4 - PG - Tipe: MOTS]
425 permen mangga + 263 permen apel bersusun...
A) 688
B) 685
C) 162
D) 6880`,
    `[Soal 5 - PG - Tipe: HOTS]
Kotak Hijau 134 + 241. Kotak Biru 895 - 520. Pernyataan tepat...
A) Hijau sama besar dengan Biru
B) Hijau lebih kecil daripada Biru
C) Hijau lebih besar daripada Biru
D) Keduanya 0`,
    `[Soal 6 - PG - Tipe: LOTS]
957 - 634 bersusun...
A) 323
B) 333
C) 321
D) 1591`,
    `[Soal 7 - PG - Tipe: HOTS]
689 stiker, dipakai 142 lalu 235. Sisa...
A) 312
B) 547
C) 454
D) 377`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) 450 lalu mendapat 130. (2) 450 lalu 130 dijual. Pasangan...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
4⭐8 + 32🎯 = 799. Nilai ⭐ dan 🎯...
A) 7 dan 1
B) 1 dan 7
C) 5 dan 1
D) 6 dan 9`,
    `[Soal 10 - PG - Tipe: HOTS]
350 + angka ratusan lain. Puluhan jadi 9, satuan tetap 0. Angka terkecil...
A) 40
B) 140
C) 9
D) 50`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Dus Raksasa dari Truk Pusat",
      pengantar:
        "🗺️ Truk pusat mengantar dus raksasa ke gudang Sani. 1 Dus Raksasa = 100 permen. 1 Kantong Besar = 10 permen. Yuk bantu Sani menghitung dengan Trik Susun Tiga Lantai!",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Jumlah dan kurang ratusan",
          uraian:
            "🎯 Aku bisa menjumlahkan dua bilangan ratusan dengan cara bersusun pendek secara teliti. 🎯 Aku bisa mengurangkan dua bilangan ratusan dengan cara bersusun pendek secara tepat.",
          contoh: "Hitung dari lantai kanan dulu.",
        },
        {
          nama: "🗺️ Dus raksasa dari truk pusat",
          singkat: "345 lalu 132",
          uraian:
            "Truk 1 membawa 3 dus, 4 kantong, 5 eceran (345). Truk 2 membawa 1 dus, 3 kantong, 2 eceran (132). Sani pusing menghitung ratusan butir.",
          contoh: "Yuk bantu Sani dengan susun tiga lantai!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satu dus raksasa berisi berapa permen?",
          alias: ["100", "seratus", "ratusan"],
        },
        {
          pertanyaan: "2. Truk pertama membawa berapa permen? (3 dus, 4 kantong, 5 eceran)",
          alias: ["345"],
        },
        {
          pertanyaan: "3. Cara cepat menghitung bilangan besar disebut apa?",
          alias: ["susun", "tiga lantai", "bersusun", "trik susun"],
        },
      ],
      voice: [
        [
          "Wah, toko permen Sani kedatangan truk besar dari pabrik pusat. Satu dus raksasa sama dengan seratus permen. Satu kantong besar sama dengan sepuluh.",
          "Truk pertama membawa tiga ratus empat puluh lima. Truk kedua membawa seratus tiga puluh dua. Yuk bantu Sani menghitung dengan trik susun tiga lantai!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Rumah Tiga Lantai",
      pengantar:
        "📦 Angka ratusan jangan berantakan. Sejajarkan ratusan di kiri, puluhan di tengah, satuan di kanan. Hitung dari lantai kanan dulu.",
      labelDaftar: "Rumah nilai tempat dan cara hitung",
      kolom: 1,
      item: [
        {
          nama: "📦 Rumah tiga lantai",
          singkat: "Ratusan, puluhan, satuan",
          uraian:
            "Lantai kiri ratusan, lantai tengah puluhan, lantai kanan satuan. Angka harus berdiri di lantai yang sama.",
          contoh: "345 di bawah 132, sejajar.",
        },
        {
          nama: "➕ Penjumlahan ratusan",
          singkat: "345 + 132 = 477",
          uraian:
            "Satuan 5 + 2 = 7. Puluhan 4 + 3 = 7. Ratusan 3 + 1 = 4. Hasil 477, dibaca empat ratus tujuh puluh tujuh.",
          contoh: "Hitung dari kanan.",
        },
        {
          nama: "➖ Pengurangan ratusan",
          singkat: "477 - 145 = 332",
          uraian:
            "Panti memesan 145. Satuan 7 - 5 = 2. Puluhan 7 - 4 = 3. Ratusan 4 - 1 = 3. Sisa 332.",
          contoh: "Sisa gudang 332.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 345 + 132, hasil totalnya?",
          alias: ["477"],
        },
        {
          pertanyaan: "2. 477 - 145, sisa permen gudang?",
          alias: ["332"],
        },
        {
          pertanyaan: "3. Lantai mana yang dihitung lebih dulu?",
          alias: ["kanan", "satuan", "eceran"],
        },
      ],
      voice: [
        [
          "Agar angka ratusan tidak berantakan, sejajarkan ke rumah tiga lantai. Ratusan di kiri, puluhan di tengah, satuan di kanan.",
          "Tiga ratus empat puluh lima ditambah seratus tiga puluh dua sama dengan empat ratus tujuh puluh tujuh. Lalu dikurangi seratus empat puluh lima, sisa tiga ratus tiga puluh dua.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Manajer Gudang Permen",
      pengantar:
        "🕵️‍♂️ Bantu Sani mengisi laporan stok. Hitung dari kolom paling kanan. Laporan A penjumlahan, laporan B pengurangan.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "779 dan 324",
          uraian:
            "Laporan A: 526 + 253 = 779. Laporan B: 789 - 465 = 324. Hitung satuan, lalu puluhan, lalu ratusan.",
          contoh: "6 + 3 = 9. 9 - 5 = 4.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Hebat, menghitung ratusan sama mudahnya dengan satuan! 😐 Harus lebih teliti agar garis susun tidak melenceng. 😢 Masih bingung melihat tiga baris angka.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Laporan A: 526 + 253, hasilnya?",
          alias: ["779"],
        },
        {
          pertanyaan: "2. Laporan B: 789 - 465, hasilnya?",
          alias: ["324"],
        },
        {
          pertanyaan: "3. Kolom mana yang dihitung lebih dulu?",
          alias: ["kanan", "satuan", "eceran"],
        },
      ],
      voice: [
        [
          "Yuk jadi manajer gudang. Laporan A: lima ratus dua puluh enam ditambah dua ratus lima puluh tiga sama dengan tujuh ratus tujuh puluh sembilan.",
          "Laporan B: tujuh ratus delapan puluh sembilan dikurangi empat ratus enam puluh lima sama dengan tiga ratus dua puluh empat.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Sejajarkan ratusan, puluhan, dan satuan. Hitung dari kanan. Jangan sampai garis susunnya melenceng.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Siti salah di satuan, 8 - 2 = 6. Kotak mula-mula 576. Bilangan misteri 656. Mangga plus apel 688. Hijau dan Biru sama 375.",
          contoh: "Hitung tiap kolom dari kanan.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "957 - 634 = 323. Sisa stiker Lani 312. Kisah 1 = B, kisah 2 = A. Bintang 7, target 1. Angka terkecil Riko 40.",
          contoh: "323. 312. 1B 2A. 7 dan 1. 40.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Bagian mana yang salah dihitung Siti pada 768 - 342?", alias: ["satuan", "6"] },
        { pertanyaan: "2. Permen kotak rahasia mula-mula?", alias: ["576"] },
        { pertanyaan: "3. Bilangan misteri jika dikurangi 124 hasilnya 532?", alias: ["656"] },
        { pertanyaan: "4. 425 + 263?", alias: ["688"] },
        { pertanyaan: "5. Kotak Hijau dan Kotak Biru, mana yang lebih besar?", alias: ["sama"] },
        { pertanyaan: "6. 957 - 634?", alias: ["323"] },
        { pertanyaan: "7. Sisa stiker Lani?", alias: ["312"] },
        { pertanyaan: "8. Kisah 1 dan 2, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. Nilai bintang dan target?", alias: ["7"] },
        { pertanyaan: "10. Angka ratusan terkecil yang ditambahkan Riko?", alias: ["40"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Siti salah di satuan, delapan dikurangi dua sama dengan enam. Kotak mula-mula lima ratus tujuh puluh enam. Bilangan misteri enam ratus lima puluh enam.",
          "Mangga plus apel enam ratus delapan puluh delapan. Kotak hijau dan kotak biru sama besar, tiga ratus tujuh puluh lima.",
        ],
        [
          "Sembilan ratus lima puluh tujuh dikurangi enam ratus tiga puluh empat sama dengan tiga ratus dua puluh tiga. Sisa stiker Lani tiga ratus dua belas. Kisah satu penjumlahan, kisah dua pengurangan. Bintang tujuh, target satu. Angka terkecil Riko empat puluh.",
        ],
      ],
    },
  ],
};
