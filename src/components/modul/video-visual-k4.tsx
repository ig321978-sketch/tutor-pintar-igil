"use client";

import React from "react";
import { Muncul } from "./video-cerita";
import {
  BandingSvg,
  BangunKeliling,
  BangunLuas,
  BatangPecahanSvg,
  DeretSvg,
  GarisBilanganSvg,
  LabelSvg,
  PapanDigit,
  PizzaSvg,
  PolaBentukSvg,
  SegitigaKeliling,
  SusunSvg,
  VolumePetakSvg,
  progresDari,
  nyalaDariWaktu,
  nyalaSeirama,
  HIJAU,
  MERAH,
} from "./video-visual-kit";

/** Koreografi visual Story Kelas 4 — seirama ketukan `k` + waktu suara `t`. */
export function visualK4(kode: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  const bab = kode.slice(0, 4);
  const sub = kode.slice(4);
  const p = progresDari(t);

  if (bab === "k4b1") {
    if (sub === "a" || sub === "b") {
      const digit = sub === "a" ? (v === 0 ? "3286" : v === 1 ? "7504" : "1093") : v === 0 ? "2150" : "4080";
      const n = k === 0 ? nyalaDariWaktu(t, digit.length, 1.3) : Math.min(digit.length, Math.max(k + 1, nyalaDariWaktu(t, digit.length, 1.2)));
      const label =
        k === 0 ? "baca digit" : k === 1 ? "nilai tempat" : k === 2 ? (sub === "a" ? "dari kiri" : "digit ≠ nilai") : "urai angka";
      return (
        <>
          <PapanDigit digits={digit} nyala={Math.max(1, n)} x={54} />
          {k >= 1 || p > 0.4 ? <LabelSvg x={70} y={140} w={160} teks={label} ukuran={12} /> : null}
          {k >= 3 ? (
            <Muncul>
              <LabelSvg x={80} y={168} w={140} teks={sub === "a" ? "ribuan→satuan" : "nol menjaga"} ukuran={11} warna={HIJAU} />
            </Muncul>
          ) : null}
        </>
      );
    }
    if (sub === "c") {
      const pairs = [
        [8750, 7500],
        [4321, 4312],
        [9999, 10000],
      ][Math.min(2, v)] as [number, number];
      return (
        <>
          <BandingSvg a={pairs[0]} b={pairs[1]} k={Math.min(3, k + (p > 0.5 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks={a === 0 ? "banding kiri" : "> < ="} ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "d") {
      const d = v === 0 ? "6348" : "5207";
      return (
        <>
          <PapanDigit digits={d} nyala={nyalaSeirama(k, t, d.length, 1.2)} />
          {k >= 1 ? <LabelSvg x={70} y={140} w={160} teks={k >= 2 ? "komposisi / urai" : "pecah nilai"} ukuran={12} /> : null}
          {k >= 3 ? <LabelSvg x={80} y={168} w={140} teks="jumlah bagian" ukuran={11} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "e" || sub === "f") {
      const ops = sub === "e" ? [189, 245, 434] : [356, 278, 634];
      return (
        <>
          <SusunSvg atas={ops[0]} bawah={ops[1]} hasil={ops[2]} op="+" k={Math.min(3, k + (p > 0.55 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={95} y={165} w={110} teks="jumlahkan" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    if (sub === "g" || sub === "h") {
      const ops = sub === "g" ? [452, 178, 274] : [800, 356, 444];
      return (
        <>
          <SusunSvg atas={ops[0]} bawah={ops[1]} hasil={ops[2]} op="−" k={Math.min(3, k + (p > 0.55 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={95} y={165} w={110} teks="kurangkan" ukuran={12} warna={MERAH} /> : null}
        </>
      );
    }
    return (
      <>
        <GarisBilanganSvg dari={0} sampai={10} sorot={k >= 1 ? [3, 7] : p > 0.3 ? [3] : [0]} panah={k >= 2 ? [3, 7] : null} />
        {k >= 2 || p > 0.7 ? <LabelSvg x={90} y={155} w={120} teks="cerita bilangan" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k4b2") {
    if (v === 0) {
      const q = a === 0 ? 4 : a === 1 ? 8 : 3;
      const pp = a === 0 ? 1 : a === 1 ? 3 : 2;
      const slices = k === 0 ? nyalaDariWaktu(t, q, 1.2) : Math.min(q, Math.max(k + 1, nyalaDariWaktu(t, q, 1.0)));
      return (
        <>
          <PizzaSvg q={q} p={pp} k={Math.max(0, slices - 1)} />
          {k >= 2 ? <LabelSvg x={100} y={170} w={100} teks={`${pp}/${q}`} ukuran={14} warna={HIJAU} /> : null}
        </>
      );
    }
    if (v === 1) {
      const q = a === 0 ? 4 : 6;
      const pp = a === 0 ? 3 : 5;
      return (
        <>
          <BatangPecahanSvg q={q} p={pp} k={nyalaSeirama(k, t, q, 1.1) - 1} />
          {k >= 2 ? <LabelSvg x={90} y={155} w={120} teks="bagian sama" ukuran={12} /> : null}
        </>
      );
    }
    return (
      <>
        <PizzaSvg x={90} y={100} q={2} p={1} r={40} k={Math.min(1, nyalaDariWaktu(t, 2, 1.5) - 1)} />
        <PizzaSvg x={210} y={100} q={4} p={1} r={40} k={k >= 1 ? Math.min(3, nyalaDariWaktu(t, 4, 1.2) - 1) : -1} />
        {k >= 2 || p > 0.6 ? <LabelSvg x={95} y={160} w={110} teks="1/2 > 1/4" ukuran={13} warna={HIJAU} /> : null}
      </>
    );
  }

  if (bab === "k4b3") {
    if (a === 0 || v === 0) {
      return (
        <>
          <PolaBentukSvg k={Math.min(3, k + (p > 0.4 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="pola bentuk" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    const deret = v === 1 ? [2, 4, 6, 8, 10] : [5, 10, 15, 20, 25];
    return (
      <>
        <DeretSvg isi={deret} k={nyalaSeirama(k, t, deret.length, 1.2) - 1} judul={v === 1 ? "pola +2" : "pola +5"} />
        {k >= 3 ? <LabelSvg x={90} y={165} w={120} teks="suku berikutnya" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k4b4") {
    if (sub === "a" || v === 0) {
      const kol = 4;
      const bar = 3;
      const total = kol * bar;
      const nyala = k === 0 ? Math.max(1, Math.floor(p * total)) : k === 1 ? Math.min(total, 6 + Math.floor(p * 6)) : total;
      return (
        <>
          <BangunLuas kolom={kol} baris={bar} nyala={nyala} />
          {k >= 2 ? <LabelSvg x={95} y={160} w={110} teks="luas = petak" ukuran={12} warna={HIJAU} /> : null}
          {k >= 3 ? <LabelSvg x={100} y={40} w={100} teks="4×3=12" ukuran={13} warna={MERAH} /> : null}
        </>
      );
    }
    return (
      <>
        <VolumePetakSvg k={Math.min(3, k + (p > 0.45 ? 1 : 0))} p={3} l={2} t={2} />
        {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="volume petak" ukuran={12} /> : null}
      </>
    );
  }

  if (bab === "k4b5") {
    if (k === 0) {
      return <BangunKeliling w={110} h={110} x={95} y={45} sisi={[1, 1, 1, 1]} label={false} tampilJumlah={false} outlineSaja jalan={p} />;
    }
    if (k === 1) {
      return (
        <>
          <BangunKeliling x={40} y={55} w={90} h={90} sisi={[3, 3, 3, 3]} jalan={progresDari(t, 6)} tampilJumlah={p > 0.9} />
          {p > 0.5 ? <LabelSvg x={40} y={165} w={90} teks="4 sisi" ukuran={12} /> : null}
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={30} y={55} w={80} h={80} jalan={1} sisi={[3, 3, 3, 3]} tampilJumlah={false} />
        <SegitigaKeliling sisi={[3, 4, 5]} jalan={progresDari(t, 5)} tampilJumlah={false} tandaSiku />
        {k >= 2 ? <LabelSvg x={90} y={40} w={120} teks="3 sisi · siku" ukuran={11} /> : null}
        {k >= 3 ? <LabelSvg x={80} y={40} w={140} teks="ciri bangun" ukuran={12} warna={HIJAU} /> : null}
      </>
    );
  }

  return (
    <Muncul>
      <LabelSvg x={80} y={100} w={140} teks={kode.toUpperCase()} ukuran={14} />
    </Muncul>
  );
}
