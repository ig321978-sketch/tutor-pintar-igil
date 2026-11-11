"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiBentukDatar from "./SimulasiBentukDatar";
import SimulasiBengkelUrai from "./SimulasiBengkelUrai";
import SimulasiLerengGelinding from "./SimulasiLerengGelinding";

/**
 * Tab Simulasi Matematika Kelas 2 Bab 3 (Bentuk di Sekitar Kita): 3 simulasi satu layar.
 * Metode dipilih sesuai isi bab: PhET (ciri bentuk datar), lab virtual 2D (mengurai dan menyusun),
 * dan PhET percobaan (bangun ruang menggelinding). Tidak ada mesin keadaan atau skenario karena bab ini
 * tidak punya proses berurutan; Lab 3D tidak dipakai karena bangun ruang baru muncul di Sub-Bab C.
 */
export default function SimulasiK2Bab3({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    {
      metode: "PhET",
      sub: "Sub-Bab A • Bentuk datar",
      petunjuk: "Mainkan dulu simulasinya, ya.",
      mode: "sentuh",
      render: (a) => <SimulasiBentukDatar speakGuru={a.speakGuru} />,
    },
    {
      metode: "Lab virtual 2D",
      sub: "Sub-Bab B • Mengurai dan menyusun bentuk",
      petunjuk: "Mainkan dulu simulasinya, ya.",
      mode: "sentuh",
      render: (a) => <SimulasiBengkelUrai speakGuru={a.speakGuru} />,
    },
    {
      metode: "PhET",
      sub: "Sub-Bab C • Bangun ruang",
      petunjuk: "Mainkan dulu simulasinya, ya.",
      mode: "sentuh",
      render: (a) => <SimulasiLerengGelinding speakGuru={a.speakGuru} />,
    },
  ];
  return <SimulasiAlur judulBab="Kelas 2 Bab 3" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
