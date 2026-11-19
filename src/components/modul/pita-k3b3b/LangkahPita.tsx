"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  EMOJI_BENDA,
  barisKartu,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  labelKlik,
  labelMc,
  labelUkuran,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  totalCm,
  type Cara,
  type LBanding,
  type LJarak,
  type LKali,
  type LPecah,
  type LTabel,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraPita, PilihanKata } from "./JawabPita";

/**
 * Satu tugas CPA Kelas 3 Bab 3 Sub-Bab B: metode IGIL (Kali Seratus ke Sentimeter, Bagi Seratus ke Meter: mengubah meter dan sentimeter dan menulisnya bersama),
 * Ratio Table (Tabel Perbandingan), Number Line (Garis Bilangan: jarak dan membandingkan) dan Split Strategy (Cara Memecah: menyambung dan memotong pita),
 * tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab menurut caranya (pilih ukuran, tulis satu angka di kanvas, atau ucapkan).
 * Rupa: pita ukur kuning dengan benda kebun binatang beremoji (Concrete), batang pita, tabel, dan garis bilangan polos (Pictorial), kartu kata dan angka di lembar pesanan (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const ORANYE = "#EA580C";
const COKELAT = "#92400E";
const X0 = 20;
const LEBAR = 250;

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}
function Teks({ x, y, u = 10, warna = UNGU, anchor = "middle", children }: { x: number; y: number; u?: number; warna?: string; anchor?: "start" | "middle" | "end"; children: React.ReactNode }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={u} fontWeight={900} fill={warna}>
      {children}
    </text>
  );
}
function Tombol({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/** Ukuran untuk suara: "900 cm" menjadi "sembilan ratus sentimeter", "3 m 8 cm" menjadi "tiga meter delapan sentimeter". */
const ucapkanUkuran = (t: string): string =>
  t
    .replace(/\d+/g, (d) => kata(Number(d)))
    .replace(/\bcm\b/g, "sentimeter")
    .replace(/\bm\b/g, "meter");

/* ------------------------------ Pita, tabel, dan garis ------------------------------ */
/**
 * Pita sepanjang `cm` sentimeter mulai di (x, y), skala `skala` piksel per sentimeter. Concrete: pita ukur kuning bertanda tiap sepuluh dan seratus sentimeter dengan benda beremoji di ujungnya.
 * Pictorial: batang polos berwarna dengan garis putih tiap seratus sentimeter. `sisa` = sentimeter di ujung kanan yang diberi warna oranye.
 */
function Pita({ x, y, cm, skala, rupa, warna = BIRU, sisa = 0, emoji, h = 18 }: { x: number; y: number; cm: number; skala: number; rupa: Rupa; warna?: string; sisa?: number; emoji?: string; h?: number }) {
  const benda = rupa === "benda";
  const w = cm * skala;
  const garis = benda ? COKELAT : UNGU;
  const seratus = Array.from({ length: Math.floor(cm / 100) }, (_, i) => (i + 1) * 100).filter((n) => n < cm);
  const sepuluh = benda ? Array.from({ length: Math.floor(cm / 10) }, (_, i) => (i + 1) * 10).filter((n) => n < cm && n % 100 !== 0) : [];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={benda ? "#FACC15" : warna} stroke={garis} strokeWidth={1.6} />
      {sisa > 0 ? <rect x={x + (cm - sisa) * skala} y={y} width={sisa * skala} height={h} rx={3} fill="#FB923C" stroke={garis} strokeWidth={1.2} /> : null}
      {seratus.map((n) => (
        <line key={n} x1={x + n * skala} y1={y} x2={x + n * skala} y2={y + h} stroke={benda ? COKELAT : "#FFFFFF"} strokeWidth={1.8} />
      ))}
      {sepuluh.map((n) => (
        <line key={n} x1={x + n * skala} y1={y + h - 4} x2={x + n * skala} y2={y + h} stroke={COKELAT} strokeWidth={0.8} />
      ))}
      {emoji ? (
        <text x={x + w + 4} y={y + h - 1} fontSize={16} aria-hidden="true">
          {emoji}
        </text>
      ) : null}
    </g>
  );
}
/** Angka di bawah pita tiap seratus sentimeter: `mode` "m" menulis 1 m, 2 m; "cm" menulis 100, 200. Nol ikut bila `nol`. */
function Penanda({ x, y, skala, cm, mode, nol = true }: { x: number; y: number; skala: number; cm: number; mode: "m" | "cm"; nol?: boolean }) {
  const n = Array.from({ length: Math.floor(cm / 100) + 1 }, (_, i) => i * 100).filter((v) => v <= cm && (nol || v > 0));
  return (
    <g>
      {n.map((v) => (
        <text key={v} x={x + v * skala} y={y} textAnchor="middle" fontSize={8.4} fontWeight={900} fill={UNGU}>
          {mode === "m" ? `${v / 100} m` : v}
        </text>
      ))}
    </g>
  );
}

/* ------------------------------ Lembar pesanan (Abstract) ------------------------------ */
function KartuKata({ judul, baris, sorot }: { judul?: string; baris: string[]; sorot?: number }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b, i) => (
        <span key={`${i}-${b}`} className={`block text-sm font-bold leading-snug text-[#1C01A5] ${sorot === i ? "rounded bg-[#FEF08A] px-1 font-black underline" : ""}`}>
          {b}
        </span>
      ))}
    </div>
  );
}
const LembarPesanan = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#D6A15E] bg-[#FFFEF7] p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilKali({ l, rupa }: { l: LKali; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <LembarPesanan>
        <KartuKata judul="Mengubah ukuran" baris={barisKartu(l)} />
      </LembarPesanan>
    );
  const total = l.arah === "ke-m" ? l.m * 100 : totalCm(l.m, l.c);
  const skala = LEBAR / Math.max(total, 100);
  const emoji = rupa === "benda" ? EMOJI_BENDA[l.benda] : undefined;
  const atas = l.arah === "ke-cm" ? labelMc(l.m, l.c) : `${total} cm`;
  const tanya = l.arah === "ke-cm" ? "? cm" : l.arah === "ke-m" ? "? m" : "? m ? cm";
  return (
    <Gambar label="Pita yang diukur" judul={l.arah === "ke-cm" ? "ukuran dalam meter, ubah ke sentimeter" : l.arah === "ke-m" ? "ukuran dalam sentimeter, ubah ke meter" : "sentimeter ditulis dengan meter dan sentimeter"}>
      <Teks x={150} y={48} u={14}>
        {atas}
      </Teks>
      <Pita x={X0} y={60} cm={total} skala={skala} rupa={rupa} sisa={l.arah === "ke-m" ? 0 : l.c} emoji={emoji} />
      {l.arah === "ke-cm" ? <Penanda x={X0} y={92} skala={skala} cm={l.m * 100} mode="m" /> : <Penanda x={X0} y={92} skala={skala} cm={total} mode="cm" />}
      <Teks x={150} y={140} u={30} warna={MERAH}>
        {tanya}
      </Teks>
      <Teks x={150} y={178} u={11} warna={COKELAT}>
        1 m = 100 cm
      </Teks>
    </Gambar>
  );
}

function TampilTabel({ l, rupa }: { l: LTabel; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <LembarPesanan>
        <KartuKata judul="Tabel perbandingan" baris={barisKartu(l)} />
      </LembarPesanan>
    );
  const kolom = [...l.dikenal, l.m].sort((a, b) => a - b);
  const benda = rupa === "benda";
  const LX = 12;
  const LL = 64;
  const LK = 72;
  return (
    <Gambar label="Tabel perbandingan meter dan sentimeter" judul="tiap kolom: ukuran yang sama panjang">
      {[0, 1].map((r) => (
        <g key={r}>
          <rect x={LX} y={32 + r * 38} width={LL} height={38} fill={r === 0 ? "#DBEAFE" : "#FFEDD5"} stroke={UNGU} strokeWidth={1.6} />
          <Teks x={LX + LL / 2} y={56 + r * 38} u={r === 0 ? 11 : 9.4} warna={r === 0 ? BIRU : ORANYE}>
            {r === 0 ? "meter" : "sentimeter"}
          </Teks>
        </g>
      ))}
      {kolom.map((m, i) => {
        const kosong = m === l.m;
        return [0, 1].map((r) => {
          const hilang = kosong && (r === 0 ? l.tanya === "m" : l.tanya === "cm");
          return (
            <g key={`${i}-${r}`}>
              <rect x={LX + LL + i * LK} y={32 + r * 38} width={LK} height={38} fill={hilang ? "#FEF3C7" : benda ? "#FEF08A" : "#FFFFFF"} stroke={hilang ? MERAH : UNGU} strokeWidth={hilang ? 2.6 : 1.6} strokeDasharray={hilang ? "5 3" : undefined} />
              <Teks x={LX + LL + i * LK + LK / 2} y={58 + r * 38} u={hilang ? 22 : 18} warna={hilang ? MERAH : UNGU}>
                {hilang ? "?" : r === 0 ? m : m * 100}
              </Teks>
            </g>
          );
        });
      })}
      {benda ? (
        <text x={150} y={150} textAnchor="middle" fontSize={34} aria-hidden="true">
          {EMOJI_BENDA[l.benda]}
        </text>
      ) : null}
      <Teks x={150} y={184} u={10} warna={COKELAT}>
        {l.tanya === "cm" ? "kolom yang kosong: sentimeter" : "kolom yang kosong: meter"}
      </Teks>
    </Gambar>
  );
}

function TampilJarak({ l, rupa, cara }: { l: LJarak; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <LembarPesanan>
        <KartuKata judul="Garis bilangan" baris={barisKartu(l)} />
      </LembarPesanan>
    );
  const skala = LEBAR / (l.ke * 100);
  const X = (n: number) => X0 + n * skala;
  const Y = 124;
  const benda = rupa === "benda";
  const ticks = Array.from({ length: l.ke + 1 }, (_, i) => i * 100);
  const hop = Array.from({ length: l.ke - l.dari }, (_, i) => (l.dari + i) * 100);
  return (
    <Gambar label="Garis bilangan sentimeter" judul="dua titik pada garis sentimeter">
      <line x1={X(0)} y1={Y} x2={X(l.ke * 100)} y2={Y} stroke={UNGU} strokeWidth={2.4} />
      {ticks.map((n) => (
        <g key={n}>
          <line x1={X(n)} y1={Y - 5} x2={X(n)} y2={Y + 5} stroke={UNGU} strokeWidth={1.8} />
          <Teks x={X(n)} y={Y + 18} u={8.4}>
            {n}
          </Teks>
        </g>
      ))}
      {hop.map((n) => (
        <path key={n} d={`M${X(n)} ${Y} Q${X(n + 50)} ${Y - 26} ${X(n + 100)} ${Y}`} fill="none" stroke={ORANYE} strokeWidth={2} strokeLinecap="round" />
      ))}
      {[l.dari, l.ke].map((m, i) => (
        <g key={i}>
          <circle cx={X(m * 100)} cy={Y} r={5.5} fill={i === 0 ? BIRU : "#16A34A"} stroke={UNGU} strokeWidth={1.4} />
          <Teks x={Math.max(X(m * 100), 24)} y={Y - 36} u={8.6} warna={i === 0 ? BIRU : HIJAU}>
            {i === 0 ? "titik 1" : "titik 2"}
          </Teks>
          {benda ? (
            <text x={Math.max(X(m * 100), 12)} y={Y - 44} textAnchor="middle" fontSize={16} aria-hidden="true">
              {EMOJI_BENDA[l.benda]}
            </text>
          ) : null}
        </g>
      ))}
      <Teks x={150} y={176} u={14} warna={MERAH}>
        {cara === "kanvas" ? "lompatan seratus: ?" : "jarak: ? cm"}
      </Teks>
    </Gambar>
  );
}

function TampilBanding({ l, rupa }: { l: LBanding; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <LembarPesanan>
        <KartuKata judul="Bandingkan pita" baris={barisKartu(l)} />
      </LembarPesanan>
    );
  const skala = LEBAR / Math.max(...l.ukuran);
  const WARNA = ["#2563EB", "#16A34A", "#9333EA"];
  return (
    <Gambar label="Tiga pita" judul="mana pita yang paling panjang?">
      {l.ukuran.map((u, i) => (
        <g key={i}>
          <Teks x={X0} y={36 + i * 44} u={10} anchor="start">
            {`pita ${i + 1}: ${labelUkuran(u, l.bentuk[i])}`}
          </Teks>
          <Pita x={X0} y={41 + i * 44} cm={u} skala={skala} rupa={rupa} warna={WARNA[i]} emoji={rupa === "benda" ? EMOJI_BENDA[l.benda] : undefined} />
        </g>
      ))}
      <Teks x={150} y={184} u={9} warna={COKELAT}>
        1 m = 100 cm
      </Teks>
    </Gambar>
  );
}

function TampilPecah({ l, rupa }: { l: LPecah; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <LembarPesanan>
        <KartuKata judul={l.op === "tambah" ? "Menyambung pita" : "Memotong pita"} baris={barisKartu(l)} />
      </LembarPesanan>
    );
  const tA = totalCm(l.a[0], l.a[1]);
  const tB = totalCm(l.b[0], l.b[1]);
  const tambah = l.op === "tambah";
  const skala = LEBAR / Math.max(tambah ? tA + tB : tA, 100);
  const emoji = rupa === "benda" ? EMOJI_BENDA[l.benda] : undefined;
  return (
    <Gambar label={tambah ? "Dua pita disambung" : "Pita dipotong"} judul={tambah ? "dua pita disambung" : "pita dipotong"}>
      <Teks x={X0} y={40} u={10} anchor="start">
        {labelMc(l.a[0], l.a[1])}
      </Teks>
      <Pita x={X0} y={46} cm={tA} skala={skala} rupa={rupa} warna={BIRU} emoji={tambah ? undefined : emoji} />
      {!tambah ? <rect x={X0} y={46} width={tB * skala} height={18} rx={3} fill="#FCA5A5" opacity={0.85} stroke={MERAH} strokeWidth={1.4} strokeDasharray="4 2" /> : null}
      <Teks x={tambah ? X0 + tA * skala : X0} y={84} u={10} anchor="start" warna={tambah ? ORANYE : MERAH}>
        {tambah ? labelMc(l.b[0], l.b[1]) : `dipotong ${labelMc(l.b[0], l.b[1])}`}
      </Teks>
      <Pita x={tambah ? X0 + tA * skala : X0} y={90} cm={tB} skala={skala} rupa={rupa} warna={ORANYE} emoji={tambah ? emoji : undefined} />
      <Teks x={150} y={150} u={15} warna={MERAH}>
        hasil: ? m ? cm
      </Teks>
      <Teks x={150} y={178} u={9} warna={COKELAT}>
        1 m = 100 cm
      </Teks>
    </Gambar>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "kali":
      return <TampilKali l={l} rupa={props.rupa} />;
    case "tabel":
      return <TampilTabel l={l} rupa={props.rupa} />;
    case "jarak":
      return <TampilJarak l={l} rupa={props.rupa} cara={props.cara} />;
    case "banding":
      return <TampilBanding l={l} rupa={props.rupa} />;
    case "pecah":
      return <TampilPecah l={l} rupa={props.rupa} />;
  }
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} />
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

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahPita({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas hitung, kata, dan semua tugas kanvas dan suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
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
  /** Satu-satunya jalur memeriksa jawaban: `j` ukuran, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : ucapkanUkuran(j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => n === labelKlik(l);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraPita kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, cocokKlik(n))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}

