"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  kirimJawabanLatihan,
  PanelProfilBelajar,
  UjianServer,
  useProfilBelajar,
  type HasilLatihanServer,
} from "@/components/modul/BelajarServer";
import { hentikanSuaraGuruModul, ucapkanGuruModul } from "@/lib/suara-guru-modul";
import materiBab1 from "@/data/kelas1-bab1.json";
import materiBab2 from "@/data/kelas1-bab2.json";
import materiBab3 from "@/data/kelas1-bab3.json";
import materiBab4 from "@/data/kelas1-bab4.json";
import materiBab5 from "@/data/kelas1-bab5.json";
import materiBab6 from "@/data/kelas1-bab6.json";
import { CeritaTambahB, PETA_PIKIRAN_B6 } from "@/components/modul/gambar-tambah-b6";
import {
  AbstractTambahB,
  ConcreteTambahB,
  InfografisTambahB,
  PictureTambahB,
} from "@/components/modul/SubBabB6Tambah";
import { CeritaSelisihA, PETA_PIKIRAN_A6 } from "@/components/modul/gambar-selisih-a6";
import {
  AbstractSelisihA,
  ConcreteSelisihA,
  InfografisSelisihA,
  PictureSelisihA,
} from "@/components/modul/SubBabA6Selisih";
import { CeritaBelasA, PETA_PIKIRAN_A5 } from "@/components/modul/gambar-belas-a5";
import {
  AbstractBelasA,
  ConcreteBelasA,
  InfografisBelasA,
  PictureBelasA,
} from "@/components/modul/SubBabA5Belas";
import { CeritaPerbandinganD, PETA_PIKIRAN_D5 } from "@/components/modul/gambar-perbandingan-d5";
import {
  AbstractPerbandinganD,
  ConcretePerbandinganD,
  InfografisPerbandinganD,
  PicturePerbandinganD,
} from "@/components/modul/SubBabD5Perbandingan";
import { CeritaNilaiC, PETA_PIKIRAN_C5 } from "@/components/modul/gambar-nilai-c5";
import {
  AbstractNilaiC,
  ConcreteNilaiC,
  InfografisNilaiC,
  PictureNilaiC,
} from "@/components/modul/SubBabC5Nilai";
import { CeritaUrutB, PETA_PIKIRAN_B5 } from "@/components/modul/gambar-urut-b5";
import {
  AbstractUrutB,
  ConcreteUrutB,
  InfografisUrutB,
  PictureUrutB,
} from "@/components/modul/SubBabB5Urut";
import { CeritaBentukA, PETA_PIKIRAN_A4 } from "@/components/modul/gambar-bentuk-a4";
import { CeritaKelompokB, PETA_PIKIRAN_B4 } from "@/components/modul/gambar-kelompok-b4";
import { CeritaSusunC, PETA_PIKIRAN_C4 } from "@/components/modul/gambar-susun-c4";
import {
  AbstractSusunC,
  ConcreteSusunC,
  InfografisSusunC,
  PictureSusunC,
} from "@/components/modul/SubBabC4Susun";
import {
  AbstractKelompokB,
  ConcreteKelompokB,
  InfografisKelompokB,
  PictureKelompokB,
} from "@/components/modul/SubBabB4Kelompok";
import {
  AbstractBentukA,
  ConcreteBentukA,
  InfografisBentukA,
  PictureBentukA,
} from "@/components/modul/SubBabA4Bentuk";
import { CeritaPenguranganA, PETA_PIKIRAN_A3 } from "@/components/modul/gambar-pengurangan-a3";
import {
  AbstractPenguranganA,
  ConcretePenguranganA,
  InfografisPenguranganA,
  PicturePenguranganA,
} from "@/components/modul/SubBabA3Pengurangan";
import { CeritaPenguranganB, PETA_PIKIRAN_B3 } from "@/components/modul/gambar-pengurangan-b3";
import { CeritaHubunganC, PETA_PIKIRAN_C3 } from "@/components/modul/gambar-hubungan-c3";
import { CeritaSoalCeritaD, PETA_PIKIRAN_D3 } from "@/components/modul/gambar-soal-cerita-d3";
import { ConcreteSoalCeritaD } from "@/components/modul/SubBabD3Concrete";
import { PictureSoalCeritaD } from "@/components/modul/SubBabD3Picture";
import { AbstractSoalCeritaD } from "@/components/modul/SubBabD3Abstract";
import { InfografisSoalCeritaD } from "@/components/modul/SubBabD3Infografis";
import {
  AbstractHubunganC,
  ConcreteHubunganC,
  InfografisHubunganC,
  PictureHubunganC,
} from "@/components/modul/SubBabC3Hubungan";
import {
  AbstractPenguranganB,
  ConcretePenguranganB,
  InfografisPenguranganB,
  PicturePenguranganB,
} from "@/components/modul/SubBabB3Pengurangan";
import { CeritaPenjumlahanA, PETA_PIKIRAN_A2, IgilWajah } from "@/components/modul/gambar-penjumlahan-a2";
import {
  AbstractPenjumlahanA,
  ConcretePenjumlahanA,
  InfografisPenjumlahanA,
  PicturePenjumlahanA,
} from "@/components/modul/SubBabA2Penjumlahan";
import { CeritaCaraB, PETA_PIKIRAN_B2 } from "@/components/modul/gambar-cara-b2";
import {
  AbstractCaraB,
  ConcreteCaraB,
  InfografisCaraB,
  PictureCaraB,
} from "@/components/modul/SubBabB2Cara";
import { CeritaSoalC, PETA_PIKIRAN_C2 } from "@/components/modul/gambar-soal-cerita-c2";
import {
  AbstractSoalC,
  ConcreteSoalC,
  InfografisSoalC,
  PictureSoalC,
} from "@/components/modul/SubBabC2SoalCerita";
import GambarPensilCerita from "@/components/GambarPensilCerita";
import { IkonMainan } from "@/components/modul/ikon-mainan";
import { CeritaBandingB } from "@/components/modul/CeritaBandingB";
import { PetaPikiranB } from "@/components/modul/PetaPikiranB";
import { CeritaMajuMundurC, KatakWajah } from "@/components/modul/gambar-maju-mundur-c";
import { CeritaBilanganA, KelinciWajah } from "@/components/modul/gambar-bilangan-a";
import { CeritaPasanganD, PETA_PIKIRAN_D, TupaiWajah } from "@/components/modul/gambar-pasangan-d";
import {
  AbstractPasanganD,
  ConcretePasanganD,
  InfografisPasanganD,
  PicturePasanganD,
} from "@/components/modul/SubBabDPasangan";
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

type MainTabId = "silabus" | "materi" | "simulasi" | "latihan" | "ujian";
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
  /** Sub-bab yang naskah dan permainannya belum dibuat. */
  segeraHadir?: boolean;
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
  correctAnswer?: string;
  explanation?: string;
}

// ============================================================================
// DATA KURIKULUM EKSTRAKSI BUKU MATEMATIKA KELAS 1 SD BAB 1 (SMICPA)
// ============================================================================

/** Bab yang bisa diputar. Isinya dibaca dari berkas JSON bab (tanpa kunci jawaban). */
export type BabModul = "mtk-1-bab1" | "mtk-1-bab2" | "mtk-1-bab3" | "mtk-1-bab4" | "mtk-1-bab5" | "mtk-1-bab6";

interface MateriBab {
  /** Kode bab di server (mis. k1-mat-bab3). Dipakai untuk RPC Latihan dan Ujian. */
  chapter_id?: string;
  subjectLabel: string;
  title: string;
  tokens?: { practice: number; exam: number; practicum: number };
  subBabs: Record<string, SubBabContent>;
  practiceQuestions?: QuestionItem[];
  examQuestions?: QuestionItem[];
}

const MATERI_BAB: Record<BabModul, MateriBab> = {
  "mtk-1-bab1": materiBab1 as unknown as MateriBab,
  "mtk-1-bab2": materiBab2 as unknown as MateriBab,
  "mtk-1-bab3": materiBab3 as unknown as MateriBab,
  "mtk-1-bab4": materiBab4 as unknown as MateriBab,
  "mtk-1-bab5": materiBab5 as unknown as MateriBab,
  "mtk-1-bab6": materiBab6 as unknown as MateriBab,
};

const POIN_BAWAAN = { practice: 30, exam: 70, practicum: 50 };

const SUB_ANAK_BAB2: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "➕" },
  B: { emoji: "🧮" },
  C: { emoji: "📖" },
  D: { emoji: "🔁" },
};

const SUB_ANAK_BAB3: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "➖" },
  B: { emoji: "🧮" },
  C: { emoji: "🔁" },
  D: { emoji: "📖" },
};

const SUB_ANAK_BAB4: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔷" },
  B: { emoji: "🧺" },
  C: { emoji: "🧩" },
  D: { emoji: "⭐" },
};

const SUB_ANAK_BAB5: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔢" },
  B: { emoji: "↔️" },
  C: { emoji: "🏷️" },
  D: { emoji: "⚖️" },
};

const SUB_ANAK_BAB6: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔍" },
  B: { emoji: "➕" },
  C: { emoji: "➖" },
  D: { emoji: "🧮" },
};

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
  "sebelas",
  "dua belas",
  "tiga belas",
  "empat belas",
  "lima belas",
  "enam belas",
  "tujuh belas",
  "delapan belas",
  "sembilan belas",
  "dua puluh",
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
  const inggris =
    jumlah === 0
      ? "zero"
      : [
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
          "ten",
          "eleven",
          "twelve",
          "thirteen",
          "fourteen",
          "fifteen",
          "sixteen",
          "seventeen",
          "eighteen",
          "nineteen",
          "twenty",
        ][jumlah - 1];
  const dekat = jumlah === 6 ? ["anang", "enang"] : jumlah === 0 ? ["nul", "noll", "kosong"] : [];
  if (token.some((bagian) => bagian === kata || bagian === angka || bagian === inggris || dekat.includes(bagian))) return true;
  if (bersih.replace(/ /g, "").includes(kata.replace(/ /g, ""))) return true;
  if (kata.includes(" ")) return false;
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

/** `aktif` = warna tombol saat tab sedang dibuka. Tab yang tidak aktif berwarna putih. */
const TAB_ANAK: Record<MainTabId, { emoji: string; aktif: string }> = {
  silabus: { emoji: "🗺️", aktif: "#FF9FA8" },
  materi: { emoji: "📚", aktif: "#FFD84D" },
  simulasi: { emoji: "🧪", aktif: "#7FDBA3" },
  latihan: { emoji: "✏️", aktif: "#B8ADFF" },
  ujian: { emoji: "🏆", aktif: "#FFAE5C" },
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

export default function IgilModulePlayer({ bab = "mtk-1-bab1" }: { bab?: BabModul }) {
  const adaBab3 = bab === "mtk-1-bab3";
  const adaBab4 = bab === "mtk-1-bab4";
  const adaBab5 = bab === "mtk-1-bab5";
  const adaBab6 = bab === "mtk-1-bab6";
  /** Bab bergaya baru (Bab 2 sampai Bab 6): tanpa tab Simulasi, Latihan terbuka setelah materi tersedia selesai. */
  const adaBab2 = bab === "mtk-1-bab2" || adaBab3 || adaBab4 || adaBab5 || adaBab6;
  const materi = MATERI_BAB[bab];
  const SUB_BABS = materi.subBabs as Record<SubBabId, SubBabContent>;
  const daftarSub = Object.keys(materi.subBabs) as SubBabId[];
  const PRACTICE_QUESTIONS = materi.practiceQuestions ?? [];
  /** Kode bab di server. Soal Ujian tidak ada di berkas ini, hanya dikirim server saat ujian dimulai. */
  const idBabServer = materi.chapter_id ?? "";
  const profilBelajar = useProfilBelajar();
  const poin = materi.tokens ?? POIN_BAWAAN;
  const peta = adaBab6 ? SUB_ANAK_BAB6 : adaBab5 ? SUB_ANAK_BAB5 : adaBab4 ? SUB_ANAK_BAB4 : adaBab3 ? SUB_ANAK_BAB3 : adaBab2 ? SUB_ANAK_BAB2 : SUB_ANAK;
  /** Sub-bab yang sudah punya naskah dan permainan. Sub-bab "segera hadir" tidak menahan Latihan dan Ujian. */
  const daftarSubTersedia = daftarSub.filter((id) => !SUB_BABS[id].segeraHadir);

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
    hentikanSuaraGuruModul();
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
  /** Pilihan siswa per soal (teks). Tanpa server, hanya mencatat pilihan tanpa menilai. */
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  /** Hasil penilaian server per soal Latihan: benar atau salah dan pembahasan. */
  const [hasilLatihan, setHasilLatihan] = useState<Record<number, HasilLatihanServer>>({});
  const [sedangKirimLatihan, setSedangKirimLatihan] = useState<boolean>(false);
  const [pesanLatihan, setPesanLatihan] = useState<string>("");

  // 7. Ujian Formal (10 soal 100% HOTS, tanpa kamera): lembar dan nilai datang dari server.
  const [examScore, setExamScore] = useState<number | null>(null);

  // 9. Perhitungan Kartu Poin (Latihan 30 + Ujian 70 per bab, Praktikum 50 per blok 4 bab)
  // Latihan: poin terbit penuh (30) setelah semua soal terjawab dan dinilai server, tanpa
  // melihat berapa yang benar. Sama dengan aturan server (poin terbit sekali saat 10 jawaban masuk).
  const latihanSelesai =
    PRACTICE_QUESTIONS.length > 0 && PRACTICE_QUESTIONS.every((q) => hasilLatihan[q.id] !== undefined);
  const practiceTokens = latihanSelesai ? poin.practice : 0;
  const examTokens = examScore === 100 ? poin.exam : 0;
  const batasToken =
    poin.practice + poin.exam;
  // Bab 2: Latihan dan Ujian baru terbuka setelah semua sub-bab materi selesai.
  const materiSelesai = !adaBab2 || daftarSubTersedia.every((id) => completedSubBabs.includes(id));

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
    // Guru yang bersuara adalah guru pilihan siswa (Bu Sari atau Pak Budi) dari PilihGuru.
    ucapkanGuruModul(naskah, {
      kelas: "1 SD",
      selesai: selesai
        ? () => {
            if (giliran !== giliranSuara.current) return;
            if (lepasJedaCerita.current !== selesai) return;
            selesai();
            lepasJedaCerita.current = null;
          }
        : undefined,
    });
  }, []);

  useEffect(() => {
    window.speechSynthesis?.getVoices();
    return () => {
      hentikanSuaraGuruModul();
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
    const order = daftarSubTersedia;
    const currIdx = order.indexOf(activeSubBab);
    if (currIdx < order.length - 1) {
      const nextSub = order[currIdx + 1];
      setActiveSubBab(nextSub);
      window.scrollTo({ top: 0, behavior: "smooth" });
      speakGuru(
        `Selamat! Sub-Bab ${activeSubBab} selesai dan Target Pembelajaran di Silabus telah tercentang otomatis. Sekarang kita masuk ke Sub-Bab ${nextSub}.`
      );
    } else {
      setActiveMainTab(adaBab2 ? "latihan" : "simulasi");
      window.scrollTo({ top: 0, behavior: "smooth" });
      speakGuru(
        adaBab2
          ? "Luar biasa! Seluruh materi bab ini telah selesai. Sekarang ayo kita berlatih!"
          : "Luar biasa! Seluruh Sub-Bab A sampai D telah selesai. Sekarang ayo kita bereksperimen di Halaman Simulasi!"
      );
    }
  };

  const handlePrevSubBab = () => {
    const order = daftarSub;
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
  const subB2 = bab === "mtk-1-bab2" && activeSubBab === "B";
  const subC2 = bab === "mtk-1-bab2" && activeSubBab === "C";
  const subB3 = bab === "mtk-1-bab3" && activeSubBab === "B";
  const subA6 = bab === "mtk-1-bab6" && activeSubBab === "A";
  const subB6 = bab === "mtk-1-bab6" && activeSubBab === "B";
  const subA5 = bab === "mtk-1-bab5" && activeSubBab === "A";
  const subB5 = bab === "mtk-1-bab5" && activeSubBab === "B";
  const subC5 = bab === "mtk-1-bab5" && activeSubBab === "C";
  const subD5 = bab === "mtk-1-bab5" && activeSubBab === "D";
  const subB4 = bab === "mtk-1-bab4" && activeSubBab === "B";
  const subC4 = bab === "mtk-1-bab4" && activeSubBab === "C";
  const subC3 = bab === "mtk-1-bab3" && activeSubBab === "C";
  const subD3 = bab === "mtk-1-bab3" && activeSubBab === "D";
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
                <div className="space-y-1.5">
                  <h2 className="inline-block rounded-full border-2 border-white bg-[#FFE566] px-3 py-0.5 text-xs font-black uppercase tracking-wider text-[#1C01A5] md:text-sm">
                    {materi.subjectLabel}
                  </h2>
                  <h1 className="text-xl font-black leading-tight text-white [text-shadow:0_3px_0_rgba(0,0,0,0.3)] md:text-3xl">
                    {materi.title}
                  </h1>
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 sm:w-auto md:rounded-3xl md:border-4 md:border-[#F0AB00] md:px-4 md:py-2.5 md:shadow-[0_4px_0_rgba(240,171,0,0.7)]">
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#334155]">
                    KARTU POIN IGIL
                  </div>
                  <div className="flex items-center gap-2 text-xl font-black text-[#1C01A5] md:text-2xl">
                    <span className="igil-lompat inline-block text-3xl" aria-hidden="true">💰</span>
                    <span>{practiceTokens + examTokens}</span>
                    <span className="text-xs text-[#F0AB00]">/ {batasToken} Poin</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-black text-[#1C01A5]">
                    <span className="rounded-full bg-[#DDD8FF] px-2 py-0.5">
                      ✏️ <span className="hidden sm:inline">Latihan </span>{practiceTokens}/{poin.practice}
                    </span>
                    <span className="rounded-full bg-[#FFD9B0] px-2 py-0.5">
                      🏆 <span className="hidden sm:inline">Ujian </span>{examTokens}/{poin.exam}
                    </span>
                  </div>
                </div>
                <span className="igil-lompat block h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#F0AB00] bg-[#FFE566] md:h-16 md:w-16 md:border-4">
                  <img
                    src="/icon-192.png"
                    alt="burung hantu IGIL"
                    width={64}
                    height={64}
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
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
                { id: "silabus", label: "Silabus", keterangan: "Target & Capaian" },
                { id: "materi", label: "Materi", keterangan: "Metode SMICPA" },
                { id: "simulasi", label: "Simulasi", keterangan: "Metode PhET" },
                { id: "latihan", label: "Latihan", keterangan: "40% HOTS" },
                { id: "ujian", label: "Ujian", keterangan: "100% HOTS" },
              ] as { id: MainTabId; label: string; keterangan: string }[]
            )
              .filter((tab) => !(adaBab2 && tab.id === "simulasi"))
              .map((tab) => {
              const isActive = activeMainTab === tab.id;
              const gaya = TAB_ANAK[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActiveMainTab(tab.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    backgroundColor: isActive ? gaya.aktif : "#FFFFFF",
                    color: "#1C01A5",
                    borderColor: isActive ? "#FFE566" : "#FFFFFF",
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-left font-black transition-all md:border-4 md:px-4 md:py-2 ${
                    isActive
                      ? "scale-105 md:-translate-y-0.5 md:scale-110 md:shadow-[0_5px_0_#F0AB00]"
                      : "md:shadow-[0_3px_0_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <span className={`text-xl leading-none md:text-2xl ${isActive ? "igil-lompat" : ""}`} aria-hidden="true">
                    {gaya.emoji}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm md:text-base">{tab.label}</span>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wide opacity-75 md:text-xs">
                      {tab.keterangan}
                    </span>
                  </span>
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
                judul={adaBab4 ? "🌈 Fase A • Elemen Geometri (Kelas 1 SD/MI)" : "🌈 Fase A • Elemen Bilangan (Kelas 1 SD/MI)"}
                bicara={speakGuru}
                teksSuara={
                  subA6
                    ? "Kita belajar lebih dari, kurang dari, dan selisih. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh, bagian mengenal konsep lebih dari, kurang dari, dan selisih. Kita memasangkan benda satu-satu, menyebut lebihnya dan kurangnya, lalu mencari selisih dengan mengurangkan bilangan yang besar dengan bilangan yang kecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subB6
                    ? "Kita belajar penjumlahan yang hasilnya kurang dari dua puluh. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh, bagian penjumlahan. Kita menjumlahkan satuan dengan satuan dan puluhan dengan satuan, memakai cara menghitung maju, menghitung dengan sepuluh, penjumlahan berulang, pasangan bilangan, dan nilai tempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : adaBab6
                    ? "Kita belajar penjumlahan dan pengurangan sampai dua puluh. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subD5
                    ? "Kita belajar membandingkan bilangan. Bukunya bernama Ayo Membilang sampai dengan Dua Puluh, bagian membandingkan bilangan. Kita membandingkan dua kelompok dengan kata lebih banyak dan lebih sedikit, mencari yang paling banyak dan paling sedikit, lalu mengurutkan bilangan dari yang terkecil atau yang terbesar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subC5
                    ? "Kita belajar nilai tempat. Bukunya bernama Ayo Membilang sampai dengan Dua Puluh, bagian nilai tempat. Sepuluh benda yang digabungkan disebut satu puluhan. Benda yang tersisa disebut satuan. Kita mengisi tabel nilai tempat, membaca angka kiri sebagai puluhan dan angka kanan sebagai satuan, lalu menulis kalimatnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subB5
                    ? "Kita belajar menghitung maju dan mundur. Bukunya bernama Ayo Membilang sampai dengan Dua Puluh, bagian menghitung maju dan mundur. Menghitung maju berarti mulai dari bilangan kecil menuju bilangan besar. Menghitung mundur berarti mulai dari bilangan besar menuju bilangan kecil. Langkahnya selalu sama, satu demi satu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : adaBab5
                    ? "Kita belajar menghitung, membaca, dan menulis bilangan sampai dua puluh. Bukunya bernama Ayo Membilang sampai dengan Dua Puluh. Kita mengisi sepuluh dulu, lalu menghitung sisanya, membaca nama bilangan sebelas sampai dua puluh, dan menuliskan lambangnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subC4
                    ? "Kita belajar menyusun dan mengurai bentuk. Bukunya bernama Mengenal Bentuk, bagian menyusun dan mengurai bentuk bangun. Kita menggabungkan bentuk menjadi bangun baru, lalu menguraikannya kembali menjadi bagian-bagiannya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subB4
                    ? "Kita belajar mengelompokkan benda. Bukunya bernama Mengenal Bentuk, bagian mengelompokkan benda. Kita mengelompokkan benda menurut satu aturan, yaitu bentuk, warna, atau ukuran. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : adaBab4
                    ? "Kita belajar mengenal bentuk. Bukunya bernama Mengenal Bentuk. Kita mendeskripsikan benda berdasarkan bentuknya: bentuk lengkung, segitiga, dan segi empat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : adaBab3
                    ? "Kita belajar mengurangkan sampai sepuluh. Bukunya bernama Pengurangan sampai dengan Sepuluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol angka."
                    : adaBab2
                    ? "Kita belajar menjumlahkan sampai sepuluh. Bukunya bernama Penjumlahan sampai dengan Sepuluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol angka."
                    : "Kita belajar bilangan sampai sepuluh. Bukunya bernama Ayo Membilang sampai dengan Sepuluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol angka."
                }
              >
                <BarisIkon emoji="🧠" warna="#FFD6D6" judul="Capaian Pembelajaran (CP)">
                  {subA6 ? (
                    <>Siswa membandingkan dua kelompok benda dengan memasangkan satu-satu, menyatakan perbandingan dengan kata lebih dari, kurang dari, lebihnya, kurangnya, beda, dan selisih, serta mencari selisih dengan mengurangkan bilangan yang besar dengan bilangan yang kecil.</>
                  ) : subB6 ? (
                    <>Siswa menjumlahkan bilangan satuan dengan satuan dan bilangan puluhan dengan satuan yang hasilnya kurang dari 20 dengan berbagai cara, yaitu menghitung maju, menghitung dengan 10, penjumlahan berulang, pasangan bilangan, dan nilai tempat, serta menyelesaikan soal cerita penjumlahan.</>
                  ) : adaBab6 ? (
                    <>Siswa menyelesaikan penjumlahan dan pengurangan bilangan cacah sampai 20 dengan berbagai cara, serta menyelesaikan masalah yang berkaitan dengan lebih dari, kurang dari, dan selisih.</>
                  ) : subD5 ? (
                    <>Siswa membandingkan banyak benda dan bilangan sampai 20 dengan kata lebih banyak, lebih sedikit, dan sama banyak, menentukan yang paling banyak dan paling sedikit, serta mengurutkan bilangan dari yang terkecil dan dari yang terbesar.</>
                  ) : subC5 ? (
                    <>Siswa menyatakan sepuluh benda yang digabungkan sebagai satu puluhan dan benda yang tersisa sebagai satuan, mengisi tabel nilai tempat, membaca angka kiri sebagai puluhan dan angka kanan sebagai satuan, serta menulis kalimat nilai tempat bilangan 10 sampai 20.</>
                  ) : subB5 ? (
                    <>Siswa menghitung maju dan menghitung mundur dengan langkah yang sama pada bilangan sampai 20, menemukan bilangan yang hilang pada deret, menyebutkan bilangan sebelum, sesudah, dan di antara, serta menunjukkan maju dan mundur pada kisi dan garis bilangan.</>
                  ) : adaBab5 ? (
                    <>Siswa menghitung banyak benda sampai 20, membaca dan menulis lambang serta nama bilangan 11 sampai 20, menyatakannya sebagai sepuluh ditambah satuannya, dan memperkirakan banyak benda lalu membuktikannya dengan menghitung.</>
                  ) : subC4 ? (
                    <>Siswa menyusun beberapa bentuk menjadi bangun baru, menguraikan bangun menjadi bagian-bagiannya, menyebutkan jenis dan banyak bagian penyusunnya, serta menghitung banyak keping atau lidi yang dipakai.</>
                  ) : subB4 ? (
                    <>Siswa mengelompokkan benda di sekitarnya menurut satu aturan (bentuk, warna, atau ukuran), memberi nama kelompok, dan menghitung banyak anggota setiap kelompok.</>
                  ) : adaBab4 ? (
                    <>Siswa mendeskripsikan benda di sekitarnya berdasarkan bentuk (bentuk lengkung, segitiga, dan segi empat), menyebutkan ciri sisi dan sudutnya, serta mengelompokkan benda yang bentuknya sama.</>
                  ) : adaBab3 ? (
                    <>Siswa mengurangkan bilangan cacah sampai 10 dengan benda nyata, gambar, dan simbol, lalu menuliskannya sebagai kalimat matematika.</>
                  ) : adaBab2 ? (
                    <>Siswa menjumlahkan bilangan cacah sampai 10 dengan benda nyata, gambar, dan simbol, lalu menuliskannya sebagai kalimat matematika.</>
                  ) : (
                    <>Siswa menunjukkan pemahaman dan intuisi bilangan (<em>number sense</em>) pada bilangan cacah sampai 10.</>
                  )}
                </BarisIkon>
                <BarisIkon emoji="📖" warna="#FFE9A8" judul="Referensi Buku Resmi">
                  {subA6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, Sub-Bab A hlm. 176–182)."
                    : subB6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, Sub-Bab B hlm. 182–189)."
                    : adaBab6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, hlm. 175–196)."
                    : subD5
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 5: Ayo Membilang sampai dengan 20, Sub-Bab D hlm. 165–173)."
                    : subC5
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 5: Ayo Membilang sampai dengan 20, Sub-Bab C hlm. 160–164)."
                    : subB5
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 5: Ayo Membilang sampai dengan 20, Sub-Bab B hlm. 158–160)."
                    : adaBab5
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 5: Ayo Membilang sampai dengan 20, Sub-Bab A hlm. 147–158)."
                    : subC4
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 4: Mengenal Bentuk, Sub-Bab C hlm. 134–139)."
                    : subB4
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 4: Mengenal Bentuk, Sub-Bab B hlm. 127–133)."
                    : adaBab4
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 4: Mengenal Bentuk, Sub-Bab A hlm. 117–126)."
                    : adaBab3
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 3: Pengurangan sampai dengan 10)."
                    : adaBab2
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 2: Penjumlahan sampai dengan 10)."
                    : "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 10, Halaman 1–32)."}
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
                      token: poin.practice,
                      warna: "#DDD8FF",
                      isi: "10 soal terbimbing (LOTS 30%, MOTS 30%, HOTS 40%) lengkap dengan pembahasan langsung.",
                    },
                    {
                      emoji: "🏆",
                      nama: "Komponen Ujian Mandiri",
                      token: poin.exam,
                      warna: "#FFD9B0",
                      isi: "10 soal formal HOTS. Wajib meraih nilai sempurna 100/100 agar bab ini lulus.",
                    },
                    {
                      emoji: "🎨",
                      nama: "Praktikum Lintas 4 Bab",
                      token: poin.practicum,
                      warna: "#C8EAFB",
                      isi: "Satu tugas terpadu untuk empat bab. Terbuka setelah keempat bab lulus Ujian 100%, terbit sekali per blok, dinilai tertutup.",
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
                  📋 Bintang Kita: {completedSubBabs.length} dari {daftarSub.length} sub-bab
                </div>
                <div className="flex gap-1 text-3xl" aria-hidden="true">
                  {daftarSub.map((id) => (
                    <span key={id} className={completedSubBabs.includes(id) ? "igil-lompat" : "opacity-40"}>
                      {completedSubBabs.includes(id) ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 md:gap-4">
                {daftarSub.map((id) => {
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
                          {peta[id].emoji}
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
        <section className="w-[99%] mx-auto mt-3 bg-white px-1 md:px-3 space-y-5">
          {/* Tab sub-bab dan judul menempel di bawah tab utama */}
          <div
            className="sticky z-30 border-b border-slate-200 bg-white/95 py-2 backdrop-blur"
            style={{ top: batasTabSubBab }}
          >
            <div className="overflow-x-auto py-3">
              <div className="flex flex-nowrap items-center gap-2.5 min-w-max px-3">
                {daftarSub.map((subId) => {
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
                      aria-current={isSelected ? "true" : undefined}
                      style={{
                        backgroundColor: isSelected
                          ? `color-mix(in srgb, ${sub.secondaryBorder} 38%, white)`
                          : "#FFFFFF",
                        borderColor: isSelected ? sub.secondaryBorder : "#CBD5E1",
                        color: sub.secondaryText,
                        boxShadow: isSelected ? `0 4px 0 ${sub.secondaryBorder}` : undefined,
                      }}
                      className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border-2 py-1 pl-1 pr-4 text-sm font-black transition-all md:border-4 md:py-1.5 md:pl-1.5 md:text-base ${
                        isSelected ? "scale-105 md:scale-110" : ""
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xl md:h-10 md:w-10 md:border-4 ${
                          isSelected ? "igil-lompat" : ""
                        }`}
                        style={{ backgroundColor: sub.secondaryBorder }}
                        aria-hidden="true"
                      >
                        {peta[subId].emoji}
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

          {currentSubContent.segeraHadir ? (
            <div className="space-y-4 rounded-3xl border-4 border-dashed border-[#FFE566] bg-[#FFFDF2] p-8 text-center">
              <div className="igil-lompat text-6xl" aria-hidden="true">🚧</div>
              <h3 className="text-xl font-black text-[#1C01A5] md:text-2xl">
                Sub-Bab {activeSubBab} segera hadir
              </h3>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-[#334155] md:text-lg">
                Guru IGIL masih menyiapkan permainan untuk bagian ini. Sementara itu, kamu boleh main Sub-Bab {daftarSub[0]} lagi, ya.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubBab(daftarSub[0])}
                className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-sm font-black text-[#FFE566] md:text-base"
              >
                ⬅️ KEMBALI KE SUB-BAB {daftarSub[0]}
              </button>
            </div>
          ) : (
          <>
          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 1: STORY (3 GAMBAR DOODLE BERWARNA • TANPA TEKS) */}
          {/* --------------------------------------------------------------- */}
          <div className="space-y-3 border-b-2 border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-black text-xs">
                Tahap 1: Story
              </span>
            </div>

            {subA6 ? (
              <CeritaSelisihA speakGuru={speakGuru} />
            ) : subB6 ? (
              <CeritaTambahB speakGuru={speakGuru} />
            ) : subA5 ? (
              <CeritaBelasA speakGuru={speakGuru} />
            ) : subB5 ? (
              <CeritaUrutB speakGuru={speakGuru} />
            ) : subC5 ? (
              <CeritaNilaiC speakGuru={speakGuru} />
            ) : subD5 ? (
              <CeritaPerbandinganD speakGuru={speakGuru} />
            ) : subC2 ? (
              <CeritaSoalC speakGuru={speakGuru} />
            ) : subB2 ? (
              <CeritaCaraB speakGuru={speakGuru} />
            ) : subD3 ? (
              <CeritaSoalCeritaD speakGuru={speakGuru} />
            ) : subC3 ? (
              <CeritaHubunganC speakGuru={speakGuru} />
            ) : subB3 ? (
              <CeritaPenguranganB speakGuru={speakGuru} />
            ) : subC4 ? (
              <CeritaSusunC speakGuru={speakGuru} />
            ) : subB4 ? (
              <CeritaKelompokB speakGuru={speakGuru} />
            ) : adaBab4 ? (
              <CeritaBentukA speakGuru={speakGuru} />
            ) : adaBab3 ? (
              <CeritaPenguranganA speakGuru={speakGuru} />
            ) : adaBab2 ? (
              <CeritaPenjumlahanA speakGuru={speakGuru} />
            ) : activeSubBab === "A" ? (
              <CeritaBilanganA cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : activeSubBab === "B" ? (
              <CeritaBandingB cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : activeSubBab === "C" ? (
              <CeritaMajuMundurC cerita={currentSubContent.stories} speakGuru={speakGuru} />
            ) : activeSubBab === "D" ? (
              <CeritaPasanganD speakGuru={speakGuru} />
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

              {subC2 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_C2}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subB2 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_B2}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subD3 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_D3}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subC3 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_C3}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subB3 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_B3}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subA6 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_A6}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subB6 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_B6}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subA5 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_A5}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subB5 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_B5}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subC5 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_C5}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subD5 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_D5}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subC4 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_C4}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : subB4 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_B4}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : adaBab4 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_A4}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : adaBab3 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_A3}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : adaBab2 ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_A2}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<IgilWajah kelas="h-14 w-20 igil-lompat" />}
                />
              ) : activeSubBab === "A" ? (
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
              ) : activeSubBab === "D" ? (
                <PetaPikiranB
                  langkah={PETA_PIKIRAN_D}
                  judul={judulSubBab}
                  speakGuru={speakGuru}
                  maskot={<TupaiWajah kelas="h-14 w-20 igil-lompat" />}
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

              {subC2 ? (
                <InfografisSoalC speakGuru={speakGuru} />
              ) : subB2 ? (
                <InfografisCaraB speakGuru={speakGuru} />
              ) : subD3 ? (
                <InfografisSoalCeritaD speakGuru={speakGuru} />
              ) : subC3 ? (
                <InfografisHubunganC speakGuru={speakGuru} />
              ) : subB3 ? (
                <InfografisPenguranganB speakGuru={speakGuru} />
              ) : subA6 ? (
                <InfografisSelisihA speakGuru={speakGuru} />
              ) : subB6 ? (
                <InfografisTambahB speakGuru={speakGuru} />
              ) : subA5 ? (
                <InfografisBelasA speakGuru={speakGuru} />
              ) : subB5 ? (
                <InfografisUrutB speakGuru={speakGuru} />
              ) : subC5 ? (
                <InfografisNilaiC speakGuru={speakGuru} />
              ) : subD5 ? (
                <InfografisPerbandinganD speakGuru={speakGuru} />
              ) : subC4 ? (
                <InfografisSusunC speakGuru={speakGuru} />
              ) : subB4 ? (
                <InfografisKelompokB speakGuru={speakGuru} />
              ) : adaBab4 ? (
                <InfografisBentukA speakGuru={speakGuru} />
              ) : adaBab3 ? (
                <InfografisPenguranganA speakGuru={speakGuru} />
              ) : adaBab2 ? (
                <InfografisPenjumlahanA speakGuru={speakGuru} />
              ) : activeSubBab === "A" ? (
                <InfografisBilanganA speakGuru={speakGuru} />
              ) : activeSubBab === "B" ? (
                <InfografisBandingB speakGuru={speakGuru} />
              ) : activeSubBab === "C" ? (
                <InfografisMajuMundurC speakGuru={speakGuru} />
              ) : activeSubBab === "D" ? (
                <InfografisPasanganD speakGuru={speakGuru} />
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

              {subC2 ? (
                <ConcreteSoalC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : subB2 ? (
                <ConcreteCaraB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : subD3 ? (
                <ConcreteSoalCeritaD
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : subC3 ? (
                <ConcreteHubunganC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : subB3 ? (
                <ConcretePenguranganB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : subA6 ? (
                <ConcreteSelisihA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat selisih dalam diagram."
                    )
                  }
                />
              ) : subB6 ? (
                <ConcreteTambahB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat penjumlahan dalam diagram."
                    )
                  }
                />
              ) : subA5 ? (
                <ConcreteBelasA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat bilangannya dalam diagram."
                    )
                  }
                />
              ) : subB5 ? (
                <ConcreteUrutB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat maju dan mundur dalam diagram."
                    )
                  }
                />
              ) : subC5 ? (
                <ConcreteNilaiC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat puluhan dan satuan dalam diagram."
                    )
                  }
                />
              ) : subD5 ? (
                <ConcretePerbandinganD
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita bandingkan bilangan dalam diagram."
                    )
                  }
                />
              ) : subC4 ? (
                <ConcreteSusunC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat susunannya dalam diagram."
                    )
                  }
                />
              ) : subB4 ? (
                <ConcreteKelompokB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat kelompoknya dalam diagram."
                    )
                  }
                />
              ) : adaBab4 ? (
                <ConcreteBentukA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat bentuknya dalam diagram."
                    )
                  }
                />
              ) : adaBab3 ? (
                <ConcretePenguranganA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : adaBab2 ? (
                <ConcretePenjumlahanA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya."
                    )
                  }
                />
              ) : activeSubBab === "A" ? (
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
              ) : activeSubBab === "D" ? (
                <ConcretePasanganD
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

              {activeSubBab !== "A" && activeSubBab !== "B" && activeSubBab !== "C" && activeSubBab !== "D" ? (
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

              {subC2 ? (
                <PictureSoalC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : subB2 ? (
                <PictureCaraB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : subD3 ? (
                <PictureSoalCeritaD
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : subC3 ? (
                <PictureHubunganC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : subB3 ? (
                <PicturePenguranganB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : subA6 ? (
                <PictureSelisihA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita mencari selisih dengan angka dan tanda."
                    )
                  }
                />
              ) : subB6 ? (
                <PictureTambahB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita menjumlahkan dengan angka dan tanda."
                    )
                  }
                />
              ) : subA5 ? (
                <PictureBelasA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita baca dan tulis bilangannya dengan angka."
                    )
                  }
                />
              ) : subB5 ? (
                <PictureUrutB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita bermain dengan angka dan kata."
                    )
                  }
                />
              ) : subC5 ? (
                <PictureNilaiC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita baca dan tulis nilai tempat dengan angka."
                    )
                  }
                />
              ) : subD5 ? (
                <PicturePerbandinganD
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita membandingkan bilangan dengan angka dan tanda."
                    )
                  }
                />
              ) : subC4 ? (
                <PictureSusunC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita hitung dan tulis dengan angka."
                    )
                  }
                />
              ) : subB4 ? (
                <PictureKelompokB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita susun kalimat dan angka kelompok."
                    )
                  }
                />
              ) : adaBab4 ? (
                <PictureBentukA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan bentuk sudah selesai. Ayo kita kenali ciri-cirinya dengan kata dan angka."
                    )
                  }
                />
              ) : adaBab3 ? (
                <PicturePenguranganA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : adaBab2 ? (
                <PicturePenjumlahanA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya."
                    )
                  }
                />
              ) : activeSubBab === "A" ? (
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
              ) : activeSubBab === "D" ? (
                <PicturePasanganD
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tujuh kartu diagram sudah selesai. Ayo lihat lambang angkanya."
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

              {subC2 ? (
                <AbstractSoalC
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB2 ? (
                <AbstractCaraB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subD3 ? (
                <AbstractSoalCeritaD
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subC3 ? (
                <AbstractHubunganC
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB3 ? (
                <AbstractPenguranganB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subA6 ? (
                <AbstractSelisihA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB6 ? (
                <AbstractTambahB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subA5 ? (
                <AbstractBelasA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB5 ? (
                <AbstractUrutB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subC5 ? (
                <AbstractNilaiC
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subD5 ? (
                <AbstractPerbandinganD
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subC4 ? (
                <AbstractSusunC
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB4 ? (
                <AbstractKelompokB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : adaBab4 ? (
                <AbstractBentukA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : adaBab3 ? (
                <AbstractPenguranganA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : adaBab2 ? (
                <AbstractPenjumlahanA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : activeSubBab === "A" ? (
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
              ) : activeSubBab === "D" ? (
                <AbstractPasanganD
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
                  {activeSubBab !== daftarSubTersedia[daftarSubTersedia.length - 1]
                    ? `SELESAIKAN SUB-BAB ${activeSubBab} & LANJUTKAN ➡️`
                    : adaBab2
                      ? "SELESAIKAN MATERI & LANJUT KE LATIHAN ➡️"
                      : "SELESAIKAN MATERI & LANJUT KE SIMULASI ➡️"}
                </button>
              </div>
            </div>
          )}
          </>
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
      {(activeMainTab === "latihan" || activeMainTab === "ujian") && !materiSelesai && (
        <section className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-4 border-dashed border-[#FFE566] bg-[#FFFDF2] p-8 text-center">
          <div className="igil-lompat text-6xl" aria-hidden="true">🔒</div>
          <h2 className="text-xl font-black text-[#1C01A5] md:text-2xl">
            {activeMainTab === "latihan" ? "Latihan" : "Ujian"} terbuka setelah semua materi selesai
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#334155] md:text-lg">
            Selesaikan {daftarSubTersedia.length} sub-bab di tab Materi dulu, ya. Bintangmu sekarang{" "}
            {daftarSubTersedia.filter((id) => completedSubBabs.includes(id)).length} dari {daftarSubTersedia.length}.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveMainTab("materi");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-sm font-black text-[#FFE566] md:text-base"
          >
            KE MATERI ➡️
          </button>
        </section>
      )}

      {activeMainTab === "latihan" && materiSelesai && (
        <>
        <PanelProfilBelajar profil={profilBelajar} kembaliKe={`/ruang-belajar/${bab}`} />
        <section className="w-[98%] mx-auto mt-4 bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-3xl p-5 md:p-7 space-y-5">
          {(() => {
            const q = PRACTICE_QUESTIONS[practiceIdx];
            const chosen = practiceAnswers[q.id];
            const isAnswered = Boolean(chosen);
            const hasil = hasilLatihan[q.id];
            const adaKunci = Boolean(hasil);
            const isRight = hasil?.benar === true;
            const idAnakAktif = profilBelajar.status === "siap" ? (profilBelajar.aktif?.id ?? null) : null;
            const pilihJawaban = async (opt: string) => {
              if (isAnswered || sedangKirimLatihan) return;
              setPesanLatihan("");
              if (!idAnakAktif || !idBabServer) {
                // Server belum bisa menilai: catat pilihan saja, tanpa benar-salah.
                setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }));
                return;
              }
              setSedangKirimLatihan(true);
              const balasan = await kirimJawabanLatihan(idAnakAktif, idBabServer, q.id, q.options.indexOf(opt));
              setSedangKirimLatihan(false);
              if (balasan.jenis === "ok") {
                setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }));
                setHasilLatihan((prev) => ({ ...prev, [q.id]: balasan.hasil }));
              } else if (balasan.jenis === "belum_siap") {
                setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }));
              } else {
                setPesanLatihan(balasan.pesan);
              }
            };

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
                          <span className="text-center text-sm font-bold text-slate-500">
                            🦉 Baca soal dengan teliti, lalu pilih jawabannya.
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
                              disabled={isAnswered || sedangKirimLatihan}
                              onClick={() => void pilihJawaban(opt)}
                              className={`p-3.5 rounded-2xl font-black text-base border-2 transition-all ${
                                selected
                                  ? !adaKunci
                                    ? "bg-[#1C01A5] text-[#FFE566] border-[#FFE566]"
                                    : isRight
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

                      {sedangKirimLatihan ? (
                        <div className="p-3 rounded-2xl text-xs font-bold bg-[#EEF2FF] text-[#1C01A5]">
                          ⏳ Guru sedang memeriksa jawabanmu di server...
                        </div>
                      ) : null}
                      {pesanLatihan ? (
                        <div className="p-3 rounded-2xl text-xs font-bold bg-[#FEE2E2] text-[#991B1B]">{pesanLatihan}</div>
                      ) : null}
                      {isAnswered && !adaKunci ? (
                        <div className="p-3 rounded-2xl text-xs font-bold bg-[#EEF2FF] text-[#1C01A5]">
                          📝 Jawabanmu dicatat. Benar-salah dan pembahasan muncul setelah akunmu terhubung ke penilaian server.
                        </div>
                      ) : null}
                      {isAnswered && hasil ? (
                        <div
                          className={`p-3 rounded-2xl text-xs font-bold ${
                            isRight
                              ? "bg-[#DCFCE7] text-[#166534]"
                              : "bg-[#FEE2E2] text-[#991B1B]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span>
                              {isRight ? "✅ Benar! (+3 Poin): " : "💡 Pembahasan Guru: "}
                              {hasil.pembahasan}
                            </span>
                            <TombolSuaraGuru kecil label="Dengar" onClick={() => speakGuru(hasil.pembahasan)} />
                          </div>
                        </div>
                      ) : null}
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
        </>
      )}

      {/* =================================================================== */}
      {/* 5. HALAMAN UJIAN FORMAL (10 SOAL 100% HOTS • LATAR MERAH LEMBUT)    */}
      {/* =================================================================== */}
      {activeMainTab === "ujian" && materiSelesai && (
        <>
          <PanelProfilBelajar profil={profilBelajar} kembaliKe={`/ruang-belajar/${bab}`} />
          <UjianServer
            bab={bab}
            chapterId={idBabServer}
            profil={profilBelajar}
            bacakan={(teks) => speakGuru(teks)}
            onNilai={setExamScore}
          />
        </>
      )}

    </div>
  );
}