import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB4 = "Bab 4: Aku Bisa!";

export const MODUL_BINDO1_BAB4: ModulResmiPai = {
  id: "bindo-1-bab4",
  judul: JUDUL_BINDO1_BAB4,
  pola: /aku bisa/,
  motivasi:
    "Anak mandiri mau mencoba sendiri sampai bisa. Lo-m-patkan talinya, silangkan, tarik. Baca instruksi pendek, lalu kerjakan.",
  kunciJawaban: "B,C,A,B,C,A,B,C,A,B",
  sketsaKartu: [
    "Ali kesulitan mengikat tali sepatu, Nia mengajar pelan-pelan di dalam kelas.",
    "Kartu suku kata L: lari, lidah, lulut, lele, lompat.",
    "Latihan kancing baju, ikat sepatu, dan merapikan tas di sekolah serta di rumah.",
    "Siswa mengurutkan langkah mandi sampai memakai seragam sebelum berangkat sekolah.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Perhatikan tiga kegiatan acak sebelum berangkat sekolah: (1) Mengeringkan badan menggunakan handuk bersih. (2) Membasahi tubuh dan menggosok badan dengan sabun mandi. (3) Memakai seragam sekolah dan dasi dengan rapi. Urutan kemandirian yang paling tepat adalah...
A) (1) - (2) - (3)
B) (2) - (1) - (3)
C) (3) - (2) - (1)
D) (3) - (1) - (2)`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali tali sepatunya lepas. Sikap mandiri yang tepat adalah...
A) Menunggu Ibu datang tanpa mencoba.
B) Marah dan melempar sepatu.
C) Mencoba mengikat sendiri pelan-pelan sampai berhasil.
D) Meminta teman lain memakai sepatunya.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata la-ri diurai menjadi...
A) La-ri
B) Li-ra
C) Lu-ri
D) Le-ri`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata lo-m-pat artinya...
A) Tidur di tikar.
B) Bergerak ke atas dengan kedua kaki.
C) Mencuci tangan.
D) Membaca dalam hati.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata le-le merujuk pada...
A) Buah di pohon.
B) Alat tulis.
C) Ikan yang hidup di air.
D) Tali sepatu.`,
    `[Soal 6 - PG - Tipe: Reguler]
Sebelum memakai seragam, badan sebaiknya...
A) Sudah mandi dan kering.
B) Masih basah sabun.
C) Berdebu dari halaman.
D) Belum bangun tidur.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kata li-dah adalah bagian tubuh yang ada di...
A) Kaki.
B) Mulut.
C) Telinga.
D) Tas sekolah.`,
    `[Soal 8 - PG - Tipe: Reguler]
Merapikan tas malam hari termasuk sikap...
A) Menyerah.
B) Menunda sampai pagi kesiangan.
C) Mandiri dan siap belajar.
D) Meminta orang lain selalu mengisi tas.`,
    `[Soal 9 - PG - Tipe: HOTS]
Nia mengajar Ali mengikat tali: lompatkan tali, lalu silangkan. Ini mengajarkan bahwa instruksi teks pendek harus...
A) Dibaca dan dilakukan langkah demi langkah.
B) Dihapus dari buku.
C) Dibiarkan tanpa dicoba.
D) Diganti dengan berlari saja.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kata lu-lut diurai menjadi...
A) La-lut
B) Lu-lut
C) Li-lut
D) Le-lut`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Ikat Tali Sepatu",
      pengantar:
        "Di dalam ruang kelas. Ali sedang kesulitan mengikat tali sepatunya yang lepas. Ia hampir menyerah menunggu Ibu.",
      labelDaftar: "Percakapan Ali dan Nia tentang kemandirian",
      kolom: 1,
      item: [
        {
          nama: "Tali sepatu lepas",
          singkat: "Hampir menyerah",
          uraian:
            "Ali berkata tidak bisa mengikat sendiri dan ingin menunggu Ibu. Nia mengajaknya mencoba dulu.",
          contoh: "Jangan menyerah dulu.",
        },
        {
          nama: "Lo-m-patkan talinya",
          singkat: "Langkah demi langkah",
          uraian:
            "Nia mengajar pelan-pelan: lompatkan talinya, lalu silangkan. Instruksi pendek dibaca, lalu dilakukan.",
          contoh: "Lompatkan, silangkan, tarik.",
        },
        {
          nama: "Aku bisa",
          singkat: "Mandiri",
          uraian:
            "Ali mencoba dengan sabar sampai ikatannya berhasil. Anak yang mandiri selalu mau mencoba sendiri sampai bisa.",
          contoh: "Coba sendiri sampai bisa.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Apa yang lepas milik Ali?",
          alias: ["tali", "tali sepatu", "sepatu"],
        },
        {
          pertanyaan: "2. Nia menyuruh Ali melakukan apa pada talinya?",
          alias: ["lompatkan", "silangkan", "ikat"],
        },
        {
          pertanyaan: "3. Anak mandiri selalu mau apa sampai bisa?",
          alias: ["mencoba", "coba sendiri", "berlatih"],
        },
      ],
      voice: [
        [
          "Di kelas, tali sepatu Ali lepas. Ali berkata, Aduh, tali sepatuku lepas lagi. Aku tidak bisa mengikatnya sendiri, Nia. Aku tunggu Ibu datang saja nanti.",
          "Nia menjawab, Jangan menyerah dulu, Ali! Sini aku ajarkan pelan-pelan. Lo-m-patkan talinya, lalu silangkan seperti ini.",
        ],
        [
          "Ali mencoba dengan sabar. Wah, ikatannya berhasil, Nia! Aku bisa melakukannya sendiri sekarang!",
          "Nia bersorak. Hebat, Ali! Anak yang mandiri selalu mau mencoba sendiri sampai bisa!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata La Li Lu Le Lo",
      pengantar:
        "Kembangkan kelancaran pelafalan konsonan /l/ pada kata la-ri, li-dah, lu-lut, le-le, lo-m-pat. Melalui membaca terbimbing, siswa mengenali instruksi teks pendek untuk kegiatan mandiri: memakai seragam, mengancing baju, merapikan tas.",
      labelDaftar: "Suku kata L dan kemandirian",
      kolom: 1,
      item: [
        {
          nama: "La-ri dan lo-m-pat",
          singkat: "Gerak tubuh",
          uraian: "La-ri dan lo-m-pat adalah gerakan. Ucapkan /l/ dengan ujung lidah menyentuh langit-langit depan.",
          contoh: "La-ri, lo-m-pat.",
        },
        {
          nama: "Li-dah dan lu-lut",
          singkat: "Bagian tubuh",
          uraian: "Li-dah di mulut. Lu-lut di kaki. Kenali nama tubuh supaya instruksi 'angkat lutut' atau 'gigit lidah' dipahami.",
          contoh: "Li-dah, lu-lut.",
        },
        {
          nama: "Le-le dan instruksi mandiri",
          singkat: "Baca lalu kerjakan",
          uraian: "Le-le ikan air tawar. Setelah membaca kata, baca juga perintah: kancingkan baju, rapikan tas, ikat sepatu.",
          contoh: "Baca perintah, kerjakan sendiri.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebut satu kata berawalan la.",
          alias: ["lari", "la-ri", "laut", "lampu"],
        },
        {
          pertanyaan: "2. Lo-m-pat artinya gerak apa?",
          alias: ["lompat", "loncat", "ke atas"],
        },
        {
          pertanyaan: "3. Anak mandiri merapikan apa sebelum tidur?",
          alias: ["tas", "baju", "seragam"],
        },
      ],
      voice: [
        [
          "Suku kata L: la-ri, li-dah, lu-lut, le-le, lo-m-pat. Lidah menyentuh langit-langit depan saat mengucapkan /l/.",
        ],
        [
          "Baca instruksi pendek lalu kerjakan. Pakai seragam. Kancingkan baju. Rapikan tas. Ikat sepatu. Aku bisa!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Latihan Mandiri di Sekolah dan di Rumah",
      pengantar:
        "Menulis dan membaca suku kata L dipraktikkan lewat kegiatan merawat diri. Guru dan orang tua memberi instruksi pendek, anak mengerjakannya sendiri.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Stasiun aku bisa",
          singkat: "Untuk guru",
          uraian:
            "Siapkan tiga stasiun: kancingkan baju, ikat tali sepatu, susun buku ke tas. Setiap stasiun punya kartu instruksi bersuku kata L dan kata lain yang sudah dikenal.",
          contoh: "Baca kartu, kerjakan sendiri.",
        },
        {
          nama: "Tas rapi malam hari",
          singkat: "Untuk orang tua",
          uraian:
            "Minta anak merapikan tas dan meletakkan sepatu sendiri. Puji usaha, bukan hanya hasil. Tanyakan: langkah apa dulu sebelum memakai seragam?",
          contoh: "Mandi, keringkan, lalu pakai seragam.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Stasiun mandiri bisa berisi kegiatan ikat apa?",
          alias: ["tali", "sepatu", "tali sepatu"],
        },
        {
          pertanyaan: "2. Sebelum tidur, tas sebaiknya apa?",
          alias: ["rapi", "dirapikan", "siap"],
        },
        {
          pertanyaan: "3. Memakai seragam dilakukan setelah badan apa?",
          alias: ["kering", "mandi", "bersih"],
        },
      ],
      voice: [
        [
          "Di sekolah ada stasiun aku bisa. Kancingkan baju. Ikat tali sepatu. Susun buku ke tas. Baca kartunya, kerjakan sendiri.",
        ],
        [
          "Di rumah, rapikan tas malam hari. Letakkan sepatu sendiri. Mandi, keringkan badan, baru pakai seragam. Aku bisa!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya mengurutkan langkah logis sebelum berangkat sekolah supaya tubuh bersih dan siap belajar.",
      labelDaftar: "Urutan kemandirian",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Mengurutkan langkah logis",
          uraian:
            "Urutan tepat: (2) membasahi tubuh dan menggosok sabun, (1) mengeringkan badan dengan handuk, (3) memakai seragam dan dasi rapi.",
          contoh: "Mandi dulu, keringkan, baru berpakaian.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Urutan tepat sebelum sekolah: mandi, keringkan, lalu apa?",
          alias: ["seragam", "pakaian", "dasi", "memakai"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi. Urutkan langkah. Basahi tubuh dan gosok sabun. Keringkan badan dengan handuk. Baru memakai seragam dan dasi. Badan bersih, siap belajar.",
        ],
      ],
    },
  ],
};
