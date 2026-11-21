"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ATURAN_JADWAL, DAFTAR_FAKTOR_JADWAL, JAM_INFO_JADWAL, PASANGAN_JADWAL, PETUNJUK1_INFO_JADWAL, PETUNJUK2_INFO_JADWAL, SELESAI1_INFO_JADWAL, SELESAI2_INFO_JADWAL, type PasanganPayung } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab I (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = papan payung Kak Yoga: dua puluh empat payung digambar dalam empat bentuk (1 x 24, 2 x 12, 3 x 8, 4 x 6; tiap bentuk tepat 24 payung), pasangan faktor tiap bentuk kosong
 * sampai diketuk, ditambah satu kotak daftar semua faktor. Kartu 2 = jadwal perahu tiap empat jam (enam perahu, jam berangkat kosong sampai diketuk) dan empat kotak aturan kelipatan dan faktor.
 * Digital saja.
 */
const WARNA = ["#EF4444", "#F59E0B", "#22C55E", "#0EA5E9", "#A855F7", "#EC4899"];

function Susunan({ p }: { p: PasanganPayung }) {
  /* Payung sebesar mungkin: lebar 170 dibagi kolom, tinggi 44 dibagi baris. */
  const sel = Math.min(170 / p.kolom, 44 / (p.baris * 1.15));
  const u = sel * 0.92;
  const tinggi = sel * 1.15;
  const y0 = (48 - p.baris * tinggi) / 2;
  return (
    <svg viewBox="0 0 170 48" className="h-auto w-full" role="img" aria-label={`${p.baris} baris, tiap baris ${p.kolom} payung`} data-baris={p.baris} data-kolom={p.kolom}>
      {Array.from({ length: p.baris * p.kolom }, (_, i) => {
        const r = Math.floor(i / p.kolom);
        const k = i % p.kolom;
        const x = k * sel;
        const y = y0 + r * tinggi;
        return (
          <g key={i} data-payung="1">
            <path d={`M${x},${y + u / 2} a${u / 2},${u / 2} 0 0 1 ${u},0 z`} fill={WARNA[r % WARNA.length]} />
            <path d={`M${x + u / 2},${y + u / 2} v${u * 0.45}`} stroke="#78350F" strokeWidth={0.8} />
          </g>
        );
      })}
    </svg>
  );
}

export default function DaftarJadwalK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = PASANGAN_JADWAL.length + 1;
  const total2 = JAM_INFO_JADWAL.length + ATURAN_JADWAL.length;
  const buka1 = buka.filter((k) => k.startsWith("p-")).length;
  const buka2 = buka.filter((k) => k.startsWith("j-") || k.startsWith("a-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_JADWAL : PETUNJUK2_INFO_JADWAL;

  const kotak = (kunci: string, suara: string, isi: string, aria: string) => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex min-h-[44px] w-full items-center justify-center rounded-lg border-[3px] px-1 text-center font-black leading-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[13px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-jadwal">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0891B2] bg-[#FDE68A] p-2 shadow-[0_5px_0_rgba(8,145,178,0.4)]" data-uji="papan-payung">
          <div className="space-y-1">
            {PASANGAN_JADWAL.map((p) => (
              <div key={p.kunci} className="grid grid-cols-[1fr_5.4rem] items-center gap-1.5 rounded-lg border-2 border-[#FDBA74] bg-[#FFFBEB] p-1">
                <Susunan p={p} />
                {kotak(`p-${p.kunci}`, p.sel.suara, p.sel.isi, `Pasangan faktor: ${p.sel.isi}`)}
              </div>
            ))}
            <div className="grid grid-cols-[5.2rem_1fr] items-center gap-1.5 rounded-lg border-2 border-[#FDBA74] bg-[#FFFBEB] p-1">
              <p className="text-xs font-black leading-tight text-[#78350F]">Semua faktor 24</p>
              {kotak("p-semua", DAFTAR_FAKTOR_JADWAL.suara, DAFTAR_FAKTOR_JADWAL.isi, `Semua faktor: ${DAFTAR_FAKTOR_JADWAL.isi}`)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-[#E0F2FE] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="jam-perahu">
          <div className="relative mb-2 grid grid-cols-6 gap-1">
            <div aria-hidden="true" className="absolute left-2 right-2 top-[26px] h-1 rounded bg-[#0EA5E9]" />
            {JAM_INFO_JADWAL.map((j) => (
              <div key={j.jam} className="relative flex flex-col items-center gap-0.5">
                <span aria-hidden="true" className="text-xl leading-none">
                  {"\u{26F5}"}
                </span>
                <span aria-hidden="true" className="mb-0.5 h-3 w-1 rounded bg-[#0369A1]" />
                {kotak(`j-${j.jam}`, j.suara, j.isi, `Jam berangkat: ${j.isi}`)}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {ATURAN_JADWAL.map((a) => (
              <div key={a.kunci} className="grid grid-cols-[1fr_8.6rem] items-center gap-1.5 rounded-lg bg-white/80 p-1">
                <p className="text-xs font-black leading-tight text-[#0C4A6E]">{a.caption}</p>
                {kotak(`a-${a.kunci}`, a.suara, a.isi, `${a.caption}: ${a.isi}`)}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_JADWAL : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_JADWAL : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan payung">
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
export { DaftarJadwalK4B1 };
