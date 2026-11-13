"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabNilaiK5B9 from "./SimulasiLabNilaiK5B9";
import SimulasiLabBandingK5B9 from "./SimulasiLabBandingK5B9";
import SimulasiLabSusunK5B9 from "./SimulasiLabSusunK5B9";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B9A, SKENARIO_K5B9B, SKENARIO_K5B9C } from "./skenario-k5b9";
import { MESIN_NILAI } from "./mesin-nilai-k5b9";
import { MESIN_BANDING } from "./mesin-banding-k5b9";
import { MESIN_SUSUN } from "./mesin-susun-k5b9";
import { ejaK5B9 } from "./eja-k5b9";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab9, ID_SKENARIO_K5B9, type KeadaanK5Bab9 } from "./misi-k5bab9";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B9, NAMA_SIM_K5B9, hurufK5B9, misiAwalK5Bab9, type HurufK5B9 } from "./misi-teks-k5b9";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 9 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab9.ts. */
/*   A Baca, tulis, nilai tempat : Lab Nilai Tempat + Mesin Nilai Tempat + Nisa dan Lemari Jepara */
/*   B Banding dan urut : Lab Banding + Mesin Banding + Lukas dan Sepatu */
/*   C Komposisi dan dekomposisi : Lab Susun + Mesin Susun + Nisa dan Harga Komputer */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B9, DefSkenario> = { A: SKENARIO_K5B9A, B: SKENARIO_K5B9B, C: SKENARIO_K5B9C };
const MESIN: Record<HurufK5B9, DefMesin> = { A: MESIN_NILAI, B: MESIN_BANDING, C: MESIN_SUSUN };

const COBA_MESIN: Record<HurufK5B9, string[]> = {
  A: ["Ketuk stasiun Nilai sebelum Baca. Apa kata mesin?", "Mengapa nol tetap ditulis walaupun tidak diucapkan?", "Mengapa nilai angka adalah angka dikali nilai tempatnya?"],
  B: ["Ketuk stasiun Simbol sebelum Kolom. Apa kata mesin?", "Mengapa membandingkan harus mulai dari kolom paling kiri?", "Mengapa urut naik berbeda dengan urut turun?"],
  C: ["Ketuk stasiun Tukar sebelum Susun. Apa kata mesin?", "Mengapa tempat yang tidak disebut tetap diisi nol?", "Mengapa satu ratus ribuan sama dengan sepuluh puluh ribuan?"],
};

const LAB: Record<HurufK5B9, { id: string; nama: string }> = {
  A: { id: "nilai", nama: "Lab Nilai Tempat" },
  B: { id: "banding", nama: "Lab Banding" },
  C: { id: "susun", nama: "Lab Susun" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK5B9; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab9) => void }) {
  if (huruf === "C") return <SimulasiLabSusunK5B9 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "B") return <SimulasiLabBandingK5B9 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabNilaiK5B9 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab9 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B9(sub);
  const daftar = daftarMisiK5Bab9(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B9[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B9[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab9) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B9} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B9[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK5Bab9 };

export default function SimulasiK5Bab9Materi({
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
  const huruf = hurufK5B9(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 9 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab9(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
