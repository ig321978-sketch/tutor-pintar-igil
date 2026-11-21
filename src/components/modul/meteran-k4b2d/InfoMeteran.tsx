"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { GAMBAR, JEMBATAN_INFO, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1, SELESAI_INFO_2, type Gambar, type Sel } from "./data-info";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas": dua kartu, tiap kartu satu layar tanpa gulir, dari potongan kain dan angka Story.
 * Kartu 1 "Papan kisi": dua pita sepuluh kolom dan tiga kisi seratus kotak digambar sebanyak kolom dan kotaknya, dengan banyak yang diwarnai sungguh sesuai data;
 * dua isian tertutup di bawah tiap gambar (pecahan dan desimal) diketuk, muncul dan dibacakan.
 * Kartu 2 "Jembatan desimal": enam jembatan, ujung kiri terlihat, ujung kanan tertutup. Digital saja.
 */
const BIRU = "#1C01A5";
const TEAL = "#0F766E";
const EMAS = "#F59E0B";

function Tingkat({ p, q }: { p: number; q: number }) {
  return (
    <span className="inline-flex flex-col items-center text-[14px] font-black leading-none" aria-hidden="true">
      <span>{p}</span>
      <span className="my-[3px] h-[2px] w-full min-w-[1.3rem] bg-current" />
      <span>{q}</span>
    </span>
  );
}

const isi = (s: { t: string; pec?: [number, number] }) => (s.pec ? <Tingkat p={s.pec[0]} q={s.pec[1]} /> : s.t);

function Rahasia({ terbuka, sel, aria, tutup, onKetuk }: { terbuka: boolean; sel: Sel; aria: string; tutup: string; onKetuk: () => void }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? aria : tutup}
      className={`flex min-h-[44px] w-full items-center justify-center rounded-lg border-[3px] px-0.5 py-0.5 text-center text-[13px] font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#15803D]" : "border-dashed border-[#0F766E] bg-white/80 text-lg text-[#0F766E]"}`}
    >
      {terbuka ? isi(sel) : "?"}
    </button>
  );
}

/** Pita sepuluh kolom (p kolom diwarnai) atau kisi seratus kotak (p kotak diwarnai, baris demi baris). */
function Gambaran({ gb }: { gb: Gambar }) {
  if (gb.bentuk === "pita")
    return (
      <svg viewBox="0 0 124 22" className="w-full" role="img" aria-label={`pita ${gb.den} kolom, ${gb.p} kolom diwarnai`} data-gambar={gb.id} data-bagian={gb.den} data-warna={gb.p}>
        {Array.from({ length: gb.den }, (_, i) => (
          <rect key={i} x={2 + i * 12} y={2} width={12} height={18} fill={i < gb.p ? TEAL : "#FFFFFF"} stroke={BIRU} strokeWidth={1.2} data-arsir={i < gb.p ? 1 : 0} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 84 84" className="mx-auto w-full max-w-[96px]" role="img" aria-label={`kisi ${gb.den} kotak, ${gb.p} kotak diwarnai`} data-gambar={gb.id} data-bagian={gb.den} data-warna={gb.p}>
      {Array.from({ length: gb.den }, (_, i) => (
        <rect key={i} x={2 + (i % 10) * 8} y={2 + Math.floor(i / 10) * 8} width={8} height={8} fill={i < gb.p ? TEAL : "#FFFFFF"} stroke={BIRU} strokeWidth={0.8} data-arsir={i < gb.p ? 1 : 0} />
      ))}
    </svg>
  );
}

/** Jembatan di atas sungai: busur berlantai, empat tiang pagar, dan air bergelombang di bawahnya. */
function Busur() {
  return (
    <svg viewBox="0 0 60 40" className="mx-auto w-full max-w-[60px]" aria-hidden="true" data-busur="1">
      <path d="M0 34 Q8 30 15 34 T30 34 T45 34 T60 34 L60 40 L0 40 Z" fill="#7DD3FC" />
      <path d="M4 28 Q30 -8 56 28" fill="none" stroke={EMAS} strokeWidth={5} strokeLinecap="round" />
      {[14, 24, 36, 46].map((x) => (
        <line key={x} x1={x} y1={x < 30 ? 22 - (x - 14) * 0.2 : 22 - (46 - x) * 0.2} x2={x} y2={28} stroke="#92400E" strokeWidth={2} />
      ))}
      <line x1={2} y1={28} x2={58} y2={28} stroke="#92400E" strokeWidth={3} />
    </svg>
  );
}

export default function InfoMeteranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = GAMBAR.length * 2;
  const total2 = JEMBATAN_INFO.length;
  const buka1 = buka.filter((k) => k.startsWith("g")).length;
  const buka2 = buka.filter((k) => k.startsWith("j")).length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((x) => [...x, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const selesai = kartu === 1 ? buka1 === total1 : buka2 === total2;
  const tile = (gb: Gambar, i: number) => (
    <div key={gb.id} className="space-y-1 rounded-xl border-2 border-[#99F6E4] bg-white/85 p-1">
      <Gambaran gb={gb} />
      <div className="grid grid-cols-2 gap-1">
        {gb.sel.map((s, j) => {
          const kunci = `g${i}-${j}`;
          return <Rahasia key={kunci} terbuka={buka.includes(kunci)} sel={s} aria={`${gb.nama}: ${s.suara}`} tutup={`${j === 0 ? "Pecahan" : "Desimal"} untuk ${gb.nama}, belum dibuka`} onKetuk={() => ketuk(kunci, s.suara)} />;
        })}
      </div>
    </div>
  );
  return (
    <div className="space-y-1.5">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-[13px] font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl space-y-1.5 rounded-2xl border-[5px] border-[#0F766E] bg-[#F0FDFA] p-1.5 shadow-[0_4px_0_rgba(0,0,0,0.25)]" data-uji="papan-kisi">
          <div className="grid grid-cols-2 gap-1.5">{GAMBAR.slice(0, 2).map((gb, i) => tile(gb, i))}</div>
          <div className="grid grid-cols-3 gap-1.5">{GAMBAR.slice(2).map((gb, i) => tile(gb, i + 2))}</div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#0369A1] bg-[#F0F9FF] p-1.5 shadow-[0_4px_0_rgba(0,0,0,0.25)]" data-uji="jembatan-desimal">
          <div className="space-y-1">
            {JEMBATAN_INFO.map((j, i) => {
              const kunci = `j${i}`;
              return (
                <div key={j.id} className="grid grid-cols-[6.6rem_3.4rem_minmax(0,1fr)] items-center gap-0.5 rounded-xl border-2 border-[#7DD3FC] bg-[#E0F2FE] p-1">
                  <div className="flex min-h-[44px] items-center justify-center rounded-lg border-2 border-[#B45309] px-2 bg-[#FEF3C7] text-center text-[13px] font-black leading-tight text-[#92400E]">{isi(j.kiri)}</div>
                  <Busur />
                  <Rahasia terbuka={buka.includes(kunci)} sel={j.kanan} aria={`${j.kiri.t}: ${j.kanan.suara}`} tutup={`Seberang jembatan ${j.kiri.t}, belum dibuka`} onKetuk={() => ketuk(kunci, j.kanan.suara)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (buka1 === total1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : buka2 === total2 ? SELESAI_INFO_2 : `Sudah dibuka ${buka2} dari ${total2} jembatan.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan kisi">
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
    </div>
  );
}

export { InfoMeteranK4B2 };
