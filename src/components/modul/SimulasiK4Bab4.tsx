"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabLuasK4B4 from "./SimulasiLabLuasK4B4";
import SimulasiLabVolumeK4B4 from "./SimulasiLabVolumeK4B4";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B4A, SKENARIO_K4B4B } from "./skenario-k4b4";
import { MESIN_LUAS, MESIN_VOLUME } from "./mesin-data-k4b4";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab4, ID_SKENARIO_K4B4, type KeadaanK4Bab4 } from "./misi-k4bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B4, NAMA_SIM_K4B4, hurufK4B4, misiAwalK4Bab4, type HurufK4B4 } from "./misi-teks-k4b4";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab4.ts. */
/*   A Luas   : Lab Luas + Mesin Luas + Meja Lipat Helen                    */
/*   B Volume : Lab Volume + Mesin Volume + Dapur Helen (pencapaian bab)   */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B4, DefSkenario> = { A: SKENARIO_K4B4A, B: SKENARIO_K4B4B };
const MESIN: Record<HurufK4B4, DefMesin> = { A: MESIN_LUAS, B: MESIN_VOLUME };

const COBA_MESIN: Record<HurufK4B4, string[]> = {
  A: ["Ketuk stasiun Bandingkan sebelum Satuan. Apa kata mesin?", "Mengapa luas lantai memakai meter persegi, bukan meter?", "Bagaimana membandingkan meter persegi dengan sentimeter persegi?"],
  B: ["Ketuk stasiun Ubah sebelum Hitung. Apa kata mesin?", "Mengapa semua lapisan kubus harus dihitung?", "Berapa mililiter dalam satu liter?"],
};

const LAB: Record<HurufK4B4, { id: string; nama: string }> = {
  A: { id: "luas", nama: "Lab Luas" },
  B: { id: "volume", nama: "Lab Volume" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B4; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab4) => void }) {
  if (huruf === "B") return <SimulasiLabVolumeK4B4 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabLuasK4B4 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B4(sub);
  const daftar = daftarMisiK4Bab4(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B4[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B4[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab4) => laporMisi(daftar, k, a.capai);
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
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B4[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pengukuran" />;
      },
    },
  ];
};

export { misiAwalK4Bab4 };

export default function SimulasiK4Bab4Materi({
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
  const huruf = hurufK4B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
