"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ACUAN_BAGAN, BAGAN_INFO, JUDUL_KARTU1_TIKET, JUDUL_KARTU2_TIKET, PETUNJUK1_INFO_TIKET, PETUNJUK2_INFO_TIKET, SELESAI1_INFO_TIKET, SELESAI2_INFO_TIKET, TEMPAT_BAGAN, TIKET_INFO, WARNA_TEMPAT, titik, type SelInfo } from "./data-info";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = tiga tiket bersobekan (3.406, 5.080, dan tulisan Satria 3.46); nomor tampak, sel "dibaca" dan "nol" tertutup (?) sampai diketuk.
 * Kartu 2 = papan empat tempat untuk 3.406 dan 5.080; angka tampak berwarna, cara baca tiap tempat tertutup sampai diketuk. Digital saja.
 */
export default function DaftarTiketK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const ids1 = TIKET_INFO.flatMap((t) => [t.bacaan.id, t.nol.id]);
  const ids2 = BAGAN_INFO.flatMap((b) => b.kolom.map((k) => k.baca.id));
  const buka1 = ids1.filter((i) => buka.includes(i)).length;
  const buka2 = ids2.filter((i) => buka.includes(i)).length;
  const selesai1 = buka1 === ids1.length;
  const selesai2 = buka2 === ids2.length;
  const ketuk = (s: SelInfo) => {
    speakGuru(s.suara);
    if (!buka.includes(s.id)) setBuka((b) => [...b, s.id]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_TIKET : PETUNJUK2_INFO_TIKET;

  const sel = (s: SelInfo, aria: string) => {
    const t = buka.includes(s.id);
    return (
      <button
        key={s.id}
        type="button"
        onClick={() => ketuk(s)}
        aria-label={t ? `${aria}: ${s.tampil}` : `Isi kosong: ${aria}`}
        className={`flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-0.5 text-center font-black leading-tight tracking-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[11px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-xl text-[#B45309]"}`}
      >
        <span className="min-w-0 break-words">{t ? s.tampil : "?"}</span>
      </button>
    );
  };

  return (
    <div className="space-y-1.5" data-uji="info-tiket">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[6px] border-[#78350F] bg-[#FDE9B8] p-2 shadow-[0_5px_0_rgba(120,53,15,0.4)]" data-uji="daftar-tiket">
          <p className="mb-1.5 rounded-md bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">{JUDUL_KARTU1_TIKET}</p>
          <div className="mb-1 grid grid-cols-[88px_1fr_1fr] gap-1.5 text-center text-[11px] font-black text-[#78350F]" aria-hidden="true">
            <span>tiket</span>
            <span>dibaca</span>
            <span>nol</span>
          </div>
          <div className="space-y-1.5">
            {TIKET_INFO.map((t) => (
              <div key={t.id} className="grid grid-cols-[88px_1fr_1fr] items-stretch gap-1.5">
                <div className={`relative flex flex-col items-center justify-center rounded-l-xl border-[3px] border-r-0 px-1 py-1 text-center leading-none ${t.salah ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#B45309] bg-[#FDE68A]"}`} role="img" aria-label={`${t.judul}: ${t.nomor}`} data-nomor={t.nomor}>
                  <span className="absolute -left-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#B45309] bg-[#FDE9B8]" aria-hidden="true" />
                  <span className="text-[10px] font-black text-[#78350F]">{t.judul}</span>
                  <span className={`mt-1 text-xl font-black ${t.salah ? "text-[#DC2626]" : "text-[#1C01A5]"}`}>{t.nomor}</span>
                </div>
                {sel(t.bacaan, `${t.judul}, cara baca`)}
                {sel(t.nol, `${t.judul}, tempat nol`)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[4px] border-[#0369A1] bg-[#E0F2FE] p-1 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="bagan-tiket">
          <p className="mb-1 rounded-md bg-[#0369A1] py-0.5 text-center text-sm font-black text-[#FDE68A]">{JUDUL_KARTU2_TIKET}</p>
          <div className="space-y-1.5">
            {BAGAN_INFO.map((b) => (
              <div key={b.id} className="rounded-xl bg-white/80 p-1.5" data-bilangan={b.bilangan}>
                <p className="mb-1 text-center text-[11px] font-black text-[#0C4A6E]">
                  {b.judul}: {titik(b.bilangan)}
                </p>
                <div className="grid grid-cols-4 gap-1">
                  {b.kolom.map((k, i) => (
                    <div key={k.tempat} className="space-y-1">
                      <p className="text-center text-[11px] font-black" style={{ color: WARNA_TEMPAT[i] }}>
                        {TEMPAT_BAGAN[i]}
                      </p>
                      <p className="flex h-8 items-center justify-center rounded-lg text-2xl font-black text-white" style={{ background: WARNA_TEMPAT[i] }} data-angka={k.angka}>
                        {k.angka}
                      </p>
                      {sel(k.baca, `${k.tempat} pada ${titik(b.bilangan)}`)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1 rounded-lg border-2 border-[#0369A1] bg-white px-2 py-0.5 text-center text-xs font-black leading-tight text-[#0C4A6E]">{ACUAN_BAGAN}</p>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_TIKET : `Sudah dibuka ${buka1} dari ${ids1.length} kotak.`) : selesai2 ? SELESAI2_INFO_TIKET : `Sudah dibuka ${buka2} dari ${ids2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke daftar tiket">
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
export { DaftarTiketK4B1 };
