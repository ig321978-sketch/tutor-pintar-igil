/**
 * Naskah murni Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar). Sub-Bab A (Sisi pada Bangun Datar). Sumber: Buku Siswa
 * Matematika Kelas III Kemendikbudristek, Bab 4 hlm. 143-185, serta Buku Panduan Guru Bab 4, diperkaya dengan benda nyata
 * yang bersisi, penggaris bermilimeter, dan bangun datar polos bernomor huruf. Satu sumber kebenaran: komponen Tahap SMICPA
 * membaca berkas ini, dan pembangkit master (src/content-master/buat-k3-bab4.mjs) memakainya untuk menulis
 * src/data/kelas3-bab4.json. Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k3b4.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K3B4_META = {
  chapterId: "k3-mat-bab4",
  phaseCode: "FASE_B",
  grade: 3,
  subjectLabel: "MATEMATIKA - KELAS 3 SD",
  title: "BAB 4: UNSUR-UNSUR BANGUN DATAR",
  silabusElemen: "🌈 Fase B • Elemen Geometri: Unsur-Unsur Bangun Datar (Sisi, Sudut, Garis Tegak Lurus, dan Garis Sejajar) (Kelas 3 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Mengingat titik dan garis", "Sinar garis, garis, dan ruas garis", "Kurva atau garis lengkung", "Dua titik dan ruas garis", "Mengukur ruas garis dengan penggaris", "Sentimeter dan milimeter", "Menggambar ruas garis", "Sisi bangun datar", "Siap mengenal sisi bangun datar"];

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
/* SUB-BAB A. Sisi pada bangun datar                                        */
/* ====================================================================== */

export const SUB_A34: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Sisi pada Bangun Datar)",
  fullTitle: "Sub-Bab A: Sisi pada Bangun Datar",
  targetDescription:
    "Siswa mengenal titik, sinar garis, garis, ruas garis, dan kurva (garis lengkung), mengukur panjang ruas garis dengan penggaris dalam sentimeter dan milimeter (1 cm = 10 mm), menulis panjang seperti 5 cm 5 mm = 5,5 cm, menggambar ruas garis dengan ukuran tertentu, serta mengenal sisi sebagai ruas garis pembatas bangun datar dan menghitung banyak sisinya.",
  secondaryBg: "#E0E7FF",
  secondaryBorder: "#4F46E5",
  secondaryText: "#312E81",
  silabus: {
    teksSuara: `Kita belajar sisi pada bangun datar. Kita mengingat titik dan garis, lalu mengenal sinar garis, garis, ruas garis, dan kurva. Kita mengukur ruas garis dengan penggaris dalam sentimeter dan milimeter, lalu mengenal sisi sebagai ruas garis pembatas bangun datar. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menggambar dan menjelaskan unsur-unsur bangun datar. Pada sub-bab ini siswa mengenal ruas garis, mengukur panjangnya, dan mengenal sisi bangun datar.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab A hlm. 146–153) dan Buku Panduan Guru Bab 4 Topik A.",
  },
  videos: [
    {
      id: "K3B4A-V1",
      judul: "Titik dan Garis",
      subjudul: "Sinar garis, garis, dan ruas garis",
      adegan: [
        {
          id: "K3B4A-V1-1",
          judul: "Mengingat garis",
          ketukan: [
            "Kita sudah mengenal garis lurus dan garis lengkung di Kelas 2.",
            "Garis lengkung juga disebut kurva.",
            "Sekarang kita kenali sinar garis, garis, dan ruas garis.",
            "Semuanya dibuat dari titik-titik yang berurutan.",
          ],
          papan: ["Garis lurus dan lengkung", "Garis lengkung = kurva", "Sinar, garis, ruas garis", "Dibuat dari titik"],
        },
        {
          id: "K3B4A-V1-2",
          judul: "Sinar garis dan garis",
          ketukan: [
            "Sinar garis AB berpangkal di titik A dan menuju titik B.",
            "Sinar garis hanya dapat diperpanjang ke satu sisi.",
            "Garis CD dapat diperpanjang ke kedua sisi.",
            "Garis tidak punya ujung, jadi panjangnya tak terhingga.",
          ],
          papan: ["Sinar garis AB", "Satu sisi saja", "Garis CD: kedua sisi", "Tidak punya ujung"],
        },
        {
          id: "K3B4A-V1-3",
          judul: "Ruas garis",
          ketukan: [
            "Ruas garis KL memiliki dua titik ujung.",
            "Ruas garis memiliki panjang tertentu atau tetap.",
            "Ruas garis ditulis dengan dua huruf, yaitu KL.",
            "Panjang ruas garis dapat diukur dengan penggaris.",
          ],
          papan: ["Ruas garis KL", "Panjang tetap", "Ditulis KL", "Diukur dengan penggaris"],
        },
      ],
    },
    {
      id: "K3B4A-V2",
      judul: "Dua Titik dan Kurva",
      subjudul: "Banyak jalan antara dua titik",
      adegan: [
        {
          id: "K3B4A-V2-1",
          judul: "Dua titik",
          ketukan: [
            "Ada dua titik berbeda, yaitu P dan Q.",
            "Kedua titik itu hanya dapat dihubungkan dengan satu ruas garis lurus.",
            "Ruas garis itu adalah PQ.",
            "Penggaris dipakai untuk menggambarnya.",
          ],
          papan: ["Titik P dan Q", "Satu ruas garis lurus", "Ruas garis PQ", "Digambar dengan penggaris"],
        },
        {
          id: "K3B4A-V2-2",
          judul: "Banyak kurva",
          ketukan: [
            "Titik E dan F dapat dihubungkan dengan garis lengkung.",
            "Ada kurva hijau, merah, dan biru.",
            "Kurva yang menghubungkan E dan F tak terhingga banyaknya.",
            "Jadi ruas garis hanya satu, tetapi kurva ada banyak.",
          ],
          papan: ["Titik E dan F", "Hijau, merah, biru", "Kurva tak terhingga", "Ruas satu, kurva banyak"],
        },
        {
          id: "K3B4A-V2-3",
          judul: "Bukan kurva",
          ketukan: [
            "Perhatikan gambar yang tampak melengkung ini.",
            "Ternyata gambar itu gabungan empat ruas garis.",
            "Ruas garisnya adalah PK, KL, LM, dan MQ.",
            "Gabungan ruas garis bukan garis lengkung.",
          ],
          papan: ["Tampak melengkung", "Gabungan empat ruas", "PK, KL, LM, MQ", "Bukan garis lengkung"],
        },
      ],
    },
    {
      id: "K3B4A-V3",
      judul: "Mengukur Ruas Garis",
      subjudul: "Aktivitas 1: penggaris, cm, dan mm",
      adegan: [
        {
          id: "K3B4A-V3-1",
          judul: "Sentimeter dan milimeter",
          ketukan: [
            "Penggaris memiliki satuan sentimeter dan garis-garis kecil.",
            "Garis kecil membagi satu sentimeter menjadi 10 bagian.",
            "Tiap bagian kecil adalah satu milimeter.",
            "Jadi 1 cm sama dengan 10 mm.",
          ],
          papan: ["cm dan garis kecil", "Satu cm jadi 10 bagian", "Satu bagian = 1 mm", "1 cm = 10 mm"],
        },
        {
          id: "K3B4A-V3-2",
          judul: "Mengukur AB",
          ketukan: [
            "Letakkan angka 0 penggaris tepat di titik A.",
            "Lihat angka yang sejajar dengan titik B.",
            "Angkanya 5, jadi AB sama dengan 5 cm.",
            "Untuk MN: 5 cm dan 5 mm, yaitu 5,5 cm.",
          ],
          papan: ["Angka 0 di titik A", "Lihat angka di titik B", "AB = 5 cm", "MN = 5,5 cm"],
        },
        {
          id: "K3B4A-V3-3",
          judul: "Ruas garis dan sisi",
          ketukan: [
            "Segitiga EFG dibatasi tiga ruas garis: EF, FG, dan EG.",
            "Ruas garis pembatas bangun datar dinamakan sisi.",
            "Jadi segitiga memiliki tiga sisi.",
            "Bangun segiempat memiliki empat sisi.",
          ],
          papan: ["Segitiga EFG", "Ruas garis = sisi", "Segitiga: 3 sisi", "Segiempat: 4 sisi"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Titik dan Garis",
      stepDesc:
        "Sebelum mempelajari unsur-unsur bangun datar, kita mengingat garis lurus dan garis lengkung atau kurva yang sudah dipelajari di Kelas 2. Kita juga akan mengenal sinar garis, ruas garis, dan sisi bangun datar. Semua garis dibuat dari titik-titik yang berurutan, dan nama titik ditulis dengan huruf kapital.",
      icon: "🔙",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Sinar Garis, Garis, dan Ruas Garis",
      stepDesc:
        "Sinar garis AB berpangkal di titik A dan hanya dapat diperpanjang ke satu sisi. Garis CD dapat diperpanjang ke kedua sisi tanpa ujung. Ruas garis KL memiliki dua titik ujung dan panjang tertentu. Ketiganya ditulis dengan dua huruf, tetapi bentuk gambarnya berbeda: sinar garis memakai satu anak panah, garis dua anak panah, dan ruas garis tanpa anak panah.",
      icon: "📏",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Kurva atau Garis Lengkung",
      stepDesc:
        "Garis yang melengkung disebut kurva. Kurva dapat berbentuk seperti busur atau seperti huruf S. Dua titik yang sama dapat dihubungkan oleh banyak kurva. Pada gambar, titik E dan F dihubungkan oleh tiga kurva berwarna hijau, merah, dan biru, dan kurva yang mungkin sebenarnya tak terhingga banyaknya.",
      icon: "🌈",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Dua Titik dan Ruas Garis",
      stepDesc:
        "Dua titik berbeda, misalnya P dan Q, hanya dapat dihubungkan dengan satu ruas garis lurus, yaitu PQ. Tetapi dua titik yang sama dapat dihubungkan oleh banyak kurva. Gambar yang tampak melengkung bisa saja gabungan beberapa ruas garis, misalnya PK, KL, LM, dan MQ. Gabungan ruas garis bukan garis lengkung.",
      icon: "🔗",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Mengukur Ruas Garis dengan Penggaris",
      stepDesc:
        "Pada Aktivitas 1, kita mengukur panjang ruas garis dengan penggaris. Letakkan angka 0 penggaris tepat di titik awal ruas garis. Lihat angka yang sejajar dengan titik akhir. Bila titik B sejajar angka 5, maka panjang ruas garis AB adalah 5 cm, ditulis AB = 5 cm. Mengukur harus selalu dimulai dari angka 0.",
      icon: "0️⃣",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Sentimeter dan Milimeter",
      stepDesc:
        "Penggaris pendek memiliki satuan sentimeter dan garis-garis kecil yang membagi 1 cm menjadi 10 bagian. Tiap bagian kecil memiliki satuan milimeter, ditulis mm. Jadi 1 cm sama dengan 10 mm. Bila ruas garis MN panjangnya 5 cm dan 5 mm, maka 5 mm sama dengan 0,5 cm, sehingga MN = 5,5 cm. PQ = 3 cm dan 7 mm = 3,7 cm.",
      icon: "🔬",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Menggambar Ruas Garis",
      stepDesc:
        "Untuk menggambar ruas garis dengan ukuran tertentu, tandai titik awal, letakkan angka 0 penggaris di titik itu, tandai titik akhir tepat di angka yang diminta, lalu hubungkan kedua titik dengan penggaris. Ukuran dapat berupa 3 cm, 7 cm, 2 cm 9 mm, atau 11,5 cm. Hubungkan juga pasangan titik yang diberikan dan tulis panjangnya.",
      icon: "✏️",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Sisi Bangun Datar",
      stepDesc:
        "Segitiga EFG dibatasi oleh ruas garis EF, FG, dan EG. Ruas garis yang menjadi batas bangun datar dinamakan sisi. Jadi segitiga memiliki tiga sisi. Bangun GHIJ dibatasi ruas garis GH, HI, IJ, dan GJ, jadi memiliki empat sisi. Setiap sisi punya panjang yang dapat diukur dengan penggaris.",
      icon: "🔺",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    { judul: "Titik dan Garis", emoji: "📍", countNum: 2, countWord: "Dua", suara: "Garis dibuat dari titik-titik yang berurutan. Ada garis lurus dan garis lengkung yang disebut kurva." },
    { judul: "Sinar Garis", emoji: "🔦", countNum: 2, countWord: "Dua", suara: "Sinar garis berpangkal di satu titik dan hanya dapat diperpanjang ke satu sisi." },
    { judul: "Garis", emoji: "🛤️", countNum: 2, countWord: "Dua", suara: "Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung." },
    { judul: "Ruas Garis", emoji: "📏", countNum: 3, countWord: "Tiga", suara: "Ruas garis memiliki dua titik ujung dan panjang tertentu. Panjangnya dapat diukur dengan penggaris." },
    { judul: "Kurva", emoji: "🌈", countNum: 2, countWord: "Dua", suara: "Kurva adalah garis lengkung. Dua titik dapat dihubungkan oleh banyak kurva." },
    { judul: "Dua Titik", emoji: "🔗", countNum: 2, countWord: "Dua", suara: "Dua titik berbeda hanya dapat dihubungkan dengan satu ruas garis lurus." },
    { judul: "cm dan mm", emoji: "🔬", countNum: 2, countWord: "Dua", suara: "Satu sentimeter sama dengan sepuluh milimeter. Lima milimeter sama dengan nol koma lima sentimeter." },
    { judul: "Mengukur Ruas Garis", emoji: "0️⃣", countNum: 3, countWord: "Tiga", suara: "Letakkan angka nol penggaris di titik awal. Lihat angka di titik akhir. Tulis panjangnya dengan satuan." },
    { judul: "Sisi", emoji: "🔺", countNum: 3, countWord: "Tiga", suara: "Ruas garis pembatas bangun datar dinamakan sisi. Segitiga punya tiga sisi dan persegi punya empat sisi." },
    { judul: "Cara Mengukur", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, letakkan angka nol di titik awal. Dua, lihat angka di titik akhir. Tiga, baca sentimeter dan milimeternya. Empat, tulis hasilnya dengan satuan." },
  ],
  games: [
    C("count-sides-object", "Hitung Sisi Benda", "hlm. 145 dan 153 (benda yang menyerupai bangun datar)", "Menghitung banyak sisi lurus pada benda sehari-hari.", "Tiga ronde, tiap ronde dua soal. Benda ditampilkan, lalu siswa memilih satu dari tiga banyak sisi. Pengecoh lebih satu atau kurang satu.", "Hitung banyak sisi pada benda.", "📖", 6),
    C("object-like-line", "Bendanya Mirip Apa?", "hlm. 146 (sinar garis, garis, ruas garis, kurva)", "Menghubungkan benda nyata dengan sinar garis, garis, ruas garis, atau kurva.", "Tiga ronde, tiap ronde dua benda. Sinar senter, rel kereta api, pensil, penggaris, dan pelangi ditampilkan. Siswa memilih satu dari tiga nama.", "Pilih nama garis yang mirip benda.", "🔦", 6),
    C("read-mm-object", "Baca Panjang dalam cm dan mm", "hlm. 149 (Aktivitas 1: panjang ruas garis)", "Membaca panjang benda dalam sentimeter dan milimeter pada penggaris.", "Tiga ronde, tiap ronde dua soal. Benda ditampilkan di atas penggaris dari angka 0. Siswa memilih satu dari tiga panjang, misalnya 5 cm 5 mm.", "Baca panjang benda dalam cm dan mm.", "📏", 6),
    C("match-object-sides", "Jodohkan Benda dan Banyak Sisi", "hlm. 145 dan 153 (sisi bangun datar)", "Menjodohkan benda dengan banyak sisi lurusnya.", "Tiga ronde, tiap ronde tiga benda dan tiga banyak sisi. Siswa mengetuk benda, lalu mengetuk banyak sisi yang cocok.", "Ketuk benda, lalu ketuk banyak sisinya.", "🔗", 9),
    C("memory-object-sides", "Memori Benda dan Banyak Sisi", "hlm. 153 (sisi bangun datar)", "Mencocokkan benda dengan banyak sisinya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari benda dan sisinya.", "🃏", 12),
    C("tap-object-sides", "Ketuk Benda dengan Sisi Tertentu", "hlm. 153 (sisi bangun datar)", "Menemukan benda yang punya banyak sisi seperti yang diminta.", "Tiga ronde, tiap ronde tiga benda dan dua pertanyaan. Siswa mengetuk benda yang banyak sisinya sama dengan yang disebut.", "Ketuk benda dengan sisi itu.", "👆", 6),
    C("tap-all-sides", "Ketuk Semua Benda dengan Sisi Tertentu", "hlm. 145 (benda menyerupai bangun datar)", "Menemukan semua benda yang punya banyak sisi tertentu.", "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("board-mm", "Papan Panjang dalam Milimeter", "hlm. 148–149 (1 cm = 10 mm)", "Menulis panjang benda dalam milimeter pada papan ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang benda pada penggaris, lalu mengubahnya ke milimeter pada papan dan menekan Periksa.", "Isi papan dengan milimeternya.", "🗂️", 6),
    C("order-mm", "Urutkan Benda menurut Panjang", "hlm. 151 (mengukur panjang benda sekitar)", "Mengurutkan tiga benda menurut panjangnya dalam cm dan mm.", "Tiga ronde, tiap ronde tiga benda di atas penggaris bertanda huruf. Siswa mengetuk benda satu per satu dari yang terpendek atau terpanjang.", "Ketuk benda menurut panjangnya.", "📶", 9),
    C("sum-sides", "Jumlah Sisi Dua Benda", "hlm. 145 dan 153 (banyak sisi benda)", "Menjumlahkan banyak sisi dari dua benda.", "Tiga ronde, tiap ronde dua benda. Siswa menghitung sisi tiap benda, lalu memilih satu dari tiga jumlah sisi.", "Jumlahkan sisi kedua benda.", "➕", 6),
    P("line-kind", "Garis, Sinar, atau Ruas Garis", "hlm. 146–147 (sinar garis, garis, ruas garis, kurva)", "Menentukan jenis garis dari gambarnya: sinar garis, garis, ruas garis, atau kurva.", "Tiga ronde, tiap ronde dua soal. Gambar garis berhuruf ditampilkan. Siswa memilih satu dari tiga nama.", "Pilih nama garis pada gambar.", "line-kind", 3, 2),
    P("read-ruler-mm", "Baca Ruas Garis pada Penggaris", "hlm. 148–149 (Aktivitas 1: mengukur ruas garis)", "Membaca panjang ruas garis pada penggaris bermilimeter.", "Tiga ronde, tiap ronde dua soal. Ruas garis dari angka 0 ditampilkan. Siswa memilih satu dari tiga panjang dalam cm dan mm.", "Baca panjang ruas garis.", "ruler-read", 3, 2),
    P("match-segment-length", "Jodohkan Ruas Garis dan Panjang", "hlm. 149–150 (menulis panjang ruas garis)", "Menjodohkan ruas garis pada penggaris dengan panjangnya.", "Tiga ronde, tiap ronde tiga ruas garis dan tiga panjang. Siswa mengetuk ruas garis, lalu mengetuk panjang yang cocok.", "Ketuk ruas garis, lalu ketuk panjangnya.", "ruler-match", 3, 3),
    P("memory-line-name", "Memori Garis dan Namanya", "hlm. 146–147 (sinar garis, garis, ruas garis, kurva)", "Mencocokkan gambar garis dengan namanya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari gambar dan namanya.", "line-memory", 3, 4),
    P("fill-sides-table", "Isi Tabel Sisi Bangun Datar", "hlm. 153 (sisi bangun datar)", "Melengkapi tabel bangun datar dan banyak sisinya.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu banyak sisi yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu banyak sisi.", "sides-table", 3, 4),
    P("tap-all-polygon", "Ketuk Semua Bangun dengan Sisi Tertentu", "hlm. 153 (Ayo Berlatih B: sisi bangun datar)", "Menemukan semua bangun datar yang memiliki banyak sisi tertentu.", "Tiga ronde, tiap ronde empat bangun dan satu perintah. Siswa mengetuk semua bangun yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "polygon-select", 3, 4),
    P("sort-straight-curve", "Pilah Garis: Lurus atau Lengkung", "hlm. 146–147 (garis lurus dan kurva)", "Memilah gambar garis menjadi garis lurus dan garis lengkung.", "Tiga ronde, tiap ronde enam gambar garis dan dua kotak. Sinar garis, garis, dan ruas garis adalah lurus, kurva adalah lengkung. Siswa menyeret atau mengetuk gambar ke kotak yang tepat.", "Pilah gambar ke kotak yang tepat.", "line-sort", 3, 6),
    P("order-measure-segment", "Urutkan Langkah Mengukur Ruas Garis", "hlm. 148–149 (cara menggunakan penggaris)", "Mengurutkan langkah mengukur dan menggambar ruas garis.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    P("board-ruler-mm", "Papan Milimeter dari Penggaris", "hlm. 149 (5 cm 5 mm = 55 mm)", "Menulis panjang ruas garis dalam milimeter pada papan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca ruas garis pada penggaris, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan milimeternya.", "ruler-board", 3, 2),
    P("polygon-sides-names", "Nama Sisi Bangun Datar", "hlm. 153 (Ayo Berlatih B nomor 3 dan 4: tulislah sisi-sisinya)", "Memilih daftar sisi yang tepat dari bangun datar berhuruf.", "Tiga ronde, tiap ronde dua soal. Segitiga atau segiempat berhuruf ditampilkan. Siswa memilih satu dari tiga daftar sisi.", "Pilih daftar sisi yang tepat.", "polygon-names", 3, 2),
    A("name-line-text", "Nama Garis dan Bagian Bangun Datar", "hlm. 146–153 (sinar garis, ruas garis, kurva, sisi)", "Memilih nama garis atau bagian bangun datar dari uraiannya.", "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian, lalu memilih satu dari tiga nama.", "Pilih nama yang tepat.", "AB", "NAMA", "sinar • garis • ruas"),
    A("complete-line-sentence", "Lengkapi Kalimat Garis dan Sisi", "hlm. 146–153 (sinar garis, ruas garis, dan sisi)", "Melengkapi kalimat tentang garis, penggaris, dan sisi bangun datar.", "Tiga soal, tiap soal tiga kalimat, misalnya satu sentimeter sama dengan sepuluh ... Siswa memilih satu dari tiga kata.", "Pilih kata untuk bagian kosong.", "…", "LENGKAPI", "garis • ukuran • sisi"),
    A("convert-cm-mm", "Ubah Sentimeter dan Milimeter", "hlm. 148–149 (1 cm = 10 mm, 5 mm = 0,5 cm)", "Mengubah ukuran antara sentimeter dan milimeter.", "Tiga ronde, tiap ronde dua soal, misalnya 3 cm 7 mm = ... cm. Siswa memilih satu dari tiga hasil.", "Pilih hasil perubahan satuannya.", "cm mm", "UBAH", "10 mm = 1 cm"),
    A("match-length-text", "Jodohkan Ukuran Panjang", "hlm. 149 dan 151 (menulis panjang ruas garis)", "Menjodohkan dua cara menulis panjang yang sama.", "Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya.", "Ketuk ukuran, lalu ketuk pasangannya.", "= ?", "JODOHKAN", "cm • mm"),
    A("memory-length-text", "Memori Ukuran Panjang", "hlm. 149 dan 151 (ukuran yang sama)", "Mencocokkan dua cara menulis panjang yang sama lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari ukuran yang sama.", "mm", "MEMORI", "ukuran yang sama"),
    A("true-false-lines", "Benar atau Salah: Garis dan Sisi", "hlm. 146–153 (sinar garis, ruas garis, dan sisi)", "Menilai pernyataan tentang garis, ukuran, dan sisi bangun datar.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-lines", "Detektif Ruas Garis dan Sisi", "hlm. 149 dan 153 (ukuran dan sisi)", "Menemukan bilangan dari dua petunjuk tentang milimeter dan sisi.", "Empat soal. Siswa membaca petunjuk dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-lines", "Peta Konsep Garis dan Sisi", "hlm. 144 (peta konsep Bab 4)", "Melengkapi peta konsep titik, garis, dan sisi bangun datar.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "garis • ukuran • sisi"),
    A("story-segment", "Soal Cerita Ruas Garis dan Sisi", "hlm. 149–153 (panjang ruas garis dan sisi)", "Menyelesaikan soal cerita tentang panjang ruas garis dan sisi bangun datar.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam mm atau cm.", "Baca cerita, lalu pilih hasilnya.", "mm", "CERITA", "selisih • jumlah"),
    A("sentence-lines", "Susun Kata Garis dan Sisi", "hlm. 146–153 (sinar garis, ruas garis, sisi)", "Menyusun kalimat tentang garis dan sisi dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat garis dan sisi"),
  ],
  poin: [
    { ikon: "🔦", nama: "Sinar garis", isi: "satu pangkal, satu arah", suara: "Sinar garis berpangkal di satu titik dan hanya dapat diperpanjang ke satu sisi." },
    { ikon: "🛤️", nama: "Garis", isi: "kedua sisi, tanpa ujung", suara: "Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung." },
    { ikon: "📏", nama: "Ruas garis", isi: "dua ujung, panjang tetap", suara: "Ruas garis memiliki dua titik ujung dan panjang tertentu. Panjangnya dapat diukur dengan penggaris." },
    { ikon: "🔬", nama: "Sentimeter dan milimeter", isi: "1 cm = 10 mm", suara: "Satu sentimeter sama dengan sepuluh milimeter. Lima milimeter sama dengan nol koma lima sentimeter." },
    { ikon: "🔺", nama: "Sisi", isi: "ruas garis pembatas bangun", suara: "Ruas garis yang menjadi batas bangun datar dinamakan sisi. Segitiga punya tiga sisi." },
  ],
  poinSuara:
    "Ingat selalu! Sinar garis hanya dapat diperpanjang ke satu sisi, garis ke kedua sisi, dan ruas garis punya panjang tetap. Satu sentimeter sama dengan sepuluh milimeter. Ruas garis pembatas bangun datar dinamakan sisi.",
  cara: {
    suara: "Cara mengukur ruas garis. Letakkan angka nol penggaris di titik awal. Lihat angka di titik akhir. Baca sentimeter dan milimeternya. Lalu tulis hasilnya dengan satuan.",
    potongan: [
      { teks: "angka 0 di titik awal", warna: "#BAE6FD" },
      { teks: "lihat titik akhir", warna: "#FECACA" },
      { teks: "baca cm dan mm", warna: "#BFDBFE" },
      { teks: "tulis satuan", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ukurlah panjang buku Matematika, pensil, meja, dan penghapusmu dengan penggaris. Letakkan angka nol di ujung benda, lalu tulis hasilnya dengan cm dan mm. Hitung juga banyak sisi pada bingkai foto, buku, dan rambu segitiga di sekitarmu.",
  refleksi: [
    "Aku dapat membedakan sinar garis, garis, ruas garis, dan kurva.",
    "Aku dapat mengukur ruas garis dengan penggaris dalam cm dan mm.",
    "Aku tahu bahwa 1 cm sama dengan 10 mm.",
    "Aku dapat menyebutkan sisi dan menghitung banyak sisi bangun datar.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Sudut pada bidang datar                                       */
/* ====================================================================== */

const ALUR_B = [
  "Sudut dan kaki sudut",
  "Membandingkan sudut dengan strip",
  "Sudut siku-siku dari kertas lipat",
  "Satuan sudut tidak baku",
  "Busur derajat dan derajat",
  "Menggambar sudut",
  "Lancip, siku-siku, tumpul, dan lurus",
  "Sudut refleks",
  "Siap mengenal garis tegak lurus",
];

export const SUB_B34: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Sudut pada Bidang Datar)",
  fullTitle: "Sub-Bab B: Sudut pada Bidang Datar",
  targetDescription:
    "Siswa membandingkan sudut dengan strip sudut, membentuk dan mengenali sudut siku-siku dari kertas yang dilipat, menamai sudut (titik sudut, kaki, dan simbol ∠), mengukur sudut dengan satuan tidak baku lalu dengan busur derajat, menggambar sudut dengan ukuran tertentu, serta mengelompokkan sudut menjadi lancip, siku-siku, tumpul, lurus, dan refleks.",
  secondaryBg: "#FEF3C7",
  secondaryBorder: "#D97706",
  secondaryText: "#78350F",
  silabus: {
    teksSuara: `Kita belajar sudut pada bidang datar. Kita membandingkan sudut dengan strip sudut dan membentuk sudut siku-siku dari kertas lipat. Kita mengukur sudut dengan satuan tidak baku, lalu dengan busur derajat, dan menggambar sudut. Terakhir kita mengelompokkan sudut menjadi lancip, siku-siku, tumpul, lurus, dan refleks. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menggambar dan menjelaskan unsur-unsur bangun datar. Pada sub-bab ini siswa mengenal sudut, membandingkan dan mengukurnya dengan busur derajat, menggambar sudut, dan membedakan jenis-jenis sudut.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab B hlm. 154–173) dan Buku Panduan Guru Bab 4 Topik B.",
  },
  videos: [
    {
      id: "K3B4B-V1",
      judul: "Membandingkan Sudut",
      subjudul: "Strip sudut dan sudut siku-siku",
      adegan: [
        {
          id: "K3B4B-V1-1",
          judul: "Sudut di sekitar kita",
          ketukan: [
            "Sudut terbentuk ketika dua garis berpotongan pada satu titik.",
            "Buku yang dibuka membentuk sebuah sudut.",
            "Semakin lebar buku dibuka, semakin besar sudutnya.",
            "Pintu, gunting, dan lengan juga membentuk sudut.",
          ],
          papan: ["Dua garis berpotongan", "Buku yang dibuka", "Makin lebar, makin besar", "Pintu, gunting, lengan"],
        },
        {
          id: "K3B4B-V1-2",
          judul: "Strip sudut",
          ketukan: [
            "Dua potongan karton dapat digabung dengan sebuah pengait.",
            "Gabungan itu disebut sepasang strip sudut.",
            "Putar satu strip agar sudutnya menjadi lebih besar.",
            "Putar sedikit saja agar sudutnya menjadi lebih kecil.",
          ],
          papan: ["Dua karton, satu pengait", "Sepasang strip sudut", "Putar jauh: lebih besar", "Putar dekat: lebih kecil"],
        },
        {
          id: "K3B4B-V1-3",
          judul: "Sudut siku-siku",
          ketukan: [
            "Lipat selembar kertas, lalu lipat sekali lagi dengan rapi.",
            "Pojok kertas lipat itu adalah sudut istimewa.",
            "Sudut istimewa itu dinamakan sudut siku-siku.",
            "Bandingkan sudut lain dengan pojok kertas lipat.",
          ],
          papan: ["Lipat kertas dua kali", "Pojok kertas lipat", "Sudut siku-siku", "Lebih kecil atau lebih besar"],
        },
      ],
    },
    {
      id: "K3B4B-V2",
      judul: "Mengukur Sudut",
      subjudul: "Satuan tidak baku dan busur derajat",
      adegan: [
        {
          id: "K3B4B-V2-1",
          judul: "Satuan sudut tidak baku",
          ketukan: [
            "Sinar OA dan sinar OB bertemu di titik O dan membentuk sudut AOB.",
            "Titik O disebut titik sudut, sinar OA dan OB disebut kaki.",
            "Diukur dengan irisan besar, sudut AOB sama dengan 3 satuan.",
            "Diukur dengan irisan kecil, sudut yang sama menjadi 6 satuan.",
          ],
          papan: ["Sudut AOB", "O titik sudut, OA dan OB kaki", "Irisan besar: 3 satuan", "Irisan kecil: 6 satuan"],
        },
        {
          id: "K3B4B-V2-2",
          judul: "Busur derajat",
          ketukan: [
            "Busur derajat dipakai untuk mengukur sudut.",
            "Letakkan titik tengah busur derajat tepat di titik O.",
            "Sejajarkan kaki OA dengan garis nol busur derajat.",
            "Baca angka yang dilewati kaki OB.",
          ],
          papan: ["Busur derajat", "Titik tengah di titik O", "OA di garis nol", "Baca angka di OB"],
        },
        {
          id: "K3B4B-V2-3",
          judul: "Satu derajat",
          ketukan: [
            "Satu putaran penuh dibagi menjadi 360 bagian sama besar.",
            "Satu bagian itu besarnya satu derajat, ditulis 1°.",
            "Kaki OA dan OB yang berimpit berukuran 0°.",
            "Memutar OB sedikit demi sedikit membuat sudut membesar.",
          ],
          papan: ["360 bagian sama besar", "Satu bagian = 1°", "Berimpit = 0°", "Diputar: makin besar"],
        },
      ],
    },
    {
      id: "K3B4B-V3",
      judul: "Jenis-Jenis Sudut",
      subjudul: "Siku-siku, lancip, tumpul, lurus, refleks",
      adegan: [
        {
          id: "K3B4B-V3-1",
          judul: "Siku-siku dan lancip",
          ketukan: [
            "Sudut yang ukurannya tepat 90° disebut sudut siku-siku.",
            "Sudut yang lebih dari 0° dan kurang dari 90° disebut sudut lancip.",
            "Sudut lancip lebih kecil daripada pojok kertas lipat.",
            "Sudut siku-siku diberi tanda kotak kecil di pojoknya.",
          ],
          papan: ["Siku-siku: tepat 90°", "Lancip: kurang dari 90°", "Lebih kecil dari siku-siku", "Tanda kotak di pojok"],
        },
        {
          id: "K3B4B-V3-2",
          judul: "Tumpul dan lurus",
          ketukan: [
            "Sudut yang lebih dari 90° dan kurang dari 180° disebut sudut tumpul.",
            "Sudut yang tepat 180° disebut sudut lurus.",
            "Sudut lurus sama dengan dua sudut siku-siku.",
            "Kedua kaki sudut lurus membentuk satu garis lurus.",
          ],
          papan: ["Tumpul: 90° sampai 180°", "Lurus: tepat 180°", "Dua kali siku-siku", "Kaki membentuk garis lurus"],
        },
        {
          id: "K3B4B-V3-3",
          judul: "Sudut refleks",
          ketukan: [
            "Sudut yang lebih dari 180° dan kurang dari 360° disebut sudut refleks.",
            "Sudut refleks 300° berpasangan dengan sudut lancip 60°.",
            "Ukuran keduanya bila dijumlahkan sama dengan 360°.",
            "Jadi 360° dikurangi sudut refleks memberi sudut pasangannya.",
          ],
          papan: ["Refleks: 180° sampai 360°", "300° dan 60°", "Jumlahnya 360°", "360° dikurangi refleks"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Sudut dan Kaki Sudut",
      stepDesc:
        "Sudut terbentuk ketika dua garis atau dua sinar berpotongan pada satu titik. Pada sudut AOB, titik O adalah titik sudut dan sinar OA serta sinar OB adalah kaki sudut. Simbol ∠ menunjukkan sudut, dan namanya ditulis dengan titik sudut di tengah, yaitu ∠AOB atau ∠BOA. Sudut ada di sekitar kita, misalnya pada buku yang dibuka, pintu, gunting, dan jarum jam.",
      icon: "📐",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Membandingkan Sudut dengan Strip",
      stepDesc:
        "Pada Aktivitas 2, dua potongan karton digabung dengan sebuah pengait menjadi sepasang strip sudut. Memutar satu strip menghasilkan sudut yang berbeda. Putar lebih jauh agar sudut lebih besar, putar lebih dekat agar sudut lebih kecil. Strip sudut dipakai untuk membandingkan sudut pada gambar dan benda, lalu mengurutkannya dari yang terkecil.",
      icon: "📎",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Sudut Siku-siku dari Kertas Lipat",
      stepDesc:
        "Pada Aktivitas 3, selembar kertas dilipat dua kali dengan rapi. Pojok kertas lipat itu adalah sudut istimewa yang dinamakan sudut siku-siku. Sudut siku-siku dipakai untuk memeriksa sudut lain: lebih kecil dari pojok kertas, lebih besar, atau tepat sama. Banyak benda punya sudut siku-siku, misalnya pojok buku, bingkai foto, dan layar televisi.",
      icon: "📄",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Mengukur Sudut dengan Satuan Tidak Baku",
      stepDesc:
        "Sudut dapat diukur dengan satuan sudut tidak baku, misalnya irisan karton berukuran sama. Dengan irisan yang lebih besar, sudut AOB sama dengan 3 satuan sudut. Dengan irisan yang lebih kecil, sudut AOB yang sama menjadi 6 satuan sudut. Jadi sudut yang sama ukurannya menjadi berbeda bila diukur dengan satuan yang berbeda, dan karena itu kita memerlukan satuan baku.",
      icon: "🍕",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Busur Derajat dan Derajat",
      stepDesc:
        "Satuan baku sudut adalah derajat, ditulis dengan simbol °. Satu putaran penuh dibagi menjadi 360 bagian sama besar, dan tiap bagian besarnya 1°. Sudut diukur dengan busur derajat: letakkan titik tengahnya di titik sudut O, sejajarkan kaki OA dengan garis nol, lalu baca angka yang dilewati kaki OB. Kaki yang berimpit berukuran 0°.",
      icon: "🧭",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Menggambar Sudut",
      stepDesc:
        "Untuk menggambar sudut 50°, gambar dulu ruas garis AB. Letakkan titik tengah busur derajat di titik A dengan garis nolnya pada AB. Tandai titik C tepat di angka 50°. Angkat busur derajat, lalu hubungkan A dan C dengan penggaris. Terbentuklah sudut BAC berukuran 50°. Cara yang sama dipakai untuk sudut 30°, 70°, 135°, dan lainnya.",
      icon: "✏️",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Sudut Lancip, Siku-siku, Tumpul, dan Lurus",
      stepDesc:
        "Sudut dikelompokkan dengan membandingkan ukurannya dengan 90° dan 180°. Sudut lancip lebih dari 0° dan kurang dari 90°. Sudut siku-siku tepat 90° dan kaki-kakinya saling tegak lurus. Sudut tumpul lebih dari 90° dan kurang dari 180°. Sudut lurus tepat 180°, dua kali sudut siku-siku, dan kaki-kakinya membentuk garis lurus.",
      icon: "🔺",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Sudut Refleks",
      stepDesc:
        "Sudut yang ukurannya lebih dari 180° dan kurang dari 360° disebut sudut refleks. Busur derajat mengukur sudut sampai 180°, jadi sudut refleks dicari lewat sudut lancip atau tumpul yang bersesuaian. Ukuran sudut refleks sama dengan 360° dikurangi ukuran sudut bersesuaian itu. Contohnya sudut refleks 300° berpasangan dengan sudut lancip 60°, dan sudut tumpul 130° berpasangan dengan sudut refleks 230°.",
      icon: "🔄",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    { judul: "Sudut", emoji: "📐", countNum: 2, countWord: "Dua", suara: "Sudut terbentuk ketika dua garis berpotongan pada satu titik. Dua kaki sudut bertemu di titik sudut." },
    { judul: "Titik Sudut dan Kaki", emoji: "📍", countNum: 3, countWord: "Tiga", suara: "Pada sudut AOB, titik O adalah titik sudut, sedangkan sinar OA dan sinar OB adalah kaki sudut." },
    { judul: "Membandingkan Sudut", emoji: "📎", countNum: 2, countWord: "Dua", suara: "Strip sudut dipakai untuk membandingkan sudut. Makin jauh strip diputar, makin besar sudutnya." },
    { judul: "Sudut Siku-siku", emoji: "📄", countNum: 2, countWord: "Dua", suara: "Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Ukurannya tepat sembilan puluh derajat." },
    { judul: "Satuan Sudut", emoji: "🍕", countNum: 2, countWord: "Dua", suara: "Sudut yang sama diukur dengan irisan besar dan irisan kecil memberi bilangan yang berbeda." },
    { judul: "Busur Derajat", emoji: "🧭", countNum: 3, countWord: "Tiga", suara: "Busur derajat mengukur sudut dalam derajat. Titik tengahnya di titik sudut dan garis nolnya di kaki pertama." },
    { judul: "Lancip dan Tumpul", emoji: "🔺", countNum: 2, countWord: "Dua", suara: "Sudut lancip kurang dari sembilan puluh derajat. Sudut tumpul lebih dari sembilan puluh derajat dan kurang dari seratus delapan puluh derajat." },
    { judul: "Sudut Lurus", emoji: "↔️", countNum: 2, countWord: "Dua", suara: "Sudut lurus tepat seratus delapan puluh derajat. Kedua kakinya membentuk garis lurus." },
    { judul: "Sudut Refleks", emoji: "🔄", countNum: 2, countWord: "Dua", suara: "Sudut refleks lebih dari seratus delapan puluh derajat dan kurang dari tiga ratus enam puluh derajat." },
    { judul: "Cara Mengukur Sudut", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, letakkan titik tengah busur derajat di titik sudut. Dua, sejajarkan kaki pertama dengan garis nol. Tiga, lihat kaki kedua. Empat, baca derajatnya." },
  ],
  games: [
    C("strip-bigger-smaller", "Strip Sudut: Lebih Besar atau Lebih Kecil", "hlm. 155–156 (Aktivitas 2: membandingkan sudut)", "Memutar strip sudut agar lebih besar atau lebih kecil dari sudut acuan.", "Tiga ronde, tiap ronde dua soal. Sepasang strip karton digabung pengait. Siswa memutar satu strip dengan tombol atau penggeser sampai sudutnya lebih besar atau lebih kecil dari garis putus acuan, lalu menekan Periksa.", "Putar strip sampai sudutnya lebih besar atau lebih kecil.", "📎", 6),
    C("fold-right-angle", "Bentuk Sudut Siku-siku", "hlm. 158 (Aktivitas 3: kertas lipat)", "Membentuk sudut siku-siku dan sudut lurus dengan strip sudut dan pojok kertas lipat.", "Tiga ronde, tiap ronde dua soal. Pojok kertas lipat ditampilkan sebagai acuan. Siswa memutar strip sampai tepat pas dengan pojok kertas atau sampai kedua strip membentuk garis lurus, lalu menekan Periksa.", "Putar strip sampai pas dengan pojok kertas lipat.", "📄", 6),
    C("widest-open", "Mana yang Paling Terbuka?", "hlm. 154–155 (membandingkan sudut)", "Membandingkan bukaan tiga benda sejenis dan menemukan yang paling lebar atau paling sempit.", "Tiga ronde, tiap ronde tiga benda (buku, pintu, atau gunting) dengan bukaan berbeda dan dua pertanyaan. Siswa mengetuk benda yang paling lebar atau paling sempit bukaannya.", "Ketuk benda yang paling terbuka atau paling sempit.", "📖", 6),
    C("object-angle-kind", "Jenis Sudut pada Benda", "hlm. 158–160 dan 167–168 (jenis-jenis sudut pada benda)", "Menentukan jenis sudut yang dibentuk oleh buku, pintu, dan gunting yang dibuka.", "Tiga ronde, tiap ronde dua soal. Benda dengan bukaan tertentu ditampilkan. Siswa memilih satu dari tiga jenis sudut: lancip, siku-siku, tumpul, lurus, atau refleks.", "Pilih jenis sudut pada benda.", "🚪", 6),
    C("match-object-angle", "Jodohkan Benda dan Jenis Sudut", "hlm. 158 dan 167–168 (sudut siku-siku, lancip, tumpul)", "Menjodohkan benda berbukaan tertentu dengan jenis sudutnya.", "Tiga ronde, tiap ronde tiga benda dan tiga jenis sudut berbeda. Siswa mengetuk benda, lalu mengetuk jenis sudut yang cocok.", "Ketuk benda, lalu ketuk jenis sudutnya.", "🔗", 9),
    C("memory-object-angle", "Memori Benda dan Jenis Sudut", "hlm. 167–168 (jenis-jenis sudut)", "Mencocokkan benda berbukaan tertentu dengan jenis sudutnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari benda dengan jenis sudutnya.", "Balik dua kartu, cari benda dan jenis sudutnya.", "🃏", 12),
    C("tap-all-object-angle", "Ketuk Semua Benda dengan Jenis Sudut", "hlm. 158–159 (sudut siku-siku di sekitar kita)", "Menemukan semua benda yang bukaannya membentuk jenis sudut tertentu.", "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("count-right-angles", "Hitung Sudut Siku-siku pada Benda", "hlm. 159–160 (Ayo Berpikir 3: sudut siku-siku pada benda)", "Menghitung banyak sudut siku-siku pada benda sehari-hari.", "Tiga ronde, tiap ronde dua soal. Benda seperti buku, bingkai foto, televisi, penggaris segitiga, dan rambu ditampilkan. Siswa memilih satu dari tiga banyak sudut siku-siku.", "Hitung sudut siku-siku pada benda.", "📺", 6),
    C("order-open", "Urutkan Benda menurut Bukaan", "hlm. 156 (Aktivitas 2: urutkan sudut dari yang terkecil)", "Mengurutkan tiga benda sejenis menurut besar bukaannya.", "Tiga ronde, tiap ronde tiga benda bertanda huruf. Siswa mengetuk benda satu per satu dari yang paling sempit atau paling lebar bukaannya.", "Ketuk benda menurut bukaannya.", "📶", 9),
    C("slice-unit", "Ukur dengan Irisan Pizza", "hlm. 163–165 (mengukur sudut dengan ukuran tidak baku)", "Menghitung banyak satuan irisan yang menutupi sebuah sudut.", "Tiga ronde, tiap ronde dua soal. Sudut yang sama diukur dengan irisan besar lalu irisan kecil. Siswa menghitung banyak irisan dan memilih satu dari tiga bilangan.", "Hitung banyak irisan pada sudut.", "🍕", 6),
    P("read-protractor", "Baca Busur Derajat", "hlm. 165–166 dan 170 (Ayo Berlatih 1: besar sudut pada busur derajat)", "Membaca ukuran sudut dari busur derajat dengan skala luar atau skala dalam.", "Tiga ronde, tiap ronde dua soal. Busur derajat dan dua kaki sudut ditampilkan. Siswa memilih satu dari tiga ukuran sudut. Pengecoh memuat bacaan dari skala yang salah.", "Baca ukuran sudut pada busur derajat.", "protractor-read", 3, 2),
    P("angle-kind-picture", "Jenis Sudut dari Gambar", "hlm. 167–169 (jenis-jenis sudut)", "Menentukan jenis sudut dari gambar dua kaki sudut.", "Tiga ronde, tiap ronde dua soal. Gambar sudut berhuruf ditampilkan. Siswa memilih satu dari tiga jenis: lancip, siku-siku, tumpul, lurus, atau refleks.", "Pilih jenis sudut pada gambar.", "angle-kind", 3, 2),
    P("match-angle-kind", "Jodohkan Sudut dan Jenisnya", "hlm. 167–169 (jenis-jenis sudut)", "Menjodohkan gambar sudut dengan jenisnya.", "Tiga ronde, tiap ronde tiga gambar sudut dan tiga jenis berbeda. Siswa mengetuk gambar, lalu mengetuk jenis sudut yang cocok.", "Ketuk gambar, lalu ketuk jenis sudutnya.", "angle-match", 3, 3),
    P("memory-angle-kind", "Memori Gambar Sudut dan Jenisnya", "hlm. 167–169 (jenis-jenis sudut)", "Mencocokkan gambar sudut dengan jenisnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari gambar sudut dengan jenisnya.", "Balik dua kartu, cari gambar dan jenisnya.", "angle-memory", 3, 4),
    P("fill-angle-table", "Isi Tabel Jenis Sudut", "hlm. 173 (Ayo Berlatih 5: kelompokkan sudut)", "Melengkapi tabel ukuran sudut dan jenisnya.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu jenis sudut yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu jenis sudut.", "angle-table", 3, 4),
    P("tap-all-angles", "Ketuk Semua Sudut dengan Jenis Tertentu", "hlm. 167–168 (sudut lancip, siku-siku, tumpul)", "Menemukan semua gambar sudut dengan jenis tertentu.", "Tiga ronde, tiap ronde empat gambar sudut dan satu perintah. Siswa mengetuk semua sudut yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "angle-select", 3, 4),
    P("sort-angles", "Pilah Sudut: Lancip, Siku-siku, atau Tumpul", "hlm. 167–168 (membandingkan dengan 90°)", "Memilah gambar sudut menjadi lancip, siku-siku, dan tumpul.", "Tiga ronde, tiap ronde enam gambar sudut dan tiga kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat.", "Pilah gambar ke kotak yang tepat.", "angle-sort", 3, 6),
    P("order-angles", "Urutkan Sudut dari yang Terkecil", "hlm. 156 (Aktivitas 2: urutkan sudut)", "Mengurutkan tiga gambar sudut menurut ukurannya.", "Tiga ronde, tiap ronde tiga gambar sudut bertanda huruf. Siswa mengetuk sudut satu per satu dari yang terkecil atau terbesar.", "Ketuk sudut menurut ukurannya.", "angle-order", 3, 3),
    P("name-angle-parts", "Titik Sudut, Kaki, dan Nama Sudut", "hlm. 163 dan 171 (sudut AOB dan Ayo Berlatih 2)", "Menentukan titik sudut, kaki sudut, dan nama sudut dari gambar berhuruf.", "Tiga ronde, tiap ronde dua soal. Sudut dengan tiga huruf ditampilkan. Siswa memilih titik sudut, nama sudut, atau kaki sudut dari tiga pilihan.", "Pilih titik sudut, kaki, atau nama sudut.", "angle-names", 3, 2),
    P("draw-angle-protractor", "Gambar Sudut dengan Busur Derajat", "hlm. 167 dan 172 (menggambar sudut 50° dan Ayo Berlatih 4)", "Menggambar sudut dengan ukuran tertentu memakai busur derajat.", "Tiga ronde, tiap ronde dua soal. Kaki OA ada di garis nol busur derajat. Siswa memutar kaki OB dengan tombol atau penggeser sampai tepat di ukuran yang diminta, lalu menekan Periksa.", "Putar kaki sampai ukuran yang diminta.", "angle-draw", 3, 2),
    A("name-angle-part-text", "Nama Bagian Sudut dan Alatnya", "hlm. 163–166 (titik sudut, kaki, busur derajat)", "Memilih nama bagian sudut, alat ukur, dan satuannya dari uraian.", "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian, lalu memilih satu dari tiga nama.", "Pilih nama yang tepat.", "∠AOB", "NAMA", "titik sudut • kaki • derajat"),
    A("complete-angle-sentence", "Lengkapi Kalimat Sudut", "hlm. 154–169 (sudut dan jenis-jenisnya)", "Melengkapi kalimat tentang sudut, ukurannya, dan jenis-jenisnya.", "Tiga soal, tiap soal tiga kalimat, misalnya sudut siku-siku ukurannya tepat ... Siswa memilih satu dari tiga kata atau ukuran.", "Pilih kata untuk bagian kosong.", "…", "LENGKAPI", "sudut • derajat • jenis"),
    A("classify-degree", "Jenis Sudut dari Ukurannya", "hlm. 167–169 dan 173 (Ayo Berlatih 5)", "Menentukan jenis sudut dari ukurannya dalam derajat.", "Tiga ronde, tiap ronde dua soal, misalnya sudut 120° adalah ... Siswa membandingkan ukuran dengan 90° dan 180°, lalu memilih satu dari tiga jenis.", "Pilih jenis sudut dari ukurannya.", "90°", "JENIS", "lancip • siku-siku • tumpul"),
    A("match-degree-kind", "Jodohkan Ukuran dan Jenis Sudut", "hlm. 167–169 dan 173 (kelompokkan sudut)", "Menjodohkan ukuran sudut dengan jenisnya.", "Tiga ronde, tiap ronde tiga ukuran dan tiga jenis berbeda. Siswa mengetuk ukuran, lalu mengetuk jenis sudutnya.", "Ketuk ukuran, lalu ketuk jenisnya.", "= ?", "JODOHKAN", "derajat • jenis"),
    A("memory-degree-kind", "Memori Ukuran dan Jenis Sudut", "hlm. 167–169 (jenis-jenis sudut)", "Mencocokkan ukuran sudut dengan jenisnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari ukuran dengan jenisnya.", "Balik dua kartu, cari ukuran dan jenisnya.", "°", "MEMORI", "ukuran dan jenis"),
    A("true-false-angles", "Benar atau Salah: Sudut", "hlm. 154–169 (sudut dan jenis-jenisnya)", "Menilai pernyataan tentang sudut, derajat, dan jenis sudut.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-angles", "Detektif Ukuran Sudut", "hlm. 167–169 (ukuran dan jenis sudut)", "Menemukan ukuran sudut dari dua petunjuk tentang jenis dan hubungannya.", "Empat soal. Siswa membaca dua petunjuk, lalu memilih satu dari tiga ukuran. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih ukurannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-angles", "Peta Konsep Sudut", "hlm. 144 (peta konsep Bab 4)", "Melengkapi peta konsep bagian dan jenis-jenis sudut.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "bagian • jenis"),
    A("story-angles", "Soal Cerita Ukuran Sudut", "hlm. 167–169 (sudut lurus, refleks, dan pasangan 360°)", "Menyelesaikan soal cerita tentang ukuran sudut dengan penjumlahan, pengurangan, dan pasangan 360°.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, menghitung ukuran sudut, lalu memilih satu dari tiga ukuran.", "Baca cerita, lalu pilih ukuran sudutnya.", "°", "CERITA", "jumlah • selisih • pasangan 360°"),
    A("sentence-angles", "Susun Kata Sudut", "hlm. 154–169 (sudut dan jenis-jenisnya)", "Menyusun kalimat tentang sudut dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat tentang sudut"),
  ],
  poin: [
    { ikon: "📍", nama: "Titik sudut dan kaki", isi: "kaki bertemu di titik sudut", suara: "Dua kaki sudut bertemu di titik sudut. Sudut AOB ditulis dengan titik sudut di tengah." },
    { ikon: "📄", nama: "Sudut siku-siku", isi: "tepat 90°, pojok kertas lipat", suara: "Sudut siku-siku tepat sembilan puluh derajat. Pojok kertas yang dilipat dua kali adalah sudut siku-siku." },
    { ikon: "🔺", nama: "Lancip dan tumpul", isi: "kurang dan lebih dari 90°", suara: "Sudut lancip kurang dari sembilan puluh derajat. Sudut tumpul lebih dari sembilan puluh dan kurang dari seratus delapan puluh derajat." },
    { ikon: "🔄", nama: "Lurus dan refleks", isi: "180° dan lebih dari 180°", suara: "Sudut lurus tepat seratus delapan puluh derajat. Sudut refleks lebih dari seratus delapan puluh dan kurang dari tiga ratus enam puluh derajat." },
    { ikon: "🧭", nama: "Busur derajat", isi: "titik tengah di titik sudut", suara: "Busur derajat mengukur sudut dalam derajat. Titik tengahnya di titik sudut dan garis nolnya di kaki pertama." },
  ],
  poinSuara:
    "Ingat selalu! Sudut siku-siku tepat sembilan puluh derajat. Sudut lancip kurang dari sembilan puluh derajat, dan sudut tumpul lebih dari sembilan puluh derajat. Sudut lurus seratus delapan puluh derajat, dan sudut refleks lebih dari itu. Sudut diukur dengan busur derajat.",
  cara: {
    suara: "Cara mengukur sudut dengan busur derajat. Letakkan titik tengah busur derajat di titik sudut. Sejajarkan kaki pertama dengan garis nol. Lihat kaki kedua. Lalu baca derajatnya.",
    potongan: [
      { teks: "titik tengah di titik sudut", warna: "#BAE6FD" },
      { teks: "kaki pertama di garis nol", warna: "#FECACA" },
      { teks: "lihat kaki kedua", warna: "#BFDBFE" },
      { teks: "baca derajatnya", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: buatlah sepasang strip sudut dari dua potong karton dan sebuah pengait. Cari tiga sudut siku-siku pada buku, pintu, dan meja, lalu periksa dengan pojok kertas yang kamu lipat. Bukalah gunting atau buku, lalu bandingkan sudutnya dengan sudut siku-siku.",
  refleksi: [
    "Aku dapat menyebutkan titik sudut dan kaki sudut.",
    "Aku dapat membuat sudut siku-siku dari kertas yang dilipat.",
    "Aku dapat mengukur dan menggambar sudut dengan busur derajat.",
    "Aku dapat membedakan sudut lancip, siku-siku, tumpul, lurus, dan refleks.",
  ],
};

export const SUB_BAB_K3B4: SubBabNaskah[] = [SUB_A34, SUB_B34];

/** Semua adegan video, urut sub-bab, video, adegan. Dipakai uji. */
export const semuaAdeganK3B4 = SUB_BAB_K3B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
