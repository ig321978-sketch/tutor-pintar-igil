"use client";

import { useState } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";

type NamaTokoh = "Pak Bima" | "Lala" | "Rio" | "Cika" | "Kak Nara";

type BarisDialog = { nama: NamaTokoh; teks: string };

type KuisSingkat = { tanya: string; alias: string[]; kunci: string };

type AdeganRasio = {
  id: string;
  judul: string;
  suara: string;
  figur: "rak" | "jus" | "resep" | "jeruk" | "buah" | "waktu";
  dialog: BarisDialog[];
  suaraKuis: KuisSingkat;
  kanvas: KuisSingkat;
};

type Pilihan = { huruf: string; teks: string };

type Permainan =
  | { jenis: "pilih"; id: string; tanya: string; opsi: Pilihan[]; benar: string; umpan: string }
  | { jenis: "cocok"; id: string; tanya: string; pasangan: { kiri: string; kanan: string }[]; umpan: string }
  | { jenis: "susun"; id: string; tanya: string; langkah: { kode: string; teks: string }[]; urutan: string[]; umpan: string }
  | { jenis: "benarSalah"; id: string; tanya: string; benar: boolean; umpan: string }
  | { jenis: "suara"; id: string; tanya: string; alias: string[]; umpan: string }
  | { jenis: "tulis"; id: string; tanya: string; alias: string[]; umpan: string }
  | { jenis: "kanvas"; id: string; tanya: string; alias: string[]; umpan: string };

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

const ADEGAN: AdeganRasio[] = [
  {
    id: "a1",
    judul: "Adegan A1 · Rak Benih yang Berantakan",
    suara: "Selamat datang di Rumah Kaca Ajaib! Kita lihat dua rak benih. Rak mana yang lebih banyak? Dan berapa kali lebih banyak? Yuk, kita bandingkan!",
    figur: "rak",
    dialog: [
      { nama: "Pak Bima", teks: "Rak benih kita berantakan! Ayo hitung dulu." },
      { nama: "Lala", teks: "Rak A ada 6 kantong benih bunga matahari!" },
      { nama: "Rio", teks: "Rak B ada 3 kantong. Jadi rak A lebih banyak!" },
      { nama: "Cika", teks: "“Lebih banyak” belum bilang seberapa banyak. Aku gambar ya… rak A itu dua kali lipat rak B!" },
      { nama: "Kak Nara", teks: "Huu-huu! Ada 3 cara membandingkan. Selisih: 6 − 3 = 3, lebih banyak 3. Berapa kali lipat: 6 ÷ 3 = 2 kali. Kata-kata: lebih banyak, sama banyak, atau setengahnya." },
      { nama: "Rio", teks: "Kalau dibalik, 3 dibanding 6, berarti setengahnya?" },
      { nama: "Pak Bima", teks: "Tepat! Urutan itu penting." },
    ],
    suaraKuis: {
      tanya: "Rak B hanya setengah dari rak A. Kalau rak A ada 8 kantong, rak B ada berapa?",
      alias: ["4", "empat", "4 kantong"],
      kunci: "4 kantong, karena 8 ÷ 2 = 4.",
    },
    kanvas: {
      tanya: "Di kanvas ada 4 apel merah dan 12 apel hijau. Tulis berapa kali lipat apel hijau dari apel merah, dan berapa selisihnya.",
      alias: ["3 kali", "3", "selisih 8", "3 kali lipat 8"],
      kunci: "12 ÷ 4 = 3 kali lipat. Selisih 12 − 4 = 8.",
    },
  },
  {
    id: "a2",
    judul: "Adegan A2 · Ramuan Jus Rahasia",
    suara: "Para ilmuwan menulis perbandingan dengan dua titik. Namanya rasio. Perhatikan resep jus Pak Bima ya!",
    figur: "jus",
    dialog: [
      { nama: "Cika", teks: "Pak, ada cara singkat menulis “3 banding 2”?" },
      { nama: "Pak Bima", teks: "Ada! Tulis 3 : 2. Dibaca “tiga banding dua”. Ini namanya rasio." },
      { nama: "Lala", teks: "Resep jusku 3 bagian air dan 2 bagian sirup. Jadi 3 : 2?" },
      { nama: "Pak Bima", teks: "Benar! Ingat, kedua benda harus sejenis dan satuannya sama. Tidak boleh 2 gelas dibanding 3 ember." },
      { nama: "Rio", teks: "Kalau beda satuan, disamakan dulu ya?" },
      { nama: "Kak Nara", teks: "Betul! Rasio juga bisa ditulis seperti pecahan: 3 : 2 = 3/2. Dan 3 : 2 bukan dijumlah jadi 5. Rasio itu untuk membandingkan." },
    ],
    suaraKuis: {
      tanya: "Saus memakai 5 bagian tomat dan 4 bagian cabai. Bagaimana membaca rasionya?",
      alias: ["lima banding empat", "5 banding 4", "5 4"],
      kunci: "Lima banding empat, ditulis 5 : 4.",
    },
    kanvas: {
      tanya: "Tulis rasio 7 kembang kol : 3 wortel, dan 12 daun : 4 bunga. Lalu tulis keduanya sebagai pecahan.",
      alias: ["7 3", "7/3", "12 4", "12/4"],
      kunci: "7 : 3 = 7/3. Dan 12 : 4 = 12/4.",
    },
  },
  {
    id: "b1",
    judul: "Adegan B1 · Tiga Resep, Satu Rasa",
    suara: "Ada rasio yang angkanya beda tapi rasanya sama! Kita cari tahu rahasianya.",
    figur: "resep",
    dialog: [
      { nama: "Lala", teks: "Resep A 2 : 3, resep B 4 : 6, resep C 6 : 9. Kok rasanya sama?" },
      { nama: "Cika", teks: "Resep A dikali 2 jadi 4 : 6! Sama dengan B!" },
      { nama: "Pak Bima", teks: "Itu kesamaan rasio. Kalau kedua angka dikali atau dibagi bilangan yang sama, rasio tetap senilai." },
      { nama: "Lala", teks: "Resep C, 6 : 9 dibagi 3, jadi 2 : 3!" },
      { nama: "Kak Nara", teks: "Huu-huu! Itu namanya menyederhanakan. Bagi kedua angka dengan FPB-nya. Susun juga di tabel rasio!" },
    ],
    suaraKuis: {
      tanya: "Madu dan air memakai rasio 1 : 4. Kalau jumlahnya dibuat 2 kali lipat, rasio barunya berapa?",
      alias: ["2 banding 8", "2 8", "dua banding delapan"],
      kunci: "1 : 4 dikali 2 menjadi 2 : 8.",
    },
    kanvas: {
      tanya: "Mulai dari 3 : 5. Tulis 3 rasio senilai berikutnya.",
      alias: ["6 10", "9 15", "12 20"],
      kunci: "3 : 5, lalu 6 : 10, 9 : 15, dan 12 : 20.",
    },
  },
  {
    id: "b2",
    judul: "Adegan B2 · Satu Kantong untuk Semua",
    suara: "Kalau kita mau tahu harga satu kilo, atau kecepatan per jam, kita pakai rasio satuan!",
    figur: "jeruk",
    dialog: [
      { nama: "Rio", teks: "Aku mau tahu harga per kilogram supaya mudah dibandingkan." },
      { nama: "Pak Bima", teks: "Itu rasio satuan, yaitu rasio yang salah satu angkanya 1." },
      { nama: "Cika", teks: "4 kg jeruk Rp60.000, berarti 60.000 ÷ 4 = Rp15.000 per kg!" },
      { nama: "Lala", teks: "Kenapa harus jadi 1?" },
      { nama: "Pak Bima", teks: "Supaya adil dibandingkan: mana yang lebih murah, lebih cepat, atau lebih banyak." },
      { nama: "Kak Nara", teks: "Caranya, bagi kedua angka dengan angka yang mau dijadikan 1." },
    ],
    suaraKuis: {
      tanya: "Mesin menanam 9 bibit dalam 3 menit. Berapa bibit per menit?",
      alias: ["3", "tiga", "3 bibit"],
      kunci: "9 ÷ 3 = 3 bibit per menit.",
    },
    kanvas: {
      tanya: "15 liter air dipakai menyiram 5 pot. Tulis rasio air : pot, lalu jadikan rasio satuan.",
      alias: ["15 5", "3 1", "3 liter"],
      kunci: "15 : 5 menjadi 3 : 1, yaitu 3 liter per pot.",
    },
  },
  {
    id: "c1",
    judul: "Adegan C1 · Dua Cara di Rak Buah",
    suara: "Sekarang kita belajar dua jenis rasio. Bagian dengan bagian, dan bagian dengan keseluruhan. Hati-hati, jangan tertukar!",
    figur: "buah",
    dialog: [
      { nama: "Pak Bima", teks: "Di rak ada 5 mangga dan 7 jambu." },
      { nama: "Rio", teks: "Mangga banding jambu = 5 : 7. Ini bagian : bagian." },
      { nama: "Cika", teks: "Mangga banding semua buah?" },
      { nama: "Pak Bima", teks: "Jumlahkan dulu: 5 + 7 = 12. Jadi 5 : 12. Ini bagian : keseluruhan." },
      { nama: "Kak Nara", teks: "Huu-huu! Ada kata “semua”, “seluruh”, atau “total”? Jumlahkan dulu!" },
      { nama: "Rio", teks: "Jambu banding semua buah = 7 : 12." },
    ],
    suaraKuis: {
      tanya: "Ada 8 bunga matahari dan 4 lavender. Berapa rasio lavender terhadap seluruh bunga?",
      alias: ["4 banding 12", "1 banding 3", "4 12", "1 3"],
      kunci: "Seluruh bunga 8 + 4 = 12. Lavender : seluruhnya = 4 : 12 = 1 : 3.",
    },
    kanvas: {
      tanya: "Ada 9 kancing biru dan 6 kancing merah. Tulis biru : merah, biru : seluruhnya, dan merah : seluruhnya, dalam bentuk sederhana.",
      alias: ["3 2", "3 5", "2 5"],
      kunci: "9 : 6 = 3 : 2. Seluruhnya 15, jadi biru 9 : 15 = 3 : 5, dan merah 6 : 15 = 2 : 5.",
    },
  },
  {
    id: "c2",
    judul: "Adegan C2 · Jadwal Penyiraman",
    suara: "Rasio juga dipakai untuk waktu dan kecepatan. Aturan utamanya: samakan satuan waktu dulu!",
    figur: "waktu",
    dialog: [
      { nama: "Lala", teks: "Pompa A menyala 20 menit, pompa B 50 menit. Rasionya 20 : 50!" },
      { nama: "Rio", teks: "Dibagi 10, jadi 2 : 5." },
      { nama: "Pak Bima", teks: "Mesin penyiram menyiram 60 pot dalam 12 menit. 60 : 12 = 5 : 1, jadi 5 pot per menit." },
      { nama: "Kak Nara", teks: "Kalau satuan waktunya beda, ubah dulu. 1 jam = 60 menit." },
      { nama: "Pak Bima", teks: "120 km dalam 2 jam? 120 : 2 = 60 : 1, artinya 60 km per jam. Itu namanya kecepatan." },
    ],
    suaraKuis: {
      tanya: "Kincir berputar 90 kali dalam 3 menit. Berapa putaran per menit?",
      alias: ["30", "tiga puluh", "30 putaran"],
      kunci: "90 ÷ 3 = 30 putaran per menit.",
    },
    kanvas: {
      tanya: "Bus kebun menempuh 180 km dalam 3 jam. Tulis rasio jarak : waktu sebagai rasio satuan.",
      alias: ["180 3", "60 1", "60 km"],
      kunci: "180 : 3 = 60 : 1, yaitu 60 km/jam.",
    },
  },
];

const PERMAINAN_A: Permainan[] = [
  {
    jenis: "pilih",
    id: "pa1",
    tanya: "Ada 3 bunga matahari dan 9 tulip. Bunga matahari dibanding tulip adalah…",
    opsi: [
      { huruf: "A", teks: "3 kali lipat" },
      { huruf: "B", teks: "sepertiganya" },
      { huruf: "C", teks: "6 lebih banyak" },
      { huruf: "D", teks: "sama banyak" },
    ],
    benar: "B",
    umpan: "3 : 9 = 1 : 3. Bunga matahari sepertiga dari tulip.",
  },
  {
    jenis: "pilih",
    id: "pa2",
    tanya: "Pilih kartu yang menunjukkan rasio 2 : 5 untuk biru : kuning.",
    opsi: [
      { huruf: "A", teks: "5 biru, 2 kuning" },
      { huruf: "B", teks: "2 biru, 3 kuning" },
      { huruf: "C", teks: "2 biru, 5 kuning" },
      { huruf: "D", teks: "5 biru, 5 kuning" },
    ],
    benar: "C",
    umpan: "Yang disebut pertama adalah biru. Jadi 2 biru dan 5 kuning.",
  },
  {
    jenis: "cocok",
    id: "pa3",
    tanya: "Cocokkan rasio dengan bentuk sederhananya.",
    pasangan: [
      { kiri: "6 : 8", kanan: "3 : 4" },
      { kiri: "10 : 15", kanan: "2 : 3" },
      { kiri: "9 : 3", kanan: "3 : 1" },
      { kiri: "4 : 12", kanan: "1 : 3" },
    ],
    umpan: "6 : 8 → 3 : 4. 10 : 15 → 2 : 3. 9 : 3 → 3 : 1. 4 : 12 → 1 : 3.",
  },
  {
    jenis: "susun",
    id: "pa4",
    tanya: "Urutkan langkah mencari rasio kucing terhadap seluruh hewan. Ada 7 kucing dan 5 anjing.",
    langkah: [
      { kode: "a", teks: "Cek apakah bisa disederhanakan" },
      { kode: "b", teks: "Hitung total 7 + 5" },
      { kode: "c", teks: "Tulis 7 : 12" },
    ],
    urutan: ["b", "c", "a"],
    umpan: "Totalnya 12. Rasio 7 : 12 sudah paling sederhana.",
  },
  {
    jenis: "benarSalah",
    id: "pa5",
    tanya: "4 : 6 senilai dengan 8 : 12, tetapi tidak senilai dengan 2 : 3.",
    benar: false,
    umpan: "Salah. 4 : 6, 8 : 12, dan 2 : 3 sama-sama senilai dengan 2 : 3.",
  },
];

const INFOGRAFIS: {
  id: string;
  judul: string;
  suara: string;
  tabel: { kepala: string[]; baris: string[][] };
  contoh: string;
  suaraKuis: KuisSingkat;
  kanvas: KuisSingkat;
}[] = [
  {
    id: "ib1",
    judul: "Membandingkan benda",
    suara: "Ingat tiga cara membandingkan: selisih, berapa kali lipat, dan kata-kata.",
    tabel: {
      kepala: ["Cara", "Rumus", "Contoh 6 dan 3"],
      baris: [
        ["Selisih", "besar − kecil", "6 − 3 = 3"],
        ["Kali lipat", "besar ÷ kecil", "6 ÷ 3 = 2 kali"],
        ["Kata", "—", "dua kali lipat"],
      ],
    },
    contoh: "12 pot mint dan 4 pot basil. 12 ÷ 4 = 3 kali lipat.",
    suaraKuis: {
      tanya: "15 jeruk dan 5 apel. Jeruk berapa kali lipat apel?",
      alias: ["3", "tiga", "3 kali"],
      kunci: "15 ÷ 5 = 3 kali.",
    },
    kanvas: {
      tanya: "Gambar 5 bintang dan 15 lingkaran. Tulis selisih dan kali lipatnya.",
      alias: ["selisih 10", "10", "3 kali"],
      kunci: "Selisih 15 − 5 = 10. Kali lipat 15 ÷ 5 = 3.",
    },
  },
  {
    id: "ib2",
    judul: "Pengertian rasio",
    suara: "Rasio ditulis a : b dan dibaca a banding b. Besaran yang dibandingkan harus sejenis!",
    tabel: {
      kepala: ["Ditulis", "Dibaca", "Artinya"],
      baris: [
        ["3 : 2", "tiga banding dua", "3 air, 2 sirup"],
        ["7 : 1", "tujuh banding satu", "7 untuk tiap 1"],
        ["5 : 5", "lima banding lima", "sama banyak, 1 : 1"],
      ],
    },
    contoh: "8 krayon : 12 pensil = 8 : 12 = 8/12 = 2 : 3.",
    suaraKuis: {
      tanya: "Bacakan rasio 8 krayon dan 12 pensil warna.",
      alias: ["delapan banding dua belas", "8 banding 12", "2 banding 3"],
      kunci: "Delapan banding dua belas. Bentuk sederhananya 2 : 3.",
    },
    kanvas: {
      tanya: "Tulis 9 buku : 6 penggaris dalam bentuk titik dua, pecahan, dan paling sederhana.",
      alias: ["9 6", "9/6", "3 2"],
      kunci: "9 : 6, lalu 9/6, dan bentuk sederhananya 3 : 2.",
    },
  },
  {
    id: "ib3",
    judul: "Kesamaan rasio",
    suara: "Kalikan atau bagi kedua angka dengan bilangan yang sama. Nilai rasio tidak berubah.",
    tabel: {
      kepala: ["Rasio", "× 2", "× 3", "Sederhana"],
      baris: [
        ["2 : 3", "4 : 6", "6 : 9", "2 : 3"],
        ["1 : 4", "2 : 8", "3 : 12", "1 : 4"],
        ["3 : 5", "6 : 10", "9 : 15", "3 : 5"],
      ],
    },
    contoh: "18 : 24. FPB-nya 6. 18 ÷ 6 = 3 dan 24 ÷ 6 = 4. Hasilnya 3 : 4.",
    suaraKuis: {
      tanya: "15 : 25 dibagi berapa supaya sederhana, dan hasilnya apa?",
      alias: ["dibagi 5", "3 banding 5", "3 5"],
      kunci: "Dibagi 5, hasilnya 3 : 5.",
    },
    kanvas: {
      tanya: "Dari 4 : 7, tulis tiga rasio senilai.",
      alias: ["8 14", "12 21", "16 28"],
      kunci: "8 : 14, 12 : 21, dan 16 : 28.",
    },
  },
  {
    id: "ib4",
    judul: "Rasio satuan",
    suara: "Ubah salah satu angka menjadi 1 dengan cara membagi. Hasilnya mudah dibandingkan.",
    tabel: {
      kepala: ["Situasi", "Rasio", "Dibagi", "Rasio satuan"],
      baris: [
        ["4 kg jeruk Rp60.000", "60.000 : 4", "4", "15.000 : 1"],
        ["9 bibit, 3 menit", "9 : 3", "3", "3 : 1"],
        ["120 km, 2 jam", "120 : 2", "2", "60 : 1"],
      ],
    },
    contoh: "60 pot : 12 menit dibagi 12 menjadi 5 : 1, yaitu 5 pot per menit.",
    suaraKuis: {
      tanya: "48 kotak dikemas dalam 6 menit. Berapa kotak per menit?",
      alias: ["8", "delapan", "8 kotak"],
      kunci: "48 ÷ 6 = 8 kotak per menit.",
    },
    kanvas: {
      tanya: "20 liter pupuk dari 4 kg bahan. Tulis rasio satuan pupuk : bahan.",
      alias: ["20 4", "5 1", "5 liter"],
      kunci: "20 : 4 = 5 : 1.",
    },
  },
  {
    id: "ib5",
    judul: "Bagian terhadap bagian dan terhadap keseluruhan",
    suara: "Bagian dengan bagian dibandingkan langsung. Bagian dengan keseluruhan, jumlahkan dulu semuanya!",
    tabel: {
      kepala: ["Pertanyaan", "Jenis", "Cara", "Jawaban"],
      baris: [
        ["mangga : jambu", "Bagian : bagian", "langsung", "5 : 7"],
        ["mangga : semua", "Bagian : keseluruhan", "5 + 7 = 12", "5 : 12"],
        ["jambu : semua", "Bagian : keseluruhan", "5 + 7 = 12", "7 : 12"],
      ],
    },
    contoh: "5 mangga dan 7 jambu. Seluruh buah ada 12.",
    suaraKuis: {
      tanya: "6 apel dan 9 jeruk. Rasio jeruk terhadap seluruh buah?",
      alias: ["9 banding 15", "3 banding 5", "9 15", "3 5"],
      kunci: "Seluruhnya 15. Jeruk : seluruhnya = 9 : 15 = 3 : 5.",
    },
    kanvas: {
      tanya: "10 bola merah dan 6 bola putih. Tulis merah : seluruhnya dan putih : merah.",
      alias: ["5 8", "10 16", "3 5", "6 10"],
      kunci: "Seluruhnya 16, jadi 10 : 16 = 5 : 8. Putih : merah = 6 : 10 = 3 : 5.",
    },
  },
  {
    id: "ib6",
    judul: "Rasio pada durasi waktu",
    suara: "Samakan satuan waktu dulu. Satu jam sama dengan enam puluh menit.",
    tabel: {
      kepala: ["Situasi", "Samakan", "Rasio", "Sederhana"],
      baris: [
        ["1 jam : 20 menit", "60 : 20", "60 : 20", "3 : 1"],
        ["90 menit : 2 jam", "90 : 120", "90 : 120", "3 : 4"],
        ["180 km : 3 jam", "sudah sama", "180 : 3", "60 : 1"],
      ],
    },
    contoh: "Kereta 240 km dalam 4 jam. 240 : 4 = 60 : 1, yaitu 60 km/jam.",
    suaraKuis: {
      tanya: "Menyiram 45 menit pagi dan 15 menit sore. Rasio pagi : sore?",
      alias: ["45 banding 15", "3 banding 1", "3 1"],
      kunci: "45 : 15 = 3 : 1.",
    },
    kanvas: {
      tanya: "Ani berlari 300 m dalam 60 detik. Tulis rasio satuannya.",
      alias: ["300 60", "5 1", "5 meter"],
      kunci: "300 : 60 = 5 : 1, yaitu 5 m/detik.",
    },
  },
];

const PERMAINAN_B: Permainan[] = [
  {
    jenis: "pilih",
    id: "pb1",
    tanya: "Pasangan rasio manakah yang senilai?",
    opsi: [
      { huruf: "A", teks: "2 : 3 dan 3 : 2" },
      { huruf: "B", teks: "4 : 5 dan 5 : 4" },
      { huruf: "C", teks: "12 : 18 dan 2 : 3" },
      { huruf: "D", teks: "6 : 8 dan 4 : 6" },
    ],
    benar: "C",
    umpan: "12 : 18 dibagi 6 menjadi 2 : 3. Pasangan lain urutannya terbalik atau tidak senilai.",
  },
  {
    jenis: "cocok",
    id: "pb2",
    tanya: "Cocokkan gambar dengan rasio sederhananya.",
    pasangan: [
      { kiri: "3 biru : 9 biru", kanan: "1 : 3" },
      { kiri: "2 hati : 10 hati", kanan: "1 : 5" },
      { kiri: "5 daun : 5 daun", kanan: "1 : 1" },
      { kiri: "6 bintang : 4 bintang", kanan: "3 : 2" },
    ],
    umpan: "3 : 9 → 1 : 3. 2 : 10 → 1 : 5. 5 : 5 → 1 : 1. 6 : 4 → 3 : 2.",
  },
  {
    jenis: "susun",
    id: "pb3",
    tanya: "Urutkan langkah rasio kucing terhadap seluruh hewan. Ada 4 kucing dan 8 anjing.",
    langkah: [
      { kode: "a", teks: "Sederhanakan" },
      { kode: "b", teks: "Tulis 4 : 12" },
      { kode: "c", teks: "Hitung 4 + 8" },
    ],
    urutan: ["c", "b", "a"],
    umpan: "Total 12. Rasio 4 : 12 disederhanakan menjadi 1 : 3.",
  },
  {
    jenis: "pilih",
    id: "pb4",
    tanya: "Rasio satuan 6 kg gula seharga Rp72.000 adalah…",
    opsi: [
      { huruf: "A", teks: "6 : 72.000" },
      { huruf: "B", teks: "72.000 : 6" },
      { huruf: "C", teks: "1 : 6" },
      { huruf: "D", teks: "12.000 : 1" },
    ],
    benar: "D",
    umpan: "72.000 ÷ 6 = 12.000. Jadi Rp12.000 per kg, ditulis 12.000 : 1.",
  },
  {
    jenis: "benarSalah",
    id: "pb5",
    tanya: "30 menit dibanding 2 jam boleh langsung ditulis 30 : 2.",
    benar: false,
    umpan: "Salah. Samakan dulu: 2 jam = 120 menit. 30 : 120 = 1 : 4.",
  },
];

const MISI: Permainan[] = [
  {
    jenis: "pilih",
    id: "m1",
    tanya: "Misi 1. Ada 7 pot selada dan 14 pot bayam. Pot bayam berapa kali lipat pot selada?",
    opsi: [
      { huruf: "A", teks: "7 kali" },
      { huruf: "B", teks: "2 kali" },
      { huruf: "C", teks: "setengahnya" },
      { huruf: "D", teks: "21 kali" },
    ],
    benar: "B",
    umpan: "14 ÷ 7 = 2. Bayam dua kali lipat selada.",
  },
  {
    jenis: "pilih",
    id: "m2",
    tanya: "Misi 2. Resep pupuk 4 air : 6 pupuk. Bentuk sederhananya?",
    opsi: [
      { huruf: "A", teks: "2 : 3" },
      { huruf: "B", teks: "3 : 2" },
      { huruf: "C", teks: "4 : 6" },
      { huruf: "D", teks: "1 : 6" },
    ],
    benar: "A",
    umpan: "4 : 6 dibagi 2 menjadi 2 : 3.",
  },
  {
    jenis: "pilih",
    id: "m3",
    tanya: "Misi 3. Rak berisi 5 bunga dan 3 kaktus. Rasio kaktus terhadap seluruh pot?",
    opsi: [
      { huruf: "A", teks: "5 : 8" },
      { huruf: "B", teks: "3 : 8" },
      { huruf: "C", teks: "3 : 5" },
      { huruf: "D", teks: "8 : 3" },
    ],
    benar: "B",
    umpan: "Seluruh pot 5 + 3 = 8. Kaktus : seluruhnya = 3 : 8.",
  },
  {
    jenis: "suara",
    id: "m4",
    tanya: "Misi 4. Mesin A berbunyi 20 kali, mesin B 5 kali. Sebutkan rasio A : B paling sederhana.",
    alias: ["4 banding 1", "4 1", "empat banding satu"],
    umpan: "20 : 5 = 4 : 1.",
  },
  {
    jenis: "pilih",
    id: "m5",
    tanya: "Misi 5. 4 bibit dalam 2 menit. Rasio satuannya?",
    opsi: [
      { huruf: "A", teks: "1 : 2" },
      { huruf: "B", teks: "2 : 1" },
      { huruf: "C", teks: "4 : 1" },
      { huruf: "D", teks: "8 : 1" },
    ],
    benar: "B",
    umpan: "4 ÷ 2 = 2. Jadi 2 bibit per menit, atau 2 : 1.",
  },
  {
    jenis: "cocok",
    id: "m6",
    tanya: "Misi 6. Cocokkan situasi dengan rasio satuannya.",
    pasangan: [
      { kiri: "Rp18.000 untuk 3 biji", kanan: "6.000 : 1" },
      { kiri: "8 kotak dalam 4 menit", kanan: "2 : 1" },
      { kiri: "100 km dalam 2 jam", kanan: "50 : 1" },
    ],
    umpan: "18.000 ÷ 3 = 6.000. 8 ÷ 4 = 2. 100 ÷ 2 = 50.",
  },
  {
    jenis: "pilih",
    id: "m7",
    tanya: "Misi 7. Mesin menyiram 36 pot dalam 9 menit. Berapa pot per menit?",
    opsi: [
      { huruf: "A", teks: "3" },
      { huruf: "B", teks: "4" },
      { huruf: "C", teks: "5" },
      { huruf: "D", teks: "9" },
    ],
    benar: "B",
    umpan: "36 ÷ 9 = 4 pot per menit.",
  },
  {
    jenis: "pilih",
    id: "m8",
    tanya: "Misi 8. Ada 9 bunga matahari dan 6 lavender. Rasio matahari terhadap seluruh bunga?",
    opsi: [
      { huruf: "A", teks: "9 : 6" },
      { huruf: "B", teks: "6 : 15" },
      { huruf: "C", teks: "3 : 5" },
      { huruf: "D", teks: "5 : 3" },
    ],
    benar: "C",
    umpan: "Seluruhnya 15. 9 : 15 = 3 : 5.",
  },
  {
    jenis: "pilih",
    id: "m9",
    tanya: "Misi 9. Pompa menyala 40 menit pagi dan 1 jam sore. Rasio pagi : sore yang paling sederhana?",
    opsi: [
      { huruf: "A", teks: "40 : 1" },
      { huruf: "B", teks: "2 : 3" },
      { huruf: "C", teks: "4 : 6" },
      { huruf: "D", teks: "3 : 2" },
    ],
    benar: "B",
    umpan: "1 jam = 60 menit. 40 : 60 = 2 : 3. Bentuk 4 : 6 masih senilai, tetapi belum paling sederhana.",
  },
  {
    jenis: "kanvas",
    id: "m10",
    tanya: "Misi 10. Lintasan 150 m ditempuh dalam 5 menit. Gambar garis waktunya, lalu tulis rasio satuannya.",
    alias: ["150 5", "30 1", "30 meter", "30 m"],
    umpan: "150 : 5 = 30 : 1, yaitu 30 m/menit.",
  },
];

const POIN = [
  "Membandingkan memakai selisih, berapa kali lipat, atau kata-kata.",
  "Rasio adalah perbandingan dua besaran sejenis, ditulis a : b atau a/b.",
  "Satuan kedua besaran harus sama.",
  "Kesamaan rasio: kali atau bagi kedua angka dengan bilangan yang sama.",
  "Menyederhanakan berarti bagi dengan FPB.",
  "Rasio satuan membuat salah satu angkanya 1, misalnya harga per kg atau km per jam.",
  "Bagian : bagian membandingkan dua bagian secara langsung.",
  "Bagian : keseluruhan menjumlahkan semua bagian lebih dulu.",
  "Untuk waktu, samakan satuan dulu. 1 jam = 60 menit. Kecepatan = jarak : waktu.",
];

const EVALUASI: Permainan[] = [
  {
    jenis: "pilih",
    id: "e1",
    tanya: "Rak P berisi 12 bibit cabai dan rak Q 18 bibit tomat. Rio menulis P : Q = 3 : 2. Cika menulis 2 : 3. Siapa yang benar?",
    opsi: [
      { huruf: "A", teks: "Rio" },
      { huruf: "B", teks: "Cika" },
    ],
    benar: "B",
    umpan: "12 : 18 dibagi 6 = 2 : 3. Cika benar. Rio membalik urutannya.",
  },
  {
    jenis: "pilih",
    id: "e2",
    tanya: "Penawaran A: 8 bibit Rp40.000. Penawaran B: 5 bibit Rp30.000. Mana yang lebih murah per bibit?",
    opsi: [
      { huruf: "A", teks: "Penawaran A" },
      { huruf: "B", teks: "Penawaran B" },
    ],
    benar: "A",
    umpan: "A = 40.000 ÷ 8 = Rp5.000 per bibit. B = 30.000 ÷ 5 = Rp6.000 per bibit. A lebih murah.",
  },
  {
    jenis: "pilih",
    id: "e3",
    tanya: "Kotak berisi 9 bola merah, 6 kuning, dan 5 hijau. Manakah pasangan yang tepat untuk kuning : seluruhnya dan merah : kuning?",
    opsi: [
      { huruf: "A", teks: "6 : 20 dan 9 : 6" },
      { huruf: "B", teks: "3 : 10 dan 3 : 2" },
      { huruf: "C", teks: "6 : 15 dan 3 : 2" },
      { huruf: "D", teks: "9 : 20 dan 2 : 3" },
    ],
    benar: "B",
    umpan: "Total 9 + 6 + 5 = 20. Kuning : seluruhnya = 6 : 20 = 3 : 10. Merah : kuning = 9 : 6 = 3 : 2.",
  },
  {
    jenis: "tulis",
    id: "e4",
    tanya: "Jus memakai 3 bagian sari buah : 5 bagian air. Untuk 48 liter campuran, berapa liter sari buah?",
    alias: ["18", "18 liter", "delapan belas"],
    umpan: "3 + 5 = 8 bagian. 48 ÷ 8 = 6 liter tiap bagian. Sari buah 3 × 6 = 18 liter.",
  },
  {
    jenis: "suara",
    id: "e5",
    tanya: "Rio berkata: “6 : 10 dan 9 : 15 tidak senilai karena angkanya beda.” Benarkah? Jawab benar atau salah.",
    alias: ["salah", "tidak", "tidak benar"],
    umpan: "Salah. 6 : 10 = 3 : 5 dan 9 : 15 = 3 : 5. Keduanya senilai.",
  },
  {
    jenis: "tulis",
    id: "e6",
    tanya: "Mesin A menyala 25 menit, mesin B 1 jam. Tulis rasio A : B paling sederhana.",
    alias: ["5 banding 12", "5 12", "25 60"],
    umpan: "1 jam = 60 menit. 25 : 60 = 5 : 12.",
  },
  {
    jenis: "pilih",
    id: "e7",
    tanya: "Bus menempuh 210 km dalam 3 jam. Motor menempuh 90 km dalam 1 jam 30 menit. Mana yang lebih cepat?",
    opsi: [
      { huruf: "A", teks: "Bus, 70 km/jam" },
      { huruf: "B", teks: "Motor, 90 km/jam" },
      { huruf: "C", teks: "Sama cepat" },
      { huruf: "D", teks: "Motor, 70 km/jam" },
    ],
    benar: "A",
    umpan: "Bus 210 ÷ 3 = 70 km/jam. Motor 90 km dalam 1,5 jam = 60 km/jam. Bus lebih cepat.",
  },
  {
    jenis: "benarSalah",
    id: "e8",
    tanya: "Kelompok 1 menumbuhkan 4 tanaman dalam 2 minggu. Kelompok 2 menumbuhkan 10 tanaman dalam 5 minggu. Rio bilang kelompok 2 dua kali lebih produktif.",
    benar: false,
    umpan: "Tidak setuju. 4 : 2 = 2 : 1 dan 10 : 5 = 2 : 1. Produktivitasnya sama.",
  },
  {
    jenis: "kanvas",
    id: "e9",
    tanya: "Gambar kelompok benda yang rasio bagian terhadap keseluruhannya 3 : 8. Tulis banyak bagian itu dan seluruhnya, misalnya 3 dan 8.",
    alias: ["3 dan 8", "3 8", "3 banding 8"],
    umpan: "Contohnya 3 bintang dan 5 lingkaran. Seluruhnya 8, jadi bagian itu 3 : 8.",
  },
  {
    jenis: "pilih",
    id: "e10",
    tanya: "Kotak A 5 kantong, B 10 kantong, C 15 kantong. Apakah B : seluruhnya senilai dengan A : B?",
    opsi: [
      { huruf: "A", teks: "Senilai, keduanya 1 : 2" },
      { huruf: "B", teks: "Tidak senilai. B : seluruhnya = 1 : 3, A : B = 1 : 2" },
      { huruf: "C", teks: "Senilai, keduanya 1 : 3" },
      { huruf: "D", teks: "Tidak senilai. B : seluruhnya = 1 : 2" },
    ],
    benar: "B",
    umpan: "Total 30. B : seluruhnya = 10 : 30 = 1 : 3. A : B = 5 : 10 = 1 : 2. Tidak senilai.",
  },
];

function cuplikan(teks: string): CuplikanVoiceMateri[] {
  return [{ teks, jedaSetelahMs: 0 }];
}

function cocokAlias(teks: string, alias: string[]): boolean {
  return jawabanTulisMemuatAlias(teks, alias);
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

function Figur({ jenis }: { jenis: AdeganRasio["figur"] }) {
  if (jenis === "rak") {
    return (
      <figure className="w-full space-y-2">
        <figcaption className="text-base font-bold text-slate-700">Rak A 6 kantong, rak B 3 kantong. Rak A dua kali lipat.</figcaption>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-3xl leading-tight">🌱🌱🌱🌱🌱🌱</p>
          <Papan anak="2 kali lipat" />
          <p className="text-3xl leading-tight">🌱🌱🌱</p>
        </div>
        <Papan anak="Urutan penting: 6 dibanding 3 tidak sama dengan 3 dibanding 6." />
      </figure>
    );
  }
  if (jenis === "jus") {
    return (
      <figure className="w-full">
        <p className="text-base font-bold text-slate-700">Resep jus, 3 bagian air dan 2 bagian sirup.</p>
        <Papan anak="3 : 2" />
        <p className="mt-1 text-base text-slate-600">Dibaca tiga banding dua. Sama dengan pecahan 3/2. Satuan harus sama.</p>
      </figure>
    );
  }
  if (jenis === "resep") {
    return (
      <figure className="w-full">
        <p className="text-base font-bold text-slate-700">Tiga resep, satu rasa. Kedua angka diperlakukan sama.</p>
        <Papan anak="2 : 3 → 4 : 6 → 6 : 9" />
        <p className="mt-1 text-base text-slate-600">Kali 2, lalu kali 3. Bagi 6 : 9 dengan 3 kembali ke 2 : 3.</p>
      </figure>
    );
  }
  if (jenis === "jeruk") {
    return (
      <figure className="w-full">
        <p className="text-base font-bold text-slate-700">4 kg jeruk seharga Rp60.000.</p>
        <Papan anak="Rp60.000 ÷ 4 = Rp15.000" />
        <p className="mt-1 text-base text-slate-600">Rasio satuan: 15.000 : 1, yaitu Rp15.000 per kg.</p>
      </figure>
    );
  }
  if (jenis === "buah") {
    return (
      <figure className="w-full space-y-1">
        <p className="text-base font-bold text-slate-700">5 mangga dan 7 jambu. Seluruhnya 12 buah.</p>
        <Papan anak="Bagian : bagian = 5 : 7" />
        <Papan anak="Bagian : keseluruhan = 5 : 12" />
      </figure>
    );
  }
  return (
    <figure className="w-full">
      <p className="text-base font-bold text-slate-700">Samakan satuan waktu dulu. 1 jam = 60 menit.</p>
      <Papan anak="20 menit : 50 menit = 2 : 5" />
      <p className="mt-1 text-base text-slate-600">120 km dalam 2 jam = 60 : 1, yaitu 60 km/jam.</p>
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
              <th key={sel} className={`px-2 py-2 text-white ${["bg-teal-600", "bg-orange-500", "bg-violet-600", "bg-amber-500"][indeks % 4]}`}>{sel}</th>
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
      {pilih ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
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
  const pilihan = pasangan.map((item) => item.kanan);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{tanya}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk baris, lalu ketuk pasangannya.</p>
      <div className="grid w-full gap-2">
        {pasangan.map((item, indeks) => (
          <button
            key={item.kiri}
            type="button"
            onClick={() => setAktif(indeks)}
            className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${aktif === indeks ? "border-violet-400 bg-white ring-2 ring-violet-400" : "border-sky-200 bg-white"}`}
          >
            <span className="font-black">{item.kiri}</span>
            <span className="mt-1 block">{peta[indeks] || "Belum dipasangkan"}</span>
          </button>
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {pilihan.map((kanan) => (
          <button
            key={kanan}
            type="button"
            onClick={() => {
              setPeta((lama) => ({ ...lama, [aktif]: kanan }));
              setCek(false);
            }}
            className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          >
            {kanan}
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
          <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p>
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
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join(" → ") || "Ketuk langkah sesuai urutan."}</p>
      <div className="flex w-full flex-wrap gap-2">
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
          <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p>
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
          <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p>
        </div>
      ) : null}
    </article>
  );
}

function KuisSuaraLokal({ tanya, alias, kunci, onNilai }: KuisSingkat & { onNilai?: (benar: boolean) => void }) {
  const [tepat, setTepat] = useState<boolean | null>(null);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara
        pertanyaan={<span className="text-base font-bold">{tanya}</span>}
        periksa={(teks) => cocokAlias(teks, alias)}
        sesudahNilai={(hasil) => {
          setTepat(hasil);
          onNilai?.(hasil);
        }}
      />
      {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{kunci}</p> : null}
    </div>
  );
}

function KuisTulis({
  tanya,
  alias,
  umpan,
  onNilai,
}: {
  tanya: string;
  alias: string[];
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
          const ok = cocokAlias(jawaban, alias);
          setHasil(ok);
          onNilai?.(ok);
        }}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      {hasil !== null ? (
        <div className="mt-3">
          <HasilJawabanKuis status={hasil ? "benar" : "salah"} cuplikan={jawaban} pesanSalah="Coba tulis lagi." />
          <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p>
        </div>
      ) : null}
    </article>
  );
}

function KuisKanvasLokal({
  id,
  tanya,
  alias,
  kunci,
  onNilai,
}: KuisSingkat & { id: string; onNilai?: (benar: boolean) => void }) {
  const [selesai, setSelesai] = useState(false);
  return (
    <div className="w-full">
      <KuisTulisKartu
        id={`mtk6-bab2-${id}`}
        pertanyaan={tanya}
        alias={alias}
        konteks={kunci}
        hanyaKanvas
        sesudahNilai={(benar) => {
          setSelesai(true);
          onNilai?.(benar);
        }}
      />
      {selesai ? <p className="mt-2 text-sm font-bold text-emerald-800">{kunci}</p> : null}
    </div>
  );
}

function RenderPermainan({
  item,
  onNilai,
}: {
  item: Permainan;
  onNilai?: (benar: boolean) => void;
}) {
  if (item.jenis === "pilih") {
    return <KuisPilih tanya={item.tanya} opsi={item.opsi} benar={item.benar} umpan={item.umpan} onNilai={onNilai} />;
  }
  if (item.jenis === "cocok") {
    return <KuisCocok tanya={item.tanya} pasangan={item.pasangan} umpan={item.umpan} onNilai={onNilai} />;
  }
  if (item.jenis === "susun") {
    return <KuisSusun tanya={item.tanya} langkah={item.langkah} urutan={item.urutan} umpan={item.umpan} onNilai={onNilai} />;
  }
  if (item.jenis === "benarSalah") {
    return <KuisBenarSalah tanya={item.tanya} benar={item.benar} umpan={item.umpan} onNilai={onNilai} />;
  }
  if (item.jenis === "suara") {
    return <KuisSuaraLokal tanya={item.tanya} alias={item.alias} kunci={item.umpan} onNilai={onNilai} />;
  }
  if (item.jenis === "tulis") {
    return <KuisTulis tanya={item.tanya} alias={item.alias} umpan={item.umpan} onNilai={onNilai} />;
  }
  return <KuisKanvasLokal id={item.id} tanya={item.tanya} alias={item.alias} kunci={item.umpan} onNilai={onNilai} />;
}

export default function Bab2RasioModule() {
  const [skorMisi, setSkorMisi] = useState<Record<string, number>>({});
  const [salahMisi, setSalahMisi] = useState<Record<string, boolean>>({});
  const poinDaun = Object.values(skorMisi).reduce((jumlah, nilai) => jumlah + nilai, 0);

  const nilaiMisi = (id: string, benar: boolean) => {
    if (skorMisi[id]) return;
    if (!benar) {
      setSalahMisi((lama) => ({ ...lama, [id]: true }));
      return;
    }
    setSkorMisi((lama) => ({ ...lama, [id]: salahMisi[id] ? 5 : 10 }));
  };

  return (
    <div className="space-y-5">
      <section className="space-y-4">
        <KepalaBagian
          ikon="🦉👨‍🏫"
          judul="A. Naskah bergambar"
          anak="Di rumah kaca ini kamu membandingkan benda, menulis rasio, mencari rasio yang senilai, dan membedakan bagian dengan keseluruhan."
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
            <KuisKanvasLokal id={`${adegan.id}-kanvas`} {...adegan.kanvas} />
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
        <KepalaBagian
          ikon="📊"
          judul="B. Infografis"
          anak="Tabel ini merangkum cara membandingkan, menulis rasio, dan menyamakan satuan."
        />
        {INFOGRAFIS.map((kartu) => (
          <section key={kartu.id} className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{kartu.judul}</p>
            <TombolVoiceMateriPai1 cuplikan={cuplikan(kartu.suara)} />
            <Tabel kepala={kartu.tabel.kepala} baris={kartu.tabel.baris} />
            <p className="text-sm font-semibold leading-relaxed text-slate-700">{kartu.contoh}</p>
            <KuisSuaraLokal {...kartu.suaraKuis} />
            <KuisKanvasLokal id={`${kartu.id}-kanvas`} {...kartu.kanvas} />
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
          ikon="🌿"
          judul="C. Misi menyelamatkan rumah kaca"
          anak="Jawaban benar pada percobaan pertama memberi 10 poin daun. Benar setelah salah sekali memberi 5 poin. Pintu terbuka pada 70 poin."
        />
        <TombolVoiceMateriPai1 cuplikan={cuplikan("Kamu jadi Asisten Rumah Kaca! Selesaikan 10 misi dengan rasio. Kumpulkan Poin Daun sampai 70 untuk membuka Pintu Rumah Kaca!")} />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {poinDaun} poin daun · {poinDaun >= 70 ? "pintu terbuka" : "pintu masih tertutup"}
        </p>
        <div className="space-y-3">
          {MISI.map((item) => (
            <div key={item.id}>
              <RenderPermainan item={item} onNilai={(benar) => nilaiMisi(item.id, benar)} />
              {skorMisi[item.id] ? (
                <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">+{skorMisi[item.id]} poin daun</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <KartuPoinPenting
        cuplikan={cuplikan("Ini kalimat-kalimat kunci bab Rasio. Ingat-ingat ya!")}
        poin={POIN}
      />

      <section className="space-y-4">
        <KepalaBagian
          ikon="📝"
          judul="Lembar evaluasi"
          anak="Sepuluh soal. Samakan satuan sebelum membandingkan waktu."
        />
        <TombolVoiceMateriPai1 cuplikan={cuplikan("Baca soal pelan-pelan. Tulis langkahmu, bukan hanya jawaban. Ingat samakan satuan dulu. Semangat!")} />
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
