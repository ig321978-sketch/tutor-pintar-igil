"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KURANG_TEKS, NOMOR_PAPAN } from "./data-peta";
import { KOTAK_ATURAN, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SEL_KURSI, SEL_LONCAT, SEL_NOMOR, SELESAI_INFO_1, SELESAI_INFO_2 } from "./data-info";

/**
 * Infografis Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan": dua kartu, tiap kartu satu layar tanpa gulir, dari benda dan angka Story.
 * Kartu 1 "Daftar baris kursi": lima baris kursi digambar sebanyak datanya, banyak kursi tiap baris tertutup dan loncatan beda di sela baris tertutup (sembilan kotak).
 * Kartu 2 "Papan nomor dan aturan": nomor tampil dengan nomor berikutnya tertutup dan lima kotak aturan tertutup. Digital saja.
 */
const BIRU = "#1C01A5";
const JARAK = 6.6;
const LEBAR_KURSI = 5;

/** Satu baris kursi: n kursi sungguhan (sandaran dan dudukan). */
function BarisGambar({ n, nomor }: { n: number; nomor: number }) {
  return (
    <svg viewBox={`0 0 ${n * JARAK} 16`} width="100%" style={{ maxWidth: n * JARAK }} height={16} className="mx-auto block" role="img" aria-label={`baris ${nomor}: ${n} kursi`} data-baris-gambar={n}>
      {Array.from({ length: n }, (_, k) => (
        <g key={k} data-kursi="1">
          <rect x={k * JARAK} y={0} width={LEBAR_KURSI} height={5} rx={1} fill="#B45309" />
          <rect x={k * JARAK} y={7} width={LEBAR_KURSI} height={9} rx={1.5} fill="#F97316" stroke="#7C2D12" strokeWidth={0.6} />
        </g>
      ))}
    </svg>
  );
}

function Rahasia({ terbuka, teks, aria, onKetuk, lebar }: { terbuka: boolean; teks: string; aria: string; onKetuk: () => void; lebar?: string }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? aria : "Isi kosong, ketuk untuk membuka"}
      className={`flex min-h-[34px] items-center justify-center rounded-lg border-[3px] px-0.5 text-center text-[13px] font-black leading-tight ${lebar ?? "w-full"} ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#15803D]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
    >
      {terbuka ? teks : "?"}
    </button>
  );
}

export default function DaftarKursiK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = SEL_KURSI.length + SEL_LONCAT.length;
  const total2 = 1 + KOTAK_ATURAN.length;
  const buka1 = buka.filter((k) => k.startsWith("r") || k.startsWith("j")).length;
  const buka2 = buka.filter((k) => k.startsWith("n") || k.startsWith("a")).length;
  const ketuk = (idSel: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(idSel)) setBuka((x) => [...x, idSel]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const selesai = kartu === 1 ? buka1 === total1 : buka2 === total2;
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[3px] border-[#9A3412] bg-[#FFFBEB] p-1.5 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="daftar-baris">
          <p className="mb-1 rounded-lg bg-[#9A3412] py-1 text-center text-sm font-black text-[#FDE68A]">Daftar baris kursi</p>
          {SEL_KURSI.map((s, i) => {
            const kr = `r${i}`;
            const kj = `j${i}`;
            return (
              <div key={kr}>
                <div className="grid grid-cols-[44px_minmax(0,1fr)_46px] items-center gap-1">
                  <p className="text-[12px] font-black leading-tight text-[#7C2D12]">Baris {i + 1}</p>
                  <BarisGambar n={Number(s.teks)} nomor={i + 1} />
                  <Rahasia terbuka={buka.includes(kr)} teks={s.teks} aria={s.suara} onKetuk={() => ketuk(kr, s.suara)} />
                </div>
                {i < SEL_LONCAT.length ? (
                  <div className="flex items-center justify-center gap-1 py-0.5">
                    <span aria-hidden="true" className="text-[13px] font-black text-[#DC2626]">
                      ▼
                    </span>
                    <Rahasia terbuka={buka.includes(kj)} teks={SEL_LONCAT[i].teks} aria={SEL_LONCAT[i].suara} onKetuk={() => ketuk(kj, SEL_LONCAT[i].suara)} lebar="w-[64px]" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[3px] border-[#1C01A5] bg-[#EEF2FF] p-1.5 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="papan-aturan">
          <p className="mb-2 rounded-lg bg-[#1C01A5] py-1 text-center text-sm font-black text-[#FDE68A]">Papan nomor dan aturan</p>
          <div className="mb-2 rounded-xl border-2 border-[#B45309] bg-[#FEF3C7] p-1.5" data-uji="rantai-nomor">
            <p className="mb-1 text-center text-[12px] font-black text-[#7C2D12]">Papan nomor tampil</p>
            <div className="flex items-center justify-between gap-0.5 px-0.5">
              {NOMOR_PAPAN.map((n) => (
                <React.Fragment key={n}>
                  <span data-nomor={n} className="flex h-[40px] w-[44px] shrink-0 items-center justify-center rounded-lg border-2 border-[#7C2D12] bg-[#FDBA74] text-base font-black text-[#1C01A5]">
                    {n}
                  </span>
                  <span className="text-[13px] font-black text-[#DC2626]">{KURANG_TEKS}</span>
                </React.Fragment>
              ))}
              <div className="w-[44px] shrink-0">
                <Rahasia terbuka={buka.includes("n0")} teks={SEL_NOMOR.teks} aria={SEL_NOMOR.suara} onKetuk={() => ketuk("n0", SEL_NOMOR.suara)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {KOTAK_ATURAN.map((o, i) => {
              const idSel = `a${i}`;
              return (
                <div key={o.id} className={`space-y-1 rounded-xl border-2 border-[#C7D2FE] bg-white/80 p-1.5 ${i === KOTAK_ATURAN.length - 1 && KOTAK_ATURAN.length % 2 === 1 ? "col-span-2" : ""}`}>
                  <p className="text-center text-[12px] font-black leading-tight" style={{ color: BIRU }}>
                    {o.label}
                  </p>
                  <Rahasia terbuka={buka.includes(idSel)} teks={o.isi} aria={`${o.label}: ${o.suara}`} onKetuk={() => ketuk(idSel, o.suara)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (buka1 === total1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : buka2 === total2 ? SELESAI_INFO_2 : PESAN_INFO_2}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke daftar baris kursi">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai ? (
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

export { DaftarKursiK4B3 };
