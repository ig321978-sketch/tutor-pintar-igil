"use client";

import React from "react";
import {
  hasilLarik,
  hasilSusunan,
  kalimatKali,
  penjumlahanBerulang,
  pendaratan,
  type Isi,
  type Klaim,
  type LangkahDasar,
  type Larik,
  type Rupa,
  type Susunan,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN } from "./periksa";
import { pusatIsi, pusatLarik, tataKotak, tataLarik, tataLompat } from "./tata";

/**
 * Gambar tugas Sub-Bab F Kelas 3 Bab 1 (dipakai tugas CPA dan Simulasi). Rupa benda (Concrete): benda beremoji di wadah toko. Rupa diagram (Pictorial): kotak polos berisi titik,
 * susunan titik, dan garis bilangan polos, tanpa emoji. Rupa lambang (Abstract): kartu tulisan saja (kalimat, angka, dan tanda), tanpa gambar.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const TITIK = "#2563EB";
const WARNA_TITIK = ["#2563EB", "#16A34A", "#DB2777", "#D97706", "#7C3AED", "#0891B2"];

/** Satu benda: emoji (Concrete) atau titik polos berwarna (Pictorial) berpusat di (cx, cy) berukuran s. */
export function Butir({ rupa, ikon, cx, cy, s, warna = TITIK }: { rupa: Rupa; ikon?: string; cx: number; cy: number; s: number; warna?: string }) {
  if (rupa === "benda")
    return (
      <text x={cx} y={cy + s * 0.3} textAnchor="middle" fontSize={s * 0.8}>
        {ikon ?? "\u{1F95A}"}
      </text>
    );
  return <circle cx={cx} cy={cy} r={s * 0.36} fill={warna} stroke={UNGU} strokeWidth={0.8} />;
}

const bentukWadah = (wadah: string, rupa: Rupa): { fill: string; stroke: string; rx: number } =>
  rupa !== "benda" ? { fill: "#F1F5F9", stroke: "#334155", rx: 4 } : wadah === "piring" ? { fill: "#FFFFFF", stroke: "#94A3B8", rx: 14 } : wadah === "keranjang" ? { fill: "#FDE68A", stroke: "#B45309", rx: 8 } : { fill: "#FEF3C7", stroke: "#A97B3F", rx: 4 };

/**
 * Kotak-kotak berisi benda. `banyak`: isi tiap kotak (boleh berbeda). `sorot`: indeks kotak yang diberi bingkai merah. `judul`: tulisan kecil di atas gambar.
 * Wadah piring, keranjang, atau kotak hanya mengubah rupa wadah pada Concrete; Pictorial selalu kotak polos berisi titik.
 */
export function KotakIsi({ banyak, rupa, isi, sorot = [], judul, lebar = 292, tinggi = 140, tanda }: { banyak: number[]; rupa: Rupa; isi: Isi; sorot?: number[]; judul?: string; lebar?: number; tinggi?: number; tanda?: Record<number, string> }) {
  const t = tataKotak(banyak.length, Math.max(1, ...banyak), lebar, tinggi);
  const bt = bentukWadah(isi.wadah, rupa);
  const ox = (LEBAR_ADEGAN - lebar) / 2;
  const oy = judul ? 28 : 14 + (180 - tinggi) / 2 - 7;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`${banyak.length} ${isi.wadah} berisi ${isi.benda}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={rupa === "benda" ? "#FFF7ED" : "#F0FDF4"} stroke={rupa === "benda" ? "#B45309" : "#0F766E"} strokeWidth={2} />
      {judul ? (
        <text x={150} y={20} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
          {judul}
        </text>
      ) : null}
      {banyak.map((n, i) => {
        const k = t.kotak[i];
        const x = ox + k.x;
        const y = oy + k.y;
        return (
          <g key={i}>
            <rect x={x} y={y} width={t.bw} height={t.bh} rx={bt.rx} fill={bt.fill} stroke={sorot.includes(i) ? MERAH : bt.stroke} strokeWidth={sorot.includes(i) ? 3 : 1.6} />
            {Array.from({ length: n }, (_, j) => {
              const [cx, cy] = pusatIsi(t, x, y, j);
              return <Butir key={j} rupa={rupa} ikon={isi.ikon} cx={cx} cy={cy} s={t.cs} warna={WARNA_TITIK[i % WARNA_TITIK.length]} />;
            })}
            {tanda?.[i] ? (
              <text x={x + t.bw / 2} y={y - 3} textAnchor="middle" fontSize={9} fontWeight={900} fill={MERAH}>
                {tanda[i]}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Susunan baris dan kolom. `sorot`: deret yang ditandai (baris ke-i atau kolom ke-i). `putar`: tampilkan panah putar. `ikon`: emoji benda (Concrete).
 */
export function LarikGambar({ la, rupa, sorot, putar = false, lebar = 270, tinggi = 150 }: { la: Larik; rupa: Rupa; sorot?: { tipe: "baris" | "kolom"; i: number }; putar?: boolean; lebar?: number; tinggi?: number }) {
  const t = tataLarik(la.r, la.c, lebar, tinggi);
  const ox = (LEBAR_ADEGAN - lebar) / 2;
  const oy = 20 + (170 - tinggi) / 2;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Susunan ${la.r} baris ${la.c} kolom ${la.benda}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={rupa === "benda" ? "#FFF7ED" : "#F0FDF4"} stroke={rupa === "benda" ? "#B45309" : "#0F766E"} strokeWidth={2} />
      {sorot ? (
        sorot.tipe === "baris" ? (
          <rect x={ox + t.x0 - 3} y={oy + t.y0 + sorot.i * t.cs} width={la.c * t.cs + 6} height={t.cs} rx={5} fill="#FEF08A" stroke="#CA8A04" strokeWidth={1.6} />
        ) : (
          <rect x={ox + t.x0 + sorot.i * t.cs} y={oy + t.y0 - 3} width={t.cs} height={la.r * t.cs + 6} rx={5} fill="#FEF08A" stroke="#CA8A04" strokeWidth={1.6} />
        )
      ) : null}
      {Array.from({ length: la.r }, (_, i) =>
        Array.from({ length: la.c }, (_, j) => {
          const [cx, cy] = pusatLarik(t, i, j);
          return <Butir key={`${i}-${j}`} rupa={rupa} ikon={la.ikon} cx={ox + cx} cy={oy + cy} s={t.cs} warna={WARNA_TITIK[i % WARNA_TITIK.length]} />;
        }),
      )}
      {putar ? (
        <g aria-hidden="true">
          <path d="M268 30 A14 14 0 1 1 254 22" fill="none" stroke={MERAH} strokeWidth={2.4} strokeLinecap="round" />
          <polygon points="250,16 260,20 252,29" fill={MERAH} />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Garis bilangan lompatan sama besar dari nol: n busur sebesar m. `tanya`: hasil menyembunyikan titik terakhir ("?"), banyak menampilkan semua bilangan,
 * besar menyembunyikan titik antara. Concrete: katak beremoji di titik nol. Pictorial: penanda segitiga polos.
 */
export function LompatGambar({ m, n, rupa, tanya }: { m: number; n: number; rupa: Rupa; tanya: "hasil" | "banyak" | "besar" }) {
  const t = tataLompat(m, n);
  const y = 130;
  const nilai = pendaratan(m, n);
  const label = (i: number): string => (tanya === "hasil" ? (i === n ? "?" : String(nilai[i])) : tanya === "banyak" ? String(nilai[i]) : i === 0 || i === n ? String(nilai[i]) : "");
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} role="img" aria-label={`Garis bilangan dengan ${n} busur lompatan`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill={rupa === "benda" ? "#FFF7ED" : "#F0FDF4"} stroke={rupa === "benda" ? "#B45309" : "#0F766E"} strokeWidth={2} />
      <line x1={t.kiri - 8} y1={y} x2={t.kanan + 8} y2={y} stroke={UNGU} strokeWidth={2.4} />
      {t.x.map((x, i) => (
        <g key={i}>
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={UNGU} strokeWidth={1.8} />
          <text x={x} y={y + 20} textAnchor="middle" fontSize={10} fontWeight={900} fill={label(i) === "?" ? MERAH : UNGU}>
            {label(i)}
          </text>
          {i < n ? <path d={`M${x} ${y - 2} Q${(x + t.x[i + 1]) / 2} ${y - 52} ${t.x[i + 1]} ${y - 2}`} fill="none" stroke={MERAH} strokeWidth={2} strokeLinecap="round" /> : null}
        </g>
      ))}
      {rupa === "benda" ? (
        <text x={t.x[0]} y={y - 12} textAnchor="middle" fontSize={20}>
          {"\u{1F438}"}
        </text>
      ) : (
        <polygon points={`${t.x[0] - 6},${y - 16} ${t.x[0] + 6},${y - 16} ${t.x[0]},${y - 6}`} fill={MERAH} stroke={UNGU} strokeWidth={0.8} />
      )}
    </svg>
  );
}

/** Kartu tulisan (Abstract): beberapa baris kalimat atau angka di papan struk, tanpa gambar. `sorot`: teks yang diberi latar kuning. */
export function KartuStruk({ baris, sorot, besar = false }: { baris: string[]; sorot?: string; besar?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-md border-2 border-dashed border-[#475569] bg-white px-3 py-4 text-center font-mono" role="img" aria-label={baris.join(". ")}>
      {baris.map((b, i) => (
        <p key={i} className={`${besar ? "text-3xl" : "text-lg"} font-black leading-snug text-[#1C01A5]`}>
          {sorot && b.includes(sorot) ? (
            <>
              {b.split(sorot)[0]}
              <span className="rounded bg-[#FEF08A] px-1 ring-2 ring-[#CA8A04]">{sorot}</span>
              {b.split(sorot).slice(1).join(sorot)}
            </>
          ) : (
            b
          )}
        </p>
      ))}
    </div>
  );
}

/** Kalimat susunan untuk kartu (digit boleh tampil di layar). */
export const kalimatSusunan = (su: Susunan): string[] => [`${su.g} ${su.wadah}`, `tiap ${su.wadah} berisi ${su.s} ${su.benda}`];

/** Pilihan satu susunan kecil (tugas memilih susunan yang isinya sama). */
export function PilihanKotak({ banyak, isi, rupa }: { banyak: number[]; isi: Isi; rupa: Rupa }) {
  const t = tataKotak(banyak.length, Math.max(1, ...banyak), 150, 44);
  const bt = bentukWadah(isi.wadah, rupa);
  return (
    <svg viewBox="0 0 150 54" className="block h-auto w-full" aria-hidden="true">
      {banyak.map((n, i) => {
        const x = t.kotak[i].x;
        const y = t.kotak[i].y + 5;
        return (
          <g key={i}>
            <rect x={x} y={y} width={t.bw} height={t.bh} rx={bt.rx} fill={bt.fill} stroke={bt.stroke} strokeWidth={1.2} />
            {Array.from({ length: n }, (_, j) => {
              const [cx, cy] = pusatIsi(t, x, y, j);
              return <Butir key={j} rupa={rupa} ikon={isi.ikon} cx={cx} cy={cy} s={t.cs} warna={WARNA_TITIK[i % WARNA_TITIK.length]} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Banyak isi tiap kotak untuk gambar `Susunan`. */
export const banyakIsi = (su: Susunan): number[] => Array.from({ length: su.g }, () => su.s);

/** Gambar satu klaim tokoh (Cari kesalahan). */
export function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "lompat") return rupa === "lambang" ? <KartuStruk baris={[`${k.n} lompatan sebesar ${k.m}`, `mulai dari 0`]} /> : <LompatGambar m={k.m} n={k.n} rupa={rupa} tanya="banyak" />;
  const su = k.su;
  if (rupa === "lambang")
    return k.jenis === "peran" ? <KartuStruk baris={[kalimatKali(su), `= ${hasilSusunan(su)}`]} besar /> : <KartuStruk baris={kalimatSusunan(su)} />;
  return <KotakIsi banyak={banyakIsi(su)} rupa={rupa} isi={su} />;
}

/** Penjumlahan berulang untuk kartu: `s` ditulis `g` kali. */
export const teksBerulang = (su: Susunan): string => penjumlahanBerulang(su.s, su.g);

/** Gambar dasar tugas menurut jenis dan rupa (tugas kegiatan: Urut langkah dan Pilih sama punya gambar sendiri di komponen Langkah). */
export function GambarTugas({ l, rupa, cara }: { l: LangkahDasar; rupa: Rupa; cara: "klik" | "kanvas" | "suara" }) {
  switch (l.tipe) {
    case "jumlah":
      return rupa === "lambang" ? <KartuStruk baris={kalimatSusunan(l.su)} /> : <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} />;
    case "bilangan":
      return rupa === "lambang" ? <KartuStruk baris={[teksBerulang(l.su)]} /> : <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} />;
    case "tulis":
      return rupa === "lambang" ? <KartuStruk baris={kalimatSusunan(l.su)} /> : <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} />;
    case "ulang":
      return rupa === "lambang" ? <KartuStruk baris={cara === "kanvas" ? [teksBerulang(l.su)] : kalimatSusunan(l.su)} /> : <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} />;
    case "cara":
      return rupa === "lambang" ? <KartuStruk baris={[teksBerulang(l.su), `= ${hasilSusunan(l.su)}`, `${l.su.g} ? ${l.su.s}`]} /> : <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} judul={`${teksBerulang(l.su)} = ${hasilSusunan(l.su)}`} />;
    case "peran":
      return rupa === "lambang" ? (
        <KartuStruk baris={[kalimatKali(l.su)]} sorot={String(l.bilangan === "g" ? l.su.g : l.su.s)} besar />
      ) : (
        <KotakIsi banyak={banyakIsi(l.su)} rupa={rupa} isi={l.su} judul={`${kalimatKali(l.su)}: bilangan ${l.bilangan === "g" ? l.su.g : l.su.s} ditandai`} />
      );
    case "sama":
      return rupa === "lambang" ? <KartuStruk baris={[`isi tiap ${l.isi.wadah}:`, l.banyak.join(", ")]} /> : <KotakIsi banyak={l.banyak} rupa={rupa} isi={l.isi} />;
    case "baris":
      return rupa === "lambang" ? <KartuStruk baris={[`${l.la.r} baris`, `tiap baris ${l.la.c} ${l.la.benda}`]} /> : <LarikGambar la={l.la} rupa={rupa} sorot={l.tanya === "baris" ? { tipe: "baris", i: 0 } : l.tanya === "kolom" ? { tipe: "kolom", i: 0 } : undefined} />;
    case "putar":
      return rupa === "lambang" ? <KartuStruk baris={[`${l.la.r} baris`, `tiap baris ${l.la.c} ${l.la.benda}`, "diputar seperempat putaran"]} /> : <LarikGambar la={l.la} rupa={rupa} putar />;
    case "deret":
      return <LarikGambar la={l.la} rupa={rupa} sorot={l.arah === "mendatar" ? { tipe: "baris", i: 0 } : { tipe: "kolom", i: 0 }} />;
    case "lompat":
      return rupa === "lambang" ? (
        <KartuStruk
          baris={
            l.tanya === "hasil"
              ? [pendaratan(l.m, l.n).slice(0, l.n).join(" → ") + " → ?"]
              : l.tanya === "banyak"
                ? [pendaratan(l.m, l.n).join(" → ")]
                : [`${l.n} lompatan sama besar`, `0 → ? → ${l.m * l.n}`]
          }
        />
      ) : (
        <LompatGambar m={l.m} n={l.n} rupa={rupa} tanya={l.tanya} />
      );
    default:
      return null;
  }
}

export { hasilLarik };
