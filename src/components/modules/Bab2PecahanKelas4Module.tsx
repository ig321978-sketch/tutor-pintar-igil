"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ==========================================
// 1. MESIN SUARA LOKAL (WEB AUDIO SYNTHESIZER - RP 0)
// ==========================================
const playSound = (type: "click" | "slice" | "correct" | "wrong" | "coin" | "fanfare") => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === "slice") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === "coin" || type === "correct") {
      const notes = [987.77, 1318.51]; // B5 -> E6 (Suara Koin Mario/Game)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "fanfare") {
      const melody = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
      melody.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.11);
        gain.gain.setValueAtTime(0.25, now + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.11 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.11);
        osc.stop(now + idx * 0.11 + 0.35);
      });
    }
  } catch {
    // Abaikan jika browser memblokir autoplay audio
  }
};

// ==========================================
// 2. KOMPONEN VISUAL PIZZA / LINGKARAN PECAHAN INTERAKTIF
// ==========================================
interface InteractiveFractionCircleProps {
  numerator: number;
  denominator: number;
  size?: number;
  activeColor?: string;
  onSliceClick?: (newNumerator: number) => void;
  interactive?: boolean;
}

const InteractiveFractionCircle: React.FC<InteractiveFractionCircleProps> = ({
  numerator,
  denominator,
  size = 180,
  activeColor = "#f59e0b",
  onSliceClick,
  interactive = false,
}) => {
  const radius = size / 2 - 10;
  const center = size / 2;

  const renderSlices = () => {
    if (denominator === 1) {
      const isFilled = numerator >= 1;
      return (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={isFilled ? activeColor : "#f1f5f9"}
          stroke="#1e293b"
          strokeWidth="3"
          className={interactive ? "cursor-pointer transition-transform hover:scale-105" : ""}
          onClick={() => {
            if (interactive && onSliceClick) {
              playSound("slice");
              onSliceClick(isFilled ? 0 : 1);
            }
          }}
        />
      );
    }

    const slices = [];
    for (let i = 0; i < denominator; i++) {
      const startAngle = (i * 360) / denominator - 90;
      const endAngle = ((i + 1) * 360) / denominator - 90;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArcFlag = 360 / denominator > 180 ? 1 : 0;
      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      const isFilled = i < numerator;

      // Titik tengah potongan untuk ornamen topping/angka
      const midAngle = (((startAngle + endAngle) / 2) * Math.PI) / 180;
      const labelX = center + radius * 0.6 * Math.cos(midAngle);
      const labelY = center + radius * 0.6 * Math.sin(midAngle);

      slices.push(
        <g
          key={i}
          className={interactive ? "cursor-pointer transition-opacity hover:opacity-90" : ""}
          onClick={() => {
            if (!interactive || !onSliceClick) return;
            playSound("slice");
            if (i + 1 === numerator) {
              onSliceClick(i);
            } else {
              onSliceClick(i + 1);
            }
          }}
        >
          <path
            d={pathData}
            fill={isFilled ? activeColor : "#f8fafc"}
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {isFilled && denominator <= 12 && (
            <circle cx={labelX} cy={labelY} r={radius * 0.09} fill="#ffffff" opacity="0.65" />
          )}
        </g>
      );
    }
    return slices;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto select-none drop-shadow-sm">
      <circle cx={center} cy={center} r={radius + 4} fill="#e2e8f0" />
      {renderSlices()}
      <circle cx={center} cy={center} r={4} fill="#1e293b" />
    </svg>
  );
};

// ==========================================
// 3. TIPE DATA SOAL LATIHAN & EVALUASI
// ==========================================
interface QuestionItem {
  id: number;
  story: string;
  question: string;
  visualType: "circle" | "compare" | "equivalent" | "decimalGrid";
  num1: number;
  den1: number;
  num2?: number;
  den2?: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const TOKEN_PRICE_RP = 500; // 1 Token IGIL = Rp 500

export default function Bab2PecahanKelas4Module() {
  // Navigasi 6 Tab Standar IGIL
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [materiBagian, setMateriBagian] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [persenPetak, setPersenPetak] = useState<number>(75);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Dompet Token IGIL (Latihan Maks 50 Token + Evaluasi Maks 100 Token = 150 Token = Rp 75.000)
  const [practiceTokens, setPracticeTokens] = useState<number>(0);
  const [evalTokens, setEvalTokens] = useState<number>(0);
  const totalTokens = practiceTokens + evalTokens;

  // ==========================================
  // STATE TAB 1: AKTIVASI OTAK (MISTERI PIZZA KAPTEN)
  // ==========================================
  const [pizzaAClicked, setPizzaAClicked] = useState<boolean>(false);
  const [pizzaBClicked, setPizzaBClicked] = useState<boolean>(false);
  const [hookGuess, setHookGuess] = useState<"A" | "B" | null>(null);

  // ==========================================
  // STATE TAB 2: 4 MISI MATERI INTERAKTIF ("UNLOCK BY DOING")
  // ==========================================
  const [missionStep, setMissionStep] = useState<1 | 2 | 3 | 4>(1);
  // Misi 1: Pisau Cokelat
  const [chocoCut, setChocoCut] = useState<number>(4);
  const [chocoEaten, setChocoEaten] = useState<number>(1);
  // Misi 2: Paradox Pembilang 1
  const [unitDenom, setUnitDenom] = useState<number>(2);
  // Misi 3: Mesin Kloning Pecahan Senilai
  const [equivMultiplier, setEquivMultiplier] = useState<number>(1); // 1x (1/2), 2x (2/4), 3x (3/6), 4x (4/8)
  // Misi 4: Grid 10x10 Desimal & Persen
  const [gridFilledCount, setGridFilledCount] = useState<number>(25); // 25/100 = 0,25 = 25%

  // ==========================================
  // STATE TAB 3: SIMULATOR PHET (TIMBANGAN & LABORATORIUM PECAHAN)
  // ==========================================
  const [leftNum, setLeftNum] = useState<number>(1);
  const [leftDen, setLeftDen] = useState<number>(2);
  const [rightNum, setRightNum] = useState<number>(2);
  const [rightDen, setRightDen] = useState<number>(4);
  const [simShape, setSimShape] = useState<"pizza" | "bar">("pizza");

  // ==========================================
  // STATE TAB 4: SMART CANVAS + STEMPEL PECAHAN
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>("#2563eb");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [canvasMissionIdx, setCanvasMissionIdx] = useState<number>(0);

  const canvasMissions = [
    "Misi Kanvas 1: Tekan tombol 'Stempel Pizza 1/4' di bawah, lalu warnai 3 potongannya menggunakan pena biru untuk membuat pecahan 3/4!",
    "Misi Kanvas 2: Tekan tombol 'Stempel Batang Pecahan', lalu buktikan bahwa 1/2 sama panjangnya dengan 2/4!",
    "Misi Kanvas 3: Tuliskan bentuk pecahan desimal dari 3/10 dan 45/100 di papan tulis berpetak ini!",
  ];

  // ==========================================
  // STATE TAB 5: 10 SOAL LATIHAN MANDIRI (+5 TOKEN / SOAL = 50 TOKEN)
  // ==========================================
  const [practiceQuestions, setPracticeQuestions] = useState<QuestionItem[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<number, boolean>>({});

  // ==========================================
  // STATE TAB 6: 10 SOAL EVALUASI ANTI-CONTEK (+10 TOKEN / SOAL = 100 TOKEN)
  // ==========================================
  const [evalQuestions, setEvalQuestions] = useState<QuestionItem[]>([]);
  const [evalAnswers, setEvalAnswers] = useState<Record<number, string>>({});
  const [evalSubmitted, setEvalSubmitted] = useState<boolean>(false);
  const [evalScore, setEvalScore] = useState<number>(0);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [evalSeedCode, setEvalSeedCode] = useState<string>("IGIL-K4B2-001");

  // Helper Suara Guru AI (Web Speech API - Rp 0)
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger suara dengan pengecekan mute
  const triggerSound = useCallback(
    (type: "click" | "slice" | "correct" | "wrong" | "coin" | "fanfare") => {
      if (soundEnabled) playSound(type);
    },
    [soundEnabled]
  );

  // ==========================================
  // GENERATOR SOAL DINAMIS (DYNAMIC PARAMETERIZATION - ANTI-CONTEK)
  // ==========================================
  const generateDynamicQuestions = useCallback((isEval: boolean): QuestionItem[] => {
    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

    const names = ["Budi", "Siti", "Raka", "Lani", "Edo", "Dinda", "Kapten Iwan", "Putri"];
    const foods = ["pizza", "kue bolu", "cokelat batang", "martabak manis", "roti lapis"];

    // 1. Membaca Nilai Pecahan dari Visual
    const d1 = randInt(4, 8);
    const n1 = randInt(1, d1 - 1);
    const name1 = names[randInt(0, names.length - 1)];
    const food1 = foods[randInt(0, foods.length - 1)];

    // 2. Membandingkan Pecahan Pembilang Satu (1/a vs 1/b)
    const d2a = randInt(2, 4);
    const d2b = randInt(d2a + 2, 9);

    // 3. Membandingkan Pecahan Berpenyebut Sama
    const d3 = randInt(5, 10);
    const n3a = randInt(1, d3 - 3);
    const n3b = n3a + randInt(1, 2);

    // 4. Pecahan Senilai (Mengalikan pembilang & penyebut)
    const basePairs = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [2, 5],
    ];
    const pair4 = basePairs[randInt(0, basePairs.length - 1)];
    const mult4 = randInt(2, 4);
    const eqNum4 = pair4[0] * mult4;
    const eqDen4 = pair4[1] * mult4;

    // 5. Penjumlahan Pecahan Berpenyebut Sama
    const d5 = randInt(6, 10);
    const n5a = randInt(1, Math.floor(d5 / 2) - 1);
    const n5b = randInt(1, d5 - n5a - 1);
    const sum5 = n5a + n5b;

    // 6. Pengurangan Pecahan Berpenyebut Sama
    const d6 = randInt(6, 10);
    const n6a = randInt(4, d6 - 1);
    const n6b = randInt(1, n6a - 1);
    const diff6 = n6a - n6b;

    // 7. Pecahan Desimal Persepuluhan (n/10 -> 0,n)
    const n7 = randInt(1, 9);

    // 8. Pecahan Desimal Perseratusan (n/100 -> 0,xx)
    const n8 = randInt(12, 89);
    const dec8 = `0,${n8}`;

    // 9. Konversi Pecahan ke Persen (Perseratusan)
    const pctPairs = [
      { n: 1, d: 4, pct: "25%", grid: 25 },
      { n: 1, d: 2, pct: "50%", grid: 50 },
      { n: 3, d: 4, pct: "75%", grid: 75 },
      { n: 1, d: 5, pct: "20%", grid: 20 },
      { n: 2, d: 5, pct: "40%", grid: 40 },
      { n: 3, d: 5, pct: "60%", grid: 60 },
      { n: 4, d: 5, pct: "80%", grid: 80 },
    ];
    const p9 = pctPairs[randInt(0, pctPairs.length - 1)];

    // 10. Soal Cerita Bagian Sisa Utuh (1 - n/d)
    const d10 = randInt(5, 9);
    const n10 = randInt(1, d10 - 2);
    const rem10 = d10 - n10;

    const list: QuestionItem[] = [
      {
        id: 1,
        story: `${name1} memotong sebuah ${food1} menjadi ${d1} bagian sama besar, lalu mengambil ${n1} bagian yang diwarnai pada gambar.`,
        question: `Berapakah nilai pecahan dari bagian yang diambil ${name1}?`,
        visualType: "circle",
        num1: n1,
        den1: d1,
        options: shuffle([`${n1}/${d1}`, `${d1}/${n1}`, `${n1}/${d1 - n1}`, `${d1 - n1}/${d1}`]),
        correctAnswer: `${n1}/${d1}`,
        explanation: `Bagian yang diambil adalah Pembilang (${n1}) dan total seluruh potongan sama besar adalah Penyebut (${d1}), sehingga ditulis ${n1}/${d1}.`,
      },
      {
        id: 2,
        story: `Perhatikan dua potongan pecahan berpembilang satu berikut: 1/${d2a} dan 1/${d2b}.`,
        question: `Tanda perbandingan yang tepat untuk mengisi titik-titik: 1/${d2a} ... 1/${d2b} adalah?`,
        visualType: "compare",
        num1: 1,
        den1: d2a,
        num2: 1,
        den2: d2b,
        options: ["> (Lebih Besar)", "< (Lebih Kecil)", "= (Sama Besar)", "Tidak bisa dibandingkan"],
        correctAnswer: "> (Lebih Besar)",
        explanation: `Pada pecahan berpembilang 1, semakin KECIL angka penyebutnya (${d2a} dibanding ${d2b}), maka ukuran tiap potongannya justru semakin BESAR. Jadi 1/${d2a} > 1/${d2b}.`,
      },
      {
        id: 3,
        story: `Dua buah wadah air masing-masing terisi ${n3a}/${d3} bagian dan ${n3b}/${d3} bagian.`,
        question: `Manakah pernyataan yang benar mengenai kedua pecahan berpenyebut sama tersebut?`,
        visualType: "compare",
        num1: n3a,
        den1: d3,
        num2: n3b,
        den2: d3,
        options: shuffle([
          `${n3a}/${d3} < ${n3b}/${d3}`,
          `${n3a}/${d3} > ${n3b}/${d3}`,
          `${n3a}/${d3} = ${n3b}/${d3}`,
          `${n3b}/${d3} < ${n3a}/${d3}`,
        ]),
        correctAnswer: `${n3a}/${d3} < ${n3b}/${d3}`,
        explanation: `Karena penyebutnya sudah sama (${d3}), kita cukup membandingkan pembilangnya: ${n3a} lebih kecil dari ${n3b}, maka ${n3a}/${d3} < ${n3b}/${d3}.`,
      },
      {
        id: 4,
        story: `Sebuah balok pecahan menunjukkan nilai ${pair4[0]}/${pair4[1]}. Jika setiap bagiannya dibelah menjadi ${mult4} kali lipat lebih rapat:`,
        question: `Manakah pecahan di bawah ini yang SENILAI dengan ${pair4[0]}/${pair4[1]}?`,
        visualType: "equivalent",
        num1: pair4[0],
        den1: pair4[1],
        num2: eqNum4,
        den2: eqDen4,
        options: shuffle([
          `${eqNum4}/${eqDen4}`,
          `${pair4[0] + mult4}/${pair4[1] + mult4}`,
          `${eqNum4}/${pair4[1]}`,
          `${pair4[0]}/${eqDen4}`,
        ]),
        correctAnswer: `${eqNum4}/${eqDen4}`,
        explanation: `Pecahan senilai diperoleh dengan mengalikan pembilang dan penyebut dengan angka yang sama (${mult4}): (${pair4[0]}×${mult4}) / (${pair4[1]}×${mult4}) = ${eqNum4}/${eqDen4}.`,
      },
      {
        id: 5,
        story: `Pagi hari Sinta mengecat ${n5a}/${d5} bagian dinding, lalu siang hari mengecat lagi ${n5b}/${d5} bagian dinding.`,
        question: `Berapa bagian total dinding yang sudah dicat oleh Sinta (${n5a}/${d5} + ${n5b}/${d5})?`,
        visualType: "circle",
        num1: sum5,
        den1: d5,
        options: shuffle([
          `${sum5}/${d5}`,
          `${sum5}/${d5 * 2}`,
          `${n5a * n5b}/${d5}`,
          `${Math.abs(n5a - n5b)}/${d5}`,
        ]),
        correctAnswer: `${sum5}/${d5}`,
        explanation: `Untuk menjumlahkan pecahan berpenyebut sama, jumlahkan pembilangnya saja (${n5a} + ${n5b} = ${sum5}), sedangkan penyebutnya tetap ${d5}. Hasilnya ${sum5}/${d5}.`,
      },
      {
        id: 6,
        story: `Persediaan beras di dapur mula-mula ${n6a}/${d6} karung. Hari ini dimasak sebanyak ${n6b}/${d6} karung.`,
        question: `Berapa sisa beras di dapur sekarang (${n6a}/${d6} - ${n6b}/${d6})?`,
        visualType: "circle",
        num1: diff6,
        den1: d6,
        options: shuffle([
          `${diff6}/${d6}`,
          `${diff6}/0`,
          `${n6a + n6b}/${d6}`,
          `${diff6}/${d6 * 2}`,
        ]),
        correctAnswer: `${diff6}/${d6}`,
        explanation: `Kurangkan pembilangnya (${n6a} - ${n6b} = ${diff6}) dan biarkan penyebutnya tetap (${d6}). Jadi sisanya adalah ${diff6}/${d6}.`,
      },
      {
        id: 7,
        story: `Sebuah pita dibagi menjadi 10 bagian sama panjang dan diwarnai sebanyak ${n7} bagian (${n7}/10).`,
        question: `Bagaimanakah penulisan pecahan desimal persepuluhan dari ${n7}/10?`,
        visualType: "circle",
        num1: n7,
        den1: 10,
        options: shuffle([`0,${n7}`, `0,0${n7}`, `${n7},0`, `1,${n7}`]),
        correctAnswer: `0,${n7}`,
        explanation: `Pecahan persepuluhan (/10) memiliki tepat 1 angka di belakang koma. Jadi ${n7}/10 ditulis 0,${n7}.`,
      },
      {
        id: 8,
        story: `Pada papan seratus petak (10×10), terdapat ${n8} petak yang menyala dari total 100 petak (${n8}/100).`,
        question: `Berapakah bentuk pecahan desimal perseratusan dari ${n8}/100?`,
        visualType: "decimalGrid",
        num1: n8,
        den1: 100,
        options: shuffle([dec8, `${Math.floor(n8 / 10)},${n8 % 10}`, `0,0${n8}`, `${n8},100`]),
        correctAnswer: dec8,
        explanation: `Pecahan perseratusan (/100) memiliki 2 angka di belakang koma. Maka ${n8}/100 ditulis ${dec8}.`,
      },
      {
        id: 9,
        story: `Baterai tablet belajar menunjukkan sisa daya sebesar ${p9.n}/${p9.d} bagian penuh.`,
        question: `Jika diubah ke dalam bentuk Persen (perseratus), berapakah nilai dari ${p9.n}/${p9.d}?`,
        visualType: "decimalGrid",
        num1: p9.grid,
        den1: 100,
        options: shuffle([p9.pct, `${p9.n * 10}%`, `${p9.d * 10}%`, `${p9.n + p9.d}%`]),
        correctAnswer: p9.pct,
        explanation: `Ubah penyebut ${p9.d} menjadi 100: (${p9.n} × ${100 / p9.d}) / (${p9.d} × ${100 / p9.d}) = ${p9.grid}/100 = ${p9.pct}.`,
      },
      {
        id: 10,
        story: `Satu loyang utuh martabak dipotong menjadi ${d10} bagian sama besar. Ayah dan Ibu memakan ${n10}/${d10} bagian.`,
        question: `Berapa pecahan bagian martabak yang MASIH TERSISA di dalam loyang?`,
        visualType: "circle",
        num1: rem10,
        den1: d10,
        options: shuffle([
          `${rem10}/${d10}`,
          `${n10}/${d10}`,
          `1/${d10}`,
          `${rem10}/${n10}`,
        ]),
        correctAnswer: `${rem10}/${d10}`,
        explanation: `1 loyang utuh bernilai ${d10}/${d10}. Dikurangi yang dimakan ${n10}/${d10}, maka sisanya adalah (${d10} - ${n10})/${d10} = ${rem10}/${d10}.`,
      },
    ];

    return isEval ? list : list;
  }, []);

  // Inisialisasi soal pertama kali
  useEffect(() => {
    setPracticeQuestions(generateDynamicQuestions(false));
    setEvalQuestions(generateDynamicQuestions(true));
  }, [generateDynamicQuestions]);

  // Stopwatch Presisi untuk Tab 6 (Evaluasi)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeTab === 7 && timerRunning && !evalSubmitted) {
      const startTime = Date.now() - elapsedMs;
      interval = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTab, timerRunning, evalSubmitted, elapsedMs]);

  // Otomatis nyalakan timer saat masuk Tab 6
  useEffect(() => {
    if (activeTab === 7 && !evalSubmitted && !timerRunning) {
      setTimerRunning(true);
    }
  }, [activeTab, evalSubmitted, timerRunning]);

  // ==========================================
  // FUNGSI KANVAS PINTAR & STEMPEL PECAHAN (TAB 4)
  // ==========================================
  const drawCanvasGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar garis buku berpetak matematika
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    const step = 25;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (activeTab === 5) {
      setTimeout(() => drawCanvasGrid(), 50);
    }
  }, [activeTab, drawCanvasGrid]);

  const stampFractionToCanvas = (type: "circle4" | "bar24") => {
    triggerSound("slice");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 3;

    if (type === "circle4") {
      const cx = 160;
      const cy = 160;
      const r = 80;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();
    } else if (type === "bar24") {
      // Batang 1/2 di atas & Batang 2/4 di bawah
      ctx.strokeRect(320, 80, 240, 50);
      ctx.beginPath();
      ctx.moveTo(440, 80);
      ctx.lineTo(440, 130);
      ctx.stroke();

      ctx.strokeRect(320, 160, 240, 50);
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(320 + i * 60, 160);
        ctx.lineTo(320 + i * 60, 210);
        ctx.stroke();
      }
    }
  };

  const startCanvasDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const moveCanvasDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopCanvasDraw = () => {
    setIsDrawing(false);
  };

  // ==========================================
  // HANDLER LATIHAN (TAB 5) & EVALUASI (TAB 6)
  // ==========================================
  const handleCheckPractice = (q: QuestionItem) => {
    const selected = practiceAnswers[q.id];
    if (!selected || practiceChecked[q.id]) return;

    const isCorrect = selected === q.correctAnswer;
    setPracticeChecked((prev) => ({ ...prev, [q.id]: true }));

    if (isCorrect) {
      triggerSound("coin");
      setPracticeTokens((prev) => Math.min(50, prev + 5));
    } else {
      triggerSound("wrong");
    }
  };

  const handleSubmitEvaluation = () => {
    if (Object.keys(evalAnswers).length < evalQuestions.length) {
      alert("Harap jawab ke-10 soal Evaluasi terlebih dahulu sebelum menambang Token Beasiswa!");
      return;
    }

    setTimerRunning(false);
    setEvalSubmitted(true);

    let correctCount = 0;
    evalQuestions.forEach((q) => {
      if (evalAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const finalScore = correctCount * 10;
    setEvalScore(finalScore);

    // Aturan IGIL: +10 Token per soal evaluasi benar (100 Token jika Nilai 100% Sempurna)
    const earned = correctCount * 10;
    setEvalTokens((prev) => Math.max(prev, earned));

    if (finalScore === 100) {
      triggerSound("fanfare");
    } else {
      triggerSound("wrong");
    }
  };

  const handleRetryEvaluation = () => {
    triggerSound("click");
    setAttemptCount((prev) => prev + 1);
    setEvalQuestions(generateDynamicQuestions(true));
    setEvalAnswers({});
    setEvalSubmitted(false);
    setEvalScore(0);
    setElapsedMs(0);
    setTimerRunning(true);
    setEvalSeedCode(`IGIL-K4B2-${Math.floor(100 + Math.random() * 900)}`);
  };

  // Format waktu MM:SS.d
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");
    const tenth = Math.floor((ms % 1000) / 100);
    return `${min}:${sec}.${tenth}`;
  };

  // Perhitungan sudut jungkat-jungkit timbangan di Tab 3
  const leftVal = leftNum / leftDen;
  const rightVal = rightNum / rightDen;
  const diffVal = rightVal - leftVal;
  const tiltAngle = Math.max(-14, Math.min(14, diffVal * 25));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* ========================================== */}
      {/* HEADER BAR & DOMPET TOKEN BEASISWA IGIL    */}
      {/* ========================================== */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white shadow-lg border-b border-indigo-700/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-indigo-950 flex items-center justify-center font-black text-xl shadow-md">
              ½
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-700/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-indigo-500">
                  Kelas 4 SD • Bab 2
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-semibold">
                  Zero-Cost Client-Side
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight mt-0.5">
                Petualangan Pecahan, Desimal & Persen
              </h1>
            </div>
          </div>

          {/* Panel Dompet Token Real-Time */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 border border-indigo-600 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Pengaturan Efek Suara"
            >
              <span>{soundEnabled ? "🔊 Suara ON" : "🔇 Suara OFF"}</span>
            </button>

            <div className="bg-indigo-950/90 border-2 border-amber-400/80 rounded-2xl px-4 py-1.5 flex items-center gap-3 shadow-inner">
              <div className="text-2xl animate-bounce">🪙</div>
              <div>
                <div className="text-[11px] text-amber-200 font-semibold uppercase tracking-wider">
                  Dompet Bab Ini (Maks 150)
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-amber-400">{totalTokens} Token</span>
                  <span className="text-xs font-bold text-emerald-400">
                    (= Rp {(totalTokens * TOKEN_PRICE_RP).toLocaleString("id-ID")})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasi 7 Tab */}
        <div className="max-w-6xl mx-auto px-4 pt-1 pb-2 flex overflow-x-auto gap-1.5 no-scrollbar">
          {[
            { id: 1, label: "1. Aktivasi Otak", icon: "🍕" },
            { id: 2, label: "2. Materi Buku", icon: "📘" },
            { id: 3, label: "3. Eksperimen Materi", icon: "🔬" },
            { id: 4, label: "4. Lab Timbangan PhET", icon: "⚖️" },
            { id: 5, label: "5. Kanvas & Stempel", icon: "🎨" },
            { id: 6, label: `6. Latihan (${practiceTokens}/50🪙)`, icon: "🎯" },
            { id: 7, label: `7. Evaluasi (${evalTokens}/100🪙)`, icon: "🏆" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                triggerSound("click");
                setActiveTab(tab.id as 1 | 2 | 3 | 4 | 5 | 6 | 7);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-amber-400 text-indigo-950 shadow-md scale-[1.02]"
                  : "bg-indigo-800/60 text-indigo-100 hover:bg-indigo-700/70"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ========================================== */}
      {/* KONTEN UTAMA PER TAB                       */}
      {/* ========================================== */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* ============================================================ */}
        {/* TAB 1: AKTIVASI OTAK (TEKA-TEKI INTERAKTIF JEBAKAN PIZZA)    */}
        {/* ============================================================ */}
        {activeTab === 1 && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Tantangan Pembuka Otak
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                  Misteri Jebakan Pizza: Pilih <span className="text-indigo-600">1/4</span> atau{" "}
                  <span className="text-rose-600">1/8</span>?
                </h2>
              </div>
              <button
                onClick={() =>
                  speakText(
                    "Halo teman-teman! Bayangkan kamu sedang sangat lapar. Ada dua loyang pizza berukuran sama. Loyang A dipotong empat, dan Loyang B dipotong delapan. Kalau kamu hanya boleh mengambil satu potong, mana yang ukurannya lebih besar? Klik potongan pizzanya untuk membuktikannya!"
                  )
                }
                className="self-start px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition"
              >
                <span>🗣️</span> Dengarkan Suara Guru AI
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 text-slate-700">
              <p className="font-medium text-base leading-relaxed">
                Banyak anak terkecoh! Mereka berpikir karena angka <strong>8 lebih besar dari 4</strong>, maka potongan{" "}
                <strong>1/8</strong> pasti lebih besar daripada <strong>1/4</strong>. Benarkah begitu?{" "}
                <span className="underline font-bold text-indigo-900">
                  Sentuh kedua loyang pizza di bawah ini untuk mengambil masing-masing 1 potong!
                </span>
              </p>
            </div>

            {/* Dua Loyang Pizza Interaktif */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loyang A: 1/4 */}
              <div
                onClick={() => {
                  triggerSound("slice");
                  setPizzaAClicked(true);
                }}
                className={`rounded-3xl p-6 border-2 transition-all cursor-pointer text-center ${
                  pizzaAClicked
                    ? "bg-indigo-50/70 border-indigo-500 shadow-lg"
                    : "bg-slate-50 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <div className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-1">
                  Loyang Pizza A (Dibagi 4 Anak)
                </div>
                <div className="text-3xl font-black text-slate-900 mb-3">
                  {pizzaAClicked ? "1 / 4 Bagian" : "Klik Pizza Ini! 👆"}
                </div>
                <InteractiveFractionCircle
                  numerator={pizzaAClicked ? 1 : 0}
                  denominator={4}
                  size={200}
                  activeColor="#4f46e5"
                  interactive={false}
                />
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  {pizzaAClicked
                    ? "Lihat! Potongan 1/4 sangat lebar dan mengenyangkan!"
                    : "Sentuh untuk mengambil 1 potong dari 4 bagian."}
                </p>
              </div>

              {/* Loyang B: 1/8 */}
              <div
                onClick={() => {
                  triggerSound("slice");
                  setPizzaBClicked(true);
                }}
                className={`rounded-3xl p-6 border-2 transition-all cursor-pointer text-center ${
                  pizzaBClicked
                    ? "bg-rose-50/70 border-rose-500 shadow-lg"
                    : "bg-slate-50 border-slate-200 hover:border-rose-300"
                }`}
              >
                <div className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-1">
                  Loyang Pizza B (Dibagi 8 Anak)
                </div>
                <div className="text-3xl font-black text-slate-900 mb-3">
                  {pizzaBClicked ? "1 / 8 Bagian" : "Klik Pizza Ini! 👆"}
                </div>
                <InteractiveFractionCircle
                  numerator={pizzaBClicked ? 1 : 0}
                  denominator={8}
                  size={200}
                  activeColor="#e11d48"
                  interactive={false}
                />
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  {pizzaBClicked
                    ? "Potongan 1/8 jauh lebih sempit karena dibagi ke lebih banyak orang!"
                    : "Sentuh untuk mengambil 1 potong dari 8 bagian."}
                </p>
              </div>
            </div>

            {/* Pertanyaan Konfirmasi */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-lg font-bold">
                Setelah kamu melihat ukurannya secara langsung, manakah potongan yang LEBIH BESAR?
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => {
                    triggerSound("correct");
                    setHookGuess("A");
                  }}
                  className={`px-6 py-3 rounded-xl font-extrabold text-base transition ${
                    hookGuess === "A"
                      ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-300"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  🍕 Potongan 1/4 Lebih Besar!
                </button>
                <button
                  onClick={() => {
                    triggerSound("wrong");
                    setHookGuess("B");
                  }}
                  className={`px-6 py-3 rounded-xl font-extrabold text-base transition ${
                    hookGuess === "B"
                      ? "bg-rose-600 text-white ring-4 ring-rose-300"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  🍕 Potongan 1/8 Lebih Besar
                </button>
              </div>

              {hookGuess === "A" && (
                <div className="bg-emerald-500/20 border border-emerald-400 rounded-xl p-4 text-emerald-200 text-sm md:text-base font-semibold animate-fadeIn">
                  🎉 <strong>TEPAT SEKALI!</strong> Semakin banyak orang yang membagi satu pizza (penyebut makin besar),
                  maka jatah tiap potongnya makin kecil! Jadi <strong>1/4 &gt; 1/8</strong>. Yuk lanjut ke{" "}
                  <button
                    onClick={() => setActiveTab(2)}
                    className="underline font-black text-amber-300 hover:text-amber-200 ml-1"
                  >
                    Tab 2: Materi Buku →
                  </button>
                </div>
              )}

              {hookGuess === "B" && (
                <div className="bg-rose-500/20 border border-rose-400 rounded-xl p-4 text-rose-200 text-sm font-semibold">
                  👀 Coba perhatikan gambar biru (1/4) dan merah (1/8) di atas! Warna biru pada Loyang A dua kali lebih
                  lebar daripada warna merah di Loyang B. Klik pilihan 1/4!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: MATERI BUKU SISWA (LOKAL, TANPA API)                  */}
        {/* ============================================================ */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    Buku Siswa • Bab 2 • Kelas IV
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                    Materi Pecahan dari Buku
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                    Lima bagian Bab 2: pembilang satu, penyebut sama, pecahan senilai, desimal, lalu persen.
                  </p>
                </div>
                <button
                  onClick={() =>
                    speakText(
                      "Bab dua pecahan. Kita belajar membandingkan pecahan, mencari pecahan senilai, membaca desimal, dan mengubahnya menjadi persen."
                    )
                  }
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
                >
                  🗣️ Dengarkan Tujuan
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-black">
                <span className="px-3 py-1.5 rounded-full bg-indigo-950 text-amber-300">Pecahan</span>
                <span className="text-slate-400">→</span>
                {["Pembilang 1", "Penyebut sama", "Senilai", "Desimal", "Persen"].map((nama) => (
                  <span key={nama} className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                    {nama}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { step: 1 as const, title: "A. Pembilang Satu", desc: "1/2 lebih besar dari 1/4" },
                { step: 2 as const, title: "B. Penyebut Sama", desc: "Bandingkan pembilang" },
                { step: 3 as const, title: "C. Pecahan Senilai", desc: "2/6 sama dengan 1/3" },
                { step: 4 as const, title: "D. Desimal", desc: "Persepuluh dan perseratus" },
                { step: 5 as const, title: "E. Persen", desc: "Dari seratus, lambang %" },
              ].map((m) => (
                <button
                  key={m.step}
                  onClick={() => {
                    triggerSound("click");
                    setMateriBagian(m.step);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    materiBagian === m.step
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-lg scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase opacity-80">{m.title}</div>
                  <div className="text-sm font-black mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {materiBagian === 1 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-900">A. Pecahan dengan Pembilang Satu</h3>
                  <button
                    onClick={() =>
                      speakText(
                        "Satu pizza dibagi empat. Tiap anak mendapat satu per empat. Satu per dua lebih besar daripada satu per empat, karena potongannya lebih lebar."
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/70 p-5 text-center">
                    <div className="text-xs font-extrabold uppercase text-indigo-700">Pizza dibagi 4 siswa</div>
                    <InteractiveFractionCircle numerator={1} denominator={4} size={180} activeColor="#4f46e5" />
                    <div className="mt-2 text-4xl font-black text-indigo-950">1/4</div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      Tiap anak mendapat 1 dari 4 bagian yang sama.
                    </p>
                  </div>
                  <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5 space-y-3">
                    <div className="text-center">
                      <div className="text-xs font-bold text-amber-700 uppercase">Pembilang</div>
                      <div className="text-5xl font-black text-amber-500">1</div>
                      <div className="mx-auto my-2 h-1.5 w-24 rounded-full bg-slate-800" />
                      <div className="text-5xl font-black text-indigo-600">4</div>
                      <div className="text-xs font-bold text-indigo-700 uppercase">Penyebut</div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Angka atas menghitung bagian yang diambil. Angka bawah menghitung seluruh potongan yang sama besar.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center justify-center gap-3">
                      <InteractiveFractionCircle numerator={1} denominator={2} size={110} activeColor="#4f46e5" />
                      <span className="text-3xl font-black text-emerald-700">&gt;</span>
                      <InteractiveFractionCircle numerator={1} denominator={4} size={110} activeColor="#e11d48" />
                    </div>
                    <p className="mt-2 text-center text-sm font-black text-emerald-950">1/2 &gt; 1/4. Daerah 1/2 lebih luas.</p>
                  </div>
                  <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
                    <div className="flex items-center justify-center gap-3">
                      <InteractiveFractionCircle numerator={1} denominator={10} size={110} activeColor="#e11d48" />
                      <span className="text-3xl font-black text-rose-700">&lt;</span>
                      <InteractiveFractionCircle numerator={1} denominator={5} size={110} activeColor="#4f46e5" />
                    </div>
                    <p className="mt-2 text-center text-sm font-black text-rose-950">1/10 &lt; 1/5. Penyebut lebih besar, potongan lebih kecil.</p>
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950">
                  Tiara punya bawang putih 1/2 kg dan gula 1/4 kg. Bawang putih lebih berat, karena 1/2 &gt; 1/4.
                </div>
              </div>
            )}

            {materiBagian === 2 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-900">B. Pecahan dengan Penyebut Sama</h3>
                  <button
                    onClick={() =>
                      speakText(
                        "Penyebut yang sama berarti potongannya sama besar. Bandingkan pembilangnya. Tiga lebih besar dari dua, jadi tiga per enam lebih panjang dari dua per enam."
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 rounded-2xl border-2 border-slate-200 p-4">
                    <div className="text-xs font-extrabold text-indigo-700">1/3 &lt; 2/3</div>
                    <div className="flex h-12 overflow-hidden rounded-xl border-2 border-slate-800">
                      <div className="flex w-1/3 items-center justify-center bg-indigo-600 font-black text-white">1/3</div>
                    </div>
                    <div className="flex h-12 overflow-hidden rounded-xl border-2 border-slate-800">
                      <div className="flex w-2/3 items-center justify-center bg-indigo-600 font-black text-white">2/3</div>
                    </div>
                    <p className="text-sm font-semibold text-slate-600">Penyebut sama-sama 3. Pembilang 1 lebih kecil dari 2.</p>
                  </div>
                  <div className="space-y-2 rounded-2xl border-2 border-slate-200 p-4">
                    <div className="text-xs font-extrabold text-amber-800">2/10 &gt; 1/10</div>
                    <div className="grid h-12 grid-cols-10 overflow-hidden rounded-xl border-2 border-slate-800">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className={`border-r border-slate-800 ${i < 2 ? "bg-amber-500" : "bg-white"}`} />
                      ))}
                    </div>
                    <div className="grid h-12 grid-cols-10 overflow-hidden rounded-xl border-2 border-slate-800">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={`b-${i}`} className={`border-r border-slate-800 ${i < 1 ? "bg-rose-500" : "bg-white"}`} />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-600">Dua potong dari sepuluh lebih banyak daripada satu potong.</p>
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-950">
                    Tongkat Asep 3/6 meter. Tongkat Azizah 2/6 meter. Penyebut sama, 3 &gt; 2, jadi tongkat Asep lebih panjang.
                  </p>
                  <div className="mt-3 grid grid-cols-6 gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-md border ${i < 3 ? "bg-emerald-500 border-emerald-700" : "bg-white border-slate-300"}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs font-bold text-emerald-800">3/6 meter Asep</div>
                  <div className="mt-2 grid grid-cols-6 gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-md border ${i < 2 ? "bg-amber-400 border-amber-600" : "bg-white border-slate-300"}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs font-bold text-amber-800">2/6 meter Azizah</div>
                </div>
              </div>
            )}

            {materiBagian === 3 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-900">C. Pecahan Senilai</h3>
                  <button
                    onClick={() =>
                      speakText(
                        "Pecahan senilai luasnya sama. Dua per enam sama dengan satu per tiga. Kalikan atau bagikan pembilang dan penyebut dengan bilangan yang sama."
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                  <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center">
                    <div className="text-xs font-extrabold uppercase text-emerald-800">Cokelat Putu</div>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <InteractiveFractionCircle numerator={2} denominator={6} size={120} activeColor="#10b981" />
                      <span className="text-3xl font-black text-emerald-700">=</span>
                      <InteractiveFractionCircle numerator={1} denominator={3} size={120} activeColor="#10b981" />
                    </div>
                    <p className="mt-2 text-lg font-black text-emerald-950">2/6 = 1/3</p>
                    <p className="text-sm font-semibold text-slate-600">
                      Batang dibagi 6, Putu mendapat 2. Batang dibagi 3, Putu mendapat 1. Luasnya sama.
                    </p>
                  </div>
                  <div className="space-y-3 rounded-3xl border-2 border-slate-200 p-4">
                    <div className="rounded-2xl bg-slate-900 p-4 text-center text-white">
                      <div className="text-xl font-black">1/3 = (1 × 2) / (3 × 2) = 2/6</div>
                      <div className="mt-2 text-xl font-black text-amber-300">2/6 = (2 ÷ 2) / (6 ÷ 2) = 1/3</div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Kertas dilipat 4, satu kotak diwarnai: 1/4. Kertas lain dilipat 16, empat kotak diwarnai: 4/16. Luas warna itu sama, jadi 1/4 = 4/16.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {materiBagian === 4 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-900">D. Desimal Persepuluhan dan Perseratusan</h3>
                  <button
                    onClick={() =>
                      speakText(
                        "Satu roti dari sepuluh ditulis nol koma satu. Satu biskuit dari seratus ditulis nol koma nol satu. Satu angka di belakang koma berarti persepuluh. Dua angka berarti perseratus."
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
                    <div className="text-xs font-extrabold uppercase text-amber-800">10 roti, 1 berselai</div>
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex h-12 items-center justify-center rounded-xl border-2 text-xl ${
                            i < 1 ? "border-amber-700 bg-amber-400" : "border-amber-200 bg-white"
                          }`}
                        >
                          🍞
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-center text-2xl font-black text-amber-950">1/10 = 0,1</p>
                    <p className="text-center text-sm font-semibold text-slate-600">Tiga roti berselai: 3/10 = 0,3</p>
                  </div>
                  <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
                    <div className="text-xs font-extrabold uppercase text-indigo-800">100 biskuit, 25 berselai</div>
                    <div className="mx-auto mt-3 grid w-40 grid-cols-10 gap-0.5 rounded-lg bg-slate-200 p-1">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className={`aspect-square rounded-[1px] ${i < 25 ? "bg-indigo-600" : "bg-white"}`} />
                      ))}
                    </div>
                    <p className="mt-3 text-lg font-black text-indigo-950">25/100 = 0,25</p>
                    <p className="text-sm font-semibold text-slate-600">1/100 = 0,01 dan 7/100 = 0,07</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold">
                  <div className="rounded-2xl bg-slate-900 p-4 text-white">1 angka di belakang koma → penyebut 10. Contoh 0,4 = 4/10.</div>
                  <div className="rounded-2xl bg-slate-900 p-4 text-white">2 angka di belakang koma → penyebut 100. Contoh 0,25 = 25/100.</div>
                </div>
              </div>
            )}

            {materiBagian === 5 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-900">E. Desimal Perseratusan dan Persen</h3>
                  <button
                    onClick={() =>
                      speakText(
                        `Persen adalah pecahan berpenyebut seratus. Pada papan ini ${persenPetak} petak menyala, jadi nilainya ${persenPetak} persen. Dua puluh dari lima puluh siswa sama dengan empat puluh persen.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  Di swalayan, diskon ditulis dengan lambang %. 5% artinya 5/100.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
                    <div className="mx-auto grid max-w-[280px] grid-cols-10 gap-1">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            triggerSound("click");
                            setPersenPetak(i + 1);
                          }}
                          className={`aspect-square rounded-[4px] border ${
                            i < persenPetak ? "border-indigo-800 bg-indigo-600" : "border-slate-300 bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 5, label: "5%" },
                        { val: 25, label: "0,25" },
                        { val: 35, label: "0,35" },
                        { val: 40, label: "20/50" },
                        { val: 60, label: "6/10" },
                        { val: 75, label: "0,75" },
                      ].map((pilihan) => (
                        <button
                          key={pilihan.val}
                          onClick={() => {
                            triggerSound("slice");
                            setPersenPetak(pilihan.val);
                          }}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-black ${
                            persenPetak === pilihan.val
                              ? "border-amber-600 bg-amber-400 text-slate-950"
                              : "border-slate-300 bg-white text-slate-700"
                          }`}
                        >
                          {pilihan.label}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3">
                        <div className="text-[11px] font-extrabold uppercase text-indigo-700">Perseratus</div>
                        <div className="text-2xl font-black">{persenPetak}/100</div>
                      </div>
                      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
                        <div className="text-[11px] font-extrabold uppercase text-emerald-700">Desimal</div>
                        <div className="text-2xl font-black">
                          {persenPetak === 100 ? "1,00" : `0,${String(persenPetak).padStart(2, "0")}`}
                        </div>
                      </div>
                      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
                        <div className="text-[11px] font-extrabold uppercase text-amber-800">Persen</div>
                        <div className="text-2xl font-black">{persenPetak}%</div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-900 p-4 text-sm font-semibold text-white space-y-1">
                      <p>0,75 = 75/100 = 75%.</p>
                      <p>0,35 = 35%. Angka 2,46 = 246%.</p>
                      <p>20 siswa dari 50: 20/50 = 40/100 = 40%.</p>
                      <p>6 benar dari 10 soal: 6/10 = 60/100 = 60%.</p>
                      <p>30 siswa dari 100 ikut lomba lari = 30%.</p>
                      <p>Geser koma dua langkah ke kanan: 0,25 → 25%, dan 2,36 → 236%.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-between gap-3">
              <button
                onClick={() => {
                  triggerSound("click");
                  if (materiBagian === 1) setActiveTab(1);
                  else setMateriBagian((materiBagian - 1) as 1 | 2 | 3 | 4 | 5);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm"
              >
                ← Kembali
              </button>
              <button
                onClick={() => {
                  triggerSound(materiBagian === 5 ? "fanfare" : "click");
                  if (materiBagian === 5) setActiveTab(3);
                  else setMateriBagian((materiBagian + 1) as 1 | 2 | 3 | 4 | 5);
                }}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md"
              >
                {materiBagian === 5 ? "Lanjut ke Eksperimen Materi →" : "Bagian berikutnya →"}
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: EKSPERIMEN MATERI 4 MISI ("UNLOCK BY DOING")          */}
        {/* ============================================================ */}
        {activeTab === 3 && (
          <div className="space-y-6">
            {/* Stepper 4 Misi Kurikulum Merdeka */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "Misi 1: Pembilang & Penyebut", desc: "Memotong Cokelat" },
                { step: 2, title: "Misi 2: Pecahan Pembilang 1", desc: "Membandingkan Ukuran" },
                { step: 3, title: "Misi 3: Pecahan Senilai", desc: "Mesin Kloning Balok" },
                { step: 4, title: "Misi 4: Desimal & Persen", desc: "Papan 100 Petak" },
              ].map((m) => (
                <button
                  key={m.step}
                  onClick={() => {
                    triggerSound("click");
                    setMissionStep(m.step as 1 | 2 | 3 | 4);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    missionStep === m.step
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-lg scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase opacity-80">{m.title}</div>
                  <div className="text-sm font-black mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {/* ISI MISI 1: PISAU COKELAT (PEMBILANG & PENYEBUT) */}
            {missionStep === 1 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Misi Eksperimen 1 dari 4
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      Apa Itu Pembilang (Atas) dan Penyebut (Bawah)?
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        `Saat ini cokelat dipotong menjadi ${chocoCut} bagian sama besar, itulah Penyebut di bagian bawah. Dan kamu mengambil ${chocoEaten} potong cokelat, itulah Pembilang di bagian atas. Jadi nilainya adalah ${chocoEaten} per ${chocoCut}.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>

                {/* Simulator Pisau Cokelat Interaktif */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6">
                  {/* Angka Pecahan Raksasa */}
                  <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 text-center shadow-sm">
                    <div className="text-xs font-bold text-amber-700 uppercase">PEMBILANG (Potongan Diambil)</div>
                    <div className="text-5xl font-black text-amber-500 my-1">{chocoEaten}</div>
                    <div className="h-1.5 bg-slate-800 rounded-full w-24 mx-auto my-2" />
                    <div className="text-5xl font-black text-indigo-600 my-1">{chocoCut}</div>
                    <div className="text-xs font-bold text-indigo-700 uppercase">PENYEBUT (Total Potongan Utuh)</div>
                  </div>

                  {/* Visual Cokelat Batang yang Bisa Diklik */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-700">
                        1. Pilih Pisau Pemotong (Ubah Penyebut):
                      </span>
                      <div className="flex gap-1.5">
                        {[2, 3, 4, 5, 6, 8, 10].map((cut) => (
                          <button
                            key={cut}
                            onClick={() => {
                              triggerSound("slice");
                              setChocoCut(cut);
                              setChocoEaten(Math.min(chocoEaten, cut));
                            }}
                            className={`px-3 py-1.5 rounded-lg font-extrabold text-xs transition ${
                              chocoCut === cut
                                ? "bg-indigo-600 text-white shadow"
                                : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            🔪 Potong {cut}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm font-bold text-slate-700">
                      2. Klik kepingan cokelat di bawah untuk mengambil/memakannya (Ubah Pembilang):
                    </div>

                    {/* Batang Cokelat SVG Interaktif */}
                    <div className="grid grid-cols-10 gap-1.5 bg-amber-950/10 p-3 rounded-2xl border border-amber-300">
                      {Array.from({ length: chocoCut }).map((_, idx) => {
                        const isSelected = idx < chocoEaten;
                        return (
                          <button
                            key={idx}
                            style={{ gridColumn: `span ${Math.floor(10 / chocoCut) || 1}` }}
                            onClick={() => {
                              triggerSound("coin");
                              setChocoEaten(idx + 1 === chocoEaten ? idx : idx + 1);
                            }}
                            className={`h-20 rounded-xl border-2 font-black text-sm flex flex-col items-center justify-center transition-all ${
                              isSelected
                                ? "bg-amber-500 border-amber-700 text-white shadow-md -translate-y-1"
                                : "bg-amber-900/20 border-amber-900/30 text-amber-900 hover:bg-amber-200"
                            }`}
                          >
                            <span>🍫</span>
                            <span className="text-xs mt-1">1/{chocoCut}</span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs md:text-sm font-semibold text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                      💡 <strong>Rumus Kunci:</strong> Jika kamu mengambil semua potongan ({chocoCut}/{chocoCut}), maka
                      nilainya kembali menjadi <strong>1 Cokelat Utuh!</strong>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      triggerSound("click");
                      setMissionStep(2);
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md"
                  >
                    Lanjut ke Misi 2: Membandingkan Pecahan →
                  </button>
                </div>
              </div>
            )}

            {/* ISI MISI 2: MEMBANDINGKAN PECAHAN PEMBILANG 1 & PENYEBUT SAMA */}
            {missionStep === 2 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Misi Eksperimen 2 dari 4
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      Hukum Kebalikan pada Pecahan Berpembilang Satu
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        "Geser tombol penyebut di bawah ini. Perhatikan bagaimana batang pecahan satu per dua jauh lebih panjang daripada satu per sepuluh. Jadi, jika pembilangnya sama-sama satu, penyebut yang lebih kecil justru bernilai lebih besar!"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-bold text-slate-800">
                      Geser untuk membandingkan <strong>1/2</strong> dengan <strong>1/{unitDenom}</strong>:
                    </span>
                    <input
                      type="range"
                      min={2}
                      max={10}
                      value={unitDenom}
                      onChange={(e) => {
                        triggerSound("slice");
                        setUnitDenom(Number(e.target.value));
                      }}
                      className="w-48 accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  {/* Bar 1/2 Tetap */}
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-indigo-700">Batang Patokan: 1/2 (Setengah Bagian)</div>
                    <div className="w-full h-10 bg-slate-200 rounded-xl overflow-hidden flex border border-slate-300">
                      <div className="w-1/2 bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                        1/2
                      </div>
                    </div>
                  </div>

                  {/* Bar 1/unitDenom Dinamis */}
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-rose-700">
                      Batang Uji Coba: 1/{unitDenom} (Satu per {unitDenom})
                    </div>
                    <div className="w-full h-10 bg-slate-200 rounded-xl overflow-hidden flex border border-slate-300">
                      <div
                        style={{ width: `${100 / unitDenom}%` }}
                        className="bg-rose-500 text-white font-black text-sm flex items-center justify-center transition-all duration-300"
                      >
                        1/{unitDenom}
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-950 text-white rounded-2xl p-4 text-center font-extrabold text-lg">
                    Kesimpulan Visual: <span className="text-amber-300">1/2</span>{" "}
                    {unitDenom === 2 ? "=" : ">"} <span className="text-rose-300">1/{unitDenom}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setMissionStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={() => {
                      triggerSound("click");
                      setMissionStep(3);
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md"
                  >
                    Lanjut ke Misi 3: Mesin Pecahan Senilai →
                  </button>
                </div>
              </div>
            )}

            {/* ISI MISI 3: MESIN KLONING PECAHAN SENILAI */}
            {missionStep === 3 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Misi Eksperimen 3 dari 4
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      Mesin Kloning Pecahan Senilai: Angka Berbeda, Ukuran Tetap Sama!
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        `Tekan tombol Lipat Ganda di bawah. Perhatikan bahwa meskipun garis potongnya bertambah rapat menjadi ${
                          1 * equivMultiplier
                        } per ${
                          2 * equivMultiplier
                        }, luas warna hijau yang diarsir sama sekali tidak berubah! Itulah yang disebut Pecahan Senilai.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-bold text-emerald-950">
                      Klik tombol pembelah untuk mengalikan Pembilang & Penyebut:
                    </span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            triggerSound("slice");
                            setEquivMultiplier(m);
                          }}
                          className={`px-4 py-2 rounded-xl font-black text-xs transition ${
                            equivMultiplier === m
                              ? "bg-emerald-600 text-white shadow-md scale-105"
                              : "bg-white text-emerald-800 border border-emerald-300"
                          }`}
                        >
                          Kali ×{m} ({1 * m}/{2 * m})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Perbandingan Visual Atas (1/2) vs Bawah (Senilai) */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-600">Balok Asli (1/2):</div>
                    <div className="grid grid-cols-2 h-14 rounded-2xl overflow-hidden border-2 border-slate-800">
                      <div className="bg-emerald-500 flex items-center justify-center text-white font-black text-lg border-r-2 border-slate-800">
                        1/2
                      </div>
                      <div className="bg-white" />
                    </div>

                    <div className="text-xs font-bold text-slate-600">
                      Balok Hasil Belah ×{equivMultiplier} ({1 * equivMultiplier}/{2 * equivMultiplier}):
                    </div>
                    <div
                      style={{ gridTemplateColumns: `repeat(${2 * equivMultiplier}, minmax(0, 1fr))` }}
                      className="grid h-14 rounded-2xl overflow-hidden border-2 border-slate-800"
                    >
                      {Array.from({ length: 2 * equivMultiplier }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-center font-bold text-xs border-r border-slate-800 ${
                            i < 1 * equivMultiplier ? "bg-emerald-500 text-white" : "bg-white text-slate-400"
                          }`}
                        >
                          1/{2 * equivMultiplier}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-emerald-300 text-center">
                    <div className="text-xl md:text-2xl font-black text-slate-900">
                      1/2 = <span className="text-emerald-600">(1 × {equivMultiplier})</span> /{" "}
                      <span className="text-indigo-600">(2 × {equivMultiplier})</span> ={" "}
                      <span className="bg-amber-300 px-3 py-1 rounded-xl">
                        {1 * equivMultiplier}/{2 * equivMultiplier}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setMissionStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={() => {
                      triggerSound("click");
                      setMissionStep(4);
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md"
                  >
                    Lanjut ke Misi 4: Desimal & Persen →
                  </button>
                </div>
              </div>
            )}

            {/* ISI MISI 4: PAPAN 100 PETAK (DESIMAL & PERSEN) */}
            {missionStep === 4 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Misi Eksperimen 4 dari 4
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      Papan 100 Petak: Mengubah Pecahan Biasa ke Desimal & Persen (%)
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        `Pada papan seratus petak ini, terdapat ${gridFilledCount} petak yang menyala. Sebagai pecahan perseratusan nilainya ${gridFilledCount} per seratus, sebagai desimal ditulis nol koma ${String(
                          gridFilledCount
                        ).padStart(2, "0")}, dan sebagai persen adalah ${gridFilledCount} persen!`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    🗣️ Suara Penjelasan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Papan Grid 10x10 Interaktif */}
                  <div className="bg-slate-100 p-4 rounded-3xl border-2 border-slate-300">
                    <div className="text-xs font-bold text-slate-600 mb-2 text-center">
                      Sentuh petak mana saja atau gunakan tombol cepat di kanan:
                    </div>
                    <div className="grid grid-cols-10 gap-1 max-w-[300px] mx-auto">
                      {Array.from({ length: 100 }).map((_, idx) => {
                        const active = idx < gridFilledCount;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              triggerSound("click");
                              setGridFilledCount(idx + 1);
                            }}
                            className={`aspect-square rounded-[4px] border transition-colors ${
                              active
                                ? "bg-indigo-600 border-indigo-800"
                                : "bg-white border-slate-300 hover:bg-indigo-100"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel Konversi Otomatis 3 Bahasa Matematika */}
                  <div className="space-y-4">
                    <div className="text-sm font-bold text-slate-700">Pilih Angka Cepat:</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 10, label: "10/100 (1/10)" },
                        { val: 25, label: "25/100 (1/4)" },
                        { val: 50, label: "50/100 (1/2)" },
                        { val: 75, label: "75/100 (3/4)" },
                        { val: 100, label: "100/100 (Utuh)" },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          onClick={() => {
                            triggerSound("slice");
                            setGridFilledCount(preset.val);
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition ${
                            gridFilledCount === preset.val
                              ? "bg-amber-400 border-amber-600 text-slate-950"
                              : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4">
                        <div className="text-[11px] font-extrabold text-indigo-700 uppercase">Pecahan Perseratus</div>
                        <div className="text-2xl font-black text-indigo-950 mt-1">{gridFilledCount}/100</div>
                      </div>
                      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
                        <div className="text-[11px] font-extrabold text-emerald-700 uppercase">Pecahan Desimal</div>
                        <div className="text-2xl font-black text-emerald-950 mt-1">
                          {gridFilledCount === 100
                            ? "1,00"
                            : `0,${String(gridFilledCount).padStart(2, "0")}`}
                        </div>
                      </div>
                      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
                        <div className="text-[11px] font-extrabold text-amber-800 uppercase">Bentuk Persen</div>
                        <div className="text-2xl font-black text-amber-950 mt-1">{gridFilledCount}%</div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl text-xs md:text-sm leading-relaxed">
                      🎯 <strong>Ingat Cara Cepatnya:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-slate-200">
                        <li>
                          <strong>Persepuluhan (/10):</strong> 1 angka di belakang koma (contoh: 3/10 = <strong>0,3</strong>).
                        </li>
                        <li>
                          <strong>Perseratusan (/100):</strong> 2 angka di belakang koma & langsung jadi{" "}
                          <strong>Persen (%)</strong> (contoh: 25/100 = <strong>0,25</strong> = <strong>25%</strong>).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setMissionStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={() => {
                      triggerSound("fanfare");
                      setActiveTab(4);
                    }}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md"
                  >
                    Buka Lab Timbangan PhET (Tab 4) →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SIMULATOR PHET-STYLE (TIMBANGAN JUNGKAT-JUNGKIT)      */}
        {/* ============================================================ */}
        {activeTab === 4 && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Laboratorium Interaktif PhET-Style
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Timbangan Pecahan & Detektor Pecahan Senilai
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    triggerSound("click");
                    setSimShape("pizza");
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs ${
                    simShape === "pizza" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  🍕 Mode Lingkaran Pizza
                </button>
                <button
                  onClick={() => {
                    triggerSound("click");
                    setSimShape("bar");
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs ${
                    simShape === "bar" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  🍫 Mode Batang Pecahan
                </button>
              </div>
            </div>

            {/* Panel Kontrol Kiri vs Kanan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Pecahan Kiri */}
              <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-3xl p-5 text-center space-y-4">
                <div className="text-xs font-extrabold uppercase text-indigo-700">PECAHAN KIRI (BIRU)</div>
                <div className="text-4xl font-black text-indigo-950">
                  {leftNum} / {leftDen}
                </div>
                <div className="text-xs font-bold text-slate-500">
                  Desimal: {(leftNum / leftDen).toFixed(2).replace(".", ",")} | Persen:{" "}
                  {Math.round((leftNum / leftDen) * 100)}%
                </div>

                {simShape === "pizza" ? (
                  <InteractiveFractionCircle
                    numerator={leftNum}
                    denominator={leftDen}
                    size={165}
                    activeColor="#4f46e5"
                    interactive={true}
                    onSliceClick={(newNum) => setLeftNum(newNum)}
                  />
                ) : (
                  <div className="h-14 bg-white rounded-xl border-2 border-slate-800 overflow-hidden flex">
                    {Array.from({ length: leftDen }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          triggerSound("slice");
                          setLeftNum(i + 1 === leftNum ? i : i + 1);
                        }}
                        className={`flex-1 border-r border-slate-700 cursor-pointer flex items-center justify-center text-xs font-bold ${
                          i < leftNum ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        1/{leftDen}
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
                  <div className="bg-white p-2 rounded-xl border border-indigo-200">
                    <div>Pembilang: {leftNum}</div>
                    <div className="flex justify-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setLeftNum(Math.max(0, leftNum - 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-200 font-black"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setLeftNum(Math.min(leftDen, leftNum + 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-indigo-200">
                    <div>Penyebut: {leftDen}</div>
                    <div className="flex justify-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          triggerSound("click");
                          const nextDen = Math.max(1, leftDen - 1);
                          setLeftDen(nextDen);
                          setLeftNum(Math.min(leftNum, nextDen));
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-200 font-black"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setLeftDen(Math.min(12, leftDen + 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tengah: Timbangan Jungkat-Jungkit Dinamis */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div
                  className={`px-5 py-2 rounded-2xl font-black text-base text-center shadow-sm border-2 ${
                    Math.abs(leftVal - rightVal) < 0.0001
                      ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                      : "bg-amber-100 border-amber-400 text-amber-900"
                  }`}
                >
                  {Math.abs(leftVal - rightVal) < 0.0001
                    ? "⚖️ SEIMBANG! (PECAHAN SENILAI)"
                    : leftVal > rightVal
                    ? "👈 PECAHAN KIRI LEBIH BESAR (>)"
                    : "👉 PECAHAN KANAN LEBIH BESAR (<)"}
                </div>

                <div className="text-5xl font-black text-slate-900 bg-slate-100 px-6 py-3 rounded-2xl border-2 border-slate-300">
                  {leftNum}/{leftDen}{" "}
                  <span className="text-amber-600">
                    {Math.abs(leftVal - rightVal) < 0.0001 ? "=" : leftVal > rightVal ? ">" : "<"}
                  </span>{" "}
                  {rightNum}/{rightDen}
                </div>

                {/* SVG Timbangan Jungkat-Jungkit */}
                <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
                  <g
                    transform={`rotate(${tiltAngle}, 120, 70)`}
                    className="transition-transform duration-500 ease-out"
                  >
                    {/* Papan Timbangan */}
                    <rect x="20" y="64" width="200" height="10" rx="5" fill="#334155" />
                    {/* Beban Kiri */}
                    <rect x="30" y="34" width="45" height="30" rx="6" fill="#4f46e5" />
                    <text x="52" y="54" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                      {leftNum}/{leftDen}
                    </text>
                    {/* Beban Kanan */}
                    <rect x="165" y="34" width="45" height="30" rx="6" fill="#f59e0b" />
                    <text x="187" y="54" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                      {rightNum}/{rightDen}
                    </text>
                  </g>
                  {/* Tumpuan Segitiga */}
                  <polygon points="120,72 95,120 145,120" fill="#0f172a" />
                  <circle cx="120" cy="72" r="6" fill="#f59e0b" />
                </svg>
              </div>

              {/* Pecahan Kanan */}
              <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-5 text-center space-y-4">
                <div className="text-xs font-extrabold uppercase text-amber-800">PECAHAN KANAN (EMAS)</div>
                <div className="text-4xl font-black text-amber-950">
                  {rightNum} / {rightDen}
                </div>
                <div className="text-xs font-bold text-slate-500">
                  Desimal: {(rightNum / rightDen).toFixed(2).replace(".", ",")} | Persen:{" "}
                  {Math.round((rightNum / rightDen) * 100)}%
                </div>

                {simShape === "pizza" ? (
                  <InteractiveFractionCircle
                    numerator={rightNum}
                    denominator={rightDen}
                    size={165}
                    activeColor="#f59e0b"
                    interactive={true}
                    onSliceClick={(newNum) => setRightNum(newNum)}
                  />
                ) : (
                  <div className="h-14 bg-white rounded-xl border-2 border-slate-800 overflow-hidden flex">
                    {Array.from({ length: rightDen }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          triggerSound("slice");
                          setRightNum(i + 1 === rightNum ? i : i + 1);
                        }}
                        className={`flex-1 border-r border-slate-700 cursor-pointer flex items-center justify-center text-xs font-bold ${
                          i < rightNum ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        1/{rightDen}
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
                  <div className="bg-white p-2 rounded-xl border border-amber-200">
                    <div>Pembilang: {rightNum}</div>
                    <div className="flex justify-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setRightNum(Math.max(0, rightNum - 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-200 font-black"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setRightNum(Math.min(rightDen, rightNum + 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200">
                    <div>Penyebut: {rightDen}</div>
                    <div className="flex justify-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          triggerSound("click");
                          const nextDen = Math.max(1, rightDen - 1);
                          setRightDen(nextDen);
                          setRightNum(Math.min(rightNum, nextDen));
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-200 font-black"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("click");
                          setRightDen(Math.min(12, rightDen + 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: SMART KANVAS + STEMPEL PECAHAN                        */}
        {/* ============================================================ */}
        {activeTab === 5 && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Papan Coretan & Stempel Pecahan Lokal
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Kanvas Eksplorasi Mandiri (100% Client-Side)
                </h2>
              </div>
              <div className="flex gap-2">
                {canvasMissions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCanvasMissionIdx(i)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                      canvasMissionIdx === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Tantangan #{i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 font-bold text-sm text-amber-950">
              🎯 {canvasMissions[canvasMissionIdx]}
            </div>

            {/* Toolbar Stempel & Pena */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => stampFractionToCanvas("circle4")}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm"
                >
                  ➕ Stempel Pizza 1/4
                </button>
                <button
                  onClick={() => stampFractionToCanvas("bar24")}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                >
                  ➕ Stempel Batang 1/2 & 2/4
                </button>
                <div className="h-6 w-[1px] bg-slate-300 mx-1" />
                {[
                  { color: "#2563eb", name: "Biru" },
                  { color: "#e11d48", name: "Merah" },
                  { color: "#16a34a", name: "Hijau" },
                  { color: "#d97706", name: "Oranye" },
                  { color: "#0f172a", name: "Hitam" },
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setBrushColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-7 h-7 rounded-full border-2 ${
                      brushColor === c.color ? "ring-4 ring-indigo-300 border-white" : "border-transparent"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    triggerSound("click");
                    drawCanvasGrid();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs"
                >
                  🗑️ Bersihkan Kanvas
                </button>
              </div>
            </div>

            <div className="border-2 border-slate-300 rounded-2xl overflow-hidden shadow-inner bg-white">
              <canvas
                ref={canvasRef}
                width={850}
                height={340}
                onMouseDown={startCanvasDraw}
                onMouseMove={moveCanvasDraw}
                onMouseUp={stopCanvasDraw}
                onMouseLeave={stopCanvasDraw}
                onTouchStart={startCanvasDraw}
                onTouchMove={moveCanvasDraw}
                onTouchEnd={stopCanvasDraw}
                className="w-full h-[320px] cursor-crosshair touch-none"
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: 10 SOAL LATIHAN MANDIRI (+5 TOKEN / SOAL = 50 TOKEN)  */}
        {/* ============================================================ */}
        {activeTab === 6 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Latihan Mandiri Bervisual • +5 Token / Soal Benar
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  10 Misi Latihan Pecahan (Total 50 Token = Rp 25.000)
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-amber-50 border-2 border-amber-300 px-4 py-2 rounded-2xl text-right">
                  <div className="text-[11px] font-bold text-amber-800 uppercase">Token Latihan Terkumpul</div>
                  <div className="text-lg font-black text-amber-950">
                    {practiceTokens} / 50 🪙 (Rp {(practiceTokens * TOKEN_PRICE_RP).toLocaleString("id-ID")})
                  </div>
                </div>
                <button
                  onClick={() => {
                    triggerSound("click");
                    setPracticeQuestions(generateDynamicQuestions(false));
                    setPracticeAnswers({});
                    setPracticeChecked({});
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  🔄 Acak Angka Soal Baru
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {practiceQuestions.map((q, idx) => {
                const isChecked = practiceChecked[q.id];
                const selected = practiceAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-3xl shadow-md border-2 p-6 transition-all ${
                      isChecked
                        ? isCorrect
                          ? "border-emerald-400 bg-emerald-50/20"
                          : "border-rose-400 bg-rose-50/20"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      {/* Visual SVG Otomatis Sesuai Soal */}
                      <div className="w-full md:w-52 bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                        {q.visualType === "circle" && (
                          <InteractiveFractionCircle
                            numerator={q.num1}
                            denominator={q.den1}
                            size={130}
                            activeColor="#4f46e5"
                          />
                        )}
                        {q.visualType === "compare" && (
                          <div className="flex items-center gap-2">
                            <InteractiveFractionCircle
                              numerator={q.num1}
                              denominator={q.den1}
                              size={80}
                              activeColor="#4f46e5"
                            />
                            <span className="font-black text-slate-400">VS</span>
                            <InteractiveFractionCircle
                              numerator={q.num2 || 1}
                              denominator={q.den2 || 2}
                              size={80}
                              activeColor="#e11d48"
                            />
                          </div>
                        )}
                        {q.visualType === "equivalent" && (
                          <div className="flex items-center gap-2">
                            <InteractiveFractionCircle
                              numerator={q.num1}
                              denominator={q.den1}
                              size={80}
                              activeColor="#10b981"
                            />
                            <span className="font-black text-emerald-600">=</span>
                            <InteractiveFractionCircle
                              numerator={q.num2 || 2}
                              denominator={q.den2 || 4}
                              size={80}
                              activeColor="#10b981"
                            />
                          </div>
                        )}
                        {q.visualType === "decimalGrid" && (
                          <div className="grid grid-cols-10 gap-0.5 w-28 h-28 bg-slate-200 p-1 rounded-lg">
                            {Array.from({ length: 100 }).map((_, i) => (
                              <div
                                key={i}
                                className={`rounded-[1px] ${i < q.num1 ? "bg-indigo-600" : "bg-white"}`}
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-[11px] font-bold text-slate-500 mt-2">Visual Soal #{idx + 1}</span>
                      </div>

                      {/* Teks & Pilihan Ganda */}
                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                            Soal Latihan #{idx + 1}
                          </span>
                          <span className="text-xs font-extrabold text-amber-600">+5 Token (Rp 2.500)</span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium">{q.story}</p>
                        <h3 className="text-base md:text-lg font-extrabold text-slate-900">{q.question}</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              disabled={isChecked}
                              onClick={() => {
                                triggerSound("click");
                                setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }));
                              }}
                              className={`py-2.5 px-3 rounded-xl font-extrabold text-sm border-2 transition ${
                                selected === opt
                                  ? "bg-indigo-600 text-white border-indigo-700 shadow"
                                  : "bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {!isChecked ? (
                          <div className="pt-2">
                            <button
                              onClick={() => handleCheckPractice(q)}
                              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm"
                            >
                              ✔ Periksa Jawaban & Tambang +5 Token
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`p-3.5 rounded-2xl text-xs md:text-sm font-semibold mt-2 ${
                              isCorrect
                                ? "bg-emerald-100 text-emerald-950 border border-emerald-300"
                                : "bg-rose-100 text-rose-950 border border-rose-300"
                            }`}
                          >
                            <div>
                              {isCorrect
                                ? "✅ BENAR! Kamu menambang +5 Token IGIL (Senilai Rp 2.500)!"
                                : `❌ Kurang tepat. Jawaban yang benar adalah ${q.correctAnswer}.`}
                            </div>
                            <div className="mt-1 font-normal opacity-90">{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: 10 SOAL EVALUASI ANTI-CONTEK (+100 TOKEN & TIMER)     */}
        {/* ============================================================ */}
        {activeTab === 7 && (
          <div className="space-y-6">
            {/* Banner Status Kualifikasi Beasiswa Rp 300.000 */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/40">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full uppercase">
                      Mesin Anti-Contek IGIL • Kode Soal: {evalSeedCode}
                    </span>
                    <span className="text-xs bg-indigo-800 text-indigo-200 px-2.5 py-0.5 rounded-full font-bold">
                      Percobaan Ke-{attemptCount}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black mt-2">
                    Evaluasi Resmi Bab 2: Wajib Nilai 100% Sempurna
                  </h2>
                  <p className="text-xs md:text-sm text-indigo-200 mt-1">
                    Target Beasiswa Rp 300.000/bulan membutuhkan 4 Bab Lulus 100% (600 Token). Bab ini bernilai{" "}
                    <strong>150 Token (Rp 75.000)</strong>. Peringkat ditentukan oleh jumlah percobaan paling sedikit &
                    waktu tercepat!
                  </p>
                </div>

                {/* Panel Timer Detik & Percobaan (Tie-Breaker Leaderboard) */}
                <div className="flex items-center gap-3 bg-slate-950/90 border border-indigo-500/50 px-5 py-3 rounded-2xl">
                  <div className="text-center pr-3 border-r border-slate-700">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Waktu Pengerjaan</div>
                    <div className="text-2xl font-mono font-black text-amber-400">{formatTime(elapsedMs)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Token Evaluasi</div>
                    <div className="text-xl font-black text-emerald-400">{evalTokens} / 100 🪙</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hasil Evaluasi Jika Sudah Dikirim */}
            {evalSubmitted && (
              <div
                className={`rounded-3xl p-6 border-2 shadow-lg text-center space-y-3 ${
                  evalScore === 100
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                    : "bg-amber-50 border-amber-400 text-amber-950"
                }`}
              >
                <div className="text-4xl">{evalScore === 100 ? "🏆🎉" : "💪🔄"}</div>
                <h3 className="text-2xl font-black">
                  Skor Evaluasi Kamu: {evalScore} / 100 (Waktu: {formatTime(elapsedMs)} • Percobaan #{attemptCount})
                </h3>
                {evalScore === 100 ? (
                  <p className="text-sm md:text-base font-bold max-w-2xl mx-auto">
                    LUAR BIASA! Kamu meraih NILAI SEMPURNA 100% dan menambang penuh{" "}
                    <span className="underline">100 Token Evaluasi (Rp 50.000)</span>! Bab 2 ini resmi dinyatakan LULUS
                    KUALIFIKASI BEASISWA di Papan Peringkat Kelas 4.
                  </p>
                ) : (
                  <p className="text-sm md:text-base font-semibold max-w-2xl mx-auto">
                    Untuk masuk ke Peringkat Beasiswa Rp 300.000, kamu wajib meraih nilai <strong>100% Sempurna</strong>
                    . Jangan menyerah! Pelajari pembahasan di bawah, lalu klik tombol{" "}
                    <strong>&quot;Ulangi dengan Soal Baru&quot;</strong> sampai kamu meraih 100%!
                  </p>
                )}
                <button
                  onClick={handleRetryEvaluation}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md"
                >
                  🔄 Ulangi Evaluasi dengan Soal Acak Baru (Anti-Contek)
                </button>
              </div>
            )}

            {/* Daftar 10 Soal Evaluasi Dinamis */}
            <div className="space-y-4">
              {evalQuestions.map((q, idx) => {
                const selected = evalAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-3xl shadow-sm border-2 p-5 ${
                      evalSubmitted
                        ? isCorrect
                          ? "border-emerald-400"
                          : "border-rose-400"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full">
                        Evaluasi #{idx + 1} dari 10
                      </span>
                      <span className="text-xs font-extrabold text-emerald-700">+10 Token (Rp 5.000)</span>
                    </div>

                    <p className="text-sm text-slate-600">{q.story}</p>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">{q.question}</h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          disabled={evalSubmitted}
                          onClick={() => {
                            triggerSound("click");
                            setEvalAnswers((prev) => ({ ...prev, [q.id]: opt }));
                          }}
                          className={`py-2.5 px-3 rounded-xl font-extrabold text-sm border-2 transition ${
                            selected === opt
                              ? "bg-indigo-600 text-white border-indigo-700"
                              : "bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {evalSubmitted && (
                      <div
                        className={`mt-3 p-3 rounded-xl text-xs font-semibold ${
                          isCorrect ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {isCorrect ? "✅ Benar (+10 Token)" : `❌ Jawaban seharusnya: ${q.correctAnswer}`} —{" "}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!evalSubmitted && (
              <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-lg text-center">
                <button
                  onClick={handleSubmitEvaluation}
                  className="w-full md:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base shadow-lg transition transform hover:scale-[1.01]"
                >
                  🚀 Kunci Jawaban & Validasi 100 Token Beasiswa Sekarang!
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
