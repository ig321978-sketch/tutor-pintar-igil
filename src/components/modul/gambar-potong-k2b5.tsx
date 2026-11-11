"use client";

import React, { useId } from "react";
import { pusat, potong, poligonBentuk, ujungGaris, type BentukLab, type GarisLab, type Titik } from "./lab-potong-k2b5";

/**
 * Gambar bentuk polos yang dibelah garis (Kelas 2 Bab 5). Ini diagram, bukan gambar benda, jadi sah dipakai
 * di simulasi maupun tahap Pictorial. Bagian bisa diketuk (diwarnai atau ditandai).
 */

const PASTEL = ["#E0E7FF", "#FEF3C7", "#EDE9FE", "#FDE68A"];
const EMAS = "#F0AB00";
const UNGU = "#1C01A5";

export const warnaBagian = (i: number) => PASTEL[i % PASTEL.length];

const jalur = (p: readonly Titik[]) => `M ${p.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" L ")} Z`;

export type PropGambarPotong = {
  bentuk: BentukLab;
  garis: readonly GarisLab[];
  /** Bagian diwarnai emas. Panjang mengikuti jumlah bagian. */
  warna?: readonly boolean[];
  /** Teks kecil di tengah tiap bagian (mis. nomor atau lambang pecahan). */
  teks?: readonly (string | null)[];
  /** Ketuk atau tekan Enter pada sebuah bagian. */
  onKetuk?: (i: number) => void;
  /** Garis putus-putus di posisi garis potong. */
  tampilGaris?: boolean;
  kelas?: string;
  label: string;
};

export default function GambarPotong({ bentuk, garis, warna, teks, onKetuk, tampilGaris = true, kelas = "h-52 w-52", label }: PropGambarPotong) {
  const id = useId();
  const keping = potong(bentuk, garis);
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label}>
      <defs>
        <clipPath id={`${id}-kotak`}>
          <rect x="0" y="0" width="100" height="100" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="98" height="98" rx="8" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="1" />
      {keping.map((p, i) => {
        const berwarna = warna?.[i] === true;
        const bisa = onKetuk !== undefined;
        return (
          <path
            key={i}
            d={jalur(p)}
            fill={berwarna ? EMAS : keping.length === 1 ? "#E0E7FF" : warnaBagian(i)}
            stroke={UNGU}
            strokeWidth="1.6"
            strokeLinejoin="round"
            className={bisa ? "cursor-pointer outline-none focus-visible:stroke-[3]" : undefined}
            role={bisa ? "button" : undefined}
            tabIndex={bisa ? 0 : undefined}
            aria-label={bisa ? `Bagian ${i + 1} dari ${keping.length}${berwarna ? ", berwarna" : ""}` : undefined}
            onClick={bisa ? () => onKetuk(i) : undefined}
            onKeyDown={
              bisa
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onKetuk(i);
                    }
                  }
                : undefined
            }
          />
        );
      })}
      {tampilGaris
        ? garis.map((g, i) => {
            const [a, b] = ujungGaris(g);
            return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#DC2626" strokeWidth="1.6" strokeDasharray="4 3" clipPath={`url(#${id}-kotak)`} pointerEvents="none" />;
          })
        : null}
      {teks
        ? keping.map((p, i) => {
            const t = teks[i];
            if (!t) return null;
            const c = pusat(p);
            return (
              <text key={i} x={c[0]} y={c[1]} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="900" fill={UNGU} pointerEvents="none">
                {t}
              </text>
            );
          })
        : null}
    </svg>
  );
}

/** Kerangka bentuk saja (tanpa garis), untuk tombol pilih bentuk. */
export function IkonBentuk({ bentuk, kelas = "h-8 w-8" }: { bentuk: BentukLab; kelas?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} aria-hidden="true">
      <path d={jalur(poligonBentuk(bentuk))} fill="#E0E7FF" stroke={UNGU} strokeWidth="6" strokeLinejoin="round" />
    </svg>
  );
}

/** Batang perbandingan: lebar tiap segmen sesuai luas bagian. Segmen sama lebar berarti sama besar. */
export function BatangPerbandingan({ rasio, warna }: { rasio: readonly number[]; warna?: readonly boolean[] }) {
  return (
    <div className="flex h-9 w-full overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="img" aria-label={`Batang perbandingan ${rasio.length} bagian`}>
      {rasio.map((r, i) => (
        <div
          key={i}
          style={{ width: `${r * 100}%`, background: warna?.[i] ? EMAS : warnaBagian(i) }}
          className={`flex items-center justify-center text-[11px] font-black text-[#1C01A5] ${i > 0 ? "border-l-4 border-[#1C01A5]" : ""}`}
        >
          {Math.round(r * 100)}%
        </div>
      ))}
    </div>
  );
}
