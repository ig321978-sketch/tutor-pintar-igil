"use client";

import { useEffect, useState } from "react";
import { mainkanSuara } from "@/lib/suara-web-audio";

type Mode = "tegak" | "datar" | "piktogram";

export default function SimulasiMtk5Bab8({ onBenar }: { onBenar?: () => void }) {
  const [minggu, setMinggu] = useState([8, 12, 18, 10, 6]);
  const [mode, setMode] = useState<Mode>("tegak");
  const [sudah, setSudah] = useState<Record<Mode, boolean>>({ tegak: true, datar: false, piktogram: false });
  const [selesai, setSelesai] = useState(false);
  const total = minggu.reduce((jumlah, nilai) => jumlah + nilai, 0);
  const tertinggi = Math.max(...minggu);
  const selisih = tertinggi - Math.min(...minggu);

  const gantiMode = (berikut: Mode) => {
    mainkanSuara("click");
    setMode(berikut);
    setSudah((lama) => ({ ...lama, [berikut]: true }));
  };

  useEffect(() => {
    if (selesai || !sudah.tegak || !sudah.datar || !sudah.piktogram) return;
    setSelesai(true);
    mainkanSuara("fanfare");
    onBenar?.();
  }, [onBenar, selesai, sudah]);

  return (
    <div className="space-y-4 rounded-3xl border-2 border-teal-200 bg-white p-4">
      <p className="text-sm font-black uppercase tracking-wide text-teal-800">Lab tiga diagram</p>
      <h3 className="text-xl font-black text-[#1C01A5]">Panen biji burung di taman senja</h3>
      <p className="text-sm font-semibold text-slate-700">Geser hasil tiap minggu, lalu lihat data yang sama sebagai batang tegak, batang datar, dan piktogram. Kunci piktogram: 1 biji = 2 kg.</p>
      <div className="flex flex-wrap gap-2">
        {([
          ["tegak", "Batang tegak"],
          ["datar", "Batang datar"],
          ["piktogram", "Piktogram"],
        ] as const).map(([id, label]) => (
          <button key={id} type="button" onClick={() => gantiMode(id)} className={`rounded-full px-3 py-2 text-sm font-black ${mode === id ? "bg-teal-700 text-white" : "bg-teal-50 text-teal-900"}`}>{label}</button>
        ))}
      </div>
      <div className="space-y-2 rounded-2xl bg-teal-50 p-3">
        {minggu.map((nilai, indeks) => (
          <label key={indeks} className="flex items-center gap-2 text-sm font-bold text-[#1C01A5]">
            <span className="w-24">Minggu {indeks + 1}</span>
            <input
              type="range"
              min={2}
              max={24}
              step={2}
              value={nilai}
              onChange={(event) => {
                mainkanSuara("pop");
                const berikut = [...minggu];
                berikut[indeks] = Number(event.target.value);
                setMinggu(berikut);
              }}
              className="flex-1 accent-teal-700"
            />
            <span className="w-12 text-right">{nilai} kg</span>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm font-black text-white">
        <p className="rounded-xl bg-slate-900 px-2 py-3">Total {total} kg</p>
        <p className="rounded-xl bg-slate-900 px-2 py-3">Tertinggi {tertinggi} kg</p>
        <p className="rounded-xl bg-slate-900 px-2 py-3">Selisih {selisih} kg</p>
      </div>
      <div className="min-h-48 rounded-2xl bg-slate-900 p-4 text-white">
        {mode === "tegak" ? (
          <div className="flex h-40 items-end justify-around">
            {minggu.map((nilai, indeks) => (
              <div key={indeks} className="flex w-10 flex-col items-center">
                <span className="text-xs font-black text-amber-200">{nilai}</span>
                <div style={{ height: `${nilai * 5}px` }} className="w-full rounded-t bg-teal-400" />
                <span className="text-[11px] font-bold">Mg {indeks + 1}</span>
              </div>
            ))}
          </div>
        ) : null}
        {mode === "datar" ? (
          <div className="space-y-2">
            {minggu.map((nilai, indeks) => (
              <div key={indeks} className="flex items-center gap-2 text-xs font-bold">
                <span className="w-16">Minggu {indeks + 1}</span>
                <div className="h-4 flex-1 rounded-r bg-slate-700">
                  <div style={{ width: `${(nilai / 24) * 100}%` }} className="h-full rounded-r bg-amber-400" />
                </div>
                <span className="w-12 text-right">{nilai} kg</span>
              </div>
            ))}
          </div>
        ) : null}
        {mode === "piktogram" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-bold text-amber-200">1 gambar = 2 kg</p>
            {minggu.map((nilai, indeks) => (
              <div key={indeks} className="flex items-center gap-2 text-sm">
                <span className="w-16 text-xs font-bold">Minggu {indeks + 1}</span>
                <span className="flex-1">{Array.from({ length: nilai / 2 }, () => "🐦").join("")}</span>
                <span className="font-black text-amber-200">{nilai} kg</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {selesai ? <p className="text-sm font-black text-emerald-800">Tiga diagram sudah kamu lihat. Angka yang sama tetap sama, hanya cara gambarnya yang berubah.</p> : <p className="text-sm font-bold text-slate-600">Buka ketiga cara gambar untuk menyelesaikan lab.</p>}
    </div>
  );
}
