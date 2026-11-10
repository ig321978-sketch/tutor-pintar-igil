"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Latar } from "./CeritaBandingB";
import { VideoCerita, type AdeganVideo } from "./video-cerita";

/** Penanda build: pastikan chunk Vercel memuat UI pop-up slide terbaru. */
export const IGIL_DAFTAR_VIDEO_UI = "popup-slide-v2";

export type VideoSiapDaftar = {
  naskah: { id: string; judul: string; subjudul: string };
  adegan: AdeganVideo[];
  poster: { a: number; k: number };
};

type PropsDaftar = {
  videos: VideoSiapDaftar[];
  speakGuru: (teks: string, selesai?: () => void) => void;
};

/**
 * Daftar video cerita menyamping seperti slide.
 * Ketuk Putar → pemutar muncul sebagai pop-up di atas tab mengambang (ukuran desktop-friendly).
 */
export function DaftarVideoCerita({ videos, speakGuru }: PropsDaftar) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [ditonton, setDitonton] = useState<string[]>([]);
  const [portalSiap, setPortalSiap] = useState(false);
  const banyak = videos.length;
  const videoAktif = videos.find((v) => v.naskah.id === aktif) ?? null;
  const indeksAktif = videoAktif ? videos.indexOf(videoAktif) : -1;
  const lebarKartu =
    banyak <= 1
      ? "w-full max-w-xl shrink-0"
      : banyak === 2
        ? "w-[min(82vw,20rem)] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:flex-1 lg:snap-align-none"
        : "w-[min(82vw,17.5rem)] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:flex-1 lg:snap-align-none";

  useEffect(() => {
    setPortalSiap(true);
  }, []);

  useEffect(() => {
    if (!aktif) return;
    const tutup = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAktif(null);
    };
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", tutup);
    return () => {
      document.body.style.overflow = sebelumnya;
      document.removeEventListener("keydown", tutup);
    };
  }, [aktif]);

  const popup =
    portalSiap && videoAktif
      ? createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5" role="presentation" data-igil-video-ui={IGIL_DAFTAR_VIDEO_UI}>
            <button
              type="button"
              aria-label="Tutup layar video"
              className="absolute inset-0 bg-[#1C01A5]/65 backdrop-blur-[2px]"
              onClick={() => setAktif(null)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Video ${indeksAktif + 1}: ${videoAktif.naskah.judul}`}
              className="relative z-[1] flex max-h-[min(94vh,56rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.6rem] border-4 border-[#FFE566] bg-white shadow-[0_12px_40px_rgba(28,1,165,0.45)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-2 border-b-2 border-[#1C01A5]/15 bg-[#1C01A5] px-3 py-2.5 sm:px-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#FFE566]/80">
                    Video {indeksAktif + 1} dari {banyak}
                  </p>
                  <p className="truncate text-sm font-black text-white sm:text-base">{videoAktif.naskah.judul}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAktif(null)}
                  className="shrink-0 rounded-full border-2 border-[#FFE566] bg-[#FFE566] px-3 py-1.5 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(0,0,0,0.25)]"
                >
                  ✕ Tutup
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
                <VideoCerita
                  judul={videoAktif.naskah.judul}
                  subjudul={videoAktif.naskah.subjudul}
                  adegan={videoAktif.adegan}
                  speakGuru={speakGuru}
                  mulaiLangsung
                  onSelesai={() =>
                    setDitonton((d) => (d.includes(videoAktif.naskah.id) ? d : [...d, videoAktif.naskah.id]))
                  }
                />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="space-y-3" data-igil-video-ui={IGIL_DAFTAR_VIDEO_UI}>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-sm font-black leading-snug text-[#1C01A5]">
        🎬 Ada {banyak} video cerita. Susunan menyamping seperti slide. Ketuk ▶ Putar — video muncul di layar pop-up agar terlihat penuh.
      </p>

      <div
        className="flex w-full flex-nowrap items-start gap-3 overflow-x-auto pb-2 [scrollbar-color:#FFE566_#1C01A5] [scrollbar-width:thin] snap-x snap-mandatory"
        role="list"
        aria-label="Daftar video cerita menyamping"
      >
        {videos.map((v, i) => {
          const sedang = aktif === v.naskah.id;
          const adeganPoster = v.adegan[v.poster.a] ?? v.adegan[0];
          return (
            <article
              key={v.naskah.id}
              role="listitem"
              className={`${lebarKartu} overflow-hidden rounded-3xl border-4 bg-white shadow-[0_5px_0_rgba(28,1,165,0.22)] ${sedang ? "border-amber-400 ring-2 ring-amber-200" : "border-[#1C01A5]"}`}
            >
              <div className="relative bg-[#DFF1FF]">
                <svg viewBox="0 0 300 208" className="pointer-events-none block h-auto w-full" aria-hidden="true">
                  <Latar />
                  {adeganPoster ? adeganPoster.render({ k: v.poster.k, t: 0 }) : null}
                </svg>
                {sedang ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1C01A5]/45">
                    <span className="rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">▶ Sedang diputar</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAktif(v.naskah.id)}
                    aria-label={`Putar video ${i + 1}: ${v.naskah.judul}`}
                    className="absolute inset-0 flex items-end justify-end bg-transparent p-2 transition hover:bg-[#1C01A5]/10 md:p-3"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#FFE566] bg-[#1C01A5] text-xl text-[#FFE566] shadow-lg">▶</span>
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 px-2.5 py-2 md:px-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/60">
                    Video {i + 1} dari {banyak}
                  </p>
                  <h4 className="text-sm font-black leading-tight text-[#1C01A5] md:text-base">{v.naskah.judul}</h4>
                  <p className="text-[10px] font-bold text-[#1C01A5]/70">
                    {v.naskah.subjudul} • {v.adegan.length} adegan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAktif(sedang ? null : v.naskah.id)}
                  className="w-full rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-3 py-1.5 text-sm font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
                >
                  {sedang ? "⏹ Tutup" : ditonton.includes(v.naskah.id) ? "↻ Putar lagi" : "▶ Putar"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-xs font-black text-[#1C01A5]/70">
        Sudah ditonton: {ditonton.length} dari {banyak}
        {ditonton.length === banyak ? " ⭐ Hebat!" : ""}
      </p>

      {popup}
    </div>
  );
}
