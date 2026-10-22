import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB5 = "Bab 5: Pecahan";
export const JUDUL_MTK2_BAB5_LAMA = "Bab 5: Fondasi Pembagian Dasar";

export const MODUL_MTK2_BAB5: ModulResmiPai = {
  id: "mtk-2-bab5",
  judul: JUDUL_MTK2_BAB5,
  pola:
    /bab\s*5[:.]\s*pecahan(?!\s*sederhana)|dapur koki igil|restoran berbagi adil|setengah dari benda utuh|seperempat dari benda utuh|martabak manis kira|fondasi pembagian dasar|berbagi sama banyak|berbagi adil/,
  motivasi:
    "Hore! Kamu sudah bantu Koki Igil berbagi adil. Dua bagian sama besar itu setengah atau satu per dua. Empat bagian sama besar itu seperempat atau satu per empat. Setengah kumpulan harus sama banyak.",
  kunciJawaban: "A,A,C,B,B,B,C,B,B,B",
  sketsaKartu: [
    "Koki Igil, Rara, dan Bimo memotong martabak tepat di tengah. Dua bagian sama besar bernilai setengah atau satu per dua.",
    "Empat teman memotong semangka jadi seperempat. Delapan donat dibagi dua kotak. Setengah dari 8 adalah 4.",
    "Sepuluh pesanan Restoran Berbagi Adil. Tamu hanya tersenyum jika potongannya sama besar.",
    "Lembar kerja juara pecahan. Bandingkan setengah dan seperempat. Hitung setengah kumpulan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Persegi A dibagi 4 sama besar, 1 petak biru. Persegi B dibagi 4 dengan garis silang sama besar, 1 bagian biru. Persegi C dibagi 4 tidak sama lebar. Bagian biru yang keduanya seperempat ada pada...
A) A dan B
B) A dan C
C) B dan C`,
    `[Soal 2 - PG - Tipe: HOTS]
Rara makan setengah semangka. Bimo makan seperempat dari semangka yang sama besar. Siapa yang makan lebih besar?
A) Rara
B) Bimo
C) sama besar`,
    `[Soal 3 - PG - Tipe: MOTS]
Satu segitiga kecil bernilai seperempat dari bangun utuh. Berapa segitiga kecil supaya menjadi utuh?
A) 2 segitiga
B) 3 segitiga
C) 4 segitiga`,
    `[Soal 4 - PG - Tipe: HOTS]
Ibu punya 8 apel. Setengah diberikan kepada Nenek. Rara makan 1 apel dari sisa Ibu. Apel Ibu yang tersisa...
A) 4 apel
B) 3 apel
C) 2 apel`,
    `[Soal 5 - PG - Tipe: MOTS]
Setengah dari 8 ikan adalah...
A) 2
B) 4
C) 5`,
    `[Soal 6 - PG - Tipe: HOTS]
Segitiga dipotong mendatar. Atas kecil, bawah lebar. Bimo bilang bagian atas bernilai setengah. Pernyataan Bimo...
A) benar
B) salah
C) sama besar`,
    `[Soal 7 - PG - Tipe: HOTS]
Setengah dari sosis Bimo adalah 3 potong. Jumlah seluruh sosis mula-mula...
A) 3
B) 5
C) 6`,
    `[Soal 8 - PG - Tipe: LOTS]
Lingkaran dibagi 4 sama besar. Satu bagian kuning. Bagian kuning bernilai...
A) setengah
B) seperempat
C) utuh`,
    `[Soal 9 - PG - Tipe: MOTS]
Ada 6 kupu-kupu. Setengah bagiannya berapa?
A) 2
B) 3
C) 6`,
    `[Soal 10 - PG - Tipe: MOTS]
Ada 12 telur. Setengah dari 12 telur adalah...
A) 4
B) 6
C) 8`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Dapur Koki Igil",
      pengantar:
        "Halo koki cilik! Hari ini kita belajar pecahan di dapur Koki Igil bersama Rara dan Bimo.",
      labelDaftar: "Naskah bergambar setengah dan seperempat",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Setengah dan seperempat",
          uraian:
            "Siswa dapat menunjukkan setengah dari benda utuh. Siswa dapat menunjukkan seperempat dari benda utuh. Siswa dapat menunjukkan setengah dari kumpulan benda.",
          contoh: "Martabak dua potong sama besar bernilai satu per dua.",
        },
        {
          nama: "Cerita dapur",
          singkat: "Rara, Bimo, dan Koki Igil",
          uraian:
            "Martabak cuma satu. Rara dan Bimo sama-sama mau makan. Potong tepat di tengah supaya adil.",
          contoh: "Satu bagian bernilai setengah atau satu per dua.",
        },
      ],
      kuis: [
        { pertanyaan: "Dua bagian sama besar disebut apa?", alias: ["setengah", "satu per dua", "1/2"] },
        { pertanyaan: "Tuliskan 1/2.", alias: ["1/2", "setengah", "satu per dua"] },
        { pertanyaan: "Empat bagian sama besar disebut apa?", alias: ["seperempat", "satu per empat", "1/4"] },
        { pertanyaan: "Tuliskan 1/4.", alias: ["1/4", "seperempat", "satu per empat"] },
        { pertanyaan: "Setengah dari 6 permen?", alias: ["3", "tiga"] },
        { pertanyaan: "Tuliskan 5.", alias: ["5", "lima"] },
      ],
      voice: [
        [
          "Halo koki cilik. Hari ini kita belajar pecahan setengah bersama Koki Igil.",
          "Jika satu benda utuh dibagi menjadi dua bagian yang sama besar, setiap bagian disebut setengah atau satu per dua.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "Ringkasan Pecahan",
      pengantar:
        "Lihat ringkasan pecahan. Angka atas artinya bagian yang diambil. Angka bawah artinya semua potongan yang sama besar.",
      labelDaftar: "Infografis setengah, seperempat, dan kumpulan",
      kolom: 1,
      item: [
        {
          nama: "Mengenal setengah",
          singkat: "Satu per dua",
          uraian:
            "Benda utuh dibagi 2 sama besar. Angka 1 di atas: satu bagian yang diambil. Angka 2 di bawah: dua potong sama besar.",
          contoh: "Kertas dipotong diagonal tepat di tengah. Satu segitiga bernilai satu per dua.",
        },
        {
          nama: "Mengenal seperempat",
          singkat: "Satu per empat",
          uraian:
            "Benda utuh dibagi 4 sama besar. Kalau ukurannya tidak sama, itu bukan seperempat.",
          contoh: "Empat potong sama besar bernilai satu per empat.",
        },
        {
          nama: "Setengah kumpulan",
          singkat: "Dua kelompok sama banyak",
          uraian:
            "Bagi benda ke 2 wadah sama banyak. Isi satu wadah itulah setengahnya.",
          contoh: "Setengah dari 6 stroberi adalah 3.",
        },
      ],
      kuis: [
        { pertanyaan: "Pada 1/2, angka bawah berapa?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 1/2.", alias: ["1/2", "setengah"] },
        { pertanyaan: "Kue seperempat dipotong jadi berapa?", alias: ["4", "empat"] },
        { pertanyaan: "Tuliskan 1/4.", alias: ["1/4", "seperempat"] },
        { pertanyaan: "Setengah dari 4 bintang?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 4.", alias: ["4", "empat"] },
      ],
      voice: [
        [
          "Perhatikan ringkasan pecahan setengah. Syarat utamanya: dibagi menjadi 2 bagian yang sama besar.",
          "Angka 1 di atas artinya 1 bagian yang dipilih. Angka 2 di bawah artinya jumlah seluruh potongan yang sama besar.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "Restoran Berbagi Adil",
      pengantar:
        "Bantu Koki Igil mengambil keputusan di 10 pesanan. Tamu hanya tersenyum jika potongannya adil dan sama besar.",
      labelDaftar: "Sepuluh pesanan restoran",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih pesanan, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu pesanan. Koki Igil membacakan misi. Jawaban benar mendapat 1 bintang kepuasan.",
          contoh: "Dua sama besar itu setengah. Empat sama besar itu seperempat.",
        },
        {
          nama: "Bintang kepuasan",
          singkat: "Win-win fairness",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: potongan harus sama besar.",
        },
      ],
      kuis: [
        { pertanyaan: "Wortel dua sama besar?", alias: ["a", "sama"] },
        { pertanyaan: "Pizza 4 sama besar?", alias: ["4"] },
        { pertanyaan: "Setengah dari 6 kue?", alias: ["3", "tiga"] },
        { pertanyaan: "Puding tidak sama. Setuju?", alias: ["tidak"] },
        { pertanyaan: "Satu dari empat apel?", alias: ["1/4", "seperempat"] },
        { pertanyaan: "Setengah 12 adalah 6?", alias: ["benar"] },
        { pertanyaan: "Satu dari dua ikan?", alias: ["setengah", "satu per dua", "1/2"] },
        { pertanyaan: "Setengah dari 10?", alias: ["5", "lima"] },
        { pertanyaan: "Tuliskan 1/4.", alias: ["1/4", "seperempat"] },
        { pertanyaan: "Tuliskan 1/2.", alias: ["1/2", "setengah"] },
      ],
      voice: [
        [
          "Selamat datang di Restoran Berbagi Adil Koki Igil.",
          "Setiap tamu hanya mau menerima makanan jika potongannya adil dan sama besar.",
          "Ayo bantu Koki Igil mengambil keputusan yang tepat di 10 pesanan pelanggan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "Lembar Evaluasi Siswa",
      pengantar:
        "Ada 10 soal seru tentang pecahan setengah dan seperempat. Perhatikan gambarnya. Pastikan bagiannya sama besar.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Tiga kalimat kunci",
          uraian:
            "Setengah: satu bagian dari benda utuh yang dibagi 2 sama besar. Seperempat: satu bagian dari benda utuh yang dibagi 4 sama besar. Setengah kumpulan: bagi menjadi 2 kelompok sama banyak.",
          contoh: "Sama besar, sama banyak.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "A dan B bernilai seperempat. Setengah lebih besar dari seperempat. Empat seperempat menjadi utuh. Setengah 8 apel lalu dikurangi 1 sisa 3. Setengah 8 ikan adalah 4. Potongan tidak sama bukan setengah. Setengah 3 berarti utuh 6. Satu dari empat itu seperempat. Setengah 6 adalah 3. Setengah 12 adalah 6.",
          contoh: "Jawaban latihan: A, A, C, B, B, B, C, B, B, B.",
        },
      ],
      kuis: [
        { pertanyaan: "A dan B seperempat?", alias: ["a"] },
        { pertanyaan: "Siapa makan lebih besar?", alias: ["rara", "a"] },
        { pertanyaan: "Berapa segitiga utuh?", alias: ["4", "c"] },
        { pertanyaan: "Sisa apel Ibu?", alias: ["3", "b"] },
        { pertanyaan: "Setengah 8 ikan?", alias: ["4", "b"] },
        { pertanyaan: "Bimo benar?", alias: ["salah", "b"] },
        { pertanyaan: "Seluruh sosis?", alias: ["6", "enam"] },
        { pertanyaan: "Bagian kuning?", alias: ["seperempat", "satu per empat", "1/4"] },
        { pertanyaan: "Setengah 6 kupu?", alias: ["3", "tiga"] },
        { pertanyaan: "Setengah 12 telur?", alias: ["6", "enam"] },
      ],
      voice: [
        [
          "Hebat sekali. Ingat tiga kalimat kunci.",
          "Setengah: satu bagian dari benda yang dibagi 2 sama besar.",
          "Seperempat: satu bagian dari benda yang dibagi 4 sama besar.",
          "Setengah kumpulan: bagi menjadi 2 kelompok sama banyak.",
        ],
        [
          "Sekarang waktunya Lembar Evaluasi Siswa.",
          "Ada 10 soal seru tentang pecahan setengah dan seperempat.",
          "Perhatikan gambarnya baik-baik. Pastikan bagiannya sama besar.",
        ],
      ],
    },
  ],
};
