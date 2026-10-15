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
    "Nisa, Farhan, dan Cinta membagi bolu, membaca desimal, dan mengenali persen bersama burung hantu Igil di dapur.",
  kunciJawaban: "B,C,B,C,B,A,B,B,D,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta membagi bolu bersama Igil.",
    "Pembilang satu, penyebut sama, senilai, desimal, dan persen.",
    "Sepuluh pos di dapur bolu.",
    "Poin penting dan lembar evaluasi pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Mana yang lebih besar, 1/3 atau 1/8?
A) 1/8
B) 1/3
C) Keduanya sama
D) 1/5`,
    `[Soal 2 - PG - Tipe: MOTS]
Mana yang lebih besar, 2/7 atau 6/7?
A) 2/7
B) Keduanya sama
C) 6/7
D) 1/7`,
    `[Soal 3 - PG - Tipe: MOTS]
1/2 senilai dengan...
A) 1/4
B) 2/4
C) 2/6
D) 3/8`,
    `[Soal 4 - PG - Tipe: HOTS]
Dari 1/2, 1/6, dan 1/3, yang paling kecil adalah...
A) 1/2
B) 1/3
C) 1/6
D) 1/4`,
    `[Soal 5 - PG - Tipe: MOTS]
0,6 sama dengan...
A) 6/100
B) 6/10
C) 6/1000
D) 60/10`,
    `[Soal 6 - PG - Tipe: MOTS]
0,25 sama dengan...
A) 25%
B) 2,5%
C) 250%
D) 2%`,
    `[Soal 7 - PG - Tipe: HOTS]
3/5 = ⬜/10. Pembilang yang hilang...
A) 5
B) 6
C) 8
D) 3`,
    `[Soal 8 - PG - Tipe: MOTS]
4/8 senilai dengan...
A) 1/4
B) 1/2
C) 3/4
D) 4/4`,
    `[Soal 9 - PG - Tipe: HOTS]
Mana yang bukan senilai 1/3?
A) 2/6
B) 3/9
C) 4/12
D) 2/5`,
    `[Soal 10 - PG - Tipe: HOTS]
Bolu 10 potong, Nisa makan 4 potong. Itu sama dengan...
A) 4%
B) 40%
C) 10%
D) 14%`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil membagi bolu di dapur.",
      labelDaftar: "Lima adegan dapur bolu",
      kolom: 1,
      item: [
        { nama: "Pembilang satu", singkat: "Satu iris", uraian: "1/2 lebih besar dari 1/8. Pembilang sama-sama 1. Penyebut lebih kecil, potongannya lebih besar.", contoh: "Satu keseluruhan dibagi sama." },
        { nama: "Penyebut sama", singkat: "Irisan sama besar", uraian: "5/6 lebih besar dari 2/6. Penyebut sama, pembilang yang lebih besar berarti bagian yang lebih banyak.", contoh: "Bandingkan pembilangnya." },
        { nama: "Senilai", singkat: "Sama besar, iris berbeda", uraian: "1/2 = 2/4 = 4/8. Pembilang dan penyebut dikali atau dibagi bilangan yang sama.", contoh: "Gambar dulu, baru simbol." },
        { nama: "Desimal", singkat: "Persepuluh dan perseratus", uraian: "0,7 = 7/10. 0,08 = 8/100. Koma memisahkan satuan dan pecahan.", contoh: "Satu angka di belakang koma: persepuluh." },
        { nama: "Persen", singkat: "Dari seratus", uraian: "25/100 = 0,25 = 25%. Persen berarti perseratus.", contoh: "Pembilang perseratus langsung jadi persen." },
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
        { pertanyaan: "2/5 = berapa per 10?", alias: ["4"] },
        { pertanyaan: "0,35 sama dengan berapa persen?", alias: ["35"] },
      ],
      voice: [[
        "Hari ini kita membagi bolu di dapur Igil.",
        "Pembilang ada di atas garis. Penyebut ada di bawah garis.",
        "Kita juga membaca koma desimal dan menghubungkannya dengan persen.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari membandingkan, menyejajarkan, dan mengubah pecahan.",
      labelDaftar: "Lima peta dapur",
      kolom: 1,
      item: [
        { nama: "Satu iris", singkat: "Penyebut menentukan", uraian: "1/4 lebih besar dari 1/9 karena bolu dibagi lebih sedikit.", contoh: "Pembilang 1, bandingkan penyebut." },
        { nama: "Iris sama", singkat: "Pembilang menentukan", uraian: "4/5 lebih besar dari 2/5. Lima irisan sama, empat lebih banyak dari dua.", contoh: "Penyebut sama, lihat pembilang." },
        { nama: "Senilai", singkat: "Kali yang sama", uraian: "2/3 = 6/9. 1/2 = 5/10. Kedua bilangan dikali bilangan yang sama.", contoh: "Jangan kali pembilang saja." },
        { nama: "Koma", singkat: "Satu atau dua angka", uraian: "0,6 = 6/10. 0,04 = 4/100. Dua angka di belakang koma berarti perseratus.", contoh: "Nol di depan koma tetap ditulis." },
        { nama: "Persen", singkat: "Dari 100", uraian: "0,09 = 9/100 = 9%. 40/100 = 40%.", contoh: "Perseratus dan persen saudara." },
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
        "Peta ini merangkum cara membandingkan irisan bolu.",
        "Pembilang satu: penyebut kecil, potongan besar. Penyebut sama: pembilang besar, bagian banyak.",
        "Senilai dikali sama. Koma dua angka menjadi persen.",
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
          uraian: "Urutan besar ke kecil 1/2, 1/3, 1/5, 1/10. 3/4 = 6/8. 0,08 = 8%. 2/8 = 25%.",
          contoh: "Cek senilai dengan mengali pembilang dan penyebut.",
        },
      ],
      kuis: [
        { pertanyaan: "Urutkan 1/2, 1/5, 1/3, 1/10 dari besar.", alias: ["1/2", "1/3", "1/5", "1/10"] },
        { pertanyaan: "Mana lebih besar, 5/9 atau 2/9?", alias: ["5/9"] },
        { pertanyaan: "3/4 = berapa per 8?", alias: ["6"] },
        { pertanyaan: "0,4 sama dengan pecahan apa?", alias: ["4/10"] },
        { pertanyaan: "Pasangkan 0,5, 0,25, 0,75.", alias: ["1/2", "1/4", "3/4"] },
        { pertanyaan: "0,08 sama dengan berapa persen?", alias: ["8"] },
        { pertanyaan: "Deret 1/2, 2/4, 3/6, berikutnya.", alias: ["4/8"] },
        { pertanyaan: "Mana yang bukan senilai 1/2?", alias: ["2/5"] },
        { pertanyaan: "Mana lebih besar, 1/4 atau 1/8?", alias: ["1/4"] },
        { pertanyaan: "2 iris dari 8 sama dengan berapa persen?", alias: ["25"] },
      ],
      voice: [[
        "Sepuluh soal dapur bolu. Lihat pembilang dan penyebut sebelum memilih.",
        "Pembilang satu dibanding dari penyebut. Perseratus bisa langsung ditulis persen.",
      ]],
    },
  ],
};
