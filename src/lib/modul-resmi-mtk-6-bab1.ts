import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK6_BAB1 } from "@/lib/misi-mtk-6-bab1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK6_BAB1 = "Bab 1: Pecahan dan Desimal";

export const MODUL_MTK6_BAB1: ModulResmiPai = {
  id: "mtk-6-bab1",
  judul: JUDUL_MTK6_BAB1,
  pola: /^bab 1: pecahan dan desimal$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menakar kebun, jus, dan jarak bersama burung hantu Igil di taman takar.",
  kunciJawaban: "B,B,C,A,B,D,A,B,D,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menakar kebun dan jus bersama Igil.",
    "Perkalian, pembagian, lalu desimal satu angka di belakang koma.",
    "Sepuluh pos di taman takar.",
    "Poin penting, pengayaan, dan lembar evaluasi pecahan dan desimal.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
5 takaran besar. Tiap takaran 2 m². Luasnya...
A) 7 m²
B) 10 m²
C) 3 m²
D) 25 m²`,
    `[Soal 2 - PG - Tipe: MOTS]
2 × 3/5 = ...
A) 5/5
B) 6/5
C) 3/5
D) 1/5`,
    `[Soal 3 - PG - Tipe: MOTS]
2/3 × 15 = ...
A) 5
B) 30
C) 10
D) 45`,
    `[Soal 4 - PG - Tipe: MOTS]
4 pita, tiap pita 3/4 m. Panjang seluruhnya...
A) 3 m
B) 7 m
C) 12 m
D) 1 m`,
    `[Soal 5 - PG - Tipe: MOTS]
1/2 liter dibagi rata ke 3 gelas. Tiap gelas...
A) 1/2 liter
B) 1/6 liter
C) 3/2 liter
D) 1/5 liter`,
    `[Soal 6 - PG - Tipe: MOTS]
3 ÷ 1/4 = ...
A) 3/4
B) 4
C) 7
D) 12`,
    `[Soal 7 - PG - Tipe: HOTS]
3 ÷ 2/5 = ...
A) 15/2
B) 6/5
C) 5/2
D) 3/5`,
    `[Soal 8 - PG - Tipe: MOTS]
1/2 kg sama dengan...
A) 0,2 kg
B) 0,5 kg
C) 0,25 kg
D) 5 kg`,
    `[Soal 9 - PG - Tipe: MOTS]
Jarak 0,9 km, 1,9 km, 2,3 km, 2,6 km, dan 3,6 km. Yang terdekat...
A) 3,6 km
B) 2,3 km
C) 1,9 km
D) 0,9 km`,
    `[Soal 10 - PG - Tipe: HOTS]
Suhu 37,2; 33,3; 36,6; 38,5; dan 36,8. Yang tertinggi...
A) 37,2
B) 36,8
C) 38,5
D) 33,3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil menakar di taman.",
      labelDaftar: "Enam adegan taman takar",
      kolom: 1,
      item: [
        { nama: "Asli kali pecahan", singkat: "Pembilang dikali", uraian: "5 × 2 = 10. 2 × 3/5 = 6/5.", contoh: "Penyebut tetap." },
        { nama: "Pecahan kali asli", singkat: "Bagian dari kumpulan", uraian: "2/3 × 15 = 10.", contoh: "Pembilang kali bilangan asli, penyebut tetap." },
        { nama: "Pecahan dibagi asli", singkat: "Tiap bagian", uraian: "1 ÷ 3 = 1/3. 1/2 ÷ 3 = 1/6. 1/3 ÷ 3 = 1/9.", contoh: "Kali dengan 1 per pembagi." },
        { nama: "Asli dibagi pecahan", singkat: "Banyak bagian", uraian: "3 ÷ 1/4 = 12. 3 ÷ 2/5 = 15/2.", contoh: "Kali dengan kebalikan pecahan." },
        { nama: "Pecahan jadi desimal", singkat: "Penyebut 10 atau 100", uraian: "1/2 = 0,5 = 0,50. 1/5 = 0,2 = 0,20. 1/10 = 0,1 = 0,10.", contoh: "Satu angka di belakang koma adalah inti bab ini." },
        { nama: "Urut desimal", singkat: "Nilai tempat", uraian: "0,9 lalu 1,9 lalu 2,3 lalu 2,6 lalu 3,6. Terdekat 0,9. Terjauh 3,6.", contoh: "Bandingkan dari kiri tanda koma." },
      ],
      kuis: [
        { pertanyaan: "2 kali 3/5. Hasilnya?", alias: ["6/5"] },
        { pertanyaan: "4 kali 3/4. Panjangnya berapa meter?", alias: ["3"] },
        { pertanyaan: "1/4 kali 20. Hasilnya?", alias: ["5"] },
        { pertanyaan: "1/6 kali 180. Hasilnya?", alias: ["30"] },
        { pertanyaan: "1/2 dibagi 3. Hasilnya?", alias: ["1/6"] },
        { pertanyaan: "1/3 dibagi 3. Penyebut hasilnya?", alias: ["9"] },
        { pertanyaan: "3 dibagi 1/2. Hasilnya?", alias: ["6"] },
        { pertanyaan: "3 dibagi 1/5. Hasilnya?", alias: ["15"] },
        { pertanyaan: "1/5 menjadi desimal.", alias: ["0,2"] },
        { pertanyaan: "3/4 menjadi desimal.", alias: ["0,75"] },
        { pertanyaan: "Jarak terdekat dari 0,9; 1,9; 2,3; 2,6; 3,6.", alias: ["0,9"] },
        { pertanyaan: "Suhu tertinggi dari 37,2; 33,3; 36,6; 38,5; 36,8.", alias: ["38,5"] },
        { pertanyaan: "5 kali 2. Hasilnya?", alias: ["10"] },
        { pertanyaan: "Pasangkan operasi dengan hasilnya.", alias: ["6/5", "10", "1/6"] },
        { pertanyaan: "Susun jarak dari yang terdekat.", alias: ["0,9", "1,9", "2,3", "3,6"] },
        { pertanyaan: "Periksa tiga pernyataan takar.", alias: ["benar", "salah"] },
        { pertanyaan: "3 dibagi 1/4. Hasilnya?", alias: ["12"] },
      ],
      voice: [[
        "Hari ini kita menakar kebun, jus, dan jarak.",
        "Pecahan dikali atau dibagi. Desimal dibaca dari nilai tempat.",
        "Angka di tabel buku tidak kita ubah.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari perkalian, pembagian, dan desimal.",
      labelDaftar: "Enam peta takar",
      kolom: 1,
      item: [
        { nama: "Kalikan pembilang", singkat: "Penyebut tetap", uraian: "a × b/c = (a × b)/c. Contoh 2 × 3/5 = 6/5.", contoh: "5 × 2 = 10 untuk bilangan asli." },
        { nama: "Bagian dari banyak", singkat: "Pecahan di depan", uraian: "2/3 × 15 = 10.", contoh: "2/15 × 75 = 10 kue yang sudah dimakan. Sisa 65." },
        { nama: "Bagi rata", singkat: "Kali 1 per pembagi", uraian: "1/2 ÷ 3 = 1/6. 2/4 ÷ 3 = 1/6.", contoh: "1 liter ÷ 3 gelas = 1/3 liter." },
        { nama: "Kebalikan pecahan", singkat: "Hasilnya lebih banyak", uraian: "3 ÷ 1/4 = 12. 6 ÷ 3/4 = 8.", contoh: "3 ÷ 2/5 = 15/2." },
        { nama: "Koma", singkat: "0,5 dan 0,50", uraian: "1/2 = 0,5. 1/5 = 0,2. 1/10 = 0,1. 3/4 = 0,75. 5 4/5 = 5,8.", contoh: "0,10 sama dengan 0,1." },
        { nama: "Bandingkan koma", singkat: "Dari kiri", uraian: "2,9 lebih besar dari 2,49. Suhu tertinggi 38,5.", contoh: "Jangan bandingkan angka di belakang koma seperti bilangan asli." },
      ],
      kuis: [
        { pertanyaan: "5 kali 3/5. Hasilnya?", alias: ["3"] },
        { pertanyaan: "20 kali 1/4. Hasilnya?", alias: ["5"] },
        { pertanyaan: "2/3 kali 30. Hasilnya?", alias: ["20"] },
        { pertanyaan: "75 dikurangi 10. Sisanya?", alias: ["65"] },
        { pertanyaan: "2/4 dibagi 3. Hasilnya?", alias: ["1/6"] },
        { pertanyaan: "5/8 dibagi 4. Hasilnya?", alias: ["5/32"] },
        { pertanyaan: "6 dibagi 3/4. Hasilnya?", alias: ["8"] },
        { pertanyaan: "4 dibagi 1/5. Hasilnya?", alias: ["20"] },
        { pertanyaan: "3/4 menjadi desimal.", alias: ["0,75"] },
        { pertanyaan: "5 4/5 menjadi desimal.", alias: ["5,8"] },
        { pertanyaan: "2,9 atau 2,49. Mana yang lebih besar?", alias: ["2,9"] },
        { pertanyaan: "Jarak 1,5 dan 1,9. Mana yang lebih dekat?", alias: ["1,5"] },
        { pertanyaan: "5 dibagi 2/3. Hasilnya?", alias: ["15/2"] },
        { pertanyaan: "Pasangkan pecahan dengan desimalnya.", alias: ["0,5", "0,2", "0,1"] },
        { pertanyaan: "Susun suhu dari yang terendah.", alias: ["33,3", "36,6", "36,8", "38,5"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "5 4/5 dalam desimal.", alias: ["5,8"] },
      ],
      voice: [[
        "Peta ini merangkum cara kali, bagi, dan membaca koma.",
        "Pembilang dikali. Penyebut tetap, atau kali dengan kebalikan.",
        "Desimal dibandingkan dari nilai tempat, mulai dari kiri.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Taman Takar",
      pengantar: "Sepuluh soal pecahan dan desimal. Selesai sepuluh pos, takar terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos takar",
      kolom: 1,
      item: [
        {
          nama: "Pos takar",
          singkat: "Kali, bagi, koma",
          uraian: "Dua soal suara dan dua soal tulis.",
          contoh: "Angka mengikuti contoh buku.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK6_BAB1),
      voice: [[
        "Igil menjaga sepuluh pos di taman takar.",
        "Ada perkalian, pembagian, dan desimal. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pecahan dan desimal.",
      labelDaftar: "Lembar evaluasi takar",
      kolom: 1,
      item: [
        {
          nama: "Catatan takar",
          singkat: "Angka buku",
          uraian: "2/5 × 630 = 252. 3/4 × 100 = 75. 50 ÷ 2/3 = 75. Lompat terjauh 3,7 m.",
          contoh: "1/2 ÷ 3 = 1/6.",
        },
      ],
      kuis: [
        { pertanyaan: "4 kali 3/4. Hasilnya?", alias: ["3"] },
        { pertanyaan: "2/5 kali 630. Hasilnya?", alias: ["252"] },
        { pertanyaan: "1/2 dibagi 3. Hasilnya?", alias: ["1/6"] },
        { pertanyaan: "3/4 kali 100. Hasilnya?", alias: ["75"] },
        { pertanyaan: "Pasangkan pembagian dengan hasilnya.", alias: ["6", "15", "8"] },
        { pertanyaan: "1/6 kali 180. Hasilnya?", alias: ["30"] },
        { pertanyaan: "50 dibagi 2/3. Hasilnya?", alias: ["75"] },
        { pertanyaan: "2,9 atau 2,49. Mana yang lebih besar?", alias: ["2,9"] },
        { pertanyaan: "1/5 menjadi desimal.", alias: ["0,2"] },
        { pertanyaan: "Lompat 3,7 m, 2,9 m, dan 3,6 m. Mana yang terjauh?", alias: ["3,7"] },
      ],
      voice: [[
        "Sepuluh soal taman takar. Kalikan pembilang, atau kali dengan kebalikan pecahan.",
        "Untuk desimal, bandingkan nilai tempat dari kiri.",
      ]],
    },
  ],
};
