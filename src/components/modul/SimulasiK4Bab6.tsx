"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B6, hurufK4B6, misiAwalK4Bab6 } from "./misi-teks-k4b6";
import { daftarMisiK4Bab6 as daftarMisiJajanan } from "./misi-k4bab6";
import { laporMisi as laporMisiJajanan } from "./misi-simulasi";
import SimulasiPiktogramJajanan from "./jajanan-k4b6a/SimulasiPiktogramJajanan";
import type { KeadaanJajanan } from "./jajanan-k4b6a/logika";
import { daftarMisiK4Bab6 as daftarMisiBazar } from "./misi-k4bab6";
import { laporMisi as laporMisiBazar } from "./misi-simulasi";
import SimulasiBatangBazar from "./bazar-k4b6b/SimulasiBatangBazar";
import type { KeadaanBazar } from "./bazar-k4b6b/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 6 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Bazar Kuliner Sekolah: A Piktogram Jajanan dan B Batang Bazar.            */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Piktogram Jajanan. */
const langkahPiktogramJajananA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Piktogram Jajanan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B6.A,
  misiDaftar: daftarMisiJajanan("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPiktogramJajanan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJajanan) => laporMisiJajanan(daftarMisiJajanan("A"), k, a.capai)} />,
});

/** Sub-Bab B: Batang Bazar. */
const langkahBatangBazarB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Batang Bazar",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B6.B,
  misiDaftar: daftarMisiBazar("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBatangBazar speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBazar) => laporMisiBazar(daftarMisiBazar("B"), k, a.capai)} />,
});

const langkahK4Bab6 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B6(sub);
  if (huruf === "A") return [langkahPiktogramJajananA()];
  if (huruf === "B") return [langkahBatangBazarB()];
  return [langkahPiktogramJajananA()];
};

export { misiAwalK4Bab6 };

export default function SimulasiK4Bab6Materi({
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
  const huruf = hurufK4B6(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 6 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab6(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
