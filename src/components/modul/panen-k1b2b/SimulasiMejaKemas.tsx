"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { MUAT, awalPanen, catatPanen, kalimatPanen, kata, tukarTempat, ubahIsi, type KeadaanPanen } from "./logika";
import { AWAL_SIM, EMOJI } from "./data";

/**
 * Simulasi Kelas 1 Bab 2 Sub-Bab B: Misi Panen bagian satu, meja kemas. Eksplorasi bebas tanpa skor: tambah atau ambil sayur di
 * keranjang kiri dan kanan, tekan Tukar tempat, dan lihat empat perwakilan yang terhubung: keranjang, garis bilangan dengan
 * lompatan, bingkai sepuluh, dan kalimat penjumlahan. Catat setiap kalimat yang ditemukan. Mulai dari tiga dan satu (beda dari Story).
 */
export default function SimulasiMejaKemas({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPanen) => void }) {
  const [k, setK] = useState<KeadaanPanen>(() => awalPanen(AWAL_SIM.a, AWAL_SIM.b));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const c = k.a + k.b;
  const ubah = (sisi: "a" | "b", d: 1 | -1) => {
    const baru = ubahIsi(k, sisi, d);
    if (baru === k) speakGuru(d === 1 ? "Keranjang sudah penuh sepuluh." : "Keranjang ini sudah kosong, nol.");
    else speakGuru(kata(baru[sisi]));
    setK(baru);
  };
  const tukar = () => {
    const baru = tukarTempat(k);
    speakGuru(`Ditukar. ${kalimatPanen(baru)}`);
    setK(baru);
  };
  const catat = () => {
    const baru = catatPanen(k);
    speakGuru(baru === k ? "Kalimat ini sudah dicatat. Coba ubah isinya." : kalimatPanen(k));
    setK(baru);
  };
  const keranjang = (sisi: "a" | "b") => {
    const n = k[sisi];
    const warna = sisi === "a" ? "#2563EB" : "#DB2777";
    return (
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FDE68A] p-2">
        <p className="text-center text-sm font-black text-[#78350F]">
          Keranjang {sisi === "a" ? "kiri" : "kanan"}: <span style={{ color: warna }}>{n}</span>
        </p>
        <div className="mt-1 flex min-h-[56px] flex-wrap justify-center gap-0.5">
          {n === 0 ? <span className="self-center text-xs font-bold text-[#78350F]/70">kosong, nol</span> : null}
          {Array.from({ length: n }, (_, i) => (
            <span key={i} className="text-2xl leading-none" aria-hidden="true">
              {sisi === "a" ? EMOJI.tomat : EMOJI.timun}
            </span>
          ))}
        </div>
        <div className="mt-1 flex justify-center gap-2">
          <button type="button" onClick={() => ubah(sisi, -1)} aria-label={`Ambil satu dari keranjang ${sisi === "a" ? "kiri" : "kanan"}`} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black text-[#1C01A5]">
            {"\u{2212}"}
          </button>
          <button type="button" onClick={() => ubah(sisi, 1)} aria-label={`Tambah satu ke keranjang ${sisi === "a" ? "kiri" : "kanan"}`} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black text-[#1C01A5]">
            +
          </button>
        </div>
      </div>
    );
  };
  const xg = (n: number) => 14 + n * 27.2;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Meja kemas. Isi dua keranjang, tekan <b>Tukar tempat</b>, lalu tekan <b>Catat kalimat</b>.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {keranjang("a")}
        {keranjang("b")}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={tukar} className="min-h-[48px] rounded-full border-4 border-[#DB2777] bg-[#FCE7F3] px-4 text-sm font-black text-[#BE185D]">
          {"\u{1F504}"} Tukar tempat
        </button>
      </div>

      {/* Perwakilan terhubung: garis bilangan dan bingkai sepuluh */}
      <div className="grid gap-2 sm:grid-cols-[1fr_11rem]">
        <svg viewBox="0 0 300 80" className="w-full rounded-2xl border-4 border-[#1C01A5] bg-white" aria-label={`Garis bilangan: mulai dari ${k.a}, melompat ${k.b} kali sampai ${c}`}>
          <line x1={8} y1={44} x2={292} y2={44} stroke="#1C01A5" strokeWidth={2} />
          {Array.from({ length: 11 }, (_, n) => (
            <g key={n}>
              <line x1={xg(n)} y1={38} x2={xg(n)} y2={50} stroke="#1C01A5" strokeWidth={2} />
              <text x={xg(n)} y={68} textAnchor="middle" fontSize={12} fontWeight={900} fill={n === k.a ? "#2563EB" : n === c ? "#DC2626" : "#1C01A5"}>
                {n}
              </text>
            </g>
          ))}
          <circle cx={xg(k.a)} cy={44} r={6} fill="#2563EB" />
          {Array.from({ length: k.b }, (_, j) => (
            <path key={j} d={`M${xg(k.a + j)} 38 Q${xg(k.a + j) + 13.6} 10 ${xg(k.a + j + 1)} 38`} fill="none" stroke="#DB2777" strokeWidth={2.4} />
          ))}
        </svg>
        <div className="grid grid-cols-5 gap-0.5 rounded-xl border-4 border-[#1C01A5] bg-white p-1" aria-label={`Bingkai sepuluh: ${c} terisi`}>
          {Array.from({ length: MUAT }, (_, i) => (
            <span key={i} className={`aspect-square rounded-full border-2 border-[#1C01A5] ${i < k.a ? "bg-[#2563EB]" : i < c ? "bg-[#DB2777]" : "bg-white"}`} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="text-center text-3xl font-black text-[#1C01A5]" aria-label="Kalimat penjumlahan">
          <span className="text-[#2563EB]">{k.a}</span> <span className="text-[#DC2626]">+</span> <span className="text-[#DB2777]">{k.b}</span> <span className="text-[#DC2626]">=</span> {c}
        </p>
        <p className="text-center text-xs font-black text-[#15803D]">{k.a === k.b && k.a > 0 ? "Kembar!" : ""} {c === MUAT ? "Penuh sepuluh!" : ""}</p>
        <div className="mt-1 flex justify-center">
          <button type="button" onClick={catat} className="min-h-[48px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-4 text-sm font-black text-[#15803D]">
            {"\u{1F4DD}"} Catat kalimat
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFF7ED] p-2">
        <p className="text-center text-sm font-black text-[#78350F]">Catatan kalimat</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat.length === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Belum ada.</span> : null}
          {k.catat.map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-[#FFF7CC] px-2 text-sm font-black text-[#1C01A5]">
              {p.replace("+", " + ").replace("=", " = ")}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatPanen(k)}
      </p>
    </div>
  );
}
