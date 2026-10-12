import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB3 = "Bab 3: Pengurangan sampai dengan 10";
export const JUDUL_MTK1_BAB3_LAMA = "Bab 3: Pengurangan sampai 10";

export const MODUL_MTK1_BAB3: ModulResmiPai = {
  id: "mtk-1-bab3",
  judul: JUDUL_MTK1_BAB3,
  pola: /pengurangan\s+sampai(\s+dengan)?\s+10\b|pesta ulang tahun yang hilang|toko roti miko/,
  motivasi:
    "Malam pesta, balon Nia terbang. Bersama Fajar dan Miko, hitung yang hilang, lalu cari sisanya sampai 10.",
  kunciJawaban: "A,B,B,C,B,A,C,C,B,C",
  sketsaKartu: [
    "Nia dan Fajar di pesta ulang tahun. Delapan balon, tiga terbang, sisa lima. Miko si tikus menjelaskan tanda kurang.",
    "Cara mengurangi: hitung sisa, hitung mundur, pakai jari, dan saudara dari penjumlahan.",
    "Toko roti Miko: rak roti, nota simbol, dan cerita pelanggan.",
    "Poin penting dan lembar evaluasi pengurangan sampai 10.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Ada 8 balon. Sebanyak 3 balon terbang. Sisa balon adalah...
A) 5
B) 3
C) 8
D) 11`,
    `[Soal 2 - PG - Tipe: LOTS]
Ada 6 potong kue. Fajar makan 2 potong. Sisanya...
A) 8 potong
B) 4 potong
C) 2 potong
D) 6 potong`,
    `[Soal 3 - PG - Tipe: LOTS]
Tanda kurang (–) artinya...
A) Digabung
B) Diambil atau dipisah
C) Sama banyak
D) Ditambah`,
    `[Soal 4 - PG - Tipe: LOTS]
Ada 9 topi. Tamu mengambil 4 topi. Sisa topi adalah...
A) 13
B) 4
C) 5
D) 9`,
    `[Soal 5 - PG - Tipe: HOTS]
7 – 3 = ...
A) 10
B) 4
C) 3
D) 7`,
    `[Soal 6 - PG - Tipe: HOTS]
Ada 10 permen. Kamu makan 4 permen. Sisa permen adalah...
A) 6
B) 14
C) 4
D) 0`,
    `[Soal 7 - PG - Tipe: HOTS]
5 – 0 = ...
A) 0
B) 4
C) 5
D) 6`,
    `[Soal 8 - PG - Tipe: HOTS]
Kartu yang sisanya berbeda adalah...
A) 8 – 3
B) 6 – 1
C) 9 – 5
D) 7 – 2`,
    `[Soal 9 - PG - Tipe: HOTS]
Fajar punya 8 kue dan memberi 5 kue. Sisanya...
A) 13
B) 3
C) 5
D) 8`,
    `[Soal 10 - PG - Tipe: HOTS]
Nia punya 6 stiker dan memberikan semuanya. Sisa stiker Nia adalah...
A) 6
B) 1
C) 0
D) 12`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Pesta Ulang Tahun yang Hilang",
      pengantar:
        "Angin membawa 3 balon Nia. Dulu ada 8, yang hilang 3, sisa 5. Tanda kurang artinya diambil atau dipisahkan.",
      labelDaftar: "Balon terbang dan kue yang dimakan",
      kolom: 1,
      item: [
        {
          nama: "Balon terbang",
          singkat: "8 balon kurang 3",
          uraian:
            "Nia menghitung 8 balon. Angin membawa 3 balon. Yang tersisa dihitung satu, dua, tiga, empat, lima. Delapan kurang tiga sama dengan lima.",
          contoh: "8 - 3 = 5",
        },
        {
          nama: "Kue dan topi",
          singkat: "6 kurang 2, dan 9 kurang 4",
          uraian:
            "Fajar makan 2 potong dari 6 kue. Sisanya 4. Dari 9 topi, tamu mengambil 4. Sisanya 5.",
          contoh: "6 - 2 = 4",
        },
      ],
      kuis: [
        {
          pertanyaan: "Ada 6 balon. Dua balon terbang. Sisa berapa?",
          alias: ["4", "empat"],
        },
      ],
      voice: [
        [
          "Malam pesta di rumah Nia. Ada delapan balon di dinding.",
          "Angin membawa tiga balon. Delapan kurang tiga sama dengan lima.",
          "Tanda kurang artinya diambil atau dipisahkan. Jumlahnya jadi lebih sedikit.",
          "Enam kue dikurangi dua menjadi empat. Sembilan topi dikurangi empat menjadi lima.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Mengurangi!",
      pengantar:
        "Mengurangi artinya mengambil sebagian. Hitung yang tersisa, hitung mundur, atau lipat jari.",
      labelDaftar: "Cara mengurangi sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Hitung yang tersisa",
          singkat: "7 bintang kurang 3",
          uraian: "Coret yang diambil, lalu hitung yang tidak dicoret. Tujuh kurang tiga sama dengan empat.",
          contoh: "7 - 3 = 4",
        },
        {
          nama: "Hitung mundur",
          singkat: "9 kurang 4",
          uraian: "Simpan 9, lalu lompat mundur empat kali: delapan, tujuh, enam, lima.",
          contoh: "9 - 4 = 5",
        },
        {
          nama: "Kurang nol",
          singkat: "5 kurang 0",
          uraian: "Tidak ada yang diambil, jadi jumlahnya tetap. Lima kurang nol sama dengan lima.",
          contoh: "5 - 0 = 5",
        },
      ],
      kuis: [
        {
          pertanyaan: "Cocokkan gambar ikan, permen, dan burung dengan kalimat pengurangannya.",
          alias: ["6 - 2 = 4", "4 - 1 = 3", "9 - 5 = 4"],
        },
        {
          pertanyaan: "Susun balok menjadi 7 kurang 5 sama dengan 2, atau 7 kurang 2 sama dengan 5.",
          alias: ["7 - 5 = 2", "7 - 2 = 5"],
        },
        {
          pertanyaan: "Kartu yang sisanya berbeda adalah 9 kurang 5.",
          alias: ["c", "9 - 5", "empat"],
        },
        {
          pertanyaan: "Ada 10 permen. Kamu makan 4. Sisa berapa?",
          alias: ["6", "enam"],
        },
      ],
      voice: [
        [
          "Mengurangi artinya mengambil sebagian. Yang hilang membuat jumlah jadi lebih sedikit.",
          "Tanya dulu: semuanya berapa, yang diambil berapa, sisanya berapa.",
          "Hitung mundur dari angka yang besar.",
          "Lima tambah tiga sama dengan delapan, jadi delapan kurang tiga sama dengan lima.",
          "Kurang nol, angkanya tetap.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Toko Roti Miko",
      pengantar:
        "Jadilah penjaga toko. Setiap pelanggan membeli roti, hitung yang tersisa. Sepuluh roti membuka cabang baru.",
      labelDaftar: "Menghitung roti yang tersisa",
      kolom: 1,
      item: [
        {
          nama: "Tiga level toko",
          singkat: "Rak, nota, dan cerita",
          uraian:
            "Rak punya 7 roti, pelanggan membeli 3, sisa 4. Nota 9 kurang 4 sama dengan 5. Donat 5 dikurangi 2 yang rusak sama dengan 3.",
          contoh: "5 - 2 = 3",
        },
        {
          nama: "Pelanggan",
          singkat: "Ramah atau buru-buru",
          uraian:
            "Pelanggan ramah memberi soal mudah dan 1 roti. Pelanggan buru-buru memberi soal cerita dan 3 roti. Jawaban yang belum tepat membuat lonceng berbunyi, roti kembali ke rak.",
          contoh: "10 - 4 = 6",
        },
      ],
      kuis: [
        {
          pertanyaan: "Tujuh roti, dibeli 3. Sisa berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "Lengkapi 9 kurang 4 sama dengan 5.",
          alias: ["9 - 4 = 5", "9-4=5"],
        },
        {
          pertanyaan: "Lima donat, 2 rusak. Berapa yang masih bagus?",
          alias: ["3", "tiga", "5 - 2 = 3"],
        },
        {
          pertanyaan: "Sembilan donat, dibeli 3. Sisa berapa?",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Pilih pelanggan ramah, 4 kurang 1, atau pelanggan buru-buru, 8 kurang 3.",
          alias: ["3", "tiga", "5", "lima"],
        },
      ],
      voice: [
        [
          "Kamu menjaga toko roti Miko.",
          "Di rak ada tujuh roti. Pelanggan membeli tiga. Sisanya empat.",
          "Di nota, tulis tanda kurang dan sama dengan.",
          "Lima donat, dua jatuh. Yang masih bagus tiga.",
          "Kalau jawaban belum tepat, lonceng berbunyi dan roti kembali ke rak. Kumpulkan 10 roti untuk membuka cabang baru.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Poin Penting dan Lembar Evaluasi",
      pengantar:
        "Kurang artinya diambil. Semuanya, yang diambil, lalu sisa. Selesaikan sepuluh misi pengurangan.",
      labelDaftar: "Evaluasi pengurangan sampai 10",
      kolom: 1,
      item: [
        {
          nama: "Kalimat kunci",
          singkat: "Kurang artinya diambil",
          uraian:
            "Kurang artinya diambil atau dipisah. Hitung mundur dari yang besar. Kurang nol tetap sama. Tambah dan kurang itu saudara.",
          contoh: "7 - 0 = 7",
        },
      ],
      kuis: [
        { pertanyaan: "Sembilan permen, 4 dicoret. Sisa berapa?", alias: ["5", "lima"] },
        { pertanyaan: "Tujuh balon, 4 meletus. Tuliskan kalimatnya.", alias: ["7 - 4 = 3", "7-4=3"] },
        { pertanyaan: "Delapan kurang berapa sama dengan lima?", alias: ["3", "tiga"] },
        { pertanyaan: "Fajar berkata 9 kurang 4 sama dengan 6. Apakah Fajar benar?", alias: ["salah", "5", "lima"] },
        { pertanyaan: "Tuliskan dua pengurangan berbeda yang hasilnya 4.", alias: ["5 - 1 = 4", "6 - 2 = 4"] },
        { pertanyaan: "Nia punya 6 stiker dan memberi semuanya. Sisa berapa?", alias: ["c", "0", "nol"] },
        { pertanyaan: "Sepuluh bunga, 6 terjual. Sisa berapa?", alias: ["4", "empat", "10 - 6 = 4"] },
        { pertanyaan: "Pasangkan kartu pengurangan yang hasilnya sama.", alias: ["10 - 6", "6 - 2"] },
        { pertanyaan: "Sembilan boneka, 5 anak mengambil satu. Berapa yang tidak terambil?", alias: ["4", "empat"] },
        { pertanyaan: "Buat cerita dari 8 anak ayam, 3 pergi, lalu sebutkan sisanya.", alias: ["5", "lima", "8", "3"] },
      ],
      voice: [
        [
          "Kurang artinya diambil atau dipisah.",
          "Tanya: semuanya berapa, yang diambil berapa, sisanya berapa.",
          "Sembilan kurang empat: delapan, tujuh, enam, lima.",
          "Tujuh kurang nol tetap tujuh.",
          "Pada soal cerita, cari angkanya, cari kata kunci kurang, lalu hitung mundur.",
        ],
      ],
    },
  ],
};
