"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabTempatK5B1 from "./SimulasiLabTempatK5B1";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B1A } from "./skenario-k5b1";
import { MESIN_TEMPAT } from "./mesin-data-k5b1";
import { ejaK5B1 } from "./eja-k5b1";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab1, ID_SKENARIO_K5B1, type KeadaanK5Bab1 } from "./misi-k5bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B1, NAMA_SIM_K5B1, hurufK5B1, misiAwalK5Bab1, type HurufK5B1 } from "./misi-teks-k5b1";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 1 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab1.ts. */
/*   A Nilai tempat : Lab Nilai Tempat + Mesin Nilai Tempat + Papan Data Desa */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B1, DefSkenario> = { A: SKENARIO_K5B1A };
const MESIN: Record<HurufK5B1, DefMesin> = { A: MESIN_TEMPAT };

const COBA_MESIN: Record<HurufK5B1, string[]> = {
  A: ["Ketuk stasiun Baca sebelum Tulis. Apa kata mesin?", "Mengapa nol tidak boleh dihapus dari bilangan?", "Apa beda digit dan nilai digit?"],
};

const LAB: Record<HurufK5B1, { id: string; nama: string }> = {
  A: { id: "nilai-tempat", nama: "Lab Nilai Tempat" },
};

function LabSub({ speakGuru, lapor }: { huruf: HurufK5B1; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab1) => void }) {
  return <SimulasiLabTempatK5B1 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B1(sub);
  const daftar = daftarMisiK5Bab1(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B1[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B1[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab1) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B1} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B1[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK5Bab1 };

export default function SimulasiK5Bab1Materi({
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
  const huruf = hurufK5B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
