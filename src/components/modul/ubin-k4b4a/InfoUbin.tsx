"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { DENAH_UBIN, JUDUL_PAPAN_INFO, PETUNJUK1_INFO_UBIN, PETUNJUK2_INFO_UBIN, SELESAI1_INFO_UBIN, SELESAI2_INFO_UBIN, TANGGA_INFO, suaraDenah, teksKali, teksLuasDenah, type DenahInfo } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 4 Sub-Bab A (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = papan jalan Bu Sinta dengan tiga denah kecil (lantai maket, lantai kolam, denah Genta); ubin tiap denah digambar sungguhan, baris kali kolom dan luas (dengan satuan) kosong sampai diketuk.
 * Kartu 2 = tangga satuan dari meter persegi ke sentimeter persegi; empat kotak kosong diketuk. Digital saja.
 */
const MiniDenah = ({ d }: { d: DenahInfo }) => {
  const s = d.k >= 6 ? 9 : 11;
  return (
    <span className="grid gap-px" style={{ gridTemplateColumns: `repeat(${d.k}, ${s}px)` }} role="img" aria-label={`${d.nama}: ${d.b} baris, ${d.k} kolom ubin`} data-baris={d.b} data-kolom={d.k}>
      {Array.from({ length: d.b * d.k }, (_, i) => (
        <span key={i} aria-hidden="true" className="block border border-[#0369A1] bg-[#BAE6FD]" style={{ width: s, height: s }} />
      ))}
    </span>
  );
};

export default function InfoUbin({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = DENAH_UBIN.length * 2;
  const buka1 = buka.filter((k) => k.startsWith("d-")).length;
  const buka2 = buka.filter((k) => k.startsWith("t-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === TANGGA_INFO.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_UBIN : PETUNJUK2_INFO_UBIN;

  const kotak = (kunci: string, suara: string, isi: string, aria: string, kecil = false) => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex min-h-[48px] w-full items-center justify-center rounded-lg border-[3px] px-1 text-center font-black ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"} ${kecil ? "text-xs" : "text-sm"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-3" data-uji="info-ubin">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#78350F] bg-[#FDE9B8] p-2 shadow-[0_5px_0_rgba(120,53,15,0.4)]" data-uji="papan-jalan">
          <p className="mx-auto mb-2 w-fit rounded-md border-2 border-[#475569] bg-[#E2E8F0] px-3 py-0.5 text-xs font-black text-[#1E293B]">{JUDUL_PAPAN_INFO}</p>
          <div className="space-y-1.5">
            {DENAH_UBIN.map((d) => (
              <div key={d.kunci} className="grid grid-cols-[1fr_5.2rem_5.2rem] items-center gap-1.5 rounded-md border-2 border-[#CBD5E1] bg-white p-1.5">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black leading-none text-[#78350F]">{d.nama}</span>
                  <MiniDenah d={d} />
                </div>
                {kotak(`d-${d.kunci}-0`, suaraDenah(d, 0), teksKali(d), `Baris kali kolom: ${d.b} kali ${d.k}`)}
                {kotak(`d-${d.kunci}-1`, suaraDenah(d, 1), teksLuasDenah(d), `Luas: ${teksLuasDenah(d)}`)}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-[1fr_5.2rem_5.2rem] gap-1.5 text-center text-[10px] font-black text-[#78350F]" aria-hidden="true">
            <span>denah</span>
            <span>baris × kolom</span>
            <span>luas</span>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-[#E0F2FE] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="tangga-info">
          <div className="mb-2 flex items-center justify-center gap-3" role="img" aria-label="Ubin 1 meter kali 1 meter berisi 100 kali 100 sentimeter; tiap kotak kecil 10 sentimeter kali 10 sentimeter">
            <span className="grid gap-px border-2 border-[#0369A1] bg-[#0369A1]" style={{ gridTemplateColumns: "repeat(10, 7px)" }} data-baris={10} data-kolom={10}>
              {Array.from({ length: 100 }, (_, i) => (
                <span key={i} aria-hidden="true" className="block h-[7px] w-[7px] bg-[#BAE6FD]" />
              ))}
            </span>
            <span className="space-y-0.5 text-left text-[11px] font-black leading-tight text-[#0C4A6E]">
              <span className="block">Ubin 1 m × 1 m</span>
              <span className="block">tiap sisi 100 cm</span>
              <span className="block text-[10px] text-[#0369A1]">kotak kecil: 10 cm × 10 cm</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {TANGGA_INFO.map((t) => (
              <div key={t.kunci} className="space-y-1 rounded-lg bg-white/80 p-1.5">
                <p className="text-center text-[11px] font-black leading-tight text-[#0C4A6E]">{t.label}</p>
                {kotak(`t-${t.kunci}`, t.suara, t.isi, `${t.label}: ${t.isi}`, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_UBIN : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_UBIN : `Sudah dibuka ${buka2} dari ${TANGGA_INFO.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan jalan">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
export { InfoUbin };
