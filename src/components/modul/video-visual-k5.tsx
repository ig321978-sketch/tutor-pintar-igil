"use client";

import React from "react";

import {
  BandingSvg,
  DeretSvg,
  LabelSvg,
  PapanDigit,
  PizzaSvg,
  SusunSvg,
  progresDari,
  nyalaDariWaktu,
  nyalaSeirama,
  HIJAU,
  MERAH,
} from "./video-visual-kit";

/** Koreografi visual Story Kelas 5 — seirama ketukan `k` + waktu suara `t`. */
export function visualK5(kode: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  const bab = kode.slice(0, 4);
  const sub = kode.slice(4);
  const p = progresDari(t);

  if (bab === "k5b1") {
    if (sub === "a") {
      const d = v === 0 ? "75201" : v === 1 ? "30846" : "99001";
      return (
        <>
          <PapanDigit digits={d} nyala={nyalaSeirama(k, t, d.length, 1.15)} lebar={38} x={40} />
          {k >= 1 ? <LabelSvg x={70} y={140} w={160} teks={k >= 2 ? "nilai tempat besar" : "baca dari kiri"} ukuran={11} /> : null}
          {k >= 3 ? <LabelSvg x={80} y={168} w={140} teks="puluh ribuan" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "b") {
      const pair = ([["95210", "89500"], ["120500", "119999"], ["88888", "90000"]] as const)[Math.min(2, v)];
      return (
        <>
          <BandingSvg a={Number(pair[0])} b={Number(pair[1])} k={Math.min(3, k + (p > 0.5 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="banding tempat" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "c") {
      return (
        <>
          <PapanDigit digits="60035" nyala={nyalaSeirama(k, t, 5, 1.2)} lebar={38} x={40} />
          {k >= 1 || p > 0.4 ? <LabelSvg x={70} y={145} w={160} teks="nol menjaga tempat" ukuran={11} /> : null}
          {k >= 3 ? <LabelSvg x={90} y={170} w={120} teks="jangan hilang" ukuran={12} warna={MERAH} /> : null}
        </>
      );
    }
    return (
      <>
        <SusunSvg atas={12580} bawah={3460} hasil={16040} op="+" k={Math.min(3, k + (p > 0.55 ? 1 : 0))} />
        {k >= 2 ? <LabelSvg x={95} y={165} w={110} teks="operasi besar" ukuran={11} warna={HIJAU} /> : null}
      </>
    );
  }

  if (bab === "k5b2") {
    const tabel: Record<string, { isi: number[]; judul: string }> = {
      a: { isi: [4, 8, 12, 16, 20], judul: "kelipatan 4" },
      b: { isi: [6, 12, 18, 24], judul: "KPK lewat daftar" },
      c: { isi: [1, 2, 3, 6, 9, 18], judul: "faktor 18" },
      d: { isi: [1, 2, 4], judul: "FPB 12 & 20" },
      e: { isi: [2, 2, 3, 5], judul: "faktor prima" },
    };
    const conf = tabel[sub] ?? tabel.e;
    return (
      <>
        <DeretSvg isi={conf.isi} k={nyalaSeirama(k, t, conf.isi.length, 1.25) - 1} judul={conf.judul} />
        {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks={a === 0 ? "daftar dulu" : "cari pola"} ukuran={11} warna={HIJAU} /> : null}
      </>
    );
  }

  return <PizzaSvg k={Math.max(0, nyalaDariWaktu(t, 4, 1.2) - 1)} q={4} p={1} />;
}
