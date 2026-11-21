"use client";

import React from "react";
import { RENCANA, barisKartu, dasarDari, judulKartu, ketGambar, modelMeja, type Cara, type Langkah, type LangkahDasar, type Meja, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko": meja kemas beremoji lama (Concrete: tiap kue satu emoji, sebanyak bilangannya, kotak bingkisan satu emoji tiap kotak),
 * diagram titik dan kotak polos tanpa emoji (Pictorial: tiap kue satu titik, sebanyak bilangannya, dibagi lima-lima, dan tiap kotak satu persegi panjang), dan kartu kata dan angka bercap pengelola pasar tanpa gambar (Abstract).
 * Semua gambar dihitung dari logika murni (logika-cpa.ts: modelMeja). Tanpa skor dan tanpa jaringan.
 */

/** Emoji kue untuk Concrete menurut nama jenis (emoji lama, tanpa ZWJ). Jenis lain memakai emoji dango. */
export const EMOJI_KUE: Record<string, string> = {
  Pastel: "\u{1F95F}",
  Sate: "\u{1F362}",
  Donat: "\u{1F369}",
  Permen: "\u{1F36C}",
  Apel: "\u{1F34E}",
  Jeruk: "\u{1F34A}",
  Roti: "\u{1F35E}",
  Pisang: "\u{1F34C}",
  "Es krim": "\u{1F366}",
};
export const emojiKue = (nama: string): string => EMOJI_KUE[nama] ?? "\u{1F361}";
export const EMOJI_KOTAK = "\u{1F381}";

const WARNA_TITIK = ["#2563EB", "#DC2626", "#16A34A"];

/** Meja kemas (Concrete): tiap jenis satu baris emoji sebanyak bilangannya, dan (bila ada) satu emoji kotak tiap kotak. */
export function MejaBenda({ m }: { m: Meja }) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border-[3px] border-[#92400E] bg-[#FEF3C7] p-1.5" role="group" aria-label="meja kemas" data-uji="meja-kemas" data-rupa="benda">
      {m.baris.map((b) => (
        <div key={b.label} className="mb-1" data-baris={b.label} data-n={b.n}>
          <p className="text-[11px] font-black leading-tight text-[#78350F]">
            {b.label}: {b.n}
          </p>
          <div className="grid rounded bg-white/70" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }} role="img" aria-label={`${b.n} ${b.label}`}>
            {Array.from({ length: b.n }, (_, q) => (
              <span key={q} aria-hidden="true" className="text-center text-[15px] leading-5">
                {emojiKue(b.label)}
              </span>
            ))}
          </div>
        </div>
      ))}
      {m.kotak !== null ? (
        <div data-kotak={m.kotak}>
          <p className="text-[11px] font-black leading-tight text-[#78350F]">Kotak: {m.kotak}</p>
          <div className="grid rounded bg-white/70" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }} role="img" aria-label={`${m.kotak} kotak`}>
            {Array.from({ length: m.kotak }, (_, q) => (
              <span key={q} aria-hidden="true" className="text-center text-[18px] leading-6">
                {EMOJI_KOTAK}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {m.catatan ? <p className="mt-0.5 text-center text-xs font-black text-[#78350F]">{m.catatan}</p> : null}
    </div>
  );
}

/** Diagram polos (Pictorial): tiap jenis satu deret titik (sepuluh tiap baris, lima-lima), dan (bila ada) satu persegi panjang tiap kotak. */
export function DiagramTitik({ m }: { m: Meja }) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-md border-2 border-dashed border-[#1D4ED8] bg-[#EFF6FF] p-1.5" role="group" aria-label="diagram" data-uji="diagram-titik" data-rupa="diagram">
      {m.baris.map((b, bi) => {
        const baris = Math.ceil(b.n / 10);
        return (
          <div key={b.label} className="mb-1" data-baris={b.label} data-n={b.n}>
            <p className="text-[11px] font-black leading-tight text-[#1E3A8A]">
              {b.label}: {b.n}
            </p>
            <svg viewBox={`0 0 142 ${baris * 13 + 2}`} className="h-auto w-full max-w-[210px]" role="img" aria-label={`${b.n} titik`}>
              {Array.from({ length: b.n }, (_, q) => (
                <circle key={q} cx={7 + (q % 10) * 13 + (q % 10 >= 5 ? 6 : 0)} cy={7 + Math.floor(q / 10) * 13} r={5} fill={WARNA_TITIK[bi % WARNA_TITIK.length]} stroke="#1E3A8A" strokeWidth={0.8} />
              ))}
            </svg>
          </div>
        );
      })}
      {m.kotak !== null ? (
        <div data-kotak={m.kotak}>
          <p className="text-[11px] font-black leading-tight text-[#1E3A8A]">Kotak: {m.kotak}</p>
          <svg viewBox="0 0 312 30" className="h-auto w-full" role="img" aria-label={`${m.kotak} kotak`}>
            {Array.from({ length: m.kotak }, (_, q) => (
              <g key={q}>
                <rect x={3 + q * 26} y={3} width={22} height={24} rx={2} fill="#FFFFFF" stroke="#1D4ED8" strokeWidth={1.6} />
                <line x1={3 + q * 26} y1={10} x2={25 + q * 26} y2={10} stroke="#1D4ED8" strokeWidth={1.2} />
              </g>
            ))}
          </svg>
        </div>
      ) : null}
      {m.catatan ? <p className="mt-0.5 text-center text-xs font-black text-[#1E3A8A]">{m.catatan}</p> : null}
    </div>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu lembar pengelola pasar (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu lembar pengelola pasar">
      <p className="text-xs font-black uppercase tracking-wide text-[#78350F]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
      <span className="absolute -right-1 -top-3 rotate-6 rounded-full border-2 border-[#B91C1C] bg-[#FEE2E2] px-2 text-[10px] font-black text-[#991B1B]" aria-hidden="true">
        cap pengelola
      </span>
    </div>
  );
}
const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#78350F]">
        {b}
      </p>
    ))}
  </div>
);
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { rencana: "kartu cara", daftar: "kartu faktor", bagi: "kartu kotak", besar: "kartu FPB" };

/** Kartu situasi (tugas memilih cara): kotak keadaan tanpa petunjuk jawaban. */
function KartuSituasi({ r, rupa }: { r: number; rupa: "benda" | "diagram" }) {
  return (
    <div
      className={`mx-auto max-w-[360px] rounded-xl border-[3px] p-2 text-center ${rupa === "benda" ? "border-[#92400E] bg-[#FEF3C7]" : "border-[#1D4ED8] bg-[#EFF6FF]"}`}
      data-uji="kartu-situasi"
    >
      <p className="text-sm font-black text-[#1C01A5]">
        {rupa === "benda" ? <span aria-hidden="true">{EMOJI_KOTAK} </span> : null}
        {RENCANA[r].teks}
      </p>
    </div>
  );
}

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  if (d.tipe === "rencana") return <KartuSituasi r={d.r} rupa={rupa} />;
  const meja = modelMeja(d);
  return (
    <div className="space-y-1.5">
      {meja ? rupa === "benda" ? <MejaBenda m={meja} /> : <DiagramTitik m={meja} /> : null}
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
