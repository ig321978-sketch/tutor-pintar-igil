"use client";

import React from "react";

/**
 * Gambar model Kelas 4 Bab 5 Sub-Bab A: papan paku (titik dan ruas garis), bangun polos dari panjang sisi dan besar
 * sudut, serta gambar jalur lurus atau lengkung. Hanya titik, garis, dan bentuk polos berwarna, bukan gambar benda,
 * sehingga batas Concrete dan Picture terjaga. Koordinat di sini hanya untuk menggambar; ciri bangun dihitung di
 * lab-ciri-k4b5a.ts dengan bilangan bulat.
 */
export const BIRU_BANGUN = "#1C01A5";
export const EMAS_BANGUN = "#FFE566";
export const JINGGA_BANGUN = "#F0AB00";

const JARAK = 52;
const TEPI = 22;

/** Papan paku n × n. Paku berupa tombol; karet digambar sebagai garis antarpaku, ditutup putus-putus ke paku pertama. */
export function PapanPaku({
  ukuran,
  paku,
  onKetuk,
}: {
  ukuran: number;
  paku: number[];
  onKetuk: (i: number) => void;
}) {
  const lebar = TEPI * 2 + JARAK * (ukuran - 1);
  const pos = (i: number) => ({ x: TEPI + (i % ukuran) * JARAK, y: TEPI + Math.floor(i / ukuran) * JARAK });
  const titik = paku.map(pos);
  return (
    <div className="relative mx-auto rounded-2xl border-4 border-[#1C01A5] bg-[#FFF8D6]" style={{ width: lebar + 8, height: lebar + 8 }}>
      <svg width={lebar} height={lebar} className="absolute left-0 top-0" aria-hidden="true">
        {titik.length >= 3 ? (
          <polygon points={titik.map((t) => `${t.x},${t.y}`).join(" ")} fill={EMAS_BANGUN} fillOpacity={0.45} stroke="none" />
        ) : null}
        {titik.length >= 2 ? <polyline points={titik.map((t) => `${t.x},${t.y}`).join(" ")} fill="none" stroke={BIRU_BANGUN} strokeWidth={4} strokeLinejoin="round" /> : null}
        {titik.length >= 3 ? (
          <line x1={titik[titik.length - 1].x} y1={titik[titik.length - 1].y} x2={titik[0].x} y2={titik[0].y} stroke={BIRU_BANGUN} strokeWidth={3} strokeDasharray="6 5" />
        ) : null}
      </svg>
      {Array.from({ length: ukuran * ukuran }, (_, i) => {
        const p = pos(i);
        const urut = paku.indexOf(i);
        const pertama = urut === 0;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Paku baris ${Math.floor(i / ukuran) + 1} kolom ${(i % ukuran) + 1}${urut >= 0 ? `, karet ke-${urut + 1}` : ""}`}
            aria-pressed={urut >= 0}
            onClick={() => onKetuk(i)}
            className="absolute flex items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none"
            style={{ left: p.x - 18, top: p.y - 18, width: 36, height: 36 }}
          >
            <span
              className="block rounded-full border-2 border-[#1C01A5]"
              style={{ width: urut >= 0 ? 18 : 12, height: urut >= 0 ? 18 : 12, background: pertama ? JINGGA_BANGUN : urut >= 0 ? BIRU_BANGUN : "#FFFFFF" }}
            />
          </button>
        );
      })}
    </div>
  );
}

type XY = { x: number; y: number };

/** Titik-titik bangun dari panjang sisi (dan sudut bila ada). Segitiga tanpa sudut dibangun dari tiga sisinya. */
function titikBangun(sisi: number[], sudut?: number[]): XY[] {
  if (!sudut && sisi.length === 3) {
    // Sudut terbesar (di hadapan sisi terpanjang c) diletakkan di kiri bawah, sisi p mendatar: mudah dibandingkan
    // dengan pojok buku.
    const [c, p, q] = [...sisi].sort((a, b) => b - a);
    const kos = Math.max(-1, Math.min(1, (p * p + q * q - c * c) / (2 * p * q)));
    const sin = Math.sqrt(1 - kos * kos);
    return [{ x: 0, y: 0 }, { x: p, y: 0 }, { x: q * kos, y: -q * sin }];
  }
  const s = sudut ?? sisi.map(() => 180 - 360 / sisi.length);
  const hasil: XY[] = [{ x: 0, y: 0 }];
  let hadap = 0;
  for (let i = 0; i < sisi.length - 1; i += 1) {
    const a = hasil[hasil.length - 1];
    hasil.push({ x: a.x + sisi[i] * Math.cos((hadap * Math.PI) / 180), y: a.y - sisi[i] * Math.sin((hadap * Math.PI) / 180) });
    hadap += 180 - s[(i + 1) % s.length];
  }
  return hasil;
}

const muat = (t: XY[], w: number, h: number, pad: number): XY[] => {
  const xs = t.map((p) => p.x);
  const ys = t.map((p) => p.y);
  const lx = Math.max(...xs) - Math.min(...xs) || 1;
  const ly = Math.max(...ys) - Math.min(...ys) || 1;
  const k = Math.min((w - pad * 2) / lx, (h - pad * 2) / ly);
  const ox = (w - lx * k) / 2 - Math.min(...xs) * k;
  const oy = (h - ly * k) / 2 - Math.min(...ys) * k;
  return t.map((p) => ({ x: p.x * k + ox, y: p.y * k + oy }));
};

/** Bangun polos untuk Pilah. `label` menampilkan panjang sisi (cm). */
export function GambarBangun({ sisi, sudut, label, w = 104, h = 84 }: { sisi: number[]; sudut?: number[]; label: boolean; w?: number; h?: number }) {
  const t = muat(titikBangun(sisi, sudut), w, h, label ? 16 : 8);
  const urutSisi = !sudut && sisi.length === 3 ? [...sisi].sort((a, b) => b - a) : sisi;
  // Segitiga dari sisi: ruas 0-1 = p (mendatar), 1-2 = c (terpanjang), 2-0 = q.
  const labelSisi = !sudut && sisi.length === 3 ? [urutSisi[1], urutSisi[0], urutSisi[2]] : sisi;
  const cx = t.reduce((a, p) => a + p.x, 0) / t.length;
  const cy = t.reduce((a, p) => a + p.y, 0) / t.length;
  return (
    <svg width={w} height={h} aria-hidden="true">
      <polygon points={t.map((p) => `${p.x},${p.y}`).join(" ")} fill={EMAS_BANGUN} stroke={BIRU_BANGUN} strokeWidth={3} strokeLinejoin="round" />
      {label
        ? t.map((a, i) => {
            const b = t[(i + 1) % t.length];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const dx = mx - cx;
            const dy = my - cy;
            const d = Math.hypot(dx, dy) || 1;
            return (
              <text key={i} x={mx + (dx / d) * 9} y={my + (dy / d) * 9 + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU_BANGUN}>
                {labelSisi[i]}
              </text>
            );
          })
        : null}
    </svg>
  );
}

/** Gambar jalur untuk Kenali: ruas lurus atau setengah lingkaran (lengkung). */
export function GambarJalur({ titik, lengkung, w = 92, h = 92 }: { titik: [number, number][]; lengkung: boolean[]; w?: number; h?: number }) {
  const k = (w - 16) / 4;
  const p = (i: number) => ({ x: 8 + titik[i][0] * k, y: 8 + titik[i][1] * k });
  let d = `M ${p(0).x} ${p(0).y}`;
  for (let i = 0; i < lengkung.length; i += 1) {
    const b = p(i + 1);
    if (lengkung[i]) {
      const a = p(i);
      const r = Math.hypot(b.x - a.x, b.y - a.y) / 2;
      d += ` A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
    } else d += ` L ${b.x} ${b.y}`;
  }
  const tutup = titik[0][0] === titik[titik.length - 1][0] && titik[0][1] === titik[titik.length - 1][1];
  return (
    <svg width={w} height={h} aria-hidden="true">
      <path d={d} fill={tutup ? EMAS_BANGUN : "none"} stroke={BIRU_BANGUN} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
