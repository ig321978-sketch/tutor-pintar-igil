"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_IKAT, RINGKASAN_IKAT, SELESAI_KARTU_IKAT, SUARA_KARTU_IKAT, TEMA_KARTU_IKAT } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 7 Sub-Bab A: Gerobak Botol. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function GerobakBotol({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_IKAT} tema={TEMA_KARTU_IKAT} ringkasan={RINGKASAN_IKAT} suaraAwal={SUARA_KARTU_IKAT} pesanSelesai={SELESAI_KARTU_IKAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
