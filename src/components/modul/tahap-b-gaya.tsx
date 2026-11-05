"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

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

/**
 * Tombol Suara Guru baku. Selalu diletakkan di baris sendiri atau di pita,
 * tidak pernah berdampingan dengan judul, supaya judul tidak terpotong.
 */
export function TombolSuaraGuru({
  onClick,
  kelas = "",
  label = "Suara Guru",
  kecil = false,
}: {
  onClick: () => void;
  kelas?: string;
  label?: string;
  kecil?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex shrink-0 items-center justify-center rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] p-0 text-[#FFE566] shadow-md ${
        kecil ? "h-10 w-10" : "h-12 w-12"
      } ${kelas}`}
    >
      <svg viewBox="0 0 24 24" className={kecil ? "h-6 w-6" : "h-7 w-7"} aria-hidden="true">
        <path d="M4 9.5 H8 L13 5 V19 L8 14.5 H4 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16 9 Q18.6 12 16 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.4 6.4 Q22.4 12 18.4 17.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/** Lencana speaker hiasan di dalam kartu atau gelembung yang seluruhnya bisa diketuk. */
export function LencanaSuara({ kelas = "h-9 w-9" }: { kelas?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] text-[#FFE566] ${kelas}`}
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]">
        <path d="M4 9.5 H8 L13 5 V19 L8 14.5 H4 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16 9 Q18.6 12 16 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.4 6.4 Q22.4 12 18.4 17.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function PitaTahap({
  ikon,
  nama,
  cara,
  warna,
  aksi,
}: {
  ikon: string;
  nama: string;
  cara: string;
  warna: string;
  /** Tombol di ujung kanan pita, misalnya Suara Guru. */
  aksi?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border-4 border-white/80 px-3 py-2 shadow-md"
      style={{ backgroundColor: warna }}
    >
      <span className="text-3xl leading-none" aria-hidden="true">
        {ikon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black tracking-widest text-white/90">{nama}</p>
        <p className="text-sm font-black leading-tight text-white">{cara}</p>
      </div>
      {aksi}
    </div>
  );
}

/** Judul kartu dengan tombol Suara Guru di baris sendiri, rata kanan. Judul tampil utuh. */
export function JudulKartuSuara({
  judul,
  onSuara,
  kelasJudul = "text-xl",
}: {
  judul: string;
  onSuara: () => void;
  kelasJudul?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className={`min-w-0 flex-1 break-words font-black leading-tight text-[#1C01A5] ${kelasJudul}`}>{judul}</h3>
      <TombolSuaraGuru onClick={onSuara} />
    </div>
  );
}

/* ----------------------- Pengganti buaya bicara per tahap ---------------- */

/**
 * Suara Guru untuk seluruh tahap Sub-Bab B. Siswa kelas 1 belum lancar membaca,
 * jadi layar hanya memuat kata pendek. Penjelasan dan instruksi dibacakan.
 */
export const SuaraCtx = createContext<(teks: string) => void>(() => {});

/** Bacakan teks satu kali, tepat ketika `aktif` berubah menjadi benar. */
export function useBicara(aktif: boolean, teks: string) {
  const bicara = useContext(SuaraCtx);
  useEffect(() => {
    if (aktif) bicara(teks);
  }, [aktif, teks, bicara]);
}

/** Picture: catatan tempel kuning. Layar memuat kata pendek, ketuk untuk mendengar. */
export function CatatanTempel({ pendek, teks }: { pendek: string; teks?: string }) {
  const bicara = useContext(SuaraCtx);
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${teks ?? pendek}`}
      onClick={() => bicara(teks ?? pendek)}
      className="igil-tanpa-tepi relative block w-full -rotate-1 rounded-md bg-[#FFF176] px-3 pb-2 pt-4 text-left text-lg font-black leading-snug text-[#1C01A5] shadow-[3px_4px_0_rgba(0,0,0,0.14)]"
    >
      <span className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-2 bg-[#F0AB00]/60" aria-hidden="true" />
      <span className="flex items-center justify-between gap-2">
        <span>
          <span aria-hidden="true">📝 </span>
          {pendek}
        </span>
        <LencanaSuara />
      </span>
    </button>
  );
}

/** Abstract: satu baris tulisan pensil. Tanpa gambar. Ketuk untuk mendengar. */
export function CatatanPensil({ pendek, teks }: { pendek: string; teks?: string }) {
  const bicara = useContext(SuaraCtx);
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${teks ?? pendek}`}
      onClick={() => bicara(teks ?? pendek)}
      className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 border-b-2 border-dashed border-[#1C01A5]/40 pb-1 text-left text-lg font-black leading-snug text-[#1C01A5]"
    >
      <span>
        <span aria-hidden="true">✏️ </span>
        {pendek}
      </span>
      <LencanaSuara />
    </button>
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
