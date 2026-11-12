"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K4B6 Sub-Bab B: diagram batang tegak atau mendatar.           */
/* Sumbu nilai punya 10 garis berlangkah tetap mulai dari nol. Batang polos.  */
/* Bisa diketuk: tiap pita garis (atur tinggi) atau tiap batang (pilih).      */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const KUNING = "#FFE566";
const ABU = "#1C01A533";

export type PropsDiagram = {
  judul?: string | null;
  kategori: string[];
  tinggi: number[];
  skala: number;
  garis?: number;
  arah: "tegak" | "mendatar";
  labelTegak?: string | null;
  labelDatar?: string | null;
  pilih?: number[];
  /** Ketuk pita garis ke-k (1 sampai garis) pada batang i. */
  onAtur?: (i: number, k: number) => void;
  /** Ketuk batang i. */
  onPilih?: (i: number) => void;
};

const W = 320;
const H = 240;

/** Teks pendek dua baris: kata terakhir turun bila terlalu panjang. */
function Kata({ x, y, teks, anchor }: { x: number; y: number; teks: string; anchor: "middle" | "end" }) {
  const kata = teks.split(" ");
  if (teks.length <= 8 || kata.length === 1)
    return (
      <text x={x} y={y} textAnchor={anchor} fontSize="10" fontWeight="800" fill={BIRU}>
        {teks}
      </text>
    );
  return (
    <text x={x} y={y - 4} textAnchor={anchor} fontSize="10" fontWeight="800" fill={BIRU}>
      <tspan x={x}>{kata.slice(0, -1).join(" ")}</tspan>
      <tspan x={x} dy="10">
        {kata[kata.length - 1]}
      </tspan>
    </text>
  );
}

export function DiagramBatang({ judul, kategori, tinggi, skala, garis = 10, arah, labelTegak, labelDatar, pilih = [], onAtur, onPilih }: PropsDiagram) {
  const n = kategori.length;
  const maks = garis * skala;
  const tegak = arah === "tegak";
  // Bidang gambar.
  const x0 = tegak ? 46 : 74;
  const x1 = W - 10;
  const y0 = 26;
  const y1 = tegak ? H - 46 : H - 40;
  const panjangNilai = tegak ? y1 - y0 : x1 - x0;
  const pjgKat = tegak ? x1 - x0 : y1 - y0;
  const slot = pjgKat / n;
  const tebal = slot * 0.58;
  const posNilai = (v: number) => (tegak ? y1 - (v / maks) * panjangNilai : x0 + (v / maks) * panjangNilai);
  const posKat = (i: number) => (tegak ? x0 + i * slot + (slot - tebal) / 2 : y0 + i * slot + (slot - tebal) / 2);
  const pilihUrut = [...pilih].sort((a, b) => a - b);
  const dua = pilihUrut.length === 2 ? pilihUrut.map((i) => tinggi[i]) : null;
  const pendek = dua ? Math.min(dua[0], dua[1]) : 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block h-auto w-full max-w-md" role="img" aria-label={`Diagram batang ${arah}${judul ? `, ${judul}` : ""}`}>
      <rect x="0" y="0" width={W} height={H} rx="12" fill="white" />
      <text x={W / 2} y="16" textAnchor="middle" fontSize="11" fontWeight="900" fill={judul ? BIRU : `${BIRU}88`}>
        {judul ?? "judul …?"}
      </text>
      {/* Garis sumbu nilai dan angkanya. */}
      {Array.from({ length: garis + 1 }, (_, k) => {
        const p = posNilai(k * skala);
        return tegak ? (
          <g key={k}>
            <line x1={x0} x2={x1} y1={p} y2={p} stroke={k === 0 ? BIRU : ABU} strokeWidth={k === 0 ? 2 : 1} />
            <text x={x0 - 4} y={p + 3} textAnchor="end" fontSize="9" fontWeight="700" fill={BIRU}>
              {k * skala}
            </text>
          </g>
        ) : (
          <g key={k}>
            <line y1={y0} y2={y1} x1={p} x2={p} stroke={k === 0 ? BIRU : ABU} strokeWidth={k === 0 ? 2 : 1} />
            <text x={p} y={y1 + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill={BIRU}>
              {k * skala}
            </text>
          </g>
        );
      })}
      {tegak ? <line x1={x0} x2={x0} y1={y0 - 4} y2={y1} stroke={BIRU} strokeWidth="2" /> : <line x1={x0} x2={x1 + 4} y1={y1} y2={y1} stroke={BIRU} strokeWidth="2" />}
      {/* Batang. */}
      {kategori.map((nama, i) => {
        const v = Math.min(tinggi[i], maks);
        const dipilih = pilih.includes(i);
        const isi = dipilih ? EMAS : KUNING;
        const a = posKat(i);
        const ujung = posNilai(v);
        return (
          <g key={nama}>
            {tegak ? (
              <rect x={a} y={ujung} width={tebal} height={Math.max(0, y1 - ujung)} fill={isi} stroke={BIRU} strokeWidth="2" />
            ) : (
              <rect x={x0} y={a} width={Math.max(0, ujung - x0)} height={tebal} fill={isi} stroke={BIRU} strokeWidth="2" />
            )}
            {tegak ? <Kata x={a + tebal / 2} y={y1 + 14} teks={nama} anchor="middle" /> : <Kata x={x0 - 5} y={a + tebal / 2 + 3} teks={nama} anchor="end" />}
          </g>
        );
      })}
      {/* Sorot selisih dua batang: garis putus-putus di ujung batang yang lebih pendek. */}
      {dua
        ? tegak
          ? <line x1={x0} x2={x1} y1={posNilai(pendek)} y2={posNilai(pendek)} stroke="#DC2626" strokeWidth="2" strokeDasharray="5 4" />
          : <line y1={y0} y2={y1} x1={posNilai(pendek)} x2={posNilai(pendek)} stroke="#DC2626" strokeWidth="2" strokeDasharray="5 4" />
        : null}
      {/* Label sumbu. */}
      <text
        x="10"
        y={(y0 + y1) / 2}
        transform={`rotate(-90 10 ${(y0 + y1) / 2})`}
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill={labelTegak ? BIRU : `${BIRU}88`}
      >
        {labelTegak ?? "label …?"}
      </text>
      <text x={(x0 + x1) / 2} y={H - 4} textAnchor="middle" fontSize="9" fontWeight="900" fill={labelDatar ? BIRU : `${BIRU}88`}>
        {labelDatar ?? "label …?"}
      </text>
      {/* Sasaran ketuk. */}
      {onAtur
        ? kategori.map((nama, i) =>
            Array.from({ length: garis }, (_, j) => {
              const k = j + 1;
              const p0 = posNilai((k - 1) * skala);
              const p1 = posNilai(k * skala);
              const a = tegak ? x0 + i * slot : y0 + i * slot;
              return (
                <rect
                  key={`${nama}-${k}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Atur batang ${nama} ke ${k * skala}`}
                  x={tegak ? a : Math.min(p0, p1)}
                  y={tegak ? Math.min(p0, p1) : a}
                  width={tegak ? slot : Math.abs(p1 - p0)}
                  height={tegak ? Math.abs(p1 - p0) : slot}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onAtur(i, k)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onAtur(i, k);
                  }}
                />
              );
            }),
          )
        : null}
      {onPilih
        ? kategori.map((nama, i) => {
            const a = tegak ? x0 + i * slot : y0 + i * slot;
            return (
              <rect
                key={`pilih-${nama}`}
                role="button"
                tabIndex={0}
                aria-pressed={pilih.includes(i)}
                aria-label={`Pilih batang ${nama}`}
                x={tegak ? a : x0}
                y={tegak ? y0 : a}
                width={tegak ? slot : x1 - x0}
                height={tegak ? y1 - y0 : slot}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onPilih(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onPilih(i);
                }}
              />
            );
          })
        : null}
    </svg>
  );
}
