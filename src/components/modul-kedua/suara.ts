"use client";

import { tanpaDigit } from "@/lib/modul-kedua/eja";

/** Narasi suara lewat Web Speech API (bahasa Indonesia). Tanpa dukungan peramban, teks tetap tampil (fallback). */
const KUNCI = "igil.modulKedua.suara";

export function suaraDidukung(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

export function suaraNyala(): boolean {
  try {
    return window.localStorage.getItem(KUNCI) !== "mati";
  } catch {
    return true;
  }
}

export function aturSuara(nyala: boolean): void {
  try {
    window.localStorage.setItem(KUNCI, nyala ? "nyala" : "mati");
  } catch {
    /* abaikan */
  }
  if (!nyala) berhenti();
}

export function berhenti(): void {
  if (suaraDidukung()) window.speechSynthesis.cancel();
}

/** Mengucapkan teks (angka otomatis dieja). Mengembalikan false bila suara tidak tersedia. */
export function ucapkan(teks: string, saatSelesai?: () => void): boolean {
  if (!suaraDidukung()) return false;
  const s = window.speechSynthesis;
  s.cancel();
  const u = new SpeechSynthesisUtterance(tanpaDigit(teks));
  u.lang = "id-ID";
  u.rate = 0.85;
  u.pitch = 1.1;
  const suaraId = s.getVoices().find((v) => v.lang.toLowerCase().startsWith("id"));
  if (suaraId) u.voice = suaraId;
  if (saatSelesai) {
    u.onend = saatSelesai;
    u.onerror = saatSelesai;
  }
  s.speak(u);
  return true;
}
