"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabDataK3 from "./SimulasiLabDataK3";
import SimulasiLabTabelK3 from "./SimulasiLabTabelK3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K3B5A, SKENARIO_K3B5B } from "./skenario-k3b5";
import { MESIN_TABEL, MESIN_URUT } from "./mesin-data-k3b5";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK3Bab5, ID_SKENARIO_K3B5, type KeadaanK3Bab5 } from "./misi-k3bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K3B5, NAMA_SIM_K3B5, hurufK3B5, misiAwalK3Bab5, type HurufK3B5 } from "./misi-teks-k3b5";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 5 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k3bab5.ts. */
/*   A Mengurutkan dan Membandingkan : Lab Data Kelompok + Mesin Urut + Pemilihan Ketua Kelas */
/*   B Menyajikan Data dalam Tabel   : Lab Tabel + Mesin Tabel + Laporan Kelas (pencapaian bab) */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK3B5, DefSkenario> = { A: SKENARIO_K3B5A, B: SKENARIO_K3B5B };
const MESIN: Record<HurufK3B5, DefMesin> = { A: MESIN_URUT, B: MESIN_TABEL };

const COBA_MESIN: Record<HurufK3B5, string[]> = {
  A: [
    "Ketuk stasiun Jangkauan sebelum mengurutkan. Apa kata mesin?",
    "Bandingkan data keluarga, nilai, dan kue. Apakah data pertama selalu yang terkecil?",
    "Mengapa jangkauan dihitung dengan mengurangkan, bukan menjumlahkan?",
  ],
  B: [
    "Ketuk stasiun Baca sebelum menghitung turus. Apa kata mesin?",
    "Bandingkan tabel manik, huruf, dan nilai. Mana yang dibaca dengan lebih dari?",
    "Mengapa nilai 7 tidak ikut saat menghitung lebih dari 7?",
  ],
};

const langkahK3Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B5(sub);
  const daftar = daftarMisiK3Bab5(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K3B5[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K3B5[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK3Bab5) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const lab: TabLab =
          huruf === "A"
            ? { id: "data", nama: "Lab Data Kelompok", render: () => <SimulasiLabDataK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
            : { id: "tabel", nama: "Lab Tabel", render: () => <SimulasiLabTabelK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K3B5[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium data" />;
      },
    },
  ];
};

export { misiAwalK3Bab5 };

export default function SimulasiK3Bab5Materi({
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
  const huruf = hurufK3B5(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 3 Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
