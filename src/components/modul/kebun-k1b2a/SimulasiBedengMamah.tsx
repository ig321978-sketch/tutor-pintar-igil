"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { URUT_SAYUR, awalKebun, catatKalimat, kalimatKebun, kata, pilihSayur, semuanya, sisaKeranjang, tanamSatu, type KeadaanKebun, type Sayur } from "./logika";
import { DATANG_SIM, EMOJI, MULA_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 2 Sub-Bab A: Misi Kebun bagian satu, bedeng Mamah. Eksplorasi bebas tanpa skor: pilih timun, kentang,
 * atau bawang, ketuk bibit di keranjang kiriman supaya tertanam di lubang kosong berikutnya (ketuk bibit baru untuk
 * mengembalikannya), lihat bedeng sepuluh lubang, hitungan maju, dan kalimat penjumlahan berubah bersama, lalu catat kalimatnya.
 * Bilangan berbeda dari Story: timun tiga datang empat, kentang lima datang lima, bawang enam dengan keranjang kosong.
 */
const NAMA: Record<Sayur, string> = { timun: "Timun", kentang: "Kentang", bawang: "Bawang" };

export default function SimulasiBedengMamah({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKebun) => void }) {
  const [k, setK] = useState<KeadaanKebun>(() => awalKebun(MULA_SIM, DATANG_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const s = k.sayur;
  const e = EMOJI[s];
  const mula = k.mula[s];
  const tanam = k.tanam[s];
  const total = semuanya(k);
  const ubah = (d: 1 | -1) => {
    const baru = tanamSatu(k, d);
    if (baru === k) speakGuru(d === 1 ? (sisaKeranjang(k) === 0 ? "Keranjangnya kosong, nol." : "Bedeng sudah penuh sepuluh.") : "Bibit lama tidak bisa diambil.");
    else speakGuru(d === 1 ? kata(semuanya(baru)) : `Kembali ke keranjang. ${kata(semuanya(baru))}.`);
    setK(baru);
  };
  const catat = () => {
    const baru = catatKalimat(k);
    speakGuru(baru === k ? "Kalimat ini sudah dicatat. Coba tanam lagi." : kalimatKebun(k));
    setK(baru);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Bedeng Mamah. Pilih sayur, ketuk bibit di keranjang supaya tertanam, lalu tekan <b>Catat kalimat</b>.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih sayur">
        {URUT_SAYUR.map((x) => (
          <button key={x} type="button" aria-pressed={s === x} onClick={() => setK(pilihSayur(k, x))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${s === x ? "border-[#4D7C0F] bg-[#4D7C0F] text-white" : "border-[#4D7C0F] bg-white text-[#4D7C0F]"}`}>
            {EMOJI[x]} {NAMA[x]}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_9rem]">
        {/* Bedeng sepuluh lubang */}
        <div className="rounded-2xl border-4 border-[#78350F] bg-[#D6A15E] p-2">
          <p className="text-center text-sm font-black text-[#3F1D0B]">Bedeng {NAMA[s].toLowerCase()} (sepuluh lubang)</p>
          <div className="mx-auto mt-1 grid max-w-[260px] grid-cols-5 gap-1">
            {Array.from({ length: 10 }, (_, i) => {
              const lama = i < mula;
              const baru = !lama && i < total;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!baru}
                  onClick={() => ubah(-1)}
                  aria-label={lama ? `Lubang ${i + 1}: bibit lama` : baru ? `Lubang ${i + 1}: bibit baru, ketuk untuk kembalikan` : `Lubang ${i + 1} kosong`}
                  className={`flex aspect-square items-center justify-center rounded-full border-2 text-2xl ${lama ? "border-[#1D4ED8] bg-[#F5DEB3]" : baru ? "border-[#DB2777] bg-[#FCE7F3] lm-muncul" : "border-dashed border-[#78350F] bg-[#8B5A2B]/50"}`}
                >
                  {lama || baru ? e : ""}
                </button>
              );
            })}
          </div>
        </div>
        {/* Keranjang kiriman */}
        <div className="rounded-b-[2rem] rounded-t-lg border-4 border-[#A16207] bg-[#FEF3C7] p-2">
          <p className="text-center text-xs font-black text-[#713F12]">
            {EMOJI.keranjang} Keranjang kiriman: {sisaKeranjang(k)}
          </p>
          <div className="mt-1 flex min-h-[48px] flex-wrap justify-center gap-0.5">
            {sisaKeranjang(k) === 0 ? <span className="self-center text-xs font-bold text-[#713F12]/70">kosong, nol</span> : null}
            {Array.from({ length: sisaKeranjang(k) }, (_, j) => (
              <button key={j} type="button" onClick={() => ubah(1)} aria-label={`Tanam satu bibit ${NAMA[s].toLowerCase()}`} className="text-2xl leading-none">
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Perwakilan terhubung: hitung maju dan kalimat */}
      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <div className="flex flex-wrap items-center justify-center gap-1 text-sm font-black" aria-label="Hitung maju">
          <span className="rounded-lg bg-[#DBEAFE] px-2 py-0.5 text-[#1D4ED8]">{mula}</span>
          {Array.from({ length: tanam }, (_, i) => (
            <React.Fragment key={i}>
              <span className="text-[#16A34A]">{"\u{2192}"}</span>
              <span className="rounded-lg bg-[#FCE7F3] px-2 py-0.5 text-[#BE185D]">{mula + i + 1}</span>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-1 text-center text-3xl font-black text-[#1C01A5]" aria-label="Kalimat penjumlahan">
          <span className="text-[#1D4ED8]">{mula}</span> <span className="text-[#DC2626]">+</span> <span className="text-[#BE185D]">{tanam}</span> <span className="text-[#DC2626]">=</span> {total}
        </p>
        <div className="mt-1 flex justify-center">
          <button type="button" onClick={catat} className="min-h-[48px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-4 text-sm font-black text-[#15803D]">
            {"\u{1F4DD}"} Catat kalimat
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#4D7C0F] bg-[#F7FEE7] p-2">
        <p className="text-center text-sm font-black text-[#365314]">Catatan kalimat {NAMA[s].toLowerCase()}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat[s].length === 0 ? <span className="text-xs font-bold text-[#365314]/60">Belum ada.</span> : null}
          {k.catat[s].map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-[#FFF7CC] px-2 text-sm font-black text-[#1C01A5]">
              {p.replace("+", " + ").replace("=", " = ")}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKebun(k)}
      </p>
    </div>
  );
}
