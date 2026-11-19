"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KELAPA, KOLOM_INFO_KELAPA, SELESAI_INFO_KELAPA, SUARA_INFO_KELAPA, TEMA_INFO_KELAPA } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab D: Daftar Kios. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarKelapaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KELAPA} kolom={KOLOM_INFO_KELAPA} tema={TEMA_INFO_KELAPA} suaraAwal={SUARA_INFO_KELAPA} pesanSelesai={SELESAI_INFO_KELAPA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarKelapaK4B1 };
