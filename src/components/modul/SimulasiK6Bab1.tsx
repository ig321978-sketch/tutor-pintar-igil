"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabKaliK6B1 from "./SimulasiLabKaliK6B1";
import SimulasiLabBagiK6B1 from "./SimulasiLabBagiK6B1";
import SimulasiLabDesimalK6B1 from "./SimulasiLabDesimalK6B1";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K6B1A, SKENARIO_K6B1B, SKENARIO_K6B1C } from "./skenario-k6b1";
import { MESIN_KALI } from "./mesin-kali-k6b1";
import { MESIN_BAGI } from "./mesin-bagi-k6b1";
import { MESIN_DESIMAL } from "./mesin-desimal-k6b1";
import { ejaK6B1 } from "./eja-k6b1";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK6Bab1, ID_SKENARIO_K6B1, type KeadaanK6Bab1 } from "./misi-k6bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K6B1, NAMA_SIM_K6B1, hurufK6B1, misiAwalK6Bab1, type HurufK6B1 } from "./misi-teks-k6b1";

/* ======================================================================== */
/* Simulasi Kelas 6 Bab 1 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k6bab1.ts. */
/*   A Perkalian Pecahan : Lab Kali Pecahan + Mesin Kali Pecahan + Agam dan Kebun Ayah */
/*   B Pembagian Pecahan : Lab Bagi Pecahan + Mesin Bagi Pecahan + Agam, Gelas, dan Sirup */
/*   C Bilangan Desimal  : Lab Desimal + Mesin Desimal + Agam, Timbangan, dan Lompat Jauh */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK6B1, DefSkenario> = { A: SKENARIO_K6B1A, B: SKENARIO_K6B1B, C: SKENARIO_K6B1C };
const MESIN: Record<HurufK6B1, DefMesin> = { A: MESIN_KALI, B: MESIN_BAGI, C: MESIN_DESIMAL };

const COBA_MESIN: Record<HurufK6B1, string[]> = {
  A: ["Ketuk stasiun Hasil sebelum Tulis. Apa kata mesin?", "Mengapa bilangan asli ditulis berpenyebut satu?", "Mengapa penyebut hasil tidak ikut berubah ukurannya?"],
  B: ["Ketuk stasiun Cek sebelum Kebalikan. Apa kata mesin?", "Mengapa pembagi harus dibalik sebelum dikali?", "Mengapa hasil dikali pembagi kembali ke bilangan awal?"],
  C: ["Ketuk stasiun Banding sebelum Ubah. Apa kata mesin?", "Mengapa penyebut diubah menjadi sepuluh atau seratus?", "Mengapa panjang angka di belakang koma bukan besar nilai?"],
};

const LAB: Record<HurufK6B1, { id: string; nama: string }> = {
  A: { id: "kali", nama: "Lab Kali Pecahan" },
  B: { id: "bagi", nama: "Lab Bagi Pecahan" },
  C: { id: "desimal", nama: "Lab Desimal" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK6B1; speakGuru: (t: string) => void; lapor: (k: KeadaanK6Bab1) => void }) {
  if (huruf === "B") return <SimulasiLabBagiK6B1 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabDesimalK6B1 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabKaliK6B1 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK6Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK6B1(sub);
  const daftar = daftarMisiK6Bab1(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K6B1[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K6B1[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK6Bab1) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = { ...LAB[huruf], render: () => <LabSub huruf={huruf} speakGuru={a.speakGuru} lapor={lapor} /> };
        const def = MESIN[huruf];
        const mesin: TabLab = {
          id: "mesin",
          nama: def.judul,
          render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[huruf]} speakGuru={a.speakGuru} onTuntas={selesai} eja={ejaK6B1} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K6B1[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium pecahan dan desimal" />;
      },
    },
  ];
};

export { misiAwalK6Bab1 };

export default function SimulasiK6Bab1Materi({
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
  const huruf = hurufK6B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 6 Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK6Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
