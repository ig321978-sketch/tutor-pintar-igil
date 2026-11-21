"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BAGI_DUA, LANGKAH_JAHIT, PETUNJUK_PETA, RANTAI_KALI, SALAH_TAMBAH, SELESAI_PETA, TUMPUKAN, hasilBagi, hasilTambah, rantaiKali, type LangkahPeta } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar": meja jahit dengan lima kelompok potongan kain yang digambar sungguhan
 * (tiga potongan ditumpuk, satu per dua dan tiga per empat hasil tambah, rantai kali dua, enam per delapan dibagi dua, pecahan paling sederhana).
 * Label kosong menempel di samping tiap kelompok; ketuk satu per satu, judul langkah muncul dan dibacakan guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const BIRU = "#1C01A5";
const MAWAR = "#BE185D";
const MERAH = "#DC2626";

/** Satu potongan kain: `n` bagian sama besar, `k` bagian pertama diarsir. Satu persegi panjang per bagian. */
function Kain({ x, y, w, h, n, k, warna = MAWAR }: { x: number; y: number; w: number; h: number; n: number; k: number; warna?: string }) {
  return (
    <g data-kain={`${k}/${n}`}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + (i * w) / n} y={y} width={w / n} height={h} fill={i < k ? warna : "#FFFFFF"} stroke={BIRU} strokeWidth={1.3} data-arsir={i < k ? 1 : 0} />
      ))}
    </g>
  );
}

/** Pecahan bertingkat di SVG: pembilang di atas, garis, penyebut di bawah; (x, y) = tengah garis. */
function Tingkat({ x, y, p, q, fs = 15, warna = BIRU }: { x: number; y: number; p: number; q: number; fs?: number; warna?: string }) {
  return (
    <g>
      <text x={x} y={y - 3} textAnchor="middle" fontSize={fs} fontWeight={900} fill={warna}>
        {p}
      </text>
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke={warna} strokeWidth={1.8} />
      <text x={x} y={y + fs + 1} textAnchor="middle" fontSize={fs} fontWeight={900} fill={warna}>
        {q}
      </text>
    </g>
  );
}

function Gambar({ id }: { id: LangkahPeta["id"] }) {
  if (id === "tumpuk") {
    const w = 110;
    return (
      <svg viewBox="0 0 160 72" className="w-full" role="img" aria-label="tiga potongan kain ditumpuk, ujung arsiran sama" data-gambar={id}>
        {TUMPUKAN.map((t, i) => (
          <g key={`${t.p}/${t.q}`}>
            <text x={1} y={17 + i * 22} fontSize={15} fontWeight={900} fill={BIRU}>
              {t.p}/{t.q}
            </text>
            <Kain x={28} y={4 + i * 22} w={w} h={18} n={t.q} k={t.p} />
          </g>
        ))}
        <line x1={28 + w / 2} y1={0} x2={28 + w / 2} y2={72} stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" />
      </svg>
    );
  }
  if (id === "tambah") {
    const w = 110;
    const h = hasilTambah();
    return (
      <svg viewBox="0 0 160 52" className="w-full" role="img" aria-label="satu per dua dan tiga per empat hasil tambah dua, tidak sama panjang" data-gambar={id}>
        <text x={1} y={17} fontSize={15} fontWeight={900} fill={BIRU}>
          {SALAH_TAMBAH.awal.p}/{SALAH_TAMBAH.awal.q}
        </text>
        <Kain x={28} y={4} w={w} h={18} n={SALAH_TAMBAH.awal.q} k={SALAH_TAMBAH.awal.p} />
        <text x={1} y={43} fontSize={15} fontWeight={900} fill={MERAH}>
          {h.p}/{h.q}
        </text>
        <Kain x={28} y={30} w={w} h={18} n={h.q} k={h.p} warna="#F9A8D4" />
        <line x1={28 + w / 2} y1={0} x2={28 + w / 2} y2={52} stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" />
        <text x={150} y={32} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
          ≠
        </text>
      </svg>
    );
  }
  if (id === "kali") {
    const rantai = rantaiKali();
    const xs = [18, 80, 142];
    return (
      <svg viewBox="0 0 160 42" className="w-full" role="img" aria-label="satu per dua dikali dua menjadi dua per empat, dikali dua lagi menjadi empat per delapan" data-gambar={id}>
        {rantai.map((r, i) => (
          <Tingkat key={`${r.p}/${r.q}`} x={xs[i]} y={21} p={r.p} q={r.q} />
        ))}
        {[0, 1].map((i) => (
          <g key={i}>
            <text x={(xs[i] + xs[i + 1]) / 2} y={14} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
              × {RANTAI_KALI.pengali}
            </text>
            <line x1={xs[i] + 17} y1={24} x2={xs[i + 1] - 19} y2={24} stroke={MERAH} strokeWidth={2.2} />
            <polygon points={`${xs[i + 1] - 19},19 ${xs[i + 1] - 12},24 ${xs[i + 1] - 19},29`} fill={MERAH} />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "bagi") {
    const hb = hasilBagi();
    return (
      <svg viewBox="0 0 160 76" className="w-full" role="img" aria-label="enam per delapan dibagi dua menjadi tiga per empat, dua potongan sama panjang" data-gambar={id}>
        <Tingkat x={18} y={21} p={BAGI_DUA.dari.p} q={BAGI_DUA.dari.q} />
        <Tingkat x={142} y={21} p={hb.p} q={hb.q} />
        <text x={80} y={14} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
          ÷ {BAGI_DUA.pembagi}
        </text>
        <line x1={36} y1={24} x2={121} y2={24} stroke={MERAH} strokeWidth={2.2} />
        <polygon points="121,19 129,24 121,29" fill={MERAH} />
        <Kain x={8} y={46} w={144} h={12} n={BAGI_DUA.dari.q} k={BAGI_DUA.dari.p} />
        <Kain x={8} y={61} w={144} h={12} n={hb.q} k={hb.p} warna="#9D174D" />
      </svg>
    );
  }
  const hb = hasilBagi();
  const titik = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 8) * (2 * i + 1);
    return `${(122 + 25 * Math.cos(a)).toFixed(1)},${(27 + 25 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 160 54" className="w-full" role="img" aria-label="tiga per empat di tanda berhenti dan satu potongan kain" data-gambar={id}>
      <Kain x={4} y={16} w={84} h={22} n={hb.q} k={hb.p} />
      <polygon points={titik} fill={MERAH} stroke="#991B1B" strokeWidth={2} />
      <Tingkat x={122} y={26} p={hb.p} q={hb.q} fs={15} warna="#FFFFFF" />
    </svg>
  );
}

export default function PetaJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_JAHIT.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_JAHIT[n].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-[13px] font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#9D174D] bg-[#FDF2F8] p-1.5 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="meja-jahit">
        <div className="space-y-1">
          {LANGKAH_JAHIT.map((l, n) => {
            const terbuka = buka.includes(n);
            return (
              <div key={l.id} className="grid grid-cols-[minmax(0,1fr)_8.5rem] items-center gap-1.5 rounded-xl border-2 border-[#F9A8D4] bg-white/80 p-1">
                <Gambar id={l.id} />
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n + 1}: ${l.judul}` : `Label kosong langkah ${n + 1}`}
                  className={`flex min-h-[48px] w-full min-w-0 items-center gap-1.5 rounded-xl border-[3px] px-1.5 py-1 text-left text-[13px] font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#9D174D] bg-white"}`}
                >
                  <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#9D174D] bg-[#9D174D]"}`}>
                    {n + 1}
                  </span>
                  <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_JAHIT.length} langkah.`}
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

export { PetaJahitK4B2 };
