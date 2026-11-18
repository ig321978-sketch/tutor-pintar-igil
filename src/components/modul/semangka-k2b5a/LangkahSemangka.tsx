"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  HURUF,
  OBJEK,
  barisGarisKartu,
  barisKartu,
  dasarDari,
  gbrGaris,
  gbrSemua,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  nomorKetuk,
  petunjukGaris,
  petunjukPotong,
  petunjukSalah,
  pilihanKata,
  pilihanKataDari,
  siapLangsung,
  type Cara,
  type Gbr,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type LAdil,
  type LCermin,
  type LIgil,
  type LPita,
  type Rupa,
} from "./logika-cpa";
import { POLIGON, bagian, bagianWarna, bayangan, ruasGaris, type Garis, type Pt } from "./bagian";
import { JawabSuaraSemangka, PilihanKata, teksKunci } from "./JawabSemangka";

/**
 * Satu tugas CPA Kelas 2 Bab 5 Sub-Bab A: metode IGIL (tiga pertanyaan Dika pada gambar atau kartu), Berbagi Adil (ketuk garis potong yang adil atau hitung garis yang adil),
 * Uji Cermin (garis tempat cermin dan bayangannya), Pita Pecahan (ketuk potongan pita yang setengah atau hitung kotak), tugas Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab), lalu menjawab menurut caranya (pilih kata, tulis satu angka di kanvas, atau ucapkan). Rupa: benda berwarna beremoji di gerobak panen (Concrete),
 * bangun polos berwarna di lembar kisi (Pictorial), kartu kata dengan banyak kotak (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const WARNA_GARIS = ["#DC2626", "#2563EB", "#15803D", "#9333EA", "#EA580C"];

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

/* ------------------------------ Bangun ------------------------------ */
const r1 = (n: number): number => Math.round(n * 10) / 10;
const titik = (p: readonly Pt[], x: number, y: number, s: number): string => p.map(([u, v]) => `${r1(x + u * s)},${r1(y + v * s)}`).join(" ");

/** Satu bangun pada kotak berukuran `s` dengan pojok kiri-atas (x, y). Bagian berwarna (ditunjuk) lebih pekat; garis pembagi putus-putus. Rupa Concrete: warna dan emoji benda; Pictorial: bangun polos. */
function Bangun({ gb, rupa, x, y, s, garis = true, tandaCermin = false, bayang = false }: { gb: Gbr; rupa: Rupa; x: number; y: number; s: number; garis?: boolean; tandaCermin?: boolean; bayang?: boolean }) {
  const bag = bagian(gb);
  const w = bagianWarna(gb);
  const ob = rupa === "benda" && gb.o !== undefined ? OBJEK[gb.o] : null;
  const dasar = ob ? ob.warna : "#FFFFFF";
  const pekat = ob ? ob.warna2 : "#FDBA74";
  const tepi = ob ? ob.garis : UNGU;
  const bay = bayang ? bayangan(gb) : null;
  const pusat = POLIGON[gb.b];
  const u0 = Math.min(...pusat.map((p) => p[0]));
  const v0 = Math.min(...pusat.map((p) => p[1]));
  return (
    <g aria-hidden="true">
      {bag.map((p, i) => (
        <polygon key={i} points={titik(p, x, y, s)} fill={w === i ? pekat : dasar} stroke={tepi} strokeWidth={1.8} strokeLinejoin="round" />
      ))}
      {w >= 0 && bag.length > 1 ? <polygon points={titik(bag[w], x, y, s)} fill="none" stroke={ob ? "#7C2D12" : "#EA580C"} strokeWidth={2.4} strokeLinejoin="round" /> : null}
      {garis
        ? gb.g.map((g, i) => {
            const r = ruasGaris(gb.b, g);
            if (!r) return null;
            return tandaCermin ? (
              <g key={i}>
                <line x1={x + r[0][0] * s} y1={y + r[0][1] * s} x2={x + r[1][0] * s} y2={y + r[1][1] * s} stroke="#BAE6FD" strokeWidth={5} strokeLinecap="round" />
                <line x1={x + r[0][0] * s} y1={y + r[0][1] * s} x2={x + r[1][0] * s} y2={y + r[1][1] * s} stroke="#0369A1" strokeWidth={1.4} />
              </g>
            ) : (
              <line key={i} x1={x + r[0][0] * s} y1={y + r[0][1] * s} x2={x + r[1][0] * s} y2={y + r[1][1] * s} stroke={ob ? ob.garis : "#2563EB"} strokeWidth={2} strokeDasharray="5 3" />
            );
          })
        : null}
      {bay ? <polygon points={titik(bay, x, y, s)} fill="rgba(147,51,234,0.22)" stroke="#7C3AED" strokeWidth={1.6} strokeDasharray="4 3" strokeLinejoin="round" /> : null}
      {ob ? (
        <text x={x + u0 * s + 3} y={y + v0 * s + 12} fontSize={12}>
          {ob.emoji}
        </text>
      ) : null}
    </g>
  );
}
/** Keterangan benda (Concrete): emoji dan nama benda yang dipakai gambar. */
function Keterangan({ benda, rupa }: { benda: number[]; rupa: Rupa }) {
  if (rupa !== "benda") return null;
  const unik = [...new Set(benda)].sort((a, b) => a - b);
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Nama benda">
      {unik.map((o) => (
        <li key={o} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
          <span aria-hidden="true">{OBJEK[o].emoji}</span> {OBJEK[o].nama}
        </li>
      ))}
    </ul>
  );
}
const bendaDari = (l: LIgil | LAdil | LCermin | LPita): number[] => (l.tipe === "igil" ? l.figs.map((f) => f.o).filter((o): o is number => o !== undefined) : l.o !== undefined ? [l.o] : []);

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, tanda, onTap, aktif, benar }: { judul?: string; baris: string[]; tanda?: string; onTap?: () => void; aktif?: boolean; benar?: boolean }) {
  const isi = (
    <>
      {tanda ? <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#14532D] text-xs font-black text-[#FEF9C3]">{tanda}</span> : null}
      <span className="inline-block align-middle">
        {judul ? <span className="block text-[11px] font-black uppercase text-[#FDE68A]">{judul}</span> : null}
        {baris.map((b) => (
          <span key={b} className="block text-sm font-bold leading-snug text-white">
            {b}
          </span>
        ))}
      </span>
    </>
  );
  const kelas = `rounded-lg border-2 px-2 py-1.5 text-left ${benar ? "border-[#4ADE80] bg-[#166534]" : aktif ? "border-[#FDE047] bg-[#14532D]" : "border-[#D1FAE5]/70 bg-[#14532D]"}`;
  return onTap ? (
    <button type="button" onClick={onTap} className={`${kelas} min-h-[48px] w-full`}>
      {isi}
    </button>
  ) : (
    <div className={kelas}>{isi}</div>
  );
}
const PapanKapur = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-[6px] border-[#92400E] bg-[#166534] p-2">{children}</div>;

/* ------------------------------ Metode IGIL: Dua Bagian, Sama Besar, Setengah ------------------------------ */
function Igil({ l, rupa, cara }: PK & { l: LIgil }) {
  if (l.mode === "nilai") {
    const f = l.figs[0];
    return (
      <div className="space-y-2">
        {rupa === "lambang" ? (
          <PapanKapur>
            <KartuKata judul="Kartu" baris={barisKartu(f)} />
          </PapanKapur>
        ) : (
          <Gambar label="Gambar yang ditunjuk" judul="bagian yang berwarna pekat yang ditunjuk">
            <Bangun gb={f} rupa={rupa} x={75} y={26} s={150} />
          </Gambar>
        )}
        <Keterangan benda={bendaDari(l)} rupa={rupa} />
        <p className="text-center text-xs font-bold text-[#1C01A5]/80">Tiga pertanyaan Dika: dibagi dua bagian? sama besar? satu bagian yang ditunjuk?</p>
      </div>
    );
  }
  void cara;
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <PapanKapur>
          <div className="grid grid-cols-2 gap-1.5">
            {l.figs.map((f, i) => (
              <KartuKata key={i} tanda={HURUF[i]} baris={barisKartu(f)} />
            ))}
          </div>
        </PapanKapur>
      ) : (
        <Gambar label="Enam gambar" judul="periksa tiap gambar">
          {l.figs.map((f, i) => {
            const x = 10 + (i % 3) * 96;
            const y = 24 + Math.floor(i / 3) * 86;
            return (
              <g key={i}>
                <Bangun gb={f} rupa={rupa} x={x} y={y} s={78} />
                <circle cx={x + 8} cy={y + 76} r={7} fill="#FEF3C7" stroke={UNGU} strokeWidth={1.2} />
                <text x={x + 8} y={y + 79} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU}>
                  {HURUF[i]}
                </text>
              </g>
            );
          })}
        </Gambar>
      )}
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Berbagi Adil dan Uji Cermin: garis calon ------------------------------ */
type Ruas = { g: Garis; kiri: [number, number]; kanan: [number, number]; chip: [number, number] };
function ruasUntuk(l: LAdil | LCermin, x: number, y: number, s: number): (Ruas | null)[] {
  return l.garis.map((g) => {
    const r = ruasGaris(l.b, g);
    if (!r) return null;
    const a: [number, number] = [x + r[0][0] * s, y + r[0][1] * s];
    const b: [number, number] = [x + r[1][0] * s, y + r[1][1] * s];
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const n = Math.hypot(dx, dy) || 1;
    return { g, kiri: a, kanan: b, chip: [r1(a[0] + (dx / n) * 10), r1(a[1] + (dy / n) * 10)] };
  });
}
function GarisCalon({ l, rupa, cara, diam, salah, siap }: PK & { l: LAdil | LCermin }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const benar = nomorKetuk(l);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === benar) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukGaris(l, i));
  };
  const cermin = l.tipe === "cermin";
  const judul = klik ? (cermin ? "ketuk garis tempat cermin yang pas" : "ketuk garis potong yang adil") : cermin ? "hitung garis yang membuat bayangan pas" : "hitung garis potong yang adil";
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <p className="text-center text-xs font-black text-[#FDE68A]">{cermin ? `${l.b === "persegi" ? "Persegi" : "Persegi panjang"}: cermin dipasang di tiap garis` : `${l.b === "persegi" ? "Persegi" : "Persegi panjang"}: garis potong yang dicoba`}</p>
        {l.garis.map((_, i) => (
          <KartuKata key={i} tanda={HURUF[i]} baris={[barisGarisKartu(l, i)]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
        ))}
      </PapanKapur>
    );
  const x = 70;
  const y = 28;
  const s = 160;
  const ruas = ruasUntuk(l, x, y, s);
  const dasar: Gbr = { b: l.b, o: l.o, g: [] };
  return (
    <div className="space-y-2">
      <Gambar label="Bangun dengan garis calon" judul={judul}>
        <Bangun gb={dasar} rupa={rupa} x={x} y={y} s={s} />
        {ruas.map((r, i) =>
          r ? (
            <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Garis ${HURUF[i]}`}>
              <line x1={r.kiri[0]} y1={r.kiri[1]} x2={r.kanan[0]} y2={r.kanan[1]} stroke="transparent" strokeWidth={16} />
              <line x1={r.kiri[0]} y1={r.kiri[1]} x2={r.kanan[0]} y2={r.kanan[1]} stroke={dapat === i ? HIJAU : WARNA_GARIS[i]} strokeWidth={dapat === i ? 4 : 2.6} strokeLinecap="round" />
              <circle cx={r.chip[0]} cy={r.chip[1]} r={7.5} fill="#FFFFFF" stroke={dapat === i ? HIJAU : WARNA_GARIS[i]} strokeWidth={1.8} />
              <text x={r.chip[0]} y={r.chip[1] + 3} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                {HURUF[i]}
              </text>
            </g>
          ) : null,
        )}
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
      {klik ? (
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih garis">
          {l.garis.map((_, i) => (
            <Tombol key={i} teks={`Garis ${HURUF[i]}`} onClick={() => pilih(i)} mati={dapat !== null} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
/** Berbagi Adil dan Uji Cermin untuk jawaban suara: satu gambar dengan semua garisnya; Uji Cermin menampilkan bayangan. */
function GarisSuara({ l, rupa }: PK & { l: LAdil | LCermin }) {
  const cermin = l.tipe === "cermin";
  const gb = cermin ? gbrGaris(l, 0) : gbrSemua(l);
  if (rupa === "lambang") {
    return (
      <PapanKapur>
        {cermin ? <KartuKata judul="Cermin di garis ini" baris={[barisGarisKartu(l, 0)]} /> : <KartuKata judul="Benda dibagi adil" baris={barisKartu(gb).slice(0, 2)} />}
      </PapanKapur>
    );
  }
  return (
    <div className="space-y-2">
      <Gambar label={cermin ? "Bangun dengan cermin dan bayangan" : "Bangun yang dibagi"} judul={cermin ? "bayangan sisi pertama (ungu putus-putus)" : "hitung semua bagiannya"}>
        <Bangun gb={gb} rupa={rupa} x={75} y={26} s={150} tandaCermin={cermin} bayang={cermin} garis />
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Fraction Strips: Pita Pecahan ------------------------------ */
function Pita({ l, rupa, cara, diam, salah, siap }: PK & { l: LPita }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (l.potong[i] * 2 === l.n) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukPotong(l, i));
  };
  if (rupa === "lambang")
    return (
      <PapanKapur>
        <KartuKata judul="Pita utuh" baris={[`Panjang: ${l.n} kotak`]} />
        {cara === "klik" ? l.potong.map((p, i) => <KartuKata key={i} tanda={HURUF[i]} baris={[`Potongan: ${p} kotak`]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />) : null}
        {cara === "suara" ? <KartuKata judul="Dua potongan" baris={[`Potongan pertama: ${l.potong[0]} kotak`, `Potongan kedua: ${l.potong[1]} kotak`]} /> : null}
      </PapanKapur>
    );
  const cw = Math.min(17, Math.floor((264 / l.n) * 10) / 10);
  const x0 = r1((300 - l.n * cw) / 2);
  const isi = rupa === "benda" ? "#F9A8D4" : "#BFDBFE";
  const garis = rupa === "benda" ? "#BE185D" : "#1D4ED8";
  const strip = (id: string, y: number, n: number, tebal = false, tanda?: string, onTap?: () => void, hijau = false) => (
    <g key={id} {...(onTap ? ketuk(onTap) : {})} aria-label={tanda ? `Potongan ${tanda}` : "Pita utuh"}>
      {onTap ? <rect x={x0 - 14} y={y - 2} width={n * cw + 18} height={26} fill="transparent" /> : null}
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={r1(x0 + i * cw)} y={y} width={cw} height={22} fill={hijau ? "#BBF7D0" : isi} stroke={hijau ? HIJAU : garis} strokeWidth={tebal ? 1.8 : 1.3} />
      ))}
      {tanda ? (
        <g>
          <circle cx={x0 - 8} cy={y + 11} r={7} fill="#FEF3C7" stroke={UNGU} strokeWidth={1.2} />
          <text x={x0 - 8} y={y + 14} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU}>
            {tanda}
          </text>
        </g>
      ) : null}
    </g>
  );
  return (
    <div className="space-y-2">
      <Gambar label="Pita utuh dan potongannya" judul={klik ? "ketuk potongan yang setengah" : cara === "kanvas" ? "hitung kotak pada pita utuh" : "bandingkan dengan pita utuh"}>
        <text x={x0} y={30} fontSize={9} fontWeight={800} fill="#64748B">
          {rupa === "benda" ? "\u{1F380} pita utuh" : "pita utuh"}
        </text>
        {strip("utuh", 34, l.n, true)}
        {cara === "klik" ? l.potong.map((p, i) => strip(`p${i}`, 70 + i * 30, p, false, HURUF[i], () => pilih(i), dapat === i)) : null}
        {cara === "suara" ? (
          <>
            <text x={x0} y={78} fontSize={8.6} fontWeight={800} fill="#64748B">
              potongan pertama
            </text>
            {strip("a", 82, l.potong[0], true)}
            <text x={x0} y={122} fontSize={8.6} fontWeight={800} fill="#64748B">
              potongan kedua
            </text>
            {strip("b", 126, l.potong[1])}
          </>
        ) : null}
      </Gambar>
      {rupa === "benda" ? <p className="text-center text-xs font-bold text-[#92400E]">Pita kain berkotak-kotak, tiap kotak sama panjang.</p> : null}
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  if (l.tipe === "igil") return <Igil {...props} l={l} />;
  if (l.tipe === "pita") return <Pita {...props} l={l} />;
  return props.cara === "suara" ? <GarisSuara {...props} l={l} /> : <GarisCalon {...props} l={l} />;
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
export function LangkahSemangka({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const kataKunci = kunci?.jenis === "nama" ? kunci.nama : null;
  const pilihan = cara === "klik" ? pilihanKata(l) : kataKunci ? pilihanKataDari(kataKunci) : [];
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraSemangka kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
