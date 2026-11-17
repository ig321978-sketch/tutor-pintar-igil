"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiBab8 } from "./misi-bab8";
import { laporMisi } from "./misi-simulasi";
import SimulasiMejaPilah from "./pustaka-k1b8a/SimulasiMejaPilah";
import { MISI_MEJA } from "./pustaka-k1b8a/data";
import type { KeadaanMeja } from "./pustaka-k1b8a/logika";
import SimulasiPapanSurvei from "./survei-k1b8b/SimulasiPapanSurvei";
import { MISI_SURVEI } from "./survei-k1b8b/data";
import type { KeadaanSurvei } from "./survei-k1b8b/logika";

/* ======================================================================== */
/* Simulasi Bab 8 di dalam Materi (tahap 4 SMISCPA). Perpustakaan Keliling: */
/* Sub-Bab A Meja Pilah, Sub-Bab B Papan Survei. KERANGKA: agen Sub-Bab     */
/* mengisi fungsi langkahPustakaA / langkahSurveiB.                          */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const tampilMisi = (sub: string) => daftarMisiBab8(sub).map(({ id, teks, wajib }) => ({ id, teks, wajib }));

/** Sub-Bab B (penutup bab). */
const langkahSurveiB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Survei",
  petunjuk: MAINKAN_DULU,
  misi: MISI_SURVEI,
  misiDaftar: tampilMisi("B"),
  mode: "sentuh",
  render: (a) => <SimulasiPapanSurvei speakGuru={a.speakGuru} onKeadaan={(k: KeadaanSurvei) => laporMisi(daftarMisiBab8("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita Perpustakaan Keliling). */
const langkahPustakaA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Pilah",
  petunjuk: MAINKAN_DULU,
  misi: MISI_MEJA,
  misiDaftar: tampilMisi("A"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaPilah speakGuru={a.speakGuru} onKeadaan={(k: KeadaanMeja) => laporMisi(daftarMisiBab8("A"), k, a.capai)} />,
});

const langkahBab8 = (sub: string): LangkahSim[] => {
  if (sub === "A") return [langkahPustakaA()];
  return [langkahSurveiB()];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab8 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab8(sub)[0].misi ?? ""}`;

export default function SimulasiBab8Materi({
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
  const huruf = ["A", "B"].includes(sub) ? sub : "A";
  return <SimulasiAlur judulBab={`Bab 8 · Sub-Bab ${huruf}`} langkah={langkahBab8(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
