"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BARIS_DATA, DIAGRAM_RINI, JUDUL_INFO, KARTU_ACUAN, PESAN_BELUM_PUTAR, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1 } from "./data-info";
import { DiagramSvg } from "./GambarBazar";
import { ucapkan } from "./logika-cpa";

/**
 * Infografis Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = diagram batang sungguh dari data bersambung Sub-Bab A (jajanan Bu Rini): tiap batang berlabel kosong "?" yang diketuk, dan tombol Putar mengubah diagram tegak menjadi mendatar.
 * Kartu 2 = kartu acuan membaca diagram (tingkat sumbu, telusuri garis, adu batang, jumlah, tegak atau mendatar). Komponen sendiri: gambar dan tata letak mengikuti isi materi.
 */
export default function InfoBazarK4B6({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<number[]>([]);
  const [mendatar, setMendatar] = useState(false);
  const [sudahPutar, setSudahPutar] = useState(false);
  const selesai = buka.length === DIAGRAM_RINI.batang.length && sudahPutar;
  const diagram = { ...DIAGRAM_RINI, arah: mendatar ? ("datar" as const) : ("tegak" as const) };
  const label: Record<number, string> = {};
  DIAGRAM_RINI.batang.forEach((b, i) => {
    label[i] = buka.includes(i) ? String(b.banyak) : "?";
  });
  const ketukBatang = (i: number) => {
    speakGuru(BARIS_DATA[i].suara);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  const putar = () => {
    setMendatar((m) => !m);
    setSudahPutar(true);
    speakGuru(ucapkan(mendatar ? "Diagram kembali tegak. Datanya tetap sama." : "Diagram diputar menjadi mendatar. Datanya tetap sama."));
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status = kartu === 1 ? (selesai ? SELESAI_INFO_1 : buka.length < DIAGRAM_RINI.batang.length ? `Sudah dibuka ${buka.length} dari ${DIAGRAM_RINI.batang.length} batang.` : PESAN_BELUM_PUTAR) : PESAN_INFO_2;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#B91C1C] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(127,29,29,0.3)]" data-uji="diagram-info">
          <p className="mb-1 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEF3C7]">
            {"\u{1F4CA}"} {JUDUL_INFO}: {DIAGRAM_RINI.judul}
          </p>
          <DiagramSvg d={diagram} rupa="benda" label={label} onBatang={ketukBatang} />
          <div className="mt-1 flex justify-center">
            <button type="button" onClick={putar} aria-pressed={mendatar} className="min-h-[44px] rounded-full border-2 border-[#B91C1C] bg-white px-4 text-sm font-black text-[#B91C1C]">
              {"\u{1F504}"} Putar
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#B91C1C] bg-[#FFFBEB] p-3 shadow-[0_5px_0_rgba(127,29,29,0.3)]" data-uji="kartu-acuan">
          <p className="mb-2 rounded-lg bg-[#B91C1C] py-1.5 text-center text-sm font-black text-[#FEF3C7]">Kartu acuan</p>
          <div className="space-y-1.5">
            {KARTU_ACUAN.map((a) => (
              <button key={a.teks} type="button" onClick={() => speakGuru(a.suara)} className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border-[3px] border-[#B91C1C] bg-white px-3 py-1 text-left">
                <span className="text-2xl leading-none" aria-hidden="true">
                  {a.ikon}
                </span>
                <span className="text-sm font-black text-[#1C01A5]">{a.teks}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke diagram">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 ? (
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

export { InfoBazarK4B6 };
