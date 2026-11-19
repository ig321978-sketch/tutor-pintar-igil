"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TURUS, KOLOM_INFO_TURUS, SELESAI_INFO_TURUS, SUARA_INFO_TURUS, TEMA_INFO_TURUS } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 8 Sub-Bab A: Papan Catatan. Satu tabel lima baris dari data Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanCatatan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TURUS} kolom={KOLOM_INFO_TURUS} tema={TEMA_INFO_TURUS} suaraAwal={SUARA_INFO_TURUS} pesanSelesai={SELESAI_INFO_TURUS} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
