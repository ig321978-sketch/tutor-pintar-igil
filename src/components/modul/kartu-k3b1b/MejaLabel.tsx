"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KARTU, KOLOM_INFO_KARTU, SELESAI_INFO_KARTU, SUARA_INFO_KARTU, TEMA_INFO_KARTU } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab B: Meja Label. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function MejaLabel({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KARTU} kolom={KOLOM_INFO_KARTU} tema={TEMA_INFO_KARTU} suaraAwal={SUARA_INFO_KARTU} pesanSelesai={SELESAI_INFO_KARTU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MejaLabel as MejaLabelK3B1 };
