"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { KURANG, URUT_BEKAL, ambilSatu, awalBekal, catatKalimat, kalimatBekal, kata, pilihBekal, sisaBekal, type Bekal, type KeadaanBekal } from "./logika";
import { EMOJI, MULA_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 3 Sub-Bab A: Misi Perjalanan bagian satu, kotak bekal. Eksplorasi bebas tanpa skor: pilih roti, jeruk,
 * atau pisang, ketuk isi kotak bersekat untuk mengambil satu dari belakang (ketuk bekal di tangan untuk mengembalikannya),
 * lihat sekat kosong, hitung mundur, dan kalimat pengurangan berubah bersama, lalu catat kalimatnya.
 * Bilangan berbeda dari Story: roti enam, jeruk sembilan, pisang empat.
 */
const NAMA: Record<Bekal, string> = { roti: "Roti", jeruk: "Jeruk", pisang: "Pisang" };

export default function SimulasiKotakBekal({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBekal) => void }) {
  const [k, setK] = useState<KeadaanBekal>(() => awalBekal(MULA_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const s = k.bekal;
  const e = EMOJI[s];
  const mula = k.mula[s];
  const ambil = k.ambil[s];
  const sisa = sisaBekal(k);
  const ubah = (d: 1 | -1) => {
    const baru = ambilSatu(k, d);
    if (baru === k) speakGuru(d === 1 ? "Kotaknya sudah kosong. Sisanya nol." : "Belum ada yang diambil.");
    else speakGuru(d === 1 ? `Sisa ${kata(sisaBekal(baru))}.` : `Dikembalikan. Sisa ${kata(sisaBekal(baru))}.`);
    setK(baru);
  };
  const catat = () => {
    const baru = catatKalimat(k);
    speakGuru(baru === k ? "Kalimat ini sudah dicatat. Coba ambil lagi atau kembalikan." : kalimatBekal(k));
    setK(baru);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Kotak bekal. Pilih bekal, ketuk isi kotak untuk mengambil satu, lalu tekan <b>Catat kalimat</b>.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bekal">
        {URUT_BEKAL.map((x) => (
          <button key={x} type="button" aria-pressed={s === x} onClick={() => setK(pilihBekal(k, x))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${s === x ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#1D4ED8] bg-white text-[#1D4ED8]"}`}>
            {EMOJI[x]} {NAMA[x]}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_9rem]">
        {/* Kotak bekal bersekat sepuluh */}
        <div className="rounded-2xl border-4 border-[#5B21B6] bg-[#C4B5FD] p-2">
          <p className="text-center text-sm font-black text-[#3B0764]">
            Kotak {NAMA[s].toLowerCase()} (sepuluh sekat), mula-mula {mula}
          </p>
          <div className="mx-auto mt-1 grid max-w-[260px] grid-cols-5 gap-1">
            {Array.from({ length: 10 }, (_, i) => {
              const isi = i < sisa;
              const baruKosong = !isi && i < mula;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!isi}
                  onClick={() => ubah(1)}
                  aria-label={isi ? `Sekat ${i + 1}: ${NAMA[s].toLowerCase()}, ketuk untuk mengambil` : baruKosong ? `Sekat ${i + 1}: sudah diambil` : `Sekat ${i + 1} kosong`}
                  className={`flex aspect-square items-center justify-center rounded-lg border-2 text-2xl ${isi ? "border-[#1D4ED8] bg-[#F5F3FF]" : baruKosong ? "border-dashed border-[#DC2626] bg-[#FEE2E2]" : "border-[#7C3AED]/40 bg-[#EDE9FE]/60"}`}
                >
                  {isi ? e : ""}
                </button>
              );
            })}
          </div>
        </div>
        {/* Bekal di tangan (yang diambil) */}
        <div className="rounded-2xl border-4 border-[#DC2626] bg-[#FEF2F2] p-2">
          <p className="text-center text-xs font-black text-[#991B1B]">{"\u{270B}"} Diambil: {ambil}</p>
          <div className="mt-1 flex min-h-[48px] flex-wrap justify-center gap-0.5">
            {ambil === 0 ? <span className="self-center text-xs font-bold text-[#991B1B]/70">belum ada, nol</span> : null}
            {Array.from({ length: ambil }, (_, j) => (
              <button key={j} type="button" onClick={() => ubah(-1)} aria-label={`Kembalikan satu ${NAMA[s].toLowerCase()}`} className="text-2xl leading-none">
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Perwakilan terhubung: hitung mundur dan kalimat */}
      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <div className="flex flex-wrap items-center justify-center gap-1 text-sm font-black" aria-label="Hitung mundur">
          <span className="rounded-lg bg-[#DBEAFE] px-2 py-0.5 text-[#1D4ED8]">{mula}</span>
          {Array.from({ length: ambil }, (_, i) => (
            <React.Fragment key={i}>
              <span className="text-[#DC2626]">{"\u{2190}"}</span>
              <span className="rounded-lg bg-[#FEE2E2] px-2 py-0.5 text-[#B91C1C]">{mula - i - 1}</span>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-1 text-center text-3xl font-black text-[#1C01A5]" aria-label="Kalimat pengurangan">
          <span className="text-[#1D4ED8]">{mula}</span> <span className="text-[#DC2626]">{KURANG}</span> <span className="text-[#B91C1C]">{ambil}</span> <span className="text-[#DC2626]">=</span> {sisa}
        </p>
        <div className="mt-1 flex justify-center">
          <button type="button" onClick={catat} className="min-h-[48px] rounded-full border-4 border-[#1D4ED8] bg-[#DBEAFE] px-4 text-sm font-black text-[#1E3A8A]">
            {"\u{1F4DD}"} Catat kalimat
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-dashed border-[#C2410C] bg-[#FFFBEB] p-2">
        <p className="text-center text-sm font-black text-[#7C2D12]">{"\u{1F3AB}"} Catatan perjalanan: {NAMA[s].toLowerCase()}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat[s].length === 0 ? <span className="text-xs font-bold text-[#7C2D12]/60">Belum ada.</span> : null}
          {k.catat[s].map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">
              {p.replace("-", ` ${KURANG} `).replace("=", " = ")}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatBekal(k)}
      </p>
    </div>
  );
}
