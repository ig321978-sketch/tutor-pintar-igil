/**
 * Naskah murni Matematika Kelas 2 Bab 3 (Bentuk di Sekitar Kita), Sub-Bab A, B, dan C.
 * Sumber: Buku Siswa Matematika Kelas II Kemendikbudristek, Bab 3 hlm. 65-100, diperkaya dengan metode dari luar
 * buku (tingkat berpikir geometri van Hiele, papan paku Gattegno, tangram, pola blok, tas misteri Montessori,
 * cetak permukaan, lintasan matematika Singapura, dan triangulasi).
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k2-bab3.mjs) memakainya untuk menulis src/data/kelas2-bab3.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k2b3.mjs.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B3_META = {
  chapterId: "k2-mat-bab3",
  phaseCode: "FASE_A",
  grade: 2,
  subjectLabel: "MATEMATIKA - KELAS 2 SD",
  title: "BAB 3: BENTUK DI SEKITAR KITA",
  silabusElemen: "🌈 Fase A • Elemen Geometri (Kelas 2 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

/* ====================================================================== */
/* SUB-BAB A. Bangun datar                                                  */
/* ====================================================================== */

export const SUB_A3: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Bangun Datar)",
  fullTitle: "Sub-Bab A: Bangun Datar",
  targetDescription:
    "Siswa mengelompokkan bangun datar menjadi segi banyak (dibatasi sisi atau garis lurus) dan bentuk lengkung (dibatasi kurva), menghitung banyak sisi untuk menamai segitiga, segi empat, segi lima, dan segi enam, menemukan bentuk-bentuk itu di sekitar, serta membedakan lingkaran dari bentuk lengkung lainnya lewat percobaan mencetak dan memutar.",
  secondaryBg: "#DBEAFE",
  secondaryBorder: "#2563EB",
  secondaryText: "#1E3A8A",
  silabus: {
    teksSuara: `Kita belajar bangun datar. Bukunya bernama Bentuk di Sekitar Kita, bagian bangun datar. Upe menemukan sarang lebah yang permukaannya berbentuk segi enam. Kita mengelompokkan bangun datar menjadi segi banyak dan bentuk lengkung, menghitung sisi untuk menamai segitiga, segi empat, segi lima, dan segi enam, lalu mengenal lingkaran. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa mengelompokkan bangun datar menjadi segi banyak dan bentuk lengkung, menamai segi banyak berdasarkan banyak sisinya (segitiga, segi empat, segi lima, segi enam), menemukan bentuk tersebut di lingkungan sekitar, serta membedakan lingkaran dari bentuk lengkung lainnya.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab A hlm. 65–80).",
  },
  videos: [
    {
      id: "K2B3A-V1",
      judul: "Sarang Lebah Upe",
      subjudul: "Bentuk segi enam yang unik",
      adegan: [
        {
          id: "K2B3A-V1-1",
          judul: "Paman membawa madu",
          ketukan: [
            "Hari ini, Paman berkunjung ke rumah Upe.",
            "Paman datang membawa madu dan sarangnya.",
            "Ini adalah kali pertama Upe melihat sarang lebah.",
            "Ternyata bentuknya sangat unik.",
          ],
          papan: ["Paman datang!", "Madu dan sarangnya", "Sarang lebah pertama", "Bentuknya unik!"],
        },
        {
          id: "K2B3A-V1-2",
          judul: "Permukaan segi enam",
          ketukan: [
            "Permukaan sarang lebah adalah bangun datar yang mempunyai enam sisi.",
            "Upe tidak sabar untuk mencoba memakannya.",
            "Kata Paman, madu mempunyai banyak manfaat untuk tubuh kita.",
            "Apakah kamu juga suka madu seperti Upe?",
          ],
          papan: ["Enam sisi", "Upe tidak sabar", "Madu menyehatkan", "Kamu suka madu?"],
        },
        {
          id: "K2B3A-V1-3",
          judul: "Ayo cari bentuk",
          ketukan: [
            "Sekarang, amati benda-benda di sekitarmu.",
            "Apakah kamu menemukan benda yang mempunyai enam sisi?",
            "Di sub-bab ini, kita belajar mengenal berbagai bangun datar.",
          ],
          papan: ["Amati sekitarmu", "Ada 6 sisi?", "Belajar bangun datar"],
        },
      ],
    },
    {
      id: "K2B3A-V2",
      judul: "Segi Banyak dan Bentuk Lengkung",
      subjudul: "Lihat tepinya",
      adegan: [
        {
          id: "K2B3A-V2-1",
          judul: "Tiga bentuk dasar",
          ketukan: [
            "Di kelas satu, kita sudah mempelajari tiga bentuk dasar.",
            "Ada segitiga, segi empat, dan bentuk lengkung.",
            "Ketiganya dinamakan bangun datar.",
            "Sekarang, kita kelompokkan bangun datar menurut tepinya.",
          ],
          papan: ["Tiga bentuk dasar", "Segitiga, segi empat, lengkung", "Bangun datar", "Lihat tepinya"],
        },
        {
          id: "K2B3A-V2-2",
          judul: "Garis lurus dan sisi",
          ketukan: [
            "Beberapa bangun datar dibatasi oleh garis lurus.",
            "Garis lurus pada bangun datar dinamakan sisi.",
            "Bangun datar yang dibatasi oleh beberapa sisi dinamakan segi banyak.",
            "Contohnya segitiga, segi empat, segi lima, dan segi enam.",
          ],
          papan: ["Dibatasi garis lurus", "Garis lurus = sisi", "Segi banyak", "Contoh segi banyak"],
        },
        {
          id: "K2B3A-V2-3",
          judul: "Kurva dan bentuk lengkung",
          ketukan: [
            "Beberapa bangun datar dibatasi oleh kurva, atau garis lengkung.",
            "Bangun datar yang dibatasi oleh kurva dinamakan bentuk lengkung.",
            "Contohnya lingkaran, bentuk telur, dan bentuk hati.",
            "Jadi, lihat tepinya. Garis lurus berarti segi banyak. Garis lengkung berarti bentuk lengkung.",
          ],
          papan: ["Dibatasi kurva", "Bentuk lengkung", "Lingkaran • telur • hati", "Lihat tepinya!"],
        },
      ],
    },
    {
      id: "K2B3A-V3",
      judul: "Menamai Segi Banyak",
      subjudul: "Banyak sisi menentukan nama",
      adegan: [
        {
          id: "K2B3A-V3-1",
          judul: "Hitung sisinya",
          ketukan: [
            "Banyak sisi pada segi banyak memengaruhi namanya.",
            "Segitiga adalah segi banyak yang memiliki tiga sisi.",
            "Segi empat adalah segi banyak yang memiliki empat sisi.",
            "Bagaimana dengan segi banyak yang punya lima sisi, atau enam sisi?",
          ],
          papan: ["Banyak sisi = nama", "Segitiga: 3 sisi", "Segi empat: 4 sisi", "5 sisi? 6 sisi?"],
        },
        {
          id: "K2B3A-V3-2",
          judul: "Segi lima dan segi enam",
          ketukan: [
            "Segi banyak yang mempunyai lima sisi dinamakan segi lima.",
            "Segi banyak yang mempunyai enam sisi dinamakan segi enam.",
            "Ada segi lima pada bunga morning glory.",
            "Ada segi enam pada sarang lebah.",
            "Kita juga bisa menemukannya pada rumah burung, teh celup, lantai, dan jam dinding.",
          ],
          papan: ["Segi lima: 5 sisi", "Segi enam: 6 sisi", "Bunga morning glory", "Sarang lebah", "Cari di sekitar"],
        },
        {
          id: "K2B3A-V3-3",
          judul: "Lingkaran",
          ketukan: [
            "Sekarang kita mencoba dengan uang logam.",
            "Letakkan uang logam di atas kertas, lalu cetak tepinya.",
            "Putar uang logam di atas cetakannya. Bentuknya selalu pas, ke arah mana pun.",
            "Uang logam adalah contoh lingkaran. Lingkaran adalah bentuk lengkung yang terlihat bulat sempurna.",
          ],
          papan: ["Uang logam", "Cetak tepinya", "Selalu pas!", "Lingkaran: bulat sempurna"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Amati Tepinya",
      stepDesc:
        "Untuk mengenal sebuah bangun datar, amati dulu tepinya. Apakah tepinya garis lurus atau garis lengkung? Dari jawaban itu, kita tahu apakah bangun datar tersebut segi banyak atau bentuk lengkung. Pakai jari untuk menelusuri tepi pelan-pelan. Kebiasaan mengamati ciri sebelum menamai adalah dasar berpikir geometri.",
      icon: "🔍",
      flowFrom: "Amati bentuk",
      flowTo: "Garis lurus dan sisi",
    },
    {
      stepNumber: 2,
      stepTitle: "2. Garis Lurus Jadi Sisi",
      stepDesc:
        "Garis lurus pada tepi bangun datar dinamakan sisi. Bangun datar yang dibatasi oleh beberapa sisi dinamakan segi banyak. Dalam bahasa Yunani, poli berarti banyak. Contoh segi banyak adalah segitiga, segi empat, segi lima, dan segi enam. Ujung tempat dua sisi bertemu adalah pojok, yang juga disebut sudut.",
      icon: "📏",
      flowFrom: "Garis lurus dan sisi",
      flowTo: "Kurva dan bentuk lengkung",
    },
    {
      stepNumber: 3,
      stepTitle: "3. Kurva Jadi Bentuk Lengkung",
      stepDesc:
        "Bangun datar yang tepinya melengkung dinamakan bentuk lengkung. Garis lengkung itu disebut kurva. Contohnya lingkaran, bentuk telur, dan bentuk hati. Bentuk lengkung tidak punya sisi lurus. Jadi, bentuk lengkung tidak termasuk segi banyak.",
      icon: "🌀",
      flowFrom: "Kurva dan bentuk lengkung",
      flowTo: "Hitung sisi",
    },
    {
      stepNumber: 4,
      stepTitle: "4. Hitung Sisi, Sebut Nama",
      stepDesc:
        "Banyak sisi menentukan nama segi banyak. Tiga sisi dinamakan segitiga. Empat sisi dinamakan segi empat. Lima sisi dinamakan segi lima. Enam sisi dinamakan segi enam. Supaya tidak salah hitung, tandai satu sisi sebagai awal, lalu hitung berputar satu arah sampai kembali ke awal. Setiap sisi hanya dihitung satu kali.",
      icon: "🔢",
      flowFrom: "Hitung sisi",
      flowTo: "Pola nama",
    },
    {
      stepNumber: 5,
      stepTitle: "5. Pola Nama Segi Banyak",
      stepDesc:
        "Nama segi banyak punya pola: segi, lalu banyak sisinya. Ada juga segi tujuh yang punya tujuh sisi, dan segi delapan yang punya delapan sisi. Rambu STOP di jalan punya delapan sisi, jadi bentuknya segi delapan. Dengan pola ini, kamu bisa menamai segi banyak apa pun hanya dengan menghitung sisinya.",
      icon: "🧩",
      flowFrom: "Pola nama",
      flowTo: "Bentuk di sekitar",
    },
    {
      stepNumber: 6,
      stepTitle: "6. Bentuk di Alam dan di Rumah",
      stepDesc:
        "Bentuk segi banyak ada di mana-mana. Bunga morning glory berbentuk segi lima. Sarang lebah tersusun dari banyak segi enam. Lebah memakai segi enam karena bentuk itu bisa berdempetan rapat tanpa celah dan hemat bahan sarang. Di rumah, kita menemukan segi lima pada rumah burung dan teh celup, serta segi enam pada ubin lantai dan jam dinding.",
      icon: "🐝",
      flowFrom: "Bentuk di sekitar",
      flowTo: "Lingkaran",
    },
    {
      stepNumber: 7,
      stepTitle: "7. Lingkaran Itu Istimewa",
      stepDesc:
        "Lingkaran adalah bentuk lengkung yang bulat sempurna. Buktikan dengan uang logam. Cetak tepinya di kertas, lalu putar koin di atas cetakan. Koin selalu pas ke arah mana pun. Bentuk lengkung lain, seperti telur atau hati, tidak pas lagi ketika diputar. Itu sebabnya lingkaran istimewa.",
      icon: "⭕",
      flowFrom: "Lingkaran",
      flowTo: "Tiga pertanyaan",
    },
    {
      stepNumber: 8,
      stepTitle: "8. Tiga Pertanyaan Detektif",
      stepDesc:
        "Saat bertemu bangun datar baru, ajukan tiga pertanyaan. Satu, dibatasi oleh apa, garis lurus atau garis lengkung? Dua, kalau garis lurus, berapa sisinya? Tiga, kalau garis lengkung, apakah pas bila diputar? Tiga pertanyaan ini adalah cara kerja detektif bentuk, dan mengikuti tahap berpikir geometri dari mengenali, menggolongkan, sampai menjelaskan ciri.",
      icon: "🕵️",
      flowFrom: "Tiga pertanyaan",
      flowTo: "Bangun datar siap dikenali",
    },
  ],
  infografis: [
    {
      judul: "Sarang Lebah Segi Enam",
      emoji: "🐝",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Paman membawa sarang lebah untuk Upe. Permukaan sarang lebah adalah bangun datar yang mempunyai enam sisi. Bangun datar dengan enam sisi dinamakan segi enam. Lebah membuat sarang dari banyak segi enam yang berdempetan rapat.",
    },
    {
      judul: "Tiga Bentuk Dasar",
      emoji: "🔺",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Di kelas satu kita mengenal tiga bentuk dasar, yaitu segitiga, segi empat, dan bentuk lengkung. Ketiganya adalah bangun datar. Sekarang kita mengelompokkannya menurut tepinya, garis lurus atau garis lengkung.",
    },
    {
      judul: "Garis Lurus dan Sisi",
      emoji: "📏",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Garis lurus pada tepi bangun datar dinamakan sisi. Segitiga ini punya tiga garis lurus, jadi punya tiga sisi. Ujung tempat dua sisi bertemu disebut pojok atau sudut.",
    },
    {
      judul: "Segi Banyak",
      emoji: "⬟",
      countNum: 4,
      countWord: "Empat",
      suara:
        "Bangun datar yang dibatasi oleh beberapa sisi atau garis lurus dinamakan segi banyak. Contohnya segitiga, segi empat, segi lima, dan segi enam. Semua sisinya garis lurus.",
    },
    {
      judul: "Kurva dan Bentuk Lengkung",
      emoji: "🌀",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Bangun datar yang dibatasi oleh kurva atau garis lengkung dinamakan bentuk lengkung. Contohnya lingkaran, bentuk telur, dan bentuk hati. Bentuk lengkung tidak punya sisi lurus.",
    },
    {
      judul: "Banyak Sisi Menentukan Nama",
      emoji: "🔢",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Tiga sisi, segitiga. Empat sisi, segi empat. Lima sisi, segi lima. Enam sisi, segi enam. Hitung sisinya, lalu sebut namanya.",
    },
    {
      judul: "Segi Lima dan Segi Enam di Sekitar Kita",
      emoji: "🏠",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Segi lima ada pada rumah burung, teh celup, dan bunga morning glory. Segi enam ada pada ubin lantai, jam dinding, dan sarang lebah. Coba cari lagi di rumah dan di sekolahmu.",
    },
    {
      judul: "Pola Nama Segi Banyak",
      emoji: "🧩",
      countNum: 8,
      countWord: "Delapan",
      suara:
        "Nama segi banyak mengikuti pola. Tiga sisi segitiga, empat sisi segi empat, lima sisi segi lima, enam sisi segi enam, tujuh sisi segi tujuh, delapan sisi segi delapan. Rambu STOP berbentuk segi delapan.",
    },
    {
      judul: "Lingkaran: Cetak dan Putar",
      emoji: "⭕",
      countNum: 1,
      countWord: "Satu",
      suara:
        "Cetak tepi uang logam di kertas. Putar uang logam di atas cetakannya. Uang logam selalu pas ke arah mana pun, karena lingkaran bulat sempurna. Bentuk telur atau hati tidak selalu pas.",
    },
    {
      judul: "Tiga Pertanyaan Detektif Bentuk",
      emoji: "🕵️",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Tiga pertanyaan detektif bentuk. Satu, dibatasi garis lurus atau garis lengkung. Dua, kalau garis lurus, berapa sisinya. Tiga, kalau garis lengkung, apakah pas bila diputar. Dengan tiga pertanyaan ini kita bisa mengenali bangun datar apa pun.",
    },
  ],
  games: [
    {
      stage: "Concrete",
      gameType: "sort-flat-objects",
      title: "Pilah Benda di Meja",
      bookReference: "hlm. 68–70 (mengelompokkan bangun datar; Ayo Mencoba 1: segi banyak dan bentuk lengkung)",
      objective: "Mengelompokkan benda berbentuk datar menjadi segi banyak dan bentuk lengkung menurut tepinya.",
      mechanicDescription:
        "Dua ronde, masing-masing enam benda (jendela, bendera, ubin sarang lebah, rumah burung, rambu STOP, piring, koin, cermin lonjong, balon hati, dan lainnya). Siswa menyeret atau mengetuk benda ke kotak Segi banyak atau kotak Bentuk lengkung. Benda yang salah kembali disertai petunjuk tepinya.",
      voiceGuide: "Seret benda ke kotak yang sesuai dengan tepinya.",
      emoji: "🪟",
      targetCount: 12,
    },
    {
      stage: "Concrete",
      gameType: "geoboard-rubber-band",
      title: "Papan Paku dan Karet Gelang",
      bookReference: "hlm. 72–73 (banyak sisi menentukan nama: segitiga, segi empat, segi lima, segi enam); papan paku Gattegno",
      objective: "Membentuk segi banyak dengan karet gelang di papan paku dan menghitung sisinya.",
      mechanicDescription:
        "Empat ronde (segitiga, segi empat, segi lima, segi enam). Siswa mengetuk paku satu per satu untuk merentangkan karet, lalu mengetuk paku pertama untuk menutup bentuk. Bentuk harus tertutup, tidak bersilangan, dan banyak sisinya sama dengan yang diminta.",
      voiceGuide: "Ketuk paku satu per satu, lalu tutup di paku pertama.",
      emoji: "📌",
      targetCount: 6,
    },
    {
      stage: "Concrete",
      gameType: "stamp-and-rotate-coin",
      title: "Cetak dan Putar",
      bookReference: "hlm. 76 (Ayo Mencoba 3 nomor 2: cetak uang logam lalu putar di atas cetakannya)",
      objective: "Menemukan sendiri bahwa lingkaran selalu pas bila diputar, sedangkan bentuk lengkung lain tidak.",
      mechanicDescription:
        "Empat ronde (uang logam, tutup botol, telur lonjong, dan balon hati). Siswa menekan Cetak, memutar benda dengan tombol putar, melihat apakah benda selalu menutup cetakannya, lalu memilih lingkaran atau bukan lingkaran.",
      voiceGuide: "Cetak, putar bendanya, lalu putuskan: lingkaran atau bukan.",
      emoji: "🪙",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "find-by-sides",
      title: "Cari Bentuk di Sekitar",
      bookReference: "hlm. 66–67 dan 73 (Sarang Lebah; Tahukah Kalian: segi lima dan segi enam di sekitar kita)",
      objective: "Menemukan benda di sekitar yang berbentuk segitiga, segi empat, segi lima, atau segi enam dengan menghitung sisinya.",
      mechanicDescription:
        "Empat ronde, tiap ronde delapan benda (jam dinding, teh celup, rumah burung, ubin lantai, sarang lebah, jendela, piring, dan lainnya). Siswa mengetuk semua benda yang punya sisi sebanyak yang diminta. Benda yang salah memberi petunjuk banyak sisinya.",
      voiceGuide: "Ketuk semua benda yang punya sisi sebanyak yang diminta.",
      emoji: "🔎",
      targetCount: 8,
    },
    {
      stage: "Picture",
      gameType: "tap-and-count-sides",
      title: "Tandai Setiap Sisi",
      bookReference: "hlm. 72 dan 74–77 (menghitung sisi; Ayo Berlatih nomor 1 dan 2)",
      objective: "Menghitung sisi segi banyak dengan menandai tiap sisi satu kali, lalu menamai bentuknya.",
      mechanicDescription:
        "Empat ronde (segitiga, segi empat miring, segi lima, segi enam). Siswa mengetuk tiap sisi sehingga sisi berwarna dan bernomor, lalu memilih banyak sisi dan nama bentuk. Setiap sisi hanya bisa ditandai satu kali.",
      voiceGuide: "Ketuk setiap sisi satu kali, lalu pilih banyak sisi dan namanya.",
      diagramType: "polygon-edge-marking",
      numberA: 6,
      numberB: 4,
    },
    {
      stage: "Picture",
      gameType: "match-lines-shape-feature",
      title: "Tarik Garis Bangun dan Ciri",
      bookReference: "hlm. 77–79 (Ayo Berlatih nomor 3 dan 4: hubungkan bangun datar dengan ciri-ciri dan namanya)",
      objective: "Menghubungkan bangun datar dengan ciri-cirinya, yaitu banyak sisi atau satu kurva.",
      mechanicDescription:
        "Dua ronde, tiap ronde lima bangun di kiri dan lima ciri di kanan. Siswa mengetuk bangun lalu ciri yang cocok, dan garis penghubung tergambar. Garis yang salah tidak tergambar dan diberi petunjuk.",
      voiceGuide: "Ketuk bangunnya, lalu ketuk cirinya, sampai semua terhubung.",
      diagramType: "match-lines",
      numberA: 5,
      numberB: 5,
    },
    {
      stage: "Picture",
      gameType: "color-by-rule",
      title: "Warnai Bentuk",
      bookReference: "hlm. 79–80 (Ayo Berlatih nomor 5 dan 6: warnai segi empat, warnai lingkaran)",
      objective: "Mewarnai hanya bangun datar yang memenuhi aturan: segi empat, lingkaran, segi lima, atau semua segi banyak.",
      mechanicDescription:
        "Empat ronde (segi empat biru, lingkaran hijau, segi lima merah, semua segi banyak kuning). Siswa mengetuk bentuk untuk mewarnainya, mengetuk lagi untuk menghapus warna, lalu menekan periksa. Jawaban salah dijelaskan bentuk mana yang keliru.",
      voiceGuide: "Warnai hanya bentuk yang sesuai aturan, lalu periksa.",
      diagramType: "color-shapes",
      numberA: 8,
      numberB: 4,
    },
    {
      stage: "Abstract",
      gameType: "fill-table-sides-names",
      title: "Isi Tabel Ciri",
      bookReference: "hlm. 72–73 dan 77 (banyak sisi dan nama; Ayo Berlatih nomor 2: tulis ciri-ciri tiap bangun datar)",
      objective: "Menuliskan hubungan antara nama segi banyak dan banyak sisinya, dua arah.",
      mechanicDescription:
        "Dua ronde. Ronde 1: tulis banyak sisi untuk segitiga, segi empat, segi lima, dan segi enam. Ronde 2: tulis nama dari 3, 5, 6, 4, 8, dan 7 sisi. Siswa mengetuk baris, lalu mengetuk kartu jawaban yang tepat.",
      voiceGuide: "Ketuk baris tabel, lalu pilih kartu yang tepat.",
      symbolLarge: "3 • 4 • 5 • 6",
      wordLarge: "ISI TABEL",
      mathNotation: "sisi dan nama",
    },
    {
      stage: "Abstract",
      gameType: "clue-detective-shapes",
      title: "Detektif Bentuk Misterius",
      bookReference: "hlm. 69–76 (garis lurus, kurva, sisi, segi banyak, bentuk lengkung, lingkaran)",
      objective: "Menemukan nama bangun datar dari dua petunjuk tertulis.",
      mechanicDescription:
        "Empat ronde, tiap ronde dua petunjuk dan tiga pilihan nama. Siswa memilih nama yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru.",
      voiceGuide: "Baca kedua petunjuk, lalu pilih namanya.",
      symbolLarge: "5 sisi",
      wordLarge: "DETEKTIF",
      mathNotation: "dua petunjuk, satu nama",
    },
    {
      stage: "Abstract",
      gameType: "concept-map-fill",
      title: "Peta Konsep Bangun Datar",
      bookReference: "hlm. 80 (Coba Pikirkan: isilah diagram segi banyak)",
      objective: "Melengkapi peta konsep dengan definisi, ciri, dan contoh segi banyak dan bentuk lengkung.",
      mechanicDescription:
        "Dua peta konsep, satu untuk segi banyak dan satu untuk bentuk lengkung. Tiap peta punya empat kotak: definisi, dua ciri, dan contoh. Siswa memilih kartu yang tepat untuk kotak yang menyala.",
      voiceGuide: "Pilih kartu yang tepat untuk kotak yang menyala.",
      symbolLarge: "segi banyak",
      wordLarge: "PETA KONSEP",
      mathNotation: "definisi • ciri • contoh",
    },
  ],
  poin: [
    {
      ikon: "📏",
      nama: "Segi banyak",
      isi: "dibatasi sisi atau garis lurus",
      suara: "Segi banyak adalah bangun datar yang dibatasi oleh beberapa sisi atau garis lurus. Contohnya segitiga, segi empat, segi lima, dan segi enam.",
    },
    {
      ikon: "🌀",
      nama: "Bentuk lengkung",
      isi: "dibatasi kurva atau garis lengkung",
      suara: "Bentuk lengkung adalah bangun datar yang dibatasi oleh kurva atau garis lengkung. Contohnya lingkaran, bentuk telur, dan bentuk hati.",
    },
    {
      ikon: "🔢",
      nama: "Banyak sisi, nama",
      isi: "3 segitiga • 4 segi empat • 5 segi lima • 6 segi enam",
      suara: "Banyak sisi menentukan nama. Tiga sisi segitiga, empat sisi segi empat, lima sisi segi lima, enam sisi segi enam.",
    },
    {
      ikon: "⭕",
      nama: "Lingkaran",
      isi: "bulat sempurna, selalu pas bila diputar",
      suara: "Lingkaran adalah bentuk lengkung yang bulat sempurna. Lingkaran selalu pas ketika diputar di atas cetakannya.",
    },
    {
      ikon: "🕵️",
      nama: "Tiga pertanyaan",
      isi: "garis lurus? berapa sisi? pas diputar?",
      suara: "Tiga pertanyaan detektif bentuk. Dibatasi garis lurus atau lengkung. Berapa sisinya. Pas atau tidak bila diputar.",
    },
  ],
  poinSuara:
    "Ingat selalu! Bangun datar yang dibatasi garis lurus disebut segi banyak, dan garis lurusnya disebut sisi. Bangun datar yang dibatasi garis lengkung disebut bentuk lengkung. Banyak sisi menentukan nama: tiga segitiga, empat segi empat, lima segi lima, enam segi enam. Lingkaran bulat sempurna dan selalu pas bila diputar.",
  cara: {
    suara: "Cara menyebutkan bentuk. Sarang lebah berbentuk segi enam karena mempunyai enam sisi.",
    potongan: [
      { teks: "Sarang lebah berbentuk", warna: "#FFFFFF" },
      { teks: "segi enam", warna: "#FFE566" },
      { teks: "karena punya", warna: "#FFFFFF" },
      { teks: "6 sisi", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: cari lima benda yang berbentuk segi banyak dan dua benda yang berbentuk lengkung. Hitung sisi tiap segi banyak, lalu sebutkan namanya kepada keluargamu. Cetak tepi sebuah koin dan putar koin di atas cetakannya.",
  refleksi: [
    "Aku dapat membedakan segi banyak dan bentuk lengkung.",
    "Aku dapat membedakan segi banyak berdasarkan sisinya.",
    "Aku dapat menunjukkan perbedaan lingkaran dengan bentuk lengkung lainnya.",
    "Aku belajar dengan senang hati.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Mengurai dan menyusun bangun datar                           */
/* ====================================================================== */

export const SUB_B3: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Mengurai dan Menyusun)",
  fullTitle: "Sub-Bab B: Mengurai dan Menyusun Bangun Datar",
  targetDescription:
    "Siswa mengurai satu bangun datar menjadi beberapa bentuk baru dengan menarik garis, menyusun beberapa bangun datar menjadi satu bentuk, menjelaskan bahwa cara mengurai dan menyusun memengaruhi hasilnya, menghitung jenis keping hasil uraian, menemukan pola banyak segitiga pada segi banyak, serta bermain tangram.",
  secondaryBg: "#FCE7F3",
  secondaryBorder: "#DB2777",
  secondaryText: "#831843",
  silabus: {
    teksSuara: `Kita belajar mengurai dan menyusun bangun datar. Bukunya bernama Bentuk di Sekitar Kita, bagian mengurai dan menyusun. Kita mengurai satu bangun datar menjadi beberapa bentuk baru, dan menyusun beberapa bangun datar menjadi satu bentuk. Cara yang kita pakai memengaruhi hasilnya. Kita juga bermain tangram. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa mengurai satu bangun datar menjadi beberapa bangun datar, menyusun beberapa bangun datar menjadi satu bentuk, menjelaskan bahwa cara yang dipakai memengaruhi hasil, serta membuat bentuk kreatif dengan tangram.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab B hlm. 81–89 dan Ayo Berkarya hlm. 99).",
  },
  videos: [
    {
      id: "K2B3B-V1",
      judul: "Mengurai Bangun Datar",
      subjudul: "Satu bangun menjadi banyak bagian",
      adegan: [
        {
          id: "K2B3B-V1-1",
          judul: "Satu bangun, banyak bagian",
          ketukan: [
            "Sekarang kita belajar mengurai sebuah bangun datar.",
            "Mengurai artinya membagi satu bangun menjadi beberapa bentuk yang lebih kecil.",
            "Kita bisa menarik garis untuk menguraikannya.",
            "Bentuk apa yang dihasilkan jika kita urai bangun ini?",
          ],
          papan: ["Mengurai bangun", "Satu jadi banyak", "Tarik garis", "Apa hasilnya?"],
        },
        {
          id: "K2B3B-V1-2",
          judul: "Dua segitiga dan satu segi empat",
          ketukan: [
            "Kita urai bangun ini dengan menarik dua garis.",
            "Hasilnya dua segitiga dan satu segi empat.",
            "Kita juga bisa menguraikan bangun yang sama dengan cara lain.",
            "Dengan cara lain, hasilnya dua segitiga dan dua segi empat.",
          ],
          papan: ["Tarik dua garis", "2 segitiga + 1 segi empat", "Cara lain", "2 segitiga + 2 segi empat"],
        },
        {
          id: "K2B3B-V1-3",
          judul: "Cara memengaruhi hasil",
          ketukan: [
            "Ketika mengurai sebuah bangun datar, kita dapat memakai beberapa cara.",
            "Cara yang kita pakai akan memengaruhi hasilnya.",
            "Sebuah persegi bisa diurai dengan garis miring menjadi dua segitiga.",
            "Persegi yang sama bisa diurai dengan garis lurus di tengah menjadi dua segi empat.",
          ],
          papan: ["Banyak cara", "Cara memengaruhi hasil", "Persegi → 2 segitiga", "Persegi → 2 segi empat"],
        },
      ],
    },
    {
      id: "K2B3B-V2",
      judul: "Menyusun Bangun Datar",
      subjudul: "Banyak bangun menjadi satu",
      adegan: [
        {
          id: "K2B3B-V2-1",
          judul: "Beberapa bangun jadi satu",
          ketukan: [
            "Sekarang kita belajar menyusun bangun datar.",
            "Menyusun artinya menggabungkan beberapa bangun datar menjadi satu bentuk baru.",
            "Ada dua segitiga dan satu segi empat.",
            "Bentuk apa yang dihasilkan jika kita menyusunnya?",
          ],
          papan: ["Menyusun bangun", "Banyak jadi satu", "2 segitiga + 1 segi empat", "Apa hasilnya?"],
        },
        {
          id: "K2B3B-V2-2",
          judul: "Dua segitiga dan satu segi empat",
          ketukan: [
            "Kita susun dua segitiga di kiri dan kanan segi empat.",
            "Hasilnya sebuah segi enam yang memanjang.",
            "Kita bisa menyusunnya dengan cara lain.",
            "Kali ini, kedua segitiga disusun di atas dan di bawah segi empat.",
          ],
          papan: ["Segitiga kiri dan kanan", "Hasil: segi enam", "Cara lain", "Segitiga atas dan bawah"],
        },
        {
          id: "K2B3B-V2-3",
          judul: "Cara memengaruhi hasil",
          ketukan: [
            "Ketika menyusun bangun datar, kita dapat menemukan beberapa bentuk yang berbeda.",
            "Cara kita menyusunnya akan memengaruhi hasilnya.",
            "Dua segitiga siku-siku yang sama bisa disusun menjadi sebuah persegi.",
            "Dua segitiga yang sama juga bisa disusun menjadi sebuah segitiga yang lebih besar.",
          ],
          papan: ["Hasil berbeda-beda", "Cara memengaruhi hasil", "2 segitiga → persegi", "2 segitiga → segitiga besar"],
        },
      ],
    },
    {
      id: "K2B3B-V3",
      judul: "Bermain Tangram",
      subjudul: "Tujuh keping, seribu bentuk",
      adegan: [
        {
          id: "K2B3B-V3-1",
          judul: "Mengenal tangram",
          ketukan: [
            "Tangram adalah permainan menyusun bangun datar.",
            "Satu persegi besar dipotong menjadi tujuh keping.",
            "Ada lima segitiga, satu persegi, dan satu segi empat miring.",
            "Keping-keping itu bisa disusun menjadi rumah, perahu, kucing, dan banyak bentuk lain.",
          ],
          papan: ["Permainan tangram", "7 keping", "5 segitiga, persegi, miring", "Banyak bentuk"],
        },
        {
          id: "K2B3B-V3-2",
          judul: "Aturan main",
          ketukan: [
            "Aturan tangram, pakai semua keping.",
            "Keping tidak boleh bertumpuk.",
            "Keping harus saling menempel pada sisinya.",
            "Kita boleh memutar dan membalik keping.",
          ],
          papan: ["Pakai semua keping", "Tidak bertumpuk", "Sisi saling menempel", "Putar dan balik"],
        },
        {
          id: "K2B3B-V3-3",
          judul: "Mengurai dan menyusun berkaitan",
          ketukan: [
            "Mengurai dan menyusun adalah dua kegiatan yang saling berlawanan.",
            "Persegi besar diurai menjadi tujuh keping.",
            "Tujuh keping disusun kembali menjadi persegi besar.",
            "Banyak keping tetap tujuh, apa pun bentuk hasil susunannya.",
          ],
          papan: ["Saling berlawanan", "Mengurai: 1 → 7", "Menyusun: 7 → 1", "Tetap 7 keping"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengurai: Satu Jadi Banyak",
      stepDesc:
        "Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil. Kita menguraikannya dengan menarik garis. Hasil uraian bisa berupa segitiga, segi empat, atau bentuk lain. Bayangkan memotong kertas sesuai garis: bentuknya berubah menjadi bagian-bagian baru.",
      icon: "✂️",
      flowFrom: "Mengurai",
      flowTo: "Tarik garis pengurai",
    },
    {
      stepNumber: 2,
      stepTitle: "2. Tarik Garis Pengurai",
      stepDesc:
        "Garis pengurai biasanya dari satu pojok ke pojok lain, atau dari pojok ke titik di sisi, atau dari titik tengah ke pojok. Garis tidak boleh saling bersilangan di tengah supaya hasilnya rapi. Setelah menarik garis, hitung bagiannya, lalu sebut nama tiap bagian berdasarkan banyak sisinya.",
      icon: "📏",
      flowFrom: "Tarik garis pengurai",
      flowTo: "Hasil bergantung cara",
    },
    {
      stepNumber: 3,
      stepTitle: "3. Hasil Bergantung pada Cara",
      stepDesc:
        "Satu bangun datar bisa diurai dengan cara yang berbeda, dan hasilnya ikut berbeda. Bangun yang sama bisa menjadi dua segitiga dan satu segi empat, atau dua segitiga dan dua segi empat. Tidak ada satu cara yang paling benar. Yang penting, hasilnya sesuai dengan garis yang kita tarik.",
      icon: "🎯",
      flowFrom: "Hasil bergantung cara",
      flowTo: "Persegi dua cara",
    },
    {
      stepNumber: 4,
      stepTitle: "4. Persegi Bisa Diurai Dua Cara",
      stepDesc:
        "Sebuah persegi dapat diurai dengan garis miring dari pojok ke pojok. Hasilnya dua segitiga yang sama besar. Persegi yang sama dapat diurai dengan garis lurus di tengah. Hasilnya dua segi empat yang sama besar. Dua cara, dua hasil berbeda, dari satu bangun yang sama.",
      icon: "◩",
      flowFrom: "Persegi dua cara",
      flowTo: "Menyusun",
    },
    {
      stepNumber: 5,
      stepTitle: "5. Menyusun: Banyak Jadi Satu",
      stepDesc:
        "Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Dua segitiga dan satu segi empat bisa disusun menjadi segi enam yang memanjang. Dua segitiga siku-siku yang sama bisa disusun menjadi persegi, segitiga yang lebih besar, atau segi empat miring. Cara menyusun memengaruhi hasilnya.",
      icon: "🧩",
      flowFrom: "Menyusun",
      flowTo: "Rapat tanpa tumpang",
    },
    {
      stepNumber: 6,
      stepTitle: "6. Rapat, Tanpa Celah, Tanpa Tumpang",
      stepDesc:
        "Saat menyusun, keping harus saling menempel pada sisinya. Tidak boleh ada celah, dan tidak boleh ada keping yang bertumpuk. Keping boleh diputar atau dibalik. Aturan ini sama dengan aturan tangram, permainan dari Tiongkok yang memakai tujuh keping dan sudah dimainkan ratusan tahun.",
      icon: "⬛",
      flowFrom: "Rapat tanpa tumpang",
      flowTo: "Segi banyak jadi segitiga",
    },
    {
      stepNumber: 7,
      stepTitle: "7. Segi Banyak Jadi Segitiga",
      stepDesc:
        "Segi banyak apa pun bisa diurai menjadi segitiga. Dari satu pojok, segitiga punya 1 keping, segi empat 2, segi lima 3, dan segi enam 4. Polanya banyak sisi dikurangi 2. Kalau garis ditarik dari titik tengah ke setiap pojok, segi lima menjadi 5 segitiga dan segi enam menjadi 6 segitiga. Segitiga adalah batu bata dasar semua segi banyak.",
      icon: "🔺",
      flowFrom: "Segi banyak jadi segitiga",
      flowTo: "Tangram dan pola blok",
    },
    {
      stepNumber: 8,
      stepTitle: "8. Tangram dan Pola Blok",
      stepDesc:
        "Tangram membantu kita berlatih mengurai dan menyusun. Satu persegi besar dipotong menjadi tujuh keping, lalu disusun lagi menjadi rumah, perahu, kucing, atau bentuk kreasimu. Di banyak sekolah di dunia, anak memakai pola blok untuk latihan serupa. Berlatih menyusun bentuk melatih mata untuk melihat bagian di dalam sebuah bangun.",
      icon: "🧠",
      flowFrom: "Tangram dan pola blok",
      flowTo: "Mengurai dan menyusun siap dipakai",
    },
  ],
  infografis: [
    {
      judul: "Mengurai Satu Bangun",
      emoji: "✂️",
      countNum: 2,
      countWord: "Dua",
      suara:
        "Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil. Kita menarik garis, lalu melihat bentuk apa yang dihasilkan. Satu persegi dengan satu garis miring menjadi dua segitiga.",
    },
    {
      judul: "Persegi Diurai Dua Cara",
      emoji: "◩",
      countNum: 2,
      countWord: "Dua",
      suara:
        "Persegi dapat diurai dengan garis miring menjadi dua segitiga. Persegi yang sama dapat diurai dengan garis lurus di tengah menjadi dua segi empat. Dua cara, dua hasil berbeda.",
    },
    {
      judul: "Dua Segitiga dan Satu Segi Empat",
      emoji: "🔷",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Sebuah bangun diurai dengan dua garis menjadi dua segitiga dan satu segi empat. Dengan cara lain, bangun yang sama bisa menjadi dua segitiga dan dua segi empat. Cara menentukan hasil.",
    },
    {
      judul: "Menyusun Beberapa Bangun",
      emoji: "🧩",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Dua segitiga dan satu segi empat bisa disusun menjadi segi enam yang memanjang.",
    },
    {
      judul: "Dua Segitiga, Tiga Bentuk",
      emoji: "🔺",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Dua segitiga siku-siku yang sama bisa disusun menjadi tiga bentuk. Sisi miring ditempelkan, jadinya persegi. Sisi pendek ditempelkan menghadap, jadinya segitiga yang lebih besar. Sisi pendek ditempelkan berlawanan, jadinya segi empat miring.",
    },
    {
      judul: "Cara Memengaruhi Hasil",
      emoji: "🎯",
      countNum: 2,
      countWord: "Dua",
      suara:
        "Baik saat mengurai maupun saat menyusun, cara yang kita pakai memengaruhi hasilnya. Satu bangun bisa punya banyak uraian. Beberapa keping bisa punya banyak susunan.",
    },
    {
      judul: "Segi Banyak Dibagi Jadi Segitiga",
      emoji: "🔺",
      countNum: 4,
      countWord: "Empat",
      suara:
        "Dari satu pojok, segitiga menjadi satu keping, segi empat menjadi dua segitiga, segi lima menjadi tiga segitiga, dan segi enam menjadi empat segitiga. Banyak segitiga sama dengan banyak sisi dikurangi dua.",
    },
    {
      judul: "Dari Titik Tengah",
      emoji: "⬡",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Kalau garis ditarik dari titik tengah ke setiap pojok, segi lima menjadi lima segitiga dan segi enam menjadi enam segitiga. Banyak segitiga sama dengan banyak sisinya.",
    },
    {
      judul: "Tangram Tujuh Keping",
      emoji: "🐱",
      countNum: 7,
      countWord: "Tujuh",
      suara:
        "Tangram terdiri dari tujuh keping: lima segitiga, satu persegi, dan satu segi empat miring. Satu persegi besar diurai menjadi tujuh keping, lalu disusun menjadi rumah, perahu, kucing, atau bentukmu sendiri.",
    },
    {
      judul: "Aturan Bermain dan Tips",
      emoji: "📜",
      countNum: 4,
      countWord: "Empat",
      suara:
        "Aturan menyusun: pakai semua keping, jangan bertumpuk, sisi harus menempel, dan boleh diputar atau dibalik. Tips: mulai dari keping yang paling besar, lalu isi bagian yang tersisa dengan keping yang lebih kecil.",
    },
  ],
  games: [
    {
      stage: "Concrete",
      gameType: "cut-paper-along-lines",
      title: "Gunting Kertas",
      bookReference: "hlm. 81–82 (mengurai bangun datar; contoh persegi diurai menjadi dua segitiga atau dua segi empat)",
      objective: "Mengurai kertas dengan menggunting sepanjang garis putus-putus dan menamai keping hasilnya.",
      mechanicDescription:
        "Empat ronde (persegi menjadi 2 segitiga, persegi menjadi 2 segi empat, persegi panjang menjadi 2 segitiga, dan persegi panjang menjadi 2 segitiga dan 1 segi empat). Siswa mengetuk garis putus-putus untuk menggunting. Keping terpisah dan diberi nama. Bila hasilnya belum sesuai, kertas bisa disatukan lagi.",
      voiceGuide: "Ketuk garis putus-putus untuk menggunting, lalu lihat kepingnya.",
      emoji: "✂️",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "drag-pieces-to-silhouette",
      title: "Susun Keping di Papan",
      bookReference: "hlm. 83–84 (menyusun bangun datar; dua segitiga dan satu segi empat)",
      objective: "Menyusun keping bangun datar menjadi bentuk yang diminta dengan menyeretnya ke bayangan.",
      mechanicDescription:
        "Empat ronde (persegi dari 2 segitiga, rumah, perahu, dan pohon cemara). Keping ada di nampan, bayangan bentuk ada di papan. Siswa menyeret keping ke tempat yang sesuai bentuknya, atau mengetuk keping lalu mengetuk tempatnya. Tempat yang salah ditolak disertai petunjuk.",
      voiceGuide: "Seret keping ke bayangan yang bentuknya sama.",
      emoji: "🧩",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "tap-pieces-apart-and-count",
      title: "Bongkar Bangunan Mainan",
      bookReference: "hlm. 81–85 (mengurai bangun datar menjadi bentuk baru, lalu menyebut hasilnya)",
      objective: "Membongkar bangunan mainan menjadi kepingnya dan menghitung banyak segitiga dan segi empat.",
      mechanicDescription:
        "Tiga ronde (rumah, perahu, pohon cemara). Siswa mengetuk tiap keping sehingga keping terlepas dari bangunan. Setelah semua terlepas, siswa mengatur banyak segitiga dan banyak segi empat, lalu menekan periksa.",
      voiceGuide: "Ketuk keping untuk membongkar, lalu hitung segitiga dan segi empat.",
      emoji: "🏠",
      targetCount: 3,
    },
    {
      stage: "Concrete",
      gameType: "explore-join-two-triangles",
      title: "Dua Segitiga, Tiga Bentuk",
      bookReference: "hlm. 84 (Ayo Mencoba 2: susun dua segitiga dengan cara berbeda) dan hlm. 83",
      objective: "Menemukan tiga bentuk berbeda dari dua segitiga siku-siku yang sama dengan menempelkan sisi yang berbeda.",
      mechanicDescription:
        "Satu ronde penjelajahan. Siswa menekan tiga tombol tempel: sisi miring, sisi pendek menghadap, dan sisi pendek berlawanan. Tiap tombol menampilkan bentuk hasil. Siswa menamai tiap hasil dari tiga pilihan sampai ketiganya ditemukan.",
      voiceGuide: "Coba tiga cara menempel, lalu beri nama tiap hasil.",
      emoji: "🔺",
      targetCount: 3,
    },
    {
      stage: "Picture",
      gameType: "draw-dividing-lines",
      title: "Garis Pengurai",
      bookReference: "hlm. 87–89 (Ayo Berlatih nomor 4 dan 5; Coba Pikirkan: buat garis agar menjadi 3, 5, atau 6 segitiga dan 2 segitiga 2 segi empat)",
      objective: "Menarik garis pada bangun datar supaya terurai menjadi keping yang diminta.",
      mechanicDescription:
        "Empat ronde (belah ketupat menjadi 3 segitiga, segi lima menjadi 5 segitiga, segi enam menjadi 6 segitiga, dan persegi panjang menjadi 2 segitiga dan 2 segi empat). Siswa mengetuk dua titik untuk menarik garis. Garis yang bersilangan ditolak. Layar menghitung keping hasil, lalu siswa menekan periksa.",
      voiceGuide: "Ketuk dua titik untuk menarik garis, lalu periksa hasilnya.",
      diagramType: "draw-lines-on-polygon",
      numberA: 6,
      numberB: 4,
    },
    {
      stage: "Picture",
      gameType: "select-possible-composites",
      title: "Hasil Susunan yang Mungkin",
      bookReference: "hlm. 83–85 (menyusun bangun datar; Ayo Berlatih nomor 2: tarik garis hasil susunan)",
      objective: "Memilih semua bentuk yang bisa dibuat dari keping-keping yang diberikan.",
      mechanicDescription:
        "Tiga ronde (dua segitiga siku-siku, satu persegi dan satu segitiga, serta dua segitiga dan satu segi empat). Tiap ronde ada empat bentuk. Siswa memilih semua bentuk yang bisa disusun dari keping, lalu menekan periksa. Bentuk yang tidak mungkin punya luas berbeda dari jumlah keping.",
      voiceGuide: "Pilih semua bentuk yang bisa disusun dari kepingnya.",
      diagramType: "select-composites",
      numberA: 3,
      numberB: 4,
    },
    {
      stage: "Picture",
      gameType: "count-pieces-from-diagram",
      title: "Hitung Keping",
      bookReference: "hlm. 81 dan 86–88 (mengurai bangun datar; hasil uraian)",
      objective: "Menghitung banyak segitiga dan segi empat dari diagram bangun yang sudah diurai.",
      mechanicDescription:
        "Empat ronde (persegi dengan satu diagonal, persegi panjang dengan dua garis, segi enam dengan tiga garis dari titik tengah, dan segi lima dengan lima garis dari titik tengah). Siswa mengatur banyak segitiga dan segi empat dengan tombol tambah dan kurang, lalu menekan periksa.",
      voiceGuide: "Hitung segitiga dan segi empat pada diagram, lalu periksa.",
      diagramType: "count-pieces",
      numberA: 5,
      numberB: 4,
    },
    {
      stage: "Abstract",
      gameType: "fill-sentence-blanks",
      title: "Isi Kalimat Uraian",
      bookReference: "hlm. 81–84 (kalimat: kita dapat mengurai bangun menjadi 2 segitiga dan 1 segi empat)",
      objective: "Melengkapi kalimat tentang hasil mengurai dan menyusun dengan angka dan nama bentuk yang tepat.",
      mechanicDescription:
        "Dua ronde, tiap ronde tiga kalimat dengan bagian kosong. Contoh: persegi diurai dengan garis miring menjadi ... segitiga. Siswa memilih satu dari tiga kartu untuk tiap bagian kosong.",
      voiceGuide: "Pilih kartu yang tepat untuk bagian kosong kalimat.",
      symbolLarge: "1 → 2",
      wordLarge: "KALIMAT URAIAN",
      mathNotation: "mengurai dan menyusun",
    },
    {
      stage: "Abstract",
      gameType: "sort-statements-two-bins",
      title: "Mengurai atau Menyusun?",
      bookReference: "hlm. 81–85 (mengurai: satu menjadi banyak; menyusun: banyak menjadi satu)",
      objective: "Menentukan kalimat yang menggambarkan kegiatan mengurai dan kalimat yang menggambarkan kegiatan menyusun.",
      mechanicDescription:
        "Dua ronde, masing-masing empat kalimat. Siswa menyeret atau mengetuk kalimat ke kotak Mengurai (satu menjadi banyak) atau kotak Menyusun (banyak menjadi satu). Kalimat yang salah kembali disertai penjelasan.",
      voiceGuide: "Satu menjadi banyak berarti mengurai. Banyak menjadi satu berarti menyusun.",
      symbolLarge: "1 → ? • ? → 1",
      wordLarge: "URAI ATAU SUSUN",
      mathNotation: "mengurai • menyusun",
    },
    {
      stage: "Abstract",
      gameType: "pattern-table-triangles",
      title: "Tabel Pola Segitiga",
      bookReference: "hlm. 89 (Coba Pikirkan nomor 2 sampai 4: 3, 5, dan 6 segitiga), diperkaya pola triangulasi",
      objective: "Menemukan pola banyak segitiga pada segi banyak: banyak sisi dikurangi dua dari satu pojok, dan sama dengan banyak sisi dari titik tengah.",
      mechanicDescription:
        "Dua ronde. Ronde 1: garis dari satu pojok untuk segitiga, segi empat, segi lima, dan segi enam. Ronde 2: garis dari titik tengah. Siswa mengetuk baris tabel, lalu memilih kartu angka yang tepat.",
      voiceGuide: "Ketuk baris tabel, lalu pilih banyak segitiganya.",
      symbolLarge: "n − 2",
      wordLarge: "POLA SEGITIGA",
      mathNotation: "dari pojok: n − 2 • dari tengah: n",
    },
  ],
  poin: [
    {
      ikon: "✂️",
      nama: "Mengurai",
      isi: "satu bangun menjadi beberapa bentuk",
      suara: "Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil dengan menarik garis.",
    },
    {
      ikon: "🧩",
      nama: "Menyusun",
      isi: "beberapa bangun menjadi satu bentuk",
      suara: "Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Keping harus menempel pada sisinya dan tidak boleh bertumpuk.",
    },
    {
      ikon: "🎯",
      nama: "Cara memengaruhi hasil",
      isi: "cara beda, hasil beda",
      suara: "Cara mengurai atau menyusun memengaruhi hasilnya. Persegi bisa menjadi dua segitiga atau dua segi empat.",
    },
    {
      ikon: "🔺",
      nama: "Pola segitiga",
      isi: "dari pojok: sisi − 2 • dari tengah: sisi",
      suara: "Dari satu pojok, banyak segitiga sama dengan banyak sisi dikurangi dua. Dari titik tengah, banyak segitiga sama dengan banyak sisi.",
    },
    {
      ikon: "🐱",
      nama: "Tangram",
      isi: "7 keping, pakai semuanya",
      suara: "Tangram terdiri dari tujuh keping. Pakai semua keping, jangan bertumpuk, dan sisi harus menempel.",
    },
  ],
  poinSuara:
    "Ingat selalu! Mengurai berarti satu bangun menjadi beberapa bentuk. Menyusun berarti beberapa bangun menjadi satu bentuk. Cara yang dipakai memengaruhi hasilnya. Dari satu pojok, banyak segitiga sama dengan banyak sisi dikurangi dua. Dari titik tengah, banyak segitiga sama dengan banyak sisi. Pada tangram, pakai semua keping dan jangan bertumpuk.",
  cara: {
    suara: "Cara menyebutkan hasil uraian. Persegi diurai dengan garis miring menjadi dua segitiga.",
    potongan: [
      { teks: "Persegi diurai menjadi", warna: "#FFFFFF" },
      { teks: "2", warna: "#FFE566" },
      { teks: "segitiga", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: gunting selembar kertas berbentuk persegi, lalu gunting menjadi dua segitiga atau dua segi empat. Susun kembali menjadi bentuk lain. Kalau ada kertas bekas, buat tangram dan susun menjadi bentuk kesukaanmu, lalu ceritakan kepada keluargamu.",
  refleksi: [
    "Aku dapat mengurai satu bangun datar menjadi beberapa bangun datar.",
    "Aku dapat menyusun beberapa bangun datar menjadi satu bentuk.",
    "Aku dapat menjelaskan bahwa cara yang dipakai memengaruhi hasilnya.",
    "Aku belajar dengan tertib.",
  ],
};

/* ====================================================================== */
/* SUB-BAB C. Bangun ruang                                                  */
/* ====================================================================== */

export const SUB_C3: SubBabNaskah = {
  id: "C",
  codeTitle: "Sub-Bab C (Bangun Ruang)",
  fullTitle: "Sub-Bab C: Bangun Ruang",
  targetDescription:
    "Siswa membedakan bangun datar dan bangun ruang, menjelaskan bahwa bangun ruang punya ruang di dalam yang dapat diisi, mengelompokkan bangun ruang menurut permukaan datar atau lengkung lewat percobaan menggelindingkan, menamai kubus, balok, tabung, kerucut, dan bola menurut cirinya, serta menemukan benda berbentuk bangun ruang di sekitar.",
  secondaryBg: "#DCFCE7",
  secondaryBorder: "#16A34A",
  secondaryText: "#14532D",
  silabus: {
    teksSuara: `Kita belajar bangun ruang. Bukunya bernama Bentuk di Sekitar Kita, bagian bangun ruang. Kita membedakan bangun datar dan bangun ruang, mencoba menggelindingkan benda untuk mengenal permukaan datar dan lengkung, lalu menamai kubus, balok, tabung, kerucut, dan bola. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membedakan bangun datar dan bangun ruang, mengelompokkan bangun ruang berdasarkan permukaan datar atau lengkung, serta menamai kubus, balok, tabung, kerucut, dan bola sesuai ciri-cirinya.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab C hlm. 90–94).",
  },
  videos: [
    {
      id: "K2B3C-V1",
      judul: "Bangun Datar dan Bangun Ruang",
      subjudul: "Apa bedanya?",
      adegan: [
        {
          id: "K2B3C-V1-1",
          judul: "Benda di sekitar kita",
          ketukan: [
            "Amati benda-benda di sekitar kita.",
            "Ada topi ulang tahun, kubus warna-warni, botol minum, dan bola.",
            "Ada juga bentuk segitiga, segi empat, dan lingkaran yang tipis.",
            "Bagaimana cara kita mengelompokkannya?",
          ],
          papan: ["Amati benda", "Topi, kubus, botol, bola", "Bentuk tipis", "Bagaimana mengelompokkan?"],
        },
        {
          id: "K2B3C-V1-2",
          judul: "Bangun datar",
          ketukan: [
            "Bentuk benda dibedakan menjadi bangun datar dan bangun ruang.",
            "Bangun datar hanya mempunyai satu permukaan.",
            "Contohnya lingkaran, segi empat, dan segitiga.",
            "Bangun datar itu tipis, jadi tidak bisa diisi.",
          ],
          papan: ["Datar dan ruang", "Satu permukaan", "Contoh bangun datar", "Tidak bisa diisi"],
        },
        {
          id: "K2B3C-V1-3",
          judul: "Bangun ruang",
          ketukan: [
            "Bangun ruang punya ruang di dalamnya, jadi dapat diisi.",
            "Contohnya kotak, kubus, topi, dan botol.",
            "Kotak, kubus, dan botol punya beberapa permukaan.",
            "Jadi, kalau benda itu bisa diisi, benda itu adalah bangun ruang.",
          ],
          papan: ["Ada ruang di dalam", "Kotak • kubus • topi • botol", "Banyak permukaan", "Bisa diisi = bangun ruang"],
        },
      ],
    },
    {
      id: "K2B3C-V2",
      judul: "Menggelinding atau Tidak?",
      subjudul: "Permukaan datar dan lengkung",
      adegan: [
        {
          id: "K2B3C-V2-1",
          judul: "Gelindingkan benda",
          ketukan: [
            "Ambil kerucut, kubus, botol, kotak, dan bola.",
            "Coba gelindingkan benda-benda tersebut.",
            "Bola dan botol mudah menggelinding.",
            "Kubus dan kotak tidak mau menggelinding.",
          ],
          papan: ["Ambil lima benda", "Gelindingkan!", "Bola dan botol menggelinding", "Kubus dan kotak diam"],
        },
        {
          id: "K2B3C-V2-2",
          judul: "Permukaan lengkung dan datar",
          ketukan: [
            "Bangun ruang dibedakan berdasarkan permukaannya.",
            "Ada yang permukaannya lengkung sehingga mudah menggelinding.",
            "Contohnya tabung, kerucut, dan bola.",
            "Ada yang permukaannya datar, contohnya kubus dan balok.",
          ],
          papan: ["Lihat permukaannya", "Lengkung: menggelinding", "Tabung • kerucut • bola", "Datar: kubus • balok"],
        },
        {
          id: "K2B3C-V2-3",
          judul: "Mengapa?",
          ketukan: [
            "Permukaan lengkung bisa berguling terus.",
            "Permukaan datar menahan benda supaya diam.",
            "Karena itu kita menumpuk kotak, dan menggelindingkan bola.",
            "Temukan benda di sekitarmu yang permukaannya datar dan lengkung.",
          ],
          papan: ["Lengkung berguling", "Datar menahan", "Kotak ditumpuk", "Cari di sekitarmu"],
        },
      ],
    },
    {
      id: "K2B3C-V3",
      judul: "Lima Bangun Ruang",
      subjudul: "Kubus, balok, tabung, kerucut, bola",
      adegan: [
        {
          id: "K2B3C-V3-1",
          judul: "Kubus dan balok",
          ketukan: [
            "Ada lima nama bangun ruang: kubus, balok, tabung, kerucut, dan bola.",
            "Kubus dan balok adalah bangun ruang dengan permukaan datar.",
            "Kubus mempunyai permukaan berbentuk segi empat yang sama ukurannya.",
            "Balok mempunyai permukaan berbentuk segi empat yang berbeda ukurannya.",
          ],
          papan: ["Lima bangun ruang", "Kubus dan balok: datar", "Kubus: sama ukuran", "Balok: beda ukuran"],
        },
        {
          id: "K2B3C-V3-2",
          judul: "Tabung, kerucut, dan bola",
          ketukan: [
            "Tabung seperti kaleng atau botol.",
            "Kerucut seperti topi ulang tahun atau kerucut es krim.",
            "Bola seperti bola sepak dan kelereng.",
            "Ketiganya mempunyai permukaan lengkung, jadi bisa menggelinding.",
          ],
          papan: ["Tabung: kaleng", "Kerucut: topi", "Bola: bola sepak", "Permukaan lengkung"],
        },
        {
          id: "K2B3C-V3-3",
          judul: "Cari bangun ruang",
          ketukan: [
            "Sekarang amati benda-benda di sekitarmu.",
            "Temukan benda yang berbentuk bangun ruang.",
            "Kelompokkan: kubus, balok, tabung, kerucut, atau bola.",
            "Tulis hasilnya dalam tabel.",
          ],
          papan: ["Amati sekitarmu", "Temukan bangun ruang", "Kelompokkan", "Tulis di tabel"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Bangun Datar atau Bangun Ruang?",
      stepDesc:
        "Bentuk benda dibedakan menjadi bangun datar dan bangun ruang. Bangun datar hanya mempunyai satu permukaan, contohnya lingkaran, segi empat, dan segitiga yang tipis. Bangun ruang mempunyai ruang di dalamnya, contohnya kotak, kubus, topi, dan botol. Bangun ruang biasanya terlihat tebal dan bisa dipegang dari berbagai sisi.",
      icon: "🧺",
      flowFrom: "Datar atau ruang",
      flowTo: "Bisa diisi",
    },
    {
      stepNumber: 2,
      stepTitle: "2. Bisa Diisi?",
      stepDesc:
        "Cara mudah membedakan bangun datar dan bangun ruang adalah bertanya, apakah benda ini bisa diisi? Kotak bisa diisi mainan. Botol bisa diisi air. Topi ulang tahun bisa diisi permen. Bangun datar seperti selembar kertas tidak punya ruang di dalam, jadi tidak bisa diisi.",
      icon: "🫙",
      flowFrom: "Bisa diisi",
      flowTo: "Permukaan",
    },
    {
      stepNumber: 3,
      stepTitle: "3. Permukaan Datar dan Lengkung",
      stepDesc:
        "Bangun ruang dibedakan berdasarkan permukaannya. Ada yang permukaannya datar, yaitu kubus dan balok. Ada yang permukaannya lengkung, yaitu tabung, kerucut, dan bola. Rabalah permukaannya: rata seperti meja, atau melengkung seperti bola. Tabung dan kerucut juga punya alas yang datar, tetapi bagian lengkungnya membuat mereka bisa menggelinding.",
      icon: "🤚",
      flowFrom: "Permukaan",
      flowTo: "Menggelinding",
    },
    {
      stepNumber: 4,
      stepTitle: "4. Menggelinding atau Menumpuk",
      stepDesc:
        "Permukaan lengkung mudah menggelinding, seperti bola dan botol. Permukaan datar menahan benda supaya diam, jadi kotak mudah ditumpuk. Itulah sebabnya bola dipakai untuk menggelinding dan kardus dipakai untuk menumpuk. Mencoba langsung menggelindingkan benda adalah cara menguji permukaannya.",
      icon: "⚽",
      flowFrom: "Menggelinding",
      flowTo: "Kubus dan balok",
    },
    {
      stepNumber: 5,
      stepTitle: "5. Kubus dan Balok",
      stepDesc:
        "Kubus dan balok punya permukaan datar berbentuk segi empat. Pada kubus, semua permukaannya segi empat yang sama ukurannya, seperti dadu. Pada balok, permukaannya segi empat yang berbeda ukurannya, seperti kotak sepatu atau kardus. Hitung permukaannya: kubus dan balok masing-masing punya enam permukaan.",
      icon: "🎲",
      flowFrom: "Kubus dan balok",
      flowTo: "Tabung kerucut bola",
    },
    {
      stepNumber: 6,
      stepTitle: "6. Tabung, Kerucut, dan Bola",
      stepDesc:
        "Tabung seperti kaleng dan botol. Kerucut seperti topi ulang tahun dan kerucut es krim. Bola seperti bola sepak dan kelereng. Ketiganya punya permukaan lengkung. Bola tidak punya bagian datar sama sekali, sehingga paling mudah menggelinding.",
      icon: "🥫",
      flowFrom: "Tabung kerucut bola",
      flowTo: "Bangun datar di permukaan",
    },
    {
      stepNumber: 7,
      stepTitle: "7. Bangun Datar di Permukaan Bangun Ruang",
      stepDesc:
        "Permukaan bangun ruang bisa dicetak seperti stempel. Tekan satu permukaan kubus pada kertas bertinta, hasilnya segi empat yang sama sisinya. Tekan alas kaleng, hasilnya lingkaran. Jadi bangun datar yang kita pelajari ada di permukaan bangun ruang. Kegiatan mencetak ini dipakai Montessori untuk mengenalkan hubungan bangun datar dan bangun ruang.",
      icon: "🖨️",
      flowFrom: "Bangun datar di permukaan",
      flowTo: "Cari dan namai",
    },
    {
      stepNumber: 8,
      stepTitle: "8. Cari dan Namai di Sekitar",
      stepDesc:
        "Berkelilinglah di rumah atau sekolah, seperti jalan-jalan matematika. Temukan benda berbentuk kubus, balok, tabung, kerucut, dan bola. Kelompokkan dan tulis di tabel. Permainan tas misteri juga seru: raba benda di dalam tas, lalu tebak namanya dari ciri-cirinya tanpa melihat.",
      icon: "🧭",
      flowFrom: "Cari dan namai",
      flowTo: "Bangun ruang siap dikenali",
    },
  ],
  infografis: [
    {
      judul: "Bangun Datar dan Bangun Ruang",
      emoji: "🧺",
      countNum: 2,
      countWord: "Dua",
      suara:
        "Bentuk benda dibedakan menjadi bangun datar dan bangun ruang. Bangun datar hanya punya satu permukaan, contohnya lingkaran, segi empat, dan segitiga. Bangun ruang punya ruang di dalamnya, contohnya kubus, kotak, topi, dan botol.",
    },
    {
      judul: "Bisa Diisi?",
      emoji: "🫙",
      countNum: 1,
      countWord: "Satu",
      suara:
        "Tanyakan, apakah benda ini bisa diisi? Kotak, botol, dan topi bisa diisi, jadi itu bangun ruang. Selembar kertas tidak bisa diisi, jadi itu bangun datar.",
    },
    {
      judul: "Permukaan Datar dan Lengkung",
      emoji: "🤚",
      countNum: 2,
      countWord: "Dua",
      suara:
        "Bangun ruang dibedakan berdasarkan permukaannya. Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung.",
    },
    {
      judul: "Menggelinding atau Tidak",
      emoji: "⚽",
      countNum: 3,
      countWord: "Tiga",
      suara:
        "Permukaan lengkung mudah menggelinding, seperti bola, botol, dan kerucut. Permukaan datar menahan benda supaya diam, seperti dadu dan kardus.",
    },
    {
      judul: "Kubus",
      emoji: "🎲",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Kubus mempunyai permukaan berbentuk segi empat yang sama ukurannya. Kubus punya enam permukaan. Contoh kubus adalah dadu dan kotak hadiah.",
    },
    {
      judul: "Balok",
      emoji: "📦",
      countNum: 6,
      countWord: "Enam",
      suara:
        "Balok mempunyai permukaan berbentuk segi empat yang berbeda ukurannya. Balok juga punya enam permukaan. Contoh balok adalah kardus, kotak sepatu, dan kotak pensil.",
    },
    {
      judul: "Tabung",
      emoji: "🥫",
      countNum: 1,
      countWord: "Satu",
      suara:
        "Tabung seperti kaleng dan botol. Tabung punya permukaan lengkung, jadi mudah menggelinding. Alas tabung berbentuk lingkaran.",
    },
    {
      judul: "Kerucut",
      emoji: "🍦",
      countNum: 1,
      countWord: "Satu",
      suara:
        "Kerucut seperti topi ulang tahun dan kerucut es krim. Kerucut punya satu ujung yang runcing dan alas berbentuk lingkaran. Kerucut juga bisa menggelinding.",
    },
    {
      judul: "Bola",
      emoji: "⚽",
      countNum: 1,
      countWord: "Satu",
      suara:
        "Bola seperti bola sepak dan kelereng. Seluruh permukaan bola lengkung, tidak ada bagian yang datar, jadi bola paling mudah menggelinding.",
    },
    {
      judul: "Cetak Permukaannya",
      emoji: "🖨️",
      countNum: 5,
      countWord: "Lima",
      suara:
        "Permukaan bangun ruang bisa dicetak. Permukaan kubus menghasilkan segi empat yang sama sisinya. Permukaan balok menghasilkan segi empat yang berbeda sisinya. Alas tabung dan alas kerucut menghasilkan lingkaran. Bola tidak punya permukaan datar untuk dicetak.",
    },
  ],
  games: [
    {
      stage: "Concrete",
      gameType: "predict-and-roll",
      title: "Lereng Gelinding",
      bookReference: "hlm. 91 (Ayo Mencoba 1: gelindingkan benda-benda; benda mana yang dapat menggelinding?)",
      objective: "Mencoba menggelindingkan benda nyata dan menyimpulkan bahwa permukaan lengkung mudah menggelinding.",
      mechanicDescription:
        "Dua ronde, masing-masing lima benda (topi ulang tahun, dadu, botol, kardus, bola; lalu kaleng, kelereng, kotak pensil, kerucut es krim, kotak hadiah). Siswa mengetuk benda untuk melepasnya di lereng, melihat yang menggelinding dan yang diam, lalu memilih semua benda yang menggelinding dan alasannya.",
      voiceGuide: "Lepas tiap benda di lereng, lalu pilih yang menggelinding.",
      emoji: "⚽",
      targetCount: 10,
    },
    {
      stage: "Concrete",
      gameType: "mystery-bag-clues",
      title: "Tas Misteri",
      bookReference: "hlm. 91–92 (bangun ruang dibedakan berdasarkan permukaannya), diperkaya tas misteri Montessori",
      objective: "Menebak nama bangun ruang dari ciri-ciri yang dirasakan tanpa melihat bendanya.",
      mechanicDescription:
        "Tiga ronde (kubus, kerucut, bola). Benda tersembunyi di dalam tas. Siswa menekan tombol Raba untuk membuka petunjuk satu per satu, lalu menebak nama bangun ruang dari lima pilihan. Semakin sedikit petunjuk yang dipakai, semakin banyak bintang.",
      voiceGuide: "Raba untuk membuka petunjuk, lalu tebak namanya.",
      emoji: "👜",
      targetCount: 3,
    },
    {
      stage: "Concrete",
      gameType: "stamp-face-and-guess",
      title: "Cetak dan Tebak",
      bookReference: "hlm. 90–92 (bangun datar dan bangun ruang; kubus dan balok berpermukaan segi empat), diperkaya cetak permukaan",
      objective: "Mencetak permukaan benda dan menyebut bangun datar hasil cetakannya.",
      mechanicDescription:
        "Empat ronde (dadu, kardus, kaleng, topi ulang tahun). Siswa memilih permukaan benda yang rata untuk dicetak. Permukaan lengkung tidak menghasilkan cetakan yang rapi. Setelah cetakan muncul, siswa memilih bangun datar hasilnya: segi empat sama sisi, segi empat beda sisi, atau lingkaran.",
      voiceGuide: "Pilih permukaan yang rata untuk dicetak, lalu sebut bentuk cetakannya.",
      emoji: "🖨️",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "sort-solids-five-bins",
      title: "Pilah Rak Mainan",
      bookReference: "hlm. 92 (Ayo Mencoba 2: temukan benda berbentuk bangun ruang dan kelompokkan dalam tabel)",
      objective: "Mengelompokkan benda nyata menurut nama bangun ruangnya: kubus, balok, tabung, kerucut, atau bola.",
      mechanicDescription:
        "Dua ronde, masing-masing lima benda (dadu, kardus, kaleng, topi, bola; lalu kotak hadiah, kotak pensil, botol, kerucut es krim, kelereng). Siswa menyeret atau mengetuk benda ke salah satu dari lima rak bernama. Benda yang salah kembali disertai ciri bendanya.",
      voiceGuide: "Seret tiap benda ke rak bangun ruang yang sesuai.",
      emoji: "🧸",
      targetCount: 10,
    },
    {
      stage: "Picture",
      gameType: "match-silhouette-view",
      title: "Bayangan Bangun Ruang",
      bookReference: "hlm. 90–92 (hubungan bangun datar dan bangun ruang), diperkaya pandangan atas dan samping",
      objective: "Menentukan bangun datar yang tampak bila bangun ruang dilihat dari atas atau dari samping.",
      mechanicDescription:
        "Empat ronde (kubus dari atas, kerucut dari samping, tabung dari atas, balok dari samping). Model bangun ruang digambar bersama arah pandangnya. Siswa memilih satu dari tiga bayangan bangun datar yang sesuai.",
      voiceGuide: "Lihat arah pandangnya, lalu pilih bayangan yang tepat.",
      diagramType: "view-silhouette",
      numberA: 4,
      numberB: 3,
    },
    {
      stage: "Picture",
      gameType: "table-surface-checkboxes",
      title: "Tabel Permukaan",
      bookReference: "hlm. 91–93 (Ayo Berlatih nomor 1: kelompokkan benda menurut permukaan datar dan permukaan lengkung)",
      objective: "Mengisi tabel permukaan datar, permukaan lengkung, dan menggelinding untuk lima bangun ruang.",
      mechanicDescription:
        "Satu tabel dengan lima baris (kubus, balok, tabung, kerucut, bola) dan tiga kolom: permukaan datar, permukaan lengkung, dan menggelinding. Siswa mengetuk kotak yang benar pada tiap baris, lalu menekan periksa. Jawaban yang keliru dijelaskan per baris.",
      voiceGuide: "Centang kotak yang benar pada tiap baris, lalu periksa.",
      diagramType: "surface-table",
      numberA: 5,
      numberB: 3,
    },
    {
      stage: "Picture",
      gameType: "drag-name-tags",
      title: "Beri Nama Bangun Ruang",
      bookReference: "hlm. 93 dan 98 (Ayo Berlatih nomor 2: tulis nama bangun ruang; Evaluasi nomor 6)",
      objective: "Memberi nama pada gambar bangun ruang dengan menyeret label nama.",
      mechanicDescription:
        "Dua ronde, masing-masing lima model bangun ruang dengan urutan berbeda. Siswa menyeret label Kubus, Balok, Tabung, Kerucut, dan Bola ke model yang sesuai, atau mengetuk label lalu mengetuk model. Label yang salah ditolak disertai ciri modelnya.",
      voiceGuide: "Seret label nama ke model bangun ruang yang sesuai.",
      diagramType: "name-tags",
      numberA: 5,
      numberB: 2,
    },
    {
      stage: "Abstract",
      gameType: "true-false-statements",
      title: "Benar atau Salah?",
      bookReference: "hlm. 90–92 (ciri-ciri bangun datar, bangun ruang, kubus, dan balok)",
      objective: "Menilai kebenaran pernyataan tentang bangun datar, bangun ruang, dan ciri kelima bangun ruang.",
      mechanicDescription:
        "Dua ronde, masing-masing lima pernyataan. Siswa menekan Benar atau Salah. Jawaban yang keliru dijelaskan alasannya.",
      voiceGuide: "Baca pernyataannya, lalu tekan Benar atau Salah.",
      symbolLarge: "✔ ✘",
      wordLarge: "BENAR SALAH",
      mathNotation: "ciri bangun ruang",
    },
    {
      stage: "Abstract",
      gameType: "clue-detective-solids",
      title: "Detektif Bangun Ruang",
      bookReference: "hlm. 91–92 (ciri permukaan, nama bangun ruang)",
      objective: "Menemukan nama bangun ruang dari dua petunjuk tertulis.",
      mechanicDescription:
        "Empat ronde, tiap ronde dua petunjuk dan tiga pilihan nama bangun ruang. Siswa memilih nama yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru.",
      voiceGuide: "Baca kedua petunjuk, lalu pilih namanya.",
      symbolLarge: "datar, segi empat",
      wordLarge: "DETEKTIF",
      mathNotation: "dua petunjuk, satu bangun ruang",
    },
    {
      stage: "Abstract",
      gameType: "build-sentence-from-tiles",
      title: "Susun Kalimat",
      bookReference: "hlm. 90–92 (kalimat definisi: bangun ruang dapat diisi; kubus dan balok punya permukaan datar)",
      objective: "Menyusun kalimat ciri bangun ruang dari kartu kata dengan urutan yang benar.",
      mechanicDescription:
        "Tiga ronde, tiap ronde satu kalimat dari kartu kata yang teracak, dengan satu kartu pengecoh. Siswa mengetuk kartu kata berurutan untuk menyusun kalimat, bisa mengurungkan satu kartu, lalu menekan periksa.",
      voiceGuide: "Ketuk kartu kata berurutan sampai kalimatnya benar.",
      symbolLarge: "A + B",
      wordLarge: "SUSUN KALIMAT",
      mathNotation: "kata demi kata",
    },
  ],
  poin: [
    {
      ikon: "🧺",
      nama: "Datar atau ruang",
      isi: "bisa diisi = bangun ruang",
      suara: "Bangun datar hanya punya satu permukaan dan tidak bisa diisi. Bangun ruang punya ruang di dalamnya, jadi dapat diisi.",
    },
    {
      ikon: "🤚",
      nama: "Permukaan",
      isi: "datar: kubus, balok • lengkung: tabung, kerucut, bola",
      suara: "Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung, jadi mudah menggelinding.",
    },
    {
      ikon: "🎲",
      nama: "Kubus dan balok",
      isi: "kubus: segi empat sama • balok: segi empat beda",
      suara: "Kubus mempunyai permukaan segi empat yang sama ukurannya. Balok mempunyai permukaan segi empat yang berbeda ukurannya.",
    },
    {
      ikon: "🥫",
      nama: "Tabung, kerucut, bola",
      isi: "kaleng • topi • bola sepak",
      suara: "Tabung seperti kaleng. Kerucut seperti topi ulang tahun. Bola seperti bola sepak. Ketiganya bisa menggelinding.",
    },
    {
      ikon: "🖨️",
      nama: "Cetak permukaan",
      isi: "kubus → segi empat • kaleng → lingkaran",
      suara: "Permukaan bangun ruang bisa dicetak. Kubus menghasilkan segi empat, dan alas kaleng menghasilkan lingkaran.",
    },
  ],
  poinSuara:
    "Ingat selalu! Bangun datar hanya punya satu permukaan dan tidak bisa diisi. Bangun ruang bisa diisi. Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung dan mudah menggelinding. Kubus punya segi empat yang sama ukurannya, balok punya segi empat yang berbeda ukurannya.",
  cara: {
    suara: "Cara menyebutkan bangun ruang. Dadu berbentuk kubus karena semua permukaannya segi empat yang sama ukurannya.",
    potongan: [
      { teks: "Dadu berbentuk", warna: "#FFFFFF" },
      { teks: "kubus", warna: "#FFE566" },
      { teks: "karena permukaannya", warna: "#FFFFFF" },
      { teks: "segi empat sama", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: kumpulkan benda berbentuk bangun ruang, misalnya kardus, kaleng, bola, dan topi. Gelindingkan masing-masing, lalu kelompokkan menjadi yang menggelinding dan yang tidak. Tulis hasilnya di tabel dan ceritakan kepada keluargamu.",
  refleksi: [
    "Aku dapat membedakan bangun datar dan bangun ruang.",
    "Aku dapat memberi nama bangun ruang sesuai dengan ciri-cirinya.",
    "Aku dapat mengelompokkan bangun ruang menurut permukaannya.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

export const SUB_BAB_K2B3: SubBabNaskah[] = [SUB_A3, SUB_B3, SUB_C3];

export const semuaAdeganK2B3 = () => SUB_BAB_K2B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
