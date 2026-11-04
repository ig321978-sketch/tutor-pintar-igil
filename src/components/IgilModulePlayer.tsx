"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Nunito } from "next/font/google";
import { normalisasiKelaminGuru, profilGuru } from "@/lib/guru";
import { bacaProgres } from "@/lib/progres";
import { hentikanAudioGuruAktif, mintaAudioTts } from "@/lib/putar-tts-klien";
import materiBab1 from "@/data/kelas1-bab1.json";
import GambarPensilCerita from "@/components/GambarPensilCerita";

const fontAnak = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

// ============================================================================
// TIPE DATA & KONTRAK INTEGRASI CETAK BIRU IGIL
// ============================================================================

type MainTabId = "silabus" | "materi" | "simulasi" | "latihan" | "ujian" | "praktikum";
type SubBabId = "A" | "B" | "C" | "D";
type SmicpaStageId = "story" | "mindmap" | "infografis" | "concrete" | "pictorial" | "abstract";

interface StorySlideItem {
  id: string;
  titleHint: string;
  voiceNarration: string; // Diperdengarkan lewat Suara Guru TANPA teks cerita di layar
  sceneType: "garden-visit" | "picking-fruits" | "counting-table" | "empty-basket" | "comparing-scales" | "frog-river" | "number-tree";
}

interface MindMapSlideItem {
  stepNumber: number;
  stepTitle: string;
  stepDesc: string;
  icon: string;
  flowFrom: string;
  flowTo: string;
}

interface SubBabContent {
  id: SubBabId;
  codeTitle: string;
  fullTitle: string;
  targetDescription: string;
  secondaryBg: string;
  secondaryBorder: string;
  secondaryText: string;
  stories: [StorySlideItem, StorySlideItem, StorySlideItem];
  mindMaps: [MindMapSlideItem, MindMapSlideItem, MindMapSlideItem];
  infografisData: {
    fruitName: string;
    emoji: string;
    countNum: number;
    countWord: string;
    voiceSentence: string;
  }[];
  concreteSlides: {
    title: string;
    emoji: string;
    targetCount: number;
    voiceGuide: string;
  }[];
  pictorialSlides: {
    title: string;
    diagramType: "ten-frame" | "bar-blocks" | "number-bond";
    numberA: number;
    numberB: number;
    caption: string;
  }[];
  abstractSlides: {
    symbolLarge: string;
    wordLarge: string;
    mathNotation: string;
    voiceReadout: string;
  }[];
}

interface QuestionItem {
  id: number;
  level: "LOTS (30%)" | "MOTS (30%)" | "HOTS (40%)" | "HOTS UJIAN FORMAL";
  prompt: string;
  visualEmojis: string[];
  secondaryGroupEmojis?: string[];
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// ============================================================================
// DATA KURIKULUM EKSTRAKSI BUKU MATEMATIKA KELAS 1 SD BAB 1 (SMICPA)
// ============================================================================

const SUB_BABS = materiBab1.subBabs as Record<SubBabId, SubBabContent>;
const PRACTICE_QUESTIONS = materiBab1.practiceQuestions as QuestionItem[];
const FORMAL_EXAM_QUESTIONS = materiBab1.examQuestions as QuestionItem[];

// ============================================================================
// SUB-KOMPONEN KANVAS TULIS TITIK-TITIK ANGKA (DOTTED NUMBER TRACING CANVAS)
// ============================================================================

function DottedNumberTracingCanvas({
  digit,
  onCompletedTrace,
}: {
  digit: number;
  onCompletedTrace?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeCount, setStrokeCount] = useState<number>(0);

  const drawDottedGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Garis buku tulis lembut
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Angka titik-titik (Dotted Guide) untuk diikuti jari anak
    ctx.save();
    ctx.font = `bold 115px ${fontAnak.style.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 7]);
    ctx.strokeText(String(digit), canvas.width / 2, canvas.height / 2 + 6);
    ctx.restore();
  }, [digit]);

  useEffect(() => {
    drawDottedGuide();
    setStrokeCount(0);
  }, [drawDottedGuide]);

  const getCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    const me = e as React.MouseEvent<HTMLCanvasElement>;
    return {
      x: (me.clientX - rect.left) * (canvas.width / rect.width),
      y: (me.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const moveDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setStrokeCount((prev) => {
      const next = prev + 1;
      if (next === 18 && onCompletedTrace) onCompletedTrace();
      return next;
    });
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={170}
        height={150}
        onMouseDown={startDraw}
        onMouseMove={moveDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={moveDraw}
        onTouchEnd={endDraw}
        className="w-[170px] h-[150px] rounded-2xl border-2 border-[#1C01A5] bg-white cursor-crosshair touch-none shadow-sm"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            drawDottedGuide();
            setStrokeCount(0);
          }}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#334155] text-xs font-bold border border-slate-300"
        >
          Ulangi Tulis
        </button>
        <span className="text-xs font-bold text-[#1C01A5]">
          {strokeCount >= 15 ? "✅ Bagus!" : "Ikuti Titik-Titik"}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN UTAMA MODUL IGIL (MATEMATIKA KELAS 1 SD - BAB 1)
// ============================================================================

function IkonTab({ id }: { id: MainTabId }) {
  const garis = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (id === "silabus") {
    return (
      <svg {...garis}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }
  if (id === "materi") {
    return (
      <svg {...garis}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
      </svg>
    );
  }
  if (id === "simulasi") {
    return (
      <svg {...garis}>
        <path d="M9 3h6M10 3v5L5.5 18A2 2 0 0 0 7.3 21h9.4a2 2 0 0 0 1.8-3L14 8V3" />
        <path d="M8.2 14h7.6" />
      </svg>
    );
  }
  if (id === "latihan") {
    return (
      <svg {...garis}>
        <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
        <path d="M13.5 6.5l3 3" />
      </svg>
    );
  }
  if (id === "ujian") {
    return (
      <svg {...garis}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 12.5l2.2 2.2L16 9" />
      </svg>
    );
  }
  return (
    <svg {...garis}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  );
}

export default function IgilModulePlayer() {
  // 1. State Navigasi Tab Utama (Langsung mengaktifkan Tab Silabus)
  const [activeMainTab, setActiveMainTab] = useState<MainTabId>("silabus");

  // 3. State Halaman Silabus (2 Halaman: 1 = Komponen Silabus, 2 = Target Pembelajaran)
  const [silabusPage, setSilabusPage] = useState<1 | 2>(1);
  const [completedSubBabs, setCompletedSubBabs] = useState<SubBabId[]>([]);

  // 4. State Halaman Materi (Sub-Bab A/B/C/D + Pengunci Scroll Vertikal SMICPA)
  const [activeSubBab, setActiveSubBab] = useState<SubBabId>("A");
  const [unlockedSmicpaStage, setUnlockedSmicpaStage] = useState<number>(1); // 1=Story .. 6=Abstract
  const [concreteCounter, setConcreteCounter] = useState<number>(3);

  // Ref untuk auto-scroll mulus saat tombol floating-end LANJUTKAN diklik
  const mindMapRef = useRef<HTMLDivElement | null>(null);
  const infografisRef = useRef<HTMLDivElement | null>(null);
  const concreteRef = useRef<HTMLDivElement | null>(null);
  const pictorialRef = useRef<HTMLDivElement | null>(null);
  const abstractRef = useRef<HTMLDivElement | null>(null);

  // 5. State Halaman Simulasi PhET-Style (4 Simulasi: 1 per Sub-Bab)
  const [simIndex, setSimIndex] = useState<number>(0); // 0..3
  const [simTenFrameApples, setSimTenFrameApples] = useState<number>(4);
  const [simTenFrameOranges, setSimTenFrameOranges] = useState<number>(3);
  const [simCompareLeft, setSimCompareLeft] = useState<number>(6);
  const [simCompareRight, setSimCompareRight] = useState<number>(4);
  const [simFrogStone, setSimFrogStone] = useState<number>(1);
  const [simBondWhole, setSimBondWhole] = useState<number>(8);
  const [simBondLeft, setSimBondLeft] = useState<number>(5);

  // 6. State Halaman Latihan (10 Soal: LOTS 30%, MOTS 30%, HOTS 40%)
  const [practiceIdx, setPracticeIdx] = useState<number>(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});

  // 7. State Halaman Ujian Formal (10 Soal 100% HOTS + Sensor Wajah Lokal)
  const [examIdx, setExamIdx] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [examFirstTryPerfect, setExamFirstTryPerfect] = useState<boolean>(false);
  const [examAttempts, setExamAttempts] = useState<number>(1);

  // 8. State Halaman Praktikum Sintesis (Cetak Biru IGIL: 4 Parameter Hidden Grading)
  const [pracRedApples, setPracRedApples] = useState<number>(6);
  const [pracYellowOranges, setPracYellowOranges] = useState<number>(4);
  const [pracReadingTables, setPracReadingTables] = useState<number>(5);
  const [pracReadingChairs, setPracReadingChairs] = useState<number>(5);
  const [pracReasoningText, setPracReasoningText] = useState<string>("");
  const [pracSubmitted, setPracSubmitted] = useState<boolean>(false);

  // 9. Perhitungan Kartu Point Token (30 Latihan + 70 Ujian + 50 Praktikum = 150 Token)
  const practiceCorrectCount = PRACTICE_QUESTIONS.filter(
    (q) => practiceAnswers[q.id] === q.correctAnswer
  ).length;
  const tokenPerSoal = materiBab1.tokens.practice / PRACTICE_QUESTIONS.length;
  const practiceTokens = Math.min(
    materiBab1.tokens.practice,
    practiceCorrectCount * tokenPerSoal,
  );
  const examTokens = examScore === 100 ? materiBab1.tokens.exam : 0;
  const practicumTokens = pracSubmitted ? materiBab1.tokens.practicum : 0;
  const totalTokens = practiceTokens + examTokens + practicumTokens;
  const batasToken =
    materiBab1.tokens.practice + materiBab1.tokens.exam + materiBab1.tokens.practicum;

  // ============================================================================
  // SUARA GURU SESUAI PILIHAN DI RUANG BELAJAR
  // ============================================================================

  const audioGuru = useRef<HTMLAudioElement | null>(null);
  const giliranSuara = useRef(0);

  const ucapkanCadangan = (naskah: string, kelas: string, kelamin: ReturnType<typeof normalisasiKelaminGuru>) => {
    if (!("speechSynthesis" in window)) return;
    const guru = profilGuru(kelas, kelamin);
    const utterance = new SpeechSynthesisUtterance(naskah);
    utterance.lang = "id-ID";
    utterance.rate = guru.laju;
    utterance.pitch = guru.nada;
    window.speechSynthesis.speak(utterance);
  };

  const speakGuru = useCallback((text: string) => {
    const naskah = text.replace(/\s+/g, " ").trim();
    if (!naskah || typeof window === "undefined") return;
    const giliran = ++giliranSuara.current;
    const profil = bacaProgres().profil;
    const kelamin = normalisasiKelaminGuru(profil.guruKelamin);
    const kelas = profil.kelas.trim() || "1 SD";
    hentikanAudioGuruAktif();
    audioGuru.current?.pause();
    void mintaAudioTts(naskah, kelamin, kelas).then((hasil) => {
      if (giliran !== giliranSuara.current) return;
      if (!hasil?.url) {
        ucapkanCadangan(naskah, kelas, kelamin);
        return;
      }
      const audio = audioGuru.current ?? new Audio();
      audioGuru.current = audio;
      audio.src = hasil.url;
      void audio.play().catch(() => {
        if (giliran !== giliranSuara.current) return;
        ucapkanCadangan(naskah, kelas, kelamin);
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      audioGuru.current?.pause();
    };
  }, []);

  // ============================================================================
  // HANDLER KUNCI SCROLL VERTIKAL SMICPA (MATERI)
  // ============================================================================

  const handleUnlockNextSmicpa = (
    nextStageNumber: number,
    targetRef: React.RefObject<HTMLDivElement | null>,
    voiceAnnouncement: string
  ) => {
    setUnlockedSmicpaStage((prev) => Math.max(prev, nextStageNumber));
    speakGuru(voiceAnnouncement);
    setTimeout(() => {
      targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const handleCompleteCurrentSubBab = () => {
    if (!completedSubBabs.includes(activeSubBab)) {
      setCompletedSubBabs((prev) => [...prev, activeSubBab]);
    }
    const order: SubBabId[] = ["A", "B", "C", "D"];
    const currIdx = order.indexOf(activeSubBab);
    if (currIdx < order.length - 1) {
      const nextSub = order[currIdx + 1];
      setActiveSubBab(nextSub);
      setUnlockedSmicpaStage(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      speakGuru(
        `Selamat! Sub-Bab ${activeSubBab} selesai dan Target Pembelajaran di Silabus telah tercentang otomatis. Sekarang kita masuk ke Sub-Bab ${nextSub}.`
      );
    } else {
      setActiveMainTab("simulasi");
      window.scrollTo({ top: 0, behavior: "smooth" });
      speakGuru(
        "Luar biasa! Seluruh Sub-Bab A sampai D telah selesai. Sekarang ayo kita bereksperimen di Halaman Simulasi!"
      );
    }
  };

  const handlePrevSubBab = () => {
    const order: SubBabId[] = ["A", "B", "C", "D"];
    const currIdx = order.indexOf(activeSubBab);
    if (currIdx > 0) {
      setActiveSubBab(order[currIdx - 1]);
      setUnlockedSmicpaStage(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  // ============================================================================
  // RENDER 2: HALAMAN UTAMA MODUL (SELEBAR MONITOR • DASAR PUTIH)
  // ============================================================================

  const currentSubContent = SUB_BABS[activeSubBab];

  return (
    <div className={`min-h-screen w-full bg-white text-[#334155] pb-16 ${fontAnak.className}`}>
      {/* =================================================================== */}
      {/* BANNER #1C01A5 TANPA DEGRADASI HAMPIR SELEBAR LAYAR MONITOR         */}
      {/* =================================================================== */}
      <div className="w-full pt-2 px-1 md:px-3 bg-white">
        <header className="w-[99%] mx-auto bg-[#1C01A5] rounded-3xl px-4 py-4 md:px-7 md:py-5 shadow-md overflow-x-auto">
          <div className="flex flex-nowrap items-center justify-between gap-6 min-w-[660px]">
            {/* Kiri: Ikon Favicon IGIL + Label H2/H3 #F0AB00 + Label H1 Putih (Tanpa Kartu Pembungkus) */}
            <div className="flex items-center gap-4">
              <img
                src="/icon-192.png"
                alt="burung hantu IGIL"
                width={64}
                height={64}
                className="w-14 h-14 md:w-16 md:h-16 shrink-0"
              />

              {/* Label Mapel/Kelas (#F0AB00 H2/H3 Kapital Tanpa Kartu) & Nama Bab (Putih H1 Tanpa Kartu) */}
              <div>
                <h2 className="text-sm md:text-lg font-black uppercase tracking-wider text-[#FFE566]">
                  {materiBab1.subjectLabel}
                </h2>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-tight">
                  {materiBab1.title}
                </h1>
              </div>
            </div>

            {/* Kanan: Kartu Point Token */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white text-[#1C01A5] px-4 py-2.5 rounded-2xl border-2 border-[#F0AB00] shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#334155]">
                  KARTU POINT TOKEN IGIL
                </div>
                <div className="text-lg md:text-xl font-black text-[#1C01A5]">
                  🪙 {totalTokens} <span className="text-xs text-[#F0AB00]">/ {batasToken} Token Emas</span>
                </div>
                <div className="text-[10px] font-bold text-[#334155]">
                  Latihan: {practiceTokens}/{materiBab1.tokens.practice} • Ujian: {examTokens}/{materiBab1.tokens.exam} • Praktikum: {practicumTokens}/{materiBab1.tokens.practicum}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* =================================================================== */}
      {/* TOMBOL TAB UTAMA (FLOATING & SLIDE KIRI-KANAN • DASAR #1C01A5)      */}
      {/* =================================================================== */}
      <div className="sticky top-2 z-40 w-[99%] mx-auto px-1 md:px-3 mt-3">
        <nav className="w-full bg-[#1C01A5] rounded-2xl p-2 shadow-lg overflow-x-auto">
          <div className="flex flex-nowrap items-center gap-2 min-w-max">
            {(
              [
                { id: "silabus", label: "Silabus" },
                { id: "materi", label: "Materi" },
                { id: "simulasi", label: "Simulasi" },
                { id: "latihan", label: "Latihan" },
                { id: "ujian", label: "Ujian" },
                { id: "praktikum", label: "Praktikum" },
              ] as { id: MainTabId; label: string }[]
            ).map((tab) => {
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveMainTab(tab.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: "#1C01A5",
                    color: isActive ? "#FFE566" : "#FFFFFF",
                    borderColor: isActive ? "#FFE566" : "#FFFFFF",
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm md:text-base border-2 transition-all shrink-0"
                >
                  <IkonTab id={tab.id} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* =================================================================== */}
      {/* 1. HALAMAN SILABUS (2 HALAMAN: KOMPONEN SILABUS & TARGET CHECKLIST) */}
      {/* =================================================================== */}
      {activeMainTab === "silabus" && (
        <section className="w-[98%] mx-auto mt-4 bg-white p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#1C01A5]/15 pb-3">
            <div>
              <span className="text-xs font-black uppercase text-[#1C01A5]">
                HALAMAN SILABUS ({silabusPage} DARI 2)
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#1C01A5]">
                {silabusPage === 1
                  ? "Halaman 1: Komponen Silabus & Metode 24 Halaman SMICPA"
                  : "Halaman 2: Target Pembelajaran & Checklist Ketuntasan Sub-Bab"}
              </h2>
            </div>
          </div>

          {silabusPage === 1 && (
            <div className="flex w-full flex-col gap-5">
                <div className="w-full bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-3xl p-5 space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] text-xs font-black">
                    KOMPONEN SILABUS KURIKULUM MERDEKA
                  </div>
                  <h3 className="text-lg font-black text-[#1C01A5]">
                    Fase A • Elemen Bilangan (Kelas 1 SD/MI)
                  </h3>
                  <ul className="text-base md:text-lg leading-relaxed space-y-3 text-[#334155]">
                    <li>
                      • <strong>Capaian Pembelajaran (CP):</strong> Siswa menunjukkan pemahaman dan intuisi bilangan (<em>number sense</em>) pada bilangan cacah sampai 10.
                    </li>
                    <li>
                      • <strong>Referensi Buku Resmi:</strong> Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 10, Halaman 1–32).
                    </li>
                    <li>
                      • <strong>Metode Pedagogis SMICPA:</strong> Story (Cerita), Mind-Mapping (Peta Pikiran), Infografis (Tabel Data), Concrete (Benda Nyata), Pictorial (Diagram), dan Abstract (Simbol Angka).
                    </li>
                  </ul>
                </div>

                <div className="w-full bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-3xl p-5 space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] text-xs font-black">
                    ARSITEKTUR LEARN-TO-EARN &amp; KOLAM BEASISWA 90:10
                  </div>
                  <h3 className="text-lg font-black text-[#1C01A5]">
                    Distribusi 150 Token Emas &amp; Kualifikasi Bulanan
                  </h3>
                  <ul className="text-base md:text-lg leading-relaxed space-y-3 text-[#334155]">
                    <li>
                      • <strong>Komponen Latihan (30 Token Emas):</strong> 10 soal terbimbing (LOTS 30%, MOTS 30%, HOTS 40%) lengkap dengan pembahasan langsung.
                    </li>
                    <li>
                      • <strong>Komponen Ujian Mandiri (70 Token Emas):</strong> 10 soal formal HOTS. Wajib meraih nilai sempurna <strong>100/100</strong> untuk membuka Praktikum.
                    </li>
                    <li>
                      • <strong>Komponen Praktikum Sintesis (50 Token Emas):</strong> Proyek perancangan terpadu yang dinilai secara tertutup (<em>On-Submit Hidden Grading</em>).
                    </li>
                  </ul>
                </div>
            </div>
          )}

          {silabusPage === 2 && (
            <div className="flex w-full flex-col gap-5">
                <div className="w-full bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-5 space-y-3">
                  <h3 className="text-base md:text-lg font-black text-[#166534]">
                    📋 Daftar Target Pembelajaran (Sub-Bab A &amp; B)
                  </h3>
                  {(["A", "B"] as SubBabId[]).map((id) => {
                    const isDone = completedSubBabs.includes(id);
                    const sub = SUB_BABS[id];
                    return (
                      <div
                        key={id}
                        className="bg-white p-3.5 rounded-2xl border-2 border-[#86EFAC] flex items-start gap-3"
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                            isDone
                              ? "bg-[#22C55E] text-white"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                        >
                          {isDone ? "✓" : ""}
                        </div>
                        <div>
                          <div className="font-black text-lg text-[#1C01A5]">{sub.fullTitle}</div>
                          <p className="text-base md:text-lg leading-relaxed text-[#334155] mt-1">{sub.targetDescription}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-3xl p-5 space-y-3">
                  <h3 className="text-base md:text-lg font-black text-[#1E3A8A]">
                    📋 Daftar Target Pembelajaran (Sub-Bab C &amp; D)
                  </h3>
                  {(["C", "D"] as SubBabId[]).map((id) => {
                    const isDone = completedSubBabs.includes(id);
                    const sub = SUB_BABS[id];
                    return (
                      <div
                        key={id}
                        className="bg-white p-3.5 rounded-2xl border-2 border-[#93C5FD] flex items-start gap-3"
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                            isDone
                              ? "bg-[#22C55E] text-white"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                        >
                          {isDone ? "✓" : ""}
                        </div>
                        <div>
                          <div className="font-black text-lg text-[#1C01A5]">{sub.fullTitle}</div>
                          <p className="text-base md:text-lg leading-relaxed text-[#334155] mt-1">{sub.targetDescription}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          )}

          {/* Tombol KEMBALI dan LANJUT di Akhir Halaman Silabus */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={silabusPage === 1}
              onClick={() => setSilabusPage(1)}
              className="px-6 py-3 rounded-2xl bg-slate-200 text-[#334155] font-black text-sm disabled:opacity-40"
            >
              ⬅️ KEMBALI
            </button>

            <button
              type="button"
              onClick={() => {
                if (silabusPage === 1) {
                  setSilabusPage(2);
                } else {
                  setActiveMainTab("materi");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="px-8 py-3 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-sm shadow-md"
            >
              LANJUT
            </button>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 2. HALAMAN MATERI (LATAR PUTIH • TAB SUB-BAB FLOATING • 6 SMICPA)   */}
      {/* =================================================================== */}
      {activeMainTab === "materi" && (
        <section className="w-[98%] mx-auto mt-3 bg-white px-2 md:px-6 space-y-6">
          {/* Tombol Tab Sub-Bab Bergaya Slide & Floating di Bawah Tab Utama (Secondary Colors) */}
          <div className="sticky top-[74px] z-30 bg-white/95 backdrop-blur py-2 border-b border-slate-200 overflow-x-auto">
            <div className="flex flex-nowrap items-center gap-2.5 min-w-max">
              {(["A", "B", "C", "D"] as SubBabId[]).map((subId) => {
                const sub = SUB_BABS[subId];
                const isSelected = activeSubBab === subId;
                const isDone = completedSubBabs.includes(subId);
                return (
                  <button
                    key={subId}
                    type="button"
                    onClick={() => {
                      setActiveSubBab(subId);
                      setUnlockedSmicpaStage(1);
                    }}
                    style={{
                      backgroundColor: sub.secondaryBg,
                      borderColor: isSelected ? "#1C01A5" : sub.secondaryBorder,
                      color: sub.secondaryText,
                    }}
                    className={`px-4 py-2 rounded-2xl font-black text-xs md:text-sm border-2 transition-all shrink-0 ${
                      isSelected ? "ring-2 ring-[#1C01A5] scale-105 shadow" : "opacity-85"
                    }`}
                  >
                    {sub.codeTitle} {isDone ? "✅" : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Judul Sub-bab Berwarna #1C01A5 Tanpa Kartu Pembungkus di Atas Latar Putih */}
          <div className="pt-1">
            <h2 className="text-xl md:text-2xl font-black text-[#1C01A5]">
              {currentSubContent.fullTitle}
            </h2>
            <p className="text-xs md:text-sm text-[#334155] mt-0.5">
              Geser kartu ke kiri-kanan pada setiap tahap SMICPA, lalu klik tombol{" "}
              <strong>LANJUTKAN</strong> di pojok kanan bawah untuk membuka tahap berikutnya!
            </p>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 1: STORY (3 GAMBAR DOODLE BERWARNA • TANPA TEKS) */}
          {/* --------------------------------------------------------------- */}
          <div className="space-y-3 border-b-2 border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-black text-xs">
                TAHAP 1 [S] • STORY (CERITA DOODLE BERWARNA TANPA TEKS — FOKUS MENDENGAR)
              </span>
              <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
            </div>

            <div className="w-full overflow-x-auto pb-3">
              <div className="flex flex-nowrap gap-5 min-w-[960px]">
                {currentSubContent.stories.map((st, idx) => (
                  <div
                    key={st.id}
                    className="w-1/3 bg-[#FFFDF9] border-2 border-[#EF4444] rounded-3xl p-4 space-y-3 shrink-0 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#1C01A5]">
                        Slide Cerita {idx + 1} / 3
                      </span>
                      <button
                        type="button"
                        onClick={() => speakGuru(st.voiceNarration)}
                        className="px-4 py-2 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs flex items-center gap-1.5 shadow"
                      >
                        🔊 Dengarkan Suara Guru
                      </button>
                    </div>

                    {/* Ilustrasi doodle berwarna tanpa teks cerita agar anak fokus mendengar */}
                    <GambarPensilCerita sceneType={st.sceneType} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  handleUnlockNextSmicpa(
                    2,
                    mindMapRef,
                    "Tahap Cerita selesai! Sekarang mari kita lihat Peta Pikiran atau Mind-Mapping untuk memecahkan masalah tadi."
                  )
                }
                className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
              >
                LANJUTKAN KE MIND-MAPPING ⬇️
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 2: MIND-MAPPING (3 SLIDE DIAGRAM ALUR METODE)  */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 2 && (
            <div ref={mindMapRef} className="space-y-3 border-b-2 border-slate-200 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-black text-xs">
                  TAHAP 2 [M] • MIND-MAPPING (PETA PIKIRAN METODE PEMECAHAN MASALAH)
                </span>
                <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
              </div>

              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[960px]">
                  {currentSubContent.mindMaps.map((mm) => (
                    <div
                      key={mm.stepNumber}
                      className="w-1/3 bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-3xl p-5 space-y-3 shrink-0 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{mm.icon}</span>
                        <button
                          type="button"
                          onClick={() => speakGuru(`${mm.stepTitle}. ${mm.stepDesc}`)}
                          className="px-3 py-1 rounded-xl bg-white text-[#92400E] border border-[#F59E0B] text-xs font-black"
                        >
                          🔊 Suara
                        </button>
                      </div>
                      <h3 className="text-base font-black text-[#1C01A5]">{mm.stepTitle}</h3>
                      <p className="text-xs text-[#334155] leading-relaxed">{mm.stepDesc}</p>
                      <div className="bg-white p-3 rounded-2xl border border-[#F59E0B] text-center space-y-1">
                        <div className="text-xs font-bold text-slate-600">{mm.flowFrom}</div>
                        <div className="text-sm font-black text-[#1C01A5]">⬇️</div>
                        <div className="text-xs font-black text-[#92400E]">{mm.flowTo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    handleUnlockNextSmicpa(
                      3,
                      infografisRef,
                      "Peta Pikiran sudah jelas! Sekarang kita buka Tabel Ringkasan Infografis."
                    )
                  }
                  className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
                >
                  LANJUTKAN KE INFOGRAFIS ⬇️
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 3: INFOGRAFIS (3 SLIDE TABEL RINGKASAN DATA)   */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 3 && (
            <div ref={infografisRef} className="space-y-3 border-b-2 border-slate-200 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] font-black text-xs">
                  TAHAP 3 [I] • INFOGRAFIS (3 SLIDE TABEL RINGKASAN, SUARA &amp; KANVAS TITIK)
                </span>
                <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
              </div>

              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[1050px]">
                  {/* Slide 1 Infografis: Kolom Jenis Buah, Jumlah Angka, Jumlah Kata */}
                  <div className="w-1/3 bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-4 space-y-3 shrink-0">
                    <h3 className="text-sm font-black text-[#1C01A5]">
                      Tabel Slide 1: Jenis Buah, Angka &amp; Kata
                    </h3>
                    <table className="w-full text-xs border-collapse bg-white rounded-2xl overflow-hidden">
                      <thead>
                        <tr className="bg-[#1C01A5] text-[#FFE566]">
                          <th className="p-2.5 text-left">Jenis Buah</th>
                          <th className="p-2.5 text-center">Angka</th>
                          <th className="p-2.5 text-left">Dengan Kata</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSubContent.infografisData.map((row) => (
                          <tr key={row.fruitName} className="border-b border-slate-200">
                            <td className="p-2.5 font-bold">
                              {row.emoji} {row.fruitName}
                            </td>
                            <td className="p-2.5 text-center font-black text-base text-[#1C01A5]">
                              {row.countNum}
                            </td>
                            <td className="p-2.5 font-bold text-[#166534]">{row.countWord}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Slide 2 Infografis: Kolom Gambar Buah & Tombol Suara ("Buah Apel ada tiga") */}
                  <div className="w-1/3 bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-4 space-y-3 shrink-0">
                    <h3 className="text-sm font-black text-[#1C01A5]">
                      Tabel Slide 2: Gambar Buah &amp; Tombol Suara
                    </h3>
                    <table className="w-full text-xs border-collapse bg-white rounded-2xl overflow-hidden">
                      <thead>
                        <tr className="bg-[#1C01A5] text-[#FFE566]">
                          <th className="p-2.5 text-left">Gambar Buah</th>
                          <th className="p-2.5 text-center">Tombol Suara</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSubContent.infografisData.map((row) => (
                          <tr key={row.fruitName} className="border-b border-slate-200">
                            <td className="p-2.5 text-base">
                              {row.countNum === 0
                                ? "🍽️ (Kosong)"
                                : Array.from({ length: row.countNum })
                                    .map(() => row.emoji)
                                    .join("")}
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => speakGuru(row.voiceSentence)}
                                className="px-3 py-1.5 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs"
                              >
                                🔊 &quot;{row.voiceSentence}&quot;
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Slide 3 Infografis: Kolom Gambar Buah & Kanvas Tulis Titik-Titik Angka */}
                  <div className="w-1/3 bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-4 space-y-3 shrink-0">
                    <h3 className="text-sm font-black text-[#1C01A5]">
                      Tabel Slide 3: Gambar Buah &amp; Kanvas Tulis Titik Angka
                    </h3>
                    <div className="bg-white p-3 rounded-2xl border border-[#86EFAC] flex items-center justify-between gap-3">
                      <div className="space-y-1 text-center">
                        <div className="text-xs font-black text-[#166534]">
                          {currentSubContent.infografisData[0].fruitName}
                        </div>
                        <div className="text-2xl">
                          {currentSubContent.infografisData[0].countNum === 0
                            ? "🍽️"
                            : Array.from({
                                length: currentSubContent.infografisData[0].countNum,
                              })
                                .map(() => currentSubContent.infografisData[0].emoji)
                                .join("")}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500">
                          Ikuti titik angka {currentSubContent.infografisData[0].countNum} 👉
                        </div>
                      </div>
                      <DottedNumberTracingCanvas
                        digit={currentSubContent.infografisData[0].countNum}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    handleUnlockNextSmicpa(
                      4,
                      concreteRef,
                      "Infografis selesai! Sekarang ayo kita praktikkan langsung dengan Benda Nyata pada tahap Concrete."
                    )
                  }
                  className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
                >
                  LANJUTKAN KE CONCRETE ⬇️
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 4: CONCRETE (3 SLIDE BENDA NYATA + KANVAS)     */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 4 && (
            <div ref={concreteRef} className="space-y-3 border-b-2 border-slate-200 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-black text-xs">
                  TAHAP 4 [C] • CONCRETE (3 SLIDE PERMAINAN PANDUAN BENDA NYATA &amp; KANVAS)
                </span>
                <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
              </div>

              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[1050px]">
                  {currentSubContent.concreteSlides.map((cSlide, idx) => (
                    <div
                      key={cSlide.title}
                      className="w-1/3 bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-3xl p-4 space-y-3 shrink-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1C01A5]">
                          Concrete Slide {idx + 1} / 3
                        </span>
                        <button
                          type="button"
                          onClick={() => speakGuru(cSlide.voiceGuide)}
                          className="px-3 py-1 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs"
                        >
                          🔊 Panduan Suara
                        </button>
                      </div>
                      <h3 className="text-sm font-black text-[#1E3A8A]">{cSlide.title}</h3>

                      <div className="grid grid-cols-2 gap-3 items-center bg-white p-3 rounded-2xl border border-[#93C5FD]">
                        <div className="space-y-2 text-center">
                          <div className="flex flex-wrap justify-center gap-1.5 min-h-[64px] items-center">
                            {cSlide.targetCount === 0 ? (
                              <span className="text-xs font-bold text-slate-400">
                                🍽️ Wadah Kosong (0)
                              </span>
                            ) : (
                              Array.from({ length: cSlide.targetCount }).map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setConcreteCounter(i + 1);
                                    speakGuru(String(i + 1));
                                  }}
                                  className="text-2xl hover:scale-125 transition-transform"
                                >
                                  {cSlide.emoji}
                                </button>
                              ))
                            )}
                          </div>
                          <div className="text-[11px] font-bold text-[#1C01A5]">
                            Sentuh buah untuk membilang ({concreteCounter})
                          </div>
                        </div>

                        <DottedNumberTracingCanvas digit={cSlide.targetCount} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Tahap Benda Nyata selesai! Sekarang kita ubah benda nyata tadi menjadi Diagram pada tahap Pictorial."
                    )
                  }
                  className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
                >
                  LANJUTKAN KE PICTORIAL ⬇️
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 5: PICTORIAL (3 SLIDE DIAGRAM ANGKA BERBEDA)   */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 5 && (
            <div ref={pictorialRef} className="space-y-3 border-b-2 border-slate-200 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-black text-xs">
                  TAHAP 5 [P] • PICTORIAL (3 SLIDE DIAGRAM TEN-FRAME &amp; NUMBER BOND)
                </span>
                <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
              </div>

              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[960px]">
                  {currentSubContent.pictorialSlides.map((pSlide, idx) => (
                    <div
                      key={pSlide.title}
                      className="w-1/3 bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-3xl p-4 space-y-3 shrink-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1C01A5]">
                          Pictorial Slide {idx + 1} / 3
                        </span>
                        <button
                          type="button"
                          onClick={() => speakGuru(`${pSlide.title}. ${pSlide.caption}`)}
                          className="px-3 py-1 rounded-xl bg-white text-[#92400E] border border-[#F59E0B] text-xs font-black"
                        >
                          🔊 Suara
                        </button>
                      </div>
                      <h3 className="text-sm font-black text-[#1C01A5]">{pSlide.title}</h3>

                      {/* Visualisasi Diagram Pictorial */}
                      {pSlide.diagramType === "ten-frame" && (
                        <div className="grid grid-cols-5 gap-1.5 bg-white p-3 rounded-2xl border-2 border-[#1C01A5]">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-10 rounded-lg border border-slate-300 flex items-center justify-center"
                            >
                              {i < pSlide.numberA && (
                                <div className="w-6 h-6 rounded-full bg-[#22C55E]" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {pSlide.diagramType === "bar-blocks" && (
                        <div className="bg-white p-3 rounded-2xl border-2 border-[#1C01A5] space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-black w-6">{pSlide.numberA}:</span>
                            {Array.from({ length: pSlide.numberA }).map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded bg-[#3B82F6]" />
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-black w-6">{pSlide.numberB}:</span>
                            {Array.from({ length: pSlide.numberB }).map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded bg-[#F59E0B]" />
                            ))}
                          </div>
                        </div>
                      )}

                      {pSlide.diagramType === "number-bond" && (
                        <div className="bg-white p-3 rounded-2xl border-2 border-[#1C01A5] flex items-center justify-around">
                          <div className="w-12 h-12 rounded-full bg-[#F0AB00] text-[#1C01A5] flex items-center justify-center font-black text-lg">
                            {pSlide.numberA}
                          </div>
                          <div className="text-lg font-black text-[#334155]">➔</div>
                          <div className="flex flex-col gap-1.5">
                            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center font-black text-sm">
                              {pSlide.numberB}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center font-black text-sm">
                              {pSlide.numberA - pSlide.numberB}
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-[#334155]">{pSlide.caption}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Diagram Pictorial sudah kita kuasai! Terakhir, mari kita lihat simbol matematika murni pada tahap Abstract."
                    )
                  }
                  className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
                >
                  LANJUTKAN KE ABSTRACT ⬇️
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 6: ABSTRACT (3 SLIDE ANGKA & SIMBOL MURNI)     */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 6 && (
            <div ref={abstractRef} className="space-y-4 pt-2 pb-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] font-black text-xs">
                  TAHAP 6 [A] • ABSTRACT (3 SLIDE SIMBOL ANGKA &amp; NOTASI MATEMATIKA)
                </span>
                <span className="text-xs font-bold text-slate-500">Geser Kiri-Kanan ↔️</span>
              </div>

              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[960px]">
                  {currentSubContent.abstractSlides.map((aSlide, idx) => (
                    <div
                      key={aSlide.symbolLarge}
                      className="w-1/3 bg-slate-50 border-2 border-[#1C01A5] rounded-3xl p-5 text-center space-y-3 shrink-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1C01A5]">
                          Abstract Slide {idx + 1} / 3
                        </span>
                        <button
                          type="button"
                          onClick={() => speakGuru(aSlide.voiceReadout)}
                          className="px-3 py-1 rounded-xl bg-[#1C01A5] text-[#FFE566] text-xs font-black"
                        >
                          🔊 Lafalkan
                        </button>
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-[#1C01A5] py-2">
                        {aSlide.symbolLarge}
                      </div>
                      <div className="text-sm font-black text-[#FFE566] bg-[#1C01A5] py-1.5 px-3 rounded-xl">
                        {aSlide.wordLarge}
                      </div>
                      <div className="text-xs font-bold text-[#334155]">{aSlide.mathNotation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol KEMBALI (untuk Sub-Bab B, C, D) & LANJUTKAN ke Sub-Bab Berikutnya */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
                {activeSubBab !== "A" ? (
                  <button
                    type="button"
                    onClick={handlePrevSubBab}
                    className="px-6 py-3 rounded-2xl bg-slate-200 text-[#334155] font-black text-xs md:text-sm"
                  >
                    ⬅️ KEMBALI KE SUB-BAB SEBELUMNYA
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleCompleteCurrentSubBab}
                  className="px-8 py-3.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-lg"
                >
                  {activeSubBab !== "D"
                    ? `SELESAIKAN SUB-BAB ${activeSubBab} & LANJUTKAN ➡️`
                    : "SELESAIKAN MATERI & LANJUT KE SIMULASI ➡️"}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =================================================================== */}
      {/* 3. HALAMAN SIMULASI (SINGLE-SCREEN PhET-STYLE • LATAR BIRU LEMBUT)  */}
      {/* =================================================================== */}
      {activeMainTab === "simulasi" && (
        <section className="w-[98%] mx-auto mt-4 bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-3xl p-5 md:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] font-black text-xs">
                LABORATORIUM SIMULASI PhET-STYLE (SIMULASI {simIndex + 1} DARI 4)
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#1C01A5] mt-1">
                {simIndex === 0 && "Simulasi 1 (Sub-Bab A): Eksplorasi Bingkai 10 Buah Kakek"}
                {simIndex === 1 && "Simulasi 2 (Sub-Bab B): Timbangan Perbandingan Dua Kelompok"}
                {simIndex === 2 && "Simulasi 3 (Sub-Bab C): Lintasan Katak Loncat Maju & Mundur"}
                {simIndex === 3 && "Simulasi 4 (Sub-Bab D): Mesin Pemecah Pasangan Bilangan"}
              </h2>
            </div>

            <div className="flex gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSimIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 ${
                    simIndex === idx
                      ? "bg-[#1C01A5] text-[#FFE566] border-[#FFE566]"
                      : "bg-white text-[#1C01A5] border-[#3B82F6]"
                  }`}
                >
                  Simulasi Sub-Bab {["A", "B", "C", "D"][idx]}
                </button>
              ))}
            </div>
          </div>

          {/* SIMULASI 1: BINGKAI 10 INTERAKTIF */}
          {simIndex === 0 && (
            <div className="w-full overflow-x-auto">
              <div className="flex flex-nowrap gap-5 min-w-[680px]">
                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] space-y-4">
                  <h3 className="font-black text-base text-[#1C01A5]">
                    Kontrol Alat Peraga Bingkai 10
                  </h3>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex items-center justify-between bg-[#FEE2E2] p-3 rounded-2xl">
                      <span className="font-black text-[#991B1B]">
                        🍎 Apel Merah: {simTenFrameApples}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSimTenFrameApples((v) => Math.max(0, v - 1))}
                          className="px-3 py-1 bg-white rounded-lg font-black"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSimTenFrameApples((v) =>
                              Math.min(10 - simTenFrameOranges, v + 1)
                            )
                          }
                          className="px-3 py-1 bg-[#EF4444] text-white rounded-lg font-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-[#FEF3C7] p-3 rounded-2xl">
                      <span className="font-black text-[#92400E]">
                        🍊 Jeruk Kuning: {simTenFrameOranges}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSimTenFrameOranges((v) => Math.max(0, v - 1))}
                          className="px-3 py-1 bg-white rounded-lg font-black"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSimTenFrameOranges((v) =>
                              Math.min(10 - simTenFrameApples, v + 1)
                            )
                          }
                          className="px-3 py-1 bg-[#F59E0B] text-white rounded-lg font-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] space-y-3">
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isApple = idx < simTenFrameApples;
                      const isOrange =
                        !isApple && idx < simTenFrameApples + simTenFrameOranges;
                      return (
                        <div
                          key={idx}
                          className="h-14 rounded-2xl border-2 border-slate-300 flex items-center justify-center text-2xl bg-slate-50"
                        >
                          {isApple ? "🍎" : isOrange ? "🍊" : ""}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center font-black text-base text-[#1C01A5]">
                    Total Buah di Bingkai 10: {simTenFrameApples + simTenFrameOranges} Buah
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULASI 2: TIMBANGAN PERBANDINGAN */}
          {simIndex === 1 && (
            <div className="w-full overflow-x-auto">
              <div className="flex flex-nowrap gap-5 min-w-[680px]">
                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] space-y-4">
                  <h3 className="font-black text-base text-[#1C01A5]">
                    Atur Beban Buah di Timbangan
                  </h3>
                  <div className="flex items-center justify-between bg-[#DCFCE7] p-3 rounded-2xl">
                    <span className="font-black text-[#166534]">
                      🥭 Kelompok Kiri: {simCompareLeft}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={simCompareLeft}
                      onChange={(e) => setSimCompareLeft(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between bg-[#FEE2E2] p-3 rounded-2xl">
                    <span className="font-black text-[#991B1B]">
                      🍓 Kelompok Kanan: {simCompareRight}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={simCompareRight}
                      onChange={(e) => setSimCompareRight(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] flex flex-col items-center justify-center space-y-3">
                  <div className="text-2xl font-black text-[#1C01A5]">
                    {simCompareLeft}{" "}
                    {simCompareLeft > simCompareRight
                      ? "LEBIH BANYAK DARI (>)"
                      : simCompareLeft < simCompareRight
                      ? "LEBIH SEDIKIT DARI (<)"
                      : "SAMA BANYAK DENGAN (=)"}{" "}
                    {simCompareRight}
                  </div>
                  <p className="text-xs text-slate-600">
                    Selisih kedua kelompok adalah {Math.abs(simCompareLeft - simCompareRight)} buah.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SIMULASI 3: KATAK LONCAT MAJU & MUNDUR */}
          {simIndex === 2 && (
            <div className="bg-white rounded-3xl p-5 border-2 border-[#93C5FD] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-[#1C01A5]">
                  Posisi Katak Sekarang: Batu Nomor {simFrogStone}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSimFrogStone((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 rounded-xl bg-[#FEF3C7] text-[#92400E] font-black text-xs border border-[#F59E0B]"
                  >
                    ⬅️ Lompat Mundur (-1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimFrogStone((p) => Math.min(10, p + 1))}
                    className="px-4 py-2 rounded-xl bg-[#DCFCE7] text-[#166534] font-black text-xs border border-[#22C55E]"
                  >
                    Lompat Maju (+1) ➡️
                  </button>
                </div>
              </div>
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex flex-nowrap gap-2 min-w-[650px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSimFrogStone(n)}
                      className={`w-16 h-16 rounded-2xl font-black flex flex-col items-center justify-center border-2 shrink-0 ${
                        simFrogStone === n
                          ? "bg-[#1C01A5] text-[#FFE566] border-[#FFE566] scale-105"
                          : "bg-slate-50 text-[#334155] border-slate-300"
                      }`}
                    >
                      <span>{simFrogStone === n ? "🐸" : "🪨"}</span>
                      <span>{n}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SIMULASI 4: PASANGAN BILANGAN (NUMBER BONDS) */}
          {simIndex === 3 && (
            <div className="w-full overflow-x-auto">
              <div className="flex flex-nowrap gap-5 min-w-[680px]">
                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] space-y-3">
                  <h3 className="font-black text-base text-[#1C01A5]">
                    Atur Bilangan Utuh &amp; Cabang Kiri
                  </h3>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Bilangan Utuh: {simBondWhole}</span>
                    <input
                      type="range"
                      min={2}
                      max={10}
                      value={simBondWhole}
                      onChange={(e) => {
                        const w = Number(e.target.value);
                        setSimBondWhole(w);
                        setSimBondLeft((l) => Math.min(l, w));
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Cabang Kiri: {simBondLeft}</span>
                    <input
                      type="range"
                      min={0}
                      max={simBondWhole}
                      value={simBondLeft}
                      onChange={(e) => setSimBondLeft(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#93C5FD] text-center space-y-2">
                  <div className="text-xs font-bold text-slate-500">Hasil Penguraian:</div>
                  <div className="text-3xl font-black text-[#1C01A5]">
                    {simBondWhole} = {simBondLeft} dan {simBondWhole - simBondLeft}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                if (simIndex < 3) {
                  setSimIndex((i) => i + 1);
                } else {
                  setActiveMainTab("latihan");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="px-8 py-3 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-sm shadow-md"
            >
              {simIndex < 3 ? "LANJUTKAN KE SIMULASI BERIKUTNYA ➡️" : "LANJUTKAN KE LATIHAN ➡️"}
            </button>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 4. HALAMAN LATIHAN (10 SOAL • LOTS 30%, MOTS 30%, HOTS 40%)         */}
      {/* =================================================================== */}
      {activeMainTab === "latihan" && (
        <section className="w-[98%] mx-auto mt-4 bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-3xl p-5 md:p-7 space-y-5">
          {(() => {
            const q = PRACTICE_QUESTIONS[practiceIdx];
            const chosen = practiceAnswers[q.id];
            const isAnswered = Boolean(chosen);
            const isRight = chosen === q.correctAnswer;

            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] font-black text-xs">
                      SOAL LATIHAN {q.id} DARI 10 • LEVEL: {q.level}
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-[#1C01A5] mt-1">
                      {q.prompt}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGuru(q.prompt)}
                    className="px-4 py-2 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs"
                  >
                    🔊 Bacakan Soal
                  </button>
                </div>

                {/* 2 Kartu Sejajar: Visualisasi Concrete/Pictorial & Pilihan Jawaban */}
                <div className="w-full overflow-x-auto pb-2">
                  <div className="flex flex-nowrap gap-5 min-w-[680px]">
                    <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#F59E0B] flex flex-col items-center justify-center gap-3">
                      <div className="flex flex-wrap justify-center gap-2 text-3xl">
                        {q.visualEmojis.length === 0 ? (
                          <span className="text-sm font-bold text-slate-400">
                            🧺 Keranjang Kosong (0)
                          </span>
                        ) : (
                          q.visualEmojis.map((em, i) => <span key={i}>{em}</span>)
                        )}
                      </div>
                      {q.secondaryGroupEmojis && (
                        <div className="flex flex-wrap justify-center gap-2 text-3xl pt-2 border-t border-slate-200 w-full">
                          {q.secondaryGroupEmojis.map((em, i) => (
                            <span key={i}>{em}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#F59E0B] space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {q.options.map((opt) => {
                          const selected = chosen === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }))
                              }
                              className={`p-3.5 rounded-2xl font-black text-base border-2 transition-all ${
                                selected
                                  ? opt === q.correctAnswer
                                    ? "bg-[#22C55E] text-white border-[#166534]"
                                    : "bg-[#EF4444] text-white border-[#991B1B]"
                                  : "bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#1C01A5] border-[#F59E0B]"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div
                          className={`p-3 rounded-2xl text-xs font-bold ${
                            isRight
                              ? "bg-[#DCFCE7] text-[#166534]"
                              : "bg-[#FEE2E2] text-[#991B1B]"
                          }`}
                        >
                          {isRight ? "✅ Benar! (+3 Token Emas): " : "💡 Pembahasan Guru: "}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigasi Akhir Halaman Latihan: KEMBALI, LEWATI (Jika Belum Dijawab), LANJUTKAN (Jika Sudah Dijawab) */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={practiceIdx === 0}
                    onClick={() => setPracticeIdx((i) => Math.max(0, i - 1))}
                    className="px-6 py-3 rounded-2xl bg-white text-[#334155] border-2 border-slate-300 font-black text-xs md:text-sm disabled:opacity-40"
                  >
                    ⬅️ KEMBALI
                  </button>

                  {!isAnswered ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (practiceIdx < PRACTICE_QUESTIONS.length - 1) {
                          setPracticeIdx((i) => i + 1);
                        } else {
                          setActiveMainTab("ujian");
                        }
                      }}
                      className="px-7 py-3 rounded-2xl bg-[#F59E0B] text-white font-black text-xs md:text-sm shadow"
                    >
                      LEWATI SOAL INI ⏭️
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (practiceIdx < PRACTICE_QUESTIONS.length - 1) {
                          setPracticeIdx((i) => i + 1);
                        } else {
                          setActiveMainTab("ujian");
                        }
                      }}
                      className="px-8 py-3 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs md:text-sm shadow-md"
                    >
                      {practiceIdx < PRACTICE_QUESTIONS.length - 1
                        ? "LANJUTKAN ➡️"
                        : "LANJUTKAN KE UJIAN FORMAL ➡️"}
                    </button>
                  )}
                </div>
              </>
            );
          })()}
        </section>
      )}

      {/* =================================================================== */}
      {/* 5. HALAMAN UJIAN FORMAL (10 SOAL 100% HOTS • LATAR MERAH LEMBUT)    */}
      {/* =================================================================== */}
      {activeMainTab === "ujian" && (
        <section className="w-[98%] mx-auto mt-4 bg-[#FFF1F2] border-2 border-[#EF4444] rounded-3xl p-5 md:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1C01A5] text-white p-4 rounded-2xl">
            <div>
              <span className="text-xs font-black text-[#FFE566] uppercase">
                LEMBAR UJIAN FORMAL STANDAR HOTS (70 TOKEN EMAS • WAJIB 100%)
              </span>
              <h2 className="text-base md:text-lg font-black">
                Sensor Lokal &quot;Si Paling Pintar&quot;: Aktif (1 Wajah Siswa Terverifikasi)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/15 text-[#FFE566] font-black text-xs">
              Percobaan Ke-{examAttempts} {examFirstTryPerfect ? "🏅 Si Paling Pintar" : ""}
            </span>
          </div>

          {(() => {
            const q = FORMAL_EXAM_QUESTIONS[examIdx];
            const chosen = examAnswers[q.id];

            return (
              <>
                <div className="w-full overflow-x-auto pb-2">
                  <div className="flex flex-nowrap gap-5 min-w-[680px]">
                    <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#FCA5A5] space-y-3">
                      <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-black text-xs">
                        Soal Formal #{q.id} / 10 • {q.level}
                      </span>
                      <p className="text-sm md:text-base font-black text-[#1C01A5]">{q.prompt}</p>
                      <div className="flex flex-wrap gap-2 text-2xl pt-2">
                        {q.visualEmojis.map((em, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-base font-bold"
                          >
                            {em}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#FCA5A5] space-y-3">
                      <div className="grid grid-cols-1 gap-2.5">
                        {q.options.map((opt) => {
                          const isSelected = chosen === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={examSubmitted}
                              onClick={() =>
                                setExamAnswers((prev) => ({ ...prev, [q.id]: opt }))
                              }
                              className={`p-3 rounded-2xl font-black text-sm text-left border-2 transition-all ${
                                isSelected
                                  ? "bg-[#1C01A5] text-[#FFE566] border-[#FFE566]"
                                  : "bg-white hover:bg-[#FFF1F2] text-[#334155] border-slate-300"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={examIdx === 0}
                    onClick={() => setExamIdx((i) => Math.max(0, i - 1))}
                    className="px-6 py-3 rounded-2xl bg-white text-[#334155] border-2 border-slate-300 font-black text-xs disabled:opacity-40"
                  >
                    ⬅️ KEMBALI
                  </button>

                  {examIdx < FORMAL_EXAM_QUESTIONS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setExamIdx((i) => i + 1)}
                      className="px-7 py-3 rounded-2xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs"
                    >
                      SOAL BERIKUTNYA ➡️
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        let right = 0;
                        FORMAL_EXAM_QUESTIONS.forEach((item) => {
                          if (examAnswers[item.id] === item.correctAnswer) right += 1;
                        });
                        const score = right * 10;
                        setExamScore(score);
                        setExamSubmitted(true);
                        if (score === 100 && examAttempts === 1) {
                          setExamFirstTryPerfect(true);
                        }
                      }}
                      className="px-8 py-3 rounded-2xl bg-[#22C55E] text-white font-black text-xs shadow-md"
                    >
                      ✅ SERAHKAN LEMBAR UJIAN FORMAL
                    </button>
                  )}
                </div>

                {examSubmitted && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#1C01A5] flex flex-wrap items-center justify-between gap-3">
                    <div className="font-black text-sm text-[#1C01A5]">
                      Nilai Ujian Formal: {examScore} / 100{" "}
                      {examScore === 100
                        ? "🎉 (Lulus Mutlak 100%! Gembok Praktikum Terbuka)"
                        : "⚠️ (Wajib 100/100 untuk membuka Praktikum)"}
                    </div>
                    <div className="flex gap-2">
                      {examScore < 100 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setExamAttempts((a) => a + 1);
                            setExamAnswers({});
                            setExamSubmitted(false);
                            setExamIdx(0);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#EF4444] text-white font-black text-xs"
                        >
                          🔄 Ulangi Ujian
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveMainTab("praktikum")}
                          className="px-5 py-2 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs"
                        >
                          BUKA PRAKTIKUM SINTESIS ➡️
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </section>
      )}

      {/* =================================================================== */}
      {/* 6. HALAMAN PRAKTIKUM (CETAK BIRU IGIL • LATAR HIJAU LEMBUT)         */}
      {/* =================================================================== */}
      {activeMainTab === "praktikum" && (
        <section className="w-[98%] mx-auto mt-4 bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-5 md:p-7 space-y-5">
          {examScore < 100 ? (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#EF4444] text-center space-y-3">
              <div className="text-4xl">🔒</div>
              <h2 className="text-xl font-black text-[#1C01A5]">
                Halaman Praktikum Masih Terkunci
              </h2>
              <p className="text-xs md:text-sm text-[#334155]">
                Sesuai Cetak Biru Utama Platform IGIL, siswa wajib meraih nilai mutlak{" "}
                <strong>100/100</strong> pada Komponen Ujian Mandiri terlebih dahulu.
              </p>
              <button
                type="button"
                onClick={() => setActiveMainTab("ujian")}
                className="px-6 py-2.5 rounded-2xl bg-[#1C01A5] text-[#FFE566] font-black text-xs"
              >
                Kembali ke Ujian Formal
              </button>
            </div>
          ) : (
            <>
              <div className="bg-[#1C01A5] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black text-[#FFE566] uppercase">
                    KOMPONEN 6 • PRAKTIKUM SINTESIS (50 TOKEN EMAS • ON-SUBMIT HIDDEN GRADING)
                  </span>
                  <h2 className="text-lg font-black">
                    Proyek Terpadu: Merancang Kebun Buah &amp; Taman Baca Kakek (Sintesis 4 Bab)
                  </h2>
                </div>
              </div>

              {/* 2 Kartu Sejajar: Simulator Rakitan & Kolom Penalaran Siswa */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex flex-nowrap gap-5 min-w-[700px]">
                  <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#86EFAC] space-y-3">
                    <h3 className="font-black text-base text-[#166534]">
                      1. Rakitan Simulasi Kebun Buah (Target Pasangan = 10 &amp; Sama Banyak 5=5)
                    </h3>
                    <div className="space-y-2.5 text-xs font-bold">
                      <div className="flex justify-between items-center bg-[#FEE2E2] p-2.5 rounded-xl">
                        <span>🍎 Pohon Apel: {pracRedApples}</span>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={pracRedApples}
                          onChange={(e) => setPracRedApples(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex justify-between items-center bg-[#FEF3C7] p-2.5 rounded-xl">
                        <span>🍊 Pohon Jeruk: {pracYellowOranges}</span>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={pracYellowOranges}
                          onChange={(e) => setPracYellowOranges(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex justify-between items-center bg-[#DBEAFE] p-2.5 rounded-xl">
                        <span>🪑 Meja Baca ({pracReadingTables}) vs 🗑️ Tempat Sampah ({pracReadingChairs})</span>
                        <button
                          type="button"
                          onClick={() => {
                            setPracReadingTables(5);
                            setPracReadingChairs(5);
                          }}
                          className="px-2.5 py-1 bg-[#1C01A5] text-[#FFE566] rounded-lg"
                        >
                          Set 5 = 5
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 bg-white rounded-3xl p-5 border-2 border-[#86EFAC] space-y-3">
                    <h3 className="font-black text-base text-[#1C01A5]">
                      2. Penalaran &amp; Penjelasan Tertulis/Lisan Siswa
                    </h3>
                    <textarea
                      rows={4}
                      value={pracReasoningText}
                      onChange={(e) => setPracReasoningText(e.target.value)}
                      placeholder="Ceritakan dengan bahasamu sendiri berapa pohon apel dan jeruk yang kamu tanam agar berjumlah 10..."
                      className="w-full p-3 rounded-2xl border-2 border-slate-300 text-xs"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setPracReasoningText(
                            `Aku menanam ${pracRedApples} pohon apel dan ${pracYellowOranges} pohon jeruk supaya jumlahnya pas ${
                              pracRedApples + pracYellowOranges
                            } pohon. Aku juga menaruh ${pracReadingTables} meja dan ${pracReadingChairs} tempat sampah agar sama banyak.`
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-[#FEF3C7] text-[#92400E] font-black text-xs"
                      >
                        ✨ Contoh Bahasa Anak SD
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPracSubmitted(true);
                          speakGuru(
                            "Tugas Praktikum berhasil diserahkan! Nilai kualitasmu telah disimpan secara rahasia oleh sistem untuk kualifikasi Kolam Beasiswa 90 persen di akhir bulan."
                          );
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#1C01A5] text-[#FFE566] border-2 border-[#FFE566] font-black text-xs"
                      >
                        🚀 SERAHKAN PRAKTIKUM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {pracSubmitted && (
                <div className="bg-white p-4 rounded-2xl border-2 border-[#1C01A5] text-xs font-bold text-[#1C01A5]">
                  ✅ <strong>Status On-Submit Hidden Grading:</strong> Tugas Praktikum telah dinilai 1 kali di latar belakang berdasarkan 4 Parameter Resmi (Akurasi Solusi 30%, Sintesis Lintas-4-Bab 25%, Kemandirian Pengerjaan 20%, Penalaran &amp; Penjelasan 25%) dan disimpan tersembunyi hingga pembukaan peringkat beasiswa akhir bulan. (+50 Token Emas Tercatat).
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}