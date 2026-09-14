import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB9 = "Bab 9: Mengenal Bentuk Datar";

export const MODUL_MTK1_BAB9: ModulResmiPai = {
  id: "mtk-1-bab9",
  judul: JUDUL_MTK1_BAB9,
  pola: /mengenal\s+bentuk\s+datar|bentuk\s+datar/,
  motivasi:
    "Kalau permukaan benda dijiplak, jadinya bentuk datar: segiempat, segitiga, atau lingkaran!",
  kunciJawaban: "C,A,A,C,A,B,C,A,B,C",
  sketsaKartu: [
    "Ali menjiplak permukaan meja menjadi segiempat, Nia menunjuk koin sebagai lingkaran.",
    "Tiga kartu keluarga bentuk datar: segiempat, segitiga, dan lingkaran.",
    "Siswa menempel kertas warna menjadi rumah, anak mencetak lingkaran dari tutup gelas.",
    "Anak mencocokkan segitiga 3 pojok, lingkaran 0 pojok, segiempat 4 pojok.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Roda sepeda dan potongan jeruk yang diiris tipis berbentuk...
A) Segitiga
B) Segiempat
C) Lingkaran
D) Kubus`,
    `[Soal 2 - PG - Tipe: Reguler]
Penggaris yang memiliki 3 sudut pojok disebut bangun...
A) Segitiga
B) Segiempat
C) Lingkaran
D) Bola`,
    `[Soal 3 - PG - Tipe: Reguler]
Bangun datar yang tidak memiliki sudut pojok sama sekali disebut...
A) Lingkaran
B) Segitiga
C) Segiempat
D) Kubus`,
    `[Soal 4 - PG - Tipe: Reguler]
Permukaan jam dinding dan uang koin berbentuk...
A) Segitiga
B) Segiempat
C) Lingkaran
D) Balok`,
    `[Soal 5 - PG - Tipe: Reguler]
Bangun datar dengan 3 garis lurus yang menyambung dinamakan...
A) Segitiga
B) Lingkaran
C) Segiempat
D) Tabung`,
    `[Soal 6 - PG - Tipe: Reguler]
Segiempat memiliki berapa pojok?
A) 3
B) 4
C) 0
D) 1`,
    `[Soal 7 - PG - Tipe: Reguler]
Benda di kelas yang permukaannya berbentuk segiempat adalah...
A) Roda sepeda mini
B) Atap gantungan kalender segitiga
C) Papan tulis hitam
D) Uang koin`,
    `[Soal 8 - PG - Tipe: Reguler]
Contoh benda berbentuk segitiga adalah...
A) Rambu jalan
B) Papan tulis
C) Jam dinding
D) Meja persegi`,
    `[Soal 9 - PG - Tipe: HOTS]
Lingkaran memiliki sisi...
A) 4 garis lurus
B) 1 sisi melengkung
C) 3 pojok
D) 2 depa`,
    `[Soal 10 - PG - Tipe: HOTS]
Permukaan meja yang punya 4 pojok jika dijiplak menjadi...
A) Lingkaran
B) Segitiga
C) Segiempat
D) Bola`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Jejak Permukaan",
      pengantar:
        "Kemarin Ali belajar bentuk ruang. Sekarang ia menjiplak permukaan meja di kertas. Nia menjelaskan: hasil jiplakan itu bentuk datar, tipis dan rata.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Segiempat dari meja",
          singkat: "4 pojok",
          uraian:
            "Permukaan meja punya 4 pojok, jadi namanya Segiempat. Bentuk datar itu tipis dan rata.",
          contoh: "Meja dijiplak = segiempat.",
        },
        {
          nama: "Lingkaran dan segitiga",
          singkat: "Koin dan atap",
          uraian:
            "Uang koin bulat rata namanya Lingkaran. Atap rumah adat berbentuk Segitiga.",
          contoh: "Koin = lingkaran. Atap = segitiga.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Permukaan meja yang dijiplak menjadi bentuk apa?",
          alias: ["segiempat", "segi empat"],
        },
        {
          pertanyaan: "2. Uang koin berbentuk apa?",
          alias: ["lingkaran"],
        },
        {
          pertanyaan: "3. Atap rumah adat berbentuk apa?",
          alias: ["segitiga"],
        },
      ],
      voice: [
        [
          "Ali berkata, Nia, kemarin kita belajar bentuk ruang. Sekarang, kalau permukaan meja ini kita jiplak di kertas, jadinya bentuk apa ya?",
          "Nia menjawab, itu namanya Bentuk Datar, Ali! Bentuknya tipis dan rata. Karena permukaan meja punya 4 pojok, namanya Segiempat!",
        ],
        [
          "Ali berkata, oh! Kalau uang koin itu bulat rata, berarti namanya Lingkaran ya?",
          "Nia berkata, tepat sekali! Dan atap rumah adat itu bentuknya Segitiga!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Keluarga Bentuk Datar",
      pengantar:
        "Bentuk datar adalah bangun dua dimensi yang pipih dan rata. Ketuk kartu bentuk untuk melihat jumlah pojok dan contohnya.",
      labelDaftar: "Tiga bentuk dasar",
      kolom: 3,
      item: [
        {
          nama: "Segiempat",
          singkat: "4 pojok",
          uraian:
            "Memiliki 4 sisi garis lurus dan 4 pojok. Contoh: papan tulis, permukaan meja.",
          contoh: "🟦 4 pojok.",
        },
        {
          nama: "Segitiga",
          singkat: "3 pojok",
          uraian:
            "Memiliki 3 sisi garis lurus dan 3 pojok. Contoh: rambu jalan, atap rumah adat.",
          contoh: "🔺 3 pojok.",
        },
        {
          nama: "Lingkaran",
          singkat: "0 pojok",
          uraian:
            "Bulat rata, memiliki 1 sisi melengkung yang saling bertemu, tidak memiliki pojok. Contoh: jam dinding, uang koin.",
          contoh: "🔴 0 pojok.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Segitiga punya berapa pojok?",
          alias: ["tiga", "3", "tiga pojok"],
        },
        {
          pertanyaan: "2. Lingkaran punya berapa pojok?",
          alias: ["nol", "0", "tidak punya", "tidak ada"],
        },
        {
          pertanyaan: "3. Papan tulis contoh bentuk apa?",
          alias: ["segiempat", "segi empat"],
        },
      ],
      voice: [
        [
          "Infografis keluarga bentuk datar. Segiempat punya 4 pojok, contoh papan tulis. Segitiga punya 3 pojok, contoh rambu jalan. Lingkaran bulat rata, 0 pojok, contoh jam dinding.",
        ],
        [
          "Bentuk datar pipih dan rata. Lingkaran hanya punya satu sisi melengkung. Segitiga 3 sisi. Segiempat 4 sisi.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tempel Rumah dan Cetak Kue",
      pengantar:
        "Di sekolah kita menempel kertas bentuk menjadi rumah atau mobil. Di rumah kita mencetak bentuk datar dari benda sehari-hari.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Tempel Bentuk",
          singkat: "Untuk guru",
          uraian:
            "Bagikan kertas warna-warni berbentuk segitiga, segiempat, dan lingkaran. Minta siswa menempelkannya di papan tulis hingga membentuk gambar rumah atau mobil.",
          contoh: "Atap segitiga, badan segiempat, roda lingkaran.",
        },
        {
          nama: "Cetak Bentuk Datar",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak mencetak bentuk datar di atas kertas menggunakan cetakan kue atau benda rumah tangga, seperti tutup gelas untuk membuat lingkaran.",
          contoh: "Tutup gelas = lingkaran.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Atap rumah dari kertas biasanya bentuk apa?",
          alias: ["segitiga"],
        },
        {
          pertanyaan: "2. Roda mobil dari kertas bentuk apa?",
          alias: ["lingkaran"],
        },
        {
          pertanyaan: "3. Tutup gelas mencetak bentuk apa?",
          alias: ["lingkaran"],
        },
      ],
      voice: [
        [
          "Di sekolah, tempel kertas segitiga, segiempat, dan lingkaran hingga jadi rumah atau mobil.",
        ],
        [
          "Di rumah, cetak bentuk datar dengan cetakan kue atau tutup gelas. Tutup gelas membuat lingkaran.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menebak bentuk datar. Pilih jawaban, sebut karakteristik, cocokkan jumlah pojok, lalu temukan benda segiempat di kelas.",
      labelDaftar: "Empat Jenis Soal",
      kolom: 1,
      item: [
        {
          nama: "Tebak bentuk",
          singkat: "Pilihan ganda",
          uraian:
            "Roda sepeda dan irisan jeruk berbentuk lingkaran. Penggaris 3 sudut disebut segitiga.",
          contoh: "Roda = lingkaran.",
        },
        {
          nama: "Klasifikasi dan mencocokkan",
          singkat: "Isian dan garis",
          uraian:
            "Tanpa pojok = lingkaran. Jam dan koin = lingkaran. 3 garis lurus = segitiga. Segitiga 3 pojok, lingkaran 0 pojok, segiempat 4 pojok.",
          contoh: "Lingkaran 0 pojok.",
        },
        {
          nama: "Benda di kelas",
          singkat: "Pilihan ganda",
          uraian: "Papan tulis hitam permukaannya berbentuk segiempat.",
          contoh: "Papan tulis = segiempat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Roda sepeda berbentuk apa?",
          alias: ["lingkaran", "c"],
        },
        {
          pertanyaan: "2. Penggaris 3 sudut disebut bangun apa?",
          alias: ["segitiga", "a"],
        },
        {
          pertanyaan: "3. Bangun datar tanpa pojok disebut apa?",
          alias: ["lingkaran"],
        },
        {
          pertanyaan: "4. Jam dinding dan koin berbentuk apa?",
          alias: ["lingkaran"],
        },
        {
          pertanyaan: "5. 3 garis lurus menyambung namanya apa?",
          alias: ["segitiga"],
        },
        {
          pertanyaan: "6. Segitiga memiliki berapa pojok?",
          alias: ["3", "tiga", "tiga pojok"],
        },
        {
          pertanyaan: "7. Lingkaran memiliki berapa pojok?",
          alias: ["0", "nol", "tidak punya"],
        },
        {
          pertanyaan: "8. Segiempat memiliki berapa pojok?",
          alias: ["4", "empat", "empat pojok"],
        },
        {
          pertanyaan: "9. Papan tulis hitam berbentuk apa?",
          alias: ["segiempat", "segi empat", "c"],
        },
        {
          pertanyaan: "10. Rambu jalan contoh bentuk apa?",
          alias: ["segitiga"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi Bab 9. Roda sepeda berbentuk lingkaran. Penggaris 3 sudut disebut segitiga. Tanpa pojok namanya lingkaran.",
        ],
        [
          "Cocokkan: segitiga 3 pojok, lingkaran 0 pojok, segiempat 4 pojok. Papan tulis hitam berbentuk segiempat. Semangat!",
        ],
      ],
    },
  ],
};
