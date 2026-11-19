"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  NAMA_TEMPAT,
  barisKartu,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kataBil,
  kunciJawab,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  type Cara,
  type Isi,
  type LBalok,
  type LKem,
  type LNama,
  type LTabel,
  type LTukar,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraTempat, PilihanKata, teksKunci } from "./JawabTempat";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab A: metode IGIL (Tukar Sepuluh, Baca dari Kiri: kemasan permen, penukaran sepuluh jadi satu), Dienes Blocks (Balok Dienes: lempeng, batang, kubus),
 * Place-Value Chart (Tabel Tiga Tempat) dan Number Names (Nama Bilangan: kata bilangan), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih bilangan, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji di rak gudang (Concrete), balok Dienes polos dan tabel polos di papan kapur (Pictorial),
 * kartu kata dan angka di nota stok (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const WARNA_TEMPAT = ["#16A34A", "#2563EB", "#DC2626"] as const;
const TEBAL_TEMPAT = ["#DCFCE7", "#DBEAFE", "#FEE2E2"] as const;

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
function Tombol({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Satuan benda ------------------------------ */
type Gaya = "permen" | "mainan" | "polos";
const EMOJI_PERMEN = "\u{1F36C}";
const EMOJI_BALOK = "\u{1F9F1}";

function Toples({ x, y, w = 20, h = 24 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx={5} fill="#BAE6FD" stroke="#0369A1" strokeWidth={1.4} />
      <rect x={x + w * 0.15} y={y - 5} width={w * 0.7} height={6} rx={2} fill="#16A34A" stroke="#166534" strokeWidth={1} />
      <text x={x + w / 2} y={y + h * 0.7} textAnchor="middle" fontSize={11}>
        {EMOJI_PERMEN}
      </text>
    </g>
  );
}
function Bungkus({ x, y, w = 16, h = 12 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#FDBA74" stroke="#C2410C" strokeWidth={1.2} />
      <circle cx={x + w / 2} cy={y - 1} r={2.2} fill="#C2410C" />
    </g>
  );
}
function Lempeng({ x, y, s = 24, gaya }: { x: number; y: number; s?: number; gaya: Gaya }) {
  const mainan = gaya === "mainan";
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={s} height={s} rx={1.5} fill={mainan ? "#4ADE80" : "#BBF7D0"} stroke="#166534" strokeWidth={1.2} />
      {[1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <line x1={x + (s * i) / 5} y1={y} x2={x + (s * i) / 5} y2={y + s} stroke="#166534" strokeWidth={0.5} />
          <line x1={x} y1={y + (s * i) / 5} x2={x + s} y2={y + (s * i) / 5} stroke="#166534" strokeWidth={0.5} />
        </React.Fragment>
      ))}
      {mainan ? (
        <text x={x + s / 2} y={y + s * 0.68} textAnchor="middle" fontSize={11}>
          {EMOJI_BALOK}
        </text>
      ) : null}
    </g>
  );
}
function Batang({ x, y, h = 34, w = 6, gaya }: { x: number; y: number; h?: number; w?: number; gaya: Gaya }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx={1} fill={gaya === "mainan" ? "#60A5FA" : "#BFDBFE"} stroke="#1E3A8A" strokeWidth={1} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x} y1={y + ((i + 1) * h) / 10} x2={x + w} y2={y + ((i + 1) * h) / 10} stroke="#1E3A8A" strokeWidth={0.5} />
      ))}
    </g>
  );
}
function Kubus({ x, y, s = 8, gaya }: { x: number; y: number; s?: number; gaya: Gaya }) {
  return <rect x={x} y={y} width={s} height={s} rx={1} fill={gaya === "mainan" ? "#F87171" : "#FECACA"} stroke="#7F1D1D" strokeWidth={1} aria-hidden="true" />;
}

/** Tiga zona tempat (ratusan, puluhan, satuan) berisi benda sesuai `isi`, dengan gaya satuan permen, mainan, atau polos. Zona c mulai di x = 8 + 96 c. */
function Zona({ isi, gaya, sorot }: { isi: Isi; gaya: Gaya; sorot?: number }) {
  return (
    <g>
      {[0, 1, 2].map((c) => {
        const x0 = 8 + c * 96;
        return (
          <g key={c}>
            <rect x={x0} y={24} width={92} height={150} rx={8} fill={TEBAL_TEMPAT[c]} stroke={WARNA_TEMPAT[c]} strokeWidth={sorot === c ? 3.6 : 1.6} />
            <rect x={x0} y={24} width={92} height={16} rx={8} fill={WARNA_TEMPAT[c]} />
            <text x={x0 + 46} y={35.5} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#FFFFFF" aria-hidden="true">
              {NAMA_TEMPAT[c]}
            </text>
          </g>
        );
      })}
      {Array.from({ length: isi.r }, (_, i) => {
        const x = 16 + (i % 3) * 28;
        const y = 50 + Math.floor(i / 3) * 34;
        return gaya === "permen" ? <Toples key={`r${i}`} x={x + 2} y={y + 4} /> : <Lempeng key={`r${i}`} x={x} y={y} s={24} gaya={gaya} />;
      })}
      {Array.from({ length: isi.p }, (_, i) =>
        gaya === "permen" ? (
          <Bungkus key={`p${i}`} x={108 + (i % 4) * 20} y={52 + Math.floor(i / 4) * 17} />
        ) : (
          <Batang key={`p${i}`} x={108 + (i % 8) * 10} y={48 + Math.floor(i / 8) * 40} gaya={gaya} />
        ),
      )}
      {Array.from({ length: isi.s }, (_, i) =>
        gaya === "permen" ? (
          <text key={`s${i}`} x={208 + (i % 5) * 16} y={58 + Math.floor(i / 5) * 17} textAnchor="middle" fontSize={13} aria-hidden="true">
            {EMOJI_PERMEN}
          </text>
        ) : (
          <Kubus key={`s${i}`} x={206 + (i % 7) * 11} y={50 + Math.floor(i / 7) * 12} gaya={gaya} />
        ),
      )}
    </g>
  );
}

/** Keterangan satuan benda (Concrete dan Pictorial). */
function Legenda({ gaya }: { gaya: Gaya }) {
  const isi =
    gaya === "permen"
      ? [`${EMOJI_PERMEN} butir lepas`, "bungkus = sepuluh butir", "toples = sepuluh bungkus"]
      : gaya === "mainan"
        ? [`${EMOJI_BALOK} kubus = satu`, "batang = sepuluh kubus", "lempeng = sepuluh batang"]
        : ["kubus = satu", "batang = sepuluh kubus", "lempeng = sepuluh batang"];
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Keterangan benda">
      {isi.map((t) => (
        <li key={t} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, sorot }: { judul?: string; baris: string[]; sorot?: number }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#78350F] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b, i) => (
        <span key={b} className={`block text-sm font-bold leading-snug text-[#1C01A5] ${sorot === i ? "rounded bg-[#FEF08A] px-1 font-black underline" : ""}`}>
          {b}
        </span>
      ))}
    </div>
  );
}
const NotaStok = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#94A3B8] bg-white p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilKemasan({ l, rupa }: { l: LKem | LTukar; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <NotaStok>
        <KartuKata judul={l.tipe === "tukar" ? "Stok belum ditukar" : "Stok gudang"} baris={barisKartu(l, rupa)} />
      </NotaStok>
    );
  const gaya: Gaya = rupa === "benda" ? "permen" : "polos";
  return (
    <div className="space-y-2">
      <Gambar label="Isi kemasan" judul={l.tipe === "tukar" ? "sepuluh yang lepas bisa ditukar" : "baca dari kiri: ratusan, puluhan, satuan"}>
        <Zona isi={l.isi} gaya={gaya} />
      </Gambar>
      <Legenda gaya={gaya} />
    </div>
  );
}
function TampilBalok({ l, rupa }: { l: LBalok; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <NotaStok>
        <KartuKata judul="Balok Dienes" baris={barisKartu(l)} />
      </NotaStok>
    );
  const gaya: Gaya = rupa === "benda" ? "mainan" : "polos";
  return (
    <div className="space-y-2">
      <Gambar label="Balok Dienes" judul="lempeng, batang, kubus">
        <Zona isi={l.isi} gaya={gaya} />
      </Gambar>
      <Legenda gaya={gaya} />
    </div>
  );
}
function TampilTabel({ l, rupa, cara }: { l: LTabel; rupa: Rupa; cara: Cara }) {
  const sorot = cara === "suara" ? l.suara : undefined;
  const angka = [Math.floor(l.n / 100), Math.floor(l.n / 10) % 10, l.n % 10];
  if (rupa === "lambang")
    return (
      <NotaStok>
        <KartuKata judul={cara === "suara" ? "Tabel tiga tempat, kolom disorot" : "Tabel tiga tempat"} baris={barisKartu(l)} sorot={sorot} />
      </NotaStok>
    );
  const emoji = ["\u{1F4E6}", "\u{1F6CD}", EMOJI_PERMEN];
  return (
    <div className="space-y-2">
      <Gambar label="Tabel tiga tempat" judul="ratusan, puluhan, satuan dari kiri ke kanan">
        {[0, 1, 2].map((c) => {
          const x0 = 8 + c * 96;
          return (
            <g key={c}>
              <rect x={x0} y={24} width={92} height={150} rx={8} fill={TEBAL_TEMPAT[c]} stroke={WARNA_TEMPAT[c]} strokeWidth={sorot === c ? 3.8 : 1.6} />
              <rect x={x0} y={24} width={92} height={16} rx={8} fill={WARNA_TEMPAT[c]} />
              <text x={x0 + 46} y={35.5} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#FFFFFF" aria-hidden="true">
                {cara === "suara" ? "?" : NAMA_TEMPAT[c]}
              </text>
              {rupa === "benda"
                ? Array.from({ length: angka[c] }, (_, i) => (
                    <text key={i} x={x0 + 18 + (i % 3) * 28} y={64 + Math.floor(i / 3) * 24} textAnchor="middle" fontSize={16} aria-hidden="true">
                      {emoji[c]}
                    </text>
                  ))
                : null}
              <text x={x0 + 46} y={rupa === "benda" ? 160 : 114} textAnchor="middle" fontSize={rupa === "benda" ? 30 : 52} fontWeight={900} fill={WARNA_TEMPAT[c]}>
                {angka[c]}
              </text>
            </g>
          );
        })}
      </Gambar>
      {rupa === "benda" ? (
        <ul className="flex flex-wrap justify-center gap-1" aria-label="Keterangan benda">
          {["\u{1F4E6} ratusan", "\u{1F6CD} puluhan", `${EMOJI_PERMEN} satuan`].map((t) => (
            <li key={t} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
function TampilNama({ l, rupa, cara }: { l: LNama; rupa: Rupa; cara: Cara }) {
  const baca = cara === "suara";
  if (rupa === "lambang")
    return (
      <NotaStok>
        <KartuKata judul={baca ? "Bilangan" : "Nama bilangan"} baris={baca ? [String(l.n)] : [kataBil(l.n)]} />
      </NotaStok>
    );
  const isi = baca ? String(l.n) : kataBil(l.n);
  return (
    <div className="space-y-2">
      <Gambar label={baca ? "Bilangan yang harus diucapkan" : "Nama bilangan"} judul={baca ? "ucapkan nama bilangannya" : "tulis angkanya"}>
        <rect x={20} y={36} width={260} height={110} rx={14} fill={rupa === "benda" ? "#FEF3C7" : "#F8FAFC"} stroke={rupa === "benda" ? "#B45309" : "#1E3A8A"} strokeWidth={2.4} strokeDasharray={rupa === "benda" ? undefined : "5 3"} />
        {rupa === "benda" ? (
          <text x={44} y={72} textAnchor="middle" fontSize={22} aria-hidden="true">
            {"\u{1F3F7}"}
          </text>
        ) : null}
        <text x={150} y={baca ? 108 : 98} textAnchor="middle" fontSize={baca ? 52 : Math.min(24, Math.floor(250 / (isi.length * 0.56)))} fontWeight={900} fill={UNGU}>
          {isi}
        </text>
      </Gambar>
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "kem":
    case "tukar":
      return <TampilKemasan l={l} rupa={props.rupa} />;
    case "balok":
      return <TampilBalok l={l} rupa={props.rupa} />;
    case "tabel":
      return <TampilTabel l={l} rupa={props.rupa} cara={props.cara} />;
    case "nama":
      return <TampilNama l={l} rupa={props.rupa} cara={props.cara} />;
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
export function LangkahTempat({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara, rupa);
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : /^\d+$/.test(j) ? kata(Number(j)) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara, rupa);
  const cocokKlik = (n: string): boolean => (kunci?.jenis === "angka" ? n === String(kunci.n) : kunci !== null && n === teksKunci(kunci));
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara, rupa)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraTempat kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
