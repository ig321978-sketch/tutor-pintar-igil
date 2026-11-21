"use client";

import React, { useState } from "react";
import { TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ejaK4B1 } from "../eja-k4b1";
import { JUDUL_PETA_RESEPSI, LANGKAH_RESEPSI, LEBAR_GAMBAR_RESEPSI, MAKS_HURUF_BARIS_RESEPSI, PETUNJUK_PETA_RESEPSI, SELESAI_PETA_RESEPSI, TINGGI_GAMBAR_RESEPSI, UKURAN_FONT_RESEPSI, WARNA_KOPER, bungkusJudul, koper, panel, pelat } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (dirancang sendiri, bukan kartu geser): TUMPUKAN KOPER tamu di meja resepsi (bel dan koper di papan meja).
 * Enam koper bertumpuk; tiap koper membawa gambar kecil satu langkah di panel kirinya (245 + 378 tersusun, panah dari kanan, 5 + 8 = 13 simpan 1, susun panjang 500 + 110 + 13 lalu 600 + 20 + 3, 378 jadi 400, 245 + 378 = 623)
 * dan satu pelat nama kosong di sisi kanannya. Anak mengetuk pelat: judul langkah muncul dan dibacakan Guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir (gambar 300 x 358).
 */
const F = UKURAN_FONT_RESEPSI;

/** Gambar kecil satu langkah di panel (koordinat relatif panel 140 x 34). */
function GambarLangkah({ k }: { k: number }) {
  const t = { fontWeight: 900 as const, fill: "#1F2937" };
  if (k === 0)
    return (
      <text x={70} y={23} textAnchor="middle" fontSize={15} {...t}>
        245 + 378
      </text>
    );
  if (k === 1)
    return (
      <g>
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <rect x={10 + c * 42} y={2} width={36} height={18} rx={3} fill={c === 2 ? "#BBF7D0" : "#F1F5F9"} stroke={c === 2 ? "#15803D" : "#64748B"} strokeWidth={1.5} />
            <text x={28 + c * 42} y={16} textAnchor="middle" fontSize={13} {...t}>
              {[2, 4, 5][c]}
            </text>
          </g>
        ))}
        <path d="M126,27 L14,27 M22,22 L14,27 L22,32" stroke="#15803D" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={126} cy={27} r={3.5} fill="#15803D" />
      </g>
    );
  if (k === 2)
    return (
      <g>
        <text x={6} y={22} fontSize={14} {...t}>
          5 + 8 = 13
        </text>
        <rect x={92} y={7} width={24} height={24} rx={3} fill="#BBF7D0" stroke="#15803D" strokeWidth={2} />
        <text x={104} y={25} textAnchor="middle" fontSize={15} {...t}>
          3
        </text>
        <circle cx={124} cy={9} r={8} fill="#DC2626" />
        <text x={124} y={13.5} textAnchor="middle" fontSize={12} fontWeight={900} fill="#FFFFFF">
          1
        </text>
      </g>
    );
  if (k === 3)
    return (
      <g>
        <text x={70} y={14} textAnchor="middle" fontSize={12} {...t}>
          500 + 110 + 13
        </text>
        <text x={70} y={29} textAnchor="middle" fontSize={12} {...t} fill="#15803D">
          = 600 + 20 + 3
        </text>
      </g>
    );
  if (k === 4)
    return (
      <text x={70} y={22} textAnchor="middle" fontSize={14} {...t}>
        378 → 400 (+22)
      </text>
    );
  return (
    <g>
      <text x={6} y={21} fontSize={12} {...t}>
        245 + 378 = 623
      </text>
      <circle cx={128} cy={17} r={7} fill="#15803D" />
      <text x={128} y={21.5} textAnchor="middle" fontSize={12} fontWeight={900} fill="#FFFFFF">
        ✓
      </text>
    </g>
  );
}

export default function MejaResepsiK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_RESEPSI.length;
  const ketuk = (i: number) => {
    speakGuru(ejaK4B1(LANGKAH_RESEPSI[i].arti));
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-koper">
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_RESEPSI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_RESEPSI}</p>
      </div>

      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border-[5px] border-[#14532D] bg-[#DCFCE7] shadow-[0_5px_0_rgba(0,0,0,0.25)]">
        <svg viewBox={`0 0 ${LEBAR_GAMBAR_RESEPSI} ${TINGGI_GAMBAR_RESEPSI}`} className="block w-full" role="group" aria-label={JUDUL_PETA_RESEPSI}>
          <rect x={0} y={0} width={LEBAR_GAMBAR_RESEPSI} height={36} fill="#14532D" />
          <text x={150} y={23} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FDE68A">
            MEJA RESEPSI
          </text>
          <text x={30} y={26} textAnchor="middle" fontSize={18}>
            {"\u{1F6CE}"}
          </text>
          <text x={270} y={26} textAnchor="middle" fontSize={18}>
            {"\u{1F9F3}"}
          </text>
          {LANGKAH_RESEPSI.map((l, k) => {
            const kp = koper(k);
            const pn = panel(k);
            const pl = pelat(k);
            const terbuka = buka.includes(k);
            const baris = bungkusJudul(l.judul, MAKS_HURUF_BARIS_RESEPSI);
            const warna = terbuka ? "#15803D" : "#B45309";
            return (
              <g key={k} data-koper={k}>
                <rect x={kp.x + 112} y={kp.y - 5} width={56} height={6} rx={3} fill="#1F2937" />
                <rect x={kp.x} y={kp.y} width={kp.w} height={kp.h} rx={9} fill={WARNA_KOPER[k]} stroke="#111827" strokeWidth={2} />
                <rect x={kp.x + 4} y={kp.y + 4} width={4} height={kp.h - 8} rx={2} fill="rgba(255,255,255,0.35)" />
                <rect x={kp.x + kp.w - 8} y={kp.y + 4} width={4} height={kp.h - 8} rx={2} fill="rgba(255,255,255,0.35)" />
                <rect x={pn.x} y={pn.y} width={pn.w} height={pn.h} rx={5} fill="#FFFFFF" opacity={0.95} />
                <g transform={`translate(${pn.x} ${pn.y})`} role="img" aria-label={`Gambar langkah ${k + 1}`}>
                  <GambarLangkah k={k} />
                </g>
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={terbuka ? `Langkah ${k + 1}: ${l.judul}` : `Label kosong langkah ${k + 1}`}
                  onClick={() => ketuk(k)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      ketuk(k);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  data-label={k}
                >
                  <rect x={pl.x} y={pl.y} width={pl.w} height={pl.h} rx={6} fill={terbuka ? "#BBF7D0" : "#FFFBEB"} stroke={warna} strokeWidth={2.5} strokeDasharray={terbuka ? undefined : "5 3"} />
                  <circle cx={pl.x + 13} cy={pl.y + pl.h / 2} r={9} fill={warna} />
                  <text x={pl.x + 13} y={pl.y + pl.h / 2 + 4.5} textAnchor="middle" fontSize={F} fontWeight={900} fill="#FFFFFF">
                    {k + 1}
                  </text>
                  {terbuka ? (
                    baris.map((b, j) => (
                      <text key={j} x={pl.x + 26 + (pl.w - 29) / 2} y={pl.y + (baris.length === 1 ? pl.h / 2 + 4.5 : 14 + j * 14)} textAnchor="middle" fontSize={F} fontWeight={900} fill="#1C01A5">
                        {b}
                      </text>
                    ))
                  ) : (
                    <text x={pl.x + 26 + (pl.w - 29) / 2} y={pl.y + pl.h / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={900} fill="#B45309">
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
        {selesai ? SELESAI_PETA_RESEPSI : `Sudah dibuka ${buka.length} dari ${LANGKAH_RESEPSI.length} langkah.`}
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
export { MejaResepsiK4B1 };
