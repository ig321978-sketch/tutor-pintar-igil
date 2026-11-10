"use client";
import React from "react";
import type { Batang, Dataset, ItemData } from "./data-k4b6";
import { simbolDariNilai } from "./data-k4b6";

const BIRU = "#1C01A5";
const EMAS = "#F59E0B";

/** Deretan simbol piktogram (lingkaran polos untuk tahap Picture; emoji untuk Concrete lewat props). */
export function BarisPikto({
  item,
  skala,
  pakaiEmoji = false,
  kecil = false,
}: {
  item: ItemData;
  skala: number;
  pakaiEmoji?: boolean;
  kecil?: boolean;
}) {
  const n = Math.max(0, Math.round(simbolDariNilai(item.nilai, skala)));
  const size = kecil ? 10 : 14;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-black text-[#1C01A5]">{item.label}</span>
      <div className="flex flex-wrap items-center gap-0.5">
        {Array.from({ length: n }, (_, i) =>
          pakaiEmoji ? (
            <span key={i} className={kecil ? "text-sm" : "text-base"} aria-hidden>
              {item.emoji}
            </span>
          ) : (
            <span
              key={i}
              className="inline-block rounded-full border-2 border-[#1C01A5]"
              style={{ width: size, height: size, background: EMAS }}
              aria-hidden
            />
          ),
        )}
        <span className="ml-1 text-xs font-black text-[#1C01A5]">= {item.nilai}</span>
      </div>
    </div>
  );
}

export function PiktogramMini({ ds, pakaiEmoji = false, kecil = false }: { ds: Dataset; pakaiEmoji?: boolean; kecil?: boolean }) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1 rounded-xl border-2 border-indigo-100 bg-white p-2">
      <p className="text-center text-[10px] font-black text-[#1C01A5]">{ds.judul}</p>
      {ds.item.map((it) => (
        <BarisPikto key={it.id} item={it} skala={ds.skala} pakaiEmoji={pakaiEmoji} kecil={kecil} />
      ))}
      <p className="text-center text-[9px] font-bold text-amber-700">1 simbol = {ds.simbolLabel.replace(/^1 /, "") || ds.skala}</p>
    </div>
  );
}

export function DiagramBatangMini({
  batang,
  arah = "tegak",
  maks,
}: {
  batang: Batang[];
  arah?: "tegak" | "mendatar";
  maks?: number;
}) {
  const max = maks ?? Math.max(...batang.map((b) => b.nilai), 1);
  if (arah === "mendatar") {
    return (
      <div className="flex w-full max-w-xs flex-col gap-1 rounded-xl border-2 border-indigo-100 bg-white p-2">
        {batang.map((b) => (
          <div key={b.id} className="flex items-center gap-1">
            <span className="w-16 shrink-0 truncate text-[9px] font-black text-[#1C01A5]">{b.label}</span>
            <div className="h-3 flex-1 rounded bg-indigo-50">
              <div className="h-3 rounded" style={{ width: `${(b.nilai / max) * 100}%`, background: EMAS, border: `1px solid ${BIRU}` }} />
            </div>
            <span className="w-5 text-right text-[10px] font-black text-[#1C01A5]">{b.nilai}</span>
          </div>
        ))}
      </div>
    );
  }
  const h = 72;
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-1 rounded-xl border-2 border-indigo-100 bg-white p-2">
      <div className="flex h-[72px] w-full items-end justify-around gap-0.5 border-b-2 border-l-2 border-[#1C01A5] px-1">
        {batang.map((b) => (
          <div key={b.id} className="flex flex-col items-center justify-end" style={{ height: h }}>
            <span className="text-[9px] font-black text-[#1C01A5]">{b.nilai}</span>
            <div
              className="w-4 rounded-t"
              style={{ height: Math.max(4, (b.nilai / max) * (h - 14)), background: EMAS, border: `1.5px solid ${BIRU}` }}
              title={b.label}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-around px-1">
        {batang.map((b) => (
          <span key={b.id} className="w-8 truncate text-center text-[8px] font-bold text-[#1C01A5]">
            {b.label.slice(0, 4)}
          </span>
        ))}
      </div>
    </div>
  );
}
