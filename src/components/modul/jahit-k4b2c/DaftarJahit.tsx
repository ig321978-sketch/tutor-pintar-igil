"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_JAHIT, KOLOM_INFO_JAHIT, SELESAI_INFO_JAHIT, SUARA_INFO_JAHIT, TEMA_INFO_JAHIT } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab C: Nota Pesanan. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_JAHIT} kolom={KOLOM_INFO_JAHIT} tema={TEMA_INFO_JAHIT} suaraAwal={SUARA_INFO_JAHIT} pesanSelesai={SELESAI_INFO_JAHIT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarJahitK4B2 };
