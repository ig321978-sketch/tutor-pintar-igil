import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB7 } from "@/lib/misi-mtk-5-bab7";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB7 = "Bab 7: Membandingkan Ciri-Ciri Bangun Datar";

export const MODUL_MTK5_BAB7: ModulResmiPai = {
  id: "mtk-5-bab7",
  judul: JUDUL_MTK5_BAB7,
  pola: /^bab 7: membandingkan ciri-ciri bangun datar$/,
  motivasi:
    "Dara, Beni, dan Tio membandingkan kerangka layang di padang senja bersama burung hantu Igil. Mereka mengecek segitiga, trapesium, jajargenjang, dan layang-layang.",
  kunciJawaban: "B,C,B,B,C,C,B,B,B,D",
  sketsaKartu: [
    "Dara, Beni, dan Tio di padang layang bersama Igil.",
    "Catatan ciri segitiga dan segi empat.",
    "Sepuluh pos padang.",
    "Poin penting dan lembar evaluasi bangun datar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Tiga batang dapat menjadi segitiga jika jumlah dua batang...
A) sama dengan batang ketiga
B) lebih panjang daripada batang ketiga
C) lebih pendek daripada batang ketiga
D) tidak perlu dicek`,
    `[Soal 2 - PG - Tipe: MOTS]
Kelompok batang yang tidak bisa menjadi segitiga adalah...
A) 6 cm, 7 cm, 8 cm
B) 5 cm, 5 cm, 6 cm
C) 3 cm, 4 cm, 8 cm
D) 5 cm, 12 cm, 13 cm`,
    `[Soal 3 - PG - Tipe: MOTS]
Segitiga bersudut 40°, 60°, dan 80° disebut...
A) tumpul
B) lancip
C) siku-siku
D) sama sisi`,
    `[Soal 4 - PG - Tipe: MOTS]
Dua sudut segitiga 75° dan 65°. Sudut ketiganya...
A) 50°
B) 40°
C) 30°
D) 140°`,
    `[Soal 5 - PG - Tipe: MOTS]
Pada segitiga siku-siku sama kaki, satu sudut yang bukan siku besarnya...
A) 60°
B) 30°
C) 45°
D) 90°`,
    `[Soal 6 - PG - Tipe: LOTS]
Satu sudut pada segitiga sama sisi besarnya...
A) 45°
B) 90°
C) 60°
D) 120°`,
    `[Soal 7 - PG - Tipe: LOTS]
Pada bab ini, trapesium adalah segi empat yang...
A) semua sudutnya siku
B) mempunyai minimal satu pasang sisi sejajar
C) semua sisinya sama panjang
D) tidak punya sisi sejajar`,
    `[Soal 8 - PG - Tipe: MOTS]
Persegi panjang adalah...
A) segitiga sama kaki
B) jajargenjang yang salah satu sudutnya siku
C) layang-layang tanpa sisi sejajar
D) trapesium tanpa sudut siku`,
    `[Soal 9 - PG - Tipe: HOTS]
Pernyataan yang tepat adalah...
A) semua jajargenjang adalah persegi
B) persegi boleh disebut persegi panjang
C) jajargenjang selalu trapesium sama kaki
D) segitiga sama kaki selalu sama sisi`,
    `[Soal 10 - PG - Tipe: HOTS]
Salah satu diagonal layang-layang merupakan...
A) sisi miring
B) sudut tumpul
C) panjang alas
D) sumbu simetri`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Padang Layang Senja",
      pengantar: "Dara, Beni, Tio, dan Igil membandingkan kerangka layang.",
      labelDaftar: "Empat adegan bangun datar",
      kolom: 1,
      item: [
        { nama: "Syarat segitiga", singkat: "Jumlah dua sisi", uraian: "Tiga batang menjadi segitiga jika jumlah dua batang lebih panjang daripada batang ketiga. Batang 5, 6, dan 7 bisa. Batang 5, 4, dan 12 tidak bisa. Batang 10, 5, dan 15 juga tidak, karena jumlah dua batang baru sama dengan batang ketiga.", contoh: "4, 6, dan 6 bisa, karena 4 + 6 lebih panjang daripada 6." },
        { nama: "Jenis sudut", singkat: "Lancip, siku, tumpul", uraian: "Segitiga lancip punya tiga sudut lancip. Segitiga siku-siku punya satu sudut 90 derajat. Segitiga tumpul punya satu sudut tumpul. Dua sudut siku atau dua sudut tumpul tidak muat.", contoh: "Jumlah sudut dalam segitiga 180 derajat. Contohnya 50 + 60 + 70." },
        { nama: "Panjang sisi", singkat: "Sama kaki dan sama sisi", uraian: "Sama kaki punya minimal dua sisi sama dan dua sudut sama. Sama sisi punya tiga sisi sama dan tiga sudut 60 derajat. Sama sisi boleh disebut sama kaki. Sama kaki belum tentu sama sisi. Sembarang punya sisi yang semuanya berbeda.", contoh: "Siku-siku sama kaki punya dua sudut 45 derajat." },
        { nama: "Segi empat", singkat: "Dari trapesium sampai persegi", uraian: "Trapesium pada bab ini punya minimal satu pasang sisi sejajar. Jajargenjang punya dua pasang sisi berhadapan yang sejajar, jadi ia juga trapesium, tetapi bukan trapesium sama kaki. Persegi panjang, belah ketupat, persegi, dan layang-layang saling berkaitan lewat ciri tambahannya.", contoh: "Layang-layang punya satu diagonal yang menjadi sumbu simetri." },
      ],
      kuis: [
        { pertanyaan: "Batang 8, 3, dan 4.", alias: ["tidak", "bukan"] },
        { pertanyaan: "Batang 6, 7, dan 8.", alias: ["bisa", "dapat"] },
        { pertanyaan: "Sudut 110 derajat.", alias: ["tumpul"] },
        { pertanyaan: "Urutan cek batang.", alias: ["jumlahkan", "bandingkan", "putuskan"] },
        { pertanyaan: "Sudut 35 dan 65.", alias: ["80"] },
        { pertanyaan: "Sudut siku sama kaki.", alias: ["45"] },
        { pertanyaan: "Sudut sama sisi.", alias: ["60"] },
        { pertanyaan: "Pasangkan panjang sisi.", alias: ["sama sisi", "sama kaki", "sembarang"] },
        { pertanyaan: "Pengertian trapesium.", alias: ["sejajar"] },
        { pertanyaan: "Jajargenjang dan trapesium.", alias: ["ya", "boleh"] },
        { pertanyaan: "Jajargenjang bersudut siku.", alias: ["persegi panjang"] },
      ],
      voice: [[
        "Dara, Beni, dan Tio membandingkan kerangka layang bersama Igil.",
        "Tiga batang menjadi segitiga jika jumlah dua batang lebih panjang daripada batang ketiga.",
        "Segi empat dibandingkan dari sisi sejajar, sudut, dan simetri.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Catatan Ciri",
      pengantar: "Catatan simetri dan hubungan antar bangun.",
      labelDaftar: "Empat catatan ciri",
      kolom: 1,
      item: [
        { nama: "Simetri segitiga", singkat: "Lipat dan putar", uraian: "Segitiga sama kaki punya 1 simetri lipat dan 1 simetri putar. Segitiga sama sisi punya 3 simetri lipat dan 3 simetri putar.", contoh: "Sama sisi memenuhi ciri sama kaki." },
        { nama: "Trapesium", singkat: "Minimal satu pasang", uraian: "Trapesium siku-siku punya satu sudut siku. Trapesium sama kaki punya satu simetri lipat. Jajargenjang bukan trapesium sama kaki.", contoh: "Jajargenjang tetap segi empat." },
        { nama: "Keluarga siku", singkat: "Persegi panjang dan persegi", uraian: "Persegi panjang memiliki semua ciri jajargenjang. Belah ketupat memiliki semua ciri jajargenjang dan semua ciri layang-layang. Persegi memiliki ciri belah ketupat dan ciri persegi panjang.", contoh: "Satu sudut siku pada belah ketupat membuatnya menjadi persegi." },
        { nama: "Layang-layang", singkat: "Satu sumbu", uraian: "Layang-layang punya dua pasang sisi berurutan yang sama panjang. Salah satu diagonalnya sumbu simetri. Persegi punya 4 simetri lipat. Persegi panjang punya 2.", contoh: "Urutan dari yang umum: segi empat, jajargenjang, persegi panjang, lalu persegi." },
      ],
      kuis: [
        { pertanyaan: "Simetri lipat sama kaki.", alias: ["1"] },
        { pertanyaan: "Simetri putar sama sisi.", alias: ["3"] },
        { pertanyaan: "Jajargenjang dan trapesium sama kaki.", alias: ["tidak"] },
        { pertanyaan: "Ciri jajargenjang pada persegi panjang.", alias: ["ya"] },
        { pertanyaan: "Belah ketupat dan jajargenjang.", alias: ["ya", "boleh"] },
        { pertanyaan: "Agar menjadi persegi.", alias: ["siku"] },
        { pertanyaan: "Persegi dan persegi panjang.", alias: ["ya", "boleh"] },
        { pertanyaan: "Belah ketupat dan layang-layang.", alias: ["ya", "boleh"] },
        { pertanyaan: "Tiga pernyataan.", alias: ["salah", "benar", "salah"] },
        { pertanyaan: "Urutan umum ke khusus.", alias: ["segi empat", "jajargenjang", "persegi panjang", "persegi"] },
        { pertanyaan: "Nama garis lipat.", alias: ["sumbu simetri"] },
        { pertanyaan: "Pasangkan simetri lipat.", alias: ["1", "2", "4"] },
      ],
      voice: [[
        "Catatan ini merangkum hubungan ciri bangun datar.",
        "Jumlah sudut dalam segitiga selalu 180 derajat.",
        "Pada bab ini, trapesium punya minimal satu pasang sisi sejajar.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Padang",
      pengantar: "Sepuluh soal pola di padang layang. Dua pos dijawab dengan suara, dua pos ditulis.",
      labelDaftar: "Sepuluh pos bangun",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret sudut, sudut hilang, analogi simetri, dan batang yang beda. Dua soal suara dan dua soal tulis.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB7),
      voice: [[
        "Igil menjaga sepuluh pos di padang layang.",
        "Ada deret, bagian hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal ciri bangun datar dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi bangun datar",
      kolom: 1,
      item: [
        {
          nama: "Uji ciri",
          singkat: "Segitiga dan segi empat",
          uraian: "Syarat segitiga dicek dari jumlah dua sisi. Jenis segitiga dicek dari sudut dan panjang sisinya. Segi empat dicek dari sisi sejajar, sudut siku, dan diagonal.",
          contoh: "Jumlah sudut dalam segitiga tetap 180 derajat.",
        },
      ],
      kuis: [
        { pertanyaan: "Batang 9, 2, dan 6.", alias: ["tidak"] },
        { pertanyaan: "Sudut 20, 30, dan 130.", alias: ["tumpul"] },
        { pertanyaan: "Sudut 55 dan 35.", alias: ["90"] },
        { pertanyaan: "Batang 7, 7, dan 4.", alias: ["sama kaki"] },
        { pertanyaan: "Pasangkan ciri baru.", alias: ["lancip sama kaki", "sama sisi", "siku-siku sama kaki"] },
        { pertanyaan: "Sudut 100 dan 30.", alias: ["50"] },
        { pertanyaan: "Sisi 6 dan sudut 70 serta 110.", alias: ["belah ketupat"] },
        { pertanyaan: "Satu pasang sejajar dan satu siku.", alias: ["trapesium siku-siku"] },
        { pertanyaan: "Sudut 80 dan 80.", alias: ["20"] },
        { pertanyaan: "Sisi yang sama pada layang-layang.", alias: ["berurutan"] },
      ],
      voice: [[
        "Sepuluh soal ciri bangun datar. Baca pelan, lalu cek sisi atau sudutnya.",
        "Jumlah dua sisi harus lebih panjang daripada sisi yang ketiga.",
      ]],
    },
  ],
};
