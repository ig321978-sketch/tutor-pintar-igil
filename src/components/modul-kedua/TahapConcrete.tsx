"use client";

import { useState } from "react";
import type { DataModul } from "@/lib/modul-kedua/tipe";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";

/** Tahap C (Concrete): latihan dengan gambar benda yang bisa diketuk, dihitung, dan diseret. */
export default function TahapConcrete({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const [mulai, setMulai] = useState(false);
  const pengantar = "Sekarang berlatih dengan gambar benda. Ketuk benda untuk menghitung, dan seret benda ke keranjang.";
  if (!mulai) {
    return (
      <section className="space-y-3 rounded-3xl border-4 border-orange-400 bg-orange-50 p-4">
        <h2 className="text-2xl font-black text-indigo-950">C: Latihan Benda 🍎</h2>
        <p className="text-lg font-bold text-indigo-900">{pengantar}</p>
        <p className="text-base font-bold text-indigo-900">Ada {data.latihan.concrete.length} soal: mudah dulu, lalu sedang, lalu sulit.</p>
        <TombolSuara teks={pengantar} />
        <button type="button" onClick={() => setMulai(true)} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Mulai ➜
        </button>
      </section>
    );
  }
  return <LatihanTahap spesifikasi={data.latihan.concrete} benih={benih} mode="latihan" saatSelesai={saatSelesai} />;
}
