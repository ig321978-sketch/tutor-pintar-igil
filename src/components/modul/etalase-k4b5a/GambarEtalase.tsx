"use client";

import React from "react";
import { ANAK, barisKartu, dasarDari, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { banyakSejajar, banyakSiku, bangun, golonganSisi, muatkan, namaDari, tandaSama, tandaSejajar, tandaSiku, teksTitik, type Titik } from "./logika-bangun";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar):
 * Concrete = keramik berwarna berglasir di rak etalase, Pictorial = diagram polos di kertas denah (garis kecil pada sisi sama panjang, kotak pada sudut siku-siku, panah pada sisi sejajar),
 * Abstract = kartu kata dan angka. Tiap bangun digambar dari koordinat titik sudut (logika-bangun.ts), jadi sisi, sudut, dan sisi sejajar sungguh sesuai ciri yang diuji.
 * Dipakai bersama oleh tugas CPA (LangkahEtalase) dan Simulasi Etalase Keramik.
 */

export const WARNA_ETALASE = {
  benda: { latar: "#FFF7ED", garis: "#9A3412", angka: "#7C2D12", rak: "#B7814A", rakTua: "#6B4423" },
  diagram: { latar: "#F8FAFC", garis: "#334155", angka: "#1E293B", rak: "#CBD5E1", rakTua: "#94A3B8" },
} as const;
export const warnaEtalase = (rupa: Rupa) => (rupa === "benda" ? WARNA_ETALASE.benda : WARNA_ETALASE.diagram);

/** Glasir tiap keramik Concrete: [isi, tepi]. */
const GLASIR: [string, [string, string]][] = [
  ["segitiga", ["#F87171", "#B91C1C"]],
  ["persegi-panjang", ["#34D399", "#047857"]],
  ["persegi", ["#60A5FA", "#1D4ED8"]],
  ["jajargenjang", ["#FBBF24", "#B45309"]],
  ["belah-ketupat", ["#F472B6", "#BE185D"]],
  ["layang-layang", ["#A78BFA", "#6D28D9"]],
  ["trapesium", ["#FB923C", "#C2410C"]],
  ["segiempat", ["#94A3B8", "#334155"]],
  ["segilima", ["#2DD4BF", "#0F766E"]],
  ["segienam", ["#818CF8", "#4338CA"]],
];
export const glasirDari = (kunci: string): [string, string] => GLASIR.find(([awal]) => kunci === awal || kunci.startsWith(`${awal}-`))?.[1] ?? ["#94A3B8", "#334155"];

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200, keterangan = [] }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number; keterangan?: string[] }) {
  const w = warnaEtalase(rupa);
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl" style={{ background: w.latar }}>
      <p className="px-2 pt-1 text-center text-[12px] font-black leading-tight" style={{ color: w.angka }}>
        {judul}
      </p>
      <svg viewBox={`0 0 300 ${tinggi}`} className="block w-full touch-none select-none" aria-label={label} role="img">
        {children}
      </svg>
      {keterangan.map((t) => (
        <p key={t} className="px-2 pb-1 text-center text-[12px] font-black leading-tight" style={{ color: w.garis }}>
          {t}
        </p>
      ))}
    </div>
  );
}

const garisSvg = (g: [Titik, Titik], kunci: string, warna: string, tebal = 1.6) => <line key={kunci} x1={g[0][0]} y1={g[0][1]} x2={g[1][0]} y2={g[1][1]} stroke={warna} strokeWidth={tebal} strokeLinecap="round" />;

/**
 * Satu bangun di kotak (x, y, w, h). Concrete = keramik berglasir dengan tepi dalam; Pictorial = diagram polos dengan tanda
 * (garis kecil sisi sama panjang, kotak sudut siku-siku, panah sisi sejajar) bila `tanda` menyala.
 */
export function Keramik({ kunci, x, y, w, h, rupa, tanda = true, ukuranTanda = 6, maks }: { kunci: string; x: number; y: number; w: number; h: number; rupa: Rupa; tanda?: boolean; ukuranTanda?: number; maks?: number }) {
  const t = muatkan(bangun(kunci).titik, x, y, w, h, maks);
  const benda = rupa === "benda";
  const [isi, tepi] = glasirDari(kunci);
  const pusat: Titik = [t.reduce((s, p) => s + p[0], 0) / t.length, t.reduce((s, p) => s + p[1], 0) / t.length];
  const dalam = t.map((p): Titik => [pusat[0] + (p[0] - pusat[0]) * 0.72, pusat[1] + (p[1] - pusat[1]) * 0.72]);
  return (
    <g data-bangun={kunci} data-titik={teksTitik(t)}>
      <polygon points={teksTitik(t)} fill={benda ? isi : "#FFFFFF"} stroke={benda ? tepi : "#334155"} strokeWidth={benda ? 2.4 : 1.8} strokeLinejoin="round" />
      {benda ? <polygon points={teksTitik(dalam)} fill="none" stroke="#FFFFFF" strokeOpacity={0.65} strokeWidth={1.2} strokeLinejoin="round" /> : null}
      {!benda && tanda ? (
        <g>
          {tandaSama(t, ukuranTanda).map((m) => m.garis.map((g, i) => garisSvg(g, `s${m.i}-${i}`, "#DC2626")))}
          {tandaSejajar(t, ukuranTanda).map((m) => m.garis.map((g, i) => garisSvg(g, `j${m.i}-${i}`, "#1D4ED8", 1.5)))}
          {tandaSiku(t, ukuranTanda + 1).map((m) => (
            <polyline key={`k${m.i}`} points={teksTitik(m.titik)} fill="none" stroke="#15803D" strokeWidth={1.5} />
          ))}
        </g>
      ) : null}
    </g>
  );
}

/** Papan rak kayu tipis di bawah baris keramik (hanya Concrete). */
const Rak = ({ y }: { y: number }) => <rect x={10} y={y} width={280} height={5} rx={2} fill={WARNA_ETALASE.benda.rak} stroke={WARNA_ETALASE.benda.rakTua} strokeWidth={1} />;

/** Sejumlah keramik dalam kisi tetap (paling banyak tiga kolom), tiap keramik muat di selnya. */
export function KisiKeramik({ daftar, rupa, y0 = 24, tinggi = 120 }: { daftar: readonly string[]; rupa: Rupa; y0?: number; tinggi?: number }) {
  const kol = daftar.length <= 4 ? 2 : 3;
  const baris = Math.ceil(daftar.length / kol);
  const lebarSel = 280 / kol;
  const tinggiSel = tinggi / baris;
  return (
    <g data-kisi="keramik" data-banyak={daftar.length}>
      {daftar.map((k, i) => (
        <Keramik key={`${k}-${i}`} kunci={k} x={10 + (i % kol) * lebarSel + 8} y={y0 + Math.floor(i / kol) * tinggiSel + 4} w={lebarSel - 16} h={tinggiSel - 14} rupa={rupa} tanda={false} />
      ))}
      {rupa === "benda" ? Array.from({ length: baris }, (_, r) => <Rak key={r} y={y0 + (r + 1) * tinggiSel - 8} />) : null}
    </g>
  );
}

/**
 * Pohon keluarga bentuk (HTML dengan gambar keramik SVG kecil): bangun induk, ciri tambahan, dan bangun anak. `sembunyi` menyatakan yang belum diketahui.
 * Semua tulisan berupa teks HTML berukuran paling kecil 12 px.
 */
export function PohonKeluarga({ i, rupa, sembunyi }: { i: number; rupa: Rupa; sembunyi: "anak" | "induk" | "sejajar" }) {
  const a = ANAK[i];
  const w = warnaEtalase(rupa);
  const simpul = (kunci: string | null, nama: string) => (
    <div className="flex min-w-0 flex-col items-center">
      {kunci === null ? (
        <div className="flex h-[56px] w-full max-w-[84px] items-center justify-center rounded-lg border-2 border-dashed bg-white text-3xl font-black" style={{ borderColor: w.garis, color: "#B45309" }}>
          ?
        </div>
      ) : (
        <svg viewBox="0 0 90 58" className="h-[56px] w-full max-w-[90px]" aria-hidden="true">
          <Keramik kunci={kunci} x={5} y={3} w={80} h={52} rupa={rupa} tanda={rupa === "diagram"} ukuranTanda={5} />
        </svg>
      )}
      <span className="mt-0.5 text-center text-[12px] font-black leading-tight" style={{ color: w.angka }}>
        {nama}
      </span>
    </div>
  );
  return (
    <div className="grid grid-cols-[1fr_1.15fr_1fr] items-center gap-1 px-1 py-1" data-pohon={i}>
      {simpul(sembunyi === "induk" ? null : a.indukKunci, sembunyi === "induk" ? "induknya" : a.induk)}
      <div className="flex min-w-0 flex-col items-center text-center">
        <span className="text-[12px] font-black leading-tight text-[#B45309]">+ {a.tambah}</span>
        <span className="text-xl font-black leading-none" style={{ color: w.garis }} aria-hidden="true">
          {"➜"}
        </span>
      </div>
      {simpul(sembunyi === "anak" ? null : a.hasil, sembunyi === "anak" ? "bangun anak" : sembunyi === "induk" ? namaDari(a.hasil) : "sisi sejajar: ?")}
    </div>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FDBA74] bg-[#FFF7ED] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#C2410C]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#7C2D12]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#C2410C] bg-[#FFEDD5] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

/** Keterangan tanda yang sungguh ada pada gambar bangun ini. */
const legenda = (kunci: string): string[] => {
  const t = bangun(kunci).titik;
  return [
    ...(golonganSisi(t).some((g) => g > 0) ? ["garis kecil: sisi sama panjang"] : []),
    ...(banyakSiku(t) > 0 ? ["kotak: sudut siku-siku"] : []),
    ...(banyakSejajar(t) > 0 ? ["panah: sisi sejajar"] : []),
  ];
};

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  kenali: "segi banyak",
  pilah: "memilah keramik",
  sisi: "sisi dan sudut",
  pohon: "pohon keluarga bentuk",
  jenis: "jenis segitiga",
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
  switch (d.tipe) {
    case "kenali":
      return (
        <Gambar rupa={rupa} label={`Keramik berbentuk ${bangun(d.b).nama}`} judul={benda ? "keramik hias di etalase" : "denah keramik"} tinggi={146} keterangan={[cara === "kanvas" ? "banyak sisi: ?" : cara === "suara" ? "semua sisi dan sudut sama" : "tepinya ruas garis lurus tertutup"]}>
          <Keramik kunci={d.b} x={60} y={8} w={180} h={120} rupa={rupa} tanda={false} />
          {benda ? <Rak y={134} /> : null}
        </Gambar>
      );
    case "pilah":
      return (
        <Gambar
          rupa={rupa}
          label={`${d.daftar.length} keramik di rak`}
          judul={benda ? "keramik di rak etalase" : "denah keramik"}
          tinggi={132}
          keterangan={["digolongkan menurut banyak sisi", cara === "kanvas" ? `keramik bersisi ${d.n}: ?` : cara === "suara" ? `golongan bersisi ${d.n}: ?` : "keramik tidak segolongan: ?"]}
        >
          <KisiKeramik daftar={d.daftar} rupa={rupa} y0={4} tinggi={120} />
        </Gambar>
      );
    case "sisi":
    case "jenis":
      return (
        <Gambar rupa={rupa} label={`Keramik berbentuk ${bangun(d.b).nama}`} judul={benda ? "keramik di meja Bu Dewi" : "diagram keramik"} tinggi={126} keterangan={benda ? ["periksa dengan penyiku dan penggaris"] : legenda(d.b)}>
          <Keramik kunci={d.b} x={50} y={6} w={200} h={104} rupa={rupa} ukuranTanda={8} />
          {benda ? <Rak y={114} /> : null}
        </Gambar>
      );
    case "pohon": {
      const sembunyi = cara === "kanvas" ? "sejajar" : cara === "suara" ? "induk" : "anak";
      return (
        <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl pb-1" style={{ background: warnaEtalase(rupa).latar }} role="img" aria-label={`Pohon keluarga bentuk: ${ANAK[d.i].induk} diberi tambahan ciri`}>
          <p className="px-2 pt-1 text-center text-[12px] font-black leading-tight" style={{ color: warnaEtalase(rupa).angka }}>
            {benda ? "pohon keluarga keramik" : "pohon keluarga bentuk"}
          </p>
          <PohonKeluarga i={d.i} rupa={rupa} sembunyi={sembunyi} />
          <p className="px-2 text-center text-[12px] font-black leading-tight" style={{ color: warnaEtalase(rupa).garis }}>
            bangun anak punya semua ciri induk
          </p>
        </div>
      );
    }
  }
}
