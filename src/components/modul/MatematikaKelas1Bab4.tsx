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
  chapterId: "MAT-K1-B4",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 4,
  chapterTitle: "Mengenal Bentuk",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 4, Halaman 91–122",
  coreSkills: [
    "Mendeskripsikan dan mengelompokkan benda berdasarkan bentuk bangun datar (segitiga, segi empat, dan lingkaran)",
    "Mengidentifikasi ciri bangun datar (banyak sisi lurus, sisi lengkung, dan titik sudut) pada berbagai orientasi posisi",
    "Menyusun (komposisi) dan mengurai (dekomposisi) berbagai bentuk bangun datar menjadi karya kreatif",
    "Mengenali dan melanjutkan pola barisan bentuk bangun datar yang berulang",
  ],
  practicumSynthesisHook:
    "Gunakan komposisi bangun datar (segitiga, segi empat, lingkaran), perhitungan jumlah sisi serta titik sudut, dan pola barisan bentuk berulang untuk merancang struktur bangunan ramah lingkungan serta rambu ketertiban.",
};

type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare";
type ShapeVisualType = "single-shape" | "tangram-house" | "shape-collection" | "shape-pattern" | "decompose-square";
type PotonganPola = "tri" | "sq" | "cir" | "?";

interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  prompt: string;
  visualType: ShapeVisualType;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: ShapeVisualType;
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
    chapterId: "IPAS-K1-B4",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 4,
    chapterTitle: "Rumah Sehat & Hemat Energi Matahari",
    textbookReference: "Kurikulum Merdeka Fase A — Mengenal Lingkungan Rumah & Cahaya",
    coreSkills: ["Mengenal fungsi atap dan jendela ventilasi", "Memanfaatkan cahaya matahari"],
    practicumSynthesisHook: "Rancang rumah sehat dengan atap segitiga penahan hujan dan jendela lingkaran ventilasi udara.",
  },
  {
    chapterId: "BINDO-K1-B4",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 4,
    chapterTitle: "Aku Bisa! & Mendeskripsikan Benda di Sekitar",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Kemendikbudristek Bab 4",
    coreSkills: ["Mendeskripsikan bentuk dan warna benda", "Menulis laporan pengamatan"],
    practicumSynthesisHook: "Tuliskan deskripsi lengkap bentuk atap, dinding, jendela, dan pola pagar.",
  },
  {
    chapterId: "PANCASILA-K1-B4",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 4,
    chapterTitle: "Aku Patuh Aturan & Rambu Ketertiban Sekolah",
    textbookReference: "Pendidikan Pancasila SD Kelas I Kemendikbudristek Bab 4",
    coreSkills: ["Mematuhi rambu dan aturan bersama", "Menjaga kerapian lingkungan sekolah"],
    practicumSynthesisHook: "Susun rambu ketertiban dan pola pagar berulang yang rapi di halaman sekolah.",
  },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    prompt: "Kira mengamati jam dinding bulat dan roda sepeda di rumahnya. Kedua benda tersebut memiliki tepi melengkung yang disebut bentuk...",
    visualType: "single-shape",
    paramA: 0,
    paramB: 0,
    options: ["Lingkaran", "Segitiga", "Segi empat", "Layang-layang"],
    correctAnswer: "Lingkaran",
    explanation: "Jam dinding bulat dan roda sepeda berbentuk lingkaran. Tepinya satu garis lengkung yang bertemu, tanpa titik sudut.",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    prompt: "Upe meraba tepi rambu peringatan dan penggaris segitiga. Berapa banyak sisi lurus dan titik sudut yang dimiliki bangun segitiga?",
    visualType: "single-shape",
    paramA: 3,
    paramB: 0,
    options: ["3 sisi dan 3 titik sudut", "4 sisi dan 4 titik sudut", "1 sisi dan 0 titik sudut", "3 sisi dan 4 titik sudut"],
    correctAnswer: "3 sisi dan 3 titik sudut",
    explanation: "Segitiga dibatasi 3 garis lurus dan punya 3 titik sudut.",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    prompt: "Malosi memutar kertas persegi sehingga tampak miring. Bangun itu tetap punya 4 sisi lurus, sehingga namanya...",
    visualType: "single-shape",
    paramA: 4,
    paramB: 45,
    options: ["Segi empat", "Segitiga", "Lingkaran", "Garis lengkung"],
    correctAnswer: "Segi empat",
    explanation: "Diputar atau dimiringkan, bangun dengan 4 sisi lurus dan 4 titik sudut tetap segi empat.",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    prompt: "Tora menghitung sisi lurus pada buku tulis dan pintu kelas yang berbentuk segi empat. Berapa banyak sisi lurusnya?",
    visualType: "single-shape",
    paramA: 4,
    paramB: 0,
    options: ["4", "3", "2", "0"],
    correctAnswer: "4",
    explanation: "Segi empat, seperti buku tulis dan pintu, punya 4 sisi lurus dan 4 titik sudut.",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    prompt: "Manakah bangun datar yang tidak memiliki titik sudut dan hanya memiliki 1 sisi lengkung tertutup?",
    visualType: "single-shape",
    paramA: 0,
    paramB: 0,
    options: ["Lingkaran", "Segitiga", "Segi empat", "Persegi panjang"],
    correctAnswer: "Lingkaran",
    explanation: "Lingkaran punya 1 sisi lengkung dan 0 titik sudut.",
  },
  {
    id: 6,
    storyCharacter: "Malosi",
    prompt: "Malosi menggunting 1 kertas segi empat tepat pada garis miring dari pojok ke pojok. Dua potongan yang terbentuk adalah...",
    visualType: "decompose-square",
    paramA: 2,
    paramB: 1,
    options: ["2 Segitiga", "2 Lingkaran", "3 Segitiga", "4 Segi empat"],
    correctAnswer: "2 Segitiga",
    explanation: "Satu segi empat yang dipotong pada garis diagonalnya terurai menjadi 2 segitiga.",
  },
  {
    id: 7,
    storyCharacter: "Upe",
    prompt: "Rumah mainan Upe punya atap segitiga, dinding segi empat, dan jendela lingkaran. Berapa banyak bangun datar pada 1 rumah itu?",
    visualType: "tangram-house",
    paramA: 1,
    paramB: 1,
    options: ["3 bangun datar", "2 bangun datar", "4 bangun datar", "5 bangun datar"],
    correctAnswer: "3 bangun datar",
    explanation: "1 atap segitiga + 1 dinding segi empat + 1 jendela lingkaran = 3 bangun datar.",
  },
  {
    id: 8,
    storyCharacter: "Tora",
    prompt: "Di kotak Tora ada 4 segitiga merah dan 3 segi empat biru. Berapa banyak bangun segitiga di dalam kotak?",
    visualType: "shape-collection",
    paramA: 4,
    paramB: 3,
    options: ["4", "3", "7", "1"],
    correctAnswer: "4",
    explanation: "Yang dihitung hanya segitiga merah. Ada 4 segitiga. Angka 7 adalah jumlah semua bangun, bukan hanya segitiga.",
  },
  {
    id: 9,
    storyCharacter: "Kira",
    prompt: "Kira menyusun pola: Segitiga, Lingkaran, Segitiga, Lingkaran, [...]. Bangun apakah yang tepat berikutnya?",
    visualType: "shape-pattern",
    paramA: 1,
    paramB: 0,
    options: ["Segitiga", "Lingkaran", "Segi empat", "Bintang"],
    correctAnswer: "Segitiga",
    explanation: "Polanya bergantian. Sesudah lingkaran, urutan kembali ke segitiga.",
  },
  {
    id: 10,
    storyCharacter: "Malosi",
    prompt: "Pola Malosi: Segi empat, Segi empat, Segitiga, Segi empat, Segi empat, [...]. Bentuk manakah yang melanjutkan pola itu?",
    visualType: "shape-pattern",
    paramA: 2,
    paramB: 0,
    options: ["Segitiga", "Segi empat", "Lingkaran", "Garis lurus"],
    correctAnswer: "Segitiga",
    explanation: "Polanya 2 segi empat lalu 1 segitiga. Sesudah dua segi empat, berikutnya segitiga.",
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
  const q1Tri = Math.floor(Math.random() * 4) + 3;
  const q1Sq = Math.floor(Math.random() * 3) + 2;
  const q2Tri = Math.floor(Math.random() * 3) + 2;
  const q2Sq = Math.floor(Math.random() * 4) + 3;
  const q3Sisi = [0, 3, 4][Math.floor(Math.random() * 3)] ?? 0;
  const q3Nama = q3Sisi === 3 ? "Segitiga" : q3Sisi === 4 ? "Segi empat" : "Lingkaran";
  const q4Tri = Math.floor(Math.random() * 2) + 1;
  const q4Sudut = q4Tri * 3;
  const duaSegiEmpat = Math.random() > 0.5;
  const q5Sisi = duaSegiEmpat ? 8 : 7;
  const q6Persegi = Math.floor(Math.random() * 3) + 1;
  const q6Segitiga = q6Persegi * 2;
  const q7Rumah = Math.floor(Math.random() * 3) + 1;
  const q7Keping = q7Rumah * 3;
  const polaAb = Math.random() > 0.5 ? 1 : 3;
  const jawabanAb = polaAb === 1 ? "Segitiga" : "Lingkaran";
  const q10Tri = Math.floor(Math.random() * 4) + 2;
  const q10Sq = Math.floor(Math.random() * 4) + 2;
  const q10Total = q10Tri + q10Sq;

  return [
    {
      id: 1,
      questionText: `Di kotak Kira ada ${q1Tri} segitiga merah dan ${q1Sq} segi empat biru. Berapa banyak bangun segitiga?`,
      visualType: "shape-collection",
      paramA: q1Tri,
      paramB: q1Sq,
      options: pilihanAngka(q1Tri, 1, 9),
      correctAnswer: String(q1Tri),
      explanation: `Segitiga merah ada ${q1Tri} buah.`,
    },
    {
      id: 2,
      questionText: `Upe mengelompokkan ${q2Tri} segitiga dan ${q2Sq} segi empat. Berapa banyak bangun segi empat?`,
      visualType: "shape-collection",
      paramA: q2Tri,
      paramB: q2Sq,
      options: pilihanAngka(q2Sq, 1, 9),
      correctAnswer: String(q2Sq),
      explanation: `Segi empat ada ${q2Sq} buah.`,
    },
    {
      id: 3,
      questionText: q3Sisi === 0
        ? "Aku punya 1 sisi lengkung tertutup dan 0 titik sudut. Siapakah aku?"
        : `Aku punya tepat ${q3Sisi} sisi lurus dan ${q3Sisi} titik sudut. Siapakah aku?`,
      visualType: "single-shape",
      paramA: q3Sisi,
      paramB: 15,
      options: acak(["Segitiga", "Segi empat", "Lingkaran", "Garis terbuka"]),
      correctAnswer: q3Nama,
      explanation: q3Sisi === 0
        ? "Lingkaran dibatasi 1 sisi lengkung dan punya 0 titik sudut."
        : `Bangun dengan ${q3Sisi} sisi lurus dan ${q3Sisi} titik sudut adalah ${q3Nama}.`,
    },
    {
      id: 4,
      questionText: `Satu segitiga punya 3 titik sudut. Jika Malosi memegang ${q4Tri} segitiga terpisah, berapa jumlah seluruh titik sudutnya?`,
      visualType: "shape-collection",
      paramA: q4Tri,
      paramB: 0,
      options: pilihanAngka(q4Sudut, 1, 9),
      correctAnswer: String(q4Sudut),
      explanation: `${q4Tri} segitiga × 3 titik sudut = ${q4Sudut} titik sudut.`,
    },
    {
      id: 5,
      questionText: duaSegiEmpat
        ? "Tora meletakkan 2 segi empat terpisah. Berapa jumlah seluruh sisi lurusnya? (4 + 4 = ...)"
        : "Kira meletakkan 1 segitiga (3 sisi) dan 1 segi empat (4 sisi) terpisah. Berapa jumlah seluruh sisi lurusnya? (3 + 4 = ...)",
      visualType: "shape-collection",
      paramA: duaSegiEmpat ? 0 : 1,
      paramB: duaSegiEmpat ? 2 : 1,
      options: pilihanAngka(q5Sisi, 3, 10),
      correctAnswer: String(q5Sisi),
      explanation: duaSegiEmpat ? "4 + 4 = 8 sisi lurus." : "3 + 4 = 7 sisi lurus.",
    },
    {
      id: 6,
      questionText: `Satu segi empat yang dipotong pada garis miring menghasilkan 2 segitiga. Jika Upe memotong ${q6Persegi} segi empat dengan cara yang sama, berapa segitiga yang dihasilkan?`,
      visualType: "decompose-square",
      paramA: q6Segitiga,
      paramB: q6Persegi,
      options: pilihanAngka(q6Segitiga, 1, 8),
      correctAnswer: String(q6Segitiga),
      explanation: `${q6Persegi} segi empat × 2 = ${q6Segitiga} segitiga.`,
    },
    {
      id: 7,
      questionText: `Satu rumah taman disusun dari 3 keping: 1 segitiga, 1 segi empat, dan 1 lingkaran. Jika Malosi membuat ${q7Rumah} rumah, berapa keping yang dibutuhkan?`,
      visualType: "tangram-house",
      paramA: q7Rumah,
      paramB: q7Rumah,
      options: pilihanAngka(q7Keping, 2, 10),
      correctAnswer: String(q7Keping),
      explanation: `${q7Rumah} rumah × 3 keping = ${q7Keping} keping.`,
    },
    {
      id: 8,
      questionText: polaAb === 1
        ? "Pola berulang: Segitiga, Lingkaran, Segitiga, Lingkaran, [...]. Bangun apakah berikutnya?"
        : "Pola berulang: Lingkaran, Segi empat, Lingkaran, Segi empat, [...]. Bangun apakah berikutnya?",
      visualType: "shape-pattern",
      paramA: polaAb,
      paramB: 0,
      options: acak(["Segitiga", "Lingkaran", "Segi empat", "Layang-layang"]),
      correctAnswer: jawabanAb,
      explanation: `Dua bentuk bergantian, jadi berikutnya ${jawabanAb}.`,
    },
    {
      id: 9,
      questionText: "Pola pagar Tora: Segi empat, Segi empat, Segitiga, Segi empat, Segi empat, [...]. Bentuk apakah berikutnya?",
      visualType: "shape-pattern",
      paramA: 2,
      paramB: 0,
      options: acak(["Segitiga", "Segi empat", "Lingkaran", "Bintang"]),
      correctAnswer: "Segitiga",
      explanation: "Pola setiap 3 bangun: segi empat, segi empat, lalu segitiga.",
    },
    {
      id: 10,
      questionText: `Di kotak ada ${q10Tri} segitiga dan ${q10Sq} segi empat. Berapa jumlah seluruh keping? (${q10Tri} + ${q10Sq} = ...)`,
      visualType: "shape-collection",
      paramA: q10Tri,
      paramB: q10Sq,
      options: pilihanAngka(q10Total, 3, 10),
      correctAnswer: String(q10Total),
      explanation: `${q10Tri} + ${q10Sq} = ${q10Total} bangun datar.`,
    },
  ];
}

function urutanPola(jenis: number, tampilkanJawaban: boolean): PotonganPola[] {
  const dasar: PotonganPola[] = jenis === 1
    ? ["tri", "cir", "tri", "cir"]
    : jenis === 2
      ? ["sq", "sq", "tri", "sq", "sq"]
      : ["cir", "sq", "cir", "sq"];
  const berikut: PotonganPola = jenis === 3 ? "cir" : "tri";
  return [...dasar, tampilkanJawaban ? berikut : "?"];
}

function gambarBentuk(type: ShapeVisualType, paramA: number, paramB: number, sembunyikanHasil = false) {
  if (type === "single-shape") {
    return (
      <svg viewBox="0 0 320 140" className="mx-auto w-full max-w-sm" aria-hidden="true">
        <rect x="10" y="10" width="300" height="120" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
        {paramA === 0 ? (
          <g>
            <circle cx="160" cy="70" r="42" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
            {sembunyikanHasil ? null : <text x="160" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">0 titik sudut</text>}
          </g>
        ) : null}
        {paramA === 3 ? (
          <g transform={`translate(160, 75) rotate(${paramB})`}>
            <polygon points="0,-45 -48,35 48,35" fill="#fecdd3" stroke="#e11d48" strokeWidth="4" />
            <circle cx="0" cy="-45" r="5" fill="#881337" />
            <circle cx="-48" cy="35" r="5" fill="#881337" />
            <circle cx="48" cy="35" r="5" fill="#881337" />
          </g>
        ) : null}
        {paramA === 4 ? (
          <g transform={`translate(160, 70) rotate(${paramB})`}>
            <rect x="-38" y="-38" width="76" height="76" fill="#bfdbfe" stroke="#2563eb" strokeWidth="4" />
            <circle cx="-38" cy="-38" r="5" fill="#1e3a8a" />
            <circle cx="38" cy="-38" r="5" fill="#1e3a8a" />
            <circle cx="38" cy="38" r="5" fill="#1e3a8a" />
            <circle cx="-38" cy="38" r="5" fill="#1e3a8a" />
          </g>
        ) : null}
      </svg>
    );
  }
  if (type === "decompose-square") {
    const banyak = Math.max(1, paramB);
    return (
      <svg viewBox="0 0 360 130" className="mx-auto w-full max-w-md" aria-hidden="true">
        <rect x="8" y="8" width="344" height="114" rx="12" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        {Array.from({ length: banyak }).map((_, idx) => {
          const x = 45 + idx * 105;
          const y = 30;
          return (
            <g key={idx}>
              <polygon points={`${x},${y} ${x + 70},${y} ${x},${y + 70}`} fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
              <polygon points={`${x + 70},${y} ${x + 70},${y + 70} ${x},${y + 70}`} fill="#93c5fd" stroke="#2563eb" strokeWidth="2.5" />
              <line x1={x} y1={y + 70} x2={x + 70} y2={y} stroke="#dc2626" strokeWidth="3" strokeDasharray="4 3" />
            </g>
          );
        })}
      </svg>
    );
  }
  if (type === "tangram-house") {
    const rumah = Math.max(1, paramA);
    return (
      <svg viewBox="0 0 360 135" className="mx-auto w-full max-w-md" aria-hidden="true">
        <rect x="8" y="8" width="344" height="119" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        {Array.from({ length: rumah }).map((_, idx) => {
          const cx = 75 + idx * 105;
          return (
            <g key={idx}>
              <polygon points={`${cx},22 ${cx - 36},60 ${cx + 36},60`} fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" />
              <rect x={cx - 28} y={60} width="56" height="50" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
              <circle cx={cx} cy={85} r="12" fill="#38bdf8" stroke="#0369a1" strokeWidth="2.5" />
            </g>
          );
        })}
      </svg>
    );
  }
  if (type === "shape-pattern") {
    const urutan = urutanPola(paramA, !sembunyikanHasil);
    return (
      <svg viewBox="0 0 380 115" className="mx-auto w-full max-w-md" aria-hidden="true">
        <rect x="6" y="10" width="368" height="95" rx="12" fill="#fefce8" stroke="#eab308" strokeWidth="2.5" />
        {urutan.map((item, idx) => {
          const cx = 42 + idx * 58;
          const cy = 58;
          return (
            <g key={idx}>
              {item === "tri" ? <polygon points={`${cx},${cy - 22} ${cx - 22},${cy + 18} ${cx + 22},${cy + 18}`} fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" /> : null}
              {item === "sq" ? <rect x={cx - 19} y={cy - 19} width="38" height="38" fill="#3b82f6" stroke="#1e40af" strokeWidth="2.5" /> : null}
              {item === "cir" ? <circle cx={cx} cy={cy} r="20" fill="#10b981" stroke="#065f46" strokeWidth="2.5" /> : null}
              {item === "?" ? (
                <g>
                  <rect x={cx - 22} y={cy - 22} width="44" height="44" rx="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" strokeDasharray="4 2" />
                  <text x={cx} y={cy + 7} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#713f12">?</text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 380 130" className="mx-auto w-full max-w-md" aria-hidden="true">
      <rect x="8" y="10" width="364" height="110" rx="14" fill="#f8fafc" stroke="#64748b" strokeWidth="2.5" />
      {Array.from({ length: paramA }).map((_, i) => {
        const cx = 42 + i * 52;
        const cy = 44;
        return <polygon key={`tri-${i}`} points={`${cx},${cy - 16} ${cx - 18},${cy + 14} ${cx + 18},${cy + 14}`} fill="#f43f5e" stroke="#9f1239" strokeWidth="2" />;
      })}
      {Array.from({ length: paramB }).map((_, i) => (
        <rect key={`sq-${i}`} x={26 + i * 52} y={74} width="30" height="30" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
      ))}
    </svg>
  );
}

function formatStopwatch(deci: number) {
  const totalDetik = Math.floor(deci / 10);
  return `${String(Math.floor(totalDetik / 60)).padStart(2, "0")}:${String(totalDetik % 60).padStart(2, "0")}.${deci % 10}`;
}

export default function MatematikaKelas1Bab4({
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

  const [roofPlaced, setRoofPlaced] = useState(false);
  const [wallPlaced, setWallPlaced] = useState(false);
  const [windowPlaced, setWindowPlaced] = useState(false);
  const [activeSubChapter, setActiveSubChapter] = useState<"A" | "B" | "C" | "D">("A");
  const [subASelectedObject, setSubASelectedObject] = useState<"jam" | "buku" | "penggaris" | "semangka">("jam");
  const [subBShapeType, setSubBShapeType] = useState<"segitiga" | "segiempat" | "lingkaran">("segitiga");
  const [subBRotationDeg, setSubBRotationDeg] = useState(0);
  const [subCTangramJoined, setSubCTangramJoined] = useState(false);
  const [subDPatternSlot, setSubDPatternSlot] = useState<"" | "segitiga" | "segiempat" | "lingkaran">("");

  const [labTriangles, setLabTriangles] = useState(2);
  const [labSquares, setLabSquares] = useState(2);
  const [labCircles, setLabCircles] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const menggambarRef = useRef(false);
  const goresanRef = useRef(0);
  const stempelRef = useRef<CanvasStampItem[]>([]);
  const [brushColor, setBrushColor] = useState("#2563eb");
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
  const [pracRoofTriangles, setPracRoofTriangles] = useState(2);
  const [pracWallSquares, setPracWallSquares] = useState(4);
  const [pracWindowCircles, setPracWindowCircles] = useState(4);
  const [pracFencePattern, setPracFencePattern] = useState<"teratur" | "acak">("teratur");
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
      if (type === "click") bunyi(530, "sine", now, 0.06, 0.1);
      else if (type === "pop") {
        bunyi(450, "triangle", now, 0.08, 0.14);
        bunyi(740, "sine", now + 0.04, 0.09, 0.12);
      } else if (type === "laser") {
        bunyi(880, "sawtooth", now, 0.12, 0.08);
        bunyi(440, "sine", now + 0.06, 0.12, 0.1);
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

  const pasangKeping = (piece: "roof" | "wall" | "window") => {
    if (piece === "roof" && roofPlaced) return;
    if (piece === "wall" && wallPlaced) return;
    if (piece === "window" && windowPlaced) return;
    const atap = piece === "roof" || roofPlaced;
    const dinding = piece === "wall" || wallPlaced;
    const jendela = piece === "window" || windowPlaced;
    if (piece === "roof") setRoofPlaced(true);
    if (piece === "wall") setWallPlaced(true);
    if (piece === "window") setWindowPlaced(true);
    if (atap && dinding && jendela) {
      setCard2Unlocked(true);
      playSound("fanfare");
      speakIGIL("Rumah pohon sudah utuh. Atap segitiga, dinding segi empat, dan jendela lingkaran. Kartu materi sudah terbuka.");
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

  const susunLaporan = () => {
    const total = pracRoofTriangles + pracWallSquares + pracWindowCircles;
    const sudutAtap = pracRoofTriangles * 3;
    const sudutDinding = pracWallSquares * 4;
    const sudut = sudutAtap + sudutDinding;
    const pagar = pracFencePattern === "teratur"
      ? "pagar berulang teratur: segitiga, lingkaran, segitiga, lingkaran"
      : "pagar yang belum berulang teratur";
    return `Saya bersama Kira, Upe, Malosi, dan Tora merancang paviliun sekolah. Kami memasang ${pracRoofTriangles} atap segitiga, ${pracWallSquares} dinding segi empat, dan ${pracWindowCircles} jendela lingkaran untuk ventilasi cahaya, sehingga ${pracRoofTriangles} + ${pracWallSquares} + ${pracWindowCircles} = ${total} bangun datar. Titik sudut atap ada ${sudutAtap} dan titik sudut dinding ada ${sudutDinding}, jadi ${sudutAtap} + ${sudutDinding} = ${sudut}, karena lingkaran punya 0 titik sudut. Pola ${pagar}.`;
  };

  const handleEvaluatePracticum = () => {
    const totalBangun = pracRoofTriangles + pracWallSquares + pracWindowCircles;
    const kata = studentReportText.trim().split(/\s+/).filter(Boolean).length;
    if (kata < 8) {
      playSound("wrong");
      speakIGIL("Tuliskan laporan minimal 8 kata, atau gunakan tombol bantu susun kalimat.");
      return;
    }
    let accuracyScore = 120;
    if (totalBangun === 10) accuracyScore += 80;
    if (pracRoofTriangles === 2 && pracWallSquares === 4 && pracWindowCircles === 4) accuracyScore += 60;
    if (pracFencePattern === "teratur") accuracyScore += 40;
    accuracyScore = Math.min(300, accuracyScore);

    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const laporan = studentReportText.toLowerCase();
    if (laporan.includes("segitiga") || laporan.includes("segi empat") || laporan.includes("lingkaran")) synthesisScore += 30;
    if (laporan.includes("atap") || laporan.includes("ventilasi") || laporan.includes("cahaya")) synthesisScore += 30;
    if (laporan.includes("pola") || laporan.includes("sudut") || laporan.includes("10")) synthesisScore += 30;
    synthesisScore = Math.min(250, synthesisScore);

    let optimizationVisualScore = 100;
    if (totalBangun === 10 && pracWallSquares === pracWindowCircles) optimizationVisualScore += 60;
    if (pracFencePattern === "teratur") optimizationVisualScore += 40;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);

    let reasoningReportScore = Math.min(180, kata * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (laporan.includes("karena") || laporan.includes("sehingga") || laporan.includes("untuk")) reasoningReportScore += 30;
    reasoningReportScore = Math.min(250, reasoningReportScore);

    const totalQualityScore = accuracyScore + synthesisScore + optimizationVisualScore + reasoningReportScore;
    const rubricResult: PracticumEvaluationRubric = {
      accuracyScore,
      synthesisScore,
      optimizationVisualScore,
      reasoningReportScore,
      totalQualityScore,
      aiFeedbackSummary: totalQualityScore >= 850
        ? "Karya istimewa. Susunan 2 segitiga, 4 segi empat, dan 4 lingkaran berjumlah 10 bangun, dengan pola pagar berulang dan titik sudut yang sesuai."
        : "Rancangan sudah berjalan. Untuk skor yang lebih tinggi, pasang 2 atap segitiga, 4 dinding segi empat, dan 4 jendela lingkaran, lalu pilih pola pagar teratur.",
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
  const kepingTerpasang = (roofPlaced ? 1 : 0) + (wallPlaced ? 1 : 0) + (windowPlaced ? 1 : 0);
  const kodeBentuk = subBShapeType === "segitiga" ? 3 : subBShapeType === "segiempat" ? 4 : 0;
  const totalLab = labTriangles + labSquares + labCircles;
  const sudutLab = labTriangles * 3 + labSquares * 4;
  const totalPrak = pracRoofTriangles + pracWallSquares + pracWindowCircles;
  const sudutPrak = pracRoofTriangles * 3 + pracWallSquares * 4;
  const susunanPas = pracRoofTriangles === 2 && pracWallSquares === 4 && pracWindowCircles === 4;
  const lebarDenah = Math.max(360, 40 + pracRoofTriangles * 95, 36 + pracWallSquares * 54, 36 + pracWindowCircles * 54);

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
                <polygon points="40,38 35,46 45,46" fill="#f59e0b" />
                <polygon points="40,8 22,16 40,22 58,16" fill="#1e3a8a" />
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-extrabold text-white">KELAS 1 SD • BAB 4</span>
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
            <button type="button" onClick={() => speakIGIL(`Halo ${studentName}! Di Bab 4 kita mengenal segitiga, segi empat, lingkaran, dan pola bentuk.`)} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950">Suara IGIL</button>
          </div>
        </header>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {kartu.map((tab) => (
            <button key={tab.id} type="button" disabled={!tab.unlocked} onClick={() => { playSound("click"); setActiveCard(tab.id); }} className={`flex items-center justify-center gap-1.5 rounded-2xl border-b-4 px-3 py-2.5 text-xs font-extrabold md:text-sm ${!tab.unlocked ? "cursor-not-allowed border-slate-300 bg-slate-200 text-slate-400" : activeCard === tab.id ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
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
                <h2 className="text-lg font-black text-slate-900">Matematika Kelas I — Bab 4: Mengenal Bentuk (Halaman 91–122)</h2>
                <p className="mt-0.5 text-xs text-slate-600">Bersama Kira, Upe, Malosi, dan Tora, dipandu IGIL si burung hantu.</p>
              </div>
              <button type="button" onClick={() => speakIGIL("Di Bab 4 kita mengenal segitiga, segi empat, dan lingkaran, lalu menyusun, mengurai, dan melanjutkan pola bentuk.")} className="shrink-0 rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-bold text-white">Dengarkan silabus</button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="text-sm font-black text-amber-950">Peta 4 bagian bentuk</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian A (Hal. 92–99):</strong> bentuk benda sehari-hari bersama Kira.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian B (Hal. 100–107):</strong> sisi, titik sudut, dan posisi diputar bersama Upe.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian C (Hal. 108–115):</strong> menyusun dan mengurai bersama Malosi.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Bagian D (Hal. 116–122):</strong> pola bentuk berulang bersama Tora.</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Dua gerbang bab ini</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5"><span className="font-black text-sky-700">Gerbang 1 — latihan dan ujian 100.</span><p className="mt-0.5">Sepuluh latihan paling banyak 30 token. Ujian 100 memberi 70 token.</p></div>
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5"><span className="font-black text-emerald-700">Gerbang 2 — praktikum 50 token.</span><p className="mt-0.5">Skor karya dihitung di perangkat: 300 + 250 + 200 + 250 = 1.000 poin.</p></div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border-b-4 border-slate-950 bg-gradient-to-r from-indigo-900 via-sky-900 to-slate-900 p-5 text-white">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Teka-teki pembuka</span>
                  <h3 className="mt-1 text-base font-black md:text-lg">Susun 3 bentuk rumah pohon IGIL</h3>
                  <p className="text-xs text-sky-200">Pasang atap segitiga, dinding segi empat, dan jendela lingkaran.</p>
                </div>
                <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center">
                  <div className="text-xs font-bold text-amber-300">Keping terpasang</div>
                  <div className="text-2xl font-black text-amber-400">{kepingTerpasang} / 3</div>
                </div>
              </div>
              <div className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-sky-700 bg-slate-950/50 p-4 md:grid-cols-2">
                <div className="space-y-2">
                  <button type="button" onClick={() => pasangKeping("roof")} className={`flex w-full items-center justify-between rounded-2xl border-b-4 p-3 text-left text-xs font-black ${roofPlaced ? "border-emerald-800 bg-emerald-600 text-white" : "border-rose-700 bg-rose-500 text-white"}`}><span>1. Atap segitiga</span><span>{roofPlaced ? "Terpasang" : "Pasang"}</span></button>
                  <button type="button" onClick={() => pasangKeping("wall")} className={`flex w-full items-center justify-between rounded-2xl border-b-4 p-3 text-left text-xs font-black ${wallPlaced ? "border-emerald-800 bg-emerald-600 text-white" : "border-sky-700 bg-sky-500 text-white"}`}><span>2. Dinding segi empat</span><span>{wallPlaced ? "Terpasang" : "Pasang"}</span></button>
                  <button type="button" onClick={() => pasangKeping("window")} className={`flex w-full items-center justify-between rounded-2xl border-b-4 p-3 text-left text-xs font-black ${windowPlaced ? "border-emerald-800 bg-emerald-600 text-white" : "border-amber-600 bg-amber-400 text-slate-950"}`}><span>3. Jendela lingkaran</span><span>{windowPlaced ? "Terpasang" : "Pasang"}</span></button>
                </div>
                <svg viewBox="0 0 260 155" className="h-36 w-full rounded-2xl border border-sky-800 bg-slate-900" aria-hidden="true">
                  <polygon points="130,18 65,68 195,68" fill={roofPlaced ? "#f43f5e" : "#1e293b"} stroke="#fda4af" strokeWidth="2.5" strokeDasharray={roofPlaced ? "0" : "4 3"} />
                  <rect x="82" y="68" width="96" height="72" fill={wallPlaced ? "#3b82f6" : "#1e293b"} stroke="#93c5fd" strokeWidth="2.5" strokeDasharray={wallPlaced ? "0" : "4 3"} />
                  <circle cx="130" cy="104" r="20" fill={windowPlaced ? "#fde047" : "#0f172a"} stroke="#fef08a" strokeWidth="2.5" strokeDasharray={windowPlaced ? "0" : "4 3"} />
                </svg>
              </div>
              {card2Unlocked ? (
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-400 bg-emerald-500/20 p-3 sm:flex-row">
                  <p className="text-xs font-bold text-emerald-100 md:text-sm">Rumah pohon sudah utuh. Kartu 2, 3, dan 4 terbuka.</p>
                  <button type="button" onClick={() => { playSound("pop"); setActiveCard(2); }} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Lanjut ke materi</button>
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
                <h2 className="text-lg font-black text-slate-900">Empat cara mengenal bentuk</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[["A", "A. Benda (Kira)"], ["B", "B. Sisi & sudut"], ["C", "C. Susun & urai"], ["D", "D. Pola bentuk"]].map(([kode, judul]) => (
                  <button key={kode} type="button" onClick={() => { playSound("click"); setActiveSubChapter(kode as "A" | "B" | "C" | "D"); }} className={`rounded-xl border-b-4 px-3 py-2 text-xs font-extrabold ${activeSubChapter === kode ? "border-amber-600 bg-amber-400 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"}`}>{judul}</button>
                ))}
              </div>
            </div>
            {activeSubChapter === "A" ? (
              <div className="space-y-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
                <h3 className="text-base font-black text-amber-950">Pindai bentuk benda bersama Kira</h3>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {([["jam", "Jam dinding"], ["buku", "Buku tulis"], ["penggaris", "Penggaris"], ["semangka", "Irisan semangka"]] as const).map(([id, nama]) => (
                    <button key={id} type="button" onClick={() => { playSound("pop"); setSubASelectedObject(id); }} className={`rounded-2xl border-b-4 p-3 text-xs font-black ${subASelectedObject === id ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-800"}`}>{nama}</button>
                  ))}
                </div>
                <div className="rounded-2xl border-2 border-amber-300 bg-white p-4 text-center">
                  {subASelectedObject === "jam" ? <p className="text-xl font-black text-emerald-700">Lingkaran. 1 sisi lengkung, 0 titik sudut.</p> : null}
                  {subASelectedObject === "buku" ? <p className="text-xl font-black text-sky-700">Segi empat. 4 sisi lurus, 4 titik sudut.</p> : null}
                  {subASelectedObject === "penggaris" ? <p className="text-xl font-black text-rose-700">Segitiga. 3 sisi lurus, 3 titik sudut.</p> : null}
                  {subASelectedObject === "semangka" ? <p className="text-xl font-black text-amber-700">Kulitnya lengkung, dua tepi potongannya lurus.</p> : null}
                </div>
              </div>
            ) : null}
            {activeSubChapter === "B" ? (
              <div className="space-y-4 rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-4">
                <h3 className="text-base font-black text-sky-950">Putar bangun datar bersama Upe</h3>
                <p className="text-xs text-slate-600">Jumlah sisi dan titik sudut tidak berubah walaupun bangun diputar.</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {([["segitiga", "Segitiga"], ["segiempat", "Segi empat"], ["lingkaran", "Lingkaran"]] as const).map(([id, label]) => (
                      <button key={id} type="button" onClick={() => { playSound("click"); setSubBShapeType(id); }} className={`rounded-xl border-b-4 px-3 py-1.5 text-xs font-black ${subBShapeType === id ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{label}</button>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-3 py-1.5 text-xs font-bold">Putar {subBRotationDeg}°<input type="range" min={0} max={180} value={subBRotationDeg} onChange={(e) => setSubBRotationDeg(Number(e.target.value))} className="accent-sky-600" /></label>
                </div>
                {gambarBentuk("single-shape", kodeBentuk, subBRotationDeg)}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-2xl border border-sky-300 bg-white p-3"><div className="font-bold text-slate-500">Nama</div><div className="mt-0.5 text-base font-black text-sky-900">{subBShapeType === "segiempat" ? "Segi empat" : subBShapeType === "segitiga" ? "Segitiga" : "Lingkaran"}</div></div>
                  <div className="rounded-2xl border border-sky-300 bg-white p-3"><div className="font-bold text-slate-500">Sisi</div><div className="mt-0.5 text-base font-black text-emerald-700">{subBShapeType === "segitiga" ? "3 lurus" : subBShapeType === "segiempat" ? "4 lurus" : "1 lengkung"}</div></div>
                  <div className="rounded-2xl border border-sky-300 bg-white p-3"><div className="font-bold text-slate-500">Titik sudut</div><div className="mt-0.5 text-base font-black text-rose-700">{subBShapeType === "segitiga" ? "3" : subBShapeType === "segiempat" ? "4" : "0"}</div></div>
                </div>
              </div>
            ) : null}
            {activeSubChapter === "C" ? (
              <div className="space-y-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-base font-black text-emerald-950">Susun dan urai bersama Malosi</h3>
                  <button type="button" onClick={() => { playSound("laser"); setSubCTangramJoined((prev) => !prev); }} className="shrink-0 rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-4 py-2 text-xs font-black text-white">{subCTangramJoined ? "Urai menjadi 2 segitiga" : "Gabung menjadi segi empat"}</button>
                </div>
                <svg viewBox="0 0 360 135" className="mx-auto w-full max-w-md rounded-2xl border border-emerald-300 bg-white" aria-hidden="true">
                  <g transform={subCTangramJoined ? "translate(140, 28)" : "translate(95, 28)"}><polygon points="0,0 80,0 0,80" fill="#f43f5e" stroke="#881337" strokeWidth="3" /></g>
                  <g transform={subCTangramJoined ? "translate(140, 28)" : "translate(185, 28)"}><polygon points="80,0 80,80 0,80" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" /></g>
                </svg>
                <p className="rounded-2xl border border-emerald-300 bg-white p-3 text-center text-xs font-black text-emerald-950 md:text-sm">{subCTangramJoined ? "2 segitiga yang digabung membentuk 1 segi empat." : "1 segi empat yang dipotong miring terurai menjadi 2 segitiga."}</p>
              </div>
            ) : null}
            {activeSubChapter === "D" ? (
              <div className="space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 p-4">
                <h3 className="text-base font-black text-purple-950">Lengkapi pola bersama Tora</h3>
                <p className="text-xs text-slate-600">Urutannya segitiga, lingkaran, segitiga, lingkaran. Pilih bangun kelima.</p>
                {gambarBentuk("shape-pattern", 1, 0, true)}
                <div className="flex flex-wrap justify-center gap-3">
                  {([["segitiga", "Segitiga"], ["lingkaran", "Lingkaran"], ["segiempat", "Segi empat"]] as const).map(([id, label]) => (
                    <button key={id} type="button" onClick={() => { playSound(id === "segitiga" ? "coin" : "wrong"); setSubDPatternSlot(id); }} className={`rounded-xl border-b-4 px-4 py-2 text-xs font-black ${subDPatternSlot === id ? "border-purple-800 bg-purple-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{label}</button>
                  ))}
                </div>
                <p className="rounded-2xl border border-purple-300 bg-white p-3 text-center text-xs font-black text-purple-950">{subDPatternSlot === "" ? "Pilih bangun untuk kotak yang kosong." : subDPatternSlot === "segitiga" ? "Tepat. Sesudah lingkaran, urutan kembali ke segitiga." : "Sesudah lingkaran, urutan kembali ke segitiga."}</p>
              </div>
            ) : null}
            <div className="space-y-2 rounded-2xl border-b-4 border-slate-950 bg-slate-900 p-4 text-white">
              <div className="text-xs font-extrabold tracking-wider text-amber-400 uppercase">Poin penting Bab 4</div>
              <div className="grid grid-cols-1 gap-2 text-xs text-slate-200 md:grid-cols-2">
                <p>Segitiga punya 3 sisi lurus dan 3 titik sudut.</p>
                <p>Segi empat punya 4 sisi lurus dan 4 titik sudut, juga saat diputar.</p>
                <p>Lingkaran punya 1 sisi lengkung dan 0 titik sudut.</p>
                <p>2 segitiga dapat digabung menjadi 1 segi empat, lalu disusun menjadi pola berulang.</p>
              </div>
              <button type="button" onClick={() => speakIGIL("Segitiga punya 3 sisi. Segi empat punya 4 sisi. Lingkaran tidak punya titik sudut.")} className="rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">Dengarkan poin penting</button>
            </div>
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div>
              <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 3 • Lab dan papan berpetak</span>
              <h2 className="text-lg font-black text-slate-900">Hitung bangun dan titik sudut, lalu gambar</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Meja bangun datar</h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {([
                    ["Segitiga", labTriangles, setLabTriangles, "text-rose-800", "text-rose-600", "bg-rose-500"],
                    ["Segi empat", labSquares, setLabSquares, "text-blue-800", "text-blue-600", "bg-blue-600"],
                    ["Lingkaran", labCircles, setLabCircles, "text-amber-800", "text-amber-600", "bg-amber-400"],
                  ] as const).map(([nama, nilai, atur, warna, angka, tombol]) => (
                    <div key={nama} className="rounded-xl border border-slate-200 bg-white p-2.5 text-center">
                      <div className={`font-bold ${warna}`}>{nama}</div>
                      <div className={`my-0.5 text-xl font-black ${angka}`}>{nilai}</div>
                      <div className="flex justify-center gap-1.5">
                        <button type="button" className="rounded bg-slate-200 px-2.5 py-0.5 font-black" onClick={() => { playSound("click"); atur((v) => Math.max(0, v - 1)); }}>-</button>
                        <button type="button" className={`rounded px-2.5 py-0.5 font-black text-white ${tombol}`} onClick={() => { playSound("click"); atur((v) => Math.min(4, v + 1)); }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 360 130" className="w-full rounded-2xl border border-sky-200 bg-white" aria-hidden="true">
                  {Array.from({ length: labTriangles }).map((_, i) => <polygon key={`t-${i}`} points={`${42 + i * 75},14 ${22 + i * 75},44 ${62 + i * 75},44`} fill="#f43f5e" stroke="#9f1239" strokeWidth="2" />)}
                  {Array.from({ length: labSquares }).map((_, i) => <rect key={`s-${i}`} x={25 + i * 75} y={52} width="32" height="32" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />)}
                  {Array.from({ length: labCircles }).map((_, i) => <circle key={`c-${i}`} cx={42 + i * 75} cy={108} r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />)}
                </svg>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-black">
                  <div className="rounded-xl border border-sky-300 bg-white p-2.5">Total bangun: {labTriangles} + {labSquares} + {labCircles} = {totalLab}</div>
                  <div className="rounded-xl border border-sky-300 bg-white p-2.5 text-emerald-800">Titik sudut: {labTriangles} × 3 + {labSquares} × 4 = {sudutLab}</div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-amber-950">Kanvas berpetak</h3>
                  <span className="rounded-full border border-amber-300 bg-white px-2.5 py-0.5 text-[11px] font-bold">Goresan: {canvasStrokeCount}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[["🔺", "Segitiga"], ["🟦", "Segi empat"], ["🟡", "Lingkaran"], ["🦉", "IGIL"]].map(([symbol, label]) => (
                    <button key={label} type="button" onClick={() => addCanvasStamp(symbol, label)} className="rounded-xl border-b-2 border-amber-400 bg-white px-2.5 py-1.5 text-xs font-bold">{symbol} {label}</button>
                  ))}
                  {[["#2563eb", "Biru"], ["#dc2626", "Merah"], ["#16a34a", "Hijau"]].map(([hex, name]) => (
                    <button key={hex} type="button" aria-label={name} onClick={() => setBrushColor(hex)} className={`h-6 w-6 rounded-full border-2 ${brushColor === hex ? "scale-110 border-slate-950" : "border-white"}`} style={{ backgroundColor: hex }} />
                  ))}
                  <button type="button" onClick={clearSmartCanvas} className="ml-auto rounded-xl border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-800">Bersihkan</button>
                </div>
                <canvas ref={canvasRef} width={480} height={210} onPointerDown={mulaiGambar} onPointerMove={geserGambar} onPointerUp={selesaiGambar} onPointerLeave={selesaiGambar} className="h-auto w-full touch-none rounded-2xl border-2 border-amber-300 bg-white" />
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 4 && soalLatihan ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 4 • Satu layar, satu soal • 3 token jika benar</span>
                <h2 className="text-lg font-black text-slate-900">Latihan mengenal bentuk</h2>
              </div>
              <div className="rounded-2xl border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-black text-amber-950">Token latihan: {practiceTokens} / 30</div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = practiceAnswers[q.id];
                const benar = ans === q.correctAnswer;
                return <button key={q.id} type="button" onClick={() => { playSound("click"); setCurrentPracticeIdx(idx); }} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentPracticeIdx === idx ? "border-sky-800 bg-sky-600 text-white" : ans ? (benar ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900") : "border-slate-300 bg-slate-100 text-slate-700"}`}>{idx + 1}</button>;
              })}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">Soal {soalLatihan.id} dari 10 • {soalLatihan.storyCharacter}</span>
                <button type="button" onClick={() => speakIGIL(soalLatihan.prompt)} className="rounded-xl border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">Bacakan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalLatihan.prompt}</p>
              {gambarBentuk(soalLatihan.visualType, soalLatihan.paramA, soalLatihan.paramB, !jawabanLatihan)}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {soalLatihan.options.map((opt) => {
                  const dipilih = jawabanLatihan === opt;
                  return <button key={opt} type="button" onClick={() => handleSelectPracticeAnswer(soalLatihan, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-sm font-black md:text-base ${dipilih ? (opt === soalLatihan.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : "border-rose-700 bg-rose-500 text-white") : "border-slate-300 bg-white text-slate-800"}`}>{opt}</button>;
                })}
              </div>
              {jawabanLatihan ? <div className={`space-y-1 rounded-2xl border-2 p-3.5 text-xs ${jawabanLatihan === soalLatihan.correctAnswer ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}><div className="text-sm font-black">{jawabanLatihan === soalLatihan.correctAnswer ? "Benar. Token latihan tercatat sekali." : "Belum tepat. Baca penjelasan ini."}</div><p>{soalLatihan.explanation}</p></div> : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentPracticeIdx === 0} onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Soal sebelumnya</button>
                {currentPracticeIdx < PRACTICE_QUESTIONS.length - 1 ? <button type="button" onClick={() => setCurrentPracticeIdx((i) => Math.min(PRACTICE_QUESTIONS.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Soal berikutnya</button> : card5Unlocked ? <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(5); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Buka ujian</button> : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 5 && soalUjian ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-3.5 text-white">
              <div>
                <span className="text-[11px] font-extrabold text-amber-400 uppercase">Gerbang 1 • Nilai 100 membuka praktikum</span>
                <h2 className="text-base font-black">Ujian mengenal bentuk • 70 token</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-bold">Percobaan ke-{examAttempts}</span>
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono font-bold text-sky-300">{formatStopwatch(examElapsedDeci)}</span>
                <span className={`rounded-xl border px-3 py-1.5 font-bold ${focusLossCount === 0 ? "border-emerald-700 bg-emerald-950 text-emerald-300" : "border-rose-600 bg-rose-950 text-rose-300"}`}>Pindah tab: {focusLossCount}</span>
              </div>
            </div>
            {focusLossCount > 0 ? <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-xs font-bold text-amber-950">Layar ujian tertinggal {focusLossCount} kali. Kerjakan sendiri di halaman ini.</div> : null}
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {examQuestions.map((q, idx) => <button key={q.id} type="button" onClick={() => setCurrentExamIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentExamIdx === idx ? "border-amber-600 bg-amber-400 text-slate-950" : examAnswers[q.id] ? "border-sky-400 bg-sky-100 text-sky-900" : "border-slate-300 bg-slate-100 text-slate-600"}`}>{idx + 1}</button>)}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black text-white">Soal {soalUjian.id} • angka baru tiap percobaan</span>
                <button type="button" onClick={() => speakIGIL(soalUjian.questionText)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-bold">Dengarkan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalUjian.questionText}</p>
              {gambarBentuk(soalUjian.visualType, soalUjian.paramA, soalUjian.paramB, !examSubmitted)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalUjian.options.map((opt) => {
                  const dipilih = jawabanUjian === opt;
                  return <button key={opt} type="button" onClick={() => handleSelectExamAnswer(soalUjian.id, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-sm font-black md:text-base ${examSubmitted ? (opt === soalUjian.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : dipilih ? "border-rose-700 bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-500") : dipilih ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-800"}`}>{opt}</button>;
                })}
              </div>
              {examSubmitted ? <div className="rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-700"><strong>Pembahasan: </strong>{soalUjian.explanation}</div> : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentExamIdx === 0} onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                {currentExamIdx < examQuestions.length - 1 ? <button type="button" onClick={() => setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button> : !examSubmitted ? <button type="button" onClick={handleSubmitExam} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-5 py-2.5 text-xs font-black text-white">Kumpulkan ujian</button> : null}
              </div>
            </div>
            {examSubmitted ? (
              <div className={`space-y-3 rounded-2xl border-2 p-4 ${examScore === 100 && !dwellTimeWarning ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-black">{dwellTimeWarning ? "Pengerjaan kurang dari 25 detik" : examScore === 100 ? "Nilai 100. Praktikum terbuka." : `Skor ujian ${examScore}/100. Syarat praktikum adalah 100.`}</h3>
                    <p className="text-xs">{dwellTimeWarning ? "Ulangi ujian dan baca setiap soal." : examScore === 100 ? "Kamu menerima 70 token." : "Soal berikutnya memakai angka yang berbeda."}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={handleRetryExam} className="rounded-xl border-b-4 border-slate-400 bg-white px-4 py-2 text-xs font-black text-slate-900">Ulangi ujian</button>
                    {card6Unlocked ? <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(6); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Masuk praktikum</button> : null}
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
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Gerbang 2 • skor 0 sampai 1.000</span>
                  <h2 className="mt-1 text-lg font-black">Paviliun sekolah dan pola pagar</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("single"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "single" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Bab ini saja</button>
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("cross4"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "cross4" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Lintas bab</button>
                </div>
              </div>
              {practicumMode === "cross4" ? (
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="font-black text-amber-300">1. Matematika</div><p className="text-[11px] text-emerald-100">Susun segitiga, segi empat, lingkaran, dan pola berulang.</p></div>
                  {completedOtherChapters.slice(0, 3).map((ch, idx) => (
                    <div key={ch.chapterId} className="rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="font-black text-amber-300">{idx + 2}. {ch.subject}</div><p className="text-[11px] text-emerald-100">{ch.practicumSynthesisHook}</p></div>
                  ))}
                </div>
              ) : <p className="text-xs text-emerald-100">Susun tepat 2 segitiga, 4 segi empat, dan 4 lingkaran, lalu buat pola pagar berulang.</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Tiga syarat paviliun</h3>
                <ul className="space-y-1 rounded-xl border border-emerald-200 bg-white p-3 text-xs text-slate-700">
                  <li>Pasang 2 atap segitiga, 4 dinding segi empat, dan 4 jendela lingkaran. Jumlahnya 2 + 4 + 4 = 10.</li>
                  <li>Banyak jendela sama dengan banyak dinding, yaitu 4 dan 4.</li>
                  <li>Pagar berulang teratur: segitiga, lingkaran, segitiga, lingkaran.</li>
                </ul>
                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 font-bold">Atap segitiga: {pracRoofTriangles}<input type="range" min={1} max={4} value={pracRoofTriangles} onChange={(e) => setPracRoofTriangles(Number(e.target.value))} className="accent-rose-600" /></label>
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 font-bold">Dinding segi empat: {pracWallSquares}<input type="range" min={1} max={6} value={pracWallSquares} onChange={(e) => setPracWallSquares(Number(e.target.value))} className="accent-sky-600" /></label>
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 font-bold">Jendela lingkaran: {pracWindowCircles}<input type="range" min={1} max={6} value={pracWindowCircles} onChange={(e) => setPracWindowCircles(Number(e.target.value))} className="accent-amber-500" /></label>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 font-bold">
                    Pola pagar
                    <span className="flex gap-1.5">
                      <button type="button" onClick={() => setPracFencePattern("teratur")} className={`rounded-lg px-3 py-1 font-black ${pracFencePattern === "teratur" ? "bg-emerald-600 text-white" : "bg-slate-100"}`}>Teratur</button>
                      <button type="button" onClick={() => setPracFencePattern("acak")} className={`rounded-lg px-3 py-1 font-black ${pracFencePattern === "acak" ? "bg-rose-500 text-white" : "bg-slate-100"}`}>Belum teratur</button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Gambar paviliun dan pagar</h3>
                <svg viewBox={`0 0 ${lebarDenah} 205`} className="w-full rounded-2xl border-2 border-sky-300 bg-white" aria-hidden="true">
                  {Array.from({ length: pracRoofTriangles }).map((_, idx) => {
                    const cx = 70 + idx * 90;
                    return <polygon key={`atap-${idx}`} points={`${cx},15 ${cx - 40},58 ${cx + 40},58`} fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" />;
                  })}
                  {Array.from({ length: pracWallSquares }).map((_, idx) => <rect key={`dinding-${idx}`} x={20 + idx * 54} y={62} width="48" height="56" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />)}
                  {Array.from({ length: pracWindowCircles }).map((_, idx) => <circle key={`jendela-${idx}`} cx={44 + idx * 54} cy={90} r="13" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />)}
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const cx = 40 + idx * 52;
                    const segitiga = pracFencePattern === "teratur" ? idx % 2 === 0 : idx === 0 || idx === 3;
                    return segitiga
                      ? <polygon key={`pagar-${idx}`} points={`${cx},152 ${cx - 14},182 ${cx + 14},182`} fill="#10b981" stroke="#065f46" strokeWidth="2" />
                      : <circle key={`pagar-${idx}`} cx={cx} cy={168} r="13" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />;
                  })}
                </svg>
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
                  <div className={`rounded-xl border p-2 text-center font-bold ${susunanPas ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>{pracRoofTriangles} + {pracWallSquares} + {pracWindowCircles} = {totalPrak} {susunanPas ? "pas" : "(target 2+4+4)"}</div>
                  <div className="rounded-xl border border-sky-300 bg-sky-100 p-2 text-center font-bold text-sky-900">Sudut: {pracRoofTriangles * 3} + {pracWallSquares * 4} = {sudutPrak}</div>
                  <div className={`rounded-xl border p-2 text-center font-bold ${pracFencePattern === "teratur" ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>{pracFencePattern === "teratur" ? "Pola teratur" : "Belum teratur"}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-black text-amber-950">Laporan siswa</h3>
                  <p className="text-xs text-slate-600">Tulis banyak tiap bentuk, jumlahnya, titik sudut, dan pola pagar.</p>
                </div>
                <button type="button" onClick={() => { playSound("pop"); setStudentReportText(susunLaporan()); }} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">Bantu susun kalimat</button>
              </div>
              <textarea rows={4} value={studentReportText} onChange={(e) => setStudentReportText(e.target.value)} placeholder="Contoh: Saya memasang 2 atap segitiga, 4 dinding segi empat, dan 4 jendela lingkaran sehingga 2 + 4 + 4 = 10." className="w-full select-text rounded-xl border-2 border-amber-300 bg-white p-3 text-xs font-medium focus:border-sky-600 focus:outline-none md:text-sm" />
              <button type="button" onClick={handleEvaluatePracticum} className="w-full rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 py-3 text-sm font-black text-white">Hitung skor karya di perangkat ini</button>
            </div>
            {practicumRubric ? (
              <div className="space-y-4 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-700 pb-3 md:flex-row md:items-center">
                  <h3 className="text-lg font-black">{studentName} • {CHAPTER_COMPETENCY_METADATA.chapterId}</h3>
                  <div className="rounded-2xl bg-amber-400 px-4 py-2 text-center text-slate-950"><div className="text-[10px] font-black uppercase">Total skor</div><div className="text-2xl font-black">{practicumRubric.totalQualityScore} / 1.000</div></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Akurasi</div><div className="mt-1 text-xl font-black text-emerald-400">{practicumRubric.accuracyScore} / 300</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Sintesis</div><div className="mt-1 text-xl font-black text-sky-400">{practicumRubric.synthesisScore} / 250</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Visual</div><div className="mt-1 text-xl font-black text-amber-400">{practicumRubric.optimizationVisualScore} / 200</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Laporan</div><div className="mt-1 text-xl font-black text-purple-400">{practicumRubric.reasoningReportScore} / 250</div></div>
                </div>
                <div className="space-y-1 rounded-2xl border border-slate-700 bg-slate-800/90 p-3.5 text-xs text-slate-200">
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
