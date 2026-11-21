"use client";

import React from "react";
import { barisKartu, dasarDari, ucapkan, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { KANAN_JEM, KIRI_JEM, W_SER, W_SEP, X0_SEP, X0_SER, Y0_SER, H_SER, barisPenuh, lengkungJembatan, susunSepuluh, susunSeratus } from "./tata";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab D (pecahan per sepuluh dan per seratus menjadi desimal):
 * Concrete = kain satu meter pada meja ukur Pak Bagas, kisi sepuluh kolom dan seratus kotak berisi kain, pita, benang, atau wol beremoji (hanya pada bagian berwarna),
 * Pictorial = kisi polos dan jembatan polos di kertas milimeter, Abstract = kartu kata dan angka dengan pecahan bertingkat.
 * Bagian berwarna sungguh sebanyak datanya (tata.ts). Dipakai bersama oleh tugas CPA (LangkahMeteran) dan Simulasi Meteran Kain.
 */
const BIRU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda meja ukur untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  benang: "\u{1F9F5}",
  pita: "\u{1F380}",
  kain: "\u{1F9E3}",
  wol: "\u{1F9F6}",
};
const PALET: Record<"benda" | "diagram", { papan: string; garisPapan: string; isi: string; garis: string; kosong: string; judul: string }> = {
  benda: { papan: "#F8E3B0", garisPapan: "#7C4A1E", isi: "#C7D2FE", garis: "#4338CA", kosong: "#FFFBEB", judul: "#7C2D12" },
  diagram: { papan: "#ECFDF5", garisPapan: "#0F766E", isi: "#5EEAD4", garis: "#0F766E", kosong: "#FFFFFF", judul: "#115E59" },
};

export function Gambar({ label, judul, children, warna = BIRU }: { label: string; judul: string; children: React.ReactNode; warna?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={warna}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Pecahan bertingkat di SVG: pembilang di atas, garis, penyebut di bawah, berpusat di x. */
export function PecahSvg({ x, y, a, b, fs = 24 }: { x: number; y: number; a: number | string; b: number | string; fs?: number }) {
  const lebar = Math.max(String(a).length, String(b).length) * fs * 0.62 + 10;
  return (
    <g data-pecahan={`${a}/${b}`}>
      <text x={x} y={y} textAnchor="middle" fontSize={fs} fontWeight={900} fill={BIRU}>
        {a}
      </text>
      <line x1={x - lebar / 2} y1={y + 6} x2={x + lebar / 2} y2={y + 6} stroke={BIRU} strokeWidth={3} />
      <text x={x} y={y + 6 + fs} textAnchor="middle" fontSize={fs} fontWeight={900} fill={BIRU}>
        {b}
      </text>
    </g>
  );
}

/* ------------------------------ Kisi sepuluh kolom (Tenths Grid) ------------------------------ */
/** Kain satu meter dibagi sepuluh kolom sama besar; `p` kolom berwarna (Concrete: berisi benda beremoji). */
export function KisiSepuluh({ p, benda, rupa, judul, sorotWarna = false }: { p: number; benda: string; rupa: "benda" | "diagram"; judul: string; sorotWarna?: boolean }) {
  const c = PALET[rupa];
  const butir = EMOJI_BENDA[benda] ?? EMOJI_BENDA.kain;
  const sel = susunSepuluh(p);
  return (
    <Gambar label={`Kisi sepuluh kolom: ${judul}`} judul={judul} warna={c.judul}>
      <rect x={8} y={22} width={284} height={156} rx={6} fill={c.papan} stroke={c.garisPapan} strokeWidth={2.4} />
      {sel.map((s) => (
        <g key={s.kolom} data-kolom={s.kolom} data-warna={s.warna ? 1 : 0}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.warna ? c.isi : c.kosong} stroke={s.warna && sorotWarna ? "#DC2626" : c.garis} strokeWidth={s.warna && sorotWarna ? 2.6 : 1.4} />
          {rupa === "benda" && s.warna ? (
            <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 7} textAnchor="middle" fontSize={19} aria-hidden="true">
              {butir}
            </text>
          ) : null}
        </g>
      ))}
      <text x={X0_SEP} y={146} textAnchor="middle" fontSize={11} fontWeight={900} fill={c.judul}>
        0
      </text>
      <text x={X0_SEP + 10 * W_SEP} y={146} textAnchor="middle" fontSize={11} fontWeight={900} fill={c.judul}>
        1 meter
      </text>
      <text x={150} y={166} textAnchor="middle" fontSize={9} fontWeight={900} fill={c.judul}>
        tiap kolom: 1/10 meter
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kisi seratus kotak (Hundredths Grid) ------------------------------ */
/** Kain satu meter dibagi seratus kotak sama besar (sepuluh baris kali sepuluh kolom); `q` kotak berwarna dari baris atas. `sorotBaris`: baris penuh dibingkai merah. */
export function KisiSeratus({ q, benda, rupa, judul, sorotBaris = false }: { q: number; benda: string; rupa: "benda" | "diagram"; judul: string; sorotBaris?: boolean }) {
  const c = PALET[rupa];
  const butir = EMOJI_BENDA[benda] ?? EMOJI_BENDA.kain;
  const sel = susunSeratus(q);
  const penuh = barisPenuh(q);
  return (
    <Gambar label={`Kisi seratus kotak: ${judul}`} judul={judul} warna={c.judul}>
      <rect x={X0_SER - 8} y={Y0_SER - 4} width={10 * W_SER + 16} height={10 * H_SER + 8} rx={4} fill={c.papan} stroke={c.garisPapan} strokeWidth={2} />
      {sel.map((s) => (
        <g key={`${s.baris}-${s.kolom}`} data-baris={s.baris} data-kolom={s.kolom} data-warna={s.warna ? 1 : 0}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.warna ? c.isi : c.kosong} stroke={c.garis} strokeWidth={0.8} />
          {rupa === "benda" && s.warna ? (
            <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 4} textAnchor="middle" fontSize={11} aria-hidden="true">
              {butir}
            </text>
          ) : null}
        </g>
      ))}
      {sorotBaris && penuh > 0 ? <rect data-baris-penuh={penuh} x={X0_SER - 1} y={Y0_SER - 1} width={10 * W_SER + 2} height={penuh * H_SER + 2} fill="none" stroke="#DC2626" strokeWidth={2.4} /> : null}
      <text x={150} y={Y0_SER + 10 * H_SER + 16} textAnchor="middle" fontSize={9} fontWeight={900} fill={c.judul}>
        tiap kotak: 1/100 meter
      </text>
    </Gambar>
  );
}

/* ------------------------------ Jembatan (Fraction Decimal Bridge) ------------------------------ */
/** Pecahan di kiri dihubungkan jembatan ke desimal di kanan (`kanan` bisa "?"). Concrete: benda beremoji di atas jembatan. */
export function Jembatan({ m, den, kanan, benda, rupa, judul }: { m: number; den: number; kanan: string; benda: string; rupa: "benda" | "diagram"; judul: string }) {
  const c = PALET[rupa];
  const butir = EMOJI_BENDA[benda] ?? EMOJI_BENDA.kain;
  const tanya = kanan === "?";
  return (
    <Gambar label={`Jembatan pecahan ke desimal: ${judul}`} judul={judul} warna={c.judul}>
      <rect x={6} y={22} width={288} height={170} rx={6} fill={c.papan} stroke={c.garisPapan} strokeWidth={2.4} />
      {rupa === "benda" ? (
        <text x={150} y={52} textAnchor="middle" fontSize={22} aria-hidden="true">
          {butir}
        </text>
      ) : null}
      <path d={lengkungJembatan()} fill="none" stroke={c.garisPapan} strokeWidth={8} strokeLinecap="round" />
      <path d={lengkungJembatan()} fill="none" stroke={c.kosong} strokeWidth={3} strokeLinecap="round" strokeDasharray="6 5" />
      <rect x={KIRI_JEM.x} y={KIRI_JEM.y} width={KIRI_JEM.w} height={KIRI_JEM.h} rx={8} fill={c.isi} stroke={c.garis} strokeWidth={2.4} />
      <PecahSvg x={KIRI_JEM.x + KIRI_JEM.w / 2} y={KIRI_JEM.y + 36} a={m} b={den} />
      <rect x={KANAN_JEM.x} y={KANAN_JEM.y} width={KANAN_JEM.w} height={KANAN_JEM.h} rx={8} fill={tanya ? "#FFFFFF" : c.isi} stroke={tanya ? "#DC2626" : c.garis} strokeWidth={2.4} strokeDasharray={tanya ? "5 3" : undefined} />
      <text x={KANAN_JEM.x + KANAN_JEM.w / 2} y={KANAN_JEM.y + 52} textAnchor="middle" fontSize={kanan.length > 4 ? 22 : 26} fontWeight={900} fill={tanya ? "#DC2626" : BIRU}>
        {kanan}
      </text>
      <text x={KIRI_JEM.x + KIRI_JEM.w / 2} y={170} textAnchor="middle" fontSize={9} fontWeight={900} fill={c.judul}>
        pecahan
      </text>
      <text x={KANAN_JEM.x + KANAN_JEM.w / 2} y={170} textAnchor="middle" fontSize={9} fontWeight={900} fill={c.judul}>
        desimal
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#9DB4E8] bg-[#F5F8FF] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#3730A3]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#312E81]">
          {b}
        </span>
      ))}
    </div>
  );
}
/** Pecahan bertingkat untuk kartu: pembilang di atas garis, penyebut di bawah. */
export function PecahanTingkat({ a, b }: { a: number; b: number }) {
  return (
    <span className="mx-1 inline-flex flex-col items-center align-middle text-2xl font-black leading-none text-[#1C01A5]" role="img" aria-label={ucapkan(`${a}/${b}`)}>
      <span className="px-1.5">{a}</span>
      <span className="my-0.5 block h-[3px] w-full bg-[#1C01A5]" />
      <span className="px-1.5">{b}</span>
    </span>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#4338CA] bg-[#FFFDF5] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(67,56,202,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  sepuluh: "pecahan per sepuluh",
  seratus: "pecahan per seratus",
  jembatan: "jembatan desimal",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang") {
    return (
      <PapanInfo>
        {d.tipe === "jembatan" ? (
          <div className="flex justify-center py-1">
            <PecahanTingkat a={d.m} b={d.den} />
          </div>
        ) : null}
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  }
  const r: "benda" | "diagram" = rupa === "benda" ? "benda" : "diagram";
  const klaimTulis = d.klaim !== undefined && cara === "suara" ? `ditulis: ${d.klaim}` : null;
  switch (d.tipe) {
    case "sepuluh":
      return <KisiSepuluh p={d.p} benda={d.benda} rupa={r} judul={klaimTulis ?? "kain 1 meter dibagi sepuluh bagian sama"} />;
    case "seratus":
      return <KisiSeratus q={d.q} benda={d.benda} rupa={r} judul={klaimTulis ?? "kain 1 meter dibagi seratus bagian sama"} sorotBaris={cara === "kanvas"} />;
    case "jembatan":
      return <Jembatan m={d.m} den={d.den} kanan={d.klaim !== undefined && cara === "suara" ? d.klaim : "?"} benda={d.benda} rupa={r} judul="pecahan dan desimal" />;
  }
}
