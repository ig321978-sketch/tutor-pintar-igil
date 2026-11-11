"use client";

import React, { useState, useEffect, useRef, useCallback, type ComponentType } from "react";
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
import materiBab7 from "@/data/kelas1-bab7.json";
import materiBab8 from "@/data/kelas1-bab8.json";
import materiK2Bab1 from "@/data/kelas2-bab1.json";
import materiK2Bab2 from "@/data/kelas2-bab2.json";
import materiK2Bab3 from "@/data/kelas2-bab3.json";
import materiK2Bab4 from "@/data/kelas2-bab4.json";
import { PETA_PIKIRAN_K2B4A, PETA_PIKIRAN_K2B4B } from "@/components/modul/kit-k2b4";
import { VideoK2B4A } from "@/components/modul/video-k2b4a";
import { VideoK2B4B } from "@/components/modul/video-k2b4b";
import { AbstractK2B4A, ConcreteK2B4A, InfografisK2B4AKomponen, PictureK2B4A } from "@/components/modul/SubBabK2B4A";
import { AbstractK2B4B, ConcreteK2B4B, InfografisK2B4BKomponen, PictureK2B4B } from "@/components/modul/SubBabK2B4B";
import materiK2Bab6 from "@/data/kelas2-bab6.json";
import materiK2Bab7 from "@/data/kelas2-bab7.json";
import materiK2Bab8 from "@/data/kelas2-bab8.json";
import { PETA_PIKIRAN_K2B6A, PETA_PIKIRAN_K2B6B } from "@/components/modul/kit-k2b6";
import { VideoK2B6A } from "@/components/modul/video-k2b6a";
import { VideoK2B6B } from "@/components/modul/video-k2b6b";
import { AbstractK2B6A, ConcreteK2B6A, InfografisK2B6AKomponen, PictureK2B6A } from "@/components/modul/SubBabK2B6A";
import { AbstractK2B6B, ConcreteK2B6B, InfografisK2B6BKomponen, PictureK2B6B } from "@/components/modul/SubBabK2B6B";
import { PETA_PIKIRAN_K2B7A, PETA_PIKIRAN_K2B7B } from "@/components/modul/kit-k2b7";
import { VideoK2B7A } from "@/components/modul/video-k2b7a";
import { VideoK2B7B } from "@/components/modul/video-k2b7b";
import { AbstractK2B7A, ConcreteK2B7A, InfografisK2B7AKomponen, PictureK2B7A } from "@/components/modul/SubBabK2B7A";
import { AbstractK2B7B, ConcreteK2B7B, InfografisK2B7BKomponen, PictureK2B7B } from "@/components/modul/SubBabK2B7B";
import { PETA_PIKIRAN_K2B8A, PETA_PIKIRAN_K2B8B } from "@/components/modul/kit-k2b8";
import { VideoK2B8A } from "@/components/modul/video-k2b8a";
import { VideoK2B8B } from "@/components/modul/video-k2b8b";
import { AbstractK2B8A, ConcreteK2B8A, InfografisK2B8AKomponen, PictureK2B8A } from "@/components/modul/SubBabK2B8A";
import { AbstractK2B8B, ConcreteK2B8B, InfografisK2B8BKomponen, PictureK2B8B } from "@/components/modul/SubBabK2B8B";
import materiK2Bab5 from "@/data/kelas2-bab5.json";
import { namaBilangan } from "@/components/modul/data-k2";
import { PETA_PIKIRAN_K2B5A, PETA_PIKIRAN_K2B5B, PETA_PIKIRAN_K2B5C } from "@/components/modul/kit-k2b5";
import { VideoK2B5A } from "@/components/modul/video-k2b5a";
import { VideoK2B5B } from "@/components/modul/video-k2b5b";
import { VideoK2B5C } from "@/components/modul/video-k2b5c";
import { AbstractK2B5A, ConcreteK2B5A, InfografisK2B5AKomponen, PictureK2B5A } from "@/components/modul/SubBabK2B5A";
import { AbstractK2B5B, ConcreteK2B5B, InfografisK2B5BKomponen, PictureK2B5B } from "@/components/modul/SubBabK2B5B";
import { AbstractK2B5C, ConcreteK2B5C, InfografisK2B5CKomponen, PictureK2B5C } from "@/components/modul/SubBabK2B5C";
import { PETA_PIKIRAN_K2B3A, PETA_PIKIRAN_K2B3B, PETA_PIKIRAN_K2B3C } from "@/components/modul/kit-k2b3";
import { VideoK2B3A } from "@/components/modul/video-k2b3a";
import { VideoK2B3B } from "@/components/modul/video-k2b3b";
import { VideoK2B3C } from "@/components/modul/video-k2b3c";
import { AbstractK2B3A, ConcreteK2B3A, InfografisK2B3AKomponen, PictureK2B3A } from "@/components/modul/SubBabK2B3A";
import { AbstractK2B3B, ConcreteK2B3B, InfografisK2B3BKomponen, PictureK2B3B } from "@/components/modul/SubBabK2B3B";
import { AbstractK2B3C, ConcreteK2B3C, InfografisK2B3CKomponen, PictureK2B3C } from "@/components/modul/SubBabK2B3C";
import { PETA_PIKIRAN_K2B2A, PETA_PIKIRAN_K2B2B, PETA_PIKIRAN_K2B2C } from "@/components/modul/kit-k2b2";
import { PopUpTahapSmicpa } from "@/components/modul/popup-tahap-smicpa";
import { VideoPenjumlahanK2B2A } from "@/components/modul/video-k2b2a";
import { VideoPenguranganK2B2B } from "@/components/modul/video-k2b2b";
import { VideoSoalCeritaK2B2C } from "@/components/modul/video-k2b2c";
import { AbstractK2B2A, ConcreteK2B2A, InfografisK2B2AKomponen, PictureK2B2A } from "@/components/modul/SubBabK2B2A";
import { AbstractK2B2B, ConcreteK2B2B, InfografisK2B2BKomponen, PictureK2B2B } from "@/components/modul/SubBabK2B2B";
import { AbstractK2B2C, ConcreteK2B2C, InfografisK2B2CKomponen, PictureK2B2C } from "@/components/modul/SubBabK2B2C";
import { PETA_PIKIRAN_K2A } from "@/components/modul/gambar-hitung-k2a";
import { VideoHitungK2A } from "@/components/modul/video-cerita-k2a";
import { VideoNilaiK2B } from "@/components/modul/video-cerita-k2b";
import { VideoBandingK2C } from "@/components/modul/video-cerita-k2c";
import { PETA_PIKIRAN_K2B } from "@/components/modul/gambar-nilai-k2b";
import { AbstractHitungK2A, ConcreteHitungK2A, InfografisHitungK2A, PictureHitungK2A } from "@/components/modul/SubBabK2AHitung";
import { AbstractNilaiK2B, ConcreteNilaiK2B, InfografisNilaiK2B, PictureNilaiK2B } from "@/components/modul/SubBabK2BNilai";
import { InfoSuaraGuru } from "@/components/modul/InfoSuaraGuru";
import { PETA_PIKIRAN_K2C } from "@/components/modul/gambar-banding-k2c";
import { AbstractBandingK2C, ConcreteBandingK2C, InfografisBandingK2C, PictureBandingK2C } from "@/components/modul/SubBabK2CBanding";
import { CeritaDataB, PETA_PIKIRAN_B8 } from "@/components/modul/gambar-data-b8";
import {
  AbstractDiagramB,
  ConcreteDiagramB,
  InfografisDiagramB,
  PictureDiagramB,
} from "@/components/modul/SubBabB8Diagram";
import PetaKonsep from "@/components/modul/PetaKonsep";
import InfografisRingkas from "@/components/modul/InfografisRingkas";
import {
  RINGKAS_BAB,
  SIMULASI_BAB,
  SIMULASI_MATERI,
  SIMULASI_MISI_AWAL,
  TAHAP_SIMULASI,
} from "@/components/modul/registri-simulasi";
import { CeritaDataA, PETA_PIKIRAN_A8 } from "@/components/modul/gambar-data-a8";
import {
  AbstractDataA,
  ConcreteDataA,
  InfografisDataA,
  PictureDataA,
} from "@/components/modul/SubBabA8Data";
import { CeritaUkurB, PETA_PIKIRAN_B7 } from "@/components/modul/gambar-ukur-b7";
import {
  AbstractUkurB,
  ConcreteUkurB,
  InfografisUkurB,
  PictureUkurB,
} from "@/components/modul/SubBabB7Ukur";
import { CeritaUkurA, PETA_PIKIRAN_A7 } from "@/components/modul/gambar-ukur-a7";
import {
  AbstractUkurA,
  ConcreteUkurA,
  InfografisUkurA,
  PictureUkurA,
} from "@/components/modul/SubBabA7Banding";
import { CeritaKurangC, PETA_PIKIRAN_C6 } from "@/components/modul/gambar-kurang-c6";
import {
  AbstractKurangC,
  ConcreteKurangC,
  InfografisKurangC,
  PictureKurangC,
} from "@/components/modul/SubBabC6Kurang";
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
/** Kode sub-bab: "A" sampai "I" (Kelas 3 sampai 6 punya sampai sembilan sub-bab). */
type SubBabId = string;
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
  /** Bahan halaman Silabus untuk bab yang membawa naskahnya sendiri di berkas JSON. */
  silabus?: { teksSuara: string; cp: string; referensi: string };
  /** Metode pedagogis dari luar buku, berlabel, dianyam ke Materi. */
  metodeLuar?: {
    label: "METODE LUAR";
    nama: string;
    namaId: string;
    asal: string;
    ringkas: string;
    tahap: ("Story" | "Mind" | "Infografis" | "Concrete" | "Picture" | "Abstract")[];
  }[];
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
export type BabLama = "mtk-1-bab1" | "mtk-1-bab2" | "mtk-1-bab3" | "mtk-1-bab4" | "mtk-1-bab5" | "mtk-1-bab6" | "mtk-1-bab7" | "mtk-1-bab8" | "mtk-2-bab1" | "mtk-2-bab2" | "mtk-2-bab3" | "mtk-2-bab4" | "mtk-2-bab5" | "mtk-2-bab6" | "mtk-2-bab7" | "mtk-2-bab8";

/**
 * Bab Kelas 3 sampai 6. Isinya TIDAK diimpor di sini: tiap bab membawa paketnya sendiri (data JSON dan komponen
 * tahapnya) yang dimuat malas lewat PemutarBabBaru dan registri-bab-baru.ts, supaya paket bab lain tidak ikut terunduh.
 */
export type BabBaru = `mtk-${3 | 4 | 5 | 6}-bab${number}`;

export type BabModul = BabLama | BabBaru;

export interface MateriBab {
  /** Kode bab di server (mis. k1-mat-bab3). Dipakai untuk RPC Latihan dan Ujian. */
  chapter_id?: string;
  subjectLabel: string;
  title: string;
  tokens?: { practice: number; exam: number; practicum: number };
  /** Judul elemen pada kartu Silabus. Bila ada, dipakai menggantikan judul bawaan. */
  silabusElemen?: string;
  /** Suara Guru murni Web Speech API perangkat: tanpa berkas audio statis dan tanpa pencatatan naskah. */
  suaraPerangkatSaja?: boolean;
  /** Laju bicara Web Speech (1 = normal). Bab Matematika Kelas 2 Bab 2 memakai 0,70. Hanya berlaku bersama suaraPerangkatSaja. */
  suaraLaju?: number;
  /** Nada Web Speech (1 = normal). Bab Matematika Kelas 2 Bab 2 memakai 1. */
  suaraNada?: number;
  subBabs: Record<string, SubBabContent>;
  practiceQuestions?: QuestionItem[];
  examQuestions?: QuestionItem[];
}

const MATERI_BAB: Record<BabLama, MateriBab> = {
  "mtk-1-bab1": materiBab1 as unknown as MateriBab,
  "mtk-1-bab2": materiBab2 as unknown as MateriBab,
  "mtk-1-bab3": materiBab3 as unknown as MateriBab,
  "mtk-1-bab4": materiBab4 as unknown as MateriBab,
  "mtk-1-bab5": materiBab5 as unknown as MateriBab,
  "mtk-1-bab6": materiBab6 as unknown as MateriBab,
  "mtk-1-bab7": materiBab7 as unknown as MateriBab,
  "mtk-1-bab8": materiBab8 as unknown as MateriBab,
  "mtk-2-bab1": materiK2Bab1 as unknown as MateriBab,
  "mtk-2-bab2": materiK2Bab2 as unknown as MateriBab,
  "mtk-2-bab3": materiK2Bab3 as unknown as MateriBab,
  "mtk-2-bab4": materiK2Bab4 as unknown as MateriBab,
  "mtk-2-bab5": materiK2Bab5 as unknown as MateriBab,
  "mtk-2-bab6": materiK2Bab6 as unknown as MateriBab,
  "mtk-2-bab7": materiK2Bab7 as unknown as MateriBab,
  "mtk-2-bab8": materiK2Bab8 as unknown as MateriBab,
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

const SUB_ANAK_BAB7: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "↕️" },
  B: { emoji: "📏" },
  C: { emoji: "🧮" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_BAB8: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🧺" },
  B: { emoji: "📊" },
  C: { emoji: "🧮" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B1: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔢" },
  B: { emoji: "🧱" },
  C: { emoji: "⚖️" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B2: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "➕" },
  B: { emoji: "➖" },
  C: { emoji: "📖" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B3: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🔷" },
  B: { emoji: "🧩" },
  C: { emoji: "🧊" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B4: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "📍" },
  B: { emoji: "🔄" },
  C: { emoji: "📖" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B5: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "🥞" },
  B: { emoji: "🔵" },
  C: { emoji: "🍕" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B8: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "📊" },
  B: { emoji: "⭐" },
  C: { emoji: "📖" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B7: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "💯" },
  B: { emoji: "⚖️" },
  C: { emoji: "📖" },
  D: { emoji: "🧮" },
};

const SUB_ANAK_K2B6: Record<SubBabId, { emoji: string }> = {
  A: { emoji: "⚖️" },
  B: { emoji: "⏰" },
  C: { emoji: "📖" },
  D: { emoji: "🧮" },
};

export type PropsTahapBaru = {
  speakGuru: (teks: string) => void;
  panel: PanelSuara;
  hentikan: () => void;
  gulir: () => void;
  onSelesai: () => void;
};

/**
 * Sub-bab yang membawa komponen tahapnya sendiri (cerita, peta pikiran, infografis, Concrete, Picture,
 * Abstract). Kuncinya "<bab>-<sub-bab>". Dipakai Matematika Kelas 2 Bab 1 dan seterusnya.
 */
export type ModulSubBab = {
  Cerita: ComponentType<{ speakGuru: (teks: string) => void }>;
  peta: typeof PETA_PIKIRAN_K2A;
  Infografis: ComponentType<{ speakGuru: (teks: string) => void }>;
  Concrete: ComponentType<PropsTahapBaru>;
  Picture: ComponentType<PropsTahapBaru>;
  Abstract: ComponentType<PropsTahapBaru>;
  /** Tampilkan uraian tiap langkah peta pikiran di layar (bukan hanya lewat suara). */
  uraianPeta?: boolean;
};

/** Paket satu bab Kelas 3 sampai 6: data JSON, komponen tiap sub-bab, dan ikon sub-bab. Dimuat malas. */
export type PaketBab = {
  materi: MateriBab;
  sub: Record<string, ModulSubBab>;
  emoji: Record<string, { emoji: string }>;
};

const MODUL_SUBBAB: Record<string, ModulSubBab> = {
  "mtk-2-bab1-A": { Cerita: VideoHitungK2A, peta: PETA_PIKIRAN_K2A, Infografis: InfografisHitungK2A, Concrete: ConcreteHitungK2A, Picture: PictureHitungK2A, Abstract: AbstractHitungK2A },
  "mtk-2-bab1-B": { Cerita: VideoNilaiK2B, peta: PETA_PIKIRAN_K2B, Infografis: InfografisNilaiK2B, Concrete: ConcreteNilaiK2B, Picture: PictureNilaiK2B, Abstract: AbstractNilaiK2B },
  "mtk-2-bab1-C": { Cerita: VideoBandingK2C, peta: PETA_PIKIRAN_K2C, Infografis: InfografisBandingK2C, Concrete: ConcreteBandingK2C, Picture: PictureBandingK2C, Abstract: AbstractBandingK2C },
  "mtk-2-bab2-A": { Cerita: VideoPenjumlahanK2B2A, peta: PETA_PIKIRAN_K2B2A, Infografis: InfografisK2B2AKomponen, Concrete: ConcreteK2B2A, Picture: PictureK2B2A, Abstract: AbstractK2B2A, uraianPeta: true },
  "mtk-2-bab2-B": { Cerita: VideoPenguranganK2B2B, peta: PETA_PIKIRAN_K2B2B, Infografis: InfografisK2B2BKomponen, Concrete: ConcreteK2B2B, Picture: PictureK2B2B, Abstract: AbstractK2B2B, uraianPeta: true },
  "mtk-2-bab2-C": { Cerita: VideoSoalCeritaK2B2C, peta: PETA_PIKIRAN_K2B2C, Infografis: InfografisK2B2CKomponen, Concrete: ConcreteK2B2C, Picture: PictureK2B2C, Abstract: AbstractK2B2C, uraianPeta: true },
  "mtk-2-bab3-A": { Cerita: VideoK2B3A, peta: PETA_PIKIRAN_K2B3A, Infografis: InfografisK2B3AKomponen, Concrete: ConcreteK2B3A, Picture: PictureK2B3A, Abstract: AbstractK2B3A, uraianPeta: true },
  "mtk-2-bab3-B": { Cerita: VideoK2B3B, peta: PETA_PIKIRAN_K2B3B, Infografis: InfografisK2B3BKomponen, Concrete: ConcreteK2B3B, Picture: PictureK2B3B, Abstract: AbstractK2B3B, uraianPeta: true },
  "mtk-2-bab3-C": { Cerita: VideoK2B3C, peta: PETA_PIKIRAN_K2B3C, Infografis: InfografisK2B3CKomponen, Concrete: ConcreteK2B3C, Picture: PictureK2B3C, Abstract: AbstractK2B3C, uraianPeta: true },
  "mtk-2-bab4-A": { Cerita: VideoK2B4A, peta: PETA_PIKIRAN_K2B4A, Infografis: InfografisK2B4AKomponen, Concrete: ConcreteK2B4A, Picture: PictureK2B4A, Abstract: AbstractK2B4A, uraianPeta: true },
  "mtk-2-bab4-B": { Cerita: VideoK2B4B, peta: PETA_PIKIRAN_K2B4B, Infografis: InfografisK2B4BKomponen, Concrete: ConcreteK2B4B, Picture: PictureK2B4B, Abstract: AbstractK2B4B, uraianPeta: true },
  "mtk-2-bab5-A": { Cerita: VideoK2B5A, peta: PETA_PIKIRAN_K2B5A, Infografis: InfografisK2B5AKomponen, Concrete: ConcreteK2B5A, Picture: PictureK2B5A, Abstract: AbstractK2B5A, uraianPeta: true },
  "mtk-2-bab5-B": { Cerita: VideoK2B5B, peta: PETA_PIKIRAN_K2B5B, Infografis: InfografisK2B5BKomponen, Concrete: ConcreteK2B5B, Picture: PictureK2B5B, Abstract: AbstractK2B5B, uraianPeta: true },
  "mtk-2-bab5-C": { Cerita: VideoK2B5C, peta: PETA_PIKIRAN_K2B5C, Infografis: InfografisK2B5CKomponen, Concrete: ConcreteK2B5C, Picture: PictureK2B5C, Abstract: AbstractK2B5C, uraianPeta: true },
  "mtk-2-bab6-A": { Cerita: VideoK2B6A, peta: PETA_PIKIRAN_K2B6A, Infografis: InfografisK2B6AKomponen, Concrete: ConcreteK2B6A, Picture: PictureK2B6A, Abstract: AbstractK2B6A, uraianPeta: true },
  "mtk-2-bab6-B": { Cerita: VideoK2B6B, peta: PETA_PIKIRAN_K2B6B, Infografis: InfografisK2B6BKomponen, Concrete: ConcreteK2B6B, Picture: PictureK2B6B, Abstract: AbstractK2B6B, uraianPeta: true },
  "mtk-2-bab7-A": { Cerita: VideoK2B7A, peta: PETA_PIKIRAN_K2B7A, Infografis: InfografisK2B7AKomponen, Concrete: ConcreteK2B7A, Picture: PictureK2B7A, Abstract: AbstractK2B7A, uraianPeta: true },
  "mtk-2-bab7-B": { Cerita: VideoK2B7B, peta: PETA_PIKIRAN_K2B7B, Infografis: InfografisK2B7BKomponen, Concrete: ConcreteK2B7B, Picture: PictureK2B7B, Abstract: AbstractK2B7B, uraianPeta: true },
  "mtk-2-bab8-A": { Cerita: VideoK2B8A, peta: PETA_PIKIRAN_K2B8A, Infografis: InfografisK2B8AKomponen, Concrete: ConcreteK2B8A, Picture: PictureK2B8A, Abstract: AbstractK2B8A, uraianPeta: true },
  "mtk-2-bab8-B": { Cerita: VideoK2B8B, peta: PETA_PIKIRAN_K2B8B, Infografis: InfografisK2B8BKomponen, Concrete: ConcreteK2B8B, Picture: PictureK2B8B, Abstract: AbstractK2B8B, uraianPeta: true },
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
  const kata = namaBilangan(jumlah);
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
  // "empat belas" bukan "empat": bilangan tunggal yang diikuti belas/puluh/ratus/ribu bilangan lain.
  const sambungan = ["belas", "puluh", "ratus", "ribu"];
  const berdiri = (i: number) => !sambungan.includes(token[i + 1] ?? "");
  if (token.some((bagian, i) => (bagian === kata || bagian === angka || bagian === inggris || dekat.includes(bagian)) && berdiri(i))) return true;
  // Pengenal suara kadang menulis "14" sebagai "4 belas".
  if (jumlah >= 11 && jumlah <= 19 && token.some((bagian, i) => bagian === String(jumlah - 10) && token[i + 1] === "belas")) return true;
  const gabung = bersih.replace(/ /g, "");
  const tanpaSambungan = kata.includes(" ") ? gabung : gabung.replace(new RegExp(`${kata}(belas|puluh|ratus|ribu)`, "g"), "");
  if (tanpaSambungan.includes(kata.replace(/ /g, ""))) return true;
  if (kata.includes(" ")) return false;
  return token.some((bagian, i) => bagian.length >= 3 && jarakHuruf(bagian, kata) <= 1 && berdiri(i));
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

/** Daftar tahap SMISCPA (tujuh): Simulasi menyisip antara Infografis dan Concrete. */
const TAHAP_SILABUS_SMISCPA = [
  TAHAP_SILABUS[0],
  { emoji: "🗺️", nama: "Mind-Map (Peta Konsep)", warna: "#FFE9A8" },
  { emoji: "📊", nama: "Infografis (Ketuk dan Bandingkan)", warna: "#CDEFD8" },
  { emoji: "🧪", nama: "Simulasi (Laboratorium)", warna: "#FBD5F0" },
  TAHAP_SILABUS[3],
  TAHAP_SILABUS[4],
  TAHAP_SILABUS[5],
];

/** Registri SIMULASI_MATERI, RINGKAS_BAB, SIMULASI_BAB, TAHAP_SIMULASI ada di modul/registri-simulasi.ts. Peta file: naskah/igil-module-player-peta.md. */
export default function IgilModulePlayer({ bab = "mtk-1-bab1", paket }: { bab?: BabModul; paket?: PaketBab }) {
  const adaBab3 = bab === "mtk-1-bab3";
  const adaBab4 = bab === "mtk-1-bab4";
  const adaBab5 = bab === "mtk-1-bab5";
  const adaBab6 = bab === "mtk-1-bab6";
  const adaBab7 = bab === "mtk-1-bab7";
  const adaBab8 = bab === "mtk-1-bab8";
  const adaK2B1 = bab === "mtk-2-bab1";
  const adaK2B2 = bab === "mtk-2-bab2";
  const adaK2B3 = bab === "mtk-2-bab3";
  const adaK2B4 = bab === "mtk-2-bab4";
  const adaK2B5 = bab === "mtk-2-bab5";
  const adaK2B6 = bab === "mtk-2-bab6";
  const adaK2B7 = bab === "mtk-2-bab7";
  const adaK2B8 = bab === "mtk-2-bab8";
  /** Bab bergaya baru (Bab 2 sampai Bab 8): Latihan terbuka setelah materi tersedia selesai. */
  const adaBab2 = bab === "mtk-1-bab2" || adaBab3 || adaBab4 || adaBab5 || adaBab6 || adaBab7 || adaBab8 || adaK2B1 || adaK2B2 || adaK2B3 || adaK2B4 || adaK2B5 || adaK2B6 || adaK2B7 || adaK2B8 || paket !== undefined;
  /** Tab Simulasi tampil hanya di bab yang sudah punya simulasi (lihat SIMULASI_BAB). */
  const SimulasiBab = SIMULASI_BAB[bab];
  const adaTabSimulasi = SimulasiBab !== undefined;
  /** Bab pilot SMISCPA: tahap Simulasi ada di dalam Materi (tahap 4), dan tab Simulasi tidak ada. */
  const SimulasiMateri = SIMULASI_MATERI[bab];
  const adaSimMateri = SimulasiMateri !== undefined;
  const jumlahTahap = adaSimMateri ? 7 : 6;
  const geserTahap = adaSimMateri ? 1 : 0;
  const namaMetode = adaSimMateri ? "SMISCPA" : "SMICPA";
  const daftarTahapSilabus = adaSimMateri ? TAHAP_SILABUS_SMISCPA : TAHAP_SILABUS;
  const materi = paket ? paket.materi : MATERI_BAB[bab as BabLama];
  const SUB_BABS = materi.subBabs as Record<SubBabId, SubBabContent>;
  const daftarSub = Object.keys(materi.subBabs) as SubBabId[];
  const PRACTICE_QUESTIONS = materi.practiceQuestions ?? [];
  /** Bab yang soal Latihan dan Ujiannya belum ditulis (Materi saja) menampilkan kartu "sedang disiapkan". */
  const soalSiap = PRACTICE_QUESTIONS.length > 0;
  /** Kode bab di server. Soal Ujian tidak ada di berkas ini, hanya dikirim server saat ujian dimulai. */
  const idBabServer = materi.chapter_id ?? "";
  const profilBelajar = useProfilBelajar();
  const poin = materi.tokens ?? POIN_BAWAAN;
  const peta = paket ? paket.emoji : adaK2B8 ? SUB_ANAK_K2B8 : adaK2B7 ? SUB_ANAK_K2B7 : adaK2B6 ? SUB_ANAK_K2B6 : adaK2B5 ? SUB_ANAK_K2B5 : adaK2B4 ? SUB_ANAK_K2B4 : adaK2B3 ? SUB_ANAK_K2B3 : adaK2B2 ? SUB_ANAK_K2B2 : adaK2B1 ? SUB_ANAK_K2B1 : adaBab8 ? SUB_ANAK_BAB8 : adaBab7 ? SUB_ANAK_BAB7 : adaBab6 ? SUB_ANAK_BAB6 : adaBab5 ? SUB_ANAK_BAB5 : adaBab4 ? SUB_ANAK_BAB4 : adaBab3 ? SUB_ANAK_BAB3 : adaBab2 ? SUB_ANAK_BAB2 : SUB_ANAK;
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
  // Mulai dari Story saja; isi tahap hanya dipasang di pop-up saat dibuka (hemat memori + layar desktop).
  const [unlockedSmicpaStage, setUnlockedSmicpaStage] = useState<number>(1); // 1=Story .. 6=Abstract
  const [popupTahap, setPopupTahap] = useState<number | null>(null);
  const [concreteCounter, setConcreteCounter] = useState<number>(3);

  // Ref untuk auto-scroll mulus saat tombol floating-end LANJUTKAN diklik
  const tabUtamaRef = useRef<HTMLDivElement | null>(null);
  const [batasTabSubBab, setBatasTabSubBab] = useState(74);
  const mindMapRef = useRef<HTMLDivElement | null>(null);
  const infografisRef = useRef<HTMLDivElement | null>(null);
  const simulasiRef = useRef<HTMLDivElement | null>(null);
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

  // 5. Halaman Simulasi tidak punya state di sini: tiap bab punya komponennya sendiri (SIMULASI_BAB).

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
  // SUARA GURU IGIL — audio statis yang dibuat sekali saat penulisan (public/audio-guru),
  // dengan cadangan Web Speech API di peramban. Siswa tidak memanggil layanan suara berbayar.
  // ============================================================================

  const lepasJedaCerita = useRef<(() => void) | null>(null);

  // PILOT suara seragam: Materi Kelas 1 Bab 1 Sub-Bab A saja. Semua pemutar suara di sana memakai satu jalur
  // (Web Speech API id-ID, laju 0,85, nada lembut) dengan guru pilihan siswa. Bagian lain tidak berubah.
  const suaraSeragam = bab === "mtk-1-bab1" && activeSubBab === "A" && activeMainTab === "materi";

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
      kelas: materi.suaraPerangkatSaja ? "2 SD" : "1 SD",
      perangkatSaja: materi.suaraPerangkatSaja === true,
      laju: materi.suaraLaju,
      nada: materi.suaraNada,
      seragam: suaraSeragam,
      selesai: selesai
        ? () => {
            if (giliran !== giliranSuara.current) return;
            if (lepasJedaCerita.current !== selesai) return;
            selesai();
            lepasJedaCerita.current = null;
          }
        : undefined,
    });
  }, [materi.suaraPerangkatSaja, materi.suaraLaju, materi.suaraNada, suaraSeragam]);

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
    _targetRef: React.RefObject<HTMLDivElement | null>,
    voiceAnnouncement: string
  ) => {
    setUnlockedSmicpaStage((prev) => Math.max(prev, nextStageNumber));
    setPopupTahap(nextStageNumber);
    speakGuru(voiceAnnouncement);
  };

  useEffect(() => {
    setUnlockedSmicpaStage(1);
    setPopupTahap(null);
  }, [activeSubBab]);

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
  const modulBaru = paket ? paket.sub[activeSubBab] : MODUL_SUBBAB[`${bab}-${activeSubBab}`];
  /** Data Mind-Map dan Infografis ringkas untuk sub-bab aktif (hanya bab pilot SMISCPA). */
  const ringkasSub = adaSimMateri ? RINGKAS_BAB[bab]?.[activeSubBab] : undefined;
  const subB2 = bab === "mtk-1-bab2" && activeSubBab === "B";
  const subC2 = bab === "mtk-1-bab2" && activeSubBab === "C";
  const subB3 = bab === "mtk-1-bab3" && activeSubBab === "B";
  const subA8 = bab === "mtk-1-bab8" && activeSubBab === "A";
  const subB8 = bab === "mtk-1-bab8" && activeSubBab === "B";
  const subA7 = bab === "mtk-1-bab7" && activeSubBab === "A";
  const subB7 = bab === "mtk-1-bab7" && activeSubBab === "B";
  const subA6 = bab === "mtk-1-bab6" && activeSubBab === "A";
  const subB6 = bab === "mtk-1-bab6" && activeSubBab === "B";
  const subC6 = bab === "mtk-1-bab6" && activeSubBab === "C";
  const subA5 = bab === "mtk-1-bab5" && activeSubBab === "A";
  const subB5 = bab === "mtk-1-bab5" && activeSubBab === "B";
  const subC5 = bab === "mtk-1-bab5" && activeSubBab === "C";
  const subD5 = bab === "mtk-1-bab5" && activeSubBab === "D";
  const subB4 = bab === "mtk-1-bab4" && activeSubBab === "B";
  const subC4 = bab === "mtk-1-bab4" && activeSubBab === "C";
  const subC3 = bab === "mtk-1-bab3" && activeSubBab === "C";
  const subD3 = bab === "mtk-1-bab3" && activeSubBab === "D";
  const judulSubBab = currentSubContent.fullTitle.split(": ").slice(1).join(": ");
  /** Gaya visual Mind-Map berbeda per kelas SD (1–6). */
  const kelasPeta = (Math.min(6, Math.max(1, Number(/^mtk-(\d+)/.exec(bab)?.[1] ?? 1))) || 1) as 1 | 2 | 3 | 4 | 5 | 6;
  const langkahPeta = modulBaru
    ? modulBaru.peta
    : subC2
      ? PETA_PIKIRAN_C2
      : subB2
        ? PETA_PIKIRAN_B2
        : subD3
          ? PETA_PIKIRAN_D3
          : subC3
            ? PETA_PIKIRAN_C3
            : subB3
              ? PETA_PIKIRAN_B3
              : subA8
                ? PETA_PIKIRAN_A8
                : subB8
                  ? PETA_PIKIRAN_B8
                  : subA7
                    ? PETA_PIKIRAN_A7
                    : subB7
                      ? PETA_PIKIRAN_B7
                      : subA6
                        ? PETA_PIKIRAN_A6
                        : subB6
                          ? PETA_PIKIRAN_B6
                          : subC6
                            ? PETA_PIKIRAN_C6
                            : subA5
                              ? PETA_PIKIRAN_A5
                              : subB5
                                ? PETA_PIKIRAN_B5
                                : subC5
                                  ? PETA_PIKIRAN_C5
                                  : subD5
                                    ? PETA_PIKIRAN_D5
                                    : subC4
                                      ? PETA_PIKIRAN_C4
                                      : subB4
                                        ? PETA_PIKIRAN_B4
                                        : adaBab4
                                          ? PETA_PIKIRAN_A4
                                          : adaBab3
                                            ? PETA_PIKIRAN_A3
                                            : adaBab2
                                              ? PETA_PIKIRAN_A2
                                              : activeSubBab === "D"
                                                ? PETA_PIKIRAN_D
                                                : currentSubContent.mindMaps;
  const maskotPeta = modulBaru || subC2 || subB2 || subD3 || subC3 || subB3 || subA8 || subB8 || subA7 || subB7 || subA6 || subB6 || subC6 || subA5 || subB5 || subC5 || subD5 || subC4 || subB4 || adaBab4 || adaBab3 || adaBab2 ? (
    <IgilWajah kelas="h-14 w-20 igil-lompat" />
  ) : activeSubBab === "A" ? (
    <KelinciWajah kelas="h-14 w-20 igil-lompat" />
  ) : activeSubBab === "C" ? (
    <KatakWajah kelas="h-14 w-20 igil-lompat" />
  ) : activeSubBab === "D" ? (
    <TupaiWajah kelas="h-14 w-20 igil-lompat" />
  ) : undefined;

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
                { id: "materi", label: "Materi", keterangan: `Metode ${namaMetode}` },
                { id: "simulasi", label: "Simulasi", keterangan: "Lab Interaktif" },
                { id: "latihan", label: "Latihan", keterangan: "40% HOTS" },
                { id: "ujian", label: "Ujian", keterangan: "100% HOTS" },
              ] as { id: MainTabId; label: string; keterangan: string }[]
            )
              .filter((tab) => adaTabSimulasi || tab.id !== "simulasi")
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
                judul={materi.silabusElemen ? materi.silabusElemen : adaBab4 ? "🌈 Fase A • Elemen Geometri (Kelas 1 SD/MI)" : adaBab7 ? "🌈 Fase A • Elemen Pengukuran (Kelas 1 SD/MI)" : adaBab8 ? "🌈 Fase A • Elemen Analisis Data (Kelas 1 SD/MI)" : "🌈 Fase A • Elemen Bilangan (Kelas 1 SD/MI)"}
                bicara={speakGuru}
                teksSuara={
                  currentSubContent.silabus
                    ? currentSubContent.silabus.teksSuara
                    : subA8
                    ? "Kita belajar mengelompokkan data. Bukunya bernama Mengenal Diagram, bagian mengelompokkan data. Kita mengelompokkan benda yang sama, menghitungnya dengan turus, menuliskannya dalam daftar, lalu menyajikannya dalam tabel yang punya baris dan kolom. Kita juga belajar membaca yang paling banyak, yang paling sedikit, dan jumlah semuanya. Kita melewati tujuh tahap seru: cerita, peta pikiran, infografis, simulasi, benda nyata, gambar, dan simbol."
                    : subB8
                    ? "Kita belajar diagram gambar. Bukunya bernama Mengenal Diagram, bagian diagram gambar. Satu gambar mewakili satu data. Kita membuat dan membaca diagram gambar yang tegak maupun mendatar, membandingkan data dengan kata paling banyak dan paling sedikit, dan menghitung jumlah semuanya. Kita melewati tujuh tahap seru: cerita, peta pikiran, infografis, simulasi, benda nyata, gambar, dan simbol."
                    : adaBab8
                    ? "Kita belajar mengenal diagram. Bukunya bernama Mengenal Diagram. Kita melewati tujuh tahap seru: cerita, peta pikiran, infografis, simulasi, benda nyata, gambar, dan simbol."
                    : subA7
                    ? "Kita belajar membandingkan dan mengurutkan panjang benda. Bukunya bernama Mengukur Panjang Benda, bagian membandingkan dan mengurutkan panjang benda. Kita membandingkan tinggi dan panjang dengan kata lebih tinggi, lebih pendek, sama tinggi, paling tinggi, dan paling pendek, lalu mengurutkan benda dari yang paling pendek atau paling tinggi. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subB7
                    ? "Kita belajar mengukur panjang benda. Bukunya bernama Mengukur Panjang Benda, bagian mengukur panjang benda. Kita mengukur dengan jengkal, telapak kaki, stik es krim, sedotan, koin, dan benda lain di sekitar kita, dengan cara yang benar: mulai dari ujung, rapat, tidak bertumpuk, dan tidak miring. Kita juga menebak dulu sebelum mengukur. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : adaBab7
                    ? "Kita belajar mengukur panjang benda. Bukunya bernama Mengukur Panjang Benda. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subA6
                    ? "Kita belajar lebih dari, kurang dari, dan selisih. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh, bagian mengenal konsep lebih dari, kurang dari, dan selisih. Kita memasangkan benda satu-satu, menyebut lebihnya dan kurangnya, lalu mencari selisih dengan mengurangkan bilangan yang besar dengan bilangan yang kecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subB6
                    ? "Kita belajar penjumlahan yang hasilnya kurang dari dua puluh. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh, bagian penjumlahan. Kita menjumlahkan satuan dengan satuan dan puluhan dengan satuan, memakai cara menghitung maju, menghitung dengan sepuluh, penjumlahan berulang, pasangan bilangan, dan nilai tempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
                    : subC6
                    ? "Kita belajar pengurangan yang hasilnya kurang dari dua puluh. Bukunya bernama Penjumlahan dan Pengurangan sampai dengan Dua Puluh, bagian pengurangan. Kita mengurangkan bilangan satuan dari bilangan belasan dengan menghitung mundur, pasangan bilangan, dan nilai tempat, lalu memeriksa hasilnya dengan penjumlahan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol."
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
                  {currentSubContent.silabus ? (
                    <>{currentSubContent.silabus.cp}</>
                  ) : subA8 ? (
                    <>Siswa mengelompokkan benda menurut jenisnya, menghitung dengan turus, menyajikan data dalam daftar dan tabel (menurun dan mendatar), menyebutkan baris dan kolom, serta membaca data untuk menentukan yang paling banyak, paling sedikit, sama banyak, selisih, dan jumlah semuanya.</>
                  ) : subB8 ? (
                    <>Siswa membaca dan membuat diagram gambar tegak dan mendatar dengan satu gambar mewakili satu data, menyebutkan bagian diagram, membandingkan dan menghitung data pada diagram, serta mengumpulkan data sendiri lalu menyajikannya dalam tabel dan diagram gambar.</>
                  ) : adaBab8 ? (
                    <>Siswa mengumpulkan, menyajikan, dan membaca data dalam daftar, tabel, dan diagram gambar.</>
                  ) : subA7 ? (
                    <>Siswa membandingkan tinggi dan panjang dua benda dengan kata lebih tinggi, lebih pendek, lebih panjang, dan sama tinggi, membandingkan tiga benda atau lebih dengan kata paling tinggi, paling pendek, dan paling panjang, mengurutkan benda, membandingkan posisi benda dengan kata lebih rendah dan paling rendah, serta menyadari bahwa benda dibandingkan dari garis awal yang sama.</>
                  ) : subB7 ? (
                    <>Siswa mengukur panjang benda dengan satuan tidak baku seperti jengkal, telapak kaki, depa, stik es krim, pensil, koin, sedotan, dan penjepit kertas, mengukur dengan cara yang benar, menulis hasil dengan angka dan nama alat ukur, menjelaskan mengapa alat ukur yang berbeda memberi hasil yang berbeda, serta menebak panjang sebelum mengukur.</>
                  ) : adaBab7 ? (
                    <>Siswa membandingkan, mengurutkan, dan mengukur panjang benda dengan satuan tidak baku, serta menjelaskan hasil pengukurannya.</>
                  ) : subA6 ? (
                    <>Siswa membandingkan dua kelompok benda dengan memasangkan satu-satu, menyatakan perbandingan dengan kata lebih dari, kurang dari, lebihnya, kurangnya, beda, dan selisih, serta mencari selisih dengan mengurangkan bilangan yang besar dengan bilangan yang kecil.</>
                  ) : subB6 ? (
                    <>Siswa menjumlahkan bilangan satuan dengan satuan dan bilangan puluhan dengan satuan yang hasilnya kurang dari 20 dengan berbagai cara, yaitu menghitung maju, menghitung dengan 10, penjumlahan berulang, pasangan bilangan, dan nilai tempat, serta menyelesaikan soal cerita penjumlahan.</>
                  ) : subC6 ? (
                    <>Siswa mengurangkan bilangan satuan dari bilangan belasan yang hasilnya kurang dari 20 dengan berbagai cara, yaitu menghitung mundur, pasangan bilangan, dan nilai tempat, memeriksa hasil pengurangan dengan penjumlahan, serta menyelesaikan soal cerita pengurangan.</>
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
                  {currentSubContent.silabus
                    ? currentSubContent.silabus.referensi
                    : subA8
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 8: Mengenal Diagram, Sub-Bab A hlm. 221–228)."
                    : subB8
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 8: Mengenal Diagram, Sub-Bab B hlm. 229–241)."
                    : adaBab8
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 8: Mengenal Diagram, hlm. 219–242)."
                    : subA7
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 7: Mengukur Panjang Benda, Sub-Bab A hlm. 199–207)."
                    : subB7
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 7: Mengukur Panjang Benda, Sub-Bab B hlm. 208–218)."
                    : adaBab7
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 7: Mengukur Panjang Benda, hlm. 197–218)."
                    : subA6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, Sub-Bab A hlm. 176–182)."
                    : subB6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, Sub-Bab B hlm. 182–189)."
                    : subC6
                    ? "Buku Siswa Matematika Kelas I Kemendikbudristek (Bab 6: Penjumlahan dan Pengurangan sampai dengan 20, Sub-Bab C hlm. 189–195)."
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
                {currentSubContent.metodeLuar && currentSubContent.metodeLuar.length > 0 ? (
                  <BarisIkon emoji="🌍" warna="#EDE9FE" judul="Metode dari Luar Buku">
                    <div className="flex flex-col gap-3 pt-2">
                      {currentSubContent.metodeLuar.map((m) => {
                        const badge = `${m.label} · ${m.nama} — ${m.namaId}`;
                        const teksSuara = `${badge}. ${m.ringkas} Sumber: ${m.asal}. Dipakai di tahap ${m.tahap.join(", ")}.`;
                        return (
                          <div key={`${m.nama}-${m.namaId}`} className="rounded-2xl border border-indigo-100 bg-white/90 p-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <span className="inline-flex max-w-full items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-indigo-950">
                                {badge}
                              </span>
                              <button
                                type="button"
                                onClick={() => speakGuru(teksSuara)}
                                className="rounded-full border-2 border-indigo-900 bg-indigo-50 px-3 py-1 text-[11px] font-black text-indigo-950"
                              >
                                Suara Guru
                              </button>
                            </div>
                            <p className="mt-2 text-sm font-bold leading-snug text-indigo-950">{m.ringkas}</p>
                            <p className="mt-1 text-[11px] font-semibold text-indigo-800/80">
                              Asal: {m.asal} · Tahap: {m.tahap.join(" · ")}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </BarisIkon>
                ) : null}
                <BarisIkon emoji="🚀" warna="#CDEFD8" judul={`Metode Pedagogis ${namaMetode}`}>
                  <span className="flex flex-wrap gap-2.5 pt-2">
                    {daftarTahapSilabus.map((s, i) => (
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
                        {sub.codeTitle.replace(/^Sub-Bab [A-Z]\s*\(?/, "").replace(/\)$/, "")}
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
          <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-sm font-black leading-snug text-[#1C01A5]">
            📚 {adaSimMateri ? "Tujuh" : "Enam"} tahap {namaMetode}: di HP disusun menurun, di desktop menyamping. Ketuk ▶ Buka — isinya muncul di layar pop-up.
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:flex-nowrap md:items-stretch md:gap-3 md:overflow-x-auto md:pb-2 md:[scrollbar-color:#FFE566_#1C01A5] md:[scrollbar-width:thin] md:snap-x md:snap-mandatory">
          <PopUpTahapSmicpa
            nomor={1}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Story"
            ringkas="Cerita dan video"
            emoji="📖"
            badgeClass="bg-[#FEE2E2] text-[#991B1B]"
            terbuka={unlockedSmicpaStage >= 1}
            buka={popupTahap === 1}
            onBuka={() => setPopupTahap(1)}
            onTutup={() => setPopupTahap(null)}
          >
            {popupTahap === 1 ? (
            <>
            {suaraSeragam ? <InfoSuaraGuru /> : null}
            <div className="space-y-3">
            {modulBaru ? (
              <modulBaru.Cerita speakGuru={speakGuru} />
            ) : subA8 ? (
              <CeritaDataA speakGuru={speakGuru} />
            ) : subB8 ? (
              <CeritaDataB speakGuru={speakGuru} />
            ) : subA7 ? (
              <CeritaUkurA speakGuru={speakGuru} />
            ) : subB7 ? (
              <CeritaUkurB speakGuru={speakGuru} />
            ) : subA6 ? (
              <CeritaSelisihA speakGuru={speakGuru} />
            ) : subB6 ? (
              <CeritaTambahB speakGuru={speakGuru} />
            ) : subC6 ? (
              <CeritaKurangC speakGuru={speakGuru} />
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
            </>
            ) : null}
          </PopUpTahapSmicpa>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 2: MIND-MAPPING (3 SLIDE DIAGRAM ALUR METODE)  */}
          {/* --------------------------------------------------------------- */}
          <PopUpTahapSmicpa
            ref={mindMapRef}
            nomor={2}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Mind-Map"
            ringkas={adaSimMateri ? "Peta konsep" : "Peta pikiran"}
            emoji="🗺️"
            badgeClass="bg-[#FEF3C7] text-[#92400E]"
            terbuka={unlockedSmicpaStage >= 2}
            buka={popupTahap === 2}
            onBuka={() => setPopupTahap(2)}
            onTutup={() => setPopupTahap(null)}
            pertahankan={adaSimMateri}
            tutupDiLatar={!adaSimMateri}
          >
            {ringkasSub ? (
            <PetaKonsep
              key={`${bab}-${activeSubBab}`}
              data={ringkasSub.peta}
              judul={judulSubBab}
              kelas={kelasPeta}
              maskot={maskotPeta}
              speakGuru={speakGuru}
              teksLanjut="LANJUTKAN KE INFOGRAFIS ⬇️"
              onLanjut={() =>
                handleUnlockNextSmicpa(
                  3,
                  infografisRef,
                  "Peta konsep sudah jelas! Sekarang kita buka Infografis."
                )
              }
            />
            ) : popupTahap === 2 ? (
            <div className="space-y-3">
              <PetaPikiranB
                langkah={langkahPeta}
                judul={judulSubBab}
                speakGuru={speakGuru}
                kelas={kelasPeta}
                maskot={maskotPeta}
              />

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
            ) : null}
          </PopUpTahapSmicpa>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 3: INFOGRAFIS (3 SLIDE TABEL RINGKASAN DATA)   */}
          {/* --------------------------------------------------------------- */}
          <PopUpTahapSmicpa
            ref={infografisRef}
            nomor={3}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Infografis"
            ringkas={adaSimMateri ? "Ketuk dan bandingkan" : "Tabel ringkasan"}
            emoji="📊"
            badgeClass="bg-[#DCFCE7] text-[#166534]"
            terbuka={unlockedSmicpaStage >= 3}
            buka={popupTahap === 3}
            onBuka={() => setPopupTahap(3)}
            onTutup={() => setPopupTahap(null)}
            pertahankan={adaSimMateri}
            tutupDiLatar={!adaSimMateri}
          >
            {ringkasSub ? (
            <InfografisRingkas
              key={`${bab}-${activeSubBab}`}
              data={ringkasSub.infografis}
              speakGuru={speakGuru}
              teksLanjut="LANJUTKAN KE SIMULASI ⬇️"
              onLanjut={() =>
                handleUnlockNextSmicpa(
                  TAHAP_SIMULASI,
                  simulasiRef,
                  `Infografis selesai! Sekarang kita bereksperimen di Simulasi. ${SIMULASI_MISI_AWAL[bab]?.(activeSubBab) ?? ""}`.trim()
                )
              }
            />
            ) : popupTahap === 3 ? (
            <div className="space-y-3">
              {modulBaru ? (
                <modulBaru.Infografis speakGuru={speakGuru} />
              ) : subC2 ? (
                <InfografisSoalC speakGuru={speakGuru} />
              ) : subB2 ? (
                <InfografisCaraB speakGuru={speakGuru} />
              ) : subD3 ? (
                <InfografisSoalCeritaD speakGuru={speakGuru} />
              ) : subC3 ? (
                <InfografisHubunganC speakGuru={speakGuru} />
              ) : subB3 ? (
                <InfografisPenguranganB speakGuru={speakGuru} />
              ) : subA8 ? (
                <InfografisDataA speakGuru={speakGuru} />
              ) : subB8 ? (
                <InfografisDiagramB speakGuru={speakGuru} />
              ) : subA7 ? (
                <InfografisUkurA speakGuru={speakGuru} />
              ) : subB7 ? (
                <InfografisUkurB speakGuru={speakGuru} />
              ) : subA6 ? (
                <InfografisSelisihA speakGuru={speakGuru} />
              ) : subB6 ? (
                <InfografisTambahB speakGuru={speakGuru} />
              ) : subC6 ? (
                <InfografisKurangC speakGuru={speakGuru} />
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
            ) : null}
          </PopUpTahapSmicpa>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 3B: SIMULASI (hanya bab pilot SMISCPA)         */}
          {/* --------------------------------------------------------------- */}
          {adaSimMateri && SimulasiMateri ? (
          <PopUpTahapSmicpa
            ref={simulasiRef}
            nomor={4}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Simulasi"
            ringkas="Laboratorium"
            emoji="🧪"
            badgeClass="bg-[#EDE9FE] text-[#5B21B6]"
            terbuka={unlockedSmicpaStage >= TAHAP_SIMULASI}
            buka={popupTahap === TAHAP_SIMULASI}
            onBuka={() => setPopupTahap(TAHAP_SIMULASI)}
            onTutup={() => setPopupTahap(null)}
            pertahankan
            tutupDiLatar={false}
          >
            <SimulasiMateri
              key={`${bab}-${activeSubBab}`}
              sub={activeSubBab}
              speakGuru={speakGuru}
              teksAkhir="LANJUTKAN KE CONCRETE ⬇️"
              onSelesai={() =>
                handleUnlockNextSmicpa(
                  4,
                  concreteRef,
                  "Simulasi selesai! Sekarang ayo kita praktikkan langsung dengan Benda Nyata pada tahap Concrete."
                )
              }
            />
          </PopUpTahapSmicpa>
          ) : null}

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 4: CONCRETE (3 SLIDE BENDA NYATA + KANVAS)     */}
          {/* --------------------------------------------------------------- */}
          <PopUpTahapSmicpa
            ref={concreteRef}
            nomor={4 + geserTahap}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Concrete"
            ringkas="Benda nyata"
            emoji="🧱"
            badgeClass="bg-[#DBEAFE] text-[#1E3A8A]"
            terbuka={unlockedSmicpaStage >= 4}
            buka={popupTahap === 4}
            onBuka={() => setPopupTahap(4)}
            onTutup={() => setPopupTahap(null)}
          >
            {popupTahap === 4 ? (
            <div className="space-y-3">
              {modulBaru ? (
                <modulBaru.Concrete
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(5, pictorialRef, "Empat permainan benda nyata sudah selesai. Sekarang kita lihat gambarnya.")
                  }
                />
              ) : subC2 ? (
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
              ) : subA8 ? (
                <ConcreteDataA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat data dalam diagram."
                    )
                  }
                />
              ) : subB8 ? (
                <ConcreteDiagramB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat diagram gambar."
                    )
                  }
                />
              ) : subA7 ? (
                <ConcreteUkurA
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat perbandingan panjang dalam diagram."
                    )
                  }
                />
              ) : subB7 ? (
                <ConcreteUkurB
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat pengukuran dalam diagram."
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
              ) : subC6 ? (
                <ConcreteKurangC
                  speakGuru={speakGuru}
                  panel={panelConcrete}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => concreteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      5,
                      pictorialRef,
                      "Empat permainan benda nyata sudah selesai. Sekarang kita lihat pengurangan dalam diagram."
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
            ) : null}
          </PopUpTahapSmicpa>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 5: PICTURE (DIAGRAM MAINAN + KANVAS)          */}
          {/* --------------------------------------------------------------- */}
          <PopUpTahapSmicpa
            ref={pictorialRef}
            nomor={5 + geserTahap}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Picture"
            ringkas="Diagram gambar"
            emoji="🖼️"
            badgeClass="bg-[#FEF3C7] text-[#92400E]"
            terbuka={unlockedSmicpaStage >= 5}
            buka={popupTahap === 5}
            onBuka={() => setPopupTahap(5)}
            onTutup={() => setPopupTahap(null)}
          >
            {popupTahap === 5 ? (
            <div className="space-y-3">
              {modulBaru ? (
                <modulBaru.Picture
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(6, abstractRef, "Tiga permainan gambar sudah selesai. Ayo lihat lambang angkanya.")
                  }
                />
              ) : subC2 ? (
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
              ) : subA8 ? (
                <PictureDataA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita membaca data dengan kata dan angka."
                    )
                  }
                />
              ) : subB8 ? (
                <PictureDiagramB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita membaca dan menghitung data dengan kata dan angka."
                    )
                  }
                />
              ) : subA7 ? (
                <PictureUkurA
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita membandingkan dan mengurutkan dengan kata dan angka."
                    )
                  }
                />
              ) : subB7 ? (
                <PictureUkurB
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita menulis hasil ukur dengan kata dan angka."
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
              ) : subC6 ? (
                <PictureKurangC
                  speakGuru={speakGuru}
                  panel={panelGambar}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => pictorialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() =>
                    handleUnlockNextSmicpa(
                      6,
                      abstractRef,
                      "Tiga permainan diagram sudah selesai. Ayo kita mengurangkan dengan angka dan tanda."
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
            ) : null}
          </PopUpTahapSmicpa>

          {/* --------------------------------------------------------------- */}
          {/* SLIDED COMPONENT 6: ABSTRACT (3 SLIDE ANGKA & SIMBOL MURNI)     */}
          {/* --------------------------------------------------------------- */}
          <PopUpTahapSmicpa
            ref={abstractRef}
            nomor={6 + geserTahap}
            jumlahTahap={jumlahTahap}
            namaMetode={namaMetode}
            judul="Abstract"
            ringkas="Angka dan simbol"
            emoji="🔢"
            badgeClass="bg-[#1C01A5] text-[#FFE566]"
            terbuka={unlockedSmicpaStage >= 6}
            buka={popupTahap === 6}
            onBuka={() => setPopupTahap(6)}
            onTutup={() => setPopupTahap(null)}
          >
            {popupTahap === 6 ? (
            <div className="space-y-4">
              {modulBaru ? (
                <modulBaru.Abstract
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subC2 ? (
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
              ) : subA8 ? (
                <AbstractDataA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB8 ? (
                <AbstractDiagramB
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subA7 ? (
                <AbstractUkurA
                  speakGuru={speakGuru}
                  panel={panelLambang}
                  hentikan={hentikanRekamConcrete}
                  gulir={() => abstractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  onSelesai={() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                />
              ) : subB7 ? (
                <AbstractUkurB
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
              ) : subC6 ? (
                <AbstractKurangC
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

              <button
                type="button"
                onClick={() => {
                  setPopupTahap(null);
                  setTimeout(() => selesaiBabRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
                }}
                className="mt-4 w-full rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-sm font-black text-[#FFE566]"
              >
                ✅ SELESAI ABSTRACT — TUTUP & LANJUT
              </button>
            </div>
            ) : null}
          </PopUpTahapSmicpa>
          </div>

          {unlockedSmicpaStage >= 6 ? (
            <div ref={selesaiBabRef} className="mt-4 flex items-center justify-between rounded-3xl border-4 border-[#1C01A5] bg-white p-4 shadow-[0_5px_0_rgba(28,1,165,0.22)]">
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
          ) : null}
          </>
          )}
        </section>
      )}

      {/* =================================================================== */}
      {/* 3. HALAMAN SIMULASI (SINGLE-SCREEN PhET-STYLE • LATAR BIRU LEMBUT)  */}
      {/* =================================================================== */}
      {activeMainTab === "simulasi" && SimulasiBab && (
        <SimulasiBab
          speakGuru={speakGuru}
          onKeLatihan={() => {
            setActiveMainTab("latihan");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
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

      {(activeMainTab === "latihan" || activeMainTab === "ujian") && materiSelesai && !soalSiap && (
        <section className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-4 border-dashed border-[#FFE566] bg-[#FFFDF2] p-8 text-center">
          <div className="igil-lompat text-6xl" aria-hidden="true">🛠️</div>
          <h2 className="text-xl font-black text-[#1C01A5] md:text-2xl">
            {activeMainTab === "latihan" ? "Latihan" : "Ujian"} bab ini sedang disiapkan
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#334155] md:text-lg">
            Hebat, kamu sudah selesai mempelajari semua Materi bab ini. Guru IGIL masih menyiapkan soal Latihan dan Ujiannya. Sementara itu, kamu boleh mengulang Materi, ya.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveMainTab("materi");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-sm font-black text-[#FFE566] md:text-base"
          >
            ⬅️ ULANGI MATERI
          </button>
        </section>
      )}

      {activeMainTab === "latihan" && materiSelesai && soalSiap && (
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
      {activeMainTab === "ujian" && materiSelesai && soalSiap && (
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