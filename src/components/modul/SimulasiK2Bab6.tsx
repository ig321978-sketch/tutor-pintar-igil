"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab6 } from "./misi-k2bab6";
import { laporMisi } from "./misi-simulasi";
import SimulasiPosWaktu from "./jadwal-k2b6b/SimulasiPosWaktu";
import { MISI_JADWAL_TEKS } from "./jadwal-k2b6b/data-sim";
import type { KeadaanJadwal } from "./jadwal-k2b6b/logika";
import SimulasiPosTimbang from "./timbang-k2b6a/SimulasiPosTimbang";
import { MISI_TIMBANG_TEKS } from "./timbang-k2b6a/data-peta";
import type { KeadaanTimbang } from "./timbang-k2b6a/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 6 di dalam Materi (tahap 4 SMISCPA). Hari Olahraga:  */
/* Sub-Bab A Pos Timbang, Sub-Bab B Pos Waktu.                               */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahPosTimbangA /                */
/* langkahPosWaktuB (impor dari folder miliknya).                            */
/* ======================================================================== */

/** Sub-Bab B (akhir bab): Pos Waktu. KERANGKA. */
const langkahPosWaktuB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Pos Waktu",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_JADWAL_TEKS,
  misiDaftar: daftarMisiK2Bab6("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPosWaktu speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJadwal) => laporMisi(daftarMisiK2Bab6("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Pos Timbang. */
const langkahPosTimbangA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Pos Timbang",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_TIMBANG_TEKS,
  misiDaftar: daftarMisiK2Bab6("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPosTimbang speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTimbang) => laporMisi(daftarMisiK2Bab6("A"), k, a.capai)} />,
});

const langkahK2Bab6 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahPosWaktuB()];
  return [langkahPosTimbangA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab6 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab6(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab6Materi({
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
      judulBab={`Bab 6 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab6(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
