"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { SuaraCtx, LencanaSuara, PitaTahap, TombolSuaraGuru } from "./tahap-b-gaya";
import { TombolLanjut, type Umum } from "./SubBabBBanding";
import type { PropsLangkah } from "./SubBabA2Penjumlahan";

/* ------------------------------------------------------------------------ */
/* Kerangka bersama modul Kelas 2 Bab 1: pembungkus tahap permainan (Concrete, */
/* Picture, Abstract), halaman Poin Penting, dan Refleksi. Tanpa API.         */
/* ------------------------------------------------------------------------ */

export type KartuTahap = { nomor: number; render: (dasar: PropsLangkah) => React.ReactNode };

type TahapProps = {
  umum: Umum;
  tahap: 4 | 5 | 6;
  pita: { ikon: string; nama: string; cara: string; warna: string };
  kartu: KartuTahap[];
  /** Teks tombol lanjut pada permainan terakhir. */
  teksAkhir: string;
  /** Bila ada, halaman ini muncul sesudah permainan terakhir (Poin Penting), bukan langsung selesai. */
  poin?: (selesai: () => void) => React.ReactNode;
  labelKartu?: string;
};

/** Pembungkus tahap: satu permainan per layar, penanda kemajuan, tombol lanjut berurutan. */
export function TahapPermainan({ umum, tahap, pita, kartu, teksAkhir, poin, labelKartu = "Permainan" }: TahapProps) {
  const { speakGuru, panel, hentikan, gulir, onSelesai } = umum;
  const [indeks, setIndeks] = useState(0);
  const dalamPoin = poin !== undefined && indeks >= kartu.length;
  const aktif = kartu[Math.min(indeks, kartu.length - 1)];
  const langkahTotal = kartu.length + (poin ? 1 : 0);

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (!poin && indeks >= kartu.length - 1) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar: PropsLangkah = {
    speakGuru,
    lanjut,
    nomor: aktif.nomor,
    panel,
    teksLanjut: indeks >= kartu.length - 1 ? teksAkhir : "LANJUTKAN ⬇️",
  };

  return (
    <SuaraCtx.Provider value={speakGuru}>
      <BingkaiTahap tahap={tahap} className="space-y-3">
        <PitaTahap ikon={pita.ikon} nama={pita.nama} cara={pita.cara} warna={pita.warna} />
        <div className="flex items-center gap-1.5" aria-label={`${labelKartu} ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
          {Array.from({ length: langkahTotal }, (_, i) => (
            <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
          ))}
        </div>
        {dalamPoin && poin ? (
          poin(() => {
            hentikan();
            panel.bersih();
            onSelesai();
          })
        ) : (
          <div key={indeks} className="space-y-3">
            {aktif.render(dasar)}
          </div>
        )}
      </BingkaiTahap>
    </SuaraCtx.Provider>
  );
}

/* ------------------------------ Poin Penting ------------------------------ */

export type ItemPoin = { ikon: string; nama: string; isi: React.ReactNode; suara: string };

export function Refleksi({ pernyataan, speakGuru }: { pernyataan: string[]; speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => pernyataan.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {pernyataan.map((tx, i) => (
        <button
          key={tx}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${tx} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${tx} Iya.` : tx);
          }}
          className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

export function PoinPentingK2({
  speakGuru,
  onSelesai,
  suaraPoin,
  poin,
  rumah,
  refleksi,
  teksSelesai,
  cara,
}: {
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  suaraPoin: string;
  poin: ItemPoin[];
  rumah: string;
  refleksi: string[];
  teksSelesai: string;
  /** Kartu "Cara menyebutkan": kalimat contoh dan potongannya. */
  cara: { suara: string; potongan: { teks: string; warna: string }[] };
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(suaraPoin)} />
      </div>
      <div className="space-y-2">
        {poin.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            {p.isi}
          </button>
        ))}
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button type="button" aria-label="Dengarkan: Cara menyebutkan banyak benda" onClick={() => speakGuru(cara.suara)} className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left">
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🗣️</span>
              Cara menyebutkan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {cara.potongan.map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            🏠
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">{rumah}</p>
        </div>
        <Refleksi pernyataan={refleksi} speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks={teksSelesai} onClick={onSelesai} />
    </>
  );
}
