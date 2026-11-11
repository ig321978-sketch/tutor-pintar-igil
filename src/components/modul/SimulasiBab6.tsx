"use client";

import React, { useState } from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiBanding from "./SimulasiBanding";
import SimulasiLoncat from "./SimulasiLoncat";
import SimulasiJembatan from "./SimulasiJembatan";
import SimulasiBelasan, { type TampilBelasan } from "./SimulasiBelasan";
import SimulasiSkenario from "./SimulasiSkenario";
import { Pilihan } from "./simulasi-bersama";
import { SKENARIO_BAB6 } from "./skenario-kelas1";
import { daftarMisiBab6, type KeadaanBab6 } from "./misi-bab6";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 6 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab6.ts).       */
/*   Sub-Bab A (Lebih dari, Kurang dari, Selisih): tab Selisih Dua          */
/*     Kelompok dan Garis Bilangan (selisih).                               */
/*   Sub-Bab B (Penjumlahan kurang dari 20): + garis tambah, Jembatan       */
/*     Sepuluh, dan Menjumlah Belasan.                                      */
/*   Sub-Bab C (Pengurangan kurang dari 20, sub-bab akhir): + garis         */
/*     kurang, Mengurang Belasan, dan Loket Pasar Malam, sekaligus          */
/*     simulasi pencapaian misi bab ini.                                    */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Bandingkan dua kelompok, lalu cari selisihnya di batang dan garis bilangan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  B: "Menjumlah sampai 20 dengan loncat, jembatan sepuluh, dan belasan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Mengurang sampai 20, lalu bantu Kak Tiket di loket. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL_BELASAN_TAMBAH: TampilBelasan[] = ["benda", "tabel", "pecah"];
const TAMPIL_BELASAN_KURANG: TampilBelasan[] = ["benda", "tabel", "pecah", "periksa"];

/** Dua pengatur belasan (tambah dan kurang) tetap hidup, jadi pilihan anak tidak hilang saat berganti. */
function BelasanDua({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan: (k: KeadaanBab6) => void }) {
  const [op, setOp] = useState<"tambah" | "kurang">("tambah");
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih operasi belasan">
        <Pilihan aktif={op === "tambah"} onKlik={() => setOp("tambah")}>
          Menjumlah
        </Pilihan>
        <Pilihan aktif={op === "kurang"} onKlik={() => setOp("kurang")}>
          Mengurang
        </Pilihan>
      </div>
      <div hidden={op !== "tambah"}>
        <SimulasiBelasan speakGuru={speakGuru} op="tambah" tampil={TAMPIL_BELASAN_TAMBAH} onKeadaan={onKeadaan} />
      </div>
      <div hidden={op !== "kurang"}>
        <SimulasiBelasan speakGuru={speakGuru} op="kurang" tampil={TAMPIL_BELASAN_KURANG} onKeadaan={onKeadaan} />
      </div>
    </div>
  );
}

const langkahBab6 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab6(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Lab Hitung 20: Pencapaian Misi" : "Lab Hitung 20",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab6) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const ops = huruf === "A" ? (["selisih"] as const) : huruf === "B" ? (["selisih", "tambah"] as const) : (["selisih", "tambah", "kurang"] as const);
        const banding: TabLab = { id: "banding", nama: "Selisih Dua Kelompok", render: () => <SimulasiBanding speakGuru={a.speakGuru} tampil={["pasang", "batang", "selisih"]} onKeadaan={lapor} /> };
        const garis: TabLab = { id: "garis", nama: "Garis Bilangan", render: () => <SimulasiLoncat speakGuru={a.speakGuru} ops={[...ops]} onKeadaan={lapor} /> };
        const jembatan: TabLab = { id: "jembatan", nama: "Jembatan Sepuluh", render: () => <SimulasiJembatan speakGuru={a.speakGuru} onTuntas={() => selesai("jembatan")} /> };
        const belasanB: TabLab = { id: "belasan", nama: "Belasan", render: () => <SimulasiBelasan speakGuru={a.speakGuru} op="tambah" tampil={TAMPIL_BELASAN_TAMBAH} onKeadaan={lapor} /> };
        const belasanC: TabLab = { id: "belasan", nama: "Belasan", render: () => <BelasanDua speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const loket: TabLab = { id: "loket", nama: "Loket Pasar Malam", render: () => <SimulasiSkenario def={SKENARIO_BAB6} speakGuru={a.speakGuru} onTuntas={() => selesai("loket")} /> };
        const tab = huruf === "A" ? [banding, garis] : huruf === "B" ? [banding, garis, jembatan, belasanB] : [banding, garis, jembatan, belasanC, loket];
        return <LabBertahap tab={tab} label="Alat laboratorium hitung 20" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab6 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab6(sub)[0].misi ?? ""}`;

export default function SimulasiBab6Materi({
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
  const huruf = ["A", "B", "C"].includes(sub) ? sub : "A";
  return <SimulasiAlur judulBab={`Bab 6 · Sub-Bab ${huruf}`} langkah={langkahBab6(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}