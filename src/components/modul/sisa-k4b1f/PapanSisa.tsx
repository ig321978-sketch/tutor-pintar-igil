"use client";

import React, { useState } from "react";
import { TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ejaK4B1 } from "../eja-k4b1";
import { JUDUL_PETA_SISA, LANGKAH_SISA, LEBAR_GAMBAR_SISA, MAKS_HURUF_BARIS_SISA, PETUNJUK_PETA_SISA, SELESAI_PETA_SISA, TINGGI_GAMBAR_SISA, UKURAN_FONT_SISA, Y_TALI_SISA, bungkusJudul, kartuSisa, labelSisa } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (dirancang sendiri, bukan kartu geser): TALI JEMUR di dermaga (Genta menjemur sandal tamu di tali dekat dermaga, Story).
 * Dua tali, tiga kartu gambar menggantung di tiap tali dengan jepit baju: 612 dan 275 bersusun, panah dari satuan, 2 jadi 12, hasil keliru 463, hitung maju 275 ke 300 ke 612, 337 + 275 = 612.
 * Label kosong menempel di bawah tiap kartu; diketuk, judul langkah muncul dan dibacakan Guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir (gambar 300 x 274).
 */
const F = UKURAN_FONT_SISA;

/** Gambar kecil satu langkah di kartu (koordinat relatif kartu 92 x 56; sudut kiri atas dipakai nomor). */
function GambarKartu({ i }: { i: number }) {
  const t = { fontWeight: 900 as const, fill: "#1F2937" };
  if (i === 0)
    return (
      <g>
        <text x={54} y={25} textAnchor="middle" fontSize={15} {...t}>
          612
        </text>
        <text x={54} y={44} textAnchor="middle" fontSize={15} {...t}>
          − 275
        </text>
        <line x1={22} y1={29} x2={86} y2={29} stroke="#1F2937" strokeWidth={1.5} />
      </g>
    );
  if (i === 1)
    return (
      <g>
        {[6, 1, 2].map((d, c) => (
          <g key={c}>
            <rect x={10 + c * 26} y={14} width={22} height={20} rx={3} fill={c === 2 ? "#BBF7D0" : "#F1F5F9"} stroke={c === 2 ? "#15803D" : "#64748B"} strokeWidth={1.5} />
            <text x={21 + c * 26} y={29} textAnchor="middle" fontSize={13} {...t}>
              {d}
            </text>
          </g>
        ))}
        <path d="M84,46 L10,46 M18,41 L10,46 L18,51" stroke="#15803D" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={84} cy={46} r={3.5} fill="#15803D" />
      </g>
    );
  if (i === 2)
    return (
      <g>
        <text x={50} y={28} textAnchor="middle" fontSize={16} {...t}>
          2 → 12
        </text>
        <text x={50} y={49} textAnchor="middle" fontSize={13} {...t}>
          12 − 5 = 7
        </text>
      </g>
    );
  if (i === 3)
    return (
      <g>
        <text x={50} y={34} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
          463
        </text>
        <path d="M18,16 L82,40 M82,16 L18,40" stroke="#DC2626" strokeWidth={3} strokeLinecap="round" />
        <text x={50} y={52} textAnchor="middle" fontSize={12} fontWeight={900} fill="#B91C1C">
          keliru
        </text>
      </g>
    );
  if (i === 4)
    return (
      <g>
        <path d="M14,32 L78,32" stroke="#1F2937" strokeWidth={2} />
        <path d="M14,32 Q30,10 46,32 M46,32 Q62,10 78,32" stroke="#0F766E" strokeWidth={2.5} fill="none" />
        {[14, 46, 78].map((x, k) => (
          <g key={x}>
            <circle cx={x} cy={32} r={4} fill="#0F766E" />
            <text x={x} y={51} textAnchor="middle" fontSize={12} {...t}>
              {[275, 300, 612][k]}
            </text>
          </g>
        ))}
      </g>
    );
  return (
    <g>
      <text x={50} y={26} textAnchor="middle" fontSize={13} {...t}>
        337 + 275
      </text>
      <text x={48} y={47} textAnchor="middle" fontSize={15} fontWeight={900} fill="#15803D">
        = 612 ✓
      </text>
    </g>
  );
}

export default function PapanSisaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_SISA.length;
  const ketuk = (i: number) => {
    speakGuru(ejaK4B1(LANGKAH_SISA[i].arti));
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-tali-jemur">
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_SISA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_SISA}</p>
      </div>

      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border-[5px] border-[#0F766E] bg-[#CCFBF1] shadow-[0_5px_0_rgba(0,0,0,0.25)]">
        <svg viewBox={`0 0 ${LEBAR_GAMBAR_SISA} ${TINGGI_GAMBAR_SISA}`} className="block w-full" role="group" aria-label={JUDUL_PETA_SISA}>
          <rect x={0} y={0} width={LEBAR_GAMBAR_SISA} height={30} fill="#0F766E" />
          <text x={150} y={20} textAnchor="middle" fontSize={13} fontWeight={900} fill="#CCFBF1">
            TALI JEMUR DERMAGA
          </text>
          <text x={22} y={23} textAnchor="middle" fontSize={16}>
            {"\u{2693}"}
          </text>
          <text x={278} y={23} textAnchor="middle" fontSize={16}>
            {"\u{26F5}"}
          </text>
          {Y_TALI_SISA.map((y) => (
            <g key={y}>
              <rect x={0} y={y - 10} width={6} height={20} fill="#92400E" />
              <rect x={294} y={y - 10} width={6} height={20} fill="#92400E" />
              <path d={`M6,${y} Q150,${y + 7} 294,${y}`} stroke="#78350F" strokeWidth={3} fill="none" />
            </g>
          ))}
          {LANGKAH_SISA.map((l, i) => {
            const kt = kartuSisa(i);
            const lb = labelSisa(i);
            const terbuka = buka.includes(i);
            const baris = bungkusJudul(l.judul, MAKS_HURUF_BARIS_SISA);
            const warna = terbuka ? "#15803D" : "#B45309";
            return (
              <g key={i} data-gambar={i}>
                <rect x={kt.x + 14} y={kt.y - 6} width={8} height={12} rx={2} fill="#F59E0B" stroke="#92400E" strokeWidth={1} />
                <rect x={kt.x + kt.w - 22} y={kt.y - 6} width={8} height={12} rx={2} fill="#F59E0B" stroke="#92400E" strokeWidth={1} />
                <rect x={kt.x} y={kt.y} width={kt.w} height={kt.h} rx={6} fill="#FFFBEB" stroke="#92400E" strokeWidth={2} />
                <g transform={`translate(${kt.x} ${kt.y})`} role="img" aria-label={`Gambar langkah ${i + 1}`}>
                  <GambarKartu i={i} />
                </g>
                <circle cx={kt.x + 9} cy={kt.y + 11} r={8} fill="#0F766E" />
                <text x={kt.x + 9} y={kt.y + 15.5} textAnchor="middle" fontSize={F} fontWeight={900} fill="#FFFFFF">
                  {i + 1}
                </text>
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                  onClick={() => ketuk(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      ketuk(i);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  data-label={i}
                >
                  <rect x={lb.x} y={lb.y} width={lb.w} height={lb.h} rx={7} fill={terbuka ? "#BBF7D0" : "#FFFBEB"} stroke={warna} strokeWidth={2.5} strokeDasharray={terbuka ? undefined : "5 3"} />
                  {terbuka ? (
                    baris.map((b, j) => (
                      <text key={j} x={lb.x + lb.w / 2} y={lb.y + (baris.length === 1 ? lb.h / 2 + 4.5 : 15 + j * 14)} textAnchor="middle" fontSize={F} fontWeight={900} fill="#1C01A5">
                        {b}
                      </text>
                    ))
                  ) : (
                    <text x={lb.x + lb.w / 2} y={lb.y + lb.h / 2 + 6.5} textAnchor="middle" fontSize={20} fontWeight={900} fill="#B45309">
                      ?
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_SISA : `Sudah dibuka ${buka.length} dari ${LANGKAH_SISA.length} langkah.`}
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
export { PapanSisaK4B1 };
