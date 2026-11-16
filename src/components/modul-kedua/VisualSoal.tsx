"use client";

import { useState } from "react";
import type { VisualSoal } from "@/lib/modul-kedua/tipe";
import { useSeretan } from "./useSeretan";

const KOTAK = "rounded-3xl border-4 border-sky-300 bg-sky-50 p-3";

function Benda({ emoji, jumlah, bisaKetuk, kosong }: { emoji: string; jumlah: number; bisaKetuk?: boolean; kosong?: boolean }) {
  const [ketuk, setKetuk] = useState<number[]>([]);
  const urutan = (i: number) => ketuk.indexOf(i) + 1;
  return (
    <div className={KOTAK}>
      <div className="flex min-h-24 flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-amber-400 bg-amber-50 p-2">
        {kosong || jumlah === 0 ? <span className="text-sm font-bold text-amber-800">🧺 keranjang kosong</span> : null}
        {Array.from({ length: jumlah }, (_, i) => (
          <button
            key={i}
            type="button"
            disabled={!bisaKetuk}
            onClick={() => setKetuk((k) => (k.includes(i) ? k : [...k, i]))}
            aria-label={`benda ${i + 1}`}
            className="relative h-14 w-14 rounded-2xl bg-white text-3xl shadow disabled:cursor-default"
          >
            {emoji}
            {urutan(i) > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                {urutan(i)}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      {bisaKetuk && jumlah > 0 ? (
        <p className="mt-2 text-center text-sm font-bold text-sky-900">
          {ketuk.length === 0 ? "Ketuk tiap benda untuk menghitung." : `Sudah kamu hitung: ${ketuk.length}`}
        </p>
      ) : null}
    </div>
  );
}

export function Turus({ jumlah }: { jumlah: number }) {
  const kelompok = Math.ceil(jumlah / 5);
  const lebar = Math.max(1, kelompok) * 64;
  return (
    <svg viewBox={`0 0 ${lebar} 70`} className="mx-auto h-24 w-full max-w-xs" role="img" aria-label={`turus ${jumlah}`}>
      {Array.from({ length: kelompok }, (_, g) => {
        const isi = Math.min(5, jumlah - g * 5);
        const x0 = g * 64 + 8;
        return (
          <g key={g} stroke="#1e1b4b" strokeWidth="5" strokeLinecap="round">
            {Array.from({ length: Math.min(4, isi) }, (_, i) => (
              <line key={i} x1={x0 + i * 11} y1="10" x2={x0 + i * 11} y2="60" />
            ))}
            {isi === 5 ? <line x1={x0 - 4} y1="52" x2={x0 + 44} y2="16" stroke="#dc2626" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

export function KotakSepuluh({ jumlah }: { jumlah: number }) {
  return (
    <svg viewBox="0 0 270 110" className="mx-auto h-28 w-full max-w-xs" role="img" aria-label={`kotak sepuluh berisi ${jumlah}`}>
      {Array.from({ length: 10 }, (_, i) => {
        const x = (i % 5) * 52 + 6;
        const y = Math.floor(i / 5) * 52 + 4;
        return (
          <g key={i}>
            <rect x={x} y={y} width="48" height="48" rx="8" fill="#fff" stroke="#1e1b4b" strokeWidth="3" />
            {i < jumlah ? <circle cx={x + 24} cy={y + 24} r="16" fill="#f97316" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

export function GarisBilangan({ titik, dari, sampai, sembunyi }: { titik?: number; dari: number; sampai: number; sembunyi?: boolean }) {
  const n = sampai - dari;
  const x = (v: number) => 20 + ((v - dari) / n) * 300;
  return (
    <svg viewBox="0 0 340 90" className="mx-auto h-28 w-full max-w-sm" role="img" aria-label="garis bilangan">
      <line x1="14" y1="48" x2="326" y2="48" stroke="#1e1b4b" strokeWidth="4" strokeLinecap="round" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = dari + i;
        const tutup = sembunyi && v === titik;
        return (
          <g key={v}>
            <line x1={x(v)} y1="40" x2={x(v)} y2="56" stroke="#1e1b4b" strokeWidth="3" />
            <text x={x(v)} y="76" textAnchor="middle" fontSize="16" fontWeight="800" fill={tutup ? "#dc2626" : "#1e1b4b"}>
              {tutup ? "?" : v}
            </text>
          </g>
        );
      })}
      {titik !== undefined ? (
        <g>
          <polygon points={`${x(titik)},38 ${x(titik) - 9},14 ${x(titik) + 9},14`} fill="#dc2626" />
          <line x1={x(titik)} y1="14" x2={x(titik)} y2="4" stroke="#dc2626" strokeWidth="4" />
        </g>
      ) : null}
    </svg>
  );
}

function Piktogram({ baris }: { baris: { label: string; emoji: string; jumlah: number }[] }) {
  return (
    <div className={KOTAK}>
      {baris.map((b) => (
        <div key={b.label} className="flex items-center gap-2 border-b-2 border-sky-200 py-1 last:border-0">
          <span className="w-10 text-center text-3xl">{b.label}</span>
          <div className="flex flex-wrap gap-1 text-2xl">
            {Array.from({ length: b.jumlah }, (_, i) => (
              <span key={i}>{b.emoji}</span>
            ))}
          </div>
        </div>
      ))}
      <p className="mt-1 text-center text-xs font-bold text-sky-900">Satu gambar = satu benda</p>
    </div>
  );
}

function Kelompok({ k }: { k: { emoji: string; jumlah: number } }) {
  return (
    <div className="flex min-h-20 flex-1 flex-wrap content-center items-center justify-center gap-1 rounded-2xl border-4 border-dashed border-amber-400 bg-amber-50 p-2 text-2xl">
      {Array.from({ length: k.jumlah }, (_, i) => (
        <span key={i}>{k.emoji}</span>
      ))}
    </div>
  );
}

function DuaKelompok({ a, b }: { a: { emoji: string; jumlah: number }; b: { emoji: string; jumlah: number } }) {
  return (
    <div className={KOTAK}>
      <div className="flex gap-2">
        <Kelompok k={a} />
        <Kelompok k={b} />
      </div>
    </div>
  );
}

function Urutan({ deret }: { deret: (number | null)[] }) {
  return (
    <div className="flex justify-center gap-2">
      {deret.map((d, i) => (
        <div
          key={i}
          className={`flex h-14 w-12 items-center justify-center rounded-2xl border-4 text-2xl font-black ${d === null ? "border-dashed border-rose-500 bg-rose-50 text-rose-600" : "border-indigo-900 bg-white text-indigo-950"}`}
        >
          {d === null ? "?" : d}
        </div>
      ))}
    </div>
  );
}

function IsiKeranjang({ emoji, sediaan, target, saatUbah }: { emoji: string; sediaan: number; target: number; saatUbah: (n: number) => void }) {
  const [dalam, setDalam] = useState<boolean[]>(() => Array.from({ length: sediaan }, () => false));
  const pindah = (i: number, ke?: boolean) => {
    const baru = dalam.map((v, j) => (j === i ? (ke ?? !v) : v));
    setDalam(baru);
    saatUbah(baru.filter(Boolean).length);
  };
  const { ikat, bayangan } = useSeretan({
    saatLepas: (id, tujuan) => pindah(Number(id), tujuan === "keranjang"),
    saatKetuk: (id) => pindah(Number(id)),
  });
  const jumlah = dalam.filter(Boolean).length;
  return (
    <div className={KOTAK}>
      <p className="mb-1 text-center text-xs font-bold text-sky-900">Seret benda ke keranjang. Ketuk juga boleh. (Targetmu: {target})</p>
      <div data-target="meja" className="flex min-h-16 flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2">
        {dalam.map((d, i) =>
          d ? null : (
            <div key={i} {...ikat(String(i), emoji)} className="flex h-14 w-14 select-none items-center justify-center rounded-2xl bg-sky-100 text-3xl shadow">
              {emoji}
            </div>
          ),
        )}
      </div>
      <div data-target="keranjang" className="mt-2 flex min-h-24 flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-amber-500 bg-amber-50 p-2">
        {jumlah === 0 ? <span className="text-sm font-bold text-amber-800">🧺 Lepas benda di sini</span> : null}
        {dalam.map((d, i) =>
          d ? (
            <div key={i} {...ikat(String(i), emoji)} className="flex h-14 w-14 select-none items-center justify-center rounded-2xl bg-white text-3xl shadow">
              {emoji}
            </div>
          ) : null,
        )}
      </div>
      <p className="mt-1 text-center text-lg font-black text-indigo-950">Isi keranjang: {jumlah}</p>
      {bayangan}
    </div>
  );
}

export default function VisualSoalView({ visual, saatKeranjang }: { visual: VisualSoal; saatKeranjang?: (n: number) => void }) {
  switch (visual.jenis) {
    case "benda":
      return <Benda emoji={visual.emoji} jumlah={visual.jumlah} bisaKetuk={visual.bisaKetuk} kosong={visual.kotakKosong} />;
    case "dua-kelompok":
      return <DuaKelompok a={visual.a} b={visual.b} />;
    case "turus":
      return <div className={KOTAK}><Turus jumlah={visual.jumlah} /></div>;
    case "kotak-sepuluh":
      return <div className={KOTAK}><KotakSepuluh jumlah={visual.jumlah} /></div>;
    case "garis-bilangan":
      return <div className={KOTAK}><GarisBilangan titik={visual.titik} dari={visual.dari} sampai={visual.sampai} sembunyi={visual.sembunyi} /></div>;
    case "piktogram":
      return <Piktogram baris={visual.baris} />;
    case "angka-besar":
      return <div className="py-2 text-center text-8xl font-black text-indigo-950">{visual.teks}</div>;
    case "urutan":
      return <Urutan deret={visual.deret} />;
    case "isi-keranjang":
      return <IsiKeranjang emoji={visual.emoji} sediaan={visual.sediaan} target={visual.target} saatUbah={saatKeranjang ?? (() => {})} />;
    default:
      return null;
  }
}
