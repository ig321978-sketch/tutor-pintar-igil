"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiKurang from "./SimulasiKurang";
import SimulasiMesinBus from "./SimulasiMesinBus";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB3 } from "./skenario-kelas1";

/* Tab Simulasi Bab 3 (Pengurangan sampai 10): PhET, mesin keadaan, skenario. */

export default function SimulasiBab3({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "PhET", sub: "Laboratorium Pengurangan", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiKurang speakGuru={a.speakGuru} /> },
    { metode: "Mesin keadaan", sub: "Bus Sekolah", petunjuk: "Antar bus sampai terminal dulu, ya.", mode: "tuntas", render: (a) => <SimulasiMesinBus speakGuru={a.speakGuru} onTuntas={a.tuntas} /> },
    {
      metode: "Skenario",
      sub: "Pesta Jeruk",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB3} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 3" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
