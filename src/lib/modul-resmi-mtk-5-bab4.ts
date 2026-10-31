import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB4 } from "@/lib/misi-mtk-5-bab4";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB4 = "Bab 4: Keliling Bangun Datar";

export const MODUL_MTK5_BAB4: ModulResmiPai = {
  id: "mtk-5-bab4",
  judul: JUDUL_MTK5_BAB4,
  pola: /^bab 4: keliling bangun datar$/,
  motivasi:
    "Raka, Dina, dan Farid mengukur pagar taman senja bersama burung hantu Igil. Mereka menjumlahkan tepi segitiga, segi empat, segi banyak, dan bangun gabungan.",
  kunciJawaban: "B,A,B,C,B,A,C,A,C,A",
  sketsaKartu: [
    "Raka, Dina, dan Farid di pagar taman senja bersama Igil.",
    "Catatan keliling segitiga, segi empat, segi banyak, dan bangun gabungan.",
    "Sepuluh pos tepi kanal.",
    "Poin penting dan lembar evaluasi keliling.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Keliling bangun datar adalah...
A) luas daerah di dalamnya
B) jumlah panjang sisi-sisinya
C) banyak sudutnya
D) isi bangun itu`,
    `[Soal 2 - PG - Tipe: MOTS]
Taman panjang 100 m dan lebar 50 m. Kelilingnya...
A) 300 m
B) 150 m
C) 200 m
D) 250 m`,
    `[Soal 3 - PG - Tipe: MOTS]
Segitiga dengan sisi 7 cm, 4 cm, dan 5 cm. Kelilingnya...
A) 14 cm
B) 16 cm
C) 15 cm
D) 12 cm`,
    `[Soal 4 - PG - Tipe: MOTS]
Segitiga sama sisi dengan sisi 6 cm. Kelilingnya...
A) 9 cm
B) 12 cm
C) 18 cm
D) 36 cm`,
    `[Soal 5 - PG - Tipe: MOTS]
Persegi panjang 5 cm dan 3 cm. Kelilingnya...
A) 8 cm
B) 16 cm
C) 15 cm
D) 30 cm`,
    `[Soal 6 - PG - Tipe: MOTS]
Persegi dengan sisi 3 cm. Kelilingnya...
A) 12 cm
B) 9 cm
C) 6 cm
D) 16 cm`,
    `[Soal 7 - PG - Tipe: MOTS]
Segi lima beraturan dengan sisi 3 cm. Kelilingnya...
A) 9 cm
B) 12 cm
C) 15 cm
D) 18 cm`,
    `[Soal 8 - PG - Tipe: MOTS]
Segi enam beraturan dengan sisi 3 cm. Kelilingnya...
A) 18 cm
B) 12 cm
C) 15 cm
D) 9 cm`,
    `[Soal 9 - PG - Tipe: HOTS]
Tepi luar sebuah denah dijumlahkan sama dengan 4 × 12. Kelilingnya...
A) 36 m
B) 40 m
C) 48 m
D) 60 m`,
    `[Soal 10 - PG - Tipe: HOTS]
Layang-layang sisi pendek 2 cm dan sisi panjang 4 cm. Kelilingnya...
A) 12 cm
B) 8 cm
C) 6 cm
D) 16 cm`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Pagar Taman Senja",
      pengantar: "Raka, Dina, Farid, dan Igil mengukur tepi pagar, bingkai, dan layang.",
      labelDaftar: "Lima adegan taman senja",
      kolom: 1,
      item: [
        { nama: "Arti keliling", singkat: "Jumlah tepi", uraian: "Keliling adalah jumlah panjang sisi. Taman 100 + 50 + 100 + 50 = 300 m. Bingkai 4 + 4 + 4 + 4 = 16 cm.", contoh: "Mulai di satu titik, susuri tepi, berhenti di titik semula." },
        { nama: "Segitiga", singkat: "Tiga sisi", uraian: "Sembarang: jumlahkan tiga sisi. 7 + 4 + 5 = 16. Sama sisi: 3 × sisi. Sisi 5 cm menjadi 15 cm. Sisi 6 cm menjadi 18 cm. Sama kaki: 2 × kaki + alas. 2 × 6 + 4 = 16.", contoh: "Sisi yang sama boleh dikali." },
        { nama: "Segi empat", singkat: "Empat sisi", uraian: "Persegi panjang: (2 × panjang) + (2 × lebar). Persegi dan belah ketupat: 4 × sisi. Jajargenjang: (2 × alas) + (2 × samping). Layang-layang: (2 × pendek) + (2 × panjang). Trapesium dan segi empat sembarang dijumlahkan satu per satu.", contoh: "Sisi 3 cm pada persegi kelilingnya 12 cm." },
        { nama: "Segi banyak dan gabungan", singkat: "Tepi luar", uraian: "Segi banyak beraturan: banyak sisi × panjang sisi. Segi lima 15 cm. Segi enam 18 cm. Segi delapan: 8 × sisi. Bangun gabungan hanya menghitung tepi luar. Denah itu 48 m.", contoh: "Jangan jumlahkan keliling bagian dalamnya." },
      ],
      kuis: [
        { pertanyaan: "Sisi 5, 4, 5, dan 5.", alias: ["19"] },
        { pertanyaan: "Sisi 8, 6, 8, dan 6.", alias: ["28"] },
        { pertanyaan: "Sisi 8, 5, dan 4.", alias: ["17"] },
        { pertanyaan: "Sisi 9, 6, dan 7.", alias: ["22"] },
        { pertanyaan: "Panjang 7 dan lebar 2.", alias: ["18"] },
        { pertanyaan: "Panjang 9 dan lebar 5.", alias: ["28"] },
        { pertanyaan: "Segi lima beraturan sisi 2.", alias: ["10"] },
        { pertanyaan: "Segi enam beraturan sisi 5.", alias: ["30"] },
        { pertanyaan: "Tepi 7, 4, 3, 2, 4, dan 6.", alias: ["26"] },
        { pertanyaan: "Tepi 9, 2, 4, 2, 5, dan 3.", alias: ["25"] },
        { pertanyaan: "Jarak yang disebut keliling.", alias: ["tepi"] },
        { pertanyaan: "Urutan mengukur keliling.", alias: ["ukur", "jumlah", "satuan"] },
        { pertanyaan: "Tiga pernyataan segitiga.", alias: ["salah", "benar", "benar"] },
        { pertanyaan: "Layang-layang 2 dan 4.", alias: ["12"] },
        { pertanyaan: "Pasangkan segi banyak.", alias: ["15", "18", "12"] },
      ],
      voice: [[
        "Keliling adalah jumlah panjang tepi.",
        "Sisi yang sama panjang boleh dikali.",
        "Pada bangun gabungan, yang dihitung hanya tepi luar.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Catatan Keliling",
      pengantar: "Catatan cara menghitung keliling di taman senja.",
      labelDaftar: "Lima catatan keliling",
      kolom: 1,
      item: [
        { nama: "Nama keliling", singkat: "Tepi", uraian: "Menyusuri semua tepi lalu kembali disebut keliling.", contoh: "Bingkai 2 + 3 + 2 + 3 = 10 cm." },
        { nama: "Segitiga", singkat: "3 kali atau jumlah", uraian: "Sama sisi 5 cm kelilingnya 15 cm. Sama sisi 6 cm kelilingnya 18 cm.", contoh: "3 × sisi." },
        { nama: "Segi empat", singkat: "Kali atau jumlah", uraian: "Persegi sisi 3 cm kelilingnya 12 cm. Trapesium 4 + 2 + 5 + 3 = 14 cm.", contoh: "4 × sisi untuk persegi dan belah ketupat." },
        { nama: "Banyak dan gabungan", singkat: "Luar saja", uraian: "Segi enam sisi 3 cm kelilingnya 18 cm. Segi delapan sisi 2 cm kelilingnya 16 cm. Denah 48 m.", contoh: "Tepi yang tidak lurus satu garis dijumlah satu per satu." },
      ],
      kuis: [
        { pertanyaan: "Nama jumlah panjang sisi.", alias: ["keliling"] },
        { pertanyaan: "Sisi 2, 3, 2, dan 3.", alias: ["10"] },
        { pertanyaan: "Segitiga sama sisi 5 cm.", alias: ["15"] },
        { pertanyaan: "Segitiga sama sisi 6 cm.", alias: ["18"] },
        { pertanyaan: "Persegi sisi 3 cm.", alias: ["12"] },
        { pertanyaan: "Trapesium 4, 2, 5, dan 3.", alias: ["14"] },
        { pertanyaan: "Segi enam beraturan sisi 3.", alias: ["18"] },
        { pertanyaan: "Segi delapan beraturan sisi 2.", alias: ["16"] },
        { pertanyaan: "Tepi 20, 18, 20, 12, 3, dan 9.", alias: ["82"] },
        { pertanyaan: "Keliling denah.", alias: ["48"] },
        { pertanyaan: "Pasangkan rumus.", alias: ["15", "12", "18"] },
        { pertanyaan: "Tiga pernyataan keliling.", alias: ["salah", "benar", "benar"] },
        { pertanyaan: "Jajargenjang 5 dan 3.", alias: ["16"] },
        { pertanyaan: "Urutkan 10, 12, dan 18.", alias: ["10", "12", "18"] },
        { pertanyaan: "Belah ketupat sisi 3.", alias: ["12"] },
      ],
      voice: [[
        "Catatan ini merangkum tepi yang sudah diukur.",
        "Sisi sama panjang dikali banyaknya.",
        "Tepi dalam tidak masuk keliling.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Tepi Kanal",
      pengantar: "Sepuluh soal pola di batu kanal. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos pagar",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret keliling persegi. Panjang yang hilang. Analogi. Hitungan yang beda. Dua soal suara dan dua soal tulis.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB4),
      voice: [[
        "Igil menjaga sepuluh pos di tepi kanal.",
        "Ada deret, bagian hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal keliling dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi pagar senja",
      kolom: 1,
      item: [
        {
          nama: "Hitung keliling",
          singkat: "Jumlah tepi",
          uraian: "Keliling segitiga, segi empat, segi banyak, dan bangun gabungan dihitung dari panjang tepinya.",
          contoh: "Sisi yang sama boleh dikali.",
        },
      ],
      kuis: [
        { pertanyaan: "Segitiga sama sisi 8 cm.", alias: ["24"] },
        { pertanyaan: "Persegi panjang 4 cm dan 6 cm.", alias: ["20"] },
        { pertanyaan: "Segi delapan beraturan 10 cm.", alias: ["80"] },
        { pertanyaan: "Sisi 12, 16, 12, 12, dan 20.", alias: ["72"] },
        { pertanyaan: "Pasangkan keliling.", alias: ["22", "23", "28"] },
        { pertanyaan: "Tepi kiri 12, kanan 12, atas 8 dan 3.", alias: ["46"] },
        { pertanyaan: "Deret 6, 9, 12, berikutnya.", alias: ["15"] },
        { pertanyaan: "Belah ketupat sisi 7 cm.", alias: ["28"] },
        { pertanyaan: "Trapesium 6, 5, 4, dan 3.", alias: ["18"] },
        { pertanyaan: "Segi delapan beraturan sisi 4 cm.", alias: ["32"] },
      ],
      voice: [[
        "Sepuluh soal pagar senja. Baca pelan, lalu jumlahkan tepi.",
        "Sisi yang sama panjang boleh dikali. Tepi luar saja pada bangun gabungan.",
      ]],
    },
  ],
};
