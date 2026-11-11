"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiLab50 from "./SimulasiLab50";
import SimulasiMesinTukar from "./SimulasiMesinTukar";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B1 } from "./skenario-k2b1";

/* Tab Simulasi Kelas 2 Bab 1 (Membilang sampai 50): PhET, mesin keadaan, skenario. */

export default function SimulasiK2Bab1({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    {
      metode: "PhET",
      sub: "Laboratorium Bilangan 50",
      petunjuk: "Mainkan dulu simulasinya, ya.",
      mode: "sentuh",
      render: (a) => <SimulasiLab50 speakGuru={a.speakGuru} />,
    },
    {
      metode: "Mesin keadaan",
      sub: "Mesin Tukar Puluhan",
      petunjuk: "Selesaikan ketiga misi tukar dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiMesinTukar speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
    {
      metode: "Skenario",
      sub: "Stoples Permen Kira",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_K2B1} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Kelas 2 Bab 1" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
