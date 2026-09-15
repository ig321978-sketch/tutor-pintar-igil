import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB6 = "Bab 6: Jangan Takut!";

export const MODUL_BINDO1_BAB6: ModulResmiPai = {
  id: "bindo-1-bab6",
  judul: JUDUL_BINDO1_BAB6,
  pola: /jangan takut|temanku berbeda/,
  motivasi:
    "Takut itu emosi biasa. Tarik napas, cari penjelasan yang logis, pegangan tangan teman. Gelap karena lampu mati, bukan karena monster.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Lorong sekolah gelap karena mati lampu, Nia menenangkan Ali yang takut gegetek.",
    "Kartu suku kata G: gajah, gigi, gula, gelas, goreng.",
    "Latihan napas dalam dan menamai emosi takut, sedih, marah, gembira.",
    "Siswa memilih cara mengelola marah ketika kotak pensil rusak.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika kotak pensil kesayanganmu tidak sengaja dirusak oleh teman yang meminjamnya, tindakan terbaik untuk mengelola rasa marahmu adalah...
A) Berteriak keras di depan wajahnya lalu membalas merusak barang miliknya.
B) Menarik napas dalam-dalam agar tenang, lalu meminta teman tersebut meminta maaf atau memperbaikinya dengan bahasa yang sopan.
C) Menangis sekencang-kencangnya di bawah meja kelas sampai pulang sekolah.
D) Menyembunyikan semua pensil teman sebagai hukuman.`,
    `[Soal 2 - PG - Tipe: HOTS]
Lorong sekolah tiba-tiba gelap karena mati lampu saat mendung. Penjelasan yang menenangkan adalah...
A) Pasti ada hantu di pojok lorong.
B) Lampu mati karena hujan mendung, tidak ada monster di sekolah.
C) Kita harus berlari sambil berteriak.
D) Gelap berarti sekolah tutup selamanya.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata ga-jah diurai menjadi...
A) Ga-jah
B) Gi-jah
C) Gu-jah
D) Ge-jah`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata gi-gi merujuk pada bagian tubuh di...
A) Tangan.
B) Kaki.
C) Mulut.
D) Tas.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata gu-la, ge-las, dan go-re-ng huruf awalnya sama, yaitu...
A) L
B) G
C) R
D) O`,
    `[Soal 6 - PG - Tipe: Reguler]
Emosi dasar yang dirasakan Ali saat lorong gelap adalah...
A) Takut.
B) Gembira.
C) Bosan menulis.
D) Lapar saja.`,
    `[Soal 7 - PG - Tipe: HOTS]
Nia mengajak Ali berpegangan tangan dan berjalan perlahan. Cara ini menolong karena...
A) Membuat lampu langsung menyala.
B) Teman yang tenang membantu tubuh dan hati lebih aman.
C) Monster takut pada tangan.
D) Guru melarang berjalan.`,
    `[Soal 8 - PG - Tipe: Reguler]
Kata ge-las diurai menjadi...
A) Ga-las
B) Gi-las
C) Ge-las
D) Go-las`,
    `[Soal 9 - PG - Tipe: Reguler]
Saat marah, langkah pertama yang bijak adalah...
A) Menarik napas dalam-dalam supaya tenang.
B) Memukul meja sekeras-kerasnya.
C) Membalas merusak barang teman.
D) Diam mengunci diri di gudang.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kata go-re-ng diurai menjadi...
A) Ga-re-ng
B) Go-re-ng
C) Gi-re-ng
D) Gu-re-ng`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Lorong Gelap",
      pengantar:
        "Lorong sekolah tiba-tiba gelap karena mati lampu saat langit mendung tebal. Ali takut ada monster.",
      labelDaftar: "Percakapan Ali dan Nia tentang rasa takut",
      kolom: 1,
      item: [
        {
          nama: "Ge-ge-tek",
          singkat: "Bayangan monster",
          uraian:
            "Ali takut ada gegetek atau hantu tersembunyi di pojok lorong. Gelap membuat imajinasi berjalan lebih cepat dari fakta.",
          contoh: "Gelap bukan berarti ada monster.",
        },
        {
          nama: "Napas dalam",
          singkat: "Tenang dulu",
          uraian:
            "Nia mengambil napas dalam-dalam. Ia menjelaskan: lampu mati karena hujan mendung. Tidak ada monster di sekolah.",
          contoh: "Tarik napas. Cari penjelasan.",
        },
        {
          nama: "Berpegangan tangan",
          singkat: "Teman menolong",
          uraian:
            "Mereka berjalan perlahan bersama menuju kelas. Hati Ali menjadi lebih tenang setelah mendengar penjelasan Nia.",
          contoh: "Jalan pelan bersama teman.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mengapa lorong menjadi gelap?",
          alias: ["lampu mati", "mendung", "hujan", "lampu"],
        },
        {
          pertanyaan: "2. Apa yang dilakukan Nia supaya tenang?",
          alias: ["napas", "napas dalam", "bernapas"],
        },
        {
          pertanyaan: "3. Apakah ada monster di sekolah?",
          alias: ["tidak", "tidak ada", "bukan"],
        },
      ],
      voice: [
        [
          "Lorong tiba-tiba gelap. Ali berkata, Nia, gelap sekali! Aku takut ada ge-ge-tek atau hantu tersembunyi di pojok lorong!",
          "Nia menarik napas dalam-dalam. Jangan takut, Ali! Itu hanya lampu mati karena hujan mendung di luar. Tidak ada monster di sekolah kita.",
        ],
        [
          "Nia mengajak, Ayo kita berpegangan tangan dan berjalan perlahan bersama menuju kelas.",
          "Ali menghela napas. Wah, hatiku jadi terasa lebih tenang setelah mendengar penjelasanmu, Nia.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata Ga Gi Gu Ge Go",
      pengantar:
        "Latih artikulasi bunyi /g/ pada kata ga-jah, gi-gi, gu-la, ge-las, go-re-ng. Bimbing anak mengenali emosi dasar: takut, sedih, marah, gembira. Ajarkan menenangkan diri secara logis ketika takut.",
      labelDaftar: "Suku kata G dan literasi emosi",
      kolom: 1,
      item: [
        {
          nama: "Ga-jah dan gi-gi",
          singkat: "Hewan dan tubuh",
          uraian: "Ga-jah hewan besar. Gi-gi di mulut. Bunyi /g/ getar di belakang lidah, berbeda dari /k/ yang tidak bersuara.",
          contoh: "Ga-jah, gi-gi.",
        },
        {
          nama: "Gu-la, ge-las, go-re-ng",
          singkat: "Benda sehari-hari",
          uraian: "Gu-la manis. Ge-las wadah minum. Go-re-ng makanan. Urai pelan supaya /g/ tidak tertukar menjadi /k/.",
          contoh: "Gu-la, ge-las, go-re-ng.",
        },
        {
          nama: "Empat emosi dasar",
          singkat: "Takut sampai gembira",
          uraian:
            "Takut, sedih, marah, gembira boleh dirasakan. Saat takut: napas dalam, cari fakta, minta teman atau guru. Saat marah: napas, bicara sopan, jangan membalas merusak.",
          contoh: "Namai perasaannya, lalu tenang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebut satu kata berawalan ga.",
          alias: ["gajah", "ga-jah", "garam"],
        },
        {
          pertanyaan: "2. Emosi Ali di lorong gelap disebut apa?",
          alias: ["takut", "ketakutan"],
        },
        {
          pertanyaan: "3. Saat marah, tarik apa supaya tenang?",
          alias: ["napas", "napas dalam"],
        },
      ],
      voice: [
        [
          "Suku kata G: ga-jah, gi-gi, gu-la, ge-las, go-re-ng. Bunyi /g/ bersuara di belakang lidah.",
        ],
        [
          "Takut, sedih, marah, gembira adalah emosi biasa. Saat takut, tarik napas, cari penjelasan, pegang tangan teman. Jangan takut.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tenangkan Hati di Sekolah dan di Rumah",
      pengantar:
        "Menyimak dan berbicara tentang emosi dilatih dengan cerita dan napas. Anak belajar menamai perasaan, bukan menyembunyikannya.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Sudut tenang",
          singkat: "Untuk guru",
          uraian:
            "Siapkan sudut napas: tarik napas hitung 1-2-3, hembuskan. Siswa menamai emosi di kartu: takut, sedih, marah, gembira. Baca kata berawalan G di kartu yang sama.",
          contoh: "Napas tiga hitungan. Namaikan perasaannya.",
        },
        {
          nama: "Cerita sebelum tidur",
          singkat: "Untuk orang tua",
          uraian:
            "Tanyakan: apa yang membuatmu takut hari ini? Dengarkan tanpa menertawakan. Bantu cari penjelasan logis, seperti Nia menenangkan Ali.",
          contoh: "Takut itu boleh. Kita cari sebabnya bersama.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di sudut tenang, siswa menarik apa?",
          alias: ["napas", "napas dalam"],
        },
        {
          pertanyaan: "2. Sebut satu emosi dasar selain takut.",
          alias: ["sedih", "marah", "gembira", "senang"],
        },
        {
          pertanyaan: "3. Gelap di lorong disebabkan apa, bukan hantu?",
          alias: ["lampu mati", "mendung", "hujan", "lampu"],
        },
      ],
      voice: [
        [
          "Di sekolah ada sudut tenang. Tarik napas satu dua tiga. Hembuskan. Namai perasaanmu: takut, sedih, marah, atau gembira.",
        ],
        [
          "Di rumah, ceritakan rasa takut hari ini. Orang tua mendengar. Cari penjelasan yang masuk akal. Gelap karena lampu mati, bukan monster.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya mengelola emosi. Pilih tindakan terbaik saat marah, dan ingat cara Nia menenangkan Ali.",
      labelDaftar: "Manajemen emosi",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Manajemen emosi HOTS",
          uraian:
            "Kotak pensil rusak: tarik napas, minta maaf atau perbaikan dengan bahasa sopan. Jangan membalas merusak atau berteriak di wajah teman.",
          contoh: "Napas dulu, bicara sopan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kotak pensil rusak. Tindakan terbaik mengelola marah?",
          alias: ["napas", "maaf", "sopan", "tenang"],
        },
      ],
      voice: [
        [
          "Lembar evaluasi. Jika kotak pensil rusak, jangan berteriak atau membalas merusak. Tarik napas, minta teman meminta maaf atau memperbaikinya dengan bahasa sopan.",
        ],
      ],
    },
  ],
};
