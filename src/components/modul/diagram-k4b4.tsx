"use client";
import React from "react";

const BIRU = "#1C01A5";
const ISI = "#F59E0B";
const KOSONG = "#FEF3C7";

export function KisiLuas({ sel, kecil = false }: { sel: boolean[][]; kecil?: boolean }) {
  const ukuran = kecil ? 14 : 22;
  const gap = 2;
  const baris = sel.length;
  const kolom = Math.max(...sel.map((r) => r.length), 1);
  const w = kolom * (ukuran + gap);
  const h = baris * (ukuran + gap);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label={`kisi luas ${sel.flat().filter(Boolean).length}`}>
      {sel.map((row, y) =>
        row.map((isi, x) => (
          <rect
            key={`${y}-${x}`}
            x={x * (ukuran + gap)}
            y={y * (ukuran + gap)}
            width={ukuran}
            height={ukuran}
            rx={3}
            fill={isi ? ISI : KOSONG}
            stroke={BIRU}
            strokeWidth={1.5}
          />
        )),
      )}
    </svg>
  );
}

export function SusunanKubusSvg({ lapisan, kecil = false }: { lapisan: number[][]; kecil?: boolean }) {
  const s = kecil ? 12 : 18;
  const gap = 2;
  const maxH = Math.max(1, ...lapisan.flat());
  const baris = lapisan.length;
  const kolom = Math.max(...lapisan.map((r) => r.length), 1);
  const w = kolom * (s + gap) + 8;
  const h = baris * (s + gap) + maxH * 4 + 8;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label={`kubus ${lapisan.flat().reduce((a, b) => a + b, 0)}`}>
      {lapisan.map((row, y) =>
        row.map((tinggi, x) =>
          Array.from({ length: tinggi }, (_, z) => (
            <rect
              key={`${y}-${x}-${z}`}
              x={4 + x * (s + gap)}
              y={h - 4 - (baris - y) * (s + gap) - z * 4}
              width={s}
              height={s}
              rx={3}
              fill={ISI}
              stroke={BIRU}
              strokeWidth={1.4}
              opacity={0.85 + z * 0.05}
            />
          )),
        ),
      )}
    </svg>
  );
}

export function LabelSatuan({ teks }: { teks: string }) {
  return <span className="rounded-xl border-2 border-[#1C01A5] bg-amber-100 px-2 py-1 text-sm font-black text-[#1C01A5]">{teks}</span>;
}
