"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K3B5, hurufK3B5, misiAwalK3Bab5 } from "./misi-teks-k3b5";
import { daftarMisiK3Bab5 } from "./misi-k3bab5";
import { laporMisi as laporMisiCatat } from "./misi-simulasi";
import SimulasiMejaCatat from "./papan-k3b5a/SimulasiMejaCatat";
import type { KeadaanCatat } from "./papan-k3b5a/logika";
import { laporMisi as laporMisiTabel } from "./misi-simulasi";
import SimulasiPapanTabel from "./tabel-k3b5b/SimulasiPapanTabel";
import type { KeadaanTabel } from "./tabel-k3b5b/logika";

/* ======================================================================== */
/* Simulasi Bab 5 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Bengkel Sepeda Pak Hasan: A Meja Catat, B Papan Tabel.*/
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Meja Catat. */
const langkahMejaCatatA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Catat",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B5.A,
  misiDaftar: daftarMisiK3Bab5("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaCatat speakGuru={a.speakGuru} onKeadaan={(k: KeadaanCatat) => laporMisiCatat(daftarMisiK3Bab5("A"), k, a.capai)} />,
});

/** Sub-Bab B: Papan Tabel. */
const langkahPapanTabelB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Tabel",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B5.B,
  misiDaftar: daftarMisiK3Bab5("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanTabel speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTabel) => laporMisiTabel(daftarMisiK3Bab5("B"), k, a.capai)} />,
});

const langkahK3Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B5(sub);
  if (huruf === "A") return [langkahMejaCatatA()];
  if (huruf === "B") return [langkahPapanTabelB()];
  return [langkahMejaCatatA()];
};

export { misiAwalK3Bab5 };

export default function SimulasiK3Bab5Materi({
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
  const huruf = hurufK3B5(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
