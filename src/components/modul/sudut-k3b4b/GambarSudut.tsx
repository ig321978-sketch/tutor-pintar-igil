"use client";

import React from "react";
import { barisKartu, dasarDari, jenisDari, LANGKAH_TEKS, type Cara, type Langkah, type LBaca, type LCacah, type LHitung, type LJenis, type LLangkah, type LSebut, type Rupa, type Sisi } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab B (sudut pada bidang datar):
 * sudut dengan dua kaki (Concrete: bilah bambu dan benda layang-layang beremoji, Pictorial: kaki polos berwarna), pojok kertas lipat bergaris putus, busur derajat dengan dua skala,
 * deret sudut kecil berhuruf, dan kartu kata, angka, dan lambang derajat (Abstract). Besar sudut sungguh sebesar derajatnya.
 * Dipakai bersama oleh tugas CPA (LangkahSudut) dan Simulasi Lapangan Sudut.
 */
const UNGU = "#1C01A5";
const C_TANYA = "#D97706";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const C_LUAR = "#1D4ED8";
const C_DALAM = "#047857";
const C_PERTAMA = "#15803D";
const C_KEDUA = "#DC2626";

/** Emoji benda layang-layang dan festival untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). */
export const EMOJI_BENDA: Record<string, string> = {
  "layang-layang": "\u{1FA81}",
  "bilah bambu": "\u{1F38B}",
  bendera: "\u{1F38F}",
  "tali layang-layang": "\u{1F9F5}",
  "kertas lipat": "\u{1F4C4}",
  gunting: "\u{2702}",
  balon: "\u{1F388}",
  pita: "\u{1F380}",
  "penggaris segitiga": "\u{1F4D0}",
  "tali bendera": "\u{1F38F}",
  "bilah pagar": "\u{1F38B}",
  "tiang tenda": "\u{1F38B}",
  "bilah layang-layang": "\u{1FA81}",
  "tali lomba": "\u{1F9F5}",
  "kipas kertas": "\u{1F4C4}",
  "papan lurus": "\u{1F38B}",
};

export function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

const rad = (d: number): number => (d * Math.PI) / 180;
const bulatkan = (n: number): number => Math.round(n * 100) / 100;
/** Titik sejauh `len` dari (cx, cy) ke arah `deg` derajat (0 = ke kanan, berlawanan arah jarum jam). */
export const ujung = (cx: number, cy: number, len: number, deg: number): { x: number; y: number } => ({ x: bulatkan(cx + len * Math.cos(rad(deg))), y: bulatkan(cy - len * Math.sin(rad(deg))) });
/** Jalur juring dari arah `dari` ke `ke` derajat (berlawanan arah jarum jam) berjari-jari r. */
export function jalurJuring(cx: number, cy: number, r: number, dari: number, ke: number): string {
  const sapuan = ke - dari;
  if (sapuan >= 359.9) return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const a = ujung(cx, cy, r, dari);
  const b = ujung(cx, cy, r, ke);
  return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${sapuan > 180 ? 1 : 0} 0 ${b.x} ${b.y} Z`;
}

type Gaya = { kaki: string; isi: string; garis: string };
const gayaRupa = (rupa: Rupa): Gaya => (rupa === "benda" ? { kaki: "#CA8A04", isi: "#FEF3C7", garis: "#92400E" } : { kaki: "#2563EB", isi: "#DBEAFE", garis: UNGU });

/** Sudut berkaki dua di (cx, cy): kaki pertama ke arah `dari`, kaki kedua ke arah `ke`, dengan juring pengisi. `emoji` di ujung kaki kedua. */
export function SudutKaki({ cx, cy, len, dari = 0, ke, rupa, emoji, juring = true, tebal = 5 }: { cx: number; cy: number; len: number; dari?: number; ke: number; rupa: Rupa; emoji?: string; juring?: boolean; tebal?: number }) {
  const g = gayaRupa(rupa);
  const a = ujung(cx, cy, len, dari);
  const b = ujung(cx, cy, len, ke);
  const e = ujung(cx, cy, len + 14, ke);
  return (
    <g aria-hidden="true">
      {juring ? <path d={jalurJuring(cx, cy, len * 0.55, dari, ke)} fill={g.isi} stroke={g.garis} strokeWidth={1} opacity={0.95} /> : null}
      <line x1={cx} y1={cy} x2={a.x} y2={a.y} stroke={g.kaki} strokeWidth={tebal} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={b.x} y2={b.y} stroke={rupa === "benda" ? "#B45309" : "#DC2626"} strokeWidth={tebal} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={4} fill="#DC2626" stroke={UNGU} strokeWidth={1.2} />
      {emoji ? (
        <text x={e.x} y={e.y + 6} textAnchor="middle" fontSize={18}>
          {emoji}
        </text>
      ) : null}
    </g>
  );
}

/** Pojok kertas lipat: persegi bergaris putus dengan tanda siku, pojok kiri-bawahnya di (cx, cy) dan kakinya ke kanan dan ke atas. */
export function PojokKertas({ cx, cy, s = 34, label = true }: { cx: number; cy: number; s?: number; label?: boolean }) {
  return (
    <g aria-hidden="true">
      <rect x={cx} y={cy - s} width={s} height={s} fill="#FFFFFF" fillOpacity={0.5} stroke="#DC2626" strokeWidth={1.6} strokeDasharray="4 3" />
      <polyline points={`${cx + 8},${cy} ${cx + 8},${cy - 8} ${cx},${cy - 8}`} fill="none" stroke="#DC2626" strokeWidth={1.4} />
      {label ? (
        <text x={cx + s / 2} y={cy + 10} textAnchor="middle" fontSize={7.6} fontWeight={800} fill="#B91C1C">
          pojok kertas
        </text>
      ) : null}
    </g>
  );
}

/**
 * Busur derajat dengan titik tengah (cx, cy) dan jari-jari R: skala luar (biru, 0 di kanan sampai 180 di kiri) dan skala dalam (hijau, 0 di kiri sampai 180 di kanan), tanda tiap lima derajat.
 * Kaki pertama ada di garis nol pada sisi `sisi`; kaki kedua membentuk sudut `deg`. Angka tiap sepuluh derajat. `kecil`: tanpa angka (hanya ikon).
 */
export function BusurSvg({ cx = 150, cy = 165, R = 118, deg, sisi, rupa, emoji, kecil = false, tanpaKaki = false }: { cx?: number; cy?: number; R?: number; deg: number; sisi: Sisi; rupa: Rupa; emoji?: string; kecil?: boolean; tanpaKaki?: boolean }) {
  const g = gayaRupa(rupa);
  const phi = sisi === "kanan" ? deg : 180 - deg;
  const garisBusur: React.ReactNode[] = [];
  for (let t = 0; t <= 180; t += 5) {
    const panjang = t % 10 === 0 ? 9 : 5;
    const a = ujung(cx, cy, R, t);
    const b = ujung(cx, cy, R - panjang, t);
    garisBusur.push(<line key={`g${t}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={UNGU} strokeWidth={t % 10 === 0 ? 1 : 0.6} />);
    if (!kecil && t % 10 === 0) {
      const p = ujung(cx, cy, R - 17, t);
      const q = ujung(cx, cy, R - 32, t);
      garisBusur.push(
        <text key={`a${t}`} x={p.x} y={p.y + 2.8} textAnchor="middle" fontSize={7.6} fontWeight={800} fill={C_LUAR} stroke="#F0F9FF" strokeWidth={2.4} paintOrder="stroke">
          {t}
        </text>,
        <text key={`b${t}`} x={q.x} y={q.y + 2.8} textAnchor="middle" fontSize={7.6} fontWeight={800} fill={C_DALAM} stroke="#F0F9FF" strokeWidth={2.4} paintOrder="stroke">
          {180 - t}
        </text>,
      );
    }
  }
  const arah1 = sisi === "kanan" ? 0 : 180;
  const k1 = ujung(cx, cy, R + 10, arah1);
  const k2 = ujung(cx, cy, R + 10, phi);
  const e = ujung(cx, cy, R + 24, phi);
  const dari = Math.min(arah1, phi);
  const ke = Math.max(arah1, phi);
  return (
    <g aria-hidden="true">
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} fill={rupa === "benda" ? "#E0F2FE" : "#F0F9FF"} stroke={UNGU} strokeWidth={1.6} />
      {!tanpaKaki ? (
        <>
          <path d={jalurJuring(cx, cy, R * 0.3, dari, ke)} fill={g.isi} stroke={g.garis} strokeWidth={0.8} opacity={0.9} />
          <line x1={cx} y1={cy} x2={k1.x} y2={k1.y} stroke={C_PERTAMA} strokeWidth={2.4} strokeLinecap="round" opacity={0.8} />
          <line x1={cx} y1={cy} x2={k2.x} y2={k2.y} stroke={C_KEDUA} strokeWidth={2.4} strokeLinecap="round" opacity={0.8} />
        </>
      ) : null}
      {garisBusur}
      <circle cx={cx} cy={cy} r={3.4} fill="#DC2626" stroke={UNGU} strokeWidth={1} />
      {emoji && !tanpaKaki ? (
        <text x={e.x} y={e.y + 6} textAnchor="middle" fontSize={16}>
          {emoji}
        </text>
      ) : null}
    </g>
  );
}

const emojiBenda = (rupa: Rupa, benda: string): string | undefined => (rupa === "benda" ? EMOJI_BENDA[benda] : undefined);

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#BFDBFE] bg-[#1E3A8A] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#FDE68A]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-white">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#1D4ED8] bg-[#DBEAFE] p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilBaca({ l, rupa }: { l: LBaca; rupa: Rupa }) {
  return (
    <Gambar label="Membaca busur derajat" judul={`kaki pertama di garis nol pada sisi ${l.sisi}`}>
      <BusurSvg deg={l.deg} sisi={l.sisi} rupa={rupa} emoji={emojiBenda(rupa, l.benda)} />
      <text x={150} y={193} textAnchor="middle" fontSize={12} fontWeight={900} fill={C_TANYA}>
        besar sudut = ?
      </text>
    </Gambar>
  );
}
function TampilJenis({ l, rupa }: { l: LJenis; rupa: Rupa }) {
  const cx = 110;
  const cy = 112;
  return (
    <Gambar label={l.acuan ? "Sudut dan dua sudut acuan" : "Sudut dan pojok kertas lipat"} judul={l.acuan ? "bandingkan dengan acuan siku-siku dan lurus" : "bandingkan dengan pojok kertas lipat"}>
      {l.acuan ? (
        <g aria-hidden="true">
          <line x1={cx} y1={cy} x2={cx} y2={cy - 72} stroke="#64748B" strokeWidth={1.4} strokeDasharray="4 3" />
          <line x1={cx} y1={cy} x2={cx - 72} y2={cy} stroke="#64748B" strokeWidth={1.4} strokeDasharray="4 3" />
          <text x={cx + 4} y={cy - 74} fontSize={8} fontWeight={800} fill="#475569">
            siku-siku 90°
          </text>
          <text x={cx - 74} y={cy + 12} fontSize={8} fontWeight={800} fill="#475569">
            lurus 180°
          </text>
        </g>
      ) : (
        <PojokKertas cx={cx} cy={cy} />
      )}
      <SudutKaki cx={cx} cy={cy} len={70} ke={l.deg} rupa={rupa} emoji={emojiBenda(rupa, l.benda)} />
      <text x={236} y={96} textAnchor="middle" fontSize={9} fontWeight={800} fill="#475569">
        besar sudut
      </text>
      <text x={236} y={114} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
        {l.deg}°
      </text>
      <text x={150} y={193} textAnchor="middle" fontSize={12} fontWeight={900} fill={C_TANYA}>
        jenis sudut = ?
      </text>
    </Gambar>
  );
}
function TampilHitung({ l, rupa }: { l: LHitung; rupa: Rupa }) {
  const g = gayaRupa(rupa);
  const cx = 105;
  const cy = 112;
  const r = 70;
  return (
    <Gambar label="Sudut dan satu pojok kertas" judul="berapa pojok kertas yang muat?">
      <path d={jalurJuring(cx, cy, r, 0, l.deg)} fill={g.isi} stroke={g.garis} strokeWidth={1.6} />
      <path d={jalurJuring(cx, cy, r, 0, 90)} fill="#FCA5A5" stroke="#DC2626" strokeWidth={1.6} />
      <polyline points={`${cx + 10},${cy} ${cx + 10},${cy - 10} ${cx},${cy - 10}`} fill="none" stroke="#7F1D1D" strokeWidth={1.4} />
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#DC2626" strokeWidth={2.4} />
      <circle cx={cx} cy={cy} r={3.4} fill="#DC2626" stroke={UNGU} strokeWidth={1} />
      {rupa === "benda" ? (
        <text x={cx + 38} y={cy - 38} textAnchor="middle" fontSize={16}>
          {"\u{1F4C4}"}
        </text>
      ) : null}
      <text x={236} y={62} textAnchor="middle" fontSize={9} fontWeight={800} fill="#B91C1C">
        satu pojok kertas
      </text>
      <text x={236} y={79} textAnchor="middle" fontSize={15} fontWeight={900} fill="#B91C1C">
        90°
      </text>
      <text x={236} y={108} textAnchor="middle" fontSize={9} fontWeight={800} fill="#475569">
        sudut ini
      </text>
      <text x={236} y={125} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
        {l.deg}°
      </text>
      <text x={150} y={193} textAnchor="middle" fontSize={12} fontWeight={900} fill={C_TANYA}>
        banyak pojok kertas = ?
      </text>
    </Gambar>
  );
}
function TampilCacah({ l, rupa }: { l: LCacah; rupa: Rupa }) {
  const g = gayaRupa(rupa);
  return (
    <Gambar label="Deret sudut berhuruf" judul={`hitung sudut ${l.jenis}; kotak merah = pojok kertas`}>
      {l.daftar.map((d, i) => {
        const x0 = 12 + (i % 4) * 72;
        const y0 = 24 + Math.floor(i / 4) * 84;
        const cx = x0 + 36;
        const cy = y0 + 58;
        const a = ujung(cx, cy, 30, 0);
        const b = ujung(cx, cy, 30, d);
        return (
          <g key={i} aria-hidden="true">
            <rect x={x0} y={y0} width={68} height={76} rx={6} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth={1} />
            <path d={jalurJuring(cx, cy, 16, 0, d)} fill={g.isi} stroke={g.garis} strokeWidth={0.8} />
            <rect x={cx} y={cy - 14} width={14} height={14} fill="none" stroke="#DC2626" strokeWidth={1} strokeDasharray="3 2" />
            <line x1={cx} y1={cy} x2={a.x} y2={a.y} stroke={g.kaki} strokeWidth={3} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={b.x} y2={b.y} stroke={rupa === "benda" ? "#B45309" : "#DC2626"} strokeWidth={3} strokeLinecap="round" />
            <text x={x0 + 8} y={y0 + 12} fontSize={11} fontWeight={900} fill={UNGU}>
              {String.fromCharCode(65 + i)}
            </text>
          </g>
        );
      })}
      {rupa === "benda" ? (
        <text x={286} y={20} textAnchor="end" fontSize={14}>
          {EMOJI_BENDA[l.benda] ?? ""}
        </text>
      ) : null}
      <text x={150} y={196} textAnchor="middle" fontSize={11} fontWeight={900} fill={C_TANYA}>
        {`banyak sudut ${l.jenis} = ?`}
      </text>
    </Gambar>
  );
}
/** Bagi satu kalimat pendek menjadi dua baris di tengah kata. */
function duaBaris(t: string): [string, string] {
  const k = t.split(" ");
  const tengah = Math.ceil(k.length / 2);
  return [k.slice(0, tengah).join(" "), k.slice(tengah).join(" ")];
}
function TampilLangkah({ l, rupa, cara }: { l: LLangkah; rupa: Rupa; cara: Cara }) {
  const g = gayaRupa(rupa);
  const [b1, b2] = duaBaris(LANGKAH_TEKS[l.nomor - 1]);
  const tanya = cara === "kanvas";
  return (
    <Gambar label="Empat langkah memakai busur derajat" judul="busur derajat dipakai dengan empat langkah">
      <rect x={14} y={26} width={272} height={62} rx={10} fill={g.isi} stroke={g.garis} strokeWidth={1.6} />
      {tanya ? (
        <>
          <text x={150} y={52} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
            {b1}
          </text>
          <text x={150} y={72} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
            {b2}
          </text>
        </>
      ) : (
        <text x={150} y={63} textAnchor="middle" fontSize={17} fontWeight={900} fill={UNGU}>
          {`langkah ke-${l.nomor}`}
        </text>
      )}
      {[1, 2, 3, 4].map((n) => (
        <g key={n} aria-hidden="true">
          <circle cx={46 + (n - 1) * 70} cy={124} r={17} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
          <text x={46 + (n - 1) * 70} y={130} textAnchor="middle" fontSize={16} fontWeight={900} fill={UNGU}>
            {n}
          </text>
        </g>
      ))}
      <line x1={63} y1={124} x2={29 + 70} y2={124} stroke="#94A3B8" strokeWidth={1.4} strokeDasharray="3 3" />
      <line x1={133} y1={124} x2={99 + 70} y2={124} stroke="#94A3B8" strokeWidth={1.4} strokeDasharray="3 3" />
      <line x1={203} y1={124} x2={169 + 70} y2={124} stroke="#94A3B8" strokeWidth={1.4} strokeDasharray="3 3" />
      <text x={150} y={176} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {tanya ? "langkah ke berapa = ?" : "kegiatan = ?"}
      </text>
    </Gambar>
  );
}
function TampilSebut({ l, rupa }: { l: LSebut; rupa: Rupa }) {
  return (
    <Gambar label={l.tanya === "alat" ? "Alat ukur sudut" : "Satuan besar sudut"} judul={l.tanya === "alat" ? "alat apa untuk mengukur sudut?" : "satuan apa untuk besar sudut?"}>
      <BusurSvg cx={150} cy={160} R={116} deg={65} sisi="kanan" rupa={rupa} emoji={emojiBenda(rupa, l.benda)} />
      <text x={150} y={188} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {l.tanya === "alat" ? "alat ukur: ?" : "satuan: ?"}
      </text>
    </Gambar>
  );
}

const JUDUL_KARTU: Record<string, string> = {
  baca: "Membaca busur derajat",
  jenis: "Jenis sudut",
  hitung: "Pojok kertas dalam sudut",
  cacah: "Menghitung sudut",
  langkah: "Langkah memakai busur",
  sebut: "Alat dan satuan sudut",
};

/** Gambar tugas dasar menurut jenis dan rupa. Abstract memakai kartu kata, angka, dan lambang derajat. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  switch (d.tipe) {
    case "baca":
      return <TampilBaca l={d} rupa={rupa} />;
    case "jenis":
      return <TampilJenis l={d} rupa={rupa} />;
    case "hitung":
      return <TampilHitung l={d} rupa={rupa} />;
    case "cacah":
      return <TampilCacah l={d} rupa={rupa} />;
    case "langkah":
      return <TampilLangkah l={d} rupa={rupa} cara={cara} />;
    case "sebut":
      return <TampilSebut l={d} rupa={rupa} />;
  }
}

/** Jenis sudut dari besarnya, dipakai Simulasi untuk label. */
export { jenisDari };
