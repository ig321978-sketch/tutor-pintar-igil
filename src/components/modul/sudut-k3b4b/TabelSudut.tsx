"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_SUDUT, KOLOM_INFO_SUDUT, SELESAI_INFO_SUDUT, SUARA_INFO_SUDUT, TEMA_INFO_SUDUT } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 4 Sub-Bab B: Tabel Sudut. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function TabelSudutK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_SUDUT} kolom={KOLOM_INFO_SUDUT} tema={TEMA_INFO_SUDUT} suaraAwal={SUARA_INFO_SUDUT} pesanSelesai={SELESAI_INFO_SUDUT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { TabelSudutK3B4 };
