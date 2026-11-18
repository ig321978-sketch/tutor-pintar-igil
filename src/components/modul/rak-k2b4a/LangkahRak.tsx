"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  BENTUK_BENDA,
  EMOJI_BENDA,
  dasarDari,
  kata,
  kalimatKunci,
  kalimatPetunjuk,
  kalimatTanya,
  kunciJawab,
  namaBenda,
  petakHarta,
  petakSimon,
  petunjukBendaSekat,
  petunjukPetakPeta,
  petunjukPetakSimon,
  petunjukSalah,
  pilihanKata,
  pilihanKataDari,
  siapLangsung,
  type Adegan,
  type Cara,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type LPeta,
  type LSekat,
  type LSimon,
  type LAcuan,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, pusatBenda, pusatPetak, pusatPeta, tataPapan, tataPeta } from "./periksa";
import { JawabSuaraRak, PilihanKata, teksKunci } from "./JawabRak";

/**
 * Satu tugas CPA Kelas 2 Bab 4 Sub-Bab A: papan benda (Metode IGIL Acuan, Kata, Kalimat), perintah Simon (mengetuk kotak kosong), peta harta (mengetuk kotak harta),
 * dan Permainan Sekat (mengetuk benda yang cocok dengan dua petunjuk), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab menurut
 * caranya (pilih kata posisi, tulis satu angka di kanvas, atau ucapkan). Rupa: karya beremoji di rak kayu (Concrete), bangun polos berwarna di petak (Pictorial),
 * kartu kata saja (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
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
/** Dua baris untuk nama pada kartu kata: dipecah di spasi pertama. */
const duaBaris = (nama: string): string[] => {
  const i = nama.indexOf(" ");
  return i < 0 ? [nama] : [nama.slice(0, i), nama.slice(i + 1)];
};
/* ------------------------------ Benda di papan ------------------------------ */
/** Satu benda berpusat (x, y): karya beremoji (Concrete), bangun polos berwarna (Pictorial), atau kartu kata (Abstract). */
function IsiBenda({ rupa, k, x, y, lebar, belakang = false }: { rupa: Rupa; k: number; x: number; y: number; lebar: number; belakang?: boolean }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + 8} textAnchor="middle" fontSize={belakang ? 21 : 25}>
        {EMOJI_BENDA[k]}
      </text>
    );
  if (rupa === "diagram") {
    const b = BENTUK_BENDA[k];
    const garis = { stroke: UNGU, strokeWidth: 1.8, strokeLinejoin: "round" as const };
    if (b.bentuk === "lingkaran") return <circle cx={x} cy={y} r={13} fill={b.warna} {...garis} />;
    if (b.bentuk === "persegi") return <rect x={x - 12} y={y - 12} width={24} height={24} rx={2} fill={b.warna} {...garis} />;
    return <polygon points={`${x},${y - 14} ${x + 14},${y + 11} ${x - 14},${y + 11}`} fill={b.warna} {...garis} />;
  }
  const baris = duaBaris(namaBenda("lambang", k));
  const w = Math.max(34, lebar - 8);
  return (
    <g>
      <rect x={x - w / 2} y={y - 15} width={w} height={30} rx={4} fill="#F8FAFC" stroke="#475569" strokeWidth={1.6} />
      {baris.map((b, i) => (
        <text key={b} x={x} y={baris.length === 1 ? y + 2.5 : y - 2 + i * 8.5} textAnchor="middle" fontSize={baris.some((q) => q.length > 8) ? 6 : 6.8} fontWeight={800} fill="#1E293B">
          {b}
        </text>
      ))}
    </g>
  );
}

type PapanProps = {
  ad: Adegan;
  rupa: Rupa;
  /** Benda yang tidak digambar di papan (ada di baki). */
  sembunyi?: number;
  /** Petak yang diisi anak (Simon): benda yang disembunyikan digambar di sini. */
  isiSel?: [number, number] | null;
  tapSel?: (kol: number, bar: number) => void;
  tapBenda?: (i: number) => void;
  /** Warna cincin penanda benda (nomor benda ke warna). */
  cincin?: Record<number, string>;
  benar?: number[];
  tandaPanah?: number;
};
function Papan({ ad, rupa, sembunyi, isiSel, tapSel, tapBenda, cincin = {}, benar = [], tandaPanah }: PapanProps) {
  const t = tataPapan(ad);
  const urut = ad.isi.map((_, i) => i).sort((p, q) => (ad.isi[q].dep ?? 0) - (ad.isi[p].dep ?? 0));
  const petak: [number, number][] = [];
  for (let b = 0; b < ad.bar; b += 1) for (let c = 0; c < ad.kol; c += 1) petak.push([c, b]);
  const terisi = (c: number, b: number) => ad.isi.some((x, i) => i !== sembunyi && x.kol === c && x.bar === b);
  return (
    <g>
      {rupa === "benda" ? (
        <g aria-hidden="true">
          <rect x={t.x0 - 6} y={t.y0 - 6} width={ad.kol * t.sx + 12} height={ad.bar * t.sy + 12} rx={8} fill="#F8DDB0" stroke={COKLAT} strokeWidth={3} />
          {Array.from({ length: ad.bar }, (_, b) => (
            <rect key={b} x={t.x0 - 6} y={t.y0 + (b + 1) * t.sy - 7} width={ad.kol * t.sx + 12} height={6} fill="#A16207" stroke={COKLAT} strokeWidth={1} />
          ))}
        </g>
      ) : (
        petak.map(([c, b]) => (
          <rect key={`${c}${b}`} x={t.x0 + c * t.sx + 1} y={t.y0 + b * t.sy + 1} width={t.sx - 2} height={t.sy - 2} rx={3} fill={rupa === "diagram" ? "#FFFFFF" : "#475569"} stroke={rupa === "diagram" ? "#60A5FA" : "#CBD5E1"} strokeWidth={1.2} aria-hidden="true" />
        ))
      )}
      {tapSel
        ? petak.map(([c, b]) => {
            const kosong = !terisi(c, b) && !(isiSel && isiSel[0] === c && isiSel[1] === b);
            const p = pusatPetak(ad, c, b);
            return (
              <g key={`s${c}${b}`} {...ketuk(() => tapSel(c, b))} aria-label={`kotak kolom ${c + 1} baris ${b + 1}${kosong ? " kosong" : ""}`}>
                <rect x={t.x0 + c * t.sx + 3} y={t.y0 + b * t.sy + 3} width={t.sx - 6} height={t.sy - 6} rx={5} fill="rgba(250,204,21,0.12)" stroke={kosong ? "#B45309" : "transparent"} strokeWidth={1.6} strokeDasharray="5 3" />
                {kosong ? (
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={11} fill="#B45309" fontWeight={900}>
                    ?
                  </text>
                ) : null}
              </g>
            );
          })
        : null}
      {urut.map((i) => {
        if (i === sembunyi) return null;
        const b = ad.isi[i];
        const p = pusatBenda(ad, i);
        const ring = cincin[i];
        const betul = benar.includes(i);
        return (
          <g key={i} {...(tapBenda ? ketuk(() => tapBenda(i)) : {})} aria-label={namaBenda(rupa, b.k)}>
            {tapBenda ? <rect x={p.x - 20} y={p.y - 20} width={40} height={40} fill="transparent" /> : null}
            <IsiBenda rupa={rupa} k={b.k} x={p.x} y={p.y} lebar={t.sx} belakang={(b.dep ?? 0) === 1} />
            {ring || betul ? <circle cx={p.x} cy={p.y} r={21} fill="none" stroke={betul ? HIJAU : ring} strokeWidth={3} strokeDasharray={betul ? undefined : "5 3"} /> : null}
            {tandaPanah === i ? (
              <g aria-hidden="true">
                <polygon points={`${p.x},${p.y - 22} ${p.x - 6},${p.y - 32} ${p.x + 6},${p.y - 32}`} fill={MERAH} stroke="#7F1D1D" strokeWidth={1} />
              </g>
            ) : null}
          </g>
        );
      })}
      {isiSel && sembunyi !== undefined ? (
        <g aria-hidden="true">
          <IsiBenda rupa={rupa} k={ad.isi[sembunyi].k} x={pusatPetak(ad, isiSel[0], isiSel[1]).x} y={pusatPetak(ad, isiSel[0], isiSel[1]).y} lebar={t.sx} />
          <circle cx={pusatPetak(ad, isiSel[0], isiSel[1]).x} cy={pusatPetak(ad, isiSel[0], isiSel[1]).y} r={21} fill="none" stroke={HIJAU} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
}
/** Keterangan nama benda (Concrete): deretan emoji dan nama di bawah gambar. */
function Keterangan({ ad, rupa, sembunyi }: { ad: Adegan; rupa: Rupa; sembunyi?: number }) {
  if (rupa !== "benda") return null;
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Nama benda di rak">
      {ad.isi.map((b, i) => (
        <li key={i} className={`rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E] ${i === sembunyi ? "ring-2 ring-[#15803D]" : ""}`}>
          <span aria-hidden="true">{EMOJI_BENDA[b.k]}</span> {namaBenda(rupa, b.k)}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Metode IGIL: Acuan, Kata, Kalimat ------------------------------ */
function Acuan({ l, rupa, cara }: PK & { l: LAcuan }) {
  const cincin: Record<number, string> = cara === "kanvas" ? { [l.t]: "#2563EB" } : { [l.t]: "#2563EB", [l.a]: MERAH };
  return (
    <div className="space-y-2">
      <Gambar label="Papan benda" judul={cara === "kanvas" ? "hitung dari kiri" : "lihat benda dan acuannya"}>
        <Papan ad={l.ad} rupa={rupa} cincin={cincin} />
      </Gambar>
      <Keterangan ad={l.ad} rupa={rupa} />
      {cara !== "kanvas" ? (
        <p className="text-center text-xs font-bold text-[#1C01A5]/80">
          Lingkar biru: {l.tanya === "a" ? "benda yang ditanyakan" : "benda yang diceritakan"}. Lingkar merah: benda acuan.
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------ Simon Says: Simon Berkata ------------------------------ */
function Simon({ l, rupa, cara, diam, salah, siap }: PK & { l: LSimon }) {
  const klik = cara === "klik" && !diam;
  const [isi, setIsi] = useState<[number, number] | null>(null);
  const sah = petakSimon(l);
  const tapSel = (c: number, b: number) => {
    if (!klik || isi) return;
    if (sah.some(([x, y]) => x === c && y === b)) {
      setIsi([c, b]);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukPetakSimon(l, c, b, rupa));
  };
  const cincin: Record<number, string> = cara === "kanvas" ? { [l.a]: MERAH } : klik ? { [l.a]: MERAH } : { [l.a]: MERAH, [l.t]: "#2563EB" };
  const judul = klik ? "ketuk kotak kosong yang tepat" : cara === "kanvas" ? "hitung perintah Simon" : "perintah Simon";
  return (
    <div className="space-y-2">
      {klik ? (
        <div className="mx-auto flex max-w-[420px] items-center justify-center gap-2 rounded-2xl border-4 border-[#2563EB] bg-[#DBEAFE] px-2 py-1 text-sm font-black text-[#1C01A5]" aria-label="Baki">
          <span>Baki:</span>
          <svg viewBox="0 0 40 36" className="h-9 w-10" aria-hidden="true">
            {isi ? null : <IsiBenda rupa={rupa} k={l.ad.isi[l.t].k} x={20} y={17} lebar={44} />}
          </svg>
          <span>{isi ? "sudah ditaruh" : namaBenda(rupa, l.ad.isi[l.t].k)}</span>
        </div>
      ) : null}
      <Gambar label="Papan perintah Simon" judul={judul}>
        <Papan ad={l.ad} rupa={rupa} sembunyi={klik ? l.t : undefined} isiSel={isi} tapSel={klik ? tapSel : undefined} cincin={cincin} />
      </Gambar>
      <Keterangan ad={l.ad} rupa={rupa} sembunyi={klik ? l.t : undefined} />
    </div>
  );
}

/* ------------------------------ Treasure Map: Peta Harta Karun ------------------------------ */
function Bintang({ x, y, r }: { x: number; y: number; r: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (-90 + i * 36) * (Math.PI / 180);
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill="#FACC15" stroke="#92400E" strokeWidth={1.4} strokeLinejoin="round" />;
}
function Peta({ l, rupa, cara, diam, salah, siap }: PK & { l: LPeta }) {
  const klik = cara === "klik" && !diam;
  const [ketemu, setKetemu] = useState(false);
  const t = tataPeta(l.kol, l.bar);
  const [hx, hy] = petakHarta(l);
  const tampilHarta = ketemu || cara === "suara";
  const tapSel = (c: number, b: number) => {
    if (!klik || ketemu) return;
    if (c === hx && b === hy) {
      setKetemu(true);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukPetakPeta(l, c, b));
  };
  const cells: [number, number][] = [];
  for (let b = 0; b < l.bar; b += 1) for (let c = 0; c < l.kol; c += 1) cells.push([c, b]);
  const sp = pusatPeta(l.kol, l.bar, l.mulai[0], l.mulai[1]);
  const hp = pusatPeta(l.kol, l.bar, hx, hy);
  const fill = rupa === "benda" ? "#FEF3C7" : rupa === "diagram" ? "#FFFFFF" : "#475569";
  const stroke = rupa === "benda" ? "#B45309" : rupa === "diagram" ? "#60A5FA" : "#CBD5E1";
  return (
    <Gambar label="Peta kotak" judul={klik ? "ketuk kotak tempat harta" : cara === "kanvas" ? "baris dari atas, kolom dari kiri" : "bintang dan harta"}>
      {Array.from({ length: l.kol }, (_, c) => (
        <text key={`k${c}`} x={pusatPeta(l.kol, l.bar, c, 0).x} y={t.y0 - 5} textAnchor="middle" fontSize={7.4} fontWeight={800} fill="#64748B">
          {c + 1}
        </text>
      ))}
      {Array.from({ length: l.bar }, (_, b) => (
        <text key={`b${b}`} x={t.x0 - 7} y={pusatPeta(l.kol, l.bar, 0, b).y + 2.6} textAnchor="middle" fontSize={7.4} fontWeight={800} fill="#64748B">
          {b + 1}
        </text>
      ))}
      {cells.map(([c, b]) => (
        <g key={`${c}${b}`} {...(klik ? ketuk(() => tapSel(c, b)) : {})} aria-label={`kotak kolom ${c + 1} baris ${b + 1}`}>
          <rect x={t.x0 + c * t.s + 1} y={t.y0 + b * t.s + 1} width={t.s - 2} height={t.s - 2} rx={3} fill={ketemu && c === hx && b === hy ? "#DCFCE7" : fill} stroke={ketemu && c === hx && b === hy ? HIJAU : stroke} strokeWidth={ketemu && c === hx && b === hy ? 3 : 1.4} />
        </g>
      ))}
      {rupa === "benda" ? (
        <text x={sp.x} y={sp.y + 7} textAnchor="middle" fontSize={20}>
          {"\u{2B50}"}
        </text>
      ) : rupa === "diagram" ? (
        <Bintang x={sp.x} y={sp.y} r={t.s * 0.36} />
      ) : (
        <text x={sp.x} y={sp.y + 2.6} textAnchor="middle" fontSize={6.8} fontWeight={900} fill="#FDE047">
          bintang
        </text>
      )}
      {tampilHarta ? (
        rupa === "benda" ? (
          <text x={hp.x} y={hp.y + 7} textAnchor="middle" fontSize={19}>
            {"\u{1F4B0}"}
          </text>
        ) : rupa === "diagram" ? (
          <g>
            <circle cx={hp.x} cy={hp.y} r={t.s * 0.3} fill="#F59E0B" stroke="#92400E" strokeWidth={1.6} />
            <circle cx={hp.x} cy={hp.y} r={t.s * 0.15} fill="none" stroke="#92400E" strokeWidth={1.4} />
          </g>
        ) : (
          <text x={hp.x} y={hp.y + 2.6} textAnchor="middle" fontSize={7} fontWeight={900} fill="#FDE047">
            harta
          </text>
        )
      ) : null}
    </Gambar>
  );
}

/* ------------------------------ Barrier Game: Permainan Sekat ------------------------------ */
function Sekat({ l, rupa, cara, diam, salah, siap }: PK & { l: LSekat }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const p1 = kalimatPetunjuk(l.petunjuk[0], rupa, l.ad);
  const p2 = kalimatPetunjuk(l.petunjuk[1], rupa, l.ad);
  const ketukBenda = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === l.sasaran) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukBendaSekat(l, i, rupa));
  };
  return (
    <div className="space-y-2">
      <div className="mx-auto flex max-w-[420px] flex-col gap-1 rounded-2xl border-4 border-[#2563EB] bg-[#EFF6FF] p-2 text-sm font-black text-[#1C01A5]">
        <p>
          <span className="mr-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-xs text-white">1</span>
          Benda {p1}
        </p>
        {cara === "klik" ? (
          <p>
            <span className="mr-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-xs text-white">2</span>
            Benda {p2}
          </p>
        ) : cara === "suara" ? (
          <p className="text-[#64748B]">
            <span className="mr-1 rounded-full bg-[#94A3B8] px-2 py-0.5 text-xs text-white">2</span>
            Petunjuk kedua tertutup sekat.
          </p>
        ) : null}
      </div>
      <Gambar label="Papan Permainan Sekat" judul={klik ? "ketuk benda yang cocok dengan kedua petunjuk" : cara === "kanvas" ? "hitung petunjuk pertama" : "benda bertanda panah"}>
        <Papan ad={l.ad} rupa={rupa} tapBenda={klik ? ketukBenda : undefined} benar={dapat !== null ? [dapat] : []} tandaPanah={cara === "suara" && !diam ? l.sasaran : undefined} />
      </Gambar>
      <Keterangan ad={l.ad} rupa={rupa} />
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  return l.tipe === "acuan" ? <Acuan {...props} l={l} /> : l.tipe === "simon" ? <Simon {...props} l={l} /> : l.tipe === "peta" ? <Peta {...props} l={l} /> : <Sekat {...props} l={l} />;
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
export function LangkahRak({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Soal memilih kata (klik), semua soal kanvas, dan semua soal suara langsung siap dijawab, apa pun rupanya. */
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
            <JawabSuaraRak kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
