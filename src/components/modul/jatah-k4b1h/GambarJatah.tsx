"use client";

import React from "react";
import { barisKartu, dasarDari, puluhanDari, satuanDari, type Cara, type Langkah, type LDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab H (pembagian sampai seratus):
 * Concrete = benda pulau wisata beremoji di papan jatah (tiap sepuluh benda satu baris berbingkai) dengan pintu kamar bernomor, atau baris benda sebanyak pembagi untuk pengurangan berulang;
 * Pictorial = titik polos dengan kotak polos, bagan batang, garis loncat, dan bagan bersusun polos; Abstract = kartu kata dan angka.
 * Banyak benda, titik, pintu, dan loncatan sungguh sebanyak datanya. Dipakai bersama oleh tugas CPA (LangkahJatah) dan Simulasi Papan Jatah.
 */
const UNGU = "#1C01A5";
const COKLAT = "#92400E";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda pulau wisata untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  koper: "\u{1F9F3}",
  permen: "\u{1F36C}",
  kelapa: "\u{1F965}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
  kerang: "\u{1F41A}",
  lentera: "\u{1F3EE}",
  payung: "\u{1F302}",
  tiket: "\u{1F3AB}",
  keranjang: "\u{1F9FA}",
  bel: "\u{1F6CE}",
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

/* ------------------------------ Pintu kamar ------------------------------ */
/** Pintu kamar bernomor 1 sampai `d` berderet di tinggi `y`. Concrete menambahkan tempat tidur beremoji; Pictorial polos. */
export function PintuKamar({ d, y, rupa, tinggi = 40, isi }: { d: number; y: number; rupa: Rupa; tinggi?: number; isi?: { emoji: string; banyak: number } }) {
  const lebar = Math.min(34, Math.floor(270 / d) - 5);
  const total = d * lebar + (d - 1) * 5;
  const x0 = (300 - total) / 2;
  return (
    <g>
      {Array.from({ length: d }, (_, i) => {
        const x = x0 + i * (lebar + 5);
        return (
          <g key={i}>
            <rect x={x} y={y} width={lebar} height={tinggi} rx={4} fill={rupa === "benda" ? "#F3D9A4" : "#E0F2FE"} stroke={rupa === "benda" ? COKLAT : "#1E3A8A"} strokeWidth={rupa === "benda" ? 2 : 1.6} />
            <text x={x + lebar / 2} y={y + 11} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
              {i + 1}
            </text>
            {rupa === "benda" ? (
              <text x={x + lebar / 2} y={y + tinggi - 9} textAnchor="middle" fontSize={14} aria-hidden="true">
                {"\u{1F6CF}"}
              </text>
            ) : null}
            {rupa === "benda" && isi
              ? Array.from({ length: isi.banyak }, (_, j) => (
                  <text key={j} x={x + lebar / 2} y={y + tinggi - 24 - j * 11} textAnchor="middle" fontSize={10} aria-hidden="true" data-isi="1">
                    {isi.emoji}
                  </text>
                ))
              : null}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Kumpulan benda dan kamar (Bagi Rata, hasil bagi, bagi susun pada Concrete dan Pictorial) ------------------------------ */
/** Kumpulan `n` benda berderet sepuluh sepuluh (tiap baris penuh berbingkai) dan `d` pintu kamar kosong. Banyak benda dan pintu sungguh sebanyak datanya. */
export function Kumpulan({ n, d, benda, rupa, judul, kamar = "kamar" }: { n: number; d: number; benda: string; rupa: Rupa; judul: string; kamar?: string }) {
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F9F3}";
  const baris = Math.ceil(n / 10);
  const langkah = baris > 5 ? 13 : 15;
  const tinggiKolam = baris * langkah + 8;
  return (
    <Gambar label={`Kumpulan ${n} ${benda} dan ${d} ${kamar}`} judul={judul}>
      <rect x={8} y={20} width={284} height={tinggiKolam} rx={6} fill={rupa === "benda" ? "#FEF3C7" : "#F8FAFC"} stroke={rupa === "benda" ? COKLAT : "#1E3A8A"} strokeWidth={rupa === "benda" ? 2.4 : 1.6} />
      {Array.from({ length: baris }, (_, r) => {
        const isi = Math.min(10, n - r * 10);
        const y = 24 + r * langkah;
        return (
          <g key={r}>
            {isi === 10 ? <rect x={16} y={y} width={rupa === "benda" ? 138 : 128} height={langkah - 2} rx={3} fill="none" stroke="#D97706" strokeWidth={1.2} strokeDasharray="3 2" /> : null}
            {rupa === "benda" ? (
              <text x={20} y={y + langkah - 4} fontSize={11} aria-hidden="true" data-benda={isi}>
                {Array.from({ length: isi }, () => emoji).join("")}
              </text>
            ) : (
              Array.from({ length: isi }, (_, i) => <circle key={i} cx={24 + i * 12.5} cy={y + (langkah - 2) / 2} r={4} fill="#2563EB" stroke="#1E3A8A" strokeWidth={0.8} data-titik="1" />)
            )}
          </g>
        );
      })}
      <text x={279} y={33} textAnchor="end" fontSize={10} fontWeight={900} fill={UNGU}>
        {n} {rupa === "benda" ? benda : "titik"}
      </text>
      <PintuKamar d={d} y={24 + tinggiKolam + 12} rupa={rupa} />
      <text x={150} y={24 + tinggiKolam + 12 + 40 + 14} textAnchor="middle" fontSize={10} fontWeight={900} fill="#B45309">
        {d} {kamar}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Baris pengurangan (Repeated Subtraction pada Concrete) ------------------------------ */
/** Benda berderet `d` per baris (tiap baris penuh = satu pengurangan), sisa pada baris terakhir. */
export function BarisKurang({ n, d, benda }: { n: number; d: number; benda: string }) {
  const emoji = EMOJI_BENDA[benda] ?? "\u{1F9F3}";
  const penuh = Math.floor(n / d);
  const sisa = n % d;
  const baris = penuh + (sisa > 0 ? 1 : 0);
  const langkah = baris > 7 ? 13 : 15;
  return (
    <Gambar label={`${n} ${benda} dikurangi ${d} berulang`} judul={`${n} ${benda}, tiap baris dikurangi ${d}`}>
      <rect x={8} y={20} width={284} height={baris * langkah + 8} rx={6} fill="#FEF3C7" stroke={COKLAT} strokeWidth={2.4} />
      {Array.from({ length: baris }, (_, r) => {
        const isi = r < penuh ? d : sisa;
        const y = 24 + r * langkah;
        return (
          <g key={r}>
            <rect x={16} y={y} width={d * 12.5 + 8} height={langkah - 2} rx={3} fill={r < penuh ? "none" : "#FEE2E2"} stroke={r < penuh ? "#D97706" : "#DC2626"} strokeWidth={1.2} strokeDasharray={r < penuh ? undefined : "3 2"} />
            <text x={20} y={y + langkah - 4} fontSize={11} aria-hidden="true" data-benda={isi}>
              {Array.from({ length: isi }, () => emoji).join("")}
            </text>
            {r < penuh ? (
              <text x={d * 12.5 + 34} y={y + langkah - 4} fontSize={9} fontWeight={900} fill="#B45309">
                − {d}
              </text>
            ) : null}
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Garis loncat (Repeated Subtraction pada Pictorial) ------------------------------ */
/** Garis bilangan nol sampai `n` dengan loncatan sebesar `d` dari `n` ke arah nol; sisa yang kurang dari `d` digambar putus-putus. Banyak lengkung sungguh sebanyak loncatan penuh. */
export function GarisLoncat({ n, d }: { n: number; d: number }) {
  const penuh = Math.floor(n / d);
  const sisa = n % d;
  const skala = 260 / n;
  const x = (v: number): number => 20 + v * skala;
  return (
    <Gambar label={`Garis loncat dari ${n} dengan loncatan ${d}`} judul={`garis loncat: tiap loncatan ${d}`}>
      <rect x={8} y={24} width={284} height={120} rx={6} fill="#F8FAFC" stroke="#1E3A8A" strokeWidth={1.6} />
      <line x1={x(0)} y1={110} x2={x(n)} y2={110} stroke="#1E3A8A" strokeWidth={2.4} strokeLinecap="round" />
      {Array.from({ length: penuh }, (_, i) => {
        const dari = n - i * d;
        const ke = dari - d;
        return (
          <g key={i}>
            <path d={`M${x(dari)} 110 Q${(x(dari) + x(ke)) / 2} ${110 - 44} ${x(ke)} 110`} fill="none" stroke={i % 2 === 0 ? "#DC2626" : "#7C3AED"} strokeWidth={2} data-lengkung="1" />
            <line x1={x(ke)} y1={105} x2={x(ke)} y2={115} stroke="#1E3A8A" strokeWidth={1.6} />
          </g>
        );
      })}
      {sisa > 0 ? <line x1={x(0)} y1={110} x2={x(sisa)} y2={110} stroke="#DC2626" strokeWidth={4} strokeDasharray="3 3" /> : null}
      <line x1={x(n)} y1={105} x2={x(n)} y2={115} stroke="#1E3A8A" strokeWidth={1.6} />
      <text x={x(0)} y={130} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        0
      </text>
      <text x={x(n)} y={130} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {n}
      </text>
      <text x={150} y={168} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
        dari {n} meloncat mundur tiap {d}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Bagan batang (hasil bagi pada Pictorial) ------------------------------ */
/** Batang sepanjang `n` dibagi `d` bagian sama panjang; tiap bagian berisi tanda tanya. */
export function BaganBatang({ n, d }: { n: number; d: number }) {
  const lebar = 260 / d;
  return (
    <Gambar label={`Bagan batang ${n} dibagi ${d}`} judul="bagan batang">
      <rect x={8} y={24} width={284} height={120} rx={6} fill="#F8FAFC" stroke="#1E3A8A" strokeWidth={1.6} />
      <path d="M20 66 Q150 46 280 66" fill="none" stroke="#1E3A8A" strokeWidth={1.8} />
      <text x={150} y={52} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DC2626">
        {n}
      </text>
      {Array.from({ length: d }, (_, i) => (
        <g key={i}>
          <rect x={20 + i * lebar} y={76} width={lebar} height={34} fill={i % 2 === 0 ? "#BFDBFE" : "#DBEAFE"} stroke="#1E3A8A" strokeWidth={1.6} data-bagian="1" />
          <text x={20 + i * lebar + lebar / 2} y={98} textAnchor="middle" fontSize={14} fontWeight={900} fill={UNGU}>
            ?
          </text>
        </g>
      ))}
      <text x={150} y={134} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
        {d} bagian sama panjang
      </text>
    </Gambar>
  );
}

/* ------------------------------ Bagan bersusun polos (Long Division pada Pictorial) ------------------------------ */
/** Kurung pembagian bersusun dengan bilangan yang dibagi, pembagi, dan dua kotak hasil. Bagian yang ditanyakan diberi bingkai merah dan tanda tanya. */
export function BersusunPolos({ l }: { l: LDasar }) {
  const t = puluhanDari(l);
  const s = satuanDari(l);
  const sorotPuluh = l.tanya === "q1" || l.tanya === "s1" || l.tanya === "gabung" || l.tanya === "q2";
  const sorotSatuan = l.tanya === "turun" || l.tanya === "gabung" || l.tanya === "q2";
  const bingkai = (x: number, y: number, w = 24) => <rect x={x} y={y} width={w} height={26} rx={4} fill="none" stroke="#DC2626" strokeWidth={2.4} />;
  return (
    <Gambar label={`Bagan pembagian bersusun ${l.n} dibagi ${l.d}`} judul="bagan bagi susun">
      <rect x={8} y={24} width={284} height={134} rx={6} fill="#F8FAFC" stroke="#1E3A8A" strokeWidth={1.6} />
      <text x={104} y={52} textAnchor="middle" fontSize={9} fontWeight={900} fill="#7C3AED">
        puluhan
      </text>
      <text x={140} y={52} textAnchor="middle" fontSize={9} fontWeight={900} fill="#7C3AED">
        satuan
      </text>
      <rect x={92} y={60} width={24} height={22} rx={3} fill="#FFFFFF" stroke="#1E3A8A" strokeWidth={1.4} strokeDasharray="3 2" />
      <rect x={128} y={60} width={24} height={22} rx={3} fill="#FFFFFF" stroke="#1E3A8A" strokeWidth={1.4} strokeDasharray="3 2" />
      {l.tanya === "q1" || l.tanya === "hasil" ? (
        <text x={104} y={77} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
          ?
        </text>
      ) : null}
      {l.tanya === "q2" || l.tanya === "hasil" ? (
        <text x={140} y={77} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
          ?
        </text>
      ) : null}
      <line x1={86} y1={90} x2={160} y2={90} stroke="#1E3A8A" strokeWidth={2.4} />
      <line x1={86} y1={90} x2={86} y2={126} stroke="#1E3A8A" strokeWidth={2.4} />
      <text x={72} y={116} textAnchor="middle" fontSize={20} fontWeight={900} fill="#1E3A8A">
        {l.d}
      </text>
      <text x={104} y={116} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
        {t}
      </text>
      <text x={140} y={116} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
        {s}
      </text>
      {sorotPuluh ? bingkai(92, 98) : null}
      {sorotSatuan ? bingkai(128, 98) : null}
      {l.tanya === "s1" ? (
        <text x={104} y={148} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
          ?
        </text>
      ) : null}
      {l.tanya === "turun" || l.tanya === "gabung" ? (
        <text x={122} y={148} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
          ?
        </text>
      ) : null}
      <text x={236} y={104} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        bagi dari puluhan
      </text>
      <text x={236} y={118} textAnchor="middle" fontSize={9} fontWeight={900} fill="#B45309">
        ke satuan
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

const JUDUL_KARTU: Record<LDasar["tipe"], string> = {
  bagi: "membagi bilangan",
  rata: "bagi rata",
  kurang: "kurang berulang",
  susun: "bagi susun",
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
    case "bagi":
      return rupa === "benda" ? <Kumpulan n={d.n} d={d.d} benda={d.benda} rupa={rupa} judul={`${d.n} ${d.benda} dibagi ${d.d}`} /> : <BaganBatang n={d.n} d={d.d} />;
    case "rata":
      return <Kumpulan n={d.n} d={d.d} benda={d.benda} rupa={rupa} judul={rupa === "benda" ? `${d.n} ${d.benda} dibagi rata ke ${d.d} kamar` : "dibagi rata ke kotak"} kamar={rupa === "benda" ? "kamar" : "kotak"} />;
    case "kurang":
      return rupa === "benda" ? <BarisKurang n={d.n} d={d.d} benda={d.benda} /> : <GarisLoncat n={d.n} d={d.d} />;
    case "susun":
      return rupa === "benda" ? <Kumpulan n={d.n} d={d.d} benda={d.benda} rupa={rupa} judul={`${d.n} ${d.benda}: sepuluh-sepuluh dibagi ${d.d}`} /> : <BersusunPolos l={d} />;
  }
}
