"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { pilihSuaraIndonesia } from "@/lib/guru";
import { hentikanAudioGuruAktif } from "@/lib/putar-tts-klien";
import materiBab1 from "@/data/kelas1-bab1.json";
import GambarPensilCerita from "@/components/GambarPensilCerita";
import { IkonMainan } from "@/components/modul/ikon-mainan";
import { CeritaBandingB } from "@/components/modul/CeritaBandingB";
import { PetaPikiranB } from "@/components/modul/PetaPikiranB";
import { CeritaMajuMundurC, KatakWajah } from "@/components/modul/gambar-maju-mundur-c";
import { CeritaBilanganA, KelinciWajah } from "@/components/modul/gambar-bilangan-a";
import { TombolSuaraGuru } from "@/components/modul/tahap-b-gaya";
import {
  AbstractBilanganA,
  ConcreteBilanganA,
  InfografisBilanganA,
  PictureBilanganA,
} from "@/components/modul/SubBabABilangan";
import {
  AbstractMajuMundurC,
  ConcreteMajuMundurC,
  InfografisMajuMundurC,
  PictureMajuMundurC,
} from "@/components/modul/SubBabCMajuMundur";
import {
  AbstractBandingB,
  ConcreteBandingB,
  InfografisBandingB,
  PictureBandingB,
  type PanelSuara,
} from "@/components/modul/SubBabBBanding";
import {
  DottedNumberTracingCanvas,
  KepalaConcrete,
  RakBendaNyata,
  SEBUTAN_ANGKA,
  TombolJawabanSuara,
  TombolLanjutConcrete,
  fontAnak,
} from "@/components/modul/elemen-kelas1";

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
    | "playground-toys"
    | "banding-sepeda-burung"
    | "banding-kursi-balon"
    | "banding-kelereng"
    | "banding-bola-renggang";
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
  mindMaps: MindMapSlideItem[];
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
  const kata = jumlah === 0 ? "nol" : ALIAS_BILANGAN[jumlah - 1];
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
  const inggris = jumlah === 0 ? "zero" : ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][jumlah - 1];
  const dekat = jumlah === 6 ? ["anang", "enang"] : jumlah === 0 ? ["nul", "noll", "kosong"] : [];
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

// ============================================================================
// KOMPONEN UTAMA MODUL IGIL (MATEMATIKA KELAS 1 SD - BAB 1)
// ============================================================================

const TAB_ANAK: Record<MainTabId, { emoji: string; warna: string }> = {
  silabus: { emoji: "🗺️", warna: "#FFD6D6" },
  materi: { emoji: "📚", warna: "#FFE9A8" },
  simulasi: { emoji: "🧪", warna: "#CDEFD8" },
  latihan: { emoji: "✏️", warna: "#DDD8FF" },
  ujian: { emoji: "🏆", warna: "#FFD9B0" },
  praktikum: { emoji: "🎨", warna: "#C8EAFB" },
};

const SUB_ANAK: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔢" },
  B: { emoji: "🐊" },
  C: { emoji: "🐸" },
  D: { emoji: "🧩" },
};

function KartuSilabus({
  tepi,
  latar,
  lencana,
  judul,
  teksSuara,
  bicara,
  children,
}: {
  tepi: string;
  latar: string;
  lencana: string;
  judul: string;
  teksSuara: string;
  bicara: (teks: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="space-y-4 rounded-3xl border-2 p-4 md:rounded-[2rem] md:border-4"
      style={{ borderColor: tepi, backgroundColor: latar }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-1 text-[11px] font-black text-[#FFE566]">
            {lencana}
          </span>
          <h3 className="break-words text-xl font-black leading-tight text-[#1C01A5] md:text-2xl">{judul}</h3>
        </div>
        <TombolSuaraGuru kecil label="Suara Guru" onClick={() => bicara(teksSuara)} />
      </div>
      {children}
    </div>
  );
}

function BarisIkon({
  emoji,
  warna,
  judul,
  children,
}: {
  emoji: string;
  warna: string;
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
        style={{ backgroundColor: warna }}
        aria-hidden="true"
      >
        {emoji}
      </span>
      <div className="min-w-0">
        <div className="mb-1 text-lg font-black text-[#1C01A5]">{judul}</div>
        <div className="text-base leading-relaxed text-[#334155] md:text-lg">{children}</div>
      </div>
    </div>
  );
}

const TAHAP_SILABUS = [
  { emoji: "📖", nama: "Story (Cerita)", warna: "#FFD6D6" },
  { emoji: "🌳", nama: "Mind-Mapping (Peta Pikiran)", warna: "#FFE9A8" },
  { emoji: "📊", nama: "Infografis (Tabel Data)", warna: "#CDEFD8" },
  { emoji: "🧺", nama: "Concrete (Benda Nyata)", warna: "#DDD8FF" },
  { emoji: "🖼️", nama: "Pictorial (Diagram)", warna: "#FFD9B0" },
  { emoji: "🔢", nama: "Abstract (Simbol Angka)", warna: "#C8EAFB" },
];

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

  const panelConcrete: PanelSuara = {
    sedang: rekamConcrete,
    pesan: pesanConcrete,
    suara: suaraConcrete,
    mulai: (id, jumlah) => mulaiRekamConcrete(id, jumlah, "concrete"),
    tandai: (id) => setSuaraConcrete((prev) => ({ ...prev, [id]: true })),
    bersih: () => setPesanConcrete(""),
  };
  const panelGambar: PanelSuara = {
    sedang: rekamGambar,
    pesan: pesanGambar,
    suara: suaraGambar,
    mulai: (id, jumlah) => mulaiRekamConcrete(id, jumlah, "gambar"),
    tandai: (id) => setSuaraGambar((prev) => ({ ...prev, [id]: true })),
    bersih: () => setPesanGambar(""),
  };
  const panelLambang: PanelSuara = {
    sedang: rekamLambang,
    pesan: pesanLambang,
    suara: suaraLambang,
    mulai: (id, jumlah) => mulaiRekamConcrete(id, jumlah, "lambang"),
    tandai: (id) => setSuaraLambang((prev) => ({ ...prev, [id]: true })),
    bersih: () => setPesanLambang(""),
  };

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

  // 7. State Halaman Ujian Formal (10 Soal 100% HOTS, tanpa kamera)
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

  // 9. Perhitungan Kartu Poin (Latihan 30 + Ujian 70 per bab, Praktikum 50 per blok 4 bab)
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
    materiBab1.tokens.practice + materiBab1.tokens.exam;

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
        <header
          className="relative mx-auto w-[99%] overflow-hidden rounded-3xl border-2 border-[#FFE566] bg-[#1C01A5] px-4 py-5 md:rounded-[2rem] md:border-4 md:px-7 md:py-5 md:shadow-[0_6px_0_rgba(240,171,0,0.55)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,229,102,0.28) 3px, transparent 3px), radial-gradient(rgba(127,203,150,0.3) 2px, transparent 2px)",
            backgroundSize: "40px 40px, 20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        >
          <span className="igil-goyang pointer-events-none absolute left-[46%] top-1 hidden text-2xl md:block" aria-hidden="true">⭐</span>
          <span className="igil-lompat pointer-events-none absolute bottom-1 left-[58%] hidden text-xl md:block" aria-hidden="true">✨</span>
          <span className="igil-goyang pointer-events-none absolute right-2 top-1 hidden text-xl md:block" aria-hidden="true">🌈</span>
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-[240px] flex-1 items-center gap-3 md:gap-4">
                <span className="igil-lompat block h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#FFE566] md:h-20 md:w-20 md:border-4 md:shadow-[0_4px_0_rgba(0,0,0,0.25)]">
                  <img
                    src="/icon-192.png"
                    alt="burung hantu IGIL"
                    width={80}
                    height={80}
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
                <div className="space-y-1.5">
                  <h2 className="inline-block rounded-full border-2 border-white bg-[#FFE566] px-3 py-0.5 text-xs font-black uppercase tracking-wider text-[#1C01A5] md:text-sm">
                    {materiBab1.subjectLabel}
                  </h2>
                  <h1 className="text-xl font-black leading-tight text-white [text-shadow:0_3px_0_rgba(0,0,0,0.3)] md:text-3xl">
                    {materiBab1.title}
                  </h1>
                </div>
              </div>

              <div className="w-full rounded-2xl bg-white px-3 py-2 sm:w-auto md:rounded-3xl md:border-4 md:border-[#F0AB00] md:px-4 md:py-2.5 md:shadow-[0_4px_0_rgba(240,171,0,0.7)]">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#334155]">
                  KARTU POINT TOKEN IGIL
                </div>
                <div className="flex items-center gap-2 text-xl font-black text-[#1C01A5] md:text-2xl">
                  <span className="igil-lompat inline-block text-3xl" aria-hidden="true">💰</span>
                  <span>{practiceTokens + examTokens}</span>
                  <span className="text-xs text-[#F0AB00]">/ {batasToken} Poin</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-black text-[#1C01A5]">
                  <span className="rounded-full bg-[#DDD8FF] px-2 py-0.5">
                    ✏️ <span className="hidden sm:inline">Latihan </span>{practiceTokens}/{materiBab1.tokens.practice}
                  </span>
                  <span className="rounded-full bg-[#FFD9B0] px-2 py-0.5">
                    🏆 <span className="hidden sm:inline">Ujian </span>{examTokens}/{materiBab1.tokens.exam}
                  </span>
                  <span className="rounded-full bg-[#C8EAFB] px-2 py-0.5">
                    🎨 <span className="hidden sm:inline">Praktikum </span>{practicumTokens}/{materiBab1.tokens.practicum}
                  </span>
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
        <nav className="w-full overflow-x-auto rounded-3xl border-2 border-[#FFE566] bg-[#1C01A5] p-2 pb-3 md:rounded-[2rem] md:border-4 md:shadow-[0_6px_0_rgba(28,1,165,0.35)] [scrollbar-color:#FFE566_#1C01A5] [scrollbar-width:thin]">
          <div className="flex min-w-max flex-nowrap items-center gap-2.5">
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
              const gaya = TAB_ANAK[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveMainTab(tab.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: isActive ? "#FFE566" : gaya.warna,
                    color: "#1C01A5",
                    borderColor: isActive ? "#FFFFFF" : "#1C01A5",
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-black transition-all md:border-4 md:px-4 md:py-2 md:text-base ${
                    isActive
                      ? "scale-105 md:-translate-y-0.5 md:scale-110 md:shadow-[0_5px_0_#F0AB00]"
                      : "opacity-95 md:shadow-[0_3px_0_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <span className={`text-xl leading-none md:text-2xl ${isActive ? "igil-lompat" : ""}`} aria-hidden="true">
                    {gaya.emoji}
                  </span>
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
        <section
          className="relative mx-auto mt-4 w-[98%] space-y-7 rounded-[2rem] bg-[#FFFDF2] p-3 md:space-y-5 md:border-4 md:border-dashed md:border-[#FFE566] md:p-6"
          style={{
            backgroundImage: "radial-gradient(#FFEFB0 2px, transparent 2px)",
            backgroundSize: "26px 26px",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">
                HALAMAN SILABUS ({silabusPage} DARI 2)
              </span>
              <h2 className="text-2xl font-black text-[#1C01A5] md:text-3xl">
                {silabusPage === 1 ? "🗺️ Peta Petualangan Kita" : "🎯 Target Belajar Kita"}
              </h2>
            </div>
            <span className="igil-lompat shrink-0 text-5xl" aria-hidden="true">
              🦉
            </span>
          </div>

          {silabusPage === 1 && (
            <div className="flex w-full flex-col gap-8 md:gap-5">
              <KartuSilabus
                tepi="#E98989"
                latar="#FFF1F1"
                lencana="KOMPONEN SILABUS KURIKULUM MERDEKA"
                judul="🌈 Fase A • Elemen Bilangan (Kelas 1 SD/MI)"
                bicara={speakGuru}
                teksSuara="Kita belajar bilangan sampai sepuluh. Bukunya bernama Ayo Membilang sampai dengan Sepuluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol angka."
              >
                <BarisIkon emoji="🧠" warna="#FFD6D6" judul="Capaian Pembelajaran (CP)">
                  Siswa menunjukkan pemahaman dan intuisi bilangan (<em>number sense</em>) pada bilangan cacah sampai 10.
                </BarisIkon>
                <BarisIkon emoji="📖" warna="#FFE9A8" judul="Referensi Buku Resmi">
                  Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 10, Halaman 1–32).
                </BarisIkon>
                <BarisIkon emoji="🚀" warna="#CDEFD8" judul="Metode Pedagogis SMICPA">
                  <span className="flex flex-wrap gap-2.5 pt-2">
                    {TAHAP_SILABUS.map((s, i) => (
                      <span
                        key={s.nama}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black text-[#1C01A5]"
                        style={{ backgroundColor: s.warna }}
                      >
                        <span aria-hidden="true">{s.emoji}</span>
                        {i + 1}. {s.nama}
                      </span>
                    ))}
                  </span>
                </BarisIkon>
              </KartuSilabus>

              <KartuSilabus
                tepi="#F0AB00"
                latar="#FFF8DC"
                lencana="ARSITEKTUR LEARN-TO-EARN & KOLAM BEASISWA 90:10"
                judul="💰 Poin dari Latihan, Ujian, dan Praktikum"
                bicara={speakGuru}
                teksSuara="Ada tiga sumber poin. Latihan memberi tiga puluh poin di setiap bab. Ujian memberi tujuh puluh poin, dan kamu harus mendapat nilai seratus. Praktikum memberi lima puluh poin, sekali setelah empat bab selesai."
              >
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      emoji: "✏️",
                      nama: "Komponen Latihan",
                      token: materiBab1.tokens.practice,
                      warna: "#DDD8FF",
                      isi: "10 soal terbimbing (LOTS 30%, MOTS 30%, HOTS 40%) lengkap dengan pembahasan langsung.",
                    },
                    {
                      emoji: "🏆",
                      nama: "Komponen Ujian Mandiri",
                      token: materiBab1.tokens.exam,
                      warna: "#FFD9B0",
                      isi: "10 soal formal HOTS. Wajib meraih nilai sempurna 100/100 untuk membuka Praktikum.",
                    },
                    {
                      emoji: "🎨",
                      nama: "Komponen Praktikum Sintesis",
                      token: materiBab1.tokens.practicum,
                      warna: "#C8EAFB",
                      isi: "Proyek perancangan terpadu yang dinilai secara tertutup (On-Submit Hidden Grading).",
                    },
                  ].map((k) => (
                    <div
                      key={k.nama}
                      className="space-y-2 rounded-2xl p-4 text-center md:rounded-3xl md:border-4 md:border-white md:shadow"
                      style={{ backgroundColor: k.warna }}
                    >
                      <div className="igil-lompat text-3xl md:text-4xl" aria-hidden="true">
                        {k.emoji}
                      </div>
                      <div className="text-lg font-black text-[#1C01A5]">{k.nama}</div>
                      <div className="inline-block rounded-full bg-[#FFE566] px-3 py-0.5 text-xl font-black text-[#1C01A5]">
                        💰 {k.token} Poin
                      </div>
                      <p className="text-sm leading-snug text-[#334155] md:text-base">{k.isi}</p>
                    </div>
                  ))}
                </div>
              </KartuSilabus>
            </div>
          )}

          {silabusPage === 2 && (
            <div className="flex w-full flex-col gap-8 md:gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#EEFBF1] px-4 py-3 md:border-4 md:border-[#7FCB96]">
                <div className="text-lg font-black text-[#166534]">
                  📋 Bintang Kita: {completedSubBabs.length} dari 4 sub-bab
                </div>
                <div className="flex gap-1 text-3xl" aria-hidden="true">
                  {(["A", "B", "C", "D"] as SubBabId[]).map((id) => (
                    <span key={id} className={completedSubBabs.includes(id) ? "igil-lompat" : "opacity-40"}>
                      {completedSubBabs.includes(id) ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 md:gap-4">
                {(["A", "B", "C", "D"] as SubBabId[]).map((id) => {
                  const isDone = completedSubBabs.includes(id);
                  const sub = SUB_BABS[id];
                  return (
                    <div
                      key={id}
                      className="space-y-3 rounded-3xl border-2 p-4 md:rounded-[2rem] md:border-4"
                      style={{ borderColor: sub.secondaryBorder, backgroundColor: sub.secondaryBg }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-3xl ${
                            isDone ? "igil-lompat" : ""
                          }`}
                          style={{ backgroundColor: sub.secondaryBorder }}
                          aria-hidden="true"
                        >
                          {SUB_ANAK[id].emoji}
                        </span>
                        <div className="min-w-0 flex-1 text-lg font-black leading-tight" style={{ color: sub.secondaryText }}>
                          {sub.fullTitle}
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-[#334155] md:text-lg">{sub.targetDescription}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-black ${
                            isDone ? "bg-[#22C55E] text-white" : "bg-white text-[#64748B]"
                          }`}
                        >
                          <span className="text-xl" aria-hidden="true">
                            {isDone ? "⭐" : "🎯"}
                          </span>
                          {isDone ? "Sudah selesai!" : "Belum, ayo mulai!"}
                        </div>
                        <TombolSuaraGuru kecil label="Suara Guru" onClick={() => speakGuru(`${sub.fullTitle}. ${sub.targetDescription}`)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tombol KEMBALI dan LANJUT di Akhir Halaman Silabus */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              disabled={silabusPage === 1}
              onClick={() => setSilabusPage(1)}
              className="rounded-full bg-[#E2E8F0] px-5 py-3 text-base font-black text-[#334155] disabled:opacity-40"
            >
              ⬅️ KEMBALI
            </button>

            <span className="flex items-center gap-2" aria-hidden="true">
              {[1, 2].map((n) => (
                <span
                  key={n}
                  className="block h-4 w-4 rounded-full border-2 border-[#1C01A5]"
                  style={{ backgroundColor: n === silabusPage ? "#FFE566" : "#FFFFFF" }}
                />
              ))}
            </span>

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
              className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-7 py-3 text-base font-black text-[#FFE566] md:border-4"
            >
              LANJUT ➡️
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
                        backgroundColor: isSelected ? "#FFFFFF" : sub.secondaryBg,
                        borderColor: isSelected ? "#1C01A5" : sub.secondaryBorder,
                        color: sub.secondaryText,
                      }}
                      className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border-2 py-1 pl-1 pr-4 text-sm font-black transition-all md:border-4 md:py-1.5 md:pl-1.5 md:text-base ${
                        isSelected ? "scale-105 md:scale-110" : "opacity-90"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xl md:h-10 md:w-10 md:border-4 ${
                          isSelected ? "igil-lompat" : ""
                        }`}
                        style={{ backgroundColor: sub.secondaryBorder }}
                        aria-hidden="true"
                      >
                        {SUB_ANAK[subId].emoji}
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[10px] font-black uppercase tracking-wider opacity-70">Sub-Bab {subId}</span>
                        {sub.codeTitle.replace(/^Sub-Bab [A-D]\s*\(?/, "").replace(/\)$/, "")}
                      </span>
                      {isDone ? (
                        <span className="absolute -right-1 -top-2 text-xl" aria-label="selesai">
                          ✅
                        </span>
                      ) : null}
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

            {activeSubBab === "A" ? (
              <CeritaBilanganA cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : activeSubBab === "B" ? (
              <CeritaBandingB cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : activeSubBab === "C" ? (
              <CeritaMajuMundurC cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : (
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
                      <TombolSuaraGuru kecil label="Suara Guru" onClick={() => speakGuru(st.voiceNarration)} />
                    </div>

                    <GambarPensilCerita
                      sceneType={st.sceneType as Parameters<typeof GambarPensilCerita>[0]["sceneType"]}
                    />
                  </div>
                ))}
              </div>
            </div>
            )}

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

              {activeSubBab === "A" ? (
                <PetaPikiranB
                  langkah={currentSubContent.mindMaps}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<KelinciWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : activeSubBab === "B" ? (
                <PetaPikiranB
                  langkah={currentSubContent.mindMaps}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                />
              ) : activeSubBab === "C" ? (
                <PetaPikiranB
                  langkah={currentSubContent.mindMaps}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<KatakWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : (
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
                      <TombolSuaraGuru kecil label="Suara" onClick={() => speakGuru(`${mm.stepTitle}. ${mm.stepDesc}`)} />
                    </div>
                    <h3 className="mt-3 text-base font-black text-[#1C01A5]">{mm.stepTitle}</h3>
                  </div>
                ))}
              </div>
              )}

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
                <InfografisBilanganA speakGuru={speakGuru} />
              ) : activeSubBab === "B" ? (
                <InfografisBandingB speakGuru={speakGuru} />
              ) : activeSubBab === "C" ? (
                <InfografisMajuMundurC speakGuru={speakGuru} />
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
                              <TombolSuaraGuru kecil label="Dengarkan kalimat" onClick={() => speakGuru(row.voiceSentence)} />
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
                <ConcreteBilanganA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Delapan kegiatan benda nyata sudah siap. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : activeSubBab === "B" ? (
                <ConcreteBandingB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Enam kegiatan benda nyata sudah siap. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : activeSubBab === "C" ? (
                <ConcreteMajuMundurC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Tujuh kegiatan benda nyata sudah siap. Sekarang kita lihat gambarnya."
                    )
                  }
                />
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
                        <TombolSuaraGuru kecil label="Panduan Suara" onClick={() => speakGuru(cSlide.voiceGuide)} />
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

              {activeSubBab !== "A" && activeSubBab !== "B" && activeSubBab !== "C" ? (
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
                <PictureBilanganA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Empat diagram sudah pas. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : activeSubBab === "B" ? (
                <PictureBandingB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Empat diagram sudah pas. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : activeSubBab === "C" ? (
                <PictureMajuMundurC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Empat diagram sudah pas. Ayo lihat lambang angkanya."
                    )
                  }
                />
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
                        <TombolSuaraGuru kecil label="Suara" onClick={() => speakGuru(`${pSlide.title}. ${pSlide.caption}`)} />
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
                <AbstractBilanganA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : activeSubBab === "B" ? (
                <AbstractBandingB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : activeSubBab === "C" ? (
                <AbstractMajuMundurC
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
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
                        <TombolSuaraGuru kecil label="Lafalkan" onClick={() => speakGuru(aSlide.voiceReadout)} />
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
                  <TombolSuaraGuru kecil label="Bacakan Soal" onClick={() => speakGuru(q.prompt)} />
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
                          {isRight ? "✅ Benar! (+3 Poin): " : "💡 Pembahasan Guru: "}
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
                Sesi Belajar Sah: Tervalidasi Server
              </h2>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/15 text-[#FFE566] font-black text-xs">
              Percobaan Ke-{examAttempts} {examFirstTryPerfect ? "🏅 Papan Kualifikasi Beasiswa" : ""}
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
                  ✅ <strong>Status On-Submit Hidden Grading:</strong> Tugas Praktikum telah dinilai 1 kali di latar belakang berdasarkan 4 Parameter Resmi (Akurasi Solusi 30%, Sintesis Lintas-4-Bab 25%, Kemandirian Pengerjaan 20%, Penalaran &amp; Penjelasan 25%) dan disimpan tersembunyi hingga pembukaan peringkat beasiswa akhir bulan. (+50 Poin Tercatat).
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}