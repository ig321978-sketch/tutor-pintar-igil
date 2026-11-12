"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B8 Sub-Bab C: diagram batang dengan judul, sumbu kategori,  */
/* sumbu angka bergaris, dan satu atau dua batang tiap kategori.              */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#B91C1C";
const ABU = "#C9C4EE";
const LEBAR = 320;
const TINGGI = 214;
const KIRI = 48;
const KANAN = 312;
const ATAS = 28;
const BAWAH = 172;
const GARIS_N = 10;
const LANGKAH_Y = (BAWAH - ATAS) / GARIS_N;
const LONCAT = [0, 1, 2, 5, 6, 7, 10, 11, 12, 15, 16];

export type SeriBatang = { nama: string; nilai: number[]; warna: string };
export const WARNA_SERI = [BIRU, EMAS];

export function GambarBatang({
  judul,
  kategori,
  seri,
  langkah,
  mulai = 0,
  labelSkala = "normal",
  nama,
}: {
  /** null berarti judul belum dibaca. */
  judul: string | null;
  kategori: string[];
  seri: SeriBatang[];
  langkah: number;
  mulai?: number;
  labelSkala?: "normal" | "loncat" | "tersembunyi";
  nama: string;
}) {
  const lebarGrup = (KANAN - KIRI) / kategori.length;
  const lebarBatang = Math.min(34, (lebarGrup - 14) / seri.length);
  const labelGaris = (n: number): string => {
    if (labelSkala === "tersembunyi") return "?";
    if (labelSkala === "loncat") return String(LONCAT[n] * langkah);
    return String(mulai + n * langkah);
  };
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto h-auto w-full max-w-[360px]" role="img" aria-label={`Diagram batang ${nama}`}>
      <text x={LEBAR / 2} y={15} textAnchor="middle" fontSize={11} fontWeight={800} fill={judul === null ? MERAH : BIRU}>
        {judul === null ? "Judul: ?" : judul}
      </text>
      {Array.from({ length: GARIS_N + 1 }, (_, n) => {
        const y = BAWAH - n * LANGKAH_Y;
        return (
          <g key={n}>
            <line x1={KIRI} y1={y} x2={KANAN} y2={y} stroke={n === 0 ? BIRU : ABU} strokeWidth={n === 0 ? 2 : 1} />
            <text x={KIRI - 4} y={y + 3} textAnchor="end" fontSize={8} fontWeight={700} fill={labelSkala === "tersembunyi" ? MERAH : BIRU}>
              {labelGaris(n)}
            </text>
          </g>
        );
      })}
      <line x1={KIRI} y1={ATAS} x2={KIRI} y2={BAWAH} stroke={BIRU} strokeWidth={2} />
      {kategori.map((k, j) => {
        const x0 = KIRI + j * lebarGrup + (lebarGrup - lebarBatang * seri.length) / 2;
        return (
          <g key={k}>
            {seri.map((s, m) => {
              const mentah = ((s.nilai[j] - mulai) / langkah) * LANGKAH_Y;
              const h = Math.max(0, Math.min(mentah, GARIS_N * LANGKAH_Y));
              const x = x0 + m * lebarBatang;
              return (
                <g key={s.nama}>
                  <rect x={x} y={BAWAH - h} width={lebarBatang - 2} height={h} fill={s.warna} stroke={BIRU} strokeWidth={1.5} />
                  {mentah > GARIS_N * LANGKAH_Y ? (
                    <text x={x + (lebarBatang - 2) / 2} y={ATAS - 2} textAnchor="middle" fontSize={9} fontWeight={800} fill={MERAH}>
                      ▲
                    </text>
                  ) : null}
                </g>
              );
            })}
            <text x={KIRI + j * lebarGrup + lebarGrup / 2} y={BAWAH + 13} textAnchor="middle" fontSize={k.length > 8 ? 7 : 9} fontWeight={800} fill={BIRU}>
              {k}
            </text>
          </g>
        );
      })}
      {seri.length > 1
        ? seri.map((s, m) => (
            <g key={s.nama} transform={`translate(${KIRI + m * 110} ${TINGGI - 14})`}>
              <rect x={0} y={-8} width={10} height={10} fill={s.warna} stroke={BIRU} strokeWidth={1.5} />
              <text x={14} y={1} fontSize={9} fontWeight={800} fill={BIRU}>
                {s.nama}
              </text>
            </g>
          ))
        : null}
    </svg>
  );
}
