"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_PITA, KOLOM_INFO_PITA, SELESAI_INFO_PITA, SUARA_INFO_PITA, TEMA_INFO_PITA } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 3 Sub-Bab B: Tabel Pita. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function TabelPitaK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_PITA} kolom={KOLOM_INFO_PITA} tema={TEMA_INFO_PITA} suaraAwal={SUARA_INFO_PITA} pesanSelesai={SELESAI_INFO_PITA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { TabelPitaK3B3 };
