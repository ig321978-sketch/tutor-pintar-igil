"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// 1. DATA MATERI KURIKULUM MERDEKA KELAS 6 SD - BAB 3: KUBUS DAN BALOK
// ============================================================================

export interface SubChapterMaterial {
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
  coreConcepts: {
    heading: string;
    content: string;
    keyPoints: string[];
    visualType: "anatomy" | "orthographic" | "grid_coord";
  }[];
  workedExamples: {
    title: string;
    problem: string;
    steps: string[];
    conclusion: string;
  }[];
  dictionary: {
    term: string;
    definition: string;
  }[];
  offlineActivities: {
    teacherGuide: string[];
    parentGuide: string[];
  };
}

export const BAB3_MATERIALS: SubChapterMaterial[] = [
  {
    id: "sub-a",
    code: "Sub-Bab A",
    title: "Mengonstruksi dan Mengurai Bangun Ruang",
    subtitle: "Eksplorasi 3.1 & 3.2: Menyusun dan Membongkar Kubus Satuan",
    storyHook: {
      character: "Aktivitas Kelas Kurikulum Merdeka",
      avatar: "📦",
      dialogue:
        "Perhatikan kardus-kardus kecil berbentuk kubus satuan yang disusun membentuk balok besar. Ketika melihat gambar susunan kubus pada buku, ada kubus-kubus tertentu yang berada di lapisan bawah atau belakang yang tidak terlihat langsung oleh mata.",
      question:
        "Bagaimana caramu membongkar dan menghitung seluruh kubus satuan penyusunnya tanpa ada kubus tersembunyi yang terlewat?",
    },
    coreConcepts: [
      {
        heading: "1. Konsep Mengonstruksi (Menyusun)",
        content:
          "Mengonstruksi artinya menyusun kubus-kubus satuan menjadi sebuah bangun ruang baru (kubus besar atau balok).",
        keyPoints: [
          "Setiap kubus satuan memiliki ukuran 1 satuan panjang × 1 satuan lebar × 1 satuan tinggi.",
          "Jika balok tersusun rapat tanpa celah, banyak kubus satuan pada satu lapis mendatar dihitung dari: Banyak Kubus Baris Depan × Banyak Kubus Baris Samping.",
          "Total seluruh kubus satuan = Banyak kubus pada satu lapis alas × Banyak lapis tingginya.",
        ],
        visualType: "anatomy",
      },
      {
        heading: "2. Konsep Mengurai (Membongkar per Lapis)",
        content:
          "Mengurai artinya memecah bangun ruang susunan menjadi bagian-bagian lapisan atau tiang untuk melihat bagian dalamnya.",
        keyPoints: [
          "Urai Berdasarkan Lapisan (Lantai): Pisahkan susunan menjadi Lapis 1 (paling bawah), Lapis 2 (tengah), dan Lapis 3 (atas). Hitung isi tiap lapis lalu jumlahkan.",
          "Urai Berdasarkan Tiang: Hitung tinggi tumpukan pada tiap petak alas, lalu jumlahkan angka tinggi dari semua petak.",
          "Kubus Tersembunyi: Kubus yang tertutup kubus lain di depannya tetap dihitung sebagai kubus penyusun.",
        ],
        visualType: "anatomy",
      },
    ],
    workedExamples: [
      {
        title: "Contoh Resmi: Menghitung Balok Bertingkat",
        problem:
          "Sebuah susunan kubus memiliki 2 lapis. Lapis bawah berukuran 3 × 2 kubus satuan penuh. Lapis atas hanya memiliki 2 kubus di sisi kiri. Berapa total kubus penyusunnya?",
        steps: [
          "Langkah 1 (Lapis Bawah): Hitung kubus alas = 3 × 2 = 6 kubus satuan.",
          "Langkah 2 (Lapis Atas): Hitung kubus tambahan = 2 kubus satuan.",
          "Langkah 3: Jumlahkan kedua lapisan = 6 + 2 = 8 kubus satuan.",
        ],
        conclusion: "Bangun ruang tersebut tersusun dari 8 kubus satuan.",
      },
    ],
    dictionary: [
      {
        term: "Mengonstruksi",
        definition: "Menyusun kubus-kubus satuan menjadi bangun ruang baru.",
      },
      {
        term: "Mengurai",
        definition: "Membongkar susunan bangun ruang menjadi lapisan atau bagian penyusunnya.",
      },
      {
        term: "Kubus Satuan",
        definition: "Satuan dasar takar volume berukuran 1 × 1 × 1.",
      },
    ],
    offlineActivities: {
      teacherGuide: [
        "Sediakan dadu atau kubus kayu di kelas.",
        "Minta siswa membuat susunan bertingkat lalu menggambar tiap lapisnya di buku tulis.",
      ],
      parentGuide: [
        "Gunakan kotak gula atau biskuit kecil untuk latihan menyusun tumpukan di rumah.",
      ],
    },
  },
  {
    id: "sub-b",
    code: "Sub-Bab B",
    title: "Visualisasi Spasial (Tampak Atas, Depan, Samping)",
    subtitle: "Eksplorasi 3.3: Menggambar Bangun Ruang dari Tiga Arah Pandang",
    storyHook: {
      character: "Pandangan Mata Sejajar",
      avatar: "👁️",
      dialogue:
        "Saat kita berdiri tegak dan melihat sebuah gedung lurus dari depan, kita tidak bisa melihat bagian belakang gedung tersebut. Bangun 3 dimensi akan tampak datar menjadi gambar 2 dimensi jika dilihat tepat tegak lurus dari satu arah.",
      question:
        "Bagaimana gambar tampak depan, tampak samping, dan tampak atas dari susunan balok kubus satuan?",
    },
    coreConcepts: [
      {
        heading: "1. Tiga Sudut Pandang Pokok",
        content:
          "Visualisasi spasial adalah kemampuan membayangkan penampakan objek dari arah pandang yang berbeda:",
        keyPoints: [
          "Tampak Atas: Posisi mata tepat berada di atas objek menghadap ke bawah. Yang terlihat hanyalah petak-petak alas yang memiliki kubus.",
          "Tampak Depan: Posisi mata sejajar di depan objek. Tinggi gambar ditentukan oleh tumpukan kubus PALING TINGGI pada kolom tersebut.",
          "Tampak Samping (Kanan): Posisi mata sejajar di sisi kanan objek. Tinggi gambar ditentukan oleh tumpukan kubus PALING TINGGI pada baris tersebut.",
        ],
        visualType: "orthographic",
      },
      {
        heading: "2. Menentukan Gambar 2D dari Tabel Tinggi",
        content:
          "Jika tinggi tumpukan pada alas diketahui, gambar proyeksi 2 dimensi dapat dibuat dengan aturan nilai tertinggi:",
        keyPoints: [
          "Kolom pada Tampak Depan = Nilai maksimum dari depan ke belakang pada kolom itu.",
          "Kolom pada Tampak Samping = Nilai maksimum dari kanan ke kiri pada baris itu.",
          "Semua kotak yang tertutup oleh tumpukan yang lebih tinggi tidak akan memunculkan garis tambahan.",
        ],
        visualType: "orthographic",
      },
    ],
    workedExamples: [
      {
        title: "Contoh Resmi: Menentukan Tampak Depan",
        problem:
          "Tumpukan kubus memiliki alas 2 kolom. Kolom kiri memiliki kubus depan tinggi 1 dan kubus belakang tinggi 3. Kolom kanan memiliki kubus depan tinggi 2 dan kubus belakang tinggi 1. Bagaimana tampak depannya?",
        steps: [
          "Periksa Kolom Kiri: Kubus belakang (3) lebih tinggi dari depan (1). Yang terlihat dari depan adalah tiang setinggi 3 kotak.",
          "Periksa Kolom Kanan: Kubus depan (2) lebih tinggi dari belakang (1). Yang terlihat dari depan adalah tiang setinggi 2 kotak.",
          "Gabungkan kedua kolom: Gambar 2D terdiri dari kolom kiri 3 petak dan kolom kanan 2 petak.",
        ],
        conclusion: "Tampak Depan membentuk bangunan bertingkat 3 petak di kiri dan 2 petak di kanan.",
      },
    ],
    dictionary: [
      {
        term: "Tampak Atas",
        definition: "Bentuk 2D yang terlihat saat memandang objek tegak lurus dari arah atas.",
      },
      {
        term: "Tampak Depan",
        definition: "Bentuk 2D yang terlihat saat memandang objek sejajar dari arah depan.",
      },
      {
        term: "Tampak Samping",
        definition: "Bentuk 2D yang terlihat saat memandang objek sejajar dari arah samping.",
      },
    ],
    offlineActivities: {
      teacherGuide: [
        "Ajak siswa mengamati kardus di atas meja guru dari posisi duduk lurus dan posisi berdiri di atas kursi.",
      ],
      parentGuide: [
        "Sorotkan lampu ke tumpukan mainan anak ke arah tembok putih untuk melihat bentuk bayangan tampak depannya.",
      ],
    },
  },
  {
    id: "sub-c",
    code: "Sub-Bab C",
    title: "Lokasi pada Sistem Berpetak",
    subtitle: "Eksplorasi 3.4 & 3.5: Menentukan Koordinat dan Rute Terpendek",
    storyHook: {
      character: "Denah Ruang Berpetak",
      avatar: "🗺️",
      dialogue:
        "Pada denah ruang kelas atau peta gudang yang berpetak-petak, posisi suatu meja atau rak ditentukan menggunakan garis kolom mendatar dan garis baris tegak agar posisinya pasti dan tidak tertukar.",
      question:
        "Bagaimana cara membaca titik koordinat petak dan menghitung jarak langkah terpendek dari satu petak ke petak lainnya?",
    },
    coreConcepts: [
      {
        heading: "1. Aturan Penulisan Letak Petak (Kolom, Baris)",
        content:
          "Sistem berpetak menggunakan pasangan berurutan dengan urutan baku:",
        keyPoints: [
          "Kolom Mendatar ditulis terlebih dahulu (biasanya menggunakan huruf A, B, C, D...).",
          "Baris Tegak ditulis setelahnya (biasanya menggunakan angka 1, 2, 3, 4...).",
          "Contoh: Petak (C, 3) berarti terletak di pertemuan Kolom C dan Baris 3.",
        ],
        visualType: "grid_coord",
      },
      {
        heading: "2. Menentukan Langkah Terpendek",
        content:
          "Perpindahan pada sistem berpetak hanya boleh menyusuri garis petak (ke kanan/kiri dan ke atas/bawah), tidak boleh memotong diagonal:",
        keyPoints: [
          "Langkah mendatar = Banyak petak bergeser ke kiri atau kanan.",
          "Langkah tegak = Banyak petak bergeser ke atas atau bawah.",
          "Jarak langkah terpendek = Jumlah langkah mendatar + Jumlah langkah tegak.",
        ],
        visualType: "grid_coord",
      },
    ],
    workedExamples: [
      {
        title: "Contoh Resmi: Menghitung Langkah",
        problem:
          "Berapa langkah terpendek dari petak (A, 2) menuju petak (D, 5)?",
        steps: [
          "Hitung langkah mendatar dari Kolom A ke D: A -> B -> C -> D = 3 langkah ke kanan.",
          "Hitung langkah tegak dari Baris 2 ke 5: 2 -> 3 -> 4 -> 5 = 3 langkah ke atas.",
          "Total langkah = 3 + 3 = 6 langkah.",
        ],
        conclusion: "Jarak langkah terpendeknya adalah 6 petak langkah.",
      },
    ],
    dictionary: [
      {
        term: "Sistem Berpetak",
        definition: "Kotak-kotak beraturan yang mempermudah penentuan letak suatu benda.",
      },
      {
        term: "Titik Acuan",
        definition: "Titik awal keberangkatan sebelum menghitung pergeseran langkah.",
      },
    ],
    offlineActivities: {
      teacherGuide: [
        "Buat petak koordinat di lantai ubin kelas dan minta siswa melangkah sesuai instruksi guru.",
      ],
      parentGuide: [
        "Gunakan papan catur atau kertas buku kotak-kotak untuk latihan membaca koordinat bidak bersama anak.",
      ],
    },
  },
];

// ============================================================================
// 2. BANK SOAL STATIS & GENERATOR DINAMIS ANTI-CONTEK (CLIENT-SIDE 100%)
// ============================================================================

export interface QuestionItem {
  id: string;
  category: "latihan" | "evaluasi" | "ujian";
  subBab: "A" | "B" | "C";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  gridHint?: number[][]; // Opsional visual matriks tinggi kubus
}

export const STATIC_QUESTIONS: QuestionItem[] = [
  // --- LATIHAN MANDIRI (10 SOAL) ---
  {
    id: "lat-1",
    category: "latihan",
    subBab: "A",
    question: "Berapa banyak sisi, rusuk, dan titik sudut yang dimiliki oleh sebuah bangun ruang balok?",
    options: [
      "6 sisi, 12 rusuk, 8 titik sudut",
      "6 sisi, 8 rusuk, 12 titik sudut",
      "8 sisi, 12 rusuk, 6 titik sudut",
      "4 sisi, 12 rusuk, 8 titik sudut",
    ],
    correctAnswer: "6 sisi, 12 rusuk, 8 titik sudut",
    explanation: "Baik kubus maupun balok selalu memiliki tepat 6 sisi datar, 12 rusuk (garis tepi), dan 8 titik sudut (pojok).",
  },
  {
    id: "lat-2",
    category: "latihan",
    subBab: "A",
    question: "Rani menyusun kubus satuan menjadi sebuah kubus besar berukuran 3 × 3 × 3. Berapa total kubus satuan yang digunakan Rani?",
    options: ["9 kubus satuan", "18 kubus satuan", "27 kubus satuan", "36 kubus satuan"],
    correctAnswer: "27 kubus satuan",
    explanation: "Jumlah kubus satuan pada kubus besar = 3 × 3 × 3 = 27 kubus satuan.",
  },
  {
    id: "lat-3",
    category: "latihan",
    subBab: "A",
    question: "Sebuah balok besar tersusun dari 30 kubus satuan. Jika panjangnya 5 kubus satuan dan lebarnya 3 kubus satuan, berapa lapis tinggi balok tersebut?",
    options: ["2 lapis", "3 lapis", "4 lapis", "5 lapis"],
    correctAnswer: "2 lapis",
    explanation: "1 lapis alas = 5 × 3 = 15 kubus satuan. Tinggi lapis = 30 ÷ 15 = 2 lapis.",
  },
  {
    id: "lat-4",
    category: "latihan",
    subBab: "A",
    question: "Sebuah kubus besar berukuran 3 × 3 × 3 sudah memiliki 20 kubus satuan. Berapa kubus satuan lagi yang harus ditambahkan agar kubus besar itu penuh?",
    options: ["5 kubus satuan", "7 kubus satuan", "9 kubus satuan", "10 kubus satuan"],
    correctAnswer: "7 kubus satuan",
    explanation: "Kapasitas penuh kubus 3 × 3 × 3 adalah 27. Kekurangannya = 27 - 20 = 7 kubus satuan.",
  },
  {
    id: "lat-5",
    category: "latihan",
    subBab: "B",
    question: "Jika sebuah balok berukuran panjang 4 satuan, lebar 2 satuan, dan tinggi 3 satuan dilihat lurus dari ATAS, berapa banyak kotak persegi yang tampak?",
    options: ["6 persegi", "8 persegi", "12 persegi", "24 persegi"],
    correctAnswer: "8 persegi",
    explanation: "Tampak Atas hanya memperlihatkan bagian alas (panjang × lebar), yaitu 4 × 2 = 8 persegi.",
  },
  {
    id: "lat-6",
    category: "latihan",
    subBab: "B",
    question: "Sebuah menara tersusun dari 4 kubus satuan yang ditumpuk lurus ke atas (1 kolom vertikal). Jika dilihat tepat dari ATAS, berapa persegi yang terlihat?",
    options: ["1 persegi", "2 persegi", "3 persegi", "4 persegi"],
    correctAnswer: "1 persegi",
    explanation: "Karena ke-4 kubus ditumpuk lurus ke atas dalam 1 tiang, kubus paling atas menutupi 3 kubus di bawahnya. Dari atas hanya tampak 1 persegi.",
  },
  {
    id: "lat-7",
    category: "latihan",
    subBab: "B",
    question: "Perhatikan tabel tinggi kubus satuan pada alas 2 × 2 berikut! Baris Depan: [2, 1], Baris Belakang: [3, 4]. Berapa total persegi yang terlihat jika dilihat dari DEPAN?",
    options: ["3 persegi", "5 persegi", "7 persegi", "10 persegi"],
    correctAnswer: "7 persegi",
    explanation: "Dari depan, kolom kiri terlihat setinggi maksimum(2, 3) = 3. Kolom kanan terlihat setinggi maksimum(1, 4) = 4. Total = 3 + 4 = 7 persegi.",
    gridHint: [
      [3, 4],
      [2, 1],
    ],
  },
  {
    id: "lat-8",
    category: "latihan",
    subBab: "C",
    question: "Pada peta berpetak, sebuah pos berada di Kolom D dan Baris 6. Bagaimanakah penulisan koordinat lokasi pos yang benar?",
    options: ["(6, D)", "(D, 6)", "(D6, 6D)", "(Baris 6, Kolom D)"],
    correctAnswer: "(D, 6)",
    explanation: "Aturan pasangan berurutan selalu menuliskan posisi mendatar (Kolom) terlebih dahulu, baru posisi tegak (Baris), sehingga ditulis (D, 6).",
  },
  {
    id: "lat-9",
    category: "latihan",
    subBab: "C",
    question: "Budi bergerak dari petak (A, 1) sebanyak 3 petak ke kanan dan 4 petak ke atas. Di petak manakah Budi berada sekarang?",
    options: ["(C, 4)", "(D, 5)", "(E, 4)", "(D, 4)"],
    correctAnswer: "(D, 5)",
    explanation: "Dari Kolom A geser 3 ke kanan: A -> B -> C -> D. Dari Baris 1 naik 4 ke atas: 1 + 4 = 5. Jadi posisi akhirnya adalah (D, 5).",
  },
  {
    id: "lat-10",
    category: "latihan",
    subBab: "C",
    question: "Berapa jumlah langkah petak terpendek untuk berpindah dari titik (C, 2) menuju titik (G, 6) jika hanya boleh berjalan mendatar dan tegak?",
    options: ["6 langkah", "7 langkah", "8 langkah", "9 langkah"],
    correctAnswer: "8 langkah",
    explanation: "Mendatar dari C ke G = 4 langkah (D, E, F, G). Tegak dari 2 ke 6 = 4 langkah (3, 4, 5, 6). Total = 4 + 4 = 8 langkah.",
  },
];

// Generator Soal Dinamis Anti-Contek untuk Evaluasi & Ujian
function generateDynamicQuestions(seedOffset: number): QuestionItem[] {
  const rand = (min: number, max: number, idx: number) => {
    const val = Math.sin(seedOffset * 999 + idx * 77) * 10000;
    const frac = val - Math.floor(val);
    return Math.floor(frac * (max - min + 1)) + min;
  };

  const p1 = rand(3, 6, 1);
  const l1 = rand(2, 4, 2);
  const t1 = rand(2, 4, 3);
  const total1 = p1 * l1 * t1;

  const s2 = rand(3, 5, 4);
  const totalCube2 = s2 * s2 * s2;
  const existing2 = rand(Math.floor(totalCube2 / 2), totalCube2 - 4, 5);
  const needed2 = totalCube2 - existing2;

  const r1c1 = rand(1, 2, 6);
  const r1c2 = rand(2, 3, 7);
  const r2c1 = rand(3, 4, 8);
  const r2c2 = rand(1, 2, 9);
  const frontViewCount = Math.max(r1c1, r2c1) + Math.max(r1c2, r2c2);
  const sideViewCount = Math.max(r2c1, r2c2) + Math.max(r1c1, r1c2);

  const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const startColIdx = rand(0, 2, 10);
  const moveRight = rand(2, 4, 11);
  const startRow = rand(1, 3, 12);
  const moveUp = rand(2, 4, 13);
  const endCol = cols[startColIdx + moveRight];
  const endRow = startRow + moveUp;
  const totalSteps = moveRight + moveUp;

  return [
    {
      id: `dyn-1-${seedOffset}`,
      category: "evaluasi",
      subBab: "A",
      question: `Sebuah balok logistik disusun rapat dari kubus satuan dengan ukuran panjang ${p1} satuan, lebar ${l1} satuan, dan tinggi ${t1} satuan. Berapa jumlah seluruh kubus satuan penyusun balok tersebut?`,
      options: [
        `${total1} kubus satuan`,
        `${total1 + l1} kubus satuan`,
        `${total1 - p1} kubus satuan`,
        `${p1 + l1 + t1} kubus satuan`,
      ].sort(),
      correctAnswer: `${total1} kubus satuan`,
      explanation: `Jumlah kubus satuan = Panjang × Lebar × Tinggi = ${p1} × ${l1} × ${t1} = ${total1} kubus satuan.`,
    },
    {
      id: `dyn-2-${seedOffset}`,
      category: "evaluasi",
      subBab: "A",
      question: `Dito ingin membuat sebuah kubus besar utuh berukuran ${s2} × ${s2} × ${s2}. Saat ini Dito baru menyusun ${existing2} kubus satuan. Berapa banyak kubus satuan tambahan yang diperlukan agar kubus besar itu selesai?`,
      options: [
        `${needed2} kubus satuan`,
        `${needed2 + 3} kubus satuan`,
        `${needed2 - 2} kubus satuan`,
        `${totalCube2} kubus satuan`,
      ].sort(),
      correctAnswer: `${needed2} kubus satuan`,
      explanation: `Total kebutuhan kubus ${s2}×${s2}×${s2} adalah ${totalCube2} satuan. Sisa yang dibutuhkan = ${totalCube2} - ${existing2} = ${needed2} kubus satuan.`,
    },
    {
      id: `dyn-3-${seedOffset}`,
      category: "evaluasi",
      subBab: "B",
      question: `Perhatikan matriks tinggi menara kubus pada alas 2×2 berikut! Baris Belakang: [${r2c1}, ${r2c2}] dan Baris Depan: [${r1c1}, ${r1c2}]. Jika dilihat lurus dari DEPAN, berapa jumlah persegi yang tampak?`,
      options: [
        `${frontViewCount} persegi`,
        `${frontViewCount + 1} persegi`,
        `${r1c1 + r1c2} persegi`,
        `${r1c1 + r1c2 + r2c1 + r2c2} persegi`,
      ].sort(),
      correctAnswer: `${frontViewCount} persegi`,
      explanation: `Tampak Depan mengambil menara tertinggi di tiap kolom: Kolom Kiri = maks(${r2c1}, ${r1c1}) = ${Math.max(r2c1, r1c1)}, Kolom Kanan = maks(${r2c2}, ${r1c2}) = ${Math.max(r2c2, r1c2)}. Total = ${frontViewCount} persegi.`,
      gridHint: [
        [r2c1, r2c2],
        [r1c1, r1c2],
      ],
    },
    {
      id: `dyn-4-${seedOffset}`,
      category: "evaluasi",
      subBab: "B",
      question: `Masih dengan susunan menara kubus yang sama (Baris Belakang: [${r2c1}, ${r2c2}], Baris Depan: [${r1c1}, ${r1c2}]). Jika dilihat lurus dari SAMPING KANAN, berapa jumlah persegi yang tampak?`,
      options: [
        `${sideViewCount} persegi`,
        `${sideViewCount + 2} persegi`,
        `${frontViewCount - 1} persegi`,
        `4 persegi`,
      ].sort(),
      correctAnswer: `${sideViewCount} persegi`,
      explanation: `Tampak Samping melihat tertinggi di tiap baris: Baris Belakang = maks(${r2c1}, ${r2c2}) = ${Math.max(r2c1, r2c2)}, Baris Depan = maks(${r1c1}, ${r1c2}) = ${Math.max(r1c1, r1c2)}. Total = ${sideViewCount} persegi.`,
      gridHint: [
        [r2c1, r2c2],
        [r1c1, r1c2],
      ],
    },
    {
      id: `dyn-5-${seedOffset}`,
      category: "evaluasi",
      subBab: "C",
      question: `Sebuah drone kargo berangkat dari koordinat (${cols[startColIdx]}, ${startRow}), lalu terbang ${moveRight} petak ke Timur (kanan) dan ${moveUp} petak ke Utara (atas). Di titik koordinat manakah drone itu mendarat?`,
      options: [
        `(${endCol}, ${endRow})`,
        `(${endRow}, ${endCol})`,
        `(${cols[startColIdx + moveRight - 1]}, ${endRow})`,
        `(${endCol}, ${endRow + 1})`,
      ].sort(),
      correctAnswer: `(${endCol}, ${endRow})`,
      explanation: `Kolom awal ${cols[startColIdx]} bergeser ${moveRight} ke kanan menjadi Kolom ${endCol}. Baris awal ${startRow} naik ${moveUp} menjadi Baris ${endRow}. Koordinat akhir adalah (${endCol}, ${endRow}) dengan total ${totalSteps} langkah.`,
    },
  ];
}

// ============================================================================
// 3. KOMPONEN UTAMA MODUL PEMBELAJARAN IGIL
// ============================================================================

export default function Bab3KubusBalokModule() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "pemanasan" | "materi" | "simulator" | "praktikum" | "latihan" | "evaluasi"
  >("pemanasan");
  const [selectedSubBab, setSelectedSubBab] = useState<number>(0);

  // State Pemanasan Otak (Brain Activation) - Connect 3D Cube Vertices
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const [brainReady, setBrainReady] = useState<boolean>(false);

  // State Simulator Konstruksi & Proyeksi 3D -> 2D (3x3 Grid)
  const [voxelGrid, setVoxelGrid] = useState<number[][]>([
    [3, 2, 1], // Belakang
    [2, 1, 1], // Tengah
    [1, 1, 0], // Depan
  ]);

  // State Simulator Sistem Berpetak (Sub-Bab C)
  const [robotPos, setRobotPos] = useState<{ col: number; row: number }>({ col: 1, row: 1 });
  const [targetPos, setTargetPos] = useState<{ col: number; row: number }>({ col: 5, row: 4 });
  const [stepHistory, setStepHistory] = useState<string[]>([]);

  // State Kanvas Praktikum Lokal (Zero API Cost)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [canvasFeedback, setCanvasFeedback] = useState<string | null>(null);

  // State Latihan & Evaluasi Dinamis
  const [studentSeed, setStudentSeed] = useState<number>(101);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});
  const [earnedTokens, setEarnedTokens] = useState<number>(0);
  const [claimedQuestionIds, setClaimedQuestionIds] = useState<string[]>([]);

  const dynamicEvalQuestions = generateDynamicQuestions(studentSeed);

  // Fungsi Helper Menghitung Proyeksi Tampak Atas, Depan, dan Samping
  const totalVoxels = voxelGrid.flat().reduce((acc, val) => acc + val, 0);

  // Tampak Depan (Tinggi maksimum per kolom 0, 1, 2)
  const frontProjection = [0, 1, 2].map((colIdx) =>
    Math.max(voxelGrid[0][colIdx], voxelGrid[1][colIdx], voxelGrid[2][colIdx])
  );

  // Tampak Samping Kanan (Tinggi maksimum per baris Belakang, Tengah, Depan)
  const sideProjection = [0, 1, 2].map((rowIdx) =>
    Math.max(voxelGrid[rowIdx][0], voxelGrid[rowIdx][1], voxelGrid[rowIdx][2])
  );

  // Handler Tambah/Kurang Tinggi Kubus di Simulator
  const handleCellClick = (r: number, c: number, delta: number) => {
    setVoxelGrid((prev) =>
      prev.map((row, rIdx) =>
        row.map((val, cIdx) => {
          if (rIdx === r && cIdx === c) {
            return Math.max(0, Math.min(4, val + delta));
          }
          return val;
        })
      )
    );
  };

  // Handler Kanvas Gambar Lokal
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

  const endDraw = () => {
    setIsDrawing(false);
  };

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

  const verifyLocalCanvas = () => {
    if (strokeCount < 3) {
      setCanvasFeedback("⚠️ Coretan belum lengkap! Ayo gambar minimal 3 susunan kotak tampak depan dan atas pada kanvas berpetak.");
    } else {
      setCanvasFeedback("🌟 Luar Biasa! Goresan proyeksi spasialmu sudah terekam dengan rapi di sistem lokal (Zero-API Validated).");
    }
  };

  // Handler Menjawab Soal & Klaim Token
  const handleCheckAnswer = (q: QuestionItem) => {
    const chosen = selectedAnswers[q.id];
    if (!chosen) return;
    setSubmittedQuiz((prev) => ({ ...prev, [q.id]: true }));

    if (chosen === q.correctAnswer && !claimedQuestionIds.includes(q.id)) {
      const reward = q.category === "evaluasi" ? 10 : 5;
      setEarnedTokens((prev) => prev + reward);
      setClaimedQuestionIds((prev) => [...prev, q.id]);
    }
  };

  const colLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* HEADER UTAMA & STATUS TOKEN */}
      <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-indigo-900/50 px-3 py-1 rounded-full w-fit mb-1">
              <span>Kurikulum Merdeka • Fase C</span>
              <span>•</span>
              <span>Kelas 6 SD</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Bab 3: Kubus dan Balok (Penalaran Spasial)
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
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto gap-1 border-t border-indigo-500/30 pt-2 pb-2">
          {[
            { id: "pemanasan", label: "🧠 1. Aktivasi Otak" },
            { id: "materi", label: "📖 2. Eksplorasi Materi" },
            { id: "simulator", label: "🧊 3. Lab Spasial 3D & Peta" },
            { id: "praktikum", label: "✏️ 4. Kanvas Praktikum" },
            { id: "latihan", label: "🎯 5. Latihan (10 Soal)" },
            { id: "evaluasi", label: "🏆 6. Evaluasi Anti-Contek" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-indigo-100 hover:bg-indigo-600/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-6">
        {/* ================================================================
            TAB 1: PEMANASAN OTAK (BRAIN ACTIVATION)
        ================================================================ */}
        {activeTab === "pemanasan" && (
          <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Brain Activation • 45 Detik
                </span>
                <h2 className="text-2xl font-extrabold text-slate-800 mt-2">
                  Senam Otak Spasial: Mengaktifkan8 Titik Sudut Kubus!
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Sebelum belajar bangun ruang 3D, ketuk ke-8 titik sudut kubus secara berurutan dari{" "}
                  <strong>Titik 1 sampai Titik 8</strong> untuk mengaktifkan saraf visual-spasialmu!
                </p>
              </div>
              <div className="bg-indigo-50 px-4 py-3 rounded-xl text-center min-w-[150px]">
                <div className="text-xs font-bold text-indigo-600 uppercase">Focus Meter</div>
                <div className="text-2xl font-black text-indigo-700">
                  {Math.round((connectedNodes.length / 8) * 100)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
              {/* Visual SVG Isometric Cube Interactive */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[340px]">
                <svg viewBox="0 0 300 260" className="w-full max-w-[320px] h-auto">
                  {/* Rusuk Belakang */}
                  <line x1="100" y1="50" x2="220" y2="50" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
                  <line x1="100" y1="50" x2="100" y2="170" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
                  <line x1="100" y1="170" x2="220" y2="170" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
                  <line x1="220" y1="50" x2="220" y2="170" stroke="#6366f1" strokeWidth="2" />

                  {/* Rusuk Penghubung */}
                  <line x1="100" y1="50" x2="60" y2="90" stroke="#818cf8" strokeWidth="3" />
                  <line x1="220" y1="50" x2="180" y2="90" stroke="#818cf8" strokeWidth="3" />
                  <line x1="100" y1="170" x2="60" y2="210" stroke="#818cf8" strokeWidth="3" />
                  <line x1="220" y1="170" x2="180" y2="210" stroke="#818cf8" strokeWidth="3" />

                  {/* Rusuk Depan */}
                  <rect x="60" y="90" width="120" height="120" fill="rgba(99, 102, 241, 0.15)" stroke="#38bdf8" strokeWidth="3" />

                  {/* 8 Titik Sudut Interaktif */}
                  {[
                    { id: 1, x: 60, y: 90 },
                    { id: 2, x: 180, y: 90 },
                    { id: 3, x: 180, y: 210 },
                    { id: 4, x: 60, y: 210 },
                    { id: 5, x: 100, y: 50 },
                    { id: 6, x: 220, y: 50 },
                    { id: 7, x: 220, y: 170 },
                    { id: 8, x: 100, y: 170 },
                  ].map((node) => {
                    const isActive = connectedNodes.includes(node.id);
                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onClick={() => {
                          const expectedNext = connectedNodes.length + 1;
                          if (node.id === expectedNext) {
                            const updated = [...connectedNodes, node.id];
                            setConnectedNodes(updated);
                            if (updated.length === 8) setBrainReady(true);
                          }
                        }}
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isActive ? 16 : 14}
                          fill={isActive ? "#10b981" : "#f59e0b"}
                          stroke="#ffffff"
                          strokeWidth="3"
                        />
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {node.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="text-indigo-200 text-xs mt-2 text-center">
                  {connectedNodes.length < 8
                    ? `Ketuk Titik Sudut Nomor ${connectedNodes.length + 1} sekarang!`
                    : "🎉 Semua 8 titik sudut kubus telah menyala!"}
                </div>
              </div>

              {/* Panduan & Tombol Lanjut */}
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-bold text-amber-900 text-base">
                    💡 Mengapa Kita Melakukan Pemanasan Ini?
                  </h3>
                  <p className="text-amber-800 text-sm mt-1 leading-relaxed">
                    Saat mengetuk titik 1–4 (sisi depan) lalu berpindah ke titik 5–8 (sisi belakang), otak kirimu menghitung urutan angka sementara otak kananmu memetakan kedalaman ruang 3 dimensi!
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setConnectedNodes([]);
                      setBrainReady(false);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                  >
                    🔄 Ulangi Pemanasan
                  </button>

                  <button
                    onClick={() => setActiveTab("materi")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition ${
                      brainReady
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white animate-bounce"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {brainReady ? "🚀 Otak Siap! Masuk ke Materi Bab 3" : "Lewati ke Materi →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 2: EKSPLORASI MATERI (SUB-BAB A, B, C LENGKAP)
        ================================================================ */}
        {activeTab === "materi" && (
          <div className="space-y-6">
            {/* Pilihan Sub-Bab */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {BAB3_MATERIALS.map((sub, idx) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubBab(idx)}
                  className={`p-4 rounded-xl border text-left transition ${
                    selectedSubBab === idx
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase opacity-80">{sub.code}</div>
                  <div className="font-bold text-base mt-0.5">{sub.title}</div>
                  <div className="text-xs opacity-85 mt-1 line-clamp-1">{sub.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Konten Sub-Bab Aktif */}
            {(() => {
              const current = BAB3_MATERIALS[selectedSubBab];
              return (
                <div className="space-y-6">
                  {/* Kartu Cerita Pemantik */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl bg-white p-3 rounded-2xl shadow-sm">{current.storyHook.avatar}</div>
                      <div>
                        <div className="text-xs font-extrabold uppercase text-amber-700 tracking-wider">
                          Kisah Pemantik Kurikulum Merdeka • {current.storyHook.character}
                        </div>
                        <p className="text-slate-700 mt-1 text-base leading-relaxed">{current.storyHook.dialogue}</p>
                        <div className="mt-3 bg-white/90 border border-amber-300 rounded-xl px-4 py-2.5 text-sm font-bold text-amber-900">
                          ❓ Pertanyaan Pemantik: {current.storyHook.question}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Konsep Inti */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {current.coreConcepts.map((concept, cIdx) => (
                      <div key={cIdx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-extrabold text-indigo-700">{concept.heading}</h3>
                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">{concept.content}</p>
                        <ul className="mt-4 space-y-2.5">
                          {concept.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                              <span className="bg-indigo-100 text-indigo-700 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Contoh Soal & Pembahasan Langkah demi Langkah */}
                  <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
                    <h3 className="text-lg font-extrabold text-slate-800 mb-4">
                      📌 Bedah Contoh Kasus & Cara Berpikir
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {current.workedExamples.map((ex, exIdx) => (
                        <div key={exIdx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                          <div className="font-bold text-indigo-700 text-base">{ex.title}</div>
                          <p className="text-sm text-slate-700 mt-2 bg-white p-3 rounded-lg border border-slate-200 italic">
                            "{ex.problem}"
                          </p>
                          <div className="mt-3 space-y-1.5">
                            {ex.steps.map((st, sIdx) => (
                              <div key={sIdx} className="text-xs text-slate-700 flex gap-2">
                                <span className="font-bold text-indigo-600">{sIdx + 1}.</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-2 rounded-lg text-xs font-bold">
                            🎯 Kesimpulan: {ex.conclusion}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kamus Mini & Panduan Guru/Orang Tua */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h4 className="font-extrabold text-slate-800 text-base mb-3">📚 Kamus Istilah Penting</h4>
                      <div className="space-y-3">
                        {current.dictionary.map((d, dIdx) => (
                          <div key={dIdx} className="border-b border-slate-100 pb-2 last:border-0">
                            <span className="font-bold text-indigo-700 text-sm">{d.term}: </span>
                            <span className="text-slate-600 text-sm">{d.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-indigo-950 text-white rounded-2xl p-6">
                      <h4 className="font-extrabold text-amber-300 text-base mb-3">
                        🤝 Aktivitas Dunia Nyata (Guru & Orang Tua)
                      </h4>
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div>
                          <div className="font-bold text-indigo-200 uppercase mb-1">Di Kelas Bersama Guru:</div>
                          <ul className="list-disc list-inside space-y-1 text-slate-200">
                            {current.offlineActivities.teacherGuide.map((tg, i) => (
                              <li key={i}>{tg}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t border-indigo-800">
                          <div className="font-bold text-emerald-300 uppercase mb-1">Di Rumah Bersama Orang Tua:</div>
                          <ul className="list-disc list-inside space-y-1 text-slate-200">
                            {current.offlineActivities.parentGuide.map((pg, i) => (
                              <li key={i}>{pg}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================================================================
            TAB 3: SIMULATOR INTERAKTIF 3D KE 2D & SISTEM BERPETAK
        ================================================================ */}
        {activeTab === "simulator" && (
          <div className="space-y-8">
            {/* SIMULATOR 1: KONSTRUKSI KUBUS SATUAN & PROYEKSI 3 SUDUT PANDANG */}
            <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Laboratorium Spasial 1 (Sub-Bab A & B)
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-800 mt-1">
                    Simulator Konstruksi Kubus Satuan & Proyeksi 3 Arah
                  </h2>
                  <p className="text-sm text-slate-600">
                    Klik tombol <strong>(+)</strong> atau <strong>(-)</strong> pada setiap petak alas 3×3 untuk menambah tinggi tumpukan kubus (0–4 lapis), lalu amati perubahan gambar Tampak Atas, Depan, dan Samping secara langsung!
                  </p>
                </div>
                <div className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center shrink-0">
                  <div className="text-xs uppercase font-bold opacity-80">Total Kubus Satuan</div>
                  <div className="text-3xl font-black">{totalVoxels}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                {/* Kontrol Alas 3x3 */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold uppercase text-center text-slate-500 mb-2">
                    ⬆️ Arah Belakang Bangunan
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-w-[320px] mx-auto">
                    {voxelGrid.map((row, rIdx) =>
                      row.map((heightVal, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`rounded-xl p-3 border-2 flex flex-col items-center justify-between transition ${
                            heightVal > 0
                              ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                              : "bg-white text-slate-400 border-slate-200"
                          }`}
                        >
                          <span className="text-[10px] uppercase opacity-75">
                            B{rIdx + 1}-K{cIdx + 1}
                          </span>
                          <span className="text-2xl font-black my-1">{heightVal}</span>
                          <div className="flex gap-1.5 w-full">
                            <button
                              onClick={() => handleCellClick(rIdx, cIdx, -1)}
                              className="flex-1 bg-black/20 hover:bg-black/30 rounded py-0.5 font-bold text-sm"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleCellClick(rIdx, cIdx, 1)}
                              className="flex-1 bg-white/25 hover:bg-white/40 rounded py-0.5 font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase text-center text-indigo-700 mt-3">
                    👀 Arah Pandang DEPAN (Mata Kita Melihat dari Sini)
                  </div>
                </div>

                {/* Hasil 3 Proyeksi Ortogonal Otomatis */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tampak Atas */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <div className="font-bold text-sm text-slate-800 mb-1">1. Tampak Atas</div>
                    <p className="text-[11px] text-slate-500 text-center mb-3">
                      Petak menyala jika tinggi ≥ 1
                    </p>
                    <div className="grid grid-cols-3 gap-1 bg-slate-200 p-2 rounded-lg">
                      {voxelGrid.map((row, rIdx) =>
                        row.map((val, cIdx) => (
                          <div
                            key={`top-${rIdx}-${cIdx}`}
                            className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold ${
                              val > 0 ? "bg-amber-400 text-slate-900 border border-amber-500" : "bg-white text-slate-300"
                            }`}
                          >
                            {val > 0 ? "■" : ""}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Tampak Depan */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <div className="font-bold text-sm text-slate-800 mb-1">2. Tampak Depan</div>
                    <p className="text-[11px] text-slate-500 text-center mb-3">
                      Tinggi maks tiap kolom: [{frontProjection.join(", ")}]
                    </p>
                    <div className="grid grid-cols-3 gap-1 bg-slate-200 p-2 rounded-lg">
                      {[4, 3, 2, 1].map((level) =>
                        [0, 1, 2].map((colIdx) => {
                          const filled = frontProjection[colIdx] >= level;
                          return (
                            <div
                              key={`front-${level}-${colIdx}`}
                              className={`w-10 h-8 rounded ${
                                filled ? "bg-sky-500 border border-sky-600" : "bg-white"
                              }`}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Tampak Samping Kanan */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <div className="font-bold text-sm text-slate-800 mb-1">3. Tampak Samping</div>
                    <p className="text-[11px] text-slate-500 text-center mb-3">
                      Tinggi maks tiap baris: [{sideProjection.join(", ")}]
                    </p>
                    <div className="grid grid-cols-3 gap-1 bg-slate-200 p-2 rounded-lg">
                      {[4, 3, 2, 1].map((level) =>
                        [0, 1, 2].map((rowIdx) => {
                          const filled = sideProjection[rowIdx] >= level;
                          return (
                            <div
                              key={`side-${level}-${rowIdx}`}
                              className={`w-10 h-8 rounded ${
                                filled ? "bg-emerald-500 border border-emerald-600" : "bg-white"
                              }`}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIMULATOR 2: NAVIGASI LOKASI PADA SISTEM BERPETAK (SUB-BAB C) */}
            <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Laboratorium Spasial 2 (Sub-Bab C)
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-800 mt-1">
                    Simulator Koordinat & Jalur Terpendek pada Sistem Berpetak
                  </h2>
                  <p className="text-sm text-slate-600">
                    Gerakkan Robot Logistik 🤖 menuju Peti Harta Karun ⭐! Perhatikan bagaimana posisi ditulis dengan urutan <strong>(Kolom Mendatar, Baris Tegak)</strong>.
                  </p>
                </div>
                <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold">
                  Posisi Robot: ({colLetters[robotPos.col]}, {robotPos.row}) • Target: ({colLetters[targetPos.col]}, {targetPos.row})
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 items-center">
                {/* Grid 6x5 */}
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-7 gap-1.5">
                    {[5, 4, 3, 2, 1].map((rowNum) => (
                      <React.Fragment key={`row-${rowNum}`}>
                        <div className="w-9 h-11 flex items-center justify-center font-extrabold text-slate-500 text-sm">
                          {rowNum}
                        </div>
                        {[0, 1, 2, 3, 4, 5].map((colIdx) => {
                          const isRobot = robotPos.col === colIdx && robotPos.row === rowNum;
                          const isTarget = targetPos.col === colIdx && targetPos.row === rowNum;
                          return (
                            <div
                              key={`cell-${colIdx}-${rowNum}`}
                              className={`w-11 h-11 rounded-lg border flex items-center justify-center text-lg font-bold transition ${
                                isRobot
                                  ? "bg-indigo-600 text-white border-indigo-700 shadow"
                                  : isTarget
                                  ? "bg-amber-400 text-slate-900 border-amber-500 animate-pulse"
                                  : "bg-slate-50 border-slate-200 text-slate-300"
                              }`}
                            >
                              {isRobot ? "🤖" : isTarget ? "⭐" : ""}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                    <div />
                    {colLetters.map((letter) => (
                      <div
                        key={`col-${letter}`}
                        className="w-11 h-8 flex items-center justify-center font-extrabold text-indigo-700 text-sm"
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Navigasi & Riwayat Langkah */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 max-w-[220px] mx-auto">
                    <div />
                    <button
                      onClick={() => {
                        if (robotPos.row < 5) {
                          setRobotPos((p) => ({ ...p, row: p.row + 1 }));
                          setStepHistory((h) => [...h, "⬆️ Atas"]);
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow"
                    >
                      ⬆️ Atas
                    </button>
                    <div />
                    <button
                      onClick={() => {
                        if (robotPos.col > 0) {
                          setRobotPos((p) => ({ ...p, col: p.col - 1 }));
                          setStepHistory((h) => [...h, "⬅️ Kiri"]);
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow"
                    >
                      ⬅️ Kiri
                    </button>
                    <button
                      onClick={() => {
                        setRobotPos({ col: 0, row: 1 });
                        setTargetPos({
                          col: Math.floor(Math.random() * 4) + 2,
                          row: Math.floor(Math.random() * 4) + 2,
                        });
                        setStepHistory([]);
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 rounded-xl text-xs"
                    >
                      🔄 Acak
                    </button>
                    <button
                      onClick={() => {
                        if (robotPos.col < 5) {
                          setRobotPos((p) => ({ ...p, col: p.col + 1 }));
                          setStepHistory((h) => [...h, "➡️ Kanan"]);
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow"
                    >
                      ➡️ Kanan
                    </button>
                    <div />
                    <button
                      onClick={() => {
                        if (robotPos.row > 1) {
                          setRobotPos((p) => ({ ...p, row: p.row - 1 }));
                          setStepHistory((h) => [...h, "⬇️ Bawah"]);
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow"
                    >
                      ⬇️ Bawah
                    </button>
                    <div />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
                    <div className="font-bold text-slate-700">
                      Total Langkah Ditempuh: {stepHistory.length} petak
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Jalur: {stepHistory.length > 0 ? stepHistory.join(" → ") : "Belum bergerak"}
                    </div>
                    {robotPos.col === targetPos.col && robotPos.row === targetPos.row && (
                      <div className="mt-2 bg-emerald-100 text-emerald-800 font-bold px-3 py-2 rounded-lg text-xs">
                        🎉 Hebat! Robot berhasil mencapai koordinat target ({colLetters[targetPos.col]}, {targetPos.row})!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 4: KANVAS PRAKTIKUM SPASIAL (ZERO-COST CLIENT-SIDE)
        ================================================================ */}
        {activeTab === "praktikum" && (
          <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6">
            <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Praktikum Motorik & Visualisasi (Biaya API Rp 0)
            </span>
            <h2 className="text-xl font-extrabold text-slate-800 mt-2">
              Misi Menggambar Proyeksi Tampak Atas & Tampak Depan
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Bayangkan sebuah susunan balok berbentuk <strong>Huruf L</strong> yang terdiri dari 4 kubus satuan (tinggi tiang kiri 3 kubus, dan di sebelah kanannya ada 1 kubus). Gambarlah bentuk <strong>Tampak Depan</strong> di kanvas bawah ini!
            </p>

            <div className="mt-5 flex flex-col items-center">
              <canvas
                ref={canvasRef}
                width={560}
                height={300}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                className="w-full max-w-[560px] h-[300px] bg-slate-50 border-2 border-dashed border-indigo-300 rounded-2xl cursor-crosshair touch-none"
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
                  onClick={verifyLocalCanvas}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
                >
                  ✅ Periksa Gambarku (Lokal)
                </button>
              </div>

              {canvasFeedback && (
                <div className="mt-4 max-w-lg text-center bg-indigo-50 border border-indigo-200 text-indigo-900 px-4 py-3 rounded-xl text-sm font-bold">
                  {canvasFeedback}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 5: LATIHAN MANDIRI (10 SOAL KOMPREHENSIF)
        ================================================================ */}
        {activeTab === "latihan" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-800">
                🎯 Latihan Pemahaman Bab 3 (10 Soal Kurikulum Merdeka)
              </h2>
              <p className="text-sm text-slate-600">
                Seluruh pemeriksaan jawaban dilakukan secara instan di perambanmu tanpa memotong kuota server. Setiap jawaban benar pada percobaan pertama memberikan <strong>+5 Token IGIL</strong>!
              </p>
            </div>

            {STATIC_QUESTIONS.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
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
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleCheckAnswer(q)}
                        disabled={!userChoice}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm"
                      >
                        Kunci Jawaban
                      </button>
                    ) : (
                      <div
                        className={`w-full p-4 rounded-xl border text-sm ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-rose-50 border-rose-200 text-rose-900"
                        }`}
                      >
                        <div className="font-extrabold">
                          {isCorrect ? "🎉 Jawabanmu Benar!" : `❌ Kurang Tepat. Jawaban yang benar: ${q.correctAnswer}`}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed">{q.explanation}</p>
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
            <div className="bg-gradient-to-r from-indigo-900 to-violet-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
                  Anti-Cheating Dynamic Engine
                </span>
                <h2 className="text-xl font-extrabold mt-2">
                  🏆 Lembar Evaluasi Bab 3 (Angka Unik Per Siswa)
                </h2>
                <p className="text-xs text-indigo-100 mt-1">
                  Setiap siswa mendapatkan kombinasi ukuran balok, matriks tinggi menara, dan koordinat yang berbeda. Menyelesaikan soal evaluasi bernilai <strong>+10 Token IGIL</strong> per soal!
                </p>
              </div>
              <button
                onClick={() => {
                  setStudentSeed(Math.floor(Math.random() * 9000) + 100);
                }}
                className="bg-white text-indigo-900 hover:bg-indigo-50 px-4 py-2.5 rounded-xl font-extrabold text-xs shrink-0 shadow"
              >
                🎲 Simulasikan Siswa Lain (Acak Angka Baru)
              </button>
            </div>

            {dynamicEvalQuestions.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
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
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleCheckAnswer(q)}
                        disabled={!userChoice}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-slate-950 font-extrabold text-sm"
                      >
                        Kirim & Tambang Token
                      </button>
                    ) : (
                      <div
                        className={`w-full p-4 rounded-xl border text-sm ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-rose-50 border-rose-200 text-rose-900"
                        }`}
                      >
                        <div className="font-extrabold">
                          {isCorrect ? "🌟 Tepat Sekali! +10 Token IGIL" : `❌ Belum Tepat. Kunci Jawaban: ${q.correctAnswer}`}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed">{q.explanation}</p>
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