"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  KUNCI_CAPAIAN,
  PERISTIWA_CAPAIAN,
  catatJawabanLatihan,
  catatSubBab,
  catatUjian,
  urai,
  type GudangCapaian,
} from "./capaian";

/**
 * Penyimpanan capaian belajar di localStorage perangkat + hook baca untuk halaman Rapor.
 * Tanpa panggilan jaringan. Kegagalan menyimpan (penuh, diblokir) diabaikan: belajar tidak boleh terganggu.
 */

const bacaMentah = (): string => {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(KUNCI_CAPAIAN) ?? "";
  } catch {
    return "";
  }
};

function ubah(fungsi: (g: GudangCapaian) => GudangCapaian): void {
  if (typeof window === "undefined") return;
  try {
    const lama = urai(bacaMentah());
    const baru = fungsi(lama);
    if (baru === lama) return;
    window.localStorage.setItem(KUNCI_CAPAIAN, JSON.stringify(baru));
    window.dispatchEvent(new Event(PERISTIWA_CAPAIAN));
  } catch {
    // Penyimpanan penuh atau diblokir: capaian hanya tidak tercatat di perangkat ini.
  }
}

/** Dipanggil modul bab saat siswa menyelesaikan satu Sub-Bab. */
export const catatSubBabSelesai = (bab: string, huruf: string): void => ubah((g) => catatSubBab(g, bab, huruf));

/** Dipanggil saat server menilai satu jawaban Latihan. */
export const catatLatihanDinilai = (bab: string, idSoal: string, benar: boolean): void => ubah((g) => catatJawabanLatihan(g, bab, idSoal, benar));

/** Dipanggil saat server mengembalikan nilai akhir Ujian. */
export const catatUjianDinilai = (bab: string, nilai: number): void => ubah((g) => catatUjian(g, bab, nilai));

function langgan(panggil: () => void): () => void {
  window.addEventListener("storage", panggil);
  window.addEventListener(PERISTIWA_CAPAIAN, panggil);
  return () => {
    window.removeEventListener("storage", panggil);
    window.removeEventListener(PERISTIWA_CAPAIAN, panggil);
  };
}

/** Gudang capaian. `null` selama belum terbaca di browser (server dan hidrasi awal), supaya tampilan tidak berkedip. */
export function useCapaian(): GudangCapaian | null {
  const mentah = useSyncExternalStore(langgan, () => bacaMentah() || "{}", () => "");
  return useMemo(() => (mentah === "" ? null : urai(mentah)), [mentah]);
}
