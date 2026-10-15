import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB6 } from "@/lib/misi-mtk-4-bab6";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB6 = "Bab 6: Piktogram dan Diagram Batang";

export const MODUL_MTK4_BAB6: ModulResmiPai = {
  id: "mtk-4-bab6",
  judul: JUDUL_MTK4_BAB6,
  pola: /^bab 6: piktogram dan diagram batang$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menghitung mangga terjual bersama burung hantu Igil di lapak mangga.",
  kunciJawaban: "C,B,C,D,A,C,B,B,A,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menyusun gambar mangga dan batang bersama Igil.",
    "Piktogram dengan kunci, lalu diagram batang tegak.",
    "Sepuluh pos di lapak mangga.",
    "Poin penting dan lembar evaluasi piktogram dan diagram batang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Ada 4 gambar. Satu gambar = 1 mangga. Banyaknya...
A) 8
B) 2
C) 4
D) 6`,
    `[Soal 2 - PG - Tipe: MOTS]
Satu gambar = 2. Ada 5 gambar. Banyaknya...
A) 7
B) 10
C) 25
D) 5`,
    `[Soal 3 - PG - Tipe: MOTS]
Ujung batang sampai angka 9. Banyaknya...
A) 6
B) 3
C) 9
D) 12`,
    `[Soal 4 - PG - Tipe: MOTS]
Batang 4, 7, 2, dan 6. Yang paling banyak...
A) 4
B) 2
C) 6
D) 7`,
    `[Soal 5 - PG - Tipe: MOTS]
Selisih batang 13 dan batang 5 adalah...
A) 8
B) 18
C) 7
D) 9`,
    `[Soal 6 - PG - Tipe: MOTS]
Ada 6 mangga. Satu gambar = 1. Banyak gambar yang harus dibuat...
A) 12
B) 3
C) 6
D) 1`,
    `[Soal 7 - PG - Tipe: HOTS]
Satu gambar = 5. Ada 4 gambar. Banyaknya...
A) 9
B) 20
C) 45
D) 4`,
    `[Soal 8 - PG - Tipe: MOTS]
Dua batang sama-sama sampai 8. Pernyataan yang benar...
A) Yang pertama lebih banyak
B) Keduanya sama banyak
C) Selisihnya 8
D) Tidak ada data`,
    `[Soal 9 - PG - Tipe: HOTS]
3 gambar dengan kunci 2. Batang lain sampai 9. Selisihnya...
A) 3
B) 15
C) 12
D) 6`,
    `[Soal 10 - PG - Tipe: HOTS]
Data 11, 6, 14, dan 6. Berapa kategori yang paling sedikit?
A) 1
B) 4
C) 2
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mencatat mangga di lapak.",
      labelDaftar: "Empat adegan lapak mangga",
      kolom: 1,
      item: [
        { nama: "Menyusun piktogram", singkat: "Gambar yang sama", uraian: "Satu baris memakai gambar yang sama. Judul dan kunci wajib dibaca.", contoh: "Kunci 1: satu gambar berarti satu mangga." },
        { nama: "Membaca piktogram", singkat: "Kali dengan kunci", uraian: "Banyak mangga = banyak gambar × nilai kunci.", contoh: "4 gambar dengan kunci 2 sama dengan 8." },
        { nama: "Menyusun batang", singkat: "Ujung batang", uraian: "Tinggi batang mengikuti angka data. Sumbu punya angka.", contoh: "Jangan lupa judul." },
        { nama: "Membaca batang", singkat: "Bandingkan ujung", uraian: "Batang lebih tinggi berarti lebih banyak. Selisih = yang besar dikurangi yang kecil.", contoh: "8 dan 3 berselisih 5." },
      ],
      kuis: [
        { pertanyaan: "Tiga gambar, kunci 1. Berapa mangga?", alias: ["3"] },
        { pertanyaan: "Lima gambar, kunci 1. Berapa mangga?", alias: ["5"] },
        { pertanyaan: "6 gambar, kunci 2. Berapa mangga?", alias: ["12"] },
        { pertanyaan: "7 gambar, kunci 2. Berapa mangga?", alias: ["14"] },
        { pertanyaan: "Bilangan di antara 8 dan 10. Berapa?", alias: ["9"] },
        { pertanyaan: "4 ditambah 2. Berapa tinggi batang?", alias: ["6"] },
        { pertanyaan: "10 dikurangi 4. Berapa selisih?", alias: ["6"] },
        { pertanyaan: "12 dikurangi 5. Berapa selisih?", alias: ["7"] },
        { pertanyaan: "4 gambar, kunci 3. Berapa mangga?", alias: ["12"] },
        { pertanyaan: "Pasangkan data dengan hasilnya.", alias: ["5", "6", "8"] },
        { pertanyaan: "Susun dari yang paling sedikit.", alias: ["4", "9", "11", "15"] },
        { pertanyaan: "Periksa tiga pernyataan lapak.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana data yang paling banyak?", alias: ["9"] },
      ],
      voice: [[
        "Hari ini kita mencatat mangga yang terjual di lapak.",
        "Piktogram memakai gambar dan kunci. Diagram batang memakai batang dan angka.",
        "Baca kuncinya dulu. Lalu hitung, bandingkan, atau cari selisih.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari menyajikan dan membaca data.",
      labelDaftar: "Empat peta mangga",
      kolom: 1,
      item: [
        { nama: "Gambar satu-satu", singkat: "Kunci 1", uraian: "3 gambar dengan kunci 1 sama dengan 3 mangga.", contoh: "Gambar dalam satu baris harus sama." },
        { nama: "Gambar dikali kunci", singkat: "Kunci 2", uraian: "5 gambar × 2 = 10 mangga.", contoh: "Jangan menghitung gambar saja jika kuncinya bukan 1." },
        { nama: "Batang tegak", singkat: "Ujung = data", uraian: "Contoh batang sampai 5. Judul dan sumbu angka wajib ada.", contoh: "Batang mendatar: yang lebih panjang lebih banyak." },
        { nama: "Selisih batang", singkat: "Besar kurangi kecil", uraian: "8 − 3 = 5. Yang sama tinggi berarti sama banyak.", contoh: "Cari yang paling banyak dan yang paling sedikit." },
      ],
      kuis: [
        { pertanyaan: "Dua baris, tiap baris 4 gambar, kunci 1. Berapa?", alias: ["8"] },
        { pertanyaan: "2 + 4 mangga, kunci 1. Berapa gambar?", alias: ["6"] },
        { pertanyaan: "4 gambar, kunci 2. Berapa mangga?", alias: ["8"] },
        { pertanyaan: "9 gambar, kunci 2. Berapa mangga?", alias: ["18"] },
        { pertanyaan: "Bilangan di antara 10 dan 12. Berapa?", alias: ["11"] },
        { pertanyaan: "4 ditambah 3. Berapa tinggi batang?", alias: ["7"] },
        { pertanyaan: "16 dikurangi 7. Berapa selisih?", alias: ["9"] },
        { pertanyaan: "13 dikurangi 6. Berapa selisih?", alias: ["7"] },
        { pertanyaan: "2 gambar mewakili 10. Satu gambar mewakili berapa?", alias: ["5"] },
        { pertanyaan: "Pasangkan tampilan dengan namanya.", alias: ["piktogram", "batang", "kunci"] },
        { pertanyaan: "Susun dari yang paling sedikit.", alias: ["3", "8", "12", "16"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "2 gambar penuh dan 1 setengah, kunci 2. Berapa?", alias: ["5"] },
      ],
      voice: [[
        "Peta ini merangkum cara menyajikan dan membaca data.",
        "Piktogram: gambar kali kunci. Diagram batang: baca ujung batang.",
        "Yang lebih banyak terlihat dari gambar yang lebih banyak atau batang yang lebih tinggi.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Lapak Mangga",
      pengantar: "Sepuluh soal piktogram dan diagram batang. Selesai sepuluh pos, mangga terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos mangga",
      kolom: 1,
      item: [
        {
          nama: "Pos data",
          singkat: "Gambar dan batang",
          uraian: "Kunci gambar, ujung batang, dan selisih.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB6),
      voice: [[
        "Igil menjaga sepuluh pos di lapak mangga.",
        "Ada piktogram dan diagram batang. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal menyajikan dan membaca data.",
      labelDaftar: "Lembar evaluasi mangga",
      kolom: 1,
      item: [
        {
          nama: "Catatan lapak",
          singkat: "Baca lalu bandingkan",
          uraian: "5 gambar × 2 = 10. Selisih 16 dan 9 adalah 7. Dua gambar dengan kunci 5 sama dengan 10.",
          contoh: "Data yang sama tinggi berarti sama banyak.",
        },
      ],
      kuis: [
        { pertanyaan: "5 gambar, kunci 2. Berapa mangga?", alias: ["10"] },
        { pertanyaan: "Mana yang paling sedikit?", alias: ["3"] },
        { pertanyaan: "7 gambar, kunci 1. Berapa mangga?", alias: ["7"] },
        { pertanyaan: "3 gambar, kunci 4. Berapa mangga?", alias: ["12"] },
        { pertanyaan: "Pasangkan data dengan hasilnya.", alias: ["6", "8", "11"] },
        { pertanyaan: "16 dikurangi 9. Berapa selisih?", alias: ["7"] },
        { pertanyaan: "Senin 10, Selasa 7. Mana yang lebih banyak?", alias: ["senin"] },
        { pertanyaan: "Dua data sama. Berapa kategori yang sama?", alias: ["2"] },
        { pertanyaan: "2 gambar, kunci 5. Berapa mangga?", alias: ["10"] },
        { pertanyaan: "12 dikurangi 4. Berapa selisih?", alias: ["8"] },
      ],
      voice: [[
        "Sepuluh soal lapak mangga. Baca kuncinya dulu, atau lihat ujung batangnya.",
        "Piktogram memakai gambar. Diagram batang memakai batang. Keduanya menyajikan data.",
      ]],
    },
  ],
};
