"use client";

import React from "react";
import { banyakKe, barisKartu, barisLima, dasarDari, deretKe, teksBeda, titikBaris, titikLima, urutan, type Cara, type Langkah, type LangkahDasar, type Pola, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 3 Sub-Bab A (pola gambar: deret berselisih tetap, tabel selisih, susunan per lima):
 * Concrete = angklung dan benda panggung beremoji di rak kayu, Pictorial = titik dan kotak polos di kertas pola, Abstract = kartu kata dan angka.
 * Titik tiap deret dan susunan per lima dihitung dari logika murni (titikBaris, barisLima, titikLima), jadi gambar sungguh sebanyak datanya.
 * Dipakai bersama oleh tugas CPA (LangkahAngklung) dan Simulasi Panggung Deret.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda panggung untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_PANGGUNG: Record<string, string> = { angklung: "\u{1F3B6}", nada: "\u{1F3B5}", lonceng: "\u{1F514}", drum: "\u{1F941}", piano: "\u{1F3B9}", mik: "\u{1F3A4}" };
const SIMBOL_BENDA = [EMOJI_PANGGUNG.nada, EMOJI_PANGGUNG.lonceng, EMOJI_PANGGUNG.drum, EMOJI_PANGGUNG.piano, EMOJI_PANGGUNG.mik, EMOJI_PANGGUNG.angklung];
/** Benda yang dipakai satu pola (tetap untuk pola yang sama). */
export const simbolBenda = (p: Pola): string => SIMBOL_BENDA[(p.a + Math.abs(p.d)) % SIMBOL_BENDA.length];
export type Bentuk = "titik" | "kotak" | "batang";

export const WARNA_ANGKLUNG = {
  benda: { latar: "#FEF3E2", garis: "#92400E", isi: "#FFFBEB", aksen: "#F59E0B", rak: "#B7814A", angka: "#451A03" },
  diagram: { latar: "#EFF6FF", garis: "#1D4ED8", isi: "#DBEAFE", aksen: "#3B82F6", rak: "#93C5FD", angka: "#1E3A8A" },
} as const;
export const warnaAngklung = (rupa: Rupa) => (rupa === "benda" ? WARNA_ANGKLUNG.benda : WARNA_ANGKLUNG.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={warnaAngklung(rupa).latar} />
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={warnaAngklung(rupa).angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Satu benda atau bentuk di titik (x, y). Concrete = emoji benda panggung, Pictorial = titik, kotak, atau batang polos. */
function Butir({ x, y, langkah, rupa, simbol, bentuk }: { x: number; y: number; langkah: number; rupa: Rupa; simbol: string; bentuk: Bentuk }) {
  const w = warnaAngklung(rupa);
  if (rupa === "benda")
    return (
      <text x={x} y={y + Math.min(langkah * 0.3, 7)} textAnchor="middle" fontSize={Math.min(langkah * 0.95, 20)} data-butir="1" aria-hidden="true">
        {simbol}
      </text>
    );
  if (bentuk === "kotak") {
    const s = Math.min(langkah * 0.72, 13);
    return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={1.5} fill={w.aksen} stroke={w.garis} strokeWidth={1.2} data-butir="1" />;
  }
  if (bentuk === "batang") {
    const s = Math.min(langkah * 0.4, 6);
    return <rect x={x - s / 2} y={y - 9} width={s} height={18} rx={1} fill={w.aksen} stroke={w.garis} strokeWidth={1.1} data-butir="1" />;
  }
  return <circle cx={x} cy={y} r={Math.min(langkah * 0.36, 7)} fill={w.aksen} stroke={w.garis} strokeWidth={1.2} data-butir="1" />;
}

/** Satu baris deret: `n` benda berjarak sama di atas rak. `kosong` menandai deret yang belum ada (kotak putus-putus dengan tanda tanya). */
export function BarisDeret({ y, n, rupa, simbol, bentuk, label, kosong = false, x0 = 60, lebar = 232 }: { y: number; n: number; rupa: Rupa; simbol: string; bentuk: Bentuk; label: string; kosong?: boolean; x0?: number; lebar?: number }) {
  const w = warnaAngklung(rupa);
  const titik = titikBaris(n, x0, lebar, 26);
  return (
    <g data-deret={label}>
      <text x={6} y={y + 3} fontSize={9} fontWeight={900} fill={w.angka}>
        {label}
      </text>
      {kosong ? (
        <g>
          <rect x={x0} y={y - 13} width={lebar} height={26} rx={5} fill="none" stroke={w.garis} strokeWidth={1.4} strokeDasharray="5 3" />
          <text x={x0 + lebar / 2} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
            ?
          </text>
        </g>
      ) : (
        <g>
          <rect x={x0 - 4} y={y + 11} width={lebar + 8} height={rupa === "benda" ? 5 : 2.4} rx={1.5} fill={w.rak} stroke={rupa === "benda" ? "#6B4423" : "none"} strokeWidth={0.8} />
          {titik.map((t, i) => (
            <Butir key={i} x={t.x} y={y} langkah={t.langkah} rupa={rupa} simbol={simbol} bentuk={bentuk} />
          ))}
        </g>
      )}
    </g>
  );
}

/** Susunan per lima: tiap baris berisi lima benda, baris terakhir boleh kurang. Baris penuh diberi bingkai. */
export function SusunLima({ n, rupa, simbol, bentuk, x0 = 70, y0 = 56, dx = 40, dy = 38 }: { n: number; rupa: Rupa; simbol: string; bentuk: Bentuk; x0?: number; y0?: number; dx?: number; dy?: number }) {
  const w = warnaAngklung(rupa);
  const baris = barisLima(n);
  return (
    <g data-susun="lima">
      {baris.map((isi, b) => (
        <rect key={b} x={x0 - 18} y={y0 + b * dy - 16} width={dx * 4 + 36} height={32} rx={6} fill={isi === 5 ? w.isi : "none"} stroke={w.garis} strokeWidth={isi === 5 ? 1.6 : 1.2} strokeDasharray={isi === 5 ? undefined : "5 3"} data-baris={isi} />
      ))}
      {titikLima(n, x0, y0, dx, dy).map((t, i) => (
        <Butir key={i} x={t.x} y={t.y} langkah={dx} rupa={rupa} simbol={simbol} bentuk={bentuk} />
      ))}
    </g>
  );
}

/** Tabel selisih: kolom deret ke-1 sampai ke-`kolom`, baris banyaknya, dan baris selisih di antara kolom. `tersembunyi`: kolom yang banyaknya ditutup tanda tanya. `selisih`: tampilkan atau tutup selisihnya. */
export function TabelSelisih({ p, rupa, kolom, tampil, selisih, simbol, teksSel }: { p: Pola; rupa: Rupa; kolom: number; tampil: number; selisih: boolean; simbol: string; teksSel?: string }) {
  const w = warnaAngklung(rupa);
  const lebarSel = Math.min(72, 230 / kolom);
  const x0 = 62;
  const nilai = deretKe(p, kolom);
  return (
    <g data-tabel="selisih">
      <rect x={x0 - 4} y={34} width={lebarSel * kolom + 8} height={112} rx={6} fill={w.isi} stroke={w.garis} strokeWidth={1.8} />
      <text x={6} y={62} fontSize={9} fontWeight={900} fill={w.angka}>
        deret ke
      </text>
      <text x={6} y={96} fontSize={9} fontWeight={900} fill={w.angka}>
        {rupa === "benda" ? `banyak ${simbol}` : "banyak"}
      </text>
      <text x={6} y={130} fontSize={9} fontWeight={900} fill={w.angka}>
        selisih
      </text>
      <line x1={x0 - 4} y1={72} x2={x0 + lebarSel * kolom + 4} y2={72} stroke={w.garis} strokeWidth={1} />
      <line x1={x0 - 4} y1={108} x2={x0 + lebarSel * kolom + 4} y2={108} stroke={w.garis} strokeWidth={1} />
      {nilai.map((v, i) => {
        const cx = x0 + lebarSel * (i + 0.5);
        return (
          <g key={i}>
            <text x={cx} y={58} textAnchor="middle" fontSize={13} fontWeight={900} fill={w.garis}>
              {i + 1}
            </text>
            <text x={cx} y={95} textAnchor="middle" fontSize={i < tampil ? 16 : 18} fontWeight={900} fill={i < tampil ? w.angka : "#DC2626"} data-sel={i < tampil ? "isi" : "tanya"}>
              {i < tampil ? v : "?"}
            </text>
          </g>
        );
      })}
      {nilai.slice(1).map((_, i) => {
        const cx = x0 + lebarSel * (i + 1);
        const ada = selisih && i + 1 < tampil;
        return (
          <g key={i}>
            <text x={cx} y={130} textAnchor="middle" fontSize={13} fontWeight={900} fill={ada && teksSel !== "?" ? "#15803D" : "#DC2626"} data-sel={ada ? "selisih" : "tanya"}>
              {ada ? (teksSel ?? teksBeda(p.d)) : i + 1 < tampil ? "?" : ""}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#86EFAC] bg-[#F0FDF4] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#166534]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#14532D]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#15803D] bg-[#DCFCE7] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(22,101,52,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  jenis: "jenis pola deret",
  gambar: "melanjutkan deret",
  tabel: "tabel selisih",
  lima: "susunan per lima",
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
  const benda = rupa === "benda";
  const simbol = simbolBenda(d.p);
  switch (d.tipe) {
    case "jenis": {
      const [a, b, c] = deretKe(d.p, 3);
      return (
        <Gambar rupa={rupa} label="Tiga deret disusun berurutan" judul={benda ? "tiga deret di rak" : "tiga deret"}>
          <BarisDeret y={54} n={a} rupa={rupa} simbol={simbol} bentuk="titik" label="deret 1" />
          <BarisDeret y={100} n={b} rupa={rupa} simbol={simbol} bentuk="titik" label="deret 2" />
          <BarisDeret y={146} n={c} rupa={rupa} simbol={simbol} bentuk="titik" label="deret 3" />
          <text x={150} y={190} textAnchor="middle" fontSize={10} fontWeight={900} fill={warnaAngklung(rupa).garis}>
            banyaknya tiap deret berubah teratur
          </text>
        </Gambar>
      );
    }
    case "gambar": {
      const [a, b, c] = deretKe(d.p, 3);
      return (
        <Gambar rupa={rupa} label="Tiga deret, deret keempat belum ada" judul={benda ? "deret di rak" : "deret berurutan"}>
          <BarisDeret y={40} n={a} rupa={rupa} simbol={simbol} bentuk="kotak" label="deret 1" />
          <BarisDeret y={80} n={b} rupa={rupa} simbol={simbol} bentuk="kotak" label="deret 2" />
          <BarisDeret y={120} n={c} rupa={rupa} simbol={simbol} bentuk="kotak" label="deret 3" />
          <BarisDeret y={160} n={0} rupa={rupa} simbol={simbol} bentuk="kotak" label="deret 4" kosong />
        </Gambar>
      );
    }
    case "tabel": {
      const kolom = cara === "kanvas" ? 5 : 3;
      return (
        <Gambar rupa={rupa} label="Tabel banyak tiap deret dan selisihnya" judul={benda ? "papan tabel selisih" : "tabel selisih"}>
          <TabelSelisih p={d.p} rupa={rupa} kolom={kolom} tampil={3} selisih={cara !== "klik"} simbol={simbol} />
          <text x={150} y={176} textAnchor="middle" fontSize={10} fontWeight={900} fill={warnaAngklung(rupa).garis}>
            tanda tanya = belum diketahui
          </text>
        </Gambar>
      );
    }
    case "lima": {
      const n = banyakKe(d.p, d.k);
      return (
        <Gambar rupa={rupa} label={`Deret ${urutan(d.k)} disusun per lima`} judul={`deret ${d.k} disusun per lima`}>
          <SusunLima n={n} rupa={rupa} simbol={simbol} bentuk="titik" />
          <text x={150} y={192} textAnchor="middle" fontSize={10} fontWeight={900} fill={warnaAngklung(rupa).garis}>
            baris penuh berisi lima
          </text>
        </Gambar>
      );
    }
  }
}
