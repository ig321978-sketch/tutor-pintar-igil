"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_GAMBAR, KOLOM_INFO_GAMBAR, SELESAI_INFO_GAMBAR, SUARA_INFO_GAMBAR, TEMA_INFO_GAMBAR } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 8 Sub-Bab B: Papan Layar. Satu tabel lima baris dari data Story (satu baris penuh contoh di baris pertama), label tiap baris di bawah barisnya.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanLayar({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_GAMBAR} kolom={KOLOM_INFO_GAMBAR} tema={TEMA_INFO_GAMBAR} suaraAwal={SUARA_INFO_GAMBAR} pesanSelesai={SELESAI_INFO_GAMBAR} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
