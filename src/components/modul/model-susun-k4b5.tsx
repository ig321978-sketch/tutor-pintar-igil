"use client";

import React from "react";
import type { Perempat, Pt } from "./lab-susun-k4b5b";

/**
 * Gambar model Kelas 4 Bab 5 Sub-Bab B: papan petak berisi segitiga perempat (keping susun dan tangram), dan bangun
 * yang dipotong dari titik ke titik. Hanya bentuk polos berwarna dan titik, bukan gambar benda, sehingga batas
 * Concrete dan Picture terjaga. Bentuk dan nama bangun dihitung di lab-susun-k4b5b.ts.
 */
export const WARNA_KEPING = ["#FFE566", "#C7D2FE", "#FDBA74", "#A5F3FC", "#BBF7D0", "#F9A8D4", "#DDD6FE", "#FDE68A"];
const BIRU = "#1C01A5";

const titikPx = ([r, c, q]: Perempat, s: number): string => {
  const tl = [c * s, r * s];
  const tr = [(c + 1) * s, r * s];
  const br = [(c + 1) * s, (r + 1) * s];
  const bl = [c * s, (r + 1) * s];
  const tengah = [(c + 0.5) * s, (r + 0.5) * s];
  const tepi = [[tl, tr], [tr, br], [br, bl], [bl, tl]][q];
  return [...tepi, tengah].map((p) => p.join(",")).join(" ");
};

/** Papan petak. `isi`: perempat terisi dan nomor kepingnya (warna). `bayang`: perempat siluet. Petak berupa tombol. */
export function PapanPerempat({
  baris,
  kolom,
  ukuran,
  isi,
  bayang = [],
  label,
  labelSel,
  onKetuk,
}: {
  baris: number;
  kolom: number;
  ukuran: number;
  isi: { q: Perempat; k: number }[];
  bayang?: Perempat[];
  label: string;
  labelSel?: (r: number, c: number) => string;
  onKetuk?: (r: number, c: number) => void;
}) {
  const w = kolom * ukuran;
  const h = baris * ukuran;
  return (
    <div className="relative mx-auto border-4 border-[#1C01A5] bg-white" style={{ width: w + 8, height: h + 8 }} role="group" aria-label={label}>
      <svg width={w} height={h} className="absolute left-0 top-0" aria-hidden="true">
        {Array.from({ length: baris * kolom }, (_, i) => {
          const r = Math.floor(i / kolom);
          const c = i % kolom;
          return <rect key={i} x={c * ukuran} y={r * ukuran} width={ukuran} height={ukuran} fill="none" stroke={BIRU} strokeOpacity={0.25} strokeDasharray="3 3" />;
        })}
        {bayang.map((q) => (
          <polygon key={`b${q.join()}`} points={titikPx(q, ukuran)} fill="#1C01A5" fillOpacity={0.14} stroke="#1C01A5" strokeOpacity={0.14} />
        ))}
        {isi.map(({ q, k }) => (
          <polygon key={`i${q.join()}`} points={titikPx(q, ukuran)} fill={WARNA_KEPING[k % WARNA_KEPING.length]} stroke={WARNA_KEPING[k % WARNA_KEPING.length]} strokeWidth={0.8} />
        ))}
        {/* Garis tepi tiap keping: ruas perempat yang tetangganya milik keping lain atau kosong. */}
        {isi.flatMap(({ q, k }) => {
          const [r, c, a] = q;
          const pemilik = (qq: Perempat) => isi.find((x) => x.q[0] === qq[0] && x.q[1] === qq[1] && x.q[2] === qq[2])?.k;
          const luar: Perempat = a === 0 ? [r - 1, c, 2] : a === 1 ? [r, c + 1, 3] : a === 2 ? [r + 1, c, 0] : [r, c - 1, 1];
          const garis: React.ReactNode[] = [];
          const t = titikPx(q, ukuran).split(" ").map((p) => p.split(",").map(Number));
          if (pemilik(luar) !== k) garis.push(<line key={`o${q.join()}`} x1={t[0][0]} y1={t[0][1]} x2={t[1][0]} y2={t[1][1]} stroke={BIRU} strokeWidth={2.5} />);
          if (pemilik([r, c, (a + 3) % 4]) !== k) garis.push(<line key={`l${q.join()}`} x1={t[0][0]} y1={t[0][1]} x2={t[2][0]} y2={t[2][1]} stroke={BIRU} strokeWidth={2.5} />);
          if (pemilik([r, c, (a + 1) % 4]) !== k) garis.push(<line key={`r${q.join()}`} x1={t[1][0]} y1={t[1][1]} x2={t[2][0]} y2={t[2][1]} stroke={BIRU} strokeWidth={2.5} />);
          return garis;
        })}
      </svg>
      {onKetuk
        ? Array.from({ length: baris * kolom }, (_, i) => {
            const r = Math.floor(i / kolom);
            const c = i % kolom;
            return (
              <button
                key={i}
                type="button"
                aria-label={labelSel ? labelSel(r, c) : `Petak baris ${r + 1} kolom ${c + 1}`}
                onClick={() => onKetuk(r, c)}
                className="absolute border-0 bg-transparent p-0"
                style={{ left: c * ukuran, top: r * ukuran, width: ukuran, height: ukuran }}
              />
            );
          })
        : null}
    </div>
  );
}

/** Ubah koordinat kisi ke layar: kisi persegi apa adanya, kisi segitiga a·(1, 0) + b·(½, ½√3) dengan sumbu y ke atas. */
const keLayar = (p: Pt, kisi: "persegi" | "segitiga"): [number, number] => (kisi === "persegi" ? [p[0], p[1]] : [p[0] + p[1] / 2, (-p[1] * Math.sqrt(3)) / 2]);

/** Bangun yang sedang diurai: bagian berwarna dan titik yang bisa diketuk. */
export function BangunUrai({
  kisi,
  bagian,
  titik,
  pilih,
  onTitik,
  lebar = 260,
  tinggi = 200,
}: {
  kisi: "persegi" | "segitiga";
  bagian: Pt[][];
  titik: Pt[];
  pilih: number | null;
  onTitik: (i: number) => void;
  lebar?: number;
  tinggi?: number;
}) {
  const semua = titik.map((p) => keLayar(p, kisi));
  const xs = semua.map((p) => p[0]);
  const ys = semua.map((p) => p[1]);
  const pad = 22;
  const k = Math.min((lebar - pad * 2) / (Math.max(...xs) - Math.min(...xs) || 1), (tinggi - pad * 2) / (Math.max(...ys) - Math.min(...ys) || 1));
  const ox = (lebar - (Math.max(...xs) - Math.min(...xs)) * k) / 2 - Math.min(...xs) * k;
  const oy = (tinggi - (Math.max(...ys) - Math.min(...ys)) * k) / 2 - Math.min(...ys) * k;
  const px = (p: Pt): [number, number] => {
    const [x, y] = keLayar(p, kisi);
    return [x * k + ox, y * k + oy];
  };
  return (
    <div className="relative mx-auto" style={{ width: lebar, height: tinggi }}>
      <svg width={lebar} height={tinggi} className="absolute left-0 top-0" aria-hidden="true">
        {bagian.map((b, i) => (
          <polygon key={i} points={b.map((p) => px(p).join(",")).join(" ")} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke={BIRU} strokeWidth={3} strokeLinejoin="round" />
        ))}
      </svg>
      {titik.map((p, i) => {
        const [x, y] = px(p);
        const huruf = String.fromCharCode(65 + i);
        return (
          <button
            key={i}
            type="button"
            aria-label={`Titik ${huruf}`}
            aria-pressed={pilih === i}
            onClick={() => onTitik(i)}
            className="absolute flex items-center justify-center rounded-full border-0 bg-transparent p-0"
            style={{ left: x - 17, top: y - 17, width: 34, height: 34 }}
          >
            <span
              className="flex items-center justify-center rounded-full border-2 border-[#1C01A5] text-[10px] font-black"
              style={{ width: 22, height: 22, background: pilih === i ? "#F0AB00" : "#FFFFFF", color: BIRU }}
            >
              {huruf}
            </span>
          </button>
        );
      })}
    </div>
  );
}
