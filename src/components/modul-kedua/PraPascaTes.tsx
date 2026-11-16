"use client";

import { useState } from "react";
import type { DataModul } from "@/lib/modul-kedua/tipe";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";

/** Pra-tes (diagnostik, sebelum Story) dan pasca-tes (sesudah Abstract). Tanpa petunjuk dan tanpa kunci selama tes. */
export default function PraPascaTes({
  data,
  jenis,
  benih,
  saatSelesai,
}: {
  data: DataModul;
  jenis: "pra" | "pasca";
  benih: number;
  saatSelesai: (h: HasilLatihan) => void;
}) {
  const [mulai, setMulai] = useState(false);
  const spek = jenis === "pra" ? data.tes.pra : data.tes.pasca;
  const kata =
    jenis === "pra"
      ? "Sebelum belajar, kita lihat dulu apa yang sudah kamu tahu. Tidak apa-apa kalau belum tahu. Jawab sebisamu, ya."
      : "Saatnya tes akhir. Tunjukkan apa yang sudah kamu pelajari. Tidak ada petunjuk di tes ini. Kamu pasti bisa.";
  if (!mulai) {
    return (
      <section className="space-y-3 rounded-3xl border-4 border-indigo-400 bg-indigo-50 p-4">
        <h2 className="text-2xl font-black text-indigo-950">{jenis === "pra" ? "Tes Awal 🧭" : "Tes Akhir 🏁"}</h2>
        <p className="text-lg font-bold text-indigo-900">{kata}</p>
        <p className="text-base font-bold text-indigo-900">{spek.length} soal. Tiap soal dijawab satu kali.</p>
        <TombolSuara teks={kata} />
        <button type="button" onClick={() => setMulai(true)} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Mulai tes ➜
        </button>
      </section>
    );
  }
  return <LatihanTahap spesifikasi={spek} benih={benih} mode="tes" saatSelesai={saatSelesai} />;
}
