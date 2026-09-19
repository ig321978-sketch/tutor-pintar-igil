import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB4 = "Bab 4: Geometri Bangun Datar";

export const MODUL_MTK2_BAB4: ModulResmiPai = {
  id: "mtk-2-bab4",
  judul: JUDUL_MTK2_BAB4,
  pola:
    /geometri bangun datar|karakter bangun datar|identifikasi segitiga|penjumlahan bersusun|pola dan bangun/,
  motivasi:
    "Segitiga 3 sisi 3 sudut. Segiempat 4 sisi 4 sudut. Lingkaran 1 sisi lengkung, 0 sudut. Pizza, papan tulis, roda.",
  kunciJawaban: "B,B,B,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak memegang pizza segitiga, papan tulis segiempat, dan koin lingkaran.",
    "Anak menghitung sisi dan sudut tiap bangun.",
    "Anak mengerjakan evaluasi ciri bangun datar.",
    "Anak menarik garis ciri, menggeser koin-buku, mengurutkan lingkaran-segitiga-segiempat, dan menulis 3.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Jumlah sudut pojok dan sisi lingkaran adalah...
A) 1 sudut, 3 sisi
B) 0 sudut, 1 sisi lengkung
C) 4 sudut, 4 sisi
D) 3 sudut, 3 sisi`,
    `[Soal 2 - PG - Tipe: HOTS]
Bangun dengan 3 sisi garis lurus dinamakan...
A) Lingkaran
B) Segitiga
C) Segiempat
D) Ratusan`,
    `[Soal 3 - PG - Tipe: HOTS]
Permukaan kertas kalender berbentuk segiempat karena 4 garis lurus. Pernyataan ini...
A) Salah.
B) Benar; 4 sisi lurus termasuk segiempat.
C) Benar hanya jika bundar.
D) Kalender adalah lingkaran.`,
    `[Soal 4 - PG - Tipe: HOTS]
Segitiga bisa punya sisi melengkung seperti busur. Pernyataan ini...
A) Benar.
B) Salah; segitiga wajib 3 garis lurus yang bertemu di 3 sudut.
C) Benar jika pizza.
D) Segitiga sama dengan lingkaran.`,
    `[Soal 5 - PG - Tipe: Reguler]
Segiempat memiliki...
A) 3 sisi 3 sudut
B) 4 sisi 4 sudut
C) 0 sudut
D) 1 sisi lengkung`,
    `[Soal 6 - PG - Tipe: Reguler]
Uang koin dan roda mobil termasuk...
A) Lingkaran
B) Segitiga
C) Segiempat
D) Puluhan`,
    `[Soal 7 - PG - Tipe: Reguler]
Papan tulis dan buku tulis termasuk...
A) Lingkaran
B) Segitiga
C) Segiempat
D) Bait`,
    `[Soal 8 - PG - Tipe: Reguler]
Urutan jumlah sisi dari sedikit ke banyak...
A) Segiempat, segitiga, lingkaran
B) Lingkaran, segitiga, segiempat
C) Segitiga, lingkaran, segiempat
D) Semua 4 sisi`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa roda sepeda tidak disebut segiempat?
A) Karena sisinya lengkung dan tidak punya pojok lancip.
B) Karena warnanya hitam.
C) Karena ada 4 sudut tersembunyi.
D) Karena terbuat dari karet.`,
    `[Soal 10 - PG - Tipe: Reguler]
Potongan pizza biasanya menyerupai...
A) Segiempat
B) Segitiga
C) Lingkaran utuh wajib
D) Titik`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Segitiga, Segiempat, dan Lingkaran",
      pengantar:
        "Infografis karakter bangun datar: segitiga 3 sisi 3 sudut, segiempat 4 sisi 4 sudut, lingkaran 1 sisi lengkung 0 sudut. Pizza, televisi, roda.",
      labelDaftar: "Sisi, sudut, detektif sekitar",
      kolom: 1,
      item: [
        {
          nama: "Segitiga",
          singkat: "3 sisi, 3 pojok",
          uraian:
            "Dibatasi 3 garis lurus yang bertemu di 3 titik sudut. Potongan pizza sering berbentuk segitiga. Tidak boleh ada sisi melengkung.",
          contoh: "Pizza: 3 sisi lurus.",
        },
        {
          nama: "Segiempat",
          singkat: "4 sisi, 4 pojok",
          uraian:
            "Ada 4 garis lurus dan 4 titik sudut. Papan tulis, permukaan televisi, buku, dan kertas kalender termasuk segiempat.",
          contoh: "Papan tulis: 4 sisi.",
        },
        {
          nama: "Lingkaran",
          singkat: "Lengkung, tanpa pojok",
          uraian:
            "Satu sisi melengkung yang bertemu bundar. Tidak ada sudut lancip. Roda sepeda, uang koin, dan jam dinding berbentuk lingkaran.",
          contoh: "Koin: 0 sudut.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Berapakah jumlah sudut pojok dan jumlah garis sisi yang dimiliki bangun datar lingkaran?",
          alias: ["0", "nol", "1", "satu", "lengkung"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Bangun datar yang memiliki 3 buah sisi garis lurus dinamakan bangun ...",
        alias: ["segitiga"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang kreatif, mari melihat dunia dengan kacamata arsitek. Permukaan rata punya bentuk datar yang unik.",
          "Jika garisnya ada 3 dan pojoknya 3, namanya segitiga. Kalau sisinya 4 lurus dan pojoknya 4, namanya segiempat, seperti papan tulis.",
          "Ada bentuk tanpa pojok lancip, sisinya melengkung bertemu. Itu lingkaran, seperti koin atau jam dinding. Yuk, kita kelompokkan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Detektif Benda di Sekitar",
      pengantar:
        "Infografis detektif sekitar: koin, roda, jam ke keranjang lingkaran. Papan tulis dan buku ke segiempat. Urutkan dari sisi paling sedikit.",
      labelDaftar: "Benda nyata, jumlah sisi, sudut",
      kolom: 1,
      item: [
        {
          nama: "Benda lingkaran",
          singkat: "Tidak punya pojok",
          uraian:
            "Uang koin, roda mobil, dan jam dinding punya sisi lengkung. Masuk keranjang lingkaran, 0 sudut.",
          contoh: "Koin dan roda: lingkaran.",
        },
        {
          nama: "Benda segiempat",
          singkat: "Empat garis lurus",
          uraian:
            "Papan tulis dan buku tulis punya 4 sisi. Kertas kalender juga. Jangan tertukar dengan pizza yang biasanya segitiga.",
          contoh: "Buku: segiempat.",
        },
        {
          nama: "Urutan jumlah sisi",
          singkat: "Sedikit ke banyak",
          uraian:
            "Lingkaran 1 sisi lengkung, segitiga 3 sisi, segiempat 4 sisi. Jumlah sudut segitiga adalah 3.",
          contoh: "Lingkaran, segitiga, segiempat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Masuk keranjang manakah uang koin dan papan tulis?",
          alias: ["lingkaran", "segiempat", "koin", "papan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Jumlah sudut pojok pada segitiga adalah...",
        alias: ["3", "tiga"],
      },
      voice: [
        [
          "Jadi detektif di rumah. Lihat jam, koin, dan roda: semuanya lingkaran.",
          "Lihat buku dan papan tulis: empat sisi, itu segiempat.",
          "Urutkan dari sisi paling sedikit: lingkaran, segitiga, segiempat. Sudut segitiga ada tiga.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih 0 sudut lingkaran dan nama segitiga, tentukan benar-salah kalender serta sisi lengkung, jodohkan ciri ketiga bangun, lalu jelaskan mengapa roda bukan segiempat.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Ciri tiga bangun",
          uraian:
            "Lingkaran: 0 sudut, 1 sisi lengkung. 3 sisi lurus = segitiga. Kalender = segiempat. Segitiga tidak boleh sisi busur.",
          contoh: "0 sudut. Segitiga. 4 sisi.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Benda dan urutan",
          uraian:
            "Koin dan roda: lingkaran. Buku dan papan: segiempat. Urutan sisi: 1, 3, 4. Roda lengkung, bukan 4 sudut.",
          contoh: "Lingkaran. Segiempat. 3 sudut.",
        },
      ],
      kuis: [
        { pertanyaan: "Sudut dan sisi lingkaran?", alias: ["0", "1"] },
        { pertanyaan: "3 sisi lurus namanya?", alias: ["segitiga"] },
        { pertanyaan: "Kalender segiempat?", alias: ["benar"] },
        { pertanyaan: "Segitiga sisi busur?", alias: ["salah"] },
        { pertanyaan: "Koin bentuknya?", alias: ["lingkaran"] },
        { pertanyaan: "Mengapa roda bukan segiempat?", alias: ["lengkung", "sudut", "pojok"] },
      ],
      voice: [
        ["Lingkaran tidak punya pojok. Segitiga tiga sisi lurus."],
        ["Kalender empat sisi. Roda melengkung."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis ciri bangun, geser koin atau buku ke keranjang, urutkan lingkaran-segitiga-segiempat, coretkan angka 3, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Segitiga: 3 sisi 3 sudut. Lingkaran: 1 sisi lengkung 0 sudut. Segiempat: 4 sisi 4 sudut. Lingkaran: koin, roda, jam. Segiempat: papan, buku. Urutan: lingkaran, segitiga, segiempat.",
          contoh: "3 sudut. Koin. Lingkaran dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "Sudut segitiga = 3. Kalender adalah segiempat. Segitiga tidak boleh sisi busur.",
          contoh: "Coretkan 3. BENAR lalu SALAH.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis ciri bangun?", alias: ["segitiga", "lingkaran", "segiempat"] },
        { pertanyaan: "Keranjang koin atau buku?", alias: ["koin", "buku"] },
        { pertanyaan: "Urutan jumlah sisi?", alias: ["lingkaran", "segitiga", "segiempat"] },
        { pertanyaan: "Kalender segiempat?", alias: ["benar"] },
        { pertanyaan: "Segitiga sisi busur?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan jumlah sudut segitiga: __.",
        alias: ["3"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis segitiga, lingkaran, dan segiempat ke cirinya. Geser koin ke lingkaran, buku ke segiempat.",
          "Urutkan lingkaran, segitiga, segiempat. Coretkan 3 untuk sudut segitiga.",
          "Detektif: kalender empat sisi. Segitiga tidak boleh sisi melengkung.",
        ],
      ],
    },
  ],
};
