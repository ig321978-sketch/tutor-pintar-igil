/**
 * Naskah murni Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100), Sub-Bab A dan B.
 * Sumber: Buku Siswa Matematika Kelas II Kemendikbudristek, Bab 7 hlm. 192-224, diperkaya dengan metode dari luar buku:
 * model batang puluhan dan kotak satuan (base-ten blocks), papan nilai tempat, bagan pasangan bilangan, tabel seratus
 * (hundred chart), lompat puluhan, memperkirakan dengan patokan sepuluh, garis angka maju dan mundur, serta membandingkan
 * dengan tanda lebih besar, lebih kecil, dan sama dengan.
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k2-bab7.mjs) memakainya untuk menulis src/data/kelas2-bab7.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k2b7.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K2B7_META = {
  chapterId: "k2-mat-bab7",
  phaseCode: "FASE_A",
  grade: 2,
  subjectLabel: "MATEMATIKA - KELAS 2 SD",
  title: "BAB 7: AYO MEMBILANG SAMPAI DENGAN 100",
  silabusElemen: "🌈 Fase A • Elemen Bilangan: Bilangan sampai dengan 100 (Kelas 2 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Dari lima puluh ke seratus", "Sepuluh satuan, satu puluhan", "Menghitung puluhan", "Puluhan dan satuan", "Pasangan bilangan", "Membaca dan menulis", "Memperkirakan banyak benda", "Tabel seratus", "Siap menghitung sampai seratus"];
const ALUR_B = ["Garis bilangan", "Menghitung maju", "Menghitung mundur", "Bandingkan puluhan dulu", "Puluhan sama, lihat satuan", "Kata perbandingan", "Mengurutkan bilangan", "Teka-teki bilangan", "Siap membandingkan"];

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
/* SUB-BAB A. Menghitung, membaca, dan menulis bilangan sampai 100          */
/* ====================================================================== */

export const SUB_A7: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Menghitung, Membaca, Menulis Bilangan)",
  fullTitle: "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 100",
  targetDescription:
    "Siswa menghitung puluhan sampai seratus (sepuluh satuan sama dengan satu puluhan), menghitung puluhan dan satuan dengan nilai tempat dan pasangan bilangan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, serta memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan setiap sepuluh.",
  secondaryBg: "#FEF9C3",
  secondaryBorder: "#CA8A04",
  secondaryText: "#713F12",
  silabus: {
    teksSuara: `Kita belajar membilang sampai seratus. Di semester satu kita sudah belajar bilangan sampai lima puluh, dan kali ini kita melanjutkan sampai seratus. Kita menghitung kue cubit Pak Ahmad dalam bungkus berisi sepuluh, yaitu puluhan. Kita menghitung puluhan dan satuan pada rambutan Halim dan kelereng ayah Malosi, lalu membaca dan menulis bilangannya. Kita juga belajar memperkirakan banyak benda, menebak dulu, lalu membuktikan dengan mengelompokkan setiap sepuluh. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menghitung banyak benda sampai 100 dengan mengelompokkan puluhan dan satuan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, memperkirakan banyak benda, serta menyampaikan hasilnya dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab A hlm. 192–209).",
  },
  videos: [
    {
      id: "K2B7A-V1",
      judul: "Kue Cubit Pak Ahmad",
      subjudul: "Menghitung puluhan sampai seratus",
      adegan: [
        {
          id: "K2B7A-V1-1",
          judul: "Penjual kue cubit",
          ketukan: [
            "Pak Ahmad adalah seorang penjual kue cubit.",
            "Kue cubit adalah kue tradisional dari Betawi. Kue ini ditaburi cokelat sehingga rasanya manis.",
            "Kue cubit Pak Ahmad sudah dikemas dalam pembungkus yang ramah lingkungan. Setiap bungkus berisi sepuluh kue cubit.",
            "Pak Ahmad mempunyai sepuluh bungkus kue cubit. Berapa banyak kue cubit milik Pak Ahmad?",
          ],
          papan: ["Penjual kue cubit", "Kue tradisional Betawi", "1 bungkus: 10 kue", "Berapa semuanya?"],
        },
        {
          id: "K2B7A-V1-2",
          judul: "Satu bungkus, satu puluhan",
          ketukan: [
            "Sepuluh kue cubit dimasukkan dalam satu pembungkus.",
            "Sepuluh satuan sama dengan satu puluhan. Satu bungkus adalah satu puluhan.",
            "Lima bungkus berarti lima puluhan, yaitu lima puluh.",
            "Enam bungkus berarti enam puluhan, yaitu enam puluh.",
          ],
          papan: ["10 kue: 1 bungkus", "10 satuan = 1 puluhan", "5 puluhan = 50", "6 puluhan = 60"],
        },
        {
          id: "K2B7A-V1-3",
          judul: "Sampai seratus",
          ketukan: [
            "Tujuh bungkus berarti tujuh puluhan, yaitu tujuh puluh.",
            "Delapan bungkus berarti delapan puluhan, yaitu delapan puluh.",
            "Sembilan bungkus berarti sembilan puluhan, yaitu sembilan puluh.",
            "Sepuluh bungkus berarti sepuluh puluhan, yaitu seratus. Jadi Pak Ahmad mempunyai seratus kue cubit.",
          ],
          papan: ["7 puluhan = 70", "8 puluhan = 80", "9 puluhan = 90", "10 puluhan = 100"],
        },
      ],
    },
    {
      id: "K2B7A-V2",
      judul: "Rambutan dan Kelereng",
      subjudul: "Puluhan dan satuan",
      adegan: [
        {
          id: "K2B7A-V2-1",
          judul: "Rambutan Halim",
          ketukan: [
            "Pohon rambutan di rumah Halim sedang berbuah. Hari ini Halim memanen buah rambutannya.",
            "Halim memasukkan rambutan ke dalam keranjang. Setiap keranjang berisi sepuluh rambutan, jadi satu keranjang adalah satu puluhan.",
            "Halim mempunyai lima keranjang penuh dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan.",
            "Lima puluhan dan tiga satuan sama dengan lima puluh tambah tiga, yaitu lima puluh tiga. Jadi Halim memiliki lima puluh tiga buah rambutan.",
          ],
          papan: ["Panen rambutan", "1 keranjang: 10 buah", "5 puluhan, 3 satuan", "50 + 3 = 53"],
        },
        {
          id: "K2B7A-V2-2",
          judul: "Kelereng ayah Malosi",
          ketukan: [
            "Malosi membantu ayahnya berjualan mainan. Ia memasukkan kelereng ke dalam kantong plastik.",
            "Setiap kantong berisi sepuluh kelereng. Satu kantong adalah satu puluhan.",
            "Ayah Malosi mempunyai enam kantong penuh dan tujuh kelereng lepas, jadi enam puluhan dan tujuh satuan.",
            "Enam puluh tambah tujuh sama dengan enam puluh tujuh. Jadi ayah Malosi memiliki enam puluh tujuh kelereng.",
          ],
          papan: ["Membantu ayah", "1 kantong: 10 kelereng", "6 puluhan, 7 satuan", "60 + 7 = 67"],
        },
        {
          id: "K2B7A-V2-3",
          judul: "Dua cara menulis",
          ketukan: [
            "Ada dua cara menentukan banyak benda. Cara pertama memakai nilai tempat: puluhan di kiri dan satuan di kanan.",
            "Lima puluhan dan tiga satuan ditulis dengan angka lima di tempat puluhan dan angka tiga di tempat satuan.",
            "Cara kedua memakai pasangan bilangan: lima puluh tiga terdiri dari lima puluh dan tiga.",
            "Kita membaca dari puluhan dulu: lima puluh tiga. Angka di tempat puluhan bernilai sepuluh kali lipat angka satuan.",
          ],
          papan: ["Dua cara", "Nilai tempat: 5 | 3", "Pasangan: 50 dan 3", "Baca puluhan dulu"],
        },
      ],
    },
    {
      id: "K2B7A-V3",
      judul: "Tebak Banyak Ikan",
      subjudul: "Memperkirakan lalu menghitung",
      adegan: [
        {
          id: "K2B7A-V3-1",
          judul: "Menebak banyak ikan",
          ketukan: [
            "Kira dan Malosi melihat banyak ikan hias di kolam. Mereka diminta menebak banyaknya.",
            "Kira menebak ada lima puluh ikan. Malosi menebak ada enam puluh ikan.",
            "Menebak boleh keliru. Menebak melatih kita memperkirakan banyak benda sebelum menghitung.",
          ],
          papan: ["Ikan hias di kolam", "Tebakan: 50 dan 60", "Menebak boleh keliru"],
        },
        {
          id: "K2B7A-V3-2",
          judul: "Kelompok sepuluh",
          ketukan: [
            "Ayo kita buktikan dengan menghitung. Kita mengelompokkan setiap sepuluh ikan.",
            "Satu kelompok berisi sepuluh ikan, jadi satu kelompok adalah satu puluhan.",
            "Ada enam kelompok dan dua ikan sisa. Itu enam puluhan dan dua satuan.",
            "Enam puluh tambah dua sama dengan enam puluh dua. Jadi banyak ikan adalah enam puluh dua.",
          ],
          papan: ["Kelompokkan sepuluh", "1 kelompok: 10 ikan", "6 puluhan, 2 satuan", "60 + 2 = 62"],
        },
        {
          id: "K2B7A-V3-3",
          judul: "Tebakan siapa yang dekat?",
          ketukan: [
            "Tebakan Kira lima puluh. Tebakan Malosi enam puluh. Banyak ikan sebenarnya enam puluh dua.",
            "Lima puluh berbeda dua belas dari enam puluh dua. Enam puluh berbeda dua dari enam puluh dua.",
            "Tebakan Malosi lebih dekat dengan banyak ikan yang sebenarnya.",
            "Menebak dengan membayangkan kelompok sepuluh membuat tebakan kita makin dekat.",
          ],
          papan: ["Sebenarnya 62 ikan", "Selisih 12 dan 2", "Malosi lebih dekat", "Bayangkan kelompok 10"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Dari Lima Puluh ke Seratus",
      stepDesc:
        "Di semester satu kita sudah belajar bilangan sampai lima puluh. Kali ini kita melanjutkan belajar bilangan sampai seratus. Caranya sama, yaitu mengelompokkan benda sepuluh-sepuluh, tetapi sekarang kita bisa menghitung lebih banyak benda. Pak Ahmad mempunyai sepuluh bungkus kue cubit, dan kita akan mencari tahu berapa banyak seluruhnya.",
      icon: "💯",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Sepuluh Satuan, Satu Puluhan",
      stepDesc:
        "Sepuluh satuan dikelompokkan menjadi satu puluhan. Sepuluh kue cubit dimasukkan ke dalam satu bungkus, jadi satu bungkus adalah satu puluhan. Satu kantong berisi sepuluh kelereng adalah satu puluhan, dan satu keranjang berisi sepuluh rambutan adalah satu puluhan. Apa pun wadahnya, bila isinya sepuluh, banyaknya adalah satu puluhan.",
      icon: "📦",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Menghitung Puluhan",
      stepDesc:
        "Kita menghitung puluhan dengan melompat sepuluh-sepuluh. Satu puluhan adalah sepuluh, dua puluhan adalah dua puluh, tiga puluhan adalah tiga puluh, dan seterusnya sampai sepuluh puluhan, yaitu seratus. Lima puluhan sama dengan lima puluh, enam puluhan sama dengan enam puluh, tujuh puluhan sama dengan tujuh puluh, delapan puluhan sama dengan delapan puluh, dan sembilan puluhan sama dengan sembilan puluh.",
      icon: "🔟",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Puluhan dan Satuan",
      stepDesc:
        "Banyak benda sering terdiri dari puluhan dan satuan. Halim mempunyai lima keranjang penuh dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan. Pada nilai tempat, angka di sebelah kiri adalah puluhan dan angka di sebelah kanan adalah satuan. Jadi lima puluhan dan tiga satuan ditulis dengan angka lima di puluhan dan angka tiga di satuan, yaitu lima puluh tiga.",
      icon: "🧺",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Pasangan Bilangan",
      stepDesc:
        "Cara kedua menentukan banyak benda memakai pasangan bilangan. Bilangan lima puluh tiga dipecah menjadi lima puluh dan tiga. Bilangan enam puluh tujuh dipecah menjadi enam puluh dan tujuh. Bila kita menggabungkan kembali kedua bagian, kita memperoleh bilangan semula. Bagan pasangan bilangan membantu kita melihat bahwa bilangan besar tersusun dari puluhan dan satuan.",
      icon: "🧩",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Membaca dan Menulis Bilangan",
      stepDesc:
        "Untuk membaca bilangan kita mulai dari puluhannya. Angka enam di tempat puluhan dan angka dua di tempat satuan dibaca enam puluh dua. Delapan puluh tiga dan sembilan puluh dua dibaca dengan cara yang sama. Sepuluh puluhan dibaca seratus. Hati-hati dengan angka yang tertukar: enam puluh dua ditulis enam dua, bukan dua enam. Angka yang berbeda tempat bernilai berbeda.",
      icon: "🔤",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Memperkirakan Banyak Benda",
      stepDesc:
        "Sebelum menghitung kita boleh menebak banyaknya. Menebak dengan perkiraan yang baik melatih kita berpikir. Caranya, bayangkan satu kelompok berisi sepuluh benda, lalu perkirakan ada berapa kelompok seperti itu. Setelah menebak, kita buktikan dengan mengelompokkan setiap sepuluh dan menghitung puluhan dan satuannya. Tebakan yang paling dekat dengan hasil hitungan adalah tebakan yang paling baik.",
      icon: "🔭",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Tabel Seratus",
      stepDesc:
        "Bilangan sampai seratus dapat disusun dalam tabel sepuluh kolom. Bilangan di kolom yang sama selalu berselisih sepuluh. Turun satu baris berarti tambah sepuluh, dan naik satu baris berarti kurang sepuluh. Bilangan di sebelah kanan selalu satu lebihnya, dan bilangan di sebelah kiri selalu satu kurangnya. Bila ada kotak yang kosong, kita bisa menemukannya dari tetangganya.",
      icon: "🔢",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    {
      judul: "Sepuluh Satuan, Satu Puluhan",
      emoji: "📦",
      countNum: 2,
      countWord: "Dua",
      suara: "Sepuluh satuan sama dengan satu puluhan. Sepuluh kue cubit dalam satu bungkus adalah satu puluhan.",
    },
    {
      judul: "Menghitung Puluhan",
      emoji: "🔟",
      countNum: 10,
      countWord: "Sepuluh",
      suara: "Menghitung puluhan melompat sepuluh-sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, sembilan puluh, dan seratus.",
    },
    {
      judul: "Seratus",
      emoji: "💯",
      countNum: 2,
      countWord: "Dua",
      suara: "Sepuluh puluhan sama dengan seratus. Bilangan seratus dibaca seratus.",
    },
    {
      judul: "Puluhan dan Satuan",
      emoji: "🧺",
      countNum: 2,
      countWord: "Dua",
      suara: "Lima keranjang penuh dan tiga rambutan lepas adalah lima puluhan dan tiga satuan, yaitu lima puluh tiga.",
    },
    {
      judul: "Dua Cara Menentukan Banyak",
      emoji: "🧩",
      countNum: 2,
      countWord: "Dua",
      suara: "Dua cara menentukan banyak benda: nilai tempat dan pasangan bilangan. Lima puluh tiga sama dengan lima puluh tambah tiga.",
    },
    {
      judul: "Nama Bilangan",
      emoji: "🔤",
      countNum: 8,
      countWord: "Delapan",
      suara: "Nama puluhan: dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, dan sembilan puluh. Sesudah puluhan kita sebut satuannya, misalnya enam puluh dua.",
    },
    {
      judul: "Cara Memperkirakan",
      emoji: "🔭",
      countNum: 3,
      countWord: "Tiga",
      suara: "Tiga langkah memperkirakan. Satu, bayangkan sepuluh benda dalam satu kelompok. Dua, tebak berapa kelompok. Tiga, buktikan dengan menghitung.",
    },
    {
      judul: "Kelompokkan Setiap Sepuluh",
      emoji: "🐠",
      countNum: 3,
      countWord: "Tiga",
      suara: "Enam puluh dua ikan dikelompokkan sepuluh-sepuluh menjadi enam kelompok dan dua ikan sisa, yaitu enam puluhan dan dua satuan.",
    },
    {
      judul: "Tabel Seratus",
      emoji: "🔢",
      countNum: 2,
      countWord: "Dua",
      suara: "Pada tabel seratus, turun satu baris berarti tambah sepuluh, dan geser satu kotak ke kanan berarti tambah satu.",
    },
    {
      judul: "Tebakan yang Dekat",
      emoji: "🎯",
      countNum: 2,
      countWord: "Dua",
      suara: "Banyak ikan enam puluh dua. Tebakan enam puluh berbeda dua, tebakan lima puluh berbeda dua belas. Tebakan yang selisihnya lebih kecil lebih dekat.",
    },
  ],
  games: [
    C("fill-pack-of-ten", "Isi Bungkus Sepuluh", "hlm. 194–195 (10 kue cubit dimasukkan dalam 1 pembungkus; 10 satuan = 1 puluhan)", "Mengisi satu wadah dengan sepuluh benda dan memahami bahwa sepuluh satuan sama dengan satu puluhan.", "Tiga ronde: kue cubit dalam bungkus, kelereng dalam kantong, rambutan dalam keranjang. Siswa menekan tombol tambah satu per satu sampai wadah berisi sepuluh. Wadah yang penuh berubah hijau dan Suara Guru menyebut satu puluhan.", "Masukkan benda satu per satu sampai sepuluh.", "📦", 3),
    C("count-packs-tens", "Hitung Bungkus", "hlm. 195–197 (lima bungkus: 5 puluhan = 50, sampai 10 puluhan = 100)", "Menghitung banyak benda dari banyak wadah penuh berisi sepuluh.", "Tiga ronde, tiap ronde dua gambar wadah penuh (5 sampai 10 wadah). Siswa memilih banyak benda seluruhnya dari tiga pilihan kelipatan sepuluh. Kunci dihitung dari banyak wadah kali sepuluh.", "Hitung bungkusnya, lalu pilih banyak kuenya.", "🛍️", 6),
    C("match-packs-numerals", "Jodohkan Bungkus dan Bilangan", "hlm. 195–197 dan 206 (hubungkan dengan bilangan yang tepat)", "Menjodohkan banyak wadah penuh dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga gambar wadah (dua sampai sepuluh wadah) dan tiga lambang bilangan seperti 50 dan 70. Siswa mengetuk gambar lalu lambang yang cocok. Pasangan benar terkunci.", "Ketuk gambar, lalu ketuk bilangannya.", "🔗", 9),
    C("build-number-tens-ones", "Rakit Bilangan", "hlm. 198–199 (rambutan Halim dan kelereng ayah Malosi: puluhan dan satuan)", "Merakit sebuah bilangan dari wadah penuh dan benda lepas.", "Empat ronde: 53 rambutan, 67 kelereng, 74 kue cubit, 82 jeruk. Siswa menekan tambah wadah penuh (sepuluh) dan tambah benda lepas sampai banyaknya sama dengan bilangan. Sepuluh benda lepas otomatis masuk satu wadah.", "Tambah wadah penuh dan benda lepas sampai pas.", "🧺", 4),
    C("tie-bundles-of-ten", "Ikat Sepuluh", "hlm. 200–202 dan 214 (Ayo Mencoba: ikat setiap 10 lidi)", "Mengikat benda lepas sepuluh-sepuluh lalu menghitung seluruhnya.", "Tiga ronde: 23 lidi, 37 kelereng, 46 pensil warna. Siswa menekan Ikat sepuluh sampai tidak bisa lagi, lalu memilih banyak benda seluruhnya dari tiga pilihan.", "Ikat setiap sepuluh, lalu hitung semuanya.", "🎀", 3),
    C("guess-then-count", "Tebak dan Hitung", "hlm. 200–201 dan 207 (tebak banyak ikan lalu hitung)", "Memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan sepuluh-sepuluh.", "Tiga ronde: 62 ikan, 38 jeruk, 85 anggur. Siswa menebak dulu dengan memilih satu dari tiga tebakan (tidak ada yang salah). Benda lalu dikelompokkan sepuluh-sepuluh, dan siswa memilih banyak sebenarnya. Suara Guru menyebut selisih tebakan.", "Tebak dulu, lalu hitung per sepuluh.", "🐠", 3),
    C("memory-collection-numeral", "Memori Banyak Benda", "hlm. 198–199 (nilai tempat dan pasangan bilangan)", "Mencocokkan kumpulan benda dengan lambang bilangannya.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan benda berisi wadah penuh dan benda lepas, dan lambang bilangannya. Siswa membalik dua kartu.", "Balik dua kartu, cari benda dan bilangannya.", "🃏", 12),
    C("order-collections", "Urutkan Banyak Benda", "hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)", "Mengurutkan kumpulan benda dari yang paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde tiga atau empat keranjang bertanda huruf. Siswa mengetuk keranjang satu per satu menurut urutan banyaknya (dua ronde dari paling sedikit, satu dari paling banyak). Letak jawaban berpindah.", "Ketuk keranjang menurut banyaknya.", "📶", 3),
    C("sort-collections-fifty", "Pilah: Kurang atau Lebih dari 50", "hlm. 192 (semester satu sampai 50, kali ini sampai 100)", "Memilah kumpulan benda menurut kurang dari 50 atau lebih dari 50.", "Tiga ronde, tiap ronde enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Kurang dari 50 atau Lebih dari 50. Kunci dihitung dari banyak puluhan.", "Pilah kumpulan ke kotak yang tepat.", "🗂️", 3),
    C("find-bag-by-number", "Kantong Misterius", "hlm. 198–199 (banyak kelereng milik ayah Malosi)", "Menemukan kumpulan benda yang banyaknya sama dengan sebuah bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, misalnya 67, lalu mengetuk satu dari empat kumpulan benda yang banyaknya 67. Pengecoh: bilangan dengan angka tertukar (76) dan selisih satu atau sepuluh.", "Ketuk kumpulan yang banyaknya sama.", "🎒", 6),
    P("count-ten-bars", "Hitung Batang Puluhan", "hlm. 195–197 (menghitung puluhan sampai 100)", "Menghitung banyak puluhan dari model batang.", "Tiga ronde, tiap ronde dua soal. Gambar menampilkan beberapa batang sepuluh kotak. Siswa mengatur penghitung sampai sama dengan banyak batang, lalu menekan Periksa.", "Hitung batangnya, lalu tulis banyak puluhan.", "tens-model", 3, 2),
    P("find-model-by-number", "Cari Model Bilangan", "hlm. 198–199 (puluhan dan satuan pada nilai tempat)", "Menemukan model batang dan kotak yang sama dengan sebuah bilangan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat model batang puluhan dan kotak satuan. Pengecoh memuat angka tertukar dan selisih satu.", "Ketuk model yang sama dengan bilangan.", "base-ten-model", 3, 2),
    P("fill-place-value-board", "Isi Papan Nilai Tempat", "hlm. 198–199 dan 204–205 (puluhan dan satuan, lalu tulis bilangannya)", "Menuliskan bilangan pada papan nilai tempat dari model batang dan kotak.", "Empat soal. Gambar model menampilkan batang puluhan dan kotak satuan. Siswa mengatur angka puluhan dan angka satuan pada papan, lalu menekan Periksa.", "Atur angka puluhan dan satuan pada papan.", "place-value-board", 4, 1),
    P("match-model-numeral", "Jodohkan Model dan Bilangan", "hlm. 206 (hubungkan dengan bilangan yang tepat)", "Menjodohkan model batang dan kotak dengan lambang bilangannya.", "Tiga ronde, tiap ronde tiga model dan tiga lambang bilangan. Siswa mengetuk model lalu lambang yang cocok.", "Ketuk model, lalu ketuk bilangannya.", "base-ten-match", 3, 3),
    P("number-bond-fill", "Pasangan Bilangan", "hlm. 198–199 (cara 2: pasangan bilangan, 53 = 50 + 3)", "Melengkapi bagan pasangan bilangan.", "Tiga ronde, tiap ronde dua bagan. Satu bagian tersembunyi: bila total 67 dan satu bagian 60, bagian lain 7. Siswa memilih satu dari tiga pilihan angka.", "Lengkapi bagian yang hilang.", "number-bond", 3, 2),
    P("tens-number-line", "Garis Puluhan", "hlm. 195–197 (menghitung puluhan dengan melompat sepuluh-sepuluh)", "Melompat sepuluh-sepuluh pada garis puluhan.", "Tiga ronde, tiap ronde tiga soal pada garis 0, 10, 20, sampai 100. Siswa membaca mulai dan banyak lompatan, misalnya mulai 30 lompat 4 puluhan, lalu mengetuk bilangan pendaratan.", "Lompat sepuluh-sepuluh, lalu ketuk tempat mendarat.", "tens-line", 3, 3),
    P("complete-hundred-chart", "Lengkapi Tabel Seratus", "hlm. 209 (urutan bilangan 51 sampai 100 dengan kotak kosong)", "Melengkapi bilangan yang hilang pada tabel 51 sampai 100.", "Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Kotak yang menyala menunggu jawaban, dan siswa memilih satu dari tiga angka. Petunjuk menyebut bilangan tetangga.", "Isi kotak yang menyala dengan bilangan yang tepat.", "hundred-chart", 3, 4),
    P("order-models", "Urutkan Model", "hlm. 214 dan 222 (mengurutkan bilangan)", "Mengurutkan model batang dan kotak dari yang terkecil atau terbesar.", "Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah.", "Ketuk model menurut urutannya.", "base-ten-order", 3, 4),
    P("sort-models-by-tens", "Pilah Model menurut Puluhan", "hlm. 198–199 (banyak puluhan menentukan besar bilangan)", "Memilah model menurut banyak puluhannya.", "Tiga ronde, tiap ronde enam model dan tiga kotak berlabel banyak puluhan (misalnya 3, 5, dan 7). Siswa menyeret atau mengetuk model ke kotak yang tepat. Tiap kotak menerima dua model.", "Pilah model menurut banyak puluhannya.", "base-ten-sort", 3, 6),
    P("guess-dots-then-count", "Tebak Banyak Titik", "hlm. 200–201 (tebak lalu hitung)", "Memperkirakan banyak titik lalu menghitungnya dengan kelompok sepuluh.", "Tiga ronde: 47, 33, dan 76 titik. Siswa menebak dulu satu dari tiga tebakan, lalu titik dikelompokkan sepuluh-sepuluh dan siswa memilih banyak sebenarnya.", "Tebak dulu, lalu hitung per sepuluh.", "dot-estimate", 3, 1),
    A("match-words-numerals", "Jodohkan Puluhan, Satuan, dan Bilangan", "hlm. 206 nomor 3 (hubungkan dengan bilangan yang tepat)", "Menjodohkan kalimat puluhan dan satuan dengan lambang bilangan.", "Tiga ronde, tiap ronde tiga pasangan, misalnya 9 puluhan dan 2 satuan dengan 92. Siswa mengetuk kalimat, lalu lambang bilangan yang cocok.", "Ketuk kalimat, lalu ketuk bilangannya.", "92", "9 PULUHAN 2 SATUAN", "puluhan • satuan • bilangan"),
    A("complete-place-value-sentences", "Lengkapi Kalimat Puluhan dan Satuan", "hlm. 198–199 dan 204–205 (puluhan dan satuan sama dengan bilangan)", "Melengkapi kalimat puluhan dan satuan dengan bilangan yang tepat.", "Dua ronde, tiap ronde tiga kalimat, misalnya 6 puluhan dan 7 satuan sama dengan ... Siswa memilih satu dari tiga bilangan. Pengecoh memuat angka tertukar.", "Pilih bilangan yang tepat untuk bagian kosong.", "6 7 = 67", "PULUHAN SATUAN", "puluhan dan satuan sama dengan bilangan"),
    A("build-number-name-sentence", "Susun Nama dan Kalimat Bilangan", "hlm. 195–197 dan 208 (nama bilangan; tulis lambang bilangan)", "Menyusun kata menjadi kalimat tentang nama dan lambang bilangan.", "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "nama bilangan • lambang bilangan"),
    A("fill-place-value-table", "Isi Tabel Puluhan dan Satuan", "hlm. 204–205 dan 219–220 (puluhan dan satuan sama dengan)", "Mengisi tabel puluhan dan satuan dari lambang bilangan.", "Dua ronde dengan tabel berisi empat baris, misalnya bilangan 53 dengan 5 puluhan dan 3 satuan. Siswa mengetuk baris, lalu mengetuk kartu yang tepat.", "Isi tabel dengan kartu yang tepat.", "53", "TABEL", "bilangan • puluhan • satuan"),
    A("true-false-numbers", "Benar atau Salah: Bilangan", "hlm. 194–209 (puluhan, satuan, nama bilangan)", "Menilai pernyataan tentang puluhan, satuan, dan nama bilangan.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("choose-numeral-from-name", "Tulis Lambang dari Nama", "hlm. 208 nomor 5 dan 221 nomor 3 (tulis lambang bilangan sesuai dengan nama bilangannya)", "Memilih lambang bilangan yang sesuai dengan nama bilangan.", "Tiga ronde, tiap ronde dua soal, misalnya enam puluh dua. Siswa memilih satu dari tiga lambang. Pengecoh memuat angka tertukar (26) dan selisih satu.", "Baca nama bilangan, lalu pilih lambangnya.", "62", "ENAM PULUH DUA", "nama bilangan • lambang bilangan"),
    A("riddle-number-clues", "Detektif Bilangan", "hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)", "Menemukan sebuah bilangan dari dua atau tiga petunjuk.", "Empat soal. Siswa membaca petunjuk seperti puluhanku 7 dan satuanku 3, lalu memilih satu dari tiga bilangan. Hanya satu bilangan yang cocok dengan semua petunjuk.", "Baca semua petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-fill", "Peta Konsep Bilangan", "hlm. 192 (peta konsep: menghitung, membaca, dan menulis bilangan)", "Melengkapi peta konsep puluhan dan satuan serta membaca dan menulis bilangan.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "puluhan • satuan • bilangan"),
    A("order-numerals", "Urutkan Bilangan", "hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)", "Mengurutkan lambang bilangan dari yang paling kecil atau paling besar.", "Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 62, 26, 71, 17. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah.", "Ketuk bilangan menurut urutannya.", "17 < 26", "URUTKAN", "bandingkan puluhan dulu"),
    A("select-all-number-trait", "Ketuk Semua yang Cocok", "hlm. 198–199 dan 212–213 (puluhan dan satuan menentukan besar bilangan)", "Memilih semua bilangan yang memiliki ciri tertentu.", "Tiga ronde, tiap ronde enam bilangan dan satu ciri: punya 6 puluhan, satuannya 5, atau lebih besar dari 70. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "boleh lebih dari satu"),
  ],
  poin: [
    {
      ikon: "📦",
      nama: "Sepuluh satuan, satu puluhan",
      isi: "10 satuan = 1 puluhan",
      suara: "Sepuluh satuan sama dengan satu puluhan. Satu bungkus berisi sepuluh kue cubit adalah satu puluhan.",
    },
    {
      ikon: "🔟",
      nama: "Puluhan sampai seratus",
      isi: "10, 20, 30, sampai 100",
      suara: "Menghitung puluhan melompat sepuluh-sepuluh sampai sepuluh puluhan, yaitu seratus.",
    },
    {
      ikon: "🧺",
      nama: "Puluhan dan satuan",
      isi: "5 puluhan dan 3 satuan = 53",
      suara: "Lima puluhan dan tiga satuan sama dengan lima puluh tambah tiga, yaitu lima puluh tiga.",
    },
    {
      ikon: "🔤",
      nama: "Membaca dan menulis",
      isi: "puluhan di kiri, satuan di kanan",
      suara: "Angka di sebelah kiri adalah puluhan dan angka di sebelah kanan adalah satuan. Kita membaca puluhannya dulu.",
    },
    {
      ikon: "🔭",
      nama: "Memperkirakan",
      isi: "tebak, lalu kelompokkan sepuluh",
      suara: "Menebak banyak benda boleh keliru. Kita membuktikannya dengan mengelompokkan setiap sepuluh benda.",
    },
  ],
  poinSuara:
    "Ingat selalu! Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan seratus. Banyak benda terdiri dari puluhan dan satuan, misalnya lima puluhan dan tiga satuan sama dengan lima puluh tiga. Angka di kiri adalah puluhan dan angka di kanan adalah satuan. Kita boleh menebak banyak benda, lalu membuktikannya dengan mengelompokkan setiap sepuluh.",
  cara: {
    suara: "Cara menyebutkan. Lima puluhan dan tiga satuan sama dengan lima puluh tiga. Sebut puluhan, lalu satuan, lalu bilangannya.",
    potongan: [
      { teks: "puluhan", warna: "#BAE6FD" },
      { teks: "dan", warna: "#FFFFFF" },
      { teks: "satuan", warna: "#FDE68A" },
      { teks: "bilangan", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ambil satu genggam lidi atau stik es krim, tebak banyaknya, lalu ikat setiap sepuluh dan hitung puluhan dan satuannya. Tulis hasilnya dengan lambang bilangan dan baca dengan suara keras. Ceritakan juga bilangan yang paling kamu suka.",
  refleksi: [
    "Aku dapat menghitung banyak benda sampai dengan 100.",
    "Aku dapat membaca dan menulis bilangan sampai dengan 100.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Membandingkan bilangan                                        */
/* ====================================================================== */

export const SUB_B7: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Membandingkan Bilangan)",
  fullTitle: "Sub-Bab B: Membandingkan Bilangan",
  targetDescription:
    "Siswa menentukan bilangan yang lebih dari atau kurang dari bilangan lain dengan menghitung maju dan mundur pada garis bilangan, membandingkan dua bilangan dengan melihat banyak puluhan lebih dulu lalu satuannya, memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, serta mengurutkan tiga bilangan atau lebih dari yang paling kecil atau paling besar.",
  secondaryBg: "#DBEAFE",
  secondaryBorder: "#2563EB",
  secondaryText: "#1E3A8A",
  silabus: {
    teksSuara: `Kita belajar membandingkan bilangan. Kita menghitung maju dan mundur seperti kupu-kupu dan capung untuk mencari bilangan yang lebih dari dan kurang dari. Lalu kita membandingkan kelereng Halim dan Malosi dengan melihat banyak puluhan lebih dulu, dan satuannya bila puluhannya sama. Kita memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, lalu mengurutkan bilangan dari yang paling kecil. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membandingkan dua bilangan sampai 100 dengan memperhatikan puluhan dan satuan, menentukan bilangan yang lebih dari dan kurang dari bilangan lain, mengurutkan bilangan, serta menyampaikan alasannya dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab B hlm. 209–224).",
  },
  videos: [
    {
      id: "K2B7B-V1",
      judul: "Kupu-kupu dan Capung",
      subjudul: "Lebih dari dan kurang dari",
      adegan: [
        {
          id: "K2B7B-V1-1",
          judul: "Kupu-kupu di bilangan 58",
          ketukan: [
            "Lihat garis angka ini. Kupu-kupu berada di antara bilangan lima puluh tujuh dan lima puluh sembilan.",
            "Jadi kupu-kupu berada di bilangan lima puluh delapan.",
            "Kupu-kupu maju dua langkah ke depan. Kita menghitung maju: lima puluh sembilan, enam puluh.",
            "Jadi kupu-kupu berada di bilangan enam puluh. Dua lebihnya dari lima puluh delapan adalah enam puluh.",
          ],
          papan: ["Antara 57 dan 59", "Kupu-kupu di 58", "Maju dua langkah", "2 lebihnya dari 58: 60"],
        },
        {
          id: "K2B7B-V1-2",
          judul: "Capung di bilangan 75",
          ketukan: [
            "Sekarang amati capung. Capung berada di antara bilangan tujuh puluh empat dan tujuh puluh enam.",
            "Jadi capung berada di bilangan tujuh puluh lima.",
            "Capung mundur tiga langkah ke belakang. Kita menghitung mundur: tujuh puluh empat, tujuh puluh tiga, tujuh puluh dua.",
            "Jadi capung berada di bilangan tujuh puluh dua. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua.",
          ],
          papan: ["Antara 74 dan 76", "Capung di 75", "Mundur tiga langkah", "3 kurangnya dari 75: 72"],
        },
        {
          id: "K2B7B-V1-3",
          judul: "Lebih dari dan kurang dari",
          ketukan: [
            "Lebihnya berarti maju, dan kurangnya berarti mundur.",
            "Aku adalah bilangan. Aku dua lebihnya dari bilangan tujuh puluh enam. Aku adalah tujuh puluh delapan.",
            "Aku adalah bilangan. Aku satu kurangnya dari bilangan enam puluh tujuh. Aku adalah enam puluh enam.",
            "Garis bilangan membantu kita melompat maju dan mundur dengan teliti.",
          ],
          papan: ["Lebih: maju, kurang: mundur", "2 lebihnya dari 76: 78", "1 kurangnya dari 67: 66", "Garis bilangan membantu"],
        },
      ],
    },
    {
      id: "K2B7B-V2",
      judul: "Kelereng Halim dan Malosi",
      subjudul: "Siapa yang lebih banyak?",
      adegan: [
        {
          id: "K2B7B-V2-1",
          judul: "Lima puluh enam dan enam puluh lima",
          ketukan: [
            "Halim mempunyai lima puluh enam butir kelereng. Malosi memiliki enam puluh lima butir kelereng.",
            "Kelereng siapa yang lebih banyak? Kita masukkan kelereng ke dalam kantong, setiap kantong berisi sepuluh kelereng.",
            "Bilangan lima puluh enam mempunyai lima puluhan dan enam satuan. Bilangan enam puluh lima mempunyai enam puluhan dan lima satuan.",
            "Enam puluhan lebih banyak dari lima puluhan. Jadi bilangan enam puluh lima lebih besar dari lima puluh enam, dan kelereng Malosi lebih banyak.",
          ],
          papan: ["Halim 56, Malosi 65", "1 kantong: 10 kelereng", "56: 5 puluhan, 6 satuan", "65 lebih besar dari 56"],
        },
        {
          id: "K2B7B-V2-2",
          judul: "Puluhan yang sama",
          ketukan: [
            "Sekarang bandingkan bilangan lima puluh empat dan lima puluh delapan.",
            "Keduanya mempunyai lima puluhan. Karena puluhannya sama, kita lihat satuannya.",
            "Lima puluh empat mempunyai empat satuan, dan lima puluh delapan mempunyai delapan satuan.",
            "Delapan satuan lebih banyak dari empat satuan. Jadi lima puluh delapan lebih besar dari lima puluh empat.",
          ],
          papan: ["Banding 54 dan 58", "Puluhan sama: lihat satuan", "4 satuan dan 8 satuan", "58 lebih besar dari 54"],
        },
        {
          id: "K2B7B-V2-3",
          judul: "Kata perbandingan",
          ketukan: [
            "Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan.",
            "Enam puluh lima lebih besar dari lima puluh enam. Lima puluh enam lebih kecil dari enam puluh lima.",
            "Dua bilangan yang puluhan dan satuannya sama, adalah bilangan yang sama dengan.",
            "Kita juga dapat memakai tanda. Tanda itu selalu terbuka ke arah bilangan yang lebih besar.",
          ],
          papan: ["Tiga kata banding", "65 lebih besar dari 56", "Sama: sama dengan", "Tanda: > < ="],
        },
      ],
    },
    {
      id: "K2B7B-V3",
      judul: "Mengurutkan Bilangan",
      subjudul: "Dari yang paling kecil",
      adegan: [
        {
          id: "K2B7B-V3-1",
          judul: "Tiga bilangan",
          ketukan: [
            "Amati tiga bilangan ini: tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh.",
            "Bilangan tujuh puluh enam mempunyai tujuh puluhan dan enam satuan. Delapan puluh tiga mempunyai delapan puluhan dan tiga satuan. Lima puluh tujuh mempunyai lima puluhan dan tujuh satuan.",
            "Yang puluhannya paling banyak adalah delapan puluh tiga. Jadi delapan puluh tiga paling besar.",
            "Yang puluhannya paling sedikit adalah lima puluh tujuh. Jadi lima puluh tujuh paling kecil.",
          ],
          papan: ["76, 83, dan 57", "Lihat puluhannya", "83: puluhan terbanyak", "57: puluhan tersedikit"],
        },
        {
          id: "K2B7B-V3-2",
          judul: "Dari yang paling kecil",
          ketukan: [
            "Sekarang urutkan bilangan dari yang paling kecil.",
            "Pertama lima puluh tujuh, karena puluhannya paling sedikit.",
            "Kedua tujuh puluh enam, lalu ketiga delapan puluh tiga.",
            "Urutannya dari yang paling kecil adalah lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.",
          ],
          papan: ["Urutkan dari terkecil", "Pertama: 57", "Kedua: 76, ketiga: 83", "57, 76, 83"],
        },
        {
          id: "K2B7B-V3-3",
          judul: "Teka-teki Kira",
          ketukan: [
            "Kira menuliskan satu bilangan. Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya adalah lima puluh lima.",
            "Kita mundur dulu. Lima puluh lima adalah lima puluhan dan lima satuan.",
            "Empat puluhan kita kurangi dari lima puluhan, tinggal satu puluhan. Tiga satuan kita kurangi dari lima satuan, tinggal dua satuan.",
            "Jadi bilangan yang ditulis Kira adalah satu puluhan dan dua satuan, yaitu dua belas.",
          ],
          papan: ["Teka-teki Kira", "55: 5 puluhan, 5 satuan", "Kurangi 4 puluhan, 3 satuan", "Bilangan Kira: 12"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Garis Bilangan",
      stepDesc:
        "Garis bilangan menunjukkan bilangan berurutan dari kiri ke kanan. Bilangan di sebelah kanan lebih besar dan bilangan di sebelah kiri lebih kecil. Kupu-kupu berada di antara lima puluh tujuh dan lima puluh sembilan, jadi ia berada di lima puluh delapan. Dengan garis bilangan kita bisa menemukan bilangan yang hilang dengan melihat tetangganya.",
      icon: "📏",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Menghitung Maju",
      stepDesc:
        "Menghitung maju berarti bergerak ke kanan pada garis bilangan, dan kita memakainya untuk mencari bilangan yang lebihnya. Kupu-kupu di lima puluh delapan maju dua langkah: lima puluh sembilan, enam puluh. Jadi dua lebihnya dari lima puluh delapan adalah enam puluh. Setiap langkah menambah satu.",
      icon: "➡️",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Menghitung Mundur",
      stepDesc:
        "Menghitung mundur berarti bergerak ke kiri pada garis bilangan, dan kita memakainya untuk mencari bilangan yang kurangnya. Capung di tujuh puluh lima mundur tiga langkah: tujuh puluh empat, tujuh puluh tiga, tujuh puluh dua. Jadi tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua. Setiap langkah mengurangi satu.",
      icon: "⬅️",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Bandingkan Puluhan Dulu",
      stepDesc:
        "Untuk membandingkan dua bilangan, lihat banyak puluhannya lebih dulu. Lima puluh enam mempunyai lima puluhan dan enam puluh lima mempunyai enam puluhan. Enam puluhan lebih banyak dari lima puluhan, jadi enam puluh lima lebih besar. Puluhan menentukan besar bilangan karena satu puluhan bernilai sepuluh satuan.",
      icon: "🔟",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Puluhan Sama, Lihat Satuan",
      stepDesc:
        "Bila banyak puluhannya sama, kita membandingkan satuannya. Lima puluh empat dan lima puluh delapan sama-sama punya lima puluhan. Satuan delapan lebih banyak dari satuan empat, jadi lima puluh delapan lebih besar dari lima puluh empat. Bila puluhan dan satuannya sama, kedua bilangan sama besar.",
      icon: "🔍",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Kata dan Tanda Perbandingan",
      stepDesc:
        "Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan. Enam puluh lima lebih besar dari lima puluh enam. Lima puluh enam lebih kecil dari enam puluh lima. Tanda lebih besar, tanda lebih kecil, dan tanda sama dengan menuliskan kata itu dengan singkat. Tanda lebih besar dan lebih kecil selalu terbuka ke arah bilangan yang lebih besar.",
      icon: "⚖️",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Mengurutkan Bilangan",
      stepDesc:
        "Untuk mengurutkan tiga bilangan atau lebih, bandingkan puluhannya. Bilangan yang puluhannya paling banyak adalah yang paling besar, dan bilangan yang puluhannya paling sedikit adalah yang paling kecil. Dari tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh, urutan dari yang paling kecil adalah lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.",
      icon: "📶",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Teka-Teki Bilangan",
      stepDesc:
        "Kita dapat membuat dan memecahkan teka-teki bilangan. Aku adalah bilangan, aku dua lebihnya dari tujuh puluh enam, jadi aku tujuh puluh delapan. Aku satu kurangnya dari enam puluh tujuh, jadi aku enam puluh enam. Untuk teka-teki Kira, kita mundur dari hasil: lima puluh lima dikurangi empat puluhan dan tiga satuan menjadi dua belas. Membuat teka-teki sendiri melatih kita berpikir teliti.",
      icon: "🧠",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    {
      judul: "Garis Bilangan",
      emoji: "📏",
      countNum: 2,
      countWord: "Dua",
      suara: "Pada garis bilangan, bilangan di kanan lebih besar dan bilangan di kiri lebih kecil.",
    },
    {
      judul: "Lebihnya dan Kurangnya",
      emoji: "↔️",
      countNum: 2,
      countWord: "Dua",
      suara: "Dua lebihnya dari lima puluh delapan adalah enam puluh, karena maju dua langkah. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua, karena mundur tiga langkah.",
    },
    {
      judul: "Bandingkan Puluhan Dulu",
      emoji: "🔟",
      countNum: 2,
      countWord: "Dua",
      suara: "Lima puluh enam punya lima puluhan dan enam puluh lima punya enam puluhan. Puluhan yang lebih banyak berarti bilangan yang lebih besar.",
    },
    {
      judul: "Puluhan Sama, Lihat Satuan",
      emoji: "🔍",
      countNum: 2,
      countWord: "Dua",
      suara: "Lima puluh empat dan lima puluh delapan sama-sama punya lima puluhan. Kita lihat satuannya: delapan lebih banyak dari empat.",
    },
    {
      judul: "Tiga Kata Perbandingan",
      emoji: "🔤",
      countNum: 3,
      countWord: "Tiga",
      suara: "Tiga kata perbandingan adalah lebih besar dari, lebih kecil dari, dan sama dengan.",
    },
    {
      judul: "Tiga Tanda Perbandingan",
      emoji: "🐊",
      countNum: 3,
      countWord: "Tiga",
      suara: "Tanda lebih besar, tanda lebih kecil, dan tanda sama dengan. Tanda lebih besar dan lebih kecil terbuka ke arah bilangan yang lebih besar.",
    },
    {
      judul: "Mengurutkan Tiga Bilangan",
      emoji: "📶",
      countNum: 3,
      countWord: "Tiga",
      suara: "Urutan dari yang paling kecil: lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.",
    },
    {
      judul: "Paling Besar, Paling Kecil",
      emoji: "🏆",
      countNum: 2,
      countWord: "Dua",
      suara: "Bilangan yang puluhannya paling banyak adalah yang paling besar. Bilangan yang puluhannya paling sedikit adalah yang paling kecil.",
    },
    {
      judul: "Kartu Bilangan",
      emoji: "🃏",
      countNum: 2,
      countWord: "Dua",
      suara: "Dengan dua kartu tiga dan tujuh, bilangan terbesar adalah tujuh puluh tiga dan bilangan terkecil adalah tiga puluh tujuh. Kartu yang lebih besar ditaruh di tempat puluhan untuk bilangan terbesar.",
    },
    {
      judul: "Teka-Teki Kira",
      emoji: "🧠",
      countNum: 3,
      countWord: "Tiga",
      suara: "Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya lima puluh lima. Kita mundur, dan bilangan Kira adalah dua belas.",
    },
  ],
  games: [
    C("step-forward-backward", "Maju dan Mundur", "hlm. 209–210 (kupu-kupu maju dua langkah, capung mundur tiga langkah)", "Menentukan bilangan yang lebih dari atau kurang dari dengan menghitung maju dan mundur.", "Tiga ronde, tiap ronde dua soal, misalnya kupu-kupu di 58 maju dua langkah, capung di 75 mundur tiga langkah. Siswa menekan Maju atau Mundur satu langkah demi satu langkah pada garis angka. Bila melewati perintah, tekan Ulang.", "Maju atau mundur sesuai perintah.", "🦋", 6),
    C("find-between-number", "Di Mana Aku?", "hlm. 209–210 (kupu-kupu berada di antara 57 dan 59)", "Menemukan bilangan yang berada di antara dua bilangan.", "Tiga ronde, tiap ronde tiga soal, misalnya aku berada di antara 74 dan 76. Siswa mengetuk bilangan itu pada garis angka. Letak jawaban berpindah di garis.", "Ketuk bilangan yang berada di antaranya.", "📍", 9),
    C("compare-collections-names", "Siapa Lebih Banyak?", "hlm. 211–212 (kelereng Halim dan Malosi)", "Membandingkan banyak benda milik dua anak.", "Tiga ronde, tiap ronde dua soal. Dua anak punya kumpulan kelereng berisi kantong penuh dan kelereng lepas, misalnya Halim 56 dan Malosi 65. Siswa memilih siapa yang lebih banyak atau sama banyak.", "Lihat kantongnya, lalu pilih yang lebih banyak.", "⚖️", 6),
    C("tap-most-least", "Ketuk yang Paling Banyak dan Paling Sedikit", "hlm. 214 (bilangan yang paling besar dan paling kecil)", "Menemukan kumpulan benda yang paling banyak dan paling sedikit.", "Tiga ronde, tiap ronde tiga kumpulan benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya. Letak kunci berpindah.", "Ketuk kumpulan yang paling banyak atau sedikit.", "🏆", 6),
    C("two-cards-biggest-smallest", "Susun Dua Kartu", "hlm. 215 (Ayo Mencoba: kartu bilangan 1–9 dan papan nilai tempat)", "Menyusun dua kartu angka menjadi bilangan terbesar atau terkecil.", "Empat ronde: kartu 3 dan 7, 5 dan 2, 8 dan 6, 4 dan 9. Siswa mengetuk kartu lalu mengetuk tempat puluhan atau satuan. Susunan yang salah diberi petunjuk dan kartu kembali.", "Ketuk kartu, lalu ketuk tempatnya.", "🔢", 4),
    C("order-three-collections", "Urutkan Tiga Kantong", "hlm. 214 (urutkan tiga bilangan dari yang paling kecil)", "Mengurutkan tiga kumpulan benda dari yang paling sedikit atau paling banyak.", "Tiga ronde, tiap ronde tiga kantong bertanda huruf, misalnya 76, 83, dan 57. Siswa mengetuk kantong satu per satu menurut urutan banyaknya.", "Ketuk kantong menurut urutan banyaknya.", "📶", 3),
    C("match-pair-relation", "Jodohkan Kiri dan Kanan", "hlm. 212–213 (membandingkan dua bilangan)", "Menjodohkan dua kumpulan benda dengan pernyataan perbandingannya.", "Tiga ronde, tiap ronde tiga pasang kumpulan benda dan tiga pernyataan: kiri lebih banyak, sama banyak, dan kanan lebih banyak. Siswa mengetuk pasangan, lalu pernyataan yang cocok.", "Ketuk pasangan, lalu ketuk pernyataannya.", "↔️", 9),
    C("memory-compare-numbers", "Memori Banyak Benda", "hlm. 212–213 (bilangan dan puluhan satuannya)", "Mencocokkan kumpulan benda dengan lambang bilangannya.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan benda dan lambang bilangannya. Siswa membalik dua kartu.", "Balik dua kartu, cari benda dan bilangannya.", "🃏", 12),
    C("sort-more-less-reference", "Pilah: Lebih atau Kurang dari Acuan", "hlm. 216 (lingkari bilangan yang lebih besar)", "Memilah kumpulan benda yang lebih banyak dan yang lebih sedikit dari sebuah acuan.", "Tiga ronde, tiap ronde satu bilangan acuan (60, 75, 40) dan enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Lebih dari acuan atau Kurang dari acuan.", "Pilah kumpulan ke kotak yang tepat.", "🗂️", 3),
    C("select-all-more-than", "Ketuk Semua yang Memenuhi", "hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)", "Memilih semua kumpulan benda yang lebih banyak atau lebih sedikit dari sebuah acuan.", "Tiga ronde, tiap ronde enam kumpulan benda dan satu perintah, misalnya lebih dari 65. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.", "Ketuk semua yang memenuhi, lalu periksa.", "✅", 3),
    P("number-line-between-more-less", "Garis Bilangan: Antara, Lebih, Kurang", "hlm. 209–210 (di antara, lebih dari, dan kurang dari pada garis bilangan)", "Menemukan bilangan di antara, yang lebihnya, dan yang kurangnya pada garis bilangan.", "Tiga ronde, tiap ronde tiga soal: di antara dua bilangan, sekian lebihnya, dan sekian kurangnya. Siswa mengetuk bilangan yang tepat pada garis bilangan.", "Ketuk bilangan yang diminta pada garis.", "number-line", 3, 3),
    P("compare-place-value-boards", "Bandingkan Dua Papan", "hlm. 212–213 (bandingkan puluhan lalu satuan)", "Membandingkan dua bilangan pada dua papan nilai tempat.", "Tiga ronde, tiap ronde dua soal. Dua papan nilai tempat A dan B ditampilkan, dan siswa memilih papan yang lebih besar atau sama besar.", "Bandingkan puluhan dulu, lalu satuannya.", "place-value-compare", 3, 2),
    P("order-boards", "Urutkan Papan", "hlm. 214 dan 222 (urutkan bilangan)", "Mengurutkan papan nilai tempat dari bilangan terkecil atau terbesar.", "Tiga ronde, tiap ronde tiga atau empat papan. Siswa mengetuk papan satu per satu menurut urutan.", "Ketuk papan menurut urutan bilangannya.", "board-order", 3, 3),
    P("tap-bigger-model", "Ketuk Model Terbesar dan Terkecil", "hlm. 214 (bilangan paling besar dan paling kecil)", "Menemukan model batang dan kotak yang paling besar dan paling kecil.", "Tiga ronde, tiap ronde tiga model dan dua pertanyaan: terbesar, lalu terkecil. Siswa mengetuk modelnya.", "Ketuk model yang terbesar atau terkecil.", "model-pick", 3, 2),
    P("sort-models-reference", "Pilah Model terhadap Acuan", "hlm. 216 (lebih besar dan lebih kecil dari sebuah bilangan)", "Memilah model menurut lebih besar atau lebih kecil dari bilangan acuan.", "Tiga ronde, tiap ronde bilangan acuan (50, 30, 80) dan enam model. Siswa menyeret atau mengetuk model ke kotak yang tepat.", "Pilah model ke kotak yang tepat.", "model-sort", 3, 6),
    P("match-boards-symbol", "Jodohkan Papan dan Tanda", "hlm. 212–213 (lebih besar, lebih kecil, sama dengan)", "Menjodohkan dua papan dengan tanda perbandingan yang tepat.", "Tiga ronde, tiap ronde tiga pasang papan dan tiga kartu tanda lebih besar, lebih kecil, dan sama dengan. Siswa mengetuk pasangan papan lalu kartu tandanya.", "Ketuk pasangan papan, lalu ketuk tandanya.", "symbol-match", 3, 3),
    P("hundred-chart-neighbors", "Tetangga di Tabel Seratus", "hlm. 209 (tabel bilangan 51 sampai 100)", "Menemukan bilangan yang hilang pada tabel seratus dari bilangan tetangganya.", "Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Siswa memilih satu dari tiga angka untuk kotak yang menyala.", "Isi kotak yang menyala dengan bilangan yang tepat.", "hundred-chart", 3, 4),
    P("step-on-diagram-line", "Langkah pada Garis Diagram", "hlm. 210 (maju dua langkah, mundur tiga langkah)", "Maju dan mundur satu langkah pada garis bilangan diagram.", "Tiga ronde, tiap ronde dua soal. Bulatan penanda berada di sebuah bilangan, dan siswa menekan Maju atau Mundur sesuai perintah.", "Maju atau mundur sesuai perintah.", "step-line", 3, 2),
    P("memory-boards-numerals", "Memori Papan dan Bilangan", "hlm. 212–213 (bilangan dan puluhan satuannya)", "Mencocokkan papan nilai tempat dengan lambang bilangannya.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): papan nilai tempat dan lambang bilangannya.", "Balik dua kartu, cari papan dan bilangannya.", "board-memory", 3, 4),
    P("select-all-models-reference", "Ketuk Semua Model terhadap Acuan", "hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)", "Memilih semua model yang lebih besar atau lebih kecil dari sebuah acuan.", "Tiga ronde, tiap ronde enam model dan satu perintah, misalnya lebih besar dari 60. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.", "Ketuk semua model yang memenuhi, lalu periksa.", "model-select", 3, 6),
    A("complete-compare-sentences", "Lengkapi Kalimat Banding", "hlm. 212–213 (bilangan 65 lebih besar dari bilangan 56)", "Melengkapi kalimat perbandingan dua bilangan dengan kata yang tepat.", "Dua ronde, tiap ronde tiga kalimat, misalnya bilangan 58 ... bilangan 54. Siswa memilih lebih besar dari, lebih kecil dari, atau sama dengan. Kalimat lengkap dibacakan.", "Pilih kata yang tepat untuk bagian kosong.", ">  <  =", "LEBIH BESAR DARI", "lebih besar • lebih kecil • sama dengan"),
    A("true-false-compare", "Benar atau Salah: Perbandingan", "hlm. 209–217 (membandingkan dan lebih dari, kurang dari)", "Menilai pernyataan tentang perbandingan, lebihnya, dan kurangnya.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("build-compare-sentence", "Susun Kalimat Banding", "hlm. 209–213 (kalimat perbandingan dan menghitung maju mundur)", "Menyusun kata menjadi kalimat tentang perbandingan dan langkah maju atau mundur.", "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • makna"),
    A("riddle-i-am-a-number", "Aku Adalah Bilangan", "hlm. 217 nomor 4 dan 5 (aku dua lebihnya dari 76; aku satu kurangnya dari 67)", "Menemukan bilangan dari petunjuk lebihnya atau kurangnya.", "Tiga ronde, tiap ronde dua soal, misalnya aku dua lebihnya dari bilangan 76. Siswa memilih satu dari tiga bilangan.", "Baca teka-tekinya, lalu pilih bilangannya.", "76 + 2", "AKU BILANGAN APA?", "lebihnya • kurangnya"),
    A("fill-more-less-table", "Tabel Lebihnya dan Kurangnya", "hlm. 209–210 (2 lebihnya dari 58; 3 kurangnya dari 75)", "Mengisi tabel bilangan yang sekian lebihnya atau kurangnya.", "Dua ronde dengan tabel berisi empat baris: 2 lebihnya dari bilangan dan 3 kurangnya dari bilangan. Siswa mengetuk baris, lalu mengetuk kartu angka.", "Isi tabel dengan kartu angka.", "58 → 60", "TABEL", "lebihnya • kurangnya"),
    A("write-two-digits", "Tulis Dua Angka", "hlm. 208 dan 217 (tulis lambang bilangan)", "Menuliskan bilangan hasil lebihnya atau kurangnya pada papan dua angka.", "Tiga ronde, tiap ronde dua soal, misalnya satu kurangnya dari 80. Siswa mengatur angka puluhan dan angka satuan, lalu menekan Periksa.", "Atur angka puluhan dan satuan, lalu periksa.", "7 9", "TULIS BILANGAN", "puluhan • satuan"),
    A("riddle-number-clues-compare", "Detektif Bilangan Besar Kecil", "hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)", "Menemukan bilangan dari petunjuk lebih besar, lebih kecil, puluhan, dan satuan.", "Empat soal. Siswa membaca tiga petunjuk, misalnya aku lebih besar dari 65, lebih kecil dari 70, dan satuanku 8, lalu memilih satu dari tiga bilangan.", "Baca semua petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "tiga petunjuk, satu jawaban"),
    A("concept-map-fill", "Peta Konsep Banding", "hlm. 192 (peta konsep: membandingkan bilangan; lebih dari dan kurang dari)", "Melengkapi peta konsep membandingkan dua bilangan serta lebih dari dan kurang dari.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "banding • lebih • kurang"),
    A("order-numerals", "Urutkan Lima Bilangan", "hlm. 214 dan 222 nomor 5 (urutkan bilangan mulai dari yang paling kecil)", "Mengurutkan empat atau lima bilangan dari yang paling kecil atau paling besar.", "Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 65, 71, 56, 79, 60. Siswa mengetuk bilangan satu per satu menurut urutan.", "Ketuk bilangan menurut urutannya.", "56 < 60", "URUTKAN", "bandingkan puluhan dulu"),
    A("select-all-compare-reference", "Ketuk Semua terhadap Acuan", "hlm. 216–217 (lingkari bilangan yang lebih besar)", "Memilih semua bilangan yang lebih besar atau lebih kecil dari sebuah acuan.", "Tiga ronde, tiap ronde enam bilangan dan satu perintah, misalnya lebih besar dari 55. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.", "Ketuk semua yang memenuhi, lalu periksa.", "✔✔", "SEMUA BENAR", "boleh lebih dari satu"),
  ],
  poin: [
    {
      ikon: "📏",
      nama: "Garis bilangan",
      isi: "kanan lebih besar, kiri lebih kecil",
      suara: "Pada garis bilangan, bilangan di sebelah kanan lebih besar dan bilangan di sebelah kiri lebih kecil.",
    },
    {
      ikon: "↔️",
      nama: "Lebihnya dan kurangnya",
      isi: "maju untuk lebih, mundur untuk kurang",
      suara: "Menghitung maju untuk mencari lebihnya, dan menghitung mundur untuk mencari kurangnya.",
    },
    {
      ikon: "🔟",
      nama: "Bandingkan puluhan dulu",
      isi: "puluhan sama, lihat satuan",
      suara: "Untuk membandingkan dua bilangan, lihat puluhannya lebih dulu. Bila puluhannya sama, lihat satuannya.",
    },
    {
      ikon: "⚖️",
      nama: "Kata perbandingan",
      isi: "lebih besar, lebih kecil, sama dengan",
      suara: "Kata perbandingan bilangan adalah lebih besar dari, lebih kecil dari, dan sama dengan.",
    },
    {
      ikon: "📶",
      nama: "Mengurutkan bilangan",
      isi: "dari yang paling kecil",
      suara: "Untuk mengurutkan bilangan, bandingkan puluhannya. Puluhan paling sedikit adalah bilangan paling kecil.",
    },
  ],
  poinSuara:
    "Ingat selalu! Pada garis bilangan, bilangan di kanan lebih besar. Menghitung maju mencari lebihnya dan menghitung mundur mencari kurangnya. Untuk membandingkan dua bilangan, lihat puluhannya lebih dulu, lalu satuannya bila puluhannya sama. Kita memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, lalu mengurutkan bilangan dari yang paling kecil.",
  cara: {
    suara: "Cara menyebutkan. Enam puluh lima lebih besar dari lima puluh enam. Sebut bilangan pertama, kata perbandingan, lalu bilangan kedua.",
    potongan: [
      { teks: "Bilangan", warna: "#FFFFFF" },
      { teks: "kata perbandingan", warna: "#FFE566" },
      { teks: "dari", warna: "#FFFFFF" },
      { teks: "bilangan lain", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ambil dua kartu bilangan dari satu sampai sembilan, susun menjadi bilangan dua angka, lalu bandingkan dengan bilangan temanmu. Ceritakan bilangan siapa yang lebih besar dan mengapa. Buat juga satu teka-teki, aku adalah bilangan yang satu kurangnya dari bilangan tertentu, lalu minta temanmu menjawabnya.",
  refleksi: [
    "Aku dapat membandingkan dua bilangan.",
    "Aku dapat mengurutkan bilangan sampai dengan 100.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

export const SUB_BAB_K2B7: SubBabNaskah[] = [SUB_A7, SUB_B7];

/** Semua adegan video (untuk uji panjang ketukan dan papan). */
export const semuaAdeganK2B7 = SUB_BAB_K2B7.flatMap((s) => s.videos.flatMap((v) => v.adegan));
