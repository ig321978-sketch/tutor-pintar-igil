"use client";

import { useState } from "react";

export function GamePapanKelipatan({ onMenang }: { onMenang?: () => void }) {
  const [langkah, setLangkah] = useState(4);
  const [pilih, setPilih] = useState<number | null>(null);
  const cocok = pilih !== null && pilih % langkah === 0;
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Papan tepuk kelipatan</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {[3, 4, 6].map((angka) => (
          <button key={angka} type="button" onClick={() => { setLangkah(angka); setPilih(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${langkah === angka ? "bg-[#1C01A5] text-white" : "bg-sky-100 text-[#1C01A5]"}`}>Kelipatan {angka}</button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1">
        {Array.from({ length: 24 }, (_, indeks) => indeks + 1).map((angka) => {
          const nyala = angka % langkah === 0;
          return (
            <button
              key={angka}
              type="button"
              onClick={() => {
                setPilih(angka);
                if (angka % langkah === 0) onMenang?.();
              }}
              className={`rounded-lg py-2 text-sm font-black ${nyala ? "bg-amber-300 text-[#1C01A5]" : "bg-slate-100 text-slate-600"} ${pilih === angka ? "ring-2 ring-[#1C01A5]" : ""}`}
            >
              {angka}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        {pilih === null ? `Kotak kuning adalah kelipatan ${langkah}. Nol tidak ikut.` : cocok ? `${pilih} adalah kelipatan ${langkah}, karena ${pilih / langkah} × ${langkah} = ${pilih}.` : `${pilih} bukan kelipatan ${langkah}. Ada sisa kalau dibagi.`}
      </p>
    </div>
  );
}

export function GamePitaFaktor({ onMenang }: { onMenang?: () => void }) {
  const [bagi, setBagi] = useState(5);
  const habis = 12 % bagi === 0;
  const potong = habis ? 12 / bagi : 0;
  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Pita 12 petak</p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 12 }, (_, indeks) => {
          const warna = habis ? ["bg-rose-400", "bg-amber-300", "bg-teal-400", "bg-sky-400"][Math.floor(indeks / bagi) % 4] : "bg-slate-300";
          return <span key={indeks} className={`h-8 flex-1 rounded ${warna}`} />;
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 12].map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setBagi(angka);
              if (12 % angka === 0) onMenang?.();
            }}
            className={`rounded-full px-3 py-1 text-sm font-black ${bagi === angka ? "bg-[#1C01A5] text-white" : "bg-rose-100 text-[#1C01A5]"}`}
          >
            Bagi {angka}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{habis ? `Habis. ${potong} potong, tiap potong ${bagi} petak. ${bagi} adalah faktor 12.` : `Ada sisa. ${bagi} bukan faktor 12.`}</p>
    </div>
  );
}

const LANGKAH_SARING = [
  "Belum disaring. Semua bilangan masih ada.",
  "Coret 1. Satu bukan bilangan prima.",
  "Ambil 2. Coret kelipatan 2 yang berikutnya.",
  "Ambil 3. Coret kelipatan 3 yang berikutnya.",
  "Ambil 5. Coret kelipatan 5 yang berikutnya.",
  "Ambil 7. Kelipatan 7 yang lain sudah hilang. Yang tersisa adalah prima.",
];

function saring(angka: number, langkah: number): boolean {
  if (langkah >= 1 && angka === 1) return true;
  if (langkah >= 2 && angka % 2 === 0 && angka !== 2) return true;
  if (langkah >= 3 && angka % 3 === 0 && angka !== 3) return true;
  if (langkah >= 4 && angka % 5 === 0 && angka !== 5) return true;
  if (langkah >= 5 && angka % 7 === 0 && angka !== 7) return true;
  return false;
}

export function GameSaringanPrima({ onMenang }: { onMenang?: () => void }) {
  const [langkah, setLangkah] = useState(0);
  const sisa = Array.from({ length: 30 }, (_, indeks) => indeks + 1).filter((angka) => !saring(angka, langkah) && !(langkah >= 1 && angka === 1));
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Saringan Eratosthenes, 1 sampai 30</p>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {Array.from({ length: 30 }, (_, indeks) => indeks + 1).map((angka) => {
          const hilang = saring(angka, langkah);
          return <span key={angka} className={`rounded-lg py-2 text-center text-sm font-black ${hilang ? "bg-slate-200 text-slate-400 line-through" : "bg-violet-100 text-[#1C01A5]"}`}>{angka}</span>;
        })}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{LANGKAH_SARING[langkah]}</p>
      {langkah === 5 ? <p className="mt-1 text-sm font-bold text-violet-800">Prima sampai 30: {sisa.join(", ")}. Ada {sisa.length} bilangan.</p> : null}
      <button
        type="button"
        onClick={() => setLangkah((lama) => {
          const berikut = lama >= 5 ? 0 : lama + 1;
          if (berikut === 5) onMenang?.();
          return berikut;
        })}
        className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white"
      >
        {langkah >= 5 ? "Ulangi saringan" : "Saring berikutnya"}
      </button>
    </div>
  );
}
