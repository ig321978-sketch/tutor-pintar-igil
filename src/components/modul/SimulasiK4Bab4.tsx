"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B4, hurufK4B4, misiAwalK4Bab4 } from "./misi-teks-k4b4";
import { daftarMisiK4Bab4 as daftarMisiUbin } from "./misi-k4bab4";
import { laporMisi as laporMisiUbin } from "./misi-simulasi";
import SimulasiLantaiUbin from "./ubin-k4b4a/SimulasiLantaiUbin";
import type { KeadaanUbin } from "./ubin-k4b4a/logika";
import { daftarMisiK4Bab4 as daftarMisiEmber } from "./misi-k4bab4";
import { laporMisi as laporMisiEmber } from "./misi-simulasi";
import SimulasiBakEmber from "./ember-k4b4b/SimulasiBakEmber";
import type { KeadaanEmber } from "./ember-k4b4b/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 4 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Kolam Renang Tirta Ceria: A Lantai Ubin dan B Bak Ember.      */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Lantai Ubin. */
const langkahLantaiUbinA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Lantai Ubin",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B4.A,
  misiDaftar: daftarMisiUbin("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiLantaiUbin speakGuru={a.speakGuru} onKeadaan={(k: KeadaanUbin) => laporMisiUbin(daftarMisiUbin("A"), k, a.capai)} />,
});

/** Sub-Bab B: Bak Ember. */
const langkahBakEmberB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Bak Ember",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B4.B,
  misiDaftar: daftarMisiEmber("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBakEmber speakGuru={a.speakGuru} onKeadaan={(k: KeadaanEmber) => laporMisiEmber(daftarMisiEmber("B"), k, a.capai)} />,
});

const langkahK4Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B4(sub);
  if (huruf === "A") return [langkahLantaiUbinA()];
  if (huruf === "B") return [langkahBakEmberB()];
  return [langkahLantaiUbinA()];
};

export { misiAwalK4Bab4 };

export default function SimulasiK4Bab4Materi({
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
  const huruf = hurufK4B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
