"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  PETUNJUK1_INFO_PIRING,
  PETUNJUK2_INFO_PIRING,
  SEL_KARTU1,
  SEL_KARTU2,
  SELESAI1_INFO_PIRING,
  SELESAI2_INFO_PIRING,
  type SelPasangan,
} from "./data-kartu";

/**
 * Infografis Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan pita Bu Wati berdaun pisang: faktor 12 dan 18, tiap pasangan faktor digambar sebagai pita petak yang dipotong sama panjang,
 * lalu daftar faktornya. Kartu 2 = klepon Pak Joko: pasangan faktor 24, satu dan bilangan itu sendiri selalu faktor, dan cek bagi.
 * Sel kosong (?) diketuk, isinya muncul dan dibacakan Guru; kartu berikutnya baru terbuka setelah semua sel terbuka. Digital saja.
 */
const ISI = ["#5EEAD4", "#FDE68A", "#BAE6FD", "#FBCFE8"];
const GARIS = ["#0F766E", "#B45309", "#0369A1", "#BE185D"];

/** Pita mini: `n` petak dipotong tiap `a` petak menjadi `n / a` bagian, digambar sungguh sebanyak bagiannya. */
function PitaMini({ n, a }: { n: number; a: number }) {
  const b = n / a;
  const lebar = 124;
  const w = lebar / b;
  return (
    <svg viewBox={`0 0 ${lebar + 4} 16`} className="block h-[16px] w-[128px] shrink-0" role="img" aria-label={`Pita ${n} petak, ${b} bagian`} data-pita-mini={b}>
      {Array.from({ length: b }, (_, i) => (
        <rect key={i} x={2 + i * w} y={2} width={Math.max(1.5, w - 1)} height={12} rx={1.5} fill={ISI[i % ISI.length]} stroke={GARIS[i % GARIS.length]} strokeWidth={0.9} data-bagian={i} />
      ))}
    </svg>
  );
}

export default function InfoPiring({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const kunci1 = SEL_KARTU1.flatMap((s) => [...s.pasangan.map((p) => p.kunci), s.daftar.kunci]);
  const kunci2 = [...SEL_KARTU2.pasangan.map((p) => p.kunci), SEL_KARTU2.daftar.kunci, ...SEL_KARTU2.selalu.map((s) => s.kunci), ...SEL_KARTU2.cek.map((c) => c.kunci)];
  const buka1 = kunci1.filter((k) => buka.includes(k)).length;
  const buka2 = kunci2.filter((k) => buka.includes(k)).length;
  const selesai1 = buka1 === kunci1.length;
  const selesai2 = buka2 === kunci2.length;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_PIRING : PETUNJUK2_INFO_PIRING;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const sel = (kunci: string, suara: string, isi: React.ReactNode, aria: string, tinggi = "min-h-[36px]") => {
    const terbuka = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={terbuka ? aria : "Isi kosong"}
        className={`flex ${tinggi} w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-1 text-center ${terbuka ? "lm-muncul border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#B45309] bg-white/70 text-lg font-black text-[#B45309]"}`}
      >
        {terbuka ? isi : "?"}
      </button>
    );
  };
  const barisPasangan = (p: SelPasangan) =>
    sel(
      p.kunci,
      p.suara,
      <span className="flex w-full items-center justify-between gap-1">
        <span className="text-[13px] font-black">{p.teks}</span>
        <PitaMini n={p.n} a={p.a} />
      </span>,
      `Pasangan ${p.a} dan ${p.b} untuk ${p.n}`,
    );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[7px] border-[#166534] bg-[#F0FDF4] p-2 shadow-[0_5px_0_rgba(20,83,45,0.3)]" data-uji="papan-pita">
          <p className="mb-1 text-center text-xs font-black tracking-wide text-[#14532D]">PAPAN PITA BU WATI · FAKTOR 12 DAN 18</p>
          {SEL_KARTU1.map((s) => (
            <div key={s.n} className="mb-1.5 space-y-1">
              <p className="rounded-md bg-[#166534] px-2 py-0.5 text-xs font-black text-[#F0FDF4]">Pita {s.n} petak</p>
              {s.pasangan.map((p) => barisPasangan(p))}
              {sel(s.daftar.kunci, s.daftar.suara, <span className="text-[12px] font-black leading-tight">Faktor {s.n}: {s.daftar.teks}</span>, `Faktor ${s.n}: ${s.daftar.teks}`)}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#B45309] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(120,53,15,0.25)]" data-uji="kartu-joko">
          <p className="mb-1 text-center text-xs font-black tracking-wide text-[#78350F]">KLEPON PAK JOKO · FAKTOR 24</p>
          <div className="space-y-1">
            {SEL_KARTU2.pasangan.map((p) => barisPasangan(p))}
            {sel(SEL_KARTU2.daftar.kunci, SEL_KARTU2.daftar.suara, <span className="text-[12px] font-black leading-tight">Faktor {SEL_KARTU2.daftar.n}: {SEL_KARTU2.daftar.teks}</span>, `Faktor ${SEL_KARTU2.daftar.n}: ${SEL_KARTU2.daftar.teks}`)}
          </div>
          <p className="mb-0.5 mt-1.5 rounded-md bg-[#B45309] px-2 py-0.5 text-xs font-black text-[#FFFBEB]">Satu dan bilangan itu sendiri</p>
          <div className="grid grid-cols-3 gap-1">
            {SEL_KARTU2.selalu.map((s) => sel(s.kunci, s.suara, <span className="text-[13px] font-black">{s.teks}</span>, `Selalu faktor: ${s.teks}`))}
          </div>
          <p className="mb-0.5 mt-1.5 rounded-md bg-[#B45309] px-2 py-0.5 text-xs font-black text-[#FFFBEB]">Cek bagi</p>
          <div className="grid grid-cols-2 gap-1">
            {SEL_KARTU2.cek.map((c) =>
              sel(
                c.kunci,
                c.suara,
                <span className="flex flex-col leading-tight">
                  <span className="text-[12px] font-black">{c.baris1}</span>
                  <span className={`text-[12px] font-black ${c.r === 0 ? "text-[#15803D]" : "text-[#B91C1C]"}`}>{c.baris2}</span>
                </span>,
                `${c.baris1}, ${c.baris2}`,
                "min-h-[44px]",
              ),
            )}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_PIRING : `Sudah dibuka ${buka1} dari ${kunci1.length} kotak.`) : selesai2 ? SELESAI2_INFO_PIRING : `Sudah dibuka ${buka2} dari ${kunci2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan pita">
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
export { InfoPiring };
