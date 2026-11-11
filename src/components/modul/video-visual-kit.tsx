"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Lompat, Muncul, Sorot } from "./video-cerita";

/* ------------------------------------------------------------------------ */
/* Primitif SVG untuk kanvas video cerita 300×208 (K4–K6). Progresif via k.  */
/* Tanpa API. Animasi kelas vc-pop / vc-lompat / vc-denyut dari video-cerita. */
/* ------------------------------------------------------------------------ */

export const MERAH = "#DC2626";
export const HIJAU = "#16A34A";
export const UNGU = "#7C3AED";
export const ORANYE = "#EA580C";

export function LabelSvg({ x, y, w, teks, ukuran = 12, warna = BIRU }: { x: number; y: number; w: number; teks: string; ukuran?: number; warna?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={ukuran + 10} rx="8" fill="#FFFFFF" stroke={warna} strokeWidth="2.2" />
      <text x={x + w / 2} y={y + ukuran + 2} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna}>
        {teks}
      </text>
    </g>
  );
}

/** Papan nilai tempat: digit berwarna kiri→kanan. `nyala` = berapa digit dari kiri yang tampil. */
export function PapanDigit({
  x = 40,
  y = 70,
  digits,
  nyala = 99,
  lebar = 44,
}: {
  x?: number;
  y?: number;
  digits: string;
  nyala?: number;
  lebar?: number;
}) {
  const warna = ["#6D28D9", "#15803D", "#1D4ED8", "#DC2626", "#B45309", "#0F766E"];
  return (
    <g>
      {digits.split("").map((d, i) =>
        i < nyala ? (
          <Muncul key={i}>
            <rect x={x + i * (lebar + 4)} y={y} width={lebar} height={52} rx="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
            <text x={x + i * (lebar + 4) + lebar / 2} y={y + 36} textAnchor="middle" fontSize="26" fontWeight="900" fill={warna[i % warna.length]}>
              {d}
            </text>
          </Muncul>
        ) : null,
      )}
    </g>
  );
}

/** Persegi / persegi panjang dengan sisi yang menyala berurutan (keliling). */
export function BangunKeliling({
  x = 90,
  y = 55,
  w = 120,
  h = 90,
  k = 0,
  label = true,
  sisi = [4, 4, 4, 4],
}: {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  k?: number;
  label?: boolean;
  sisi?: [number, number, number, number] | number[];
}) {
  const garis = [
    { x1: x, y1: y, x2: x + w, y2: y, lx: x + w / 2, ly: y - 10, n: sisi[0] },
    { x1: x + w, y1: y, x2: x + w, y2: y + h, lx: x + w + 14, ly: y + h / 2, n: sisi[1] },
    { x1: x + w, y1: y + h, x2: x, y2: y + h, lx: x + w / 2, ly: y + h + 18, n: sisi[2] },
    { x1: x, y1: y + h, x2: x, y2: y, lx: x - 14, ly: y + h / 2, n: sisi[3] },
  ];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#DBEAFE" stroke={BIRU} strokeWidth="2.5" opacity={0.45} />
      {garis.map((g, i) =>
        k >= i ? (
          <g key={i} className={k === i ? "vc-denyut" : undefined}>
            <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={k === i ? EMAS : BIRU} strokeWidth={k === i ? 5 : 3.5} strokeLinecap="round" />
            {label ? (
              <text x={g.lx} y={g.ly} textAnchor="middle" fontSize="13" fontWeight="900" fill={MERAH}>
                {g.n}
              </text>
            ) : null}
          </g>
        ) : null,
      )}
      {k >= 4 ? (
        <Muncul>
          <LabelSvg x={x + w / 2 - 55} y={y + h / 2 - 10} w={110} teks={`K=${sisi.reduce((a, b) => a + b, 0)}`} ukuran={14} warna={HIJAU} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Segitiga keliling: sisi menyala berurutan. */
export function SegitigaKeliling({
  k = 0,
  sisi = [5, 4, 7],
}: {
  k?: number;
  sisi?: [number, number, number] | number[];
}) {
  const A = { x: 150, y: 48 };
  const B = { x: 70, y: 155 };
  const C = { x: 230, y: 155 };
  const garis = [
    { a: A, b: B, lx: 95, ly: 95, n: sisi[0] },
    { a: B, b: C, lx: 150, ly: 172, n: sisi[1] },
    { a: C, b: A, lx: 205, ly: 95, n: sisi[2] },
  ];
  return (
    <g>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#FEF3C7" stroke={BIRU} strokeWidth="2" opacity={0.5} />
      {garis.map((g, i) =>
        k >= i ? (
          <g key={i}>
            <line x1={g.a.x} y1={g.a.y} x2={g.b.x} y2={g.b.y} stroke={k === i ? EMAS : BIRU} strokeWidth={k === i ? 5 : 3.5} strokeLinecap="round" />
            <text x={g.lx} y={g.ly} textAnchor="middle" fontSize="13" fontWeight="900" fill={MERAH}>
              {g.n}
            </text>
          </g>
        ) : null,
      )}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={115} y={110} w={70} teks={`K=${sisi[0] + sisi[1] + sisi[2]}`} ukuran={13} warna={HIJAU} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Area/luas: petak di dalam bangun. */
export function BangunLuas({
  x = 80,
  y = 50,
  kolom = 5,
  baris = 3,
  nyala = 99,
  ukuran = 22,
}: {
  x?: number;
  y?: number;
  kolom?: number;
  baris?: number;
  nyala?: number;
  ukuran?: number;
}) {
  const total = kolom * baris;
  return (
    <g>
      {Array.from({ length: total }, (_, i) => {
        const cx = i % kolom;
        const cy = Math.floor(i / kolom);
        if (i >= nyala) return null;
        return (
          <Muncul key={i}>
            <rect
              x={x + cx * ukuran}
              y={y + cy * ukuran}
              width={ukuran - 2}
              height={ukuran - 2}
              rx="3"
              fill={i < nyala ? "#86EFAC" : "#FEF3C7"}
              stroke={BIRU}
              strokeWidth="1.8"
            />
          </Muncul>
        );
      })}
      {nyala >= total ? (
        <Muncul>
          <LabelSvg x={x + (kolom * ukuran) / 2 - 40} y={y + baris * ukuran + 8} w={80} teks={`${kolom}×${baris}=${total}`} ukuran={12} warna={HIJAU} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Pizza pecahan. */
export function PizzaSvg({ x = 150, y = 110, q = 4, p = 1, r = 48, k = 99 }: { x?: number; y?: number; q?: number; p?: number; r?: number; k?: number }) {
  return (
    <g>
      {Array.from({ length: q }, (_, i) => {
        if (i > k) return null;
        const a0 = (i / q) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / q) * Math.PI * 2 - Math.PI / 2;
        const x0 = x + r * Math.cos(a0);
        const y0 = y + r * Math.sin(a0);
        const x1 = x + r * Math.cos(a1);
        const y1 = y + r * Math.sin(a1);
        const large = (2 * Math.PI) / q > Math.PI ? 1 : 0;
        const d = `M ${x} ${y} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
        return <path key={i} d={d} fill={i < p ? "#F59E0B" : "#FEF3C7"} stroke={BIRU} strokeWidth="2.2" className={i === k ? "vc-pop" : undefined} />;
      })}
      {k >= q - 1 ? (
        <text x={x} y={y + r + 22} textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
          {p}/{q}
        </text>
      ) : null}
    </g>
  );
}

/** Batang pecahan horizontal. */
export function BatangPecahanSvg({ x = 60, y = 100, q = 4, p = 1, w = 180, h = 32, k = 99 }: { x?: number; y?: number; q?: number; p?: number; w?: number; h?: number; k?: number }) {
  const cell = w / q;
  return (
    <g>
      {Array.from({ length: q }, (_, i) =>
        i <= k ? (
          <rect key={i} x={x + i * cell} y={y} width={cell - 2} height={h} rx={4} fill={i < p ? "#F59E0B" : "#FEF3C7"} stroke={BIRU} strokeWidth="1.8" />
        ) : null,
      )}
      {k >= q - 1 ? (
        <text x={x + w / 2} y={y + h + 20} textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
          {p}/{q}
        </text>
      ) : null}
    </g>
  );
}

/** Garis bilangan dengan sorot. */
export function GarisBilanganSvg({
  x = 30,
  y = 120,
  dari = 0,
  sampai = 10,
  skala = 24,
  sorot = [],
  panah = null,
}: {
  x?: number;
  y?: number;
  dari?: number;
  sampai?: number;
  skala?: number;
  sorot?: number[];
  panah?: [number, number] | null;
}) {
  const n = sampai - dari;
  return (
    <g>
      <line x1={x} y1={y} x2={x + n * skala} y2={y} stroke={BIRU} strokeWidth="3.5" strokeLinecap="round" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = dari + i;
        const cx = x + i * skala;
        const aktif = sorot.includes(v);
        return (
          <g key={v}>
            <line x1={cx} y1={y - 8} x2={cx} y2={y + 8} stroke={BIRU} strokeWidth="2" />
            <circle cx={cx} cy={y} r={aktif ? 7 : 4} fill={aktif ? EMAS : "#FFFFFF"} stroke={BIRU} strokeWidth="2" />
            <text x={cx} y={y + 24} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
              {v}
            </text>
          </g>
        );
      })}
      {panah ? (
        <Lompat>
          <line x1={x + (panah[0] - dari) * skala} y1={y - 22} x2={x + (panah[1] - dari) * skala} y2={y - 22} stroke={MERAH} strokeWidth="3" markerEnd="url(#panahMerah)" />
        </Lompat>
      ) : null}
    </g>
  );
}

/** Sudut dengan busur; derajat muncul bertahap. */
export function SudutSvg({
  x = 150,
  y = 140,
  deg = 60,
  k = 0,
  r = 70,
}: {
  x?: number;
  y?: number;
  deg?: number;
  k?: number;
  r?: number;
}) {
  const rad = (deg * Math.PI) / 180;
  const x2 = x + r * Math.cos(-Math.PI / 2);
  const y2 = y + r * Math.sin(-Math.PI / 2);
  const x3 = x + r * Math.cos(-Math.PI / 2 + rad);
  const y3 = y + r * Math.sin(-Math.PI / 2 + rad);
  const busurR = 28;
  const large = deg > 180 ? 1 : 0;
  const bx0 = x + busurR * Math.cos(-Math.PI / 2);
  const by0 = y + busurR * Math.sin(-Math.PI / 2);
  const bx1 = x + busurR * Math.cos(-Math.PI / 2 + rad);
  const by1 = y + busurR * Math.sin(-Math.PI / 2 + rad);
  return (
    <g>
      {k >= 0 ? <line x1={x} y1={y} x2={x2} y2={y2} stroke={BIRU} strokeWidth="4" strokeLinecap="round" /> : null}
      {k >= 1 ? <line x1={x} y1={y} x2={x3} y2={y3} stroke={BIRU} strokeWidth="4" strokeLinecap="round" /> : null}
      {k >= 2 ? <path d={`M ${bx0} ${by0} A ${busurR} ${busurR} 0 ${large} 1 ${bx1} ${by1}`} fill="none" stroke={EMAS} strokeWidth="3.5" className="vc-denyut" /> : null}
      {k >= 3 ? (
        <Muncul>
          <text x={x + 36} y={y - 20} fontSize="18" fontWeight="900" fill={MERAH}>
            {deg}°
          </text>
        </Muncul>
      ) : null}
      <circle cx={x} cy={y} r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

/** Diagram batang sederhana. */
export function BatangDataSvg({
  x = 50,
  y = 160,
  data = [
    { n: 3, label: "A" },
    { n: 5, label: "B" },
    { n: 2, label: "C" },
  ],
  k = 99,
  maks = 6,
  tinggi = 100,
}: {
  x?: number;
  y?: number;
  data?: { n: number; label: string }[];
  k?: number;
  maks?: number;
  tinggi?: number;
}) {
  const lebar = 36;
  const gap = 18;
  return (
    <g>
      <line x1={x - 10} y1={y} x2={x + data.length * (lebar + gap)} y2={y} stroke={BIRU} strokeWidth="2.5" />
      {data.map((d, i) => {
        if (i > k) return null;
        const h = (d.n / maks) * tinggi;
        return (
          <Muncul key={d.label}>
            <rect x={x + i * (lebar + gap)} y={y - h} width={lebar} height={h} rx="6" fill={i === k ? EMAS : "#60A5FA"} stroke={BIRU} strokeWidth="2" />
            <text x={x + i * (lebar + gap) + lebar / 2} y={y + 16} textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              {d.label}
            </text>
            <text x={x + i * (lebar + gap) + lebar / 2} y={y - h - 6} textAnchor="middle" fontSize="13" fontWeight="900" fill={MERAH}>
              {d.n}
            </text>
          </Muncul>
        );
      })}
    </g>
  );
}

/** Piktogram: baris ikon. */
export function PiktogramSvg({ x = 40, y = 70, e = "⭐", baris = [3, 5, 2], k = 99, label = ["A", "B", "C"] }: { x?: number; y?: number; e?: string; baris?: number[]; k?: number; label?: string[] }) {
  return (
    <g>
      {baris.map((n, i) =>
        i <= k ? (
          <g key={i}>
            <text x={x} y={y + i * 36 + 8} fontSize="13" fontWeight="900" fill={BIRU}>
              {label[i] ?? String(i + 1)}
            </text>
            {Array.from({ length: n }, (_, j) => (
              <text key={j} x={x + 28 + j * 22} y={y + i * 36 + 10} fontSize="18" aria-hidden="true">
                {e}
              </text>
            ))}
          </g>
        ) : null,
      )}
    </g>
  );
}

/** Kubus / balok isometrik sederhana. */
export function KubusSvg({ x = 110, y = 50, s = 55, k = 0, balok = false }: { x?: number; y?: number; s?: number; k?: number; balok?: boolean }) {
  const w = balok ? s * 1.4 : s;
  const h = s;
  const d = s * 0.45;
  const muka = `${x},${y + d} ${x + w},${y + d} ${x + w},${y + d + h} ${x},${y + d + h}`;
  const atas = `${x},${y + d} ${x + d * 0.7},${y} ${x + w + d * 0.7},${y} ${x + w},${y + d}`;
  const samping = `${x + w},${y + d} ${x + w + d * 0.7},${y} ${x + w + d * 0.7},${y + h} ${x + w},${y + d + h}`;
  return (
    <g>
      {k >= 0 ? <polygon points={muka} fill="#BFDBFE" stroke={BIRU} strokeWidth="2.5" /> : null}
      {k >= 1 ? <polygon points={atas} fill="#DBEAFE" stroke={BIRU} strokeWidth="2.5" /> : null}
      {k >= 2 ? <polygon points={samping} fill="#93C5FD" stroke={BIRU} strokeWidth="2.5" /> : null}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={x + 10} y={y + d + h + 8} w={balok ? 90 : 70} teks={balok ? "balok" : "kubus"} ukuran={13} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Skala peluang 5 tangga. */
export function SkalaPeluangSvg({ k = 0, aktif = 2 }: { k?: number; aktif?: number }) {
  const tangga = [
    { t: "0", c: "#94A3B8" },
    { t: "kurang", c: "#7DD3FC" },
    { t: "mungkin", c: "#FDE68A" },
    { t: "sangat", c: "#FDBA74" },
    { t: "pasti", c: "#86EFAC" },
  ];
  return (
    <g>
      {tangga.map((g, i) =>
        i <= k ? (
          <g key={g.t}>
            <rect
              x={28 + i * 52}
              y={90}
              width={46}
              height={70}
              rx="10"
              fill={g.c}
              stroke={i === aktif && k >= aktif ? EMAS : BIRU}
              strokeWidth={i === aktif && k >= aktif ? 4 : 2}
            />
            <text x={51 + i * 52} y={130} textAnchor="middle" fontSize="10" fontWeight="900" fill={BIRU}>
              {g.t}
            </text>
          </g>
        ) : null,
      )}
      {k >= 4 ? (
        <Muncul>
          <Sorot x={28 + aktif * 52 - 4} y={86} w={54} h={78} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Dadu SVG. */
export function DaduSvg({ x = 120, y = 70, sisi = 6, k = 0 }: { x?: number; y?: number; sisi?: number; k?: number }) {
  const titik: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    2: [
      [0.28, 0.28],
      [0.72, 0.72],
    ],
    3: [
      [0.28, 0.28],
      [0.5, 0.5],
      [0.72, 0.72],
    ],
    4: [
      [0.28, 0.28],
      [0.72, 0.28],
      [0.28, 0.72],
      [0.72, 0.72],
    ],
    5: [
      [0.28, 0.28],
      [0.72, 0.28],
      [0.5, 0.5],
      [0.28, 0.72],
      [0.72, 0.72],
    ],
    6: [
      [0.28, 0.25],
      [0.72, 0.25],
      [0.28, 0.5],
      [0.72, 0.5],
      [0.28, 0.75],
      [0.72, 0.75],
    ],
  };
  const s = 70;
  const pts = titik[Math.min(6, Math.max(1, sisi))] ?? titik[6];
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.5" />
      {k >= 1
        ? pts.map(([px, py], i) => <circle key={i} cx={x + px * s} cy={y + py * s} r="6" fill={BIRU} className={i === pts.length - 1 ? "vc-pop" : undefined} />)
        : null}
      {k >= 2 ? (
        <Muncul>
          <text x={x + s / 2} y={y + s + 22} textAnchor="middle" fontSize="14" fontWeight="900" fill={MERAH}>
            1 dari 6
          </text>
        </Muncul>
      ) : null}
    </g>
  );
}

/** Koin dua sisi. */
export function KoinSvg({ x = 150, y = 100, k = 0, sisi = "A" }: { x?: number; y?: number; k?: number; sisi?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="42" fill="#FDE68A" stroke={BIRU} strokeWidth="3.5" />
      {k >= 1 ? (
        <text x={x} y={y + 8} textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
          {sisi}
        </text>
      ) : null}
      {k >= 2 ? (
        <Muncul>
          <text x={x} y={y + 62} textAnchor="middle" fontSize="14" fontWeight="900" fill={HIJAU}>
            1/2
          </text>
        </Muncul>
      ) : null}
    </g>
  );
}

/** Roda putar sederhana. */
export function RodaSvg({ x = 150, y = 105, k = 0 }: { x?: number; y?: number; k?: number }) {
  const sektor = [
    { p: 0.5, c: "#F87171" },
    { p: 0.25, c: "#60A5FA" },
    { p: 0.25, c: "#4ADE80" },
  ];
  let sudut = -Math.PI / 2;
  const r = 50;
  return (
    <g>
      {sektor.map((s, i) => {
        if (i > k) {
          return null;
        }
        const a0 = sudut;
        const a1 = sudut + s.p * Math.PI * 2;
        sudut = a1;
        const x0 = x + r * Math.cos(a0);
        const y0 = y + r * Math.sin(a0);
        const x1 = x + r * Math.cos(a1);
        const y1 = y + r * Math.sin(a1);
        const large = s.p > 0.5 ? 1 : 0;
        return <path key={i} d={`M ${x} ${y} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`} fill={s.c} stroke={BIRU} strokeWidth="2" />;
      })}
      {k >= 2 ? <polygon points={`${x},${y - r - 8} ${x - 8},${y - r + 6} ${x + 8},${y - r + 6}`} fill={EMAS} stroke={BIRU} strokeWidth="2" /> : null}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={x - 55} y={y + r + 8} w={110} teks="area ≈ peluang" ukuran={11} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Rasio dua batang banding. */
export function RasioBatangSvg({ a = 2, b = 3, k = 0 }: { a?: number; b?: number; k?: number }) {
  const unit = 28;
  return (
    <g>
      <text x="40" y="70" fontSize="14" fontWeight="900" fill={BIRU}>
        A
      </text>
      {k >= 0
        ? Array.from({ length: a }, (_, i) => <rect key={`a${i}`} x={60 + i * (unit + 4)} y={50} width={unit} height={28} rx="6" fill="#60A5FA" stroke={BIRU} strokeWidth="2" />)
        : null}
      <text x="40" y="120" fontSize="14" fontWeight="900" fill={BIRU}>
        B
      </text>
      {k >= 1
        ? Array.from({ length: b }, (_, i) => <rect key={`b${i}`} x={60 + i * (unit + 4)} y={100} width={unit} height={28} rx="6" fill="#F472B6" stroke={BIRU} strokeWidth="2" />)
        : null}
      {k >= 2 ? (
        <Muncul>
          <LabelSvg x={100} y={150} w={100} teks={`${a} : ${b}`} ukuran={16} warna={HIJAU} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Pola bentuk berulang. */
export function PolaBentukSvg({ k = 0 }: { k?: number }) {
  const bentuk = ["▲", "●", "■", "▲", "●", "■"];
  return (
    <g>
      {bentuk.map((e, i) =>
        i <= k + 2 ? (
          <text key={i} x={40 + i * 42} y={120} textAnchor="middle" fontSize={i === k + 2 && k < 3 ? 34 : 28} fill={i === k + 2 ? MERAH : BIRU} fontWeight="900">
            {e}
          </text>
        ) : (
          <text key={i} x={40 + i * 42} y={120} textAnchor="middle" fontSize="28" fill="#94A3B8" fontWeight="900">
            ?
          </text>
        ),
      )}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={90} y={145} w={120} teks="pola berulang" ukuran={12} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Banding dua bilangan dengan mulut/tanda. */
export function BandingSvg({ a = 8750, b = 7500, k = 0 }: { a?: number; b?: number; k?: number }) {
  const tanda = a > b ? ">" : a < b ? "<" : "=";
  return (
    <g>
      {k >= 0 ? (
        <text x="70" y="115" textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
          {a}
        </text>
      ) : null}
      {k >= 1 ? (
        <Lompat>
          <text x="150" y="118" textAnchor="middle" fontSize="36" fontWeight="900" fill={EMAS}>
            {tanda}
          </text>
        </Lompat>
      ) : null}
      {k >= 2 ? (
        <text x="230" y="115" textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
          {b}
        </text>
      ) : null}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={90} y={145} w={120} teks="banding kiri dulu" ukuran={11} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Operasi bersusun sederhana (+ atau −). */
export function SusunSvg({ atas = 189, bawah = 245, hasil = 434, op = "+", k = 0 }: { atas?: number; bawah?: number; hasil?: number; op?: "+" | "−"; k?: number }) {
  return (
    <g>
      <text x="200" y="70" textAnchor="end" fontSize="26" fontWeight="900" fill={BIRU}>
        {k >= 0 ? atas : ""}
      </text>
      <text x="120" y="105" fontSize="26" fontWeight="900" fill={MERAH}>
        {k >= 1 ? op : ""}
      </text>
      <text x="200" y="105" textAnchor="end" fontSize="26" fontWeight="900" fill={BIRU}>
        {k >= 1 ? bawah : ""}
      </text>
      {k >= 2 ? <line x1="110" y1="118" x2="210" y2="118" stroke={BIRU} strokeWidth="3" /> : null}
      <text x="200" y="150" textAnchor="end" fontSize="28" fontWeight="900" fill={HIJAU}>
        {k >= 3 ? hasil : ""}
      </text>
    </g>
  );
}

/** Faktor / kelipatan: baris bilangan. */
export function DeretSvg({ isi = [3, 6, 9, 12, 15], k = 0, judul = "kelipatan 3" }: { isi?: number[]; k?: number; judul?: string }) {
  return (
    <g>
      {isi.map((n, i) =>
        i <= k ? (
          <Muncul key={n}>
            <rect x={25 + i * 52} y={85} width={46} height={46} rx="10" fill={i === k ? EMAS : "#DBEAFE"} stroke={BIRU} strokeWidth="2.5" />
            <text x={48 + i * 52} y={115} textAnchor="middle" fontSize="18" fontWeight="900" fill={BIRU}>
              {n}
            </text>
          </Muncul>
        ) : null,
      )}
      {k >= isi.length - 1 ? (
        <Muncul>
          <LabelSvg x={80} y={150} w={140} teks={judul} ukuran={12} />
        </Muncul>
      ) : null}
    </g>
  );
}

/** Volume: petak 3D sederhana (lapisan). */
export function VolumePetakSvg({ k = 0, p = 3, l = 2, t = 2 }: { k?: number; p?: number; l?: number; t?: number }) {
  const ukuran = 18;
  return (
    <g>
      {Array.from({ length: t }, (_, z) =>
        Array.from({ length: l }, (_, y) =>
          Array.from({ length: p }, (_, x) => {
            const idx = z * l * p + y * p + x;
            if (idx > k + 2) return null;
            const ox = 90 + x * ukuran + z * 8;
            const oy = 130 - y * ukuran - z * 10;
            return <rect key={`${x}-${y}-${z}`} x={ox} y={oy} width={ukuran - 2} height={ukuran - 2} fill="#93C5FD" stroke={BIRU} strokeWidth="1.5" opacity={0.9 - z * 0.15} />;
          }),
        ),
      )}
      {k >= 3 ? (
        <Muncul>
          <LabelSvg x={95} y={160} w={110} teks={`${p}×${l}×${t}=${p * l * t}`} ukuran={12} warna={HIJAU} />
        </Muncul>
      ) : null}
    </g>
  );
}
