"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab4 } from "./misi-k2bab4";
import { laporMisi } from "./misi-simulasi";
import SimulasiRakPameran from "./rak-k2b4a/SimulasiRakPameran";
import { MISI_RAK_TEKS } from "./rak-k2b4a/data-peta";
import type { KeadaanRak } from "./rak-k2b4a/logika";
import SimulasiMejaRangkai from "./hias-k2b4b/SimulasiMejaRangkai";
import { MISI_HIAS_TEKS } from "./hias-k2b4b/data-peta";
import type { KeadaanMeja } from "./hias-k2b4b/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pameran         */
/* Kerajinan Sekolah: Sub-Bab A Rak Pameran, Sub-Bab B Meja Rangkai.         */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahRakPameranA /                */
/* langkahMejaRangkaiB (impor dari folder miliknya).                         */
/* ======================================================================== */

/** Sub-Bab B (akhir bab): Meja Rangkai. */
const langkahMejaRangkaiB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Rangkai",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_HIAS_TEKS,
  misiDaftar: daftarMisiK2Bab4("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaRangkai speakGuru={a.speakGuru} onKeadaan={(k: KeadaanMeja) => laporMisi(daftarMisiK2Bab4("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Rak Pameran. */
const langkahRakPameranA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Rak Pameran",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_RAK_TEKS,
  misiDaftar: daftarMisiK2Bab4("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiRakPameran speakGuru={a.speakGuru} onKeadaan={(k: KeadaanRak) => laporMisi(daftarMisiK2Bab4("A"), k, a.capai)} />,
});

const langkahK2Bab4 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahMejaRangkaiB()];
  return [langkahRakPameranA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab4 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab4(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab4Materi({
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
  return (
    <SimulasiAlur
      judulBab={`Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
