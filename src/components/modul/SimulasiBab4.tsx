"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiPapanPaku from "./SimulasiPapanPaku";
import SimulasiCiriBentuk from "./SimulasiCiriBentuk";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB4 } from "./skenario-kelas1";

/* Tab Simulasi Bab 4 (Bentuk datar): lab 2D, PhET, skenario. */

export default function SimulasiBab4({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "Lab 2D", sub: "Papan Paku Bebas", petunjuk: "Pasang karet di papan paku dulu, ya.", mode: "sentuh", render: (a) => <SimulasiPapanPaku speakGuru={a.speakGuru} /> },
    { metode: "PhET", sub: "Laboratorium Ciri Bentuk", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiCiriBentuk speakGuru={a.speakGuru} /> },
    {
      metode: "Skenario",
      sub: "Arsitek Cilik",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB4} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 4" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
