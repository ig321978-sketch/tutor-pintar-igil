import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB5 } from "@/lib/misi-mtk-5-bab5";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB5 = "Bab 5: Luas Daerah Bangun Datar";

export const MODUL_MTK5_BAB5: ModulResmiPai = {
  id: "mtk-5-bab5",
  judul: JUDUL_MTK5_BAB5,
  pola: /^bab 5: luas daerah bangun datar$/,
  motivasi:
    "Lala, Gio, dan Nia memasang ubin di tepi kanal bersama burung hantu Igil. Mereka menghitung luas petak, segitiga, segi empat, dan bangun gabungan.",
  kunciJawaban: "B,A,B,C,B,A,C,C,A,D",
  sketsaKartu: [
    "Lala, Gio, dan Nia memasang ubin di tepi kanal bersama Igil.",
    "Catatan luas petak, segitiga, segi empat, dan kawat.",
    "Sepuluh pos tepi kanal.",
    "Poin penting dan lembar evaluasi luas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Luas daerah bangun datar adalah...
A) banyak sudutnya
B) ukuran daerah di dalam tepinya
C) jumlah panjang sisinya
D) isi bendanya`,
    `[Soal 2 - PG - Tipe: LOTS]
Satu petak berukuran 1 m × 1 m disebut...
A) 1 m²
B) 1 m
C) 1 cm
D) 2 m²`,
    `[Soal 3 - PG - Tipe: MOTS]
Persegi panjang panjang 5 dan lebar 2. Luasnya...
A) 7
B) 10
C) 14
D) 3`,
    `[Soal 4 - PG - Tipe: MOTS]
Persegi dengan sisi 4. Luasnya...
A) 8
B) 12
C) 16
D) 20`,
    `[Soal 5 - PG - Tipe: MOTS]
Segitiga alas 4 dan tinggi 4. Luasnya...
A) 16
B) 8
C) 4
D) 12`,
    `[Soal 6 - PG - Tipe: MOTS]
Jajargenjang alas 4 dan tinggi 2. Luasnya...
A) 8
B) 6
C) 2
D) 16`,
    `[Soal 7 - PG - Tipe: MOTS]
Trapesium sisi atas 2, sisi alas 5, tinggi 2. Luasnya...
A) 9
B) 14
C) 7
D) 10`,
    `[Soal 8 - PG - Tipe: MOTS]
Layang-layang diagonal 5 dan 4. Luasnya...
A) 20
B) 9
C) 10
D) 4`,
    `[Soal 9 - PG - Tipe: HOTS]
Layang-layang luas 10 digabung segitiga luas 5. Luas gabungannya...
A) 15
B) 50
C) 5
D) 20`,
    `[Soal 10 - PG - Tipe: HOTS]
Kawat 60 cm. Mana yang paling luas?
A) 5 × 25
B) 20 × 10
C) kelilingnya saja
D) 15 × 15`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Ubin Tepi Kanal",
      pengantar: "Lala, Gio, Nia, dan Igil menghitung luas ubin di tepi kanal.",
      labelDaftar: "Lima adegan ubin",
      kolom: 1,
      item: [
        { nama: "Arti luas", singkat: "Petak satuan", uraian: "Luas adalah ukuran daerah di dalam tepi. Satu petak 1 m × 1 m sama dengan 1 m². Ruang tamu 13 m². Dua kamar 18 m². Dapur 6 m². Kamar mandi 2 m². Total 39 m².", contoh: "Bentuk boleh berubah, luas tetap." },
        { nama: "Persegi panjang dan persegi", singkat: "Kali ukuran", uraian: "Luas persegi panjang = panjang × lebar. 5 × 2 = 10. Luas persegi = sisi × sisi. 4 × 4 = 16.", contoh: "Persegi adalah persegi panjang yang sisinya sama." },
        { nama: "Segitiga dan segi empat lain", singkat: "Alas dan tinggi", uraian: "Segitiga: setengah × alas × tinggi. Jajargenjang: alas × tinggi. Trapesium: setengah × (atas + alas) × tinggi.", contoh: "Alas 4 dan tinggi 4 pada segitiga luasnya 8." },
        { nama: "Diagonal, gabungan, dan kawat", singkat: "Luas bisa beda", uraian: "Belah ketupat dan layang-layang: setengah × diagonal 1 × diagonal 2. Gabungan dijumlahkan. Kawat 60 cm paling luas saat 15 × 15 = 225.", contoh: "Keliling sama belum tentu luasnya sama." },
      ],
      kuis: [
        { pertanyaan: "Lantai 2 dan 4.", alias: ["8"] },
        { pertanyaan: "3 baris dan 5 kolom.", alias: ["15"] },
        { pertanyaan: "Panjang 6 dan lebar 4.", alias: ["24"] },
        { pertanyaan: "Persegi sisi 6.", alias: ["36"] },
        { pertanyaan: "Segitiga alas 7 tinggi 4.", alias: ["14"] },
        { pertanyaan: "Segitiga alas 8 tinggi 3.", alias: ["12"] },
        { pertanyaan: "Belah ketupat diagonal 6 dan 4.", alias: ["12"] },
        { pertanyaan: "Layang-layang diagonal 8 dan 5.", alias: ["20"] },
        { pertanyaan: "Panjang 12 dan lebar 8.", alias: ["96"] },
        { pertanyaan: "Panjang 9 dan lebar 5.", alias: ["45"] },
        { pertanyaan: "Dua lantai sama luas.", alias: ["sama"] },
        { pertanyaan: "Urutan menghitung petak.", alias: ["tutup", "hitung", "satuan"] },
        { pertanyaan: "Rumus persegi panjang.", alias: ["kali"] },
        { pertanyaan: "Segitiga alas 5 tinggi 4.", alias: ["10"] },
        { pertanyaan: "Pasangkan luas.", alias: ["10", "16", "7"] },
      ],
      voice: [[
        "Luas adalah ukuran daerah di dalam tepi.",
        "Petak satuan yang rapat dihitung satu per satu, atau dikali.",
        "Keliling yang sama bisa punya luas yang berbeda.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Catatan Luas",
      pengantar: "Catatan cara menghitung luas di tepi kanal.",
      labelDaftar: "Lima catatan luas",
      kolom: 1,
      item: [
        { nama: "Ruang", singkat: "39", uraian: "Tamu 13. Dua kamar 18. Total lantai 39.", contoh: "Satu ubin 1 m²." },
        { nama: "Persegi", singkat: "Sisi kali sisi", uraian: "Sisi 4 luasnya 16. Sisi 3 luasnya 9.", contoh: "4 × 4 = 16." },
        { nama: "Trapesium dan jajargenjang", singkat: "Tinggi", uraian: "Trapesium contohnya 7. Jajargenjang alas 6 tinggi 3 luasnya 18.", contoh: "Setengah jumlah sisi sejajar, kali tinggi." },
        { nama: "Gabungan dan kawat", singkat: "225", uraian: "Layang-layang 10 ditambah segitiga 5 menjadi 15. Kawat terluas 225.", contoh: "20 × 10 = 200." },
      ],
      kuis: [
        { pertanyaan: "Dua kamar.", alias: ["18"] },
        { pertanyaan: "Total ubin lantai.", alias: ["39"] },
        { pertanyaan: "Persegi sisi 5.", alias: ["25"] },
        { pertanyaan: "Persegi sisi 8.", alias: ["64"] },
        { pertanyaan: "Trapesium 2, 5, dan tinggi 2.", alias: ["7"] },
        { pertanyaan: "Jajargenjang 6 dan 3.", alias: ["18"] },
        { pertanyaan: "Layang-layang 6 dan 8.", alias: ["24"] },
        { pertanyaan: "Gabungan 10 dan 5.", alias: ["15"] },
        { pertanyaan: "15 kali 15.", alias: ["225"] },
        { pertanyaan: "20 kali 10.", alias: ["200"] },
        { pertanyaan: "Pasangkan kawat.", alias: ["200", "125", "225"] },
        { pertanyaan: "Tiga pernyataan luas.", alias: ["salah", "benar", "benar"] },
        { pertanyaan: "Belah ketupat 2 dan 4.", alias: ["4"] },
        { pertanyaan: "Urutkan 7, 10, dan 16.", alias: ["7", "10", "16"] },
        { pertanyaan: "10 ditambah 5.", alias: ["15"] },
      ],
      voice: [[
        "Catatan ini merangkum petak yang sudah dihitung.",
        "Setengah tinggi dipakai pada segitiga dan trapesium.",
        "Bangun gabungan dijumlah dari bagian-bagiannya.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Ubin",
      pengantar: "Sepuluh soal pola di batu kanal. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos ubin",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret luas. Panjang yang hilang. Analogi persegi. Hitungan yang beda. Dua soal suara dan dua soal tulis.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB5),
      voice: [[
        "Igil menjaga sepuluh pos di tepi kanal.",
        "Ada deret, bagian hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal luas dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi ubin",
      kolom: 1,
      item: [
        {
          nama: "Hitung luas",
          singkat: "Kali atau setengah",
          uraian: "Luas layang-layang, jajargenjang, segitiga, dan bangun gabungan dihitung dari ukuran yang diminta rumusnya.",
          contoh: "Bagian gabungan dijumlahkan.",
        },
      ],
      kuis: [
        { pertanyaan: "Layang-layang diagonal 24 dan 18.", alias: ["216"] },
        { pertanyaan: "Jajargenjang 16 dan 8 ditambah segitiga 16 dan 12.", alias: ["224"] },
        { pertanyaan: "Layang 5 dan 4 ditambah trapesium 2, 4, dan tinggi 4.", alias: ["22"] },
        { pertanyaan: "Persegi sisi 6.", alias: ["36"] },
        { pertanyaan: "Pasangkan luas.", alias: ["24", "18", "12"] },
        { pertanyaan: "Dua persegi panjang dan satu trapesium.", alias: ["22"] },
        { pertanyaan: "Deret 1, 4, 9, berikutnya.", alias: ["16"] },
        { pertanyaan: "Bentuk kawat yang lebih luas.", alias: ["15 × 15"] },
        { pertanyaan: "Trapesium 8, 4, dan tinggi 3.", alias: ["18"] },
        { pertanyaan: "Total lantai 13, 18, 6, dan 2.", alias: ["39"] },
      ],
      voice: [[
        "Sepuluh soal ubin. Baca pelan, lalu hitung luasnya.",
        "Setengah jangan sampai terlewat pada segitiga, trapesium, dan layang-layang.",
      ]],
    },
  ],
};
