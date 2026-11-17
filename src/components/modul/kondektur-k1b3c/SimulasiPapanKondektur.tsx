"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { KURANG, awalKeluarga, bacaCatat, catatKeluarga, empatKalimat, kata, nilaiPojok, tebakPojok, tutupPojok, ubahBagian, type KeadaanKeluarga, type Pojok } from "./logika";
import { AWAL_SIM, EMOJI } from "./data";

/**
 * Simulasi Kelas 1 Bab 3 Sub-Bab C: Misi Kondektur bagian satu, papan kondektur. Eksplorasi bebas tanpa skor: atur penumpang biru dan merah
 * (semuanya paling banyak sepuluh), lihat empat kalimat keluarga dan segitiga fakta berubah bersama, catat kalimatnya, lalu tutup satu pojok
 * segitiga dan tebak bilangan yang tertutup. Bilangan awal berbeda dari Story: dua biru dan lima merah.
 */
const tulis = (t: string) => t.replace("-", ` ${KURANG} `).replace("+", " + ").replace("=", " = ");

export default function SimulasiPapanKondektur({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKeluarga) => void }) {
  const [k, setK] = useState<KeadaanKeluarga>(() => awalKeluarga(AWAL_SIM.x, AWAL_SIM.y));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const z = k.x + k.y;
  const ubah = (b: "x" | "y", d: 1 | -1) => {
    const baru = ubahBagian(k, b, d);
    speakGuru(baru === k ? (d === 1 ? "Semuanya paling banyak sepuluh." : "Sudah nol.") : `Biru ${kata(baru.x)}, merah ${kata(baru.y)}, semuanya ${kata(baru.x + baru.y)}.`);
    setK(baru);
  };
  const catat = (i: 0 | 1 | 2 | 3) => {
    const baru = catatKeluarga(k, i);
    speakGuru(baru === k ? "Kalimat ini sudah dicatat." : `${bacaCatat(empatKalimat(k)[i])}.`);
    setK(baru);
  };
  const tutup = (p: Pojok) => {
    const baru = tutupPojok(k, p);
    speakGuru(baru.tutup ? "Satu pojok ditutup. Berapa bilangannya?" : "Pojok dibuka lagi.");
    setK(baru);
  };
  const tebak = (n: number) => {
    const r = tebakPojok(k, n);
    speakGuru(r.benar ? `Betul, ${kata(n)}!` : "Belum tepat. Pakai kebalikannya.");
    setK(r.k);
  };
  const pojok = (p: Pojok, x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={20} fill={k.tutup === p ? "#94A3B8" : p === "z" ? "#FEF08A" : p === "x" ? "#DBEAFE" : "#FEE2E2"} stroke="#7C3AED" strokeWidth={2.6} />
      <text x={x} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill={k.tutup === p ? "#FFFFFF" : "#1C01A5"}>
        {k.tutup === p ? "?" : nilaiPojok(k, p)}
      </text>
    </g>
  );
  const stepper = (b: "x" | "y", nama: string, warna: string) => (
    <div className="flex items-center justify-center gap-2">
      <button type="button" onClick={() => ubah(b, -1)} aria-label={`${nama} lebih sedikit`} className="min-h-[44px] min-w-[44px] rounded-full border-4 bg-white text-lg font-black" style={{ borderColor: warna, color: warna }}>
        {"◀"}
      </button>
      <span className="min-w-[6rem] rounded-full px-3 py-1 text-center text-sm font-black text-white" style={{ background: warna }}>
        {nama} {k[b]}
      </span>
      <button type="button" onClick={() => ubah(b, 1)} aria-label={`${nama} lebih banyak`} className="min-h-[44px] min-w-[44px] rounded-full border-4 bg-white text-lg font-black" style={{ borderColor: warna, color: warna }}>
        {"▶"}
      </button>
    </div>
  );
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Papan kondektur. Atur penumpang biru dan merah, catat empat kalimatnya, lalu tutup satu pojok segitiga dan tebak.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {stepper("x", "Biru", "#1D4ED8")}
        {stepper("y", "Merah", "#B91C1C")}
      </div>

      <div className="rounded-[1.6rem] border-4 border-[#4338CA] bg-[#EEF2FF] p-2">
        <p className="text-center text-xs font-black text-[#312E81]">Gerbong: semuanya {z}</p>
        <div className="mt-1 flex min-h-[48px] flex-wrap justify-center gap-1">
          {Array.from({ length: z }, (_, i) => (
            <span key={i} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xl ${i < k.x ? "border-[#1D4ED8] bg-[#BFDBFE]" : "border-[#B91C1C] bg-[#FECACA]"}`} aria-hidden="true">
              {EMOJI.penumpang}
            </span>
          ))}
          {z === 0 ? <span className="self-center text-xs font-bold text-[#312E81]/70">gerbong kosong</span> : null}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_12rem]">
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          <p className="text-center text-xs font-black text-[#1C01A5]">Empat kalimat satu keluarga</p>
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            {empatKalimat(k).map((t, i) => (
              <button key={t + i} type="button" onClick={() => catat(i as 0 | 1 | 2 | 3)} className={`min-h-[44px] rounded-xl border-2 px-2 text-lg font-black ${i < 2 ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#B91C1C] bg-[#FEF2F2] text-[#7F1D1D]"}`}>
                {tulis(t)} {"\u{1F4DD}"}
              </button>
            ))}
          </div>
          <p className="mt-1 text-center text-[11px] font-bold text-[#1C01A5]/70">Ketuk kalimat untuk mencatat.</p>
        </div>
        <div className="rounded-2xl border-4 border-[#7C3AED] bg-[#F5F3FF] p-2">
          <p className="text-center text-xs font-black text-[#5B21B6]">Segitiga fakta</p>
          <svg viewBox="0 0 160 120" className="mx-auto block w-full max-w-[180px]" aria-label="Segitiga fakta">
            <polygon points="80,26 30,96 130,96" fill="none" stroke="#7C3AED" strokeWidth={3} />
            {pojok("z", 80, 26)}
            {pojok("x", 30, 96)}
            {pojok("y", 130, 96)}
          </svg>
          <div className="flex justify-center gap-1">
            {(["z", "x", "y"] as Pojok[]).map((p) => (
              <button key={p} type="button" onClick={() => tutup(p)} aria-pressed={k.tutup === p} className={`min-h-[40px] rounded-full border-2 px-2 text-xs font-black ${k.tutup === p ? "border-[#5B21B6] bg-[#5B21B6] text-white" : "border-[#5B21B6] bg-white text-[#5B21B6]"}`}>
                Tutup {p === "z" ? "pucuk" : p === "x" ? "biru" : "merah"}
              </button>
            ))}
          </div>
          {k.tutup ? (
            <div className="mt-1 flex flex-wrap justify-center gap-1" role="group" aria-label="Tebak bilangan tertutup">
              {Array.from({ length: 11 }, (_, n) => (
                <button key={n} type="button" onClick={() => tebak(n)} className="h-9 w-9 rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black text-[#1C01A5]">
                  {n}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] bg-[#FFFBEB] p-2">
        <p className="text-center text-sm font-black text-[#78350F]">{"\u{1F9D1}"} Catatan kondektur</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat.length === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Belum ada.</span> : null}
          {k.catat.map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">
              {tulis(p)}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {`Keluarga ${kata(k.x)}, ${kata(k.y)}, dan ${kata(z)}.`}
      </p>
    </div>
  );
}
