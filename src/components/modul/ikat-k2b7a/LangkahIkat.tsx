"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  OBJEK,
  barisBalok,
  barisBalokTunggal,
  barisBingkaiHitung,
  barisBingkaiPenuh,
  barisIgil,
  barisLoncat,
  dasarDari,
  hasilLoncat,
  huruf,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  nomorPenuh,
  nomorSusunan,
  petunjukKetuk,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  type Cara,
  type LBalok,
  type LBingkai,
  type LIgil,
  type LLoncat,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraIkat, PilihanKata, teksKunci } from "./JawabIkat";

/**
 * Satu tugas CPA Kelas 2 Bab 7 Sub-Bab A: metode IGIL (Ikat, Hitung Puluhan, Tambah Satuan: ikat penuh dan benda lepas), Ten Frame (bingkai sepuluh), Skip Counting (garis lompatan
 * sepuluh-sepuluh), Base Ten Blocks (batang dan kotak kecil), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab menurut caranya (pilih bilangan,
 * ketuk, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji diikat tali rafia di lantai gudang (Concrete), ikat, bingkai, titik, dan balok polos di lembar berkisi (Pictorial),
 * kartu kata dan angka di papan tulis hijau (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const TINTA = "#334155";
const TALI = "#CA8A04";
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

/* ------------------------------ Benda, ikat, bingkai ------------------------------ */
const emoji = (o: number | undefined): string => (o !== undefined ? OBJEK[o].emoji : "");
/** Satu ikat sepuluh benda diikat tali rafia: pojok kiri-atas (x, y), 42 x 26. Concrete: emoji benda; Pictorial: titik polos. */
function Ikatan({ x, y, o, rupa }: { x: number; y: number; o?: number; rupa: Rupa }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={42} height={26} rx={5} fill="#FFFBEB" stroke={rupa === "benda" ? TALI : BIRU_TUA} strokeWidth={2.2} />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = x + 8 + (i % 5) * 7.6;
        const cy = y + 8 + Math.floor(i / 5) * 10.5;
        return rupa === "benda" ? (
          <text key={i} x={cx} y={cy + 3} fontSize={8.5} textAnchor="middle">
            {emoji(o)}
          </text>
        ) : (
          <circle key={i} cx={cx} cy={cy} r={2.5} fill="#93C5FD" stroke={BIRU_TUA} strokeWidth={0.8} />
        );
      })}
      <rect x={x + 17} y={y + 10} width={8} height={6} rx={2} fill={rupa === "benda" ? TALI : BIRU_TUA} />
    </g>
  );
}
/** Benda lepas dalam baris lima, pojok kiri-atas (x, y), jarak `g`. */
function Lepas({ x, y, n, o, rupa, g = 16 }: { x: number; y: number; n: number; o?: number; rupa: Rupa; g?: number }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (i % 5) * g + g / 2;
        const cy = y + Math.floor(i / 5) * (g + 2) + g / 2;
        return rupa === "benda" ? (
          <text key={i} x={cx} y={cy + 5} fontSize={14} textAnchor="middle">
            {emoji(o)}
          </text>
        ) : (
          <circle key={i} cx={cx} cy={cy} r={g * 0.28} fill="#FDE68A" stroke={UNGU} strokeWidth={1} />
        );
      })}
    </g>
  );
}
/** Bingkai sepuluh: dua baris lima kotak sisi `c`, pojok kiri-atas (x, y); `n` kotak pertama terisi. */
function BingkaiS({ x, y, n, c, o, rupa }: { x: number; y: number; n: number; c: number; o?: number; rupa: Rupa }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => {
        const bx = x + (i % 5) * c;
        const by = y + Math.floor(i / 5) * c;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={c} height={c} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.2} />
            {i < n ? (
              rupa === "benda" ? (
                <text x={bx + c / 2} y={by + c / 2 + c * 0.3} fontSize={c * 0.72} textAnchor="middle">
                  {emoji(o)}
                </text>
              ) : (
                <circle cx={bx + c / 2} cy={by + c / 2} r={c * 0.32} fill="#F59E0B" stroke="#92400E" strokeWidth={1} />
              )
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
/** Keterangan benda (Concrete): emoji dan nama benda yang dipakai gambar. */
function Keterangan({ o, rupa }: { o: number | undefined; rupa: Rupa }) {
  if (rupa !== "benda" || o === undefined) return null;
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Nama benda">
      <li className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
        <span aria-hidden="true">{OBJEK[o].emoji}</span> {OBJEK[o].nama}
      </li>
    </ul>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, tanda, onTap, aktif, benar }: { judul?: string; baris: string[]; tanda?: string; onTap?: () => void; aktif?: boolean; benar?: boolean }) {
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
  const kelas = `rounded-lg border-2 px-2 py-1.5 text-left ${benar ? "border-[#16A34A] bg-[#DCFCE7]" : aktif ? "border-[#2563EB] bg-[#DBEAFE]" : "border-[#78350F] bg-[#FFFBEB]"}`;
  return onTap ? (
    <button type="button" onClick={onTap} className={`${kelas} min-h-[48px] w-full`}>
      {isi}
    </button>
  ) : (
    <div className={kelas}>{isi}</div>
  );
}
const PapanKapur = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-[6px] border-[#78350F] bg-[#166534] p-2">{children}</div>;

/* ------------------------------ Metode IGIL: Ikat, Hitung Puluhan, Tambah Satuan ------------------------------ */
function Igil({ l, rupa }: PK & { l: LIgil }) {
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <KartuKata judul="Ikat dan benda lepas" baris={barisIgil(l)} />
      </PapanKapur>
    );
  const baris = Math.ceil(l.p / 4);
  const tinggi = Math.min(150, Math.max(100, 56 + Math.max(1, baris) * 36 + 10));
  return (
    <div className="space-y-2">
      <Gambar label="Ikat penuh dan benda lepas" judul={rupa === "benda" ? "hitung ikatnya, lalu benda lepasnya" : "papan puluhan dan satuan"}>
        <rect x={4} y={24} width={200} height={tinggi} rx={8} fill={rupa === "benda" ? "#FEF3C7" : "#EFF6FF"} stroke={rupa === "benda" ? TALI : BIRU_TUA} strokeWidth={1.6} />
        <rect x={208} y={24} width={88} height={tinggi} rx={8} fill={rupa === "benda" ? "#F5F5F4" : "#FEFCE8"} stroke={rupa === "benda" ? "#A8A29E" : "#A16207"} strokeWidth={1.6} />
        <text x={104} y={40} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={rupa === "benda" ? "#92400E" : BIRU_TUA}>
          {rupa === "benda" ? "ikat penuh" : "Puluhan (ikat)"}
        </text>
        <text x={252} y={40} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={rupa === "benda" ? "#57534E" : "#A16207"}>
          {rupa === "benda" ? "benda lepas" : "Satuan (lepas)"}
        </text>
        {Array.from({ length: l.p }, (_, i) => (
          <Ikatan key={i} x={12 + (i % 4) * 47} y={48 + Math.floor(i / 4) * 36} o={l.o} rupa={rupa} />
        ))}
        {l.p === 0 ? (
          <text x={104} y={100} textAnchor="middle" fontSize={9} fill="#64748B">
            tidak ada ikat
          </text>
        ) : null}
        <Lepas x={214} y={50} n={l.s} o={l.o} rupa={rupa} />
        <text x={150} y={24 + tinggi + 14} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#64748B">
          {baris > 0 ? "satu ikat berisi sepuluh benda" : "belum ada ikat"}
        </text>
      </Gambar>
      <Keterangan o={l.o} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Ten Frame: Bingkai Sepuluh ------------------------------ */
function Bingkai({ l, rupa, cara, diam, salah, siap }: PK & { l: LBingkai }) {
  const klik = l.mode === "penuh" && cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  if (l.mode === "penuh") {
    const benar = nomorPenuh(l);
    const pilih = (i: number) => {
      if (!klik || dapat !== null) return;
      if (i === benar) {
        setDapat(i);
        siap(kalimatKunci(l, "klik", rupa));
      } else salah(petunjukKetuk(l, i));
    };
    if (rupa === "lambang")
      return (
        <PapanKapur>
          <p className="text-center text-xs font-black text-[#FDE68A]">{klik ? "Ketuk kartu bingkai yang penuh" : "Beberapa bingkai sepuluh"}</p>
          {l.isi.map((n, i) => (
            <KartuKata key={i} tanda={huruf(i)} baris={[barisBingkaiPenuh(n, i)]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
          ))}
        </PapanKapur>
      );
    return (
      <div className="space-y-2">
        <Gambar label="Beberapa bingkai sepuluh" judul="ketuk bingkai yang penuh">
          {l.isi.map((n, i) => {
            const x = 28 + (i % 2) * 146;
            const y = 34 + Math.floor(i / 2) * 78;
            return (
              <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Bingkai ${huruf(i)}`}>
                <rect x={x - 8} y={y - 6} width={106} height={66} rx={8} fill={dapat === i ? "#BBF7D0" : "transparent"} />
                <BingkaiS x={x} y={y} n={n} c={18} o={l.o} rupa={rupa} />
                <text x={x + 45} y={y + 54} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                  {huruf(i)}
                </text>
              </g>
            );
          })}
        </Gambar>
        <Keterangan o={l.o} rupa={rupa} />
      </div>
    );
  }
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <KartuKata judul="Bingkai sepuluh" baris={barisBingkaiHitung(l)} />
      </PapanKapur>
    );
  const jumlah = l.p + 1;
  return (
    <div className="space-y-2">
      <Gambar label="Bingkai penuh dan satu bingkai belum penuh" judul="hitung bingkai yang penuh">
        {Array.from({ length: jumlah }, (_, i) => {
          const x = 14 + (i % 3) * 96;
          const y = 32 + Math.floor(i / 3) * 62;
          const terakhir = i === l.p;
          return (
            <g key={i}>
              <BingkaiS x={x} y={y} n={terakhir ? l.s : 10} c={12} o={l.o} rupa={rupa} />
              <text x={x + 30} y={y + 38} textAnchor="middle" fontSize={8.5} fontWeight={800} fill={terakhir ? "#B45309" : "#64748B"}>
                {terakhir ? "belum penuh" : "penuh"}
              </text>
            </g>
          );
        })}
      </Gambar>
      <Keterangan o={l.o} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Skip Counting: Hitung Loncat ------------------------------ */
const geserX = (v: number): number => 18 + v * 2.64;
function Loncat({ l, rupa, cara }: PK & { l: LLoncat }) {
  const hasil = hasilLoncat(l);
  const kanvas = cara === "kanvas";
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <KartuKata judul="Hitung loncat" baris={barisLoncat(l, cara)} />
      </PapanKapur>
    );
  return (
    <div className="space-y-2">
      <Gambar label="Garis lompatan sepuluh-sepuluh" judul={kanvas ? "hitung lompatannya" : "lompat sepuluh-sepuluh"}>
        <line x1={geserX(0)} y1={122} x2={geserX(100)} y2={122} stroke={TINTA} strokeWidth={2.2} />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={geserX(i * 10)} y1={118} x2={geserX(i * 10)} y2={126} stroke={TINTA} strokeWidth={1.4} />
            {i === 0 || i === 10 ? (
              <text x={geserX(i * 10)} y={140} textAnchor="middle" fontSize={8} fill="#64748B">
                {i * 10}
              </text>
            ) : null}
          </g>
        ))}
        {Array.from({ length: l.k }, (_, i) => {
          const a = geserX(l.awal + i * 10);
          const b = geserX(l.awal + (i + 1) * 10);
          return (
            <g key={i}>
              <path d={`M${a} 120 Q${(a + b) / 2} 94 ${b} 120`} fill="none" stroke="#DC2626" strokeWidth={2} />
              {rupa === "benda" ? (
                <text x={(a + b) / 2} y={96} textAnchor="middle" fontSize={11} aria-hidden="true">
                  {emoji(l.o)}
                </text>
              ) : null}
            </g>
          );
        })}
        <circle cx={geserX(l.awal)} cy={122} r={4.5} fill="#16A34A" stroke="#14532D" strokeWidth={1.2} />
        <text x={geserX(l.awal)} y={156} textAnchor="middle" fontSize={11} fontWeight={900} fill={HIJAU}>
          {l.awal === 0 ? "mulai 0" : `mulai ${l.awal}`}
        </text>
        <circle cx={geserX(hasil)} cy={122} r={4.5} fill="#FACC15" stroke="#A16207" strokeWidth={1.2} />
        <text x={geserX(hasil)} y={74} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DC2626">
          {kanvas ? `sampai ${hasil}` : "?"}
        </text>
      </Gambar>
      <Keterangan o={l.o} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Base Ten Blocks: Balok Puluhan ------------------------------ */
/** Batang puluhan (setinggi sepuluh kotak) berdiri di alas yb; pojok kiri x. */
function Batang({ x, yb, u, o, rupa }: { x: number; yb: number; u: number; o?: number; rupa: Rupa }) {
  const w = Math.max(6, u * 1.5);
  const warna = rupa === "benda" && o !== undefined ? OBJEK[o].warna : "#BFDBFE";
  const tepi = rupa === "benda" && o !== undefined ? OBJEK[o].garis : BIRU_TUA;
  return (
    <g aria-hidden="true">
      <rect x={x} y={yb - 10 * u} width={w} height={10 * u} fill={warna} stroke={tepi} strokeWidth={1.3} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x} y1={yb - (i + 1) * u} x2={x + w} y2={yb - (i + 1) * u} stroke={tepi} strokeWidth={0.7} opacity={0.6} />
      ))}
    </g>
  );
}
function Kotak({ x, yb, u, o, rupa }: { x: number; yb: number; u: number; o?: number; rupa: Rupa }) {
  const warna = rupa === "benda" && o !== undefined ? OBJEK[o].warna : "#FEF08A";
  const tepi = rupa === "benda" && o !== undefined ? OBJEK[o].garis : "#A16207";
  return <rect x={x} y={yb - u} width={u} height={u} fill={warna} stroke={tepi} strokeWidth={1.2} aria-hidden="true" />;
}
/** Susunan `p` batang dan `s` kotak kecil (tiga kolom) mulai dari x, alas yb. Mengembalikan lebar lewat anak. */
function GrupBalok({ x, yb, p, s, u, o, rupa }: { x: number; yb: number; p: number; s: number; u: number; o?: number; rupa: Rupa }) {
  const w = Math.max(6, u * 1.5);
  const awalKotak = x + p * (w + 3) + 6;
  return (
    <g aria-hidden="true">
      {Array.from({ length: p }, (_, i) => (
        <Batang key={`b${i}`} x={x + i * (w + 3)} yb={yb} u={u} o={o} rupa={rupa} />
      ))}
      {Array.from({ length: s }, (_, i) => (
        <Kotak key={`k${i}`} x={awalKotak + (i % 3) * (u + 1.5)} yb={yb - Math.floor(i / 3) * (u + 1.5)} u={u} o={o} rupa={rupa} />
      ))}
    </g>
  );
}
function Balok({ l, rupa, cara, diam, salah, siap }: PK & { l: LBalok }) {
  const klik = l.mode === "pilih" && cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  if (l.mode === "pilih") {
    const benar = nomorSusunan(l);
    const pilih = (i: number) => {
      if (!klik || dapat !== null) return;
      if (i === benar) {
        setDapat(i);
        siap(kalimatKunci(l, "klik", rupa));
      } else salah(petunjukKetuk(l, i));
    };
    if (rupa === "lambang")
      return (
        <PapanKapur>
          <p className="text-center text-xs font-black text-[#FDE68A]">{klik ? "Ketuk kartu susunan yang sama dengan bilangan" : "Beberapa susunan balok"}</p>
          {l.koleksi.map((b, i) => (
            <KartuKata key={i} tanda={huruf(i)} baris={[barisBalok(b, i)]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
          ))}
        </PapanKapur>
      );
    return (
      <div className="space-y-2">
        <Gambar label="Beberapa susunan balok" judul="ketuk susunan yang sama dengan bilangan">
          {l.koleksi.map(([p, s], i) => {
            const x = 22 + (i % 2) * 146;
            const yb = 84 + Math.floor(i / 2) * 84;
            return (
              <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Susunan ${huruf(i)}`}>
                <rect x={x - 10} y={yb - 56} width={132} height={74} rx={8} fill={dapat === i ? "#BBF7D0" : "transparent"} />
                <GrupBalok x={x} yb={yb} p={p} s={s} u={4.4} o={l.o} rupa={rupa} />
                <text x={x + 52} y={yb + 14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                  {huruf(i)}
                </text>
              </g>
            );
          })}
        </Gambar>
        <Keterangan o={l.o} rupa={rupa} />
      </div>
    );
  }
  if (l.mode === "tukar") {
    if (rupa === "lambang")
      return (
        <PapanKapur>
          <KartuKata judul="Balok yang ditukar" baris={[barisBalokTunggal(l.p, l.k), "10 kotak kecil ditukar 1 batang"]} />
        </PapanKapur>
      );
    return (
      <div className="space-y-2">
        <Gambar label="Batang dan kotak kecil" judul="sepuluh kotak kecil ditukar satu batang">
          <GrupBalok x={26} yb={166} p={l.p} s={0} u={9} o={l.o} rupa={rupa} />
          {Array.from({ length: l.k }, (_, i) => (
            <Kotak key={i} x={26 + l.p * 22 + 22 + (i % 5) * 13} yb={166 - Math.floor(i / 5) * 13} u={11} o={l.o} rupa={rupa} />
          ))}
          <text x={150} y={188} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#64748B">
            batang = sepuluh kotak kecil
          </text>
        </Gambar>
        <Keterangan o={l.o} rupa={rupa} />
      </div>
    );
  }
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <KartuKata judul="Balok puluhan" baris={[barisBalokTunggal(l.p, l.s)]} />
      </PapanKapur>
    );
  return (
    <div className="space-y-2">
      <Gambar label="Batang dan kotak kecil" judul={l.tanya === "batang" ? "satu batang panjang mewakili apa?" : "satu kotak kecil mewakili apa?"}>
        <GrupBalok x={70} yb={150} p={l.p} s={l.s} u={7} o={l.o} rupa={rupa} />
        <text x={70 + (l.p * 13.5) / 2} y={168} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
          batang
        </text>
        <text x={70 + l.p * 13.5 + 6 + 12} y={181} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
          kotak kecil
        </text>
      </Gambar>
      <Keterangan o={l.o} rupa={rupa} />
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  if (l.tipe === "igil") return <Igil {...props} l={l} />;
  if (l.tipe === "bingkai") return <Bingkai {...props} l={l} />;
  if (l.tipe === "loncat") return <Loncat {...props} l={l} />;
  return <Balok {...props} l={l} />;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
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
export function LangkahIkat({ ls, rupa, bicara, onBenar }: P) {
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
            <JawabSuaraIkat kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
