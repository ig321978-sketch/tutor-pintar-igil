"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_IKAT, KOLOM_INFO_IKAT, SELESAI_INFO_IKAT, SUARA_INFO_IKAT, TEMA_INFO_IKAT } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 7 Sub-Bab A: Papan Setoran. Satu tabel lima baris dari data Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanSetoran({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_IKAT} kolom={KOLOM_INFO_IKAT} tema={TEMA_INFO_IKAT} suaraAwal={SUARA_INFO_IKAT} pesanSelesai={SELESAI_INFO_IKAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
