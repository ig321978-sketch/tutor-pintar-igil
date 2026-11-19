"use client";

import React from "react";
import { NAMA_TEMPAT, angkaTempat, barisKartu, dasarDari, rb, tandaGaris, terbesar, terkecil, type Cara, type Langkah, type LangkahDasar, type LGaris, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract K4 Bab 1 Sub-Bab C (membandingkan dan mengurutkan bilangan sampai sepuluh ribu):
 * Concrete = papan dermaga kayu dengan benda pulau wisata beremoji (perahu, kerang, payung, kelapa, tiket) dan kotak tempat angka berwarna,
 * Pictorial = peta laut dengan bagan tempat angka, kartu bilangan, dan garis bilangan polos (tanpa emoji), Abstract = kartu kata dan angka.
 * Bilangan selalu tampil dengan titik ribuan. Tanda dan sorotan tidak membocorkan jawaban.
 * Dipakai bersama oleh tugas CPA (LangkahDermaga) dan Simulasi Papan Dermaga.
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
export const WARNA_KOTAK = ["#FECACA", "#FDE68A", "#BBF7D0", "#BFDBFE"] as const;

/** Emoji benda pulau wisata untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  perahu: "\u{1F6A4}",
  sampan: "\u{1F6F6}",
  kerang: "\u{1F41A}",
  payung: "\u{1F3D6}",
  kelapa: "\u{1F965}",
  tiket: "\u{1F3AB}",
  pulau: "\u{1F3DD}",
  pohon: "\u{1F334}",
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

const PAPAN = (rupa: Rupa) => ({
  isi: rupa === "benda" ? "#E7C48F" : "#EFF6FF",
  garis: rupa === "benda" ? "#6B4423" : "#1D4ED8",
  tebal: rupa === "benda" ? 4 : 3,
  tinta: rupa === "benda" ? "#451A03" : "#1E3A8A",
});

/* ------------------------------ Bagan tempat angka: dua bilangan (banding dan kiri) ------------------------------ */
/** Papan dua bilangan sejajar dalam empat kolom tempat angka (ribuan, ratusan, puluhan, satuan). Concrete: papan kayu beremoji; Pictorial: bagan polos di peta laut. */
function PapanTempat({ a, b, rupa, benda, judul }: { a: number; b: number; rupa: Rupa; benda: string; judul: string }) {
  const p = PAPAN(rupa);
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F6A4}";
  const baris = [a, b];
  return (
    <Gambar label={`Dua bilangan dalam bagan tempat angka: ${judul}`} judul={judul}>
      <rect x={6} y={22} width={288} height={160} rx={8} fill={p.isi} stroke={p.garis} strokeWidth={p.tebal} />
      {NAMA_TEMPAT.map((n, i) => (
        <text key={n} x={110 + i * 46} y={42} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={p.tinta}>
          {n}
        </text>
      ))}
      {baris.map((n, r) => {
        const y = 50 + r * 62;
        return (
          <g key={r}>
            {rupa === "benda" ? (
              <text x={28} y={y + 26} textAnchor="middle" fontSize={20} aria-hidden="true">
                {emoji}
              </text>
            ) : null}
            <text x={rupa === "benda" ? 28 : 34} y={y + (rupa === "benda" ? 42 : 30)} textAnchor="middle" fontSize={9.4} fontWeight={900} fill={p.tinta}>
              {r === 0 ? "pertama" : "kedua"}
            </text>
            {angkaTempat(n).map((d, i) => (
              <g key={i}>
                <rect x={88 + i * 46} y={y} width={44} height={46} rx={6} fill={rupa === "benda" ? WARNA_KOTAK[i] : "#FFFFFF"} stroke={rupa === "benda" ? "#6B4423" : WARNA_KOTAK[i]} strokeWidth={rupa === "benda" ? 1.6 : 3} />
                <text x={110 + i * 46} y={y + 34} textAnchor="middle" fontSize={27} fontWeight={900} fill={UNGU}>
                  {d}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      <text x={150} y={176} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        bandingkan dari tempat paling kiri
      </text>
    </Gambar>
  );
}

/* ------------------------------ Garis bilangan ------------------------------ */
const XG = (i: number): number => 22 + i * 25.6;
function GarisBilangan({ l, rupa }: { l: LGaris; rupa: Rupa }) {
  const p = PAPAN(rupa);
  const ia = tandaGaris(l, l.a);
  const ib = tandaGaris(l, l.b);
  const emojiA = "\u{1F6A4}";
  const emojiB = "\u{1F6F6}";
  const garisWarna = rupa === "benda" ? "#6B4423" : "#1E3A8A";
  return (
    <Gambar label={`Garis bilangan dari ${rb(l.mulai)} sampai ${rb(l.mulai + 10 * l.langkah)}`} judul={rupa === "benda" ? `garis bilangan ${l.benda}` : "garis bilangan"}>
      <rect x={6} y={24} width={288} height={156} rx={8} fill={p.isi} stroke={p.garis} strokeWidth={p.tebal} />
      <line x1={XG(0)} y1={104} x2={XG(10)} y2={104} stroke={garisWarna} strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={XG(i)} y1={i % 5 === 0 ? 96 : 98} x2={XG(i)} y2={i % 5 === 0 ? 112 : 110} stroke={garisWarna} strokeWidth={2} />
      ))}
      <text x={XG(0)} y={126} textAnchor="middle" fontSize={9} fontWeight={900} fill={p.tinta}>
        {rb(l.mulai)}
      </text>
      <text x={XG(10)} y={126} textAnchor="middle" fontSize={9} fontWeight={900} fill={p.tinta}>
        {rb(l.mulai + 10 * l.langkah)}
      </text>
      {[ia, ib].map((i, q) =>
        rupa === "benda" ? (
          <text key={q} x={XG(i)} y={97} textAnchor="middle" fontSize={20} aria-hidden="true">
            {q === 0 ? emojiA : emojiB}
          </text>
        ) : (
          <circle key={q} cx={XG(i)} cy={104} r={7} fill={q === 0 ? "#FACC15" : "#F472B6"} stroke={p.tinta} strokeWidth={2} />
        ),
      )}
      <line x1={XG(ia)} y1={66} x2={XG(ia)} y2={86} stroke="#7C3AED" strokeWidth={1.4} strokeDasharray="3 2" />
      <text x={XG(ia)} y={60} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#7C3AED">
        {`A ${rb(l.a)}`}
      </text>
      <line x1={XG(ib)} y1={116} x2={XG(ib)} y2={136} stroke="#DB2777" strokeWidth={1.4} strokeDasharray="3 2" />
      <text x={XG(ib)} y={150} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#DB2777">
        {`B ${rb(l.b)}`}
      </text>
      <text x={150} y={172} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        {`tiap petak = ${rb(l.langkah)}`}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu bilangan ------------------------------ */
function KartuRak({ data, rupa, sorotKe = -1, judul }: { data: number[]; rupa: Rupa; sorotKe?: number; judul: string }) {
  const p = PAPAN(rupa);
  const lebar = 64;
  const celah = data.length > 3 ? 8 : 14;
  const total = data.length * lebar + (data.length - 1) * celah;
  const x0 = (300 - total) / 2;
  return (
    <Gambar label={`Kartu bilangan: ${judul}`} judul={judul}>
      <rect x={6} y={26} width={288} height={110} rx={8} fill={p.isi} stroke={p.garis} strokeWidth={p.tebal} />
      {data.map((n, i) => {
        const x = x0 + i * (lebar + celah);
        return (
          <g key={`${n}-${i}`}>
            <rect x={x} y={46} width={lebar} height={70} rx={8} fill="#FFFFFF" stroke={i === sorotKe ? "#DC2626" : rupa === "benda" ? "#B7814A" : "#93C5FD"} strokeWidth={i === sorotKe ? 4 : 2} />
            {rupa === "benda" ? (
              <text x={x + lebar / 2} y={72} textAnchor="middle" fontSize={18} aria-hidden="true">
                {"\u{1F3AB}"}
              </text>
            ) : null}
            <text x={x + lebar / 2} y={rupa === "benda" ? 102 : 88} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
              {rb(n)}
            </text>
            {i === sorotKe ? <polygon points={`${x + lebar / 2 - 7},${128} ${x + lebar / 2 + 7},${128} ${x + lebar / 2},${118}`} fill="#DC2626" /> : null}
          </g>
        );
      })}
      <text x={150} y={158} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#B45309">
        kartu bilangan di papan
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#D6B98A] bg-[#FDF3DC] px-3 py-2 text-left shadow-inner">
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
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#0369A1] bg-[#F0F9FF] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(3,105,161,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  banding: "membandingkan dua bilangan",
  kiri: "banding dari kiri",
  garis: "garis bilangan",
  kartu: "urut kartu",
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
    case "banding":
    case "kiri":
      return <PapanTempat a={d.a} b={d.b} rupa={rupa} benda={d.benda} judul={rupa === "benda" ? `dua bilangan ${d.benda}` : "dua bilangan"} />;
    case "garis":
      return <GarisBilangan l={d} rupa={rupa} />;
    case "kartu": {
      const sorot = cara === "suara" ? d.data.indexOf(d.cari === "kecil" ? terkecil(d.data) : terbesar(d.data)) : -1;
      return <KartuRak data={d.data} rupa={rupa} sorotKe={sorot} judul={rupa === "benda" ? `kartu ${d.benda}` : "kartu bilangan"} />;
    }
  }
}
