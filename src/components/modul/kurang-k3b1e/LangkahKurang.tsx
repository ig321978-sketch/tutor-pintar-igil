"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  LANGKAH_URUT,
  acakTetap,
  dasarDari,
  hasilKurang,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  petunjukKetuk,
  petunjukSalah,
  pilihanAngkaTugas,
  pilihanNamaDari,
  puluh,
  sat,
  siapLangsung,
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
import { JawabSuaraKurang, PilihanKata, teksKunci } from "./JawabKurang";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab E: pengurangan sampai seratus. Jenis tugas: hasil pengurangan, cerita pengurangan, angka satuan dan puluhan pada hasil, puluhan setelah meminjam,
 * satuan setelah meminjam, perlu pinjam atau tanpa pinjam, hitung naik (langkah satuan, puluhan, dan jumlah), tempat yang dikurangi lebih dulu, operasi pemeriksa, hasil penjumlahan pemeriksa,
 * urutan langkah, dan Cari kesalahan (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: bungkus mi dan kardus beremoji di rak (Concrete), balok batang dan kotak polos dengan garis bilangan tanpa emoji (Pictorial), susunan angka dan tanda saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const COKLAT = "#92400E";
const KARDUS = "\u{1F4E6}";
const BUNGKUS = "\u{1F35C}";

type Sorot = "satuan" | "puluhan";

/* ------------------------------ Rak mi (Concrete) ------------------------------ */
/** Satu kelompok di rak: kardus (sepuluh bungkus tiap kardus) dan bungkus lepas, dengan papan penyangga. */
function KelompokRak({ n, y, label }: { n: number; y: number; label: string }) {
  return (
    <g>
      <text x={8} y={y + 16} fontSize={9.5} fontWeight={900} fill={UNGU}>
        {label}
      </text>
      {Array.from({ length: puluh(n) }, (_, i) => (
        <text key={`k${i}`} x={70 + i * 24} y={y + 14} fontSize={19}>
          {KARDUS}
        </text>
      ))}
      {Array.from({ length: sat(n) }, (_, i) => (
        <text key={`b${i}`} x={70 + i * 20} y={y + 36} fontSize={16}>
          {BUNGKUS}
        </text>
      ))}
      <rect x={6} y={y + 40} width={288} height={4} rx={1.5} fill="#B45309" />
    </g>
  );
}
export function RakSvg({ a, b, judul, atas = "Ada", bawah = "Terjual" }: { a: number; b: number; judul: string; atas?: string; bawah?: string }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Rak mi: ${atas} ${kata(a)}, ${bawah} ${kata(b)}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#FFF7ED" stroke={COKLAT} strokeWidth={2.4} />
      <text x={150} y={20} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      <KelompokRak n={a} y={30} label={atas} />
      <KelompokRak n={b} y={96} label={bawah} />
      <text x={150} y={176} textAnchor="middle" fontSize={8.8} fontWeight={800} fill={UNGU}>
        Satu kardus berisi sepuluh bungkus
      </text>
      <text x={150} y={190} textAnchor="middle" fontSize={8.8} fontWeight={800} fill="#B45309">
        Kardus untuk puluhan, bungkus lepas untuk satuan
      </text>
    </svg>
  );
}

/* ------------------------------ Diagram balok (Pictorial) ------------------------------ */
function Balok({ n, y, label, warna }: { n: number; y: number; label: string; warna: string }) {
  return (
    <g>
      <text x={8} y={y + 18} fontSize={13} fontWeight={900} fill={UNGU}>
        {label}
      </text>
      {Array.from({ length: puluh(n) }, (_, i) => (
        <g key={`p${i}`}>
          <rect x={70 + i * 24} y={y} width={11} height={38} fill={warna} stroke={UNGU} strokeWidth={1} />
          {Array.from({ length: 9 }, (_, j) => (
            <line key={j} x1={70 + i * 24} x2={81 + i * 24} y1={y + 3.8 * (j + 1)} y2={y + 3.8 * (j + 1)} stroke={UNGU} strokeWidth={0.4} />
          ))}
        </g>
      ))}
      {Array.from({ length: sat(n) }, (_, i) => (
        <rect key={`s${i}`} x={70 + i * 19} y={y + 44} width={11} height={11} fill="#F59E0B" stroke={UNGU} strokeWidth={1} />
      ))}
    </g>
  );
}
export function BalokSvg({ a, b, judul, atas, bawah }: { a: number; b: number; judul: string; atas: string; bawah: string }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Diagram balok: ${atas} ${kata(a)}, ${bawah} ${kata(b)}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#F8FAFC" stroke="#64748B" strokeWidth={2} />
      <text x={150} y={19} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      <Balok n={a} y={28} label={atas} warna="#3B82F6" />
      <line x1={8} x2={292} y1={96} y2={96} stroke="#CBD5E1" strokeWidth={1.4} strokeDasharray="4 3" />
      <Balok n={b} y={102} label={bawah} warna="#EF4444" />
      <text x={150} y={190} textAnchor="middle" fontSize={8.8} fontWeight={800} fill={UNGU}>
        Batang tinggi sama dengan sepuluh, kotak kecil sama dengan satu
      </text>
    </svg>
  );
}

/** Garis bilangan hitung naik dari b ke a: titik b, puluhan penuh di antaranya, dan a, dengan lompatan (tanpa menuliskan banyak langkah). */
export function GarisNaik({ a, b }: { a: number; b: number }) {
  const x0 = 22;
  const lebar = 256;
  const px = (v: number) => x0 + ((v - b) / Math.max(1, a - b)) * lebar;
  const naik = sat(b) === 0 ? b : (puluh(b) + 1) * 10;
  const turun = puluh(a) * 10;
  const titik = [b];
  for (let v = naik; v <= turun; v += 10) if (!titik.includes(v) && v > b && v < a) titik.push(v);
  if (!titik.includes(a)) titik.push(a);
  const busur: [number, number][] = [];
  const kunci = [b, ...(naik > b && naik < a ? [naik] : []), ...(turun > naik && turun < a ? [turun] : []), a];
  for (let i = 0; i + 1 < kunci.length; i += 1) busur.push([kunci[i], kunci[i + 1]]);
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Garis bilangan dari ${kata(b)} naik ke ${kata(a)}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#F8FAFC" stroke="#64748B" strokeWidth={2} />
      <text x={150} y={19} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
        Hitung naik
      </text>
      <line x1={x0 - 8} x2={x0 + lebar + 8} y1={120} y2={120} stroke={UNGU} strokeWidth={2.2} />
      {busur.map(([p, q], i) => (
        <path key={i} d={`M${px(p).toFixed(1)} 118 Q${((px(p) + px(q)) / 2).toFixed(1)} ${70 - (i % 2) * 8} ${px(q).toFixed(1)} 118`} fill="none" stroke={i % 2 ? "#DC2626" : "#2563EB"} strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {titik.map((v) => (
        <g key={v}>
          <line x1={px(v)} x2={px(v)} y1={113} y2={127} stroke={UNGU} strokeWidth={2} />
          <text x={px(v)} y={142} textAnchor="middle" fontSize={v === a || v === b ? 12 : 9.5} fontWeight={900} fill={v === a || v === b ? "#B91C1C" : UNGU}>
            {v}
          </text>
        </g>
      ))}
      <text x={150} y={178} textAnchor="middle" fontSize={8.8} fontWeight={800} fill={UNGU}>
        Naik dari bilangan kecil sampai bilangan besar
      </text>
    </svg>
  );
}

/* ------------------------------ Susunan angka (Abstract) ------------------------------ */
/** Susunan angka bersusun: bilangan atas, bilangan bawah dengan tanda, garis, dan baris hasil (tanda tanya atau angka yang disebut tokoh). */
export function PapanSusun({ atas, bawah, tanda = "\u{2212}", hasil, sorot, judul }: { atas: number; bawah: number; tanda?: string; hasil?: number; sorot?: Sorot; judul?: string }) {
  const sel = (n: number, tempat: Sorot) => `flex h-14 w-14 items-center justify-center rounded-lg text-4xl font-black ${sorot === tempat ? "bg-[#FEF08A]" : ""} ${n < 0 ? "text-[#1C01A5]/40" : "text-[#1C01A5]"}`;
  const t = (n: number, i: number) => (i === 0 ? Math.floor(n / 10) : n % 10);
  const ada = (n: number) => n >= 10;
  const baris = (n: number, kiri: string) => (
    <div className="flex items-center justify-end">
      <span className="flex h-14 w-10 items-center justify-center text-4xl font-black text-[#B45309]">{kiri}</span>
      {ada(n) ? <span className={sel(n, "puluhan")}>{t(n, 0)}</span> : <span className="h-14 w-14" />}
      <span className={sel(n, "satuan")}>{t(n, 1)}</span>
    </div>
  );
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#B45309] bg-[#FFFBEB] p-3" role="img" aria-label={`Susunan angka: ${kata(atas)} ${tanda === "+" ? "ditambah" : "dikurangi"} ${kata(bawah)}`}>
      {judul ? <p className="mb-1 text-center text-sm font-black text-[#92400E]">{judul}</p> : null}
      <div className="mx-auto w-fit">
        {baris(atas, "")}
        {baris(bawah, tanda)}
        <div className="my-1 h-1 rounded bg-[#1C01A5]" />
        {hasil === undefined ? (
          <div className="flex items-center justify-end">
            <span className="h-14 w-10" />
            <span className="flex h-14 w-14 items-center justify-center text-4xl font-black text-[#DC2626]">?</span>
            <span className="flex h-14 w-14 items-center justify-center text-4xl font-black text-[#DC2626]">?</span>
          </div>
        ) : (
          baris(hasil, "")
        )}
      </div>
    </div>
  );
}
/** Hitung naik dalam angka (Abstract): bilangan kecil, panah, tanda tanya, bilangan besar. */
function NaikAngka({ a, b }: { a: number; b: number }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#B45309] bg-[#FFFBEB] p-3 text-center" role="img" aria-label={`Hitung naik dari ${kata(b)} ke ${kata(a)}`}>
      <p className="text-sm font-black text-[#92400E]">Hitung naik</p>
      <p className="text-4xl font-black text-[#1C01A5]">
        {b} <span className="text-[#B45309]">{"\u{2192}"}</span> <span className="text-[#DC2626]">?</span> <span className="text-[#B45309]">{"\u{2192}"}</span> {a}
      </p>
    </div>
  );
}

/* ------------------------------ Gambar tugas ------------------------------ */
function Tampil({ a, b, rupa, sorot, hasil, naik = false, tambah = false }: { a: number; b: number; rupa: Rupa; sorot?: Sorot; hasil?: number; naik?: boolean; tambah?: boolean }) {
  const judul = `${a} ${tambah ? "+" : "\u{2212}"} ${b}`;
  if (rupa === "lambang") return naik ? <NaikAngka a={a} b={b} /> : <PapanSusun atas={a} bawah={b} tanda={tambah ? "+" : "\u{2212}"} sorot={sorot} hasil={hasil} />;
  if (rupa === "diagram") return naik ? <GarisNaik a={a} b={b} /> : <BalokSvg a={a} b={b} judul={judul} atas={tambah ? "Hasil" : "Awal"} bawah={tambah ? "Tambah" : "Kurang"} />;
  return <RakSvg a={a} b={b} judul={judul} atas={tambah ? "Sisa" : "Ada"} bawah={tambah ? "Tambah" : "Terjual"} />;
}

/** Tempat yang disorot pada susunan angka menurut jenis tugas. */
function sorotDari(l: LangkahDasar): Sorot | undefined {
  switch (l.tipe) {
    case "satuan":
    case "satuanjadi":
    case "pinjam":
      return "satuan";
    case "puluhan":
    case "sisapuluh":
      return "puluhan";
    case "tempat":
      return l.tanya === "dulu" ? "satuan" : "puluhan";
    default:
      return undefined;
  }
}

function GambarTugas({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  if (l.tipe === "urut") return null;
  if (l.tipe === "naik" && rupa !== "benda") return <Tampil a={l.a} b={l.b} rupa={rupa} naik />;
  if (l.tipe === "balikjumlah") return <Tampil a={hasilKurang(l.a, l.b)} b={l.b} rupa={rupa} tambah />;
  return <Tampil a={l.a} b={l.b} rupa={rupa} sorot={sorotDari(l)} />;
}

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Susun langkah dengan mengetuk langkah pertama sampai terakhir. */
function UrutLangkah({ l, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const daftar = LANGKAH_URUT[l.ragam];
  const tampil = acakTetap(daftar.length, [0, 1, 2, 3]);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === daftar.length) siap(`Betul! ${kalimatKunci(l, "klik")}`);
      else info("Betul! Langkah berikutnya yang mana?");
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Ketuk langkah secara berurutan">
        {tampil.map((i) => (
          <button
            key={daftar[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {daftar[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  return <Tampil a={k.a} b={k.b} rupa={rupa} hasil={rupa === "lambang" ? k.hasil : undefined} />;
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
  if (d.tipe === "urut") return <UrutLangkah {...pk} rupa={rupa} l={d} />;
  return <GambarTugas l={d} rupa={rupa} />;
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahKurang({ ls, rupa, bicara, onBenar }: P) {
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
  const angkaPilihan = kunci !== null && kunci.jenis === "angka" ? pilihanAngkaTugas(l, kunci.n) : [];
  const pilihanTeks: string[] = kunci === null ? [] : kunci.jenis === "nama" ? pilihanNamaDari(kunci.nama) : angkaPilihan.map(kata);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraKurang
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={[...mati, ...matiAngka.map(kata)]}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (angkaPilihan.find((x) => kata(x) === t) ?? angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih angkanya">
              {angkaPilihan.map((n) => (
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
