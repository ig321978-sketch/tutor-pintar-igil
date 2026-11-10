"use client";
import React from "react";

const WARNA = ["#F59E0B", "#EF4444", "#3B82F6", "#10B981", "#8B5CF6"];

/** Kumpulan benda (titik) mewakili pola gambar. */
export function KumpulanBenda({ banyak, emoji = "🟠", kecil = false }: { banyak: number; emoji?: string; kecil?: boolean }) {
  const size = kecil ? 14 : 18;
  const kolom = Math.min(5, Math.max(1, Math.ceil(Math.sqrt(banyak))));
  return (
    <div className="inline-flex flex-col items-center gap-0.5" aria-label={`${banyak} benda`}>
      <div className="flex flex-wrap justify-center gap-0.5" style={{ maxWidth: kolom * (size + 4) }}>
        {Array.from({ length: banyak }, (_, i) => (
          <span key={i} style={{ fontSize: size, lineHeight: 1 }} aria-hidden>{emoji}</span>
        ))}
      </div>
      <span className="text-xs font-black text-[#1C01A5]">{banyak}</span>
    </div>
  );
}

export function BarisPola({ suku, emoji = "🟠", kecil = false }: { suku: number[]; emoji?: string; kecil?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3">
      {suku.map((n, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <KumpulanBenda banyak={n} emoji={emoji} kecil={kecil} />
          <span className="text-[10px] font-black text-[#1C01A5]/70">K{i + 1}</span>
        </div>
      ))}
      <span className="mb-4 text-2xl font-black text-[#1C01A5]">…</span>
    </div>
  );
}

export function RantaiBilangan({ suku, beda }: { suku: number[]; beda?: number }) {
  const d = beda ?? (suku.length >= 2 ? suku[1] - suku[0] : 0);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {suku.map((n, i) => (
        <React.Fragment key={i}>
          <span className="rounded-xl border-2 border-[#1C01A5] bg-white px-2.5 py-1 text-lg font-black text-[#1C01A5]">{n}</span>
          {i < suku.length - 1 ? <span className="text-xs font-black text-amber-600">{d > 0 ? `+${d}` : `${d}`}</span> : null}
        </React.Fragment>
      ))}
      <span className="text-lg font-black text-[#1C01A5]">…</span>
    </div>
  );
}

export function TitikWarna({ n, warna = WARNA[0] }: { n: number; warna?: string }) {
  return (
    <svg width={Math.min(140, 16 * n + 8)} height={28} viewBox={`0 0 ${16 * n + 8} 28`} aria-label={`${n}`}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={12 + i * 16} cy={14} r={6} fill={warna} stroke="#1C01A5" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
