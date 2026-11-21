import React from "react";

/**
 * Pecahan bertingkat kecil (pembilang di atas, garis, penyebut di bawah) untuk Mind-map dan Infografis Kelas 4 Bab 2.
 * Dipakai bersama oleh Sub-Bab A dan B. Ukuran huruf paling kecil 12 px.
 */
export function Pec({ p, q, besar = false, warnaP, warnaQ }: { p: number; q: number; besar?: boolean; warnaP?: string; warnaQ?: string }) {
  const ukuran = besar ? "text-[18px]" : "text-[13px]";
  return (
    <span className="inline-flex flex-col items-center align-middle font-black leading-none text-[#1C01A5]" role="img" aria-label={`${p} per ${q}`} data-pembilang={p} data-penyebut={q}>
      <span className={`px-0.5 ${ukuran}`} style={warnaP ? { color: warnaP } : undefined}>
        {p}
      </span>
      <span className={`my-px block w-full bg-current ${besar ? "h-[3px]" : "h-[2px]"}`} aria-hidden="true" />
      <span className={`px-0.5 ${ukuran}`} style={warnaQ ? { color: warnaQ } : undefined}>
        {q}
      </span>
    </span>
  );
}
export default Pec;
