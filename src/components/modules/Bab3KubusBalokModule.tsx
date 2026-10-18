"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// 1. DATA MATERI KURIKULUM MERDEKA KELAS 6 SD - BAB 3: KUBUS DAN BALOK
// ============================================================================

export interface VisualSlide {
  title: string;
  badge: string;
  explanation: string;
  visualComponentType: "kontainer_isometric" | "lapis_breakdown" | "proyeksi_3arah" | "koordinat_denah";
  keyTakeaways: string[];
  commonTrap: string; // Jebakan yang sering salah pada anak belajar mandiri
}

export interface SubChapterMaterial {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  slides: VisualSlide[];
  kamusCilik: { kata: string; arti: string; ikon: string }[];
}

export const BAB3_MATERIALS: SubChapterMaterial[] = [
  {
    id: "sub-a",
    code: "Sub-Bab A",
    title: "Mengonstruksi & Mengurai Bangun Ruang",
    subtitle: "Eksplorasi 3.1 & 3.2: Arsitektur Bangunan Kontainer & Menghitung Kubus Tersembunyi",
    slides: [
      {
        title: "Tahap 1: Merancang Bangunan dari Kontainer Bekas",
        badge: "Eksplorasi 3.1 • Konsep Dasar",
        explanation:
          "Bayangkan kamu adalah seorang arsitek yang merancang kafe atau rumah modular ramah lingkungan. Setiap kontainer barang berbentuk balok atau kubus satuan. Ketika dua kontainer disambung, minimal satu sisi penuh harus menempel rata.",
        visualComponentType: "kontainer_isometric",
        keyTakeaways: [
          "Konstruksi Segaris: 3 kontainer disusun memanjang lurus (3 × 1 × 1).",
          "Konstruksi Sudut (Huruf L): 2 kontainer sejajar lalu 1 kontainer menempel menyiku di samping.",
          "Aturan Rotasi: Bentuk L yang diberdirikan tegak maupun ditidurkan mendatar dihitung sebagai 1 BENTUK YANG SAMA (hanya diputar posisinya).",
        ],
        commonTrap: "⚠️ Jangan menganggap balok yang diputar posisinya sebagai bentuk baru! Pola konstruksinya tetap sama persis.",
      },
      {
        title: "Tahap 2: Menghitung Kubus Tersembunyi (Metode Urai Per Lapis)",
        badge: "Eksplorasi 3.2 • Intisari Perhitungan",
        explanation:
          "Saat melihat gambar tumpukan balok 3D di layar, ada kubus-kubus di lapisan bawah dan belakang yang tertutup oleh kubus di depannya. Anak yang belajar mandiri sering salah menghitung hanya yang terlihat oleh mata!",
        visualComponentType: "lapis_breakdown",
        keyTakeaways: [
          "Lantai 1 (Dasar): Hitung luas alas = Panjang × Lebar petak. Di sinilah semua kubus penyangga berada (termasuk yang tertutup).",
          "Lantai 2 & 3 (Tingkat): Hitung kubus tambahan yang bertumpuk di atas lantai dasar.",
          "Rumus Total: Total Kubus = Kubus Lantai Dasar + Kubus Lantai Tingkat.",
        ],
        commonTrap: "⚠️ Jangan lupa: Kubus di lantai atas TIDAK BISA MELAYANG di udara. Pasti ada kubus tersembunyi di bawahnya yang menopangnya!",
      },
    ],
    kamusCilik: [
      { kata: "Mengonstruksi", arti: "Menyusun kubus-kubus kecil menjadi bangunan ruang baru.", ikon: "🧱" },
      { kata: "Mengurai", arti: "Membongkar susunan ruang menjadi potongan per lantai/lapis.", ikon: "🧩" },
      { kata: "Kertas Isometrik", arti: "Kertas dengan kisi titik segitiga untuk menggambar 3D secara presisi.", ikon: "📐" },
    ],
  },
  {
    id: "sub-b",
    code: "Sub-Bab B",
    title: "Visualisasi Spasial (3 Sudut Pandang)",
    subtitle: "Eksplorasi 3.3: Mengubah Gambar 3D Menjadi Cetak Biru Datar 2D",
    slides: [
      {
        title: "Tahap 1: Tiga Arah Pandang Mata Tegak Lurus",
        badge: "Eksplorasi 3.3 • Proyeksi Ortogonal",
        explanation:
          "Tukang bangunan membutuhkan gambar denah datar 2D yang pasti agar tidak salah membangun. Ketika kamu memandang tumpukan kubus tepat tegak lurus dari satu arah, efek kedalaman hilang dan berubah menjadi petak bujur sangkar datar:",
        visualComponentType: "proyeksi_3arah",
        keyTakeaways: [
          "Tampak Atas: Memandang dari langit ke bawah. Terlihat posisi jejak petak alas bangunan.",
          "Tampak Depan: Mata berdiri sejajar lurus dari depan. Terlihat lebar ke samping dan tinggi menara.",
          "Tampak Samping Kanan: Berdiri sejajar dari sisi kanan. Terlihat panjang ke belakang dan tinggi menara.",
        ],
        commonTrap: "⚠️ Pada Tampak Atas, kamu TIDAK BISA melihat seberapa tinggi menara kubus itu! Kamu hanya tahu petak mana saja yang terisi.",
      },
      {
        title: "Tahap 2: Aturan Menara Tertinggi",
        badge: "Logika Gambar Proyeksi",
        explanation:
          "Jika dalam satu baris/kolom lurus pandangan terdapat beberapa kubus dengan ketinggian berbeda, kubus yang pendek akan terhalang oleh kubus yang lebih tinggi.",
        visualComponentType: "proyeksi_3arah",
        keyTakeaways: [
          "Kotak Tampak Depan = Angka TERTINGGI (Maksimum) dari depan ke belakang pada kolom tersebut.",
          "Kotak Tampak Samping = Angka TERTINGGI (Maksimum) dari kanan ke kiri pada baris tersebut.",
        ],
        commonTrap: "⚠️ Jika di depan ada 1 kubus dan di belakangnya ada 3 kubus, dari depan tetap terlihat 3 petak kotak!",
      },
    ],
    kamusCilik: [
      { kata: "Visualisasi Spasial", arti: "Kemampuan memutar dan melihat objek ruang di dalam bayangan pikiran.", ikon: "🧠" },
      { kata: "Tampak Depan", arti: "Penampakan datar ketika melihat bangunan tegak lurus dari arah depan.", ikon: "👁️" },
      { kata: "Tampak Atas", arti: "Penampakan denah datar seolah-olah dilihat dari atas langit (bird-eye).", ikon: "🦅" },
    ],
  },
  {
    id: "sub-c",
    code: "Sub-Bab C",
    title: "Lokasi pada Sistem Berpetak",
    subtitle: "Eksplorasi 3.4 & 3.5: Koordinat Petak (Kolom, Baris) & Rute Terpendek",
    slides: [
      {
        title: "Tahap 1: Aturan Baku Pasangan Berurutan (Kolom, Baris)",
        badge: "Eksplorasi 3.4 • Membaca Peta",
        explanation:
          "Agar kapal pengangkut dan truk logistik tidak salah menurunkan peti kemas, lantai pelabuhan dibagi menjadi sistem petak koordinat kotak-kotak beraturan:",
        visualComponentType: "koordinat_denah",
        keyTakeaways: [
          "Langkah 1 (Mendatar / Kolom): Susuri garis huruf di bawah dari kiri ke kanan (A, B, C, D...).",
          "Langkah 2 (Tegak / Baris): Naik ke atas menyusuri angka di samping (1, 2, 3, 4...).",
          "Rumus Notasi: Wajib (KOLOM, BARIS) -> Contoh: (C, 4). Jangan sampai terbalik menjadi (4, C)!",
        ],
        commonTrap: "⚠️ Jembatan Keledai: 'Masuk Pintu Rumah dulu (Mendatar), baru Naik Tangga (Tegak)!'",
      },
      {
        title: "Tahap 2: Menghitung Jalur Terpendek Tanpa Menyerong",
        badge: "Eksplorasi 3.5 • Navigasi Jalur",
        explanation:
          "Di atas peta berpetak, kendaraan tidak boleh berjalan serong/miring memotong garis. Gerakan hanya boleh belok 90 derajat (Timur/Barat dan Utara/Selatan).",
        visualComponentType: "koordinat_denah",
        keyTakeaways: [
          "Jarak Mendatar = Selisih langkah kolom asal ke kolom tujuan.",
          "Jarak Tegak = Selisih langkah baris asal ke baris tujuan.",
          "Total Langkah Terpendek = Jarak Mendatar + Jarak Tegak.",
        ],
        commonTrap: "⚠️ Jangan mengukur garis miring diagonal! Hitung jumlah ubin petak yang dilewati menyusuri garis kisi.",
      },
    ],
    kamusCilik: [
      { kata: "Sistem Berpetak", arti: "Kisi-kisi ubin bujur sangkar beraturan untuk menentukan lokasi pasti.", ikon: "🗺️" },
      { kata: "Pasangan Berurutan", arti: "Penulisan koordinat (Mendatar, Tegak) yang tidak boleh tertukar.", ikon: "📌" },
      { kata: "Jalur Terpendek", arti: "Rute dengan jumlah petak paling sedikit tanpa memotong diagonal.", ikon: "🧭" },
    ],
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

// ============================================================================
// KOMPONEN ILUSTRASI DOODLE BERWARNA (100% SVG VEKTOR - ZERO API COST)
// ============================================================================
function MaterialVisualGraphic({ type }: { type: VisualSlide["visualComponentType"] }) {
  // --------------------------------------------------------------------------
  // DOODLE 1: KONSTRUKSI KONTAINER ISOMETRIK 3D
  // --------------------------------------------------------------------------
  if (type === "kontainer_isometric") {
    return (
      <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-4">
          <span className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
            <span>🎨</span> Sketsa Doodle: Membangun dengan 3 Kontainer
          </span>
          <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
            Eksplorasi 3.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doodle 1: Segaris Lurus */}
          <div className="bg-white p-4 rounded-2xl border-2 border-indigo-100 flex flex-col items-center">
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-3">
              1. Bentuk Segaris (Panjang 3 × 1)
            </span>
            <svg viewBox="0 0 240 120" className="w-full max-w-[200px] h-auto">
              {/* Karakter Doodle Anak Tersenyum */}
              <g transform="translate(10, 30)">
                <circle cx="20" cy="20" r="16" fill="#fed7aa" stroke="#334155" strokeWidth="2.5" />
                {/* Rambut */}
                <path d="M 6 16 Q 20 4 34 16" fill="#78350f" stroke="#78350f" strokeWidth="3" />
                {/* Mata Senyum */}
                <path d="M 14 18 Q 17 15 20 18" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <path d="M 22 18 Q 25 15 28 18" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                {/* Senyum */}
                <path d="M 17 25 Q 21 29 25 25" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
                {/* Badan Doodle */}
                <path d="M 20 36 L 20 60 M 10 45 L 30 45" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* 3 Kubus Isometrik Berdampingan */}
              <g transform="translate(70, 25)">
                {/* Kubus 1 (Biru Muda) */}
                <g transform="translate(0, 20)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,62 0,48" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,48 25,62" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
                </g>
                {/* Kubus 2 (Kuning-Oranye) */}
                <g transform="translate(45, 20)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#fde047" stroke="#854d0e" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,62 0,48" fill="#eab308" stroke="#854d0e" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,48 25,62" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
                </g>
                {/* Kubus 3 (Hijau) */}
                <g transform="translate(90, 20)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#86efac" stroke="#166534" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,62 0,48" fill="#22c55e" stroke="#166534" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,48 25,62" fill="#16a34a" stroke="#166534" strokeWidth="2" />
                </g>
              </g>
            </svg>
            <p className="text-[11px] font-semibold text-slate-600 text-center mt-2">
              Disusun memanjang lurus membentuk balok 3 × 1 × 1
            </p>
          </div>

          {/* Doodle 2: Sudut L */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-100 flex flex-col items-center">
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              2. Bentuk Menyiku (Huruf L)
            </span>
            <svg viewBox="0 0 240 120" className="w-full max-w-[200px] h-auto">
              <g transform="translate(40, 10)">
                {/* Kubus Belakang */}
                <g transform="translate(30, 0)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,58 0,44" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,44 25,58" fill="#db2777" stroke="#9d174d" strokeWidth="2" />
                </g>
                {/* Kubus Kiri Depan */}
                <g transform="translate(0, 25)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#c084fc" stroke="#6b21a8" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,58 0,44" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,44 25,58" fill="#9333ea" stroke="#6b21a8" strokeWidth="2" />
                </g>
                {/* Kubus Kanan Depan (Membentuk Sudut L) */}
                <g transform="translate(55, 30)">
                  <polygon points="25,5 50,18 25,32 0,18" fill="#38bdf8" stroke="#075985" strokeWidth="2" />
                  <polygon points="0,18 25,32 25,58 0,44" fill="#0ea5e9" stroke="#075985" strokeWidth="2" />
                  <polygon points="25,32 50,18 50,44 25,58" fill="#0284c7" stroke="#075985" strokeWidth="2" />
                </g>
              </g>
              {/* Tanda Seru Doodle Lucu */}
              <g transform="translate(180, 25)">
                <circle cx="15" cy="15" r="12" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <text x="15" y="20" textAnchor="middle" fill="#854d0e" fontSize="14" fontWeight="bold">!</text>
                <text x="15" y="42" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Siku 90°</text>
              </g>
            </svg>
            <p className="text-[11px] font-semibold text-slate-600 text-center mt-2">
              Menempel membentuk sudut siku-siku (Huruf L)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DOODLE 2: MEMBONGKAR LAPISAN & KUBUS TERSEMBUNYI
  // --------------------------------------------------------------------------
  if (type === "lapis_breakdown") {
    return (
      <div className="bg-sky-50/70 border-2 border-sky-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-sky-200 pb-2 mb-4">
          <span className="text-xs font-black uppercase text-sky-900 tracking-wider flex items-center gap-1.5">
            <span>🍰</span> Doodle: Menemukan Kubus yang Tertutup di Bawah
          </span>
          <span className="text-[11px] font-bold bg-sky-200 text-sky-900 px-2.5 py-0.5 rounded-full">
            Eksplorasi 3.2
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-6">
          {/* Ilustrasi Kubus Bertumpuk utuh */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-extrabold text-slate-700 mb-2">Tumpukan Utuh</span>
            <svg viewBox="0 0 160 140" className="w-36 h-32">
              {/* Lapis Bawah (6 kubus) */}
              <g transform="translate(20, 45)">
                <polygon points="40,5 80,25 40,45 0,25" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                <polygon points="0,25 40,45 40,80 0,60" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                <polygon points="40,45 80,25 80,60 40,80" fill="#0284c7" stroke="#0284c7" strokeWidth="2" />
              </g>
              {/* Lapis Atas (2 kubus) */}
              <g transform="translate(20, 10)">
                <polygon points="30,5 60,20 30,35 0,20" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                <polygon points="0,20 30,35 30,65 0,50" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
                <polygon points="30,35 60,20 60,50 30,65" fill="#ca8a04" stroke="#ca8a04" strokeWidth="2" />
              </g>
              {/* Kacamata Detektif Doodle */}
              <g transform="translate(100, 20)">
                <circle cx="15" cy="15" r="10" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="22" y1="22" x2="35" y2="35" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <text x="20" y="52" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">Ada yang</text>
                <text x="20" y="62" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">tersembunyi!</text>
              </g>
            </svg>
          </div>

          <div className="text-2xl font-black text-sky-400">➡️ Diurai Menjadi:</div>

          {/* Penguraian Per Lapis */}
          <div className="flex gap-4">
            {/* Lantai Atas */}
            <div className="bg-white p-3 rounded-2xl border-2 border-amber-300 text-center shadow-sm">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Lantai 2 (Atas)
              </span>
              <div className="text-3xl my-2">🟨🟨</div>
              <div className="font-extrabold text-slate-800 text-sm">2 Kubus</div>
              <div className="text-[10px] text-slate-500">Terlihat di atas</div>
            </div>

            <div className="text-2xl font-black text-slate-400 self-center">+</div>

            {/* Lantai Bawah */}
            <div className="bg-white p-3 rounded-2xl border-2 border-sky-300 text-center shadow-sm">
              <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Lantai 1 (Dasar)
              </span>
              <div className="text-3xl my-2">🟦🟦🟦<br />🟦🟦🟦</div>
              <div className="font-extrabold text-slate-800 text-sm">6 Kubus (3 × 2)</div>
              <div className="text-[10px] text-emerald-600 font-bold">Termasuk 2 di bawah!</div>
            </div>

            <div className="text-2xl font-black text-slate-400 self-center">=</div>

            {/* Total */}
            <div className="bg-emerald-500 text-white p-3 rounded-2xl text-center shadow-md self-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold opacity-90">Total Asli</span>
              <div className="text-2xl font-black my-0.5">8 Buah</div>
              <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full">Tuntas ✓</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DOODLE 3: MATA PENGAMAT 3 SUDUT PANDANG (ATAS, DEPAN, SAMPING)
  // --------------------------------------------------------------------------
  if (type === "proyeksi_3arah") {
    return (
      <div className="bg-violet-50/70 border-2 border-violet-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-violet-200 pb-2 mb-4">
          <span className="text-xs font-black uppercase text-violet-900 tracking-wider flex items-center gap-1.5">
            <span>👀</span> Doodle: 3 Wajah Pengamat Memandang dari Arah Berbeda
          </span>
          <span className="text-[11px] font-bold bg-violet-200 text-violet-900 px-2.5 py-0.5 rounded-full">
            Eksplorasi 3.3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Pengamat Tampak Atas (Melihat ke Bawah) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 flex flex-col items-center">
            <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-2">
              1. Tampak Atas (Dari Langit)
            </span>
            <svg viewBox="0 0 160 120" className="w-36 h-28">
              {/* Karakter Wajah Menunduk / Melihat ke Bawah */}
              <g transform="translate(50, 10)">
                <circle cx="30" cy="25" r="22" fill="#fed7aa" stroke="#334155" strokeWidth="2.5" />
                <path d="M 12 18 Q 30 5 48 18" fill="#78350f" stroke="#78350f" strokeWidth="4" />
                {/* Mata Menatap ke Bawah */}
                <ellipse cx="23" cy="27" rx="3" ry="5" fill="#334155" />
                <ellipse cx="37" cy="27" rx="3" ry="5" fill="#334155" />
                {/* Panah Pandang ke Bawah */}
                <path d="M 30 38 L 30 54 M 25 48 L 30 54 L 35 48" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {/* Hasil Gambar 2D di Kertas */}
              <g transform="translate(45, 75)">
                <rect x="0" y="0" width="30" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <rect x="35" y="0" width="30" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <text x="35" y="42" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Hanya Jejak Alas</text>
              </g>
            </svg>
            <p className="text-[11px] text-slate-600 text-center mt-1">
              Mata di atas melihat ke bawah. Tinggi menara <strong>tidak kelihatan</strong>!
            </p>
          </div>

          {/* 2. Pengamat Tampak Depan (Sejajar Lurus) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-sky-200 flex flex-col items-center">
            <span className="text-xs font-extrabold text-sky-800 bg-sky-100 px-3 py-1 rounded-full mb-2">
              2. Tampak Depan (Lurus)
            </span>
            <svg viewBox="0 0 160 120" className="w-36 h-28">
              {/* Karakter Wajah Menatap Lurus ke Depan */}
              <g transform="translate(10, 30)">
                <circle cx="25" cy="25" r="20" fill="#fed7aa" stroke="#334155" strokeWidth="2.5" />
                <path d="M 8 18 Q 25 8 42 18" fill="#1e293b" stroke="#1e293b" strokeWidth="4" />
                {/* Kacamata / Mata Membelalak */}
                <circle cx="19" cy="25" r="5" fill="#ffffff" stroke="#334155" strokeWidth="2" />
                <circle cx="19" cy="25" r="2" fill="#0284c7" />
                <circle cx="31" cy="25" r="5" fill="#ffffff" stroke="#334155" strokeWidth="2" />
                <circle cx="31" cy="25" r="2" fill="#0284c7" />
                {/* Panah Lurus ke Bangunan */}
                <path d="M 50 25 L 68 25 M 62 19 L 68 25 L 62 31" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              </g>
              {/* Hasil Gambar Bertingkat 2D */}
              <g transform="translate(85, 20)">
                <rect x="0" y="0" width="26" height="26" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="0" y="28" width="26" height="26" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="28" y="28" width="26" height="26" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                <text x="27" y="66" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">Tinggi Maksimal</text>
              </g>
            </svg>
            <p className="text-[11px] text-slate-600 text-center mt-1">
              Mata lurus di depan. Terlihat lebar dan <strong>menara tertinggi</strong> tiap kolom.
            </p>
          </div>

          {/* 3. Pengamat Tampak Samping Kanan */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 flex flex-col items-center">
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
              3. Tampak Samping (Kanan)
            </span>
            <svg viewBox="0 0 160 120" className="w-36 h-28">
              {/* Hasil Gambar Datar dari Sisi */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="26" height="26" fill="#34d399" stroke="#065f46" strokeWidth="1.5" />
                <rect x="0" y="28" width="26" height="26" fill="#34d399" stroke="#065f46" strokeWidth="1.5" />
                <rect x="28" y="28" width="26" height="26" fill="#34d399" stroke="#065f46" strokeWidth="1.5" />
                <text x="27" y="66" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">Tampak Sisi</text>
              </g>
              {/* Karakter Wajah Menghadap ke Kiri */}
              <g transform="translate(100, 30)">
                <circle cx="22" cy="25" r="20" fill="#fed7aa" stroke="#334155" strokeWidth="2.5" />
                <path d="M 6 18 Q 22 8 38 18" fill="#b45309" stroke="#b45309" strokeWidth="4" />
                {/* Mata Menoleh ke Kiri */}
                <ellipse cx="14" cy="24" rx="3" ry="5" fill="#334155" />
                {/* Panah Menembak ke Kiri */}
                <path d="M -5 25 L -22 25 M -16 19 L -22 25 L -16 31" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>
            <p className="text-[11px] text-slate-600 text-center mt-1">
              Mata berdiri di sisi kanan menatap ke kiri. Terlihat panjang ke belakang!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DOODLE 4: SISTEM BERPETAK & KARAKTER MELANGKAH
  // --------------------------------------------------------------------------
  return (
    <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-4">
        <span className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
          <span>🧭</span> Doodle: Petualang Melangkah di Ubin Koordinat
        </span>
        <span className="text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
          Eksplorasi 3.4 & 3.5
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Peta Ubin Doodle Berpetak */}
        <div className="bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-sm">
          <svg viewBox="0 0 180 140" className="w-44 h-36">
            {/* Garis-Garis Ubin Berpetak */}
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={25 + c * 35}
                  y={10 + r * 28}
                  width="35"
                  height="28"
                  fill={(r + c) % 2 === 0 ? "#f8fafc" : "#f1f5f9"}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
              ))
            )}
            {/* Huruf Kolom */}
            {["A", "B", "C", "D"].map((h, i) => (
              <text key={h} x={42 + i * 35} y={132} textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">
                {h}
              </text>
            ))}
            {/* Angka Baris */}
            {[4, 3, 2, 1].map((n, i) => (
              <text key={n} x={15} y={28 + i * 28} textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
                {n}
              </text>
            ))}

            {/* Karakter Petualang di (B, 1) */}
            <g transform="translate(62, 90)">
              <circle cx="15" cy="12" r="9" fill="#fde047" stroke="#334155" strokeWidth="2" />
              <text x="15" y="16" textAnchor="middle" fontSize="10">🤠</text>
            </g>

            {/* Jalur Panah Doodle: Kanan dulu baru Atas */}
            <path
              d="M 80 105 L 125 105 M 125 105 L 125 50"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="4"
            />
            {/* Target Harta Karun di (C, 3) */}
            <g transform="translate(118, 38)">
              <text x="10" y="16" textAnchor="middle" fontSize="16">⭐</text>
            </g>
          </svg>
        </div>

        {/* Kotak Rumus Jembatan Keledai Doodle */}
        <div className="space-y-3 max-w-xs">
          <div className="bg-white p-3.5 rounded-2xl border-2 border-indigo-200">
            <div className="text-xs font-black text-indigo-700 uppercase">🚪 Jembatan Keledai:</div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              <strong>"Masuk Pintu Dulu"</strong> (Geser mendatar A ➔ B ➔ C), lalu <strong>"Baru Naik Tangga"</strong> (Naik tegak 1 ➔ 2 ➔ 3)!
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border-2 border-emerald-200">
            <div className="text-xs font-black text-emerald-700 uppercase">🚫 Jangan Menyerong:</div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              Langkah terpendek dihitung dari: <strong>Langkah Mendatar + Langkah Tegak</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            {/* Pilihan 3 Sub-Bab Buku Siswa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {BAB3_MATERIALS.map((sub, idx) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubBab(idx)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    selectedSubBab === idx
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.01]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">{sub.code}</div>
                  <div className="font-extrabold text-base mt-0.5">{sub.title}</div>
                  <div className="text-xs opacity-85 mt-1 line-clamp-1">{sub.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Isi Konten Pembelajaran Mandiri (Bite-Sized Cards) */}
            {(() => {
              const current = BAB3_MATERIALS[selectedSubBab];
              return (
                <div className="space-y-6">
                  {/* Header Sub-Bab */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                        {current.code} • Belajar Mandiri Terarah
                      </span>
                      <h2 className="text-2xl font-black text-slate-800 mt-1">{current.title}</h2>
                      <p className="text-sm text-slate-600 mt-0.5">{current.subtitle}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("simulator")}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold px-5 py-2.5 rounded-xl text-xs shadow self-start md:self-auto shrink-0 transition"
                    >
                      🧪 Buka Simulator 3D Bab Ini →
                    </button>
                  </div>

                  {/* Kartu-Kartu Slide Materi Bergambar */}
                  <div className="grid grid-cols-1 gap-6">
                    {current.slides.map((slide, sIdx) => (
                      <div key={sIdx} className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[11px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                              {slide.badge}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-800 mt-1.5">{slide.title}</h3>
                          </div>
                        </div>

                        <p className="text-slate-700 text-sm leading-relaxed">{slide.explanation}</p>

                        {/* Komponen Visualisasi SVG / Diagram */}
                        <MaterialVisualGraphic type={slide.visualComponentType} />

                        {/* Poin Kunci Belajar Mandiri */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                          <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            🎯 Rangkuman Konsep Penting:
                          </div>
                          <ul className="space-y-2">
                            {slide.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">✔</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Jebakan / Miskonsepsi Siswa */}
                        <div className="bg-rose-50 border border-rose-200 text-rose-900 px-4 py-2.5 rounded-xl text-xs font-bold">
                          {slide.commonTrap}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kamus Istilah Bergambar */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h4 className="font-extrabold text-slate-800 text-base mb-3 flex items-center gap-2">
                      <span>📖</span> Kamus Cilik Bab 3 (Ingat Kata Kunci Ini!)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {current.kamusCilik.map((k, kIdx) => (
                        <div key={kIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <div className="text-2xl mb-1">{k.ikon}</div>
                            <div className="font-extrabold text-indigo-700 text-sm">{k.kata}</div>
                            <div className="text-xs text-slate-600 mt-1 leading-relaxed">{k.arti}</div>
                          </div>
                        </div>
                      ))}
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