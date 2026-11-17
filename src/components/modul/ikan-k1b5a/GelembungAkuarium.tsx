"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_GELEMBUNG, PETUNJUK_URUT_GELEMBUNG, PUSAT_GELEMBUNG, SUARA_GELEMBUNG, TEMPAT_GELEMBUNG } from "./data";

/**
 * Mind-map Kelas 1 Bab 5 Sub-Bab A: Akuarium dengan Gelembung Bernomor. Tutup akuarium berlampu di atas = Hasil, tujuh gelembung bernomor
 * yang naik dari dasar = Penyelesaian berurutan (semua metode Story, dibaca dari bawah ke atas), kantong plastik ikan di dasar = Masalah.
 * Label sewarna ditempel; gelembung hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const GESER = ["4%", "30%", "52%", "16%", "44%", "8%", "36%"];

export default function GelembungAkuarium({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_GELEMBUNG,
    51,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_GELEMBUNG, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_GELEMBUNG;
      return kel ? KELOMPOK_GELEMBUNG[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_GELEMBUNG, t, l),
  );
  const kel = (k: string) => TEMPAT_GELEMBUNG.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, gaya: "kantong" | "tutup") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_GELEMBUNG[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}`}
        className={`flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${gaya === "kantong" ? "rounded-b-2xl rounded-t-md" : "rounded-lg"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.85)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const gelembung = (t: Tempat, i: number) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_GELEMBUNG.metode;
    return (
      <div key={t.id} className="relative h-[86px]">
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Gelembung kosong nomor ${t.urutan}`}
          className={`absolute top-0 flex h-[84px] w-[46%] min-w-[118px] max-w-[170px] flex-col items-center justify-center rounded-full border-[3px] px-2 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${tp.goyang === t.id ? "lm-goyang" : ""} ${teks ? "lm-muncul" : ""}`}
          style={{
            left: GESER[i % GESER.length],
            borderColor: g.garis,
            background: teks ? `radial-gradient(circle at 30% 28%,#FFFFFF 0 10%,${g.isi} 11%)` : "radial-gradient(circle at 30% 28%,#FFFFFF 0 10%,rgba(224,242,254,0.75) 11%)",
          }}
        >
          <span className="mb-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0369A1] text-[10px] text-white">{t.urutan}</span>
          <span>{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const metode = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_GELEMBUNG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Akuarium bergelembung. Kantong di dasar berisi masalah, gelembung bernomor naik berisi langkah, tutup berlampu berisi hasil.</p>
      </div>

      <div className="mx-auto flex max-w-xl flex-col-reverse">
        {/* Kantong plastik ikan di dasar akuarium (Masalah) */}
        <div className="rounded-b-3xl border-4 border-t-0 border-[#0C4A6E] bg-[#E9C98F] p-2" style={{ backgroundImage: "radial-gradient(circle,rgba(120,113,108,0.45) 0 2px,transparent 2.5px)", backgroundSize: "11px 9px" }}>
          <div className="mx-auto max-w-md rounded-b-[2.5rem] rounded-t-lg border-[3px] border-[#B91C1C]/70 bg-white/60 p-2">
            <div className="mx-auto -mt-4 mb-1 h-3 w-16 rounded-full bg-[#B91C1C]/70" aria-hidden="true" />
            <p className="mb-1 text-center text-xs font-black text-[#7F1D1D]">
              {KELOMPOK_GELEMBUNG.masalah.ikon} Kantong plastik: Masalah
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "kantong"))}</div>
          </div>
        </div>

        {/* Air akuarium dengan tujuh gelembung bernomor yang naik (Penyelesaian) */}
        <div className="border-x-4 border-[#0C4A6E] bg-gradient-to-b from-[#7DD3FC] to-[#0EA5E9] px-2 py-3">
          <p className="mb-1 text-center text-sm font-black text-white drop-shadow">
            {KELOMPOK_GELEMBUNG.metode.ikon} {PUSAT_GELEMBUNG}: baca dari bawah ke atas {"\u{2B06}\u{FE0F}"}
          </p>
          <div className="flex flex-col-reverse">{metode.map((t, i) => gelembung(t, i))}</div>
        </div>

        {/* Tutup akuarium berlampu (Hasil) */}
        <div className="rounded-t-2xl border-4 border-[#0C4A6E] bg-[#1E293B] p-2">
          <div className="mb-2 flex justify-center gap-3" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-2.5 w-8 rounded-full bg-[#FEF08A] shadow-[0_0_10px_#FDE047]" />
            ))}
          </div>
          <p className="mb-1 text-center text-xs font-black text-[#FEF08A]">
            {KELOMPOK_GELEMBUNG.hasil.ikon} Tutup akuarium berlampu: Hasil
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "tutup"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#E0F2FE"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_GELEMBUNG, l);
          return k ? { isi: KELOMPOK_GELEMBUNG[k].isi, garis: KELOMPOK_GELEMBUNG[k].garis, ikon: KELOMPOK_GELEMBUNG[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Akuarium lengkap! Dari masalah di kantong, langkah di gelembung, sampai hasil di tutup berlampu." : tp.pesan}
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
