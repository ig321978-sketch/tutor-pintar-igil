"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab5 } from "./misi-k2bab5";
import { laporMisi } from "./misi-simulasi";
import SimulasiBedengBibit from "./bibit-k2b5b/SimulasiBedengBibit";
import { MISI_BIBIT_TEKS } from "./bibit-k2b5b/data-peta";
import type { KeadaanBibit } from "./bibit-k2b5b/logika";
import SimulasiMejaPanen from "./panen-k2b5c/SimulasiMejaPanen";
import { MISI_PANEN_TEKS } from "./panen-k2b5c/data-sim";
import type { KeadaanPanen } from "./panen-k2b5c/logika";
import SimulasiMejaBagi from "./semangka-k2b5a/SimulasiMejaBagi";
import { MISI_BAGI_TEKS } from "./semangka-k2b5a/data-peta";
import type { KeadaanSemangka } from "./semangka-k2b5a/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 5 di dalam Materi (tahap 4 SMISCPA). Kebun Sekolah:  */
/* Sub-Bab A Meja Bagi, Sub-Bab B Bedeng Bibit, Sub-Bab C Meja Panen.        */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahMejaBagiA /                  */
/* langkahBedengBibitB / langkahMejaPanenC (impor dari folder miliknya).     */
/* ======================================================================== */

/** Sub-Bab C (akhir bab): Meja Panen. KERANGKA. */
const langkahMejaPanenC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Panen",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_PANEN_TEKS,
  misiDaftar: daftarMisiK2Bab5("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaPanen speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPanen) => laporMisi(daftarMisiK2Bab5("C"), k, a.capai)} />,
});

/** Sub-Bab B (tengah cerita): Bedeng Bibit. */
const langkahBedengBibitB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Bedeng Bibit",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_BIBIT_TEKS,
  misiDaftar: daftarMisiK2Bab5("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBedengBibit speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBibit) => laporMisi(daftarMisiK2Bab5("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Meja Bagi. */
const langkahMejaBagiA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Bagi",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_BAGI_TEKS,
  misiDaftar: daftarMisiK2Bab5("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaBagi speakGuru={a.speakGuru} onKeadaan={(k: KeadaanSemangka) => laporMisi(daftarMisiK2Bab5("A"), k, a.capai)} />,
});

const langkahK2Bab5 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahBedengBibitB()];
  if (sub === "C") return [langkahMejaPanenC()];
  return [langkahMejaBagiA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab5 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab5(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab5Materi({
  sub,
  speakGuru,
  onSelesai,
  teksAkhir,
}: {
  sub: string;
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
}) {
  const huruf = ["A", "B", "C"].includes(sub) ? sub : "A";
  return (
    <SimulasiAlur
      judulBab={`Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
