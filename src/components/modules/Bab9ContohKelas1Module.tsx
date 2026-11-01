"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ==========================================
// 1. MESIN SUARA LOKAL (WEB AUDIO SYNTHESIZER - RP 0)
// ==========================================
const playSound = (type: "click" | "pop" | "jump" | "coin" | "wrong" | "fanfare") => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "click" || type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "pop" ? 380 : 520, now);
      osc.frequency.exponentialRampToValueAtTime(type === "pop" ? 760 : 240, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "jump") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.14);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === "coin") {
      [987.77, 1318.51].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
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
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.24, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.1 + 0.34);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.34);
      });
    }
  } catch {
    // Abaikan jika browser memblokir autoplay audio
  }
};

// ==========================================
// 2. KAMUS NAMA BILANGAN 0 - 10 (FASE A KELAS 1 SD)
// ==========================================
const NAMA_ANGKA: Record<number, string> = {
  0: "nol",
  1: "satu",
  2: "dua",
  3: "tiga",
  4: "empat",
  5: "lima",
  6: "enam",
  7: "tujuh",
  8: "delapan",
  9: "sembilan",
  10: "sepuluh",
};

// ==========================================
// 3. KOMPONEN BINGKAI 10 (TEN FRAME) INTERAKTIF
// ==========================================
interface InteractiveTenFrameProps {
  count: number;
  secondCount?: number;
  icon?: string;
  secondIcon?: string;
  interactive?: boolean;
  onChangeCount?: (newCount: number) => void;
}

const InteractiveTenFrame: React.FC<InteractiveTenFrameProps> = ({
  count,
  secondCount = 0,
  icon = "🍎",
  secondIcon = "🍊",
  interactive = false,
  onChangeCount,
}) => {
  return (
    <div className="bg-amber-100/80 border-4 border-amber-700 rounded-3xl p-3 max-w-[340px] mx-auto shadow-inner">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, idx) => {
          const isFirst = idx < count;
          const isSecond = !isFirst && idx < count + secondCount;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (!interactive || !onChangeCount) return;
                playSound("pop");
                if (idx + 1 === count) {
                  onChangeCount(idx);
                } else {
                  onChangeCount(idx + 1);
                }
              }}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-2xl md:text-3xl transition-all select-none ${
                interactive ? "cursor-pointer hover:scale-105" : "cursor-default"
              } ${
                isFirst
                  ? "bg-white border-amber-500 shadow-md scale-100"
                  : isSecond
                  ? "bg-emerald-50 border-emerald-500 shadow-md scale-100"
                  : "bg-amber-50/60 border-amber-300/80 text-transparent"
              }`}
            >
              {isFirst ? icon : isSecond ? secondIcon : "•"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 4. KOMPONEN DIAGRAM PASANGAN BILANGAN (NUMBER BONDS SVG)
// ==========================================
const NumberBondSVG: React.FC<{ total: number; left: number; right: number }> = ({
  total,
  left,
  right,
}) => {
  return (
    <svg viewBox="0 0 260 170" className="w-full max-w-[250px] mx-auto select-none">
      {/* Garis Cabang */}
      <line x1="130" y1="45" x2="65" y2="125" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <line x1="130" y1="45" x2="195" y2="125" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />

      {/* Lingkaran Induk (Atas) */}
      <circle cx="130" cy="42" r="32" fill="#f59e0b" stroke="#78350f" strokeWidth="4" />
      <text x="130" y="51" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="900">
        {total}
      </text>

      {/* Lingkaran Cabang Kiri */}
      <circle cx="65" cy="128" r="28" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="4" />
      <text x="65" y="137" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">
        {left}
      </text>

      {/* Lingkaran Cabang Kanan */}
      <circle cx="195" cy="128" r="28" fill="#10b981" stroke="#064e3b" strokeWidth="4" />
      <text x="195" y="137" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">
        {right}
      </text>
    </svg>
  );
};

// ==========================================
// 5. TIPE DATA SOAL LATIHAN & EVALUASI
// ==========================================
interface Grade1Question {
  id: number;
  subbabTag: string;
  story: string;
  question: string;
  visualType: "tenFrame" | "compare" | "sequence" | "numberBond";
  val1: number;
  val2?: number;
  icon1?: string;
  icon2?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const TOKEN_PRICE_RP = 500; // 1 Token IGIL = Rp 500 (Tetap)

export default function Bab9ContohKelas1Module() {
  // Navigasi 6 Tab / Kartu Standar IGIL
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Dompet Token IGIL (Latihan Maks 50 Token + Evaluasi & Praktikum Maks 100 Token = 150 Token = Rp 75.000)
  const [practiceTokens, setPracticeTokens] = useState<number>(0);
  const [evalTokens, setEvalTokens] = useState<number>(0);
  const totalTokens = practiceTokens + evalTokens;

  const triggerSound = useCallback(
    (type: "click" | "pop" | "jump" | "coin" | "wrong" | "fanfare") => {
      if (soundEnabled) playSound(type);
    },
    [soundEnabled]
  );

  // Fungsi Suara Guru AI Ramah Anak Kelas 1 SD (Web Speech API - Rp 0)
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.92;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // ==========================================
  // STATE TAB 1: AKTIVASI OTAK (KERANJANG BOLA & ANGKA 0)
  // ==========================================
  const [ballsInBasket, setBallsInBasket] = useState<number>(3);
  const [zeroGuessed, setZeroGuessed] = useState<"benar" | "salah" | null>(null);

  // ==========================================
  // STATE TAB 2: 4 MINI-GAME SUB-BAB ("UNLOCK BY DOING")
  // ==========================================
  const [missionStep, setMissionStep] = useState<1 | 2 | 3 | 4>(1);

  // Misi 1 (Sub-bab A): Bingkai 10 (Ten Frame) & Membaca Lambang Bilangan
  const [tenFrameCount, setTenFrameCount] = useState<number>(6);

  // Misi 2 (Sub-bab B): Membandingkan Banyak Benda (Kotak A vs Kotak B)
  const [groupACount, setGroupACount] = useState<number>(7);
  const [groupBCount, setGroupBCount] = useState<number>(4);

  // Misi 3 (Sub-bab C): Menghitung Maju & Mundur (Lompatan Katak 0 - 10)
  const [frogPosition, setFrogPosition] = useState<number>(0);
  const [jumpDirection, setJumpDirection] = useState<"maju" | "mundur">("maju");

  // Misi 4 (Sub-bab D): Pasangan Bilangan (Number Bonds)
  const [bondTotal, setBondTotal] = useState<number>(8);
  const [bondLeft, setBondLeft] = useState<number>(5);
  const bondRight = bondTotal - bondLeft;

  // ==========================================
  // STATE TAB 3: SIMULATOR PHET-STYLE (TIMBANGAN & BINGKAI 10 GANDA)
  // ==========================================
  const [simLeft, setSimLeft] = useState<number>(5);
  const [simRight, setSimRight] = useState<number>(3);

  // ==========================================
  // STATE TAB 4: SMART KANVAS (MENEBALKAN ANGKA 0-10 & STEMPEL)
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>("#2563eb");
  const [traceNumber, setTraceNumber] = useState<number>(8);

  // ==========================================
  // STATE TAB 5: 10 SOAL LATIHAN VISUAL (1 LAYAR 1 SOAL • +5 TOKEN)
  // ==========================================
  const [practiceQuestions, setPracticeQuestions] = useState<Grade1Question[]>([]);
  const [practiceIdx, setPracticeIdx] = useState<number>(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<number, boolean>>({});

  // ==========================================
  // STATE TAB 6: 10 SOAL EVALUASI ANTI-CONTEK + PRAKTIKUM KREATIF
  // ==========================================
  const [evalQuestions, setEvalQuestions] = useState<Grade1Question[]>([]);
  const [evalIdx, setEvalIdx] = useState<number>(0);
  const [evalAnswers, setEvalAnswers] = useState<Record<number, string>>({});
  const [evalSubmitted, setEvalSubmitted] = useState<boolean>(false);
  const [evalScore, setEvalScore] = useState<number>(0);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [evalSeedCode, setEvalSeedCode] = useState<string>("IGIL-K1B1-001");

  // State Mini-Praktikum Kreatif di Tab 6 (Terbuka Setelah Evaluasi 100%)
  const [gardenApples, setGardenApples] = useState<number>(4);
  const [gardenOranges, setGardenOranges] = useState<number>(3);
  const [gardenBananas, setGardenBananas] = useState<number>(3);
  const [practicumClaimed, setPracticumClaimed] = useState<boolean>(false);
  const gardenTotal = gardenApples + gardenOranges + gardenBananas;

  // ==========================================
  // GENERATOR 10 SOAL DINAMIS KELAS 1 BAB 1 (ANTI-CONTEK)
  // ==========================================
  const generateDynamicQuestions = useCallback((): Grade1Question[] => {
    const randInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

    // 1. Sub-bab A: Menghitung Banyak Benda pada Bingkai 10
    const n1 = randInt(5, 9);

    // 2. Sub-bab A: Membaca Nama Bilangan
    const n2 = randInt(4, 10);
    const word2 = NAMA_ANGKA[n2];
    const wrong2a = NAMA_ANGKA[n2 === 10 ? 8 : n2 + 1];
    const wrong2b = NAMA_ANGKA[n2 - 1];
    const wrong2c = NAMA_ANGKA[n2 === 4 ? 7 : n2 - 2];

    // 3. Sub-bab A: Konsep Bilangan 0 (Keranjang Kosong)
    const n3 = randInt(3, 6);

    // 4. Sub-bab B: Membandingkan Lebih Banyak
    const a4 = randInt(6, 9);
    const b4 = randInt(2, a4 - 2);

    // 5. Sub-bab B: Membandingkan Lebih Sedikit
    const a5 = randInt(2, 5);
    const b5 = randInt(a5 + 2, 9);

    // 6. Sub-bab B: Konsep Sama Banyak
    const n6 = randInt(4, 8);

    // 7. Sub-bab C: Menghitung Maju (Bilangan Setelahnya)
    const start7 = randInt(3, 7);
    const next7 = start7 + 1;

    // 8. Sub-bab C: Menghitung Mundur (Bilangan Sebelumnya)
    const start8 = randInt(5, 9);
    const prev8 = start8 - 1;

    // 9. Sub-bab D: Pasangan Bilangan (Mencari Pasangan yang Hilang)
    const tot9 = randInt(6, 10);
    const left9 = randInt(2, tot9 - 2);
    const right9 = tot9 - left9;

    // 10. Sub-bab D: Pasangan Bilangan Penyusun 10
    const left10 = randInt(3, 8);
    const right10 = 10 - left10;

    return [
      {
        id: 1,
        subbabTag: "Sub-bab A • Menghitung Benda",
        story: `Kira dan IGIL menyusun buah apel merah ke dalam papan Bingkai 10 seperti pada gambar.`,
        question: `Ada berapa banyak buah apel di dalam Bingkai 10 tersebut?`,
        visualType: "tenFrame",
        val1: n1,
        icon1: "🍎",
        options: shuffle([`${n1}`, `${n1 + 1}`, `${n1 - 1}`, `${10 - n1}`]),
        correctAnswer: `${n1}`,
        explanation: `Baris atas berisi 5 apel ditambah baris bawah ${n1 - 5} apel, jadi semuanya ada ${n1} apel.`,
      },
      {
        id: 2,
        subbabTag: "Sub-bab A • Membaca Lambang Bilangan",
        story: `Kapten Iwan menunjuk kartu lambang bilangan "${n2}" di layar kemudi kapal.`,
        question: `Bagaimanakah cara membaca lambang bilangan ${n2}?`,
        visualType: "tenFrame",
        val1: n2,
        icon1: "⭐",
        options: shuffle([word2, wrong2a, wrong2b, wrong2c]),
        correctAnswer: word2,
        explanation: `Lambang bilangan ${n2} dibaca "${word2}".`,
      },
      {
        id: 3,
        subbabTag: "Sub-bab A • Mengenal Bilangan 0",
        story: `Mula-mula ada ${n3} bola di dalam keranjang Upe. Lalu semua (${n3}) bola itu diambil untuk bermain di lapangan.`,
        question: `Berapa banyak bola yang tersisa di dalam keranjang Upe sekarang?`,
        visualType: "tenFrame",
        val1: 0,
        icon1: "⚽",
        options: shuffle(["0 (nol)", `${n3}`, "1 (satu)", "10 (sepuluh)"]),
        correctAnswer: "0 (nol)",
        explanation: `Karena semua bola sudah diambil dan keranjang menjadi kosong, maka banyak bola sekarang adalah 0 (dibaca nol).`,
      },
      {
        id: 4,
        subbabTag: "Sub-bab B • Membandingkan Banyak Benda",
        story: `Di Kotak A ada ${a4} bebek kuning (🐤) dan di Kotak B ada ${b4} katak hijau (🐸).`,
        question: `Perbandingan yang tepat untuk banyak bebek terhadap banyak katak adalah...`,
        visualType: "compare",
        val1: a4,
        val2: b4,
        icon1: "🐤",
        icon2: "🐸",
        options: [
          `${a4} bebek LEBIH BANYAK dari ${b4} katak`,
          `${a4} bebek LEBIH SEDIKIT dari ${b4} katak`,
          `${a4} bebek SAMA BANYAK dengan ${b4} katak`,
          "Tidak ada bebek di kotak",
        ],
        correctAnswer: `${a4} bebek LEBIH BANYAK dari ${b4} katak`,
        explanation: `Saat dipasangkan satu-satu, bebek (${a4}) masih bersisa ${a4 - b4} ekor. Jadi ${a4} bebek lebih banyak dari ${b4} katak.`,
      },
      {
        id: 5,
        subbabTag: "Sub-bab B • Lebih Sedikit",
        story: `Malosi memiliki ${a5} kelereng biru, sedangkan Tora memiliki ${b5} kelereng merah.`,
        question: `Siapakah yang memiliki kelereng LEBIH SEDIKIT?`,
        visualType: "compare",
        val1: a5,
        val2: b5,
        icon1: "🔵",
        icon2: "🔴",
        options: shuffle([
          `Malosi (${a5} lebih sedikit dari ${b5})`,
          `Tora (${b5} lebih sedikit dari ${a5})`,
          `Kelereng keduanya sama banyak`,
          `Malosi memiliki 10 kelereng`,
        ]),
        correctAnswer: `Malosi (${a5} lebih sedikit dari ${b5})`,
        explanation: `Angka ${a5} lebih kecil daripada ${b5}, sehingga kelereng Malosi (${a5}) lebih sedikit dari kelereng Tora (${b5}).`,
      },
      {
        id: 6,
        subbabTag: "Sub-bab B • Sama Banyak",
        story: `Wei menyiapkan ${n6} cangkir teh. Agar jumlah kue donat SAMA BANYAK dengan jumlah cangkir teh:`,
        question: `Berapa banyak kue donat yang harus disiapkan oleh Wei?`,
        visualType: "tenFrame",
        val1: n6,
        icon1: "🍩",
        options: shuffle([
          `${n6} donat`,
          `${n6 + 2} donat`,
          `${n6 - 1} donat`,
          `0 donat`,
        ]),
        correctAnswer: `${n6} donat`,
        explanation: `Agar sama banyak dengan ${n6} cangkir, maka banyak donat juga harus ${n6} buah.`,
      },
      {
        id: 7,
        subbabTag: "Sub-bab C • Menghitung Maju",
        story: `Katak IGIL melompat maju secara berurutan di atas batu angka: ${start7 - 2}, ${start7 - 1}, ${start7}, ...`,
        question: `Bilangan berapakah yang diinjak Katak IGIL tepat SETELAH angka ${start7}?`,
        visualType: "sequence",
        val1: start7,
        val2: next7,
        options: shuffle([`${next7}`, `${start7 - 1}`, `${next7 + 1}`, `10`]),
        correctAnswer: `${next7}`,
        explanation: `Saat menghitung maju dari ${start7}, bilangan berikutnya (ditambah 1) adalah ${next7}.`,
      },
      {
        id: 8,
        subbabTag: "Sub-bab C • Menghitung Mundur",
        story: `Kapten Iwan menghitung mundur peluncuran roket air: ${start8 + 1}, ${start8}, ..., ${start8 - 2}.`,
        question: `Bilangan berapakah yang berada tepat SEBELUM ${start8} saat menghitung mundur?`,
        visualType: "sequence",
        val1: start8,
        val2: prev8,
        options: shuffle([`${prev8}`, `${start8 + 1}`, `${prev8 - 1}`, `0`]),
        correctAnswer: `${prev8}`,
        explanation: `Saat menghitung mundur, bilangan sebelum ${start8} (berkurang 1) adalah ${prev8}.`,
      },
      {
        id: 9,
        subbabTag: "Sub-bab D • Pasangan Bilangan",
        story: `Perhatikan diagram pasangan bilangan berikut! Bilangan ${tot9} diuraikan menjadi ${left9} dan sebuah bilangan di cabang kanan.`,
        question: `Bilangan berapakah yang tepat untuk mengisi pasangan dari ${left9} agar berjumlah ${tot9}?`,
        visualType: "numberBond",
        val1: tot9,
        val2: left9,
        options: shuffle([
          `${right9}`,
          `${right9 + 1}`,
          `${tot9}`,
          `${Math.max(0, right9 - 1)}`,
        ]),
        correctAnswer: `${right9}`,
        explanation: `${left9} dan ${right9} membentuk pasangan bilangan ${tot9} (karena ${left9} + ${right9} = ${tot9}).`,
      },
      {
        id: 10,
        subbabTag: "Sub-bab D • Pasangan Bilangan 10",
        story: `Satu Bingkai 10 penuh memuat 10 buah. Di dalamnya sudah ada ${left10} apel merah (🍎) dan sisanya diisi jeruk (🍊).`,
        question: `Berapa banyak jeruk yang melengkapi ${left10} apel agar Bingkai 10 menjadi penuh (10)?`,
        visualType: "numberBond",
        val1: 10,
        val2: left10,
        options: shuffle([
          `${right10} jeruk`,
          `${left10} jeruk`,
          `${right10 + 2} jeruk`,
          `10 jeruk`,
        ]),
        correctAnswer: `${right10} jeruk`,
        explanation: `Pasangan bilangan untuk membentuk 10 dari ${left10} adalah ${right10} (karena ${left10} dan ${right10} menjadi 10).`,
      },
    ];
  }, []);

  useEffect(() => {
    setPracticeQuestions(generateDynamicQuestions());
    setEvalQuestions(generateDynamicQuestions());
  }, [generateDynamicQuestions]);

  // Stopwatch Presisi Tab 6 (Aman dari error NodeJS.Timeout di Vercel)
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (activeTab === 6 && timerRunning && !evalSubmitted) {
      const startTime = Date.now() - elapsedMs;
      intervalId = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTab, timerRunning, evalSubmitted, elapsedMs]);

  useEffect(() => {
    if (activeTab === 6 && !evalSubmitted && !timerRunning) {
      setTimerRunning(true);
    }
  }, [activeTab, evalSubmitted, timerRunning]);

  // ==========================================
  // FUNGSI SMART KANVAS MENEBALKAN ANGKA (TAB 4)
  // ==========================================
  const drawCanvasTemplate = useCallback(
    (numToTrace: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid kotak besar ramah anak Kelas 1
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Cetak Angka Bayangan Titik-Titik untuk Ditebalkan Siswa
      ctx.save();
      ctx.font = "900 180px sans-serif";
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 6;
      ctx.setLineDash([10, 10]);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeText(String(numToTrace), 220, 155);
      ctx.strokeText(String(numToTrace), 580, 155);
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    if (activeTab === 4) {
      setTimeout(() => drawCanvasTemplate(traceNumber), 50);
    }
  }, [activeTab, traceNumber, drawCanvasTemplate]);

  const startCanvasDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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

  const moveCanvasDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const formatTime = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");
    const tenth = Math.floor((ms % 1000) / 100);
    return `${min}:${sec}.${tenth}`;
  };

  const currentPracticeQ = practiceQuestions[practiceIdx];
  const currentEvalQ = evalQuestions[evalIdx];
  const tiltDeg = Math.max(-14, Math.min(14, (simRight - simLeft) * 3));

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 pb-12 font-sans">
      {/* ========================================== */}
      {/* HEADER BAR & DOMPET TOKEN BEASISWA IGIL    */}
      {/* ========================================== */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-sky-900 via-indigo-900 to-purple-950 text-white shadow-lg border-b border-indigo-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-indigo-950 flex items-center justify-center font-black text-xl shadow-md">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-sky-700 text-amber-300 px-2.5 py-0.5 rounded-full border border-sky-500">
                  Kelas 1 SD • Bab 1
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Ramah Suara Anak (Rp 0 API)
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight mt-0.5">
                Ayo Membilang Sampai dengan 10
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 border border-indigo-600 text-xs font-bold"
            >
              {soundEnabled ? "🔊 Suara ON" : "🔇 Suara OFF"}
            </button>

            <div className="bg-slate-950/90 border-2 border-amber-400 rounded-2xl px-4 py-1.5 flex items-center gap-3">
              <div className="text-2xl animate-bounce">🪙</div>
              <div>
                <div className="text-[10px] text-amber-200 font-bold uppercase">
                  Dompet Bab 1 (Maks 150)
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

        {/* Navigasi 6 Tab */}
        <div className="max-w-6xl mx-auto px-4 pt-1 pb-2 flex overflow-x-auto gap-1.5">
          {[
            { id: 1, label: "1. Silabus & Aktivasi", icon: "⚽" },
            { id: 2, label: "2. Game 4 Sub-Bab", icon: "🎮" },
            { id: 3, label: "3. Lab Timbangan PhET", icon: "⚖️" },
            { id: 4, label: "4. Kanvas Tulis Angka", icon: "✏️" },
            { id: 5, label: `5. Latihan (${practiceTokens}/50🪙)`, icon: "🎯" },
            { id: 6, label: `6. Evaluasi & Praktikum (${evalTokens}/100🪙)`, icon: "🏆" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                triggerSound("click");
                setActiveTab(tab.id as 1 | 2 | 3 | 4 | 5 | 6);
              }}
              className={`px-3.5 py-2 rounded-xl font-extrabold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 border-b-4 active:border-b-0 active:translate-y-0.5 ${
                activeTab === tab.id
                  ? "bg-amber-400 text-indigo-950 border-amber-600 shadow-md"
                  : "bg-indigo-800/70 text-indigo-100 border-indigo-950 hover:bg-indigo-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-5">
        {/* ============================================================ */}
        {/* TAB 1: SILABUS & AKTIVASI OTAK (KERANJANG BOLA ANGKA 0)      */}
        {/* ============================================================ */}
        {activeTab === 1 && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-6">
            {/* Ringkasan Silabus Buku Kelas 1 Bab 1 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="bg-sky-100 text-sky-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                  Silabus Resmi • Buku Matematika Kelas I SD/MI (Hlm. 1–38)
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  Misteri Keranjang Kosong Kira & IGIL: Mengenal Angka 0 sampai 10!
                </h2>
              </div>
              <button
                onClick={() =>
                  speakText(
                    "Halo adik-adik Kelas Satu! Bersama aku robot IGIL, Kapten Iwan, Kira, dan Upe, kita akan belajar menghitung benda sampai sepuluh, mengenal angka nol, membandingkan banyak benda, menghitung maju mundur, dan mencari pasangan bilangan. Yuk sentuh bola di dalam keranjang untuk memindahkannya!"
                  )
                }
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm flex items-center gap-2 border-b-4 border-indigo-800 shadow"
              >
                🗣️ Dengarkan Suara Guru AI
              </button>
            </div>

            {/* Peta 4 Sub-bab Buku Kelas 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {[
                { badge: "Sub-bab A", title: "Membilang 0–10", desc: "Bingkai 10 & Lambang Bilangan" },
                { badge: "Sub-bab B", title: "Membandingkan", desc: "Lebih Banyak, Lebih Sedikit, Sama" },
                { badge: "Sub-bab C", title: "Maju & Mundur", desc: "Urutan Bilangan 0 sampai 10" },
                { badge: "Sub-bab D", title: "Pasangan Bilangan", desc: "Menyusun & Mengurai Bilangan" },
              ].map((s) => (
                <div key={s.badge} className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3">
                  <span className="font-black text-sky-800 uppercase text-[10px]">{s.badge}</span>
                  <div className="font-black text-slate-900 text-sm mt-0.5">{s.title}</div>
                  <div className="text-slate-600 font-medium">{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Eksperimen Pembuka: Keranjang Bola (Mengenal Bilangan 0) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6">
              <div className="text-center space-y-3">
                <div className="text-xs font-black uppercase text-amber-900">
                  SENTUH BOLA UNTUK MENGAMBILNYA DARI KERANJANG:
                </div>
                <div className="min-h-[120px] bg-white rounded-3xl border-4 border-amber-600 p-4 flex items-center justify-center gap-4 shadow-inner">
                  {ballsInBasket > 0 ? (
                    Array.from({ length: ballsInBasket }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const next = ballsInBasket - 1;
                          setBallsInBasket(next);
                          triggerSound("pop");
                          speakText(
                            next === 0
                              ? "Keranjang kosong! Banyak bola sekarang adalah nol!"
                              : `Sisa ${NAMA_ANGKA[next]} bola`
                          );
                        }}
                        className="text-5xl hover:scale-110 transition-transform animate-bounce"
                        title="Klik untuk mengambil bola"
                      >
                        ⚽
                      </button>
                    ))
                  ) : (
                    <div className="text-slate-400 font-black text-sm">
                      🧺 Keranjang Kosong (Tidak Ada Bola)
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      triggerSound("click");
                      setBallsInBasket(3);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
                  >
                    🔄 Isi Lagi 3 Bola
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Banyak Bola di Keranjang:
                  </div>
                  <div className="text-5xl font-black text-indigo-600 my-1">
                    {ballsInBasket}{" "}
                    <span className="text-2xl text-slate-700 capitalize">
                      (Dibaca: {NAMA_ANGKA[ballsInBasket]})
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3">
                  <div className="text-sm font-bold">
                    Jika semua bola diambil sampai keranjang kosong, lambang bilangan apa yang menunjukkan keranjang
                    kosong?
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                      onClick={() => {
                        triggerSound("fanfare");
                        setZeroGuessed("benar");
                        speakText("Pintar sekali! Keranjang kosong bernilai nol!");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs border-b-4 border-emerald-700"
                    >
                      ✅ Angka 0 (Dibaca: Nol)
                    </button>
                    <button
                      onClick={() => {
                        triggerSound("wrong");
                        setZeroGuessed("salah");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-700 text-white font-bold text-xs"
                    >
                      Angka 1 (Satu)
                    </button>
                  </div>
                  {zeroGuessed === "benar" && (
                    <div className="text-xs text-emerald-300 font-bold">
                      🎉 HEBAT! Sekarang klik tombol di bawah untuk memainkan 4 Game Sub-Bab!
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  triggerSound("click");
                  setActiveTab(2);
                }}
                className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm border-b-4 border-amber-600 shadow-md"
              >
                🚀 Lanjut ke Tab 2: Mainkan 4 Game Sub-Bab →
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: 4 MINI-GAME SUB-BAB ("UNLOCK BY DOING")               */}
        {/* ============================================================ */}
        {activeTab === 2 && (
          <div className="space-y-5">
            {/* Pemilih 4 Misi Sub-Bab */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "Sub-bab A: Bingkai 10", desc: "Membilang & Membaca 0–10" },
                { step: 2, title: "Sub-bab B: Bandingkan", desc: "Lebih Banyak & Lebih Sedikit" },
                { step: 3, title: "Sub-bab C: Maju Mundur", desc: "Lompatan Katak 0–10" },
                { step: 4, title: "Sub-bab D: Pasangan", desc: "Pasangan Bilangan (Bonds)" },
              ].map((m) => (
                <button
                  key={m.step}
                  onClick={() => {
                    triggerSound("click");
                    setMissionStep(m.step as 1 | 2 | 3 | 4);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                    missionStep === m.step
                      ? "bg-indigo-600 text-white border-indigo-800 shadow-lg scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-[11px] font-extrabold uppercase opacity-80">{m.title}</div>
                  <div className="text-xs md:text-sm font-black mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {/* GAME SUB-BAB A: BINGKAI 10 (TEN FRAME) INTERAKTIF */}
            {missionStep === 1 && (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black uppercase bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Game Sub-bab A • Bingkai 10 (Halaman 17)
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                      🍎 Sentuh Kotak Bingkai 10 untuk Menghitung Apel!
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        `Saat ini ada ${tenFrameCount} buah apel. Lambang bilangannya ${tenFrameCount}, dibaca ${NAMA_ANGKA[tenFrameCount]}.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs"
                  >
                    🗣️ Ucapkan Angka Ini
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                  <div className="space-y-3 text-center">
                    <InteractiveTenFrame
                      count={tenFrameCount}
                      icon="🍎"
                      interactive={true}
                      onChangeCount={(val) => {
                        setTenFrameCount(val);
                        speakText(`${NAMA_ANGKA[val]}`);
                      }}
                    />
                    <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          onClick={() => {
                            triggerSound("pop");
                            setTenFrameCount(num);
                            speakText(`${NAMA_ANGKA[num]}`);
                          }}
                          className={`w-9 h-9 rounded-xl font-black text-sm border-2 ${
                            tenFrameCount === num
                              ? "bg-amber-400 border-amber-600 text-slate-950 scale-110"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 text-center space-y-2 shadow-sm">
                    <div className="text-xs font-extrabold text-indigo-700 uppercase">
                      LAMBANG & NAMA BILANGAN
                    </div>
                    <div className="text-7xl font-black text-indigo-600">{tenFrameCount}</div>
                    <div className="text-2xl font-black text-slate-800 uppercase tracking-wide">
                      &quot;{NAMA_ANGKA[tenFrameCount]}&quot;
                    </div>
                    <p className="text-xs text-slate-500 font-semibold pt-2">
                      💡 1 baris penuh pada Bingkai 10 selalu berisi <strong>5 benda</strong>, dan 2 baris penuh berisi{" "}
                      <strong>10 benda</strong>!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* GAME SUB-BAB B: MEMBANDINGKAN BANYAK BENDA */}
            {missionStep === 2 && (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      Game Sub-bab B • Membandingkan Banyak Benda
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                      🐤 Pasangkan Satu-Satu: Mana yang Lebih Banyak?
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        groupACount > groupBCount
                          ? `${groupACount} bebek lebih banyak dari ${groupBCount} katak.`
                          : groupACount < groupBCount
                          ? `${groupACount} bebek lebih sedikit dari ${groupBCount} katak.`
                          : `${groupACount} bebek sama banyak dengan ${groupBCount} katak.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs"
                  >
                    🗣️ Dengarkan Hasil Banding
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Kotak A */}
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-3 text-center">
                    <div className="text-xs font-black uppercase text-amber-900">
                      KOTAK A: {groupACount} BEBEK KUNING
                    </div>
                    <div className="min-h-[64px] bg-white rounded-xl p-2 flex items-center justify-center gap-1.5 flex-wrap border border-amber-200">
                      {Array.from({ length: groupACount }).map((_, i) => (
                        <span key={i} className="text-2xl">
                          🐤
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          triggerSound("pop");
                          setGroupACount(Math.max(1, groupACount - 1));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-slate-200 font-black text-sm"
                      >
                        - Kurangi
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("pop");
                          setGroupACount(Math.min(10, groupACount + 1));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-amber-500 text-white font-black text-sm"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>

                  {/* Kotak B */}
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-3 text-center">
                    <div className="text-xs font-black uppercase text-emerald-900">
                      KOTAK B: {groupBCount} KATAK HIJAU
                    </div>
                    <div className="min-h-[64px] bg-white rounded-xl p-2 flex items-center justify-center gap-1.5 flex-wrap border border-emerald-200">
                      {Array.from({ length: groupBCount }).map((_, i) => (
                        <span key={i} className="text-2xl">
                          🐸
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          triggerSound("pop");
                          setGroupBCount(Math.max(1, groupBCount - 1));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-slate-200 font-black text-sm"
                      >
                        - Kurangi
                      </button>
                      <button
                        onClick={() => {
                          triggerSound("pop");
                          setGroupBCount(Math.min(10, groupBCount + 1));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-sm"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-2xl text-center">
                  <div className="text-lg md:text-xl font-black">
                    {groupACount} Bebek{" "}
                    <span className="text-amber-400 underline">
                      {groupACount > groupBCount
                        ? "LEBIH BANYAK DARI"
                        : groupACount < groupBCount
                        ? "LEBIH SEDIKIT DARI"
                        : "SAMA BANYAK DENGAN"}
                    </span>{" "}
                    {groupBCount} Katak
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Pasangan yang bertemu: {Math.min(groupACount, groupBCount)} pasang • Selisih:{" "}
                    {Math.abs(groupACount - groupBCount)} ekor
                  </div>
                </div>
              </div>
            )}

            {/* GAME SUB-BAB C: MENGHITUNG MAJU & MUNDUR */}
            {missionStep === 3 && (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black uppercase bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
                      Game Sub-bab C • Menghitung Maju dan Mundur
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                      🐸 Lompatan Katak IGIL di Lintasan Batu 0 sampai 10!
                    </h2>
                  </div>
                </div>

                {/* Lintasan Batu 0 - 10 */}
                <div className="bg-sky-100/80 border-2 border-sky-300 rounded-3xl p-5 space-y-4">
                  <div className="grid grid-cols-11 gap-1.5">
                    {Array.from({ length: 11 }).map((_, num) => {
                      const isHere = frogPosition === num;
                      return (
                        <button
                          key={num}
                          onClick={() => {
                            triggerSound("jump");
                            setFrogPosition(num);
                            speakText(`${NAMA_ANGKA[num]}`);
                          }}
                          className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-black transition-all ${
                            isHere
                              ? "bg-emerald-500 border-emerald-800 text-white -translate-y-2 shadow-lg"
                              : "bg-white border-sky-300 text-slate-700 hover:bg-sky-50"
                          }`}
                        >
                          <span className="text-xl">{isHere ? "🐸" : "•"}</span>
                          <span className="text-sm md:text-base mt-1">{num}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        const next = Math.max(0, frogPosition - 1);
                        setFrogPosition(next);
                        setJumpDirection("mundur");
                        triggerSound("jump");
                        speakText(`Mundur ke ${NAMA_ANGKA[next]}`);
                      }}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs md:text-sm border-b-4 border-rose-800"
                    >
                      ⬅️ Lompat MUNDUR (-1)
                    </button>
                    <button
                      onClick={() => {
                        const next = Math.min(10, frogPosition + 1);
                        setFrogPosition(next);
                        setJumpDirection("maju");
                        triggerSound("jump");
                        speakText(`Maju ke ${NAMA_ANGKA[next]}`);
                      }}
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs md:text-sm border-b-4 border-indigo-800"
                    >
                      Lompat MAJU (+1) ➡️
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-2xl text-center text-xs md:text-sm font-bold">
                  Posisi Katak Sekarang: Angka <span className="text-amber-300 text-lg">{frogPosition}</span> (
                  {NAMA_ANGKA[frogPosition]}) • Mode Terakhir:{" "}
                  <span className="uppercase text-emerald-300">Menghitung {jumpDirection}</span>
                </div>
              </div>
            )}

            {/* GAME SUB-BAB D: PASANGAN BILANGAN (NUMBER BONDS) */}
            {missionStep === 4 && (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      Game Sub-bab D • Pasangan Bilangan (Halaman 37)
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                      🔗 Mesin Pasangan Bilangan: Uraikan Angka Menjadi 2 Bagian!
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        `${bondTotal} terdiri dari pasangan bilangan ${bondLeft} dan ${bondRight}.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
                  >
                    🗣️ Bacakan Pasangan Ini
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                  <div className="space-y-3">
                    <NumberBondSVG total={bondTotal} left={bondLeft} right={bondRight} />
                    <InteractiveTenFrame
                      count={bondLeft}
                      secondCount={bondRight}
                      icon="🔵"
                      secondIcon="🟢"
                      interactive={false}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="text-xs font-black text-slate-700">
                        1. Pilih Bilangan Induk yang Ingin Diuraikan (5 s.d. 10):
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {[5, 6, 7, 8, 9, 10].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              triggerSound("pop");
                              setBondTotal(t);
                              setBondLeft(Math.min(bondLeft, t));
                            }}
                            className={`px-3.5 py-2 rounded-xl font-black text-xs ${
                              bondTotal === t
                                ? "bg-amber-400 text-slate-950 shadow"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            Angka {t}
                          </button>
                        ))}
                      </div>

                      <div className="text-xs font-black text-slate-700 pt-2">
                        2. Geser Bagian Kiri (Biru): {bondLeft} → Bagian Kanan (Hijau) Otomatis: {bondRight}
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={bondTotal}
                        value={bondLeft}
                        onChange={(e) => {
                          triggerSound("pop");
                          setBondLeft(Number(e.target.value));
                        }}
                        className="w-full accent-indigo-600"
                      />
                    </div>

                    <div className="bg-indigo-950 text-white p-4 rounded-2xl text-center">
                      <div className="text-xl font-black">
                        <span className="text-sky-300">{bondLeft}</span> dan{" "}
                        <span className="text-emerald-300">{bondRight}</span> membentuk{" "}
                        <span className="text-amber-300">{bondTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SIMULATOR PHET-STYLE (TIMBANGAN BENDA KONKRET)        */}
        {/* ============================================================ */}
        {activeTab === 3 && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                Laboratorium Interaktif PhET-Style • Kelas 1 SD
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Timbangan Benda Konkret & Bingkai 10 Kembar
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Piring Kiri */}
              <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-4 text-center space-y-3">
                <div className="text-xs font-black uppercase text-sky-800">KELOMPOK KIRI (APEL)</div>
                <div className="text-4xl font-black text-sky-950">
                  {simLeft} ({NAMA_ANGKA[simLeft]})
                </div>
                <InteractiveTenFrame
                  count={simLeft}
                  icon="🍎"
                  interactive={true}
                  onChangeCount={(v) => setSimLeft(v)}
                />
              </div>

              {/* Timbangan Jungkat-Jungkit Tengah */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="px-4 py-2 rounded-2xl bg-slate-900 text-white font-black text-xs md:text-sm text-center">
                  {simLeft === simRight
                    ? "⚖️ SAMA BANYAK!"
                    : simLeft > simRight
                    ? `👈 ${simLeft} LEBIH BANYAK DARI ${simRight}`
                    : `👉 ${simLeft} LEBIH SEDIKIT DARI ${simRight}`}
                </div>

                <svg width="230" height="125" viewBox="0 0 230 125">
                  <g
                    transform={`rotate(${tiltDeg}, 115, 68)`}
                    className="transition-transform duration-500 ease-out"
                  >
                    <rect x="15" y="62" width="200" height="10" rx="5" fill="#334155" />
                    <rect x="25" y="30" width="44" height="32" rx="8" fill="#0284c7" />
                    <text x="47" y="51" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
                      {simLeft}
                    </text>
                    <rect x="160" y="30" width="44" height="32" rx="8" fill="#f59e0b" />
                    <text x="182" y="51" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
                      {simRight}
                    </text>
                  </g>
                  <polygon points="115,70 90,118 140,118" fill="#0f172a" />
                </svg>
              </div>

              {/* Piring Kanan */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 text-center space-y-3">
                <div className="text-xs font-black uppercase text-amber-900">KELOMPOK KANAN (JERUK)</div>
                <div className="text-4xl font-black text-amber-950">
                  {simRight} ({NAMA_ANGKA[simRight]})
                </div>
                <InteractiveTenFrame
                  count={simRight}
                  icon="🍊"
                  interactive={true}
                  onChangeCount={(v) => setSimRight(v)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SMART KANVAS MENEBALKAN ANGKA 0-10                    */}
        {/* ============================================================ */}
        {activeTab === 4 && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                  Latihan Motorik Menulis Lambang Bilangan 0–10
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Kanvas Tebalkan Angka & Menggambar Benda
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      triggerSound("pop");
                      setTraceNumber(n);
                    }}
                    className={`w-8 h-8 rounded-xl font-black text-xs ${
                      traceNumber === n
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Warna Krayon:</span>
                {["#2563eb", "#e11d48", "#16a34a", "#d97706", "#7c3aed"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full border-2 ${
                      brushColor === c ? "ring-4 ring-indigo-300 border-white" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  triggerSound("click");
                  drawCanvasTemplate(traceNumber);
                }}
                className="px-4 py-1.5 rounded-xl bg-rose-100 text-rose-700 font-black text-xs"
              >
                🗑️ Ulangi Tebalkan Angka {traceNumber}
              </button>
            </div>

            <div className="border-4 border-indigo-200 rounded-3xl overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                width={820}
                height={310}
                onMouseDown={startCanvasDraw}
                onMouseMove={moveCanvasDraw}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                onTouchStart={startCanvasDraw}
                onTouchMove={moveCanvasDraw}
                onTouchEnd={() => setIsDrawing(false)}
                className="w-full h-[290px] cursor-crosshair touch-none"
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: 10 SOAL LATIHAN (1 LAYAR 1 SOAL TANPA SCROLL)         */}
        {/* ============================================================ */}
        {activeTab === 5 && currentPracticeQ && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                  Soal Latihan {practiceIdx + 1} dari 10 • +5 Token / Soal
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">{currentPracticeQ.subbabTag}</h2>
              </div>
              <div className="flex items-center gap-1.5">
                {practiceQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setPracticeIdx(i)}
                    className={`w-7 h-7 rounded-lg font-black text-xs ${
                      practiceIdx === i
                        ? "bg-indigo-600 text-white scale-110"
                        : practiceChecked[q.id]
                        ? practiceAnswers[q.id] === q.correctAnswer
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Visual Otomatis */}
              <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 text-center">
                {currentPracticeQ.visualType === "tenFrame" && (
                  <InteractiveTenFrame
                    count={currentPracticeQ.val1}
                    icon={currentPracticeQ.icon1 || "🍎"}
                  />
                )}
                {currentPracticeQ.visualType === "compare" && (
                  <div className="space-y-2">
                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-2xl">
                      {Array.from({ length: currentPracticeQ.val1 }).map((_, i) => (
                        <span key={i}>{currentPracticeQ.icon1 || "🐤"}</span>
                      ))}
                    </div>
                    <div className="text-xs font-black text-slate-400">DIBANDINGKAN DENGAN</div>
                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-2xl">
                      {Array.from({ length: currentPracticeQ.val2 || 3 }).map((_, i) => (
                        <span key={i}>{currentPracticeQ.icon2 || "🐸"}</span>
                      ))}
                    </div>
                  </div>
                )}
                {currentPracticeQ.visualType === "sequence" && (
                  <div className="flex justify-center gap-2 py-6">
                    {[currentPracticeQ.val1 - 1, currentPracticeQ.val1, "?"].map((item, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {currentPracticeQ.visualType === "numberBond" && (
                  <NumberBondSVG
                    total={currentPracticeQ.val1}
                    left={currentPracticeQ.val2 || 3}
                    right={0}
                  />
                )}
              </div>

              {/* Teks Soal & Tombol Pilihan */}
              <div className="space-y-3">
                <button
                  onClick={() => speakText(`${currentPracticeQ.story} ${currentPracticeQ.question}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-xs flex items-center gap-1.5"
                >
                  🗣️ Bacakan Soal Ini
                </button>
                <p className="text-sm text-slate-600 font-medium">{currentPracticeQ.story}</p>
                <h3 className="text-base md:text-lg font-black text-slate-900">
                  {currentPracticeQ.question}
                </h3>

                <div className="grid grid-cols-1 gap-2">
                  {currentPracticeQ.options.map((opt) => (
                    <button
                      key={opt}
                      disabled={practiceChecked[currentPracticeQ.id]}
                      onClick={() => {
                        triggerSound("click");
                        setPracticeAnswers((prev) => ({ ...prev, [currentPracticeQ.id]: opt }));
                      }}
                      className={`p-3 rounded-2xl font-extrabold text-sm text-left border-2 transition ${
                        practiceAnswers[currentPracticeQ.id] === opt
                          ? "bg-indigo-600 text-white border-indigo-800"
                          : "bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceChecked[currentPracticeQ.id] && (
                  <div
                    className={`p-3 rounded-2xl text-xs font-bold ${
                      practiceAnswers[currentPracticeQ.id] === currentPracticeQ.correctAnswer
                        ? "bg-emerald-100 text-emerald-950 border border-emerald-400"
                        : "bg-rose-100 text-rose-950 border border-rose-400"
                    }`}
                  >
                    {practiceAnswers[currentPracticeQ.id] === currentPracticeQ.correctAnswer
                      ? "✅ PINTAR SEKALI! (+5 Token = Rp 2.500)"
                      : `❌ Jawaban yang tepat: ${currentPracticeQ.correctAnswer}`}{" "}
                    — {currentPracticeQ.explanation}
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    disabled={practiceIdx === 0}
                    onClick={() => setPracticeIdx((p) => Math.max(0, p - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-200 disabled:opacity-40 font-bold text-xs"
                  >
                    ← Sebelumnya
                  </button>

                  {!practiceChecked[currentPracticeQ.id] ? (
                    <button
                      onClick={() => {
                        const sel = practiceAnswers[currentPracticeQ.id];
                        if (!sel) return;
                        setPracticeChecked((prev) => ({ ...prev, [currentPracticeQ.id]: true }));
                        if (sel === currentPracticeQ.correctAnswer) {
                          triggerSound("coin");
                          setPracticeTokens((t) => Math.min(50, t + 5));
                        } else {
                          triggerSound("wrong");
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs border-b-4 border-amber-600"
                    >
                      ✔ Periksa & Tambang +5 Token
                    </button>
                  ) : practiceIdx < practiceQuestions.length - 1 ? (
                    <button
                      onClick={() => setPracticeIdx((p) => p + 1)}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs"
                    >
                      Soal Berikutnya →
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab(6)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs"
                    >
                      🏆 Lanjut ke Evaluasi & Praktikum →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: EVALUASI ANTI-CONTEK & PRAKTIKUM KREATIF (100 TOKEN)  */}
        {/* ============================================================ */}
        {activeTab === 6 && currentEvalQ && (
          <div className="space-y-5">
            <div className="bg-slate-900 text-white rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full uppercase">
                  Evaluasi Anti-Contek • Kode: {evalSeedCode} • Percobaan #{attemptCount}
                </span>
                <h2 className="text-xl font-black mt-1">
                  Evaluasi & Praktikum Bab 1: Wajib Lulus 100% Sempurna!
                </h2>
              </div>
              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-2xl border border-indigo-500/40">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Waktu</div>
                  <div className="text-xl font-mono font-black text-amber-400">{formatTime(elapsedMs)}</div>
                </div>
                <div className="border-l border-slate-700 pl-3">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Token Bab 1</div>
                  <div className="text-lg font-black text-emerald-400">{evalTokens} / 100 🪙</div>
                </div>
              </div>
            </div>

            {!evalSubmitted ? (
              <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-indigo-700">
                    Soal Evaluasi #{evalIdx + 1} dari 10 • {currentEvalQ.subbabTag}
                  </span>
                  <button
                    onClick={() => speakText(`${currentEvalQ.story} ${currentEvalQ.question}`)}
                    className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs"
                  >
                    🗣️ Bacakan Soal
                  </button>
                </div>
                <p className="text-sm text-slate-600">{currentEvalQ.story}</p>
                <h3 className="text-base md:text-lg font-black text-slate-900">{currentEvalQ.question}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {currentEvalQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        triggerSound("click");
                        setEvalAnswers((prev) => ({ ...prev, [currentEvalQ.id]: opt }));
                      }}
                      className={`p-3 rounded-xl font-extrabold text-sm text-left border-2 ${
                        evalAnswers[currentEvalQ.id] === opt
                          ? "bg-indigo-600 text-white border-indigo-800"
                          : "bg-slate-50 text-slate-800 border-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    disabled={evalIdx === 0}
                    onClick={() => setEvalIdx((i) => Math.max(0, i - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-200 disabled:opacity-40 font-bold text-xs"
                  >
                    ← Sebelumnya
                  </button>
                  {evalIdx < evalQuestions.length - 1 ? (
                    <button
                      onClick={() => setEvalIdx((i) => i + 1)}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs"
                    >
                      Soal Berikutnya →
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (Object.keys(evalAnswers).length < evalQuestions.length) {
                          alert("Jawab ke-10 soal evaluasi terlebih dahulu!");
                          return;
                        }
                        setTimerRunning(false);
                        setEvalSubmitted(true);
                        let right = 0;
                        evalQuestions.forEach((q) => {
                          if (evalAnswers[q.id] === q.correctAnswer) right += 1;
                        });
                        const sc = right * 10;
                        setEvalScore(sc);
                        setEvalTokens((prev) => Math.max(prev, right * 7));
                        if (sc === 100) triggerSound("fanfare");
                        else triggerSound("wrong");
                      }}
                      className="px-7 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs border-b-4 border-amber-600"
                    >
                      🚀 Kunci Jawaban Evaluasi!
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div
                  className={`rounded-3xl p-6 border-2 text-center space-y-3 ${
                    evalScore === 100
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                      : "bg-amber-50 border-amber-400 text-amber-950"
                  }`}
                >
                  <h3 className="text-2xl font-black">
                    Skor Evaluasi: {evalScore} / 100 (Waktu: {formatTime(elapsedMs)})
                  </h3>
                  {evalScore < 100 && (
                    <p className="text-xs md:text-sm font-bold">
                      Raih nilai 100% Sempurna untuk membuka gembok <strong>Praktikum Kebun Buah IGIL</strong>!
                    </p>
                  )}
                  <button
                    onClick={() => {
                      triggerSound("click");
                      setAttemptCount((c) => c + 1);
                      setEvalQuestions(generateDynamicQuestions());
                      setEvalAnswers({});
                      setEvalIdx(0);
                      setEvalSubmitted(false);
                      setElapsedMs(0);
                      setTimerRunning(true);
                      setEvalSeedCode(`IGIL-K1B1-${Math.floor(100 + Math.random() * 900)}`);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs"
                  >
                    🔄 Ulangi Evaluasi dengan Soal Acak Baru
                  </button>
                </div>

                {/* GERBANG 2: PRAKTIKUM KREATIF (HANYA TERBUKA JIKA SKOR EVALUASI 100%) */}
                {evalScore === 100 && (
                  <div className="bg-white rounded-3xl shadow-xl border-4 border-emerald-400 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                          🔓 Gerbang 2 Terbuka: Praktikum Si Paling Kreatif (+30 Token)
                        </span>
                        <h3 className="text-xl font-black text-slate-900 mt-1">
                          🎨 Praktikum: Susun Keranjang 10 Buah Tiga Warna!
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 font-medium">
                      Susunlah komposisi <strong>3 jenis buah (Apel 🍎, Jeruk 🍊, dan Pisang 🍌)</strong> sehingga
                      jumlah seluruhnya <strong>tepat 10 buah</strong> dan setiap jenis buah minimal ada 1!
                    </p>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "🍎 Apel", val: gardenApples, set: setGardenApples },
                        { label: "🍊 Jeruk", val: gardenOranges, set: setGardenOranges },
                        { label: "🍌 Pisang", val: gardenBananas, set: setGardenBananas },
                      ].map((f) => (
                        <div key={f.label} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                          <div className="font-black text-sm">{f.label}</div>
                          <div className="text-2xl font-black text-indigo-600">{f.val}</div>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                triggerSound("pop");
                                f.set(Math.max(0, f.val - 1));
                              }}
                              className="w-7 h-7 rounded-lg bg-slate-200 font-black"
                            >
                              -
                            </button>
                            <button
                              onClick={() => {
                                triggerSound("pop");
                                f.set(Math.min(10, f.val + 1));
                              }}
                              className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl text-center space-y-2">
                      <div className="text-base font-black">
                        Total Buah Saat Ini: {gardenApples} + {gardenOranges} + {gardenBananas} ={" "}
                        <span className={gardenTotal === 10 ? "text-emerald-400" : "text-rose-400"}>
                          {gardenTotal} / 10 Buah
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (
                            gardenTotal !== 10 ||
                            gardenApples < 1 ||
                            gardenOranges < 1 ||
                            gardenBananas < 1
                          ) {
                            triggerSound("wrong");
                            alert(
                              "Pastikan jumlah totalnya tepat 10 buah dan ketiga jenis buah semuanya ada (minimal 1)!"
                            );
                            return;
                          }
                          triggerSound("fanfare");
                          setPracticumClaimed(true);
                          setEvalTokens(100);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                      >
                        🏆 Kumpulkan Praktikum & Kunci Total 150 Token (Rp 75.000)!
                      </button>
                      {practicumClaimed && (
                        <div className="text-xs text-emerald-300 font-bold pt-1">
                          🎉 SEMPURNA! Kamu resmi menamatkan Bab 1 Kelas 1 SD sebagai Si Paling Pintar & Si Paling
                          Kreatif!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
