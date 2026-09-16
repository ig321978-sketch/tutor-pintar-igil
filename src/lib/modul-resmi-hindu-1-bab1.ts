import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_HINDU1_BAB1 = "Bab 1: Alam Semesta Karunia Hyang Widhi Wasa";

export const MODUL_HINDU1_BAB1: ModulResmiPai = {
  id: "hindu-1-bab1",
  judul: JUDUL_HINDU1_BAB1,
  pola: /alam semesta|karunia hyang|hyang widhi/,
  motivasi:
    "Bunga jepun, kucing, pohon, dan tubuh kita adalah ciptaan Hyang Widhi Wasa. Cetana hidup, Acetana mati. Syukur diucapkan dan dikerjakan: rawat tanaman, sayangi makhluk.",
  kunciJawaban: "B,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali dan Made memandang pohon kamboja berbunga di luar Pura sekolah.",
    "Anak memberi susu pada anak kucing yang kelaparan.",
    "Anak menyiram bunga kelas yang layu.",
    "Anak tidak memetik bunga sembarangan di halaman suci.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di halaman rumahmu ada seekor anak kucing yang mengeong kelaparan. Perbuatan baik (Kayika) yang paling tepat kamu lakukan sebagai wujud kasih kepada ciptaan Hyang Widhi Wasa adalah...
A) Membiarkannya berlari pergi karena takut kotor.
B) Mengambil sisa makanan yang aman atau susu lalu memberikannya dengan kasih sayang.
C) Melemparinya dengan batu kecil agar ia tidak bersuara lagi.
D) Mengusirnya dengan teriakan.`,
    `[Soal 2 - PG - Tipe: HOTS]
Ketika kamu melihat tanaman bunga di depan kelas mulai layu karena cuaca sangat terik, tindakan apa yang mencerminkan rasa syukurmu kepada Hyang Widhi?
A) Memetik bunganya sebelum kering total.
B) Mengambil air menggunakan gayung atau siraman, lalu menyiram tanaman itu dengan rajin.
C) Menunggu tukang kebun sekolah yang datang menyiramnya.
D) Membiarkan bunga kering.`,
    `[Soal 3 - PG - Tipe: HOTS]
Siapa yang menumbuhkan bunga jepun dan memberinya warna serta keharuman, menurut Made?
A) Hanya petani.
B) Hyang Widhi Wasa, Tuhan yang menumbuhkan ciptaan-Nya.
C) Angin saja.
D) Tukang kebun semata.`,
    `[Soal 4 - PG - Tipe: Reguler]
Cetana artinya...
A) Benda hidup: manusia, tumbuhan, dan hewan.
B) Hanya batu.
C) Hanya udara.
D) Benda mati.`,
    `[Soal 5 - PG - Tipe: Reguler]
Acetana artinya...
A) Manusia.
B) Kucing.
C) Benda mati seperti batu, air, tanah, dan udara.
D) Pohon kelapa.`,
    `[Soal 6 - PG - Tipe: Reguler]
Matahari dan bulan termasuk kelompok...
A) Cetana.
B) Benda mati atau Acetana.
C) Hewan peliharaan.
D) Tanaman.`,
    `[Soal 7 - PG - Tipe: Reguler]
Menyiram bunga dengan rajin termasuk perbuatan...
A) Baik atau Susila.
B) Sembrono.
C) Sembarangan memetik.
D) Melempar batu.`,
    `[Soal 8 - PG - Tipe: HOTS]
Rasa syukur anak usia dini diwujudkan dengan...
A) Hanya berdoa tanpa berbuat.
B) Doa (Sembahyang) dan perbuatan nyata Kayika: jaga suci, jangan petik bunga sembarangan, sayangi hewan.
C) Memetik semua bunga di Pura.
D) Menunggu orang lain merawat.`,
    `[Soal 9 - PG - Tipe: Reguler]
Kucing, pohon kelapa, dan diri kita...
A) Bukan ciptaan siapa pun.
B) Hanya ditanam petani.
C) Juga diciptakan Hyang Widhi Wasa.
D) Termasuk Acetana semua.`,
    `[Soal 10 - PG - Tipe: Reguler]
Karena tubuh sehat dan alam indah, kita wajib...
A) Merawat tanaman dan menyayangi sesama makhluk.
B) Membiarkan tanaman layu.
C) Melempari kucing.
D) Memetik bunga tanpa alasan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Bunga Jepun di Halaman Pura",
      pengantar:
        "Di area luar Pura sekolah. Ali dan Made melihat pohon kamboja (jepun) yang berbunga lebat.",
      labelDaftar: "Percakapan Ali dan Made tentang ciptaan Hyang Widhi",
      kolom: 1,
      item: [
        {
          nama: "Siapa yang menumbuhkan",
          singkat: "Petani menanam, Tuhan menumbuhkan",
          uraian:
            "Petani menanam bunga jepun. Yang menumbuhkan, memberi warna, dan keharuman adalah Hyang Widhi Wasa. Semua makhluk hidup adalah ciptaan-Nya.",
          contoh: "Tanam manusia. Tumbuh Hyang Widhi.",
        },
        {
          nama: "Kucing, kelapa, diri kita",
          singkat: "Semua ciptaan",
          uraian:
            "Kucing, pohon kelapa, dan tubuh kita juga diciptakan-Nya. Karena tubuh sehat dan alam indah, kita wajib bersyukur.",
          contoh: "Kita juga ciptaan-Nya.",
        },
        {
          nama: "Syukur yang kelihatan",
          singkat: "Rawat dan sayangi",
          uraian:
            "Bersyukur dengan merawat tanaman dan menyayangi sesama makhluk, bukan hanya mengagumi bunga.",
          contoh: "Rawat. Sayangi. Jangan rusak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bunga jepun ditumbuhkan oleh... Widhi Wasa?",
          alias: ["hyang", "tuhan"],
        },
        {
          pertanyaan: "2. Kucing dan pohon kelapa juga... Hyang Widhi?",
          alias: ["ciptaan", "diciptakan"],
        },
        {
          pertanyaan: "3. Kita bersyukur dengan merawat tanaman dan... makhluk?",
          alias: ["menyayangi", "sayangi"],
        },
      ],
      voice: [
        [
          "Ali dan Made memandang bunga jepun di luar Pura. Petani menanam, Hyang Widhi yang menumbuhkan dan memberi harum.",
        ],
        [
          "Kucing, pohon kelapa, dan tubuh kita juga ciptaan-Nya. Bersyukur: rawat tanaman, sayangi makhluk.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Cetana, Acetana, dan Kayika",
      pengantar:
        "Ciptaan Hyang Widhi: Cetana hidup dan Acetana mati. Syukur lewat doa dan perbuatan Kayika yang susila.",
      labelDaftar: "Dua kelompok ciptaan dan wujud bakti",
      kolom: 1,
      item: [
        {
          nama: "Cetana",
          singkat: "Benda hidup",
          uraian:
            "Manusia, tumbuhan, dan hewan adalah Cetana. Manusia dan kucing hidup, bernapas, dan merasakan kasih.",
          contoh: "Hidup: manusia, kucing, pohon.",
        },
        {
          nama: "Acetana",
          singkat: "Benda mati",
          uraian:
            "Batu, air, tanah, udara, matahari, dan bulan adalah Acetana. Tetap ciptaan Hyang Widhi yang wajib dihormati, bukan dirusak.",
          contoh: "Mati: batu, air, matahari.",
        },
        {
          nama: "Kayika syukur",
          singkat: "Perbuatan nyata",
          uraian:
            "Syukur tidak hanya Sembahyang. Kayika: jaga kebersihan lingkungan suci, jangan petik bunga sembarangan, sayangi hewan. Kucing lapar diberi makanan aman. Bunga layu disiram sendiri.",
          contoh: "Beri makan. Siram. Jangan petik sembarangan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Manusia dan kucing termasuk Cetana atau Acetana?",
          alias: ["cetana", "hidup"],
        },
        {
          pertanyaan: "2. Batu dan air sungai termasuk benda...?",
          alias: ["mati", "acetana"],
        },
        {
          pertanyaan: "3. Menyiram bunga termasuk perbuatan... atau Susila?",
          alias: ["baik", "susila", "kayika"],
        },
      ],
      voice: [
        [
          "Cetana: manusia, tumbuhan, hewan. Acetana: batu, air, tanah, udara, matahari, dan bulan.",
        ],
        [
          "Syukur Kayika: beri makan kucing lapar, siram bunga layu, jangan petik sembarangan di halaman suci.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Merawat Ciptaan di Sekolah dan di Rumah",
      pengantar:
        "Bakti dilatih di halaman Pura dan di depan rumah. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan Cetana dan Kayika",
      kolom: 2,
      item: [
        {
          nama: "Jepun kelas",
          singkat: "Untuk guru",
          uraian:
            "Ajak anak mengelompokkan: mana hidup, mana mati. Siram bersama bunga yang layu. Diskusikan: apakah menunggu tukang kebun saja sudah cukup sebagai syukur?",
          contoh: "Kelompokkan. Siram. Jangan tunggu saja.",
        },
        {
          nama: "Kucing halaman",
          singkat: "Untuk orang tua",
          uraian:
            "Jika ada anak kucing lapar, temani anak memberi makanan aman atau susu. Jangan dilempari. Ucapkan terima kasih kepada Hyang Widhi atas alam.",
          contoh: "Beri makan. Jangan lempar. Syukuri.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bunga layu: kita menyiram atau memetik?",
          alias: ["siram", "menyiram"],
        },
        {
          pertanyaan: "2. Kucing lapar: kita memberi... yang aman?",
          alias: ["makanan", "susu", "makan"],
        },
        {
          pertanyaan: "3. Matahari termasuk benda...?",
          alias: ["mati", "acetana"],
        },
      ],
      voice: [
        [
          "Di sekolah, kelompokkan Cetana dan Acetana. Siram bunga yang layu. Jangan petik sembarangan.",
        ],
        [
          "Di rumah, kucing lapar diberi makanan aman. Itu Kayika, perbuatan baik kepada ciptaan Hyang Widhi.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih Kayika untuk kucing lapar dan syukur untuk bunga layu, jodohkan Cetana-Acetana, lalu lengkapi kata kunci.",
      labelDaftar: "Pilihan, menjodohkan, dan isian bergambar",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Kucing dan bunga",
          uraian:
            "Kayika: beri makanan aman atau susu. Syukur: siram bunga yang layu. Bukan membiarkan, melempari, memetik, atau hanya menunggu orang lain.",
          contoh: "Beri makan. Siram sendiri.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Cetana, Acetana, Susila",
          uraian:
            "Manusia dan kucing: Cetana. Batu dan air: Acetana. Matahari dan bulan: benda mati. Menyiram bunga: perbuatan baik atau Susila.",
          contoh: "Hidup-Cetana. Mati-Acetana. Siram-baik.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kucing lapar: kita memberi makanan dengan...?",
          alias: ["kasih", "sayang", "kayika"],
        },
        {
          pertanyaan: "2. Bunga layu: kita... dengan air?",
          alias: ["siram", "menyiram"],
        },
        {
          pertanyaan: "3. Manusia dan kucing: Cetana atau Acetana?",
          alias: ["cetana", "hidup"],
        },
        {
          pertanyaan: "4. Matahari dan bulan: benda... atau Acetana?",
          alias: ["mati", "acetana"],
        },
        {
          pertanyaan: "5. Menyiram bunga termasuk perbuatan... atau Susila?",
          alias: ["baik", "susila"],
        },
      ],
      voice: [
        [
          "Kucing lapar diberi makanan aman. Bunga layu disiram. Manusia dan kucing Cetana. Batu dan air Acetana.",
        ],
        [
          "Matahari dan bulan benda mati. Menyiram bunga adalah perbuatan baik, Susila, wujud syukur kepada Hyang Widhi.",
        ],
      ],
    },
  ],
};
