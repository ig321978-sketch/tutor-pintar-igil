"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";

export const BIRU = "#1C01A5";
export const EMAS = "#F0AB00";
export const KUNING = "#FFE566";
export const HIJAU = "#7FCB96";
export const MERAH_MUDA = "#E98989";
export const WARNA = [MERAH_MUDA, EMAS, HIJAU, KUNING];

export const BAWAH = { transformBox: "fill-box" as const, transformOrigin: "50% 100%" };
export const TENGAH = { transformBox: "fill-box" as const, transformOrigin: "50% 50%" };

export interface Cerita {
  id: string;
  voiceNarration: string;
  sceneType: string;
}

/* ------------------------------------------------------------------ */
/* Potongan gambar kecil yang dipakai ulang                            */
/* ------------------------------------------------------------------ */

export function Mata({ x, y, r = 2.6 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={BIRU} />
      <circle cx={x + r * 0.35} cy={y - r * 0.4} r={r * 0.38} fill="#FFFFFF" />
    </g>
  );
}

export function Pipi({ x, y, r = 3 }: { x: number; y: number; r?: number }) {
  return <ellipse cx={x} cy={y} rx={r} ry={r * 0.65} fill={MERAH_MUDA} opacity={0.65} />;
}

export function Senyum({ x, y, l = 5 }: { x: number; y: number; l?: number }) {
  return (
    <path
      d={`M${x - l} ${y} Q${x} ${y + l} ${x + l} ${y}`}
      fill="none"
      stroke={BIRU}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  );
}

export function Anak({ x, y, rambut, pita }: { x: number; y: number; rambut: string; pita?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="19" fill="#FFE0BD" stroke={BIRU} strokeWidth="2.6" />
      <path
        d="M-19 -2 C-20 -26 20 -26 19 -2 C9 -13 -9 -13 -19 -2 Z"
        fill={rambut}
        stroke={BIRU}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {pita ? (
        <g>
          <path d="M-16 -16 L-26 -22 L-24 -10 Z M-16 -16 L-8 -26 L-6 -14 Z" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="-16" cy="-16" r="2.6" fill={KUNING} stroke={BIRU} strokeWidth="1.4" />
        </g>
      ) : null}
      <Mata x={-7} y={3} r={2.8} />
      <Mata x={7} y={3} r={2.8} />
      <Pipi x={-12} y={9} />
      <Pipi x={12} y={9} />
      <Senyum x={0} y={9} l={5} />
    </g>
  );
}

function Burung({ x, y, warna = MERAH_MUDA }: { x: number; y: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-4 -9 L-6 -16 M0 -9 L0 -17 M4 -9 L6 -16" stroke={BIRU} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-3 8 V14 M4 8 V14" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse rx="14" ry="10.5" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <path d="M-14 -1 L-23 -8 L-21 3 Z" fill={warna} stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M-5 3 Q0 11 7 3 Q1 0 -5 3 Z" fill="#FFFFFF" opacity="0.55" />
      <path d="M13 -2 L21 1 L13 5 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <Mata x={6} y={-3} r={2.8} />
      <Pipi x={3} y={3} r={2.6} />
    </g>
  );
}

export function Bunga({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 4 V17" stroke="#3E8E5A" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={Math.sin((a * Math.PI) / 180) * 4.4}
          cy={-Math.cos((a * Math.PI) / 180) * 4.4}
          r="3.4"
          fill={warna}
          stroke={BIRU}
          strokeWidth="1.2"
        />
      ))}
      <circle r="2.6" fill={KUNING} stroke={BIRU} strokeWidth="1.2" />
    </g>
  );
}

export function Awan({ x, y, kelas }: { x: number; y: number; kelas: string }) {
  return (
    <g className={kelas}>
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="0" rx="26" ry="11" fill="#FFFFFF" stroke="#C9DDF2" strokeWidth="2" />
        <ellipse cx="14" cy="-7" rx="16" ry="10" fill="#FFFFFF" stroke="#C9DDF2" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="24" ry="9" fill="#FFFFFF" />
        <ellipse cx="14" cy="-6" rx="14" ry="8" fill="#FFFFFF" />
      </g>
    </g>
  );
}

export function Matahari() {
  return (
    <g>
      <g className="igil-putar" style={{ ...TENGAH }}>
        <g transform="translate(262 38)">
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1="-24"
              x2="0"
              y2="-31"
              stroke={EMAS}
              strokeWidth="3.4"
              strokeLinecap="round"
              transform={`rotate(${i * 36})`}
            />
          ))}
        </g>
      </g>
      <circle cx="262" cy="38" r="19" fill={KUNING} stroke={EMAS} strokeWidth="3" />
      <Mata x={256} y={36} r={2.4} />
      <Mata x={268} y={36} r={2.4} />
      <Pipi x={252} y={42} r={2.6} />
      <Pipi x={272} y={42} r={2.6} />
      <Senyum x={262} y={42} l={4.5} />
    </g>
  );
}

export function Latar() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#DFF1FF" />
      <Matahari />
      <Awan x={64} y={34} kelas="igil-awan" />
      <Awan x={168} y={22} kelas="igil-awan igil-awan-lambat" />
      <path d="M0 146 C50 126 110 150 180 138 C235 128 270 140 300 134 V208 H0 Z" fill="#CDEBD3" />
      <rect x="0" y="152" width="300" height="56" fill="#B7E0C0" />
      <path d="M0 152 H300" stroke="#8FC9A0" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <Bunga x={14} y={176} warna={MERAH_MUDA} />
      <Bunga x={150} y={188} warna={KUNING} />
      <Bunga x={284} y={178} warna="#FFFFFF" />
      <Bunga x={226} y={192} warna={MERAH_MUDA} />
      <Bunga x={72} y={192} warna="#FFFFFF" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Empat adegan cerita                                                 */
/* ------------------------------------------------------------------ */

function Sepeda({ x, y, warna }: { x: number; y: number; warna: string }) {
  const rangka = "M14 40 L42 40 L30 18 M42 40 L54 18 L62 40 M24 18 H36 M50 13 H60 M54 18 V13";
  return (
    <g transform={`translate(${x} ${y})`}>
      {[14, 62].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="40" r="13" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
          <g className="igil-putar-cepat" style={TENGAH}>
            <path
              d={`M${cx - 10} 40 H${cx + 10} M${cx} 30 V50 M${cx - 7} 33 L${cx + 7} 47 M${cx - 7} 47 L${cx + 7} 33`}
              stroke={BIRU}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
          <circle cx={cx} cy="40" r="2.6" fill={warna} stroke={BIRU} strokeWidth="1.4" />
        </g>
      ))}
      <path d={rangka} fill="none" stroke={BIRU} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d={rangka} fill="none" stroke={warna} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function AdeganSepedaBurung() {
  const xs = [8, 102, 196];
  const warna = [MERAH_MUDA, EMAS, HIJAU];
  return (
    <>
      <Latar />
      {xs.map((x, i) => (
        <g key={x}>
          <Sepeda x={x} y={98} warna={warna[i]} />
          <g className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.3}s` }}>
            <Burung x={x + 38} y={102} warna={[MERAH_MUDA, "#9DB7FF", KUNING][i]} />
          </g>
        </g>
      ))}
    </>
  );
}

function Kursi({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M5 30 V44 M31 30 V44" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <rect x="2" y="0" width="8" height="26" rx="3.5" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <rect x="0" y="23" width="38" height="9" rx="4" fill={warna} stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

function Balon({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 16 Q-5 24 3 30" fill="none" stroke={BIRU} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="13" ry="16" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <path d="M-3 15 L3 15 L0 19 Z" fill={BIRU} />
      <ellipse cx="-5" cy="-7" rx="3.2" ry="5" fill="#FFFFFF" opacity="0.7" transform="rotate(20 -5 -7)" />
      <Mata x={-4} y={0} r={2} />
      <Mata x={4} y={0} r={2} />
      <Senyum x={0} y={5} l={3.6} />
    </g>
  );
}

function AdeganKursiBalon() {
  const xs = Array.from({ length: 6 }, (_, i) => 8 + i * 47);
  return (
    <>
      <Latar />
      {xs.map((x, i) => (
        <g key={x}>
          {i >= 4 ? (
            <rect
              className="igil-denyut"
              x={x - 5}
              y={101}
              width="48"
              height="56"
              rx="12"
              fill="none"
              stroke={EMAS}
              strokeWidth="3"
              strokeDasharray="6 5"
              style={TENGAH}
            />
          ) : null}
          <Kursi x={x} y={110} warna={[MERAH_MUDA, HIJAU, KUNING][i % 3]} />
          {i < 4 ? (
            <g className="igil-goyang" style={{ ...BAWAH, animationDelay: `${i * 0.25}s` }}>
              <Balon x={x + 14} y={78} warna={WARNA[i % 4]} />
            </g>
          ) : null}
        </g>
      ))}
    </>
  );
}

function Kelereng({ x, y, warna, jeda }: { x: number; y: number; warna: string; jeda: number }) {
  return (
    <g className="igil-lompat" style={{ ...BAWAH, animationDelay: `${jeda}s` }}>
      <circle cx={x} cy={y} r="11" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x - 4} cy={y - 4} rx="3.6" ry="2" fill="#FFFFFF" opacity="0.85" transform={`rotate(-30 ${x - 4} ${y - 4})`} />
      <path d={`M${x - 4} ${y + 3} Q${x} ${y + 7} ${x + 4} ${y + 3}`} fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function AdeganKelereng() {
  const kira = Array.from({ length: 5 }, (_, i) => 84 + i * 30);
  const tika = Array.from({ length: 8 }, (_, i) => 84 + i * 28);
  return (
    <>
      <Latar />
      <Anak x={32} y={60} rambut={BIRU} pita />
      <Anak x={32} y={130} rambut={EMAS} />
      {kira.map((x, i) => (
        <path
          key={`g${x}`}
          d={`M${x} 71 L${tika[i]} 119`}
          stroke={BIRU}
          strokeWidth="2.2"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      {kira.map((x, i) => (
        <Kelereng key={`k${x}`} x={x} y={60} warna={WARNA[i % 4]} jeda={i * 0.2} />
      ))}
      {tika.map((x, i) => (
        <g key={`t${x}`}>
          {i >= 5 ? (
            <circle
              className="igil-denyut"
              cx={x}
              cy={130}
              r="16"
              fill="none"
              stroke={EMAS}
              strokeWidth="3"
              strokeDasharray="5 4"
              style={TENGAH}
            />
          ) : null}
          <Kelereng x={x} y={130} warna={WARNA[(i + 1) % 4]} jeda={i * 0.15} />
        </g>
      ))}
    </>
  );
}

function Bola({ x, y, warna, jeda }: { x: number; y: number; warna: string; jeda: number }) {
  return (
    <g className="igil-lompat" style={{ ...BAWAH, animationDelay: `${jeda}s` }}>
      <circle cx={x} cy={y} r="13" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <path d={`M${x - 11} ${y - 5} Q${x} ${y - 10} ${x + 11} ${y - 5}`} fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.7" />
      <Mata x={x - 4.5} y={y - 1} r={2} />
      <Mata x={x + 4.5} y={y - 1} r={2} />
      <Senyum x={x} y={y + 3.5} l={3.6} />
    </g>
  );
}

function AdeganBolaRenggang() {
  const rapat = Array.from({ length: 5 }, (_, i) => 86 + i * 29);
  const renggang = Array.from({ length: 5 }, (_, i) => 28 + i * 61);
  return (
    <>
      <Latar />
      {rapat.map((x, i) => (
        <path
          key={`p${x}`}
          d={`M${x} 82 L${renggang[i]} 114`}
          stroke={BIRU}
          strokeWidth="2.2"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      {rapat.map((x, i) => (
        <Bola key={`r${x}`} x={x} y={68} warna={WARNA[i % 4]} jeda={i * 0.2} />
      ))}
      {renggang.map((x, i) => (
        <Bola key={`g${x}`} x={x} y={128} warna={WARNA[(i + 2) % 4]} jeda={i * 0.2 + 0.1} />
      ))}
      {/* penggaris pendek dan panjang */}
      <g stroke={EMAS} strokeWidth="3.4" strokeLinecap="round">
        <path d="M73 38 H213" />
        <path d="M73 33 V43 M213 33 V43" />
        <path d="M15 166 H287" />
        <path d="M15 161 V171 M287 161 V171" />
      </g>
    </>
  );
}

function Adegan({ jenis }: { jenis: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita membandingkan banyak benda">
      {jenis === "banding-sepeda-burung" && <AdeganSepedaBurung />}
      {jenis === "banding-kursi-balon" && <AdeganKursiBalon />}
      {jenis === "banding-kelereng" && <AdeganKelereng />}
      {jenis === "banding-bola-renggang" && <AdeganBolaRenggang />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Halaman buku cerita                                                 */
/* ------------------------------------------------------------------ */

const HALAMAN = [
  { tepi: "#E98989", latar: "#FFF1F1" },
  { tepi: "#F0AB00", latar: "#FFF8DC" },
  { tepi: "#7FCB96", latar: "#EEFBF1" },
  { tepi: "#6D5BDE", latar: "#EEF0FF" },
];

export function CeritaBandingB(props: { cerita: Cerita[]; speakGuru: (teks: string) => void }) {
  return <BukuCerita {...props} adegan={(c) => <Adegan jenis={c.sceneType} />} />;
}

export function BukuCerita({
  cerita,
  speakGuru,
  adegan,
}: {
  cerita: Cerita[];
  speakGuru: (teks: string) => void;
  adegan: (c: Cerita, i: number) => React.ReactNode;
}) {
  const [bicara, setBicara] = useState<string | null>(null);
  const waktu = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (waktu.current) clearTimeout(waktu.current);
    },
    []
  );

  const dengar = (c: Cerita) => {
    speakGuru(c.voiceNarration);
    setBicara(c.id);
    if (waktu.current) clearTimeout(waktu.current);
    waktu.current = setTimeout(() => setBicara(null), Math.min(25000, 1000 + c.voiceNarration.length * 70));
  };

  return (
    <div className="w-full overflow-x-auto pb-3 [scroll-snap-type:x_mandatory]">
      <div className="flex flex-nowrap gap-5 pl-1 pr-3 pt-2">
        {cerita.map((c, i) => {
          const h = HALAMAN[i % HALAMAN.length];
          const aktif = bicara === c.id;
          return (
            <div
              key={c.id}
              className="relative w-[300px] shrink-0 space-y-3 rounded-l-md rounded-r-[2rem] border-4 border-l-[14px] py-3 pl-2 pr-3 [scroll-snap-align:start]"
              style={{
                borderColor: h.tepi,
                backgroundColor: h.latar,
                // Halaman buku: punggung berwarna di kiri, tepi kertas bertumpuk di kanan.
                boxShadow: `inset 12px 0 14px -10px rgba(0,0,0,0.22), 3px 0 0 #FFFFFF, 5px 0 0 ${h.tepi}99, 7px 0 0 #FFFFFF, 8px 0 0 ${h.tepi}99, 0 7px 0 ${h.tepi}66`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 rounded-br-[2rem]"
                style={{ background: `linear-gradient(135deg, transparent 50%, ${h.tepi}88 50%)` }}
              />
              <div className="flex items-center justify-between gap-2">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-2xl font-black text-white shadow"
                  style={{ backgroundColor: h.tepi }}
                  aria-label={`Halaman ${i + 1} dari ${cerita.length}`}
                >
                  {i + 1}
                </span>
                <TombolSuaraGuru onClick={() => dengar(c)} kelas={aktif ? "igil-lompat" : ""} />
              </div>

              <button
                type="button"
                onClick={() => dengar(c)}
                aria-label="Dengarkan cerita"
                className={`igil-tanpa-tepi relative block w-full overflow-hidden rounded-[1.5rem] border-4 border-white bg-white p-0 shadow-[0_5px_0_rgba(28,1,165,0.2)] ${
                  aktif ? "ring-4 ring-[#FFE566]" : ""
                }`}
              >
                {adegan(c, i)}
                {aktif ? (
                  <>
                    <span className="igil-lompat absolute left-3 top-3 text-2xl" aria-hidden="true">
                      🎵
                    </span>
                    <span className="igil-lompat absolute bottom-3 right-3 text-2xl" style={{ animationDelay: "0.3s" }} aria-hidden="true">
                      🎶
                    </span>
                  </>
                ) : null}
              </button>

              <div className="flex items-center justify-between px-1" aria-hidden="true">
                <span className="igil-lompat text-3xl">👆</span>
                <span className="flex items-center gap-1.5">
                  {cerita.map((_, k) => (
                    <span
                      key={k}
                      className="block h-3.5 w-3.5 rounded-full border-2 border-[#1C01A5]"
                      style={{ backgroundColor: k === i ? h.tepi : "#FFFFFF" }}
                    />
                  ))}
                </span>
                <span className="text-3xl">{i < cerita.length - 1 ? "👉" : "⭐"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
