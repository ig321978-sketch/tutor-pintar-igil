"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_LONCENG, JUDUL_PETA_LONCENG, LANGKAH_LONCENG, PETUNJUK_PETA_LONCENG, SELESAI_PETA_LONCENG } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni": stan wedang jahe Bu Marni di Pasar Kuliner Malam (atap merah-putih, lampion berderet, lonceng besar di tiang)
 * dengan tali lonceng bersimpul yang menggantung lima lonceng kecil. Tiap lonceng membawa satu label kosong; anak mengetuknya, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir (kisi tetap).
 */
function StanWedang() {
  return (
    <svg viewBox="0 0 300 104" className="block h-auto w-full" role="img" aria-label="Stan wedang jahe Bu Marni dengan lampion dan lonceng besar">
      <rect x={0} y={0} width={300} height={104} fill="#312E81" />
      {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={10} stroke="#FDE68A" strokeWidth={1.2} />
          <ellipse cx={x} cy={19} rx={8} ry={9} fill={i % 2 === 0 ? "#EF4444" : "#F59E0B"} stroke="#FDE68A" strokeWidth={1.2} />
        </g>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={30 + i * 24} y={36} width={24} height={14} fill={i % 2 === 0 ? "#DC2626" : "#FFFFFF"} stroke="#7F1D1D" strokeWidth={0.8} />
      ))}
      <rect x={34} y={50} width={232} height={44} fill="#FEF3C7" stroke="#92400E" strokeWidth={2} />
      <text x={110} y={77} textAnchor="middle" fontSize={13} fontWeight={900} fill="#7C2D12">
        WEDANG JAHE
      </text>
      <rect x={196} y={54} width={6} height={40} fill="#92400E" />
      <text x={232} y={84} textAnchor="middle" fontSize={34}>
        {"\u{1F514}"}
      </text>
      <rect x={0} y={94} width={300} height={10} fill="#78350F" />
    </svg>
  );
}

export default function PetaLonceng({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_LONCENG.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_LONCENG[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_LONCENG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_LONCENG}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#B45309] bg-[#FFFBEB] shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-rupa="stan-wedang">
        <StanWedang />
        <p className="mt-1 text-center text-sm font-black text-[#7C2D12]">
          {IKON_JUDUL_PETA_LONCENG} {JUDUL_PETA_LONCENG}
        </p>
        <div className="relative space-y-1.5 px-2 pb-2 pt-1">
          <span className="absolute bottom-3 left-[30px] top-1 w-[4px] rounded bg-[#B45309]" aria-hidden="true" />
          {LANGKAH_LONCENG.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(n)}
                aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Lonceng kosong langkah ${n}`}
                className="relative flex min-h-[46px] w-full min-w-0 items-center gap-2 text-left"
              >
                <span aria-hidden="true" className={`z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] text-xl ${terbuka ? "border-[#15803D] bg-[#BBF7D0]" : "border-[#B45309] bg-[#FDE68A]"}`}>
                  {"\u{1F514}"}
                </span>
                <span className={`flex min-h-[40px] min-w-0 flex-1 items-center gap-1.5 rounded-lg border-[3px] px-2 py-1 font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white"}`}>
                  <span className="shrink-0 text-sm text-[#B45309]">{n}</span>
                  <span className="min-w-0 break-words text-sm">{terbuka ? `${l.ikon} ${l.judul}` : "?"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_LONCENG : `Sudah dibuka ${buka.length} dari ${LANGKAH_LONCENG.length} langkah.`}
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
export { PetaLonceng };
