"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiMejaUkur from "./SimulasiMejaUkur";
import SimulasiBandingPanjang from "./SimulasiBandingPanjang";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB7 } from "./skenario-kelas1";

/* Tab Simulasi Bab 7 (Panjang): lab 2D, PhET, skenario. */

export default function SimulasiBab7({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "Lab 2D", sub: "Meja Ukur", petunjuk: "Ukur pita di meja ukur dulu, ya.", mode: "sentuh", render: (a) => <SimulasiMejaUkur speakGuru={a.speakGuru} /> },
    { metode: "PhET", sub: "Bandingkan Panjang", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiBandingPanjang speakGuru={a.speakGuru} /> },
    {
      metode: "Skenario",
      sub: "Pita untuk Kado",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB7} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 7" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
