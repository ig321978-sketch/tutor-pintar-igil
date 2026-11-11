"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiBilangan, { type TampilBilangan } from "./SimulasiBilangan";
import SimulasiKatak from "./SimulasiKatak";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB1 } from "./skenario-kelas1";
import { daftarMisiBab1, type KeadaanBab1 } from "./misi-bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 1 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab1.ts).       */
/*   Sub-Bab A (Menghitung 0 sampai 10): Laboratorium Bilangan, hanya benda.*/
/*   Sub-Bab B (Membandingkan): + bingkai sepuluh, garis bilangan, tanda.   */
/*   Sub-Bab C (Maju dan mundur): lab B + tab Katak Maju Mundur.            */
/*   Sub-Bab D (Pasangan bilangan, sub-bab akhir): semua alat + pasangan    */
/*     bilangan + tab Kasir Warung, sekaligus simulasi pencapaian misi.     */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Hitung benda dari nol sampai sepuluh. Selesaikan misi di bawah, urutannya bebas.",
  B: "Bandingkan dua bilangan dengan benda, bingkai, dan garis. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Maju dan mundur di garis bilangan, lalu bantu Katak menyeberang. Selesaikan misi di bawah, urutannya bebas.",
  D: "Pecah bilangan, bandingkan, dan bantu Kasir Warung. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const SEMUA: TampilBilangan[] = ["benda", "bingkai", "garis", "pasangan", "banding"];

const langkahBab1 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab1(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "D" ? "Lab Bilangan: Pencapaian Misi" : "Lab Bilangan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab1) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const bilangan: TabLab = {
          id: "bilangan",
          nama: "Bilangan",
          render: () => {
            switch (huruf) {
              case "A":
                return <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda"]} onKeadaan={lapor} />;
              case "D":
                return <SimulasiBilangan speakGuru={a.speakGuru} tampil={SEMUA} onKeadaan={lapor} />;
              default:
                return <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda", "bingkai", "garis", "banding"]} awal={{ banding: huruf === "B" }} onKeadaan={lapor} />;
            }
          },
        };
        const katak: TabLab = { id: "katak", nama: "Katak Maju Mundur", render: () => <SimulasiKatak speakGuru={a.speakGuru} onTuntas={() => selesai("katak")} /> };
        const kasir: TabLab = { id: "kasir", nama: "Kasir Warung", render: () => <SimulasiSkenario def={SKENARIO_BAB1} speakGuru={a.speakGuru} onTuntas={() => selesai("kasir")} /> };
        const tab = huruf === "A" || huruf === "B" ? [bilangan] : huruf === "C" ? [bilangan, katak] : [bilangan, katak, kasir];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab1 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab1(sub)[0].misi ?? ""}`;

export default function SimulasiBab1Materi({
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
  const huruf = ["A", "B", "C", "D"].includes(sub) ? sub : "A";
  return <SimulasiAlur judulBab={`Bab 1 · Sub-Bab ${huruf}`} langkah={langkahBab1(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}