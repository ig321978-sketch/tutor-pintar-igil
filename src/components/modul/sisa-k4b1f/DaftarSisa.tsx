"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  JUDUL_INFO1_SISA,
  LOMPAT_SISA,
  MENGINAP_SISA,
  NAMA_LOMPAT_SISA,
  PETUNJUK1_INFO_SISA,
  PETUNJUK2_INFO_SISA,
  PULANG_SISA,
  SELESAI1_INFO_SISA,
  SELESAI2_INFO_SISA,
  SEL_KARTU1_SISA,
  SEL_KARTU2_SISA,
  TEMPAT_SISA,
  TITIK_LOMPAT_SISA,
  type SelSisa,
} from "./data-peta";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story (612 dikurangi 275).
 * Kartu 1 = tiga papan gantung (ratusan, puluhan, satuan; nomor urut mengurangkan 3, 2, 1 dari kanan) berisi angka atas setelah diambil dan hasil tiap tempat,
 * lalu sisa tamu, cek tambah, dan hasil keliru Satria. Kartu 2 = kartu acuan Hitung Maju: garis lompat dari 275 ke 612 lewat 300 dan 600, tiga lompatan dan jumlahnya.
 * Semua isi kosong (?) sampai diketuk. Tombol BERIKUTNYA hanya setelah semua kotak kartu 1 terbuka. Digital saja.
 */
const sel = (daftar: SelSisa[], kunci: string): SelSisa => daftar.find((s) => s.kunci === kunci) as SelSisa;

/** Garis lompat: empat tiang, tiga busur bernomor; hanya bilangan awal dan akhir yang tampak. Teks 12 sampai 14 satuan pada lebar 300. */
function GarisLompat() {
  const x = [30, 110, 190, 270];
  return (
    <svg viewBox="0 0 300 92" className="block w-full" role="img" aria-label={`Garis lompat dari ${TITIK_LOMPAT_SISA[0]} ke ${TITIK_LOMPAT_SISA[3]} dengan tiga lompatan`} data-lompat={3}>
      <path d="M12,58 L288,58" stroke="#78350F" strokeWidth={4} strokeLinecap="round" />
      {x.map((px, k) => (
        <g key={px}>
          <rect x={px - 4} y={48} width={8} height={22} rx={2} fill="#92400E" />
          {k === 0 || k === 3 ? (
            <text x={px} y={87} textAnchor="middle" fontSize={14} fontWeight={900} fill="#0F766E">
              {TITIK_LOMPAT_SISA[k]}
            </text>
          ) : null}
        </g>
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M${x[k] + 6},48 Q${(x[k] + x[k + 1]) / 2},4 ${x[k + 1] - 6},48`} stroke="#0F766E" strokeWidth={3} fill="none" strokeLinecap="round" />
          <circle cx={(x[k] + x[k + 1]) / 2} cy={22} r={10} fill="#0F766E" />
          <text x={(x[k] + x[k + 1]) / 2} y={27} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFFFFF">
            {k + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function DaftarSisaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = SEL_KARTU1_SISA.length;
  const total2 = SEL_KARTU2_SISA.length;
  const buka1 = buka.filter((k) => !k.startsWith("l-")).length;
  const buka2 = buka.filter((k) => k.startsWith("l-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_SISA : PETUNJUK2_INFO_SISA;

  const kotak = (s: SelSisa, merah = false) => {
    const t = buka.includes(s.kunci);
    return (
      <button
        key={s.kunci}
        type="button"
        onClick={() => ketuk(s.kunci, s.suara)}
        aria-label={t ? s.aria : `Isi kosong: ${s.aria.split(":")[0]}`}
        data-sel={s.kunci}
        className={`flex min-h-[34px] w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-1 text-center text-xs font-black leading-tight ${t ? `lm-muncul ${merah ? "border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D]" : "border-[#0F766E] bg-[#F0FDFA] text-[#1C01A5]"}` : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? s.isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-sisa">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0F766E] bg-[#F0FDFA] p-2 shadow-[0_5px_0_rgba(15,118,110,0.4)]" data-uji="papan-gantung">
          <p className="mx-auto mb-1.5 w-fit rounded-md border-2 border-[#0F766E] bg-white px-3 py-0.5 text-center text-sm font-black text-[#115E59]">
            {JUDUL_INFO1_SISA}: {MENGINAP_SISA} − {PULANG_SISA}
          </p>
          <div className="mx-4 h-2 rounded-full bg-[#92400E]" aria-hidden="true" />
          <div className="grid grid-cols-3 gap-1.5">
            {TEMPAT_SISA.map((t, i) => (
              <div key={t.nama} className="flex flex-col items-stretch">
                <span aria-hidden="true" className="mx-auto h-2.5 w-0.5 bg-[#92400E]" />
                <div className="space-y-1 rounded-lg border-2 border-[#0F766E] bg-white p-1">
                  <p className="flex items-center justify-center gap-1 text-[12px] font-black leading-none text-[#115E59]">
                    <span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-[10px] text-white">
                      {t.urut}
                    </span>
                    {t.nama}
                  </p>
                  <p className="text-center text-[11px] font-bold leading-none text-[#475569]">angka atas</p>
                  {kotak(sel(SEL_KARTU1_SISA, `p-${i}-pinjam`))}
                  <p className="text-center text-[11px] font-bold leading-none text-[#475569]">hasil</p>
                  {kotak(sel(SEL_KARTU1_SISA, `p-${i}-hasil`))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1 text-center text-[11px] font-bold text-[#115E59]">{"⬅️"} urutan 1, 2, 3: mengurangkan dari kanan ke kiri</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 border-t-2 border-dashed border-[#5EEAD4] pt-1.5">
            {[
              ["b-sisa", "Sisa tamu"],
              ["b-cek", `Sisa + ${PULANG_SISA} =`],
              ["b-salah", "Hasil Satria"],
            ].map(([k, label]) => (
              <div key={k} className="space-y-1">
                <p className={`text-center text-[12px] font-black leading-tight ${k === "b-salah" ? "text-[#B91C1C]" : "text-[#115E59]"}`}>{label}</p>
                {kotak(sel(SEL_KARTU1_SISA, k), k === "b-salah")}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-[#F0F9FF] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="kartu-lompat">
          <p className="mb-0.5 text-center text-sm font-black text-[#0C4A6E]">
            Hitung maju dari {TITIK_LOMPAT_SISA[0]} sampai {TITIK_LOMPAT_SISA[3]}
          </p>
          <div className="mx-auto w-full max-w-[300px]">
            <GarisLompat />
          </div>
          <div className="mt-1 space-y-1">
            {LOMPAT_SISA.map((_, i) => (
              <div key={NAMA_LOMPAT_SISA[i]} className="grid grid-cols-[1.6rem_6rem_minmax(0,1fr)] items-center gap-1.5 rounded-lg bg-white/80 p-1">
                <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F766E] text-xs font-black text-white">
                  {i + 1}
                </span>
                <span className="text-[12px] font-black leading-tight text-[#0C4A6E]">{NAMA_LOMPAT_SISA[i]}</span>
                {kotak(sel(SEL_KARTU2_SISA, `l-${i}`))}
              </div>
            ))}
            <div className="grid grid-cols-[1.6rem_6rem_minmax(0,1fr)] items-center gap-1.5 rounded-lg bg-[#E0F2FE] p-1">
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0369A1] text-xs font-black text-white">
                ∑
              </span>
              <span className="text-[12px] font-black leading-tight text-[#0C4A6E]">Jumlah lompatan</span>
              {kotak(sel(SEL_KARTU2_SISA, "l-jumlah"))}
            </div>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_SISA : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_SISA : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan sisa">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
export { DaftarSisaK4B1 };
