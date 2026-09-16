import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BUDDHA1_BAB3 = "Bab 3: Indahnya Hidup Sadar dan Tenang";

export const MODUL_BUDDHA1_BAB3: ModulResmiPai = {
  id: "buddha-1-bab3",
  judul: JUDUL_BUDDHA1_BAB3,
  pola: /hidup sadar|meditasi|sati|sila dan metta|anapanasati/,
  motivasi:
    "Duduk diam, sadari napas masuk dan keluar. Itu Bhavana dan Sati. Pikiran tidak melompat seperti monyet. Tenang: fokus belajar, tidak mudah marah.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Siswa duduk bersila di ruang puja, mata terpejam lembut.",
    "Anak menyadari napas masuk dan napas keluar.",
    "Ali menarik napas saat pensil patah, lalu minta rautan sopan.",
    "Anak tidak berteriak atau melempar pensil.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat sedang mengerjakan soal latihan di kelas, tiba-tiba pensil Ali patah. Ali mulai merasa kesal dan ingin marah. Tindakan melatih kesadaran yang paling tepat dilakukan Ali adalah...
A) Berteriak keras agar seluruh kelas tahu kalau pensilnya patah.
B) Menarik napas dalam-dalam dengan sadar untuk menenangkan pikiran, lalu meminjam rautan pensil dengan bahasa yang sopan kepada teman.
C) Melempar pensil tersebut ke lantai sampai hancur.
D) Menyalahkan teman di sebelahnya.`,
    `[Soal 2 - PG - Tipe: Reguler]
Latihan duduk diam memperhatikan napas disebut...
A) Meditasi atau Bhavana, melatih kesadaran Sati.
B) Lari di halaman.
C) Tidur di bangku.
D) Berteriak di kelas.`,
    `[Soal 3 - PG - Tipe: Reguler]
Anapanasati dasar untuk kelas 1 dilakukan...
A) Satu jam tanpa bergerak.
B) Dengan menahan napas kuat-kuat.
C) 1 sampai 3 menit, menyadari napas alami tanpa paksaan.
D) Sambil berlari.`,
    `[Soal 4 - PG - Tipe: Reguler]
Nia menjelaskan: kita sadari napas...
A) Hanya napas masuk.
B) Napas masuk dan napas keluar.
C) Hanya saat marah.
D) Hanya di rumah.`,
    `[Soal 5 - PG - Tipe: HOTS]
Mengapa ketenangan dilatih setiap hari?
A) Supaya pikiran tidak melompat-lompat seperti monyet, kita bisa mendengar guru dan tidak mudah marah.
B) Supaya tidak perlu belajar.
C) Supaya boleh berteriak setelahnya.
D) Supaya pensil tidak patah.`,
    `[Soal 6 - PG - Tipe: Reguler]
Manfaat Samadhi atau konsentrasi sejak dini adalah...
A) Mudah marah.
B) Kontrol emosi lebih baik, fokus belajar, keputusan lebih jernih, menumbuhkan Panna.
C) Pikiran semakin melompat.
D) Tidak perlu sopan.`,
    `[Soal 7 - PG - Tipe: Reguler]
Sati artinya...
A) Marah.
B) Berlari.
C) Kesadaran atau perhatian penuh.
D) Melempar pensil.`,
    `[Soal 8 - PG - Tipe: HOTS]
Kepala Ali pusing karena berlarian, lalu duduk diam beberapa menit. Hasilnya...
A) Terasa segar dan tenang.
B) Semakin pusing.
C) Ia berteriak.
D) Ia melempar tas.`,
    `[Soal 9 - PG - Tipe: Reguler]
Panna yang tumbuh dari pikiran jernih adalah...
A) Kekesalan.
B) Kebijaksanaan.
C) Dendam.
D) Keriuhan.`,
    `[Soal 10 - PG - Tipe: Reguler]
Jika ada teman yang menjahili, anak yang terbiasa Sati...
A) Tidak mudah marah; menarik napas dulu.
B) Langsung membalas teriakan.
C) Melempar barang.
D) Meninggalkan pelajaran selamanya.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Duduk Diam di Ruang Puja",
      pengantar:
        "Di ruang puja bakti sekolah. Siswa duduk bersila, mata terpejam lembut, sebelum pelajaran dimulai.",
      labelDaftar: "Percakapan Ali dan Nia tentang Sati",
      kolom: 1,
      item: [
        {
          nama: "Napas membuat segar",
          singkat: "Setelah berlari",
          uraian:
            "Ali merasakan kepalanya yang pusing karena berlarian menjadi segar dan tenang setelah duduk diam memperhatikan napas beberapa menit.",
          contoh: "Duduk. Sadari napas. Tenang.",
        },
        {
          nama: "Bhavana dan Sati",
          singkat: "Latihan kesadaran",
          uraian:
            "Nia menjelaskan: itu meditasi atau Bhavana, melatih kesadaran Sati. Kita menyadari napas masuk dan napas keluar.",
          contoh: "Masuk. Keluar. Sadar.",
        },
        {
          nama: "Bukan monyet",
          singkat: "Pikiran yang lompat",
          uraian:
            "Ketenangan dilatih setiap hari supaya pikiran tidak melompat seperti monyet. Pikiran tenang: kita mendengar Ibu Guru dan tidak mudah marah jika dijahili.",
          contoh: "Tenang. Dengar. Jangan marah cepat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum belajar, siswa memperhatikan... selama beberapa menit?",
          alias: ["napas", "nafas"],
        },
        {
          pertanyaan: "2. Latihan kesadaran disebut... atau Bhavana?",
          alias: ["meditasi", "sati"],
        },
        {
          pertanyaan: "3. Pikiran yang tidak dilatih bisa melompat seperti...?",
          alias: ["monyet"],
        },
      ],
      voice: [
        [
          "Di ruang puja kita duduk bersila. Napas diperhatikan sebentar. Kepala yang pusing jadi segar.",
        ],
        [
          "Itu meditasi, Bhavana, latihan Sati. Pikiran jangan seperti monyet. Tenang, kita bisa mendengar guru.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Anapanasati dan Samadhi",
      pengantar:
        "Anak usia 7 tahun menyadari hembusan napas alami 1–3 menit. Konsentrasi menumbuhkan kendali emosi, fokus, dan kebijaksanaan.",
      labelDaftar: "Meditasi napas dan manfaatnya",
      kolom: 1,
      item: [
        {
          nama: "Anapanasati dasar",
          singkat: "1 sampai 3 menit",
          uraian:
            "Metode pelatihan mental: sadari hembusan napas secara alami tanpa paksaan. Jangan menahan napas. Untuk kelas 1 cukup satu sampai tiga menit.",
          contoh: "Napas alami. Jangan dipaksa. Singkat saja.",
        },
        {
          nama: "Samadhi",
          singkat: "Konsentrasi",
          uraian:
            "Anak yang terbiasa tenang punya kontrol emosi lebih baik dan fokus belajar lebih tinggi. Pensil patah: napas sadar dulu, baru pinjam rautan dengan sopan.",
          contoh: "Kesal? Napas dulu. Lalu bicara sopan.",
        },
        {
          nama: "Panna",
          singkat: "Kebijaksanaan",
          uraian:
            "Pikiran jernih membantu mengambil keputusan dengan bijak. Mindfulness sejak dini menumbuhkan Panna: tidak berteriak, tidak melempar, tidak menyalahkan.",
          contoh: "Jernih. Bijak. Jangan melempar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Meditasi kelas 1 cukup berapa menit: satu sampai...?",
          alias: ["tiga", "3"],
        },
        {
          pertanyaan: "2. Pensil patah: Ali menarik... lalu pinjam rautan sopan?",
          alias: ["napas", "nafas"],
        },
        {
          pertanyaan: "3. Pikiran jernih menumbuhkan... atau kebijaksanaan?",
          alias: ["panna", "bijak", "kebijaksanaan"],
        },
      ],
      voice: [
        [
          "Anapanasati: sadari napas masuk dan keluar secara alami, satu sampai tiga menit, tanpa paksaan.",
        ],
        [
          "Pensil patah, jangan berteriak atau melempar. Tarik napas, pinjam rautan dengan sopan. Itu Sati.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Napas di Sekolah dan di Rumah",
      pengantar:
        "Sati dilatih duduk singkat di ruang puja dan napas sadar saat kesal di meja. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan Bhavana usia dini",
      kolom: 2,
      item: [
        {
          nama: "Tiga menit puja",
          singkat: "Untuk guru",
          uraian:
            "Mulai pelajaran dengan duduk bersila 1–3 menit. Ajak anak merasakan perut atau hidung saat bernapas. Setelahnya, tanya: pikiran masih seperti monyet atau sudah tenang?",
          contoh: "Duduk. Napas. Tanya rasa.",
        },
        {
          nama: "Napas sebelum marah",
          singkat: "Untuk orang tua",
          uraian:
            "Jika anak kesal karena mainan rusak atau pekerjaan rumah sulit, duduk sebentar bersama. Hitung tiga napas. Baru bicara. Jangan memaksa lama.",
          contoh: "Tiga napas. Baru bicara.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum marah, kita menarik... dengan sadar?",
          alias: ["napas", "nafas"],
        },
        {
          pertanyaan: "2. Meditasi kelas 1 jangan dipaksa terlalu...?",
          alias: ["lama", "panjang"],
        },
        {
          pertanyaan: "3. Pikiran tenang membantu kita... penjelasan guru?",
          alias: ["dengar", "mendengar", "fokus"],
        },
      ],
      voice: [
        [
          "Di sekolah, duduk satu sampai tiga menit sebelum belajar. Sadari napas. Jangan dipaksa.",
        ],
        [
          "Di rumah, sebelum marah, hitung tiga napas bersama orang tua. Baru berbicara.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan Sati saat pensil Ali patah dan ia ingin marah.",
      labelDaftar: "Pilihan ganda manajemen pikiran",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pensil patah",
          uraian:
            "Tindakan tepat: tarik napas dalam-dalam dengan sadar, lalu pinjam rautan dengan bahasa sopan. Bukan berteriak, bukan melempar pensil sampai hancur.",
          contoh: "Napas. Sopan. Jangan lempar.",
        },
        {
          nama: "Ingat Sati",
          singkat: "Pikiran bukan monyet",
          uraian:
            "Kesadaran membuat kepala segar dan emosi terkendali. Itu Bhavana singkat yang menumbuhkan Samadhi dan Panna.",
          contoh: "Sadar. Tenang. Bijak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pensil patah dan ingin marah: Ali menarik napas lalu pinjam... sopan?",
          alias: ["rautan", "napas", "nafas"],
        },
      ],
      voice: [
        [
          "Pensil Ali patah. Ia menarik napas sadar, lalu meminjam rautan dengan sopan. Bukan teriak, bukan lempar.",
        ],
        [
          "Itulah hidup sadar dan tenang. Sati menjaga pikiran agar tidak melompat seperti monyet.",
        ],
      ],
    },
  ],
};
