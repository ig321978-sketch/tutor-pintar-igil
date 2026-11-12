"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPojokK5B6 from "./SimulasiLabPojokK5B6";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B6A } from "./skenario-k5b6";
import { MESIN_POJOK } from "./mesin-data-k5b6";
import { ejaK5B6 } from "./eja-k5b6";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab6, ID_SKENARIO_K5B6, type KeadaanK5Bab6 } from "./misi-k5bab6";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B6, NAMA_SIM_K5B6, hurufK5B6, misiAwalK5Bab6, type HurufK5B6 } from "./misi-teks-k5b6";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 6 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab6.ts. */
/*   A Pojok : Lab Pojok + Mesin Pojok + Bingkai Pak Tukang                  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B6, DefSkenario> = { A: SKENARIO_K5B6A };
const MESIN: Record<HurufK5B6, DefMesin> = { A: MESIN_POJOK };

const COBA_MESIN: Record<HurufK5B6, string[]> = {
  A: ["Ketuk stasiun Putuskan sebelum Banding. Apa kata mesin?", "Mengapa pojok yang lebih sempit dari patokan disebut lancip?", "Apa yang dilakukan Pak Tukang pada pojok yang tidak berimpit?"],
};

const LAB: Record<HurufK5B6, { id: string; nama: string }> = {
  A: { id: "pojok", nama: "Lab Pojok" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK5B6; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab6) => void }) {
  return <SimulasiLabPojokK5B6 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab6 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B6(sub);
  const daftar = daftarMisiK5Bab6(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B6[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B6[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab6) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B6} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B6[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium sudut" />;
      },
    },
  ];
};

export { misiAwalK5Bab6 };

export default function SimulasiK5Bab6Materi({
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
  const huruf = hurufK5B6(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 6 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab6(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
