"use client";

import React, { useMemo, useState } from "react";
import { cocok, labelDari, type Label, type Tempat } from "./logika";

/** Gaya kecil yang dipakai bersama komponen lemari-k1b1a (goyang sekali saat salah, muncul saat benar). */
export const CSS_LEMARI = `
@keyframes lm-goyang{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
.lm-goyang{animation:lm-goyang .45s ease-in-out}
@keyframes lm-muncul{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
.lm-muncul{animation:lm-muncul .35s cubic-bezier(.3,1.4,.5,1) both}
@media (prefers-reduced-motion:reduce){.lm-goyang,.lm-muncul{animation:none}}
`;

export const TOMBOL_UTAMA =
  "min-h-[52px] rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 text-sm font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)] disabled:opacity-40";

/** Keadaan tempel label: label dipilih, label yang sudah menempel di tempat, goyang dan pesan saat salah. */
export function useTempel(tempat: readonly Tempat[], benih: number, petunjuk: (label: Label) => string, bicara: (t: string) => void) {
  const label = useMemo(() => labelDari(tempat, benih), [tempat, benih]);
  const [pilih, setPilih] = useState<string | null>(null);
  const [isi, setIsi] = useState<Record<string, string>>({});
  const [goyang, setGoyang] = useState<string | null>(null);
  const [pesan, setPesan] = useState("");
  const terpakai = new Set(Object.values(isi));
  const sisa = label.filter((l) => !terpakai.has(l.id));
  const selesai = sisa.length === 0;

  const ketukLabel = (l: Label) => {
    setPilih(l.id);
    setPesan("");
    bicara(l.teks);
  };
  const ketukTempat = (t: Tempat) => {
    if (isi[t.id]) return;
    const l = label.find((x) => x.id === pilih);
    if (!l) {
      setPesan("Ketuk satu label dulu, lalu ketuk tempatnya.");
      return;
    }
    if (cocok(t, l)) {
      setIsi((s) => ({ ...s, [t.id]: l.id }));
      setPilih(null);
      setPesan("Cocok!");
    } else {
      const p = petunjuk(l);
      setGoyang(t.id);
      window.setTimeout(() => setGoyang(null), 480);
      setPesan(p);
      bicara(p);
    }
  };
  const teksDi = (t: Tempat) => label.find((l) => l.id === isi[t.id])?.teks ?? null;
  return { label, sisa, pilih, isi, goyang, pesan, selesai, ketukLabel, ketukTempat, teksDi };
}

/** Baki label yang belum menempel. */
export function BakiLabel({ sisa, pilih, onPilih, warna = "#FFF7CC" }: { sisa: Label[]; pilih: string | null; onPilih: (l: Label) => void; warna?: string }) {
  if (sisa.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5]/40 p-2" style={{ background: warna }} role="group" aria-label="Label yang belum ditempel">
      {sisa.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => onPilih(l)}
          aria-pressed={pilih === l.id}
          className={`min-h-[44px] rounded-xl border-4 px-3 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] ${pilih === l.id ? "border-[#1C01A5] bg-[#FFE566] -translate-y-1" : "border-[#1C01A5]/50 bg-white"}`}
        >
          {l.teks}
        </button>
      ))}
    </div>
  );
}
