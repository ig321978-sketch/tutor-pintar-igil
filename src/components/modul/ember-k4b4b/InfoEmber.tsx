"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BlokSvg } from "./GambarEmber";
import { BEJANA, KOTAK_TANGGA, PESAN_INFO_2_SAMA, KUBUS_STORY, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1, SELESAI_INFO_2, type Bejana } from "./data-info";

/**
 * Infografis Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto": dua kartu, tiap kartu satu layar tanpa gulir, dari benda dan angka Story.
 * Kartu 1 "Deret takaran": empat bejana digambar dengan tinggi air (atau susunan kubus) sungguhan, dua angka tertutup di bawah tiap bejana (diketuk, muncul dan dibacakan).
 * Kartu 2 "Tangga dan kubus": tangga liter ke mililiter dengan empat kotak aturan tertutup. Digital saja.
 */
const BIRU = "#1C01A5";

/** Satu gelas takar kecil (trapesium) pada pojok (x, y) berlebar w, berisi air setinggi 60 persen. */
function GelasMini({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g data-gelas="1">
      <path d={`M${x} ${y} L${x + w} ${y} L${x + w - 4} ${y + h} L${x + 4} ${y + h} Z`} fill="#FFFFFF" stroke="#0284C7" strokeWidth={2} />
      <path d={`M${x + 1.6} ${y + h * 0.4} L${x + w - 1.6} ${y + h * 0.4} L${x + w - 4} ${y + h} L${x + 4} ${y + h} Z`} fill="#7DD3FC" />
    </g>
  );
}

/** Bejana: empat gelas takar (2 x 2), botol takar, ember dengan delapan gelas takar (4 x 2) di bawahnya, atau balok kubus. Tinggi air botol dan ember dari data. */
function GambarBejana({ b }: { b: Bejana }) {
  if (b.bentuk === "balok")
    return (
      <div className="mx-auto w-full max-w-[195px]" data-bejana={b.id}>
        <BlokSvg kolom={3} baris={2} lapis={2} rupa="benda" />
      </div>
    );
  const tinggi = b.bentuk === "ember" ? 44 : 70;
  const air = Math.round(tinggi * b.pecah);
  const dasar = b.bentuk === "ember" ? 54 : 86;
  const yAir = dasar - air;
  return (
    <svg viewBox="0 0 100 112" className="mx-auto w-full max-w-[90px]" role="img" aria-label={`${b.nama} berisi air`} data-bejana={b.id} data-air={air} data-gelas-banyak={b.gelas}>
      {b.bentuk === "gelas"
        ? Array.from({ length: b.gelas }, (_, i) => <GelasMini key={i} x={8 + (i % 2) * 48} y={8 + Math.floor(i / 2) * 52} w={36} h={40} />)
        : null}
      {b.bentuk === "botol" ? (
        <g>
          <rect x={30} y={16} width={40} height={70} rx={4} fill="#FFFFFF" stroke="#0284C7" strokeWidth={2.5} />
          <rect x={32} y={yAir} width={36} height={air} fill="#7DD3FC" />
          <rect x={42} y={6} width={16} height={12} rx={3} fill="#DBEAFE" stroke="#0284C7" strokeWidth={2} />
          <text x={50} y={56} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
            1 l
          </text>
        </g>
      ) : null}
      {b.bentuk === "ember" ? (
        <g>
          <path d="M18 8 Q50 -10 82 8" fill="none" stroke="#F59E0B" strokeWidth={2.5} />
          <polygon points={`${22},${dasar - air} ${78},${dasar - air} ${74},${dasar} ${26},${dasar}`} fill="#7DD3FC" />
          <path d={`M18 8 L82 8 L74 ${dasar} L26 ${dasar} Z`} fill="none" stroke="#F59E0B" strokeWidth={3} />
          {Array.from({ length: b.gelas }, (_, i) => (
            <GelasMini key={i} x={4 + (i % 4) * 24} y={yAir > 0 ? 62 + Math.floor(i / 4) * 24 : 62} w={20} h={20} />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

/** Satu lapisan kubus: kolom x baris kotak (satu kotak satu kubus). */
function LapisanSvg({ kolom, baris }: { kolom: number; baris: number }) {
  const s = 24;
  return (
    <svg viewBox={`0 0 ${kolom * s + 8} ${baris * s + 8}`} className="mx-auto w-full max-w-[110px]" role="img" aria-label={`satu lapisan: ${baris} baris, ${kolom} kubus tiap baris`} data-lapisan={kolom * baris}>
      {Array.from({ length: baris }, (_, r) => Array.from({ length: kolom }, (_, c) => <rect key={`${r}-${c}`} x={4 + c * s} y={4 + r * s} width={s} height={s} fill="#BAE6FD" stroke={BIRU} strokeWidth={1.5} />))}
    </svg>
  );
}

function Rahasia({ terbuka, teks, aria, onKetuk, warna = "#15803D" }: { terbuka: boolean; teks: string; aria: string; onKetuk: () => void; warna?: string }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? aria : "Isi kosong, ketuk untuk membuka"}
      className={`flex min-h-[40px] w-full items-center justify-center rounded-lg border-[3px] px-0.5 text-center text-[13px] font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      style={terbuka ? { color: warna } : undefined}
    >
      {terbuka ? teks : "?"}
    </button>
  );
}

export default function InfoEmberK4B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = BEJANA.length * 2;
  const total2 = KOTAK_TANGGA.length;
  const buka1 = buka.filter((k) => k.startsWith("b")).length;
  const buka2 = buka.filter((k) => k.startsWith("t")).length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((x) => [...x, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const selesai = kartu === 1 ? buka1 === total1 : buka2 === total2;
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
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#0E7490] bg-[#ECFEFF] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="deret-takaran">
          <p className="mb-2 rounded-lg bg-[#0E7490] py-1 text-center text-sm font-black text-[#FDE68A]">Deret takaran</p>
          <div className="grid grid-cols-3 gap-1.5">
            {BEJANA.map((b, i) => {
              const cell = (
                <>
                  <GambarBejana b={b} />
                  <p className="text-center text-xs font-black leading-tight text-[#0E7490]">{b.nama}</p>
                </>
              );
              const angka = b.angka.map((a, j) => {
                const kunci = `b${i}-${j}`;
                return <Rahasia key={kunci} terbuka={buka.includes(kunci)} teks={a.teks} aria={`${b.nama}: ${a.suara}`} onKetuk={() => ketuk(kunci, a.suara)} />;
              });
              return b.bentuk === "balok" ? (
                <div key={b.id} className="col-span-3 grid grid-cols-[1fr_6.5rem] items-center gap-2 rounded-xl border-2 border-[#7DD3FC] bg-white/70 p-1">
                  <div>{cell}</div>
                  <div className="space-y-1">{angka}</div>
                </div>
              ) : (
                <div key={b.id} className="flex flex-col justify-end gap-1 rounded-xl border-2 border-[#7DD3FC] bg-white/70 p-1">
                  {cell}
                  {angka}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#92400E] bg-[#FFF8E7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="tangga-kubus">
          <p className="mb-2 rounded-lg bg-[#92400E] py-1 text-center text-sm font-black text-[#FDE68A]">Tangga dan kubus</p>
          <svg viewBox="0 0 300 96" className="mx-auto mb-1 w-full max-w-[240px]" role="img" aria-label="tangga dari liter turun ke mililiter">
            <path d="M20 40 L120 40 L120 76 L280 76" fill="none" stroke="#92400E" strokeWidth={4} />
            <rect x={24} y={8} width={92} height={32} rx={8} fill="#DBEAFE" stroke={BIRU} strokeWidth={2.5} />
            <text x={70} y={30} textAnchor="middle" fontSize={16} fontWeight={900} fill={BIRU}>
              1 l
            </text>
            <rect x={170} y={44} width={106} height={32} rx={8} fill="#DCFCE7" stroke="#166534" strokeWidth={2.5} />
            <text x={223} y={66} textAnchor="middle" fontSize={16} fontWeight={900} fill="#166534">
              1.000 ml
            </text>
            <text x={146} y={34} textAnchor="middle" fontSize={11} fontWeight={900} fill="#DC2626">
              turun
            </text>
            <text x={70} y={64} textAnchor="middle" fontSize={11} fontWeight={900} fill="#DC2626">
              naik
            </text>
          </svg>
          <div className="mb-2 grid grid-cols-2 gap-2 rounded-xl border-2 border-[#E8C48F] bg-white/80 p-1.5" data-uji="kubus-lapisan">
            <div>
              <LapisanSvg kolom={KUBUS_STORY.kolom} baris={KUBUS_STORY.baris} />
              <p className="text-center text-xs font-black leading-tight text-[#92400E]">1 lapisan</p>
            </div>
            <div>
              <BlokSvg kolom={KUBUS_STORY.kolom} baris={KUBUS_STORY.baris} lapis={KUBUS_STORY.lapis} rupa="benda" />
              <p className="text-center text-xs font-black leading-tight text-[#92400E]">{KUBUS_STORY.lapis} lapisan</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {KOTAK_TANGGA.map((o, i) => {
              const kunci = `t${i}`;
              return (
                <div key={o.id} className="space-y-1 rounded-xl border-2 border-[#E8C48F] bg-white/80 p-1.5">
                  <p className="text-center text-xs font-black text-[#92400E]">{o.label}</p>
                  <Rahasia terbuka={buka.includes(kunci)} teks={o.isi} aria={`${o.label}: ${o.suara}`} onKetuk={() => ketuk(kunci, o.suara)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (buka1 === total1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : buka2 === total2 ? SELESAI_INFO_2 : PESAN_INFO_2_SAMA}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke deret takaran">
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

export { InfoEmberK4B4 };
