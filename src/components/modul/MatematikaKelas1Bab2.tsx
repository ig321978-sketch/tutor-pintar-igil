"use client";
/**
 * ============================================================================
 * BUKU NASKAH & CETAK BIRU ARSITEKTUR MODUL IGIL (UNTUK CURSOR COMPOSER)
 * ============================================================================
 * MATA PELAJARAN : MATEMATIKA KELAS 1 SD/MI (FASE A - KURIKULUM MERDEKA)
 * BAB & TOPIK    : BAB 2 — PENJUMLAHAN SAMPAI DENGAN 10
 * SUMBER RESMI   : Buku Panduan Guru & Siswa Matematika Kelas I Kemendikbudristek
 *                  (Penulis: Dara Retno Wulan & Rasfaniwaty, 2022, Hal. 33–60)
 * ID KOMPETENSI  : MAT-K1-B2
 *
 * ----------------------------------------------------------------------------
 * 1. FORMULA HIBRIDA 4-TEMPLATE & IDENTITAS KARAKTER
 * ----------------------------------------------------------------------------
 * - Maskot Utama   : 🦉 IGIL (Si Burung Hantu Cerdas) — Audio-First Bahasa
 *                    Indonesia lokal (window.speechSynthesis lang: "id-ID").
 * - Tokoh Buku     : Kira, Upe, Malosi, dan Tora (Tanpa karakter dewasa luar).
 * - Formula UI/UX  :
 *   1) SplashLearn Island Map : Navigasi 6 Pulau Petualangan 3D & bintang progres.
 *   2) Polypad 3-Panel Toybox : Laci Alat Peraga (Kiri) + Meja Bingkai 10 (Tengah)
 *                               + Kalkulator Persamaan & Suara (Kanan).
 *   3) Kanvas 50/50 Geometri  : 50% Kiri Area Terpandu (Waypoints) & 50% Kanan
 *                               Area Mandiri Murni Anti-Jiplak (Rp 0 biaya API).
 *   4) Khan Kids Audio-First  : Panggung soal minim teks dengan tombol 🔊 Suara di
 *                               setiap soal dan di setiap tombol pilihan jawaban.
 * - Tokenomics     : Floating Utility Token (Tanpa konversi Rupiah di UI).
 *                    Total 150 Token IGIL/Bab:
 *                    • Pulau 4 (Latihan)   : Maks. 30 Token (+3 Token/soal)
 *                    • Pulau 5 (Ujian)     : Maks. 70 Token (+7 Token/soal)
 *                    • Pulau 6 (Praktikum) : Maks. 50 Token + Skor 0–1.000 Poin
 *
 * ----------------------------------------------------------------------------
 * 2. NASKAH PULAU 1 (KARTU 1) — PETA KEPULAUAN, 2 GERBANG & BRAIN HOOK
 * ----------------------------------------------------------------------------
 * - Sub-Bab A (Hal. 34–41) : Cerita Penjumlahan (Menggabungkan & Bertambah) - Kira
 * - Sub-Bab B (Hal. 42–49) : Penjumlahan Hitung Maju & Pasangan Bilangan - Upe
 * - Sub-Bab C (Hal. 50–54) : Penjumlahan yang Hasilnya 10 (Make-10) - Malosi
 * - Sub-Bab D (Hal. 55–60) : Sifat Pertukaran (a+b=b+a) & Tambah Nol (a+0=a) - Tora
 * - Brain Hook Motorik     : Tap-to-Merge 3 Burung Merah + 2 Burung Biru = 5 Burung
 *                            di dahan pohon untuk membuka Pulau 2, 3, dan 4.
 *
 * ----------------------------------------------------------------------------
 * 3. NASKAH PULAU 2 (KARTU 2) — 7 STASIUN MOTORIK PENJUMLAHAN (0% SOAL UJIAN)
 * ----------------------------------------------------------------------------
 * - Stasiun 1 (Kira)   : Sentuh & Gabungkan 2 Keranjang Apel (Tap-to-Merge a+b=c).
 * - Stasiun 2 (Upe)    : Pasangkan Kartu Kalimat Penjumlahan dengan Kotak Bintang.
 * - Stasiun 3 (IGIL)   : Kanvas 50/50 Anti-Jiplak Menulis Angka Hasil Penjumlahan.
 * - Stasiun 4 (Malosi) : Garis Bilangan Lompatan Katak Maju (Counting On).
 * - Stasiun 5 (Malosi) : Mesin Penggenap 10 pada Bingkai 10 (Make-10 Ten Frame).
 * - Stasiun 6 (Tora)   : Putar Kartu Domino 180 Derajat (Sifat Pertukaran a+b=b+a).
 * - Stasiun 7 (Kira)   : Piring Donat & Piring Kosong (Penjumlahan Bilangan Nol).
 *
 * ----------------------------------------------------------------------------
 * 4. NASKAH PULAU 3 (KARTU 3) — POLYPAD 3-PANEL TOYBOX & STUDIO KANVAS 50/50
 * ----------------------------------------------------------------------------
 * - Laci Alat Peraga (Stroberi & Pisang) ditaruh ke Meja Bingkai 10, terhubung
 *   langsung dengan Kanvas 50/50 berpenilai geometris lokal (Euclidean Waypoint
 *   Coverage 40% + Bounding Box Aspect Ratio 50% + Quadrant Check 10%).
 *
 * ----------------------------------------------------------------------------
 * 5. NASKAH PULAU 4 (KARTU 4) — 10 SOAL LATIHAN AUDIO-FIRST (+30 TOKEN)
 * ----------------------------------------------------------------------------
 * 1) Kira   : 3 apel merah + 4 apel hijau = 7.
 * 2) Upe    : 4 anak bermain + datang 2 anak = 6.
 * 3) Malosi : Mulai di batu 5, lompat maju 3 langkah = 8.
 * 4) Tora   : Pasangan bilangan 6 dan 3 digabungkan = 9.
 * 5) Kira   : 7 keping merah + 3 keping biru di Bingkai 10 = 10.
 * 6) Upe    : 6 keping merah + ... keping biru = 10 -> Kunci: 4.
 * 7) Tora   : 8 donat + 0 donat = 8.
 * 8) Malosi : Jika 2 + 5 = 7, maka 5 + 2 = 7.
 * 9) Kira   : 5 pensil pagi + 5 pensil sore = 10.
 * 10) Upe   : Penjumlahan yang hasilnya sama dengan 4 + 5 (9) -> Kunci: 6 + 3.
 *
 * ----------------------------------------------------------------------------
 * 6. NASKAH PULAU 5 (KARTU 5) — 10 SOAL UJIAN ANTI-CONTEK (+70 TOKEN)
 * ----------------------------------------------------------------------------
 * - Dynamic Parameterization & Option Shuffling pada ke-10 soal.
 * - Minimum Dwell Time Guard (>= 25 detik) & Tab-Switch Detector (focusLossCount).
 * - Wajib meraih skor 100/100 untuk membuka Pulau 6 (Praktikum).
 *
 * ----------------------------------------------------------------------------
 * 7. NASKAH PULAU 6 (KARTU 6) — STUDIO PRAKTIKUM LINTAS-4-BAB (+50 & 1000 POIN)
 * ----------------------------------------------------------------------------
 * - Proyek Koki Cilik: Menyusun 2 Kotak Bekal Sehat Sahabat (Kira & Upe) yang
 *   masing-masing berjumlah tepat 10 potong buah (IPAS) dengan porsi saling
 *   bertukar/komutatif (Matematika & Pancasila) serta menulis laporan ilmiah
 *   (Bahasa Indonesia) yang dinilai Rubrik AI 4 Parameter (0–1.000 Poin).
 * ============================================================================
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Nunito } from "next/font/google";

const fontAnak = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});
// ============================================================================
// KONTRAK INTEGRASI BACKEND & METADATA PRAKTIKUM LINTAS-BAB
// ============================================================================
export interface ChapterCompetencyMetadata {
  chapterId: string;
  grade: number;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  textbookReference: string;
  coreSkills: string[];
  practicumSynthesisHook: string;
}
export interface PracticumEvaluationRubric {
  accuracyScore: number;          // 0 - 300
  synthesisScore: number;         // 0 - 250
  optimizationVisualScore: number;// 0 - 200
  reasoningReportScore: number;   // 0 - 250
  totalQualityScore: number;      // 0 - 1000
  aiFeedbackSummary: string;
}
export interface ChapterCompletionPayload {
  chapterId: string;
  studentId?: string;
  practiceTokensEarned: number;   // Maks 30
  examTokensEarned: number;       // Maks 70
  practicumTokensEarned: number;  // Maks 50
  totalChapterTokens: number;     // Maks 150
  examScore: number;              // Wajib 100
  practicumRubric: PracticumEvaluationRubric;
  telemetry: {
    attemptCount: number;
    examDurationSeconds: number;
    tabSwitchCount: number;
    isHumanTimingValid: boolean;
    completedAtISO: string;
  };
}
export interface IGILModuleProps {
  studentId?: string;
  studentName?: string;
  completedOtherChapters?: ChapterCompetencyMetadata[];
  onChapterComplete?: (payload: ChapterCompletionPayload) => Promise<void> | void;
}
export const CHAPTER_COMPETENCY_METADATA: ChapterCompetencyMetadata = {
  chapterId: "MAT-K1-B2",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 2,
  chapterTitle: "Penjumlahan sampai dengan 10 (Edisi Hibrida 4-Template & 7 Motorik)",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 2, Halaman 33–60",
  coreSkills: [
    "Memahami penjumlahan sebagai penggabungan dua kelompok benda dan penambahan melalui sentuhan motorik",
    "Melakukan penjumlahan dengan strategi menghitung maju (counting on) dan pasangan bilangan (number bonds)",
    "Menemukan pasangan penjumlahan berjumlah 10 pada Bingkai 10 serta menulis hasilnya di Kanvas 50/50",
    "Memahami sifat pertukaran penjumlahan (a + b = b + a) dan penjumlahan dengan bilangan 0",
  ],
  practicumSynthesisHook:
    "Gunakan operasi penjumlahan dua kelompok objek berjumlah 10 pada Bingkai 10 serta sifat pertukaran (a + b = b + a) untuk merancang komposisi Kotak Bekal Sehat yang adil pada proyek lintas mata pelajaran.",
};
// ============================================================================
// TIPE DATA INTERNAL MESIN VISUAL HIBRIDA
// ============================================================================
type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare" | "note";
type AdditionVisualMode =
  | "merge-baskets"
  | "jump-line"
  | "ten-frame-pair"
  | "number-bond-sum"
  | "domino-flip";
interface Waypoint {
  x: number;
  y: number;
}
interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  themeGradient: string;
  badgeTitle: string;
  prompt: string;
  visualType: AdditionVisualMode;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: AdditionVisualMode;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
type BentoCellFruit = "empty" | "strawberry" | "banana";
const NUMBER_WORDS: Record<number, string> = {
  0: "Nol",
  1: "Satu",
  2: "Dua",
  3: "Tiga",
  4: "Empat",
  5: "Lima",
  6: "Enam",
  7: "Tujuh",
  8: "Delapan",
  9: "Sembilan",
  10: "Sepuluh",
};
const DIGIT_WAYPOINTS: Record<number, Waypoint[]> = {
  0: [
    { x: 110, y: 35 },
    { x: 60, y: 80 },
    { x: 60, y: 145 },
    { x: 110, y: 185 },
    { x: 160, y: 145 },
    { x: 160, y: 80 },
  ],
  1: [
    { x: 85, y: 60 },
    { x: 115, y: 35 },
    { x: 115, y: 85 },
    { x: 115, y: 135 },
    { x: 115, y: 185 },
  ],
  2: [
    { x: 65, y: 65 },
    { x: 115, y: 38 },
    { x: 155, y: 70 },
    { x: 115, y: 125 },
    { x: 65, y: 180 },
    { x: 160, y: 180 },
  ],
  3: [
    { x: 65, y: 50 },
    { x: 145, y: 55 },
    { x: 105, y: 108 },
    { x: 155, y: 150 },
    { x: 70, y: 180 },
  ],
  4: [
    { x: 135, y: 40 },
    { x: 65, y: 130 },
    { x: 165, y: 130 },
    { x: 135, y: 95 },
    { x: 135, y: 185 },
  ],
  5: [
    { x: 150, y: 40 },
    { x: 75, y: 40 },
    { x: 70, y: 105 },
    { x: 150, y: 120 },
    { x: 145, y: 175 },
    { x: 70, y: 180 },
  ],
  6: [
    { x: 145, y: 40 },
    { x: 80, y: 90 },
    { x: 65, y: 150 },
    { x: 115, y: 185 },
    { x: 155, y: 145 },
    { x: 110, y: 110 },
  ],
  7: [
    { x: 60, y: 42 },
    { x: 110, y: 42 },
    { x: 160, y: 42 },
    { x: 125, y: 115 },
    { x: 90, y: 185 },
  ],
  8: [
    { x: 110, y: 38 },
    { x: 68, y: 72 },
    { x: 110, y: 110 },
    { x: 152, y: 148 },
    { x: 110, y: 185 },
    { x: 68, y: 148 },
    { x: 152, y: 72 },
  ],
  9: [
    { x: 150, y: 75 },
    { x: 110, y: 38 },
    { x: 68, y: 75 },
    { x: 110, y: 112 },
    { x: 148, y: 130 },
    { x: 95, y: 185 },
  ],
};
const DEFAULT_CROSS_CHAPTERS: ChapterCompetencyMetadata[] = [
  {
    chapterId: "IPAS-K1-B2",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 2,
    chapterTitle: "Tubuhku Sehat & Buah Bergizi",
    textbookReference: "Kurikulum Merdeka Fase A — Mengenal Makanan Sehat",
    coreSkills: ["Memilih buah kaya vitamin", "Menjaga kesehatan tubuh"],
    practicumSynthesisHook: "Gabungkan Stroberi merah dan Pisang kuning hingga genap 10 di kotak bekal.",
  },
  {
    chapterId: "BINDO-K1-B2",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 2,
    chapterTitle: "Ayo Bermain & Bercerita Runtut",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Kemendikbudristek Bab 2",
    coreSkills: ["Menulis kalimat cerita sederhana", "Menceritakan kegiatan"],
    practicumSynthesisHook: "Tuliskan laporan kalimat penjumlahan kedua kotak bekal dengan jelas.",
  },
  {
    chapterId: "PANCASILA-K1-B2",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 2,
    chapterTitle: "Aturan Berbagi Adil Bersama Sahabat",
    textbookReference: "Pendidikan Pancasila SD Kelas I Kemendikbudristek Bab 2",
    coreSkills: ["Berbagi makanan secara adil", "Peduli sesama teman"],
    practicumSynthesisHook: "Terapkan sifat pertukaran (a+b = b+a = 10) agar bekal Kira dan Upe sama adil.",
  },
];
// ============================================================================
// BANK 10 SOAL LATIHAN AUDIO-FIRST STAGE (PULAU 4)
// ============================================================================
const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Menggabungkan 2 Kelompok",
    prompt:
      "Kira menggabungkan 3 apel merah di keranjang kiri dan 4 apel hijau di keranjang kanan. Berapa jumlah apel Kira seluruhnya? (3 + 4 = ...)",
    visualType: "merge-baskets",
    paramA: 3,
    paramB: 4,
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation:
      "3 apel ditambah 4 apel menghasilkan 3 + 4 = 7 apel (Tujuh).",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Cerita Bertambah",
    prompt:
      "Ada 4 anak bermain lompat tali di taman. Datang lagi 2 anak ikut bergabung. Berapa jumlah anak semuanya sekarang? (4 + 2 = ...)",
    visualType: "merge-baskets",
    paramA: 4,
    paramB: 2,
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    explanation:
      "Awalnya 4 anak, bertambah 2 anak lagi menjadi 4 + 2 = 6 anak (Enam).",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Strategi Hitung Maju",
    prompt:
      "Katak Malosi berada di batu angka 5, lalu melompat MAJU 3 langkah ke kanan. Di batu angka berapakah Malosi berhenti? (5 + 3 = ...)",
    visualType: "jump-line",
    paramA: 5,
    paramB: 3,
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    explanation:
      "Mulai dari 5, hitung maju 3 langkah: 6, 7, 8. Jadi 5 + 3 = 8.",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Pasangan Bilangan",
    prompt:
      "Perhatikan Pohon Pasangan Bilangan Tora! Jika bagian 6 dan bagian 3 digabungkan (6 + 3), bilangan utuh yang terbentuk adalah...",
    visualType: "number-bond-sum",
    paramA: 6,
    paramB: 3,
    options: ["8", "9", "10", "7"],
    correctAnswer: "9",
    explanation:
      "6 ditambah 3 membentuk bilangan utuh 9 (Sembilan).",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Penjumlahan Jadi 10",
    prompt:
      "Kira menyusun 7 keping merah dan 3 keping biru ke dalam Bingkai 10. Berapa jumlah seluruh keping Kira sekarang? (7 + 3 = ...)",
    visualType: "ten-frame-pair",
    paramA: 7,
    paramB: 3,
    options: ["8", "9", "10", "7"],
    correctAnswer: "10",
    explanation:
      "7 keping merah ditambah 3 keping biru memenuhi seluruh Bingkai 10: 7 + 3 = 10.",
  },
  {
    id: 6,
    storyCharacter: "Upe",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Pasangan Penggenap 10",
    prompt:
      "Bingkai 10 milik Upe sudah berisi 6 keping merah. Berapa keping biru lagi yang harus ditambahkan agar penuh menjadi 10? (6 + ... = 10)",
    visualType: "ten-frame-pair",
    paramA: 6,
    paramB: 4,
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    explanation:
      "Masih ada 4 petak yang perlu diisi biru agar genap 10, karena 6 + 4 = 10.",
  },
  {
    id: 7,
    storyCharacter: "Tora",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Penjumlahan Bilangan Nol",
    prompt:
      "Tora memegang piring berisi 8 donat coklat, sedangkan piring di sebelahnya kosong (0 donat). Berapakah hasil dari 8 + 0?",
    visualType: "merge-baskets",
    paramA: 8,
    paramB: 0,
    options: ["0", "7", "8", "9"],
    correctAnswer: "8",
    explanation:
      "Bilangan berapa pun jika ditambah 0 hasilnya tetap bilangan itu sendiri: 8 + 0 = 8.",
  },
  {
    id: 8,
    storyCharacter: "Malosi",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Sifat Pertukaran Domino",
    prompt:
      "Malosi memutar kartu domino penjumlahan. Jika 2 + 5 = 7, maka hasil dari 5 + 2 adalah...",
    visualType: "domino-flip",
    paramA: 2,
    paramB: 5,
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation:
      "Walaupun urutan angkanya ditukar (2 + 5 menjadi 5 + 2), hasilnya tetap sama yaitu 7.",
  },
  {
    id: 9,
    storyCharacter: "Kira",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Pasangan Kembar 10",
    prompt:
      "Ibu memberi Kira 5 pensil warna pagi ini, lalu Ayah memberi lagi 5 pensil warna sore ini. Berapa jumlah pensil warna Kira seluruhnya?",
    visualType: "ten-frame-pair",
    paramA: 5,
    paramB: 5,
    options: ["8", "9", "10", "6"],
    correctAnswer: "10",
    explanation:
      "5 pensil ditambah 5 pensil memenuhi 2 baris Bingkai 10: 5 + 5 = 10.",
  },
  {
    id: 10,
    storyCharacter: "Upe",
    themeGradient: "bg-[#FF7A00]",
    badgeTitle: "Kalimat Senilai",
    prompt:
      "Manakah pasangan penjumlahan di bawah ini yang memiliki hasil SAMA DENGAN 4 + 5?",
    visualType: "domino-flip",
    paramA: 4,
    paramB: 5,
    options: ["6 + 3", "3 + 4", "5 + 2", "2 + 4"],
    correctAnswer: "6 + 3",
    explanation:
      "Hasil dari 4 + 5 adalah 9. Pilihan 6 + 3 juga menghasilkan 9.",
  },
];
// ============================================================================
// GENERATOR ACAK 10 SOAL UJIAN ANTI-CONTEK (PULAU 5)
// ============================================================================
function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
function generateNumericOptions(correct: number, minVal = 0, maxVal = 10): string[] {
  const unique = new Set<number>([correct]);
  const pool: number[] = [];
  for (let v = minVal; v <= maxVal; v += 1) {
    if (v !== correct) pool.push(v);
  }
  const shuffledPool = shuffleArray(pool);
  for (const item of shuffledPool) {
    if (unique.size < 4) unique.add(item);
  }
  return shuffleArray(Array.from(unique).map(String));
}
function generateDynamicExamQuestions(): ExamQuestion[] {
  const q1A = Math.floor(Math.random() * 4) + 2; // 2..5
  const q1B = Math.floor(Math.random() * 3) + 2; // 2..4
  const q1Sum = q1A + q1B;
  const q2A = Math.floor(Math.random() * 4) + 3; // 3..6
  const q2B = Math.floor(Math.random() * 3) + 2; // 2..4
  const q2Sum = q2A + q2B;
  const q3Start = Math.floor(Math.random() * 4) + 3; // 3..6
  const q3Jump = Math.floor(Math.random() * 3) + 2;  // 2..4
  const q3Sum = q3Start + q3Jump;
  const q4A = Math.floor(Math.random() * 5) + 2; // 2..6
  const q4B = Math.floor(Math.random() * 3) + 2; // 2..4
  const q4Sum = q4A + q4B;
  const q5A = Math.floor(Math.random() * 4) + 4; // 4..7
  const q5B = Math.floor(Math.random() * 3) + 1; // 1..3
  const q5Sum = q5A + q5B;
  const q6Known = Math.floor(Math.random() * 7) + 2; // 2..8
  const q6Missing = 10 - q6Known;
  const q7Num = Math.floor(Math.random() * 6) + 4; // 4..9
  const q7ZeroFirst = Math.random() > 0.5;
  const q8A = Math.floor(Math.random() * 4) + 2; // 2..5
  const q8B = Math.floor(Math.random() * 3) + 3; // 3..5
  const q8Sum = q8A + q8B;
  const q9A = Math.floor(Math.random() * 4) + 3; // 3..6
  const q9Missing = Math.floor(Math.random() * 3) + 2; // 2..4
  const q9Total = q9A + q9Missing;
  const q10A = Math.floor(Math.random() * 5) + 3; // 3..7
  const q10B = 10 - q10A;
  return [
    {
      id: 1,
      questionText: `Kira menggabungkan ${q1A} apel merah dan ${q1B} apel hijau. Berapa jumlah apel Kira seluruhnya? (${q1A} + ${q1B} = ...)`,
      visualType: "merge-baskets",
      paramA: q1A,
      paramB: q1B,
      options: generateNumericOptions(q1Sum, 3, 10),
      correctAnswer: String(q1Sum),
      explanation: `Menggabungkan ${q1A} dan ${q1B} menghasilkan ${q1A} + ${q1B} = ${q1Sum}.`,
    },
    {
      id: 2,
      questionText: `Di dahan pohon ada ${q2A} burung pipit, lalu datang lagi ${q2B} burung pipit. Berapa banyak burung pipit sekarang?`,
      visualType: "merge-baskets",
      paramA: q2A,
      paramB: q2B,
      options: generateNumericOptions(q2Sum, 4, 10),
      correctAnswer: String(q2Sum),
      explanation: `${q2A} burung bertambah ${q2B} burung menjadi ${q2A} + ${q2B} = ${q2Sum}.`,
    },
    {
      id: 3,
      questionText: `Malosi berdiri di batu nomor ${q3Start}, lalu melompat maju ${q3Jump} langkah ke kanan. Di batu nomor berapakah Malosi mendarat?`,
      visualType: "jump-line",
      paramA: q3Start,
      paramB: q3Jump,
      options: generateNumericOptions(q3Sum, 3, 10),
      correctAnswer: String(q3Sum),
      explanation: `Menghitung maju ${q3Jump} langkah dari ${q3Start} menghasilkan ${q3Start} + ${q3Jump} = ${q3Sum}.`,
    },
    {
      id: 4,
      questionText: `Perhatikan Pasangan Bilangan Upe! Jika ${q4A} dan ${q4B} digabungkan, bilangan utuh yang terbentuk adalah...`,
      visualType: "number-bond-sum",
      paramA: q4A,
      paramB: q4B,
      options: generateNumericOptions(q4Sum, 3, 10),
      correctAnswer: String(q4Sum),
      explanation: `${q4A} ditambah ${q4B} sama dengan ${q4Sum}.`,
    },
    {
      id: 5,
      questionText: `Tora meletakkan ${q5A} keping merah dan ${q5B} keping biru pada Bingkai 10. Berapakah hasil ${q5A} + ${q5B}?`,
      visualType: "ten-frame-pair",
      paramA: q5A,
      paramB: q5B,
      options: generateNumericOptions(q5Sum, 4, 10),
      correctAnswer: String(q5Sum),
      explanation: `Jumlah petak yang terisi adalah ${q5A} + ${q5B} = ${q5Sum}.`,
    },
    {
      id: 6,
      questionText: `Agar Bingkai 10 penuh berjumlah 10, maka ${q6Known} keping merah harus ditambah dengan ... keping biru. (${q6Known} + ... = 10)`,
      visualType: "ten-frame-pair",
      paramA: q6Known,
      paramB: q6Missing,
      options: generateNumericOptions(q6Missing, 1, 9),
      correctAnswer: String(q6Missing),
      explanation: `Pasangan penggenap 10 dari ${q6Known} adalah ${q6Missing} (${q6Known} + ${q6Missing} = 10).`,
    },
    {
      id: 7,
      questionText: q7ZeroFirst
        ? `Wadah kiri kosong (0 buah) dan wadah kanan berisi ${q7Num} buah jeruk. Berapakah hasil dari 0 + ${q7Num}?`
        : `Kira memiliki ${q7Num} stiker bintang di kotak pertama dan 0 stiker di kotak kedua. Berapakah hasil dari ${q7Num} + 0?`,
      visualType: "merge-baskets",
      paramA: q7ZeroFirst ? 0 : q7Num,
      paramB: q7ZeroFirst ? q7Num : 0,
      options: generateNumericOptions(q7Num, 0, 10),
      correctAnswer: String(q7Num),
      explanation: `Bilangan apa pun yang dijumlahkan dengan 0 hasilnya tetap bilangan itu sendiri (${q7Num}).`,
    },
    {
      id: 8,
      questionText: `Karena ${q8A} + ${q8B} = ${q8Sum}, maka jika kartu domino diputar menjadi ${q8B} + ${q8A} hasilnya adalah...`,
      visualType: "domino-flip",
      paramA: q8A,
      paramB: q8B,
      options: generateNumericOptions(q8Sum, 4, 10),
      correctAnswer: String(q8Sum),
      explanation: `Menurut sifat pertukaran, ${q8A} + ${q8B} sama hasilnya dengan ${q8B} + ${q8A} = ${q8Sum}.`,
    },
    {
      id: 9,
      questionText: `Upe ingin mengumpulkan ${q9Total} kelereng. Saat ini Upe baru punya ${q9A} kelereng. Berapa kelereng lagi yang harus ditambahkan? (${q9A} + ... = ${q9Total})`,
      visualType: "number-bond-sum",
      paramA: q9A,
      paramB: q9Missing,
      options: generateNumericOptions(q9Missing, 1, 8),
      correctAnswer: String(q9Missing),
      explanation: `Karena ${q9A} + ${q9Missing} = ${q9Total}, maka Upe memerlukan ${q9Missing} kelereng lagi.`,
    },
    {
      id: 10,
      questionText: `Malosi menyusun ${q10A} balok merah dan ${q10B} balok biru hingga pas memenuhi Bingkai 10. Berapa jumlah balok seluruhnya?`,
      visualType: "ten-frame-pair",
      paramA: q10A,
      paramB: q10B,
      options: generateNumericOptions(10, 6, 10),
      correctAnswer: "10",
      explanation: `Pasangan ${q10A} dan ${q10B} menggenapkan Bingkai 10 menjadi ${q10A} + ${q10B} = 10.`,
    },
  ];
}
// ============================================================================
// KOMPONEN UTAMA FORMULA HIBRIDA 4-TEMPLATE (MATEMATIKA KELAS 1 BAB 2)
// ============================================================================
export default function MatematikaKelas1Bab2Hibrida({
  studentId = "SISWA-K1-HIBRIDA",
  studentName = "Sahabat Cilik IGIL",
  completedOtherChapters = DEFAULT_CROSS_CHAPTERS,
  onChapterComplete,
}: IGILModuleProps) {
  // Navigasi 6 Pulau Petualangan (SplashLearn Island Map Style)
  const [activeCard, setActiveCard] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [card2Unlocked, setCard2Unlocked] = useState<boolean>(false);
  const [card5Unlocked, setCard5Unlocked] = useState<boolean>(false);
  const [card6Unlocked, setCard6Unlocked] = useState<boolean>(false);
  // Tokenomics Floating (Tanpa Konversi Rupiah: 30 + 70 + 50 = 150 Token IGIL)
  const [practiceTokens, setPracticeTokens] = useState<number>(0);
  const [examTokens, setExamTokens] = useState<number>(0);
  const [practicumTokens, setPracticumTokens] = useState<number>(0);
  const totalTokens = practiceTokens + examTokens + practicumTokens;
  // HUD Gamifikasi & Pemandu Audio-First
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [activeCompanion, setActiveCompanion] = useState<"Kira" | "Upe" | "Malosi" | "Tora">(
    "Kira"
  );
  const [mascotSpeech, setMascotSpeech] = useState<string>(
    "Sentuh 3 burung merah dan 2 burung biru agar berkumpul di dahan pohon (3 + 2 = 5)!"
  );
  // Pulau 1: Brain Hook Tap-to-Merge (3 Burung Merah + 2 Burung Biru = 5)
  const [hookRedBirds, setHookRedBirds] = useState<number[]>([]);
  const [hookBlueBirds, setHookBlueBirds] = useState<number[]>([]);
  // Pulau 2: 7 Stasiun Kegiatan Motorik Penjumlahan
  const [motoricStation, setMotoricStation] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [st1LeftApples, setSt1LeftApples] = useState<number>(3);
  const [st1RightApples, setSt1RightApples] = useState<number>(4);
  const [st2SelectedSum, setSt2SelectedSum] = useState<number | null>(null);
  const [st2MatchedSums, setSt2MatchedSums] = useState<number[]>([]);
  const [st4StartStone, setSt4StartStone] = useState<number>(4);
  const [st4JumpCount, setSt4JumpCount] = useState<number>(3);
  const [st5BaseTenRed, setSt5BaseTenRed] = useState<number>(6);
  const [st5AddedBlue, setSt5AddedBlue] = useState<number>(2);
  const [st6DominoA, setSt6DominoA] = useState<number>(3);
  const [st6DominoB, setSt6DominoB] = useState<number>(5);
  const [st6Flipped, setSt6Flipped] = useState<boolean>(false);
  const [st7PlateCakeCount, setSt7PlateCakeCount] = useState<number>(7);
  // Pulau 3: Polypad 3-Panel Digital Toybox & Kanvas 50/50 Anti-Jiplak
  const [toyboxTrayItems, setToyboxTrayItems] = useState<string[]>([
    "🍓",
    "🍓",
    "🍓",
    "🍓",
    "🍌",
    "🍌",
    "🍌",
  ]);
  const [targetSumDigit, setTargetSumDigit] = useState<number>(7);
  const guidedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const freehandCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingGuided, setIsDrawingGuided] = useState<boolean>(false);
  const [isDrawingFreehand, setIsDrawingFreehand] = useState<boolean>(false);
  const [hitWaypoints, setHitWaypoints] = useState<number[]>([]);
  const [freehandPoints, setFreehandPoints] = useState<Waypoint[]>([]);
  const [geometryScore, setGeometryScore] = useState<number | null>(null);
  const [geometryFeedback, setGeometryFeedback] = useState<string>(
    "Tebalkan titik angka hasil penjumlahan di Kanvas Kiri (50%), lalu tulis sendiri di Kanvas Kanan (50%)!"
  );
  // Pulau 4: 10 Soal Latihan Audio-First Stage (+30 Token)
  const [currentPracticeIdx, setCurrentPracticeIdx] = useState<number>(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [claimedPracticeIds, setClaimedPracticeIds] = useState<number[]>([]);
  // Pulau 5: 10 Soal Ujian Anti-Contek Gerbang 1 (+70 Token)
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>(() =>
    generateDynamicExamQuestions()
  );
  const [currentExamIdx, setCurrentExamIdx] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [examAttempts, setExamAttempts] = useState<number>(1);
  const [examStartTime, setExamStartTime] = useState<number>(() => Date.now());
  const [examElapsedDeci, setExamElapsedDeci] = useState<number>(0);
  const [focusLossCount, setFocusLossCount] = useState<number>(0);
  const [dwellTimeWarning, setDwellTimeWarning] = useState<boolean>(false);
  const examTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Pulau 6: Studio Praktikum 2 Kotak Bekal Sehat Lintas-4-Bab (+50 Token & 1.000 Poin)
  const [practicumMode, setPracticumMode] = useState<"single" | "cross4">("cross4");
  const [activeBentoTool, setActiveBentoTool] = useState<BentoCellFruit>("strawberry");
  const [kiraLunchCells, setKiraLunchCells] = useState<BentoCellFruit[]>(() => [
    "strawberry",
    "strawberry",
    "strawberry",
    "strawberry",
    "strawberry",
    "strawberry",
    "banana",
    "banana",
    "banana",
    "banana",
  ]);
  const [upeLunchCells, setUpeLunchCells] = useState<BentoCellFruit[]>(() => [
    "strawberry",
    "strawberry",
    "strawberry",
    "strawberry",
    "banana",
    "banana",
    "banana",
    "banana",
    "banana",
    "banana",
  ]);
  const [studentReportText, setStudentReportText] = useState<string>("");
  const [practicumRubric, setPracticumRubric] = useState<PracticumEvaluationRubric | null>(null);
  const [chapterCompletedFlag, setChapterCompletedFlag] = useState<boolean>(false);
  // ============================================================================
  // WEB AUDIO API SYNTHESIZER (100% CLIENT-SIDE ZERO COST)
  // ============================================================================
  const playSound = useCallback((type: SoundType, pitchStep = 0) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const createOsc = (
        freq: number,
        oscType: OscillatorType,
        start: number,
        duration: number,
        gainVal = 0.12
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(gainVal, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };
      if (type === "click") {
        createOsc(560, "sine", now, 0.05, 0.1);
      } else if (type === "note") {
        const freq = 261.63 * Math.pow(1.059463, pitchStep);
        createOsc(freq, "triangle", now, 0.18, 0.16);
      } else if (type === "pop") {
        createOsc(450, "triangle", now, 0.08, 0.14);
        createOsc(750, "sine", now + 0.04, 0.09, 0.12);
      } else if (type === "laser") {
        createOsc(900, "sawtooth", now, 0.12, 0.08);
        createOsc(450, "sine", now + 0.06, 0.12, 0.1);
      } else if (type === "coin") {
        createOsc(987.77, "sine", now, 0.09, 0.15);
        createOsc(1318.51, "sine", now + 0.09, 0.25, 0.15);
      } else if (type === "wrong") {
        createOsc(220, "sawtooth", now, 0.18, 0.12);
        createOsc(165, "sawtooth", now + 0.15, 0.25, 0.12);
      } else if (type === "fanfare") {
        createOsc(523.25, "triangle", now, 0.12, 0.15);
        createOsc(659.25, "triangle", now + 0.12, 0.12, 0.15);
        createOsc(783.99, "triangle", now + 0.24, 0.12, 0.15);
        createOsc(1046.5, "triangle", now + 0.36, 0.35, 0.18);
      }
    } catch {
      // Abaikan jika browser memblokir autoplay audio
    }
  }, []);
  // ============================================================================
  // WEB SPEECH API LOKAL (SUARA AUDIO-FIRST IGIL)
  // ============================================================================
  const speakIGIL = useCallback((text: string) => {
    setMascotSpeech(text);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.95;
      utterance.pitch = 1.12;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback hening
    }
  }, []);
  // ============================================================================
  // MESIN KANVAS 50/50 ANTI-JIPLAK & PENILAI GEOMETRI LOKAL (RP 0 API)
  // ============================================================================
  const renderGuidedCanvasTemplate = useCallback(
    (digit: number, passedIndices: number[]) => {
      const canvas = guidedCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#FF7A00";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 110);
      ctx.lineTo(220, 110);
      ctx.moveTo(110, 0);
      ctx.lineTo(110, 220);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = `900 155px ${fontAnak.style.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(28, 1, 165, 0.18)";
      ctx.fillText(String(digit), 110, 118);
      const waypoints = DIGIT_WAYPOINTS[digit] || DIGIT_WAYPOINTS[7];
      waypoints.forEach((wp, idx) => {
        const isHit = passedIndices.includes(idx);
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, 13, 0, Math.PI * 2);
        ctx.fillStyle = isHit ? "#1C01A5" : "#FF7A00";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#1C01A5";
        ctx.stroke();
        ctx.font = `bold 11px ${fontAnak.style.fontFamily}`;
        ctx.fillStyle = "#1C01A5";
        ctx.fillText(String(idx + 1), wp.x, wp.y + 1);
      });
    },
    []
  );
  const renderFreehandCanvasBlank = useCallback(() => {
    const canvas = freehandCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 110);
    ctx.lineTo(220, 110);
    ctx.moveTo(110, 0);
    ctx.lineTo(110, 220);
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);
  const resetDualCanvas = useCallback(
    (newDigit: number) => {
      const safeDigit = newDigit % 10;
      setTargetSumDigit(safeDigit);
      setHitWaypoints([]);
      setFreehandPoints([]);
      setGeometryScore(null);
      setGeometryFeedback(
        `Tebalkan titik angka ${safeDigit} (${NUMBER_WORDS[safeDigit]}) di Kanvas Kiri, lalu tulis mandiri di Kanvas Kanan!`
      );
      setTimeout(() => {
        renderGuidedCanvasTemplate(safeDigit, []);
        renderFreehandCanvasBlank();
      }, 20);
    },
    [renderGuidedCanvasTemplate, renderFreehandCanvasBlank]
  );
  useEffect(() => {
    if ((activeCard === 2 && motoricStation === 3) || activeCard === 3) {
      renderGuidedCanvasTemplate(targetSumDigit, hitWaypoints);
      if (freehandPoints.length === 0) {
        renderFreehandCanvasBlank();
      }
    }
  }, [
    activeCard,
    motoricStation,
    targetSumDigit,
    hitWaypoints,
    freehandPoints.length,
    renderGuidedCanvasTemplate,
    renderFreehandCanvasBlank,
  ]);
  const handleGuidedPointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingGuided) return;
    const canvas = guidedCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FF7A00";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    const waypoints = DIGIT_WAYPOINTS[targetSumDigit] || DIGIT_WAYPOINTS[7];
    waypoints.forEach((wp, idx) => {
      const dist = Math.hypot(x - wp.x, y - wp.y);
      if (dist < 24 && !hitWaypoints.includes(idx)) {
        setHitWaypoints((prev) => {
          const next = [...prev, idx];
          playSound("note", next.length * 2);
          return next;
        });
      }
    });
  };
  const handleFreehandPointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingFreehand) return;
    const canvas = freehandCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1C01A5";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    setFreehandPoints((prev) => [...prev, { x, y }]);
  };
  const evaluateDualCanvasGeometry = () => {
    const waypoints = DIGIT_WAYPOINTS[targetSumDigit] || DIGIT_WAYPOINTS[7];
    const guidedRatio = Math.min(1, hitWaypoints.length / waypoints.length);
    if (guidedRatio < 0.6) {
      playSound("wrong");
      setGeometryScore(Math.round(guidedRatio * 50));
      const msg = `Tebalkan dulu titik-titik di Kanvas Kiri (minimal ${Math.ceil(
        waypoints.length * 0.7
      )} titik) sebelum menulis mandiri!`;
      setGeometryFeedback(msg);
      speakIGIL(msg);
      return;
    }
    if (freehandPoints.length < 14) {
      playSound("wrong");
      setGeometryScore(40);
      const msg =
        "Kanvas Kanan (Mandiri) masih kosong. Ayo tulis angkanya sendiri tanpa menjiplak!";
      setGeometryFeedback(msg);
      speakIGIL(msg);
      return;
    }
    const xs = freehandPoints.map((p) => p.x);
    const ys = freehandPoints.map((p) => p.y);
    const widthSpan = Math.max(...xs) - Math.min(...xs);
    const heightSpan = Math.max(...ys) - Math.min(...ys);
    let freehandGeoScore = 0;
    if (heightSpan >= 75) freehandGeoScore += 25;
    if (targetSumDigit === 1 ? widthSpan >= 8 : widthSpan >= 35) freehandGeoScore += 25;
    if (ys.some((y) => y < 105) && ys.some((y) => y > 115)) freehandGeoScore += 10;
    const totalGeo = Math.min(100, Math.round(guidedRatio * 40 + freehandGeoScore));
    setGeometryScore(totalGeo);
    if (totalGeo >= 80) {
      playSound("fanfare");
      const msg = `Luar biasa! Skor Geometri Kanvas 50/50 kamu ${totalGeo}% untuk angka ${targetSumDigit}!`;
      setGeometryFeedback(msg);
      speakIGIL(msg);
    } else {
      playSound("pop");
      const msg = `Skor Geometri kamu ${totalGeo}%. Tulis angka lebih besar dari atas ke bawah di Kanvas Kanan ya!`;
      setGeometryFeedback(msg);
      speakIGIL(msg);
    }
  };
  // ============================================================================
  // SENSOR ANTI-CURANG PULAU 5: STOPWATCH & TAB-SWITCH DETECTOR
  // ============================================================================
  useEffect(() => {
    if (activeCard === 5 && !examSubmitted) {
      examTimerRef.current = setInterval(() => {
        setExamElapsedDeci((prev) => prev + 1);
      }, 100);
    } else if (examTimerRef.current) {
      clearInterval(examTimerRef.current);
      examTimerRef.current = null;
    }
    return () => {
      if (examTimerRef.current) {
        clearInterval(examTimerRef.current);
        examTimerRef.current = null;
      }
    };
  }, [activeCard, examSubmitted]);
  useEffect(() => {
    if (activeCard !== 5 || examSubmitted) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocusLossCount((prev) => prev + 1);
        playSound("wrong");
      }
    };
    const handleWindowBlur = () => {
      setFocusLossCount((prev) => prev + 1);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [activeCard, examSubmitted, playSound]);
  // ============================================================================
  // HANDLER PULAU 1, PULAU 4, PULAU 5, DAN PULAU 6
  // ============================================================================
  const handleTapRedBird = (id: number) => {
    if (hookRedBirds.includes(id)) return;
    const nextRed = [...hookRedBirds, id];
    setHookRedBirds(nextRed);
    const totalNow = nextRed.length + hookBlueBirds.length;
    playSound("note", totalNow * 2);
    speakIGIL(`${nextRed.length} burung merah!`);
    if (nextRed.length === 3 && hookBlueBirds.length === 2) {
      setCard2Unlocked(true);
      setTimeout(() => {
        playSound("fanfare");
        speakIGIL(
          "Hebat! 3 burung merah ditambah 2 burung biru menjadi 5 burung! Kepulauan Game Motorik Pulau 2, 3, dan 4 telah terbuka!"
        );
      }, 400);
    }
  };
  const handleTapBlueBird = (id: number) => {
    if (hookBlueBirds.includes(id)) return;
    const nextBlue = [...hookBlueBirds, id];
    setHookBlueBirds(nextBlue);
    const totalNow = hookRedBirds.length + nextBlue.length;
    playSound("note", totalNow * 2);
    speakIGIL(`${nextBlue.length} burung biru!`);
    if (hookRedBirds.length === 3 && nextBlue.length === 2) {
      setCard2Unlocked(true);
      setTimeout(() => {
        playSound("fanfare");
        speakIGIL(
          "Hebat! 3 burung merah ditambah 2 burung biru menjadi 5 burung! Kepulauan Game Motorik Pulau 2, 3, dan 4 telah terbuka!"
        );
      }, 400);
    }
  };
  const handleSelectPracticeAnswer = (question: PracticeQuestion, selected: string) => {
    const updatedAnswers = { ...practiceAnswers, [question.id]: selected };
    setPracticeAnswers(updatedAnswers);
    setActiveCompanion(question.storyCharacter);
    const isCorrect = selected === question.correctAnswer;
    if (isCorrect) {
      playSound("coin");
      setComboStreak((prev) => prev + 1);
      if (!claimedPracticeIds.includes(question.id)) {
        setClaimedPracticeIds((prev) => [...prev, question.id]);
        setPracticeTokens((prev) => Math.min(30, prev + 3));
      }
      speakIGIL(`Benar sekali! ${question.explanation}`);
    } else {
      playSound("wrong");
      setComboStreak(0);
      speakIGIL(`Coba perhatikan lagi ya. ${question.explanation}`);
    }
    if (Object.keys(updatedAnswers).length === PRACTICE_QUESTIONS.length) {
      setCard5Unlocked(true);
    }
  };
  const handleSelectExamAnswer = (questionId: number, option: string) => {
    if (examSubmitted) return;
    playSound("click");
    setExamAnswers((prev) => ({ ...prev, [questionId]: option }));
  };
  const handleSubmitExam = () => {
    if (Object.keys(examAnswers).length < examQuestions.length) {
      playSound("wrong");
      speakIGIL("Masih ada soal yang belum dijawab. Ayo lengkapi semua 10 soal dulu!");
      return;
    }
    const durationSeconds = Math.max(
      1,
      Math.round((Date.now() - examStartTime) / 1000)
    );
    const isHumanTiming = durationSeconds >= 25;
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const calculatedScore = correctCount * 10;
    setExamScore(calculatedScore);
    setExamSubmitted(true);
    if (!isHumanTiming) {
      setDwellTimeWarning(true);
      playSound("wrong");
      speakIGIL(
        "Pengerjaan ujian terlalu cepat di bawah 25 detik! Sensor Anti-Bot meminta kamu mengulang ujian dengan teliti."
      );
      return;
    }
    setDwellTimeWarning(false);
    if (calculatedScore === 100) {
      setExamTokens(70);
      setCard6Unlocked(true);
      playSound("fanfare");
      speakIGIL(
        "Sempurna 100 dari 100! Kamu lulus Gerbang 1 Si Paling Pintar dan membuka Pulau 6 Studio Praktikum!"
      );
    } else {
      playSound("wrong");
      speakIGIL(
        `Nilai kamu ${calculatedScore}. Ayo klik Ulangi Ujian dengan soal baru sampai meraih 100 sempurna!`
      );
    }
  };
  const handleRetryExam = () => {
    playSound("laser");
    setExamAttempts((prev) => prev + 1);
    setExamQuestions(generateDynamicExamQuestions());
    setExamAnswers({});
    setCurrentExamIdx(0);
    setExamSubmitted(false);
    setExamScore(0);
    setDwellTimeWarning(false);
    setExamStartTime(Date.now());
    setExamElapsedDeci(0);
  };
  // Hitung isi 2 Kotak Bekal di Pulau 6 secara real-time
  const kiraStraw = kiraLunchCells.filter((c) => c === "strawberry").length;
  const kiraBan = kiraLunchCells.filter((c) => c === "banana").length;
  const kiraTotal = kiraStraw + kiraBan;
  const upeStraw = upeLunchCells.filter((c) => c === "strawberry").length;
  const upeBan = upeLunchCells.filter((c) => c === "banana").length;
  const upeTotal = upeStraw + upeBan;
  const isCommutativeBoxes =
    kiraTotal === 10 &&
    upeTotal === 10 &&
    kiraStraw === upeBan &&
    kiraBan === upeStraw &&
    kiraStraw > 0 &&
    kiraBan > 0;
  const fillGuidedReportTemplate = () => {
    playSound("pop");
    const template = `Saya bersama Kira, Upe, Malosi, dan Tora menyusun 2 Kotak Bekal Sehat Berjumlah 10. Pada Kotak Bekal Kira (IPAS), saya menggabungkan ${kiraStraw} stroberi dan ${kiraBan} pisang sehingga kalimat penjumlahannya ${kiraStraw} + ${kiraBan} = ${kiraTotal}. Pada Kotak Bekal Upe (Pancasila), saya menerapkan sifat pertukaran penjumlahan ${upeStraw} + ${upeBan} = ${upeTotal} agar kedua sahabat mendapat porsi genap 10 yang adil.`;
    setStudentReportText(template);
  };
  const handleEvaluatePracticum = () => {
    const reportWords = studentReportText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    if (reportWords < 8) {
      playSound("wrong");
      speakIGIL(
        "Klik tombol Bantu Susun Kalimat Laporan atau tulis minimal 8 kata penjelasan ilmiah terlebih dahulu ya!"
      );
      return;
    }
    let accuracyScore = 110;
    if (kiraTotal === 10) accuracyScore += 80;
    if (upeTotal === 10) accuracyScore += 70;
    if (isCommutativeBoxes) accuracyScore += 40;
    accuracyScore = Math.min(300, accuracyScore);
    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const lowerReport = studentReportText.toLowerCase();
    if (lowerReport.includes("stroberi") || lowerReport.includes("pisang")) synthesisScore += 30;
    if (lowerReport.includes("pertukaran") || lowerReport.includes("adil")) synthesisScore += 30;
    if (lowerReport.includes("+") || lowerReport.includes("10")) synthesisScore += 30;
    synthesisScore = Math.min(250, synthesisScore);
    let optimizationVisualScore = 100;
    if (kiraTotal === 10 && upeTotal === 10) optimizationVisualScore += 50;
    if (isCommutativeBoxes) optimizationVisualScore += 50;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);
    let reasoningReportScore = Math.min(180, reportWords * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (lowerReport.includes("sehingga") || lowerReport.includes("agar")) {
      reasoningReportScore += 30;
    }
    reasoningReportScore = Math.min(250, reasoningReportScore);
    const totalQualityScore =
      accuracyScore + synthesisScore + optimizationVisualScore + reasoningReportScore;
    const rubricResult: PracticumEvaluationRubric = {
      accuracyScore,
      synthesisScore,
      optimizationVisualScore,
      reasoningReportScore,
      totalQualityScore,
      aiFeedbackSummary:
        totalQualityScore >= 850
          ? "Karya Praktikum Koki Cilik Istimewa (Kandidat Juara Beasiswa IGIL)! Kedua kotak bekal berjumlah tepat 10 dan membuktikan sifat pertukaran penjumlahan (a + b = b + a) secara visual dan ilmiah!"
          : "Kotak Bekal sudah bagus! Untuk meraih 1.000 poin sempurna, pastikan Kotak Kira dan Kotak Upe masing-masing penuh 10 buah dengan porsi saling bertukar (misalnya 6+4 dan 4+6).",
    };
    setPracticumRubric(rubricResult);
    setPracticumTokens(50);
    setChapterCompletedFlag(true);
    playSound("fanfare");
    speakIGIL(
      `Luar biasa ${studentName}! Praktikum penjumlahanmu meraih skor kualitas ${totalQualityScore} dari 1000 poin dan kamu mengantongi 150 Token IGIL penuh!`
    );
    const payload: ChapterCompletionPayload = {
      chapterId: CHAPTER_COMPETENCY_METADATA.chapterId,
      studentId,
      practiceTokensEarned: 30,
      examTokensEarned: 70,
      practicumTokensEarned: 50,
      totalChapterTokens: 150,
      examScore: 100,
      practicumRubric: rubricResult,
      telemetry: {
        attemptCount: examAttempts,
        examDurationSeconds: Math.max(25, Math.round(examElapsedDeci / 10)),
        tabSwitchCount: focusLossCount,
        isHumanTimingValid: true,
        completedAtISO: new Date().toISOString(),
      },
    };
    onChapterComplete?.(payload);
  };
  // ============================================================================
  // RENDERER VISUAL SOAL DINAMIS BERWARNA CERAH (PULAU 4 & PULAU 5)
  // ============================================================================
  const renderAdditionVisualSVG = (
    type: AdditionVisualMode,
    paramA: number,
    paramB: number
  ) => {
    if (type === "ten-frame-pair") {
      const safeRed = Math.max(0, Math.min(10, paramA));
      const safeBlue = Math.max(0, Math.min(10 - safeRed, paramB));
      return (
        <svg viewBox="0 0 380 155" className="w-full max-w-lg mx-auto">
          <rect
            x="10"
            y="10"
            width="360"
            height="135"
            rx="18"
            fill="#FFFFFF"
            stroke="#1C01A5"
            strokeWidth="4"
          />
          {Array.from({ length: 10 }).map((_, idx) => {
            const col = idx % 5;
            const row = Math.floor(idx / 5);
            const x = 15 + col * 70;
            const y = 15 + row * 62;
            const isRed = idx < safeRed;
            const isBlue = !isRed && idx < safeRed + safeBlue;
            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={y}
                  width="66"
                  height="58"
                  rx="10"
                  fill={isRed ? "#FF7A00" : isBlue ? "#1C01A5" : "#FFFFFF"}
                  stroke="#1C01A5"
                  strokeWidth="2"
                />
                {isRed && (
                  <circle cx={x + 33} cy={y + 29} r="17" fill="#FF7A00" stroke="#FF7A00" strokeWidth="2" />
                )}
                {isBlue && (
                  <circle cx={x + 33} cy={y + 29} r="17" fill="#1C01A5" stroke="#1C01A5" strokeWidth="2" />
                )}
              </g>
            );
          })}
        </svg>
      );
    }
    if (type === "merge-baskets") {
      return (
        <svg viewBox="0 0 400 135" className="w-full max-w-lg mx-auto">
          <rect x="10" y="15" width="150" height="105" rx="16" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="3" />
          <text x="85" y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C01A5">
            Kelompok Kiri ({paramA})
          </text>
          {Array.from({ length: paramA }).map((_, i) => (
            <circle
              key={i}
              cx={38 + (i % 4) * 32}
              cy={62 + Math.floor(i / 4) * 30}
              r="11"
              fill="#FF7A00"
            />
          ))}
          <text x="200" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill="#1C01A5">
            +
          </text>
          <rect x="240" y="15" width="150" height="105" rx="16" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
          <text x="315" y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C01A5">
            Kelompok Kanan ({paramB})
          </text>
          {Array.from({ length: paramB }).map((_, i) => (
            <circle
              key={i}
              cx={268 + (i % 4) * 32}
              cy={62 + Math.floor(i / 4) * 30}
              r="11"
              fill="#1C01A5"
            />
          ))}
        </svg>
      );
    }
    if (type === "jump-line") {
      const target = Math.min(10, paramA + paramB);
      return (
        <svg viewBox="0 0 400 125" className="w-full max-w-lg mx-auto">
          <rect x="6" y="6" width="388" height="113" rx="16" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="2.5" />
          <line x1="24" y1="88" x2="376" y2="88" stroke="#1C01A5" strokeWidth="4" />
          {Array.from({ length: 11 }).map((_, idx) => {
            const x = 26 + idx * 34.5;
            const isStart = idx === paramA;
            const isEnd = idx === target;
            return (
              <g key={idx}>
                <circle
                  cx={x}
                  cy="88"
                  r={isStart || isEnd ? 11 : 7}
                  fill={isStart ? "#FF7A00" : isEnd ? "#1C01A5" : "#FFFFFF"}
                  stroke="#1C01A5"
                  strokeWidth="2"
                />
                <text x={x} y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C01A5">
                  {idx}
                </text>
              </g>
            );
          })}
          {Array.from({ length: paramB }).map((_, sIdx) => {
            const fromX = 26 + (paramA + sIdx) * 34.5;
            const toX = 26 + (paramA + sIdx + 1) * 34.5;
            return (
              <path
                key={sIdx}
                d={`M ${fromX} 78 Q ${(fromX + toX) / 2} 32 ${toX} 78`}
                fill="none"
                stroke="#1C01A5"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
            );
          })}
          <text x="200" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C01A5">
            Mulai di Batu {paramA}, Lompat Maju +{paramB} Langkah
          </text>
        </svg>
      );
    }
    if (type === "domino-flip") {
      return (
        <svg viewBox="0 0 360 130" className="w-full max-w-md mx-auto">
          <rect x="20" y="20" width="130" height="80" rx="12" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="3" />
          <line x1="85" y1="20" x2="85" y2="100" stroke="#FF7A00" strokeWidth="3" />
          <text x="52" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1C01A5">
            {paramA}
          </text>
          <text x="118" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1C01A5">
            {paramB}
          </text>
          <text x="180" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1C01A5">
            ⇄
          </text>
          <rect x="210" y="20" width="130" height="80" rx="12" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
          <line x1="275" y1="20" x2="275" y2="100" stroke="#1C01A5" strokeWidth="3" />
          <text x="242" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1C01A5">
            {paramB}
          </text>
          <text x="308" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1C01A5">
            {paramA}
          </text>
        </svg>
      );
    }
    // Default: number-bond-sum
    return (
      <svg viewBox="0 0 340 145" className="w-full max-w-md mx-auto">
        <rect x="8" y="8" width="324" height="129" rx="16" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
        <line x1="105" y1="42" x2="215" y2="72" stroke="#1C01A5" strokeWidth="5" />
        <line x1="105" y1="104" x2="215" y2="72" stroke="#1C01A5" strokeWidth="5" />
        <circle cx="105" cy="42" r="24" fill="#FF7A00" stroke="#1C01A5" strokeWidth="3" />
        <text x="105" y="50" textAnchor="middle" fontSize="19" fontWeight="900" fill="#1C01A5">
          {paramA}
        </text>
        <circle cx="105" cy="104" r="24" fill="#1C01A5" stroke="#1C01A5" strokeWidth="3" />
        <text x="105" y="112" textAnchor="middle" fontSize="19" fontWeight="900" fill="#1C01A5">
          {paramB}
        </text>
        <circle cx="220" cy="72" r="28" fill="#FF7A00" stroke="#FF7A00" strokeWidth="4" />
        <text x="220" y="80" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1C01A5">
          ?
        </text>
      </svg>
    );
  };
  const formatStopwatch = (deci: number) => {
    const totalSeconds = Math.floor(deci / 10);
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    const d = deci % 10;
    return `${mins}:${secs}.${d}`;
  };
  // ============================================================================
  // RENDER UTAMA FORMULA HIBRIDA 4-TEMPLATE (MAX-W-[1440PX])
  // ============================================================================
  return (
    <div className={`min-h-screen bg-[#FFFFFF] text-[#1C01A5] p-3 lg:p-6 select-none ${fontAnak.className}`}>
      <div className="max-w-[1440px] mx-auto space-y-4">
        {/* ================================================================= */}
        {/* TEMPLATE 1 + 4 HUD: FLOATING CLOUD HEADER & BENTO TOKEN WALLET    */}
        {/* ================================================================= */}
        <header className="bg-[#FFFFFF] backdrop-blur rounded-[32px] p-4 shadow-xl border-b-8 border-[#16017a] flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-3xl bg-[#FF7A00] p-1 shadow-md shrink-0">
              <div className="w-16 h-16 bg-[#1C01A5] rounded-[20px] flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-14 h-14">
                  <ellipse cx="40" cy="46" rx="24" ry="26" fill="#FF7A00" />
                  <ellipse cx="40" cy="50" rx="16" ry="18" fill="#FFFFFF" />
                  <circle cx="30" cy="34" r="10" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="2.5" />
                  <circle cx="50" cy="34" r="10" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="2.5" />
                  <circle cx="30" cy="34" r="5" fill="#1C01A5" />
                  <circle cx="50" cy="34" r="5" fill="#1C01A5" />
                  <polygon points="40,38 35,46 45,46" fill="#FF7A00" />
                  <polygon points="40,6 20,16 40,22 60,16" fill="#1C01A5" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#1C01A5] text-white text-xs font-black px-3 py-0.5 rounded-full">
                  KELAS 1 SD • BAB 2 • FORMULA HIBRIDA 4-TEMPLATE
                </span>
                <span className="bg-[#FFFFFF] text-[#1C01A5] text-xs font-black px-3 py-0.5 rounded-full border border-[#FF7A00]">
                  🏝️ SPLASH MAP + 🧰 POLYPAD TOYBOX + ✍️ KANVAS 50/50 + 🔊 KHAN STAGE
                </span>
                {comboStreak > 0 && (
                  <span className="bg-[#FF7A00] text-[#1C01A5] text-xs font-black px-3 py-0.5 rounded-full animate-bounce">
                    🔥 STREAK {comboStreak}x!
                  </span>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-black text-[#1C01A5] mt-1">
                {CHAPTER_COMPETENCY_METADATA.chapterTitle}
              </h1>
              <p className="text-xs text-[#1C01A5]">
                {CHAPTER_COMPETENCY_METADATA.textbookReference}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#FF7A00] text-[#1C01A5] px-4 py-2.5 rounded-2xl border-b-4 border-[#1C01A5]">
              <div className="text-[10px] font-black uppercase">Tiket Kualifikasi Bab</div>
              <div className="text-xl font-black">
                🪙 {totalTokens} <span className="text-xs">/ 150 Token IGIL</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => speakIGIL(mascotSpeech)}
              className="bg-[#1C01A5] text-white font-black px-4 py-3 rounded-2xl border-b-4 border-[#16017a] active:border-b-0 active:translate-y-0.5 text-xs flex items-center gap-1.5 shadow hover:opacity-90"
            >
              🔊 Suara IGIL
            </button>
          </div>
        </header>
        {/* ================================================================= */}
        {/* SPLASHLEARN STYLE 6 ISLAND NAVIGATION BAR                         */}
        {/* ================================================================= */}
        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            {
              id: 1 as const,
              island: "Pulau 1: Pohon Pipit",
              role: "Peta & Brain Hook",
              icon: "🏝️",
              unlocked: true,
            },
            {
              id: 2 as const,
              island: "Pulau 2: 7 Motorik",
              role: "0% Soal Ujian",
              icon: "🎡",
              unlocked: card2Unlocked,
            },
            {
              id: 3 as const,
              island: "Pulau 3: Toybox 50/50",
              role: "Polypad & Kanvas",
              icon: "🧰",
              unlocked: card2Unlocked,
            },
            {
              id: 4 as const,
              island: "Pulau 4: Panggung Suara",
              role: "Latihan (+30 Token)",
              icon: "🎯",
              unlocked: card2Unlocked,
            },
            {
              id: 5 as const,
              island: "Pulau 5: Benteng Ujian",
              role: "Gerbang 1 (+70 Token)",
              icon: "🏰",
              unlocked: card5Unlocked,
            },
            {
              id: 6 as const,
              island: "Pulau 6: Dapur Koki",
              role: "Praktikum (+50 & 1000)",
              icon: "🍱",
              unlocked: card6Unlocked,
            },
          ].map((isl) => {
            const isActive = activeCard === isl.id;
            return (
              <button
                key={isl.id}
                type="button"
                disabled={!isl.unlocked}
                onClick={() => {
                  playSound("click");
                  setActiveCard(isl.id);
                }}
                className={`p-3 rounded-3xl border-b-8 transition-all text-left flex items-center gap-2.5 ${
                  !isl.unlocked
                    ? "bg-[#FFFFFF] text-[#1C01A5]/40 border-[#1C01A5]/30 cursor-not-allowed"
                    : isActive
                    ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00] scale-105 shadow-xl"
                    : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5] active:border-b-0 active:translate-y-1 hover:opacity-90"
                }`}
              >
                <span className="text-2xl">{isl.unlocked ? isl.icon : "🔒"}</span>
                <div className="min-w-0">
                  <div className="font-black text-xs truncate">{isl.island}</div>
                  <div
                    className={`text-[10px] font-bold truncate ${
                      isActive ? "text-[#1C01A5]" : "text-[#1C01A5]"
                    }`}
                  >
                    {isl.role}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
        {/* ================================================================= */}
        {/* WORKSPACE UTAMA 12 KOLOM                                          */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <main className="lg:col-span-8 space-y-4">
            {/* ------------------------------------------------------------- */}
            {/* PULAU 1 (KARTU 1): SPLASHLEARN ISLAND MAP & BRAIN HOOK 3+2=5   */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 1 && (
              <section className="bg-[#FFFFFF] rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#1C01A5] space-y-5">
                <div className="bg-[#FF7A00] text-[#1C01A5] p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="bg-[#FFFFFF] text-[#1C01A5] text-xs font-black px-3 py-1 rounded-full">
                      🏝️ PULAU 1 • BUKU KEMENDIKBUDRISTEK HALAMAN 33–60
                    </span>
                    <h2 className="text-xl md:text-2xl font-black mt-2">
                      Kepulauan Penjumlahan: Menggabungkan &amp; Menambah Benda
                    </h2>
                    <p className="text-xs text-[#1C01A5] mt-1">
                      Bantu Kira, Upe, Malosi, dan Tora menaklukkan 6 Pulau Penjumlahan sampai dengan 10!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      speakIGIL(
                        "Selamat datang di Kepulauan Penjumlahan! Sentuh 3 burung merah dan 2 burung biru di bawah agar berkumpul di dahan pohon!"
                      )
                    }
                    className="bg-[#FFFFFF] text-[#1C01A5] font-black px-4 py-2.5 rounded-2xl border-b-4 border-[#1C01A5] text-xs shrink-0"
                  >
                    🔊 Dengarkan Misi Pulau 1
                  </button>
                </div>
                {/* Brain Hook Motorik: Tap-to-Merge 3 Burung Merah + 2 Burung Biru = 5 */}
                <div className="bg-[#1C01A5] text-white rounded-3xl p-5 border-b-8 border-[#16017a] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="bg-[#FF7A00] text-[#1C01A5] text-xs font-black px-3 py-0.5 rounded-full">
                        ✨ BRAIN HOOK MOTORIK (TAP-TO-MERGE: 3 + 2 = 5)
                      </span>
                      <h3 className="text-lg font-black mt-1">
                        Sentuh 3 Burung Merah &amp; 2 Burung Biru Agar Berkumpul di Dahan!
                      </h3>
                    </div>
                    <div className="bg-[#FFFFFF] px-4 py-2 rounded-2xl text-center">
                      <div className="text-[10px] text-[#1C01A5] font-bold">Kalimat Penjumlahan</div>
                      <div className="text-2xl font-black text-[#1C01A5]">
                        {hookRedBirds.length} + {hookBlueBirds.length} ={" "}
                        {hookRedBirds.length + hookBlueBirds.length}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Kelompok 3 Burung Merah */}
                    <div className="bg-[#1C01A5] p-4 rounded-2xl border border-[#1C01A5]/40 space-y-2">
                      <div className="text-xs font-black text-[#FF7A00]">
                        Kelompok Kiri: Sentuh 3 Burung Merah ({hookRedBirds.length}/3)
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((id) => {
                          const joined = hookRedBirds.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => handleTapRedBird(id)}
                              className={`h-20 rounded-2xl border-b-4 font-black flex flex-col items-center justify-center transition-all ${
                                joined
                                  ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00] scale-105"
                                  : "bg-[#FFFFFF] text-[#1C01A5] border-[#FF7A00] animate-pulse"
                              }`}
                            >
                              <span className="text-2xl">🐦</span>
                              <span className="text-xs">
                                {joined ? `Merah #${id}` : "Sentuh!"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Kelompok 2 Burung Biru */}
                    <div className="bg-[#1C01A5] p-4 rounded-2xl border border-[#1C01A5]/40 space-y-2">
                      <div className="text-xs font-black text-[#FF7A00]">
                        Kelompok Kanan: Sentuh 2 Burung Biru ({hookBlueBirds.length}/2)
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((id) => {
                          const joined = hookBlueBirds.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => handleTapBlueBird(id)}
                              className={`h-20 rounded-2xl border-b-4 font-black flex flex-col items-center justify-center transition-all ${
                                joined
                                  ? "bg-[#1C01A5] text-white border-[#1C01A5] scale-105"
                                  : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5] animate-pulse"
                              }`}
                            >
                              <span className="text-2xl">🐦</span>
                              <span className="text-xs">
                                {joined ? `Biru #${id}` : "Sentuh!"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {card2Unlocked && (
                    <div className="bg-[#1C01A5] border-2 border-[#1C01A5] rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs md:text-sm font-black text-[#1C01A5]">
                        🎉 3 Burung Merah + 2 Burung Biru = 5 Burung! Pulau 2, 3, dan 4 sekarang terbuka!
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          playSound("fanfare");
                          setActiveCard(2);
                        }}
                        className="bg-[#FF7A00] text-[#1C01A5] font-black px-4 py-2 rounded-xl border-b-4 border-[#1C01A5] text-xs shrink-0"
                      >
                        Berlayar ke Pulau 2 (7 Motorik) ➡️
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
            {/* ------------------------------------------------------------- */}
            {/* PULAU 2 (KARTU 2): 7 STASIUN MOTORIK PENJUMLAHAN (0% UJIAN)    */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 2 && (
              <section className="bg-[#FFFFFF] rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#FF7A00] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="bg-[#FF7A00] text-[#1C01A5] text-xs font-black px-3 py-0.5 rounded-full">
                      🎡 PULAU 2 • 7 STASIUN MOTORIK SENTUHAN JARI (0% SOAL UJIAN)
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-[#1C01A5] mt-1">
                      Eksplorasi 7 Mekanika Penjumlahan Bersama Kira, Upe, Malosi &amp; Tora
                    </h2>
                  </div>
                </div>
                {/* Bar Pemilih 7 Stasiun Motorik */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
                  {[
                    { id: 1 as const, icon: "🍎", name: "1. Gabung Apel" },
                    { id: 2 as const, icon: "🔗", name: "2. Pasangkan" },
                    { id: 3 as const, icon: "✍️", name: "3. Kanvas 50/50" },
                    { id: 4 as const, icon: "🐸", name: "4. Lompat Maju" },
                    { id: 5 as const, icon: "🔟", name: "5. Genap 10" },
                    { id: 6 as const, icon: "🔄", name: "6. Domino Tukar" },
                    { id: 7 as const, icon: "🍩", name: "7. Tambah Nol" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        playSound("pop");
                        setMotoricStation(st.id);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs border-b-4 flex flex-col items-center gap-1 transition-all ${
                        motoricStation === st.id
                          ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00] scale-105 shadow"
                          : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5] hover:opacity-90"
                      }`}
                    >
                      <span className="text-xl">{st.icon}</span>
                      <span className="text-center leading-tight">{st.name}</span>
                    </button>
                  ))}
                </div>
                {/* STASIUN 1: GABUNGKAN 2 KERANJANG APEL (TAP-TO-MERGE) */}
                {motoricStation === 1 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#1C01A5] space-y-4">
                    <h3 className="font-black text-base text-[#1C01A5]">
                      🍎 Stasiun Motorik 1: Sentuh &amp; Gabungkan Dua Keranjang Apel Kira
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] flex items-center justify-between">
                        <span className="text-xs font-black text-[#1C01A5]">
                          Keranjang Kiri: {st1LeftApples} Apel
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSt1LeftApples((v) => Math.max(1, v - 1))}
                            className="px-3 py-1 bg-[#FFFFFF] rounded-xl font-black"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSt1LeftApples((v) => Math.min(10 - st1RightApples, v + 1))
                            }
                            className="px-3 py-1 bg-[#1C01A5] text-white rounded-xl font-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] flex items-center justify-between">
                        <span className="text-xs font-black text-[#1C01A5]">
                          Keranjang Kanan: {st1RightApples} Apel
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSt1RightApples((v) => Math.max(1, v - 1))}
                            className="px-3 py-1 bg-[#FFFFFF] rounded-xl font-black"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSt1RightApples((v) => Math.min(10 - st1LeftApples, v + 1))
                            }
                            className="px-3 py-1 bg-[#1C01A5] text-white rounded-xl font-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {renderAdditionVisualSVG("merge-baskets", st1LeftApples, st1RightApples)}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] text-center font-black text-lg text-[#1C01A5]">
                      Kalimat Penjumlahan Kira: {st1LeftApples} + {st1RightApples} ={" "}
                      {st1LeftApples + st1RightApples} (
                      {NUMBER_WORDS[st1LeftApples + st1RightApples]})
                    </div>
                  </div>
                )}
                {/* STASIUN 2: PASANGKAN KARTU KALIMAT PENJUMLAHAN & BINTANG */}
                {motoricStation === 2 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#1C01A5] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-base text-[#1C01A5]">
                        🔗 Stasiun Motorik 2: Pasangkan Kartu Penjumlahan dengan Bintang Upe
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setSt2MatchedSums([]);
                          setSt2SelectedSum(null);
                        }}
                        className="bg-[#FFFFFF] text-[#1C01A5] font-black px-3 py-1 rounded-xl border border-[#1C01A5] text-xs"
                      >
                        🔄 Ulangi
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { label: "2 + 3", sum: 5 },
                        { label: "4 + 3", sum: 7 },
                        { label: "5 + 4", sum: 9 },
                        { label: "6 + 4", sum: 10 },
                      ].map((card) => {
                        const matched = st2MatchedSums.includes(card.sum);
                        const selected = st2SelectedSum === card.sum;
                        return (
                          <button
                            key={card.label}
                            type="button"
                            onClick={() => {
                              playSound("click");
                              setSt2SelectedSum(card.sum);
                              speakIGIL(
                                `${card.label}. Sekarang sentuh kotak yang berisi ${card.sum} bintang!`
                              );
                            }}
                            className={`py-3.5 rounded-2xl font-black text-lg border-b-4 ${
                              matched
                                ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00]"
                                : selected
                                ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00] scale-105"
                                : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                            }`}
                          >
                            {card.label} {matched ? "✅" : ""}
                          </button>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[7, 10, 5, 9].map((starCount) => {
                        const matched = st2MatchedSums.includes(starCount);
                        return (
                          <button
                            key={starCount}
                            type="button"
                            onClick={() => {
                              if (st2SelectedSum === starCount) {
                                playSound("coin");
                                setSt2MatchedSums((prev) => [...prev, starCount]);
                                setSt2SelectedSum(null);
                                speakIGIL(`Tepat sekali! Hasilnya adalah ${starCount} bintang!`);
                              } else {
                                playSound("wrong");
                                speakIGIL("Jumlah bintangnya belum sama. Coba hitung lagi ya!");
                              }
                            }}
                            className={`p-3 rounded-2xl border-b-4 flex flex-wrap gap-1 items-center justify-center min-h-[78px] ${
                              matched
                                ? "bg-[#FFFFFF] border-[#FF7A00]"
                                : "bg-[#FFFFFF] border-[#1C01A5] hover:opacity-90"
                            }`}
                          >
                            {Array.from({ length: starCount }).map((_, i) => (
                              <span key={i} className="text-base">
                                ⭐
                              </span>
                            ))}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* STASIUN 3: KANVAS 50/50 ANTI-JIPLAK HASIL PENJUMLAHAN */}
                {motoricStation === 3 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#1C01A5] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-black text-base text-[#1C01A5]">
                        ✍️ Stasiun Motorik 3: Tulis Angka Hasil Penjumlahan di Kanvas 50/50
                      </h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {[
                          { eq: "3+2=5", ans: 5 },
                          { eq: "4+3=7", ans: 7 },
                          { eq: "4+4=8", ans: 8 },
                          { eq: "6+3=9", ans: 9 },
                        ].map((item) => (
                          <button
                            key={item.eq}
                            type="button"
                            onClick={() => {
                              playSound("click");
                              resetDualCanvas(item.ans);
                            }}
                            className={`px-3 py-1 rounded-xl font-black text-xs border-b-2 ${
                              targetSumDigit === item.ans
                                ? "bg-[#1C01A5] text-white border-[#1C01A5]"
                                : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                            }`}
                          >
                            {item.eq}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] text-center space-y-2">
                        <div className="text-xs font-black text-[#1C01A5]">
                          50% KIRI: TEBALKAN TITIK ANGKA {targetSumDigit}
                        </div>
                        <canvas
                          ref={guidedCanvasRef}
                          width={220}
                          height={220}
                          onMouseDown={() => setIsDrawingGuided(true)}
                          onMouseMove={handleGuidedPointerMove}
                          onMouseUp={() => setIsDrawingGuided(false)}
                          onMouseLeave={() => setIsDrawingGuided(false)}
                          className="w-full max-w-[220px] mx-auto rounded-2xl border-2 border-[#1C01A5] cursor-crosshair"
                        />
                      </div>
                      <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] text-center space-y-2">
                        <div className="text-xs font-black text-[#1C01A5]">
                          50% KANAN: TULIS MANDIRI ANGKA {targetSumDigit}
                        </div>
                        <canvas
                          ref={freehandCanvasRef}
                          width={220}
                          height={220}
                          onMouseDown={() => setIsDrawingFreehand(true)}
                          onMouseMove={handleFreehandPointerMove}
                          onMouseUp={() => setIsDrawingFreehand(false)}
                          onMouseLeave={() => setIsDrawingFreehand(false)}
                          className="w-full max-w-[220px] mx-auto rounded-2xl border-2 border-[#1C01A5] cursor-crosshair"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => resetDualCanvas(targetSumDigit)}
                        className="bg-[#FFFFFF] text-[#1C01A5] font-black px-4 py-2 rounded-xl text-xs"
                      >
                        🗑️ Bersihkan
                      </button>
                      <button
                        type="button"
                        onClick={evaluateDualCanvasGeometry}
                        className="bg-[#FF7A00] text-[#1C01A5] font-black px-5 py-2 rounded-xl border-b-4 border-[#1C01A5] text-xs"
                      >
                        ✅ Periksa Geometri Tulisan Saya
                      </button>
                    </div>
                  </div>
                )}
                {/* STASIUN 4: LOMPATAN KATAK MAJU (COUNTING ON) */}
                {motoricStation === 4 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#FF7A00] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-black text-base text-[#1C01A5]">
                        🐸 Stasiun Motorik 4: Garis Bilangan Lompatan Maju bersama Malosi
                      </h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            playSound("pop");
                            setSt4StartStone((s) => Math.min(6, s + 1));
                          }}
                          className="bg-[#FF7A00] text-[#1C01A5] font-black px-3 py-1.5 rounded-xl text-xs"
                        >
                          Ubah Batu Awal ({st4StartStone})
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playSound("pop");
                            setSt4JumpCount((j) => (j >= 4 ? 1 : j + 1));
                          }}
                          className="bg-[#FF7A00] text-[#1C01A5] font-black px-3 py-1.5 rounded-xl text-xs"
                        >
                          Ubah Lompatan (+{st4JumpCount})
                        </button>
                      </div>
                    </div>
                    {renderAdditionVisualSVG("jump-line", st4StartStone, st4JumpCount)}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#FF7A00] text-center font-black text-sm">
                      Mulai di {st4StartStone}, melompat maju {st4JumpCount} langkah → Mendarat di{" "}
                      <span className="text-lg text-[#1C01A5]">
                        {st4StartStone + st4JumpCount}
                      </span>
                    </div>
                  </div>
                )}
                {/* STASIUN 5: MESIN PENGGENAP 10 (MAKE-10 TEN FRAME) */}
                {motoricStation === 5 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#1C01A5] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-black text-base text-[#1C01A5]">
                          🔟 Stasiun Motorik 5: Sentuh Petak Kosong Agar Genap 10!
                        </h3>
                        <p className="text-xs text-[#1C01A5]">
                          Ada {st5BaseTenRed} keping merah. Sentuh tombol <strong>+1 Keping Biru</strong> sampai Bingkai 10 penuh!
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {[6, 7, 8].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setSt5BaseTenRed(r);
                              setSt5AddedBlue(0);
                            }}
                            className="bg-[#FFFFFF] px-3 py-1 rounded-xl border border-[#1C01A5] font-black text-xs"
                          >
                            Awal {r} Merah
                          </button>
                        ))}
                      </div>
                    </div>
                    {renderAdditionVisualSVG("ten-frame-pair", st5BaseTenRed, st5AddedBlue)}
                    <div className="flex items-center justify-between bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5]">
                      <span className="font-black text-sm text-[#1C01A5]">
                        {st5BaseTenRed} Merah + {st5AddedBlue} Biru ={" "}
                        {st5BaseTenRed + st5AddedBlue}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (st5BaseTenRed + st5AddedBlue < 10) {
                            const next = st5AddedBlue + 1;
                            setSt5AddedBlue(next);
                            playSound("note", next * 2);
                            if (st5BaseTenRed + next === 10) {
                              speakIGIL(
                                `Genap 10! Pasangan dari ${st5BaseTenRed} untuk menjadi 10 adalah ${next}!`
                              );
                            }
                          }
                        }}
                        className="bg-[#1C01A5] text-white font-black px-4 py-2 rounded-xl border-b-4 border-[#16017a] text-xs"
                      >
                        ➕ Sentuh Tambah 1 Keping Biru
                      </button>
                    </div>
                  </div>
                )}
                {/* STASIUN 6: PUTAR DOMINO PERTUKARAN (KOMUTATIF) */}
                {motoricStation === 6 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#1C01A5] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-base text-[#1C01A5]">
                        🔄 Stasiun Motorik 6: Putar Domino Pertukaran bersama Tora
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          playSound("laser");
                          setSt6Flipped((prev) => !prev);
                          speakIGIL(
                            `Domino diputar! ${st6DominoA} ditambah ${st6DominoB} sama dengan ${st6DominoB} ditambah ${st6DominoA}, hasilnya tetap ${
                              st6DominoA + st6DominoB
                            }!`
                          );
                        }}
                        className="bg-[#1C01A5] text-white font-black px-4 py-2 rounded-xl border-b-4 border-[#16017a] text-xs"
                      >
                        🔄 Putar Domino 180°
                      </button>
                    </div>
                    {renderAdditionVisualSVG(
                      "domino-flip",
                      st6Flipped ? st6DominoB : st6DominoA,
                      st6Flipped ? st6DominoA : st6DominoB
                    )}
                    <div className="flex justify-center gap-2">
                      {[
                        { a: 2, b: 6 },
                        { a: 3, b: 5 },
                        { a: 4, b: 6 },
                      ].map((pair) => (
                        <button
                          key={`${pair.a}-${pair.b}`}
                          type="button"
                          onClick={() => {
                            setSt6DominoA(pair.a);
                            setSt6DominoB(pair.b);
                          }}
                          className="px-3 py-1 bg-[#FFFFFF] rounded-xl border border-[#1C01A5] text-xs font-black"
                        >
                          Domino {pair.a} &amp; {pair.b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* STASIUN 7: PENJUMLAHAN DENGAN BILANGAN NOL */}
                {motoricStation === 7 && (
                  <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#FF7A00] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-base text-[#1C01A5]">
                        🍩 Stasiun Motorik 7: Piring Donat &amp; Piring Kosong (Tambah Nol)
                      </h3>
                      <div className="flex gap-1.5">
                        {[5, 7, 9].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setSt7PlateCakeCount(n)}
                            className="px-3 py-1 bg-[#FFFFFF] rounded-xl border border-[#FF7A00] font-black text-xs"
                          >
                            {n} Donat + 0
                          </button>
                        ))}
                      </div>
                    </div>
                    {renderAdditionVisualSVG("merge-baskets", st7PlateCakeCount, 0)}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#FF7A00] text-center font-black text-base">
                      {st7PlateCakeCount} + 0 = {st7PlateCakeCount} (Ditambah 0 tidak mengubah jumlah benda!)
                    </div>
                  </div>
                )}
              </section>
            )}
            {/* ------------------------------------------------------------- */}
            {/* PULAU 3 (KARTU 3): POLYPAD 3-PANEL TOYBOX & KANVAS 50/50       */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 3 && (
              <section className="bg-[#1C01A5] text-white rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#1C01A5] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="bg-[#1C01A5] text-white text-xs font-black px-3 py-0.5 rounded-full">
                      🧰 PULAU 3 • POLYPAD 3-PANEL DIGITAL TOYBOX &amp; KANVAS 50/50
                    </span>
                    <h2 className="text-xl font-black mt-1">
                      Laci Alat Peraga Penjumlahan &amp; Studio Kanvas 50/50 Anti-Jiplak
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToyboxTrayItems([])}
                    className="bg-[#1C01A5] text-white font-black px-4 py-2 rounded-xl border-b-4 border-[#16017a] text-xs"
                  >
                    🗑️ Kosongkan Meja Peraga
                  </button>
                </div>
                {/* 3-Panel Polypad Workspace */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 bg-[#1C01A5] p-4 rounded-2xl border border-[#1C01A5] space-y-2.5">
                    <div className="text-xs font-black text-[#FF7A00] uppercase">
                      1. Laci Alat Peraga (Sentuh untuk Tambah ke Meja)
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: "🍓", name: "Stroberi" },
                        { icon: "🍌", name: "Pisang" },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            if (toyboxTrayItems.length < 10) {
                              const next = [...toyboxTrayItems, item.icon];
                              setToyboxTrayItems(next);
                              playSound("pop");
                              resetDualCanvas(next.length % 10);
                            }
                          }}
                          className="bg-[#1C01A5] p-3 rounded-2xl border-b-4 border-[#16017a] flex flex-col items-center gap-1 hover:opacity-90"
                        >
                          <span className="text-3xl">{item.icon}</span>
                          <span className="text-xs font-black">+1 {item.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#1C01A5] p-3 rounded-xl text-xs space-y-1">
                      <div className="text-[#FF7A00] font-bold">Persamaan di Meja:</div>
                      <div className="text-lg font-black text-white">
                        {toyboxTrayItems.filter((x) => x === "🍓").length} 🍓 +{" "}
                        {toyboxTrayItems.filter((x) => x === "🍌").length} 🍌 ={" "}
                        {toyboxTrayItems.length}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8 bg-[#FFFFFF] text-[#1C01A5] p-4 rounded-2xl border-4 border-[#1C01A5] space-y-3">
                    <div className="text-xs font-black text-[#1C01A5] uppercase">
                      2. Meja Bingkai 10 Polypad (Sentuh Buah di Petak untuk Menghapus)
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const fruit = toyboxTrayItems[idx];
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (fruit) {
                                const next = toyboxTrayItems.filter((__, i) => i !== idx);
                                setToyboxTrayItems(next);
                                playSound("click");
                              }
                            }}
                            className={`h-16 rounded-2xl border-2 flex items-center justify-center text-3xl ${
                              fruit
                                ? "bg-[#FFFFFF] border-[#FF7A00]"
                                : "bg-[#FFFFFF] border-dashed border-[#1C01A5] text-xs text-[#1C01A5]"
                            }`}
                          >
                            {fruit || idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Kanvas 50/50 di Bawah Meja Polypad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FFFFFF] text-[#1C01A5] p-4 rounded-2xl border-4 border-[#1C01A5] text-center space-y-2">
                    <div className="text-xs font-black text-[#1C01A5]">
                      50% KIRI: AREA TERPANDU (ANGKA {targetSumDigit})
                    </div>
                    <canvas
                      ref={guidedCanvasRef}
                      width={220}
                      height={220}
                      onMouseDown={() => setIsDrawingGuided(true)}
                      onMouseMove={handleGuidedPointerMove}
                      onMouseUp={() => setIsDrawingGuided(false)}
                      onMouseLeave={() => setIsDrawingGuided(false)}
                      className="w-full max-w-[220px] mx-auto rounded-2xl border-2 border-[#1C01A5] cursor-crosshair"
                    />
                  </div>
                  <div className="bg-[#FFFFFF] text-[#1C01A5] p-4 rounded-2xl border-4 border-[#1C01A5] text-center space-y-2">
                    <div className="text-xs font-black text-[#1C01A5]">
                      50% KANAN: AREA MANDIRI ANTI-JIPLAK (ANGKA {targetSumDigit})
                    </div>
                    <canvas
                      ref={freehandCanvasRef}
                      width={220}
                      height={220}
                      onMouseDown={() => setIsDrawingFreehand(true)}
                      onMouseMove={handleFreehandPointerMove}
                      onMouseUp={() => setIsDrawingFreehand(false)}
                      onMouseLeave={() => setIsDrawingFreehand(false)}
                      className="w-full max-w-[220px] mx-auto rounded-2xl border-2 border-[#1C01A5] cursor-crosshair"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => resetDualCanvas(d)}
                        className={`w-8 h-8 rounded-lg font-black text-xs ${
                          targetSumDigit === d
                            ? "bg-[#FF7A00] text-[#1C01A5]"
                            : "bg-[#1C01A5] text-white"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={evaluateDualCanvasGeometry}
                    className="bg-[#FF7A00] text-[#1C01A5] font-black px-5 py-2.5 rounded-xl border-b-4 border-[#1C01A5] text-xs"
                  >
                    ✅ Nilai Geometri Tulisan Saya {geometryScore !== null ? `(${geometryScore}%)` : ""}
                  </button>
                </div>
              </section>
            )}
            {/* ------------------------------------------------------------- */}
            {/* PULAU 4 (KARTU 4): KHAN KIDS AUDIO-FIRST STAGE (+30 TOKEN)     */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 4 && (
              <section className="bg-[#FFFFFF] rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#FF7A00] space-y-4">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {PRACTICE_QUESTIONS.map((q, idx) => {
                    const ans = practiceAnswers[q.id];
                    const isRight = ans === q.correctAnswer;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCurrentPracticeIdx(idx);
                        }}
                        className={`py-2.5 rounded-2xl font-black text-xs border-b-4 ${
                          currentPracticeIdx === idx
                            ? "bg-[#1C01A5] text-white border-[#1C01A5] scale-105"
                            : ans
                            ? isRight
                              ? "bg-[#1C01A5] text-white border-[#1C01A5]"
                              : "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00]"
                            : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                        }`}
                      >
                        #{idx + 1}
                      </button>
                    );
                  })}
                </div>
                {(() => {
                  const q = PRACTICE_QUESTIONS[currentPracticeIdx];
                  const selected = practiceAnswers[q.id];
                  const isCorrect = selected === q.correctAnswer;
                  return (
                    <div className="space-y-4">
                      <div
                        className={`${q.themeGradient} text-[#1C01A5] p-4 rounded-3xl flex items-center justify-between gap-3`}
                      >
                        <div>
                          <span className="text-[11px] font-black uppercase bg-[#1C01A5] text-white px-3 py-0.5 rounded-full">
                            Panggung Suara #{q.id} • Bersama {q.storyCharacter} • {q.badgeTitle}
                          </span>
                          <p className="text-sm md:text-base font-black mt-1.5">{q.prompt}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakIGIL(q.prompt)}
                          className="bg-[#FFFFFF] text-[#1C01A5] font-black px-4 py-2.5 rounded-2xl border-b-4 border-[#16017a] text-xs shrink-0"
                        >
                          🔊 Bacakan
                        </button>
                      </div>
                      {renderAdditionVisualSVG(q.visualType, q.paramA, q.paramB)}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {q.options.map((opt) => {
                          const isChosen = selected === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectPracticeAnswer(q, opt)}
                              className={`py-4 px-4 rounded-3xl font-black text-lg border-b-8 flex items-center justify-center gap-2 transition-all ${
                                isChosen
                                  ? opt === q.correctAnswer
                                    ? "bg-[#1C01A5] text-white border-[#1C01A5] scale-105"
                                    : "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00]"
                                  : "bg-[#FFFFFF] text-[#1C01A5] border-[#FF7A00] active:border-b-0 active:translate-y-1 hover:opacity-90"
                              }`}
                            >
                              <span className="text-sm opacity-75">🔊</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      {selected && (
                        <div
                          className={`p-4 rounded-2xl border-2 text-xs space-y-1 ${
                            isCorrect
                              ? "bg-[#1C01A5] border-[#1C01A5] text-white"
                              : "bg-[#FF7A00] border-[#FF7A00] text-[#1C01A5]"
                          }`}
                        >
                          <div className="font-black text-sm">
                            {isCorrect
                              ? "🪙 JAWABAN BENAR! (+3 Token IGIL)"
                              : "💡 Pembahasan IGIL:"}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          disabled={currentPracticeIdx === 0}
                          onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))}
                          className="px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#1C01A5] font-black text-xs disabled:opacity-40"
                        >
                          ⬅️ Sebelumnya
                        </button>
                        {currentPracticeIdx < PRACTICE_QUESTIONS.length - 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPracticeIdx((i) =>
                                Math.min(PRACTICE_QUESTIONS.length - 1, i + 1)
                              )
                            }
                            className="px-5 py-2 rounded-xl bg-[#1C01A5] text-white font-black text-xs border-b-4 border-[#16017a]"
                          >
                            Berikutnya ➡️
                          </button>
                        ) : (
                          card5Unlocked && (
                            <button
                              type="button"
                              onClick={() => {
                                playSound("fanfare");
                                setExamStartTime(Date.now());
                                setExamElapsedDeci(0);
                                setActiveCard(5);
                              }}
                              className="px-5 py-2 rounded-xl bg-[#1C01A5] text-white font-black text-xs border-b-4 border-[#16017a]"
                            >
                              Buka Pulau 5 (Ujian Gerbang 1) 🏰
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  );
                })()}
              </section>
            )}
            {/* ------------------------------------------------------------- */}
            {/* PULAU 5 (KARTU 5): BENTENG UJIAN GERBANG 1 (+70 TOKEN IGIL)    */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 5 && (
              <section className="bg-[#FFFFFF] rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#1C01A5] space-y-4">
                <div className="bg-[#1C01A5] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black text-[#FF7A00] uppercase">
                      🏰 PULAU 5 • GERBANG 1: SI PALING PINTAR (WAJIB 100/100)
                    </span>
                    <h2 className="text-base font-black">
                      Ujian Evaluasi Penjumlahan Anti-Contek (+70 Token IGIL)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="bg-[#1C01A5] px-3 py-1.5 rounded-xl">
                      🔄 Percobaan #{examAttempts}
                    </span>
                    <span className="bg-[#1C01A5] px-3 py-1.5 rounded-xl text-white">
                      ⏱️ {formatStopwatch(examElapsedDeci)}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-xl ${
                        focusLossCount === 0 ? "bg-[#1C01A5] text-white" : "bg-[#FF7A00] text-[#1C01A5]"
                      }`}
                    >
                      👀 Pindah Tab: {focusLossCount}x
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                  {examQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentExamIdx(idx)}
                      className={`py-2 rounded-xl font-black text-xs border-b-4 ${
                        currentExamIdx === idx
                          ? "bg-[#1C01A5] text-white border-[#1C01A5]"
                          : examAnswers[q.id]
                          ? "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                          : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                {(() => {
                  const q = examQuestions[currentExamIdx];
                  const chosen = examAnswers[q.id];
                  return (
                    <div className="space-y-4">
                      <div className="bg-[#FFFFFF] p-4 rounded-2xl border-2 border-[#1C01A5] flex items-center justify-between gap-2">
                        <p className="text-sm md:text-base font-black text-[#1C01A5]">
                          {q.id}. {q.questionText}
                        </p>
                        <button
                          type="button"
                          onClick={() => speakIGIL(q.questionText)}
                          className="bg-[#1C01A5] text-white text-xs font-black px-3 py-2 rounded-xl shrink-0"
                        >
                          🔊 Soal
                        </button>
                      </div>
                      {renderAdditionVisualSVG(q.visualType, q.paramA, q.paramB)}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {q.options.map((opt) => {
                          const isSelected = chosen === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectExamAnswer(q.id, opt)}
                              className={`py-3.5 px-4 rounded-2xl font-black text-base border-b-4 ${
                                examSubmitted
                                  ? opt === q.correctAnswer
                                    ? "bg-[#1C01A5] text-white border-[#1C01A5]"
                                    : isSelected
                                    ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00]"
                                    : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                                  : isSelected
                                  ? "bg-[#1C01A5] text-white border-[#1C01A5] scale-105"
                                  : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5] hover:opacity-90"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          disabled={currentExamIdx === 0}
                          onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))}
                          className="px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#1C01A5] font-black text-xs disabled:opacity-40"
                        >
                          ⬅️ Sebelumnya
                        </button>
                        {currentExamIdx < examQuestions.length - 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))
                            }
                            className="px-5 py-2 rounded-xl bg-[#1C01A5] text-white font-black text-xs border-b-4 border-[#16017a]"
                          >
                            Berikutnya ➡️
                          </button>
                        ) : !examSubmitted ? (
                          <button
                            type="button"
                            onClick={handleSubmitExam}
                            className="px-6 py-2.5 rounded-xl bg-[#FF7A00] text-[#1C01A5] font-black text-xs border-b-4 border-[#1C01A5]"
                          >
                            ✅ Kumpulkan Nilai Ujian
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })()}
                {examSubmitted && (
                  <div
                    className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                      examScore === 100 && !dwellTimeWarning
                        ? "bg-[#1C01A5] border-[#1C01A5] text-white"
                        : "bg-[#FF7A00] border-[#FF7A00] text-[#1C01A5]"
                    }`}
                  >
                    <div className="font-black text-sm">
                      {dwellTimeWarning
                        ? "⚠️ Pengerjaan di bawah 25 detik! Silakan ulangi dengan teliti."
                        : examScore === 100
                        ? "🎉 SEMPURNA 100/100! GERBANG 2 (PULAU 6 PRAKTIKUM) TERBUKA!"
                        : `Skor Kamu: ${examScore}/100 (Wajib 100/100 untuk Buka Praktikum)`}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleRetryExam}
                        className="bg-[#FFFFFF] text-[#1C01A5] font-black px-4 py-2 rounded-xl border-b-4 border-[#16017a] text-xs"
                      >
                        🔄 Ulangi Ujian Acak
                      </button>
                      {card6Unlocked && (
                        <button
                          type="button"
                          onClick={() => setActiveCard(6)}
                          className="bg-[#FF7A00] text-[#1C01A5] font-black px-4 py-2 rounded-xl border-b-4 border-[#1C01A5] text-xs"
                        >
                          Masuk Pulau 6 (Praktikum) 🍱
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}
            {/* ------------------------------------------------------------- */}
            {/* PULAU 6 (KARTU 6): STUDIO PRAKTIKUM 2 KOTAK BEKAL SEHAT        */}
            {/* ------------------------------------------------------------- */}
            {activeCard === 6 && (
              <section className="bg-[#FFFFFF] rounded-[32px] p-5 md:p-6 shadow-2xl border-4 border-[#1C01A5] space-y-5">
                <div className="bg-[#FF7A00] text-[#1C01A5] p-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="bg-[#FF7A00] text-[#1C01A5] text-xs font-black px-3 py-0.5 rounded-full">
                      🍱 PULAU 6 • GERBANG 2: SI PALING KREATIF (SKOR 0–1.000 POIN)
                    </span>
                    <h2 className="text-lg font-black mt-1">
                      Koki Cilik: Rancang 2 Kotak Bekal Sehat Genap 10 &amp; Pertukaran Adil
                    </h2>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPracticumMode("single")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                        practicumMode === "single"
                          ? "bg-[#FF7A00] text-[#1C01A5]"
                          : "bg-[#FFFFFF] text-[#1C01A5]"
                      }`}
                    >
                      Bab Tunggal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticumMode("cross4")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                        practicumMode === "cross4"
                          ? "bg-[#FF7A00] text-[#1C01A5]"
                          : "bg-[#FFFFFF] text-[#1C01A5]"
                      }`}
                    >
                      Sintesis 4 Bab
                    </button>
                  </div>
                </div>
                {practicumMode === "cross4" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {completedOtherChapters.slice(0, 3).map((ch) => (
                      <div
                        key={ch.chapterId}
                        className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#FF7A00]"
                      >
                        <div className="font-black text-[#1C01A5]">{ch.subject}</div>
                        <p className="text-[11px] text-[#1C01A5]">{ch.practicumSynthesisHook}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="bg-[#FFFFFF] p-4 rounded-2xl border-2 border-[#FF7A00] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#1C01A5]">
                      Pilih Buah lalu Sentuh Petak Kotak Bekal Kira &amp; Upe (Target: Masing-Masing Genap 10 &amp; Saling Bertukar Porsi):
                    </span>
                    <div className="flex gap-2">
                      {[
                        { id: "strawberry" as const, label: "🍓 Stroberi" },
                        { id: "banana" as const, label: "🍌 Pisang" },
                        { id: "empty" as const, label: "🧹 Kosongkan" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setActiveBentoTool(t.id)}
                          className={`px-3 py-1.5 rounded-xl font-black text-xs border-b-2 ${
                            activeBentoTool === t.id
                              ? "bg-[#FF7A00] text-[#1C01A5] border-[#FF7A00]"
                              : "bg-[#FFFFFF] text-[#1C01A5] border-[#1C01A5]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] space-y-2">
                      <div className="text-xs font-black text-[#1C01A5] flex justify-between">
                        <span>🍱 Kotak Bekal Kira (Bingkai 10)</span>
                        <span>
                          {kiraStraw}🍓 + {kiraBan}🍌 = {kiraTotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {kiraLunchCells.map((cell, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              playSound("pop");
                              setKiraLunchCells((prev) => {
                                const next = [...prev];
                                next[idx] =
                                  next[idx] === activeBentoTool ? "empty" : activeBentoTool;
                                return next;
                              });
                            }}
                            className="h-12 rounded-xl bg-[#FFFFFF] border border-[#1C01A5] flex items-center justify-center text-xl hover:opacity-90"
                          >
                            {cell === "strawberry" ? "🍓" : cell === "banana" ? "🍌" : "➕"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border-2 border-[#1C01A5] space-y-2">
                      <div className="text-xs font-black text-[#1C01A5] flex justify-between">
                        <span>🍱 Kotak Bekal Upe (Pertukaran)</span>
                        <span>
                          {upeStraw}🍓 + {upeBan}🍌 = {upeTotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {upeLunchCells.map((cell, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              playSound("pop");
                              setUpeLunchCells((prev) => {
                                const next = [...prev];
                                next[idx] =
                                  next[idx] === activeBentoTool ? "empty" : activeBentoTool;
                                return next;
                              });
                            }}
                            className="h-12 rounded-xl bg-[#FFFFFF] border border-[#1C01A5] flex items-center justify-center text-xl hover:opacity-90"
                          >
                            {cell === "strawberry" ? "🍓" : cell === "banana" ? "🍌" : "➕"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-black text-center">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        kiraTotal === 10 && upeTotal === 10
                          ? "bg-[#FFFFFF] border-[#FF7A00] text-[#1C01A5]"
                          : "bg-[#FFFFFF] border-[#FF7A00] text-[#1C01A5]"
                      }`}
                    >
                      Total Buah: Kira ({kiraTotal}) &amp; Upe ({upeTotal}){" "}
                      {kiraTotal === 10 && upeTotal === 10 ? "✅ Genap 10" : "(Target: 10 & 10)"}
                    </div>
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isCommutativeBoxes
                          ? "bg-[#FFFFFF] border-[#FF7A00] text-[#1C01A5]"
                          : "bg-[#FFFFFF] border-[#FF7A00] text-[#1C01A5]"
                      }`}
                    >
                      Sifat Pertukaran: {kiraStraw}+{kiraBan} ⇄ {upeStraw}+{upeBan}{" "}
                      {isCommutativeBoxes ? "✅ Komutatif Sempurna!" : "(Tukar Porsi)"}
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] p-4 rounded-2xl border-2 border-[#FF7A00] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-[#1C01A5]">
                      📝 Laporan Ilmiah Koki Cilik
                    </h3>
                    <button
                      type="button"
                      onClick={fillGuidedReportTemplate}
                      className="bg-[#FF7A00] text-[#1C01A5] font-black px-3 py-1.5 rounded-xl border-b-4 border-[#1C01A5] text-xs"
                    >
                      ✨ Bantu Susun Kalimat Laporan
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={studentReportText}
                    onChange={(e) => setStudentReportText(e.target.value)}
                    placeholder="Klik tombol kuning di atas atau ceritakan kalimat penjumlahan kedua kotak bekal sehatmu..."
                    className="w-full p-3 rounded-xl border-2 border-[#FF7A00] bg-[#FFFFFF] text-xs md:text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleEvaluatePracticum}
                    className="w-full py-3.5 rounded-2xl bg-[#FF7A00] text-[#1C01A5] font-black text-sm border-b-4 border-[#1C01A5]"
                  >
                    🚀 Kirim Praktikum &amp; Hitung Skor Kualitas AI (0–1.000 Poin)
                  </button>
                </div>
                {practicumRubric && (
                  <div className="bg-[#1C01A5] text-white p-5 rounded-3xl border-4 border-[#FF7A00] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-[#FF7A00]">
                          🏅 SERTIFIKAT RUBRIK KUALITAS PRAKTIKUM IGIL
                        </span>
                        <h4 className="text-lg font-black">{studentName}</h4>
                      </div>
                      <div className="bg-[#FF7A00] text-[#1C01A5] px-4 py-2 rounded-2xl font-black text-2xl">
                        {practicumRubric.totalQualityScore} / 1.000
                      </div>
                    </div>
                    <p className="text-xs text-white">{practicumRubric.aiFeedbackSummary}</p>
                    {chapterCompletedFlag && (
                      <div className="text-xs font-black text-[#FF7A00]">
                        ✅ Bab 2 Tuntas Paripurna (150/150 Token IGIL).
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </main>
          {/* =============================================================== */}
          {/* PANEL SAMPING BENTO (4 KOLOM PERSISTEN DI LAYAR LEBAR)          */}
          {/* =============================================================== */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-[#FFFFFF] rounded-[28px] p-4 shadow-xl border-4 border-[#1C01A5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border-2 border-[#FF7A00] flex items-center justify-center text-2xl">
                  🦉
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-[#1C01A5]">
                    Panggung Suara IGIL &amp; {activeCompanion}
                  </div>
                  <div className="text-sm font-black text-[#1C01A5]">
                    Pemandu Audio-First
                  </div>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#1C01A5] text-xs font-bold text-[#1C01A5]">
                &quot;{mascotSpeech}&quot;
              </div>
            </div>
            <div className="bg-[#1C01A5] text-white rounded-[28px] p-4 shadow-xl border-2 border-[#1C01A5]/40 space-y-3">
              <div className="text-xs font-black text-[#FF7A00] uppercase">
                🎹 Papan Suara Pasangan Genap 10
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  "1 + 9 = 10",
                  "2 + 8 = 10",
                  "3 + 7 = 10",
                  "4 + 6 = 10",
                  "5 + 5 = 10",
                  "10 + 0 = 10",
                ].map((eq, idx) => (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => {
                      playSound("note", idx * 2);
                      speakIGIL(eq.replace("+", "ditambah").replace("=", "sama dengan"));
                    }}
                    className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#1C01A5] font-black text-[#1C01A5] text-center hover:opacity-90"
                  >
                    🔊 {eq}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#FFFFFF] rounded-[28px] p-4 shadow-xl border-4 border-[#FF7A00] space-y-2.5">
              <h3 className="font-black text-sm text-[#1C01A5]">
                🌟 Album Lencana Kepulauan Bab 2
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: "Pohon Pipit", ok: card2Unlocked, icon: "🐦" },
                  { name: "Kanvas 50/50", ok: (geometryScore ?? 0) >= 80, icon: "✍️" },
                  { name: "Lulus Gerbang 1", ok: card6Unlocked, icon: "🏰" },
                  { name: "Koki Kreatif", ok: chapterCompletedFlag, icon: "🍱" },
                ].map((b) => (
                  <div
                    key={b.name}
                    className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 font-black ${
                      b.ok
                        ? "bg-[#FFFFFF] border-[#FF7A00] text-[#1C01A5]"
                        : "bg-[#FFFFFF] border-[#1C01A5] text-[#1C01A5]"
                    }`}
                  >
                    <span className="text-xl">{b.ok ? b.icon : "🔒"}</span>
                    <span>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
