"use client";

import React from "react";

/** Warna empat tempat Kelas 4 Bab 1 (sesuai Materi): ribuan ungu, ratusan hijau, puluhan biru, satuan merah. */
export const WARNA_TEMPAT_K4 = ["#7C3AED", "#16A34A", "#2563EB", "#DC2626"];
export const LATAR_TEMPAT_K4 = ["#F3E8FF", "#DCFCE7", "#DBEAFE", "#FEE2E2"];
export const NAMA_TEMPAT_K4 = ["Ribuan", "Ratusan", "Puluhan", "Satuan"];

/**
 * Papan empat tempat. Bila `onKetuk` diberikan, tiap digit menjadi tombol (aria-label "Ketuk angka di <tempat>").
 * `sorot` menandai satu tempat.
 */
export default function PapanK4({
  digit,
  sorot = null,
  onKetuk,
  label = "Papan nilai tempat",
}: {
  digit: readonly (number | null)[];
  sorot?: number | null;
  onKetuk?: (i: number) => void;
  label?: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5" role="group" aria-label={label}>
      {digit.map((d, i) => {
        const isi = (
          <>
            <span className="block text-[10px] font-black uppercase" style={{ color: WARNA_TEMPAT_K4[i] }}>
              {NAMA_TEMPAT_K4[i]}
            </span>
            <span className="block text-3xl font-black" style={{ color: WARNA_TEMPAT_K4[i] }}>
              {d ?? "…"}
            </span>
          </>
        );
        const kelas = `rounded-xl border-4 px-1 py-1.5 text-center ${sorot === i ? "ring-4 ring-[#F0AB00]" : ""}`;
        const gaya = { borderColor: WARNA_TEMPAT_K4[i], backgroundColor: LATAR_TEMPAT_K4[i] };
        return onKetuk ? (
          <button key={i} type="button" aria-label={`Ketuk angka di ${NAMA_TEMPAT_K4[i].toLowerCase()}`} aria-pressed={sorot === i} onClick={() => onKetuk(i)} className={kelas} style={gaya}>
            {isi}
          </button>
        ) : (
          <div key={i} className={kelas} style={gaya}>
            {isi}
          </div>
        );
      })}
    </div>
  );
}

/** Pengatur satu digit: tombol −/+ (aria-label "Kurangi/Tambah angka <tempat><akhiran>"). */
export function AturDigit({ i, nilai, onUbah, akhiran = "" }: { i: number; nilai: number; onUbah: (d: 1 | -1) => void; akhiran?: string }) {
  const nama = NAMA_TEMPAT_K4[i].toLowerCase();
  return (
    <div className="flex flex-col items-center gap-1">
      <button type="button" aria-label={`Tambah angka ${nama}${akhiran}`} onClick={() => onUbah(1)} className="h-8 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-base font-black leading-none text-[#1C01A5]">
        +
      </button>
      <span className="text-2xl font-black" style={{ color: WARNA_TEMPAT_K4[i] }}>
        {nilai}
      </span>
      <button type="button" aria-label={`Kurangi angka ${nama}${akhiran}`} onClick={() => onUbah(-1)} className="h-8 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-base font-black leading-none text-[#1C01A5]">
        −
      </button>
    </div>
  );
}

/** Pesan lab: info (🔄/✅) berwarna hijau, selebihnya peringatan merah. */
export function PesanLabK4({ pesan }: { pesan: string }) {
  if (!pesan) return null;
  const info = pesan.startsWith("🔄") || pesan.startsWith("✅");
  return (
    <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${info ? "border-[#86EFAC] bg-[#E8F7EE] text-[#14532D]" : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"}`}>
      {info ? pesan : `⛔ ${pesan}`}
    </p>
  );
}
