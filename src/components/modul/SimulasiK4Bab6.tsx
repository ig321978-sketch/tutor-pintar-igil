"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPiktogramK4B6 from "./SimulasiLabPiktogramK4B6";
import SimulasiLabBatangK4B6 from "./SimulasiLabBatangK4B6";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B6A, SKENARIO_K4B6B } from "./skenario-k4b6";
import { MESIN_BATANG, MESIN_PIKTOGRAM } from "./mesin-data-k4b6";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab6, ID_SKENARIO_K4B6, type KeadaanK4Bab6 } from "./misi-k4bab6";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B6, NAMA_SIM_K4B6, hurufK4B6, misiAwalK4Bab6, type HurufK4B6 } from "./misi-teks-k4b6";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 6 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab6.ts. */
/*   A Piktogram : Lab Piktogram + Mesin Piktogram + Turus Kelas Karel      */
/*   B Batang    : Lab Batang + Mesin Batang + Pameran Data Azizah (bab)    */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B6, DefSkenario> = { A: SKENARIO_K4B6A, B: SKENARIO_K4B6B };
const MESIN: Record<HurufK4B6, DefMesin> = { A: MESIN_PIKTOGRAM, B: MESIN_BATANG };

const COBA_MESIN: Record<HurufK4B6, string[]> = {
  A: ["Ketuk stasiun Banding sebelum Skala. Apa kata mesin?", "Mengapa simbol harus utuh dan tidak terlalu banyak?", "Apa beda jumlah dan selisih?"],
  B: ["Ketuk stasiun Simpulkan sebelum Sumbu. Apa kata mesin?", "Mengapa label sumbu bertukar saat diagram dibuat mendatar?", "Mengapa nilai tidak berubah saat arah batang berubah?"],
};

const LAB: Record<HurufK4B6, { id: string; nama: string }> = {
  A: { id: "piktogram", nama: "Lab Piktogram" },
  B: { id: "batang", nama: "Lab Batang" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B6; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab6) => void }) {
  if (huruf === "B") return <SimulasiLabBatangK4B6 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabPiktogramK4B6 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab6 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B6(sub);
  const daftar = daftarMisiK4Bab6(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B6[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B6[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab6) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B6[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium piktogram dan diagram batang" />;
      },
    },
  ];
};

export { misiAwalK4Bab6 };

export default function SimulasiK4Bab6Materi({
  sub,
  speakGuru,
  onSelesai,
  teksAkhir,
}: {
  sub: string;
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
}) {
  const huruf = hurufK4B6(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 6 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab6(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
