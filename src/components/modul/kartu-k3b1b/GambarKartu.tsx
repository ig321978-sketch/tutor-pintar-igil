"use client";

import React from "react";
import { BOBOT, NAMA_TEMPAT, WARNA_TEMPAT, WARNA_TULIS, angkaTiga, type Tempat } from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN } from "./periksa";

/**
 * Gambar tugas dan simulasi Kelas 3 Bab 1 Sub-Bab B (tempat angka).
 * Benda (Concrete): meja label Bu Wati, label harga dengan benda beremoji dan tumpukan kartu angka (hijau seratus, biru sepuluh, merah satu).
 * Diagram (Pictorial): tabel tiga tempat dengan balok polos (lempeng, batang, kotak kecil), tanpa emoji.
 * Lambang (Abstract): tabel kata dengan angka dan kata saja.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const BIRU = "#1C01A5";
const MERAH = "#DC2626";
export const KOLOM = [95, 173, 251] as const;
const SEMUA: Tempat[] = [0, 1, 2];
const NAMA_JUDUL = ["Ratusan", "Puluhan", "Satuan"] as const;
const NILAI_KARTU = ["100", "10", "1"] as const;

export type OpsiPapan = {
  /** Bilangan tiga angka. */
  n: number;
  rupa: "benda" | "diagram";
  /** Benda beremoji pada label (hanya Concrete). */
  ik?: string;
  /** Tempat yang ditandai (kolom kuning dan tanda tanya). */
  sorot?: Tempat | null;
  /** Semua angka disembunyikan (tanda tanya), hanya tumpukan yang tampak. */
  sembunyi?: boolean;
  /** Angka yang dilingkari di tiap tempat yang memuatnya. */
  ring?: number | null;
  /** Tempat yang kosong (tanda tanya pada angkanya dan wadah kosong pada tumpukannya). */
  kosong?: Tempat | null;
  /** Satu baris tulisan di bawah (mis. bentuk uraian). */
  baris?: string;
  /** Banyak kartu atau balok tiap tempat bila berbeda dari angka bilangan. */
  banyak?: [number, number, number];
};

/* ------------------------------ Balok dan kartu ------------------------------ */
function Kartu({ cx, jumlah, tempat }: { cx: number; jumlah: number; tempat: Tempat }) {
  if (jumlah === 0)
    return (
      <rect x={cx - 24} y={152} width={48} height={22} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1.6} strokeDasharray="4 3" />
    );
  return (
    <g>
      {Array.from({ length: jumlah }, (_, i) => {
        const y = 176 - 22 - i * 6;
        const atas = i === jumlah - 1;
        return (
          <g key={i}>
            <rect x={cx - 24} y={y} width={48} height={22} rx={4} fill={WARNA_TEMPAT[tempat]} stroke={BIRU} strokeWidth={1.2} />
            {atas ? (
              <text x={cx} y={y + 15} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFFFFF">
                {NILAI_KARTU[tempat]}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
function Balok({ cx, jumlah, tempat }: { cx: number; jumlah: number; tempat: Tempat }) {
  const warna = WARNA_TEMPAT[tempat];
  if (jumlah === 0) return <rect x={cx - 22} y={130} width={44} height={30} rx={4} fill="none" stroke="#94A3B8" strokeWidth={1.6} strokeDasharray="4 3" />;
  if (tempat === 0) {
    // Lempeng: persegi besar, tiga tiap baris.
    const s = 13;
    const g = 2;
    const lebar = Math.min(3, jumlah) * (s + g) - g;
    return (
      <g>
        {Array.from({ length: jumlah }, (_, i) => (
          <rect key={i} x={cx - lebar / 2 + (i % 3) * (s + g)} y={108 + Math.floor(i / 3) * (s + g)} width={s} height={s} fill={warna} stroke={BIRU} strokeWidth={0.9} />
        ))}
      </g>
    );
  }
  if (tempat === 1) {
    // Batang: balok tegak berdampingan.
    const w = 5;
    const g = 2.5;
    const lebar = jumlah * (w + g) - g;
    return (
      <g>
        {Array.from({ length: jumlah }, (_, i) => (
          <rect key={i} x={cx - lebar / 2 + i * (w + g)} y={108} width={w} height={62} fill={warna} stroke={BIRU} strokeWidth={0.9} />
        ))}
      </g>
    );
  }
  const s = 9;
  const g = 2.5;
  const lebar = Math.min(3, jumlah) * (s + g) - g;
  return (
    <g>
      {Array.from({ length: jumlah }, (_, i) => (
        <rect key={i} x={cx - lebar / 2 + (i % 3) * (s + g)} y={118 + Math.floor(i / 3) * (s + g)} width={s} height={s} fill={warna} stroke={BIRU} strokeWidth={0.9} />
      ))}
    </g>
  );
}

/* ------------------------------ Papan: label dengan tiga tempat ------------------------------ */
export function PapanSvg({ n, rupa, ik, sorot = null, sembunyi = false, ring = null, kosong = null, baris, banyak }: OpsiPapan) {
  const benda = rupa === "benda";
  const d = banyak ?? angkaTiga(n);
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={benda ? "Label harga dan kartu angka di meja Bu Wati" : "Tabel tiga tempat dan balok"}>
      <defs>
        <pattern id="kk-kanopi" width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#B91C1C" />
          <rect x="6" width="6" height="6" fill="#FFF7ED" />
        </pattern>
        <pattern id="kk-papan" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0V14" fill="none" stroke="#86EFAC" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : "#F0FDF4"} stroke={benda ? "#B91C1C" : "#166534"} strokeWidth={2} />
      {benda ? <rect x={4} y={4} width={292} height={6} fill="url(#kk-kanopi)" /> : <rect x={3} y={3} width={294} height={194} rx={7} fill="url(#kk-papan)" />}
      <text x={150} y={25} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
        {benda ? "Label di Meja Bu Wati" : "Tabel Tiga Tempat"}
      </text>
      {benda && ik ? (
        <text x={26} y={74} textAnchor="middle" fontSize={26}>
          {ik}
        </text>
      ) : null}
      {SEMUA.map((t) => {
        const cx = KOLOM[t];
        const kosongIni = kosong === t;
        const tampil = sembunyi || kosongIni ? "?" : String(d[t]);
        const dilingkari = ring !== null && !sembunyi && d[t] === ring;
        const kolomSorot = sorot === t;
        return (
          <g key={t}>
            <rect x={cx - 35} y={32} width={70} height={16} rx={4} fill={WARNA_TEMPAT[t]} stroke={BIRU} strokeWidth={1.2} />
            <text x={cx} y={43.5} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#FFFFFF">
              {NAMA_JUDUL[t]}
            </text>
            <rect x={cx - 35} y={52} width={70} height={40} rx={6} fill={kolomSorot || dilingkari ? "#FEF08A" : "#FFFFFF"} stroke={dilingkari ? MERAH : WARNA_TEMPAT[t]} strokeWidth={dilingkari ? 3.4 : 2.6} strokeDasharray={dilingkari ? "5 3" : undefined} />
            <text x={cx} y={83} textAnchor="middle" fontSize={30} fontWeight={900} fill={tampil === "?" ? "#94A3B8" : WARNA_TULIS[t]}>
              {tampil}
            </text>
            {kolomSorot ? (
              <g>
                <circle cx={cx + 31} cy={56} r={7} fill={MERAH} />
                <text x={cx + 31} y={59.4} textAnchor="middle" fontSize={10} fontWeight={900} fill="#FFFFFF">
                  ?
                </text>
              </g>
            ) : null}
            {benda ? <Kartu cx={cx} jumlah={kosongIni ? 0 : d[t]} tempat={t} /> : <Balok cx={cx} jumlah={kosongIni ? 0 : d[t]} tempat={t} />}
          </g>
        );
      })}
      {baris ? (
        <text x={150} y={193} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
          {baris}
        </text>
      ) : null}
    </svg>
  );
}

/** Dua label berdampingan (tugas sama atau berbeda): tiga angka tiap label, tanpa tumpukan. */
export function DuaLabel({ a, b, rupa }: { a: number; b: number; rupa: "benda" | "diagram" }) {
  const benda = rupa === "benda";
  const ikon = benda ? ["\u{1F34E}", "\u{1F96B}"] : ["", ""];
  const grup = (n: number, x0: number, ik: string) => (
    <g>
      {benda ? (
        <text x={x0 + 60} y={66} textAnchor="middle" fontSize={22}>
          {ik}
        </text>
      ) : null}
      {SEMUA.map((t) => {
        const cx = x0 + 20 + t * 40;
        return (
          <g key={t}>
            <rect x={cx - 18} y={78} width={36} height={13} rx={3} fill={WARNA_TEMPAT[t]} stroke={BIRU} strokeWidth={1} />
            <text x={cx} y={88} textAnchor="middle" fontSize={7} fontWeight={900} fill="#FFFFFF">
              {NAMA_JUDUL[t]}
            </text>
            <rect x={cx - 18} y={94} width={36} height={40} rx={5} fill="#FFFFFF" stroke={WARNA_TEMPAT[t]} strokeWidth={2.4} />
            <text x={cx} y={125} textAnchor="middle" fontSize={28} fontWeight={900} fill={WARNA_TULIS[t]}>
              {angkaTiga(n)[t]}
            </text>
          </g>
        );
      })}
    </g>
  );
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label="Dua label dengan angka yang sama">
      <rect x={2} y={2} width={296} height={196} rx={8} fill={benda ? "#FFF7ED" : "#F0FDF4"} stroke={benda ? "#B91C1C" : "#166534"} strokeWidth={2} />
      {benda ? <rect x={4} y={4} width={292} height={6} fill="url(#kk-kanopi)" /> : null}
      <text x={150} y={25} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
        Dua Label
      </text>
      {grup(a, 14, ikon[0])}
      {grup(b, 166, ikon[1])}
      <text x={150} y={118} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
        ?
      </text>
    </svg>
  );
}

/* ------------------------------ HTML: tabel mini dan tabel kata ------------------------------ */
/** Tabel tiga tempat berisi tiga isian (angka atau jumlah), dipakai untuk pilihan tabel dan klaim tokoh. */
export function Tabel3({ isi, judul }: { isi: readonly [number, number, number]; judul?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-[#1C01A5] bg-white" role="img" aria-label={judul ?? "Tabel tiga tempat"}>
      <div className="grid grid-cols-3">
        {SEMUA.map((t) => (
          <div key={t} className="px-1 py-0.5 text-center text-[10px] font-black text-white" style={{ background: WARNA_TEMPAT[t] }}>
            {NAMA_JUDUL[t]}
          </div>
        ))}
        {SEMUA.map((t) => (
          <div key={`s${t}`} className="border-t border-slate-300 px-1 py-1 text-center text-xl font-black" style={{ color: WARNA_TULIS[t] }}>
            {isi[t]}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Tabel kata (Abstract): judul, tiga tempat dengan angka, dan satu baris tulisan, tanpa gambar benda atau balok.
 * `sembunyi`: angka diganti tanda tanya (bilangan disusun dari kata), `banyak`: banyaknya tiap tempat.
 */
export function TabelKata({ n, sorot = null, sembunyi = false, ring = null, kosong = null, baris, banyak, kata }: Omit<OpsiPapan, "rupa" | "ik"> & { kata?: boolean }) {
  const d = banyak ?? angkaTiga(n);
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#7C3AED] bg-[#FAF5FF] p-2" role="img" aria-label="Tabel kata tiga tempat">
      <p className="mb-1 text-center text-sm font-black text-[#4C1D95]">{kata ? "Banyaknya tiap tempat" : "Tabel Tiga Tempat"}</p>
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {SEMUA.map((t) => (
          <div key={t} className="rounded-t-lg py-0.5 text-xs font-black text-white" style={{ background: WARNA_TEMPAT[t] }}>
            {kata ? `${NAMA_TEMPAT[t]}` : NAMA_JUDUL[t]}
          </div>
        ))}
        {SEMUA.map((t) => {
          const kosongIni = kosong === t;
          const tampil = sembunyi || kosongIni ? "?" : String(d[t]);
          const lingkar = ring !== null && !sembunyi && d[t] === ring;
          return (
            <div
              key={`s${t}`}
              className={`relative rounded-b-lg border-4 bg-white py-1 text-3xl font-black ${lingkar ? "border-dashed bg-[#FEF9C3]" : ""} ${sorot === t ? "bg-[#FEF08A]" : ""}`}
              style={{ borderColor: lingkar ? MERAH : WARNA_TEMPAT[t], color: tampil === "?" ? "#94A3B8" : WARNA_TULIS[t] }}
            >
              {tampil}
              {sorot === t ? <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[11px] font-black text-white">?</span> : null}
            </div>
          );
        })}
      </div>
      {baris ? <p className="mt-1 text-center text-base font-black text-[#1C01A5]">{baris}</p> : null}
    </div>
  );
}

/** Dua label dalam tabel kata (Abstract). */
export function DuaTabelKata({ a, b }: { a: number; b: number }) {
  return (
    <div className="mx-auto grid w-full max-w-[420px] grid-cols-2 gap-2" role="img" aria-label="Dua label dengan angka yang sama">
      {[a, b].map((n, i) => (
        <div key={i} className="rounded-xl border-4 border-dashed border-[#7C3AED] bg-[#FAF5FF] p-1.5">
          <p className="mb-1 text-center text-xs font-black text-[#4C1D95]">Label {i + 1}</p>
          <Tabel3 isi={angkaTiga(n)} />
        </div>
      ))}
    </div>
  );
}

/** Bentuk uraian dengan satu bagian bertanda tanya: "n = ?00 + 30 + 8" (t = tempat yang hilang). */
export function teksIsi(n: number, t: Tempat): string {
  const d = angkaTiga(n);
  const bagian = SEMUA.map((x) => (x === t ? `?${"0".repeat(Math.max(0, String(BOBOT[x]).length - 1))}` : String(d[x] * BOBOT[x])));
  return `${n} = ${bagian.join(" + ")}`;
}
