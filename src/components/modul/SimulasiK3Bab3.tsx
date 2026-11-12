"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPenggarisK3 from "./SimulasiLabPenggarisK3";
import SimulasiLabMeteranK3 from "./SimulasiLabMeteranK3";
import SimulasiLabTimbangK3 from "./SimulasiLabTimbangK3";
import SimulasiLabKodokK3 from "./SimulasiLabKodokK3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K3B3A, SKENARIO_K3B3B, SKENARIO_K3B3C, SKENARIO_K3B3D } from "./skenario-k3b3";
import { MESIN_TIMBANG, MESIN_UBAH_BERAT, MESIN_UBAH_PANJANG, MESIN_UKUR } from "./mesin-data-k3b3";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK3Bab3, ID_SKENARIO_K3B3, type KeadaanK3Bab3 } from "./misi-k3bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K3B3, NAMA_SIM_K3B3, hurufK3B3, misiAwalK3Bab3, type HurufK3B3 } from "./misi-teks-k3b3";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 3 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k3bab3.ts. */
/*   A Pengukuran Panjang   : Lab Penggaris + Mesin Ukur + Posyandu Alfa     */
/*   B Hubungan Panjang     : Lab Meteran + Mesin Ubah Panjang + Pita Meutia */
/*   C Pengukuran Berat     : Lab Timbangan + Mesin Timbang + Bahan Kue      */
/*   D Hubungan Berat       : Lab Timbangan Kodok + Mesin Ubah Berat + Pasar */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK3B3, DefSkenario> = { A: SKENARIO_K3B3A, B: SKENARIO_K3B3B, C: SKENARIO_K3B3C, D: SKENARIO_K3B3D };
const MESIN: Record<HurufK3B3, DefMesin> = { A: MESIN_UKUR, B: MESIN_UBAH_PANJANG, C: MESIN_TIMBANG, D: MESIN_UBAH_BERAT };

const COBA_MESIN: Record<HurufK3B3, string[]> = {
  A: [
    "Ketuk stasiun Baca sebelum memilih alat. Apa kata mesin?",
    "Bandingkan pensil, buku tulis, dan lemari. Alat apa yang dipilih untuk masing-masing?",
    "Mengapa ujung benda harus tepat di angka nol?",
  ],
  B: [
    "Ketuk stasiun Hitung sebelum memilih cara. Apa kata mesin?",
    "Bandingkan 3 m ke sentimeter dan 700 cm ke meter. Mana yang dikali dan mana yang dibagi?",
    "Mengapa hasil harus diperiksa dengan cara sebaliknya?",
  ],
  C: [
    "Ketuk stasiun Baca sebelum mengatur nol. Apa kata mesin?",
    "Bandingkan telur dan semangka. Timbangan mana yang dipilih untuk masing-masing?",
    "Mengapa timbangan harus mulai dari nol?",
  ],
  D: [
    "Ketuk stasiun Hitung sebelum memilih cara. Apa kata mesin?",
    "Bandingkan 3 kg ke gram dan 1.753 g ke kilogram. Apa bedanya?",
    "Mengapa hasil harus diperiksa dengan cara sebaliknya?",
  ],
};

const langkahK3Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B3(sub);
  const daftar = daftarMisiK3Bab3(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K3B3[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K3B3[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK3Bab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const lab: TabLab =
          huruf === "A"
            ? { id: "penggaris", nama: "Lab Penggaris", render: () => <SimulasiLabPenggarisK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
            : huruf === "B"
              ? { id: "meteran", nama: "Lab Meteran", render: () => <SimulasiLabMeteranK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
              : huruf === "C"
                ? { id: "timbang", nama: "Lab Timbangan", render: () => <SimulasiLabTimbangK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
                : { id: "kodok", nama: "Lab Timbangan Kodok", render: () => <SimulasiLabKodokK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K3B3[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pengukuran" />;
      },
    },
  ];
};

export { misiAwalK3Bab3 };

export default function SimulasiK3Bab3Materi({
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
  const huruf = hurufK3B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 3 Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
