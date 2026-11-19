"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_DERMAGA, KOLOM_INFO_DERMAGA, SELESAI_INFO_DERMAGA, SUARA_INFO_DERMAGA, TEMA_INFO_DERMAGA } from "./data-kartu";

/**
 * Infografis K4 Bab 1 Sub-Bab C: Daftar Dermaga. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarDermagaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_DERMAGA} kolom={KOLOM_INFO_DERMAGA} tema={TEMA_INFO_DERMAGA} suaraAwal={SUARA_INFO_DERMAGA} pesanSelesai={SELESAI_INFO_DERMAGA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarDermagaK4B1 };
