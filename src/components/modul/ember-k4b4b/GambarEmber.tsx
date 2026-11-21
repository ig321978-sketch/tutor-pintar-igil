"use client";

import React from "react";
import { barisKartu, dasarDari, fmt, judulKartu, mlDariL, mukaBlok, susunBaris, totalIsi, type Cara, type Langkah, type LangkahDasar, type LGelas, type LIsi, type LLapisan, type LSatuan, type LSebut, type LTangga, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (volume): gelas, botol, dan ember berwarna atau beremoji sebanyak datanya (Concrete),
 * gelas, ember, dan balok kubus polos (Pictorial), serta kartu kata dan angka (Abstract). Balok kubus digambar lewat tiga sisi (depan, atas, samping) yang tiap kotaknya satu kubus satuan,
 * jadi banyak kotak sama dengan banyak kubus pada sisinya. Tanpa skor dan tanpa jaringan.
 */

/** Benda beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  sendok: "\u{1F944}",
  botol: "\u{1F37C}",
  gelas: "\u{1F95B}",
  tetes: "\u{1F4A7}",
};

const BIRU = "#1C01A5";
const KOLOM_GELAS = 9;
const WARNA = {
  benda: { garis: "#B45309", wadah: "#F59E0B", air: "#38BDF8", depan: "#7DD3FC", atas: "#BAE6FD", samping: "#38BDF8", tepi: "#0369A1", latar: "#FEF3C7", tebal: "#92400E" },
  diagram: { garis: "#1D4ED8", wadah: "#1D4ED8", air: "#DBEAFE", depan: "#FFFFFF", atas: "#EFF6FF", samping: "#DBEAFE", tepi: "#1D4ED8", latar: "#DBEAFE", tebal: "#1E3A8A" },
} as const;
type RupaGambar = "benda" | "diagram";

/* ------------------------------ Gelas ------------------------------ */
/** Satu deret gelas sebanyak `n` (kisi tetap sembilan kolom, tidak membungkus sendiri): benda beremoji (Concrete) atau gelas polos (Pictorial). */
export function BarisGelas({ n, rupa, label }: { n: number; rupa: RupaGambar; label?: string }) {
  const w = WARNA[rupa];
  const sel = 26;
  return (
    <div className="mx-auto w-fit max-w-full space-y-1 rounded-xl border-2 border-dashed p-1.5" style={{ borderColor: w.garis, background: "#FFFFFF" }} role="img" aria-label={`${n} gelas${label ? `, ${label}` : ""}`} data-banyak={n}>
      {label ? <p className="text-center text-xs font-black" style={{ color: w.tebal }}>{label}</p> : null}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${KOLOM_GELAS}, ${sel}px)`, gridAutoRows: `${sel}px`, gap: 2 }} data-kolom={KOLOM_GELAS}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} aria-hidden="true" data-gelas="1" className="flex items-center justify-center">
            {rupa === "benda" ? (
              <span className="text-xl leading-none">{EMOJI_BENDA.gelas}</span>
            ) : (
              <svg viewBox="0 0 20 22" width={sel - 4} height={sel - 2}>
                <path d="M3 2 L17 2 L15 20 L5 20 Z" fill="#FFFFFF" stroke={w.garis} strokeWidth={1.6} />
                <path d="M4 10 L16 10 L15 20 L5 20 Z" fill={w.air} stroke="none" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Ember ------------------------------ */
/** Ember dengan air setinggi `isi` (0 sampai 1) dan tulisan `label` di tengah. */
export function EmberSvg({ isi, label, rupa, kecil = false }: { isi: number; label: string; rupa: RupaGambar; kecil?: boolean }) {
  const w = WARNA[rupa];
  const atas = 20;
  const bawah = 96;
  const yAir = bawah - (bawah - atas) * Math.max(0, Math.min(1, isi));
  const kiri = (y: number) => 108 + ((y - atas) / (bawah - atas)) * 10;
  const kanan = (y: number) => 192 - ((y - atas) / (bawah - atas)) * 10;
  return (
    <svg viewBox="0 0 300 112" className={`mx-auto w-full ${kecil ? "max-w-[170px]" : "max-w-[300px]"}`} role="img" aria-label={`ember berisi ${label}`} data-isi={Math.round(isi * 100)}>
      <rect x={3} y={2} width={294} height={108} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.5} />
      <path d="M108 22 Q150 -8 192 22" fill="none" stroke={w.wadah} strokeWidth={3} />
      {isi > 0 ? <polygon points={`${kiri(yAir)},${yAir} ${kanan(yAir)},${yAir} ${kanan(bawah)},${bawah} ${kiri(bawah)},${bawah}`} fill={w.air} stroke={rupa === "diagram" ? w.garis : "none"} strokeWidth={0.8} /> : null}
      <path d={`M108 ${atas} L192 ${atas} L182 ${bawah} L118 ${bawah} Z`} fill="none" stroke={w.wadah} strokeWidth={3.4} strokeLinejoin="round" />
      <text x={150} y={63} textAnchor="middle" fontSize={label.length > 9 ? 14 : 17} fontWeight={900} fill={BIRU}>
        {label}
      </text>
    </svg>
  );
}

/* ------------------------------ Balok kubus ------------------------------ */
/**
 * Balok kubus satuan: `kolom` kubus ke samping, `baris` kubus ke belakang, `lapis` kubus ke atas, digambar miring. Tiap kotak pada sisi depan, atas, dan samping adalah satu kubus satuan,
 * jadi sisi atas memperlihatkan satu lapisan (baris kali kolom kotak) dan sisi depan memperlihatkan banyak lapisan.
 */
export function ukuranBlok(kolom: number, baris: number, lapis: number): { s: number; off: number } {
  const s = Math.max(8, Math.min(32, Math.floor(210 / (kolom + baris * 0.5)), Math.floor(130 / (lapis + baris * 0.5))));
  return { s, off: s * 0.5 };
}
export function BlokSvg({ kolom, baris, lapis, rupa }: { kolom: number; baris: number; lapis: number; rupa: RupaGambar }) {
  const w = WARNA[rupa];
  const { s, off } = ukuranBlok(kolom, baris, lapis);
  const lebar = kolom * s + baris * off;
  const tinggi = lapis * s + baris * off;
  const x0 = (300 - lebar) / 2;
  const yF = 8 + baris * off;
  const unsur: React.ReactNode[] = [];
  for (let r = 0; r < lapis; r += 1)
    for (let c = 0; c < kolom; c += 1) unsur.push(<rect key={`d${r}-${c}`} x={x0 + c * s} y={yF + r * s} width={s} height={s} fill={w.depan} stroke={w.tepi} strokeWidth={0.8} data-muka="depan" />);
  for (let d = 0; d < baris; d += 1)
    for (let c = 0; c < kolom; c += 1) {
      const ax = x0 + c * s + d * off;
      const ay = yF - d * off;
      unsur.push(<polygon key={`a${d}-${c}`} points={`${ax},${ay} ${ax + s},${ay} ${ax + s + off},${ay - off} ${ax + off},${ay - off}`} fill={w.atas} stroke={w.tepi} strokeWidth={0.8} data-muka="atas" />);
    }
  const xK = x0 + kolom * s;
  for (let d = 0; d < baris; d += 1)
    for (let r = 0; r < lapis; r += 1) {
      const sx = xK + d * off;
      const sy = yF + r * s - d * off;
      unsur.push(<polygon key={`s${d}-${r}`} points={`${sx},${sy} ${sx + off},${sy - off} ${sx + off},${sy - off + s} ${sx},${sy + s}`} fill={w.samping} stroke={w.tepi} strokeWidth={0.8} data-muka="samping" />);
    }
  const m = mukaBlok(kolom, baris, lapis);
  return (
    <svg viewBox={`0 0 300 ${Math.ceil(tinggi + 22)}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`balok kubus: ${kolom} kubus ke samping, ${baris} baris, ${lapis} lapisan`} data-depan={m.depan} data-atas={m.atas} data-samping={m.samping}>
      <rect x={3} y={2} width={294} height={Math.ceil(tinggi + 18)} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.4} />
      {unsur}
    </svg>
  );
}

/* ------------------------------ Tangga liter ------------------------------ */
/** Tangga dua anak: satu satuan di atas dan satu di bawah, dengan panah kali atau bagi seribu (atau sama besar untuk sentimeter kubik dan mililiter). */
export function TanggaSvg({ d, rupa }: { d: LTangga; rupa: RupaGambar }) {
  const w = WARNA[rupa];
  const liter = d.jenis === "liter";
  const turun = d.arah === "turun";
  const diketahui = liter ? (turun ? `${d.n} l` : `${fmt(mlDariL(d.n))} ml`) : `${d.n} cm³`;
  const dicari = liter ? (turun ? "? ml" : "? l") : "? ml";
  const aturan = liter ? (turun ? "× 1.000" : "÷ 1.000") : "sama besar";
  const atasTeks = liter ? (turun ? diketahui : dicari) : diketahui;
  const bawahTeks = liter ? (turun ? dicari : diketahui) : dicari;
  return (
    <svg viewBox="0 0 300 130" className="mx-auto w-full max-w-[300px]" role="img" aria-label={`tangga: ${diketahui} ke ${dicari}, ${aturan}`} data-aturan={aturan} data-jenis={d.jenis}>
      <rect x={3} y={2} width={294} height={126} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.5} />
      <path d="M20 54 L130 54 L130 104 L280 104" fill="none" stroke={w.garis} strokeWidth={2.4} />
      <rect x={20} y={14} width={110} height={40} rx={8} fill="#FFFFFF" stroke={w.garis} strokeWidth={2.4} strokeDasharray={atasTeks.startsWith("?") ? "4 3" : undefined} />
      <text x={75} y={40} textAnchor="middle" fontSize={atasTeks.length > 8 ? 15 : 19} fontWeight={900} fill={atasTeks.startsWith("?") ? "#DC2626" : BIRU}>
        {atasTeks}
      </text>
      <rect x={170} y={64} width={110} height={40} rx={8} fill="#FFFFFF" stroke={w.garis} strokeWidth={2.4} strokeDasharray={bawahTeks.startsWith("?") ? "4 3" : undefined} />
      <text x={225} y={90} textAnchor="middle" fontSize={bawahTeks.length > 8 ? 15 : 19} fontWeight={900} fill={bawahTeks.startsWith("?") ? "#DC2626" : BIRU}>
        {bawahTeks}
      </text>
      <text x={150} y={72} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DC2626">
        {aturan}
      </text>
      <text x={150} y={90} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.tebal}>
        {liter ? (turun ? "turun tangga" : "naik tangga") : "1 cm³ = 1 ml"}
      </text>
      <text x={150} y={122} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.tebal}>
        {liter ? "1 l = 1.000 ml" : "kubus satuan sama dengan mililiter"}
      </text>
    </svg>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#0E7490] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#155E75]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#0E7490] bg-[#ECFEFF] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}

const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#155E75]">
        {b}
      </p>
    ))}
  </div>
);

/** Keterangan di bawah gambar Concrete dan Pictorial (baris pertama dan terakhir kartu kata). */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[0], kartu[kartu.length - 1]];
}

const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { satuan: "kartu satuan", gelas: "kartu gelas", sebut: "kartu kata", isi: "kartu isi", lapisan: "kartu lapisan", tangga: "kartu tangga" };

function GambarSatuan({ d, rupa }: { d: LSatuan; rupa: RupaGambar }) {
  return rupa === "benda" ? (
    <div className="mx-auto flex w-fit items-center gap-3 rounded-xl border-2 border-dashed border-[#B45309] bg-white px-4 py-2" role="img" aria-label={`${d.benda} berisi ${d.jumlah} dengan satuan yang belum ditulis`}>
      <span className="text-6xl leading-none" aria-hidden="true">
        {EMOJI_BENDA[d.benda] ?? EMOJI_BENDA.gelas}
      </span>
      <span className="text-3xl font-black text-[#1C01A5]">{d.jumlah} ?</span>
    </div>
  ) : (
    <EmberSvg isi={0.7} label={`${d.jumlah} ?`} rupa={rupa} />
  );
}

function GambarGelas({ d, rupa }: { d: LGelas; rupa: RupaGambar }) {
  return (
    <div className="space-y-1.5">
      <EmberSvg isi={1} label="penuh" rupa={rupa} kecil />
      <BarisGelas n={d.kecil} rupa={rupa} label="gelas kecil" />
      <p className="text-center text-xs font-black text-[#B91C1C]">1 gelas besar = {d.per} gelas kecil</p>
    </div>
  );
}

function GambarSebut({ d, rupa }: { d: LSebut; rupa: RupaGambar }) {
  if (d.kata === "kubik") return <BlokSvg kolom={1} baris={1} lapis={1} rupa={rupa} />;
  if (d.kata === "baku") return <BarisGelas n={4} rupa={rupa} label="gelas kecil dan gelas besar berbeda ukuran" />;
  if (d.kata === "liter") return <EmberSvg isi={1} label="1.000 ml" rupa={rupa} kecil />;
  return rupa === "benda" ? (
    <div className="mx-auto flex w-fit items-center gap-3 rounded-xl border-2 border-dashed border-[#B45309] bg-white px-4 py-2" role="img" aria-label="satu bagian kecil dari satu liter">
      <span className="text-5xl leading-none" aria-hidden="true">
        {EMOJI_BENDA.tetes}
      </span>
      <span className="text-sm font-black text-[#1C01A5]">1 bagian kecil dari 1 l</span>
    </div>
  ) : (
    <TanggaSvg d={{ tipe: "tangga", jenis: "liter", n: 1, arah: "turun" }} rupa={rupa} />
  );
}

function GambarIsi({ d, rupa, cara }: { d: LIsi; rupa: RupaGambar; cara: Cara }) {
  const total = totalIsi(d.gelas, d.takar);
  if (cara === "kanvas")
    return (
      <div className="space-y-1.5">
        <EmberSvg isi={0.8} label={`${fmt(total)} ml`} rupa={rupa} kecil />
        <BarisGelas n={1} rupa={rupa} label={`1 gelas takar: ${fmt(d.takar)} ml`} />
        <p className="text-center text-xs font-black text-[#B91C1C]">banyak gelas takar: ?</p>
      </div>
    );
  return (
    <div className="space-y-1.5">
      <BarisGelas n={d.gelas} rupa={rupa} label={`tiap gelas takar: ${fmt(d.takar)} ml`} />
      <EmberSvg isi={0.6} label="? ml" rupa={rupa} kecil />
    </div>
  );
}

function GambarLapisan({ d, rupa }: { d: LLapisan; rupa: RupaGambar }) {
  return (
    <div className="space-y-1">
      <BlokSvg kolom={d.kolom} baris={d.baris} lapis={d.lapis} rupa={rupa} />
      <p className="text-center text-xs font-black text-[#B91C1C]">
        {d.lapis} lapisan, tiap lapisan {d.baris} baris × {d.kolom} kubus
      </p>
    </div>
  );
}

/** Isi gambar menurut jenis tugas dan rupa (benda beremoji atau polos). */
function Bagian({ d, rupa, cara }: { d: LangkahDasar; rupa: RupaGambar; cara: Cara }) {
  switch (d.tipe) {
    case "satuan":
      return <GambarSatuan d={d} rupa={rupa} />;
    case "gelas":
      return <GambarGelas d={d} rupa={rupa} />;
    case "sebut":
      return <GambarSebut d={d} rupa={rupa} />;
    case "isi":
      return <GambarIsi d={d} rupa={rupa} cara={cara} />;
    case "lapisan":
      return <GambarLapisan d={d} rupa={rupa} />;
    case "tangga":
      return <TanggaSvg d={d} rupa={rupa} />;
  }
}

/** Banyak gelas yang digambar (Concrete dan Pictorial) menurut jenis tugas dan caranya: dipakai uji. */
export const gelasTergambar = (d: LangkahDasar, cara: Cara): number => (d.tipe === "gelas" ? d.kecil : d.tipe === "isi" ? (cara === "kanvas" ? 1 : d.gelas) : d.tipe === "sebut" && d.kata === "baku" ? 4 : 0);
export const barisGelas = (n: number): number[] => susunBaris(n, KOLOM_GELAS);

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: gelas, botol, dan ember beremoji (Concrete), gelas, ember, dan balok kubus polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  return (
    <div className="space-y-1.5">
      <Bagian d={d} rupa={rupa} cara={cara} />
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
