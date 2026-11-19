"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TIMBANG, KOLOM_INFO_TIMBANG, SELESAI_INFO_TIMBANG, SUARA_INFO_TIMBANG, TEMA_INFO_TIMBANG } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 6 Sub-Bab A: Papan Lapangan. Lima kartu kejadian dari Story (satu kejadian per layar, tiga isian pendek, Label Contoh), lalu poster tabel ringkasan.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanLapangan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TIMBANG} kolom={KOLOM_INFO_TIMBANG} tema={TEMA_INFO_TIMBANG} suaraAwal={SUARA_INFO_TIMBANG} pesanSelesai={SELESAI_INFO_TIMBANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
