"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { JUDUL_PETA, LANGKAH_PAPAN, PETUNJUK_PETA, SELESAI_PETA, type GambarMini } from "./data-peta";

/**
 * Mind-map Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (label kosong): sebuah pohon bilangan dengan batang tengah dan lima cabang bergantian kiri dan kanan.
 * Di satu sisi tiap cabang ada gambar kecil sendiri (tabel tersaring, pohon faktor mini, hasil kali prima, dua faktorisasi berpasangan, tabel pembagi) dan di sisi lain label kosong "?".
 * Ketuk label: judul langkah muncul, cabang menyala hijau, dan Guru membacakan langkahnya. Komponen sendiri (bukan PetaLabel), muat satu layar 344 piksel.
 */
const UNGU = "#4C1D95";
const ORANYE = "#EA580C";
const HIJAU = "#15803D";

/** Gambar kecil tiap langkah (SVG polos, dekoratif; teks paling kecil 10 piksel). */
function MiniGambar({ jenis }: { jenis: GambarMini }) {
  return (
    <svg viewBox="0 0 64 56" width={64} height={56} aria-hidden="true" className="shrink-0">
      {jenis === "saring" ? (
        <g>
          {Array.from({ length: 15 }, (_, i) => {
            const n = i + 1;
            const x = 3 + (i % 5) * 12;
            const y = 6 + Math.floor(i / 5) * 15;
            const prima = [2, 3, 5, 7, 11, 13].includes(n);
            return (
              <g key={n}>
                <rect x={x} y={y} width={11} height={13} rx={2} fill={prima ? "#BBF7D0" : "#E5E7EB"} stroke={prima ? HIJAU : "#9CA3AF"} strokeWidth={1.2} />
                {prima ? null : <path d={`M${x + 2} ${y + 2} L${x + 9} ${y + 11}`} stroke="#DC2626" strokeWidth={1.4} />}
              </g>
            );
          })}
        </g>
      ) : null}
      {jenis === "pohon" ? (
        <g>
          <path d="M32 14 L16 30 M32 14 L48 30 M48 30 L40 46 M48 30 L58 46" fill="none" stroke={UNGU} strokeWidth={1.6} />
          {[
            [32, 9, "12", false],
            [16, 30, "2", true],
            [48, 30, "6", false],
            [38, 48, "2", true],
            [58, 48, "3", true],
          ].map(([x, y, t, p]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x as number} cy={y as number} r={8} fill={p ? "#BBF7D0" : "#FFFFFF"} stroke={UNGU} strokeWidth={1.4} />
              <text x={x as number} y={(y as number) + 3.6} fontSize={10} fontWeight={800} textAnchor="middle" fill={UNGU}>
                {t as string}
              </text>
            </g>
          ))}
        </g>
      ) : null}
      {jenis === "kali" ? (
        <g>
          <text x={32} y={20} fontSize={11} fontWeight={900} textAnchor="middle" fill={UNGU}>
            12
          </text>
          <path d="M26 26 L32 33 L38 26" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          <text x={32} y={48} fontSize={12} fontWeight={900} textAnchor="middle" fill={ORANYE}>
            2×2×3
          </text>
        </g>
      ) : null}
      {jenis === "pasang" ? (
        <g>
          {[
            [10, 2, 6],
            [32, 2, 6],
            [54, 3, 6],
          ].map(([x, t, y]) => (
            <g key={`a${x}`}>
              <circle cx={x} cy={y + 8} r={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.4} />
              <text x={x} y={y + 11.6} fontSize={10} fontWeight={800} textAnchor="middle" fill={UNGU}>
                {t}
              </text>
            </g>
          ))}
          {[
            [10, 2, 40],
            [32, 3, 40],
            [54, 3, 40],
          ].map(([x, t, y]) => (
            <g key={`b${x}`}>
              <circle cx={x} cy={y} r={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.4} />
              <text x={x} y={y + 3.6} fontSize={10} fontWeight={800} textAnchor="middle" fill={UNGU}>
                {t}
              </text>
            </g>
          ))}
          <path d="M10 22 L10 32 M32 22 L54 32" fill="none" stroke={ORANYE} strokeWidth={1.8} />
        </g>
      ) : null}
      {jenis === "bagi" ? (
        <g>
          <path d="M16 6 L16 52" fill="none" stroke={UNGU} strokeWidth={1.6} />
          {[
            ["2", "12 18", 15],
            ["2", "6 9", 29],
            ["3", "3 9", 43],
          ].map(([p, t, y]) => (
            <g key={`${p}-${y}`}>
              <text x={8} y={y as number} fontSize={10} fontWeight={900} textAnchor="middle" fill={ORANYE}>
                {p}
              </text>
              <text x={20} y={y as number} fontSize={10} fontWeight={800} fill={UNGU}>
                {t}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaPapan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_PAPAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_PAPAN[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="relative mx-auto w-full max-w-[360px] rounded-2xl border-4 border-[#6D28D9] bg-[#FAF5FF] px-1.5 pb-2 pt-2" data-uji="pohon-bilangan">
        <p className="relative z-10 mx-auto mb-1 w-fit rounded-full border-2 border-[#6D28D9] bg-[#EDE9FE] px-3 py-0.5 text-center text-sm font-black text-[#4C1D95]">
          <span aria-hidden="true">{"\u{1F333}"} </span>
          {JUDUL_PETA}
        </p>
        <span className="absolute bottom-2 left-1/2 top-9 w-2 -translate-x-1/2 rounded-full bg-[#92400E]" aria-hidden="true" />
        {LANGKAH_PAPAN.map((l, idx) => {
          const n = idx + 1;
          const terbuka = buka.includes(n);
          const kiri = idx % 2 === 0;
          const tombol = (
            <div className={`relative flex min-w-0 items-center ${kiri ? "justify-end pr-3" : "justify-start pl-3"}`}>
              <span className={`absolute top-1/2 h-1 w-3 -translate-y-1/2 rounded bg-[#92400E] ${kiri ? "right-0" : "left-0"}`} aria-hidden="true" />
              <button
                type="button"
                onClick={() => ketuk(n)}
                aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                className={`flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border-2 px-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90 text-xl text-[#B45309]"}`}
              >
                {terbuka ? l.judul : "?"}
              </button>
            </div>
          );
          const gambar = (
            <div className={`flex items-center ${kiri ? "justify-start pl-3" : "justify-end pr-3"}`}>
              <MiniGambar jenis={l.gambar} />
            </div>
          );
          return (
            <div key={l.judul} className="relative grid grid-cols-[1fr_26px_1fr] items-center py-1">
              {kiri ? tombol : gambar}
              <span className="relative z-10 mx-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#6D28D9] bg-white text-xs font-black text-[#4C1D95]" aria-hidden="true">
                {n}
              </span>
              {kiri ? gambar : tombol}
            </div>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_PAPAN.length} langkah.`}
      </p>
      {selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export { PetaPapan };
