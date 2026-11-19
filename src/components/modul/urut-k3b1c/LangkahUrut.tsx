"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  acakTetap,
  angkaTempat,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  labelAngka,
  petunjukKetuk,
  petunjukSalah,
  pilihanAngka,
  pilihanNamaDari,
  siapLangsung,
  urutanIndeks,
  type Cara,
  type Klaim,
  type LUrut,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan } from "./periksa";
import { JawabSuaraUrut, PilihanKata, teksKunci } from "./JawabUrut";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab C: membandingkan dan mengurutkan bilangan. Jenis tugas: membandingkan dua bilangan (tanda dan angka penentu), tempat pertama yang berbeda,
 * bilangan paling besar atau paling kecil, urutan kartu (ketuk), urutan ke berapa, urutan naik atau turun, titik pada garis bilangan ratusan, letak dua titik, dan Cari kesalahan
 * (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji di bak truk dan rak penanda (Concrete), balok polos dan garis bilangan polos tanpa emoji (Pictorial), kartu angka dan tabel kata saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";

/** Benda Concrete: kardus (seratus), bungkus (sepuluh), kaleng (satu). */
const IKON_BENDA = ["\u{1F4E6}", "\u{1F6CD}\u{FE0F}", "\u{1F96B}"];
const NAMA_BENDA = ["seratus", "sepuluh", "satu"];

/* ------------------------------ Kartu bilangan ------------------------------ */
type Kotak = { x: number; y: number; w: number; h: number };
/** Letak kartu: dua kartu besar, tiga kartu sebaris, empat kartu dua kali dua. */
export function tataKartu(n: number): Kotak[] {
  if (n <= 2) return [8, 156].slice(0, n).map((x) => ({ x, y: 10, w: 136, h: 150 }));
  if (n === 3) return [8, 104, 200].map((x) => ({ x, y: 10, w: 92, h: 150 }));
  return [
    [8, 4],
    [154, 4],
    [8, 88],
    [154, 88],
  ].map(([x, y]) => ({ x, y, w: 138, h: 80 }));
}

function Lencana({ x, y, isi, warna = "#6D28D9" }: { x: number; y: number; isi: string; warna?: string }) {
  return (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r={8} fill={warna} />
      <text x={x} y={y + 3.4} textAnchor="middle" fontSize={10} fontWeight={900} fill="#FFFFFF">
        {isi}
      </text>
    </g>
  );
}

/** Isi satu kartu: benda beremoji (Concrete), balok polos (Pictorial), atau angka (Abstract). */
function IsiBilangan({ n, k, rupa }: { n: number; k: Kotak; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <text x={k.x + k.w / 2} y={k.y + k.h / 2 + (k.h > 100 ? 14 : 11)} textAnchor="middle" fontSize={k.h > 100 ? (k.w > 100 ? 44 : 34) : 30} fontWeight={900} fill={UNGU}>
        {n}
      </text>
    );
  const baris = [angkaTempat(n, 0), angkaTempat(n, 1), angkaTempat(n, 2)];
  const atas = k.y + 20;
  const tinggi = (k.h - 24) / 3;
  const sel = Math.min(16, (k.w - 12) / 9);
  return (
    <g>
      {baris.flatMap((c, r) =>
        Array.from({ length: c }, (_, j) => {
          const cx = k.x + 6 + sel * (j + 0.5);
          const cy = atas + tinggi * (r + 0.5);
          if (rupa === "benda") {
            const fs = Math.min(sel * 0.95, tinggi * 0.8);
            return (
              <text key={`${r}-${j}`} x={cx} y={cy + fs * 0.35} textAnchor="middle" fontSize={fs}>
                {IKON_BENDA[r]}
              </text>
            );
          }
          if (r === 0) {
            const s = Math.min(sel * 0.88, tinggi * 0.84);
            return (
              <g key={`${r}-${j}`}>
                <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={1.2} fill="#BFDBFE" stroke="#1D4ED8" strokeWidth={0.9} />
                <path d={`M${cx} ${cy - s / 2}V${cy + s / 2}M${cx - s / 2} ${cy}H${cx + s / 2}`} stroke="#60A5FA" strokeWidth={0.6} />
              </g>
            );
          }
          if (r === 1) {
            const w = Math.max(2.4, sel * 0.3);
            const h = tinggi * 0.86;
            return (
              <g key={`${r}-${j}`}>
                <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={0.8} fill="#FDBA74" stroke="#C2410C" strokeWidth={0.8} />
                <path d={`M${cx - w / 2} ${cy - h / 6}H${cx + w / 2}M${cx - w / 2} ${cy + h / 6}H${cx + w / 2}`} stroke="#EA580C" strokeWidth={0.5} />
              </g>
            );
          }
          const s = Math.min(sel * 0.5, tinggi * 0.5);
          return <rect key={`${r}-${j}`} x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={0.6} fill="#86EFAC" stroke="#15803D" strokeWidth={0.8} />;
        }),
      )}
    </g>
  );
}

/** Keterangan satu kardus, satu bungkus, satu kaleng (Concrete) atau satu balok (Pictorial) di bawah kartu. */
function Keterangan({ rupa }: { rupa: Rupa }) {
  if (rupa === "lambang") return null;
  if (rupa === "benda")
    return (
      <text x={150} y={193} textAnchor="middle" fontSize={8.8} fontWeight={800} fill={UNGU}>
        {`${IKON_BENDA[0]} ${NAMA_BENDA[0]}   ${IKON_BENDA[1]} ${NAMA_BENDA[1]}   ${IKON_BENDA[2]} ${NAMA_BENDA[2]}`}
      </text>
    );
  return (
    <g aria-hidden="true">
      <rect x={40} y={183} width={10} height={10} fill="#BFDBFE" stroke="#1D4ED8" strokeWidth={0.9} />
      <text x={54} y={191.5} fontSize={8.8} fontWeight={800} fill={UNGU}>
        seratus
      </text>
      <rect x={116} y={182} width={3.4} height={12} fill="#FDBA74" stroke="#C2410C" strokeWidth={0.8} />
      <text x={124} y={191.5} fontSize={8.8} fontWeight={800} fill={UNGU}>
        sepuluh
      </text>
      <rect x={194} y={185} width={6} height={6} fill="#86EFAC" stroke="#15803D" strokeWidth={0.8} />
      <text x={205} y={191.5} fontSize={8.8} fontWeight={800} fill={UNGU}>
        satu
      </text>
    </g>
  );
}

/**
 * Kartu bilangan di papan: tiap kartu berisi benda (Concrete), balok polos (Pictorial), atau angka (Abstract).
 * `huruf`: kartu berlabel A dan B (dua kartu); bila tidak, berlabel nomor satu dan seterusnya. `sasaran`: kartu yang ditandai tanda tanya.
 */
export function KartuanSvg({ angka, rupa, huruf = false, sasaran }: { angka: number[]; rupa: Rupa; huruf?: boolean; sasaran?: number }) {
  const benda = rupa === "benda";
  const kotak = tataKartu(angka.length);
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label="Kartu bilangan">
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : rupa === "diagram" ? "#FFFFFF" : "#F0FDF4"} stroke={benda ? "#B45309" : rupa === "diagram" ? "#64748B" : "#166534"} strokeWidth={2} />
      {kotak.map((k, i) => (
        <g key={i}>
          <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={6} fill="#FFFFFF" stroke={sasaran === i ? MERAH : UNGU} strokeWidth={sasaran === i ? 2.6 : 1.4} strokeDasharray={sasaran === i ? "4 2" : undefined} />
          <Lencana x={k.x + 11} y={k.y + 11} isi={sasaran === i ? "?" : huruf ? String.fromCharCode(65 + i) : String(i + 1)} warna={sasaran === i ? MERAH : "#6D28D9"} />
          <IsiBilangan n={angka[i]} k={k} rupa={rupa} />
        </g>
      ))}
      <Keterangan rupa={rupa} />
    </svg>
  );
}

/* ------------------------------ Garis bilangan ------------------------------ */
type TitikGaris = { n: number; huruf: string; warna: string };
/** Tanda ratusan (empat) pada garis: awal, awal + 100, awal + 200, awal + 300 di x = 34, 106, 178, 250. */
const tandaGaris = (awal: number): number[] => [0, 1, 2, 3].map((i) => awal + i * 100);
const posisiGaris = (awal: number, n: number): number => 34 + (216 * (n - awal)) / 300;

/** Garis bilangan ratusan di rak penanda (Concrete: tanda berupa tumpukan kardus) atau garis polos (Pictorial: tanda berupa angka). */
export function GarisSvg({ awal, titik, rupa }: { awal: number; titik: TitikGaris[]; rupa: Rupa }) {
  const benda = rupa === "benda";
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label="Garis bilangan ratusan">
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : "#FFFFFF"} stroke={benda ? "#B45309" : "#64748B"} strokeWidth={2} />
      <line x1={16} y1={104} x2={278} y2={104} stroke={benda ? "#92400E" : UNGU} strokeWidth={4} strokeLinecap="round" />
      <path d="M272 97L284 104L272 111" fill="none" stroke={benda ? "#92400E" : UNGU} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {tandaGaris(awal).map((v, i) => (
        <g key={v}>
          <line x1={34 + i * 72} y1={94} x2={34 + i * 72} y2={114} stroke={benda ? "#92400E" : UNGU} strokeWidth={3} />
          {benda ? (
            <text x={34 + i * 72} y={134} textAnchor="middle" fontSize={8}>
              {IKON_BENDA[0].repeat(v / 100)}
            </text>
          ) : (
            <text x={34 + i * 72} y={134} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
              {v}
            </text>
          )}
        </g>
      ))}
      {titik.map((t) => {
        const x = posisiGaris(awal, t.n);
        return (
          <g key={t.huruf + t.n}>
            <line x1={x} y1={90} x2={x} y2={64} stroke={t.warna} strokeWidth={1.6} strokeDasharray="3 2" />
            <circle cx={x} cy={104} r={7} fill={t.warna} stroke={UNGU} strokeWidth={1.4} />
            <text x={x} y={58} textAnchor="middle" fontSize={14} fontWeight={900} fill={t.warna}>
              {t.huruf}
            </text>
          </g>
        );
      })}
      <text x={150} y={176} textAnchor="middle" fontSize={9} fontWeight={800} fill={UNGU}>
        {benda ? "Satu kardus mewakili seratus" : "Loncatan seratus dari tanda ke tanda"}
      </text>
    </svg>
  );
}

/** Tabel garis bilangan (Abstract): tanda ratusan dan bilangan titik sebagai kata dan angka saja. */
export function TabelGaris({ awal, titik }: { awal: number; titik: { huruf: string; n: number }[] }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#166534] bg-[#F0FDF4] p-2" role="img" aria-label="Tabel garis bilangan">
      <p className="text-center text-xs font-black text-[#166534]">Tanda ratusan pada garis bilangan</p>
      <div className="mt-1 grid grid-cols-4 gap-1">
        {tandaGaris(awal).map((v) => (
          <span key={v} className="rounded bg-white py-1 text-center text-base font-black text-[#14532D]">
            {v}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-black text-[#166534]">Titik pada garis</p>
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        {titik.map((t) => (
          <span key={t.huruf} className="rounded-lg border-2 border-[#166534] bg-white px-3 py-1 text-base font-black text-[#14532D]">
            {t.huruf === "?" ? "Titik" : `Titik ${t.huruf}`} = {t.n}
          </span>
        ))}
      </div>
    </div>
  );
}

const MERAH_TITIK = "#DC2626";
const BIRU_TITIK = "#2563EB";

/* ------------------------------ Gambar tugas ------------------------------ */
function GambarTugas({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  switch (l.tipe) {
    case "banding":
    case "tempat":
      return <KartuanSvg angka={[l.a, l.b]} rupa={rupa} huruf />;
    case "ekstrem":
    case "urut":
    case "arah":
      return <KartuanSvg angka={l.angka} rupa={rupa} />;
    case "rank":
      return <KartuanSvg angka={l.angka} rupa={rupa} sasaran={l.i} />;
    case "garis":
      return rupa === "lambang" ? <TabelGaris awal={l.awal} titik={[{ huruf: "?", n: l.n }]} /> : <GarisSvg awal={l.awal} rupa={rupa} titik={[{ n: l.n, huruf: "?", warna: MERAH_TITIK }]} />;
    case "letak":
      return rupa === "lambang" ? (
        <TabelGaris
          awal={l.awal}
          titik={[
            { huruf: "P", n: l.p },
            { huruf: "Q", n: l.q },
          ]}
        />
      ) : (
        <GarisSvg
          awal={l.awal}
          rupa={rupa}
          titik={[
            { n: l.p, huruf: "P", warna: MERAH_TITIK },
            { n: l.q, huruf: "Q", warna: BIRU_TITIK },
          ]}
        />
      );
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
/** Ketuk kartu satu per satu menurut urutan naik atau turun. */
function UrutKartu({ l, rupa, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const benar = urutanIndeks(l.angka, l.arah);
  const tampil = acakTetap(l.angka.length, benar);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === benar[sudah.length]) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === l.angka.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info(`Betul! Kartu berikutnya yang paling ${l.arah === "naik" ? "kecil" : "besar"} yang mana?`);
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <KartuanSvg angka={l.angka} rupa={rupa} />
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk kartu menurut urutan">
        {tampil.map((i) => (
          <button
            key={i}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-lg font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            Kartu {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Pilihan kartu (klik) untuk tugas bilangan paling besar atau paling kecil. */
function PilihanKartu({ banyak, mati, onPilih }: { banyak: number; mati: string[]; onPilih: (i: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih kartunya">
      {Array.from({ length: banyak }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={mati.includes(`kartu ${i + 1}`)}
          onClick={() => onPilih(i)}
          className="min-h-[52px] min-w-[96px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
        >
          Kartu {i + 1}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "urutan") return <KartuanSvg angka={k.susunan} rupa={rupa} />;
  return (
    <div className="space-y-1">
      <KartuanSvg angka={[k.a, k.b]} rupa={rupa} huruf />
      {k.jenis === "tanda" ? (
        <p className="rounded-xl border-2 border-[#DB2777] bg-[#FDF2F8] px-2 py-1 text-center text-base font-black text-[#831843]">
          Tanda yang ditulis: A {k.tanda} B
        </p>
      ) : null}
    </div>
  );
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
  if (d.tipe === "urut") return <UrutKartu {...pk} rupa={rupa} l={d} />;
  return <GambarTugas l={d} rupa={rupa} />;
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahUrut({ ls, rupa, bicara, onBenar }: P) {
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
  const pilihanTeks: string[] = kunci === null || kunci.jenis === "kartu" ? [] : kunci.jenis === "nama" ? pilihanNamaDari(kunci.nama) : pilihanAngka(kunci.n).map(kata);
  const banyakKartu = l.tipe === "ekstrem" ? l.angka.length : 0;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraUrut
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={[...mati, ...matiAngka.map(kata)]}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (pilihanAngka(kunci.n).find((x) => kata(x) === t) ?? angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "kartu" ? (
            <PilihanKartu banyak={banyakKartu} mati={mati} onPilih={(i) => jawab(`kartu ${i + 1}`, i === kunci.i)} />
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
                  {labelAngka(l, n)}
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
