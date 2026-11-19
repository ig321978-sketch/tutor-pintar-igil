"use client";

import React from "react";
import { barisKartu, dasarDari, indeksTempat, kolomTeks, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { ZONA, pusatZona, susunBalok } from "./balok";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab E (penjumlahan bilangan sampai 1.000):
 * Concrete = balok cacah berwarna di meja resepsi beremoji benda penginapan (kotak seratus, batang sepuluh, butir satu, sebanyak angkanya, tanpa angka),
 * Pictorial = balok cacah polos dengan bagan tempat angka (angka di bawah tiap zona), Abstract = bilangan bersusun ke bawah pada kartu lambang.
 * Dipakai bersama oleh tugas CPA (LangkahResepsi) dan Simulasi Meja Resepsi. Gambar balok SUNGGUH sebanyak angkanya (balok.ts).
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const X0 = 46;

/** Emoji benda penginapan untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  koper: "\u{1F9F3}",
  tiket: "\u{1F3AB}",
  lentera: "\u{1F3EE}",
  kelapa: "\u{1F965}",
  kerang: "\u{1F41A}",
  keranjang: "\u{1F9FA}",
  payung: "\u{1F302}",
  sandal: "\u{1F461}",
  kamar: "\u{1F6CF}",
  lonceng: "\u{1F6CE}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
};

export function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Warna balok: berwarna di Concrete, polos di Pictorial. */
const WARNA = {
  benda: { r: ["#FBCFE8", "#BE185D"], p: ["#BAE6FD", "#0369A1"], s: ["#FEF08A", "#A16207"] },
  diagram: { r: ["#FFFFFF", "#334155"], p: ["#FFFFFF", "#334155"], s: ["#FFFFFF", "#334155"] },
} as const;

/** Satu bilangan sebagai balok cacah pada baris dengan pojok kiri-atas (X0, y). */
export function BarisBalok({ n, y, diagram }: { n: number; y: number; diagram: boolean }) {
  const b = susunBalok(n, X0, y);
  const w = diagram ? WARNA.diagram : WARNA.benda;
  return (
    <g aria-hidden="true">
      {b.ratusan.map((q, i) => (
        <rect key={`r${i}`} data-balok="ratusan" x={q.x} y={q.y} width={q.w} height={q.h} rx={1.5} fill={w.r[0]} stroke={w.r[1]} strokeWidth={1.4} />
      ))}
      {b.puluhan.map((q, i) => (
        <rect key={`p${i}`} data-balok="puluhan" x={q.x} y={q.y} width={q.w} height={q.h} rx={1.5} fill={w.p[0]} stroke={w.p[1]} strokeWidth={1.4} />
      ))}
      {b.satuan.map((q, i) => (
        <circle key={`s${i}`} data-balok="satuan" cx={q.cx} cy={q.cy} r={q.r} fill={w.s[0]} stroke={w.s[1]} strokeWidth={1.3} />
      ))}
    </g>
  );
}

/* ------------------------------ Panel balok: dua bilangan dan hasil ------------------------------ */
type Baris = { nama: string; n: number };
function PanelBalok({ rupa, benda, baris, sorot = -1, judul, hasil }: { rupa: Rupa; benda: string; baris: Baris[]; sorot?: number; judul: string; hasil: string }) {
  const diagram = rupa === "diagram";
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F9F3}";
  const yBaris = (i: number): number => 40 + i * 52;
  const yHasil = 40 + baris.length * 52;
  return (
    <Gambar label={`Balok cacah: ${judul}`} judul={judul}>
      <rect x={4} y={20} width={292} height={176} rx={8} fill={diagram ? "#ECFEFF" : "#DCFCE7"} stroke={diagram ? "#0E7490" : "#166534"} strokeWidth={2.4} />
      {ZONA.map((z) => (
        <text key={z.nama} x={X0 + z.mulai + z.lebar / 2} y={32} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={diagram ? "#0E7490" : "#166534"}>
          {z.nama}
        </text>
      ))}
      {sorot >= 0 ? (
        <rect x={X0 + ZONA[2 - sorot].mulai - 5} y={35} width={ZONA[2 - sorot].lebar + 6} height={yHasil - 35 + 38} rx={6} fill="none" stroke="#DC2626" strokeWidth={2.2} strokeDasharray="5 3" data-sorot={ZONA[2 - sorot].nama} />
      ) : null}
      {baris.map((b, i) => (
        <g key={b.nama}>
          {rupa === "benda" ? (
            <text x={22} y={yBaris(i) + 16} textAnchor="middle" fontSize={17} aria-hidden="true">
              {emoji}
            </text>
          ) : null}
          <text x={22} y={yBaris(i) + (rupa === "benda" ? 29 : 18)} textAnchor="middle" fontSize={7.5} fontWeight={900} fill={UNGU}>
            {b.nama}
          </text>
          <BarisBalok n={b.n} y={yBaris(i)} diagram={diagram} />
          {diagram
            ? [2, 1, 0].map((k) => (
                <text key={k} x={pusatZona(X0, k as 0 | 1 | 2)} y={yBaris(i) + 42} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0E7490">
                  {Math.floor(b.n / 10 ** k) % 10}
                </text>
              ))
            : null}
          {i === 0 && baris.length > 1 ? (
            <text x={22} y={yBaris(i) + 52 - 2} textAnchor="middle" fontSize={14} fontWeight={900} fill={UNGU}>
              +
            </text>
          ) : null}
        </g>
      ))}
      <line x1={X0 - 6} y1={yHasil - 4} x2={X0 + 214} y2={yHasil - 4} stroke={UNGU} strokeWidth={2} />
      <text x={22} y={yHasil + 14} textAnchor="middle" fontSize={7.5} fontWeight={900} fill="#B91C1C">
        {hasil}
      </text>
      {ZONA.map((z) => (
        <rect key={z.nama} x={X0 + z.mulai + z.lebar / 2 - 14} y={yHasil + 2} width={28} height={22} rx={4} fill="#FFFFFF" stroke="#B91C1C" strokeWidth={1.6} strokeDasharray="3 2" />
      ))}
      {ZONA.map((z) => (
        <text key={`q${z.nama}`} x={X0 + z.mulai + z.lebar / 2} y={yHasil + 18} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B91C1C">
          ?
        </text>
      ))}
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris, kolom }: { judul?: string; baris: string[]; kolom?: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#86EFAC] bg-[#F0FDF4] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#166534]">{judul}</span> : null}
      {kolom ? (
        <pre className="my-1 w-fit rounded-md bg-white px-3 py-1 font-mono text-2xl font-black leading-tight text-[#14532D]" data-uji="kolom">
          {kolom.join("\n")}
        </pre>
      ) : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#14532D]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#15803D] bg-[#ECFDF5] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(21,128,61,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  jumlah: "menjumlahkan bersusun",
  simpan: "menyimpan",
  tempat: "tambah per tempat",
  genap: "genapkan dulu",
};

/** Baris balok yang digambar tiap tugas: dua bilangan (dan nama barisnya). */
export const barisBalokTugas = (d: LangkahDasar): Baris[] => [
  { nama: "pertama", n: d.a },
  { nama: "kedua", n: d.b },
];
/** Zona yang disorot pada gambar: tempat yang dijumlahkan (Place Add) atau satuan (menyimpan); -1 bila tidak ada. */
export const sorotTugas = (d: LangkahDasar): number => (d.tipe === "tempat" ? indeksTempat(d.tempat) : d.tipe === "simpan" ? 0 : -1);

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} kolom={kolomTeks(d)} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  const judul = rupa === "benda" ? `${JUDUL_KARTU[d.tipe]}: ${d.benda}` : JUDUL_KARTU[d.tipe];
  return <PanelBalok rupa={rupa} benda={d.benda} baris={barisBalokTugas(d)} sorot={sorotTugas(d)} judul={judul} hasil={d.tipe === "genap" ? "jumlah" : "hasil"} />;
}

