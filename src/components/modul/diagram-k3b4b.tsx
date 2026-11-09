import React from "react";

/* ------------------------------------------------------------------------ */
/* Diagram Sudut (Matematika Kelas 3 Bab 4, Sub-Bab B). Gambar polos: dua kaki    */
/* sudut, busur penanda, dan busur derajat. Tanpa gambar benda, jadi aman dipakai  */
/* tahap Picture dan Abstract. Kaki OA selalu di kanan (atau kiri pada busur       */
/* derajat berskala dalam), kaki OB berputar berlawanan arah jarum jam sebesar     */
/* `deg` derajat. Tanpa acak.                                                    */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const MERAH = "#DC2626";

const rad = (d: number) => (d * Math.PI) / 180;
export const titikPolar = (cx: number, cy: number, r: number, deg: number) => ({ x: cx + r * Math.cos(rad(deg)), y: cy - r * Math.sin(rad(deg)) });
const bulat = (n: number) => Math.round(n * 100) / 100;

/** Busur penanda sudut dari kaki OA (0 derajat) sampai kaki OB (`deg`), berlawanan arah jarum jam. */
export function jalurBusur(cx: number, cy: number, r: number, deg: number): string {
  const a = titikPolar(cx, cy, r, 0);
  const b = titikPolar(cx, cy, r, deg);
  return `M ${bulat(a.x)} ${bulat(a.y)} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 0 ${bulat(b.x)} ${bulat(b.y)}`;
}

/** Juring warna lembut di dalam sudut. */
export function jalurJuring(cx: number, cy: number, r: number, deg: number): string {
  const a = titikPolar(cx, cy, r, 0);
  const b = titikPolar(cx, cy, r, deg);
  return `M ${cx} ${cy} L ${bulat(a.x)} ${bulat(a.y)} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 0 ${bulat(b.x)} ${bulat(b.y)} Z`;
}

/**
 * Sudut `deg` derajat (lebih dari 0 dan kurang dari 360) dengan titik sudut O. Bila `huruf` diberikan, huruf pertama ditulis di ujung
 * kaki OA, huruf kedua di titik sudut, dan huruf ketiga di ujung kaki OB. Sudut siku-siku diberi tanda kotak, sudut lain diberi busur.
 */
export function SudutSvg({ deg, huruf, ringkas = false, label }: { deg: number; huruf?: [string, string, string]; ringkas?: boolean; label?: string }) {
  const cx = 100;
  const cy = 76;
  const L = 54;
  const b = titikPolar(cx, cy, L, deg);
  const tanda = titikPolar(cx, cy, L + 14, deg);
  const siku = deg === 90;
  const s = 15;
  const kecil = ringkas ? 17 : 14;
  return (
    <svg viewBox={ringkas ? "28 10 144 130" : "0 0 200 152"} className="mx-auto block h-auto w-full" role="img" aria-label={label ?? `Gambar sudut dengan dua kaki yang bertemu di satu titik`}>
      <path d={jalurJuring(cx, cy, L - 6, deg)} fill="#FEF3C7" opacity="0.9" />
      <line x1={cx} y1={cy} x2={cx + L} y2={cy} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={bulat(b.x)} y2={bulat(b.y)} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {siku ? <polyline points={`${cx + s},${cy} ${cx + s},${cy - s} ${cx},${cy - s}`} fill="none" stroke={MERAH} strokeWidth="2.5" /> : <path d={jalurBusur(cx, cy, 24, deg)} fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />}
      <circle cx={cx} cy={cy} r="4.5" fill={MERAH} stroke={BIRU} strokeWidth="1.5" />
      {huruf ? (
        <g fontSize={kecil} fontWeight="900" fill={BIRU} textAnchor="middle">
          <text x={cx + L + 12} y={cy + 5}>{huruf[0]}</text>
          <text x={bulat(tanda.x)} y={bulat(tanda.y + 5)}>{huruf[2]}</text>
          <text x={cx - 13} y={cy + 20}>{huruf[1]}</text>
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Busur derajat dengan titik tengah O. Skala luar: 0 di kanan sampai 180 di kiri. Skala dalam: 0 di kiri sampai 180 di kanan.
 * Kaki OA ada di garis dasar kanan (skala luar dibaca) atau kiri (`kiri`, skala dalam dibaca). Kaki OB berada `deg` derajat dari OA.
 */
export function BusurSvg({ deg, kiri = false, huruf = true, label }: { deg: number; kiri?: boolean; huruf?: boolean; label?: string }) {
  const cx = 140;
  const cy = 150;
  const R = 112;
  const phi = kiri ? 180 - deg : deg;
  const ujungA = titikPolar(cx, cy, R + 10, kiri ? 180 : 0);
  const ujungB = titikPolar(cx, cy, R + 10, phi);
  const tandaA = titikPolar(cx, cy, R + 20, kiri ? 180 : 0);
  const tandaB = titikPolar(cx, cy, R + 20, phi);
  const garis: React.ReactNode[] = [];
  const angka: React.ReactNode[] = [];
  for (let t = 0; t <= 180; t += 5) {
    const panjang = t % 10 === 0 ? 12 : 7;
    const p = titikPolar(cx, cy, R, t);
    const q = titikPolar(cx, cy, R - panjang, t);
    garis.push(<line key={`g${t}`} x1={bulat(p.x)} y1={bulat(p.y)} x2={bulat(q.x)} y2={bulat(q.y)} stroke={BIRU} strokeWidth={t % 10 === 0 ? 1.4 : 0.9} />);
    if (t % 10 === 0) {
      const lp = titikPolar(cx, cy, R - 23, t);
      const dp = titikPolar(cx, cy, R - 40, t);
      /* Angka diputar searah jari-jari busur supaya angka yang berdekatan tidak bertabrakan. Sisi kiri dibalik agar tetap terbaca tegak. */
      const putar = t <= 90 ? -t : 180 - t;
      angka.push(
        <text key={`o${t}`} x={bulat(lp.x)} y={bulat(lp.y)} transform={`rotate(${putar} ${bulat(lp.x)} ${bulat(lp.y)})`} fontSize="9" fontWeight="800" fill={BIRU} textAnchor="middle" dominantBaseline="central">
          {t}
        </text>,
        <text key={`d${t}`} x={bulat(dp.x)} y={bulat(dp.y)} transform={`rotate(${putar} ${bulat(dp.x)} ${bulat(dp.y)})`} fontSize="7" fontWeight="700" fill="#64748B" textAnchor="middle" dominantBaseline="central">
          {180 - t}
        </text>,
      );
    }
  }
  return (
    <svg viewBox="0 0 280 176" className="mx-auto block h-auto w-full" role="img" aria-label={label ?? "Busur derajat dengan dua kaki sudut yang bertemu di titik tengahnya"}>
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} fill="#E0F2FE" stroke={BIRU} strokeWidth="2" />
      <line x1={cx - R - 12} y1={cy} x2={cx + R + 12} y2={cy} stroke={BIRU} strokeWidth="1.2" opacity="0.5" />
      {garis}
      {angka}
      <line x1={cx} y1={cy} x2={bulat(ujungA.x)} y2={bulat(ujungA.y)} stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={bulat(ujungB.x)} y2={bulat(ujungB.y)} stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="#fff" stroke={BIRU} strokeWidth="2" />
      {huruf ? (
        <g fontSize="13" fontWeight="900" textAnchor="middle">
          <text x={bulat(tandaA.x)} y={bulat(tandaA.y + 4)} fill={BIRU}>A</text>
          <text x={bulat(tandaB.x)} y={bulat(tandaB.y + 4)} fill={MERAH}>B</text>
          <text x={cx} y={cy + 16} fill={BIRU}>O</text>
        </g>
      ) : null}
    </svg>
  );
}
