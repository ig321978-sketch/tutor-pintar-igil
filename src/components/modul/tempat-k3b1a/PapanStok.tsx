"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TEMPAT, KOLOM_INFO_TEMPAT, SELESAI_INFO_TEMPAT, SUARA_INFO_TEMPAT, TEMA_INFO_TEMPAT } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab A: Papan Stok. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanStokK3B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TEMPAT} kolom={KOLOM_INFO_TEMPAT} tema={TEMA_INFO_TEMPAT} suaraAwal={SUARA_INFO_TEMPAT} pesanSelesai={SELESAI_INFO_TEMPAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanStokK3B1 };
