"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_URUT, KOLOM_INFO_URUT, SELESAI_INFO_URUT, SUARA_INFO_URUT, TEMA_INFO_URUT } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab C: Papan Urut. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanUrut({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_URUT} kolom={KOLOM_INFO_URUT} tema={TEMA_INFO_URUT} suaraAwal={SUARA_INFO_URUT} pesanSelesai={SELESAI_INFO_URUT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
