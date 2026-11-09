"use client";

import React from "react";
import { jam12 } from "./data-k2b6";

/* ------------------------------------------------------------------------ */
/* Diagram bersama Matematika Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu).    */
/* Hanya garis, bangun polos, huruf, titik, dan angka. TIDAK ada gambar benda  */
/* dan tidak ada emoji, supaya aman dipakai tahap Picture. Tahap Concrete      */
/* memasang benda nyata ke rangka yang sama lewat dasar-k2b6.tsx.             */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";
const PASTEL = ["#BFDBFE", "#FBCFE8", "#BBF7D0", "#FDE68A", "#DDD6FE", "#FED7AA", "#A5F3FC", "#FECACA"];
export const warnaHuruf = (h: string): string => PASTEL[(h.charCodeAt(0) - 65 + PASTEL.length * 4) % PASTEL.length];

/* ------------------------------ Rangka neraca ------------------------------ */

/** 1 = sisi kanan lebih berat (turun), -1 = sisi kiri lebih berat, 0 = seimbang. */
export type Miring = -1 | 0 | 1;
const DY = 17;
const SUDUT = 9.3;

/**
 * Rangka timbangan jungkat-jungkit. Isi tiap piringan diberikan dari luar (benda nyata atau balok huruf).
 * Gerakan turun naik memakai transisi CSS, jadi bergerak halus saat `miring` berubah.
 */
export function NeracaRangka({
  miring,
  kiri,
  kanan,
  label,
  kelas = "",
  varian = "neraca",
}: {
  miring: Miring;
  kiri: React.ReactNode;
  kanan: React.ReactNode;
  label: string;
  kelas?: string;
  /** "neraca": piringan di atas penyangga. "gantung": tas bergantung pada gantungan baju. */
  varian?: "neraca" | "gantung";
}) {
  const dyKanan = miring * DY;
  const dyKiri = -miring * DY;
  const trans = "transform 0.8s cubic-bezier(.3,1.35,.5,1)";
  const gantung = varian === "gantung";
  /** Tinggi gambar: gantungan tidak punya penyangga di bawah, jadi lebih pendek. */
  const H = gantung ? 150 : 190;
  const piringan = (ex: number, dy: number) => (
    <g style={{ transform: `translate(${ex}px, ${110 + dy}px)`, transition: trans }}>
      {gantung ? (
        <>
          <path d="M0 -62 L-40 -50 M0 -62 L40 -50" stroke={TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M-40 -50 H40 Q44 17 0 17 Q-44 17 -40 -50 Z" fill="rgba(255,255,255,0.8)" stroke={TINTA} strokeWidth="3" strokeLinejoin="round" strokeDasharray="6 3" />
        </>
      ) : (
        <>
          <path d="M0 -62 L-42 0 M0 -62 L42 0" stroke={TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M-47 0 H47 Q38 17 0 17 Q-38 17 -47 0 Z" fill="#FFE566" stroke={TINTA} strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
    </g>
  );
  const isi = (ex: number, dy: number, anak: React.ReactNode) => (
    <div
      className="absolute flex flex-wrap content-end items-end justify-center gap-0.5 overflow-visible"
      style={{ left: `${((ex - 47) / 300) * 100}%`, width: `${(94 / 300) * 100}%`, top: `${((110 + dy - 58) / H) * 100}%`, height: `${(58 / H) * 100}%`, transition: "top 0.8s cubic-bezier(.3,1.35,.5,1)" }}
    >
      {anak}
    </div>
  );
  return (
    <div className={`relative mx-auto w-full max-w-[360px] ${kelas}`} style={{ aspectRatio: `300 / ${H}` }} role="img" aria-label={label}>
      <svg viewBox={`0 0 300 ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {gantung ? (
          <>
            <path d="M150 48 V14" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
            <path d="M150 14 q0 -11 -11 -11 q-9 0 -9 8" stroke={TINTA} strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M150 48 L128 172 H172 Z" fill="#C7D2FE" stroke={TINTA} strokeWidth="3" strokeLinejoin="round" />
            <rect x="108" y="170" width="84" height="12" rx="5" fill={TINTA} />
          </>
        )}
        <g style={{ transform: `rotate(${miring * SUDUT}deg)`, transformOrigin: "150px 48px", transition: "transform 0.8s cubic-bezier(.3,1.35,.5,1)" }}>
          <line x1="42" y1="48" x2="258" y2="48" stroke={TINTA} strokeWidth="7" strokeLinecap="round" />
          <circle cx="42" cy="48" r="5" fill="#F0AB00" stroke={TINTA} strokeWidth="2" />
          <circle cx="258" cy="48" r="5" fill="#F0AB00" stroke={TINTA} strokeWidth="2" />
        </g>
        {piringan(48, dyKiri)}
        {piringan(252, dyKanan)}
        <circle cx="150" cy="48" r="8" fill="#F0AB00" stroke={TINTA} strokeWidth="3" />
      </svg>
      {isi(48, dyKiri, kiri)}
      {isi(252, dyKanan, kanan)}
    </div>
  );
}

/** Balok polos berhuruf. Dipakai sebagai "benda" pada diagram neraca. */
export function BalokHuruf({ huruf, ukuran = 34, sorot = false }: { huruf: string; ukuran?: number; sorot?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-md border-[3px] border-[#1C01A5] font-black text-[#1C01A5] ${sorot ? "ring-4 ring-[#F0AB00]" : ""}`}
      style={{ width: ukuran, height: ukuran, backgroundColor: warnaHuruf(huruf), fontSize: ukuran * 0.5 }}
      aria-hidden="true"
    >
      {huruf}
    </span>
  );
}

/** Sebaris titik kecil biru (titik pengukur). Tanpa gambar benda. */
export function TitikUkur({ n, ukuran = 12, kelas = "" }: { n: number; ukuran?: number; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-0.5 ${kelas}`} role="img" aria-label={`${n} titik`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="block rounded-full border-2 border-[#1C01A5] bg-[#38BDF8]" style={{ width: ukuran, height: ukuran }} />
      ))}
    </span>
  );
}

/** Neraca diagram: kiri dan kanan berupa balok huruf atau titik, miring dihitung dari bobot. */
export function miringDari(kiri: number, kanan: number): Miring {
  return kiri > kanan ? -1 : kiri < kanan ? 1 : 0;
}

/** Diagram neraca dua balok huruf (tanpa menampilkan bobot). */
export function NeracaDuaBalok({ a, b, bobotA, bobotB, kelas = "", sorot = false, ukuran = 34 }: { a: string; b: string; bobotA: number; bobotB: number; kelas?: string; sorot?: boolean; ukuran?: number }) {
  const m = miringDari(bobotA, bobotB);
  return (
    <NeracaRangka
      miring={m}
      kiri={<BalokHuruf huruf={a} sorot={sorot} ukuran={ukuran} />}
      kanan={<BalokHuruf huruf={b} sorot={sorot} ukuran={ukuran} />}
      kelas={kelas}
      label={`Neraca: balok ${a} di kiri, balok ${b} di kanan. ${m === 0 ? "Seimbang." : m === -1 ? "Sisi kiri turun." : "Sisi kanan turun."}`}
    />
  );
}

/* ------------------------------ Muka jam ------------------------------ */

const KOS = (d: number) => Math.cos(((d - 90) * Math.PI) / 180);
const SIN = (d: number) => Math.sin(((d - 90) * Math.PI) / 180);
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Isi gambar jam (tanpa elemen svg) pada kotak 120 x 120. Dipakai JamMuka dan adegan video. */
export function IsiJam({
  jam,
  menit = 0,
  gaya = "garis",
  sorot = null,
  onAngka,
  tonjol,
}: {
  jam: number;
  menit?: number;
  gaya?: "garis" | "dinding";
  sorot?: number | null;
  onAngka?: (n: number) => void;
  tonjol?: "pendek" | "panjang";
}) {
  const j = jam12(jam);
  const sudutJam = (j % 12) * 30 + menit * 0.5;
  const sudutMenit = menit * 6;
  const dinding = gaya === "dinding";
  const ujung = (sudut: number, panjang: number) => ({ x: r2(60 + panjang * KOS(sudut)), y: r2(60 + panjang * SIN(sudut)) });
  const gerak = (sudut: number) => ({ transform: `rotate(${sudut}deg)`, transformOrigin: "60px 60px", transition: "transform 0.7s cubic-bezier(.3,1.2,.5,1)" });
  return (
    <>
      {dinding ? (
        <>
          <circle cx="60" cy="60" r="58" fill="#A8672D" stroke="#6B3E14" strokeWidth="2" />
          <circle cx="60" cy="60" r="51" fill="#FFFBEB" stroke="#6B3E14" strokeWidth="2" />
        </>
      ) : (
        <circle cx="60" cy="60" r="55" fill="white" stroke={TINTA} strokeWidth="3.5" />
      )}
      {Array.from({ length: 60 }, (_, i) => {
        const besar = i % 5 === 0;
        const a = ujung(i * 6, 47);
        const b = ujung(i * 6, besar ? 42 : 44.5);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={dinding ? "#6B3E14" : TINTA} strokeWidth={besar ? 1.6 : 0.7} opacity={besar ? 1 : 0.55} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const p = ujung(n * 30, 34);
        const aktif = sorot === n;
        return (
          <g key={n}>
            {aktif ? <circle cx={p.x} cy={p.y} r="7.5" fill="#FFE566" stroke="#F0AB00" strokeWidth="1.5" /> : null}
            <text x={p.x} y={p.y + 3.6} textAnchor="middle" fontSize={n % 3 === 0 ? 11 : 9.5} fontWeight="900" fill={TINTA}>
              {n}
            </text>
            {onAngka ? (
              <circle
                cx={p.x}
                cy={p.y}
                r="8"
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-label={`Arahkan jarum pendek ke angka ${n}`}
                style={{ cursor: "pointer" }}
                onClick={() => onAngka(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onAngka(n);
                  }
                }}
              />
            ) : null}
          </g>
        );
      })}
      <g style={gerak(sudutMenit)} opacity={tonjol === "pendek" ? 0.2 : 1}>
        <line x1="60" y1="60" x2="60" y2="22" stroke="#E11D48" strokeWidth={tonjol === "panjang" ? 5 : 3} strokeLinecap="round" />
      </g>
      <g style={gerak(sudutJam)} opacity={tonjol === "panjang" ? 0.2 : 1}>
        <line x1="60" y1="60" x2="60" y2="34" stroke={TINTA} strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="4" fill="#F0AB00" stroke={TINTA} strokeWidth="1.5" />
    </>
  );
}

/**
 * Muka jam analog. `jam` boleh jam 24; yang tergambar jam 12. Jarum pendek biru tebal (jam), jarum panjang merah tipis (menit).
 * Gaya "garis" untuk Picture (garis dan angka saja). Gaya "dinding" dipakai Concrete (bingkai kayu seperti jam dinding).
 * Bila `onAngka` diberikan, angka di muka jam dapat diketuk (jarum pendek berpindah ke sana).
 */
export function JamMuka({
  jam,
  menit = 0,
  gaya = "garis",
  kelas = "",
  sorot = null,
  onAngka,
  label,
  tonjol,
}: {
  jam: number;
  menit?: number;
  gaya?: "garis" | "dinding";
  kelas?: string;
  sorot?: number | null;
  onAngka?: (n: number) => void;
  label?: string;
  /** Menonjolkan satu jarum dan meredupkan jarum lainnya (untuk poster). */
  tonjol?: "pendek" | "panjang";
}) {
  const ket = label ?? `Jam: jarum pendek di angka ${jam12(jam)}, jarum panjang di angka ${menit === 0 ? 12 : menit / 5}`;
  return (
    <svg viewBox="0 0 120 120" className={`block h-auto ${kelas || "w-full max-w-[150px]"}`} role="img" aria-label={ket}>
      <IsiJam jam={jam} menit={menit} gaya={gaya} sorot={sorot} onAngka={onAngka} tonjol={tonjol} />
    </svg>
  );
}
/* ------------------------------ Batang ------------------------------ */

/** Batang tegak: `n` kotak satuan bertumpuk, huruf di bawah. Tanpa gambar benda. */
export function BatangTegak({ id, n, maks, sorot = false }: { id: string; n: number; maks: number; sorot?: boolean }) {
  const t = 11;
  const tinggi = maks * t;
  return (
    <svg viewBox={`0 0 44 ${tinggi + 24}`} className={`block w-11 ${sorot ? "drop-shadow-[0_0_4px_#F0AB00]" : ""}`} role="img" aria-label={`Batang ${id}, tinggi ${n}`} style={{ height: (tinggi + 24) * 1 }}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x="6" y={tinggi - (i + 1) * t + 1} width="32" height={t - 2} rx="2" fill={warnaHuruf(id)} stroke={TINTA} strokeWidth="1.6" />
      ))}
      <line x1="2" y1={tinggi + 2} x2="42" y2={tinggi + 2} stroke={TINTA} strokeWidth="2.5" strokeLinecap="round" />
      <text x="22" y={tinggi + 19} textAnchor="middle" fontSize="15" fontWeight="900" fill={TINTA}>
        {id}
      </text>
    </svg>
  );
}

/** Batang mendatar untuk lama kegiatan: satu kotak = satu jam. */
export function BatangDatar({ id, jam, maks }: { id: string; jam: number; maks: number }) {
  const t = 24;
  return (
    <svg viewBox={`0 0 ${maks * t + 34} 34`} className="block h-auto w-full" role="img" aria-label={`Kegiatan ${id}, ${jam} jam`}>
      <text x="12" y="23" textAnchor="middle" fontSize="16" fontWeight="900" fill={TINTA}>
        {id}
      </text>
      {Array.from({ length: jam }, (_, i) => (
        <rect key={i} x={28 + i * t} y="4" width={t - 3} height="26" rx="3" fill={warnaHuruf(id)} stroke={TINTA} strokeWidth="2" />
      ))}
    </svg>
  );
}

/** Jalur jam: kotak satu jam dari mulai sampai selesai, angka jam di bawah. Dipakai menghitung selisih. */
export function JalurJam({ mulai, selesai, sembunyi = false }: { mulai: number; selesai: number; sembunyi?: boolean }) {
  const n = selesai - mulai;
  const t = 34;
  const lebar = 260;
  const x0 = (lebar - n * t) / 2;
  const tampil = (j: number) => jam12(j);
  return (
    <svg viewBox={`0 0 ${lebar} 58`} className="block h-auto w-full max-w-[300px]" role="img" aria-label={`Jalur jam dari pukul ${tampil(mulai)} sampai pukul ${tampil(selesai)}${sembunyi ? "" : `, ${n} kotak`}`}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x0 + i * t + 1.5} y="6" width={t - 3} height="24" rx="4" fill={sembunyi ? "#E0E7FF" : "#FFE566"} stroke={TINTA} strokeWidth="2" />
      ))}
      {Array.from({ length: n + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * t} y1="30" x2={x0 + i * t} y2="38" stroke={TINTA} strokeWidth="2" />
          <text x={x0 + i * t} y="52" textAnchor="middle" fontSize="13" fontWeight="900" fill={TINTA}>
            {tampil(mulai + i)}
          </text>
        </g>
      ))}
    </svg>
  );
}
/** Garis bilangan sederhana yang bisa diketuk. Tanda untuk angka terpilih. */
export function GarisAngkaKetuk({
  dari,
  sampai,
  dipilih,
  benar = null,
  onPilih,
  mati = false,
}: {
  dari: number;
  sampai: number;
  dipilih: number | null;
  benar?: number | null;
  onPilih: (n: number) => void;
  mati?: boolean;
}) {
  const angka = Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i);
  return (
    <div className="space-y-1" role="group" aria-label={`Garis bilangan ${dari} sampai ${sampai}`}>
      <div className="relative flex items-end justify-between gap-0.5 px-1 pt-2">
        <span className="pointer-events-none absolute inset-x-1 bottom-[22px] h-1 rounded-full bg-[#1C01A5]" aria-hidden="true" />
        {angka.map((n) => {
          const aktif = dipilih === n;
          const ok = benar === n;
          return (
            <button
              key={n}
              type="button"
              disabled={mati}
              aria-label={`Angka ${n}`}
              aria-pressed={aktif}
              onClick={() => onPilih(n)}
              className="relative z-10 flex min-h-[64px] min-w-0 flex-1 flex-col items-center justify-end gap-0.5 pb-0.5"
            >
              <span className={`block h-6 w-6 rounded-full border-4 border-[#1C01A5] ${ok ? "bg-[#7FCB96]" : aktif ? "bg-[#F0AB00]" : "bg-white"}`} />
              <span className="text-base font-black leading-none text-[#1C01A5]">{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
