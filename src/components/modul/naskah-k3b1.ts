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

/* ====================================================================== */
/* SUB-BAB C. Membandingkan dan mengurutkan bilangan cacah sampai 1.000     */
/* ====================================================================== */

const ALUR_C = ["Membandingkan dua bilangan", "Mulai dari ratusan", "Ratusan sama, lihat puluhan", "Puluhan sama, lihat satuan", "Tanda lebih, kurang, sama", "Membandingkan tiga bilangan", "Mengurutkan bilangan", "Perbandingan di sekitar kita", "Siap membandingkan dan mengurutkan"];

export const SUB_C31: SubBabNaskah = {
  id: "C",
  codeTitle: "Sub-Bab C (Membandingkan dan Mengurutkan)",
  fullTitle: "Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000",
  targetDescription:
    "Siswa membandingkan dua bilangan cacah tiga angka dengan nilai tempat (mulai dari ratusan, lalu puluhan, lalu satuan), menulis hasilnya dengan tanda <, >, atau =, membandingkan tiga bilangan, serta mengurutkan beberapa bilangan dari terkecil ke terbesar dan dari terbesar ke terkecil.",
  secondaryBg: "#FEF3C7",
  secondaryBorder: "#D97706",
  secondaryText: "#78350F",
  silabus: {
    teksSuara: `Kita belajar membandingkan dan mengurutkan bilangan cacah sampai seribu. Alen dan Galih berjalan ke sekolah dengan jarak yang berbeda, Alfa, Galih, dan Andi menghitung kelereng mereka, dan kita menyusun bilangan dari yang terkecil sampai yang terbesar. Kita memakai nilai tempat: mulai dari ratusan, lalu puluhan, lalu satuan. Kita menulis hasilnya dengan tanda kurang dari, lebih dari, dan sama dengan. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membandingkan dua bilangan dengan nilai tempat serta mengurutkan beberapa bilangan.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab C hlm. 24–34) dan Buku Panduan Guru Bab 1 Topik C.",
  },
  videos: [
    {
      id: "K3B1C-V1",
      judul: "Jarak ke Sekolah",
      subjudul: "Membandingkan dua bilangan",
      adegan: [
        {
          id: "K3B1C-V1-1",
          judul: "Rumah siapa lebih jauh",
          ketukan: [
            "Jarak rumah Alen ke sekolah adalah 339 meter.",
            "Jarak rumah Galih ke sekolah adalah 421 meter.",
            "Kita ingin tahu, rumah siapa yang lebih jauh dari sekolah.",
            "Untuk menjawabnya, kita membandingkan dua bilangan itu.",
          ],
          papan: ["Alen: 339 meter", "Galih: 421 meter", "Siapa lebih jauh?", "Bandingkan bilangan"],
        },
        {
          id: "K3B1C-V1-2",
          judul: "Bandingkan ratusan",
          ketukan: [
            "Kita taruh 339 dan 421 pada papan nilai tempat.",
            "Mulai dari tempat ratusan. Bilangan 339 punya 3 ratusan, bilangan 421 punya 4 ratusan.",
            "Tiga ratus kurang dari empat ratus, jadi 339 kurang dari 421.",
            "Ditulis 339 < 421. Rumah Alen lebih dekat dengan sekolah.",
          ],
          papan: ["Dua papan nilai tempat", "3 ratusan, 4 ratusan", "300 kurang dari 400", "339 < 421"],
        },
        {
          id: "K3B1C-V1-3",
          judul: "Lebih dari",
          ketukan: [
            "Sekarang bandingkan 583 dan 529. Ratusannya sama, yaitu 5.",
            "Karena ratusan sama, kita lihat tempat puluhan.",
            "Bilangan 583 punya 8 puluhan, bilangan 529 punya 2 puluhan.",
            "Delapan puluh lebih dari dua puluh, jadi 583 > 529.",
          ],
          papan: ["583 dan 529", "Ratusan sama", "8 puluhan, 2 puluhan", "583 > 529"],
        },
      ],
    },
    {
      id: "K3B1C-V2",
      judul: "Sama dan Hampir Sama",
      subjudul: "Sampai tempat satuan",
      adegan: [
        {
          id: "K3B1C-V2-1",
          judul: "Satuan yang menentukan",
          ketukan: [
            "Bandingkan 769 dan 761.",
            "Ratusan sama, yaitu 7. Puluhan juga sama, yaitu 6.",
            "Jadi kita lihat satuannya. Sembilan lebih dari satu.",
            "Maka 769 lebih dari 761, ditulis 769 > 761.",
          ],
          papan: ["769 dan 761", "Ratusan dan puluhan sama", "Lihat satuan", "769 > 761"],
        },
        {
          id: "K3B1C-V2-2",
          judul: "Bilangan yang sama",
          ketukan: [
            "Perhatikan 804 dan 804.",
            "Ratusan sama, yaitu 8. Puluhan sama, yaitu 0.",
            "Satuan juga sama, yaitu 4.",
            "Semua tempat sama, jadi 804 sama dengan 804, ditulis 804 = 804.",
          ],
          papan: ["804 dan 804", "Ratusan 8, puluhan 0", "Satuan 4", "804 = 804"],
        },
        {
          id: "K3B1C-V2-3",
          judul: "Tiga langkah membandingkan",
          ketukan: [
            "Ada tiga langkah membandingkan dua bilangan tiga angka.",
            "Langkah pertama, bandingkan ratusan. Bila berbeda, selesai.",
            "Langkah kedua, bila ratusan sama, bandingkan puluhan.",
            "Langkah ketiga, bila puluhan juga sama, bandingkan satuan.",
          ],
          papan: ["Tiga langkah", "1. Ratusan", "2. Puluhan", "3. Satuan"],
        },
      ],
    },
    {
      id: "K3B1C-V3",
      judul: "Mengurutkan Bilangan",
      subjudul: "Dari terkecil sampai terbesar",
      adegan: [
        {
          id: "K3B1C-V3-1",
          judul: "Kelereng tiga sahabat",
          ketukan: [
            "Alfa memiliki 138 kelereng, Galih memiliki 103 kelereng, dan Andi memiliki 183 kelereng.",
            "Ketiganya punya satu ratusan. Kita lihat puluhannya: 3, 0, dan 8.",
            "Galih paling sedikit, lalu Alfa, lalu Andi.",
            "Urutan dari yang paling sedikit adalah 103, 138, 183.",
          ],
          papan: ["138, 103, 183", "Ratusan sama", "Galih, Alfa, Andi", "103, 138, 183"],
        },
        {
          id: "K3B1C-V3-2",
          judul: "Tiga bilangan",
          ketukan: [
            "Bagaimana mengurutkan 720, 639, dan 709 dari yang terkecil?",
            "Bilangan 639 punya 6 ratusan, paling sedikit. Jadi 639 paling kecil.",
            "Bilangan 709 dan 720 sama-sama 7 ratusan. Puluhan 0 kurang dari 2.",
            "Jadi 709 kurang dari 720. Urutannya 639, 709, 720.",
          ],
          papan: ["720, 639, 709", "639 paling kecil", "709 < 720", "639, 709, 720"],
        },
        {
          id: "K3B1C-V3-3",
          judul: "Dua arah urutan",
          ketukan: [
            "Urutan dari terkecil ke terbesar kita sebut urutan naik.",
            "Contohnya 639, 709, 720.",
            "Urutan dari terbesar ke terkecil kita sebut urutan turun.",
            "Contohnya 720, 709, 639. Urutan turun adalah kebalikan urutan naik.",
          ],
          papan: ["Dua arah urutan", "Naik: 639, 709, 720", "Turun: dari terbesar", "720, 709, 639"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Membandingkan Dua Bilangan",
      stepDesc:
        "Membandingkan berarti mencari tahu bilangan mana yang lebih besar, lebih kecil, atau apakah keduanya sama. Jarak rumah Alen ke sekolah 339 meter dan jarak rumah Galih 421 meter. Kita ingin tahu rumah siapa yang lebih jauh. Untuk bilangan tiga angka, kita tidak menghitung satu per satu, tetapi memakai nilai tempat.",
      icon: "⚖️",
      flowFrom: ALUR_C[0],
      flowTo: ALUR_C[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Mulai dari Ratusan",
      stepDesc:
        "Tempat yang paling besar nilainya adalah ratusan, jadi kita mulai dari sana. Bilangan 339 punya 3 ratusan dan bilangan 421 punya 4 ratusan. Tiga ratus kurang dari empat ratus, jadi 339 kurang dari 421. Bila ratusannya berbeda, perbandingan sudah selesai dan kita tidak perlu melihat tempat lain.",
      icon: "💯",
      flowFrom: ALUR_C[1],
      flowTo: ALUR_C[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Ratusan Sama, Lihat Puluhan",
      stepDesc:
        "Bila ratusannya sama, kita pindah ke tempat puluhan. Bilangan 583 dan 529 sama-sama punya 5 ratusan. Puluhan 583 adalah 8 dan puluhan 529 adalah 2. Delapan puluh lebih dari dua puluh, jadi 583 lebih dari 529, ditulis 583 > 529.",
      icon: "🔟",
      flowFrom: ALUR_C[2],
      flowTo: ALUR_C[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Puluhan Sama, Lihat Satuan",
      stepDesc:
        "Bila ratusan dan puluhan sama, satuanlah yang menentukan. Bilangan 769 dan 761 sama pada ratusan dan puluhan, lalu satuannya 9 dan 1. Sembilan lebih dari satu, jadi 769 lebih dari 761. Bila semua tempat sama, misalnya 804 dan 804, kedua bilangan itu sama besar, ditulis 804 = 804.",
      icon: "1️⃣",
      flowFrom: ALUR_C[3],
      flowTo: ALUR_C[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Tanda Lebih, Kurang, dan Sama",
      stepDesc:
        "Hasil membandingkan ditulis dengan tiga tanda. Tanda < dibaca kurang dari, tanda > dibaca lebih dari, dan tanda = dibaca sama dengan. Tanda < dan > seperti mulut buaya yang terbuka ke arah bilangan yang lebih besar. Jadi 339 < 421 dan 583 > 529. Tanda yang dibalik akan mengubah artinya, jadi baca pelan-pelan.",
      icon: "🐊",
      flowFrom: ALUR_C[4],
      flowTo: ALUR_C[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Membandingkan Tiga Bilangan",
      stepDesc:
        "Membandingkan tiga bilangan memakai cara yang sama seperti dua bilangan. Bilangan 720, 639, dan 709: bandingkan ratusan dulu. Bilangan 639 punya 6 ratusan, kurang dari 720 dan 709 yang punya 7 ratusan. Lalu 709 dan 720 dibandingkan pada puluhan: 0 puluhan kurang dari 2 puluhan, jadi 709 < 720.",
      icon: "🔺",
      flowFrom: ALUR_C[5],
      flowTo: ALUR_C[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Mengurutkan Bilangan",
      stepDesc:
        "Mengurutkan bilangan berarti menyusunnya dari yang terkecil ke terbesar, atau dari yang terbesar ke terkecil. Urutan 639, 709, 720 adalah dari terkecil ke terbesar, dan kebalikannya 720, 709, 639 adalah dari terbesar ke terkecil. Cara mudahnya: cari yang paling kecil dulu, lalu cari yang paling kecil dari sisanya, sampai semua bilangan terpakai.",
      icon: "📶",
      flowFrom: ALUR_C[6],
      flowTo: ALUR_C[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Perbandingan di Sekitar Kita",
      stepDesc:
        "Kita membandingkan bilangan setiap hari: jarak rumah ke sekolah, banyak kelereng, tinggi badan, atau nomor antrean. Alfa 138 kelereng, Galih 103, dan Andi 183, sehingga Andi paling banyak dan Galih paling sedikit. Meutia 498 meter, Alfa 490 meter, dan Galih 508 meter, sehingga rumah Alfa paling dekat dan rumah Galih paling jauh.",
      icon: "🏫",
      flowFrom: ALUR_C[7],
      flowTo: ALUR_C[8],
    },
  ],
  infografis: [
    { judul: "Lebih, Kurang, Sama", emoji: "⚖️", countNum: 3, countWord: "Tiga", suara: "Dua bilangan bisa saling dibandingkan. Yang satu bisa lebih dari, kurang dari, atau sama dengan yang lain." },
    { judul: "Ratusan Dulu", emoji: "💯", countNum: 2, countWord: "Dua", suara: "Kita mulai membandingkan dari tempat ratusan. Bila ratusannya berbeda, bilangan dengan ratusan lebih besar adalah yang lebih besar." },
    { judul: "Lalu Puluhan", emoji: "🔟", countNum: 2, countWord: "Dua", suara: "Bila ratusannya sama, kita bandingkan puluhan. Lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan." },
    { judul: "Terakhir Satuan", emoji: "1️⃣", countNum: 2, countWord: "Dua", suara: "Bila ratusan dan puluhan sama, kita bandingkan satuan. Tujuh ratus enam puluh sembilan lebih dari tujuh ratus enam puluh satu." },
    { judul: "Tiga Tanda", emoji: "🐊", countNum: 3, countWord: "Tiga", suara: "Tanda kurang dari, lebih dari, dan sama dengan. Mulut tanda terbuka ke arah bilangan yang lebih besar." },
    { judul: "Bilangan yang Sama", emoji: "🤝", countNum: 2, countWord: "Dua", suara: "Delapan ratus empat dan delapan ratus empat sama pada semua tempat, jadi keduanya sama dengan." },
    { judul: "Tiga Bilangan", emoji: "🔺", countNum: 3, countWord: "Tiga", suara: "Tiga bilangan dibandingkan dengan cara yang sama. Enam ratus tiga puluh sembilan paling kecil, lalu tujuh ratus sembilan, lalu tujuh ratus dua puluh." },
    { judul: "Urutan Naik", emoji: "📈", countNum: 3, countWord: "Tiga", suara: "Urutan naik dari yang terkecil ke terbesar, misalnya 639, 709, 720." },
    { judul: "Urutan Turun", emoji: "📉", countNum: 3, countWord: "Tiga", suara: "Urutan turun dari yang terbesar ke terkecil, misalnya 720, 709, 639." },
    { judul: "Cara Membandingkan", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, tulis bilangan pada papan nilai tempat. Dua, bandingkan ratusan. Tiga, bila sama, bandingkan puluhan lalu satuan. Empat, tulis hasilnya dengan tanda." },
  ],
  games: [
    C("compare-collections", "Bandingkan Kumpulan", "hlm. 24–25 (jarak rumah Alen dan Galih ke sekolah)", "Menentukan kumpulan benda mana yang lebih banyak, atau apakah sama banyak.", "Tiga ronde, tiap ronde dua soal. Dua kumpulan dus, bungkus, dan benda lepas ditampilkan berdampingan. Siswa memilih satu dari tiga jawaban: A lebih banyak, B lebih banyak, atau sama banyak.", "Bandingkan dua kumpulan.", "⚖️", 6),
    C("sign-collections", "Tanda untuk Kumpulan", "hlm. 26–28 (simbol <, >, dan =)", "Memilih kata dan tanda yang tepat untuk dua kumpulan benda.", "Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan, lalu siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Kumpulan A terhadap Kumpulan B.", "Pilih tanda untuk dua kumpulan.", "🐊", 6),
    C("order-collections", "Urutkan Kumpulan", "hlm. 29–31 (mengurutkan dari terkecil ke terbesar dan sebaliknya)", "Mengurutkan empat kumpulan benda dari paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde empat kumpulan. Siswa mengetuk kumpulan satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk kumpulan menurut banyaknya.", "📶", 12),
    C("most-least-collection", "Paling Banyak, Paling Sedikit", "hlm. 33 (kelereng Alfa, Galih, dan Andi)", "Menemukan kumpulan yang paling banyak dan paling sedikit.", "Tiga ronde, tiap ronde empat kumpulan dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya.", "Ketuk yang paling banyak atau paling sedikit.", "🏆", 6),
    C("match-collection-sign", "Jodohkan Pasangan dan Tanda", "hlm. 26–28 (339 < 421, 583 > 529, 804 = 804)", "Menjodohkan pasangan dua kumpulan dengan tanda yang menghubungkannya.", "Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga tanda (>, <, =). Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok.", "Ketuk pasangan, lalu ketuk tandanya.", "🔗", 9),
    C("slot-collection-order", "Taruh di Urutan", "hlm. 30–31 (urutan 639, 709, 720)", "Menaruh tiga kumpulan pada tempat terkecil, tengah, dan terbesar.", "Tiga ronde, tiap ronde tiga kumpulan dan tiga tempat: terkecil, tengah, terbesar. Siswa mengetuk kumpulan, lalu mengetuk tempatnya.", "Ketuk kumpulan, lalu ketuk tempatnya.", "📥", 9),
    C("tap-all-more-collection", "Ketuk Semua yang Lebih atau Kurang", "hlm. 25–28 (membandingkan dengan sebuah bilangan)", "Menemukan semua kumpulan yang lebih banyak atau kurang dari kumpulan acuan.", "Tiga ronde, tiap ronde satu kumpulan acuan, empat kumpulan lain, dan satu perintah lebih atau kurang. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("same-hundreds-collection", "Ratusan Sama, Lihat Berikutnya", "hlm. 27–28 (583 dan 529; 769 dan 761)", "Membandingkan dua kumpulan yang jumlah dusnya sama dengan melihat bungkus lalu benda lepas.", "Tiga ronde, tiap ronde dua soal. Kedua kumpulan punya dus yang sama banyak, jadi siswa memilih mana yang lebih banyak dengan melihat bungkus atau benda lepas.", "Lihat bungkus dulu, lalu benda lepas.", "🔍", 6),
    C("between-collection", "Di Antara Dua Kumpulan", "hlm. 30–31 (639 kurang dari 709 kurang dari 720)", "Menemukan kumpulan yang jumlahnya di antara dua kumpulan batas.", "Tiga ronde. Dua kumpulan batas ditampilkan, lalu siswa mengetuk satu dari tiga kumpulan yang jumlahnya di antara keduanya.", "Ketuk kumpulan di antara dua batas.", "↔️", 3),
    C("story-marbles", "Cerita Kelereng dan Kue", "hlm. 33–34 (kelereng Alfa, Galih, Andi; jarak rumah ke sekolah)", "Menentukan siapa yang punya paling banyak dan paling sedikit dari cerita tiga anak.", "Tiga ronde, tiap ronde dua soal. Tiga anak dengan banyak benda masing-masing. Siswa memilih nama anak yang paling banyak atau paling sedikit.", "Pilih nama anak yang dimaksud.", "🧒", 6),
    P("compare-blocks", "Bandingkan Blok", "hlm. 25–26 (membandingkan dengan nilai tempat)", "Menentukan model blok mana yang lebih banyak atau apakah sama.", "Tiga ronde, tiap ronde dua soal. Dua model blok ditampilkan, lalu siswa memilih A lebih banyak, B lebih banyak, atau sama banyak.", "Bandingkan dua model.", "blocks-compare", 3, 2),
    P("sign-blocks", "Tanda untuk Blok", "hlm. 26–28 (simbol <, >, dan =)", "Memilih tanda yang tepat untuk dua model blok.", "Tiga ronde, tiap ronde dua soal. Siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Model A terhadap Model B.", "Pilih tanda untuk dua model.", "blocks-sign", 3, 2),
    P("sign-table", "Isi Tabel Tanda", "hlm. 32 (isilah titik-titik dengan tanda >, <, atau =)", "Mengisi tanda perbandingan pada tabel pasangan bilangan.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat.", "Isi tabel dengan kartu tanda.", "sign-table", 3, 4),
    P("order-blocks", "Urutkan Blok", "hlm. 30–31 (urutan 639, 709, 720)", "Mengurutkan model blok dari terkecil atau terbesar.", "Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk model menurut urutannya.", "blocks-order", 3, 4),
    P("match-blocks-sign", "Jodohkan Pasangan Blok dan Tanda", "hlm. 26–28 (339 < 421, 583 > 529, 804 = 804)", "Menjodohkan pasangan model dengan tanda yang menghubungkannya.", "Tiga ronde, tiap ronde tiga pasangan model dan tiga tanda. Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok.", "Ketuk pasangan, lalu ketuk tandanya.", "blocks-sign-match", 3, 3),
    P("most-least-blocks", "Paling Banyak, Paling Sedikit pada Blok", "hlm. 33–34 (paling sedikit dan paling banyak)", "Menemukan model blok yang paling banyak dan paling sedikit.", "Tiga ronde, tiap ronde empat model dan dua pertanyaan. Siswa mengetuk modelnya.", "Ketuk yang paling banyak atau paling sedikit.", "blocks-most-least", 3, 4),
    P("tap-all-more-blocks", "Ketuk Semua Blok yang Lebih atau Kurang", "hlm. 25–28 (membandingkan dengan sebuah bilangan)", "Menemukan semua model yang lebih besar atau kurang dari sebuah bilangan acuan.", "Tiga ronde, tiap ronde satu perintah dengan bilangan acuan dan empat model. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "blocks-select", 3, 4),
    P("sort-hundreds-blocks", "Pilah Blok: Ratusan Kecil atau Besar", "hlm. 25–26 (bandingkan ratusan lebih dulu)", "Memilah model menurut angka ratusannya, kurang dari 5 atau 5 atau lebih.", "Tiga ronde, tiap ronde enam model dan dua kotak. Siswa menyeret atau mengetuk model ke kotak yang tepat.", "Pilah blok menurut ratusannya.", "blocks-sort", 3, 6),
    P("complete-compare-sentence", "Lengkapi Kalimat Perbandingan", "hlm. 25–26 (Bilangan 339 memiliki ratusan kurang dari 421)", "Melengkapi kalimat tentang ratusan dua bilangan dan hasil perbandingannya.", "Tiga pasang model, tiap pasang tiga kalimat. Siswa memilih satu dari tiga pilihan untuk bagian kosong, termasuk kata lebih dari, kurang dari, atau sama dengan.", "Pilih kata atau angka untuk bagian kosong.", "compare-sentence", 3, 3),
    P("slot-blocks-order", "Taruh Blok di Urutan", "hlm. 30–31 (urutan naik)", "Menaruh tiga model pada tempat terkecil, tengah, dan terbesar.", "Tiga ronde, tiap ronde tiga model dan tiga tempat. Siswa mengetuk model, lalu mengetuk tempatnya.", "Ketuk model, lalu ketuk tempatnya.", "blocks-slot", 3, 3),
    A("compare-numerals", "Bandingkan Lambang", "hlm. 32 (isilah titik-titik dengan tanda >, <, atau =)", "Memilih tanda yang tepat untuk dua lambang bilangan.", "Tiga ronde, tiap ronde dua soal (378 dan 345, 189 dan 206, dan seterusnya). Siswa memilih lebih dari, kurang dari, atau sama dengan.", "Pilih tanda untuk dua bilangan.", "378 ○ 345", "BANDINGKAN", "> • < • ="),
    A("fill-sign-table-abstract", "Isi Tabel Perbandingan", "hlm. 33 (urutkan 537, 590, 518, dan 601)", "Melengkapi tabel perbandingan dua bilangan dengan tanda yang tepat.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat.", "Isi tabel dengan kartu tanda.", "537 ○ 590", "TABEL", "bilangan • tanda"),
    A("deciding-place", "Tempat yang Menentukan", "hlm. 25–28 (bandingkan ratusan; lalu puluhan; lalu satuan)", "Menentukan tempat pertama yang berbeda pada dua bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa memilih tempat yang menentukan hasil perbandingan: ratusan, puluhan, satuan, atau tidak ada karena sama.", "Pilih tempat yang menentukan.", "583 • 529", "TEMPAT", "ratusan • puluhan • satuan"),
    A("order-numerals", "Urutkan Lambang", "hlm. 33 (urutkan 537, 590, 518, dan 601; 325, 235, 532, 352)", "Mengurutkan empat bilangan dari terkecil atau terbesar.", "Tiga ronde, tiap ronde empat bilangan. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah.", "Ketuk bilangan menurut urutannya.", "↑", "URUTKAN", "terkecil • terbesar"),
    A("match-pair-word", "Jodohkan Pasangan dan Kata", "hlm. 26–28 (dibaca kurang dari, lebih dari, sama dengan)", "Menjodohkan pasangan bilangan dengan kata yang menghubungkannya.", "Tiga ronde, tiap ronde tiga pasangan bilangan dan tiga kata (lebih dari, kurang dari, sama dengan). Siswa mengetuk pasangan, lalu mengetuk kata yang cocok.", "Ketuk pasangan, lalu ketuk katanya.", "769 ? 761", "JODOHKAN", "pasangan • kata"),
    A("true-false-compare", "Benar atau Salah: Perbandingan", "hlm. 24–34 (membandingkan dan mengurutkan)", "Menilai pernyataan tentang membandingkan, tanda, dan urutan bilangan.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-compare", "Detektif Perbandingan", "hlm. 30–31 (bilangan di antara dua bilangan)", "Menemukan bilangan dari petunjuk lebih dari, kurang dari, dan angka tertentu.", "Empat soal. Siswa membaca petunjuk seperti lebih dari 500 dan kurang dari 510, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("select-all-compare", "Ketuk Semua yang Lebih atau Kurang: Angka", "hlm. 25–28 (membandingkan dengan sebuah bilangan)", "Memilih semua bilangan yang lebih besar atau lebih kecil dari bilangan acuan.", "Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "lebih dari • kurang dari"),
    A("concept-map-compare", "Peta Konsep Membandingkan", "hlm. 2 (peta konsep: membandingkan dan mengurutkan bilangan)", "Melengkapi peta konsep membandingkan dan mengurutkan bilangan.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "bandingkan • urutkan"),
    A("build-compare-sentence", "Susun Kata Perbandingan", "hlm. 26–28 (339 < 421 dibaca kurang dari)", "Menyusun kata menjadi kalimat tentang membandingkan bilangan.", "Empat kalimat, misalnya 339 kurang dari 421 ditulis 339 < 421. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • tanda"),
  ],
  poin: [
    { ikon: "💯", nama: "Mulai dari ratusan", isi: "bandingkan ratusan, lalu puluhan, lalu satuan", suara: "Kita membandingkan bilangan tiga angka mulai dari ratusan. Bila sama, lanjut ke puluhan, lalu satuan." },
    { ikon: "🐊", nama: "Tiga tanda", isi: "< kurang dari, > lebih dari, = sama dengan", suara: "Tanda kurang dari, lebih dari, dan sama dengan. Mulut tanda terbuka ke arah bilangan yang lebih besar." },
    { ikon: "🤝", nama: "Sama besar", isi: "804 = 804", suara: "Bila ratusan, puluhan, dan satuan sama semua, kedua bilangan sama dengan." },
    { ikon: "📶", nama: "Mengurutkan", isi: "639, 709, 720 dari terkecil", suara: "Mengurutkan bilangan berarti menyusunnya dari terkecil ke terbesar atau dari terbesar ke terkecil." },
    { ikon: "🔍", nama: "Teliti membaca tanda", isi: "tanda dibalik, arti berubah", suara: "Bila tanda dibalik, artinya berubah. Baca tanda dengan teliti." },
  ],
  poinSuara:
    "Ingat selalu! Membandingkan bilangan tiga angka dimulai dari ratusan, lalu puluhan, lalu satuan. Hasilnya ditulis dengan tanda kurang dari, lebih dari, atau sama dengan. Mengurutkan berarti menyusun bilangan dari terkecil ke terbesar atau sebaliknya.",
  cara: {
    suara: "Cara membandingkan. Lihat ratusan dulu. Bila sama, lihat puluhan. Bila sama lagi, lihat satuan. Lalu tulis tandanya.",
    potongan: [
      { teks: "ratusan dulu", warna: "#BBF7D0" },
      { teks: "lalu puluhan", warna: "#BFDBFE" },
      { teks: "lalu satuan", warna: "#FECACA" },
      { teks: "tulis tanda", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: bersama keluargamu, tulis jarak atau tinggi badan tiga orang dalam sentimeter atau meter, atau banyak buku di tiga rak. Bandingkan dua demi dua dengan tanda lebih dari, kurang dari, atau sama dengan, lalu urutkan dari yang terkecil.",
  refleksi: [
    "Aku dapat membandingkan dua bilangan tiga angka.",
    "Aku dapat menulis tanda lebih dari, kurang dari, dan sama dengan.",
    "Aku dapat mengurutkan beberapa bilangan.",
    "Aku berani menjelaskan caraku kepada teman.",
  ],
};

/* ====================================================================== */
/* SUB-BAB D. Penjumlahan bilangan cacah sampai 100                         */
/* ====================================================================== */

const ALUR_D = ["Mengingat penjumlahan", "Susun pendek tanpa menyimpan", "Susun panjang tanpa menyimpan", "Menyimpan satu puluhan", "Susun panjang dengan menyimpan", "Memilih cara yang mudah", "Menjumlahkan tiga bilangan", "Soal cerita penjumlahan", "Siap menjumlahkan sampai 100"];

export const SUB_D31: SubBabNaskah = {
  id: "D",
  codeTitle: "Sub-Bab D (Penjumlahan sampai 100)",
  fullTitle: "Sub-Bab D: Penjumlahan Bilangan Cacah sampai 100",
  targetDescription:
    "Siswa menjumlahkan dua bilangan cacah sampai 100 dengan cara susun pendek (tanpa dan dengan menyimpan) dan cara susun panjang (menguraikan puluhan dan satuan), memahami bahwa sepuluh satuan ditukar menjadi satu puluhan, menjumlahkan tiga bilangan, serta menyelesaikan soal cerita penjumlahan.",
  secondaryBg: "#FCE7F3",
  secondaryBorder: "#DB2777",
  secondaryText: "#831843",
  silabus: {
    teksSuara: `Kita belajar penjumlahan bilangan cacah sampai seratus. Di perpustakaan ada dua puluh tiga buku Matematika dan enam belas buku Bahasa Indonesia, lalu ada empat puluh delapan siswa laki-laki dan enam belas siswa perempuan yang mengikuti upacara. Kita belajar cara susun pendek dan cara susun panjang, tanpa menyimpan dan dengan menyimpan. Kita juga menyelesaikan soal cerita. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa menjumlahkan dua bilangan cacah sampai 100 dengan susun pendek dan susun panjang, tanpa dan dengan menyimpan.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab D hlm. 34–45) dan Buku Panduan Guru Bab 1 Topik D.",
  },
  videos: [
    {
      id: "K3B1D-V1",
      judul: "Buku di Perpustakaan",
      subjudul: "Susun pendek tanpa menyimpan",
      adegan: [
        {
          id: "K3B1D-V1-1",
          judul: "Berapa semua buku",
          ketukan: [
            "Di perpustakaan sekolah ada 23 buah buku Matematika dan 16 buah buku Bahasa Indonesia.",
            "Berapa jumlah keseluruhan buku di rak perpustakaan?",
            "Kita bisa memakai operasi penjumlahan, yaitu 23 ditambah 16.",
            "Ada berbagai cara melakukan penjumlahan. Kita pelajari satu per satu.",
          ],
          papan: ["23 buku Matematika", "16 buku Bahasa", "23 + 16", "Berbagai cara"],
        },
        {
          id: "K3B1D-V1-2",
          judul: "Tabel nilai tempat",
          ketukan: [
            "Uraikan 23 dan 16 pada tabel nilai tempat.",
            "Bilangan 23 punya 2 puluhan dan 3 satuan. Bilangan 16 punya 1 puluhan dan 6 satuan.",
            "Gabungkan satuan: 3 satuan dan 6 satuan menjadi 9 satuan.",
            "Gabungkan puluhan: 2 puluhan dan 1 puluhan menjadi 3 puluhan. Hasilnya 39.",
          ],
          papan: ["Tabel puluhan dan satuan", "23 dan 16", "3 + 6 = 9 satuan", "2 + 1 = 3 puluhan"],
        },
        {
          id: "K3B1D-V1-3",
          judul: "Susun pendek",
          ketukan: [
            "Cara susun pendek: susun bilangan, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.",
            "Langkah satu, susun. Langkah dua, jumlahkan satuan, 3 + 6 = 9.",
            "Langkah tiga, jumlahkan puluhan, 2 + 1 = 3.",
            "Jadi, 23 + 16 = 39. Ada 39 buku di rak perpustakaan.",
          ],
          papan: ["Susun pendek", "Satuan: 3 + 6 = 9", "Puluhan: 2 + 1 = 3", "23 + 16 = 39"],
        },
      ],
    },
    {
      id: "K3B1D-V2",
      judul: "Upacara di Alun-Alun",
      subjudul: "Susun pendek dengan menyimpan",
      adegan: [
        {
          id: "K3B1D-V2-1",
          judul: "Berapa jumlah siswa",
          ketukan: [
            "Sekolah mengikutsertakan siswa untuk upacara di alun-alun kota.",
            "Ada 48 siswa laki-laki dan 16 siswa perempuan.",
            "Berapa jumlah seluruh siswa yang mengikuti upacara?",
            "Kita jumlahkan 48 dan 16.",
          ],
          papan: ["Upacara di alun-alun", "48 laki-laki, 16 perempuan", "Jumlah seluruh siswa?", "48 + 16"],
        },
        {
          id: "K3B1D-V2-2",
          judul: "Menyimpan satu puluhan",
          ketukan: [
            "Jumlahkan satuan: 8 ditambah 6 sama dengan 14.",
            "Empat belas satuan sama dengan 1 puluhan dan 4 satuan.",
            "Tulis 4 di satuan, lalu simpan 1 puluhan di atas kolom puluhan.",
            "Sepuluh satuan ditukar dengan satu puluhan, itulah alasan kita menyimpan.",
          ],
          papan: ["8 + 6 = 14", "14 = 1 puluhan + 4 satuan", "Tulis 4, simpan 1", "10 satuan jadi 1 puluhan"],
        },
        {
          id: "K3B1D-V2-3",
          judul: "Puluhan dan hasil",
          ketukan: [
            "Sekarang jumlahkan puluhan: 1 simpanan, ditambah 4, ditambah 1.",
            "Satu ditambah empat ditambah satu sama dengan 6.",
            "Jadi, 48 ditambah 16 sama dengan 64.",
            "Ada 64 siswa yang mengikuti upacara di alun-alun kota.",
          ],
          papan: ["Puluhan: 1 + 4 + 1", "= 6 puluhan", "48 + 16 = 64", "64 siswa"],
        },
      ],
    },
    {
      id: "K3B1D-V3",
      judul: "Cara Susun Panjang",
      subjudul: "Menguraikan lalu menjumlahkan",
      adegan: [
        {
          id: "K3B1D-V3-1",
          judul: "Uraikan bilangan",
          ketukan: [
            "Cara susun panjang menguraikan bilangan menjadi puluhan dan satuan.",
            "Bilangan 54 diurai menjadi 50 ditambah 4.",
            "Bilangan 29 diurai menjadi 20 ditambah 9.",
            "Kelompokkan puluhan dengan puluhan dan satuan dengan satuan.",
          ],
          papan: ["Susun panjang", "54 = 50 + 4", "29 = 20 + 9", "Kelompokkan"],
        },
        {
          id: "K3B1D-V3-2",
          judul: "Jumlahkan kelompok",
          ketukan: [
            "Puluhan: 50 ditambah 20 sama dengan 70.",
            "Satuan: 4 ditambah 9 sama dengan 13.",
            "Bilangan 13 diurai menjadi 10 ditambah 3.",
            "Jadi 70 ditambah 10 ditambah 3 sama dengan 83.",
          ],
          papan: ["50 + 20 = 70", "4 + 9 = 13", "13 = 10 + 3", "70 + 10 + 3 = 83"],
        },
        {
          id: "K3B1D-V3-3",
          judul: "Pilih cara yang mudah",
          ketukan: [
            "Kita boleh memilih cara yang menurut kita paling mudah.",
            "Cara susun pendek cepat untuk bilangan yang dijumlahkan satu per satu.",
            "Cara susun panjang membantu kita melihat nilai puluhan dan satuan.",
            "Apa pun caranya, hasilnya sama, yaitu 83.",
          ],
          papan: ["Pilih cara yang mudah", "Susun pendek: cepat", "Susun panjang: jelas", "Hasil sama: 83"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Penjumlahan",
      stepDesc:
        "Di Kelas 2 kita menjumlahkan bilangan sampai 20, bahkan sampai 100 tanpa kesulitan besar. Penjumlahan berarti menggabungkan dua kelompok benda. Pada bilangan dua angka, kita memakai nilai tempat: puluhan dengan puluhan dan satuan dengan satuan. Di perpustakaan ada 23 buku Matematika dan 16 buku Bahasa Indonesia, jadi kita menjumlahkan 23 dan 16.",
      icon: "🔙",
      flowFrom: ALUR_D[0],
      flowTo: ALUR_D[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Susun Pendek tanpa Menyimpan",
      stepDesc:
        "Susun bilangan 23 dan 16 ke bawah. Puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Jumlahkan satuan lebih dulu: 3 ditambah 6 sama dengan 9. Lalu jumlahkan puluhan: 2 ditambah 1 sama dengan 3. Hasilnya 39. Disebut tanpa menyimpan karena jumlah satuannya kurang dari sepuluh.",
      icon: "📚",
      flowFrom: ALUR_D[1],
      flowTo: ALUR_D[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Susun Panjang tanpa Menyimpan",
      stepDesc:
        "Cara susun panjang menguraikan bilangan. 23 sama dengan 20 ditambah 3 dan 16 sama dengan 10 ditambah 6. Kelompokkan puluhan dengan puluhan dan satuan dengan satuan: (20 + 10) + (3 + 6). Hasilnya 30 ditambah 9, yaitu 39. Cara ini membuat nilai tiap tempat terlihat jelas.",
      icon: "🧩",
      flowFrom: ALUR_D[2],
      flowTo: ALUR_D[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Menyimpan Satu Puluhan",
      stepDesc:
        "Kadang jumlah satuan sepuluh atau lebih. Pada 48 ditambah 16, satuan 8 ditambah 6 sama dengan 14. Empat belas satuan sama dengan 1 puluhan dan 4 satuan. Kita tulis 4 di satuan dan menyimpan 1 puluhan untuk dijumlahkan dengan puluhan. Sepuluh satuan memang boleh ditukar dengan satu puluhan.",
      icon: "🔁",
      flowFrom: ALUR_D[3],
      flowTo: ALUR_D[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Susun Panjang dengan Menyimpan",
      stepDesc:
        "Uraikan 48 menjadi 40 ditambah 8 dan 16 menjadi 10 ditambah 6. Kelompokkan: (40 + 10) + (8 + 6) sama dengan 50 ditambah 14. Uraikan 14 menjadi 10 ditambah 4, lalu 50 ditambah 10 sama dengan 60, ditambah 4 menjadi 64. Hasilnya sama dengan cara susun pendek, yaitu 64.",
      icon: "🧱",
      flowFrom: ALUR_D[4],
      flowTo: ALUR_D[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Memilih Cara yang Mudah",
      stepDesc:
        "Kita boleh memilih cara yang menurut kita mudah. Susun pendek cepat dan rapi. Susun panjang membantu kita melihat nilai puluhan dan satuan. Dua cara memberi hasil yang sama. Untuk memeriksa, hitunglah dengan cara yang lain dan lihat apakah hasilnya sama, misalnya 54 ditambah 29 sama dengan 83.",
      icon: "✅",
      flowFrom: ALUR_D[5],
      flowTo: ALUR_D[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Menjumlahkan Tiga Bilangan",
      stepDesc:
        "Tiga bilangan dijumlahkan dua-dua. Pada 23 ditambah 30 ditambah 12, jumlahkan 23 dan 30 menjadi 53, lalu tambahkan 12 menjadi 65. Boleh juga puluhan semua dulu: 20 + 30 + 10 sama dengan 60, lalu satuan 3 + 0 + 2 sama dengan 5, jadi 65. Urutan menjumlahkan tidak mengubah hasilnya.",
      icon: "➕",
      flowFrom: ALUR_D[6],
      flowTo: ALUR_D[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Soal Cerita Penjumlahan",
      stepDesc:
        "Soal cerita memakai kata seperti jumlah seluruhnya, semuanya, dan ditambah. Andi membeli 25 buku dan 36 pensil, jadi jumlah barang 25 ditambah 36 sama dengan 61. Pak Adi punya 15 kambing, 10 sapi, dan 12 domba, jadi 15 ditambah 10 ditambah 12 sama dengan 37. Tulis kalimat matematikanya, hitung, lalu jawab dengan satuan yang tepat.",
      icon: "📖",
      flowFrom: ALUR_D[7],
      flowTo: ALUR_D[8],
    },
  ],
  infografis: [
    { judul: "Susun Lurus", emoji: "📏", countNum: 2, countWord: "Dua", suara: "Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan." },
    { judul: "Satuan Lebih Dulu", emoji: "1️⃣", countNum: 2, countWord: "Dua", suara: "Kita menjumlahkan satuan lebih dulu, baru puluhan. Tiga ditambah enam sama dengan sembilan." },
    { judul: "Puluhan Berikutnya", emoji: "🔟", countNum: 2, countWord: "Dua", suara: "Setelah satuan, jumlahkan puluhan. Dua ditambah satu sama dengan tiga, jadi dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan." },
    { judul: "Menyimpan", emoji: "🔁", countNum: 3, countWord: "Tiga", suara: "Bila satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan. Tulis sisa satuan dan simpan satu puluhan." },
    { judul: "23 + 16", emoji: "📚", countNum: 3, countWord: "Tiga", suara: "Dua puluh tiga ditambah enam belas. Satuan tiga ditambah enam sama dengan sembilan, puluhan dua ditambah satu sama dengan tiga. Hasilnya tiga puluh sembilan." },
    { judul: "48 + 16", emoji: "🏟️", countNum: 3, countWord: "Tiga", suara: "Empat puluh delapan ditambah enam belas. Delapan ditambah enam sama dengan empat belas, simpan satu. Satu ditambah empat ditambah satu sama dengan enam. Hasilnya enam puluh empat." },
    { judul: "Susun Panjang 54 + 29", emoji: "🧩", countNum: 4, countWord: "Empat", suara: "Lima puluh empat sama dengan lima puluh tambah empat. Dua puluh sembilan sama dengan dua puluh tambah sembilan. Tujuh puluh tambah tiga belas sama dengan delapan puluh tiga." },
    { judul: "Tiga Bilangan", emoji: "➕", countNum: 2, countWord: "Dua", suara: "Menjumlahkan tiga bilangan dilakukan dua-dua. Dua puluh tiga tambah tiga puluh sama dengan lima puluh tiga, tambah dua belas sama dengan enam puluh lima." },
    { judul: "Soal Cerita", emoji: "📖", countNum: 3, countWord: "Tiga", suara: "Soal cerita meminta jumlah seluruhnya. Tulis kalimat penjumlahannya, hitung, lalu tulis jawabannya dengan satuan." },
    { judul: "Cara Memeriksa", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, susun lurus. Dua, jumlahkan satuan dan simpan bila perlu. Tiga, jumlahkan puluhan. Empat, periksa dengan cara yang lain." },
  ],
  games: [
    C("combine-collections", "Gabungkan Kumpulan", "hlm. 35–37 (penjumlahan dengan tabel nilai tempat)", "Menggabungkan dua kumpulan dengan bungkus dan benda lepas, termasuk menukar sepuluh benda menjadi satu bungkus.", "Tiga ronde, tiap ronde dua soal. Siswa membaca dua banyak yang digabung lalu merakit jumlahnya dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar menjadi satu bungkus.", "Rakit jumlah dua kumpulan.", "🧺", 6),
    C("count-combined", "Hitung Gabungan", "hlm. 35 dan 38 (23 + 16 dan 48 + 16)", "Menghitung jumlah dua kumpulan benda dan memilih hasilnya.", "Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan dengan tanda tambah. Siswa memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan.", "Hitung jumlah dua kumpulan.", "➕", 6),
    C("sort-addition", "Pilah Soal: Menyimpan atau Tidak", "hlm. 38–42 (dengan menyimpan dan tanpa menyimpan)", "Memilah soal penjumlahan menjadi yang perlu menyimpan dan yang tanpa menyimpan.", "Tiga ronde, tiap ronde enam soal bergambar kumpulan dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat.", "Pilah soal ke kotak yang tepat.", "🧺", 18),
    C("match-pair-sum", "Jodohkan Pasangan dan Jumlah", "hlm. 35–42 (menjumlahkan dua bilangan)", "Menjodohkan pasangan kumpulan dengan jumlahnya.", "Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok.", "Ketuk pasangan, lalu ketuk jumlahnya.", "🔗", 9),
    C("memory-pair-sum", "Memori Pasangan dan Jumlah", "hlm. 35–42 (menjumlahkan dua bilangan)", "Mencocokkan pasangan kumpulan dengan jumlahnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): pasangan kumpulan dan jumlahnya. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari pasangan dan jumlahnya.", "🃏", 12),
    C("tap-sum-pair", "Ketuk Pasangan dengan Jumlah", "hlm. 35–42 (jumlah keseluruhan)", "Menemukan pasangan kumpulan yang jumlahnya sama dengan bilangan yang diminta.", "Tiga ronde, tiap ronde tiga pasangan dan dua pertanyaan. Siswa mengetuk pasangan yang jumlahnya sama dengan bilangan yang disebut.", "Ketuk pasangan dengan jumlah itu.", "👆", 6),
    C("tap-all-save", "Ketuk Semua yang Perlu Menyimpan", "hlm. 38–40 (8 satuan + 6 satuan = 14 satuan)", "Menemukan semua pasangan yang satuannya berjumlah sepuluh atau lebih (atau yang tidak).", "Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("story-add", "Cerita Penjumlahan", "hlm. 35 dan 38 (buku di perpustakaan; siswa di upacara)", "Menyelesaikan soal cerita penjumlahan dua bilangan dengan gambar kumpulan.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar dua kumpulan, lalu memilih jumlahnya.", "Baca cerita, lalu pilih jumlahnya.", "📖", 6),
    C("board-sum-collection", "Papan Jumlah Kumpulan", "hlm. 36 dan 39 (tabel nilai tempat hasil penjumlahan)", "Menulis jumlah dua kumpulan pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa menghitung dua kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa.", "Isi papan dengan jumlahnya.", "🗂️", 6),
    C("order-sums", "Urutkan Pasangan menurut Jumlah", "hlm. 35–42 (membandingkan hasil)", "Mengurutkan tiga pasangan kumpulan menurut jumlahnya.", "Tiga ronde, tiap ronde tiga pasangan bertanda huruf. Siswa mengetuk pasangan satu per satu dari jumlah paling kecil atau paling besar.", "Ketuk pasangan menurut jumlahnya.", "📶", 9),
    P("add-vertical", "Susun ke Bawah", "hlm. 36 dan 39 (langkah 1, 2, dan 3 cara susun pendek)", "Menjumlahkan dua bilangan dengan cara susun pendek langkah demi langkah.", "Tiga ronde, tiap ronde satu soal (23 + 16, 48 + 16, 54 + 29). Siswa menaruh bilangan pada kolom satuan, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan.", "Susun, jumlahkan satuan, lalu puluhan.", "add-vertical", 3, 1),
    P("board-sum-numbers", "Papan Hasil Susun", "hlm. 43 (Ayo Berlatih 2: gunakan cara susun pendek)", "Menulis hasil penjumlahan pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal (33 + 28, 27 + 46, dan seterusnya). Siswa mengatur angka puluhan dan satuan, lalu menekan Periksa.", "Isi papan dengan hasilnya.", "sum-board", 3, 2),
    P("count-models-sum", "Hitung Model Puluhan dan Satuan", "hlm. 35–36 (tabel puluhan dan satuan)", "Menghitung jumlah dari dua model puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Dua model blok puluhan dan satuan ditampilkan. Siswa memilih satu dari tiga jumlah.", "Hitung jumlah dua model.", "models-sum", 3, 2),
    P("match-models-sum", "Jodohkan Model dan Jumlah", "hlm. 35–42 (menjumlahkan dua bilangan)", "Menjodohkan pasangan model dengan jumlahnya.", "Tiga ronde, tiap ronde tiga pasangan model dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok.", "Ketuk pasangan, lalu ketuk jumlahnya.", "models-match", 3, 3),
    P("memory-models-sum", "Memori Model dan Jumlah", "hlm. 35–42 (menjumlahkan dua bilangan)", "Mencocokkan pasangan model dengan jumlahnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari model dan jumlahnya.", "models-memory", 3, 4),
    P("fill-sum-table", "Isi Tabel Hasil", "hlm. 43 (Ayo Berlatih 2 dan 3)", "Melengkapi tabel soal penjumlahan dan hasilnya.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu hasil.", "sum-table", 3, 4),
    P("tap-all-save-models", "Ketuk Semua yang Perlu Menyimpan: Model", "hlm. 38–40 (menyimpan satu puluhan)", "Menemukan semua soal yang satuannya melewati sepuluh.", "Tiga ronde, tiap ronde empat soal bergambar model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "sum-select", 3, 4),
    P("sort-addition-models", "Pilah Soal Susun", "hlm. 38–40 (dengan menyimpan dan tanpa menyimpan)", "Memilah soal bergambar model menjadi yang perlu menyimpan dan yang tanpa menyimpan.", "Tiga ronde, tiap ronde enam soal dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat.", "Pilah soal ke kotak yang tepat.", "sum-sort", 3, 6),
    P("long-form-sentence", "Lengkapi Cara Panjang", "hlm. 37 dan 40 (23 = 20 + 3; 16 = 10 + 6)", "Melengkapi uraian puluhan dan satuan pada cara susun panjang.", "Tiga soal, tiap soal tiga kalimat, misalnya 23 = 20 + ... Siswa memilih satu dari tiga angka untuk bagian kosong.", "Pilih angka untuk bagian kosong.", "long-form", 3, 3),
    P("order-addition-steps", "Urutkan Langkah Menjumlahkan", "hlm. 36–42 (langkah 1, 2, dan 3)", "Mengurutkan langkah penjumlahan bersusun dan susun panjang.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    A("add-vertical-abstract", "Susun ke Bawah: Lambang", "hlm. 43 (Ayo Berlatih 2: cara susun pendek)", "Menjumlahkan dua bilangan dengan susun pendek, termasuk menyimpan.", "Tiga ronde, tiap ronde satu soal (34 + 25, 46 + 38, 57 + 26). Siswa menyusun, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan.", "Susun, jumlahkan satuan, lalu puluhan.", "34+25", "SUSUN KE BAWAH", "satuan • puluhan"),
    A("choose-sum", "Pilih Jumlahnya", "hlm. 44 (gunakan cara yang menurut kalian mudah)", "Memilih hasil penjumlahan dua bilangan dari tiga pilihan.", "Tiga ronde, tiap ronde dua soal (31 + 51, 49 + 19, dan seterusnya). Pengecoh lupa menyimpan atau salah menyimpan.", "Pilih hasil penjumlahannya.", "31+51", "PILIH HASIL", "jumlah"),
    A("board-sum-abstract", "Papan Jumlah", "hlm. 43–44 (menjumlahkan dua bilangan)", "Menulis hasil penjumlahan pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa.", "Isi papan dengan hasilnya.", "64+17", "PAPAN", "puluhan • satuan"),
    A("steps-sentence", "Satuan, Puluhan, Jumlah", "hlm. 39 (jumlahkan satuan, simpan 1; jumlahkan puluhan)", "Melengkapi langkah menjumlahkan satuan, puluhan, dan jumlah akhir.", "Tiga soal, tiap soal tiga kalimat, misalnya satuan: 8 + 6 = ... Siswa memilih satu dari tiga angka.", "Pilih angka untuk bagian kosong.", "8+6", "LANGKAH", "satuan • puluhan • jumlah"),
    A("match-problem-result", "Jodohkan Soal dan Hasil", "hlm. 44 (tarik garis pada jawaban yang sesuai)", "Menjodohkan soal penjumlahan dengan hasilnya.", "Tiga ronde, tiap ronde tiga soal dan tiga hasil. Siswa mengetuk soal, lalu mengetuk hasil yang cocok.", "Ketuk soal, lalu ketuk hasilnya.", "23+16", "JODOHKAN", "soal • hasil"),
    A("memory-problem-result", "Memori Soal dan Hasil", "hlm. 44 (soal dan jawaban)", "Mencocokkan soal penjumlahan dengan hasilnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari soal dan hasilnya.", "12+13", "MEMORI", "soal • hasil"),
    A("true-false-addition", "Benar atau Salah: Penjumlahan", "hlm. 35–45 (susun pendek, susun panjang, menyimpan)", "Menilai pernyataan tentang cara menjumlahkan dan hasilnya.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-addition", "Detektif Penjumlahan", "hlm. 35–42 (jumlah dua bilangan)", "Menemukan bilangan hasil penjumlahan dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk seperti hasil 48 + 16 dan puluhanku 6, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-addition", "Peta Konsep Penjumlahan", "hlm. 2 (peta konsep: penjumlahan bilangan cacah)", "Melengkapi peta konsep penjumlahan bersusun dan susun panjang.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "susun • simpan • jumlah"),
    A("story-add-numbers", "Soal Cerita Penjumlahan", "hlm. 45 (Ayo Berlatih 5: kerjakan soal cerita)", "Menyelesaikan soal cerita penjumlahan dua atau tiga bilangan.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan.", "Baca cerita, lalu pilih jumlahnya.", "25+36", "CERITA", "jumlah seluruhnya"),
  ],
  poin: [
    { ikon: "📏", nama: "Susun lurus", isi: "puluhan dengan puluhan, satuan dengan satuan", suara: "Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan." },
    { ikon: "1️⃣", nama: "Satuan lebih dulu", isi: "23 + 16: 3 + 6 = 9, 2 + 1 = 3", suara: "Jumlahkan satuan lebih dulu, lalu puluhan. Dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan." },
    { ikon: "🔁", nama: "Menyimpan", isi: "10 satuan = 1 puluhan", suara: "Bila satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan dan simpan." },
    { ikon: "🧩", nama: "Susun panjang", isi: "54 + 29 = 70 + 13 = 83", suara: "Pada susun panjang, bilangan diuraikan menjadi puluhan dan satuan, lalu dikelompokkan." },
    { ikon: "✅", nama: "Periksa", isi: "hitung dengan cara lain", suara: "Periksa jawabanmu dengan menghitung memakai cara yang lain. Hasilnya harus sama." },
  ],
  poinSuara:
    "Ingat selalu! Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Jumlahkan satuan lebih dulu, lalu puluhan. Bila satuan berjumlah sepuluh atau lebih, simpan satu puluhan. Susun panjang dan susun pendek memberi hasil yang sama.",
  cara: {
    suara: "Cara menjumlahkan. Susun lurus. Jumlahkan satuan, simpan bila perlu. Jumlahkan puluhan. Lalu periksa dengan cara lain.",
    potongan: [
      { teks: "susun lurus", warna: "#BAE6FD" },
      { teks: "satuan dulu", warna: "#FECACA" },
      { teks: "lalu puluhan", warna: "#BFDBFE" },
      { teks: "periksa", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: hitung dua kelompok benda di rumah, misalnya kancing dan koin mainan, dengan dua puluhan atau tiga puluhan di tiap kelompok. Jumlahkan dengan cara susun pendek di buku, lalu periksa dengan cara susun panjang. Ceritakan apakah ada satuan yang perlu disimpan.",
  refleksi: [
    "Aku dapat menjumlahkan dua bilangan sampai 100 dengan susun pendek.",
    "Aku dapat menjelaskan saat harus menyimpan satu puluhan.",
    "Aku dapat memakai cara susun panjang.",
    "Aku memeriksa jawabanku dengan cara lain.",
  ],
};

export const SUB_BAB_K3B1: SubBabNaskah[] = [SUB_A31, SUB_B31, SUB_C31, SUB_D31];

/** Semua adegan video, urut sub-bab, video, adegan. Dipakai uji. */
export const semuaAdeganK3B1 = SUB_BAB_K3B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
