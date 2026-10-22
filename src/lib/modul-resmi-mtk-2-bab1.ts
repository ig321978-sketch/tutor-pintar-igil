import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB1 = "Bab 1: Ayo Membilang sampai dengan 50";
export const JUDUL_MTK2_BAB1_LAMA = "Bab 1: Bilangan Cacah sampai 100";

export const MODUL_MTK2_BAB1: ModulResmiPai = {
  id: "mtk-2-bab1",
  judul: JUDUL_MTK2_BAB1,
  pola:
    /ayo membilang sampai( dengan)? 50|loker baru( di kelas malosi)?|kelas malosi|nilai tempat puluhan satuan|membandingkan dua bilangan atau lebih|bilangan cacah sampai 100/,
  motivasi:
    "Hore! Kamu sudah bantu Malosi merapikan tas di loker. Kelompokkan sepuluh-sepuluh, tulis puluhan dan satuan, lalu bandingkan bilangannya.",
  kunciJawaban: "B,C,A,B,A,B,A,B,C,A",
  sketsaKartu: [
    "Malosi, teman-teman, dan Igil menghitung 26 tas di loker baru.",
    "Ikat pensil, wadah telur, dan balok disusun sepuluh-sepuluh sampai 50.",
    "Sepuluh pintu loker: menghitung, membaca, menulis, dan membandingkan 21 sampai 50.",
    "Lembar kerja tantangan juara membilang sampai 50.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Ada 2 ikat pensil. Setiap ikat berisi 10. Ada 4 pensil lepas. Berapa pensil semuanya?
A) 14
B) 24
C) 34`,
    `[Soal 2 - PG - Tipe: LOTS]
29 sama dengan 20 ditambah ...
A) 7
B) 8
C) 9`,
    `[Soal 3 - PG - Tipe: LOTS]
Lambang 29 dibaca...
A) dua puluh sembilan
B) dua sembilan
C) sembilan puluh dua`,
    `[Soal 4 - PG - Tipe: HOTS]
Urutan maju: 28, titik, 30. Angka yang hilang adalah...
A) 27
B) 29
C) 31`,
    `[Soal 5 - PG - Tipe: MOTS]
Pada tabel nilai tempat, bilangan 39 punya puluhan...
A) 3
B) 9
C) 39`,
    `[Soal 6 - PG - Tipe: MOTS]
28 = ... puluhan + ... satuan
A) 8 puluhan dan 2 satuan
B) 2 puluhan dan 8 satuan
C) 20 puluhan dan 8 satuan`,
    `[Soal 7 - PG - Tipe: MOTS]
31 = 3 puluhan + 1 satuan. Pernyataan ini...
A) Benar
B) Salah, seharusnya 1 puluhan dan 3 satuan
C) Salah, seharusnya 31 puluhan`,
    `[Soal 8 - PG - Tipe: HOTS]
Kira punya 26 permen. Tika punya 32 permen. Siapa yang lebih banyak?
A) Kira
B) Tika
C) Sama banyak`,
    `[Soal 9 - PG - Tipe: HOTS]
Urutan dari paling kecil: 32, 28, 23, 30, 37
A) 37, 32, 30, 28, 23
B) 23, 30, 28, 32, 37
C) 23, 28, 30, 32, 37`,
    `[Soal 10 - PG - Tipe: HOTS]
Mana yang lebih besar?
A) 1 puluhan dan 14 satuan
B) 2 puluhan dan 3 satuan
C) Keduanya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "Loker Baru di Kelas Malosi",
      pengantar:
        "Hari pertama sekolah. Ada loker baru di kelas Malosi. Teman-teman memasukkan tas bergiliran. Igil ikut menghitung.",
      labelDaftar: "Cerita loker dan membilang sampai 50",
      kolom: 1,
      item: [
        {
          nama: "Tujuan pembelajaran",
          singkat: "Membilang sampai 50",
          uraian:
            "Siswa dapat menghitung, membaca, dan menulis bilangan sampai 50, menuliskan nilai tempat puluhan dan satuan, serta membandingkan dan mengurutkan dua bilangan atau lebih.",
          contoh: "Kelompokkan sepuluh-sepuluh, lalu tulis angkanya.",
        },
        {
          nama: "Cerita loker",
          singkat: "26 tas di loker",
          uraian:
            "Semua tas sudah masuk loker. Baris pertama 10 tas. Baris kedua 10 tas. Baris ketiga 6 tas. 10 + 10 + 6 = 26. 26 dibaca dua puluh enam. Banyak tas sama dengan banyak siswa. Ada 26 siswa di kelas Malosi.",
          contoh: "10 + 10 + 6 = 26.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Ada berapa tas di loker kelas Malosi?",
          alias: ["26", "dua puluh enam"],
        },
        {
          pertanyaan: "Tuliskan lambang dua puluh enam.",
          alias: ["26", "dua puluh enam"],
        },
        {
          pertanyaan: "Satu ikat pensil berisi berapa?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "Tuliskan 20 + 6.",
          alias: ["26", "20 + 6 = 26", "20+6=26"],
        },
        {
          pertanyaan: "Urutan maju: 20, 21, 22, lalu berapa?",
          alias: ["23", "dua puluh tiga"],
        },
        {
          pertanyaan: "Saat menghitung mundur, setelah 30 adalah berapa?",
          alias: ["29", "dua puluh sembilan"],
        },
      ],
      voice: [
        [
          "Hari pertama sekolah. Ada loker baru di kelas Malosi. Teman-teman memasukkan tas bergiliran. Malosi giliran terakhir. Igil si burung hantu ikut menghitung.",
          "Baris pertama sepuluh tas. Baris kedua sepuluh tas. Baris ketiga enam tas. Jumlahnya dua puluh enam. Ada dua puluh enam siswa di kelas Malosi.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Nilai Tempat dan Membandingkan",
      pengantar:
        "Puluhan di kiri. Satuan di kanan. Bandingkan puluhan dulu, baru satuan.",
      labelDaftar: "Infografis nilai tempat dan perbandingan",
      kolom: 1,
      item: [
        {
          nama: "Nilai tempat",
          singkat: "Puluhan dan satuan",
          uraian:
            "1 puluhan = 10 satuan. 26 bisa ditulis 2 puluhan dan 6 satuan, 1 puluhan dan 16 satuan, atau 26 satuan.",
          contoh: "2 puluhan + 6 satuan = 26.",
        },
        {
          nama: "Membandingkan",
          singkat: "Lebih besar, lebih kecil, sama",
          uraian:
            "Kira 26 permen. Tika 32 permen. 32 punya 3 puluhan. 26 punya 2 puluhan. Jadi 32 lebih besar dari 26. Tika lebih banyak.",
          contoh: "32 > 26.",
        },
      ],
      kuis: [
        {
          pertanyaan: "24 punya berapa puluhan?",
          alias: ["2", "dua", "2 puluhan"],
        },
        {
          pertanyaan: "Tuliskan 2 puluhan dan 4 satuan.",
          alias: ["24", "2 puluhan dan 4 satuan"],
        },
        {
          pertanyaan: "Permen siapa yang lebih banyak, Kira 26 atau Tika 32?",
          alias: ["tika"],
        },
        {
          pertanyaan: "Tuliskan 32 > 26.",
          alias: ["32 > 26", "32>26"],
        },
        {
          pertanyaan: "1 puluhan dan 16 satuan sama dengan berapa?",
          alias: ["26", "dua puluh enam"],
        },
        {
          pertanyaan: "Urutan dari kecil: 23, 20, 34. Yang paling kecil?",
          alias: ["20", "dua puluh"],
        },
      ],
      voice: [
        [
          "Nilai tempat punya dua rumah. Kiri puluhan. Kanan satuan. Satu puluhan sama dengan sepuluh satuan.",
          "Dua puluh enam bisa 2 puluhan dan 6 satuan. Bisa juga 1 puluhan dan 16 satuan. Bisa juga 26 satuan.",
        ],
        [
          "Kira punya 26 permen. Tika punya 32 permen. Lihat puluhannya dulu. Tiga puluhan lebih banyak daripada dua puluhan. Jadi 32 lebih besar dari 26.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Misi Penjaga Loker Kelas",
      pengantar:
        "Bantu Igil mengisi 10 pintu loker. Hitung, baca, tulis, dan bandingkan bilangan 21 sampai 50.",
      labelDaftar: "Sepuluh misi loker",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih pintu, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu pintu loker. Igil membacakan misi. Jawaban benar mendapat 1 bintang loker. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
          contoh: "Dua puluh empat tas, bacaan tiga puluh dua, lambang 26.",
        },
        {
          nama: "Daun rapi",
          singkat: "3, 2, atau 1 daun",
          uraian:
            "Benar di percobaan pertama mendapat 3 daun. Benar setelah satu petunjuk mendapat 2 daun. Benar setelah dua petunjuk mendapat 1 daun.",
          contoh: "Petunjuk: benda bergoyang, lalu muncul titik, lalu Igil menghitung bersama.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa tas pada 2 baris 10 dan 4 tas?", alias: ["24", "dua puluh empat"] },
        { pertanyaan: "Bacalah bilangan 32.", alias: ["tiga puluh dua", "32"] },
        { pertanyaan: "Tuliskan lambang dua puluh enam.", alias: ["26", "dua puluh enam"] },
        { pertanyaan: "Mana yang lebih banyak, 32 atau 26?", alias: ["32", "tiga puluh dua"] },
        { pertanyaan: "4 ikat puluhan sama dengan berapa?", alias: ["40", "empat puluh"] },
        { pertanyaan: "Bacalah bilangan 45.", alias: ["empat puluh lima", "45"] },
        { pertanyaan: "Tuliskan puluhan pada 38.", alias: ["3", "tiga"] },
        { pertanyaan: "Mana yang lebih besar, 44 atau 34?", alias: ["44", "empat puluh empat"] },
        { pertanyaan: "5 ikat puluhan sama dengan berapa?", alias: ["50", "lima puluh"] },
        { pertanyaan: "Bacalah bilangan 21.", alias: ["dua puluh satu", "21"] },
      ],
      voice: [
        [
          "Igil menjaga loker kelas. Ada sepuluh pintu dari tas pertama sampai piala.",
          "Pintu hijau untuk menghitung. Pintu biru untuk membaca. Pintu kuning untuk menulis. Pintu ungu untuk membandingkan.",
          "Jawaban benar mendapat satu bintang loker. Jika belum tepat, Igil memberi petunjuk. Daun tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Kelompokkan sepuluh-sepuluh, tulis puluhan dan satuan, lalu bandingkan. Ini tantangan para juara.",
      labelDaftar: "Poin penting dan evaluasi",
      kolom: 1,
      item: [
        {
          nama: "Poin penting",
          singkat: "Sepuluh, puluhan, bandingkan",
          uraian:
            "Kelompokkan setiap 10 benda. 1 puluhan = 10 satuan. Puluhan di kiri, satuan di kanan. Bandingkan puluhan dulu. Jika puluhannya sama, bandingkan satuan. Urutan maju dari kecil ke besar. Urutan mundur dari besar ke kecil.",
          contoh: "Kelompokkan sepuluh-sepuluh, tulis puluhan dan satuan, lalu bandingkan.",
        },
        {
          nama: "Lembar kerja",
          singkat: "Sepuluh tantangan",
          uraian:
            "2 ikat dan 4 pensil = 24. 29 = 20 + 9, dibaca dua puluh sembilan. Angka hilang 29. Puluhan 39 adalah 3. 28 = 2 puluhan 8 satuan. 31 = 3 puluhan 1 satuan. Tika 32 lebih banyak. Urutan 23, 28, 30, 32, 37. 1 puluhan 14 satuan = 24, lebih besar dari 23.",
          contoh: "Jawaban latihan: B, C, A, B, A, B, A, B, C, A.",
        },
      ],
      kuis: [
        { pertanyaan: "2 ikat 10 dan 4 pensil lepas. Berapa pensilnya?", alias: ["24", "dua puluh empat", "b"] },
        { pertanyaan: "29 = 20 + berapa?", alias: ["9", "sembilan", "c"] },
        { pertanyaan: "29 dibaca apa?", alias: ["dua puluh sembilan", "a"] },
        { pertanyaan: "28, titik, 30. Angka hilang?", alias: ["29", "dua puluh sembilan", "b"] },
        { pertanyaan: "Puluhan pada 39?", alias: ["3", "tiga", "a"] },
        { pertanyaan: "28 = berapa puluhan dan berapa satuan?", alias: ["2", "8", "b"] },
        { pertanyaan: "Apakah 31 = 3 puluhan + 1 satuan?", alias: ["benar", "a"] },
        { pertanyaan: "Siapa lebih banyak, Kira 26 atau Tika 32?", alias: ["tika", "32", "b"] },
        { pertanyaan: "Urutan dari kecil: 32, 28, 23, 30, 37?", alias: ["23, 28, 30, 32, 37", "c"] },
        { pertanyaan: "Mana lebih besar, 1 puluhan 14 satuan atau 2 puluhan 3 satuan?", alias: ["1 puluhan", "14", "24", "a"] },
      ],
      voice: [
        [
          "Poin penting. Kelompokkan setiap sepuluh benda. Satu puluhan sama dengan sepuluh satuan. Puluhan di kiri. Satuan di kanan.",
          "Bandingkan puluhan dulu. Kalau puluhannya sama, bandingkan satuan. Maju dari kecil ke besar. Mundur dari besar ke kecil.",
        ],
        [
          "Dua ikat dan empat pensil sama dengan dua puluh empat. Dua puluh sembilan sama dengan dua puluh tambah sembilan. Angka hilang dua puluh sembilan.",
          "Puluhan tiga puluh sembilan adalah tiga. Tika lebih banyak. Urutan dari kecil: dua puluh tiga, dua puluh delapan, tiga puluh, tiga puluh dua, tiga puluh tujuh. Satu puluhan empat belas satuan sama dengan dua puluh empat.",
        ],
      ],
    },
  ],
};
