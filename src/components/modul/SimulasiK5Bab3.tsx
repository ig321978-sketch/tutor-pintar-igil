"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabBandingK5B3 from "./SimulasiLabBandingK5B3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B3A } from "./skenario-k5b3";
import { MESIN_BANDING } from "./mesin-data-k5b3";
import { ejaK5B3 } from "./eja-k5b3";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab3, ID_SKENARIO_K5B3, type KeadaanK5Bab3 } from "./misi-k5bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B3, NAMA_SIM_K5B3, hurufK5B3, misiAwalK5Bab3, type HurufK5B3 } from "./misi-teks-k5b3";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 3 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab3.ts. */
/*   A Banding : Lab Banding Pecahan + Mesin Banding + Lompat Jauh Yohana   */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B3, DefSkenario> = { A: SKENARIO_K5B3A };
const MESIN: Record<HurufK5B3, DefMesin> = { A: MESIN_BANDING };

const COBA_MESIN: Record<HurufK5B3, string[]> = {
  A: ["Ketuk stasiun Urut sebelum Garis. Apa kata mesin?", "Mengapa penyebut harus sama sebelum dua pecahan dibandingkan?", "Di garis bilangan, pecahan mana yang paling kanan?"],
};

const LAB: Record<HurufK5B3, { id: string; nama: string }> = {
  A: { id: "banding", nama: "Lab Banding Pecahan" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK5B3; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab3) => void }) {
  return <SimulasiLabBandingK5B3 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B3(sub);
  const daftar = daftarMisiK5Bab3(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B3[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B3[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B3} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B3[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pecahan" />;
      },
    },
  ];
};

export { misiAwalK5Bab3 };

export default function SimulasiK5Bab3Materi({
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
  const huruf = hurufK5B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
