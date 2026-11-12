"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabJalurK5B4 from "./SimulasiLabJalurK5B4";
import SimulasiLabSegitigaK5B4 from "./SimulasiLabSegitigaK5B4";
import SimulasiLabSegiEmpatK5B4 from "./SimulasiLabSegiEmpatK5B4";
import SimulasiLabSegiBanyakK5B4 from "./SimulasiLabSegiBanyakK5B4";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B4A, SKENARIO_K5B4B, SKENARIO_K5B4C, SKENARIO_K5B4D } from "./skenario-k5b4";
import { MESIN_JALUR, MESIN_SEGITIGA, MESIN_SEGIEMPAT, MESIN_SEGIBANYAK } from "./mesin-data-k5b4";
import { ejaK5B4 } from "./eja-k5b4";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab4, ID_SKENARIO_K5B4, type KeadaanK5Bab4 } from "./misi-k5bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B4, NAMA_SIM_K5B4, hurufK5B4, misiAwalK5Bab4, type HurufK5B4 } from "./misi-teks-k5b4";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab4.ts. */
/*   A Jalur : Lab Jalur + Mesin Jalur + Pagar dan Bingkai                  */
/*   B Segitiga : Lab Segitiga + Mesin Segitiga + Bendera Pita Segitiga    */
/*   C Segi Empat : Lab Segi Empat + Mesin Segi Empat + Kebun dan Papan   */
/*   D Segi Banyak : Lab Segi Banyak + Mesin Segi Banyak + Taman         */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B4, DefSkenario> = { A: SKENARIO_K5B4A, B: SKENARIO_K5B4B, C: SKENARIO_K5B4C, D: SKENARIO_K5B4D };
const MESIN: Record<HurufK5B4, DefMesin> = { A: MESIN_JALUR, B: MESIN_SEGITIGA, C: MESIN_SEGIEMPAT, D: MESIN_SEGIBANYAK };

const COBA_MESIN: Record<HurufK5B4, string[]> = {
  A: ["Ketuk stasiun Beda sebelum Jalur. Apa kata mesin?", "Mengapa pagar dan bingkai memakai jalur tepi, bukan isi petak?", "Apa bedanya jalur tepi dan isi petak?"],
  B: ["Ketuk stasiun Ukur sebelum Jumlah. Apa kata mesin?", "Mengapa segitiga sama kaki tidak boleh langsung dikali tiga?", "Kapan tiga dikali sisi boleh dipakai pada segitiga?"],
  C: ["Ketuk stasiun Beda sebelum Persegi panjang. Apa kata mesin?", "Mengapa jumlah panjang dan lebar dikali dua?", "Mengapa panjang dikali lebar bukan keliling?"],
  D: ["Ketuk stasiun Tabel sebelum Beraturan. Apa kata mesin?", "Mengapa sisi yang berbeda tidak boleh dikali banyak sisi?", "Pola apa yang muncul pada tabel keliling?"],
};

const LAB: Record<HurufK5B4, { id: string; nama: string }> = {
  A: { id: "jalur", nama: "Lab Jalur" },
  B: { id: "segitiga", nama: "Lab Segitiga" },
  C: { id: "segiempat", nama: "Lab Segi Empat" },
  D: { id: "segibanyak", nama: "Lab Segi Banyak" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK5B4; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab4) => void }) {
  if (huruf === "B") return <SimulasiLabSegitigaK5B4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabSegiEmpatK5B4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "D") return <SimulasiLabSegiBanyakK5B4 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabJalurK5B4 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B4(sub);
  const daftar = daftarMisiK5Bab4(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B4[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B4[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab4) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B4} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B4[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium keliling" />;
      },
    },
  ];
};

export { misiAwalK5Bab4 };

export default function SimulasiK5Bab4Materi({
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
  const huruf = hurufK5B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
