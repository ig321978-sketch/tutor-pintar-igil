"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_GUDANG, JUDUL_PETA_GUDANG, LANGKAH_GUDANG, PETUNJUK_PETA_GUDANG, SELESAI_PETA_GUDANG } from "./data-peta";
import { JENIS_GUDANG, TEMPAT_GUDANG, WARNA_TEMPAT_GUDANG } from "./data-info";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (dirancang sendiri): RAK GUDANG empat tingkat seperti isi gudang di Story (dua peti, tiga kotak, tidak ada ikat, empat lembar),
 * tiap tingkat berlabel tempat angka dan berangka besar di ujung kanan; di bawah rak ada papan tukar angka (2.304 menjadi 3.204).
 * Di kiri tiap tingkat menempel tag kardus berlabel kosong; diketuk, judul langkah muncul dan dibacakan Guru. Lanjut setelah kelimanya terbuka. Satu layar tanpa gulir.
 */
const LEBAR = 300;
const TINGGI = 376;
const Y0 = 44;
const TB = 66;
const Y_TUKAR = Y0 + 4 * TB + 4;
const TAG_X = 10;
const TAG_W = 102;
/** Posisi atas tiap label (rak 1-4 lalu papan tukar). */
const ATAS_LABEL = [Y0 + 6, Y0 + TB + 6, Y0 + 2 * TB + 6, Y0 + 3 * TB + 6, Y_TUKAR + 8];

function Rak() {
  const y = (i: number) => Y0 + i * TB;
  const tukar = Y_TUKAR;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Rak gudang handuk empat tingkat: dua peti, tiga kotak, tidak ada ikat, empat lembar, dan papan tukar angka dua tiga nol empat menjadi tiga dua nol empat" data-uji="rak-gudang">
      <rect width={LEBAR} height={TINGGI} rx={10} fill="#F5E6C8" />
      <rect x={6} y={4} width={288} height={34} rx={6} fill="#78350F" />
      <text x={150} y={26} textAnchor="middle" fontSize={14} fontWeight={900} fill="#FEF3C7">
        GUDANG HANDUK
      </text>
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={6} y={y(i)} width={288} height={TB - 2} fill="#FFF8E7" stroke="#B7814A" strokeWidth={2} />
          <rect x={6} y={y(i) + TB - 10} width={288} height={8} fill="#92400E" />
          <text x={292} y={y(i) + 13} textAnchor="end" fontSize={11} fontWeight={800} fill={WARNA_TEMPAT_GUDANG[i]}>
            {TEMPAT_GUDANG[i]}
          </text>
          <circle cx={268} cy={y(i) + 36} r={15} fill="#FFFFFF" stroke={WARNA_TEMPAT_GUDANG[i]} strokeWidth={3} />
          <text x={268} y={y(i) + 44} textAnchor="middle" fontSize={22} fontWeight={900} fill={WARNA_TEMPAT_GUDANG[i]}>
            {JENIS_GUDANG[i].jumlah}
          </text>
        </g>
      ))}
      {/* tingkat 1: dua peti */}
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={124 + k * 58} y={y(0) + 14} width={52} height={40} fill="#D97706" stroke="#78350F" strokeWidth={2.5} />
          <line x1={124 + k * 58} y1={y(0) + 27} x2={176 + k * 58} y2={y(0) + 27} stroke="#78350F" strokeWidth={2} />
          <line x1={124 + k * 58} y1={y(0) + 41} x2={176 + k * 58} y2={y(0) + 41} stroke="#78350F" strokeWidth={2} />
          <text x={150 + k * 58} y={y(0) + 38} textAnchor="middle" fontSize={12} fontWeight={900} fill="#FFFBEB">
            1.000
          </text>
        </g>
      ))}
      {/* tingkat 2: tiga kotak */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={124 + k * 44} y={y(1) + 22} width={38} height={32} fill="#F59E0B" stroke="#78350F" strokeWidth={2.5} />
          <line x1={143 + k * 44} y1={y(1) + 22} x2={143 + k * 44} y2={y(1) + 54} stroke="#FEF3C7" strokeWidth={4} />
          <text x={143 + k * 44} y={y(1) + 14 + 0} textAnchor="middle" fontSize={11} fontWeight={800} fill="#78350F">
            100
          </text>
        </g>
      ))}
      {/* tingkat 3: tidak ada ikat */}
      <rect x={124} y={y(2) + 20} width={128} height={34} rx={6} fill="none" stroke="#9CA3AF" strokeWidth={2.5} strokeDasharray="6 4" />
      <text x={188} y={y(2) + 42} textAnchor="middle" fontSize={12} fontWeight={800} fill="#6B7280">
        tidak ada ikat
      </text>
      {/* tingkat 4: empat lembar */}
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x={124 + k * 30} y={y(3) + 34} width={26} height={20} rx={3} fill={["#38BDF8", "#FB923C", "#4ADE80", "#F472B6"][k]} stroke="#1F2937" strokeWidth={2} />
          <line x1={128 + k * 30} y1={y(3) + 44} x2={146 + k * 30} y2={y(3) + 44} stroke="#FFFFFF" strokeWidth={2} opacity={0.8} />
        </g>
      ))}
      {/* papan tukar angka */}
      <rect x={6} y={tukar} width={288} height={TINGGI - tukar - 6} rx={8} fill="#FFFBEB" stroke="#B45309" strokeWidth={3} />
      {[2, 3, 0, 4].map((d, k) => (
        <g key={`a${k}`}>
          <rect x={124 + k * 20} y={tukar + 10} width={18} height={24} rx={3} fill={k < 2 ? "#FDE68A" : "#E5E7EB"} stroke="#1F2937" strokeWidth={1.5} />
          <text x={133 + k * 20} y={tukar + 28} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1F2937">
            {d}
          </text>
        </g>
      ))}
      <text x={209} y={tukar + 28} textAnchor="middle" fontSize={15} fontWeight={900} fill="#B45309">
        →
      </text>
      {[3, 2, 0, 4].map((d, k) => (
        <g key={`b${k}`}>
          <rect x={214 + k * 20} y={tukar + 10} width={18} height={24} rx={3} fill={k < 2 ? "#BBF7D0" : "#E5E7EB"} stroke="#1F2937" strokeWidth={1.5} />
          <text x={223 + k * 20} y={tukar + 28} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1F2937">
            {d}
          </text>
        </g>
      ))}
      <text x={205} y={tukar + 54} textAnchor="middle" fontSize={13} fontWeight={900} fill="#78350F">
        2.304 → 3.204
      </text>
    </svg>
  );
}

export default function GudangHandukK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_GUDANG.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_GUDANG[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-2" data-uji="peta-gudang">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_GUDANG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_GUDANG}</p>
      </div>

      <div className="mx-auto w-full max-w-[300px]">
        <p className="mb-1 rounded-lg bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA_GUDANG} {JUDUL_PETA_GUDANG}
        </p>
        <div className="relative w-full" style={{ aspectRatio: `${LEBAR} / ${TINGGI}` }}>
          <Rak />
          {LANGKAH_GUDANG.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(i)}
                aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                style={{ left: `${(TAG_X / LEBAR) * 100}%`, width: `${(TAG_W / LEBAR) * 100}%`, top: `${(ATAS_LABEL[i] / TINGGI) * 100}%`, height: 50 }}
                className={`absolute flex items-center justify-center rounded-t-xl rounded-b-md border-[3px] px-1 text-center font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[12px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-[#FDE9B8] text-2xl text-[#B45309]"}`}
              >
                <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_GUDANG : `Sudah dibuka ${buka.length} dari ${LANGKAH_GUDANG.length} langkah.`}
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
export { GudangHandukK4B1 };
