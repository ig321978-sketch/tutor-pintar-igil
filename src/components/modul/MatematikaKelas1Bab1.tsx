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
  chapterId: "MAT-K1-B1",
  grade: 1,
  subject: "Matematika",
  chapterNumber: 1,
  chapterTitle: "Ayo Membilang sampai dengan 10",
  textbookReference:
    "Buku Panduan Guru & Siswa Matematika SD/MI Kelas I (Kemendikbudristek, 2022) — Bab 1, Halaman 1–32",
  coreSkills: [
    "Menghitung, membaca, dan menulis bilangan 0 sampai dengan 10 menggunakan Bingkai 10 (Ten Frame)",
    "Membandingkan banyak benda (lebih banyak, lebih sedikit, sama banyak)",
    "Menghitung maju (1 sampai 10) dan menghitung mundur (10 sampai 1)",
    "Menyusun dan menguraikan pasangan bilangan (Number Bonds) hingga 10",
  ],
  practicumSynthesisHook:
    "Gunakan representasi Bingkai 10 (Ten Frame), perbandingan kuantitas dua kelompok objek, urutan maju-mundur, serta komposisi Pasangan Bilangan berjumlah 10 untuk merancang tata letak objek dan menganalisis keseimbangan data pada proyek lintas mata pelajaran.",
};

type SoundType = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare";

interface PracticeQuestion {
  id: number;
  storyCharacter: "Kira" | "Upe" | "Malosi" | "Tora";
  prompt: string;
  visualType: "ten-frame" | "compare" | "sequence" | "number-bond" | "fingers";
  visualParamA: number;
  visualParamB: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  visualType: "ten-frame" | "compare" | "sequence" | "number-bond";
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

const DEFAULT_CROSS_CHAPTERS: ChapterCompetencyMetadata[] = [
  {
    chapterId: "IPAS-K1-B1",
    grade: 1,
    subject: "IPAS",
    chapterNumber: 1,
    chapterTitle: "Mengenal Lingkungan Sekitar & Tanaman Taman",
    textbookReference: "Buku Kurikulum Merdeka Fase A — Mengenal Makhluk Hidup",
    coreSkills: ["Membedakan tanaman bunga dan pohon peneduh", "Merawat kebersihan taman sekolah"],
    practicumSynthesisHook: "Kelompokkan tanaman sehat dan hewan taman dalam petak observasi.",
  },
  {
    chapterId: "BINDO-K1-B1",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 1,
    chapterTitle: "Bunyi Apa? & Membaca Kata Benda",
    textbookReference: "Buku Bahasa Indonesia SD Kelas I Kemendikbudristek Bab 1",
    coreSkills: ["Menulis kalimat sederhana", "Menceritakan pengamatan dengan runtut"],
    practicumSynthesisHook: "Tuliskan laporan pengamatan singkat dengan kosakata benda yang tepat.",
  },
  {
    chapterId: "PANCASILA-K1-B1",
    grade: 1,
    subject: "Pancasila",
    chapterNumber: 1,
    chapterTitle: "Aku Cinta Kebersihan & Berbagi Bersama Teman",
    textbookReference: "Pendidikan Pancasila SD Kelas I Kemendikbudristek Bab 1",
    coreSkills: ["Berbagi adil dengan teman", "Menjaga ketertiban fasilitas bersama"],
    practicumSynthesisHook: "Pastikan pembagian benda di taman adil dan mencerminkan gotong royong.",
  },
];

const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    storyCharacter: "Kira",
    prompt: "Kira memetik buah apel merah dan menyusunnya ke dalam Bingkai 10. Berapa banyak apel Kira seluruhnya?",
    visualType: "ten-frame",
    visualParamA: 7,
    visualParamB: 0,
    options: ["6", "7", "8", "9"],
    correctAnswer: "7",
    explanation:
      "Baris atas Bingkai 10 berisi penuh 5 apel, ditambah 2 apel di baris bawah. 5 ditambah 2 sama dengan 7 apel.",
  },
  {
    id: 2,
    storyCharacter: "Upe",
    prompt: "Semua burung pipit di dalam sangkar sudah terbang ke langit. Sekarang Bingkai 10 tampak kosong. Lambang bilangan yang tepat adalah...",
    visualType: "ten-frame",
    visualParamA: 0,
    visualParamB: 0,
    options: ["0", "1", "5", "10"],
    correctAnswer: "0",
    explanation:
      "Jika tidak ada satu pun benda di dalam kotak, banyaknya adalah nol dan ditulis dengan lambang bilangan 0.",
  },
  {
    id: 3,
    storyCharacter: "Malosi",
    prompt: "Malosi menunjukkan jari tangan kirinya sebanyak 5 jari dan tangan kanannya 3 jari. Berapa jumlah jari yang ditunjukkan Malosi?",
    visualType: "fingers",
    visualParamA: 5,
    visualParamB: 3,
    options: ["7", "8", "9", "6"],
    correctAnswer: "8",
    explanation: "5 jari di tangan kiri ditambah 3 jari di tangan kanan menghasilkan 8 jari (Delapan).",
  },
  {
    id: 4,
    storyCharacter: "Tora",
    prompt: "Perhatikan kelereng Tora (6 butir) dan kelereng Malosi (4 butir). Kelereng Tora ... daripada kelereng Malosi.",
    visualType: "compare",
    visualParamA: 6,
    visualParamB: 4,
    options: ["Lebih banyak", "Lebih sedikit", "Sama banyak", "Kurang dari"],
    correctAnswer: "Lebih banyak",
    explanation:
      "Saat dipasangkan satu per satu, 6 kelereng Tora memiliki sisa 2 kelereng yang tidak berpasangan. Jadi 6 lebih banyak dari 4.",
  },
  {
    id: 5,
    storyCharacter: "Kira",
    prompt: "Kira memiliki 5 bunga matahari dan Upe memiliki 5 kupu-kupu. Banyak bunga matahari ... banyak kupu-kupu.",
    visualType: "compare",
    visualParamA: 5,
    visualParamB: 5,
    options: ["Sama banyak dengan", "Lebih banyak dari", "Lebih sedikit dari", "Berbeda dengan"],
    correctAnswer: "Sama banyak dengan",
    explanation:
      "Setiap bunga matahari tepat berpasangan satu-satu dengan 1 kupu-kupu tanpa sisa (5 = 5), sehingga sama banyak.",
  },
  {
    id: 6,
    storyCharacter: "Malosi",
    prompt: "Malosi melompat MAJU di batu loncatan: 4, 5, 6, [...], 8. Bilangan berapa yang tepat untuk mengisi batu yang kosong?",
    visualType: "sequence",
    visualParamA: 4,
    visualParamB: 1,
    options: ["5", "6", "7", "9"],
    correctAnswer: "7",
    explanation: "Saat menghitung maju, bilangan bertambah 1 setiap langkah. Setelah 6 adalah 7, lalu 8.",
  },
  {
    id: 7,
    storyCharacter: "Tora",
    prompt: "Tora menghitung MUNDUR saat roket mainan akan meluncur: 9, 8, 7, [...], 5. Bilangan pada kotak kosong adalah...",
    visualType: "sequence",
    visualParamA: 9,
    visualParamB: -1,
    options: ["4", "6", "8", "10"],
    correctAnswer: "6",
    explanation: "Menghitung mundur berarti berkurang 1 setiap langkah. Satu langkah mundur dari 7 adalah 6.",
  },
  {
    id: 8,
    storyCharacter: "Upe",
    prompt: "Perhatikan Pasangan Bilangan milik Upe! Bilangan 10 diuraikan menjadi 6 dan [...]. Berapakah pasangannya?",
    visualType: "number-bond",
    visualParamA: 10,
    visualParamB: 6,
    options: ["3", "4", "5", "2"],
    correctAnswer: "4",
    explanation: "6 membutuhkan 4 lagi agar menjadi 10. Jadi pasangan bilangan 10 adalah 6 dan 4.",
  },
  {
    id: 9,
    storyCharacter: "Kira",
    prompt: "Kira membawa 8 kue tradisional. Sebanyak 3 kue ditaruh di piring kiri, dan sisanya di piring kanan. Berapa kue di piring kanan?",
    visualType: "number-bond",
    visualParamA: 8,
    visualParamB: 3,
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    explanation: "Pasangan bilangan 8 terdiri dari 3 dan 5, karena 3 + 5 = 8.",
  },
  {
    id: 10,
    storyCharacter: "Malosi",
    prompt: "Ibu Guru menyebutkan kata bilangan 'SEMBILAN'. Manakah lambang bilangan yang sesuai dengan Bingkai 10 di bawah?",
    visualType: "ten-frame",
    visualParamA: 9,
    visualParamB: 0,
    options: ["6", "7", "8", "9"],
    correctAnswer: "9",
    explanation:
      "Kata 'Sembilan' ditulis dengan angka 9 (5 di baris atas Bingkai 10 dan 4 di baris bawah, menyisakan 1 kotak kosong).",
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  }
  return clone;
}

function generateNumericOptions(correct: number, minVal = 0, maxVal = 10): string[] {
  const set = new Set<number>([correct]);
  const candidates: number[] = [];
  for (let v = minVal; v <= maxVal; v += 1) {
    if (v !== correct) candidates.push(v);
  }
  const shuffledCandidates = shuffleArray(candidates);
  for (const c of shuffledCandidates) {
    if (set.size < 4) set.add(c);
  }
  return shuffleArray(Array.from(set).map(String));
}

function generateDynamicExamQuestions(): ExamQuestion[] {
  const q1Count = Math.floor(Math.random() * 5) + 6;
  const q2Count = Math.floor(Math.random() * 5) + 1;
  const q3Count = Math.random() > 0.5 ? 0 : 10;
  const q4A = Math.floor(Math.random() * 4) + 6;
  const q4B = Math.floor(Math.random() * 4) + 2;
  const q5A = Math.floor(Math.random() * 3) + 2;
  const q5B = Math.floor(Math.random() * 4) + 6;
  const q6Start = Math.floor(Math.random() * 5) + 2;
  const q6Answer = q6Start + 3;
  const q7Start = Math.floor(Math.random() * 3) + 8;
  const q7Answer = q7Start - 3;
  const q8Part = Math.floor(Math.random() * 7) + 2;
  const q8Answer = 10 - q8Part;
  const q9Whole = Math.floor(Math.random() * 3) + 7;
  const q9Part = Math.floor(Math.random() * (q9Whole - 2)) + 1;
  const q9Answer = q9Whole - q9Part;
  const q10Num = Math.floor(Math.random() * 6) + 5;

  return [
    {
      id: 1,
      questionText: "Kira menyusun bintang ke dalam Bingkai 10 berikut. Berapa banyak bintang Kira seluruhnya?",
      visualType: "ten-frame",
      paramA: q1Count,
      paramB: 0,
      options: generateNumericOptions(q1Count, 4, 10),
      correctAnswer: String(q1Count),
      explanation: `Baris atas berisi 5 bintang dan baris bawah berisi ${q1Count - 5} bintang. Totalnya adalah ${q1Count} (${NUMBER_WORDS[q1Count]}).`,
    },
    {
      id: 2,
      questionText: "Upe meletakkan apel di dalam Bingkai 10. Hitunglah berapa banyak apel milik Upe!",
      visualType: "ten-frame",
      paramA: q2Count,
      paramB: 0,
      options: generateNumericOptions(q2Count, 0, 7),
      correctAnswer: String(q2Count),
      explanation: `Jumlah petak yang terisi apel pada Bingkai 10 adalah ${q2Count} (${NUMBER_WORDS[q2Count]}).`,
    },
    {
      id: 3,
      questionText:
        q3Count === 0
          ? "Malosi melihat Bingkai 10 yang sama sekali tidak berisi benda. Lambang bilangan yang tepat adalah..."
          : "Tora mengisi penuh seluruh kotak pada Bingkai 10 tanpa ada yang kosong. Berapa banyak benda milik Tora?",
      visualType: "ten-frame",
      paramA: q3Count,
      paramB: 0,
      options: generateNumericOptions(q3Count, 0, 10),
      correctAnswer: String(q3Count),
      explanation:
        q3Count === 0
          ? "Kotak yang kosong seluruhnya melambangkan bilangan 0 (Nol)."
          : "Bingkai 10 yang terisi penuh 2 baris (5 + 5) melambangkan bilangan 10 (Sepuluh).",
    },
    {
      id: 4,
      questionText: `Bandingkan banyak benda di Kelompok A (${q4A} benda) dengan Kelompok B (${q4B} benda). Kelompok A ... daripada Kelompok B.`,
      visualType: "compare",
      paramA: q4A,
      paramB: q4B,
      options: shuffleArray(["Lebih banyak", "Lebih sedikit", "Sama banyak", "Tidak ada benda"]),
      correctAnswer: "Lebih banyak",
      explanation: `Karena ${q4A} lebih besar daripada ${q4B} (ada sisa ${q4A - q4B} benda saat dipasangkan), maka Kelompok A lebih banyak.`,
    },
    {
      id: 5,
      questionText: `Perhatikan Kelompok A (${q5A} benda) dan Kelompok B (${q5B} benda). Kelompok A ... daripada Kelompok B.`,
      visualType: "compare",
      paramA: q5A,
      paramB: q5B,
      options: shuffleArray(["Lebih sedikit", "Lebih banyak", "Sama banyak", "Penuh semua"]),
      correctAnswer: "Lebih sedikit",
      explanation: `Kelompok A hanya memiliki ${q5A} benda sedangkan Kelompok B memiliki ${q5B} benda, sehingga Kelompok A lebih sedikit.`,
    },
    {
      id: 6,
      questionText: `Lengkapi urutan bilangan MAJU berikut ini: ${q6Start}, ${q6Start + 1}, ${q6Start + 2}, [...], ${q6Start + 4}.`,
      visualType: "sequence",
      paramA: q6Start,
      paramB: 1,
      options: generateNumericOptions(q6Answer, 1, 10),
      correctAnswer: String(q6Answer),
      explanation: `Menghitung maju berarti bertambah 1. Setelah ${q6Start + 2} adalah ${q6Answer}.`,
    },
    {
      id: 7,
      questionText: `Lengkapi urutan bilangan MUNDUR berikut ini: ${q7Start}, ${q7Start - 1}, ${q7Start - 2}, [...], ${q7Start - 4}.`,
      visualType: "sequence",
      paramA: q7Start,
      paramB: -1,
      options: generateNumericOptions(q7Answer, 1, 10),
      correctAnswer: String(q7Answer),
      explanation: `Menghitung mundur berarti berkurang 1 setiap langkah. Sebelum ${q7Start - 2} adalah ${q7Answer}.`,
    },
    {
      id: 8,
      questionText: `Pasangan Bilangan: Untuk membentuk bilangan 10, bilangan ${q8Part} harus dipasangkan dengan bilangan...`,
      visualType: "number-bond",
      paramA: 10,
      paramB: q8Part,
      options: generateNumericOptions(q8Answer, 1, 9),
      correctAnswer: String(q8Answer),
      explanation: `${q8Part} ditambah ${q8Answer} menghasilkan 10. Jadi pasangan dari ${q8Part} untuk menjadi 10 adalah ${q8Answer}.`,
    },
    {
      id: 9,
      questionText: `Perhatikan bagan Pasangan Bilangan! Bilangan ${q9Whole} diuraikan menjadi ${q9Part} dan [...]. Berapakah bilangan pasangannya?`,
      visualType: "number-bond",
      paramA: q9Whole,
      paramB: q9Part,
      options: generateNumericOptions(q9Answer, 1, 9),
      correctAnswer: String(q9Answer),
      explanation: `Karena ${q9Part} + ${q9Answer} = ${q9Whole}, maka bilangan yang tepat untuk melengkapi pasangan adalah ${q9Answer}.`,
    },
    {
      id: 10,
      questionText: `IGIL Si Burung Hantu Cerdas mengucapkan kata bilangan "${NUMBER_WORDS[q10Num].toUpperCase()}". Manakah angka yang tepat?`,
      visualType: "ten-frame",
      paramA: q10Num,
      paramB: 0,
      options: generateNumericOptions(q10Num, 3, 10),
      correctAnswer: String(q10Num),
      explanation: `Kata bilangan "${NUMBER_WORDS[q10Num]}" ditulis dengan lambang angka ${q10Num}.`,
    },
  ];
}

export default function MatematikaKelas1Bab1({
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
  const [foundFireflies, setFoundFireflies] = useState<number[]>([]);
  const [activeSubChapter, setActiveSubChapter] = useState<"A" | "B" | "C" | "D">("A");
  const [subATenFrameCount, setSubATenFrameCount] = useState(5);
  const [subBLeftCount, setSubBLeftCount] = useState(6);
  const [subBRightCount, setSubBRightCount] = useState(4);
  const [subCFrogPos, setSubCFrogPos] = useState(1);
  const [subCMode, setSubCMode] = useState<"maju" | "mundur">("maju");
  const [subDWhole, setSubDWhole] = useState(10);
  const [subDLeftPart, setSubDLeftPart] = useState(6);
  const [labTargetWhole, setLabTargetWhole] = useState(10);
  const [labGroupRed, setLabGroupRed] = useState(6);
  const [labGroupBlue, setLabGroupBlue] = useState(4);
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
  const [gardenFlowers, setGardenFlowers] = useState(6);
  const [gardenTrees, setGardenTrees] = useState(4);
  const [gardenBenches, setGardenBenches] = useState(5);
  const [gardenTrashBins, setGardenTrashBins] = useState(5);
  const [steppingStonesOrder, setSteppingStonesOrder] = useState<"maju" | "mundur">("maju");
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
      const createOsc = (
        freq: number,
        oscType: OscillatorType,
        start: number,
        duration: number,
        gainVal = 0.12,
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
      if (type === "click") createOsc(520, "sine", now, 0.06, 0.1);
      else if (type === "pop") {
        createOsc(400, "triangle", now, 0.08, 0.14);
        createOsc(680, "sine", now + 0.04, 0.09, 0.12);
      } else if (type === "laser") {
        createOsc(880, "sawtooth", now, 0.12, 0.08);
        createOsc(440, "sine", now + 0.06, 0.12, 0.1);
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
    const skalaX = canvas.width / rect.width;
    const skalaY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * skalaX,
      y: (e.clientY - rect.top) * skalaY,
    };
  };

  const startCanvasDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const titik = titikKanvas(e);
    if (!ctx || !titik) return;
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    const canvas = canvasRef.current;
    const x = 45 + ((canvasStamps.length * 48) % 440);
    const y = 55 + Math.floor((canvasStamps.length * 48) / 440) * 55;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "28px sans-serif";
        ctx.fillText(symbol, x, y);
      }
    }
    setCanvasStamps((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, x, y, symbol, label }]);
    setCanvasStrokeCount((prev) => prev + 5);
  };

  const clearSmartCanvas = () => {
    playSound("click");
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) drawCanvasGrid(ctx, canvas.width, canvas.height);
    }
    setCanvasStamps([]);
    setCanvasStrokeCount(0);
  };

  const handleToggleFirefly = (id: number) => {
    if (foundFireflies.includes(id)) return;
    const updated = [...foundFireflies, id];
    setFoundFireflies(updated);
    playSound(updated.length === 5 ? "fanfare" : "pop");
    if (updated.length === 5) {
      setCard2Unlocked(true);
      speakIGIL(
        "Hebat sekali! Kamu dan Kira berhasil membilang 5 kunang-kunang bercahaya! Sekarang Kartu 2 Game Materi sudah terbuka!",
      );
    }
  };

  const handleSelectPracticeAnswer = (question: PracticeQuestion, selected: string) => {
    const updatedAnswers = { ...practiceAnswers, [question.id]: selected };
    setPracticeAnswers(updatedAnswers);
    const isCorrect = selected === question.correctAnswer;
    if (isCorrect) {
      playSound("coin");
      if (!claimedPracticeIds.includes(question.id)) {
        const updatedClaimed = [...claimedPracticeIds, question.id];
        setClaimedPracticeIds(updatedClaimed);
        setPracticeTokens((prev) => Math.min(30, prev + 3));
      }
    } else {
      playSound("wrong");
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
      speakIGIL("Ayo jawab seluruh 10 soal ujian terlebih dahulu sebelum dikumpulkan ya!");
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
      speakIGIL(
        "Wah, pengerjaanmu terlalu cepat di bawah 25 detik! Sistem keamanan IGIL meminta kamu mengulang ujian dengan membaca soal secara teliti.",
      );
      return;
    }
    setDwellTimeWarning(false);
    if (calculatedScore === 100) {
      setExamTokens(70);
      setCard6Unlocked(true);
      playSound("fanfare");
      speakIGIL(
        "Luar biasa! Nilai kamu 100 sempurna! Kamu berhasil melewati Gerbang 1 Si Paling Pintar dan membuka gembok Kartu 6 Praktikum Kreatif!",
      );
    } else {
      playSound("wrong");
      speakIGIL(
        `Nilai kamu ${calculatedScore}. Jangan menyerah! Ayo klik Ulangi Ujian dengan angka baru sampai meraih nilai 100 sempurna!`,
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

  const fillGuidedReportTemplate = () => {
    playSound("pop");
    const totalPlants = gardenFlowers + gardenTrees;
    const totalFacilities = gardenBenches + gardenTrashBins;
    const template = `Saya bersama Kira, Upe, Malosi, dan Tora merancang Taman Belajar Bilangan 10. Pada Bingkai 10 Tanaman, saya menanam ${gardenFlowers} bunga dan ${gardenTrees} pohon peneduh sehingga pasangan bilangannya ${gardenFlowers} + ${gardenTrees} = ${totalPlants}. Untuk fasilitas kebersihan dan berbagi, saya menyusun ${gardenBenches} bangku taman dan ${gardenTrashBins} tempat sampah (${gardenBenches} sama banyak dengan ${gardenTrashBins}, jumlahnya ${totalFacilities}). Batu loncatan disusun menghitung ${steppingStonesOrder} agar teman-teman mudah belajar membilang.`;
    setStudentReportText(template);
  };

  const handleEvaluatePracticum = () => {
    const totalPlants = gardenFlowers + gardenTrees;
    const totalFacilities = gardenBenches + gardenTrashBins;
    const reportWords = studentReportText.trim().split(/\s+/).filter(Boolean).length;
    if (reportWords < 8) {
      playSound("wrong");
      speakIGIL(
        "Tuliskan atau gunakan tombol Bantu Susun Kalimat Laporan terlebih dahulu minimal 8 kata agar IGIL bisa menilai alasanmu!",
      );
      return;
    }
    let accuracyScore = 120;
    if (totalPlants === 10) accuracyScore += 90;
    if (totalFacilities === 10) accuracyScore += 60;
    if (gardenBenches === gardenTrashBins) accuracyScore += 30;
    accuracyScore = Math.min(300, accuracyScore);
    let synthesisScore = practicumMode === "cross4" ? 160 : 120;
    const lowerReport = studentReportText.toLowerCase();
    if (lowerReport.includes("bunga") || lowerReport.includes("pohon") || lowerReport.includes("tanaman")) {
      synthesisScore += 30;
    }
    if (
      lowerReport.includes("sampah") ||
      lowerReport.includes("bangku") ||
      lowerReport.includes("adil") ||
      lowerReport.includes("sama banyak")
    ) {
      synthesisScore += 30;
    }
    if (lowerReport.includes("pasangan") || lowerReport.includes("10") || lowerReport.includes("bingkai")) {
      synthesisScore += 30;
    }
    synthesisScore = Math.min(250, synthesisScore);
    let optimizationVisualScore = 110;
    if (gardenFlowers >= 1 && gardenTrees >= 1 && totalPlants === 10) optimizationVisualScore += 50;
    if (gardenBenches === 5 && gardenTrashBins === 5) optimizationVisualScore += 40;
    optimizationVisualScore = Math.min(200, optimizationVisualScore);
    let reasoningReportScore = Math.min(180, reportWords * 5);
    if (/\d/.test(studentReportText)) reasoningReportScore += 40;
    if (lowerReport.includes("karena") || lowerReport.includes("sehingga") || lowerReport.includes("agar")) {
      reasoningReportScore += 30;
    }
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
          ? "Karya Praktikum Istimewa! Pasangan bilangan 10 pada tanaman dan keseimbangan fasilitas taman terpadu dengan laporan yang runtut."
          : "Rancangan taman sudah baik! Agar skor mendekati 1.000 poin, jumlah bunga ditambah pohon harus 10, bangku sama banyak dengan tempat sampah (5 dan 5), lalu jelaskan alasannya di laporan.",
    };
    setPracticumRubric(rubricResult);
    setPracticumTokens(50);
    setChapterCompletedFlag(true);
    playSound("fanfare");
    speakIGIL(
      `Selamat ${studentName}! Praktikum kamu meraih skor kualitas ${totalQualityScore} dari 1000 poin dan kamu mengantongi total 150 Token IGIL di Bab 1 ini!`,
    );
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

  const renderTenFrameSVG = (count: number, iconType: "apple" | "star" = "apple") => {
    const safeCount = Math.max(0, Math.min(10, count));
    return (
      <svg viewBox="0 0 320 140" className="mx-auto w-full max-w-md">
        <rect x="10" y="10" width="300" height="120" rx="12" fill="#fefce8" stroke="#ca8a04" strokeWidth="4" />
        {Array.from({ length: 10 }).map((_, idx) => {
          const col = idx % 5;
          const row = Math.floor(idx / 5);
          const x = 10 + col * 60;
          const y = 10 + row * 60;
          const isFilled = idx < safeCount;
          return (
            <g key={idx}>
              <rect x={x} y={y} width="60" height="60" fill={isFilled ? "#fef08a" : "#ffffff"} stroke="#eab308" strokeWidth="2" />
              {isFilled && iconType === "apple" ? (
                <g transform={`translate(${x + 30}, ${y + 32})`}>
                  <circle cx="0" cy="2" r="17" fill="#ef4444" />
                  <path d="M 0 -15 Q 5 -22 10 -18" stroke="#15803d" strokeWidth="3" fill="none" />
                  <ellipse cx="6" cy="-16" rx="5" ry="3" fill="#22c55e" />
                </g>
              ) : null}
              {isFilled && iconType === "star" ? (
                <g transform={`translate(${x + 30}, ${y + 30})`}>
                  <polygon points="0,-18 5,-6 18,-6 8,2 12,15 0,7 -12,15 -8,2 -18,-6 -5,-6" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    );
  };

  const renderQuestionVisual = (
    type: "ten-frame" | "compare" | "sequence" | "number-bond" | "fingers",
    paramA: number,
    paramB: number,
  ) => {
    if (type === "ten-frame") return renderTenFrameSVG(paramA, paramA % 2 === 0 ? "star" : "apple");
    if (type === "fingers") {
      return (
        <div className="flex items-center justify-center gap-6 rounded-2xl border-2 border-amber-200 bg-amber-50 py-3">
          <div className="text-center">
            <div className="text-xl font-extrabold text-amber-700">{paramA} Jari Kiri</div>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: paramA }).map((_, i) => (
                <div key={i} className="h-10 w-4 rounded-t-full border border-amber-600 bg-amber-400" />
              ))}
            </div>
          </div>
          <div className="text-3xl font-black text-amber-900">+</div>
          <div className="text-center">
            <div className="text-xl font-extrabold text-amber-700">{paramB} Jari Kanan</div>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: paramB }).map((_, i) => (
                <div key={i} className="h-10 w-4 rounded-t-full border border-amber-600 bg-amber-400" />
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (type === "compare") {
      const maxCols = Math.max(paramA, paramB, 1);
      return (
        <svg viewBox="0 0 360 135" className="mx-auto w-full max-w-md">
          <rect x="5" y="5" width="350" height="125" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="18" y="42" fontSize="13" fontWeight="bold" fill="#166534">Kelompok A ({paramA})</text>
          <text x="18" y="102" fontSize="13" fontWeight="bold" fill="#1e40af">Kelompok B ({paramB})</text>
          {Array.from({ length: maxCols }).map((_, i) => {
            const cx = 135 + i * 22;
            const hasA = i < paramA;
            const hasB = i < paramB;
            return (
              <g key={i}>
                {hasA && hasB ? <line x1={cx} y1={38} x2={cx} y2={96} stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" /> : null}
                {hasA ? <circle cx={cx} cy={38} r="8" fill="#16a34a" /> : null}
                {hasB ? <circle cx={cx} cy={96} r="8" fill="#2563eb" /> : null}
              </g>
            );
          })}
        </svg>
      );
    }
    if (type === "sequence") {
      const items = [0, 1, 2, 3, 4].map((idx) => paramA + idx * paramB);
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 py-4">
          {items.map((val, idx) => {
            const isHidden = idx === 3;
            return (
              <div
                key={idx}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-b-4 text-xl font-black ${
                  isHidden ? "animate-pulse border-amber-600 bg-amber-300 text-amber-950" : "border-sky-400 bg-sky-100 text-sky-900"
                }`}
              >
                {isHidden ? "?" : val}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <svg viewBox="0 0 300 135" className="mx-auto w-full max-w-sm">
        <line x1="150" y1="38" x2="90" y2="98" stroke="#475569" strokeWidth="4" />
        <line x1="150" y1="38" x2="210" y2="98" stroke="#475569" strokeWidth="4" />
        <circle cx="150" cy="38" r="28" fill="#fde047" stroke="#ca8a04" strokeWidth="4" />
        <text x="150" y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">{paramA}</text>
        <circle cx="90" cy="98" r="25" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" />
        <text x="90" y="105" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">{paramB}</text>
        <circle cx="210" cy="98" r="25" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" />
        <text x="210" y="105" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#881337">?</text>
      </svg>
    );
  };

  const formatStopwatch = (deci: number) => {
    const totalSeconds = Math.floor(deci / 10);
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}.${deci % 10}`;
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
  const latihanBenar = jawabanLatihan === soalLatihan.correctAnswer;
  const soalUjian = examQuestions[currentExamIdx];
  const jawabanUjian = examAnswers[soalUjian.id];
  const kananLab = labGroupRed + labGroupBlue;
  const miring = Math.max(-14, Math.min(14, (kananLab - labTargetWhole) * 3.5));
  const timbanganSeimbang = kananLab === labTargetWhole;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50 p-3 font-sans text-slate-800 md:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-sky-200 bg-white p-4 shadow-md md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-100 shadow-inner">
              <svg viewBox="0 0 80 80" className="h-14 w-14">
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
                <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-extrabold text-white">KELAS 1 SD • BAB 1</span>
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
            <button
              type="button"
              onClick={() =>
                speakIGIL(
                  `Halo ${studentName}! Aku IGIL. Ayo kita membilang bilangan 1 sampai 10 bersama Kira, Upe, Malosi, dan Tora!`,
                )
              }
              className="flex items-center gap-1 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950 active:translate-y-0.5 active:border-b-0"
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
                <span className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">Referensi buku</span>
                <h2 className="text-lg font-black text-slate-900">Matematika Kelas I — Bab 1: Ayo Membilang sampai dengan 10 (Halaman 1–32)</h2>
                <p className="mt-0.5 text-xs text-slate-600">Bersama Kira, Upe, Malosi, dan Tora, dipandu IGIL.</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakIGIL(
                    "Di Bab 1 ini kita belajar menghitung benda dengan Bingkai 10, membandingkan banyak benda, menghitung maju dan mundur, serta menemukan pasangan bilangan.",
                  )
                }
                className="shrink-0 rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-bold text-white active:translate-y-0.5 active:border-b-0"
              >
                Dengarkan silabus
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <h3 className="text-sm font-black text-amber-950">Peta 4 sub-bab</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab A (Hal. 2–13):</strong> Membilang 0–10 dengan Bingkai 10 bersama Kira.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab B (Hal. 14–19):</strong> Lebih banyak, lebih sedikit, sama banyak bersama Upe.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab C (Hal. 20–23):</strong> Menghitung maju dan mundur bersama Malosi.</li>
                  <li className="rounded-xl border border-amber-200 bg-white p-2.5"><strong>Sub-bab D (Hal. 24–32):</strong> Pasangan bilangan bersama Tora.</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Dua gerbang</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5">
                    <span className="font-black text-sky-700">Gerbang 1 — Kartu 4 dan 5, 100 token.</span>
                    <p className="mt-0.5">Selesaikan 10 latihan (+30 token) dan raih 100 pada ujian (+70 token).</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-white p-2.5">
                    <span className="font-black text-emerald-700">Gerbang 2 — Kartu 6, +50 token, skor 0–1.000.</span>
                    <p className="mt-0.5">Akurasi 300, sintesis 250, desain 200, dan laporan 250.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border-b-4 border-indigo-950 bg-gradient-to-r from-indigo-900 via-sky-900 to-slate-900 p-5 text-white">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Teka-teki pembuka</span>
                  <h3 className="mt-1 text-base font-black md:text-lg">Sentuh 5 kunang-kunang bersama Kira</h3>
                  <p className="text-xs text-sky-200">Ketuk kelima cahaya itu sambil membilang 1 sampai 5. Kartu 2, 3, dan 4 akan terbuka.</p>
                </div>
                <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center">
                  <div className="text-xs font-bold text-amber-300">Ditemukan</div>
                  <div className="text-2xl font-black text-amber-400">{foundFireflies.length} / 5</div>
                </div>
              </div>
              <svg viewBox="0 0 500 130" className="h-36 w-full rounded-2xl border border-sky-700 bg-slate-950/60">
                <circle cx="450" cy="32" r="18" fill="#fef08a" opacity="0.9" />
                <path d="M 0 110 Q 120 90 250 110 T 500 105 L 500 130 L 0 130 Z" fill="#064e3b" />
                {[
                  { id: 1, x: 75, y: 55 },
                  { id: 2, x: 165, y: 38 },
                  { id: 3, x: 255, y: 68 },
                  { id: 4, x: 345, y: 42 },
                  { id: 5, x: 410, y: 75 },
                ].map((fly, idx) => {
                  const nyala = foundFireflies.includes(fly.id);
                  return (
                    <g key={fly.id} onClick={() => handleToggleFirefly(fly.id)} className="cursor-pointer">
                      <circle cx={fly.x} cy={fly.y} r={nyala ? 22 : 16} fill={nyala ? "#fde047" : "#38bdf8"} opacity={nyala ? 0.95 : 0.45} />
                      <circle cx={fly.x} cy={fly.y} r="9" fill={nyala ? "#ca8a04" : "#e0f2fe"} />
                      <text x={fly.x} y={fly.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{nyala ? idx + 1 : "?"}</text>
                    </g>
                  );
                })}
              </svg>
              {card2Unlocked ? (
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-400 bg-emerald-500/20 p-3 sm:flex-row">
                  <div className="text-xs font-bold text-emerald-200 md:text-sm">Kamu membilang 1, 2, 3, 4, 5. Kartu 2, 3, dan 4 terbuka.</div>
                  <button type="button" onClick={() => { playSound("pop"); setActiveCard(2); }} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">
                    Lanjut ke Kartu 2
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
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 2 • Main bersama tokoh</span>
                <h2 className="text-lg font-black text-slate-900">Alat peraga Kira, Upe, Malosi, dan Tora</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { code: "A" as const, title: "A Bingkai 10" },
                  { code: "B" as const, title: "B Bandingkan" },
                  { code: "C" as const, title: "C Maju-Mundur" },
                  { code: "D" as const, title: "D Pasangan" },
                ].map((sub) => (
                  <button
                    key={sub.code}
                    type="button"
                    onClick={() => { playSound("click"); setActiveSubChapter(sub.code); }}
                    className={`rounded-xl border-b-4 px-3 py-2 text-xs font-extrabold ${activeSubChapter === sub.code ? "border-amber-600 bg-amber-400 text-slate-950" : "border-slate-300 bg-slate-100 text-slate-700"}`}
                  >
                    {sub.title}
                  </button>
                ))}
              </div>
            </div>
            {activeSubChapter === "A" ? (
              <div className="space-y-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                  <div>
                    <h3 className="text-base font-black text-amber-950">Bingkai 10 bersama Kira</h3>
                    <p className="text-xs text-slate-600">Tambah atau kurangi apel. Lambang dan nama bilangan ikut berubah.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { playSound("pop"); setSubATenFrameCount((prev) => Math.max(0, prev - 1)); }} className="rounded-xl border-b-4 border-rose-700 bg-rose-500 px-4 py-2 text-sm font-black text-white">Kurangi</button>
                    <button type="button" onClick={() => { playSound("pop"); setSubATenFrameCount((prev) => Math.min(10, prev + 1)); }} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-4 py-2 text-sm font-black text-white">Tambah</button>
                  </div>
                </div>
                {renderTenFrameSVG(subATenFrameCount, "apple")}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border-2 border-amber-300 bg-white p-3"><div className="text-xs font-bold text-slate-500">Lambang</div><div className="text-3xl font-black text-amber-700">{subATenFrameCount}</div></div>
                  <div className="rounded-2xl border-2 border-amber-300 bg-white p-3"><div className="text-xs font-bold text-slate-500">Nama</div><div className="text-xl font-black text-sky-800">{NUMBER_WORDS[subATenFrameCount]}</div></div>
                  <div className="rounded-2xl border-2 border-amber-300 bg-white p-3"><div className="text-xs font-bold text-slate-500">Sisa menuju 10</div><div className="text-2xl font-black text-emerald-700">{10 - subATenFrameCount}</div></div>
                </div>
              </div>
            ) : null}
            {activeSubChapter === "B" ? (
              <div className="space-y-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
                <h3 className="text-base font-black text-emerald-950">Membandingkan bersama Upe</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-emerald-800">Kelompok A: {subBLeftCount}</span>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => { playSound("click"); setSubBLeftCount((v) => Math.max(1, v - 1)); }} className="rounded-lg border-b-2 border-slate-400 bg-slate-200 px-3 py-1 font-black">-</button>
                      <button type="button" onClick={() => { playSound("click"); setSubBLeftCount((v) => Math.min(10, v + 1)); }} className="rounded-lg border-b-2 border-emerald-700 bg-emerald-500 px-3 py-1 font-black text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-sky-300 bg-white p-3">
                    <span className="text-xs font-extrabold text-sky-800">Kelompok B: {subBRightCount}</span>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => { playSound("click"); setSubBRightCount((v) => Math.max(1, v - 1)); }} className="rounded-lg border-b-2 border-slate-400 bg-slate-200 px-3 py-1 font-black">-</button>
                      <button type="button" onClick={() => { playSound("click"); setSubBRightCount((v) => Math.min(10, v + 1)); }} className="rounded-lg border-b-2 border-sky-700 bg-sky-500 px-3 py-1 font-black text-white">+</button>
                    </div>
                  </div>
                </div>
                {renderQuestionVisual("compare", subBLeftCount, subBRightCount)}
                <div className="rounded-2xl border-2 border-emerald-400 bg-white p-3 text-center text-sm font-black text-slate-900">
                  Kelompok A ({subBLeftCount}) {subBLeftCount > subBRightCount ? "lebih banyak dari" : subBLeftCount < subBRightCount ? "lebih sedikit dari" : "sama banyak dengan"} Kelompok B ({subBRightCount}).
                </div>
              </div>
            ) : null}
            {activeSubChapter === "C" ? (
              <div className="space-y-4 rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-black text-sky-950">Lompatan batu bersama Malosi</h3>
                    <p className="text-xs text-slate-600">Maju bertambah 1. Mundur berkurang 1.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { playSound("pop"); setSubCMode("mundur"); setSubCFrogPos((p) => Math.max(1, p - 1)); }} className="rounded-xl border-b-4 border-amber-700 bg-amber-500 px-3.5 py-2 text-xs font-black text-white">Mundur</button>
                    <button type="button" onClick={() => { playSound("pop"); setSubCMode("maju"); setSubCFrogPos((p) => Math.min(10, p + 1)); }} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-3.5 py-2 text-xs font-black text-white">Maju</button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 py-2 sm:grid-cols-10">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const num = idx + 1;
                    const diSini = subCFrogPos === num;
                    return (
                      <button key={num} type="button" onClick={() => { playSound("pop"); setSubCFrogPos(num); }} className={`flex h-16 flex-col items-center justify-center rounded-2xl border-b-4 font-black ${diSini ? "scale-105 border-emerald-700 bg-emerald-500 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                        <span>{diSini ? "🐸" : "🪨"}</span>
                        <span>{num}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-sky-300 bg-white p-3 text-center text-xs font-bold text-slate-700">
                  Menghitung {subCMode}. Katak ada di batu {subCFrogPos} ({NUMBER_WORDS[subCFrogPos]}).
                </div>
              </div>
            ) : null}
            {activeSubChapter === "D" ? (
              <div className="space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/60 p-4">
                <h3 className="text-base font-black text-purple-950">Pasangan bilangan bersama Tora</h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-purple-300 bg-white p-3">
                    <span className="text-xs font-bold">Utuh</span>
                    {[6, 7, 8, 9, 10].map((w) => (
                      <button key={w} type="button" onClick={() => { playSound("click"); setSubDWhole(w); setSubDLeftPart((bagian) => Math.min(bagian, w)); }} className={`h-8 w-8 rounded-lg text-xs font-black ${subDWhole === w ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"}`}>{w}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-purple-300 bg-white p-3">
                    <span className="text-xs font-bold">Bagian kiri</span>
                    <input type="range" min={0} max={subDWhole} value={subDLeftPart} onChange={(e) => setSubDLeftPart(Number(e.target.value))} className="accent-purple-600" />
                  </div>
                </div>
                <svg viewBox="0 0 320 140" className="mx-auto w-full max-w-sm">
                  <line x1="160" y1="38" x2="95" y2="102" stroke="#6b21a8" strokeWidth="4" />
                  <line x1="160" y1="38" x2="225" y2="102" stroke="#6b21a8" strokeWidth="4" />
                  <circle cx="160" cy="38" r="28" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="4" />
                  <text x="160" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#581c87">{subDWhole}</text>
                  <circle cx="95" cy="102" r="26" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                  <text x="95" y="109" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e3a8a">{subDLeftPart}</text>
                  <circle cx="225" cy="102" r="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                  <text x="225" y="109" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">{subDWhole - subDLeftPart}</text>
                </svg>
                <div className="rounded-2xl border border-purple-300 bg-white p-3 text-center text-sm font-black text-purple-950">
                  {subDWhole} diuraikan menjadi {subDLeftPart} dan {subDWhole - subDLeftPart}.
                </div>
              </div>
            ) : null}
            <div className="space-y-2 rounded-2xl border-b-4 border-slate-950 bg-slate-900 p-4 text-white">
              <div className="text-xs font-extrabold tracking-wider text-amber-400 uppercase">Poin penting</div>
              <div className="grid grid-cols-1 gap-2 text-xs text-slate-200 md:grid-cols-2">
                <div>Bingkai 10 punya 2 baris, masing-masing 5 kotak. Satu baris penuh ditambah 3 berarti 5 + 3 = 8.</div>
                <div>Nol dipakai ketika tidak ada benda sama sekali.</div>
                <div>Pasangkan benda satu per satu. Kelompok yang masih punya sisa lebih banyak.</div>
                <div>Pasangan 10: 1 dan 9, 2 dan 8, 3 dan 7, 4 dan 6, 5 dan 5.</div>
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-5 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div>
              <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 3 • Timbangan dan papan</span>
              <h2 className="text-lg font-black text-slate-900">Seimbangkan pasangan bilangan, lalu gambar di papan berpetak</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Timbangan pasangan bilangan</h3>
                <p className="text-xs text-slate-600">Jumlah balok merah dan biru di kanan harus sama dengan target di kiri.</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { judul: "Target", nilai: labTargetWhole, kurang: () => setLabTargetWhole((v) => Math.max(2, v - 1)), tambah: () => setLabTargetWhole((v) => Math.min(10, v + 1)), warna: "border-amber-300 text-amber-700" },
                    { judul: "Merah", nilai: labGroupRed, kurang: () => setLabGroupRed((v) => Math.max(0, v - 1)), tambah: () => setLabGroupRed((v) => Math.min(10, v + 1)), warna: "border-rose-300 text-rose-600" },
                    { judul: "Biru", nilai: labGroupBlue, kurang: () => setLabGroupBlue((v) => Math.max(0, v - 1)), tambah: () => setLabGroupBlue((v) => Math.min(10, v + 1)), warna: "border-blue-300 text-blue-600" },
                  ].map((kotak) => (
                    <div key={kotak.judul} className={`rounded-xl border bg-white p-2.5 text-center ${kotak.warna}`}>
                      <div className="font-bold text-slate-600">{kotak.judul}</div>
                      <div className="text-xl font-black">{kotak.nilai}</div>
                      <div className="mt-1 flex justify-center gap-1">
                        <button type="button" onClick={kotak.kurang} className="rounded bg-slate-200 px-2 py-0.5 font-bold">-</button>
                        <button type="button" onClick={kotak.tambah} className="rounded bg-slate-800 px-2 py-0.5 font-bold text-white">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 340 150" className="w-full rounded-2xl border border-sky-200 bg-white">
                  <polygon points="170,75 145,135 195,135" fill="#475569" />
                  <g transform={`rotate(${miring}, 170, 75)`}>
                    <rect x="45" y="70" width="250" height="8" rx="4" fill="#0f172a" />
                    <rect x="55" y="36" width="65" height="34" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                    <text x="87" y="59" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#713f12">{labTargetWhole}</text>
                    <rect x="215" y="36" width="75" height="34" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                    <text x="252" y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{labGroupRed}+{labGroupBlue}={kananLab}</text>
                  </g>
                </svg>
                <div className={`rounded-xl p-2.5 text-center text-xs font-black ${timbanganSeimbang ? "border border-emerald-400 bg-emerald-100 text-emerald-900" : "border border-amber-400 bg-amber-100 text-amber-900"}`}>
                  {timbanganSeimbang ? `Seimbang. ${labTargetWhole} = ${labGroupRed} + ${labGroupBlue}` : `Belum seimbang. Kiri ${labTargetWhole}, kanan ${kananLab}.`}
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-amber-950">Papan berpetak</h3>
                  <span className="rounded-full border border-amber-300 bg-white px-2.5 py-0.5 text-[11px] font-bold">Goresan: {canvasStrokeCount}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { symbol: "🍎", label: "Apel" },
                    { symbol: "⭐", label: "Bintang" },
                    { symbol: "🦉", label: "IGIL" },
                    { symbol: "🔟", label: "Bingkai" },
                  ].map((st) => (
                    <button key={st.label} type="button" onClick={() => addCanvasStamp(st.symbol, st.label)} className="rounded-xl border-b-2 border-amber-400 bg-white px-2.5 py-1.5 text-xs font-bold">{st.symbol} {st.label}</button>
                  ))}
                  {[
                    { hex: "#2563eb", name: "Biru" },
                    { hex: "#dc2626", name: "Merah" },
                    { hex: "#16a34a", name: "Hijau" },
                  ].map((c) => (
                    <button key={c.hex} type="button" onClick={() => setBrushColor(c.hex)} className={`h-6 w-6 rounded-full border-2 ${brushColor === c.hex ? "scale-110 border-slate-950" : "border-white"}`} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                  <button type="button" onClick={clearSmartCanvas} className="ml-auto rounded-xl border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-800">Bersihkan</button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={210}
                  onPointerDown={startCanvasDrawing}
                  onPointerMove={moveCanvasDrawing}
                  onPointerUp={stopCanvasDrawing}
                  onPointerLeave={stopCanvasDrawing}
                  className="h-48 w-full cursor-crosshair touch-none rounded-2xl border-2 border-amber-300 bg-white"
                />
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 4 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-extrabold text-sky-700 uppercase">Kartu 4 • 10 latihan, +3 token tiap benar</span>
                <h2 className="text-lg font-black text-slate-900">Latihan membilang</h2>
              </div>
              <div className="rounded-2xl border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-black text-amber-950">Token latihan: {practiceTokens} / 30</div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = practiceAnswers[q.id];
                const benar = ans === q.correctAnswer;
                return (
                  <button key={q.id} type="button" onClick={() => { playSound("click"); setCurrentPracticeIdx(idx); }} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentPracticeIdx === idx ? "border-sky-800 bg-sky-600 text-white" : ans ? (benar ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900") : "border-slate-300 bg-slate-100 text-slate-700"}`}>{idx + 1}</button>
                );
              })}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">Soal {soalLatihan.id} dari 10 • {soalLatihan.storyCharacter}</span>
                <button type="button" onClick={() => speakIGIL(soalLatihan.prompt)} className="rounded-xl border border-sky-300 bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">Bacakan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalLatihan.prompt}</p>
              {renderQuestionVisual(soalLatihan.visualType, soalLatihan.visualParamA, soalLatihan.visualParamB)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalLatihan.options.map((opt) => (
                  <button key={opt} type="button" onClick={() => handleSelectPracticeAnswer(soalLatihan, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${jawabanLatihan === opt ? (opt === soalLatihan.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : "border-rose-700 bg-rose-500 text-white") : "border-slate-300 bg-white text-slate-800"}`}>{opt}</button>
                ))}
              </div>
              {jawabanLatihan ? (
                <div className={`space-y-1 rounded-2xl border-2 p-3.5 text-xs ${latihanBenar ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                  <div className="text-sm font-black">{latihanBenar ? "Benar. +3 token, sekali untuk soal ini." : "Belum tepat. Baca pembahasan ini."}</div>
                  <p>{soalLatihan.explanation}</p>
                </div>
              ) : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentPracticeIdx === 0} onClick={() => setCurrentPracticeIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40">Sebelumnya</button>
                {currentPracticeIdx < PRACTICE_QUESTIONS.length - 1 ? (
                  <button type="button" onClick={() => setCurrentPracticeIdx((i) => Math.min(PRACTICE_QUESTIONS.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button>
                ) : card5Unlocked ? (
                  <button type="button" onClick={() => { playSound("fanfare"); setExamStartTime(Date.now()); setExamElapsedDeci(0); setActiveCard(5); }} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Buka ujian</button>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 5 ? (
          <section className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-3.5 text-white">
              <div>
                <span className="text-[11px] font-extrabold text-amber-400 uppercase">Gerbang 1 • wajib 100 untuk membuka praktikum</span>
                <h2 className="text-base font-black">Ujian 10 soal, angka berubah tiap ulang</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-bold">Percobaan {examAttempts}</span>
                <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono font-bold text-sky-300">{formatStopwatch(examElapsedDeci)}</span>
                <span className={`rounded-xl border px-3 py-1.5 font-bold ${focusLossCount === 0 ? "border-emerald-700 bg-emerald-950 text-emerald-300" : "border-rose-600 bg-rose-950 text-rose-300"}`}>Pindah layar: {focusLossCount}</span>
              </div>
            </div>
            {focusLossCount > 0 ? <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-xs font-bold text-amber-950">Layar berpindah {focusLossCount} kali. Tetap di halaman ini saat mengerjakan.</div> : null}
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {examQuestions.map((q, idx) => (
                <button key={q.id} type="button" onClick={() => setCurrentExamIdx(idx)} className={`rounded-xl border-b-4 py-2 text-xs font-black ${currentExamIdx === idx ? "border-amber-600 bg-amber-400 text-slate-950" : examAnswers[q.id] ? "border-sky-400 bg-sky-100 text-sky-900" : "border-slate-300 bg-slate-100 text-slate-600"}`}>{idx + 1}</button>
              ))}
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black text-white">Soal {soalUjian.id}</span>
                <button type="button" onClick={() => speakIGIL(soalUjian.questionText)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-bold">Dengarkan soal</button>
              </div>
              <p className="text-sm font-extrabold text-slate-900 md:text-base">{soalUjian.questionText}</p>
              {renderQuestionVisual(soalUjian.visualType, soalUjian.paramA, soalUjian.paramB)}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {soalUjian.options.map((opt) => {
                  const dipilih = jawabanUjian === opt;
                  return (
                    <button key={opt} type="button" onClick={() => handleSelectExamAnswer(soalUjian.id, opt)} className={`rounded-2xl border-b-4 px-4 py-3 text-base font-black ${examSubmitted ? (opt === soalUjian.correctAnswer ? "border-emerald-700 bg-emerald-500 text-white" : dipilih ? "border-rose-700 bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-500") : dipilih ? "border-sky-800 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-800"}`}>{opt}</button>
                  );
                })}
              </div>
              {examSubmitted ? <div className="rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-700"><strong>Pembahasan: </strong>{soalUjian.explanation}</div> : null}
              <div className="flex items-center justify-between pt-2">
                <button type="button" disabled={currentExamIdx === 0} onClick={() => setCurrentExamIdx((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40">Sebelumnya</button>
                {currentExamIdx < examQuestions.length - 1 ? (
                  <button type="button" onClick={() => setCurrentExamIdx((i) => Math.min(examQuestions.length - 1, i + 1))} className="rounded-xl border-b-4 border-sky-800 bg-sky-600 px-4 py-2 text-xs font-black text-white">Berikutnya</button>
                ) : !examSubmitted ? (
                  <button type="button" onClick={handleSubmitExam} className="rounded-xl border-b-4 border-emerald-800 bg-emerald-600 px-5 py-2.5 text-xs font-black text-white">Kumpulkan</button>
                ) : null}
              </div>
            </div>
            {examSubmitted ? (
              <div className={`space-y-3 rounded-2xl border-2 p-4 ${examScore === 100 && !dwellTimeWarning ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-950"}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-black">
                      {dwellTimeWarning ? "Pengerjaan di bawah 25 detik. Ulangi dengan membaca soal." : examScore === 100 ? "Nilai 100. Praktikum terbuka." : `Nilai ${examScore}/100. Ujian perlu 100 untuk membuka praktikum.`}
                    </h3>
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
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950">Gerbang 2 • skor 0–1.000</span>
                  <h2 className="mt-1 text-lg font-black">Rancang Taman Belajar Bilangan 10</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("single"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "single" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Bab ini saja</button>
                  <button type="button" onClick={() => { playSound("click"); setPracticumMode("cross4"); }} className={`rounded-xl border-b-2 px-3 py-1.5 text-xs font-black ${practicumMode === "cross4" ? "border-amber-600 bg-amber-400 text-slate-950" : "border-white/20 bg-white/10 text-white"}`}>Lintas bab</button>
                </div>
              </div>
              {practicumMode === "cross4" ? (
                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2.5"><div className="font-black text-amber-300">1. Matematika</div><p className="text-[11px] text-emerald-100">Pasangan 10, Bingkai 10, dan sama banyak.</p></div>
                  {completedOtherChapters.slice(0, 3).map((ch, idx) => (
                    <div key={ch.chapterId} className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                      <div className="font-black text-amber-300">{idx + 2}. {ch.subject}</div>
                      <p className="text-[11px] text-emerald-100">{ch.practicumSynthesisHook}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-100">Susun taman supaya tanaman berjumlah 10 dan fasilitas sama banyak.</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
                <h3 className="text-sm font-black text-emerald-950">Atur taman</h3>
                <ul className="space-y-1 rounded-xl border border-emerald-200 bg-white p-3 text-xs text-slate-700">
                  <li>Bunga ditambah pohon peneduh harus 10.</li>
                  <li>Bangku dan tempat sampah sama banyak, 5 dan 5.</li>
                </ul>
                {[
                  { label: "Bunga", nilai: gardenFlowers, set: setGardenFlowers, min: 0, max: 10 },
                  { label: "Pohon", nilai: gardenTrees, set: setGardenTrees, min: 0, max: 10 },
                  { label: "Bangku", nilai: gardenBenches, set: setGardenBenches, min: 1, max: 8 },
                  { label: "Tempat sampah", nilai: gardenTrashBins, set: setGardenTrashBins, min: 1, max: 8 },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
                    <span className="font-bold">{bar.label}: {bar.nilai}</span>
                    <input type="range" min={bar.min} max={bar.max} value={bar.nilai} onChange={(e) => bar.set(Number(e.target.value))} className="accent-emerald-600" />
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
                  <span className="font-bold">Urutan batu</span>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => setSteppingStonesOrder("maju")} className={`rounded-lg px-2.5 py-1 font-bold ${steppingStonesOrder === "maju" ? "bg-sky-600 text-white" : "bg-slate-100"}`}>Maju</button>
                    <button type="button" onClick={() => setSteppingStonesOrder("mundur")} className={`rounded-lg px-2.5 py-1 font-bold ${steppingStonesOrder === "mundur" ? "bg-sky-600 text-white" : "bg-slate-100"}`}>Mundur</button>
                  </div>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
                <h3 className="text-sm font-black text-sky-950">Denah taman</h3>
                <svg viewBox="0 0 360 210" className="w-full rounded-2xl border-2 border-emerald-400 bg-emerald-100">
                  <text x="15" y="22" fontSize="11" fontWeight="bold" fill="#065f46">Tanaman {gardenFlowers} bunga + {gardenTrees} pohon = {gardenFlowers + gardenTrees}</text>
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const col = idx % 5;
                    const row = Math.floor(idx / 5);
                    const x = 15 + col * 65;
                    const y = 30 + row * 42;
                    const bunga = idx < gardenFlowers;
                    const pohon = !bunga && idx < gardenFlowers + gardenTrees;
                    return (
                      <g key={idx}>
                        <rect x={x} y={y} width="60" height="38" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
                        <text x={x + 30} y={y + 25} textAnchor="middle" fontSize="18">{bunga ? "🌻" : pohon ? "🌳" : ""}</text>
                      </g>
                    );
                  })}
                  <text x="15" y="135" fontSize="11" fontWeight="bold" fill="#1e3a8a">Fasilitas {gardenBenches} bangku dan {gardenTrashBins} tempat sampah</text>
                  {Array.from({ length: Math.max(gardenBenches, gardenTrashBins) }).map((_, i) => (
                    <g key={i}>
                      {i < gardenBenches ? <text x={28 + i * 38} y="158" textAnchor="middle" fontSize="16">🪑</text> : null}
                      {i < gardenTrashBins ? <text x={28 + i * 38} y="185" textAnchor="middle" fontSize="16">🗑️</text> : null}
                    </g>
                  ))}
                </svg>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`rounded-xl border p-2 text-center font-bold ${gardenFlowers + gardenTrees === 10 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>Tanaman {gardenFlowers + gardenTrees}{gardenFlowers + gardenTrees === 10 ? " pas 10" : ", target 10"}</div>
                  <div className={`rounded-xl border p-2 text-center font-bold ${gardenBenches === 5 && gardenTrashBins === 5 ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-amber-400 bg-amber-100 text-amber-900"}`}>{gardenBenches} dan {gardenTrashBins}{gardenBenches === 5 && gardenTrashBins === 5 ? " sama banyak" : ", target 5 dan 5"}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-black text-amber-950">Laporan taman</h3>
                  <p className="text-xs text-slate-600">Ceritakan pasangan tanaman dan mengapa bangku sama banyak dengan tempat sampah.</p>
                </div>
                <button type="button" onClick={fillGuidedReportTemplate} className="shrink-0 rounded-xl border-b-4 border-amber-600 bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950">Bantu susun kalimat</button>
              </div>
              <textarea rows={3} value={studentReportText} onChange={(e) => setStudentReportText(e.target.value)} placeholder="Saya menanam 6 bunga dan 4 pohon sehingga jumlahnya 10. Bangku dan tempat sampah masing-masing 5 agar sama banyak." className="w-full rounded-xl border-2 border-amber-300 bg-white p-3 text-xs font-medium select-text focus:border-sky-600 focus:outline-none md:text-sm" />
              <button type="button" onClick={handleEvaluatePracticum} className="w-full rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 py-3 text-sm font-black text-white active:translate-y-0.5 active:border-b-0">Hitung skor karya di perangkat ini</button>
            </div>
            {practicumRubric ? (
              <div className="space-y-4 rounded-3xl border-b-4 border-slate-950 bg-slate-900 p-5 text-white">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-700 pb-3 md:flex-row md:items-center">
                  <div>
                    <span className="text-xs font-extrabold text-amber-400 uppercase">Hasil karya</span>
                    <h3 className="text-lg font-black">{studentName} • {CHAPTER_COMPETENCY_METADATA.chapterId}</h3>
                  </div>
                  <div className="rounded-2xl bg-amber-400 px-4 py-2 text-center text-slate-950">
                    <div className="text-[10px] font-black uppercase">Skor</div>
                    <div className="text-2xl font-black">{practicumRubric.totalQualityScore} / 1.000</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Akurasi</div><div className="mt-1 text-xl font-black text-emerald-400">{practicumRubric.accuracyScore} / 300</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Sintesis</div><div className="mt-1 text-xl font-black text-sky-400">{practicumRubric.synthesisScore} / 250</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Desain</div><div className="mt-1 text-xl font-black text-amber-400">{practicumRubric.optimizationVisualScore} / 200</div></div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3"><div className="font-bold text-slate-400">Laporan</div><div className="mt-1 text-xl font-black text-purple-400">{practicumRubric.reasoningReportScore} / 250</div></div>
                </div>
                <div className="space-y-1 rounded-2xl border border-slate-700 bg-slate-800/90 p-3.5 text-xs text-slate-200">
                  <p>{practicumRubric.aiFeedbackSummary}</p>
                  {chapterCompletedFlag ? <p className="pt-1 font-bold text-emerald-300">Bab ini tercatat di perangkat. Token bab: {totalTokens} / 150.</p> : null}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
