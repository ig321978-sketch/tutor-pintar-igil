"use client";

import React from "react";
import { BendaB6 } from "./dasar-k2b6";
import { BENDA_INFO, puluhan, satuan, sebarTitik, type BendaId } from "./data-k2b7";

/* ------------------------------------------------------------------------ */
/* Benda nyata Matematika Kelas 2 Bab 7 (tahap Concrete): kue cubit, kelereng,   */
/* rambutan, ikan hias, lidi, jeruk, pensil warna, anggur. Satu wadah berisi      */
/* sepuluh benda (satu puluhan), sisanya lepas (satuan). Tahap Picture memakai   */
/* diagram-k2b7.tsx tanpa gambar benda.                                          */
/* ------------------------------------------------------------------------ */

/** Satu benda. Gambar khusus untuk kue cubit, rambutan, dan lidi; yang lain memakai emoji atau gambar bab 6. */
export function BendaB7({ id, ukuran = 36 }: { id: BendaId; ukuran?: number }) {
  if (id === "kelereng" || id === "jeruk" || id === "pensil" || id === "anggur") return <BendaB6 id={id} ukuran={ukuran} />;
  const nama = BENDA_INFO[id].satu;
  if (id === "ikan") {
    return (
      <span className="inline-flex shrink-0 items-center justify-center leading-none" style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.8 }} role="img" aria-label={nama}>
        🐠
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center justify-center" style={{ width: ukuran, height: ukuran }} role="img" aria-label={nama}>
      {id === "kue" ? (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="22" r="14" fill="#D9A441" stroke="#92400E" strokeWidth="2.4" />
          <path d="M10 18 Q20 8 30 18" fill="none" stroke="#F5D58A" strokeWidth="3" strokeLinecap="round" />
          {[[15, 20], [24, 18], [20, 27], [27, 26], [13, 28]].map(([a, b], i) => (
            <circle key={i} cx={a} cy={b} r="2" fill="#451A03" />
          ))}
        </svg>
      ) : id === "rambutan" ? (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i * Math.PI * 2) / 14;
            return <line key={i} x1={20 + Math.cos(a) * 11} y1={22 + Math.sin(a) * 11} x2={20 + Math.cos(a) * 17} y2={22 + Math.sin(a) * 17} stroke="#B91C1C" strokeWidth="2.2" strokeLinecap="round" />;
          })}
          <circle cx="20" cy="22" r="11.5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          <path d="M20 10 q2 -5 6 -5" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <path d="M8 34 L28 6 M14 36 L34 10 M5 28 L22 4" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 34 L28 6 M14 36 L34 10 M5 28 L22 4" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

/** Warna tepi dan latar tiap jenis wadah. */
const WADAH: Record<BendaId, { latar: string; tepi: string; bentuk: string }> = {
  kue: { latar: "#FEF3C7", tepi: "#B45309", bentuk: "rounded-lg" },
  kelereng: { latar: "rgba(186,230,253,0.55)", tepi: "#1D4ED8", bentuk: "rounded-2xl" },
  rambutan: { latar: "#FDE9C4", tepi: "#A8672D", bentuk: "rounded-b-3xl rounded-t-md" },
  ikan: { latar: "#E0F2FE", tepi: "#0369A1", bentuk: "rounded-full" },
  lidi: { latar: "#FFF7ED", tepi: "#C2410C", bentuk: "rounded-md" },
  jeruk: { latar: "#FFEDD5", tepi: "#C2410C", bentuk: "rounded-lg" },
  pensil: { latar: "#FCE7F3", tepi: "#BE185D", bentuk: "rounded-lg" },
  anggur: { latar: "#F3E8FF", tepi: "#7E22CE", bentuk: "rounded-3xl" },
};

/** Satu wadah penuh berisi sepuluh benda (lima sebaris, dua baris). Satu wadah adalah satu puluhan. */
export function Wadah({ benda, ukuran = 52 }: { benda: BendaId; ukuran?: number }) {
  const w = WADAH[benda];
  const mini = ukuran / 5.3;
  return (
    <span className="relative inline-flex shrink-0 flex-col items-center" role="img" aria-label={`1 ${BENDA_INFO[benda].wadah} berisi 10 ${BENDA_INFO[benda].nama}, satu puluhan`}>
      {benda === "kelereng" || benda === "lidi" ? <span className="-mb-0.5 block h-1.5 w-3 rounded-t-full" style={{ backgroundColor: w.tepi }} aria-hidden="true" /> : null}
      <span className={`flex flex-wrap content-center justify-center border-[3px] ${w.bentuk}`} style={{ width: ukuran, padding: 2, backgroundColor: w.latar, borderColor: w.tepi, borderStyle: benda === "ikan" || benda === "anggur" ? "dashed" : "solid", minHeight: mini * 2 + 8 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <BendaB7 key={i} id={benda} ukuran={mini} />
        ))}
      </span>
    </span>
  );
}

/** Sekumpulan benda: p wadah penuh dan s benda lepas. Ukuran menyesuaikan banyak wadah. */
export function Koleksi({ p, s, benda, ukuran = 52 }: { p: number; s: number; benda: BendaId; ukuran?: number }) {
  const u = ukuran * (p <= 3 ? 1 : p <= 5 ? 0.82 : p <= 8 ? 0.68 : 0.56);
  const lepas = Math.max(14, u * 0.42);
  return (
    <span className="inline-flex flex-wrap items-end justify-center gap-1" role="img" aria-label={`${p} ${BENDA_INFO[benda].wadah} penuh dan ${s} ${BENDA_INFO[benda].nama} lepas`}>
      {Array.from({ length: p }, (_, i) => (
        <Wadah key={i} benda={benda} ukuran={u} />
      ))}
      {s > 0 ? (
        <span className="inline-flex max-w-[110px] flex-wrap items-end justify-center">
          {Array.from({ length: s }, (_, i) => (
            <BendaB7 key={i} id={benda} ukuran={lepas} />
          ))}
        </span>
      ) : null}
    </span>
  );
}

/** Koleksi dari satu bilangan. */
export const KoleksiDari = ({ n, benda, ukuran = 52 }: { n: number; benda: BendaId; ukuran?: number }) => <Koleksi p={puluhan(n)} s={satuan(n)} benda={benda} ukuran={ukuran} />;

/** Benda lepas bertebaran (belum dikelompokkan), posisi tetap tanpa acak. */
export function LepasBanyak({ n, benda, ukuran = 20 }: { n: number; benda: BendaId; ukuran?: number }) {
  const pos = sebarTitik(n, 100, 60);
  return (
    <span className="relative block w-full max-w-[300px] rounded-xl border-4 border-[#1C01A5] bg-white" style={{ aspectRatio: "100 / 60" }} role="img" aria-label={`${n} ${BENDA_INFO[benda].nama} bertebaran, belum dikelompokkan`}>
      {pos.map(([x, y], i) => (
        <span key={i} className="absolute" style={{ left: `${x}%`, top: `${(y / 60) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <BendaB7 id={benda} ukuran={ukuran} />
        </span>
      ))}
    </span>
  );
}

/** Benda lepas yang sudah dikelompokkan sepuluh-sepuluh: baris penuh dalam lingkaran putus-putus, sisanya lepas. */
export function LepasKelompok({ n, benda, ukuran = 18 }: { n: number; benda: BendaId; ukuran?: number }) {
  const p = puluhan(n);
  const s = satuan(n);
  return (
    <span className="block w-full max-w-[300px] space-y-1 rounded-xl border-4 border-[#1C01A5] bg-white p-1.5" role="img" aria-label={`${p} kelompok sepuluh dan ${s} lepas`}>
      {Array.from({ length: p }, (_, r) => (
        <span key={r} className="flex items-center justify-center rounded-full border-2 border-dashed border-[#1C01A5] bg-[#E0F2FE]">
          {Array.from({ length: 10 }, (_, c) => (
            <BendaB7 key={c} id={benda} ukuran={ukuran} />
          ))}
        </span>
      ))}
      {s > 0 ? (
        <span className="flex items-center justify-start px-2">
          {Array.from({ length: s }, (_, c) => (
            <BendaB7 key={c} id={benda} ukuran={ukuran} />
          ))}
        </span>
      ) : null}
    </span>
  );
}

/** Capung (gambar khusus karena tidak ada emoji capung). Dipakai Sub-Bab B sebagai penanda pada garis bilangan. */
export function Capung({ ukuran = 30 }: { ukuran?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={ukuran} height={ukuran} role="img" aria-label="Capung">
      <ellipse cx="12" cy="14" rx="9" ry="4" fill="#BAE6FD" stroke="#1D4ED8" strokeWidth="1.6" transform="rotate(-20 12 14)" />
      <ellipse cx="28" cy="14" rx="9" ry="4" fill="#BAE6FD" stroke="#1D4ED8" strokeWidth="1.6" transform="rotate(20 28 14)" />
      <ellipse cx="13" cy="22" rx="9" ry="3.6" fill="#E0F2FE" stroke="#1D4ED8" strokeWidth="1.6" transform="rotate(14 13 22)" />
      <ellipse cx="27" cy="22" rx="9" ry="3.6" fill="#E0F2FE" stroke="#1D4ED8" strokeWidth="1.6" transform="rotate(-14 27 22)" />
      <path d="M20 12 V35" stroke="#15803D" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="20" cy="10" r="4" fill="#16A34A" stroke="#14532D" strokeWidth="1.4" />
    </svg>
  );
}