"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  hubungan,
  hurufDari,
  indeksBanding,
  indeksPerantara,
  indeksSama,
  kalimatKunci,
  kata,
  pernyataan,
  petunjukSalah,
  pilihanDari,
  urutanTangga,
  type Hubungan,
  type Langkah,
  type LangkahBanding,
  type LangkahDasar,
  type LangkahLangsung,
  type LangkahPerantara,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahTangga,
  type Rupa,
} from "./logika";
import { EMOJI, NAMA_BENDA, PALET } from "./data";
import {
  DASAR,
  DASAR_ATAS,
  DASAR_BAWAH,
  LEBAR_ADEGAN,
  SATU,
  SATU_T,
  TINGGI_ADEGAN,
  jariTanda,
  lebarBatang,
  letakX,
  periksaCentang,
  periksaLingkari,
  pusatBenda,
  puncakT,
  puncakY,
  titikTanda,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 7 Sub-Bab A: kegiatan metode (Metode IGIL Banding Panjang dari garis awal, Direct Comparison dengan tali lurus di ujung,
 * Indirect Comparison dengan tali perantara, Seriation memindahkan benda menjadi tangga), soal Cari kesalahan (putuskan benar atau salah, pilih alasan,
 * lalu jawab), lalu menjawab dengan caranya. Rupa: benda berwarna dengan emoji di ujungnya (Concrete), batang polos (Pictorial), huruf dan kata saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai dua belas memakai ulang Bab 5 Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const TALI = "#D97706";
const emoji = (j: string) => EMOJI[j] ?? EMOJI.tiang;

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
const Gambar = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
    {children}
  </svg>
);
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={18} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk rupa lambang yang langsung menjawab). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Barisan benda berdiri di garis awal ------------------------------ */
type Bar = {
  isi: number[];
  rupa: Rupa;
  jenis: string;
  alas?: number[];
  acuan?: number;
  hijau?: number[];
  merah?: number;
  /** Garis tali lurus melintang di tinggi benda sepanjang ini (satuan). */
  garisTali?: number;
  /** Tali perantara berdiri di kiri, sepanjang ini (satuan). */
  taliKiri?: number;
  /** Tulisan kecil di atas benda tertentu (hasil membandingkan dengan tali). */
  tulisan?: Record<number, { teks: string; warna: string; garis?: number }>;
  onKetuk?: (i: number) => void;
};

function Barisan({ isi, rupa, jenis, alas, acuan, hijau = [], merah = -1, garisTali, taliKiri, tulisan = {}, onKetuk }: Bar) {
  const n = isi.length;
  const w = lebarBatang(n);
  const benda = rupa === "benda";
  return (
    <g>
      <rect x={6} y={DASAR} width={288} height={benda ? 9 : 2} rx={benda ? 3 : 0} fill={benda ? "#92400E" : UNGU} />
      {benda ? <rect x={6} y={DASAR + 9} width={288} height={14} fill="#FDE68A" opacity={0.6} /> : null}
      {taliKiri !== undefined ? (
        <g aria-label="tali perantara">
          <rect x={8} y={DASAR - taliKiri * SATU} width={6} height={taliKiri * SATU} rx={3} fill={benda ? TALI : "#FFFFFF"} stroke={benda ? "#78350F" : UNGU} strokeWidth={1.4} />
          <text x={11} y={DASAR + 17} textAnchor="middle" fontSize={7} fontWeight={900} fill={benda ? "#78350F" : UNGU}>
            tali
          </text>
        </g>
      ) : null}
      {garisTali !== undefined ? <line x1={14} x2={290} y1={puncakY(garisTali)} y2={puncakY(garisTali)} stroke={MERAH} strokeWidth={1.6} strokeDasharray="5 3" /> : null}
      {isi.map((v, i) => {
        const x = letakX(i, n);
        const a = alas?.[i] ?? 0;
        const y = puncakY(v, a);
        const tanda = hijau.includes(i) ? HIJAU : merah === i ? MERAH : null;
        const t = tulisan[i];
        return (
          <g key={i} {...(onKetuk ? ketuk(() => onKetuk(i)) : {})} aria-label={`${benda ? NAMA_BENDA[jenis] ?? "tiang" : "batang"} ${kata(i + 1)}${i === acuan ? ", bertanda" : ""}`}>
            {a > 0 ? (
              <g aria-hidden="true">
                <rect x={x - w / 2 - 3} y={DASAR - a * SATU} width={w + 6} height={a * SATU} rx={2} fill="#C2410C" stroke="#7C2D12" strokeWidth={1.2} />
                {Array.from({ length: a }, (_, b) => (
                  <line key={b} x1={x - w / 2 - 3} x2={x + w / 2 + 3} y1={DASAR - (b + 1) * SATU} y2={DASAR - (b + 1) * SATU} stroke="#7C2D12" strokeWidth={0.8} />
                ))}
              </g>
            ) : null}
            <rect x={x - w / 2 - 3} y={y - 6} width={w + 6} height={v * SATU + 6} fill="transparent" />
            <rect x={x - w / 2} y={y} width={w} height={v * SATU} rx={benda ? 3 : 1} fill={benda ? PALET[i % PALET.length] : "#FFFFFF"} stroke={tanda ?? (benda ? "#1E3A8A" : UNGU)} strokeWidth={tanda ? 3 : 1.6} />
            {benda ? (
              <text x={x} y={y - 3} textAnchor="middle" fontSize={w > 17 ? 13 : 11}>
                {emoji(jenis)}
              </text>
            ) : null}
            {i === acuan ? <polygon points={`${x - 5},${y - (benda ? 20 : 11)} ${x + 5},${y - (benda ? 20 : 11)} ${x},${y - (benda ? 12 : 3)}`} fill={MERAH} stroke="#7F1D1D" strokeWidth={1} /> : null}
            {t ? (
              <g aria-hidden="true">
                {t.garis !== undefined ? <line x1={x - w / 2 - 4} x2={x + w / 2 + 4} y1={puncakY(t.garis)} y2={puncakY(t.garis)} stroke={MERAH} strokeWidth={1.8} strokeDasharray="3 2" /> : null}
                <text x={x} y={Math.min(y, puncakY(t.garis ?? 0)) - (benda ? 24 : 15)} textAnchor="middle" fontSize={7.5} fontWeight={900} fill={t.warna}>
                  {t.teks}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Pernyataan hubungan antarbenda untuk rupa lambang. */
function Pernyataan({ baris, atas, bawah }: { baris: string[]; atas?: string; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
      {atas ? <p className="text-sm text-[#7C3AED]">{atas}</p> : null}
      <ul className={`mx-auto grid max-w-md gap-1 ${baris.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
        {baris.map((b) => (
          <li key={b} className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">
            {b}
          </li>
        ))}
      </ul>
      <p className="text-lg">{bawah}</p>
    </div>
  );
}
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
const hurufDaftar = (n: number) => Array.from({ length: n }, (_, i) => hurufDari(i)).join(" ");

/* ------------------------------ Metode IGIL: Banding Panjang dari garis awal ------------------------------ */
function Banding({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahBanding }) {
  const n = l.isi.length;
  const target = indeksBanding(l);
  const [hijau, setHijau] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        baris={pernyataan(l.isi)}
        atas={`Benda ${hurufDaftar(n)}`}
        bawah={
          <>
            yang {l.arah === "tinggi" ? "lebih tinggi" : "lebih pendek"} dari {hurufDari(l.acuan)} = <Tanya />
          </>
        }
      />
    );
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || diam || i === l.acuan || hijau.includes(i)) return;
    if (target.includes(i)) {
      const baru = [...hijau, i];
      setHijau(baru);
      setMerah(-1);
      if (baru.length === target.length) {
        setSelesai(true);
        siap(kalimatKunci(l));
      } else info(kata(baru.length));
    } else {
      setMerah(i);
      const a = l.alas?.[i] ?? 0;
      salah(
        (l.alas?.[l.acuan] ?? 0) > 0
          ? "Benda bertanda berdiri di atas bata. Lihat dari garis awal yang sama, yaitu tanah, bukan dari ujung yang tampak."
          : a > 0
            ? "Benda itu berdiri di atas bata. Bandingkan dari garis awal yang sama."
            : `Ujung benda itu tidak ${l.arah === "tinggi" ? "melewati" : "kurang dari"} benda bertanda. Cari yang ${l.arah === "tinggi" ? "lebih tinggi" : "lebih pendek"}.`,
      );
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, target.map((i) => titikTanda(i, n, l.isi[i], l.alas?.[i] ?? 0)), jariTanda(n));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk benda yang memenuhi syaratnya. Bandingkan dari garis awal lagi." : "Masih ada benda yang memenuhi syarat dan belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `tandai yang ${l.arah === "tinggi" ? "lebih tinggi" : "lebih pendek"} dari benda bertanda` : `ketuk yang ${l.arah === "tinggi" ? "lebih tinggi" : "lebih pendek"} dari benda bertanda`} />
      <Barisan isi={l.isi} rupa={rupa} jenis={l.jenis} alas={l.alas} acuan={l.acuan} hijau={hijau} merah={merah} onKetuk={kanvas || diam ? undefined : ketukBenda} />
    </g>
  );
  if (diam) return <Gambar label="Benda yang dibandingkan dari garis awal">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Benda berwarna berdiri di garis awal" : "Batang polos berdiri di garis awal"}>{gambar}</Gambar>;
}

/* ------------------------------ Direct Comparison: tali lurus di ujung ------------------------------ */
function Langsung({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahLangsung }) {
  const n = l.isi.length;
  const target = indeksSama(l);
  const [hijau, setHijau] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && l.angka && !diam, () => siap());
  const lulus = () => {
    setSelesai(true);
    siap(kalimatKunci(l));
  };
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || diam || i === l.acuan || hijau.includes(i)) return;
    if (target.includes(i)) {
      const baru = [...hijau, i];
      setHijau(baru);
      setMerah(-1);
      if (baru.length === target.length) lulus();
      else info(kata(baru.length));
    } else {
      setMerah(i);
      salah(l.isi[i] > l.isi[l.acuan] ? "Ujung benda itu melewati tali, jadi lebih tinggi, bukan sama tinggi." : "Ujung benda itu belum kena tali, jadi lebih pendek, bukan sama tinggi.");
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, target.map((i) => titikTanda(i, n, l.isi[i])), jariTanda(n));
    if (r.benar) lulus();
    else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk benda yang ujungnya kena tali." : "Masih ada benda yang ujungnya kena tali dan belum diberi tanda.");
    }
  };
  if (rupa === "lambang") {
    if (l.angka)
      return (
        <Pernyataan
          baris={pernyataan(l.isi)}
          atas={`Benda ${hurufDaftar(n)}`}
          bawah={
            <>
              yang sama tinggi dengan {hurufDari(l.acuan)} = <Tanya />
            </>
          }
        />
      );
    return <HurufTanda l={l} kanvas={kanvas} diam={diam} salah={salah} lulus={lulus} info={info} />;
  }
  const gambar = (
    <g>
      <Judul teks={kanvas ? "tandai yang ujungnya kena tali" : "ketuk yang ujungnya kena tali"} />
      <Barisan isi={l.isi} rupa={rupa} jenis={l.jenis} acuan={l.acuan} garisTali={l.isi[l.acuan]} hijau={hijau} merah={merah} onKetuk={kanvas || diam ? undefined : ketukBenda} />
    </g>
  );
  if (diam) return <Gambar label="Tali lurus di ujung benda bertanda">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tali lurus ditarik di ujung benda bertanda">{gambar}</Gambar>;
}

/** Rupa lambang tanpa angka: pilih atau tandai huruf yang sama tinggi dengan huruf bertanda. */
function HurufTanda({ l, kanvas, diam, salah, lulus, info }: { l: LangkahLangsung; kanvas: boolean; diam?: boolean; salah: (p: string) => void; lulus: () => void; info: (p: string) => void }) {
  const n = l.isi.length;
  const target = indeksSama(l);
  const [hijau, setHijau] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const ketukHuruf = (i: number) => {
    if (selesai || diam || kanvas || i === l.acuan || hijau.includes(i)) return;
    if (target.includes(i)) {
      const baru = [...hijau, i];
      setHijau(baru);
      setMerah(-1);
      if (baru.length === target.length) {
        setSelesai(true);
        lulus();
      } else info(kata(baru.length));
    } else {
      setMerah(i);
      salah(`${hurufDari(i)} ${l.isi[i] > l.isi[l.acuan] ? "lebih tinggi" : "lebih pendek"} dari ${hurufDari(l.acuan)}. Cari huruf yang sama tinggi. Baca pernyataannya lagi.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, target.map((i) => ({ x: letakX(i, n), y: 118 })), jariTanda(n));
    if (r.benar) {
      setSelesai(true);
      lulus();
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu huruf, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk huruf yang sama tinggi dengan huruf bertanda." : "Masih ada huruf yang sama tinggi dan belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={`tandai yang sama tinggi dengan ${hurufDari(l.acuan)}`} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} {...(kanvas || diam ? {} : ketuk(() => ketukHuruf(i)))} aria-label={`huruf ${hurufDari(i)}`}>
          <rect x={letakX(i, n) - 13} y={96} width={26} height={30} rx={6} fill={i === l.acuan ? "#FEF3C7" : hijau.includes(i) ? "#DCFCE7" : merah === i ? "#FEE2E2" : "#FFFFFF"} stroke={hijau.includes(i) ? HIJAU : merah === i ? MERAH : UNGU} strokeWidth={2} />
          <text x={letakX(i, n)} y={117} textAnchor="middle" fontSize={17} fontWeight={900} fill={UNGU}>
            {hurufDari(i)}
          </text>
        </g>
      ))}
    </g>
  );
  return (
    <div className="space-y-2">
      <Pernyataan baris={pernyataan(l.isi)} atas={`Benda ${hurufDaftar(n)}`} bawah={<>sama tinggi dengan {hurufDari(l.acuan)}</>} />
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label="Huruf benda">{gambar}</Gambar>}
    </div>
  );
}

/* ------------------------------ Indirect Comparison: tali perantara ------------------------------ */
const WARNA_HUB: Record<Hubungan, string> = { lebih: "#B91C1C", kurang: "#1D4ED8", pas: HIJAU };
const KATA_HUB: Record<Hubungan, string> = { lebih: "lebih", kurang: "kurang", pas: "pas" };

function Perantara({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahPerantara }) {
  const n = l.isi.length;
  const tali = l.isi[l.acuan];
  const lain = l.isi.flatMap((_, i) => (i === l.acuan ? [] : [i]));
  const target = indeksPerantara(l);
  const [periksaDulu, setPeriksaDulu] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        baris={[`Tali sama panjang dengan ${hurufDari(l.acuan)}.`, ...pernyataan(l.isi)]}
        atas={`Benda ${hurufDaftar(n)}`}
        bawah={
          <>
            yang {l.tanya === "lebih" ? "lebih panjang dari tali" : l.tanya === "kurang" ? "kurang dari tali" : "pas dengan tali"} = <Tanya />
          </>
        }
      />
    );
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || diam || i === l.acuan || periksaDulu.includes(i)) return;
    const baru = [...periksaDulu, i];
    setPeriksaDulu(baru);
    const h = hubungan(l.isi[i], tali);
    if (baru.length === lain.length) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(h === "pas" ? "Tali pas." : h === "lebih" ? "Benda itu lebih panjang dari tali." : "Benda itu kurang dari tali.");
  };
  const periksa = () => {
    const r = periksaCentang(goresan, target.map((i) => titikTanda(i, n, l.isi[i])), jariTanda(n));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk benda yang cocok dengan tali. Bandingkan dengan garis tali lagi." : "Masih ada benda yang cocok dengan tali dan belum diberi tanda.");
    }
  };
  const tulisan: Record<number, { teks: string; warna: string; garis?: number }> = {};
  if (!kanvas) for (const i of periksaDulu) tulisan[i] = { teks: KATA_HUB[hubungan(l.isi[i], tali)], warna: WARNA_HUB[hubungan(l.isi[i], tali)], garis: tali };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `tandai yang ${l.tanya === "lebih" ? "lebih panjang dari" : l.tanya === "kurang" ? "kurang dari" : "pas dengan"} tali` : "bawa tali ke tiap benda: ketuk satu per satu"} />
      <Barisan isi={l.isi} rupa={rupa} jenis={l.jenis} acuan={l.acuan} taliKiri={tali} garisTali={kanvas || diam ? tali : undefined} tulisan={tulisan} onKetuk={kanvas || diam ? undefined : ketukBenda} />
    </g>
  );
  if (diam) return <Gambar label="Tali perantara dan benda">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tali perantara dibawa ke tiap benda">{gambar}</Gambar>;
}

/* ------------------------------ Seriation: menyusun tangga ------------------------------ */
function Tangga({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahTangga }) {
  const n = l.isi.length;
  const urut = urutanTangga(l.isi, l.arah);
  const [taruh, setTaruh] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  const ujung = l.arah === "naik" ? Math.min(...l.isi) : Math.max(...l.isi);
  const benda = rupa === "diagram" ? "batang" : "benda";
  if (rupa === "lambang")
    return l.tanya === "banyak" ? (
      <Pernyataan
        baris={[`Benda yang disusun: ${hurufDaftar(n)}`]}
        bawah={
          <>
            banyak benda di tangga = <Tanya />
          </>
        }
      />
    ) : (
      <Pernyataan
        baris={pernyataan(l.isi)}
        atas={`Benda ${hurufDaftar(n)}`}
        bawah={
          <>
            {hurufDari(l.acuan)} di urutan ke berapa dari {l.arah === "naik" ? "yang paling pendek" : "yang paling tinggi"}? <Tanya />
          </>
        }
      />
    );
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || diam || taruh.includes(i)) return;
    const harus = l.isi[urut[taruh.length]];
    if (l.isi[i] !== harus) {
      setMerah(i);
      salah(l.arah === "naik" ? `Itu belum yang paling pendek. Masih ada ${benda} yang lebih pendek, mulai dari yang paling pendek.` : `Itu belum yang paling tinggi. Masih ada ${benda} yang lebih tinggi, mulai dari yang paling tinggi.`);
      return;
    }
    setMerah(-1);
    const baru = [...taruh, i];
    setTaruh(baru);
    if (baru.length === n) {
      setSelesai(true);
      siap(`Tangganya sudah urut. ${kalimatKunci(l)}`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, l.isi.map((v, i) => pusatBenda(i, n, v)), l.isi.map((v) => v === ujung));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Anak tangga pertama dimulai dari ${l.arah === "naik" ? "benda yang paling pendek" : "benda yang paling tinggi"}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? `Lingkari satu ${benda} saja.` : `Anak tangga pertama dimulai dari ${benda} yang paling ${l.arah === "naik" ? "pendek" : "tinggi"}. Cari dan lingkari.`);
    }
  };
  const bintang = (x: number, y: number) => (
    <text x={x} y={y} textAnchor="middle" fontSize={11} fontWeight={900} fill={MERAH}>
      {"★"}
    </text>
  );
  const gambar = kanvas ? (
    <g>
      <Judul teks={`lingkari ${benda} yang menjadi anak tangga pertama`} />
      <Barisan isi={l.isi} rupa={rupa} jenis={l.jenis} acuan={l.acuan} />
    </g>
  ) : (
    <g>
      <Judul teks={`pindahkan jadi tangga ${l.arah === "naik" ? "dari yang paling pendek" : "dari yang paling tinggi"}`} />
      {rupa === "benda" ? <rect x={6} y={DASAR_ATAS} width={288} height={5} rx={2} fill="#92400E" /> : <line x1={6} x2={294} y1={DASAR_ATAS} y2={DASAR_ATAS} stroke={UNGU} strokeWidth={1.6} />}
      {rupa === "benda" ? <rect x={6} y={DASAR_BAWAH} width={288} height={5} rx={2} fill="#92400E" /> : <line x1={6} x2={294} y1={DASAR_BAWAH} y2={DASAR_BAWAH} stroke={UNGU} strokeWidth={1.6} />}
      {l.isi.map((v, i) => {
        const x = letakX(i, n);
        const w = lebarBatang(n);
        const y = puncakT(v, DASAR_ATAS);
        const sudah = taruh.includes(i);
        return (
          <g key={i} {...(diam || sudah ? {} : ketuk(() => ketukBenda(i)))} aria-label={`${benda} ${kata(i + 1)}${i === l.acuan ? ", bertanda" : ""}`}>
            <rect x={x - w / 2 - 3} y={y - 14} width={w + 6} height={v * SATU_T + 14} fill="transparent" />
            {sudah ? (
              <rect x={x - w / 2} y={y} width={w} height={v * SATU_T} rx={1} fill="none" stroke="#94A3B8" strokeWidth={1.2} strokeDasharray="3 2" />
            ) : (
              <>
                <rect x={x - w / 2} y={y} width={w} height={v * SATU_T} rx={rupa === "benda" ? 3 : 1} fill={rupa === "benda" ? PALET[i % PALET.length] : "#FFFFFF"} stroke={merah === i ? MERAH : rupa === "benda" ? "#1E3A8A" : UNGU} strokeWidth={merah === i ? 3 : 1.5} />
                {rupa === "benda" ? (
                  <text x={x} y={y - 2} textAnchor="middle" fontSize={w > 17 ? 11 : 9}>
                    {emoji(l.jenis)}
                  </text>
                ) : null}
              </>
            )}
            {i === l.acuan && l.tanya === "urutan" ? bintang(x, y - (rupa === "benda" ? 14 : 4)) : null}
          </g>
        );
      })}
      {urut.map((_, s) => {
        const x = letakX(s, n);
        const w = lebarBatang(n);
        const dipasang = taruh[s];
        const v = dipasang === undefined ? null : l.isi[dipasang];
        return (
          <g key={`s${s}`}>
            {v === null ? (
              <rect x={x - w / 2} y={DASAR_BAWAH - 8} width={w} height={8} rx={1} fill="none" stroke="#94A3B8" strokeWidth={1.2} strokeDasharray="3 2" />
            ) : (
              <>
                <rect x={x - w / 2} y={puncakT(v, DASAR_BAWAH)} width={w} height={v * SATU_T} rx={rupa === "benda" ? 3 : 1} fill={rupa === "benda" ? PALET[(dipasang ?? 0) % PALET.length] : "#FFFFFF"} stroke={selesai && dipasang === l.acuan && l.tanya === "urutan" ? HIJAU : rupa === "benda" ? "#1E3A8A" : UNGU} strokeWidth={selesai && dipasang === l.acuan && l.tanya === "urutan" ? 3 : 1.5} />
                {dipasang === l.acuan && l.tanya === "urutan" ? bintang(x, puncakT(v, DASAR_BAWAH) - 3) : null}
              </>
            )}
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Benda yang disusun menjadi tangga">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Benda dipindahkan menjadi tangga">{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "banding" ? <Banding {...props} l={l} /> : l.tipe === "langsung" ? <Langsung {...props} l={l} /> : l.tipe === "perantara" ? <Perantara {...props} l={l} /> : <Tangga {...props} l={l} />;
}

function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
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
      <Dasar l={l.dasar} rupa={rupa} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
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
export function LangkahTiang({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
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
      salah(`${awalan}${petunjukSalah(l, m)}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const d = l.tipe === "salah" ? l.dasar : l;
  const tanya =
    d.tipe === "banding"
      ? `Berapa benda yang ${d.arah === "tinggi" ? "lebih tinggi" : "lebih pendek"} dari benda bertanda?`
      : d.tipe === "langsung"
        ? "Berapa benda yang sama tinggi dengan benda bertanda?"
        : d.tipe === "perantara"
          ? `Berapa benda yang ${d.tanya === "lebih" ? "lebih panjang dari tali" : d.tanya === "kurang" ? "kurang dari tali" : "pas dengan tali"}?`
          : d.tanya === "banyak"
            ? "Berapa benda di tangga?"
            : `Benda bertanda ada di urutan ke berapa dari ${d.arah === "naik" ? "yang paling pendek" : "yang paling tinggi"}?`;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{rupa === "lambang" ? tanya.replace("benda bertanda", `benda ${hurufDari(d.acuan)}`) : tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
