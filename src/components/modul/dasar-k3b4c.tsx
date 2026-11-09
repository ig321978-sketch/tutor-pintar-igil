import React from "react";
import { BENDA_GARIS, type Titik } from "./data-k3b4";

/* ------------------------------------------------------------------------ */
/* Gambar benda untuk tahap Concrete Sub-Bab C: benda sehari-hari yang tersusun   */
/* dari ruas garis (tangga, pagar, rumah, jendela, rel, tiang bendera) dengan dua  */
/* garis disorot merah dan biru, serta selembar kertas berpetak yang dilipat       */
/* dengan bekas lipatan berwarna. Hanya dipakai di tahap Concrete. Tanpa acak.     */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const MERAH = "#DC2626";
const GARIS_BIRU = "#2563EB";

/**
 * Benda bergaris dalam kotak 220 x 140. Ruas yang disebut `merah` digambar merah, ruas dalam `biru` digambar biru, ruas lain abu-abu.
 */
export function BendaGarisSvg({ benda, merah, biru }: { benda: string; merah: string; biru: string[] }) {
  const b = BENDA_GARIS[benda];
  return (
    <svg viewBox="0 0 220 140" className="mx-auto block h-auto w-full" role="img" aria-label={`Gambar ${b.nama} dengan garis berwarna merah dan biru`}>
      <rect x="2" y="2" width="216" height="136" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      {b.ruas.map((r) => {
        const aktif = r.id === merah || biru.includes(r.id);
        const warna = r.id === merah ? MERAH : biru.includes(r.id) ? GARIS_BIRU : "#94A3B8";
        return <line key={r.id} x1={r.a[0]} y1={r.a[1]} x2={r.b[0]} y2={r.b[1]} stroke={warna} strokeWidth={aktif ? 7 : 5} strokeLinecap="round" opacity={aktif ? 1 : 0.9} />;
      })}
    </svg>
  );
}

export type GarisLipat = { a: Titik; b: Titik; warna: string };

/** Kertas berpetak selebar `w` petak dan setinggi `h` petak dengan bekas lipatan berwarna. `tengah` (x1, y1, x2, y2) mewarnai bangun di tengah kertas. */
export function KertasLipatSvg({ w = 4, h = 4, garis, tengah, ringkas = false }: { w?: number; h?: number; garis: GarisLipat[]; tengah?: [number, number, number, number]; ringkas?: boolean }) {
  const sel = ringkas ? 24 : 28;
  const m = 8;
  const lebar = w * sel + 2 * m;
  const tinggi = h * sel + 2 * m;
  const kisi: React.ReactNode[] = [];
  for (let i = 0; i <= w; i += 1) kisi.push(<line key={`v${i}`} x1={m + i * sel} y1={m} x2={m + i * sel} y2={m + h * sel} stroke="#E2E8F0" strokeWidth="1" />);
  for (let i = 0; i <= h; i += 1) kisi.push(<line key={`h${i}`} x1={m} y1={m + i * sel} x2={m + w * sel} y2={m + i * sel} stroke="#E2E8F0" strokeWidth="1" />);
  return (
    <svg viewBox={`0 0 ${lebar} ${tinggi}`} className="mx-auto block h-auto w-full" role="img" aria-label="Selembar kertas berpetak dengan bekas lipatan berwarna">
      <rect x={m} y={m} width={w * sel} height={h * sel} fill="#FFFBEB" stroke="#B45309" strokeWidth="2.5" />
      {kisi}
      {tengah ? <rect x={m + tengah[0] * sel} y={m + tengah[1] * sel} width={(tengah[2] - tengah[0]) * sel} height={(tengah[3] - tengah[1]) * sel} fill="#FDE68A" opacity="0.75" /> : null}
      {garis.map((g, i) => (
        <line key={i} x1={m + g.a[0] * sel} y1={m + g.a[1] * sel} x2={m + g.b[0] * sel} y2={m + g.b[1] * sel} stroke={g.warna} strokeWidth="3.5" strokeLinecap="round" />
      ))}
      <rect x={m} y={m} width={w * sel} height={h * sel} fill="none" stroke={BIRU} strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}
