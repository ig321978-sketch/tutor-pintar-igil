"use client";

import { useMemo } from "react";

const WARNA = ["#F0AB00", "#34d399", "#5eead4", "#fde68a", "#fb7185", "#1C01A5"];

export default function KonfetiLokal() {
  const keping = useMemo(
    () =>
      Array.from({ length: 22 }, (_, indeks) => ({
        id: indeks,
        kiri: Math.round(Math.random() * 100),
        tunda: Math.random() * 0.35,
        durasi: 0.9 + Math.random() * 0.6,
        warna: WARNA[indeks % WARNA.length],
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {keping.map((item) => (
        <span
          key={item.id}
          className="igil-konfeti absolute top-0 h-3 w-2 rounded-sm"
          style={{
            left: `${item.kiri}%`,
            backgroundColor: item.warna,
            animationDelay: `${item.tunda}s`,
            animationDuration: `${item.durasi}s`,
          }}
        />
      ))}
    </div>
  );
}
