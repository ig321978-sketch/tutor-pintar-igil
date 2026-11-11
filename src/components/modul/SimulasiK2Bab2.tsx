"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiCaraHitung from "./SimulasiCaraHitung";
import SimulasiMesinSimpan from "./SimulasiMesinSimpan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B2 } from "./skenario-k2b2";

/* Tab Simulasi Kelas 2 Bab 2 (Penjumlahan dan Pengurangan): PhET, mesin, skenario. */

export default function SimulasiK2Bab2({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    {
      metode: "PhET",
      sub: "Laboratorium Cara Hitung",
      petunjuk: "Mainkan dulu simulasinya, ya.",
      mode: "sentuh",
      render: (a) => <SimulasiCaraHitung speakGuru={a.speakGuru} />,
    },
    {
      metode: "Mesin keadaan",
      sub: "Mesin Simpan dan Urai",
      petunjuk: "Selesaikan ketiga misi mesin dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiMesinSimpan speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
    {
      metode: "Skenario",
      sub: "Jambu dan Burung",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_K2B2} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Kelas 2 Bab 2" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
