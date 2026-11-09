/**
 * Naskah murni Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000), Sub-Bab A (Bilangan dan Lambang Bilangan Cacah sampai
 * 1.000: membaca dan menulis) dan Sub-Bab B (Nilai Tempat Bilangan Cacah sampai 1.000).
 * Sumber: Buku Siswa Matematika Kelas III Kemendikbudristek, Bab 1 hlm. 3-24, serta Buku Panduan Guru Bab 1 (kunci jawaban,
 * miskonsepsi, dan langkah pembelajaran), diperkaya dengan metode dari luar buku: balok Dienes (blok satuan, batang puluhan,
 * lempeng ratusan), kemasan nyata (benda, bungkus, dus), penukaran sepuluh-ke-satu, papan nilai tempat tiga kolom, kartu
 * angka (Montessori), uraian bilangan (expanded form), dan garis bilangan ratusan.
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k3-bab1.mjs) memakainya untuk menulis src/data/kelas3-bab1.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k3b1.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K3B1_META = {
  chapterId: "k3-mat-bab1",
  phaseCode: "FASE_B",
  grade: 3,
  subjectLabel: "MATEMATIKA - KELAS 3 SD",
  title: "BAB 1: BILANGAN CACAH SAMPAI 1.000",
  silabusElemen: "🌈 Fase B • Elemen Bilangan: Membaca, Menulis, dan Nilai Tempat Bilangan Cacah sampai 1.000 (Kelas 3 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Puluhan dan satuan", "Seratus dan ratusan", "Papan tiga tempat", "Membaca bilangan", "Angka nol", "Menulis lambang bilangan", "Menyusun dari kartu angka", "Bilangan di sekitar kita", "Siap membaca dan menulis"];
const ALUR_B = ["Angka punya tempat", "Tempat menentukan nilai", "Nilai tiap tempat", "Tiga kaleng", "Menyusun bilangan", "Mengurai bilangan", "Angka nol dalam nilai tempat", "Teliti memakai tabel", "Siap menentukan nilai tempat"];

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
/* SUB-BAB A. Membaca dan menulis bilangan cacah sampai 1.000               */
/* ====================================================================== */

export const SUB_A31: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Bilangan dan Lambang Bilangan)",
  fullTitle: "Sub-Bab A: Bilangan dan Lambang Bilangan Cacah sampai 1.000",
  targetDescription:
    "Siswa membaca bilangan cacah tiga angka sampai 1.000 dengan benar, termasuk bilangan yang memuat angka nol (703, 900, 405), serta menulis lambang bilangan dari kata bilangan. Siswa mengenal satuan, puluhan, dan ratusan lewat benda nyata dan model blok, memahami bahwa sepuluh satuan sama dengan satu puluhan dan sepuluh puluhan sama dengan satu ratusan, lalu memakai papan ratusan, puluhan, dan satuan.",
  secondaryBg: "#DCFCE7",
  secondaryBorder: "#16A34A",
  secondaryText: "#14532D",
  silabus: {
    teksSuara: `Kita belajar bilangan dan lambang bilangan cacah sampai seribu. Alfa membawa tongkat Pramuka sepanjang seratus enam puluh sentimeter, Meutia berjalan enam ratus tujuh puluh satu meter ke sekolah, dan Alen berjalan lima ratus tujuh puluh dua meter ke taman kota. Kita belajar bahwa sepuluh satuan adalah satu puluhan dan sepuluh puluhan adalah satu ratusan, lalu membaca dan menulis bilangan tiga angka dengan papan ratusan, puluhan, dan satuan. Kita juga berhati-hati dengan angka nol. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membaca dan menulis bilangan cacah sampai 1.000 serta memahami satuan, puluhan, dan ratusan.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab A hlm. 3–17) dan Buku Panduan Guru Bab 1 Topik A.",
  },
  videos: [
    {
      id: "K3B1A-V1",
      judul: "Tongkat Pramuka Alfa",
      subjudul: "Dari satuan ke ratusan",
      adegan: [
        {
          id: "K3B1A-V1-1",
          judul: "Kegiatan Pramuka",
          ketukan: [
            "Galih, Alen, dan Alfa mengikuti kegiatan Pramuka. Alfa terpilih menjadi ketua barung.",
            "Alfa membawa tongkat yang di atasnya terikat bendera sebagai tanda barung.",
            "Tongkat itu selalu dibawanya saat kegiatan Pramuka.",
            "Menurut kalian, berapa panjang tongkat yang dibawa Alfa?",
          ],
          papan: ["Kegiatan Pramuka", "Tongkat barung", "Selalu dibawa", "Berapa panjangnya?"],
        },
        {
          id: "K3B1A-V1-2",
          judul: "Satuan, puluhan, ratusan",
          ketukan: [
            "Kita ingat dulu. Satu kotak kecil adalah satu satuan.",
            "Sepuluh satuan dapat disebut satu puluhan, seperti satu batang.",
            "Sepuluh batang puluhan ditumpuk menjadi seratus satuan.",
            "Seratus satuan disebut satu ratusan, seperti satu lembar besar.",
          ],
          papan: ["1 satuan", "10 satuan = 1 puluhan", "10 puluhan = 100 satuan", "100 satuan = 1 ratusan"],
        },
        {
          id: "K3B1A-V1-3",
          judul: "Tongkat 160 sentimeter",
          ketukan: [
            "Panjang tongkat Alfa adalah seratus enam puluh sentimeter, ditulis 160.",
            "Kita taruh di papan nilai tempat. Ratusan satu, puluhan enam, satuan nol.",
            "Kita baca ratusan lebih dulu, yaitu seratus. Lalu puluhan, yaitu enam puluh.",
            "Satuannya nol, jadi tidak dibaca. Bilangan 160 dibaca seratus enam puluh.",
          ],
          papan: ["Tongkat 160 cm", "1 ratusan, 6 puluhan, 0 satuan", "Seratus + enam puluh", "Nol tidak dibaca"],
        },
      ],
    },
    {
      id: "K3B1A-V2",
      judul: "Perjalanan Meutia",
      subjudul: "Membaca bilangan tiga angka",
      adegan: [
        {
          id: "K3B1A-V2-1",
          judul: "Berjalan ke sekolah",
          ketukan: [
            "Meutia berangkat ke sekolah dengan berjalan kaki bersama teman-teman.",
            "Jarak rumah Meutia ke sekolah adalah enam ratus tujuh puluh satu meter.",
            "Berjalan kaki menyehatkan badan, dan Meutia sangat senang berjalan kaki.",
            "Kita menemukan sebuah bilangan tiga angka, yaitu 671.",
          ],
          papan: ["Berjalan ke sekolah", "671 meter", "Jalan kaki itu sehat", "Bilangan tiga angka"],
        },
        {
          id: "K3B1A-V2-2",
          judul: "Minimarket 759 meter",
          ketukan: [
            "Di jalan lain ada papan bertuliskan 759 meter menuju minimarket.",
            "Ambil kartu bilangan 7, kartu 5, dan kartu 9, lalu susun dari kiri ke kanan.",
            "Bacalah, tujuh ratus lima puluh sembilan.",
            "Ratusan dibaca dengan kata ratus, puluhan dengan kata puluh, dan satuan dibaca angkanya.",
          ],
          papan: ["Minimarket 759 m", "Kartu 7, 5, dan 9", "Tujuh ratus lima puluh sembilan", "Ratus, puluh, satuan"],
        },
        {
          id: "K3B1A-V2-3",
          judul: "Bilangan dengan angka nol",
          ketukan: [
            "Perhatikan bilangan 703. Puluhannya nol, jadi tidak ada puluhan yang dibaca.",
            "703 dibaca tujuh ratus tiga. Tidak dibaca tujuh ratus nol tiga.",
            "Bilangan 900 dibaca sembilan ratus, sebab puluhan dan satuannya nol.",
            "Bilangan 634 dibaca enam ratus tiga puluh empat.",
          ],
          papan: ["703", "Tujuh ratus tiga", "900 = sembilan ratus", "634"],
        },
      ],
    },
    {
      id: "K3B1A-V3",
      judul: "Taman Kota Alen",
      subjudul: "Menulis lambang bilangan",
      adegan: [
        {
          id: "K3B1A-V3-1",
          judul: "Ke taman kota",
          ketukan: [
            "Setiap hari Minggu Alen bermain di taman kota dan berjalan kaki dari rumah.",
            "Jarak rumah Alen ke taman kota adalah lima ratus tujuh puluh dua meter.",
            "Bagaimana cara menulis lambang bilangan itu?",
            "Dengarkan kata bilangannya, lalu tulis angkanya.",
          ],
          papan: ["Taman kota", "Lima ratus tujuh puluh dua", "Menulis lambangnya", "Dengar, lalu tulis"],
        },
        {
          id: "K3B1A-V3-2",
          judul: "Menulis 354",
          ketukan: [
            "Kita akan menulis tiga ratus lima puluh empat.",
            "Tentukan angka ratusan, yaitu tiga, tulis 3.",
            "Tentukan angka puluhan, yaitu lima, tulis 5. Lalu angka satuan, yaitu empat, tulis 4.",
            "Jadi, bilangan tersebut adalah 354.",
          ],
          papan: ["Tiga ratus lima puluh empat", "Ratusan: 3", "Puluhan: 5, satuan: 4", "354"],
        },
        {
          id: "K3B1A-V3-3",
          judul: "Nol penjaga tempat",
          ketukan: [
            "Bagaimana menulis empat ratus lima? Tidak ada puluhan, jadi puluhannya nol.",
            "Kita tulis 4 di ratusan, 0 di puluhan, dan 5 di satuan, yaitu 405.",
            "Kalau nolnya dihilangkan menjadi 45, dan nilainya berubah jauh.",
            "Nol menjaga tempat puluhan supaya angka lain tetap berada di tempatnya.",
          ],
          papan: ["Empat ratus lima", "4, nol, dan 5", "Tanpa nol: 45", "Nol penjaga tempat"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Puluhan dan Satuan",
      stepDesc:
        "Kita mengingat bilangan dua angka dulu. Satu kotak kecil adalah satu satuan. Sepuluh satuan dapat disebut satu puluhan, seperti satu batang yang berisi sepuluh kotak kecil. Bilangan 22 terdiri atas 2 puluhan dan 2 satuan, yaitu sepuluh satuan ditambah sepuluh satuan ditambah dua satuan. Dasar ini dipakai terus pada bilangan tiga angka.",
      icon: "🧊",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Seratus dan Ratusan",
      stepDesc:
        "Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan. Seratus satuan disebut satu ratusan. Sepuluh puluhan juga sama dengan satu ratusan, seperti sepuluh batang yang dirapatkan menjadi satu lembar besar berisi seratus kotak kecil. Dari seratus, kita mulai mengenal bilangan tiga angka.",
      icon: "💯",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Papan Tiga Tempat",
      stepDesc:
        "Bilangan tiga angka menempati tiga tempat. Dari kiri ke kanan: ratusan, puluhan, dan satuan. Angka pada tiap tempat menunjukkan berapa banyak ratusan, puluhan, atau satuan. Satu ratusan, lima puluhan, dan dua satuan ditulis 152. Papan nilai tempat membantu kita tidak tertukar membaca angka.",
      icon: "🗂️",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Membaca Bilangan Tiga Angka",
      stepDesc:
        "Bacalah dari kiri ke kanan, tempat demi tempat. Angka ratusan dibaca dengan kata ratus, angka puluhan dengan kata puluh, dan angka satuan dibaca angkanya saja. Bilangan 671 dibaca enam ratus tujuh puluh satu. Satu ratusan dibaca seratus, bukan satu ratus, jadi 160 dibaca seratus enam puluh. Angka puluhan yang berpasangan dengan satuan sepuluh sampai sembilan belas punya nama khusus, misalnya 112 dibaca seratus dua belas.",
      icon: "🗣️",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Angka Nol Tidak Dibaca",
      stepDesc:
        "Angka nol berarti tidak ada ratusan, puluhan, atau satuan di tempat itu. Nol pada tempat puluhan tidak dibaca, sehingga 703 dibaca tujuh ratus tiga. Nol pada tempat satuan juga tidak dibaca, sehingga 160 dibaca seratus enam puluh. Bila puluhan dan satuan sama-sama nol, 900 dibaca sembilan ratus. Kesalahan yang sering terjadi adalah membaca nol dengan kata nol, seperti tujuh ratus nol tiga.",
      icon: "⭕",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Menulis Lambang Bilangan",
      stepDesc:
        "Untuk menulis, dengarkan kata bilangannya lalu cari angka tiap tempat. Kata ratus menunjukkan angka ratusan, kata puluh menunjukkan angka puluhan, dan angka di belakangnya adalah satuan. Lima ratus tujuh puluh dua ditulis 572. Bila tidak ada kata puluh, tulis nol di tempat puluhan: empat ratus lima ditulis 405, bukan 45.",
      icon: "✍️",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Menyusun dari Kartu Angka",
      stepDesc:
        "Kartu angka 0 sampai 9 dapat disusun menjadi bilangan tiga angka. Angka pertama tidak boleh nol, karena bilangan tiga angka dimulai dari ratusan. Dari kartu 3, 5, dan 1 kita dapat menyusun 351, 315, 531, 513, 135, dan 153. Letak kartu menentukan nilai bilangan. Tantangan Ayo Berpikir: bila angka boleh berulang ada 900 bilangan tiga angka, dan bila tidak boleh berulang ada 648 bilangan.",
      icon: "🃏",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Bilangan di Sekitar Kita",
      stepDesc:
        "Bilangan tiga angka ada di mana-mana. Jarak rumah ke sekolah 671 meter, panjang tongkat 160 sentimeter, tinggi badan 127 sentimeter, kecepatan kereta 220 kilometer per jam, atau nomor antrean. Membaca dan menulisnya dengan benar membantu kita bercerita tentang ukuran dan banyak benda. Selalu mulai dari kiri: ratusan, puluhan, lalu satuan.",
      icon: "📏",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    { judul: "Satuan, Puluhan, Ratusan", emoji: "🧊", countNum: 3, countWord: "Tiga", suara: "Satu kotak kecil adalah satu satuan. Sepuluh satuan adalah satu puluhan. Sepuluh puluhan adalah satu ratusan, yaitu seratus satuan." },
    { judul: "Seratus Satuan", emoji: "💯", countNum: 2, countWord: "Dua", suara: "Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan. Seratus satuan disebut satu ratusan." },
    { judul: "Papan Tiga Tempat", emoji: "🗂️", countNum: 3, countWord: "Tiga", suara: "Bilangan tiga angka punya tiga tempat. Dari kiri ke kanan: ratusan berwarna hijau, puluhan berwarna biru, dan satuan berwarna merah." },
    { judul: "Kata Ratusan", emoji: "🔢", countNum: 3, countWord: "Tiga", suara: "Satu ratusan dibaca seratus. Dua ratusan dibaca dua ratus, tiga ratusan dibaca tiga ratus, dan seterusnya sampai sembilan ratus." },
    { judul: "Kata Puluhan", emoji: "🔟", countNum: 3, countWord: "Tiga", suara: "Puluhan dibaca dua puluh, tiga puluh, sampai sembilan puluh. Sepuluh, sebelas, dan dua belas sampai sembilan belas punya nama sendiri." },
    { judul: "Membaca 160", emoji: "🚩", countNum: 3, countWord: "Tiga", suara: "Ratusan satu dibaca seratus, puluhan enam dibaca enam puluh, dan satuan nol tidak dibaca. Jadi 160 dibaca seratus enam puluh." },
    { judul: "Angka Nol", emoji: "⭕", countNum: 3, countWord: "Tiga", suara: "Nol berarti tidak ada. Tujuh ratus tiga ditulis 703, sembilan ratus ditulis 900, dan nol tidak dibaca sebagai kata nol." },
    { judul: "Menulis 572", emoji: "✍️", countNum: 3, countWord: "Tiga", suara: "Dengarkan lima ratus tujuh puluh dua. Ratusan lima, puluhan tujuh, satuan dua. Jadi ditulis 572." },
    { judul: "Bilangan di Sekitar Kita", emoji: "📏", countNum: 4, countWord: "Empat", suara: "Jarak 671 meter, panjang tongkat 160 sentimeter, tinggi badan 127 sentimeter, dan kecepatan 220 kilometer per jam adalah bilangan tiga angka." },
    { judul: "Cara Membaca dan Menulis", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, cari tempat tiap angka. Dua, baca ratusan, puluhan, lalu satuan. Tiga, lewati angka nol. Empat, saat menulis, isi tempat yang kosong dengan nol." },
  ],
  games: [
    C("build-with-exchange", "Rakit Kemasan", "hlm. 5–7 (10 satuan menjadi 1 puluhan, 10 puluhan menjadi 1 ratusan)", "Merakit bilangan tiga angka dengan dus, bungkus, dan benda lepas, serta menukar sepuluh kemasan menjadi satu kemasan lebih besar.", "Tiga ronde, tiap ronde dua bilangan yang dibacakan dengan kata. Siswa menekan tambah atau kurang pada dus, bungkus, dan benda lepas. Sepuluh benda otomatis ditukar menjadi satu bungkus, dan sepuluh bungkus menjadi satu dus. Siswa menekan Periksa.", "Rakit bilangannya, lalu periksa.", "📦", 6),
    C("count-packages", "Hitung Kemasan", "hlm. 6–7 (berapa banyak kotak di bawah ini)", "Menghitung dus, bungkus, dan benda lepas lalu memilih lambang bilangannya.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan dus, bungkus, dan benda lepas. Siswa memilih satu dari tiga bilangan. Pengecoh menukar tempat angka.", "Hitung dus, bungkus, dan benda lepas.", "🔢", 6),
    C("sort-packages", "Pilah Kemasan", "hlm. 5–6 (satuan, puluhan, ratusan)", "Memilah kemasan menurut nilainya: benda lepas satuan, bungkus puluhan, dus ratusan.", "Tiga ronde, tiap ronde enam kelompok kemasan dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kelompok ke kotak yang tepat.", "Pilah kemasan ke kotak nilainya.", "🧺", 18),
    C("match-package-number", "Jodohkan Kemasan dan Bilangan", "hlm. 6–7 (banyak ratusan, puluhan, dan satuan pada papan)", "Menjodohkan kumpulan kemasan dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga kumpulan dan tiga bilangan. Siswa mengetuk kumpulan, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci.", "Ketuk kumpulan, lalu ketuk bilangannya.", "🔗", 9),
    C("memory-package-number", "Memori Kemasan dan Bilangan", "hlm. 6–7 (benda dan lambang bilangan yang sama)", "Mencocokkan kumpulan kemasan dengan lambang bilangannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan kemasan dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari kumpulan dan bilangannya.", "🃏", 12),
    C("tap-read-package", "Ketuk Kumpulan yang Dibaca", "hlm. 9–11 (membaca bilangan tiga angka)", "Mendengar kata bilangan lalu menemukan kumpulan benda yang bilangannya sama.", "Tiga ronde, tiap ronde tiga kumpulan yang mirip (misalnya 160, 106, 610) dan dua pertanyaan membaca. Siswa mengetuk kumpulan yang tepat.", "Ketuk kumpulan yang sesuai bacaannya.", "👆", 6),
    C("tap-all-packages", "Ketuk Semua yang Cocok", "hlm. 17 (angka puluhan kurang dari 3, angka satuan lebih dari 7)", "Menemukan semua kumpulan yang memenuhi syarat angka tertentu, termasuk angka nol.", "Tiga ronde, tiap ronde empat kumpulan dan satu perintah, misalnya tanpa bungkus atau tanpa benda lepas. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("read-package-words", "Baca Kumpulan", "hlm. 9–11 (cara membaca bilangan tiga angka)", "Membaca kumpulan benda dengan kata bilangan yang benar, termasuk bilangan dengan angka nol.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, misalnya 703 atau 405. Siswa memilih satu dari tiga cara membaca. Pengecoh membaca nol atau menukar tempat.", "Pilih cara membaca yang benar.", "🗣️", 6),
    C("board-from-package", "Papan dari Kumpulan", "hlm. 6–7 (papan ratusan, puluhan, satuan)", "Mengisi papan ratusan, puluhan, dan satuan dari kumpulan benda.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung dus, bungkus, dan benda lepas, lalu mengatur tiga angka pada papan dan menekan Periksa.", "Isi papan dari kumpulan benda.", "🗂️", 6),
    C("exchange-packages", "Tukar Kemasan", "hlm. 5–6 (10 satuan = 1 puluhan, 100 satuan = 1 ratusan)", "Memahami penukaran sepuluh benda menjadi satu bungkus dan sepuluh bungkus menjadi satu dus.", "Tiga ronde, tiap ronde dua soal. Siswa memilih hasil penukaran atau isi satu kemasan dari tiga pilihan, dengan gambar kemasan sebagai petunjuk.", "Pilih hasil penukarannya.", "🔄", 6),
    P("count-blocks", "Hitung Blok", "hlm. 6–7 (banyak ratusan, puluhan, satuan pada model)", "Membaca model blok menjadi lambang bilangan.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok ratusan, batang puluhan, dan kotak satuan. Siswa memilih satu dari tiga bilangan.", "Hitung blok, lalu pilih bilangannya.", "blocks-count", 3, 2),
    P("board-from-blocks", "Papan dari Blok", "hlm. 15 (isilah titik-titik berdasarkan gambar)", "Mengisi papan ratusan, puluhan, dan satuan dari model blok.", "Tiga ronde, tiap ronde dua soal. Siswa mengatur tiga angka pada papan sesuai blok, lalu menekan Periksa.", "Isi papan dari blok.", "blocks-board", 3, 2),
    P("fill-block-table", "Isi Tabel Blok", "hlm. 23 (lengkapi tabel dengan bilangan yang sesuai nilai tempatnya)", "Mengisi angka ratusan, puluhan, dan satuan pada tabel dari model blok.", "Tiga tabel dengan tiga baris. Tiap baris menampilkan model blok. Siswa mengetuk sel untuk memutar angkanya, lalu menekan Periksa.", "Ketuk sel sampai angkanya tepat.", "blocks-table", 3, 3),
    P("match-block-number", "Jodohkan Blok dan Bilangan", "hlm. 6–7 dan 15 (blok dan lambang bilangan)", "Menjodohkan model blok dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga model dan tiga bilangan. Siswa mengetuk model, lalu mengetuk bilangan yang cocok.", "Ketuk model, lalu ketuk bilangannya.", "blocks-match", 3, 3),
    P("memory-block-word", "Memori Blok dan Kata", "hlm. 10–11 (cara membaca bilangan)", "Mencocokkan model blok dengan kata bilangannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari blok dan katanya.", "blocks-memory", 3, 4),
    P("tap-block-read", "Ketuk Blok yang Dibaca", "hlm. 9–11 (membaca bilangan tiga angka)", "Mendengar kata bilangan lalu mengetuk model blok yang sesuai.", "Tiga ronde, tiap ronde tiga model yang mirip dan dua pertanyaan. Siswa mengetuk model yang bilangannya sama dengan kata yang dibacakan.", "Ketuk blok yang sesuai bacaannya.", "blocks-tap", 3, 2),
    P("number-line-read", "Garis Bilangan: Ketuk Bilangan", "hlm. 10–14 (membaca dan menulis bilangan)", "Menemukan letak sebuah bilangan pada garis bilangan ratusan atau puluhan.", "Tiga ronde, tiap ronde dua soal. Siswa mendengar kata bilangan, lalu mengetuk bilangan itu pada garis bilangan yang langkahnya seratus atau sepuluh.", "Ketuk bilangan yang dibaca pada garis.", "number-line", 3, 2),
    P("tap-all-blocks", "Ketuk Semua Blok", "hlm. 17 (bilangan dengan syarat angka tertentu)", "Menemukan semua model blok yang memenuhi syarat angka tertentu.", "Tiga ronde, tiap ronde empat model dan satu perintah, misalnya angka puluhannya 0. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "blocks-select", 3, 4),
    P("sort-zero-blocks", "Pilah Blok: Ada Nol atau Tidak", "hlm. 13–14 (angka nol pada nilai tempat)", "Memilah model blok menjadi yang memuat angka nol dan yang tidak.", "Tiga ronde, tiap ronde enam model dan dua kotak: ada angka nol dan tanpa angka nol. Siswa menyeret atau mengetuk model ke kotak yang tepat.", "Pilah blok ke kotak yang tepat.", "blocks-sort", 3, 6),
    P("complete-block-sentence", "Lengkapi Kalimat Blok", "hlm. 6–7 (berapa banyak ratusan, puluhan, satuan)", "Melengkapi kalimat tentang banyak ratusan, puluhan, dan satuan pada sebuah model.", "Tiga model, tiap model tiga kalimat. Siswa memilih satu dari tiga angka untuk bagian kosong. Kalimat lengkap dibacakan.", "Pilih angka untuk bagian kosong.", "blocks-sentence", 3, 3),
    A("compose-three-cards", "Susun Tiga Kartu", "hlm. 7–8 dan 12 (kartu bilangan; Ayo Berpikir)", "Menulis lambang bilangan dari kata bilangan dengan menyusun tiga kartu angka.", "Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan, lalu mengetuk kartu angka dan mengetuk tempat ratusan, puluhan, atau satuan. Diperiksa otomatis.", "Susun kartu menjadi bilangan.", "759", "SUSUN KARTU", "kata → angka"),
    A("read-number-choice", "Baca Bilangan", "hlm. 9–11 (cara membaca bilangan tiga angka)", "Memilih cara membaca yang benar untuk sebuah lambang bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa melihat lambang bilangan dan memilih satu dari tiga cara membaca. Pengecoh menukar angka atau membaca nol.", "Pilih cara membaca yang benar.", "671", "BACA", "angka → kata"),
    A("write-on-board", "Tulis Lambang di Papan", "hlm. 13–14 (menulis lambang bilangan)", "Menulis lambang bilangan dari kata bilangan pada papan ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan lalu mengatur tiga angka pada papan dan menekan Periksa.", "Tulis lambang bilangan di papan.", "572", "TULIS", "kata → angka"),
    A("match-number-word", "Jodohkan Angka dan Kata", "hlm. 17 (pasangkan lambang bilangan dan cara membacanya)", "Menjodohkan lambang bilangan dengan cara membacanya.", "Tiga ronde, tiap ronde tiga pasang. Siswa mengetuk lambang bilangan di kiri, lalu mengetuk kata bilangan di kanan.", "Ketuk angka, lalu ketuk katanya.", "903", "JODOHKAN", "angka • kata"),
    A("memory-number-word", "Memori Angka dan Kata", "hlm. 17 (lambang bilangan dan cara membacanya)", "Mencocokkan lambang bilangan dengan kata bilangannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): lambang bilangan dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari angka dan katanya.", "305", "MEMORI", "angka • kata"),
    A("fill-reading-table", "Isi Tabel Cara Membaca", "hlm. 18 (tabel bilangan, ditulis, cara membaca)", "Melengkapi tabel bilangan dan cara membacanya.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu cara membaca yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu bacaan.", "405", "TABEL", "bilangan • dibaca"),
    A("true-false-reading", "Benar atau Salah: Membaca dan Menulis", "hlm. 5–14 (satuan, ratusan, angka nol)", "Menilai pernyataan tentang satuan, ratusan, membaca, dan menulis bilangan tiga angka.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-number", "Detektif Bilangan", "hlm. 12–14 (menyusun bilangan tiga angka dari kartu)", "Menemukan bilangan dari dua petunjuk tentang angka-angkanya.", "Empat soal. Siswa membaca petunjuk seperti ratusanku 6 dan satuanku 1, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok dengan semua petunjuk.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("select-all-numbers", "Ketuk Semua yang Cocok: Angka", "hlm. 17 (angka puluhan kurang dari 3; angka satuan lebih dari 7; angka ratusan kurang dari 5)", "Memilih semua bilangan yang memenuhi syarat tentang angka tertentu.", "Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua bilangan yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "kurang dari • lebih dari"),
    A("build-number-sentence", "Susun Kata Bilangan", "hlm. 13–14 dan 10–11 (membaca dan menulis bilangan)", "Menyusun kata menjadi kalimat tentang membaca dan menulis bilangan.", "Empat kalimat, misalnya seratus enam puluh ditulis 160. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • bilangan"),
  ],
  poin: [
    { ikon: "🧊", nama: "Sepuluh jadi satu", isi: "10 satuan = 1 puluhan, 10 puluhan = 1 ratusan", suara: "Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan." },
    { ikon: "🗂️", nama: "Tiga tempat", isi: "ratusan, puluhan, satuan", suara: "Bilangan tiga angka punya tiga tempat, yaitu ratusan, puluhan, dan satuan, dari kiri ke kanan." },
    { ikon: "🗣️", nama: "Satu ratusan dibaca seratus", isi: "160 dibaca seratus enam puluh", suara: "Satu ratusan dibaca seratus. Bilangan 160 dibaca seratus enam puluh." },
    { ikon: "⭕", nama: "Nol tidak dibaca", isi: "703 dibaca tujuh ratus tiga", suara: "Angka nol berarti tidak ada, jadi nol tidak dibaca. Bilangan 703 dibaca tujuh ratus tiga." },
    { ikon: "✍️", nama: "Nol menjaga tempat", isi: "empat ratus lima ditulis 405", suara: "Saat menulis, nol menjaga tempat yang kosong. Empat ratus lima ditulis 405, bukan 45." },
  ],
  poinSuara:
    "Ingat selalu! Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan. Bilangan tiga angka punya tiga tempat, yaitu ratusan, puluhan, dan satuan. Satu ratusan dibaca seratus. Angka nol tidak dibaca, tetapi saat menulis, nol menjaga tempat yang kosong.",
  cara: {
    suara: "Cara membaca. Lihat angka ratusan, lalu puluhan, lalu satuan. Baca ratusan, baca puluhan, baca satuan, dan lewati angka nol.",
    potongan: [
      { teks: "ratusan", warna: "#BBF7D0" },
      { teks: "puluhan", warna: "#BFDBFE" },
      { teks: "satuan", warna: "#FECACA" },
      { teks: "lewati nol", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: cari lima bilangan tiga angka di sekitarmu, misalnya nomor halaman buku, nomor antrean, atau jarak pada papan petunjuk. Tulis tiap bilangan, tandai angka ratusan, puluhan, dan satuannya dengan tiga warna, lalu bacakan kepada keluargamu.",
  refleksi: [
    "Aku dapat membaca bilangan tiga angka dengan benar.",
    "Aku dapat menulis lambang bilangan dari kata bilangan.",
    "Aku teliti saat ada angka nol.",
    "Aku berani menjelaskan caraku kepada teman.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Nilai tempat bilangan cacah sampai 1.000                      */
/* ====================================================================== */

export const SUB_B31: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Nilai Tempat)",
  fullTitle: "Sub-Bab B: Nilai Tempat Bilangan Cacah sampai 1.000",
  targetDescription:
    "Siswa menentukan tempat dan nilai setiap angka pada bilangan tiga angka (pada 251, angka 2 bernilai 200, angka 5 bernilai 50, angka 1 bernilai 1), menyusun bilangan dari ratusan, puluhan, dan satuan, mengurai bilangan menjadi 200 + 50 + 1, mengisi tabel nilai tempat dengan angka (bukan nilai), serta menjelaskan peran angka nol pada nilai tempat.",
  secondaryBg: "#E0E7FF",
  secondaryBorder: "#4338CA",
  secondaryText: "#312E81",
  silabus: {
    teksSuara: `Kita belajar nilai tempat bilangan cacah sampai seribu. Guru mengukur tinggi badan seorang siswa, seratus dua puluh tujuh sentimeter, lalu kita mencari tempat dan nilai tiap angka. Kita memakai tiga kaleng ratusan, puluhan, dan satuan serta kartu angka untuk menyusun bilangan. Kita belajar menyusun bilangan dan mengurai bilangan, misalnya dua ratus lima puluh satu sama dengan dua ratus tambah lima puluh tambah satu. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa menentukan dan menggunakan nilai tempat bilangan cacah sampai 1.000.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab B hlm. 18–24) dan Buku Panduan Guru Bab 1 Topik B.",
  },
  videos: [
    {
      id: "K3B1B-V1",
      judul: "Tinggi Badan 127",
      subjudul: "Angka punya tempat dan nilai",
      adegan: [
        {
          id: "K3B1B-V1-1",
          judul: "Mengukur tinggi badan",
          ketukan: [
            "Di kelas, guru mengukur tinggi badan seorang siswa dengan alat ukur.",
            "Hasil ukurnya seratus dua puluh tujuh sentimeter, ditulis 127 sentimeter.",
            "Bilangan itu terdiri atas tiga angka, yaitu satu, dua, dan tujuh.",
            "Setiap angka punya tempat dan nilai sendiri. Apakah kalian tahu nilainya?",
          ],
          papan: ["Mengukur tinggi badan", "127 sentimeter", "Tiga angka", "Tempat dan nilai"],
        },
        {
          id: "K3B1B-V1-2",
          judul: "Nilai tempat 251",
          ketukan: [
            "Kita baca 251, yaitu dua ratus lima puluh satu.",
            "Angka 2 menempati tempat ratusan, jadi nilainya 200.",
            "Angka 5 menempati tempat puluhan, jadi nilainya 50.",
            "Angka 1 menempati tempat satuan, jadi nilainya 1.",
          ],
          papan: ["251", "2 di ratusan = 200", "5 di puluhan = 50", "1 di satuan = 1"],
        },
        {
          id: "K3B1B-V1-3",
          judul: "Angka sama, nilai beda",
          ketukan: [
            "Perhatikan angka 6 pada tiga bilangan, yaitu 600, 60, dan 6.",
            "Pada 600, angka 6 ada di tempat ratusan dan bernilai 600.",
            "Pada 60, angka 6 ada di tempat puluhan dan bernilai 60.",
            "Pada 6, angka 6 ada di tempat satuan dan bernilai 6. Tempat sebuah angka menentukan nilainya.",
          ],
          papan: ["Angka 6 di tiga tempat", "Ratusan: 600", "Puluhan: 60", "Satuan: 6"],
        },
      ],
    },
    {
      id: "K3B1B-V2",
      judul: "Tiga Kaleng",
      subjudul: "Aktivitas menentukan nilai tempat",
      adegan: [
        {
          id: "K3B1B-V2-1",
          judul: "Menyiapkan tiga kaleng",
          ketukan: [
            "Kita menyiapkan tiga kaleng bekas dan memberi label ratusan, puluhan, dan satuan.",
            "Letakkan kaleng ratusan, puluhan, dan satuan berurutan dari kiri ke kanan.",
            "Kita juga membuat sepuluh kartu angka dari nol sampai sembilan.",
            "Setiap kartu ditulis dengan warna spidol yang berbeda.",
          ],
          papan: ["Tiga kaleng", "Kiri ke kanan", "Kartu 0 sampai 9", "Warna berbeda"],
        },
        {
          id: "K3B1B-V2-2",
          judul: "Mengambil kartu",
          ketukan: [
            "Masukkan kartu secara acak ke dalam tiga kaleng, lalu ambil satu kartu dari tiap kaleng.",
            "Misalnya dari kaleng ratusan terambil kartu 2.",
            "Dari kaleng puluhan terambil kartu 1, dan dari kaleng satuan terambil kartu 9.",
            "Kartu disusun menjadi bilangan tiga angka, yaitu dua ratus sembilan belas, ditulis 219.",
          ],
          papan: ["Ambil satu kartu", "Ratusan: 2", "Puluhan: 1, satuan: 9", "Bilangan 219"],
        },
        {
          id: "K3B1B-V2-3",
          judul: "Nilai tiap kartu",
          ketukan: [
            "Kartu 2 di kaleng ratusan bernilai dua ratus.",
            "Kartu 1 di kaleng puluhan bernilai sepuluh.",
            "Kartu 9 di kaleng satuan bernilai sembilan.",
            "Dua ratus tambah sepuluh tambah sembilan sama dengan 219.",
          ],
          papan: ["2 ratusan = 200", "1 puluhan = 10", "9 satuan = 9", "200 + 10 + 9 = 219"],
        },
      ],
    },
    {
      id: "K3B1B-V3",
      judul: "Menyusun dan Mengurai",
      subjudul: "Dua cara menulis nilai tempat",
      adegan: [
        {
          id: "K3B1B-V3-1",
          judul: "Menyusun bilangan",
          ketukan: [
            "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan.",
            "Dua ratusan, lima puluhan, dan satu satuan menjadi dua ratus lima puluh satu.",
            "Ditulis 2 ratusan tambah 5 puluhan tambah 1 satuan sama dengan 251.",
            "Kita juga bisa memakai nilai, yaitu 200 tambah 50 tambah 1 sama dengan 251.",
          ],
          papan: ["Menyusun bilangan", "2, 5, dan 1", "2 ratusan + 5 puluhan + 1 satuan", "200 + 50 + 1 = 251"],
        },
        {
          id: "K3B1B-V3-2",
          judul: "Mengurai bilangan",
          ketukan: [
            "Mengurai bilangan adalah menguraikan bilangan menjadi ratusan, puluhan, dan satuan.",
            "Bilangan 602 diurai menjadi 6 ratusan, 0 puluhan, dan 2 satuan.",
            "Dalam bentuk nilai, 602 sama dengan 600 tambah 0 tambah 2.",
            "Menyusun dan mengurai adalah dua arah yang saling membalik.",
          ],
          papan: ["Mengurai bilangan", "602", "600 + 0 + 2", "Dua arah"],
        },
        {
          id: "K3B1B-V3-3",
          judul: "Isi tabel dengan teliti",
          ketukan: [
            "Hati-hati saat mengisi tabel nilai tempat.",
            "Untuk 987, tabel diisi angka: 9 di ratusan, 8 di puluhan, dan 7 di satuan.",
            "Jangan menulis 900, 80, dan 7 di dalam tabel. Itu adalah nilainya, bukan angkanya.",
            "Nilai dipakai saat mengurai, yaitu 900 tambah 80 tambah 7.",
          ],
          papan: ["Isi tabel dengan teliti", "987: 9, 8, 7", "Angka bukan nilai", "900 + 80 + 7"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Angka Punya Tempat",
      stepDesc:
        "Bilangan tiga angka mempunyai tiga tempat: ratusan, puluhan, dan satuan. Pada tinggi badan 127 sentimeter, angka 1 ada di ratusan, angka 2 di puluhan, dan angka 7 di satuan. Kita menyebut tempat itu nilai tempat. Tempat sebuah angka menentukan seberapa besar angka itu bernilai.",
      icon: "📍",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Tempat Menentukan Nilai",
      stepDesc:
        "Angka yang sama dapat bernilai berbeda. Angka 6 pada 600 bernilai 600, pada 60 bernilai 60, dan pada 6 bernilai 6. Nilai angka di ratusan adalah angka itu dikali seratus, di puluhan dikali sepuluh, dan di satuan angka itu sendiri. Karena itu 123 dan 321 adalah bilangan yang berbeda walaupun angkanya sama.",
      icon: "⚖️",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Nilai Tiap Tempat",
      stepDesc:
        "Pada 251, angka 2 di ratusan bernilai 200, angka 5 di puluhan bernilai 50, dan angka 1 di satuan bernilai 1. Nilai tiap tempat dipakai untuk melihat bilangan sebagai jumlah: 200 tambah 50 tambah 1 sama dengan 251. Menambahkan ketiga nilai itu akan mengembalikan bilangan semula.",
      icon: "🔢",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Tiga Kaleng",
      stepDesc:
        "Aktivitas tiga kaleng menunjukkan tempat dengan benda nyata. Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Satu kartu angka diambil dari tiap kaleng, lalu disusun menjadi bilangan tiga angka. Kartu dari kaleng ratusan bernilai ratusan, kartu dari kaleng puluhan bernilai puluhan, dan kartu dari kaleng satuan bernilai satuan.",
      icon: "🥫",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Menyusun Bilangan",
      stepDesc:
        "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan menjadi satu bilangan. 2 ratusan ditambah 5 puluhan ditambah 1 satuan sama dengan 251. Dalam bentuk nilai, 200 tambah 50 tambah 1 sama dengan 251. Hasil menyusun selalu bilangan tiga angka bila ratusannya tidak nol.",
      icon: "🧩",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Mengurai Bilangan",
      stepDesc:
        "Mengurai bilangan berarti menguraikan bilangan menjadi ratusan, puluhan, dan satuan. 602 sama dengan 6 ratusan, 0 puluhan, dan 2 satuan, atau 600 tambah 0 tambah 2. Menyusun dan mengurai saling membalik: dari bagian ke bilangan, dan dari bilangan ke bagian-bagiannya.",
      icon: "🔬",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Angka Nol dalam Nilai Tempat",
      stepDesc:
        "Angka nol menandakan tidak ada ratusan, puluhan, atau satuan pada tempat itu. Pada 805 puluhannya nol, nilainya nol, sehingga 805 sama dengan 800 tambah 0 tambah 5. Nol penting karena menjaga angka lain tetap berada di tempatnya: tanpa nol, 805 berubah menjadi 85.",
      icon: "⭕",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Teliti Memakai Tabel",
      stepDesc:
        "Tabel nilai tempat diisi dengan angka tiap tempat, bukan dengan nilainya. Untuk 987, isilah 9, 8, dan 7. Nilainya, yaitu 900, 80, dan 7, dipakai saat mengurai. Mencampur angka dengan nilai adalah kesalahan yang sering terjadi, jadi periksa lagi sebelum menjawab.",
      icon: "📊",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    { judul: "Angka dan Tempatnya", emoji: "📍", countNum: 3, countWord: "Tiga", suara: "Setiap angka pada bilangan tiga angka menempati satu tempat: ratusan, puluhan, atau satuan." },
    { judul: "Tempat Menentukan Nilai", emoji: "⚖️", countNum: 3, countWord: "Tiga", suara: "Angka enam pada enam ratus bernilai enam ratus, pada enam puluh bernilai enam puluh, dan pada enam bernilai enam." },
    { judul: "Nilai Dua Ratus Lima Puluh Satu", emoji: "🔢", countNum: 3, countWord: "Tiga", suara: "Pada 251, angka dua di ratusan bernilai dua ratus, angka lima di puluhan bernilai lima puluh, dan angka satu di satuan bernilai satu." },
    { judul: "Tiga Kaleng", emoji: "🥫", countNum: 3, countWord: "Tiga", suara: "Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Satu kartu angka diambil dari tiap kaleng." },
    { judul: "Menyusun Bilangan", emoji: "🧩", countNum: 2, countWord: "Dua", suara: "Menyusun bilangan adalah menjumlahkan ratusan, puluhan, dan satuan. Dua ratusan, lima puluhan, dan satu satuan menjadi 251." },
    { judul: "Mengurai Bilangan", emoji: "🔬", countNum: 2, countWord: "Dua", suara: "Mengurai bilangan adalah menguraikan menjadi ratusan, puluhan, dan satuan. 602 sama dengan 600 tambah 0 tambah 2." },
    { judul: "Angka Nol", emoji: "⭕", countNum: 3, countWord: "Tiga", suara: "Nol berarti tidak ada. Pada 805, puluhannya nol dan bernilai nol. Nol menjaga angka lain tetap di tempatnya." },
    { judul: "Tabel Nilai Tempat", emoji: "📊", countNum: 3, countWord: "Tiga", suara: "Tabel nilai tempat diisi dengan angka, bukan nilai. Untuk 987, isilah sembilan, delapan, dan tujuh." },
    { judul: "Angka 8 di Mana?", emoji: "🔍", countNum: 4, countWord: "Empat", suara: "Pada 981 angka delapan menempati puluhan. Pada 845 ratusan. Pada 108 satuan. Pada 800 ratusan." },
    { judul: "Cara Menentukan Nilai Tempat", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, tulis bilangan pada papan tiga tempat. Dua, lihat tempat tiap angka. Tiga, kalikan angka dengan seratus, sepuluh, atau satu. Empat, jumlahkan bila ingin mengecek." },
  ],
  games: [
    C("three-cans-cards", "Tiga Kaleng", "hlm. 19–20 (Aktivitas 2: Menentukan Nilai Tempat)", "Menyusun tiga kartu angka pada kaleng ratusan, puluhan, dan satuan menjadi bilangan yang diminta.", "Tiga ronde, tiap ronde dua soal. Siswa mengetuk kartu angka, lalu mengetuk kaleng ratusan, puluhan, atau satuan. Diperiksa otomatis saat tiga kaleng terisi.", "Susun kartu pada tiga kaleng.", "🥫", 6),
    C("value-of-package", "Nilai Satu Kemasan", "hlm. 21 (angka 2 menempati ratusan yang bernilai 200)", "Menentukan nilai sebuah angka dari banyak benda pada kemasan tempat angka itu berada.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan dus, bungkus, dan benda lepas. Siswa memilih berapa banyak benda yang ada pada satu jenis kemasan.", "Pilih nilai kemasannya.", "💰", 6),
    C("match-package-value", "Jodohkan Kemasan dan Nilai", "hlm. 21 (nilai ratusan, puluhan, satuan)", "Menjodohkan kelompok kemasan dengan nilainya dalam benda.", "Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga nilai, misalnya 3 dus dengan 300. Siswa mengetuk kelompok, lalu mengetuk nilai yang cocok.", "Ketuk kemasan, lalu ketuk nilainya.", "🔗", 9),
    C("package-into-can", "Masukkan Kemasan ke Kaleng", "hlm. 19 (kaleng ratusan, puluhan, dan satuan)", "Memasukkan kelompok kemasan ke kaleng ratusan, puluhan, atau satuan yang sesuai.", "Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga kaleng. Siswa mengetuk kelompok, lalu mengetuk kaleng yang tepat.", "Ketuk kemasan, lalu ketuk kalengnya.", "🥫", 9),
    C("memory-package-value", "Memori Kemasan dan Nilai", "hlm. 21 (nilai ratusan, puluhan, satuan)", "Mencocokkan kelompok kemasan dengan nilainya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok kemasan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari kemasan dan nilainya.", "🃏", 12),
    C("build-from-value", "Rakit Nilai", "hlm. 21 (menyusun bilangan: 2 ratusan + 5 puluhan + 1 satuan)", "Merakit bilangan dengan kemasan dari kalimat penyusunan.", "Tiga ronde, tiap ronde dua soal yang dibacakan sebagai penyusunan, misalnya 3 ratusan ditambah 4 puluhan ditambah 7 satuan. Siswa merakit dengan dus, bungkus, dan benda lepas.", "Rakit sesuai penyusunannya.", "🧩", 6),
    C("tap-digit-package", "Ketuk Kumpulan dengan Angka Tertentu", "hlm. 21–23 (tempat dan nilai angka)", "Menemukan kumpulan yang punya angka tertentu pada ratusan atau puluhan.", "Tiga ronde, tiap ronde tiga kumpulan dan dua pertanyaan, misalnya angka puluhannya 6. Siswa mengetuk kumpulan yang tepat.", "Ketuk kumpulan yang cocok.", "👆", 6),
    C("place-of-digit", "Tempat Angka dalam Kumpulan", "hlm. 22 (nilai tempat angka 8 pada 981, 845, 108, 800, 618)", "Menentukan tempat angka 8 pada sebuah kumpulan benda.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, dan siswa memilih apakah angka 8 ada di ratusan, puluhan, atau satuan.", "Pilih tempat angka delapan.", "🔍", 6),
    C("tap-all-value", "Ketuk Semua Kumpulan yang Cocok", "hlm. 21–23 (nilai tempat tiap angka)", "Menemukan semua kumpulan yang punya angka tertentu atau angka nol.", "Tiga ronde, tiap ronde empat kumpulan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("order-package-value", "Urutkan Nilai Kemasan", "hlm. 21 (nilai tiap tempat berbeda)", "Mengurutkan kelompok kemasan menurut nilainya.", "Tiga ronde, tiap ronde tiga kelompok kemasan bertanda huruf. Siswa mengetuk kelompok satu per satu dari yang paling kecil atau paling besar nilainya. Letak jawaban berpindah.", "Ketuk kemasan menurut nilainya.", "📶", 9),
    P("block-value-table", "Isi Tabel Nilai", "hlm. 21–23 (nilai tempat tiap angka)", "Mengisi nilai ratusan, puluhan, dan satuan pada tabel dari bilangan.", "Tiga tabel dengan tiga baris. Siswa mengetuk sel untuk memutar nilainya (200, 50, 1), lalu menekan Periksa.", "Ketuk sel sampai nilainya tepat.", "value-table", 3, 3),
    P("block-value-choice", "Nilai Angka pada Blok", "hlm. 21 (angka 2 bernilai 200, angka 5 bernilai 50)", "Menentukan nilai sebuah angka dari model blok.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok, dan siswa memilih nilai angka pada tempat yang ditanya.", "Pilih nilai angkanya.", "value-choice", 3, 2),
    P("compose-sentence", "Susun Bilangan", "hlm. 21 (2 ratusan + 5 puluhan + 1 satuan = 251)", "Menyusun bilangan dari kalimat ratusan, puluhan, dan satuan.", "Tiga model, tiap model tiga kalimat penyusunan. Siswa memilih satu dari tiga angka untuk bagian kosong.", "Pilih angka untuk bagian kosong.", "compose-sentence", 3, 3),
    P("decompose-sentence", "Urai Bilangan", "hlm. 21 (602 = 600 + 00 + 2)", "Mengurai bilangan menjadi bagian-bagian nilai.", "Tiga bilangan, tiap bilangan tiga kalimat uraian, misalnya 372 = 300 + ... + 2. Siswa memilih satu dari tiga angka.", "Pilih nilai yang hilang.", "decompose-sentence", 3, 3),
    P("match-block-decomposition", "Jodohkan Blok dan Uraian", "hlm. 21 (menyusun dan mengurai)", "Menjodohkan model blok dengan uraiannya.", "Tiga ronde, tiap ronde tiga model dan tiga uraian, misalnya 300 + 40 + 7. Siswa mengetuk model, lalu mengetuk uraian yang cocok.", "Ketuk model, lalu ketuk uraiannya.", "decompose-match", 3, 3),
    P("memory-block-decomposition", "Memori Blok dan Uraian", "hlm. 21 (menyusun dan mengurai)", "Mencocokkan model blok dengan uraiannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan uraian. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari blok dan uraiannya.", "decompose-memory", 3, 4),
    P("board-from-decomposition", "Papan dari Uraian", "hlm. 21 (menyusun bilangan)", "Menulis bilangan pada papan dari uraiannya.", "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian seperti 600 + 20 + 1 lalu mengatur tiga angka pada papan dan menekan Periksa.", "Isi papan dari uraian.", "decompose-board", 3, 2),
    P("number-line-value", "Garis Bilangan: Nilai Angka", "hlm. 21–23 (nilai tempat)", "Menemukan nilai sebuah angka pada garis bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan seperti 463 dan angka yang ditanya, lalu mengetuk nilainya pada garis bilangan puluhan atau ratusan.", "Ketuk nilai angka pada garis.", "number-line", 3, 2),
    P("sort-value-cards", "Pilah Nilai", "hlm. 21 (nilai ratusan, puluhan, satuan)", "Memilah kartu nilai menjadi nilai ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde enam kartu nilai (misalnya 300, 60, 5) dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kartu ke kotak yang tepat.", "Pilah nilai ke kotak yang tepat.", "value-sort", 3, 6),
    P("tap-all-value-blocks", "Ketuk Semua Blok dengan Nilai", "hlm. 21–23 (nilai tempat)", "Menemukan semua model blok yang punya nilai tertentu pada sebuah tempat.", "Tiga ronde, tiap ronde empat model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "value-select", 3, 4),
    A("compose-from-decomposition", "Susun Tiga Kartu dari Uraian", "hlm. 19–21 (menyusun bilangan dari angka tiap tempat)", "Menyusun tiga kartu angka menjadi bilangan dari ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan yang diminta lalu mengetuk kartu angka dan tempat. Diperiksa otomatis.", "Susun kartu menjadi bilangan.", "723", "SUSUN KARTU", "ratusan • puluhan • satuan"),
    A("place-of-digit-choice", "Tempat Angka 8", "hlm. 22 (tentukan nilai tempat dari angka 8)", "Menentukan tempat angka 8 pada bilangan 981, 845, 108, 800, dan 618.", "Tiga ronde, tiap ronde dua soal. Siswa memilih apakah angka 8 menempati ratusan, puluhan, atau satuan.", "Pilih tempat angka delapan.", "981", "TEMPAT ANGKA", "ratusan • puluhan • satuan"),
    A("digit-value-choice", "Nilai Angka", "hlm. 21 (angka 5 menempati puluhan yang bernilai 50)", "Menentukan nilai sebuah angka pada bilangan tiga angka.", "Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga nilai, misalnya nilai angka 5 pada 251.", "Pilih nilai angkanya.", "50", "NILAI ANGKA", "angka × nilai tempat"),
    A("decompose-words", "Urai dengan Kata", "hlm. 23–24 (isilah titik-titik: ratusan + puluhan + satuan)", "Melengkapi uraian bilangan dalam bentuk ratusan, puluhan, dan satuan.", "Tiga bilangan, tiap bilangan tiga kalimat, misalnya 634 = 6 ratusan + ... puluhan + 4 satuan. Siswa memilih satu dari tiga angka.", "Pilih angka yang hilang.", "6+3+4", "URAI", "ratusan + puluhan + satuan"),
    A("board-from-sum", "Tulis Bilangan dari Uraian", "hlm. 23–24 (menyusun bilangan)", "Menulis bilangan dari uraian 600 + 80 + 4 pada papan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian lalu mengatur tiga angka pada papan dan menekan Periksa.", "Tulis bilangan dari uraian.", "684", "SUSUN", "600 + 80 + 4"),
    A("fill-decomposition-table", "Isi Tabel Uraian", "hlm. 23–24 (lengkapi tabel; 555 = ... ratusan + ... puluhan + ... satuan)", "Melengkapi tabel bilangan dan uraiannya.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu uraian yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu uraian.", "251", "TABEL", "bilangan • uraian"),
    A("true-false-value", "Benar atau Salah: Nilai Tempat", "hlm. 21–24 (angka dan nilai; kesalahan mengisi tabel)", "Menilai pernyataan tentang nilai tempat, menyusun, dan mengurai bilangan.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-place-value", "Detektif Nilai Tempat", "hlm. 21 (nilai tiap angka)", "Menemukan bilangan dari dua petunjuk tentang nilai angkanya.", "Empat soal. Siswa membaca petunjuk seperti angka 5 bernilai 50 dan ratusanku 3, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-value", "Peta Konsep Nilai Tempat", "hlm. 2 (peta konsep: nilai tempat bilangan)", "Melengkapi peta konsep nilai tempat dan cara mengurai bilangan.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "tempat • nilai • uraian"),
    A("build-value-sentence", "Susun Kata Nilai Tempat", "hlm. 21 (angka 2 menempati nilai tempat ratusan yang bernilai 200)", "Menyusun kata menjadi kalimat tentang nilai tempat.", "Empat kalimat, misalnya angka 2 menempati ratusan bernilai 200. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • nilai"),
  ],
  poin: [
    { ikon: "📍", nama: "Angka punya tempat", isi: "ratusan, puluhan, satuan", suara: "Setiap angka pada bilangan tiga angka menempati satu tempat, yaitu ratusan, puluhan, atau satuan." },
    { ikon: "⚖️", nama: "Tempat menentukan nilai", isi: "pada 251, angka 5 bernilai 50", suara: "Tempat sebuah angka menentukan nilainya. Pada 251, angka 5 di puluhan bernilai 50." },
    { ikon: "🧩", nama: "Menyusun bilangan", isi: "200 + 50 + 1 = 251", suara: "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan, misalnya 200 tambah 50 tambah 1 sama dengan 251." },
    { ikon: "🔬", nama: "Mengurai bilangan", isi: "602 = 600 + 0 + 2", suara: "Mengurai bilangan berarti menguraikannya menjadi ratusan, puluhan, dan satuan, misalnya 602 sama dengan 600 tambah 0 tambah 2." },
    { ikon: "📊", nama: "Tabel diisi dengan angka", isi: "987: 9, 8, 7", suara: "Tabel nilai tempat diisi dengan angka, bukan dengan nilainya. Untuk 987, isilah 9, 8, dan 7." },
  ],
  poinSuara:
    "Ingat selalu! Setiap angka pada bilangan tiga angka menempati satu tempat: ratusan, puluhan, atau satuan. Tempat menentukan nilai, jadi angka lima di puluhan bernilai lima puluh. Menyusun bilangan adalah menjumlahkan, dan mengurai bilangan adalah menguraikan. Tabel nilai tempat diisi dengan angka, bukan nilai.",
  cara: {
    suara: "Cara menyebutkan nilai. Lihat tempat angkanya. Kalikan angka dengan seratus, sepuluh, atau satu. Lalu sebutkan nilainya.",
    potongan: [
      { teks: "lihat tempat", warna: "#BAE6FD" },
      { teks: "kalikan", warna: "#FDE68A" },
      { teks: "sebut nilai", warna: "#7FCB96" },
      { teks: "cek jumlah", warna: "#FECACA" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: siapkan tiga gelas bekas bertanda ratusan, puluhan, dan satuan, serta sepuluh kartu angka. Ambil satu kartu dari tiap gelas, susun menjadi bilangan tiga angka, lalu sebutkan nilai tiap angkanya. Tulis juga uraiannya, misalnya 200 + 50 + 1.",
  refleksi: [
    "Aku dapat menyebut tempat dan nilai tiap angka.",
    "Aku dapat menyusun dan mengurai bilangan.",
    "Aku mengisi tabel dengan angka, bukan nilai.",
    "Aku berani menjelaskan jawabanku.",
  ],
};

export const SUB_BAB_K3B1: SubBabNaskah[] = [SUB_A31, SUB_B31];

/** Semua adegan video, urut sub-bab, video, adegan. Dipakai uji. */
export const semuaAdeganK3B1 = SUB_BAB_K3B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
