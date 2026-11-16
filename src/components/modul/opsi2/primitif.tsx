"use client";

import React, { useState } from "react";
import { BendaSeret, TombolSuaraGuru } from "../tahap-b-gaya";
import type { Pilihan } from "@/lib/opsi2/tipe";

/**
 * Primitif interaksi bersama Opsi 2 (dipakai ulang semua tahap, sub-bab, dan kelas).
 * Semua ramah jari (target sentuh paling kecil 48 piksel) dan dapat dipakai dengan papan ketik
 * (Tab, Enter, Spasi, panah untuk penggeser). Tanpa jaringan. Isi: Benda, PapanBenda, Letak, PilihKata (ketuk pilih),
 * KetukBanyak, SeretKeWadah (seret ke wadah), IsiPetak, Penggeser (geser), HubungkanGaris, KanvasTulis, TombolPeriksa.
 */

export const BIRU = "#1C01A5";
const RING_KEDIP = "igil-denyut bg-[#FFF3B0] ring-4 ring-[#FFC800]";

/** Emoji benda keseharian (paling tinggi U+1FA95). Hanya dipakai di Concrete. */
export const GAMBAR_BENDA: Record<string, string> = {
  apel: "\u{1F34E}",
  jeruk: "\u{1F34A}",
  keranjang: "\u{1F9FA}",
  piring: "\u{1F37D}\u{FE0F}",
  bendera: "\u{1F6A9}",
  daun: "\u{1F343}",
};

/* ------------------------------ Benda yang bisa diketuk ------------------------------ */

export function Benda({
  emoji,
  label,
  ukuran = 36,
  kedip = false,
  tanda = false,
  lencana,
  redup = false,
  aktif = true,
  onKetuk,
  kelas = "",
}: {
  emoji: string;
  label: string;
  ukuran?: number;
  kedip?: boolean;
  /** Benda sudah dihitung atau dipilih: cincin hijau dan lencana. */
  tanda?: boolean;
  /** Lencana pengganti tanda centang (mis. bendera). */
  lencana?: string;
  redup?: boolean;
  aktif?: boolean;
  onKetuk?: () => void;
  kelas?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={tanda}
      disabled={!aktif}
      onClick={onKetuk}
      className={`relative flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full leading-none ${kedip ? RING_KEDIP : ""} ${tanda && !kedip ? "bg-[#DCFCE7] ring-4 ring-[#16A34A]" : ""} ${redup ? "opacity-40" : ""} ${kelas}`}
      style={{ fontSize: ukuran }}
    >
      <span aria-hidden="true">{emoji}</span>
      {(tanda || lencana) && (
        <span className="absolute -right-1 -top-2 text-base" aria-hidden="true">
          {lencana ?? "\u{2705}"}
        </span>
      )}
    </button>
  );
}

/** Papan tempat benda diletakkan dengan koordinat persen (0 sampai 100). Anak-anaknya memakai <Letak>. */
export function PapanBenda({ tinggi = 210, kelas = "bg-[#ECFCCB] border-[#65A30D]", zona, label, children }: { tinggi?: number; kelas?: string; zona?: string; label?: string; children: React.ReactNode }) {
  return (
    <div data-zona={zona} role="group" aria-label={label} className={`relative w-full rounded-2xl border-4 ${kelas}`} style={{ height: tinggi }}>
      {children}
    </div>
  );
}

export function Letak({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
      {children}
    </div>
  );
}

/* ------------------------------ Tombol Periksa ------------------------------ */

export function TombolPeriksa({ onClick, aktif = true, teks = "Periksa" }: { onClick: () => void; aktif?: boolean; teks?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!aktif}
      className="mx-auto flex min-h-[52px] items-center gap-2 rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 text-lg font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)] disabled:opacity-40"
    >
      <span aria-hidden="true">{"\u{2714}\u{FE0F}"}</span>
      {teks}
    </button>
  );
}

/* ------------------------------ Ketuk pilih ------------------------------ */

/**
 * Pilihan jawaban satu per kartu besar. Setiap kartu punya tombol dengar kecil (suara membacakan pilihan),
 * jadi anak yang belum lancar membaca tetap dapat memilih. Pilihan yang sudah keliru dimatikan.
 */
export function PilihKata({
  pilihan,
  salah,
  benarId,
  kedip,
  aktif,
  terkunci,
  onPilih,
  bicara,
  kolom = 2,
}: {
  pilihan: Pilihan[];
  salah: string[];
  /** Id pilihan yang benar, ditampilkan hijau (setelah benar atau setelah percobaan habis). */
  benarId: string | null;
  kedip: string[];
  aktif: boolean;
  terkunci: boolean;
  onPilih: (id: string) => void;
  bicara: (teks: string) => void;
  kolom?: 1 | 2 | 3;
}) {
  return (
    <div role="group" aria-label="Pilihan jawaban" className={`grid gap-2 ${kolom === 1 ? "grid-cols-1" : kolom === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {pilihan.map((p) => {
        const sudahSalah = salah.includes(p.id);
        const benar = benarId === p.id;
        return (
          <div key={p.id} className="flex items-center gap-1">
            <button
              type="button"
              disabled={!aktif || terkunci || sudahSalah}
              aria-label={p.suara}
              onClick={() => onPilih(p.id)}
              className={`min-h-[60px] min-w-0 flex-1 rounded-2xl border-4 px-2 text-xl font-black leading-tight ${
                benar ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8] line-through" : "border-[#1C01A5] bg-white text-[#1C01A5]"
              } ${kedip.includes(p.id) ? RING_KEDIP : ""} ${!aktif && !terkunci ? "opacity-50" : ""}`}
            >
              {p.label}
              {benar ? <span aria-hidden="true"> {"\u{2705}"}</span> : null}
            </button>
            <TombolSuaraGuru kecil label={`Dengar: ${p.suara}`} onClick={() => bicara(p.suara)} />
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ Ketuk banyak ------------------------------ */

export type ItemKetuk = { id: string; isi: string; label: string; x: number; y: number };

/** Benda di papan yang dapat dinyalakan atau dimatikan dengan ketukan (memilih beberapa). */
export function KetukBanyak({
  item,
  dipilih,
  onUbah,
  kedip,
  terkunci,
  tinggi,
  ukuran = 36,
}: {
  item: ItemKetuk[];
  dipilih: string[];
  onUbah: (ids: string[]) => void;
  kedip: string[];
  terkunci: boolean;
  tinggi?: number;
  ukuran?: number;
}) {
  return (
    <PapanBenda tinggi={tinggi} label="Papan benda">
      {item.map((it) => (
        <Letak key={it.id} x={it.x} y={it.y}>
          <Benda
            emoji={it.isi}
            label={it.label}
            ukuran={ukuran}
            tanda={dipilih.includes(it.id)}
            kedip={kedip.includes(it.id)}
            aktif={!terkunci}
            onKetuk={() => onUbah(dipilih.includes(it.id) ? dipilih.filter((x) => x !== it.id) : [...dipilih, it.id])}
          />
        </Letak>
      ))}
    </PapanBenda>
  );
}

/* ------------------------------ Seret ke wadah ------------------------------ */

export type ItemSeret = { id: string; isi: string; label: string; x?: number; y?: number };
export type ZonaSeret = {
  id: string;
  label: string;
  kelas?: string;
  /** Menggambar isi wadah. Bawaan: benda berjajar membungkus baris. `tampil(id)` menggambar satu benda yang bisa dipegang. */
  render?: (ids: string[], tampil: (id: string) => React.ReactNode) => React.ReactNode;
};

/** Mencari wadah di titik layar, mengabaikan benda yang sedang dipegang dan benda lain. */
function zonaDiTitik(x: number, y: number, sah: Set<string>): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.matches('[role="button"]') || el.closest("[data-seret]")) continue;
    const z = el.closest("[data-zona]")?.getAttribute("data-zona");
    if (z && sah.has(z)) return z;
  }
  return null;
}

/**
 * Benda dipindah ke wadah dengan menyeret atau mengetuk (papan ketik: Tab lalu Enter atau Spasi).
 * `penempatan` memetakan id benda ke id wadah; benda tanpa penempatan ada di papan asal. Urutan kunci = urutan masuk.
 * Mengetuk benda di papan asal memasukkannya ke wadah `ketukKe`; mengetuk benda di wadah mengembalikannya ke papan.
 */
export function SeretKeWadah({
  item,
  zona,
  penempatan,
  onUbah,
  ketukKe,
  kedip,
  terkunci,
  tinggiAsal = 200,
  ukuran = 34,
  labelAsal = "Papan benda",
}: {
  item: ItemSeret[];
  zona: ZonaSeret[];
  penempatan: Record<string, string>;
  onUbah: (p: Record<string, string>) => void;
  ketukKe: string;
  kedip: string[];
  terkunci: boolean;
  tinggiAsal?: number;
  ukuran?: number;
  labelAsal?: string;
}) {
  const peta = new Map(item.map((it) => [it.id, it]));
  const sah = new Set(zona.map((z) => z.id));
  const pindah = (id: string, tujuan: string | null) => {
    const sisa = Object.fromEntries(Object.entries(penempatan).filter(([k]) => k !== id));
    onUbah(tujuan ? { ...sisa, [id]: tujuan } : sisa);
  };
  const tampil = (id: string) => {
    const it = peta.get(id);
    if (!it) return null;
    return (
      <BendaSeret
        key={id}
        id={id}
        aktif={!terkunci}
        label={it.label}
        onKetuk={(i) => pindah(i, penempatan[i] ? null : ketukKe)}
        onLepas={(i, x, y) => pindah(i, zonaDiTitik(x, y, sah))}
        kelas="rounded-full"
      >
        <div data-seret="" className={`flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full leading-none ${kedip.includes(id) ? RING_KEDIP : ""}`} style={{ fontSize: ukuran }}>
          <span aria-hidden="true">{it.isi}</span>
        </div>
      </BendaSeret>
    );
  };
  const diAsal = item.filter((it) => !penempatan[it.id]);
  return (
    <div className="space-y-2">
      <PapanBenda tinggi={tinggiAsal} zona="asal" label={labelAsal}>
        {diAsal.map((it) => (
          <Letak key={it.id} x={it.x ?? 50} y={it.y ?? 50}>
            {tampil(it.id)}
          </Letak>
        ))}
      </PapanBenda>
      {zona.map((z) => {
        const ids = Object.entries(penempatan)
          .filter(([, v]) => v === z.id)
          .map(([k]) => k);
        return (
          <div key={z.id} data-zona={z.id} role="group" aria-label={z.label} className={z.kelas ?? "rounded-2xl border-4 border-dashed border-[#92400E] bg-[#FEF3C7] p-2"}>
            {z.render ? z.render(ids, tampil) : <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-1">{ids.map((id) => tampil(id))}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ Isi petak ------------------------------ */

/**
 * Kisi petak (baris x kolom) yang diketuk untuk diisi atau dikosongkan. `isi` menggambar isi petak terisi.
 * Dipakai untuk nampan, bingkai, dan petak diagram. `bisaDiketuk(i)` membatasi petak yang boleh diketuk.
 */
export function IsiPetak({
  baris,
  kolom,
  terisi,
  onKetuk,
  isi,
  kedip,
  terkunci,
  bisaDiketuk,
  idPetak = (i) => `l${i + 1}`,
  kelas = "bg-[#FDE68A] border-[#92400E]",
}: {
  baris: number;
  kolom: number;
  terisi: boolean[];
  onKetuk: (indeks: number) => void;
  isi?: (indeks: number) => React.ReactNode;
  kedip: string[];
  terkunci: boolean;
  bisaDiketuk?: (indeks: number) => boolean;
  idPetak?: (indeks: number) => string;
  kelas?: string;
}) {
  return (
    <div role="group" aria-label="Petak" className={`grid gap-1 rounded-2xl border-4 p-2 ${kelas}`} style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))` }}>
      {Array.from({ length: baris * kolom }, (_, i) => {
        const boleh = !terkunci && (bisaDiketuk ? bisaDiketuk(i) : true);
        return (
          <button
            key={i}
            type="button"
            disabled={!boleh}
            aria-label={`Petak ${i + 1} ${terisi[i] ? "terisi" : "kosong"}`}
            onClick={() => onKetuk(i)}
            className={`flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#92400E]/60 bg-[#FFFBEB] text-3xl leading-none ${kedip.includes(idPetak(i)) ? RING_KEDIP : ""}`}
          >
            {terisi[i] ? (isi ? isi(i) : <span aria-hidden="true">{"\u{26AB}"}</span>) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ Geser (penggeser bertanda) ------------------------------ */

/** Penggeser bilangan bulat. Papan ketik: panah kiri dan kanan. Untuk penanda pada garis bilangan di tahap Picture. */
export function Penggeser({ min, maks, posisi, onUbah, label, terkunci }: { min: number; maks: number; posisi: number; onUbah: (n: number) => void; label: string; terkunci: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2">
      <input
        type="range"
        min={min}
        max={maks}
        step={1}
        value={posisi}
        disabled={terkunci}
        aria-label={label}
        onChange={(e) => onUbah(Number(e.target.value))}
        className="h-12 w-full cursor-pointer accent-[#1C01A5]"
      />
    </div>
  );
}

/* ------------------------------ Hubungkan garis ------------------------------ */

export type ItemHubung = { id: string; isi: React.ReactNode; label: string };
const TINGGI_BARIS = 64;
const JARAK_BARIS = 8;

/**
 * Dua kolom kartu. Ketuk satu kartu kiri lalu satu kartu kanan untuk menarik garis; ketuk kartu yang sudah
 * berhubungan untuk melepas. `hubungan` berisi pasangan [idKiri, idKanan].
 */
export function HubungkanGaris({
  kiri,
  kanan,
  hubungan,
  onUbah,
  kedip,
  terkunci,
}: {
  kiri: ItemHubung[];
  kanan: ItemHubung[];
  hubungan: [string, string][];
  onUbah: (h: [string, string][]) => void;
  kedip: string[];
  terkunci: boolean;
}) {
  const [pegang, setPegang] = useState<string | null>(null);
  const baris = Math.max(kiri.length, kanan.length);
  const tinggi = baris * TINGGI_BARIS + (baris - 1) * JARAK_BARIS;
  const pusatY = (i: number) => i * (TINGGI_BARIS + JARAK_BARIS) + TINGGI_BARIS / 2;
  const ketukKiri = (id: string) => {
    if (hubungan.some(([a]) => a === id)) {
      onUbah(hubungan.filter(([a]) => a !== id));
      setPegang(null);
    } else setPegang(pegang === id ? null : id);
  };
  const ketukKanan = (id: string) => {
    if (pegang) {
      onUbah([...hubungan.filter(([a, b]) => a !== pegang && b !== id), [pegang, id]]);
      setPegang(null);
    } else if (hubungan.some(([, b]) => b === id)) onUbah(hubungan.filter(([, b]) => b !== id));
  };
  const kartu = (it: ItemHubung, sisi: "kiri" | "kanan") => {
    const terhubung = hubungan.some(([a, b]) => (sisi === "kiri" ? a : b) === it.id);
    return (
      <button
        key={it.id}
        type="button"
        disabled={terkunci}
        aria-label={`${it.label}${terhubung ? ", sudah terhubung" : ""}`}
        aria-pressed={pegang === it.id}
        onClick={() => (sisi === "kiri" ? ketukKiri(it.id) : ketukKanan(it.id))}
        className={`flex items-center justify-center rounded-2xl border-4 bg-white px-2 text-2xl font-black text-[#1C01A5] ${pegang === it.id ? "border-[#FFC800] bg-[#FFF3B0]" : terhubung ? "border-[#16A34A]" : "border-[#1C01A5]"} ${kedip.includes(it.id) ? RING_KEDIP : ""}`}
        style={{ height: TINGGI_BARIS }}
      >
        {it.isi}
      </button>
    );
  };
  return (
    <div className="relative grid grid-cols-[1fr_1fr] gap-x-[34%]" style={{ rowGap: JARAK_BARIS }}>
      <div className="flex flex-col" style={{ gap: JARAK_BARIS }}>{kiri.map((it) => kartu(it, "kiri"))}</div>
      <div className="flex flex-col" style={{ gap: JARAK_BARIS }}>{kanan.map((it) => kartu(it, "kanan"))}</div>
      <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-full" viewBox={`0 0 100 ${tinggi}`} preserveAspectRatio="none">
        {hubungan.map(([a, b]) => {
          const i = kiri.findIndex((x) => x.id === a);
          const j = kanan.findIndex((x) => x.id === b);
          if (i < 0 || j < 0) return null;
          return <line key={`${a}-${b}`} x1={33} y1={pusatY(i)} x2={67} y2={pusatY(j)} stroke="#16A34A" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
    </div>
  );
}

/* ------------------------------ Kanvas tulis ------------------------------ */

export type Titik = { x: number; y: number };
export type Goresan = Titik[];

/** Kanvas tulis dengan jari atau tetikus. Goresan dikembalikan sebagai daftar titik (0 sampai `lebar`/`tinggi`); pemeriksaan dilakukan pemanggil. */
export function KanvasTulis({
  lebar = 240,
  tinggi = 240,
  goresan,
  onUbah,
  terkunci,
  panduan,
}: {
  lebar?: number;
  tinggi?: number;
  goresan: Goresan[];
  onUbah: (g: Goresan[]) => void;
  terkunci: boolean;
  /** Gambar panduan di belakang (mis. lambang pudar). */
  panduan?: React.ReactNode;
}) {
  const [sedang, setSedang] = useState<Goresan | null>(null);
  const titikDari = (e: React.PointerEvent<SVGSVGElement>): Titik => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: Math.round(((e.clientX - r.left) / r.width) * lebar), y: Math.round(((e.clientY - r.top) / r.height) * tinggi) };
  };
  const garis = (g: Goresan) => g.map((t) => `${t.x},${t.y}`).join(" ");
  return (
    <div className="space-y-2">
      <svg
        role="img"
        aria-label="Kanvas tulis"
        viewBox={`0 0 ${lebar} ${tinggi}`}
        className="mx-auto w-full max-w-[320px] touch-none select-none rounded-2xl border-4 border-[#1C01A5] bg-white"
        onPointerDown={(e) => {
          if (terkunci) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setSedang([titikDari(e)]);
        }}
        onPointerMove={(e) => {
          if (sedang) setSedang([...sedang, titikDari(e)]);
        }}
        onPointerUp={() => {
          if (sedang && sedang.length > 0) onUbah([...goresan, sedang]);
          setSedang(null);
        }}
        onPointerCancel={() => setSedang(null)}
      >
        {panduan}
        {[...goresan, ...(sedang ? [sedang] : [])].map((g, i) => (
          <polyline key={i} points={garis(g.length === 1 ? [g[0], { x: g[0].x + 0.1, y: g[0].y }] : g)} fill="none" stroke={BIRU} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
      <div className="flex justify-center">
        <button type="button" disabled={terkunci || goresan.length === 0} onClick={() => onUbah([])} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-5 text-base font-black text-[#1C01A5] disabled:opacity-40">
          {"\u{1F9FD}"} Hapus
        </button>
      </div>
    </div>
  );
}
