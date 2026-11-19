"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_JADWAL, KOLOM_INFO_JADWAL, SELESAI_INFO_JADWAL, SUARA_INFO_JADWAL, TEMA_INFO_JADWAL } from "./data-kartu";

/**
 * Infografis Kelas 2 Bab 6 Sub-Bab B: Spanduk Acara. Lima kartu kegiatan dari Story (satu kegiatan per layar, tiga isian pendek, Label Contoh), lalu poster tabel ringkasan.
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function SpandukAcara({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_JADWAL} kolom={KOLOM_INFO_JADWAL} tema={TEMA_INFO_JADWAL} suaraAwal={SUARA_INFO_JADWAL} pesanSelesai={SELESAI_INFO_JADWAL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
