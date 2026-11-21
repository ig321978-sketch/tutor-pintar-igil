"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { LANGKAH_PAMERAN, PETUNJUK_PETA, SELESAI_PETA, type GambarPeta } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti": papan pameran dengan enam gambar yang digambar sungguhan dari isi Story
 * (kisi seratus tujuh puluh lima kotak, nol koma tujuh lima menjadi persen lewat pecahan, dua batang dua puluh dari lima puluh dan empat puluh dari seratus,
 * nol koma enam kali seratus persen, empat puluh persen kembali ke nol koma empat, dan satu kisi penuh ditambah dua puluh kotak).
 * Label kosong menempel di bawah tiap gambar; ketuk satu per satu, judul langkah muncul dan dibacakan guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 * Semua teks gambar paling kecil sebelas satuan pada lebar seratus lima puluh (tampil sekitar sebelas piksel di layar 344).
 */
const BIRU = "#1C01A5";
const MERAH = "#DC2626";
const COKLAT = "#92400E";
const HIJAU = "#166534";
const ORANYE = "#F97316";
const GARIS = "#9A3412";

/** Kisi 10 x 10 sel (sisi `s`) di pojok (x, y) dengan `warna` sel pertama berwarna (baris demi baris). */
function Kisi({ x, y, s, warna }: { x: number; y: number; s: number; warna: number }) {
  return (
    <g data-kisi={warna}>
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={x + (i % 10) * s} y={y + Math.floor(i / 10) * s} width={s} height={s} fill={i < warna ? ORANYE : "#FFFFFF"} stroke={i < warna ? GARIS : "#FDBA74"} strokeWidth={0.6} data-sel={i < warna ? "1" : "0"} />
      ))}
    </g>
  );
}

const Teks = ({ x, y, u, w = BIRU, children }: { x: number; y: number; u: number; w?: string; children: React.ReactNode }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={u} fontWeight={900} fill={w}>
    {children}
  </text>
);

function Panah({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const d = x2 > x1 ? 1 : -1;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={MERAH} strokeWidth={2.5} />
      <polygon points={`${x2 - d * 8},${y - 5} ${x2},${y} ${x2 - d * 8},${y + 5}`} fill={MERAH} />
    </g>
  );
}

/** Gambar satu langkah (viewBox 150 x 80). */
function Gambar({ jenis }: { jenis: GambarPeta }) {
  const nama: Record<GambarPeta, string> = {
    persen: "kisi seratus kotak dengan tujuh puluh lima kotak berwarna, tulisan 75 persen",
    "ke-persen": "nol koma tujuh lima sama dengan tujuh puluh lima per seratus sama dengan tujuh puluh lima persen",
    lain: "dua puluh dari lima puluh sama dengan empat puluh dari seratus, dua batang sama panjang sama terisi",
    geser: "nol koma enam dikali seratus persen, koma digeser dua tempat, menjadi enam puluh persen",
    kembali: "empat puluh persen menjadi nol koma empat nol, sama dengan nol koma empat",
    lebih: "satu kisi penuh ditambah dua puluh kotak, satu koma dua sama dengan seratus dua puluh persen",
  };
  return (
    <svg viewBox="0 0 150 80" className="mx-auto w-full max-w-[150px]" role="img" aria-label={nama[jenis]} data-gambar={jenis}>
      {jenis === "persen" ? (
        <g>
          <Kisi x={4} y={5} s={7} warna={75} />
          <Teks x={112} y={40} u={24} w={MERAH}>
            75%
          </Teks>
          <Teks x={112} y={58} u={14} w={COKLAT}>
            per 100
          </Teks>
        </g>
      ) : null}
      {jenis === "ke-persen" ? (
        <g>
          <Teks x={75} y={22} u={17}>
            0,75
          </Teks>
          <Teks x={75} y={48} u={17} w={COKLAT}>
            = 75/100
          </Teks>
          <Teks x={75} y={72} u={17} w={MERAH}>
            = 75%
          </Teks>
        </g>
      ) : null}
      {jenis === "lain" ? (
        <g>
          <rect x={8} y={8} width={80} height={18} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.8} rx={2} />
          <rect x={8} y={8} width={32} height={18} fill="#FDE047" stroke={COKLAT} strokeWidth={1.8} rx={2} />
          <Teks x={118} y={22} u={14}>
            20/50
          </Teks>
          <Teks x={48} y={48} u={14} w={HIJAU}>
            × 2
          </Teks>
          <rect x={8} y={58} width={80} height={18} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.8} rx={2} />
          <rect x={8} y={58} width={32} height={18} fill="#FDE047" stroke={COKLAT} strokeWidth={1.8} rx={2} />
          <Teks x={118} y={72} u={14} w={MERAH}>
            40/100
          </Teks>
        </g>
      ) : null}
      {jenis === "geser" ? (
        <g>
          <Teks x={26} y={50} u={20}>
            0,6
          </Teks>
          <Teks x={74} y={28} u={14} w={COKLAT}>
            × 100%
          </Teks>
          <Panah x1={52} x2={98} y={40} />
          <Teks x={74} y={62} u={14} w={MERAH}>
            2 tempat
          </Teks>
          <Teks x={124} y={50} u={20} w={HIJAU}>
            60%
          </Teks>
        </g>
      ) : null}
      {jenis === "kembali" ? (
        <g>
          <Teks x={124} y={36} u={20} w={MERAH}>
            40%
          </Teks>
          <Teks x={74} y={20} u={14} w={COKLAT}>
            geser kiri
          </Teks>
          <Panah x1={98} x2={52} y={30} />
          <Teks x={26} y={36} u={19}>
            0,40
          </Teks>
          <Teks x={75} y={72} u={15} w={HIJAU}>
            0,40 = 0,4
          </Teks>
        </g>
      ) : null}
      {jenis === "lebih" ? (
        <g>
          <Kisi x={14} y={4} s={5} warna={100} />
          <Teks x={69} y={36} u={16} w={MERAH}>
            +
          </Teks>
          <Kisi x={84} y={4} s={5} warna={20} />
          <Teks x={75} y={74} u={16} w={HIJAU}>
            1,2 = 120%
          </Teks>
        </g>
      ) : null}
    </svg>
  );
}

export default function PapanPameranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_PAMERAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_PAMERAN[n].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#9A3412] bg-[#FFF7ED] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="papan-pameran">
        <div className="grid grid-cols-2 gap-x-1.5 gap-y-1">
          {LANGKAH_PAMERAN.map((l, n) => {
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className="flex flex-col justify-end rounded-xl border-2 border-[#FDBA74] bg-white/70 p-1">
                <Gambar jenis={l.gambar} />
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n + 1}: ${l.judul}` : `Label kosong langkah ${n + 1}`}
                  className={`mt-0.5 flex min-h-[44px] w-full min-w-0 items-center gap-1 rounded-xl border-[3px] px-1 py-0.5 text-left text-[13px] font-black leading-[1.15] text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
                >
                  <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
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
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_PAMERAN.length} langkah.`}
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

export { PapanPameranK4B2 };
