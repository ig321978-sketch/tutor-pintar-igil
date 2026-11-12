"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabKelipatanK5B2 from "./SimulasiLabKelipatanK5B2";
import SimulasiLabJalurK5B2 from "./SimulasiLabJalurK5B2";
import SimulasiLabFaktorK5B2 from "./SimulasiLabFaktorK5B2";
import SimulasiLabBersamaK5B2 from "./SimulasiLabBersamaK5B2";
import SimulasiLabPrimaK5B2 from "./SimulasiLabPrimaK5B2";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K5B2A, SKENARIO_K5B2B, SKENARIO_K5B2C, SKENARIO_K5B2D, SKENARIO_K5B2E } from "./skenario-k5b2";
import { MESIN_KELIPATAN, MESIN_KPK, MESIN_FAKTOR, MESIN_FPB, MESIN_PRIMA } from "./mesin-data-k5b2";
import { ejaK5B1 } from "./eja-k5b1";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK5Bab2, ID_SKENARIO_K5B2, type KeadaanK5Bab2 } from "./misi-k5bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K5B2, NAMA_SIM_K5B2, hurufK5B2, misiAwalK5Bab2, type HurufK5B2 } from "./misi-teks-k5b2";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 2 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k5bab2.ts. */
/*   A Kelipatan : Lab Lompat Kelipatan + Mesin Kelipatan + Tepuk Kelipatan Nisa */
/*   B KPK       : Lab Dua Jalur + Mesin KPK + Jadwal Renang Yohana            */
/*   C Faktor    : Lab Susunan Faktor + Mesin Faktor + Potong Petak Lukas      */
/*   D FPB       : Lab Faktor Bersama + Mesin FPB + Vas Mawar Amelia           */
/*   E Faktor prima : Lab Pohon Prima + Mesin Prima + Kebun Sekolah Nisa (pencapaian bab) */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK5B2, DefSkenario> = { A: SKENARIO_K5B2A, B: SKENARIO_K5B2B, C: SKENARIO_K5B2C, D: SKENARIO_K5B2D, E: SKENARIO_K5B2E };
const MESIN: Record<HurufK5B2, DefMesin> = { A: MESIN_KELIPATAN, B: MESIN_KPK, C: MESIN_FAKTOR, D: MESIN_FPB, E: MESIN_PRIMA };

const COBA_MESIN: Record<HurufK5B2, string[]> = {
  A: ["Ketuk stasiun Cek sebelum Lompat. Apa kata mesin?", "Mengapa sisa harus nol agar bilangan menjadi kelipatan?", "Apa yang sama pada semua pendaratan lompatan berjarak tiga?"],
  B: ["Ketuk stasiun KPK sebelum Jalur. Apa kata mesin?", "Mengapa KPK harus yang terkecil di antara kelipatan persekutuan?", "Mengapa jumlah dua bilangan bukan KPK?"],
  C: ["Ketuk stasiun Cek sebelum Susun. Apa kata mesin?", "Mengapa satu dan bilangan itu sendiri selalu faktor?", "Mengapa faktor selalu berpasangan?"],
  D: ["Ketuk stasiun Jembatan sebelum Daftar. Apa kata mesin?", "Mengapa FPB harus yang terbesar di antara faktor persekutuan?", "Mengapa FPB dikali KPK sama dengan hasil kali dua bilangan?"],
  E: ["Ketuk stasiun Hasil sebelum Prima. Apa kata mesin?", "Mengapa pohon faktor harus berhenti di bilangan prima?", "Mengapa KPK mengambil jumlah terbanyak, bukan paling sedikit?"],
};

const LAB: Record<HurufK5B2, { id: string; nama: string }> = {
  A: { id: "kelipatan", nama: "Lab Lompat Kelipatan" },
  B: { id: "jalur", nama: "Lab Dua Jalur" },
  C: { id: "faktor", nama: "Lab Susunan Faktor" },
  D: { id: "bersama", nama: "Lab Faktor Bersama" },
  E: { id: "prima", nama: "Lab Pohon Prima" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK5B2; speakGuru: (t: string) => void; lapor: (k: KeadaanK5Bab2) => void }) {
  if (huruf === "B") return <SimulasiLabJalurK5B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabFaktorK5B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "D") return <SimulasiLabBersamaK5B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "E") return <SimulasiLabPrimaK5B2 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabKelipatanK5B2 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK5Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B2(sub);
  const daftar = daftarMisiK5Bab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K5B2[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K5B2[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK5Bab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK5B1} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K5B2[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK5Bab2 };

export default function SimulasiK5Bab2Materi({
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
  const huruf = hurufK5B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 5 Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
