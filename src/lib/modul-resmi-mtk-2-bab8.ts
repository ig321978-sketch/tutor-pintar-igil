import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB8 = "Bab 8: Diagram Gambar Sederhana";

export const MODUL_MTK2_BAB8: ModulResmiPai = {
  id: "mtk-2-bab8",
  judul: JUDUL_MTK2_BAB8,
  pola:
    /diagram gambar sederhana|papan prestasi sani|membaca piktogram|kunci membaca piktogram|banyaknya air|mengumpulkan dan membaca data/,
  motivasi:
    "Hore! Kamu sudah membantu Lani membaca papan stiker Sani. Jangan hanya hitung gambar. Kalikan jumlah gambar dengan nilai kunci. 3 🍬 × 10 = 30.",
  kunciJawaban: "B,A,B,A,B,A,A,A,A,A",
  sketsaKartu: [
    "Sani menempel stiker permen di papan penjualan tiga hari.",
    "Setiap 🍬 bernilai 10. Senin 30, Selasa 50, Rabu 20.",
    "Anak membaca diagram donat: cokelat 4 × 5 = 20, stroberi 2 × 5 = 10.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang piktogram.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Siti 5 stiker, Dayu 3 stiker, kunci 1 🔵 = 2. Selisih kelereng asli Siti dan Dayu...
A) 2
B) 4
C) 6
D) 8`,
    `[Soal 2 - PG - Tipe: HOTS]
Beni 4 stiker dan Dayu 3 stiker digabung, kunci 1 🔵 = 2. Total kelereng...
A) 14
B) 7
C) 20
D) 5`,
    `[Soal 3 - PG - Tipe: HOTS]
Udin bilang kelereng Siti ada 5 karena stikernya 5. Pendapat yang tepat...
A) Benar, stiker Siti memang 5
B) Salah, 5 × 2 = 10
C) Salah, 5 + 2 = 7
D) Benar jika kunci diabaikan`,
    `[Soal 4 - PG - Tipe: MOTS]
4 stiker balon, kunci 1 🎈 = 10. Total balon asli...
A) 40
B) 14
C) 4
D) 10`,
    `[Soal 5 - PG - Tipe: HOTS]
3 bintang. Kunci A = 5 poin hasilnya 15. Kunci B = 10 poin. Nilai baru...
A) Tetap 15
B) 30
C) 13
D) 8`,
    `[Soal 6 - PG - Tipe: LOTS]
Jumat 4 stiker es krim, kunci 1 🍦 = 5. Terjual...
A) 20
B) 4
C) 9
D) 5`,
    `[Soal 7 - PG - Tipe: HOTS]
Hari paling ramai dan jumlah aslinya...
A) Sabtu 30
B) Jumat 20
C) Kamis 10
D) Sabtu 6`,
    `[Soal 8 - PG - Tipe: HOTS]
Kamis 10 cone, Sabtu 30 cone. Pasangan yang tepat...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
20 mobil asli, 1 🚗 = 5. Stiker yang harus ditempel...
A) 4
B) 5
C) 20
D) 25`,
    `[Soal 10 - PG - Tipe: HOTS]
3 🍬 jumlah aslinya 30. Nilai kunci 1 🍬...
A) 10
B) 30
C) 3
D) 27`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Catatan Rahasia di Lemari Toko",
      pengantar:
        "🗺️ Sani menempel stiker permen di papan penjualan. Lani heran: bagaimana tahu jumlah aslinya jika isinya gambar semua?",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Baca piktogram",
          uraian:
            "🎯 Aku bisa membaca data dalam diagram gambar sederhana. 🎯 Aku bisa menghitung jumlah asli dari nilai kunci gambar.",
          contoh: "Lihat kotak kunci di bawah papan.",
        },
        {
          nama: "🗺️ Catatan rahasia di lemari toko",
          singkat: "Stiker permen di papan",
          uraian:
            "Sani bosan menulis angka. Ia menempel stiker 🍬 di nama hari. Rahasianya ada di kotak petunjuk bawah papan.",
          contoh: "Yuk bantu Lani membaca papan stiker Sani!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sani menempel gambar apa di papan toko?",
          alias: ["permen", "stiker", "stiker permen", "🍬"],
        },
        {
          pertanyaan: "2. Siapa yang heran melihat papan stiker?",
          alias: ["lani"],
        },
        {
          pertanyaan: "3. Rahasia jumlah asli ada di kotak apa?",
          alias: ["kunci", "petunjuk", "keterangan", "kotak kunci"],
        },
      ],
      voice: [
        [
          "Toko permen Sani buka tiga hari. Sani menempel stiker permen di papan, bukan hanya menulis angka.",
          "Lani heran bagaimana tahu jumlah aslinya. Sani bilang rahasianya ada di kotak petunjuk bawah papan. Yuk kita bantu Lani!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Papan Prestasi Sani",
      pengantar:
        "📊 Diagram gambar memakai simbol. Jangan hanya hitung stiker. Kalikan jumlah gambar dengan nilai kunci. Senin 3 × 10 = 30.",
      labelDaftar: "Kunci simbol dan cara hitung",
      kolom: 1,
      item: [
        {
          nama: "📊 Mengenal piktogram",
          singkat: "Data jadi gambar",
          uraian:
            "Diagram gambar menyajikan data dengan simbol supaya rapi dan mudah dibaca anak-anak.",
          contoh: "Stiker 🍬 di baris hari.",
        },
        {
          nama: "🔑 Kotak kunci",
          singkat: "1 🍬 = 10",
          uraian:
            "Cari kotak kunci di bawah diagram. Setiap 1 🍬 bernilai 10 butir permen asli.",
          contoh: "Lihat keterangan dulu.",
        },
        {
          nama: "✍️ Baris × kunci",
          singkat: "3 × 10 = 30",
          uraian:
            "Senin 3 stiker = 30. Selasa 5 stiker = 50. Rabu 2 stiker = 20. Jika kuncinya berubah, hasilnya juga berubah.",
          contoh: "Jumlah gambar × nilai kunci.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Senin ada 3 stiker, kunci 10, jumlah aslinya?",
          alias: ["30"],
        },
        {
          pertanyaan: "2. Selasa ada 5 stiker, kunci 10, jumlah aslinya?",
          alias: ["50"],
        },
        {
          pertanyaan: "3. Cara hitungnya jumlah gambar dikali apa?",
          alias: ["kunci", "10", "nilai kunci"],
        },
      ],
      voice: [
        [
          "Diagram gambar memakai stiker. Jangan hanya menghitung gambar. Lihat kotak kunci di bawah. Setiap permen bernilai sepuluh.",
          "Senin tiga kali sepuluh sama dengan tiga puluh. Selasa lima puluh. Rabu dua puluh.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Diagram Donat",
      pengantar:
        "🕵️‍♂️ Baca stok donat dapur. Kunci: 1 🍩 = 5. Cokelat 4 gambar, stroberi 2 gambar. Kalikan baris dengan kunci.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "Cokelat 20, stroberi 10",
          uraian:
            "Cokelat: 4 × 5 = 20. Stroberi: 2 × 5 = 10. Jumlah gambar dikali nilai kunci.",
          contoh: "4 × 5 = 20. 2 × 5 = 10.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat asyik, gambar kecil punya arti angka besar! 😐 Sedikit bingung jika kuncinya bukan 10. 😢 Sering lupa melihat kotak kunci.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Gambar donat cokelat ada berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "2. Jumlah asli donat cokelat?",
          alias: ["20"],
        },
        {
          pertanyaan: "3. Jumlah asli donat stroberi?",
          alias: ["10"],
        },
      ],
      voice: [
        [
          "Yuk baca diagram donat. Setiap donat bernilai lima. Cokelat empat gambar, empat kali lima sama dengan dua puluh.",
          "Stroberi dua gambar, dua kali lima sama dengan sepuluh.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Baca kunci 🔵 = 2 dan 🍦 = 5. Kalikan dulu, baru bandingkan atau jumlahkan.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Siti 10, Dayu 6, selisih 4. Beni plus Dayu 14. Udin salah, 5 × 2 = 10. Empat balon × 10 = 40. Tiga bintang × 10 = 30.",
          contoh: "Kalikan dulu dengan kunci.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "Jumat 20. Sabtu paling ramai 30. Kamis = B, Sabtu = A. 20 mobil butuh 4 stiker. Kunci Lani 10.",
          contoh: "20. Sabtu 30. 4. 10.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Selisih kelereng Siti dan Dayu?", alias: ["4"] },
        { pertanyaan: "2. Gabungan Beni dan Dayu?", alias: ["14"] },
        { pertanyaan: "3. Kelereng asli Siti, 5 stiker kunci 2?", alias: ["10"] },
        { pertanyaan: "4. 4 balon, kunci 10?", alias: ["40"] },
        { pertanyaan: "5. 3 bintang, kunci 10?", alias: ["30"] },
        { pertanyaan: "6. Jumat 4 stiker, kunci 5?", alias: ["20"] },
        { pertanyaan: "7. Hari paling ramai?", alias: ["sabtu", "30"] },
        { pertanyaan: "8. Kamis dan Sabtu, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. 20 mobil, 1 stiker = 5, berapa stiker?", alias: ["4"] },
        { pertanyaan: "10. 3 gambar jumlah 30, kunci 1 gambar?", alias: ["10"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Satu kelereng biru bernilai dua. Siti sepuluh, Dayu enam, selisih empat. Beni plus Dayu empat belas.",
          "Udin salah, lima dikali dua sama dengan sepuluh. Empat balon kali sepuluh sama dengan empat puluh. Tiga bintang kali sepuluh sama dengan tiga puluh.",
        ],
        [
          "Jumat empat kali lima sama dengan dua puluh. Sabtu paling ramai tiga puluh. Kamis sepuluh, Sabtu tiga puluh. Dua puluh mobil butuh empat stiker. Kunci Lani sepuluh.",
        ],
      ],
    },
  ],
};
