"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B7 Sub-Bab A: sedotan yang menutup atau tidak, segitiga       */
/* dengan dua sudut diketahui, dan segitiga dengan sisi berlabel.               */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const rad = (deg: number) => (deg * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

type Titik = { x: number; y: number };

/** Segitiga dengan alas sisi terpanjang di bawah. Mengembalikan tiga titik (kiri, kanan, puncak) dalam kotak 220 x 150. Hanya bila sisi memenuhi syarat segitiga. */
export function titikSegitiga(sisi: [number, number, number]): { kiri: Titik; kanan: Titik; puncak: Titik } | null {
  const urut = [...sisi].sort((m, n) => n - m);
  const [alas, s1, s2] = urut;
  if (s1 + s2 <= alas) return null;
  const px = (s1 * s1 + alas * alas - s2 * s2) / (2 * alas);
  const py = Math.sqrt(Math.max(0, s1 * s1 - px * px));
  const skala = Math.min(170 / alas, 95 / Math.max(py, 0.01));
  const x0 = (220 - alas * skala) / 2;
  const y0 = 128;
  return {
    kiri: { x: bulat(x0), y: y0 },
    kanan: { x: bulat(x0 + alas * skala), y: y0 },
    puncak: { x: bulat(x0 + px * skala), y: bulat(y0 - py * skala) },
  };
}

/**
 * Tiga sedotan. Bila ketiganya lolos uji, sedotan menutup menjadi segitiga. Bila tidak, dua sedotan pendek
 * tergantung di ujung sedotan terpanjang dan celahnya terlihat (atau keduanya hanya menjadi garis lurus).
 */
export function GambarSedotan({ sisi, selesaiUji, nama }: { sisi: [number, number, number]; selesaiUji: boolean; nama: string }) {
  const urut = [...sisi].sort((m, n) => n - m);
  const [alas, s1, s2] = urut;
  const tutup = titikSegitiga(sisi);
  if (tutup && selesaiUji) {
    const t = tutup;
    return (
      <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, menutup menjadi segitiga`}>
        <polygon points={`${t.kiri.x},${t.kiri.y} ${t.kanan.x},${t.kanan.y} ${t.puncak.x},${t.puncak.y}`} fill={MUDA} stroke={BIRU} strokeWidth={5} strokeLinejoin="round" />
        {[t.kiri, t.kanan, t.puncak].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={BIRU} />
        ))}
      </svg>
    );
  }
  const skala = 170 / alas;
  const x0 = (220 - alas * skala) / 2;
  const y = 84;
  const w1 = s1 * skala;
  const w2 = s2 * skala;
  const celah = alas - s1 - s2;
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, ${tutup ? "sedotan belum diuji" : "sedotan tidak bisa menutup"}`}>
      <line x1={x0} y1={y} x2={x0 + alas * skala} y2={y} stroke={BIRU} strokeWidth={6} strokeLinecap="round" />
      {tutup ? (
        <g>
          <line x1={x0} y1={y - 26} x2={x0 + w1} y2={y - 26} stroke={BIRU} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
          <line x1={x0} y1={y - 48} x2={x0 + w2} y2={y - 48} stroke={BIRU} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
        </g>
      ) : (
        <g>
          <line x1={x0} y1={y - 8} x2={x0 + w1} y2={y - 8} stroke={BIRU} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
          <line x1={x0 + alas * skala - w2} y1={y - 8} x2={x0 + alas * skala} y2={y - 8} stroke={BIRU} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
          {celah > 0 ? <line x1={x0 + w1} y1={y - 8} x2={x0 + alas * skala - w2} y2={y - 8} stroke={EMAS} strokeWidth={4} strokeDasharray="5 4" /> : null}
        </g>
      )}
    </svg>
  );
}

/**
 * Segitiga dengan dua sudut alas p dan q. Bila p + q kurang dari 180, kedua kaki bertemu di puncak. Bila tidak,
 * kedua kaki tidak pernah bertemu (digambar menjauh). ketiga: tulisan di puncak, "?" bila belum dihitung.
 */
export function GambarSudutSegitiga({ p, q, ketiga, nama }: { p: number; q: number; ketiga: string; nama: string }) {
  const x0 = 24;
  const x1 = 196;
  const y = 125;
  const alas = x1 - x0;
  if (p + q < 180) {
    const k = 180 - p - q;
    const sisiKiri = (alas * Math.sin(rad(q))) / Math.sin(rad(k));
    const px = x0 + sisiKiri * Math.cos(rad(p));
    const py = y - sisiKiri * Math.sin(rad(p));
    const skala = Math.min(1, 100 / Math.max(y - py, 1), 190 / Math.max(px - x0, alas));
    const ax = bulat(x0 + (px - x0) * skala);
    const ay = bulat(y - (y - py) * skala);
    const bx = bulat(x0 + (x1 - x0) * skala);
    const labelX = Math.min(Math.max(ax, 30), 190);
    return (
      <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, dua sudut ${p} dan ${q} derajat`}>
        <polygon points={`${x0},${y} ${bx},${y} ${ax},${ay}`} fill={MUDA} stroke={BIRU} strokeWidth={5} strokeLinejoin="round" />
        <text x={bulat(x0 + 40 * Math.cos(rad(p / 2)))} y={bulat(y - 40 * Math.sin(rad(p / 2)) + 4)} textAnchor="middle" fontSize={12} fontWeight={800} fill={BIRU}>{p}°</text>
        <text x={bulat(bx - 40 * Math.cos(rad(q / 2)))} y={bulat(y - 40 * Math.sin(rad(q / 2)) + 4)} textAnchor="middle" fontSize={12} fontWeight={800} fill={BIRU}>{q}°</text>
        <text x={labelX} y={Math.max(ay - 8, 14)} textAnchor="middle" fontSize={13} fontWeight={800} fill={EMAS}>{ketiga}</text>
      </svg>
    );
  }
  const ax = x0 + 70;
  const ay = y - 55;
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, dua sudut ${p} dan ${q} derajat, kedua kaki tidak bertemu`}>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      <line x1={x0} y1={y} x2={bulat(x0 + 60 * Math.cos(rad(p)) + 0)} y2={bulat(y - 60 * Math.sin(rad(p)))} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      <line x1={x1} y1={y} x2={bulat(x1 - 60 * Math.cos(rad(q)))} y2={bulat(y - 60 * Math.sin(rad(q)))} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      <text x={x0 + 14} y={y - 6} fontSize={13} fontWeight={800} fill={BIRU}>{p}°</text>
      <text x={x1 - 38} y={y - 6} fontSize={13} fontWeight={800} fill={BIRU}>{q}°</text>
      <text x={ax + 40} y={ay - 20} textAnchor="middle" fontSize={13} fontWeight={800} fill={EMAS}>{ketiga}</text>
    </svg>
  );
}

/**
 * Segitiga dengan panjang sisi berlabel. impit: pasangan yang sedang diimpit (0: a dan b, 1: a dan c, 2: b dan c),
 * disorot emas. Sisi a di sebelah kanan, sisi b di sebelah kiri, sisi c (alas) di bawah. Segitiga digambar sesuai panjang
 * sisi, dengan alas sisi c.
 */
export function GambarSisiSegitiga({ sisi, sorot, nama }: { sisi: [number, number, number]; sorot: number[]; nama: string }) {
  const [a, b, c] = sisi;
  const alas = c;
  const px = (b * b + alas * alas - a * a) / (2 * alas);
  const py = Math.sqrt(Math.max(0, b * b - px * px));
  const skala = Math.min(170 / alas, 85 / Math.max(py, 0.01), 14);
  const x0 = (220 - alas * skala) / 2;
  const y0 = 128;
  const kiri = { x: bulat(x0), y: y0 };
  const kanan = { x: bulat(x0 + alas * skala), y: y0 };
  const atas = { x: bulat(x0 + px * skala), y: bulat(y0 - py * skala) };
  const emas = (nomor: number) => sorot.some((k) => (k === 0 ? [0, 1] : k === 1 ? [0, 2] : [1, 2]).includes(nomor));
  const warna = (nomor: number) => (emas(nomor) ? EMAS : BIRU);
  const tengah = (m: Titik, n: Titik, geser: number): Titik => ({ x: bulat((m.x + n.x) / 2 + geser), y: bulat((m.y + n.y) / 2 + (geser === 0 ? 16 : -2)) });
  const la = tengah(kanan, atas, 12);
  const lb = tengah(kiri, atas, -12);
  const lc = tengah(kiri, kanan, 0);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, sisi ${a}, ${b}, dan ${c}`}>
      <polygon points={`${kiri.x},${kiri.y} ${kanan.x},${kanan.y} ${atas.x},${atas.y}`} fill={MUDA} stroke="none" />
      <line x1={kanan.x} y1={kanan.y} x2={atas.x} y2={atas.y} stroke={warna(0)} strokeWidth={5} strokeLinecap="round" />
      <line x1={kiri.x} y1={kiri.y} x2={atas.x} y2={atas.y} stroke={warna(1)} strokeWidth={5} strokeLinecap="round" />
      <line x1={kiri.x} y1={kiri.y} x2={kanan.x} y2={kanan.y} stroke={warna(2)} strokeWidth={5} strokeLinecap="round" />
      <text x={la.x} y={la.y} fontSize={13} fontWeight={800} fill={BIRU} textAnchor="start">{a}</text>
      <text x={lb.x} y={lb.y} fontSize={13} fontWeight={800} fill={BIRU} textAnchor="end">{b}</text>
      <text x={lc.x} y={lc.y} fontSize={13} fontWeight={800} fill={BIRU} textAnchor="middle">{c}</text>
    </svg>
  );
}
