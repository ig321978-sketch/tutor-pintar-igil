"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LACI, KELOMPOK_LACI, KOLOM_LACI, SUARA_LACI, TEMPAT_LACI } from "./data";

/**
 * Infografis Kelas 2 Bab 1 Sub-Bab B: Laci Kasir berbilik. Laci kayu di meja kasir kantin; tiap baris satu pesanan dari Story
 * (dua puluh lima, tiga puluh delapan, empat puluh) dengan tiga bilik kosong: Puluhan, Satuan, Bentuk panjang. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { puluhan: "Puluhan", satuan: "Satuan", panjang: "Bentuk panjang" };

export default function LaciKasir({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LACI,
    53,
    (l, tujuan) => {
      const asal = TEMPAT_LACI.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_LACI[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_LACI[baris].nama}, bukan ${BARIS_LACI[barisTujuan].nama}.`;
    },
    speakGuru,
  );
  const bilik = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Bilik kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 px-1 text-center text-xs font-black leading-tight shadow-[inset_0_3px_0_rgba(69,26,3,0.25)] ${teks ? "lm-muncul border-[#1C01A5] bg-white text-[#1C01A5]" : "border-dashed border-[#78350F] bg-[#FDE9C8] text-[#78350F]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[5.2rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LACI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Laci kasir kantin. Tiap baris satu pesanan. Taruh puluhannya, satuannya, dan bentuk panjangnya di bilik yang pas.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#78350F] p-2 shadow-[0_6px_0_rgba(69,26,3,0.35)]" style={{ background: "repeating-linear-gradient(0deg,#C2884D 0 22px,#B77A3F 22px 24px)" }}>
        <p className="text-center text-lg font-black text-[#451A03]">{"\u{1F4B0}"} Laci Kasir Kantin</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#451A03]">Pesanan</span>
          {KOLOM_LACI.map((k) => (
            <span key={k} className="rounded-sm bg-[#451A03] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LACI.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-xl border-2 border-[#92400E] bg-[#FFFBEB] p-1 shadow-[0_2px_0_rgba(69,26,3,0.3)]">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#451A03]">
                <span className="text-xl" aria-hidden="true">
                  {b.bil}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => bilik(TEMPAT_LACI[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Laci lengkap! Puluhan di kiri, satuan di kanan, lalu bentuk panjangnya." : tp.pesan}
      </p>
      {tp.selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
