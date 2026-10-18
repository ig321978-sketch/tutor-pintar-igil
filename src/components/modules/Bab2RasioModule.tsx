"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// 1. DATA MATERI RESMI KURIKULUM MERDEKA KELAS 6 SD - BAB 2: RASIO
// ============================================================================

export interface VisualSlideRasio {
  title: string;
  badge: string;
  explanation: string;
  visualType: "konsep_sirup" | "tabel_ekuivalen" | "unit_rate_belanja";
  keyTakeaways: string[];
  commonTrap: string;
}

export interface SubChapterRasio {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  storyHook: {
    character: string;
    avatar: string;
    dialogue: string;
    question: string;
  };
  slides: VisualSlideRasio[];
  kamusCilik: { kata: string; arti: string; ikon: string }[];
  offlineActivities: {
    teacherGuide: string[];
    parentGuide: string[];
  };
}

export const BAB2_MATERIALS: SubChapterRasio[] = [
  {
    id: "sub-a",
    code: "Sub-Bab A",
    title: "Konsep Rasio (Perbandingan)",
    subtitle: "Eksplorasi 2.1 & 2.2: Membandingkan Dua Besaran & Bagian Terhadap Keseluruhan",
    storyHook: {
      character: "Dini & Agam di Kebun Bibit",
      avatar: "🌱",
      dialogue:
        "Dini dan Agam sedang membantu menanam bibit pohon dalam program penghijauan sekolah. Dini membawa 4 bibit pohon jati, sedangkan Agam membawa 6 bibit pohon mahoni. Mereka ingin membandingkan banyaknya bibit yang mereka bawa tanpa menggunakan kata selisih (pengurangan).",
      question:
        "Bagaimana cara menuliskan perbandingan jumlah bibit Dini dan Agam dalam bentuk rasio paling sederhana?",
    },
    slides: [
      {
        title: "Tahap 1: Apa itu Rasio?",
        badge: "Eksplorasi 2.1 • Pengenalan Notasi",
        explanation:
          "Rasio adalah cara membandingkan dua besaran sejenis menggunakan pembagian. Jika Dini membawa 4 bibit dan Agam membawa 6 bibit, rasio bibit Dini terhadap Agam ditulis dengan tanda titik dua ( : ) atau pecahan.",
        visualType: "konsep_sirup",
        keyTakeaways: [
          "Notasi Rasio: Ditulis a : b (dibaca 'a berbanding b') atau bentuk a/b.",
          "Urutan Sangat Berpengaruh: Rasio Dini terhadap Agam (4 : 6) TIDAK SAMA dengan rasio Agam terhadap Dini (6 : 4).",
          "Penyederhanaan: Rasio 4 : 6 dapat disederhanakan dengan membagi kedua angka dengan FPB-nya (bagi 2), sehingga menjadi 2 : 3.",
        ],
        commonTrap: "⚠️ Jangan membalik urutan angka rasio! Siapa yang disebut pertama di soal, angkanya wajib ditaruh di depan.",
      },
      {
        title: "Tahap 2: Bagian terhadap Bagian vs Bagian terhadap Keseluruhan",
        badge: "Eksplorasi 2.2 • Analisis Perbandingan",
        explanation:
          "Dalam satu wadah terdapat 2 cangkir sirup merah dan 5 cangkir air mineral. Kita bisa membandingkan sirup dengan air, atau membandingkan sirup dengan total seluruh isi minuman.",
        visualType: "konsep_sirup",
        keyTakeaways: [
          "Bagian terhadap Bagian: Membandingkan sirup terhadap air = 2 : 5.",
          "Total Keseluruhan: Jumlah total cairan = 2 + 5 = 7 cangkir.",
          "Bagian terhadap Keseluruhan: Membandingkan sirup terhadap total minuman = 2 : 7.",
        ],
        commonTrap: "⚠️ Baca pertanyaan dengan teliti: apakah yang diminta perbandingan dengan benda lain (bagian:bagian) atau dengan jumlah total (bagian:total)?",
      },
    ],
    kamusCilik: [
      { kata: "Rasio", arti: "Perbandingan nilai antara dua atau lebih besaran sejenis.", ikon: "⚖️" },
      { kata: "Besaran Sejenis", arti: "Benda atau ukuran yang menggunakan satuan yang setara.", ikon: "📏" },
      { kata: "Rasio Sederhana", arti: "Bentuk rasio dengan bilangan bulat terkecil yang tidak bisa dibagi lagi.", ikon: "✨" },
    ],
    offlineActivities: {
      teacherGuide: [
        "Sediakan kancing baju dua warna berbeda (misal 6 merah dan 9 biru).",
        "Minta siswa mengelompokkan kancing menjadi beberapa paket kecil yang isi perbandingannya sama.",
      ],
      parentGuide: [
        "Ajak anak ke dapur saat membuat teh manis: bandingkan 1 sendok gula dengan 1 gelas air teh (1 : 1).",
      ],
    },
  },
  {
    id: "sub-b",
    code: "Sub-Bab B",
    title: "Rasio Ekuivalen (Rasio Senilai)",
    subtitle: "Eksplorasi 2.3 & 2.4: Melipatgandakan Takaran & Tabel Rasio Ekuivalen",
    storyHook: {
      character: "Koki Rendy di Dapur Kue",
      avatar: "👨‍🍳",
      dialogue:
        "Koki Rendy memiliki resep rahasia bolu kukus: untuk 2 cangkir tepung terigu, dibutuhkan 3 butir telur ayam. Hari ini Koki Rendy mendapat pesanan pesta dan harus membuat adonan menggunakan 6 cangkir tepung terigu. Berapa butir telur yang harus disiapkan?",
      question:
        "Bagaimana menjaga rasa kue tetap sama persis meskipun ukuran resep dilipatgandakan?",
    },
    slides: [
      {
        title: "Tahap 1: Menemukan Rasio Ekuivalen",
        badge: "Eksplorasi 2.3 • Sifat Perkalian Rasio",
        explanation:
          "Rasio ekuivalen adalah rasio-rasio yang memiliki nilai perbandingan yang sama persis. Agar rasa adonan tidak berubah, setiap pengali pada bagian pertama wajib dikalikan dengan angka yang sama pada bagian kedua.",
        visualType: "tabel_ekuivalen",
        keyTakeaways: [
          "Aturan Perkalian: Jika tepung dikali 3 (2 × 3 = 6), maka telur juga harus dikali 3 (3 × 3 = 9).",
          "Membagi Bersama: 6 : 9 ekuivalen dengan 2 : 3 karena kedua angka sama-sama dibagi 3.",
          "Dilarang Menjumlahkan: Menambah 4 cangkir tepung BUKAN berarti menambah 4 butir telur!",
        ],
        commonTrap: "⚠️ Rasio ekuivalen dibentuk lewat perkalian atau pembagian, BUKAN penambahan atau pengurangan!",
      },
      {
        title: "Tahap 2: Menggunakan Tabel Rasio untuk Pemecahan Masalah",
        badge: "Eksplorasi 2.4 • Tabel Skala",
        explanation:
          "Tabel rasio membantu kita menemukan nilai yang belum diketahui secara bertahap tanpa perlu menghafal rumus silang yang membingungkan.",
        visualType: "tabel_ekuivalen",
        keyTakeaways: [
          "Baris Pertama: Tepung (cangkir) -> [2, 4, 6, 8, 10].",
          "Baris Kedua: Telur (butir) -> [3, 6, 9, 12, 15].",
          "Pola Lompatan: Setiap kolom bertambah secara proporsional sesuai rasio dasar 2 : 3.",
        ],
        commonTrap: "⚠️ Selalu periksa kembali apakah hasil bagi setiap kolom bernilai sama dengan rasio dasarnya.",
      },
    ],
    kamusCilik: [
      { kata: "Ekuivalen", arti: "Memiliki nilai, ukuran, atau perbandingan yang sama.", ikon: "🔄" },
      { kata: "Faktor Pengali", arti: "Bilangan pengali yang sama untuk memperbesar kedua suku rasio.", ikon: "✖️" },
      { kata: "Proporsi", arti: "Persamaan yang menyatakan bahwa dua rasio bernilai sama.", ikon: "📊" },
    ],
    offlineActivities: {
      teacherGuide: [
        "Buat tabel rasio kosong di papan tulis untuk resep minuman jus buah kelas.",
        "Minta siswa mengisi kolom-kolom takaran jika jumlah tamu bertambah 2 kali, 3 kali, dan 5 kali.",
      ],
      parentGuide: [
        "Ajak anak menghitung kebutuhan beras keluarga: 1 hari butuh 3 gelas beras, berapa gelas untuk 4 hari?",
      ],
    },
  },
  {
    id: "sub-c",
    code: "Sub-Bab C",
    title: "Penerapan Rasio & Rasio Satuan (Unit Rate)",
    subtitle: "Eksplorasi 2.5: Menentukan Harga Satuan Termurah & Efisiensi Bahan Bakar",
    storyHook: {
      character: "Ibu & Budi Berbelanja",
      avatar: "🛒",
      dialogue:
        "Di supermarket ada dua pilihan detergen: Paket Hemat A berisi 3 kg seharga Rp45.000, sedangkan Paket Jumbo B berisi 5 kg seharga Rp70.000. Budi mengira Paket B lebih mahal karena harganya Rp70.000.",
      question:
        "Paket detergen manakah yang sebenarnya lebih murah dan hemat per kilogramnya?",
    },
    slides: [
      {
        title: "Tahap 1: Konsep Rasio Satuan (Unit Rate)",
        badge: "Eksplorasi 2.5 • Harga Satuan",
        explanation:
          "Rasio satuan adalah rasio yang suku keduanya disederhanakan menjadi 1 satuan. Dengan mengetahui harga per 1 kg atau jarak per 1 liter, kita bisa membandingkan pilihan secara adil.",
        visualType: "unit_rate_belanja",
        keyTakeaways: [
          "Paket A: Rp45.000 ÷ 3 kg = Rp15.000 per 1 kg.",
          "Paket B: Rp70.000 ÷ 5 kg = Rp14.000 per 1 kg.",
          "Keputusan Cerdas: Paket B lebih hemat karena harga per kilogramnya hanya Rp14.000 (selisih Rp1.000/kg).",
        ],
        commonTrap: "⚠️ Jangan tertipu angka harga total yang besar! Selalu bagi harga dengan kuantitasnya untuk mencari harga per 1 satuan.",
      },
      {
        title: "Tahap 2: Efisiensi Laju dan Konsumsi",
        badge: "Penerapan Nyata • Kecepatan & Bahan Bakar",
        explanation:
          "Mobil Ayah menempuh jarak 120 km dengan menghabiskan 10 liter bensin. Sepeda motor Kakak menempuh jarak 90 km dengan 5 liter bensin. Kendaraan mana yang lebih hemat bensin?",
        visualType: "unit_rate_belanja",
        keyTakeaways: [
          "Konsumsi Mobil: 120 km ÷ 10 liter = 12 km per liter.",
          "Konsumsi Motor: 90 km ÷ 5 liter = 18 km per liter.",
          "Motor lebih efisien karena dapat melaju lebih jauh (18 km) untuk setiap 1 liter bensin yang sama.",
        ],
        commonTrap: "⚠️ Untuk efisiensi bensin: angka km/liter yang LEBIH BESAR berarti LEBIH IRIT. Untuk harga belanja: harga/satuan yang LEBIH KECIL berarti LEBIH MURAH.",
      },
    ],
    kamusCilik: [
      { kata: "Rasio Satuan", arti: "Perbandingan kuantitas terhadap satu satuan besaran lain.", ikon: "🏷️" },
      { kata: "Efisiensi", arti: "Tingkat ketepatan atau kehematan penggunaan sumber daya.", ikon: "⚡" },
      { kata: "Laju / Kecepatan", arti: "Perbandingan antara jarak tempuh terhadap waktu tempuh.", ikon: "🚗" },
    ],
    offlineActivities: {
      teacherGuide: [
        "Bawa 2 kemasan makanan ringan berbeda ukuran ke kelas lengkap dengan struk belanja.",
        "Minta siswa menghitung harga per gram untuk menentukan kemasan paling ekonomis.",
      ],
      parentGuide: [
        "Saat mengisi bensin di SPBU, minta anak mencatat total rupiah dan liter yang dibeli lalu menghitung harga 1 liternya.",
      ],
    },
  },
];

// ============================================================================
// 2. BANK SOAL STATIS (10 SOAL) & GENERATOR DINAMIS ANTI-CONTEK
// ============================================================================

export interface QuestionItemRasio {
  id: string;
  category: "latihan" | "evaluasi" | "ujian";
  subBab: "A" | "B" | "C";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const STATIC_QUESTIONS_RASIO: QuestionItemRasio[] = [
  {
    id: "lat-r1",
    category: "latihan",
    subBab: "A",
    question: "Di dalam kelas ada 15 siswa laki-laki dan 20 siswa perempuan. Berapakah rasio paling sederhana antara siswa laki-laki dan perempuan?",
    options: ["3 : 4", "4 : 3", "3 : 7", "15 : 20"],
    correctAnswer: "3 : 4",
    explanation: "Rasio laki-laki terhadap perempuan = 15 : 20. Sederhanakan kedua suku dengan membaginya dengan FPB-nya (5): 15÷5 = 3 dan 20÷5 = 4. Jadi hasilnya 3 : 4.",
  },
  {
    id: "lat-r2",
    category: "latihan",
    subBab: "A",
    question: "Koleksi buku cerita Fajar terdiri dari 6 buku komik dan 18 buku dongeng. Berapakah rasio buku komik terhadap TOTAL seluruh buku cerita Fajar?",
    options: ["1 : 3", "1 : 4", "3 : 1", "6 : 18"],
    correctAnswer: "1 : 4",
    explanation: "Total seluruh buku = 6 + 18 = 24 buku. Rasio komik terhadap total = 6 : 24. Bagi kedua angka dengan 6, diperoleh 1 : 4.",
  },
  {
    id: "lat-r3",
    category: "latihan",
    subBab: "A",
    question: "Sebuah resep minuman membutuhkan 3 sendok sirup dan 1 gelas air. Manakah pernyataan perbandingan yang TEPAT?",
    options: [
      "Rasio sirup terhadap air adalah 3 : 1",
      "Rasio air terhadap sirup adalah 3 : 1",
      "Rasio sirup terhadap total minuman adalah 3 : 1",
      "Rasio air terhadap total minuman adalah 3 : 4",
    ],
    correctAnswer: "Rasio sirup terhadap air adalah 3 : 1",
    explanation: "Sirup = 3 dan Air = 1, sehingga rasio sirup terhadap air ditulis 3 : 1.",
  },
  {
    id: "lat-r4",
    category: "latihan",
    subBab: "B",
    question: "Rasio tepung terigu dan gula pasir untuk adonan adalah 4 : 3. Jika seorang pembuat kue menggunakan 12 cangkir tepung terigu, berapa cangkir gula pasir yang dibutuhkan?",
    options: ["6 cangkir", "8 cangkir", "9 cangkir", "12 cangkir"],
    correctAnswer: "9 cangkir",
    explanation: "Tepung terigu meningkat dari 4 menjadi 12 (dikalikan 3). Maka gula pasir juga harus dikalikan 3: 3 × 3 = 9 cangkir.",
  },
  {
    id: "lat-r5",
    category: "latihan",
    subBab: "B",
    question: "Manakah pasangan rasio di bawah ini yang TIDAK ekuivalen (tidak senilai)?",
    options: ["2 : 5 dan 6 : 15", "3 : 7 dan 9 : 21", "4 : 6 dan 10 : 15", "3 : 4 dan 6 : 7"],
    correctAnswer: "3 : 4 dan 6 : 7",
    explanation: "3 : 4 jika dikali 2 menjadi 6 : 8, bukan 6 : 7. Pasangan 3:4 dan 6:7 tidak memiliki faktor pengali yang sama.",
  },
  {
    id: "lat-r6",
    category: "latihan",
    subBab: "B",
    question: "Di peternakan, rasio ayam jantan terhadap ayam betina adalah 2 : 5. Jika total ayam di peternakan ada 35 ekor, berapakah banyak ayam betina?",
    options: ["10 ekor", "15 ekor", "20 ekor", "25 ekor"],
    correctAnswer: "25 ekor",
    explanation: "Jumlah bagian rasio = 2 + 5 = 7 bagian. Nilai 1 bagian = 35 ÷ 7 = 5 ekor. Ayam betina = 5 bagian × 5 = 25 ekor.",
  },
  {
    id: "lat-r7",
    category: "latihan",
    subBab: "B",
    question: "Bentuk paling sederhana dari rasio 24 : 36 adalah...",
    options: ["4 : 6", "2 : 3", "3 : 4", "1 : 2"],
    correctAnswer: "2 : 3",
    explanation: "FPB dari 24 dan 36 adalah 12. Bagilah kedua suku: 24 ÷ 12 = 2 dan 36 ÷ 12 = 3. Bentuk paling sederhananya adalah 2 : 3.",
  },
  {
    id: "lat-r8",
    category: "latihan",
    subBab: "C",
    question: "Sebuah mobil menempuh jarak 150 km dalam waktu 3 jam dengan kecepatan konstan. Berapakah rasio satuan (kecepatan) mobil tersebut per jam?",
    options: ["40 km/jam", "45 km/jam", "50 km/jam", "60 km/jam"],
    correctAnswer: "50 km/jam",
    explanation: "Rasio satuan jarak per waktu = 150 km ÷ 3 jam = 50 km per 1 jam (50 km/jam).",
  },
  {
    id: "lat-r9",
    category: "latihan",
    subBab: "C",
    question: "Toko A menjual 4 buku tulis seharga Rp16.000. Toko B menjual 6 buku tulis seharga Rp21.000. Manakah toko yang menjual buku tulis lebih murah per satuannya?",
    options: [
      "Toko A lebih murah (Rp4.000/buku)",
      "Toko B lebih murah (Rp3.500/buku)",
      "Kedua toko menjual dengan harga satuan sama",
      "Toko B lebih mahal (Rp4.500/buku)",
    ],
    correctAnswer: "Toko B lebih murah (Rp3.500/buku)",
    explanation: "Toko A = Rp16.000 ÷ 4 = Rp4.000/buku. Toko B = Rp21.000 ÷ 6 = Rp3.500/buku. Toko B lebih murah karena Rp3.500 < Rp4.000.",
  },
  {
    id: "lat-r10",
    category: "latihan",
    subBab: "C",
    question: "Sebuah mesin pencetak dapat mencetak 180 lembar kertas dalam waktu 2 menit. Berapa lembar kertas yang dapat dicetak mesin tersebut dalam waktu 5 menit?",
    options: ["360 lembar", "450 lembar", "500 lembar", "540 lembar"],
    correctAnswer: "450 lembar",
    explanation: "Rasio satuan kecepatan = 180 lembar ÷ 2 menit = 90 lembar/menit. Dalam 5 menit: 90 × 5 = 450 lembar.",
  },
];

// Generator Soal Dinamis Anti-Contek (Client-Side Math 100%)
function generateDynamicQuestionsRasio(seed: number): QuestionItemRasio[] {
  const rand = (min: number, max: number, idx: number) => {
    const val = Math.sin(seed * 777 + idx * 43) * 10000;
    const frac = val - Math.floor(val);
    return Math.floor(frac * (max - min + 1)) + min;
  };

  // Soal 1: Penyederhanaan Rasio
  const multiplier1 = rand(2, 5, 1);
  const baseA = rand(2, 4, 2);
  const baseB = rand(5, 7, 3);
  const valA = baseA * multiplier1;
  const valB = baseB * multiplier1;

  // Soal 2: Ekuivalen Resep
  const rTepung = rand(2, 3, 4);
  const rGula = rand(4, 5, 5);
  const resepMultiplier = rand(3, 6, 6);
  const givenTepung = rTepung * resepMultiplier;
  const ansGula = rGula * resepMultiplier;

  // Soal 3: Jumlah Bagian Total
  const partX = rand(2, 3, 7);
  const partY = rand(3, 4, 8);
  const onePartVal = rand(4, 8, 9);
  const totalItems = (partX + partY) * onePartVal;
  const targetY = partY * onePartVal;

  // Soal 4: Unit Rate Belanja
  const itemWeightA = 3;
  const itemPriceA = rand(36, 48, 10) * 1000;
  const unitRateA = itemPriceA / itemWeightA;

  // Soal 5: Efisiensi Jarak Kendaraan
  const literBensin = rand(4, 6, 11);
  const kmPerLiter = rand(12, 16, 12);
  const totalJarak = literBensin * kmPerLiter;

  return [
    {
      id: `dyn-r1-${seed}`,
      category: "evaluasi",
      subBab: "A",
      question: `Di sebuah taman pembibitan, terdapat ${valA} pohon pucuk merah dan ${valB} pohon cemara udang. Berapakah bentuk rasio paling sederhana dari pohon pucuk merah terhadap pohon cemara udang?`,
      options: [
        `${baseA} : ${baseB}`,
        `${baseB} : ${baseA}`,
        `${valA} : ${valB}`,
        `${baseA} : ${baseB + 1}`,
      ].sort(),
      correctAnswer: `${baseA} : ${baseB}`,
      explanation: `Rasio awal ${valA} : ${valB}. Keduanya dibagi dengan FPB (${multiplier1}), menghasilkan rasio paling sederhana ${baseA} : ${baseB}.`,
    },
    {
      id: `dyn-r2-${seed}`,
      category: "evaluasi",
      subBab: "B",
      question: `Perbandingan takaran terigu dan mentega pada resep roti adalah ${rTepung} : ${rGula}. Jika seorang juru masak menggunakan ${givenTepung} cangkir terigu, berapa cangkir mentega yang harus ia tambahkan agar adonan seimbang?`,
      options: [
        `${ansGula} cangkir`,
        `${ansGula + 2} cangkir`,
        `${ansGula - 2} cangkir`,
        `${givenTepung + rGula} cangkir`,
      ].sort(),
      correctAnswer: `${ansGula} cangkir`,
      explanation: `Faktor pengali rasio = ${givenTepung} ÷ ${rTepung} = ${resepMultiplier}. Maka mentega = ${rGula} × ${resepMultiplier} = ${ansGula} cangkir.`,
    },
    {
      id: `dyn-r3-${seed}`,
      category: "evaluasi",
      subBab: "B",
      question: `Rasio bibit cabai merah dan cabai rawit di kebun adalah ${partX} : ${partY}. Jika total seluruh bibit cabai berjumlah ${totalItems} polybag, berapakah jumlah bibit cabai rawit?`,
      options: [
        `${targetY} polybag`,
        `${targetY - onePartVal} polybag`,
        `${targetY + onePartVal} polybag`,
        `${totalItems / 2} polybag`,
      ].sort(),
      correctAnswer: `${targetY} polybag`,
      explanation: `Jumlah bagian rasio = ${partX} + ${partY} = ${partX + partY} bagian. Nilai 1 bagian = ${totalItems} ÷ ${partX + partY} = ${onePartVal}. Bibit cabai rawit = ${partY} × ${onePartVal} = ${targetY} polybag.`,
    },
    {
      id: `dyn-r4-${seed}`,
      category: "evaluasi",
      subBab: "C",
      question: `Ibu membeli satu kantong beras seberat ${itemWeightA} kg dengan harga total Rp${itemPriceA.toLocaleString("id-ID")}. Berapakah harga rasio satuan untuk 1 kg beras tersebut?`,
      options: [
        `Rp${unitRateA.toLocaleString("id-ID")}`,
        `Rp${(unitRateA + 1000).toLocaleString("id-ID")}`,
        `Rp${(unitRateA - 1000).toLocaleString("id-ID")}`,
        `Rp${(unitRateA + 2000).toLocaleString("id-ID")}`,
      ].sort(),
      correctAnswer: `Rp${unitRateA.toLocaleString("id-ID")}`,
      explanation: `Harga per 1 kg = Total Harga ÷ Berat = Rp${itemPriceA.toLocaleString("id-ID")} ÷ ${itemWeightA} kg = Rp${unitRateA.toLocaleString("id-ID")} per kg.`,
    },
    {
      id: `dyn-r5-${seed}`,
      category: "evaluasi",
      subBab: "C",
      question: `Sebuah sepeda motor menempuh perjalanan antarkota sejauh ${totalJarak} km dan menghabiskan ${literBensin} liter bensin. Berapa jarak yang ditempuh motor tersebut untuk setiap 1 liter bensinnya?`,
      options: [
        `${kmPerLiter} km/liter`,
        `${kmPerLiter + 2} km/liter`,
        `${kmPerLiter - 2} km/liter`,
        `${Math.round(totalJarak / (literBensin + 1))} km/liter`,
      ].sort(),
      correctAnswer: `${kmPerLiter} km/liter`,
      explanation: `Konsumsi bahan bakar = ${totalJarak} km ÷ ${literBensin} liter = ${kmPerLiter} km per 1 liter bensin.`,
    },
  ];
}

// ============================================================================
// 3. KOMPONEN ILUSTRASI DOODLE BERWARNA (100% SVG - ZERO API COST)
// ============================================================================

function VisualDoodleRasio({ type }: { type: VisualSlideRasio["visualType"] }) {
  if (type === "konsep_sirup") {
    return (
      <figure className="w-full space-y-3">
        <figcaption className="text-sm font-black uppercase tracking-wider text-amber-800">
          Sketsa: resep manis es sirup, rasio 2 : 5
        </figcaption>
        <div className="flex w-full flex-col items-center">
            <svg viewBox="0 0 220 110" className="h-auto w-full">
              {/* Wadah Sirup Merah (2 Cangkir) */}
              <g transform="translate(20, 20)">
                <rect x="0" y="20" width="35" height="45" rx="4" fill="#f43f5e" stroke="#9f1239" strokeWidth="2" />
                <rect x="42" y="20" width="35" height="45" rx="4" fill="#f43f5e" stroke="#9f1239" strokeWidth="2" />
                <text x="38" y="80" textAnchor="middle" fill="#be123c" fontSize="10" fontWeight="bold">2 Cangkir Sirup</text>
              </g>

              {/* Tanda Titik Dua Rasio ( : ) */}
              <text x="110" y="55" textAnchor="middle" fill="#64748b" fontSize="24" fontWeight="black">:</text>

              {/* Wadah Air Bening (5 Cangkir) */}
              <g transform="translate(130, 15)">
                <rect x="0" y="10" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="15" y="10" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="30" y="10" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="45" y="10" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="60" y="10" width="12" height="30" rx="2" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <text x="36" y="58" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">5 Cangkir Air</text>
              </g>
            </svg>
            <p className="mt-2 text-center text-base font-bold text-slate-700">
              Rasio sirup terhadap air = <span className="font-black text-rose-600">2 : 5</span>
            </p>
        </div>
      </figure>
    );
  }

  if (type === "tabel_ekuivalen") {
    return (
      <figure className="w-full space-y-3">
        <figcaption className="text-sm font-black uppercase tracking-wider text-indigo-900">
          Sketsa: melipatgandakan resep bolu
        </figcaption>
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center">
            <span className="text-sm font-extrabold uppercase text-slate-500">Resep dasar (1 loyang)</span>
            <div className="mt-1 text-3xl font-black text-indigo-700">2 : 3</div>
            <div className="text-base text-slate-600">2 terigu : 3 telur</div>
          </div>
          <div className="text-center text-base font-black text-amber-500">
            dikali 3
            <div className="text-sm font-semibold text-slate-500">faktor pengali sama</div>
          </div>
          <div className="text-center">
            <span className="text-sm font-extrabold uppercase text-indigo-700">Resep pesta (3 loyang)</span>
            <div className="mt-1 text-3xl font-black text-indigo-700">6 : 9</div>
            <div className="text-base text-slate-600">6 terigu : 9 telur</div>
          </div>
        </div>
      </figure>
    );
  }

  // Unit Rate Belanja
  return (
    <figure className="w-full space-y-3">
      <figcaption className="text-sm font-black uppercase tracking-wider text-emerald-900">
        Sketsa: membandingkan harga satuan
      </figcaption>
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center md:px-6">
          <div className="text-base font-extrabold text-slate-600">Paket Hemat (3 kg)</div>
          <div className="my-2 text-3xl font-black text-slate-800">Rp45.000</div>
          <div className="border-t border-slate-100 pt-2 text-base font-bold text-slate-600">
            Rp45.000 ÷ 3 = <span className="font-black text-rose-600">Rp15.000 / kg</span>
          </div>
        </div>
        <div className="w-full rounded-2xl border border-emerald-400 bg-white px-5 py-4 text-center md:px-6">
          <div className="text-base font-extrabold text-emerald-700">Paket Jumbo (5 kg) · paling hemat</div>
          <div className="my-2 text-3xl font-black text-slate-800">Rp70.000</div>
          <div className="border-t border-slate-100 pt-2 text-base font-bold text-slate-600">
            Rp70.000 ÷ 5 = <span className="font-black text-emerald-600">Rp14.000 / kg</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

// ============================================================================
// 4. KOMPONEN UTAMA MODUL BAB 2: RASIO
// ============================================================================

export default function Bab2RasioModule() {
  const [activeTab, setActiveTab] = useState<
    "pemanasan" | "materi" | "simulator" | "praktikum" | "latihan" | "evaluasi"
  >("pemanasan");
  const [selectedSubBab, setSelectedSubBab] = useState<number>(0);

  // State Pemanasan Otak (Brain Activation) - Metronom Ketukan Rasio 1 : 2
  const [rhythmClicks, setRhythmClicks] = useState<number>(0);
  const [brainReady, setBrainReady] = useState<boolean>(false);

  // State Simulator Interaktif Resep Rasio Ekuivalen
  const [baseSirup, setBaseSirup] = useState<number>(2);
  const [baseAir, setBaseAir] = useState<number>(5);
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  // State Kanvas Praktikum Lokal (Zero API Cost)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [canvasFeedback, setCanvasFeedback] = useState<string | null>(null);

  // State Latihan & Evaluasi Dinamis
  const [studentSeed, setStudentSeed] = useState<number>(202);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});
  const [earnedTokens, setEarnedTokens] = useState<number>(0);
  const [claimedQuestionIds, setClaimedQuestionIds] = useState<string[]>([]);

  const dynamicEvalQuestions = generateDynamicQuestionsRasio(studentSeed);

  // Handler Kanvas Praktikum
  useEffect(() => {
    if (activeTab === "praktikum" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#4f46e5";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
      }
    }
  }, [activeTab]);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
      setIsDrawing(true);
      setStrokeCount((prev) => prev + 1);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
    }
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setStrokeCount(0);
      setCanvasFeedback(null);
    }
  };

  const verifyCanvasLocal = () => {
    if (strokeCount < 3) {
      setCanvasFeedback("⚠️ Gambar atau tabel rasiomu belum lengkap! Ayo gambarkan takaran sirup dan air di kanvas berpetak.");
    } else {
      setCanvasFeedback("🌟 Hebat! Diagram proporsi rasiomu sudah terekam dengan rapi di sistem lokal (Zero-API Validated).");
    }
  };

  // Handler Jawab Soal & Token
  const handleAnswerSubmit = (q: QuestionItemRasio) => {
    const chosen = selectedAnswers[q.id];
    if (!chosen) return;
    setSubmittedQuiz((prev) => ({ ...prev, [q.id]: true }));

    if (chosen === q.correctAnswer && !claimedQuestionIds.includes(q.id)) {
      const reward = q.category === "evaluasi" ? 10 : 5;
      setEarnedTokens((prev) => prev + reward);
      setClaimedQuestionIds((prev) => [...prev, q.id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* HEADER UTAMA & STATUS TOKEN */}
      <header className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white shadow-lg sticky top-0 z-30">
        <div className="flex w-full flex-col gap-4 px-2 py-4 sm:px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-emerald-950/40 px-3 py-1 rounded-full w-fit mb-1">
              <span>Kurikulum Merdeka • Fase C</span>
              <span>•</span>
              <span>Kelas 6 SD</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Bab 2: Rasio dan Proporsi Sederhana
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-amber-400 text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-md">
              <span className="text-xl">⭐</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">
                  Dompet Belajar IGIL
                </div>
                <div className="text-base leading-none">{earnedTokens} Token</div>
              </div>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-300/40 text-emerald-100 px-3 py-2 rounded-xl text-xs font-semibold">
              ⚡ Mode Hemat API: Aktif (Rp 0)
            </div>
          </div>
        </div>

        {/* NAVIGASI TAB */}
        <div className="flex w-full gap-1 overflow-x-auto border-t border-emerald-500/30 px-2 pb-2 pt-2 sm:px-4">
          {[
            { id: "pemanasan", label: "🧠 1. Aktivasi Otak" },
            { id: "materi", label: "📖 2. Eksplorasi Materi" },
            { id: "simulator", label: "🧪 3. Lab Rasio Ekuivalen" },
            { id: "praktikum", label: "✏️ 4. Kanvas Praktikum" },
            { id: "latihan", label: "🎯 5. Latihan (10 Soal)" },
            { id: "evaluasi", label: "🏆 6. Evaluasi Anti-Contek" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-emerald-100 hover:bg-emerald-600/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mt-6 w-full px-2 sm:px-4">
        {/* ================================================================
            TAB 1: AKTIVASI OTAK (BRAIN ACTIVATION: IRAMA RASIO 1 : 2)
        ================================================================ */}
        {activeTab === "pemanasan" && (
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Brain Activation • Irama Bilateral
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-800">
                  Senam Irama Rasio: 1 Ketukan Kiri Berbanding 2 Ketukan Kanan!
                </h2>
                <p className="mt-1 text-base leading-relaxed text-slate-600">
                  Aktifkan koordinasi belahan otak kiri dan kananmu dengan menyamakan rasio ritme ketukan:{" "}
                  <strong>1 Ketukan Biru (Kiri) : 2 Ketukan Hijau (Kanan)</strong>.
                </p>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase text-emerald-700">Focus Meter</div>
                <div className="text-2xl font-black text-emerald-800">
                  {Math.min(100, Math.round((rhythmClicks / 6) * 100))}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-8">
              <div className="bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[260px] text-white">
                <div className="text-xs font-bold uppercase text-amber-400 mb-4">
                  Ketuk Tombol Bergantian Mengikuti Rasio 1 : 2
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setRhythmClicks((c) => {
                        const next = c + 1;
                        if (next >= 6) setBrainReady(true);
                        return next;
                      });
                    }}
                    className="w-24 h-24 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-lg active:scale-95 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-2xl">🔵</span>
                    <span>Kiri (1x)</span>
                  </button>
                  <button
                    onClick={() => {
                      setRhythmClicks((c) => {
                        const next = c + 1;
                        if (next >= 6) setBrainReady(true);
                        return next;
                      });
                    }}
                    className="w-24 h-24 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg active:scale-95 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-2xl">🟢</span>
                    <span>Kanan (2x)</span>
                  </button>
                </div>
                <div className="text-xs text-slate-300 mt-4">
                  Progres: {rhythmClicks} / 6 ketukan ritme selesai
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 md:px-6 md:py-5">
                  <h3 className="text-lg font-bold text-amber-900">
                    Mengapa Kita Memainkan Ritme Ini?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-amber-800">
                    Saat tangan kiri dan kanan bergerak dalam perbandingan proporsional (1 : 2), otak kecilmu menyinkronkan ritme motorik dengan pemahaman konsep perbandingan di dalam matematika.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setRhythmClicks(0);
                      setBrainReady(false);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                  >
                    🔄 Ulangi Ritme
                  </button>

                  <button
                    onClick={() => setActiveTab("materi")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition ${
                      brainReady
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white animate-bounce"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {brainReady ? "🚀 Otak Siap! Buka Materi Rasio" : "Lewati ke Materi →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 2: EKSPLORASI MATERI LENGKAP (SUB-BAB A, B, C)
        ================================================================ */}
        {activeTab === "materi" && (
          <div className="space-y-6">
            <div className="grid w-full grid-cols-1 gap-3">
              {BAB2_MATERIALS.map((sub, idx) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubBab(idx)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition md:px-6 ${
                    selectedSubBab === idx
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="text-sm font-extrabold uppercase tracking-wider opacity-80">{sub.code}</div>
                  <div className="mt-0.5 text-lg font-extrabold">{sub.title}</div>
                  <div className="mt-1 text-base leading-relaxed opacity-85">{sub.subtitle}</div>
                </button>
              ))}
            </div>

            {(() => {
              const current = BAB2_MATERIALS[selectedSubBab];
              return (
                <div className="space-y-6">
                  {/* Kisah Pemantik Kurikulum Merdeka */}
                  <div className="space-y-4">
                    <div className="w-full">
                      <div className="text-base font-extrabold uppercase tracking-wider text-amber-800">
                        {current.storyHook.avatar} Kisah Pemantik • {current.storyHook.character}
                      </div>
                      <p className="mt-2 w-full text-base leading-relaxed text-slate-700">{current.storyHook.dialogue}</p>
                    </div>
                    <div className="w-full rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-base font-bold leading-relaxed text-amber-900 md:px-6 md:py-5">
                      Pertanyaan pemantik: {current.storyHook.question}
                    </div>
                  </div>

                  {/* Slide-Slide Visual Bertahap */}
                  <div className="grid grid-cols-1 gap-6">
                    {current.slides.map((slide, sIdx) => (
                      <section key={sIdx} className="space-y-4 border-t border-slate-200 pt-6">
                        <div>
                          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-black uppercase text-emerald-700">
                            {slide.badge}
                          </span>
                          <h3 className="mt-1.5 text-xl font-extrabold text-slate-800">{slide.title}</h3>
                        </div>

                        <p className="text-base leading-relaxed text-slate-700">{slide.explanation}</p>

                        <VisualDoodleRasio type={slide.visualType} />

                        <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 md:px-6 md:py-5">
                          <div className="mb-3 text-base font-extrabold uppercase tracking-wider text-slate-700">
                            Rangkuman konsep penting
                          </div>
                          <ul className="space-y-3">
                            {slide.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-base leading-relaxed text-slate-700">
                                <span className="font-bold text-emerald-600">✔</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="w-full rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-base font-bold leading-relaxed text-rose-900 md:px-6 md:py-5">
                          {slide.commonTrap}
                        </div>
                      </section>
                    ))}
                  </div>

                  {/* Kamus Cilik & Panduan Luring */}
                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <h4 className="text-lg font-extrabold text-slate-800">Kamus Cilik Rasio</h4>
                    <div className="space-y-3">
                      {current.kamusCilik.map((k, kIdx) => (
                        <div key={kIdx} className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 md:px-6 md:py-5">
                          <span className="text-2xl">{k.ikon}</span>
                          <p className="text-base leading-relaxed text-slate-700">
                            <span className="font-bold text-emerald-800">{k.kata}: </span>
                            {k.arti}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 text-base leading-relaxed text-slate-700">
                      <h4 className="text-lg font-extrabold text-slate-800">Aktivitas luring guru dan orang tua</h4>
                      <p className="font-bold text-emerald-800">Panduan guru di kelas</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {current.offlineActivities.teacherGuide.map((tg, i) => (
                          <li key={i}>{tg}</li>
                        ))}
                      </ul>
                      <p className="font-bold text-amber-800">Praktik orang tua di rumah</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {current.offlineActivities.parentGuide.map((pg, i) => (
                          <li key={i}>{pg}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================================================================
            TAB 3: SIMULATOR INTERAKTIF RASIO RESEP EKUIVALEN
        ================================================================ */}
        {activeTab === "simulator" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
                  Laboratorium Proporsi (Eksplorasi 2.3 & 2.4)
                </span>
                <h2 className="mt-1 text-xl font-extrabold text-slate-800">
                  Simulator Takaran Sirup: Membuktikan Rasio Ekuivalen
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  Ubah faktor pengali resep untuk melihat bagaimana takaran sirup dan air membesar bersama tanpa mengubah rasa manisnya!
                </p>
              </div>
              <div className="w-full rounded-2xl border border-emerald-700 bg-emerald-700 px-5 py-4 text-center text-white md:px-6">
                <div className="text-sm font-bold uppercase">Rasio terbuka</div>
                <div className="text-4xl font-black">{baseSirup * scaleFactor} : {baseAir * scaleFactor}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-8">
              <div className="w-full space-y-5">
                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-600">
                    Pilih Faktor Pengali Resep ({scaleFactor}x Lipat):
                  </label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((factor) => (
                      <button
                        key={factor}
                        onClick={() => setScaleFactor(factor)}
                        className={`flex-1 py-2.5 rounded-xl font-black text-sm transition ${
                          scaleFactor === factor
                            ? "bg-emerald-600 text-white shadow-md"
                            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {factor}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid w-full grid-cols-1 gap-3 text-center">
                  <div className="w-full rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 md:px-6">
                    <div className="text-base font-bold text-rose-800">Sirup diperlukan</div>
                    <div className="mt-1 text-3xl font-black text-rose-600">
                      {baseSirup * scaleFactor} Cangkir
                    </div>
                    <div className="text-sm text-slate-500">({baseSirup} × {scaleFactor})</div>
                  </div>
                  <div className="w-full rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 md:px-6">
                    <div className="text-base font-bold text-sky-800">Air diperlukan</div>
                    <div className="mt-1 text-3xl font-black text-sky-600">
                      {baseAir * scaleFactor} Cangkir
                    </div>
                    <div className="text-sm text-slate-500">({baseAir} × {scaleFactor})</div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="mb-2 text-base font-extrabold uppercase text-slate-600">
                  Tabel rasio ekuivalen
                </div>
                <table className="w-full border-collapse text-center text-base">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="p-2 border border-slate-200">Porsi</th>
                      <th className="p-2 border border-slate-200 text-rose-700 font-extrabold">Sirup</th>
                      <th className="p-2 border border-slate-200 text-sky-700 font-extrabold">Air</th>
                      <th className="p-2 border border-slate-200">Rasio Bentuk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <tr
                        key={s}
                        className={s === scaleFactor ? "bg-amber-100 font-bold" : "hover:bg-slate-50"}
                      >
                        <td className="p-2 border border-slate-200">{s} Loyang</td>
                        <td className="p-2 border border-slate-200">{baseSirup * s} Cangkir</td>
                        <td className="p-2 border border-slate-200">{baseAir * s} Cangkir</td>
                        <td className="p-2 border border-slate-200 font-mono">{baseSirup * s} : {baseAir * s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 4: KANVAS PRAKTIKUM (ZERO-COST CLIENT-SIDE)
        ================================================================ */}
        {activeTab === "praktikum" && (
          <div className="space-y-4">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
              Praktikum Visualisasi Rasio (Biaya API Rp 0)
            </span>
            <h2 className="text-xl font-extrabold text-slate-800">
              Tantangan Kanvas: Menggambar Diagram Kotak Rasio (Tape Diagram)
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              Rasio buah apel terhadap buah jeruk adalah <strong>2 : 3</strong>. Gambarkan diagram batang kotak (tape diagram) untuk mewakili 2 kotak apel dan 3 kotak jeruk di kanvas berpetak bawah ini!
            </p>

            <div className="mt-5 flex w-full flex-col">
              <canvas
                ref={canvasRef}
                width={560}
                height={280}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                className="h-[280px] w-full cursor-crosshair touch-none border-2 border-dashed border-emerald-300 bg-slate-50"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
                  backgroundSize: "35px 35px",
                }}
              />

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={clearCanvas}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                >
                  🗑️ Bersihkan Kanvas
                </button>
                <button
                  onClick={verifyCanvasLocal}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  ✅ Periksa Gambarku (Lokal)
                </button>
              </div>

              {canvasFeedback && (
                <div className="mt-4 w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-base font-bold leading-relaxed text-emerald-900 md:px-6">
                  {canvasFeedback}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 5: LATIHAN MANDIRI RESMI (10 SOAL)
        ================================================================ */}
        {activeTab === "latihan" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Latihan Pemahaman Bab 2 (10 Soal Kurikulum Merdeka)
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Uji pemahamanmu secara mandiri. Jawaban benar pada percobaan pertama memberikan <strong>+5 Token IGIL</strong>!
              </p>
            </div>

            {STATIC_QUESTIONS_RASIO.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div key={q.id} className="space-y-3 border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">
                      Soal {idx + 1} • Sub-Bab {q.subBab}
                    </span>
                    {claimedQuestionIds.includes(q.id) && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        ✓ +5 Token Diklaim
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-slate-800 text-base mt-2">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          if (!isSubmitted) {
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt }));
                          }
                        }}
                        className={`p-3 rounded-xl border text-left text-sm font-semibold transition ${
                          userChoice === opt
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleAnswerSubmit(q)}
                        disabled={!userChoice}
                        className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-sm"
                      >
                        Kunci Jawaban
                      </button>
                    ) : (
                      <div
                        className={`w-full rounded-2xl border px-5 py-4 text-base leading-relaxed md:px-6 md:py-5 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-rose-50 border-rose-200 text-rose-900"
                        }`}
                      >
                        <div className="font-extrabold">
                          {isCorrect ? "Jawabanmu benar!" : `Kurang tepat. Jawaban yang benar: ${q.correctAnswer}`}
                        </div>
                        <p className="mt-2 leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================================================================
            TAB 6: EVALUASI RESMI ANTI-CONTEK (DYNAMIC PARAMETERIZATION)
        ================================================================ */}
        {activeTab === "evaluasi" && (
          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase text-slate-900">
                  Anti-Cheating Dynamic Engine
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-slate-800">
                  Lembar Evaluasi Bab 2 (Angka Unik Per Siswa)
                </h2>
                <p className="mt-1 text-base leading-relaxed text-slate-600">
                  Setiap siswa mendapatkan angka takaran resep, jumlah bibit pohon, dan harga belanja yang berbeda. Nilai per soal bernilai <strong>+10 Token IGIL</strong>!
                </p>
              </div>
              <button
                onClick={() => {
                  setStudentSeed(Math.floor(Math.random() * 9000) + 100);
                }}
                className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-800"
              >
                Simulasikan Siswa Lain (Acak Angka Baru)
              </button>
            </div>

            {dynamicEvalQuestions.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div key={q.id} className="space-y-3 border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                      Evaluasi #{idx + 1} • Paket Unik Siswa #{studentSeed}
                    </span>
                    {claimedQuestionIds.includes(q.id) && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        ⭐ +10 Token Ditambang
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-slate-800 text-base mt-2">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          if (!isSubmitted) {
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt }));
                          }
                        }}
                        className={`p-3 rounded-xl border text-left text-sm font-semibold transition ${
                          userChoice === opt
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleAnswerSubmit(q)}
                        disabled={!userChoice}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-slate-950 font-extrabold text-sm"
                      >
                        Kirim & Tambang Token
                      </button>
                    ) : (
                      <div
                        className={`w-full rounded-2xl border px-5 py-4 text-base leading-relaxed md:px-6 md:py-5 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-rose-50 border-rose-200 text-rose-900"
                        }`}
                      >
                        <div className="font-extrabold">
                          {isCorrect ? "Tepat sekali! +10 Token IGIL" : `Belum tepat. Kunci jawaban: ${q.correctAnswer}`}
                        </div>
                        <p className="mt-2 leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
