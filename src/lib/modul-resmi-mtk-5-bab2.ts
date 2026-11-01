import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB2 } from "@/lib/misi-mtk-5-bab2";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB2 = "Bab 2: KPK dan FPB";

export const MODUL_MTK5_BAB2: ModulResmiPai = {
  id: "mtk-5-bab2",
  judul: JUDUL_MTK5_BAB2,
  pola: /^bab 2: kpk dan fpb$/,
  motivasi:
    "Laras, Dimas, dan Sena menyiapkan layangan di Bukit Senja bersama burung hantu Igil. Mereka mencari kelipatan, faktor, KPK, dan FPB.",
  kunciJawaban: "B,C,B,C,D,A,B,B,A,A",
  sketsaKartu: [
    "Laras, Dimas, dan Sena di bukit layangan bersama Igil.",
    "Peta kelipatan, faktor, KPK, FPB, dan bilangan prima.",
    "Sepuluh pos layangan.",
    "Poin penting dan lembar evaluasi KPK dan FPB.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Empat kelipatan pertama dari 6 adalah...
A) 0, 6, 12, 18
B) 6, 12, 18, 24
C) 6, 7, 8, 9
D) 12, 18, 24, 30`,
    `[Soal 2 - PG - Tipe: MOTS]
KPK dari 4 dan 5 adalah...
A) 9
B) 1
C) 20
D) 40`,
    `[Soal 3 - PG - Tipe: MOTS]
Faktor dari 18 yang paling besar di bawah 18 adalah...
A) 6
B) 9
C) 3
D) 12`,
    `[Soal 4 - PG - Tipe: MOTS]
FPB dari 12 dan 18 adalah...
A) 36
B) 3
C) 6
D) 2`,
    `[Soal 5 - PG - Tipe: MOTS]
Mana yang termasuk bilangan prima?
A) 1
B) 9
C) 15
D) 17`,
    `[Soal 6 - PG - Tipe: MOTS]
Faktorisasi prima dari 30 adalah...
A) 2 × 3 × 5
B) 3 × 10
C) 2 × 15
D) 5 × 6`,
    `[Soal 7 - PG - Tipe: MOTS]
KPK dari 6 dan 8 adalah...
A) 2
B) 24
C) 48
D) 14`,
    `[Soal 8 - PG - Tipe: HOTS]
Ada 20 pita merah dan 30 pita biru. Ikat paling banyak, dengan banyak pita tiap warna sama di setiap ikat. Banyak ikatnya...
A) 5
B) 10
C) 30
D) 2`,
    `[Soal 9 - PG - Tipe: HOTS]
KPK dari 18 dan 24 adalah...
A) 72
B) 6
C) 48
D) 42`,
    `[Soal 10 - PG - Tipe: MOTS]
FPB dari 7 dan 15 adalah...
A) 1
B) 7
C) 15
D) 105`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bukit Layangan Senja",
      pengantar: "Laras, Dimas, Sena, dan Igil menyiapkan layangan sambil belajar kelipatan, faktor, KPK, dan FPB.",
      labelDaftar: "Lima adegan bukit layangan",
      kolom: 1,
      item: [
        { nama: "Kelipatan", singkat: "Lompatan yang sama", uraian: "Kelipatan 4 adalah 4, 8, 12, 16, 20, dan seterusnya. Hitungan mulai dari bilangan itu sendiri. 0 kali 4 sama dengan 0, tetapi 0 bukan kelipatan.", contoh: "Kelipatan 6: 6, 12, 18, 24." },
        { nama: "KPK", singkat: "Pertemuan terdekat", uraian: "Kelipatan persekutuan adalah bilangan yang ada di kedua daftar. Yang paling kecil disebut KPK. Laras setiap 4 hari dan Dimas setiap 6 hari bertemu lagi setelah 12 hari.", contoh: "KPK 4 dan 6 adalah 12." },
        { nama: "Faktor", singkat: "Bagi tanpa sisa", uraian: "Faktor 12 adalah 1, 2, 3, 4, 6, dan 12. Mereka berpasangan: 1 dengan 12, 2 dengan 6, 3 dengan 4.", contoh: "Panjang potongan sama dan tidak ada sisa." },
        { nama: "FPB", singkat: "Kelompok paling banyak", uraian: "Faktor persekutuan 12 dan 18 adalah 1, 2, 3, dan 6. FPB-nya 6. Pita 24 dan 18 bisa dibuat 6 ikat. Tiap ikat berisi 4 pita merah dan 3 pita putih.", contoh: "FPB adalah faktor persekutuan yang terbesar." },
        { nama: "Prima dan faktorisasi", singkat: "Pohon dan tangga", uraian: "Bilangan prima hanya dibagi 1 dan dirinya. 1 bukan prima. 60 = 2 × 2 × 3 × 5. KPK mengalikan semua prima dengan pangkat tertinggi. FPB mengalikan prima yang berpasangan.", contoh: "FPB 72 dan 150 adalah 6. KPK-nya 1.800." },
      ],
      kuis: [
        { pertanyaan: "Sebutkan empat kelipatan 6 yang pertama.", alias: ["6", "12", "18", "24"] },
        { pertanyaan: "Kelipatan 8 yang kelima.", alias: ["40"] },
        { pertanyaan: "KPK dari 5 dan 9.", alias: ["45"] },
        { pertanyaan: "KPK dari 6 dan 8.", alias: ["24"] },
        { pertanyaan: "Semua faktor 16.", alias: ["1", "2", "4", "8", "16"] },
        { pertanyaan: "Semua faktor 20.", alias: ["1", "2", "4", "5", "10", "20"] },
        { pertanyaan: "FPB dari 8 dan 20.", alias: ["4"] },
        { pertanyaan: "FPB dari 12 dan 42.", alias: ["6"] },
        { pertanyaan: "Apakah 9 bilangan prima?", alias: ["bukan", "tidak"] },
        { pertanyaan: "Faktorisasi prima 36.", alias: ["2", "2", "3", "3"] },
        { pertanyaan: "Kelipatan 8 yang keempat.", alias: ["32"] },
        { pertanyaan: "Pasangkan KPK, pasangan faktor, dan prima terkecil.", alias: ["12", "4", "2"] },
        { pertanyaan: "Susun kelipatan 7 dari yang kecil.", alias: ["7", "14", "21", "28"] },
        { pertanyaan: "Periksa tiga pernyataan kelipatan dan prima.", alias: ["salah", "salah", "benar"] },
        { pertanyaan: "Tanggal pertemuan berikutnya setelah 5 September.", alias: ["17"] },
      ],
      voice: [[
        "Di Bukit Senja, layangan naik setiap beberapa hari.",
        "Kelipatan adalah lompatan yang sama. Faktor adalah pembagi yang habis.",
        "KPK mencari pertemuan terdekat. FPB mencari kelompok paling banyak.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Peta KPK dan FPB",
      pengantar: "Peta cara mencari kelipatan, faktor, KPK, FPB, dan faktorisasi prima.",
      labelDaftar: "Lima peta hitung",
      kolom: 1,
      item: [
        { nama: "Lompatan", singkat: "Tanpa nol", uraian: "Kelipatan 3: 3, 6, 9, 12. Lompatan tetap. Nol tidak masuk daftar.", contoh: "Bilangan dikali 1, 2, 3, dan seterusnya." },
        { nama: "Daftar KPK", singkat: "Tandai yang sama", uraian: "Tulis dua daftar kelipatan, tandai yang sama, ambil yang paling kecil. KPK 2, 3, dan 4 adalah 12.", contoh: "Tiga bilangan juga bisa dicari KPK-nya." },
        { nama: "Pasangan faktor", singkat: "Dua arah", uraian: "Faktor 12 berpasangan 1×12, 2×6, dan 3×4. Faktor 18 berpasangan 1×18, 2×9, dan 3×6.", contoh: "Urutkan dari yang kecil." },
        { nama: "FPB dari daftar", singkat: "Yang terbesar", uraian: "Faktor yang muncul di kedua bilangan adalah faktor persekutuan. Ambil yang terbesar. Jika tidak ada pasangan prima, FPB-nya 1.", contoh: "15 = 3 × 5 dan 28 = 2 × 2 × 7, jadi FPB-nya 1." },
        { nama: "Tangga bagi", singkat: "Semua pembagi", uraian: "Pada pembagian berulang, kalikan semua pembagi untuk mendapat KPK. Kalikan hanya pembagi yang membagi semua bilangan untuk mendapat FPB. Untuk 36 dan 48, KPK-nya 144 dan FPB-nya 12.", contoh: "Saringan sampai 100 menemukan 25 bilangan prima." },
      ],
      kuis: [
        { pertanyaan: "Empat kelipatan 11 yang pertama.", alias: ["11", "22", "33", "44"] },
        { pertanyaan: "Kelipatan 9 yang keempat.", alias: ["36"] },
        { pertanyaan: "KPK dari 3, 4, dan 5.", alias: ["60"] },
        { pertanyaan: "Tanggal pertemuan 14 Juli ditambah 10 hari.", alias: ["24"] },
        { pertanyaan: "Semua faktor 15.", alias: ["1", "3", "5", "15"] },
        { pertanyaan: "Semua faktor 28.", alias: ["1", "2", "4", "7", "14", "28"] },
        { pertanyaan: "FPB dari 15 dan 35.", alias: ["5"] },
        { pertanyaan: "Paket paling banyak dari 36, 48, dan 24.", alias: ["12"] },
        { pertanyaan: "Empat bilangan prima pertama.", alias: ["2", "3", "5", "7"] },
        { pertanyaan: "Faktorisasi prima 96.", alias: ["2", "2", "2", "2", "2", "3"] },
        { pertanyaan: "KPK dari 9 dan 12.", alias: ["36"] },
        { pertanyaan: "Pasangkan FPB, KPK, dan faktorisasi.", alias: ["10", "20", "2 × 3 × 5"] },
        { pertanyaan: "Susun faktor 18 dari yang kecil.", alias: ["1", "2", "3", "6", "9", "18"] },
        { pertanyaan: "Periksa tiga pernyataan FPB dan prima.", alias: ["salah", "benar", "salah"] },
        { pertanyaan: "KPK dari 6, 10, dan 15.", alias: ["30"] },
      ],
      voice: [[
        "Peta ini merangkum cara menghitung di bukit layangan.",
        "Daftar kelipatan dipakai untuk KPK. Daftar faktor dipakai untuk FPB.",
        "Prima yang berpasangan menjadi FPB. Semua prima dengan pangkat tertinggi menjadi KPK.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Layangan",
      pengantar: "Sepuluh soal pola di jalan layangan. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos layangan",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret naik 8. Angka hilang pada FPB. Analogi kali. Kelipatan yang beda. KPK, FPB, bilangan prima, dan hasil yang keliru.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB2),
      voice: [[
        "Igil menjaga sepuluh pos di jalan layangan.",
        "Ada deret, angka hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal kelipatan, faktor, KPK, FPB, dan jadwal.",
      labelDaftar: "Lembar evaluasi bukit layangan",
      kolom: 1,
      item: [
        {
          nama: "Hitung KPK dan FPB",
          singkat: "Daftar, pohon, atau tangga",
          uraian: "KPK dicari dari kelipatan yang sama atau dari faktor prima. FPB adalah faktor persekutuan yang terbesar. Jadwal bersama memakai KPK. Membagi kelompok sama rata memakai FPB.",
          contoh: "Periksa dengan perkalian balik.",
        },
      ],
      kuis: [
        { pertanyaan: "KPK 14 dan 21.", alias: ["42"] },
        { pertanyaan: "FPB 18 dan 24.", alias: ["6"] },
        { pertanyaan: "FPB 9 dan 12.", alias: ["3"] },
        { pertanyaan: "Kelompok paling banyak dari 16 dan 24.", alias: ["8"] },
        { pertanyaan: "Pasangkan KPK, FPB, dan faktorisasi.", alias: ["56", "6", "2 × 3 × 7"] },
        { pertanyaan: "Faktorisasi prima 48.", alias: ["2", "2", "2", "2", "3"] },
        { pertanyaan: "Deret 12, 24, 36, berikutnya.", alias: ["48"] },
        { pertanyaan: "Lonceng bersama lagi pukul 15.36.", alias: ["15.36"] },
        { pertanyaan: "Hari dan pasaran yang sama setelah berapa hari.", alias: ["35"] },
        { pertanyaan: "Pahing berikutnya setelah Selasa.", alias: ["minggu"] },
      ],
      voice: [[
        "Sepuluh soal bukit layangan. Baca pelan, lalu hitung.",
        "KPK adalah pertemuan terdekat. FPB adalah kelompok paling banyak.",
      ]],
    },
  ],
};
