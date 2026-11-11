"use client";

import React from "react";
import { Muncul } from "./video-cerita";
import {
  BatangPecahanSvg,
  DaduSvg,
  KoinSvg,
  KubusSvg,
  LabelSvg,
  PizzaSvg,
  RasioBatangSvg,
  RodaSvg,
  SkalaPeluangSvg,
  HIJAU,
  MERAH,
} from "./video-visual-kit";
import { BIRU } from "./CeritaBandingB";

/** Koreografi visual video Story Kelas 6 (k6b1a … k6b4b). */
export function visualK6(kode: string, v: number, a: number, k: number): React.ReactNode {
  const bab = kode.slice(0, 4);
  const sub = kode.slice(4);

  if (bab === "k6b1") {
    if (sub === "a") {
      // perkalian pecahan: area
      return (
        <>
          <PizzaSvg x={100} y={100} q={3} p={2} r={42} k={k} />
          {k >= 2 ? (
            <Muncul>
              <LabelSvg x={170} y={90} w={90} teks="× 1/2" ukuran={14} />
            </Muncul>
          ) : null}
          {k >= 3 ? <LabelSvg x={100} y={160} w={100} teks="2/6 = 1/3" ukuran={13} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "b") {
      return (
        <>
          <BatangPecahanSvg q={4} p={3} k={k} />
          {k >= 2 ? <LabelSvg x={90} y={155} w={120} teks="bagi = × kebalikan" ukuran={11} /> : null}
        </>
      );
    }
    // desimal
    return (
      <>
        <BatangPecahanSvg q={10} p={3} k={Math.min(k, 9)} w={200} x={50} />
        {k >= 2 ? (
          <Muncul>
            <LabelSvg x={100} y={155} w={100} teks="0,3 = 3/10" ukuran={13} warna={HIJAU} />
          </Muncul>
        ) : null}
      </>
    );
  }

  if (bab === "k6b2") {
    if (v === 0 || sub === "a") return <RasioBatangSvg a={2} b={3} k={k} />;
    if (v === 1 || sub === "b") {
      return (
        <>
          <RasioBatangSvg a={2} b={3} k={Math.min(2, k)} />
          {k >= 2 ? (
            <Muncul>
              <text x="150" y="50" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
                2:3 = 4:6
              </text>
            </Muncul>
          ) : null}
        </>
      );
    }
    return (
      <>
        <RasioBatangSvg a={3} b={5} k={k} />
        {k >= 3 ? <LabelSvg x={85} y={40} w={130} teks="terapkan rasio" ukuran={12} /> : null}
      </>
    );
  }

  if (bab === "k6b3") {
    if (sub === "a") return <KubusSvg k={k} balok={a >= 1} />;
    if (sub === "b") {
      // denah / visualisasi: tampak atas kotak-kotak
      return (
        <>
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) =>
              r * 4 + c <= k + 2 ? (
                <rect key={`${r}-${c}`} x={70 + c * 40} y={50 + r * 40} width={36} height={36} rx="4" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />
              ) : null,
            ),
          )}
          {k >= 3 ? <LabelSvg x={95} y={175} w={110} teks="tampak atas" ukuran={12} /> : null}
        </>
      );
    }
    // jalur
    return (
      <>
        <rect x="40" y="50" width="220" height="120" fill="#ECFDF5" stroke={BIRU} strokeWidth="2" rx="8" />
        <circle cx="70" cy="90" r="10" fill={k >= 0 ? "#F0AB00" : "#94A3B8"} stroke={BIRU} strokeWidth="2" />
        {k >= 1 ? <polyline points="70,90 150,90 150,140 230,140" fill="none" stroke={BIRU} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /> : null}
        {k >= 2 ? <circle cx="230" cy="140" r="10" fill="#86EFAC" stroke={BIRU} strokeWidth="2" className="vc-denyut" /> : null}
        {k >= 3 ? <LabelSvg x={95} y={175} w={110} teks="jalur terpendek" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k6b4") {
    if (sub === "a") {
      if (v === 0) return <SkalaPeluangSvg k={k} aktif={2} />;
      if (v === 1) {
        return (
          <>
            {a === 0 ? <KoinSvg k={k} /> : null}
            {a === 1 ? <DaduSvg k={k} sisi={6} /> : null}
            {a >= 2 ? <RodaSvg k={k} /> : null}
          </>
        );
      }
      return (
        <>
          <RodaSvg k={k} />
          {k >= 2 ? (
            <Muncul>
              <LabelSvg x={95} y={40} w={110} teks="prediksi → catat" ukuran={11} />
            </Muncul>
          ) : null}
        </>
      );
    }
    // sub b: banding peluang
    if (v === 0) {
      return (
        <>
          <KoinSvg x={90} y={95} k={k} sisi="A" />
          <DaduSvg x={180} y={65} k={k} sisi={6} />
          {k >= 2 ? (
            <Muncul>
              <text x="150" y="175" textAnchor="middle" fontSize="14" fontWeight="900" fill={HIJAU}>
                1/2 &gt; 1/6
              </text>
            </Muncul>
          ) : null}
        </>
      );
    }
    if (v === 1) {
      return (
        <>
          <SkalaPeluangSvg k={Math.min(4, k)} aktif={k >= 2 ? 1 : 3} />
          {k >= 3 ? (
            <Muncul>
              <LabelSvg x={80} y={40} w={140} teks={k >= 3 ? "adil vs kurang adil" : ""} ukuran={11} warna={MERAH} />
            </Muncul>
          ) : null}
        </>
      );
    }
    return (
      <>
        {/* kantong bola: 4 biru vs 3 merah */}
        {Array.from({ length: 4 }, (_, i) =>
          i <= k ? <circle key={`b${i}`} cx={70 + i * 28} cy={100} r="14" fill="#38BDF8" stroke={BIRU} strokeWidth="2" /> : null,
        )}
        {Array.from({ length: 3 }, (_, i) =>
          k >= 1 && i <= k - 1 ? <circle key={`r${i}`} cx={70 + i * 28} cy={140} r="14" fill="#F87171" stroke={BIRU} strokeWidth="2" /> : null,
        )}
        {k >= 2 ? (
          <Muncul>
            <text x="200" y="120" fontSize="16" fontWeight="900" fill={HIJAU}>
              4/7 &gt; 3/7
            </text>
          </Muncul>
        ) : null}
        {k >= 3 ? <LabelSvg x={85} y={165} w={130} teks="besar ≠ pasti" ukuran={12} /> : null}
      </>
    );
  }

  return <SkalaPeluangSvg k={k} />;
}
