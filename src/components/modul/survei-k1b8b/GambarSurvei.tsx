"use client";

import React from "react";
import { IKON_BALOK, IKON_TITIK, TOPIK, type LangkahDiagram, type Rupa } from "./logika";
import { DASAR_Y, KARTU, LEBAR_ADEGAN, SEL, SUMBU_X, TINGGI_ADEGAN, letakGambar, xKartu, xKolom } from "./periksa";

/**
 * Gambar diagram tegak satu soal CPA Kelas 1 Bab 8 Sub-Bab B. Concrete (benda): gambar benda bertumpuk di lantai mobil, tanpa sumbu, angka, atau tabel.
 * Pictorial (diagram): bentuk polos (bintang, kotak, titik, batang) dengan garis bawah, garis kiri bernomor, dan nama kolom. Abstract (lambang): kartu kata dan angka saja.
 * Gambar renggang dan gambar ganda (centang ganda) hanya muncul pada soal Cari kesalahan.
 */
export const WARNA_KOLOM = ["#16A34A", "#2563EB", "#DB2777", "#D97706"];
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });

export function titikBintang(cx: number, cy: number, r: number): string {
  const p: string[] = [];
  for (let k = 0; k < 10; k += 1) {
    const rr = k % 2 === 0 ? r : r * 0.45;
    const a = (-90 + k * 36) * (Math.PI / 180);
    p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(" ");
}

export type PropsGambar = {
  d: LangkahDiagram;
  rupa: Rupa;
  /** Banyak gambar yang tampak di tiap kolom (bawaan: semua data). */
  jumlah?: readonly number[];
  /** Gambar yang sudah ditandai: "kolom:nomor". */
  tandai?: ReadonlySet<string>;
  /** Kolom yang disorot (dipilih) dan kolom yang salah dipilih. */
  sorot?: number | null;
  salahKol?: number | null;
  onGambar?: (k: number, i: number) => void;
  onKolom?: (k: number) => void;
  label: string;
};

export function GambarSurvei({ d, rupa, jumlah, tandai, sorot = null, salahKol = null, onGambar, onKolom, label }: PropsGambar) {
  const n = d.data.length;
  const jenis = TOPIK[d.topik].jenis;
  const banyak = jumlah ?? d.data;
  const tinggiMax = Math.max(...banyak, d.cacat?.j === "renggang" ? d.cacat.tinggi : 0, 1);
  const warnaSorot = (k: number) => (salahKol === k ? MERAH : sorot === k ? "#15803D" : null);

  if (rupa === "lambang") {
    return (
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label={label}>
        <text x={150} y={30} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {TOPIK[d.topik].nama}
        </text>
        {d.data.map((v, k) => {
          const x = xKartu(k, n);
          const w = warnaSorot(k);
          return (
            <g key={k} {...(onKolom ? ketuk(() => onKolom(k)) : {})} aria-label={`${jenis[k].nama} ${v}`}>
              <rect x={x - KARTU.w / 2} y={KARTU.y} width={KARTU.w} height={KARTU.h} rx={10} fill="#FFFBEB" stroke={w ?? "#B45309"} strokeWidth={w ? 4 : 2.4} />
              <text x={x} y={KARTU.y + 20} textAnchor="middle" fontSize={10} fontWeight={900} fill="#78350F">
                {jenis[k].nama}
              </text>
              <text x={x} y={KARTU.y + 44} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
                {v}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  const benda = rupa === "benda";
  const gambarItem = (k: number, i: number, x: number, y: number, ganda = false) => {
    const w = WARNA_KOLOM[k % WARNA_KOLOM.length];
    const redup = ganda ? { opacity: 0.55 } : {};
    if (benda) {
      const ikon = d.bentuk === "balok" ? IKON_BALOK : d.bentuk === "titik" ? IKON_TITIK[k % IKON_TITIK.length] : jenis[k].ikon;
      return (
        <text key={`${k}-${i}`} x={x} y={y + 4.5} textAnchor="middle" fontSize={d.bentuk === "igil" || d.bentuk === "batang" ? 12.5 : 11.5} {...redup}>
          {ikon}
        </text>
      );
    }
    if (d.bentuk === "igil") return <polygon key={`${k}-${i}`} points={titikBintang(x, y, 6.4)} fill={w} stroke="#1C01A5" strokeWidth={0.6} {...redup} />;
    if (d.bentuk === "balok") return <rect key={`${k}-${i}`} x={x - 6.5} y={y - 6.5} width={13} height={13} rx={1.5} fill={w} stroke="#1C01A5" strokeWidth={0.8} {...redup} />;
    if (d.bentuk === "titik") return <circle key={`${k}-${i}`} cx={x} cy={y} r={4.6} fill={w} stroke="#1C01A5" strokeWidth={0.6} {...redup} />;
    return <rect key={`${k}-${i}`} x={x - 13} y={y - SEL / 2} width={26} height={SEL} fill={w} fillOpacity={0.75} stroke="#FFFFFF" strokeWidth={1.2} {...redup} />;
  };

  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label={label}>
      {benda ? <rect x={6} y={DASAR_Y + 2} width={288} height={6} rx={3} fill="#4ADE80" stroke="#15803D" strokeWidth={1} /> : null}
      {!benda ? (
        <g aria-hidden="true">
          <line x1={SUMBU_X} x2={290} y1={DASAR_Y} y2={DASAR_Y} stroke={UNGU} strokeWidth={2} />
          <line x1={SUMBU_X} x2={SUMBU_X} y1={DASAR_Y} y2={DASAR_Y - tinggiMax * SEL - 4} stroke={UNGU} strokeWidth={2} />
          {Array.from({ length: tinggiMax }, (_, i) => (
            <g key={i}>
              <line x1={SUMBU_X + 2} x2={290} y1={DASAR_Y - (i + 1) * SEL} y2={DASAR_Y - (i + 1) * SEL} stroke="#CBD5E1" strokeWidth={0.5} />
              <text x={SUMBU_X - 4} y={DASAR_Y - (i + 0.5) * SEL + 2.6} textAnchor="end" fontSize={7} fontWeight={700} fill={UNGU}>
                {i + 1}
              </text>
            </g>
          ))}
        </g>
      ) : null}
      {d.data.map((_, k) => {
        const x = xKolom(k, n);
        const w = warnaSorot(k);
        const tinggi = d.cacat?.j === "renggang" && d.cacat.k === k ? d.cacat.tinggi : undefined;
        const tampak = banyak[k];
        return (
          <g key={k} aria-label={`kolom ${jenis[k].nama}`}>
            {w ? <rect x={x - 28} y={DASAR_Y - tinggiMax * SEL - 8} width={56} height={tinggiMax * SEL + 30} rx={8} fill="none" stroke={w} strokeWidth={3.5} /> : null}
            {Array.from({ length: tampak }, (_, i) => {
              const p = letakGambar(k, i, n, tampak, tinggi);
              const ditandai = tandai?.has(`${k}:${i}`) ?? false;
              return (
                <g key={i} {...(onGambar ? ketuk(() => onGambar(k, i)) : {})}>
                  {gambarItem(k, i, p.x, p.y)}
                  {onGambar ? <rect x={p.x - 13} y={p.y - SEL / 2} width={26} height={SEL} fill="transparent" /> : null}
                  {ditandai ? (
                    <g aria-hidden="true" pointerEvents="none">
                      <line x1={p.x - 5} x2={p.x + 5} y1={p.y - 5} y2={p.y + 5} stroke={MERAH} strokeWidth={2} strokeLinecap="round" />
                      <line x1={p.x - 5} x2={p.x + 5} y1={p.y + 5} y2={p.y - 5} stroke={MERAH} strokeWidth={2} strokeLinecap="round" />
                    </g>
                  ) : null}
                </g>
              );
            })}
            {d.cacat?.j === "dobel" && d.cacat.k === k ? (
              <g aria-label="centang ganda">
                {gambarItem(k, tampak, x, letakGambar(k, tampak, n, tampak + 1).y, true)}
                <circle cx={x} cy={letakGambar(k, tampak, n, tampak + 1).y} r={8.5} fill="none" stroke={MERAH} strokeWidth={1.6} strokeDasharray="3 2" />
              </g>
            ) : null}
            {onKolom ? <rect x={x - 28} y={DASAR_Y - tinggiMax * SEL - 8} width={56} height={tinggiMax * SEL + 30} fill="transparent" {...ketuk(() => onKolom(k))} aria-label={`pilih kolom ${jenis[k].nama}`} /> : null}
            {benda ? (
              <text x={x} y={TINGGI_ADEGAN - 8} textAnchor="middle" fontSize={17}>
                {jenis[k].ikon}
              </text>
            ) : (
              <text x={x} y={DASAR_Y + 15} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                {jenis[k].nama}
              </text>
            )}
          </g>
        );
      })}
      {d.cacat?.j === "dobel" ? (
        <text x={150} y={26} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={MERAH}>
          satu anak mencentang dua jawaban
        </text>
      ) : null}
    </svg>
  );
}

