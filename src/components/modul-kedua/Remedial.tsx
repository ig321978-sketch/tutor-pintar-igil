"use client";

import { useState } from "react";
import type { DataModul } from "@/lib/modul-kedua/tipe";
import LatihanTahap, { type HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";

/** Remedial otomatis: penjelasan ulang, lalu soal serupa yang lebih mudah, sebelum tahap diulang dengan angka baru. */
export default function Remedial({
  data,
  kunci,
  indeksTahap,
  putaran,
  benih,
  saatSelesai,
}: {
  data: DataModul;
  kunci: string;
  indeksTahap: number;
  putaran: number;
  benih: number;
  saatSelesai: (h: HasilLatihan) => void;
}) {
  const [langkah, setLangkah] = useState<"jelas" | "soal">("jelas");
  const paket = data.remedial[kunci] ?? data.remedial.abstract;
  const bacaan = paket.penjelasan.join(" ");
  if (langkah === "jelas") {
    return (
      <section className="space-y-3 rounded-3xl border-4 border-rose-400 bg-rose-50 p-4">
        <h2 className="text-2xl font-black text-indigo-950">Yuk, kita ulang sebentar 🌱</h2>
        <p className="text-base font-bold text-rose-900">
          Nilai tahap tadi {Math.round(indeksTahap)}. Targetnya 80. Tenang, kita pelajari lagi pelan-pelan (ulangan ke-{putaran}).
        </p>
        <ul className="space-y-2">
          {paket.penjelasan.map((p) => (
            <li key={p} className="rounded-2xl bg-white p-3 text-lg font-bold text-indigo-950">
              {p}
            </li>
          ))}
        </ul>
        <TombolSuara teks={bacaan} label="Dengarkan penjelasan" />
        <button type="button" onClick={() => setLangkah("soal")} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Latihan yang lebih mudah ➜
        </button>
      </section>
    );
  }
  return <LatihanTahap spesifikasi={paket.soal} benih={benih} mode="latihan" saatSelesai={saatSelesai} />;
}
