"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BarisGlyph } from "./GlyphAngklung";
import { CARA_PAPAN, JUDUL_PAPAN_CARA, JUDUL_RAK_ATAS, JUDUL_RAK_BAWAH, LANGKAH_ANGKLUNG, LETAK_LABEL, PETUNJUK_PETA_ANGKLUNG, RAK_ATAS, RAK_BAWAH, SELESAI_PETA_ANGKLUNG, teksSelisih, type BarisRak } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (dirancang sendiri): dua rak angklung bertingkat seperti di Story.
 * Rak atas = deret tumbuh (dua, empat, enam, delapan, lalu sepuluh yang masih putus-putus), rak bawah = deret penabuh (tujuh, lima, tiga, satu, lalu habis),
 * papan kecil = tiga cara pintar. Enam label kosong menempel pada bagian rak yang cocok; diketuk, judul langkah muncul dan dibacakan Guru.
 * Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const TINGGI_BARIS = [24, 24, 24, 24, 36];

function Rak({ judul, baris, zona, buka, ketuk }: { judul: string; baris: readonly BarisRak[]; zona: 0 | 1; buka: number[]; ketuk: (i: number) => void }) {
  const label = LETAK_LABEL.map((l, i) => ({ ...l, i })).filter((l) => l.zona === zona);
  return (
    <div className="rounded-xl border-4 border-[#B45309] bg-[#FEF3C7] p-1.5" data-uji={zona === 0 ? "rak-atas" : "rak-bawah"}>
      <p className="sr-only">{judul}</p>
      <div className="grid gap-x-1.5 gap-y-1" style={{ gridTemplateColumns: "110px 42px 1fr", gridTemplateRows: TINGGI_BARIS.map((t) => `${t}px`).join(" ") }}>
        {baris.map((b, r) => (
          <React.Fragment key={r}>
            <div className="flex items-center rounded-sm border-b-4 border-[#B7814A]" style={{ gridColumn: 1, gridRow: r + 1 }}>
              {b.n > 0 ? <BarisGlyph n={b.n} hantu={b.hantu} label={`${b.hantu ? "Deret yang belum ada, " : ""}${b.n} angklung`} /> : <span className="text-[11px] font-black text-[#92400E]">habis</span>}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs font-black leading-none" style={{ gridColumn: 2, gridRow: r + 1 }}>
              <span className="text-[#451A03]">{b.n}</span>
              {b.d !== undefined ? <span className={b.d > 0 ? "text-[#15803D]" : "text-[#B91C1C]"}>{teksSelisih(b.d)}</span> : null}
            </div>
          </React.Fragment>
        ))}
        {label.map((l) => {
          const terbuka = buka.includes(l.i);
          return (
            <button
              key={l.i}
              type="button"
              onClick={() => ketuk(l.i)}
              aria-label={terbuka ? `Langkah ${l.i + 1}: ${LANGKAH_ANGKLUNG[l.i].judul}` : `Label kosong langkah ${l.i + 1}`}
              data-label={l.i}
              className={`flex min-w-0 items-center gap-1 rounded-lg border-[3px] px-1 py-0.5 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90"}`}
              style={{ gridColumn: 3, gridRow: `${l.dari} / span ${l.banyak}` }}
            >
              <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white ${terbuka ? "bg-[#15803D]" : "bg-[#B45309]"}`}>
                {l.i + 1}
              </span>
              <span className="min-w-0 break-words text-[13px]">{terbuka ? LANGKAH_ANGKLUNG[l.i].judul : "?"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IkonCara({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 40 26" className="h-[26px] w-[40px]" role="img" aria-label={`Gambar cara ${CARA_PAPAN[i]}`}>
      {i === 0 ? (
        <g>
          <rect x={2} y={4} width={7} height={18} fill="#FDE68A" stroke="#78350F" strokeWidth={1.5} />
          <rect x={13} y={4} width={7} height={18} fill="#FDE68A" stroke="#78350F" strokeWidth={1.5} />
          <rect x={24} y={4} width={7} height={18} fill="none" stroke="#78350F" strokeWidth={1.5} strokeDasharray="3 2" />
        </g>
      ) : null}
      {i === 1 ? (
        <g fill="none" stroke="#78350F" strokeWidth={1.5}>
          <rect x={3} y={3} width={34} height={20} fill="#FFFFFF" />
          <line x1={3} y1={13} x2={37} y2={13} />
          <line x1={14} y1={3} x2={14} y2={23} />
          <line x1={26} y1={3} x2={26} y2={23} />
        </g>
      ) : null}
      {i === 2 ? (
        <g fill="#F59E0B" stroke="#78350F" strokeWidth={1}>
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={`a${k}`} cx={5 + k * 7.5} cy={8} r={3} />
          ))}
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={`b${k}`} cx={5 + k * 7.5} cy={19} r={3} />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

export default function DeretAngklungK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_ANGKLUNG.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_ANGKLUNG[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  const enam = LETAK_LABEL.map((l, i) => ({ ...l, i })).filter((l) => l.zona === 2)[0];
  const terbuka6 = buka.includes(enam.i);
  return (
    <div className="space-y-1.5" data-uji="peta-rak">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_ANGKLUNG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-0.5 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_ANGKLUNG}</p>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-1.5">
        <Rak judul={JUDUL_RAK_ATAS} baris={RAK_ATAS} zona={0} buka={buka} ketuk={ketuk} />
        <Rak judul={JUDUL_RAK_BAWAH} baris={RAK_BAWAH} zona={1} buka={buka} ketuk={ketuk} />
        <div className="rounded-xl border-4 border-[#B45309] bg-[#ECFCCB] p-1.5" data-uji="papan-cara">
          <p className="sr-only">{JUDUL_PAPAN_CARA}</p>
          <div className="grid items-center gap-1.5" style={{ gridTemplateColumns: "repeat(3, 46px) 1fr" }}>
            {CARA_PAPAN.map((c, i) => (
              <div key={c} className="flex flex-col items-center rounded-md bg-white/80 py-0.5">
                <IkonCara i={i} />
                <span className="text-[10px] font-black leading-none text-[#365314]">{c}</span>
              </div>
            ))}
            <button
              type="button"
              onClick={() => ketuk(enam.i)}
              data-label={enam.i}
              aria-label={terbuka6 ? `Langkah ${enam.i + 1}: ${LANGKAH_ANGKLUNG[enam.i].judul}` : `Label kosong langkah ${enam.i + 1}`}
              className={`flex min-h-[44px] min-w-0 items-center gap-1 rounded-lg border-[3px] px-1 py-0.5 text-left font-black leading-tight text-[#1C01A5] ${terbuka6 ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90"}`}
            >
              <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white ${terbuka6 ? "bg-[#15803D]" : "bg-[#B45309]"}`}>
                {enam.i + 1}
              </span>
              <span className="min-w-0 break-words text-[13px]">{terbuka6 ? LANGKAH_ANGKLUNG[enam.i].judul : "?"}</span>
            </button>
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.1rem] text-center text-sm font-black leading-tight text-[#1C01A5]">
        {selesai ? SELESAI_PETA_ANGKLUNG : `Sudah dibuka ${buka.length} dari ${LANGKAH_ANGKLUNG.length} langkah.`}
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
export { DeretAngklungK4B3 };
