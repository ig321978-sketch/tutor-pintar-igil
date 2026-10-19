"use client";

import { useState } from "react";

export default function SimulasiPhetPenjumlahanKelas1({
  onBenar,
}: {
  onBenar?: () => void;
}) {
  const [part1, setPart1] = useState<number>(3);
  const [part2, setPart2] = useState<number>(4);
  const [selectedTool, setSelectedTool] = useState<"batang" | "garis_bilangan">("batang");

  const totalSum = part1 + part2;
  const batasGaris = Math.max(10, totalSum);
  const titikGaris = Array.from({ length: batasGaris + 1 }, (_, angka) => angka);

  const catat = () => onBenar?.();

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-2xl">
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
      <div className="flex flex-col justify-between gap-4 border-b border-indigo-800/60 pb-4 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase text-slate-950">
              PhET-Style Interactive Lab
            </span>
            <span className="text-xs font-bold text-indigo-300">Matematika Kelas 1 SD • Bab 2</span>
          </div>
          <h2 className="mt-1 text-2xl font-black tracking-tight">
            Laboratorium Penjumlahan: Batang Blok & Garis Bilangan
          </h2>
        </div>

        <div className="flex self-start rounded-xl border border-slate-700 bg-slate-800 p-1 md:self-auto">
          <button
            type="button"
            onClick={() => {
              setSelectedTool("batang");
              catat();
            }}
            className={`rounded-lg px-4 py-2 text-xs font-extrabold transition ${
              selectedTool === "batang" ? "bg-indigo-600 text-white shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            🧱 Batang Blok Satuan
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTool("garis_bilangan");
              catat();
            }}
            className={`rounded-lg px-4 py-2 text-xs font-extrabold transition ${
              selectedTool === "garis_bilangan" ? "bg-indigo-600 text-white shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            📏 Garis Bilangan Kancil
          </button>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-slate-700/80 bg-slate-800/80 p-5">
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-amber-400">
              🎛️ Panel Kontrol Nilai (0 s.d 10)
            </h3>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-400">Kelompok Pertama (Hijau):</span>
                <span className="text-lg font-black text-emerald-300">{part1}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={part1}
                onChange={(e) => {
                  setPart1(Number(e.target.value));
                  catat();
                }}
                className="w-full cursor-pointer accent-emerald-500"
                aria-label="Kelompok pertama"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-400">Kelompok Kedua (Merah):</span>
                <span className="text-lg font-black text-rose-300">{part2}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={part2}
                onChange={(e) => {
                  setPart2(Number(e.target.value));
                  catat();
                }}
                className="w-full cursor-pointer accent-rose-500"
                aria-label="Kelompok kedua"
              />
            </div>
          </div>

          <div className="rounded-xl border border-indigo-500/30 bg-slate-900 p-4 text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">Persamaan Matematika</div>
            <div className="mt-1 text-2xl font-black text-amber-300">
              {part1} ＋ {part2} ＝ <span className="text-emerald-400">{totalSum}</span>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/90 p-6 lg:col-span-2">
          {selectedTool === "batang" ? (
            <div className="w-full space-y-6">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
                Visualisasi Blok Gabungan (Part-Part-Whole Model)
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex min-w-[130px] flex-col items-center rounded-xl border border-emerald-500/40 bg-slate-800 p-3">
                  <span className="mb-2 text-[11px] font-bold text-emerald-400">Bagian 1: {part1}</span>
                  <div className="flex min-h-[40px] max-w-[120px] flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: part1 }).map((_, i) => (
                      <div key={i} className="animate-scaleIn h-6 w-6 rounded-md border border-emerald-400 bg-emerald-500 shadow-sm" />
                    ))}
                    {part1 === 0 ? <span className="text-xs italic text-slate-500">Kosong (0)</span> : null}
                  </div>
                </div>

                <span className="text-2xl font-black text-slate-500">＋</span>

                <div className="flex min-w-[130px] flex-col items-center rounded-xl border border-rose-500/40 bg-slate-800 p-3">
                  <span className="mb-2 text-[11px] font-bold text-rose-400">Bagian 2: {part2}</span>
                  <div className="flex min-h-[40px] max-w-[120px] flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: part2 }).map((_, i) => (
                      <div key={i} className="animate-scaleIn h-6 w-6 rounded-md border border-rose-400 bg-rose-500 shadow-sm" />
                    ))}
                    {part2 === 0 ? <span className="text-xs italic text-slate-500">Kosong (0)</span> : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl border border-indigo-500/50 bg-indigo-950/80 p-4">
                <span className="mb-2 text-xs font-extrabold uppercase text-amber-300">
                  Total Keseluruhan (Whole): {totalSum} Satuan
                </span>
                <div className="flex min-h-[45px] max-w-[340px] flex-wrap items-center justify-center gap-1.5">
                  {Array.from({ length: totalSum }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-lg border shadow-md ${
                        i < part1 ? "border-emerald-300 bg-emerald-500" : "border-rose-300 bg-rose-500"
                      }`}
                    />
                  ))}
                  {totalSum === 0 ? <span className="text-xs italic text-slate-400">Belum ada angka</span> : null}
                </div>
              </div>
            </div>
          ) : null}

          {selectedTool === "garis_bilangan" ? (
            <div className="w-full space-y-6">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
                Model Melompat di Garis Bilangan (0 sampai {batasGaris})
              </div>

              <div className="relative overflow-x-auto px-2 pb-4 pt-8">
                <div className="absolute left-4 right-4 top-14 h-1.5 rounded-full bg-slate-700" />

                <div className={`relative z-10 flex justify-between ${batasGaris > 10 ? "min-w-[36rem]" : ""}`}>
                  {titikGaris.map((num) => {
                    const isPart1 = num > 0 && num <= part1;
                    const isPart2 = num > part1 && num <= totalSum;
                    const isFinal = num === totalSum;

                    return (
                      <div key={num} className="flex flex-col items-center">
                        <div
                          className={`h-4 w-4 rounded-full border-2 transition-all ${
                            isFinal
                              ? "scale-125 border-white bg-amber-400 ring-4 ring-amber-400/30"
                              : isPart1
                                ? "border-emerald-300 bg-emerald-500"
                                : isPart2
                                  ? "border-rose-300 bg-rose-500"
                                  : "border-slate-600 bg-slate-800"
                          }`}
                        />
                        <span className={`mt-2 text-xs font-bold ${isFinal ? "font-black text-amber-400" : "text-slate-400"}`}>
                          {num}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-slate-700 bg-slate-800/90 p-4 text-center text-xs">
                <div>
                  Langkah Pertama: Kancil melompat dari 0 sejauh <strong className="text-emerald-400">{part1} langkah</strong>.
                </div>
                <div>
                  Langkah Kedua: Kancil melompat lagi sejauh <strong className="text-rose-400">{part2} langkah</strong>.
                </div>
                <div className="pt-1 font-extrabold text-amber-300">
                  🎯 Posisi Akhir Kancil mendarat di angka: {totalSum}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
