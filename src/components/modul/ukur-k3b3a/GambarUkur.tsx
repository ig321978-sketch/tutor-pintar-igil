"use client";

import React from "react";
import { barisKartu, dasarDari, maksSkala, tiapSkala, type Cara, type Langkah, type LAcuan, type LAlat, type LBaca, type LKira, type LPita, type LSatuan, type LSelisih, type Rupa, type Sat } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab A (mengukur panjang dengan satuan baku):
 * penggaris dan meteran bergaris dengan batang benda (Concrete: benda kebun binatang beremoji, Pictorial: batang polos berwarna), pita bergaris, deret kuku jari, dan kartu kata dan angka (Abstract).
 * Dipakai bersama oleh tugas CPA (LangkahUkur) dan Simulasi Meja Ukur.
 */
const UNGU = "#1C01A5";
const C_TANYA = "#D97706";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda kebun binatang untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). */
export const EMOJI_BENDA: Record<string, string> = {
  krayon: "\u{1F58D}",
  pensil: "\u{270F}",
  wortel: "\u{1F955}",
  jagung: "\u{1F33D}",
  "kardus pakan": "\u{1F4E6}",
  "kuku kelinci": "\u{1F407}",
  "ekor kura-kura": "\u{1F422}",
  "pagar kambing": "\u{1F410}",
  "kandang burung beo": "\u{1F99C}",
  "jalan setapak rusa": "\u{1F98C}",
  "kandang mini": "\u{1F407}",
  papan: "\u{1F422}",
};
const WARNA_BENDA: Record<string, string> = { krayon: "#FCA5A5", pensil: "#FDE047", wortel: "#FDBA74", jagung: "#FDE68A", "kardus pakan": "#D6A15E", "kuku kelinci": "#E5E7EB", "ekor kura-kura": "#86EFAC", "pagar kambing": "#D6A15E", "kandang burung beo": "#86EFAC", "jalan setapak rusa": "#E7D3A5" };

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

export type Batang = { dari: number; ke: number; y: number; h?: number; warna: string; label?: string; emoji?: string; putus?: boolean; sorot?: boolean; tanya?: boolean };

/** Penggaris (sentimeter) atau meteran (meter) sepanjang `maks` dengan batang benda di atasnya. Angka tiap `tiap` satuan. `pita`: pita kertas merah muda. */
export function SkalaSvg({ maks, sat, batang, y = 118, pita = false, rupa, tanyaUjung }: { maks: number; sat: Sat; batang: Batang[]; y?: number; pita?: boolean; rupa: Rupa; tanyaUjung?: number }) {
  const tiap = tiapSkala(maks, sat);
  const px = (v: number): number => 20 + (260 * v) / maks;
  const badan = pita ? "#FBCFE8" : sat === "m" ? "#FCD34D" : rupa === "benda" ? "#FDE68A" : "#E0F2FE";
  const garisBadan = pita ? "#BE185D" : rupa === "benda" ? "#92400E" : UNGU;
  return (
    <g aria-hidden="true">
      <rect x={14} y={y} width={272} height={26} rx={3} fill={badan} stroke={garisBadan} strokeWidth={1.6} />
      {Array.from({ length: maks + 1 }, (_, i) => (
        <g key={i}>
          <line x1={px(i)} y1={y} x2={px(i)} y2={y + (i % 5 === 0 || sat === "m" ? 11 : 7)} stroke={UNGU} strokeWidth={i % 5 === 0 ? 1.4 : 0.9} />
          {i % tiap === 0 ? (
            <text x={px(i)} y={y + 22} textAnchor="middle" fontSize={maks > 20 ? 7 : 8.4} fontWeight={800} fill={UNGU}>
              {i}
            </text>
          ) : null}
        </g>
      ))}
      <text x={282} y={y + 40} textAnchor="end" fontSize={9} fontWeight={900} fill="#475569">
        {pita ? "pita bergaris, satuan " : "satuan "}
        {sat}
      </text>
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
      {tanyaUjung !== undefined ? (
        <text x={px(tanyaUjung)} y={y - 2} textAnchor="middle" fontSize={15} fontWeight={900} fill={C_TANYA}>
          ?
        </text>
      ) : null}
    </g>
  );
}

const warnaBatang = (rupa: Rupa, benda: string): string => (rupa === "benda" ? (WARNA_BENDA[benda] ?? "#FDBA74") : "#BFDBFE");
const emojiBatang = (rupa: Rupa, benda: string): string | undefined => (rupa === "benda" ? EMOJI_BENDA[benda] : undefined);
const namaBatang = (rupa: Rupa, benda: string): string | undefined => (rupa === "benda" ? undefined : benda);

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#E5E7EB] bg-[#1F3D2B] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#FDE68A]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-white">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#92400E] bg-[#2F5D3F] p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilBaca({ l, rupa }: { l: LBaca; rupa: Rupa }) {
  const sat = l.sat ?? "cm";
  const maks = maksSkala(l.ujung, sat);
  return (
    <Gambar label="Membaca penggaris" judul={l.mulai === 0 ? "ujung kiri benda tepat di angka nol" : "perhatikan angka di kedua ujung benda"}>
      <SkalaSvg maks={maks} sat={sat} rupa={rupa} batang={[{ dari: l.mulai, ke: l.ujung, y: 80, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: namaBatang(rupa, l.benda) }]} />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        panjang benda = ?
      </text>
    </Gambar>
  );
}
function TampilKira({ l, rupa, cara }: { l: LKira; rupa: Rupa; cara: Cara }) {
  const maks = maksSkala(Math.max(l.ukur, l.perkiraan), "cm");
  return (
    <Gambar label="Perkiraan dan hasil ukur" judul="perkirakan dulu, lalu periksa dengan penggaris">
      <SkalaSvg
        maks={maks}
        sat="cm"
        rupa={rupa}
        batang={[
          { dari: 0, ke: l.perkiraan, y: 38, h: 20, warna: "#FFFFFF", putus: true, label: `perkiraan ${l.perkiraan} cm` },
          { dari: 0, ke: l.ukur, y: 78, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: namaBatang(rupa, l.benda) },
        ]}
      />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        {cara === "klik" ? "hasil ukur = ?" : cara === "kanvas" ? "selisih = ?" : "dekat atau jauh?"}
      </text>
    </Gambar>
  );
}
function TampilAcuan({ l, rupa }: { l: LAcuan; rupa: Rupa }) {
  const w = Math.min(22, 252 / l.kuku);
  const x0 = (300 - l.kuku * w) / 2;
  const emoji = emojiBatang(rupa, l.benda);
  const nama = namaBatang(rupa, l.benda);
  return (
    <Gambar label="Lebar kuku jari sebagai acuan" judul="satu kuku jari kira-kira satu sentimeter">
      <rect x={24} y={34} width={24} height={16} rx={7} fill="#FBCFE8" stroke="#BE185D" strokeWidth={1.4} />
      <text x={56} y={46} fontSize={10} fontWeight={900} fill="#9D174D">
        = 1 cm (acuan)
      </text>
      {emoji ? (
        <text x={150} y={96} textAnchor="middle" fontSize={22}>
          {emoji}
        </text>
      ) : nama ? (
        <text x={150} y={92} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
          {nama}
        </text>
      ) : null}
      {Array.from({ length: l.kuku }, (_, i) => (
        <rect key={i} x={x0 + i * w + 0.5} y={104} width={w - 1} height={26} rx={Math.min(7, w / 3)} fill={rupa === "benda" ? "#FBCFE8" : "#BFDBFE"} stroke={rupa === "benda" ? "#BE185D" : UNGU} strokeWidth={1.1} />
      ))}
      <text x={150} y={156} textAnchor="middle" fontSize={11} fontWeight={800} fill="#475569">
        lebar benda = {l.kuku} kuku
      </text>
      <text x={150} y={184} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        panjang benda = ? cm
      </text>
    </Gambar>
  );
}
function TampilPita({ l, rupa }: { l: LPita; rupa: Rupa }) {
  const maks = maksSkala(l.panjang, l.sat);
  return (
    <Gambar label="Pita penggaris di ujung benda" judul="ujung pita di ujung benda, angka nol ada di sana">
      <SkalaSvg maks={maks} sat={l.sat} rupa={rupa} pita batang={[{ dari: 0, ke: l.panjang, y: 80, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: namaBatang(rupa, l.benda) }]} tanyaUjung={l.panjang} />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        panjang benda = ?
      </text>
    </Gambar>
  );
}
function TampilSelisih({ l, rupa }: { l: LSelisih; rupa: Rupa }) {
  const maks = maksSkala(l.a, l.sat);
  return (
    <Gambar label="Dua benda diukur dengan pita" judul="dua benda, dua panjang">
      <SkalaSvg
        maks={maks}
        sat={l.sat}
        rupa={rupa}
        pita
        batang={[
          { dari: 0, ke: l.a, y: 34, h: 22, warna: warnaBatang(rupa, l.benda), emoji: emojiBatang(rupa, l.benda), label: "pertama" },
          { dari: 0, ke: l.b, y: 76, h: 22, warna: rupa === "benda" ? "#BBF7D0" : "#E2E8F0", label: "kedua" },
        ]}
      />
      <text x={150} y={186} textAnchor="middle" fontSize={13} fontWeight={900} fill={C_TANYA}>
        selisih panjang = ?
      </text>
    </Gambar>
  );
}
function TampilUkuran({ l, rupa }: { l: LAlat | LSatuan; rupa: Rupa }) {
  const emoji = emojiBatang(rupa, l.benda);
  const alat = l.tipe === "alat";
  const lebar = l.sat === "m" ? 230 : 64;
  return (
    <Gambar label={alat ? "Benda yang akan diukur" : "Ukuran benda tanpa satuan"} judul={alat ? "penggaris untuk benda pendek, meteran untuk benda panjang" : "sentimeter atau meter?"}>
      {emoji ? (
        <text x={150} y={78} textAnchor="middle" fontSize={40}>
          {emoji}
        </text>
      ) : (
        <text x={150} y={66} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {l.benda}
        </text>
      )}
      <rect x={150 - lebar / 2} y={92} width={lebar} height={18} rx={4} fill={rupa === "benda" ? "#FDE68A" : "#BFDBFE"} stroke={UNGU} strokeWidth={1.6} />
      <text x={150} y={138} textAnchor="middle" fontSize={17} fontWeight={900} fill={UNGU}>
        {alat ? `panjangnya ${l.panjang} ${l.sat}` : `ukurannya ${l.panjang}`}
      </text>
      <text x={150} y={176} textAnchor="middle" fontSize={14} fontWeight={900} fill={C_TANYA}>
        {alat ? "alat ukur: ?" : "satuan: ?"}
      </text>
    </Gambar>
  );
}

/** Gambar tugas dasar menurut jenis dan rupa. Abstract memakai kartu kata dan angka. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={d.tipe === "alat" ? "Memilih alat ukur" : d.tipe === "satuan" ? "Memilih satuan" : d.tipe === "kira" ? "Perkiraan dan hasil ukur" : d.tipe === "acuan" ? "Ukuran acuan" : d.tipe === "pita" ? "Pita penggaris" : d.tipe === "selisih" ? "Selisih dua panjang" : "Membaca penggaris"} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  switch (d.tipe) {
    case "baca":
      return <TampilBaca l={d} rupa={rupa} />;
    case "kira":
      return <TampilKira l={d} rupa={rupa} cara={cara} />;
    case "acuan":
      return <TampilAcuan l={d} rupa={rupa} />;
    case "pita":
      return <TampilPita l={d} rupa={rupa} />;
    case "selisih":
      return <TampilSelisih l={d} rupa={rupa} />;
    case "alat":
    case "satuan":
      return <TampilUkuran l={d} rupa={rupa} />;
  }
}
