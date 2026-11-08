"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiLoncat from "./SimulasiLoncat";
import SimulasiJembatan from "./SimulasiJembatan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB6 } from "./skenario-kelas1";

/* Tab Simulasi Bab 6 (Jumlah dan kurang sampai 20): PhET, mesin keadaan, skenario. */

export default function SimulasiBab6({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "PhET", sub: "Garis Bilangan Loncat", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiLoncat speakGuru={a.speakGuru} /> },
    { metode: "Mesin keadaan", sub: "Jembatan Sepuluh", petunjuk: "Jalankan mesinnya sampai Selesai dulu, ya.", mode: "tuntas", render: (a) => <SimulasiJembatan speakGuru={a.speakGuru} onTuntas={a.tuntas} /> },
    {
      metode: "Skenario",
      sub: "Loket Pasar Malam",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB6} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 6" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
