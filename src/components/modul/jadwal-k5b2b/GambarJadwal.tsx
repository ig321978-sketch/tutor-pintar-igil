"use client";

import React from "react";
import { SK } from "./skenario";
import { angkaTugas, barisKartu, daftarTugas, judulKartu, ketGambar, type Cara, type Langkah, type LangkahDasar, type Rupa, dasarDari } from "./logika-cpa";
import { KOLOM_TABEL, tabelBilangan } from "./logika-data";

/**
 * Gambar tugas CPA Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno": papan jadwal pasar dengan deret kelipatan beremoji lama (Concrete),
 * tabel bilangan berwarna dan daftar polos tanpa emoji (Pictorial), dan kartu jadwal pengelola pasar tanpa gambar (Abstract).
 * Semua deret kelipatan dan sel tabel digambar dari fungsi murni (logika-data.ts) sebanyak datanya, tanpa skor dan tanpa jaringan.
 */

type RupaGambar = "benda" | "diagram";
const WARNA = {
  benda: { garis: "#B45309", latar: "#FFF7ED", sumbu: "#7C2D12", baris: ["#FEE2E2", "#DBEAFE", "#FEF9C3"] },
  diagram: { garis: "#7C3AED", latar: "#F5F3FF", sumbu: "#4C1D95", baris: ["#EDE9FE", "#E0E7FF", "#F3E8FF"] },
} as const;
const BIRU_SEL = "#BFDBFE";
const JINGGA_GARIS = "#EA580C";

/* ------------------------------ Deret kelipatan ------------------------------ */
/** Tiap bilangan satu baris: nama jadwal (beremoji bila Concrete) lalu kelipatannya berderet sebagai kotak kecil sampai batas. */
export function DaftarKelipatan({ d, rupa }: { d: LangkahDasar; rupa: RupaGambar }) {
  const w = WARNA[rupa];
  const S = SK[d.s];
  const an = angkaTugas(d);
  const daftar = daftarTugas(d);
  return (
    <div className="mx-auto w-full max-w-[340px] space-y-1.5 rounded-xl border-2 p-1.5" style={{ borderColor: w.garis, background: w.latar }} role="img" aria-label={`daftar kelipatan: ${an.map((x, i) => `kelipatan ${x}: ${daftar[i].join(", ")}`).join("; ")}`}>
      {an.map((x, i) => (
        <div key={`${x}-${i}`} data-baris={x}>
          <p className="mb-0.5 text-xs font-black leading-tight" style={{ color: "#1C01A5" }}>
            {rupa === "benda" && S.ikon ? <span aria-hidden="true">{S.ikon[i]} </span> : null}
            {S.nama[i]}: tiap {x} {S.satuan}
          </p>
          <div className="flex flex-wrap gap-1">
            {daftar[i].map((n) => (
              <span key={n} className="flex h-[26px] min-w-[30px] items-center justify-center rounded-md border-2 px-1 text-xs font-black" style={{ borderColor: w.garis, background: w.baris[i % 3], color: "#1C01A5" }} data-sel={n}>
                {n}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Tabel bilangan ------------------------------ */
/** Tabel bilangan 1 sampai w: kelipatan bilangan pertama berlatar biru, kelipatan bilangan kedua berbingkai jingga, kelipatan keduanya memakai kedua tanda. */
export function TabelBilanganGambar({ d }: { d: LangkahDasar }) {
  const an = angkaTugas(d);
  const sel = tabelBilangan(an, d.w);
  const baris = Math.ceil(d.w / KOLOM_TABEL);
  return (
    <div className="mx-auto w-full max-w-[320px] space-y-1 rounded-xl border-2 p-1.5" style={{ borderColor: "#7C3AED", background: "#F5F3FF" }} role="img" aria-label={`tabel bilangan satu sampai ${d.w}: kelipatan ${an[0]} berlatar biru, kelipatan ${an[1]} berbingkai jingga`} data-baris-tabel={baris}>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${KOLOM_TABEL}, minmax(0, 1fr))` }}>
        {sel.map((c) => (
          <span
            key={c.n}
            className="flex h-[28px] items-center justify-center rounded-sm text-xs font-black"
            style={{ background: c.dalam[0] ? BIRU_SEL : "#FFFFFF", border: c.dalam[1] ? `3px solid ${JINGGA_GARIS}` : "1px solid #CBD5E1", color: "#1C01A5" }}
            data-sel={c.n}
            data-a={c.dalam[0] ? "1" : "0"}
            data-b={c.dalam[1] ? "1" : "0"}
          >
            {c.n}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-xs font-black" style={{ color: "#4C1D95" }}>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-4 rounded-sm" style={{ background: BIRU_SEL, border: "1px solid #CBD5E1" }} aria-hidden="true" /> kelipatan {an[0]}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-4 rounded-sm bg-white" style={{ border: `3px solid ${JINGGA_GARIS}` }} aria-hidden="true" /> kelipatan {an[1]}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu jadwal pengelola pasar (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu jadwal pengelola pasar">
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

/** Gambar dasar sebuah tugas menurut rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, "kartu jadwal")} baris={barisKartu(d, cara)} />;
  const gambar = rupa === "benda" || angkaTugas(d).length > 2 ? <DaftarKelipatan d={d} rupa={rupa === "benda" ? "benda" : "diagram"} /> : <TabelBilanganGambar d={d} />;
  return (
    <div className="space-y-1.5">
      {gambar}
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
