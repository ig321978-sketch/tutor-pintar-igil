import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB5 = "Bab 5: Teman Baru";

export const MODUL_BINDO1_BAB5: ModulResmiPai = {
  id: "bindo-1-bab5",
  judul: JUDUL_BINDO1_BAB5,
  pola: /teman baru/,
  motivasi:
    "Sapaan ramah membuka hati. Perkenalkan diri, ajak bermain, sambut teman baru dengan empati. Bhinneka Tunggal Ika dimulai dari satu kalimat yang lembut.",
  kunciJawaban: "B,B,A,C,B,A,C,B,A,B",
  sketsaKartu: [
    "Mutia murid baru berdiri pemalu di pojok halaman, Ali dan Nia menghampiri.",
    "Kartu suku kata M: mata, minum, mulut, meja, mobil.",
    "Latihan sapaan selamat pagi dan perkenalan tiga kalimat di sekolah serta di rumah.",
    "Siswa memilih sapaan santun dan mengelompokkan kata Ma atau Mi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika berpapasan dengan Ibu Guru di koridor sekolah pada pagi hari, kalimat sapaan yang paling santun diucapkan adalah...
A) "Halo Guru, aku mau pergi ke kelas dulu ya!"
B) "Selamat pagi Ibu Guru, apa kabar hari ini?"
C) "Hai Guru, minggir dulu saya mau lewat."
D) "Guru, aku tidak mau bicara."`,
    `[Soal 2 - PG - Tipe: HOTS]
Mutia murid baru berdiri sendiri dan tampak pemalu. Sikap Ali dan Nia yang paling tepat adalah...
A) Membiarkannya karena belum kenal.
B) Menghampiri, menyapa, dan mengajak bermain bersama.
C) Menertawakan karena dia diam.
D) Menyuruhnya pulang.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata ma-ta diurai menjadi...
A) Ma-ta
B) Mi-ta
C) Mu-ta
D) Me-ta`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata mi-num paling tepat berarti...
A) Benda berkendara di jalan.
B) Tempat menulis di kelas.
C) Memasukkan air ke mulut.
D) Bagian wajah untuk melihat.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata mu-lut, me-ja, dan mo-bil huruf awalnya sama, yaitu...
A) L
B) M
C) B
D) T`,
    `[Soal 6 - PG - Tipe: Reguler]
Dari kelompok meja, minum, madu, mobil, kata yang suku awalnya Mi adalah...
A) Minum
B) Meja
C) Madu
D) Mobil`,
    `[Soal 7 - PG - Tipe: Reguler]
Dari kelompok meja, minum, madu, mobil, kata yang suku awalnya Ma adalah...
A) Minum dan mobil
B) Meja saja
C) Madu
D) Mobil saja`,
    `[Soal 8 - PG - Tipe: HOTS]
Mengajak teman baru bermain masak-masakan menunjukkan nilai...
A) Menang sendiri.
B) Empati dan persahabatan.
C) Takut pada orang baru.
D) Diam saja di pojok.`,
    `[Soal 9 - PG - Tipe: Reguler]
Kata mo-bil diurai menjadi...
A) Mo-bil
B) Ma-bil
C) Mi-bil
D) Mu-bil`,
    `[Soal 10 - PG - Tipe: Reguler]
Memperkenalkan diri kepada teman baru sebaiknya menyebut...
A) Hanya nama sekolah orang lain.
B) Nama sendiri dengan senyum dan ajakan bermain yang ramah.
C) Rahasia rumah teman.
D) Kata-kata kasar supaya ditakuti.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Pojok Halaman",
      pengantar:
        "Pojok halaman sekolah. Ada murid baru bernama Mutia yang berwajah pemalu sedang berdiri sendiri.",
      labelDaftar: "Percakapan Ali, Nia, dan Mutia",
      kolom: 1,
      item: [
        {
          nama: "Mu-ti-a",
          singkat: "Murid baru",
          uraian:
            "Ali melihat anak perempuan di kelas sebelah. Namanya Mutia. Ia belum punya teman bermain.",
          contoh: "Namanya Mu-ti-a.",
        },
        {
          nama: "Ayo hampiri",
          singkat: "Empati",
          uraian:
            "Nia mengajak Ali menghampiri Mutia. Teman baru bisa merasa sedih jika dibiarkan sendiri.",
          contoh: "Jangan biarkan teman baru sendirian.",
        },
        {
          nama: "Ma-sak-masakan",
          singkat: "Ajakan ramah",
          uraian:
            "Ali dan Nia menyapa, memperkenalkan diri, lalu mengajak bermain masak-masakan di bawah pohon. Mutia tersenyum gembira.",
          contoh: "Halo, mari bermain bersama.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa nama murid baru itu?",
          alias: ["mutia", "mu-ti-a"],
        },
        {
          pertanyaan: "2. Mengapa Mutia perlu dihampiri?",
          alias: ["pemalu", "sendiri", "sedih", "teman baru"],
        },
        {
          pertanyaan: "3. Ali dan Nia mengajak Mutia bermain apa?",
          alias: ["masak", "masakan", "masak-masakan"],
        },
      ],
      voice: [
        [
          "Di pojok halaman, Mutia berdiri sendiri. Ali berkata, Nia, lihat anak perempuan di sana itu. Dia murid baru di kelas sebelah. Namanya Mu-ti-a.",
          "Nia menjawab, Ayo kita hampiri dia, Ali. Dia pasti merasa sedih karena belum punya teman bermain di sekolah baru.",
        ],
        [
          "Ali menyapa, Halo Mutia! Aku Ali, dan ini Nia. Mari bermain ma-sak-masakan bersama kami di bawah pohon!",
          "Mutia tersenyum gembira. Wah, terima kasih Ali dan Nia! Aku senang sekali langsung punya teman baik di sini.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata Ma Mi Mu Me Mo",
      pengantar:
        "Latih bunyi /m/ pada kosakata dasar: ma-ta, mi-num, mu-lut, me-ja, mo-bil. Latih berbicara: sapaan ramah, memperkenalkan diri, merespons teman baru secara empati dan santun.",
      labelDaftar: "Suku kata M dan sapaan",
      kolom: 1,
      item: [
        {
          nama: "Ma-ta dan mu-lut",
          singkat: "Bagian wajah",
          uraian: "Ma-ta untuk melihat teman. Mu-lut untuk menyapa dengan kata yang lembut, bukan mengejek.",
          contoh: "Lihat dengan mata, sapa dengan mulut.",
        },
        {
          nama: "Mi-num dan me-ja",
          singkat: "Kegiatan dan benda",
          uraian: "Mi-num air di me-ja. Suku Mi dan Me berbeda. Minum bukan meja.",
          contoh: "Mi-num, me-ja.",
        },
        {
          nama: "Mo-bil dan sapaan",
          singkat: "Kalimat ramah",
          uraian: "Mo-bil kata berawalan Mo. Selain membaca kata, ucapkan: selamat pagi, nama saya..., mari bermain.",
          contoh: "Selamat pagi. Nama saya Ali.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebut satu kata berawalan ma.",
          alias: ["mata", "madu", "masak", "mari"],
        },
        {
          pertanyaan: "2. Kata minum suku awalnya apa?",
          alias: ["mi", "mi-num"],
        },
        {
          pertanyaan: "3. Sapaan santun kepada guru di pagi hari?",
          alias: ["selamat pagi", "ibu guru", "pagi"],
        },
      ],
      voice: [
        [
          "Suku kata M: ma-ta, mi-num, mu-lut, me-ja, mo-bil. Bibir rapat lalu terbuka untuk bunyi /m/.",
        ],
        [
          "Sapa teman baru. Halo, nama saya... Mari bermain bersama. Selamat pagi Ibu Guru, apa kabar hari ini?",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Sapaan Ramah di Sekolah dan di Rumah",
      pengantar:
        "Berbicara dan membaca suku kata M dipraktikkan lewat perkenalan nyata. Anak menyusun tiga kalimat: sapa, nama, ajakan.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Lingkaran teman baru",
          singkat: "Untuk guru",
          uraian:
            "Siswa bergiliran mengucapkan: selamat pagi, nama saya..., mari bermain... Teman lain merespons terima kasih. Tulis kata Ma/Mi di papan dari kalimat yang terucap.",
          contoh: "Selamat pagi. Nama saya Nia.",
        },
        {
          nama: "Sapa tetangga",
          singkat: "Untuk orang tua",
          uraian:
            "Latih anak mengucapkan selamat pagi kepada anggota keluarga atau tetangga. Tanyakan: bagaimana perasaan orang yang baru disapa dengan ramah?",
          contoh: "Selamat pagi, Pak. Selamat pagi, Bu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kalimat sapaan pagi yang santun dimulai dengan kata apa?",
          alias: ["selamat pagi", "pagi", "selamat"],
        },
        {
          pertanyaan: "2. Saat berkenalan, kita menyebut apa milik kita?",
          alias: ["nama", "nama saya"],
        },
        {
          pertanyaan: "3. Setelah menyapa Mutia, Ali mengajaknya apa?",
          alias: ["bermain", "masak", "teman"],
        },
      ],
      voice: [
        [
          "Di sekolah, ucapkan tiga kalimat. Selamat pagi. Nama saya... Mari bermain bersama.",
        ],
        [
          "Di rumah, sapa keluarga dan tetangga. Selamat pagi, Pak. Selamat pagi, Bu. Orang yang disapa ramah biasanya tersenyum.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya memilih sapaan santun dan mengelompokkan kata berawalan Ma atau Mi.",
      labelDaftar: "Etika berbicara dan klasifikasi kata",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Etika berbicara",
          uraian:
            "Sapaan paling santun kepada Ibu Guru: selamat pagi Ibu Guru, apa kabar hari ini? Bukan menyuruh guru minggir.",
          contoh: "Selamat pagi Ibu Guru.",
        },
        {
          nama: "Kelompok B",
          singkat: "Klasifikasi kata",
          uraian:
            "Lingkari kata berawalan Ma atau Mi. Minum suku Mi. Madu suku Ma. Meja suku Me. Mobil suku Mo.",
          contoh: "Minum dan madu yang dilingkari.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sapaan santun kepada Ibu Guru pagi hari?",
          alias: ["selamat pagi", "apa kabar", "ibu guru"],
        },
        {
          pertanyaan: "2. Kata minum suku awalnya Ma atau Mi?",
          alias: ["mi", "minum"],
        },
        {
          pertanyaan: "3. Kata madu suku awalnya Ma atau Mi?",
          alias: ["ma", "madu"],
        },
      ],
      voice: [
        [
          "Kelompok A: ucapkan selamat pagi Ibu Guru, apa kabar hari ini? Itu sapaan paling santun.",
        ],
        [
          "Kelompok B: lingkari kata Ma atau Mi. Minum suku Mi. Madu suku Ma. Meja dan mobil tidak.",
        ],
      ],
    },
  ],
};
