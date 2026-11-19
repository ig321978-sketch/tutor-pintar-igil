"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  OBJEK,
  barisKartu,
  dasarDari,
  huruf,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  namaJ,
  nomorTurus,
  petunjukKetuk,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  urutCampur,
  urutanBenar,
  type Cara,
  type Jenis,
  type LMat,
  type LNyata,
  type LPile,
  type LPilihTurus,
  type LTabel,
  type LTurus,
  type LUrut,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraTurus, PilihanKata, teksKunci } from "./JawabTurus";

/**
 * Satu tugas CPA Kelas 2 Bab 8 Sub-Bab A: metode IGIL (Pilah, Garis, Bundel Lima: tumpukan campur dan turus), Sorting Mat (Alas Pilah: baris tiap jenis), Count by Fives (Hitung Lima-Lima:
 * turus berbundel), Real Graph (Diagram Benda Nyata: lajur benda dari garis dasar, baris titik dan tabel), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih bilangan atau nama, ketuk, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji di balik tirai (Concrete), titik berwarna, turus, dan tabel
 * polos di lembar berkisi (Pictorial), kartu kata dan angka di papan jepit (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const TINTA = "#334155";
const BIRU_TUA = "#1D4ED8";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label}>
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
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

/* ------------------------------ Benda, turus, label ------------------------------ */
/** Satu benda berpusat di (x, y). Concrete: emoji benda; Pictorial: titik berwarna polos. */
function Unit({ x, y, o, rupa, r = 7 }: { x: number; y: number; o: number; rupa: Rupa; r?: number }) {
  return rupa === "benda" ? (
    <text x={x} y={y + r * 0.8} fontSize={r * 2.2} textAnchor="middle" aria-hidden="true">
      {OBJEK[o].emoji}
    </text>
  ) : (
    <circle cx={x} cy={y} r={r * 0.62} fill={OBJEK[o].warna} stroke={OBJEK[o].garis} strokeWidth={1.2} aria-hidden="true" />
  );
}
/** Label jenis di sisi kiri baris: gambar kecil dan nama. */
function LabelJenis({ x, y, o, rupa }: { x: number; y: number; o: number; rupa: Rupa }) {
  return (
    <g aria-hidden="true">
      <Unit x={x - 28} y={y} o={o} rupa={rupa} r={6.5} />
      <text x={x + 2} y={y + 3.2} textAnchor="middle" fontSize={8.4} fontWeight={800} fill={TINTA}>
        {OBJEK[o].nama}
      </text>
    </g>
  );
}
/** Turus `n` garis: tiap lima turus satu bundel (empat garis tegak dan satu coretan miring). Pojok kiri-atas (x, y). */
function TurusGaris({ x, y, n, h = 28, s = 6.4, tebal = 2.2 }: { x: number; y: number; n: number; h?: number; s?: number; tebal?: number }) {
  const antar = 4 * s + 4;
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const j = Math.floor(i / 5);
        const p = i % 5;
        const bx = x + j * antar;
        return p < 4 ? (
          <line key={`g${i}`} x1={bx + p * s} y1={y} x2={bx + p * s} y2={y + h} stroke={BIRU_TUA} strokeWidth={tebal} strokeLinecap="round" />
        ) : (
          <line key={`m${j}`} x1={bx - 2} y1={y + h - 2} x2={bx + 3 * s + 2} y2={y + 2} stroke="#DC2626" strokeWidth={tebal} strokeLinecap="round" />
        );
      })}
    </g>
  );
}
/** Keterangan jenis (Concrete: emoji dan nama; Pictorial: titik berwarna dan nama). */
function Keterangan({ jenis, rupa }: { jenis: Jenis[]; rupa: Rupa }) {
  if (rupa === "lambang") return null;
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Nama jenis">
      {jenis.map((j) => (
        <li key={j.o} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
          {rupa === "benda" ? (
            <span aria-hidden="true">{OBJEK[j.o].emoji} </span>
          ) : (
            <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: OBJEK[j.o].warna, border: `1.5px solid ${OBJEK[j.o].garis}` }} />
          )}
          {OBJEK[j.o].nama}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, tanda, onTap, benar }: { judul?: string; baris: string[]; tanda?: string; onTap?: () => void; benar?: boolean }) {
  const isi = (
    <>
      {tanda ? <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-white">{tanda}</span> : null}
      <span className="inline-block align-middle">
        {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
        {baris.map((b) => (
          <span key={b} className="block text-sm font-bold leading-snug text-[#1C01A5]">
            {b}
          </span>
        ))}
      </span>
    </>
  );
  const kelas = `rounded-lg border-2 px-2 py-1.5 text-left ${benar ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#78350F] bg-[#FFFBEB]"}`;
  return onTap ? (
    <button type="button" onClick={onTap} className={`${kelas} min-h-[48px] w-full`}>
      {isi}
    </button>
  ) : (
    <div className={kelas}>{isi}</div>
  );
}
const PapanJepit = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-[6px] border-[#92400E] bg-[#B45309] p-2">{children}</div>;

/* ------------------------------ Metode IGIL: tumpukan campur ------------------------------ */
function Tumpukan({ l, rupa }: { l: LPile; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <KartuKata judul="Tumpukan campur" baris={barisKartu(l)} />
      </PapanJepit>
    );
  const urut = urutCampur(l.jenis);
  return (
    <div className="space-y-2">
      <Gambar label="Tumpukan campur" judul="pilah menurut jenis, lalu hitung">
        <rect x={6} y={24} width={288} height={Math.ceil(urut.length / 8) * 44 + 14} rx={10} fill={rupa === "benda" ? "#FEE2E2" : "#EFF6FF"} stroke={rupa === "benda" ? "#B91C1C" : BIRU_TUA} strokeWidth={1.6} strokeDasharray={rupa === "benda" ? undefined : "4 3"} />
        {urut.map((j, i) => (
          <Unit key={i} x={28 + (i % 8) * 35 + ((i * 13) % 9) - 4} y={52 + Math.floor(i / 8) * 44 + ((i * 7) % 11) - 5} o={l.jenis[j].o} rupa={rupa} r={rupa === "benda" ? 8 : 9} />
        ))}
      </Gambar>
      <Keterangan jenis={l.jenis} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Turus (Hitung Lima-Lima) ------------------------------ */
function TurusPapan({ l, rupa }: { l: LTurus; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <KartuKata judul="Turus" baris={barisKartu(l)} />
      </PapanJepit>
    );
  return (
    <div className="space-y-2">
      <Gambar label="Turus berbundel lima" judul="hitung lima-lima, lalu tambah garis sisa">
        <rect x={6} y={30} width={288} height={110} rx={10} fill={rupa === "benda" ? "#FEF3C7" : "#F0FDF4"} stroke={rupa === "benda" ? "#CA8A04" : "#15803D"} strokeWidth={1.6} />
        <LabelJenis x={52} y={84} o={l.o} rupa={rupa} />
        <TurusGaris x={96} y={66} n={l.n} />
      </Gambar>
      <Keterangan jenis={[{ o: l.o, n: l.n }]} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Alas Pilah dan lajur benda ------------------------------ */
const geserBaris = (n: number): number => Math.min(9, n);
function BarisJenis({ j, y, x0, g, rupa }: { j: Jenis; y: number; x0: number; g: number; rupa: Rupa }) {
  return (
    <g>
      <LabelJenis x={52} y={y} o={j.o} rupa={rupa} />
      {Array.from({ length: geserBaris(j.n) }, (_, i) => (
        <Unit key={i} x={x0 + i * g} y={y} o={j.o} rupa={rupa} />
      ))}
    </g>
  );
}
function Alas({ l, rupa }: { l: LMat; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <KartuKata judul="Alas pilah" baris={barisKartu(l)} />
      </PapanJepit>
    );
  const t = 34;
  return (
    <div className="space-y-2">
      <Gambar label="Alas pilah, satu baris tiap jenis" judul="satu baris untuk tiap jenis benda">
        <rect x={6} y={24} width={288} height={l.jenis.length * t + 8} rx={8} fill="#E0F2FE" stroke="#0369A1" strokeWidth={1.8} />
        {l.jenis.map((j, r) => (
          <g key={j.o}>
            {r > 0 ? <line x1={6} y1={24 + r * t + 4} x2={294} y2={24 + r * t + 4} stroke="#0369A1" strokeWidth={1} opacity={0.6} /> : null}
            <BarisJenis j={j} y={24 + r * t + 22} x0={108} g={20} rupa={rupa} />
          </g>
        ))}
      </Gambar>
    </div>
  );
}
function Lajur({ l, rupa }: { l: LNyata; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <KartuKata judul="Lajur benda" baris={barisKartu(l)} />
      </PapanJepit>
    );
  const t = 38;
  return (
    <div className="space-y-2">
      <Gambar label="Lajur benda dari garis dasar yang sama" judul="mulai dari garis dasar yang sama">
        <rect x={6} y={24} width={288} height={l.jenis.length * t + 8} rx={8} fill="#F0FDF4" stroke="#15803D" strokeWidth={1.6} />
        <line x1={96} y1={28} x2={96} y2={24 + l.jenis.length * t + 4} stroke={BIRU_TUA} strokeWidth={2.4} />
        {l.jenis.map((j, r) => (
          <BarisJenis key={j.o} j={j} y={24 + r * t + 24} x0={110} g={19} rupa={rupa} />
        ))}
        <text x={96} y={24 + l.jenis.length * t + 18} textAnchor="middle" fontSize={8} fontWeight={800} fill="#64748B">
          garis dasar
        </text>
      </Gambar>
    </div>
  );
}

/* ------------------------------ Urut baris ------------------------------ */
function UrutBaris({ l, rupa, cara, diam, salah, siap }: PK & { l: LUrut }) {
  const klik = cara === "klik" && !diam;
  const [urutan, setUrutan] = useState<number[]>([]);
  const benar = urutanBenar(l.jenis);
  const ketukBaris = (i: number) => {
    if (!klik || urutan.includes(i)) return;
    if (i === benar[urutan.length]) {
      const baru = [...urutan, i];
      setUrutan(baru);
      if (baru.length === l.jenis.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else salah(petunjukKetuk(l, i));
  };
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <p className="text-center text-xs font-black text-[#FDE68A]">Ketuk baris dari yang paling banyak</p>
        {l.jenis.map((j, i) => (
          <KartuKata key={j.o} tanda={urutan.includes(i) ? String(urutan.indexOf(i) + 1) : huruf(i)} baris={barisKartu(l)[i].split(", ")} onTap={() => ketukBaris(i)} benar={urutan.includes(i)} />
        ))}
      </PapanJepit>
    );
  const t = 44;
  return (
    <div className="space-y-2">
      <Gambar label="Baris benda untuk diurutkan" judul="ketuk dari yang paling banyak">
        {l.jenis.map((j, i) => {
          const y = 28 + i * t;
          const no = urutan.indexOf(i);
          return (
            <g key={j.o} {...(klik ? ketuk(() => ketukBaris(i)) : {})} aria-label={`Baris ${namaJ(j)}`}>
              <rect x={6} y={y} width={288} height={t - 6} rx={8} fill={no >= 0 ? "#BBF7D0" : "#F8FAFC"} stroke={BIRU_TUA} strokeWidth={1.4} />
              <BarisJenis j={j} y={y + (t - 6) / 2} x0={108} g={20} rupa={rupa} />
              {no >= 0 ? (
                <g aria-hidden="true">
                  <circle cx={278} cy={y + (t - 6) / 2} r={9} fill="#15803D" />
                  <text x={278} y={y + (t - 6) / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFFFFF">
                    {no + 1}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </Gambar>
    </div>
  );
}

/* ------------------------------ Ketuk turus yang tepat ------------------------------ */
function PilihTurusKetuk({ l, rupa, cara, diam, salah, siap }: PK & { l: LPilihTurus }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === nomorTurus(l)) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else salah(petunjukKetuk(l, i));
  };
  if (rupa === "lambang")
    return (
      <PapanJepit>
        <p className="text-center text-xs font-black text-[#FDE68A]">Ketuk turus yang tepat</p>
        {barisKartu(l).map((b, i) => (
          <KartuKata key={i} tanda={huruf(i)} baris={[b]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
        ))}
      </PapanJepit>
    );
  return (
    <div className="space-y-2">
      <Gambar label="Beberapa turus untuk dipilih" judul="ketuk turus yang tepat">
        {l.opsi.map((n, i) => {
          const y = 26 + i * 56;
          return (
            <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Turus ${huruf(i)}`}>
              <rect x={6} y={y} width={288} height={50} rx={8} fill={dapat === i ? "#BBF7D0" : rupa === "benda" ? "#FEF3C7" : "#F0FDF4"} stroke={rupa === "benda" ? "#CA8A04" : "#15803D"} strokeWidth={1.4} />
              <text x={22} y={y + 30} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
                {huruf(i)}
              </text>
              <TurusGaris x={44} y={y + 11} n={n} h={28} s={6} tebal={2} />
            </g>
          );
        })}
      </Gambar>
      <Keterangan jenis={[{ o: l.o, n: l.n }]} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Ketuk tabel yang cocok dengan baris titik ------------------------------ */
function TabelKetuk({ l, rupa, cara, diam, salah, siap }: PK & { l: LTabel }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === l.benar) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else salah(petunjukKetuk(l, i));
  };
  return (
    <div className="space-y-2">
      <Gambar label="Baris titik tiap jenis" judul="baris titik">
        <rect x={6} y={24} width={288} height={l.jenis.length * 34 + 8} rx={8} fill="#F8FAFC" stroke={BIRU_TUA} strokeWidth={1.6} />
        {l.jenis.map((j, r) => (
          <BarisJenis key={j.o} j={j} y={24 + r * 34 + 21} x0={108} g={20} rupa="diagram" />
        ))}
      </Gambar>
      <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih tabel">
        {l.opsi.map((o, i) => (
          <button key={i} type="button" disabled={!klik} onClick={() => pilih(i)} className={`rounded-lg border-2 px-1.5 py-1 text-left text-xs font-bold ${dapat === i ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}>
            <span className="mb-0.5 block text-[11px] font-black text-[#B45309]">Tabel {huruf(i)}</span>
            {l.jenis.map((j, k) => (
              <span key={j.o} className="flex justify-between gap-2 border-t border-[#CBD5E1] text-[#1C01A5]">
                <span>{namaJ(j)}</span>
                <span className="font-black">{o[k]}</span>
              </span>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "pile":
      return <Tumpukan l={l} rupa={props.rupa} />;
    case "turus":
      return <TurusPapan l={l} rupa={props.rupa} />;
    case "mat":
      return <Alas l={l} rupa={props.rupa} />;
    case "nyata":
      return <Lajur l={l} rupa={props.rupa} />;
    case "urut":
      return <UrutBaris {...props} l={l} />;
    case "pilihTurus":
      return <PilihTurusKetuk {...props} l={l} />;
    case "tabel":
      return <TabelKetuk {...props} l={l} />;
  }
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} diam salah={salah} siap={() => undefined} info={info} />
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
export function LangkahTurus({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : /^\d+$/.test(j) ? kata(Number(j)) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => (kunci?.jenis === "angka" ? n === String(kunci.n) : kunci !== null && n === teksKunci(kunci));
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraTurus kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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

