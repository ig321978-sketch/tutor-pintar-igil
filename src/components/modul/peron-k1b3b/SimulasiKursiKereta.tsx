"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { KURANG, awalKursi, bacaKursi, catatKursi, duaKalimat, kata, ketukKursi, kosongKursi, ubahUtuh, type KeadaanKursi } from "./logika";
import { AWAL_SIM, EMOJI } from "./data";

/**
 * Simulasi Kelas 1 Bab 3 Sub-Bab B: Misi Pindah Kereta bagian satu, kursi kereta lanjutan. Eksplorasi bebas tanpa skor: atur banyak
 * kursi di satu baris (satu sampai sepuluh), ketuk kursi untuk mengisi dari kiri, lalu lihat bagan pasangan, garis bilangan mundur,
 * dan dua kalimat pengurangan berubah bersama; catat kalimat yang dipilih. Bilangan awal berbeda dari Story: lima kursi, dua terisi.
 */
const tulis = (t: string) => t.replace("-", ` ${KURANG} `).replace("=", " = ");

export default function SimulasiKursiKereta({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKursi) => void }) {
  const [k, setK] = useState<KeadaanKursi>(() => awalKursi(AWAL_SIM.utuh, AWAL_SIM.terisi));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const kosong = kosongKursi(k);
  const [k1, k2] = duaKalimat(k);
  const ubah = (d: 1 | -1) => {
    const baru = ubahUtuh(k, d);
    speakGuru(baru === k ? (d === 1 ? "Paling banyak sepuluh kursi." : "Paling sedikit satu kursi.") : `${kata(baru.utuh)} kursi.`);
    setK(baru);
  };
  const ketuk = (i: number) => {
    const baru = ketukKursi(k, i);
    speakGuru(`Terisi ${kata(baru.terisi)}, kosong ${kata(kosongKursi(baru))}.`);
    setK(baru);
  };
  const catat = (ke: 0 | 1) => {
    const baru = catatKursi(k, ke);
    speakGuru(baru === k ? "Kalimat ini sudah dicatat." : `${bacaKursi(k, ke)}.`);
    setK(baru);
  };
  const xg = (n: number) => 16 + n * 26.8;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Kursi kereta lanjutan. Atur banyak kursi, ketuk kursi untuk mengisi, lalu catat kalimatnya.
      </p>
      <div className="flex items-center justify-center gap-2" role="group" aria-label="Banyak kursi">
        <button type="button" onClick={() => ubah(-1)} className="min-h-[44px] min-w-[44px] rounded-full border-4 border-[#4338CA] bg-white text-xl font-black text-[#4338CA]" aria-label="Satu kursi lebih sedikit">
          {"◀"}
        </button>
        <span className="rounded-full bg-[#4338CA] px-4 py-1 text-sm font-black text-white">{k.utuh} kursi</span>
        <button type="button" onClick={() => ubah(1)} className="min-h-[44px] min-w-[44px] rounded-full border-4 border-[#4338CA] bg-white text-xl font-black text-[#4338CA]" aria-label="Satu kursi lebih banyak">
          {"▶"}
        </button>
      </div>

      {/* Baris kursi */}
      <div className="rounded-[1.6rem] border-4 border-[#1D4ED8] bg-[#DBEAFE] p-2">
        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: k.utuh }, (_, i) => {
            const isi = i < k.terisi;
            return (
              <button
                key={i}
                type="button"
                onClick={() => ketuk(i)}
                aria-label={`Kursi ${i + 1} ${isi ? "terisi" : "kosong"}`}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 text-2xl ${isi ? "border-[#1D4ED8] bg-white" : "border-dashed border-[#047857] bg-[#ECFDF5]"}`}
              >
                {isi ? EMOJI.penumpang : EMOJI.kursi}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {/* Bagan pasangan */}
        <div className="rounded-2xl border-4 border-[#A16207] bg-[#FEF9C3] p-2" aria-label="Bagan pasangan">
          <p className="text-center text-xs font-black text-[#713F12]">Bagan pasangan</p>
          <svg viewBox="0 0 160 96" className="mx-auto block w-full max-w-[200px]">
            <line x1={80} y1={30} x2={40} y2={66} stroke="#1C01A5" strokeWidth={2} />
            <line x1={80} y1={30} x2={120} y2={66} stroke="#1C01A5" strokeWidth={2} />
            <circle cx={80} cy={22} r={18} fill="#FFE566" stroke="#1C01A5" strokeWidth={2} />
            <circle cx={40} cy={74} r={18} fill="#DBEAFE" stroke="#1C01A5" strokeWidth={2} />
            <circle cx={120} cy={74} r={18} fill="#D1FAE5" stroke="#1C01A5" strokeWidth={2} />
            <text x={80} y={28} textAnchor="middle" fontSize={17} fontWeight={900} fill="#1C01A5">
              {k.utuh}
            </text>
            <text x={40} y={80} textAnchor="middle" fontSize={17} fontWeight={900} fill="#1D4ED8">
              {k.terisi}
            </text>
            <text x={120} y={80} textAnchor="middle" fontSize={17} fontWeight={900} fill="#047857">
              {kosong}
            </text>
          </svg>
          <p className="text-center text-[11px] font-black text-[#713F12]">utuh, terisi, kosong</p>
        </div>
        {/* Garis bilangan mundur */}
        <div className="rounded-2xl border-4 border-[#0F766E] bg-[#F0FDFA] p-2" aria-label="Garis bilangan">
          <p className="text-center text-xs font-black text-[#134E4A]">Lompat mundur {k.terisi} dari {k.utuh}</p>
          <svg viewBox="0 0 300 70" className="mx-auto block w-full">
            <line x1={8} y1={44} x2={292} y2={44} stroke="#1C01A5" strokeWidth={2.4} />
            {Array.from({ length: 11 }, (_, n) => (
              <g key={n}>
                <line x1={xg(n)} y1={38} x2={xg(n)} y2={50} stroke="#1C01A5" strokeWidth={2} />
                <text x={xg(n)} y={66} textAnchor="middle" fontSize={11} fontWeight={900} fill={n === kosong ? "#DC2626" : n === k.utuh ? "#1D4ED8" : "#1C01A5"}>
                  {n}
                </text>
              </g>
            ))}
            {Array.from({ length: k.terisi }, (_, j) => {
              const dari = xg(k.utuh - j);
              const ke = xg(k.utuh - j - 1);
              return <path key={j} d={`M ${dari} 36 Q ${(dari + ke) / 2} 8 ${ke} 36`} fill="none" stroke="#DC2626" strokeWidth={2.2} />;
            })}
          </svg>
        </div>
      </div>

      {/* Dua kalimat dari satu bagan */}
      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="text-center text-xs font-black text-[#1C01A5]">Satu bagan, dua kalimat pengurangan</p>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          {([k1, k2] as const).map((t, ke) => (
            <div key={ke} className="flex flex-col items-center gap-1 rounded-xl bg-[#EEF2FF] p-2">
              <p className="text-2xl font-black text-[#1C01A5]">{tulis(t)}</p>
              <button type="button" onClick={() => catat(ke as 0 | 1)} className="min-h-[44px] rounded-full border-4 border-[#4338CA] bg-[#E0E7FF] px-3 text-sm font-black text-[#312E81]">
                {"\u{1F4DD}"} Catat kalimat {ke + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#57534E] bg-[#F5F5F4] p-2">
        <p className="text-center text-sm font-black text-[#44403C]">{"\u{1F9F3}"} Catatan pindah kereta</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.catat.length === 0 ? <span className="text-xs font-bold text-[#44403C]/60">Belum ada.</span> : null}
          {k.catat.map((p) => (
            <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">
              {tulis(p)}
            </span>
          ))}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {`${kata(k.utuh)} kursi, terisi ${kata(k.terisi)}, kosong ${kata(kosong)}.`}
      </p>
    </div>
  );
}
