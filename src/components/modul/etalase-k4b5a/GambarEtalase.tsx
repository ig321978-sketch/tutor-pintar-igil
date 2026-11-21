"use client";

import React from "react";
import { ANAK, barisKartu, dasarDari, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { bagiBaris, banyakSejajar, banyakSiku, bangun, golonganSisi, muatkan, tandaSama, tandaSejajar, tandaSiku, teksTitik, type Titik } from "./logika-bangun";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar):
 * Concrete = keramik berwarna berglasir di rak etalase, Pictorial = diagram polos di kertas denah (garis kecil pada sisi sama panjang, kotak pada sudut siku-siku, panah pada sisi sejajar),
 * Abstract = kartu kata dan angka. Tiap bangun digambar dari koordinat titik sudut (logika-bangun.ts), jadi sisi, sudut, dan sisi sejajar sungguh sesuai ciri yang diuji.
 * Dipakai bersama oleh tugas CPA (LangkahEtalase) dan Simulasi Etalase Keramik.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

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

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={warnaEtalase(rupa).latar} />
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={warnaEtalase(rupa).angka}>
        {judul}
      </text>
      {children}
    </svg>
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

const Ket = ({ y, teks, rupa, ukuran = 10 }: { y: number; teks: string; rupa: Rupa; ukuran?: number }) => (
  <text x={150} y={y} textAnchor="middle" fontSize={ukuran} fontWeight={900} fill={warnaEtalase(rupa).garis}>
    {teks}
  </text>
);

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

/** Pohon keluarga bentuk: bangun induk, tanda tambah ciri, dan bangun anak. `sembunyi` menyatakan yang belum diketahui. */
export function PohonKeluarga({ i, rupa, sembunyi }: { i: number; rupa: Rupa; sembunyi: "anak" | "induk" | "sejajar" }) {
  const a = ANAK[i];
  const w = warnaEtalase(rupa);
  const baris = bagiBaris(`+ ${a.tambah}`, 17);
  const kotakTanya = (x: number, nama: string) => (
    <g>
      <rect x={x} y={34} width={88} height={64} rx={8} fill="#FFFFFF" stroke={w.garis} strokeWidth={1.6} strokeDasharray="4 3" />
      <text x={x + 44} y={74} textAnchor="middle" fontSize={26} fontWeight={900} fill="#B45309">
        ?
      </text>
      <text x={x + 44} y={112} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.angka}>
        {nama}
      </text>
    </g>
  );
  const bentuk = (kunci: string, x: number, nama: string | null) => (
    <g>
      <Keramik kunci={kunci} x={x + 4} y={36} w={80} h={56} rupa={rupa} tanda={rupa === "diagram"} ukuranTanda={5} />
      {nama ? (
        <text x={x + 44} y={112} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.angka}>
          {nama}
        </text>
      ) : null}
    </g>
  );
  return (
    <g data-pohon={i}>
      {sembunyi === "induk" ? kotakTanya(12, "induknya") : bentuk(a.indukKunci, 12, a.induk)}
      <line x1={106} y1={72} x2={190} y2={72} stroke={w.garis} strokeWidth={2.4} />
      <polygon points="190,66 202,72 190,78" fill={w.garis} />
      {baris.map((b, q) => (
        <text key={b} x={148} y={62 - (baris.length - 1 - q) * 11} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#B45309">
          {b}
        </text>
      ))}
      {sembunyi === "anak" ? kotakTanya(200, "bangun anak") : bentuk(ANAK[i].hasil, 200, sembunyi === "induk" ? ucapNama(i) : null)}
      {sembunyi === "sejajar" ? (
        <text x={244} y={112} textAnchor="middle" fontSize={10} fontWeight={900} fill="#B45309">
          sisi sejajar: ?
        </text>
      ) : null}
    </g>
  );
}
const ucapNama = (i: number): string => bangun(ANAK[i].hasil).nama;

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
        <Gambar rupa={rupa} label={`Keramik berbentuk ${bangun(d.b).nama}`} judul={benda ? "keramik hias di etalase" : "denah keramik"}>
          <Keramik kunci={d.b} x={60} y={28} w={180} h={112} rupa={rupa} tanda={false} />
          {benda ? <Rak y={146} /> : null}
          <Ket y={166} teks={cara === "kanvas" ? "banyak sisi: ?" : cara === "suara" ? "semua sisi dan sudut sama" : "tepinya ruas garis lurus tertutup"} rupa={rupa} />
        </Gambar>
      );
    case "pilah":
      return (
        <Gambar rupa={rupa} label={`${d.daftar.length} keramik di rak`} judul={benda ? "keramik di rak etalase" : "denah keramik"} tinggi={186}>
          <KisiKeramik daftar={d.daftar} rupa={rupa} />
          <Ket y={160} teks="digolongkan menurut banyak sisi" rupa={rupa} ukuran={10} />
          <Ket y={176} teks={cara === "kanvas" ? `keramik bersisi ${d.n}: ?` : cara === "suara" ? `golongan bersisi ${d.n}: ?` : "keramik tidak segolongan: ?"} rupa={rupa} ukuran={10} />
        </Gambar>
      );
    case "sisi":
      return (
        <Gambar rupa={rupa} label={`Keramik berbentuk ${bangun(d.b).nama}`} judul={benda ? "keramik di meja Bu Dewi" : "diagram keramik"} tinggi={208}>
          <Keramik kunci={d.b} x={50} y={26} w={200} h={104} rupa={rupa} ukuranTanda={8} />
          {benda ? <Rak y={134} /> : null}
          {benda ? (
            <Ket y={156} teks="periksa dengan penyiku dan penggaris" rupa={rupa} />
          ) : (
            <g>
              {legenda(d.b).map((t, i) => (
                <Ket key={t} y={152 + i * 18} teks={t} rupa={rupa} ukuran={13.5} />
              ))}
            </g>
          )}
        </Gambar>
      );
    case "pohon": {
      const sembunyi = cara === "kanvas" ? "sejajar" : cara === "suara" ? "induk" : "anak";
      return (
        <Gambar rupa={rupa} label={`Pohon keluarga bentuk: ${ANAK[d.i].induk} diberi tambahan ciri`} judul={benda ? "pohon keluarga keramik" : "pohon keluarga bentuk"} tinggi={150}>
          <PohonKeluarga i={d.i} rupa={rupa} sembunyi={sembunyi} />
          <Ket y={138} teks="bangun anak punya semua ciri induk" rupa={rupa} ukuran={9} />
        </Gambar>
      );
    }
  }
}
