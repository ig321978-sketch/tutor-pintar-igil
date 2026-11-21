"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BlokLima, Glyph } from "./GlyphAngklung";
import {
  DERET_INFO,
  PEGANGAN_INFO,
  PETUNJUK1_INFO_ANGKLUNG,
  PETUNJUK2_INFO_ANGKLUNG,
  SELESAI1_INFO_ANGKLUNG,
  SELESAI2_INFO_ANGKLUNG,
  selisihKe,
  suaraBanyak,
  suaraSelisih,
  teksSelisih,
  type PeganganInfo,
} from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = tabel selisih dua deret (dua, empat, enam, delapan, sepuluh; tujuh, lima, tiga, satu) dengan angklung sungguhan disusun per lima; banyak, selisih, dan jenis pola kosong sampai diketuk.
 * Kartu 2 = kartu pegangan Bu Ratri: enam gambar kecil (membesar, mengecil, berhenti di nol, tiga cara pintar); arti di sampingnya kosong sampai diketuk. Digital saja.
 */
function GambarPegangan({ g }: { g: PeganganInfo["gambar"] }) {
  const label = `Gambar kecil ${g}`;
  if (g === "lima") return <BlokLima n={10} label="Sepuluh angklung disusun dua baris berisi lima" />;
  if (g === "gambar")
    return (
      <svg viewBox="0 0 44 14" width={44} height={14} role="img" aria-label="Dua angklung lalu satu angklung putus-putus">
        <Glyph x={0} />
        <Glyph x={13} />
        <Glyph x={26} hantu />
      </svg>
    );
  return (
    <svg viewBox="0 0 44 28" width={44} height={28} role="img" aria-label={label}>
      {g === "tumbuh" || g === "kecil" || g === "habis" ? (
        <g fill="#F59E0B" stroke="#78350F" strokeWidth={1.2}>
          {(g === "tumbuh" ? [6, 14, 22] : g === "kecil" ? [22, 14, 6] : [22, 14, 6, 0]).map((h, k) =>
            h > 0 ? <rect key={k} x={2 + k * 10} y={26 - h} width={8} height={h} /> : <rect key={k} x={2 + k * 10} y={24} width={8} height={2} fill="none" strokeDasharray="2 1.5" />,
          )}
        </g>
      ) : null}
      {g === "tabel" ? (
        <g fill="#FFFFFF" stroke="#78350F" strokeWidth={1.4}>
          <rect x={2} y={3} width={40} height={22} />
          <line x1={2} y1={14} x2={42} y2={14} />
          <line x1={15} y1={3} x2={15} y2={25} />
          <line x1={28} y1={3} x2={28} y2={25} />
        </g>
      ) : null}
    </svg>
  );
}

export default function DaftarAngklungK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  // Kotak kartu 1: tiap deret punya banyak yang belum terlihat, selisih (kecuali deret pertama), dan satu jenis pola.
  const total1 = DERET_INFO.reduce((s, d) => s + (d.banyak.length - d.terlihat) + (d.banyak.length - 1) + 1, 0);
  const buka1 = buka.filter((k) => k.startsWith("d-")).length;
  const buka2 = buka.filter((k) => k.startsWith("p-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === PEGANGAN_INFO.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_ANGKLUNG : PETUNJUK2_INFO_ANGKLUNG;

  const kotak = (kunci: string, suara: string, aria: string, isi: React.ReactNode, tinggi: string, kelas = "text-sm") => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex ${tinggi} w-full min-w-0 flex-col items-center justify-center rounded-lg border-[3px] px-0.5 text-center font-black leading-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"} ${kelas}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-1.5" data-uji="info-angklung">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-0.5 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl space-y-1.5" data-uji="tabel-selisih">
          {DERET_INFO.map((d) => {
            const n = d.banyak.length;
            const kolom = `2.7rem repeat(${n}, minmax(0, 1fr))`;
            return (
              <div key={d.kunci} className="rounded-xl border-4 border-[#B45309] bg-[#FEF3C7] p-1.5" data-uji={`deret-${d.kunci}`}>
                <p className="sr-only">{d.nama}</p>
                <div className="grid items-center gap-1" style={{ gridTemplateColumns: kolom }}>
                  <span aria-hidden="true" className="text-[10px] font-black leading-none text-[#78350F]">
                    Deret
                  </span>
                  {d.banyak.map((_, i) => (
                    <span key={i} aria-hidden="true" className="text-center text-[11px] font-black leading-none text-[#78350F]">
                      {i + 1}
                    </span>
                  ))}
                  <span aria-hidden="true" className="text-[10px] font-black leading-none text-[#78350F]">
                    Banyak
                  </span>
                  {d.banyak.map((b, i) =>
                    i < d.terlihat ? (
                      <div key={i} className="flex h-[52px] flex-col items-center justify-center rounded-lg bg-white/90">
                        <span className="text-base font-black leading-none text-[#451A03]">{b}</span>
                        <BlokLima n={b} label={`${b} angklung`} />
                      </div>
                    ) : (
                      kotak(
                        `d-${d.kunci}-b${i}`,
                        suaraBanyak(d, i),
                        `Banyak deret ${i + 1}: ${b}`,
                        <>
                          <span className="text-base leading-none text-[#451A03]">{b}</span>
                          <BlokLima n={b} label={`${b} angklung`} />
                        </>,
                        "h-[52px]",
                      )
                    ),
                  )}
                  <span aria-hidden="true" className="text-[10px] font-black leading-none text-[#78350F]">
                    Selisih
                  </span>
                  {d.banyak.map((_, i) => {
                    const s = selisihKe(d.banyak, i);
                    if (s === null) return <span key={i} aria-hidden="true" className="text-center text-sm font-black text-[#92400E]">–</span>;
                    return kotak(`d-${d.kunci}-s${i}`, suaraSelisih(d, i), `Selisih deret ${i + 1}: ${teksSelisih(s)}`, <span className={s > 0 ? "text-[#15803D]" : "text-[#B91C1C]"}>{teksSelisih(s)}</span>, "h-[40px]", "text-base");
                  })}
                </div>
                <div className="mt-1">{kotak(`d-${d.kunci}-j`, d.suaraJenis, `Jenis pola: ${d.jenis}`, d.jenis, "h-[40px]")}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-xl border-4 border-[#B45309] bg-[#FEF3C7] p-1.5" data-uji="kartu-pegangan">
          <p className="sr-only">Kartu pegangan Bu Ratri</p>
          <div className="space-y-1">
            {PEGANGAN_INFO.map((p) => (
              <div key={p.kunci} className="grid grid-cols-[1fr_1fr] items-center gap-1.5 rounded-lg bg-white/80 p-1">
                <div className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 text-center">
                  <GambarPegangan g={p.gambar} />
                  <span className="text-xs font-black leading-tight text-[#78350F]">{p.kiri}</span>
                </div>
                {kotak(`p-${p.kunci}`, p.suara, `Arti ${p.kiri}: ${p.isi}`, p.isi, "min-h-[48px]", "text-[13px]")}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.1rem] text-center text-sm font-black leading-tight text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_ANGKLUNG : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_ANGKLUNG : `Sudah dibuka ${buka2} dari ${PEGANGAN_INFO.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke tabel selisih">
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
    </div>
  );
}
export { DaftarAngklungK4B3 };
