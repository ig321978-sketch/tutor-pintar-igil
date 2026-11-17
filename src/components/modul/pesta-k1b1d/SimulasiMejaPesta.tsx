"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { URUT_BARANG, awalPesta, catatPasangan, kalimatPesta, kata, pasanganUnik, pilihBarang, pindah, semuaPasangan, teras, type Barang, type KeadaanPesta } from "./logika";
import { EMOJI, UTUH_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 1 Sub-Bab D: Misi Pesta bagian satu, meja pesta. Eksplorasi bebas tanpa skor: pilih kue, gelas, atau kursi,
 * pindahkan satu per satu antara meja dalam dan meja teras, lihat ikatan bilangannya, lalu catat setiap pasangan yang ditemukan.
 * Banyak berbeda dari Story: kue enam, gelas delapan, kursi sembilan.
 */
const NAMA: Record<Barang, string> = { kue: "Kue", gelas: "Gelas", kursi: "Kursi" };

export default function SimulasiMejaPesta({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPesta) => void }) {
  const [k, setK] = useState<KeadaanPesta>(() => awalPesta(UTUH_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const b = k.barang;
  const geser = (d: 1 | -1) => {
    const baru = pindah(k, d);
    if (baru === k) speakGuru(d === 1 ? "Meja dalam sudah kosong, nol." : "Meja teras sudah kosong, nol.");
    setK(baru);
  };
  const catat = () => {
    const baru = catatPasangan(k);
    speakGuru(baru === k ? "Pasangan ini sudah dicatat. Coba geser lagi." : `${kapital(kata(k.dalam[b]))} dan ${kata(teras(k))}. Utuhnya ${kata(k.utuh[b])}.`);
    setK(baru);
  };
  const isiMeja = (n: number, sisi: "dalam" | "teras") => (
    <div className="flex min-h-[48px] flex-wrap justify-center gap-0.5">
      {n === 0 ? <span className="self-center text-xs font-bold text-[#78350F]/70">kosong, nol</span> : null}
      {Array.from({ length: n }, (_, i) => (
        <button key={i} type="button" onClick={() => geser(sisi === "dalam" ? 1 : -1)} aria-label={`Pindahkan satu ${NAMA[b].toLowerCase()} ke meja ${sisi === "dalam" ? "teras" : "dalam"}`} className="text-2xl leading-none">
          {EMOJI[b]}
        </button>
      ))}
    </div>
  );
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Meja pesta. Pilih benda, ketuk benda untuk memindahkannya ke meja lain, lalu tekan <b>Catat pasangan</b>.
      </p>
      <div className="flex justify-center gap-1.5" role="group" aria-label="Pilih benda">
        {URUT_BARANG.map((x) => (
          <button key={x} type="button" aria-pressed={b === x} onClick={() => setK(pilihBarang(k, x))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${b === x ? "border-[#BE185D] bg-[#BE185D] text-white" : "border-[#BE185D] bg-white text-[#BE185D]"}`}>
            {EMOJI[x]} {NAMA[x]} {k.utuh[x]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(["dalam", "teras"] as const).map((sisi) => {
          const n = sisi === "dalam" ? k.dalam[b] : teras(k);
          return (
            <div key={sisi} className="rounded-2xl border-4 border-[#92400E] bg-[#FDE7C8] p-2">
              <p className="text-center text-sm font-black text-[#92400E]">
                Meja {sisi}: <span className="text-[#DC2626]">{n}</span>
              </p>
              {isiMeja(n, sisi)}
              <div className="mx-auto mt-1 h-2 w-4/5 rounded bg-[#B45309]" />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        <svg viewBox="0 0 160 100" className="w-40" aria-label={`Ikatan ${k.utuh[b]}, ${k.dalam[b]} dan ${teras(k)}`}>
          <line x1={80} y1={30} x2={36} y2={74} stroke="#1C01A5" strokeWidth={2} />
          <line x1={80} y1={30} x2={124} y2={74} stroke="#1C01A5" strokeWidth={2} />
          {[
            [80, 24, k.utuh[b], "#FFE566"],
            [36, 76, k.dalam[b], "#DBEAFE"],
            [124, 76, teras(k), "#FCE7F3"],
          ].map(([x, y, v, w], i) => (
            <g key={i}>
              <circle cx={x as number} cy={y as number} r={18} fill={w as string} stroke="#1C01A5" strokeWidth={2} />
              <text x={x as number} y={(y as number) + 6} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">
                {v as number}
              </text>
            </g>
          ))}
        </svg>
        <button type="button" onClick={catat} className="min-h-[48px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-4 text-sm font-black text-[#15803D]">
          {"\u{1F4DD}"} Catat pasangan
        </button>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Catatan pasangan {NAMA[b].toLowerCase()} ({pasanganUnik(k, b)} dari {semuaPasangan(k.utuh[b])} pasangan)
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat[b].length === 0 ? <span className="text-xs font-bold text-[#1C01A5]/60">Belum ada.</span> : null}
          {k.catat[b].map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-[#FFF7CC] px-2 text-sm font-black text-[#1C01A5]">
              {p.replace("-", " dan ")}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatPesta(k)}
      </p>
    </div>
  );
}
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
