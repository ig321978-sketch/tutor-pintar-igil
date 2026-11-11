"use client";

import React from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { hitungMisi, ucapanMisi, type MisiTampil } from "./misi-simulasi";

/* Papan misi: daftar misi wajib dan tantangan bebas, dengan tanda centang bila tercapai. Dipakai SimulasiAlur. */

export default function PapanMisi({ daftar, tercapai, speakGuru }: { daftar: readonly MisiTampil[]; tercapai: ReadonlySet<string>; speakGuru: (t: string) => void }) {
  const wajib = daftar.filter((m) => m.wajib);
  const bebas = daftar.filter((m) => !m.wajib);
  const h = hitungMisi(daftar, tercapai);

  const baris = (m: MisiTampil) => {
    const ok = tercapai.has(m.id);
    return (
      <li key={m.id} className={`flex items-start gap-2 rounded-xl border-2 px-2 py-1 text-sm font-black leading-snug ${ok ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/20 bg-white text-[#1C01A5]"}`}>
        <span aria-hidden="true" className="mt-0.5 shrink-0">
          {ok ? "✅" : "⬜"}
        </span>
        <span className="min-w-0 flex-1">
          {m.teks}
          <span className="sr-only">{ok ? " Sudah tercapai." : " Belum tercapai."}</span>
        </span>
      </li>
    );
  };

  return (
    <div className="mb-3 space-y-2 rounded-2xl border-4 border-[#1C01A5]/20 bg-white px-3 py-2" aria-label="Papan misi">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Misi {h.wajibTercapai} dari {h.wajibTotal}
          {h.bebasTotal > 0 ? ` • Tantangan bebas ${h.bebasTercapai} dari ${h.bebasTotal}` : ""}
        </p>
        <TombolSuaraGuru kecil label="Dengarkan kemajuan misi" onClick={() => speakGuru(ucapanMisi(daftar, tercapai))} />
      </div>
      <ul className="space-y-1">{wajib.map(baris)}</ul>
      {bebas.length > 0 ? (
        <>
          <p className="pt-1 text-[10px] font-black uppercase tracking-wide text-[#7C4A03]">Tantangan bebas (boleh dilewati)</p>
          <ul className="space-y-1">{bebas.map(baris)}</ul>
        </>
      ) : null}
    </div>
  );
}
