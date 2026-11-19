"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab7 } from "./misi-k2bab7";
import { laporMisi as laporMisiPapan, laporMisi as laporMisiIkat } from "./misi-simulasi";
import SimulasiGudangIkat from "./ikat-k2b7a/SimulasiGudangIkat";
import { MISI_IKAT_TEKS } from "./ikat-k2b7a/data-peta";
import type { KeadaanIkat } from "./ikat-k2b7a/logika";
import SimulasiPapanPengumuman from "./papan-k2b7b/SimulasiPapanPengumuman";
import { MISI_PAPAN_TEKS } from "./papan-k2b7b/data-sim";
import type { KeadaanPapan } from "./papan-k2b7b/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 7 di dalam Materi (tahap 4 SMISCPA). Bank Sampah:    */
/* Sub-Bab A Gudang Ikat, Sub-Bab B Papan Pengumuman.                        */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahGudangIkatA /                */
/* langkahPapanB (impor dari folder miliknya; render sekarang null).         */
/* ======================================================================== */

/** Sub-Bab B (akhir bab): Papan Pengumuman. */
const langkahPapanB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Pengumuman",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_PAPAN_TEKS,
  misiDaftar: daftarMisiK2Bab7("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanPengumuman speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPapan) => laporMisiPapan(daftarMisiK2Bab7("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Gudang Ikat. */
const langkahGudangIkatA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Gudang Ikat",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_IKAT_TEKS,
  misiDaftar: daftarMisiK2Bab7("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGudangIkat speakGuru={a.speakGuru} onKeadaan={(k: KeadaanIkat) => laporMisiIkat(daftarMisiK2Bab7("A"), k, a.capai)} />,
});

const langkahK2Bab7 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahPapanB()];
  return [langkahGudangIkatA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab7 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab7(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab7Materi({
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
      judulBab={`Bab 7 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab7(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
