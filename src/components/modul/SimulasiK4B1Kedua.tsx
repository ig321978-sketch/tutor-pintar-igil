"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabKemasanK4KA from "./SimulasiLabKemasanK4KA";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B1KA } from "./skenario-k4b1ka";
import { MESIN_BACA_KA } from "./mesin-data-k4b1ka";
import { daftarMisiK4B1KA, ID_SKENARIO_K4B1KA, type KeadaanK4B1KA } from "./misi-k4b1ka";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B1KA, NAMA_SIM_K4B1KA, misiAwalK4B1KA } from "./misi-teks-k4b1ka";

/* ======================================================================== */
/* Simulasi Modul Kedua Kelas 4 Bab 1 Sub-Bab A di dalam Materi (tahap 4 SMISCPA). */
/* Pola hibrida: Lab Kemasan + Mesin Baca + Gim Kebun Kira. Misi di misi-k4b1ka.ts. */
/* Naskah orisinal IGIL; acuan topik Matematika SD/MI Kelas IV Bab 1 Sub-Bab A.      */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";
const COBA_MESIN = ["Ketuk stasiun Baca sebelum Rakit. Apa kata mesin?", "Bandingkan 4.152, 5.007, dan 1.308. Mana yang punya nol?", "Mengapa 1.308 dibaca seribu?"];

const langkahK4B1KA = (): LangkahSim[] => {
  const daftar = daftarMisiK4B1KA();
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B1KA,
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B1KA,
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4B1KA) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { id: "kemasan", nama: "Lab Kemasan", render: () => <SimulasiLabKemasanK4KA speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const mesin: TabLab = {
          id: "mesin",
          nama: MESIN_BACA_KA.judul,
          render: () => <SimulasiMesinBertahapK3 def={MESIN_BACA_KA} coba={COBA_MESIN} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO_K4B1KA.judul,
          render: () => <SimulasiSkenario def={SKENARIO_K4B1KA} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B1KA)} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK4B1KA };

export default function SimulasiK4B1KeduaMateri({
  speakGuru,
  onSelesai,
  teksAkhir,
}: {
  sub: string;
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
}) {
  return (
    <SimulasiAlur
      judulBab="Kelas 4 Bab 1 Kedua · Sub-Bab A"
      langkah={langkahK4B1KA()}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
