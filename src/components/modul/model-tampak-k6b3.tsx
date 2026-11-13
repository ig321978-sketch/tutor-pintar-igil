"use client";

import React from "react";
import { ejaK6B3 } from "./eja-k6b3";

/* ------------------------------ Model gambar K6B3 Sub-Bab B ------------------------------ */
/* Tumpukan kubus isometrik dari matriks tinggi (baris pertama paling depan, tampak paling   */
/* dekat), kisi tinggi tiap petak, tiga tampak datar (depan, samping, atas) yang dibangun     */
/* dari himpunan petak, dan pilihan tiga jawaban yang dibaca suara guru. Bilangan bulat.      */

const BIRU = "#1C01A5";
const WARNA_LANTAI = [
  { atas: "#FFE566", kiri: "#F0AB00", kanan: "#C98A00" },
  { atas: "#DDD6FE", kiri: "#8B7CF6", kanan: "#6D5BD0" },
  { atas: "#BFDBFE", kiri: "#60A5FA", kanan: "#3B82F6" },
  { atas: "#BBF7D0", kiri: "#4ADE80", kanan: "#22C55E" },
];

const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan. */
export function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B3(String(v))}`} onClick={() => onPilih(o)} className={`${OPSI_TOMBOL} ${String(v).length > 16 ? "text-sm" : ""}`}>
            {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

const LEBAR = 14;
const DALAM = 8;
const TINGGI = 16;

type Matriks = readonly (readonly number[])[];

/** Tumpukan kubus isometrik dari matriks tinggi. Baris pertama (paling depan) digambar paling dekat ke pengamat. */
export function TumpukanTinggi({ m, label }: { m: Matriks; label: string }) {
  const baris = m.length;
  const kubus: { x: number; y: number; z: number }[] = [];
  m.forEach((b, r) => b.forEach((h, c) => Array.from({ length: h }, (_, z) => kubus.push({ x: c, y: baris - 1 - r, z }))));
  const maxX = Math.max(0, ...kubus.map((k) => k.x));
  const maxY = Math.max(0, ...kubus.map((k) => k.y));
  const maxZ = Math.max(0, ...kubus.map((k) => k.z));
  const kiri = -(maxY * LEBAR) - LEBAR - 2;
  const lebar = (maxX + maxY) * LEBAR + 2 * LEBAR + 4;
  const atas = -(maxZ * TINGGI) - 2;
  const tinggi = (maxX + maxY) * DALAM + 2 * TINGGI + maxZ * TINGGI + 6;
  const urut = [...kubus].sort((a, b) => a.x - b.x || a.y - b.y || a.z - b.z);
  return (
    <svg viewBox={`${kiri} ${atas} ${lebar} ${tinggi}`} className="mx-auto h-auto w-full max-w-[240px]" role="img" aria-label={label}>
      {urut.map((k) => {
        const sx = (k.x - k.y) * LEBAR;
        const sy = (k.x + k.y) * DALAM - k.z * TINGGI;
        const w = WARNA_LANTAI[k.z % WARNA_LANTAI.length];
        return (
          <g key={`${k.x},${k.y},${k.z}`} stroke={BIRU} strokeWidth={1.2} strokeLinejoin="round">
            <polygon points={`${sx},${sy} ${sx + LEBAR},${sy + DALAM} ${sx},${sy + 2 * DALAM} ${sx - LEBAR},${sy + DALAM}`} fill={w.atas} />
            <polygon points={`${sx - LEBAR},${sy + DALAM} ${sx},${sy + 2 * DALAM} ${sx},${sy + 2 * DALAM + TINGGI} ${sx - LEBAR},${sy + DALAM + TINGGI}`} fill={w.kiri} />
            <polygon points={`${sx},${sy + 2 * DALAM} ${sx + LEBAR},${sy + DALAM} ${sx + LEBAR},${sy + DALAM + TINGGI} ${sx},${sy + 2 * DALAM + TINGGI}`} fill={w.kanan} />
          </g>
        );
      })}
    </svg>
  );
}

/** Kisi tinggi tiap petak. Baris depan digambar di bawah. `terbuka` menyatakan baris mana yang sudah dicatat. */
export function KisiTinggi({ m, terbuka }: { m: Matriks; terbuka: number }) {
  const kolom = Math.max(...m.map((b) => b.length));
  const SEL = 32;
  return (
    <figure className="m-0 text-center" role="img" aria-label={`Matriks tinggi: ${m.map((b, r) => `baris ${r === 0 ? "depan" : "belakang"} ${r < terbuka ? b.join(" dan ") : "belum dicatat"}`).join(", ")}`}>
      <svg viewBox={`0 0 ${kolom * SEL + 2} ${m.length * SEL + 2}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${kolom * 56 + 4}px` }} aria-hidden="true">
        {m.map((b, r) =>
          Array.from({ length: kolom }, (_, c) => {
            const baris = m.length - 1 - r;
            const isi = r < terbuka ? (b[c] ?? 0) : null;
            return (
              <g key={`${c},${r}`}>
                <rect x={1 + c * SEL} y={1 + baris * SEL} width={SEL} height={SEL} fill={isi === null ? "#fff" : isi > 0 ? "#FFF3B0" : "#F1F5F9"} stroke={BIRU} strokeWidth={1.5} />
                <text x={1 + c * SEL + SEL / 2} y={1 + baris * SEL + SEL / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill={BIRU}>
                  {isi === null ? "?" : isi}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      <figcaption className="text-xs font-black text-[#1C01A5]">Baris depan di bawah, baris belakang di atas</figcaption>
    </figure>
  );
}

export type ArahTampak = "depan" | "samping" | "atas";

/** Petak yang terlihat dari satu arah, dihitung dari himpunan petak kubus satu per satu. */
export function petakTampak(m: Matriks, arah: ArahTampak): { a: number; b: number }[] {
  const lihat = new Set<string>();
  m.forEach((baris, r) =>
    baris.forEach((h, c) => {
      for (let z = 0; z < h; z += 1) lihat.add(arah === "depan" ? `${c},${z}` : arah === "samping" ? `${r},${z}` : `${c},${r}`);
    }),
  );
  return [...lihat].map((s) => {
    const [a, b] = s.split(",").map(Number);
    return { a, b };
  });
}

const NAMA_ARAH: Record<ArahTampak, string> = { depan: "Tampak depan", samping: "Tampak samping", atas: "Tampak atas" };

/** Tampak datar. Depan: kolom ke kanan, tinggi ke atas. Samping: baris depan di kiri. Atas: baris depan di bawah. */
export function Tampak({ m, arah }: { m: Matriks; arah: ArahTampak }) {
  const kolom = Math.max(...m.map((b) => b.length));
  const baris = m.length;
  const tinggiMaks = Math.max(1, ...m.flat());
  const petak = petakTampak(m, arah);
  const lebarKisi = arah === "depan" ? kolom : arah === "samping" ? baris : kolom;
  const tinggiKisi = arah === "atas" ? baris : tinggiMaks;
  const SEL = 16;
  return (
    <figure className="m-0 text-center" role="img" aria-label={`${NAMA_ARAH[arah]}: ${petak.length} petak`}>
      <svg viewBox={`0 0 ${lebarKisi * SEL + 2} ${tinggiKisi * SEL + 2}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${lebarKisi * 34 + 4}px` }} aria-hidden="true">
        {Array.from({ length: tinggiKisi }, (_, y) =>
          Array.from({ length: lebarKisi }, (_, x) => {
            const bawahKe = tinggiKisi - 1 - y;
            const isi = petak.some((p) => p.a === x && p.b === bawahKe);
            return <rect key={`${x},${y}`} x={1 + x * SEL} y={1 + y * SEL} width={SEL} height={SEL} fill={isi ? "#C4B5FD" : "#fff"} stroke={BIRU} strokeWidth={1} />;
          }),
        )}
      </svg>
      <figcaption className="text-xs font-black text-[#1C01A5]">
        {NAMA_ARAH[arah]}: {petak.length}
      </figcaption>
    </figure>
  );
}
