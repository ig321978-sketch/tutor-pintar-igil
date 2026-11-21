"use client";

import React, { useState } from "react";
import { TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ejaK4B1 } from "../eja-k4b1";
import { JUDUL_PETA_KELAPA, LANGKAH_KELAPA, LEBAR_GAMBAR_KELAPA, MAKS_HURUF_BARIS_KELAPA, PETUNJUK_PETA_KELAPA, PIN_KELAPA, SELESAI_PETA_KELAPA, TEMPAT_KELAPA, TINGGI_GAMBAR_KELAPA, UKURAN_FONT_LABEL_KELAPA, bungkusJudul, type PinGambar } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (dirancang sendiri, bukan kartu geser): satu gambar KIOS KELAPA seperti di Story
 * (atap rumbia, papan panen 5.270, pohon kelapa, empat keranjang berisi 5, 2, 7, 0 di atas meja, bagan bagian utuh 5.270 = 4.000 + 1.270).
 * Enam label kosong menempel pada bagian gambar lewat tanda panah (papan, keranjang puluhan, keranjang satuan yang kosong, uraian bilangan, bagan, pemeriksaan).
 * Anak mengetuk label: judul langkah muncul dan dibacakan Guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir (gambar 300 x 452).
 */
const F = UKURAN_FONT_LABEL_KELAPA;
const CX = [44, 116, 188, 260];

function Pin({ i, p, buka, ketuk }: { i: number; p: PinGambar; buka: boolean; ketuk: (i: number) => void }) {
  const judul = LANGKAH_KELAPA[i].judul;
  const baris = bungkusJudul(judul, MAKS_HURUF_BARIS_KELAPA);
  const [tx, ty] = p.tip;
  const ekor = p.arah === "atas" ? `${Math.min(Math.max(tx, p.x + 18) - 10, p.x + p.w - 30)},${p.y} ${Math.min(Math.max(tx, p.x + 18) + 10, p.x + p.w - 10)},${p.y} ${tx},${ty}` : `${p.x + p.w},${p.y + 9} ${p.x + p.w},${p.y + 25} ${tx},${ty}`;
  const warna = buka ? "#15803D" : "#B45309";
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={buka ? `Langkah ${i + 1}: ${judul}` : `Label kosong langkah ${i + 1}`}
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
      <polygon points={ekor} fill={buka ? "#BBF7D0" : "#FFFBEB"} stroke={warna} strokeWidth={2} />
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={8} fill={buka ? "#BBF7D0" : "#FFFBEB"} stroke={warna} strokeWidth={2.5} strokeDasharray={buka ? undefined : "5 3"} />
      <circle cx={p.x + 14} cy={p.y + p.h / 2} r={9} fill={warna} />
      <text x={p.x + 14} y={p.y + p.h / 2 + 4.5} textAnchor="middle" fontSize={F} fontWeight={900} fill="#FFFFFF">
        {i + 1}
      </text>
      {buka ? (
        baris.map((b, k) => (
          <text key={k} x={p.x + 27 + (p.w - 31) / 2} y={p.y + (baris.length === 1 ? p.h / 2 + 4.5 : 14 + k * 14)} textAnchor="middle" fontSize={F} fontWeight={900} fill="#1C01A5">
            {b}
          </text>
        ))
      ) : (
        <text x={p.x + 27 + (p.w - 31) / 2} y={p.y + p.h / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={900} fill="#B45309">
          ?
        </text>
      )}
    </g>
  );
}

export default function KiosKelapaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_KELAPA.length;
  const ketuk = (i: number) => {
    speakGuru(ejaK4B1(LANGKAH_KELAPA[i].arti));
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-kios">
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_KELAPA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_KELAPA}</p>
      </div>

      <div className="mx-auto w-full max-w-[288px] overflow-hidden rounded-2xl border-[5px] border-[#C2410C] bg-[#FFEDD5] shadow-[0_5px_0_rgba(0,0,0,0.25)]">
        <svg viewBox={`0 0 ${LEBAR_GAMBAR_KELAPA} ${TINGGI_GAMBAR_KELAPA}`} className="block w-full" role="group" aria-label={JUDUL_PETA_KELAPA}>
          {/* pohon kelapa di belakang */}
          <path d="M262,204 Q274,140 256,62" stroke="#92400E" strokeWidth={8} fill="none" strokeLinecap="round" />
          {[-155, -105, -55, -5, 45].map((a) => (
            <ellipse key={a} cx={256} cy={56} rx={24} ry={7} fill="#16A34A" stroke="#14532D" strokeWidth={1.5} transform={`rotate(${a} 256 56) translate(18 0)`} />
          ))}
          {[[250, 68], [262, 70], [256, 77]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill="#78350F" />
          ))}
          {/* kios: tiang, atap rumbia, papan nama */}
          <rect x={30} y={40} width={6} height={160} fill="#92400E" />
          <rect x={200} y={40} width={6} height={160} fill="#92400E" />
          <polygon points="22,40 118,8 214,40" fill="#CA8A04" stroke="#78350F" strokeWidth={3} />
          <path d="M60,32 L118,14 M90,36 L130,22 M44,36 L70,28" stroke="#A16207" strokeWidth={2} />
          <rect x={62} y={40} width={112} height={18} rx={3} fill="#FDE68A" stroke="#92400E" strokeWidth={2} />
          <text x={118} y={53} textAnchor="middle" fontSize={12} fontWeight={900} fill="#7C2D12">
            KIOS KELAPA
          </text>
          {/* papan panen */}
          <line x1={84} y1={58} x2={84} y2={68} stroke="#78350F" strokeWidth={2} />
          <line x1={152} y1={58} x2={152} y2={68} stroke="#78350F" strokeWidth={2} />
          <rect x={54} y={68} width={128} height={40} rx={4} fill="#FEF3C7" stroke="#92400E" strokeWidth={3} />
          <text x={118} y={81} textAnchor="middle" fontSize={12} fontWeight={700} fill="#78350F">
            panen
          </text>
          <text x={118} y={102} textAnchor="middle" fontSize={20} fontWeight={900} fill="#7C2D12">
            5.270
          </text>
          {/* meja dan empat keranjang */}
          {TEMPAT_KELAPA.map((t, i) => (
            <g key={t.nama} role="img" aria-label={`Keranjang ${t.nama}: angka ${t.angka}`} data-angka={t.angka}>
              <path d={`M${CX[i] - 26},164 L${CX[i] + 26},164 L${CX[i] + 20},196 L${CX[i] - 20},196 Z`} fill={t.angka > 0 ? "#D97706" : "#FEF3C7"} stroke="#78350F" strokeWidth={2.5} strokeDasharray={t.angka > 0 ? undefined : "4 3"} />
              <rect x={CX[i] - 28} y={160} width={56} height={6} rx={2} fill="#92400E" />
              <circle cx={CX[i]} cy={181} r={10} fill="#FFF7ED" stroke="#78350F" strokeWidth={1.5} />
              <text x={CX[i]} y={186} textAnchor="middle" fontSize={14} fontWeight={900} fill="#7C2D12">
                {t.angka}
              </text>
              <text x={CX[i]} y={222} textAnchor="middle" fontSize={12} fontWeight={900} fill="#7C2D12">
                {t.nama}
              </text>
              {i < 3 ? (
                <text x={CX[i] + 36} y={186} textAnchor="middle" fontSize={16} fontWeight={900} fill="#7C2D12">
                  +
                </text>
              ) : null}
            </g>
          ))}
          <rect x={8} y={196} width={284} height={8} rx={2} fill="#A16207" />
          {/* hasil gabungan */}
          <rect x={8} y={280} width={150} height={36} rx={6} fill="#FEF3C7" stroke="#92400E" strokeWidth={2} />
          <text x={83} y={295} textAnchor="middle" fontSize={13} fontWeight={900} fill="#7C2D12">
            5.000 + 200 + 70
          </text>
          <text x={83} y={310} textAnchor="middle" fontSize={13} fontWeight={900} fill="#7C2D12">
            = 5.270
          </text>
          {/* bagan bagian utuh */}
          <rect x={188} y={326} width={84} height={26} rx={4} fill="#DBEAFE" stroke="#1D4ED8" strokeWidth={2.5} />
          <text x={230} y={344} textAnchor="middle" fontSize={14} fontWeight={900} fill="#1E3A8A">
            5.270
          </text>
          <path d="M205,352 L185,368 M255,352 L260,368" stroke="#1D4ED8" strokeWidth={2} />
          <rect x={150} y={368} width={70} height={26} rx={4} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth={2} />
          <text x={185} y={386} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1E3A8A">
            4.000
          </text>
          <rect x={228} y={368} width={64} height={26} rx={4} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth={2} />
          <text x={260} y={386} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1E3A8A">
            1.270
          </text>
          {/* pemeriksaan */}
          <rect x={150} y={412} width={142} height={26} rx={4} fill="#DCFCE7" stroke="#15803D" strokeWidth={2.5} />
          <text x={217} y={430} textAnchor="middle" fontSize={12} fontWeight={900} fill="#14532D">
            4.000+1.270=5.270
          </text>
          <circle cx={288} cy={412} r={9} fill="#15803D" />
          <text x={288} y={417} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFFFFF">
            ✓
          </text>
          {PIN_KELAPA.map((p, i) => (
            <Pin key={i} i={i} p={p} buka={buka.includes(i)} ketuk={ketuk} />
          ))}
        </svg>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_KELAPA : `Sudah dibuka ${buka.length} dari ${LANGKAH_KELAPA.length} langkah.`}
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
export { KiosKelapaK4B1 };
