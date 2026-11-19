"use client";

import React from "react";
import { HARI, barisKartu, dasarDari, terbesar, terkecil, urutkan, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { lebarTurus, segTurus } from "./turus";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 5 Sub-Bab A (mengurutkan dan membandingkan data):
 * Concrete = benda bengkel sepeda beremoji di rak etalase (tiap hari satu baris benda yang dihitung), Pictorial = kartu bilangan polos, garis urutan polos, dan turus polos,
 * Abstract = kartu kata dan angka (turus tetap digambar tepat). Turus: empat garis tegak dicoret satu garis miring, sesuai banyak data (turus.ts).
 * Dipakai bersama oleh tugas CPA (LangkahPapan) dan Simulasi Meja Catat.
 */
const UNGU = "#1C01A5";
const KAPUR = "#14532D";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda bengkel sepeda untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  sepeda: "\u{1F6B2}",
  baut: "\u{1F529}",
  bel: "\u{1F514}",
  lampu: "\u{1F4A1}",
  rantai: "\u{26D3}",
  helm: "\u{26D1}",
  apel: "\u{1F34E}",
  pita: "\u{1F380}",
  perkakas: "\u{1F527}",
  kertas: "\u{1F4C4}",
  pensil: "\u{270F}",
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

/* ------------------------------ Turus ------------------------------ */
/** Turus `banyak` data berpusat di `cx`: garis tegak dan coretan miring dari segTurus. */
export function TurusSvg({ banyak, cx, y, warna = UNGU, jarak = 8, tinggi = 30, tebal = 2.4 }: { banyak: number; cx: number; y: number; warna?: string; jarak?: number; tinggi?: number; tebal?: number }) {
  const lebar = lebarTurus(banyak, { jarak });
  const garis = segTurus(banyak, { x: cx - lebar / 2, y, jarak, tinggi });
  return (
    <g aria-hidden="true">
      {garis.map((s, i) => (
        <line key={i} data-turus={s.miring ? "miring" : "tegak"} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.miring ? "#DC2626" : warna} strokeWidth={tebal} strokeLinecap="round" />
      ))}
    </g>
  );
}

/* ------------------------------ Baris benda beremoji (Concrete) ------------------------------ */
/** Rak etalase: satu baris per data, berisi `n` benda beremoji (dihitung anak), diberi nama baris di kiri. Baris `sorotKe` dibingkai merah. */
function Etalase({ nama, data, benda, sorotKe = -1, judul }: { nama: string[]; data: number[]; benda: string; sorotKe?: number; judul: string }) {
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F527}";
  const tinggi = data.length > 5 ? 25 : 29;
  return (
    <Gambar label={`Rak etalase: ${judul}`} judul={judul}>
      <rect x={10} y={22} width={280} height={tinggi * data.length + 8} rx={6} fill="#FDE68A" stroke="#92400E" strokeWidth={2.4} />
      {data.map((n, i) => {
        const y = 28 + i * tinggi;
        return (
          <g key={`${nama[i]}${i}`}>
            <rect x={14} y={y} width={272} height={tinggi - 3} rx={3} fill={i === sorotKe ? "#FEE2E2" : "#FEF3C7"} stroke={i === sorotKe ? "#DC2626" : "#B7814A"} strokeWidth={i === sorotKe ? 3 : 1.2} />
            <text x={22} y={y + tinggi / 2 + 3} fontSize={10} fontWeight={900} fill="#7C2D12">
              {nama[i]}
            </text>
            <text x={62} y={y + tinggi / 2 + 5} fontSize={14} aria-hidden="true">
              {Array.from({ length: n }, () => emoji).join("")}
            </text>
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Kartu bilangan polos (Pictorial) ------------------------------ */
function KartuBilangan({ nama, data, sorotKe = -1, judul }: { nama: string[]; data: number[]; sorotKe?: number; judul: string }) {
  const lebar = 40;
  const celah = 6;
  const total = data.length * lebar + (data.length - 1) * celah;
  const x0 = (300 - total) / 2;
  return (
    <Gambar label={`Kartu bilangan: ${judul}`} judul={judul}>
      <rect x={6} y={26} width={288} height={96} rx={6} fill="#14532D" stroke="#78350F" strokeWidth={5} />
      {data.map((n, i) => {
        const x = x0 + i * (lebar + celah);
        return (
          <g key={`${nama[i]}${i}`}>
            <text x={x + lebar / 2} y={46} textAnchor="middle" fontSize={nama[i].length > 5 ? 8 : 10} fontWeight={900} fill="#FEF9C3">
              {nama[i]}
            </text>
            <rect x={x} y={54} width={lebar} height={52} rx={6} fill="#FFFFFF" stroke={i === sorotKe ? "#DC2626" : "#E5E7EB"} strokeWidth={i === sorotKe ? 4 : 1.6} />
            <text x={x + lebar / 2} y={89} textAnchor="middle" fontSize={26} fontWeight={900} fill={KAPUR}>
              {n}
            </text>
            {i === sorotKe ? <polygon points={`${x + lebar / 2 - 6},${112} ${x + lebar / 2 + 6},${112} ${x + lebar / 2},${103}`} fill="#DC2626" /> : null}
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Garis urutan (Number Order Line) ------------------------------ */
const XG = (i: number): number => 30 + i * (240 / 9);
function GarisUrutan({ data, rupa, benda, judul }: { data: number[]; rupa: Rupa; benda: string; judul: string }) {
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F527}";
  const urut = urutkan(data);
  return (
    <Gambar label={`Garis urutan: ${judul}`} judul={judul}>
      <rect x={8} y={28} width={284} height={110} rx={6} fill={rupa === "benda" ? "#FEF3C7" : "#14532D"} stroke={rupa === "benda" ? "#92400E" : "#78350F"} strokeWidth={rupa === "benda" ? 2.4 : 5} />
      <line x1={20} y1={96} x2={280} y2={96} stroke={rupa === "benda" ? "#92400E" : "#FEF9C3"} strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <line x1={XG(i)} y1={90} x2={XG(i)} y2={102} stroke={rupa === "benda" ? "#92400E" : "#FEF9C3"} strokeWidth={2} />
          <text x={XG(i)} y={120} textAnchor="middle" fontSize={11} fontWeight={900} fill={rupa === "benda" ? "#7C2D12" : "#FEF9C3"}>
            {i}
          </text>
        </g>
      ))}
      {urut.map((n) =>
        rupa === "benda" ? (
          <text key={n} x={XG(n)} y={84} textAnchor="middle" fontSize={20} aria-hidden="true">
            {emoji}
          </text>
        ) : (
          <circle key={n} cx={XG(n)} cy={80} r={7} fill="#FACC15" stroke="#FEF9C3" strokeWidth={2} />
        ),
      )}
      <text x={150} y={160} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
        titik paling kiri sampai paling kanan
      </text>
    </Gambar>
  );
}

/* ------------------------------ Turus bertitel ------------------------------ */
function PapanTurus({ banyak, benda, rupa }: { banyak: number; benda: string; rupa: Rupa }) {
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F527}";
  return (
    <Gambar label="Turus: satu garis satu data" judul={rupa === "benda" ? `turus ${benda}` : "turus"}>
      <rect x={8} y={26} width={284} height={110} rx={6} fill={rupa === "benda" ? "#FEF3C7" : rupa === "diagram" ? "#14532D" : "#FDF3DC"} stroke={rupa === "benda" ? "#92400E" : "#78350F"} strokeWidth={rupa === "diagram" ? 5 : 2.4} />
      {rupa === "benda" ? (
        <text x={150} y={52} textAnchor="middle" fontSize={20} aria-hidden="true">
          {emoji}
        </text>
      ) : null}
      <TurusSvg banyak={banyak} cx={150} y={64} warna={rupa === "diagram" ? "#FEF9C3" : UNGU} tinggi={46} jarak={9} tebal={2.8} />
      <text x={150} y={158} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
        satu garis untuk satu data
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#D6B98A] bg-[#FDF3DC] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9A3412]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#451A03]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(92,58,20,0.18) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  urut: "mengurutkan data",
  ujung: "data terkecil dan terbesar",
  jangkau: "jangkauan",
  garis: "garis urutan",
  cek: "cek jangkauan",
  turus: "hitung turus",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
        {d.tipe === "turus" ? (
          <svg viewBox="0 0 300 70" className={SVG} aria-label="Turus: satu garis satu data" role="img">
            <TurusSvg banyak={d.banyak} cx={150} y={14} tinggi={44} jarak={9} tebal={2.8} />
          </svg>
        ) : null}
      </PapanInfo>
    );
  const nama = (n: number): string[] => [...HARI].slice(0, n);
  switch (d.tipe) {
    case "urut":
    case "jangkau":
      return rupa === "benda" ? <Etalase nama={nama(d.data.length)} data={d.data} benda={d.benda} judul={`banyak ${d.benda} tiap hari`} /> : <KartuBilangan nama={nama(d.data.length)} data={d.data} judul="data tiap hari" />;
    case "ujung": {
      const sorot = cara === "suara" ? d.data.indexOf(d.cari === "kecil" ? terkecil(d.data) : terbesar(d.data)) : -1;
      return rupa === "benda" ? (
        <Etalase nama={nama(d.data.length)} data={d.data} benda={d.benda} sorotKe={sorot} judul={`banyak ${d.benda} tiap hari`} />
      ) : (
        <KartuBilangan nama={nama(d.data.length)} data={d.data} sorotKe={sorot} judul="data tiap hari" />
      );
    }
    case "garis":
      return <GarisUrutan data={d.data} rupa={rupa} benda={d.benda} judul={rupa === "benda" ? `garis urutan ${d.benda}` : "garis urutan"} />;
    case "cek": {
      const baris = ["terkecil", "terbesar", "dicatat"];
      const isi = [d.kecil, d.besar, d.klaim];
      return rupa === "benda" ? <Etalase nama={baris} data={isi} benda={d.benda} judul={`cek jangkauan ${d.benda}`} /> : <KartuBilangan nama={baris} data={isi} judul="cek jangkauan" />;
    }
    case "turus":
      return <PapanTurus banyak={d.banyak} benda={d.benda} rupa={rupa} />;
  }
}
