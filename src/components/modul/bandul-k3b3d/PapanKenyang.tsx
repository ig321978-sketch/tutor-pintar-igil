"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_BANDUL, KOLOM_INFO_BANDUL, SELESAI_INFO_BANDUL, SUARA_INFO_BANDUL, TEMA_INFO_BANDUL } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 3 Sub-Bab D: Papan Kenyang. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanKenyangK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_BANDUL} kolom={KOLOM_INFO_BANDUL} tema={TEMA_INFO_BANDUL} suaraAwal={SUARA_INFO_BANDUL} pesanSelesai={SELESAI_INFO_BANDUL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanKenyangK3B3 };
