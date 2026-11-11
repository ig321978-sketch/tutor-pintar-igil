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
  LabelSvg,
  PapanDigit,
  PiktogramSvg,
  PizzaSvg,
  SegitigaKeliling,
  SudutSvg,
  SusunSvg,
  progresDari,
  nyalaDariWaktu,
  nyalaSeirama,
  HIJAU,
  MERAH,
  ORANYE,
} from "./video-visual-kit";
import { visualK5B4 } from "./video-visual-k5b4";

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

  if (bab === "k5b3") {
    if (v === 0) {
      const n = nyalaDariWaktu(t, 4, 1.3);
      return (
        <>
          <PizzaSvg x={90} y={100} q={4} p={1} r={38} k={Math.max(0, n - 1)} />
          <PizzaSvg x={210} y={100} q={8} p={3} r={38} k={k >= 1 ? Math.max(0, nyalaDariWaktu(t, 8, 0.9) - 1) : -1} />
          {k >= 2 || p > 0.65 ? <LabelSvg x={95} y={160} w={110} teks="banding pecahan" ukuran={11} /> : null}
          {k >= 3 ? <LabelSvg x={100} y={40} w={100} teks="1/4 vs 3/8" ukuran={12} warna={HIJAU} /> : null}
        </>
      );
    }
    if (v === 1) {
      return (
        <>
          <BatangPecahanSvg q={6} p={5} k={nyalaSeirama(k, t, 6, 1.1) - 1} />
          {k >= 2 ? <LabelSvg x={90} y={155} w={120} teks={a === 0 ? "bagian hampir penuh" : "5/6"} ukuran={12} warna={ORANYE} /> : null}
        </>
      );
    }
    return (
      <>
        <BatangPecahanSvg y={70} q={4} p={3} k={nyalaSeirama(k, t, 4, 1.2) - 1} />
        {k >= 2 ? <LabelSvg x={90} y={145} w={120} teks="sama penyebut" ukuran={12} warna={HIJAU} /> : null}
        {k >= 3 ? <LabelSvg x={95} y={170} w={110} teks="jumlah / kurang" ukuran={11} /> : null}
      </>
    );
  }

  if (bab === "k5b4") return visualK5B4(sub, v, a, k, t);

  if (bab === "k5b5") {
    if (v === 0 || sub === "a") {
      const total = 15;
      const nyala = k === 0 ? Math.max(1, Math.floor(p * 8)) : k === 1 ? Math.min(total, 8 + Math.floor(p * 7)) : total;
      return (
        <>
          <BangunLuas kolom={5} baris={3} nyala={nyala} />
          {k >= 2 ? <LabelSvg x={95} y={155} w={110} teks="luas = isi" ukuran={12} warna={HIJAU} /> : null}
          {k >= 3 ? <LabelSvg x={100} y={40} w={100} teks="bukan keliling" ukuran={11} warna={MERAH} /> : null}
        </>
      );
    }
    if (sub === "b") {
      const nyala = k >= 2 ? 24 : Math.min(24, (k + 1) * 6 + Math.floor(p * 6));
      return (
        <>
          <BangunLuas kolom={6} baris={4} nyala={nyala} ukuran={18} x={70} y={45} />
          {k >= 2 || p > 0.7 ? <LabelSvg x={95} y={160} w={110} teks="p × l" ukuran={14} warna={HIJAU} /> : null}
        </>
      );
    }
    return (
      <>
        <BangunLuas kolom={4} baris={3} nyala={Math.min(12, k >= 1 ? 12 : Math.floor(p * 12))} x={40} y={50} ukuran={20} />
        <BangunLuas kolom={3} baris={2} nyala={k >= 2 ? 6 : k >= 1 ? Math.floor(p * 6) : 0} x={160} y={70} ukuran={20} />
        {k >= 3 ? <LabelSvg x={90} y={160} w={120} teks="luas gabungan" ukuran={12} /> : null}
      </>
    );
  }

  if (bab === "k5b6") {
    const deg = sub === "a" ? 90 : sub === "c" ? 50 : sub === "d" ? 60 : 45;
    const tahap = Math.min(3, k + (p > 0.45 ? 1 : 0));
    return (
      <>
        <SudutSvg deg={deg} k={tahap} />
        {k >= 2 ? (
          <LabelSvg x={40} y={40} w={120} teks={deg === 90 ? "siku-siku" : deg > 90 ? "tumpul" : "lancip"} ukuran={12} warna={ORANYE} />
        ) : null}
      </>
    );
  }

  if (bab === "k5b7") {
    if (sub === "a") {
      // Video A: klasifikasi sudut & sisi — bentuk harus cocok teks
      if (v === 0) {
        if (k <= 1) return <SegitigaKeliling sisi={[5, 5, 5]} tandaSama jalan={k === 0 ? p : 1} tampilJumlah={false} />;
        if (k === 2) {
          const ganti = p < 0.5;
          return (
            <>
              <SegitigaKeliling sisi={ganti ? [5, 5, 5] : [6, 6, 4]} tandaSama jalan={1} tampilJumlah={false} />
              <LabelSvg x={80} y={175} w={140} teks={ganti ? "sama sisi?" : "sama kaki?"} ukuran={12} warna={HIJAU} />
            </>
          );
        }
        return <SegitigaKeliling sisi={[5, 4, 6]} jalan={1} tampilJumlah={false} />;
      }
      if (v === 1) {
        // lancip → siku → tumpul
        if (k <= 1) return <SegitigaKeliling sisi={[6, 5, 4]} jalan={progresDari(t, 5)} tampilJumlah={false} />;
        if (k === 2) return <SegitigaKeliling sisi={[3, 4, 5]} jalan={1} tampilJumlah={false} tandaSiku />;
        return (
          <>
            <SegitigaKeliling sisi={[2, 5, 6]} jalan={1} tampilJumlah={false} />
            <LabelSvg x={80} y={175} w={140} teks="tumpul" ukuran={12} warna={ORANYE} />
          </>
        );
      }
      // v2: sama kaki / sama sisi / sembarang / hierarki
      if (k === 0) return <SegitigaKeliling sisi={[6, 6, 4]} tandaSama jalan={p} tampilJumlah={false} />;
      if (k === 1) return <SegitigaKeliling sisi={[5, 5, 5]} tandaSama jalan={1} tampilJumlah={false} />;
      if (k === 2) {
        return (
          <>
            <SegitigaKeliling sisi={[6, 5, 4]} jalan={1} tampilJumlah={false} />
            <LabelSvg x={80} y={175} w={140} teks="sembarang" ukuran={12} />
          </>
        );
      }
      return (
        <>
          <SegitigaKeliling sisi={[5, 5, 5]} tandaSama jalan={1} tampilJumlah={false} />
          <LabelSvg x={70} y={40} w={160} teks="sama sisi ⊂ sama kaki" ukuran={11} warna={HIJAU} />
        </>
      );
    }
    return (
      <>
        <BangunKeliling sisi={[4, 6, 4, 6]} w={140} h={70} x={80} y={50} jalan={k === 0 ? p : k >= 2 ? 1 : progresDari(t, 5.5)} tampilJumlah={k >= 2} />
        {k >= 3 ? <LabelSvg x={90} y={160} w={120} teks="segi empat" ukuran={12} /> : null}
      </>
    );
  }

  if (bab === "k5b8") {
    if (sub === "a") {
      return (
        <>
          <PiktogramSvg k={nyalaSeirama(k, t, 3, 1.4) - 1} e="👤" baris={[3, 5, 4]} label={["Merah", "Biru", "Hijau"]} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="baca piktogram" ukuran={11} /> : null}
        </>
      );
    }
    if (sub === "b") {
      return (
        <>
          <PiktogramSvg k={nyalaSeirama(k, t, 3, 1.4) - 1} e="🚗" baris={[2, 6, 3]} label={["Sen", "Sel", "Rab"]} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="1 ikon = banyak" ukuran={11} /> : null}
        </>
      );
    }
    return (
      <>
        <BatangDataSvg
          k={nyalaSeirama(k, t, 4, 1.3) - 1}
          data={[
            { n: 5, label: "A" },
            { n: 8, label: "B" },
            { n: 3, label: "C" },
            { n: 6, label: "D" },
          ]}
        />
        {k >= 2 ? <LabelSvg x={90} y={40} w={120} teks="banding batang" ukuran={12} warna={HIJAU} /> : null}
      </>
    );
  }

  if (bab === "k5b9") {
    if (sub === "a") {
      return (
        <>
          <PapanDigit digits="908070" nyala={nyalaSeirama(k, t, 6, 1.1)} lebar={34} x={35} />
          {k >= 2 ? <LabelSvg x={70} y={145} w={160} teks="ratus ribuan" ukuran={12} /> : null}
        </>
      );
    }
    if (sub === "b") {
      return (
        <>
          <BandingSvg a={120500} b={119999} k={Math.min(3, k + (p > 0.5 ? 1 : 0))} />
          {k >= 2 ? <LabelSvg x={90} y={165} w={120} teks="dekat tapi beda" ukuran={11} warna={ORANYE} /> : null}
        </>
      );
    }
    return (
      <>
        <PapanDigit digits="450000" nyala={nyalaSeirama(k, t, 6, 1.1)} lebar={34} x={35} />
        {k >= 2 || p > 0.5 ? <LabelSvg x={70} y={145} w={160} teks="urai nilai tempat" ukuran={11} /> : null}
        {k >= 3 ? (
          <Muncul>
            <text x="150" y="180" textAnchor="middle" fontSize="13" fontWeight="900" fill={HIJAU}>
              4×100.000 + 5×10.000
            </text>
          </Muncul>
        ) : null}
      </>
    );
  }

  return <PizzaSvg k={Math.max(0, nyalaDariWaktu(t, 4, 1.2) - 1)} q={4} p={1} />;
}
