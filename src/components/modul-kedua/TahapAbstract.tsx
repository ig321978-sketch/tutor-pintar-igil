"use client";

import { useState } from "react";
import type { DataModul } from "@/lib/modul-kedua/tipe";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";
import { Turus } from "./VisualSoal";

/** Tahap A (Abstract): latihan angka murni: 5 knowing, 5 applying, 5 reasoning (termasuk soal non-rutin). */
export default function TahapAbstract({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const [mulai, setMulai] = useState(false);
  if (!mulai) {
    return (
      <section className="space-y-3 rounded-3xl border-4 border-violet-400 bg-violet-50 p-4">
        <h2 className="text-2xl font-black text-indigo-950">A: Latihan Angka 🔢</h2>
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3">
          <div className="w-24">
            <Turus jumlah={3} />
          </div>
          <span className="text-3xl font-black text-indigo-900">➜</span>
          <span className="text-6xl font-black text-indigo-950">3</span>
        </div>
        <p className="text-lg font-bold text-indigo-900">{data.jembatan.pa}</p>
        <TombolSuara teks={data.jembatan.pa} />
        <p className="text-base font-bold text-indigo-900">
          Ada {data.latihan.abstract.length} soal. Setiap soal punya pembahasan empat langkah: pahami, rencanakan, lakukan, periksa kembali.
        </p>
        <button type="button" onClick={() => setMulai(true)} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Mulai ➜
        </button>
      </section>
    );
  }
  return <LatihanTahap spesifikasi={data.latihan.abstract} benih={benih} mode="latihan" saatSelesai={saatSelesai} />;
}
