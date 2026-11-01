"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

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
  chapterId: "MAT-K1-B2",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 2,
  chapterTitle: "Penjumlahan sampai dengan 10",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 2, Halaman 33–60",
  coreSkills: [
    "Memahami makna penjumlahan sebagai penggabungan dua kelompok benda dan penambahan",
    "Melakukan penjumlahan dengan strategi menghitung maju dan pasangan bilangan",
    "Menemukan pasangan penjumlahan yang menghasilkan 10 menggunakan Bingkai 10",
    "Memahami penjumlahan dengan bilangan 0 serta sifat pertukaran pada soal cerita",
  ],
  practicumSynthesisHook:
    "Gunakan penjumlahan dua kelompok sampai 10, pasangan yang hasilnya 10 pada Bingkai 10, serta sifat pertukaran untuk menyusun bekal dan menghitung jumlahnya.",
};

type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare";
type VisualProblemType = "merge-groups" | "jump-line" | "ten-frame-sum" | "number-bond-sum" | "domino-commutative";

interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  prompt: string;
  visualType: VisualProblemType;
  paramA: number;
  paramB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: VisualProblemType;
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
    chapterId: "IPAS-K1-B2",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 2,
    chapterTitle: "Tubuhku Sehat & Makanan Bergizi",
    textbookReference: "Kurikulum Merdeka Fase A — Mengenal Buah dan Sayur Sehat",
    coreSkills: ["Memilih buah kaya vitamin", "Menjaga kesehatan tubuh"],
    practicumSynthesisHook: "Gabungkan porsi buah merah dan buah kuning sehat di dalam kotak bekal.",
  },
  {
    chapterId: "BINDO-K1-B2",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 2,
    chapterTitle: "Ayo Bermain & Bercerita dengan Kalimat Lengkap",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Kemendikbudristek Bab 2",
    coreSkills: ["Menulis kalimat cerita sederhana", "Menjelaskan urutan kegiatan"],
    practicumSynthesisHook: "Tuliskan cerita penjumlahan bekal sehat dengan kalimat yang jelas.",
  },
  {
    chapterId: "PANCASILA-K1-B2",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 2,
    chapterTitle: "Aturan di Rumah & Berbagi Bekal Bersama Teman",
    textbookReference: "Pendidikan Pancasila SD Kelas I Kemendikbudristek Bab 2",
    coreSkills: ["Berbagi makanan secara adil", "Menunjukkan sikap peduli sesama teman"],
    practicumSynthesisHook: "Pastikan dua kotak bekal sahabat memiliki jumlah total potongan yang adil dan setara.",
  },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    prompt: "Kira memetik 3 jeruk di keranjang kiri dan 4 jeruk di keranjang kanan. Jika digabungkan semuanya, berapa banyak jeruk Kira?",
    visualType: "merge-groups",
    paramA: 3,
    paramB: 4,
    options: ["6", "7", "8", "5"],
    correctAnswer: "7",
    explanation: "Menggabungkan 3 jeruk dan 4 jeruk ditulis 3 + 4 = 7. Jadi jumlah seluruh jeruk Kira adalah 7.",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    prompt: "Ada 4 anak sedang bermain lompat tali di halaman. Datang lagi 2 anak ikut bergabung. Berapa jumlah anak semuanya sekarang?",
    visualType: "merge-groups",
    paramA: 4,
    paramB: 2,
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    explanation: "Awalnya ada 4 anak, bertambah 2 anak lagi. Kalimat matematikanya: 4 + 2 = 6 anak.",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    prompt: "Malosi berada di batu angka 5, lalu ia melompat maju sebanyak 3 langkah. Di batu angka berapakah Malosi berhenti? (5 + 3 = ...)",
    visualType: "jump-line",
    paramA: 5,
    paramB: 3,
    options: ["7", "8", "9", "6"],
    correctAnswer: "8",
    explanation: "Mulai dari 5, hitung maju 3 langkah: 6, 7, 8. Jadi 5 + 3 = 8.",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    prompt: "Perhatikan bagan Pasangan Bilangan milik Tora! Bagian atas adalah 6 dan bagian bawah adalah 3. Jika dijumlahkan (6 + 3), hasilnya adalah...",
    visualType: "number-bond-sum",
    paramA: 6,
    paramB: 3,
    options: ["8", "9", "10", "7"],
    correctAnswer: "9",
    explanation: "Bagian 6 dan bagian 3 ketika digabungkan membentuk bilangan utuh 9, karena 6 + 3 = 9.",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    prompt: "Kira memiliki 7 keping merah di Bingkai 10 dan menambahkan 3 keping biru. Berapa jumlah seluruh keping pada Bingkai 10 sekarang?",
    visualType: "ten-frame-sum",
    paramA: 7,
    paramB: 3,
    options: ["8", "9", "10", "7"],
    correctAnswer: "10",
    explanation: "7 keping merah ditambah 3 keping biru memenuhi seluruh petak pada Bingkai 10. Jadi 7 + 3 = 10.",
  },
  {
    id: 6,
    storyCharacter: "Upe",
    prompt: "Upe menyusun 6 bintang merah di dalam Bingkai 10. Agar Bingkai 10 menjadi penuh (berjumlah 10), berapa bintang biru yang harus ditambahkan? (6 + ... = 10)",
    visualType: "ten-frame-sum",
    paramA: 6,
    paramB: 4,
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    explanation: "Pada Bingkai 10 yang berisi 6, masih tersisa 4 kotak kosong menuju 10. Karena 6 + 4 = 10, maka jawabannya adalah 4.",
  },
  {
    id: 7,
    storyCharacter: "Tora",
    prompt: "Tora memegang piring berisi 8 kue donat, sedangkan piring di sebelahnya kosong (0 kue). Berapa hasil dari 8 + 0?",
    visualType: "merge-groups",
    paramA: 8,
    paramB: 0,
    options: ["0", "7", "8", "9"],
    correctAnswer: "8",
    explanation: "Bilangan berapa pun jika dijumlahkan dengan 0 (kosong, tidak bertambah) hasilnya tetap bilangan itu sendiri: 8 + 0 = 8.",
  },
  {
    id: 8,
    storyCharacter: "Malosi",
    prompt: "Malosi membalik kartu domino penjumlahan. Jika 2 + 5 = 7, maka hasil dari 5 + 2 adalah...",
    visualType: "domino-commutative",
    paramA: 2,
    paramB: 5,
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "Menurut sifat pertukaran penjumlahan, meskipun urutan bilangannya ditukar (2 + 5 menjadi 5 + 2), hasilnya tetap sama yaitu 7.",
  },
  {
    id: 9,
    storyCharacter: "Kira",
    prompt: "Ibu memberi Kira 5 pensil warna pagi ini, lalu Ayah memberi lagi 5 pensil warna sore ini. Berapa jumlah pensil warna Kira seluruhnya?",
    visualType: "ten-frame-sum",
    paramA: 5,
    paramB: 5,
    options: ["8", "9", "10", "6"],
    correctAnswer: "10",
    explanation: "5 pensil di baris atas ditambah 5 pensil di baris bawah pada Bingkai 10 menghasilkan 5 + 5 = 10 pensil warna.",
  },
  {
    id: 10,
    storyCharacter: "Upe",
    prompt: "Manakah pasangan penjumlahan di bawah ini yang memiliki hasil SAMA DENGAN 4 + 5?",
    visualType: "domino-commutative",
    paramA: 4,
    paramB: 5,
    options: ["6 + 3", "3 + 4", "5 + 2", "2 + 4"],
    correctAnswer: "6 + 3",
    explanation: "Hasil dari 4 + 5 adalah 9. Pada pilihan jawaban, 6 + 3 juga menghasilkan 9. Pilihan lain menghasilkan 7, 7, dan 6.",
  },
];

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
  for (const item of shuffleArray(pool)) {
    if (unique.size < 4) unique.add(item);
  }
  return shuffleArray(Array.from(unique).map(String));
}

function generateDynamicExamQuestions(): ExamQuestion[] {
  const q1A = Math.floor(Math.random() * 4) + 2;
  const q1B = Math.floor(Math.random() * 3) + 2;
  const q1Sum = q1A + q1B;
  const q2A = Math.floor(Math.random() * 4) + 3;
  const q2B = Math.floor(Math.random() * 3) + 2;
  const q2Sum = q2A + q2B;
  const q3Start = Math.floor(Math.random() * 4) + 3;
  const q3Jump = Math.floor(Math.random() * 3) + 2;
  const q3Sum = q3Start + q3Jump;
  const q4A = Math.floor(Math.random() * 5) + 2;
  const q4B = Math.floor(Math.random() * 3) + 2;
  const q4Sum = q4A + q4B;
  const q5A = Math.floor(Math.random() * 4) + 4;
  const q5B = Math.floor(Math.random() * 3) + 1;
  const q5Sum = q5A + q5B;
  const q6Known = Math.floor(Math.random() * 7) + 2;
  const q6Missing = 10 - q6Known;
  const q7Num = Math.floor(Math.random() * 6) + 4;
  const q7ZeroFirst = Math.random() > 0.5;
  const q8A = Math.floor(Math.random() * 4) + 2;
  const q8B = Math.floor(Math.random() * 3) + 3;
  const q8Sum = q8A + q8B;
  const q9A = Math.floor(Math.random() * 4) + 3;
  const q9Missing = Math.floor(Math.random() * 3) + 2;
  const q9Total = q9A + q9Missing;
  const q10A = Math.floor(Math.random() * 5) + 3;
  const q10B = 10 - q10A;

  return [
    {
      id: 1,
      questionText: `Kira menggabungkan ${q1A} apel merah dan ${q1B} apel hijau ke dalam satu wadah. Berapa jumlah apel Kira seluruhnya? (${q1A} + ${q1B} = ...)`,
      visualType: "merge-groups",
      paramA: q1A,
      paramB: q1B,
      options: generateNumericOptions(q1Sum, 3, 10),
      correctAnswer: String(q1Sum),
      explanation: `Menggabungkan ${q1A} benda dan ${q1B} benda menghasilkan ${q1A} + ${q1B} = ${q1Sum}.`,
    },
    {
      id: 2,
      questionText: `Di dahan pohon ada ${q2A} burung pipit. Datang lagi ${q2B} burung pipit hinggap di dahan itu. Berapa banyak burung pipit sekarang?`,
      visualType: "merge-groups",
      paramA: q2A,
      paramB: q2B,
      options: generateNumericOptions(q2Sum, 4, 10),
      correctAnswer: String(q2Sum),
      explanation: `Awalnya ada ${q2A} burung, bertambah ${q2B} burung menjadi ${q2A} + ${q2B} = ${q2Sum} burung.`,
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
      questionText: `Perhatikan Pasangan Bilangan milik Upe! Jika bilangan ${q4A} dan ${q4B} digabungkan, bilangan utuh yang terbentuk adalah...`,
      visualType: "number-bond-sum",
      paramA: q4A,
      paramB: q4B,
      options: generateNumericOptions(q4Sum, 3, 10),
      correctAnswer: String(q4Sum),
      explanation: `Pada bagan pasangan bilangan, ${q4A} ditambah ${q4B} sama dengan ${q4Sum}.`,
    },
    {
      id: 5,
      questionText: `Tora meletakkan ${q5A} keping merah dan ${q5B} keping biru pada Bingkai 10. Berapakah hasil penjumlahan ${q5A} + ${q5B}?`,
      visualType: "ten-frame-sum",
      paramA: q5A,
      paramB: q5B,
      options: generateNumericOptions(q5Sum, 4, 10),
      correctAnswer: String(q5Sum),
      explanation: `Jumlah petak yang terisi pada Bingkai 10 adalah ${q5A} + ${q5B} = ${q5Sum}.`,
    },
    {
      id: 6,
      questionText: `Agar Bingkai 10 terisi penuh menjadi 10, maka ${q6Known} keping merah harus ditambah dengan ... keping biru. (${q6Known} + ... = 10)`,
      visualType: "ten-frame-sum",
      paramA: q6Known,
      paramB: q6Missing,
      options: generateNumericOptions(q6Missing, 1, 9),
      correctAnswer: String(q6Missing),
      explanation: `Pasangan 10 dari ${q6Known} adalah ${q6Missing}, karena ${q6Known} + ${q6Missing} = 10.`,
    },
    {
      id: 7,
      questionText: q7ZeroFirst
        ? `Keranjang kiri kosong (0 buah) dan keranjang kanan berisi ${q7Num} buah mangga. Berapakah hasil dari 0 + ${q7Num}?`
        : `Kira memiliki ${q7Num} stiker bintang di kotak pertama dan 0 stiker di kotak kedua. Berapakah hasil dari ${q7Num} + 0?`,
      visualType: "merge-groups",
      paramA: q7ZeroFirst ? 0 : q7Num,
      paramB: q7ZeroFirst ? q7Num : 0,
      options: generateNumericOptions(q7Num, 0, 10),
      correctAnswer: String(q7Num),
      explanation: `Bilangan apa pun yang dijumlahkan dengan 0 hasilnya tetap bilangan itu sendiri, yaitu ${q7Num}.`,
    },
    {
      id: 8,
      questionText: `Perhatikan kartu domino Tora! Karena ${q8A} + ${q8B} = ${q8Sum}, maka jika ditukar posisinya menjadi ${q8B} + ${q8A} hasilnya adalah...`,
      visualType: "domino-commutative",
      paramA: q8A,
      paramB: q8B,
      options: generateNumericOptions(q8Sum, 4, 10),
      correctAnswer: String(q8Sum),
      explanation: `Sifat pertukaran penjumlahan menyatakan bahwa ${q8A} + ${q8B} sama hasilnya dengan ${q8B} + ${q8A}, yaitu ${q8Sum}.`,
    },
    {
      id: 9,
      questionText: `Upe ingin mengumpulkan ${q9Total} kelereng. Saat ini Upe baru punya ${q9A} kelereng. Berapa kelereng lagi yang harus ditambahkan? (${q9A} + ... = ${q9Total})`,
      visualType: "number-bond-sum",
      paramA: q9A,
      paramB: q9Missing,
      options: generateNumericOptions(q9Missing, 1, 8),
      correctAnswer: String(q9Missing),
      explanation: `Karena ${q9A} ditambah ${q9Missing} sama dengan ${q9Total}, maka Upe memerlukan ${q9Missing} kelereng lagi.`,
    },
    {
      id: 10,
      questionText: `Malosi menyusun ${q10A} balok merah dan ${q10B} balok biru sehingga pas memenuhi Bingkai 10. Berapa jumlah seluruh balok Malosi? (${q10A} + ${q10B} = ...)`,
      visualType: "ten-frame-sum",
      paramA: q10A,
      paramB: q10B,
      options: generateNumericOptions(10, 6, 10),
      correctAnswer: "10",
      explanation: `${q10A} dan ${q10B} adalah pasangan yang hasilnya 10, sehingga ${q10A} + ${q10B} = 10.`,
    },
  ];
}

export default function MatematikaKelas1Bab2({
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
  const [redBirdsJoined, setRedBirdsJoined] = useState(false);
  const [blueBirdsJoined, setBlueBirdsJoined] = useState(false);
  const [activeSubChapter, setActiveSubChapter] = useState<"A" | "B" | "C" | "D">("A");
  const [subABasketLeft, setSubABasketLeft] = useState(3);
  const [subABasketRight, setSubABasketRight] = useState(4);
  const [subBStartNum, setSubBStartNum] = useState(4);
  const [subBJumpSteps, setSubBJumpSteps] = useState(3);
  const [subCRedCounters, setSubCRedCounters] = useState(6);
  const [subDLeftDots, setSubDLeftDots] = useState(3);
  const [subDRightDots, setSubDRightDots] = useState(5);
  const [subDIsFlipped, setSubDIsFlipped] = useState(false);
  const [labAddendA, setLabAddendA] = useState(4);
  const [labAddendB, setLabAddendB] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const goresanBerjalan = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#2563eb");
  const [canvasStrokeCount, setCanvasStrokeCount] = useState(0);
  const [canvasStamps, setCanvasStamps] = useState<CanvasStampItem[]>([]);
  const [currentPracticeIdx, setCurrentPracticeIdx] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [claimedPracticeIds, setClaimedPracticeIds] = useState<number[]>([]);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>(() => generateDynamicExamQuestions());
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
  const [practicumMode, setPracticumMode] = useState<"single" | "cross4">("cross4");
  const [box1Strawberries, setBox1Strawberries] = useState(6);
  const [box1Bananas, setBox1Bananas] = useState(4);
  const [box2Strawberries, setBox2Strawberries] = useState(4);
  const [box2Bananas, setBox2Bananas] = useState(6);
  const [waterGlassesBonus, setWaterGlassesBonus] = useState(0);
  const [studentReportText, setStudentReportText] = useState("");
  const [practicumRubric, setPracticumRubric] = useState<PracticumEvaluationRubric | null>(null);
  const [chapterCompletedFlag, setChapterCompletedFlag] = useState(false);

  const playSound = useCallback((type: SoundType) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const createOsc = (freq: number, oscType: OscillatorType, start: number, duration: number, gainVal = 0.12) => {
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
      if (type === "click") createOsc(540, "sine", now, 0.06, 0.1);
      else if (type === "pop") {
        createOsc(420, "triangle", now, 0.08, 0.14);
        createOsc(720, "sine", now + 0.04, 0.09, 0.12);
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
      window.setTimeout(() => void ctx.close(), 1200);
    } catch {
      // Peramban bisa menahan suara sebelum ada ketukan.
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
      // Perangkat tanpa suara tetap bisa dipakai.
    }
  }, []);

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
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocusLossCount((prev) => prev + 1);
        playSound("wrong");
      }
    };
    const handleWindowBlur = () => setFocusLossCount((prev) => prev + 1);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [activeCard, examSubmitted, playSound]);

  const drawCanvasGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    const step = 28;
    for (let x = 0; x <= width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (activeCard === 3 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx && canvasStrokeCount === 0 && canvasStamps.length === 0) {
        drawCanvasGrid(ctx, canvas.width, canvas.height);
      }
    }
  }, [activeCard, canvasStrokeCount, canvasStamps.length, drawCanvasGrid]);

  const titikKanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startCanvasDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const titik = titikKanvas(e);
    if (!canvas || !ctx || !titik) return;
    canvas.setPointerCapture(e.pointerId);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(titik.x, titik.y);
    setIsDrawing(true);
  };

  const moveCanvasDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    const titik = titikKanvas(e);
    if (!ctx || !titik) return;
    ctx.lineTo(titik.x, titik.y);
    ctx.stroke();
    goresanBerjalan.current += 1;
  };

  const stopCanvasDrawing = () => {
    setIsDrawing(false);
    if (goresanBerjalan.current > 0) {
      setCanvasStrokeCount((prev) => prev + goresanBerjalan.current);
      goresanBerjalan.current = 0;
    }
  };

  const addCanvasStamp = (symbol: string, label: string) => {
    playSound("pop");
    const x = 45 + ((canvasStamps.length * 48) % 440);
    const y = 55 + Math.floor((canvasStamps.length * 48) / 440) * 55;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.font = "28px sans-serif";
      ctx.fillText(symbol, x, y);
    }
    setCanvasStamps((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, x, y, symbol, label }]);
    setCanvasStrokeCount((prev) => prev + 5);
  };

  const clearSmartCanvas = () => {
    playSound("click");
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) drawCanvasGrid(ctx, canvas.width, canvas.height);
    setCanvasStamps([]);
    setCanvasStrokeCount(0);
  };

  const handleJoinBirds = (group: "red" | "blue") => {
    const nextRed = group === "red" ? true : redBirdsJoined;
    const nextBlue = group === "blue" ? true : blueBirdsJoined;
    if (group === "red") setRedBirdsJoined(true);
    if (group === "blue") setBlueBirdsJoined(true);
    if (nextRed && nextBlue) {
      setCard2Unlocked(true);
      playSound("fanfare");
      speakIGIL("Hebat sekali! 3 burung pipit merah digabungkan dengan 2 burung pipit biru. 3 ditambah 2 sama dengan 5 burung. Kartu 2 sudah terbuka.");
    } else {
      playSound("pop");
    }
  };

  const handleSelectPracticeAnswer = (question: PracticeQuestion, selected: string) => {
    const updatedAnswers = { ...practiceAnswers, [question.id]: selected };
    setPracticeAnswers(updatedAnswers);
    if (selected === question.correctAnswer) {
      playSound("coin");
      if (!claimedPracticeIds.includes(question.id)) {
        setClaimedPracticeIds((prev) => [...prev, question.id]);
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
      speakIGIL("Ayo jawab seluruh 10 soal ujian terlebih dahulu sebelum dikumpulkan ya!");
      return;
    }
    const durationSeconds = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) correctCount += 1;
    });
    const calculatedScore = correctCount * 10;
    setExamScore(calculatedScore);
    setExamSubmitted(true);
    if (durationSeconds < 25) {
      setDwellTimeWarning(true);
      playSound("wrong");
      speakIGIL("Pengerjaanmu di bawah 25 detik. Ulangi ujian dan baca setiap soal dengan teliti.");
      return;
    }
    setDwellTimeWarning(false);
    if (calculatedScore === 100) {
      setExamTokens(70);
      setCard6Unlocked(true);
      playSound("fanfare");
      speakIGIL("Nilai kamu 100. Kartu 6 Praktikum sudah terbuka.");
    } else {
      playSound("wrong");
      speakIGIL(`Nilai kamu ${calculatedScore}. Ulangi ujian dengan angka baru sampai nilainya 100.`);
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

  const fillGuidedReportTemplate = () => {
    playSound("pop");
    const sumBox1 = box1Strawberries + box1Bananas;
    const sumBox2 = box2Strawberries + box2Bananas;
    setStudentReportText(
      `Saya bersama Kira, Upe, Malosi, dan Tora menyusun Kotak Bekal Sehat berjumlah 10. Pada kotak Kira, saya menggabungkan ${box1Strawberries} stroberi merah dan ${box1Bananas} pisang kuning sehingga ${box1Strawberries} + ${box1Bananas} = ${sumBox1}. Pada kotak Upe, saya menukar susunannya menjadi ${box2Strawberries} + ${box2Bananas} = ${sumBox2} agar pembagian bekal adil. Keranjang tambahan berisi ${waterGlassesBonus}, jadi ${sumBox1} + ${waterGlassesBonus} = ${sumBox1 + waterGlassesBonus}.`,
    );
  };

  const handleEvaluatePracticum = () => {
    const sumBox1 = box1Strawberries + box1Bananas;
    const sumBox2 = box2Strawberries + box2Bananas;
    const tukarPas = box1Strawberries === box2Bananas && box1Bananas === box2Strawberries;
    const reportWords = studentReportText.trim().split(/\s+/).filter(Boolean).length;
    if (reportWords < 8) {
      playSound("wrong");
      speakIGIL("Tuliskan laporan minimal 8 kata, atau gunakan tombol bantu susun kalimat.");
      return;
    }
    let accuracyScore = 110;
    if (sumBox1 === 10) accuracyScore += 80;
    if (sumBox2 === 10) accuracyScore += 70;
    if (waterGlassesBonus === 0) accuracyScore += 40;
    accuracyScore = Math.min(300, accuracyScore);
    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const lowerReport = studentReportText.toLowerCase();
    if (lowerReport.includes("stroberi") || lowerReport.includes("pisang") || lowerReport.includes("sehat")) synthesisScore += 30;
    if (lowerReport.includes("pertukaran") || lowerReport.includes("adil") || lowerReport.includes("sama") || lowerReport.includes("tukar")) synthesisScore += 30;
    if (lowerReport.includes("+") || lowerReport.includes("10") || lowerReport.includes("penjumlahan")) synthesisScore += 30;
    synthesisScore = Math.min(250, synthesisScore);
    let optimizationVisualScore = 100;
    if (sumBox1 === 10 && sumBox2 === 10) optimizationVisualScore += 50;
    if (tukarPas && box1Strawberries > 0 && box1Bananas > 0) optimizationVisualScore += 50;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);
    let reasoningReportScore = Math.min(180, reportWords * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (lowerReport.includes("sehingga") || lowerReport.includes("agar") || lowerReport.includes("karena")) reasoningReportScore += 30;
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
          ? "Karya istimewa. Kedua kotak berjumlah 10, susunannya saling bertukar, dan tambahan 0 tetap menghasilkan bilangan yang sama."
          : "Rancangan bekal sudah baik. Agar skor mendekati 1.000, kedua kotak harus berjumlah 10 dengan porsi yang saling bertukar, misalnya 6 + 4 dan 4 + 6, serta keranjang tambahan pada angka 0.",
    };
    setPracticumRubric(rubricResult);
    setPracticumTokens(50);
    setChapterCompletedFlag(true);
    playSound("fanfare");
    speakIGIL(`Selamat ${studentName}! Skor karyamu ${totalQualityScore} dari 1000. Token bab ini bertambah 50.`);
    onChapterComplete?.({
      chapterId: CHAPTER_COMPETENCY_METADATA.chapterId,
      studentId,
      practiceTokensEarned: practiceTokens,
      examTokensEarned: examTokens,
      practicumTokensEarned: 50,
      totalChapterTokens: practiceTokens + examTokens + 50,
      examScore: 100,
      practicumRubric: rubricResult,
      telemetry: {
        attemptCount: examAttempts,
        examDurationSeconds: Math.max(25, Math.round(examElapsedDeci / 10)),
        tabSwitchCount: focusLossCount,
        isHumanTimingValid: true,
        completedAtISO: new Date().toISOString(),
      },
    });
  };

  const renderDualColorTenFrameSVG = (redCount: number, blueCount: number) => {
    const safeRed = Math.max(0, Math.min(10, redCount));
    const safeBlue = Math.max(0, Math.min(10 - safeRed, blueCount));
    return (
      <svg viewBox="0 0 320 140" className="mx-auto w-full max-w-md">
        <rect x="10" y="10" width="300" height="120" rx="12" fill="#f8fafc" stroke="#0284c7" strokeWidth="4" />
        {Array.from({ length: 10 }).map((_, idx) => {
          const x = 10 + (idx % 5) * 60;
          const y = 10 + Math.floor(idx / 5) * 60;
          const isRed = idx < safeRed;
          const isBlue = !isRed && idx < safeRed + safeBlue;
          return (
            <g key={idx}>
              <rect x={x} y={y} width="60" height="60" fill={isRed ? "#fee2e2" : isBlue ? "#dbeafe" : "#ffffff"} stroke="#94a3b8" strokeWidth="2" />
              {isRed || isBlue ? <circle cx={x + 30} cy={y + 30} r="18" fill={isRed ? "#ef4444" : "#3b82f6"} stroke={isRed ? "#991b1b" : "#1e40af"} strokeWidth="2" /> : null}
            </g>
          );
        })}
      </svg>
    );
  };

  const renderProblemVisual = (type: VisualProblemType, paramA: number, paramB: number) => {
    if (type === "ten-frame-sum") return renderDualColorTenFrameSVG(paramA, paramB);
    if (type === "merge-groups") {
      const kelompok = (awalX: number, jumlah: number, judul: string, isi: string, garis: string) => (
        <g>
          <rect x={awalX} y="18" width="140" height="94" rx="14" fill={isi} stroke={garis} strokeWidth="3" />
          <text x={awalX + 70} y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{judul} ({jumlah})</text>
          {Array.from({ length: jumlah }).map((_, i) => (
            <circle key={i} cx={awalX + 24 + (i % 4) * 30} cy={58 + Math.floor(i / 4) * 28} r="10" fill={garis} />
          ))}
        </g>
      );
      return (
        <svg viewBox="0 0 380 130" className="mx-auto w-full max-w-md">
          {kelompok(12, paramA, "Kelompok 1", "#fff1f2", "#e11d48")}
          <text x="190" y="74" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0f172a">+</text>
          {kelompok(228, paramB, "Kelompok 2", "#eff6ff", "#2563eb")}
        </svg>
      );
    }
    if (type === "jump-line") {
      const target = Math.min(10, paramA + paramB);
      return (
        <svg viewBox="0 0 380 120" className="mx-auto w-full max-w-md">
          <line x1="20" y1="85" x2="360" y2="85" stroke="#334155" strokeWidth="4" />
          {Array.from({ length: 11 }).map((_, idx) => {
            const x = 24 + idx * 33;
            const awal = idx === paramA;
            const akhir = idx === target;
            return (
              <g key={idx}>
                <circle cx={x} cy="85" r={awal || akhir ? 11 : 7} fill={awal ? "#f59e0b" : akhir ? "#10b981" : "#cbd5e1"} stroke="#1e293b" strokeWidth="2" />
                <text x={x} y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{idx}</text>
              </g>
            );
          })}
          {Array.from({ length: Math.max(0, target - paramA) }).map((_, stepIdx) => {
            const fromX = 24 + (paramA + stepIdx) * 33;
            const toX = fromX + 33;
            return <path key={stepIdx} d={`M ${fromX} 75 Q ${(fromX + toX) / 2} 32 ${toX} 75`} fill="none" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 2" />;
          })}
          <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">Mulai di {paramA}, maju {paramB} langkah</text>
        </svg>
      );
    }
    if (type === "domino-commutative") {
      return (
        <svg viewBox="0 0 340 125" className="mx-auto w-full max-w-sm">
          <rect x="20" y="22" width="120" height="75" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <line x1="80" y1="22" x2="80" y2="97" stroke="#d97706" strokeWidth="3" />
          <text x="50" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#92400e">{paramA}</text>
          <text x="110" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#92400e">{paramB}</text>
          <text x="80" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">{paramA} + {paramB} = {paramA + paramB}</text>
          <text x="170" y="66" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">⇄</text>
          <rect x="200" y="22" width="120" height="75" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
          <line x1="260" y1="22" x2="260" y2="97" stroke="#16a34a" strokeWidth="3" />
          <text x="230" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#166534">{paramB}</text>
          <text x="290" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#166534">{paramA}</text>
          <text x="260" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">{paramB} + {paramA} = ?</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 300 135" className="mx-auto w-full max-w-sm">
        <line x1="95" y1="36" x2="185" y2="68" stroke="#475569" strokeWidth="4" />
        <line x1="95" y1="100" x2="185" y2="68" stroke="#475569" strokeWidth="4" />
        <circle cx="95" cy="36" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <text x="95" y="43" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">{paramA}</text>
        <circle cx="95" cy="100" r="24" fill="#fce7f3" stroke="#db2777" strokeWidth="3" />
        <text x="95" y="107" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#831843">{paramB}</text>
        <circle cx="195" cy="68" r="28" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
        <text x="195" y="75" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">?</text>
      </svg>
    );
  };

  const formatStopwatch = (deci: number) => {
    const totalSeconds = Math.floor(deci / 10);
    return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}.${deci % 10}`;
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
  const jawabanLatihan = practiceAnswers[soalLatihan.id];
  const soalUjian = examQuestions[currentExamIdx];
  const jawabanUjian = examAnswers[soalUjian.id];
  const jumlahBurung = (redBirdsJoined ? 3 : 0) + (blueBirdsJoined ? 2 : 0);
  const kiriDomino = subDIsFlipped ? subDRightDots : subDLeftDots;
  const kananDomino = subDIsFlipped ? subDLeftDots : subDRightDots;
  const jumlahKotak1 = box1Strawberries + box1Bananas;
  const jumlahKotak2 = box2Strawberries + box2Bananas;
  const tukarPas = box1Strawberries === box2Bananas && box1Bananas === box2Strawberries;

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
                <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-extrabold text-white">KELAS 1 SD • BAB 2</span>
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
              <div className="text-[10px] text-slate-300">Latihan: {practiceTokens}/30 • Ujian: {examTokens}/70 • Praktikum: {practicumTokens}/50</div>
            </div>
            <button type="button" onClick={() => speakIGIL(`Halo ${studentName}! Di Bab 2 kita menjumlahkan bilangan sampai 10 bersama Kira, Upe, Malosi, dan Tora.`)} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950">Suara IGIL</button>
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
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 md:flex-row md:items-center">
              <div>
                <span className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">Referensi buku</span>
                <h2 className="text-lg font-black text-slate-900">Matematika Kelas I — Bab 2: Penjumlahan sampai dengan 10 (Halaman 33–60)</h2>
                <p className="mt-0.5 text-xs text-slate-600">Bersama Kira, Upe, Malosi, dan Tora, dipandu IGIL.</p>
              </div>
              <button type="button" onClick={() => speakIGIL("Di Bab 2 kita belajar menggabungkan benda, menghitung maju, pasangan yang hasilnya 10, penjumlahan dengan nol, dan sifat pertukaran.")} className="shrink-0 rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-bold text-white">Dengarkan silabus</button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="text-sm font-black text-amber-950">Peta 4 sub-bab</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab A (Hal. 34–41):</strong> Menggabungkan dua kelompok bersama Kira.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab B (Hal. 42–49):</strong> Hitung maju dan pasangan bilangan bersama Upe.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab C (Hal. 50–54):</strong> Penjumlahan yang hasilnya 10 bersama Malosi.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab D (Hal. 55–60):</strong> Nol dan sifat pertukaran bersama Tora.</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Dua gerbang</h3>
                <div className="rounded-xl border border-emerald-200 bg-white p-2.5 text-xs"><span className="font-black text-sky-700">Gerbang 1.</span> 10 latihan memberi 30 token. Ujian harus 100 untuk 70 token.</div>
                <div className="rounded-xl border border-emerald-200 bg-white p-2.5 text-xs"><span className="font-black text-emerald-700">Gerbang 2.</span> Praktikum memberi 50 token. Skor karya 0–1.000: akurasi 300, sintesis 250, desain 200, laporan 250.</div>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border-b-4 border-slate-950 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-5 text-white">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Teka-teki pembuka</span>
                  <h3 className="mt-1 text-base font-black md:text-lg">Gabungkan burung pipit di dahan</h3>
                  <p className="text-xs text-sky-200">Panggil 3 burung merah dan 2 burung biru. 3 + 2 = 5 membuka kartu berikutnya.</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center"><div className="text-xs font-bold text-amber-300">Di dahan</div><div className="text-2xl font-black text-amber-400">{jumlahBurung} / 5</div></div>
              </div>
              <div className="grid grid-cols-1 items-center gap-3 rounded-2xl border border-sky-700 bg-slate-950/50 p-4 md:grid-cols-3">
                <button type="button" onClick={() => handleJoinBirds("red")} className={`rounded-2xl border-b-4 p-3 text-xs font-black text-white ${redBirdsJoined ? "border-emerald-800 bg-emerald-600" : "border-rose-700 bg-rose-500"}`}>{redBirdsJoined ? "3 burung merah sudah bergabung" : "Panggil 3 burung merah"}</button>
                <div className="rounded-2xl border border-white/15 bg-white/10 py-2 text-center"><div className="text-xs font-bold text-sky-200">Kalimat penjumlahan</div><div className="mt-1 text-2xl font-black text-amber-300">{redBirdsJoined ? "3" : "?"} + {blueBirdsJoined ? "2" : "?"} = {jumlahBurung}</div></div>
                <button type="button" onClick={() => handleJoinBirds("blue")} className={`rounded-2xl border-b-4 p-3 text-xs font-black text-white ${blueBirdsJoined ? "border-emerald-800 bg-emerald-600" : "border-sky-700 bg-sky-500"}`}>{blueBirdsJoined ? "2 burung biru sudah bergabung" : "Panggil 2 burung biru"}</button>
              </div>
              {card2Unlocked ? (
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-400 bg-emerald-500/20 p-3 sm:flex-row">
                  <div className="text-xs font-bold text-emerald-200 md:text-sm">3 ditambah 2 menjadi 5. Kartu 2, 3, dan 4 terbuka.</div>
                  <button type="button" onClick={() => { playSound("pop"); setActiveCard(2); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Lanjut ke Kartu 2</button>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {activeCard === 2 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 2 • Empat cara menjumlahkan</span>
                <h2 className="text-lg font-black text-slate-900">Main bersama Kira, Upe, Malosi, dan Tora</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {([
                  ["A", "A Gabungkan"],
                  ["B", "B Hitung maju"],
                  ["C", "C Hasil 10"],
                  ["D", "D Tukar dan nol"],
                ] as const).map(([code, title]) => (
                  <button key={code} type="button" onClick={() => { playSound("click"); setActiveSubChapter(code); }} className={`rounded-xl border-b-4 px-3 py-2 text-xs font-extrabold ${activeSubChapter === code ? "border-amber-600 bg-amber-400 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"}`}>{title}</button>
                ))}
              </div>
            </div>
            {activeSubChapter === "A" ? (
              <div className="space-y-4 rounded-2xl border-2 border-rose-200 bg-rose-50/60 p-4">
                <h3 className="text-base font-black text-rose-950">Menggabungkan bersama Kira</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-rose-300 bg-white p-3 text-xs font-extrabold">Keranjang 1: {subABasketLeft}<span className="flex gap-1.5"><button type="button" onClick={() => { playSound("pop"); setSubABasketLeft((v) => Math.max(0, v - 1)); }} className="rounded-lg bg-slate-200 px-3 py-1">-</button><button type="button" onClick={() => { playSound("pop"); setSubABasketLeft((v) => Math.min(10 - subABasketRight, v + 1)); }} className="rounded-lg bg-rose-500 px-3 py-1 text-white">+</button></span></div>
                  <div className="flex items-center justify-between rounded-2xl border border-sky-300 bg-white p-3 text-xs font-extrabold">Keranjang 2: {subABasketRight}<span className="flex gap-1.5"><button type="button" onClick={() => { playSound("pop"); setSubABasketRight((v) => Math.max(0, v - 1)); }} className="rounded-lg bg-slate-200 px-3 py-1">-</button><button type="button" onClick={() => { playSound("pop"); setSubABasketRight((v) => Math.min(10 - subABasketLeft, v + 1)); }} className="rounded-lg bg-sky-600 px-3 py-1 text-white">+</button></span></div>
                </div>
                {renderProblemVisual("merge-groups", subABasketLeft, subABasketRight)}
                <div className="rounded-2xl border-2 border-rose-300 bg-white p-3 text-center"><div className="text-xs font-bold text-slate-500">Kalimat Kira</div><div className="text-2xl font-black">{subABasketLeft} + {subABasketRight} = {subABasketLeft + subABasketRight}</div></div>
              </div>
            ) : null}
            {activeSubChapter === "B" ? (
              <div className="space-y-4 rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-4">
                <h3 className="text-base font-black text-sky-950">Lompat maju bersama Upe</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-white p-3 text-xs font-extrabold">Mulai di {subBStartNum}<span className="flex gap-1.5"><button type="button" onClick={() => setSubBStartNum((v) => Math.max(1, v - 1))} className="rounded-lg bg-slate-200 px-3 py-1">-</button><button type="button" onClick={() => setSubBStartNum((v) => Math.min(10 - subBJumpSteps, v + 1))} className="rounded-lg bg-amber-400 px-3 py-1">+</button></span></div>
                  <div className="flex items-center justify-between rounded-2xl border border-sky-300 bg-white p-3 text-xs font-extrabold">Lompat +{subBJumpSteps}<span className="flex gap-1.5"><button type="button" onClick={() => setSubBJumpSteps((v) => Math.max(1, v - 1))} className="rounded-lg bg-slate-200 px-3 py-1">-</button><button type="button" onClick={() => setSubBJumpSteps((v) => Math.min(10 - subBStartNum, v + 1))} className="rounded-lg bg-sky-600 px-3 py-1 text-white">+</button></span></div>
                </div>
                {renderProblemVisual("jump-line", subBStartNum, subBJumpSteps)}
                <div className="rounded-2xl border border-sky-300 bg-white p-3 text-center text-sm font-black">Ingat {subBStartNum}, lalu hitung maju {subBJumpSteps} langkah. Hasilnya {subBStartNum + subBJumpSteps}.</div>
              </div>
            ) : null}
            {activeSubChapter === "C" ? (
              <div className="space-y-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
                <h3 className="text-base font-black text-emerald-950">Pasangan yang hasilnya 10 bersama Malosi</h3>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-300 bg-white p-3 text-xs font-extrabold">
                  <span>Merah: {subCRedCounters}</span>
                  <input type="range" min={0} max={10} value={subCRedCounters} onChange={(e) => setSubCRedCounters(Number(e.target.value))} className="w-48 accent-emerald-600" />
                  <span>Biru: {10 - subCRedCounters}</span>
                </div>
                {renderDualColorTenFrameSVG(subCRedCounters, 10 - subCRedCounters)}
                <div className="rounded-2xl border-2 border-emerald-400 bg-white p-3 text-center text-base font-black">{subCRedCounters} + {10 - subCRedCounters} = 10</div>
              </div>
            ) : null}
            {activeSubChapter === "D" ? (
              <div className="space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-base font-black text-purple-950">Tukar kartu dan bilangan 0 bersama Tora</h3>
                  <button type="button" onClick={() => { playSound("laser"); setSubDIsFlipped((prev) => !prev); }} className="rounded-xl border-b-4 border-purple-800 bg-purple-600 px-4 py-2 text-xs font-black text-white">Putar balik kartu</button>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs font-bold">
                  <div className="flex items-center gap-2 rounded-xl border border-purple-300 bg-white p-2.5">Sisi A ({subDLeftDots})<button type="button" onClick={() => setSubDLeftDots((v) => Math.max(0, v - 1))} className="rounded bg-slate-200 px-2">-</button><button type="button" onClick={() => setSubDLeftDots((v) => Math.min(10 - subDRightDots, v + 1))} className="rounded bg-purple-600 px-2 text-white">+</button></div>
                  <div className="flex items-center gap-2 rounded-xl border border-purple-300 bg-white p-2.5">Sisi B ({subDRightDots})<button type="button" onClick={() => setSubDRightDots((v) => Math.max(0, v - 1))} className="rounded bg-slate-200 px-2">-</button><button type="button" onClick={() => setSubDRightDots((v) => Math.min(10 - subDLeftDots, v + 1))} className="rounded bg-purple-600 px-2 text-white">+</button></div>
                </div>
                {renderProblemVisual("domino-commutative", kiriDomino, kananDomino)}
                <div className="rounded-2xl border border-purple-300 bg-white p-3 text-center text-sm font-black">{subDLeftDots} + {subDRightDots} = {subDRightDots} + {subDLeftDots} = {subDLeftDots + subDRightDots}</div>
              </div>
            ) : null}
            <div className="space-y-2 rounded-2xl border-b-4 border-slate-950 bg-slate-900 p-4 text-xs text-slate-200">
              <div className="font-extrabold tracking-wider text-amber-400 uppercase">Poin penting</div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>Tanda + dipakai saat dua kelompok digabung atau saat benda bertambah.</div>
                <div>Ingat bilangan yang lebih besar, lalu hitung maju sebanyak bilangan kedua.</div>
                <div>Pasangan yang hasilnya 10: 1+9, 2+8, 3+7, 4+6, dan 5+5.</div>
                <div>Urutan ditukar, hasilnya tetap sama. Ditambah 0, nilainya tetap.</div>
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div>
              <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 3 • Bingkai dua warna dan papan</span>
              <h2 className="text-lg font-black">Gabungkan keping, lalu gambar di papan berpetak</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black">Mesin penggabung dua warna</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-rose-300 bg-white p-3 text-center"><div className="font-bold text-rose-800">Merah</div><div className="my-1 text-2xl font-black text-rose-600">{labAddendA}</div><div className="flex justify-center gap-2"><button type="button" onClick={() => setLabAddendA((v) => Math.max(0, v - 1))} className="rounded-lg bg-slate-200 px-3 py-1 font-black">-</button><button type="button" onClick={() => setLabAddendA((v) => Math.min(10 - labAddendB, v + 1))} className="rounded-lg bg-rose-500 px-3 py-1 font-black text-white">+</button></div></div>
                  <div className="rounded-xl border border-blue-300 bg-white p-3 text-center"><div className="font-bold text-blue-800">Biru</div><div className="my-1 text-2xl font-black text-blue-600">{labAddendB}</div><div className="flex justify-center gap-2"><button type="button" onClick={() => setLabAddendB((v) => Math.max(0, v - 1))} className="rounded-lg bg-slate-200 px-3 py-1 font-black">-</button><button type="button" onClick={() => setLabAddendB((v) => Math.min(10 - labAddendA, v + 1))} className="rounded-lg bg-blue-600 px-3 py-1 font-black text-white">+</button></div></div>
                </div>
                {renderDualColorTenFrameSVG(labAddendA, labAddendB)}
                <div className="rounded-2xl border-2 border-sky-300 bg-white p-3 text-center"><div className="text-2xl font-black">{labAddendA} + {labAddendB} = {labAddendA + labAddendB}</div><div className="mt-0.5 text-[11px] font-bold text-emerald-700">{labAddendA + labAddendB === 10 ? "Bingkai 10 terisi penuh." : `Masih ada ${10 - (labAddendA + labAddendB)} petak kosong.`}</div></div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-black">Papan berpetak</h3><span className="rounded-full border border-amber-300 bg-white px-2.5 py-0.5 text-[11px] font-bold">Goresan: {canvasStrokeCount}</span></div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[{ symbol: "➕", label: "Tambah" }, { symbol: "🍎", label: "Apel" }, { symbol: "🦉", label: "IGIL" }, { symbol: "🔟", label: "Hasil 10" }].map((st) => (
                    <button key={st.label} type="button" onClick={() => addCanvasStamp(st.symbol, st.label)} className="rounded-xl border-b-2 border-amber-400 bg-white px-2.5 py-1.5 text-xs font-bold">{st.symbol} {st.label}</button>
                  ))}
                  {["#2563eb", "#dc2626", "#16a34a"].map((hex) => (
                    <button key={hex} type="button" onClick={() => setBrushColor(hex)} className={`h-6 w-6 rounded-full border-2 ${brushColor === hex ? "scale-110 border-slate-950" : "border-white"}`} style={{ backgroundColor: hex }} />
                  ))}
                  <button type="button" onClick={clearSmartCanvas} className="ml-auto rounded-xl border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-800">Bersihkan</button>
                </div>
                <canvas ref={canvasRef} width={480} height={210} onPointerDown={startCanvasDrawing} onPointerMove={moveCanvasDrawing} onPointerUp={stopCanvasDrawing} onPointerLeave={stopCanvasDrawing} className="h-48 w-full cursor-crosshair touch-none rounded-2xl border-2 border-amber-300 bg-white" />
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 4 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div><span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 4 • 10 latihan, +3 token tiap benar</span><h2 className="text-lg font-black">Latihan penjumlahan</h2></div>
              <div className="rounded-2xl border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-black">Token latihan: {practiceTokens} / 30</div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = practiceAnswers[q.id];
                return <button key={q.id} type="button" onClick={() => setCurrentPracticeIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentPracticeIdx === idx ? "border-sky-800 bg-sky-600 text-white" : ans ? (ans === q.correctAnswer ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900") : "border-slate-300 bg-slate-100"}`}>{idx + 1}</button>;
              })}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between"><span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black">Soal {soalLatihan.id} • {soalLatihan.storyCharacter}</span><button type="button" onClick={() => speakIGIL(soalLatihan.prompt)} className="rounded-xl border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-bold">Bacakan soal</button></div>
              <p className="text-sm font-extrabold md:text-base">{soalLatihan.prompt}</p>
              {renderProblemVisual(soalLatihan.visualType, soalLatihan.paramA, soalLatihan.paramB)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalLatihan.options.map((opt) => (
                  <button key={opt} type="button" onClick={() => handleSelectPracticeAnswer(soalLatihan, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${jawabanLatihan === opt ? (opt === soalLatihan.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : "border-rose-700 bg-rose-500 text-white") : "border-slate-300 bg-white"}`}>{opt}</button>
                ))}
              </div>
              {jawabanLatihan ? <div className={`rounded-2xl border-2 p-3.5 text-xs ${jawabanLatihan === soalLatihan.correctAnswer ? "border-emerald-400 bg-emerald-50" : "border-rose-400 bg-rose-50"}`}><div className="text-sm font-black">{jawabanLatihan === soalLatihan.correctAnswer ? "Benar. +3 token, sekali untuk soal ini." : "Belum tepat. Baca pembahasan ini."}</div><p>{soalLatihan.explanation}</p></div> : null}
              <div className="flex items-center justify-between">
                <button type="button" disabled={currentPracticeIdx === 0} onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                {currentPracticeIdx < 9 ? <button type="button" onClick={() => setCurrentPracticeIdx((i) => Math.min(9, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button> : card5Unlocked ? <button type="button" onClick={() => { playSound("fanfare"); setExamStartTime(Date.now()); setExamElapsedDeci(0); setActiveCard(5); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black">Buka ujian</button> : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 5 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-3.5 text-white">
              <div><span className="text-[11px] font-extrabold text-amber-400 uppercase">Gerbang 1 • wajib 100</span><h2 className="text-base font-black">Ujian penjumlahan, angka berubah tiap ulang</h2></div>
              <div className="flex flex-wrap gap-2 text-xs"><span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-bold">Percobaan {examAttempts}</span><span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono font-bold text-sky-300">{formatStopwatch(examElapsedDeci)}</span><span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-bold">Pindah layar: {focusLossCount}</span></div>
            </div>
            {focusLossCount > 0 ? <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-xs font-bold text-amber-950">Layar berpindah {focusLossCount} kali. Tetap di halaman ini.</div> : null}
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {examQuestions.map((q, idx) => <button key={q.id} type="button" onClick={() => setCurrentExamIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentExamIdx === idx ? "border-amber-600 bg-amber-400" : examAnswers[q.id] ? "border-sky-400 bg-sky-100 text-sky-900" : "border-slate-300 bg-slate-100"}`}>{idx + 1}</button>)}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between"><span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black text-white">Soal {soalUjian.id}</span><button type="button" onClick={() => speakIGIL(soalUjian.questionText)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-bold">Dengarkan soal</button></div>
              <p className="text-sm font-extrabold md:text-base">{soalUjian.questionText}</p>
              {renderProblemVisual(soalUjian.visualType, soalUjian.paramA, soalUjian.paramB)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalUjian.options.map((opt) => (
                  <button key={opt} type="button" onClick={() => handleSelectExamAnswer(soalUjian.id, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${examSubmitted ? (opt === soalUjian.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : jawabanUjian === opt ? "border-rose-700 bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-500") : jawabanUjian === opt ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white"}`}>{opt}</button>
                ))}
              </div>
              {examSubmitted ? <div className="rounded-xl border border-slate-300 bg-white p-3 text-xs"><strong>Pembahasan: </strong>{soalUjian.explanation}</div> : null}
              <div className="flex items-center justify-between">
                <button type="button" disabled={currentExamIdx === 0} onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                {currentExamIdx < examQuestions.length - 1 ? <button type="button" onClick={() => setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button> : !examSubmitted ? <button type="button" onClick={handleSubmitExam} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-5 py-2.5 text-xs font-black text-white">Kumpulkan</button> : null}
              </div>
            </div>
            {examSubmitted ? (
              <div className={`rounded-2xl border-2 p-4 ${examScore === 100 && !dwellTimeWarning ? "border-emerald-400 bg-emerald-50" : "border-rose-400 bg-rose-50"}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-base font-black">{dwellTimeWarning ? "Di bawah 25 detik. Ulangi dengan membaca soal." : examScore === 100 ? "Nilai 100. Praktikum terbuka." : `Nilai ${examScore}/100. Ujian perlu 100.`}</h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleRetryExam} className="rounded-xl border-b-4 border-slate-400 bg-white px-4 py-2 text-xs font-black">Ulangi ujian</button>
                    {card6Unlocked ? <button type="button" onClick={() => { playSound("fanfare"); setActiveCard(6); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black">Masuk praktikum</button> : null}
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
                <div><span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Gerbang 2 • skor 0–1.000</span><h2 className="mt-1 text-lg font-black">Dua kotak bekal sehat yang berjumlah 10</h2></div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setPracticumMode("single")} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "single" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10"}`}>Bab ini saja</button>
                  <button type="button" onClick={() => setPracticumMode("cross4")} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "cross4" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10"}`}>Lintas bab</button>
                </div>
              </div>
              {practicumMode === "cross4" ? (
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="font-black text-amber-300">1. Matematika</div><p className="text-[11px]">Hasil 10, urutan ditukar tetap sama, dan ditambah 0 tetap sama.</p></div>
                  {completedOtherChapters.slice(0, 3).map((ch, idx) => (
                    <div key={ch.chapterId} className="rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="font-black text-amber-300">{idx + 2}. {ch.subject}</div><p className="text-[11px]">{ch.practicumSynthesisHook}</p></div>
                  ))}
                </div>
              ) : <p className="text-xs text-emerald-100">Susun kedua kotak agar masing-masing berjumlah 10 dan porsinya saling bertukar.</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black">Atur dua kotak</h3>
                <ul className="space-y-1 rounded-xl border border-emerald-200 bg-white p-3 text-xs">
                  <li>Kotak Kira: stroberi ditambah pisang harus 10.</li>
                  <li>Kotak Upe menukar porsi Kira, hasilnya tetap 10.</li>
                  <li>Keranjang tambahan pada angka 0.</li>
                </ul>
                {(
                  [
                    { label: "Stroberi Kira", nilai: box1Strawberries, set: setBox1Strawberries },
                    { label: "Pisang Kira", nilai: box1Bananas, set: setBox1Bananas },
                    { label: "Stroberi Upe", nilai: box2Strawberries, set: setBox2Strawberries },
                    { label: "Pisang Upe", nilai: box2Bananas, set: setBox2Bananas },
                  ] as const
                ).map((bar) => (
                  <div key={bar.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
                    <span className="font-bold">{bar.label}: {bar.nilai}</span>
                    <input type="range" min={1} max={9} value={bar.nilai} onChange={(e) => bar.set(Number(e.target.value))} className="accent-emerald-600" />
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
                  <span className="font-bold">Keranjang tambahan: +{waterGlassesBonus}</span>
                  <div className="flex gap-1.5">{[0, 1, 2].map((val) => <button key={val} type="button" onClick={() => setWaterGlassesBonus(val)} className={`rounded-lg px-3 py-1 font-black ${waterGlassesBonus === val ? "bg-emerald-600 text-white" : "bg-slate-100"}`}>+{val}</button>)}</div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black">Denah dua kotak</h3>
                <svg viewBox="0 0 360 215" className="w-full rounded-2xl border-2 border-sky-300 bg-white">
                  <text x="15" y="18" fontSize="11" fontWeight="bold" fill="#9f1239">Kotak Kira: {box1Strawberries} + {box1Bananas} = {jumlahKotak1}</text>
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const x = 15 + (idx % 5) * 65;
                    const y = 26 + Math.floor(idx / 5) * 36;
                    const buah = idx < box1Strawberries ? "🍓" : idx < jumlahKotak1 ? "🍌" : "";
                    return <g key={`k-${idx}`}><rect x={x} y={y} width="60" height="32" rx="6" fill="#fff1f2" stroke="#fda4af" /><text x={x + 30} y={y + 22} textAnchor="middle" fontSize="16">{buah}</text></g>;
                  })}
                  <text x="15" y="120" fontSize="11" fontWeight="bold" fill="#1e40af">Kotak Upe: {box2Strawberries} + {box2Bananas} = {jumlahKotak2}</text>
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const x = 15 + (idx % 5) * 65;
                    const y = 128 + Math.floor(idx / 5) * 36;
                    const buah = idx < box2Strawberries ? "🍓" : idx < jumlahKotak2 ? "🍌" : "";
                    return <g key={`u-${idx}`}><rect x={x} y={y} width="60" height="32" rx="6" fill="#eff6ff" stroke="#93c5fd" /><text x={x + 30} y={y + 22} textAnchor="middle" fontSize="16">{buah}</text></g>;
                  })}
                </svg>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`rounded-xl border p-2 text-center font-bold ${jumlahKotak1 === 10 && jumlahKotak2 === 10 ? "border-emerald-400 bg-emerald-100" : "border-amber-400 bg-amber-100"}`}>Jumlah {jumlahKotak1} dan {jumlahKotak2}</div>
                  <div className={`rounded-xl border p-2 text-center font-bold ${tukarPas ? "border-emerald-400 bg-emerald-100" : "border-amber-400 bg-amber-100"}`}>{tukarPas ? "Porsi saling bertukar" : "Porsi belum bertukar"}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div><h3 className="text-sm font-black">Laporan bekal</h3><p className="text-xs text-slate-600">Tuliskan kedua kalimat penjumlahan dan mengapa hasilnya tetap saat ditukar.</p></div>
                <button type="button" onClick={fillGuidedReportTemplate} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-1.5 text-xs font-black">Bantu susun kalimat</button>
              </div>
              <textarea rows={3} value={studentReportText} onChange={(e) => setStudentReportText(e.target.value)} placeholder="Kotak Kira berisi 6 stroberi dan 4 pisang, jadi 6 + 4 = 10. Kotak Upe menukarnya menjadi 4 + 6 = 10." className="w-full rounded-xl border-2 border-amber-300 bg-white p-3 text-xs select-text md:text-sm" />
              <button type="button" onClick={handleEvaluatePracticum} className="w-full rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 py-3 text-sm font-black text-white">Hitung skor karya di perangkat ini</button>
            </div>
            {practicumRubric ? (
              <div className="space-y-4 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-700 pb-3 md:flex-row md:items-center">
                  <h3 className="text-lg font-black">{studentName} • {CHAPTER_COMPETENCY_METADATA.chapterId}</h3>
                  <div className="rounded-2xl bg-amber-400 px-4 py-2 text-center text-slate-950"><div className="text-[10px] font-black uppercase">Skor</div><div className="text-2xl font-black">{practicumRubric.totalQualityScore} / 1.000</div></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Akurasi<div className="text-xl font-black text-emerald-400">{practicumRubric.accuracyScore}/300</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Sintesis<div className="text-xl font-black text-sky-400">{practicumRubric.synthesisScore}/250</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Desain<div className="text-xl font-black text-amber-400">{practicumRubric.optimizationVisualScore}/200</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">Laporan<div className="text-xl font-black text-purple-400">{practicumRubric.reasoningReportScore}/250</div></div>
                </div>
                <p className="text-xs text-slate-200">{practicumRubric.aiFeedbackSummary}</p>
                {chapterCompletedFlag ? <p className="text-xs font-bold text-emerald-300">Bab ini tercatat di perangkat. Token bab: {totalTokens} / 150.</p> : null}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
