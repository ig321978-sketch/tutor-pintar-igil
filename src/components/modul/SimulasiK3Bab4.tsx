"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabRuasK3 from "./SimulasiLabRuasK3";
import SimulasiLabSudutK3 from "./SimulasiLabSudutK3";
import SimulasiLabGarisK3 from "./SimulasiLabGarisK3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K3B4A, SKENARIO_K3B4B, SKENARIO_K3B4C } from "./skenario-k3b4";
import { MESIN_GARIS, MESIN_RUAS, MESIN_SUDUT } from "./mesin-data-k3b4";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK3Bab4, ID_SKENARIO_K3B4, type KeadaanK3Bab4 } from "./misi-k3bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K3B4, NAMA_SIM_K3B4, hurufK3B4, misiAwalK3Bab4, type HurufK3B4 } from "./misi-teks-k3b4";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k3bab4.ts. */
/*   A Ruas Garis dan Sisi : Lab Ruas Garis + Mesin Ruas Garis + Peta Alfa   */
/*   B Sudut               : Lab Sudut + Mesin Sudut + Pintu Meutia          */
/*   C Garis dan Bangun    : Lab Dua Garis + Mesin Garis + Pagar Taman       */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK3B4, DefSkenario> = { A: SKENARIO_K3B4A, B: SKENARIO_K3B4B, C: SKENARIO_K3B4C };
const MESIN: Record<HurufK3B4, DefMesin> = { A: MESIN_RUAS, B: MESIN_SUDUT, C: MESIN_GARIS };

const COBA_MESIN: Record<HurufK3B4, string[]> = {
  A: [
    "Ketuk stasiun Baca sebelum mengatur nol. Apa kata mesin?",
    "Bandingkan AB, MN, dan PQ. Mana yang punya sisa milimeter?",
    "Mengapa titik awal harus tepat di angka nol?",
  ],
  B: [
    "Ketuk stasiun Jenis sebelum membaca derajat. Apa kata mesin?",
    "Bandingkan sudut 50°, 120°, dan 300°. Mana yang dibaca lewat pasangannya?",
    "Mengapa busur derajat hanya membaca sampai 180°?",
  ],
  C: [
    "Ketuk stasiun Lambang sebelum menentukan hubungan. Apa kata mesin?",
    "Bandingkan EF dan GH dengan PQ dan RS. Apa bedanya jarak di kedua ujung?",
    "Mengapa pojok kertas lipat dipakai untuk garis tegak lurus?",
  ],
};

const langkahK3Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B4(sub);
  const daftar = daftarMisiK3Bab4(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K3B4[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K3B4[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK3Bab4) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const lab: TabLab =
          huruf === "A"
            ? { id: "ruas", nama: "Lab Ruas Garis", render: () => <SimulasiLabRuasK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
            : huruf === "B"
              ? { id: "sudut", nama: "Lab Sudut", render: () => <SimulasiLabSudutK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> }
              : { id: "garis", nama: "Lab Dua Garis", render: () => <SimulasiLabGarisK3 speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K3B4[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bangun datar" />;
      },
    },
  ];
};

export { misiAwalK3Bab4 };

export default function SimulasiK3Bab4Materi({
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
  const huruf = hurufK3B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 3 Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
