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
};

/** Bab yang masih memakai tab Simulasi terpisah (belum migrasi SMISCPA). */
export const SIMULASI_BAB: Partial<Record<string, ComponentType<SimulasiBabProps>>> = {};
