"use client";

import React, { useId } from "react";
import {
  BENDA_POTONG,
  BENTUK_P,
  NAMA_ITEM,
  kepingFigura,
  pusatPoligon,
  rasioBayang,
  type FiguraBayang,
  type FiguraWarna,
  type JenisItem,
  type JenisPotong,
  type Titik,
} from "./data-k2b5";

/* ------------------------------------------------------------------------ */
/* Gambar SVG bersama Matematika Kelas 2 Bab 5 (Pecahan): benda yang dipotong   */
/* (Concrete), wadah berisi cairan, benda satuan (kelereng, apel, pensil, ikan, */
/* jeruk, balon), dan bangun polos berbagi bagian (Picture). Kotak gambar 100.  */
/* Tanpa API.                                                                  */
/* ------------------------------------------------------------------------ */

export const BIRU = "#1C01A5";
export const EMAS = "#F0AB00";
export const MERAH = "#E53E3E";
export const HIJAU = "#16A34A";
export const WARNA_BAGIAN = ["#FDE68A", "#BFDBFE", "#FBCFE8", "#BBF7D0", "#DDD6FE", "#FED7AA", "#A5F3FC", "#FECACA"];

export const jalur = (p: readonly Titik[]) => `M${p.map((q) => `${q[0]} ${q[1]}`).join(" L")} Z`;

/* ------------------------------ Benda yang dipotong ------------------------------ */

function Dekor({ dekor, poly, tepi }: { dekor: string; poly: readonly Titik[]; tepi: string }) {
  switch (dekor) {
    case "martabak":
      return (
        <g>
          {Array.from({ length: 10 }, (_, j) =>
            Array.from({ length: 10 }, (_, i) => (
              <circle key={`${i}-${j}`} cx={9 + i * 9 + (j % 2) * 4.5} cy={9 + j * 9} r={(i + j) % 3 === 0 ? 2.2 : 1.5} fill={(i + j) % 3 === 0 ? "#6B3E0F" : "#C98A2B"} opacity="0.85" />
            )),
          )}
          <path d={jalur(poly)} fill="none" stroke="#C98A2B" strokeWidth="7" opacity="0.5" />
        </g>
      );
    case "bolu":
      return (
        <g>
          <rect x="0" y="0" width="100" height="42" fill="#FDE7C8" opacity="0.9" />
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={10 + i * 10.5} cy={30 + (i % 2) * 7} r="2.4" fill="#5B3A1A" opacity="0.8" />
          ))}
          <rect x="0" y="62" width="100" height="14" fill="#B9772F" opacity="0.7" />
        </g>
      );
    case "roti":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#C27B3A" strokeWidth="9" />
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={20 + (i % 4) * 20} cy={24 + Math.floor(i / 4) * 24} r="1.6" fill="#D9A15D" />
          ))}
        </g>
      );
    case "pizza":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#B45309" strokeWidth="9" opacity="0.8" />
          {[[34, 32], [64, 30], [50, 52], [30, 66], [70, 64], [52, 82]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
              <circle cx={x - 2} cy={y - 2} r="1.4" fill="#FCA5A5" />
            </g>
          ))}
          {[[46, 24], [76, 46], [22, 50], [60, 70], [40, 80]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="2.6" fill="#15803D" />
          ))}
        </g>
      );
    case "semangka":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#15803D" strokeWidth="13" />
          <path d={jalur(poly)} fill="none" stroke="#BBF7D0" strokeWidth="5" opacity="0.9" />
          {[[34, 38], [62, 34], [48, 56], [30, 64], [68, 62], [52, 78], [76, 46], [24, 48]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="2.2" ry="3.4" fill="#1F2937" transform={`rotate(${i * 40} ${x} ${y})`} />
          ))}
        </g>
      );
    case "apel":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#B91C1C" strokeWidth="8" />
          {[[40, 40], [60, 40], [50, 60], [44, 52], [58, 54]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="2" ry="3" fill="#5B2A0F" />
          ))}
        </g>
      );
    case "puding":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#BE185D" strokeWidth="9" opacity="0.8" />
          <path d={jalur(poly)} fill="none" stroke="#FCE7F3" strokeWidth="3" />
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} cx={28 + (i % 3) * 22} cy={30 + Math.floor(i / 3) * 22} r="3" fill="#FCE7F3" opacity="0.85" />
          ))}
        </g>
      );
    case "jeruk":
      return (
        <g>
          <path d={jalur(poly)} fill="none" stroke="#EA580C" strokeWidth="9" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (Math.PI / 4) * i;
            return <path key={i} d={`M50 50 L${50 + 40 * Math.cos(a)} ${50 + 40 * Math.sin(a)}`} stroke="#FED7AA" strokeWidth="2" />;
          })}
        </g>
      );
    default:
      return <path d={jalur(poly)} fill="none" stroke={tepi} strokeWidth="6" />;
  }
}

/** Benda yang dipotong. `ada` keping yang masih ada, `hilang` keping yang sudah diambil (bayangan putus-putus). */
export function BendaPotongG({ jenis, ada, hilang = [], jarak = 0, idKlip }: { jenis: JenisPotong; ada: readonly (readonly Titik[])[]; hilang?: readonly (readonly Titik[])[]; jarak?: number; idKlip: string }) {
  const d = BENDA_POTONG[jenis];
  const poly = BENTUK_P[d.bentuk].titik;
  const semua = [...ada, ...hilang];
  const gx = semua.length ? semua.reduce((s, k) => s + pusatPoligon(k)[0], 0) / semua.length : 50;
  const gy = semua.length ? semua.reduce((s, k) => s + pusatPoligon(k)[1], 0) / semua.length : 50;
  return (
    <g>
      {hilang.map((k, i) => (
        <path key={`h${i}`} d={jalur(k)} fill="none" stroke={d.tepi} strokeWidth="2" strokeDasharray="4 3" opacity="0.55" />
      ))}
      {ada.map((k, i) => {
        const [cx, cy] = pusatPoligon(k);
        const dx = ada.length > 1 ? (cx - gx) * jarak : 0;
        const dy = ada.length > 1 ? (cy - gy) * jarak : 0;
        const kid = `${idKlip}-k${i}`;
        return (
          <g key={i} transform={`translate(${dx} ${dy})`} style={{ transition: "transform .5s ease-out" }}>
            <clipPath id={kid}>
              <path d={jalur(k)} />
            </clipPath>
            <path d={jalur(k)} fill={d.warna} />
            <g clipPath={`url(#${kid})`}>
              <Dekor dekor={d.dekor} poly={poly} tepi={d.tepi} />
            </g>
            <path d={jalur(k)} fill="none" stroke={d.tepi} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}

export function BendaPotongSvg({ jenis, ada, hilang, jarak, kelas = "h-24 w-24", label }: { jenis: JenisPotong; ada: readonly (readonly Titik[])[]; hilang?: readonly (readonly Titik[])[]; jarak?: number; kelas?: string; label?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? BENDA_POTONG[jenis].nama}>
      <BendaPotongG jenis={jenis} ada={ada} hilang={hilang} jarak={jarak} idKlip={id} />
    </svg>
  );
}

/** Garis potong digambar di atas benda sebagai goresan pisau. */
export function GarisPotongG({ garis }: { garis: readonly (readonly [Titik, Titik])[] }) {
  return (
    <g>
      {garis.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BIRU} strokeWidth="2.4" strokeDasharray="5 4" strokeLinecap="round" />
      ))}
    </g>
  );
}

/* ------------------------------ Gelas dan botol ------------------------------ */

const WADAH = {
  gelas: { luar: "M22 10 L78 10 L70 92 L30 92 Z", atas: 10, bawah: 92 },
  botol: { luar: "M40 4 H60 V16 L72 30 V92 H28 V30 L40 16 Z", atas: 30, bawah: 92 },
} as const;

/** Wadah berisi cairan setinggi `level` (0 sampai 1) dari bagian badan wadah. */
export function GelasSvg({ wadah = "gelas", level, warna = "#38BDF8", kelas = "h-24 w-24", label }: { wadah?: "gelas" | "botol"; level: number; warna?: string; kelas?: string; label?: string }) {
  const id = useId().replace(/:/g, "");
  const w = WADAH[wadah];
  const tinggi = (w.bawah - w.atas) * Math.max(0, Math.min(1, level));
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? wadah}>
      <clipPath id={`${id}-w`}>
        <path d={w.luar} />
      </clipPath>
      <path d={w.luar} fill="#F0F9FF" />
      <g clipPath={`url(#${id}-w)`}>
        <rect x="0" y={w.bawah - tinggi} width="100" height={tinggi} fill={warna} style={{ transition: "all .35s ease-out" }} />
        {tinggi > 2 ? <rect x="0" y={w.bawah - tinggi} width="100" height="3" fill="#FFFFFF" opacity="0.5" /> : null}
      </g>
      <path d={w.luar} fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M34 22 L38 78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {wadah === "botol" ? <rect x="40" y="0" width="20" height="6" rx="2" fill="#EF4444" stroke={BIRU} strokeWidth="2.4" /> : null}
    </svg>
  );
}

/* ------------------------------ Benda satuan ------------------------------ */

export function ItemG({ jenis, warna }: { jenis: JenisItem; warna?: string }) {
  const w = warna ?? NAMA_ITEM[jenis].warna[0];
  const g = { stroke: BIRU, strokeWidth: 3, strokeLinejoin: "round" as const };
  switch (jenis) {
    case "kelereng":
      return (
        <g>
          <circle cx="50" cy="50" r="38" fill={w} {...g} />
          <ellipse cx="38" cy="36" rx="11" ry="7" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 38 36)" />
          <path d="M28 56 Q42 42 58 54 Q70 62 74 48" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </g>
      );
    case "apel":
      return (
        <g>
          <path d="M50 24 C30 14 12 30 14 54 C16 76 34 90 50 84 C66 90 84 76 86 54 C88 30 70 14 50 24 Z" fill={w} {...g} />
          <path d="M50 24 C50 14 54 8 60 6" stroke="#7A4A1E" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M56 12 C66 4 78 8 80 16 C70 20 60 18 56 12 Z" fill="#22C55E" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
          <ellipse cx="30" cy="44" rx="6" ry="9" fill="#FFFFFF" opacity="0.4" transform="rotate(20 30 44)" />
        </g>
      );
    case "jeruk":
      return (
        <g>
          <circle cx="50" cy="54" r="38" fill={w} {...g} />
          <path d="M50 18 C44 8 56 6 62 12 C58 18 54 20 50 18 Z" fill="#22C55E" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
          <ellipse cx="34" cy="42" rx="8" ry="5" fill="#FFFFFF" opacity="0.45" transform="rotate(-30 34 42)" />
        </g>
      );
    case "pensil":
      return (
        <g transform="rotate(-35 50 50)">
          <rect x="6" y="38" width="12" height="24" rx="3" fill="#F9A8D4" {...g} />
          <rect x="18" y="38" width="8" height="24" fill="#CBD5E1" {...g} />
          <rect x="26" y="38" width="46" height="24" fill={w} {...g} />
          <path d="M72 38 L96 50 L72 62 Z" fill="#FDE68A" {...g} />
          <path d="M88 46 L96 50 L88 54 Z" fill="#1F2937" />
        </g>
      );
    case "ikan":
      return (
        <g>
          <path d="M80 50 L96 34 L96 66 Z" fill={w} {...g} />
          <ellipse cx="50" cy="50" rx="34" ry="24" fill={w} {...g} />
          <path d="M44 28 Q50 20 58 28" fill={w} {...g} />
          <circle cx="32" cy="45" r="4.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
          <circle cx="31" cy="45" r="2" fill={BIRU} />
          <path d="M60 36 Q66 50 60 64" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" />
        </g>
      );
    case "balon":
    default:
      return (
        <g>
          <path d="M50 78 L44 90 L56 90 Z" fill={w} {...g} strokeWidth={2.4} />
          <ellipse cx="50" cy="42" rx="28" ry="34" fill={w} {...g} />
          <path d="M44 90 Q56 94 48 100" fill="none" stroke="#6B7280" strokeWidth="2" />
          <ellipse cx="38" cy="30" rx="6" ry="9" fill="#FFFFFF" opacity="0.45" transform="rotate(25 38 30)" />
        </g>
      );
  }
}

export function ItemSvg({ jenis, warna, kelas = "h-10 w-10", label }: { jenis: JenisItem; warna?: string; kelas?: string; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? NAMA_ITEM[jenis].tunggal}>
      <ItemG jenis={jenis} warna={warna} />
    </svg>
  );
}

/* ------------------------------ Bangun polos berbagi bagian ------------------------------ */

/** Bangun polos dengan keping. `warna[i]` mewarnai keping ke-i. Dipakai Picture dan Infografis. */
export function FiguraSvg({
  bentuk,
  garis,
  diwarnai,
  warna = "#F59E0B",
  kelas = "h-24 w-24",
  onKetuk,
  label,
}: {
  bentuk: FiguraWarna["bentuk"];
  garis: FiguraWarna["garis"];
  diwarnai?: readonly boolean[];
  warna?: string;
  kelas?: string;
  onKetuk?: (i: number) => void;
  label?: string;
}) {
  const keping = kepingFigura({ bentuk, garis });
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="group" aria-label={label ?? `${BENTUK_P[bentuk].nama} terbagi ${keping.length} bagian`}>
      {keping.map((k, i) => (
        <path
          key={i}
          d={jalur(k)}
          fill={diwarnai?.[i] ? warna : "#FFFFFF"}
          stroke={BIRU}
          strokeWidth="2.6"
          strokeLinejoin="round"
          role={onKetuk ? "button" : undefined}
          tabIndex={onKetuk ? 0 : undefined}
          aria-label={onKetuk ? `Bagian ${i + 1}${diwarnai?.[i] ? ", sudah diwarnai" : ", belum diwarnai"}` : undefined}
          aria-pressed={onKetuk ? !!diwarnai?.[i] : undefined}
          onClick={onKetuk ? () => onKetuk(i) : undefined}
          onKeyDown={onKetuk ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onKetuk(i)) : undefined}
          style={onKetuk ? { cursor: "pointer" } : undefined}
        />
      ))}
    </svg>
  );
}

/** Gambar bagian berwarna untuk klasifikasi (Setengah atau bukan). Warna dihitung dari titik penanda. */
export function FiguraBayangSvg({ f, kelas = "h-14 w-14", warna = "#F59E0B" }: { f: FiguraBayang; kelas?: string; warna?: string }) {
  const keping = kepingFigura({ bentuk: f.bentuk, garis: f.garis });
  const diwarnai = keping.map((k) => f.warnai.some((p) => pusatTitik(p, k)));
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={`Gambar ${f.id}: ${BENTUK_P[f.bentuk].nama}, bagian berwarna ${Math.round(rasioBayang(f) * 100)} dari 100`}>
      {keping.map((k, i) => (
        <path key={i} d={jalur(k)} fill={diwarnai[i] ? warna : "#FFFFFF"} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

function pusatTitik(p: Titik, poly: readonly Titik[]): boolean {
  let masuk = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) masuk = !masuk;
  }
  return masuk;
}
