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
  auditTrail: {
    questionId: number;
    questionText: string;
    selectedAnswer: string;
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
  chapterId: "MAT-K5-B8",
  grade: 5,
  subject: "Matematika",
  chapterNumber: 8,
  chapterTitle: "Data (Tabel Frekuensi, Piktogram, dan Diagram Batang)",
  textbookReference:
    "Buku Matematika untuk SD/MI Kelas V Kemendikbudristek (2022), Bab 8, Halaman 235–272",
  coreSkills: [
    "Mengumpulkan data sederhana dan menyajikan ke dalam tabel turus serta tabel frekuensi",
    "Membuat, membaca, dan menganalisis piktogram berskala",
    "Membuat dan menafsirkan diagram batang vertikal, horizontal, dan batang ganda",
  ],
  practicumSynthesisHook:
    "Sajikan data pengamatan ke dalam piktogram berskala serta diagram batang ganda untuk mendukung keputusan.",
};

const BAB_LAIN: ChapterCompetencyMetadata[] = [
  {
    chapterId: "MAT-K5-B5",
    grade: 5,
    subject: "Matematika",
    chapterNumber: 5,
    chapterTitle: "Luas Daerah Bangun Datar",
    textbookReference: "Buku Matematika Kelas V, Bab 5, Halaman 131–162",
    coreSkills: ["Menghitung luas persegi panjang, persegi, segitiga, dan bangun gabungan"],
    practicumSynthesisHook: "Rancang panjang dan lebar petak agar luasnya memenuhi target.",
  },
  {
    chapterId: "IPAS-K5-GIZI",
    grade: 5,
    subject: "IPAS",
    chapterNumber: 4,
    chapterTitle: "Nutrisi, Kalori, dan Kesehatan Organ Pencernaan",
    textbookReference: "Buku IPAS Kelas V Kemendikbudristek",
    coreSkills: ["Menyeimbangkan energi harian dari karbohidrat, protein, dan sayur"],
    practicumSynthesisHook: "Susun porsi makan siang sesuai kebutuhan kalori anak usia 10–12 tahun.",
  },
  {
    chapterId: "BIND-K5-LAPORAN",
    grade: 5,
    subject: "Bahasa Indonesia",
    chapterNumber: 6,
    chapterTitle: "Teks Laporan Hasil Pengamatan",
    textbookReference: "Buku Bahasa Indonesia Kelas V Kemendikbudristek",
    coreSkills: ["Menulis laporan fakta dari grafik dan kesimpulan yang logis"],
    practicumSynthesisHook: "Tuliskan laporan berdasarkan angka pada tabel dan diagram.",
  },
];

type Suara = "click" | "pop" | "laser" | "coin" | "wrong" | "fanfare";

function playSound(type: Suara) {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const nada = (freq: number, bentuk: OscillatorType, mulai: number, durasi: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = bentuk;
      osc.frequency.setValueAtTime(freq, mulai);
      gain.gain.setValueAtTime(volume, mulai);
      gain.gain.exponentialRampToValueAtTime(0.008, mulai + durasi);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(mulai);
      osc.stop(mulai + durasi);
    };
    if (type === "click" || type === "pop") {
      nada(type === "pop" ? 560 : 440, type === "pop" ? "triangle" : "sine", now, 0.08, 0.12);
    } else if (type === "laser") {
      nada(360, "triangle", now, 0.12, 0.14);
      nada(780, "triangle", now + 0.06, 0.1, 0.1);
    } else if (type === "coin") {
      nada(987.77, "sine", now, 0.24, 0.16);
      nada(1318.51, "sine", now + 0.08, 0.24, 0.16);
    } else if (type === "wrong") {
      nada(185, "sawtooth", now, 0.24, 0.12);
      nada(115, "sawtooth", now + 0.12, 0.22, 0.1);
    } else {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        nada(freq, "triangle", now + idx * 0.1, 0.32, 0.16);
      });
    }
    window.setTimeout(() => {
      void ctx.close();
    }, 1200);
  } catch {
    // Browser boleh menolak audio sebelum ada ketukan.
  }
}

function IgilOwl({ mood = "happy" }: { mood?: "happy" | "proud" }) {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" className="shrink-0">
      <circle cx="32" cy="32" r="30" fill="#312e81" stroke="#fbbf24" strokeWidth="3" />
      <polygon points="16,18 22,8 26,18" fill="#f59e0b" />
      <polygon points="48,18 42,8 38,18" fill="#f59e0b" />
      <ellipse cx="32" cy="36" rx="18" ry="17" fill="#6366f1" />
      <ellipse cx="32" cy="40" rx="12" ry="11" fill="#e0e7ff" />
      <circle cx="24" cy="27" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="40" cy="27" r="7" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="24" cy="27" r="3.5" fill="#0f172a" />
      <circle cx="40" cy="27" r="3.5" fill="#0f172a" />
      <polygon points="29,31 35,31 32,37" fill="#f59e0b" />
      {mood === "proud" ? (
        <polygon points="32,6 16,13 32,18 48,13" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.2" />
      ) : null}
    </svg>
  );
}

function TallyMarks({ count }: { count: number }) {
  const bundles = Math.floor(count / 5);
  const remainder = count % 5;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {Array.from({ length: bundles }).map((_, bIdx) => (
        <svg key={bIdx} width="32" height="24" viewBox="0 0 32 24" aria-hidden>
          <line x1="4" y1="3" x2="4" y2="21" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="11" y1="3" x2="11" y2="21" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="18" y1="3" x2="18" y2="21" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="25" y1="3" x2="25" y2="21" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="2" y1="19" x2="28" y2="5" stroke="#e11d48" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      ))}
      {remainder > 0 ? (
        <svg width={remainder * 8 + 4} height="24" viewBox={`0 0 ${remainder * 8 + 4} 24`} aria-hidden>
          {Array.from({ length: remainder }).map((_, rIdx) => (
            <line key={rIdx} x1={4 + rIdx * 7} y1="3" x2={4 + rIdx * 7} y2="21" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" />
          ))}
        </svg>
      ) : null}
    </span>
  );
}

function IkonApem({ quarters }: { quarters: 1 | 2 | 3 | 4 }) {
  return (
    <svg width="26" height="26" viewBox="0 0 36 36" className="inline-block" aria-hidden>
      <circle cx="18" cy="18" r="15" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      {quarters >= 1 ? <path d="M18,18 L18,3 A15,15 0 0,1 33,18 Z" fill="#f59e0b" /> : null}
      {quarters >= 2 ? <path d="M18,18 L33,18 A15,15 0 0,1 18,33 Z" fill="#f59e0b" /> : null}
      {quarters >= 3 ? <path d="M18,18 L18,33 A15,15 0 0,1 3,18 Z" fill="#f59e0b" /> : null}
      {quarters === 4 ? <path d="M18,18 L3,18 A15,15 0 0,1 18,3 Z" fill="#f59e0b" /> : null}
      <circle cx="18" cy="18" r="3" fill="#78350f" />
    </svg>
  );
}

interface SoalData {
  id: number;
  subbabTag: string;
  story: string;
  question: string;
  bars: { label: string; val: number; val2?: number }[];
  options: string[];
  correctAnswer: string;
  explanation: string;
}

function acak<T>(arr: T[]): T[] {
  const salinan = [...arr];
  for (let i = salinan.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = salinan[i];
    salinan[i] = salinan[j];
    salinan[j] = tmp;
  }
  return salinan;
}

function opsiEmpat(benar: string, calon: string[]): string[] {
  const unik: string[] = [];
  for (const item of [benar, ...calon]) {
    if (!unik.includes(item)) unik.push(item);
  }
  let n = 1;
  while (unik.length < 4) {
    const cadangan = `${benar} (bukan ${n})`;
    if (!unik.includes(cadangan)) unik.push(cadangan);
    n += 1;
  }
  return acak(unik.slice(0, 4));
}

function tulisTurus(jumlah: number): string {
  const ikat = Math.floor(jumlah / 5);
  const sisa = jumlah % 5;
  if (ikat <= 0) return `${sisa} garis`;
  if (sisa === 0) return `${ikat} ikat lima`;
  return `${ikat} ikat lima + ${sisa} garis`;
}

function rupiah(nilai: number): string {
  return `Rp${nilai.toLocaleString("id-ID")},00`;
}

function buatSoalData(): SoalData[] {
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const donatSenin = rand(3, 5);
  const donatSabtu = donatSenin + rand(4, 6);
  const naikCokelat = donatSabtu - donatSenin;
  const wortel = rand(8, 12);
  const buncis = rand(3, 4);
  const n40 = rand(2, 3);
  const n50 = rand(1, 3);
  const n60 = rand(4, 6);
  const n70 = rand(6, 8);
  const remedi = n40 + n50 + n60;
  const kotakUtuh = rand(2, 5) * 20;
  const seperempat = kotakUtuh / 4;
  const tigaPerempat = seperempat * 3;
  const apemUtuh = rand(6, 9);
  const apemSisa = rand(1, 3);
  const totalKamis = apemUtuh * 4 + apemSisa;
  const jual = rand(25, 45);
  const untung = jual * 300;
  const t1 = 10;
  const t2 = 14;
  const t3 = rand(20, 26);
  const t4 = 12;
  const t5 = rand(4, 6);
  const panen = [t1, t2, t3, t4, t5];
  const jumlahTomat = panen.reduce((a, b) => a + b, 0);
  const tertinggi = Math.max(...panen);
  const terendah = Math.min(...panen);
  const selisihTomat = tertinggi - terendah;
  const emas17 = 38;
  const emas19 = rand(72, 78);
  const totalLele = rand(105, 125);
  const omzet = totalLele * 22000;
  const komang1 = 50;
  const komang2 = rand(85, 95);
  const naikKomang = komang2 - komang1;
  const turusWortel = tulisTurus(wortel);
  return [
    {
      id: 1,
      subbabTag: "Pembuka • Tabel 8.1 Donat Anggi (Hlm. 237)",
      story: `Penjualan donat cokelat Anggi hari Senin ${donatSenin} buah dan hari Sabtu ${donatSabtu} buah. Donat kacang pada Jumat dan Sabtu tidak ada yang terjual.`,
      question: "Berapa kenaikan donat cokelat dari Senin ke Sabtu, dan keputusan apa yang paling tepat?",
      bars: [
        { label: "Senin", val: donatSenin },
        { label: "Sabtu", val: donatSabtu },
        { label: "Kacang", val: 0 },
      ],
      options: opsiEmpat(
        `Naik ${naikCokelat} buah; tambah cokelat dan hentikan kacang`,
        [
          `Naik ${donatSabtu + donatSenin} buah; tambah kacang`,
          `Turun ${naikCokelat} buah; kurangi cokelat`,
          `Tetap ${donatSenin} buah; jual kacang saja`,
        ],
      ),
      correctAnswer: `Naik ${naikCokelat} buah; tambah cokelat dan hentikan kacang`,
      explanation: `Kenaikan cokelat = ${donatSabtu} − ${donatSenin} = ${naikCokelat}. Kacang habis pembelinya, jadi produksinya dihentikan.`,
    },
    {
      id: 2,
      subbabTag: "Sub-bab A • Turus dan frekuensi (Hlm. 244–245)",
      story: `Wortel disukai ${wortel} siswa. Buncis disukai ${buncis} siswa.`,
      question: `Bagaimana turus untuk wortel, dan berapa selisihnya dengan buncis?`,
      bars: [
        { label: "Wortel", val: wortel },
        { label: "Bayam", val: 7 },
        { label: "Buncis", val: buncis },
      ],
      options: opsiEmpat(
        `${turusWortel}; selisih ${wortel - buncis} siswa`,
        [
          `2 ikat lima; selisih ${wortel + buncis} siswa`,
          `1 ikat lima + ${buncis} garis; selisih ${7 - buncis} siswa`,
          `${wortel} garis tanpa ikatan; selisih 2 siswa`,
        ],
      ),
      correctAnswer: `${turusWortel}; selisih ${wortel - buncis} siswa`,
      explanation: `Satu ikat turus bernilai 5. ${wortel} ditulis ${turusWortel}. Selisih = ${wortel} − ${buncis} = ${wortel - buncis}.`,
    },
    {
      id: 3,
      subbabTag: "Sub-bab A • Nilai ulangan (Hlm. 247)",
      story: `Nilai 40 ada ${n40} siswa, nilai 50 ada ${n50} siswa, nilai 60 ada ${n60} siswa, dan nilai 70 ada ${n70} siswa.`,
      question: "Jika nilai kurang dari 70 wajib remedi, berapa siswa yang remedi?",
      bars: [
        { label: "40", val: n40 },
        { label: "50", val: n50 },
        { label: "60", val: n60 },
        { label: "70", val: n70 },
      ],
      options: opsiEmpat(`${remedi} siswa`, [
        `${remedi + n70} siswa`,
        `${n40 + n50} siswa`,
        `${n60 + n70} siswa`,
      ]),
      correctAnswer: `${remedi} siswa`,
      explanation: `Yang kurang dari 70 adalah nilai 40, 50, dan 60: ${n40} + ${n50} + ${n60} = ${remedi}.`,
    },
    {
      id: 4,
      subbabTag: "Sub-bab B • Simbol piktogram (Hlm. 248)",
      story: `Satu persegi utuh berisi 4 petak dan mewakili ${kotakUtuh}.`,
      question: "Bilangan berapa yang diwakili oleh 3 petak kecil?",
      bars: [
        { label: "4 petak", val: kotakUtuh },
        { label: "3 petak", val: tigaPerempat },
      ],
      options: opsiEmpat(String(tigaPerempat), [
        String(seperempat),
        String(kotakUtuh / 2),
        String(kotakUtuh + 10),
      ]),
      correctAnswer: String(tigaPerempat),
      explanation: `Satu petak mewakili ${kotakUtuh} ÷ 4 = ${seperempat}. Tiga petak = 3 × ${seperempat} = ${tigaPerempat}.`,
    },
    {
      id: 5,
      subbabTag: "Sub-bab B • Kue apem (Hlm. 250)",
      story: `Satu gambar kue utuh mewakili 4 apem. Kamis tergambar ${apemUtuh} kue utuh dan ${apemSisa} bagian dari 4.`,
      question: "Berapa kue apem yang terjual pada hari Kamis?",
      bars: [
        { label: "Utuh", val: apemUtuh * 4 },
        { label: "Sisa", val: apemSisa },
        { label: "Total", val: totalKamis },
      ],
      options: opsiEmpat(`${totalKamis} kue apem`, [
        `${apemUtuh + apemSisa} kue apem`,
        `${apemUtuh * 4} kue apem`,
        `${(apemUtuh + 1) * 4} kue apem`,
      ]),
      correctAnswer: `${totalKamis} kue apem`,
      explanation: `${apemUtuh} × 4 = ${apemUtuh * 4}, ditambah ${apemSisa} menjadi ${totalKamis}.`,
    },
    {
      id: 6,
      subbabTag: "Sub-bab B • Keuntungan apem (Hlm. 251)",
      story: `Modal satu apem Rp1.200,00 dan harga jual Rp1.500,00. Terjual ${jual} kue.`,
      question: "Berapa keuntungan Ibu Anggi?",
      bars: [
        { label: "Terjual", val: jual },
        { label: "Untung/kue", val: 300 },
      ],
      options: opsiEmpat(rupiah(untung), [
        rupiah(jual * 1200),
        rupiah(jual * 1500),
        rupiah(untung + 4500),
      ]),
      correctAnswer: rupiah(untung),
      explanation: `Untung satu kue = 1.500 − 1.200 = 300. Total = ${jual} × 300 = ${rupiah(untung)}.`,
    },
    {
      id: 7,
      subbabTag: "Panen tomat Pak Chandra (Hlm. 252)",
      story: `Minggu 1 = ${t1} kg, minggu 2 = ${t2} kg, minggu 3 = ${t3} kg, minggu 4 = ${t4} kg, minggu 5 = ${t5} kg.`,
      question: "Berapa total panen 5 minggu, dan selisih panen tertinggi dengan terendah?",
      bars: panen.map((val, idx) => ({ label: `M${idx + 1}`, val })),
      options: opsiEmpat(`Total ${jumlahTomat} kg; selisih ${selisihTomat} kg`, [
        `Total ${jumlahTomat} kg; selisih ${t3 - t1} kg`,
        `Total ${jumlahTomat - t5} kg; selisih ${selisihTomat} kg`,
        `Total ${jumlahTomat + 10} kg; selisih ${t2 - t5} kg`,
      ]),
      correctAnswer: `Total ${jumlahTomat} kg; selisih ${selisihTomat} kg`,
      explanation: `Jumlah = ${t1}+${t2}+${t3}+${t4}+${t5} = ${jumlahTomat} kg. Tertinggi ${tertinggi} kg, terendah ${terendah} kg, selisih ${selisihTomat} kg.`,
    },
    {
      id: 8,
      subbabTag: "Diagram vertikal Sea Games (Hlm. 255)",
      story: `Tahun 2017 Indonesia meraih ${emas17} medali emas. Tahun 2019 meraih ${emas19} medali emas.`,
      question: "Berapa kenaikan medali emas dari 2017 ke 2019?",
      bars: [
        { label: "2015", val: 47 },
        { label: "2017", val: emas17 },
        { label: "2019", val: emas19 },
      ],
      options: opsiEmpat(`${emas19 - emas17} medali emas`, [
        `${emas19 + emas17} medali emas`,
        `${emas19 - 47} medali emas`,
        `${emas17} medali emas`,
      ]),
      correctAnswer: `${emas19 - emas17} medali emas`,
      explanation: `${emas19} − ${emas17} = ${emas19 - emas17} medali emas.`,
    },
    {
      id: 9,
      subbabTag: "Diagram horizontal lele Pak Bajuri (Hlm. 260)",
      story: `Lima kolam menghasilkan ${totalLele} kg lele. Harga jual Rp22.000,00 per kg.`,
      question: "Berapa pendapatan seluruh panen lele?",
      bars: [
        { label: "Kolam 1", val: 32 },
        { label: "Kolam 2", val: 35 },
        { label: "Kolam 3", val: 21 },
        { label: "Kolam 5", val: 25 },
      ],
      options: opsiEmpat(rupiah(omzet), [
        rupiah(omzet / 2),
        rupiah(totalLele * 20000),
        rupiah(omzet + 220000),
      ]),
      correctAnswer: rupiah(omzet),
      explanation: `${totalLele} × 22.000 = ${rupiah(omzet)}.`,
    },
    {
      id: 10,
      subbabTag: "Diagram batang ganda (Hlm. 267)",
      story: `Nilai Komang ulangan ke-1 adalah ${komang1}. Ulangan ke-2 menjadi ${komang2}.`,
      question: "Berapa kenaikan nilai Komang?",
      bars: [
        { label: "Lukas", val: 65, val2: 80 },
        { label: "Nisa", val: 70, val2: 85 },
        { label: "Komang", val: komang1, val2: komang2 },
      ],
      options: opsiEmpat(`Naik ${naikKomang} poin`, [
        `Naik ${komang2} poin`,
        `Turun ${naikKomang} poin`,
        `Naik ${naikKomang - 10} poin`,
      ]),
      correctAnswer: `Naik ${naikKomang} poin`,
      explanation: `${komang2} − ${komang1} = ${naikKomang} poin.`,
    },
  ];
}

const SAYURAN = [
  { name: "Wortel", count: 8, icon: "🥕" },
  { name: "Bayam", count: 7, icon: "🥬" },
  { name: "Kangkung", count: 6, icon: "🌿" },
  { name: "Tomat", count: 6, icon: "🍅" },
  { name: "Sawi", count: 5, icon: "🥬" },
  { name: "Buncis", count: 4, icon: "🫛" },
  { name: "Kol", count: 3, icon: "🥗" },
];

const SEBARAN = [
  { year: "2017", laki: 14, perempuan: 10 },
  { year: "2018", laki: 15, perempuan: 15 },
  { year: "2019", laki: 11, perempuan: 12 },
  { year: "2020", laki: 12, perempuan: 14 },
  { year: "2021", laki: 16, perempuan: 18 },
];

const MENU = [
  { id: "nasiPutih", name: "Nasi putih (100 g)", kcal: 175, group: "Karbohidrat" },
  { id: "nasiJagung", name: "Nasi jagung (100 g)", kcal: 150, group: "Karbohidrat" },
  { id: "dagingSapi", name: "Daging sapi (100 g)", kcal: 280, group: "Protein hewani" },
  { id: "dagingAyam", name: "Daging ayam (100 g)", kcal: 240, group: "Protein hewani" },
  { id: "tempeGoreng", name: "Tempe goreng (100 g)", kcal: 200, group: "Protein nabati" },
  { id: "tahuGoreng", name: "Tahu goreng (100 g)", kcal: 115, group: "Protein nabati" },
  { id: "sayurHijau", name: "Sayuran hijau (100 g)", kcal: 50, group: "Serat dan vitamin" },
];

const DONAT = [
  { h: "Senin", c: 3, kj: 6, s: 4, kc: 4 },
  { h: "Selasa", c: 4, kj: 4, s: 6, kc: 3 },
  { h: "Rabu", c: 5, kj: 3, s: 4, kc: 2 },
  { h: "Kamis", c: 5, kj: 4, s: 5, kc: 1 },
  { h: "Jumat", c: 6, kj: 3, s: 3, kc: 0 },
  { h: "Sabtu", c: 7, kj: 5, s: 4, kc: 0 },
];

export default function MatematikaKelas5Bab8({
  studentId = "SISWA-DEMO-01",
  studentName = "Penjelajah Muda",
  completedOtherChapters = BAB_LAIN,
  onChapterComplete,
}: IGILModuleProps) {
  const [activeCard, setActiveCard] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [soundOn, setSoundOn] = useState(true);
  const [card2Unlocked, setCard2Unlocked] = useState(false);
  const [card5Unlocked, setCard5Unlocked] = useState(false);
  const [card6Unlocked, setCard6Unlocked] = useState(false);
  const [claimedPracticeIds, setClaimedPracticeIds] = useState<number[]>([]);
  const [examTokens, setExamTokens] = useState(0);
  const [practicumTokens, setPracticumTokens] = useState(0);
  const practiceTokens = Math.min(30, claimedPracticeIds.length * 3);
  const totalTokens = practiceTokens + examTokens + practicumTokens;
  const sfx = useCallback((type: Suara) => {
    if (soundOn) playSound(type);
  }, [soundOn]);

  const speakIGIL = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "id-ID";
    u.rate = 0.96;
    window.speechSynthesis.speak(u);
  };

  const [hookSolved, setHookSolved] = useState(false);
  const [hookWrongMsg, setHookWrongMsg] = useState<string | null>(null);
  const [subbabTab, setSubbabTab] = useState<"A" | "B" | "C12" | "C3">("A");
  const [tallySorted, setTallySorted] = useState(false);
  const [statementChecked, setStatementChecked] = useState<string | null>(null);
  const [kamisApem, setKamisApem] = useState(36);
  const [jumatApem, setJumatApem] = useState(24);
  const [sabtuApem, setSabtuApem] = useState(28);
  const apemPas = kamisApem === 37 && jumatApem === 27 && sabtuApem === 29;
  const [chartSubMode, setChartSubMode] = useState<"vertikal" | "horizontal">("vertikal");
  const [seaGames2017Bar, setSeaGames2017Bar] = useState(30);
  const [leleKolam2, setLeleKolam2] = useState(25);
  const [leleKolam4, setLeleKolam4] = useState(10);
  const [mergedDoubleBar, setMergedDoubleBar] = useState(false);
  const [yearEqualGuessed, setYearEqualGuessed] = useState<string | null>(null);

  const [labMode, setLabMode] = useState<"simulator" | "canvas">("simulator");
  const [tomatData, setTomatData] = useState([10, 14, 20, 12, 4]);
  const [simDisplayType, setSimDisplayType] = useState<"vertikal" | "horizontal" | "piktogram">("vertikal");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const menggambar = useRef(false);
  const [penColor, setPenColor] = useState("#2563eb");

  const [practiceQuestions, setPracticeQuestions] = useState<SoalData[]>([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<number, boolean>>({});
  const [examQuestions, setExamQuestions] = useState<SoalData[]>([]);
  const [examIndex, setExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(1);
  const [examStartTimeMs, setExamStartTimeMs] = useState(() => Date.now());
  const [examDurationSec, setExamDurationSec] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [timingValid, setTimingValid] = useState(true);

  const [menuPortions, setMenuPortions] = useState<Record<string, number>>({
    nasiPutih: 1,
    nasiJagung: 0,
    dagingSapi: 0,
    dagingAyam: 1,
    tempeGoreng: 1,
    tahuGoreng: 1,
    sayurHijau: 2,
  });
  const [gardenLengthM, setGardenLengthM] = useState(6);
  const [gardenWidthM, setGardenWidthM] = useState(5);
  const [practicumChartMode, setPracticumChartMode] = useState<"batang" | "piktogram">("batang");
  const [studentReportText, setStudentReportText] = useState("");
  const [evaluatedRubric, setEvaluatedRubric] = useState<PracticumEvaluationRubric | null>(null);

  const totalCalories = MENU.reduce((acc, item) => acc + item.kcal * (menuPortions[item.id] || 0), 0);
  const activeMenuCount = MENU.filter((item) => (menuPortions[item.id] || 0) > 0).length;
  const gardenAreaM2 = gardenLengthM * gardenWidthM;

  useEffect(() => {
    setPracticeQuestions(buatSoalData());
    setExamQuestions(buatSoalData());
  }, []);

  useEffect(() => {
    if (activeCard !== 5 || examSubmitted) return;
    const hitung = () => {
      if (document.hidden) setTabSwitchCount((prev) => prev + 1);
    };
    document.addEventListener("visibilitychange", hitung);
    window.addEventListener("blur", hitung);
    return () => {
      document.removeEventListener("visibilitychange", hitung);
      window.removeEventListener("blur", hitung);
    };
  }, [activeCard, examSubmitted]);

  useEffect(() => {
    if (Object.keys(practiceChecked).length === 10) setCard5Unlocked(true);
  }, [practiceChecked]);

  const gambarGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (activeCard !== 3 || labMode !== "canvas") return;
    const timer = window.setTimeout(gambarGrid, 40);
    return () => window.clearTimeout(timer);
  }, [activeCard, labMode, gambarGrid]);

  const titikKanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const stempel = (jenis: "turus" | "batang") => {
    sfx("laser");
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.strokeStyle = "#0f172a";
    ctx.fillStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.font = "bold 12px sans-serif";
    if (jenis === "turus") {
      ["Kategori", "Turus", "Frekuensi"].forEach((h, i) => {
        ctx.strokeRect(40 + i * 160, 30, 160, 32);
        ctx.strokeRect(40 + i * 160, 62, 160, 140);
        ctx.fillText(h, 55 + i * 160, 50);
      });
      return;
    }
    ctx.beginPath();
    ctx.moveTo(580, 35);
    ctx.lineTo(580, 210);
    ctx.lineTo(800, 210);
    ctx.stroke();
    [0, 10, 20, 30, 40].forEach((val, idx) => {
      ctx.fillText(String(val), 548, 214 - idx * 40);
    });
  };

  const bukaKartu = (id: 1 | 2 | 3 | 4 | 5 | 6, terkunci: boolean) => {
    if (terkunci) {
      sfx("wrong");
      if (id <= 4) {
        window.alert("Selesaikan teka-teki donat Anggi di kartu 1 dahulu.");
      } else if (id === 5) {
        window.alert("Periksa ke-10 soal latihan dahulu.");
      } else {
        window.alert("Nilai ujian harus 100 untuk membuka praktikum.");
      }
      return;
    }
    sfx("click");
    if (id === 5 && !examSubmitted) setExamStartTimeMs(Date.now());
    setActiveCard(id);
  };

  const periksaLatihan = () => {
    const soal = practiceQuestions[practiceIndex];
    if (!soal) return;
    const dipilih = practiceAnswers[soal.id];
    if (!dipilih) return;
    setPracticeChecked((prev) => ({ ...prev, [soal.id]: true }));
    if (dipilih === soal.correctAnswer) {
      sfx("coin");
      setClaimedPracticeIds((prev) => (prev.includes(soal.id) ? prev : [...prev, soal.id]));
    } else {
      sfx("wrong");
    }
  };

  const kumpulkanUjian = () => {
    if (Object.keys(examAnswers).length < examQuestions.length) {
      window.alert("Jawab ke-10 soal ujian dahulu.");
      return;
    }
    const durasi = Math.max(1, Math.round((Date.now() - examStartTimeMs) / 1000));
    const manusia = durasi >= 25;
    let benar = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) benar += 1;
    });
    const skor = benar * 10;
    setExamDurationSec(durasi);
    setTimingValid(manusia);
    setExamScore(skor);
    setExamSubmitted(true);
    if (manusia) setExamTokens((prev) => Math.max(prev, benar * 7));
    if (skor === 100 && manusia) {
      setCard6Unlocked(true);
      sfx("fanfare");
    } else {
      sfx("wrong");
    }
  };

  const nilaiPraktikum = async () => {
    const selisihKalori =
      totalCalories >= 650 && totalCalories <= 750 ? 0 : Math.min(200, Math.abs(totalCalories - 700));
    const luasPas = gardenAreaM2 >= 24 && gardenAreaM2 <= 36;
    const accuracyScore = Math.min(
      300,
      Math.max(120, Math.round(300 - selisihKalori * 0.6 - (luasPas ? 0 : 50))),
    );
    const adaKarbo = (menuPortions.nasiPutih || 0) + (menuPortions.nasiJagung || 0) > 0;
    const adaProtein =
      (menuPortions.dagingSapi || 0) +
        (menuPortions.dagingAyam || 0) +
        (menuPortions.tempeGoreng || 0) +
        (menuPortions.tahuGoreng || 0) >
      0;
    const adaSayur = (menuPortions.sayurHijau || 0) >= 1;
    let synthesisScore = 100;
    if (adaKarbo) synthesisScore += 45;
    if (adaProtein) synthesisScore += 45;
    if (adaSayur && luasPas) synthesisScore += 60;
    synthesisScore = Math.min(250, synthesisScore);
    const variasi = Math.min(100, activeMenuCount * 22);
    const seimbang =
      totalCalories >= 680 && totalCalories <= 720 ? 100 : totalCalories >= 650 && totalCalories <= 750 ? 85 : 55;
    const optimizationVisualScore = Math.min(200, variasi + seimbang);
    const bersih = studentReportText.trim();
    const kata = bersih ? bersih.split(/\s+/).length : 0;
    let reasoningReportScore = Math.min(150, kata * 6);
    if (/\d+/.test(bersih)) reasoningReportScore += 50;
    if (/kalori|kkal|luas|sayur|diagram|seimbang|protein/i.test(bersih)) reasoningReportScore += 50;
    reasoningReportScore = Math.min(250, reasoningReportScore);
    const totalQualityScore = accuracyScore + synthesisScore + optimizationVisualScore + reasoningReportScore;
    const rubric: PracticumEvaluationRubric = {
      accuracyScore,
      synthesisScore,
      optimizationVisualScore,
      reasoningReportScore,
      totalQualityScore,
      aiFeedbackSummary:
        totalQualityScore >= 880
          ? "Karya ini tepat: kalori ada di rentang 650–750 kkal, luas kebun sesuai target, dan laporan menyebut angkanya."
          : totalQualityScore >= 720
            ? "Diagram dan rancangan sudah menyatukan data, luas, dan gizi. Dekatkan kalori ke 700 kkal dan tulis angkanya di laporan."
            : "Sesuaikan porsi agar 650–750 kkal, atur luas kebun 24–36 m², lalu tulis alasan dengan angka.",
    };
    sfx("fanfare");
    setEvaluatedRubric(rubric);
    setPracticumTokens(50);
    const tokenUjian = Math.max(examTokens, 70);
    await onChapterComplete?.({
      chapterId: CHAPTER_COMPETENCY_METADATA.chapterId,
      studentId,
      practiceTokensEarned: practiceTokens,
      examTokensEarned: tokenUjian,
      practicumTokensEarned: 50,
      totalChapterTokens: practiceTokens + tokenUjian + 50,
      examScore: 100,
      practicumRubric: rubric,
      telemetry: {
        attemptCount,
        examDurationSeconds: examDurationSec,
        tabSwitchCount,
        isHumanTimingValid: timingValid,
        completedAtISO: new Date().toISOString(),
      },
      auditTrail: examQuestions.map((q) => ({
        questionId: q.id,
        questionText: q.question,
        selectedAnswer: examAnswers[q.id] || "",
        isCorrect: examAnswers[q.id] === q.correctAnswer,
      })),
    });
  };

  const soalLatihan = practiceQuestions[practiceIndex];
  const soalUjian = examQuestions[examIndex];
  const latihanLengkap = Object.keys(practiceChecked).length === 10;
  const kartu = [
    { id: 1 as const, label: "1. Silabus & Hook", ikon: "🗺️", terkunci: false },
    { id: 2 as const, label: "2. Game Sub-Bab", ikon: card2Unlocked ? "🎮" : "🔒", terkunci: !card2Unlocked },
    { id: 3 as const, label: "3. Simulasi & Kanvas", ikon: card2Unlocked ? "🔬" : "🔒", terkunci: !card2Unlocked },
    { id: 4 as const, label: `4. Latihan (${practiceTokens}/30)`, ikon: card2Unlocked ? "🎯" : "🔒", terkunci: !card2Unlocked },
    { id: 5 as const, label: `5. Ujian (${examTokens}/70)`, ikon: card5Unlocked ? "🏆" : "🔒", terkunci: !card5Unlocked },
    { id: 6 as const, label: `6. Praktikum (${practicumTokens}/50)`, ikon: card6Unlocked ? "🎨" : "🔒", terkunci: !card6Unlocked },
  ];

  const batangSoal = (soal: SoalData) => {
    const maxVal = Math.max(...soal.bars.map((x) => Math.max(x.val, x.val2 || 0)), 10);
    return (
      <div className="flex h-44 items-end justify-around gap-2 rounded-2xl bg-slate-900 p-4 text-white">
        {soal.bars.map((b) => (
          <div key={b.label} className="flex flex-col items-center">
            <div className="flex items-end gap-1">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-amber-300">{b.val}</span>
                <div style={{ height: `${Math.max(8, (b.val / maxVal) * 100)}px` }} className="w-6 rounded-t bg-indigo-400" />
              </div>
              {b.val2 !== undefined ? (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-emerald-300">{b.val2}</span>
                  <div style={{ height: `${Math.max(8, (b.val2 / maxVal) * 100)}px` }} className="w-6 rounded-t bg-emerald-400" />
                </div>
              ) : null}
            </div>
            <span className="mt-1 text-[10px] font-bold text-slate-300">{b.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-800">
      <header className="border-b border-indigo-700/60 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <IgilOwl mood={card6Unlocked ? "proud" : "happy"} />
            <div>
              <span className="rounded-full border border-indigo-600 bg-indigo-800 px-2.5 py-0.5 text-[11px] font-black uppercase text-amber-300">
                Kelas 5 SD • Bab 8 • Hlm. 235–272
              </span>
              <h1 className="mt-0.5 text-base font-extrabold md:text-lg">Tabel Frekuensi, Piktogram, dan Diagram Batang</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSoundOn((v) => !v)} className="rounded-xl border border-indigo-600 bg-indigo-800 px-3 py-1.5 text-xs font-bold">
              {soundOn ? "Suara nyala" : "Suara mati"}
            </button>
            <div className="rounded-2xl border-2 border-amber-400 bg-slate-950 px-4 py-1">
              <div className="text-[10px] font-bold uppercase text-amber-200">Token bab ini</div>
              <div className="text-base font-black text-amber-400">{totalTokens} / 150</div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 pb-2.5">
          {kartu.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => bukaKartu(c.id, c.terkunci)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border-b-4 px-3.5 py-2 text-xs font-extrabold ${
                activeCard === c.id
                  ? "border-amber-600 bg-amber-400 text-slate-950"
                  : c.terkunci
                    ? "border-slate-950 bg-slate-800/70 text-slate-400"
                    : "border-indigo-950 bg-indigo-900/80 text-indigo-100"
              }`}
            >
              <span>{c.ikon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4">
        {activeCard === 1 ? (
          <section className="space-y-5 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black uppercase text-indigo-800">
                  {CHAPTER_COMPETENCY_METADATA.textbookReference}
                </span>
                <h2 className="mt-1 text-xl font-black text-slate-900">Halo {studentName}. Ini peta misi Bab 8.</h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakIGIL(
                    "Di Bab 8 kita mengolah data bersama Yohana, Nisa, Lukas, Asep, Komang, dan Anggi. Selesaikan teka-teki donat Anggi untuk membuka kartu berikutnya.",
                  )
                }
                className="rounded-2xl border-b-4 border-indigo-800 bg-indigo-600 px-4 py-2 text-xs font-black text-white"
              >
                Suara IGIL
              </button>
            </div>
            <div className="grid gap-3 text-xs md:grid-cols-3">
              <div className="space-y-1.5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-3.5">
                <div className="font-black uppercase text-indigo-900">Peta sub-bab</div>
                <p>Sub-bab A: mengumpulkan data, turus, dan tabel frekuensi.</p>
                <p>Sub-bab B: piktogram berskala.</p>
                <p>Sub-bab C: diagram batang vertikal, horizontal, dan ganda.</p>
              </div>
              <div className="space-y-1.5 rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-3.5">
                <div className="font-black uppercase text-amber-900">Gerbang 1</div>
                <p>Sepuluh latihan memberi paling banyak 30 token. Ujian harus 100 untuk 70 token dan membuka praktikum. Lama waktu tidak menjadi juara.</p>
              </div>
              <div className="space-y-1.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-3.5">
                <div className="font-black uppercase text-emerald-900">Gerbang 2</div>
                <p>Peringkat karya memakai skor 0–1.000: akurasi 300, sintesis 250, visual 200, dan laporan 250. Token bab ini bukan uang.</p>
              </div>
            </div>
            <div className="grid items-center gap-5 rounded-3xl bg-slate-900 p-5 text-white md:grid-cols-2">
              <div className="space-y-3">
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black uppercase text-slate-950">
                  Teka-teki halaman 237
                </span>
                <h3 className="text-lg font-black text-amber-300">Bantu Anggi membaca Tabel 8.1</h3>
                <p className="text-xs leading-relaxed text-slate-200">
                  Cokelat naik dari 3 menjadi 7. Kacang turun sampai 0 pada Jumat dan Sabtu. Pilih keputusan yang sesuai data.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    sfx("fanfare");
                    setHookSolved(true);
                    setCard2Unlocked(true);
                    setHookWrongMsg(null);
                  }}
                  className="w-full rounded-xl border-b-4 border-emerald-700 bg-emerald-500 p-3 text-left text-xs font-black text-slate-950"
                >
                  Hentikan donat kacang dan tambah donat cokelat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sfx("wrong");
                    setHookWrongMsg("Kacang pada Jumat dan Sabtu bernilai 0. Rasa yang tidak terbeli tidak ditambah.");
                  }}
                  className="w-full rounded-xl bg-slate-800 p-3 text-left text-xs font-bold text-slate-200"
                >
                  Perbanyak donat kacang dan hentikan donat cokelat
                </button>
                {hookWrongMsg ? <p className="text-xs font-bold text-rose-300">{hookWrongMsg}</p> : null}
                {hookSolved ? (
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-400 bg-emerald-500/20 p-3">
                    <span className="text-xs font-bold text-emerald-200">Kartu 2, 3, dan 4 terbuka.</span>
                    <button type="button" onClick={() => { sfx("click"); setActiveCard(2); }} className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">
                      Lanjut kartu 2
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3.5">
                <div className="mb-2 text-center text-xs font-black text-amber-300">Tabel 8.1 Penjualan donat Anggi</div>
                <table className="w-full border-collapse text-center text-xs">
                  <thead>
                    <tr className="bg-indigo-950 text-indigo-200">
                      <th className="p-1.5">Hari</th>
                      <th className="p-1.5 text-amber-300">Cokelat</th>
                      <th className="p-1.5">Keju</th>
                      <th className="p-1.5">Stroberi</th>
                      <th className="p-1.5 text-rose-300">Kacang</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold">
                    {DONAT.map((r) => (
                      <tr key={r.h} className="border-b border-slate-700">
                        <td className="p-1.5 text-slate-300">{r.h}</td>
                        <td className="p-1.5 text-amber-300">{r.c}</td>
                        <td className="p-1.5">{r.kj}</td>
                        <td className="p-1.5">{r.s}</td>
                        <td className="p-1.5 text-rose-400">{r.kc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 2 ? (
          <section className="space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
              {(
                [
                  ["A", "A. Turus"],
                  ["B", "B. Piktogram"],
                  ["C12", "C. Batang"],
                  ["C3", "C. Batang ganda"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { sfx("click"); setSubbabTab(id); }}
                  className={`rounded-xl border-b-4 px-3.5 py-2 text-xs font-black ${subbabTab === id ? "border-indigo-800 bg-indigo-600 text-white" : "border-slate-300 bg-slate-100 text-slate-700"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {subbabTab === "A" ? (
              <div className="grid items-start gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-xl font-black">Sayuran favorit kelas V</h3>
                  <p className="text-xs text-slate-600">Satu ikat turus adalah 4 garis tegak dan 1 garis miring. Nilainya 5.</p>
                  <button type="button" onClick={() => { sfx("laser"); setTallySorted((v) => !v); }} className="w-full rounded-xl border-b-4 border-emerald-800 bg-emerald-600 py-2.5 text-xs font-black text-white">
                    {tallySorted ? "Lihat catatan mentah" : "Susun menjadi tabel turus"}
                  </button>
                  <div className="space-y-2 rounded-2xl bg-slate-900 p-3.5 text-xs text-white">
                    {[
                      ["yohana", "Wortel paling banyak: 8 siswa.", true],
                      ["asep", "Tomat (6) lebih banyak daripada bayam (7).", false],
                      ["lukas", "Yang paling sedikit adalah buncis (4), bukan kol (3).", false],
                    ].map(([id, txt, valid]) => (
                      <button
                        key={String(id)}
                        type="button"
                        onClick={() => {
                          setStatementChecked(String(id));
                          sfx(valid ? "fanfare" : "wrong");
                        }}
                        className={`w-full rounded-lg p-2 text-left font-bold ${
                          statementChecked === id
                            ? valid
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-rose-600 text-white"
                            : "bg-slate-800"
                        }`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                  {SAYURAN.map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs">
                      <span className="w-28 font-black">{item.icon} {item.name}</span>
                      <span className="flex-1 text-center">{tallySorted ? <TallyMarks count={item.count} /> : "Belum disusun"}</span>
                      <span className="w-10 text-right font-black text-indigo-700">{tallySorted ? item.count : "?"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {subbabTab === "B" ? (
              <div className="grid items-start gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-xl font-black">Piktogram kue apem</h3>
                  <p className="text-xs text-slate-600">Satu gambar utuh = 4 apem. Lengkapi Kamis 37, Jumat 27, dan Sabtu 29.</p>
                  {(
                    [
                      ["Kamis", kamisApem, setKamisApem, 37],
                      ["Jumat", jumatApem, setJumatApem, 27],
                      ["Sabtu", sabtuApem, setSabtuApem, 29],
                    ] as const
                  ).map(([label, val, set, target]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-amber-50 p-2 text-xs">
                      <span className="font-bold">{label}, target {target}</span>
                      <span className="flex items-center gap-2">
                        <button type="button" onClick={() => { sfx("pop"); set(Math.max(20, val - 1)); }} className="h-7 w-7 rounded-lg bg-slate-200 font-black">-</button>
                        <span className={`w-16 text-center font-black ${val === target ? "text-emerald-600" : "text-rose-600"}`}>{val}</span>
                        <button type="button" onClick={() => { const next = Math.min(40, val + 1); set(next); sfx(next === target ? "coin" : "pop"); }} className="h-7 w-7 rounded-lg bg-amber-500 font-black text-white">+</button>
                      </span>
                    </div>
                  ))}
                  {apemPas ? <p className="rounded-xl bg-emerald-100 p-3 text-xs font-bold text-emerald-950">Enam hari: 40 + 35 + 30 + 37 + 27 + 29 = 198 apem.</p> : null}
                </div>
                <div className="space-y-1.5 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                  {[
                    ["Senin", 40],
                    ["Selasa", 35],
                    ["Rabu", 30],
                    ["Kamis", kamisApem],
                    ["Jumat", jumatApem],
                    ["Sabtu", sabtuApem],
                  ].map(([hari, nilai]) => {
                    const jumlah = Number(nilai);
                    const utuh = Math.floor(jumlah / 4);
                    const sisa = jumlah % 4;
                    return (
                      <div key={String(hari)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs">
                        <span className="w-16 font-black">{hari}</span>
                        <span className="flex flex-wrap gap-0.5">
                          {Array.from({ length: utuh }).map((_, i) => <IkonApem key={i} quarters={4} />)}
                          {sisa === 1 || sisa === 2 || sisa === 3 ? <IkonApem quarters={sisa} /> : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {subbabTab === "C12" ? (
              <div className="grid items-start gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => { sfx("click"); setChartSubMode("vertikal"); }} className={`rounded-xl px-3 py-1.5 text-xs font-black ${chartSubMode === "vertikal" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>Vertikal Sea Games</button>
                    <button type="button" onClick={() => { sfx("click"); setChartSubMode("horizontal"); }} className={`rounded-xl px-3 py-1.5 text-xs font-black ${chartSubMode === "horizontal" ? "bg-teal-700 text-white" : "bg-slate-100"}`}>Horizontal lele</button>
                  </div>
                  {chartSubMode === "vertikal" ? (
                    <div className="space-y-2 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-xs">
                      <p>Geser batang 2017 sampai tepat 38 medali emas.</p>
                      <label className="flex items-center justify-between font-black">
                        Tahun 2017: {seaGames2017Bar}
                        <input type="range" min={20} max={60} value={seaGames2017Bar} onChange={(e) => { const val = Number(e.target.value); setSeaGames2017Bar(val); if (val === 38) sfx("fanfare"); }} className="w-40 accent-indigo-600" />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-xs">
                      <p>Kolam 2 target 35 kg. Kolam 4 target 7 kg.</p>
                      <label className="flex items-center justify-between font-bold">Kolam 2: {leleKolam2} kg<input type="range" min={15} max={40} value={leleKolam2} onChange={(e) => setLeleKolam2(Number(e.target.value))} className="w-36 accent-teal-600" /></label>
                      <label className="flex items-center justify-between font-bold">Kolam 4: {leleKolam4} kg<input type="range" min={1} max={20} value={leleKolam4} onChange={(e) => setLeleKolam4(Number(e.target.value))} className="w-36 accent-teal-600" /></label>
                    </div>
                  )}
                  <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-950">
                    Batang vertikal: tinggi menunjukkan banyak data. Batang horizontal: panjang mendatar menunjukkan banyak data.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  {chartSubMode === "vertikal" ? (
                    <div className="flex h-52 items-end justify-around gap-2 border-b border-l border-slate-600 px-2">
                      {[
                        ["2013", 65],
                        ["2015", 47],
                        ["2017", seaGames2017Bar],
                        ["2019", 72],
                        ["2021", 69],
                      ].map(([tahun, nilai]) => (
                        <div key={String(tahun)} className="flex w-11 flex-col items-center">
                          <span className="text-[11px] font-black text-amber-300">{nilai}</span>
                          <div style={{ height: `${Number(nilai) * 1.5}px` }} className={`w-full rounded-t ${tahun === "2017" ? (nilai === 38 ? "bg-emerald-400" : "bg-rose-500") : "bg-indigo-500"}`} />
                          <span className="mt-1 text-[11px]">{tahun}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {[
                        ["Kolam 1", 32],
                        ["Kolam 2", leleKolam2],
                        ["Kolam 3", 21],
                        ["Kolam 4", leleKolam4],
                        ["Kolam 5", 25],
                      ].map(([nama, nilai]) => (
                        <div key={String(nama)} className="flex items-center gap-2 text-xs">
                          <span className="w-16">{nama}</span>
                          <span className="h-5 flex-1 overflow-hidden rounded-r bg-slate-800"><span style={{ width: `${(Number(nilai) / 40) * 100}%` }} className="block h-full bg-teal-400" /></span>
                          <span className="w-12 text-right font-black text-amber-300">{nilai} kg</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {subbabTab === "C3" ? (
              <div className="grid items-start gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-xl font-black">Sebaran siswa laki-laki dan perempuan</h3>
                  <p className="text-xs text-slate-600">Dua diagram pada sumbu tahun yang sama bisa digabung jika skalanya setara.</p>
                  <button type="button" onClick={() => { sfx("laser"); setMergedDoubleBar((v) => !v); }} className="w-full rounded-xl border-b-4 border-purple-800 bg-purple-600 py-2.5 text-xs font-black text-white">
                    {mergedDoubleBar ? "Kembali ke skala berbeda" : "Samakan skala dan gabungkan"}
                  </button>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {["2017", "2018", "2021"].map((tahun) => (
                      <button
                        key={tahun}
                        type="button"
                        onClick={() => { setYearEqualGuessed(tahun); sfx(tahun === "2018" ? "fanfare" : "wrong"); }}
                        className={`rounded-xl p-2 font-black ${yearEqualGuessed === tahun ? (tahun === "2018" ? "bg-emerald-500 text-slate-950" : "bg-rose-600 text-white") : "bg-slate-800 text-white"}`}
                      >
                        Tahun {tahun}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">Pada tahun berapa jumlah laki-laki dan perempuan sama?</p>
                </div>
                <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex justify-between text-xs font-black">
                    <span>Biru laki-laki</span>
                    <span className="text-amber-600">Kuning perempuan</span>
                  </div>
                  <div className="flex h-52 items-end justify-around rounded-xl border border-slate-200 bg-white px-3">
                    {SEBARAN.map((d) => (
                      <div key={d.year} className="flex flex-col items-center">
                        <div className="flex items-end gap-1">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-blue-700">{d.laki}</span>
                            <div style={{ height: `${d.laki * 6}px` }} className="w-5 rounded-t bg-blue-600" />
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-amber-600">{d.perempuan}</span>
                            <div style={{ height: `${d.perempuan * (mergedDoubleBar ? 6 : 8)}px` }} className="w-5 rounded-t bg-amber-400" />
                          </div>
                        </div>
                        <span className="mt-1 text-[11px] font-black">{d.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {activeCard === 3 ? (
          <section className="space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => { sfx("click"); setLabMode("simulator"); }} className={`rounded-xl px-4 py-2 text-xs font-black ${labMode === "simulator" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>Panen tomat</button>
              <button type="button" onClick={() => { sfx("click"); setLabMode("canvas"); }} className={`rounded-xl px-4 py-2 text-xs font-black ${labMode === "canvas" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>Kanvas berpetak</button>
            </div>
            {labMode === "simulator" ? (
              <div className="grid items-start gap-5 md:grid-cols-2">
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {tomatData.map((val, idx) => (
                    <label key={idx} className="flex items-center justify-between text-xs font-bold">
                      Minggu {idx + 1}
                      <input type="range" min={2} max={24} step={2} value={val} onChange={(e) => { const next = [...tomatData]; next[idx] = Number(e.target.value); setTomatData(next); }} className="w-40 accent-indigo-600" />
                      <span className="w-12 text-right">{val} kg</span>
                    </label>
                  ))}
                  <div className="flex gap-2 pt-2">
                    {(["vertikal", "horizontal", "piktogram"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => setSimDisplayType(t)} className={`flex-1 rounded-lg py-1.5 text-xs font-black uppercase ${simDisplayType === t ? "bg-amber-400" : "border border-slate-300 bg-white"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="min-h-60 rounded-2xl bg-slate-900 p-5 text-white">
                  {simDisplayType === "vertikal" ? (
                    <div className="flex h-44 items-end justify-around border-b border-l border-slate-700">
                      {tomatData.map((v, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-xs font-black text-amber-300">{v}</span>
                          <div style={{ height: `${v * 5}px` }} className="w-8 rounded-t bg-emerald-400" />
                          <span className="text-[11px]">Mg {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {simDisplayType === "horizontal" ? (
                    <div className="space-y-2">
                      {tomatData.map((v, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="w-20">Minggu {i + 1}</span>
                          <span className="h-5 flex-1 overflow-hidden rounded-r bg-slate-800"><span style={{ width: `${(v / 24) * 100}%` }} className="block h-full bg-amber-400" /></span>
                          <span className="w-12 text-right">{v} kg</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {simDisplayType === "piktogram" ? (
                    <div className="space-y-1 text-xs">
                      <p className="text-center font-bold text-amber-300">1 tomat = 2 kg</p>
                      {tomatData.map((v, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-1">
                          <span>Minggu {i + 1}</span>
                          <span>{"🍅".repeat(Math.floor(v / 2))}</span>
                          <span>{v} kg</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {["#2563eb", "#e11d48", "#16a34a", "#d97706", "#0f172a"].map((c) => (
                    <button key={c} type="button" onClick={() => setPenColor(c)} style={{ backgroundColor: c }} className={`h-6 w-6 rounded-full ${penColor === c ? "ring-4 ring-indigo-300" : ""}`} aria-label={c} />
                  ))}
                  <button type="button" onClick={() => stempel("turus")} className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white">Stempel tabel turus</button>
                  <button type="button" onClick={() => stempel("batang")} className="rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-bold text-white">Stempel sumbu</button>
                  <button type="button" onClick={() => { sfx("click"); gambarGrid(); }} className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700">Bersihkan</button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={840}
                  height={250}
                  onPointerDown={(e) => {
                    const titik = titikKanvas(e);
                    const ctx = canvasRef.current?.getContext("2d");
                    if (!titik || !ctx) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    ctx.beginPath();
                    ctx.moveTo(titik.x, titik.y);
                    menggambar.current = true;
                  }}
                  onPointerMove={(e) => {
                    if (!menggambar.current) return;
                    const titik = titikKanvas(e);
                    const ctx = canvasRef.current?.getContext("2d");
                    if (!titik || !ctx) return;
                    ctx.strokeStyle = penColor;
                    ctx.lineWidth = 3.5;
                    ctx.lineCap = "round";
                    ctx.lineTo(titik.x, titik.y);
                    ctx.stroke();
                  }}
                  onPointerUp={() => { menggambar.current = false; }}
                  onPointerLeave={() => { menggambar.current = false; }}
                  className="h-60 w-full cursor-crosshair touch-none rounded-2xl border-2 border-slate-300 bg-white"
                />
              </div>
            )}
          </section>
        ) : null}

        {activeCard === 4 && soalLatihan ? (
          <section className="space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-800">
                Latihan {practiceIndex + 1}/10 • {soalLatihan.subbabTag}
              </span>
              <div className="flex gap-1">
                {practiceQuestions.map((q, idx) => (
                  <button key={q.id} type="button" onClick={() => setPracticeIndex(idx)} className={`h-7 w-7 rounded-lg text-xs font-black ${practiceIndex === idx ? "bg-indigo-600 text-white" : practiceChecked[q.id] ? (practiceAnswers[q.id] === q.correctAnswer ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : "bg-slate-100"}`}>{idx + 1}</button>
                ))}
              </div>
            </div>
            <div className="grid items-start gap-5 md:grid-cols-3">
              {batangSoal(soalLatihan)}
              <div className="space-y-3 md:col-span-2">
                <p className="text-sm text-slate-600">{soalLatihan.story}</p>
                <h3 className="text-base font-black">{soalLatihan.question}</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {soalLatihan.options.map((opt) => (
                    <button key={opt} type="button" disabled={practiceChecked[soalLatihan.id]} onClick={() => { sfx("click"); setPracticeAnswers((prev) => ({ ...prev, [soalLatihan.id]: opt })); }} className={`rounded-xl border-2 p-3 text-left text-xs font-extrabold ${practiceAnswers[soalLatihan.id] === opt ? "border-indigo-800 bg-indigo-600 text-white" : "border-slate-200 bg-slate-50"}`}>{opt}</button>
                  ))}
                </div>
                {practiceChecked[soalLatihan.id] ? (
                  <p className={`rounded-xl p-3 text-xs font-semibold ${practiceAnswers[soalLatihan.id] === soalLatihan.correctAnswer ? "bg-emerald-100" : "bg-rose-100"}`}>
                    {practiceAnswers[soalLatihan.id] === soalLatihan.correctAnswer ? "Benar. +3 token, sekali untuk soal ini." : `Kunci: ${soalLatihan.correctAnswer}.`} {soalLatihan.explanation}
                  </p>
                ) : null}
                <div className="flex items-center justify-between">
                  <button type="button" disabled={practiceIndex === 0} onClick={() => setPracticeIndex((p) => Math.max(0, p - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                  {!practiceChecked[soalLatihan.id] ? (
                    <button type="button" onClick={periksaLatihan} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-6 py-2.5 text-xs font-black">Periksa jawaban</button>
                  ) : practiceIndex < practiceQuestions.length - 1 ? (
                    <button type="button" onClick={() => setPracticeIndex((p) => p + 1)} className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-black text-white">Soal berikutnya</button>
                  ) : latihanLengkap ? (
                    <button type="button" onClick={() => { setCard5Unlocked(true); setExamStartTimeMs(Date.now()); setActiveCard(5); }} className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-black text-white">Buka ujian</button>
                  ) : (
                    <span className="text-xs font-bold text-slate-500">Periksa sepuluh soal dahulu.</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeCard === 5 && soalUjian ? (
          <section className="space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 p-4 text-white">
              <div>
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black uppercase text-slate-950">Percobaan ke-{attemptCount}</span>
                <h2 className="mt-1 text-base font-black">Ujian Bab 8. Nilai 100 membuka praktikum.</h2>
              </div>
              <div className="text-xs">Pindah layar: {tabSwitchCount}</div>
            </div>
            <div className="flex gap-1">
              {examQuestions.map((q, i) => (
                <button key={q.id} type="button" onClick={() => setExamIndex(i)} className={`h-7 w-7 rounded text-xs font-black ${examIndex === i ? "bg-amber-400" : examAnswers[q.id] ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>{i + 1}</button>
              ))}
            </div>
            {examSubmitted ? (
              <div className={`space-y-3 rounded-2xl border-2 p-6 text-center ${examScore === 100 && timingValid ? "border-emerald-500 bg-emerald-50" : "border-amber-400 bg-amber-50"}`}>
                <div className="text-2xl font-black">Skor {examScore}/100 • {examDurationSec} detik</div>
                {!timingValid ? <p className="text-xs font-bold text-rose-700">Di bawah 25 detik. Ulangi sambil membaca soal.</p> : null}
                {examScore === 100 && timingValid ? (
                  <button type="button" onClick={() => { sfx("fanfare"); setActiveCard(6); }} className="rounded-2xl border-b-4 border-emerald-800 bg-emerald-600 px-8 py-3 text-sm font-black text-white">Masuk praktikum</button>
                ) : (
                  <p className="text-xs font-semibold">Ujian perlu 100. Angka soal berikutnya berbeda.</p>
                )}
                <button type="button" onClick={() => { sfx("click"); setAttemptCount((c) => c + 1); setExamQuestions(buatSoalData()); setExamAnswers({}); setExamIndex(0); setExamSubmitted(false); setExamStartTimeMs(Date.now()); }} className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-black text-white">Ulangi ujian</button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase text-indigo-700">Soal {examIndex + 1} • {soalUjian.subbabTag}</p>
                <p className="text-sm text-slate-600">{soalUjian.story}</p>
                <h3 className="text-base font-black">{soalUjian.question}</h3>
                {batangSoal(soalUjian)}
                <div className="grid gap-2 md:grid-cols-2">
                  {soalUjian.options.map((opt) => (
                    <button key={opt} type="button" onClick={() => { sfx("click"); setExamAnswers((prev) => ({ ...prev, [soalUjian.id]: opt })); }} className={`rounded-xl border-2 p-3 text-left text-xs font-extrabold ${examAnswers[soalUjian.id] === opt ? "border-indigo-800 bg-indigo-600 text-white" : "border-slate-200 bg-slate-50"}`}>{opt}</button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button type="button" disabled={examIndex === 0} onClick={() => setExamIndex((i) => Math.max(0, i - 1))} className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold disabled:opacity-40">Sebelumnya</button>
                  {examIndex < examQuestions.length - 1 ? (
                    <button type="button" onClick={() => setExamIndex((i) => i + 1)} className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-black text-white">Berikutnya</button>
                  ) : (
                    <button type="button" onClick={kumpulkanUjian} className="rounded-xl border-b-4 border-amber-600 bg-amber-400 px-7 py-3 text-xs font-black">Kumpulkan ujian</button>
                  )}
                </div>
              </div>
            )}
          </section>
        ) : null}

        {activeCard === 6 ? (
          <section className="space-y-4 rounded-3xl border-2 border-emerald-400 bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-800">Gerbang 2 • skor 0–1.000</span>
                <h2 className="mt-1 text-xl font-black">Kantin sehat: data, luas, dan gizi</h2>
              </div>
              <div className="rounded-xl bg-indigo-950 px-3.5 py-2 text-xs font-black text-amber-300">+50 token</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] md:grid-cols-4">
              {[CHAPTER_COMPETENCY_METADATA, ...completedOtherChapters.slice(0, 3)].map((ch, idx) => (
                <div key={ch.chapterId} className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="font-black uppercase text-indigo-700">{idx + 1}. {ch.subject}</div>
                  <div className="font-extrabold">{ch.chapterTitle}</div>
                </div>
              ))}
            </div>
            <div className="grid items-start gap-5 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase">Porsi makan siang, target 650–750 kkal</p>
                {MENU.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs">
                    <span><strong>{item.name}</strong> <span className="text-slate-500">({item.kcal} kkal, {item.group})</span></span>
                    <span className="flex items-center gap-2">
                      <button type="button" onClick={() => { sfx("pop"); setMenuPortions((p) => ({ ...p, [item.id]: Math.max(0, (p[item.id] || 0) - 1) })); }} className="h-6 w-6 rounded bg-slate-200 font-black">-</button>
                      <span className="w-5 text-center font-black">{menuPortions[item.id] || 0}</span>
                      <button type="button" onClick={() => { sfx("pop"); setMenuPortions((p) => ({ ...p, [item.id]: Math.min(3, (p[item.id] || 0) + 1) })); }} className="h-6 w-6 rounded bg-indigo-600 font-black text-white">+</button>
                    </span>
                  </div>
                ))}
                <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 text-xs">
                  <div className="font-black text-indigo-900">Luas kebun sayur, target 24–36 m²</div>
                  <label className="flex items-center justify-between">Panjang {gardenLengthM} m<input type="range" min={3} max={10} value={gardenLengthM} onChange={(e) => setGardenLengthM(Number(e.target.value))} className="w-28 accent-emerald-600" /></label>
                  <label className="flex items-center justify-between">Lebar {gardenWidthM} m<input type="range" min={3} max={8} value={gardenWidthM} onChange={(e) => setGardenWidthM(Number(e.target.value))} className="w-28 accent-emerald-600" /></label>
                  <div className="font-black text-emerald-700">{gardenLengthM} × {gardenWidthM} = {gardenAreaM2} m²</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-2 rounded-2xl bg-slate-900 p-4 text-white">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={totalCalories >= 650 && totalCalories <= 750 ? "text-emerald-400" : "text-amber-300"}>Total {totalCalories} kkal</span>
                    <span className="flex gap-1">
                      <button type="button" onClick={() => setPracticumChartMode("batang")} className={`rounded px-2 py-0.5 text-[10px] font-black ${practicumChartMode === "batang" ? "bg-amber-400 text-slate-950" : "bg-slate-800"}`}>Batang</button>
                      <button type="button" onClick={() => setPracticumChartMode("piktogram")} className={`rounded px-2 py-0.5 text-[10px] font-black ${practicumChartMode === "piktogram" ? "bg-amber-400 text-slate-950" : "bg-slate-800"}`}>Piktogram</button>
                    </span>
                  </div>
                  {practicumChartMode === "batang" ? MENU.map((item) => {
                    const sub = item.kcal * (menuPortions[item.id] || 0);
                    return (
                      <div key={item.id} className="flex items-center gap-2 text-[10px]">
                        <span className="w-28 truncate">{item.name}</span>
                        <span className="h-3.5 flex-1 overflow-hidden rounded bg-slate-800"><span style={{ width: `${Math.min(100, (sub / 350) * 100)}%` }} className="block h-full bg-emerald-400" /></span>
                        <span className="w-10 text-right">{sub}</span>
                      </div>
                    );
                  }) : (
                    <div className="space-y-1 text-[10px]">
                      <p className="font-bold text-amber-300">1 baterai = 50 kkal</p>
                      {MENU.filter((x) => (menuPortions[x.id] || 0) > 0).map((item) => {
                        const sub = item.kcal * (menuPortions[item.id] || 0);
                        return (
                          <div key={item.id} className="flex justify-between rounded bg-slate-800 px-2 py-1">
                            <span className="w-28 truncate">{item.name}</span>
                            <span>{"🔋".repeat(Math.max(1, Math.round(sub / 50)))}</span>
                            <span>{sub}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <label className="block text-xs font-black">Laporan: sebut kalori, luas, dan alasan gizi</label>
                <textarea value={studentReportText} onChange={(e) => setStudentReportText(e.target.value)} rows={4} placeholder="Total energi makan siang ... kkal. Kebun sayur ... m kali ... m, luas ... m²." className="w-full rounded-xl border-2 border-slate-200 p-3 text-xs outline-none focus:border-indigo-600" />
                <button type="button" onClick={() => void nilaiPraktikum()} className="w-full rounded-2xl border-b-4 border-amber-600 bg-amber-400 py-3 text-xs font-black">Hitung skor karya di perangkat ini</button>
              </div>
            </div>
            {evaluatedRubric ? (
              <div className="space-y-3 rounded-2xl border-2 border-amber-400 bg-indigo-950 p-5 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-black">Skor karya {evaluatedRubric.totalQualityScore} / 1.000</h3>
                  <span className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-black text-slate-950">Token bab {totalTokens} / 150</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
                  <div className="rounded-xl bg-slate-900 p-3">Akurasi {evaluatedRubric.accuracyScore}/300</div>
                  <div className="rounded-xl bg-slate-900 p-3">Sintesis {evaluatedRubric.synthesisScore}/250</div>
                  <div className="rounded-xl bg-slate-900 p-3">Visual {evaluatedRubric.optimizationVisualScore}/200</div>
                  <div className="rounded-xl bg-slate-900 p-3">Laporan {evaluatedRubric.reasoningReportScore}/250</div>
                </div>
                <p className="rounded-xl bg-indigo-900/60 p-3 text-xs">{evaluatedRubric.aiFeedbackSummary}</p>
              </div>
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}
