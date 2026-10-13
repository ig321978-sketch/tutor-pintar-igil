import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_PECAHAN } from "@/lib/misi-mtk-3-pecahan";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_PECAHAN = "Bab 5: Pecahan Sederhana";

export const MODUL_MTK3_PECAHAN: ModulResmiPai = {
  id: "mtk-3-pecahan",
  judul: JUDUL_MTK3_PECAHAN,
  pola: /^bab 5: pecahan sederhana$/,
  motivasi:
    "Nadia, Rafi, dan Widya belajar pecahan setengah, sepertiga, dan seperempat bersama monyet Ciko di warung buah.",
  kunciJawaban: "A,C,B,B,B,B,B,A,A,C",
  sketsaKartu: [
    "Nadia, Rafi, dan Widya memotong buah bersama monyet Ciko.",
    "Lambang pecahan, pembilang, penyebut, dan perbandingan.",
    "Ciko menjual buah potong di warung.",
    "Poin penting dan lembar evaluasi pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Satu potong dari buah yang dibelah dua sama besar. Lambangnya...
A) ½
B) ⅓
C) ¼
D) 2`,
    `[Soal 2 - PG - Tipe: MOTS]
Buah dipotong empat sama besar. Satu potong bernilai...
A) ½
B) ⅓
C) ¼
D) 4`,
    `[Soal 3 - PG - Tipe: HOTS]
Persegi panjang dibagi 3 sama besar. Dua bagian diwarnai. Pecahannya...
A) ⅓
B) 2/3
C) 3/2
D) ½`,
    `[Soal 4 - PG - Tipe: HOTS]
Rafi menulis: pecahan ¼ lebih besar dari ⅓ karena 4 lebih besar dari 3. Pernyataannya...
A) Benar
B) Salah, karena semakin besar penyebut semakin kecil bagiannya
C) Salah, karena tidak bisa dibandingkan
D) Tidak bisa ditentukan`,
    `[Soal 5 - PG - Tipe: HOTS]
Penyebut 3 dan pembilang 2. Pecahannya...
A) ⅓
B) 2/3
C) 3/2
D) ½`,
    `[Soal 6 - PG - Tipe: MOTS]
Lingkaran dibagi 3 sama besar. Lambang satu bagiannya...
A) ½
B) ⅓
C) ¼
D) 3`,
    `[Soal 7 - PG - Tipe: MOTS]
Pada pecahan ⅓, pernyataan yang benar...
A) 1 penyebut, 3 pembilang
B) 1 pembilang, 3 penyebut
C) Keduanya pembilang
D) Keduanya penyebut`,
    `[Soal 8 - PG - Tipe: MOTS]
Jumlah bagian naik 1: 2 – 3 – 4 – berikutnya...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 9 - PG - Tipe: MOTS]
Lingkaran dibagi 4 sama besar. Satu bagian diwarnai. Lambangnya...
A) ¼
B) ⅓
C) ½
D) 4`,
    `[Soal 10 - PG - Tipe: HOTS]
Persegi panjang dibagi 4, tetapi lambangnya tertulis ½. Kotak itu...
A) Cocok, karena dibagi dua kali
B) Cocok, karena 4 lebih besar
C) Tidak cocok, karena dibagi 4 seharusnya ¼
D) Tidak bisa ditentukan`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nadia, Rafi, Widya, dan Ciko mengenal pecahan setengah, sepertiga, dan seperempat.",
      labelDaftar: "Lima adegan kebun buah",
      kolom: 1,
      item: [
        { nama: "Setengah", singkat: "Satu per dua", uraian: "Satu benda dibagi dua sama besar. Setiap bagiannya ½.", contoh: "Dua bagian kalau digabung kembali jadi satu utuh." },
        { nama: "Sepertiga", singkat: "Satu per tiga", uraian: "Satu benda dibagi tiga sama besar. Setiap bagiannya ⅓.", contoh: "Ketiga bagiannya harus sama besar." },
        { nama: "Seperempat", singkat: "Satu per empat", uraian: "Satu benda dibagi empat sama besar. Setiap bagiannya ¼.", contoh: "Semakin banyak bagian, semakin kecil ukurannya." },
        { nama: "Lambang pecahan", singkat: "Pembilang dan penyebut", uraian: "Angka atas pembilang, angka bawah penyebut.", contoh: "Diambil 1 dari 4 bagian ditulis ¼." },
        { nama: "Membandingkan", singkat: "Penyebut kecil, bagian besar", uraian: "½ > ⅓ > ¼ kalau bendanya sama besar.", contoh: "Semakin besar penyebut, semakin kecil potongannya." },
      ],
      kuis: [
        { pertanyaan: "Bagian yang dilingkari pada pizza belah dua disebut apa?", alias: ["satu per dua", "setengah"] },
        { pertanyaan: "Gambar apel yang dibagi dua dan tulis lambangnya.", alias: ["1/2", "setengah"] },
        { pertanyaan: "Bagian yang dilingkari pada roti dibagi tiga disebut apa?", alias: ["satu per tiga", "sepertiga"] },
        { pertanyaan: "Bagi persegi panjang jadi 3 dan tulis lambangnya.", alias: ["1/3", "sepertiga"] },
        { pertanyaan: "Bagian yang dilingkari pada jeruk dibagi empat disebut apa?", alias: ["satu per empat", "seperempat"] },
        { pertanyaan: "Bagi persegi jadi 4 dan tulis lambangnya.", alias: ["1/4", "seperempat"] },
        { pertanyaan: "Ucapkan pecahan satu bagian dari tiga, lengkap dengan pembilang dan penyebut.", alias: ["satu per tiga", "pembilang", "penyebut"] },
        { pertanyaan: "Tulis lambang satu bagian dari gambar 2, 3, dan 4.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Mana yang lebih besar, ⅓ atau ¼?", alias: ["satu per tiga", "sepertiga"] },
        { pertanyaan: "Isi tanda antara ½ dan ¼.", alias: [">", "lebih besar"] },
        { pertanyaan: "Lingkaran dibagi 4, satu bagian diwarnai. Lambangnya?", alias: ["1/4"] },
        { pertanyaan: "Pasangkan gambar dengan lambangnya.", alias: ["1/2", "1/4", "1/3"] },
        { pertanyaan: "Susun ¼, ⅓, dan ½ dari yang paling kecil.", alias: ["1/4", "1/3", "1/2"] },
        { pertanyaan: "Periksa tiga pernyataan pecahan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana gambar yang tidak cocok dengan lambangnya?", alias: ["1/4"] },
      ],
      voice: [[
        "Pecahan adalah bagian dari sesuatu yang utuh.",
        "Satu per dua, satu per tiga, dan satu per empat muncul kalau benda dibagi sama besar.",
        "Pembilang di atas, penyebut di bawah. Semakin besar penyebut, semakin kecil bagiannya.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Baca gambar, tulis lambang, lalu bandingkan potongannya.",
      labelDaftar: "Lima papan pecahan",
      kolom: 1,
      item: [
        { nama: "Setengah", singkat: "Dua bagian", uraian: "Diambil 1 dari 2 bagian sama besar. Lambangnya ½.", contoh: "Dua bagian yang digabung kembali utuh." },
        { nama: "Sepertiga", singkat: "Tiga bagian", uraian: "Diambil 1 dari 3 bagian sama besar. Lambangnya ⅓.", contoh: "Kalau tidak sama, itu bukan sepertiga." },
        { nama: "Seperempat", singkat: "Empat bagian", uraian: "Diambil 1 dari 4 bagian sama besar. Lambangnya ¼.", contoh: "Empat bagian lebih kecil daripada dua bagian." },
        { nama: "Pembilang dan penyebut", singkat: "Atas dan bawah", uraian: "Dua dari tiga bagian ditulis 2/3.", contoh: "Yang diambil di atas. Seluruhnya di bawah." },
        { nama: "Perbandingan", singkat: "½ lebih besar dari ¼", uraian: "⅓ > ¼ karena penyebut 3 lebih kecil dari 4.", contoh: "Bendanya harus sama besar." },
      ],
      kuis: [
        { pertanyaan: "Ucapkan lambang satu bagian roti yang dibelah dua.", alias: ["satu per dua"] },
        { pertanyaan: "Bagi persegi panjang jadi 2 dan tulis lambangnya.", alias: ["1/2"] },
        { pertanyaan: "Ucapkan lambang satu bagian jeruk yang dibagi tiga.", alias: ["satu per tiga"] },
        { pertanyaan: "Bagi dua persegi menjadi 2 dan 3, lalu tulis lambangnya.", alias: ["1/2", "1/3"] },
        { pertanyaan: "Ucapkan lambang satu bagian kue yang dibagi empat.", alias: ["satu per empat"] },
        { pertanyaan: "Bagi tiga persegi menjadi 2, 3, dan 4, lalu tulis lambangnya.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Persegi dibagi 4, dua bagian diwarnai. Pecahannya apa?", alias: ["dua per empat"] },
        { pertanyaan: "Lingkaran dibagi 3, dua bagian diwarnai. Tulis pecahannya.", alias: ["2/3"] },
        { pertanyaan: "Mana yang lebih besar, ½ atau ¼?", alias: ["satu per dua"] },
        { pertanyaan: "Isi tanda antara ⅓ dan ½.", alias: ["<", "lebih kecil"] },
        { pertanyaan: "Lingkaran dibagi 3. Lambang satu bagiannya?", alias: ["1/3"] },
        { pertanyaan: "Pasangkan angka 1 dan 3 dengan pembilang dan penyebut.", alias: ["pembilang", "penyebut"] },
        { pertanyaan: "Susun ½, ⅓, dan ¼ dari yang paling besar.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Periksa tiga pernyataan perbandingan.", alias: ["benar", "salah"] },
        { pertanyaan: "Penyebut 4 dan pembilang 1. Pecahan berapa?", alias: ["1/4"] },
      ],
      voice: [[
        "Pecahan satu per dua, satu per tiga, dan satu per empat muncul dari bagian yang sama besar.",
        "Angka bawah adalah penyebut, angka atas adalah pembilang.",
        "Penyebut kecil, bagian besar. Setengah lebih besar dari sepertiga, dan sepertiga lebih besar dari seperempat.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Warung Potong Buah Ciko",
      pengantar: "Siswa menjadi penjual buah potong. Sepuluh pos selesai, sepuluh koin terkumpul.",
      labelDaftar: "Sepuluh pos warung",
      kolom: 1,
      item: [
        {
          nama: "Meja warung",
          singkat: "Potong, tulis, bandingkan",
          uraian: "Level 1: ½. Level 2: ⅓. Level 3: ¼. Level 4: ⅓ lebih besar dari ¼. Level 5: 2/3 lebih besar dari ½.",
          contoh: "Salah memotong tidak mengurangi koin. Coba lagi.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_PECAHAN),
        { pertanyaan: "Satu potong dari buah belah dua. Lambangnya?", alias: ["1/2"] },
        { pertanyaan: "Satu potong dari buah yang dibagi empat. Lambangnya?", alias: ["1/4"] },
        { pertanyaan: "Pasangkan potongan dengan lambangnya.", alias: ["1/3", "1/2", "1/4"] },
        { pertanyaan: "Urutkan ¼, ⅓, dan ½ dari yang paling kecil.", alias: ["1/4", "1/3", "1/2"] },
        { pertanyaan: "Periksa tiga pernyataan warung.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana pembagian yang tidak sama besar?", alias: ["tidak sama"] },
        { pertanyaan: "Pada pecahan ⅓, mana yang benar?", alias: ["pembilang"] },
        { pertanyaan: "Deret 2, 3, 4, berikutnya?", alias: ["5"] },
        { pertanyaan: "Buah dibagi tiga, ambil satu. Sebutkan bagiannya.", alias: ["satu per tiga"] },
        { pertanyaan: "Gambar buah dibagi 4 dan tulis lambang satu bagian.", alias: ["1/4"] },
      ],
      voice: [[
        "Kalian menjadi penjual buah potong. Pelanggan memesan potongan dengan ukuran tertentu.",
        "Potong buah jadi bagian yang sama besar, tuliskan lambangnya, dan pastikan potongan sesuai pesanan.",
        "Sepuluh pos selesai, sepuluh koin terkumpul, warung buah besar terbuka.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal lambang pecahan, pembilang, penyebut, dan perbandingan.",
      labelDaftar: "Lembar evaluasi pecahan",
      kolom: 1,
      item: [
        { nama: "Baca gambar", singkat: "Atas dan bawah", uraian: "Dua dari tiga bagian adalah 2/3. Satu dari empat bagian adalah ¼.", contoh: "Yang diambil di atas, seluruhnya di bawah." },
        { nama: "Tiga semangka", singkat: "Bandingkan potongan", uraian: "Semangka B adalah ⅓. Semangka A potongannya paling besar. ⅓ lebih besar dari ¼.", contoh: "Bendanya sama besar dulu." },
      ],
      kuis: [
        { pertanyaan: "Bagi lingkaran jadi 4, warnai 1, tulis lambangnya.", alias: ["1/4"] },
        { pertanyaan: "Dua dari tiga bagian. Pecahannya?", alias: ["2/3"] },
        { pertanyaan: "Ucapkan ¼ lengkap dengan pembilang dan penyebut.", alias: ["satu per empat", "pembilang", "penyebut"] },
        { pertanyaan: "Apakah ¼ lebih besar dari ⅓ karena 4 lebih besar dari 3?", alias: ["salah"] },
        { pertanyaan: "Pasangkan gambar dibagi 2, 3, dan 4 dengan lambangnya.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Bandingkan ½ dan ⅓, lalu tulis alasannya.", alias: [">", "penyebut"] },
        { pertanyaan: "Penyebut 3 dan pembilang 2. Pecahan berapa?", alias: ["2/3"] },
        { pertanyaan: "Susun ½, ⅓, dan ¼ dari yang paling besar.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Mana yang lebih besar, potongan dibagi 3 atau dibagi 4? Sebutkan alasannya.", alias: ["satu per tiga", "lebih besar"] },
        { pertanyaan: "Tiga semangka sama besar dibagi 2, 3, dan 4. Tulis nilai potongan B, semangka paling besar, dan perbandingan B dengan C.", alias: ["1/3", "a", "lebih besar"] },
      ],
      voice: [[
        "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pecahan sederhana.",
        "Yang diambil di atas, seluruhnya di bawah. Semakin besar penyebut, semakin kecil bagiannya.",
        "Jangan terburu-buru, dan periksa lagi jawabanmu.",
      ]],
    },
  ],
};
