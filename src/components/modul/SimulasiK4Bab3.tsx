"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B3, hurufK4B3, misiAwalK4Bab3 } from "./misi-teks-k4b3";
import { daftarMisiK4Bab3 as daftarMisiKursi } from "./misi-k4bab3";
import { laporMisi as laporMisiKursi } from "./misi-simulasi";
import SimulasiPapanKursi from "./kursi-k4b3b/SimulasiPapanKursi";
import type { KeadaanKursi } from "./kursi-k4b3b/logika";
import { daftarMisiK4Bab3 as daftarMisiAngklung } from "./misi-k4bab3";
import { laporMisi as laporMisiAngklung } from "./misi-simulasi";
import SimulasiPanggungDeret from "./angklung-k4b3a/SimulasiPanggungDeret";
import type { KeadaanAngklung } from "./angklung-k4b3a/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 3 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Orkestra Angklung Kampung Senandung: A Panggung Deret dan B Papan Kursi.      */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Panggung Deret. */
const langkahPanggungDeretA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Panggung Deret",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B3.A,
  misiDaftar: daftarMisiAngklung("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPanggungDeret speakGuru={a.speakGuru} onKeadaan={(k: KeadaanAngklung) => laporMisiAngklung(daftarMisiAngklung("A"), k, a.capai)} />,
});

/** Sub-Bab B: Papan Kursi. */
const langkahPapanKursiB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Kursi",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B3.B,
  misiDaftar: daftarMisiKursi("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanKursi speakGuru={a.speakGuru} onKeadaan={(k: KeadaanKursi) => laporMisiKursi(daftarMisiKursi("B"), k, a.capai)} />,
});

const langkahK4Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B3(sub);
  if (huruf === "A") return [langkahPanggungDeretA()];
  if (huruf === "B") return [langkahPapanKursiB()];
  return [langkahPanggungDeretA()];
};

export { misiAwalK4Bab3 };

export default function SimulasiK4Bab3Materi({
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
  const huruf = hurufK4B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
