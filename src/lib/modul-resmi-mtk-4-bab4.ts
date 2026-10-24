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
    "Nisa, Farhan, dan Cinta mengukur tutup meja dan isi botol bersama burung hantu Igil di toko toples.",
  kunciJawaban: "B,B,C,B,C,D,D,B,C,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta mengukur tutup meja dan isi toples bersama Igil.",
    "Luas dan volume dengan satuan tidak baku serta satuan baku.",
    "Sepuluh pos di toko toples.",
    "Poin penting dan lembar evaluasi luas dan volume.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Meja guru ditutup uang kertas tanpa celah. Luasnya...
A) 12 satuan
B) 21 satuan
C) 4 satuan
D) 8 satuan`,
    `[Soal 2 - PG - Tipe: MOTS]
Satuan baku untuk luas adalah...
A) Gelas
B) cm²
C) Gayung
D) Buku`,
    `[Soal 3 - PG - Tipe: MOTS]
Susu UHT 1.000 ml sama dengan...
A) 10 liter
B) 100 liter
C) 1 liter
D) 1.000 liter`,
    `[Soal 4 - PG - Tipe: MOTS]
Bangun yang diarsir pada petak 1 cm luasnya...
A) 9 cm²
B) 12 cm²
C) 13 cm²
D) 4 cm²`,
    `[Soal 5 - PG - Tipe: HOTS]
1 m² sama dengan...
A) 100 cm²
B) 1.000 cm²
C) 10.000 cm²
D) 100.000 cm²`,
    `[Soal 6 - PG - Tipe: MOTS]
Botol sabun A sama dengan berapa botol sabun C?
A) 4 botol
B) 8 botol
C) 12 botol
D) 10 botol`,
    `[Soal 7 - PG - Tipe: HOTS]
Meja lipat kecil ditutup 8 uang kertas atau 4 origami. Satuan yang lebih kecil adalah...
A) Origami
B) Keduanya sama besar
C) Penggaris
D) Uang kertas`,
    `[Soal 8 - PG - Tipe: MOTS]
1 liter 500 ml sama dengan...
A) 150 ml
B) 1.500 ml
C) 15.000 ml
D) 501 ml`,
    `[Soal 9 - PG - Tipe: HOTS]
Botol jus buah kira-kira...
A) 2 ml
B) 25 ml
C) 256 ml
D) 25.000 ml`,
    `[Soal 10 - PG - Tipe: HOTS]
Satu botol besar hand sanitizer sama dengan...
A) 4 botol kecil
B) 8 botol kecil
C) 10 botol kecil
D) 16 botol kecil`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengukur tutup meja dan isi botol.",
      labelDaftar: "Empat adegan toko toples",
      kolom: 1,
      item: [
        { nama: "Luas tidak baku", singkat: "Uang atau origami", uraian: "Meja lipat kecil 8 uang kertas atau 4 origami. Meja guru 21 uang kertas atau 12 origami.", contoh: "Tutup rapat, tanpa tumpang tindih." },
        { nama: "Luas baku", singkat: "cm² dan m²", uraian: "1 cm × 1 cm = 1 cm². Bangun diarsir 12 cm². Dua bangun sama-sama 13 cm². 1 m² = 10.000 cm².", contoh: "m² ke cm² dikali 100 × 100." },
        { nama: "Volume tidak baku", singkat: "Botol sabun", uraian: "Botol A = 4 botol B atau 10 botol C. Botol besar = 8 botol kecil.", contoh: "Satuan beda, hitungan beda." },
        { nama: "Volume baku", singkat: "ml, liter, cm³", uraian: "1.000 ml = 1 liter. Jus 256 ml. Kubus A 9, B 8, C 12, D 18 cm³. 1 cm³ = 1 ml.", contoh: "Tiga susu 250, 200, dan 1.000 ml berjumlah 1.450 ml." },
      ],
      kuis: [
        { pertanyaan: "Meja guru ditutup berapa uang kertas?", alias: ["21"] },
        { pertanyaan: "Meja lipat kecil ditutup berapa origami?", alias: ["4"] },
        { pertanyaan: "1 m² sama dengan berapa cm²?", alias: ["10000"] },
        { pertanyaan: "Luas bangun yang diarsir?", alias: ["12"] },
        { pertanyaan: "Botol A sama dengan berapa botol B?", alias: ["4"] },
        { pertanyaan: "Botol besar sama dengan berapa botol kecil?", alias: ["8"] },
        { pertanyaan: "Susu UHT 1.000 ml sama dengan berapa liter?", alias: ["1"] },
        { pertanyaan: "Volume bangun A dalam cm³?", alias: ["9"] },
        { pertanyaan: "Meja kecil ditutup berapa origami?", alias: ["4"] },
        { pertanyaan: "Pasangkan alat dengan jenis satuannya.", alias: ["luas", "volume"] },
        { pertanyaan: "Susun 4, 8, 12, 21.", alias: ["4", "8", "12", "21"] },
        { pertanyaan: "Periksa tiga pernyataan toko.", alias: ["benar", "salah"] },
        { pertanyaan: "Satuan baku luas adalah...", alias: ["cm2"] },
        { pertanyaan: "Perkiraan botol air mineral paling masuk akal.", alias: ["1000"] },
      ],
      voice: [[
        "Hari ini kita mengukur tutup meja dan isi botol di toko Igil.",
        "Luas menutup permukaan tanpa celah. Volume mengisi ruang.",
        "Satuan tidak baku hasilnya bisa beda. Satuan baku memakai cm², m², ml, liter, dan cm³.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Peta dan latihan tiap bagian ada di dalam materi luas dan volume.",
      labelDaftar: "Latihan di dalam pengukuran luas dan volume",
      kolom: 1,
      item: [
        { nama: "Tutup rapat", singkat: "Uang atau origami", uraian: "Meja kecil 8 atau 4. Meja guru 21 atau 12.", contoh: "Tanpa celah dan tanpa tumpuk." },
        { nama: "Petak baku", singkat: "10.000 cm²", uraian: "Bangun diarsir 12 cm². Dua bangun sama-sama 13 cm².", contoh: "m² ke cm² dikali 10.000." },
        { nama: "Isi wadah", singkat: "Botol sabun", uraian: "Botol A = 4 botol B atau 10 botol C. Botol besar = 8 botol kecil.", contoh: "Satuan yang sama dulu." },
        { nama: "Liter dan kubus", singkat: "1.000 ml", uraian: "Tiga susu berjumlah 1.450 ml. Sendok 5 ml, cangkir 240 ml, botol 330 ml.", contoh: "1 cm³ sama dengan 1 ml." },
      ],
      kuis: [
        { pertanyaan: "Bangun (ii) yang sama dengan bangun (i)?", alias: ["13"] },
        { pertanyaan: "Pasangkan ukuran dengan jenisnya.", alias: ["luas", "volume"] },
        { pertanyaan: "Susun 5 ml, 240 ml, 330 ml, 1.000 ml.", alias: ["5", "240", "330", "1000"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "250 ml + 200 ml + 1.000 ml?", alias: ["1450"] },
      ],
      voice: [[
        "Peta luas dan volume ada di dalam materi, pada tiap bagian.",
        "Tutup permukaan tanpa celah. Isi ruang dengan satuan yang sama.",
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
          uraian: "Bangun diarsir 12 cm². Susu 1.000 ml = 1 liter. 1 m² = 10.000 cm². 3 × 3 × 2 = 18 cm³.",
          contoh: "Satuan kecil membuat hitungan lebih banyak.",
        },
      ],
      kuis: [
        { pertanyaan: "Bangun diarsir 3 × 4. Luasnya?", alias: ["12"] },
        { pertanyaan: "Uang kertas atau origami, mana hitungannya lebih banyak?", alias: ["uang"] },
        { pertanyaan: "1.000 ml sama dengan berapa liter?", alias: ["1"] },
        { pertanyaan: "3 × 3 × 2 kubus. Volumenya?", alias: ["18"] },
        { pertanyaan: "Pasangkan hitungan dengan hasilnya.", alias: ["24 cm²", "2 liter", "12 cm³"] },
        { pertanyaan: "1 m² sama dengan berapa cm²?", alias: ["10000"] },
        { pertanyaan: "Satuan dua kali lebih luas. Kira-kira berapa satuan?", alias: ["4"] },
        { pertanyaan: "1 liter 500 ml sama dengan berapa ml?", alias: ["1500"] },
        { pertanyaan: "Botol A sama dengan berapa botol B?", alias: ["4"] },
        { pertanyaan: "4 botol B atau 4 botol C, mana volume yang lebih besar?", alias: ["botol b"] },
      ],
      voice: [[
        "Sepuluh soal toko toples. Lihat dulu, ini menutup permukaan atau mengisi ruang.",
        "Satuan baku luas cm² dan m². Satuan baku volume ml, liter, dan cm³.",
      ]],
    },
  ],
};
