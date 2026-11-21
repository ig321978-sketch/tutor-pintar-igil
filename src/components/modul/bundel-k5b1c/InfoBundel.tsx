"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BARIS_TUKAR_INFO,
  KOLOM_INFO_BUNDEL,
  KOLOM_INFO_TUKAR,
  PETUNJUK1_INFO_BUNDEL,
  PETUNJUK2_INFO_BUNDEL,
  SELESAI1_INFO_BUNDEL,
  SELESAI2_INFO_BUNDEL,
  TRIBUN_INFO,
  banyakInfo,
  jumlahInfo,
  suaraBundel,
  suaraJumlahInfo,
  tiketInfo,
} from "./data-kartu";
import { KOLOM, lambang } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan rak bundel berkertas kardus: tabel DATA Tribun Utara dan Tribun Barat (jenis bundel di baris, banyak bundel dan uraiannya di sel, nol penjaga, dan jumlah);
 * judul kolom tampil, isi sel kosong (?) sampai diketuk lalu dibacakan Guru. Kartu 2 = tukar dan susun: susunan Tribun Utara yang berbeda dengan jumlah tetap
 * dan uraian Tribun Barat yang disusun kembali dengan nol; sel kosong diketuk dengan cara yang sama. Digital saja.
 */
const GRID1 = "grid-cols-[4.9rem_1fr_1fr]";
const GRID2 = "grid-cols-[4.2rem_1fr_4.4rem]";
const WARNA_IKON = [
  { isi: "#B45309", garis: "#7C2D12", w: 18, h: 16 },
  { isi: "#F59E0B", garis: "#B45309", w: 15, h: 13 },
  { isi: "#FDE047", garis: "#A16207", w: 13, h: 10 },
  { isi: "#FB923C", garis: "#C2410C", w: 11, h: 8 },
  { isi: "#FFFFFF", garis: "#78716C", w: 9, h: 6 },
];

function IkonBundel({ ke }: { ke: number }) {
  const c = WARNA_IKON[ke];
  return (
    <svg viewBox="0 0 22 20" className="block h-[20px] w-[22px] shrink-0" role="img" aria-label={KOLOM[ke].bundel} data-ikon-bundel={ke}>
      <rect x={(22 - c.w) / 2} y={19 - c.h} width={c.w} height={c.h} rx={2} fill={c.isi} stroke={c.garis} strokeWidth={1.4} />
    </svg>
  );
}

export default function InfoBundel({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const total1 = KOLOM.length * TRIBUN_INFO.length + TRIBUN_INFO.length;
  const total2 = BARIS_TUKAR_INFO.length * 2;
  const buka1 = buka.filter((k) => k.startsWith("a")).length;
  const buka2 = buka.filter((k) => k.startsWith("b")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_BUNDEL : PETUNJUK2_INFO_BUNDEL;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const sel = (kunci: string, suara: string, isi: React.ReactNode, aria: string) => {
    const terbuka = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={terbuka ? aria : "Isi kosong"}
        className={`flex min-h-[36px] items-center justify-center rounded-lg border-[3px] px-0.5 text-center ${terbuka ? "lm-muncul border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#B45309] bg-white/70 text-lg font-black text-[#B45309]"}`}
      >
        {terbuka ? isi : "?"}
      </button>
    );
  };

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
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[7px] border-[#78350F] bg-[#FEF3C7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.3)]" data-uji="tabel-rak">
          <p className="mb-1.5 text-center text-xs font-black tracking-wide text-[#78350F]">PAPAN RAK BUNDEL · TRIBUN UTARA DAN BARAT</p>
          <div className={`mb-1.5 grid ${GRID1} items-center gap-1`}>
            {KOLOM_INFO_BUNDEL.map((k) => (
              <span key={k} className="rounded-md bg-[#78350F] py-1 text-center text-xs font-black text-[#FEF3C7]">
                {k}
              </span>
            ))}
          </div>
          <div className="space-y-1">
            {KOLOM.map((kol, r) => (
              <div key={kol.bundel} className={`grid ${GRID1} items-center gap-1`}>
                <span className="flex items-center gap-1 leading-tight">
                  <IkonBundel ke={r} />
                  <span className="flex flex-col">
                    <span className="text-[11px] font-black text-[#78350F]">{kol.bundel}</span>
                    <span className="text-[10px] font-bold text-[#92400E]">{lambang(kol.bobot)}</span>
                  </span>
                </span>
                {TRIBUN_INFO.map((t, ti) =>
                  sel(
                    `a${ti}-${r}`,
                    suaraBundel(ti, r),
                    <span className="flex flex-col items-center leading-tight">
                      <span className="text-[13px] font-black">
                        {banyakInfo(ti, r)} {kol.bundel}
                      </span>
                      <span className="text-[11px] font-bold">= {lambang(tiketInfo(ti, r))}</span>
                    </span>,
                    `${t.nama}: ${banyakInfo(ti, r)} ${kol.bundel}`,
                  ),
                )}
              </div>
            ))}
            <div className={`grid ${GRID1} items-center gap-1 border-t-2 border-dashed border-[#78350F]/60 pt-1`}>
              <span className="text-[11px] font-black text-[#78350F]">Jumlah tiket</span>
              {TRIBUN_INFO.map((t, ti) => sel(`aj-${ti}`, suaraJumlahInfo(ti), <span className="text-[15px] font-black">{lambang(jumlahInfo(ti))}</span>, `Jumlah ${t.nama}: ${lambang(jumlahInfo(ti))}`))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#1E3A8A] bg-[#EFF6FF] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="kartu-tukar">
          <p className="mb-1.5 text-center text-xs font-black tracking-wide text-[#1E3A8A]">TUKAR DAN SUSUN · JUMLAH TETAP</p>
          <div className={`mb-1.5 grid ${GRID2} items-center gap-1`}>
            {KOLOM_INFO_TUKAR.map((k) => (
              <span key={k} className="rounded-md bg-[#1E3A8A] py-1 text-center text-xs font-black text-white">
                {k}
              </span>
            ))}
          </div>
          <div className="space-y-1">
            {BARIS_TUKAR_INFO.map((b, r) => (
              <div key={b.label} className={`grid ${GRID2} items-center gap-1`}>
                <span className="text-[11px] font-black leading-tight text-[#1E3A8A]">{b.label}</span>
                {sel(`b${r}-s`, b.suaraSusunan, <span className="text-[12px] font-black leading-tight">{b.susunan}</span>, `Susunan ${b.label}: ${b.susunan}`)}
                {sel(`b${r}-j`, b.suaraJumlah, <span className="text-[13px] font-black">{lambang(b.jumlah)}</span>, `Jumlah ${b.label}: ${lambang(b.jumlah)}`)}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_BUNDEL : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_BUNDEL : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan rak">
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
export { InfoBundel };
