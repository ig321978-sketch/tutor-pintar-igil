"use client";

import React from "react";
import { barisKartu, dasarDari, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { TATA, tataPik, teksKeterangan, type Pik } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 6 Sub-Bab A (piktogram):
 * Concrete = papan data bazar di tenda dengan ikon jajanan beremoji, Pictorial = diagram polos di kertas berpetak (bulatan dan kotak SVG, tanpa emoji),
 * Abstract = kartu tabel dan angka bercap panitia (tanpa gambar). Ikon DIGAMBAR dari data lewat tataPik (logika-data.ts): banyak ikon sama dengan banyak data dibagi keterangan.
 * Dipakai bersama oleh tugas CPA (LangkahJajanan) dan Simulasi Piktogram Jajanan.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_JAJANAN = {
  benda: { latar: "#FFF7ED", garis: "#991B1B", angka: "#7C2D12", sorot: "#FDE68A" },
  diagram: { latar: "#F0FDF4", garis: "#166534", angka: "#14532D", sorot: "#FEF08A" },
} as const;
export const warnaJajanan = (rupa: Rupa) => (rupa === "benda" ? WARNA_JAJANAN.benda : WARNA_JAJANAN.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaJajanan(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 30} y={0} width={30} height={5} fill={i % 2 === 0 ? "#DC2626" : "#FFFFFF"} />
          ))}
        </g>
      ) : null}
      <text x={150} y={17} textAnchor="middle" fontSize={13.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Ikon satu sel: emoji (Concrete) atau bulatan dan kotak polos bergantian menurut baris (Pictorial). */
const Ikon = ({ x, y, ikon, baris, rupa }: { x: number; y: number; ikon: string; baris: number; rupa: Rupa }) =>
  rupa === "benda" ? (
    <text x={x} y={y + 6} textAnchor="middle" fontSize={18} data-ikon="1">
      {ikon}
    </text>
  ) : baris % 2 === 0 ? (
    <circle cx={x} cy={y} r={8.5} fill="#BBF7D0" stroke="#15803D" strokeWidth={1.8} data-ikon="1" />
  ) : (
    <rect x={x - 8} y={y - 8} width={16} height={16} rx={3} fill="#BFDBFE" stroke="#1D4ED8" strokeWidth={1.8} data-ikon="1" />
  );

export type MenuLegenda = "tampil" | "tanya" | "sembunyi";
const Legenda = ({ y, teks, rupa }: { y: number; teks: string; rupa: Rupa }) => (
  <g>
    <rect x={8} y={y} width={284} height={22} rx={6} fill="#FFFFFF" stroke={warnaJajanan(rupa).garis} strokeWidth={1.6} strokeDasharray="4 3" />
    <text x={150} y={y + 16} textAnchor="middle" fontSize={13.5} fontWeight={900} fill={warnaJajanan(rupa).angka}>
      {teks}
    </text>
  </g>
);

/** Papan piktogram: nama baris, deret ikon sungguh sebanyak data dibagi keterangan, dan keterangan di bawah. `tandai` menyorot baris. */
export function PapanPik({ p, rupa, tandai = [], legenda = "tampil", judul, label }: { p: Pik; rupa: Rupa; tandai?: number[]; legenda?: MenuLegenda; judul?: string; label?: string }) {
  const t = tataPik(p);
  const w = warnaJajanan(rupa);
  const benda = rupa === "benda";
  return (
    <Gambar rupa={rupa} label={label ?? `${benda ? "Papan data" : "Diagram"} ${p.judul}`} judul={judul ?? `${benda ? "papan data bazar" : "diagram"}: ${p.judul}`} tinggi={t.tinggi}>
      <g data-papan="pik" data-skala={p.skala}>
        {t.baris.map((b, r) => (
          <g key={`${b.nama}-${r}`} data-baris={b.nama} data-ikon-baris={b.ikon}>
            {tandai.includes(r) ? <rect x={2} y={TATA.atas + r * TATA.baris} width={296} height={TATA.baris} rx={5} fill={w.sorot} opacity={0.7} /> : null}
            <line x1={4} y1={TATA.atas + (r + 1) * TATA.baris} x2={296} y2={TATA.atas + (r + 1) * TATA.baris} stroke={w.garis} strokeOpacity={0.25} strokeWidth={1} />
            <text x={TATA.xNama} y={b.y + 5} fontSize={13.5} fontWeight={900} fill={w.angka}>
              {b.nama}
            </text>
            {b.sel.map((s, i) => (
              <Ikon key={i} x={s.x} y={s.y} ikon={p.seri[r].ikon} baris={r} rupa={rupa} />
            ))}
          </g>
        ))}
        {legenda === "sembunyi" ? null : <Legenda y={t.legendaY} teks={legenda === "tanya" ? `keterangan: 1 ikon = ? ${p.satuan}` : `keterangan: ${teksKeterangan(p)}`} rupa={rupa} />}
      </g>
    </Gambar>
  );
}

/** Tabel data yang akan digambar: nama baris dan banyak data; baris `i` diberi kotak "? ikon" bila `tanyaIkon`. */
export function TabelData({ p, rupa, i, tanyaIkon, legenda }: { p: Pik; rupa: Rupa; i?: number; tanyaIkon?: boolean; legenda: MenuLegenda }) {
  const w = warnaJajanan(rupa);
  const benda = rupa === "benda";
  const atas = 26;
  const tinggi = atas + p.seri.length * 26 + 36;
  return (
    <Gambar rupa={rupa} label={`Tabel data ${p.judul}`} judul={`${benda ? "papan data bazar" : "tabel"}: ${p.judul}`} tinggi={tinggi}>
      <g data-papan="tabel">
        {p.seri.map((s, r) => (
          <g key={`${s.nama}-${r}`} data-baris={s.nama}>
            {i === r ? <rect x={2} y={atas + r * 26} width={296} height={26} rx={5} fill={w.sorot} opacity={0.7} /> : null}
            <line x1={4} y1={atas + (r + 1) * 26} x2={296} y2={atas + (r + 1) * 26} stroke={w.garis} strokeOpacity={0.25} strokeWidth={1} />
            <text x={12} y={atas + r * 26 + 18} fontSize={13.5} fontWeight={900} fill={w.angka}>
              {benda ? `${s.ikon} ${s.nama}` : s.nama}
            </text>
            <text x={124} y={atas + r * 26 + 18} fontSize={13.5} fontWeight={900} fill={w.angka}>
              {`${s.banyak} ${p.satuan}`}
            </text>
            {tanyaIkon && i === r ? (
              <g>
                <rect x={204} y={atas + r * 26 + 3} width={84} height={20} rx={5} fill="#FFFFFF" stroke={w.garis} strokeWidth={1.4} strokeDasharray="4 3" />
                <text x={246} y={atas + r * 26 + 17} textAnchor="middle" fontSize={13.5} fontWeight={900} fill="#B45309">
                  ? ikon
                </text>
              </g>
            ) : null}
          </g>
        ))}
        {legenda === "sembunyi" ? null : <Legenda y={atas + p.seri.length * 26 + 6} teks={legenda === "tanya" ? `keterangan: 1 ikon = ? ${p.satuan}` : `keterangan: ${teksKeterangan(p)}`} rupa={rupa} />}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#C4B5FD] bg-[#FAF5FF] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#6D28D9]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#3B0764]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#7E22CE] bg-[#F3E8FF] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(126,34,206,0.16) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#B91C1C] px-1 text-[10px] font-black text-[#B91C1C]" aria-hidden="true">
      PANITIA BAZAR
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "membaca keterangan",
  hitung: "hitung ikon",
  tabel: "tabel data",
  urut: "urutkan dan banding",
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
  switch (d.tipe) {
    case "igil":
      return <PapanPik p={d.p} rupa={rupa} />;
    case "hitung":
      return <PapanPik p={d.p} rupa={rupa} tandai={cara === "suara" ? [] : [d.i]} />;
    case "tabel":
      return <TabelData p={d.p} rupa={rupa} i={cara === "kanvas" ? d.i : undefined} tanyaIkon={cara === "kanvas"} legenda={cara === "klik" ? "tanya" : "tampil"} />;
    case "urut":
      return <PapanPik p={d.p} rupa={rupa} tandai={cara === "kanvas" || d.tanya === "selisih" ? [d.a, d.b] : []} />;
  }
}
