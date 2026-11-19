"use client";

import React from "react";
import { barisKartu, dasarDari, maksSkala, type Bangun, type Cara, type Jenis, type Langkah, type LBaca, type LBeda, type LDua, type LJenis, type LSisi, type LUbah, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab A (jenis garis, ruas garis diukur dari nol dalam cm dan mm, sisi bangun datar):
 * penggaris bergaris milimeter dengan batang ruas garis (Concrete: benda layang-layang beremoji, Pictorial: batang polos berwarna), gambar sinar garis, garis, ruas garis, kurva,
 * bangun datar bernama huruf, dan kartu kata dan angka (Abstract). Dipakai bersama oleh tugas CPA (LangkahBilah) dan Simulasi Meja Bilah.
 */
const UNGU = "#1C01A5";
const C_TANYA = "#D97706";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda layang-layang dan festival untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  "bilah bambu": "\u{1F38B}",
  pensil: "\u{270F}",
  "benang layang-layang": "\u{1F9F5}",
  "sinar senter": "\u{1F526}",
  "kertas persegi": "\u{1F4C4}",
  "bendera segilima": "\u{1F38F}",
  "kertas segienam": "\u{1F4C3}",
  "layang-layang": "\u{1FA81}",
  "pita merah": "\u{1F380}",
};
const WARNA_BENDA: Record<string, string> = {
  "bilah bambu": "#FDE68A",
  pensil: "#FDE047",
  "benang layang-layang": "#FBCFE8",
  "sinar senter": "#FEF08A",
  "kertas persegi": "#E0F2FE",
  "bendera segilima": "#FCA5A5",
  "kertas segienam": "#DDD6FE",
  "layang-layang": "#FDBA74",
  "pita merah": "#FCA5A5",
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

export type Batang = { dari: number; ke: number; y: number; h?: number; warna: string; label?: string; emoji?: string; putus?: boolean; sorot?: boolean };

/** Penggaris sepanjang `maks` sentimeter, garis kecil tiap milimeter, angka tiap sentimeter, dengan batang ruas garis di atasnya (dari dan ke dalam milimeter). */
export function SkalaMm({ maks, batang, y = 118, rupa, ket = true }: { maks: number; batang: Batang[]; y?: number; rupa: Rupa; ket?: boolean }) {
  const px = (mm: number): number => 20 + (260 * mm) / (maks * 10);
  const badan = rupa === "benda" ? "#FDE68A" : "#E0F2FE";
  const garisBadan = rupa === "benda" ? "#92400E" : UNGU;
  return (
    <g aria-hidden="true">
      <rect x={14} y={y} width={272} height={26} rx={3} fill={badan} stroke={garisBadan} strokeWidth={1.6} />
      {Array.from({ length: maks * 10 + 1 }, (_, mm) => (
        <g key={mm}>
          <line x1={px(mm)} y1={y} x2={px(mm)} y2={y + (mm % 10 === 0 ? 11 : mm % 5 === 0 ? 8 : 5)} stroke={UNGU} strokeWidth={mm % 10 === 0 ? 1.4 : 0.7} />
          {mm % 10 === 0 ? (
            <text x={px(mm)} y={y + 22} textAnchor="middle" fontSize={8.4} fontWeight={800} fill={UNGU}>
              {mm / 10}
            </text>
          ) : null}
        </g>
      ))}
      {ket ? (
        <text x={282} y={y + 40} textAnchor="end" fontSize={8.6} fontWeight={900} fill="#475569">
          angka = sentimeter, garis kecil = 1 mm
        </text>
      ) : null}
      {batang.map((b, i) => {
        const h = b.h ?? 24;
        return (
          <g key={i}>
            <rect x={px(b.dari)} y={b.y} width={Math.max(4, px(b.ke) - px(b.dari))} height={h} rx={3} fill={b.putus ? "#FFFFFF" : b.warna} stroke={b.putus ? "#DC2626" : b.sorot ? "#DC2626" : UNGU} strokeWidth={b.sorot ? 3.2 : 1.6} strokeDasharray={b.putus ? "5 3" : undefined} />
            {b.label ? (
              <text x={(px(b.dari) + px(b.ke)) / 2} y={b.y + h / 2 + 3} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={b.putus ? "#DC2626" : UNGU}>
                {b.label}
              </text>
            ) : null}
            {b.emoji ? (
              <text x={(px(b.dari) + px(b.ke)) / 2} y={b.y - 4} textAnchor="middle" fontSize={18}>
                {b.emoji}
              </text>
            ) : null}
            {!b.putus ? (
              <>
                <line x1={px(b.dari)} y1={b.y + h} x2={px(b.dari)} y2={y} stroke="#64748B" strokeWidth={0.9} strokeDasharray="2 2" />
                <line x1={px(b.ke)} y1={b.y + h} x2={px(b.ke)} y2={y} stroke="#64748B" strokeWidth={0.9} strokeDasharray="2 2" />
              </>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

const warnaBatang = (rupa: Rupa, benda: string): string => (rupa === "benda" ? (WARNA_BENDA[benda] ?? "#FDBA74") : "#BFDBFE");
const emojiBatang = (rupa: Rupa, benda: string): string | undefined => (rupa === "benda" ? EMOJI_BENDA[benda] : undefined);
const namaBatang = (rupa: Rupa, benda: string): string | undefined => (rupa === "benda" ? undefined : benda);

/* ------------------------------ Jenis garis ------------------------------ */
/** Gambar satu jenis garis dari titik (x, y) selebar `w`. `kiri` dan `kanan`: ditarik terus sampai tepi gambar (anak panah). */
export function JenisSvg({ jenis, x, y, w, warna = UNGU, kiri = false, kanan = false, tebal = 3 }: { jenis: Jenis; x: number; y: number; w: number; warna?: string; kiri?: boolean; kanan?: boolean; tebal?: number }) {
  const x2 = x + w;
  const panahKanan = (ujung: number) => <polygon points={`${ujung + 7},${y} ${ujung - 3},${y - 6} ${ujung - 3},${y + 6}`} fill={warna} />;
  const panahKiri = (ujung: number) => <polygon points={`${ujung - 7},${y} ${ujung + 3},${y - 6} ${ujung + 3},${y + 6}`} fill={warna} />;
  const kiriX = kiri ? Math.max(8, x - 30) : x;
  const kananX = kanan ? Math.min(292, x2 + 30) : x2;
  if (jenis === "kurva")
    return (
      <g aria-hidden="true">
        <path d={`M ${x} ${y + 8} C ${x + w * 0.2} ${y - 26}, ${x + w * 0.4} ${y + 30}, ${x + w * 0.6} ${y - 4} S ${x2 - w * 0.08} ${y - 20}, ${x2} ${y + 6}`} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" />
        <circle cx={x} cy={y + 8} r={4.4} fill={warna} />
        <circle cx={x2} cy={y + 6} r={4.4} fill={warna} />
      </g>
    );
  return (
    <g aria-hidden="true">
      <line x1={jenis === "garis" ? kiriX : x} y1={y} x2={jenis === "ruas garis" ? x2 : kananX} y2={y} stroke={warna} strokeWidth={tebal} strokeLinecap="round" />
      {jenis === "ruas garis" ? (
        <>
          <circle cx={x} cy={y} r={4.8} fill={warna} />
          <circle cx={x2} cy={y} r={4.8} fill={warna} />
        </>
      ) : null}
      {jenis === "sinar garis" ? (
        <>
          <circle cx={x} cy={y} r={4.8} fill={warna} />
          {panahKanan(kananX)}
        </>
      ) : null}
      {jenis === "garis" ? (
        <>
          {panahKiri(kiriX)}
          {panahKanan(kananX)}
        </>
      ) : null}
    </g>
  );
}

/** Tiga benang antara dua paku: lurus, lengkung, berkelok. Dipakai Simulasi (Jalan). */
export function BenangSvg({ jalan, y, warna, sorot = false }: { jalan: "lurus" | "lengkung" | "berkelok"; y: number; warna: string; sorot?: boolean }) {
  const d = jalan === "lurus" ? `M 40 ${y} L 260 ${y}` : jalan === "lengkung" ? `M 40 ${y} Q 150 ${y - 36} 260 ${y}` : `M 40 ${y} C 80 ${y - 24}, 100 ${y + 24}, 140 ${y} S 200 ${y - 24}, 220 ${y + 10} S 250 ${y}, 260 ${y}`;
  return <path d={d} fill="none" stroke={sorot ? "#DC2626" : warna} strokeWidth={sorot ? 4 : 3} strokeLinecap="round" />;
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
export const PapanInfo = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 font-mono">{children}</div>;

/* ------------------------------ Bangun datar ------------------------------ */
/** Titik sudut bangun: persegi panjang dan persegi sejajar sumbu, bangun lain beraturan dengan titik pertama di atas. */
export function titikBangun(b: Bangun, cx: number, cy: number, r: number): [number, number][] {
  const n = b.huruf.length;
  if (b.nama === "persegi panjang") return [[cx - r * 1.15, cy - r * 0.62], [cx + r * 1.15, cy - r * 0.62], [cx + r * 1.15, cy + r * 0.62], [cx - r * 1.15, cy + r * 0.62]];
  if (b.nama === "persegi") return [[cx - r * 0.8, cy - r * 0.8], [cx + r * 0.8, cy - r * 0.8], [cx + r * 0.8, cy + r * 0.8], [cx - r * 0.8, cy + r * 0.8]];
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + (360 * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
}
/** Bangun datar dengan huruf pada titik sudut. `huruf`: banyak titik sudut yang hurufnya sudah tampil (Simulasi); bawaan semuanya. */
export function BangunSvg({ bangun, cx, cy, r, warna, huruf, sorotSisi }: { bangun: Bangun; cx: number; cy: number; r: number; warna: string; huruf?: number; sorotSisi?: string[] }) {
  if (bangun.nama === "lingkaran") return <circle cx={cx} cy={cy} r={r} fill={warna} stroke={UNGU} strokeWidth={2.4} aria-hidden="true" />;
  const t = titikBangun(bangun, cx, cy, r);
  const n = t.length;
  const tampil = huruf ?? n;
  return (
    <g aria-hidden="true">
      <polygon points={t.map((p) => p.join(",")).join(" ")} fill={warna} stroke={UNGU} strokeWidth={2.4} strokeLinejoin="round" />
      {(sorotSisi ?? []).map((s) => {
        const i = bangun.huruf.indexOf(s[0]);
        const j = bangun.huruf.indexOf(s[1]);
        return i >= 0 && j >= 0 ? <line key={s} x1={t[i][0]} y1={t[i][1]} x2={t[j][0]} y2={t[j][1]} stroke="#DC2626" strokeWidth={4.6} strokeLinecap="round" /> : null;
      })}
      {t.map((p, i) => {
        const dx = p[0] - cx;
        const dy = p[1] - cy;
        const d = Math.max(1, Math.hypot(dx, dy));
        return (
          <g key={`${bangun.huruf[i]}${i}`}>
            <circle cx={p[0]} cy={p[1]} r={3.4} fill={i < tampil ? UNGU : "#94A3B8"} />
            {i < tampil ? (
              <text x={p[0] + (dx / d) * 13} y={p[1] + (dy / d) * 13 + 4} textAnchor="middle" fontSize={13} fontWeight={900} fill="#9D174D">
                {bangun.huruf[i]}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilJenis({ l, rupa }: { l: LJenis; rupa: Rupa }) {
  const emoji = emojiBatang(rupa, l.benda);
  const nama = namaBatang(rupa, l.benda);
  return (
    <Gambar label="Jenis garis" judul="lihat ujung garis ini">
      {emoji ? (
        <text x={150} y={52} textAnchor="middle" fontSize={26}>
          {emoji}
        </text>
      ) : nama ? (
        <text x={150} y={48} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {nama}
        </text>
      ) : null}
      <JenisSvg jenis={l.jenis} x={60} y={104} w={160} warna={rupa === "benda" ? "#92400E" : UNGU} />
      <text x={150} y={176} textAnchor="middle" fontSize={14} fontWeight={900} fill={C_TANYA}>
        jenis garis = ?
      </text>
    </Gambar>
  );
}
function TampilBaca({ l, rupa }: { l: LBaca; rupa: Rupa }) {
  const maks = maksSkala(l.ujung);
  return (
    <Gambar label="Membaca penggaris" judul={l.mulai === 0 ? "ujung kiri ruas garis tepat di angka nol" : "perhatikan angka di kedua ujung ruas garis"}>
      <SkalaMm maks={maks} rupa={rupa} batang={[{ dari: l.mulai, ke: l.ujung, y: 80, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: namaBatang(rupa, l.benda) }]} />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {l.sat === "cm" ? "panjang = ? cm" : "panjang = ? mm"}
      </text>
    </Gambar>
  );
}
function TampilUbah({ l, rupa }: { l: LUbah; rupa: Rupa }) {
  return (
    <Gambar label="Sentimeter diubah menjadi milimeter" judul="satu sentimeter dibagi sepuluh milimeter">
      <SkalaMm maks={10} rupa={rupa} ket={false} batang={[{ dari: 0, ke: l.cm * 10, y: 80, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: namaBatang(rupa, l.benda) }]} />
      <text x={150} y={176} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
        1 cm = 10 mm
      </text>
      <text x={150} y={193} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {l.cm} cm = ? mm
      </text>
    </Gambar>
  );
}
function TampilBeda({ l, rupa, cara }: { l: LBeda; rupa: Rupa; cara: Cara }) {
  const emoji = emojiBatang(rupa, l.benda);
  const nama = namaBatang(rupa, l.benda);
  return (
    <Gambar label="Empat gambar, satu berbeda" judul="tiga gambar sejenis, satu berbeda">
      {emoji ? (
        <text x={150} y={42} textAnchor="middle" fontSize={20}>
          {emoji}
        </text>
      ) : nama ? (
        <text x={150} y={38} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#475569">
          {nama}
        </text>
      ) : null}
      {l.gambar.map((j, i) => {
        const x0 = 7 + i * 72;
        return (
          <g key={i}>
            <rect x={x0} y={50} width={66} height={84} rx={8} fill={rupa === "benda" ? "#FEF3C7" : "#F8FAFC"} stroke={UNGU} strokeWidth={1.6} />
            <circle cx={x0 + 12} cy={64} r={9} fill="#FACC15" stroke={UNGU} strokeWidth={1.2} />
            <text x={x0 + 12} y={68} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
              {i + 1}
            </text>
            <JenisSvg jenis={j} x={x0 + 10} y={100} w={46} warna={rupa === "benda" ? "#92400E" : UNGU} tebal={2.4} />
          </g>
        );
      })}
      <text x={150} y={170} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {cara === "kanvas" ? "gambar nomor berapa yang berbeda?" : "jenis gambar yang berbeda = ?"}
      </text>
    </Gambar>
  );
}
function TampilDua({ l, rupa }: { l: LDua; rupa: Rupa }) {
  const warna = warnaBatang(rupa, l.benda);
  const emoji = emojiBatang(rupa, l.benda);
  const nama = namaBatang(rupa, l.benda);
  return (
    <Gambar label="Ruas garis diukur dua kali" judul="diukur dua kali, lalu bandingkan">
      <text x={16} y={30} fontSize={8.6} fontWeight={900} fill="#475569">
        ukuran pertama: ujung kiri di 0
      </text>
      <SkalaMm maks={10} rupa={rupa} ket={false} y={52} batang={[{ dari: 0, ke: l.panjang, y: 34, h: 16, warna, label: nama }]} />
      <text x={16} y={96} fontSize={8.6} fontWeight={900} fill="#475569">
        {l.awal === 0 ? "ukuran kedua: ujung kiri di 0 juga" : "ukuran kedua: ujung kiri bukan di 0"}
      </text>
      <SkalaMm maks={10} rupa={rupa} ket={false} y={118} batang={[{ dari: l.awal, ke: l.awal + l.panjang, y: 100, h: 16, warna, label: nama }]} />
      {emoji ? (
        <text x={286} y={30} textAnchor="end" fontSize={16}>
          {emoji}
        </text>
      ) : null}
      <text x={150} y={176} textAnchor="middle" fontSize={11} fontWeight={800} fill="#475569">
        bacaan ujung kanan: {l.panjang} mm dan {l.awal + l.panjang} mm
      </text>
      <text x={150} y={193} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        ruas garis yang benar = ?
      </text>
    </Gambar>
  );
}
function TampilSisi({ l, rupa, cara }: { l: LSisi; rupa: Rupa; cara: Cara }) {
  const emoji = emojiBatang(rupa, l.benda);
  const nama = namaBatang(rupa, l.benda);
  const warna = rupa === "benda" ? (WARNA_BENDA[l.benda] ?? "#FDBA74") : "#BFDBFE";
  const tanyaBanyak = l.bangun.nama === "lingkaran";
  return (
    <Gambar label="Bangun datar bernama huruf" judul={tanyaBanyak ? "benda bundar" : "titik sudut diberi nama huruf"}>
      {emoji ? (
        <text x={246} y={50} textAnchor="middle" fontSize={22}>
          {emoji}
        </text>
      ) : nama ? (
        <text x={246} y={46} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#475569">
          {nama}
        </text>
      ) : null}
      <BangunSvg bangun={l.bangun} cx={150} cy={102} r={46} warna={warna} />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {cara === "klik" && !tanyaBanyak ? "sisi yang benar = ?" : "banyak sisi = ?"}
      </text>
    </Gambar>
  );
}

const JUDUL_KARTU: Record<string, string> = { jenis: "Mengenali jenis garis", baca: "Membaca penggaris", ubah: "Mengubah satuan", beda: "Mencari yang beda", dua: "Mengukur dua kali", sisi: "Menyebut sisi" };

/** Gambar tugas dasar menurut jenis dan rupa. Abstract memakai kartu kata dan angka. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  switch (d.tipe) {
    case "jenis":
      return <TampilJenis l={d} rupa={rupa} />;
    case "baca":
      return <TampilBaca l={d} rupa={rupa} />;
    case "ubah":
      return <TampilUbah l={d} rupa={rupa} />;
    case "beda":
      return <TampilBeda l={d} rupa={rupa} cara={cara} />;
    case "dua":
      return <TampilDua l={d} rupa={rupa} />;
    case "sisi":
      return <TampilSisi l={d} rupa={rupa} cara={cara} />;
  }
}
