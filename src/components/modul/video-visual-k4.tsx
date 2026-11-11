"use client";

import React from "react";
import { Muncul } from "./video-cerita";
import {
  BandingSvg,
  BangunKeliling,
  BangunLuas,
  BatangDataSvg,
  BatangPecahanSvg,
  DeretSvg,
  GarisBilanganSvg,
  LabelSvg,
  PapanDigit,
  PiktogramSvg,
  PizzaSvg,
  PolaBentukSvg,
  SusunSvg,
  VolumePetakSvg,
  HIJAU,
} from "./video-visual-kit";
import { BIRU as B } from "./CeritaBandingB";

/** Koreografi visual video Story Kelas 4 (k4b1a … k4b6b). */
export function visualK4(kode: string, v: number, a: number, k: number): React.ReactNode {
  const bab = kode.slice(0, 4); // k4b1
  const sub = kode.slice(4); // a, b, ...

  if (bab === "k4b1") {
    if (sub === "a" || sub === "b") {
      const digit = sub === "a" ? "3286" : "2150";
      return (
        <>
          <PapanDigit digits={digit} nyala={k + 1} x={sub === "a" ? 54 : 54} />
          {k >= 2 ? <LabelSvg x={70} y={140} w={160} teks="nilai tempat" ukuran={12} /> : null}
          {k >= 3 ? (
            <Muncul>
              <LabelSvg x={80} y={168} w={140} teks={sub === "a" ? "baca dari kiri" : "digit ≠ nilai"} ukuran={11} warna={HIJAU} />
            </Muncul>
          ) : null}
        </>
      );
    }
    if (sub === "c") return <BandingSvg a={8750} b={7500} k={k} />;
    if (sub === "d") {
      return (
        <>
          <PapanDigit digits="6348" nyala={Math.min(4, k + 1)} />
          {k >= 2 ? <LabelSvg x={70} y={145} w={160} teks="komposisi / urai" ukuran={12} /> : null}
        </>
      );
    }
    if (sub === "e" || sub === "f") return <SusunSvg atas={189} bawah={245} hasil={434} op="+" k={k} />;
    if (sub === "g" || sub === "h") return <SusunSvg atas={452} bawah={178} hasil={274} op="−" k={k} />;
    return (
      <>
        <GarisBilanganSvg dari={0} sampai={10} sorot={k >= 1 ? [3, 7] : [0]} panah={k >= 2 ? [3, 7] : null} />
        {k >= 3 ? <LabelSvg x={90} y={155} w={120} teks="cerita bilangan" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k4b2") {
    if (v === 0) return <PizzaSvg q={4} p={1} k={k} />;
    if (v === 1) return <BatangPecahanSvg q={4} p={3} k={k} />;
    return (
      <>
        <PizzaSvg x={90} y={100} q={2} p={1} r={40} k={k} />
        <PizzaSvg x={210} y={100} q={4} p={1} r={40} k={k} />
        {k >= 2 ? <LabelSvg x={95} y={160} w={110} teks="1/2 > 1/4" ukuran={13} warna={HIJAU} /> : null}
      </>
    );
  }

  if (bab === "k4b3") {
    if (a === 0) return <PolaBentukSvg k={k} />;
    return <DeretSvg isi={[2, 4, 6, 8, 10]} k={k} judul="pola +2" />;
  }

  if (bab === "k4b4") {
    if (sub === "a" || v === 0) return <BangunLuas kolom={4} baris={3} nyala={(k + 1) * 3} />;
    return <VolumePetakSvg k={k} p={3} l={2} t={2} />;
  }

  if (bab === "k4b5") {
    if (k <= 1) return <BangunKeliling w={100} h={100} k={k} sisi={[1, 1, 1, 1]} label={false} />;
    return (
      <>
        <BangunKeliling x={40} y={60} w={80} h={80} k={Math.min(4, k)} sisi={[3, 3, 3, 3]} />
        {k >= 2 ? (
          <g transform="translate(160 40)">
            <polygon points="50,10 10,90 90,90" fill="#FEF3C7" stroke={B} strokeWidth="3" />
            {k >= 3 ? <LabelSvg x={15} y={100} w={70} teks="3 sisi" ukuran={12} /> : null}
          </g>
        ) : null}
      </>
    );
  }

  if (bab === "k4b6") {
    if (sub === "a" || v === 0) return <PiktogramSvg k={k} baris={[2, 4, 3]} e="🍎" />;
    return <BatangDataSvg k={k} data={[{ n: 4, label: "Sen" }, { n: 6, label: "Sel" }, { n: 3, label: "Rab" }]} />;
  }

  return (
    <Muncul>
      <LabelSvg x={80} y={100} w={140} teks={kode.toUpperCase()} ukuran={14} />
    </Muncul>
  );
}
