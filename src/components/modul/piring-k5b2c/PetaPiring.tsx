"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_PIRING, JUDUL_PETA_PIRING, LANGKAH_PIRING, PETUNJUK_PETA_PIRING, SELESAI_PETA_PIRING } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati": gambar meja klepon pasar malam (taplak kotak hijau, untaian lampion) dengan lima piring.
 * Tiap piring memuat gambar kecil sesuai langkahnya (pita dipotong, klepon dicatat, dua piring berpasangan, satu klepon di piring, klepon bersisa)
 * dan satu label kosong. Anak mengetuk label, judul langkah muncul dan dibacakan Guru. Anak tidak membuat konsep; konsep diberitahukan.
 * Satu layar tanpa gulir (lima baris: gambar di kiri, label utuh di kanan).
 */
const KLEPON = { isi: "#4ADE80", garis: "#166534" };

function Klepon({ x, y, r = 4.6 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={KLEPON.isi} stroke={KLEPON.garis} strokeWidth={1.2} />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.22} fill="#FFFFFF" />
    </g>
  );
}

/** Gambar kecil tiap piring: lima gambar berbeda menurut langkahnya. */
function IsiPiring({ ke }: { ke: number }) {
  return (
    <svg viewBox="0 0 90 52" className="block h-[52px] w-[90px]" role="img" aria-label={["Pita dipotong sama panjang", "Klepon dicatat", "Dua piring berpasangan", "Satu klepon di piring", "Klepon bersisa"][ke]} data-piring-peta={ke}>
      {ke === 0 ? (
        <g>
          {[0, 1, 2].map((i) =>
            [0, 1].map((j) => <rect key={`${i}-${j}`} x={9 + i * 24 + j * 11} y={17} width={10} height={16} rx={1.5} fill={["#5EEAD4", "#FDE68A", "#BAE6FD"][i]} stroke="#0F766E" strokeWidth={1} />),
          )}
          <line x1={32} y1={11} x2={32} y2={39} stroke="#B91C1C" strokeWidth={1.5} strokeDasharray="3 2" />
          <line x1={56} y1={11} x2={56} y2={39} stroke="#B91C1C" strokeWidth={1.5} strokeDasharray="3 2" />
        </g>
      ) : null}
      {ke === 1 ? (
        <g>
          <ellipse cx={45} cy={30} rx={34} ry={17} fill="#FFFFFF" stroke="#166534" strokeWidth={2} />
          <Klepon x={31} y={30} />
          <Klepon x={45} y={30} />
          <Klepon x={59} y={30} />
          <rect x={36} y={4} width={18} height={9} rx={2} fill="#FEF3C7" stroke="#92400E" strokeWidth={1} />
          <line x1={39} y1={8.5} x2={51} y2={8.5} stroke="#92400E" strokeWidth={1} />
        </g>
      ) : null}
      {ke === 2 ? (
        <g>
          <ellipse cx={22} cy={34} rx={19} ry={11} fill="#FFFFFF" stroke="#166534" strokeWidth={2} />
          <ellipse cx={68} cy={34} rx={19} ry={11} fill="#FFFFFF" stroke="#166534" strokeWidth={2} />
          <Klepon x={17} y={34} r={4} />
          <Klepon x={27} y={34} r={4} />
          {[0, 1, 2].map((i) => (
            <Klepon key={i} x={55 + i * 9} y={34} r={3.8} />
          ))}
          <path d="M22 22 Q45 2 68 22" fill="none" stroke="#B91C1C" strokeWidth={2} />
        </g>
      ) : null}
      {ke === 3 ? (
        <g>
          <ellipse cx={45} cy={32} rx={30} ry={15} fill="#FFFFFF" stroke="#166534" strokeWidth={2} />
          <Klepon x={45} y={32} r={6} />
          <path d="M45 6 L48 12 L54 12 L49 16 L51 22 L45 18 L39 22 L41 16 L36 12 L42 12 Z" fill="#FACC15" stroke="#A16207" strokeWidth={1} />
        </g>
      ) : null}
      {ke === 4 ? (
        <g>
          <ellipse cx={30} cy={32} rx={25} ry={14} fill="#FFFFFF" stroke="#166534" strokeWidth={2} />
          <Klepon x={21} y={32} r={4} />
          <Klepon x={31} y={32} r={4} />
          <Klepon x={40} y={32} r={4} />
          <rect x={62} y={22} width={24} height={20} rx={5} fill="#FEE2E2" stroke="#B91C1C" strokeWidth={1.5} strokeDasharray="4 3" />
          <Klepon x={74} y={32} r={4.4} />
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaPiring({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_PIRING.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_PIRING[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_PIRING)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_PIRING}</p>
      </div>

      <div
        className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#166534] bg-[#ECFDF5] shadow-[0_6px_0_rgba(20,83,45,0.35)]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(22,163,74,0.12) 0 14px,transparent 14px 28px),repeating-linear-gradient(90deg,rgba(22,163,74,0.12) 0 14px,transparent 14px 28px)" }}
        data-rupa="meja"
      >
        <div className="flex items-end justify-center gap-2 pt-1" aria-hidden="true">
          {["#DC2626", "#FACC15", "#16A34A", "#F97316", "#DC2626", "#FACC15", "#16A34A", "#F97316", "#DC2626"].map((w, i) => (
            <span key={i} className="block h-3.5 w-3 rounded-full border border-[#7F1D1D]" style={{ backgroundColor: w }} />
          ))}
        </div>
        <p className="my-1 text-center text-sm font-black text-[#14532D]">
          {IKON_JUDUL_PETA_PIRING} {JUDUL_PETA_PIRING}
        </p>
        <div className="space-y-1.5 px-2 pb-2">
          {LANGKAH_PIRING.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className="grid grid-cols-[92px_1fr] items-center gap-2 rounded-xl border-2 border-[#86EFAC] bg-white/80 px-1.5 py-1">
                <IsiPiring ke={i} />
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                  className={`flex min-h-[48px] w-full min-w-0 items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#166534] bg-white"}`}
                >
                  <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#166534] bg-[#166534]"}`}>
                    {n}
                  </span>
                  <span className="min-w-0 text-sm">{terbuka ? l.judul : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_PIRING : `Sudah dibuka ${buka.length} dari ${LANGKAH_PIRING.length} langkah.`}
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
export { PetaPiring };
