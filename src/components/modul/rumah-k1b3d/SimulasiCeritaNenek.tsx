"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { KATA_SIM, KURANG, NAMA_BENDA, URUT_BENDA_SIM, awalCerita, bacaSim, ceritaSim, jawabLengkap, kata, kirimCerita, periksaCerita, pilihBenda, pilihKata, sisaCerita, ubahCerita, type KeadaanCerita } from "./logika";
import { AWAL_SIM, EMOJI } from "./data";

/**
 * Simulasi Kelas 1 Bab 3 Sub-Bab D: Misi Rumah Nenek bagian satu, pembuat cerita hitungan. Eksplorasi bebas tanpa skor: pilih benda,
 * kata kunci, banyak mula-mula, dan yang berkurang; cerita, model batang, kalimat pengurangan, dan jawaban lengkap berubah bersama.
 * Periksa dengan penjumlahan, lalu kirim ceritanya ke Nenek. Bilangan awal berbeda dari Story: tujuh, tiga dimakan.
 */
export default function SimulasiCeritaNenek({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCerita) => void }) {
  const [k, setK] = useState<KeadaanCerita>(() => awalCerita(AWAL_SIM.a, AWAL_SIM.b));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const sisa = sisaCerita(k);
  const ubah = (apa: "a" | "b", d: 1 | -1) => {
    const baru = ubahCerita(k, apa, d);
    speakGuru(baru === k ? (apa === "a" ? "Mula-mula satu sampai sepuluh." : "Yang berkurang tidak lebih dari mula-mula.") : `${kata(baru.a)}, berkurang ${kata(baru.b)}.`);
    setK(baru);
  };
  const periksa = () => {
    speakGuru(`${kata(sisa)} ditambah ${kata(k.b)} sama dengan ${kata(k.a)}. Cocok!`);
    setK(periksaCerita(k));
  };
  const kirim = () => {
    const baru = kirimCerita(k);
    speakGuru(baru === k ? "Cerita ini sudah dikirim. Buat cerita lain." : `Terkirim ke Nenek. ${bacaSim(k)}`);
    setK(baru);
  };
  const stepper = (apa: "a" | "b", nama: string) => (
    <div className="flex items-center justify-center gap-2">
      <button type="button" onClick={() => ubah(apa, -1)} aria-label={`${nama} lebih sedikit`} className="min-h-[44px] min-w-[44px] rounded-full border-4 border-[#B45309] bg-white text-lg font-black text-[#B45309]">
        {"◀"}
      </button>
      <span className="min-w-[7.5rem] rounded-full bg-[#B45309] px-3 py-1 text-center text-sm font-black text-white">
        {nama} {k[apa]}
      </span>
      <button type="button" onClick={() => ubah(apa, 1)} aria-label={`${nama} lebih banyak`} className="min-h-[44px] min-w-[44px] rounded-full border-4 border-[#B45309] bg-white text-lg font-black text-[#B45309]">
        {"▶"}
      </button>
    </div>
  );
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Pembuat cerita untuk Nenek. Pilih benda dan kata kunci, atur bilangannya, periksa, lalu tekan <b>Kirim ke Nenek</b>.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih benda">
        {URUT_BENDA_SIM.map((b) => (
          <button key={b} type="button" aria-pressed={k.benda === b} onClick={() => setK(pilihBenda(k, b))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.benda === b ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`}>
            {EMOJI[b]} {NAMA_BENDA[b]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih kata kunci">
        {KATA_SIM.map((w) => (
          <button key={w} type="button" aria-pressed={k.kata === w} onClick={() => setK(pilihKata(k, w))} className={`min-h-[40px] rounded-md border-2 px-2 text-sm font-black ${k.kata === w ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D] ring-2 ring-[#15803D]" : "border-[#15803D] bg-white text-[#15803D]"}`}>
            {w}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {stepper("a", "Mula-mula")}
        {stepper("b", "Berkurang")}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {/* Kartu cerita */}
        <div className="rounded-xl border-2 border-[#B45309] bg-[#FFFBEB] p-2 text-center font-black text-[#1C01A5]" aria-label="Cerita">
          {ceritaSim(k).map((b, i) => (
            <p key={i} className={i === 2 ? "text-[#DC2626]" : ""}>
              {b}
            </p>
          ))}
          <div className="mt-1 flex flex-wrap justify-center gap-0.5 text-xl" aria-hidden="true">
            {Array.from({ length: k.a }, (_, i) => (
              <span key={i} className={i >= sisa ? "opacity-25" : ""}>
                {EMOJI[k.benda]}
              </span>
            ))}
          </div>
        </div>
        {/* Model batang dan kalimat */}
        <div className="rounded-xl border-2 border-[#1C01A5] bg-white p-2">
          <p className="text-center text-xs font-black text-[#1C01A5]">Model batang</p>
          <div className="mt-1 flex h-7 overflow-hidden rounded border-2 border-[#1C01A5] text-sm font-black">
            <span className="flex items-center justify-center bg-[#BFDBFE] text-[#1C01A5]" style={{ flex: Math.max(sisa, 0.0001) }}>
              {sisa > 0 ? sisa : ""}
            </span>
            <span className="flex items-center justify-center bg-[#FECACA] text-[#991B1B]" style={{ flex: Math.max(k.b, 0.0001) }}>
              {k.b > 0 ? k.b : ""}
            </span>
          </div>
          <p className="mt-1 text-center text-xs font-bold text-[#1C01A5]/70">semuanya {k.a}</p>
          <p className="mt-1 text-center text-2xl font-black text-[#1C01A5]" aria-label="Kalimat pengurangan">
            {k.a} <span className="text-[#DC2626]">{KURANG}</span> {k.b} <span className="text-[#DC2626]">=</span> {sisa}
          </p>
          <p className="text-center text-sm font-black text-[#15803D]">{jawabLengkap(k)}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={periksa} className="min-h-[48px] rounded-full border-4 border-[#15803D] bg-[#DCFCE7] px-4 text-sm font-black text-[#14532D]">
          {"\u{2705}"} Periksa dengan penjumlahan
        </button>
        <button type="button" onClick={kirim} className="min-h-[48px] rounded-full border-4 border-[#B91C1C] bg-[#FEE2E2] px-4 text-sm font-black text-[#7F1D1D]">
          {"\u{1F4E8}"} Kirim ke Nenek
        </button>
      </div>
      {k.dicek ? (
        <p className="text-center text-lg font-black text-[#15803D]">
          {sisa} + {k.b} = {k.a} {"\u{2714}\u{FE0F}"}
        </p>
      ) : null}

      <div className="rounded-2xl border-4 border-[#78350F] bg-[#FFFBEB] p-2">
        <p className="text-center text-sm font-black text-[#78350F]">{"\u{1F475}"} Cerita yang sudah sampai ke Nenek</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.kirim.length === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Belum ada.</span> : null}
          {k.kirim.map((t) => {
            const [benda, w, kal] = t.split(":");
            return (
              <span key={t} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">
                {EMOJI[benda]} {w}: {kal.replace("-", ` ${KURANG} `).replace("=", " = ")}
              </span>
            );
          })}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {ceritaSim(k).join(" ")}
      </p>
    </div>
  );
}
