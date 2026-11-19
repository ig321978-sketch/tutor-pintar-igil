"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TIKET, RINGKASAN_TIKET, SELESAI_KARTU_TIKET, SUARA_KARTU_TIKET, TEMA_KARTU_TIKET } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab A: Loket Tiket. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function LoketTiketK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TIKET} tema={TEMA_KARTU_TIKET} ringkasan={RINGKASAN_TIKET} suaraAwal={SUARA_KARTU_TIKET} pesanSelesai={SELESAI_KARTU_TIKET} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { LoketTiketK4B1 };
