"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabO2K1A from "./o2k1a-lab-ui";
import { daftarMisiO2K1A, type KeadaanO2K1A } from "./o2k1a-misi";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_O2K1A, NAMA_SIM_O2K1A, misiAwalO2K1A } from "./o2k1a-misi-teks";

/* ======================================================================== */
/* Simulasi Opsi 2 Kelas 1 Bab 1 Sub-Bab A di dalam Materi (tahap 4 SMISCPA).   */
/* Satu laboratorium: Kebun dan Nampan Nenek. Misi di o2k1a-misi.ts.             */
/* Naskah orisinal IGIL, dunia Kampung Cemara.                                    */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const langkahK1B1Kedua = (): LangkahSim[] => {
  const daftar = daftarMisiO2K1A();
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_O2K1A,
      petunjuk: MAINKAN_DULU,
      misi: MISI_O2K1A,
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanO2K1A) => laporMisi(daftar, k, a.capai);
        const lab: TabLab = { id: "kebun", nama: NAMA_SIM_O2K1A, render: () => <SimulasiLabO2K1A speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        return <LabBertahap tab={[lab]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalO2K1A as misiAwalK1B1Kedua };

export default function SimulasiK1B1KeduaMateri({
  speakGuru,
  onSelesai,
  teksAkhir,
}: {
  sub: string;
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
}) {
  return (
    <SimulasiAlur
      judulBab="Kelas 1 Bab 1 Kedua · Sub-Bab A"
      langkah={langkahK1B1Kedua()}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
