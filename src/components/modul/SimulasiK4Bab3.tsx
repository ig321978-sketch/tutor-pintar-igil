"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPolaGambarK4B3 from "./SimulasiLabPolaGambarK4B3";
import SimulasiLabPolaBilanganK4B3 from "./SimulasiLabPolaBilanganK4B3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B3A, SKENARIO_K4B3B } from "./skenario-k4b3";
import { MESIN_POLA_BILANGAN, MESIN_POLA_GAMBAR } from "./mesin-data-k4b3";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab3, ID_SKENARIO_K4B3, type KeadaanK4Bab3 } from "./misi-k4bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B3, NAMA_SIM_K4B3, hurufK4B3, misiAwalK4Bab3, type HurufK4B3 } from "./misi-teks-k4b3";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 3 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab3.ts. */
/*   A Pola gambar   : Lab Pola Gambar + Mesin Pola Gambar + Jeruk dan Permen Dina */
/*   B Pola bilangan : Lab Pola Bilangan + Mesin Pola Bilangan + Pameran Pola Kelas 4 (pencapaian bab) */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B3, DefSkenario> = { A: SKENARIO_K4B3A, B: SKENARIO_K4B3B };
const MESIN: Record<HurufK4B3, DefMesin> = { A: MESIN_POLA_GAMBAR, B: MESIN_POLA_BILANGAN };

const COBA_MESIN: Record<HurufK4B3, string[]> = {
  A: ["Ketuk stasiun Lanjut sebelum Hitung. Apa kata mesin?", "Mengapa selisih dihitung dari dua kumpulan yang berurutan?", "Pada pola permen, ke arah mana kumpulan berikutnya?"],
  B: ["Ketuk stasiun Dua Langkah sebelum Selisih. Apa kata mesin?", "Mengapa beda pola mengecil berupa pengurangan?", "Bagaimana mencari suku dua langkah ke depan?"],
};

const LAB: Record<HurufK4B3, { id: string; nama: string }> = {
  A: { id: "pola-gambar", nama: "Lab Pola Gambar" },
  B: { id: "pola-bilangan", nama: "Lab Pola Bilangan" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B3; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab3) => void }) {
  if (huruf === "B") return <SimulasiLabPolaBilanganK4B3 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabPolaGambarK4B3 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B3(sub);
  const daftar = daftarMisiK4Bab3(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B3[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B3[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab3) => laporMisi(daftar, k, a.capai);
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
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B3[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pola" />;
      },
    },
  ];
};

export { misiAwalK4Bab3 };

export default function SimulasiK4Bab3Materi({
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
  const huruf = hurufK4B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
