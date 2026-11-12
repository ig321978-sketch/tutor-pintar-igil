"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabSegitigaK5B7 from "./SimulasiLabSegitigaK5B7";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B7A } from "./skenario-k5b7";
import { MESIN_SEGITIGA } from "./mesin-data-k5b7";
import { ejaK5B7 } from "./eja-k5b7";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab7, ID_SKENARIO_K5B7, type KeadaanK5Bab7 } from "./misi-k5bab7";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B7, NAMA_SIM_K5B7, hurufK5B7, misiAwalK5Bab7, type HurufK5B7 } from "./misi-teks-k5b7";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 7 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab7.ts. */
/*   A Segitiga : Lab Segitiga + Mesin Segitiga + Yohana di Candi Sewu       */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B7, DefSkenario> = { A: SKENARIO_K5B7A };
const MESIN: Record<HurufK5B7, DefMesin> = { A: MESIN_SEGITIGA };

const COBA_MESIN: Record<HurufK5B7, string[]> = {
  A: ["Ketuk stasiun Hierarki sebelum Syarat. Apa kata mesin?", "Mengapa sudut ketiga dicari dengan mengurangi dari 180 derajat?", "Mengapa segitiga sama sisi juga disebut segitiga sama kaki?"],
};

const LAB: Record<HurufK5B7, { id: string; nama: string }> = {
  A: { id: "segitiga", nama: "Lab Segitiga" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK5B7; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab7) => void }) {
  return <SimulasiLabSegitigaK5B7 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab7 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B7(sub);
  const daftar = daftarMisiK5Bab7(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B7[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B7[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab7) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B7} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B7[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bangun datar" />;
      },
    },
  ];
};

export { misiAwalK5Bab7 };

export default function SimulasiK5Bab7Materi({
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
  const huruf = hurufK5B7(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 7 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab7(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
