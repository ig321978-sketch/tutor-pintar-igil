"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BIRU, BendaDi, BendaSvg, LatarKamar, PoseG, UKURAN_BENDA, UnsurSvg } from "./dasar-k2b4";
import { KAMAR, NAMA_BENDA, ZONA_ACUAN, susunPola, type BendaId } from "./data-k2b4";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 4 (Posisi Benda dan Pola). Gambar saja:      */
/* teks panel dan suara berasal dari naskah-k2b4.ts. Semua dari SVG.           */
/* ------------------------------------------------------------------------ */

const Cap = ({ children, warna = BIRU }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-[11px] font-black leading-tight" style={{ color: warna }}>
    {children}
  </p>
);

const Chip = ({ children, warna = "#FFE566" }: { children: React.ReactNode; warna?: string }) => (
  <span className="inline-block rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
    {children}
  </span>
);

const Ubin = ({ children, ket, warna }: { children: React.ReactNode; ket?: React.ReactNode; warna?: string }) => (
  <KotakPoster warna={warna}>
    <div className="flex justify-center">{children}</div>
    {ket ? <Cap>{ket}</Cap> : null}
  </KotakPoster>
);

/** Adegan kecil 100 x 75 berisi beberapa benda (x, y, w, h). */
function Adegan({ benda, tinggi = "h-32", latar = "#F5E6FA", label }: { benda: { id: BendaId; x: number; y: number; w: number; h: number }[]; tinggi?: string; latar?: string; label: string }) {
  return (
    <svg viewBox="0 0 100 75" className={`mx-auto block w-full max-w-[300px] rounded-xl ${tinggi}`} role="img" aria-label={label}>
      <rect x="0" y="0" width="100" height="75" fill={latar} />
      <rect x="0" y="58" width="100" height="17" fill="#E9D5F2" />
      {benda.map((b, i) => (
        <BendaDi key={i} id={b.id} x={b.x} y={b.y} w={b.w} h={b.h} />
      ))}
    </svg>
  );
}

function BarisUnsur({ jenis, seq, kelas = "h-9 w-9", baju }: { jenis: string; seq: readonly string[]; kelas?: string; baju?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5">
      {seq.map((t, i) => (
        <UnsurSvg key={i} jenis={jenis} token={t} kelas={kelas} baju={baju ? ["#3B82F6", "#EC4899", "#10B981", "#F59E0B"][i % 4] : undefined} />
      ))}
    </div>
  );
}

/** Peta 3 x 3 kecil dengan satu benda acuan. */
function MiniZona({ kata, benda = "buku", acuan = "meja" }: { kata: string; benda?: BendaId; acuan?: BendaId }) {
  const z = ZONA_ACUAN.find((q) => q.id === kata)!;
  const [aw, ah] = UKURAN_BENDA[acuan];
  const [bw, bh] = UKURAN_BENDA[benda];
  const sa = acuan === "meja" ? 1.25 : 1;
  return (
    <svg viewBox="0 0 100 75" className="h-24 w-full max-w-[150px] rounded-xl bg-[#F5E6FA]" role="img" aria-label={`${NAMA_BENDA[benda]} ${kata} ${NAMA_BENDA[acuan]}`}>
      {z.lapis === "belakang" ? <BendaDi id={benda} x={z.x - (bw * z.skala) / 2} y={z.y - (bh * z.skala) / 2} w={bw * z.skala} h={bh * z.skala} /> : null}
      <BendaDi id={acuan} x={50 - (aw * sa) / 2} y={40 - (ah * sa) / 2} w={aw * sa} h={ah * sa} />
      {z.lapis !== "belakang" ? <BendaDi id={benda} x={z.x - (bw * z.skala) / 2} y={z.y - (bh * z.skala) / 2} w={bw * z.skala} h={bh * z.skala} /> : null}
    </svg>
  );
}

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK2B4A(): React.ReactNode[] {
  return [
    /* 1 Enam Kata Posisi */
    <div key="1" className="grid grid-cols-3 items-center gap-1.5">
      <span />
      <Chip warna="#BFDBFE">atas</Chip>
      <span />
      <Chip warna="#FBCFE8">kiri</Chip>
      <BendaSvg id="kotak" kelas="mx-auto h-14 w-14" />
      <Chip warna="#BBF7D0">kanan</Chip>
      <span />
      <Chip warna="#FDE68A">bawah</Chip>
      <span />
      <div className="col-span-3 flex justify-center gap-2 pt-1">
        <Chip warna="#DDD6FE">depan</Chip>
        <Chip warna="#FED7AA">belakang</Chip>
      </div>
    </div>,
    /* 2 Atas dan Bawah */
    <div key="2" className="grid grid-cols-2 gap-2">
      <Ubin ket="kupu-kupu di atas bunga" warna="#DBEAFE">
        <Adegan benda={[{ id: "bunga", x: 38, y: 36, w: 24, h: 36 }, { id: "kupu", x: 38, y: 12, w: 24, h: 20 }]} tinggi="h-28" latar="#E0F2FE" label="Kupu-kupu di atas bunga" />
      </Ubin>
      <Ubin ket="bunga di bawah kupu-kupu" warna="#FEF3C7">
        <Adegan benda={[{ id: "kupu", x: 38, y: 8, w: 24, h: 20 }, { id: "bunga", x: 38, y: 32, w: 24, h: 36 }]} tinggi="h-28" latar="#E0F2FE" label="Bunga di bawah kupu-kupu" />
      </Ubin>
    </div>,
    /* 3 Depan dan Belakang */
    <KotakPoster key="3" warna="#F0FDF4">
      <Adegan benda={[{ id: "ulat", x: 6, y: 42, w: 34, h: 14 }, { id: "burung", x: 50, y: 28, w: 36, h: 28 }]} latar="#E0F2FE" label="Burung berjalan di depan ulat" />
      <div className="flex items-center justify-center gap-2 pt-1">
        <Chip warna="#FED7AA">ulat di belakang</Chip>
        <span className="text-xl font-black text-[#1C01A5]">→</span>
        <Chip warna="#DDD6FE">burung di depan</Chip>
      </div>
    </KotakPoster>,
    /* 4 Kanan dan Kiri */
    <KotakPoster key="4" warna="#F0FDF4">
      <Adegan benda={[{ id: "burung", x: 14, y: 30, w: 30, h: 26 }, { id: "rumput", x: 58, y: 30, w: 30, h: 26 }]} latar="#E0F2FE" label="Burung di sebelah kiri rumput" />
      <div className="flex justify-center gap-2 pt-1">
        <Chip warna="#FBCFE8">kiri: burung</Chip>
        <Chip warna="#BBF7D0">kanan: rumput</Chip>
      </div>
    </KotakPoster>,
    /* 5 Sudut Pandang Pembaca */
    <KotakPoster key="5" warna="#EEF2FF">
      <svg viewBox="0 0 100 75" className="mx-auto block h-32 w-full max-w-[300px] rounded-xl bg-[#E0F2FE]" role="img" aria-label="Anak membelakangi kita, ayam di kirinya dan rumput di kanannya">
        <BendaDi id="ayam" x={10} y={34} w={22} h={22} />
        <BendaDi id="rumput" x={70} y={34} w={22} h={22} />
        <circle cx="50" cy="26" r="9" fill="#1F2937" stroke={BIRU} strokeWidth="1.6" />
        <rect x="40" y="35" width="20" height="26" rx="6" fill="#34D399" stroke={BIRU} strokeWidth="1.6" />
        <path d="M44 61 V72 M56 61 V72" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
        <text x="21" y="28" textAnchor="middle" fontSize="6" fontWeight="900" fill={BIRU}>kiri saya</text>
        <text x="81" y="28" textAnchor="middle" fontSize="6" fontWeight="900" fill={BIRU}>kanan saya</text>
      </svg>
      <Cap>Anak membelakangi kita: kanan dan kirinya sama dengan kita</Cap>
    </KotakPoster>,
    /* 6 Kata yang Berlawanan */
    <div key="6" className="space-y-1.5">
      {[["atas", "bawah", "#BFDBFE", "#FDE68A"], ["depan", "belakang", "#DDD6FE", "#FED7AA"], ["kanan", "kiri", "#BBF7D0", "#FBCFE8"]].map(([a, b, ca, cb]) => (
        <div key={a} className="flex items-center justify-center gap-3">
          <Chip warna={ca}>{a}</Chip>
          <span className="text-xl font-black text-[#1C01A5]">⇄</span>
          <Chip warna={cb}>{b}</Chip>
        </div>
      ))}
    </div>,
    /* 7 Benda Acuan */
    <KotakPoster key="7" warna="#FFFBEB">
      <div className="flex items-center justify-center gap-2">
        <BendaSvg id="buku" kelas="h-10 w-10" />
        <span className="text-xs font-black text-[#1C01A5]">di atas</span>
        <BendaSvg id="meja" kelas="h-14 w-14" />
      </div>
      <div className="flex flex-wrap justify-center gap-1 pt-1">
        <Chip warna="#FFFFFF">buku</Chip>
        <Chip warna="#FFE566">di atas</Chip>
        <Chip warna="#7FCB96">meja</Chip>
      </div>
      <Cap>benda • kata posisi • benda acuan</Cap>
    </KotakPoster>,
    /* 8 Posisi di Kamar */
    <svg key="8" viewBox="0 0 100 75" className="mx-auto block h-40 w-full max-w-[320px] rounded-xl border-4 border-[#1C01A5]" role="img" aria-label="Kamar dengan tempat tidur, meja, kursi, kotak, boneka, sepatu, tas, buku, mobil-mobilan, dan bola">
      <LatarKamar />
      {KAMAR.slice()
        .sort((a, b) => a.z - b.z)
        .map((o) => (
          <BendaDi key={o.id} id={o.id} x={o.x} y={o.y} w={o.w} h={o.h} />
        ))}
    </svg>,
    /* 9 Tebak dari Petunjuk */
    <div key="9" className="space-y-1.5">
      <div className="mx-auto grid max-w-[260px] grid-cols-3 gap-1">
        {["jam", "lukisan", "lampu", "lemari", "ikan", "buku", "boneka", "bola", "pot"].map((n) => (
          <span key={n} className={`flex min-h-9 items-center justify-center rounded-lg border-2 border-[#1C01A5] px-0.5 text-center text-[11px] font-black leading-tight text-[#1C01A5] ${n === "lukisan" ? "bg-[#FFE566]" : "bg-white"}`}>
            {n}
          </span>
        ))}
      </div>
      <Cap>Aku di atas ikan. Aku di sebelah kanan jam. Aku adalah lukisan.</Cap>
    </div>,
    /* 10 Posisi Setelah Dipindah */
    <div key="10" className="grid grid-cols-4 gap-1">
      {(["atas", "kanan", "bawah", "depan"] as const).map((k, i) => (
        <KotakPoster key={k}>
          <MiniZona kata={k} />
          <Cap>{i + 1}. {k}</Cap>
        </KotakPoster>
      ))}
    </div>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK2B4B(): React.ReactNode[] {
  return [
    /* 1 Apa Itu Pola */
    <div key="1" className="space-y-1.5">
      <BarisUnsur jenis="bentuk" seq={susunPola(["lingkaran", "segitiga"], 8)} kelas="h-9 w-9" />
      <div className="flex justify-center gap-2">
        <Chip warna="#FFE566">berulang</Chip>
        <Chip warna="#7FCB96">teratur</Chip>
      </div>
    </div>,
    /* 2 Satuan Pola */
    <div key="2" className="space-y-1.5">
      <div className="flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border-4 border-dashed border-[#DB2777] bg-white px-1 py-0.5">
            <BarisUnsur jenis="warna" seq={["merah", "biru"]} kelas="h-8 w-8" />
          </div>
        ))}
      </div>
      <Cap>Satuan pola: merah, biru</Cap>
    </div>,
    /* 3 Pola Bentuk */
    <div key="3" className="grid grid-cols-2 gap-2">
      <Ubin ket="Taplak meja 1" warna="#FEF3C7">
        <BarisUnsur jenis="bentuk" seq={susunPola(["bintang", "persegi"], 6)} kelas="h-7 w-7" />
      </Ubin>
      <Ubin ket="Taplak meja 2" warna="#FCE7F3">
        <BarisUnsur jenis="bentuk" seq={susunPola(["hati", "hati", "segitiga", "segitiga"], 8)} kelas="h-6 w-6" />
      </Ubin>
    </div>,
    /* 4 Pola Warna */
    <div key="4" className="grid grid-cols-2 gap-2">
      <Ubin ket="Kaus: merah, biru" warna="#DBEAFE">
        <div className="flex flex-col gap-0.5">
          {susunPola(["merah", "biru"], 4).map((w, i) => (
            <span key={i} className="block h-3 w-24 rounded" style={{ backgroundColor: w === "merah" ? "#EF4444" : "#3B82F6" }} />
          ))}
        </div>
      </Ubin>
      <Ubin ket="Manik: jingga, jingga, biru, biru" warna="#FFF7ED">
        <BarisUnsur jenis="warna" seq={susunPola(["jingga", "jingga", "biru", "biru"], 8)} kelas="h-6 w-6" />
      </Ubin>
    </div>,
    /* 5 Pola Gerakan */
    <KotakPoster key="5" warna="#F0FDF4">
      <BarisUnsur jenis="gerakan" seq={susunPola(["membungkuk", "berdiri"], 6)} kelas="h-14 w-11" baju />
      <Cap>membungkuk, berdiri, membungkuk, berdiri</Cap>
    </KotakPoster>,
    /* 6 Pola Suara */
    <div key="6" className="grid grid-cols-4 gap-1">
      {[1, 2, 3, 4].map((n) => (
        <KotakPoster key={n} warna="#FFF7CC">
          <div className="flex flex-wrap justify-center gap-0.5">
            {Array.from({ length: n }, (_, i) => (
              <UnsurSvg key={i} jenis="suara" token="keras" kelas="h-5 w-5" />
            ))}
          </div>
          <Cap>tepuk {n}</Cap>
        </KotakPoster>
      ))}
    </div>,
    /* 7 Kode Huruf */
    <div key="7" className="space-y-2">
      <div>
        <BarisUnsur jenis="warna" seq={susunPola(["merah", "biru"], 6)} kelas="h-8 w-8" />
        <p className="text-center text-base font-black tracking-[0.3em] text-[#1C01A5]">A B A B A B</p>
      </div>
      <div>
        <BarisUnsur jenis="bentuk" seq={susunPola(["hati", "hati", "segitiga"], 6)} kelas="h-8 w-8" />
        <p className="text-center text-base font-black tracking-[0.3em] text-[#1C01A5]">A A B A A B</p>
      </div>
    </div>,
    /* 8 Pola atau Bukan */
    <div key="8" className="space-y-1.5">
      <KotakPoster warna="#DCFCE7">
        <BarisUnsur jenis="bentuk" seq={susunPola(["lingkaran", "segitiga"], 6)} kelas="h-7 w-7" />
        <Cap warna="#14532D">✔ Pola: berulang teratur</Cap>
      </KotakPoster>
      <KotakPoster warna="#FEE2E2">
        <BarisUnsur jenis="bentuk" seq={["lingkaran", "segitiga", "segitiga", "lingkaran", "segitiga", "lingkaran"]} kelas="h-7 w-7" />
        <Cap warna="#B91C1C">✘ Bukan pola: kelompoknya tidak teratur</Cap>
      </KotakPoster>
    </div>,
    /* 9 Melanjutkan Pola */
    <KotakPoster key="9" warna="#EEF2FF">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {["A", "A", "B", "A", "A", "B", "A", "A"].map((t, i) => (
          <span key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#1C01A5] bg-white text-base font-black text-[#1C01A5]">
            {t}
          </span>
        ))}
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-[#DB2777] bg-[#FFF7CC] text-base font-black text-[#DB2777]">B</span>
      </div>
      <Cap>satuan: A A B → berikutnya B</Cap>
    </KotakPoster>,
    /* 10 Pola di Sekitarku */
    <div key="10" className="grid grid-cols-4 gap-1">
      <Ubin ket="warna"><BarisUnsur jenis="warna" seq={["merah", "biru"]} kelas="h-6 w-6" /></Ubin>
      <Ubin ket="bentuk"><BarisUnsur jenis="bentuk" seq={["hati", "segitiga"]} kelas="h-6 w-6" /></Ubin>
      <Ubin ket="gerakan">
        <svg viewBox="0 0 100 100" className="h-10 w-8" aria-hidden="true">
          <PoseG pose="tanganNaik" />
        </svg>
      </Ubin>
      <Ubin ket="suara"><UnsurSvg jenis="suara" token="keras" kelas="h-8 w-8" /></Ubin>
    </div>,
  ];
}

