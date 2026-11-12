"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B7 Sub-Bab B: enam segi empat, uji sejajar dengan garis       */
/* tegak lurus, dan dua bangun untuk tangga hierarki.                           */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const bulat = (n: number) => Math.round(n * 100) / 100;

type Titik = [number, number];
type Empat = [Titik, Titik, Titik, Titik];

/** Titik sudut tiap bangun, berurutan mengelilingi bangun. Sumbu y ke atas. */
export const TITIK_BANGUN: Record<string, Empat> = {
  trapesium: [[0, 0], [8, 0], [6, 3], [1, 3]],
  jajargenjang: [[0, 0], [6, 0], [8, 3], [2, 3]],
  "persegi-panjang": [[0, 0], [6, 0], [6, 3], [0, 3]],
  "belah-ketupat": [[3, 0], [6, 2], [3, 4], [0, 2]],
  persegi: [[0, 0], [4, 0], [4, 4], [0, 4]],
  "layang-layang": [[0, 6], [3, 2], [0, 0], [-3, 2]],
};

/** Ubah koordinat ke kotak gambar: skala seragam, y dibalik, di tengah kotak. */
function pasang(q: Empat, lebar: number, tinggi: number, ox = 0, oy = 0, tambahan: Titik[] = []): { p: Titik[]; skala: number; peta: (t: Titik) => Titik } {
  const semua = [...q, ...tambahan];
  const xs = semua.map((t) => t[0]);
  const ys = semua.map((t) => t[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const skala = Math.min(lebar / Math.max(maxX - minX, 1), tinggi / Math.max(maxY - minY, 1));
  const x0 = ox + (lebar - (maxX - minX) * skala) / 2;
  const y0 = oy + (tinggi - (maxY - minY) * skala) / 2;
  const peta = (t: Titik): Titik => [bulat(x0 + (t[0] - minX) * skala), bulat(y0 + (maxY - t[1]) * skala)];
  return { p: q.map(peta), skala, peta };
}

const vek = (q: Empat, i: number): Titik => [q[(i + 1) % 4][0] - q[i][0], q[(i + 1) % 4][1] - q[i][1]];
const p2 = (v: Titik): number => v[0] * v[0] + v[1] * v[1];
const silang = (u: Titik, v: Titik): number => u[0] * v[1] - u[1] * v[0];
const titikKali = (u: Titik, v: Titik): number => u[0] * v[0] + u[1] * v[1];
const tengah = (a: Titik, b: Titik): Titik => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function Garis({ a, b, warna = BIRU, lebar = 5, putus }: { a: Titik; b: Titik; warna?: string; lebar?: number; putus?: boolean }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={warna} strokeWidth={lebar} strokeLinecap="round" strokeDasharray={putus ? "7 5" : undefined} />;
}

/** Tanda sama panjang: satu atau dua garis kecil tegak lurus di tengah sisi. */
function Tanda({ a, b, n }: { a: Titik; b: Titik; n: number }) {
  const m = tengah(a, b);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const pj = Math.hypot(dx, dy) || 1;
  const nx = (-dy / pj) * 7;
  const ny = (dx / pj) * 7;
  const ux = (dx / pj) * 3;
  const uy = (dy / pj) * 3;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const s = (i - (n - 1) / 2) * 2;
        return <line key={i} x1={bulat(m[0] + ux * s - nx)} y1={bulat(m[1] + uy * s - ny)} x2={bulat(m[0] + ux * s + nx)} y2={bulat(m[1] + uy * s + ny)} stroke={EMAS} strokeWidth={3} strokeLinecap="round" />;
      })}
    </g>
  );
}

/** Tanda sejajar: dua mata panah kecil di tengah sisi. */
function Panah({ a, b }: { a: Titik; b: Titik }) {
  const m: Titik = [a[0] + (b[0] - a[0]) * 0.28, a[1] + (b[1] - a[1]) * 0.28];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const pj = Math.hypot(dx, dy) || 1;
  const ux = dx / pj;
  const uy = dy / pj;
  const nx = -uy;
  const ny = ux;
  const ujung = (geser: number) => {
    const cx = m[0] + ux * geser;
    const cy = m[1] + uy * geser;
    return `M ${bulat(cx - ux * 6 + nx * 6)} ${bulat(cy - uy * 6 + ny * 6)} L ${bulat(cx)} ${bulat(cy)} L ${bulat(cx - ux * 6 - nx * 6)} ${bulat(cy - uy * 6 - ny * 6)}`;
  };
  return <path d={`${ujung(-3)} ${ujung(5)}`} fill="none" stroke={EMAS} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />;
}

/**
 * Satu bangun dengan lapisan ciri yang sudah diperiksa. periksa: indeks ciri (0 sejajar, 1 dua pasang sejajar, 2 siku-siku,
 * 3 empat sisi sama, 4 dua pasang berurutan sama, 5 diagonal tegak lurus).
 */
export function GambarBangun({ bangun, periksa, nama }: { bangun: string; periksa: number[]; nama: string }) {
  const q = TITIK_BANGUN[bangun];
  const { p } = pasang(q, 190, 110, 15, 20);
  const pt = p as unknown as Empat;
  const sejajarPasang = [0, 1].filter((i) => silang(vek(q, i), vek(q, i + 2)) === 0);
  const sisi2 = [0, 1, 2, 3].map((i) => p2(vek(q, i)));
  const tampilPasang = periksa.includes(1) ? sejajarPasang : periksa.includes(0) ? sejajarPasang.slice(0, 1) : [];
  const adaSikuSemua = [0, 1, 2, 3].every((i) => titikKali(vek(q, (i + 3) % 4), vek(q, i)) === 0);
  const sama4 = sisi2.every((v) => v === sisi2[0]);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}`}>
      <polygon points={pt.map((t) => `${t[0]},${t[1]}`).join(" ")} fill={MUDA} stroke={BIRU} strokeWidth={5} strokeLinejoin="round" />
      {tampilPasang.flatMap((i) => [i, i + 2]).map((i) => (
        <Panah key={`a${i}`} a={pt[i]} b={pt[(i + 1) % 4]} />
      ))}
      {periksa.includes(2) && adaSikuSemua
        ? pt.map((t, i) => {
            const m = pt[(i + 1) % 4];
            const k = pt[(i + 3) % 4];
            const u: Titik = [(m[0] - t[0]) / Math.hypot(m[0] - t[0], m[1] - t[1]), (m[1] - t[1]) / Math.hypot(m[0] - t[0], m[1] - t[1])];
            const w: Titik = [(k[0] - t[0]) / Math.hypot(k[0] - t[0], k[1] - t[1]), (k[1] - t[1]) / Math.hypot(k[0] - t[0], k[1] - t[1])];
            return <path key={`s${i}`} d={`M ${bulat(t[0] + u[0] * 11)} ${bulat(t[1] + u[1] * 11)} L ${bulat(t[0] + u[0] * 11 + w[0] * 11)} ${bulat(t[1] + u[1] * 11 + w[1] * 11)} L ${bulat(t[0] + w[0] * 11)} ${bulat(t[1] + w[1] * 11)}`} fill="none" stroke={EMAS} strokeWidth={3} />;
          })
        : null}
      {periksa.includes(3) && sama4 ? pt.map((t, i) => <Tanda key={`m${i}`} a={t} b={pt[(i + 1) % 4]} n={1} />) : null}
      {periksa.includes(4) && !sama4
        ? [0, 1, 2, 3].map((i) => {
            const berurutSama = sisi2[i] === sisi2[(i + 1) % 4] || sisi2[i] === sisi2[(i + 3) % 4];
            if (!berurutSama) return null;
            return <Tanda key={`u${i}`} a={pt[i]} b={pt[(i + 1) % 4]} n={sisi2[i] === sisi2[0] ? 1 : 2} />;
          })
        : null}
      {periksa.includes(5) ? (
        <g>
          <Garis a={pt[0]} b={pt[2]} warna={EMAS} lebar={3} putus />
          <Garis a={pt[1]} b={pt[3]} warna={EMAS} lebar={3} putus />
        </g>
      ) : null}
      {pt.map((t, i) => (
        <circle key={`t${i}`} cx={t[0]} cy={t[1]} r={4} fill={BIRU} />
      ))}
    </svg>
  );
}

/**
 * Uji sejajar. Alas datar. atas: garis putus emas tegak lurus dari kedua ujung sisi atas ke alas.
 * kiri: sisi kiri dan kanan disorot emas. Titik: kiri bawah, kanan bawah, kanan atas, kiri atas.
 */
export function GambarSejajar({ titik, atas, kiri, nama }: { titik: Empat; atas: boolean; kiri: boolean; nama: string }) {
  const { p, peta } = pasang(titik, 190, 110, 15, 20);
  const alasY = peta([0, 0])[1];
  const tl = p[3];
  const tr = p[2];
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}${atas ? ", garis tegak lurus dari sisi atas ke alas" : ""}`}>
      <polygon points={p.map((t) => `${t[0]},${t[1]}`).join(" ")} fill={MUDA} stroke="none" />
      <Garis a={p[0]} b={p[1]} />
      <Garis a={p[1]} b={p[2]} warna={kiri ? EMAS : BIRU} />
      <Garis a={p[2]} b={p[3]} />
      <Garis a={p[3]} b={p[0]} warna={kiri ? EMAS : BIRU} />
      {atas ? (
        <g>
          <Garis a={tl} b={[tl[0], alasY]} warna={EMAS} lebar={3} putus />
          <Garis a={tr} b={[tr[0], alasY]} warna={EMAS} lebar={3} putus />
        </g>
      ) : null}
      {p.map((t, i) => (
        <circle key={i} cx={t[0]} cy={t[1]} r={4} fill={BIRU} />
      ))}
    </svg>
  );
}

/** Dua bangun berdampingan untuk tangga: a di kiri, b di kanan, dengan panah dari a ke b. */
export function GambarTangga({ a, b, namaA, namaB }: { a: string; b: string; namaA: string; namaB: string }) {
  const kiri = pasang(TITIK_BANGUN[a], 80, 80, 8, 30);
  const kanan = pasang(TITIK_BANGUN[b], 80, 80, 132, 30);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${namaA} dan ${namaB}`}>
      <polygon points={kiri.p.map((t) => `${t[0]},${t[1]}`).join(" ")} fill={MUDA} stroke={BIRU} strokeWidth={4} strokeLinejoin="round" />
      <polygon points={kanan.p.map((t) => `${t[0]},${t[1]}`).join(" ")} fill={MUDA} stroke={BIRU} strokeWidth={4} strokeLinejoin="round" strokeDasharray="8 5" />
      <text x={110} y={78} textAnchor="middle" fontSize={22} fontWeight={800} fill={EMAS}>
        ?
      </text>
      <text x={48} y={22} textAnchor="middle" fontSize={11} fontWeight={800} fill={BIRU}>
        {namaA}
      </text>
      <text x={172} y={22} textAnchor="middle" fontSize={11} fontWeight={800} fill={BIRU}>
        {namaB}
      </text>
    </svg>
  );
}
