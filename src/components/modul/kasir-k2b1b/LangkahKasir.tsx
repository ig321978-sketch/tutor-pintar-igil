"use client";

import React, { useEffect, useMemo, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  acak,
  angkaJawab,
  dasarDari,
  istilah,
  kalimatKunci,
  kalimatTanya,
  kartuAngka,
  kartuPanjang,
  kata,
  modeLangkah,
  petunjukSalah,
  sesuaikanPetunjuk,
  pilihanDari,
  type Cara,
  type Kolom,
  type Langkah,
  type LangkahBagan,
  type LangkahBalok,
  type LangkahDasar,
  type LangkahPanjang,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahTabel,
  type Rupa,
} from "./logika";
import { SETS } from "./data";
import {
  BAGAN,
  BAGAN2,
  JARI_BALOK,
  JARI_PAKET,
  KOLOM_TABEL,
  LEBAR_ADEGAN,
  SLOT_P,
  SLOT_S,
  TINGGI_ADEGAN,
  UKURAN_BALOK,
  UKURAN_CHIP,
  UKURAN_KARTU,
  UKURAN_KUBUS,
  UKURAN_LEPAS,
  UKURAN_PAKET,
  letakBalok,
  letakChip,
  letakKartu,
  letakKubus,
  letakLepas,
  letakLepasKolom,
  letakLepasUraian,
  letakPaket,
  letakPaketKolom,
  letakPaketUraian,
  letakRefLepas,
  letakRefPaket,
  periksaCentang,
  periksaLingkari,
  pusatBagan,
  type Goresan,
} from "./periksa";
import { JawabSuaraKasir, JawabTulisKasir, PilihanKasir } from "./Jawab50";

/**
 * Satu tugas CPA Kelas 2 Bab 1 Sub-Bab B: kegiatan metode (Metode IGIL: memindahkan kotak penuh dan kue lepas ke kolom tabel, Base-Ten Blocks: mengetuk balok
 * panjang lalu kubus kecil dan menukar sepuluh kubus dengan satu balok, Place Value Chart: menyusun kartu angka di bagan atau melingkari angka, Expanded Form:
 * menyusun bentuk panjang yang paling ringkas), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya.
 * Rupa: benda berwarna dengan emoji (Concrete), bingkai, titik, dan batang polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai lima puluh memakai Jawab50.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      {children}
    </svg>
  );
}
function Judul({ teks }: { teks: string }) {
  return (
    <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
      {teks}
    </text>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk soal yang langsung menjawab dari gambar yang sudah jadi). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Benda berwarna (Concrete) dan bentuk polos (Pictorial) ------------------------------ */
type Warna = { hijau?: boolean; merah?: boolean; sorot?: boolean; redup?: boolean };
const garisDari = (o: Warna, dasar: string) => (o.hijau ? HIJAU : o.merah ? MERAH : o.sorot ? "#B45309" : dasar);
const tebalDari = (o: Warna) => (o.hijau || o.merah || o.sorot ? 3 : 1.5);

/** Kotak penuh isi sepuluh: kotak kue berhias emoji (benda) atau bingkai berisi sepuluh titik (diagram). Berpusat (x, y). */
function Paket({ rupa, set, x, y, w = UKURAN_PAKET.w, h = UKURAN_PAKET.h, ...o }: { rupa: Rupa; set: string; x: number; y: number; w?: number; h?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  if (rupa === "benda")
    return (
      <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={5} fill="#FDE68A" stroke={g} strokeWidth={tebalDari(o)} />
        <line x1={x - w / 2 + 4} x2={x + w / 2 - 4} y1={y - h / 2 + h * 0.24} y2={y - h / 2 + h * 0.24} stroke={COKLAT} strokeWidth={1.2} />
        <text x={x} y={y + h * 0.3} textAnchor="middle" fontSize={h * 0.62}>
          {SETS[set]?.emoji ?? SETS.kue.emoji}
        </text>
      </g>
    );
  return (
    <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={3} fill="#FFFFFF" stroke={g} strokeWidth={tebalDari(o)} />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={x - w / 2 + w * (0.14 + (i % 5) * 0.18)} cy={y - h / 2 + h * (0.3 + Math.floor(i / 5) * 0.4)} r={Math.max(1.4, Math.min(w, h) * 0.07)} fill={UNGU} />
      ))}
    </g>
  );
}
/** Kue lepas (benda) atau titik polos (diagram). Berpusat (x, y). */
function Lepas({ rupa, set, x, y, s = UKURAN_LEPAS, ...o }: { rupa: Rupa; set: string; x: number; y: number; s?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  if (rupa === "benda")
    return (
      <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
        <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={5} fill={SETS[set]?.warna ?? SETS.kue.warna} stroke={g} strokeWidth={tebalDari(o)} />
        <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.66}>
          {SETS[set]?.emoji ?? SETS.kue.emoji}
        </text>
      </g>
    );
  return (
    <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
      <circle cx={x} cy={y} r={s * 0.34} fill={UNGU} stroke={g} strokeWidth={o.hijau || o.merah || o.sorot ? 3 : 1} />
    </g>
  );
}
/** Balok panjang sepuluh ruas, berpusat (x, y). */
function Balok({ rupa, x, y, w = UKURAN_BALOK.w, h = UKURAN_BALOK.h, ...o }: { rupa: Rupa; x: number; y: number; w?: number; h?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  return (
    <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2} fill={rupa === "benda" ? "#F59E0B" : "#FFFFFF"} stroke={g} strokeWidth={tebalDari(o)} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x - w / 2} x2={x + w / 2} y1={y - h / 2 + (h * (i + 1)) / 10} y2={y - h / 2 + (h * (i + 1)) / 10} stroke={rupa === "benda" ? COKLAT : UNGU} strokeWidth={0.8} />
      ))}
    </g>
  );
}
/** Kubus kecil, berpusat (x, y). */
function Kubus({ rupa, set, x, y, s = UKURAN_KUBUS, ...o }: { rupa: Rupa; set: string; x: number; y: number; s?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  return (
    <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={2} fill={rupa === "benda" ? "#FB7185" : "#FFFFFF"} stroke={g} strokeWidth={tebalDari(o)} />
      {rupa === "benda" ? (
        <text x={x} y={y + s * 0.26} textAnchor="middle" fontSize={s * 0.62}>
          {SETS[set]?.emoji ?? SETS.kue.emoji}
        </text>
      ) : null}
    </g>
  );
}

/** Kolom bernama (nampan kayu untuk benda, sel tabel untuk diagram). */
function KolomBox({ rupa, x, y, w, h, nama, sorot, merah, onKetuk, children }: { rupa: Rupa; x: number; y: number; w: number; h: number; nama: string; sorot?: boolean; merah?: boolean; onKetuk?: () => void; children?: React.ReactNode }) {
  const g = merah ? MERAH : sorot ? "#B45309" : rupa === "benda" ? COKLAT : UNGU;
  return (
    <g {...(onKetuk ? ketuk(onKetuk) : {})} aria-label={`kolom ${nama}`}>
      <rect x={x} y={y} width={w} height={h} rx={rupa === "benda" ? 10 : 3} fill={rupa === "benda" ? "#F5D7A1" : "#FFFFFF"} stroke={g} strokeWidth={merah || sorot ? 3.4 : rupa === "benda" ? 3 : 1.8} />
      {rupa === "benda" ? null : <rect x={x} y={y} width={w} height={16} rx={3} fill={nama === "Puluhan" ? "#BFDBFE" : "#FBCFE8"} stroke={g} strokeWidth={1.2} />}
      <text x={x + w / 2} y={y + 12} textAnchor="middle" fontSize={9.4} fontWeight={900} fill={rupa === "benda" ? COKLAT : UNGU}>
        {nama}
      </text>
      {children}
    </g>
  );
}

/** Isi satu kolom bagan menurut rupa: gambar mini (benda, diagram), angka (diagram, lambang). Kolom berukuran rect. */
function IsiBagan({ rupa, set, kol, n, rect }: { rupa: Rupa; set: string; kol: Kolom; n: number; rect: { x: number; y: number; w: number; h: number } }) {
  const cx = rect.x + rect.w / 2;
  if (rupa === "lambang")
    return (
      <text x={cx} y={rect.y + rect.h * 0.7} textAnchor="middle" fontSize={rect.h > 60 ? 34 : 28} fontWeight={900} fill={UNGU}>
        {n}
      </text>
    );
  const kecil = rect.h <= 60;
  const yGambar = rect.y + (kecil ? 30 : 36);
  const gambar =
    kol === "puluhan"
      ? Array.from({ length: n }, (_, i) => <Paket key={i} rupa={rupa} set={set} x={cx - ((n - 1) * 24) / 2 + i * 24} y={yGambar} w={21} h={14} />)
      : Array.from({ length: n }, (_, j) => <Lepas key={j} rupa={rupa} set={set} x={cx - (Math.min(n, 5) - 1) * 8 + (j % 5) * 16} y={yGambar - (kecil ? 5 : 8) + Math.floor(j / 5) * 15} s={13} />);
  return (
    <g>
      {gambar}
      {rupa === "diagram" ? (
        <text x={cx} y={rect.y + rect.h - 6} textAnchor="middle" fontSize={kecil ? 15 : 18} fontWeight={900} fill={UNGU}>
          {n}
        </text>
      ) : null}
    </g>
  );
}

/** Pernyataan data untuk rupa lambang. */
function Pernyataan({ baris, atas, bawah }: { baris: string[]; atas?: string; bawah?: React.ReactNode }) {
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
      {atas ? <p className="text-sm text-[#7C3AED]">{atas}</p> : null}
      <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
        {baris.map((b) => (
          <li key={b} className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">
            {b}
          </li>
        ))}
      </ul>
      {bawah ? <p className="text-lg">{bawah}</p> : null}
    </div>
  );
}
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;

/* ------------------------------ Metode IGIL: tabel puluhan dan satuan ------------------------------ */
function GambarTabel({ rupa, set, t, s, pakDi, lepDi, tampil }: { rupa: Rupa; set: string; t: number; s: number; pakDi: number[]; lepDi: number[]; tampil: "isi" | "kosong" | "proses" }) {
  const K = KOLOM_TABEL;
  const paketDiKolom = tampil === "isi" ? Array.from({ length: t }, (_, i) => i) : tampil === "proses" ? pakDi : [];
  const lepasDiKolom = tampil === "isi" ? Array.from({ length: s }, (_, j) => j) : tampil === "proses" ? lepDi : [];
  return (
    <g>
      <KolomBox rupa={rupa} x={K.p.x} y={K.y} w={K.p.w} h={K.h} nama="Puluhan">
        {paketDiKolom.map((_, n) => {
          const p = letakPaketKolom(n);
          return <Paket key={n} rupa={rupa} set={set} x={p.x} y={p.y} w={22} h={15} />;
        })}
        {rupa === "diagram" && tampil !== "kosong" ? (
          <text x={K.p.x + K.p.w - 10} y={K.y + K.h - 6} textAnchor="end" fontSize={16} fontWeight={900} fill={UNGU}>
            {paketDiKolom.length}
          </text>
        ) : null}
      </KolomBox>
      <KolomBox rupa={rupa} x={K.s.x} y={K.y} w={K.s.w} h={K.h} nama="Satuan">
        {lepasDiKolom.map((_, n) => {
          const p = letakLepasKolom(n);
          return <Lepas key={n} rupa={rupa} set={set} x={p.x} y={p.y} s={15} />;
        })}
        {rupa === "diagram" && tampil !== "kosong" ? (
          <text x={K.s.x + K.s.w - 10} y={K.y + K.h - 6} textAnchor="end" fontSize={16} fontWeight={900} fill={UNGU}>
            {lepasDiKolom.length}
          </text>
        ) : null}
      </KolomBox>
    </g>
  );
}

function Tabel({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LangkahTabel }) {
  const w = istilah(rupa);
  const mode = diam ? "langsung" : modeLangkah(l, rupa, cara);
  const [pakDi, setPakDi] = useState<number[]>([]);
  const [lepDi, setLepDi] = useState<number[]>([]);
  const [pilih, setPilih] = useState<{ j: "paket" | "lepas"; i: number } | null>(null);
  const [merah, setMerah] = useState<Kolom | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(mode === "langsung" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
        <p className="text-sm text-[#7C3AED]">Tabel puluhan dan satuan</p>
        <table className="mx-auto w-full max-w-xs border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-[#1C01A5] bg-[#BFDBFE] px-2 py-1">Puluhan</th>
              <th className="border-2 border-[#1C01A5] bg-[#FBCFE8] px-2 py-1">Satuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-[#1C01A5] bg-white px-2 py-2 text-2xl">{l.t}</td>
              <td className="border-2 border-[#1C01A5] bg-white px-2 py-2 text-2xl">{l.s}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-base">
          {kalimatTanya(l)} <Tanya />
        </p>
      </div>
    );
  const pindah = (kol: Kolom) => {
    if (mode !== "pindah" || selesai) return;
    if (!pilih) {
      info(`Pilih dulu satu ${w.penuh} atau satu ${w.lepas}, lalu ketuk kolomnya.`);
      return;
    }
    const cocok = (pilih.j === "paket") === (kol === "puluhan");
    if (!cocok) {
      setMerah(kol);
      window.setTimeout(() => setMerah(null), 480);
      salah(pilih.j === "paket" ? `Satu ${w.penuh} berisi sepuluh, jadi masuk kolom puluhan.` : `${besar(w.lepas)} dihitung satu-satu, jadi masuk kolom satuan.`);
      return;
    }
    const baruP = pilih.j === "paket" ? [...pakDi, pilih.i] : pakDi;
    const baruL = pilih.j === "lepas" ? [...lepDi, pilih.i] : lepDi;
    setPakDi(baruP);
    setLepDi(baruL);
    setPilih(null);
    if (baruP.length === l.t && baruL.length === l.s) {
      setSelesai(true);
      siap(`Semua sudah dipindahkan. ${kalimatKunci(l)}`);
    } else info(pilih.j === "paket" ? `${besar(kata(baruP.length))} puluhan.` : `${besar(kata(baruL.length))} satuan.`);
  };
  const periksa = () => {
    const target = Array.from({ length: l.t }, (_, i) => letakPaket(i));
    const r = periksaCentang(goresan, target, JARI_PAKET);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak penuh, satu tanda." : r.nyasar > 0 ? `Tanda hanya untuk ${w.penuh}. ${besar(w.lepas)} jangan diberi tanda.` : `Masih ada ${w.penuh} yang belum diberi tanda.`);
    }
  };
  const tampil = mode === "pindah" ? "proses" : mode === "tanda" ? "kosong" : "isi";
  const gambar = (
    <g>
      <Judul teks={mode === "pindah" ? "pilih benda, lalu ketuk kolomnya" : mode === "tanda" ? `beri tanda pada tiap ${w.penuh}` : "tabel puluhan dan satuan"} />
      {mode === "pindah" || mode === "tanda" ? (
        <g aria-label="Benda yang akan dihitung">
          {Array.from({ length: l.t }, (_, i) => {
            if (mode === "pindah" && pakDi.includes(i)) return null;
            const p = letakPaket(i);
            return (
              <g key={`p${i}`} {...(mode === "pindah" ? ketuk(() => !selesai && setPilih({ j: "paket", i })) : {})} aria-label={`${w.penuh} ${kata(i + 1)}`}>
                <rect x={p.x - 26} y={p.y - 18} width={52} height={36} fill="transparent" />
                <Paket rupa={rupa} set={l.set} x={p.x} y={p.y} sorot={pilih?.j === "paket" && pilih.i === i} />
              </g>
            );
          })}
          {Array.from({ length: l.s }, (_, j) => {
            if (mode === "pindah" && lepDi.includes(j)) return null;
            const p = letakLepas(j);
            return (
              <g key={`l${j}`} {...(mode === "pindah" ? ketuk(() => !selesai && setPilih({ j: "lepas", i: j })) : {})} aria-label={`${w.lepas} ${kata(j + 1)}`}>
                <rect x={p.x - 14} y={p.y - 14} width={28} height={28} fill="transparent" />
                <Lepas rupa={rupa} set={l.set} x={p.x} y={p.y} sorot={pilih?.j === "lepas" && pilih.i === j} />
              </g>
            );
          })}
        </g>
      ) : null}
      <g>
        <GambarTabel rupa={rupa} set={l.set} t={l.t} s={l.s} pakDi={pakDi} lepDi={lepDi} tampil={tampil} />
        {mode === "pindah" ? (
          <>
            <rect x={KOLOM_TABEL.p.x} y={KOLOM_TABEL.y} width={KOLOM_TABEL.p.w} height={KOLOM_TABEL.h} fill="transparent" {...ketuk(() => pindah("puluhan"))} aria-label="ketuk kolom puluhan" stroke={merah === "puluhan" ? MERAH : "none"} strokeWidth={4} />
            <rect x={KOLOM_TABEL.s.x} y={KOLOM_TABEL.y} width={KOLOM_TABEL.s.w} height={KOLOM_TABEL.h} fill="transparent" {...ketuk(() => pindah("satuan"))} aria-label="ketuk kolom satuan" stroke={merah === "satuan" ? MERAH : "none"} strokeWidth={4} />
          </>
        ) : null}
      </g>
    </g>
  );
  if (mode === "tanda") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tabel puluhan dan satuan">{gambar}</Gambar>;
}

/* ------------------------------ Base-Ten Blocks: balok panjang dan kubus kecil ------------------------------ */
function Balokan({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LangkahBalok }) {
  const mode = diam ? "langsung" : modeLangkah(l, rupa, cara);
  const perluTukar = l.s >= 10;
  const [tukar, setTukar] = useState(!perluTukar);
  const [barTap, setBarTap] = useState<number[]>([]);
  const [kubTap, setKubTap] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(mode === "langsung" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas="Balok panjang dan kubus kecil"
        baris={[`${l.t} balok panjang`, `${l.s} kubus kecil`, ...(perluTukar ? ["Sepuluh kubus kecil = satu balok panjang"] : [])]}
        bawah={
          <>
            bilangan = <Tanya />
          </>
        }
      />
    );
  const sudahTukar = perluTukar && tukar;
  const banyakBar = l.t + (sudahTukar ? 1 : 0);
  const kubusAda = sudahTukar ? l.s - 10 : l.s;
  const statis = mode === "langsung" || mode === "tanda";
  const tampilBar = statis ? l.t : banyakBar;
  const tampilKubus = statis ? l.s : kubusAda;
  const kunciBar = Array.from({ length: tampilBar }, (_, i) => i);
  const ketukBar = (i: number) => {
    if (mode !== "ketuk" || selesai || barTap.includes(i)) return;
    if (!tukar) {
      salah("Tukar sepuluh kubus kecil dengan satu balok panjang dulu. Tekan tombol tukar.");
      return;
    }
    const baru = [...barTap, i];
    setBarTap(baru);
    info(`${besar(kata(10 * baru.length))}.`);
    if (baru.length === banyakBar && kubusAda === 0) {
      setSelesai(true);
      siap(kalimatKunci(l));
    }
  };
  const ketukKubus = (j: number) => {
    if (mode !== "ketuk" || selesai || kubTap.includes(j)) return;
    if (!tukar) {
      salah("Tukar sepuluh kubus kecil dengan satu balok panjang dulu. Tekan tombol tukar.");
      return;
    }
    if (barTap.length < banyakBar) {
      salah("Hitung balok panjang dulu, baru kubus kecil. Balok panjang dihitung sepuluh-sepuluh.");
      return;
    }
    const baru = [...kubTap, j];
    setKubTap(baru);
    if (baru.length === kubusAda) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(`${besar(kata(10 * banyakBar + baru.length))}.`);
  };
  const periksa = () => {
    const r = periksaCentang(goresan, kunciBar.map((i) => letakBalok(i)), JARI_BALOK);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu balok panjang, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk balok panjang. Kubus kecil jangan diberi tanda." : "Masih ada balok panjang yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={mode === "ketuk" ? "ketuk balok panjang dulu, lalu kubus kecil" : mode === "tanda" ? "beri tanda pada tiap balok panjang" : "balok panjang dan kubus kecil"} />
      {kunciBar.map((i) => {
        const p = letakBalok(i);
        return (
          <g key={`b${i}`} {...(mode === "ketuk" ? ketuk(() => ketukBar(i)) : {})} aria-label={`balok panjang ${kata(i + 1)}`}>
            <rect x={p.x - 18} y={p.y - 38} width={36} height={76} fill="transparent" />
            <Balok rupa={rupa} x={p.x} y={p.y} hijau={barTap.includes(i)} sorot={sudahTukar && i === l.t && !barTap.includes(i)} />
          </g>
        );
      })}
      {Array.from({ length: tampilKubus }, (_, j) => {
        const p = letakKubus(j);
        return (
          <g key={`k${j}`} {...(mode === "ketuk" ? ketuk(() => ketukKubus(j)) : {})} aria-label={`kubus kecil ${kata(j + 1)}`}>
            <rect x={p.x - 11} y={p.y - 11} width={22} height={22} fill="transparent" />
            <Kubus rupa={rupa} set={l.set} x={p.x} y={p.y} hijau={kubTap.includes(j)} />
          </g>
        );
      })}
      <line x1={14} x2={286} y1={150} y2={150} stroke={COKLAT} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={150} y={166} textAnchor="middle" fontSize={9} fontWeight={900} fill={COKLAT}>
        satu balok panjang = sepuluh kubus kecil
      </text>
    </g>
  );
  if (mode === "tanda") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Balok panjang dan kubus kecil">{gambar}</Gambar>
      {mode === "ketuk" && perluTukar && !tukar ? (
        <div className="flex justify-center">
          <Tombol
            teks={"\u{1F504} Tukar sepuluh kubus jadi satu balok"}
            onClick={() => {
              setTukar(true);
              info("Sepuluh kubus kecil ditukar dengan satu balok panjang. Sekarang hitung balok panjang dulu.");
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Place Value Chart: bagan puluhan dan satuan ------------------------------ */
function Bagan1({ rupa, set, t, s, sorot, merah, onKolom }: { rupa: Rupa; set: string; t: number; s: number; sorot?: Kolom | null; merah?: Kolom | null; onKolom?: (k: Kolom) => void }) {
  const kol = (k: Kolom) => (k === "puluhan" ? BAGAN.p : BAGAN.s);
  return (
    <g>
      {(["puluhan", "satuan"] as Kolom[]).map((k) => {
        const r = { x: kol(k).x, y: BAGAN.y, w: kol(k).w, h: BAGAN.h };
        return (
          <KolomBox key={k} rupa={rupa} {...r} nama={besar(k)} sorot={sorot === k} merah={merah === k} onKetuk={onKolom ? () => onKolom(k) : undefined}>
            <IsiBagan rupa={rupa} set={set} kol={k} n={k === "puluhan" ? t : s} rect={r} />
          </KolomBox>
        );
      })}
    </g>
  );
}
function Bagan2({ rupa, set, t, s }: { rupa: Rupa; set: string; t: number; s: number }) {
  const B = BAGAN2;
  const baris = (y: number, h: number, a: number, b: number) =>
    (["puluhan", "satuan"] as Kolom[]).map((k) => {
      const r = { x: k === "puluhan" ? B.p.x : B.s.x, y, w: k === "puluhan" ? B.p.w : B.s.w, h };
      return (
        <KolomBox key={`${y}${k}`} rupa={rupa} {...r} nama={besar(k)}>
          <IsiBagan rupa={rupa} set={set} kol={k} n={k === "puluhan" ? a : b} rect={r} />
        </KolomBox>
      );
    });
  return (
    <g>
      {baris(B.atas.y, B.atas.h, t, s)}
      <text x={150} y={96} textAnchor="middle" fontSize={11} fontWeight={900} fill={MERAH}>
        {"\u{1F504}"} kartu ditukar tempat
      </text>
      {baris(B.bawah.y, B.bawah.h, s, t)}
    </g>
  );
}

function Bagan({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LangkahBagan }) {
  const w = istilah(rupa);
  const mode = diam ? "langsung" : modeLangkah(l, rupa, cara);
  const kartu = useMemo(() => kartuAngka(l.t, l.s, l.benih), [l]);
  const [isiP, setIsiP] = useState<number | null>(null);
  const [isiS, setIsiS] = useState<number | null>(null);
  const [pilih, setPilih] = useState(-1);
  const [pakai, setPakai] = useState<number[]>([]);
  const [merah, setMerah] = useState<Kolom | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(mode === "langsung" && !diam, () => siap());
  const tukarJudul = l.tanya.t === "tukar";
  const ketukKolom = (k: Kolom) => {
    if (mode !== "susun" || selesai) return;
    if ((k === "puluhan" ? isiP : isiS) !== null) return;
    if (pilih < 0) {
      info("Pilih dulu satu kartu angka, lalu ketuk kolomnya.");
      return;
    }
    const isian = kartu[pilih];
    const benar = k === "puluhan" ? l.t : l.s;
    if (isian !== benar) {
      setMerah(k);
      window.setTimeout(() => setMerah(null), 480);
      salah(
        k === "puluhan"
          ? rupa === "lambang"
            ? "Kolom puluhan untuk angka di depan kata puluh. Cari angka yang pas."
            : `Kolom puluhan untuk banyak ${w.penuh}. Hitung dulu ada berapa.`
          : rupa === "lambang"
            ? "Kolom satuan untuk angka sisanya, di belakang kata puluh. Cari angka yang pas."
            : `Kolom satuan untuk banyak ${w.lepas}. Hitung dulu ada berapa.`,
      );
      return;
    }
    const barisP = k === "puluhan" ? isian : isiP;
    const barisS = k === "satuan" ? isian : isiS;
    if (k === "puluhan") setIsiP(isian);
    else setIsiS(isian);
    setPakai((x) => [...x, pilih]);
    setPilih(-1);
    if (barisP !== null && barisS !== null) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(k === "puluhan" ? `Puluhan ${kata(isian)}.` : `Satuan ${kata(isian)}.`);
  };
  const periksa = () => {
    const sasaran = [l.lingkari === "puluhan", l.lingkari === "satuan"];
    const r = periksaLingkari(goresan, [pusatBagan("puluhan"), pusatBagan("satuan")], sasaran);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu angka saja." : "Cari angka yang artinya cocok, lalu lingkari. Angka di kolom puluhan artinya puluhan, angka di kolom satuan artinya satuan.");
    }
  };
  const gambarBagan = tukarJudul ? (
    <Bagan2 rupa={rupa} set={l.set} t={l.t} s={l.s} />
  ) : mode === "susun" ? (
    <g>
      {(["puluhan", "satuan"] as Kolom[]).map((k) => {
        const r = { x: k === "puluhan" ? BAGAN.p.x : BAGAN.s.x, y: BAGAN.y, w: k === "puluhan" ? BAGAN.p.w : BAGAN.s.w, h: BAGAN.h };
        const isian = k === "puluhan" ? isiP : isiS;
        return (
          <KolomBox key={k} rupa={rupa} {...r} nama={besar(k)} merah={merah === k} onKetuk={() => ketukKolom(k)}>
            <text x={r.x + r.w / 2} y={r.y + r.h * 0.7} textAnchor="middle" fontSize={isian === null ? 26 : 34} fontWeight={900} fill={isian === null ? "#94A3B8" : UNGU}>
              {isian === null ? "?" : isian}
            </text>
          </KolomBox>
        );
      })}
    </g>
  ) : (
    <Bagan1 rupa={rupa} set={l.set} t={l.t} s={l.s} />
  );
  const gambar = (
    <g>
      <Judul teks={mode === "susun" ? "pilih kartu angka, lalu ketuk kolomnya" : mode === "lingkari" ? "lingkari angka yang artinya cocok" : tukarJudul ? "bagan sebelum dan sesudah kartu ditukar" : "bagan puluhan dan satuan"} />
      {mode === "susun" ? (
        <g aria-label="Contoh bilangan">
          {rupa === "lambang" ? (
            <text x={150} y={48} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
              {kata(10 * l.t + l.s)}
            </text>
          ) : (
            <>
              {Array.from({ length: l.t }, (_, i) => {
                const p = letakRefPaket(i);
                return <Paket key={`p${i}`} rupa={rupa} set={l.set} x={p.x} y={p.y} w={24} h={16} />;
              })}
              {Array.from({ length: l.s }, (_, j) => {
                const p = letakRefLepas(j);
                return <Lepas key={`l${j}`} rupa={rupa} set={l.set} x={p.x} y={p.y} s={12} />;
              })}
            </>
          )}
        </g>
      ) : null}
      {gambarBagan}
      {mode === "susun"
        ? kartu.map((v, i) => {
            if (pakai.includes(i)) return null;
            const p = letakKartu(i, kartu.length);
            return (
              <g key={i} {...ketuk(() => !selesai && setPilih(i))} aria-label={`kartu angka ${kata(v)}`}>
                <rect x={p.x - UKURAN_KARTU.w / 2} y={p.y - UKURAN_KARTU.h / 2} width={UKURAN_KARTU.w} height={UKURAN_KARTU.h} rx={6} fill={pilih === i ? "#FDE68A" : "#FFFFFF"} stroke={pilih === i ? "#B45309" : UNGU} strokeWidth={pilih === i ? 3.4 : 2} />
                <text x={p.x} y={p.y + 9} textAnchor="middle" fontSize={26} fontWeight={900} fill={UNGU}>
                  {v}
                </text>
              </g>
            );
          })
        : null}
    </g>
  );
  if (mode === "lingkari") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bagan puluhan dan satuan">{gambar}</Gambar>;
}

/* ------------------------------ Expanded Form: bentuk panjang ------------------------------ */
function Panjang({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LangkahPanjang }) {
  const mode = diam ? "langsung" : modeLangkah(l, rupa, cara);
  const k = kartuPanjang(l.t, l.s);
  const chip = useMemo(() => acak([{ v: k.puluhan[0], j: "puluhan" as Kolom, ok: true }, { v: k.puluhan[1], j: "puluhan" as Kolom, ok: false }, { v: k.satuan[0], j: "satuan" as Kolom, ok: true }, { v: k.satuan[1], j: "satuan" as Kolom, ok: false }], l.benih), [l]); // eslint-disable-line react-hooks/exhaustive-deps
  const [isiP, setIsiP] = useState<number | null>(null);
  const [isiS, setIsiS] = useState<number | null>(null);
  const [pilih, setPilih] = useState(-1);
  const [pakai, setPakai] = useState<number[]>([]);
  const [merah, setMerah] = useState<Kolom | null>(null);
  const [selesai, setSelesai] = useState(false);
  useSiapLangsung(mode === "langsung" && !diam, () => siap());
  const n = 10 * l.t + l.s;
  const ketukSlot = (kol: Kolom) => {
    if (mode !== "susun" || selesai) return;
    if ((kol === "puluhan" ? isiP : isiS) !== null) return;
    if (pilih < 0) {
      info("Pilih dulu satu kartu, lalu ketuk tempatnya.");
      return;
    }
    const c = chip[pilih];
    const goyang = (p: string) => {
      setMerah(kol);
      window.setTimeout(() => setMerah(null), 480);
      salah(p);
    };
    if (c.j !== kol) {
      goyang(c.j === "puluhan" ? "Kartu itu puluhan. Taruh di tempat puluhan." : "Kartu itu satuan. Taruh di tempat satuan.");
      return;
    }
    if (!c.ok) {
      goyang(kol === "puluhan" ? "Puluhan itu masih bisa ditambah. Kotak penuh yang tersisa masih bisa ditaruh di sini, jadi pilih puluhan yang lebih besar." : "Satuan itu sepuluh atau lebih, padahal sepuluh satuan bisa dikemas jadi satu puluhan. Pilih satuan yang kurang dari sepuluh.");
      return;
    }
    const barisP = kol === "puluhan" ? c.v : isiP;
    const barisS = kol === "satuan" ? c.v : isiS;
    if (kol === "puluhan") setIsiP(c.v);
    else setIsiS(c.v);
    setPakai((x) => [...x, pilih]);
    setPilih(-1);
    if (barisP !== null && barisS !== null) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(`${besar(kata(c.v))} sudah ditaruh.`);
  };
  const slot = (kol: Kolom, r: { x: number; y: number; w: number; h: number }) => {
    const v = kol === "puluhan" ? isiP : isiS;
    return (
      <g key={kol} {...(mode === "susun" ? ketuk(() => ketukSlot(kol)) : {})} aria-label={`tempat ${kol}`}>
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={8} fill={v === null ? "#FFFBEB" : "#DCFCE7"} stroke={merah === kol ? MERAH : v === null ? COKLAT : HIJAU} strokeWidth={merah === kol ? 3.6 : 2.4} strokeDasharray={v === null ? "6 3" : undefined} />
        <text x={r.x + r.w / 2} y={r.y + 14} textAnchor="middle" fontSize={9} fontWeight={900} fill={COKLAT}>
          {besar(kol)}
        </text>
        <text x={r.x + r.w / 2} y={r.y + r.h - 9} textAnchor="middle" fontSize={v === null ? 22 : 26} fontWeight={900} fill={v === null ? "#94A3B8" : UNGU}>
          {v === null ? "?" : v}
        </text>
      </g>
    );
  };
  /** Gambar bentuk panjang tanpa kegiatan: kelompok puluhan, tanda tambah, kelompok satuan, dan tulisan yang ditanyakan. */
  const statik = () => {
    if (rupa === "lambang") {
      const teksBentuk = l.tanya === "gabung" ? `${10 * l.t} + ${l.s} = ?` : l.tanya === "satuan" ? `${n} = ${10 * l.t} + ?` : `${n} = ? + ${l.s}`;
      return (
        <text x={150} y={110} textAnchor="middle" fontSize={30} fontWeight={900} fill={UNGU}>
          {teksBentuk}
        </text>
      );
    }
    const tanyaP = l.tanya === "puluhan";
    const tanyaS = l.tanya === "satuan";
    return (
      <g>
        {Array.from({ length: l.t }, (_, i) => {
          const p = letakPaketUraian(i);
          return <Paket key={`p${i}`} rupa={rupa} set={l.set} x={p.x} y={p.y} w={24} h={16} />;
        })}
        <text x={168} y={82} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
          +
        </text>
        {Array.from({ length: l.s }, (_, j) => {
          const p = letakLepasUraian(j);
          return <Lepas key={`l${j}`} rupa={rupa} set={l.set} x={p.x} y={p.y} s={15} />;
        })}
        <text x={34 + ((l.t - 1) * 28) / 2} y={112} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {tanyaP ? "puluhan: ?" : `${kata(10 * l.t)}`}
        </text>
        <text x={228} y={112} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {tanyaS ? "satuan: ?" : `${kata(l.s)}`}
        </text>
        <text x={150} y={150} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
          {l.tanya === "gabung" ? "sama dengan: ?" : `sama dengan ${kata(n)}`}
        </text>
      </g>
    );
  };
  const gambar = (
    <g>
      <Judul teks={mode === "susun" ? "pilih kartu, lalu ketuk tempatnya" : "bentuk panjang"} />
      {mode === "susun" ? (
        <g aria-label="Bilangan yang disusun">
          {rupa === "lambang" ? (
            <text x={150} y={56} textAnchor="middle" fontSize={16} fontWeight={900} fill={UNGU}>
              {kata(n)}
            </text>
          ) : (
            <>
              {Array.from({ length: l.t }, (_, i) => {
                const p = letakRefPaket(i);
                return <Paket key={`p${i}`} rupa={rupa} set={l.set} x={p.x} y={p.y + 8} w={24} h={16} />;
              })}
              {Array.from({ length: l.s }, (_, j) => {
                const p = letakRefLepas(j);
                return <Lepas key={`l${j}`} rupa={rupa} set={l.set} x={p.x} y={p.y + 8} s={12} />;
              })}
            </>
          )}
          {slot("puluhan", SLOT_P)}
          <text x={150} y={122} textAnchor="middle" fontSize={26} fontWeight={900} fill={MERAH}>
            +
          </text>
          {slot("satuan", SLOT_S)}
          {chip.map((c, i) => {
            if (pakai.includes(i)) return null;
            const p = letakChip(i);
            return (
              <g key={i} {...ketuk(() => !selesai && setPilih(i))} aria-label={`kartu ${c.j} ${kata(c.v)}`}>
                <rect x={p.x - UKURAN_CHIP.w / 2} y={p.y - UKURAN_CHIP.h / 2} width={UKURAN_CHIP.w} height={UKURAN_CHIP.h} rx={6} fill={pilih === i ? "#FDE68A" : c.j === "puluhan" ? "#BFDBFE" : "#FBCFE8"} stroke={pilih === i ? "#B45309" : UNGU} strokeWidth={pilih === i ? 3.4 : 2} />
                <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
                  {c.v}
                </text>
              </g>
            );
          })}
        </g>
      ) : (
        statik()
      )}
    </g>
  );
  return <Gambar label="Bentuk panjang">{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "tabel" ? <Tabel {...props} l={l} /> : l.tipe === "balok" ? <Balokan {...props} l={l} /> : l.tipe === "bagan" ? <Bagan {...props} l={l} /> : <Panjang {...props} l={l} />;
}

function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar) salah(`Lihat lagi. ${l.keliru}`);
    else {
      setTahap("alasan");
      info(`Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    }
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
          {l.jawabTokoh !== undefined ? ` Jawabanku ${l.jawabTokoh}.` : ""}
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

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahKasir({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const d = dasarDari(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
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
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(sesuaikanPetunjuk(`${awalan}${petunjukSalah(l, m)}`, rupa));
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const tanya = kalimatTanya(d);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisKasir kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraKasir kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanKasir pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
