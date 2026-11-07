import { useSyncExternalStore } from "react";

/**
 * Catatan belajar di perangkat untuk Praktikum per blok 4 bab.
 * - Ujian lulus 100% dicatat per bab oleh modul bab.
 * - Praktikum blok dikirim sekali. Isinya hanya disimpan di perangkat ini sampai server (RPC) tersambung.
 * Tidak ada panggilan jaringan di sini.
 */

const KUNCI_UJIAN = "igil_ujian_lulus_v1";
const KUNCI_PRAKTIKUM = "igil_praktikum_blok_v1";
const PERISTIWA = "igil-praktikum-berubah";

export type JawabanPraktikum = {
  jawabanLangkah: Record<string, string>;
  penjelasan: string;
};

export type PraktikumTerkirim = {
  dikirimPada: string;
  jawaban: JawabanPraktikum;
};

function bacaJson<T>(kunci: string, awal: T): T {
  if (typeof window === "undefined") return awal;
  try {
    const mentah = window.localStorage.getItem(kunci);
    return mentah ? (JSON.parse(mentah) as T) : awal;
  } catch {
    return awal;
  }
}

function tulisJson(kunci: string, nilai: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(kunci, JSON.stringify(nilai));
    window.dispatchEvent(new Event(PERISTIWA));
  } catch {
    // Penyimpanan penuh atau diblokir. Catatan hanya hilang di perangkat ini.
  }
}

/** Dipanggil modul bab saat Ujian lulus 100%. */
export function catatUjianLulus(idBab: string): void {
  const daftar = bacaJson<string[]>(KUNCI_UJIAN, []);
  if (daftar.includes(idBab)) return;
  tulisJson(KUNCI_UJIAN, [...daftar, idBab]);
}

export function catatPraktikumTerkirim(idBlok: string, jawaban: JawabanPraktikum): void {
  const semua = bacaJson<Record<string, PraktikumTerkirim>>(KUNCI_PRAKTIKUM, {});
  if (semua[idBlok]) return; // Praktikum hanya terbit sekali per blok.
  tulisJson(KUNCI_PRAKTIKUM, {
    ...semua,
    [idBlok]: { dikirimPada: new Date().toISOString(), jawaban },
  });
}

function langgan(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(PERISTIWA, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PERISTIWA, callback);
  };
}

function ambilMentah(kunci: string): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(kunci) ?? "";
  } catch {
    return "";
  }
}

/** Daftar id bab yang Ujiannya sudah lulus 100%. `null` selama belum terbaca di browser. */
export function useUjianLulus(): readonly string[] | null {
  const mentah = useSyncExternalStore(
    langgan,
    () => ambilMentah(KUNCI_UJIAN) || "[]",
    () => "",
  );
  if (mentah === "") return null;
  try {
    return JSON.parse(mentah) as string[];
  } catch {
    return [];
  }
}

/** Praktikum blok yang sudah dikirim, atau `undefined` bila belum. `null` selama belum terbaca. */
export function usePraktikumTerkirim(idBlok: string): PraktikumTerkirim | undefined | null {
  const mentah = useSyncExternalStore(
    langgan,
    () => ambilMentah(KUNCI_PRAKTIKUM) || "{}",
    () => "",
  );
  if (mentah === "") return null;
  try {
    return (JSON.parse(mentah) as Record<string, PraktikumTerkirim>)[idBlok];
  } catch {
    return undefined;
  }
}
