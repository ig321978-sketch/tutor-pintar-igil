import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK6_BAB4 = "Bab 4: Peluang";

export const MODUL_MTK6_BAB4: ModulResmiPai = {
  id: "mtk-6-bab4",
  judul: JUDUL_MTK6_BAB4,
  pola: /^bab 4: peluang$/,
  motivasi:
    "Bab ini memakai skala peluang mustahil, kecil, seimbang, besar, dan pasti, lalu membandingkan peluang dengan pecahan.",
  kunciJawaban: "D,A,C,B",
  sketsaKartu: [
    "Skala peluang dari 0 sampai 1.",
    "Membandingkan peluang pada permainan.",
    "Membandingkan peluang dari data sehari-hari.",
    "Tiket emas karnaval dan lembar evaluasi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Kantong berisi 6 bola merah saja. Mengambil 1 bola merah termasuk...
A) mustahil
B) kecil
C) seimbang
D) pasti`,
    `[Soal 2 - PG - Tipe: MOTS]
Roda 8 sektor: 5 hijau, 2 kuning, 1 ungu. Warna dengan peluang terbesar...
A) hijau
B) kuning
C) ungu
D) semuanya sama`,
    `[Soal 3 - PG - Tipe: MOTS]
Kotak X 2 merah dan 6 biru. Kotak Y 4 merah dan 4 biru. Kotak Z 6 merah dan 2 biru. Peluang merah terbesar...
A) X
B) Y
C) Z
D) semuanya sama`,
    `[Soal 4 - PG - Tipe: HOTS]
Stan A menang 1 dari 3. Stan B menang 2 dari 5. Stan C menang 3 dari 8. Stan terbaik...
A) Stan A
B) Stan B
C) Stan C
D) semua sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Skala peluang",
      pengantar:
        "Peluang mengukur seberapa mungkin kejadian terjadi. Nilainya dari 0 sampai 1: mustahil, kecil, seimbang, besar, dan pasti.",
      item: [
        {
          nama: "Mustahil",
          uraian: "Peluangnya 0. Dadu biasa tidak punya angka 8.",
        },
        {
          nama: "Seimbang",
          uraian: "Peluangnya 1/2. Koin punya dua sisi yang sama mungkin muncul.",
        },
        {
          nama: "Pasti",
          uraian: "Peluangnya 1. Dadu biasa selalu muncul angka kurang dari 7.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Besok matahari terbit dari timur. Skala peluangnya apa?",
          alias: ["pasti"],
        },
      ],
      voice: [["Selamat datang di Karnaval Kota Ceria. Peluang punya lima tingkat."]],
    },
    {
      kode: "B",
      judul: "B. Membandingkan peluang",
      pengantar:
        "Peluang sama dengan hasil yang diinginkan dibagi semua hasil. Samakan penyebut, lalu bandingkan pembilang.",
      item: [
        {
          nama: "Roda 8 sektor",
          uraian: "Merah 4/8 = 1/2, biru 3/8, kuning 1/8. Merah paling besar.",
        },
        {
          nama: "Dua kantong",
          uraian: "2/5 = 16/40 dan 3/8 = 15/40. Peluang 2/5 lebih besar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Roda punya 8 sektor dan 4 sektor merah. Berapa peluangnya?",
          alias: ["4 8", "setengah", "1 2"],
        },
      ],
      voice: [["Tulis peluang sebagai pecahan, lalu samakan penyebutnya."]],
    },
    {
      kode: "C",
      judul: "C. Tiket emas",
      pengantar: "Pilih pilihan dengan peluang terbesar. Sepuluh stan, tiap benar 10 poin. Tiket emas terbuka pada 70 poin.",
      item: [
        {
          nama: "Dadu genap",
          uraian: "Angka genap 3/6. Angka 5 atau lebih hanya 2/6. Genap lebih besar.",
        },
      ],
      kuis: [],
      voice: [["Kumpulkan 70 poin untuk tiket emas."]],
    },
    {
      kode: "D",
      judul: "D. Poin penting",
      pengantar:
        "Peluang hanya menunjukkan kemungkinan, bukan kepastian. Banyak hasil yang diinginkan belum cukup. Lihat juga jumlah semua hasil.",
      item: [
        {
          nama: "Rumus",
          uraian: "Peluang = hasil yang diinginkan dibagi semua hasil.",
        },
      ],
      kuis: [],
      voice: [["Ini kalimat kunci bab Peluang."]],
    },
  ],
};
