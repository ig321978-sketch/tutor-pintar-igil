import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_HINDU1_BAB4 = "Bab 4: Indahnya Tat Twam Asi";

export const MODUL_HINDU1_BAB4: ModulResmiPai = {
  id: "hindu-1-bab4",
  judul: JUDUL_HINDU1_BAB4,
  pola: /tat twam asi|kerukunan|yadnya/,
  motivasi:
    "Tat Twam Asi: ia adalah kamu. Menolong Tono merapikan buku sama dengan menolong diri sendiri. Bagi kue, jenguk yang sakit, jangan sembunyikan sepatu. Dunia satu keluarga.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Nia dan Made merapikan buku Tono yang berhamburan.",
    "Anak membagi satu kue lapis kepada teman yang bekalnya tertinggal.",
    "Anak meminjamkan pensil dan menjenguk teman sakit.",
    "Anak menolak menyembunyikan sepatu teman.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat istirahat, kamu membawa dua buah kue lapis. Kamu melihat seorang teman duduk merenung sendirian karena bekalnya tertinggal di rumah. Tindakan yang mencerminkan pengamalan ajaran Tat Twam Asi adalah...
A) Memakan kedua kue tersebut dengan cepat di depan wajahnya agar tidak diminta.
B) Menghampirinya dengan ramah, lalu membagi satu kue milikmu untuk dinikmati bersama-sama dengannya.
C) Menyarankannya untuk membeli kue sendiri di kantin.
D) Diam saja di pojok kelas.`,
    `[Soal 2 - PG - Tipe: HOTS]
Meminjamkan pensil kepada teman yang patah pensilnya...
A) Sesuai Tat Twam Asi.
B) Tidak sesuai.
C) Hanya lelucon.
D) Tidak perlu.`,
    `[Soal 3 - PG - Tipe: HOTS]
Menyembunyikan sepatu teman di lemari sebagai lelucon...
A) Sesuai Tat Twam Asi.
B) Boleh jika lucu.
C) Tidak sesuai Tat Twam Asi.
D) Wajib dilakukan.`,
    `[Soal 4 - PG - Tipe: Reguler]
Menjenguk teman sekelas yang sakit...
A) Tidak sesuai.
B) Sesuai Tat Twam Asi.
C) Hanya tugas guru.
D) Membuang waktu.`,
    `[Soal 5 - PG - Tipe: Reguler]
Susunan kata Asi - Twam - Tat yang benar adalah...
A) Tat Twam Asi.
B) Asi Twam Tat.
C) Twam Asi Tat.
D) Tat Asi Twam.`,
    `[Soal 6 - PG - Tipe: Reguler]
Tat Twam Asi artinya...
A) Aku lebih penting.
B) Ia adalah kamu, kamu adalah ia.
C) Jangan berbagi.
D) Makan sendiri.`,
    `[Soal 7 - PG - Tipe: Reguler]
Vasudhaiva Kutumbakam menanamkan...
A) Dunia terpisah-pisah.
B) Hanya keluarga sendiri.
C) Dunia adalah satu keluarga; toleran, berbagi, jenguk, jangan mengejek.
D) Sembunyikan sepatu.`,
    `[Soal 8 - PG - Tipe: HOTS]
Menolong orang yang kesusahan sama dengan...
A) Menolong diri sendiri, karena kita bersaudara di hadapan Tuhan.
B) Membuang waktu.
C) Membuat kita rugi.
D) Hanya tugas guru piket.`,
    `[Soal 9 - PG - Tipe: Reguler]
Menyakiti orang lain sama dengan...
A) Menang sendiri.
B) Menyakiti diri sendiri, dan menyayangi sesama adalah menyayangi Hyang Widhi.
C) Lelucon yang wajib.
D) Tidak ada akibat.`,
    `[Soal 10 - PG - Tipe: Reguler]
Saat Tono tersandung dan bukunya berhamburan, Nia dan Made...
A) Tertawa lalu pergi.
B) Membantu merapikan bukunya.
C) Menyembunyikan bukunya.
D) Menyuruh Tono membeli buku baru.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Buku Tono di Lantai",
      pengantar:
        "Di kelas jam istirahat. Tono terjatuh, buku tugasnya berhamburan. Nia mengajak Made menolong.",
      labelDaftar: "Percakapan Nia dan Made tentang Tat Twam Asi",
      kolom: 1,
      item: [
        {
          nama: "Ayo bantu",
          singkat: "Jangan dilewati",
          uraian:
            "Nia melihat Tono tersandung kaki meja. Mereka merapikan buku bersama, bukan menertawakan.",
          contoh: "Lihat. Dekati. Rapikan.",
        },
        {
          nama: "Tat Twam Asi",
          singkat: "Ia adalah kamu",
          uraian:
            "Ajaran mulia Hindu: ia adalah kamu, kamu adalah ia. Apa yang dirasakan orang lain, itu juga yang kita rasakan.",
          contoh: "Ia = kamu. Rasa yang sama.",
        },
        {
          nama: "Menolong diri sendiri",
          singkat: "Bersaudara di hadapan Tuhan",
          uraian:
            "Menolong yang kesusahan sama dengan menolong diri sendiri. Kita semua bersaudara di hadapan Hyang Widhi.",
          contoh: "Tolong dia. Tolong diri. Bersaudara.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ajaran 'ia adalah kamu' disebut Tat Twam...?",
          alias: ["asi"],
        },
        {
          pertanyaan: "2. Nia dan Made merapikan... Tono?",
          alias: ["buku"],
        },
        {
          pertanyaan: "3. Menolong orang lain sama dengan menolong... sendiri?",
          alias: ["diri"],
        },
      ],
      voice: [
        [
          "Tono tersandung, bukunya berhamburan. Nia dan Made merapikan. Jangan dibiarkan.",
        ],
        [
          "Tat Twam Asi: ia adalah kamu. Menolong yang kesusahan sama dengan menolong diri sendiri. Kita bersaudara.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Empati dan Satu Keluarga",
      pengantar:
        "Tat Twam Asi menumbuhkan empati tanpa batas. Vasudhaiva Kutumbakam: dunia satu keluarga. Bagi kue, pinjamkan pensil, jenguk, jangan mengejek.",
      labelDaftar: "Falsafah dan implementasi sosial",
      kolom: 1,
      item: [
        {
          nama: "Menyakiti = menyakiti diri",
          singkat: "Empati",
          uraian:
            "Menyakiti orang lain sama dengan menyakiti diri sendiri. Menyayangi sesama adalah menyayangi Hyang Widhi Wasa.",
          contoh: "Jangan sakiti. Sayangi. Hormati Tuhan.",
        },
        {
          nama: "Bagi kue, jenguk",
          singkat: "Sesuai ajaran",
          uraian:
            "Dua kue lapis: bagi satu kepada teman yang bekalnya tertinggal. Pinjamkan pensil. Jenguk yang sakit. Bukan makan sendiri di depan wajahnya, bukan hanya menyuruh ke kantin.",
          contoh: "Bagi. Pinjamkan. Jenguk.",
        },
        {
          nama: "Bukan lelucon kejam",
          singkat: "Tidak sesuai",
          uraian:
            "Menyembunyikan sepatu teman di lemari bukan lelucon yang sesuai Tat Twam Asi. Susun katanya: Tat Twam Asi.",
          contoh: "Jangan sembunyikan sepatu. Susun: Tat Twam Asi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Dua kue, teman tanpa bekal: kita... satu kue?",
          alias: ["bagi", "berbagi", "bagi"],
        },
        {
          pertanyaan: "2. Menyembunyikan sepatu: sesuai atau tidak sesuai?",
          alias: ["tidak", "bukan"],
        },
        {
          pertanyaan: "3. Susunan yang benar: Tat Twam...?",
          alias: ["asi"],
        },
      ],
      voice: [
        [
          "Dua kue lapis: hampiri teman yang bekalnya tertinggal, bagi satu. Itu Tat Twam Asi.",
        ],
        [
          "Pinjamkan pensil. Jenguk yang sakit. Jangan sembunyikan sepatu. Susun katanya: Tat Twam Asi.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Satu Keluarga di Sekolah dan di Rumah",
      pengantar:
        "Tat Twam Asi dilatih saat ada yang jatuh dan saat bekal tertinggal. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan empati",
      kolom: 2,
      item: [
        {
          nama: "Rapikan bersama",
          singkat: "Untuk guru",
          uraian:
            "Simulasikan buku berhamburan. Siapa yang menertawakan, siapa yang merapikan? Centang perilaku sesuai dan tidak sesuai. Susun kartu kata Tat Twam Asi.",
          contoh: "Rapikan. Centang. Susun kata.",
        },
        {
          nama: "Bekal berlebih",
          singkat: "Untuk orang tua",
          uraian:
            "Jika bekal lebih, ajak anak berbagi. Jenguk tetangga atau teman yang sakit. Tanyakan: jika kamu yang kesusahan, apa yang kamu harapkan?",
          contoh: "Bagi bekal. Jenguk. Bayangkan rasa.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman jatuh, buku berhamburan: kita...?",
          alias: ["bantu", "rapikan", "tolong"],
        },
        {
          pertanyaan: "2. Menjenguk teman sakit: sesuai atau tidak?",
          alias: ["sesuai"],
        },
        {
          pertanyaan: "3. Dunia satu keluarga disebut Vasudhaiva...?",
          alias: ["kutumbakam"],
        },
      ],
      voice: [
        [
          "Di kelas, rapikan buku yang jatuh. Centang: pinjamkan pensil sesuai, sembunyikan sepatu tidak sesuai.",
        ],
        [
          "Di rumah, bagi bekal dan jenguk yang sakit. Dunia satu keluarga di hadapan Hyang Widhi.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih cara berbagi kue, centang sikap sesuai atau tidak, lalu susun Tat Twam Asi.",
      labelDaftar: "Kasus, pengelompokan, dan susun kata",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Kue lapis",
          uraian:
            "Tat Twam Asi: hampiri dengan ramah dan bagi satu kue. Bukan makan keduanya di depan wajahnya, bukan hanya menyuruh ke kantin.",
          contoh: "Hampiri. Bagi. Nikmati bersama.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Centang dan susun",
          uraian:
            "Sesuai: pinjamkan pensil, jenguk yang sakit. Tidak sesuai: sembunyikan sepatu. Susun: Tat Twam Asi.",
          contoh: "Sesuai, tidak sesuai, Tat Twam Asi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman tanpa bekal: kita... satu kue?",
          alias: ["bagi", "berbagi"],
        },
        {
          pertanyaan: "2. Meminjamkan pensil: sesuai Tat Twam Asi?",
          alias: ["sesuai", "ya"],
        },
        {
          pertanyaan: "3. Menyembunyikan sepatu: sesuai atau tidak?",
          alias: ["tidak"],
        },
        {
          pertanyaan: "4. Menjenguk teman sakit: sesuai?",
          alias: ["sesuai", "ya"],
        },
        {
          pertanyaan: "5. Asi Twam Tat disusun menjadi Tat Twam...?",
          alias: ["asi", "tat twam asi"],
        },
      ],
      voice: [
        [
          "Dua kue: bagi satu kepada teman yang bekalnya tertinggal. Hampiri dengan ramah.",
        ],
        [
          "Pinjamkan pensil sesuai. Sembunyikan sepatu tidak sesuai. Jenguk yang sakit sesuai. Susun: Tat Twam Asi.",
        ],
      ],
    },
  ],
};
