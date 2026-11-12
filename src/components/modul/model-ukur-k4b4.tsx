"use client";

import React from "react";

/**
 * Gambar model pengukuran Kelas 4 Bab 4: kisi sel polos (meja dan kertas berpetak), batang isi wadah,
 * lapisan kubus satuan (persegi polos per lapisan), dan gelas takar (batang bergaris). Hanya bentuk polos
 * berwarna, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.
 */
export const BIRU_UKUR = "#1C01A5";
export const EMAS_UKUR = "#FFE566";
export const JINGGA_UKUR = "#F0AB00";
const WARNA_UBIN = ["#FFE566", "#C7D2FE", "#FDBA74", "#A5F3FC"];

/** Kisi tombol sel. `isi[r][c]`: 0 kosong, angka lain = nomor ubin atau 1 = diarsir. */
export function KisiSel({
  isi,
  label,
  labelSel,
  onKetuk,
  ukuran = 40,
  warnaUbin = false,
}: {
  isi: number[][];
  label: string;
  labelSel: (r: number, c: number) => string;
  onKetuk: (r: number, c: number) => void;
  ukuran?: number;
  warnaUbin?: boolean;
}) {
  const kolom = isi[0]?.length ?? 0;
  return (
    <div className="mx-auto grid w-max gap-0 border-4 border-[#1C01A5] bg-white" style={{ gridTemplateColumns: `repeat(${kolom}, ${ukuran}px)` }} role="group" aria-label={label}>
      {isi.map((baris, r) =>
        baris.map((v, c) => {
          const warna = v === 0 ? "#FFFFFF" : warnaUbin ? WARNA_UBIN[(v - 1) % WARNA_UBIN.length] : BIRU_UKUR;
          // Garis tebal di batas antarubin agar dua ubin bersebelahan tetap terlihat terpisah.
          const tepi = (r2: number, c2: number) => (warnaUbin && v !== 0 && (isi[r2]?.[c2] ?? -1) !== v ? `3px solid ${BIRU_UKUR}` : undefined);
          return (
            <button
              key={`${r}-${c}`}
              type="button"
              aria-label={labelSel(r, c)}
              aria-pressed={v !== 0}
              onClick={() => onKetuk(r, c)}
              className="border border-dashed border-[#1C01A5]/40 text-[10px] font-black text-[#1C01A5]"
              style={{ width: ukuran, height: ukuran, background: warna, borderTop: tepi(r - 1, c), borderBottom: tepi(r + 1, c), borderLeft: tepi(r, c - 1), borderRight: tepi(r, c + 1) }}
            >
              {warnaUbin && v !== 0 ? v : ""}
            </button>
          );
        }),
      )}
    </div>
  );
}

/** Batang wadah tegak: `isi` dari `penuh`, dengan garis tiap `takar`. */
export function BatangWadah({ isi, penuh, takar, label }: { isi: number; penuh: number; takar: number; label: string }) {
  const tinggi = 200;
  const lebar = 90;
  const tiap = (takar / penuh) * tinggi;
  const banyak = Math.floor(isi / takar);
  return (
    <svg viewBox={`0 0 ${lebar + 4} ${tinggi + 4}`} width={lebar + 4} height={tinggi + 4} role="img" aria-label={label} className="shrink-0">
      <rect x={2} y={2} width={lebar} height={tinggi} rx={10} fill="#F5F3FF" stroke={BIRU_UKUR} strokeWidth={3} />
      {Array.from({ length: banyak }, (_, i) => (
        <rect key={i} x={6} y={2 + tinggi - (i + 1) * tiap + 1} width={lebar - 8} height={Math.max(1, tiap - 2)} rx={3} fill={i % 2 === 0 ? BIRU_UKUR : "#4F46E5"} />
      ))}
    </svg>
  );
}

/** Lapisan kubus satuan: tiap lapisan digambar sebagai kisi persegi polos, berderet. */
export function LapisanKubus({ baris, kolom, lapisan }: { baris: number; kolom: number; lapisan: number }) {
  const s = 18;
  return (
    <div className="flex flex-wrap items-end justify-center gap-3" role="group" aria-label={`${lapisan} lapisan, tiap lapisan ${baris} baris berisi ${kolom} kubus`}>
      {Array.from({ length: lapisan }, (_, l) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <svg viewBox={`0 0 ${kolom * s + 4} ${baris * s + 4}`} width={kolom * s + 4} height={baris * s + 4} role="img" aria-label={`Lapisan ${l + 1}: ${baris * kolom} kubus`}>
            {Array.from({ length: baris * kolom }, (_, i) => (
              <rect key={i} x={2 + (i % kolom) * s} y={2 + Math.floor(i / kolom) * s} width={s - 2} height={s - 2} rx={2} fill={l % 2 === 0 ? BIRU_UKUR : JINGGA_UKUR} stroke="#FFFFFF" strokeWidth={1} />
            ))}
          </svg>
          <span className="text-xs font-black text-[#1C01A5]">Lapisan {l + 1}</span>
        </div>
      ))}
    </div>
  );
}

/** Gelas takar 0 sampai `penuh` ml dengan garis tiap 100 ml; air dan kenaikan karena balok. */
export function GelasTakar({ air, naik, penuh, label }: { air: number; naik: number; penuh: number; label: string }) {
  const tinggi = 220;
  const lebar = 80;
  const y = (ml: number) => 4 + tinggi - (ml / penuh) * tinggi;
  return (
    <svg viewBox={`0 0 ${lebar + 70} ${tinggi + 10}`} width={lebar + 70} height={tinggi + 10} role="img" aria-label={label} className="shrink-0">
      <rect x={4} y={4} width={lebar} height={tinggi} rx={6} fill="#F5F3FF" stroke={BIRU_UKUR} strokeWidth={3} />
      {air > 0 ? <rect x={7} y={y(air)} width={lebar - 6} height={y(0) - y(air)} fill="#60A5FA" /> : null}
      {naik > 0 ? <rect x={7} y={y(air + naik)} width={lebar - 6} height={y(air) - y(air + naik)} fill={JINGGA_UKUR} /> : null}
      {naik > 0 ? <rect x={lebar / 2 - 12} y={y(0) - 30} width={24} height={24} fill={BIRU_UKUR} stroke="#FFFFFF" strokeWidth={2} /> : null}
      {Array.from({ length: penuh / 100 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={lebar - 14} x2={lebar + 4} y1={y(i * 100)} y2={y(i * 100)} stroke={BIRU_UKUR} strokeWidth={i % 5 === 0 ? 3 : 1.5} />
          {i % 2 === 0 ? (
            <text x={lebar + 9} y={y(i * 100) + 4} fontSize={11} fontWeight={900} fill={BIRU_UKUR}>
              {i * 100}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
