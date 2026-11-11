"use client";

import React, { useState } from "react";

/* ------------------------------------------------------------------------ */
/* Laboratorium bertahap (pola hibrida): satu meja kerja, alat bertambah per    */
/* sub-bab. Semua alat tetap terpasang (disembunyikan) supaya keadaan tidak     */
/* hilang saat anak berpindah tab. Bila hanya ada satu alat, tab tidak tampil.  */
/* Tiap alat melapor ke papan misi lewat onKeadaan (lihat misi-simulasi.ts).    */
/* ------------------------------------------------------------------------ */

export type TabLab = { id: string; nama: string; render: () => React.ReactNode };

export default function LabBertahap({ tab, label = "Alat laboratorium" }: { tab: TabLab[]; label?: string }) {
  const [aktif, setAktif] = useState(tab[0]?.id ?? "");

  return (
    <div className="space-y-3">
      {tab.length > 1 ? (
        <div role="tablist" aria-label={label} className="flex flex-wrap gap-1.5">
          {tab.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={aktif === t.id}
              onClick={() => setAktif(t.id)}
              className={`min-h-11 rounded-2xl border-4 px-3 py-1.5 text-sm font-black ${
                aktif === t.id ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]" : "border-[#BDB4F6] bg-white text-[#1C01A5]"
              }`}
            >
              {t.nama}
            </button>
          ))}
        </div>
      ) : null}
      {tab.map((t) => (
        <div key={t.id} role="tabpanel" hidden={aktif !== t.id}>
          {t.render()}
        </div>
      ))}
    </div>
  );
}
