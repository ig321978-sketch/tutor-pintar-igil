import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK6_BAB1 = "Bab 1: Pecahan dan Desimal";

export const MODUL_MTK6_BAB1: ModulResmiPai = {
  id: "mtk-6-bab1",
  judul: JUDUL_MTK6_BAB1,
  pola: /^bab 1: pecahan dan desimal$/,
  motivasi:
    "Bab ini mengikuti urutan buku siswa: permasalahan, eksplorasi, pembahasan, latihan, lalu uji kompetensi.",
  kunciJawaban: "B,C,A,B,C",
  sketsaKartu: [
    "Tujuan, peta konsep, dan perkalian pecahan.",
    "Pembagian pecahan dengan bilangan asli dan sebaliknya.",
    "Mengubah pecahan menjadi desimal, lalu membandingkan dan mengurutkan.",
    "Uji kompetensi bab. Pengayaan pecahan kali pecahan terpisah.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Perjalanan 630 km. Yang sudah ditempuh 2/5 perjalanan. Jarak itu...
A) 126 km
B) 252 km
C) 315 km
D) 630 km`,
    `[Soal 2 - PG - Tipe: MOTS]
Pesanan 100 porsi. Yang selesai 3/4 pesanan. Banyaknya...
A) 25 porsi
B) 50 porsi
C) 75 porsi
D) 100 porsi`,
    `[Soal 3 - PG - Tipe: MOTS]
50 kg beras. Tiap hari terpakai 2/3 kg. Beras itu habis dalam...
A) 75 hari
B) 100 hari
C) 33 hari
D) 150 hari`,
    `[Soal 4 - PG - Tipe: MOTS]
5/8 potong kue dibagi rata ke 4 kotak. Tiap kotak berisi...
A) 5/2
B) 5/32
C) 20/8
D) 4/8`,
    `[Soal 5 - PG - Tipe: MOTS]
Dinding yang sudah dicat 5 4/5 m². Bentuk desimalnya...
A) 5,4
B) 9,5
C) 5,8
D) 4,5`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Perkalian pecahan, sesuai urutan buku.",
      labelDaftar: "A. Perkalian Pecahan",
      kolom: 1,
      item: [
        { nama: "Ember besar", singkat: "Bilangan asli", uraian: "5 × 2 = 10 m².", contoh: "Satu ember besar menyiram 2 m²." },
        { nama: "Ember kecil", singkat: "Asli kali pecahan", uraian: "2 × 3/5 = 6/5 m². 5 × 3/5 = 3 m².", contoh: "Kalikan pembilang. Penyebut tetap." },
        { nama: "Pohon manalagi", singkat: "Pecahan kali asli", uraian: "2/3 × 15 = 10 pohon.", contoh: "Pembilang kali bilangan asli." },
        { nama: "Latihan 1.1", singkat: "Pita, pastel, siswa", uraian: "4 × 3/4 = 3 m. 2/15 × 75 = 10, sisa 65. 1/6 × 180 = 30. 2/3 × 30 = 20. 20/180 = 1/9.", contoh: "1/4 × 20 dan 20 × 1/4 sama-sama 5." },
      ],
      kuis: [
        { pertanyaan: "1/5 kali 2/3.", alias: ["2/15"] },
        { pertanyaan: "2/3 dibagi 2.", alias: ["1/3"] },
        { pertanyaan: "5 kali 2.", alias: ["10"] },
        { pertanyaan: "2 kali 3/5.", alias: ["6/5"] },
        { pertanyaan: "5 kali 3/5.", alias: ["3"] },
        { pertanyaan: "4 kali 3/4.", alias: ["3"] },
        { pertanyaan: "2/15 kali 75.", alias: ["10"] },
        { pertanyaan: "75 dikurangi 10.", alias: ["65"] },
        { pertanyaan: "1/6 kali 180.", alias: ["30"] },
        { pertanyaan: "2/3 kali 30.", alias: ["20"] },
        { pertanyaan: "20 dari 180 sebagai pecahan sederhana.", alias: ["1/9"] },
        { pertanyaan: "Gambar yang menunjukkan 2/3.", alias: ["c", "jeruk"] },
        { pertanyaan: "3 bungkus pizza, tiap bungkus 4 bagian.", alias: ["12"] },
        { pertanyaan: "5 ember, tiap ember 3 liter.", alias: ["15"] },
        { pertanyaan: "5 kotak, tiap kotak 10 pensil.", alias: ["50"] },
        { pertanyaan: "12 apel untuk 4 teman.", alias: ["3"] },
        { pertanyaan: "16 buku untuk 2 rak.", alias: ["8"] },
        { pertanyaan: "15 kue untuk 5 piring.", alias: ["3"] },
        { pertanyaan: "4 gelas kali 2/5 liter.", alias: ["8/5"] },
        { pertanyaan: "2 petak kali 3/4.", alias: ["6/4", "3/2"] },
        { pertanyaan: "5 kantong kali 1/5 kg.", alias: ["1"] },
        { pertanyaan: "3/4 dari 12.", alias: ["9"] },
        { pertanyaan: "2/5 dari 20.", alias: ["8"] },
        { pertanyaan: "1/3 dari 18.", alias: ["6"] },
      ],
      voice: [[
        "Perkalian pecahan. Ember besar: lima kali dua sama dengan sepuluh meter persegi.",
        "Dua ember kecil: dua kali tiga per lima sama dengan enam per lima.",
        "Dua pertiga dari lima belas pohon sama dengan sepuluh.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Pembagian Pecahan",
      pengantar: "Pembagian pecahan, sesuai urutan buku.",
      labelDaftar: "B. Pembagian Pecahan",
      kolom: 1,
      item: [
        { nama: "Air ke gelas", singkat: "Pecahan dibagi asli", uraian: "1 ÷ 3 = 1/3 liter. 1/2 ÷ 3 = 1/6 liter. 1/3 ÷ 3 = 1/9 liter.", contoh: "Kali dengan satu per pembagi." },
        { nama: "Jus ke gelas", singkat: "Asli dibagi pecahan", uraian: "3 ÷ 1/4 = 12. 3 ÷ 1/2 = 6. 3 ÷ 1/5 = 15. 3 ÷ 2/5 = 15/2.", contoh: "Kali dengan kebalikan pecahan." },
        { nama: "Latihan 1.2", singkat: "Tanah, gula, cokelat", uraian: "2/4 ÷ 3 = 1/6. 6 ÷ 3/4 = 8. 5 ÷ 2/3 = 15/2.", contoh: "Cara Rini pada 4/3 ÷ 2 kebetulan sama dengan 2/3." },
      ],
      kuis: [
        { pertanyaan: "1 dibagi 3.", alias: ["1/3"] },
        { pertanyaan: "1/3 dibagi 3.", alias: ["1/9"] },
        { pertanyaan: "3 dibagi 1/2.", alias: ["6"] },
        { pertanyaan: "3 dibagi 1/5.", alias: ["15"] },
        { pertanyaan: "3 dibagi 2/5.", alias: ["15/2"] },
        { pertanyaan: "2/4 dibagi 3.", alias: ["1/6"] },
        { pertanyaan: "6 dibagi 3/4.", alias: ["8"] },
        { pertanyaan: "5 dibagi 2/3.", alias: ["15/2"] },
        { pertanyaan: "Banyak teman Astri yang mendapat bagian penuh.", alias: ["7"] },
        { pertanyaan: "Sisa cokelat Astri.", alias: ["1/3"] },
        { pertanyaan: "3/4 dibagi 2.", alias: ["3/8"] },
        { pertanyaan: "2/3 dibagi 4.", alias: ["1/6"] },
        { pertanyaan: "4/5 dibagi 2.", alias: ["2/5"] },
        { pertanyaan: "2 dibagi 1/2.", alias: ["4"] },
        { pertanyaan: "4 dibagi 1/5.", alias: ["20"] },
        { pertanyaan: "2 dibagi 2/3.", alias: ["3"] },
      ],
      voice: [[
        "Satu liter dibagi tiga gelas sama dengan sepertiga liter.",
        "Tiga liter dibagi gelas seperempat sama dengan dua belas gelas.",
        "Enam kilogram dibagi tiga per empat kilogram sama dengan delapan kue.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Bilangan Desimal",
      pengantar: "Desimal, sesuai urutan buku.",
      labelDaftar: "C. Bilangan Desimal",
      kolom: 1,
      item: [
        { nama: "Pecahan ke desimal", singkat: "Penyebut 10 atau 100", uraian: "1/2 = 0,5 = 0,50. 1/5 = 0,2 = 0,20. 1/10 = 0,1 = 0,10. 3/4 = 0,75.", contoh: "Ubah penyebut menjadi 10 atau 100." },
        { nama: "Lima jarak", singkat: "Nilai tempat", uraian: "Terdekat 0,9 km. Terjauh 3,6 km. Urutan: 0,9, 1,9, 2,3, 2,6, 3,6.", contoh: "2,9 lebih besar dari 2,49." },
        { nama: "Sepuluh siswa", singkat: "Urut jarak", uraian: "Terdekat Andi 1,5 km. Terjauh Musa 11,3 km.", contoh: "Bandingkan dari kiri tanda koma." },
        { nama: "Latihan 1.3", singkat: "Suhu dan lompat", uraian: "Suhu tertinggi 38,5. Lompat terjauh 3,7 m. Lompat terdekat 2,9 m.", contoh: "3/4 meter = 0,75 meter." },
      ],
      kuis: [
        { pertanyaan: "1/2 dalam desimal.", alias: ["0,5"] },
        { pertanyaan: "1/5 dalam desimal.", alias: ["0,2"] },
        { pertanyaan: "Jarak terdekat dari 0,9, 1,9, 2,3, 2,6, dan 3,6.", alias: ["0,9"] },
        { pertanyaan: "Jarak terjauh dari 0,9, 1,9, 2,3, 2,6, dan 3,6.", alias: ["3,6"] },
        { pertanyaan: "Siswa dengan jarak terdekat.", alias: ["1,5"] },
        { pertanyaan: "Siswa dengan jarak terjauh.", alias: ["11,3"] },
        { pertanyaan: "Suhu tertinggi.", alias: ["38,5"] },
        { pertanyaan: "Lompat terjauh.", alias: ["3,7"] },
        { pertanyaan: "Lompat terdekat.", alias: ["2,9"] },
        { pertanyaan: "Zat paling banyak pada label.", alias: ["30"] },
        { pertanyaan: "Zat paling sedikit pada label.", alias: ["0,1"] },
        { pertanyaan: "1/4 dalam desimal.", alias: ["0,25"] },
        { pertanyaan: "2/5 dalam desimal.", alias: ["0,4"] },
        { pertanyaan: "7/10 dalam desimal.", alias: ["0,7"] },
        { pertanyaan: "Yang lebih besar antara 3,5 dan 3,45.", alias: ["3,5"] },
        { pertanyaan: "Yang terkecil antara 1,2, 0,8, dan 1,15.", alias: ["0,8"] },
        { pertanyaan: "Yang lebih besar antara 4,6 dan 4,59.", alias: ["4,6"] },
      ],
      voice: [[
        "Setengah sama dengan nol koma lima. Seperlima sama dengan nol koma dua.",
        "Dari lima jarak, yang terdekat nol koma sembilan kilometer.",
        "Suhu tertinggi tiga puluh delapan koma lima.",
      ]],
    },
    {
      kode: "D",
      judul: "Uji Kompetensi",
      pengantar: "Lima soal uji di akhir bab.",
      labelDaftar: "Uji Kompetensi",
      kolom: 1,
      item: [
        { nama: "Perjalanan", singkat: "2/5 dari 630", uraian: "2/5 × 630 = 252 km.", contoh: "Bagi 630 dengan 5, lalu kali 2." },
        { nama: "Nasi kotak", singkat: "3/4 dari 100", uraian: "3/4 × 100 = 75 porsi.", contoh: "Bagi 100 dengan 4, lalu kali 3." },
        { nama: "Beras", singkat: "50 dibagi 2/3", uraian: "50 ÷ 2/3 = 75 hari.", contoh: "Kali 50 dengan 3/2." },
        { nama: "Kue dan cat", singkat: "5/32 dan 5,8", uraian: "5/8 ÷ 4 = 5/32. 5 4/5 = 5,8.", contoh: "4/5 = 0,8." },
      ],
      kuis: [
        { pertanyaan: "2/5 kali 630.", alias: ["252"] },
        { pertanyaan: "3/4 kali 100.", alias: ["75"] },
        { pertanyaan: "50 dibagi 2/3.", alias: ["75"] },
        { pertanyaan: "5/8 dibagi 4.", alias: ["5/32"] },
        { pertanyaan: "5 4/5 dalam desimal.", alias: ["5,8"] },
      ],
      voice: [[
        "Uji kompetensi. Dua per lima dari enam ratus tiga puluh sama dengan dua ratus lima puluh dua.",
        "Lima empat per lima meter persegi sama dengan lima koma delapan.",
      ]],
    },
  ],
};
