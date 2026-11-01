"use client";

import { useState, type ReactNode } from "react";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { BalokDompet, useJudulDompetMateri, useKepalaDompetSendiri } from "@/components/modul/KepalaDompetMateri";

export const LABEL_EMPAT_HALAMAN = ["1 · Cerita", "2 · Infografis", "3 · Pictorial", "4 · Lambang"] as const;

export function useHalamanKuis(grup: string[][]) {
  const kuis = useKuisMateri();
  const [halaman, setHalaman] = useState(0);
  const selesai = (grup[halaman] ?? []).every((id) => Boolean(kuis?.sudahBenar(id)));
  return { halaman, setHalaman, selesai };
}

export function EmpatHalaman({
  judul,
  halaman,
  setHalaman,
  selesai,
  selesaiTeks,
  children,
}: {
  judul: string;
  halaman: number;
  setHalaman: (nilai: number | ((lama: number) => number)) => void;
  selesai: boolean;
  selesaiTeks: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <p className="text-lg font-black text-[#1C01A5]">Halaman {LABEL_EMPAT_HALAMAN[halaman]}</p>
      {children}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={halaman === 0} onClick={() => setHalaman((n) => Math.max(0, n - 1))} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-[#1C01A5]/20 disabled:opacity-40">Kembali</button>
        {halaman < 3 ? (
          <button type="button" disabled={!selesai} onClick={() => setHalaman((n) => n + 1)} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white disabled:opacity-40">Lanjut</button>
        ) : selesai ? <p className="text-sm font-bold text-emerald-800">{selesaiTeks}</p> : null}
      </div>
    </section>
  );
}

export function PagerSubbab({
  judul,
  grup,
  selesaiTeks,
  isi,
}: {
  judul: string;
  grup: string[][];
  selesaiTeks: string;
  isi: ReactNode[];
}) {
  const { halaman, setHalaman, selesai } = useHalamanKuis(grup);
  return (
    <EmpatHalaman judul={judul} halaman={halaman} setHalaman={setHalaman} selesai={selesai} selesaiTeks={selesaiTeks}>
      {isi[halaman] ?? null}
    </EmpatHalaman>
  );
}

export function BingkaiTabMateri({
  label,
  judul,
  aktif,
  onPilih,
  children,
}: {
  label: string[];
  judul: string;
  aktif: number;
  onPilih: (indeks: number) => void;
  children: ReactNode;
}) {
  useKepalaDompetSendiri();
  useJudulDompetMateri(judul);
  return (
    <section className="scroll-mt-24 space-y-4">
      <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden rounded-none bg-gradient-to-br from-[#eef2ff] via-[#ece8ff] to-[#f7f3ff] text-[#1C01A5] shadow-[0_10px_24px_-18px_rgba(67,56,202,0.55)]">
        <BalokDompet judul={judul} />
        <div role="tablist" aria-label="Bagian materi" className="flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain border-t border-indigo-100 px-3 py-2.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-300/70">
          {label.map((nama, indeks) => {
            const nyala = aktif === indeks;
            return (
              <button
                key={nama}
                type="button"
                role="tab"
                aria-selected={nyala}
                onClick={() => onPilih(indeks)}
                className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-black transition ${nyala ? "bg-[#1C01A5] text-white shadow-[0_3px_0_#F0AB00]" : "bg-white/70 text-indigo-700 ring-1 ring-inset ring-indigo-200/80 hover:bg-white"}`}
              >
                {nama}
              </button>
            );
          })}
        </div>
      </div>
      {children}
    </section>
  );
}

export function TabSubbab({
  label,
  aktif,
  onPilih,
}: {
  label: string[];
  aktif: number;
  onPilih: (indeks: number) => void;
}) {
  return (
    <div role="tablist" aria-label="Bagian materi" className="flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain rounded-none border-t border-indigo-100 bg-gradient-to-br from-[#eef2ff] via-[#ece8ff] to-[#f7f3ff] px-3 py-2.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-300/70">
      {label.map((teks, indeks) => {
        const nyala = aktif === indeks;
        return (
          <button
            key={teks}
            type="button"
            role="tab"
            aria-selected={nyala}
            onClick={() => onPilih(indeks)}
            className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-black transition ${nyala ? "bg-[#1C01A5] text-white shadow-[0_3px_0_#F0AB00]" : "bg-white/70 text-indigo-700 ring-1 ring-inset ring-indigo-200/80 hover:bg-white"}`}
          >
            {teks}
          </button>
        );
      })}
    </div>
  );
}
