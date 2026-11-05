"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------------ */
/* Identitas empat tahap Sub-Bab B. Setiap tahap punya "dunia" sendiri:       */
/*  Infografis = poster (baca dan dengar, tanpa permainan)                    */
/*  Concrete   = meja kayu (pegang dan pindahkan benda)                       */
/*  Picture    = buku gambar (lihat diagram dan warnai)                       */
/*  Abstract   = buku tulis kotak (hanya angka dan tanda)                     */
/* ------------------------------------------------------------------------ */

export const GAYA_MEJA: React.CSSProperties = {
  backgroundColor: "#E9B872",
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(120,70,20,0.16) 0 2px, transparent 2px 52px), repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 5px, transparent 5px 13px)",
};

export const GAYA_KERTAS: React.CSSProperties = {
  backgroundColor: "#FFFDF5",
  backgroundImage: "linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px)",
  backgroundSize: "100% 30px",
};

export const GAYA_KOTAK: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  backgroundImage:
    "linear-gradient(rgba(28,1,165,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(28,1,165,0.13) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export const GAYA_POSTER: React.CSSProperties = {
  backgroundImage: "radial-gradient(#BBF7D0 2px, transparent 2px)",
  backgroundSize: "22px 22px",
};

/** Alas kain tempat benda nyata diletakkan di atas meja. */
export const ALAS = "rounded-3xl border-4 border-[#A8672D] bg-[#FBE3BC] shadow-[0_5px_0_rgba(120,70,20,0.35)]";

/* ------------------------------- Pita tahap ------------------------------ */

export function PitaTahap({
  ikon,
  nama,
  cara,
  warna,
}: {
  ikon: string;
  nama: string;
  cara: string;
  warna: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border-4 border-white/80 px-3 py-2 shadow-md"
      style={{ backgroundColor: warna }}
    >
      <span className="text-3xl leading-none" aria-hidden="true">
        {ikon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-black tracking-widest text-white/90">{nama}</p>
        <p className="text-sm font-black leading-tight text-white">{cara}</p>
      </div>
    </div>
  );
}

/* ----------------------- Pengganti buaya bicara per tahap ---------------- */

/** Picture: catatan tempel kuning, seperti catatan guru di buku gambar. */
export function CatatanTempel({ teks }: { teks: string }) {
  return (
    <div className="relative -rotate-1 rounded-md bg-[#FFF176] px-3 pb-2 pt-4 text-sm font-black leading-snug text-[#1C01A5] shadow-[3px_4px_0_rgba(0,0,0,0.14)]">
      <span className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-2 bg-[#F0AB00]/60" aria-hidden="true" />
      <span aria-hidden="true">📝 </span>
      {teks}
    </div>
  );
}

/** Abstract: satu baris tulisan pensil. Tanpa gambar. */
export function CatatanPensil({ teks }: { teks: string }) {
  return (
    <p className="border-b-2 border-dashed border-[#1C01A5]/40 pb-1 text-sm font-black leading-snug text-[#1C01A5]">
      <span aria-hidden="true">✏️ </span>
      {teks}
    </p>
  );
}

/** Hiasan spiral di tepi atas buku gambar. */
export function SpiralBuku() {
  return (
    <div className="flex justify-around px-3" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="-mt-1 block h-4 w-2 rounded-full border-2 border-[#6B7280] bg-white" />
      ))}
    </div>
  );
}

/* ------------------------------ Benda seret ------------------------------ */

/** Cari zona jatuh (atribut data-zona) di titik layar. Dipakai saat benda dilepas. */
export function zonaDi(x: number, y: number): string | null {
  const daftar = document.elementsFromPoint(x, y);
  for (const el of daftar) {
    const z = el.closest("[data-zona]");
    if (z) return z.getAttribute("data-zona");
  }
  return null;
}

/**
 * Benda yang bisa dipegang. Diketuk = onKetuk. Digeser lalu dilepas = onLepas dengan titik layar.
 * Papan ketik: Enter atau Spasi memanggil onKetuk.
 */
export function BendaSeret({
  id,
  aktif = true,
  onKetuk,
  onLepas,
  label,
  kelas = "",
  gaya,
  children,
}: {
  id: string;
  aktif?: boolean;
  onKetuk?: (id: string) => void;
  onLepas?: (id: string, x: number, y: number) => void;
  label: string;
  kelas?: string;
  gaya?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [geser, setGeser] = useState<{ dx: number; dy: number } | null>(null);
  const bersih = useRef<(() => void) | null>(null);
  const cb = useRef({ onKetuk, onLepas });
  cb.current = { onKetuk, onLepas };

  useEffect(() => () => bersih.current?.(), []);

  const turun = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!aktif) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const x0 = e.clientX;
    const y0 = e.clientY;
    let bergerak = false;
    const lepasPantau = () => {
      window.removeEventListener("pointermove", gerak);
      window.removeEventListener("pointerup", lepas);
      window.removeEventListener("pointercancel", batal);
      bersih.current = null;
    };
    const gerak = (ev: PointerEvent) => {
      const dx = ev.clientX - x0;
      const dy = ev.clientY - y0;
      if (!bergerak && Math.hypot(dx, dy) < 8) return;
      bergerak = true;
      setGeser({ dx, dy });
    };
    const lepas = (ev: PointerEvent) => {
      lepasPantau();
      setGeser(null);
      if (bergerak) cb.current.onLepas?.(id, ev.clientX, ev.clientY);
      else cb.current.onKetuk?.(id);
    };
    const batal = () => {
      lepasPantau();
      setGeser(null);
    };
    window.addEventListener("pointermove", gerak);
    window.addEventListener("pointerup", lepas);
    window.addEventListener("pointercancel", batal);
    bersih.current = lepasPantau;
  };

  return (
    <div
      role="button"
      tabIndex={aktif ? 0 : -1}
      aria-label={label}
      aria-disabled={!aktif}
      onPointerDown={turun}
      onKeyDown={(e) => {
        if (aktif && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onKetuk?.(id);
        }
      }}
      className={`igil-tanpa-tepi select-none ${kelas}`}
      style={{
        position: "relative",
        touchAction: aktif ? "none" : undefined,
        cursor: aktif ? (geser ? "grabbing" : "grab") : "default",
        transform: geser ? `translate(${geser.dx}px, ${geser.dy}px) scale(1.15)` : undefined,
        zIndex: geser ? 60 : undefined,
        transition: geser ? "none" : "transform 0.2s ease-out",
        filter: geser ? "drop-shadow(0 10px 8px rgba(0,0,0,0.3))" : undefined,
        ...gaya,
      }}
    >
      {children}
    </div>
  );
}

/** Kemiringan dan geseran tetap per benda, supaya tampak diletakkan sembarang di meja. */
export function letakMeja(i: number): React.CSSProperties {
  const putar = ((i * 53) % 21) - 10;
  const geserX = ((i * 37) % 11) - 5;
  const geserY = ((i * 29) % 9) - 4;
  return { transform: `translate(${geserX}px, ${geserY}px) rotate(${putar}deg)` };
}
