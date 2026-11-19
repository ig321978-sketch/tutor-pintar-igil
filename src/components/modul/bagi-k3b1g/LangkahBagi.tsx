"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  LANGKAH_BAGI,
  WARNA_BAGIAN,
  acakTetap,
  dasarDari,
  deretNilai,
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
  type Cara,
  type Klaim,
  type LDeret,
  type LUrutLangkah,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan } from "./periksa";
import { JawabSuaraBagi, PilihanKata, teksKunci } from "./JawabBagi";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab G: pembagian sampai seratus. Jenis tugas: membagi rata (isi tiap bagian), mengurangi berulang (banyak pengurangan), banyak bagian,
 * pasangan perkalian, perkalian dan pembagian berkaitan, periksa dengan kali (cocok atau tidak), nama bagian kalimat bagi, hasil tiap pengurangan berurutan, urutan langkah membagi rata,
 * dan Cari kesalahan (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji di meja pesta (Concrete), titik, kotak, dan garis bilangan polos tanpa emoji di kertas pembungkus (Pictorial), tulisan di kartu saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const COKLAT = "#92400E";
const MERAH = "#DC2626";

/* ------------------------------ Susunan butir ------------------------------ */
/** Tata `n` butir dalam kotak (x, y, w, h): ukuran sel dan pusat tiap butir. */
export function tata(n: number, x: number, y: number, w: number, h: number): { s: number; pos: { cx: number; cy: number }[] } {
  let terbaik = { s: 0, kolom: 1 };
  for (let kolom = 1; kolom <= Math.max(1, n); kolom += 1) {
    const baris = Math.ceil(n / kolom);
    const s = Math.min(w / kolom, h / baris);
    if (s > terbaik.s) terbaik = { s, kolom };
  }
  const { s, kolom } = terbaik;
  const baris = Math.ceil(n / kolom);
  const x0 = x + (w - Math.min(kolom, n) * s) / 2;
  const y0 = y + (h - baris * s) / 2;
  return { s, pos: Array.from({ length: n }, (_, i) => ({ cx: x0 + ((i % kolom) + 0.5) * s, cy: y0 + (Math.floor(i / kolom) + 0.5) * s })) };
}

/** Satu butir: benda beremoji (Concrete) atau titik polos (Pictorial). */
function Butir({ cx, cy, s, rupa, ikon, warna = WARNA_BAGIAN[3] }: { cx: number; cy: number; s: number; rupa: Rupa; ikon?: string; warna?: string }) {
  if (rupa === "benda")
    return (
      <text x={cx} y={cy + s * 0.27} textAnchor="middle" fontSize={s * 0.78}>
        {ikon ?? "\u{1F381}"}
      </text>
    );
  return <circle cx={cx} cy={cy} r={s * 0.36} fill={warna} stroke={UNGU} strokeWidth={0.8} />;
}
export function Tumpukan({ n, x, y, w, h, rupa, ikon, warna }: { n: number; x: number; y: number; w: number; h: number; rupa: Rupa; ikon?: string; warna?: string }) {
  const t = tata(n, x, y, w, h);
  return (
    <g>
      {t.pos.map((p, i) => (
        <Butir key={i} cx={p.cx} cy={p.cy} s={t.s} rupa={rupa} ikon={ikon} warna={warna} />
      ))}
    </g>
  );
}
export function Teks({ x, y, u, isi, warna = UNGU, anchor = "middle" }: { x: number; y: number; u: number; isi: string; warna?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={u} fontWeight={900} fill={warna}>
      {isi}
    </text>
  );
}
function Bingkai({ rupa, children, label }: { rupa: Rupa; children: React.ReactNode; label: string }) {
  const benda = rupa === "benda";
  const lambang = rupa === "lambang";
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={label}>
      <defs>
        <pattern id="bg-kertas" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="16" fill="#DBEAFE" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
        </pattern>
        <pattern id="bg-meja" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#FFF7ED" />
          <circle cx="3" cy="3" r="1.2" fill="#FDBA74" />
          <circle cx="10" cy="10" r="1.2" fill="#FDBA74" />
        </pattern>
      </defs>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "url(#bg-meja)" : lambang ? "#EEF2FF" : "url(#bg-kertas)"} stroke={benda ? "#C2410C" : lambang ? "#4338CA" : "#2563EB"} strokeWidth={2} strokeDasharray={lambang ? "6 4" : undefined} />
      {children}
    </svg>
  );
}

/* ------------------------------ Gambar tiap jenis tugas ------------------------------ */
export function Keranjang({ g, y, h, rupa }: { g: number; y: number; h: number; rupa: Rupa }) {
  const w = (280 - 5 * (g - 1)) / g;
  const benda = rupa === "benda";
  return (
    <g>
      {Array.from({ length: g }, (_, i) => {
        const x = 10 + i * (w + 5);
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={6} fill={benda ? "#FDE68A" : "#FFFFFF"} stroke={benda ? "#B45309" : "#64748B"} strokeWidth={1.6} strokeDasharray={benda ? undefined : "4 3"} />
            {benda && w >= 26 ? (
              <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize={Math.min(20, w * 0.6)}>
                {"\u{1F9FA}"}
              </text>
            ) : null}
            <Teks x={x + w / 2} y={y + h - 6} u={9} isi={String(i + 1)} warna={benda ? COKLAT : "#334155"} />
          </g>
        );
      })}
    </g>
  );
}

function FigBagi({ n, g, rupa, ikon }: { n: number; g: number; rupa: Rupa; ikon?: string }) {
  if (rupa === "lambang")
    return (
      <Bingkai rupa={rupa} label={`Kartu pembagian ${n} dibagi ${g}`}>
        <Teks x={150} y={98} u={36} isi={`${n} : ${g} = ?`} />
        <Teks x={150} y={140} u={11} isi={`${n} dibagi rata ke ${g} bagian`} warna="#4338CA" />
      </Bingkai>
    );
  return (
    <Bingkai rupa={rupa} label={`${n} benda dibagi rata ke ${g} bagian`}>
      <Tumpukan n={n} x={14} y={22} w={272} h={78} rupa={rupa} ikon={ikon} />
      <Teks x={150} y={113} u={9} isi={`${n} benda dibagi rata ke ${g} bagian`} warna={rupa === "benda" ? COKLAT : "#1E3A8A"} />
      <Keranjang g={g} y={122} h={66} rupa={rupa} />
    </Bingkai>
  );
}

function FigKurang({ n, g, rupa, ikon, rantai = true }: { n: number; g: number; rupa: Rupa; ikon?: string; rantai?: boolean }) {
  const q = n / g;
  if (rupa === "lambang") {
    const nilai = [n, ...deretNilai(n, g)];
    return (
      <Bingkai rupa={rupa} label={`Pengurangan berulang dari ${n}`}>
        <Teks x={150} y={92} u={rantai ? 15 : 20} isi={rantai ? nilai.join(" → ") : `${[n, g, g, g].join(" − ")} − …`} />
        <Teks x={150} y={132} u={11} isi={rantai ? `tiap panah dikurangi ${g}` : `dikurangi ${g} berulang sampai nol`} warna="#4338CA" />
      </Bingkai>
    );
  }
  if (rupa === "benda") {
    const gc = Math.min(q, 4);
    const baris = Math.ceil(q / gc);
    const cw = 280 / gc;
    const ch = 140 / baris;
    return (
      <Bingkai rupa={rupa} label={`${n} benda dikurangi ${g} berulang`}>
        {Array.from({ length: q }, (_, i) => {
          const x = 10 + (i % gc) * cw;
          const y = 22 + Math.floor(i / gc) * ch;
          return (
            <g key={i}>
              <rect x={x + 3} y={y + 3} width={cw - 6} height={ch - 6} rx={6} fill="#FFFFFF" stroke="#B45309" strokeWidth={1.4} strokeDasharray="4 3" />
              <Tumpukan n={g} x={x + 7} y={y + 7} w={cw - 14} h={ch - 14} rupa={rupa} ikon={ikon} />
            </g>
          );
        })}
        <Teks x={150} y={186} u={9.5} isi={`${n} benda, tiap kantong ${g} benda diambil`} warna={COKLAT} />
      </Bingkai>
    );
  }
  const sx = (v: number): number => 22 + (v * 256) / n;
  const kelipatan = Array.from({ length: q + 1 }, (_, i) => i * g);
  return (
    <Bingkai rupa={rupa} label={`Garis bilangan dari ${n} mundur sebesar ${g}`}>
      <line x1={sx(0)} y1={122} x2={sx(n)} y2={122} stroke={UNGU} strokeWidth={2} />
      {kelipatan.map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={117} x2={sx(v)} y2={127} stroke={UNGU} strokeWidth={1.6} />
          {rantai || v === 0 || v === n ? <Teks x={sx(v)} y={141} u={9} isi={String(v)} /> : null}
        </g>
      ))}
      {kelipatan.slice(1).map((v, i) => (
        <path key={i} d={`M${sx(v)} 118 Q${(sx(v) + sx(v - g)) / 2} 76 ${sx(v - g)} 118`} fill="none" stroke={WARNA_BAGIAN[0]} strokeWidth={2} />
      ))}
      <Teks x={150} y={186} u={9.5} isi={`dikurangi ${g} berulang sampai nol`} warna="#1E3A8A" />
    </Bingkai>
  );
}

function FigIsi({ n, q, rupa, ikon }: { n: number; q: number; rupa: Rupa; ikon?: string }) {
  if (rupa === "lambang")
    return (
      <Bingkai rupa={rupa} label={`Kartu pembagian ${n} dibagi berapa sama dengan ${q}`}>
        <Teks x={150} y={98} u={34} isi={`${n} : ? = ${q}`} />
        <Teks x={150} y={140} u={11} isi="pembagi belum diketahui" warna="#4338CA" />
      </Bingkai>
    );
  return (
    <Bingkai rupa={rupa} label={`${n} benda, tiap bagian berisi ${q}`}>
      <Tumpukan n={n} x={14} y={22} w={272} h={110} rupa={rupa} ikon={ikon} />
      <rect x={50} y={144} width={200} height={38} rx={10} fill="#FFFFFF" stroke={rupa === "benda" ? "#B45309" : "#2563EB"} strokeWidth={2} />
      <Teks x={150} y={168} u={13} isi={`tiap bagian berisi ${q}`} warna={rupa === "benda" ? COKLAT : "#1E3A8A"} />
    </Bingkai>
  );
}

function FigPasang({ g, n, rupa }: { g: number; n: number; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <Bingkai rupa={rupa} label={`Kartu perkalian ${g} kali berapa sama dengan ${n}`}>
        <Teks x={150} y={98} u={34} isi={`${g} × ? = ${n}`} />
        <Teks x={150} y={140} u={11} isi="pembagi dikali berapa" warna="#4338CA" />
      </Bingkai>
    );
  const w = (280 - 4 * (g - 1)) / g;
  const benda = rupa === "benda";
  return (
    <Bingkai rupa={rupa} label={`${g} bagian dikali berapa sama dengan ${n}`}>
      {Array.from({ length: g }, (_, i) => {
        const x = 10 + i * (w + 4);
        return (
          <g key={i}>
            <rect x={x} y={26} width={w} height={50} rx={6} fill={benda ? "#FDE68A" : "#FFFFFF"} stroke={benda ? "#B45309" : "#64748B"} strokeWidth={1.6} strokeDasharray={benda ? undefined : "4 3"} />
            {benda && w >= 24 ? (
              <text x={x + w / 2} y={44} textAnchor="middle" fontSize={Math.min(20, w * 0.6)}>
                {"\u{1F9FA}"}
              </text>
            ) : null}
            <Teks x={x + w / 2} y={66} u={Math.min(16, w * 0.55)} isi="?" warna={MERAH} />
          </g>
        );
      })}
      <Teks x={150} y={124} u={28} isi={`${g} × ? = ${n}`} />
      <Teks x={150} y={166} u={10.5} isi={`${g} bagian, jumlah seluruhnya ${n}`} warna={benda ? COKLAT : "#1E3A8A"} />
    </Bingkai>
  );
}

function FigBalik({ a, b, rupa, ikon }: { a: number; b: number; rupa: Rupa; ikon?: string }) {
  const c = a * b;
  if (rupa === "lambang")
    return (
      <Bingkai rupa={rupa} label={`Kartu ${a} kali ${b} sama dengan ${c}`}>
        <Teks x={150} y={76} u={26} isi={`${a} × ${b} = ${c}`} />
        <Teks x={150} y={128} u={26} isi={`${c} : ${a} = ?`} />
        <Teks x={150} y={166} u={10.5} isi="perkalian dan pembagian berkaitan" warna="#4338CA" />
      </Bingkai>
    );
  const s = Math.min(260 / b, 92 / a);
  return (
    <Bingkai rupa={rupa} label={`Susunan ${a} baris ${b} kolom`}>
      {Array.from({ length: c }, (_, i) => (
        <Butir key={i} cx={20 + (260 - b * s) / 2 + ((i % b) + 0.5) * s} cy={24 + (92 - a * s) / 2 + (Math.floor(i / b) + 0.5) * s} s={s} rupa={rupa} ikon={ikon} />
      ))}
      <Teks x={150} y={140} u={20} isi={`${a} × ${b} = ${c}`} />
      <Teks x={150} y={178} u={20} isi={`${c} : ${a} = ?`} warna={MERAH} />
    </Bingkai>
  );
}

function FigPeriksa({ n, g, dikira, rupa, ikon }: { n: number; g: number; dikira: number; rupa: Rupa; ikon?: string }) {
  if (rupa === "lambang")
    return (
      <Bingkai rupa={rupa} label={`Periksa ${n} dibagi ${g} sama dengan ${dikira}`}>
        <Teks x={150} y={62} u={24} isi={`${n} : ${g} = ${dikira}`} />
        <Teks x={150} y={108} u={24} isi={`${g} × ${dikira} = ?`} />
        <Teks x={150} y={150} u={13} isi={`cocok dengan ${n}?`} warna="#4338CA" />
      </Bingkai>
    );
  const w = (280 - 4 * (g - 1)) / g;
  const benda = rupa === "benda";
  return (
    <Bingkai rupa={rupa} label={`${g} kotak berisi ${dikira}`}>
      <Teks x={150} y={36} u={20} isi={`${n} : ${g} = ${dikira}`} />
      {Array.from({ length: g }, (_, i) => {
        const x = 10 + i * (w + 4);
        return (
          <g key={i}>
            <rect x={x} y={50} width={w} height={90} rx={6} fill={benda ? "#FDE68A" : "#FFFFFF"} stroke={benda ? "#B45309" : "#64748B"} strokeWidth={1.6} strokeDasharray={benda ? undefined : "4 3"} />
            <Tumpukan n={dikira} x={x + 3} y={54} w={w - 6} h={82} rupa={rupa} ikon={ikon} warna={WARNA_BAGIAN[i % 9]} />
          </g>
        );
      })}
      <Teks x={150} y={174} u={20} isi={`${g} × ${dikira} = ?`} warna={MERAH} />
    </Bingkai>
  );
}

function FigIstilah({ n, g, q, sorot, rupa }: { n: number; g: number; q: number; sorot: "dibagi" | "pembagi" | "hasil"; rupa: Rupa }) {
  const benda = rupa === "benda";
  const kotakSorot = sorot === "dibagi" ? { x: 36, w: 56 } : sorot === "pembagi" ? { x: 130, w: 52 } : { x: 220, w: 56 };
  return (
    <Bingkai rupa={rupa} label={`Kalimat pembagian ${n} dibagi ${g} sama dengan ${q}`}>
      {benda ? (
        <g>
          <text x={32} y={44} textAnchor="middle" fontSize={22}>
            {"\u{1F3F7}"}
          </text>
          <text x={268} y={44} textAnchor="middle" fontSize={22}>
            {"\u{1F381}"}
          </text>
        </g>
      ) : null}
      <rect x={kotakSorot.x} y={62} width={kotakSorot.w} height={56} rx={8} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={2} strokeDasharray="4 3" />
      <Teks x={kotakSorot.x + kotakSorot.w / 2} y={56} u={16} isi="?" warna={MERAH} />
      <Teks x={64} y={102} u={34} isi={String(n)} />
      <Teks x={112} y={100} u={34} isi=":" />
      <Teks x={156} y={102} u={34} isi={String(g)} />
      <Teks x={204} y={100} u={34} isi="=" />
      <Teks x={248} y={102} u={34} isi={String(q)} />
      <Teks x={150} y={160} u={11} isi="kalimat pembagian" warna={benda ? COKLAT : "#4338CA"} />
    </Bingkai>
  );
}

/** Gambar satu klaim tokoh pada Cari kesalahan. */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "hasil") return <FigBagi n={k.n} g={k.g} rupa={rupa} ikon={k.ikon} />;
  return <FigPeriksa n={k.n} g={k.g} dikira={k.dikira} rupa={rupa} ikon={k.ikon} />;
}

/* ------------------------------ Gambar tugas ------------------------------ */
function GambarTugas({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  switch (l.tipe) {
    case "bagi":
      return <FigBagi n={l.n} g={l.g} rupa={rupa} ikon={l.ikon} />;
    case "kurang":
      return <FigKurang n={l.n} g={l.g} rupa={rupa} ikon={l.ikon} />;
    case "isi":
      return <FigIsi n={l.n} q={l.q} rupa={rupa} ikon={l.ikon} />;
    case "pasang":
      return <FigPasang g={l.g} n={l.n} rupa={rupa} />;
    case "balik":
      return <FigBalik a={l.a} b={l.b} rupa={rupa} ikon={l.ikon} />;
    case "periksa":
      return <FigPeriksa n={l.n} g={l.g} dikira={l.dikira} rupa={rupa} ikon={l.ikon} />;
    case "istilah":
      return <FigIstilah n={l.n} g={l.g} q={l.n / l.g} sorot={l.sorot} rupa={rupa} />;
    case "deret":
      return <FigKurang n={l.n} g={l.g} rupa={rupa} ikon={l.ikon} rantai={false} />;
    case "urutlangkah":
      return <FigBagi n={l.n} g={l.g} rupa={rupa} ikon={l.ikon} />;
  }
}

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Ketuk hasil tiap pengurangan satu per satu, mulai dari yang pertama. */
function UrutDeret({ l, rupa, salah, siap, info }: PK & { l: LDeret }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const benar = deretNilai(l.n, l.g);
  const tampil = acakTetap(benar.length, benar.map((_, i) => i));
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === benar.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info("Betul! Hasil pengurangan berikutnya yang mana?");
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <GambarTugas l={l} rupa={rupa} />
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Ketuk hasil tiap pengurangan secara berurutan">
        {tampil.map((i) => (
          <button
            key={benar[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] min-w-[72px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-xl font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {benar[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Susun langkah membagi rata dengan mengetuk langkah pertama sampai terakhir. */
function UrutLangkah({ l, rupa, salah, siap, info }: PK & { l: LUrutLangkah }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const tampil = acakTetap(LANGKAH_BAGI.length, [0, 1, 2, 3]);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === LANGKAH_BAGI.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info("Betul! Langkah berikutnya yang mana?");
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <GambarTugas l={l} rupa={rupa} />
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk langkah membagi rata secara berurutan">
        {tampil.map((i) => (
          <button
            key={LANGKAH_BAGI[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {LANGKAH_BAGI[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
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
    case "deret":
      return <UrutDeret {...pk} rupa={rupa} l={d} />;
    case "urutlangkah":
      return <UrutLangkah {...pk} rupa={rupa} l={d} />;
    default:
      return <GambarTugas l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahBagi({ ls, rupa, bicara, onBenar }: P) {
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
            <JawabSuaraBagi
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
