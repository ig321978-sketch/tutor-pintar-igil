"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TIKET, KOLOM_INFO_TIKET, SELESAI_INFO_TIKET, SUARA_INFO_TIKET, TEMA_INFO_TIKET } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab A: Daftar Tiket. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarTiketK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TIKET} kolom={KOLOM_INFO_TIKET} tema={TEMA_INFO_TIKET} suaraAwal={SUARA_INFO_TIKET} pesanSelesai={SELESAI_INFO_TIKET} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarTiketK4B1 };
