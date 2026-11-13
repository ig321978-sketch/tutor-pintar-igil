"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabSkalaK6B4 from "./SimulasiLabSkalaK6B4";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K6B4A } from "./skenario-k6b4";
import { MESIN_SKALA } from "./mesin-skala-k6b4";
import { ejaK6B4 } from "./eja-k6b4";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK6Bab4, ID_SKENARIO_K6B4, type KeadaanK6Bab4 } from "./misi-k6bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K6B4, NAMA_SIM_K6B4, hurufK6B4, misiAwalK6Bab4, type HurufK6B4 } from "./misi-teks-k6b4";

/* ======================================================================== */
/* Simulasi Kelas 6 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k6bab4.ts. */
/*   A Skala Peluang : Lab Skala + Mesin Skala + Dhien dan Poster Lomba      */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK6B4, DefSkenario> = { A: SKENARIO_K6B4A };
const MESIN: Record<HurufK6B4, DefMesin> = { A: MESIN_SKALA };

const COBA_MESIN: Record<HurufK6B4, string[]> = {
  A: ["Ketuk stasiun Ujung sebelum Hitung. Apa kata mesin?", "Mengapa dua kali yang cocok dilihat terhadap semua yang ada?", "Mengapa nol dan semuanya adalah dua ujung tangga?"],
};

const LAB: Record<HurufK6B4, { id: string; nama: string }> = {
  A: { id: "skala", nama: "Lab Skala" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK6B4; speakGuru: (t: string) => void; lapor: (k: KeadaanK6Bab4) => void }) {
  return <SimulasiLabSkalaK6B4 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK6Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK6B4(sub);
  const daftar = daftarMisiK6Bab4(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K6B4[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K6B4[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK6Bab4) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK6B4} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K6B4[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium peluang" />;
      },
    },
  ];
};

export { misiAwalK6Bab4 };

export default function SimulasiK6Bab4Materi({
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
  const huruf = hurufK6B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 6 Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK6Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
