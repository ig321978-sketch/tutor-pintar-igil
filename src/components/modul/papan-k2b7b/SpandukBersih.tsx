"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_PAPAN, KOLOM_INFO_PAPAN, SELESAI_INFO_PAPAN, SUARA_INFO_PAPAN, TEMA_INFO_PAPAN } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 7 Sub-Bab B: Spanduk Bersih. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function SpandukBersih({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_PAPAN} kolom={KOLOM_INFO_PAPAN} tema={TEMA_INFO_PAPAN} suaraAwal={SUARA_INFO_PAPAN} pesanSelesai={SELESAI_INFO_PAPAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
