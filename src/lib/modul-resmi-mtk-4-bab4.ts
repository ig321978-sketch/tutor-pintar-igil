import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB4 } from "@/lib/misi-mtk-4-bab4";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB4 = "Bab 4: Pengukuran Luas dan Volume";

export const MODUL_MTK4_BAB4: ModulResmiPai = {
  id: "mtk-4-bab4",
  judul: JUDUL_MTK4_BAB4,
  pola: /^bab 4: pengukuran luas dan volume$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menutup alas dan mengisi toples bersama burung hantu Igil di toko toples.",
  kunciJawaban: "B,B,C,B,C,D,D,B,C,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta mengukur tutup meja dan isi toples bersama Igil.",
    "Luas dan volume dengan satuan tidak baku serta satuan baku.",
    "Sepuluh pos di toko toples.",
    "Poin penting dan lembar evaluasi luas dan volume.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Alas ditutup 4 baris. Tiap baris ada 6 kartu yang sama. Luasnya...
A) 10 kartu
B) 24 kartu
C) 20 kartu
D) 12 kartu`,
    `[Soal 2 - PG - Tipe: MOTS]
Satuan baku untuk luas adalah...
A) Gelas
B) cm²
C) Gayung
D) Buku`,
    `[Soal 3 - PG - Tipe: MOTS]
3.000 ml sama dengan...
A) 30 liter
B) 300 liter
C) 3 liter
D) 3.000 liter`,
    `[Soal 4 - PG - Tipe: MOTS]
Persegi panjang 8 cm × 2 cm. Luasnya...
A) 10 cm²
B) 16 cm²
C) 20 cm²
D) 6 cm²`,
    `[Soal 5 - PG - Tipe: HOTS]
1 m² sama dengan...
A) 100 cm²
B) 1.000 cm²
C) 10.000 cm²
D) 100.000 cm²`,
    `[Soal 6 - PG - Tipe: MOTS]
Kotak tersusun 2 × 5 × 2 kubus. Volumenya...
A) 9 cm³
B) 10 cm³
C) 12 cm³
D) 20 cm³`,
    `[Soal 7 - PG - Tipe: HOTS]
Meja yang sama ditutup 4 kartu besar atau 16 kartu kecil. Satuan yang lebih kecil adalah...
A) Kartu besar
B) Keduanya sama besar
C) Penggaris
D) Kartu kecil`,
    `[Soal 8 - PG - Tipe: MOTS]
1 liter 500 ml sama dengan...
A) 150 ml
B) 1.500 ml
C) 15.000 ml
D) 501 ml`,
    `[Soal 9 - PG - Tipe: HOTS]
Botol kira-kira berisi 2 liter. Perkiraan yang paling masuk akal...
A) 20 ml
B) 200 ml
C) 2.000 ml
D) 20.000 ml`,
    `[Soal 10 - PG - Tipe: HOTS]
Ada 4 lapis kubus, tiap lapis 6 kubus. Satu lapis diambil. Sisanya...
A) 24 cm³
B) 18 cm³
C) 10 cm³
D) 30 cm³`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengukur tutup meja dan isi toples.",
      labelDaftar: "Empat adegan toko toples",
      kolom: 1,
      item: [
        { nama: "Luas tidak baku", singkat: "Tutup tanpa celah", uraian: "Kartu, buku, atau tatakan yang sama besar boleh menutup alas. Satuan berbeda, hitungannya berbeda.", contoh: "Tutup rapat, tanpa tumpang tindih." },
        { nama: "Luas baku", singkat: "cm² dan m²", uraian: "1 petak cm adalah 1 cm². Luas = baris × kolom. 1 m² = 10.000 cm².", contoh: "Jangan kali 100 saja saat m² diubah ke cm²." },
        { nama: "Volume tidak baku", singkat: "Isi yang sama", uraian: "Gayung, gelas, atau kubus kayu yang sama dapat mengisi wadah. Gayung lebih besar, tuangan lebih sedikit.", contoh: "Wadahnya sama, alatnya beda." },
        { nama: "Volume baku", singkat: "ml, liter, cm³", uraian: "1.000 ml = 1 liter. Kubus 1 cm adalah 1 cm³. Volume = panjang × lebar × tinggi.", contoh: "Hitung kubus yang tersusun." },
      ],
      kuis: [
        { pertanyaan: "3 stiker dan 5 stiker menutup rapat. Luasnya?", alias: ["8"] },
        { pertanyaan: "3 baris dan 4 kolom. Berapa petak?", alias: ["12"] },
        { pertanyaan: "3 baris, tiap baris 4 petak cm. Luasnya?", alias: ["12"] },
        { pertanyaan: "6 cm × 4 cm. Luasnya?", alias: ["24"] },
        { pertanyaan: "3 tingkat, tiap tingkat 3 kubus. Volumenya?", alias: ["9"] },
        { pertanyaan: "2 lapis, tiap lapis 6 kubus. Volumenya?", alias: ["12"] },
        { pertanyaan: "Dua botol 2.000 ml. Berapa liter semuanya?", alias: ["4"] },
        { pertanyaan: "2 lapis, tiap lapis 8 kubus. Volumenya?", alias: ["16"] },
        { pertanyaan: "5 × 3 petak. Luasnya?", alias: ["15"] },
        { pertanyaan: "Pasangkan alat dengan jenis satuannya.", alias: ["luas", "volume"] },
        { pertanyaan: "Susun luas dari kecil.", alias: ["6", "10", "15", "21"] },
        { pertanyaan: "Periksa tiga pernyataan toko.", alias: ["benar", "salah"] },
        { pertanyaan: "Satuan baku luas adalah...", alias: ["cm2"] },
        { pertanyaan: "Perkiraan nampan paling masuk akal.", alias: ["18"] },
      ],
      voice: [[
        "Hari ini kita mengukur tutup meja dan isi toples di toko Igil.",
        "Luas menutup permukaan. Volume mengisi ruang.",
        "Satuan tidak baku hasilnya bisa beda. Satuan baku memakai cm², m², ml, liter, dan cm³.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari menutup permukaan dan mengisi ruang.",
      labelDaftar: "Empat peta toko",
      kolom: 1,
      item: [
        { nama: "Tutup rapat", singkat: "Satuan sama", uraian: "6 baris kartu, tiap baris 4. Ada 24 kartu.", contoh: "Tanpa celah dan tanpa tumpuk." },
        { nama: "Petak baku", singkat: "Kali baris", uraian: "7 cm × 3 cm = 21 cm². 1 m² = 10.000 cm².", contoh: "m² ke cm² dikali 10.000." },
        { nama: "Isi wadah", singkat: "Gayung atau kubus", uraian: "6 gayung memenuhi ember. 3 tingkat × 5 kubus = 15 kubus.", contoh: "Satuan yang sama dulu." },
        { nama: "Liter dan kubus", singkat: "1.000 ml", uraian: "2 liter = 2.000 ml. Kotak 5 × 2 × 2 = 20 cm³.", contoh: "Tiga ukuran dikalikan." },
      ],
      kuis: [
        { pertanyaan: "6 baris, tiap baris 4 kartu. Berapa kartu?", alias: ["24"] },
        { pertanyaan: "5 kartu besar atau berapa kartu kecil?", alias: ["20"] },
        { pertanyaan: "7 cm × 3 cm. Luasnya?", alias: ["21"] },
        { pertanyaan: "2 m² sama dengan berapa cm²?", alias: ["20000"] },
        { pertanyaan: "2 gayung ditambah 4 gayung. Volumenya?", alias: ["6"] },
        { pertanyaan: "3 tingkat, tiap tingkat 5 kubus. Berapa kubus?", alias: ["15"] },
        { pertanyaan: "2 liter sama dengan berapa ml?", alias: ["2000"] },
        { pertanyaan: "5 × 2 × 2 kubus. Volumenya?", alias: ["20"] },
        { pertanyaan: "1.500 ml sama dengan...", alias: ["1 liter 500 ml"] },
        { pertanyaan: "Pasangkan ukuran dengan jenisnya.", alias: ["luas", "volume"] },
        { pertanyaan: "Susun volume dari kecil.", alias: ["250", "500", "1000", "2000"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "Perkiraan botol yang paling masuk akal.", alias: ["900"] },
      ],
      voice: [[
        "Peta ini merangkum cara mengukur luas dan volume.",
        "Tutup permukaan tanpa celah. Isi ruang dengan satuan yang sama.",
        "1.000 ml sama dengan 1 liter. 1 m² sama dengan 10.000 cm².",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Toko Toples",
      pengantar: "Sepuluh soal luas dan volume. Selesai sepuluh pos, toples terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos toko",
      kolom: 1,
      item: [
        {
          nama: "Pos ukur",
          singkat: "Tutup dan isi",
          uraian: "Luas petak, liter, cm², kubus, dan satuan yang lebih kecil.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB4),
      voice: [[
        "Igil menjaga sepuluh pos di toko toples.",
        "Ada luas, volume, dan perkiraan. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal mengukur dan memperkirakan luas serta volume.",
      labelDaftar: "Lembar evaluasi toko",
      kolom: 1,
      item: [
        {
          nama: "Tutup dan isi",
          singkat: "Hitung lalu perkirakan",
          uraian: "9 × 4 = 36 cm². 7.000 ml = 7 liter. 1 m² = 10.000 cm². Dua lapis 6 kubus = 12 cm³.",
          contoh: "Satuan kecil membuat hitungan lebih banyak.",
        },
      ],
      kuis: [
        { pertanyaan: "9 × 4 petak. Luasnya?", alias: ["36"] },
        { pertanyaan: "Kartu kecil atau kartu besar, mana hitungannya lebih banyak?", alias: ["kecil"] },
        { pertanyaan: "7.000 ml sama dengan berapa liter?", alias: ["7"] },
        { pertanyaan: "2 × 4 × 3 kubus. Volumenya?", alias: ["24"] },
        { pertanyaan: "Pasangkan hitungan dengan hasilnya.", alias: ["24 cm²", "2 liter", "12 cm³"] },
        { pertanyaan: "1 m² sama dengan berapa cm²?", alias: ["10000"] },
        { pertanyaan: "Kartu diganti yang luasnya dua kali. Kira-kira berapa kartu?", alias: ["15"] },
        { pertanyaan: "1 liter 250 ml sama dengan berapa ml?", alias: ["1250"] },
        { pertanyaan: "6 kubus satu lapis, ada 2 lapis. Volumenya?", alias: ["12"] },
        { pertanyaan: "4 gayung atau 4 gelas, mana volume yang lebih besar?", alias: ["gayung"] },
      ],
      voice: [[
        "Sepuluh soal toko toples. Lihat dulu, ini menutup permukaan atau mengisi ruang.",
        "Satuan baku luas cm² dan m². Satuan baku volume ml, liter, dan cm³.",
      ]],
    },
  ],
};
