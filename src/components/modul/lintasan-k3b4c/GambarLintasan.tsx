"use client";

import React from "react";
import { EMOJI_BENDA, type Benda, type Bentuk, type LLambang, type LPilah, type LSejajar, type LTegak, type Rupa } from "./logika-cpa";
import { PETAK, duaTali, pojokKertas, selTemu, titikBangun, titikKePoints, titikTemu, ujungKanan, yPada, type Titik } from "./geometri";

/**
 * Gambar tugas CPA dan Simulasi Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul", digambar SVG tepat sesuai data (lihat geometri.ts):
 * lapangan berpetak dengan tali dan patok oranye (Concrete, benda beremoji festival) atau kertas petak hijau muda dengan garis dan bangun polos (Pictorial).
 * Tahap Abstract memakai kartu kata, bukan gambar ini.
 */
export const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
export const UNGU = "#1C01A5";
const HALO = { stroke: "#FFFFFF", strokeWidth: 3, paintOrder: "stroke" } as const;

type Gaya = { latar: string; garisPetak: string; tali1: string; tali2: string; tebal: number; isiBangun: string[]; garisBangun: string };
export const GAYA: Record<"benda" | "diagram", Gaya> = {
  benda: { latar: "#DCFCE7", garisPetak: "#4ADE80", tali1: "#EA580C", tali2: "#7C3AED", tebal: 4.2, isiBangun: ["#FDBA74", "#FCA5A5", "#93C5FD", "#FDE68A", "#C4B5FD", "#86EFAC"], garisBangun: "#9A3412" },
  diagram: { latar: "#F0FDF4", garisPetak: "#86EFAC", tali1: "#2563EB", tali2: "#DC2626", tebal: 2.6, isiBangun: ["#E2E8F0"], garisBangun: "#334155" },
};
const gaya = (rupa: Rupa): Gaya => (rupa === "benda" ? GAYA.benda : GAYA.diagram);

export function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Dua benda beremoji di tepi kiri dan kanan (hanya Concrete). */
function Hiasan({ benda, y = 46 }: { benda: Benda; y?: number }) {
  return (
    <g aria-hidden="true">
      <text x={15} y={y} textAnchor="middle" fontSize={17}>
        {EMOJI_BENDA[benda]}
      </text>
      <text x={285} y={y} textAnchor="middle" fontSize={17}>
        {EMOJI_BENDA[benda]}
      </text>
    </g>
  );
}

/** Kertas petak 10 x 6 petak. */
export function Petak({ rupa }: { rupa: Rupa }) {
  const g = gaya(rupa);
  const { x0, y0, u, kolom, baris } = PETAK;
  return (
    <g>
      <rect x={x0} y={y0} width={kolom * u} height={baris * u} fill={g.latar} stroke={g.garisPetak} strokeWidth={1.2} />
      {Array.from({ length: kolom - 1 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + (i + 1) * u} y1={y0} x2={x0 + (i + 1) * u} y2={y0 + baris * u} stroke={g.garisPetak} strokeWidth={0.8} />
      ))}
      {Array.from({ length: baris - 1 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + (i + 1) * u} x2={ujungKanan} y2={y0 + (i + 1) * u} stroke={g.garisPetak} strokeWidth={0.8} />
      ))}
    </g>
  );
}

/** Panah ukur tegak dua arah dari y1 ke y2 di x, dengan label. */
export function Ukur({ x, y1, y2, label, anchor, warna = UNGU }: { x: number; y1: number; y2: number; label: string; anchor: "start" | "end"; warna?: string }) {
  const m = (y1 + y2) / 2;
  const dx = anchor === "start" ? 5 : -5;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={warna} strokeWidth={1.6} />
      <polygon points={`${x},${y1} ${x - 3},${y1 + 6} ${x + 3},${y1 + 6}`} fill={warna} />
      <polygon points={`${x},${y2} ${x - 3},${y2 - 6} ${x + 3},${y2 - 6}`} fill={warna} />
      <text x={x + dx} y={m + 3} textAnchor={anchor} fontSize={9} fontWeight={900} fill={warna} {...HALO}>
        {label}
      </text>
    </g>
  );
}

/* ------------------------------ Dua tali pada kertas petak ------------------------------ */
export function GambarSejajar({ l, rupa, tanya }: { l: LSejajar; rupa: Exclude<Rupa, "lambang">; tanya: "kiri" | "kanan" | "tidak" }) {
  const g = gaya(rupa);
  const t = duaTali(l.dKiri, l.dKanan, l.miring);
  const xL = PETAK.x0 + 16;
  const xR = ujungKanan - 16;
  const tali = (garis: [Titik, Titik], warna: string, huruf: [string, string]) => (
    <g>
      <line x1={garis[0][0]} y1={garis[0][1]} x2={garis[1][0]} y2={garis[1][1]} stroke={warna} strokeWidth={g.tebal} strokeLinecap="round" />
      {[garis[0], garis[1]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={rupa === "benda" ? 4.6 : 3} fill={rupa === "benda" ? "#F97316" : warna} stroke={rupa === "benda" ? "#7C2D12" : warna} strokeWidth={1.2} />
      ))}
      <text x={garis[0][0] - 10} y={garis[0][1] + 3} textAnchor="middle" fontSize={10} fontWeight={900} fill={warna}>
        {huruf[0]}
      </text>
      <text x={garis[1][0] + 10} y={garis[1][1] + 3} textAnchor="middle" fontSize={10} fontWeight={900} fill={warna}>
        {huruf[1]}
      </text>
    </g>
  );
  return (
    <Gambar label="Dua tali pada kertas petak" judul="dua tali pada kertas petak">
      <Petak rupa={rupa} />
      {rupa === "benda" ? <Hiasan benda={l.benda} /> : null}
      {tali(t.atas, g.tali1, [l.hrf[0], l.hrf[1]])}
      {tali(t.bawah, g.tali2, [l.hrf[2], l.hrf[3]])}
      <Ukur x={xL} y1={yPada(t.atas, xL)} y2={yPada(t.bawah, xL)} label={`${tanya === "kiri" ? "?" : l.dKiri} petak`} anchor="start" />
      <Ukur x={xR} y1={yPada(t.atas, xR)} y2={yPada(t.bawah, xR)} label={`${tanya === "kanan" ? "?" : l.dKanan} petak`} anchor="end" />
      <text x={150} y={192} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU} aria-hidden="true">
        {`tali ${l.hrf[0]}${l.hrf[1]} dan tali ${l.hrf[2]}${l.hrf[3]}`}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Titik temu dengan pojok kertas ------------------------------ */
export function GambarTegak({ l, rupa }: { l: LTegak; rupa: Exclude<Rupa, "lambang"> }) {
  const g = gaya(rupa);
  const { pusat, panjang } = selTemu(l.sudut.length);
  return (
    <Gambar label="Titik temu dua garis dengan pojok kertas lipat" judul="pojok kertas lipat dicocokkan di tiap titik temu">
      {rupa === "benda" ? <rect x={6} y={26} width={288} height={156} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} /> : <Petak rupa={rupa} />}
      {rupa === "benda" ? <Hiasan benda={l.benda} y={44} /> : null}
      {l.sudut.map((d, i) => {
        const { B, A, C } = titikTemu(pusat[i], 98, d, panjang);
        const pojok = pojokKertas(B, panjang * 0.62);
        return (
          <g key={i}>
            <polygon points={titikKePoints(pojok)} fill="#FEF08A" fillOpacity={0.7} stroke="#A16207" strokeWidth={1.2} strokeDasharray="3 2" />
            <line x1={B[0]} y1={B[1]} x2={A[0]} y2={A[1]} stroke={g.tali1} strokeWidth={g.tebal} strokeLinecap="round" />
            <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={g.tali2} strokeWidth={g.tebal} strokeLinecap="round" />
            <circle cx={B[0]} cy={B[1]} r={rupa === "benda" ? 4.2 : 3} fill={rupa === "benda" ? "#F97316" : UNGU} stroke="#7C2D12" strokeWidth={1} />
            <circle cx={pusat[i]} cy={165} r={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.6} />
            <text x={pusat[i]} y={168.4} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
              {i + 1}
            </text>
          </g>
        );
      })}
      <text x={150} y={192} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU} aria-hidden="true">
        titik temu bernomor, pojok kertas berwarna kuning
      </text>
    </Gambar>
  );
}

/* ------------------------------ Bangun datar ------------------------------ */
/** Satu bangun berpusat di (cx, cy). `warna` indeks isi (Concrete berwarna-warni, Pictorial polos). */
export function SatuBangun({ b, cx, cy, s, rupa, warna = 0 }: { b: Bentuk; cx: number; cy: number; s: number; rupa: Exclude<Rupa, "lambang">; warna?: number }) {
  const g = gaya(rupa);
  const isi = g.isiBangun[warna % g.isiBangun.length];
  if (b === "lingkaran") return <circle cx={cx} cy={cy} r={s * 0.5} fill={isi} stroke={g.garisBangun} strokeWidth={2.2} />;
  return <polygon points={titikKePoints(titikBangun(b, cx, cy, s))} fill={isi} stroke={g.garisBangun} strokeWidth={2.2} strokeLinejoin="round" />;
}
export function GambarBangun({ bentuk, rupa, benda }: { bentuk: Bentuk; rupa: Exclude<Rupa, "lambang">; benda: Benda }) {
  return (
    <Gambar label="Bangun datar" judul="bangun datar">
      {rupa === "benda" ? (
        <g>
          <rect x={6} y={26} width={288} height={158} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} />
          <Hiasan benda={benda} y={48} />
        </g>
      ) : (
        <Petak rupa={rupa} />
      )}
      <SatuBangun b={bentuk} cx={150} cy={100} s={92} rupa={rupa} />
      <text x={150} y={192} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU} aria-hidden="true">
        {rupa === "benda" ? "bangun datar di lapangan lomba" : "bangun datar di kertas petak"}
      </text>
    </Gambar>
  );
}

/** Beberapa bangun bernomor, paling banyak tiga per baris. */
export function GambarPilah({ l, rupa }: { l: LPilah; rupa: Exclude<Rupa, "lambang"> }) {
  const n = l.bentuk.length;
  const dua = n > 3;
  return (
    <Gambar label="Beberapa bangun datar bernomor" judul="bangun datar bernomor">
      {rupa === "benda" ? (
        <g>
          <rect x={6} y={26} width={288} height={158} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} />
          <Hiasan benda={l.benda} y={48} />
        </g>
      ) : (
        <Petak rupa={rupa} />
      )}
      {l.bentuk.map((b, i) => {
        const baris = Math.floor(i / 3);
        const cx = 66 + (i % 3) * 84;
        const cy = dua ? 66 + baris * 70 : 90;
        return (
          <g key={i}>
            <SatuBangun b={b} cx={cx} cy={cy} s={40} rupa={rupa} warna={i} />
            <circle cx={cx} cy={cy + 31} r={7} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.4} />
            <text x={cx} y={cy + 34.4} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
              {i + 1}
            </text>
          </g>
        );
      })}
    </Gambar>
  );
}

/** Dua garis bernama huruf titik: tegak lurus (bertemu bersiku) atau sejajar (jarak sama). */
export function GambarLambang({ l, rupa }: { l: LLambang; rupa: Exclude<Rupa, "lambang"> }) {
  const g = gaya(rupa);
  const tebal = g.tebal;
  return (
    <Gambar label={l.rel === "tegak" ? "Dua garis bertemu pada sudut siku-siku" : "Dua garis dengan jarak selalu sama"} judul={l.rel === "tegak" ? "dua garis bertemu pada sudut siku-siku" : "dua garis berjarak sama"}>
      {rupa === "benda" ? (
        <g>
          <rect x={6} y={26} width={288} height={158} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} />
          <Hiasan benda={l.benda} y={48} />
        </g>
      ) : (
        <Petak rupa={rupa} />
      )}
      {l.rel === "tegak" ? (
        <g>
          <line x1={72} y1={110} x2={228} y2={110} stroke={g.tali1} strokeWidth={tebal} strokeLinecap="round" />
          <line x1={150} y1={36} x2={150} y2={176} stroke={g.tali2} strokeWidth={tebal} strokeLinecap="round" />
          <polygon points="150,110 164,110 164,96 150,96" fill="none" stroke={UNGU} strokeWidth={1.4} />
          {[[64, 114, l.hrf[0]], [236, 114, l.hrf[1]]].map(([x, y, t]) => (
            <text key={String(t)} x={x as number} y={y as number} textAnchor="middle" fontSize={11} fontWeight={900} fill={g.tali1}>
              {t}
            </text>
          ))}
          {[[150, 32, l.hrf[2]], [150, 188, l.hrf[3]]].map(([x, y, t]) => (
            <text key={String(t)} x={x as number} y={y as number} textAnchor="middle" fontSize={11} fontWeight={900} fill={g.tali2}>
              {t}
            </text>
          ))}
        </g>
      ) : (
        <g>
          <line x1={60} y1={70} x2={240} y2={70} stroke={g.tali1} strokeWidth={tebal} strokeLinecap="round" />
          <line x1={60} y1={130} x2={240} y2={130} stroke={g.tali2} strokeWidth={tebal} strokeLinecap="round" />
          <Ukur x={84} y1={70} y2={130} label="sama" anchor="start" />
          <Ukur x={216} y1={70} y2={130} label="sama" anchor="end" />
          {[[50, 74, l.hrf[0]], [250, 74, l.hrf[1]]].map(([x, y, t]) => (
            <text key={String(t)} x={x as number} y={y as number} textAnchor="middle" fontSize={11} fontWeight={900} fill={g.tali1}>
              {t}
            </text>
          ))}
          {[[50, 134, l.hrf[2]], [250, 134, l.hrf[3]]].map(([x, y, t]) => (
            <text key={String(t)} x={x as number} y={y as number} textAnchor="middle" fontSize={11} fontWeight={900} fill={g.tali2}>
              {t}
            </text>
          ))}
        </g>
      )}
    </Gambar>
  );
}

