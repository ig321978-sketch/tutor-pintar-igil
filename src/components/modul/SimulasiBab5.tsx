"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiPuluhan from "./SimulasiPuluhan";
import SimulasiOdometer from "./SimulasiOdometer";

/* Tab Simulasi Bab 5 (Bilangan 11 sampai 20): PhET dan mesin keadaan. Bab ini tidak memakai skenario. */

export default function SimulasiBab5({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "PhET", sub: "Laboratorium Puluhan dan Satuan", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiPuluhan speakGuru={a.speakGuru} /> },
    { metode: "Mesin keadaan", sub: "Odometer Bilangan", petunjuk: "Selesaikan ketiga misi odometer dulu, ya.", mode: "tuntas", render: (a) => <SimulasiOdometer speakGuru={a.speakGuru} onTuntas={a.tuntas} /> },
  ];
  return <SimulasiAlur judulBab="Bab 5" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
