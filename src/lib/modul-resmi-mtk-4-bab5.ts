import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB5 } from "@/lib/misi-mtk-4-bab5";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB5 = "Bab 5: Bangun Datar";

export const MODUL_MTK4_BAB5: ModulResmiPai = {
  id: "mtk-4-bab5",
  judul: JUDUL_MTK4_BAB5,
  pola: /^bab 5: bangun datar$/,
  motivasi:
    "Nisa, Farhan, dan Cinta memotong kaca jendela bersama burung hantu Igil di bengkel jendela.",
  kunciJawaban: "C,C,C,A,C,D,C,D,B,D",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menyusun kaca segitiga dan segiempat bersama Igil.",
    "Ciri bangun, cara menyusun, dan cara mengurai.",
    "Sepuluh pos di bengkel jendela.",
    "Poin penting dan lembar evaluasi bangun datar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Segitiga punya sudut...
A) 2
B) 4
C) 3
D) 5`,
    `[Soal 2 - PG - Tipe: MOTS]
Segiempat dengan tepat satu pasang sisi sejajar adalah...
A) Jajargenjang
B) Persegi
C) Trapesium
D) Segitiga`,
    `[Soal 3 - PG - Tipe: HOTS]
Segitiga sama sisi boleh disebut...
A) Sembarang
B) Lingkaran
C) Sama kaki
D) Trapesium`,
    `[Soal 4 - PG - Tipe: MOTS]
Belah ketupat yang sudutnya siku-siku adalah...
A) Persegi
B) Trapesium
C) Segilima
D) Lingkaran`,
    `[Soal 5 - PG - Tipe: MOTS]
Dua segitiga yang sama disusun jadi satu persegi panjang. Ada berapa segitiga?
A) 4
B) 3
C) 2
D) 6`,
    `[Soal 6 - PG - Tipe: HOTS]
Satu segienam diurai dari titik tengah menjadi segitiga. Ada berapa segitiga?
A) 4
B) 5
C) 8
D) 6`,
    `[Soal 7 - PG - Tipe: MOTS]
Mana yang bukan segi banyak?
A) Segilima
B) Segienam
C) Lingkaran
D) Segitiga`,
    `[Soal 8 - PG - Tipe: MOTS]
Jajargenjang punya pasang sisi berhadapan yang sejajar sebanyak...
A) 1
B) 3
C) 4
D) 2`,
    `[Soal 9 - PG - Tipe: MOTS]
Empat persegi kecil disusun jadi satu persegi besar. Banyak persegi kecil...
A) 2
B) 4
C) 8
D) 6`,
    `[Soal 10 - PG - Tipe: HOTS]
Satu persegi diurai jadi 2 persegi panjang. Tiap persegi panjang diurai jadi 2 segitiga. Ada berapa segitiga?
A) 2
B) 6
C) 8
D) 4`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengamati kaca di bengkel jendela.",
      labelDaftar: "Empat adegan bengkel jendela",
      kolom: 1,
      item: [
        { nama: "Ciri segitiga", singkat: "Sisi yang sama", uraian: "Sama kaki punya 2 sisi sama. Sama sisi punya semua sisi sama dan boleh disebut sama kaki. Sembarang tidak punya sisi yang sama.", contoh: "Segitiga punya 3 sisi dan 3 sudut." },
        { nama: "Ciri segiempat", singkat: "Pasang yang sejajar", uraian: "Jajargenjang punya dua pasang sisi sejajar. Trapesium punya tepat satu pasang. Persegi adalah belah ketupat yang siku-siku.", contoh: "Layang-layang punya dua pasang sisi berdekatan yang sama." },
        { nama: "Menyusun", singkat: "Lidi tersambung", uraian: "3 lidi jadi segitiga, 4 jadi segiempat, 5 jadi segilima, 6 jadi segienam.", contoh: "Cara susun boleh lebih dari satu." },
        { nama: "Mengurai", singkat: "Satu bangun, banyak cara", uraian: "Segienam dari titik tengah menjadi 6 segitiga. Taman segienam sisi 50 m kelilingnya 300 m.", contoh: "Cara urai boleh lebih dari satu." },
      ],
      kuis: [
        { pertanyaan: "Semua sisi beda panjang. Namanya?", alias: ["sembarang"] },
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3"] },
        { pertanyaan: "Tepat satu pasang sisi sejajar. Namanya?", alias: ["trapesium"] },
        { pertanyaan: "Persegi punya berapa sisi?", alias: ["4"] },
        { pertanyaan: "Sama kaki punya berapa sisi yang sama?", alias: ["2"] },
        { pertanyaan: "Segilima punya berapa sisi?", alias: ["5"] },
        { pertanyaan: "Segienam diurai dari titik tengah. Ada berapa segitiga?", alias: ["6"] },
        { pertanyaan: "Taman sisi 50 m, 6 sisi. Kelilingnya?", alias: ["300"] },
        { pertanyaan: "Sama sisi boleh disebut...", alias: ["sama kaki"] },
        { pertanyaan: "Pasangkan banyak sisi dengan namanya.", alias: ["segitiga", "segiempat", "segienam"] },
        { pertanyaan: "Susun dari sisi paling sedikit.", alias: ["3", "4", "5", "6"] },
        { pertanyaan: "Periksa tiga pernyataan bengkel.", alias: ["benar", "salah"] },
        { pertanyaan: "Belah ketupat bersudut siku-siku disebut...", alias: ["persegi"] },
      ],
      voice: [[
        "Hari ini kita mengamati kaca di bengkel jendela.",
        "Ciri bangun dilihat dari sisi, sudut, dan sisi yang sejajar.",
        "Menyusun berarti menggabungkan. Mengurai berarti memotong jadi beberapa bangun.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Peta dan latihan tiap bagian ada di dalam materi bangun datar.",
      labelDaftar: "Latihan di dalam ciri, susun, dan urai",
      kolom: 1,
      item: [
        { nama: "Peta segitiga", singkat: "Tiga macam sisi", uraian: "Sama kaki 2 sisi sama. Sama sisi semua sama. Sembarang tidak ada yang sama.", contoh: "Sama sisi boleh disebut sama kaki." },
        { nama: "Peta segiempat", singkat: "Sejajar atau siku", uraian: "Jajargenjang dua pasang. Trapesium tepat satu pasang. Persegi adalah belah ketupat yang siku-siku.", contoh: "Persegi panjang punya 4 sudut siku-siku." },
        { nama: "Peta susun", singkat: "Lidi tersambung", uraian: "3 lidi segitiga, 5 lidi segilima, 6 segitiga jadi segienam.", contoh: "Cara susun boleh lebih dari satu." },
        { nama: "Peta urai", singkat: "Potong jadi bagian", uraian: "Segienam dari tengah jadi 6 segitiga. Keliling taman 300 m.", contoh: "Satu bangun, lebih dari satu cara urai." },
      ],
      kuis: [
        { pertanyaan: "Belah ketupat boleh disebut...", alias: ["layang-layang"] },
        { pertanyaan: "Pasangkan ciri dengan namanya.", alias: ["trapesium", "persegi", "sama kaki"] },
        { pertanyaan: "Susun dari sisi paling sedikit.", alias: ["3", "4", "5", "6"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "Satu persegi jadi 2 bagian, tiap bagian 2 segitiga. Ada berapa?", alias: ["4"] },
      ],
      voice: [[
        "Peta bangun datar ada di dalam materi, pada tiap bagian.",
        "Susun beberapa bangun jadi satu. Urai satu bangun jadi beberapa bagian.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Bengkel Jendela",
      pengantar: "Sepuluh soal ciri, susun, dan urai. Selesai sepuluh pos, kaca terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos jendela",
      kolom: 1,
      item: [
        {
          nama: "Pos kaca",
          singkat: "Ciri dan susun",
          uraian: "Segitiga, segiempat, trapesium, persegi, dan cara mengurai.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB5),
      voice: [[
        "Igil menjaga sepuluh pos di bengkel jendela.",
        "Ada ciri bangun, cara menyusun, dan cara mengurai. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal ciri, susun, dan urai bangun datar.",
      labelDaftar: "Lembar evaluasi jendela",
      kolom: 1,
      item: [
        {
          nama: "Kaca jendela",
          singkat: "Amati lalu susun",
          uraian: "Segitiga 3 sisi. Persegi panjang 4 sudut siku-siku. Segienam dari 6 segitiga. Trapesium tepat 1 pasang sejajar.",
          contoh: "Satu bangun dapat diurai dengan lebih dari satu cara.",
        },
      ],
      kuis: [
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3"] },
        { pertanyaan: "Ciri persegi yang tidak selalu ada pada persegi panjang?", alias: ["sisi sama"] },
        { pertanyaan: "Ketiga sisi sama panjang. Namanya?", alias: ["sama sisi"] },
        { pertanyaan: "Layang-layang diurai jadi berapa segitiga?", alias: ["2"] },
        { pertanyaan: "Pasangkan ciri dengan bangunnya.", alias: ["segilima", "trapesium", "belah ketupat"] },
        { pertanyaan: "Persegi panjang punya berapa sudut siku-siku?", alias: ["4"] },
        { pertanyaan: "Mengapa sama sisi boleh disebut sama kaki?", alias: ["ciri"] },
        { pertanyaan: "Enam segitiga mengelilingi satu titik. Bangun yang mungkin...", alias: ["segienam"] },
        { pertanyaan: "Trapesium punya tepat berapa pasang sisi sejajar?", alias: ["1"] },
        { pertanyaan: "Dua persegi, tiap persegi jadi dua segitiga. Ada berapa segitiga?", alias: ["4"] },
      ],
      voice: [[
        "Sepuluh soal bengkel jendela. Lihat dulu sisinya, sudutnya, atau cara potongnya.",
        "Menyusun menggabungkan bangun. Mengurai memotong satu bangun menjadi beberapa bagian.",
      ]],
    },
  ],
};
