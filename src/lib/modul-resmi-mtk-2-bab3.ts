import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB3 = "Bab 3: Fondasi Perkalian Dasar";

export const MODUL_MTK2_BAB3: ModulResmiPai = {
  id: "mtk-2-bab3",
  judul: JUDUL_MTK2_BAB3,
  pola:
    /fondasi perkalian|penjumlahan berulang|kotak permen kembar|kotak x isi|pengukuran waktu dan uang/,
  motivasi:
    "Hore! Kamu sudah membantu Sani. Perkalian adalah penjumlahan berulang angka kembar. 3 piring × 2 permen = 6.",
  kunciJawaban: "B,C,A,B,B,A,A,A,A,A",
  sketsaKartu: [
    "Sani memasukkan 2 permen ke masing-masing 3 piring untuk tamu ulang tahun.",
    "Tiga piring berisi 2 permen diubah menjadi 3 × 2 = 6.",
    "Anak menjadi detektif: 4 kantong berisi 4 permen menjadi 4 × 4 = 16.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang perkalian dasar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Adi minum obat 3 kali sehari, tiap kali 1 tablet. Beni menulis 1 × 3. Tulisan Beni...
A) Tepat, karena totalnya 3 tablet
B) Salah, seharusnya 3 × 1 karena ada 3 waktu minum yang masing-masing 1 tablet
C) Salah, seharusnya 3 + 3 + 3
D) Perkalian tidak boleh dipakai`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti punya 12 permen dibagi rata ke kantong. Kombinasi yang SALAH dan tidak menghasilkan 12...
A) 4 kantong × 3 permen
B) 6 kantong × 2 permen
C) 5 kantong × 2 permen
D) 3 kantong × 4 permen`,
    `[Soal 3 - PG - Tipe: HOTS]
Tiga kantong sama banyak jumlahnya 15. Kalimat perkalian yang tepat...
A) 3 × 5 = 15
B) 5 × 3 = 15
C) 15 × 3 = 5
D) 3 + 15 = 18`,
    `[Soal 4 - PG - Tipe: MOTS]
Lani beli 5 bungkus, tiap bungkus 4 permen. Penjumlahan berulang yang tepat...
A) 5 + 5 + 5 + 5
B) 4 + 4 + 4 + 4 + 4
C) 5 + 4
D) 4 + 5`,
    `[Soal 5 - PG - Tipe: HOTS]
Meja hijau 2 × 6. Meja biru 4 × 3. Pernyataan yang tepat...
A) Permen meja hijau lebih banyak
B) Cerita berbeda, tetapi total permennya sama banyak
C) Bentuk perkalian dan susunan piring sama persis
D) Meja biru lebih banyak`,
    `[Soal 6 - PG - Tipe: LOTS]
7 + 7 + 7 + 7 + 7 = 35 ditulis perkalian...
A) 5 × 7 = 35
B) 7 × 5 wajib saja
C) 7 × 7 = 35
D) 5 + 7 = 12`,
    `[Soal 7 - PG - Tipe: HOTS]
Dodi punya 2 kantong. 10 cokelat dan 6 stroberi dibagi rata. Isi tiap kantong...
A) 8
B) 10
C) 6
D) 16`,
    `[Soal 8 - PG - Tipe: HOTS]
5 anak masing-masing 4 permen, dan 4 bungkus masing-masing 5 permen. Pasangan yang tepat...
A) Kisah 1 = 5 × 4, kisah 2 = 4 × 5
B) Keduanya 4 × 5
C) Keduanya 5 × 4
D) Kisah 1 = 4 × 5, kisah 2 = 5 × 4`,
    `[Soal 9 - PG - Tipe: HOTS]
Riko punya 3 kantong berisi 6. Satu kantong bolong, 2 permen hilang. Sisa permen aman...
A) 16
B) 18
C) 14
D) 12`,
    `[Soal 10 - PG - Tipe: HOTS]
Dua bentuk perkalian berbeda yang hasilnya 8...
A) 2 × 4 dan 4 × 2
B) 3 × 3 dan 2 × 2
C) 8 + 0 dan 4 + 4
D) 5 × 3 dan 2 × 6`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Tamu Ulang Tahun Sani",
      pengantar:
        "🗺️ Tiga sahabat Sani datang bermain. Sani menyiapkan 3 piring, tiap piring 2 permen.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Perkalian angka kembar",
          uraian:
            "🎯 Aku bisa memahami perkalian sebagai penjumlahan berulang angka yang sama. 🎯 Aku bisa mengubah cerita permen menjadi kalimat perkalian.",
          contoh: "Wadah × isi = total.",
        },
        {
          nama: "🗺️ Tamu ulang tahun Sani",
          singkat: "3 piring × 2 permen",
          uraian:
            "Sani menghitung 2 + 2 + 2. Kalau tamunya banyak, menambah terus melelahkan. Ada trik cepat untuk angka kembar.",
          contoh: "Yuk bantu Sani melihat trik angka kembar!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ada berapa sahabat Sani yang datang bermain?",
          alias: ["3", "tiga", "tiga sahabat"],
        },
        {
          pertanyaan: "2. Tiap piring Sani berisi berapa permen?",
          alias: ["2", "dua", "dua permen"],
        },
        {
          pertanyaan: "3. Sani menghitung dengan cara apa sebelum tahu perkalian?",
          alias: ["tambah", "ditambah", "penjumlahan", "dua ditambah dua"],
        },
      ],
      voice: [
        [
          "Hari ini tiga sahabat Sani datang bermain. Sani menyiapkan tiga piring kecil. Tiap piring diisi dua permen.",
          "Sani menghitung dua ditambah dua, lalu ditambah dua lagi. Kalau tamunya banyak, menambah terus melelahkan. Yuk, kita bantu Sani melihat trik angka kembar!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Kotak Permen Kembar",
      pengantar:
        "🍽️ 2 + 2 + 2 = 6. Angka 2 muncul 3 kali. Penjumlahan berulang angka kembar disebut perkalian: 3 × 2 = 6.",
      labelDaftar: "Penjumlahan berulang dan rumus wadah kali isi",
      kolom: 1,
      item: [
        {
          nama: "🍽️ Penjumlahan berulang",
          singkat: "2 + 2 + 2 = 6",
          uraian:
            "Tiga piring, tiap piring 2 permen. Angka 2 ditulis berulang 3 kali. Namanya perkalian.",
          contoh: "2 + 2 + 2 = 6.",
        },
        {
          nama: "✍️ Rumus kotak rahasia",
          singkat: "3 × 2 = 6",
          uraian:
            "Jumlah wadah atau piring dikali isi permen per piring. 3 × 2 = 6. Dibaca tiga dikali dua sama dengan enam.",
          contoh: "Wadah × isi = total.",
        },
        {
          nama: "⚠️ Posisi tidak boleh terbalik",
          singkat: "3 × 2 berbeda dengan 2 × 3",
          uraian:
            "3 × 2 artinya 3 piring berisi 2. 2 × 3 artinya 2 piring berisi 3. Total sama 6, tetapi ceritanya berbeda.",
          contoh: "Cerita berbeda, total bisa sama.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 2 + 2 + 2 ditulis perkalian berapa?",
          alias: ["3 × 2", "3x2", "3 kali 2", "tiga dikali dua"],
        },
        {
          pertanyaan: "2. 3 × 2 artinya ada berapa piring?",
          alias: ["3", "tiga", "3 piring"],
        },
        {
          pertanyaan: "3. 3 × 2 dan 2 × 3 hasilnya sama, tetapi ceritanya?",
          alias: ["berbeda", "beda", "tidak sama", "lain"],
        },
      ],
      voice: [
        [
          "Lihat tiga piring Sani. Dua ditambah dua ditambah dua sama dengan enam. Angka dua muncul tiga kali. Itu perkalian. Tiga dikali dua sama dengan enam.",
          "Rumus kotak rahasia: jumlah wadah dikali isi tiap wadah. Tiga piring kali dua permen sama dengan enam.",
        ],
        [
          "Hati-hati. Tiga kali dua artinya tiga piring berisi dua. Dua kali tiga artinya dua piring berisi tiga. Totalnya sama enam, tetapi ceritanya berbeda.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Kantong Hadiah",
      pengantar:
        "🕵️‍♂️ Ada 4 kantong. Tiap kantong berisi 4 permen. Hitung angka kembar, jumlah kantong, lalu tulis penjumlahan dan perkaliannya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "4 × 4 = 16",
          uraian:
            "Angka kembar 4. Kantong ada 4. 4 + 4 + 4 + 4 = 16. Perkalian 4 × 4 = 16.",
          contoh: "4 × 4 = 16.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Seru banget, ternyata perkalian itu mudah! 😐 Sedikit bingung membedakan angka depan dan belakang. 😢 Masih butuh bantuan menulis lambang perkalian.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Angka kembar pada kantong hadiah berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "2. Ada berapa kantong seluruhnya?",
          alias: ["4", "empat", "4 kantong"],
        },
        {
          pertanyaan: "3. 4 kantong berisi 4 permen sama dengan berapa?",
          alias: ["16", "enam belas"],
        },
      ],
      voice: [
        [
          "Yuk jadi detektif kantong hadiah. Ada empat kantong. Tiap kantong berisi empat permen. Angka kembarnya empat. Kantongnya ada empat.",
          "Empat ditambah empat ditambah empat ditambah empat sama dengan enam belas. Perkaliannya empat dikali empat sama dengan enam belas.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Ubah cerita obat, kantong, dan piring Sani, Siti, Lani, Dodi, serta Riko menjadi perkalian.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Obat Adi 3 × 1. Kombinasi salah 5 × 2. Tiga kantong 15 adalah 3 × 5. Lani 4+4+4+4+4. Meja hijau dan biru totalnya sama.",
          contoh: "3 × 1. 5 × 2 salah.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "5 × 7 = 35. Tiap kantong Dodi 8. Kisah 1 = B, kisah 2 = A. Sisa Riko 16. Dua bentuk 2 × 4 dan 4 × 2.",
          contoh: "5 × 7, 8, 16.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Obat 3 kali sehari 1 tablet ditulis perkalian?", alias: ["3 × 1", "3x1", "3 kali 1"] },
        { pertanyaan: "2. Kombinasi yang tidak menghasilkan 12?", alias: ["5 × 2", "5x2", "10"] },
        { pertanyaan: "3. Tiga kantong sama banyak jumlah 15?", alias: ["3 × 5", "3x5"] },
        { pertanyaan: "4. 5 bungkus berisi 4, penjumlahan berulangnya?", alias: ["4 + 4 + 4 + 4 + 4"] },
        { pertanyaan: "5. 2 × 6 dan 4 × 3 totalnya?", alias: ["sama", "sama banyak", "12"] },
        { pertanyaan: "6. 7 + 7 + 7 + 7 + 7 ditulis perkalian?", alias: ["5 × 7", "5x7"] },
        { pertanyaan: "7. Isi tiap kantong Dodi?", alias: ["8", "delapan"] },
        { pertanyaan: "8. 5 anak masing-masing 4, perkaliannya?", alias: ["5 × 4", "5x4"] },
        { pertanyaan: "9. 3 kantong isi 6, hilang 2, sisa?", alias: ["16"] },
        { pertanyaan: "10. Dua perkalian berbeda yang hasilnya 8?", alias: ["2 × 4", "4 × 2", "1 × 8", "8 × 1"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Obat Adi tiga kali satu tablet, ditulis 3 kali 1. Lima kantong kali dua tidak sama dengan 12. Tiga kantong jumlah 15 artinya 3 kali 5.",
          "Lani lima bungkus berisi empat, jadi empat ditambah berulang lima kali. Dua kali enam dan empat kali tiga totalnya sama 12.",
        ],
        [
          "Tujuh ditambah lima kali sama dengan 5 kali 7. Kantong Dodi masing-masing 8. Lima anak kali empat, empat bungkus kali lima. Sisa Riko 16. Dua bentuk untuk 8: 2 kali 4 dan 4 kali 2.",
        ],
      ],
    },
  ],
};
