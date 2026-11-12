"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabKalimatK3 from "./SimulasiLabKalimatK3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K3B2A, SKENARIO_K3B2B } from "./skenario-k3b2";
import { MESIN_KALIMAT_KURANG, MESIN_KALIMAT_TAMBAH } from "./mesin-data-k3b2";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK3Bab2, ID_SKENARIO_K3B2, type KeadaanK3Bab2 } from "./misi-k3bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K3B2, NAMA_SIM_K3B2, hurufK3B2, misiAwalK3Bab2, type HurufK3B2 } from "./misi-teks-k3b2";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 2 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), alat yang sama      */
/* dipakai ulang dengan misi berbeda (misi-k3bab2.ts).                      */
/*   A Kalimat Penjumlahan : Lab Neraca Kalimat (tambah) + Mesin + Rani     */
/*   B Kalimat Pengurangan : Lab Neraca Kalimat (kurang) + Mesin + Pak Slamet */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK3B2, DefSkenario> = { A: SKENARIO_K3B2A, B: SKENARIO_K3B2B };
const MESIN: Record<HurufK3B2, DefMesin> = { A: MESIN_KALIMAT_TAMBAH, B: MESIN_KALIMAT_KURANG };

const COBA_MESIN: Record<HurufK3B2, string[]> = {
  A: [
    "Ketuk stasiun Hitung sebelum memilih operasi kebalikan. Apa kata mesin?",
    "Pada … + 5 = 17 dan 30 + … = 50, apa yang sama pada cara mencarinya?",
    "Mengapa hasil harus diperiksa dengan menjumlahkan lagi?",
  ],
  B: [
    "Ketuk stasiun Periksa sebelum menghitung. Apa kata mesin?",
    "Bandingkan 80 − … = 45 dan … − 45 = 27. Mengapa satu dikurangi dan satu ditambah?",
    "Bandingkan kasus ayam dan kue. Titik-titiknya di mana?",
  ],
};

const langkahK3Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B2(sub);
  const daftar = daftarMisiK3Bab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K3B2[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K3B2[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK3Bab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const neraca: TabLab = {
          id: "neraca",
          nama: "Lab Neraca Kalimat",
          render: () => <SimulasiLabKalimatK3 mode={huruf} speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K3B2[huruf])} />,
        };
        return <LabBertahap tab={[neraca, mesin, skenario]} label="Alat laboratorium kalimat Matematika" />;
      },
    },
  ];
};

export { misiAwalK3Bab2 };

export default function SimulasiK3Bab2Materi({
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
  const huruf = hurufK3B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 3 Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
