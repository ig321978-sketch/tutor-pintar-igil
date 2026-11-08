"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiBilangan from "./SimulasiBilangan";
import SimulasiKatak from "./SimulasiKatak";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB1 } from "./skenario-kelas1";

/* Tab Simulasi Bab 1 (Bilangan 1 sampai 10): PhET, mesin keadaan, skenario. */

export default function SimulasiBab1({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "PhET", sub: "Laboratorium Bilangan", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiBilangan speakGuru={a.speakGuru} /> },
    { metode: "Mesin keadaan", sub: "Katak Maju Mundur", petunjuk: "Selesaikan ketiga misi katak dulu, ya.", mode: "tuntas", render: (a) => <SimulasiKatak speakGuru={a.speakGuru} onTuntas={a.tuntas} /> },
    {
      metode: "Skenario",
      sub: "Kasir Warung",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB1} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 1" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
