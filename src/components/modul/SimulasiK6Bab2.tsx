"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabRasioK6B2 from "./SimulasiLabRasioK6B2";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K6B2A } from "./skenario-k6b2";
import { MESIN_RASIO } from "./mesin-rasio-k6b2";
import { ejaK6B2 } from "./eja-k6b2";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK6Bab2, ID_SKENARIO_K6B2, type KeadaanK6Bab2 } from "./misi-k6bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K6B2, NAMA_SIM_K6B2, hurufK6B2, misiAwalK6Bab2, type HurufK6B2 } from "./misi-teks-k6b2";

/* ======================================================================== */
/* Simulasi Kelas 6 Bab 2 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k6bab2.ts. */
/*   A Konsep Rasio : Lab Rasio + Mesin Rasio + Artus dan Lahan Bibit        */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK6B2, DefSkenario> = { A: SKENARIO_K6B2A };
const MESIN: Record<HurufK6B2, DefMesin> = { A: MESIN_RASIO };

const COBA_MESIN: Record<HurufK6B2, string[]> = {
  A: ["Ketuk stasiun Hasil sebelum Tulis. Apa kata mesin?", "Mengapa angka kiri untuk benda yang disebut lebih dulu?", "Mengapa kedua suku harus dibagi dengan pembagi yang sama?"],
};

const LAB: Record<HurufK6B2, { id: string; nama: string }> = {
  A: { id: "rasio", nama: "Lab Rasio" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK6B2; speakGuru: (t: string) => void; lapor: (k: KeadaanK6Bab2) => void }) {
  return <SimulasiLabRasioK6B2 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK6Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK6B2(sub);
  const daftar = daftarMisiK6Bab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K6B2[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K6B2[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK6Bab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK6B2} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K6B2[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium rasio" />;
      },
    },
  ];
};

export { misiAwalK6Bab2 };

export default function SimulasiK6Bab2Materi({
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
  const huruf = hurufK6B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 6 Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK6Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
