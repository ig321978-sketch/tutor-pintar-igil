"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { opsiGeser } from "./data-k3b3";

/* ------------------------------------------------------------------------ */
/* Mesin GeserUkur (Matematika Kelas 3 Bab 3, Sub-Bab A). Siswa menggeser benda   */
/* sampai ujung kirinya tepat di angka 0 pada penggaris, lalu membaca angka di     */
/* ujung yang lain sebagai panjang benda (Aktivitas 1, langkah 5). Gambar         */
/* diberikan dari luar lewat props, jadi mesin ini aman dipakai tahap Concrete    */
/* dan Picture. Tanpa API dan tanpa acak.                                          */
/* ------------------------------------------------------------------------ */

export type SoalGeser = {
  /** Panjang benda sebenarnya. */
  cm: number;
  /** Letak awal ujung kiri benda. */
  awal: number;
  /** Panjang penggaris. */
  maks: number;
  tanya: string;
  /** Gambar penggaris dan benda pada letak `offset`. */
  gambar: (offset: number) => React.ReactNode;
  pesan: string;
};

/** Geser benda ke kiri sampai ujungnya di angka 0, lalu pilih panjang benda. */
export function GeserUkur({ soal, onBeres, pesanBeres }: { soal: SoalGeser[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [offset, setOffset] = useState(() => soal[0].awal);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const sejajar = offset === 0;
  const opsi = opsiGeser(s.cm, s.awal, nomor);

  const geser = (langkah: number) => {
    const baru = offset + langkah;
    if (baru < 0 || baru + s.cm > s.maks) return;
    setOffset(baru);
    setKeliru(null);
    setKabar(baru === 0 ? { teks: "Ujung benda sudah tepat di angka 0. Sekarang baca angka di ujung yang lain.", ok: true } : null);
  };

  const pilih = (n: number) => {
    if (beres || !sejajar) return;
    if (n !== s.cm) {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Lihat angka di ujung benda yang lain, saat ujung benda yang satu tepat di angka 0.", ok: false });
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
      setOffset(soal[nomor + 1].awal);
      setKeliru(null);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            <CatatanPensil pendek={s.tanya} />
            <div className="flex justify-center rounded-2xl border-4 border-[#1C01A5]/30 bg-white px-1 py-2" aria-live="polite">
              {s.gambar(offset)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-label="Geser benda ke kiri" disabled={offset <= 0} onClick={() => geser(-1)} className={`${TOMBOL_BESAR} !px-1`}>
                ◀ Geser kiri
              </button>
              <button type="button" aria-label="Geser benda ke kanan" disabled={offset + s.cm >= s.maks} onClick={() => geser(1)} className={`${TOMBOL_PUTIH} !px-1`}>
                Geser kanan ▶
              </button>
            </div>
            {sejajar ? (
              <div className="space-y-1.5">
                <p className="text-center text-sm font-black text-[#1C01A5]">Berapa panjang benda?</p>
                <div className="grid grid-cols-3 gap-2">
                  {opsi.map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`Pilih ${n} sentimeter`}
                      onClick={() => pilih(n)}
                      className={`${TOMBOL_BESAR} !px-1 text-2xl ${keliru === n ? "!bg-[#FECACA]" : ""}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-sm font-black text-[#1C01A5]/70">Geser benda sampai ujung kirinya tepat di angka 0.</p>
            )}
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
