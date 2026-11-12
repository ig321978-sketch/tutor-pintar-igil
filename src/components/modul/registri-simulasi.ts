/**
 * Registri simulasi & data ringkas SMISCPA.
 * Dipisah dari IgilModulePlayer agar penambahan bab baru tidak membuka file pemutar 4000+ baris.
 *
 * - SIMULASI_MATERI + RINGKAS_BAB: bab yang sudah migrasi (Simulasi di dalam Materi)
 * - SIMULASI_BAB: bab yang masih pakai tab Simulasi terpisah
 * Peta file pemutar: naskah/igil-module-player-peta.md
 */
import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import SimulasiBab1Materi, { misiAwalBab1 } from "@/components/modul/SimulasiBab1";
import SimulasiBab2Materi, { misiAwalBab2 } from "@/components/modul/SimulasiBab2";
import SimulasiBab3Materi, { misiAwalBab3 } from "@/components/modul/SimulasiBab3";
import SimulasiBab4Materi, { misiAwalBab4 } from "@/components/modul/SimulasiBab4";
import SimulasiBab5Materi, { misiAwalBab5 } from "@/components/modul/SimulasiBab5";
import SimulasiBab6Materi, { misiAwalBab6 } from "@/components/modul/SimulasiBab6";
import SimulasiBab7Materi, { misiAwalBab7 } from "@/components/modul/SimulasiBab7";
import SimulasiBab8Materi, { misiAwalBab8 } from "@/components/modul/SimulasiBab8";
import SimulasiK2Bab1Materi, { misiAwalK2Bab1 } from "@/components/modul/SimulasiK2Bab1";
import SimulasiK2Bab2Materi, { misiAwalK2Bab2 } from "@/components/modul/SimulasiK2Bab2";
import SimulasiK2Bab3Materi, { misiAwalK2Bab3 } from "@/components/modul/SimulasiK2Bab3";
import SimulasiK2Bab4Materi, { misiAwalK2Bab4 } from "@/components/modul/SimulasiK2Bab4";
import SimulasiK2Bab5Materi, { misiAwalK2Bab5 } from "@/components/modul/SimulasiK2Bab5";
import SimulasiK2Bab6Materi, { misiAwalK2Bab6 } from "@/components/modul/SimulasiK2Bab6";
import SimulasiK2Bab7Materi, { misiAwalK2Bab7 } from "@/components/modul/SimulasiK2Bab7";
import SimulasiK2Bab8Materi, { misiAwalK2Bab8 } from "@/components/modul/SimulasiK2Bab8";
import { misiAwalK3Bab1 } from "@/components/modul/misi-teks-k3b1";
import { misiAwalK3Bab2 } from "@/components/modul/misi-teks-k3b2";
import { misiAwalK3Bab3 } from "@/components/modul/misi-teks-k3b3";
import { misiAwalK3Bab4 } from "@/components/modul/misi-teks-k3b4";
import { misiAwalK3Bab5 } from "@/components/modul/misi-teks-k3b5";
import { misiAwalK4Bab1 } from "@/components/modul/misi-teks-k4b1";
import { misiAwalK4Bab2 } from "@/components/modul/misi-teks-k4b2";
import { misiAwalK4Bab3 } from "@/components/modul/misi-teks-k4b3";
import { misiAwalK4Bab4 } from "@/components/modul/misi-teks-k4b4";
import { misiAwalK4Bab5 } from "@/components/modul/misi-teks-k4b5";
import { misiAwalK4Bab6 } from "@/components/modul/misi-teks-k4b6";
import { misiAwalK5Bab1 } from "@/components/modul/misi-teks-k5b1";
import { misiAwalK5Bab2 } from "@/components/modul/misi-teks-k5b2";
import { misiAwalK5Bab3 } from "@/components/modul/misi-teks-k5b3";
import { misiAwalK5Bab4 } from "@/components/modul/misi-teks-k5b4";
import { misiAwalK5Bab5 } from "@/components/modul/misi-teks-k5b5";
import { misiAwalK5Bab6 } from "@/components/modul/misi-teks-k5b6";
import { misiAwalK5Bab7 } from "@/components/modul/misi-teks-k5b7";
import type { DataPeta } from "@/components/modul/peta-konsep-logika";
import type { DataInfografis } from "@/components/modul/infografis-ringkas-logika";
import ringkasK1B1 from "@/data/kelas1-bab1-ringkas.json";
import ringkasK1B2 from "@/data/kelas1-bab2-ringkas.json";
import ringkasK1B3 from "@/data/kelas1-bab3-ringkas.json";
import ringkasK1B4 from "@/data/kelas1-bab4-ringkas.json";
import ringkasK1B5 from "@/data/kelas1-bab5-ringkas.json";
import ringkasK1B6 from "@/data/kelas1-bab6-ringkas.json";
import ringkasK1B7 from "@/data/kelas1-bab7-ringkas.json";
import ringkasK1B8 from "@/data/kelas1-bab8-ringkas.json";
import ringkasK2B1 from "@/data/kelas2-bab1-ringkas.json";
import ringkasK2B2 from "@/data/kelas2-bab2-ringkas.json";
import ringkasK2B3 from "@/data/kelas2-bab3-ringkas.json";
import ringkasK2B4 from "@/data/kelas2-bab4-ringkas.json";
import ringkasK2B5 from "@/data/kelas2-bab5-ringkas.json";
import ringkasK2B6 from "@/data/kelas2-bab6-ringkas.json";
import ringkasK2B7 from "@/data/kelas2-bab7-ringkas.json";
import ringkasK2B8 from "@/data/kelas2-bab8-ringkas.json";
import ringkasK3B1 from "@/data/kelas3-bab1-ringkas.json";
import ringkasK3B2 from "@/data/kelas3-bab2-ringkas.json";
import ringkasK3B3 from "@/data/kelas3-bab3-ringkas.json";
import ringkasK3B4 from "@/data/kelas3-bab4-ringkas.json";
import ringkasK3B5 from "@/data/kelas3-bab5-ringkas.json";
import ringkasK4B1 from "@/data/kelas4-bab1-ringkas.json";
import ringkasK4B2 from "@/data/kelas4-bab2-ringkas.json";
import ringkasK4B3 from "@/data/kelas4-bab3-ringkas.json";
import ringkasK4B4 from "@/data/kelas4-bab4-ringkas.json";
import ringkasK4B5 from "@/data/kelas4-bab5-ringkas.json";
import ringkasK4B6 from "@/data/kelas4-bab6-ringkas.json";
import ringkasK5B1 from "@/data/kelas5-bab1-ringkas.json";
import ringkasK5B2 from "@/data/kelas5-bab2-ringkas.json";
import ringkasK5B3 from "@/data/kelas5-bab3-ringkas.json";
import ringkasK5B4 from "@/data/kelas5-bab4-ringkas.json";
import ringkasK5B5 from "@/data/kelas5-bab5-ringkas.json";
import ringkasK5B6 from "@/data/kelas5-bab6-ringkas.json";
import ringkasK5B7 from "@/data/kelas5-bab7-ringkas.json";

/**
 * Kunci tahap Simulasi di dalam Materi. Pecahan (3,5) menyisip antara Infografis (3)
 * dan Concrete (4) tanpa menggeser kunci tahap lama.
 */
export const TAHAP_SIMULASI = 3.5;

export type SimulasiMateriProps = {
  sub: string;
  speakGuru: (teks: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
};

/** Kelas 3 dimuat malas: laboratorium K3 tidak ikut bundel pemutar Kelas 1 dan 2. */
const SimulasiK3Bab1Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK3Bab1"), { ssr: false });
const SimulasiK3Bab2Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK3Bab2"), { ssr: false });
const SimulasiK3Bab3Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK3Bab3"), { ssr: false });
const SimulasiK3Bab4Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK3Bab4"), { ssr: false });
const SimulasiK3Bab5Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK3Bab5"), { ssr: false });
const SimulasiK4Bab1Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab1"), { ssr: false });
const SimulasiK4Bab2Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab2"), { ssr: false });
const SimulasiK4Bab3Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab3"), { ssr: false });
const SimulasiK4Bab4Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab4"), { ssr: false });
const SimulasiK4Bab5Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab5"), { ssr: false });
const SimulasiK4Bab6Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK4Bab6"), { ssr: false });
const SimulasiK5Bab1Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab1"), { ssr: false });
const SimulasiK5Bab2Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab2"), { ssr: false });
const SimulasiK5Bab3Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab3"), { ssr: false });
const SimulasiK5Bab4Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab4"), { ssr: false });
const SimulasiK5Bab5Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab5"), { ssr: false });
const SimulasiK5Bab6Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab6"), { ssr: false });
const SimulasiK5Bab7Materi = dynamic<SimulasiMateriProps>(() => import("@/components/modul/SimulasiK5Bab7"), { ssr: false });

export type SimulasiBabProps = {
  speakGuru: (teks: string) => void;
  onKeLatihan: () => void;
};

export type RingkasSub = { peta: DataPeta; infografis: DataInfografis };

/** Bab SMISCPA: Simulasi di dalam Materi; tab Simulasi tidak ditampilkan. */
export const SIMULASI_MATERI: Partial<Record<string, ComponentType<SimulasiMateriProps>>> = {
  "mtk-1-bab1": SimulasiBab1Materi,
  "mtk-1-bab2": SimulasiBab2Materi,
  "mtk-1-bab3": SimulasiBab3Materi,
  "mtk-1-bab4": SimulasiBab4Materi,
  "mtk-1-bab5": SimulasiBab5Materi,
  "mtk-1-bab6": SimulasiBab6Materi,
  "mtk-1-bab7": SimulasiBab7Materi,
  "mtk-1-bab8": SimulasiBab8Materi,
  "mtk-2-bab1": SimulasiK2Bab1Materi,
  "mtk-2-bab2": SimulasiK2Bab2Materi,
  "mtk-2-bab3": SimulasiK2Bab3Materi,
  "mtk-2-bab4": SimulasiK2Bab4Materi,
  "mtk-2-bab5": SimulasiK2Bab5Materi,
  "mtk-2-bab6": SimulasiK2Bab6Materi,
  "mtk-2-bab7": SimulasiK2Bab7Materi,
  "mtk-2-bab8": SimulasiK2Bab8Materi,
  "mtk-3-bab1": SimulasiK3Bab1Materi,
  "mtk-3-bab2": SimulasiK3Bab2Materi,
  "mtk-3-bab3": SimulasiK3Bab3Materi,
  "mtk-3-bab4": SimulasiK3Bab4Materi,
  "mtk-3-bab5": SimulasiK3Bab5Materi,
  "mtk-4-bab1": SimulasiK4Bab1Materi,
  "mtk-4-bab2": SimulasiK4Bab2Materi,
  "mtk-4-bab3": SimulasiK4Bab3Materi,
  "mtk-4-bab4": SimulasiK4Bab4Materi,
  "mtk-4-bab5": SimulasiK4Bab5Materi,
  "mtk-4-bab6": SimulasiK4Bab6Materi,
  "mtk-5-bab1": SimulasiK5Bab1Materi,
  "mtk-5-bab2": SimulasiK5Bab2Materi,
  "mtk-5-bab3": SimulasiK5Bab3Materi,
  "mtk-5-bab4": SimulasiK5Bab4Materi,
  "mtk-5-bab5": SimulasiK5Bab5Materi,
  "mtk-5-bab6": SimulasiK5Bab6Materi,
  "mtk-5-bab7": SimulasiK5Bab7Materi,
};

/** Ucapan misi simulasi pertama tiap sub-bab (digabung ke ucapan saat tahap Simulasi dibuka). */
export const SIMULASI_MISI_AWAL: Partial<Record<string, (sub: string) => string>> = {
  "mtk-1-bab1": misiAwalBab1,
  "mtk-1-bab2": misiAwalBab2,
  "mtk-1-bab3": misiAwalBab3,
  "mtk-1-bab4": misiAwalBab4,
  "mtk-1-bab5": misiAwalBab5,
  "mtk-1-bab6": misiAwalBab6,
  "mtk-1-bab7": misiAwalBab7,
  "mtk-1-bab8": misiAwalBab8,
  "mtk-2-bab1": misiAwalK2Bab1,
  "mtk-2-bab2": misiAwalK2Bab2,
  "mtk-2-bab3": misiAwalK2Bab3,
  "mtk-2-bab4": misiAwalK2Bab4,
  "mtk-2-bab5": misiAwalK2Bab5,
  "mtk-2-bab6": misiAwalK2Bab6,
  "mtk-2-bab7": misiAwalK2Bab7,
  "mtk-2-bab8": misiAwalK2Bab8,
  "mtk-3-bab1": misiAwalK3Bab1,
  "mtk-3-bab2": misiAwalK3Bab2,
  "mtk-3-bab3": misiAwalK3Bab3,
  "mtk-3-bab4": misiAwalK3Bab4,
  "mtk-3-bab5": misiAwalK3Bab5,
  "mtk-4-bab1": misiAwalK4Bab1,
  "mtk-4-bab2": misiAwalK4Bab2,
  "mtk-4-bab3": misiAwalK4Bab3,
  "mtk-4-bab4": misiAwalK4Bab4,
  "mtk-4-bab5": misiAwalK4Bab5,
  "mtk-4-bab6": misiAwalK4Bab6,
  "mtk-5-bab1": misiAwalK5Bab1,
  "mtk-5-bab2": misiAwalK5Bab2,
  "mtk-5-bab3": misiAwalK5Bab3,
  "mtk-5-bab4": misiAwalK5Bab4,
  "mtk-5-bab5": misiAwalK5Bab5,
  "mtk-5-bab6": misiAwalK5Bab6,
  "mtk-5-bab7": misiAwalK5Bab7,
};

/** Data Mind-Map + Infografis ringkas untuk bab SMISCPA. */
export const RINGKAS_BAB: Partial<Record<string, Record<string, RingkasSub>>> = {
  "mtk-1-bab1": ringkasK1B1.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab2": ringkasK1B2.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab3": ringkasK1B3.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab4": ringkasK1B4.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab5": ringkasK1B5.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab6": ringkasK1B6.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab7": ringkasK1B7.subBab as unknown as Record<string, RingkasSub>,
  "mtk-1-bab8": ringkasK1B8.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab1": ringkasK2B1.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab2": ringkasK2B2.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab3": ringkasK2B3.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab4": ringkasK2B4.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab5": ringkasK2B5.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab6": ringkasK2B6.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab7": ringkasK2B7.subBab as unknown as Record<string, RingkasSub>,
  "mtk-2-bab8": ringkasK2B8.subBab as unknown as Record<string, RingkasSub>,
  "mtk-3-bab1": ringkasK3B1.subBab as unknown as Record<string, RingkasSub>,
  "mtk-3-bab2": ringkasK3B2.subBab as unknown as Record<string, RingkasSub>,
  "mtk-3-bab3": ringkasK3B3.subBab as unknown as Record<string, RingkasSub>,
  "mtk-3-bab4": ringkasK3B4.subBab as unknown as Record<string, RingkasSub>,
  "mtk-3-bab5": ringkasK3B5.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab1": ringkasK4B1.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab2": ringkasK4B2.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab3": ringkasK4B3.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab4": ringkasK4B4.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab5": ringkasK4B5.subBab as unknown as Record<string, RingkasSub>,
  "mtk-4-bab6": ringkasK4B6.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab1": ringkasK5B1.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab2": ringkasK5B2.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab3": ringkasK5B3.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab4": ringkasK5B4.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab5": ringkasK5B5.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab6": ringkasK5B6.subBab as unknown as Record<string, RingkasSub>,
  "mtk-5-bab7": ringkasK5B7.subBab as unknown as Record<string, RingkasSub>,
};

/** Bab yang masih memakai tab Simulasi terpisah (belum migrasi SMISCPA). */
export const SIMULASI_BAB: Partial<Record<string, ComponentType<SimulasiBabProps>>> = {};
