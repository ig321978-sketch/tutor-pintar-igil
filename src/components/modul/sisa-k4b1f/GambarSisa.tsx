"use client";

import React from "react";
import { barisKartu, barisSusun, dasarDari, judulKartu, uraian, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { hitungBalok, susunBalok } from "./balok";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab F (pengurangan bersusun sampai seribu):
 * Concrete = balok cacah (ratusan kotak, puluhan batang, satuan benda beremoji) di papan dermaga kayu, Pictorial = balok polos, garis bilangan polos, dan kartu bilangan di kertas petak,
 * Abstract = kartu kata dan angka dengan hitung susun tertulis. Balok digambar tepat sebanyak angka tiap tempatnya (balok.ts).
 * Dipakai bersama oleh tugas CPA (LangkahSisa) dan Simulasi Papan Sisa.
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda pulau wisata untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  sandal: "\u{1F461}",
  koper: "\u{1F9F3}",
  kelapa: "\u{1F965}",
  kerang: "\u{1F41A}",
  lentera: "\u{1F3EE}",
  keranjang: "\u{1F9FA}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
  payung: "\u{26F1}",
  tiket: "\u{1F3AB}",
  kamar: "\u{1F6CF}",
};

export function Gambar({ label, judul, rupa = "diagram", children }: { label: string; judul: string; rupa?: Rupa; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <defs>
        <pattern id="petak-sisa" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke="#BFDBFE" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect x={4} y={4} width={292} height={192} rx={8} fill={rupa === "benda" ? "#FEF3C7" : "url(#petak-sisa)"} stroke={rupa === "benda" ? "#92400E" : "#93C5FD"} strokeWidth={rupa === "benda" ? 3 : 1.4} />
      <text x={150} y={18} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/* ------------------------------ Baris balok ------------------------------ */
const WARNA_BENDA = { ratusan: ["#FDBA74", "#9A3412"], puluhan: ["#FDE68A", "#B45309"], satuan: ["#FECACA", "#B91C1C"] } as const;
const WARNA_POLOS = { ratusan: ["#BFDBFE", "#1D4ED8"], puluhan: ["#BBF7D0", "#15803D"], satuan: ["#FECACA", "#B91C1C"] } as const;

/** Satu baris balok cacah untuk bilangan `n` mulai (x, y): ratusan, puluhan, lalu satuan (benda beremoji di Concrete, kotak polos di Pictorial). */
export function BarisBalok({ n, x, y, rupa, emoji }: { n: number; x: number; y: number; rupa: Rupa; emoji: string }) {
  const balok = susunBalok(n, { x, y });
  const warna = rupa === "benda" ? WARNA_BENDA : WARNA_POLOS;
  return (
    <g aria-hidden="true" data-baris={n}>
      {balok.map((q, i) =>
        rupa === "benda" && q.jenis === "satuan" ? (
          <text key={i} data-balok="satuan" x={q.x + q.w / 2} y={q.y + q.h + 1} textAnchor="middle" fontSize={8}>
            {emoji}
          </text>
        ) : (
          <rect key={i} data-balok={q.jenis} x={q.x} y={q.y} width={q.w} height={q.h} rx={1} fill={warna[q.jenis][0]} stroke={warna[q.jenis][1]} strokeWidth={1} />
        ),
      )}
    </g>
  );
}
/** Banyak balok tiap jenis pada bilangan `n` (untuk keterangan dan uji). */
export const jumlahBalok = (n: number): [number, number, number] => hitungBalok(susunBalok(n, { x: 0, y: 0 }));

function PapanBaris({ nama, n, y, rupa, emoji }: { nama: string; n: number; y: number; rupa: Rupa; emoji: string }) {
  return (
    <g>
      <text x={16} y={y - 4} fontSize={9.4} fontWeight={900} fill="#7C2D12">
        {nama} {n}
      </text>
      <BarisBalok n={n} x={16} y={y} rupa={rupa} emoji={emoji} />
    </g>
  );
}

/* ------------------------------ Garis bilangan (hitung maju) ------------------------------ */
/** Garis bilangan dari `b` ke `a`; titik awal dan tujuan berlabel, tanpa lompatan (lompatan adalah jawaban). `emoji` menandai titik awal di Concrete. */
function GarisMaju({ a, b, rupa, emoji }: { a: number; b: number; rupa: Rupa; emoji: string }) {
  const benda = rupa === "benda";
  return (
    <g>
      <rect x={10} y={62} width={280} height={96} rx={6} fill={benda ? "#FDE68A" : "#FFFFFF"} stroke={benda ? "#92400E" : "#93C5FD"} strokeWidth={benda ? 2.4 : 1.4} opacity={0.9} />
      <line x1={30} y1={110} x2={270} y2={110} stroke={benda ? "#92400E" : "#1D4ED8"} strokeWidth={3} strokeLinecap="round" />
      <circle cx={40} cy={110} r={6} fill="#FACC15" stroke={UNGU} strokeWidth={1.6} />
      <circle cx={260} cy={110} r={6} fill="#FACC15" stroke={UNGU} strokeWidth={1.6} />
      {benda ? (
        <>
          <text x={40} y={92} textAnchor="middle" fontSize={16} aria-hidden="true">
            {emoji}
          </text>
          <text x={260} y={92} textAnchor="middle" fontSize={16} aria-hidden="true">
            {emoji}
          </text>
        </>
      ) : null}
      <text x={40} y={134} textAnchor="middle" fontSize={14} fontWeight={900} fill={UNGU}>
        {b}
      </text>
      <text x={260} y={134} textAnchor="middle" fontSize={14} fontWeight={900} fill={UNGU}>
        {a}
      </text>
      <path d="M52 100 Q150 66 248 100" fill="none" stroke="#DC2626" strokeWidth={2.4} strokeDasharray="5 4" />
      <text x={150} y={84} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DC2626">
        ?
      </text>
      <text x={150} y={150} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#B45309">
        hitung maju dari kecil ke besar
      </text>
    </g>
  );
}
export { GarisMaju };

/* ------------------------------ Kartu bilangan (Pictorial: cek) ------------------------------ */
function KartuBilangan({ nama, isi, judul }: { nama: string[]; isi: number[]; judul: string }) {
  const lebar = 84;
  const celah = 8;
  const total = isi.length * lebar + (isi.length - 1) * celah;
  const x0 = (300 - total) / 2;
  return (
    <Gambar label={`Kartu bilangan: ${judul}`} judul={judul}>
      {isi.map((n, i) => {
        const x = x0 + i * (lebar + celah);
        return (
          <g key={nama[i]}>
            <text x={x + lebar / 2} y={56} textAnchor="middle" fontSize={nama[i].length > 9 ? 9 : 10} fontWeight={900} fill="#1D4ED8">
              {nama[i]}
            </text>
            <rect x={x} y={64} width={lebar} height={60} rx={8} fill="#FFFFFF" stroke="#1D4ED8" strokeWidth={2.4} />
            <text x={x + lebar / 2} y={104} textAnchor="middle" fontSize={32} fontWeight={900} fill="#14532D">
              {n}
            </text>
          </g>
        );
      })}
      <text x={150} y={156} textAnchor="middle" fontSize={10} fontWeight={900} fill="#B45309">
        bilangan awal, dikurangkan, dan hasil yang dicatat
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#99F6E4] bg-[#F0FDFA] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#0F766E]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#134E4A]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#0F766E] bg-[#CCFBF1] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(15,118,110,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  susun: "pengurangan bersusun",
  ambil: "tempat yang mengambil",
  maju: "hitung maju",
  cek: "periksa dengan tambah",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang") {
    const susunTulis = barisSusun(d);
    return (
      <PapanInfo>
        <KartuKata judul={judulKartu(rupa, JUDUL_KARTU[d.tipe])} baris={barisKartu(d, cara)} />
        {susunTulis.length > 0 ? (
          <pre data-susun="tertulis" aria-label="Hitung susun tertulis" className={`mx-auto w-fit max-w-full rounded-md bg-white/90 py-1 font-black leading-tight text-[#134E4A] ${d.tipe === "susun" && d.panjang ? "px-2 text-sm" : "px-4 text-lg"}`}>
            {susunTulis.join("\n")}
          </pre>
        ) : null}
      </PapanInfo>
    );
  }
  const emoji = EMOJI_BENDA[d.benda] ?? "\u{1F9F3}";
  const sebut = rupa === "benda" ? d.benda : "bilangan";
  switch (d.tipe) {
    case "susun":
    case "ambil":
      return (
        <>
          {d.tipe === "susun" && d.panjang ? (
            <p data-uraian="susun-panjang" className="mx-auto mb-1 w-full max-w-[420px] rounded-lg bg-white/90 px-2 py-1 text-center text-sm font-black leading-snug text-[#7C2D12]">
              <span className="block">{`${d.a} = ${uraian(d.a)}`}</span>
              <span className="block">{`${d.b} = ${uraian(d.b)}`}</span>
            </p>
          ) : null}
          <Gambar label={`Balok cacah: ${d.a} dikurangi ${d.b}`} judul={`${sebut} ada dan ${sebut} yang dikurangkan`} rupa={rupa}>
          <PapanBaris nama={rupa === "benda" ? "ada" : "bilangan awal"} n={d.a} y={52} rupa={rupa} emoji={emoji} />
          <PapanBaris nama={rupa === "benda" ? "dikurangkan" : "dikurangkan"} n={d.b} y={102} rupa={rupa} emoji={emoji} />
          <text x={150} y={150} textAnchor="middle" fontSize={10} fontWeight={900} fill="#B45309">
            {d.tipe === "susun" && d.panjang ? "kurangkan tiap tempat, dari satuan ke kiri" : "kurangkan dari satuan ke arah kiri"}
          </text>
        </Gambar>
        </>
      );
    case "maju":
      return (
        <Gambar label={`Garis bilangan: dari ${d.b} sampai ${d.a}`} judul={rupa === "benda" ? `garis dermaga ${d.benda}` : "garis bilangan"} rupa={rupa}>
          <GarisMaju a={d.a} b={d.b} rupa={rupa} emoji={emoji} />
        </Gambar>
      );
    case "cek":
      return rupa === "benda" ? (
        <Gambar label={`Balok cacah: ${d.a}, ${d.b}, dan ${d.klaim}`} judul={`cek ${d.benda}`} rupa={rupa}>
          <PapanBaris nama="bilangan awal" n={d.a} y={44} rupa={rupa} emoji={emoji} />
          <PapanBaris nama="dikurangkan" n={d.b} y={92} rupa={rupa} emoji={emoji} />
          <PapanBaris nama="hasil dicatat" n={d.klaim} y={140} rupa={rupa} emoji={emoji} />
        </Gambar>
      ) : (
        <KartuBilangan nama={["awal", "dikurangkan", "dicatat"]} isi={[d.a, d.b, d.klaim]} judul="periksa hasil pengurangan" />
      );
  }
}
