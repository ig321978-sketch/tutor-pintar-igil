"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabCiriK4B5 from "./SimulasiLabCiriK4B5";
import SimulasiLabSusunK4B5 from "./SimulasiLabSusunK4B5";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B5A, SKENARIO_K4B5B } from "./skenario-k4b5";
import { MESIN_CIRI, MESIN_SUSUN } from "./mesin-data-k4b5";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab5, ID_SKENARIO_K4B5, type KeadaanK4Bab5 } from "./misi-k4bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B5, NAMA_SIM_K4B5, hurufK4B5, misiAwalK4Bab5, type HurufK4B5 } from "./misi-teks-k4b5";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 5 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab5.ts. */
/*   A Ciri  : Lab Ciri + Mesin Ciri + Papan Paku Helen                     */
/*   B Susun : Lab Susun + Mesin Susun-Urai + Bengkel Kertas Helen (bab)   */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B5, DefSkenario> = { A: SKENARIO_K4B5A, B: SKENARIO_K4B5B };
const MESIN: Record<HurufK4B5, DefMesin> = { A: MESIN_CIRI, B: MESIN_SUSUN };

const COBA_MESIN: Record<HurufK4B5, string[]> = {
  A: ["Ketuk stasiun Nama sebelum Sisi. Apa kata mesin?", "Bagaimana memeriksa sudut siku-siku tanpa busur?", "Apa beda trapesium dan jajargenjang?"],
  B: ["Ketuk stasiun Luas sebelum Jenis. Apa kata mesin?", "Mengapa luas total tidak berubah saat bangun diurai?", "Apa beda komposisi dan dekomposisi?"],
};

const LAB: Record<HurufK4B5, { id: string; nama: string }> = {
  A: { id: "ciri", nama: "Lab Ciri" },
  B: { id: "susun", nama: "Lab Susun" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B5; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab5) => void }) {
  if (huruf === "B") return <SimulasiLabSusunK4B5 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabCiriK4B5 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B5(sub);
  const daftar = daftarMisiK4Bab5(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B5[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B5[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab5) => laporMisi(daftar, k, a.capai);
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
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B5[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bangun datar" />;
      },
    },
  ];
};

export { misiAwalK4Bab5 };

export default function SimulasiK4Bab5Materi({
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
  const huruf = hurufK4B5(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
