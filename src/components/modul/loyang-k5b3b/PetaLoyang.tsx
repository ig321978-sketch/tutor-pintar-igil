"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  IKON_JUDUL_PETA_LOYANG,
  JUDUL_PETA_LOYANG,
  LANGKAH_LOYANG,
  PETUNJUK_PETA_LOYANG,
  SELESAI_PETA_LOYANG,
} from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno": gambar loyang roti berenam sekat (satu kolom, tiap sekat bergantian gambar di kiri dan di kanan) dengan pinggiran logam dan dua pegangan.
 * Tiap sekat memuat gambar kecil bar pecahan sesuai langkahnya (cek penyebut, samakan, jumlahkan pembilang, penyebut tetap, campuran, sederhanakan)
 * dan satu label kosong. Anak mengetuk label, judul langkah muncul dan dibacakan Guru. Anak tidak membuat konsep; konsep diberitahukan.
 * Satu layar tanpa gulir (enam sekat berkisi tetap, gambar di atas dan label utuh di bawahnya).
 */
const TAMBAH = "#F59E0B";
const TAMBAH_GARIS = "#B45309";
const BIRU = "#93C5FD";
const BIRU_GARIS = "#1D4ED8";

/** Satu bar kecil: `d` sel, `n` sel pertama terisi, mulai dari (x, y) selebar `lebar`. Kunci tiap sel unik lewat awalan. */
function MiniBar({
  id,
  x,
  y,
  d,
  n,
  lebar,
  warna = TAMBAH,
  garis = TAMBAH_GARIS,
  mulai = 0,
}: {
  id: string;
  x: number;
  y: number;
  d: number;
  n: number;
  lebar: number;
  warna?: string;
  garis?: string;
  mulai?: number;
}) {
  const w = lebar / d;
  return (
    <g data-minibar={id}>
      {Array.from({ length: d }, (_, i) => (
        <rect
          key={`${id}${i}`}
          x={x + i * w + 0.4}
          y={y}
          width={Math.max(1.5, w - 0.8)}
          height={9}
          rx={1.2}
          fill={i >= mulai && i < mulai + n ? warna : "#FFFFFF"}
          stroke={i >= mulai && i < mulai + n ? garis : "#94A3B8"}
          strokeWidth={0.9}
        />
      ))}
    </g>
  );
}

/** Gambar kecil tiap sekat: enam gambar berbeda menurut langkahnya. */
function IsiSekat({ ke }: { ke: number }) {
  return (
    <svg
      viewBox="0 0 120 46"
      className="block h-[42px] w-[100px] shrink-0"
      role="img"
      aria-label={
        [
          "Dua bar berpenyebut sama",
          "Bar tiga bagian dan dua bagian disamakan",
          "Pembilang dijumlahkan",
          "Penyebut tetap",
          "Bar penuh ditambah bar pecahan",
          "Bar tak murni menjadi campuran",
        ][ke]
      }
      data-sekat-peta={ke}
    >
      {ke === 0 ? (
        <g>
          <MiniBar id="s0a" x={8} y={8} d={4} n={1} lebar={46} />
          <MiniBar
            id="s0b"
            x={66}
            y={8}
            d={4}
            n={2}
            lebar={46}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <text
            x={60}
            y={16}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            =
          </text>
          <text
            x={31}
            y={34}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            4 = 4
          </text>
        </g>
      ) : null}
      {ke === 1 ? (
        <g>
          <MiniBar id="s1a" x={6} y={5} d={3} n={1} lebar={42} />
          <MiniBar
            id="s1b"
            x={6}
            y={18}
            d={2}
            n={1}
            lebar={42}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <path
            d="M54 20 L72 20"
            stroke="#B91C1C"
            strokeWidth={1.6}
            fill="none"
          />
          <path
            d="M72 20 L67 16 M72 20 L67 24"
            stroke="#B91C1C"
            strokeWidth={1.6}
            fill="none"
          />
          <MiniBar id="s1c" x={78} y={5} d={6} n={2} lebar={36} />
          <MiniBar
            id="s1d"
            x={78}
            y={18}
            d={6}
            n={3}
            lebar={36}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <text
            x={60}
            y={42}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            KPK
          </text>
        </g>
      ) : null}
      {ke === 2 ? (
        <g>
          <MiniBar id="s2a" x={8} y={6} d={8} n={1} lebar={104} />
          <MiniBar
            id="s2b"
            x={8}
            y={19}
            d={8}
            n={2}
            lebar={104}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <text
            x={60}
            y={42}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            1 + 2 = 3
          </text>
        </g>
      ) : null}
      {ke === 3 ? (
        <g>
          <MiniBar id="s3a" x={8} y={6} d={8} n={3} lebar={104} />
          <path
            d="M8 22 L112 22"
            stroke="#B91C1C"
            strokeWidth={1.4}
            strokeDasharray="4 3"
            fill="none"
          />
          <text
            x={60}
            y={36}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#B91C1C"
          >
            tetap 8
          </text>
        </g>
      ) : null}
      {ke === 4 ? (
        <g>
          <MiniBar id="s4a" x={8} y={5} d={5} n={5} lebar={50} />
          <MiniBar
            id="s4b"
            x={8}
            y={18}
            d={5}
            n={1}
            lebar={50}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <text
            x={94}
            y={14}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            bulat
          </text>
          <text
            x={94}
            y={28}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            pecahan
          </text>
        </g>
      ) : null}
      {ke === 5 ? (
        <g>
          <MiniBar id="s5a" x={8} y={5} d={4} n={4} lebar={46} />
          <MiniBar
            id="s5b"
            x={8}
            y={18}
            d={4}
            n={3}
            lebar={46}
            warna={BIRU}
            garis={BIRU_GARIS}
          />
          <path
            d="M60 18 L78 18 M78 18 L73 14 M78 18 L73 22"
            stroke="#B91C1C"
            strokeWidth={1.6}
            fill="none"
          />
          <text
            x={96}
            y={22}
            textAnchor="middle"
            fontSize={12.6}
            fontWeight={900}
            fill="#7C2D12"
          >
            1 3/4
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaLoyang({
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_LOYANG.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_LOYANG[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button
          type="button"
          onClick={() => speakGuru(PETUNJUK_PETA_LOYANG)}
          className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm"
          aria-label="Dengar petunjuk"
        >
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">
          {PETUNJUK_PETA_LOYANG}
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-xl" data-rupa="loyang">
        <span
          aria-hidden="true"
          className="absolute -left-1 top-1/2 h-10 w-3 -translate-y-1/2 rounded-l-full border-4 border-r-0 border-[#64748B] bg-[#CBD5E1]"
        />
        <span
          aria-hidden="true"
          className="absolute -right-1 top-1/2 h-10 w-3 -translate-y-1/2 rounded-r-full border-4 border-l-0 border-[#64748B] bg-[#CBD5E1]"
        />
        <div className="overflow-hidden rounded-3xl border-[7px] border-[#94A3B8] bg-[#FEF3C7] shadow-[0_6px_0_rgba(71,85,105,0.35)]">
          <p className="bg-[#E2E8F0] py-1 text-center text-sm font-black text-[#7C2D12]">
            {IKON_JUDUL_PETA_LOYANG} {JUDUL_PETA_LOYANG}
          </p>
          <div className="space-y-1 p-1.5">
            {LANGKAH_LOYANG.map((l, i) => {
              const n = i + 1;
              const terbuka = buka.includes(n);
              const kiri = i % 2 === 0;
              const tombol = (
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={
                    terbuka
                      ? `Langkah ${n}: ${l.judul}`
                      : `Label kosong langkah ${n}`
                  }
                  className={`flex min-h-[44px] w-full min-w-0 items-center gap-1.5 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#B45309] bg-[#FDE68A]" : "border-dashed border-[#B45309] bg-white"}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#9A3412] bg-[#9A3412] text-xs text-white"
                  >
                    {n}
                  </span>
                  <span className="min-w-0 text-[13px]">
                    {terbuka ? l.judul : "?"}
                  </span>
                </button>
              );
              return (
                <div
                  key={l.judul}
                  className={`grid items-center gap-2 rounded-2xl border-2 border-[#D97706] bg-[#FFFBEB] px-1.5 py-0.5 ${kiri ? "grid-cols-[100px_1fr]" : "grid-cols-[1fr_100px]"}`}
                >
                  {kiri ? (
                    <>
                      <IsiSekat ke={i} />
                      {tombol}
                    </>
                  ) : (
                    <>
                      {tombol}
                      <IsiSekat ke={i} />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]"
      >
        {selesai
          ? SELESAI_PETA_LOYANG
          : `Sudah dibuka ${buka.length} dari ${LANGKAH_LOYANG.length} langkah.`}
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
export { PetaLoyang };
