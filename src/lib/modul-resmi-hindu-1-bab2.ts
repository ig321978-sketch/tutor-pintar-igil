import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_HINDU1_BAB2 = "Bab 2: Aku Anak yang Berbakti";

export const MODUL_HINDU1_BAB2: ModulResmiPai = {
  id: "hindu-1-bab2",
  judul: JUDUL_HINDU1_BAB2,
  pola: /anak yang berbakti|tri kaya|kitab suci hindu/,
  motivasi:
    "Om Swastyastu: semoga pikiran baik datang dari segala arah. Tri Kaya Parisudha: Manacika, Wacika, Kayika. Bakti dimulai di rumah, tanpa menunggu hadiah.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Made mengucapkan Om Swastyastu sambil merapatkan telapak di dada.",
    "Anak mengucapkan terima kasih dan menyapa adik dengan lembut.",
    "Anak menyapu tanpa diminta hadiah.",
    "Anak tidak iri, hatinya tenang dan disayangi teman.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Sebab: Made selalu berpikir yang baik (Manacika) dan tidak pernah iri hati kepada teman-temannya. Akibat yang dirasakan Made dalam kehidupan sehari-hari adalah...
A) Made memiliki sedikit teman di sekolah.
B) Hati Made menjadi tenang, damai, dan disayangi oleh banyak orang.
C) Made menjadi sering mengantuk di kelas.
D) Made membentak Ibu.`,
    `[Soal 2 - PG - Tipe: HOTS]
Kita hanya perlu membantu menyapu jika dijanjikan hadiah mainan. Pernyataan ini...
A) Benar, karena kerja harus dibayar.
B) Salah; anak berbakti menolong tanpa menunggu hadiah.
C) Benar hanya pada hari Minggu.
D) Tidak ada hubungannya dengan Tri Kaya.`,
    `[Soal 3 - PG - Tipe: Reguler]
Om Swastyastu artinya...
A) Semoga pikiran baik datang dari segala arah; juga wujud hormat kepada orang tua.
B) Selamat tinggal.
C) Ayo cepat masuk.
D) Jangan bicara.`,
    `[Soal 4 - PG - Tipe: Reguler]
Manacika adalah...
A) Berkata kasar.
B) Menyapu saja.
C) Berpikir yang baik dan suci, tidak iri, mendoakan kebaikan orang lain.
D) Membentak Ibu.`,
    `[Soal 5 - PG - Tipe: Reguler]
Wacika adalah...
A) Iri hati.
B) Berkata jujur, sopan, manis, tidak menyakiti hati.
C) Diam saja selamanya.
D) Melempar kata kasar.`,
    `[Soal 6 - PG - Tipe: Reguler]
Kayika adalah...
A) Berbuat jujur, suka menolong, dan rajin bekerja.
B) Hanya berpikir.
C) Hanya diam.
D) Menunggu hadiah dulu.`,
    `[Soal 7 - PG - Tipe: HOTS]
Contoh Wacika di rumah adalah...
A) Membentak saat diminta merapikan tempat tidur.
B) Mengucapkan terima kasih setelah diberi uang saku dan menyapa saudara dengan santun.
C) Diam saat Ibu menyapa.
D) Mengejek adik.`,
    `[Soal 8 - PG - Tipe: Reguler]
Tri Kaya Parisudha berarti...
A) Tiga mainan suci.
B) Tiga Pura.
C) Tiga penyucian diri: pikiran, perkataan, perbuatan.
D) Tiga hadiah.`,
    `[Soal 9 - PG - Tipe: Reguler]
Bakti terkecil dimulai dari...
A) Berbakti kepada Ibu dan Ayah serta menyayangi saudara.
B) Menunggu hadiah.
C) Iri pada teman.
D) Membentak di teras.`,
    `[Soal 10 - PG - Tipe: Reguler]
Salam suci umat Hindu yang diucapkan Made di teras adalah...
A) Selamat pagi biasa tanpa makna.
B) Om Swastyastu, telapak dirapatkan di dada.
C) Hanya anggukan.
D) Teriakan nama.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Om Swastyastu di Teras",
      pengantar:
        "Di teras rumah Made setelah pulang sekolah. Ia mengucapkan salam suci sambil merapatkan kedua telapak di dada.",
      labelDaftar: "Percakapan Nia dan Made tentang bakti",
      kolom: 1,
      item: [
        {
          nama: "Salam suci",
          singkat: "Om Swastyastu",
          uraian:
            "Artinya: semoga pikiran baik datang dari segala arah. Salam ini juga wujud hormat kepada orang tua di rumah.",
          contoh: "Rapatkan telapak. Ucapkan salam. Hormati.",
        },
        {
          nama: "Ajaran di rumah",
          singkat: "Bukan hanya di Pura",
          uraian:
            "Menghormati orang tua termasuk ajaran agama. Anak yang berbakti menanam kebaikan di rumah.",
          contoh: "Hormat orang tua. Itu agama.",
        },
        {
          nama: "Tiga jalan suci",
          singkat: "Tri Kaya Parisudha",
          uraian:
            "Berpikir baik (Manacika), berkata sopan (Wacika), berbuat benar (Kayika).",
          contoh: "Pikir. Kata. Perbuatan. Semua baik.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Salam suci Made: Om...?",
          alias: ["swastyastu"],
        },
        {
          pertanyaan: "2. Tiga penyucian diri disebut Tri... Parisudha?",
          alias: ["kaya"],
        },
        {
          pertanyaan: "3. Berkata yang sopan disebut...?",
          alias: ["wacika"],
        },
      ],
      voice: [
        [
          "Made mengucapkan Om Swastyastu, telapak di dada. Semoga pikiran baik datang dari segala arah. Itu hormat pada orang tua.",
        ],
        [
          "Tri Kaya Parisudha: Manacika berpikir baik, Wacika berkata sopan, Kayika berbuat benar. Bakti dimulai di rumah.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Manacika, Wacika, Kayika",
      pengantar:
        "Tiga penyucian diri adalah landasan budi pekerti Hindu. Bakti terkecil: orang tua dan saudara, tanpa menunggu hadiah.",
      labelDaftar: "Isi Tri Kaya dan laku bakti",
      kolom: 1,
      item: [
        {
          nama: "Manacika",
          singkat: "Pikiran suci",
          uraian:
            "Berpikir baik, tidak iri. Akibatnya hati tenang, damai, dan disayangi banyak orang. Bukan sedikit teman, bukan mengantuk.",
          contoh: "Jangan iri. Doakan teman. Hati tenang.",
        },
        {
          nama: "Wacika",
          singkat: "Kata yang manis",
          uraian:
            "Terima kasih setelah diberi uang saku. Sapa adik atau kakak dengan santun. Bukan membentak Ibu saat diminta merapikan tempat tidur.",
          contoh: "Terima kasih. Sapa lembut. Jangan bentak.",
        },
        {
          nama: "Kayika bakti",
          singkat: "Tanpa hadiah dulu",
          uraian:
            "Menyapu dan menolong karena bakti, bukan karena dijanjikan mainan. Rajin bekerja dan jujur di rumah.",
          contoh: "Tolong sekarang. Bukan tunggu hadiah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tidak iri hati termasuk Mana...?",
          alias: ["manacika", "pikir"],
        },
        {
          pertanyaan: "2. Terima kasih dan sapa lembut termasuk Wa...?",
          alias: ["wacika", "kata"],
        },
        {
          pertanyaan: "3. Menyapu tanpa hadiah termasuk Ka...?",
          alias: ["kayika", "buat", "perbuatan"],
        },
      ],
      voice: [
        [
          "Manacika: jangan iri, doakan orang lain. Hati menjadi tenang dan disayangi.",
        ],
        [
          "Wacika: terima kasih dan sapa lembut, jangan membentak. Kayika: menyapu tanpa menunggu hadiah.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bakti di Sekolah dan di Rumah",
      pengantar:
        "Tri Kaya dilatih saat masuk rumah dan saat bicara dengan saudara. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan salam dan bakti",
      kolom: 2,
      item: [
        {
          nama: "Latihan salam",
          singkat: "Untuk guru",
          uraian:
            "Latih Om Swastyastu dan merapatkan telapak. Centang mana yang Wacika: terima kasih dan sapa lembut, bukan membentak. Diskusikan akibat Manacika.",
          contoh: "Salam. Centang kata baik. Jangan iri.",
        },
        {
          nama: "Sapu tanpa janji",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak membantu tanpa menjanjikan mainan lebih dulu. Puji proses, bukan imbalan. Latih kata terima kasih setiap hari.",
          contoh: "Bantu dulu. Puji proses. Ucap syukur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Membentak Ibu: termasuk Wacika atau tidak?",
          alias: ["tidak", "bukan"],
        },
        {
          pertanyaan: "2. Menyapu hanya jika ada hadiah: benar atau salah?",
          alias: ["salah"],
        },
        {
          pertanyaan: "3. Manacika membuat hati... dan damai?",
          alias: ["tenang", "damai"],
        },
      ],
      voice: [
        [
          "Di kelas, latih Om Swastyastu. Centang kata yang sopan. Jangan pilih membentak.",
        ],
        [
          "Di rumah, bantu menyapu tanpa menunggu mainan. Itu Kayika anak yang berbakti.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Centang contoh Wacika, tentukan benar-salah tentang hadiah, lalu pilih akibat Manacika.",
      labelDaftar: "Centang, benar-salah, dan sebab-akibat",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Wacika di rumah",
          uraian:
            "Yang benar: terima kasih setelah uang saku, dan sapa saudara dengan santun. Membentak Ibu saat merapikan tempat tidur bukan Wacika.",
          contoh: "Centang terima kasih dan sapa. Jangan bentak.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Hadiah dan hati tenang",
          uraian:
            "Salah jika hanya menyapu bila ada hadiah. Manacika: hati tenang, damai, disayangi banyak orang.",
          contoh: "Salah. Hati tenang. Disayangi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Wacika: terima kasih dan sapa lembut, bukan... Ibu?",
          alias: ["membentak", "bentak"],
        },
        {
          pertanyaan: "2. Menyapu hanya jika ada hadiah: benar atau salah?",
          alias: ["salah"],
        },
        {
          pertanyaan: "3. Manacika membuat hati Made... dan disayangi?",
          alias: ["tenang", "damai"],
        },
      ],
      voice: [
        [
          "Wacika: ucapkan terima kasih dan sapa lembut. Jangan membentak Ibu.",
        ],
        [
          "Salah jika menyapu hanya karena hadiah. Manacika: hati tenang, damai, disayangi banyak orang.",
        ],
      ],
    },
  ],
};
