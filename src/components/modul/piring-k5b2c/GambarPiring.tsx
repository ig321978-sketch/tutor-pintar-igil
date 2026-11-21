"use client";

import React from "react";
import { barisKartu, dasarDari, tampilan, type Cara, type Langkah, type LangkahDasar, type Rupa, type TampilanPiring } from "./logika-cpa";
import { ikonKue, tataPiring, tataPita } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab C (klepon dibagi tanpa sisa):
 * Concrete = baki dan piring dengan klepon beremoji, Pictorial = pita petak polos di kertas (kotak SVG berwarna, tanpa emoji),
 * Abstract = kartu tabel dan angka bercap pengelola pasar (tanpa gambar). Kue dan petak DIGAMBAR dari data lewat tataPiring dan tataPita (logika-data.ts):
 * sungguh sebanyak banyak kue atau petaknya. Dipakai bersama oleh tugas CPA (LangkahPiring) dan Simulasi Tata Piring.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_PIRING = {
  benda: { latar: "#ECFDF5", garis: "#166534", angka: "#14532D" },
  diagram: { latar: "#FEFCE8", garis: "#115E59", angka: "#115E59" },
} as const;
export const warnaPiring = (rupa: Rupa) => (rupa === "benda" ? WARNA_PIRING.benda : WARNA_PIRING.diagram);

const ISI_GRUP = ["#5EEAD4", "#FDE68A", "#BAE6FD", "#FBCFE8"];
const GARIS_GRUP = ["#0F766E", "#B45309", "#0369A1", "#BE185D"];

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaPiring(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={12 + i * 25} cy={5} r={3.5} fill={["#DC2626", "#FACC15", "#16A34A", "#F97316"][i % 4]} />
          ))}
        </g>
      ) : null}
      <text x={150} y={rupa === "benda" ? 21 : 17} textAnchor="middle" fontSize={judul.length > 30 ? 11.5 : 13.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Baki dan piring: tiap kue punya titik sendiri; kue sisa ditaruh pada baki bergaris putus. */
export function PapanPiring({ n, g, satuan, judul, label }: { n: number; g: number; satuan: string; judul?: string; label?: string }) {
  const t = tataPiring(n, g);
  const ikon = ikonKue(satuan);
  return (
    <Gambar rupa="benda" label={label ?? `${g > 0 ? `${t.q} piring` : "Baki"} dengan ${n} ${satuan}`} judul={judul ?? (g > 0 ? `${n} ${satuan} di piring` : `baki ${n} ${satuan}`)} tinggi={t.tinggi}>
      <g data-papan="piring" data-banyak={n}>
        {t.lempeng.map((p, i) =>
          p.sisa || g === 0 ? (
            <rect key={`p${i}`} x={p.cx - p.w / 2} y={p.cy - p.h / 2} width={p.w} height={p.h} rx={7} fill={g === 0 ? "#FEF3C7" : "#FEE2E2"} stroke={g === 0 ? "#92400E" : "#B91C1C"} strokeWidth={1.6} strokeDasharray={g === 0 ? undefined : "4 3"} data-baki={g === 0 ? "baki" : "sisa"} />
          ) : (
            <ellipse key={`p${i}`} cx={p.cx} cy={p.cy} rx={p.w / 2} ry={p.h / 2} fill="#FFFFFF" stroke="#166534" strokeWidth={1.8} data-piring={i} />
          ),
        )}
        {t.kue.map((k, i) => (
          <text key={`k${i}`} x={k.x} y={k.y + 4} textAnchor="middle" fontSize={11} data-kue={k.grup}>
            {ikon}
          </text>
        ))}
      </g>
    </Gambar>
  );
}

/** Pita petak polos: tiap petak satu kotak; bagian berwarna bergantian, sisa berwarna abu bergaris putus. */
export function PitaPetak({ n, g, judul, label }: { n: number; g: number; judul?: string; label?: string }) {
  const t = tataPita(n, g);
  return (
    <Gambar rupa="diagram" label={label ?? `Pita ${n} petak${g > 0 ? ` dibagi tiap ${g} petak` : ""}`} judul={judul ?? `pita ${n} petak`} tinggi={Math.max(t.tinggi, 70)}>
      <g data-papan="pita" data-banyak={n}>
        {t.sel.map((c, i) => (
          <rect
            key={`c${i}`}
            x={c.x + 0.5}
            y={c.y}
            width={Math.max(2, c.w - 1)}
            height={16}
            rx={1.5}
            fill={c.sisa ? "#E5E7EB" : g > 0 ? ISI_GRUP[c.grup % ISI_GRUP.length] : "#99F6E4"}
            stroke={c.sisa ? "#6B7280" : g > 0 ? GARIS_GRUP[c.grup % GARIS_GRUP.length] : "#0F766E"}
            strokeWidth={1}
            strokeDasharray={c.sisa ? "2 1.5" : undefined}
            data-petak={c.grup}
          />
        ))}
      </g>
    </Gambar>
  );
}

/** Gambar satu tampilan tugas (baki dan piring atau pita petak). */
export function PapanTampilan({ t }: { t: TampilanPiring }) {
  return t.mode === "piring" ? <PapanPiring n={t.n} g={t.g} satuan={t.satuan} judul={t.judul} /> : <PitaPetak n={t.n} g={t.g} judul={t.judul} />;
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FDBA74] bg-[#FFFBF5] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#C2410C]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#431407]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#C2410C] bg-[#FFF7ED] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.14) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#15803D] px-1 text-[10px] font-black text-[#15803D]" aria-hidden="true">
      PENGELOLA PASAR
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "baca pembagian",
  potong: "bagi sama banyak",
  pasang: "pasangkan faktor",
  cek: "cek bagi",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  return <PapanTampilan t={tampilan(d, cara, rupa)} />;
}
