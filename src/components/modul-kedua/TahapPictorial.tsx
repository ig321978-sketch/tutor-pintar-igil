"use client";

import { useState } from "react";
import type { DataModul } from "@/lib/modul-kedua/tipe";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";
import { KotakSepuluh } from "./VisualSoal";

/** Tahap P (Pictorial): latihan dengan diagram. Diawali jembatan eksplisit dari gambar benda ke diagram. */
export default function TahapPictorial({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const [mulai, setMulai] = useState(false);
  if (!mulai) {
    return (
      <section className="space-y-3 rounded-3xl border-4 border-sky-400 bg-sky-50 p-4">
        <h2 className="text-2xl font-black text-indigo-950">P: Latihan Diagram 📊</h2>
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3">
          <span className="text-3xl">🍎🍎🍎</span>
          <span className="text-3xl font-black text-indigo-900">➜</span>
          <div className="w-28">
            <KotakSepuluh jumlah={3} />
          </div>
        </div>
        <p className="text-lg font-bold text-indigo-900">{data.jembatan.cp}</p>
        <TombolSuara teks={data.jembatan.cp} />
        <p className="text-base font-bold text-indigo-900">Diagram yang akan kamu temui: titik, bingkai (kotak) sepuluh, dan baris petak.</p>
        <button type="button" onClick={() => setMulai(true)} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Mulai ➜
        </button>
      </section>
    );
  }
  return <LatihanTahap spesifikasi={data.latihan.pictorial} benih={benih} mode="latihan" saatSelesai={saatSelesai} />;
}
