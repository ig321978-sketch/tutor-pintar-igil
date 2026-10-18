"use client";

import { useRef, useState } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";

type NamaTokoh = "Pak Bima" | "Lala" | "Rio" | "Cika" | "Kak Nara";
type BarisDialog = { nama: NamaTokoh; teks: string };
type KuisSuara = { tanya: string; alias: string[]; kunci: string };
type KuisKanvas = {
  tanya: string;
  kelompok: string[][];
  kunci: string;
  periksa?: (teks: string) => boolean;
};
type Pilihan = { huruf: string; teks: string };
type Permainan =
  | { jenis: "pilih"; id: string; tanya: string; opsi: Pilihan[]; benar: string; umpan: string }
  | { jenis: "cocok"; id: string; tanya: string; pasangan: { kiri: string; kanan: string }[]; umpan: string }
  | { jenis: "susun"; id: string; tanya: string; langkah: { kode: string; teks: string }[]; urutan: string[]; umpan: string }
  | { jenis: "benarSalah"; id: string; tanya: string; benar: boolean; umpan: string }
  | { jenis: "suara"; id: string; tanya: string; alias: string[]; umpan: string }
  | { jenis: "tulis"; id: string; tanya: string; kelompok: string[][]; umpan: string }
  | { jenis: "kanvas"; id: string; tanya: string; kelompok: string[][]; umpan: string; periksa?: (teks: string) => boolean };

const WAJAH: Record<NamaTokoh, string> = {
  "Pak Bima": "👨‍🏫",
  Lala: "👧",
  Rio: "👦",
  Cika: "🧒",
  "Kak Nara": "🦉",
};

const WARNA: Record<NamaTokoh, string> = {
  "Pak Bima": "border-[#16A34A]/20 bg-[#F0FDF4]",
  Lala: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Rio: "border-amber-300 bg-amber-50",
  Cika: "border-[#2563EB]/20 bg-[#EFF6FF]",
  "Kak Nara": "border-amber-300 bg-amber-50",
};

const ADEGAN: {
  id: string;
  judul: string;
  suara: string;
  figur: "skala" | "roda" | "hujan";
  dialog: BarisDialog[];
  suaraKuis: KuisSuara;
  kanvas: KuisKanvas;
}[] = [
  {
    id: "a1",
    judul: "Adegan 1 · Gerbang Karnaval",
    suara: "Selamat datang di Karnaval Kota Ceria! Sebelum masuk, kita belajar skala peluang. Peluang itu seberapa mungkin sebuah kejadian terjadi. Ada lima tingkat: mustahil, kecil, seimbang, besar, dan pasti.",
    figur: "skala",
    dialog: [
      { nama: "Lala", teks: "Kak Nara, aku mau main lempar koin. Dapat gambar atau angka, ya?" },
      { nama: "Kak Nara", teks: "Huu-huu! Koin punya 2 sisi yang sama mungkin muncul. Peluangnya seimbang." },
      { nama: "Rio", teks: "Kalau melempar dadu biasa lalu muncul angka 8?" },
      { nama: "Pak Bima", teks: "Dadu biasa hanya punya angka 1 sampai 6. Angka 8 itu mustahil. Peluangnya 0." },
      { nama: "Cika", teks: "Kalau dadu itu muncul angka kurang dari 7?" },
      { nama: "Pak Bima", teks: "Semua angka 1 sampai 6 memang kurang dari 7. Itu pasti. Peluangnya 1." },
      { nama: "Rio", teks: "Aku ambil satu bola dari kotak berisi 9 bola merah dan 1 bola biru. Dapat bola merah?" },
      { nama: "Lala", teks: "Merah jauh lebih banyak! Peluangnya besar." },
      { nama: "Cika", teks: "Berarti kalau mau bola biru, peluangnya kecil!" },
      { nama: "Kak Nara", teks: "Betul! Makin banyak hasil yang kita mau, makin besar peluangnya." },
    ],
    suaraKuis: {
      tanya: "Besok matahari terbit dari timur. Skala peluangnya apa?",
      alias: ["pasti"],
      kunci: "Pasti. Matahari terbit dari timur.",
    },
    kanvas: {
      tanya: "Gambar garis skala. Tulis tempat yang tepat: (a) dadu biasa muncul angka 8, (b) koin muncul angka, (c) bola merah dari 9 merah dan 1 biru.",
      kelompok: [
        ["mustahil", "angka 8"],
        ["seimbang", "tengah"],
        ["besar"],
      ],
      kunci: "Angka 8 mustahil. Koin seimbang. Bola merah peluangnya besar, yaitu 9 dari 10.",
    },
  },
  {
    id: "a2",
    judul: "Adegan 2 · Wahana Roda Putar",
    suara: "Di wahana roda putar, kamu menang kalau panah berhenti di warna pilihanmu. Peluang dihitung dengan membandingkan banyak hasil yang kita mau dengan semua hasil yang mungkin. Warna yang sektornya lebih banyak, peluangnya lebih besar.",
    figur: "roda",
    dialog: [
      { nama: "Rio", teks: "Rodanya punya 8 sektor. Merah ada 4, biru 3, kuning 1." },
      { nama: "Lala", teks: "Aku pilih kuning! Hadiahnya paling bagus!" },
      { nama: "Cika", teks: "Tunggu dulu. Peluang kuning itu 1 dari 8. Peluang merah 4 dari 8." },
      { nama: "Pak Bima", teks: "Betul. Kita tulis sebagai pecahan: merah = 4/8 = 1/2, biru = 3/8, kuning = 1/8." },
      { nama: "Rio", teks: "Penyebutnya sama, jadi tinggal bandingkan pembilangnya. Merah 4 lebih besar dari biru 3, dan biru lebih besar dari kuning 1." },
      { nama: "Kak Nara", teks: "Kalau penyebutnya beda, samakan dulu. Bandingkan 3/5 dan 1/2: 3/5 = 6/10 dan 1/2 = 5/10. Jadi 3/5 lebih besar." },
      { nama: "Lala", teks: "Wah, kuning peluangnya kecil. Aku ganti pilih merah!" },
    ],
    suaraKuis: {
      tanya: "Roda punya 8 sektor, 4 sektor merah. Berapa peluang panah berhenti di merah?",
      alias: ["4 8", "setengah", "1 2", "empat per delapan"],
      kunci: "4/8, atau 1/2.",
    },
    kanvas: {
      tanya: "Roda punya 10 sektor: 5 merah, 3 biru, 2 kuning. Tulis peluang tiap warna, lalu sebut warna dengan peluang terbesar.",
      kelompok: [
        ["5 10", "1 2", "setengah"],
        ["3 10"],
        ["2 10", "1 5"],
        ["merah"],
      ],
      kunci: "Merah 5/10 = 1/2. Biru 3/10. Kuning 2/10 = 1/5. Terbesar: merah.",
    },
  },
  {
    id: "a3",
    judul: "Adegan 3 · Pulang dari Karnaval",
    suara: "Peluang tidak hanya ada di permainan. Cuaca, bus, dan undian juga punya peluang. Kita bisa membandingkannya dari data: berapa kali kejadian itu terjadi dibanding semua kesempatan.",
    figur: "hujan",
    dialog: [
      { nama: "Cika", teks: "Langit mendung. Ada payung tidak?" },
      { nama: "Rio", teks: "Dari 10 sore terakhir, 8 sore hujan. Peluang hujan sore ini besar." },
      { nama: "Lala", teks: "Kita pulang naik bus. Bus A telat 3 dari 10 hari. Bus B telat 5 dari 10 hari." },
      { nama: "Pak Bima", teks: "Ayo hitung. Bus A tepat waktu 7 dari 10 hari. Bus B tepat waktu 5 dari 10 hari." },
      { nama: "Rio", teks: "Penyebutnya sama-sama 10. Jadi 7/10 lebih besar dari 5/10." },
      { nama: "Cika", teks: "Bus A lebih mungkin tepat waktu. Kita naik bus A!" },
      { nama: "Kak Nara", teks: "Ingat, peluang hanya menunjukkan kemungkinan, bukan kepastian. Bus A kadang juga telat." },
    ],
    suaraKuis: {
      tanya: "Bus A telat 2 dari 10 hari, bus B telat 4 dari 10 hari. Bus mana yang lebih mungkin tepat waktu?",
      alias: ["bus a"],
      kunci: "Bus A. Tepat waktu 8/10, sedangkan bus B 6/10.",
    },
    kanvas: {
      tanya: "Toko X memberi stiker ke 3 dari 5 pembeli. Toko Y memberi stiker ke 5 dari 10 pembeli. Tulis pecahannya, samakan penyebutnya, lalu tentukan toko yang lebih besar.",
      kelompok: [
        ["3 5", "6 10"],
        ["5 10", "setengah"],
        ["toko x", "x lebih"],
      ],
      kunci: "X = 3/5 = 6/10. Y = 5/10. Peluang lebih besar di Toko X.",
    },
  },
];

const PERMAINAN_A: Permainan[] = [
  {
    jenis: "pilih",
    id: "pa1",
    tanya: "Kantong berisi 6 bola merah saja. Mengambil 1 bola merah termasuk…",
    opsi: [
      { huruf: "A", teks: "mustahil" },
      { huruf: "B", teks: "kecil" },
      { huruf: "C", teks: "seimbang" },
      { huruf: "D", teks: "pasti" },
    ],
    benar: "D",
    umpan: "Semua bola merah. Peluangnya 6/6 = 1, jadi pasti.",
  },
  {
    jenis: "cocok",
    id: "pa2",
    tanya: "Cocokkan kejadian dengan skalanya.",
    pasangan: [
      { kiri: "Koin muncul gambar", kanan: "seimbang" },
      { kiri: "Bola biru dari 9 merah dan 1 biru", kanan: "kecil" },
      { kiri: "Bola biru dari 9 biru dan 1 merah", kanan: "besar" },
      { kiri: "Bola hijau dari kotak merah semua", kanan: "mustahil" },
    ],
    umpan: "Koin seimbang. Satu biru di antara sembilan merah itu kecil. Sembilan biru itu besar. Hijau di kotak merah mustahil.",
  },
  {
    jenis: "susun",
    id: "pa3",
    tanya: "Urutkan dari peluang terkecil ke terbesar.",
    langkah: [
      { kode: "c", teks: "1/2" },
      { kode: "a", teks: "0" },
      { kode: "e", teks: "1" },
      { kode: "d", teks: "3/4" },
      { kode: "b", teks: "1/10" },
    ],
    urutan: ["a", "b", "c", "d", "e"],
    umpan: "0, lalu 1/10, lalu 1/2, lalu 3/4, lalu 1.",
  },
  {
    jenis: "benarSalah",
    id: "pa4",
    tanya: "Peluang muncul angka pada koin adalah 1/2. Jadi kalau koin dilempar 2 kali, pasti muncul angka tepat 1 kali.",
    benar: false,
    umpan: "Salah. Peluang hanya menunjukkan kemungkinan, bukan kepastian.",
  },
  {
    jenis: "pilih",
    id: "pa5",
    tanya: "Roda punya 8 sektor: 5 hijau, 2 kuning, 1 ungu. Warna mana yang peluangnya terbesar?",
    opsi: [
      { huruf: "A", teks: "hijau" },
      { huruf: "B", teks: "kuning" },
      { huruf: "C", teks: "ungu" },
      { huruf: "D", teks: "semuanya sama" },
    ],
    benar: "A",
    umpan: "Hijau 5/8. Kuning 2/8. Ungu 1/8. Hijau yang terbesar.",
  },
];

const INFOGRAFIS: {
  id: string;
  judul: string;
  suara: string;
  kepala: string[];
  baris: string[][];
  contoh: string;
  suaraKuis: KuisSuara;
  kanvas: KuisKanvas;
}[] = [
  {
    id: "ib1",
    judul: "Skala peluang",
    suara: "Peluang adalah ukuran seberapa mungkin sebuah kejadian terjadi. Nilainya dari 0 sampai 1. Hafalkan lima tingkatnya di garis skala ini.",
    kepala: ["Skala", "Nilai", "Contoh"],
    baris: [
      ["Mustahil", "0", "Dadu biasa muncul angka 9"],
      ["Kecil", "dekat 0", "1 merah dari 1 merah + 9 biru"],
      ["Seimbang", "1/2", "Koin muncul angka"],
      ["Besar", "dekat 1", "1 merah dari 9 merah + 1 biru"],
      ["Pasti", "1", "Dadu biasa muncul angka kurang dari 7"],
    ],
    contoh: "3 bola merah dan 7 bola biru. Peluang merah = 3/10. 3/10 lebih kecil dari 1/2, jadi skalanya kecil.",
    suaraKuis: {
      tanya: "Kotak berisi 1 bola merah dan 9 bola biru. Skala peluang mengambil bola merah?",
      alias: ["kecil"],
      kunci: "Kecil. Peluangnya 1/10.",
    },
    kanvas: {
      tanya: "Gambar 10 bola. Atur warnanya supaya peluang mengambil bola merah seimbang. Tulis banyak bola merah dan bola lainnya.",
      kelompok: [
        ["5 merah", "lima merah"],
        ["5 biru", "5 lain", "5 warna", "lima biru", "seimbang", "setengah"],
      ],
      kunci: "5 bola merah dan 5 bola warna lain. 5/10 = 1/2, jadi seimbang.",
    },
  },
  {
    id: "ib2",
    judul: "Membandingkan peluang dalam permainan",
    suara: "Untuk membandingkan peluang dua permainan, tulis peluang masing-masing sebagai pecahan. Samakan penyebutnya, lalu bandingkan pembilangnya.",
    kepala: ["Langkah", "Isi"],
    baris: [
      ["1", "Hitung hasil yang diinginkan"],
      ["2", "Hitung semua hasil"],
      ["3", "Tulis pecahan, lalu samakan penyebut"],
      ["4", "Bandingkan pembilangnya"],
    ],
    contoh: "Kantong P: 2 merah dari 5, jadi 2/5. Kantong Q: 3 merah dari 8, jadi 3/8. 2/5 = 16/40 dan 3/8 = 15/40. Kantong P lebih besar.",
    suaraKuis: {
      tanya: "Kantong A ada 1 merah dari 4 bola. Kantong B ada 1 merah dari 5 bola. Kantong mana peluang merahnya lebih besar?",
      alias: ["kantong a", "a lebih"],
      kunci: "Kantong A. 1/4 lebih besar dari 1/5.",
    },
    kanvas: {
      tanya: "Kantong A: 3 merah dan 2 biru. Kantong B: 4 merah dan 6 biru. Tulis peluang merah tiap kantong, samakan penyebutnya, lalu bandingkan.",
      kelompok: [
        ["3 5", "6 10"],
        ["4 10", "2 5"],
        ["kantong a", "a lebih"],
      ],
      kunci: "A = 3/5 = 6/10. B = 4/10. Kantong A lebih besar.",
    },
  },
  {
    id: "ib3",
    judul: "Membandingkan peluang dalam kejadian sehari-hari",
    suara: "Dalam kehidupan sehari-hari, peluang bisa kita hitung dari data. Bandingkan jumlah kejadian dengan seluruh kesempatan, lalu samakan penyebutnya.",
    kepala: ["Data", "Peluang", "Skala"],
    baris: [
      ["Hujan 8 dari 10 hari", "8/10", "besar"],
      ["Bus telat 1 dari 10 hari", "1/10", "kecil"],
      ["Menang undian 5 dari 10 kupon", "5/10 = 1/2", "seimbang"],
    ],
    contoh: "Kota A hujan 8 dari 10 hari. Kota B hujan 12 dari 20 hari, yaitu 6/10. 8/10 lebih besar, jadi Kota A lebih besar.",
    suaraKuis: {
      tanya: "Dalam 10 hari terakhir, 7 hari cerah. Skala peluang hari ini cerah?",
      alias: ["besar"],
      kunci: "Besar. Peluangnya 7/10.",
    },
    kanvas: {
      tanya: "Tim X menang 6 dari 10 pertandingan. Tim Y menang 9 dari 20 pertandingan. Tulis pecahannya, samakan penyebutnya, lalu tentukan tim yang lebih besar.",
      kelompok: [
        ["6 10", "12 20"],
        ["9 20"],
        ["tim x", "x lebih"],
      ],
      kunci: "X = 6/10 = 12/20. Y = 9/20. 12/20 lebih besar, jadi Tim X.",
    },
  },
];

const PERMAINAN_B: Permainan[] = [
  {
    jenis: "pilih",
    id: "pb1",
    tanya: "Kotak X: 2 merah dan 6 biru. Kotak Y: 4 merah dan 4 biru. Kotak Z: 6 merah dan 2 biru. Peluang merah terbesar ada di…",
    opsi: [
      { huruf: "A", teks: "X" },
      { huruf: "B", teks: "Y" },
      { huruf: "C", teks: "Z" },
      { huruf: "D", teks: "semuanya sama" },
    ],
    benar: "C",
    umpan: "X = 2/8. Y = 4/8. Z = 6/8. Z yang terbesar.",
  },
  {
    jenis: "cocok",
    id: "pb2",
    tanya: "Cocokkan pecahan dengan skalanya.",
    pasangan: [
      { kiri: "0/8", kanan: "mustahil" },
      { kiri: "1/8", kanan: "kecil" },
      { kiri: "4/8", kanan: "seimbang" },
      { kiri: "7/8", kanan: "besar" },
      { kiri: "8/8", kanan: "pasti" },
    ],
    umpan: "0/8 mustahil. 1/8 kecil. 4/8 seimbang. 7/8 besar. 8/8 pasti.",
  },
  {
    jenis: "susun",
    id: "pb3",
    tanya: "Urutkan peluang menang dari terkecil ke terbesar.",
    langkah: [
      { kode: "r", teks: "R 1/2" },
      { kode: "p", teks: "P 1/5" },
      { kode: "s", teks: "S 7/10" },
      { kode: "q", teks: "Q 3/10" },
    ],
    urutan: ["p", "q", "r", "s"],
    umpan: "1/5, lalu 3/10, lalu 1/2, lalu 7/10.",
  },
  {
    jenis: "benarSalah",
    id: "pb4",
    tanya: "Kantong dengan 3 merah dari 5 bola punya peluang merah lebih besar dari kantong dengan 4 merah dari 10 bola.",
    benar: true,
    umpan: "Benar. 3/5 = 6/10, lebih besar dari 4/10.",
  },
  {
    jenis: "pilih",
    id: "pb5",
    tanya: "Peluang mengambil bola kuning: kotak A 1 dari 4, kotak B 2 dari 10, kotak C 3 dari 8. Mana yang terbesar?",
    opsi: [
      { huruf: "A", teks: "A" },
      { huruf: "B", teks: "B" },
      { huruf: "C", teks: "C" },
      { huruf: "D", teks: "A dan C sama" },
    ],
    benar: "C",
    umpan: "A = 1/4 = 10/40. B = 2/10 = 8/40. C = 3/8 = 15/40. C yang terbesar.",
  },
];

const MISI: Permainan[] = [
  {
    jenis: "pilih",
    id: "m1",
    tanya: "Stan 1. Stan A menang 1 dari 3. Stan B menang 2 dari 5. Stan C menang 3 dari 8. Stan mana yang terbaik?",
    opsi: [
      { huruf: "A", teks: "Stan A" },
      { huruf: "B", teks: "Stan B" },
      { huruf: "C", teks: "Stan C" },
      { huruf: "D", teks: "Semua sama" },
    ],
    benar: "B",
    umpan: "A = 1/3 = 40/120. B = 2/5 = 48/120. C = 3/8 = 45/120. Stan B paling besar.",
  },
  {
    jenis: "benarSalah",
    id: "m2",
    tanya: "Stan 2. Kotak berisi 4 bola merah dan 4 bola biru. Peluang mendapat merah sama dengan peluang mendapat biru.",
    benar: true,
    umpan: "Benar. Keduanya 4/8.",
  },
  {
    jenis: "cocok",
    id: "m3",
    tanya: "Stan 3. Cocokkan isi kotak dengan skala peluang mengambil bola merah.",
    pasangan: [
      { kiri: "0 merah dari 5", kanan: "mustahil" },
      { kiri: "1 merah dari 10", kanan: "kecil" },
      { kiri: "5 merah dari 10", kanan: "seimbang" },
      { kiri: "9 merah dari 10", kanan: "besar" },
    ],
    umpan: "0/5 mustahil. 1/10 kecil. 5/10 seimbang. 9/10 besar.",
  },
  {
    jenis: "susun",
    id: "m4",
    tanya: "Stan 4. Urutkan langkah membandingkan peluang dua kantong.",
    langkah: [
      { kode: "a", teks: "Bandingkan pembilangnya" },
      { kode: "c", teks: "Samakan penyebut" },
      { kode: "b", teks: "Tulis peluang tiap kantong" },
    ],
    urutan: ["b", "c", "a"],
    umpan: "Tulis peluangnya dulu, samakan penyebut, lalu bandingkan pembilang.",
  },
  {
    jenis: "pilih",
    id: "m5",
    tanya: "Stan 5. Sebuah dadu biasa dilempar. Mana yang peluangnya lebih besar?",
    opsi: [
      { huruf: "A", teks: "Muncul angka genap" },
      { huruf: "B", teks: "Muncul angka 5 atau lebih" },
      { huruf: "C", teks: "Sama besar" },
      { huruf: "D", teks: "Tidak bisa dibandingkan" },
    ],
    benar: "A",
    umpan: "Angka genap ada 3, yaitu 2, 4, dan 6, jadi 3/6. Angka 5 atau 6 hanya 2/6.",
  },
  {
    jenis: "suara",
    id: "m6",
    tanya: "Stan 6. Roda punya 10 sektor dan 7 sektor hijau. Skala peluang panah berhenti di hijau?",
    alias: ["besar"],
    umpan: "Besar. Peluangnya 7/10.",
  },
  {
    jenis: "pilih",
    id: "m7",
    tanya: "Stan 7. Kamu ingin dapat bola merah. Kantong P: 2 merah dan 3 biru. Kantong Q: 3 merah dan 5 biru. Pilih yang mana?",
    opsi: [
      { huruf: "A", teks: "Kantong P" },
      { huruf: "B", teks: "Kantong Q" },
      { huruf: "C", teks: "Sama saja" },
      { huruf: "D", teks: "Tidak bisa tahu" },
    ],
    benar: "A",
    umpan: "P = 2/5 = 16/40. Q = 3/8 = 15/40. Kantong P lebih besar.",
  },
  {
    jenis: "kanvas",
    id: "m8",
    tanya: "Stan 8. Gambar roda 6 sektor. Warnai supaya peluang berhenti di kuning adalah 1/3. Tulis berapa sektor kuning.",
    kelompok: [
      ["2", "dua"],
      ["kuning", "1 3", "2 6", "sepertiga"],
    ],
    umpan: "2 sektor kuning dari 6. 2/6 = 1/3. Empat sektor lainnya boleh warna lain.",
  },
  {
    jenis: "benarSalah",
    id: "m9",
    tanya: "Stan 9. Karena roda hanya punya 2 warna, peluang tiap warna pasti 1/2.",
    benar: false,
    umpan: "Salah. Peluang bergantung pada banyak sektor. Contoh: 3 merah dan 1 biru, peluang merah 3/4.",
  },
  {
    jenis: "pilih",
    id: "m10",
    tanya: "Stan 10. Kantong berisi 2 merah dan 6 biru. Lalu ditambah 2 bola merah. Peluang mengambil merah menjadi…",
    opsi: [
      { huruf: "A", teks: "lebih kecil" },
      { huruf: "B", teks: "tetap sama" },
      { huruf: "C", teks: "lebih besar" },
      { huruf: "D", teks: "nol" },
    ],
    benar: "C",
    umpan: "Sebelumnya 2/8 = 1/4. Sesudahnya 4/10 = 2/5. 2/5 lebih besar dari 1/4.",
  },
];

const POIN = [
  "Peluang adalah seberapa mungkin kejadian terjadi.",
  "Nilai peluang dari 0 sampai 1.",
  "Skala peluang: mustahil (0), kecil, seimbang (1/2), besar, pasti (1).",
  "Rumus: peluang = hasil yang diinginkan dibagi semua hasil.",
  "Peluang seimbang kalau hasil yang diinginkan sama dengan setengah dari semua hasil.",
  "Untuk membandingkan: tulis pecahan, samakan penyebut, lalu bandingkan pembilang.",
  "Hasil yang lebih banyak belum tentu peluangnya lebih besar. Lihat juga jumlah semua hasil.",
  "Peluang hanya menunjukkan kemungkinan, bukan kepastian.",
];

const EVALUASI: Permainan[] = [
  {
    jenis: "pilih",
    id: "e1",
    tanya: "Kantong A berisi 3 merah dan 7 biru. Kantong B berisi 5 merah dan 15 biru. Kantong mana yang peluang dapat merahnya lebih besar?",
    opsi: [
      { huruf: "A", teks: "Kantong B, karena merahnya lebih banyak" },
      { huruf: "B", teks: "Kantong A. 3/10 = 6/20, lebih besar dari 5/20" },
      { huruf: "C", teks: "Sama, karena keduanya 3/10" },
      { huruf: "D", teks: "Kantong B. 5/20 lebih besar dari 3/10" },
    ],
    benar: "B",
    umpan: "A = 3/10 = 6/20. B = 5/20. Kantong A lebih besar.",
  },
  {
    jenis: "pilih",
    id: "e2",
    tanya: "Kotak X berisi 6 merah dan 14 biru. Kotak Y berisi 4 merah dan 4 biru. Rio bilang peluang merah X lebih besar karena merahnya lebih banyak. Setujukah kamu?",
    opsi: [
      { huruf: "A", teks: "Setuju, karena 6 lebih banyak dari 4" },
      { huruf: "B", teks: "Tidak setuju. X = 6/20 dan Y = 4/8. Peluang Y lebih besar" },
      { huruf: "C", teks: "Setuju, karena 6/20 lebih besar dari 4/8" },
      { huruf: "D", teks: "Tidak setuju. Keduanya sama" },
    ],
    benar: "B",
    umpan: "X = 6/20 = 3/10. Y = 4/8 = 1/2. Peluang di kotak Y lebih besar.",
  },
  {
    jenis: "cocok",
    id: "e3",
    tanya: "Dadu biasa dilempar. Cocokkan kejadian dengan skalanya.",
    pasangan: [
      { kiri: "Muncul angka lebih dari 6", kanan: "mustahil" },
      { kiri: "Muncul angka kurang dari 7", kanan: "pasti" },
      { kiri: "Muncul angka genap", kanan: "seimbang" },
      { kiri: "Muncul angka 1 sampai 5", kanan: "besar" },
      { kiri: "Muncul angka 6", kanan: "kecil" },
    ],
    umpan: "Lebih dari 6 mustahil. Kurang dari 7 pasti. Genap 3/6 seimbang. Angka 1 sampai 5 itu 5/6, besar. Angka 6 itu 1/6, kecil.",
  },
  {
    jenis: "pilih",
    id: "e4",
    tanya: "Kota A hujan 8 dari 10 hari. Kota B hujan 12 dari 20 hari. Kota mana yang peluang hujannya lebih besar?",
    opsi: [
      { huruf: "A", teks: "Kota A. 8/10 = 16/20, lebih besar dari 12/20" },
      { huruf: "B", teks: "Kota B, karena 12 lebih banyak dari 8" },
      { huruf: "C", teks: "Sama, karena keduanya 8/10" },
      { huruf: "D", teks: "Kota B. 12/20 lebih besar dari 8/10" },
    ],
    benar: "A",
    umpan: "A = 8/10 = 16/20. B = 12/20. Kota A lebih besar.",
  },
  {
    jenis: "suara",
    id: "e5",
    tanya: "Ada 12 kartu. 3 kartu bergambar bintang. Apa skala peluang mengambil kartu bintang?",
    alias: ["kecil"],
    umpan: "3/12 = 1/4, lebih kecil dari 1/2. Skalanya kecil.",
  },
  {
    jenis: "susun",
    id: "e6",
    tanya: "Urutkan peluang bola merah dari terkecil ke terbesar.",
    langkah: [
      { kode: "p", teks: "P 1/2" },
      { kode: "q", teks: "Q 2/3" },
      { kode: "s", teks: "S 3/5" },
      { kode: "r", teks: "R 1/4" },
    ],
    urutan: ["r", "p", "s", "q"],
    umpan: "Samakan ke 60: R = 15/60, P = 30/60, S = 36/60, Q = 40/60. Urutannya R, P, S, Q.",
  },
  {
    jenis: "tulis",
    id: "e7",
    tanya: "Kantong berisi 4 merah dan 6 biru. Berapa bola merah yang harus ditambahkan supaya peluang mengambil merah menjadi 1/2?",
    kelompok: [["2", "dua"]],
    umpan: "Tambah 2 bola merah. (4 + 2) dari (10 + 2) = 6/12 = 1/2.",
  },
  {
    jenis: "kanvas",
    id: "e8",
    tanya: "Gambar roda 8 sektor dengan merah, biru, dan kuning. Merah peluangnya terbesar, biru sedang, kuning terkecil. Tulis banyak sektor tiap warna.",
    kelompok: [],
    periksa: rodaDelapanWarna,
    umpan: "Contohnya 4 merah, 3 biru, dan 1 kuning. Boleh juga 5 merah, 2 biru, dan 1 kuning. Merah harus lebih banyak dari biru, dan biru lebih banyak dari kuning.",
  },
  {
    jenis: "pilih",
    id: "e9",
    tanya: "Lala menang kalau dadu muncul kurang dari 3. Rio menang kalau muncul lebih dari 3. Angka 3 tidak membuat siapa pun menang. Adilkah permainan ini?",
    opsi: [
      { huruf: "A", teks: "Adil, keduanya 3/6" },
      { huruf: "B", teks: "Tidak adil. Lala 2/6, Rio 3/6" },
      { huruf: "C", teks: "Tidak adil. Lala 3/6, Rio 2/6" },
      { huruf: "D", teks: "Adil, karena dadunya sama" },
    ],
    benar: "B",
    umpan: "Lala menang pada 1 dan 2, jadi 2/6. Rio menang pada 4, 5, dan 6, jadi 3/6. Peluang Rio lebih besar.",
  },
  {
    jenis: "pilih",
    id: "e10",
    tanya: "Kelas 6A: 40 kupon dengan 8 hadiah. Kelas 6B: 25 kupon dengan 6 hadiah. Kelas 6C: 30 kupon dengan 5 hadiah. Cika bilang peluang terbesar di 6A. Kelas mana yang sebenarnya paling besar?",
    opsi: [
      { huruf: "A", teks: "Kelas 6A, karena hadiahnya paling banyak" },
      { huruf: "B", teks: "Kelas 6B. 6/25 lebih besar dari 8/40 dan 5/30" },
      { huruf: "C", teks: "Kelas 6C, karena 5/30 paling besar" },
      { huruf: "D", teks: "Sama semua" },
    ],
    benar: "B",
    umpan: "6A = 8/40 = 1/5. 6B = 6/25. 6C = 5/30 = 1/6. 6/25 lebih besar dari 1/5 dan dari 1/6. Cika keliru.",
  },
];

function ambilJumlahWarna(teks: string, warna: string): number | null {
  const huruf = teks.toLowerCase();
  const depan = huruf.match(new RegExp(`(\\d+)\\s*${warna}`));
  if (depan) return Number(depan[1]);
  const belakang = huruf.match(new RegExp(`${warna}\\s*(\\d+)`));
  return belakang ? Number(belakang[1]) : null;
}

function rodaDelapanWarna(teks: string): boolean {
  const merah = ambilJumlahWarna(teks, "merah");
  const biru = ambilJumlahWarna(teks, "biru");
  const kuning = ambilJumlahWarna(teks, "kuning");
  if (merah === null || biru === null || kuning === null) return false;
  return merah + biru + kuning === 8 && merah > biru && biru > kuning && kuning >= 1;
}

function cuplikan(teks: string): CuplikanVoiceMateri[] {
  return [{ teks, jedaSetelahMs: 0 }];
}

function cocokSemua(teks: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(teks, alias));
}

function Dialog({ nama, teks }: BarisDialog) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${WARNA[nama]}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>{WAJAH[nama]}</span>
        {nama}
      </p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{teks}</p>
    </article>
  );
}

function Papan({ anak }: { anak: string }) {
  return (
    <p className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
  );
}

function KepalaBagian({ ikon, judul, anak }: { ikon: string; judul: string; anak?: string }) {
  return (
    <div>
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
      <h2 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h2>
      {anak ? <p className="mt-1 text-center text-sm font-semibold leading-relaxed text-slate-600">{anak}</p> : null}
    </div>
  );
}

function Figur({ jenis }: { jenis: "skala" | "roda" | "hujan" }) {
  if (jenis === "skala") {
    return (
      <figure className="space-y-2">
        <figcaption className="text-sm font-semibold text-slate-700">Garis skala dari mustahil sampai pasti.</figcaption>
        <Papan anak="Mustahil 0  ·  Kecil  ·  Seimbang 1/2  ·  Besar  ·  Pasti 1" />
        <p className="text-center text-3xl" aria-hidden>🪙 🎲 🔴🔵</p>
      </figure>
    );
  }
  if (jenis === "roda") {
    return (
      <figure className="space-y-2">
        <figcaption className="text-sm font-semibold text-slate-700">Roda 8 sektor: 4 merah, 3 biru, 1 kuning.</figcaption>
        <Papan anak="Merah 4/8 = 1/2    Biru 3/8    Kuning 1/8" />
      </figure>
    );
  }
  return (
    <figure className="space-y-2">
      <figcaption className="text-sm font-semibold text-slate-700">Dari 10 sore, 8 sore hujan.</figcaption>
      <Papan anak="Bus A tepat waktu 7/10    Bus B tepat waktu 5/10" />
    </figure>
  );
}

function Tabel({ kepala, baris }: { kepala: string[]; baris: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-[#1C01A5]/20">
      <table className="w-full min-w-[16rem] border-collapse text-center text-sm font-bold">
        <thead>
          <tr>
            {kepala.map((sel, indeks) => (
              <th key={sel} className={`px-2 py-2 text-white ${["bg-teal-600", "bg-orange-500", "bg-violet-600"][indeks % 3]}`}>{sel}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((barisSel, barisIndeks) => (
            <tr key={barisSel.join("|")} className={barisIndeks % 2 === 0 ? "bg-white" : "bg-[#EEE9FF]"}>
              {barisSel.map((sel, indeks) => (
                <td key={`${indeks}-${sel}`} className="border-t border-[#1C01A5]/10 px-2 py-2 text-[#1C01A5]">{sel}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Umpan({ tampil, teks }: { tampil: boolean; teks: string }) {
  if (!tampil) return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function KuisPilih({
  tanya,
  opsi,
  benar,
  umpan,
  onNilai,
}: {
  tanya: string;
  opsi: Pilihan[];
  benar: string;
  umpan: string;
  onNilai?: (benar: boolean) => void;
}) {
  const [pilih, setPilih] = useState("");
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{tanya}</p>
      <div className="mt-3 grid gap-2">
        {opsi.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              if (pilih) return;
              setPilih(item.huruf);
              onNilai?.(item.huruf === benar);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              item.huruf,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <HasilJawabanKuis status={statusDariPilihan(pilih, benar)} cuplikan={pilih || undefined} pesanSalah="Coba hitung lagi." />
      <Umpan tampil={pilih.length > 0} teks={umpan} />
    </article>
  );
}

function KuisCocok({
  tanya,
  pasangan,
  umpan,
  onNilai,
}: {
  tanya: string;
  pasangan: { kiri: string; kanan: string }[];
  umpan: string;
  onNilai?: (benar: boolean) => void;
}) {
  const [aktif, setAktif] = useState(0);
  const [peta, setPeta] = useState<Record<number, string>>({});
  const [cek, setCek] = useState(false);
  const tepat = pasangan.every((item, indeks) => peta[indeks] === item.kanan);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{tanya}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk baris, lalu ketuk pasangannya.</p>
      <div className="mt-3 grid gap-2">
        {pasangan.map((item, indeks) => (
          <button
            key={item.kiri}
            type="button"
            onClick={() => setAktif(indeks)}
            className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${aktif === indeks ? "border-violet-400 bg-white ring-2 ring-violet-400" : "border-sky-200 bg-white"}`}
          >
            <span>{item.kiri}</span>
            <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pasangan.map((item) => (
          <button
            key={item.kanan}
            type="button"
            onClick={() => {
              setPeta((lama) => ({ ...lama, [aktif]: item.kanan }));
              setCek(false);
            }}
            className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          >
            {item.kanan}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setCek(true);
          onNilai?.(tepat);
        }}
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi." />
          <Umpan tampil teks={umpan} />
        </div>
      ) : null}
    </article>
  );
}

function KuisSusun({
  tanya,
  langkah,
  urutan,
  umpan,
  onNilai,
}: {
  tanya: string;
  langkah: { kode: string; teks: string }[];
  urutan: string[];
  umpan: string;
  onNilai?: (benar: boolean) => void;
}) {
  const [sisa, setSisa] = useState(langkah);
  const [susun, setSusun] = useState<{ kode: string; teks: string }[]>([]);
  const [cek, setCek] = useState(false);
  const tepat = susun.length === urutan.length && susun.every((item, indeks) => item.kode === urutan[indeks]);
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{tanya}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join(" → ") || "Ketuk kartu sesuai urutan."}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kode}
            type="button"
            onClick={() => {
              setSisa((lama) => lama.filter((kartu) => kartu.kode !== item.kode));
              setSusun((lama) => [...lama, item]);
              setCek(false);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {item.teks}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setCek(true);
          onNilai?.(tepat);
        }}
        className="mt-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white"
      >
        Periksa urutan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Urutkan lagi dari awal." />
          <Umpan tampil teks={umpan} />
        </div>
      ) : null}
    </article>
  );
}

function KuisBenarSalah({
  tanya,
  benar,
  umpan,
  onNilai,
}: {
  tanya: string;
  benar: boolean;
  umpan: string;
  onNilai?: (benar: boolean) => void;
}) {
  const [pilih, setPilih] = useState<boolean | null>(null);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{tanya}</p>
      <div className="mt-3 flex gap-2">
        {[true, false].map((nilai) => (
          <button
            key={String(nilai)}
            type="button"
            onClick={() => {
              if (pilih !== null) return;
              setPilih(nilai);
              onNilai?.(nilai === benar);
            }}
            className={`rounded-full px-4 py-2 text-sm font-black ${
              pilih === nilai ? "bg-violet-700 text-white" : "bg-white text-[#1C01A5] ring-2 ring-violet-200"
            }`}
          >
            {nilai ? "Benar" : "Salah"}
          </button>
        ))}
      </div>
      {pilih !== null ? (
        <div className="mt-3">
          <HasilJawabanKuis status={pilih === benar ? "benar" : "salah"} pesanSalah="Baca lagi pernyataannya." />
          <Umpan tampil teks={umpan} />
        </div>
      ) : null}
    </article>
  );
}

function KuisSuaraLokal({ tanya, alias, kunci, onNilai }: KuisSuara & { onNilai?: (benar: boolean) => void }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara
        pertanyaan={tanya}
        periksa={(teks) => jawabanTulisMemuatAlias(teks, alias)}
        sesudahNilai={(hasil) => {
          setTepat(hasil);
          onNilai?.(hasil);
        }}
      />
      <Umpan tampil={tepat} teks={kunci} />
    </div>
  );
}

function KuisTulis({
  tanya,
  kelompok,
  umpan,
  onNilai,
}: {
  tanya: string;
  kelompok: string[][];
  umpan: string;
  onNilai?: (benar: boolean) => void;
}) {
  const [jawaban, setJawaban] = useState("");
  const [hasil, setHasil] = useState<boolean | null>(null);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{tanya}</p>
      <input
        value={jawaban}
        onChange={(event) => setJawaban(event.target.value)}
        className="mt-3 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5] outline-none focus:border-[#F0AB00]"
      />
      <button
        type="button"
        onClick={() => {
          const ok = cocokSemua(jawaban, kelompok);
          setHasil(ok);
          onNilai?.(ok);
        }}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Periksa
      </button>
      {hasil !== null ? (
        <div className="mt-3">
          <HasilJawabanKuis status={hasil ? "benar" : "salah"} cuplikan={jawaban} pesanSalah="Coba tulis lagi." />
          <Umpan tampil teks={umpan} />
        </div>
      ) : null}
    </article>
  );
}

function KuisKanvasLokal({
  tanya,
  kelompok,
  kunci,
  periksa,
  onNilai,
}: KuisKanvas & { onNilai?: (benar: boolean) => void }) {
  const kanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gambar = useRef(false);
  const [coretan, setCoretan] = useState(0);
  const [jawaban, setJawaban] = useState("");
  const [hasil, setHasil] = useState<boolean | null>(null);
  const [pesan, setPesan] = useState("");

  const titik = (el: HTMLCanvasElement, clientX: number, clientY: number) => {
    const kotak = el.getBoundingClientRect();
    return {
      x: ((clientX - kotak.left) * el.width) / kotak.width,
      y: ((clientY - kotak.top) * el.height) / kotak.height,
    };
  };

  return (
    <div className="mt-3 space-y-3 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold leading-relaxed text-[#1C01A5]">{tanya}</p>
      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6]">
        <canvas
          ref={kanvasRef}
          width={720}
          height={220}
          className="block h-[220px] w-full cursor-crosshair touch-none"
          onPointerDown={(event) => {
            const kanvas = kanvasRef.current;
            const ctx = kanvas?.getContext("2d");
            if (!kanvas || !ctx) return;
            const pos = titik(kanvas, event.clientX, event.clientY);
            ctx.strokeStyle = "#1C01A5";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            gambar.current = true;
            kanvas.setPointerCapture(event.pointerId);
            setCoretan((jumlah) => jumlah + 1);
          }}
          onPointerMove={(event) => {
            if (!gambar.current) return;
            const kanvas = kanvasRef.current;
            const ctx = kanvas?.getContext("2d");
            if (!kanvas || !ctx) return;
            const pos = titik(kanvas, event.clientX, event.clientY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
          }}
          onPointerUp={() => {
            gambar.current = false;
          }}
        />
      </div>
      <input
        value={jawaban}
        onChange={(event) => setJawaban(event.target.value)}
        placeholder="Tulis jawabanmu"
        className="w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5] outline-none focus:border-[#F0AB00]"
      />
      <button
        type="button"
        onClick={() => {
          if (coretan < 1) {
            setPesan("Coretkan jawaban di papan tulis dulu, lalu kirim.");
            setHasil(null);
            return;
          }
          setPesan("");
          const ok = periksa ? periksa(jawaban) : cocokSemua(jawaban, kelompok);
          setHasil(ok);
          onNilai?.(ok);
        }}
        className="rounded-xl border-2 border-[#F0AB00] bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Kirim Jawaban
      </button>
      {pesan ? <p className="text-sm font-black text-rose-600">{pesan}</p> : null}
      {hasil !== null ? (
        <div>
          <HasilJawabanKuis status={hasil ? "benar" : "salah"} pesanSalah="Jawaban belum tepat. Coba tulis lagi di papan." />
          <Umpan tampil teks={kunci} />
        </div>
      ) : null}
    </div>
  );
}

function RenderPermainan({ item, onNilai }: { item: Permainan; onNilai?: (benar: boolean) => void }) {
  if (item.jenis === "pilih") return <KuisPilih tanya={item.tanya} opsi={item.opsi} benar={item.benar} umpan={item.umpan} onNilai={onNilai} />;
  if (item.jenis === "cocok") return <KuisCocok tanya={item.tanya} pasangan={item.pasangan} umpan={item.umpan} onNilai={onNilai} />;
  if (item.jenis === "susun") return <KuisSusun tanya={item.tanya} langkah={item.langkah} urutan={item.urutan} umpan={item.umpan} onNilai={onNilai} />;
  if (item.jenis === "benarSalah") return <KuisBenarSalah tanya={item.tanya} benar={item.benar} umpan={item.umpan} onNilai={onNilai} />;
  if (item.jenis === "suara") return <KuisSuaraLokal tanya={item.tanya} alias={item.alias} kunci={item.umpan} onNilai={onNilai} />;
  if (item.jenis === "tulis") return <KuisTulis tanya={item.tanya} kelompok={item.kelompok} umpan={item.umpan} onNilai={onNilai} />;
  return (
    <KuisKanvasLokal
      tanya={item.tanya}
      kelompok={item.kelompok}
      kunci={item.umpan}
      periksa={"periksa" in item ? item.periksa : undefined}
      onNilai={onNilai}
    />
  );
}

export default function Bab4PeluangModule() {
  const [skorMisi, setSkorMisi] = useState<Record<string, number>>({});
  const poinTiket = Object.values(skorMisi).reduce((jumlah, nilai) => jumlah + nilai, 0);

  const nilaiMisi = (id: string, benar: boolean) => {
    if (skorMisi[id] || !benar) return;
    setSkorMisi((lama) => ({ ...lama, [id]: 10 }));
  };

  return (
    <div className="space-y-5">
      <section className="space-y-4">
        <KepalaBagian
          ikon="🎡🦉"
          judul="A. Naskah bergambar"
          anak="Di karnaval ini kamu memakai skala peluang, lalu membandingkan peluang permainan dan kejadian sehari-hari."
        />
        {ADEGAN.map((adegan) => (
          <section key={adegan.id} className="space-y-3 border-b-4 border-[#1C01A5] pb-8">
            <p className="text-xl font-black leading-snug text-[#1C01A5]">{adegan.judul}</p>
            <TombolVoiceMateriPai1 cuplikan={cuplikan(adegan.suara)} />
            <Figur jenis={adegan.figur} />
            <div className="space-y-2">
              {adegan.dialog.map((baris) => (
                <Dialog key={`${adegan.id}-${baris.nama}-${baris.teks}`} nama={baris.nama} teks={baris.teks} />
              ))}
            </div>
            <KuisSuaraLokal {...adegan.suaraKuis} />
            <KuisKanvasLokal {...adegan.kanvas} />
          </section>
        ))}
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Tantangan akhir naskah</p>
        <div className="space-y-3">
          {PERMAINAN_A.map((item) => (
            <RenderPermainan key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <KepalaBagian ikon="📊" judul="B. Infografis" anak="Tabel ini merangkum skala peluang dan cara membandingkan pecahan." />
        {INFOGRAFIS.map((kartu) => (
          <section key={kartu.id} className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{kartu.judul}</p>
            <TombolVoiceMateriPai1 cuplikan={cuplikan(kartu.suara)} />
            <Tabel kepala={kartu.kepala} baris={kartu.baris} />
            <p className="text-sm font-semibold leading-relaxed text-slate-700">{kartu.contoh}</p>
            <KuisSuaraLokal {...kartu.suaraKuis} />
            <KuisKanvasLokal {...kartu.kanvas} />
          </section>
        ))}
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Tantangan akhir infografis</p>
        <div className="space-y-3">
          {PERMAINAN_B.map((item) => (
            <RenderPermainan key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <KepalaBagian
          ikon="🎟️"
          judul="C. Tiket emas karnaval"
          anak="Tiap soal benar bernilai 10 poin. Tiket emas terbuka pada 70 poin."
        />
        <TombolVoiceMateriPai1 cuplikan={cuplikan("Kamu pemain di Karnaval Kota Ceria. Di tiap stan, pilih pilihan dengan peluang menang terbaik. Kumpulkan 70 poin untuk meraih Tiket Emas!")} />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {poinTiket} poin · {poinTiket >= 70 ? "tiket emas terbuka" : "tiket emas masih tertutup"}
        </p>
        <div className="space-y-3">
          {MISI.map((item) => (
            <div key={item.id}>
              <RenderPermainan item={item} onNilai={(benar) => nilaiMisi(item.id, benar)} />
              {skorMisi[item.id] ? <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">+10 poin</p> : null}
            </div>
          ))}
        </div>
      </section>

      <KartuPoinPenting cuplikan={cuplikan("Ini kalimat kunci bab Peluang. Ingat-ingat ya!")} poin={POIN} />

      <section className="space-y-4">
        <KepalaBagian ikon="📝" judul="Lembar evaluasi" anak="Sepuluh soal. Bandingkan peluang dengan menyamakan penyebut." />
        <TombolVoiceMateriPai1 cuplikan={cuplikan("Ini lembar evaluasi Bab Peluang. Baca soal pelan-pelan. Tulis langkahmu, bukan hanya jawaban. Bandingkan peluang dengan menyamakan penyebut. Semangat!")} />
        <div className="space-y-3">
          {EVALUASI.map((item, indeks) => (
            <div key={item.id} className="space-y-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Soal {indeks + 1}</p>
              <RenderPermainan item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
