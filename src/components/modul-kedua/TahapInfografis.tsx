"use client";

import type { DataModul } from "@/lib/modul-kedua/tipe";
import { eja } from "@/lib/modul-kedua/eja";
import TombolSuara from "./TombolSuara";

/** Tahap I (Infografis): satu halaman ringkasan visual (banyak gambar, sedikit kata). Bisa dicetak atau disimpan sebagai PDF. */

const SERAK: [number, number][] = [[8, 6], [52, 30], [20, 52], [74, 8], [96, 46], [40, 14], [66, 58]];

export default function TahapInfografis({ data, saatSelesai }: { data: DataModul; saatSelesai: () => void }) {
  const f = data.infografis;
  const ringkas = [...f.definisi, ...f.aturan, ...f.metode.map((m) => `${m.nama}. ${m.teks}`), f.faktaMenarik].join(" ");
  const jml = f.caraBanyak.jumlah;
  return (
    <section className="space-y-3">
      <style>{`@media print{body *{visibility:hidden}#infografis-k1b1,#infografis-k1b1 *{visibility:visible}#infografis-k1b1{position:absolute;left:0;top:0;width:100%}.tanpa-cetak{display:none!important}}`}</style>
      <h2 className="text-2xl font-black text-indigo-950">I: Rangkuman Bergambar 📋</h2>

      <article id="infografis-k1b1" className="space-y-3 rounded-3xl border-4 border-indigo-900 bg-white p-3">
        <header className="rounded-2xl bg-indigo-700 p-3 text-white">
          <p className="text-sm font-bold">Kelas 1 · Bab 1</p>
          <h3 className="text-xl font-black">{data.subBab}</h3>
        </header>

        <div className="rounded-2xl border-4 border-sky-400 bg-sky-50 p-3">
          <h4 className="text-lg font-black text-sky-950">📘 Bilangan 0 sampai 10</h4>
          <div className="mt-2 grid grid-cols-6 gap-1 text-center">
            {Array.from({ length: 11 }, (_, v) => (
              <div key={v} className="rounded-xl bg-white p-1">
                <p className="text-2xl font-black text-indigo-950">{v}</p>
                <p className="text-[10px] font-bold text-indigo-700">{eja(v)}</p>
              </div>
            ))}
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base font-bold text-indigo-950">
            {f.definisi.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-4 border-emerald-500 bg-emerald-50 p-3">
          <h4 className="text-lg font-black text-emerald-950">✅ Tiga cara membilang</h4>
          <ul className="mt-2 space-y-2">
            {f.metode.map((m) => (
              <li key={m.nama} className="rounded-xl bg-white p-2">
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{m.ikon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-black leading-tight text-emerald-900">{m.nama}</p>
                    <p className="text-xs font-bold italic text-emerald-700">({m.istilah})</p>
                  </div>
                </div>
                <p className="mt-1 text-center text-3xl">{m.gambar}</p>
                <p className="text-center text-sm font-bold text-indigo-950">{m.teks}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-4 border-amber-400 bg-amber-50 p-3">
          <h4 className="text-lg font-black text-amber-950">🔁 Satu bilangan, empat cara menunjukkan</h4>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white p-2"><p className="text-2xl">{"🍎".repeat(jml)}</p><p className="text-sm font-bold text-indigo-900">Benda</p></div>
            <div className="rounded-xl bg-white p-2"><p className="text-2xl text-blue-600">{"● ".repeat(jml).trim()}</p><p className="text-sm font-bold text-indigo-900">Titik</p></div>
            <div className="rounded-xl bg-white p-2"><p className="text-4xl font-black text-indigo-950">{jml}</p><p className="text-sm font-bold text-indigo-900">Angka</p></div>
            <div className="rounded-xl bg-white p-2"><p className="text-3xl font-black text-indigo-950">{f.caraBanyak.kata}</p><p className="text-sm font-bold text-indigo-900">Kata</p></div>
          </div>
        </div>

        <div className="rounded-2xl border-4 border-orange-400 bg-orange-50 p-3">
          <h4 className="text-lg font-black text-orange-950">👀 Berserakan atau berbaris?</h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-2">
              <div className="relative h-20">
                {SERAK.map(([x, y], i) => (
                  <span key={i} className="absolute text-2xl" style={{ left: `${x}%`, top: `${y}%` }}>🍎</span>
                ))}
              </div>
              <p className="text-center text-sm font-bold text-rose-800">Sulit dihitung, mudah terlewat</p>
            </div>
            <div className="rounded-xl bg-white p-2">
              <div className="flex h-20 flex-wrap content-center justify-center text-2xl">{"🍎".repeat(7)}</div>
              <p className="text-center text-sm font-bold text-emerald-800">Mudah dihitung satu per satu</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-4 border-rose-400 bg-rose-50 p-3">
          <h4 className="text-lg font-black text-rose-950">⚠️ Hati-hati</h4>
          <ul className="mt-1 space-y-2">
            {f.miskonsepsi.map((m) => (
              <li key={m.salah} className="rounded-xl bg-white p-2 text-base font-bold">
                <p className="text-rose-800">✖ {m.salah}</p>
                <p className="text-emerald-800">✔ {m.benar}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-4 border-violet-400 bg-violet-50 p-3">
          <h4 className="text-lg font-black text-violet-950">🌟 Tahukah kamu?</h4>
          <p className="text-base font-bold text-indigo-950">{f.faktaMenarik}</p>
        </div>
      </article>

      <div className="tanpa-cetak space-y-2">
        <TombolSuara teks={ringkas} label="Dengarkan ringkasan" />
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-14 w-full rounded-2xl border-4 border-sky-500 bg-sky-100 text-lg font-black text-sky-950"
        >
          🖨️ Cetak atau simpan PDF
        </button>
        <button type="button" onClick={saatSelesai} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
          Aku sudah paham, ayo bermain ➜
        </button>
      </div>
    </section>
  );
}
