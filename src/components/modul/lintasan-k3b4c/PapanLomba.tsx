"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_LINTASAN, KOLOM_INFO_LINTASAN, SELESAI_INFO_LINTASAN, SUARA_INFO_LINTASAN, TEMA_INFO_LINTASAN } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 4 Sub-Bab C: Papan Lomba. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanLombaK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_LINTASAN} kolom={KOLOM_INFO_LINTASAN} tema={TEMA_INFO_LINTASAN} suaraAwal={SUARA_INFO_LINTASAN} pesanSelesai={SELESAI_INFO_LINTASAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanLombaK3B4 };
