import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_KELILING } from "@/lib/misi-mtk-3-keliling";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_KELILING = "Bab 12: Keliling dan Luas";

export const MODUL_MTK3_KELILING: ModulResmiPai = {
  id: "mtk-3-keliling",
  judul: JUDUL_MTK3_KELILING,
  pola: /^bab 12: keliling dan luas$/,
  motivasi:
    "Nisa, Farhan, dan Cinta mengukur tali kebun dan menghitung petak bersama burung hantu Igil.",
  kunciJawaban: "C,B,D,B,B,C,C,C,A,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta mengukur kebun bersama burung hantu Igil.",
    "Keliling persegi, keliling persegi panjang, jumlah sisi, luas petak, dan membandingkan luas.",
    "Sepuluh pos kebun.",
    "Poin penting dan lembar evaluasi keliling dan luas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Persegi dengan sisi 4. Kelilingnya...
A) 8
B) 12
C) 16
D) 20`,
    `[Soal 2 - PG - Tipe: MOTS]
Persegi panjang 7 dan 3. Kelilingnya...
A) 10
B) 20
C) 21
D) 17`,
    `[Soal 3 - PG - Tipe: MOTS]
5 + 5 + 5 + 5. Hasilnya...
A) 15
B) 10
C) 25
D) 20`,
    `[Soal 4 - PG - Tipe: MOTS]
3 baris, tiap baris 4 petak. Luasnya...
A) 7
B) 12
C) 1
D) 34`,
    `[Soal 5 - PG - Tipe: MOTS]
Keliling persegi dihitung dengan...
A) sisi + sisi
B) 4 × sisi
C) sisi × sisi
D) 2 × sisi`,
    `[Soal 6 - PG - Tipe: HOTS]
Persegi panjang 8 dan 4. Kelilingnya...
A) 12
B) 32
C) 24
D) 16`,
    `[Soal 7 - PG - Tipe: HOTS]
Kebun 6 petak dan kebun 9 petak. Yang lebih luas...
A) 6 petak
B) Sama
C) 9 petak
D) 15 petak`,
    `[Soal 8 - PG - Tipe: HOTS]
Persegi sisi 6 ditulis keliling 12. Yang benar...
A) 12
B) 18
C) 24
D) 36`,
    `[Soal 9 - PG - Tipe: HOTS]
Luas halaman dihitung dengan...
A) Menghitung petak di dalam
B) Mengelilingi sekali
C) Menghitung sudut
D) Menghitung sisi saja`,
    `[Soal 10 - PG - Tipe: HOTS]
9 + 2 + 9 + 2. Kelilingnya...
A) 11
B) 18
C) 22
D) 20`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengukur kebun petak.",
      labelDaftar: "Lima adegan kebun",
      kolom: 1,
      item: [
        { nama: "Keliling persegi", singkat: "Empat sisi sama", uraian: "Sisi 3. Keliling 12.", contoh: "Jumlahkan empat sisi, atau kali 4." },
        { nama: "Keliling panjang", singkat: "Panjang dan lebar", uraian: "Panjang 6, lebar 2. Keliling 16.", contoh: "Jumlahkan dua panjang dan dua lebar." },
        { nama: "Jumlah sisi", singkat: "Tali mengelilingi", uraian: "4 + 5 + 4 + 5 = 18.", contoh: "Jumlahkan semua sisi yang dilalui." },
        { nama: "Luas petak", singkat: "Hitung petak dalam", uraian: "2 baris × 3 petak = 6.", contoh: "Hitung petak di dalam tali." },
        { nama: "Banding luas", singkat: "Petak yang sama", uraian: "Dua kebun yang petaknya sama banyak, luasnya sama.", contoh: "Yang petaknya lebih banyak, luasnya lebih besar." },
      ],
      kuis: [
        { pertanyaan: "Persegi sisi 5. Keliling?", alias: ["20"] },
        { pertanyaan: "Persegi sisi 7. Keliling?", alias: ["28"] },
        { pertanyaan: "Panjang 8 lebar 3. Keliling?", alias: ["22"] },
        { pertanyaan: "Panjang 9 lebar 4. Keliling?", alias: ["26"] },
        { pertanyaan: "7 + 3 + 7 + 3. Keliling?", alias: ["20"] },
        { pertanyaan: "10 + 5 + 10 + 5. Keliling?", alias: ["30"] },
        { pertanyaan: "3 baris 4 petak. Luas?", alias: ["12"] },
        { pertanyaan: "2 baris 5 petak. Luas?", alias: ["10"] },
        { pertanyaan: "10 petak dan 7 petak. Yang lebih luas?", alias: ["10"] },
        { pertanyaan: "2 baris 6 petak. Luas?", alias: ["12"] },
        { pertanyaan: "Persegi sisi 4. Keliling?", alias: ["16"] },
        { pertanyaan: "Pasangkan soal dan hasilnya.", alias: ["8", "12", "9"] },
        { pertanyaan: "Susun langkah keliling 4 dan 3.", alias: ["4 + 3", "kali 2", "14"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "3 baris 5 petak. Luas?", alias: ["15"] },
      ],
      voice: [["Di kebun, tali di tepi adalah keliling. Petak di dalam adalah luas."]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan keliling persegi, persegi panjang, dan luas petak.",
      labelDaftar: "Lima papan kebun",
      kolom: 1,
      item: [
        { nama: "Persegi", singkat: "4 × sisi", uraian: "Sisi 4. Keliling 16.", contoh: "Kalikan sisi dengan 4." },
        { nama: "Panjang", singkat: "Dua panjang dua lebar", uraian: "5 dan 3. Keliling 16.", contoh: "Jumlahkan panjang dan lebar, lalu kali 2." },
        { nama: "Jumlah", singkat: "Semua sisi", uraian: "3 + 3 + 3 + 3 = 12.", contoh: "Jumlahkan sisi yang dilalui tali." },
        { nama: "Petak", singkat: "Luas", uraian: "2 baris × 4 petak = 8.", contoh: "Hitung petak di dalam." },
        { nama: "Banding", singkat: "Sama atau beda", uraian: "6 petak dan 6 petak luasnya sama.", contoh: "Bandingkan jumlah petaknya." },
      ],
      kuis: [
        { pertanyaan: "Persegi sisi 8. Keliling?", alias: ["32"] },
        { pertanyaan: "Persegi sisi 9. Keliling?", alias: ["36"] },
        { pertanyaan: "Panjang 7 lebar 2. Keliling?", alias: ["18"] },
        { pertanyaan: "Panjang 6 lebar 5. Keliling?", alias: ["22"] },
        { pertanyaan: "8 + 2 + 8 + 2. Keliling?", alias: ["20"] },
        { pertanyaan: "9 + 6 + 9 + 6. Keliling?", alias: ["30"] },
        { pertanyaan: "4 baris 4 petak. Luas?", alias: ["16"] },
        { pertanyaan: "3 baris 5 petak. Luas?", alias: ["15"] },
        { pertanyaan: "10 petak dan 7 petak. Yang lebih luas?", alias: ["10"] },
        { pertanyaan: "2 baris 6 petak. Luas?", alias: ["12"] },
        { pertanyaan: "Panjang 9 lebar 1. Keliling?", alias: ["20"] },
        { pertanyaan: "Pasangkan soal dan hasilnya.", alias: ["24", "12", "4"] },
        { pertanyaan: "Susun langkah keliling sisi 5.", alias: ["sisi 5", "kali 4", "20"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "8 petak dan 5 petak. Yang lebih luas?", alias: ["8"] },
      ],
      voice: [["Papan ini menunjukkan cara menghitung tali di tepi dan petak di dalam."]],
    },
    {
      kode: "C",
      judul: "C. Pos Kebun Igil",
      pengantar: "Sepuluh soal keliling dan luas petak.",
      labelDaftar: "Sepuluh soal kebun",
      kolom: 1,
      item: [
        {
          nama: "Soal kebun",
          singkat: "Tali dan petak",
          uraian: "Hitung keliling, hitung petak, atau bandingkan luas.",
          contoh: "Salah boleh diulang. Petak tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_KELILING),
      voice: [["Sepuluh pos kebun. Pilih satu, lalu jawab."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal keliling dan luas.",
      labelDaftar: "Lembar evaluasi keliling",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Menghitung keliling persegi, persegi panjang, dan luas petak.",
          contoh: "Tali di tepi. Petak di dalam.",
        },
      ],
      kuis: [
        { pertanyaan: "Persegi sisi 8. Keliling?", alias: ["32"] },
        { pertanyaan: "Panjang 5 lebar 4. Keliling?", alias: ["18"] },
        { pertanyaan: "4 baris 3 petak. Luas?", alias: ["12"] },
        { pertanyaan: "Persegi sisi 10. Keliling?", alias: ["40"] },
        { pertanyaan: "Pasangkan soal dan hasilnya.", alias: ["12", "18", "10"] },
        { pertanyaan: "Panjang 6 lebar 4. Keliling?", alias: ["20"] },
        { pertanyaan: "Susun langkah luas 3 dan 4.", alias: ["3 baris", "4 petak", "12"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Panjang 10 lebar 5. Keliling?", alias: ["30"] },
        { pertanyaan: "Kebun A 8 petak, kebun B 9 petak. Yang lebih luas?", alias: ["B"] },
      ],
      voice: [["Sepuluh soal. Hitung tali di tepi, atau hitung petak di dalam."]],
    },
  ],
};
