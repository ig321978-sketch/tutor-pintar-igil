"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  LANGKAH_BACA,
  WARNA_BARIS,
  acakTetap,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  petunjukKetuk,
  petunjukSalah,
  pilihanAngka,
  pilihanNamaDari,
  siapLangsung,
  urutanBaris,
  type Cara,
  type Diagram,
  type Klaim,
  type LRapi,
  type LUrut,
  type LUrutBaca,
  type Lambang,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan } from "./periksa";
import { JawabSuaraGambar, PilihanKata, teksKunci } from "./JawabGambar";

/**
 * Satu tugas CPA Kelas 2 Bab 8 Sub-Bab B: diagram gambar. Jenis tugas: membaca banyak gambar pada satu baris, baris paling panjang atau pendek, membandingkan dua baris (kata dan lebihnya),
 * gambar yang harus ditambah, jumlah baris, urutan baris, urutan langkah membaca, memilih diagram yang rapi, bentuk lambang, bagian diagram (judul dan keterangan), letak nama dan gambar,
 * dan Cari kesalahan (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji di papan loket (Concrete), lambang SVG polos di papan layar kotak-kotak tanpa emoji (Pictorial), tabel kata dan titik bundar saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";

/* ------------------------------ Lambang dan diagram ------------------------------ */
const titikBintang = (cx: number, cy: number, r: number): string =>
  Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.46;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

/** Satu lambang polos (SVG, tanpa emoji) berukuran s berpusat di (cx, cy). */
export function Simbol({ jenis, cx, cy, s, warna }: { jenis: Lambang; cx: number; cy: number; s: number; warna: string }) {
  const r = s * 0.42;
  if (jenis === "bintang") return <polygon points={titikBintang(cx, cy + r * 0.06, r * 1.14)} fill={warna} stroke={UNGU} strokeWidth={0.9} strokeLinejoin="round" />;
  if (jenis === "lingkaran") return <circle cx={cx} cy={cy} r={r} fill={warna} stroke={UNGU} strokeWidth={0.9} />;
  if (jenis === "hati")
    return <path d="M0 0.95 C-1.4 -0.1 -0.8 -1 0 -0.4 C0.8 -1 1.4 -0.1 0 0.95 Z" transform={`translate(${cx} ${cy - r * 0.05}) scale(${r * 0.98})`} fill={warna} stroke={UNGU} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={warna} stroke={UNGU} strokeWidth={0.9} />
      <circle cx={cx - r * 0.36} cy={cy - r * 0.2} r={r * 0.11} fill={UNGU} />
      <circle cx={cx + r * 0.36} cy={cy - r * 0.2} r={r * 0.11} fill={UNGU} />
      <path d={`M${cx - r * 0.46} ${cy + r * 0.14} Q${cx} ${cy + r * 0.78} ${cx + r * 0.46} ${cy + r * 0.14}`} fill="none" stroke={UNGU} strokeWidth={0.9} strokeLinecap="round" />
    </g>
  );
}

type Tanda = Record<number, string>;
type Bagian = "judul" | "keterangan";

/**
 * Diagram gambar di papan: judul di atas, nama jenis di kolom kiri, gambar berjajar ke kanan tanpa celah, keterangan di bawah.
 * Benda (Concrete): gambar berupa benda beremoji milik tiap baris. Diagram (Pictorial): lambang SVG polos, warna menandai jenis, tanpa emoji.
 * `tanda`: baris yang ditandai (lencana kecil di kiri), `bagian`: judul atau keterangan yang ditandai.
 */
export function DiagramSvg({ dg, rupa, tanda = {}, bagian }: { dg: Diagram; rupa: Rupa; tanda?: Tanda; bagian?: Bagian }) {
  const benda = rupa === "benda";
  const jumlahBaris = dg.baris.length;
  const maxN = Math.max(5, ...dg.baris.map((b) => b.n));
  const s = Math.min(22, 188 / maxN);
  const rowH = Math.min(34, 140 / jumlahBaris);
  const y0 = 28;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Diagram gambar ${dg.judul}`}>
      <defs>
        <pattern id="kk-layar" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0V14" fill="none" stroke="#CBD5E1" strokeWidth="0.7" />
        </pattern>
        <pattern id="kk-loket" width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#DC2626" />
          <rect x="6" width="6" height="6" fill="#FFFFFF" />
        </pattern>
      </defs>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : "#FFFFFF"} stroke={benda ? "#B91C1C" : "#64748B"} strokeWidth={2} />
      {benda ? <rect x={4} y={4} width={292} height={5} fill="url(#kk-loket)" /> : <rect x={3} y={3} width={294} height={194} rx={7} fill="url(#kk-layar)" />}
      {bagian === "judul" ? <rect x={58} y={6} width={184} height={20} rx={4} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={1.4} strokeDasharray="3 2" /> : null}
      <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {dg.judul}
      </text>
      {dg.baris.map((b, i) => {
        const cy = y0 + rowH * i + rowH / 2;
        return (
          <g key={b.nama}>
            {tanda[i] ? (
              <g>
                <rect x={3} y={cy - rowH / 2 + 1} width={294} height={rowH - 2} rx={5} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={1.2} />
                <circle cx={13} cy={cy} r={7} fill={MERAH} />
                <text x={13} y={cy + 3} textAnchor="middle" fontSize={9} fontWeight={900} fill="#FFFFFF">
                  {tanda[i]}
                </text>
              </g>
            ) : null}
            <text x={24} y={cy + 3.4} fontSize={9.5} fontWeight={900} fill={UNGU}>
              {b.nama}
            </text>
            {Array.from({ length: b.n }, (_, j) => {
              const cx = 104 + s * (j + 0.5);
              return benda ? (
                <text key={j} x={cx} y={cy + s * 0.3} textAnchor="middle" fontSize={s * 0.82}>
                  {b.ikon ?? "\u{2B50}"}
                </text>
              ) : (
                <Simbol key={j} jenis={dg.lambang} cx={cx} cy={cy} s={s} warna={WARNA_BARIS[i % 4]} />
              );
            })}
          </g>
        );
      })}
      {bagian === "keterangan" ? <rect x={22} y={177} width={256} height={17} rx={4} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={1.4} strokeDasharray="3 2" /> : null}
      <text x={150} y={189} textAnchor="middle" fontSize={8.6} fontWeight={800} fill={UNGU}>
        {dg.ket}
      </text>
    </svg>
  );
}

/** Tabel kata (Abstract): judul, nama jenis, titik bundar (●) sebagai lambang, dan keterangan, tanpa gambar benda. */
export function TabelKata({ dg, tanda = {}, bagian }: { dg: Diagram; tanda?: Tanda; bagian?: Bagian }) {
  /** Semua baris memakai skala yang sama dan tidak pernah terlipat: panjang baris tetap mewakili banyaknya. */
  const maxN = Math.max(5, ...dg.baris.map((b) => b.n));
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#7C3AED] bg-[#FAF5FF] p-2" role="img" aria-label={`Tabel kata ${dg.judul}`}>
      <p className={`mb-1 rounded px-1 text-center text-sm font-black text-[#4C1D95] ${bagian === "judul" ? "border-2 border-dashed border-[#CA8A04] bg-[#FEF9C3]" : ""}`}>{dg.judul}</p>
      {dg.baris.map((b, i) => (
        <div key={b.nama} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${tanda[i] ? "border-2 border-[#CA8A04] bg-[#FEF9C3]" : ""}`}>
          {tanda[i] ? <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-black text-white">{tanda[i]}</span> : null}
          <span className="w-20 shrink-0 text-sm font-black text-[#4C1D95]">{b.nama}</span>
          <svg viewBox={`0 0 ${maxN * 16} 16`} preserveAspectRatio="xMinYMid meet" className="h-4 min-w-0 flex-1" style={{ maxWidth: maxN * 16 }} aria-hidden="true">
            {Array.from({ length: b.n }, (_, j) => (
              <circle key={j} cx={8 + j * 16} cy={8} r={6.5} fill="#7C3AED" />
            ))}
          </svg>
        </div>
      ))}
      <p className={`mt-1 rounded px-1 text-center text-xs font-black text-[#6D28D9] ${bagian === "keterangan" ? "border-2 border-dashed border-[#CA8A04] bg-[#FEF9C3]" : ""}`}>{dg.ket}</p>
    </div>
  );
}

/** Diagram menurut rupa: papan loket (benda), papan layar (diagram), atau tabel kata (lambang). */
export function DiagramTampil({ dg, rupa, tanda, bagian }: { dg: Diagram; rupa: Rupa; tanda?: Tanda; bagian?: Bagian }) {
  return rupa === "lambang" ? <TabelKata dg={dg} tanda={tanda} bagian={bagian} /> : <DiagramSvg dg={dg} rupa={rupa} tanda={tanda} bagian={bagian} />;
}

/** Baris yang ditandai dan bagian yang ditandai pada tiap jenis tugas. */
function tandaDari(l: LangkahDasar): { tanda: Tanda; bagian?: Bagian } {
  switch (l.tipe) {
    case "baca":
    case "rank":
      return { tanda: { [l.i]: "?" } };
    case "banding":
    case "tambah":
      return { tanda: { [l.a]: "1", [l.b]: "2" } };
    case "jumlah":
      return { tanda: Object.fromEntries(l.idx.map((i) => [i, "+"])) };
    case "bagian":
      return { tanda: {}, bagian: l.sorot };
    default:
      return { tanda: {} };
  }
}

/** Satu baris gambar saja (tugas bentuk lambang): bentuk lambang dan banyaknya, tanpa nama jenis. */
function BarisLambang({ lambang, banyak, rupa }: { lambang: Lambang; banyak: number; rupa: Rupa }) {
  const dg: Diagram = { judul: "satu baris gambar", ket: "Setiap gambar mewakili satu benda", lambang, baris: [{ nama: "baris", n: banyak }] };
  return <DiagramTampil dg={dg} rupa={rupa} />;
}

/* ------------------------------ Gambar tugas ------------------------------ */
function GambarTugas({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  if (l.tipe === "lambang") return <BarisLambang lambang={l.lambang} banyak={l.banyak} rupa={rupa} />;
  if (l.tipe === "rapi") return null;
  const { tanda, bagian } = tandaDari(l);
  return <DiagramTampil dg={l.dg} rupa={rupa} tanda={tanda} bagian={bagian} />;
}

/** Dua baris gambar besar dan kecil (Cari kesalahan tentang ukuran): ukuran berbeda, banyak gambar tidak sama dengan panjang baris. */
function UkuranDiagram({ besar, kecil, rupa }: { besar: number; kecil: number; rupa: Rupa }) {
  const benda = rupa === "benda";
  const baris: { nama: string; n: number; s: number; warna: string }[] = [
    { nama: "besar", n: besar, s: 34, warna: WARNA_BARIS[0] },
    { nama: "kecil", n: kecil, s: 14, warna: WARNA_BARIS[3] },
  ];
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label="Dua baris gambar besar dan kecil">
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : "#FFFFFF"} stroke={benda ? "#B91C1C" : "#64748B"} strokeWidth={2} />
      <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        Stiker Besar dan Stiker Kecil
      </text>
      {baris.map((b, i) => {
        const cy = 72 + i * 66;
        return (
          <g key={b.nama}>
            <text x={8} y={cy + 3} fontSize={10} fontWeight={900} fill={UNGU}>
              {b.nama}
            </text>
            {Array.from({ length: b.n }, (_, j) => {
              const cx = 56 + b.s * (j + 0.5);
              return benda ? (
                <text key={j} x={cx} y={cy + b.s * 0.3} textAnchor="middle" fontSize={b.s * 0.82}>
                  {"\u{2B50}"}
                </text>
              ) : (
                <Simbol key={j} jenis="bintang" cx={cx} cy={cy} s={b.s} warna={b.warna} />
              );
            })}
          </g>
        );
      })}
      <text x={150} y={189} textAnchor="middle" fontSize={8.6} fontWeight={800} fill={UNGU}>
        Setiap gambar mewakili satu benda
      </text>
    </svg>
  );
}

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Ketuk nama baris satu per satu menurut banyaknya. */
function UrutBaris({ l, rupa, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const benar = urutanBaris(l.dg, l.dari);
  const tampil = acakTetap(l.dg.baris.length, benar);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === benar[sudah.length]) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === l.dg.baris.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info(`Betul! Baris berikutnya yang paling ${l.dari === "banyak" ? "banyak" : "sedikit"} yang mana?`);
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <DiagramTampil dg={l.dg} rupa={rupa} />
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk nama baris menurut banyaknya">
        {tampil.map((i) => (
          <button
            key={l.dg.baris[i].nama}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-lg font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {l.dg.baris[i].nama}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Susun langkah membaca diagram dengan mengetuk langkah pertama sampai terakhir. */
function UrutBaca({ l, rupa, salah, siap, info }: PK & { l: LUrutBaca }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const tampil = acakTetap(LANGKAH_BACA.length, [0, 1, 2, 3]);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === LANGKAH_BACA.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info("Betul! Langkah berikutnya yang mana?");
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <DiagramTampil dg={l.dg} rupa={rupa} />
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk langkah membaca secara berurutan">
        {tampil.map((i) => (
          <button
            key={LANGKAH_BACA[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {LANGKAH_BACA[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Satu baris kecil untuk pilihan diagram rapi: `jenis` sama (rapi), ukuran (ukuran berbeda), atau bentuk (bentuk berbeda). */
function BarisPilihan({ jenis, banyak, lambang, rupa }: { jenis: "sama" | "ukuran" | "bentuk"; banyak: number; lambang: Lambang; rupa: Rupa }) {
  const benda = rupa === "benda";
  const ukuran = [15, 8, 19, 10, 17, 12];
  const butir = Array.from({ length: banyak }, (_, j) => {
    const s = jenis === "ukuran" ? ukuran[j % ukuran.length] : 15;
    const kiri = 6 + ukuran.slice(0, j).reduce((t, u) => t + u + 3, 0);
    const cx = jenis === "ukuran" ? kiri + s / 2 : 14 + j * 20;
    const lain = jenis === "bentuk" && j % 2 === 1;
    return benda ? (
      <text key={j} x={cx} y={27 + s * 0.3} textAnchor="middle" fontSize={s * 0.85}>
        {lain ? "\u{1F534}" : "\u{2B50}"}
      </text>
    ) : (
      <Simbol key={j} jenis={lain ? "lingkaran" : lambang} cx={cx} cy={27} s={s} warna={WARNA_BARIS[0]} />
    );
  });
  return (
    <svg viewBox="0 0 110 54" className="block h-auto w-full" aria-hidden="true">
      {butir}
    </svg>
  );
}

/** Pilih diagram yang rapi di antara tiga: semua gambar sama bentuk, sama ukuran, dan sama jarak. */
function RapiPilihan({ l, rupa, salah, siap }: PK & { l: LRapi }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const salahan: ("ukuran" | "bentuk")[] = ["ukuran", "bentuk"];
  let kePakai = 0;
  const jenis = [0, 1, 2].map((i) => (i === l.benar ? ("sama" as const) : salahan[kePakai++]));
  const ketuk = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (i === l.benar) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2" role="group" aria-label="Ketuk diagram yang rapi">
      {jenis.map((j, i) => (
        <button
          key={i}
          type="button"
          disabled={mati.includes(i)}
          onClick={() => ketuk(i)}
          aria-label={`Diagram ${i + 1}`}
          className={`rounded-2xl border-4 px-3 py-1 disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#1C01A5] bg-white"}`}
        >
          <span className="block text-left text-xs font-black text-[#1C01A5]">Diagram {i + 1}</span>
          <BarisPilihan jenis={j} banyak={l.banyak} lambang={l.lambang} rupa={rupa} />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "ukuran") return <UkuranDiagram besar={k.besar} kecil={k.kecil} rupa={rupa} />;
  const tanda: Tanda = k.jenis === "selisih" ? { [k.a]: "1", [k.b]: "2" } : { [k.a]: "+", [k.b]: "+" };
  return <DiagramTampil dg={k.dg} rupa={rupa} tanda={tanda} />;
}
function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  const betul = klaimBenar(l.klaim);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  const putus = (benar: boolean) => {
    if (benar === betul) {
      setTahap("alasan");
      info(betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <GambarKlaim k={l.klaim} rupa={rupa} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <Tombol teks={"\u{274C} salah"} onClick={() => putus(false)} />
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className="block min-h-[48px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] disabled:opacity-30">
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Dasar({ l, rupa, ...pk }: PK & { l: Langkah }) {
  const d = dasarDari(l);
  if (!d) return null;
  switch (d.tipe) {
    case "urut":
      return <UrutBaris {...pk} rupa={rupa} l={d} />;
    case "urutbaca":
      return <UrutBaca {...pk} rupa={rupa} l={d} />;
    case "rapi":
      return <RapiPilihan {...pk} rupa={rupa} l={d} />;
    default:
      return <GambarTugas l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahGambar({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas dengan jawaban pilihan (klik), semua tugas kanvas, dan semua tugas suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
  const [matiAngka, setMatiAngka] = useState<number[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (kunci === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  /** Satu-satunya jalur memeriksa jawaban: `j` kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : (LABEL_NAMA[j as Nama] ?? j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const pilihanTeks: string[] = kunci === null ? [] : kunci.jenis === "nama" ? pilihanNamaDari(kunci.nama) : pilihanAngka(kunci.n).map(kata);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraGambar
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={[...mati, ...matiAngka.map(kata)]}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (pilihanAngka(kunci.n).find((x) => kata(x) === t) ?? angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih angkanya">
              {pilihanAngka(kunci.n).map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={matiAngka.includes(n)}
                  onClick={() => jawab(n, n === kunci.n)}
                  className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
                >
                  {n}
                </button>
              ))}
            </div>
          ) : (
            <PilihanKata pilihan={pilihanTeks} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
