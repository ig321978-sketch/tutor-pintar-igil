import "server-only";
import type { RingkasBab } from "@/lib/praktikum-pilot";

/**
 * Sumber Praktikum otomatis: data peta konsep (Mind-map) tiap bab. Dimuat hanya di server
 * saat halaman Praktikum bab itu dibuka, supaya kunci jawaban tidak ikut terkirim ke peramban.
 * Bab baru: tambahkan satu baris di sini.
 */
const SUMBER: Record<string, () => Promise<{ default: unknown }>> = {
  "mtk-1-bab1": () => import("@/data/kelas1-bab1-ringkas.json"),
  "mtk-1-bab1-kedua": () => import("@/data/kelas1-bab1-kedua-ringkas.json"),
  "mtk-1-bab2": () => import("@/data/kelas1-bab2-ringkas.json"),
  "mtk-1-bab3": () => import("@/data/kelas1-bab3-ringkas.json"),
  "mtk-1-bab4": () => import("@/data/kelas1-bab4-ringkas.json"),
  "mtk-1-bab5": () => import("@/data/kelas1-bab5-ringkas.json"),
  "mtk-1-bab6": () => import("@/data/kelas1-bab6-ringkas.json"),
  "mtk-1-bab7": () => import("@/data/kelas1-bab7-ringkas.json"),
  "mtk-1-bab8": () => import("@/data/kelas1-bab8-ringkas.json"),
  "mtk-2-bab1": () => import("@/data/kelas2-bab1-ringkas.json"),
  "mtk-2-bab2": () => import("@/data/kelas2-bab2-ringkas.json"),
  "mtk-2-bab3": () => import("@/data/kelas2-bab3-ringkas.json"),
  "mtk-2-bab4": () => import("@/data/kelas2-bab4-ringkas.json"),
  "mtk-2-bab5": () => import("@/data/kelas2-bab5-ringkas.json"),
  "mtk-2-bab6": () => import("@/data/kelas2-bab6-ringkas.json"),
  "mtk-2-bab7": () => import("@/data/kelas2-bab7-ringkas.json"),
  "mtk-2-bab8": () => import("@/data/kelas2-bab8-ringkas.json"),
  "mtk-3-bab1": () => import("@/data/kelas3-bab1-ringkas.json"),
  "mtk-3-bab2": () => import("@/data/kelas3-bab2-ringkas.json"),
  "mtk-3-bab3": () => import("@/data/kelas3-bab3-ringkas.json"),
  "mtk-3-bab4": () => import("@/data/kelas3-bab4-ringkas.json"),
  "mtk-3-bab5": () => import("@/data/kelas3-bab5-ringkas.json"),
  "mtk-4-bab1": () => import("@/data/kelas4-bab1-ringkas.json"),
  "mtk-4-bab1-kedua": () => import("@/data/kelas4-bab1-kedua-ringkas.json"),
  "mtk-4-bab2": () => import("@/data/kelas4-bab2-ringkas.json"),
  "mtk-4-bab3": () => import("@/data/kelas4-bab3-ringkas.json"),
  "mtk-4-bab4": () => import("@/data/kelas4-bab4-ringkas.json"),
  "mtk-4-bab5": () => import("@/data/kelas4-bab5-ringkas.json"),
  "mtk-4-bab6": () => import("@/data/kelas4-bab6-ringkas.json"),
  "mtk-5-bab1": () => import("@/data/kelas5-bab1-ringkas.json"),
  "mtk-5-bab2": () => import("@/data/kelas5-bab2-ringkas.json"),
  "mtk-5-bab3": () => import("@/data/kelas5-bab3-ringkas.json"),
  "mtk-5-bab4": () => import("@/data/kelas5-bab4-ringkas.json"),
  "mtk-5-bab5": () => import("@/data/kelas5-bab5-ringkas.json"),
  "mtk-5-bab6": () => import("@/data/kelas5-bab6-ringkas.json"),
  "mtk-5-bab7": () => import("@/data/kelas5-bab7-ringkas.json"),
  "mtk-5-bab8": () => import("@/data/kelas5-bab8-ringkas.json"),
  "mtk-5-bab9": () => import("@/data/kelas5-bab9-ringkas.json"),
  "mtk-6-bab1": () => import("@/data/kelas6-bab1-ringkas.json"),
  "mtk-6-bab2": () => import("@/data/kelas6-bab2-ringkas.json"),
  "mtk-6-bab3": () => import("@/data/kelas6-bab3-ringkas.json"),
  "mtk-6-bab4": () => import("@/data/kelas6-bab4-ringkas.json"),
};

export const KODE_BAB_PRAKTIKUM = Object.keys(SUMBER);

export async function muatRingkasBab(kodeBab: string): Promise<RingkasBab | null> {
  const muat = SUMBER[kodeBab];
  if (!muat) return null;
  const modul = await muat();
  return modul.default as RingkasBab;
}
