"use client";

import React from "react";
import { arsirBawah, barisKartu, dasarDari, hasilBagi, hasilEkuiv, hasilKali, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab C (pecahan yang sama besar):
 * Concrete = batang kain berbagi bagian sama besar dan benda jahit beremoji di meja jahit, Pictorial = batang kain polos dan pecahan bertingkat di kertas pola,
 * Abstract = kartu kata dan angka. Bagian berarsir sungguh sebanyak pembilang dari penyebut, semua bagian sama besar. Dipakai bersama oleh tugas CPA (LangkahJahit) dan Simulasi Meja Jahit.
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda jahit untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_JAHIT: Record<string, string> = { benang: "\u{1F9F5}", baju: "\u{1F455}", pita: "\u{1F380}" };

export function Gambar({ label, judul, children, rupa = "benda" }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={200} rx={12} fill={rupa === "benda" ? "#FFF7ED" : "#EFF6FF"} />
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

const WARNA = {
  benda: { kain: "#FEF3C7", arsir: "#F472B6", garis: "#BE185D", angka: UNGU },
  diagram: { kain: "#FFFFFF", arsir: "#60A5FA", garis: "#1D4ED8", angka: "#1E3A8A" },
} as const;
const tema = (rupa: Rupa) => (rupa === "benda" ? WARNA.benda : WARNA.diagram);

/**
 * Batang kain berpojok kiri-atas (x, y), lebar w, tinggi h, dibagi `q` bagian sama besar. `arsir`: banyak bagian berarsir dari kiri,
 * atau daftar bagian yang diarsir. `aktif`: bagian bisa diketuk (Simulasi). Bagian berarsir sungguh sebanyak yang diminta.
 */
export function Batang({
  x,
  y,
  w,
  h,
  q,
  arsir,
  rupa,
  aktif,
  onKetuk,
  nama,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  q: number;
  arsir: number | readonly boolean[];
  rupa: Rupa;
  aktif?: boolean;
  onKetuk?: (i: number) => void;
  nama?: string;
}) {
  const t = tema(rupa);
  const lebar = w / q;
  return (
    <g role={aktif ? "group" : undefined} aria-label={nama}>
      {Array.from({ length: q }, (_, i) => {
        const terarsir = typeof arsir === "number" ? i < arsir : !!arsir[i];
        return (
          <rect
            key={i}
            data-bagian={i}
            x={x + i * lebar}
            y={y}
            width={lebar}
            height={h}
            fill={terarsir ? t.arsir : t.kain}
            stroke={t.garis}
            strokeWidth={q > 14 ? 0.9 : 1.4}
            onClick={aktif && onKetuk ? () => onKetuk(i) : undefined}
            style={aktif ? { cursor: "pointer" } : undefined}
            aria-label={aktif ? `Bagian ${i + 1} ${terarsir ? "diarsir" : "belum diarsir"}` : undefined}
          />
        );
      })}
      {rupa === "benda" ? <line x1={x} y1={y - 3} x2={x + w} y2={y - 3} stroke={t.garis} strokeWidth={1} strokeDasharray="4 3" /> : null}
    </g>
  );
}

/** Pecahan bertingkat: pembilang, garis, penyebut. Titik tengah garis (x, y), ukuran angka u. */
export function PecSvg({ x, y, p, q, u = 14, warna = UNGU }: { x: number; y: number; p: string | number; q: string | number; u?: number; warna?: string }) {
  const lebar = u * 0.55 * Math.max(String(p).length, String(q).length) + 8;
  return (
    <g>
      <text x={x} y={y - u * 0.28} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {p}
      </text>
      <line x1={x - lebar / 2} y1={y} x2={x + lebar / 2} y2={y} stroke={warna} strokeWidth={Math.max(1.4, u / 10)} />
      <text x={x} y={y + u * 0.8} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {q}
      </text>
    </g>
  );
}

/** Benda jahit beremoji di bawah gambar (hanya tahap Concrete). */
function DekorBenda({ rupa }: { rupa: Rupa }) {
  if (rupa !== "benda") return null;
  return (
    <g aria-hidden="true">
      <text x={40} y={190} textAnchor="middle" fontSize={18}>
        {EMOJI_JAHIT.benang}
      </text>
      <text x={150} y={190} textAnchor="middle" fontSize={18}>
        {EMOJI_JAHIT.baju}
      </text>
      <text x={260} y={190} textAnchor="middle" fontSize={18}>
        {EMOJI_JAHIT.pita}
      </text>
    </g>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#F9A8D4] bg-[#FDF2F8] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9D174D]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#500724]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#BE185D] bg-[#FCE7F3] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(157,23,77,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  ekuiv: "pecahan sama besar",
  daerah: "cocokkan daerah",
  kali: "kali bentuk satu",
  bagi: "bagi keduanya",
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
  const t = tema(rupa);
  switch (d.tipe) {
    case "ekuiv": {
      const [a, b] = hasilEkuiv(d);
      return (
        <Gambar rupa={rupa} label={`Kain dibagi ${d.q} bagian dengan ${d.p} bagian berarsir, dan kain kedua dibagi ${b} bagian`} judul="dua kain yang sama besar">
          <Batang x={70} y={28} w={200} h={26} q={d.q} arsir={d.p} rupa={rupa} />
          <PecSvg x={36} y={41} p={d.p} q={d.q} warna={t.angka} />
          <Batang x={70} y={78} w={200} h={26} q={b} arsir={cara === "suara" ? a : 0} rupa={rupa} />
          <PecSvg x={36} y={91} p={cara === "klik" ? "?" : cara === "kanvas" ? "?" : a} q={cara === "klik" ? "?" : b} warna={t.angka} />
          <text x={150} y={128} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.garis}>
            {cara === "suara" ? "pembilang dan penyebut dikali bilangan yang sama" : `pembilang dan penyebut dikali ${d.m}`}
          </text>
          <DekorBenda rupa={rupa} />
        </Gambar>
      );
    }
    case "daerah": {
      return (
        <Gambar rupa={rupa} label={`Kain atas dibagi ${d.q} bagian dengan ${d.p} bagian berarsir, kain bawah dibagi ${d.r} bagian`} judul="kain atas dan kain bawah">
          <Batang x={70} y={28} w={200} h={26} q={d.q} arsir={d.p} rupa={rupa} />
          <PecSvg x={36} y={41} p={d.p} q={d.q} warna={t.angka} />
          <Batang x={70} y={78} w={200} h={26} q={d.r} arsir={cara === "suara" ? d.t ?? 0 : 0} rupa={rupa} />
          <PecSvg x={36} y={91} p={cara === "suara" ? d.t ?? 0 : "?"} q={d.r} warna={t.angka} />
          <text x={150} y={128} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.garis}>
            {cara === "suara" ? "bandingkan arsiran kedua kain" : `kain bawah dibagi ${d.r} bagian`}
          </text>
          <DekorBenda rupa={rupa} />
        </Gambar>
      );
    }
    case "kali": {
      const [a, b] = hasilKali(d);
      return (
        <Gambar rupa={rupa} label={`Pecahan ${d.p} per ${d.q} dikali bentuk satu`} judul="kali bentuk satu">
          <PecSvg x={45} y={58} p={d.p} q={d.q} u={24} warna={t.angka} />
          <text x={88} y={66} textAnchor="middle" fontSize={22} fontWeight={900} fill={t.garis}>
            {"×"}
          </text>
          <rect x={108} y={26} width={44} height={64} rx={6} fill="none" stroke={t.garis} strokeWidth={1.6} strokeDasharray="4 3" />
          <PecSvg x={130} y={58} p={cara === "suara" ? d.m : "?"} q={cara === "suara" ? d.m : "?"} u={22} warna={t.garis} />
          <text x={172} y={66} textAnchor="middle" fontSize={22} fontWeight={900} fill={t.garis}>
            =
          </text>
          <PecSvg x={228} y={58} p={a} q={cara === "suara" ? "?" : b} u={24} warna={t.angka} />
          <Batang x={20} y={112} w={110} h={18} q={d.q} arsir={d.p} rupa={rupa} />
          {cara === "suara" ? null : <Batang x={170} y={112} w={110} h={18} q={b} arsir={a} rupa={rupa} />}
          <text x={150} y={156} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.garis}>
            bentuk satu: pembilang dan penyebut sama
          </text>
          <DekorBenda rupa={rupa} />
        </Gambar>
      );
    }
    case "bagi": {
      const [a, b] = hasilBagi(d);
      return (
        <Gambar rupa={rupa} label={`Pecahan ${d.P} per ${d.Q} dibagi bentuk satu`} judul="bagi keduanya">
          <PecSvg x={45} y={58} p={d.P} q={d.Q} u={24} warna={t.angka} />
          <text x={88} y={66} textAnchor="middle" fontSize={22} fontWeight={900} fill={t.garis}>
            {"÷"}
          </text>
          <rect x={108} y={26} width={44} height={64} rx={6} fill="none" stroke={t.garis} strokeWidth={1.6} strokeDasharray="4 3" />
          <PecSvg x={130} y={58} p={d.d} q={d.d} u={22} warna={t.garis} />
          <text x={172} y={66} textAnchor="middle" fontSize={22} fontWeight={900} fill={t.garis}>
            =
          </text>
          <PecSvg x={228} y={58} p={cara === "kanvas" ? a : "?"} q={cara === "klik" ? "?" : cara === "kanvas" ? "?" : b} u={24} warna={t.angka} />
          <Batang x={40} y={112} w={220} h={18} q={d.Q} arsir={d.P} rupa={rupa} />
          <text x={150} y={156} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.garis}>
            pembilang dan penyebut dibagi bilangan yang sama
          </text>
          <DekorBenda rupa={rupa} />
        </Gambar>
      );
    }
  }
}

/** Banyak bagian berarsir yang digambar tugas daerah (untuk uji). */
export const banyakArsirGambar = (d: LangkahDasar): number => (d.tipe === "daerah" ? arsirBawah(d) : 0);
