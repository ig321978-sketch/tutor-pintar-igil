"use client";

import React from "react";
import {
  BENTUK,
  bendaDatar,
  bendaRuang,
  jalurBentuk,
  jalurTitik,
  tangramKeping,
  type IdBentuk,
  type JenisRuang,
  type Titik,
} from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Gambar SVG bersama Matematika Kelas 2 Bab 3: bentuk datar polos (Picture),   */
/* benda datar berhias dan benda ruang (Concrete), model bangun ruang polos,   */
/* keping bangun datar, dan tangram. Tanpa API. Gambar berpusat di kotak 100.  */
/* ------------------------------------------------------------------------ */

export const BIRU = "#1C01A5";
export const EMAS = "#F0AB00";
export const MERAH = "#E53E3E";
export const HIJAU = "#16A34A";

/** Warna bentuk polos yang dipakai berulang di Picture dan Abstract. */
export const WARNA_BENTUK = ["#FDE68A", "#BFDBFE", "#FBCFE8", "#BBF7D0", "#DDD6FE", "#FED7AA", "#A5F3FC", "#FECACA"];

/* ------------------------------ Bentuk polos ------------------------------ */

export function BentukSvg({
  id,
  warna = "#FDE68A",
  kelas = "h-16 w-16",
  putar = 0,
  skala = 1,
  tebal = 4,
  label,
  putus = false,
  kosong = false,
}: {
  id: IdBentuk;
  warna?: string;
  kelas?: string;
  putar?: number;
  skala?: number;
  tebal?: number;
  label?: string;
  putus?: boolean;
  kosong?: boolean;
}) {
  const t = `translate(50 50) rotate(${putar}) scale(${skala}) translate(-50 -50)`;
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? BENTUK[id].nama}>
      <g transform={t}>
        <path d={jalurBentuk(id)} fill={kosong ? "none" : warna} stroke={BIRU} strokeWidth={tebal / skala} strokeLinejoin="round" strokeDasharray={putus ? "6 5" : undefined} />
      </g>
    </svg>
  );
}

/** Keping bangun datar sebarang. Kotak gambar mengikuti ukuran keping. */
export function PotongSvg({ titik, warna = "#FDE68A", kelas = "h-14 w-14", tebal = 3, putus = false, label = "keping" }: { titik: readonly Titik[]; warna?: string; kelas?: string; tebal?: number; putus?: boolean; label?: string }) {
  const xs = titik.map((p) => p[0]);
  const ys = titik.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX;
  const h = Math.max(...ys) - minY;
  const rim = Math.max(w, h) * 0.06 + 1;
  return (
    <svg viewBox={`${minX - rim} ${minY - rim} ${w + rim * 2} ${h + rim * 2}`} className={kelas} role="img" aria-label={label}>
      <path d={jalurTitik(titik)} fill={warna} stroke={BIRU} strokeWidth={(Math.max(w, h) * tebal) / 50} strokeLinejoin="round" strokeDasharray={putus ? "5 4" : undefined} />
    </svg>
  );
}

/* ------------------------------ Benda datar ------------------------------ */

function Hiasan({ id }: { id: string }) {
  const g = { stroke: BIRU, strokeWidth: 3, strokeLinecap: "round" as const, fill: "none" };
  switch (id) {
    case "rambuHatiHati":
      return (
        <g>
          <path d="M50 38 V62" {...g} strokeWidth={6} />
          <circle cx="50" cy="73" r="4.2" fill={BIRU} />
        </g>
      );
    case "penggarisSiku":
      return <path d="M28 34 V72 H64 Z" {...g} strokeDasharray="4 4" />;
    case "jendela":
      return <path d="M50 14 V86 M14 50 H86" {...g} strokeWidth={4} />;
    case "buku":
      return <path d="M24 26 V74 M36 40 H82 M36 50 H82 M36 60 H68" {...g} />;
    case "pintu":
      return (
        <g>
          <rect x="16" y="34" width="30" height="32" rx="2" {...g} />
          <rect x="54" y="34" width="30" height="32" rx="2" {...g} />
          <circle cx="50" cy="52" r="2.6" fill={BIRU} />
        </g>
      );
    case "rumahBurung":
      return <circle cx="50" cy="58" r="9" fill={BIRU} />;
    case "tehCelup":
      return <path d="M50 10 V1 M16 36 H84" {...g} />;
    case "rumah":
      return (
        <g>
          <rect x="42" y="66" width="16" height="23" rx="2" fill="#92400E" stroke={BIRU} strokeWidth={3} />
          <rect x="22" y="52" width="14" height="14" rx="2" fill="#BAE6FD" stroke={BIRU} strokeWidth={3} />
          <rect x="64" y="52" width="14" height="14" rx="2" fill="#BAE6FD" stroke={BIRU} strokeWidth={3} />
        </g>
      );
    case "sarangLebah":
    case "ubinLantai": {
      const t = BENTUK.segiEnam.titik.map(([x, y]) => [50 + (x - 50) * 0.55, 50 + (y - 50) * 0.55] as Titik);
      return <path d={jalurTitik(t)} {...g} strokeDasharray={id === "ubinLantai" ? "4 3" : undefined} />;
    }
    case "jamDinding":
      return (
        <g>
          <path d="M50 50 V26 M50 50 L66 58" {...g} strokeWidth={4} />
          <circle cx="50" cy="50" r="3.6" fill={BIRU} />
          <path d="M50 14 V20 M86 50 H80 M50 86 V80 M14 50 H20" {...g} strokeWidth={3} />
        </g>
      );
    case "murBaut":
      return (
        <g>
          <circle cx="50" cy="50" r="15" fill="#94A3B8" stroke={BIRU} strokeWidth={3} />
          <circle cx="50" cy="50" r="6" fill="#E2E8F0" stroke={BIRU} strokeWidth={2.5} />
        </g>
      );
    case "rambuStop":
      return (
        <text x="50" y="58" textAnchor="middle" fontSize="21" fontWeight="900" fill="#FFFFFF" stroke={BIRU} strokeWidth="0.6">
          STOP
        </text>
      );
    case "piring":
      return <circle cx="50" cy="50" r="30" {...g} />;
    case "koin":
      return (
        <g>
          <circle cx="50" cy="50" r="34" {...g} strokeWidth={2.5} />
          <text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill={BIRU}>
            ★
          </text>
        </g>
      );
    case "cermin":
      return <path d="M36 30 Q40 22 50 20" {...g} stroke="#FFFFFF" strokeWidth={5} />;
    case "balonHati":
      return <path d="M24 34 Q26 26 34 24" {...g} stroke="#FFFFFF" strokeWidth={5} />;
    default:
      return null;
  }
}

/** Isi gambar benda datar tanpa pembungkus svg (kotak 100), untuk ditempel di gambar lain. */
export function BendaDatarG({ id }: { id: string }) {
  const b = bendaDatar(id);
  return (
    <g>
      {id === "benderaMerahPutih" ? (
        <g>
          <path d={jalurBentuk(b.bentuk)} fill="#FFFFFF" />
          <path d="M6 26 H94 V50 H6 Z" fill="#EF4444" />
          <path d={jalurBentuk(b.bentuk)} fill="none" stroke={BIRU} strokeWidth={4} strokeLinejoin="round" />
        </g>
      ) : (
        <path d={jalurBentuk(b.bentuk)} fill={b.warna} stroke={BIRU} strokeWidth={4} strokeLinejoin="round" />
      )}
      <Hiasan id={id} />
    </g>
  );
}

/** Benda datar nyata (Concrete): bentuk berwarna dengan hiasan khas bendanya. */
export function BendaDatarSvg({ id, kelas = "h-16 w-16" }: { id: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={bendaDatar(id).nama}>
      <BendaDatarG id={id} />
    </svg>
  );
}

/* ------------------------------ Bangun ruang ------------------------------ */

const GARIS_RUANG = { stroke: BIRU, strokeWidth: 3, strokeLinejoin: "round" as const };

/** Isi gambar bangun ruang tanpa pembungkus svg (kotak 100). `dekor` menambah hiasan benda nyata. */
export function Ruang3DG({ jenis, warna = "#C4B5FD", dekor }: { jenis: JenisRuang; warna?: string; dekor?: string }) {
  let isi: React.ReactNode = null;
  if (jenis === "kubus") {
    isi = (
      <g {...GARIS_RUANG}>
        <polygon points="12,30 50,48 50,90 12,72" fill={warna} />
        <polygon points="12,30 50,48 50,90 12,72" fill="#000" opacity="0.08" />
        <polygon points="50,48 88,30 88,72 50,90" fill={warna} />
        <polygon points="50,48 88,30 88,72 50,90" fill="#000" opacity="0.22" />
        <polygon points="50,12 88,30 50,48 12,30" fill={warna} />
        <polygon points="50,12 88,30 50,48 12,30" fill="#FFF" opacity="0.38" />
        {dekor === "dadu" ? (
          <g fill={BIRU} stroke="none">
            <circle cx="50" cy="30" r="3.8" />
            <circle cx="22" cy="46" r="3.4" />
            <circle cx="31" cy="60" r="3.4" />
            <circle cx="40" cy="74" r="3.4" />
            <circle cx="60" cy="62" r="3.4" />
            <circle cx="78" cy="53" r="3.4" />
          </g>
        ) : null}
        {dekor === "hadiah" ? (
          <g stroke="none">
            <polygon points="27,37 35,41 35,83 27,79" fill="#FDE047" />
            <polygon points="27,19 35,23 73,41 65,37" fill="#FDE047" />
            <path d="M50 30 C38 14 34 28 50 30 C62 14 66 28 50 30 Z" fill="#FDE047" stroke={BIRU} strokeWidth="2.4" />
          </g>
        ) : null}
      </g>
    );
  } else if (jenis === "balok") {
    isi = (
      <g {...GARIS_RUANG}>
        <polygon points="6,42 68,42 68,90 6,90" fill={warna} />
        <polygon points="68,42 92,16 92,64 68,90" fill={warna} />
        <polygon points="68,42 92,16 92,64 68,90" fill="#000" opacity="0.22" />
        <polygon points="6,42 30,16 92,16 68,42" fill={warna} />
        <polygon points="6,42 30,16 92,16 68,42" fill="#FFF" opacity="0.38" />
        {dekor === "kardus" ? (
          <g stroke="none">
            <polygon points="46,42 52,42 52,90 46,90" fill="#FDE68A" opacity="0.85" />
            <polygon points="46,42 52,42 76,16 70,16" fill="#FDE68A" opacity="0.85" />
            <rect x="10" y="68" width="22" height="14" rx="2" fill="#FFFFFF" opacity="0.85" />
          </g>
        ) : null}
        {dekor === "pensil" ? (
          <g stroke={BIRU} strokeWidth="2.4">
            <path d="M6 54 H68" />
            <rect x="12" y="62" width="40" height="8" rx="2" fill="#FDE047" />
            <path d="M12 78 H46" />
          </g>
        ) : null}
      </g>
    );
  } else if (jenis === "tabung") {
    if (dekor === "botol") {
      isi = (
        <g {...GARIS_RUANG}>
          <rect x="40" y="6" width="20" height="10" rx="2" fill="#EF4444" />
          <rect x="43" y="16" width="14" height="14" fill={warna} />
          <path d="M26 34 V82 A24 9 0 0 0 74 82 V34 Z" fill={warna} />
          <ellipse cx="50" cy="34" rx="24" ry="9" fill={warna} />
          <ellipse cx="50" cy="34" rx="24" ry="9" fill="#FFF" opacity="0.4" />
          <path d="M26 50 V68 A24 9 0 0 0 74 68 V50 A24 9 0 0 1 26 50 Z" fill="#FFFFFF" opacity="0.85" />
        </g>
      );
    } else {
      isi = (
        <g {...GARIS_RUANG}>
          <path d="M20 24 V76 A30 12 0 0 0 80 76 V24 Z" fill={warna} />
          <path d="M66 34 V86 A30 12 0 0 0 80 76 V24 Z" fill="#000" opacity="0.14" stroke="none" />
          <ellipse cx="50" cy="24" rx="30" ry="12" fill={warna} />
          <ellipse cx="50" cy="24" rx="30" ry="12" fill="#FFF" opacity="0.4" />
          {dekor === "kaleng" ? <path d="M20 42 V62 A30 12 0 0 0 80 62 V42 A30 12 0 0 1 20 42 Z" fill="#FFFFFF" opacity="0.88" strokeWidth="2.4" /> : null}
        </g>
      );
    }
  } else if (jenis === "kerucut") {
    if (dekor === "esKrim") {
      isi = (
        <g {...GARIS_RUANG}>
          <path d="M50 94 L20 48 A30 10 0 0 1 80 48 Z" fill="#E9B872" />
          <path d="M30 52 L58 80 M40 50 L62 74 M24 58 L40 84 M70 50 L46 86" stroke="#A8672D" strokeWidth="1.6" fill="none" />
          <circle cx="50" cy="34" r="22" fill={warna} />
          <path d="M34 26 Q40 18 50 18" stroke="#FFF" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
        </g>
      );
    } else {
      isi = (
        <g {...GARIS_RUANG}>
          <path d="M50 8 L16 78 A34 14 0 0 0 84 78 Z" fill={warna} />
          <path d="M50 8 L84 78 A34 14 0 0 1 62 91 Z" fill="#000" opacity="0.16" stroke="none" />
          <path d="M47 22 L30 66" stroke="#FFF" strokeWidth="6" strokeLinecap="round" opacity="0.4" fill="none" />
          {dekor === "topi" ? (
            <g fill="none">
              <path d="M36 36 Q50 44 64 36" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />
              <path d="M27 56 Q50 66 73 56" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />
              <circle cx="50" cy="8" r="6.5" fill="#FDE047" />
            </g>
          ) : null}
        </g>
      );
    }
  } else {
    isi = (
      <g {...GARIS_RUANG}>
        <circle cx="50" cy="50" r="40" fill={warna} />
        <path d="M50 10 A40 40 0 0 1 50 90 A26 40 0 0 0 50 10 Z" fill="#000" opacity="0.14" stroke="none" />
        <ellipse cx="34" cy="32" rx="11" ry="7" fill="#FFF" opacity="0.5" stroke="none" transform="rotate(-30 34 32)" />
        {dekor === "bola" ? <path d="M11 50 Q50 70 89 50 M50 10 Q68 50 50 90 M50 10 Q32 50 50 90" fill="none" strokeWidth="2.6" /> : null}
        {dekor === "kelereng" ? <path d="M26 54 Q40 38 56 50 Q70 60 76 46" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.7" /> : null}
      </g>
    );
  }
  return <>{isi}</>;
}

/** Bangun ruang 3 dimensi sederhana. `dekor` menambah hiasan benda nyata. */
export function Ruang3D({ jenis, warna = "#C4B5FD", dekor, kelas = "h-20 w-20", label }: { jenis: JenisRuang; warna?: string; dekor?: string; kelas?: string; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label ?? jenis}>
      <Ruang3DG jenis={jenis} warna={warna} dekor={dekor} />
    </svg>
  );
}

export const DEKOR_BENDA: Record<string, string> = {
  dadu: "dadu",
  kotakHadiah: "hadiah",
  kardus: "kardus",
  kotakPensil: "pensil",
  kaleng: "kaleng",
  botol: "botol",
  topi: "topi",
  esKrim: "esKrim",
  bola: "bola",
  kelereng: "kelereng",
};

/** Benda nyata berbentuk bangun ruang (Concrete). */
export function BendaRuangSvg({ id, kelas = "h-20 w-20" }: { id: string; kelas?: string }) {
  const b = bendaRuang(id);
  return <Ruang3D jenis={b.jenis} warna={b.warna} dekor={DEKOR_BENDA[id]} kelas={kelas} label={b.nama} />;
}

export const WARNA_MODEL: Record<JenisRuang, string> = { kubus: "#FDE047", balok: "#F9A8D4", tabung: "#C4B5FD", kerucut: "#7DD3FC", bola: "#86EFAC" };

/** Model bangun ruang polos tanpa hiasan benda (Picture). */
export function ModelRuangSvg({ jenis, warna, kelas = "h-20 w-20" }: { jenis: JenisRuang; warna?: string; kelas?: string }) {
  return <Ruang3D jenis={jenis} warna={warna ?? WARNA_MODEL[jenis]} kelas={kelas} label={`model ${jenis}`} />;
}

/* ------------------------------ Tangram ------------------------------ */

/** Tangram dalam kotak 100. `terurai` menggeser tiap keping menjauhi pusat. */
export function TangramSvg({ kelas = "h-40 w-40", terurai = 0, label = "Tangram: tujuh keping" }: { kelas?: string; terurai?: number; label?: string }) {
  const keping = tangramKeping();
  return (
    <svg viewBox="0 0 100 100" className={kelas} role="img" aria-label={label}>
      {keping.map((k, i) => {
        const cx = k.titik.reduce((s, p) => s + p[0], 0) / k.titik.length;
        const cy = k.titik.reduce((s, p) => s + p[1], 0) / k.titik.length;
        const dx = (cx - 50) * terurai;
        const dy = (cy - 50) * terurai;
        return (
          <path key={i} d={jalurTitik(k.titik)} fill={k.warna} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform .5s ease-out" }} />
        );
      })}
    </svg>
  );
}

/* ------------------------------ Kotak kecil ------------------------------ */

/** Ubin berisi bentuk dan nama pendek, dipakai di poster Infografis. */
export function UbinBentuk({ id, nama, warna }: { id: IdBentuk; nama: string; warna?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
      <BentukSvg id={id} warna={warna} kelas="h-12 w-12" />
      <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{nama}</p>
    </div>
  );
}
