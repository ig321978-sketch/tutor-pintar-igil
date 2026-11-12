"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabDataK5B8 from "./SimulasiLabDataK5B8";
import SimulasiLabPiktogramK5B8 from "./SimulasiLabPiktogramK5B8";
import SimulasiLabBatangK5B8 from "./SimulasiLabBatangK5B8";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B8A, SKENARIO_K5B8B, SKENARIO_K5B8C } from "./skenario-k5b8";
import { MESIN_DATA, MESIN_PIKTOGRAM, MESIN_BATANG } from "./mesin-data-k5b8";
import { ejaK5B8 } from "./eja-k5b8";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab8, ID_SKENARIO_K5B8, type KeadaanK5Bab8 } from "./misi-k5bab8";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B8, NAMA_SIM_K5B8, hurufK5B8, misiAwalK5Bab8, type HurufK5B8 } from "./misi-teks-k5b8";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 8 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab8.ts. */
/*   A Mengumpulkan data : Lab Data + Mesin Data + Anggi dan Donat          */
/*   B Piktogram : Lab Piktogram + Mesin Piktogram + Anggi dan Kue Apem     */
/*   C Diagram batang : Lab Batang + Mesin Batang + Rani dan Sea Games      */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B8, DefSkenario> = { A: SKENARIO_K5B8A, B: SKENARIO_K5B8B, C: SKENARIO_K5B8C };
const MESIN: Record<HurufK5B8, DefMesin> = { A: MESIN_DATA, B: MESIN_PIKTOGRAM, C: MESIN_BATANG };

const COBA_MESIN: Record<HurufK5B8, string[]> = {
  A: ["Ketuk stasiun Keputusan sebelum Turus. Apa kata mesin?", "Mengapa jumlah semua frekuensi harus sama dengan banyak data?", "Mengapa keputusan sebaiknya memilih frekuensi yang paling besar?"],
  B: ["Ketuk stasiun Periksa sebelum Kunci. Apa kata mesin?", "Mengapa setengah simbol bernilai setengah kunci?", "Mengapa banyak simbol harus dicocokkan dengan tabel frekuensi?"],
  C: ["Ketuk stasiun Penyajian sebelum Baca. Apa kata mesin?", "Mengapa skala harus mulai dari nol dan jaraknya teratur?", "Mengapa dua batang dibandingkan dengan skala yang sama?"],
};

const LAB: Record<HurufK5B8, { id: string; nama: string }> = {
  A: { id: "data", nama: "Lab Data" },
  B: { id: "piktogram", nama: "Lab Piktogram" },
  C: { id: "batang", nama: "Lab Batang" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK5B8; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab8) => void }) {
  if (huruf === "C") return <SimulasiLabBatangK5B8 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "B") return <SimulasiLabPiktogramK5B8 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabDataK5B8 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab8 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B8(sub);
  const daftar = daftarMisiK5Bab8(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B8[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B8[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab8) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B8} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B8[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium data" />;
      },
    },
  ];
};

export { misiAwalK5Bab8 };

export default function SimulasiK5Bab8Materi({
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
  const huruf = hurufK5B8(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 8 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab8(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
