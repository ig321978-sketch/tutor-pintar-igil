"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Diagram Kelas 3 Bab 3 Sub-Bab C dan D (berat), tahap Picture dan Abstract:     */
/* layar timbangan polos, jarum timbangan duduk polos, dan garis berat. Hanya     */
/* garis, angka, dan batang berwarna. TIDAK ada gambar benda dan tidak ada emoji. */
/* Benda nyata (timbangan dengan benda, bandul) ada di berkas dasar bab ini.      */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

/** Layar timbangan digital polos: angka dalam gram pada layar hijau. */
export function LayarTimbangan({ gram, ringkas = false }: { gram: number; ringkas?: boolean }) {
  return (
    <svg viewBox="0 0 160 70" className={`mx-auto block h-auto w-full ${ringkas ? "max-w-[150px]" : "max-w-[220px]"}`} role="img" aria-label={`Layar timbangan menunjukkan ${gram} gram`}>
      <rect x="2" y="2" width="156" height="66" rx="10" fill="#4B5563" stroke={TINTA} strokeWidth="2.4" />
      <rect x="10" y="10" width="140" height="50" rx="6" fill="#D9F99D" stroke="#14532D" strokeWidth="2" />
      <text x="118" y="46" textAnchor="end" fontSize="34" fontWeight="900" fill="#14532D" fontFamily="ui-monospace, Menlo, Consolas, monospace">
        {gram}
      </text>
      <text x="123" y="46" fontSize="19" fontWeight="900" fill="#14532D">
        g
      </text>
    </svg>
  );
}

/** Titik pada lingkaran berjari-jari r, sudut dalam derajat searah jarum jam dari atas. */
const titikLingkar = (r: number, derajat: number) => {
  const rad = (derajat * Math.PI) / 180;
  return { x: 100 + r * Math.sin(rad), y: 100 - r * Math.cos(rad) };
};

/**
 * Jarum timbangan duduk polos. Satu putaran penuh sama dengan 5 kg (angka 0 sampai 4 kg), tiap garis kecil 100 g.
 * Jarum menunjuk `gram` (0 sampai 4.900).
 */
export function JarumTimbangan({ gram, ringkas = false }: { gram: number; ringkas?: boolean }) {
  const sudut = (gram / 5000) * 360;
  const ujung = titikLingkar(64, sudut);
  return (
    <svg viewBox="0 0 200 200" className={`mx-auto block h-auto w-full ${ringkas ? "max-w-[130px]" : "max-w-[210px]"}`} role="img" aria-label={`Jarum timbangan menunjuk ${gram} gram`}>
      <circle cx="100" cy="100" r="94" fill="#EFF6FF" stroke={TINTA} strokeWidth="4" />
      {Array.from({ length: 50 }, (_, i) => {
        const besar = i % 10 === 0;
        const a = titikLingkar(86, i * 7.2);
        const b = titikLingkar(besar ? 70 : i % 5 === 0 ? 76 : 80, i * 7.2);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={TINTA} strokeWidth={besar ? 3.2 : i % 5 === 0 ? 2.2 : 1.2} />;
      })}
      <line x1="100" y1="100" x2={ujung.x} y2={ujung.y} stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((k) => {
        const t = titikLingkar(54, k * 72);
        return (
          <text key={k} x={t.x} y={t.y + 8} textAnchor="middle" fontSize={ringkas ? 26 : 22} fontWeight="900" fill={TINTA} stroke="#EFF6FF" strokeWidth="5" paintOrder="stroke">
            {k}
          </text>
        );
      })}
      <text x="100" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill={TINTA} stroke="#EFF6FF" strokeWidth="4" paintOrder="stroke">
        kg
      </text>
      <circle cx="100" cy="100" r="8" fill={TINTA} />
    </svg>
  );
}

/**
 * Garis berat 0 sampai `kg` kilogram. Batang berwarna menunjukkan `gram`. Penanda tiap 500 g, angka tiap 1 kg.
 * Dipakai tahap Picture bab hubungan satuan berat.
 */
export function GarisBeratSvg({ gram, kg = 4, ringkas = false }: { gram: number; kg?: number; ringkas?: boolean }) {
  return <GarisBeratDasar batang={[{ dari: 0, sampai: gram, warna: "#F87171", y: 6 }]} kg={kg} ringkas={ringkas} label={`Garis berat dari 0 sampai ${kg} kilogram dengan batang sebesar ${gram} gram`} />;
}

/** Dua batang yang disambung: batang pertama lalu batang kedua. */
export function GarisBeratSambung({ a, b, kg = 4 }: { a: number; b: number; kg?: number }) {
  return (
    <GarisBeratDasar
      batang={[
        { dari: 0, sampai: a, warna: "#F87171", y: 6 },
        { dari: a, sampai: a + b, warna: "#60A5FA", y: 6 },
      ]}
      kg={kg}
      label={`Dua batang disambung: ${a} gram lalu ${b} gram`}
    />
  );
}

/** Dua batang berhimpit dari 0 (membandingkan dua berat). */
export function GarisBeratDua({ a, b, kg = 4 }: { a: number; b: number; kg?: number }) {
  return (
    <GarisBeratDasar
      batang={[
        { dari: 0, sampai: a, warna: "#F87171", y: 2 },
        { dari: 0, sampai: b, warna: "#60A5FA", y: 24 },
      ]}
      kg={kg}
      tinggi={96}
      label={`Dua batang: ${a} gram dan ${b} gram`}
    />
  );
}

function GarisBeratDasar({ batang, kg, ringkas = false, tinggi = 74, label }: { batang: { dari: number; sampai: number; warna: string; y: number }[]; kg: number; ringkas?: boolean; tinggi?: number; label: string }) {
  const W = 300;
  const L = 250;
  const s = L / (kg * 1000);
  const x = (v: number) => 22 + v * s;
  const g = tinggi - 74;
  return (
    <svg viewBox={`0 0 ${W} ${tinggi}`} className="block h-auto w-full max-w-[330px]" role="img" aria-label={label}>
      {batang.map((b, i) => (
        <rect key={i} x={x(b.dari)} y={b.y} width={(b.sampai - b.dari) * s} height="20" rx="6" fill={b.warna} stroke={TINTA} strokeWidth="2.4" />
      ))}
      <rect x="4" y={34 + g} width={W - 8} height="34" rx="6" fill="#FEF3C7" stroke={TINTA} strokeWidth="2.4" />
      {Array.from({ length: kg * 2 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x(i * 500)} x2={x(i * 500)} y1={34 + g} y2={(i % 2 === 0 ? 52 : 46) + g} stroke={TINTA} strokeWidth={i % 2 === 0 ? 2.6 : 1.6} />
          {i % 2 === 0 ? (
            <text x={x(i * 500)} y={65 + g} textAnchor="middle" fontSize={ringkas ? 19 : 12} fontWeight="900" fill={TINTA}>
              {i === 0 ? "0" : `${i / 2} kg`}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
