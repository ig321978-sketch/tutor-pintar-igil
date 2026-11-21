"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { PENUMPANG_PERAHU, PETUNJUK1_INFO_PERAHU, PETUNJUK2_INFO_PERAHU, SELESAI1_INFO_PERAHU, SELESAI2_INFO_PERAHU, SUSUN_PERAHU, type BarisPenumpang } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab G (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = papan penumpang Bu Marni: tiga lajur perahu (12 x 5, 11 x 5, 14 x 4); titik penumpang digambar sebanyak datanya (sepuluh pertama biru, sisanya oranye),
 * perkalian dan jumlah penumpang kosong sampai diketuk. Kartu 2 = kartu kali susun 12 x 5 di kiri, lima langkahnya (kosong sampai diketuk) di kanan. Digital saja.
 */
function Lajur({ b }: { b: BarisPenumpang }) {
  const slot = 280 / b.perahu;
  const kolom = Math.ceil(b.isi / 2);
  const lebarTitik = Math.min(slot - 12, kolom * 8);
  const jarak = lebarTitik / kolom;
  return (
    <svg viewBox="0 0 280 44" className="h-auto w-full" role="img" aria-label={`${b.perahu} perahu, tiap perahu ${b.isi} penumpang`} data-perahu={b.perahu} data-isi={b.isi}>
      {Array.from({ length: b.perahu }, (_, p) => {
        const x0 = p * slot;
        const mulai = x0 + (slot - lebarTitik) / 2;
        return (
          <g key={p}>
            {Array.from({ length: b.isi }, (_, i) => (
              <circle key={i} cx={mulai + (i % kolom) * jarak + jarak / 2} cy={6 + Math.floor(i / kolom) * 8} r={Math.min(3.2, jarak / 2 - 0.4)} fill={i < 10 ? "#0369A1" : "#EA580C"} data-titik="1" />
            ))}
            <path d={`M${x0 + 3},22 h${slot - 6} l-5,10 h${-(slot - 16)} z`} fill="#92400E" />
          </g>
        );
      })}
      <path d="M0,39 q7,-5 14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0" fill="none" stroke="#0EA5E9" strokeWidth={2} />
    </svg>
  );
}

export default function DaftarPerahuK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = PENUMPANG_PERAHU.length * 2;
  const total2 = SUSUN_PERAHU.length;
  const buka1 = buka.filter((k) => k.startsWith("p-")).length;
  const buka2 = buka.filter((k) => k.startsWith("s-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_PERAHU : PETUNJUK2_INFO_PERAHU;

  const kotak = (kunci: string, suara: string, isi: string, aria: string) => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex min-h-[40px] w-full items-center justify-center rounded-lg border-[3px] px-1 text-center font-black ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-sm text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-perahu">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-[#E0F2FE] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="papan-penumpang">
          <div className="space-y-1.5">
            {PENUMPANG_PERAHU.map((b) => (
              <div key={b.kunci} className="rounded-lg border-2 border-[#BAE6FD] bg-white p-1">
                <p className="text-center text-xs font-black leading-none text-[#0C4A6E]">{b.nama}</p>
                <Lajur b={b} />
                <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-1">
                  {b.sel.flatMap((x, j) => [
                    <p key={`t${j}`} className="text-[11px] font-black leading-none text-[#0369A1]">
                      {x.label}
                    </p>,
                    kotak(`p-${b.kunci}-${j}`, x.suara, x.isi, `${x.label}: ${x.isi}`),
                  ])}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#7C2D12] bg-[#FFEDD5] p-2 shadow-[0_5px_0_rgba(124,45,18,0.4)]" data-uji="kartu-susun">
          <div className="grid grid-cols-[5.2rem_1fr] gap-2">
            <div className="flex flex-col items-end justify-center rounded-lg bg-white p-2 font-black leading-tight text-[#0C4A6E]" role="img" aria-label="12 dikali 5 disusun ke bawah, hasil 60, simpanan 1">
              <span className="self-start text-sm text-[#EA580C]">1</span>
              <span className="text-3xl tracking-widest">12</span>
              <span className="flex w-full justify-between text-3xl">
                <span>×</span>
                <span>5</span>
              </span>
              <span className="my-1 h-1 w-full rounded bg-[#0C4A6E]" />
              <span className="text-3xl text-[#15803D]">60</span>
            </div>
            <div className="space-y-1">
              {SUSUN_PERAHU.map((s) => (
                <div key={s.kunci} className="grid grid-cols-[1fr_7.4rem] items-center gap-1.5">
                  <p className="text-xs font-black leading-tight text-[#7C2D12]">{s.caption}</p>
                  {kotak(`s-${s.kunci}`, s.suara, s.isi, `${s.caption}: ${s.isi}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_PERAHU : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_PERAHU : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan penumpang">
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
export { DaftarPerahuK4B1 };
