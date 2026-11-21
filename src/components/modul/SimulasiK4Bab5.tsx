"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B5, hurufK4B5, misiAwalK4Bab5 } from "./misi-teks-k4b5";
import { daftarMisiK4Bab5 as daftarMisiEtalase } from "./misi-k4bab5";
import { laporMisi as laporMisiEtalase } from "./misi-simulasi";
import SimulasiEtalaseKeramik from "./etalase-k4b5a/SimulasiEtalaseKeramik";
import type { KeadaanEtalase } from "./etalase-k4b5a/logika";
import { daftarMisiK4Bab5 as daftarMisiMosaik } from "./misi-k4bab5";
import { laporMisi as laporMisiMosaik } from "./misi-simulasi";
import SimulasiMosaikKeramik from "./mosaik-k4b5b/SimulasiMosaikKeramik";
import type { KeadaanMosaik } from "./mosaik-k4b5b/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 5 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Toko Keramik Bu Dewi: A Etalase Keramik dan B Mosaik Keramik.             */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Etalase Keramik. */
const langkahEtalaseKeramikA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Etalase Keramik",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B5.A,
  misiDaftar: daftarMisiEtalase("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiEtalaseKeramik speakGuru={a.speakGuru} onKeadaan={(k: KeadaanEtalase) => laporMisiEtalase(daftarMisiEtalase("A"), k, a.capai)} />,
});

/** Sub-Bab B: Mosaik Keramik. */
const langkahMosaikKeramikB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Mosaik Keramik",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B5.B,
  misiDaftar: daftarMisiMosaik("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMosaikKeramik speakGuru={a.speakGuru} onKeadaan={(k: KeadaanMosaik) => laporMisiMosaik(daftarMisiMosaik("B"), k, a.capai)} />,
});

const langkahK4Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B5(sub);
  if (huruf === "A") return [langkahEtalaseKeramikA()];
  if (huruf === "B") return [langkahMosaikKeramikB()];
  return [langkahEtalaseKeramikA()];
};

export { misiAwalK4Bab5 };

export default function SimulasiK4Bab5Materi({
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
  const huruf = hurufK4B5(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
