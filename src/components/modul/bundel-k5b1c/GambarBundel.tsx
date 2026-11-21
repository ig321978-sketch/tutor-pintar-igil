"use client";

import React from "react";
import { barisKartu, dasarDari, tampilan, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { KOLOM, TATA, TINGGI_BUNDEL, lambang, tataBundel, type Susunan } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab C (bundel tiket):
 * Concrete = rak gudang tiket dengan bundel berwarna dan ikon beremoji, Pictorial = bagan bundel polos di kertas (kotak SVG berwarna, tanpa emoji),
 * Abstract = kartu tabel dan angka bercap panitia (tanpa gambar). Bundel DIGAMBAR dari data lewat tataBundel (logika-data.ts): sungguh sebanyak banyak bundel tiap kolom.
 * Dipakai bersama oleh tugas CPA (LangkahBundel) dan Simulasi Tukar Bundel.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_BUNDEL = {
  benda: { latar: "#FFFBEB", garis: "#92400E", angka: "#78350F", sorot: "#FDE68A" },
  diagram: { latar: "#EFF6FF", garis: "#1E3A8A", angka: "#1E3A8A", sorot: "#FEF08A" },
} as const;
export const warnaBundel = (rupa: Rupa) => (rupa === "benda" ? WARNA_BUNDEL.benda : WARNA_BUNDEL.diagram);

/** Warna bundel tiap kolom: Concrete berwarna kardus, Pictorial kotak polos berwarna. */
const ISI_BENDA = ["#B45309", "#F59E0B", "#FDE047", "#FB923C", "#FFFFFF"];
const GARIS_BENDA = ["#7C2D12", "#B45309", "#A16207", "#C2410C", "#78716C"];
const ISI_DIAGRAM = ["#DDD6FE", "#BFDBFE", "#BBF7D0", "#FED7AA", "#E5E7EB"];
const GARIS_DIAGRAM = ["#6D28D9", "#1D4ED8", "#15803D", "#C2410C", "#475569"];

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaBundel(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <rect key={i} x={i * 15} y={0} width={15} height={5} fill={i % 2 === 0 ? "#FACC15" : "#1F2937"} />
          ))}
        </g>
      ) : null}
      <text x={150} y={17} textAnchor="middle" fontSize={judul.length > 30 ? 11.5 : 13.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

export type MenuLegenda = "tampil" | "nama";

/** Satu bundel: kardus, dus, pak, ikat, atau lembar. */
function Bundel({ x, y, w, kolom, rupa }: { x: number; y: number; w: number; kolom: number; rupa: Rupa }) {
  const h = TINGGI_BUNDEL[kolom];
  const benda = rupa === "benda";
  const isi = (benda ? ISI_BENDA : ISI_DIAGRAM)[kolom];
  const garis = (benda ? GARIS_BENDA : GARIS_DIAGRAM)[kolom];
  return (
    <g data-bundel={KOLOM[kolom].bundel}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2.5} fill={isi} stroke={garis} strokeWidth={1.6} />
      {benda && kolom <= 1 ? <rect x={x - 1.5} y={y - h / 2} width={3} height={h} fill={garis} fillOpacity={0.45} /> : null}
      {benda && kolom === 3 ? <line x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} stroke={garis} strokeWidth={1.4} /> : null}
    </g>
  );
}

/** Papan bundel: nama kolom (dan isi satu bundel bila `legenda` tampil) di kiri, dan deret bundel sungguh sebanyak data. `tandai` menyorot baris. */
export function PapanBundel({ s, rupa, tandai = [], legenda = "tampil", judul, label }: { s: Susunan; rupa: Rupa; tandai?: number[]; legenda?: MenuLegenda; judul?: string; label?: string }) {
  const t = tataBundel(s);
  const w = warnaBundel(rupa);
  const benda = rupa === "benda";
  const xNama = benda ? 26 : TATA.xNama;
  return (
    <Gambar rupa={rupa} label={label ?? `${benda ? "Rak gudang" : "Bagan bundel"}: ${s.map((c, i) => `${c} ${KOLOM[i].bundel}`).join(", ")}`} judul={judul ?? (benda ? "rak gudang tiket" : "bagan bundel")} tinggi={t.tinggi}>
      <g data-papan="bundel">
        {t.baris.map((b, r) => (
          <g key={b.bundel} data-baris={b.bundel} data-banyak={b.banyak}>
            {tandai.includes(r) ? <rect x={2} y={TATA.atas + r * TATA.barisTinggi} width={296} height={TATA.barisTinggi} rx={5} fill={w.sorot} opacity={0.75} /> : null}
            <line x1={4} y1={TATA.atas + (r + 1) * TATA.barisTinggi} x2={296} y2={TATA.atas + (r + 1) * TATA.barisTinggi} stroke={w.garis} strokeOpacity={0.25} strokeWidth={1} />
            {benda ? (
              <text x={13} y={b.y + 5} textAnchor="middle" fontSize={14}>
                {KOLOM[r].ikon}
              </text>
            ) : null}
            <text x={xNama} y={legenda === "tampil" ? b.y - 1 : b.y + 4.5} fontSize={12.5} fontWeight={900} fill={w.angka}>
              {b.bundel}
            </text>
            {legenda === "tampil" ? (
              <text x={xNama} y={b.y + 11} fontSize={10.5} fontWeight={700} fill={w.angka}>
                {lambang(KOLOM[r].bobot)}
              </text>
            ) : null}
            {b.banyak === 0 ? (
              <text x={TATA.xBundel + 2} y={b.y + 4} fontSize={11} fontWeight={700} fontStyle="italic" fill="#6B7280">
                kosong
              </text>
            ) : null}
            {b.sel.map((p, i) => (
              <Bundel key={i} x={p.x} y={p.y} w={Math.max(8, b.cell - 3)} kolom={r} rupa={rupa} />
            ))}
          </g>
        ))}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FCA5A5] bg-[#FFF7F7] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B91C1C]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#450A0A]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#B91C1C] bg-[#FEF2F2] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(185,28,28,0.14) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#1D4ED8] px-1 text-[10px] font-black text-[#1D4ED8]" aria-hidden="true">
      PANITIA STADION
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "baca bundel",
  urai: "uraikan bilangan",
  tukar: "tukar bundel",
  susun: "susun kembali",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  const t = tampilan(d, cara, rupa);
  return <PapanBundel s={t.s} rupa={rupa} tandai={t.tandai} legenda={t.legenda} judul={t.judul} />;
}
