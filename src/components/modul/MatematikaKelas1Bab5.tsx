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
  chapterId: "MAT-K1-B5",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 5,
  chapterTitle: "Ayo Membilang sampai dengan 20",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 5, Halaman 123–152",
  coreSkills: [
    "Menghitung, membaca, dan menulis lambang bilangan 11 sampai dengan 20 pada dua bingkai 10",
    "Memahami nilai tempat puluhan dan satuan",
    "Membandingkan bilangan 11 sampai dengan 20",
    "Menghitung maju dari 11 sampai 20 dan menghitung mundur dari 20 sampai 11",
  ],
  practicumSynthesisHook:
    "Gunakan 1 puluhan dan satuan, dua bingkai 10, serta perbandingan bilangan untuk menata pojok baca dan kebun bibit.",
};

type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare" | "note";
type VisualTeenVariant =
  | "double-ten-frame"
  | "dienes-blocks"
  | "abacus-rods"
  | "alligator-compare"
  | "train-sequence"
  | "number-bond-teen";
type GardenCellType = "empty" | "book-ten" | "book-one" | "plant-pot";

interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  badgeTitle: string;
  prompt: string;
  visualType: VisualTeenVariant;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: VisualTeenVariant;
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

const NAMA_BILANGAN: Record<number, string> = {
  10: "sepuluh",
  11: "sebelas",
  12: "dua belas",
  13: "tiga belas",
  14: "empat belas",
  15: "lima belas",
  16: "enam belas",
  17: "tujuh belas",
  18: "delapan belas",
  19: "sembilan belas",
  20: "dua puluh",
};

function namaBilangan(n: number): string {
  return NAMA_BILANGAN[n] ?? String(n);
}

const DEFAULT_CROSS_CHAPTERS: ChapterCompetencyMetadata[] = [
  {
    chapterId: "IPAS-K1-B5",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 5,
    chapterTitle: "Kebun Bibit Sekolah",
    textbookReference: "Kurikulum Merdeka Fase A — Mengamati pertumbuhan bibit",
    coreSkills: ["Mengelompokkan bibit per 10 pot", "Merawat tanaman sekolah"],
    practicumSynthesisHook: "Tanam 14 pot bibit di kebun sekolah.",
  },
  {
    chapterId: "BINDO-K1-B5",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 5,
    chapterTitle: "Teman Baru dan Pojok Baca",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Bab 5",
    coreSkills: ["Mencatat jumlah buku cerita", "Menulis laporan pojok baca"],
    practicumSynthesisHook: "Susun 1 rak puluhan dan 6 buku satuan, yaitu 16 buku cerita.",
  },
  {
    chapterId: "PANCASILA-K1-B5",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 5,
    chapterTitle: "Gotong Royong Merapikan Kelas",
    textbookReference: "Pendidikan Pancasila SD Kelas I Bab 5",
    coreSkills: ["Merapikan barang milik bersama", "Menjaga ketertiban pojok baca"],
    practicumSynthesisHook: "Tata buku dan tanaman agar mudah dijangkau semua teman.",
  },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    badgeTitle: "Dua bingkai 10",
    prompt: "Kira menaruh stroberi di dua bingkai. Bingkai atas penuh, yaitu 10. Bingkai bawah berisi 4. Berapa jumlah stroberi Kira?",
    visualType: "double-ten-frame",
    paramA: 14,
    paramB: 0,
    options: ["13", "14", "15", "16"],
    correctAnswer: "14",
    explanation: "10 + 4 = 14. Namanya empat belas.",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    badgeTitle: "Menara puluhan",
    prompt: "Upe punya 1 menara puluhan dan 7 kubus satuan. Bilangan berapakah itu?",
    visualType: "dienes-blocks",
    paramA: 1,
    paramB: 7,
    options: ["16", "17", "18", "71"],
    correctAnswer: "17",
    explanation: "10 + 7 = 17. Namanya tujuh belas.",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    badgeTitle: "Sempoa",
    prompt: "Malosi memasang 1 manik di tiang puluhan dan 9 manik di tiang satuan. Lambang bilangannya adalah...",
    visualType: "abacus-rods",
    paramA: 1,
    paramB: 9,
    options: ["18", "19", "20", "91"],
    correctAnswer: "19",
    explanation: "10 + 9 = 19. Namanya sembilan belas.",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    badgeTitle: "Pasangan 10",
    prompt: "Bilangan 15 diuraikan menjadi 10 dan satuan. Berapa satuan pada lingkaran yang kosong?",
    visualType: "number-bond-teen",
    paramA: 15,
    paramB: 10,
    options: ["4", "5", "6", "10"],
    correctAnswer: "5",
    explanation: "10 + 5 = 15. Satuan pada 15 adalah 5.",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    badgeTitle: "Dua puluh",
    prompt: "Kira menyusun 2 menara puluhan dan 0 kubus satuan. Berapa jumlah seluruh kubus?",
    visualType: "dienes-blocks",
    paramA: 2,
    paramB: 0,
    options: ["12", "18", "19", "20"],
    correctAnswer: "20",
    explanation: "10 + 10 = 20. Namanya dua puluh.",
  },
  {
    id: 6,
    storyCharacter: "Malosi",
    badgeTitle: "Siapa lebih banyak",
    prompt: "Bandingkan 18 dan 13. Pernyataan yang benar adalah...",
    visualType: "alligator-compare",
    paramA: 18,
    paramB: 13,
    options: ["18 lebih dari 13", "18 kurang dari 13", "18 sama dengan 13", "13 lebih dari 18"],
    correctAnswer: "18 lebih dari 13",
    explanation: "18 lebih besar daripada 13, jadi 18 lebih dari 13.",
  },
  {
    id: 7,
    storyCharacter: "Upe",
    badgeTitle: "Kelereng",
    prompt: "Upe punya 12 kelereng. Tora punya 16 kelereng. Banyak kelereng Upe ... daripada kelereng Tora.",
    visualType: "alligator-compare",
    paramA: 12,
    paramB: 16,
    options: ["Kurang dari", "Lebih dari", "Sama dengan", "Dua kali lipat"],
    correctAnswer: "Kurang dari",
    explanation: "12 lebih kecil daripada 16, jadi 12 kurang dari 16.",
  },
  {
    id: 8,
    storyCharacter: "Tora",
    badgeTitle: "Kereta maju",
    prompt: "Kereta Tora maju: 13, 14, 15, ..., 17. Nomor yang hilang adalah...",
    visualType: "train-sequence",
    paramA: 13,
    paramB: 1,
    options: ["14", "15", "16", "18"],
    correctAnswer: "16",
    explanation: "Sesudah 15 dan sebelum 17 adalah 16.",
  },
  {
    id: 9,
    storyCharacter: "Malosi",
    badgeTitle: "Kereta mundur",
    prompt: "Kereta Malosi mundur: 19, 18, 17, ..., 15. Nomor yang hilang adalah...",
    visualType: "train-sequence",
    paramA: 19,
    paramB: -1,
    options: ["14", "16", "18", "20"],
    correctAnswer: "16",
    explanation: "Sesudah 17 saat mundur adalah 16, lalu 15.",
  },
  {
    id: 10,
    storyCharacter: "Kira",
    badgeTitle: "Di antara 17 dan 19",
    prompt: "Aku berdiri di antara 17 dan 19. Aku punya 1 puluhan dan 8 satuan. Bilangan berapakah aku?",
    visualType: "abacus-rods",
    paramA: 1,
    paramB: 8,
    options: ["16", "17", "18", "19"],
    correctAnswer: "18",
    explanation: "10 + 8 = 18. Delapan belas ada di antara 17 dan 19.",
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

function pilihanAngka(benar: number, minVal: number, maxVal: number): string[] {
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
  const q1 = Math.floor(Math.random() * 5) + 11;
  const q2 = Math.floor(Math.random() * 5) + 16;
  const q3Satuan = Math.floor(Math.random() * 8) + 2;
  const q3 = 10 + q3Satuan;
  const q4Satuan = Math.floor(Math.random() * 9) + 1;
  const q4 = 10 + q4Satuan;
  const q5Satuan = Math.floor(Math.random() * 8) + 2;
  const q5 = 10 + q5Satuan;
  const q6Besar = Math.floor(Math.random() * 4) + 17;
  const q6Kecil = Math.floor(Math.random() * 5) + 11;
  const q7Kecil = Math.floor(Math.random() * 4) + 11;
  const q7Besar = Math.floor(Math.random() * 4) + 16;
  const q8Awal = Math.floor(Math.random() * 5) + 11;
  const q8Jawab = q8Awal + 3;
  const q9Awal = Math.floor(Math.random() * 4) + 17;
  const q9Jawab = q9Awal - 3;
  const q10 = Math.floor(Math.random() * 9) + 11;

  return [
    {
      id: 1,
      questionText: `Dua bingkai Kira: bingkai atas berisi 10, bingkai bawah berisi ${q1 - 10}. Berapa jumlah seluruh keping?`,
      visualType: "double-ten-frame",
      paramA: q1,
      paramB: 0,
      options: pilihanAngka(q1, 11, 18),
      correctAnswer: String(q1),
      explanation: `10 + ${q1 - 10} = ${q1}. Namanya ${namaBilangan(q1)}.`,
    },
    {
      id: 2,
      questionText: "Hitung seluruh keping pada dua bingkai Upe.",
      visualType: "double-ten-frame",
      paramA: q2,
      paramB: 0,
      options: pilihanAngka(q2, 13, 20),
      correctAnswer: String(q2),
      explanation: `10 + ${q2 - 10} = ${q2}. Namanya ${namaBilangan(q2)}.`,
    },
    {
      id: 3,
      questionText: `Malosi menyusun 1 menara puluhan dan ${q3Satuan} kubus satuan. Bilangan yang terbentuk adalah...`,
      visualType: "dienes-blocks",
      paramA: 1,
      paramB: q3Satuan,
      options: pilihanAngka(q3, 11, 20),
      correctAnswer: String(q3),
      explanation: `10 + ${q3Satuan} = ${q3}.`,
    },
    {
      id: 4,
      questionText: `Sempoa menunjukkan bilangan ${q4}. Berapa manik pada tiang satuan?`,
      visualType: "abacus-rods",
      paramA: 1,
      paramB: q4Satuan,
      options: pilihanAngka(q4Satuan, 0, 9),
      correctAnswer: String(q4Satuan),
      explanation: `Pada ${q4}, puluhan adalah 1 dan satuan adalah ${q4Satuan}.`,
    },
    {
      id: 5,
      questionText: `Bilangan ${q5} diuraikan menjadi 10 dan satuan. Berapa pasangannya?`,
      visualType: "number-bond-teen",
      paramA: q5,
      paramB: 10,
      options: pilihanAngka(q5Satuan, 1, 9),
      correctAnswer: String(q5Satuan),
      explanation: `10 + ${q5Satuan} = ${q5}.`,
    },
    {
      id: 6,
      questionText: `Bandingkan ${q6Besar} dan ${q6Kecil}. ${q6Besar} ... daripada ${q6Kecil}.`,
      visualType: "alligator-compare",
      paramA: q6Besar,
      paramB: q6Kecil,
      options: acak(["Lebih dari", "Kurang dari", "Sama dengan", "Lebih sedikit"]),
      correctAnswer: "Lebih dari",
      explanation: `${q6Besar} lebih besar daripada ${q6Kecil}, jadi ${q6Besar} lebih dari ${q6Kecil}.`,
    },
    {
      id: 7,
      questionText: `Bandingkan ${q7Kecil} dan ${q7Besar}. ${q7Kecil} ... daripada ${q7Besar}.`,
      visualType: "alligator-compare",
      paramA: q7Kecil,
      paramB: q7Besar,
      options: acak(["Kurang dari", "Lebih dari", "Sama dengan", "Paling banyak"]),
      correctAnswer: "Kurang dari",
      explanation: `${q7Kecil} lebih kecil daripada ${q7Besar}, jadi ${q7Kecil} kurang dari ${q7Besar}.`,
    },
    {
      id: 8,
      questionText: `Kereta maju: ${q8Awal}, ${q8Awal + 1}, ${q8Awal + 2}, ..., ${q8Awal + 4}. Nomor yang hilang adalah...`,
      visualType: "train-sequence",
      paramA: q8Awal,
      paramB: 1,
      options: pilihanAngka(q8Jawab, 12, 20),
      correctAnswer: String(q8Jawab),
      explanation: `Sesudah ${q8Awal + 2} adalah ${q8Jawab}.`,
    },
    {
      id: 9,
      questionText: `Kereta mundur: ${q9Awal}, ${q9Awal - 1}, ${q9Awal - 2}, ..., ${q9Awal - 4}. Nomor yang hilang adalah...`,
      visualType: "train-sequence",
      paramA: q9Awal,
      paramB: -1,
      options: pilihanAngka(q9Jawab, 11, 19),
      correctAnswer: String(q9Jawab),
      explanation: `Saat mundur, sesudah ${q9Awal - 2} adalah ${q9Jawab}.`,
    },
    {
      id: 10,
      questionText: `IGIL menyebut "${namaBilangan(q10)}". Lambang angkanya adalah...`,
      visualType: "abacus-rods",
      paramA: 1,
      paramB: q10 - 10,
      options: pilihanAngka(q10, 11, 20),
      correctAnswer: String(q10),
      explanation: `${namaBilangan(q10)} ditulis ${q10}.`,
    },
  ];
}

function petakAwal(): GardenCellType[] {
  const petak: GardenCellType[] = ["book-ten"];
  for (let i = 0; i < 6; i += 1) petak.push("book-one");
  for (let i = 0; i < 14; i += 1) petak.push("plant-pot");
  for (let i = 0; i < 3; i += 1) petak.push("empty");
  return petak;
}

function gambarBilangan(type: VisualTeenVariant, paramA: number, paramB: number, sembunyikanHasil = false) {
  if (type === "double-ten-frame") {
    const aman = Math.max(0, Math.min(20, paramA));
    const atas = Math.min(10, aman);
    const bawah = Math.max(0, aman - 10);
    const bingkai = (terisi: number, y: number, isi: string) => (
      <g transform={`translate(20, ${y})`}>
        <rect width="360" height="72" rx="12" fill="#ffffff" stroke="#0369a1" strokeWidth="2" />
        {Array.from({ length: 10 }, (_, idx) => {
          const x = (idx % 5) * 72;
          const yy = Math.floor(idx / 5) * 36;
          const penuh = idx < terisi;
          return (
            <g key={`${y}-${idx}`}>
              <rect x={x} y={yy} width="72" height="36" fill={penuh ? "#e0f2fe" : "#f8fafc"} stroke="#7dd3fc" />
              {penuh ? <circle className="keping" cx={x + 36} cy={yy + 18} r="11" fill={isi} /> : null}
            </g>
          );
        })}
      </g>
    );
    return (
      <svg data-gambar="soal" viewBox="0 0 400 190" className="mx-auto w-full max-w-xl">
        {sembunyikanHasil ? (
          <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Hitung keping di dua bingkai</text>
        ) : (
          <text x="200" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{atas} + {bawah} = {aman}</text>
        )}
        {bingkai(atas, 24, "#e11d48")}
        {bingkai(bawah, 108, "#0284c7")}
      </svg>
    );
  }

  if (type === "dienes-blocks") {
    const puluh = Math.max(0, Math.min(2, paramA));
    const satuan = Math.max(0, Math.min(9, paramB));
    const nilai = puluh * 10 + satuan;
    return (
      <svg data-gambar="soal" viewBox="0 0 420 180" className="mx-auto w-full max-w-xl">
        <rect x="8" y="8" width="404" height="164" rx="16" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" />
        <text x="110" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">Puluhan</text>
        <text x="300" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Satuan</text>
        {Array.from({ length: puluh }, (_, tIdx) => (
          <g key={`p-${tIdx}`} transform={`translate(${70 + tIdx * 48}, 40)`}>
            {Array.from({ length: 10 }, (__, seg) => (
              <rect key={seg} className="batang" x="0" y={seg * 12} width="28" height="11" rx="2" fill="#f59e0b" stroke="#92400e" />
            ))}
          </g>
        ))}
        {Array.from({ length: satuan }, (_, idx) => {
          const kolom = idx % 3;
          const baris = Math.floor(idx / 3);
          return <rect key={`s-${idx}`} className="kubus" x={230 + kolom * 42} y={46 + baris * 36} width="28" height="28" rx="6" fill="#38bdf8" stroke="#0369a1" />;
        })}
        {sembunyikanHasil ? null : (
          <text x="210" y="162" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{puluh} × 10 + {satuan} = {nilai}</text>
        )}
      </svg>
    );
  }

  if (type === "abacus-rods") {
    const puluh = Math.max(0, Math.min(2, paramA));
    const satuan = Math.max(0, Math.min(9, paramB));
    const nilai = puluh * 10 + satuan;
    return (
      <svg data-gambar="soal" viewBox="0 0 420 200" className="mx-auto w-full max-w-xl">
        <rect x="8" y="8" width="404" height="184" rx="16" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
        <rect x="70" y="36" width="10" height="120" rx="4" fill="#92400e" />
        <rect x="250" y="36" width="10" height="120" rx="4" fill="#92400e" />
        <text x="75" y="176" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239">Puluhan</text>
        <text x="255" y="176" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">Satuan</text>
        {Array.from({ length: puluh }, (_, idx) => (
          <ellipse key={`p-${idx}`} className="manik-puluh" cx="75" cy={140 - idx * 28} rx="24" ry="10" fill="#e11d48" stroke="#9f1239" />
        ))}
        {Array.from({ length: satuan }, (_, idx) => (
          <ellipse key={`s-${idx}`} className="manik-satu" cx="255" cy={146 - idx * 12} rx="22" ry="5" fill="#2563eb" stroke="#1e3a8a" />
        ))}
        {sembunyikanHasil ? null : (
          <text x="330" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{puluh} × 10 + {satuan} = {nilai}</text>
        )}
      </svg>
    );
  }

  if (type === "alligator-compare") {
    const kiriMenang = paramA > paramB;
    const sama = paramA === paramB;
    return (
      <svg data-gambar="soal" viewBox="0 0 420 160" className="mx-auto w-full max-w-xl">
        <rect x="8" y="8" width="404" height="144" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <rect x="28" y="36" width="100" height="90" rx="16" fill="#ffffff" stroke="#059669" strokeWidth="3" />
        <text x="78" y="92" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#065f46">{paramA}</text>
        <g transform="translate(210, 82)">
          <circle cx="0" cy="0" r="34" fill="#16a34a" stroke="#14532d" strokeWidth="3" />
          {sembunyikanHasil ? (
            <text x="0" y="8" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#fef9c3">?</text>
          ) : sama ? (
            <g stroke="#fef08a" strokeWidth="6" strokeLinecap="round">
              <line x1="-14" y1="-6" x2="14" y2="-6" />
              <line x1="-14" y1="8" x2="14" y2="8" />
            </g>
          ) : (
            <polyline
              points={kiriMenang ? "-16,-12 14,2 -16,16" : "16,-12 -14,2 16,16"}
              fill="none"
              stroke="#fef08a"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
        <rect x="292" y="36" width="100" height="90" rx="16" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="342" y="92" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1e3a8a">{paramB}</text>
      </svg>
    );
  }

  if (type === "train-sequence") {
    const langkah = paramB === 0 ? 1 : paramB;
    const gerbong = [0, 1, 2, 3, 4].map((idx) => paramA + idx * langkah);
    return (
      <svg data-gambar="soal" viewBox="0 0 440 150" className="mx-auto w-full max-w-xl">
        <rect x="6" y="8" width="428" height="134" rx="16" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="220" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
          {langkah > 0 ? "Kereta maju" : "Kereta mundur"}
        </text>
        <line x1="16" y1="118" x2="424" y2="118" stroke="#334155" strokeWidth="4" />
        {gerbong.map((nomor, idx) => {
          const x = 18 + idx * 84;
          const hilang = idx === 3;
          return (
            <g key={idx} transform={`translate(${x}, 40)`}>
              <rect x="0" y="0" width="68" height="52" rx="12" fill={hilang ? "#fde047" : idx % 2 === 0 ? "#ec4899" : "#6366f1"} stroke="#0f172a" strokeWidth="2" />
              <text x="34" y="34" textAnchor="middle" fontSize="20" fontWeight="bold" fill={hilang ? "#0f172a" : "#ffffff"}>
                {hilang ? "?" : nomor}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  const satuan = paramA - paramB;
  const tampil = !sembunyikanHasil && satuan >= 0 ? String(satuan) : "?";
  return (
    <svg data-gambar="soal" viewBox="0 0 380 160" className="mx-auto w-full max-w-md">
      <rect x="8" y="8" width="364" height="144" rx="16" fill="#fdf4ff" stroke="#d946ef" strokeWidth="2" />
      <line x1="190" y1="52" x2="110" y2="112" stroke="#86198f" strokeWidth="4" />
      <line x1="190" y1="52" x2="270" y2="112" stroke="#86198f" strokeWidth="4" />
      <circle cx="190" cy="46" r="28" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
      <text x="190" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">{paramA}</text>
      <circle cx="110" cy="112" r="26" fill="#a5f3fc" stroke="#0891b2" strokeWidth="3" />
      <text x="110" y="120" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#164e63">{paramB}</text>
      <circle cx="270" cy="112" r="26" fill="#fbcfe8" stroke="#db2777" strokeWidth="3" />
      <text x="270" y="120" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#831843">{tampil}</text>
    </svg>
  );
}

function formatStopwatch(deci: number) {
  const totalDetik = Math.floor(deci / 10);
  return `${String(Math.floor(totalDetik / 60)).padStart(2, "0")}:${String(totalDetik % 60).padStart(2, "0")}.${deci % 10}`;
}

export default function MatematikaKelas1Bab5({
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
  const [comboStreak, setComboStreak] = useState(0);
  const [mascotSpeech, setMascotSpeech] = useState("Ikat 10 lidi menjadi 1 puluhan, lalu tambah 4 lidi satuan.");
  const [hookBundled, setHookBundled] = useState(false);
  const [hookExtraOnes, setHookExtraOnes] = useState(0);
  const bundledRef = useRef(false);
  const extraRef = useRef(0);
  const kartu2Ref = useRef(false);

  const [activeSubChapter, setActiveSubChapter] = useState<"A" | "B" | "C" | "D">("A");
  const [pianoNumber, setPianoNumber] = useState(14);
  const [trainPos, setTrainPos] = useState(11);
  const [bridgeFixed, setBridgeFixed] = useState(false);
  const [factoryNumber, setFactoryNumber] = useState(16);
  const [factoryBundled, setFactoryBundled] = useState(true);
  const [leftNum, setLeftNum] = useState(18);
  const [rightNum, setRightNum] = useState(14);

  const [labActiveTab, setLabActiveTab] = useState<"abacus" | "frame" | "canvas">("abacus");
  const [labValue, setLabValue] = useState(16);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const menggambarRef = useRef(false);
  const goresanRef = useRef(0);
  const stempelRef = useRef<CanvasStampItem[]>([]);
  const [brushColor, setBrushColor] = useState("#ec4899");
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
  const [selectedBrushTool, setSelectedBrushTool] = useState<GardenCellType>("book-one");
  const [gridCells, setGridCells] = useState<GardenCellType[]>(() => petakAwal());
  const [studentReportText, setStudentReportText] = useState("");
  const [practicumRubric, setPracticumRubric] = useState<PracticumEvaluationRubric | null>(null);
  const [chapterCompletedFlag, setChapterCompletedFlag] = useState(false);

  const playSound = useCallback((type: SoundType, pitchStep = 0) => {
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
      if (type === "click") bunyi(580, "sine", now, 0.05, 0.1);
      else if (type === "note") bunyi(261.63 * 2 ** (pitchStep / 12), "triangle", now, 0.18, 0.16);
      else if (type === "pop") {
        bunyi(460, "triangle", now, 0.08, 0.14);
        bunyi(760, "sine", now + 0.04, 0.09, 0.12);
      } else if (type === "laser") {
        bunyi(920, "sawtooth", now, 0.12, 0.08);
        bunyi(460, "sine", now + 0.06, 0.12, 0.1);
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
    setMascotSpeech(text);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.96;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Suara perangkat tidak tersedia.
    }
  }, []);

  const bukaKartu2 = useCallback(() => {
    if (kartu2Ref.current) return;
    kartu2Ref.current = true;
    setCard2Unlocked(true);
    playSound("fanfare");
    speakIGIL("10 + 4 = 14. Empat belas. Kartu materi sudah terbuka.");
  }, [playSound, speakIGIL]);

  useEffect(() => {
    if (activeCard !== 5 || examSubmitted) return;
    if (ujianBerjalanRef.current) return;
    ujianBerjalanRef.current = true;
    setExamStartTime(Date.now());
    setExamElapsedDeci(0);
  }, [activeCard, examSubmitted]);

  useEffect(() => {
    if (activeCard === 5 && !examSubmitted) {
      examTimerRef.current = setInterval(() => setExamElapsedDeci((prev) => prev + 1), 100);
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
    ctx.fillStyle = "#fdf4ff";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#f5d0fe";
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
    if (activeCard !== 3 || labActiveTab !== "canvas") return;
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    drawCanvasGrid(ctx, kanvas.width, kanvas.height);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#0f172a";
    for (const stempel of stempelRef.current) ctx.fillText(stempel.symbol, stempel.x, stempel.y);
  }, [activeCard, labActiveTab, drawCanvasGrid]);

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
    const x = 40 + ((canvasStamps.length * 48) % 400);
    const y = 48 + Math.floor((canvasStamps.length * 48) / 400) * 52;
    const ctx = canvasRef.current?.getContext("2d");
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

  const ikatPuluhan = () => {
    if (bundledRef.current) return;
    bundledRef.current = true;
    setHookBundled(true);
    playSound("laser");
    if (extraRef.current === 4) bukaKartu2();
    else speakIGIL("10 lidi sudah menjadi 1 puluhan. Tambah 4 lidi satuan.");
  };

  const tambahSatuanHook = () => {
    if (extraRef.current >= 4) return;
    extraRef.current += 1;
    const next = extraRef.current;
    setHookExtraOnes(next);
    playSound("note", next * 2);
    if (bundledRef.current && next === 4) bukaKartu2();
  };

  const handleSelectPracticeAnswer = (question: PracticeQuestion, selected: string) => {
    const updatedAnswers = { ...practiceAnswers, [question.id]: selected };
    setPracticeAnswers(updatedAnswers);
    if (selected === question.correctAnswer) {
      playSound("coin");
      if (!claimedRef.current.includes(question.id)) {
        claimedRef.current = [...claimedRef.current, question.id];
        setPracticeTokens((prev) => Math.min(30, prev + 3));
        setComboStreak((prev) => prev + 1);
      }
      speakIGIL(question.explanation);
    } else {
      playSound("wrong");
      setComboStreak(0);
      speakIGIL(question.explanation);
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
      speakIGIL("Jawab seluruh 10 soal ujian sebelum dikumpulkan.");
      return;
    }
    const durationSeconds = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    let benar = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) benar += 1;
    });
    const skor = benar * 10;
    setExamScore(skor);
    setExamSubmitted(true);
    if (durationSeconds < 25) {
      setDwellTimeWarning(true);
      playSound("wrong");
      speakIGIL("Pengerjaanmu kurang dari 25 detik. Baca setiap soal, lalu ulangi ujian.");
      return;
    }
    setDwellTimeWarning(false);
    if (skor === 100) {
      setExamTokens(70);
      setCard6Unlocked(true);
      playSound("fanfare");
      speakIGIL("Nilai kamu 100. Praktikum sudah terbuka.");
    } else {
      playSound("wrong");
      speakIGIL(`Nilai kamu ${skor}. Ulangi ujian dengan soal baru sampai nilainya 100.`);
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

  const countBookTens = gridCells.filter((cell) => cell === "book-ten").length;
  const countBookOnes = gridCells.filter((cell) => cell === "book-one").length;
  const totalBooks = countBookTens * 10 + countBookOnes;
  const countPlantPots = gridCells.filter((cell) => cell === "plant-pot").length;
  const kataBanding = totalBooks > countPlantPots ? "lebih dari" : totalBooks < countPlantPots ? "kurang dari" : "sama dengan";

  const susunLaporan = () => {
    const rak = countBookTens * 10;
    const nama = NAMA_BILANGAN[totalBooks] ? ` (${namaBilangan(totalBooks)})` : "";
    return `Saya bersama Kira, Upe, Malosi, dan Tora merapikan pojok baca dan kebun bibit. Kami menaruh ${countBookTens} rak puluhan, yaitu ${rak} buku, dan ${countBookOnes} buku satuan, sehingga ${rak} + ${countBookOnes} = ${totalBooks} buku cerita${nama}. Di kebun ada ${countPlantPots} pot tanaman. Perbandingan nilai tempat: ${totalBooks} buku ${kataBanding} ${countPlantPots} pot.`;
  };

  const handleEvaluatePracticum = () => {
    const kata = studentReportText.trim().split(/\s+/).filter(Boolean).length;
    if (kata < 8) {
      playSound("wrong");
      speakIGIL("Tuliskan laporan minimal 8 kata, atau gunakan tombol bantu susun kalimat.");
      return;
    }
    let accuracyScore = 110;
    if (countBookTens === 1 && countBookOnes === 6 && totalBooks === 16) accuracyScore += 100;
    if (countPlantPots === 14 && totalBooks > countPlantPots) accuracyScore += 90;
    accuracyScore = Math.min(300, accuracyScore);

    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const laporan = studentReportText.toLowerCase();
    if (laporan.includes("puluhan") || laporan.includes("satuan")) synthesisScore += 30;
    if (laporan.includes("buku") && laporan.includes("tanaman")) synthesisScore += 30;
    if (laporan.includes("lebih dari") || laporan.includes("perbandingan")) synthesisScore += 30;
    synthesisScore = Math.min(250, synthesisScore);

    let optimizationVisualScore = 100;
    if (totalBooks === 16 && countPlantPots === 14) optimizationVisualScore += 100;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);

    let reasoningReportScore = Math.min(180, kata * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (laporan.includes("sehingga") || laporan.includes("berdasarkan")) reasoningReportScore += 30;
    reasoningReportScore = Math.min(250, reasoningReportScore);

    const totalQualityScore = accuracyScore + synthesisScore + optimizationVisualScore + reasoningReportScore;
    const rubricResult: PracticumEvaluationRubric = {
      accuracyScore,
      synthesisScore,
      optimizationVisualScore,
      reasoningReportScore,
      totalQualityScore,
      aiFeedbackSummary: totalQualityScore >= 850
        ? "Karya rapi. 1 rak puluhan dan 6 buku satuan menjadi 16 buku, dengan 14 pot tanaman, dan perbandingannya sesuai."
        : "Denah sudah berjalan. Untuk skor yang lebih tinggi, pasang 1 rak puluhan, 6 buku satuan, dan 14 pot tanaman.",
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

  const labPuluh = Math.floor(labValue / 10);
  const labSatu = labValue % 10;
  const ubahLab = (next: number) => setLabValue(Math.max(0, Math.min(20, next)));
  const puluhPabrik = Math.floor(factoryNumber / 10);
  const satuPabrik = factoryNumber % 10;
  const kalimatBanding = leftNum > rightNum ? "lebih dari" : leftNum < rightNum ? "kurang dari" : "sama dengan";

  const kartu = [
    { id: 1 as const, label: "1. Silabus & Hook", icon: "🗺️", unlocked: true },
    { id: 2 as const, label: "2. Game Materi", icon: "🎮", unlocked: card2Unlocked },
    { id: 3 as const, label: "3. Lab & Kanvas", icon: "🔬", unlocked: card2Unlocked },
    { id: 4 as const, label: "4. Latihan (+30)", icon: "🎯", unlocked: card2Unlocked },
    { id: 5 as const, label: "5. Ujian (+70)", icon: "🏆", unlocked: card5Unlocked },
    { id: 6 as const, label: "6. Praktikum (+50)", icon: "🎨", unlocked: card6Unlocked },
  ];

  return (
    <div className="min-h-screen select-none bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50 p-3 font-sans text-slate-800 md:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-sky-200 bg-white p-4 shadow-md md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-100">
              <span className="text-3xl" aria-hidden="true">🦉</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-extrabold text-white">KELAS 1 SD • BAB 5</span>
                {comboStreak > 0 ? <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-black text-amber-950">Rangkaian benar {comboStreak}</span> : null}
              </div>
              <h1 className="mt-0.5 text-lg font-black text-slate-900 md:text-xl">{CHAPTER_COMPETENCY_METADATA.chapterTitle}</h1>
              <p className="text-xs text-slate-500">{CHAPTER_COMPETENCY_METADATA.textbookReference}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border-b-4 border-slate-700 bg-slate-900 px-4 py-2.5 text-white">
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Dompet bab</div>
              <div className="text-xl font-black text-amber-400">{totalTokens} / 150 Token</div>
              <div className="text-[10px] text-slate-300">Latihan {practiceTokens}/30 • Ujian {examTokens}/70 • Praktikum {practicumTokens}/50</div>
            </div>
            <button type="button" onClick={() => speakIGIL(`Halo ${studentName}! Kita belajar bilangan 11 sampai 20 bersama Kira, Upe, Malosi, dan Tora.`)} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950">
              Suara IGIL
            </button>
          </div>
        </header>

        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-950">&quot;{mascotSpeech}&quot;</p>

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
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-black text-slate-900">Matematika Kelas I — Bab 5: Ayo Membilang sampai dengan 20</h2>
                <p className="mt-1 text-xs text-slate-600">Halaman 123–152. Bersama Kira, Upe, Malosi, dan Tora.</p>
              </div>
              <button type="button" onClick={() => speakIGIL("Kita menghitung sampai 20, membaca namanya, maju dan mundur, lalu membandingkan bilangan.")} className="shrink-0 rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-bold text-white">
                Dengarkan silabus
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="text-sm font-black text-amber-950">Empat bagian bab ini</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian A:</strong> menghitung, membaca, dan menulis bilangan bersama Kira.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian B:</strong> menghitung maju dan mundur bersama Tora.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian C:</strong> nilai tempat puluhan dan satuan bersama Upe.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian D:</strong> membandingkan bilangan bersama Malosi.</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Dua gerbang bab ini</h3>
                <p className="rounded-xl border border-emerald-200 bg-white p-2.5 text-xs text-slate-700">Sepuluh latihan paling banyak 30 token. Ujian 100 memberi 70 token.</p>
                <p className="rounded-xl border border-emerald-200 bg-white p-2.5 text-xs text-slate-700">Skor karya dihitung di perangkat: 300 + 250 + 200 + 250 = 1.000 poin.</p>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
              <h3 className="text-lg font-black">Ikat 10 lidi, lalu tambah 4 satuan</h3>
              <p className="text-xs text-sky-200">Langkah 1 mengikat 10 lidi menjadi 1 puluhan. Langkah 2 menambah 4 lidi satuan. 10 + 4 = 14.</p>
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <button type="button" onClick={ikatPuluhan} className={`w-full rounded-2xl border-b-4 px-3 py-3 text-left text-xs font-black ${hookBundled ? "border-emerald-800 bg-emerald-600 text-white" : "border-amber-600 bg-amber-400 text-slate-950"}`}>
                    {hookBundled ? "1 puluhan sudah diikat" : "Ikat 10 lidi"}
                  </button>
                  <button type="button" onClick={tambahSatuanHook} className={`w-full rounded-2xl border-b-4 px-3 py-3 text-left text-xs font-black ${hookExtraOnes === 4 ? "border-emerald-800 bg-emerald-600 text-white" : "border-sky-700 bg-sky-500 text-white"}`}>
                    Tambah lidi satuan ({hookExtraOnes}/4)
                  </button>
                </div>
                <div className="rounded-2xl bg-slate-950 p-4 text-center">
                  <div className="text-xs font-bold text-amber-300">{hookBundled ? "1 puluhan" : "10 lidi lepas"}</div>
                  <div className="mt-1 text-sm font-black text-sky-200">Satuan {hookExtraOnes} / 4</div>
                  {card2Unlocked ? <div className="mt-2 text-lg font-black text-amber-300">10 + 4 = 14</div> : null}
                </div>
              </div>
              {card2Unlocked ? (
                <button type="button" onClick={() => { playSound("pop"); setActiveCard(2); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">
                  Lanjut ke materi
                </button>
              ) : null}
            </div>
          </section>
        ) : null}

        {activeCard === 2 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <h2 className="text-lg font-black text-slate-900">Empat cara mengenal bilangan 11 sampai 20</h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                { code: "A" as const, title: "A. Membaca" },
                { code: "B" as const, title: "B. Maju mundur" },
                { code: "C" as const, title: "C. Nilai tempat" },
                { code: "D" as const, title: "D. Banding" },
              ].map((sub) => (
                <button key={sub.code} type="button" onClick={() => { playSound("click"); setActiveSubChapter(sub.code); }} className={`rounded-xl border-b-4 px-3 py-2 text-xs font-extrabold ${activeSubChapter === sub.code ? "border-amber-600 bg-amber-400 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"}`}>
                  {sub.title}
                </button>
              ))}
            </div>

            {activeSubChapter === "A" ? (
              <div className="space-y-3 rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-4">
                <h3 className="font-black text-rose-950">Piano bilangan bersama Kira</h3>
                <p className="text-center text-sm font-black text-slate-900">{pianoNumber} dibaca {namaBilangan(pianoNumber)}</p>
                <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
                  {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((nomor, idx) => (
                    <button key={nomor} type="button" onClick={() => { setPianoNumber(nomor); playSound("note", idx); speakIGIL(`${nomor}, dibaca ${namaBilangan(nomor)}.`); }} className={`h-14 rounded-xl border-b-4 text-sm font-black text-white ${pianoNumber === nomor ? "border-slate-950 bg-rose-600" : "border-rose-800 bg-rose-400"}`}>
                      {nomor}
                    </button>
                  ))}
                </div>
                {gambarBilangan("double-ten-frame", pianoNumber, 0, false)}
              </div>
            ) : null}

            {activeSubChapter === "B" ? (
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="font-black text-amber-950">Kereta maju dan mundur bersama Tora</h3>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { playSound("pop"); setTrainPos((p) => Math.max(11, p - 1)); }} className="rounded-xl border-b-4 border-rose-700 bg-rose-500 px-4 py-2 text-xs font-black text-white">Mundur</button>
                  <button type="button" onClick={() => { playSound("pop"); setTrainPos((p) => Math.min(20, p + 1)); }} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-4 py-2 text-xs font-black text-white">Maju</button>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((stasiun) => (
                    <button key={stasiun} type="button" onClick={() => { playSound("note", stasiun - 10); setTrainPos(stasiun); if (stasiun === 16) setBridgeFixed(true); }} className={`h-16 rounded-xl border-b-4 text-sm font-black ${trainPos === stasiun ? "border-orange-800 bg-amber-400 text-slate-950" : stasiun === 16 && !bridgeFixed ? "border-rose-400 bg-rose-100 text-rose-800" : "border-slate-300 bg-white text-slate-800"}`}>
                      {stasiun}
                    </button>
                  ))}
                </div>
                <p className="rounded-xl border border-amber-300 bg-white p-3 text-center text-sm font-black text-amber-950">
                  Stasiun {trainPos}, {namaBilangan(trainPos)}. Tetangga kiri {trainPos - 1}. {trainPos < 20 ? `Tetangga kanan ${trainPos + 1}.` : "Ini ujung 20."}
                </p>
              </div>
            ) : null}

            {activeSubChapter === "C" ? (
              <div className="space-y-3 rounded-2xl border-2 border-violet-200 bg-violet-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-black text-violet-950">Pabrik balok bersama Upe</h3>
                  <button type="button" onClick={() => { playSound("laser"); setFactoryBundled((prev) => !prev); }} className="rounded-xl border-b-4 border-orange-700 bg-amber-400 px-3 py-2 text-xs font-black text-slate-950">
                    {factoryBundled ? "Bongkar kubus" : "Rakit puluhan"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((nomor) => (
                    <button key={nomor} type="button" onClick={() => { playSound("click"); setFactoryNumber(nomor); }} className={`h-9 w-9 rounded-xl border-b-2 text-xs font-black ${factoryNumber === nomor ? "border-violet-900 bg-violet-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                      {nomor}
                    </button>
                  ))}
                </div>
                {factoryBundled ? gambarBilangan("dienes-blocks", puluhPabrik, satuPabrik, false) : (
                  <p className="rounded-xl bg-indigo-950 p-4 text-center text-sm font-bold text-indigo-100">{factoryNumber} kubus masih lepas. Rakit supaya terlihat puluhan dan satuan.</p>
                )}
                <p className="text-center text-sm font-black text-violet-950">{puluhPabrik} puluhan dan {satuPabrik} satuan = {factoryNumber}. Namanya {namaBilangan(factoryNumber)}.</p>
              </div>
            ) : null}

            {activeSubChapter === "D" ? (
              <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="font-black text-emerald-950">Bandingkan bilangan bersama Malosi</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="rounded-xl border border-emerald-300 bg-white p-3 text-xs font-black text-emerald-900">
                    Kiri {leftNum}
                    <input type="range" min={11} max={20} value={leftNum} onChange={(e) => setLeftNum(Number(e.target.value))} className="w-full accent-emerald-600" />
                  </label>
                  <label className="rounded-xl border border-sky-300 bg-white p-3 text-xs font-black text-sky-900">
                    Kanan {rightNum}
                    <input type="range" min={11} max={20} value={rightNum} onChange={(e) => setRightNum(Number(e.target.value))} className="w-full accent-sky-600" />
                  </label>
                </div>
                {gambarBilangan("alligator-compare", leftNum, rightNum, false)}
                <p className="rounded-xl bg-emerald-900 p-3 text-center text-sm font-black text-white">{leftNum} {kalimatBanding} {rightNum}</p>
              </div>
            ) : null}

            <div className="rounded-2xl border-b-4 border-slate-950 bg-slate-900 p-4 text-xs text-slate-200">
              <div className="font-extrabold uppercase tracking-wider text-amber-400">Poin penting bab 5</div>
              <p className="mt-2">1 puluhan = 10 satuan. Bilangan 11 sampai 19 punya 1 puluhan. 20 punya 2 puluhan.</p>
              <p>Maju bertambah 1. Mundur berkurang 1.</p>
            </div>
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <h2 className="text-lg font-black text-slate-900">Lab nilai tempat dan kanvas</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "abacus" as const, label: "Sempoa" },
                { id: "frame" as const, label: "Dua bingkai" },
                { id: "canvas" as const, label: "Kanvas" },
              ].map((tab) => (
                <button key={tab.id} type="button" onClick={() => { playSound("click"); setLabActiveTab(tab.id); }} className={`rounded-xl border-b-4 px-3 py-2 text-xs font-black ${labActiveTab === tab.id ? "border-cyan-700 bg-cyan-500 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            {labActiveTab !== "canvas" ? (
              <div className="space-y-3 rounded-2xl border-2 border-cyan-200 bg-cyan-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button type="button" onClick={() => ubahLab(labValue - 1)} className="rounded-xl bg-slate-200 px-3 py-1 font-black">-</button>
                  <p className="text-sm font-black text-sky-950">{labPuluh} puluhan dan {labSatu} satuan = {labValue}{NAMA_BILANGAN[labValue] ? `. Namanya ${namaBilangan(labValue)}.` : "."}</p>
                  <button type="button" onClick={() => ubahLab(labValue + 1)} className="rounded-xl bg-sky-600 px-3 py-1 font-black text-white">+</button>
                </div>
                <input type="range" min={0} max={20} value={labValue} onChange={(e) => ubahLab(Number(e.target.value))} className="w-full accent-sky-600" />
                {labActiveTab === "abacus" ? gambarBilangan("abacus-rods", labPuluh, labSatu, false) : gambarBilangan("double-ten-frame", labValue, 0, false)}
              </div>
            ) : (
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold">Goresan: {canvasStrokeCount}</span>
                  {[
                    { symbol: "🔟", label: "Puluhan" },
                    { symbol: "🔵", label: "Satuan" },
                    { symbol: "🦉", label: "IGIL" },
                  ].map((stempel) => (
                    <button key={stempel.label} type="button" onClick={() => addCanvasStamp(stempel.symbol, stempel.label)} className="rounded-xl border-b-2 border-amber-400 bg-white px-2.5 py-1.5 text-xs font-bold">
                      {stempel.symbol} {stempel.label}
                    </button>
                  ))}
                  <button type="button" onClick={clearSmartCanvas} className="ml-auto rounded-xl border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-800">Bersihkan</button>
                </div>
                <canvas ref={canvasRef} width={480} height={210} onPointerDown={mulaiGambar} onPointerMove={geserGambar} onPointerUp={selesaiGambar} onPointerLeave={selesaiGambar} className="h-auto w-full touch-none rounded-2xl border-2 border-amber-300 bg-white" />
              </div>
            )}
          </section>
        ) : null}

        {activeCard === 4 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-black text-slate-900">Latihan bilangan 11 sampai 20</h2>
              <div className="rounded-2xl border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-black text-amber-950">Token latihan {practiceTokens} / 30</div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = practiceAnswers[q.id];
                const benar = ans === q.correctAnswer;
                return (
                  <button key={q.id} type="button" onClick={() => { playSound("click"); setCurrentPracticeIdx(idx); }} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentPracticeIdx === idx ? "border-sky-800 bg-sky-600 text-white" : ans ? benar ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900" : "border-slate-300 bg-slate-100 text-slate-700"}`}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            {(() => {
              const q = PRACTICE_QUESTIONS[currentPracticeIdx];
              if (!q) return null;
              const selected = practiceAnswers[q.id];
              const benar = selected === q.correctAnswer;
              return (
                <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">Soal {q.id} dari 10 • {q.storyCharacter}</span>
                    <button type="button" onClick={() => speakIGIL(q.prompt)} className="rounded-xl border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">Bacakan soal</button>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 md:text-base">{q.badgeTitle}. {q.prompt}</p>
                  {gambarBilangan(q.visualType, q.paramA, q.paramB, !selected)}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {q.options.map((opt) => (
                      <button key={opt} type="button" onClick={() => handleSelectPracticeAnswer(q, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${selected === opt ? opt === q.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : "border-rose-700 bg-rose-500 text-white" : "border-slate-300 bg-white text-slate-800"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {selected ? (
                    <div className={`rounded-2xl border-2 p-3 text-xs ${benar ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                      <div className="text-sm font-black">{benar ? "Jawaban benar. +3 token." : "Belum tepat."}</div>
                      <p>{q.explanation}</p>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <button type="button" disabled={currentPracticeIdx === 0} onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40">Soal sebelumnya</button>
                    {currentPracticeIdx < PRACTICE_QUESTIONS.length - 1 ? (
                      <button type="button" onClick={() => setCurrentPracticeIdx((i) => Math.min(PRACTICE_QUESTIONS.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Soal berikutnya</button>
                    ) : card5Unlocked ? (
                      <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(5); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Buka ujian</button>
                    ) : null}
                  </div>
                </div>
              );
            })()}
          </section>
        ) : null}

        {activeCard === 5 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-3.5 text-white">
              <div>
                <div className="text-[11px] font-extrabold uppercase text-amber-400">Ujian bab 5</div>
                <h2 className="text-base font-black">Nilai 100 membuka praktikum</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5">Percobaan ke-{examAttempts}</span>
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono text-sky-300">{formatStopwatch(examElapsedDeci)}</span>
                <span className={`rounded-xl border px-3 py-1.5 ${focusLossCount === 0 ? "border-emerald-700 bg-emerald-950 text-emerald-300" : "border-rose-600 bg-rose-950 text-rose-300"}`}>Pindah tab {focusLossCount}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {examQuestions.map((q, idx) => (
                <button key={q.id} type="button" onClick={() => setCurrentExamIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentExamIdx === idx ? "border-amber-600 bg-amber-400 text-slate-950" : examAnswers[q.id] ? "border-sky-400 bg-sky-100 text-sky-900" : "border-slate-300 bg-slate-100 text-slate-600"}`}>
                  {idx + 1}
                </button>
              ))}
            </div>
            {(() => {
              const q = examQuestions[currentExamIdx];
              if (!q) return null;
              const chosen = examAnswers[q.id];
              return (
                <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black text-white">Soal {q.id}</span>
                    <button type="button" onClick={() => speakIGIL(q.questionText)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-bold">Dengarkan soal</button>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 md:text-base">{q.questionText}</p>
                  {gambarBilangan(q.visualType, q.paramA, q.paramB, !examSubmitted)}
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {q.options.map((opt) => (
                      <button key={opt} type="button" onClick={() => handleSelectExamAnswer(q.id, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${examSubmitted ? opt === q.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : chosen === opt ? "border-rose-700 bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-500" : chosen === opt ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-800"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {examSubmitted ? <p className="rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-700">{q.explanation}</p> : null}
                  <div className="flex items-center justify-between">
                    <button type="button" disabled={currentExamIdx === 0} onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40">Sebelumnya</button>
                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button type="button" onClick={() => setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button>
                    ) : !examSubmitted ? (
                      <button type="button" onClick={handleSubmitExam} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-5 py-2.5 text-xs font-black text-white">Kumpulkan ujian</button>
                    ) : null}
                  </div>
                </div>
              );
            })()}
            {examSubmitted ? (
              <div className={`space-y-2 rounded-2xl border-2 p-4 ${examScore === 100 && !dwellTimeWarning ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                <h3 className="text-base font-black">
                  {dwellTimeWarning ? "Pengerjaan kurang dari 25 detik" : examScore === 100 ? "Nilai 100. Praktikum terbuka." : `Skor ujian ${examScore}/100`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={handleRetryExam} className="rounded-xl border-b-4 border-slate-400 bg-white px-4 py-2 text-xs font-black text-slate-900">Ulangi ujian</button>
                  {card6Unlocked ? <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(6); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Masuk praktikum</button> : null}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {activeCard === 6 ? (
          <section className="space-y-5 rounded-3xl border-2 border-emerald-300 bg-white p-5 shadow-md">
            <div className="space-y-3 rounded-2xl bg-emerald-900 p-4 text-white">
              <h2 className="text-lg font-black">Pojok baca dan kebun bibit</h2>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPracticumMode("single")} className={`rounded-xl px-3 py-1.5 text-xs font-black ${practicumMode === "single" ? "bg-amber-400 text-slate-950" : "bg-white/10 text-white"}`}>Bab ini saja</button>
                <button type="button" onClick={() => setPracticumMode("cross4")} className={`rounded-xl px-3 py-1.5 text-xs font-black ${practicumMode === "cross4" ? "bg-amber-400 text-slate-950" : "bg-white/10 text-white"}`}>Lintas bab</button>
              </div>
              {practicumMode === "cross4" ? (
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                    <div className="font-black text-amber-300">1. Matematika</div>
                    <p>{CHAPTER_COMPETENCY_METADATA.practicumSynthesisHook}</p>
                  </div>
                  {completedOtherChapters.slice(0, 3).map((bab, idx) => (
                    <div key={bab.chapterId} className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                      <div className="font-black text-amber-300">{idx + 2}. {bab.subject}</div>
                      <p>{bab.practicumSynthesisHook}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs">Pasang 1 rak puluhan, 6 buku satuan, dan 14 pot tanaman.</p>
              )}
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "book-ten" as const, label: "Rak puluhan" },
                  { id: "book-one" as const, label: "Buku satuan" },
                  { id: "plant-pot" as const, label: "Pot tanaman" },
                  { id: "empty" as const, label: "Kosongkan" },
                ].map((alat) => (
                  <button key={alat.id} type="button" onClick={() => { playSound("click"); setSelectedBrushTool(alat.id); }} className={`rounded-xl border-b-4 px-3 py-1.5 text-xs font-black ${selectedBrushTool === alat.id ? "border-emerald-800 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                    {alat.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {gridCells.map((cell, idx) => (
                  <button key={idx} type="button" onClick={() => { playSound("pop"); setGridCells((prev) => { const next = [...prev]; const sekarang = next[idx] ?? "empty"; next[idx] = sekarang === selectedBrushTool ? "empty" : selectedBrushTool; return next; }); }} className={`flex h-16 flex-col items-center justify-center rounded-2xl border-b-4 text-[10px] font-black ${cell === "book-ten" ? "border-amber-400 bg-amber-100 text-amber-950" : cell === "book-one" ? "border-sky-400 bg-sky-100 text-sky-950" : cell === "plant-pot" ? "border-emerald-400 bg-emerald-100 text-emerald-950" : "border-slate-200 bg-slate-50 text-slate-400"}`}>
                    <span className="text-lg">{cell === "book-ten" ? "📚" : cell === "book-one" ? "📖" : cell === "plant-pot" ? "🌱" : "·"}</span>
                    {cell === "book-ten" ? "10 buku" : cell === "book-one" ? "1 buku" : cell === "plant-pot" ? "1 pot" : idx + 1}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 text-center text-xs font-black sm:grid-cols-2">
                <div className={`rounded-xl border p-2 ${totalBooks === 16 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>
                  Buku: {countBookTens} × 10 + {countBookOnes} = {totalBooks}
                </div>
                <div className={`rounded-xl border p-2 ${countPlantPots === 14 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>
                  Pot: {countPlantPots}. {totalBooks} {kataBanding} {countPlantPots}
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
              <button type="button" onClick={() => { playSound("pop"); setStudentReportText(susunLaporan()); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">
                Bantu susun kalimat
              </button>
              <textarea rows={4} value={studentReportText} onChange={(e) => setStudentReportText(e.target.value)} className="w-full rounded-xl border-2 border-amber-300 bg-white p-3 text-sm" placeholder="Ceritakan jumlah puluhan, satuan, dan pot tanaman." />
              <button type="button" onClick={handleEvaluatePracticum} className="w-full rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 py-3 text-sm font-black text-white">
                Hitung skor karya
              </button>
            </div>
            {practicumRubric ? (
              <div className="space-y-3 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-black">{studentName}</h3>
                  <div className="rounded-2xl bg-amber-400 px-4 py-2 text-center text-slate-950">
                    <div className="text-[10px] font-black uppercase">Skor karya</div>
                    <div className="text-2xl font-black">{practicumRubric.totalQualityScore} / 1.000</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Akurasi {practicumRubric.accuracyScore} / 300</div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Sintesis {practicumRubric.synthesisScore} / 250</div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Visual {practicumRubric.optimizationVisualScore} / 200</div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Laporan {practicumRubric.reasoningReportScore} / 250</div>
                </div>
                <p className="text-xs text-slate-200">{practicumRubric.aiFeedbackSummary}</p>
                {chapterCompletedFlag ? <p className="text-xs font-bold text-emerald-300">Catatan bab tersimpan di perangkat ini.</p> : null}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
