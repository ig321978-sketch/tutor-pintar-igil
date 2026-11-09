"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR } from "./permainan-k2b2";
import { BANDUL, NAMA_BANDUL, URUT_BANDUL, gramSusunan, teksGram, titik, type JenisBandul, type Susunan } from "./data-k3b3";
import { LayarTimbangan } from "./diagram-k3b3cd";
import { Bandul } from "./dasar-k3b3cd";

/* ------------------------------------------------------------------------ */
/* Mesin RakitBandul (Matematika Kelas 3 Bab 3, Sub-Bab D, tahap Concrete).       */
/* Siswa menambah atau mengurangi bandul timbangan kodok (1/2 ons, 1 ons, 2 ons,  */
/* 1/2 kg, 1 kg) sampai berat seluruhnya sama dengan yang diminta. Layar          */
/* menampilkan jumlah berat tiap saat. Banyak jalan benar. Tanpa API.             */
/* ------------------------------------------------------------------------ */

export type SoalRakitBandul = { target: number; tanya: string; pesan: string };

const MAKS_BANDUL = 9;

export function RakitBandul({ soal, onBeres, pesanBeres }: { soal: SoalRakitBandul[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [isi, setIsi] = useState<Susunan>({});
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const total = gramSusunan(isi);

  const ubah = (j: JenisBandul, langkah: number) => {
    if (beres) return;
    const baru = (isi[j] ?? 0) + langkah;
    if (baru < 0 || baru > MAKS_BANDUL) return;
    setIsi({ ...isi, [j]: baru });
    setKabar(null);
  };

  const periksa = () => {
    if (total === s.target) {
      if (nomor + 1 >= soal.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${s.pesan} ${pesanBeres}`);
        setNomor(nomor + 1);
        onBeres();
      } else {
        setKabar({ teks: s.pesan, ok: true });
        setNomor(nomor + 1);
        setIsi({});
      }
      return;
    }
    setKabar({
      teks: total > s.target ? `Beratnya sekarang ${teksGram(total)}, terlalu besar. Kurangi bandulnya.` : `Beratnya sekarang ${teksGram(total)}, belum cukup. Tambah bandulnya.`,
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
            <div className="flex justify-center" aria-live="polite">
              <LayarTimbangan gram={total} />
            </div>
            <div className="space-y-1.5">
              {URUT_BANDUL.map((j) => (
                <div key={j} className="flex items-center gap-2 rounded-xl border-[3px] border-[#1C01A5] bg-white px-2 py-1">
                  <span className="flex w-12 shrink-0 justify-center">
                    <Bandul jenis={j} />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">
                    {NAMA_BANDUL[j]}
                    <span className="block text-[11px] font-bold text-[#1C01A5]/70">{titik(BANDUL[j])} g</span>
                  </span>
                  <button type="button" aria-label={`Kurangi bandul ${NAMA_BANDUL[j]}`} disabled={(isi[j] ?? 0) <= 0} onClick={() => ubah(j, -1)} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                    −
                  </button>
                  <span className="w-6 text-center text-xl font-black text-[#1C01A5]" aria-label={`Banyak bandul ${NAMA_BANDUL[j]}`}>
                    {isi[j] ?? 0}
                  </span>
                  <button type="button" aria-label={`Tambah bandul ${NAMA_BANDUL[j]}`} disabled={(isi[j] ?? 0) >= MAKS_BANDUL} onClick={() => ubah(j, 1)} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                    +
                  </button>
                </div>
              ))}
            </div>
            <button type="button" aria-label="Periksa bandul" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
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
