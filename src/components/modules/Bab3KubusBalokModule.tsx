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

function KotakDoodle({
  isi,
  kelas,
}: {
  isi: string;
  kelas: string;
}) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 text-xl font-black shadow-sm ${kelas}`}
    >
      {isi}
    </div>
  );
}

const UKURAN_KUBUS = 52;
const JEJAK_KUBUS = UKURAN_KUBUS / 2;

function namaSudutPandang(x: number, y: number) {
  const lingkar = ((y % 360) + 360) % 360;
  const mendatar = lingkar > 180 ? lingkar - 360 : lingkar;
  if (x < -55) return "tampak atas";
  if (x > 55) return "tampak bawah";
  if (Math.abs(mendatar) < 30) return "tampak depan";
  if (mendatar > 60 && mendatar < 120) return "tampak kanan";
  if (mendatar < -60 && mendatar > -120) return "tampak kiri";
  if (Math.abs(mendatar) > 150) return "tampak belakang";
  return "miring";
}

function MukaKubus({
  transform,
  kelas,
  nomor,
  ukuran = UKURAN_KUBUS,
}: {
  transform: string;
  kelas: string;
  nomor: string;
  ukuran?: number;
}) {
  return (
    <div
      className={`absolute flex items-center justify-center border-2 font-black leading-none ${
        ukuran < 40 ? "text-xs" : ukuran < 46 ? "text-sm" : "text-lg"
      } ${kelas}`}
      style={{
        width: ukuran,
        height: ukuran,
        transform,
        backfaceVisibility: "hidden",
      }}
    >
      {nomor}
    </div>
  );
}

type WarnaKubus = {
  depan: string;
  belakang: string;
  kanan: string;
  kiri: string;
  atas: string;
  bawah: string;
};

const WARNA_LANGIT: WarnaKubus = {
  depan: "border-sky-900 bg-sky-300 text-sky-950",
  belakang: "border-sky-900 bg-sky-500 text-white",
  kanan: "border-sky-900 bg-sky-400 text-sky-950",
  kiri: "border-sky-900 bg-sky-200 text-sky-950",
  atas: "border-amber-800 bg-amber-300 text-amber-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

const WARNA_L: WarnaKubus = {
  depan: "border-emerald-900 bg-emerald-300 text-emerald-950",
  belakang: "border-emerald-900 bg-emerald-600 text-white",
  kanan: "border-emerald-900 bg-emerald-400 text-emerald-950",
  kiri: "border-emerald-900 bg-emerald-200 text-emerald-950",
  atas: "border-amber-800 bg-amber-300 text-amber-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

const JARAK_KUBUS = UKURAN_KUBUS + 2;

function SatuKubus({
  nomor,
  x,
  y,
  z = 0,
  warna,
  ukuran = UKURAN_KUBUS,
  transisi = true,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  nomor: string;
  x: number;
  y: number;
  z?: number;
  warna: WarnaKubus;
  ukuran?: number;
  transisi?: boolean;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
}) {
  const jejak = `${ukuran / 2}px`;
  const muka = [
    { transform: `rotateY(0deg) translateZ(${jejak})`, kelas: warna.depan },
    { transform: `rotateY(180deg) translateZ(${jejak})`, kelas: warna.belakang },
    { transform: `rotateY(90deg) translateZ(${jejak})`, kelas: warna.kanan },
    { transform: `rotateY(-90deg) translateZ(${jejak})`, kelas: warna.kiri },
    { transform: `rotateX(90deg) translateZ(${jejak})`, kelas: warna.atas },
    { transform: `rotateX(-90deg) translateZ(${jejak})`, kelas: warna.bawah },
  ];
  return (
    <div
      data-nomor={nomor}
      className="absolute left-1/2 top-1/2"
      style={{
        width: ukuran,
        height: ukuran,
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
        transition: transisi ? "transform 0.45s ease" : "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {muka.map((item) => (
        <MukaKubus key={item.transform} transform={item.transform} kelas={item.kelas} nomor={nomor} ukuran={ukuran} />
      ))}
    </div>
  );
}

function hurufLDepan() {
  const sisi = UKURAN_KUBUS;
  const mentah = [
    { nomor: "1", x: 0, y: 0, z: 0 },
    { nomor: "2", x: sisi, y: 0, z: 0 },
    { nomor: "3", x: 0, y: -sisi, z: 0 },
  ];
  const tengahX = mentah.reduce((jumlah, kubus) => jumlah + kubus.x, 0) / mentah.length;
  const tengahY = mentah.reduce((jumlah, kubus) => jumlah + kubus.y, 0) / mentah.length;
  return mentah.map((kubus) => ({
    nomor: kubus.nomor,
    x: kubus.x - tengahX,
    y: kubus.y - tengahY,
    z: 0,
  }));
}

function PanggungKubus({
  kubus,
  warna,
  aria,
  kelasLabel,
  kelasTombol,
  awal = { x: -18, y: 28 },
  awalDatar = 0,
  petunjuk = true,
  adaLantai = false,
  tinggiKelas = "h-44",
}: {
  kubus: { nomor: string; x: number; y: number; z?: number }[];
  warna: WarnaKubus;
  aria: string;
  kelasLabel: string;
  kelasTombol: string;
  awal?: { x: number; y: number };
  awalDatar?: number;
  petunjuk?: boolean;
  adaLantai?: boolean;
  tinggiKelas?: string;
}) {
  const [sudut, setSudut] = useState({ x: awal.x, y: awal.y, z: awalDatar });
  const [halus, setHalus] = useState(true);
  const tarik = useRef<{ x: number; y: number; sx: number; sy: number; sz: number } | null>(null);

  function mulaiTarik(event: React.PointerEvent<HTMLDivElement>) {
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Geser tetap jalan bila browser menolak tangkapan jari.
    }
    setHalus(false);
    tarik.current = { x: event.clientX, y: event.clientY, sx: sudut.x, sy: sudut.y, sz: sudut.z };
  }

  function geserTarik(event: React.PointerEvent<HTMLDivElement>) {
    if (!tarik.current) return;
    setSudut({
      x: Math.max(-85, Math.min(85, tarik.current.sx - (event.clientY - tarik.current.y) * 0.5)),
      y: tarik.current.sy + (event.clientX - tarik.current.x) * 0.55,
      z: tarik.current.sz,
    });
  }

  function lepasTarik() {
    tarik.current = null;
  }

  function keSudut(x: number, y: number) {
    setHalus(true);
    setSudut((sekarang) => ({ ...sekarang, x, y }));
  }

  return (
    <div>
      <div
        className={`relative mx-auto mt-2 w-full cursor-grab touch-none select-none active:cursor-grabbing ${tinggiKelas}`}
        style={{ perspective: "760px" }}
        onPointerDown={mulaiTarik}
        onPointerMove={geserTarik}
        onPointerUp={lepasTarik}
        onPointerCancel={lepasTarik}
        role="img"
        aria-label={aria}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${sudut.x}deg) rotateY(${sudut.y}deg) rotateY(${-sudut.z}deg)`,
            transition: halus ? "transform 0.7s ease" : "none",
          }}
        >
          {adaLantai ? (
            <div
              className="absolute left-1/2 top-1/2 rounded-[28px] bg-emerald-100"
              style={{
                width: 148,
                height: 148,
                transform: `translate(-50%, -50%) translateY(${
                  kubus.reduce((terendah, item) => Math.max(terendah, item.y), 0) + UKURAN_KUBUS / 2 + 1
                }px) rotateX(90deg)`,
              }}
            />
          ) : null}
          {kubus.map((item) => (
            <SatuKubus
              key={item.nomor}
              nomor={item.nomor}
              x={item.x}
              y={item.y}
              z={item.z ?? 0}
              warna={warna}
            />
          ))}
        </div>
      </div>
      <p className={`text-center text-sm font-black ${kelasLabel}`}>{namaSudutPandang(sudut.x, sudut.y)}</p>
      {petunjuk ? (
        <p className="text-center text-xs font-bold text-slate-500">Tahan, lalu geser untuk memutar</p>
      ) : null}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => keSudut(awal.x, awal.y)} className={`rounded-full px-3 py-1 text-xs font-black ${kelasTombol}`}>
          Depan
        </button>
        <button type="button" onClick={() => keSudut(-16, 90)} className={`rounded-full px-3 py-1 text-xs font-black ${kelasTombol}`}>
          Samping
        </button>
        <button type="button" onClick={() => keSudut(-74, 16)} className="rounded-full bg-amber-200 px-3 py-1 text-xs font-black text-amber-950">
          Atas
        </button>
      </div>
    </div>
  );
}

const WARNA_LANTAI_ATAS: WarnaKubus = {
  depan: "border-amber-800 bg-amber-300 text-amber-950",
  belakang: "border-amber-900 bg-amber-500 text-amber-950",
  kanan: "border-amber-800 bg-amber-200 text-amber-950",
  kiri: "border-amber-900 bg-amber-400 text-amber-950",
  atas: "border-orange-800 bg-orange-200 text-orange-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

type SelKubus = {
  nomor: string;
  kolom: number;
  dalam: number;
  lantai: number;
  warna: WarnaKubus;
};

const UKURAN_TUMPUK = 38;
const ASAL_KOLOM = 1;

function polaDelapan(): SelKubus[] {
  return [
    { nomor: "1", kolom: 0, dalam: 0, lantai: 0, warna: WARNA_LANGIT },
    { nomor: "2", kolom: 1, dalam: 0, lantai: 0, warna: WARNA_LANGIT },
    { nomor: "3", kolom: 2, dalam: 0, lantai: 0, warna: WARNA_LANGIT },
    { nomor: "4", kolom: 0, dalam: 0, lantai: 1, warna: WARNA_L },
    { nomor: "5", kolom: 1, dalam: 0, lantai: 1, warna: WARNA_L },
    { nomor: "6", kolom: 2, dalam: 0, lantai: 1, warna: WARNA_L },
    { nomor: "7", kolom: 0, dalam: 0, lantai: 2, warna: WARNA_LANTAI_ATAS },
    { nomor: "8", kolom: 1, dalam: 0, lantai: 2, warna: WARNA_LANTAI_ATAS },
  ];
}

function pikselSel(
  sel: { kolom: number; dalam: number; lantai: number },
  ukuran = UKURAN_TUMPUK,
  asalKolom = ASAL_KOLOM,
  asalDalam = 0,
) {
  return {
    x: (sel.kolom - asalKolom) * ukuran,
    y: (1 - sel.lantai) * ukuran,
    z: (asalDalam - sel.dalam) * ukuran,
  };
}

function polaRuang24(): SelKubus[] {
  const warnaLantai = [WARNA_LANGIT, WARNA_L, WARNA_LANTAI_ATAS];
  const daftar: SelKubus[] = [];
  let nomor = 1;
  for (let lantai = 0; lantai < 3; lantai += 1) {
    const jumlahBaris = lantai === 2 ? 2 : 3;
    for (let dalam = 0; dalam < jumlahBaris; dalam += 1) {
      for (let kolom = 0; kolom < 3; kolom += 1) {
        daftar.push({
          nomor: String(nomor),
          kolom,
          dalam,
          lantai,
          warna: warnaLantai[lantai],
        });
        nomor += 1;
      }
    }
  }
  return daftar;
}

function jepit(nilai: number, rendah: number, tinggi: number) {
  return Math.max(rendah, Math.min(tinggi, nilai));
}

function layarKePetak(dx: number, dy: number, ax: number, ay: number) {
  const ayR = (ay * Math.PI) / 180;
  const axR = (ax * Math.PI) / 180;
  const cy = Math.cos(ayR);
  const sy = Math.sin(ayR);
  const cx = Math.cos(axR);
  const sx = Math.sin(axR);
  const sumbu = [
    { nama: "x" as const, x: cy, y: sy * sx },
    { nama: "y" as const, x: 0, y: cx },
    { nama: "z" as const, x: sy, y: -cy * sx },
  ]
    .map((item) => ({ ...item, panjang: Math.hypot(item.x, item.y) }))
    .sort((a, b) => b.panjang - a.panjang);
  const hasil = { x: 0, y: 0, z: 0 };
  const utama = sumbu[0];
  const kedua = sumbu[1];
  const det = utama.x * kedua.y - utama.y * kedua.x;
  if (Math.abs(det) < 0.08) {
    const panjang = utama.panjang || 1;
    hasil[utama.nama] = (dx * utama.x + dy * utama.y) / (panjang * panjang);
    return hasil;
  }
  hasil[utama.nama] = (dx * kedua.y - dy * kedua.x) / det;
  hasil[kedua.nama] = (utama.x * dy - utama.y * dx) / det;
  return hasil;
}

function angkatKeMata(ax: number, ay: number) {
  const ayR = (ay * Math.PI) / 180;
  const axR = (ax * Math.PI) / 180;
  const jarak = 34;
  return {
    x: -Math.cos(axR) * Math.sin(ayR) * jarak,
    y: Math.sin(axR) * jarak,
    z: Math.cos(axR) * Math.cos(ayR) * jarak,
  };
}

function padatkan(daftar: SelKubus[], nomor: string, tinggiMaks = 4) {
  const pindah = daftar.find((item) => item.nomor === nomor);
  if (!pindah) return daftar;
  const kelompok = new Map<string, SelKubus[]>();
  daftar.forEach((item) => {
    if (item.nomor === nomor) return;
    const kunci = `${item.kolom},${item.dalam}`;
    const isi = kelompok.get(kunci) ?? [];
    isi.push(item);
    kelompok.set(kunci, isi);
  });
  const hasil: SelKubus[] = [];
  kelompok.forEach((isi) => {
    isi.sort((a, b) => a.lantai - b.lantai);
    isi.forEach((item, indeks) => hasil.push({ ...item, lantai: indeks }));
  });
  const kunci = `${pindah.kolom},${pindah.dalam}`;
  const tinggi = hasil.filter((item) => `${item.kolom},${item.dalam}` === kunci).length;
  hasil.push({ ...pindah, lantai: Math.min(tinggi, tinggiMaks) });
  return hasil.sort((a, b) => Number(a.nomor) - Number(b.nomor));
}

function TumpukanBongkar({
  polaAwal = polaDelapan,
  ukuran = UKURAN_TUMPUK,
  asalKolom = ASAL_KOLOM,
  asalDalam = 0,
  batasKolom = [-1, 4],
  batasDalam = [-2, 2],
  tinggiMaks = 4,
  aria = "Delapan kubus. Lantai 1 nomor 1 2 3, lantai 2 nomor 4 5 6, lantai 3 nomor 7 8. Geser satu kubus untuk memindahkannya.",
  tinggiKelas = "h-80",
  puncak = "top-[42%]",
  lantaiLebar = 248,
  lantaiDalam = 190,
  lantaiGeserX = 19,
}: {
  polaAwal?: () => SelKubus[];
  ukuran?: number;
  asalKolom?: number;
  asalDalam?: number;
  batasKolom?: [number, number];
  batasDalam?: [number, number];
  tinggiMaks?: number;
  aria?: string;
  tinggiKelas?: string;
  puncak?: string;
  lantaiLebar?: number;
  lantaiDalam?: number;
  lantaiGeserX?: number;
}) {
  const [sel, setSel] = useState<SelKubus[]>(polaAwal);
  const [sudut, setSudut] = useState({ x: -14, y: 18 });
  const [halus, setHalus] = useState(true);
  const [pegang, setPegang] = useState<string | null>(null);
  const [geser, setGeser] = useState<{ x: number; y: number; z: number } | null>(null);
  const tarik = useRef<{
    jenis: "putar" | "kubus";
    nomor: string | null;
    x: number;
    y: number;
    sx: number;
    sy: number;
    px: number;
    py: number;
    pz: number;
    gx: number;
    gy: number;
    gz: number;
  } | null>(null);

  function mulaiTarik(event: React.PointerEvent<HTMLDivElement>, nomor: string | null) {
    if (nomor) event.stopPropagation();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Geser tetap jalan bila browser menolak tangkapan jari.
    }
    if (nomor) {
      const asal = sel.find((item) => item.nomor === nomor);
      const piksel = pikselSel(asal ?? { kolom: 0, dalam: 0, lantai: 0 }, ukuran, asalKolom, asalDalam);
      setPegang(nomor);
      setGeser(null);
      tarik.current = {
        jenis: "kubus",
        nomor,
        x: event.clientX,
        y: event.clientY,
        sx: sudut.x,
        sy: sudut.y,
        px: piksel.x,
        py: piksel.y,
        pz: piksel.z,
        gx: piksel.x,
        gy: piksel.y,
        gz: piksel.z,
      };
      return;
    }
    setHalus(false);
    tarik.current = {
      jenis: "putar",
      nomor: null,
      x: event.clientX,
      y: event.clientY,
      sx: sudut.x,
      sy: sudut.y,
      px: 0,
      py: 0,
      pz: 0,
      gx: 0,
      gy: 0,
      gz: 0,
    };
  }

  function geserTarik(event: React.PointerEvent<HTMLDivElement>) {
    const jejak = tarik.current;
    if (!jejak) return;
    const dx = event.clientX - jejak.x;
    const dy = event.clientY - jejak.y;
    if (jejak.jenis === "putar") {
      setSudut({
        x: Math.max(-85, Math.min(85, jejak.sx - dy * 0.5)),
        y: jejak.sy + dx * 0.55,
      });
      return;
    }
    const lokal = layarKePetak(dx, dy, jejak.sx, jejak.sy);
    jejak.gx = jejak.px + lokal.x;
    jejak.gy = jejak.py + lokal.y;
    jejak.gz = jejak.pz + lokal.z;
    setGeser({ x: jejak.gx, y: jejak.gy, z: jejak.gz });
  }

  function lepasTarik() {
    const jejak = tarik.current;
    tarik.current = null;
    if (!jejak || jejak.jenis === "putar") return;
    const nomor = jejak.nomor;
    setPegang(null);
    setGeser(null);
    if (!nomor) return;
    const jarak = Math.hypot(jejak.gx - jejak.px, jejak.gy - jejak.py, jejak.gz - jejak.pz);
    if (jarak < 8) return;
    const kolom = jepit(Math.round(jejak.gx / ukuran + asalKolom), batasKolom[0], batasKolom[1]);
    const dalam = jepit(Math.round(asalDalam - jejak.gz / ukuran), batasDalam[0], batasDalam[1]);
    setSel((sekarang) => {
      const asal = sekarang.find((item) => item.nomor === nomor);
      if (asal && asal.kolom === kolom && asal.dalam === dalam) return sekarang;
      return padatkan(
        sekarang.map((item) => (item.nomor === nomor ? { ...item, kolom, dalam } : item)),
        nomor,
        tinggiMaks,
      );
    });
  }

  function keSudut(x: number, y: number) {
    setHalus(true);
    setSudut({ x, y });
  }

  const angkat = pegang && geser ? angkatKeMata(sudut.x, sudut.y) : { x: 0, y: 0, z: 0 };
  const urutan = [...sel].sort((a, b) => (a.nomor === pegang ? 1 : b.nomor === pegang ? -1 : 0));

  return (
    <div>
      <div
        className={`relative mx-auto mt-2 w-full cursor-grab touch-none select-none active:cursor-grabbing ${tinggiKelas}`}
        style={{ perspective: "820px" }}
        onPointerDown={(event) => mulaiTarik(event, null)}
        onPointerMove={geserTarik}
        onPointerUp={lepasTarik}
        onPointerCancel={lepasTarik}
        role="img"
        aria-label={aria}
      >
        <div
          className={`absolute left-1/2 h-0 w-0 ${puncak}`}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${sudut.x}deg) rotateY(${sudut.y}deg)`,
            transition: halus ? "transform 0.7s ease" : "none",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-[24px] bg-sky-100"
            style={{
              width: lantaiLebar,
              height: lantaiDalam,
              transform: `translate(-50%, -50%) translate3d(${lantaiGeserX}px, ${ukuran * 1.5 + 1}px, 0px) rotateX(90deg)`,
            }}
          />
          {urutan.map((kubus) => {
            const dasar = pikselSel(kubus, ukuran, asalKolom, asalDalam);
            const dipegang = kubus.nomor === pegang && geser;
            return (
              <SatuKubus
                key={kubus.nomor}
                nomor={kubus.nomor}
                ukuran={ukuran}
                warna={kubus.warna}
                transisi={!dipegang}
                x={dipegang ? geser.x + angkat.x : dasar.x}
                y={dipegang ? geser.y + angkat.y : dasar.y}
                z={dipegang ? geser.z + angkat.z : dasar.z}
                onPointerDown={(event) => mulaiTarik(event, kubus.nomor)}
                onPointerMove={geserTarik}
                onPointerUp={lepasTarik}
              />
            );
          })}
        </div>
      </div>
      <p className="text-center text-sm font-black text-sky-800">{namaSudutPandang(sudut.x, sudut.y)}</p>
      <p className="text-center text-xs font-bold text-slate-500">
        {pegang
          ? `Kubus ${pegang} sedang dipindah. Lepas jari di tempat yang kamu mau.`
          : "Tahan satu kubus, lalu geser ke tempat baru. Geser area kosong untuk memutar."}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => keSudut(-14, 18)} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-900">
          Depan
        </button>
        <button type="button" onClick={() => keSudut(-16, 78)} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-900">
          Samping
        </button>
        <button type="button" onClick={() => keSudut(-72, 16)} className="rounded-full bg-amber-200 px-3 py-1 text-xs font-black text-amber-950">
          Atas
        </button>
        <button
          type="button"
          onClick={() => {
            setPegang(null);
            setGeser(null);
            setSel(polaAwal());
          }}
          className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900"
        >
          Susun semula
        </button>
      </div>
    </div>
  );
}

function BentukSegaris3D() {
  return (
    <PanggungKubus
      aria="Tiga kubus segaris. Geser untuk memutar."
      warna={WARNA_LANGIT}
      kelasLabel="text-sky-800"
      kelasTombol="bg-sky-100 text-sky-900"
      kubus={[
        { nomor: "1", x: -JARAK_KUBUS, y: 0 },
        { nomor: "2", x: 0, y: 0 },
        { nomor: "3", x: JARAK_KUBUS, y: 0 },
      ]}
    />
  );
}

function MaterialVisualGraphic({ type }: { type: VisualSlide["visualComponentType"] }) {
  if (type === "kontainer_isometric") {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-amber-300 bg-amber-50 px-3 py-3 text-center text-sm font-black text-amber-950">
          3 kubus yang menempel sisi penuh hanya punya 2 bentuk. Diputar tetap bentuk yang sama.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-black text-sky-800">Bentuk 1 · Segaris</p>
            <BentukSegaris3D />
            <p className="mt-2 text-center text-sm font-bold text-slate-700">3 × 1 × 1 · memanjang lurus</p>
          </div>
          <div>
            <p className="text-sm font-black text-emerald-800">Bentuk 2 · Huruf L</p>
            <PanggungKubus
              aria="Huruf L dari depan. Lantai 1 kubus 1 dan 2, lantai 2 kubus 3 di kiri."
              warna={WARNA_L}
              kelasLabel="text-emerald-800"
              kelasTombol="bg-emerald-100 text-emerald-900"
              awal={{ x: -10, y: 0 }}
              tinggiKelas="h-56"
              adaLantai
              kubus={hurufLDepan()}
            />
            <p className="mt-2 text-center text-sm font-bold text-slate-700">
              Lantai 1: kubus 1 dan 2. Lantai 2: kubus 3 di kiri.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "lapis_breakdown") {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-sky-300 bg-sky-50 px-3 py-3 text-center text-sm font-black text-sky-950">
          Kubus di atas tidak bisa melayang. Yang tertutup di bawah tetap dihitung.
        </p>
        <div>
          <p className="text-sm font-black text-sky-800">Bongkar dan pasang delapan kubus</p>
          <TumpukanBongkar />
          <p className="mt-2 text-center text-sm font-bold text-slate-700">
            Dari depan, kiri ke kanan. Lantai 1: 1-2-3. Lantai 2: 4-5-6. Lantai 3: 7-8.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-3 py-3 text-white">
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">3</span>
          <span className="text-2xl font-black">+</span>
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">3</span>
          <span className="text-2xl font-black">+</span>
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">2</span>
          <span className="text-2xl font-black">=</span>
          <span className="rounded-xl bg-white px-3 py-1 text-lg font-black text-emerald-800">8 kubus</span>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <p className="text-sm font-black text-violet-800">Bongkar dan pasang 24 kubus</p>
          <p className="mt-1 text-center text-sm font-bold text-slate-700">
            Ruang 3 × 3 × 3 m. Lantai 1 dan 2 penuh. Lantai 3 hanya dua baris depan.
          </p>
          <TumpukanBongkar
            polaAwal={polaRuang24}
            ukuran={30}
            asalDalam={1}
            batasKolom={[-1, 3]}
            batasDalam={[-1, 3]}
            tinggiMaks={4}
            tinggiKelas="h-80"
            puncak="top-1/2"
            lantaiLebar={210}
            lantaiDalam={210}
            lantaiGeserX={0}
            aria="Dua puluh empat kubus. Lantai 1 nomor 1 sampai 9, lantai 2 nomor 10 sampai 18, lantai 3 nomor 19 sampai 24. Geser satu kubus untuk memindahkannya."
          />
          <p className="mt-2 text-center text-sm font-bold text-slate-700">
            Dari depan, kiri ke kanan, baris depan dulu. Lantai 1: 1-9. Lantai 2: 10-18. Lantai 3: 19-24.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-violet-600 px-3 py-3 text-white">
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">9</span>
          <span className="text-2xl font-black">+</span>
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">9</span>
          <span className="text-2xl font-black">+</span>
          <span className="rounded-xl bg-white/20 px-3 py-1 text-lg font-black">6</span>
          <span className="text-2xl font-black">=</span>
          <span className="rounded-xl bg-white px-3 py-1 text-lg font-black text-violet-800">24 kubus</span>
        </div>
      </div>
    );
  }

  if (type === "proyeksi_3arah") {
    const tumpuk = (tinggi: number, warna: string) => (
      <div className="flex flex-col-reverse gap-1">
        {Array.from({ length: tinggi }).map((_, i) => (
          <div key={i} className={`h-8 w-10 rounded-md border-[3px] ${warna}`} />
        ))}
      </div>
    );
    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-violet-300 bg-violet-50 px-3 py-3 text-center text-sm font-black text-violet-950">
          Satu bangunan, tiga gambar. Angka di peta adalah tinggi menara.
        </p>
        <div className="mx-auto w-fit">
          <p className="mb-2 text-center text-xs font-black text-slate-600">Peta tinggi · depan ada di bawah</p>
          <div className="grid grid-cols-[4.5rem_3.5rem_3.5rem] gap-1 text-center text-sm font-black">
            <div />
            <div className="text-slate-500">Kiri</div>
            <div className="text-slate-500">Kanan</div>
            <div className="text-slate-500">Belakang</div>
            <div className="flex h-14 items-center justify-center rounded-xl border-4 border-violet-700 bg-violet-200">3</div>
            <div className="flex h-14 items-center justify-center rounded-xl border-4 border-violet-700 bg-violet-200">1</div>
            <div className="text-slate-500">Depan</div>
            <div className="flex h-14 items-center justify-center rounded-xl border-4 border-violet-700 bg-violet-200">1</div>
            <div className="flex h-14 items-center justify-center rounded-xl border-4 border-violet-700 bg-violet-200">2</div>
          </div>
          <p className="mt-2 text-center text-xs font-bold text-slate-600">Jumlah kubus = 3 + 1 + 1 + 2 = 7</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-center">
            <p className="text-sm font-black text-amber-800">Tampak atas</p>
            <div className="mx-auto mt-3 grid w-fit grid-cols-2 gap-1">
              <div className="h-10 w-10 rounded-md border-4 border-amber-600 bg-amber-300" />
              <div className="h-10 w-10 rounded-md border-4 border-amber-600 bg-amber-300" />
              <div className="h-10 w-10 rounded-md border-4 border-amber-600 bg-amber-300" />
              <div className="h-10 w-10 rounded-md border-4 border-amber-600 bg-amber-300" />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-700">4 petak terisi. Tinggi tidak kelihatan.</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-sky-800">Tampak depan</p>
            <div className="mt-3 flex items-end justify-center gap-2">
              <div>
                {tumpuk(3, "border-sky-700 bg-sky-300")}
                <p className="mt-1 text-xs font-black text-sky-800">3</p>
              </div>
              <div>
                {tumpuk(2, "border-sky-700 bg-sky-300")}
                <p className="mt-1 text-xs font-black text-sky-800">2</p>
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-700">Kiri: max(1, 3) = 3. Kanan: max(2, 1) = 2.</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-emerald-800">Tampak samping</p>
            <div className="mt-3 flex items-end justify-center gap-2">
              <div>
                {tumpuk(2, "border-emerald-700 bg-emerald-300")}
                <p className="mt-1 text-xs font-black text-emerald-800">depan 2</p>
              </div>
              <div>
                {tumpuk(3, "border-emerald-700 bg-emerald-300")}
                <p className="mt-1 text-xs font-black text-emerald-800">belakang 3</p>
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-700">Tiap baris diambil angka tertingginya.</p>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-rose-100 px-4 py-3 text-center text-sm font-black text-rose-900">
          Di depan hanya 1 kubus, di belakangnya ada 3. Dari depan tetap tergambar 3 kotak.
        </p>
      </div>
    );
  }

  const kolom = ["A", "B", "C", "D"];
  const baris = [4, 3, 2, 1];
  const langkah = new Set(["A1", "B1", "C1", "C2", "C3"]);
  return (
    <div className="space-y-4">
      <p className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-3 text-center text-sm font-black text-emerald-950">
        Tulis kolom dulu, baru baris. Jalan menyusuri petak, jangan menyerong.
      </p>
      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <div className="grid grid-cols-[2rem_repeat(4,3.25rem)] gap-1 text-center text-sm font-black">
            <div />
            {kolom.map((huruf) => (
              <div key={huruf} className="text-indigo-700">{huruf}</div>
            ))}
            {baris.map((angka) => (
              <div key={angka} className="contents">
                <div className="flex items-center justify-center text-emerald-700">{angka}</div>
                {kolom.map((huruf) => {
                  const kode = `${huruf}${angka}`;
                  const contoh = kode === "C4";
                  const jalur = langkah.has(kode);
                  return (
                    <div
                      key={kode}
                      className={`flex h-12 items-center justify-center rounded-lg border-4 ${
                        contoh
                          ? "border-amber-600 bg-amber-300 text-amber-950"
                          : jalur
                            ? "border-emerald-700 bg-emerald-300 text-emerald-950"
                            : "border-slate-200 bg-slate-50 text-transparent"
                      }`}
                    >
                      {contoh ? "★" : jalur ? "•" : ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-bold text-indigo-700">A B C D · kolom, tulis pertama</p>
          <p className="text-center text-xs font-bold text-emerald-700">1 2 3 4 naik ke atas · baris, tulis kedua</p>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-amber-300 bg-amber-50 px-3 py-3">
            <p className="text-sm font-black text-amber-800">Cara menulis</p>
            <p className="mt-1 text-2xl font-black text-slate-900">(C, 4)</p>
            <p className="text-sm font-bold text-slate-700">Kolom C, lalu baris 4. Bukan (4, C).</p>
          </div>
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-3">
            <p className="text-sm font-black text-emerald-800">Jalur hijau: (A, 1) ke (C, 3)</p>
            <p className="mt-1 text-sm font-bold text-slate-700">2 petak ke kanan + 2 petak ke atas</p>
            <p className="mt-2 text-2xl font-black text-emerald-700">2 + 2 = 4 langkah</p>
            <p className="mt-1 text-sm font-bold text-rose-700">Garis miring tidak dihitung.</p>
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
      <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white shadow-lg">
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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                  <div className="space-y-8">
                    {current.slides.map((slide, sIdx) => (
                      <section
                        key={sIdx}
                        className={sIdx === 0 ? "space-y-4" : "space-y-4 border-t border-slate-200 pt-8"}
                      >
                        <div>
                          <span className="text-[11px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                            {slide.badge}
                          </span>
                          <h3 className="text-lg font-extrabold text-slate-800 mt-1.5">{slide.title}</h3>
                        </div>

                        <p className="text-base leading-relaxed text-slate-700">{slide.explanation}</p>

                        <MaterialVisualGraphic type={slide.visualComponentType} />

                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                          <div className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-700">
                            Rangkuman konsep penting
                          </div>
                          <ul className="space-y-2">
                            {slide.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="font-bold text-emerald-600">✔</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-bold text-rose-900">
                          {slide.commonTrap}
                        </div>
                      </section>
                    ))}
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-base font-extrabold text-slate-800">
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