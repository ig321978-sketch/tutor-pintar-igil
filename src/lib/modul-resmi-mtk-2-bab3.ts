import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB3 = "Bab 3: Bentuk di Sekitar Kita";
export const JUDUL_MTK2_BAB3_LAMA = "Bab 3: Fondasi Perkalian Dasar";

export const MODUL_MTK2_BAB3: ModulResmiPai = {
  id: "mtk-2-bab3",
  judul: JUDUL_MTK2_BAB3,
  pola:
    /bab\s*3[:.]\s*bentuk di sekitar|bentuk di sekitar kita|sarang lebah( upe)?|fondasi perkalian dasar|kotak permen kembar/,
  motivasi:
    "Hore! Kamu sudah bantu Upe mengamati sarang lebah. Segi banyak punya sisi lurus. Bentuk lengkung punya kurva. Bangun ruang bisa diisi.",
  kunciJawaban: "B,A,B,A,C,B,A,B,C,B",
  sketsaKartu: [
    "Paman membawa madu dan sarang lebah ke rumah Upe. Igil menghitung enam sisi.",
    "Urai dan susun bangun datar. Lalu kenali kubus, balok, tabung, kerucut, dan bola.",
    "Sepuluh sisir madu: sisi, lengkung, urai, susun, dan bangun ruang.",
    "Lembar kerja tantangan juara bentuk di sekitar kita.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Permukaan sarang lebah punya 6 sisi lurus. Namanya...
A) Segitiga
B) Segi enam
C) Lingkaran`,
    `[Soal 2 - PG - Tipe: LOTS]
Segitiga punya sisi sebanyak...
A) 3
B) 4
C) 6`,
    `[Soal 3 - PG - Tipe: LOTS]
Lingkaran termasuk...
A) Segi banyak
B) Bentuk lengkung
C) Kubus`,
    `[Soal 4 - PG - Tipe: MOTS]
Segi banyak yang punya 5 sisi namanya...
A) Segi lima
B) Segi empat
C) Segi enam`,
    `[Soal 5 - PG - Tipe: MOTS]
Uang logam termasuk contoh...
A) Segitiga
B) Kubus
C) Lingkaran`,
    `[Soal 6 - PG - Tipe: MOTS]
Sebuah persegi diurai dengan satu garis diagonal. Hasilnya...
A) 2 segi empat
B) 2 segitiga
C) 1 lingkaran`,
    `[Soal 7 - PG - Tipe: MOTS]
Bangun ruang yang semua permukaannya segi empat sama ukurannya...
A) Kubus
B) Balok
C) Bola`,
    `[Soal 8 - PG - Tipe: HOTS]
Benda yang paling mudah menggelinding...
A) Kubus
B) Bola
C) Balok`,
    `[Soal 9 - PG - Tipe: LOTS]
Kaleng susu berbentuk...
A) Kerucut
B) Kubus
C) Tabung`,
    `[Soal 10 - PG - Tipe: HOTS]
Igil menyusun 2 lapis balok. Tiap lapis 4 balok. Banyak balok satuan...
A) 6
B) 8
C) 14`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Sarang Lebah",
      pengantar:
        "Paman berkunjung ke rumah Upe. Dia membawa madu dan sarangnya. Permukaannya bangun datar berenam sisi. Igil ikut menghitung sisi.",
      labelDaftar: "Cerita sarang lebah dan bangun datar",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Bangun datar dan bangun ruang",
          uraian:
            "Siswa dapat membedakan segi banyak dan bentuk lengkung. Siswa dapat menamai segitiga, segi empat, segi lima, segi enam, dan lingkaran. Siswa dapat mengurai dan menyusun bangun datar. Siswa dapat menamai kubus, balok, tabung, kerucut, dan bola.",
          contoh: "Sarang lebah = segi enam. Uang logam = lingkaran.",
        },
        {
          nama: "Cerita sarang lebah",
          singkat: "Enam sisi lurus",
          uraian:
            "Upe melihat sarang lebah untuk pertama kali. Permukaannya segi banyak berenam sisi. Namanya segi enam. Igil menghitung: satu, dua, tiga, empat, lima, enam.",
          contoh: "Segi banyak yang 6 sisi = segi enam.",
        },
      ],
      kuis: [
        { pertanyaan: "Sarang lebah punya berapa sisi?", alias: ["6", "enam"] },
        { pertanyaan: "Tuliskan 6.", alias: ["6", "enam"] },
        { pertanyaan: "Uang logam termasuk bentuk apa?", alias: ["lingkaran"] },
        { pertanyaan: "Tuliskan lingkaran.", alias: ["lingkaran"] },
        { pertanyaan: "Urutkan: 3, 4, 5, 6 sisi.", alias: ["segitiga", "segi empat"] },
        { pertanyaan: "Segi empat punya berapa sisi?", alias: ["4", "empat"] },
        { pertanyaan: "Mana yang mudah menggelinding?", alias: ["bola"] },
        { pertanyaan: "Kaleng berbentuk apa?", alias: ["tabung"] },
      ],
      voice: [
        [
          "Paman datang ke rumah Upe. Dia membawa madu dan sarang lebah. Permukaannya punya enam sisi lurus. Namanya segi enam.",
          "Igil menghitung sisi satu sampai enam. Yuk amati bentuk di sekitar kita.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Urai, Susun, dan Bangun Ruang",
      pengantar:
        "Satu bangun bisa diurai jadi beberapa. Beberapa bangun bisa disusun jadi satu. Bangun ruang punya banyak permukaan dan bisa diisi.",
      labelDaftar: "Mengurai, menyusun, dan bangun ruang",
      kolom: 1,
      item: [
        {
          nama: "Mengurai dan menyusun",
          singkat: "Satu jadi banyak, banyak jadi satu",
          uraian:
            "Persegi bisa diurai menjadi 2 segitiga. Dua segitiga dan satu segi empat bisa disusun menjadi rumah. Cara mengurai yang berbeda menghasilkan bentuk yang berbeda.",
          contoh: "Persegi diurai diagonal: 2 segitiga.",
        },
        {
          nama: "Bangun ruang",
          singkat: "Kubus, balok, tabung, kerucut, bola",
          uraian:
            "Bangun datar punya satu permukaan. Bangun ruang punya lebih dari satu permukaan dan bisa diisi. Kubus permukaannya segi empat sama. Balok permukaannya segi empat beda ukuran. Tabung, kerucut, dan bola punya permukaan lengkung. Bola paling mudah menggelinding.",
          contoh: "Dadu = kubus. Kaleng = tabung. Bola sepak = bola.",
        },
      ],
      kuis: [
        { pertanyaan: "Persegi diurai diagonal jadi berapa segitiga?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 2.", alias: ["2", "dua"] },
        { pertanyaan: "2 segitiga dan 1 segi empat disusun jadi apa?", alias: ["rumah"] },
        { pertanyaan: "Tuliskan rumah.", alias: ["rumah"] },
        { pertanyaan: "Dadu berbentuk apa?", alias: ["kubus"] },
        { pertanyaan: "Bola mudah menggelinding. Bentuknya?", alias: ["bola"] },
        { pertanyaan: "Tuliskan bola.", alias: ["bola"] },
        { pertanyaan: "Es krim di atas kerucut. Namanya?", alias: ["kerucut"] },
      ],
      voice: [
        [
          "Kita bisa mengurai satu bangun menjadi beberapa bangun. Persegi diurai diagonal menjadi dua segitiga.",
          "Kita juga bisa menyusun. Dua segitiga dan satu segi empat menjadi rumah.",
        ],
        [
          "Bangun ruang bisa diisi. Kubus permukaannya sama. Balok permukaannya beda ukuran. Bola menggelinding. Kaleng itu tabung. Es krim itu kerucut.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Sisir Madu Igil",
      pengantar:
        "Bantu Igil mengisi 10 sisir madu. Hitung sisi, kenali lengkung, urai, susun, dan sebut bangun ruang.",
      labelDaftar: "Sepuluh misi sisir madu",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih sisir, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu sisir madu. Igil membacakan misi. Jawaban benar mendapat 1 bintang madu. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
          contoh: "6 sisi = segi enam. Uang logam = lingkaran. Dadu = kubus.",
        },
        {
          nama: "Daun rapi",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: sisir bergoyang, lalu muncul jejak, lalu Igil menghitung bersama.",
        },
      ],
      kuis: [
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3", "tiga"] },
        { pertanyaan: "Segi empat punya berapa sisi?", alias: ["4", "empat"] },
        { pertanyaan: "Tuliskan 5.", alias: ["5", "lima"] },
        { pertanyaan: "Sarang lebah segi enam atau lingkaran?", alias: ["segi enam"] },
        { pertanyaan: "Uang logam bentuknya?", alias: ["lingkaran"] },
        { pertanyaan: "Persegi diurai jadi berapa segitiga?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 2.", alias: ["2", "dua"] },
        { pertanyaan: "Dadu kubus atau bola?", alias: ["kubus"] },
        { pertanyaan: "Yang menggelinding?", alias: ["bola"] },
        { pertanyaan: "Kaleng namanya?", alias: ["tabung"] },
      ],
      voice: [
        [
          "Igil menjaga sisir madu. Ada sepuluh sisir dari yang pertama sampai piala.",
          "Sisir hijau untuk menghitung sisi. Sisir biru untuk nama bentuk. Sisir kuning untuk menulis. Sisir ungu untuk memilih.",
          "Jawaban benar mendapat satu bintang madu. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Hitung sisi. Bedakan lengkung. Urai dan susun. Nama bangun ruang. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Sisi, lengkung, urai, ruang",
          uraian:
            "Segi banyak dibatasi garis lurus. Namanya ikut banyak sisi: 3 segitiga, 4 segi empat, 5 segi lima, 6 segi enam. Bentuk lengkung dibatasi kurva. Lingkaran bulat sempurna. Bangun datar satu permukaan. Bangun ruang banyak permukaan dan bisa diisi. Kubus sama. Balok beda. Bola menggelinding.",
          contoh: "Hitung sisinya, bedakan lengkung, sebut nama ruangnya.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "Sarang lebah segi enam. Segitiga 3 sisi. Lingkaran bentuk lengkung. Segi lima 5 sisi. Uang logam lingkaran. Persegi diurai 2 segitiga. Kubus permukaan sama. Bola menggelinding. Kaleng tabung. Dua lapis kali 4 sama dengan 8.",
          contoh: "Jawaban latihan: B, A, B, A, C, B, A, B, C, B.",
        },
      ],
      kuis: [
        { pertanyaan: "Sarang lebah 6 sisi namanya?", alias: ["segi enam", "b"] },
        { pertanyaan: "Segitiga punya berapa sisi?", alias: ["3", "tiga", "a"] },
        { pertanyaan: "Lingkaran termasuk apa?", alias: ["bentuk lengkung", "b"] },
        { pertanyaan: "5 sisi namanya?", alias: ["segi lima", "a"] },
        { pertanyaan: "Uang logam termasuk apa?", alias: ["lingkaran", "c"] },
        { pertanyaan: "Persegi diurai diagonal jadi?", alias: ["2 segitiga", "b"] },
        { pertanyaan: "Permukaan sama ukurannya?", alias: ["kubus", "a"] },
        { pertanyaan: "Paling mudah menggelinding?", alias: ["bola", "b"] },
        { pertanyaan: "Kaleng berbentuk apa?", alias: ["tabung", "c"] },
        { pertanyaan: "2 lapis, tiap lapis 4. Banyak balok?", alias: ["8", "delapan", "b"] },
      ],
      voice: [
        [
          "Poin penting. Segi banyak punya sisi lurus. Tiga sisi segitiga. Empat sisi segi empat. Lima sisi segi lima. Enam sisi segi enam.",
          "Bentuk lengkung punya kurva. Lingkaran bulat sempurna. Bangun ruang bisa diisi. Kubus sama. Balok beda. Bola menggelinding.",
        ],
        [
          "Sarang lebah segi enam. Segitiga tiga sisi. Lingkaran bentuk lengkung. Segi lima lima sisi. Uang logam lingkaran.",
          "Persegi diurai dua segitiga. Kubus permukaan sama. Bola menggelinding. Kaleng tabung. Dua lapis kali empat sama dengan delapan.",
        ],
      ],
    },
  ],
};
