"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  ARSIR,
  BEDA_X,
  BEDA_Y,
  KPK_BEDA,
  PETUNJUK1_INFO_ADONAN,
  PETUNJUK2_INFO_ADONAN,
  SEL_KARTU1,
  SEL_KARTU2,
  SELESAI1_INFO_ADONAN,
  SELESAI2_INFO_ADONAN,
  SEL_ARSIR,
  SEL_BEDA,
  SEL_CARA1,
  SEL_CARA2,
  SEL_KPK,
  SEL_PERIKSA,
  SEL_SAMAKAN,
  SEL_SEDERHANA,
  SEL_SYARAT,
  SEL_UBAH,
  type SelInfo,
} from "./data-kartu";
import { PapanBar, TeksBaris } from "./GambarAdonan";

/**
 * Infografis Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = loyang Bu Nani: bar model arsir lima per delapan dikurangi dua per delapan (digambar sungguh dari data), syarat penyebut sama, dan dua cara
 * mengurangkan pecahan campuran berpenyebut sama. Kartu 2 = papan sisa persediaan: bar tiga per empat dan satu per tiga yang disamakan ke dua belas bagian,
 * hasil, campuran berpenyebut beda (ubah ke biasa, samakan, sederhanakan), dan periksa dengan penjumlahan.
 * Sel kosong (?) diketuk, isinya muncul dan dibacakan Guru; kartu berikutnya baru terbuka setelah semua sel terbuka. Digital saja.
 */
const tampil = (t: string): string => t.replace(/ - /g, " \u{2212} ");

export default function InfoAdonan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const kunci1 = SEL_KARTU1.map((s) => s.kunci);
  const kunci2 = SEL_KARTU2.map((s) => s.kunci);
  const buka1 = kunci1.filter((k) => buka.includes(k)).length;
  const buka2 = kunci2.filter((k) => buka.includes(k)).length;
  const selesai1 = buka1 === kunci1.length;
  const selesai2 = buka2 === kunci2.length;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_ADONAN : PETUNJUK2_INFO_ADONAN;
  const ketuk = (s: SelInfo) => {
    speakGuru(s.suara);
    if (!buka.includes(s.kunci)) setBuka((b) => [...b, s.kunci]);
  };
  const sel = (s: SelInfo, tinggi = "min-h-[44px]") => {
    const terbuka = buka.includes(s.kunci);
    return (
      <button
        key={s.kunci}
        type="button"
        onClick={() => ketuk(s)}
        aria-label={terbuka ? s.aria : "Isi kosong"}
        className={`flex ${tinggi} w-full min-w-0 flex-col items-center justify-center rounded-lg border-[3px] px-1 py-0.5 text-center ${terbuka ? "lm-muncul border-[#BE185D] bg-[#FDF2F8] text-[#831843]" : "border-dashed border-[#92400E] bg-white/70 text-lg font-black text-[#92400E]"}`}
        data-sel-info={s.kunci}
      >
        {terbuka ? s.baris.map((b) => <span key={b} className="block text-[12px] font-black leading-tight"><TeksBaris t={tampil(b)} /></span>) : "?"}
      </button>
    );
  };

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
        <div className="mx-auto w-full max-w-xl space-y-1.5 rounded-2xl border-[7px] border-[#BE185D] bg-[#FFF1F2] p-2 shadow-[0_5px_0_rgba(131,24,67,0.3)]" data-uji="loyang-nani">
          <p className="text-center text-xs font-black tracking-wide text-[#831843]">LOYANG BU NANI · PENYEBUT SAMA</p>
          <PapanBar
            besar
            t={{
              mode: "bar",
              item: "kue",
              judul: `${ARSIR.q} bagian: ${ARSIR.a} berisi, ${ARSIR.c} dicoret`,
              rangkaian: [{ label: "bagian berisi, dicoret, dan kosong", strip: [{ q: ARSIR.q, isi: ARSIR.a - ARSIR.c, coret: ARSIR.c }] }],
            }}
            label={`Bar delapan bagian: tiga berisi, dua dicoret, tiga kosong`}
          />
          <div className="grid grid-cols-2 gap-1.5">
            {sel(SEL_SYARAT)}
            {sel(SEL_ARSIR)}
          </div>
          <p className="rounded-md bg-[#BE185D] px-2 py-0.5 text-xs font-black text-[#FFF1F2]">Tepung campuran: dua cara</p>
          <div className="grid grid-cols-2 gap-1.5">
            {sel(SEL_CARA1, "min-h-[84px]")}
            {sel(SEL_CARA2, "min-h-[84px]")}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl space-y-1 rounded-2xl border-[6px] border-[#1D4ED8] bg-[#EFF6FF] p-1.5 shadow-[0_5px_0_rgba(30,58,138,0.25)]" data-uji="papan-sisa">
          <p className="text-center text-xs font-black tracking-wide text-[#1E3A8A]">PAPAN SISA PERSEDIAAN · PENYEBUT BEDA</p>
          <div className="mx-auto w-full max-w-[220px]">
          <PapanBar
            besar
            t={{
              mode: "bar",
              item: "kue",
              judul: "bagian disamakan dengan KPK",
              rangkaian: [
                { label: "", strip: [{ q: BEDA_X.q, isi: BEDA_X.p, coret: 0 }, { q: BEDA_Y.q, isi: BEDA_Y.p, coret: 0, jenis: "ambil" }] },
                { label: `disamakan: ${KPK_BEDA} bagian`, strip: [{ q: KPK_BEDA, isi: (BEDA_X.p * KPK_BEDA) / BEDA_X.q, coret: 0 }, { q: KPK_BEDA, isi: (BEDA_Y.p * KPK_BEDA) / BEDA_Y.q, coret: 0, jenis: "ambil" }] },
              ],
            }}
            label="Bar tiga per empat dan satu per tiga, lalu keduanya dengan dua belas bagian"
          />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {sel(SEL_KPK, "min-h-[48px]")}
            {sel(SEL_BEDA, "min-h-[48px]")}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {sel(SEL_UBAH, "min-h-[48px]")}
            {sel(SEL_SAMAKAN, "min-h-[48px]")}
            {sel(SEL_SEDERHANA, "min-h-[48px]")}
          </div>
          {sel(SEL_PERIKSA, "min-h-[48px]")}
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_ADONAN : `Sudah dibuka ${buka1} dari ${kunci1.length} kotak.`) : selesai2 ? SELESAI2_INFO_ADONAN : `Sudah dibuka ${buka2} dari ${kunci2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke loyang Bu Nani">
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
export { InfoAdonan };
