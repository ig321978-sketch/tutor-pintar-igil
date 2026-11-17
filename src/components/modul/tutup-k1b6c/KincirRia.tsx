"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_KINCIR, PETUNJUK_URUT_KINCIR, PUSAT_KINCIR, SUARA_KINCIR, TEMPAT_KINCIR } from "./data";

/**
 * Mind-map Kelas 1 Bab 6 Sub-Bab C: Kincir Ria. Loket naik kincir di atas = Masalah, roda kincir dengan tujuh gondola bernomor =
 * Penyelesaian berurutan (semua metode Story, dibaca dari gondola satu sampai tujuh), menara lampu di dasar kincir = Hasil.
 * Label sewarna ditempel; gondola hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const WARNA_GONDOLA = ["#F472B6", "#FACC15", "#38BDF8", "#34D399", "#FB923C", "#A78BFA", "#F87171"];

export default function KincirRia({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KINCIR,
    61,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_KINCIR, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_KINCIR;
      return kel ? KELOMPOK_KINCIR[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_KINCIR, t, l),
  );
  const kel = (k: string) => TEMPAT_KINCIR.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_KINCIR[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Gondola kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1E3A8A] text-[11px] font-black text-[#1E3A8A]" style={{ background: WARNA_GONDOLA[(t.urutan - 1) % 7] }} aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const gondola = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KINCIR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Kincir ria. Loket naik berisi masalah, tujuh gondola bernomor berisi langkah, menara lampu berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#312E81] bg-gradient-to-b from-[#C7D2FE] to-[#FEF3C7] p-2">
        {/* Loket naik kincir (Masalah) */}
        <div className="mx-auto max-w-md rounded-t-2xl border-4 border-[#A16207] bg-[#FEF3C7] p-2 shadow-[0_4px_0_rgba(161,98,7,0.35)]">
          <p className="mb-1 text-center text-xs font-black text-[#A16207]">
            {KELOMPOK_KINCIR.masalah.ikon} Loket naik kincir: Masalah
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
        </div>

        {/* Roda kincir dengan tujuh gondola bernomor (Penyelesaian) */}
        <p className="mt-2 text-center text-sm font-black text-[#312E81]">
          {KELOMPOK_KINCIR.metode.ikon} {PUSAT_KINCIR}: naiki gondola dari satu sampai tujuh
        </p>
        <svg viewBox="0 0 300 170" className="mx-auto block w-full max-w-md" aria-hidden="true">
          <path d="M 96 166 L 150 82 L 204 166" fill="none" stroke="#475569" strokeWidth={5} strokeLinejoin="round" />
          <circle cx={150} cy={82} r={66} fill="none" stroke="#312E81" strokeWidth={3} />
          <circle cx={150} cy={82} r={36} fill="none" stroke="#6366F1" strokeWidth={1.4} />
          {gondola.map((_, i) => {
            const a = -Math.PI / 2 + (i / 7) * 2 * Math.PI;
            return <line key={`s${i}`} x1={150} y1={82} x2={150 + 66 * Math.cos(a)} y2={82 + 66 * Math.sin(a)} stroke="#312E81" strokeWidth={1.4} />;
          })}
          {gondola.map((_, i) => {
            const a = -Math.PI / 2 + (i / 7) * 2 * Math.PI;
            const x = 150 + 66 * Math.cos(a);
            const y = 82 + 66 * Math.sin(a);
            return (
              <g key={`g${i}`}>
                <rect x={x - 11} y={y - 4} width={22} height={17} rx={5} fill={WARNA_GONDOLA[i]} stroke="#1E1B4B" strokeWidth={1.4} />
                <text x={x} y={y + 8.5} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1E1B4B">
                  {i + 1}
                </text>
              </g>
            );
          })}
          <circle cx={150} cy={82} r={7} fill="#FACC15" stroke="#312E81" strokeWidth={2} />
        </svg>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{gondola.map((t) => kartu(t, "rounded-xl"))}</div>

        {/* Menara lampu di dasar kincir (Hasil) */}
        <div className="mx-auto h-5 w-2 bg-[#475569]" aria-hidden="true" />
        <div className="relative mx-auto max-w-md rounded-xl border-4 border-[#BE185D] bg-white p-2">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl" aria-hidden="true">
            {"\u{1F3EE}"}
          </span>
          <p className="mb-1 mt-1 text-center text-sm font-black tracking-widest text-[#BE185D]">MENARA LAMPU · Hasil</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-full"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EEF2FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_KINCIR, l);
          return k ? { isi: KELOMPOK_KINCIR[k].isi, garis: KELOMPOK_KINCIR[k].garis, ikon: KELOMPOK_KINCIR[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Kincir berputar! Dari masalah di loket, langkah di tiap gondola, sampai hasil di menara lampu." : tp.pesan}
      </p>
      {tp.selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
