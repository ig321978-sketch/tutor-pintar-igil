import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB4 = "Bab 4: Mengenal Bentuk Ruang";
export const JUDUL_MTK1_BAB4_LAMA = "Bab 4: Mengenal Bentuk";

export const MODUL_MTK1_BAB4: ModulResmiPai = {
  id: "mtk-1-bab4",
  judul: JUDUL_MTK1_BAB4,
  pola: /mengenal\s+bentuk(\s+ruang)?/,
  motivasi:
    "Hore! Benda di sekitarmu punya bentuk ruang. Ada yang menggelinding, ada yang punya sudut. Yuk jadi detektif bentuk!",
  kunciJawaban: "C,A,D,B,A,C,B,A,D,C",
  sketsaKartu: [
    "Nia membawa celengan ayam dan Ali membawa kotak pensil di kelas seni.",
    "Empat bentuk ruang: kubus dadu, balok kotak, bola kelereng, dan tabung kaleng.",
    "Anak meraba benda di dalam kardus misteri di kelas.",
    "Anak mengisi lembar evaluasi: mewarnai benda, memilih bentuk, dan mencocokkan dadu jeruk kamus.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Celengan koin atau celengan ayam Nia paling mirip bentuk ruang...
A) Kubus
B) Balok
C) Tabung
D) Bola`,
    `[Soal 2 - PG - Tipe: Reguler]
Kotak pensil Ali yang panjang dan punya sudut tajam berbentuk...
A) Balok
B) Bola
C) Tabung
D) Kubus`,
    `[Soal 3 - PG - Tipe: Reguler]
Benda yang bulat total dan bisa menggelinding bebas berbentuk...
A) Kubus
B) Balok
C) Tabung
D) Bola`,
    `[Soal 4 - PG - Tipe: Reguler]
Kubus punya sisi kotak yang sama besar sebanyak...
A) 4
B) 6
C) 8
D) 2`,
    `[Soal 5 - PG - Tipe: Reguler]
Contoh benda berbentuk kubus adalah...
A) Dadu mainan
B) Kelereng
C) Kaleng susu
D) Kotak pensil`,
    `[Soal 6 - PG - Tipe: Reguler]
Contoh benda berbentuk tabung adalah...
A) Dadu
B) Bola sepak
C) Kaleng susu
D) Kamus tebal`,
    `[Soal 7 - PG - Tipe: Reguler]
Mengapa bola mudah menggelinding, sedangkan kubus tidak?
A) Karena kubus lebih ringan
B) Karena permukaan bola melengkung halus tanpa sudut pojok
C) Karena bola punya 6 kotak
D) Karena kubus berbentuk panjang`,
    `[Soal 8 - PG - Tipe: Reguler]
Lemari pakaian dan kotak tisu panjang berbentuk...
A) Balok
B) Bola
C) Kubus
D) Tabung`,
    `[Soal 9 - PG - Tipe: HOTS]
Jeruk dan melon paling mirip bentuk ruang...
A) Kubus
B) Balok
C) Tabung
D) Bola`,
    `[Soal 10 - PG - Tipe: HOTS]
Kaleng soda di dalam kardus misteri berbentuk...
A) Kubus
B) Bola
C) Tabung
D) Balok`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Ruang Kelas Seni",
      pengantar:
        "Di dalam ruang kelas 1 SD saat jam pelajaran seni, Nia membawa celengan ayam dan Ali membawa kotak pensil baru. Mereka mulai membandingkan bentuk benda di kelas.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Celengan ayam dan kotak pensil",
          singkat: "Tabung dan balok",
          uraian:
            "Celengan ayam Nia gendut seperti botol minum. Kotak pensil Ali panjang dan punya sudut yang agak tajam di pojoknya. Keduanya benda ruang, tetapi bentuknya berbeda.",
          contoh: "Celengan mirip tabung. Kotak pensil mirip balok.",
        },
        {
          nama: "Bentuk ruang di sekitar kita",
          singkat: "Ada yang menggelinding",
          uraian:
            "Ibu Guru bilang benda di sekitar kita punya bentuk ruang yang berbeda-beda. Ada yang bisa menggelinding, ada juga yang tidak. Yuk cari tahu namanya!",
          contoh: "Bola menggelinding. Kubus tidak menggelinding.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Celengan ayam Nia paling mirip bentuk apa?",
          alias: ["tabung", "botol", "celengan", "gendut"],
        },
        {
          pertanyaan: "2. Kotak pensil Ali berbentuk apa?",
          alias: ["balok", "panjang", "kotak pensil"],
        },
        {
          pertanyaan: "3. Benda yang bisa menggelinding disebut apa?",
          alias: ["bola", "menggelinding", "bulat"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita masuk ke ruang kelas saat jam pelajaran seni. Nia membawa celengan ayam dari rumah.",
          "Nia berkata, Ali, coba lihat celengan ayam yang aku bawa dari rumah ini. Lucu ya! Bentuknya gendut seperti botol minum.",
          "Ali menjawab, wah iya, Nia! Kalau kotak pensil baru milikku ini bentuknya panjang dan punya sudut-sudut yang agak tajam di pojoknya.",
        ],
        [
          "Nia berkata, eh, Ibu Guru kemarin bilang kalau benda-benda di sekitar kita itu punya bentuk ruang yang berbeda-beda, lho. Ada yang bisa menggelinding, ada juga yang tidak.",
          "Ali berkata, benar! Yuk, kita cari tahu nama-nama bentuk ruang untuk mainan dan benda-benda yang ada di dalam kelas kita!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Detektif Bentuk Ruang",
      pengantar:
        "Empat bentuk ruang utama: kubus, balok, bola, dan tabung. Tiap bentuk punya ciri khas dan contoh benda di sekitar kita.",
      labelDaftar: "Empat Bentuk Ruang",
      kolom: 1,
      item: [
        {
          nama: "Kubus dan balok",
          singkat: "Punya sudut pojok",
          uraian:
            "Kubus punya 6 kotak yang sama besar, contohnya dadu mainan dan kado kotak. Balok bentuknya panjang seperti lemari, contohnya kotak pensil dan penghapus papan.",
          contoh: "Dadu = kubus. Kotak pensil = balok.",
        },
        {
          nama: "Bola dan tabung",
          singkat: "Ada yang menggelinding",
          uraian:
            "Bola bulat total dan bisa menggelinding bebas, contohnya kelereng, melon, atau jeruk. Tabung punya tutup dan alas yang berbentuk bulat, contohnya celengan koin dan kaleng susu.",
          contoh: "Kelereng = bola. Kaleng susu = tabung.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kubus punya berapa sisi kotak yang sama besar?",
          alias: ["enam", "6", "enam kotak", "enam sisi"],
        },
        {
          pertanyaan: "2. Sebutkan satu contoh benda berbentuk bola!",
          alias: ["kelereng", "melon", "jeruk", "bola"],
        },
        {
          pertanyaan: "3. Mengapa bola mudah menggelinding?",
          alias: [
            "melengkung",
            "halus",
            "tanpa sudut",
            "tidak punya pojok",
            "bulat",
          ],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di detektif bentuk ruang. Kubus punya enam kotak yang sama besar, seperti dadu mainan atau kado kotak.",
          "Balok bentuknya panjang seperti lemari. Contohnya kotak pensil dan penghapus papan.",
        ],
        [
          "Bola bulat total dan bisa menggelinding bebas. Contohnya kelereng, melon, atau jeruk.",
          "Tabung punya tutup dan alas yang berbentuk bulat. Contohnya celengan koin dan kaleng susu. Bola mudah menggelinding karena permukaannya melengkung halus tanpa sudut pojok.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bentuk Ruang di Sekolah dan di Rumah",
      pengantar:
        "Bentuk ruang makin kuat kalau diraba dan dicari. Di sekolah kita bermain Raba dan Tebak di Dalam Kardus Misteri. Di rumah kita berburu bentuk ruang.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Raba dan Tebak di Dalam Kardus Misteri",
          singkat: "Untuk guru",
          uraian:
            "Masukkan dadu besar, kotak susu, bola tenis, dan kaleng soda ke dalam kardus yang dilubangi sebesar tangan. Siswa meraba tanpa melihat, lalu menebak bentuk ruangnya.",
          contoh: "Benda ini bulat dan licin, pasti ini bola!",
        },
        {
          nama: "Berburu Bentuk Ruang di Rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak berkeliling kamar, ruang tamu, dan dapur. Tantang anak mencari 2 benda tabung di dapur atau 1 benda balok di ruang tamu, lalu jelaskan cirinya.",
          contoh: "Kaleng celengan = tabung. Kotak tisu = balok.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nama kegiatan meraba benda di sekolah apa?",
          alias: [
            "raba dan tebak",
            "kardus misteri",
            "raba dan tebak di dalam kardus misteri",
          ],
        },
        {
          pertanyaan: "2. Kaleng soda di kardus misteri berbentuk apa?",
          alias: ["tabung", "kaleng"],
        },
        {
          pertanyaan: "3. Nama kegiatan mencari benda di rumah apa?",
          alias: [
            "berburu bentuk ruang",
            "berburu bentuk ruang di rumah",
            "berburu",
          ],
        },
      ],
      voice: [
        [
          "Di sekolah, kita bermain Raba dan Tebak di Dalam Kardus Misteri. Guru memasukkan dadu besar, kotak susu, bola tenis, dan kaleng soda ke dalam kardus.",
          "Siswa memasukkan tangan, meraba satu benda, lalu menebak. Benda ini bulat dan licin, pasti ini bola!",
        ],
        [
          "Di rumah, bermain Berburu Bentuk Ruang. Kelilingi kamar, ruang tamu, dan dapur.",
          "Coba temukan dua benda di dapur yang bentuknya seperti tabung, atau cari benda berbentuk balok di ruang tamu. Lalu jelaskan cirinya.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan mengenal bentuk ruang. Warnai benda sesuai aturan, pilih jawaban yang benar, lalu cocokkan benda dengan namanya.",
      labelDaftar: "Tiga Kelompok Soal",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Mewarnai berdasarkan bentuk",
          uraian:
            "Warnai kubus merah, balok biru, bola hijau, dan tabung kuning.",
          contoh: "Dadu merah. Kotak paket biru. Bola sepak hijau. Kaleng kuning.",
        },
        {
          nama: "Kelompok B",
          singkat: "Pilihan ganda",
          uraian:
            "Pilih satu jawaban yang paling benar: tabung, bola yang menggelinding, dan bentuk lemari.",
          contoh: "Kaleng susu = tabung. Lemari = balok.",
        },
        {
          nama: "Kelompok C",
          singkat: "Menghubungkan garis",
          uraian:
            "Cocokkan dadu, kamus tebal, dan jeruk dengan nama bentuk ruangnya.",
          contoh: "Dadu = kubus. Kamus = balok. Jeruk = bola.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bola sepak diwarnai warna apa?",
          alias: ["hijau", "green"],
        },
        {
          pertanyaan: "2. Kotak paket diwarnai warna apa?",
          alias: ["biru", "blue"],
        },
        {
          pertanyaan: "3. Dadu angka diwarnai warna apa?",
          alias: ["merah", "red"],
        },
        {
          pertanyaan: "4. Kaleng diwarnai warna apa?",
          alias: ["kuning", "yellow"],
        },
        {
          pertanyaan: "5. Kaleng susu berbentuk apa?",
          alias: ["tabung", "b"],
        },
        {
          pertanyaan: "6. Benda bulat tanpa pojok yang mudah menggelinding berbentuk apa?",
          alias: ["bola", "c"],
        },
        {
          pertanyaan: "7. Lemari pakaian dan kotak tisu panjang berbentuk apa?",
          alias: ["balok", "a"],
        },
        {
          pertanyaan: "8. Dadu berbentuk apa?",
          alias: ["kubus"],
        },
        {
          pertanyaan: "9. Kamus tebal berbentuk apa?",
          alias: ["balok"],
        },
        {
          pertanyaan: "10. Jeruk berbentuk apa?",
          alias: ["bola"],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi Bab 4. Kita mewarnai benda, memilih jawaban, lalu mencocokkan bentuknya.",
          "Kelompok A: kubus merah, balok biru, bola hijau, tabung kuning. Kelompok B: pilih satu jawaban yang paling benar.",
        ],
        [
          "Kelompok C: cocokkan dadu dengan kubus, kamus tebal dengan balok, dan jeruk dengan bola. Semangat mengerjakan sampai tuntas!",
        ],
      ],
    },
  ],
};
