"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, PilihanAngka, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { JamMuka } from "./diagram-k2b6";
import { jam12, opsiAngka } from "./data-k2b6";

/* ------------------------------------------------------------------------ */
/* Permainan jam Sub-Bab B (Waktu): memutar jarum pendek dan memajukan jam.   */
/* Kunci dihitung dari jam 24 (data-k2b6.ts). Tanpa API dan tanpa acak.       */
/* ------------------------------------------------------------------------ */

export type SoalJam = { tanya: string; jam24: number; petunjuk: string; pesan: string };

/**
 * Arahkan jarum pendek ke pukul yang diminta. Jarum panjang tetap di angka 12 (pukul tepat).
 * Ketuk angka di muka jam, atau pakai tombol jam mundur dan jam maju, lalu tekan Periksa.
 */
export function AturJam({ soal, gaya, onBeres, pesanBeres }: { soal: SoalJam[]; gaya: "garis" | "dinding"; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [jam, setJam] = useState(12);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const periksa = () => {
    if (jam !== jam12(s.jam24)) {
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setJam(12);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <CatatanPensil pendek={`${nomor + 1}. ${s.tanya}`} teks={s.tanya} />
            <div className="flex justify-center">
              <JamMuka jam={jam} gaya={gaya} kelas="w-full max-w-[210px]" onAngka={setJam} label={`Jam. Jarum pendek di angka ${jam}. Jarum panjang di angka 12.`} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" aria-label="Jarum pendek mundur satu jam" onClick={() => setJam(jam === 1 ? 12 : jam - 1)} className={`${TOMBOL_PUTIH} !px-1`}>
                − Jam
              </button>
              <button type="button" aria-label="Jarum pendek maju satu jam" onClick={() => setJam(jam === 12 ? 1 : jam + 1)} className={`${TOMBOL_PUTIH} !px-1`}>
                ＋ Jam
              </button>
              <button type="button" aria-label="Periksa jam" onClick={periksa} className={`${TOMBOL_BESAR} !px-1`}>
                Periksa
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk angka di jam, atau pakai tombol jam.</p>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export type SoalMaju = { cerita: string; mulai: number; selesai: number; petunjuk: string; pesan: string };

/** Majukan jam satu jam setiap ketukan sampai waktu selesai, lalu pilih berapa jam yang sudah berlalu. */
export function JamMaju({ soal, onBeres, pesanBeres }: { soal: SoalMaju[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [maju, setMaju] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const total = s.selesai - s.mulai;
  const sampai = maju >= total;
  const opsi = opsiAngka(total, nomor);

  const pilih = (n: number) => {
    if (n !== total) {
      setKeliru(n);
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    setKeliru(null);
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setMaju(0);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <CatatanPensil pendek={`${nomor + 1}. ${s.cerita}`} teks={s.cerita} />
            <div className="flex justify-center">
              <JamMuka jam={s.mulai + maju} gaya="dinding" kelas="w-full max-w-[200px]" />
            </div>
            <p className="text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
              Jam sudah maju {maju} jam
            </p>
            {!sampai ? (
              <button type="button" aria-label="Majukan jam satu jam" onClick={() => setMaju(maju + 1)} className={`${TOMBOL_BESAR} w-full`}>
                ▶ Maju 1 jam
              </button>
            ) : (
              <>
                <CatatanPensil pendek="Berapa jam yang sudah berlalu?" />
                <PilihanAngka opsi={opsi} keliru={keliru} onPilih={pilih} />
              </>
            )}
            {maju > 0 && !sampai ? (
              <button type="button" onClick={() => setMaju(0)} className={`${TOMBOL_PUTIH} w-full`}>
                ↺ Mulai dari awal
              </button>
            ) : null}
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
