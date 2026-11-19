"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_BILAH, KOLOM_INFO_BILAH, SELESAI_INFO_BILAH, SUARA_INFO_BILAH, TEMA_INFO_BILAH } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 4 Sub-Bab A: Daftar Bilah. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarBilahK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_BILAH} kolom={KOLOM_INFO_BILAH} tema={TEMA_INFO_BILAH} suaraAwal={SUARA_INFO_BILAH} pesanSelesai={SELESAI_INFO_BILAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarBilahK3B4 };
