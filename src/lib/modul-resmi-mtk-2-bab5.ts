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
    /bab\s*5[:.]\s*pecahan(?!\s*sederhana)|setengah dari benda utuh|berbagi sama banyak|martabak manis kira|fondasi pembagian dasar|berbagi adil/,
  motivasi:
    "Hore! Kamu sudah bantu Kira memotong martabak. Dua bagian sama besar itu setengah. Empat bagian sama besar itu seperempat. Setengah dari kumpulan benda harus sama banyak.",
  kunciJawaban: "B,A,B,A,C,B,A,B,B,A",
  sketsaKartu: [
    "Ibu memberi Kira martabak manis. Kira berbagi adil dengan Tika. Dua potong sama besar bernilai setengah.",
    "Malosi berbagi kelereng dengan Upe. Setengah dari 4 adalah 2. Kira memotong martabak menjadi 4 untuk empat teman. Tiap potong seperempat.",
    "Sepuluh potong martabak Igil: setengah, kumpulan, seperempat.",
    "Lembar kerja tantangan juara pecahan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Martabak dipotong dua sama besar. Tiap potong bernilai...
A) seperempat
B) setengah
C) utuh`,
    `[Soal 2 - PG - Tipe: LOTS]
Segi empat dipotong dua, tetapi tidak sama besar. Itu...
A) bukan setengah
B) setengah
C) seperempat`,
    `[Soal 3 - PG - Tipe: MOTS]
Malosi punya 4 kelereng. Setengah untuk Upe. Upe mendapat...
A) 4 kelereng
B) 2 kelereng
C) 1 kelereng`,
    `[Soal 4 - PG - Tipe: MOTS]
Ada 6 ikan. Dibagi dua tempat sama banyak. Setengahnya...
A) 3 ikan
B) 2 ikan
C) 4 ikan`,
    `[Soal 5 - PG - Tipe: MOTS]
6 ikan: 4 di satu ember, 2 di ember lain. Itu...
A) setengah
B) seperempat
C) bukan setengah`,
    `[Soal 6 - PG - Tipe: MOTS]
Tika punya 8 pensil. Setengah pensil Tika...
A) 8
B) 4
C) 2`,
    `[Soal 7 - PG - Tipe: LOTS]
Martabak untuk Kira, Malosi, Upe, dan Tika. Empat potong sama besar. Tiap orang mendapat...
A) seperempat
B) setengah
C) utuh`,
    `[Soal 8 - PG - Tipe: MOTS]
Potong jadi dua sama besar, lalu potong lagi jadi dua sama besar. Dapat...
A) setengah
B) seperempat
C) utuh`,
    `[Soal 9 - PG - Tipe: MOTS]
Lingkaran dibagi 4 sama besar. Satu bagian diwarnai. Bagian diwarnai...
A) setengah
B) seperempat
C) utuh`,
    `[Soal 10 - PG - Tipe: HOTS]
Lingkaran dibagi 4 sama besar. Dua bagian diwarnai. Bagian diwarnai...
A) setengah
B) seperempat
C) tiga`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Berbagi Sama Banyak",
      pengantar:
        "Ibu memberi Kira martabak manis. Kira berbagi dengan Tika. Dua bagian sama besar bernilai setengah.",
      labelDaftar: "Cerita martabak dan setengah benda utuh",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Setengah dan seperempat",
          uraian:
            "Siswa dapat menunjukkan setengah dari benda utuh. Siswa dapat menunjukkan setengah dari kumpulan benda. Siswa dapat menunjukkan seperempat dari benda utuh.",
          contoh: "Martabak dua potong sama besar. Tiap potong setengah.",
        },
        {
          nama: "Cerita martabak manis",
          singkat: "Kira dan Tika",
          uraian:
            "Ibu memberi Kira oleh-oleh martabak manis. Kira ingat Tika juga suka. Kira membagi martabak sama besar. Pakai pisau yang aman untuk anak.",
          contoh: "Potongan sama besar. Itu adil.",
        },
      ],
      kuis: [
        { pertanyaan: "Dua bagian sama besar bernilai apa?", alias: ["setengah"] },
        { pertanyaan: "Tuliskan setengah.", alias: ["setengah"] },
        { pertanyaan: "Potongan tidak sama besar. Itu setengah?", alias: ["bukan", "tidak"] },
        { pertanyaan: "Tuliskan bukan.", alias: ["bukan"] },
      ],
      voice: [
        [
          "Ibu memberi Kira martabak manis. Kira berbagi dengan Tika.",
          "Potong dua sama besar. Tiap potong bernilai setengah.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Setengah Kumpulan dan Seperempat",
      pengantar:
        "Malosi punya 4 kelereng. Setengah untuk Upe adalah 2. Kira memotong martabak jadi 4. Tiap potong seperempat.",
      labelDaftar: "Setengah kumpulan dan seperempat benda utuh",
      kolom: 1,
      item: [
        {
          nama: "Setengah dari kumpulan",
          singkat: "Dua kelompok sama banyak",
          uraian:
            "Setengah dari 4 kelereng adalah 2. Setengah dari 6 ikan adalah 3. Jika 4 dan 2, itu bukan setengah.",
          contoh: "Setengah dari 8 pensil adalah 4.",
        },
        {
          nama: "Seperempat dari benda utuh",
          singkat: "Empat bagian sama besar",
          uraian:
            "Martabak untuk 4 teman. Potong empat sama besar. Tiap potong seperempat. Potong dua dulu, lalu potong lagi, juga seperempat.",
          contoh: "Apel utuh, setengah, lalu seperempat.",
        },
      ],
      kuis: [
        { pertanyaan: "Setengah dari 4 kelereng?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 2.", alias: ["2", "dua"] },
        { pertanyaan: "Setengah dari 6 ikan?", alias: ["3", "tiga"] },
        { pertanyaan: "Tuliskan seperempat.", alias: ["seperempat"] },
        { pertanyaan: "Empat potong sama besar bernilai apa?", alias: ["seperempat"] },
      ],
      voice: [
        [
          "Malosi punya 4 kelereng. Setengah untuk Upe. Upe dapat 2.",
          "Kira memotong martabak jadi 4. Tiap orang mendapat seperempat.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Potong Martabak Igil",
      pengantar:
        "Bantu Igil memotong 10 martabak. Sebut setengah atau seperempat. Hitung setengah kumpulan.",
      labelDaftar: "Sepuluh misi potong martabak",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih potong, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu potong martabak. Igil membacakan misi. Jawaban benar mendapat 1 bintang madu. Jika belum tepat, Igil memberi petunjuk.",
          contoh: "Dua sama besar itu setengah. Empat sama besar itu seperempat.",
        },
        {
          nama: "Daun rapi",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: potongan harus sama besar.",
        },
      ],
      kuis: [
        { pertanyaan: "Dua sama besar bernilai apa?", alias: ["setengah"] },
        { pertanyaan: "Tuliskan setengah.", alias: ["setengah"] },
        { pertanyaan: "Tidak sama besar. Itu setengah?", alias: ["bukan", "tidak"] },
        { pertanyaan: "Setengah dari 4?", alias: ["2", "dua"] },
        { pertanyaan: "Tuliskan 2.", alias: ["2", "dua"] },
        { pertanyaan: "Setengah dari 6?", alias: ["3", "tiga"] },
        { pertanyaan: "4 dan 2 itu setengah?", alias: ["bukan", "tidak"] },
        { pertanyaan: "Tuliskan 4.", alias: ["4", "empat"] },
        { pertanyaan: "Empat sama besar bernilai apa?", alias: ["seperempat"] },
        { pertanyaan: "Tuliskan seperempat.", alias: ["seperempat"] },
      ],
      voice: [
        [
          "Igil menjaga nampan martabak. Ada sepuluh potong dari yang pertama sampai piala.",
          "Potong hijau untuk setengah. Potong biru untuk kelereng. Potong kuning untuk menulis. Potong ungu untuk memilih.",
          "Jawaban benar mendapat satu bintang. Jika belum tepat, Igil memberi petunjuk.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Sebut setengah atau seperempat. Hitung setengah kumpulan. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Setengah dan seperempat",
          uraian:
            "Setengah: dua bagian sama besar, atau dua kelompok sama banyak. Seperempat: empat bagian sama besar. Potongan tidak sama besar bukan setengah. 4 dan 2 bukan setengah dari 6.",
          contoh: "Sama besar, sama banyak.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "Dua sama besar adalah setengah. Tidak sama besar bukan setengah. Setengah 4 kelereng adalah 2. Setengah 6 ikan adalah 3. 4 dan 2 bukan setengah. Setengah 8 pensil adalah 4. Empat teman mendapat seperempat. Potong dua lalu dua lagi adalah seperempat. Satu dari empat adalah seperempat. Dua dari empat adalah setengah.",
          contoh: "Jawaban latihan: B, A, B, A, C, B, A, B, B, A.",
        },
      ],
      kuis: [
        { pertanyaan: "Dua sama besar?", alias: ["setengah", "b"] },
        { pertanyaan: "Tidak sama besar?", alias: ["bukan", "a"] },
        { pertanyaan: "Setengah 4 kelereng?", alias: ["2", "b"] },
        { pertanyaan: "Setengah 6 ikan?", alias: ["3", "a"] },
        { pertanyaan: "4 dan 2?", alias: ["bukan", "c"] },
        { pertanyaan: "Setengah 8 pensil?", alias: ["4", "b"] },
        { pertanyaan: "Empat teman?", alias: ["seperempat", "a"] },
        { pertanyaan: "Potong dua lalu dua?", alias: ["seperempat", "b"] },
        { pertanyaan: "Satu dari empat?", alias: ["seperempat", "b"] },
        { pertanyaan: "Dua dari empat?", alias: ["setengah", "a"] },
      ],
      voice: [
        [
          "Poin penting. Dua bagian sama besar itu setengah. Empat bagian sama besar itu seperempat.",
          "Setengah kumpulan harus sama banyak. Kalimat kunci: sama besar, sama banyak.",
        ],
        [
          "Martabak dua potong sama besar itu setengah. Empat potong sama besar itu seperempat.",
          "Setengah dari 4 kelereng adalah 2. Setengah dari 8 pensil adalah 4. Dua dari empat bagian sama besar juga setengah.",
        ],
      ],
    },
  ],
};
