"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_ANGKLUNG, KOLOM_INFO_ANGKLUNG, SELESAI_INFO_ANGKLUNG, SUARA_INFO_ANGKLUNG, TEMA_INFO_ANGKLUNG } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 3 Sub-Bab A: Daftar Angklung. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarAngklungK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_ANGKLUNG} kolom={KOLOM_INFO_ANGKLUNG} tema={TEMA_INFO_ANGKLUNG} suaraAwal={SUARA_INFO_ANGKLUNG} pesanSelesai={SELESAI_INFO_ANGKLUNG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarAngklungK4B3 };
