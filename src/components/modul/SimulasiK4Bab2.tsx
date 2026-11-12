"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPecahanK4B2 from "./SimulasiLabPecahanK4B2";
import SimulasiLabBatangK4B2 from "./SimulasiLabBatangK4B2";
import SimulasiLabSenilaiK4B2 from "./SimulasiLabSenilaiK4B2";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B2A, SKENARIO_K4B2B, SKENARIO_K4B2C } from "./skenario-k4b2-biasa";
import { MESIN_BATANG, MESIN_PECAHAN, MESIN_SENILAI } from "./mesin-data-k4b2-biasa";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab2, ID_SKENARIO_K4B2, type KeadaanK4Bab2 } from "./misi-k4bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B2, NAMA_SIM_K4B2, hurufK4B2, misiAwalK4Bab2, type HurufK4B2 } from "./misi-teks-k4b2";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 2 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab2.ts. */
/*   A Pecahan pembilang satu : Lab Pecahan + Mesin Pecahan + Pizza Tiara      */
/*   B Penyebut sama          : Lab Batang + Mesin Batang + Kebun Slamet       */
/*   C Pecahan senilai        : Lab Senilai + Mesin Senilai + Cokelat Helen    */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B2, DefSkenario> = { A: SKENARIO_K4B2A, B: SKENARIO_K4B2B, C: SKENARIO_K4B2C };
const MESIN: Record<HurufK4B2, DefMesin> = { A: MESIN_PECAHAN, B: MESIN_BATANG, C: MESIN_SENILAI };

const COBA_MESIN: Record<HurufK4B2, string[]> = {
  A: ["Ketuk stasiun Banding sebelum Bagi. Apa kata mesin?", "Pada 1/4 dan 1/2, pecahan mana yang bagiannya lebih besar?", "Mengapa penyebut besar membuat tiap bagian kecil?"],
  B: ["Ketuk stasiun Urut sebelum Penyebut. Apa kata mesin?", "Pada penyebut yang sama, bagian mana yang menentukan besar kecil?", "Mengapa penyebut yang berbeda tidak boleh langsung dibandingkan pembilangnya?"],
  C: ["Ketuk stasiun Sederhana sebelum Gambar. Apa kata mesin?", "Mengapa pembilang dan penyebut harus diubah sama-sama?", "Bagaimana FPB membantu menyederhanakan pecahan?"],
};

const LAB: Record<HurufK4B2, { id: string; nama: string }> = {
  A: { id: "pecahan", nama: "Lab Pecahan" },
  B: { id: "batang", nama: "Lab Batang" },
  C: { id: "senilai", nama: "Lab Senilai" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B2; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab2) => void }) {
  if (huruf === "B") return <SimulasiLabBatangK4B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabSenilaiK4B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabPecahanK4B2 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B2(sub);
  const daftar = daftarMisiK4Bab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B2[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B2[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab2) => laporMisi(daftar, k, a.capai);
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
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B2[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pecahan" />;
      },
    },
  ];
};

export { misiAwalK4Bab2 };

export default function SimulasiK4Bab2Materi({
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
  const huruf = hurufK4B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
