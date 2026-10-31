import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB6 } from "@/lib/misi-mtk-5-bab6";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB6 = "Bab 6: Sudut";

export const MODUL_MTK5_BAB6: ModulResmiPai = {
  id: "mtk-5-bab6",
  judul: JUDUL_MTK5_BAB6,
  pola: /^bab 6: sudut$/,
  motivasi:
    "Seli, Jaka, dan Galih menjadi detektif sudut di taman menara bersama burung hantu Igil. Mereka mengecek siku, mengukur busur, dan melukis sudut.",
  kunciJawaban: "B,A,B,C,B,C,C,A,D,B",
  sketsaKartu: [
    "Seli, Jaka, dan Galih di taman menara bersama Igil.",
    "Catatan jenis sudut, jam, dan kipas.",
    "Sepuluh pos menara.",
    "Poin penting dan lembar evaluasi sudut.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Sudut adalah...
A) panjang sisi
B) daerah yang dibentuk dua garis yang bertemu di satu titik
C) banyak sisi
D) isi benda`,
    `[Soal 2 - PG - Tipe: LOTS]
Lipatan kertas detektif dipakai untuk menemukan...
A) sudut siku-siku
B) sudut nol
C) sudut penuh
D) sudut lurus`,
    `[Soal 3 - PG - Tipe: LOTS]
Sudut yang lebih kecil dari sudut siku-siku disebut...
A) tumpul
B) lancip
C) lurus
D) releks`,
    `[Soal 4 - PG - Tipe: MOTS]
Besar sudut siku-siku adalah...
A) 45°
B) 60°
C) 90°
D) 180°`,
    `[Soal 5 - PG - Tipe: MOTS]
Sudut terkecil pada pukul 01.00 adalah...
A) 15°
B) 30°
C) 60°
D) 90°`,
    `[Soal 6 - PG - Tipe: MOTS]
Kipas berukuran 105°, 130°, 135°, dan 85°. Yang paling lebar...
A) 85°
B) 105°
C) 135°
D) 130°`,
    `[Soal 7 - PG - Tipe: MOTS]
Sudut 120° termasuk sudut...
A) lancip
B) siku-siku
C) tumpul
D) lurus`,
    `[Soal 8 - PG - Tipe: MOTS]
Sudut lurus besarnya...
A) 180°
B) 90°
C) 360°
D) 120°`,
    `[Soal 9 - PG - Tipe: HOTS]
Satu putaran penuh besarnya...
A) 90°
B) 180°
C) 240°
D) 360°`,
    `[Soal 10 - PG - Tipe: HOTS]
Persegi panjang punya sudut siku-siku sebanyak...
A) 2
B) 4
C) 0
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Detektif Menara Jam",
      pengantar: "Seli, Jaka, Galih, dan Igil mengukur sudut di taman menara.",
      labelDaftar: "Lima adegan sudut",
      kolom: 1,
      item: [
        { nama: "Siku-siku", singkat: "Lipatan kertas", uraian: "Pojok bingkai sering siku-siku. Lipat kertas mendatar lalu tegak. Persegi panjang punya 4 sudut siku. Segi lima beratap punya 2. Wajik soal itu 0.", contoh: "Persegi yang diputar tetap punya 4 sudut siku." },
        { nama: "Bagian sudut", singkat: "Kaki dan titik", uraian: "Sudut dibentuk dua garis yang bertemu. Titik temunya titik sudut. Dua garisnya kaki sudut. Yang lebih kecil dari siku disebut lancip. Yang lebih besar disebut tumpul.", contoh: "Pojok tanpa titik sudut bukan sudut." },
        { nama: "Mengukur", singkat: "Busur derajat", uraian: "Satuan sudut adalah derajat. Sudut siku-siku 90°. Satu angka jam 30°. Kipas terlebar 135°. Sudut lurus 180°. Satu putaran 360°.", contoh: "Garis dasar yang menempel kaki sudut dibaca 0°." },
        { nama: "Melukis", singkat: "Cek skala", uraian: "Lukis dari titik sudut dan satu kaki. Tandai angka pada busur, lalu hubungkan. Skala yang terbalik pada 120° menghasilkan 60°.", contoh: "Kaki sudut tidak harus mendatar." },
      ],
      kuis: [
        { pertanyaan: "Sudut siku pada persegi panjang.", alias: ["4"] },
        { pertanyaan: "Sudut siku pada segi lima beratap.", alias: ["2"] },
        { pertanyaan: "Nama pojok bingkai.", alias: ["siku"] },
        { pertanyaan: "Urutan lipatan.", alias: ["mendatar", "tegak", "pojok"] },
        { pertanyaan: "Lebih kecil dari siku.", alias: ["lancip"] },
        { pertanyaan: "Lebih besar dari siku.", alias: ["tumpul"] },
        { pertanyaan: "Pojok tanpa titik sudut.", alias: ["bukan"] },
        { pertanyaan: "Ukuran sudut siku.", alias: ["90"] },
        { pertanyaan: "Pukul 04.00.", alias: ["120"] },
        { pertanyaan: "Pukul 07.00.", alias: ["150"] },
        { pertanyaan: "Pukul 02.00.", alias: ["60"] },
        { pertanyaan: "Kipas paling lebar.", alias: ["135"] },
        { pertanyaan: "180 ditambah 45.", alias: ["225"] },
        { pertanyaan: "Skala terbalik dari 120.", alias: ["60"] },
        { pertanyaan: "Pasangkan jam.", alias: ["30", "90", "150"] },
      ],
      voice: [[
        "Sudut adalah daerah di antara dua garis yang bertemu.",
        "Sudut siku-siku bisa dicek dengan lipatan kertas.",
        "Besar sudut diukur dengan busur derajat.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Catatan Sudut",
      pengantar: "Catatan jenis sudut, jam, dan kipas.",
      labelDaftar: "Lima catatan sudut",
      kolom: 1,
      item: [
        { nama: "Bangun", singkat: "Siku dan semua sudut", uraian: "Wajik soal itu tidak siku. Segitiga punya 3 sudut. Segi lima punya 5 sudut.", contoh: "Putar persegi, sudut sikunya tetap 4." },
        { nama: "Contoh jenis", singkat: "Lancip dan tumpul", uraian: "Pukul 08.00 tumpul. Pojok jendela siku-siku. Sudut 85° lancip. Sudut 130° tumpul.", contoh: "Gunting yang terbuka sedikit membentuk sudut lancip." },
        { nama: "Ukuran khusus", singkat: "180 dan 360", uraian: "Sudut lurus 180°. Satu putaran 360°. Contoh sudut releks 240°.", contoh: "360 dikurangi 120 sama dengan 240." },
        { nama: "Membandingkan", singkat: "Ukuran, bukan ujung", uraian: "Jarak ujung kaki belum tentu membuat sudut lebih besar. Urutkan 85, 105, lalu 135.", contoh: "Pukul 02.00 membentuk sudut lancip." },
      ],
      kuis: [
        { pertanyaan: "Sudut siku pada wajik.", alias: ["0"] },
        { pertanyaan: "Banyak sudut segitiga.", alias: ["3"] },
        { pertanyaan: "Jenis pukul 08.00.", alias: ["tumpul"] },
        { pertanyaan: "Jenis pojok jendela.", alias: ["siku"] },
        { pertanyaan: "Jenis 85 derajat.", alias: ["lancip"] },
        { pertanyaan: "Jenis 130 derajat.", alias: ["tumpul"] },
        { pertanyaan: "Sudut lurus.", alias: ["180"] },
        { pertanyaan: "Satu putaran.", alias: ["360"] },
        { pertanyaan: "360 dikurangi 120.", alias: ["240"] },
        { pertanyaan: "Banyak sudut segi lima.", alias: ["5"] },
        { pertanyaan: "Jenis 150 derajat.", alias: ["tumpul"] },
        { pertanyaan: "Pasangkan jenis.", alias: ["lancip", "siku", "tumpul"] },
        { pertanyaan: "Tiga pernyataan.", alias: ["salah", "benar", "benar"] },
        { pertanyaan: "Urutkan kipas.", alias: ["85", "105", "135"] },
        { pertanyaan: "Persegi diputar.", alias: ["4"] },
      ],
      voice: [[
        "Catatan ini merangkum jenis sudut yang sudah dicek.",
        "Satu angka pada jam besarnya 30 derajat.",
        "Sudut releks lebih besar dari sudut lurus.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Menara",
      pengantar: "Sepuluh soal pola di taman menara. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos sudut",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret jam. Sisa garis lurus. Analogi angka. Ukuran yang beda. Dua soal suara dan dua soal tulis.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB6),
      voice: [[
        "Igil menjaga sepuluh pos di taman menara.",
        "Ada deret, bagian hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal sudut dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi sudut",
      kolom: 1,
      item: [
        {
          nama: "Ukur dan bandingkan",
          singkat: "Jam, jenis, dan segi lima",
          uraian: "Sudut terkecil pada jam dihitung dari langkah 30 derajat. Jenis sudut dicek dari besarnya. Sudut dalam segi lima didapat dari dua sudut alas.",
          contoh: "Garis dasar busur yang menempel kaki sudut dibaca 0 derajat.",
        },
      ],
      kuis: [
        { pertanyaan: "Pukul 11.00.", alias: ["30"] },
        { pertanyaan: "Jenis 25 derajat.", alias: ["lancip"] },
        { pertanyaan: "Sudut alas segitiga 72.", alias: ["54"] },
        { pertanyaan: "Jam yang paling besar.", alias: ["06.00", "180"] },
        { pertanyaan: "Pasangkan ukuran khusus.", alias: ["nol", "lurus", "penuh"] },
        { pertanyaan: "54 ditambah 54.", alias: ["108"] },
        { pertanyaan: "Angka pada garis dasar.", alias: ["0"] },
        { pertanyaan: "Pertemuan jalan yang siku.", alias: ["bangau", "90"] },
        { pertanyaan: "Jenis 300 derajat.", alias: ["releks"] },
        { pertanyaan: "Persegi diputar.", alias: ["4"] },
      ],
      voice: [[
        "Sepuluh soal sudut. Baca pelan, lalu hitung atau sebutkan jenisnya.",
        "Sudut terkecil pada jam adalah yang lebih kecil dari satu putaran.",
      ]],
    },
  ],
};
