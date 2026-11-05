"use client";

import React, { useState } from "react";
import { BAWAH, BIRU, EMAS, KUNING, TENGAH } from "./CeritaBandingB";
import { KatakSVG, Tokoh } from "./gambar-maju-mundur-c";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";

/* ------------------------------------------------------------------------ */
/* Sub-Bab C: perangkat gambar dan permainan yang dipakai berulang.           */
/* ------------------------------------------------------------------------ */

const WARNA_BALOK = ["#FFE566", "#C7B8FF", "#FFD27A", "#B9E4C9"];
export const warnaBalok = (n: number) => WARNA_BALOK[n % WARNA_BALOK.length];

/** Tumpukan balok setinggi n petak. `label` tampil di atas tumpukan. `kosong` menggambar garis putus saja. */
export function TumpukanBalok({
  n,
  petak = 11,
  label,
  nyala = false,
  kosong = false,
  kelas = "",
}: {
  n: number;
  petak?: number;
  label?: React.ReactNode;
  nyala?: boolean;
  kosong?: boolean;
  kelas?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col items-center justify-end ${kelas}`}>
      {label !== undefined && label !== null ? (
        <span className="mb-0.5 text-base font-black leading-none text-[#1C01A5]">{label}</span>
      ) : null}
      <div className="flex w-full flex-col-reverse pb-0.5">
        {Array.from({ length: n }, (_, i) => (
          <span
            key={i}
            className={`block w-full box-border rounded-[3px] ${
              kosong ? "border-2 border-dashed border-[#F0AB00] bg-white/70" : "border-2 border-[#1C01A5]"
            }`}
            style={{
              height: petak,
              marginBottom: -2,
              backgroundColor: kosong ? undefined : nyala ? EMAS : warnaBalok(n),
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Garis bilangan --------------------------- */

const GX = (n: number) => 15 + (n - 1) * 30;

export type Busur = { dari: number; ke: number; warna: string };

/** Garis bilangan 1 sampai 10 dengan katak yang bisa melompat. */
export function GarisBilangan({
  posisi,
  busur = [],
  tandai = [],
}: {
  posisi?: number;
  busur?: Busur[];
  tandai?: number[];
}) {
  return (
    <svg viewBox="0 0 300 80" className="block h-auto w-full" role="img" aria-label="Garis bilangan satu sampai sepuluh">
      <line x1={GX(1) - 12} x2={GX(10) + 12} y1="62" y2="62" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {busur.map((b, i) => {
        const a = GX(b.dari);
        const c = GX(b.ke);
        const puncak = 44 - Math.min(26, Math.abs(c - a) * 0.4);
        return (
          <g key={i}>
            <path
              d={`M${a} 44 Q${(a + c) / 2} ${puncak} ${c} 44`}
              fill="none"
              stroke={b.warna}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="1 6"
            />
            <polygon points={`${c - 5.5},42 ${c + 5.5},42 ${c},51`} fill={b.warna} stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
          </g>
        );
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const n = i + 1;
        const sorot = tandai.includes(n) || posisi === n;
        return (
          <g key={n}>
            <circle cx={GX(n)} cy="62" r="11" fill={sorot ? KUNING : "#FFFFFF"} stroke={BIRU} strokeWidth="2.4" />
            <text x={GX(n)} y="66.5" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {posisi ? (
        <g style={{ transform: `translateX(${GX(posisi)}px)`, transition: "transform 0.4s ease" }}>
          <g key={posisi} className="igil-lompat" style={BAWAH}>
            <KatakSVG x={0} y={51} s={0.8} />
          </g>
        </g>
      ) : null}
    </svg>
  );
}

/* ------------------------------ Anak berpapan ---------------------------- */

const ANAK: Record<string, { rambut: string; baju: string }> = {
  Upe: { rambut: BIRU, baju: EMAS },
  Kira: { rambut: "#7A4A1E", baju: "#FFFFFF" },
  Malosi: { rambut: EMAS, baju: BIRU },
  Wei: { rambut: "#1F2937", baju: KUNING },
  Halim: { rambut: "#7A4A1E", baju: "#C7D2FE" },
  Tika: { rambut: BIRU, baju: "#FFFFFF" },
};

/** Anak yang mengangkat papan angka. `nomor` boleh "?" untuk papan kosong. */
export function AnakPapan({
  nama,
  nomor,
  sorot = false,
  tinggi = "h-24",
}: {
  nama: string;
  nomor: number | string;
  sorot?: boolean;
  tinggi?: string;
}) {
  const w = ANAK[nama] ?? ANAK.Upe;
  return (
    <div className="flex min-w-0 flex-col items-center">
      <svg viewBox="-18 -108 56 112" className={`${tinggi} w-auto`} aria-hidden="true">
        <Tokoh x={0} y={0} rambut={w.rambut} baju={w.baju} angkat>
          <path d="M17 -36 V-76" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
          <rect
            x="1"
            y="-104"
            width="32"
            height="28"
            rx="6"
            fill={sorot ? KUNING : "#FFFFFF"}
            stroke={BIRU}
            strokeWidth="2.6"
            strokeDasharray={nomor === "?" ? "4 3" : undefined}
          />
          <text x="17" y="-83" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
            {nomor}
          </text>
        </Tokoh>
      </svg>
      <span className="text-[11px] font-black leading-none text-[#1C01A5]">{nama}</span>
    </div>
  );
}

/* ------------------------------ Hubungkan titik -------------------------- */

export type Titik = [number, number];

/**
 * Hubungkan titik berurutan. `urutan` adalah daftar nomor titik yang harus diketuk.
 * `awal` titik pertama sudah terhubung. `hasil` digambar di belakang garis setelah selesai.
 */
export function HubungkanTitik({
  titik,
  urutan,
  awal = 0,
  tutup = false,
  hasil,
  onSelesai,
}: {
  titik: Titik[];
  urutan: number[];
  awal?: number;
  tutup?: boolean;
  hasil?: React.ReactNode;
  onSelesai?: () => void;
}) {
  const [k, setK] = useState(awal);
  const [salah, setSalah] = useState<{ n: number; kali: number } | null>(null);
  const [gagal, setGagal] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const selesai = k >= urutan.length;
  const dikunjungi = urutan.slice(0, k);
  const berikut = selesai ? null : urutan[k];

  const ketuk = (n: number) => {
    if (selesai || dikunjungi.includes(n)) return;
    if (n === berikut) {
      const baru = k + 1;
      setK(baru);
      setSalah(null);
      setKabar(null);
      if (baru >= urutan.length) {
        letusan.picu();
        onSelesai?.();
      }
    } else {
      setGagal((g) => g + 1);
      setSalah({ n, kali: gagal + 1 });
      setKabar({ teks: "Belum. Cari bilangan berikutnya, ya.", ok: false });
    }
  };

  const garis: [Titik, Titik][] = [];
  for (let i = 1; i < k; i++) garis.push([titik[urutan[i - 1] - 1], titik[urutan[i] - 1]]);
  if (selesai && tutup) garis.push([titik[urutan[urutan.length - 1] - 1], titik[urutan[0] - 1]]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <svg
          viewBox="0 0 300 220"
          className="block h-auto w-full rounded-2xl border-4 border-[#1C01A5] bg-white"
          role="group"
          aria-label="Hubungkan titik bernomor"
        >
          {selesai ? hasil : null}
          {garis.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={EMAS} strokeWidth="5" strokeLinecap="round" />
          ))}
          {titik.map((t, i) => {
            const n = i + 1;
            const sudah = dikunjungi.includes(n);
            const goyang = salah?.n === n;
            const denyut = gagal >= 3 && n === berikut;
            return (
              <g
                key={goyang ? `${n}-${salah?.kali}` : n}
                role="button"
                tabIndex={0}
                aria-label={`Titik ${n}`}
                onClick={() => ketuk(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(n);
                  }
                }}
                className={`cursor-pointer outline-none ${goyang ? "igil-goyang" : denyut ? "igil-denyut" : ""}`}
                style={TENGAH}
              >
                <circle cx={t[0]} cy={t[1]} r="20" fill="transparent" />
                <circle cx={t[0]} cy={t[1]} r="12.5" fill={sudah ? KUNING : "#FFFFFF"} stroke={BIRU} strokeWidth="2.6" />
                <text x={t[0]} y={t[1] + 4.6} textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </div>
  );
}
