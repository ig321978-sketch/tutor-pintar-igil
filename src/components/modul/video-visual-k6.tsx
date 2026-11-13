"use client";

import React from "react";
import { Muncul } from "./video-cerita";
import {
  BatangPecahanSvg,
  KubusSvg,
  LabelSvg,
  PizzaSvg,
  RasioBatangSvg,
  progresDari,
  nyalaDariWaktu,
  nyalaSeirama,
  HIJAU,
  ORANYE,
} from "./video-visual-kit";
import { BIRU, EMAS } from "./CeritaBandingB";

/** Koreografi visual Story Kelas 6 — seirama ketukan `k` + waktu suara `t`. */
export function visualK6(kode: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  const bab = kode.slice(0, 4);
  const sub = kode.slice(4);
  const p = progresDari(t);

  if (bab === "k6b1") {
    if (sub === "a") {
      const slices = k === 0 ? nyalaDariWaktu(t, 3, 1.5) : Math.min(3, Math.max(2, nyalaDariWaktu(t, 3, 1.2)));
      return (
        <>
          <PizzaSvg x={100} y={100} q={3} p={2} r={42} k={Math.max(0, slices - 1)} />
          {k >= 1 || p > 0.45 ? (
            <Muncul>
              <LabelSvg x={170} y={90} w={90} teks="× 1/2" ukuran={14} />
            </Muncul>
          ) : null}
          {k >= 2 || p > 0.75 ? <LabelSvg x={100} y={160} w={100} teks="2/6 = 1/3" ukuran={13} warna={HIJAU} /> : null}
          {k >= 3 ? <LabelSvg x={90} y={40} w={120} teks="kali pecahan" ukuran={12} warna={ORANYE} /> : null}
        </>
      );
    }
    if (sub === "b") {
      return (
        <>
          <BatangPecahanSvg q={4} p={3} k={nyalaSeirama(k, t, 4, 1.2) - 1} />
          {k >= 1 ? <LabelSvg x={90} y={155} w={120} teks="bagi = × kebalikan" ukuran={11} /> : null}
          {k >= 3 ? <LabelSvg x={95} y={40} w={110} teks="3/4 ÷ 1/2" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    return (
      <>
        <BatangPecahanSvg q={10} p={3} k={nyalaSeirama(k, t, 10, 0.7) - 1} w={200} x={50} />
        {k >= 2 || p > 0.6 ? (
          <Muncul>
            <LabelSvg x={100} y={155} w={100} teks="0,3 = 3/10" ukuran={13} warna={HIJAU} />
          </Muncul>
        ) : null}
        {k >= 3 ? <LabelSvg x={90} y={40} w={120} teks="desimal ↔ pecahan" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k6b2") {
    if (v === 0 || sub === "a") {
      return (
        <>
          <RasioBatangSvg a={2} b={3} k={Math.min(3, k + (p > 0.4 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={95} y={40} w={110} teks="2 : 3" ukuran={14} warna={HIJAU} /> : null}
        </>
      );
    }
    if (v === 1 || sub === "b") {
      return (
        <>
          <RasioBatangSvg a={2} b={3} k={Math.min(2, k + (p > 0.35 ? 1 : 0))} />
          {k >= 1 || p > 0.5 ? (
            <Muncul>
              <text x="150" y="50" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
                {k >= 2 ? "2:3 = 4:6" : "perbesar rasio"}
              </text>
            </Muncul>
          ) : null}
          {k >= 3 ? <LabelSvg x={90} y={165} w={120} teks="setara" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    return (
      <>
        <RasioBatangSvg a={3} b={5} k={Math.min(3, k + (p > 0.4 ? 1 : 0))} />
        {k >= 2 ? <LabelSvg x={85} y={40} w={130} teks="terapkan rasio" ukuran={12} /> : null}
        {k >= 3 ? <LabelSvg x={90} y={165} w={120} teks="skala resep" ukuran={11} warna={ORANYE} /> : null}
      </>
    );
  }

  if (bab === "k6b3") {
    if (sub === "a") {
      return (
        <>
          <KubusSvg k={Math.min(3, k + (p > 0.4 ? 1 : 0))} balok={a >= 1 || v >= 1} />
          {k >= 2 ? <LabelSvg x={95} y={165} w={110} teks={a >= 1 ? "balok" : "kubus"} ukuran={13} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "b") {
      const nyala = nyalaSeirama(k, t, 12, 0.9);
      return (
        <>
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => {
              const i = r * 4 + c;
              if (i >= nyala) return null;
              return <rect key={`${r}-${c}`} x={70 + c * 40} y={50 + r * 40} width={36} height={36} rx="4" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />;
            }),
          )}
          {k >= 2 || p > 0.6 ? <LabelSvg x={95} y={175} w={110} teks="tampak atas" ukuran={12} /> : null}
        </>
      );
    }
    const jejak = Math.min(1, k === 0 ? p * 0.35 : k === 1 ? 0.35 + p * 0.4 : k === 2 ? 0.75 + p * 0.25 : 1);
    return (
      <>
        <rect x="40" y="50" width="220" height="120" fill="#ECFDF5" stroke={BIRU} strokeWidth="2" rx="8" />
        <polyline
          points="70,90 150,90 150,140 230,140"
          fill="none"
          stroke={EMAS}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - jejak}
        />
        <circle cx="70" cy="90" r="10" fill={EMAS} stroke={BIRU} strokeWidth="2" />
        {jejak > 0.85 ? <circle cx="230" cy="140" r="10" fill="#86EFAC" stroke={BIRU} strokeWidth="2" /> : null}
        {k >= 3 ? <LabelSvg x={95} y={175} w={110} teks="jalur terpendek" ukuran={11} /> : null}
      </>
    );
  }

  return null;
}
