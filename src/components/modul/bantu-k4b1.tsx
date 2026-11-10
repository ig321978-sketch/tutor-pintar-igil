"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { KoleksiDari } from "./dasar-k4b1";
import { KartuModel } from "./diagram-k4b1";
import { angkaTempat, kata, kataRelasi, lambang, relasi, tempatBeda, TEKS_SYARAT, type Syarat } from "./data-k4b1";

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const wadahDari = (benda: BendaId): string => BENDA_INFO[benda].wadah;
export const namaDari = (benda: BendaId): string => BENDA_INFO[benda].nama;

export function syaratBenda(syarat: Syarat, benda: BendaId): string {
  const w = wadahDari(benda);
  switch (syarat) {
    case "puluhan-nol":
      return `tidak punya ${w} (puluhannya 0)`;
    case "satuan-nol":
      return "tidak punya benda lepas (satuannya 0)";
    case "ratusan-nol":
      return "tidak punya dus (ratusannya 0)";
    case "ribuan-lebih-5":
      return "punya lebih dari 5 peti";
    case "ribuan-3":
      return "punya 3 peti";
    case "ratusan-2":
      return "punya 2 dus";
    case "angka-nol":
      return "ada peti, dus, bungkus, atau benda yang kosong (memuat angka 0)";
    default:
      return TEKS_SYARAT[syarat as Exclude<Syarat, "lebih" | "kurang">] ?? String(syarat);
  }
}

export const Koleksi = ({ n, benda, ukuran = 22 }: { n: number; benda: BendaId; ukuran?: number }) => <KoleksiDari n={n} benda={benda} ukuran={ukuran} />;
export const Model = ({ n, skala = 0.5 }: { n: number; skala?: number }) => <KartuModel n={n} skala={skala} />;
export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => <span className={`font-black text-[#1C01A5] ${kelas}`}>{typeof n === "number" ? lambang(n) : n}</span>;
export const Kata = ({ n }: { n: number }) => <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>;

export function DuaKoleksi({ a, b, benda, ukuran = 26 }: { a: number; b: number; benda: BendaId; ukuran?: number }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {(
        [
          ["Kumpulan A", a],
          ["Kumpulan B", b],
        ] as const
      ).map(([nama, n]) => (
        <div key={nama} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
          <KoleksiDari n={n} benda={benda} ukuran={ukuran} />
          <span className="text-[11px] font-black text-[#1C01A5]">{nama}</span>
          <span className="text-[10px] font-black text-amber-700">{lambang(n)}</span>
        </div>
      ))}
    </div>
  );
}

export function DuaModel({ a, b, skala = 0.45 }: { a: number; b: number; skala?: number }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {(
        [
          ["Model A", a],
          ["Model B", b],
        ] as const
      ).map(([nama, n]) => (
        <div key={nama} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
          <KartuModel n={n} skala={skala} />
          <span className="text-[11px] font-black text-[#1C01A5]">{nama}</span>
        </div>
      ))}
    </div>
  );
}

export function penjelasanBanding(a: number, b: number): string {
  const r = relasi(a, b);
  const t = tempatBeda(a, b);
  if (t === "sama") return `${a} dan ${b} sama pada semua tempat, jadi ${a} sama dengan ${b}.`;
  return `Tempat ${t} yang menentukan: ${angkaTempat(a, t)} ${t} dan ${angkaTempat(b, t)} ${t}. Jadi ${a} ${kataRelasi(r)} ${b}.`;
}

export function TambahKoleksi({ a, b, benda, ukuran = 22 }: { a: number; b: number; benda: BendaId; ukuran?: number }) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5">
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KoleksiDari n={a} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{a}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">+</span>
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KoleksiDari n={b} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{b}</span>
      </div>
    </div>
  );
}

export function TambahModel({ a, b, skala = 0.45 }: { a: number; b: number; skala?: number }) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5">
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KartuModel n={a} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{a}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">+</span>
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KartuModel n={b} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{b}</span>
      </div>
    </div>
  );
}

export function KurangKoleksi({ a, b, benda, ukuran = 22 }: { a: number; b: number; benda: BendaId; ukuran?: number }) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5">
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KoleksiDari n={a} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{a}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">−</span>
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KoleksiDari n={b} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{b}</span>
      </div>
    </div>
  );
}

export function KurangModel({ a, b, skala = 0.45 }: { a: number; b: number; skala?: number }) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5">
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KartuModel n={a} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{a}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">−</span>
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KartuModel n={b} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{b}</span>
      </div>
    </div>
  );
}

/** Array perkalian: a kelompok berisi b benda, atau titik polos di tahap Picture. */
export function ArrayKali({ a, b, benda = "kue", kecil = false, titik = false }: { a: number; b: number; benda?: BendaId; kecil?: boolean; titik?: boolean }) {
  const baris = Math.min(a, kecil ? 6 : 12);
  const kolom = Math.min(b, kecil ? 6 : 10);
  const ukuran = kecil || titik ? 10 : 16;
  return (
    <div className="flex flex-col items-center gap-0.5" role="img" aria-label={`${a} × ${b}`}>
      <div className="flex flex-col gap-0.5 rounded-xl border-2 border-[#1C01A5]/25 bg-white px-1.5 py-1">
        {Array.from({ length: baris }, (_, i) => (
          <div key={i} className="flex gap-0.5">
            {Array.from({ length: kolom }, (_, j) =>
              titik ? (
                <span key={j} className="inline-block rounded-full bg-red-500" style={{ width: ukuran, height: ukuran }} />
              ) : (
                <span key={j} className="inline-flex items-center justify-center leading-none" style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.85 }}>
                  {benda === "kelereng" ? "🔵" : benda === "jeruk" ? "🍊" : "🍪"}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
      <span className="text-[10px] font-black text-[#1C01A5]">{a} × {b}{a > baris || b > kolom ? " (cuplikan)" : ""}</span>
    </div>
  );
}

/** Model pembagian: total benda dibagi ke sejumlah kelompok. */
export function BagiKelompok({ total, kelompok, benda = "kue", kecil = false }: { total: number; kelompok: number; benda?: BendaId; kecil?: boolean }) {
  const isi = Math.floor(total / kelompok);
  const tampil = Math.min(kelompok, kecil ? 4 : 6);
  const ukuran = kecil ? 10 : 14;
  const e = benda === "kelereng" ? "🔵" : benda === "jeruk" ? "🍊" : "🍪";
  return (
    <div className="flex flex-col items-center gap-1" role="img" aria-label={`${total} : ${kelompok}`}>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {Array.from({ length: tampil }, (_, i) => (
          <div key={i} className="flex flex-wrap gap-0.5 rounded-lg border-2 border-indigo-200 bg-indigo-50 px-1 py-0.5">
            {Array.from({ length: Math.min(isi, kecil ? 6 : 12) }, (_, j) => (
              <span key={j} style={{ fontSize: ukuran }}>{e}</span>
            ))}
          </div>
        ))}
      </div>
      <span className="text-[10px] font-black text-[#1C01A5]">{total} : {kelompok}{kelompok > tampil ? " (cuplikan)" : ""}</span>
    </div>
  );
}
