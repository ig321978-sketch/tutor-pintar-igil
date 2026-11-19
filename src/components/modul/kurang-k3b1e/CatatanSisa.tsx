"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KURANG, KOLOM_INFO_KURANG, SELESAI_INFO_KURANG, SUARA_INFO_KURANG, TEMA_INFO_KURANG } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab E: Catatan Sisa. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function CatatanSisa({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KURANG} kolom={KOLOM_INFO_KURANG} tema={TEMA_INFO_KURANG} suaraAwal={SUARA_INFO_KURANG} pesanSelesai={SELESAI_INFO_KURANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
