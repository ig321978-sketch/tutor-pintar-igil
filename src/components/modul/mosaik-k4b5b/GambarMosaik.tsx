"use client";

import React from "react";
import {
  BANGUN,
  SUSUNAN,
  bagianTugas,
  barisKartu,
  bidangTugas,
  dasarDari,
  judulKartu,
  kepingKecil,
  panjang,
  panjangSisi,
  type Bidang,
  type Cara,
  type Langkah,
  type LangkahDasar,
  type Rupa,
  type Titik,
} from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi": keping keramik berwarna (Concrete), diagram polos bertanda sisi sama dan sudut siku-siku (Pictorial),
 * serta kartu kata dan angka (Abstract). Semua bangun digambar dari koordinat titik sudut (tidak ada gambar tempelan), sehingga banyak sisi, sudut siku-siku, sisi sejajar,
 * dan banyak segitiga pada gambar sama dengan hasil hitungan. Tanpa skor dan tanpa jaringan.
 */

type RupaGambar = "benda" | "diagram";
const WARNA = {
  benda: { garis: "#92400E", latar: "#FEF3C7", isi: "#FDBA74", tebal: "#78350F" },
  diagram: { garis: "#1D4ED8", latar: "#DBEAFE", isi: "#FFFFFF", tebal: "#1E3A8A" },
} as const;
/** Warna keping keramik (Concrete): tiap keping satu warna, berganti-ganti. */
export const WARNA_KEPING = ["#F97316", "#FACC15", "#22C55E", "#38BDF8", "#A78BFA", "#F472B6", "#FB7185", "#34D399", "#60A5FA"];

const LEBAR = 300;
const TINGGI = 150;
/** Skala dan geser supaya gabungan bidang muat di kotak gambar (bidang dipusatkan). */
export function muatkan(bidang: Bidang[], lebar = LEBAR - 40, tinggi = TINGGI - 30): (t: Titik) => Titik {
  const semua = bidang.flat();
  const xs = semua.map((t) => t[0]);
  const ys = semua.map((t) => t[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const w = Math.max(...xs) - x0 || 1;
  const h = Math.max(...ys) - y0 || 1;
  const s = Math.min(lebar / w, tinggi / h);
  const dx = (LEBAR - w * s) / 2 - x0 * s;
  const dy = (TINGGI - h * s) / 2 - y0 * s;
  return (t) => [t[0] * s + dx, t[1] * s + dy];
}
const poligon = (p: Bidang, f: (t: Titik) => Titik): string => p.map((t) => f(t).join(",")).join(" ");

/** Tanda sisi sama panjang: garis kecil di tengah sisi (satu garis untuk golongan pertama, dua untuk kedua, dst.). Hanya golongan yang punya paling sedikit dua sisi. */
export function tandaSisi(p: Bidang): { a: Titik; b: Titik }[] {
  const pj = panjangSisi(p);
  const golongan: number[][] = [];
  pj.forEach((x, i) => {
    const g = golongan.find((k) => Math.abs(pj[k[0]] - x) < 1e-6 * Math.max(1, x));
    if (g) g.push(i);
    else golongan.push([i]);
  });
  const hasil: { a: Titik; b: Titik }[] = [];
  golongan
    .filter((k) => k.length >= 2)
    .forEach((k, gi) => {
      for (const i of k) {
        const a = p[i];
        const b = p[(i + 1) % p.length];
        const m: Titik = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const L = panjang(a, b);
        const u: Titik = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
        for (let g = 0; g <= gi; g += 1) {
          const o = (g - gi / 2) * 0.35;
          const c: Titik = [m[0] + u[0] * o, m[1] + u[1] * o];
          hasil.push({ a: [c[0] - u[1] * 0.22, c[1] + u[0] * 0.22], b: [c[0] + u[1] * 0.22, c[1] - u[0] * 0.22] });
        }
      }
    });
  return hasil;
}
/** Kotak kecil pada tiap sudut siku-siku (di dalam bangun). */
export function tandaSiku(p: Bidang, k = 0.35): Bidang[] {
  const hasil: Bidang[] = [];
  p.forEach((a, i) => {
    const b = p[(i + 1) % p.length];
    const z = p[(i + p.length - 1) % p.length];
    const u: Titik = [b[0] - a[0], b[1] - a[1]];
    const v: Titik = [z[0] - a[0], z[1] - a[1]];
    if (Math.abs(u[0] * v[0] + u[1] * v[1]) < 1e-6 * Math.max(1, Math.hypot(...u) * Math.hypot(...v))) {
      const lu = Math.hypot(...u);
      const lv = Math.hypot(...v);
      const pu: Titik = [(u[0] / lu) * k, (u[1] / lu) * k];
      const pv: Titik = [(v[0] / lv) * k, (v[1] / lv) * k];
      hasil.push([a, [a[0] + pu[0], a[1] + pu[1]], [a[0] + pu[0] + pv[0], a[1] + pu[1] + pv[1]], [a[0] + pv[0], a[1] + pv[1]]]);
    }
  });
  return hasil;
}

/* ------------------------------ Bangun dan belahannya ------------------------------ */
/** Satu bangun digambar dari koordinat. `bagian`: segitiga hasil belahan (tiap segitiga satu warna pada Concrete). `tanda`: tanda sisi sama dan sudut siku-siku (Pictorial). */
export function BangunSvg({ bidang, bagian = [], rupa, tanda = false, label }: { bidang: Bidang; bagian?: Bidang[]; rupa: RupaGambar; tanda?: boolean; label?: string }) {
  const w = WARNA[rupa];
  const f = muatkan([bidang]);
  const skala = Math.abs(f([1, 0])[0] - f([0, 0])[0]);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={label ?? `bangun datar dengan ${bidang.length} sisi`} data-sisi={bidang.length} data-bagian={bagian.length}>
      <rect x={3} y={2} width={LEBAR - 6} height={TINGGI - 4} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.5} />
      <polygon points={poligon(bidang, f)} fill={w.isi} stroke={w.garis} strokeWidth={2.6} strokeLinejoin="round" />
      {bagian.map((b, i) => (
        <polygon key={i} points={poligon(b, f)} fill={rupa === "benda" ? WARNA_KEPING[i % WARNA_KEPING.length] : "#FFFFFF"} stroke={w.garis} strokeWidth={2} strokeLinejoin="round" data-bagian-segitiga="1" />
      ))}
      {tanda && rupa === "diagram"
        ? tandaSisi(bidang).map((t, i) => <line key={`t${i}`} x1={f(t.a)[0]} y1={f(t.a)[1]} x2={f(t.b)[0]} y2={f(t.b)[1]} stroke="#DC2626" strokeWidth={2} />)
        : null}
      {tanda && rupa === "diagram"
        ? tandaSiku(bidang, 9 / Math.max(skala, 1)).map((t, i) => <polygon key={`s${i}`} points={poligon(t, f)} fill="none" stroke="#DC2626" strokeWidth={1.6} />)
        : null}
    </svg>
  );
}

/** Dua keping yang akan dipasang: digambar terpisah dengan jarak (belum dipasang). */
export function KepingSvg({ keping, rupa, tanda = false }: { keping: [Bidang, Bidang]; rupa: RupaGambar; tanda?: boolean }) {
  const w = WARNA[rupa];
  // Kedua keping dijauhkan sepanjang garis antar titik beratnya, sehingga sisi yang akan dipertemukan saling berhadapan.
  const pusat = (p: Bidang): Titik => [p.reduce((x, t) => x + t[0], 0) / p.length, p.reduce((x, t) => x + t[1], 0) / p.length];
  const [ca, cb] = [pusat(keping[0]), pusat(keping[1])];
  const jarak = Math.hypot(cb[0] - ca[0], cb[1] - ca[1]) || 1;
  const arah: Titik = [(cb[0] - ca[0]) / jarak, (cb[1] - ca[1]) / jarak];
  const gap = 0.55 * Math.max(...keping.map((p) => Math.max(...panjangSisi(p))));
  const geser = (p: Bidang, k: number): Bidang => p.map((t) => [t[0] + arah[0] * gap * k, t[1] + arah[1] * gap * k] as Titik);
  const dua: [Bidang, Bidang] = [geser(keping[0], -0.5), geser(keping[1], 0.5)];
  const f = muatkan(dua);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label="dua keping sama besar yang akan dipasang" data-keping="2">
      <rect x={3} y={2} width={LEBAR - 6} height={TINGGI - 4} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.5} />
      {dua.map((p, i) => (
        <g key={i}>
          <polygon points={poligon(p, f)} fill={rupa === "benda" ? WARNA_KEPING[i * 3] : "#FFFFFF"} stroke={w.garis} strokeWidth={2.4} strokeLinejoin="round" />
          {tanda && rupa === "diagram" ? tandaSisi(p).map((t, j) => <line key={j} x1={f(t.a)[0]} y1={f(t.a)[1]} x2={f(t.b)[0]} y2={f(t.b)[1]} stroke="#DC2626" strokeWidth={2} />) : null}
        </g>
      ))}
    </svg>
  );
}

/** Persegi panjang yang disusun dari persegi kecil: kisi tetap kolom x baris, sungguh sebanyak datanya. */
export function KisiKepingSvg({ kolom, baris, rupa }: { kolom: number; baris: number; rupa: RupaGambar }) {
  const w = WARNA[rupa];
  const petak = kepingKecil({ tipe: "keping", kolom, baris });
  const f = muatkan([[[0, 0], [kolom * 2, baris * 2]]]);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`persegi panjang dari ${petak.length} persegi kecil`} data-keping={petak.length} data-kolom={kolom} data-baris={baris}>
      <rect x={3} y={2} width={LEBAR - 6} height={TINGGI - 4} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.5} />
      {petak.map((p, i) => (
        <polygon key={i} points={poligon(p, f)} fill={rupa === "benda" ? WARNA_KEPING[i % WARNA_KEPING.length] : "#FFFFFF"} stroke={w.garis} strokeWidth={2} data-petak="1" />
      ))}
    </svg>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#78350F]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}
const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#78350F]">
        {b}
      </p>
    ))}
  </div>
);
/** Keterangan di bawah gambar Concrete dan Pictorial (baris pertama dan terakhir kartu kata). */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[0], kartu[kartu.length - 1]];
}
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { nama: "kartu bangun", sisi: "kartu sisi", sebut: "kartu kata", pasang: "kartu keping", keping: "kartu susunan", bagi: "kartu belahan", diagonal: "kartu belahan" };

function Bagian({ d, rupa }: { d: LangkahDasar; rupa: RupaGambar }) {
  switch (d.tipe) {
    case "pasang":
      return <KepingSvg keping={SUSUNAN[d.varian].keping} rupa={rupa} tanda={rupa === "diagram"} />;
    case "keping":
      return <KisiKepingSvg kolom={d.kolom} baris={d.baris} rupa={rupa} />;
    case "bagi":
    case "diagonal":
      return <BangunSvg bidang={bidangTugas(d)} bagian={bagianTugas(d)} rupa={rupa} tanda={false} label={`bangun dengan ${bidangTugas(d).length} sisi dibelah menjadi ${bagianTugas(d).length} segitiga`} />;
    default:
      return <BangunSvg bidang={bidangTugas(d)} rupa={rupa} tanda={rupa === "diagram"} />;
  }
}

/** Banyak segitiga yang digambar untuk tugas belahan (dipakai uji). */
export const segitigaTergambar = (d: LangkahDasar): number => bagianTugas(d).length;
/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  return (
    <div className="space-y-1.5">
      <Bagian d={d} rupa={rupa} />
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
export { BANGUN };
