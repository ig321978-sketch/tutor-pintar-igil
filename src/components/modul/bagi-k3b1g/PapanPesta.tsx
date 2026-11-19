"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_BAGI, KOLOM_INFO_BAGI, SELESAI_INFO_BAGI, SUARA_INFO_BAGI, TEMA_INFO_BAGI } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab G: Papan Pesta. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanPesta({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_BAGI} kolom={KOLOM_INFO_BAGI} tema={TEMA_INFO_BAGI} suaraAwal={SUARA_INFO_BAGI} pesanSelesai={SELESAI_INFO_BAGI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanPesta as PapanPestaK3B1 };
