"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { JUDUL_PETA, LANGKAH_HITUNG, PETUNJUK_PETA, SELESAI_PETA, type GambarMini } from "./data-peta";

/**
 * Mind-map Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (label kosong): papan jepit Pak Darmo dengan lima baris catatan, tiap baris bergambar kecil sendiri
 * (simpanan, pinjaman, pisah pengali, bagi, panah balik) dan berlabel kosong "?". Ketuk label: judul langkah muncul, baris menyala hijau, dan Guru membacakan langkahnya.
 * Komponen sendiri (bukan PetaLabel): gambar dan tata letak mengikuti isi materi hitung bersusun, muat satu layar 344 piksel.
 */
const BIRU = "#1E3A8A";
const ORANYE = "#EA580C";

/** Gambar kecil tiap langkah (SVG polos, dekoratif). */
function MiniGambar({ jenis }: { jenis: GambarMini }) {
  const sel = (x: number, y: number, w = 14, h = 12) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={2} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.4} />;
  return (
    <svg viewBox="0 0 64 46" width={64} height={46} aria-hidden="true" className="shrink-0">
      {jenis === "pisah" ? (
        <g>
          <text x={32} y={14} fontSize={13} fontWeight={900} textAnchor="middle" fill={BIRU}>
            12
          </text>
          <path d="M26 17 L14 28" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          <path d="M38 17 L50 28" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          {sel(4, 30, 20, 14)}
          {sel(40, 30, 20, 14)}
          <text x={14} y={41} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            10
          </text>
          <text x={50} y={41} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            2
          </text>
        </g>
      ) : null}
      {jenis === "simpan" ? (
        <g>
          {sel(6, 22, 16, 16)}
          {sel(24, 22, 16, 16)}
          {sel(42, 22, 16, 16)}
          <text x={14} y={34} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            7
          </text>
          <text x={32} y={34} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            4
          </text>
          <text x={50} y={34} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            9
          </text>
          <path d="M48 20 Q40 6 32 15" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          <path d="M33 10 L31 16 L37 15" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          <text x={26} y={12} fontSize={11} fontWeight={900} textAnchor="middle" fill={ORANYE}>
            1
          </text>
        </g>
      ) : null}
      {jenis === "pinjam" ? (
        <g>
          {sel(6, 24, 16, 16)}
          {sel(34, 24, 24, 16)}
          <text x={14} y={36} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            8
          </text>
          <text x={46} y={36} fontSize={11} fontWeight={900} textAnchor="middle" fill={ORANYE}>
            10
          </text>
          <path d="M16 22 Q30 4 44 22" fill="none" stroke={ORANYE} strokeWidth={1.8} />
          <path d="M39 15 L44.5 22 L47 14" fill="none" stroke={ORANYE} strokeWidth={1.8} />
        </g>
      ) : null}
      {jenis === "bagi" ? (
        <g>
          <path d="M26 12 L26 40 M26 12 L58 12" fill="none" stroke={BIRU} strokeWidth={2} />
          <text x={12} y={30} fontSize={13} fontWeight={900} textAnchor="middle" fill={BIRU}>
            4
          </text>
          <text x={42} y={10} fontSize={11} fontWeight={800} textAnchor="middle" fill={ORANYE}>
            16
          </text>
          <text x={42} y={30} fontSize={11} fontWeight={800} textAnchor="middle" fill={BIRU}>
            64
          </text>
          <path d="M34 34 Q42 42 50 34" fill="none" stroke={ORANYE} strokeWidth={1.6} />
        </g>
      ) : null}
      {jenis === "balik" ? (
        <g>
          <path d="M12 23 A20 12 0 0 1 52 23" fill="none" stroke={BIRU} strokeWidth={2.2} />
          <path d="M47 14 L52.5 23 L43 24" fill="none" stroke={BIRU} strokeWidth={2.2} />
          <path d="M52 27 A20 12 0 0 1 12 27" fill="none" stroke={ORANYE} strokeWidth={2.2} />
          <path d="M17 36 L11.5 27 L21 26" fill="none" stroke={ORANYE} strokeWidth={2.2} />
          <text x={32} y={27} fontSize={12} fontWeight={900} textAnchor="middle" fill={BIRU}>
            {"+ −"}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaHitung({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_HITUNG.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_HITUNG[n - 1].arti);
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

      <div className="mx-auto w-full max-w-xl" data-uji="papan-jepit">
        <div className="mx-auto -mb-2 h-5 w-24 rounded-t-lg border-[3px] border-[#475569] bg-[#CBD5E1]" aria-hidden="true" />
        <div className="rounded-2xl border-[5px] border-[#92400E] bg-[#B7814A] p-1.5 shadow-[0_6px_0_rgba(107,68,35,0.35)]">
          <div className="rounded-lg bg-[#FFFBEB] p-1.5" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(37,99,235,0.14) 0 1px,transparent 1px 18px)" }}>
            <p className="mb-1.5 rounded-md bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEF3C7]">
              {"\u{1F4CB}"} {JUDUL_PETA}
            </p>
            <div className="space-y-1.5">
              {LANGKAH_HITUNG.map((l, idx) => {
                const n = idx + 1;
                const terbuka = buka.includes(n);
                return (
                  <div key={l.judul} className="flex min-w-0 items-center gap-1.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-white text-xs font-black text-[#7F1D1D]" aria-hidden="true">
                      {n}
                    </span>
                    <MiniGambar jenis={l.gambar} />
                    <button
                      type="button"
                      onClick={() => ketuk(n)}
                      aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                      className={`flex min-h-[48px] min-w-0 flex-1 items-center justify-center rounded-lg border-2 px-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90 text-xl text-[#B45309]"}`}
                    >
                      {terbuka ? l.judul : "?"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_HITUNG.length} langkah.`}
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

export { PetaHitung };
