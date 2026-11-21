"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_TIMBANG, JUDUL_PETA_TIMBANG, LANGKAH_TIMBANG, PETUNJUK_PETA_TIMBANG, SELESAI_PETA_TIMBANG } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna": meja timbangan di Toko Roti Keliling (kanopi merah muda, timbangan dua piring dengan kantong tepung, papan nama)
 * dengan enam kantong tepung kosong berderet tiga kali dua di bawahnya. Tiap kantong membawa satu label kosong; anak mengetuknya, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir (kisi tetap tiga kolom).
 */
function Kantong({ x, y, s = 1, id }: { x: number; y: number; s?: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} data-kantong={id}>
      <path d="M-9 -14 L9 -14 L12 -4 L12 12 Q12 16 8 16 L-8 16 Q-12 16 -12 12 L-12 -4 Z" fill="#FEF3C7" stroke="#92400E" strokeWidth={1.5} />
      <path d="M-6 -14 L-8 -19 L8 -19 L6 -14" fill="#FDE68A" stroke="#92400E" strokeWidth={1.2} />
      <line x1={-7} y1={-14} x2={7} y2={-14} stroke="#B91C1C" strokeWidth={1.8} />
      <circle cx={0} cy={3} r={4.2} fill="#FFFFFF" stroke="#B45309" strokeWidth={1} />
    </g>
  );
}

function MejaTimbangan() {
  return (
    <svg viewBox="0 0 300 118" className="block h-auto w-full" role="img" aria-label="Meja timbangan Bu Ratna di Toko Roti Keliling dengan tiga kantong tepung">
      <rect x={0} y={0} width={300} height={118} fill="#FFF1F2" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={i * 30} y={0} width={30} height={12} fill={i % 2 === 0 ? "#F472B6" : "#FFFFFF"} stroke="#BE185D" strokeWidth={0.6} />
      ))}
      <rect x={10} y={18} width={86} height={20} rx={3} fill="#FDE68A" stroke="#92400E" strokeWidth={1.4} />
      <text x={53} y={32} textAnchor="middle" fontSize={12.5} fontWeight={900} fill="#7C2D12">
        BU RATNA
      </text>
      {/* tiang dan alas timbangan */}
      <rect x={146} y={46} width={8} height={56} fill="#92400E" />
      <rect x={118} y={100} width={64} height={7} rx={2} fill="#78350F" />
      {/* lengan timbangan sedikit miring: sisi kiri lebih berat */}
      <g transform="rotate(-5 150 46)">
        <rect x={72} y={43} width={156} height={6} rx={3} fill="#B45309" stroke="#78350F" strokeWidth={1} />
      </g>
      <circle cx={150} cy={46} r={5} fill="#FACC15" stroke="#92400E" strokeWidth={1.4} />
      {/* piring kiri dengan dua kantong */}
      <line x1={74} y1={58} x2={60} y2={80} stroke="#78350F" strokeWidth={1.2} />
      <line x1={74} y1={58} x2={96} y2={80} stroke="#78350F" strokeWidth={1.2} />
      <path d="M52 80 L104 80 Q100 90 78 90 Q56 90 52 80 Z" fill="#F59E0B" stroke="#92400E" strokeWidth={1.4} />
      <Kantong x={66} y={67} s={0.8} id="k1" />
      <Kantong x={90} y={67} s={0.8} id="k3" />
      {/* piring kanan dengan satu kantong */}
      <line x1={226} y1={64} x2={212} y2={86} stroke="#78350F" strokeWidth={1.2} />
      <line x1={226} y1={64} x2={248} y2={86} stroke="#78350F" strokeWidth={1.2} />
      <path d="M204 86 L256 86 Q252 96 230 96 Q208 96 204 86 Z" fill="#F59E0B" stroke="#92400E" strokeWidth={1.4} />
      <Kantong x={230} y={73} s={0.8} id="k2" />
      <rect x={0} y={107} width={300} height={11} fill="#BE185D" />
    </svg>
  );
}

export default function PetaTimbang({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_TIMBANG.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_TIMBANG[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_TIMBANG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_TIMBANG}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#BE185D] bg-[#FFF1F2] shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-rupa="meja-timbangan">
        <MejaTimbangan />
        <p className="mt-1 text-center text-sm font-black text-[#831843]">
          {IKON_JUDUL_PETA_TIMBANG} {JUDUL_PETA_TIMBANG}
        </p>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3 px-2 pb-3 pt-3" role="group" aria-label="Kantong langkah">
          {LANGKAH_TIMBANG.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(n)}
                aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Kantong kosong langkah ${n}`}
                className={`relative flex min-h-[88px] min-w-0 flex-col items-center justify-center rounded-b-2xl rounded-t-[26px] border-[3px] px-1 pb-1 pt-3 text-center leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#DCFCE7]" : "border-dashed border-[#B45309] bg-[#FEF3C7]"}`}
              >
                <span aria-hidden="true" className={`absolute -top-2 left-1/2 h-3 w-9 -translate-x-1/2 rounded-sm border-2 ${terbuka ? "border-[#166534] bg-[#4ADE80]" : "border-[#B91C1C] bg-[#FCA5A5]"}`} />
                <span className={`text-sm font-black ${terbuka ? "text-[#166534]" : "text-[#B45309]"}`}>{n}</span>
                {terbuka ? (
                  <>
                    <span className="text-lg leading-none" aria-hidden="true">
                      {l.ikon}
                    </span>
                    <span className="min-w-0 break-words text-[11px] font-black text-[#14532D]">{l.judul}</span>
                  </>
                ) : (
                  <span className="text-2xl font-black text-[#B45309]">?</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_TIMBANG : `Sudah dibuka ${buka.length} dari ${LANGKAH_TIMBANG.length} langkah.`}
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
export { PetaTimbang };
