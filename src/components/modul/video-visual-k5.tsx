"use client";

import React from "react";
import { Muncul, Lompat } from "./video-cerita";
import {
  BandingSvg,
  BangunKeliling,
  BangunLuas,
  BatangDataSvg,
  BatangPecahanSvg,
  DeretSvg,
  LabelSvg,
  PapanDigit,
  PiktogramSvg,
  PizzaSvg,
  SegitigaKeliling,
  SudutSvg,
  SusunSvg,
  HIJAU,
  MERAH,
} from "./video-visual-kit";
import { BIRU } from "./CeritaBandingB";

/** Koreografi visual video Story Kelas 5 (k5b1a … k5b9c). */
export function visualK5(kode: string, v: number, a: number, k: number): React.ReactNode {
  const bab = kode.slice(0, 4);
  const sub = kode.slice(4);

  if (bab === "k5b1") {
    if (sub === "a") return <PapanDigit digits="75201" nyala={Math.min(5, k + 1)} lebar={38} x={40} />;
    if (sub === "b") return <BandingSvg a={95210} b={89500} k={k} />;
    if (sub === "c") {
      return (
        <>
          <PapanDigit digits="60035" nyala={Math.min(5, k + 1)} lebar={38} x={40} />
          {k >= 2 ? <LabelSvg x={70} y={145} w={160} teks="nol menjaga tempat" ukuran={11} /> : null}
        </>
      );
    }
    return <SusunSvg atas={12580} bawah={3460} hasil={16040} op="+" k={k} />;
  }

  if (bab === "k5b2") {
    if (sub === "a") return <DeretSvg isi={[4, 8, 12, 16, 20]} k={k} judul="kelipatan 4" />;
    if (sub === "b") return <DeretSvg isi={[6, 12, 18, 24]} k={k} judul="KPK lewat daftar" />;
    if (sub === "c") return <DeretSvg isi={[1, 2, 3, 6, 9, 18]} k={k} judul="faktor 18" />;
    if (sub === "d") return <DeretSvg isi={[1, 2, 4]} k={k} judul="FPB 12 & 20" />;
    return <DeretSvg isi={[2, 2, 3, 5]} k={k} judul="faktor prima" />;
  }

  if (bab === "k5b3") {
    if (v === 0) {
      return (
        <>
          <PizzaSvg x={90} y={100} q={4} p={1} r={38} k={k} />
          <PizzaSvg x={210} y={100} q={8} p={3} r={38} k={k} />
          {k >= 2 ? <LabelSvg x={95} y={160} w={110} teks="banding pecahan" ukuran={11} /> : null}
        </>
      );
    }
    if (v === 1) return <BatangPecahanSvg q={6} p={5} k={k} />;
    return (
      <>
        <BatangPecahanSvg y={70} q={4} p={3} k={k} />
        {k >= 2 ? <LabelSvg x={90} y={145} w={120} teks="sama penyebut" ukuran={12} warna={HIJAU} /> : null}
      </>
    );
  }

  /* ---- K5B4 Keliling: fokus visual, bukan teks ---- */
  if (bab === "k5b4") {
    if (sub === "a") {
      // Konsep keliling: jalur mengelilingi
      if (v === 0) {
        return (
          <>
            <BangunKeliling k={k} sisi={[4, 4, 4, 4]} w={110} h={110} x={95} y={45} />
            {k >= 1 && k < 4 ? (
              <Muncul>
                <LabelSvg x={95} y={165} w={110} teks="bukan luas" ukuran={12} warna={MERAH} />
              </Muncul>
            ) : null}
          </>
        );
      }
      if (v === 1) {
        // Baluwarti / pagar / bingkai
        return (
          <>
            <BangunKeliling k={Math.min(4, k + 1)} sisi={[8, 5, 8, 5]} w={130} h={70} x={85} y={55} />
            {k >= 2 ? (
              <Lompat>
                <text x="150" y="175" textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
                  {a === 0 ? "benteng" : a === 1 ? "pagar" : "bingkai"}
                </text>
              </Lompat>
            ) : null}
          </>
        );
      }
      return (
        <>
          <BangunKeliling k={k} sisi={[6, 4, 6, 4]} w={140} h={70} x={80} y={50} />
          {k >= 3 ? (
            <Muncul>
              <LabelSvg x={95} y={165} w={110} teks="6+4+6+4=20" ukuran={13} warna={HIJAU} />
            </Muncul>
          ) : null}
        </>
      );
    }
    if (sub === "b") {
      // Segitiga
      return <SegitigaKeliling k={k} sisi={[5, 4, 7]} />;
    }
    if (sub === "c") {
      return <BangunKeliling k={k} sisi={[7, 3, 7, 3]} w={150} h={65} x={75} y={55} />;
    }
    if (sub === "d") {
      // Segi banyak: segi lima sederhana
      const pts = "150,45 210,85 190,150 110,150 90,85";
      return (
        <>
          <polygon points={pts} fill="#DBEAFE" stroke={BIRU} strokeWidth="3" opacity={0.5} />
          {k >= 0 ? <polyline points="150,45 210,85" fill="none" stroke={k === 0 ? "#F0AB00" : BIRU} strokeWidth="4" /> : null}
          {k >= 1 ? <polyline points="210,85 190,150" fill="none" stroke={k === 1 ? "#F0AB00" : BIRU} strokeWidth="4" /> : null}
          {k >= 2 ? <polyline points="190,150 110,150 90,85 150,45" fill="none" stroke={BIRU} strokeWidth="4" /> : null}
          {k >= 3 ? (
            <Muncul>
              <LabelSvg x={100} y={165} w={100} teks="jumlah sisi" ukuran={12} warna={HIJAU} />
            </Muncul>
          ) : null}
        </>
      );
    }
    // sub e: gabungan
    return (
      <>
        <BangunKeliling x={40} y={55} w={90} h={90} k={Math.min(4, k)} sisi={[3, 3, 3, 3]} />
        <BangunKeliling x={150} y={75} w={100} h={70} k={Math.min(4, k)} sisi={[5, 2, 5, 2]} />
        {k >= 3 ? <LabelSvg x={90} y={165} w={120} teks="batas luar saja" ukuran={11} /> : null}
      </>
    );
  }

  /* ---- K5B5 Luas ---- */
  if (bab === "k5b5") {
    if (v === 0 || sub === "a") return <BangunLuas kolom={5} baris={3} nyala={(k + 1) * 4} />;
    if (sub === "b") {
      return (
        <>
          <BangunLuas kolom={6} baris={4} nyala={k >= 2 ? 24 : (k + 1) * 6} ukuran={18} x={70} y={45} />
          {k >= 3 ? <LabelSvg x={95} y={160} w={110} teks="p × l" ukuran={14} warna={HIJAU} /> : null}
        </>
      );
    }
    return (
      <>
        <BangunLuas kolom={4} baris={3} nyala={12} x={40} y={50} ukuran={20} />
        <BangunLuas kolom={3} baris={2} nyala={k >= 2 ? 6 : 0} x={160} y={70} ukuran={20} />
        {k >= 3 ? <LabelSvg x={90} y={160} w={120} teks="luas gabungan" ukuran={12} /> : null}
      </>
    );
  }

  if (bab === "k5b6") {
    const deg = sub === "a" ? 90 : sub === "c" ? 50 : sub === "d" ? 60 : 45;
    return <SudutSvg deg={deg} k={k} />;
  }

  if (bab === "k5b7") {
    if (sub === "a") return <SegitigaKeliling k={k} sisi={[5, 5, 5]} />;
    return <BangunKeliling k={k} sisi={[4, 6, 4, 6]} w={140} h={70} x={80} y={50} />;
  }

  if (bab === "k5b8") {
    if (sub === "a") return <PiktogramSvg k={k} e="👤" baris={[3, 5, 4]} label={["Merah", "Biru", "Hijau"]} />;
    if (sub === "b") return <PiktogramSvg k={k} e="🚗" baris={[2, 6, 3]} label={["Sen", "Sel", "Rab"]} />;
    return <BatangDataSvg k={k} data={[{ n: 5, label: "A" }, { n: 8, label: "B" }, { n: 3, label: "C" }, { n: 6, label: "D" }]} />;
  }

  if (bab === "k5b9") {
    if (sub === "a") return <PapanDigit digits="908070" nyala={Math.min(6, k + 1)} lebar={34} x={35} />;
    if (sub === "b") return <BandingSvg a={120500} b={119999} k={k} />;
    return (
      <>
        <PapanDigit digits="450000" nyala={Math.min(6, k + 1)} lebar={34} x={35} />
        {k >= 2 ? <LabelSvg x={70} y={145} w={160} teks="urai nilai tempat" ukuran={11} /> : null}
      </>
    );
  }

  return <PizzaSvg k={k} q={4} p={1} />;
}
