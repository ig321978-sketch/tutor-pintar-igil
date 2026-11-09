/**
 * Naskah murni Matematika Kelas 2 Bab 8 (Berbagai Diagram), Sub-Bab A (Diagram Turus) dan Sub-Bab B (Diagram Gambar).
 * Sumber: Buku Siswa Matematika Kelas II Kemendikbudristek, Bab 8 hlm. 225-250, serta Buku Panduan Guru Bab 8 (kunci
 * jawaban dan langkah pembelajaran), diperkaya dengan metode dari luar buku: gerbang lima pada turus (five-bar gate),
 * survei kelas, piktogram satu lawan satu, tabel frekuensi sederhana, urutan konkret-piktorial-abstrak, dan membaca
 * data dengan pertanyaan lebih banyak, lebih sedikit, serta jumlah.
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k2-bab8.mjs) memakainya untuk menulis src/data/kelas2-bab8.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k2b8.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K2B8_META = {
  chapterId: "k2-mat-bab8",
  phaseCode: "FASE_A",
  grade: 2,
  subjectLabel: "MATEMATIKA - KELAS 2 SD",
  title: "BAB 8: BERBAGAI DIAGRAM",
  silabusElemen: "🌈 Fase A • Elemen Analisis Data dan Peluang: Diagram Turus dan Diagram Gambar (Kelas 2 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Data di sekitar kita", "Mengelompokkan data", "Mengenal turus", "Kelompok lima", "Membuat diagram turus", "Membaca diagram turus", "Lebihnya dan kurangnya", "Mengumpulkan data sendiri", "Siap membuat diagram turus"];
const ALUR_B = ["Dari turus ke gambar", "Satu gambar satu benda", "Memilih lambang", "Membuat diagram gambar", "Membaca diagram gambar", "Membandingkan baris", "Menjumlahkan data", "Menyajikan data", "Siap membuat diagram gambar"];

/* ----------------------- Pembantu penulisan permainan ----------------------- */

const C = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, emoji: string, targetCount: number): GameNaskah => ({
  stage: "Concrete",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  emoji,
  targetCount,
});

const P = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, diagramType: string, numberA: number, numberB: number): GameNaskah => ({
  stage: "Picture",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  diagramType,
  numberA,
  numberB,
});

const A = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, symbolLarge: string, wordLarge: string, mathNotation: string): GameNaskah => ({
  stage: "Abstract",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  symbolLarge,
  wordLarge,
  mathNotation,
});

/* ====================================================================== */
/* SUB-BAB A. Diagram Turus                                                 */
/* ====================================================================== */

export const SUB_A8: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Diagram Turus)",
  fullTitle: "Sub-Bab A: Diagram Turus",
  targetDescription:
    "Siswa membaca data dalam bentuk turus maksimal empat kategori, menginterpretasikan data itu (paling banyak, paling sedikit, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram turus: mengelompokkan benda menurut jenisnya, menghitung, menulis satu garis untuk satu benda, dan mengelompokkan setiap lima turus dengan coretan miring.",
  secondaryBg: "#FEF9C3",
  secondaryBorder: "#CA8A04",
  secondaryText: "#713F12",
  silabus: {
    teksSuara: `Kita belajar berbagai diagram, dimulai dari diagram turus. Di kelas satu kita sudah mengenal tabel dan diagram gambar, dan kali ini kita belajar membuat dan membaca diagram turus. Kita menghitung buah yang dibawa Lili dan teman-temannya pada hari buah, hewan ternak Paman Halim, mainan Kira, sayur Malosi, dan bunga Tika. Kita belajar menulis satu garis untuk satu benda, mengelompokkan setiap lima turus, lalu membaca diagramnya untuk mencari yang paling banyak, yang lebihnya, dan yang kurangnya. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram turus dengan maksimal empat kategori, serta menyampaikan hasilnya dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8: Berbagai Diagram, Sub-Bab A hlm. 228–237) dan Buku Panduan Guru Bab 8 Subbab A.",
  },
  videos: [
    {
      id: "K2B8A-V1",
      judul: "Hari Buah",
      subjudul: "Apa itu diagram turus?",
      adegan: [
        {
          id: "K2B8A-V1-1",
          judul: "Hari buah di kantin",
          ketukan: [
            "Hari ini adalah hari buah di sekolah Lili.",
            "Semua siswa membawa buah kesukaan masing-masing dan memakannya di kantin sehat.",
            "Buah mengandung vitamin yang baik untuk tubuh, dan makan buah menjaga tubuh tetap sehat.",
            "Buah apa yang paling disukai? Berapa banyak anak yang menyukainya?",
          ],
          papan: ["Hari buah", "Kantin sehat", "Buah itu sehat", "Buah apa paling disukai?"],
        },
        {
          id: "K2B8A-V1-2",
          judul: "Data buah Lili dan teman",
          ketukan: [
            "Ini buah yang dibawa Lili dan teman-temannya. Ada buah anggur, jeruk, apel, dan pisang.",
            "Pertama, buah dikelompokkan menurut jenisnya agar tidak tercampur.",
            "Kedua, kita menghitung setiap kelompok satu per satu supaya tidak ada yang terlewat.",
            "Data buah ini bisa kita tulis dalam diagram turus.",
          ],
          papan: ["Data buah", "Kelompokkan dulu", "Hitung satu per satu", "Tulis dalam turus"],
        },
        {
          id: "K2B8A-V1-3",
          judul: "Mengenal turus",
          ketukan: [
            "Pada diagram turus terdapat susunan garis seperti lidi.",
            "Satu garis tegak menunjukkan satu benda. Satu buah jeruk ditulis satu garis, dan dua buah jeruk ditulis dua garis.",
            "Lima buah jeruk ditulis empat garis tegak, lalu garis kelima mencoret miring.",
            "Setiap lima turus dikelompokkan supaya mudah dihitung.",
          ],
          papan: ["Turus seperti lidi", "Satu garis, satu benda", "Lima: empat garis dicoret", "Kelompok lima"],
        },
      ],
    },
    {
      id: "K2B8A-V2",
      judul: "Turus Hewan Paman Halim",
      subjudul: "Membuat dan membaca diagram turus",
      adegan: [
        {
          id: "K2B8A-V2-1",
          judul: "Peternakan Paman Halim",
          ketukan: [
            "Paman Halim adalah seorang peternak yang memelihara berbagai jenis hewan.",
            "Di peternakannya ada ayam, kambing, sapi, dan bebek.",
            "Kita hitung banyak hewan satu per satu, lalu mencatatnya dengan turus.",
            "Setiap hewan yang sudah dihitung ditandai dengan satu garis.",
          ],
          papan: ["Peternakan Paman Halim", "Ayam, kambing, sapi, bebek", "Hitung lalu catat", "Satu hewan, satu garis"],
        },
        {
          id: "K2B8A-V2-2",
          judul: "Membuat diagram turus",
          ketukan: [
            "Ayam ada sepuluh. Turusnya dua kelompok lima.",
            "Kambing ada delapan. Turusnya satu kelompok lima dan tiga garis.",
            "Sapi ada enam. Turusnya satu kelompok lima dan satu garis.",
            "Bebek ada sebelas. Turusnya dua kelompok lima dan satu garis.",
          ],
          papan: ["Ayam: dua kelompok lima", "Kambing: lima dan tiga", "Sapi: lima dan satu", "Bebek: dua lima dan satu"],
        },
        {
          id: "K2B8A-V2-3",
          judul: "Membaca diagram turus",
          ketukan: [
            "Hewan yang paling banyak di peternakan adalah bebek.",
            "Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam.",
            "Sebaliknya, banyak ayam satu kurangnya dari banyak bebek.",
            "Ada delapan kambing dan enam sapi. Banyak kambing dua lebihnya dari banyak sapi.",
          ],
          papan: ["Paling banyak: bebek", "Bebek 1 lebihnya dari ayam", "Ayam 1 kurangnya dari bebek", "Kambing 2 lebihnya"],
        },
      ],
    },
    {
      id: "K2B8A-V3",
      judul: "Mengumpulkan Data Sendiri",
      subjudul: "Bertanya, mencatat, dan membaca",
      adegan: [
        {
          id: "K2B8A-V3-1",
          judul: "Bertanya kepada teman",
          ketukan: [
            "Kita bisa mengumpulkan data sendiri dengan bertanya kepada teman.",
            "Contohnya, bertanya kepada lima belas teman tentang buah kesukaan.",
            "Setiap teman menjawab satu kali, dan kita langsung menulis satu garis untuk jawabannya.",
            "Catatlah dengan tertib supaya datanya tidak tertukar.",
          ],
          papan: ["Bertanya kepada teman", "Lima belas teman", "Satu jawaban, satu garis", "Catat dengan tertib"],
        },
        {
          id: "K2B8A-V3-2",
          judul: "Data mainan Kira",
          ketukan: [
            "Kira mendata mainan kesukaan teman-temannya.",
            "Mobil-mobilan dua anak, boneka empat anak, kelereng enam anak, dan mainan balok tujuh anak.",
            "Garis turus diubah menjadi bilangan pada kolom paling kanan.",
            "Mainan yang paling banyak disukai adalah mainan balok.",
          ],
          papan: ["Mainan kesukaan", "Dua, empat, enam, tujuh", "Turus menjadi bilangan", "Paling banyak: mainan balok"],
        },
        {
          id: "K2B8A-V3-3",
          judul: "Data sayur dan bunga",
          ketukan: [
            "Malosi mendata sayur kesukaan: brokoli tujuh, bayam empat, wortel enam, dan jagung tiga.",
            "Tika dan ibu merangkai bunga: mawar tujuh, lili empat, tulip lima, dan aster empat.",
            "Lili dan aster sama banyak, yaitu empat.",
            "Banyak mawar tiga lebihnya dari banyak aster.",
          ],
          papan: ["Sayur Malosi", "Bunga Tika", "Lili dan aster sama banyak", "Mawar 3 lebihnya dari aster"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Data di Sekitar Kita",
      stepDesc:
        "Data adalah keterangan tentang banyak benda atau banyak orang, misalnya buah yang dibawa ke sekolah, hewan di peternakan, atau mainan kesukaan teman. Anggur, jeruk, apel, dan pisang adalah contoh data. Data yang berserakan sulit dibaca, jadi kita perlu menyajikannya dengan rapi. Pada bab ini kita belajar dua cara menyajikan data: diagram turus dan diagram gambar.",
      icon: "🗂️",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Mengelompokkan Data",
      stepDesc:
        "Langkah pertama menyajikan data adalah mengelompokkan benda menurut jenisnya. Semua anggur dikumpulkan dengan anggur, semua jeruk dengan jeruk, dan seterusnya. Setelah dikelompokkan, kita menghitung setiap kelompok satu per satu. Mengelompokkan lebih dulu membuat hitungan tidak terlewat dan tidak dihitung dua kali, karena setiap benda hanya masuk satu kelompok.",
      icon: "🧺",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Mengenal Turus",
      stepDesc:
        "Turus adalah tanda garis tegak seperti susunan lidi. Satu garis menunjukkan satu benda. Satu buah jeruk ditulis satu garis, dua buah jeruk ditulis dua garis, dan tiga buah jeruk ditulis tiga garis. Kita menulis garisnya satu per satu mengikuti data, sehingga banyak garis sama dengan banyak benda. Turus mudah ditulis karena tidak perlu menulis angka.",
      icon: "✏️",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Kelompok Lima",
      stepDesc:
        "Bila garis ditulis panjang-panjang, kita mudah keliru menghitung. Karena itu setiap lima data dikelompokkan: empat garis tegak, lalu garis kelima mencoret miring melintasi keempat garis itu. Sepuluh data berarti dua kelompok lima. Delapan data berarti satu kelompok lima dan tiga garis. Kita menghitung kelompok lima dengan cara melompat lima-lima, lalu menambahkan garis yang tersisa.",
      icon: "🖐️",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Membuat Diagram Turus",
      stepDesc:
        "Diagram turus berupa tabel dengan tiga kolom: nama, turus, dan banyaknya. Kolom nama berisi jenis data, kolom turus berisi garis yang kita tulis, dan kolom banyaknya berisi hasil menghitung garis. Pada data buah kesukaan, anggur dua, jeruk enam, apel empat, dan pisang tiga. Diagram turus diberi judul supaya pembaca tahu data apa yang disajikan.",
      icon: "📊",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Membaca Diagram Turus",
      stepDesc:
        "Untuk membaca diagram turus, hitung garis pada setiap baris. Baris dengan turus paling panjang menunjukkan data paling banyak, dan baris dengan turus paling pendek menunjukkan data paling sedikit. Pada hewan ternak Paman Halim, bebek paling banyak, yaitu sebelas. Dua baris yang sama panjang berarti datanya sama banyak, seperti lili dan aster yang sama-sama empat.",
      icon: "🔍",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Lebihnya dan Kurangnya",
      stepDesc:
        "Dari diagram turus kita bisa membandingkan dua data. Ayam sepuluh dan bebek sebelas, jadi banyak bebek satu lebihnya dari banyak ayam, dan banyak ayam satu kurangnya dari banyak bebek. Kambing delapan dan sapi enam, jadi kambing dua lebihnya dari sapi, dan sapi dua kurangnya dari kambing. Selisihnya dicari dengan menghitung garis yang berbeda atau dengan mengurangkan bilangan.",
      icon: "⚖️",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Mengumpulkan Data Sendiri",
      stepDesc:
        "Kita bisa membuat data sendiri dengan bertanya kepada teman, misalnya kepada lima belas teman tentang buah kesukaan. Setiap jawaban langsung ditulis satu garis pada baris yang tepat. Setelah selesai, hitung setiap baris, lalu jawab pertanyaan: buah apa yang paling disukai dan berapa banyak anak yang menyukainya. Mencatat dengan tertib membuat data tidak tertukar dan hasilnya dapat dipercaya.",
      icon: "🧑‍🤝‍🧑",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    {
      judul: "Apa Itu Data?",
      emoji: "🗂️",
      countNum: 2,
      countWord: "Dua",
      suara: "Data adalah keterangan tentang banyak benda. Buah yang dibawa ke sekolah adalah contoh data. Data bisa disajikan dengan diagram turus dan diagram gambar.",
    },
    {
      judul: "Mengelompokkan Data",
      emoji: "🧺",
      countNum: 4,
      countWord: "Empat",
      suara: "Kelompokkan benda menurut jenisnya, yaitu anggur, jeruk, apel, dan pisang. Lalu hitung setiap kelompok satu per satu.",
    },
    {
      judul: "Tanda Turus",
      emoji: "✏️",
      countNum: 3,
      countWord: "Tiga",
      suara: "Satu garis tegak menunjukkan satu benda. Dua garis menunjukkan dua benda, dan tiga garis menunjukkan tiga benda.",
    },
    {
      judul: "Kelompok Lima",
      emoji: "🖐️",
      countNum: 2,
      countWord: "Dua",
      suara: "Lima benda ditulis empat garis tegak dan satu coretan miring. Setiap lima turus dikelompokkan supaya mudah dihitung.",
    },
    {
      judul: "Turus Buah Kesukaan",
      emoji: "🍊",
      countNum: 4,
      countWord: "Empat",
      suara: "Anggur dua, jeruk enam, apel empat, dan pisang tiga. Jeruk adalah buah yang paling disukai.",
    },
    {
      judul: "Turus Hewan Ternak",
      emoji: "🐔",
      countNum: 4,
      countWord: "Empat",
      suara: "Ayam sepuluh, kambing delapan, sapi enam, dan bebek sebelas. Bebek adalah hewan yang paling banyak.",
    },
    {
      judul: "Membaca Diagram Turus",
      emoji: "🔍",
      countNum: 3,
      countWord: "Tiga",
      suara: "Hitung garis pada setiap baris. Turus paling panjang berarti paling banyak, dan turus paling pendek berarti paling sedikit.",
    },
    {
      judul: "Lebihnya dan Kurangnya",
      emoji: "⚖️",
      countNum: 2,
      countWord: "Dua",
      suara: "Bebek sebelas dan ayam sepuluh. Banyak bebek satu lebihnya dari banyak ayam, dan banyak ayam satu kurangnya dari banyak bebek.",
    },
    {
      judul: "Cara Membuat Diagram Turus",
      emoji: "📝",
      countNum: 4,
      countWord: "Empat",
      suara: "Empat langkah membuat diagram turus. Satu, kelompokkan data. Dua, tulis satu garis untuk satu benda. Tiga, kelompokkan setiap lima turus. Empat, tulis banyaknya.",
    },
    {
      judul: "Pentingnya Makan Buah",
      emoji: "🥗",
      countNum: 4,
      countWord: "Empat",
      suara: "Buah adalah sumber vitamin, sumber air, obat luar, dan membantu mencegah penyakit. Ayo, kita makan buah setiap hari.",
    },
  ],
  games: [
    C("sort-objects-by-kind", "Kelompokkan Benda", "hlm. 228 (buah yang dibawa Lili dikelompokkan menurut jenisnya)", "Mengelompokkan benda campuran menurut jenisnya sebelum dihitung.", "Tiga ronde, tiap ronde delapan benda campur (buah, hewan, sayur) dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk dan kembali.", "Pilah benda ke kotak jenisnya.", "🧺", 3),
    C("count-each-kind", "Hitung Tiap Jenis", "hlm. 228 dan 231 (menghitung buah dan hewan satu per satu)", "Menghitung banyak benda dari satu jenis lalu memilih bilangannya.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu jenis benda dalam baris lima-lima, misalnya sepuluh ayam atau sebelas bebek. Siswa memilih banyaknya dari tiga angka.", "Hitung bendanya lima-lima.", "🐔", 6),
    C("record-tally-stream", "Catat Turus", "hlm. 228–229 (setiap data ditulis satu garis turus)", "Mencatat data yang datang satu per satu dengan turus.", "Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu garis turus ditulis. Garis kelima otomatis mencoret miring. Salah baris memberi petunjuk.", "Ketuk baris yang cocok, satu garis untuk satu benda.", "✏️", 27),
    C("make-tally-from-objects", "Buat Turus dari Benda", "hlm. 229 dan 234 (turus dibuat dari banyak benda)", "Membuat turus yang banyaknya sama dengan banyak benda nyata.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung benda pada gambar, lalu menekan tombol tambah goresan sampai turusnya sama banyak, dan menekan Periksa.", "Hitung bendanya, lalu tulis turusnya.", "🔢", 6),
    C("match-objects-tally", "Jodohkan Benda dan Turus", "hlm. 229 (turus menunjukkan banyak benda)", "Menjodohkan kelompok benda dengan turus yang banyaknya sama.", "Tiga ronde, tiap ronde tiga kelompok benda dan tiga gambar turus. Siswa mengetuk kelompok benda, lalu mengetuk turus yang cocok. Pasangan benar terkunci.", "Ketuk benda, lalu ketuk turusnya.", "🔗", 9),
    C("memory-objects-tally", "Memori Benda dan Turus", "hlm. 229 dan 232 (benda dan turus yang sama banyak)", "Mencocokkan kelompok benda dengan turusnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan turus yang sama banyak. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari benda dan turusnya.", "🃏", 12),
    C("most-least-objects", "Paling Banyak, Paling Sedikit", "hlm. 227 dan 232 (buah apa yang paling disukai; hewan yang paling banyak)", "Menemukan kelompok benda yang paling banyak dan paling sedikit.", "Tiga ronde, tiap ronde empat kelompok benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kelompoknya. Letak kunci berpindah.", "Ketuk kelompok yang paling banyak atau sedikit.", "🏆", 6),
    C("order-object-groups", "Urutkan Kelompok Benda", "hlm. 232 dan 234 (membandingkan banyak data)", "Mengurutkan kelompok benda dari yang paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde tiga atau empat kelompok benda bertanda huruf. Siswa mengetuk kelompok satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk kelompok menurut banyaknya.", "📶", 3),
    C("more-less-objects", "Lebihnya dan Kurangnya", "hlm. 232 (banyak bebek 1 lebihnya dari banyak ayam)", "Menentukan selisih banyak dua kelompok benda.", "Tiga ronde, tiap ronde dua soal. Dua kelompok benda ditampilkan berdampingan, misalnya bebek dan ayam. Siswa mengatur penghitung sampai sama dengan selisihnya, lalu menekan Periksa.", "Cari berapa lebihnya.", "⚖️", 6),
    C("tally-card-to-box", "Kartu Turus ke Kotak Benda", "hlm. 229 (turus dan banyak benda)", "Menaruh kartu turus ke kotak benda yang banyaknya sama.", "Tiga ronde, tiap ronde tiga kartu turus dan tiga kotak berisi gambar benda. Siswa mengetuk kartu turus, lalu mengetuk kotak yang banyak bendanya sama. Letak kartu berpindah.", "Ketuk kartu, lalu ketuk kotaknya.", "📥", 9),
    P("read-tally", "Baca Turus", "hlm. 229 dan 232 (membaca banyak data dari turus)", "Membaca banyak data dari turus lalu menuliskan banyaknya.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa mengatur penghitung sampai sama dengan banyak garis, lalu menekan Periksa.", "Hitung turusnya, lalu tulis banyaknya.", "tally-read", 3, 2),
    P("fill-count-column", "Lengkapi Kolom Banyak", "hlm. 234 (lengkapi diagram turus dengan mengisi kolom paling kanan)", "Melengkapi kolom banyaknya pada diagram turus.", "Tiga tabel dengan empat baris. Tiap baris menampilkan nama dan turus. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat.", "Isi kolom banyaknya.", "tally-table", 3, 4),
    P("draw-tally", "Gambar Turus", "hlm. 229 dan 235 (menulis turus dari data)", "Menggambar turus dengan banyak garis yang diminta.", "Tiga ronde, tiap ronde dua soal. Siswa menambah goresan satu per satu sampai sama dengan bilangan yang diminta. Goresan kelima otomatis mencoret miring.", "Tulis garis turus sebanyak bilangannya.", "tally-draw", 3, 2),
    P("pick-right-tally", "Turus yang Tepat", "hlm. 229 (turus yang menunjukkan banyak data)", "Memilih turus yang banyaknya sama dengan bilangan yang disebut.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat gambar turus. Pengecoh berbeda satu atau dua garis.", "Ketuk turus yang sama dengan bilangannya.", "tally-pick", 3, 2),
    P("match-tally-numeral", "Jodohkan Turus dan Bilangan", "hlm. 229 dan 232 (turus menjadi bilangan)", "Menjodohkan turus dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau.", "Ketuk turus, lalu ketuk bilangannya.", "tally-match", 3, 3),
    P("memory-tally-numeral", "Memori Turus dan Bilangan", "hlm. 229 (turus dan banyaknya)", "Mencocokkan turus dengan bilangannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar turus dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari turus dan bilangannya.", "tally-memory", 3, 4),
    P("groups-of-five", "Kelompok Lima dan Sisa", "hlm. 229 (kita mengelompokkan setiap 5 data)", "Menyebut banyak kelompok lima dan sisa garis pada sebuah turus.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa memilih satu dari tiga kalimat, misalnya satu kelompok lima dan dua garis. Pengecoh menukar atau menambah satu.", "Hitung kelompok lima, lalu sisa garisnya.", "tally-groups", 3, 2),
    P("order-tally", "Urutkan Turus", "hlm. 232 (membandingkan banyak data)", "Mengurutkan turus dari yang paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde empat gambar turus. Siswa mengetuk turus satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk turus menurut urutannya.", "tally-order", 3, 4),
    P("sort-tally-five", "Pilah Turus", "hlm. 229 (kelompok lima ditandai coretan miring)", "Memilah turus menjadi kurang dari lima dan lima atau lebih.", "Tiga ronde, tiap ronde enam gambar turus dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk turus ke kotak yang tepat.", "Pilah turus ke kotak yang tepat.", "tally-sort", 3, 6),
    P("number-line-more-less", "Garis Bilangan: Lebihnya dan Kurangnya", "hlm. 232 (1 lebihnya dan 2 kurangnya)", "Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal, misalnya ayam sepuluh, lalu mengetuk banyak bebek yang satu lebihnya pada garis bilangan.", "Ketuk bilangan yang diminta pada garis.", "number-line", 3, 2),
    A("match-name-quantity", "Jodohkan Nama dan Banyaknya", "hlm. 229 dan 236 (nama data dan banyaknya)", "Menjodohkan nama data dengan banyaknya.", "Tiga ronde, tiap ronde tiga pasang, misalnya lemper dan 3. Siswa mengetuk nama di kiri, lalu mengetuk bilangan yang cocok di kanan.", "Ketuk nama, lalu ketuk bilangannya.", "3", "LEMPER", "nama • banyaknya"),
    A("complete-data-sentences", "Lengkapi Kalimat Data", "hlm. 236–237 (lengkapi setiap kalimat berikut sesuai dengan diagram)", "Melengkapi kalimat tentang data dengan bilangan yang tepat.", "Dua ronde, tiap ronde tiga kalimat, misalnya ada ... anak yang suka karet. Siswa memilih satu dari tiga bilangan. Kalimat lengkap dibacakan.", "Pilih bilangan untuk bagian kosong.", "…", "LENGKAPI", "ada ... anak"),
    A("build-data-sentence", "Susun Kalimat Data", "hlm. 232 (informasi dari diagram turus)", "Menyusun kata menjadi kalimat tentang diagram turus.", "Empat kalimat, misalnya banyak bebek satu lebihnya dari banyak ayam. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • data"),
    A("fill-tally-table", "Isi Tabel Turus", "hlm. 229 dan 234 (nama dan banyaknya)", "Mengisi kolom banyaknya pada tabel data.", "Tiga tabel dengan empat baris, misalnya hewan ternak. Siswa mengetuk baris, lalu mengetuk kartu bilangan yang tepat.", "Isi tabel dengan kartu bilangan.", "10", "TABEL", "nama • banyaknya"),
    A("true-false-data", "Benar atau Salah: Data", "hlm. 228–237 (turus, kelompok lima, dan membaca data)", "Menilai pernyataan tentang diagram turus.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("riddle-data-clues", "Detektif Data", "hlm. 232 (hewan yang paling banyak; lebihnya dan kurangnya)", "Menemukan kategori data dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk seperti banyakku lebih dari delapan dan kurang dari sebelas, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk.", "Baca semua petunjuk, lalu pilih namanya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-fill", "Peta Konsep Turus", "hlm. 226 (peta konsep: diagram turus dan diagram gambar)", "Melengkapi peta konsep diagram turus dan cara membacanya.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "turus • kelompok lima • data"),
    A("order-data", "Urutkan Data", "hlm. 232 (membandingkan banyak data)", "Mengurutkan nama data menurut banyaknya.", "Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya jeruk 6. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit. Letak jawaban berpindah.", "Ketuk menurut banyaknya.", "7 > 3", "URUTKAN", "bandingkan banyaknya"),
    A("select-all-data", "Ketuk Semua yang Cocok", "hlm. 232 dan 236 (membandingkan dengan sebuah bilangan)", "Memilih semua data yang memenuhi sebuah syarat.", "Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya lebih dari delapan. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "lebih dari • kurang dari"),
    A("add-data-total", "Hitung Jumlah Data", "hlm. 244 (jumlah buah dan jumlah semua buah dalam parsel)", "Menjumlahkan banyak dua atau lebih data.", "Tiga ronde, tiap ronde dua soal, misalnya jumlah apel dan jeruk, atau jumlah semua buah. Siswa mengatur penghitung sampai sama dengan jumlahnya, lalu menekan Periksa.", "Jumlahkan datanya, lalu tulis hasilnya.", "4+3", "JUMLAH", "jumlah data"),
  ],
  poin: [
    { ikon: "🧺", nama: "Kelompokkan dulu", isi: "benda sejenis dikumpulkan, lalu dihitung", suara: "Kelompokkan benda menurut jenisnya, lalu hitung setiap kelompok satu per satu." },
    { ikon: "✏️", nama: "Satu garis, satu benda", isi: "turus seperti lidi", suara: "Pada diagram turus, satu garis tegak menunjukkan satu benda." },
    { ikon: "🖐️", nama: "Kelompok lima", isi: "empat garis dan satu coretan miring", suara: "Lima benda ditulis empat garis tegak dan satu coretan miring, supaya mudah dihitung." },
    { ikon: "🔍", nama: "Membaca diagram", isi: "turus terpanjang paling banyak", suara: "Turus yang paling panjang menunjukkan data yang paling banyak, dan turus yang paling pendek menunjukkan data yang paling sedikit." },
    { ikon: "⚖️", nama: "Lebihnya dan kurangnya", isi: "bebek 11, ayam 10: bebek 1 lebihnya", suara: "Kita membandingkan dua data dengan kata lebihnya dan kurangnya, misalnya banyak bebek satu lebihnya dari banyak ayam." },
  ],
  poinSuara:
    "Ingat selalu! Kelompokkan benda menurut jenisnya sebelum menghitung. Pada diagram turus, satu garis tegak menunjukkan satu benda, dan setiap lima turus dikelompokkan dengan coretan miring. Turus yang paling panjang menunjukkan data yang paling banyak. Kita membandingkan dua data dengan kata lebihnya dan kurangnya.",
  cara: {
    suara: "Cara menyebutkan. Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.",
    potongan: [
      { teks: "data", warna: "#BAE6FD" },
      { teks: "bandingkan", warna: "#FDE68A" },
      { teks: "lebihnya", warna: "#7FCB96" },
      { teks: "kurangnya", warna: "#FECACA" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: tanyakan kepada lima belas orang di sekitarmu tentang buah kesukaan mereka, misalnya keluarga dan tetangga. Tulis satu garis turus untuk setiap jawaban, kelompokkan setiap lima turus, lalu hitung. Ceritakan buah apa yang paling disukai dan berapa banyak yang menyukainya.",
  refleksi: [
    "Aku dapat membaca diagram turus.",
    "Aku dapat membuat diagram turus dari data.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Diagram Gambar                                                */
/* ====================================================================== */

export const SUB_B8: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Diagram Gambar)",
  fullTitle: "Sub-Bab B: Diagram Gambar",
  targetDescription:
    "Siswa membaca data dalam bentuk diagram gambar maksimal empat kategori, menginterpretasikan data itu (paling banyak, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram gambar: satu gambar mewakili satu benda, gambar dalam satu diagram sama bentuk dan ukurannya, baris dibaca dari kiri ke kanan, dan keterangan ditulis di bawah diagram.",
  secondaryBg: "#DBEAFE",
  secondaryBorder: "#2563EB",
  secondaryText: "#1E3A8A",
  silabus: {
    teksSuara: `Kita belajar diagram gambar. Kita kembali ke data buah kesukaan Lili dan teman-temannya, lalu menandai setiap buah dengan bintang berwarna. Setiap gambar mewakili satu benda. Kita membuat diagram gambar rangkaian bunga Tika, kue kesukaan teman-teman Kira, permainan tradisional yang disukai Upe, dan warna kesukaan siswa kelas dua. Kita juga belajar membaca diagram untuk mencari yang paling banyak, yang lebihnya, yang kurangnya, dan jumlahnya. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram gambar dengan maksimal empat kategori, serta mempresentasikan hasilnya dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8: Berbagai Diagram, Sub-Bab B hlm. 238–250) dan Buku Panduan Guru Bab 8 Subbab B.",
  },
  videos: [
    {
      id: "K2B8B-V1",
      judul: "Bintang untuk Buah",
      subjudul: "Dari turus ke diagram gambar",
      adegan: [
        {
          id: "K2B8B-V1-1",
          judul: "Mengingat data buah",
          ketukan: [
            "Ingatkah kalian dengan buah kesukaan Lili dan teman-temannya?",
            "Data itu juga dapat disajikan dengan diagram gambar.",
            "Kita beri tanda bintang biru untuk anggur, jingga untuk jeruk, merah untuk apel, dan hijau untuk pisang.",
            "Lalu kita hitung banyak setiap buah.",
          ],
          papan: ["Ingat buah kesukaan?", "Bisa dengan diagram gambar", "Setiap buah diberi bintang", "Hitung tiap buah"],
        },
        {
          id: "K2B8B-V1-2",
          judul: "Satu bintang, satu buah",
          ketukan: [
            "Setiap bintang mewakili satu buah. Dua buah anggur digambar dengan dua bintang biru.",
            "Enam buah jeruk digambar dengan enam bintang jingga.",
            "Empat buah apel digambar dengan empat bintang merah, dan tiga buah pisang digambar dengan tiga bintang hijau.",
            "Semua bintang diberi ukuran dan jarak yang sama supaya adil.",
          ],
          papan: ["Satu bintang, satu buah", "Jeruk: enam bintang", "Apel empat, pisang tiga", "Ukuran dan jarak sama"],
        },
        {
          id: "K2B8B-V1-3",
          judul: "Gambar lain pun boleh",
          ketukan: [
            "Selain bintang, kita boleh memakai gambar lain seperti lingkaran, hati, atau wajah tersenyum.",
            "Yang penting, satu gambar mewakili satu benda.",
            "Gambar yang dipakai harus sama di seluruh diagram.",
            "Tulis keterangannya, misalnya setiap gambar mewakili satu anak.",
          ],
          papan: ["Lingkaran, hati, wajah", "Satu gambar, satu benda", "Gambar harus sama", "Tulis keterangan"],
        },
      ],
    },
    {
      id: "K2B8B-V2",
      judul: "Rangkaian Bunga Tika",
      subjudul: "Membuat dan membaca diagram gambar",
      adegan: [
        {
          id: "K2B8B-V2-1",
          judul: "Tika merangkai bunga",
          ketukan: [
            "Tika sedang membuat rangkaian bunga bersama ibunya.",
            "Ada bunga mawar, lili, tulip, dan aster di dalam rangkaian itu.",
            "Kita hitung banyak setiap jenis bunga dengan teliti.",
            "Lalu kita sajikan dalam diagram gambar.",
          ],
          papan: ["Tika merangkai bunga", "Mawar, lili, tulip, aster", "Hitung dengan teliti", "Sajikan dalam diagram"],
        },
        {
          id: "K2B8B-V2-2",
          judul: "Membuat diagram bunga",
          ketukan: [
            "Mawar ada tujuh, jadi digambar tujuh bunga.",
            "Lili ada empat, jadi digambar empat bunga.",
            "Tulip ada lima dan aster ada empat.",
            "Diagram gambar membuat kita mudah melihat jenis bunga yang paling banyak.",
          ],
          papan: ["Mawar: tujuh gambar", "Lili: empat gambar", "Tulip lima, aster empat", "Mudah melihat paling banyak"],
        },
        {
          id: "K2B8B-V2-3",
          judul: "Membaca diagram bunga",
          ketukan: [
            "Bunga yang paling banyak adalah mawar.",
            "Lili dan aster sama banyak, yaitu empat.",
            "Banyak tulip satu lebihnya dari banyak lili.",
            "Banyak aster tiga kurangnya dari banyak mawar.",
          ],
          papan: ["Paling banyak: mawar", "Lili dan aster sama banyak", "Tulip 1 lebihnya dari lili", "Aster 3 kurangnya"],
        },
      ],
    },
    {
      id: "K2B8B-V3",
      judul: "Kue, Permainan, dan Pelari",
      subjudul: "Membaca berbagai diagram gambar",
      adegan: [
        {
          id: "K2B8B-V3-1",
          judul: "Kue kesukaan",
          ketukan: [
            "Kira mendata kue kesukaan teman-teman sekelasnya.",
            "Kue cucur enam anak, onde-onde lima anak, lemper tiga anak, dan kue talam tujuh anak.",
            "Setiap bintang mewakili satu anak.",
            "Kue talam paling banyak disukai.",
          ],
          papan: ["Kue kesukaan Kira", "Cucur 6, onde 5", "Satu bintang, satu anak", "Paling banyak: kue talam"],
        },
        {
          id: "K2B8B-V3-2",
          judul: "Permainan tradisional",
          ketukan: [
            "Upe mendata permainan tradisional yang disukai teman-temannya.",
            "Empat anak suka karet dan enam anak suka lompat tali.",
            "Lima anak suka petak umpet dan tujuh anak suka benteng.",
            "Kita buat diagram gambar. Setiap gambar mewakili satu anak.",
          ],
          papan: ["Permainan tradisional", "Karet 4, lompat tali 6", "Petak umpet 5, benteng 7", "Buat diagram gambar"],
        },
        {
          id: "K2B8B-V3-3",
          judul: "Para pelari",
          ketukan: [
            "Para siswa kelas dua berlari mengelilingi lapangan. Ada empat belas siswa.",
            "Lima siswa berlari satu putaran, tiga siswa dua putaran, empat siswa tiga putaran, dan dua siswa empat putaran.",
            "Siswa yang berlari lebih dari dua putaran adalah empat ditambah dua, yaitu enam siswa.",
            "Membaca diagram dengan teliti membantu kita menjawab banyak pertanyaan.",
          ],
          papan: ["Empat belas siswa berlari", "Satu sampai empat putaran", "Lebih dari dua putaran: enam", "Baca dengan teliti"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Dari Turus ke Gambar",
      stepDesc:
        "Data yang sama dapat disajikan dengan cara berbeda. Pada sub-bab sebelumnya buah kesukaan Lili dan teman-temannya disajikan dengan turus. Sekarang data itu kita sajikan dengan diagram gambar. Isinya tetap sama: anggur dua, jeruk enam, apel empat, dan pisang tiga. Yang berubah hanya bentuk penyajiannya, dari garis menjadi gambar.",
      icon: "🔁",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Satu Gambar, Satu Benda",
      stepDesc:
        "Pada diagram gambar, satu gambar mewakili satu benda. Dua buah anggur digambar dengan dua bintang, dan enam buah jeruk digambar dengan enam bintang. Karena itu kita menghitung banyak data dengan menghitung banyak gambar pada baris itu. Keterangan di bawah diagram, misalnya setiap gambar mewakili satu anak, wajib ditulis supaya pembaca tidak keliru.",
      icon: "⭐",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Memilih Lambang",
      stepDesc:
        "Kita boleh memakai gambar apa saja sebagai lambang: bintang, lingkaran, hati, atau wajah tersenyum. Syaratnya, semua gambar dalam satu diagram harus sama bentuk dan ukurannya, serta tersusun rapi dengan jarak yang sama. Bila warna dipakai, warna menandai jenis data. Misalnya bintang biru untuk anggur dan bintang jingga untuk jeruk. Lambang yang rapi membuat diagram mudah dibaca.",
      icon: "🎨",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Membuat Diagram Gambar",
      stepDesc:
        "Untuk membuat diagram gambar, mulailah dengan menghitung data setiap jenis. Tulis nama jenis pada kolom kiri. Lalu gambar lambang pada kolom kanan sebanyak datanya, mulai dari paling kiri dan tanpa celah. Terakhir tulis judul diagram dan keterangan satu gambar mewakili berapa. Rangkaian bunga Tika menghasilkan mawar tujuh gambar, lili empat, tulip lima, dan aster empat.",
      icon: "🖍️",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Membaca Diagram Gambar",
      stepDesc:
        "Membaca diagram gambar dimulai dari judul, lalu keterangan, lalu nama pada kolom kiri, dan terakhir menghitung gambar pada setiap baris. Pada diagram kue kesukaan, kue cucur enam, onde-onde lima, lemper tiga, dan kue talam tujuh. Hitunglah gambar satu per satu dari kiri ke kanan supaya tidak ada yang terlewat, lalu jawab pertanyaan berdasarkan hasil hitungan.",
      icon: "📖",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Membandingkan Baris",
      stepDesc:
        "Baris yang paling panjang menunjukkan data paling banyak, dan baris yang paling pendek menunjukkan data paling sedikit. Dua baris yang sama panjang menunjukkan data sama banyak, seperti lili dan aster yang sama-sama empat. Untuk mencari lebihnya dan kurangnya, bandingkan dua baris: banyak tulip satu lebihnya dari banyak lili, dan banyak aster tiga kurangnya dari banyak mawar.",
      icon: "📏",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Menjumlahkan Data",
      stepDesc:
        "Diagram juga dapat dipakai untuk mencari jumlah. Pada parsel buah Ibu, jeruk empat, apel tiga, pisang enam, dan mangga dua. Jumlah apel dan jeruk adalah tujuh, jumlah mangga dan pisang adalah delapan, dan jumlah semua buah adalah lima belas. Pada diagram para pelari, siswa yang berlari lebih dari dua putaran adalah empat ditambah dua, yaitu enam siswa.",
      icon: "➕",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Menyajikan Data",
      stepDesc:
        "Pada kegiatan Ayo Berkarya kita mewawancarai dua puluh teman tentang kue tradisional kesukaan. Hasilnya ditulis lebih dulu dalam diagram turus, lalu disajikan dalam diagram gambar. Setelah itu kita menyimpulkan kue apa yang disukai teman-teman dan kue apa yang paling banyak disukai, kemudian mempresentasikan hasilnya di depan kelas dengan percaya diri dan suara yang jelas.",
      icon: "🎤",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    {
      judul: "Dari Turus ke Gambar",
      emoji: "🔁",
      countNum: 2,
      countWord: "Dua",
      suara: "Data yang sama bisa disajikan dengan turus dan dengan gambar. Isinya tetap sama, hanya bentuk penyajiannya yang berbeda.",
    },
    {
      judul: "Bintang Mewakili Satu",
      emoji: "⭐",
      countNum: 2,
      countWord: "Dua",
      suara: "Satu bintang mewakili satu buah. Dua anggur digambar dengan dua bintang, dan enam jeruk digambar dengan enam bintang.",
    },
    {
      judul: "Diagram Gambar Buah",
      emoji: "🍎",
      countNum: 4,
      countWord: "Empat",
      suara: "Anggur dua bintang biru, jeruk enam bintang jingga, apel empat bintang merah, dan pisang tiga bintang hijau.",
    },
    {
      judul: "Gambar Lain Boleh",
      emoji: "🎨",
      countNum: 4,
      countWord: "Empat",
      suara: "Selain bintang, kita boleh memakai lingkaran, hati, atau wajah tersenyum. Yang penting satu gambar mewakili satu benda.",
    },
    {
      judul: "Diagram Gambar Bunga",
      emoji: "💐",
      countNum: 4,
      countWord: "Empat",
      suara: "Mawar tujuh, lili empat, tulip lima, dan aster empat. Bunga yang paling banyak adalah mawar.",
    },
    {
      judul: "Cara Membuat Diagram Gambar",
      emoji: "🖍️",
      countNum: 4,
      countWord: "Empat",
      suara: "Empat langkah membuat diagram gambar. Satu, hitung data setiap jenis. Dua, tulis nama jenis. Tiga, gambar lambang sebanyak datanya. Empat, tulis judul dan keterangan.",
    },
    {
      judul: "Membaca Diagram Gambar",
      emoji: "📖",
      countNum: 3,
      countWord: "Tiga",
      suara: "Baca judul dan keterangan lebih dulu. Lalu hitung gambar pada setiap baris dari kiri ke kanan. Baris terpanjang berarti paling banyak.",
    },
    {
      judul: "Turus dan Gambar Berdampingan",
      emoji: "🪜",
      countNum: 2,
      countWord: "Dua",
      suara: "Jeruk enam ditulis satu kelompok lima dan satu garis pada turus, dan enam bintang pada diagram gambar. Banyaknya sama.",
    },
    {
      judul: "Menjumlahkan Data",
      emoji: "➕",
      countNum: 3,
      countWord: "Tiga",
      suara: "Jumlah apel dan jeruk pada parsel Ibu adalah tujuh, jumlah mangga dan pisang adalah delapan, dan jumlah semua buah adalah lima belas.",
    },
    {
      judul: "Mempresentasikan Data",
      emoji: "🎤",
      countNum: 3,
      countWord: "Tiga",
      suara: "Tiga langkah mempresentasikan data. Satu, sebutkan judul diagram. Dua, ceritakan yang paling banyak dan paling sedikit. Tiga, ceritakan lebihnya dan kurangnya.",
    },
  ],
  games: [
    C("stick-pictures", "Tempel Gambar", "hlm. 238 dan 241 (tandai buah dengan bintang; tempelkan gambar sebanyak data)", "Menempel satu gambar untuk setiap data yang datang.", "Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu gambar benda ditempel pada diagram baris itu. Salah baris memberi petunjuk.", "Ketuk baris yang cocok, tempel satu gambar.", "🖼️", 27),
    C("sort-to-rows", "Kelompokkan ke Baris", "hlm. 238 (buah dikelompokkan menurut jenis)", "Memilah benda campuran ke baris jenisnya sebelum digambar.", "Tiga ronde, tiap ronde delapan benda campur dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk.", "Pilah benda ke baris jenisnya.", "🧺", 3),
    C("build-picture-diagram", "Susun Diagram Gambar", "hlm. 239–240 (diagram gambar buah dan bunga)", "Menyusun diagram gambar dari kelompok benda nyata.", "Tiga ronde. Tiap baris menampilkan kelompok benda di kiri dan sel kosong di kanan. Siswa mengetuk sel untuk mengisi gambar sampai sama dengan banyak benda, lalu menekan Periksa.", "Isi gambar sebanyak bendanya.", "🧩", 12),
    C("match-objects-row", "Jodohkan Benda dan Baris", "hlm. 239 (diagram gambar menunjukkan banyak benda)", "Menjodohkan kelompok benda dengan baris gambar yang banyaknya sama.", "Tiga ronde, tiap ronde tiga kelompok benda dan tiga baris gambar. Siswa mengetuk benda, lalu mengetuk baris yang cocok. Pasangan benar terkunci.", "Ketuk benda, lalu ketuk barisnya.", "🔗", 9),
    C("memory-objects-row", "Memori Benda dan Baris Gambar", "hlm. 239 dan 242 (benda dan diagram gambar)", "Mencocokkan kelompok benda dengan baris gambar lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan baris gambar yang sama banyak. Siswa membalik dua kartu.", "Balik dua kartu, cari benda dan barisnya.", "🃏", 12),
    C("read-picture-diagram", "Baca Diagram Gambar", "hlm. 239 dan 242 (membaca diagram gambar)", "Membaca banyak data dari diagram gambar yang memakai gambar benda.", "Tiga ronde, tiap ronde dua soal. Diagram gambar empat baris ditampilkan dengan gambar benda sebagai lambang. Siswa memilih banyaknya dari tiga angka.", "Hitung gambar pada baris yang ditanya.", "📖", 6),
    C("most-least-row", "Baris Terbanyak dan Tersedikit", "hlm. 242 dan 247 (kue yang paling banyak disukai)", "Menemukan baris gambar yang paling banyak dan paling sedikit.", "Tiga ronde, tiap ronde dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk barisnya pada diagram bergambar benda. Letak kunci berpindah.", "Ketuk baris yang paling panjang atau pendek.", "🏆", 6),
    C("more-less-diagram", "Lebihnya dan Kurangnya pada Diagram", "hlm. 242–244 (selisih banyak data)", "Menghitung selisih banyak dua baris pada diagram bergambar benda.", "Tiga ronde, tiap ronde dua soal. Dua baris dari diagram ditampilkan, misalnya kue talam dan lemper. Siswa mengatur penghitung sampai sama dengan selisihnya.", "Cari berapa lebihnya.", "⚖️", 6),
    C("order-rows", "Urutkan Baris Gambar", "hlm. 242 (membandingkan baris gambar)", "Mengurutkan baris gambar benda dari yang paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde tiga atau empat baris bergambar benda. Siswa mengetuk baris satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk baris menurut banyaknya.", "📶", 3),
    C("object-card-to-row", "Kartu Benda ke Baris Gambar", "hlm. 239 (banyak benda dan banyak gambar sama)", "Menaruh kartu kelompok benda ke baris bintang yang banyaknya sama.", "Tiga ronde, tiap ronde tiga kartu kelompok benda dan tiga baris bintang. Siswa mengetuk kartu, lalu mengetuk baris yang banyak bintangnya sama. Letak kartu berpindah.", "Ketuk kartu, lalu ketuk barisnya.", "📥", 9),
    P("read-symbol-row", "Baca Baris Lambang", "hlm. 239 dan 245 (membaca diagram gambar)", "Membaca banyak data dari satu baris lambang.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu baris lambang (bintang, lingkaran, atau hati). Siswa mengatur penghitung sampai sama dengan banyak lambang.", "Hitung lambangnya, lalu tulis banyaknya.", "symbol-read", 3, 2),
    P("color-diagram-from-table", "Warnai Diagram dari Tabel", "hlm. 241 dan 243 (buat diagram gambar dari data)", "Menyusun diagram gambar dari tabel bilangan.", "Tiga ronde. Tiap baris menampilkan nama dan banyaknya. Siswa mengetuk sel untuk mengisi lambang sampai sama dengan banyaknya, lalu menekan Periksa.", "Isi lambang sebanyak datanya.", "symbol-draw", 3, 4),
    P("pick-right-diagram", "Diagram yang Tepat", "hlm. 239–240 (diagram gambar yang menunjukkan banyak data)", "Memilih baris lambang yang banyaknya sama dengan bilangan yang disebut.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat baris lambang. Pengecoh berbeda satu atau dua lambang.", "Ketuk baris yang sama dengan bilangannya.", "symbol-pick", 3, 2),
    P("match-diagram-numeral", "Jodohkan Diagram dan Bilangan", "hlm. 239 dan 245 (diagram menjadi bilangan)", "Menjodohkan baris lambang dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga baris lambang dan tiga bilangan. Siswa mengetuk baris, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau.", "Ketuk baris, lalu ketuk bilangannya.", "symbol-match", 3, 3),
    P("memory-diagram-numeral", "Memori Diagram dan Bilangan", "hlm. 239 (banyak gambar dan bilangannya)", "Mencocokkan baris lambang dengan bilangannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): baris lambang dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari baris dan bilangannya.", "symbol-memory", 3, 4),
    P("order-symbol-rows", "Urutkan Baris Lambang", "hlm. 242 (membandingkan baris)", "Mengurutkan baris lambang dari yang paling pendek atau paling panjang.", "Tiga ronde, tiap ronde empat baris lambang. Siswa mengetuk baris satu per satu menurut panjangnya. Letak jawaban berpindah.", "Ketuk baris menurut panjangnya.", "symbol-order", 3, 4),
    P("read-full-diagram", "Baca Diagram Lengkap", "hlm. 247 dan 245 (warna kesukaan; siswa yang berlari)", "Menjawab pertanyaan dari sebuah diagram gambar lengkap empat baris.", "Tiga ronde, tiap ronde dua soal. Diagram lengkap (warna kesukaan, kaleng, atau siswa berlari) ditampilkan dengan lambang polos. Siswa memilih jawaban dari tiga pilihan.", "Baca diagram, lalu jawab pertanyaannya.", "symbol-full", 3, 2),
    P("fill-count-pictogram", "Lengkapi Banyak pada Diagram", "hlm. 247 (berapa siswa yang menyukai warna merah)", "Melengkapi kolom banyaknya pada diagram gambar.", "Tiga diagram dengan empat baris lambang. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat.", "Isi banyaknya untuk baris yang menyala.", "symbol-table", 3, 4),
    P("number-line-diagram", "Garis Bilangan pada Diagram", "hlm. 242–247 (lebihnya dan kurangnya)", "Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal dari diagram, lalu mengetuk banyak data lain yang sekian lebihnya atau kurangnya pada garis bilangan.", "Ketuk bilangan yang diminta pada garis.", "number-line", 3, 2),
    P("sort-rows", "Pilah Baris", "hlm. 239 (banyak gambar tiap baris)", "Memilah baris lambang menjadi kurang dari lima dan lima atau lebih.", "Tiga ronde, tiap ronde enam baris lambang dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk baris ke kotak yang tepat.", "Pilah baris ke kotak yang tepat.", "symbol-sort", 3, 6),
    A("match-pair-difference", "Jodohkan Pasangan dan Selisih", "hlm. 241 dan 247 (lebihnya dan kurangnya)", "Menjodohkan dua data dengan selisih banyaknya.", "Tiga ronde, tiap ronde tiga pasang. Siswa membaca dua data, misalnya mawar tujuh dan tulip lima, lalu mengetuk selisih yang cocok, yaitu 2.", "Ketuk pasangan data, lalu ketuk selisihnya.", "2", "SELISIH", "lebihnya • kurangnya"),
    A("complete-more-less-sentences", "Lengkapi Kalimat Lebihnya", "hlm. 236–237 dan 247 (lengkapi kalimat sesuai diagram)", "Melengkapi kalimat lebihnya dan kurangnya dengan bilangan yang tepat.", "Dua ronde, tiap ronde tiga kalimat, misalnya banyak bunga tulip ... lebihnya dari banyak bunga lili. Siswa memilih satu dari tiga bilangan.", "Pilih bilangan untuk bagian kosong.", "…", "LENGKAPI", "lebihnya • kurangnya"),
    A("build-diagram-sentence", "Susun Kalimat Diagram Gambar", "hlm. 239 dan 247 (diagram gambar dan keterangan)", "Menyusun kata menjadi kalimat tentang diagram gambar.", "Empat kalimat, misalnya setiap gambar mewakili satu benda. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • diagram"),
    A("build-diagram-from-words", "Buat Diagram dari Kalimat Data", "hlm. 243 (ada 4 anak yang suka bermain karet)", "Menyusun diagram gambar dari kalimat data.", "Tiga ronde. Tiap baris menampilkan kalimat, misalnya ada empat anak yang suka bermain karet. Siswa mengisi lambang sebanyak datanya, lalu menekan Periksa.", "Baca datanya, lalu isi lambangnya.", "★★★", "BUAT DIAGRAM", "kalimat • gambar"),
    A("true-false-diagram", "Benar atau Salah: Diagram", "hlm. 238–247 (membaca diagram gambar)", "Menilai pernyataan tentang diagram gambar.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("riddle-diagram-clues", "Detektif Diagram", "hlm. 245 dan 247 (membaca dan menafsirkan diagram)", "Menemukan kategori diagram dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk seperti banyakku dua kurangnya dari merah, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk.", "Baca semua petunjuk, lalu pilih namanya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-fill-b", "Peta Konsep Diagram Gambar", "hlm. 226 (peta konsep: diagram turus dan diagram gambar)", "Melengkapi peta konsep diagram gambar dan cara membacanya.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "gambar • keterangan • baris"),
    A("order-diagram-data", "Urutkan Data Diagram", "hlm. 242 dan 247 (membandingkan data)", "Mengurutkan nama data menurut banyaknya.", "Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya merah 7. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit.", "Ketuk menurut banyaknya.", "7 > 2", "URUTKAN", "bandingkan banyaknya"),
    A("select-all-diagram", "Ketuk Semua pada Diagram", "hlm. 245 dan 247 (data yang memenuhi syarat)", "Memilih semua data yang memenuhi sebuah syarat.", "Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya kurang dari enam. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "lebih dari • kurang dari"),
    A("add-diagram-total", "Hitung Jumlah pada Diagram", "hlm. 244 dan 245 (jumlah semua; lebih dari dua putaran)", "Menjumlahkan banyak dua atau lebih data pada diagram.", "Tiga ronde, tiap ronde dua soal, misalnya jumlah siswa yang berlari tiga dan empat putaran. Siswa mengatur penghitung sampai sama dengan jumlahnya.", "Jumlahkan datanya, lalu tulis hasilnya.", "4+2", "JUMLAH", "jumlah data"),
  ],
  poin: [
    { ikon: "⭐", nama: "Satu gambar, satu benda", isi: "hitung gambar untuk mengetahui banyaknya", suara: "Pada diagram gambar, satu gambar mewakili satu benda. Kita menghitung gambar untuk mengetahui banyak data." },
    { ikon: "🎨", nama: "Gambar harus sama", isi: "bentuk dan ukuran sama, jarak rapi", suara: "Semua gambar dalam satu diagram harus sama bentuk dan ukurannya, dan tersusun rapi dengan jarak yang sama." },
    { ikon: "📖", nama: "Baca keterangan", isi: "judul, keterangan, nama, baris", suara: "Sebelum membaca diagram, baca judul dan keterangannya. Lalu hitung gambar pada setiap baris dari kiri ke kanan." },
    { ikon: "📏", nama: "Baris terpanjang", isi: "paling banyak", suara: "Baris yang paling panjang menunjukkan data paling banyak, dan baris yang paling pendek menunjukkan data paling sedikit." },
    { ikon: "➕", nama: "Jumlah dan selisih", isi: "gabungkan baris atau bandingkan baris", suara: "Untuk mencari jumlah, gabungkan banyak gambar dua baris atau lebih. Untuk mencari lebihnya atau kurangnya, bandingkan dua baris." },
  ],
  poinSuara:
    "Ingat selalu! Pada diagram gambar, satu gambar mewakili satu benda. Semua gambar dalam satu diagram harus sama bentuk dan ukurannya. Baca judul dan keterangan, lalu hitung gambar pada setiap baris. Baris yang paling panjang menunjukkan data paling banyak. Kita mencari jumlah dengan menggabungkan baris, dan mencari lebihnya atau kurangnya dengan membandingkan dua baris.",
  cara: {
    suara: "Cara menyebutkan. Ada tujuh bunga mawar dan lima bunga tulip. Mawar dua lebihnya dari tulip, dan tulip dua kurangnya dari mawar. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.",
    potongan: [
      { teks: "data", warna: "#BAE6FD" },
      { teks: "bandingkan", warna: "#FDE68A" },
      { teks: "lebihnya", warna: "#7FCB96" },
      { teks: "kurangnya", warna: "#FECACA" },
    ],
  },
  rumah:
    "Ayo Berkarya di rumah: wawancarai dua puluh orang tentang kue tradisional kesukaan mereka. Tulis hasilnya dalam diagram turus, lalu sajikan dalam diagram gambar dengan lambang yang kamu pilih. Tulis kue apa yang disukai teman-temanmu dan kue apa yang paling banyak disukai, lalu presentasikan di depan keluargamu.",
  refleksi: [
    "Aku dapat membaca diagram gambar.",
    "Aku dapat membuat diagram gambar dari data.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

export const SUB_BAB_K2B8: SubBabNaskah[] = [SUB_A8, SUB_B8];

/** Seluruh adegan video Bab 8, urut: A lalu B. */
export const semuaAdeganK2B8 = SUB_BAB_K2B8.flatMap((s) => s.videos.flatMap((v) => v.adegan));
