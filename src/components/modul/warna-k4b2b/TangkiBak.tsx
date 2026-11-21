import React from "react";
import { LAPIS_BAK } from "./data-kartu";

/**
 * Bak pewarna berdiri untuk Mind-map dan Infografis Kelas 4 Bab 2 Sub-Bab B: delapan lapis sama tinggi, terisi dari bawah sebanyak pembilangnya (digambar sungguh).
 * Kisi tetap (grid), tanpa flex-wrap.
 */
export function TangkiBak({ isi, warna, lebar, lapisTinggi, nama }: { isi: number; warna: string; lebar: number; lapisTinggi: number; nama: string }) {
  return (
    <span
      className="grid overflow-hidden rounded-b-lg border-[3px] border-[#334155] bg-white"
      style={{ width: lebar, gridTemplateRows: `repeat(${LAPIS_BAK}, ${lapisTinggi}px)` }}
      role="img"
      aria-label={`${nama}: ${LAPIS_BAK} bagian sama besar, ${isi} bagian terisi`}
      data-lapis={LAPIS_BAK}
      data-isi={isi}
    >
      {Array.from({ length: LAPIS_BAK }, (_, i) => {
        const terisi = i >= LAPIS_BAK - isi;
        return <span key={i} aria-hidden="true" className={`block ${i > 0 ? "border-t border-[#94A3B8]" : ""}`} style={terisi ? { backgroundColor: warna } : undefined} />;
      })}
    </span>
  );
}
export default TangkiBak;
