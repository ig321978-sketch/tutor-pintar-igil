"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PAYUNG, PETUNJUK_URUT_PAYUNG, PUSAT_PAYUNG, SUARA_PAYUNG, TEMPAT_PAYUNG } from "./data";

/**
 * Mind-map Kelas 1 Bab 5 Sub-Bab D: Payung Lapak. Papan pesanan pembeli tergantung di atas = Masalah, kain payung bergaris dengan
 * tujuh rusuk bernomor = Penyelesaian berurutan (semua metode Story, dibaca dari kiri ke kanan), papan BUKA berpita di tiang payung = Hasil.
 * Label sewarna ditempel; rusuk hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const KAIN = ["#2563EB", "#FFFFFF"];

export default function PayungLapak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAYUNG,
    59,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PAYUNG, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PAYUNG;
      return kel ? KELOMPOK_PAYUNG[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PAYUNG, t, l),
  );
  const kel = (k: string) => TEMPAT_PAYUNG.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAYUNG[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Rusuk kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1E3A8A] text-[11px] font-black" style={{ background: KAIN[(t.urutan - 1) % 2], color: t.urutan % 2 ? "#FFFFFF" : "#1E3A8A" }} aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const rusuk = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAYUNG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Payung lapak. Papan pesanan berisi masalah, tujuh rusuk payung bernomor berisi langkah, papan buka berpita berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#1E3A8A] bg-gradient-to-b from-[#E0F2FE] to-[#FEF9C3] p-2">
        {/* Papan pesanan pembeli (Masalah), tergantung tali */}
        <div className="mx-auto flex max-w-[60%] justify-between px-6" aria-hidden="true">
          <span className="h-4 w-0.5 bg-[#78350F]" />
          <span className="h-4 w-0.5 bg-[#78350F]" />
        </div>
        <div className="mx-auto max-w-md rounded-lg border-4 border-[#78350F] bg-[#FEF3C7] p-2 shadow-[0_4px_0_rgba(120,53,15,0.35)]">
          <p className="mb-1 text-center text-xs font-black text-[#78350F]">
            {KELOMPOK_PAYUNG.masalah.ikon} Papan pesanan: Masalah
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
        </div>

        {/* Kain payung dengan tujuh rusuk bernomor (Penyelesaian) */}
        <p className="mt-2 text-center text-sm font-black text-[#1E3A8A]">
          {KELOMPOK_PAYUNG.metode.ikon} {PUSAT_PAYUNG}: ikuti rusuk dari kiri ke kanan
        </p>
        <svg viewBox="0 0 300 96" className="mx-auto block w-full max-w-md" aria-hidden="true">
          {rusuk.map((_, i) => {
            const a0 = Math.PI - (i / 7) * Math.PI;
            const a1 = Math.PI - ((i + 1) / 7) * Math.PI;
            const p = (a: number) => `${150 + 140 * Math.cos(a)} ${90 - 80 * Math.sin(a)}`;
            return <path key={i} d={`M 150 10 L ${p(a0)} Q ${150 + 150 * Math.cos((a0 + a1) / 2)} ${96 - 82 * Math.sin((a0 + a1) / 2)} ${p(a1)} Z`} fill={KAIN[i % 2]} stroke="#1E3A8A" strokeWidth={1.4} />;
          })}
          {rusuk.map((_, i) => {
            const a = Math.PI - ((i + 0.5) / 7) * Math.PI;
            const x = 150 + 112 * Math.cos(a);
            const y = 90 - 64 * Math.sin(a);
            return (
              <g key={`n${i}`}>
                <circle cx={x} cy={y} r={8} fill="#FACC15" stroke="#1E3A8A" strokeWidth={1.4} />
                <text x={x} y={y + 3.5} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1E3A8A">
                  {i + 1}
                </text>
              </g>
            );
          })}
          <circle cx={150} cy={8} r={4} fill="#1E3A8A" />
        </svg>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{rusuk.map((t) => kartu(t, "rounded-xl"))}</div>

        {/* Tiang payung dan papan BUKA berpita (Hasil) */}
        <div className="mx-auto h-6 w-2 bg-[#78350F]" aria-hidden="true" />
        <div className="relative mx-auto max-w-md rounded-xl border-4 border-[#BE185D] bg-white p-2">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl" aria-hidden="true">
            {"\u{1F380}"}
          </span>
          <p className="mb-1 mt-1 text-center text-sm font-black tracking-widest text-[#BE185D]">BUKA · Hasil</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-full"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EFF6FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PAYUNG, l);
          return k ? { isi: KELOMPOK_PAYUNG[k].isi, garis: KELOMPOK_PAYUNG[k].garis, ikon: KELOMPOK_PAYUNG[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Payung terbuka! Dari masalah di papan pesanan, langkah di tiap rusuk, sampai hasil di papan buka." : tp.pesan}
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
