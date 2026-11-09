/**
 * Naskah murni Matematika Kelas 3 Bab 5 (Penyajian Data dalam Tabel): Sub-Bab A (mengurutkan dan
 * membandingkan data: data terkecil, data terbesar, jangkauan, banyak nilai) dan Sub-Bab B (menyajikan
 * data dalam bentuk tabel: turus kelompok lima, tabel nilai, huruf, dan manik).
 * Sumber: Buku Siswa Matematika Kelas III Kemendikbudristek, Bab 5 hlm. 195–212, serta Buku Panduan
 * Guru Bab 5, diperkaya dengan turus kelompok lima (tally marks), frekuensi nilai pada tabel, pencacahan
 * huruf pada kata, dan manik berwarna sebagai benda nyata sebelum diganti turus.
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k3-bab5.mjs) memakainya untuk menulis src/data/kelas3-bab5.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k3b5.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K3B5_META = {
  chapterId: "k3-mat-bab5",
  phaseCode: "FASE_B",
  grade: 3,
  subjectLabel: "MATEMATIKA - KELAS 3 SD",
  title: "BAB 5: PENYAJIAN DATA DALAM TABEL",
  silabusElemen: "🌈 Fase B • Elemen Analisis Data dan Peluang: Mengurutkan Data, Membandingkan Data, dan Menyajikan Data dalam Tabel (Kelas 3 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

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

const mind = (n: number, title: string, desc: string, icon: string, from: string, to: string) => ({
  stepNumber: n,
  stepTitle: `${n}. ${title}`,
  stepDesc: desc,
  icon,
  flowFrom: from,
  flowTo: to,
});

const ALUR_A = ["Mengurutkan data", "Data terkecil", "Data terbesar", "Jangkauan", "Turus", "Banyak nilai", "Frekuensi", "Siap ke tabel"];
const ALUR_B = ["Turus kelompok lima", "Dari lidi ke angka", "Tabel manik", "Tabel huruf", "Tabel nilai", "Membaca tabel", "Lebih dan kurang", "Data rapi"];

/* ====================================================================== */
/* SUB-BAB A. Mengurutkan dan membandingkan data                            */
/* ====================================================================== */

const GAMES_A: GameNaskah[] = [
  C("order-children-objects", "Urutkan Anak menurut Banyak Benda", "hlm. 198–199 (Aktivitas 1: mengurutkan data)", "Mengurutkan anak dari yang banyak bendanya paling kecil atau paling besar.", "Tiga ronde, tiap ronde tiga anak dengan tumpukan benda. Siswa mengetuk anak satu per satu menurut urutan yang diminta.", "Ketuk anak menurut banyak bendanya.", "🍎", 9),
  C("tap-most-least-objects", "Ketuk yang Paling Banyak atau Paling Sedikit", "hlm. 199 (paling sedikit dan paling banyak)", "Menemukan anak dengan tumpukan benda paling banyak atau paling sedikit.", "Tiga ronde, tiap ronde tiga anak dan dua pertanyaan. Siswa mengetuk anak yang cocok.", "Ketuk anak yang paling banyak atau paling sedikit.", "👆", 6),
  C("range-objects", "Selisih Terbanyak dan Tersedikit", "hlm. 199 (jangkauan = terbesar − terkecil)", "Menghitung selisih banyak benda terbanyak dan tersedikit (jangkauan).", "Tiga ronde, tiap ronde dua soal. Siswa melihat tumpukan beberapa anak lalu memilih selisihnya.", "Hitung selisih terbanyak dan tersedikit.", "📏", 6),
  C("match-pile-count", "Jodohkan Tumpukan dan Banyaknya", "hlm. 198 (mencacah banyak data)", "Menjodohkan tumpukan benda dengan bilangan banyaknya.", "Tiga ronde, tiap ronde tiga tumpukan dan tiga bilangan. Siswa mengetuk tumpukan, lalu mengetuk bilangannya.", "Ketuk tumpukan, lalu ketuk banyaknya.", "🔗", 9),
  C("memory-pile-count", "Memori Tumpukan dan Banyaknya", "hlm. 198 (mencacah banyak data)", "Mencocokkan tumpukan benda dengan banyaknya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari tumpukan dan banyaknya.", "🃏", 12),
  C("tap-all-condition-objects", "Ketuk Semua Tumpukan dengan Syarat", "hlm. 199 (membandingkan data)", "Menemukan semua tumpukan yang lebih, kurang, atau sama dengan bilangan acuan.", "Tiga ronde, tiap ronde empat tumpukan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
  C("board-count-objects", "Papan: Berapa Banyak Benda", "hlm. 198 (mencacah data)", "Menghitung tumpukan benda lalu menulis banyaknya pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka pada papan lalu menekan Periksa.", "Isi papan dengan banyak bendanya.", "🗂️", 6),
  C("total-objects-children", "Jumlah Benda Semua Anak", "hlm. 198 (ringkasan data kelompok)", "Menjumlahkan banyak benda semua anak pada satu gambar.", "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan lalu memilih hasilnya.", "Jumlahkan semua benda, lalu pilih hasilnya.", "➕", 6),
  C("sort-pile-bins", "Pilah Tumpukan: Sedikit, Sedang, atau Banyak", "hlm. 199 (membandingkan data)", "Memilah tumpukan menjadi sedikit (kurang dari 5), sedang (5 sampai 7), atau banyak (lebih dari 7).", "Tiga ronde, tiap ronde enam tumpukan dan tiga kotak. Siswa menyeret atau mengetuk tumpukan ke kotak yang tepat.", "Pilah tumpukan ke kotak yang tepat.", "📦", 18),
  C("difference-two-children", "Berapa Lebih Banyak", "hlm. 199 (selisih data)", "Menghitung berapa lebih banyak benda satu anak dibanding anak lain.", "Tiga ronde, tiap ronde dua soal. Siswa melihat dua tumpukan lalu memilih selisihnya.", "Hitung selisih dua tumpukan.", "⚖️", 6),
  P("read-tally", "Baca Turus", "hlm. 198 (mengingat turus Kelas 2)", "Membaca banyak data dari gambar turus kelompok lima.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung garis turus lalu memilih bilangannya.", "Hitung garis turus, lalu pilih bilangannya.", "tally-read", 2, 2),
  P("order-tally", "Urutkan Turus", "hlm. 198–199 (mengurutkan data)", "Mengurutkan kartu turus dari yang paling kecil atau paling besar.", "Tiga ronde, tiap ronde tiga kartu turus. Siswa mengetuk kartu satu per satu menurut urutan yang diminta.", "Ketuk turus menurut banyaknya.", "tally-order", 3, 3),
  P("tap-most-least-tally", "Ketuk Turus Paling Banyak atau Paling Sedikit", "hlm. 199 (membandingkan data)", "Menemukan kartu turus paling banyak atau paling sedikit.", "Tiga ronde, tiap ronde tiga turus dan dua pertanyaan. Siswa mengetuk turus yang cocok.", "Ketuk turus yang paling banyak atau paling sedikit.", "tally-tap", 3, 2),
  P("range-from-tally-table", "Jangkauan dari Tabel Turus", "hlm. 199 (jangkauan)", "Menghitung jangkauan dari tabel nama dan turus.", "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel turus lalu memilih jangkauannya.", "Hitung jangkauan dari tabel turus.", "tally-range", 2, 2),
  P("match-tally-count", "Jodohkan Turus dan Banyaknya", "hlm. 198 (turus dan banyak)", "Menjodohkan gambar turus dengan bilangan banyaknya.", "Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangannya.", "Ketuk turus, lalu ketuk banyaknya.", "tally-match", 3, 3),
  P("memory-tally-count", "Memori Turus dan Banyaknya", "hlm. 198 (turus dan banyak)", "Mencocokkan turus dengan banyaknya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari turus dan banyaknya.", "tally-memory", 3, 4),
  P("tap-all-tally-condition", "Ketuk Semua Turus dengan Syarat", "hlm. 199 (membandingkan data)", "Menemukan semua turus yang lebih, kurang, atau sama dengan bilangan acuan.", "Tiga ronde, tiap ronde empat turus dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "tally-select", 3, 4),
  P("sort-tally-bins", "Pilah Turus menurut Banyaknya", "hlm. 199 (membandingkan data)", "Memilah turus menjadi kurang dari 5, 5 sampai 9, atau 10 atau lebih.", "Tiga ronde, tiap ronde enam turus dan tiga kotak. Siswa menyeret atau mengetuk turus ke kotak yang tepat.", "Pilah turus ke kotak yang tepat.", "tally-sort", 3, 6),
  P("most-frequent-value", "Nilai yang Terbanyak", "hlm. 200 (berapa siswa bernilai 9)", "Menemukan nilai yang paling banyak muncul pada tabel nilai dan turus.", "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel lalu memilih nilai yang terbanyak.", "Pilih nilai yang paling banyak muncul.", "freq-mode", 2, 2),
  P("more-or-less-than-value", "Lebih atau Kurang dari Nilai", "hlm. 200–201 (membandingkan nilai)", "Menghitung banyak siswa yang mendapat nilai lebih atau kurang dari acuan.", "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan baris tabel yang cocok lalu memilih hasilnya.", "Hitung siswa yang lebih atau kurang dari nilai itu.", "freq-compare", 2, 2),
  A("order-values", "Urutkan Nilai Data", "hlm. 200 (mengurutkan dari terkecil)", "Mengurutkan bilangan data dari terkecil ke terbesar atau sebaliknya.", "Tiga ronde, tiap ronde empat atau lima bilangan. Siswa mengetuk bilangan satu per satu menurut urutan.", "Ketuk bilangan menurut urutannya.", "1 2 3", "URUTKAN", "dari terkecil atau terbesar"),
  A("min-max-value", "Nilai Terkecil dan Terbesar", "hlm. 199–200 (data terkecil dan terbesar)", "Menemukan data terkecil atau data terbesar pada daftar nilai.", "Tiga ronde, tiap ronde dua soal. Siswa membaca daftar lalu memilih nilai terkecil atau terbesar.", "Pilih data terkecil atau terbesar.", "min max", "TERKECIL • TERBESAR", "nilai paling kecil atau besar"),
  A("compute-range", "Jangkauan Data", "hlm. 199 (jangkauan = terbesar − terkecil)", "Menghitung jangkauan data: nilai terbesar dikurangi nilai terkecil.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih jangkauannya.", "Hitung jangkauan data.", "max−min", "JANGKAUAN", "terbesar − terkecil"),
  A("count-value-frequency", "Banyak Nilai pada Data", "hlm. 200 (berapa siswa bernilai 9)", "Menghitung berapa kali sebuah nilai muncul pada data ulangan.", "Tiga ronde, tiap ronde dua soal. Siswa mencacah nilai lalu memilih banyaknya.", "Hitung berapa kali nilai itu muncul.", "f", "BANYAK NILAI", "frekuensi nilai"),
  A("fill-data-sentence", "Lengkapi Kalimat Tentang Data", "hlm. 199–200 (istilah data)", "Melengkapi kalimat tentang data terkecil, terbesar, jangkauan, dan turus.", "Tiga ronde, tiap ronde tiga kalimat. Siswa memilih satu dari tiga kata untuk bagian kosong.", "Pilih kata untuk bagian kosong.", "…", "KALIMAT", "istilah data"),
  A("match-term-meaning", "Jodohkan Istilah dan Artinya", "hlm. 196 (peta konsep dan kata kunci)", "Menjodohkan istilah data dengan artinya.", "Tiga ronde, tiap ronde tiga pasangan. Siswa mengetuk istilah, lalu mengetuk artinya.", "Ketuk istilah, lalu ketuk artinya.", "↔", "JODOHKAN", "istilah • arti"),
  A("true-false-data", "Benar atau Salah: Data", "hlm. 199–200 (mengamati data)", "Menilai pernyataan tentang mengurutkan data, jangkauan, dan turus.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
  A("detective-data", "Detektif Data", "hlm. 199–200 (jangkauan dan nilai)", "Menemukan bilangan dari dua petunjuk tentang data.", "Empat soal. Siswa membaca petunjuk lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
  A("concept-map-data", "Peta Konsep Data", "hlm. 196 (peta konsep)", "Melengkapi peta konsep membandingkan data dan mencacah data.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "🗺️", "PETA KONSEP", "data • jangkauan • turus"),
  A("sentence-words-data", "Susun Kata Data", "hlm. 199–200 (kalimat kunci)", "Menyusun kalimat tentang jangkauan, mengurutkan data, dan turus dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat data"),
];

export const SUB_A35: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Mengurutkan dan Membandingkan Data)",
  fullTitle: "Sub-Bab A: Mengurutkan dan Membandingkan Data",
  targetDescription:
    "Siswa mengurutkan data dari terkecil ke terbesar atau sebaliknya, menentukan data terkecil dan data terbesar, menghitung jangkauan (selisih data terbesar dan terkecil), serta mencacah banyak kemunculan sebuah nilai pada data ulangan dengan bantuan turus.",
  secondaryBg: "#E0E7FF",
  secondaryBorder: "#4F46E5",
  secondaryText: "#312E81",
  silabus: {
    teksSuara: `Kita belajar mengurutkan dan membandingkan data. Ibu guru membagikan nilai ulangan Matematika. Kita mengurutkan nilai dari yang terkecil, mencari nilai terbesar, menghitung jangkauan, dan menghitung berapa siswa mendapat nilai sembilan. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa mengurutkan data, menentukan data terkecil dan terbesar, serta menghitung jangkauan data. Pada sub-bab ini siswa juga mencacah banyak kemunculan nilai dengan turus.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 5: Penyajian Data dalam Tabel, Sub-Bab A hlm. 198–200) dan Buku Panduan Guru Bab 5 Topik A.",
  },
  videos: [
    {
      id: "K3B5A-V1",
      judul: "Pemilihan Ketua Kelas",
      subjudul: "Data suara calon ketua kelas",
      adegan: [
        {
          id: "K3B5A-V1-1",
          judul: "Hari pemilihan",
          ketukan: [
            "Hari ini diadakan pemilihan ketua kelas.",
            "Beberapa siswa diajukan menjadi calon ketua kelas.",
            "Setiap siswa berhak memilih salah satu calon.",
            "Calon dengan suara terbanyak terpilih menjadi ketua kelas.",
          ],
          papan: ["Hari pemilihan ketua kelas", "Beberapa calon diajukan", "Setiap siswa memilih satu", "Suara terbanyak yang menang"],
        },
        {
          id: "K3B5A-V1-2",
          judul: "Berapa calon",
          ketukan: [
            "Ada berapa calon ketua kelas?",
            "Kita perlu mencatat suara tiap calon.",
            "Data suara itu akan kita urutkan dan bandingkan.",
            "Siapa yang mendapatkan suara paling banyak?",
          ],
          papan: ["Ada berapa calon?", "Catat suara tiap calon", "Urutkan dan bandingkan", "Siapa suara paling banyak?"],
        },
        {
          id: "K3B5A-V1-3",
          judul: "Data perlu diurutkan",
          ketukan: [
            "Untuk menjawabnya, data perlu disusun rapi.",
            "Kita mengurutkan data dari yang terkecil.",
            "Lalu kita bandingkan data terbesar dan terkecil.",
            "Itulah awal belajar penyajian data.",
          ],
          papan: ["Data disusun rapi", "Urutkan dari terkecil", "Bandingkan terbesar dan terkecil", "Awal belajar data"],
        },
      ],
    },
    {
      id: "K3B5A-V2",
      judul: "Anggota Keluarga",
      subjudul: "Mengurutkan dan membandingkan data",
      adegan: [
        {
          id: "K3B5A-V2-1",
          judul: "Lembar isian",
          ketukan: [
            "Setiap anggota kelompok mengisi lembar isian.",
            "Mereka menulis nama dan banyak anggota keluarga.",
            "Semua lembar dikumpulkan menjadi ringkasan data.",
            "Nama dan banyak anggota keluarga tercatat rapi.",
          ],
          papan: ["Isi lembar isian", "Nama dan banyak anggota", "Kumpulkan jadi ringkasan", "Data tercatat rapi"],
        },
        {
          id: "K3B5A-V2-2",
          judul: "Urutkan dari terkecil",
          ketukan: [
            "Urutkan nama dari yang jumlah anggota keluarganya terkecil.",
            "Berapa banyak anggota keluarga paling sedikit?",
            "Berapa banyak anggota keluarga paling banyak?",
            "Adakah anak yang jumlah anggota keluarganya sama?",
          ],
          papan: ["Urutkan dari terkecil", "Paling sedikit berapa?", "Paling banyak berapa?", "Adakah yang sama?"],
        },
        {
          id: "K3B5A-V2-3",
          judul: "Jangkauan",
          ketukan: [
            "Selisih nilai data terbesar dan terkecil disebut jangkauan.",
            "Jangkauan sama dengan data terbesar dikurangi data terkecil.",
            "Jangkauan membantu kita melihat seberapa jauh data menyebar.",
            "Mari hitung jangkauan dari data kelompok.",
          ],
          papan: ["Selisih disebut jangkauan", "Terbesar dikurangi terkecil", "Melihat seberapa jauh data", "Hitung jangkauan kelompok"],
        },
      ],
    },
    {
      id: "K3B5A-V3",
      judul: "Nilai Ulangan Harian",
      subjudul: "Mengurutkan nilai dan menghitung banyaknya",
      adegan: [
        {
          id: "K3B5A-V3-1",
          judul: "Hasil penilaian",
          ketukan: [
            "Ibu guru membagikan hasil ulangan harian Matematika.",
            "Nilai siswa tertulis: sembilan, tujuh, delapan, enam, sepuluh, dan lima.",
            "Ada dua puluh data nilai yang perlu disusun.",
            "Kita urutkan dulu dari nilai terkecil ke terbesar.",
          ],
          papan: ["Hasil ulangan dibagikan", "Nilai 5 sampai 10", "Dua puluh data nilai", "Urutkan dari terkecil"],
        },
        {
          id: "K3B5A-V3-2",
          judul: "Enam macam nilai",
          ketukan: [
            "Setelah diurutkan, tampak enam macam nilai: lima sampai sepuluh.",
            "Nilai terkecil adalah lima, nilai terbesar adalah sepuluh.",
            "Jangkauannya sepuluh dikurangi lima sama dengan lima.",
            "Sekarang kita hitung berapa siswa mendapat tiap nilai.",
          ],
          papan: ["Enam macam nilai", "Terkecil 5, terbesar 10", "Jangkauan 10 − 5 = 5", "Hitung banyak tiap nilai"],
        },
        {
          id: "K3B5A-V3-3",
          judul: "Berapa siswa bernilai sembilan",
          ketukan: [
            "Berapa siswa yang memiliki nilai sembilan?",
            "Ada lima siswa, Pak.",
            "Berapa banyak siswa yang mendapatkan nilai sepuluh?",
            "Ada dua siswa. Data sudah siap disajikan dalam tabel.",
          ],
          papan: ["Berapa siswa bernilai 9?", "Ada 5 siswa", "Berapa siswa bernilai 10?", "Ada 2 siswa, siap ke tabel"],
        },
      ],
    },
  ],
  mindMaps: [
    mind(1, "Mengurutkan Data", "Data disusun dari terkecil ke terbesar atau sebaliknya supaya mudah dicari data terkecil, terbesar, dan jangkauannya.", "📶", ALUR_A[0], ALUR_A[1]),
    mind(2, "Data Terkecil", "Data terkecil adalah nilai paling kecil pada data. Pada data ulangan, nilai terkecil adalah lima.", "⬇️", ALUR_A[1], ALUR_A[2]),
    mind(3, "Data Terbesar", "Data terbesar adalah nilai paling besar pada data. Pada data ulangan, nilai terbesar adalah sepuluh.", "⬆️", ALUR_A[2], ALUR_A[3]),
    mind(4, "Jangkauan", "Jangkauan sama dengan data terbesar dikurangi data terkecil. Contoh: sepuluh dikurangi lima sama dengan lima.", "📏", ALUR_A[3], ALUR_A[4]),
    mind(5, "Turus", "Turus adalah garis tegak yang menyatakan banyaknya data. Satu garis untuk satu data. Garis kelima mencoret miring.", "||||", ALUR_A[4], ALUR_A[5]),
    mind(6, "Banyak Nilai", "Kita mencacah berapa kali sebuah nilai muncul. Banyak kemunculan disebut frekuensi nilai.", "5️⃣", ALUR_A[5], ALUR_A[6]),
    mind(7, "Frekuensi pada Ulangan", "Pada data ulangan, nilai sembilan muncul lima kali dan nilai sepuluh muncul dua kali.", "9️⃣", ALUR_A[6], ALUR_A[7]),
    mind(8, "Siap ke Tabel", "Setelah diurutkan dan dicacah, data siap disajikan dalam tabel bertiga kolom: nilai, turus, dan banyak.", "📋", ALUR_A[7], "Tabel"),
  ],
  infografis: [
    { judul: "Mengurutkan Data", emoji: "📶", countNum: 1, countWord: "urut", suara: "Data diurutkan dari terkecil ke terbesar supaya mudah dibaca." },
    { judul: "Data Terkecil", emoji: "⬇️", countNum: 5, countWord: "terkecil", suara: "Data terkecil adalah nilai paling kecil, misalnya lima." },
    { judul: "Data Terbesar", emoji: "⬆️", countNum: 10, countWord: "terbesar", suara: "Data terbesar adalah nilai paling besar, misalnya sepuluh." },
    { judul: "Jangkauan", emoji: "📏", countNum: 5, countWord: "jangkauan", suara: "Jangkauan sama dengan sepuluh dikurangi lima, hasilnya lima." },
    { judul: "Turus", emoji: "||||", countNum: 4, countWord: "garis", suara: "Turus adalah garis tegak. Satu garis untuk satu data." },
    { judul: "Kelompok Lima", emoji: "卌", countNum: 5, countWord: "lima", suara: "Empat garis tegak dicoret garis miring menjadi kelompok lima." },
    { judul: "Banyak Nilai 9", emoji: "5️⃣", countNum: 5, countWord: "siswa", suara: "Pada data ulangan, nilai sembilan diperoleh lima siswa." },
    { judul: "Banyak Nilai 10", emoji: "2️⃣", countNum: 2, countWord: "siswa", suara: "Nilai sepuluh diperoleh dua siswa." },
    { judul: "Enam Macam Nilai", emoji: "6️⃣", countNum: 6, countWord: "macam", suara: "Ada enam macam nilai: lima, enam, tujuh, delapan, sembilan, dan sepuluh." },
    { judul: "Siap ke Tabel", emoji: "📋", countNum: 3, countWord: "kolom", suara: "Tabel nilai memiliki kolom nilai, turus, dan banyak." },
  ],
  games: GAMES_A,
  poin: [
    { ikon: "📶", nama: "Mengurutkan", isi: "Data diurutkan dari terkecil ke terbesar atau dari terbesar ke terkecil", suara: "Mengurutkan data memudahkan kita mencari data terkecil dan terbesar." },
    { ikon: "⬇️", nama: "Data terkecil dan terbesar", isi: "Data terkecil adalah nilai paling kecil. Data terbesar adalah nilai paling besar", suara: "Cari bilangan paling kecil dan paling besar pada data." },
    { ikon: "📏", nama: "Jangkauan", isi: "Jangkauan = data terbesar − data terkecil", suara: "Jangkauan adalah selisih data terbesar dan data terkecil." },
    { ikon: "||||", nama: "Turus", isi: "Turus adalah garis tegak penanda banyak data. Lima turus dikelompokkan dengan garis miring", suara: "Satu garis untuk satu data. Garis kelima mencoret miring." },
    { ikon: "5️⃣", nama: "Banyak nilai", isi: "Banyak kemunculan sebuah nilai dihitung dengan turus lalu ditulis angkanya", suara: "Hitung berapa kali nilai itu muncul, lalu tulis banyaknya." },
  ],
  poinSuara: "Ingat lima poin penting: mengurutkan data, data terkecil dan terbesar, jangkauan, turus, dan banyak nilai.",
  cara: {
    suara: "Urutkan data dari terkecil, cari data terkecil dan terbesar, hitung jangkauan, lalu cacah banyak tiap nilai dengan turus.",
    potongan: [
      { teks: "Urutkan data dari terkecil.", warna: "#FFFFFF" },
      { teks: "Cari data terkecil dan terbesar.", warna: "#FFE566" },
      { teks: "Hitung jangkauan.", warna: "#7FCB96" },
      { teks: "Cacah banyak tiap nilai dengan turus.", warna: "#BAE6FD" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: catat tinggi badan empat anggota keluarga dalam sentimeter. Urutkan dari terkecil, tulis data terkecil, data terbesar, dan jangkauannya.",
  refleksi: [
    "Aku dapat mengurutkan data dari terkecil ke terbesar.",
    "Aku dapat menentukan data terkecil dan data terbesar.",
    "Aku dapat menghitung jangkauan data.",
    "Aku dapat mencacah banyak kemunculan sebuah nilai dengan turus.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Menyajikan data dalam bentuk tabel                            */
/* ====================================================================== */

const GAMES_B: GameNaskah[] = [
  C("count-groups-of-five", "Hitung Kelompok Lima", "hlm. 201–202 (Aktivitas 2: turus kelompok lima)", "Menghitung banyak benda yang dikelompokkan lima-lima.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung kelompok lima dan sisanya lalu memilih hasilnya.", "Hitung kelompok lima dan sisanya.", "🍎", 6),
  C("count-sticks", "Hitung Lidi", "hlm. 201 (lidi sebagai turus)", "Menghitung banyak lidi pada gambar turus lidi.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung lidi lalu memilih bilangannya.", "Hitung lidi pada gambar.", "📏", 6),
  C("order-sticks", "Urutkan Lidi", "hlm. 201–202 (membandingkan turus lidi)", "Mengurutkan tumpukan lidi dari yang paling kecil atau paling besar.", "Tiga ronde, tiap ronde tiga tumpukan lidi. Siswa mengetuk satu per satu menurut urutan.", "Ketuk lidi menurut banyaknya.", "📶", 9),
  C("count-red-beads", "Hitung Manik Merah", "hlm. 203–204 (Aktivitas 3: manik)", "Menghitung banyak manik merah pada deretan sepuluh manik.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung manik merah lalu memilih bilangannya.", "Hitung manik merah.", "🔴", 6),
  C("sort-beads-color", "Pilah Manik menurut Warna", "hlm. 203–204 (manik merah, biru, hitam)", "Memilah manik ke kotak merah, biru, atau hitam.", "Tiga ronde, tiap ronde sembilan manik dan tiga kotak. Siswa menyeret atau mengetuk manik ke kotak warnanya.", "Pilah manik ke kotak warnanya.", "🎨", 27),
  C("tap-most-least-beads", "Ketuk Anggota dengan Manik Merah", "hlm. 204 (paling banyak dan paling sedikit)", "Menemukan anggota dengan manik merah paling banyak atau paling sedikit.", "Tiga ronde, tiap ronde tiga anggota dan dua pertanyaan. Siswa mengetuk anggota yang cocok.", "Ketuk anggota yang paling banyak atau paling sedikit.", "👆", 6),
  C("board-count-sticks", "Papan: Berapa Banyak Lidi", "hlm. 201–202 (mencacah lidi)", "Menghitung lidi lalu menulis banyaknya pada papan.", "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka pada papan lalu menekan Periksa.", "Isi papan dengan banyak lidi.", "🗂️", 6),
  C("match-sticks-count", "Jodohkan Lidi dan Banyaknya", "hlm. 201 (lidi dan bilangan)", "Menjodohkan tumpukan lidi dengan bilangan banyaknya.", "Tiga ronde, tiap ronde tiga tumpukan dan tiga bilangan. Siswa mengetuk lidi, lalu mengetuk bilangannya.", "Ketuk lidi, lalu ketuk banyaknya.", "🔗", 9),
  C("total-red-beads", "Jumlah Manik Merah Semua Anggota", "hlm. 204 (menjumlahkan data manik)", "Menjumlahkan manik merah semua anggota.", "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan lalu memilih hasilnya.", "Jumlahkan manik merah semua anggota.", "➕", 6),
  C("memory-sticks-count", "Memori Lidi dan Banyaknya", "hlm. 201 (lidi dan bilangan)", "Mencocokkan tumpukan lidi dengan banyaknya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari lidi dan banyaknya.", "🃏", 12),
  P("tally-to-number", "Turus ke Angka", "hlm. 201–202 (turus kelompok lima)", "Membaca banyak data dari gambar turus kelompok lima.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung turus lalu memilih bilangannya.", "Hitung turus kelompok lima, lalu pilih bilangannya.", "tally-number", 2, 2),
  P("tap-correct-tally", "Ketuk Turus yang Tepat", "hlm. 202 (membaca turus)", "Menemukan kartu turus yang banyaknya sama dengan bilangan yang diminta.", "Tiga ronde, tiap ronde tiga turus dan dua pertanyaan. Siswa mengetuk turus yang cocok.", "Ketuk turus yang banyaknya sama dengan bilangan itu.", "tally-pick", 3, 2),
  P("read-letter-table", "Baca Tabel Huruf", "hlm. 205–206 (tabel huruf STATISTIKA)", "Menemukan huruf terbanyak atau tersedikit pada kata dari tabel turus.", "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel huruf lalu memilih hurufnya.", "Pilih huruf terbanyak atau tersedikit.", "letter-table", 2, 2),
  P("fill-letter-tally-table", "Isi Tabel Huruf dan Turus", "hlm. 205–206 (mengisi kolom banyak)", "Melengkapi kolom banyak pada tabel huruf dan turus.", "Tiga tabel. Siswa mengetuk baris, lalu mengetuk kartu banyak yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu banyak huruf.", "letter-fill", 3, 3),
  P("order-letters-by-count", "Urutkan Huruf menurut Banyaknya", "hlm. 206 (membandingkan huruf)", "Mengurutkan huruf menurut banyak kemunculannya pada kata.", "Tiga ronde, tiap ronde tiga huruf dengan turus. Siswa mengetuk huruf satu per satu menurut urutan.", "Ketuk huruf menurut banyaknya.", "letter-order", 3, 3),
  P("letter-count-difference", "Selisih Banyak Huruf", "hlm. 206 (membandingkan huruf)", "Menghitung selisih banyak dua huruf pada sebuah kata.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih selisihnya.", "Hitung selisih banyak dua huruf.", "letter-diff", 2, 2),
  P("total-letters", "Jumlah Semua Huruf", "hlm. 205 (panjang kata)", "Menghitung jumlah semua huruf pada kata.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung huruf lalu memilih hasilnya.", "Hitung jumlah semua huruf pada kata.", "letter-total", 2, 2),
  P("count-dot-groups-five", "Hitung Titik Kelompok Lima", "hlm. 202 (kelompok lima)", "Menghitung banyak titik yang disusun kelompok lima.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih bilangannya.", "Hitung titik kelompok lima.", "dot-five", 2, 2),
  P("tap-all-letters-condition", "Ketuk Semua Huruf dengan Syarat", "hlm. 206 (membandingkan huruf)", "Menemukan semua huruf yang banyaknya lebih, kurang, atau sama dengan acuan.", "Tiga ronde, tiap ronde empat huruf dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "letter-select", 3, 4),
  P("read-score-table", "Baca Tabel Nilai", "hlm. 207–208 (tabel nilai ulangan)", "Menghitung banyak siswa dengan nilai sama, lebih, atau kurang dari acuan pada tabel.", "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel nilai lalu memilih hasilnya.", "Baca tabel nilai, lalu pilih jawabannya.", "score-table", 2, 2),
  A("read-value-table", "Baca Tabel Nilai (Angka)", "hlm. 207–208 (tabel nilai)", "Menemukan nilai yang paling banyak muncul atau banyak siswa pada nilai tertentu.", "Tiga ronde, tiap ronde dua soal. Siswa membaca data lalu memilih jawabannya.", "Pilih nilai terbanyak atau banyak siswa pada nilai itu.", "f", "TABEL NILAI", "frekuensi nilai"),
  A("more-than-on-data", "Lebih dari pada Data", "hlm. 208 (lebih dari nilai acuan)", "Menghitung banyak data yang lebih dari bilangan acuan.", "Tiga ronde, tiap ronde dua soal. Siswa mencacah lalu memilih hasilnya.", "Hitung data yang lebih dari acuan.", ">", "LEBIH DARI", "banyak data > acuan"),
  A("less-than-on-data", "Kurang dari pada Data", "hlm. 208 (kurang dari nilai acuan)", "Menghitung banyak data yang kurang dari bilangan acuan.", "Tiga ronde, tiap ronde dua soal. Siswa mencacah lalu memilih hasilnya.", "Hitung data yang kurang dari acuan.", "<", "KURANG DARI", "banyak data < acuan"),
  A("count-letter-in-word", "Banyak Huruf pada Kata", "hlm. 205–206 (STATISTIKA dan MATEMATIKA)", "Menghitung banyak sebuah huruf pada kata.", "Tiga ronde, tiap ronde dua soal. Siswa mencacah huruf lalu memilih banyaknya.", "Hitung banyak huruf itu pada kata.", "A", "BANYAK HURUF", "frekuensi huruf"),
  A("order-letters-abstract", "Urutkan Huruf menurut Banyaknya", "hlm. 206 (membandingkan huruf)", "Mengurutkan huruf menurut banyak kemunculannya tanpa gambar turus.", "Tiga ronde, tiap ronde tiga huruf. Siswa mengetuk huruf satu per satu menurut urutan.", "Ketuk huruf menurut banyaknya.", "A T K", "URUTKAN HURUF", "dari kecil atau besar"),
  A("fill-table-sentence", "Lengkapi Kalimat Tabel dan Turus", "hlm. 201–208 (istilah tabel)", "Melengkapi kalimat tentang turus kelompok lima dan kolom tabel.", "Tiga ronde, tiap ronde tiga kalimat. Siswa memilih satu dari tiga kata untuk bagian kosong.", "Pilih kata untuk bagian kosong.", "…", "KALIMAT", "tabel • turus"),
  A("match-table-terms", "Jodohkan Istilah Tabel dan Artinya", "hlm. 196 dan 201–208 (kata kunci)", "Menjodohkan istilah tabel dan turus dengan artinya.", "Tiga ronde, tiap ronde tiga pasangan. Siswa mengetuk istilah, lalu mengetuk artinya.", "Ketuk istilah, lalu ketuk artinya.", "↔", "JODOHKAN", "istilah • arti"),
  A("true-false-table", "Benar atau Salah: Tabel", "hlm. 201–208 (mengamati tabel)", "Menilai pernyataan tentang turus kelompok lima, tabel, dan huruf.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
  A("detective-table", "Detektif Tabel", "hlm. 205–208 (huruf dan nilai)", "Menemukan bilangan dari dua petunjuk tentang huruf atau nilai.", "Empat soal. Siswa membaca petunjuk lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
  A("sentence-words-table", "Susun Kata Tabel", "hlm. 201–208 (kalimat kunci)", "Menyusun kalimat tentang turus kelompok lima dan tabel dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat tabel"),
];

export const SUB_B35: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Menyajikan Data dalam Bentuk Tabel)",
  fullTitle: "Sub-Bab B: Menyajikan Data dalam Bentuk Tabel",
  targetDescription:
    "Siswa menulis turus kelompok lima (empat tegak dan satu miring), menyajikan data nilai, huruf, dan manik dalam tabel bertiga kolom (nilai atau kategori, turus, dan banyak), serta membaca tabel untuk menjawab pertanyaan lebih dari, kurang dari, terbanyak, dan tersedikit.",
  secondaryBg: "#FEF3C7",
  secondaryBorder: "#D97706",
  secondaryText: "#78350F",
  silabus: {
    teksSuara: `Kita belajar menyajikan data dalam bentuk tabel. Lidi disusun menjadi turus kelompok lima. Manik dan huruf pada kata STATISTIKA dicacah dengan turus, lalu ditulis pada tabel nilai, turus, dan banyak. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menyajikan data dalam bentuk tabel dengan turus kelompok lima dan kolom banyak. Pada sub-bab ini siswa membaca tabel untuk membandingkan data.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 5: Penyajian Data dalam Tabel, Sub-Bab B hlm. 201–208) dan Buku Panduan Guru Bab 5 Topik B.",
  },
  videos: [
    {
      id: "K3B5B-V1",
      judul: "Lidi Menjadi Turus",
      subjudul: "Empat tegak dan satu miring",
      adegan: [
        {
          id: "K3B5B-V1-1",
          judul: "Satu sampai empat lidi",
          ketukan: [
            "Ambil satu lidi untuk menunjukkan data berjumlah satu.",
            "Tambahkan lidi tegak hingga berjumlah empat.",
            "Lidi disusun sejajar agar mudah dihitung.",
            "Empat lidi tegak menyatakan empat data.",
          ],
          papan: ["Satu lidi = satu data", "Tambah sampai empat", "Lidi disusun sejajar", "Empat lidi = empat data"],
        },
        {
          id: "K3B5B-V1-2",
          judul: "Garis miring kelima",
          ketukan: [
            "Ambil empat lidi tegak seperti sebelumnya.",
            "Tambahkan satu lidi dan letakkan secara miring di atasnya.",
            "Sekarang lidi berjumlah lima.",
            "Itulah cara menulis turus kelompok lima.",
          ],
          papan: ["Empat lidi tegak", "Satu lidi miring di atasnya", "Jumlah menjadi lima", "Turus kelompok lima"],
        },
        {
          id: "K3B5B-V1-3",
          judul: "Lebih dari lima",
          ketukan: [
            "Ulangi kelompok lima, lalu tambahkan lidi di sebelahnya.",
            "Dua kelompok lima sama dengan sepuluh data.",
            "Dua kelompok lima ditambah tiga sama dengan tiga belas.",
            "Turus membuat pencacahan data lebih cepat.",
          ],
          papan: ["Ulangi kelompok lima", "Dua kelompok = 10", "10 + 3 = 13", "Pencacahan lebih cepat"],
        },
      ],
    },
    {
      id: "K3B5B-V2",
      judul: "Manik Berwarna",
      subjudul: "Dari benda ke tabel",
      adegan: [
        {
          id: "K3B5B-V2-1",
          judul: "Tiga warna manik",
          ketukan: [
            "Anggota kelompok mendapat manik merah, biru, dan hitam.",
            "Mereka menghitung manik tiap warna satu per satu.",
            "Hasil hitungan dicatat dengan turus.",
            "Lalu turus diubah menjadi angka pada kolom banyak.",
          ],
          papan: ["Manik merah, biru, hitam", "Hitung tiap warna", "Catat dengan turus", "Turus jadi angka"],
        },
        {
          id: "K3B5B-V2-2",
          judul: "Tabel manik",
          ketukan: [
            "Tabel manik memiliki tiga kolom.",
            "Kolom pertama: warna manik.",
            "Kolom kedua: turus.",
            "Kolom ketiga: banyak manik.",
          ],
          papan: ["Tabel tiga kolom", "Kolom warna", "Kolom turus", "Kolom banyak"],
        },
        {
          id: "K3B5B-V2-3",
          judul: "Siapa paling banyak",
          ketukan: [
            "Siapa anggota dengan manik merah paling banyak?",
            "Siapa yang paling sedikit?",
            "Tabel membantu kita menjawab dengan cepat.",
            "Tanpa menghitung ulang semua manik dari awal.",
          ],
          papan: ["Manik merah paling banyak?", "Paling sedikit?", "Tabel menjawab cepat", "Tanpa hitung ulang"],
        },
      ],
    },
    {
      id: "K3B5B-V3",
      judul: "Huruf pada STATISTIKA",
      subjudul: "Tabel huruf, turus, dan banyak",
      adegan: [
        {
          id: "K3B5B-V3-1",
          judul: "Kata STATISTIKA",
          ketukan: [
            "Perhatikan kata STATISTIKA.",
            "Huruf-hurufnya dicacah satu per satu.",
            "Huruf T muncul tiga kali.",
            "Huruf S muncul dua kali, dan huruf K muncul satu kali.",
          ],
          papan: ["Kata STATISTIKA", "Cacah huruf satu per satu", "Huruf T ada 3", "S ada 2, K ada 1"],
        },
        {
          id: "K3B5B-V3-2",
          judul: "Isi tabel huruf",
          ketukan: [
            "Buat tabel: huruf, turus, dan banyak.",
            "Tulis turus sesuai banyak kemunculan tiap huruf.",
            "Salin banyaknya ke kolom angka.",
            "Tabel huruf siap dibaca.",
          ],
          papan: ["Kolom huruf, turus, banyak", "Tulis turus tiap huruf", "Salin ke kolom angka", "Tabel huruf siap"],
        },
        {
          id: "K3B5B-V3-3",
          judul: "Baca tabel nilai",
          ketukan: [
            "Cara yang sama dipakai pada tabel nilai ulangan.",
            "Nilai diurutkan, lalu ditulis turus dan banyaknya.",
            "Kita bisa menjawab: berapa siswa bernilai lebih dari tujuh?",
            "Tabel membuat data rapi dan mudah dibandingkan.",
          ],
          papan: ["Sama pada tabel nilai", "Urutkan, turus, banyak", "Lebih dari tujuh berapa?", "Data rapi dan mudah"],
        },
      ],
    },
  ],
  mindMaps: [
    mind(1, "Turus Kelompok Lima", "Lima data ditulis empat garis tegak dan satu garis miring. Itulah turus kelompok lima.", "卌", ALUR_B[0], ALUR_B[1]),
    mind(2, "Dari Lidi ke Angka", "Lidi dihitung kelompok lima, lalu banyaknya ditulis angka pada kolom banyak.", "📏", ALUR_B[1], ALUR_B[2]),
    mind(3, "Tabel Manik", "Warna manik dicatat dengan turus dan angka. Tiap warna satu baris pada tabel.", "🔴", ALUR_B[2], ALUR_B[3]),
    mind(4, "Tabel Huruf", "Huruf pada kata STATISTIKA dicacah seperti data nilai. Huruf T paling banyak, huruf K paling sedikit.", "🇹", ALUR_B[3], ALUR_B[4]),
    mind(5, "Tabel Nilai", "Nilai ulangan disusun dari terkecil. Kolom turus digambar, kolom banyak diisi angka.", "📋", ALUR_B[4], ALUR_B[5]),
    mind(6, "Membaca Tabel", "Tabel menjawab pertanyaan terbanyak, tersedikit, lebih dari, dan kurang dari tanpa menghitung ulang.", "👀", ALUR_B[5], ALUR_B[6]),
    mind(7, "Lebih dan Kurang", "Jumlahkan kolom banyak pada nilai di atas atau di bawah acuan untuk menjawab lebih dari dan kurang dari.", ">", ALUR_B[6], ALUR_B[7]),
    mind(8, "Data Rapi", "Tabel membuat data rapi, mudah dibandingkan, dan siap dilaporkan ke kelas.", "✅", ALUR_B[7], "Selesai"),
  ],
  infografis: [
    { judul: "Empat Lidi Tegak", emoji: "||||", countNum: 4, countWord: "lidi", suara: "Empat lidi tegak menyatakan empat data." },
    { judul: "Kelompok Lima", emoji: "卌", countNum: 5, countWord: "lima", suara: "Empat tegak ditambah satu miring menjadi kelompok lima." },
    { judul: "Dua Kelompok", emoji: "🔟", countNum: 10, countWord: "sepuluh", suara: "Dua kelompok lima menyatakan sepuluh data." },
    { judul: "Tiga Belas", emoji: "1️⃣3️⃣", countNum: 13, countWord: "tiga belas", suara: "Dua kelompok lima ditambah tiga turus sama dengan tiga belas." },
    { judul: "Tabel Tiga Kolom", emoji: "📋", countNum: 3, countWord: "kolom", suara: "Tabel memuat kategori, turus, dan banyak." },
    { judul: "Manik Merah", emoji: "🔴", countNum: 1, countWord: "merah", suara: "Manik merah, biru, dan hitam dicatat per warna." },
    { judul: "Huruf T", emoji: "🇹", countNum: 3, countWord: "tiga", suara: "Pada STATISTIKA, huruf T muncul tiga kali." },
    { judul: "Huruf K", emoji: "🇰", countNum: 1, countWord: "satu", suara: "Huruf K pada STATISTIKA muncul satu kali." },
    { judul: "Lebih dari Tujuh", emoji: ">", countNum: 12, countWord: "siswa", suara: "Jumlahkan siswa bernilai delapan, sembilan, dan sepuluh." },
    { judul: "Data Rapi", emoji: "✅", countNum: 1, countWord: "rapi", suara: "Tabel membuat data rapi dan mudah dibandingkan." },
  ],
  games: GAMES_B,
  poin: [
    { ikon: "卌", nama: "Turus kelompok lima", isi: "Lima turus ditulis empat garis tegak dan satu garis miring", suara: "Empat tegak dicoret satu miring menjadi kelompok lima." },
    { ikon: "📋", nama: "Tabel tiga kolom", isi: "Tabel data memuat kategori atau nilai, turus, dan banyak", suara: "Tiga kolom: nilai, turus, dan banyak." },
    { ikon: "🔴", nama: "Dari benda ke tabel", isi: "Benda atau huruf dicacah dengan turus, lalu banyaknya ditulis angka", suara: "Hitung dulu, tulis turus, lalu salin angkanya." },
    { ikon: "👀", nama: "Membaca tabel", isi: "Tabel menjawab pertanyaan terbanyak, tersedikit, lebih dari, dan kurang dari", suara: "Baca kolom banyak untuk menjawab pertanyaan." },
    { ikon: "📶", nama: "Urutkan dulu", isi: "Sebelum membuat tabel, data diurutkan dari yang terkecil", suara: "Urutkan data agar tabel rapi." },
  ],
  poinSuara: "Ingat lima poin penting: turus kelompok lima, tabel tiga kolom, dari benda ke tabel, membaca tabel, dan urutkan dulu.",
  cara: {
    suara: "Urutkan data dari terkecil, gambar turus kelompok lima, tulis banyaknya pada kolom angka, lalu baca tabel untuk menjawab pertanyaan.",
    potongan: [
      { teks: "Urutkan data dari terkecil.", warna: "#FFFFFF" },
      { teks: "Gambar turus kelompok lima.", warna: "#FFE566" },
      { teks: "Tulis banyaknya pada kolom angka.", warna: "#7FCB96" },
      { teks: "Baca tabel untuk menjawab pertanyaan.", warna: "#BAE6FD" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: hitung huruf pada namamu. Buat tabel huruf, turus, dan banyak. Tulis huruf terbanyak dan tersedikit.",
  refleksi: [
    "Aku dapat menulis turus kelompok lima.",
    "Aku dapat membuat tabel dengan kolom nilai, turus, dan banyak.",
    "Aku dapat membaca tabel untuk menjawab pertanyaan lebih dari dan kurang dari.",
    "Aku dapat mencacah huruf pada kata dengan turus.",
  ],
};

export const SUB_BAB_K3B5: SubBabNaskah[] = [SUB_A35, SUB_B35];
