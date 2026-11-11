"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabTempatK3 from "./SimulasiLabTempatK3";
import SimulasiLabUrutK3 from "./SimulasiLabUrutK3";
import SimulasiLabSusunK3 from "./SimulasiLabSusunK3";
import SimulasiLabKelompokK3 from "./SimulasiLabKelompokK3";
import SimulasiMesinBertahapK3 from "./SimulasiMesinBertahapK3";
import SimulasiSkenario from "./SimulasiSkenario";
import {
  SKENARIO_K3B1A,
  SKENARIO_K3B1B,
  SKENARIO_K3B1C,
  SKENARIO_K3B1D,
  SKENARIO_K3B1E,
  SKENARIO_K3B1F,
  SKENARIO_K3B1G,
} from "./skenario-k3b1";
import { MESIN_BACA, MESIN_BAGI, MESIN_KALI, MESIN_KURANG, MESIN_NILAI, MESIN_TAMBAH } from "./mesin-data-k3b1";
import type { DefSkenario } from "./skenario-umum";
import type { DefMesin } from "./mesin-bertahap-k3b1";
import { daftarMisiK3Bab1, ID_SKENARIO_K3B1, type KeadaanK3Bab1 } from "./misi-k3bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";
import { MISI_K3B1, NAMA_SIM_K3B1, hurufK3B1, misiAwalK3Bab1, type HurufK3B1 } from "./misi-teks-k3b1";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 1 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* tiap sub-bab satu laboratorium bertahap (paling banyak tiga alat), alat   */
/* yang sama dipakai ulang dengan misi berbeda (misi-k3bab1.ts).             */
/*   A Bilangan dan Lambang   : Papan Tempat + Mesin Baca-Tulis + Tongkat Alfa */
/*   B Nilai Tempat           : Papan Tempat (Nilai) + Mesin Angka dan Nilai + Tiga Kaleng */
/*   C Membandingkan          : Papan Tempat (Banding) + Lab Urut + Jarak ke Sekolah */
/*   D Penjumlahan sampai 100 : Lab Susun Tambah + Mesin + Alun-Alun         */
/*   E Pengurangan sampai 100 : Lab Susun Kurang + Mesin + Toko Pak Bandi    */
/*   F Perkalian sampai 100   : Lab Kelompok Kali + Mesin + Kebun Melati     */
/*   G Pembagian (akhir)      : Lab Kelompok Kali dan Bagi + Mesin + Pencapaian Bab */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const SKENARIO: Record<HurufK3B1, DefSkenario> = {
  A: SKENARIO_K3B1A,
  B: SKENARIO_K3B1B,
  C: SKENARIO_K3B1C,
  D: SKENARIO_K3B1D,
  E: SKENARIO_K3B1E,
  F: SKENARIO_K3B1F,
  G: SKENARIO_K3B1G,
};

const MESIN: Partial<Record<HurufK3B1, DefMesin>> = { A: MESIN_BACA, B: MESIN_NILAI, D: MESIN_TAMBAH, E: MESIN_KURANG, F: MESIN_KALI, G: MESIN_BAGI };

const COBA_MESIN: Record<"A" | "B" | "D" | "E" | "F" | "G", string[]> = {
  A: [
    "Ketuk stasiun Tulis sebelum membaca papan. Apa kata mesin?",
    "Pada bilangan yang punya nol, mengapa nol tetap ditulis walau tidak dibaca?",
    "Bandingkan 160 dan 703. Tempat mana yang kosong pada tiap bilangan?",
  ],
  B: [
    "Ketuk stasiun Urai sebelum melihat nilainya. Apa kata mesin?",
    "Pada 602, berapa nilai angka 6? Mengapa bukan 6?",
    "Bandingkan nilai angka 5 pada 251 dan pada 805. Apa yang berbeda?",
  ],
  D: [
    "Ketuk stasiun Puluhan sebelum menjumlahkan satuan. Apa kata mesin?",
    "Pada kasus yang menyimpan, mengapa puluhan bertambah satu?",
    "Bandingkan 23 + 16 dan 48 + 16. Apa yang berbeda pada langkah satuan?",
  ],
  E: [
    "Ketuk stasiun Puluhan sebelum mengurangi satuan. Apa kata mesin?",
    "Pada kasus yang mengambil, mengapa puluhan atas berkurang satu?",
    "Bandingkan 25 − 12 dan 45 − 19. Apa yang berbeda pada langkah satuan?",
  ],
  F: [
    "Ketuk stasiun Kali sebelum menambah berulang. Apa kata mesin?",
    "Pada 5 × 2 dan 2 × 5, apa yang sama dan apa yang berbeda?",
    "Mengapa penjumlahan berulang menjadi jalan pintas dengan perkalian?",
  ],
  G: [
    "Ketuk stasiun Bagi sebelum mengurangi berulang. Apa kata mesin?",
    "Pada 5 : 1 dan 28 : 7, bagaimana kamu memeriksa hasilnya dengan kali?",
    "Apakah ada kasus yang tidak habis dibagi? Bagaimana mesin menyebutnya?",
  ],
};

const langkahK3Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B1(sub);
  const daftar = daftarMisiK3Bab1(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM_K3B1[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI_K3B1[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK3Bab1) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const tempat = (mode: "A" | "B" | "C"): TabLab => ({
          id: "tempat",
          nama: "Lab Papan Tempat",
          render: () => <SimulasiLabTempatK3 mode={mode} speakGuru={a.speakGuru} onKeadaan={lapor} />,
        });
        const urut: TabLab = {
          id: "urut",
          nama: "Lab Urut",
          render: () => <SimulasiLabUrutK3 speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const susun = (mode: "tambah" | "kurang"): TabLab => ({
          id: "susun",
          nama: mode === "tambah" ? "Lab Susun Tambah" : "Lab Susun Kurang",
          render: () => <SimulasiLabSusunK3 mode={mode} speakGuru={a.speakGuru} onKeadaan={lapor} />,
        });
        const kelompok = (s: "F" | "G"): TabLab => ({
          id: "kelompok",
          nama: s === "F" ? "Lab Kelompok Kali" : "Lab Kelompok Kali dan Bagi",
          render: () => <SimulasiLabKelompokK3 sub={s} speakGuru={a.speakGuru} onKeadaan={lapor} />,
        });
        const mesin = (h: "A" | "B" | "D" | "E" | "F" | "G"): TabLab => {
          const def = MESIN[h] as DefMesin;
          return {
            id: "mesin",
            nama: def.judul,
            render: () => <SimulasiMesinBertahapK3 def={def} coba={COBA_MESIN[h]} speakGuru={a.speakGuru} onTuntas={selesai} />,
          };
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: SKENARIO[huruf].judul,
          render: () => <SimulasiSkenario def={SKENARIO[huruf]} speakGuru={a.speakGuru} onTuntas={() => selesai(ID_SKENARIO_K3B1[huruf])} />,
        };

        const tab: TabLab[] =
          huruf === "A"
            ? [tempat("A"), mesin("A"), skenario]
            : huruf === "B"
              ? [tempat("B"), mesin("B"), skenario]
              : huruf === "C"
                ? [tempat("C"), urut, skenario]
                : huruf === "D"
                  ? [susun("tambah"), mesin("D"), skenario]
                  : huruf === "E"
                    ? [susun("kurang"), mesin("E"), skenario]
                    : huruf === "F"
                      ? [kelompok("F"), mesin("F"), skenario]
                      : [kelompok("G"), mesin("G"), skenario];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

export { misiAwalK3Bab1 };

export default function SimulasiK3Bab1Materi({
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
  const huruf = hurufK3B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 3 Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
