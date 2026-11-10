"use client";
import React from "react";
import type { JenisBangun } from "./data-k4b5";

const BIRU = "#1C01A5";
const ISI = "#F59E0B";

export function SvgBangun({ jenis, kecil = false }: { jenis: JenisBangun; kecil?: boolean }) {
  const s = kecil ? 56 : 84;
  const stroke = { stroke: BIRU, strokeWidth: 2.2, fill: ISI, fillOpacity: 0.85 };
  if (jenis === "segitiga") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="segitiga">
        <polygon points="42,8 76,72 8,72" {...stroke} />
      </svg>
    );
  }
  if (jenis === "persegi") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="persegi">
        <rect x="16" y="16" width="52" height="52" rx="4" {...stroke} />
      </svg>
    );
  }
  if (jenis === "persegi-panjang") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="persegi panjang">
        <rect x="8" y="24" width="68" height="36" rx="4" {...stroke} />
      </svg>
    );
  }
  if (jenis === "jajargenjang") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="jajargenjang">
        <polygon points="22,24 72,24 62,60 12,60" {...stroke} />
      </svg>
    );
  }
  if (jenis === "belah-ketupat") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="belah ketupat">
        <polygon points="42,8 72,42 42,76 12,42" {...stroke} />
      </svg>
    );
  }
  if (jenis === "layang-layang") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="layang-layang">
        <polygon points="42,6 70,36 42,78 14,36" {...stroke} />
      </svg>
    );
  }
  if (jenis === "trapesium") {
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="trapesium">
        <polygon points="24,24 60,24 74,62 10,62" {...stroke} />
      </svg>
    );
  }
  if (jenis === "segilima") {
    const pts = [0, 1, 2, 3, 4].map((i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      return `${42 + 32 * Math.cos(a)},${42 + 32 * Math.sin(a)}`;
    });
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="segilima">
        <polygon points={pts.join(" ")} {...stroke} />
      </svg>
    );
  }
  if (jenis === "segienam") {
    const pts = [0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i * Math.PI) / 3;
      return `${42 + 30 * Math.cos(a)},${42 + 30 * Math.sin(a)}`;
    });
    return (
      <svg width={s} height={s} viewBox="0 0 84 84" aria-label="segienam">
        <polygon points={pts.join(" ")} {...stroke} />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 84 84" aria-label="lingkaran">
      <circle cx="42" cy="42" r="30" {...stroke} />
    </svg>
  );
}

export function KomposisiMini({ bagian }: { bagian: string }) {
  return (
    <div className="rounded-xl border-2 border-[#1C01A5] bg-amber-50 px-2 py-1 text-center text-xs font-black text-[#1C01A5]">
      {bagian}
    </div>
  );
}
