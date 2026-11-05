"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Nunito } from "next/font/google";
import { pilihSuaraIndonesia } from "@/lib/guru";
import { hentikanAudioGuruAktif } from "@/lib/putar-tts-klien";
import materiBab1 from "@/data/kelas1-bab1.json";
import GambarPensilCerita from "@/components/GambarPensilCerita";
import { bangunTitikAngka, bangunTitikJumlah, coretanMengikutiJejak, LEBAR_KANVAS_JUMLAH, TINGGI_KANVAS_JUMLAH, type Titik } from "@/components/titikAngkaKanvas";

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
  sceneType:
    | "garden-visit"
    | "picking-fruits"
    | "counting-table"
    | "empty-basket"
    | "comparing-scales"
    | "frog-river"
    | "number-tree"
    | "playground-play"
    | "playground-rides"
    | "playground-bikes"
    | "playground-toys";
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
  stories: StorySlideItem[];
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

const DAFTAR_MAINAN = [
  { id: "jungkat", nama: "Jungkat-jungkit", jumlah: 1 },
  { id: "ayunan", nama: "Ayunan", jumlah: 2 },
  { id: "perosotan", nama: "Perosotan", jumlah: 3 },
  { id: "sepeda", nama: "Sepeda", jumlah: 4 },
  { id: "kursi", nama: "Kursi", jumlah: 5 },
  { id: "balon", nama: "Balon", jumlah: 6 },
  { id: "buku", nama: "Buku", jumlah: 7 },
  { id: "layangan", nama: "Layangan", jumlah: 8 },
  { id: "kelereng", nama: "Kelereng", jumlah: 9 },
  { id: "bola", nama: "Bola", jumlah: 10 },
] as const;

const SEBUTAN_ANGKA = [
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
];

const SUARA_KELOMPOK =
  "Kelompok mainan dan jumlahnya. Tekan ikon mainan. Setiap tekan, angkanya naik satu, sampai jumlahnya pas.";

const KARTU_CONCRETE = [
  {
    id: "jungkat",
    nama: "Jungkat-jungkit",
    jumlah: 1,
    suara: "Jungkat-jungkit. Tekan tempat kosong sampai penuh. Hitung mainannya, lalu ucapkan sekali.",
  },
  {
    id: "ayunan",
    nama: "Ayunan",
    jumlah: 2,
    suara: "Ayunan. Tekan tempat kosong sampai penuh. Hitung mainannya, lalu ucapkan sekali.",
  },
  {
    id: "perosotan",
    nama: "Perosotan",
    jumlah: 3,
    suara: "Perosotan. Tekan tempat kosong sampai penuh. Hitung mainannya, lalu ucapkan sekali.",
  },
  {
    id: "sepeda",
    nama: "Sepeda",
    jumlah: 4,
    suara: "Sepeda. Tekan tempat kosong sampai penuh. Hitung mainannya, lalu ucapkan sekali.",
  },
] as const;

const KEGIATAN_CONCRETE = [
  { id: "bilang", nama: "Membilang" },
  { id: "pasang", nama: "Memasangkan" },
  { id: "banding", nama: "Membandingkan" },
  { id: "urut", nama: "Mengurutkan" },
  { id: "cerita", nama: "Cerita" },
  { id: "tulis", nama: "Menulis" },
] as const;

function jumlahMainan(id: (typeof KARTU_CONCRETE)[number]["id"]) {
  return KARTU_CONCRETE.find((kartu) => kartu.id === id)!.jumlah;
}

const PILIHAN_PASANG = [jumlahMainan("sepeda"), jumlahMainan("perosotan"), jumlahMainan("ayunan")] as const;
const PASANG_TARGET = jumlahMainan("perosotan");
const BANDING_PASANGAN = [
  { id: "kiri", jumlah: jumlahMainan("sepeda") },
  { id: "kanan", jumlah: jumlahMainan("ayunan") },
] as const;
const URUTAN_BENAR = [...KARTU_CONCRETE].sort((a, b) => a.jumlah - b.jumlah).map((kartu) => kartu.id);
const URUTAN_AWAL = ["sepeda", "ayunan", "jungkat", "perosotan"] as const;
const CERITA_JUNGKAT = jumlahMainan("jungkat");
const CERITA_AYUNAN = jumlahMainan("ayunan");
const CERITA_JUMLAH = CERITA_JUNGKAT + CERITA_AYUNAN;
const TULIS_MAINAN = KARTU_CONCRETE.find((kartu) => kartu.id === "sepeda")!;

const SUARA_PASANG = "Lihat perosotan di atas. Tekan kelompok yang sama banyak.";
const SUARA_BANDING = "Lihat dua kelompok perosotan. Tekan yang lebih banyak.";
const SUARA_URUT = "Susun kelompok dari yang paling sedikit sampai paling banyak.";
const SUARA_CERITA =
  "Di taman ada jungkat-jungkit. Tekan tombol supaya ayunan datang. Hitung semuanya, lalu ucapkan sekali.";
const SUARA_TULIS = "Lihat sepedanya. Hitung, lalu tulis angka di atas dan kata di bawah.";

const KARTU_GAMBAR = [
  {
    id: "kursi",
    nama: "Kursi",
    jumlah: 5,
    suara: "Kursi. Tekan diagram sampai kotaknya pas. Lalu tulis, dan jawab dengan suara satu kali.",
  },
  {
    id: "balon",
    nama: "Balon",
    jumlah: 6,
    suara: "Balon. Tekan diagram sampai lingkarannya pas. Lalu tulis, dan jawab dengan suara satu kali.",
  },
  {
    id: "buku",
    nama: "Buku",
    jumlah: 7,
    suara: "Buku. Tekan diagram sampai halamannya pas. Lalu tulis, dan jawab dengan suara satu kali.",
  },
] as const;

const KARTU_LAMBANG = [
  {
    id: "layangan",
    nama: "Layangan",
    jumlah: 8,
    suara: "Layangan. Geser manik di rak sampai barisnya penuh. Lalu tulis lambangnya, dan ucapkan sekali.",
  },
  {
    id: "kelereng",
    nama: "Kelereng",
    jumlah: 9,
    suara: "Kelereng. Geser manik di rak sampai barisnya penuh. Lalu tulis lambangnya, dan ucapkan sekali.",
  },
  {
    id: "bola",
    nama: "Bola",
    jumlah: 10,
    suara: "Bola. Geser manik di rak sampai barisnya penuh. Lalu tulis lambangnya, dan ucapkan sekali.",
  },
] as const;

const ALIAS_BILANGAN = [
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
  "sepuluh",
];

function jarakHuruf(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 1) return 2;
  const baris = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) baris[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let sebelumnya = baris[0];
    baris[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const simpan = baris[j];
      const biaya = a[i - 1] === b[j - 1] ? 0 : 1;
      baris[j] = Math.min(baris[j] + 1, baris[j - 1] + 1, sebelumnya + biaya);
      sebelumnya = simpan;
    }
  }
  return baris[b.length];
}

function ucapanMemuatBilangan(teks: string, jumlah: number): boolean {
  const kata = ALIAS_BILANGAN[jumlah - 1];
  if (!kata) return false;
  const bersih = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (!bersih) return false;
  const token = bersih
    .split(/\s+/)
    .filter(Boolean)
    .map((bagian) => bagian.replace(/(.)\1{2,}/g, "$1"));
  const angka = String(jumlah);
  const inggris = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][jumlah - 1];
  const dekat = jumlah === 6 ? ["anang", "enang"] : [];
  if (token.some((bagian) => bagian === kata || bagian === angka || bagian === inggris || dekat.includes(bagian))) return true;
  if (bersih.replace(/ /g, "").includes(kata)) return true;
  return token.some((bagian) => bagian.length >= 3 && jarakHuruf(bagian, kata) <= 1);
}

type PotongUcapan = {
  isFinal?: boolean;
  length: number;
  [index: number]: { transcript?: string };
};

type MesinDengar = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<PotongUcapan> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};


const PRACTICE_QUESTIONS = materiBab1.practiceQuestions as QuestionItem[];
const FORMAL_EXAM_QUESTIONS = materiBab1.examQuestions as QuestionItem[];

// ============================================================================
// SUB-KOMPONEN KANVAS TULIS ANGKA (TITIK-TITIK BENTUK HURUF)
// ============================================================================

function GambarDiagram({ jenis }: { jenis: string }) {
  if (jenis === "balon") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="9" r="5.5" fill="#3B82F6" stroke="#1C01A5" strokeWidth="1.6" />
        <path d="M12 14.5 V21" stroke="#1C01A5" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (jenis === "buku") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <rect x="3.5" y="5" width="8" height="14" rx="1" fill="#7FCB96" stroke="#1C01A5" strokeWidth="1.6" />
        <rect x="12.5" y="5" width="8" height="14" rx="1" fill="#F0AB00" stroke="#1C01A5" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M7 7 V15 H18" fill="none" stroke="#1C01A5" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 15 H19" stroke="#F0AB00" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 15 V20 M16 15 V20" stroke="#1C01A5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DiagramMainan({ jenis, terisi, kapasitas }: { jenis: string; terisi: number; kapasitas: number }) {
  const kolom = kapasitas === 6 ? 3 : kapasitas === 7 ? 4 : 5;
  return (
    <div className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))` }}>
      {Array.from({ length: kapasitas }, (_, i) => (
        <span
          key={i}
          className={`flex aspect-square items-center justify-center rounded-md border ${
            i < terisi ? "border-[#1C01A5] bg-white" : "border-dashed border-[#F0AB00] bg-[#FFFBEB]"
          }`}
        >
          {i < terisi ? <GambarDiagram jenis={jenis} /> : null}
        </span>
      ))}
    </div>
  );
}

function RakBendaNyata({
  jenis,
  terisi,
  kapasitas,
  rapat = false,
}: {
  jenis: string;
  terisi: number;
  kapasitas: number;
  rapat?: boolean;
}) {
  const kolom = rapat ? (kapasitas <= 2 ? kapasitas : 2) : kapasitas <= 3 ? kapasitas : 2;
  return (
    <div
      className={`mx-auto grid w-full ${rapat ? "gap-1" : "gap-2"}`}
      style={{
        gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))`,
        maxWidth: rapat ? (kapasitas === 1 ? 52 : 148) : kapasitas === 1 ? 112 : 280,
      }}
    >
      {Array.from({ length: kapasitas }, (_, i) => (
        <span
          key={i}
          className={`flex items-center justify-center border-2 ${
            rapat ? "h-9 rounded-xl" : "aspect-square rounded-2xl"
          } ${i < terisi ? "border-[#1C01A5] bg-white" : "border-dashed border-[#93C5FD] bg-white"}`}
        >
          {i < terisi ? <IkonMainan jenis={jenis} besar={!rapat} /> : null}
        </span>
      ))}
    </div>
  );
}

function KepalaConcrete({ judul, onSuara }: { judul: string; onSuara: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">{judul}</h3>
      <button
        type="button"
        onClick={onSuara}
        className="shrink-0 rounded-xl border border-[#3B82F6] bg-white px-3 py-1 text-xs font-black text-[#1E3A8A]"
      >
        🔊 Suara Guru
      </button>
    </div>
  );
}

function TombolLanjutConcrete({ pictorial, onClick }: { pictorial: boolean; onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md"
      >
        {pictorial ? "LANJUTKAN KE PICTORIAL ⬇️" : "LANJUTKAN ⬇️"}
      </button>
    </div>
  );
}

function TombolJawabanSuara({
  sudah,
  jumlah,
  kata,
  sedang,
  pesan,
  onTekan,
}: {
  sudah: boolean;
  jumlah: number;
  kata: string;
  sedang: boolean;
  pesan: string;
  onTekan: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={sudah ? `${jumlah} ${kata}` : "Jawab dengan suara"}
      onClick={() => {
        if (sudah) return;
        onTekan();
      }}
      className={`flex min-h-16 w-full min-w-0 flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-1 ${
        sudah ? "border-solid border-[#1C01A5]" : sedang ? "border-solid border-[#F0AB00]" : "border-dashed border-[#93C5FD]"
      }`}
    >
      {sudah ? (
        <>
          <span className="text-3xl font-black leading-none text-[#1C01A5]">{jumlah}</span>
          <span className="text-sm font-black leading-tight text-[#1C01A5]">{kata}</span>
        </>
      ) : (
        <span className="text-center text-sm font-black leading-tight text-[#1C01A5]">
          {sedang ? (pesan.startsWith("Memeriksa") ? "Memeriksa..." : "Mendengarkan...") : "Jawab dengan suara"}
        </span>
      )}
    </button>
  );
}

function RakManik({ terisi, kapasitas }: { terisi: number; kapasitas: number }) {
  const atas = Math.min(5, kapasitas);
  const bawah = Math.max(0, kapasitas - 5);
  const baris = (mulai: number, jumlah: number) => (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: jumlah }, (_, i) => {
        const isi = mulai + i < terisi;
        return (
          <span
            key={mulai + i}
            className={`h-7 w-7 rounded-full border-2 ${
              isi ? "border-[#1C01A5] bg-[#F0AB00]" : "border-dashed border-[#F0AB00] bg-white"
            }`}
          />
        );
      })}
    </div>
  );
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-[#1C01A5] bg-white px-2 py-3">
      {baris(0, atas)}
      {bawah > 0 ? baris(atas, bawah) : null}
    </div>
  );
}

function IkonMainan({ jenis, besar = false }: { jenis: string; besar?: boolean }) {
  const garis = {
    fill: "none",
    stroke: "#1C01A5",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" className={besar ? "h-14 w-14 shrink-0" : "h-8 w-8 shrink-0"} aria-hidden="true">
      {jenis === "jungkat" && (
        <>
          <path d="M24 32 L17 44 H31 Z" {...garis} fill="#F0AB00" />
          <path d="M5 31 L43 15" {...garis} strokeWidth={3} />
          <circle cx="9" cy="28" r="3.2" {...garis} fill="#E98989" />
          <circle cx="39" cy="17" r="3.2" {...garis} fill="#7FCB96" />
        </>
      )}
      {jenis === "ayunan" && (
        <>
          <path d="M10 8 H38" {...garis} />
          <path d="M16 8 L14 32" {...garis} />
          <path d="M32 8 L34 32" {...garis} />
          <path d="M12 32 H36" {...garis} strokeWidth={3} />
          <rect x="14" y="32" width="20" height="6" rx="2" {...garis} fill="#F0AB00" />
        </>
      )}
      {jenis === "perosotan" && (
        <>
          <path d="M8 8 V42 M16 8 V26 M8 16 H16 M8 24 H16" {...garis} />
          <path d="M16 12 H28 C38 12 40 24 40 42" stroke="#F0AB00" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M16 12 H28 C38 12 40 24 40 42" {...garis} />
        </>
      )}
      {jenis === "sepeda" && (
        <>
          <circle cx="14" cy="32" r="8" {...garis} />
          <circle cx="34" cy="32" r="8" {...garis} />
          <path d="M14 32 L22 16 H32 L34 32 L22 32 Z" {...garis} />
          <circle cx="22" cy="16" r="2.2" fill="#1C01A5" />
        </>
      )}
      {jenis === "kursi" && (
        <>
          <path d="M12 10 V28 H36" {...garis} />
          <path d="M14 28 V42 M34 28 V42" {...garis} />
          <path d="M10 28 H38" {...garis} strokeWidth={4} />
        </>
      )}
      {jenis === "balon" && (
        <>
          <ellipse cx="24" cy="18" rx="11" ry="13" {...garis} fill="#E98989" />
          <path d="M24 31 L21 36 H27 Z" fill="#1C01A5" />
          <path d="M24 36 Q18 42 26 46" {...garis} />
        </>
      )}
      {jenis === "buku" && (
        <>
          <path d="M8 10 H24 V40 H8 Z" {...garis} fill="#7FCB96" />
          <path d="M24 10 H40 V40 H24 Z" {...garis} fill="#F0AB00" />
          <path d="M24 10 V40" {...garis} />
        </>
      )}
      {jenis === "layangan" && (
        <>
          <polygon points="24,4 42,24 24,42 6,24" {...garis} fill="#E98989" />
          <path d="M24 4 V42 M6 24 H42" {...garis} />
          <path d="M24 42 Q30 46 22 48" {...garis} />
        </>
      )}
      {jenis === "kelereng" && (
        <>
          <circle cx="24" cy="24" r="13" {...garis} fill="#7FCB96" />
          <ellipse cx="19" cy="19" rx="4" ry="2.2" fill="#FFFFFF" />
        </>
      )}
      {jenis === "bola" && (
        <>
          <circle cx="24" cy="24" r="14" {...garis} fill="#F0AB00" />
          <path d="M10 24 H38 M24 10 C16 18 16 30 24 38 M24 10 C32 18 32 30 24 38" {...garis} />
        </>
      )}
    </svg>
  );
}

function DottedNumberTracingCanvas({
  digit,
  kata,
  onCompletedTrace,
}: {
  digit: number;
  kata?: string;
  onCompletedTrace?: () => void;
}) {
  const lebar = kata ? LEBAR_KANVAS_JUMLAH : 170;
  const tinggi = kata ? TINGGI_KANVAS_JUMLAH : 150;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const goresanRef = useRef<Titik[][]>([]);
  const jejakRef = useRef<Titik[][]>([]);
  const sedangRef = useRef(false);
  const [lulus, setLulus] = useState(false);
  const [pernahCoba, setPernahCoba] = useState(false);

  const gambarUlang = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#64748B";
    for (const gores of jejakRef.current) {
      for (const titik of gores) {
        ctx.beginPath();
        ctx.arc(titik.x, titik.y, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const gores of goresanRef.current) {
      if (gores.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(gores[0].x, gores[0].y);
      for (let i = 1; i < gores.length; i++) ctx.lineTo(gores[i].x, gores[i].y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    let batal = false;
    goresanRef.current = [];
    jejakRef.current = [];
    sedangRef.current = false;
    setLulus(false);
    setPernahCoba(false);
    gambarUlang();
    const siapkan = async () => {
      try {
        await document.fonts.load(`900 120px ${fontAnak.style.fontFamily}`);
      } catch {
        /* Huruf cadangan tetap bisa dijadikan titik. */
      }
      if (batal) return;
      jejakRef.current = kata
        ? bangunTitikJumlah(digit, kata, fontAnak.style.fontFamily)
        : bangunTitikAngka(digit, fontAnak.style.fontFamily);
      gambarUlang();
    };
    void siapkan();
    return () => {
      batal = true;
    };
  }, [digit, kata, gambarUlang]);

  const koordinat = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const mulai = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const titik = koordinat(e);
    sedangRef.current = true;
    goresanRef.current.push([titik]);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* Browser menolak tangkapan jika jari sudah lepas. */
    }
    gambarUlang();
  };

  const geser = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sedangRef.current) return;
    const gores = goresanRef.current[goresanRef.current.length - 1];
    if (!gores) return;
    gores.push(koordinat(e));
    gambarUlang();
  };

  const selesai = () => {
    if (!sedangRef.current) return;
    sedangRef.current = false;
    const adaGoresan = goresanRef.current.some((gores) => gores.length > 1);
    if (!adaGoresan) return;
    setPernahCoba(true);
    const mirip = coretanMengikutiJejak(goresanRef.current, jejakRef.current);
    setLulus(mirip);
    if (mirip && onCompletedTrace) onCompletedTrace();
  };

  const ulangi = () => {
    goresanRef.current = [];
    sedangRef.current = false;
    setLulus(false);
    setPernahCoba(false);
    gambarUlang();
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${kata ? "w-full" : ""}`}>
      <canvas
        ref={canvasRef}
        width={lebar}
        height={tinggi}
        onPointerDown={mulai}
        onPointerMove={geser}
        onPointerUp={selesai}
        onPointerCancel={selesai}
        style={kata ? { aspectRatio: `${lebar} / ${tinggi}` } : undefined}
        className={
          kata
            ? "h-auto w-full max-w-[340px] rounded-2xl border-2 border-[#1C01A5] bg-white cursor-crosshair touch-none shadow-sm"
            : "w-[170px] h-[150px] rounded-2xl border-2 border-[#1C01A5] bg-white cursor-crosshair touch-none shadow-sm"
        }
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={ulangi}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#334155] text-xs font-bold border border-slate-300"
        >
          Ulangi Tulis
        </button>
        <span className="text-xs font-bold text-[#1C01A5]">
          {lulus ? "✅ Bagus!" : pernahCoba ? "Belum mirip" : "Ikuti titik-titik"}
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
  const [angkaMainan, setAngkaMainan] = useState<Record<string, number>>({});
  const angkaMainanRef = useRef<Record<string, number>>({});
  const [unlockedSmicpaStage, setUnlockedSmicpaStage] = useState<number>(6); // 1=Story .. 6=Abstract; semua tahap terbuka
  const [concreteCounter, setConcreteCounter] = useState<number>(3);

  // Ref untuk auto-scroll mulus saat tombol floating-end LANJUTKAN diklik
  const tabUtamaRef = useRef<HTMLDivElement | null>(null);
  const [batasTabSubBab, setBatasTabSubBab] = useState(74);
  const mindMapRef = useRef<HTMLDivElement | null>(null);
  const infografisRef = useRef<HTMLDivElement | null>(null);
  const concreteRef = useRef<HTMLDivElement | null>(null);
  const pictorialRef = useRef<HTMLDivElement | null>(null);
  const abstractRef = useRef<HTMLDivElement | null>(null);

  const tekanMainan = useCallback((id: string, target: number) => {
    const sekarang = angkaMainanRef.current[id] ?? 0;
    if (sekarang >= target) return sekarang;
    const berikut = sekarang + 1;
    angkaMainanRef.current[id] = berikut;
    setAngkaMainan((prev) => ({ ...prev, [id]: berikut }));
    return berikut;
  }, []);

  const [sentuhNyata, setSentuhNyata] = useState<Record<string, number>>({});
  const sentuhNyataRef = useRef<Record<string, number>>({});
  const [indeksKegiatan, setIndeksKegiatan] = useState(0);
  const [pasangBenar, setPasangBenar] = useState(false);
  const [pesanPasang, setPesanPasang] = useState("");
  const [bandingBenar, setBandingBenar] = useState(false);
  const [pesanBanding, setPesanBanding] = useState("");
  const [urutPilih, setUrutPilih] = useState<string[]>([]);
  const [pesanUrut, setPesanUrut] = useState("");
  const [ceritaDatang, setCeritaDatang] = useState(false);
  const [tulisConcrete, setTulisConcrete] = useState<Record<string, boolean>>({});
  const [suaraConcrete, setSuaraConcrete] = useState<Record<string, boolean>>({});
  const [rekamConcrete, setRekamConcrete] = useState(false);
  const [pesanConcrete, setPesanConcrete] = useState("");
  const mesinDengarRef = useRef<MesinDengar | null>(null);
  const giliranRekam = useRef(0);
  const giliranSuara = useRef(0);
  const sibukRekamRef = useRef(false);
  const [hitungGambar, setHitungGambar] = useState<Record<string, number>>({});
  const hitungGambarRef = useRef<Record<string, number>>({});
  const [indeksGambar, setIndeksGambar] = useState(0);
  const [tulisGambar, setTulisGambar] = useState<Record<string, boolean>>({});
  const [suaraGambar, setSuaraGambar] = useState<Record<string, boolean>>({});
  const [rekamGambar, setRekamGambar] = useState(false);
  const [pesanGambar, setPesanGambar] = useState("");
  const [hitungLambang, setHitungLambang] = useState<Record<string, number>>({});
  const hitungLambangRef = useRef<Record<string, number>>({});
  const [indeksLambang, setIndeksLambang] = useState(0);
  const [tulisLambang, setTulisLambang] = useState<Record<string, boolean>>({});
  const [suaraLambang, setSuaraLambang] = useState<Record<string, boolean>>({});
  const [rekamLambang, setRekamLambang] = useState(false);
  const [pesanLambang, setPesanLambang] = useState("");
  const selesaiBabRef = useRef<HTMLDivElement | null>(null);

  const sentuhBendaNyata = useCallback((id: string, target: number) => {
    const sekarang = sentuhNyataRef.current[id] ?? 0;
    if (sekarang >= target) return sekarang;
    const berikut = sekarang + 1;
    sentuhNyataRef.current[id] = berikut;
    setSentuhNyata((prev) => ({ ...prev, [id]: berikut }));
    return berikut;
  }, []);

  const tambahDiagram = useCallback((id: string, target: number) => {
    const sekarang = hitungGambarRef.current[id] ?? 0;
    if (sekarang >= target) return sekarang;
    const berikut = sekarang + 1;
    hitungGambarRef.current[id] = berikut;
    setHitungGambar((prev) => ({ ...prev, [id]: berikut }));
    return berikut;
  }, []);

  const geserManik = useCallback((id: string, target: number) => {
    const sekarang = hitungLambangRef.current[id] ?? 0;
    if (sekarang >= target) return sekarang;
    const berikut = sekarang + 1;
    hitungLambangRef.current[id] = berikut;
    setHitungLambang((prev) => ({ ...prev, [id]: berikut }));
    return berikut;
  }, []);

  const hentikanRekamConcrete = useCallback(() => {
    giliranRekam.current += 1;
    sibukRekamRef.current = false;
    const mesin = mesinDengarRef.current;
    mesinDengarRef.current = null;
    try {
      mesin?.abort();
    } catch {
      /* Mesin sudah berhenti. */
    }
    setRekamConcrete(false);
    setRekamGambar(false);
    setRekamLambang(false);
  }, []);

  const mulaiRekamConcrete = useCallback((id: string, jumlah: number, panel: "concrete" | "gambar" | "lambang" = "concrete") => {
    if (sibukRekamRef.current) {
      hentikanRekamConcrete();
      return;
    }
    const giliran = ++giliranRekam.current;
    giliranSuara.current += 1;
    const masih = () => giliran === giliranRekam.current;
    const keGambar = panel === "gambar";
    const keLambang = panel === "lambang";
    const taruhPesan = keLambang ? setPesanLambang : keGambar ? setPesanGambar : setPesanConcrete;
    const taruhRekam = keLambang ? setRekamLambang : keGambar ? setRekamGambar : setRekamConcrete;
    const taruhSuara = keLambang ? setSuaraLambang : keGambar ? setSuaraGambar : setSuaraConcrete;
    const win = window as Window & {
      SpeechRecognition?: new () => MesinDengar;
      webkitSpeechRecognition?: new () => MesinDengar;
    };
    const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!Konstruktor) {
      taruhPesan("Gunakan Chrome supaya suaranya terdengar.");
      return;
    }
    sibukRekamRef.current = true;
    taruhPesan("");
    setRekamConcrete(panel === "concrete");
    setRekamGambar(panel === "gambar");
    setRekamLambang(panel === "lambang");
    let diterima = false;
    let ditutup = false;
    let adaTeks = false;
    const selesai = (pesan: string) => {
      if (ditutup || diterima || !masih()) return;
      ditutup = true;
      mesinDengarRef.current = null;
      sibukRekamRef.current = false;
      taruhRekam(false);
      taruhPesan(pesan);
    };
    const terima = () => {
      if (diterima || !masih()) return;
      diterima = true;
      try {
        mesinDengarRef.current?.stop();
      } catch {
        /* Mesin sudah berhenti. */
      }
      mesinDengarRef.current = null;
      sibukRekamRef.current = false;
      taruhSuara((prev) => ({ ...prev, [id]: true }));
      taruhPesan("");
      taruhRekam(false);
    };
    try {
      const mesin = new Konstruktor();
      mesin.lang = "id-ID";
      mesin.continuous = false;
      mesin.interimResults = true;
      mesin.maxAlternatives = 5;
      mesin.onresult = (peristiwa) => {
        if (!masih() || diterima) return;
        const bagian: string[] = [];
        for (let i = 0; i < peristiwa.results.length; i++) {
          const alternatif = peristiwa.results[i];
          const batas = Math.min(alternatif?.length ?? 0, 5);
          for (let j = 0; j < batas; j++) {
            const potong = alternatif[j]?.transcript;
            if (potong) bagian.push(potong);
          }
        }
        const gabung = bagian.join(" ");
        if (gabung.trim()) adaTeks = true;
        if (ucapanMemuatBilangan(gabung, jumlah)) terima();
      };
      mesin.onerror = (peristiwa) => {
        if (!masih() || diterima || peristiwa.error === "aborted") return;
        if (peristiwa.error === "not-allowed" || peristiwa.error === "service-not-allowed") {
          selesai("Izinkan mikrofon, lalu tekan lagi.");
          return;
        }
        if (peristiwa.error === "no-speech") {
          selesai("Belum terdengar. Ucapkan jumlahnya satu kali.");
          return;
        }
        selesai("Coba ucapkan sekali lagi.");
      };
      mesin.onend = () => {
        selesai(adaTeks ? "Coba ucapkan sekali lagi." : "Belum terdengar. Ucapkan jumlahnya satu kali.");
      };
      mesinDengarRef.current = mesin;
      const nyalakan = () => {
        if (!masih() || diterima) return;
        try {
          mesin.start();
        } catch {
          selesai("Coba ucapkan sekali lagi.");
        }
      };
      if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
        window.speechSynthesis.cancel();
        window.setTimeout(nyalakan, 80);
      } else {
        nyalakan();
      }
    } catch {
      selesai("Coba ucapkan sekali lagi.");
    }
  }, [hentikanRekamConcrete]);

  useEffect(() => {
    return () => {
      giliranRekam.current += 1;
      try {
        mesinDengarRef.current?.abort();
      } catch {
        /* Mesin sudah berhenti. */
      }
      mesinDengarRef.current = null;
    };
  }, []);

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
  // SUARA GURU IGIL — Web Speech API di peramban, tanpa API eksternal
  // ============================================================================

  const lepasJedaCerita = useRef<(() => void) | null>(null);

  const speakGuru = useCallback((text: string, selesai?: () => void) => {
    const naskah = text.replace(/\s+/g, " ").trim();
    if (!naskah || typeof window === "undefined") return;
    if (selesai) {
      lepasJedaCerita.current = selesai;
    } else {
      lepasJedaCerita.current?.();
      lepasJedaCerita.current = null;
    }
    const giliran = ++giliranSuara.current;
    const tutup = () => {
      if (giliran !== giliranSuara.current) return;
      if (lepasJedaCerita.current !== selesai) return;
      selesai?.();
      lepasJedaCerita.current = null;
    };
    hentikanAudioGuruAktif();
    if (!("speechSynthesis" in window)) {
      tutup();
      return;
    }
    const ucapan = new SpeechSynthesisUtterance(naskah);
    ucapan.lang = "id-ID";
    ucapan.rate = 0.95;
    ucapan.pitch = 1.12;
    const suara = pilihSuaraIndonesia("wanita");
    if (suara) ucapan.voice = suara;
    ucapan.onend = selesai ? tutup : null;
    ucapan.onerror = selesai ? tutup : null;
    window.setTimeout(() => {
      if (giliran !== giliranSuara.current) return;
      window.speechSynthesis.speak(ucapan);
    }, 40);
  }, []);

  useEffect(() => {
    window.speechSynthesis?.getVoices();
    return () => {
      hentikanAudioGuruAktif();
    };
  }, []);

  useEffect(() => {
    const el = tabUtamaRef.current;
    if (!el) return;
    const ukur = () => {
      const atas = Number.parseFloat(getComputedStyle(el).top);
      setBatasTabSubBab((Number.isFinite(atas) ? atas : 0) + el.offsetHeight);
    };
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(el);
    return () => pengamat.disconnect();
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  // ============================================================================
  // RENDER 2: HALAMAN UTAMA MODUL (SELEBAR MONITOR • DASAR PUTIH)
  // ============================================================================

  const currentSubContent = SUB_BABS[activeSubBab];
  const judulSubBab = currentSubContent.fullTitle.split(": ").slice(1).join(": ");

  return (
    <div className={`min-h-screen w-full bg-white text-[#334155] pb-16 ${fontAnak.className}`}>
      {/* =================================================================== */}
      {/* BANNER #1C01A5 TANPA DEGRADASI HAMPIR SELEBAR LAYAR MONITOR         */}
      {/* =================================================================== */}
      <div className="w-full pt-2 px-1 md:px-3 bg-white">
        <header className="w-[99%] mx-auto bg-[#1C01A5] rounded-none px-4 py-4 md:px-7 md:py-5 shadow-md overflow-x-auto">
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
      <div ref={tabUtamaRef} className="sticky top-2 z-40 w-[99%] mx-auto px-1 md:px-3 mt-3">
        <nav className="w-full bg-[#1C01A5] rounded-none p-2 shadow-lg overflow-x-auto">
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
          {/* Tab sub-bab dan judul menempel di bawah tab utama */}
          <div
            className="sticky z-30 border-b border-slate-200 bg-white/95 py-2 backdrop-blur"
            style={{ top: batasTabSubBab }}
          >
            <div className="overflow-x-auto py-3">
              <div className="flex flex-nowrap items-center gap-2.5 min-w-max px-3">
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

            <h2 className="pt-3 text-xl font-black text-[#1C01A5] md:text-2xl">
              {judulSubBab}
            </h2>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 1: STORY (3 GAMBAR DOODLE BERWARNA • TANPA TEKS) */}
          {/* --------------------------------------------------------------- */}
          <div className="space-y-3 border-b-2 border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-black text-xs">
                Tahap 1: Story
              </span>
            </div>

            <div className="w-full overflow-x-auto pb-3">
              <div
                className="flex flex-nowrap gap-5"
                style={{ minWidth: currentSubContent.stories.length * 320 }}
              >
                {currentSubContent.stories.map((st, idx) => (
                  <div
                    key={st.id}
                    className="w-[300px] bg-[#FFFDF9] border-2 border-[#EF4444] rounded-3xl p-4 space-y-3 shrink-0 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#1C01A5]">
                        Slide Cerita {idx + 1} / {currentSubContent.stories.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakGuru(st.voiceNarration)}
                        className="px-4 py-2 rounded-xl bg-[#1C01A5] text-[#FFE566] font-black text-xs flex items-center gap-1.5 shadow"
                      >
                        🔊 Suara Guru
                      </button>
                    </div>

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
                  Tahap 2: Mind-Map
                </span>
              </div>

              <div className="flex flex-col">
                {currentSubContent.mindMaps.map((mm) => (
                  <div
                    key={mm.stepNumber}
                    className={`igil-kartu-lancip w-full px-5 pb-14 ${
                      mm.stepNumber === 1 ? "igil-kartu-awal pt-5" : "pt-12"
                    }`}
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
                    <h3 className="mt-3 text-base font-black text-[#1C01A5]">{mm.stepTitle}</h3>
                  </div>
                ))}
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
                  Tahap 3: Infografis
                </span>
              </div>

              {activeSubBab === "A" ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-[#F0FDF4] border-2 border-[#22C55E] rounded-3xl p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">
                        Kelompok mainan dan Jumlahnya
                      </h3>
                      <button
                        type="button"
                        onClick={() => speakGuru(SUARA_KELOMPOK)}
                        className="px-3 py-1 rounded-xl bg-white text-[#166534] border border-[#22C55E] text-xs font-black shrink-0"
                      >
                        🔊 Suara Guru
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center text-xs font-black tracking-wide text-[#166534]">MAINAN</div>
                      <div className="text-center text-xs font-black tracking-wide text-[#166534]">JUMLAH</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {DAFTAR_MAINAN.map((item) => {
                        const angka = angkaMainan[item.id] ?? 0;
                        const terbuka = angka > 0;
                        const kata = SEBUTAN_ANGKA[angka - 1] ?? String(angka);
                        return (
                          <div key={item.id} className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              aria-label={item.nama}
                              aria-pressed={terbuka}
                              onClick={() => {
                                const sebelumnya = angkaMainanRef.current[item.id] ?? 0;
                                const angka = tekanMainan(item.id, item.jumlah);
                                if (angka > sebelumnya) {
                                  speakGuru(SEBUTAN_ANGKA[angka - 1] ?? String(angka));
                                }
                              }}
                              className={`flex min-w-0 items-center gap-2 rounded-2xl border-2 bg-white px-2 py-2 text-left ${
                                terbuka ? "border-[#1C01A5]" : "border-[#86EFAC]"
                              }`}
                            >
                              <IkonMainan jenis={item.id} />
                              <span className="min-w-0 text-[11px] font-black leading-tight text-[#1C01A5]">
                                {item.nama}
                              </span>
                            </button>
                            <div
                              className={`flex min-h-14 min-w-0 flex-col items-center justify-center rounded-2xl border-2 bg-white py-1 ${
                                terbuka ? "border-solid border-[#1C01A5]" : "border-dashed border-[#86EFAC]"
                              }`}
                            >
                              {terbuka ? (
                                <>
                                  <span className="text-3xl font-black leading-none text-[#1C01A5]">{angka}</span>
                                  <span className="text-sm font-black leading-tight text-[#1C01A5]">{kata}</span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
              <div className="w-full overflow-x-auto pb-3">
                <div className="flex flex-nowrap gap-5 min-w-[1050px]">
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
              )}

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
                  Tahap 4: Concrete
                </span>
              </div>

              {activeSubBab === "A" ? (
                <div className="rounded-3xl border-2 border-[#3B82F6] bg-[#EFF6FF] p-4 space-y-3">
                  {(() => {
                    const kegiatan = KEGIATAN_CONCRETE[indeksKegiatan];
                    const pictorial = indeksKegiatan >= KEGIATAN_CONCRETE.length - 1;
                    const lanjut = () => {
                      hentikanRekamConcrete();
                      setPesanConcrete("");
                      if (!pictorial) {
                        setIndeksKegiatan((urut) => urut + 1);
                        concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        return;
                      }
                      handleUnlockNextSmicpa(
                        5,
                        pictorialRef,
                        "Enam kegiatan benda nyata sudah siap. Sekarang kita lihat gambarnya."
                      );
                    };
                    const nomor = `Kegiatan ${indeksKegiatan + 1} dari ${KEGIATAN_CONCRETE.length}.`;
                    if (kegiatan.id === "bilang") {
                      const kartu = TULIS_MAINAN;
                      const hitung = sentuhNyata[kartu.id] ?? 0;
                      const suara = suaraConcrete[kartu.id] === true;
                      return (
                        <>
                          <KepalaConcrete judul="Membilang" onSuara={() => speakGuru(kartu.suara)} />
                          <p className="text-xs font-bold text-[#1E3A8A]">
                            {nomor} {kartu.nama}.{" "}
                            {suara
                              ? "Jumlahnya sudah diucapkan."
                              : hitung >= kartu.jumlah
                                ? "Tempatnya penuh. Hitung mainannya, lalu ucapkan sekali."
                                : "Tekan tempat kosong. Setiap tekan, mainan baru muncul."}
                          </p>
                          <button
                            type="button"
                            aria-label={hitung >= kartu.jumlah ? `${kartu.nama} sudah penuh` : `Tambah ${kartu.nama}`}
                            aria-pressed={hitung >= kartu.jumlah}
                            onClick={() => sentuhBendaNyata(kartu.id, kartu.jumlah)}
                            className="w-full rounded-2xl border-2 border-[#93C5FD] bg-white px-3 py-3"
                          >
                            <RakBendaNyata jenis={kartu.id} terisi={hitung} kapasitas={kartu.jumlah} />
                          </button>
                          <TombolJawabanSuara
                            sudah={suara}
                            jumlah={kartu.jumlah}
                            kata={SEBUTAN_ANGKA[kartu.jumlah - 1]}
                            sedang={rekamConcrete}
                            pesan={pesanConcrete}
                            onTekan={() => mulaiRekamConcrete(kartu.id, kartu.jumlah)}
                          />
                          {pesanConcrete ? (
                            <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanConcrete}</p>
                          ) : null}
                          <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
                        </>
                      );
                    }
                    if (kegiatan.id === "pasang") {
                      return (
                        <>
                          <KepalaConcrete judul={kegiatan.nama} onSuara={() => speakGuru(SUARA_PASANG)} />
                          <p className="text-xs font-bold text-[#1E3A8A]">
                            {nomor} {pasangBenar ? "Kelompoknya sama banyak." : "Tekan kelompok yang sama banyak."}
                          </p>
                          <div className="rounded-2xl border-2 border-[#1C01A5] bg-white px-3 py-3">
                            <p className="mb-2 text-center text-xs font-black text-[#1E3A8A]">Perosotan</p>
                            <RakBendaNyata jenis="perosotan" terisi={PASANG_TARGET} kapasitas={PASANG_TARGET} rapat />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {PILIHAN_PASANG.map((jumlah, urut) => {
                              const pas = pasangBenar && jumlah === PASANG_TARGET;
                              return (
                                <button
                                  key={`${jumlah}-${urut}`}
                                  type="button"
                                  aria-label={`Pilihan kelompok ${urut + 1}`}
                                  aria-pressed={pas}
                                  onClick={() => {
                                    if (pasangBenar) return;
                                    if (jumlah === PASANG_TARGET) {
                                      setPasangBenar(true);
                                      setPesanPasang("Pas. Kelompoknya sama banyak.");
                                      return;
                                    }
                                    setPesanPasang("Hitung lagi. Cari yang sama banyak.");
                                  }}
                                  className={`rounded-2xl border-2 bg-white px-1 py-2 ${
                                    pas ? "border-[#1C01A5]" : "border-[#93C5FD]"
                                  }`}
                                >
                                  <RakBendaNyata jenis="perosotan" terisi={jumlah} kapasitas={jumlah} rapat />
                                </button>
                              );
                            })}
                          </div>
                          {pesanPasang ? (
                            <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanPasang}</p>
                          ) : null}
                          <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
                        </>
                      );
                    }
                    if (kegiatan.id === "banding") {
                      const palingBanyak = Math.max(...BANDING_PASANGAN.map((kelompok) => kelompok.jumlah));
                      return (
                        <>
                          <KepalaConcrete judul={kegiatan.nama} onSuara={() => speakGuru(SUARA_BANDING)} />
                          <p className="text-xs font-bold text-[#1E3A8A]">
                            {nomor} {bandingBenar ? "Kelompok ini lebih banyak." : "Tekan kelompok yang lebih banyak."}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {BANDING_PASANGAN.map((kelompok) => {
                              const pas = bandingBenar && kelompok.jumlah === palingBanyak;
                              return (
                                <button
                                  key={kelompok.id}
                                  type="button"
                                  aria-label={kelompok.id === "kiri" ? "Banding kiri" : "Banding kanan"}
                                  aria-pressed={pas}
                                  onClick={() => {
                                    if (bandingBenar) return;
                                    if (kelompok.jumlah === palingBanyak) {
                                      setBandingBenar(true);
                                      setPesanBanding("Betul. Kelompok ini lebih banyak.");
                                      return;
                                    }
                                    setPesanBanding("Yang ini lebih sedikit. Tekan yang lebih banyak.");
                                  }}
                                  className={`rounded-2xl border-2 bg-white px-2 py-3 ${
                                    pas ? "border-[#1C01A5]" : "border-[#93C5FD]"
                                  }`}
                                >
                                  <RakBendaNyata jenis="perosotan" terisi={kelompok.jumlah} kapasitas={kelompok.jumlah} rapat />
                                </button>
                              );
                            })}
                          </div>
                          {pesanBanding ? (
                            <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanBanding}</p>
                          ) : null}
                          <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
                        </>
                      );
                    }
                    if (kegiatan.id === "urut") {
                      const sisa = URUTAN_AWAL.filter((id) => !urutPilih.includes(id));
                      return (
                        <>
                          <KepalaConcrete judul={kegiatan.nama} onSuara={() => speakGuru(SUARA_URUT)} />
                          <p className="text-xs font-bold text-[#1E3A8A]">
                            {nomor}{" "}
                            {urutPilih.length >= URUTAN_BENAR.length
                              ? "Urutannya pas. Dari sedikit ke banyak."
                              : "Tekan dari yang paling sedikit."}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {sisa.map((id) => {
                              const kartu = KARTU_CONCRETE.find((item) => item.id === id)!;
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  aria-label={`Susun ${kartu.nama}`}
                                  onClick={() => {
                                    if (urutPilih.length >= URUTAN_BENAR.length) return;
                                    if (id !== URUTAN_BENAR[urutPilih.length]) {
                                      setPesanUrut("Belum. Cari kelompok yang lebih sedikit.");
                                      return;
                                    }
                                    const berikut = [...urutPilih, id];
                                    setUrutPilih(berikut);
                                    setPesanUrut(
                                      berikut.length === URUTAN_BENAR.length
                                        ? "Urutannya pas. Dari sedikit ke banyak."
                                        : "Benar. Lanjut ke kelompok berikutnya."
                                    );
                                  }}
                                  className="rounded-2xl border-2 border-[#93C5FD] bg-white px-2 py-2"
                                >
                                  <RakBendaNyata jenis={kartu.id} terisi={kartu.jumlah} kapasitas={kartu.jumlah} rapat />
                                  <p className="mt-1 text-center text-[11px] font-black leading-tight text-[#1C01A5]">
                                    {kartu.nama}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                          <div className="rounded-2xl border-2 border-dashed border-[#93C5FD] bg-white p-2">
                            <p className="mb-2 text-center text-[11px] font-black text-[#1E3A8A]">Dari sedikit ke banyak</p>
                            <div className="flex min-h-14 flex-wrap items-center justify-center gap-2">
                              {urutPilih.length === 0 ? (
                                <span className="text-xs font-bold text-[#1E3A8A]">Susunan muncul di sini.</span>
                              ) : (
                                urutPilih.map((id) => {
                                  const kartu = KARTU_CONCRETE.find((item) => item.id === id)!;
                                  return (
                                    <div key={id} className="w-16">
                                      <RakBendaNyata jenis={kartu.id} terisi={kartu.jumlah} kapasitas={kartu.jumlah} rapat />
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                          {pesanUrut ? (
                            <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanUrut}</p>
                          ) : null}
                          <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
                        </>
                      );
                    }
                    if (kegiatan.id === "cerita") {
                      const suara = suaraConcrete.cerita === true;
                      return (
                        <>
                          <KepalaConcrete judul={kegiatan.nama} onSuara={() => speakGuru(SUARA_CERITA)} />
                          <p className="text-xs font-bold text-[#1E3A8A]">
                            {nomor} Di taman ada jungkat-jungkit. Ayunan ikut datang.{" "}
                            {suara
                              ? "Jumlahnya sudah diucapkan."
                              : ceritaDatang
                                ? "Hitung semua mainan, lalu ucapkan sekali."
                                : "Tekan tombol supaya ayunan datang."}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-2xl border-2 border-[#1C01A5] bg-white px-2 py-2">
                              <RakBendaNyata jenis="jungkat" terisi={CERITA_JUNGKAT} kapasitas={CERITA_JUNGKAT} rapat />
                              <p className="mt-1 text-center text-[11px] font-black text-[#1C01A5]">Jungkat-jungkit</p>
                            </div>
                            <div
                              className={`rounded-2xl border-2 bg-white px-2 py-2 ${
                                ceritaDatang ? "border-[#1C01A5]" : "border-dashed border-[#93C5FD]"
                              }`}
                            >
                              {ceritaDatang ? (
                                <RakBendaNyata jenis="ayunan" terisi={CERITA_AYUNAN} kapasitas={CERITA_AYUNAN} rapat />
                              ) : (
                                <div className="flex h-9 items-center justify-center text-[11px] font-bold text-[#1E3A8A]">
                                  Ayunan belum datang
                                </div>
                              )}
                              <p className="mt-1 text-center text-[11px] font-black text-[#1C01A5]">Ayunan</p>
                            </div>
                          </div>
                          {ceritaDatang ? (
                            <TombolJawabanSuara
                              sudah={suara}
                              jumlah={CERITA_JUMLAH}
                              kata={SEBUTAN_ANGKA[CERITA_JUMLAH - 1]}
                              sedang={rekamConcrete}
                              pesan={pesanConcrete}
                              onTekan={() => mulaiRekamConcrete("cerita", CERITA_JUMLAH)}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCeritaDatang(true)}
                              className="w-full rounded-2xl border-2 border-[#93C5FD] bg-white px-3 py-3 text-sm font-black text-[#1C01A5]"
                            >
                              Datangkan ayunan
                            </button>
                          )}
                          {pesanConcrete ? (
                            <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanConcrete}</p>
                          ) : null}
                          <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
                        </>
                      );
                    }
                    const tulis = tulisConcrete[TULIS_MAINAN.id] === true;
                    return (
                      <>
                        <KepalaConcrete judul={kegiatan.nama} onSuara={() => speakGuru(SUARA_TULIS)} />
                        <p className="text-xs font-bold text-[#1E3A8A]">
                          {nomor} Lihat sepedanya, lalu tulis angka di atas dan kata di bawah.
                        </p>
                        <div className="rounded-2xl border-2 border-[#1C01A5] bg-white px-3 py-3">
                          <RakBendaNyata
                            jenis={TULIS_MAINAN.id}
                            terisi={TULIS_MAINAN.jumlah}
                            kapasitas={TULIS_MAINAN.jumlah}
                          />
                        </div>
                        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#93C5FD] bg-white p-3">
                          <div className="text-xs font-black text-[#1E3A8A]">Tulis angka di atas, kata di bawah</div>
                          <DottedNumberTracingCanvas
                            key={TULIS_MAINAN.id}
                            digit={TULIS_MAINAN.jumlah}
                            kata={SEBUTAN_ANGKA[TULIS_MAINAN.jumlah - 1]}
                            onCompletedTrace={() =>
                              setTulisConcrete((prev) => ({ ...prev, [TULIS_MAINAN.id]: true }))
                            }
                          />
                          <p className="text-xs font-bold text-[#1C01A5]">
                            {tulis ? "Tulisanmu pas." : "Ikuti titik sampai mirip."}
                          </p>
                        </div>
                        <TombolLanjutConcrete pictorial onClick={lanjut} />
                      </>
                    );
                  })()}
                </div>
              ) : (
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
              )}

              {activeSubBab !== "A" ? (
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
              ) : null}
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 5: PICTURE (DIAGRAM MAINAN + KANVAS)          */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 5 && (
            <div ref={pictorialRef} className="space-y-3 border-b-2 border-slate-200 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-black text-xs">
                  Tahap 5: Picture
                </span>
              </div>

              {activeSubBab === "A" ? (
                <div className="rounded-3xl border-2 border-[#F59E0B] bg-[#FFFBEB] p-4 space-y-3">
                  {(() => {
                    const kartu = KARTU_GAMBAR[indeksGambar];
                    const hitung = hitungGambar[kartu.id] ?? 0;
                    const tulis = tulisGambar[kartu.id] === true;
                    const suara = suaraGambar[kartu.id] === true;
                    const terakhir = indeksGambar >= KARTU_GAMBAR.length - 1;
                    return (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">
                            {kartu.nama}
                          </h3>
                          <button
                            type="button"
                            onClick={() => speakGuru(kartu.suara)}
                            className="shrink-0 rounded-xl border border-[#F59E0B] bg-white px-3 py-1 text-xs font-black text-[#92400E]"
                          >
                            🔊 Suara Guru
                          </button>
                        </div>
                        <p className="text-xs font-bold text-[#92400E]">
                          Diagram {indeksGambar + 1} dari {KARTU_GAMBAR.length}.{" "}
                          {suara
                            ? "Jumlahnya sudah diucapkan."
                            : "Tekan diagram, lalu ucapkan jumlahnya satu kali."}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center text-xs font-black tracking-wide text-[#92400E]">MAINAN</div>
                          <div className="text-center text-xs font-black tracking-wide text-[#92400E]">JUMLAH</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            aria-label={kartu.nama}
                            aria-pressed={hitung > 0}
                            onClick={() => tambahDiagram(kartu.id, kartu.jumlah)}
                            className={`flex min-w-0 flex-col gap-2 rounded-2xl border-2 bg-white px-2 py-2 text-left ${
                              hitung > 0 ? "border-[#1C01A5]" : "border-[#F0AB00]"
                            }`}
                          >
                            <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kartu.nama}</span>
                            <DiagramMainan jenis={kartu.id} terisi={hitung} kapasitas={kartu.jumlah} />
                          </button>
                          <button
                            type="button"
                            aria-label={suara ? `${kartu.jumlah} ${SEBUTAN_ANGKA[kartu.jumlah - 1]}` : "Jawab dengan suara"}
                            onClick={() => {
                              if (suara) return;
                              mulaiRekamConcrete(kartu.id, kartu.jumlah, "gambar");
                            }}
                            className={`flex min-h-16 min-w-0 flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-1 ${
                              suara
                                ? "border-solid border-[#1C01A5]"
                                : rekamGambar
                                  ? "border-solid border-[#F0AB00]"
                                  : "border-dashed border-[#F0AB00]"
                            }`}
                          >
                            {suara ? (
                              <>
                                <span className="text-3xl font-black leading-none text-[#1C01A5]">{kartu.jumlah}</span>
                                <span className="text-sm font-black leading-tight text-[#1C01A5]">
                                  {SEBUTAN_ANGKA[kartu.jumlah - 1]}
                                </span>
                              </>
                            ) : (
                              <span className="text-center text-sm font-black leading-tight text-[#1C01A5]">
                                {rekamGambar
                                  ? pesanGambar.startsWith("Memeriksa")
                                    ? "Memeriksa..."
                                    : "Mendengarkan..."
                                  : "Jawab dengan suara"}
                              </span>
                            )}
                          </button>
                        </div>
                        {pesanGambar ? (
                          <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanGambar}</p>
                        ) : null}
                        <div className="space-y-3">
                          <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#F0AB00] bg-white p-3">
                            <div className="text-xs font-black text-[#92400E]">
                              Tulis angka di atas, kata di bawah
                            </div>
                            <DottedNumberTracingCanvas
                              key={`gambar-${kartu.id}`}
                              digit={kartu.jumlah}
                              kata={SEBUTAN_ANGKA[kartu.jumlah - 1]}
                              onCompletedTrace={() =>
                                setTulisGambar((prev) => ({ ...prev, [kartu.id]: true }))
                              }
                            />
                            <p className="text-xs font-bold text-[#1C01A5]">
                              {tulis ? "Tulisanmu pas." : "Ikuti titik sampai mirip."}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                hentikanRekamConcrete();
                                setPesanGambar("");
                                if (!terakhir) {
                                  setIndeksGambar((urut) => urut + 1);
                                  pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                  return;
                                }
                                handleUnlockNextSmicpa(
                                  6,
                                  abstractRef,
                                  "Tiga diagram sudah pas. Ayo lihat lambang angkanya."
                                );
                              }}
                              className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md"
                            >
                              {terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️"}
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
              <>
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
              </>
              )}
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 6: ABSTRACT (3 SLIDE ANGKA & SIMBOL MURNI)     */}
          {/* --------------------------------------------------------------- */}
          {unlockedSmicpaStage >= 6 && (
            <div ref={abstractRef} className="space-y-4 pt-2 pb-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#1C01A5] text-[#FFE566] font-black text-xs">
                  Tahap 6: Abstract
                </span>
              </div>

              {activeSubBab === "A" ? (
                <div className="rounded-3xl border-2 border-[#1C01A5] bg-slate-50 p-4 space-y-3">
                  {(() => {
                    const kartu = KARTU_LAMBANG[indeksLambang];
                    const hitung = hitungLambang[kartu.id] ?? 0;
                    const tulis = tulisLambang[kartu.id] === true;
                    const suara = suaraLambang[kartu.id] === true;
                    const terakhir = indeksLambang >= KARTU_LAMBANG.length - 1;
                    return (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">
                            {kartu.nama}
                          </h3>
                          <button
                            type="button"
                            onClick={() => speakGuru(kartu.suara)}
                            className="shrink-0 rounded-xl border border-[#1C01A5] bg-white px-3 py-1 text-xs font-black text-[#1C01A5]"
                          >
                            🔊 Suara Guru
                          </button>
                        </div>
                        <p className="text-xs font-bold text-[#1C01A5]">
                          Lambang {indeksLambang + 1} dari {KARTU_LAMBANG.length}.{" "}
                          {suara
                            ? "Lambangnya sudah diucapkan."
                            : "Geser manik di rak, lalu ucapkan lambangnya satu kali."}
                        </p>
                        <p className="text-center text-sm font-black text-[#1C01A5]">
                          {kartu.nama} = {suara ? kartu.jumlah : "□"}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center text-xs font-black tracking-wide text-[#1C01A5]">RAK</div>
                          <div className="text-center text-xs font-black tracking-wide text-[#1C01A5]">LAMBANG</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            aria-label={kartu.nama}
                            aria-pressed={hitung > 0}
                            onClick={() => geserManik(kartu.id, kartu.jumlah)}
                            className={`flex min-w-0 flex-col gap-2 rounded-2xl border-2 bg-white px-2 py-2 text-left ${
                              hitung > 0 ? "border-[#1C01A5]" : "border-[#93C5FD]"
                            }`}
                          >
                            <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kartu.nama}</span>
                            <RakManik terisi={hitung} kapasitas={kartu.jumlah} />
                          </button>
                          <button
                            type="button"
                            aria-label={suara ? `${kartu.jumlah} ${SEBUTAN_ANGKA[kartu.jumlah - 1]}` : "Jawab dengan suara"}
                            onClick={() => {
                              if (suara) return;
                              mulaiRekamConcrete(kartu.id, kartu.jumlah, "lambang");
                            }}
                            className={`flex min-h-16 min-w-0 flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-1 ${
                              suara
                                ? "border-solid border-[#1C01A5]"
                                : rekamLambang
                                  ? "border-solid border-[#F0AB00]"
                                  : "border-dashed border-[#1C01A5]"
                            }`}
                          >
                            {suara ? (
                              <>
                                <span className="text-3xl font-black leading-none text-[#1C01A5]">{kartu.jumlah}</span>
                                <span className="text-sm font-black leading-tight text-[#1C01A5]">
                                  {SEBUTAN_ANGKA[kartu.jumlah - 1]}
                                </span>
                              </>
                            ) : (
                              <span className="text-center text-sm font-black leading-tight text-[#1C01A5]">
                                {rekamLambang ? "Mendengarkan..." : "Jawab dengan suara"}
                              </span>
                            )}
                          </button>
                        </div>
                        {pesanLambang ? (
                          <p className="text-center text-xs font-bold text-[#1C01A5]">{pesanLambang}</p>
                        ) : null}
                        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#1C01A5] bg-white p-3">
                          <div className="text-xs font-black text-[#1C01A5]">Tulis lambang di atas, kata di bawah</div>
                          <DottedNumberTracingCanvas
                            key={`lambang-${kartu.id}`}
                            digit={kartu.jumlah}
                            kata={SEBUTAN_ANGKA[kartu.jumlah - 1]}
                            onCompletedTrace={() =>
                              setTulisLambang((prev) => ({ ...prev, [kartu.id]: true }))
                            }
                          />
                          <p className="text-xs font-bold text-[#1C01A5]">
                            {tulis ? "Lambangmu sudah pas." : "Ikuti titik lambangnya."}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              hentikanRekamConcrete();
                              setPesanLambang("");
                              if (!terakhir) {
                                setIndeksLambang((urut) => urut + 1);
                                abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                return;
                              }
                              selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                            className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md"
                          >
                            LANJUTKAN ⬇️
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
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
              )}

              {/* Tombol KEMBALI (untuk Sub-Bab B, C, D) & LANJUTKAN ke Sub-Bab Berikutnya */}
              <div ref={selesaiBabRef} className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
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