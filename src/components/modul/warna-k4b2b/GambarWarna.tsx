"use client";

import React from "react";
import { barisKartu, dasarDari, type Cara, type Langkah, type LangkahDasar, type LBanding, type LBatang, type LGaris, type LPembilang, type Rupa } from "./logika-cpa";
import { potongBatang, xTanda } from "./geometri";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract K4 Bab 2 Sub-Bab B (membandingkan dan mengurutkan pecahan berpenyebut sama):
 * Concrete = bak pewarna berpetak dan kartu kain dengan benda sanggar beremoji (kaus, rok, pita, baju, palet) dan garis jemuran,
 * Pictorial = batang, kartu pecahan, dan garis pecahan polos (tanpa emoji), Abstract = kartu kata dan angka.
 * Pecahan digambar benar: batang dibagi sama besar tanpa celah (geometri.ts, diuji di Node), bagian berarsir sungguh sebanyak pembilang dari kiri, dan semua bagian digambar sebagai kisi tetap (tanpa baris yang membungkus sendiri).
 * Pecahan tampil bertingkat (pembilang, garis, penyebut). Sorotan tidak membocorkan jawaban. Dipakai bersama oleh tugas CPA (LangkahWarna).
 */
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda sanggar untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  kaus: "\u{1F455}",
  rok: "\u{1F457}",
  pita: "\u{1F380}",
  baju: "\u{1F45A}",
  palet: "\u{1F3A8}",
  kimono: "\u{1F458}",
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

/** Pecahan bertingkat di SVG: pembilang, garis, penyebut. (x, y) = titik tengah pembilang (garis dasar teks). */
export function PecSvg({ x, y, p, q, u = 16, warna = UNGU, warnaP }: { x: number; y: number; p: number; q: number; u?: number; warna?: string; warnaP?: string }) {
  return (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize={u} fontWeight={900} fill={warnaP ?? warna}>
        {p}
      </text>
      <line x1={x - u * 0.45} y1={y + u * 0.2} x2={x + u * 0.45} y2={y + u * 0.2} stroke={warna} strokeWidth={1.8} strokeLinecap="round" />
      <text x={x} y={y + u * 1.05} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {q}
      </text>
    </g>
  );
}

const GAYA = (rupa: Rupa) => ({
  tepi: rupa === "benda" ? "#6B4423" : "#1D4ED8",
  petak: rupa === "benda" ? "#6B4423" : "#1D4ED8",
  tebal: rupa === "benda" ? 1 : 1.8,
  tinta: rupa === "benda" ? "#451A03" : "#1E3A8A",
  isi: rupa === "benda" ? "#FEF3C7" : "#EFF6FF",
  garisKartu: rupa === "benda" ? "#B45309" : "#1D4ED8",
});
const WARNA_ISI = (rupa: Rupa, atas: boolean): string => (rupa === "benda" ? (atas ? "#3B82F6" : "#EF4444") : atas ? "#93C5FD" : "#FCA5A5");

/* ------------------------------ Batang pecahan (bak) ------------------------------ */
/** Batang atau bak dari x0 selebar lebar, dibagi q petak sama besar, p petak pertama berarsir. Concrete memakai bingkai kayu bak pewarna. */
export function Batang({ p, q, x0, y, lebar, tinggi, rupa, warna }: { p: number; q: number; x0: number; y: number; lebar: number; tinggi: number; rupa: Rupa; warna: string }) {
  const petak = potongBatang(p, q, x0, lebar);
  const g = GAYA(rupa);
  return (
    <g>
      {rupa === "benda" ? <rect x={x0 - 3} y={y - 3} width={lebar + 6} height={tinggi + 6} rx={5} fill="#B7814A" stroke="#6B4423" strokeWidth={1.6} /> : null}
      {petak.map((c, i) => (
        <rect key={i} x={c.x} y={y} width={c.w} height={tinggi} fill={c.arsir ? warna : "#FFFFFF"} stroke={g.petak} strokeWidth={g.tebal} />
      ))}
    </g>
  );
}

/* ------------------------------ Metode IGIL: dua bak dengan pecahannya ------------------------------ */
function PapanBanding({ l, rupa }: { l: LBanding; rupa: Rupa }) {
  const emoji = EMOJI_BENDA[l.benda] ?? "\u{1F3A8}";
  const g = GAYA(rupa);
  const baris = [l.a, l.b];
  return (
    <Gambar label={`Dua bak dengan pecahannya: ${l.benda}`} judul={rupa === "benda" ? `dua bak pewarna ${l.benda}` : "dua pecahan"}>
      <rect x={6} y={22} width={288} height={170} rx={8} fill={g.isi} stroke={g.garisKartu} strokeWidth={rupa === "benda" ? 4 : 3} />
      {baris.map((n, r) => {
        const y = 34 + r * 78;
        return (
          <g key={r}>
            {rupa === "benda" ? (
              <text x={28} y={y + 30} textAnchor="middle" fontSize={20} aria-hidden="true">
                {emoji}
              </text>
            ) : null}
            <Batang p={n} q={l.q} x0={50} y={y + 8} lebar={176} tinggi={34} rupa={rupa} warna={WARNA_ISI(rupa, r === 0)} />
            <text x={138} y={y + 62} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={g.tinta}>
              {r === 0 ? "pecahan pertama" : "pecahan kedua"}
            </text>
            <PecSvg x={264} y={y + 26} p={n} q={l.q} u={17} warna={UNGU} warnaP={MERAH} />
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Compare Numerators: dua kartu pecahan ------------------------------ */
function PapanPembilang({ l, rupa }: { l: LPembilang; rupa: Rupa }) {
  const emoji = EMOJI_BENDA[l.benda] ?? "\u{1F3A8}";
  const g = GAYA(rupa);
  const kartu = [l.a, l.b];
  return (
    <Gambar label={`Dua pecahan berpenyebut sama: ${l.benda}`} judul={rupa === "benda" ? `dua kartu kain ${l.benda}` : "dua pecahan"}>
      {kartu.map((n, i) => {
        const x = 14 + i * 144;
        const cx = x + 64;
        return (
          <g key={i}>
            <rect x={x} y={26} width={128} height={150} rx={10} fill={g.isi} stroke={g.garisKartu} strokeWidth={rupa === "benda" ? 4 : 2.5} />
            {rupa === "benda" ? (
              <text x={cx} y={66} textAnchor="middle" fontSize={28} aria-hidden="true">
                {emoji}
              </text>
            ) : null}
            <PecSvg x={cx} y={rupa === "benda" ? 108 : 88} p={n} q={l.q} u={34} warna={UNGU} warnaP={MERAH} />
            <text x={cx} y={164} textAnchor="middle" fontSize={9} fontWeight={900} fill={g.tinta}>
              {i === 0 ? "pecahan pertama" : "pecahan kedua"}
            </text>
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Fraction Bars: dua batang ------------------------------ */
function PapanBatang({ l, rupa }: { l: LBatang; rupa: Rupa }) {
  const emoji = EMOJI_BENDA[l.benda] ?? "\u{1F3A8}";
  const g = GAYA(rupa);
  const baris = [l.a, l.b];
  return (
    <Gambar label={`Dua batang yang dibagi ${l.q} bagian sama besar: ${l.benda}`} judul={rupa === "benda" ? `dua bak pewarna ${l.benda}` : "dua batang"}>
      <rect x={6} y={22} width={288} height={170} rx={8} fill={g.isi} stroke={g.garisKartu} strokeWidth={rupa === "benda" ? 4 : 3} />
      {baris.map((n, r) => {
        const y = 50 + r * 76;
        return (
          <g key={r}>
            <text x={22} y={y - 8} fontSize={9.4} fontWeight={900} fill={g.tinta}>
              {r === 0 ? "batang atas" : "batang bawah"}
            </text>
            <Batang p={n} q={l.q} x0={22} y={y} lebar={236} tinggi={34} rupa={rupa} warna={WARNA_ISI(rupa, r === 0)} />
            {rupa === "benda" ? (
              <text x={278} y={y + 28} textAnchor="middle" fontSize={20} aria-hidden="true">
                {emoji}
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={150} y={182} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        {`tiap batang dibagi sama besar`}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Order on Line: garis dari nol sampai satu ------------------------------ */
const X0 = 24;
const LEBAR = 252;
function GarisPecahan({ l, rupa, cara }: { l: LGaris; rupa: Rupa; cara: Cara }) {
  const emoji = EMOJI_BENDA[l.benda] ?? "\u{1F3A8}";
  const g = GAYA(rupa);
  const y = 116;
  const tampilLabel = cara !== "kanvas";
  const tandai = cara !== "klik";
  const garisWarna = rupa === "benda" ? "#6B4423" : "#1E3A8A";
  return (
    <Gambar label={`Garis dari nol sampai satu dibagi ${l.q} bagian sama besar`} judul={rupa === "benda" ? `tali jemuran ${l.benda}` : "garis pecahan"}>
      <rect x={6} y={22} width={288} height={170} rx={8} fill={g.isi} stroke={g.garisKartu} strokeWidth={rupa === "benda" ? 4 : 3} />
      <line x1={X0} y1={y} x2={X0 + LEBAR} y2={y} stroke={garisWarna} strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: l.q + 1 }, (_, i) => (
        <line key={i} x1={xTanda(l.q, i, X0, LEBAR)} y1={i === 0 || i === l.q ? y - 8 : y - 5} x2={xTanda(l.q, i, X0, LEBAR)} y2={i === 0 || i === l.q ? y + 8 : y + 5} stroke={garisWarna} strokeWidth={2} />
      ))}
      <text x={X0} y={y + 26} textAnchor="middle" fontSize={10} fontWeight={900} fill={g.tinta}>
        0
      </text>
      <text x={X0 + LEBAR} y={y + 26} textAnchor="middle" fontSize={10} fontWeight={900} fill={g.tinta}>
        1
      </text>
      {l.data.map((n, idx) => {
        const x = xTanda(l.q, n, X0, LEBAR);
        const bertanda = tandai && idx === l.tandai;
        return (
          <g key={idx}>
            {tampilLabel ? (
              <>
                <PecSvg x={x} y={56} p={n} q={l.q} u={13} warna={UNGU} warnaP={MERAH} />
                <line x1={x} y1={72} x2={x} y2={rupa === "benda" ? y - 24 : y - 8} stroke="#7C3AED" strokeWidth={1.2} strokeDasharray="3 2" />
              </>
            ) : null}
            {rupa === "benda" ? (
              <text x={x} y={y - 6} textAnchor="middle" fontSize={20} aria-hidden="true">
                {emoji}
              </text>
            ) : (
              <circle cx={x} cy={y} r={7} fill="#FACC15" stroke={g.tinta} strokeWidth={2} />
            )}
            {bertanda ? (
              <>
                <circle cx={x} cy={y} r={11} fill="none" stroke={MERAH} strokeWidth={2.6} />
                <polygon points={`${x - 6},${y + 24} ${x + 6},${y + 24} ${x},${y + 14}`} fill={MERAH} />
              </>
            ) : null}
          </g>
        );
      })}
      <text x={150} y={176} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        {tandai ? "titik bertanda merah" : "pecahan pada garis"}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#D6A27A] bg-[#FFF3E0] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9A3412]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#451A03]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#C2410C] bg-[#FFF7ED] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  banding: "membandingkan dua pecahan",
  pembilang: "banding pembilang",
  batang: "batang pecahan",
  garis: "urut di garis",
};

/* ------------------------------ Teks pecahan bertingkat di tombol dan kalimat ------------------------------ */
/** Tulisan berisi pecahan ("3/8" atau "2/9, 5/9") ditampilkan dengan pecahan bertingkat; teks lain apa adanya. */
export function TeksPecahan({ teks }: { teks: string }) {
  const bagian = teks.split(/(\d+\/\d+)/g).filter((b) => b !== "");
  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-0.5">
      {bagian.map((b, i) => {
        const m = /^(\d+)\/(\d+)$/.exec(b);
        return m ? (
          <span key={i} className="inline-flex flex-col items-center align-middle leading-none" aria-hidden="true">
            <span className="px-0.5 text-[0.95em]">{m[1]}</span>
            <span className="h-[2px] w-full min-w-[0.9em] rounded bg-current" />
            <span className="px-0.5 text-[0.95em]">{m[2]}</span>
          </span>
        ) : (
          <span key={i}>{b}</span>
        );
      })}
    </span>
  );
}

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
    case "banding":
      return <PapanBanding l={d} rupa={rupa} />;
    case "pembilang":
      return <PapanPembilang l={d} rupa={rupa} />;
    case "batang":
      return <PapanBatang l={d} rupa={rupa} />;
    case "garis":
      return <GarisPecahan l={d} rupa={rupa} cara={cara} />;
  }
}
