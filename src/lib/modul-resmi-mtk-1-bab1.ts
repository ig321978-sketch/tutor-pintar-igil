import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB1 = "Bab 1: Ayo Membilang sampai dengan 10";
export const JUDUL_MTK1_BAB1_LAMA = "Bab 1: Ayo Berhitung!";

export const MODUL_MTK1_BAB1: ModulResmiPai = {
  id: "mtk-1-bab1",
  judul: JUDUL_MTK1_BAB1,
  pola: /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10\b|permen warna-warni sani/,
  motivasi:
    "Hore! Kamu sudah membantu Sani menghitung permen warna-warni sampai 10. Hitung, bandingkan, lalu cari pasangan angkanya.",
  kunciJawaban: "B,B,A,B,A,B,B,B,B,B",
  sketsaKartu: [
    "Paman membuka kotak kayu berisi permen merah, hijau, dan biru untuk Sani.",
    "Sani membandingkan 4 permen merah dan 2 permen hijau, lalu mengurai 5 permen biru.",
    "Anak menghitung 6 permen dan 4 permen hijau, lalu membagi 4 permen sama rata.",
    "Anak mengisi lembar kerja tantangan juara membilang sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Sani menghitung 5 permen dan berkata: "Satu, dua, tiga, lima! Ada 5 permen!" Angka berapa yang lupa diucapkan?
A) Angka 2
B) Angka 4
C) Angka 3`,
    `[Soal 2 - PG - Tipe: HOTS]
Siti punya 6 permen dan ingin membaginya sama banyak kepada dua adik. Pembagian yang adil adalah...
A) 4 dan 2
B) 3 dan 3
C) 5 dan 1`,
    `[Soal 3 - PG - Tipe: HOTS]
Mangkuk Sani ada 7 permen. Mangkuk Riko ada 4 permen. Agar sama banyak dengan Riko, Sani harus...
A) Mengeluarkan 3 permen
B) Menambahkan 3 permen
C) Memindahkan semua permen Riko`,
    `[Soal 4 - PG - Tipe: MOTS]
Ada 8 permen hijau. Lambang angka dan nama bilangannya adalah...
A) Angka 6 dibaca enam
B) Angka 8 dibaca delapan
C) Angka 7 dibaca tujuh`,
    `[Soal 5 - PG - Tipe: HOTS]
Hitung mundur: 7, 6, 5, bintang, 3. Angka pada bintang adalah...
A) Angka 4
B) Angka 2
C) Angka 1`,
    `[Soal 6 - PG - Tipe: LOTS]
Dua kelompok yang jumlahnya persis sama disebut...
A) Lebih banyak
B) Sama banyak
C) Lebih sedikit`,
    `[Soal 7 - PG - Tipe: HOTS]
Aktivitas mundur: (2) 5, 4, 3, 2 dan (4) 4, 3, 2, 1. Nomor yang termasuk hitung mundur adalah...
A) 1 dan 3
B) 2 dan 4
C) 1 dan 2`,
    `[Soal 8 - PG - Tipe: HOTS]
Makin besar disebut hitung maju. Makin kecil disebut hitung mundur. Pasangannya...
A) Kisah 1 huruf A, kisah 2 huruf B
B) Kisah 1 huruf B, kisah 2 huruf A
C) Kisah 1 huruf A, kisah 2 huruf A`,
    `[Soal 9 - PG - Tipe: HOTS]
Pasangan angka 4. Kantong kiri berisi 1 permen. Kantong kanan harus berisi...
A) 1 permen
B) 3 permen
C) 4 permen`,
    `[Soal 10 - PG - Tipe: HOTS]
Kantong kuning: 4, 3, dan 2 permen. Jumlah seluruhnya...
A) 7
B) 9
C) 10`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Permen Warna-Warni Sani",
      pengantar:
        "🗺️ Paman datang membawa kotak hadiah besar untuk Sani. Di dalamnya ada permen manis berwarna-warni.",
      labelDaftar: "Target dan cerita kotak mainan",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Membilang sampai 10",
          uraian:
            "🎯 Aku bisa menghitung, membaca, dan menulis angka 1 sampai 10. 🎯 Aku bisa membandingkan banyak benda serta menghitung maju dan mundur. 🎯 Aku bisa menemukan pasangan bilangan pembentuk angka.",
          contoh: "Hitung, bandingkan, lalu cari pasangannya.",
        },
        {
          nama: "🗺️ Kotak mainan dari Paman",
          singkat: "Permen warna-warni",
          uraian:
            "Saat kotak dibuka, ada permen merah di wadah plastik, permen hijau yang berkumpul rapi, dan permen biru di atas meja. Ada kelompok yang banyak dan ada yang sedikit.",
          contoh: "Yuk bantu Sani menghitung dan memisahkan permen.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang membawa kotak hadiah untuk Sani?",
          alias: ["paman"],
        },
        {
          pertanyaan: "2. Siapa yang membuka kotak hadiah itu?",
          alias: ["sani"],
        },
        {
          pertanyaan: "3. Apa isi kotak hadiah Paman?",
          alias: ["permen", "permen manis", "permen warna-warni"],
        },
      ],
      voice: [
        [
          "Hari ini Paman datang membawa sebuah kotak hadiah besar untuk Sani. Saat kotaknya dibuka, mata Sani takjub.",
          "Ada permen merah di wadah plastik, permen hijau yang berkumpul rapi, dan permen biru di atas meja.",
          "Sani berkata, wah, permennya banyak sekali. Warnanya beda-beda. Yuk, kita bantu Sani menghitung, mengurutkan, dan memisahkan permen ini.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Empat Aturan Rahasia Permen Sani",
      pengantar:
        "📐 Sebelum merapikan jajanan, kenali empat aturan: menghitung dan menulis, membandingkan, maju mundur, dan pasangan bilangan.",
      labelDaftar: "Lambang, perbandingan, maju mundur, pasangan",
      kolom: 1,
      item: [
        {
          nama: "A. Menghitung, membaca, dan menulis",
          singkat: "1 sampai 10",
          uraian:
            "🍬 satu, 🍬🍬 dua, 🍬🍬🍬 tiga, sampai 10 permen dibaca sepuluh. Hitung sambil menunjuk, lalu tulis lambangnya.",
          contoh: "5 permen dibaca lima.",
        },
        {
          nama: "B. Membandingkan banyak benda",
          singkat: "4 lebih banyak dari 2",
          uraian:
            "Wadah merah ada 4 permen. Wadah hijau ada 2 permen. 4 lebih banyak dari 2. 2 lebih sedikit dari 4.",
          contoh: "Merah lebih banyak.",
        },
        {
          nama: "C. Menghitung maju dan mundur",
          singkat: "1 sampai 10 dan kembali",
          uraian:
            "Maju: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Mundur: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1.",
          contoh: "Maju makin besar. Mundur makin kecil.",
        },
        {
          nama: "D. Pasangan bilangan",
          singkat: "5 = 3 dan 2",
          uraian:
            "5 permen biru dipecah menjadi 3 dan 2. Jika disatukan kembali, jumlahnya tetap 5.",
          contoh: "3 dan 2 pasangan angka 5.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lima permen ditulis dengan lambang berapa?",
          alias: ["5", "lima"],
        },
        {
          pertanyaan: "2. 4 permen merah dibanding 2 permen hijau. Merah lebih apa?",
          alias: ["banyak", "lebih banyak"],
        },
        {
          pertanyaan: "3. Angka 3 dan 2 adalah pasangan dari angka berapa?",
          alias: ["5", "lima"],
        },
      ],
      voice: [
        [
          "Aturan pertama: hitung permen satu per satu, baca namanya, lalu tulis lambangnya. Satu, dua, tiga, empat, lima, sampai sepuluh.",
          "Aturan kedua: bandingkan dua kelompok. Empat permen merah lebih banyak dari dua permen hijau.",
        ],
        [
          "Aturan ketiga: hitung maju dari 1 sampai 10, angkanya makin besar. Hitung mundur dari 10 sampai 1, angkanya makin kecil.",
          "Aturan keempat: 5 permen biru bisa dipecah menjadi 3 dan 2. Tiga dan dua adalah pasangan angka 5.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Permen Manis",
      pengantar:
        "🕵️‍♂️ Kelompok A ada 6 permen. Kelompok B ada 4 permen hijau. B lebih sedikit, dan 4 permen dibagi sama rata menjadi 2 dan 2.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "6 dan 4 permen",
          uraian:
            "Kelompok A ada 6 permen, dibaca enam. Kelompok B ada 4 permen hijau, lebih sedikit dari A. Empat permen diurai sama rata menjadi 2 dan 2.",
          contoh: "6 enam, 4 sedikit, 2 dan 2.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Seru sekali, sekarang aku sudah bisa menghitung maju mundur sampai angka 10. 😐 Sedikit bingung saat mencari pasangan angka yang nilainya besar. 😢 Aku masih butuh bantuan tutor untuk menulis lambang angka 6 sampai 10.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kelompok A ada berapa permen?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "2. Kantong B lebih banyak atau lebih sedikit daripada kantong A?",
          alias: ["sedikit", "lebih sedikit"],
        },
        {
          pertanyaan: "3. Empat permen dibagi sama rata. Masing-masing kantong berisi berapa?",
          alias: ["2", "dua", "2 dan 2"],
        },
      ],
      voice: [
        [
          "Ayo jadi detektif permen. Kelompok A ada enam permen. Dibaca enam.",
          "Kelompok B ada empat permen hijau. Empat lebih sedikit dari enam. Jika empat dibagi sama rata, masing-masing kantong berisi dua.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Kerja Siswa",
      pengantar:
        "📝 Tantangan para juara! Bab 1 Ayo Membilang sampai dengan 10. Hitung dengan teliti, lalu tulis jawaban akhirmu.",
      labelDaftar: "LKS pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Lima pilihan ganda",
          uraian:
            "Sani lupa angka 4. Enam permen dibagi 3 dan 3. Sani mengeluarkan 3 permen agar sama dengan Riko. Delapan permen dibaca delapan. Bintang pada 7, 6, 5, bintang, 3 adalah 4.",
          contoh: "Jawaban B, B, A, B, A.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Lima isian",
          uraian:
            "Jumlah yang sama disebut sama banyak. Hitung mundur ada pada nomor 2 dan 4. Kisah makin besar berpasangan dengan B, makin kecil dengan A. Pasangan 4 dan 1 adalah 3. Total permen kuning 9.",
          contoh: "Sama banyak, 2 dan 4, B dan A, 3, 9.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Angka yang lupa diucapkan Sani?", alias: ["4", "empat", "b"] },
        { pertanyaan: "2. Pembagian 6 permen yang adil?", alias: ["3 dan 3", "3", "b"] },
        { pertanyaan: "3. Apa yang harus dilakukan Sani agar sama dengan Riko?", alias: ["mengeluarkan 3", "3", "a"] },
        { pertanyaan: "4. Lambang untuk 8 permen hijau?", alias: ["8", "delapan", "b"] },
        { pertanyaan: "5. Angka pada bintang di pola 7, 6, 5, bintang, 3?", alias: ["4", "empat", "a"] },
        { pertanyaan: "6. Dua kelompok yang jumlahnya sama disebut apa?", alias: ["sama banyak"] },
        { pertanyaan: "7. Nomor aktivitas hitung mundur?", alias: ["2 dan 4", "2, 4", "2 4"] },
        { pertanyaan: "8. Kisah makin besar berpasangan dengan huruf apa?", alias: ["b", "hitung maju"] },
        { pertanyaan: "9. Kantong kanan untuk pasangan angka 4 jika kiri berisi 1?", alias: ["3", "tiga"] },
        { pertanyaan: "10. Jumlah 4, 3, dan 2 permen kuning?", alias: ["9", "sembilan"] },
      ],
      voice: [
        [
          "Ini lembar kerja tantangan para juara. Sani lupa mengucapkan angka 4. Enam permen dibagi adil menjadi 3 dan 3.",
          "Sani mengeluarkan 3 permen agar sama dengan Riko. Delapan permen dibaca delapan. Bintang pada hitung mundur adalah angka 4.",
        ],
        [
          "Jumlah yang sama disebut sama banyak. Hitung mundur ada pada nomor 2 dan 4.",
          "Makin besar itu hitung maju, huruf B. Makin kecil itu hitung mundur, huruf A. Pasangan yang hilang adalah 3. Total permen kuning adalah 9.",
        ],
      ],
    },
  ],
};
