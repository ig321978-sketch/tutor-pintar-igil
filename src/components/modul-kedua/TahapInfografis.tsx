"use client";

import type { DataModul } from "@/lib/modul-kedua/tipe";
import TombolSuara from "./TombolSuara";

/** Tahap I (Infografis): satu halaman ringkasan visual. Bisa dicetak atau disimpan sebagai PDF lewat dialog cetak peramban. */
export default function TahapInfografis({ data, saatSelesai }: { data: DataModul; saatSelesai: () => void }) {
  const f = data.infografis;
  const ringkas = [...f.definisi, ...f.aturan, f.faktaMenarik].join(" ");
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
          <h4 className="text-lg font-black text-sky-950">📘 Apa itu bilangan?</h4>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base font-bold text-indigo-950">
            {f.definisi.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-4 border-emerald-500 bg-emerald-50 p-3">
          <h4 className="text-lg font-black text-emerald-950">✅ Aturan menghitung</h4>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-base font-bold text-indigo-950">
            {f.aturan.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border-4 border-amber-400 bg-amber-50 p-3">
          <h4 className="text-lg font-black text-amber-950">⭐ Contoh kunci</h4>
          <ul className="mt-1 space-y-2">
            {f.contoh.map((c) => (
              <li key={c.teks} className="rounded-xl bg-white p-2">
                <p className="text-2xl">{c.visual}</p>
                <p className="text-base font-bold text-indigo-950">{c.teks}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-4 border-rose-400 bg-rose-50 p-3">
          <h4 className="text-lg font-black text-rose-950">⚠️ Hati-hati, kesalahan yang sering terjadi</h4>
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
