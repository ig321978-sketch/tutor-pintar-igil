"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPetakK5B5 from "./SimulasiLabPetakK5B5";
import SimulasiLabRumusK5B5 from "./SimulasiLabRumusK5B5";
import SimulasiLabGabunganK5B5 from "./SimulasiLabGabunganK5B5";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B5A, SKENARIO_K5B5B, SKENARIO_K5B5C } from "./skenario-k5b5";
import { MESIN_PETAK, MESIN_RUMUS, MESIN_GABUNGAN } from "./mesin-data-k5b5";
import { ejaK5B5 } from "./eja-k5b5";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab5, ID_SKENARIO_K5B5, type KeadaanK5Bab5 } from "./misi-k5bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B5, NAMA_SIM_K5B5, hurufK5B5, misiAwalK5Bab5, type HurufK5B5 } from "./misi-teks-k5b5";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 5 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab5.ts. */
/*   A Petak : Lab Petak + Mesin Petak + Ubin Alun-Alun                     */
/*   B Rumus : Lab Rumus + Mesin Rumus + Taman Bentuk-Bentuk                */
/*   C Gabungan : Lab Gabungan + Mesin Gabungan + Denah Yohana dan Komang  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B5, DefSkenario> = { A: SKENARIO_K5B5A, B: SKENARIO_K5B5B, C: SKENARIO_K5B5C };
const MESIN: Record<HurufK5B5, DefMesin> = { A: MESIN_PETAK, B: MESIN_RUMUS, C: MESIN_GABUNGAN };

const COBA_MESIN: Record<HurufK5B5, string[]> = {
  A: ["Ketuk stasiun Satuan sebelum Tutup. Apa kata mesin?", "Mengapa luas ditulis dengan satuan persegi?", "Apa yang terjadi pada luas saat petak dipindah?"],
  B: ["Ketuk stasiun Tinggi sebelum Dasar. Apa kata mesin?", "Mengapa luas segitiga hanya setengah dari persegi panjang?", "Mengapa tinggi jajargenjang bukan sisi miring?"],
  C: ["Ketuk stasiun Jumlah sebelum Bagian. Apa kata mesin?", "Mengapa denah L yang dipotong dua cara luasnya sama?", "Mengapa luas bagian yang menumpuk tidak boleh dihitung dua kali?"],
};

const LAB: Record<HurufK5B5, { id: string; nama: string }> = {
  A: { id: "petak", nama: "Lab Petak" },
  B: { id: "rumus", nama: "Lab Rumus" },
  C: { id: "gabungan", nama: "Lab Gabungan" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK5B5; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab5) => void }) {
  if (huruf === "B") return <SimulasiLabRumusK5B5 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabGabunganK5B5 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabPetakK5B5 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B5(sub);
  const daftar = daftarMisiK5Bab5(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B5[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B5[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab5) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B5} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B5[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium luas daerah" />;
      },
    },
  ];
};

export { misiAwalK5Bab5 };

export default function SimulasiK5Bab5Materi({
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
  const huruf = hurufK5B5(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
