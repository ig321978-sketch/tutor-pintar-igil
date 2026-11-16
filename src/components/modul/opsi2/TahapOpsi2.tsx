"use client";

import React, { useMemo } from "react";
import { validasiKatalog } from "@/lib/opsi2";
import type { SoalSpec, Tahap } from "@/lib/opsi2/tipe";
import { TahapPermainan, type KartuTahap } from "../kit-k2";
import type { Umum } from "../SubBabBBanding";
import { KartuSoal } from "./KartuSoal";

/**
 * Pembungkus satu tahap Opsi 2 (Concrete = 4, Picture = 5, Abstract = 6): sepuluh KartuSoal berurutan lewat TahapPermainan.
 * Sama dengan cara SubBabK4B1KA.tsx membungkus tiga tahapnya. Tanpa penilaian. Katalog tidak sah (bukan sepuluh soal,
 * tindakan kembar atau belum terdaftar) menampilkan pemberitahuan dan tombol melewati, bukan galat.
 */

const NAMA_TAHAP: Record<4 | 5 | 6, Tahap> = { 4: "concrete", 5: "picture", 6: "abstract" };

export function TahapOpsi2({
  umum,
  tahap,
  pita,
  soal,
  teksAkhir,
  poin,
  labelKartu = "Soal",
}: {
  umum: Umum;
  tahap: 4 | 5 | 6;
  pita: { ikon: string; nama: string; cara: string; warna: string };
  soal: SoalSpec[];
  teksAkhir: string;
  /** Halaman sesudah soal terakhir (Poin Penting di tahap Abstract), seperti TahapPermainan. */
  poin?: (selesai: () => void) => React.ReactNode;
  labelKartu?: string;
}) {
  const urut = useMemo(() => [...soal].sort((a, b) => a.nomor - b.nomor), [soal]);
  const galat = useMemo(() => validasiKatalog(urut, NAMA_TAHAP[tahap]), [urut, tahap]);
  const kartu = useMemo<KartuTahap[]>(() => urut.map((s) => ({ nomor: s.nomor, render: (d) => <KartuSoal spec={s} d={d} total={urut.length} /> })), [urut]);

  if (galat.length > 0) {
    return (
      <div className="space-y-3 rounded-3xl border-4 border-dashed border-[#D97706] bg-[#FEF3C7] p-4" role="status">
        <p className="text-lg font-black text-[#78350F]">Soal tahap ini belum siap.</p>
        <button type="button" onClick={() => { umum.hentikan(); umum.panel.bersih(); umum.onSelesai(); }} className="min-h-[52px] rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 text-sm font-black text-[#FFE566]">
          {teksAkhir}
        </button>
      </div>
    );
  }
  return <TahapPermainan umum={umum} tahap={tahap} pita={pita} kartu={kartu} teksAkhir={teksAkhir} poin={poin} labelKartu={labelKartu} />;
}
