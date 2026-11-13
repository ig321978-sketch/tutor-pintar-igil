"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabSusunanK6B3 from "./SimulasiLabSusunanK6B3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K6B3A } from "./skenario-k6b3";
import { MESIN_SUSUNAN } from "./mesin-susunan-k6b3";
import { ejaK6B3 } from "./eja-k6b3";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK6Bab3, ID_SKENARIO_K6B3, type KeadaanK6Bab3 } from "./misi-k6bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K6B3, NAMA_SIM_K6B3, hurufK6B3, misiAwalK6Bab3, type HurufK6B3 } from "./misi-teks-k6b3";

/* ======================================================================== */
/* Simulasi Kelas 6 Bab 3 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k6bab3.ts. */
/*   A Mengonstruksi dan Mengurai: Lab Susunan + Mesin Susunan + Tigor dan Tenri Susun Rumah Kubus */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK6B3, DefSkenario> = { A: SKENARIO_K6B3A };
const MESIN: Record<HurufK6B3, DefMesin> = { A: MESIN_SUSUNAN };

const COBA_MESIN: Record<HurufK6B3, string[]> = {
  A: ["Ketuk stasiun Urai sebelum Hitung. Apa kata mesin?", "Mengapa seluruh kubus balok dihitung dari kubus satu lantai dikali banyak lantai?", "Mengapa kubus lantai kedua tidak boleh melayang?"],
};

const LAB: Record<HurufK6B3, { id: string; nama: string }> = {
  A: { id: "susunan", nama: "Lab Susunan" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK6B3; speakGuru: (t: string) => void; lapor: (k: KeadaanK6Bab3) => void }) {
  void huruf;
  return <SimulasiLabSusunanK6B3 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK6Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK6B3(sub);
  const daftar = daftarMisiK6Bab3(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K6B3[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K6B3[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK6Bab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK6B3} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K6B3[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium kubus dan balok" />;
      },
    },
  ];
};

export { misiAwalK6Bab3 };

export default function SimulasiK6Bab3Materi({
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
  const huruf = hurufK6B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 6 Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK6Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
