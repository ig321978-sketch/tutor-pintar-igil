"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_LIPAT, KOLOM_INFO_LIPAT, SELESAI_INFO_LIPAT, SUARA_INFO_LIPAT, TEMA_INFO_LIPAT } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab A: Daftar Lipat. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarLipatK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_LIPAT} kolom={KOLOM_INFO_LIPAT} tema={TEMA_INFO_LIPAT} suaraAwal={SUARA_INFO_LIPAT} pesanSelesai={SELESAI_INFO_LIPAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarLipatK4B2 };
