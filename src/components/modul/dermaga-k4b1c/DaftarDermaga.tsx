"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  ACUAN_GARIS,
  JUDUL_KARTU1_DERMAGA,
  JUDUL_KARTU2_DERMAGA,
  KOLOM_PANTAI,
  PANTAI,
  PETUNJUK1_INFO_DERMAGA,
  PETUNJUK2_INFO_DERMAGA,
  SELESAI1_INFO_DERMAGA,
  SELESAI2_INFO_DERMAGA,
  TANDA_GARIS,
  URUT_NAIK,
  URUT_TURUN,
  titik,
  type SelInfo,
} from "./data-info";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = panggung tiga pantai (Barat 4.358, Timur 4.385, Selatan 4.538) berbalok naik; urutan dan tempat pembeda tiap pantai tertutup (?) sampai diketuk.
 * Kartu 2 = garis bilangan dermaga dengan tiga titik; dua tanda di antara titik, urutan kecil ke besar, dan urutan besar ke kecil tertutup. Digital saja.
 */
export default function DaftarDermagaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const ids1 = KOLOM_PANTAI.flatMap((k) => [k.urutan.id, k.beda.id]);
  const ids2 = [...TANDA_GARIS.map((t) => t.sel.id), URUT_NAIK.id, URUT_TURUN.id];
  const buka1 = ids1.filter((i) => buka.includes(i)).length;
  const buka2 = ids2.filter((i) => buka.includes(i)).length;
  const selesai1 = buka1 === ids1.length;
  const selesai2 = buka2 === ids2.length;
  const ketuk = (s: SelInfo) => {
    speakGuru(s.suara);
    if (!buka.includes(s.id)) setBuka((b) => [...b, s.id]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_DERMAGA : PETUNJUK2_INFO_DERMAGA;

  const sel = (s: SelInfo, aria: string, gaya = "min-h-[50px]", besar = false) => {
    const t = buka.includes(s.id);
    return (
      <button
        key={s.id}
        type="button"
        onClick={() => ketuk(s)}
        aria-label={t ? `${aria}: ${s.tampil}` : `Isi kosong: ${aria}`}
        className={`flex ${gaya} w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-1 text-center font-black leading-tight ${t ? `lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5] ${besar ? "text-2xl" : "text-[12px]"}` : "border-dashed border-[#B45309] bg-white/80 text-xl text-[#B45309]"}`}
      >
        <span className="min-w-0 break-words">{t ? s.tampil : "?"}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-dermaga">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[6px] border-[#0369A1] bg-[#BAE6FD] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="panggung-pantai">
          <p className="mb-1.5 rounded-md bg-[#0369A1] py-0.5 text-center text-sm font-black text-[#FDE68A]">{JUDUL_KARTU1_DERMAGA}</p>
          <div className="grid grid-cols-3 items-end gap-1.5">
            {KOLOM_PANTAI.map((k) => (
              <div key={k.id} className="flex flex-col gap-1" data-pantai={k.id}>
                <p className="text-center text-[10px] font-black text-[#0C4A6E]">urutan</p>
                {sel(k.urutan, `Pantai ${k.nama}, urutan`, "min-h-[44px]")}
                <p className="text-center text-[10px] font-black text-[#0C4A6E]">pembeda</p>
                {sel(k.beda, `Pantai ${k.nama}, tempat pembeda`, "min-h-[52px]")}
                <div className="flex flex-col items-center justify-center rounded-t-lg border-[3px] border-b-0 border-[#78350F] bg-[#D6A460] text-center leading-tight" style={{ height: k.tinggi }} data-jumlah={k.jumlah} role="img" aria-label={`Pantai ${k.nama}: ${titik(k.jumlah)} pengunjung`}>
                  <span className="text-lg" aria-hidden="true">
                    {k.ikon}
                  </span>
                  <span className="text-[11px] font-black text-[#78350F]">{k.nama}</span>
                  <span className="text-sm font-black text-[#1C01A5]">{titik(k.jumlah)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="h-2 rounded-b-md bg-[#78350F]" aria-hidden="true" />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[6px] border-[#78350F] bg-[#FDE9B8] p-2 shadow-[0_5px_0_rgba(120,53,15,0.4)]" data-uji="garis-dermaga">
          <p className="mb-1.5 rounded-md bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">{JUDUL_KARTU2_DERMAGA}</p>
          <div className="rounded-xl bg-[#E0F2FE] p-1.5">
            <div className="grid grid-cols-5 items-end gap-0.5">
              {[0, 1, 2, 3, 4].map((c) =>
                c % 2 === 0 ? (
                  <p key={c} className="text-center text-[13px] font-black text-[#1C01A5]" data-jumlah={PANTAI[c / 2].jumlah}>
                    {titik(PANTAI[c / 2].jumlah)}
                  </p>
                ) : (
                  <div key={c} className="pb-0.5">
                    {sel(TANDA_GARIS[(c - 1) / 2].sel, `Tanda antara ${PANTAI[(c - 1) / 2].nama} dan ${PANTAI[(c + 1) / 2].nama}`, "min-h-[40px]", true)}
                  </div>
                ),
              )}
            </div>
            <div className="relative my-1 grid h-6 grid-cols-5 items-center" aria-hidden="true">
              <div className="absolute left-1 right-3 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-[#78350F]" />
              <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-l-[12px] border-y-transparent border-l-[#78350F]" />
              {[0, 1, 2, 3, 4].map((c) => (
                <div key={c} className="relative flex justify-center">
                  {c % 2 === 0 ? <span className="block h-5 w-5 rounded-full border-[3px] border-white bg-[#F97316]" /> : null}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-0.5">
              {[0, 1, 2, 3, 4].map((c) => (
                <p key={c} className="text-center text-[11px] font-black text-[#0C4A6E]">
                  {c % 2 === 0 ? PANTAI[c / 2].nama : ""}
                </p>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[11px] font-black text-[#78350F]" aria-hidden="true">
              <span>kecil</span>
              <span>besar</span>
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <div className="space-y-0.5">
              <p className="text-center text-[10px] font-black text-[#78350F]">kecil ke besar</p>
              {sel(URUT_NAIK, "urutan dari terkecil", "min-h-[48px]")}
            </div>
            <div className="space-y-0.5">
              <p className="text-center text-[10px] font-black text-[#78350F]">besar ke kecil</p>
              {sel(URUT_TURUN, "urutan dari terbesar", "min-h-[48px]")}
            </div>
          </div>
          <p className="mt-1.5 rounded-lg border-2 border-[#78350F] bg-white px-2 py-1 text-center text-xs font-black leading-tight text-[#78350F]">{ACUAN_GARIS}</p>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_DERMAGA : `Sudah dibuka ${buka1} dari ${ids1.length} kotak.`) : selesai2 ? SELESAI2_INFO_DERMAGA : `Sudah dibuka ${buka2} dari ${ids2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke panggung pantai">
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
export { DaftarDermagaK4B1 };
