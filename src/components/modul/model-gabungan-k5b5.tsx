"use client";

import React from "react";
import { irisan, type DenahL, type Tumpukan, type Uraian } from "./lab-gabungan-k5b5c";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B5 Sub-Bab C: bagian bangun yang dijumlahkan, denah L yang  */
/* dipotong dengan dua cara, dan dua persegi panjang yang saling menumpuk.    */
/* Bentuk polos dengan ukuran di sisinya, tanpa gambar benda.                 */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const LANGIT = "#DBEAFE";
const LEBAR = 340;
const TINGGI_GAMBAR = 170;

const Teks = ({ x, y, children, anchor = "middle", kecil = false }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; kecil?: boolean }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={kecil ? 11 : 13} fontWeight={800} fill={BIRU}>
    {children}
  </text>
);
const titik = (p: number[][]): string => p.map(([x, y]) => `${x},${y}`).join(" ");

/** Bagian-bagian bangun gabungan berjajar. Bagian yang sudah dihitung ditebalkan dengan garis emas. */
export function GambarBagian({ u, ok }: { u: Uraian; ok: boolean[] }) {
  const n = u.bagian.length;
  const slot = LEBAR / n;
  const satu = Math.min(...u.bagian.map((b) => Math.min((slot - 36) / b.a, 80 / b.t)));
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`Bangun ${u.nama} terdiri dari ${n} bagian`} className="block">
      {u.bagian.map((b, k) => {
        const w = b.a * satu;
        const h = b.t * satu;
        const x0 = k * slot + (slot - w) / 2;
        const y0 = 34;
        const bawah = y0 + h;
        const poligon =
          b.jenis === "segitiga"
            ? [[x0, bawah], [x0 + w, bawah], [x0 + w * 0.3, y0]]
            : b.jenis === "jajar"
              ? [[x0 + w * 0.25, y0], [x0 + w, y0], [x0 + w * 0.75, bawah], [x0, bawah]]
              : [[x0, y0], [x0 + w, y0], [x0 + w, bawah], [x0, bawah]];
        return (
          <g key={k}>
            <Teks x={k * slot + slot / 2} y={20}>
              Bagian {k + 1}
            </Teks>
            <polygon points={titik(poligon)} fill={ok[k] ? "#FFE566" : MUDA} stroke={ok[k] ? EMAS : BIRU} strokeWidth={ok[k] ? 5 : 3} />
            <Teks x={x0 + w / 2} y={bawah + 18}>
              {b.a}
            </Teks>
            <Teks x={x0 + w + 8} y={y0 + h / 2 + 4} anchor="start">
              {b.t}
            </Teks>
          </g>
        );
      })}
    </svg>
  );
}

/** Denah L dengan takik di sudut kanan atas, dipotong dengan cara 1 (mendatar) atau cara 2 (tegak). */
export function GambarSilang({ d, cara }: { d: DenahL; cara: number }) {
  const satu = Math.min(200 / d.W, 100 / d.H);
  const x0 = (LEBAR - d.W * satu) / 2;
  const y0 = 22;
  const X = (v: number) => x0 + v * satu;
  const Y = (v: number) => y0 + v * satu;
  const bagian = cara === 1 ? [[0, 0, d.W - d.w, d.h], [0, d.h, d.W, d.H - d.h]] : [[0, 0, d.W - d.w, d.H], [d.W - d.w, d.h, d.w, d.H - d.h]];
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`Denah L, persegi panjang ${d.W} kali ${d.H} dengan takik ${d.w} kali ${d.h}, dipotong dengan cara ${cara}`} className="block">
      {bagian.map(([a, b, w, h], k) => (
        <rect key={k} x={X(a)} y={Y(b)} width={w * satu} height={h * satu} fill={k === 0 ? MUDA : LANGIT} stroke={EMAS} strokeWidth={3} strokeDasharray="7 5" />
      ))}
      <polygon points={titik([[X(0), Y(0)], [X(d.W - d.w), Y(0)], [X(d.W - d.w), Y(d.h)], [X(d.W), Y(d.h)], [X(d.W), Y(d.H)], [X(0), Y(d.H)]])} fill="none" stroke={BIRU} strokeWidth={3} />
      <Teks x={X(d.W / 2)} y={Y(d.H) + 18}>{d.W}</Teks>
      <Teks x={X(0) - 8} y={Y(d.H / 2) + 4} anchor="end">{d.H}</Teks>
      <Teks x={X(d.W - d.w / 2)} y={Y(0) + 14}>takik {d.w} kali {d.h}</Teks>
    </svg>
  );
}

/** Dua persegi panjang A dan B yang saling menumpuk. Bagian yang menumpuk diberi warna emas. */
export function GambarTumpang({ t }: { t: Tumpukan }) {
  const lebarTotal = Math.max(t.A.x + t.A.w, t.B.x + t.B.w) - Math.min(t.A.x, t.B.x);
  const tinggiTotal = Math.max(t.A.y + t.A.h, t.B.y + t.B.h) - Math.min(t.A.y, t.B.y);
  const satu = Math.min(240 / lebarTotal, 90 / tinggiTotal);
  const ox = Math.min(t.A.x, t.B.x);
  const oy = Math.min(t.A.y, t.B.y);
  const x0 = (LEBAR - lebarTotal * satu) / 2;
  const y0 = 40;
  const X = (v: number) => x0 + (v - ox) * satu;
  const Y = (v: number) => y0 + (v - oy) * satu;
  const i = irisan(t);
  const kiri = Math.max(t.A.x, t.B.x);
  const atas = Math.max(t.A.y, t.B.y);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`Persegi panjang A ${t.A.w} kali ${t.A.h} dan B ${t.B.w} kali ${t.B.h} saling menumpuk`} className="block">
      <rect x={X(t.A.x)} y={Y(t.A.y)} width={t.A.w * satu} height={t.A.h * satu} fill={MUDA} stroke={BIRU} strokeWidth={3} />
      <rect x={X(t.B.x)} y={Y(t.B.y)} width={t.B.w * satu} height={t.B.h * satu} fill={LANGIT} fillOpacity={0.75} stroke={BIRU} strokeWidth={3} strokeDasharray="6 4" />
      {i.w > 0 && i.h > 0 ? <rect x={X(kiri)} y={Y(atas)} width={i.w * satu} height={i.h * satu} fill={EMAS} fillOpacity={0.65} /> : null}
      <Teks x={X(t.A.x) + 6} y={Y(t.A.y) - 8} anchor="start">A: {t.A.w} kali {t.A.h}</Teks>
      <Teks x={X(t.B.x + t.B.w) - 6} y={Y(t.B.y + t.B.h) + 18} anchor="end">B: {t.B.w} kali {t.B.h}</Teks>
      <Teks x={X(kiri) + (i.w * satu) / 2} y={Y(atas) + (i.h * satu) / 2 + 4} kecil>menumpuk</Teks>
    </svg>
  );
}
