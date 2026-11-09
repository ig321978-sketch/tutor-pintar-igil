"use client";

import React from "react";
import { BENTUK_P } from "./data-k2b5";
import { jalur } from "./dasar-k2b5";
import { HEX_WARNA, type BendaId } from "./data-k2b4";

/* ------------------------------------------------------------------------ */
/* Gambar SVG bersama Matematika Kelas 2 Bab 4 (Posisi Benda dan Pola):       */
/* perpustakaan benda (kotak 100 x 100), pemandangan kamar dan taman, bangun   */
/* polos, dan lambang unsur pola (manik, bentuk, gerakan, suara). Tanpa API.   */
/* ------------------------------------------------------------------------ */

export const BIRU = "#1C01A5";
export const EMAS = "#F0AB00";
const S = { stroke: BIRU, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Ukuran alami benda di pemandangan 100 x 75 (lebar, tinggi). */
export const UKURAN_BENDA: Record<BendaId, [number, number]> = {
  meja: [26, 20], kursi: [11, 18], kotak: [14, 14], bola: [9, 9], buku: [11, 7], pensil: [14, 4], boneka: [10, 12], kucing: [14, 12],
  burung: [13, 10], ulat: [14, 5], kupu: [11, 9], bunga: [9, 14], rumput: [12, 9], pohon: [24, 38], kelinci: [12, 12],
  tempatTidur: [38, 20], sepatu: [12, 6], tas: [9, 10], mobil: [12, 7], ayam: [11, 11], lemari: [18, 26], jam: [9, 9],
};

/** Satu benda di kotak 100 x 100, dasar benda di sekitar y = 95. */
export function BendaG({ id }: { id: BendaId }) {
  switch (id) {
    case "meja":
      return (
        <g>
          <rect x="10" y="20" width="9" height="76" fill="#A8672D" {...S} />
          <rect x="81" y="20" width="9" height="76" fill="#A8672D" {...S} />
          <rect x="3" y="3" width="94" height="19" rx="4" fill="#C98A3B" {...S} />
        </g>
      );
    case "kursi":
      return (
        <g>
          <rect x="16" y="52" width="8" height="42" fill="#A8672D" {...S} />
          <rect x="68" y="52" width="8" height="42" fill="#A8672D" {...S} />
          <rect x="14" y="6" width="12" height="52" rx="3" fill="#C98A3B" {...S} />
          <rect x="14" y="48" width="70" height="14" rx="3" fill="#C98A3B" {...S} />
        </g>
      );
    case "kotak":
      return (
        <g>
          <rect x="6" y="16" width="88" height="78" rx="4" fill="#E3B66F" {...S} />
          <path d="M6 34 H94" stroke={BIRU} strokeWidth="3" />
          <rect x="38" y="16" width="24" height="18" fill="#F3D9A4" {...S} />
        </g>
      );
    case "bola":
      return (
        <g>
          <circle cx="50" cy="50" r="44" fill="#3B82F6" {...S} />
          <path d="M12 38 Q50 60 88 38 M12 64 Q50 86 88 64" fill="none" stroke="#FBBF24" strokeWidth="9" />
          <ellipse cx="34" cy="30" rx="9" ry="6" fill="#FFFFFF" opacity="0.5" transform="rotate(-30 34 30)" />
        </g>
      );
    case "buku":
      return (
        <g>
          <rect x="6" y="22" width="88" height="68" rx="5" fill="#2563EB" {...S} />
          <rect x="6" y="22" width="14" height="68" fill="#1D4ED8" {...S} />
          <rect x="34" y="38" width="46" height="12" rx="3" fill="#FDE68A" stroke={BIRU} strokeWidth="2.4" />
          <path d="M34 64 H80" stroke="#FDE68A" strokeWidth="5" />
        </g>
      );
    case "pensil":
      return (
        <g>
          <rect x="6" y="36" width="12" height="26" rx="3" fill="#F9A8D4" {...S} />
          <rect x="18" y="36" width="9" height="26" fill="#CBD5E1" {...S} />
          <rect x="27" y="36" width="52" height="26" fill="#FBBF24" {...S} />
          <path d="M79 36 L98 49 L79 62 Z" fill="#FDE68A" {...S} />
          <path d="M91 45 L98 49 L91 53 Z" fill="#1F2937" />
        </g>
      );
    case "boneka":
      return (
        <g>
          <circle cx="24" cy="24" r="12" fill="#B9772F" {...S} />
          <circle cx="76" cy="24" r="12" fill="#B9772F" {...S} />
          <ellipse cx="50" cy="66" rx="30" ry="28" fill="#C98A3B" {...S} />
          <circle cx="50" cy="34" r="25" fill="#C98A3B" {...S} />
          <ellipse cx="50" cy="42" rx="11" ry="8" fill="#F3D9A4" stroke={BIRU} strokeWidth="2.4" />
          <circle cx="41" cy="30" r="3.4" fill={BIRU} />
          <circle cx="59" cy="30" r="3.4" fill={BIRU} />
          <circle cx="50" cy="40" r="3" fill="#7F1D1D" />
        </g>
      );
    case "kucing":
      return (
        <g>
          <path d="M70 80 Q96 74 90 50" fill="none" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
          <ellipse cx="46" cy="72" rx="32" ry="22" fill="#FBA94B" {...S} />
          <path d="M22 36 L26 12 L42 28 Z M58 28 L74 12 L78 36 Z" fill="#FBA94B" {...S} />
          <circle cx="50" cy="44" r="27" fill="#FBA94B" {...S} />
          <circle cx="40" cy="40" r="3.4" fill={BIRU} />
          <circle cx="60" cy="40" r="3.4" fill={BIRU} />
          <path d="M45 50 L50 54 L55 50 Z" fill="#E11D48" />
          <path d="M26 48 H12 M26 54 H12 M74 48 H88 M74 54 H88" stroke={BIRU} strokeWidth="2" />
        </g>
      );
    case "burung":
      return (
        <g>
          <path d="M8 56 L30 48 L28 66 Z" fill="#1D4ED8" {...S} />
          <ellipse cx="46" cy="58" rx="32" ry="22" fill="#3B82F6" {...S} />
          <circle cx="74" cy="42" r="15" fill="#3B82F6" {...S} />
          <path d="M86 40 L100 46 L86 50 Z" fill="#FBBF24" {...S} />
          <circle cx="76" cy="39" r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
          <path d="M30 56 Q46 40 60 58" fill="#60A5FA" {...S} />
          <path d="M44 78 V94 M58 78 V94" stroke="#F59E0B" strokeWidth="4" />
        </g>
      );
    case "ulat":
      return (
        <g>
          {[14, 30, 46, 62].map((x) => (
            <circle key={x} cx={x} cy="60" r="13" fill="#4ADE80" {...S} />
          ))}
          <circle cx="82" cy="52" r="16" fill="#22C55E" {...S} />
          <circle cx="86" cy="48" r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
          <path d="M78 36 Q74 24 68 22 M88 36 Q92 24 98 22" fill="none" stroke={BIRU} strokeWidth="2.4" />
        </g>
      );
    case "kupu":
      return (
        <g>
          <ellipse cx="28" cy="34" rx="24" ry="26" fill="#F472B6" {...S} />
          <ellipse cx="72" cy="34" rx="24" ry="26" fill="#F472B6" {...S} />
          <ellipse cx="32" cy="70" rx="18" ry="20" fill="#C084FC" {...S} />
          <ellipse cx="68" cy="70" rx="18" ry="20" fill="#C084FC" {...S} />
          <rect x="45" y="22" width="10" height="58" rx="5" fill="#7C2D12" {...S} />
          <path d="M47 24 Q40 8 34 6 M53 24 Q60 8 66 6" fill="none" stroke={BIRU} strokeWidth="2.4" />
        </g>
      );
    case "bunga":
      return (
        <g>
          <path d="M50 56 V94" stroke="#16A34A" strokeWidth="6" />
          <path d="M50 78 Q28 74 22 60 Q42 60 50 78 M50 82 Q72 78 78 64 Q58 64 50 82" fill="#4ADE80" stroke={BIRU} strokeWidth="2.4" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={50 + 22 * Math.cos(((a - 90) * Math.PI) / 180)} cy={34 + 22 * Math.sin(((a - 90) * Math.PI) / 180)} r="14" fill="#F472B6" {...S} />
          ))}
          <circle cx="50" cy="34" r="11" fill="#FBBF24" {...S} />
        </g>
      );
    case "rumput":
      return (
        <g>
          <path d="M14 94 Q10 50 24 20 Q28 54 30 94 Z M34 94 Q30 40 50 10 Q54 52 54 94 Z M58 94 Q62 50 78 24 Q80 56 76 94 Z M72 94 Q80 56 94 40 Q92 70 90 94 Z" fill="#4ADE80" {...S} />
        </g>
      );
    case "pohon":
      return (
        <g>
          <rect x="42" y="50" width="16" height="44" rx="3" fill="#92400E" {...S} />
          <circle cx="50" cy="30" r="28" fill="#22C55E" {...S} />
          <circle cx="26" cy="44" r="18" fill="#16A34A" {...S} />
          <circle cx="74" cy="44" r="18" fill="#16A34A" {...S} />
          <circle cx="36" cy="22" r="5" fill="#F87171" stroke={BIRU} strokeWidth="1.6" />
          <circle cx="62" cy="34" r="5" fill="#F87171" stroke={BIRU} strokeWidth="1.6" />
        </g>
      );
    case "kelinci":
      return (
        <g>
          <ellipse cx="34" cy="14" rx="8" ry="22" fill="#F5F5F4" {...S} transform="rotate(-10 34 36)" />
          <ellipse cx="62" cy="14" rx="8" ry="22" fill="#F5F5F4" {...S} transform="rotate(10 62 36)" />
          <ellipse cx="50" cy="74" rx="32" ry="20" fill="#F5F5F4" {...S} />
          <circle cx="50" cy="48" r="22" fill="#F5F5F4" {...S} />
          <circle cx="42" cy="44" r="3.2" fill={BIRU} />
          <circle cx="58" cy="44" r="3.2" fill={BIRU} />
          <path d="M46 54 L50 58 L54 54 Z" fill="#F472B6" />
          <circle cx="86" cy="74" r="8" fill="#FFFFFF" {...S} />
        </g>
      );
    case "tempatTidur":
      return (
        <g>
          <rect x="3" y="2" width="12" height="94" rx="3" fill="#B45309" {...S} />
          <rect x="88" y="26" width="9" height="70" rx="3" fill="#B45309" {...S} />
          <rect x="3" y="14" width="94" height="36" rx="4" fill="#38BDF8" {...S} />
          <rect x="16" y="2" width="26" height="16" rx="7" fill="#FFFFFF" {...S} />
          <path d="M44 14 V50 M62 14 V50 M80 14 V50" stroke="#0EA5E9" strokeWidth="3" />
          <rect x="3" y="50" width="94" height="10" fill="#B45309" {...S} />
        </g>
      );
    case "sepatu":
      return (
        <g>
          <path d="M6 76 Q6 40 30 34 L44 52 Q70 52 92 66 Q98 72 92 82 L10 84 Z" fill="#EF4444" {...S} />
          <path d="M8 80 H94" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M34 40 L40 50 M42 38 L48 48" stroke="#FFFFFF" strokeWidth="3" />
        </g>
      );
    case "tas":
      return (
        <g>
          <path d="M30 28 Q30 4 50 4 Q70 4 70 28" fill="none" stroke={BIRU} strokeWidth="5" />
          <rect x="12" y="22" width="76" height="72" rx="14" fill="#A855F7" {...S} />
          <rect x="26" y="52" width="48" height="30" rx="8" fill="#C084FC" {...S} />
          <path d="M12 44 H88" stroke={BIRU} strokeWidth="3" />
        </g>
      );
    case "mobil":
      return (
        <g>
          <path d="M6 70 L14 46 Q18 38 28 38 H62 Q72 38 78 48 L94 56 Q98 60 98 70 Z" fill="#EF4444" {...S} />
          <path d="M26 44 H44 V56 H20 Z M50 44 H66 L74 56 H50 Z" fill="#BAE6FD" stroke={BIRU} strokeWidth="2.4" />
          <circle cx="28" cy="74" r="13" fill="#1F2937" {...S} />
          <circle cx="76" cy="74" r="13" fill="#1F2937" {...S} />
          <circle cx="28" cy="74" r="5" fill="#E5E7EB" />
          <circle cx="76" cy="74" r="5" fill="#E5E7EB" />
        </g>
      );
    case "ayam":
      return (
        <g>
          <path d="M8 40 Q2 20 18 24 Q16 36 22 44 Z" fill="#DC2626" {...S} />
          <ellipse cx="42" cy="62" rx="32" ry="24" fill="#B45309" {...S} />
          <circle cx="72" cy="38" r="16" fill="#B45309" {...S} />
          <path d="M66 22 Q70 12 76 22 Q82 12 86 24" fill="#DC2626" {...S} />
          <path d="M84 38 L98 44 L84 48 Z" fill="#FBBF24" {...S} />
          <circle cx="74" cy="34" r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
          <path d="M38 84 V96 M52 84 V96" stroke="#F59E0B" strokeWidth="4" />
        </g>
      );
    case "lemari":
      return (
        <g>
          <rect x="8" y="6" width="84" height="88" rx="5" fill="#A8672D" {...S} />
          <path d="M50 6 V94" stroke={BIRU} strokeWidth="3" />
          <circle cx="42" cy="52" r="3" fill="#FDE68A" />
          <circle cx="58" cy="52" r="3" fill="#FDE68A" />
        </g>
      );
    case "jam":
    default:
      return (
        <g>
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" {...S} />
          <path d="M50 50 V24 M50 50 L68 60" stroke={BIRU} strokeWidth="5" />
          <circle cx="50" cy="50" r="4" fill={BIRU} />
        </g>
      );
  }
}

/** Benda di dalam svg sendiri (dipakai di tombol dan kartu). */
export function BendaSvg({ id, kelas = "h-12 w-12", label }: { id: BendaId; kelas?: string; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? id}>
      <BendaG id={id} />
    </svg>
  );
}

/** Benda diletakkan di kotak adegan (x, y, w, h) dengan skala tidak seragam. */
export function BendaDi({ id, x, y, w, h, kelas }: { id: BendaId; x: number; y: number; w: number; h: number; kelas?: string }) {
  return (
    <svg x={x} y={y} width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none" className={kelas} overflow="visible">
      <BendaG id={id} />
    </svg>
  );
}

/* ------------------------------ Bangun polos ------------------------------ */

export const WARNA_BANGUN: Record<string, string> = {
  lingkaran: "#F59E0B", persegi: "#60A5FA", segitiga: "#34D399", bintang: "#FBBF24", hati: "#F472B6", belahKetupat: "#A78BFA",
};

/** Bangun polos berwarna di kotak 100 x 100. `warna` menimpa warna bawaan. */
export function BangunG({ id, warna }: { id: string; warna?: string }) {
  const b = BENTUK_P[id as keyof typeof BENTUK_P];
  if (!b) return null;
  return <path d={jalur(b.titik)} fill={warna ?? WARNA_BANGUN[id] ?? "#FDE68A"} stroke={BIRU} strokeWidth="5" strokeLinejoin="round" />;
}

export function BangunSvg({ id, warna, kelas = "h-10 w-10", label }: { id: string; warna?: string; kelas?: string; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? id}>
      <BangunG id={id} warna={warna} />
    </svg>
  );
}

/* ------------------------------ Lambang unsur pola ------------------------------ */

const PUTIH = "#FFFFFF";

/** Anak dengan gerakan: berdiri, tangan naik, membungkuk. Kotak 100 x 100. */
export function PoseG({ pose, baju = "#3B82F6" }: { pose: string; baju?: string }) {
  const kulit = "#F3C9A0";
  if (pose === "membungkuk") {
    return (
      <g>
        <path d="M40 94 L46 66 M58 94 L52 66" stroke={BIRU} strokeWidth="7" strokeLinecap="round" />
        <path d="M49 66 L72 42" stroke={baju} strokeWidth="18" strokeLinecap="round" />
        <path d="M72 42 L78 74" stroke={kulit} strokeWidth="6" strokeLinecap="round" />
        <circle cx="80" cy="30" r="12" fill={kulit} {...S} />
        <path d="M70 26 Q80 14 90 26" fill="#1F2937" stroke="none" />
      </g>
    );
  }
  const naik = pose === "tanganNaik";
  return (
    <g>
      <path d="M42 94 L46 62 M58 94 L54 62" stroke={BIRU} strokeWidth="7" strokeLinecap="round" />
      <path d="M50 62 V34" stroke={baju} strokeWidth="20" strokeLinecap="round" />
      <path d={naik ? "M40 38 L28 12 M60 38 L72 12" : "M40 40 L32 64 M60 40 L68 64"} stroke={kulit} strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="20" r="12" fill={kulit} {...S} />
      <path d="M40 16 Q50 4 60 16" fill="#1F2937" stroke="none" />
    </g>
  );
}

/** Tepukan: keras (besar, tiga gelombang), pelan (kecil, satu gelombang), diam (cincin putus-putus). */
export function BunyiG({ bunyi }: { bunyi: string }) {
  if (bunyi === "diam") {
    return (
      <g>
        <circle cx="50" cy="50" r="26" fill="none" stroke={BIRU} strokeWidth="5" strokeDasharray="8 8" />
        <text x="50" y="58" textAnchor="middle" fontSize="26" fontWeight="900" fill={BIRU}>
          …
        </text>
      </g>
    );
  }
  const keras = bunyi === "keras";
  return (
    <g>
      <circle cx="50" cy="50" r={keras ? 26 : 14} fill={keras ? EMAS : "#FDE68A"} {...S} />
      <circle cx="50" cy="50" r={keras ? 10 : 5} fill={PUTIH} stroke="none" opacity="0.7" />
      {(keras ? [36, 44] : [22]).map((r, i) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={BIRU} strokeWidth={keras ? 4 - i : 3} strokeDasharray="10 8" opacity={keras ? 0.9 - i * 0.2 : 0.6} />
      ))}
    </g>
  );
}

/** Manik berwarna. */
export function ManikG({ warna }: { warna: string }) {
  return (
    <g>
      <circle cx="50" cy="50" r="38" fill={HEX_WARNA[warna] ?? warna} {...S} />
      <ellipse cx="38" cy="36" rx="10" ry="6" fill={PUTIH} opacity="0.55" transform="rotate(-30 38 36)" />
      <circle cx="50" cy="50" r="9" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" opacity="0.85" />
    </g>
  );
}

/** Satu unsur pola di kotak 100 x 100. */
export function UnsurG({ jenis, token, baju }: { jenis: string; token: string; baju?: string }) {
  if (jenis === "warna") return <ManikG warna={token} />;
  if (jenis === "bentuk") return <BangunG id={token} />;
  if (jenis === "gerakan") return <PoseG pose={token} baju={baju} />;
  return <BunyiG bunyi={token} />;
}

export function UnsurSvg({ jenis, token, kelas = "h-12 w-12", label, baju }: { jenis: string; token: string; kelas?: string; label?: string; baju?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? token}>
      <UnsurG jenis={jenis} token={token} baju={baju} />
    </svg>
  );
}

/* ------------------------------ Pemandangan ------------------------------ */

/** Dinding dan lantai kamar (kotak 100 x 75). */
export function LatarKamar() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="75" fill="#F5E6FA" />
      <rect x="0" y="52" width="100" height="23" fill="#E9D5F2" />
      <path d="M0 52 H100" stroke="#C9A9DC" strokeWidth="1.2" />
      <rect x="70" y="8" width="16" height="12" rx="1.5" fill="#BAE6FD" stroke={BIRU} strokeWidth="1.2" />
      <path d="M78 8 V20 M70 14 H86" stroke={BIRU} strokeWidth="0.9" />
      <g transform="translate(12 6) scale(0.1)">
        <BendaG id="jam" />
      </g>
    </g>
  );
}

/** Taman: langit, rumput, awan (kotak 100 x 75). */
export function LatarTaman() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="75" fill="#DFF1FF" />
      <circle cx="88" cy="10" r="6" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
      <ellipse cx="22" cy="12" rx="12" ry="5" fill="#FFFFFF" />
      <ellipse cx="32" cy="10" rx="9" ry="5" fill="#FFFFFF" />
      <ellipse cx="60" cy="16" rx="11" ry="4.5" fill="#FFFFFF" />
      <path d="M0 46 C25 40 55 50 100 42 V75 H0 Z" fill="#CDEBD3" />
      <rect x="0" y="50" width="100" height="25" fill="#B7E0C0" />
    </g>
  );
}

