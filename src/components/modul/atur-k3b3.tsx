"use client";

import React from "react";

/** Pengatur bilangan dengan empat tombol: −10, −1, +1, dan +10. Dipakai Lab Meteran dan Lab Timbangan Kodok Kelas 3 Bab 3. */
export type LangkahAtur = 1 | -1 | 10 | -10;
const LANGKAH: LangkahAtur[] = [-10, -1, 1, 10];

export default function Atur4({
  nama,
  nilai,
  warna,
  onUbah,
  mati = false,
  satuan = "",
}: {
  nama: string;
  nilai: string | number;
  warna: string;
  onUbah: (d: LangkahAtur) => void;
  mati?: boolean;
  /** Dipakai pada label tombol untuk pembaca layar, mis. "meter". */
  satuan?: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: warna }}>
      <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">{nama}</span>
      {LANGKAH.map((d, i) => (
        <React.Fragment key={d}>
          {i === 2 ? (
            <span className="w-12 shrink-0 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
              {nilai}
            </span>
          ) : null}
          <button
            type="button"
            disabled={mati}
            aria-label={`${d > 0 ? "Tambah" : "Kurangi"} ${Math.abs(d)}${satuan ? ` ${satuan}` : ""} pada ${nama}`}
            onClick={() => onUbah(d)}
            className={`h-9 shrink-0 rounded-full border-4 border-[#1C01A5] px-1.5 text-sm font-black leading-none text-[#1C01A5] disabled:opacity-30 ${d > 0 ? "bg-[#FFE566]" : "bg-white"}`}
          >
            {d > 0 ? `+${d}` : `−${Math.abs(d)}`}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
