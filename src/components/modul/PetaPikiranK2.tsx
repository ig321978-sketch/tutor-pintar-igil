"use client";

import React, { useMemo, useState } from "react";
import { Awan, BIRU, Bunga, EMAS, KUNING, MERAH_MUDA, TENGAH } from "./CeritaBandingB";
import type { LangkahPeta } from "./PetaPikiranB";
import { LencanaSuara } from "./tahap-b-gaya";
import { JARAK_BARIS, LEBAR_KARTU, LEBAR_TENGAH, TINGGI_KARTU, tataLetakPeta } from "./peta-k2-tata";

/* ------------------------------------------------------------------------ */
/* Tahap 2: Mind-map Kelas 2, "Taman Ide". Matahari berwajah Igil di tengah,   */
/* kartu bernomor di kiri dan kanan, dihubungkan cabang berwarna di bawah      */
/* langit dan padang rumput. Kartu hanya memuat ikon dan judul. Uraian tiap    */
/* langkah dibacakan Suara Guru saat kartu diketuk. Tanpa kunci jawaban.       */
/* Kelas 1 tetap memakai PetaPikiranB.                                         */
/* ------------------------------------------------------------------------ */

const WARNA = [
  { tepi: "#2563EB", muda: "#DBEAFE" },
  { tepi: "#DB2777", muda: "#FCE7F3" },
  { tepi: "#D97706", muda: "#FEF3C7" },
  { tepi: "#16A34A", muda: "#DCFCE7" },
  { tepi: "#7C3AED", muda: "#EDE9FE" },
  { tepi: "#0D9488", muda: "#CCFBF1" },
];

const CSS = `
.pk2-kartu{transform:rotate(var(--r,0deg));transition:box-shadow .2s}
.pk2-ayun{animation:pk2-ayun 3.4s ease-in-out infinite}
@keyframes pk2-ayun{0%,100%{transform:rotate(var(--r,0deg))}50%{transform:rotate(calc(var(--r,0deg) * -1))}}
.pk2-pop{animation:pk2-pop .5s cubic-bezier(.3,1.5,.5,1) both}
@keyframes pk2-pop{from{transform:scale(.86) rotate(var(--r,0deg))}to{transform:scale(1) rotate(0deg)}}
@media (prefers-reduced-motion:reduce){.pk2-ayun,.pk2-pop{animation:none}}
`;

function Langit() {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 h-44 w-full" viewBox="0 0 300 147" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <Awan x={30} y={118} kelas="igil-awan" />
      <Awan x={262} y={106} kelas="igil-awan igil-awan-lambat" />
    </svg>
  );
}

function Rumput() {
  return (
    <svg className="pointer-events-none absolute bottom-0 left-0 h-20 w-full" viewBox="0 0 300 60" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 20 C50 6 110 26 180 14 C235 6 270 18 300 12 V60 H0 Z" fill="#CDEBD3" />
      <rect x="0" y="28" width="300" height="32" fill="#B7E0C0" />
      <path d="M0 28 H300" stroke="#8FC9A0" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <Bunga x={20} y={36} warna={MERAH_MUDA} />
      <Bunga x={98} y={42} warna="#FFFFFF" />
      <Bunga x={160} y={34} warna={KUNING} />
      <Bunga x={232} y={42} warna={MERAH_MUDA} />
      <Bunga x={284} y={34} warna="#FFFFFF" />
    </svg>
  );
}

function Matahari({ meriah, maskot }: { meriah: boolean; maskot?: React.ReactNode }) {
  return (
    <div className="relative h-[84px] w-[84px]" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <g className={meriah ? "igil-putar-cepat" : "igil-putar"} style={TENGAH}>
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="50" y1="3" x2="50" y2="14" stroke={EMAS} strokeWidth="6" strokeLinecap="round" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </g>
        <circle cx="50" cy="50" r="33" fill={KUNING} stroke={BIRU} strokeWidth="4" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{maskot ?? <span className="text-3xl">🦉</span>}</span>
    </div>
  );
}

export function PetaPikiranK2({
  langkah,
  judul,
  speakGuru,
  maskot,
}: {
  langkah: LangkahPeta[];
  judul: string;
  speakGuru: (teks: string) => void;
  maskot?: React.ReactNode;
}) {
  const [didengar, setDidengar] = useState<number[]>([]);
  const n = langkah.length;
  const semua = n > 0 && didengar.length >= n;
  const tata = useMemo(() => tataLetakPeta(n), [n]);

  const ketuk = (l: LangkahPeta) => {
    speakGuru(`${l.stepTitle}. ${l.stepDesc}`);
    setDidengar((d) => (d.includes(l.stepNumber) ? d : [...d, l.stepNumber]));
  };

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border-4 border-[#1C01A5] shadow-[0_6px_0_rgba(28,1,165,0.25)]"
      style={{ background: "linear-gradient(180deg,#BFE3FF 0%,#E6F4FF 55%,#DFF3E3 100%)" }}
    >
      <style>{CSS}</style>
      <Langit />
      <Rumput />

      <div className="relative space-y-3 px-3 pb-24 pt-4">
        <div className="mx-auto w-fit max-w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-4 py-2 text-center shadow-[0_4px_0_rgba(28,1,165,0.25)]">
          <p className="text-[10px] font-black tracking-widest text-[#1C01A5]/60">PETA IDE</p>
          <p className="text-lg font-black leading-tight text-[#1C01A5]">
            <span aria-hidden="true" className="text-[#F0AB00]">★ </span>
            {judul}
            <span aria-hidden="true" className="text-[#F0AB00]"> ★</span>
          </p>
        </div>

        <p className="mx-auto w-fit rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-xs font-black text-[#1C01A5]">Ketuk kartu untuk mendengarnya 👆</p>

        <div className="relative mx-auto w-full max-w-[460px]" style={{ height: tata.tinggi }}>
          <svg viewBox={`0 0 100 ${tata.tinggi}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {tata.simpul.map((s) => {
              const sudah = didengar.includes(langkah[s.indeks].stepNumber);
              return (
                <path
                  key={s.indeks}
                  d={s.jalur}
                  fill="none"
                  stroke={WARNA[s.indeks % WARNA.length].tepi}
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: sudah ? 1 : 0.5, transition: "opacity .3s" }}
                />
              );
            })}
          </svg>

          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `${LEBAR_KARTU}% ${LEBAR_TENGAH}% ${LEBAR_KARTU}%`,
              gridTemplateRows: `repeat(${tata.baris}, ${TINGGI_KARTU}px)`,
              rowGap: JARAK_BARIS,
            }}
          >
            {tata.simpul.map((s) => {
              const l = langkah[s.indeks];
              const w = WARNA[s.indeks % WARNA.length];
              const sudah = didengar.includes(l.stepNumber);
              const judulKartu = l.stepTitle.replace(/^\d+\.\s*/, "");
              return (
                <div key={s.indeks} className="relative" style={{ gridColumn: s.sisi === -1 ? 1 : 3, gridRow: s.baris + 1 }}>
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white ${s.sisi === -1 ? "-right-2" : "-left-2"}`}
                    style={{ backgroundColor: w.tepi }}
                  />
                  <button
                    type="button"
                    aria-label={`Dengarkan kartu ${l.stepNumber}: ${judulKartu}`}
                    onClick={() => ketuk(l)}
                    className={`pk2-kartu ${sudah ? "pk2-pop" : "pk2-ayun"} flex h-full w-full flex-col overflow-hidden rounded-2xl border-4 text-center shadow-[0_5px_0_rgba(28,1,165,0.18)]`}
                    style={
                      {
                        backgroundColor: w.muda,
                        borderColor: w.tepi,
                        "--r": `${(s.baris + (s.sisi === -1 ? 0 : 1)) % 2 === 0 ? -1.2 : 1.2}deg`,
                        animationDelay: sudah ? undefined : `${(s.indeks % 4) * 0.35}s`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="flex h-9 shrink-0 items-center justify-between px-1.5" style={{ backgroundColor: w.tepi }}>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black" style={{ color: w.tepi }}>
                        {l.stepNumber}
                      </span>
                      <span className="text-[22px] leading-none" aria-hidden="true">
                        {l.icon}
                      </span>
                      {sudah ? (
                        <span key="bintang" className="igil-muncul text-lg leading-none" aria-hidden="true">
                          ⭐
                        </span>
                      ) : (
                        <LencanaSuara kelas="h-6 w-6" />
                      )}
                    </span>
                    <span className="flex min-h-0 flex-1 items-center justify-center px-1.5 py-1 text-[13px] font-black leading-[1.15] text-[#1C01A5]">{judulKartu}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2" style={{ top: tata.tengah }}>
            <Matahari meriah={semua} maskot={maskot} />
          </div>
        </div>

        <p
          role="status"
          aria-live="polite"
          className={`mx-auto w-fit rounded-full border-4 px-4 py-1.5 text-center text-base font-black ${
            semua ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"
          }`}
        >
          {semua ? "🌟 Hebat! Semua sudah didengar" : `🌻 ${didengar.length} dari ${n} kartu`}
        </p>
      </div>
    </div>
  );
}
