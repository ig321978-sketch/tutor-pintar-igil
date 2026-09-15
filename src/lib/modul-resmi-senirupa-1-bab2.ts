import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_SENIRUPA1_BAB2 = "Bab 2: Cap Rumah Alam";

export const MODUL_SENIRUPA1_BAB2: ModulResmiPai = {
  id: "senirupa-1-bab2",
  judul: JUDUL_SENIRUPA1_BAB2,
  pola: /cap rumah alam|tekstur|cetak alami|mencetak sederhana/,
  motivasi:
    "Raba dulu: kasar atau halus, itu tekstur. Daun, pelepah, dan belimbing bisa jadi cap. Tulang yang menonjol menempel indah di kertas.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Ali meraba jeruk geronjal, Nia meraba daun kering bergaris menonjol.",
    "Konsep tekstur dan cetak tinggi dari daun, pelepah, belimbing.",
    "Anak membuat cap alam di sekolah serta di rumah.",
    "Siswa memilih kulit batang paling kasar dan mencocokkan hasil cetak.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Manakah di antara benda alam berikut yang memiliki tekstur paling kasar dan terasa menonjol tajam saat diraba oleh telapak tangan kita?
A) Kulit buah apel merah yang matang.
B) Kulit batang pohon mangga tua di halaman sekolah.
C) Permukaan daun bunga mawar yang basah.
D) Permukaan kaca jendela yang licin.`,
    `[Soal 2 - PG - Tipe: HOTS]
Nia ingin tulang daun menempel di kertas. Langkah yang paling tepat adalah...
A) Memberi cat pada bagian belakang daun yang menonjol, lalu menempelkannya ke kertas sebagai cap.
B) Membuang daun karena daun tidak boleh disentuh cat.
C) Menggambar tulang daun hanya dengan mata tertutup.
D) Mencuci kertas sampai sobek.`,
    `[Soal 3 - PG - Tipe: HOTS]
Potongan buah belimbing yang dijadikan cap biasanya menghasilkan bentuk...
A) Gelombang ombak.
B) Tiang bendera.
C) Bintang.
D) Mobil-mobilan.`,
    `[Soal 4 - PG - Tipe: Reguler]
Tekstur adalah...
A) Nama warna primer.
B) Rasa permukaan benda saat diraba: kasar, halus, licin, tajam, atau berbulu.
C) Lagu yang dinyanyikan bersama.
D) Garis yang selalu lurus.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kulit jeruk terasa...
A) Geronjal-geronjal kasar.
B) Sama seperti kaca licin.
C) Seperti air mengalir.
D) Tanpa permukaan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Teknik cetak tinggi sederhana memakai benda yang...
A) Licin rata tanpa tonjolan.
B) Punya tekstur menonjol untuk dijadikan stempel di kertas.
C) Hanya berupa udara.
D) Tidak boleh kena pewarna.`,
    `[Soal 7 - PG - Tipe: Reguler]
Bagian belakang daun menghasilkan cetakan...
A) Bintang belimbing.
B) Rongga kotak pelepah.
C) Bentuk tulang daun.
D) Gambar gunung dua dimensi saja.`,
    `[Soal 8 - PG - Tipe: Reguler]
Potongan pelepah pisang berbentuk...
A) Berongga, seperti rongga kotak kecil-kecil.
B) Bintang lima.
C) Hanya garis lurus buku.
D) Kulit jeruk.`,
    `[Soal 9 - PG - Tipe: HOTS]
Daun kering Nia terasa agak halus, tetapi ada garis menonjol di belakangnya. Itu menunjukkan...
A) Satu benda bisa punya bagian halus dan bagian bertekstur timbul.
B) Daun tidak punya tekstur.
C) Tekstur hanya ada pada batu.
D) Jeruk tidak boleh diraba.`,
    `[Soal 10 - PG - Tipe: Reguler]
Bahan alami untuk cap bisa berupa...
A) Daun, pelepah pisang, dan belimbing.
B) Hanya spidol pabrik.
C) Hanya layar komputer.
D) Hanya air minum.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Raba Jeruk dan Daun di Bawah Pohon",
      pengantar:
        "Di bawah pohon rindang sekolah. Nia memegang daun kering. Ali memegang buah jeruk.",
      labelDaftar: "Percakapan Ali dan Nia tentang tekstur",
      kolom: 1,
      item: [
        {
          nama: "Kulit jeruk geronjal",
          singkat: "Kasar di tangan",
          uraian:
            "Ali: Nia, coba raba kulit jeruk ini. Rasanya geronjal-geronjal kasar di tanganku.",
          contoh: "Jeruk: kasar, geronjal.",
        },
        {
          nama: "Daun ada tulang menonjol",
          singkat: "Halus sekaligus timbul",
          uraian:
            "Nia: Kalau daun kering yang aku pegang ini rasanya agak halus, tapi ada garis-garis menonjol di belakangnya.",
          contoh: "Belakang daun: tulang timbul.",
        },
        {
          nama: "Namanya tekstur",
          singkat: "Lalu kita cap",
          uraian:
            "Rasa permukaan saat diraba disebut tekstur. Bagian belakang daun yang menonjol bisa diberi cat, lalu ditempel ke kertas. Tulang daun menempel indah.",
          contoh: "Raba dulu. Cap kemudian.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Rasa permukaan benda saat diraba namanya apa?",
          alias: ["tekstur"],
        },
        {
          pertanyaan: "2. Kulit jeruk terasa bagaimana?",
          alias: ["kasar", "geronjal"],
        },
        {
          pertanyaan: "3. Bagian daun yang menonjol bisa dijadikan apa di kertas?",
          alias: ["cap", "cetak", "stempel"],
        },
      ],
      voice: [
        [
          "Di bawah pohon, Ali meraba kulit jeruk. Rasanya geronjal-geronjal kasar.",
          "Nia meraba daun kering. Daunnya agak halus, tetapi di belakang ada garis menonjol.",
        ],
        [
          "Rasa permukaan saat diraba namanya tekstur. Tulang daun yang menonjol bisa diberi cat, lalu dicapkan ke kertas.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Tekstur dan Cetak Alam",
      pengantar:
        "Tekstur adalah nilai raba. Cetak tinggi sederhana memakai benda alam yang menonjol sebagai stempel.",
      labelDaftar: "Kasar-halus, daun, pelepah, belimbing",
      kolom: 1,
      item: [
        {
          nama: "Konsep tekstur",
          singkat: "Nilai raba",
          uraian:
            "Tekstur memberitahu apakah permukaan kasar, halus, licin, tajam, atau berbulu. Kulit batang mangga tua terasa lebih kasar daripada apel matang atau daun basah.",
          contoh: "Raba, bandingkan, sebut rasanya.",
        },
        {
          nama: "Cetak tinggi sederhana",
          singkat: "Stempel alam",
          uraian:
            "Benda yang menonjol diberi pewarna atau cat air, lalu dicapkan ke kertas. Tonjolan yang tinggi meninggalkan jejak paling jelas.",
          contoh: "Cat pada tonjolan. Tekan ke kertas.",
        },
        {
          nama: "Tiga bahan alami",
          singkat: "Bentuk jejak berbeda",
          uraian:
            "Belakang daun: tulang daun. Pelepah pisang: rongga kotak kecil-kecil. Belimbing: bentuk bintang.",
          contoh: "Daun, pelepah, belimbing.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kulit batang mangga tua terasa lebih... dari apel?",
          alias: ["kasar", "tajam", "menonjol"],
        },
        {
          pertanyaan: "2. Belimbing jika dicap menyerupai bentuk apa?",
          alias: ["bintang"],
        },
        {
          pertanyaan: "3. Belakang daun menghasilkan jejak apa?",
          alias: ["tulang", "daun", "tulang daun"],
        },
      ],
      voice: [
        [
          "Tekstur adalah rasa permukaan saat diraba. Ada yang kasar, halus, licin, tajam, atau berbulu.",
        ],
        [
          "Untuk cap alam, beri cat pada bagian yang menonjol. Daun jadi tulang daun. Pelepah jadi rongga. Belimbing jadi bintang.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Cap Aman di Sekolah dan di Rumah",
      pengantar:
        "Eksplorasi tekstur dimulai dari meraba, lalu mencap dengan dampingan orang dewasa. Jaga kebersihan cat.",
      labelDaftar: "Latihan meraba dan mencetak",
      kolom: 2,
      item: [
        {
          nama: "Meja cap",
          singkat: "Untuk guru",
          uraian:
            "Sediakan daun, potongan pelepah, dan belimbing. Siswa meraba dulu, lalu mencap. Diskusikan: mana yang paling kasar? Jejak siapa yang seperti bintang?",
          contoh: "Raba. Cat pelan. Cap sekali.",
        },
        {
          nama: "Dapur atau halaman",
          singkat: "Untuk orang tua",
          uraian:
            "Pilih daun bersih dan buah yang aman. Dampingi saat memakai cat. Bandingkan raba jeruk dan apel. Jangan memetik tanaman tanpa izin.",
          contoh: "Raba jeruk. Cap daun. Cuci tangan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pelepah pisang menghasilkan jejak seperti apa?",
          alias: ["rongga", "kotak", "berongga"],
        },
        {
          pertanyaan: "2. Sebelum mencap, kita sebaiknya apa dulu pada benda?",
          alias: ["raba", "pegang", "tekstur"],
        },
        {
          pertanyaan: "3. Cat diletakkan pada bagian yang...?",
          alias: ["menonjol", "timbul", "tinggi"],
        },
      ],
      voice: [
        [
          "Di sekolah, raba daun, pelepah, dan belimbing. Lalu cap ke kertas. Mana yang paling kasar? Mana yang seperti bintang?",
        ],
        [
          "Di rumah, raba jeruk dan apel bersama orang tua. Cap daun dengan cat pelan. Cuci tangan sesudahnya.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih benda paling kasar saat diraba, lalu cocokkan bahan alam dengan hasil cetakannya.",
      labelDaftar: "Tekstur kasar dan mencocokkan jejak cap",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Mengurai tekstur",
          uraian:
            "Kulit batang mangga tua paling kasar dan menonjol tajam. Apel matang lebih licin. Daun mawar basah terasa lebih halus.",
          contoh: "Batang tua: paling kasar.",
        },
        {
          nama: "Kelompok B",
          singkat: "Mencocokkan cap",
          uraian:
            "Pelepah pisang: rongga kotak kecil-kecil. Belimbing: bintang. Belakang daun: tulang daun.",
          contoh: "Pelepah, belimbing, daun.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mana yang paling kasar: apel, batang mangga tua, atau daun basah?",
          alias: ["batang", "mangga", "kasar"],
        },
        {
          pertanyaan: "2. Pelepah pisang jejaknya seperti apa?",
          alias: ["rongga", "kotak"],
        },
        {
          pertanyaan: "3. Belimbing jejaknya seperti apa?",
          alias: ["bintang"],
        },
        {
          pertanyaan: "4. Belakang daun jejaknya seperti apa?",
          alias: ["tulang", "daun"],
        },
      ],
      voice: [
        [
          "Kulit batang pohon mangga tua paling kasar dan menonjol tajam. Apel matang dan daun basah lebih halus.",
        ],
        [
          "Pelepah pisang jadi rongga kotak kecil. Belimbing jadi bintang. Belakang daun jadi tulang daun.",
        ],
      ],
    },
  ],
};
