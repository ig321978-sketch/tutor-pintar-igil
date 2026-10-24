import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB2 } from "@/lib/misi-mtk-4-bab2";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB2 = "Bab 2: Pecahan";

export const MODUL_MTK4_BAB2: ModulResmiPai = {
  id: "mtk-4-bab2",
  judul: JUDUL_MTK4_BAB2,
  pola: /^bab 2: pecahan$/,
  motivasi:
    "Nisa, Farhan, dan Cinta membagi pizza dan bolu, mencari pecahan senilai, membaca desimal, lalu menulis persen bersama burung hantu Igil di dapur.",
  kunciJawaban: "B,C,B,C,B,A,B,B,D,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta membagi bolu bersama Igil.",
    "Pembilang satu, penyebut sama, senilai, desimal, dan persen.",
    "Sepuluh pos di dapur bolu.",
    "Poin penting dan lembar evaluasi pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Tiara punya bawang putih 1/2 kg dan gula 1/4 kg. Mana yang lebih berat?
A) 1/4 kg
B) 1/2 kg
C) Keduanya sama
D) 1/8 kg`,
    `[Soal 2 - PG - Tipe: MOTS]
Mana yang lebih besar, 2/10 atau 1/10?
A) 1/10
B) Keduanya sama
C) 2/10
D) 10/10`,
    `[Soal 3 - PG - Tipe: MOTS]
2/6 senilai dengan...
A) 1/6
B) 1/3
C) 2/3
D) 3/6`,
    `[Soal 4 - PG - Tipe: HOTS]
Dari 1/2, 1/4, dan 1/3, yang paling kecil adalah...
A) 1/2
B) 1/3
C) 1/4
D) 1/5`,
    `[Soal 5 - PG - Tipe: MOTS]
3/10 sama dengan...
A) 3/100
B) 0,3
C) 0,03
D) 30/10`,
    `[Soal 6 - PG - Tipe: MOTS]
0,35 sama dengan...
A) 35%
B) 3,5%
C) 350%
D) 0,35%`,
    `[Soal 7 - PG - Tipe: HOTS]
1/4 = ⬜/16. Pembilang yang hilang...
A) 2
B) 4
C) 8
D) 16`,
    `[Soal 8 - PG - Tipe: MOTS]
3/9 senilai dengan...
A) 1/9
B) 1/3
C) 3/3
D) 9/3`,
    `[Soal 9 - PG - Tipe: HOTS]
Mana yang bukan senilai 1/3?
A) 2/6
B) 3/9
C) 4/12
D) 2/5`,
    `[Soal 10 - PG - Tipe: HOTS]
Dari 50 siswa, 20 sedang olahraga. Itu sama dengan...
A) 20%
B) 40%
C) 50%
D) 2%`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil membagi pizza, bolu, dan roti di dapur. Infografis tiap sub-bab ada di dalam materi.",
      labelDaftar: "Lima adegan dapur bolu",
      kolom: 1,
      item: [
        { nama: "Pembilang satu", singkat: "Satu iris", uraian: "Pizza dibagi 4, tiap anak 1/4. Pembilang di atas garis, penyebut di bawah. 1/2 > 1/4 dan 1/10 < 1/5. Bawang putih 1/2 kg lebih berat dari gula 1/4 kg.", contoh: "Penyebut lebih kecil, potongan lebih besar." },
        { nama: "Penyebut sama", singkat: "Irisan sama besar", uraian: "1/3 < 2/3. 2/10 > 1/10. Tongkat Asep 3/6 m lebih panjang dari tongkat Azizah 2/6 m. Roti Wiwin 1/3 lebih sedikit dari roti Tomas 2/3.", contoh: "Penyebut sama, bandingkan pembilang." },
        { nama: "Senilai", singkat: "Sama besar, iris berbeda", uraian: "1/4 = 4/16. Coklat Putu 2/6 sama besar dengan 1/3. 2/4 = 1/2 dan 3/9 = 1/3. Kali atau bagi pembilang dan penyebut dengan bilangan yang sama.", contoh: "Gambar dulu, baru simbol." },
        { nama: "Desimal", singkat: "Persepuluh dan perseratus", uraian: "1 roti dari 10 ditulis 1/10 = 0,1. 3/10 = 0,3. 1 biskuit dari 100 ditulis 1/100 = 0,01. 7/100 = 0,07. 0,25 = 25/100. 15/100 = 0,15.", contoh: "Satu angka di belakang koma: persepuluh. Dua angka: perseratus." },
        { nama: "Persen", singkat: "Dari seratus", uraian: "5% artinya 5/100. 0,75 = 75/100 = 75%. 0,35 = 35%. 20 siswa dari 50 sama dengan 40%. 6 benar dari 10 soal sama dengan 60%. Geser koma dua langkah ke kanan untuk kali 100%.", contoh: "Persen adalah pecahan berpenyebut 100." },
      ],
      kuis: [
        { pertanyaan: "Mana lebih besar, 1/3 atau 1/6?", alias: ["1/3", "sepertiga"] },
        { pertanyaan: "Urutkan 1/2, 1/4, 1/8 dari besar ke kecil.", alias: ["1/2", "1/4", "1/8"] },
        { pertanyaan: "Mana lebih besar, 3/8 atau 7/8?", alias: ["7/8"] },
        { pertanyaan: "Urutkan 2/9, 7/9, 4/9, 1/9 dari kecil.", alias: ["1/9", "2/9", "4/9", "7/9"] },
        { pertanyaan: "1/3 = berapa per 6?", alias: ["2/6", "2"] },
        { pertanyaan: "3/4 = berapa per 12?", alias: ["9/12", "9"] },
        { pertanyaan: "Baca 0,7.", alias: ["tujuh persepuluh", "7/10"] },
        { pertanyaan: "0,08 sebagai pecahan.", alias: ["8/100"] },
        { pertanyaan: "0,2 sama dengan berapa persen?", alias: ["20"] },
        { pertanyaan: "75/100 sama dengan berapa persen?", alias: ["75"] },
        { pertanyaan: "Mana lebih besar, 1/5 atau 1/10?", alias: ["1/5"] },
        { pertanyaan: "Pasangkan 1/2, 1/4, 1/5 dengan persen.", alias: ["50%", "25%", "20%"] },
        { pertanyaan: "Susun 1/2, 1/3, 1/4, 1/6 dari besar.", alias: ["1/2", "1/3", "1/4", "1/6"] },
        { pertanyaan: "Periksa tiga pernyataan bolu.", alias: ["benar", "salah"] },
        { pertanyaan: "1/4 = berapa per 16?", alias: ["4"] },
        { pertanyaan: "0,35 sama dengan berapa persen?", alias: ["35"] },
      ],
      voice: [[
        "Hari ini kita membagi pizza dan bolu di dapur Igil.",
        "Pembilang ada di atas garis. Penyebut ada di bawah garis.",
        "Kita membandingkan iris, mencari yang senilai, membaca koma, lalu menulis persen.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Peta dan latihan tiap sub-bab ada di dalam materi dapur.",
      labelDaftar: "Latihan di dalam lima sub-bab",
      kolom: 1,
      item: [
        { nama: "Satu iris", singkat: "Penyebut menentukan", uraian: "1/2 lebih besar dari 1/4. 1/10 lebih kecil dari 1/5. Bawang putih 1/2 kg lebih berat dari gula 1/4 kg.", contoh: "Pembilang 1, bandingkan penyebut." },
        { nama: "Iris sama", singkat: "Pembilang menentukan", uraian: "1/3 lebih kecil dari 2/3. 2/10 lebih besar dari 1/10. Tongkat 3/6 lebih panjang dari 2/6.", contoh: "Penyebut sama, lihat pembilang." },
        { nama: "Senilai", singkat: "Kali yang sama", uraian: "1/4 = 4/16. 2/6 = 1/3. 3/9 = 1/3. Kedua bilangan dikali atau dibagi bilangan yang sama.", contoh: "Jangan kali pembilang saja." },
        { nama: "Koma", singkat: "Satu atau dua angka", uraian: "1/10 = 0,1. 3/10 = 0,3. 7/100 = 0,07. 0,25 = 25/100. 15/100 = 0,15.", contoh: "Nol di depan koma tetap ditulis." },
        { nama: "Persen", singkat: "Dari 100", uraian: "0,75 = 75%. 0,35 = 35%. 20/50 = 40%. 6/10 = 60%. Geser koma dua langkah ke kanan.", contoh: "Perseratus dan persen saudara." },
      ],
      kuis: [
        { pertanyaan: "Mana lebih besar, 1/4 atau 1/9?", alias: ["1/4"] },
        { pertanyaan: "Urutkan 1/10, 1/5, 1/2 dari kecil.", alias: ["1/10", "1/5", "1/2"] },
        { pertanyaan: "Mana lebih besar, 2/5 atau 4/5?", alias: ["4/5"] },
        { pertanyaan: "Urutkan 6/8, 1/8, 3/8, 5/8 dari kecil.", alias: ["1/8", "3/8", "5/8", "6/8"] },
        { pertanyaan: "2/3 = berapa per 9?", alias: ["6"] },
        { pertanyaan: "1/2 = berapa per 10?", alias: ["5"] },
        { pertanyaan: "Baca 0,6.", alias: ["enam persepuluh"] },
        { pertanyaan: "0,04 sebagai pecahan.", alias: ["4/100"] },
        { pertanyaan: "0,09 sama dengan berapa persen?", alias: ["9"] },
        { pertanyaan: "40/100 sama dengan berapa persen?", alias: ["40"] },
        { pertanyaan: "Mana lebih besar, 0,8 atau 0,75?", alias: ["0,8"] },
        { pertanyaan: "Pasangkan 2/4, 2/6, 2/8.", alias: ["1/2", "1/3", "1/4"] },
        { pertanyaan: "Urutkan 3/10, 7/10, 1/10, 5/10.", alias: ["1/10", "3/10", "5/10", "7/10"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana lebih besar, 5/8 atau 2/8?", alias: ["5/8"] },
      ],
      voice: [[
        "Peta tiap sub-bab ada di dalam materi dapur.",
        "Pembilang satu dibanding dari penyebut. Penyebut sama dibanding dari pembilang.",
        "Senilai dikali sama. Dua angka di belakang koma menjadi persen.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Dapur Bolu",
      pengantar: "Sepuluh soal pola. Selesai sepuluh pos, irisan terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos dapur",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, senilai, yang beda",
          uraian: "Deret pecahan senilai, pembilang hilang, analogi, yang beda, desimal, persen, dan perbandingan pembilang satu.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB2),
      voice: [[
        "Igil menjaga sepuluh pos di dapur bolu.",
        "Ada deret senilai, angka hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membandingkan, menyejajarkan, dan mengubah pecahan.",
      labelDaftar: "Lembar evaluasi pecahan",
      kolom: 1,
      item: [
        {
          nama: "Bolu dan persen",
          singkat: "Gambar lalu simbol",
          uraian: "Urutan kecil ke besar 1/4, 1/3, 1/2. Tongkat 3/6 lebih panjang dari 2/6. 1/3 = 2/6. 0,25 = 25%. 20 dari 50 siswa sama dengan 40%.",
          contoh: "Cek senilai dengan mengali pembilang dan penyebut.",
        },
      ],
      kuis: [
        { pertanyaan: "Urutkan 1/2, 1/4, 1/3 dari kecil.", alias: ["1/4", "1/3", "1/2"] },
        { pertanyaan: "Mana lebih panjang, tongkat 3/6 atau 2/6?", alias: ["3/6"] },
        { pertanyaan: "1/3 = berapa per 6?", alias: ["2"] },
        { pertanyaan: "0,4 sama dengan pecahan apa?", alias: ["4/10"] },
        { pertanyaan: "Pasangkan 0,5, 0,25, 0,75.", alias: ["1/2", "1/4", "3/4"] },
        { pertanyaan: "0,25 sama dengan berapa persen?", alias: ["25"] },
        { pertanyaan: "Deret 1/2, 2/4, 3/6, berikutnya.", alias: ["4/8"] },
        { pertanyaan: "Mana yang bukan senilai 1/2?", alias: ["2/5"] },
        { pertanyaan: "Mana lebih besar, 1/2 atau 1/4?", alias: ["1/2"] },
        { pertanyaan: "20 dari 50 siswa sama dengan berapa persen?", alias: ["40"] },
      ],
      voice: [[
        "Sepuluh soal dapur bolu. Lihat pembilang dan penyebut sebelum memilih.",
        "Pembilang satu dibanding dari penyebut. Perseratus bisa langsung ditulis persen.",
      ]],
    },
  ],
};
