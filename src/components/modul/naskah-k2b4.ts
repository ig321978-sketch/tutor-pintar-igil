/**
 * Naskah murni Matematika Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita), Sub-Bab A dan B.
 * Sumber: Buku Siswa Matematika Kelas II Kemendikbudristek, Bab 4 hlm. 101-124, diperkaya dengan metode dari luar
 * buku (kata berlawanan atau pasangan arah, peta kotak dan koordinat baris-kolom, sudut pandang pembaca,
 * satuan pola atau unit berulang, kode huruf A B, dan pemeriksaan "berulang dan teratur").
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k2-bab4.mjs) memakainya untuk menulis src/data/kelas2-bab4.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k2b4.mjs.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B4_META = {
  chapterId: "k2-mat-bab4",
  phaseCode: "FASE_A",
  grade: 2,
  subjectLabel: "MATEMATIKA - KELAS 2 SD",
  title: "BAB 4: POSISI BENDA DAN POLA DI SEKITAR KITA",
  silabusElemen: "🌈 Fase A • Elemen Geometri dan Aljabar: Posisi Benda dan Pola (Kelas 2 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Posisi di sekitar", "Atas dan bawah", "Depan dan belakang", "Kanan dan kiri", "Sudut pandang", "Kata berlawanan", "Kalimat posisi", "Gabung petunjuk", "Siap bercerita posisi"];
const ALUR_B = ["Hal yang berulang", "Satuan pola", "Pola bentuk", "Pola warna", "Pola gerakan", "Pola suara", "Melanjutkan pola", "Membuat pola", "Siap menemukan pola"];

/* ====================================================================== */
/* SUB-BAB A. Posisi benda                                                  */
/* ====================================================================== */

export const SUB_A4: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Posisi Benda)",
  fullTitle: "Sub-Bab A: Posisi Benda",
  targetDescription:
    "Siswa menggunakan kata atas, bawah, depan, belakang, kanan, dan kiri untuk menjelaskan letak sebuah benda terhadap benda lain, menentukan kanan dan kiri sesuai sudut pandang pembaca gambar, memakai pasangan kata yang berlawanan, serta menggabungkan beberapa petunjuk posisi untuk menemukan sebuah benda.",
  secondaryBg: "#DBEAFE",
  secondaryBorder: "#2563EB",
  secondaryText: "#1E3A8A",
  silabus: {
    teksSuara: `Kita belajar posisi benda. Kira dan teman-temannya membantu Paman memanen padi di sawah, dan kita menceritakan di mana setiap orang dan benda berada. Kita memakai enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Kita juga belajar bahwa kanan dan kiri pada gambar mengikuti posisi kita yang melihat gambar. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menggunakan kata atas, bawah, depan, belakang, kanan, dan kiri untuk menjelaskan posisi benda terhadap benda lain, menentukan kanan dan kiri sesuai arah pandang pembaca, serta menyampaikan pendapat dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab A hlm. 101–113).",
  },
  videos: [
    {
      id: "K2B4A-V1",
      judul: "Waktu Panen Telah Tiba",
      subjudul: "Kira dan teman membantu Paman",
      adegan: [
        {
          id: "K2B4A-V1-1",
          judul: "Ke sawah bersama Paman",
          ketukan: [
            "Waktu panen padi telah tiba.",
            "Kira dan teman-temannya membantu Paman di sawah. Mereka membantu Paman memanen padi.",
            "Mereka melihat para petani bekerja keras memanen padi.",
          ],
          papan: ["Waktu panen", "Membantu Paman", "Petani bekerja keras"],
        },
        {
          id: "K2B4A-V1-2",
          judul: "Padi dan nasi",
          ketukan: [
            "Padi adalah makanan pokok yang diolah menjadi nasi.",
            "Para petani menanam padi sehingga kita dapat memakan nasi yang enak.",
            "Paman berpesan agar kita tidak menyia-nyiakan nasi.",
            "Kita harus menghargai jerih payah para petani.",
          ],
          papan: ["Padi jadi nasi", "Petani menanam padi", "Jangan sia-siakan nasi", "Hargai petani"],
        },
        {
          id: "K2B4A-V1-3",
          judul: "Siapa di sebelah mana?",
          ketukan: [
            "Enam sekawan berdiri berderet di sawah. Dari kiri ke kanan: Upe, Lili, Halim, Kira, Malosi, dan Tika.",
            "Siapakah yang di sebelah kanan Lili? Yang di sebelah kanan Lili adalah Halim.",
            "Siapakah yang di sebelah kiri Malosi? Yang di sebelah kiri Malosi adalah Kira.",
            "Hewan apa yang sedang terbang di atas padi? Burung terbang di atas padi.",
          ],
          papan: ["Berderet di sawah", "Kanan Lili: Halim", "Kiri Malosi: Kira", "Di atas padi: burung"],
        },
      ],
    },
    {
      id: "K2B4A-V2",
      judul: "Atas, Bawah, Depan, Belakang",
      subjudul: "Posisi benda di sekitar kita",
      adegan: [
        {
          id: "K2B4A-V2-1",
          judul: "Kupu-kupu dan bunga",
          ketukan: [
            "Kita dapat menunjukkan posisi benda di sekitar kita.",
            "Kupu-kupu hinggap di atas bunga.",
            "Bunga ada di bawah kupu-kupu.",
          ],
          papan: ["Posisi benda", "Kupu-kupu di atas bunga", "Bunga di bawah kupu-kupu"],
        },
        {
          id: "K2B4A-V2-2",
          judul: "Burung dan ulat",
          ketukan: [
            "Burung berjalan di depan ulat.",
            "Ulat bergerak di belakang burung.",
            "Depan dan belakang adalah dua posisi yang berlawanan.",
          ],
          papan: ["Burung di depan", "Ulat di belakang", "Depan lawan belakang"],
        },
        {
          id: "K2B4A-V2-3",
          judul: "Kata yang berlawanan",
          ketukan: [
            "Atas berlawanan dengan bawah.",
            "Depan berlawanan dengan belakang.",
            "Kanan berlawanan dengan kiri.",
            "Kalau bola di atas meja, berarti meja di bawah bola.",
          ],
          papan: ["Atas lawan bawah", "Depan lawan belakang", "Kanan lawan kiri", "Bola atas, meja bawah"],
        },
      ],
    },
    {
      id: "K2B4A-V3",
      judul: "Kanan dan Kiri",
      subjudul: "Sesuai posisi pembaca",
      adegan: [
        {
          id: "K2B4A-V3-1",
          judul: "Burung dan rumput",
          ketukan: [
            "Burung berdiri di sebelah kiri rumput.",
            "Rumput ada di sebelah kanan burung.",
            "Kanan dan kiri pada gambar sesuai dengan posisi pembaca.",
          ],
          papan: ["Burung di kiri rumput", "Rumput di kanan burung", "Sesuai posisi pembaca"],
        },
        {
          id: "K2B4A-V3-2",
          judul: "Anak yang membelakangi kita",
          ketukan: [
            "Seorang anak berdiri membelakangi kita.",
            "Ia berkata, ayam di sebelah kiri saya.",
            "Ia juga berkata, rumput di sebelah kanan saya.",
            "Ia menghadap ke arah yang sama dengan kita, jadi kiri anak itu sama dengan kiri kita.",
          ],
          papan: ["Anak membelakangi kita", "Ayam di kiri saya", "Rumput di kanan saya", "Arah sama dengan kita"],
        },
        {
          id: "K2B4A-V3-3",
          judul: "Ayo bermain petunjuk",
          ketukan: [
            "Ayo bermain dalam kelompok tiga orang.",
            "Siswa pertama membaca petunjuk.",
            "Siswa kedua memindahkan benda sesuai petunjuk, dan siswa ketiga menebak posisi akhir benda.",
            "Ambil buku, taruh di atas meja, pindahkan ke sebelah kanan meja, lalu pindahkan ke bawah meja. Di manakah buku sekarang?",
          ],
          papan: ["Main bertiga", "Siswa 1 membaca", "Siswa 2 memindahkan", "Buku di bawah meja"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Posisi di Sekitar Kita",
      stepDesc:
        "Setiap benda berada di suatu tempat. Posisi benda adalah letak suatu benda terhadap benda lain. Posisi selalu butuh benda acuan: bola ada di atas meja, bukan sekadar bola ada di atas. Kira dan teman-temannya melihat padi, burung, dan para petani, dan mereka dapat menceritakan posisi semuanya.",
      icon: "📍",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Atas dan Bawah",
      stepDesc:
        "Atas dan bawah menunjukkan tinggi rendahnya letak. Kupu-kupu hinggap di atas bunga, dan bunga ada di bawah kupu-kupu. Buku di atas meja, sepatu di bawah tempat tidur. Kalau benda pertama di atas benda kedua, maka benda kedua di bawah benda pertama.",
      icon: "↕️",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Depan dan Belakang",
      stepDesc:
        "Depan dan belakang menunjukkan jarak dari kita. Benda yang lebih dekat dengan kita atau lebih dulu berjalan ada di depan. Burung berjalan di depan ulat, dan ulat bergerak di belakang burung. Pada gambar, benda yang menutupi benda lain berada di depan, dan benda yang tertutup berada di belakang.",
      icon: "🐛",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Kanan dan Kiri",
      stepDesc:
        "Kanan dan kiri menunjukkan letak di samping. Tangan kanan kita memegang pensil bila kita menulis, dan tangan kiri ada di sisi lainnya. Burung berdiri di sebelah kiri rumput, jadi rumput ada di sebelah kanan burung. Latihlah dengan mengangkat tangan kananmu, lalu tangan kirimu.",
      icon: "↔️",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Sudut Pandang Pembaca",
      stepDesc:
        "Pada gambar, kanan dan kiri sesuai dengan posisi pembaca, yaitu kita yang melihat gambar. Kalau ada anak yang membelakangi kita, ia menghadap ke arah yang sama dengan kita, jadi kanan dan kirinya sama dengan kanan dan kiri kita. Kalau anak itu menghadap kita, kanan dan kirinya terbalik terhadap kita. Karena itu, tentukan dulu siapa yang melihat.",
      icon: "👀",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Kata yang Berlawanan",
      stepDesc:
        "Enam kata posisi terdiri dari tiga pasangan yang berlawanan: atas dengan bawah, depan dengan belakang, dan kanan dengan kiri. Bila kita tahu posisi benda pertama terhadap benda kedua, kita langsung tahu posisi benda kedua terhadap benda pertama dengan memakai kata lawannya.",
      icon: "🔁",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Menyusun Kalimat Posisi",
      stepDesc:
        "Kalimat posisi yang lengkap memuat tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Contohnya, kucing duduk di bawah meja. Benda yang diceritakan adalah kucing, kata posisinya di bawah, dan benda acuannya meja. Untuk kanan dan kiri kita menyebut di sebelah kanan atau di sebelah kiri.",
      icon: "📝",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Gabungkan Beberapa Petunjuk",
      stepDesc:
        "Satu petunjuk posisi sering belum cukup untuk menebak sebuah benda. Aku di atas ikan, bisa jadi banyak benda. Tetapi bila ditambah, aku di sebelah kanan jam, hanya satu benda yang cocok. Menebak dengan menggabungkan petunjuk melatih kita berpikir teliti dan sabar.",
      icon: "🔍",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    {
      judul: "Enam Kata Posisi",
      emoji: "📍",
      countNum: 6,
      countWord: "Enam",
      suara: "Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Dengan enam kata ini kita dapat menceritakan di mana sebuah benda berada.",
    },
    {
      judul: "Atas dan Bawah",
      emoji: "🦋",
      countNum: 2,
      countWord: "Dua",
      suara: "Kupu-kupu hinggap di atas bunga. Bunga ada di bawah kupu-kupu. Atas dan bawah menunjukkan tinggi rendahnya letak benda.",
    },
    {
      judul: "Depan dan Belakang",
      emoji: "🐛",
      countNum: 2,
      countWord: "Dua",
      suara: "Burung berjalan di depan ulat. Ulat bergerak di belakang burung. Benda yang menutupi benda lain ada di depan.",
    },
    {
      judul: "Kanan dan Kiri",
      emoji: "↔️",
      countNum: 2,
      countWord: "Dua",
      suara: "Burung berdiri di sebelah kiri rumput. Rumput ada di sebelah kanan burung. Kanan dan kiri menunjukkan letak di samping.",
    },
    {
      judul: "Sudut Pandang Pembaca",
      emoji: "👀",
      countNum: 2,
      countWord: "Dua",
      suara: "Kanan dan kiri pada gambar sesuai dengan posisi pembaca. Anak yang membelakangi kita menghadap ke arah yang sama dengan kita, jadi kanan dan kirinya sama dengan kanan dan kiri kita.",
    },
    {
      judul: "Kata yang Berlawanan",
      emoji: "🔁",
      countNum: 3,
      countWord: "Tiga",
      suara: "Ada tiga pasangan kata berlawanan: atas dengan bawah, depan dengan belakang, dan kanan dengan kiri.",
    },
    {
      judul: "Benda Acuan",
      emoji: "🎯",
      countNum: 3,
      countWord: "Tiga",
      suara: "Kalimat posisi punya tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Contohnya, buku di atas meja.",
    },
    {
      judul: "Posisi di Kamar",
      emoji: "🛏️",
      countNum: 4,
      countWord: "Empat",
      suara: "Di kamar, boneka ada di atas tempat tidur, sepatu di bawah tempat tidur, kotak di sebelah kiri tempat tidur, dan mobil-mobilan di depan meja.",
    },
    {
      judul: "Tebak dari Petunjuk",
      emoji: "🔍",
      countNum: 2,
      countWord: "Dua",
      suara: "Aku di atas ikan, dan aku di sebelah kanan jam. Satu petunjuk belum cukup, tetapi dua petunjuk membawa kita ke satu benda.",
    },
    {
      judul: "Posisi Setelah Dipindah",
      emoji: "📚",
      countNum: 4,
      countWord: "Empat",
      suara: "Buku diambil, ditaruh di atas meja, dipindah ke sebelah kanan meja, lalu dipindah ke bawah meja. Posisi buku sekarang adalah di bawah meja.",
    },
  ],
  games: [
    {
      stage: "Concrete",
      gameType: "place-object-by-position",
      title: "Taruh di Tempatnya",
      bookReference: "hlm. 104–106 (posisi benda atas, bawah, depan, belakang, kanan, kiri; Ayo Mencoba: menemukan benda di sekitar)",
      objective: "Menaruh benda pada posisi yang diminta terhadap benda acuan.",
      mechanicDescription:
        "Empat ronde (kotak, meja, kursi, pohon). Tiap ronde punya tiga atau empat petunjuk, misalnya taruh bola di atas kotak. Siswa menyeret benda ke salah satu dari enam tempat di sekitar benda acuan, atau mengetuk benda lalu mengetuk tempatnya. Tempat yang salah memberi petunjuk. Tempat yang benar membuat kalimat lengkapnya dibacakan.",
      voiceGuide: "Seret benda ke posisi yang diminta.",
      emoji: "📦",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "follow-move-instructions",
      title: "Pindahkan Benda Sesuai Petunjuk",
      bookReference: "hlm. 112 (Ayo Bermain: petunjuk memindahkan buku dan pensil, lalu menebak posisi akhir)",
      objective: "Memindahkan satu benda beberapa kali sesuai petunjuk berurutan, lalu menyebut posisi akhirnya.",
      mechanicDescription:
        "Tiga ronde (buku dan meja, pensil dan kursi, bola dan kotak). Tiap ronde punya tiga atau empat petunjuk berurutan, misalnya pindahkan ke sebelah kanan meja. Siswa menjalankan petunjuk satu per satu. Setelah petunjuk terakhir, siswa memilih kata posisi akhir benda dari tiga pilihan.",
      voiceGuide: "Pindahkan benda sesuai petunjuk satu per satu.",
      emoji: "📚",
      targetCount: 3,
    },
    {
      stage: "Concrete",
      gameType: "find-by-position-clue",
      title: "Temukan di Kamar",
      bookReference: "hlm. 109 (Ayo Berlatih nomor 3: temukan benda-benda yang posisinya sebagai berikut)",
      objective: "Menemukan benda di kamar dari petunjuk posisi terhadap benda lain.",
      mechanicDescription:
        "Empat ronde, tiap ronde tiga pertanyaan pada gambar kamar berisi tempat tidur, meja, kursi, kotak, boneka, sepatu, tas, buku, mobil-mobilan, dan bola. Siswa mengetuk benda yang cocok dengan petunjuk. Kunci dihitung oleh program dari koordinat benda, sehingga gambar dan jawaban selalu sama.",
      voiceGuide: "Ketuk benda yang cocok dengan petunjuk posisi.",
      emoji: "🛏️",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "place-stickers-by-sentence",
      title: "Tempel Stiker di Taman",
      bookReference: "hlm. 122 (Ayo Berkarya: gunting dan tempelkan gambar sesuai petunjuk)",
      objective: "Menempel stiker pada gambar taman sesuai enam kalimat petunjuk posisi.",
      mechanicDescription:
        "Satu ronde dengan enam stiker: kupu-kupu, kelinci, burung, bola, Halim, dan deretan bunga. Siswa membaca kalimat petunjuk, lalu menyeret stiker ke tempat di sekitar Kira atau pohon. Dua petunjuk memakai depan Kira. Stiker yang salah tempat kembali dengan petunjuk.",
      voiceGuide: "Baca petunjuk, lalu tempelkan stikernya.",
      emoji: "🌳",
      targetCount: 6,
    },
    {
      stage: "Picture",
      gameType: "tap-cell-by-position",
      title: "Peta Kotak",
      bookReference: "hlm. 106 dan 113 (menentukan posisi atas, bawah, kanan, dan kiri pada gambar)",
      objective: "Menentukan kotak yang berada di atas, bawah, kiri, atau kanan sebuah lingkaran biru pada peta 3 kali 3.",
      mechanicDescription:
        "Empat ronde. Pada tiap ronde lingkaran biru ada di kotak yang berbeda, lalu dua sampai empat pertanyaan seperti kotak mana di atas lingkaran biru. Siswa mengetuk kotak yang tepat. Kunci dihitung dari baris dan kolom. Peta datar hanya memuat atas, bawah, kiri, dan kanan.",
      voiceGuide: "Ketuk kotak yang diminta.",
      diagramType: "grid-position",
      numberA: 4,
      numberB: 3,
    },
    {
      stage: "Picture",
      gameType: "choose-word-for-diagram",
      title: "Pilih Kata Posisi",
      bookReference: "hlm. 107 (Ayo Berlatih nomor 1: lingkari kata yang menunjukkan posisi)",
      objective: "Memilih kata posisi sebuah lingkaran terhadap sebuah persegi pada diagram.",
      mechanicDescription:
        "Tiga ronde, tiap ronde empat diagram. Lingkaran dapat berada di atas, bawah, kiri, atau kanan persegi, menutupi persegi (di depan), atau tertutup persegi (di belakang). Siswa memilih satu dari tiga kata. Kunci dihitung dari koordinat kedua bangun.",
      voiceGuide: "Lihat diagram, lalu pilih kata yang tepat.",
      diagramType: "two-shapes",
      numberA: 3,
      numberB: 4,
    },
    {
      stage: "Picture",
      gameType: "place-shapes-by-sentence",
      title: "Susun Bangun di Petak",
      bookReference: "hlm. 108–111 (Ayo Berlatih nomor 2, 4, dan 5: lengkapi dan ceritakan posisi benda)",
      objective: "Menempatkan bangun polos pada petak 3 kali 3 sesuai kalimat posisi.",
      mechanicDescription:
        "Tiga ronde, tiap ronde dua sampai tiga kalimat, misalnya segitiga di sebelah kiri persegi. Siswa mengetuk bangun, lalu mengetuk petak. Susunan diperiksa dari baris dan kolom. Semua susunan yang memenuhi kalimat diterima, tidak hanya satu.",
      voiceGuide: "Ketuk bangun, lalu ketuk petak sesuai kalimat.",
      diagramType: "grid-shapes",
      numberA: 3,
      numberB: 3,
    },
    {
      stage: "Abstract",
      gameType: "complete-opposite-sentences",
      title: "Lengkapi Kalimat Posisi",
      bookReference: "hlm. 108 dan 110 (Ayo Berlatih nomor 2 dan 4: lengkapi kalimat dengan kata posisi)",
      objective: "Melengkapi kalimat posisi dengan kata yang berlawanan.",
      mechanicDescription:
        "Dua ronde, tiap ronde tiga kalimat. Contoh: bola ada di atas meja, jadi meja ada di ... bola. Siswa memilih satu dari tiga kata untuk bagian kosong. Kalimat yang lengkap dibacakan Suara Guru.",
      voiceGuide: "Pilih kata yang tepat untuk bagian kosong.",
      symbolLarge: "↑ ↓",
      wordLarge: "ATAS BAWAH",
      mathNotation: "atas lawan bawah",
    },
    {
      stage: "Abstract",
      gameType: "riddle-by-position-clues",
      title: "Tebak Aku Apa?",
      bookReference: "hlm. 113 (Coba Pikirkan: coba tebak, apa aku?)",
      objective: "Menemukan sebuah benda dari dua atau tiga petunjuk posisi pada kotak kata 3 kali 3.",
      mechanicDescription:
        "Empat soal pada dua kotak kata. Siswa membaca petunjuk seperti aku di atas ikan dan aku di sebelah kanan jam, lalu memilih satu dari tiga nama. Hanya satu nama yang cocok dengan semua petunjuk, dan jawaban dihitung dari kotak kata.",
      voiceGuide: "Baca semua petunjuk, lalu pilih namanya.",
      symbolLarge: "?",
      wordLarge: "TEBAK",
      mathNotation: "dua petunjuk, satu jawaban",
    },
    {
      stage: "Abstract",
      gameType: "concept-map-fill",
      title: "Peta Konsep Posisi",
      bookReference: "hlm. 102 (peta konsep posisi benda dan pola di sekitar kita)",
      objective: "Melengkapi peta konsep posisi benda dengan definisi, contoh, pasangan kata berlawanan, dan pendapat sendiri.",
      mechanicDescription:
        "Dua peta konsep, satu untuk posisi benda dan satu untuk kanan dan kiri. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.",
      voiceGuide: "Pilih kartu yang tepat untuk kotak yang menyala.",
      symbolLarge: "⇄",
      wordLarge: "PETA KONSEP",
      mathNotation: "posisi • kata • lawan kata",
    },
  ],
  poin: [
    {
      ikon: "📍",
      nama: "Enam kata posisi",
      isi: "atas, bawah, depan, belakang, kanan, kiri",
      suara: "Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Dengan enam kata ini kita menceritakan letak benda.",
    },
    {
      ikon: "🎯",
      nama: "Benda acuan",
      isi: "posisi selalu terhadap benda lain",
      suara: "Posisi selalu dilihat terhadap benda lain yang disebut benda acuan. Buku di atas meja, acuannya meja.",
    },
    {
      ikon: "👀",
      nama: "Pembaca gambar",
      isi: "kanan kiri sesuai pembaca",
      suara: "Pada gambar, kanan dan kiri sesuai dengan posisi pembaca. Anak yang membelakangi kita menghadap arah yang sama dengan kita.",
    },
    {
      ikon: "🔁",
      nama: "Kata berlawanan",
      isi: "atas–bawah, depan–belakang, kanan–kiri",
      suara: "Tiga pasangan kata berlawanan adalah atas dengan bawah, depan dengan belakang, dan kanan dengan kiri.",
    },
    {
      ikon: "🔍",
      nama: "Gabung petunjuk",
      isi: "dua petunjuk membawa ke satu benda",
      suara: "Satu petunjuk belum tentu cukup. Gabungkan dua atau tiga petunjuk posisi supaya hanya satu benda yang cocok.",
    },
  ],
  poinSuara:
    "Ingat selalu! Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Posisi selalu dilihat terhadap benda acuan. Kanan dan kiri pada gambar sesuai dengan posisi pembaca. Kata posisi berpasangan dengan lawannya, dan beberapa petunjuk dapat digabung untuk menebak benda.",
  cara: {
    suara: "Cara menyebutkan. Buku ada di atas meja. Benda yang diceritakan, kata posisi, lalu benda acuan.",
    potongan: [
      { teks: "Benda", warna: "#FFFFFF" },
      { teks: "di", warna: "#FFFFFF" },
      { teks: "kata posisi", warna: "#FFE566" },
      { teks: "benda acuan", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: temukan satu benda untuk tiap kata posisi di kamarmu, lalu tulis kalimatnya, misalnya sepatu ada di bawah tempat tidur. Mainkan Ayo Bermain bersama dua temanmu: satu membaca petunjuk, satu memindahkan benda, satu menebak posisi akhirnya.",
  refleksi: [
    "Aku bisa mendeskripsikan posisi benda.",
    "Aku bisa memakai kata atas, bawah, depan, belakang, kanan, dan kiri.",
    "Aku belajar dengan senang hati.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Pola                                                          */
/* ====================================================================== */

export const SUB_B4: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Pola)",
  fullTitle: "Sub-Bab B: Pola",
  targetDescription:
    "Siswa mengenali pola sebagai hal yang berulang dan teratur, menemukan satuan pola, membedakan pola bentuk, warna, gerakan, dan suara, membedakan barisan yang berpola dari yang bukan pola, melanjutkan pola yang sudah ada, mengisi bagian yang hilang, serta membuat pola sendiri.",
  secondaryBg: "#FCE7F3",
  secondaryBorder: "#DB2777",
  secondaryText: "#831843",
  silabus: {
    teksSuara: `Kita belajar pola. Pola adalah hal yang berulang dan teratur. Kita menemukan pola pada barisan enam sekawan, pada taplak meja, kaus, gerakan, dan suara tepuk tangan. Kita juga belajar melanjutkan pola, mengisi bagian yang hilang, dan membuat pola sendiri. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa mengenali, meniru, dan melanjutkan pola sederhana berupa bentuk, warna, gerakan, dan suara, membuat pola sendiri, serta menyampaikan pendapat dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab B hlm. 114–124).",
  },
  videos: [
    {
      id: "K2B4B-V1",
      judul: "Enam Sekawan Memanen",
      subjudul: "Hal yang berulang dan teratur",
      adegan: [
        {
          id: "K2B4B-V1-1",
          judul: "Berbaris di sawah",
          ketukan: [
            "Perhatikan keenam sekawan yang sedang memanen padi.",
            "Mereka berbaris dengan urutan Upe, Lili, Halim, Kira, Malosi, dan Tika.",
            "Mereka berbaris secara beraturan.",
          ],
          papan: ["Enam sekawan", "Urutan barisan", "Berbaris beraturan"],
        },
        {
          id: "K2B4B-V1-2",
          judul: "Laki-laki dan perempuan",
          ketukan: [
            "Upe laki-laki, Lili perempuan, dan Halim laki-laki.",
            "Kira perempuan, Malosi laki-laki, dan Tika perempuan.",
            "Polanya adalah laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan.",
            "Hal yang berulang dan teratur dinamakan pola.",
          ],
          papan: ["Upe, Lili, Halim", "Kira, Malosi, Tika", "Laki-laki, perempuan, ...", "Berulang dan teratur"],
        },
        {
          id: "K2B4B-V1-3",
          judul: "Mencari pola",
          ketukan: [
            "Dapatkah kalian menemukan hal yang berulang pada gambar?",
            "Pada barisan ini ada pola jenis kelamin, dan ada juga pola gerakan.",
            "Pola apa lagi yang dapat kalian temukan pada gambar?",
          ],
          papan: ["Cari yang berulang", "Jenis kelamin dan gerakan", "Pola apa lagi?"],
        },
      ],
    },
    {
      id: "K2B4B-V2",
      judul: "Pola Bentuk dan Pola Warna",
      subjudul: "Pola di taplak meja dan kaus",
      adegan: [
        {
          id: "K2B4B-V2-1",
          judul: "Taplak meja",
          ketukan: [
            "Salah satu pola yang sering dijumpai adalah pola bentuk.",
            "Pada taplak meja 1, polanya bunga, segi empat, bunga, segi empat, dan seterusnya.",
            "Pada taplak meja 2, polanya hati, hati, segitiga, segitiga, hati, hati.",
          ],
          papan: ["Pola bentuk", "Taplak 1: bunga, segi empat", "Taplak 2: hati, hati, segitiga"],
        },
        {
          id: "K2B4B-V2-2",
          judul: "Kaus dan gelas",
          ketukan: [
            "Selain pola bentuk, kita juga mengenal pola warna.",
            "Pada kaus, polanya merah, biru, merah, biru, dan seterusnya.",
            "Warna ikan pada gelas juga membentuk pola warna.",
          ],
          papan: ["Pola warna", "Kaus: merah, biru", "Warna ikan di gelas"],
        },
        {
          id: "K2B4B-V2-3",
          judul: "Pola atau bukan?",
          ketukan: [
            "Tidak semua barisan benda adalah pola.",
            "Pola harus berulang dan teratur.",
            "Lingkaran, segitiga, lingkaran, segitiga, lingkaran, segitiga adalah pola.",
            "Lingkaran, segitiga, segitiga, lingkaran, segitiga, lingkaran bukan pola, karena kelompoknya tidak berulang dengan teratur.",
          ],
          papan: ["Tidak semua pola", "Berulang dan teratur", "Lingkaran, segitiga: pola", "Acak: bukan pola"],
        },
      ],
    },
    {
      id: "K2B4B-V3",
      judul: "Pola Gerakan dan Pola Suara",
      subjudul: "Bergerak dan bertepuk tangan",
      adegan: [
        {
          id: "K2B4B-V3-1",
          judul: "Gerakan berpola",
          ketukan: [
            "Pada gambar, anak-anak bergerak membungkuk, berdiri, membungkuk, berdiri, dan seterusnya.",
            "Itu adalah pola gerakan.",
            "Gerakan lain juga dapat membentuk pola, misalnya tangan naik dan tangan turun.",
          ],
          papan: ["Membungkuk, berdiri", "Pola gerakan", "Tangan naik, tangan turun"],
        },
        {
          id: "K2B4B-V3-2",
          judul: "Tepuk tangan",
          ketukan: [
            "Ayo bertepuk tangan: tepuk satu kali, tepuk dua kali, tepuk tiga kali, dan tepuk empat kali.",
            "Lakukan secara berulang-ulang.",
            "Suara yang dihasilkan dari menepuk tangan juga membentuk pola.",
          ],
          papan: ["Tepuk 1, 2, 3, 4", "Ulangi terus", "Pola suara"],
        },
        {
          id: "K2B4B-V3-3",
          judul: "Pola di sekitar kita",
          ketukan: [
            "Amati benda-benda di sekitar kita dan temukan pola warna dan pola bentuk.",
            "Tulis hasilnya pada tabel, lalu ceritakan kepada temanmu.",
            "Dalam kelompok, buatlah pola gerakan dan pola suara.",
            "Presentasikan hasilnya di depan kelas.",
          ],
          papan: ["Amati sekitar", "Tulis di tabel", "Buat pola kelompok", "Presentasikan"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Hal yang Berulang dan Teratur",
      stepDesc:
        "Keenam sekawan berbaris dengan urutan laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan. Urutan itu berulang dan teratur. Hal yang berulang dan teratur dinamakan pola. Pola ada di sekitar kita, di sawah, di rumah, dan di sekolah.",
      icon: "🔄",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Satuan Pola",
      stepDesc:
        "Setiap pola punya kelompok terkecil yang berulang, dinamakan satuan pola. Pada merah, biru, merah, biru, satuannya adalah merah, biru. Pada A, A, B, A, A, B, satuannya adalah A, A, B. Kalau kita tahu satuannya, kita dapat melanjutkan pola sejauh yang kita mau.",
      icon: "🧩",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Pola Bentuk",
      stepDesc:
        "Pola bentuk disusun dari bentuk yang berulang. Taplak meja 1 berpola bunga, segi empat, bunga, segi empat. Taplak meja 2 berpola hati, hati, segitiga, segitiga, hati, hati. Satuannya bisa terdiri dari dua bentuk, atau empat bentuk.",
      icon: "🔷",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Pola Warna",
      stepDesc:
        "Pola warna disusun dari warna yang berulang. Kaus berpola merah, biru, merah, biru. Untaian manik dapat berpola jingga, jingga, biru, biru. Bentuk benda sama, tetapi warnanya berganti secara teratur.",
      icon: "🎨",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Pola Gerakan",
      stepDesc:
        "Gerakan yang berulang membentuk pola gerakan. Membungkuk, berdiri, membungkuk, berdiri adalah pola gerakan. Kita juga dapat membuat pola dengan tangan naik, tangan turun, atau berputar. Cobalah bersama teman: satu menggerakkan, yang lain melanjutkan.",
      icon: "🤸",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Pola Suara",
      stepDesc:
        "Suara yang berulang membentuk pola suara. Tepuk satu kali, dua kali, tiga kali, empat kali, lalu ulangi. Kita juga dapat membuat pola dengan tepuk keras dan tepuk pelan, atau dengan jeda diam. Pola suara dapat didengar dan dirasakan, bukan hanya dilihat.",
      icon: "👏",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Melanjutkan Pola",
      stepDesc:
        "Untuk melanjutkan pola, cari dulu satuan polanya: kelompok yang muncul lagi dari awal. Lalu lanjutkan dengan urutan yang sama. Pada hati, kuning, hati, kuning, hati, yang berikutnya kuning. Periksa kembali dengan membaca seluruh barisan dari awal.",
      icon: "➡️",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Membuat Pola dan Memeriksa",
      stepDesc:
        "Kita dapat membuat pola sendiri dengan memilih satuan, lalu mengulangnya. Pola yang baik punya paling sedikit dua unsur berbeda dan berulang teratur. Barisan yang semuanya sama, atau yang kelompoknya selalu berganti, bukan pola. Periksa polamu dengan bertanya: apakah kelompok ini berulang?",
      icon: "✨",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    {
      judul: "Apa Itu Pola?",
      emoji: "🔄",
      countNum: 2,
      countWord: "Dua",
      suara: "Pola adalah hal yang berulang dan teratur. Dua kata kunci pola adalah berulang dan teratur.",
    },
    {
      judul: "Satuan Pola",
      emoji: "🧩",
      countNum: 2,
      countWord: "Dua",
      suara: "Satuan pola adalah kelompok terkecil yang berulang. Pada merah, biru, merah, biru, satuannya merah dan biru.",
    },
    {
      judul: "Pola Bentuk",
      emoji: "🔷",
      countNum: 2,
      countWord: "Dua",
      suara: "Taplak meja 1 berpola bunga, segi empat. Taplak meja 2 berpola hati, hati, segitiga, segitiga. Itu adalah pola bentuk.",
    },
    {
      judul: "Pola Warna",
      emoji: "🎨",
      countNum: 2,
      countWord: "Dua",
      suara: "Kaus berpola merah, biru, merah, biru. Warna ikan pada gelas juga membentuk pola warna.",
    },
    {
      judul: "Pola Gerakan",
      emoji: "🤸",
      countNum: 2,
      countWord: "Dua",
      suara: "Membungkuk, berdiri, membungkuk, berdiri adalah pola gerakan. Tangan naik dan tangan turun juga dapat membentuk pola.",
    },
    {
      judul: "Pola Suara",
      emoji: "👏",
      countNum: 4,
      countWord: "Empat",
      suara: "Tepuk satu kali, dua kali, tiga kali, dan empat kali, lalu diulang. Suara yang berulang membentuk pola suara.",
    },
    {
      judul: "Kode Huruf",
      emoji: "🔤",
      countNum: 3,
      countWord: "Tiga",
      suara: "Pola dapat ditulis dengan huruf. Merah, biru, merah, biru ditulis A, B, A, B. Hati, hati, segitiga ditulis A, A, B.",
    },
    {
      judul: "Pola atau Bukan?",
      emoji: "❓",
      countNum: 2,
      countWord: "Dua",
      suara: "Barisan yang kelompoknya berulang teratur adalah pola. Barisan yang semuanya sama, atau yang kelompoknya tidak beraturan, bukan pola.",
    },
    {
      judul: "Melanjutkan Pola",
      emoji: "➡️",
      countNum: 3,
      countWord: "Tiga",
      suara: "Untuk melanjutkan pola, cari satuan polanya, lanjutkan dengan urutan yang sama, lalu periksa dari awal. Setelah A, A, B, A, A, B, A, A, yang berikutnya B.",
    },
    {
      judul: "Pola di Sekitarku",
      emoji: "🏡",
      countNum: 4,
      countWord: "Empat",
      suara: "Pola ada di sekitar kita: pola warna pada kaus, pola bentuk pada taplak, pola gerakan pada senam, dan pola suara pada tepuk tangan.",
    },
  ],
  games: [
    {
      stage: "Concrete",
      gameType: "continue-bead-pattern",
      title: "Rangkai Manik-Manik",
      bookReference: "hlm. 116 (pola warna: merah, biru, merah, biru) dan hlm. 114 (hal yang berulang dan teratur)",
      objective: "Melanjutkan untaian manik berpola warna dengan memilih warna manik berikutnya.",
      mechanicDescription:
        "Empat ronde (dua warna, dua warna berselang dua, tiga warna, dua kelompok dua warna). Untaian menampilkan manik berpola, diikuti tiga atau empat tempat kosong. Siswa mengetuk warna manik yang tepat untuk tempat kosong berikutnya. Warna yang salah memberi petunjuk tentang satuan pola.",
      voiceGuide: "Pilih warna manik berikutnya.",
      emoji: "📿",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "arrange-friends-pattern",
      title: "Atur Barisan Sahabat",
      bookReference: "hlm. 114 (enam sekawan berbaris: laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan)",
      objective: "Menyusun enam sahabat dalam satu barisan sehingga sifat mereka membentuk pola yang diminta.",
      mechanicDescription:
        "Tiga ronde (laki-laki dan perempuan bergantian, perempuan dan laki-laki bergantian, dua topi merah lalu satu topi biru). Siswa mengetuk seorang sahabat, lalu mengetuk tempat di barisan. Barisan diperiksa dari sifat tiap sahabat, dan semua susunan yang membentuk pola diterima.",
      voiceGuide: "Susun sahabat sehingga barisan membentuk pola.",
      emoji: "🧑‍🤝‍🧑",
      targetCount: 3,
    },
    {
      stage: "Concrete",
      gameType: "continue-movement-pattern",
      title: "Gerakan Berpola",
      bookReference: "hlm. 116 (pola gerakan: membungkuk, berdiri, membungkuk, berdiri)",
      objective: "Melanjutkan pola gerakan dengan memilih gerakan berikutnya.",
      mechanicDescription:
        "Empat ronde. Barisan anak menampilkan gerakan membungkuk, berdiri, dan tangan naik yang berpola, lalu tiga tempat kosong. Siswa mengetuk gerakan berikutnya. Gerakan yang salah memberi petunjuk, dan siswa boleh menirukan gerakannya sendiri di tempat duduk.",
      voiceGuide: "Pilih gerakan berikutnya, lalu tirukan.",
      emoji: "🤸",
      targetCount: 4,
    },
    {
      stage: "Concrete",
      gameType: "continue-clap-pattern",
      title: "Tepuk Berpola",
      bookReference: "hlm. 117 (pola suara: tepuk satu kali, dua kali, tiga kali, empat kali)",
      objective: "Melanjutkan pola tepukan keras, pelan, dan diam, dan mendengarnya sebagai bunyi.",
      mechanicDescription:
        "Empat ronde. Barisan tepukan menampilkan lingkaran besar untuk keras, lingkaran kecil untuk pelan, dan cincin putus-putus untuk diam. Tombol Dengarkan memutar pola dengan bunyi dari perangkat. Siswa mengetuk tepukan berikutnya, dan tiap ketukan berbunyi. Bunyi dibuat di perangkat tanpa berkas dan tanpa layanan luar.",
      voiceGuide: "Dengarkan pola, lalu pilih tepukan berikutnya.",
      emoji: "👏",
      targetCount: 4,
    },
    {
      stage: "Picture",
      gameType: "is-it-a-pattern",
      title: "Pola atau Bukan?",
      bookReference: "hlm. 118 (Ayo Berlatih nomor 1: beri tanda centang pada gambar yang menunjukkan pola)",
      objective: "Menentukan apakah sebuah barisan bangun polos membentuk pola atau bukan.",
      mechanicDescription:
        "Dua ronde, tiap ronde empat barisan bangun polos. Siswa menekan centang bila barisan itu pola, dan silang bila bukan. Barisan yang semuanya sama dan barisan yang kelompoknya tidak teratur bukan pola. Kunci dihitung oleh program dari satuan terpendek yang berulang.",
      voiceGuide: "Centang bila berulang teratur, silang bila bukan.",
      diagramType: "pattern-or-not",
      numberA: 2,
      numberB: 4,
    },
    {
      stage: "Picture",
      gameType: "continue-shape-pattern",
      title: "Lanjutkan Pola",
      bookReference: "hlm. 119 (Ayo Berlatih nomor 2: lanjutkan pola dengan melingkari gambar berikutnya)",
      objective: "Melanjutkan pola bentuk polos dengan memilih dua bentuk berikutnya.",
      mechanicDescription:
        "Empat ronde. Barisan bangun polos berpola ditampilkan, diikuti dua tempat kosong. Siswa mengetuk bentuk yang tepat untuk tiap tempat kosong dari tiga pilihan. Kunci dihitung dari satuan pola.",
      voiceGuide: "Pilih bentuk berikutnya.",
      diagramType: "continue-shapes",
      numberA: 4,
      numberB: 2,
    },
    {
      stage: "Picture",
      gameType: "color-to-make-pattern",
      title: "Warnai Pola",
      bookReference: "hlm. 119–120 (Ayo Berlatih nomor 3 dan 4: warnai gambar untuk melanjutkan dan membentuk pola)",
      objective: "Mewarnai bangun polos untuk melanjutkan pola warna, dan membuat pola warna sendiri.",
      mechanicDescription:
        "Empat ronde. Pada tiga ronde pertama, beberapa bangun sudah berwarna dan siswa mewarnai sisanya agar pola berlanjut. Pada ronde terakhir siswa membuat pola sendiri dari delapan bangun, dan polanya diterima bila berulang teratur dengan paling sedikit dua warna. Ketuk bangun untuk berganti warna.",
      voiceGuide: "Ketuk bangun untuk mengganti warnanya.",
      diagramType: "color-pattern",
      numberA: 4,
      numberB: 9,
    },
    {
      stage: "Abstract",
      gameType: "fill-pattern-blanks",
      title: "Isi Kotak Pola",
      bookReference: "hlm. 121 (Evaluasi nomor 3 dan 5: lanjutkan pola dan isilah kotak untuk membentuk pola)",
      objective: "Mengisi kotak kosong pada barisan huruf dan kata sehingga membentuk pola.",
      mechanicDescription:
        "Empat ronde pada barisan huruf A B dan kata warna atau ukuran. Dua kotak kosong ada di tengah atau di ujung barisan. Siswa memilih kartu untuk tiap kotak kosong secara berurutan. Barisan yang sudah lengkap dibacakan Suara Guru.",
      voiceGuide: "Pilih kartu untuk kotak kosong.",
      symbolLarge: "A B",
      wordLarge: "ISI KOTAK",
      mathNotation: "A B A B ___ ___",
    },
    {
      stage: "Abstract",
      gameType: "find-repeating-unit",
      title: "Cari Satuan Pola",
      bookReference: "hlm. 114 (hal yang berulang dan teratur dinamakan pola)",
      objective: "Menemukan satuan pola, yaitu kelompok terkecil yang berulang, pada barisan huruf.",
      mechanicDescription:
        "Empat ronde. Barisan huruf seperti A A B A A B A A B ditampilkan, lalu tiga pilihan kelompok. Siswa memilih kelompok yang dimulai dari awal dan menyusun seluruh barisan bila diulang. Kunci dihitung oleh program.",
      voiceGuide: "Pilih kelompok yang berulang dari awal.",
      symbolLarge: "A A B",
      wordLarge: "SATUAN POLA",
      mathNotation: "A A B | A A B | A A B",
    },
    {
      stage: "Abstract",
      gameType: "concept-map-fill",
      title: "Peta Konsep Pola",
      bookReference: "hlm. 102 (peta konsep: pola bentuk, pola warna, pola gerakan, pola suara)",
      objective: "Melengkapi peta konsep pola dengan definisi, macam, contoh, dan pendapat sendiri.",
      mechanicDescription:
        "Dua peta konsep, satu untuk pola dan satu untuk satuan pola. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.",
      voiceGuide: "Pilih kartu yang tepat untuk kotak yang menyala.",
      symbolLarge: "🔄",
      wordLarge: "PETA KONSEP",
      mathNotation: "pola • satuan • macam",
    },
  ],
  poin: [
    {
      ikon: "🔄",
      nama: "Pola",
      isi: "hal yang berulang dan teratur",
      suara: "Pola adalah hal yang berulang dan teratur. Barisan yang semuanya sama atau tidak teratur bukan pola.",
    },
    {
      ikon: "🧩",
      nama: "Satuan pola",
      isi: "kelompok terkecil yang berulang",
      suara: "Satuan pola adalah kelompok terkecil yang berulang. Dengan mengetahui satuan pola, kita dapat melanjutkan pola.",
    },
    {
      ikon: "🎨",
      nama: "Empat macam pola",
      isi: "bentuk, warna, gerakan, suara",
      suara: "Ada empat macam pola yang kita pelajari: pola bentuk, pola warna, pola gerakan, dan pola suara.",
    },
    {
      ikon: "➡️",
      nama: "Melanjutkan pola",
      isi: "cari satuan, ulangi urutannya",
      suara: "Untuk melanjutkan pola, cari satuannya, lanjutkan dengan urutan yang sama, lalu periksa dari awal.",
    },
    {
      ikon: "✨",
      nama: "Membuat pola",
      isi: "pilih satuan, ulang teratur",
      suara: "Untuk membuat pola, pilih satuan dengan paling sedikit dua unsur berbeda, lalu ulangi secara teratur.",
    },
  ],
  poinSuara:
    "Ingat selalu! Pola adalah hal yang berulang dan teratur. Kelompok terkecil yang berulang disebut satuan pola. Ada pola bentuk, pola warna, pola gerakan, dan pola suara. Untuk melanjutkan pola, cari satuannya dan ulangi urutan yang sama.",
  cara: {
    suara: "Cara menyebutkan. Hal yang berulang dan teratur adalah pola.",
    potongan: [
      { teks: "Hal yang", warna: "#FFFFFF" },
      { teks: "berulang", warna: "#FFE566" },
      { teks: "dan teratur", warna: "#FFE566" },
      { teks: "adalah pola", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: temukan tiga pola warna dan tiga pola bentuk di rumahmu, misalnya pada taplak, keramik, atau pakaian, lalu tulis di tabel Pola di Sekitarku. Buatlah satu pola gerakan dan satu pola suara bersama keluargamu, lalu mintalah mereka melanjutkannya.",
  refleksi: [
    "Aku bisa mengidentifikasi pola bentuk, warna, gerakan, dan suara.",
    "Aku bisa melanjutkan pola bentuk, warna, gerakan, dan suara.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

export const SUB_BAB_K2B4: SubBabNaskah[] = [SUB_A4, SUB_B4];

/** Semua adegan video (untuk uji dan pembangkit). */
export const semuaAdeganK2B4 = SUB_BAB_K2B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
