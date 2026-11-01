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
    blankCanvasMasteredCount: number;
    completedAtISO: string;
  };
  auditTrail: {
    questionId: number;
    questionFormat: string;
    studentAnswer: string;
    isCorrect: boolean;
  }[];
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
    "Buku Teks Utama Matematika untuk SD/MI Kelas I (Dara Retno Wulan & Rasfaniwaty, Kemendikbudristek 2022), Bab 1, Halaman 1–38",
  coreSkills: [
    "Menghitung benda konkret, mengenal konsep bilangan 0 (nol), serta membaca dan menulis lambang bilangan 0 sampai 10 pada Bingkai 10",
    "Membandingkan banyak dua kelompok benda (lebih banyak, lebih sedikit, sama banyak) dengan pasangan satu-satu",
    "Menghitung maju (0 ke 10) dan menghitung mundur (10 ke 0) serta menyusun pasangan bilangan",
  ],
  practicumSynthesisHook:
    "Gunakan Bingkai 10 dan pasangan bilangan untuk merancang komposisi objek berjumlah tepat 10 dan membandingkan kelompok benda secara akurat.",
};

const BAB_LAIN: ChapterCompetencyMetadata[] = [
  {
    chapterId: "MAT-K1-B4",
    grade: 1,
    subject: "Matematika",
    chapterNumber: 4,
    chapterTitle: "Mengenal Bentuk",
    textbookReference: "Buku Matematika Kelas I, Bab 4",
    coreSkills: ["Mengelompokkan benda berdasarkan bentuk permukaan bangun datar"],
    practicumSynthesisHook: "Kelompokkan elemen rancangan ke dalam bentuk lingkaran, segiempat, dan segitiga.",
  },
  {
    chapterId: "BIND-K1-B1",
    grade: 1,
    subject: "Bahasa Indonesia",
    chapterNumber: 1,
    chapterTitle: "Bunyi Apa?",
    textbookReference: "Buku Bahasa Indonesia Kelas I",
    coreSkills: ["Merangkai kata sederhana dan menceritakan alasan pilihan"],
    practicumSynthesisHook: "Tuliskan laporan pengamatan sederhana tentang karya yang dibuat.",
  },
  {
    chapterId: "PPKN-K1-MANDIRI",
    grade: 1,
    subject: "Pendidikan Pancasila",
    chapterNumber: 2,
    chapterTitle: "Aku Anak Mandiri",
    textbookReference: "Buku Pendidikan Pancasila Kelas I",
    coreSkills: ["Membagi benda secara adil dan menjaga kerapian ruang"],
    practicumSynthesisHook: "Bagi porsi benda secara adil untuk teman-teman di kelas.",
  },
];

const NAMA_BILANGAN: Record<number, string> = {
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

/** Zona 3×3 pada bidang kanvas: 0 kiri-atas … 8 kanan-bawah. */
const ZONA_ANGKA: Record<number, number[]> = {
  0: [1, 3, 5, 7],
  1: [1, 4, 7],
  2: [1, 2, 4, 6, 7],
  3: [1, 2, 4, 7, 8],
  4: [0, 3, 4, 5, 7],
  5: [0, 1, 3, 4, 7],
  6: [1, 3, 4, 6, 7],
  7: [0, 1, 2, 4, 7],
  8: [1, 3, 4, 5, 7],
  9: [1, 3, 4, 5, 7],
  10: [0, 2, 3, 5, 6, 8],
};

type JenisSuara = "click" | "pop" | "jump" | "coin" | "wrong" | "fanfare";

function putarSuara(jenis: JenisSuara) {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const nada = (freq: number, dur: number, tipe: OscillatorType, mulai = 0, volume = 0.16) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tipe;
      osc.frequency.setValueAtTime(freq, now + mulai);
      gain.gain.setValueAtTime(volume, now + mulai);
      gain.gain.exponentialRampToValueAtTime(0.008, now + mulai + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + mulai);
      osc.stop(now + mulai + dur);
    };
    if (jenis === "click" || jenis === "pop") nada(jenis === "pop" ? 540 : 420, 0.07, jenis === "pop" ? "triangle" : "sine");
    else if (jenis === "jump") nada(320, 0.12, "triangle", 0, 0.18);
    else if (jenis === "coin") {
      nada(988, 0.22, "sine", 0, 0.18);
      nada(1319, 0.24, "sine", 0.08, 0.18);
    } else if (jenis === "wrong") nada(160, 0.24, "sawtooth", 0, 0.12);
    else [523, 659, 784, 1046].forEach((f, i) => nada(f, 0.28, "triangle", i * 0.1, 0.16));
    window.setTimeout(() => void ctx.close().catch(() => undefined), 1200);
  } catch {
    /* browser menolak audio */
  }
}

function ribuan(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function acak<T>(arr: T[]): T[] {
  const salin = [...arr];
  for (let i = salin.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = salin[i];
    salin[i] = salin[j];
    salin[j] = tmp;
  }
  return salin;
}

type FormatSoal = "input_angka" | "susun_tenframe" | "benar_salah" | "pilihan_hots";

interface Soal {
  id: number;
  subbabTag: string;
  format: FormatSoal;
  story: string;
  question: string;
  visualType: "tenFrame" | "compareBridge" | "sequenceTrack" | "numberBond";
  valA: number;
  valB?: number;
  iconA?: string;
  iconB?: string;
  jejak?: (number | string)[];
  options?: string[];
  statements?: { text: string; isTrue: boolean }[];
  correctAnswer: string;
  explanation: string;
}

function buatSoal(): Soal[] {
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const q1 = rand(6, 9);
  const q2 = rand(5, 9);
  const q3Awal = rand(4, 7);
  const q4A = rand(7, 9);
  const q4B = rand(3, 5);
  const q5A = rand(6, 8);
  const q5B = q5A - 2;
  const q6Cangkir = rand(5, 8);
  const q6Kue = q6Cangkir - rand(2, 3);
  const q6Tambah = q6Cangkir - q6Kue;
  const q7 = rand(4, 7);
  const q8 = rand(6, 9);
  const q9Utuh = rand(7, 10);
  const q9Kiri = rand(2, q9Utuh - 2);
  const q9Kanan = q9Utuh - q9Kiri;
  const q10Biru = [3, 4, 6, 7][rand(0, 3)];
  const q10Hijau = 10 - q10Biru;
  const sisaBurung = q4A - q4B;

  return [
    {
      id: 1,
      subbabTag: "Sub-bab A • Membilang dengan Bingkai 10",
      format: "input_angka",
      story: "Kira menyusun apel pada Bingkai 10. Hitung apel yang sudah terisi.",
      question: "Berapa banyak apel di dalam Bingkai 10? Ketik angkanya.",
      visualType: "tenFrame",
      valA: q1,
      iconA: "🍎",
      correctAnswer: `${q1}`,
      explanation: `Baris atas penuh berisi 5 apel, ditambah ${q1 - 5} apel di baris bawah. 5 + ${q1 - 5} = ${q1} (${NAMA_BILANGAN[q1]}).`,
    },
    {
      id: 2,
      subbabTag: "Sub-bab A • Membaca nama bilangan",
      format: "susun_tenframe",
      story: `Upe membaca kartu nama bilangan "${NAMA_BILANGAN[q2].toUpperCase()}".`,
      question: `Sentuh petak Bingkai 10 sampai jeruk tersusun tepat "${NAMA_BILANGAN[q2]}".`,
      visualType: "tenFrame",
      valA: q2,
      iconA: "🍊",
      correctAnswer: `${q2}`,
      explanation: `"${NAMA_BILANGAN[q2]}" ditulis ${q2}. Pada Bingkai 10 itu sama dengan 5 + ${q2 - 5} = ${q2}.`,
    },
    {
      id: 3,
      subbabTag: "Sub-bab A • Bilangan 0",
      format: "input_angka",
      story: `Di piring semula ada ${q3Awal} donat. Tora dan teman-teman memakan semuanya sampai piring kosong.`,
      question: "Lambang bilangan berapa yang menyatakan banyak donat di piring kosong?",
      visualType: "tenFrame",
      valA: 0,
      iconA: "🍩",
      correctAnswer: "0",
      explanation: "Piring yang tidak berisi benda lagi dinyatakan dengan lambang 0 (nol).",
    },
    {
      id: 4,
      subbabTag: "Sub-bab B • Pasangan satu-satu",
      format: "pilihan_hots",
      story: `Kelompok atas punya ${q4A} burung. Kelompok bawah punya ${q4B} bunga.`,
      question: "Jika 1 burung dipasangkan dengan 1 bunga, manakah kesimpulan yang benar?",
      visualType: "compareBridge",
      valA: q4A,
      valB: q4B,
      iconA: "🐦",
      iconB: "🌻",
      options: acak([
        `Burung lebih banyak dari bunga, dan ada ${sisaBurung} burung yang tidak mendapat pasangan bunga`,
        `Bunga lebih banyak dari burung, dan ada ${sisaBurung} bunga yang tersisa`,
        "Banyak burung sama banyak dengan banyak bunga",
        `Burung lebih sedikit dari bunga karena ${q4A} kurang dari ${q4B}`,
      ]),
      correctAnswer: `Burung lebih banyak dari bunga, dan ada ${sisaBurung} burung yang tidak mendapat pasangan bunga`,
      explanation: `Terbentuk ${q4B} pasangan. Masih ada ${sisaBurung} burung. ${q4A} lebih banyak dari ${q4B}.`,
    },
    {
      id: 5,
      subbabTag: "Sub-bab B • Benar atau salah",
      format: "benar_salah",
      story: `Malosi punya ${q5A} mobil-mobilan. Tora punya ${q5B} pesawat mainan.`,
      question: "Tentukan ketiga pernyataan ini benar atau salah.",
      visualType: "compareBridge",
      valA: q5A,
      valB: q5B,
      iconA: "🚗",
      iconB: "✈️",
      statements: [
        { text: `${q5A} mobil-mobilan LEBIH BANYAK dari ${q5B} pesawat mainan.`, isTrue: true },
        { text: `${q5B} pesawat mainan LEBIH SEDIKIT dari ${q5A} mobil-mobilan.`, isTrue: true },
        { text: `${q5A} mobil-mobilan SAMA BANYAK dengan ${q5B} pesawat mainan.`, isTrue: false },
      ],
      correctAnswer: "true-true-false",
      explanation: `${q5A} lebih besar dari ${q5B}. Mobil-mobilan lebih banyak, pesawat lebih sedikit, dan keduanya tidak sama banyak.`,
    },
    {
      id: 6,
      subbabTag: "Sub-bab B • Membuat sama banyak",
      format: "input_angka",
      story: `Ibu Guru menyiapkan ${q6Cangkir} cangkir susu, tetapi baru ada ${q6Kue} kue bolu.`,
      question: `Berapa kue bolu lagi agar kue bolu SAMA BANYAK dengan ${q6Cangkir} cangkir?`,
      visualType: "compareBridge",
      valA: q6Cangkir,
      valB: q6Kue,
      iconA: "🥛",
      iconB: "🧁",
      correctAnswer: `${q6Tambah}`,
      explanation: `${q6Kue} + ${q6Tambah} = ${q6Cangkir}. Jadi kue yang ditambah adalah ${q6Tambah}.`,
    },
    {
      id: 7,
      subbabTag: "Sub-bab C • Menghitung maju",
      format: "input_angka",
      story: `Urutan hitung maju: ${q7 - 1}, ${q7}, [ ? ], ${q7 + 2}.`,
      question: `Bilangan berapa yang tepat di antara ${q7} dan ${q7 + 2}?`,
      visualType: "sequenceTrack",
      valA: q7,
      valB: q7 + 2,
      jejak: [q7 - 1, q7, "?", q7 + 2],
      correctAnswer: `${q7 + 1}`,
      explanation: `Menghitung maju bertambah 1. Sesudah ${q7} dan sebelum ${q7 + 2} adalah ${q7 + 1}.`,
    },
    {
      id: 8,
      subbabTag: "Sub-bab C • Menghitung mundur",
      format: "input_angka",
      story: `Kira menghitung mundur: ${q8 + 1}, ${q8}, [ ? ], ${q8 - 2}.`,
      question: `Bilangan berapa yang diucapkan tepat sesudah ${q8} saat menghitung mundur?`,
      visualType: "sequenceTrack",
      valA: q8,
      valB: q8 - 2,
      jejak: [q8 + 1, q8, "?", q8 - 2],
      correctAnswer: `${q8 - 1}`,
      explanation: `Menghitung mundur berkurang 1. Satu langkah sesudah ${q8} adalah ${q8 - 1}.`,
    },
    {
      id: 9,
      subbabTag: "Sub-bab D • Pasangan bilangan",
      format: "input_angka",
      story: `Bilangan induk ${q9Utuh} diuraikan menjadi ${q9Kiri} dan satu bagian di cabang kanan.`,
      question: `Bilangan berapa yang berpasangan dengan ${q9Kiri} agar menjadi ${q9Utuh}?`,
      visualType: "numberBond",
      valA: q9Utuh,
      valB: q9Kiri,
      correctAnswer: `${q9Kanan}`,
      explanation: `${q9Kiri} + ${q9Kanan} = ${q9Utuh}.`,
    },
    {
      id: 10,
      subbabTag: "Sub-bab D • Pasangan pembentuk 10",
      format: "pilihan_hots",
      story: `Bingkai 10 sudah terisi ${q10Biru} bola biru. Kotak yang masih kosong akan diisi bola hijau.`,
      question: "Pasangan bilangan manakah yang tepat untuk seluruh Bingkai 10?",
      visualType: "tenFrame",
      valA: q10Biru,
      valB: q10Hijau,
      iconA: "🔵",
      iconB: "🟢",
      options: acak([
        `10 terdiri dari pasangan bilangan ${q10Biru} bola biru dan ${q10Hijau} bola hijau`,
        `10 terdiri dari pasangan bilangan ${q10Biru} bola biru dan ${q10Biru} bola hijau`,
        `${q10Biru} terdiri dari pasangan bilangan 10 dan ${q10Hijau}`,
        `10 terdiri dari pasangan bilangan ${q10Hijau + 1} bola biru dan ${q10Biru} bola hijau`,
      ]),
      correctAnswer: `10 terdiri dari pasangan bilangan ${q10Biru} bola biru dan ${q10Hijau} bola hijau`,
      explanation: `${q10Biru} + ${q10Hijau} = 10. Kotak kosong yang diisi hijau adalah ${q10Hijau}.`,
    },
  ];
}

function BurungHantu({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="3" />
      <polygon points="16,18 22,8 26,18" fill="#f59e0b" />
      <polygon points="48,18 42,8 38,18" fill="#f59e0b" />
      <ellipse cx="32" cy="36" rx="18" ry="17" fill="#4f46e5" />
      <ellipse cx="32" cy="40" rx="12" ry="11" fill="#e0e7ff" />
      <circle cx="24" cy="27" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="40" cy="27" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="24" cy="27" r="3.5" fill="#0f172a" />
      <circle cx="40" cy="27" r="3.5" fill="#0f172a" />
      <polygon points="29,31 35,31 32,37" fill="#f59e0b" />
    </svg>
  );
}

function Jari({ jumlah }: { jumlah: number }) {
  const kiri = Math.min(5, jumlah);
  const kanan = Math.max(0, jumlah - 5);
  const tangan = (naik: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className="flex items-end gap-1 h-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-full ${i < naik ? "h-9 bg-amber-500 border border-amber-700" : "h-3 bg-amber-200 border border-amber-400"}`}
          />
        ))}
      </div>
      <div className="w-16 h-4 bg-amber-400 rounded-b-xl border border-amber-700 text-[9px] font-black text-center text-amber-950">
        {label} ({naik})
      </div>
    </div>
  );
  return (
    <div className="inline-flex items-center gap-4 bg-amber-50 border-2 border-amber-300 px-4 py-2 rounded-2xl">
      {tangan(kiri, "Kiri")}
      {tangan(kanan, "Kanan")}
    </div>
  );
}

function Bingkai10({
  utama,
  kedua = 0,
  ikonUtama = "🍎",
  ikonKedua = "🍊",
  bisaSentuh = false,
  onUbah,
}: {
  utama: number;
  kedua?: number;
  ikonUtama?: string;
  ikonKedua?: string;
  bisaSentuh?: boolean;
  onUbah?: (jumlah: number) => void;
}) {
  return (
    <div className="bg-amber-100 border-4 border-amber-800 rounded-3xl p-3 max-w-[330px] mx-auto" data-bingkai="10">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, idx) => {
          const isiUtama = idx < utama;
          const isiKedua = !isiUtama && idx < utama + kedua;
          return (
            <button
              key={idx}
              type="button"
              data-isi={isiUtama ? "utama" : isiKedua ? "kedua" : "kosong"}
              onClick={() => {
                if (!bisaSentuh || !onUbah) return;
                onUbah(idx + 1 === utama ? idx : idx + 1);
              }}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-2xl ${
                bisaSentuh ? "cursor-pointer" : "cursor-default"
              } ${isiUtama ? "bg-white border-amber-600" : isiKedua ? "bg-emerald-50 border-emerald-600" : "bg-amber-50 border-amber-300"}`}
            >
              {isiUtama ? ikonUtama : isiKedua ? ikonKedua : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ikatan({ utuh, kiri, kanan }: { utuh: number | string; kiri: number | string; kanan: number | string }) {
  return (
    <svg viewBox="0 0 260 165" className="w-full max-w-[240px] mx-auto" data-peran="ikatan">
      <line x1="130" y1="44" x2="65" y2="122" stroke="#1e293b" strokeWidth="5" />
      <line x1="130" y1="44" x2="195" y2="122" stroke="#1e293b" strokeWidth="5" />
      <circle cx="130" cy="40" r="30" fill="#f59e0b" stroke="#78350f" strokeWidth="4" />
      <text x="130" y="49" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900" data-ikatan="induk">
        {utuh}
      </text>
      <circle cx="65" cy="125" r="26" fill="#2563eb" stroke="#1e3a8a" strokeWidth="4" />
      <text x="65" y="134" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="900" data-ikatan="kiri">
        {kiri}
      </text>
      <circle cx="195" cy="125" r="26" fill="#10b981" stroke="#064e3b" strokeWidth="4" />
      <text x="195" y="134" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="900" data-ikatan="kanan">
        {kanan}
      </text>
    </svg>
  );
}

function GambarSoal({
  soal,
  terbuka,
  susun,
  onSusun,
}: {
  soal: Soal;
  terbuka: boolean;
  susun: number;
  onSusun?: (n: number) => void;
}) {
  if (soal.format === "susun_tenframe") {
    return (
      <Bingkai10
        utama={susun}
        ikonUtama={soal.iconA || "🍊"}
        bisaSentuh={!terbuka}
        onUbah={onSusun}
      />
    );
  }
  if (soal.visualType === "tenFrame") {
    const tunjukkanKedua = terbuka && soal.id === 10;
    return (
      <Bingkai10
        utama={soal.valA}
        kedua={tunjukkanKedua ? soal.valB || 0 : 0}
        ikonUtama={soal.iconA || "🍎"}
        ikonKedua={soal.iconB || "🟢"}
      />
    );
  }
  if (soal.visualType === "compareBridge") {
    return (
      <div className="space-y-2">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-2xl" data-kelompok="a">
          {Array.from({ length: soal.valA }).map((_, i) => (
            <span key={i}>{soal.iconA || "🐦"}</span>
          ))}
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-2xl" data-kelompok="b">
          {Array.from({ length: soal.valB || 0 }).map((_, i) => (
            <span key={i}>{soal.iconB || "🌻"}</span>
          ))}
        </div>
      </div>
    );
  }
  if (soal.visualType === "sequenceTrack") {
    const jejak = soal.jejak || [soal.valA, "?", soal.valB ?? ""];
    return (
      <div className="flex justify-center gap-2 py-6 flex-wrap">
        {jejak.map((v, i) => (
          <div
            key={i}
            data-jejak={String(v)}
            className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl"
          >
            {v}
          </div>
        ))}
      </div>
    );
  }
  return <Ikatan utuh={soal.valA} kiri={soal.valB ?? "?"} kanan="?" />;
}

export default function MatematikaKelas1Bab1({
  studentId = "SISWA-K1-01",
  studentName = "Sahabat Cilik",
  completedOtherChapters = BAB_LAIN,
  onChapterComplete,
}: IGILModuleProps) {
  const [kartu, setKartu] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [suaraNyala, setSuaraNyala] = useState(true);
  const [kartu2Terbuka, setKartu2Terbuka] = useState(false);
  const [kartu5Terbuka, setKartu5Terbuka] = useState(false);
  const [kartu6Terbuka, setKartu6Terbuka] = useState(false);
  const [idLatihan, setIdLatihan] = useState<number[]>([]);
  const [tokenUjian, setTokenUjian] = useState(0);
  const [tokenPraktik, setTokenPraktik] = useState(0);
  const tokenLatihan = Math.min(30, idLatihan.length * 3);
  const tokenBab = tokenLatihan + tokenUjian + tokenPraktik;

  const [bola, setBola] = useState(4);
  const bolaRef = useRef(4);
  const gembokRef = useRef(false);
  const [isianNol, setIsianNol] = useState("");
  const [umpan, setUmpan] = useState<string | null>(null);

  const [subbab, setSubbab] = useState<"A" | "B" | "C" | "D">("A");
  const [apelKira, setApelKira] = useState(7);
  const [temuanA, setTemuanA] = useState("");
  const [cekA, setCekA] = useState<boolean | null>(null);
  const [cangkir, setCangkir] = useState(6);
  const [sendok, setSendok] = useState(4);
  const [pilihanB, setPilihanB] = useState<string | null>(null);
  const [tangga, setTangga] = useState(5);
  const [temuanC, setTemuanC] = useState("");
  const [cekC, setCekC] = useState<boolean | null>(null);
  const [induk, setInduk] = useState(8);
  const [cabang, setCabang] = useState(5);
  const [temuanD, setTemuanD] = useState("");
  const [cekD, setCekD] = useState<boolean | null>(null);

  const [kiriLab, setKiriLab] = useState(6);
  const [kananLab, setKananLab] = useState(4);
  const [angkaTulis, setAngkaTulis] = useState(5);
  const kanvasKiri = useRef<HTMLCanvasElement | null>(null);
  const kanvasKanan = useRef<HTMLCanvasElement | null>(null);
  const titikKiri = useRef<{ x: number; y: number }[]>([]);
  const titikKanan = useRef<{ x: number; y: number }[]>([]);
  const sedangGambar = useRef<"kiri" | "kanan" | null>(null);
  const [hasilKanvas, setHasilKanvas] = useState<string | null>(null);
  const [angkaMandiri, setAngkaMandiri] = useState<number[]>([]);

  const [soalLatihan, setSoalLatihan] = useState<Soal[]>([]);
  const [idxLatihan, setIdxLatihan] = useState(0);
  const [jawabLatihan, setJawabLatihan] = useState<Record<number, string>>({});
  const [cekLatihan, setCekLatihan] = useState<Record<number, boolean>>({});
  const [susun, setSusun] = useState(0);
  const [pilihanBs, setPilihanBs] = useState<Record<number, boolean>>({});
  const klaimRef = useRef<number[]>([]);

  const [soalUjian, setSoalUjian] = useState<Soal[]>([]);
  const [idxUjian, setIdxUjian] = useState(0);
  const [jawabUjian, setJawabUjian] = useState<Record<number, string>>({});
  const [ujianSelesai, setUjianSelesai] = useState(false);
  const [skorUjian, setSkorUjian] = useState(0);
  const [percobaan, setPercobaan] = useState(1);
  const [mulaiUjian, setMulaiUjian] = useState(0);
  const [detikUjian, setDetikUjian] = useState(0);
  const [pindahLayar, setPindahLayar] = useState(0);
  const [waktuManusia, setWaktuManusia] = useState(false);
  const ujianBerjalan = useRef(false);
  const fokusTerakhir = useRef(0);
  const arsipLulus = useRef<ChapterCompletionPayload["auditTrail"]>([]);
  const durasiLulus = useRef(0);
  const pindahLulus = useRef(0);
  const percobaanLulus = useRef(1);

  const bekalRef = useRef({ apel: 3, roti: 3, keju: 2 });
  const [apelBekal, setApelBekal] = useState(3);
  const [rotiBekal, setRotiBekal] = useState(3);
  const [kejuBekal, setKejuBekal] = useState(2);
  const [cabangKiri, setCabangKiri] = useState("");
  const [cabangKanan, setCabangKanan] = useState("");
  const [laporan, setLaporan] = useState("");
  const [rubrik, setRubrik] = useState<PracticumEvaluationRubric | null>(null);
  const totalBekal = apelBekal + rotiBekal + kejuBekal;

  const sfx = useCallback(
    (jenis: JenisSuara) => {
      if (suaraNyala) putarSuara(jenis);
    },
    [suaraNyala],
  );

  const bicara = (teks: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks);
    u.lang = "id-ID";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    setSoalLatihan(buatSoal());
    setSoalUjian(buatSoal());
  }, []);

  useEffect(() => {
    if (Object.keys(cekLatihan).length >= 10) setKartu5Terbuka(true);
  }, [cekLatihan]);

  useEffect(() => {
    if (kartu !== 5 || ujianSelesai) return;
    if (ujianBerjalan.current) return;
    ujianBerjalan.current = true;
    setMulaiUjian(Date.now());
    setDetikUjian(0);
  }, [kartu, ujianSelesai]);

  useEffect(() => {
    if (kartu !== 5 || ujianSelesai || mulaiUjian === 0) return;
    const id = window.setInterval(() => {
      setDetikUjian(Math.floor((Date.now() - mulaiUjian) / 1000));
    }, 100);
    return () => window.clearInterval(id);
  }, [kartu, ujianSelesai, mulaiUjian]);

  useEffect(() => {
    if (kartu !== 5 || ujianSelesai) return;
    const catat = () => {
      const kini = Date.now();
      if (kini - fokusTerakhir.current < 800) return;
      fokusTerakhir.current = kini;
      setPindahLayar((n) => n + 1);
    };
    const saatSembunyi = () => {
      if (document.hidden) catat();
    };
    document.addEventListener("visibilitychange", saatSembunyi);
    window.addEventListener("blur", catat);
    return () => {
      document.removeEventListener("visibilitychange", saatSembunyi);
      window.removeEventListener("blur", catat);
    };
  }, [kartu, ujianSelesai]);

  useEffect(() => {
    const soalAktif = kartu === 5 ? soalUjian[idxUjian] : soalLatihan[idxLatihan];
    const jawaban = soalAktif
      ? kartu === 5
        ? jawabUjian[soalAktif.id]
        : jawabLatihan[soalAktif.id]
      : "";
    if (soalAktif?.format === "susun_tenframe") setSusun(Number(jawaban || 0));
    else setSusun(0);
    if (soalAktif?.format === "benar_salah" && jawaban) {
      const bagian = jawaban.split("-");
      if (bagian.length === 3 && bagian.every((x) => x === "true" || x === "false")) {
        setPilihanBs({ 0: bagian[0] === "true", 1: bagian[1] === "true", 2: bagian[2] === "true" });
        return;
      }
    }
    setPilihanBs({});
  }, [idxLatihan, idxUjian, kartu, soalLatihan, soalUjian, jawabLatihan, jawabUjian]);

  const siapkanKanvas = useCallback((angka: number) => {
    titikKiri.current = [];
    titikKanan.current = [];
    sedangGambar.current = null;
    setHasilKanvas(null);
    const gambarPetak = (kanvas: HTMLCanvasElement, warna: string) => {
      const ctx = kanvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = warna;
      ctx.fillRect(0, 0, kanvas.width, kanvas.height);
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      for (let x = 0; x <= kanvas.width; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, kanvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= kanvas.height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(kanvas.width, y);
        ctx.stroke();
      }
    };
    const kiri = kanvasKiri.current;
    const kanan = kanvasKanan.current;
    if (kiri) {
      gambarPetak(kiri, "#f8fafc");
      const ctx = kiri.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.font = "900 150px sans-serif";
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 6;
        ctx.setLineDash([8, 10]);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText(String(angka), kiri.width / 2, kiri.height / 2 + 8);
        ctx.restore();
      }
    }
    if (kanan) gambarPetak(kanan, "#ffffff");
  }, []);

  useEffect(() => {
    if (kartu !== 3) return;
    siapkanKanvas(angkaTulis);
  }, [kartu, angkaTulis, siapkanKanvas]);

  const koordinat = (kanvas: HTMLCanvasElement, e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = kanvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / Math.max(1, r.width)) * kanvas.width,
      y: ((e.clientY - r.top) / Math.max(1, r.height)) * kanvas.height,
    };
  };

  const mulaiGores = (e: React.PointerEvent<HTMLCanvasElement>, sisi: "kiri" | "kanan") => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const kanvas = sisi === "kiri" ? kanvasKiri.current : kanvasKanan.current;
    if (!kanvas) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    kanvas.setPointerCapture(e.pointerId);
    const p = koordinat(kanvas, e);
    sedangGambar.current = sisi;
    ctx.setLineDash([]);
    ctx.strokeStyle = sisi === "kiri" ? "#2563eb" : "#059669";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    (sisi === "kiri" ? titikKiri : titikKanan).current.push(p);
  };

  const jalanGores = (e: React.PointerEvent<HTMLCanvasElement>, sisi: "kiri" | "kanan") => {
    if (sedangGambar.current !== sisi) return;
    const kanvas = sisi === "kiri" ? kanvasKiri.current : kanvasKanan.current;
    if (!kanvas) return;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    const p = koordinat(kanvas, e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    (sisi === "kiri" ? titikKiri : titikKanan).current.push(p);
  };

  const lepasGores = () => {
    sedangGambar.current = null;
  };

  const periksaKanvas = () => {
    const kiri = titikKiri.current;
    const kanan = titikKanan.current;
    if (kiri.length < 12) {
      sfx("wrong");
      setHasilKanvas("Latih dulu goresan di kanvas kiri, lalu tulis sendiri di kanvas kanan.");
      return;
    }
    if (kanan.length < 15) {
      sfx("wrong");
      setHasilKanvas("Kamu baru menebalkan di kiri. Sekarang tulis angka itu di kanvas kanan yang kosong.");
      return;
    }
    const ys = kanan.map((p) => p.y);
    const tinggi = Math.max(...ys) - Math.min(...ys);
    if (tinggi < 45) {
      sfx("wrong");
      setHasilKanvas("Tulisan di kanvas kanan masih terlalu kecil. Buat angkanya lebih besar.");
      return;
    }
    const kanvas = kanvasKanan.current;
    const lebar = kanvas?.width || 380;
    const tinggiKanvas = kanvas?.height || 250;
    const zona = new Set<number>();
    kanan.forEach((p) => {
      const kolom = Math.min(2, Math.max(0, Math.floor((p.x / lebar) * 3)));
      const baris = Math.min(2, Math.max(0, Math.floor((p.y / tinggiKanvas) * 3)));
      zona.add(baris * 3 + kolom);
    });
    const wajib = ZONA_ANGKA[angkaTulis] || [1, 4, 7];
    const kena = wajib.filter((z) => zona.has(z)).length;
    const skorKanan = Math.min(100, Math.round((kena / wajib.length) * 100));
    const skorKiri = Math.min(100, Math.round(Math.min(1, kiri.length / 25) * 100));
    const lulus = skorKiri >= 75 && skorKanan >= 75;
    if (lulus) {
      sfx("fanfare");
      setAngkaMandiri((prev) => (prev.includes(angkaTulis) ? prev : [...prev, angkaTulis]));
      bicara(`Hebat. Kamu menulis angka ${NAMA_BILANGAN[angkaTulis]} di kanvas kosong.`);
      setHasilKanvas(`LULUS. Bentuk angka ${angkaTulis} (${NAMA_BILANGAN[angkaTulis]}) di kanvas kosong mencapai ${skorKanan}%.`);
    } else {
      sfx("wrong");
      setHasilKanvas(`Bentuk angka ${angkaTulis} di kanvas kosong baru ${skorKanan}%. Lihat garis bantu di kiri, lalu tulis ulang.`);
    }
  };

  const ubahBekal = (kunci: "apel" | "roti" | "keju", delta: number) => {
    const s = bekalRef.current;
    const total = s.apel + s.roti + s.keju;
    if (delta > 0 && total >= 10) return;
    const berikut = s[kunci] + delta;
    if (berikut < 0 || berikut > 10) return;
    s[kunci] = berikut;
    setApelBekal(s.apel);
    setRotiBekal(s.roti);
    setKejuBekal(s.keju);
    sfx("pop");
  };

  const kalimatBenar = () => {
    const a = bekalRef.current.apel;
    const b = bekalRef.current.roti;
    const c = bekalRef.current.keju;
    const total = a + b + c;
    let teks = `Saya menyusun ${a} apel lingkaran, ${b} roti segiempat, dan ${c} keju segitiga. ${a} + ${b} + ${c} = ${total}.`;
    const ka = Number(cabangKiri);
    const kb = Number(cabangKanan);
    if (Number.isInteger(ka) && Number.isInteger(kb) && ka > 0 && kb > 0 && ka + kb === total) {
      teks += ` Pasangan bilangan ${ka} dan ${kb} karena ${ka} + ${kb} = ${total}.`;
    }
    return teks;
  };

  const nilaiPraktik = () => {
    const aBekal = bekalRef.current.apel;
    const bBekal = bekalRef.current.roti;
    const cBekal = bekalRef.current.keju;
    const jumlahBekal = aBekal + bBekal + cBekal;
    const ka = Number(cabangKiri);
    const kb = Number(cabangKanan);
    const penuh = jumlahBekal === 10;
    const ikatanTepat =
      Number.isInteger(ka) && Number.isInteger(kb) && ka > 0 && kb > 0 && ka + kb === jumlahBekal;
    let akurasi = 100;
    if (penuh) akurasi += 110;
    if (ikatanTepat) akurasi += 90;
    const tigaBentuk = aBekal >= 1 && bBekal >= 1 && cBekal >= 1;
    let sintesis = 90;
    if (tigaBentuk) sintesis += 100;
    if (penuh && ikatanTepat) sintesis += 60;
    const bonusKanvas = Math.min(80, angkaMandiri.length * 20);
    const seimbang = aBekal >= 2 && bBekal >= 2 && cBekal >= 2 ? 120 : 85;
    const visual = Math.min(200, bonusKanvas + seimbang);
    const bersih = laporan.trim();
    const kata = bersih ? bersih.split(/\s+/).length : 0;
    const adaKata = /\d+|sepuluh|apel|roti|keju|lingkaran|segitiga|segiempat/i.test(bersih);
    let nalar = Math.min(160, kata * 12);
    if (adaKata) nalar += 90;
    nalar = Math.min(250, nalar);
    const total = akurasi + sintesis + visual + nalar;
    const hasil: PracticumEvaluationRubric = {
      accuracyScore: akurasi,
      synthesisScore: sintesis,
      optimizationVisualScore: visual,
      reasoningReportScore: nalar,
      totalQualityScore: total,
      aiFeedbackSummary:
        penuh && ikatanTepat && total >= 850
          ? `IGIL bangga. Kamu menyusun ${aBekal} apel lingkaran, ${bBekal} roti segiempat, dan ${cBekal} keju segitiga. ${aBekal} + ${bBekal} + ${cBekal} = 10. Pasangan ${ka} dan ${kb} karena ${ka} + ${kb} = 10.`
          : "Pastikan benda di Bingkai 10 berjumlah 10, kedua cabang jika dijumlahkan sama dengan jumlah benda itu, dan ceritakan banyak tiap bentuk.",
    };
    sfx("fanfare");
    setRubrik(hasil);
    setTokenPraktik(50);
    const tokenAkhir = Math.min(150, tokenLatihan + tokenUjian + 50);
    const ujianLulus = tokenUjian === 70;
    void onChapterComplete?.({
      chapterId: CHAPTER_COMPETENCY_METADATA.chapterId,
      studentId,
      practiceTokensEarned: tokenLatihan,
      examTokensEarned: tokenUjian,
      practicumTokensEarned: 50,
      totalChapterTokens: tokenAkhir,
      examScore: ujianLulus ? 100 : skorUjian,
      practicumRubric: hasil,
      telemetry: {
        attemptCount: percobaanLulus.current,
        examDurationSeconds: durasiLulus.current,
        tabSwitchCount: pindahLulus.current,
        isHumanTimingValid: ujianLulus,
        blankCanvasMasteredCount: angkaMandiri.length,
        completedAtISO: new Date().toISOString(),
      },
      auditTrail: arsipLulus.current,
    });
    bicara(`Karya tersimpan di perangkat ini. Token bab ini ${tokenAkhir}.`);
  };

  const bukaKartu = (id: 1 | 2 | 3 | 4 | 5 | 6, terkunci: boolean) => {
    if (terkunci) {
      sfx("wrong");
      bicara(
        id <= 4
          ? "Kosongkan dulu keranjang Upe, lalu ketik lambang bilangan untuk wadah kosong."
          : id === 5
            ? "Periksa dulu sepuluh soal latihan."
            : "Raih nilai seratus pada ujian, dan kerjakan sedikitnya tiga puluh detik.",
      );
      return;
    }
    sfx("click");
    setKartu(id);
  };

  const rakitBs = (next: Record<number, boolean>) => {
    if ([0, 1, 2].some((i) => typeof next[i] !== "boolean")) return "";
    return `${next[0]}-${next[1]}-${next[2]}`;
  };

  const soalL = soalLatihan[idxLatihan];
  const soalU = soalUjian[idxUjian];

  const panelJawab = (
    soal: Soal,
    jawaban: Record<number, string>,
    terkunci: boolean,
    simpan: (teks: string) => void,
  ) => (
    <div className="space-y-3">
      <button type="button" onClick={() => bicara(`${soal.story} ${soal.question}`)} className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 font-black text-xs">
        Bacakan soal
      </button>
      <p className="text-sm text-slate-600" data-peran="cerita">{soal.story}</p>
      <h3 className="text-base md:text-lg font-black text-slate-900">{soal.question}</h3>
      {soal.format === "input_angka" && (
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 11 }).map((_, num) => (
            <button
              key={num}
              type="button"
              disabled={terkunci}
              onClick={() => {
                sfx("click");
                simpan(`${num}`);
              }}
              className={`w-10 h-10 rounded-xl font-black text-base border-2 ${
                jawaban[soal.id] === `${num}` ? "bg-indigo-600 text-white border-indigo-900" : "bg-white text-slate-800 border-slate-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
      {soal.format === "susun_tenframe" && (
        <p className="text-xs font-bold text-amber-950 bg-amber-50 border border-amber-200 rounded-xl p-3">
          Petak yang kamu isi: {jawaban[soal.id] || "0"}
        </p>
      )}
      {soal.format === "benar_salah" &&
        soal.statements?.map((st, sIdx) => (
          <div key={sIdx} data-pernyataan={sIdx} className="flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold flex-1">{st.text}</span>
            <div className="flex gap-1.5">
              {[
                { label: "Benar", val: true },
                { label: "Salah", val: false },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  disabled={terkunci}
                  onClick={() => {
                    const next = { ...pilihanBs, [sIdx]: btn.val };
                    setPilihanBs(next);
                    const rakit = rakitBs(next);
                    if (rakit) simpan(rakit);
                    sfx("click");
                  }}
                  className={`px-2.5 py-1 rounded-lg font-black text-sm ${
                    pilihanBs[sIdx] === btn.val ? "bg-indigo-600 text-white" : "bg-white border border-slate-300"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      {soal.format === "pilihan_hots" &&
        soal.options?.map((opt, i) => (
          <button
            key={`${soal.id}-${i}`}
            type="button"
            disabled={terkunci}
            onClick={() => {
              sfx("click");
              simpan(opt);
            }}
            className={`w-full p-3 rounded-xl font-extrabold text-base text-left border-2 ${
              jawaban[soal.id] === opt ? "bg-indigo-600 text-white border-indigo-900" : "bg-white text-slate-800 border-slate-200"
            }`}
          >
            {opt}
          </button>
        ))}
    </div>
  );

  const hubungan = (a: number, b: number) => (a > b ? "LEBIH BANYAK DARI" : a < b ? "LEBIH SEDIKIT DARI" : "SAMA BANYAK DENGAN");

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 font-sans pb-16">
      <header className="sticky top-0 z-30 bg-indigo-950 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BurungHantu />
            <div>
              <p className="text-[11px] font-black uppercase text-amber-300">Kelas 1 SD • Bab 1 • {studentName}</p>
              <h1 className="text-lg md:text-xl font-black">Ayo Membilang sampai dengan 10</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSuaraNyala((v) => !v)} className="px-3 py-1.5 rounded-xl bg-indigo-800 text-xs font-bold">
              {suaraNyala ? "Suara nyala" : "Suara mati"}
            </button>
            <div className="bg-slate-950 border-2 border-amber-400 rounded-2xl px-4 py-1">
              <div className="text-[10px] text-amber-200 font-bold">Token bab ini</div>
              <div className="text-base font-black text-amber-300">{tokenBab} / 150</div>
              <div className="text-[10px] text-slate-300">
                Latihan {tokenLatihan}/30 • Ujian {tokenUjian}/70 • Praktikum {tokenPraktik}/50
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3 flex gap-1.5 overflow-x-auto">
          {(
            [
              { id: 1 as const, label: "1. Silabus", terkunci: false },
              { id: 2 as const, label: "2. Materi", terkunci: !kartu2Terbuka },
              { id: 3 as const, label: "3. Kanvas", terkunci: !kartu2Terbuka },
              { id: 4 as const, label: "4. Latihan", terkunci: !kartu2Terbuka },
              { id: 5 as const, label: "5. Ujian", terkunci: !kartu5Terbuka },
              { id: 6 as const, label: "6. Praktikum", terkunci: !kartu6Terbuka },
            ]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => bukaKartu(tab.id, tab.terkunci)}
              className={`px-3 py-2 rounded-xl font-extrabold text-xs whitespace-nowrap border-b-4 ${
                kartu === tab.id
                  ? "bg-amber-400 text-slate-950 border-amber-600"
                  : tab.terkunci
                    ? "bg-slate-800 text-slate-400 border-slate-950"
                    : "bg-indigo-800 text-white border-indigo-950"
              }`}
            >
              {tab.terkunci ? "Terkunci " : ""}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {kartu === 1 && (
          <>
            <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-indigo-800">{CHAPTER_COMPETENCY_METADATA.textbookReference}</p>
                  <h2 className="text-2xl font-black mt-1">Peta belajar bilangan 0 sampai 10</h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    bicara(
                      "Mari membilang sampai sepuluh bersama Kira, Upe, Malosi, dan Tora. Kita memakai Bingkai Sepuluh, membandingkan banyak benda, menghitung maju dan mundur, serta mencari pasangan bilangan.",
                    )
                  }
                  className="px-4 py-2 rounded-2xl bg-indigo-600 text-white font-black text-xs"
                >
                  Dengarkan IGIL
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                {[
                  ["A", "Membilang 0–10", "Hitung benda, kenali 0, dan susun pada Bingkai 10."],
                  ["B", "Membandingkan", "Lebih banyak, lebih sedikit, atau sama banyak."],
                  ["C", "Maju dan mundur", "Maju bertambah 1. Mundur berkurang 1."],
                  ["D", "Pasangan bilangan", "Satu bilangan diurai menjadi dua bagian."],
                ].map(([kode, judul, isi]) => (
                  <div key={kode} className="rounded-2xl bg-slate-900 text-white p-4">
                    <p className="text-amber-300 text-xs font-black">Sub-bab {kode}</p>
                    <p className="font-black text-lg">{judul}</p>
                    <p className="text-slate-300 text-xs mt-1">{isi}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-3xl border-2 border-amber-300 p-6 space-y-4">
              <div className="flex flex-wrap justify-between gap-3">
                <h3 className="text-xl font-black">Keranjang bola Upe</h3>
                <button
                  type="button"
                  onClick={() =>
                    bicara("Di keranjang Upe ada empat bola. Pindahkan satu per satu. Saat keranjang kosong, banyak bolanya nol.")
                  }
                  className="px-4 py-2 rounded-xl bg-amber-500 font-black text-xs"
                >
                  Putar cerita
                </button>
              </div>
              <p className="text-sm">
                Di keranjang Upe ada <strong>{bola} bola</strong>. Sentuh bola satu per satu sampai habis.
              </p>
              <div className="min-h-[110px] bg-white border-4 border-amber-700 rounded-3xl p-4 flex items-center justify-center gap-3">
                {bola > 0 ? (
                  Array.from({ length: bola }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label="bola"
                      onClick={() => {
                        if (bolaRef.current <= 0) return;
                        bolaRef.current -= 1;
                        setBola(bolaRef.current);
                        sfx("pop");
                        bicara(
                          bolaRef.current === 0
                            ? "Keranjang kosong. Banyak bola adalah nol."
                            : `Masih ada ${NAMA_BILANGAN[bolaRef.current]} bola.`,
                        );
                      }}
                      className="text-5xl"
                    >
                      ⚽
                    </button>
                  ))
                ) : (
                  <p className="font-black text-slate-500">Keranjang kosong</p>
                )}
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>
                  Banyak bola: {bola} ({NAMA_BILANGAN[bola]})
                </span>
                <button
                  type="button"
                  className="text-indigo-700"
                  onClick={() => {
                    bolaRef.current = 4;
                    setBola(4);
                    sfx("click");
                  }}
                >
                  Kembalikan 4 bola
                </button>
              </div>
              <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3">
                <p className="text-sm">Saat keranjang benar-benar kosong, lambang bilangan berapa yang menyatakan banyak bola?</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={isianNol}
                    onChange={(e) => setIsianNol(e.target.value)}
                    placeholder="Ketik angka"
                    className="w-36 px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-center font-black"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (bolaRef.current > 0) {
                        sfx("wrong");
                        setUmpan("Pindahkan semua bola terlebih dahulu. Keranjang yang masih berisi belum kosong.");
                        return;
                      }
                      if (isianNol.trim() === "0") {
                        if (!gembokRef.current) {
                          gembokRef.current = true;
                          setKartu2Terbuka(true);
                          sfx("fanfare");
                          bicara("Benar. Keranjang kosong ditulis nol. Materi sudah terbuka.");
                        }
                        setUmpan("Tepat. Wadah kosong ditulis 0, dibaca nol. Materi, kanvas, dan latihan sudah terbuka.");
                      } else {
                        sfx("wrong");
                        setUmpan("Lihat keranjang yang sudah kosong. Lambang untuk tidak ada benda adalah 0.");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                  >
                    Periksa keranjang
                  </button>
                </div>
                {umpan && <p className="text-sm font-bold text-amber-200">{umpan}</p>}
                {kartu2Terbuka && (
                  <button type="button" onClick={() => bukaKartu(2, false)} className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm">
                    Lanjut ke materi
                  </button>
                )}
              </div>
            </section>
          </>
        )}

        {kartu === 2 && (
          <section className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["A", "Sub-bab A"],
                  ["B", "Sub-bab B"],
                  ["C", "Sub-bab C"],
                  ["D", "Sub-bab D"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    sfx("click");
                    setSubbab(id);
                  }}
                  className={`px-4 py-2 rounded-xl font-black text-xs ${subbab === id ? "bg-indigo-600 text-white" : "bg-white border border-slate-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {subbab === "A" && (
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-5">
                <h3 className="text-xl font-black">Bingkai 10 milik Kira</h3>
                <p className="text-sm">Satu baris Bingkai 10 berisi 5 petak. Dua baris penuh berisi 10.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 11 }).map((_, n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setApelKira(n);
                            sfx("pop");
                            bicara(`${n}, ${NAMA_BILANGAN[n]}`);
                          }}
                          className={`w-8 h-8 rounded-lg font-black text-xs ${apelKira === n ? "bg-amber-500 text-white" : "bg-slate-100"}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <div className="min-h-16 flex flex-wrap gap-1">
                      {apelKira === 0 ? <span className="text-xs font-bold text-slate-400">Wadah kosong, 0 apel</span> : Array.from({ length: apelKira }).map((_, i) => <span key={i}>🍎</span>)}
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <Bingkai10
                      utama={apelKira}
                      ikonUtama="🍎"
                      bisaSentuh
                      onUbah={(n) => {
                        setApelKira(n);
                        sfx("pop");
                      }}
                    />
                    <Jari jumlah={apelKira} />
                  </div>
                  <div className="text-center">
                    <p className="text-7xl font-black text-indigo-700">{apelKira}</p>
                    <p className="text-2xl font-black uppercase">{NAMA_BILANGAN[apelKira]}</p>
                    <p className="text-xs font-bold mt-2">
                      {apelKira >= 5
                        ? `5 + ${apelKira - 5} = ${apelKira}`
                        : `${apelKira} petak terisi, ${10 - apelKira} petak masih kosong`}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                  <p className="text-sm">Baris atas penuh berisi 5 jeruk dan baris bawah berisi 3 jeruk. Berapa seluruhnya?</p>
                  <div className="flex gap-2 items-center">
                    <input data-uji="temuan-a" value={temuanA} onChange={(e) => setTemuanA(e.target.value)} className="w-28 px-3 py-2 rounded-xl text-slate-900 font-black text-center" />
                    <button
                      type="button"
                      onClick={() => {
                        const ok = temuanA.trim() === "8";
                        setCekA(ok);
                        sfx(ok ? "coin" : "wrong");
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                    >
                      Cek penemuan
                    </button>
                    {cekA !== null && <span className="text-sm font-bold">{cekA ? "Benar. 5 + 3 = 8." : "Satu baris penuh bernilai 5. Hitung maju 3 langkah dari 5."}</span>}
                  </div>
                </div>
              </div>
            )}

            {subbab === "B" && (
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
                <h3 className="text-xl font-black">Cangkir Kira dan sendok Upe</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    ["Cangkir", cangkir, setCangkir],
                    ["Sendok", sendok, setSendok],
                  ].map(([label, nilai, atur]) => (
                    <div key={label as string} className="flex items-center justify-between bg-slate-50 rounded-2xl p-3">
                      <span className="font-black text-sm">
                        {label as string}: {nilai as number}
                      </span>
                      <div className="flex gap-2">
                        <button type="button" className="w-8 h-8 rounded-lg bg-slate-200 font-black" onClick={() => (atur as (n: number) => void)(Math.max(1, (nilai as number) - 1))}>-</button>
                        <button type="button" className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black" onClick={() => (atur as (n: number) => void)(Math.min(10, (nilai as number) + 1))}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3 overflow-x-auto">
                  {Array.from({ length: Math.max(cangkir, sendok) }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center w-10 text-xl">
                      <span>{i < cangkir ? "☕" : ""}</span>
                      <span className={`h-6 w-1 my-1 ${i < cangkir && i < sendok ? "bg-emerald-500" : "bg-rose-300"}`} />
                      <span>{i < sendok ? "🥄" : ""}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center font-black" data-uji="banding">
                  {cangkir} Cangkir {hubungan(cangkir, sendok)} {sendok} Sendok. Selisih: {Math.abs(cangkir - sendok)}
                </p>
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                  <p className="text-sm">Malosi punya kelereng lebih banyak dari 6 tetapi lebih sedikit dari 8. Berapa kelereng Malosi?</p>
                  <div className="flex gap-2">
                    {["5 kelereng", "7 kelereng", "9 kelereng"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setPilihanB(opt);
                          sfx(opt.startsWith("7") ? "coin" : "wrong");
                        }}
                        className={`px-3 py-2 rounded-xl font-black text-sm ${pilihanB === opt ? "bg-amber-400 text-slate-950" : "bg-slate-800"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {pilihanB && <p className="text-sm font-bold">{pilihanB.startsWith("7") ? "Benar. Bilangan itu 7." : "Urutkan 6, 7, 8. Pilih yang berada di antara 6 dan 8."}</p>}
                </div>
              </div>
            )}

            {subbab === "C" && (
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
                <h3 className="text-xl font-black">Tangga 0 sampai 10</h3>
                <div className="flex items-end gap-1 h-48 bg-slate-50 rounded-2xl p-3">
                  {Array.from({ length: 11 }).map((_, n) => (
                    <button
                      key={n}
                      type="button"
                      data-anak-tangga={n}
                      onClick={() => {
                        setTangga(n);
                        sfx("jump");
                        bicara(`${n}, ${NAMA_BILANGAN[n]}`);
                      }}
                      style={{ height: `${28 + n * 12}px` }}
                      className={`flex-1 rounded-t-lg font-black text-xs ${tangga === n ? "bg-indigo-600 text-white" : "bg-sky-100"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <button type="button" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs" onClick={() => setTangga((n) => Math.max(0, n - 1))}>
                    Hitung mundur
                  </button>
                  <p className="font-black text-sm" data-uji="tangga">
                    Posisi IGIL: Angka {tangga} | Sebelumnya: {tangga > 0 ? tangga - 1 : "tidak ada"} | Sesudahnya: {tangga < 10 ? tangga + 1 : "batas 10"}
                  </p>
                  <button type="button" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs" onClick={() => setTangga((n) => Math.min(10, n + 1))}>
                    Hitung maju
                  </button>
                </div>
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                  <p className="text-sm">Hitung mundur: 9, 8, 7, [ ? ], 5, 4. Bilangan berapa di kotak itu?</p>
                  <div className="flex gap-2 items-center">
                    <input data-uji="temuan-c" value={temuanC} onChange={(e) => setTemuanC(e.target.value)} className="w-28 px-3 py-2 rounded-xl text-slate-900 font-black text-center" />
                    <button
                      type="button"
                      onClick={() => {
                        const ok = temuanC.trim() === "6";
                        setCekC(ok);
                        sfx(ok ? "coin" : "wrong");
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                    >
                      Periksa urutan
                    </button>
                    {cekC !== null && <span className="text-sm font-bold">{cekC ? "Tepat. 7, 6, 5." : "Mundur satu langkah dari 7 menuju 5 melewati 6."}</span>}
                  </div>
                </div>
              </div>
            )}

            {subbab === "D" && (
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
                <h3 className="text-xl font-black">Pasangan bilangan</h3>
                <div className="grid md:grid-cols-2 gap-4 items-center">
                  <div>
                    <Ikatan utuh={induk} kiri={cabang} kanan={induk - cabang} />
                    <Bingkai10 utama={cabang} kedua={induk - cabang} ikonUtama="🔵" ikonKedua="🟢" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setInduk(n);
                            setCabang((k) => Math.min(k, n));
                            sfx("pop");
                          }}
                          className={`px-3 py-2 rounded-xl font-black text-xs ${induk === n ? "bg-amber-400" : "bg-slate-100"}`}
                        >
                          Induk {n}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: induk + 1 }).map((_, n) => (
                        <button key={n} type="button" onClick={() => setCabang(n)} className={`px-2 py-1 rounded-lg text-xs font-black ${cabang === n ? "bg-blue-600 text-white" : "bg-slate-100"}`}>
                          {n} dan {induk - n}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-bold">
                      {cabang} + {induk - cabang} = {induk}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                  <p className="text-sm">Bilangan 9 diurai. Bagian pertama 4. Berapa pasangannya?</p>
                  <div className="flex gap-2 items-center">
                    <input data-uji="temuan-d" value={temuanD} onChange={(e) => setTemuanD(e.target.value)} className="w-28 px-3 py-2 rounded-xl text-slate-900 font-black text-center" />
                    <button
                      type="button"
                      onClick={() => {
                        const ok = temuanD.trim() === "5";
                        setCekD(ok);
                        sfx(ok ? "coin" : "wrong");
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                    >
                      Periksa pasangan
                    </button>
                    {cekD !== null && <span className="text-sm font-bold">{cekD ? "Benar. 4 + 5 = 9." : "Hitung dari 4 sampai 9."}</span>}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {kartu === 3 && (
          <>
            <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
              <h2 className="text-xl font-black">Menulis angka 0 sampai 10</h2>
              <p className="text-sm">Kiri ada garis bantu. Kanan kosong. Tulis dari ingatanmu.</p>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 11 }).map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    data-angka={n}
                    onClick={() => {
                      setAngkaTulis(n);
                      sfx("pop");
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-sm border-2 ${
                      angkaTulis === n ? "bg-indigo-600 text-white" : angkaMandiri.includes(n) ? "bg-emerald-100 border-emerald-400" : "bg-white"
                    }`}
                  >
                    {n}
                    {angkaMandiri.includes(n) ? " ✓" : ""}
                  </button>
                ))}
              </div>
              <p className="text-xs font-black text-emerald-800">Angka mandiri: {angkaMandiri.length} / 11</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-black text-blue-800 mb-1">Kiri, dengan garis bantu</p>
                  <canvas
                    ref={kanvasKiri}
                    width={380}
                    height={250}
                    onPointerDown={(e) => mulaiGores(e, "kiri")}
                    onPointerMove={(e) => jalanGores(e, "kiri")}
                    onPointerUp={lepasGores}
                    onPointerCancel={lepasGores}
                    className="w-full h-[240px] border-4 border-blue-300 rounded-3xl touch-none bg-slate-50"
                  />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-800 mb-1">Kanan, kanvas kosong</p>
                  <canvas
                    ref={kanvasKanan}
                    width={380}
                    height={250}
                    onPointerDown={(e) => mulaiGores(e, "kanan")}
                    onPointerMove={(e) => jalanGores(e, "kanan")}
                    onPointerUp={lepasGores}
                    onPointerCancel={lepasGores}
                    className="w-full h-[240px] border-4 border-emerald-500 rounded-3xl touch-none bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <button type="button" onClick={() => siapkanKanvas(angkaTulis)} className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 font-black text-xs">
                  Bersihkan kanvas
                </button>
                <button type="button" onClick={periksaKanvas} className="px-4 py-2 rounded-xl bg-amber-400 font-black text-xs">
                  Periksa tulisan
                </button>
              </div>
              {hasilKanvas && <p className="text-sm font-bold bg-amber-50 border border-amber-300 rounded-xl p-3">{hasilKanvas}</p>}
            </section>
            <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-black">Timbangan dua kelompok</h3>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div>
                  <p className="text-xs font-black mb-2">Kiri: {kiriLab} ({NAMA_BILANGAN[kiriLab]})</p>
                  <Bingkai10 utama={kiriLab} ikonUtama="🍎" bisaSentuh onUbah={(n) => { setKiriLab(n); sfx("pop"); }} />
                </div>
                <p className="text-center font-black" data-uji="lab">
                  {kiriLab} {hubungan(kiriLab, kananLab)} {kananLab}. Selisih: {Math.abs(kiriLab - kananLab)} buah
                </p>
                <div>
                  <p className="text-xs font-black mb-2">Kanan: {kananLab} ({NAMA_BILANGAN[kananLab]})</p>
                  <Bingkai10 utama={kananLab} ikonUtama="🍊" bisaSentuh onUbah={(n) => { setKananLab(n); sfx("pop"); }} />
                </div>
              </div>
            </section>
          </>
        )}

        {kartu === 4 && (
          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4" data-peran="soal" data-format={soalL?.format || ""}>
            {!soalL ? (
              <p className="font-bold">Soal sedang disiapkan.</p>
            ) : (
              <>
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="text-xs font-black text-indigo-800">
                    Latihan {idxLatihan + 1} / 10 • {soalL.subbabTag}
                  </p>
                  <div className="flex gap-1">
                    {soalLatihan.map((q, i) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setIdxLatihan(i)}
                        className={`w-7 h-7 rounded-lg font-black text-xs ${
                          idxLatihan === i ? "bg-indigo-600 text-white" : cekLatihan[q.id] ? "bg-emerald-500 text-white" : "bg-slate-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5 items-start">
                  <GambarSoal
                    soal={soalL}
                    terbuka={!!cekLatihan[soalL.id]}
                    susun={susun}
                    onSusun={(n) => {
                      setSusun(n);
                      setJawabLatihan((prev) => ({ ...prev, [soalL.id]: `${n}` }));
                      sfx("pop");
                    }}
                  />
                  <div>
                    {panelJawab(soalL, jawabLatihan, !!cekLatihan[soalL.id], (teks) =>
                      setJawabLatihan((prev) => ({ ...prev, [soalL.id]: teks })),
                    )}
                    {cekLatihan[soalL.id] && (
                      <p className={`mt-3 p-3 rounded-xl text-sm font-bold ${jawabLatihan[soalL.id] === soalL.correctAnswer ? "bg-emerald-100" : "bg-rose-100"}`}>
                        {jawabLatihan[soalL.id] === soalL.correctAnswer ? "Tepat. +3 token." : `Jawaban yang tepat: ${soalL.correctAnswer}.`} {soalL.explanation}
                      </p>
                    )}
                    <div className="flex justify-between mt-3">
                      <button type="button" disabled={idxLatihan === 0} onClick={() => setIdxLatihan((i) => Math.max(0, i - 1))} className="px-3 py-2 rounded-xl bg-slate-200 text-xs font-bold disabled:opacity-40">
                        Sebelumnya
                      </button>
                      {!cekLatihan[soalL.id] ? (
                        <button
                          type="button"
                          onClick={() => {
                            const ans = jawabLatihan[soalL.id];
                            if (!ans) {
                              bicara("Pilih jawaban dulu.");
                              return;
                            }
                            setCekLatihan((prev) => ({ ...prev, [soalL.id]: true }));
                            if (ans === soalL.correctAnswer) {
                              if (!klaimRef.current.includes(soalL.id)) {
                                klaimRef.current = [...klaimRef.current, soalL.id];
                                setIdLatihan(klaimRef.current);
                              }
                              sfx("coin");
                            } else sfx("wrong");
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-400 font-black text-xs"
                        >
                          Periksa jawaban
                        </button>
                      ) : idxLatihan < soalLatihan.length - 1 ? (
                        <button type="button" onClick={() => setIdxLatihan((i) => i + 1)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs">
                          Soal berikutnya
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setKartu5Terbuka(true);
                            setKartu(5);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs"
                        >
                          Buka ujian
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {kartu === 5 && (
          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4" data-peran="soal" data-format={soalU?.format || ""}>
            <div className="flex flex-wrap justify-between gap-2 bg-slate-900 text-white rounded-2xl p-4">
              <div>
                <p className="text-xs font-black text-amber-300">Percobaan ke-{percobaan}</p>
                <h2 className="font-black">Ujian bab 1. Nilai 100 membuka praktikum.</h2>
              </div>
              <div className="text-xs font-bold space-y-1">
                <p data-uji="waktu">Waktu ujian: {detikUjian} detik</p>
                <p>Pindah layar: {pindahLayar}</p>
              </div>
            </div>
            {!soalU ? (
              <p>Soal ujian sedang disiapkan.</p>
            ) : ujianSelesai ? (
              <div className={`p-6 rounded-2xl border-2 text-center space-y-3 ${skorUjian === 100 && waktuManusia ? "bg-emerald-50 border-emerald-500" : "bg-amber-50 border-amber-400"}`}>
                <p className="text-2xl font-black">Skor ujian: {skorUjian} / 100</p>
                {waktuManusia && skorUjian === 100 ? (
                  <>
                    <p className="font-bold">Sempurna. Kamu mendapat 70 token dan praktikum terbuka.</p>
                    <button type="button" onClick={() => setKartu(6)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-black text-sm">
                      Masuk praktikum
                    </button>
                  </>
                ) : (
                  <p className="text-sm font-bold">
                    {waktuManusia
                      ? "Belum 100. Ulangi dengan soal baru."
                      : "Pengerjaan kurang dari 30 detik. Kerjakan ulang dengan tenang."}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    ujianBerjalan.current = true;
                    setPercobaan((n) => n + 1);
                    setSoalUjian(buatSoal());
                    setJawabUjian({});
                    setIdxUjian(0);
                    setUjianSelesai(false);
                    setMulaiUjian(Date.now());
                    setDetikUjian(0);
                    sfx("click");
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs"
                >
                  Ulangi ujian
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-1">
                  {soalUjian.map((q, i) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setIdxUjian(i)}
                      className={`w-7 h-7 rounded-lg font-black text-xs ${idxUjian === i ? "bg-amber-400" : jawabUjian[q.id] ? "bg-indigo-600 text-white" : "bg-slate-100"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-5 items-start">
                  <GambarSoal
                    soal={soalU}
                    terbuka={false}
                    susun={susun}
                    onSusun={(n) => {
                      setSusun(n);
                      setJawabUjian((prev) => ({ ...prev, [soalU.id]: `${n}` }));
                      sfx("pop");
                    }}
                  />
                  <div>
                    <p className="text-xs font-black text-indigo-700 mb-2">
                      Soal {idxUjian + 1} / 10 • {soalU.subbabTag}
                    </p>
                    {panelJawab(soalU, jawabUjian, false, (teks) => setJawabUjian((prev) => ({ ...prev, [soalU.id]: teks })))}
                    <div className="flex justify-between mt-3">
                      <button type="button" disabled={idxUjian === 0} onClick={() => setIdxUjian((i) => Math.max(0, i - 1))} className="px-3 py-2 rounded-xl bg-slate-200 text-xs font-bold disabled:opacity-40">
                        Sebelumnya
                      </button>
                      {idxUjian < soalUjian.length - 1 ? (
                        <button type="button" onClick={() => setIdxUjian((i) => i + 1)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs">
                          Soal berikutnya
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (soalUjian.some((q) => !jawabUjian[q.id])) {
                              bicara("Jawab sepuluh soal terlebih dahulu.");
                              return;
                            }
                            const dur = Math.round((Date.now() - mulaiUjian) / 1000);
                            const manusia = mulaiUjian > 0 && dur >= 30;
                            let benar = 0;
                            const jejak = soalUjian.map((q) => {
                              const cocok = jawabUjian[q.id] === q.correctAnswer;
                              if (cocok) benar += 1;
                              return {
                                questionId: q.id,
                                questionFormat: q.format,
                                studentAnswer: jawabUjian[q.id] || "",
                                isCorrect: cocok,
                              };
                            });
                            const skor = benar * 10;
                            setWaktuManusia(manusia);
                            setSkorUjian(skor);
                            setUjianSelesai(true);
                            if (skor === 100 && manusia) {
                              arsipLulus.current = jejak;
                              durasiLulus.current = dur;
                              pindahLulus.current = pindahLayar;
                              percobaanLulus.current = percobaan;
                              setTokenUjian(70);
                              setKartu6Terbuka(true);
                              sfx("fanfare");
                            } else sfx("wrong");
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-400 font-black text-xs"
                        >
                          Kumpulkan ujian
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {kartu === 6 && (
          <section className="bg-white rounded-3xl border-2 border-emerald-400 p-6 space-y-4">
            <h2 className="text-xl font-black">Kotak bekal bentuk dan pasangan bilangan</h2>
            <p className="text-sm">Susun apel lingkaran, roti segiempat, dan keju segitiga sampai Bingkai 10 penuh. Penilaian dihitung di perangkat ini.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {[CHAPTER_COMPETENCY_METADATA, ...completedOtherChapters.slice(0, 3)].map((ch) => (
                <div key={ch.chapterId} className="bg-slate-50 border rounded-xl p-2">
                  <p className="font-black text-indigo-700">{ch.subject}</p>
                  <p className="font-bold">{ch.chapterTitle}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-center">
              {(
                [
                  ["Apel lingkaran", apelBekal, "apel"],
                  ["Roti segiempat", rotiBekal, "roti"],
                  ["Keju segitiga", kejuBekal, "keju"],
                ] as const
              ).map(([label, nilai, kunci]) => (
                <div key={kunci} className="bg-slate-50 rounded-2xl p-3 space-y-1">
                  <p className="text-xs font-black">{label}</p>
                  <p className="text-2xl font-black text-indigo-700">{nilai}</p>
                  <div className="flex justify-center gap-2">
                    <button type="button" className="w-8 h-8 rounded-lg bg-slate-200 font-black" onClick={() => ubahBekal(kunci, -1)}>-</button>
                    <button type="button" className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black" onClick={() => ubahBekal(kunci, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-black">Jumlah benda: {totalBekal}</p>
            <div className="bg-amber-100 border-4 border-amber-800 rounded-3xl p-3 max-w-[330px] mx-auto">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, idx) => {
                  let simbol = "";
                  if (idx < apelBekal) simbol = "🔴";
                  else if (idx < apelBekal + rotiBekal) simbol = "🟨";
                  else if (idx < totalBekal) simbol = "🔺";
                  return (
                    <div key={idx} className="aspect-square rounded-2xl bg-white border-2 border-amber-500 flex items-center justify-center text-2xl">
                      {simbol}
                    </div>
                  );
                })}
              </div>
            </div>
            <Ikatan utuh={totalBekal} kiri={cabangKiri || "?"} kanan={cabangKanan || "?"} />
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <input value={cabangKiri} onChange={(e) => setCabangKiri(e.target.value)} placeholder="Cabang kiri" className="px-3 py-2 rounded-xl border-2 border-blue-400 font-black text-center" />
              <input value={cabangKanan} onChange={(e) => setCabangKanan(e.target.value)} placeholder="Cabang kanan" className="px-3 py-2 rounded-xl border-2 border-emerald-400 font-black text-center" />
            </div>
            <textarea value={laporan} onChange={(e) => setLaporan(e.target.value)} className="w-full h-24 p-3 rounded-2xl border-2 text-sm" placeholder="Ceritakan banyak tiap bentuk." />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setLaporan(kalimatBenar())} className="px-4 py-2 rounded-xl bg-sky-100 font-black text-xs">
                Susun kalimat yang benar
              </button>
              <button type="button" onClick={nilaiPraktik} className="px-4 py-2 rounded-xl bg-amber-400 font-black text-xs">
                Nilai karyaku
              </button>
            </div>
            {rubrik && (
              <div className="bg-indigo-950 text-white rounded-3xl p-5 space-y-3">
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-xl font-black text-amber-300">Skor {ribuan(rubrik.totalQualityScore)} / 1.000</h3>
                  <p className="font-black text-emerald-300">{tokenBab} / 150 token</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <p>Akurasi {rubrik.accuracyScore} / 300</p>
                  <p>Sintesis {rubrik.synthesisScore} / 250</p>
                  <p>Visual {rubrik.optimizationVisualScore} / 200</p>
                  <p>Cerita {rubrik.reasoningReportScore} / 250</p>
                </div>
                <p className="text-sm">{rubrik.aiFeedbackSummary}</p>
                <p className="text-xs text-indigo-200">Catatan tersimpan di perangkat ini.</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
