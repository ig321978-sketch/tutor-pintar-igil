"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

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
  accuracyScore: number;
  synthesisScore: number;
  optimizationVisualScore: number;
  reasoningReportScore: number;
  totalQualityScore: number;
  aiFeedbackSummary: string;
}

export interface ChapterCompletionPayload {
  chapterId: string;
  studentId?: string;
  practiceTokensEarned: number;
  examTokensEarned: number;
  practicumTokensEarned: number;
  totalChapterTokens: number;
  examScore: number;
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
  chapterId: "MAT-K1-B3",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 3,
  chapterTitle: "Pengurangan sampai dengan 10",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 3, Halaman 61–90",
  coreSkills: [
    "Memahami makna pengurangan sebagai pengambilan sebagian benda (mencari sisa) dan membandingkan selisih",
    "Melakukan pengurangan dengan strategi menghitung mundur (counting back) dan pasangan bilangan",
    "Melakukan pengurangan dari bilangan 10 menggunakan Bingkai 10 (Ten Frame)",
    "Memahami pengurangan dengan bilangan 0 (a - 0 = a dan a - a = 0) serta hubungan penjumlahan dan pengurangan",
  ],
  practicumSynthesisHook:
    "Gunakan operasi pengurangan dari 10 pada Bingkai 10, perhitungan selisih dua kelompok objek, serta prinsip pengurangan habis (a - a = 0) untuk mengelola distribusi sumber daya/panen secara adil pada proyek lintas mata pelajaran.",
};

type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare";
type VisualSubtractionType =
  | "take-away"
  | "jump-backward"
  | "ten-frame-cross"
  | "compare-difference"
  | "fact-family";

interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  prompt: string;
  visualType: VisualSubtractionType;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: VisualSubtractionType;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface CanvasStampItem {
  id: string;
  x: number;
  y: number;
  symbol: string;
  label: string;
}

const DEFAULT_CROSS_CHAPTERS: ChapterCompetencyMetadata[] = [
  {
    chapterId: "IPAS-K1-B3",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 3,
    chapterTitle: "Merawat Tanaman & Panen Buah Kebun Sekolah",
    textbookReference: "Kurikulum Merdeka Fase A — Mengenal Hasil Kebun & Lingkungan Bersih",
    coreSkills: ["Memanen buah matang dengan tertib", "Mengelola sampah organik daun kering"],
    practicumSynthesisHook: "Hitung sisa buah di pohon setelah sebagian dipanen dan bersihkan daun gugur hingga 0.",
  },
  {
    chapterId: "BINDO-K1-B3",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 3,
    chapterTitle: "Awas Kuman! & Menulis Cerita Pengalaman",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Kemendikbudristek Bab 3",
    coreSkills: ["Menulis kalimat cerita pengurangan", "Menceritakan kegiatan menjaga kebersihan"],
    practicumSynthesisHook: "Susun laporan tertulis mengenai hasil panen yang dibagikan dan sisa di keranjang.",
  },
  {
    chapterId: "PANCASILA-K1-B3",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 3,
    chapterTitle: "Gotong Royong & Berbagi Hasil Panen dengan Tetangga",
    textbookReference: "Pendidikan Pancasila SD Kelas I Kemendikbudristek Bab 3",
    coreSkills: ["Berbagi kepada teman yang membutuhkan", "Bekerja bakti membersihkan halaman"],
    practicumSynthesisHook: "Bagikan buah hasil panen kepada sahabat dan hitung selisihnya secara transparan.",
  },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    prompt:
      "Kira memiliki 7 buah apel di atas piring. Sebanyak 2 buah apel dimakan bersama adiknya. Berapa sisa buah apel Kira sekarang? (7 - 2 = ...)",
    visualType: "take-away",
    paramA: 7,
    paramB: 2,
    options: ["4", "5", "6", "3"],
    correctAnswer: "5",
    explanation: "Dari 7 apel diambil 2 apel, ditulis 7 - 2 = 5. Jadi sisa apel Kira adalah 5 buah.",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    prompt:
      "Upe memegang 9 balon warna-warni. Tiba-tiba 3 balon meletus terkena ranting. Berapa balon Upe yang masih utuh? (9 - 3 = ...)",
    visualType: "take-away",
    paramA: 9,
    paramB: 3,
    options: ["5", "6", "7", "4"],
    correctAnswer: "6",
    explanation: "Awalnya ada 9 balon, berkurang 3 balon yang meletus. Kalimat matematikanya: 9 - 3 = 6 balon.",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    prompt:
      "Katak Malosi berada di batu angka 8, lalu melompat MUNDUR sebanyak 5 langkah ke kiri. Di batu angka berapakah Malosi berhenti? (8 - 5 = ...)",
    visualType: "jump-backward",
    paramA: 8,
    paramB: 5,
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "Mulai dari 8, hitung mundur 5 langkah: 7, 6, 5, 4, 3. Jadi 8 - 5 = 3.",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    prompt:
      "Perhatikan Bingkai 10 milik Tora! Dari 10 keping penuh, dicoret 6 keping. Berapa keping yang tersisa? (10 - 6 = ...)",
    visualType: "ten-frame-cross",
    paramA: 10,
    paramB: 6,
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    explanation: "Pasangan bilangan 10 dari 6 adalah 4. Ketika 10 dikurangi 6, tersisa 4 keping utuh.",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    prompt:
      "Kira menggambar 8 bunga merah dan Upe menggambar 5 bunga biru. Berapa SELISIH (beda banyak) bunga Kira dan Upe? (8 - 5 = ...)",
    visualType: "compare-difference",
    paramA: 8,
    paramB: 5,
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation:
      "Saat dipasangkan satu per satu, 8 bunga Kira memiliki kelebihan 3 bunga dibanding 5 bunga Upe. Jadi selisihnya 8 - 5 = 3.",
  },
  {
    id: 6,
    storyCharacter: "Tora",
    prompt:
      "Tora membawa 7 kelereng di kantongnya. Tidak ada satu pun kelereng yang jatuh (berkurang 0). Berapakah hasil dari 7 - 0?",
    visualType: "take-away",
    paramA: 7,
    paramB: 0,
    options: ["0", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "Bilangan berapa pun jika dikurangi 0 (tidak diambil sama sekali) hasilnya tetap bilangan itu sendiri: 7 - 0 = 7.",
  },
  {
    id: 7,
    storyCharacter: "Malosi",
    prompt:
      "Ada 6 burung merpati hinggap di pagar sekolah. Kemudian ke-6 burung merpati itu terbang semuanya. Berapa burung yang tersisa di pagar? (6 - 6 = ...)",
    visualType: "take-away",
    paramA: 6,
    paramB: 6,
    options: ["0", "1", "6", "12"],
    correctAnswer: "0",
    explanation: "Jika suatu bilangan dikurangi dengan bilangan yang sama persis, maka habis tak bersisa atau sama dengan 0 (6 - 6 = 0).",
  },
  {
    id: 8,
    storyCharacter: "Upe",
    prompt:
      "Perhatikan hubungan penjumlahan dan pengurangan pada Pasangan Bilangan! Jika 4 + 5 = 9, maka hasil dari 9 - 5 adalah...",
    visualType: "fact-family",
    paramA: 9,
    paramB: 5,
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    explanation:
      "Karena 9 terbentuk dari pasangan 4 dan 5 (4 + 5 = 9), maka ketika 9 dikurangi 5 hasilnya adalah pasangannya yaitu 4.",
  },
  {
    id: 9,
    storyCharacter: "Kira",
    prompt:
      "Ibu membuat 10 kue lapis di dalam Bingkai 10. Sebanyak 2 kue diberikan kepada tetangga. Berapa kue lapis Ibu yang masih ada? (10 - 2 = ...)",
    visualType: "ten-frame-cross",
    paramA: 10,
    paramB: 2,
    options: ["7", "8", "9", "6"],
    correctAnswer: "8",
    explanation: "10 kue dikurangi 2 kue menyisakan 8 kue utuh pada Bingkai 10 (10 - 2 = 8).",
  },
  {
    id: 10,
    storyCharacter: "Malosi",
    prompt: "Manakah operasi pengurangan di bawah ini yang menghasilkan bilangan SAMA DENGAN 9 - 4?",
    visualType: "fact-family",
    paramA: 9,
    paramB: 4,
    options: ["8 - 3", "7 - 4", "10 - 3", "6 - 2"],
    correctAnswer: "8 - 3",
    explanation:
      "Hasil dari 9 - 4 adalah 5. Pada pilihan jawaban, 8 - 3 juga menghasilkan 5 (sedangkan 7 - 4 = 3, 10 - 3 = 7, dan 6 - 2 = 4).",
  },
];

function acak<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j] as T;
    copy[j] = temp as T;
  }
  return copy;
}

function pilihanAngka(benar: number, minVal = 0, maxVal = 10): string[] {
  const unik = new Set<number>([benar]);
  const kolam: number[] = [];
  for (let nilai = minVal; nilai <= maxVal; nilai += 1) {
    if (nilai !== benar) kolam.push(nilai);
  }
  for (const item of acak(kolam)) {
    if (unik.size < 4) unik.add(item);
  }
  return acak(Array.from(unik).map(String));
}

function buatSoalUjian(): ExamQuestion[] {
  const q1A = Math.floor(Math.random() * 4) + 6;
  const q1B = Math.floor(Math.random() * 3) + 2;
  const q1Ans = q1A - q1B;
  const q2A = Math.floor(Math.random() * 4) + 7;
  const q2B = Math.floor(Math.random() * 3) + 3;
  const q2Ans = q2A - q2B;
  const q3Start = Math.floor(Math.random() * 4) + 6;
  const q3Jump = Math.floor(Math.random() * 3) + 2;
  const q3Ans = q3Start - q3Jump;
  const q4B = Math.floor(Math.random() * 7) + 2;
  const q4Ans = 10 - q4B;
  const q5A = Math.floor(Math.random() * 3) + 7;
  const q5B = Math.floor(Math.random() * 3) + 3;
  const q5Ans = q5A - q5B;
  const q6A = Math.floor(Math.random() * 6) + 4;
  const q7A = Math.floor(Math.random() * 6) + 4;
  const q8Part1 = Math.floor(Math.random() * 4) + 3;
  const q8Part2 = Math.floor(Math.random() * 3) + 2;
  const q8Whole = q8Part1 + q8Part2;
  const q9Whole = Math.floor(Math.random() * 3) + 8;
  const q9Remain = Math.floor(Math.random() * 4) + 3;
  const q9Taken = q9Whole - q9Remain;
  const q10A = Math.floor(Math.random() * 2) + 8;
  const q10B = Math.floor(Math.random() * 4) + 2;
  const q10Ans = q10A - q10B;

  return [
    {
      id: 1,
      questionText: `Kira memiliki ${q1A} buah jeruk di keranjang. Sebanyak ${q1B} jeruk diberikan kepada Upe. Berapa sisa jeruk Kira sekarang? (${q1A} - ${q1B} = ...)`,
      visualType: "take-away",
      paramA: q1A,
      paramB: q1B,
      options: pilihanAngka(q1Ans, 1, 9),
      correctAnswer: String(q1Ans),
      explanation: `Dari ${q1A} jeruk diambil ${q1B} jeruk, menyisakan ${q1A} - ${q1B} = ${q1Ans} jeruk.`,
    },
    {
      id: 2,
      questionText: `Di kolam ada ${q2A} ekor bebek sedang berenang. Kemudian ${q2B} ekor bebek naik ke darat. Berapa ekor bebek yang masih di kolam?`,
      visualType: "take-away",
      paramA: q2A,
      paramB: q2B,
      options: pilihanAngka(q2Ans, 1, 9),
      correctAnswer: String(q2Ans),
      explanation: `Banyak bebek yang tersisa di kolam adalah ${q2A} - ${q2B} = ${q2Ans} ekor.`,
    },
    {
      id: 3,
      questionText: `Malosi berdiri di batu nomor ${q3Start}, lalu melompat MUNDUR ${q3Jump} langkah ke kiri. Di batu nomor berapakah Malosi berhenti? (${q3Start} - ${q3Jump} = ...)`,
      visualType: "jump-backward",
      paramA: q3Start,
      paramB: q3Jump,
      options: pilihanAngka(q3Ans, 1, 9),
      correctAnswer: String(q3Ans),
      explanation: `Menghitung mundur ${q3Jump} langkah dari ${q3Start} berhenti di angka ${q3Ans} (${q3Start} - ${q3Jump} = ${q3Ans}).`,
    },
    {
      id: 4,
      questionText: `Perhatikan Bingkai 10 yang awalnya berisi 10 keping penuh. Jika Tora mencoret ${q4B} keping, berapa keping yang tersisa? (10 - ${q4B} = ...)`,
      visualType: "ten-frame-cross",
      paramA: 10,
      paramB: q4B,
      options: pilihanAngka(q4Ans, 1, 9),
      correctAnswer: String(q4Ans),
      explanation: `Pasangan bilangan 10 dari ${q4B} adalah ${q4Ans}, sehingga 10 - ${q4B} = ${q4Ans}.`,
    },
    {
      id: 5,
      questionText: `Upe memiliki ${q5A} pensil warna dan Malosi memiliki ${q5B} pensil warna. Berapa SELISIH (beda banyak) pensil warna mereka? (${q5A} - ${q5B} = ...)`,
      visualType: "compare-difference",
      paramA: q5A,
      paramB: q5B,
      options: pilihanAngka(q5Ans, 1, 8),
      correctAnswer: String(q5Ans),
      explanation: `Selisih diperoleh dengan mengurangkan bilangan yang lebih banyak dengan yang lebih sedikit: ${q5A} - ${q5B} = ${q5Ans}.`,
    },
    {
      id: 6,
      questionText: `Di dalam stoples ada ${q6A} biskuit coklat. Belum ada satu pun biskuit yang dimakan (dikurangi 0). Berapakah hasil dari ${q6A} - 0?`,
      visualType: "take-away",
      paramA: q6A,
      paramB: 0,
      options: pilihanAngka(q6A, 0, 10),
      correctAnswer: String(q6A),
      explanation: `Bilangan berapa pun yang dikurangi 0 nilainya tidak berubah: ${q6A} - 0 = ${q6A}.`,
    },
    {
      id: 7,
      questionText: `Tora meletakkan ${q7A} balon di halaman, lalu ke-${q7A} balon tersebut terbang semuanya ke udara. Berapakah hasil dari ${q7A} - ${q7A}?`,
      visualType: "take-away",
      paramA: q7A,
      paramB: q7A,
      options: pilihanAngka(0, 0, 7),
      correctAnswer: "0",
      explanation: `Bilangan yang dikurangi dengan bilangan itu sendiri hasilnya habis atau 0 (${q7A} - ${q7A} = 0).`,
    },
    {
      id: 8,
      questionText: `Perhatikan Pasangan Bilangan! Diketahui ${q8Part1} + ${q8Part2} = ${q8Whole}. Maka hasil pengurangan dari ${q8Whole} - ${q8Part2} adalah...`,
      visualType: "fact-family",
      paramA: q8Whole,
      paramB: q8Part2,
      options: pilihanAngka(q8Part1, 1, 9),
      correctAnswer: String(q8Part1),
      explanation: `Berdasarkan hubungan penjumlahan dan pengurangan, karena ${q8Part1} + ${q8Part2} = ${q8Whole}, maka ${q8Whole} - ${q8Part2} = ${q8Part1}.`,
    },
    {
      id: 9,
      questionText: `Ibu membeli ${q9Whole} potong roti. Setelah dimakan keluarga, tersisa ${q9Remain} potong roti di meja. Berapa potong roti yang telah dimakan? (${q9Whole} - ... = ${q9Remain})`,
      visualType: "fact-family",
      paramA: q9Whole,
      paramB: q9Remain,
      options: pilihanAngka(q9Taken, 1, 8),
      correctAnswer: String(q9Taken),
      explanation: `Banyak roti yang dimakan adalah ${q9Whole} - ${q9Remain} = ${q9Taken} potong roti.`,
    },
    {
      id: 10,
      questionText: `Kira menyusun ${q10A} keping pada Bingkai 10, kemudian mengambil ${q10B} keping. Berapa keping Kira yang masih tertinggal? (${q10A} - ${q10B} = ...)`,
      visualType: "ten-frame-cross",
      paramA: q10A,
      paramB: q10B,
      options: pilihanAngka(q10Ans, 1, 9),
      correctAnswer: String(q10Ans),
      explanation: `Dari ${q10A} keping pada Bingkai 10 dicoret ${q10B} keping, menyisakan ${q10Ans} keping.`,
    },
  ];
}

function gambarBingkaiSepuluh(totalCount: number, crossedCount: number) {
  const amanTotal = Math.max(0, Math.min(10, totalCount));
  const amanCoret = Math.max(0, Math.min(amanTotal, crossedCount));
  const sisa = amanTotal - amanCoret;
  return (
    <svg viewBox="0 0 320 140" className="mx-auto w-full max-w-md" aria-hidden="true">
      <rect x="10" y="10" width="300" height="120" rx="12" fill="#fffbeb" stroke="#d97706" strokeWidth="4" />
      {Array.from({ length: 10 }).map((_, idx) => {
        const col = idx % 5;
        const row = Math.floor(idx / 5);
        const x = 10 + col * 60;
        const y = 10 + row * 60;
        const ada = idx < amanTotal;
        const dicoret = ada && idx >= sisa;
        return (
          <g key={idx}>
            <rect x={x} y={y} width="60" height="60" fill={dicoret ? "#fee2e2" : ada ? "#dcfce7" : "#ffffff"} stroke="#b45309" strokeWidth="2" />
            {ada ? <circle cx={x + 30} cy={y + 30} r="18" fill={dicoret ? "#f87171" : "#16a34a"} opacity={dicoret ? 0.55 : 1} /> : null}
            {dicoret ? (
              <g stroke="#991b1b" strokeWidth="4" strokeLinecap="round">
                <line x1={x + 14} y1={y + 14} x2={x + 46} y2={y + 46} />
                <line x1={x + 46} y1={y + 14} x2={x + 14} y2={y + 46} />
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function gambarPengurangan(
  type: VisualSubtractionType,
  paramA: number,
  paramB: number,
  sembunyikanHasil = false,
) {
  if (type === "ten-frame-cross") return gambarBingkaiSepuluh(paramA, paramB);
  if (type === "take-away") {
    const sisa = Math.max(0, paramA - paramB);
    return (
      <svg viewBox="0 0 380 125" className="mx-auto w-full max-w-md" aria-hidden="true">
        <rect x="10" y="12" width="360" height="100" rx="14" fill="#f8fafc" stroke="#64748b" strokeWidth="2.5" />
        <text x="190" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
          {sembunyikanHasil ? "Merah masih ada. Silang sudah diambil." : `Awal ${paramA} • Diambil ${paramB} • Sisa ${sisa}`}
        </text>
        {Array.from({ length: paramA }).map((_, idx) => {
          const cx = 36 + idx * 34;
          const cy = 78;
          const diambil = idx >= sisa;
          return (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="13" fill={diambil ? "#cbd5e1" : "#ef4444"} stroke="#991b1b" strokeWidth="2" />
              {diambil ? (
                <g stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round">
                  <line x1={cx - 10} y1={cy - 10} x2={cx + 10} y2={cy + 10} />
                  <line x1={cx + 10} y1={cy - 10} x2={cx - 10} y2={cy + 10} />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    );
  }
  if (type === "jump-backward") {
    const akhir = Math.max(0, paramA - paramB);
    return (
      <svg viewBox="0 0 380 120" className="mx-auto w-full max-w-md" aria-hidden="true">
        <line x1="20" y1="85" x2="360" y2="85" stroke="#334155" strokeWidth="4" />
        {Array.from({ length: 11 }).map((_, idx) => {
          const x = 24 + idx * 33;
          const mulai = idx === paramA;
          const sampai = !sembunyikanHasil && idx === akhir;
          return (
            <g key={idx}>
              <circle cx={x} cy="85" r={mulai || sampai ? 11 : 7} fill={mulai ? "#f59e0b" : sampai ? "#10b981" : "#cbd5e1"} stroke="#1e293b" strokeWidth="2" />
              <text x={x} y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{idx}</text>
            </g>
          );
        })}
        {sembunyikanHasil
          ? null
          : Array.from({ length: paramB }).map((_, langkah) => {
              const dari = 24 + (paramA - langkah) * 33;
              const ke = 24 + (paramA - langkah - 1) * 33;
              return (
                <path
                  key={langkah}
                  d={`M ${dari} 75 Q ${(dari + ke) / 2} 32 ${ke} 75`}
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
              );
            })}
        <text x="190" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9f1239">
          {sembunyikanHasil
            ? `Mulai di batu ${paramA}. Lompat mundur ${paramB} langkah.`
            : `Mulai di ${paramA}, lalu mundur ${paramB} langkah ke ${akhir}`}
        </text>
      </svg>
    );
  }
  if (type === "compare-difference") {
    const kolom = Math.max(paramA, paramB, 1);
    const selisih = Math.abs(paramA - paramB);
    return (
      <svg viewBox="0 0 360 150" className="mx-auto w-full max-w-md" aria-hidden="true">
        <rect x="5" y="5" width="350" height="140" rx="12" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="16" y="28" fontSize="12" fontWeight="bold" fill="#166534">Kelompok A ({paramA})</text>
        <text x="16" y="108" fontSize="12" fontWeight="bold" fill="#1e40af">Kelompok B ({paramB})</text>
        {Array.from({ length: kolom }).map((_, i) => {
          const cx = 130 + i * 22;
          const adaA = i < paramA;
          const adaB = i < paramB;
          const lebih = adaA !== adaB;
          return (
            <g key={i}>
              {adaA && adaB ? <line x1={cx} y1="40" x2={cx} y2="96" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" /> : null}
              {adaA ? <circle cx={cx} cy="42" r="8" fill={lebih ? "#f59e0b" : "#16a34a"} stroke="#0f172a" strokeWidth="1.5" /> : null}
              {adaB ? <circle cx={cx} cy="96" r="8" fill={lebih ? "#f59e0b" : "#2563eb"} stroke="#0f172a" strokeWidth="1.5" /> : null}
            </g>
          );
        })}
        <text x="180" y="136" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
          {sembunyikanHasil ? "Pasangkan satu lawan satu. Hitung yang tidak punya pasangan." : `Selisih ${Math.max(paramA, paramB)} - ${Math.min(paramA, paramB)} = ${selisih}`}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 135" className="mx-auto w-full max-w-sm" aria-hidden="true">
      <line x1="150" y1="38" x2="90" y2="98" stroke="#475569" strokeWidth="4" />
      <line x1="150" y1="38" x2="210" y2="98" stroke="#475569" strokeWidth="4" />
      <circle cx="150" cy="38" r="28" fill="#fde047" stroke="#ca8a04" strokeWidth="4" />
      <text x="150" y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">{paramA}</text>
      <circle cx="90" cy="98" r="25" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" />
      <text x="90" y="105" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">{paramB}</text>
      <circle cx="210" cy="98" r="25" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" />
      <text x="210" y="105" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#881337">
        {sembunyikanHasil ? "?" : Math.max(0, paramA - paramB)}
      </text>
    </svg>
  );
}

function formatStopwatch(deci: number) {
  const totalDetik = Math.floor(deci / 10);
  const menit = String(Math.floor(totalDetik / 60)).padStart(2, "0");
  const detik = String(totalDetik % 60).padStart(2, "0");
  return `${menit}:${detik}.${deci % 10}`;
}

function kalimatSelisih(kiri: number, kanan: number) {
  if (kiri >= kanan) return `${kiri} - ${kanan} = ${kiri - kanan}`;
  return `${kanan} - ${kiri} = ${kanan - kiri}`;
}

export default function MatematikaKelas1Bab3({
  studentId = "SISWA-K1-DEMO",
  studentName = "Sahabat Cilik IGIL",
  completedOtherChapters = DEFAULT_CROSS_CHAPTERS,
  onChapterComplete,
}: IGILModuleProps) {
  const [activeCard, setActiveCard] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [card2Unlocked, setCard2Unlocked] = useState(false);
  const [card5Unlocked, setCard5Unlocked] = useState(false);
  const [card6Unlocked, setCard6Unlocked] = useState(false);
  const [practiceTokens, setPracticeTokens] = useState(0);
  const [examTokens, setExamTokens] = useState(0);
  const [practicumTokens, setPracticumTokens] = useState(0);
  const totalTokens = practiceTokens + examTokens + practicumTokens;

  const [poppedBalloonIds, setPoppedBalloonIds] = useState<number[]>([]);
  const [activeSubChapter, setActiveSubChapter] = useState<"A" | "B" | "C" | "D">("A");
  const [subATotalApples, setSubATotalApples] = useState(8);
  const [subATakenApples, setSubATakenApples] = useState(3);
  const [subBStartStone, setSubBStartStone] = useState(9);
  const [subBBackSteps, setSubBBackSteps] = useState(4);
  const [subCCrossedFromTen, setSubCCrossedFromTen] = useState(4);
  const [subCCompareGroupA, setSubCCompareGroupA] = useState(8);
  const [subCCompareGroupB, setSubCCompareGroupB] = useState(5);
  const [subDFactPartA, setSubDFactPartA] = useState(6);
  const [subDFactPartB, setSubDFactPartB] = useState(4);

  const [labInitialCount, setLabInitialCount] = useState(10);
  const [labCrossOutCount, setLabCrossOutCount] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const menggambarRef = useRef(false);
  const goresanRef = useRef(0);
  const stempelRef = useRef<CanvasStampItem[]>([]);
  const [brushColor, setBrushColor] = useState("#dc2626");
  const [canvasStrokeCount, setCanvasStrokeCount] = useState(0);
  const [canvasStamps, setCanvasStamps] = useState<CanvasStampItem[]>([]);
  stempelRef.current = canvasStamps;

  const [currentPracticeIdx, setCurrentPracticeIdx] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const claimedRef = useRef<number[]>([]);

  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>(() => buatSoalUjian());
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [examAttempts, setExamAttempts] = useState(1);
  const [examStartTime, setExamStartTime] = useState(() => Date.now());
  const [examElapsedDeci, setExamElapsedDeci] = useState(0);
  const [focusLossCount, setFocusLossCount] = useState(0);
  const [dwellTimeWarning, setDwellTimeWarning] = useState(false);
  const examTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ujianBerjalanRef = useRef(false);
  const fokusTerakhirRef = useRef(0);

  const [practicumMode, setPracticumMode] = useState<"single" | "cross4">("cross4");
  const [harvestInitialTen] = useState(10);
  const [sharedToNeighbors, setSharedToNeighbors] = useState(4);
  const [upeBasketCount, setUpeBasketCount] = useState(3);
  const [fallenLeavesCleaned, setFallenLeavesCleaned] = useState(5);
  const [studentReportText, setStudentReportText] = useState("");
  const [practicumRubric, setPracticumRubric] = useState<PracticumEvaluationRubric | null>(null);
  const [chapterCompletedFlag, setChapterCompletedFlag] = useState(false);

  const playSound = useCallback((type: SoundType) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const bunyi = (freq: number, oscType: OscillatorType, start: number, duration: number, gainVal = 0.12) => {
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
      if (type === "click") bunyi(520, "sine", now, 0.06, 0.1);
      else if (type === "pop") {
        bunyi(640, "triangle", now, 0.07, 0.15);
        bunyi(320, "sine", now + 0.04, 0.09, 0.12);
      } else if (type === "laser") {
        bunyi(860, "sawtooth", now, 0.12, 0.08);
        bunyi(430, "sine", now + 0.06, 0.12, 0.1);
      } else if (type === "coin") {
        bunyi(987.77, "sine", now, 0.09, 0.15);
        bunyi(1318.51, "sine", now + 0.09, 0.25, 0.15);
      } else if (type === "wrong") {
        bunyi(220, "sawtooth", now, 0.18, 0.12);
        bunyi(165, "sawtooth", now + 0.15, 0.25, 0.12);
      } else {
        bunyi(523.25, "triangle", now, 0.12, 0.15);
        bunyi(659.25, "triangle", now + 0.12, 0.12, 0.15);
        bunyi(783.99, "triangle", now + 0.24, 0.12, 0.15);
        bunyi(1046.5, "triangle", now + 0.36, 0.35, 0.18);
      }
      window.setTimeout(() => void ctx.close(), 1200);
    } catch {
      // Browser boleh menolak audio sebelum ketukan pertama.
    }
  }, []);

  const speakIGIL = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Suara perangkat tidak tersedia.
    }
  }, []);

  useEffect(() => {
    if (activeCard !== 5 || examSubmitted) return;
    if (ujianBerjalanRef.current) return;
    ujianBerjalanRef.current = true;
    setExamStartTime(Date.now());
    setExamElapsedDeci(0);
  }, [activeCard, examSubmitted]);

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
    const catatPindah = () => {
      const sekarang = Date.now();
      if (sekarang - fokusTerakhirRef.current < 800) return;
      fokusTerakhirRef.current = sekarang;
      setFocusLossCount((prev) => prev + 1);
      playSound("wrong");
    };
    const saatTersembunyi = () => {
      if (document.hidden) catatPindah();
    };
    document.addEventListener("visibilitychange", saatTersembunyi);
    window.addEventListener("blur", catatPindah);
    return () => {
      document.removeEventListener("visibilitychange", saatTersembunyi);
      window.removeEventListener("blur", catatPindah);
    };
  }, [activeCard, examSubmitted, playSound]);

  const drawCanvasGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (activeCard !== 3) return;
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    drawCanvasGrid(ctx, kanvas.width, kanvas.height);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#0f172a";
    for (const stempel of stempelRef.current) ctx.fillText(stempel.symbol, stempel.x, stempel.y);
  }, [activeCard, drawCanvasGrid]);

  const koordinatKanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return null;
    const kotak = kanvas.getBoundingClientRect();
    if (kotak.width === 0 || kotak.height === 0) return null;
    return {
      x: ((e.clientX - kotak.left) * kanvas.width) / kotak.width,
      y: ((e.clientY - kotak.top) * kanvas.height) / kotak.height,
    };
  };

  const mulaiGambar = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    const titik = koordinatKanvas(e);
    if (!kanvas || !titik) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    kanvas.setPointerCapture(e.pointerId);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(titik.x, titik.y);
    menggambarRef.current = true;
  };

  const geserGambar = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!menggambarRef.current) return;
    const kanvas = canvasRef.current;
    const titik = koordinatKanvas(e);
    if (!kanvas || !titik) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(titik.x, titik.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(titik.x, titik.y);
    goresanRef.current += 1;
    if (goresanRef.current % 6 === 0) setCanvasStrokeCount(goresanRef.current);
  };

  const selesaiGambar = () => {
    if (!menggambarRef.current) return;
    menggambarRef.current = false;
    setCanvasStrokeCount(goresanRef.current);
  };

  const addCanvasStamp = (symbol: string, label: string) => {
    playSound("pop");
    const x = 45 + ((canvasStamps.length * 48) % 440);
    const y = 55 + Math.floor((canvasStamps.length * 48) / 440) * 55;
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (ctx) {
      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText(symbol, x, y);
    }
    const berikutnya = [...canvasStamps, { id: `${Date.now()}-${canvasStamps.length}`, x, y, symbol, label }];
    stempelRef.current = berikutnya;
    setCanvasStamps(berikutnya);
    goresanRef.current += 5;
    setCanvasStrokeCount(goresanRef.current);
  };

  const clearSmartCanvas = () => {
    playSound("click");
    menggambarRef.current = false;
    goresanRef.current = 0;
    stempelRef.current = [];
    setCanvasStamps([]);
    setCanvasStrokeCount(0);
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (kanvas && ctx) drawCanvasGrid(ctx, kanvas.width, kanvas.height);
  };

  const handlePopBalloon = (id: number) => {
    if (poppedBalloonIds.includes(id) || poppedBalloonIds.length >= 3) return;
    const nextPopped = [...poppedBalloonIds, id];
    setPoppedBalloonIds(nextPopped);
    if (nextPopped.length === 3) {
      setCard2Unlocked(true);
      playSound("fanfare");
      speakIGIL("Hebat! Dari 8 balon, kamu meletuskan 3. Sisa 8 dikurangi 3 sama dengan 5. Kartu materi sudah terbuka.");
    } else {
      playSound("pop");
    }
  };

  const handleSelectPracticeAnswer = (question: PracticeQuestion, selected: string) => {
    const updatedAnswers = { ...practiceAnswers, [question.id]: selected };
    setPracticeAnswers(updatedAnswers);
    if (selected === question.correctAnswer) {
      playSound("coin");
      if (!claimedRef.current.includes(question.id)) {
        claimedRef.current = [...claimedRef.current, question.id];
        setPracticeTokens((prev) => Math.min(30, prev + 3));
      }
    } else {
      playSound("wrong");
    }
    if (Object.keys(updatedAnswers).length === PRACTICE_QUESTIONS.length) setCard5Unlocked(true);
  };

  const handleSelectExamAnswer = (questionId: number, option: string) => {
    if (examSubmitted) return;
    playSound("click");
    setExamAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitExam = () => {
    if (Object.keys(examAnswers).length < examQuestions.length) {
      playSound("wrong");
      speakIGIL("Ayo jawab seluruh 10 soal ujian terlebih dahulu sebelum dikumpulkan.");
      return;
    }
    const durationSeconds = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    const isHumanTiming = durationSeconds >= 25;
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) correctCount += 1;
    });
    const calculatedScore = correctCount * 10;
    setExamScore(calculatedScore);
    setExamSubmitted(true);
    if (!isHumanTiming) {
      setDwellTimeWarning(true);
      playSound("wrong");
      speakIGIL("Pengerjaanmu kurang dari 25 detik. Baca setiap soal dengan tenang, lalu ulangi ujian.");
      return;
    }
    setDwellTimeWarning(false);
    if (calculatedScore === 100) {
      setExamTokens(70);
      setCard6Unlocked(true);
      playSound("fanfare");
      speakIGIL("Nilai kamu 100. Gerbang praktikum sudah terbuka.");
    } else {
      playSound("wrong");
      speakIGIL(`Nilai kamu ${calculatedScore}. Ulangi ujian dengan soal baru sampai nilainya 100.`);
    }
  };

  const handleRetryExam = () => {
    playSound("laser");
    ujianBerjalanRef.current = true;
    setExamAttempts((prev) => prev + 1);
    setExamQuestions(buatSoalUjian());
    setExamAnswers({});
    setCurrentExamIdx(0);
    setExamSubmitted(false);
    setExamScore(0);
    setDwellTimeWarning(false);
    setExamStartTime(Date.now());
    setExamElapsedDeci(0);
  };

  const susunLaporan = () => {
    const sisa = harvestInitialTen - sharedToNeighbors;
    const daunSisa = 5 - fallenLeavesCleaned;
    const kalimatDaun =
      daunSisa === 0
        ? `Kami membersihkan 5 daun gugur sebanyak ${fallenLeavesCleaned} daun sehingga sisanya 5 - ${fallenLeavesCleaned} = 0.`
        : `Kami membersihkan 5 daun gugur sebanyak ${fallenLeavesCleaned} daun sehingga sisanya 5 - ${fallenLeavesCleaned} = ${daunSisa}.`;
    return `Saya bersama Kira, Upe, Malosi, dan Tora mengelola panen kebun sekolah. Dari ${harvestInitialTen} apel di Bingkai 10, kami berbagi ${sharedToNeighbors} apel kepada tetangga sehingga sisa apel Kira adalah ${harvestInitialTen} - ${sharedToNeighbors} = ${sisa} apel. Selisih sisa apel Kira dengan keranjang Upe adalah ${kalimatSelisih(sisa, upeBasketCount)}. ${kalimatDaun}`;
  };

  const handleEvaluatePracticum = () => {
    const sisaKira = harvestInitialTen - sharedToNeighbors;
    const selisih = sisaKira - upeBasketCount;
    const sisaDaun = 5 - fallenLeavesCleaned;
    const reportWords = studentReportText.trim().split(/\s+/).filter(Boolean).length;
    if (reportWords < 8) {
      playSound("wrong");
      speakIGIL("Tuliskan laporan minimal 8 kata, atau gunakan tombol bantu susun kalimat.");
      return;
    }
    let accuracyScore = 120;
    if (sharedToNeighbors === 4 && sisaKira === 6) accuracyScore += 70;
    if (selisih === 3) accuracyScore += 60;
    if (sisaDaun === 0) accuracyScore += 50;
    accuracyScore = Math.min(300, accuracyScore);

    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const lowerReport = studentReportText.toLowerCase();
    if (lowerReport.includes("apel") || lowerReport.includes("panen") || lowerReport.includes("daun")) synthesisScore += 30;
    if (lowerReport.includes("tetangga") || lowerReport.includes("berbagi") || lowerReport.includes("selisih")) synthesisScore += 30;
    if (lowerReport.includes("-") || lowerReport.includes("sisa") || lowerReport.includes("0")) synthesisScore += 30;
    synthesisScore = Math.min(250, synthesisScore);

    let optimizationVisualScore = 100;
    if (sisaKira === 6 && upeBasketCount === 3) optimizationVisualScore += 50;
    if (fallenLeavesCleaned === 5) optimizationVisualScore += 50;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);

    let reasoningReportScore = Math.min(180, reportWords * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (lowerReport.includes("sehingga") || lowerReport.includes("karena") || lowerReport.includes("selisih")) reasoningReportScore += 30;
    reasoningReportScore = Math.min(250, reasoningReportScore);

    const totalQualityScore = accuracyScore + synthesisScore + optimizationVisualScore + reasoningReportScore;
    const rubricResult: PracticumEvaluationRubric = {
      accuracyScore,
      synthesisScore,
      optimizationVisualScore,
      reasoningReportScore,
      totalQualityScore,
      aiFeedbackSummary:
        totalQualityScore >= 850
          ? "Karya praktikum istimewa. Kamu memadukan pengurangan dari 10 (10 - 4 = 6), selisih dua keranjang (6 - 3 = 3), dan pembersihan habis (5 - 5 = 0) dalam laporan yang runtut."
          : "Rancangan kebun sudah berjalan. Untuk skor yang lebih tinggi, bagikan tepat 4 apel (10 - 4 = 6), isi keranjang Upe 3 apel (6 - 3 = 3), dan bersihkan seluruh 5 daun (5 - 5 = 0).",
    };
    setPracticumRubric(rubricResult);
    setPracticumTokens(50);
    setChapterCompletedFlag(true);
    playSound("fanfare");
    const tokenBab = Math.min(150, practiceTokens + examTokens + 50);
    speakIGIL(`Selamat ${studentName}! Skor karyamu ${totalQualityScore} dari 1000. Token bab ini sekarang ${tokenBab}.`);
    onChapterComplete?.({
      chapterId: CHAPTER_COMPETENCY_METADATA.chapterId,
      studentId,
      practiceTokensEarned: practiceTokens,
      examTokensEarned: examTokens,
      practicumTokensEarned: 50,
      totalChapterTokens: tokenBab,
      examScore: examTokens === 70 ? 100 : examScore,
      practicumRubric: rubricResult,
      telemetry: {
        attemptCount: examAttempts,
        examDurationSeconds: Math.max(1, Math.round(examElapsedDeci / 10)),
        tabSwitchCount: focusLossCount,
        isHumanTimingValid: examTokens === 70,
        completedAtISO: new Date().toISOString(),
      },
    });
  };

  const kartu = [
    { id: 1 as const, label: "1. Silabus & Hook", icon: "🗺️", unlocked: true },
    { id: 2 as const, label: "2. Game Materi", icon: "🎮", unlocked: card2Unlocked },
    { id: 3 as const, label: "3. Lab & Kanvas", icon: "🔬", unlocked: card2Unlocked },
    { id: 4 as const, label: "4. Latihan (+30)", icon: "🎯", unlocked: card2Unlocked },
    { id: 5 as const, label: "5. Ujian (+70)", icon: "🏆", unlocked: card5Unlocked },
    { id: 6 as const, label: "6. Praktikum (+50)", icon: "🎨", unlocked: card6Unlocked },
  ];
  const soalLatihan = PRACTICE_QUESTIONS[currentPracticeIdx];
  const jawabanLatihan = soalLatihan ? practiceAnswers[soalLatihan.id] : undefined;
  const soalUjian = examQuestions[currentExamIdx];
  const jawabanUjian = soalUjian ? examAnswers[soalUjian.id] : undefined;
  const utuh = subDFactPartA + subDFactPartB;
  const sisaPanen = harvestInitialTen - sharedToNeighbors;
  const selisihPanen = sisaPanen - upeBasketCount;
  const sisaDaun = 5 - fallenLeavesCleaned;
  const kelompokB = Math.min(subCCompareGroupB, subCCompareGroupA);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/30 to-emerald-50 p-3 font-sans text-slate-800 md:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-sky-200 bg-white p-4 shadow-md md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-100">
              <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden="true">
                <ellipse cx="40" cy="46" rx="24" ry="26" fill="#92400e" />
                <ellipse cx="40" cy="50" rx="16" ry="18" fill="#fef3c7" />
                <circle cx="30" cy="34" r="10" fill="#ffffff" stroke="#78350f" strokeWidth="2.5" />
                <circle cx="50" cy="34" r="10" fill="#ffffff" stroke="#78350f" strokeWidth="2.5" />
                <circle cx="30" cy="34" r="5" fill="#1e293b" />
                <circle cx="50" cy="34" r="5" fill="#1e293b" />
                <circle cx="32" cy="32" r="2" fill="#ffffff" />
                <circle cx="52" cy="32" r="2" fill="#ffffff" />
                <polygon points="40,38 35,46 45,46" fill="#f59e0b" />
                <polygon points="22,18 32,24 26,12" fill="#78350f" />
                <polygon points="58,18 48,24 54,12" fill="#78350f" />
                <polygon points="40,8 22,16 40,22 58,16" fill="#1e3a8a" />
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-extrabold text-white">KELAS 1 SD • BAB 3</span>
                <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">IGIL, Kira, Upe, Malosi, Tora</span>
              </div>
              <h1 className="mt-0.5 text-lg font-black text-slate-900 md:text-xl">{CHAPTER_COMPETENCY_METADATA.chapterTitle}</h1>
              <p className="text-xs text-slate-500">{CHAPTER_COMPETENCY_METADATA.textbookReference}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border-b-4 border-slate-700 bg-slate-900 px-4 py-2.5 text-white">
            <div className="text-right">
              <div className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">Dompet Kualifikasi Bab</div>
              <div className="text-xl font-black text-amber-400">{totalTokens} <span className="text-xs text-slate-300">/ 150 Token</span></div>
              <div className="text-[10px] text-slate-300">Latihan {practiceTokens}/30 • Ujian {examTokens}/70 • Praktikum {practicumTokens}/50</div>
            </div>
            <button
              type="button"
              onClick={() => speakIGIL(`Halo ${studentName}! Di Bab 3 kita mencari sisa, menghitung mundur, dan menemukan selisih bersama Kira, Upe, Malosi, dan Tora.`)}
              className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950"
            >
              Suara IGIL
            </button>
          </div>
        </header>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {kartu.map((tab) => (
            <button
              key={tab.id}
              type="button"
              disabled={!tab.unlocked}
              onClick={() => {
                playSound("click");
                setActiveCard(tab.id);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-2xl border-b-4 px-3 py-2.5 text-xs font-extrabold md:text-sm ${
                !tab.unlocked
                  ? "cursor-not-allowed border-slate-300 bg-slate-200 text-slate-400"
                  : activeCard === tab.id
                    ? "border-sky-800 bg-sky-600 text-white shadow-md"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-sky-50"
              }`}
            >
              <span>{tab.unlocked ? tab.icon : "🔒"}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </nav>

        {activeCard === 1 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 md:flex-row md:items-center">
              <div>
                <span className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">Referensi Buku Kemendikbudristek</span>
                <h2 className="text-lg font-black text-slate-900">Matematika Kelas I — Bab 3: Pengurangan sampai dengan 10 (Halaman 61–90)</h2>
                <p className="mt-0.5 text-xs text-slate-600">Petualangan bersama Kira, Upe, Malosi, dan Tora, dipandu IGIL si burung hantu.</p>
              </div>
              <button
                type="button"
                onClick={() => speakIGIL("Di Bab 3 kita belajar cerita pengurangan, menghitung mundur, pengurangan dari 10, mencari selisih, dan hubungan penjumlahan dengan pengurangan.")}
                className="shrink-0 rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-bold text-white"
              >
                Dengarkan silabus
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="text-sm font-black text-amber-950">Peta 4 bagian pengurangan</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian A (Hal. 62–69):</strong> cerita pengambilan benda bersama Kira.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian B (Hal. 70–77):</strong> hitung mundur dan pasangan bilangan bersama Upe.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian C (Hal. 78–83):</strong> pengurangan dari 10 dan selisih bersama Malosi.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian D (Hal. 84–90):</strong> pengurangan dengan 0 dan keluarga fakta bersama Tora.</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Dua gerbang bab ini</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5">
                    <span className="font-black text-sky-700">Gerbang 1 — 10 latihan dan ujian 100.</span>
                    <p className="mt-0.5">Sepuluh latihan memberi paling banyak 30 token. Ujian wajib 100 untuk 70 token. Waktu tidak menentukan pemenang, hanya agar soal dibaca dengan sungguh-sungguh.</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5">
                    <span className="font-black text-emerald-700">Gerbang 2 — praktikum 50 token.</span>
                    <p className="mt-0.5">Skor karya dihitung di perangkat ini: akurasi 300, sintesis 250, visual 200, dan laporan 250. Jumlah paling tinggi 1.000 poin.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border-b-4 border-slate-950 bg-gradient-to-r from-rose-900 via-indigo-900 to-slate-900 p-5 text-white">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Teka-teki pembuka</span>
                  <h3 className="mt-1 text-base font-black md:text-lg">Meletuskan 3 balon dari 8 balon Malosi</h3>
                  <p className="text-xs text-rose-200">Sentuh 3 balon. Sisa balon membuka kartu materi, lab, dan latihan.</p>
                </div>
                <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center">
                  <div className="text-xs font-bold text-amber-300">Persamaan balon</div>
                  <div className="text-2xl font-black text-amber-400">8 - {poppedBalloonIds.length} = {8 - poppedBalloonIds.length}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2.5 rounded-2xl border border-rose-700/60 bg-slate-950/50 p-4 sm:grid-cols-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
                  const meletus = poppedBalloonIds.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handlePopBalloon(id)}
                      className={`flex h-16 flex-col items-center justify-center rounded-2xl border-b-4 text-xs font-black ${
                        meletus ? "border-slate-900 bg-slate-800 text-rose-300" : "border-rose-700 bg-rose-500 text-white"
                      }`}
                    >
                      <span className="text-xl">{meletus ? "💥" : "🎈"}</span>
                      <span>{meletus ? "Meletus" : `Balon ${id}`}</span>
                    </button>
                  );
                })}
              </div>
              {card2Unlocked ? (
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-400 bg-emerald-500/20 p-3 sm:flex-row">
                  <p className="text-xs font-bold text-emerald-100 md:text-sm">8 dikurangi 3 menyisakan 5 balon. Kartu 2, 3, dan 4 sudah terbuka.</p>
                  <button type="button" onClick={() => { playSound("pop"); setActiveCard(2); }} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">
                    Lanjut ke materi
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {activeCard === 2 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 2 • Eksplorasi, bukan ujian</span>
                <h2 className="text-lg font-black text-slate-900">Empat cara mengurangi bersama Kira, Upe, Malosi, dan Tora</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["A", "A. Sisa (Kira)"],
                  ["B", "B. Mundur (Upe)"],
                  ["C", "C. Sepuluh & selisih"],
                  ["D", "D. Nol & pasangan"],
                ].map(([kode, judul]) => (
                  <button
                    key={kode}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setActiveSubChapter(kode as "A" | "B" | "C" | "D");
                    }}
                    className={`rounded-xl border-b-4 px-3 py-2 text-xs font-extrabold ${
                      activeSubChapter === kode ? "border-amber-600 bg-amber-400 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {judul}
                  </button>
                ))}
              </div>
            </div>

            {activeSubChapter === "A" ? (
              <div className="space-y-4 rounded-2xl border-2 border-rose-200 bg-rose-50/60 p-4">
                <h3 className="text-base font-black text-rose-950">Apel Kira: diambil, lalu dihitung sisanya</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-rose-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-rose-900">Apel mula-mula: {subATotalApples}</span>
                    <span className="flex gap-1.5">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 text-sm font-black" onClick={() => { playSound("pop"); const next = Math.max(1, subATotalApples - 1); setSubATotalApples(next); setSubATakenApples((t) => Math.min(t, next)); }}>-</button>
                      <button type="button" className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-black text-white" onClick={() => { playSound("pop"); setSubATotalApples((v) => Math.min(10, v + 1)); }}>+</button>
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-amber-900">Apel diambil: {subATakenApples}</span>
                    <span className="flex gap-1.5">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 text-sm font-black" onClick={() => { playSound("pop"); setSubATakenApples((t) => Math.max(0, t - 1)); }}>-</button>
                      <button type="button" className="rounded-lg bg-amber-500 px-3 py-1 text-sm font-black text-white" onClick={() => { playSound("pop"); setSubATakenApples((t) => Math.min(subATotalApples, t + 1)); }}>+</button>
                    </span>
                  </div>
                </div>
                {gambarPengurangan("take-away", subATotalApples, subATakenApples)}
                <div className="rounded-2xl border-2 border-rose-300 bg-white p-3.5 text-center">
                  <div className="text-xs font-bold text-slate-500">Kalimat Kira</div>
                  <div className="mt-0.5 text-2xl font-black text-slate-900">{subATotalApples} - {subATakenApples} = {subATotalApples - subATakenApples}</div>
                  <p className="mt-1 text-xs text-slate-600">{subATotalApples} dikurangi {subATakenApples} sama dengan {subATotalApples - subATakenApples}.</p>
                </div>
              </div>
            ) : null}

            {activeSubChapter === "B" ? (
              <div className="space-y-4 rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-4">
                <h3 className="text-base font-black text-sky-950">Upe melompat mundur di garis bilangan</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-amber-900">Mulai di batu: {subBStartStone}</span>
                    <span className="flex gap-1.5">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 text-sm font-black" onClick={() => { playSound("click"); const next = Math.max(1, subBStartStone - 1); setSubBStartStone(next); setSubBBackSteps((s) => Math.min(s, next)); }}>-</button>
                      <button type="button" className="rounded-lg bg-amber-400 px-3 py-1 text-sm font-black" onClick={() => { playSound("click"); setSubBStartStone((v) => Math.min(10, v + 1)); }}>+</button>
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-rose-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-rose-900">Lompat mundur: {subBBackSteps}</span>
                    <span className="flex gap-1.5">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 text-sm font-black" onClick={() => { playSound("click"); setSubBBackSteps((s) => Math.max(0, s - 1)); }}>-</button>
                      <button type="button" className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-black text-white" onClick={() => { playSound("click"); setSubBBackSteps((s) => Math.min(subBStartStone, s + 1)); }}>+</button>
                    </span>
                  </div>
                </div>
                {gambarPengurangan("jump-backward", subBStartStone, subBBackSteps)}
                <div className="rounded-2xl border border-sky-300 bg-white p-3 text-center text-sm font-black text-sky-950">
                  Dari {subBStartStone}, mundur {subBBackSteps} langkah, berhenti di <span className="text-lg text-emerald-700">{subBStartStone - subBBackSteps}</span>.
                </div>
              </div>
            ) : null}

            {activeSubChapter === "C" ? (
              <div className="space-y-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
                <h3 className="text-base font-black text-emerald-950">Malosi: kurangi dari 10, lalu cari selisih</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-emerald-300 bg-white p-3.5">
                    <label className="flex items-center justify-between text-xs font-extrabold text-emerald-900">
                      Dicoret dari 10: {subCCrossedFromTen}
                      <input type="range" min={0} max={10} value={subCCrossedFromTen} onChange={(e) => setSubCCrossedFromTen(Number(e.target.value))} className="w-28 accent-rose-600" />
                    </label>
                    {gambarBingkaiSepuluh(10, subCCrossedFromTen)}
                    <div className="text-center text-sm font-black text-emerald-900">10 - {subCCrossedFromTen} = {10 - subCCrossedFromTen}</div>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-sky-300 bg-white p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                      <span>Kelompok A: {subCCompareGroupA}</span>
                      <input type="range" min={1} max={10} value={subCCompareGroupA} onChange={(e) => { const next = Number(e.target.value); setSubCCompareGroupA(next); setSubCCompareGroupB((b) => Math.min(b, next)); }} className="w-20 accent-emerald-600" />
                      <span>Kelompok B: {kelompokB}</span>
                      <input type="range" min={0} max={subCCompareGroupA} value={kelompokB} onChange={(e) => setSubCCompareGroupB(Number(e.target.value))} className="w-20 accent-sky-600" />
                    </div>
                    {gambarPengurangan("compare-difference", subCCompareGroupA, kelompokB)}
                    <div className="text-center text-sm font-black text-sky-900">Selisih: {kalimatSelisih(subCCompareGroupA, kelompokB)}</div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSubChapter === "D" ? (
              <div className="space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 p-4">
                <h3 className="text-base font-black text-purple-950">Tora: satu pasangan, empat kalimat</h3>
                <p className="text-xs text-slate-600">Ubah dua bagian. Jumlahnya tidak lebih dari 10. Pengurangan adalah kebalikan penjumlahan.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-purple-300 bg-white p-2.5 text-xs font-bold">
                    <span>Kiri ({subDFactPartA})</span>
                    <button type="button" className="rounded bg-slate-200 px-2.5 py-0.5 font-black" onClick={() => setSubDFactPartA((v) => Math.max(0, v - 1))}>-</button>
                    <button type="button" className="rounded bg-purple-600 px-2.5 py-0.5 font-black text-white" onClick={() => setSubDFactPartA((v) => Math.min(10 - subDFactPartB, v + 1))}>+</button>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-purple-300 bg-white p-2.5 text-xs font-bold">
                    <span>Kanan ({subDFactPartB})</span>
                    <button type="button" className="rounded bg-slate-200 px-2.5 py-0.5 font-black" onClick={() => setSubDFactPartB((v) => Math.max(0, v - 1))}>-</button>
                    <button type="button" className="rounded bg-purple-600 px-2.5 py-0.5 font-black text-white" onClick={() => setSubDFactPartB((v) => Math.min(10 - subDFactPartA, v + 1))}>+</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
                  <div className="space-y-1 rounded-2xl border border-emerald-300 bg-white p-3 text-center">
                    <div className="text-xs font-bold text-emerald-700">Penjumlahan</div>
                    <div className="text-lg font-black">{subDFactPartA} + {subDFactPartB} = {utuh}</div>
                    <div className="text-sm font-bold text-slate-600">{subDFactPartB} + {subDFactPartA} = {utuh}</div>
                  </div>
                  <div className="rounded-2xl bg-purple-900 p-3.5 text-center text-white">
                    <div className="text-xs font-bold text-amber-300">Bilangan utuh</div>
                    <div className="text-3xl font-black text-amber-400">{utuh}</div>
                    <div className="mt-1 text-xs text-purple-200">Juga: {utuh} - 0 = {utuh} dan {utuh} - {utuh} = 0</div>
                  </div>
                  <div className="space-y-1 rounded-2xl border border-rose-300 bg-white p-3 text-center">
                    <div className="text-xs font-bold text-rose-700">Pengurangan</div>
                    <div className="text-lg font-black">{utuh} - {subDFactPartB} = {subDFactPartA}</div>
                    <div className="text-sm font-bold text-slate-600">{utuh} - {subDFactPartA} = {subDFactPartB}</div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="space-y-2 rounded-2xl border-b-4 border-slate-950 bg-slate-900 p-4 text-white">
              <div className="text-xs font-extrabold tracking-wider text-amber-400 uppercase">Poin penting Bab 3</div>
              <div className="grid grid-cols-1 gap-2 text-xs text-slate-200 md:grid-cols-2">
                <p>Tanda kurang dipakai untuk mencari sisa benda yang diambil, atau selisih dua kelompok.</p>
                <p>Hitung mundur: mulai dari bilangan pertama, lalu melangkah ke kiri sebanyak bilangan pengurang.</p>
                <p>Dikurangi 0, hasilnya tetap. Dikurangi bilangan yang sama, hasilnya 0.</p>
                <p>Jika 4 + 6 = 10, maka 10 - 6 = 4 dan 10 - 4 = 6.</p>
              </div>
              <button type="button" onClick={() => speakIGIL("Pengurangan mencari sisa atau selisih. Dikurangi nol hasilnya tetap. Dikurangi bilangan yang sama hasilnya nol.")} className="rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">
                Dengarkan poin penting
              </button>
            </div>
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div>
              <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 3 • Lab dan papan berpetak</span>
              <h2 className="text-lg font-black text-slate-900">Mesin coret Bingkai 10 dan kanvas pengurangan</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Atur keping hijau, lalu coret sebagian</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-emerald-300 bg-white p-3 text-center">
                    <div className="font-bold text-emerald-800">Jumlah awal</div>
                    <div className="my-1 text-2xl font-black text-emerald-600">{labInitialCount}</div>
                    <div className="flex justify-center gap-2">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 font-black" onClick={() => { playSound("click"); const next = Math.max(0, labInitialCount - 1); setLabInitialCount(next); setLabCrossOutCount((c) => Math.min(c, next)); }}>-</button>
                      <button type="button" className="rounded-lg bg-emerald-600 px-3 py-1 font-black text-white" onClick={() => { playSound("click"); setLabInitialCount((v) => Math.min(10, v + 1)); }}>+</button>
                    </div>
                  </div>
                  <div className="rounded-xl border border-rose-300 bg-white p-3 text-center">
                    <div className="font-bold text-rose-800">Keping dicoret</div>
                    <div className="my-1 text-2xl font-black text-rose-600">{labCrossOutCount}</div>
                    <div className="flex justify-center gap-2">
                      <button type="button" className="rounded-lg bg-slate-200 px-3 py-1 font-black" onClick={() => { playSound("click"); setLabCrossOutCount((c) => Math.max(0, c - 1)); }}>-</button>
                      <button type="button" className="rounded-lg bg-rose-500 px-3 py-1 font-black text-white" onClick={() => { playSound("click"); setLabCrossOutCount((c) => Math.min(labInitialCount, c + 1)); }}>+</button>
                    </div>
                  </div>
                </div>
                {gambarBingkaiSepuluh(labInitialCount, labCrossOutCount)}
                <div className="rounded-2xl border-2 border-sky-300 bg-white p-3 text-center">
                  <div className="text-2xl font-black">{labInitialCount} - {labCrossOutCount} = {labInitialCount - labCrossOutCount}</div>
                  <div className="mt-0.5 text-[11px] font-bold text-emerald-700">
                    {labInitialCount - labCrossOutCount === 0 ? "Habis. Bilangan dikurangi bilangan yang sama hasilnya 0." : `Masih ada ${labInitialCount - labCrossOutCount} keping hijau.`}
                  </div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-amber-950">Kanvas berpetak</h3>
                  <span className="rounded-full border border-amber-300 bg-white px-2.5 py-0.5 text-[11px] font-bold">Goresan: {canvasStrokeCount}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    ["➖", "Kurang"],
                    ["🎈", "Balon"],
                    ["🦉", "IGIL"],
                    ["❌", "Coret"],
                  ].map(([symbol, label]) => (
                    <button key={label} type="button" onClick={() => addCanvasStamp(symbol, label)} className="rounded-xl border-b-2 border-amber-400 bg-white px-2.5 py-1.5 text-xs font-bold">
                      {symbol} {label}
                    </button>
                  ))}
                  {[
                    ["#dc2626", "Merah"],
                    ["#2563eb", "Biru"],
                    ["#16a34a", "Hijau"],
                  ].map(([hex, name]) => (
                    <button key={hex} type="button" aria-label={name} onClick={() => setBrushColor(hex)} className={`h-6 w-6 rounded-full border-2 ${brushColor === hex ? "scale-110 border-slate-950" : "border-white"}`} style={{ backgroundColor: hex }} />
                  ))}
                  <button type="button" onClick={clearSmartCanvas} className="ml-auto rounded-xl border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-800">Bersihkan</button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={210}
                  onPointerDown={mulaiGambar}
                  onPointerMove={geserGambar}
                  onPointerUp={selesaiGambar}
                  onPointerLeave={selesaiGambar}
                  className="h-auto w-full touch-none rounded-2xl border-2 border-amber-300 bg-white"
                />
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 4 && soalLatihan ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 4 • Satu layar, satu soal • 3 token jika benar</span>
                <h2 className="text-lg font-black text-slate-900">Latihan pengurangan</h2>
              </div>
              <div className="rounded-2xl border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-black text-amber-950">Token latihan: {practiceTokens} / 30</div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = practiceAnswers[q.id];
                const benar = ans === q.correctAnswer;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => { playSound("click"); setCurrentPracticeIdx(idx); }}
                    className={`rounded-xl border-b-4 py-2 text-xs font-black ${
                      currentPracticeIdx === idx ? "border-sky-800 bg-sky-600 text-white" : ans ? (benar ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900") : "border-slate-300 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">Soal {soalLatihan.id} dari 10 • {soalLatihan.storyCharacter}</span>
                <button type="button" onClick={() => speakIGIL(soalLatihan.prompt)} className="rounded-xl border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">Bacakan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalLatihan.prompt}</p>
              {gambarPengurangan(soalLatihan.visualType, soalLatihan.paramA, soalLatihan.paramB, !jawabanLatihan)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalLatihan.options.map((opt) => {
                  const dipilih = jawabanLatihan === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectPracticeAnswer(soalLatihan, opt)}
                      className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${
                        dipilih ? (opt === soalLatihan.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : "border-rose-700 bg-rose-500 text-white") : "border-slate-300 bg-white text-slate-800"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {jawabanLatihan ? (
                <div className={`space-y-1 rounded-2xl border-2 p-3.5 text-xs ${jawabanLatihan === soalLatihan.correctAnswer ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                  <div className="text-sm font-black">{jawabanLatihan === soalLatihan.correctAnswer ? "Benar. Token latihan tercatat sekali." : "Belum tepat. Baca penjelasan ini."}</div>
                  <p>{soalLatihan.explanation}</p>
                </div>
              ) : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentPracticeIdx === 0} onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40">Soal sebelumnya</button>
                {currentPracticeIdx < PRACTICE_QUESTIONS.length - 1 ? (
                  <button type="button" onClick={() => setCurrentPracticeIdx((i) => Math.min(PRACTICE_QUESTIONS.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Soal berikutnya</button>
                ) : card5Unlocked ? (
                  <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(5); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Buka ujian</button>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 5 && soalUjian ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-3.5 text-white">
              <div>
                <span className="text-[11px] font-extrabold text-amber-400 uppercase">Gerbang 1 • Nilai 100 membuka praktikum</span>
                <h2 className="text-base font-black">Ujian pengurangan • 70 token</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-bold">Percobaan ke-{examAttempts}</span>
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono font-bold text-sky-300">{formatStopwatch(examElapsedDeci)}</span>
                <span className={`rounded-xl border px-3 py-1.5 font-bold ${focusLossCount === 0 ? "border-emerald-700 bg-emerald-950 text-emerald-300" : "border-rose-600 bg-rose-950 text-rose-300"}`}>Pindah tab: {focusLossCount}</span>
              </div>
            </div>
            {focusLossCount > 0 ? (
              <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-xs font-bold text-amber-950">Layar ujian tertinggal {focusLossCount} kali. Kerjakan sendiri di halaman ini.</div>
            ) : null}
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {examQuestions.map((q, idx) => (
                <button key={q.id} type="button" onClick={() => setCurrentExamIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentExamIdx === idx ? "border-amber-600 bg-amber-400 text-slate-950" : examAnswers[q.id] ? "border-sky-400 bg-sky-100 text-sky-900" : "border-slate-300 bg-slate-100 text-slate-600"}`}>
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black text-white">Soal {soalUjian.id} • angka baru tiap percobaan</span>
                <button type="button" onClick={() => speakIGIL(soalUjian.questionText)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-bold">Dengarkan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalUjian.questionText}</p>
              {gambarPengurangan(soalUjian.visualType, soalUjian.paramA, soalUjian.paramB, !examSubmitted)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalUjian.options.map((opt) => {
                  const dipilih = jawabanUjian === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectExamAnswer(soalUjian.id, opt)}
                      className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${
                        examSubmitted
                          ? opt === soalUjian.correctAnswer
                            ? "border-emerald-700 bg-emerald-500 text-white"
                            : dipilih
                              ? "border-rose-700 bg-rose-500 text-white"
                              : "border-slate-200 bg-white text-slate-500"
                          : dipilih
                            ? "border-sky-800 bg-sky-600 text-white"
                            : "border-slate-300 bg-white text-slate-800"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {examSubmitted ? <div className="rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-700"><strong>Pembahasan: </strong>{soalUjian.explanation}</div> : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentExamIdx === 0} onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                {currentExamIdx < examQuestions.length - 1 ? (
                  <button type="button" onClick={() => setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button>
                ) : !examSubmitted ? (
                  <button type="button" onClick={handleSubmitExam} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-5 py-2.5 text-xs font-black text-white">Kumpulkan ujian</button>
                ) : null}
              </div>
            </div>
            {examSubmitted ? (
              <div className={`space-y-3 rounded-2xl border-2 p-4 ${examScore === 100 && !dwellTimeWarning ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-black">
                      {dwellTimeWarning ? "Pengerjaan kurang dari 25 detik" : examScore === 100 ? "Nilai 100. Praktikum terbuka." : `Skor ujian ${examScore}/100. Syarat praktikum adalah 100.`}
                    </h3>
                    <p className="text-xs">
                      {dwellTimeWarning
                        ? "Ulangi ujian dan baca setiap soal. Waktu dihitung sejak kartu ujian dibuka."
                        : examScore === 100
                          ? "Kamu menerima 70 token dan dapat masuk ke kartu praktikum."
                          : "Soal berikutnya memakai angka yang berbeda. Tidak ada panggilan jaringan."}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={handleRetryExam} className="rounded-xl border-b-4 border-slate-400 bg-white px-4 py-2 text-xs font-black text-slate-900">Ulangi ujian</button>
                    {card6Unlocked ? (
                      <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(6); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Masuk praktikum</button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {activeCard === 6 ? (
          <section className="space-y-5 rounded-3xl border-2 border-emerald-300 bg-white p-5 shadow-md">
            <div className="space-y-3 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 p-4 text-white">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Gerbang 2 • skor 0 sampai 1.000 • tanpa stopwatch</span>
                  <h2 className="mt-1 text-lg font-black">Manajer kebun cilik: berbagi apel dan bersih daun</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("single"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "single" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Bab ini saja</button>
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("cross4"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "cross4" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Lintas bab</button>
                </div>
              </div>
              {practicumMode === "cross4" ? (
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                    <div className="font-black text-amber-300">1. Matematika</div>
                    <p className="text-[11px] text-emerald-100">Kurangi dari 10, cari selisih, dan habiskan daun sampai 0.</p>
                  </div>
                  {completedOtherChapters.slice(0, 3).map((ch, idx) => (
                    <div key={ch.chapterId} className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                      <div className="font-black text-amber-300">{idx + 2}. {ch.subject}</div>
                      <p className="text-[11px] text-emerald-100">{ch.practicumSynthesisHook}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-100">Kelola 10 apel bersama Kira dan Upe, hitung sisa, bandingkan selisih, lalu bersihkan daun sampai 0.</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Tiga syarat kebun</h3>
                <ul className="space-y-1 rounded-xl border border-emerald-200 bg-white p-3 text-xs text-slate-700">
                  <li>Dari 10 apel, berbagi 4 kepada tetangga. Sisa Kira harus 6. Kalimatnya 10 - 4 = 6.</li>
                  <li>Keranjang Upe berisi 3 apel. Selisih dengan sisa Kira adalah 6 - 3 = 3.</li>
                  <li>Bersihkan 5 daun gugur sampai sisanya 0. Kalimatnya 5 - 5 = 0.</li>
                </ul>
                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 font-bold">
                    Apel dibagikan: {sharedToNeighbors}. Sisa: {sisaPanen}
                    <input type="range" min={1} max={8} value={sharedToNeighbors} onChange={(e) => setSharedToNeighbors(Number(e.target.value))} className="accent-rose-600" />
                  </label>
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 font-bold">
                    Keranjang Upe: {upeBasketCount} apel
                    <input type="range" min={1} max={6} value={upeBasketCount} onChange={(e) => setUpeBasketCount(Number(e.target.value))} className="accent-sky-600" />
                  </label>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 font-bold">
                    Daun dibersihkan dari 5
                    <span className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" onClick={() => setFallenLeavesCleaned(val)} className={`rounded-lg px-2.5 py-1 font-black ${fallenLeavesCleaned === val ? "bg-emerald-600 text-white" : "bg-slate-100"}`}>-{val}</button>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Gambar panen dan selisih</h3>
                {gambarBingkaiSepuluh(10, sharedToNeighbors)}
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
                  <div className={`rounded-xl border p-2 text-center font-bold ${sisaPanen === 6 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>
                    Sisa: 10 - {sharedToNeighbors} = {sisaPanen} {sisaPanen === 6 ? "pas" : "(target 6)"}
                  </div>
                  <div className={`rounded-xl border p-2 text-center font-bold ${selisihPanen === 3 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>
                    Selisih: {kalimatSelisih(sisaPanen, upeBasketCount)} {selisihPanen === 3 ? "pas" : "(target 6 - 3)"}
                  </div>
                  <div className={`rounded-xl border p-2 text-center font-bold ${sisaDaun === 0 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>
                    Daun: 5 - {fallenLeavesCleaned} = {sisaDaun} {sisaDaun === 0 ? "bersih" : "(target 0)"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-black text-amber-950">Laporan siswa</h3>
                  <p className="text-xs text-slate-600">Tulis sisa apel, selisih dengan keranjang Upe, dan sisa daun.</p>
                </div>
                <button type="button" onClick={() => { playSound("pop"); setStudentReportText(susunLaporan()); }} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">
                  Bantu susun kalimat
                </button>
              </div>
              <textarea
                rows={4}
                value={studentReportText}
                onChange={(e) => setStudentReportText(e.target.value)}
                placeholder="Contoh: Dari 10 apel, saya berbagi 4 apel kepada tetangga sehingga tersisa 10 - 4 = 6 apel."
                className="w-full select-text rounded-xl border-2 border-amber-300 bg-white p-3 text-xs font-medium focus:border-sky-600 focus:outline-none md:text-sm"
              />
              <button type="button" onClick={handleEvaluatePracticum} className="w-full rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 py-3 text-sm font-black text-white">
                Hitung skor karya di perangkat ini
              </button>
            </div>

            {practicumRubric ? (
              <div className="space-y-4 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-700 pb-3 md:flex-row md:items-center">
                  <div>
                    <span className="text-xs font-extrabold text-amber-400 uppercase">Rubrik karya • dihitung di perangkat</span>
                    <h3 className="text-lg font-black">{studentName} • {CHAPTER_COMPETENCY_METADATA.chapterId}</h3>
                  </div>
                  <div className="rounded-2xl bg-amber-400 px-4 py-2 text-center text-slate-950">
                    <div className="text-[10px] font-black uppercase">Total skor</div>
                    <div className="text-2xl font-black">{practicumRubric.totalQualityScore} / 1.000</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Akurasi</div><div className="mt-1 text-xl font-black text-emerald-400">{practicumRubric.accuracyScore} / 300</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Sintesis</div><div className="mt-1 text-xl font-black text-sky-400">{practicumRubric.synthesisScore} / 250</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Visual</div><div className="mt-1 text-xl font-black text-amber-400">{practicumRubric.optimizationVisualScore} / 200</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Laporan</div><div className="mt-1 text-xl font-black text-purple-400">{practicumRubric.reasoningReportScore} / 250</div></div>
                </div>
                <div className="space-y-1 rounded-2xl border border-slate-700 bg-slate-800/90 p-3.5 text-xs text-slate-200">
                  <div className="font-black text-amber-300">Catatan IGIL</div>
                  <p>{practicumRubric.aiFeedbackSummary}</p>
                  {chapterCompletedFlag ? <p className="pt-1 font-bold text-emerald-300">Bab ini tuntas di perangkat. Token bab: {totalTokens} dari 150. Tidak ada data yang dikirim ke jaringan.</p> : null}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
