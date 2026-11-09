"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";

/* ------------------------------------------------------------------------ */
/* Mesin BagiBergiliran (Matematika Kelas 3 Bab 1 Sub-Bab G, Aktivitas 5).      */
/* Siswa menekan "Bagikan satu putaran": tiap piring mendapat satu benda dari   */
/* tumpukan. Kalimat pengurangan berulang ikut memanjang sampai tumpukan habis. */
/* Gambar diberikan dari luar lewat props. Tanpa API dan tanpa acak.            */
/* ------------------------------------------------------------------------ */

export type SoalBagiSatu = {
  /** Banyak benda semula. */
  total: number;
  /** Banyak piring penerima. */
  g: number;
  tanya: string;
  /** Gambar keadaan sekarang: putaran yang sudah dibagikan. */
  tampil: (putaran: number) => React.ReactNode;
  pesan: string;
};

const kalimatKurang = (total: number, g: number, putaran: number): string => (putaran === 0 ? `${total}` : `${[total, ...Array.from({ length: putaran }, () => g)].join(" − ")} = ${total - putaran * g}`);

/** Tekan tombol bagikan sampai tumpukan habis. Tombol kembalikan menarik satu putaran terakhir. */
export function BagiBergiliran({ soal, onBeres, pesanBeres }: { soal: SoalBagiSatu[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [putaran, setPutaran] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const sisa = s.total - putaran * s.g;

  const bagikan = () => {
    if (beres || sisa <= 0) return;
    const baru = putaran + 1;
    if (s.total - baru * s.g > 0) {
      setPutaran(baru);
      setKabar(null);
      return;
    }
    if (nomor + 1 >= soal.length) {
      setPutaran(baru);
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setPutaran(0);
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
            <div className="flex min-h-[96px] items-center justify-center rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-white px-2 py-2" aria-live="polite">
              {s.tampil(putaran)}
            </div>
            <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
              {kalimatKurang(s.total, s.g, putaran)}
            </p>
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Putaran ke-{putaran}, sisa {sisa}
            </p>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <button type="button" aria-label="Bagikan satu putaran" onClick={bagikan} className={`${TOMBOL_BESAR} w-full`}>
                Bagikan satu putaran
              </button>
              <button
                type="button"
                aria-label="Kembalikan satu putaran"
                disabled={putaran <= 0}
                onClick={() => {
                  setPutaran(putaran - 1);
                  setKabar(null);
                }}
                className={`${TOMBOL_PUTIH} !px-3`}
              >
                Kembalikan
              </button>
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
