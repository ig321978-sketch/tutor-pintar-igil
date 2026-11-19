"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KALI, KOLOM_INFO_KALI, SELESAI_INFO_KALI, SUARA_INFO_KALI, TEMA_INFO_KALI } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab F: Rak botol dan telur. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export function RakBotolK3B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KALI} kolom={KOLOM_INFO_KALI} tema={TEMA_INFO_KALI} suaraAwal={SUARA_INFO_KALI} pesanSelesai={SELESAI_INFO_KALI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export default RakBotolK3B1;
