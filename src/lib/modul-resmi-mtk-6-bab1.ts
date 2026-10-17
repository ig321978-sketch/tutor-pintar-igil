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
        { nama: "Gambar 2/3", singkat: "Batang, pizza, jeruk", uraian: "Jeruk 8/12 = 2/3. Batang biru 6/10. Pizza 1/4.", contoh: "Jawaban gambar c." },
        { nama: "Ember kecil", singkat: "Asli kali pecahan", uraian: "2 × 3/5 = 6/5 m².", contoh: "a × b/c = (a × b)/c." },
        { nama: "Pohon manalagi", singkat: "Pecahan kali asli", uraian: "2/3 × 15 = 10 pohon.", contoh: "Bagi 15 menjadi 3 bagian, lalu gabungkan 2 bagian." },
      ],
      kuis: [
        { pertanyaan: "Gambar yang menunjukkan 2/3.", alias: ["c", "jeruk"] },
        { pertanyaan: "4 gelas kali 2/5 liter.", alias: ["8/5"] },
        { pertanyaan: "2 petak kali 3/4.", alias: ["6/4", "3/2"] },
        { pertanyaan: "5 kantong kali 1/5 kg.", alias: ["1"] },
        { pertanyaan: "3/4 dari 12.", alias: ["9"] },
        { pertanyaan: "2/5 dari 20.", alias: ["8"] },
        { pertanyaan: "1/3 dari 18.", alias: ["6"] },
      ],
      voice: [[
        "Perkalian pecahan. Dua ember kecil: dua kali tiga per lima sama dengan enam per lima.",
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
        { nama: "Setengah liter", singkat: "Pecahan dibagi asli", uraian: "1/2 ÷ 3 = 1/6 liter.", contoh: "1/a ÷ b = 1/a × 1/b." },
        { nama: "Jus ke gelas", singkat: "Asli dibagi pecahan", uraian: "3 ÷ 1/4 = 12 gelas.", contoh: "a ÷ b/c = a × c/b." },
      ],
      kuis: [
        { pertanyaan: "3/4 dibagi 2.", alias: ["3/8"] },
        { pertanyaan: "2/3 dibagi 4.", alias: ["1/6"] },
        { pertanyaan: "4/5 dibagi 2.", alias: ["2/5"] },
        { pertanyaan: "2 dibagi 1/2.", alias: ["4"] },
        { pertanyaan: "6 dibagi 3/4.", alias: ["8"] },
        { pertanyaan: "5 dibagi 2/3.", alias: ["15/2"] },
      ],
      voice: [[
        "Setengah liter dibagi tiga gelas sama dengan seperenam liter.",
        "Tiga liter dibagi gelas seperempat sama dengan dua belas gelas.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Bilangan Desimal",
      pengantar: "Desimal, sesuai urutan buku.",
      labelDaftar: "C. Bilangan Desimal",
      kolom: 1,
      item: [
        { nama: "Jeruk setengah kg", singkat: "Pecahan ke desimal", uraian: "1/2 = 5/10 = 0,5.", contoh: "Jadikan penyebut 10." },
        { nama: "Dua koma sembilan", singkat: "Banding dari kiri", uraian: "2,9 lebih besar dari 2,49.", contoh: "Bandingkan satuan, lalu persepuluhan." },
      ],
      kuis: [
        { pertanyaan: "1/4 dalam desimal.", alias: ["0,25"] },
        { pertanyaan: "2/5 dalam desimal.", alias: ["0,4"] },
        { pertanyaan: "7/10 dalam desimal.", alias: ["0,7"] },
        { pertanyaan: "Yang lebih besar antara 3,5 dan 3,45.", alias: ["3,5"] },
        { pertanyaan: "Yang terkecil antara 1,2, 0,8, dan 1,15.", alias: ["0,8"] },
        { pertanyaan: "Yang lebih besar antara 4,6 dan 4,59.", alias: ["4,6"] },
      ],
      voice: [[
        "Setengah kilogram sama dengan nol koma lima.",
        "Dua koma sembilan lebih besar dari dua koma empat puluh sembilan.",
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
