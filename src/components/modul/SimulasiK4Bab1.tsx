"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabKemasanK4 from "./SimulasiLabKemasanK4";
import SimulasiLabNilaiK4 from "./SimulasiLabNilaiK4";
import SimulasiLabBandingK4 from "./SimulasiLabBandingK4";
import SimulasiLabSusunK4 from "./SimulasiLabSusunK4";
import SimulasiLabJumlahK4 from "./SimulasiLabJumlahK4";
import SimulasiLabKurangK4 from "./SimulasiLabKurangK4";
import SimulasiLabKaliK4 from "./SimulasiLabKaliK4";
import SimulasiLabBagiK4 from "./SimulasiLabBagiK4";
import SimulasiLabFaktorK4 from "./SimulasiLabFaktorK4";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K4B1A, SKENARIO_K4B1B, SKENARIO_K4B1C, SKENARIO_K4B1D } from "./skenario-k4b1-bilangan";
import { MESIN_BACA, MESIN_BANDING, MESIN_NILAI, MESIN_SUSUN } from "./mesin-data-k4b1-bilangan";
import { SKENARIO_K4B1E, SKENARIO_K4B1F } from "./skenario-k4b1-hitung";
import { MESIN_JUMLAH, MESIN_KURANG } from "./mesin-data-k4b1-hitung";
import { SKENARIO_K4B1G, SKENARIO_K4B1H, SKENARIO_K4B1I } from "./skenario-k4b1-bagi";
import { MESIN_BAGI, MESIN_FAKTOR, MESIN_KALI } from "./mesin-data-k4b1-bagi";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK4Bab1, ID_SKENARIO_K4B1, type KeadaanK4Bab1 } from "./misi-k4bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K4B1, NAMA_SIM_K4B1, hurufK4B1, misiAwalK4Bab1, type HurufK4B1 } from "./misi-teks-k4b1";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 1 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (tiga alat), misi di misi-k4bab1.ts. */
/*   A Membaca dan menulis    : Lab Kemasan + Mesin Baca + Helen di Minimarket  */
/*   B Nilai tempat           : Lab Nilai Tempat + Mesin Nilai + Struk Azizah  */
/*   C Membandingkan, urut    : Lab Banding + Mesin Banding + Harga di Pasar   */
/*   D Komposisi, dekomposisi : Lab Susun-Urai + Mesin Susun + Uang Helen      */
/*   E Penjumlahan            : Lab Jumlah Bersusun + Mesin Jumlah + Jeruk Pak Toni */
/*   F Pengurangan            : Lab Kurang Bersusun + Mesin Kurang + Buku Perpustakaan */
/*   G Perkalian              : Lab Kali + Mesin Kali + Donat dan Koperasi      */
/*   H Pembagian              : Lab Bagi + Mesin Bagi + Permen Pak Wicak        */
/*   I Faktor dan kelipatan   : Lab Faktor + Mesin Faktor + Pameran Kelas 4 (pencapaian bab) */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK4B1, DefSkenario> = { A: SKENARIO_K4B1A, B: SKENARIO_K4B1B, C: SKENARIO_K4B1C, D: SKENARIO_K4B1D, E: SKENARIO_K4B1E, F: SKENARIO_K4B1F, G: SKENARIO_K4B1G, H: SKENARIO_K4B1H, I: SKENARIO_K4B1I };
const MESIN: Record<HurufK4B1, DefMesin> = { A: MESIN_BACA, B: MESIN_NILAI, C: MESIN_BANDING, D: MESIN_SUSUN, E: MESIN_JUMLAH, F: MESIN_KURANG, G: MESIN_KALI, H: MESIN_BAGI, I: MESIN_FAKTOR };

const COBA_MESIN: Record<HurufK4B1, string[]> = {
  A: ["Ketuk stasiun Baca sebelum Rakit. Apa kata mesin?", "Bandingkan 3.286, 7.003, dan 1.025. Mana yang punya nol?", "Mengapa 1.025 dibaca seribu?"],
  B: ["Ketuk stasiun Tabel sebelum Tempat. Apa kata mesin?", "Bandingkan angka 6 pada 8.463 dan 4.675.", "Mengapa tabel diisi digit, bukan nilai penuh?"],
  C: ["Ketuk stasiun Tanda sebelum Ribuan. Apa kata mesin?", "Pada tiap pasangan, tempat mana yang menentukan?", "Mengapa membandingkan dimulai dari ribuan?"],
  D: ["Ketuk stasiun Periksa sebelum Susun. Apa kata mesin?", "Bandingkan 6.348, 6.035, dan 7.020. Mana yang punya nol?", "Bagaimana memeriksa sebuah uraian benar?"],
  E: ["Ketuk stasiun Hasil sebelum Satuan. Apa kata mesin?", "Soal mana yang tidak menyimpan sama sekali?", "Mengapa simpanan harus ikut dijumlahkan?"],
  F: ["Ketuk stasiun Periksa sebelum Satuan. Apa kata mesin?", "Soal mana yang mengambil dua kali?", "Mengapa 9 − 1 bukan cara yang benar untuk 1 − 9?"],
  G: ["Ketuk stasiun Periksa sebelum Array. Apa kata mesin?", "Soal mana yang tidak perlu menyimpan?", "Mengapa 12 × 4 bukan 12 + 4?"],
  H: ["Ketuk stasiun Periksa sebelum Puluhan. Apa kata mesin?", "Soal mana yang bersisa?", "Mengapa sisa selalu lebih kecil dari pembagi?"],
  I: ["Ketuk stasiun Kelipatan sebelum Bagi. Apa kata mesin?", "Mengapa 5 bukan faktor 12, tetapi 4 adalah faktor 12?", "Apa bedanya faktor dan kelipatan?"],
};

const LAB: Record<HurufK4B1, { id: string; nama: string }> = {
  A: { id: "kemasan", nama: "Lab Kemasan" },
  B: { id: "nilai", nama: "Lab Nilai Tempat" },
  C: { id: "banding", nama: "Lab Banding" },
  D: { id: "susun", nama: "Lab Susun-Urai" },
  E: { id: "jumlah", nama: "Lab Jumlah Bersusun" },
  F: { id: "kurang", nama: "Lab Kurang Bersusun" },
  G: { id: "kali", nama: "Lab Kali" },
  H: { id: "bagi", nama: "Lab Bagi" },
  I: { id: "faktor", nama: "Lab Faktor" },
};

function LabSub({ huruf, speakGuru, lapor }: { huruf: HurufK4B1; speakGuru: (t: string) => void; lapor: (k: KeadaanK4Bab1) => void }) {
  if (huruf === "B") return <SimulasiLabNilaiK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "C") return <SimulasiLabBandingK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "D") return <SimulasiLabSusunK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "E") return <SimulasiLabJumlahK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "F") return <SimulasiLabKurangK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "G") return <SimulasiLabKaliK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "H") return <SimulasiLabBagiK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  if (huruf === "I") return <SimulasiLabFaktorK4 speakGuru={speakGuru} onKeadaan={lapor} />;
  return <SimulasiLabKemasanK4 speakGuru={speakGuru} onKeadaan={lapor} />;
}

const langkahK4Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B1(sub);
  const daftar = daftarMisiK4Bab1(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K4B1[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K4B1[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK4Bab1) => laporMisi(daftar, k, a.capai);
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
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K4B1[huruf])} />,
        };
        return <LabBertahap tab={[lab, mesin, skenario]} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK4Bab1 };

export default function SimulasiK4Bab1Materi({
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
  const huruf = hurufK4B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 4 Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
