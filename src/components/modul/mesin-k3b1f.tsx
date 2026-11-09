"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR } from "./permainan-k2b2";

/* ------------------------------------------------------------------------ */
/* Mesin RakitKelompok (Matematika Kelas 3 Bab 1 Sub-Bab F). Siswa menambah dan   */
/* mengurangi kelompok yang isinya sama sampai jumlah seluruhnya sama dengan      */
/* yang diminta. Kalimat penjumlahan berulang ikut bertambah panjang. Gambar      */
/* diberikan dari luar lewat props. Tanpa API dan tanpa acak.                     */
/* ------------------------------------------------------------------------ */

export type SoalRakitKelompok = {
  /** Isi tiap kelompok. */
  n: number;
  /** Jumlah seluruhnya yang diminta (kelipatan n). */
  total: number;
  tanya: string;
  /** Gambar k kelompok sekarang. */
  tampil: (k: number) => React.ReactNode;
  /** Nama satu kelompok, mis. "piring" atau "kotak". */
  wadah: string;
  pesan: string;
  /** Batas banyak kelompok. */
  maks?: number;
};

const kalimatTambah = (k: number, n: number): string => (k === 0 ? "Belum ada kelompok" : `${Array.from({ length: k }, () => n).join(" + ")} = ${k * n}`);

/** Tekan tambah atau kurang kelompok. Tekan Periksa bila jumlah seluruhnya sudah sama dengan yang diminta. */
export function RakitKelompok({ soal, onBeres, pesanBeres }: { soal: SoalRakitKelompok[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [k, setK] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const maks = s.maks ?? 10;

  const periksa = () => {
    if (k * s.n === s.total) {
      if (nomor + 1 >= soal.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${s.pesan} ${pesanBeres}`);
        setNomor(nomor + 1);
        onBeres();
      } else {
        setKabar({ teks: s.pesan, ok: true });
        setNomor(nomor + 1);
        setK(0);
      }
      return;
    }
    const kurang = k * s.n < s.total;
    setKabar({
      teks: `Jumlahmu sekarang ${k * s.n}. ${kurang ? "Masih kurang, tambah kelompok." : "Sudah lebih, kurangi kelompok."} Tiap ${s.wadah} berisi ${s.n}.`,
      ok: false,
    });
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
            <div className="flex min-h-[96px] items-center justify-center rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-white px-2 py-2" aria-live="polite">
              {k === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">Tekan tambah untuk membuat kelompok</span> : s.tampil(k)}
            </div>
            <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
              {kalimatTambah(k, s.n)}
            </p>
            <div className="flex items-center justify-center gap-3 rounded-xl border-[3px] border-[#1C01A5] bg-white px-2 py-1.5">
              <button type="button" aria-label={`Kurangi ${s.wadah}`} disabled={k <= 0} onClick={() => { setK(k - 1); setKabar(null); }} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                −
              </button>
              <p className="min-w-[7rem] text-center text-sm font-black text-[#1C01A5]">
                {k} {s.wadah}
              </p>
              <button type="button" aria-label={`Tambah ${s.wadah}`} disabled={k >= maks} onClick={() => { setK(k + 1); setKabar(null); }} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                +
              </button>
            </div>
            <button type="button" aria-label="Periksa rakitan" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
