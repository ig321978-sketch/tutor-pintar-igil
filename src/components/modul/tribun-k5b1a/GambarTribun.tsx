"use client";

import React from "react";
import { barisKartu, dasarDari, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { NAMA_KOLOM, angkaKolom, banyakAngka, banyakKolom, kolomDariAngka, kolomNol, tataTempat, TATA } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab A (tabel tempat):
 * Concrete = papan angka stadion dengan kartu tiket beremoji, Pictorial = tabel tempat polos di kertas tribun (garis dan angka, tanpa emoji),
 * Abstract = kartu kata dan angka bercap panitia (tanpa gambar). Kotak tempat DIGAMBAR dari bilangan lewat tataTempat (logika-data.ts): satu angka satu kolom.
 * Dipakai bersama oleh tugas CPA (LangkahTribun) dan Simulasi Tabel Tribun.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_TRIBUN = {
  benda: { latar: "#DBEAFE", garis: "#1D4ED8", angka: "#1E3A8A", sel: "#FEF9C3", selTepi: "#B45309", sorot: "#FDE68A", nol: "#FDBA74" },
  diagram: { latar: "#F1F5F9", garis: "#334155", angka: "#0F172A", sel: "#FFFFFF", selTepi: "#475569", sorot: "#E2E8F0", nol: "#CBD5E1" },
} as const;
export const warnaTribun = (rupa: Rupa) => (rupa === "benda" ? WARNA_TRIBUN.benda : WARNA_TRIBUN.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 140 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaTribun(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 30} y={0} width={30} height={5} fill={i % 2 === 0 ? "#1D4ED8" : "#FFFFFF"} />
          ))}
        </g>
      ) : null}
      <text x={150} y={17} textAnchor="middle" fontSize={13.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Nama kolom pada header papan dalam satu atau dua baris. */
const barisNama = (k: number): string[] => (k === 4 ? ["puluh", "ribuan"] : k === 5 ? ["ratusan", "ribu"] : [NAMA_KOLOM[k]]);

export type MenuHeader = "tampil" | "sembunyi";

/**
 * Papan tempat: `angka` dari kiri ke kanan (null = kotak kosong tanpa angka), `tanya` = kotak dari kiri yang berisi "?", `sorot` = kotak yang disorot.
 * `header` menampilkan nama kolom di atas kotak; `titik` memasang titik pemisah di antara ribuan dan ratusan.
 */
export function PapanTempat({
  angka,
  tanya = [],
  sorot = [],
  header = "tampil",
  titik = false,
  rupa,
  judul,
  label,
  satuan,
}: {
  angka: (number | null)[];
  tanya?: number[];
  sorot?: number[];
  header?: MenuHeader;
  titik?: boolean;
  rupa: Rupa;
  judul?: string;
  label?: string;
  satuan: string;
}) {
  const c = angka.length;
  const t = tataTempat(c, titik);
  const w = warnaTribun(rupa);
  const benda = rupa === "benda";
  return (
    <Gambar rupa={rupa} label={label ?? `${benda ? "Papan angka" : "Tabel tempat"} ${c} kolom`} judul={judul ?? (benda ? "papan angka stadion" : "tabel tempat")} tinggi={t.tinggi}>
      <g data-papan="tempat" data-kolom={c}>
        {t.sel.map((s, i) => {
          const a = angka[i];
          const ada = a !== null && a !== undefined;
          const tn = tanya.includes(i);
          const so = sorot.includes(i);
          return (
            <g key={i} data-kolom-ke={s.kolom} data-angka={ada ? a : tn ? "?" : ""}>
              {header === "tampil" ? (
                <g>
                  {barisNama(s.kolom).map((b, j, arr) => (
                    <text key={b} x={s.x + s.w / 2} y={t.yHeader + (arr.length === 1 ? 17 : 12 + j * 11)} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={w.angka}>
                      {b}
                    </text>
                  ))}
                </g>
              ) : null}
              <rect
                x={s.x + 2}
                y={t.ySel}
                width={s.w - 4}
                height={TATA.tinggiSel}
                rx={benda ? 7 : 3}
                fill={so ? w.sorot : ada || tn ? w.sel : "none"}
                stroke={so ? "#B45309" : w.selTepi}
                strokeWidth={so ? 3 : 1.8}
                strokeDasharray={ada || tn ? undefined : "4 3"}
                opacity={ada || tn ? 1 : 0.7}
              />
              {benda && (ada || tn) ? <line x1={s.x + 2} y1={t.ySel + 9} x2={s.x + s.w - 2} y2={t.ySel + 9} stroke={w.selTepi} strokeWidth={1} strokeDasharray="2 2" opacity={0.5} /> : null}
              {ada ? (
                <text x={s.x + s.w / 2} y={t.ySel + 33} textAnchor="middle" fontSize={25} fontWeight={900} fill={w.angka}>
                  {a}
                </text>
              ) : null}
              {tn ? (
                <text x={s.x + s.w / 2} y={t.ySel + 33} textAnchor="middle" fontSize={25} fontWeight={900} fill="#B45309">
                  ?
                </text>
              ) : null}
            </g>
          );
        })}
        {t.titikX !== null ? <circle cx={t.titikX} cy={t.ySel + TATA.tinggiSel - 6} r={3.6} fill="#B91C1C" data-titik="1" /> : null}
        <g>
          <rect x={8} y={t.yLegenda} width={284} height={22} rx={6} fill="#FFFFFF" stroke={w.garis} strokeWidth={1.6} strokeDasharray="4 3" />
          <text x={150} y={t.yLegenda + 16} textAnchor="middle" fontSize={13.5} fontWeight={900} fill={w.angka}>
            {benda ? `\u{1F3AB} satuan: ${satuan}` : `satuan: ${satuan}`}
          </text>
        </g>
      </g>
    </Gambar>
  );
}

/** Angka tiap kolom papan dari bilangan: lima kolom (atau enam), kolom di kiri angka pertama kosong (null). */
export const angkaPapan = (n: number): (number | null)[] => {
  const c = banyakKolom(n);
  return Array.from({ length: c }, (_, i) => (c - 1 - i < banyakAngka(n) ? angkaKolom(n, c - 1 - i) : null));
};
const kosongPapan = (n: number): (number | null)[] => Array.from({ length: banyakKolom(n) }, () => null);
/** Indeks dari kiri untuk kolom k. */
const dariKiri = (n: number, k: number): number => banyakKolom(n) - 1 - k;

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#D6A560] bg-[#FFFBEB] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#92400E]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#451A03]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(180,83,9,0.16) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#1D4ED8] px-1 text-[10px] font-black text-[#1D4ED8]" aria-hidden="true">
      PANITIA STADION
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "tempat angka",
  isi: "isi kolom",
  nol: "jaga nol",
  periode: "baca per periode",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  switch (d.tipe) {
    case "igil":
      return <PapanTempat angka={angkaPapan(d.n)} header="sembunyi" sorot={cara === "kanvas" ? [] : [dariKiri(d.n, kolomDariAngka(d.n, d.d))]} rupa={rupa} satuan={d.satuan} />;
    case "isi":
      return cara === "suara" ? (
        <PapanTempat angka={angkaPapan(d.n)} header="sembunyi" sorot={[dariKiri(d.n, d.k)]} rupa={rupa} satuan={d.satuan} />
      ) : (
        <PapanTempat angka={kosongPapan(d.n)} header="tampil" tanya={cara === "kanvas" ? [dariKiri(d.n, d.k)] : []} sorot={cara === "kanvas" ? [dariKiri(d.n, d.k)] : []} rupa={rupa} satuan={d.satuan} />
      );
    case "nol": {
      const nolDariKiri = kolomNol(d.n).map((k) => dariKiri(d.n, k));
      const disebut = angkaPapan(d.n).map((a, i) => (nolDariKiri.includes(i) ? null : a));
      return <PapanTempat angka={disebut} tanya={nolDariKiri} header={cara === "suara" ? "sembunyi" : "tampil"} rupa={rupa} satuan={d.satuan} />;
    }
    case "periode":
      return <PapanTempat angka={angkaPapan(d.n)} header="sembunyi" titik={!(cara === "klik" && d.mode === "titik")} rupa={rupa} satuan={d.satuan} />;
  }
}
