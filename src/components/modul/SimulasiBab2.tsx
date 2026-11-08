"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiTambah from "./SimulasiTambah";
import SimulasiMesinTambah from "./SimulasiMesinTambah";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB2 } from "./skenario-kelas1";

/* Tab Simulasi Bab 2 (Penjumlahan sampai 10): PhET, mesin keadaan, skenario. */

export default function SimulasiBab2({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const langkah: LangkahSim[] = [
    { metode: "PhET", sub: "Laboratorium Penjumlahan", petunjuk: "Mainkan dulu simulasinya, ya.", mode: "sentuh", render: (a) => <SimulasiTambah speakGuru={a.speakGuru} /> },
    { metode: "Mesin keadaan", sub: "Mesin Tambah", petunjuk: "Jalankan mesinnya sampai Selesai dulu, ya.", mode: "tuntas", render: (a) => <SimulasiMesinTambah speakGuru={a.speakGuru} onTuntas={a.tuntas} /> },
    {
      metode: "Skenario",
      sub: "Kantin Sekolah",
      petunjuk: "Selesaikan skenarionya sampai akhir dulu, ya.",
      mode: "tuntas",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB2} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
  return <SimulasiAlur judulBab="Bab 2" langkah={langkah} speakGuru={speakGuru} onKeLatihan={onKeLatihan} />;
}
