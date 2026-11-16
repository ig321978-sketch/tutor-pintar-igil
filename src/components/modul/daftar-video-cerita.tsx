"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { VideoCerita, type AdeganVideo } from "./video-cerita";

/** Penanda build: pastikan chunk Vercel memuat UI pop-up terbaru. */
export const IGIL_DAFTAR_VIDEO_UI = "popup-slide-v4-longgar";

export type VideoSiapDaftar = {
  naskah: { id: string; judul: string; subjudul: string };
  adegan: AdeganVideo[];
  /** Tidak dipakai lagi (sampul sekarang ikon IGIL); dibiarkan supaya pembungkus video lama tetap sah. */
  poster?: { a: number; k: number };
};

type PropsDaftar = {
  videos: VideoSiapDaftar[];
  speakGuru: (teks: string, selesai?: () => void) => void;
  /** Jeda (ms) antar paragraf layar pada semua video di daftar ini. Bawaan 0 (tanpa jeda tambahan). */
  jedaAntarParagrafMs?: number;
};

/**
 * Daftar video cerita: kartu longgar dengan sampul ikon IGIL. Ketuk Putar, pemutar muncul sebagai pop-up di atas tab mengambang.
 */
export function DaftarVideoCerita({ videos, speakGuru, jedaAntarParagrafMs = 0 }: PropsDaftar) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [ditonton, setDitonton] = useState<string[]>([]);
  const [portalSiap, setPortalSiap] = useState(false);
  const banyak = videos.length;
  const videoAktif = videos.find((v) => v.naskah.id === aktif) ?? null;
  const indeksAktif = videoAktif ? videos.indexOf(videoAktif) : -1;
  const lebarKartu = banyak <= 1 ? "w-full max-w-xl" : "w-full sm:flex-1";

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
              aria-label={`Video ${indeksAktif + 1}: ${videoAktif.naskah.judul}, ${videoAktif.naskah.subjudul}`}
              className="relative z-[1] flex max-h-[min(94vh,56rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.6rem] border-4 border-[#FFE566] bg-white shadow-[0_12px_40px_rgba(28,1,165,0.45)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 bg-[#1C01A5] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-wide text-[#FFE566]/80">
                    Video {indeksAktif + 1} dari {banyak} · {videoAktif.naskah.subjudul}
                  </p>
                  <p className="truncate text-base font-black text-white sm:text-lg">{videoAktif.naskah.judul}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAktif(null)}
                  className="shrink-0 rounded-full border-2 border-[#FFE566] bg-[#FFE566] px-4 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(0,0,0,0.25)]"
                >
                  ✕ Tutup
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
                <VideoCerita
                  polos
                  judul={videoAktif.naskah.judul}
                  subjudul={videoAktif.naskah.subjudul}
                  adegan={videoAktif.adegan}
                  speakGuru={speakGuru}
                  jedaAntarParagrafMs={jedaAntarParagrafMs}
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
    <div className="space-y-5 p-1" data-igil-video-ui={IGIL_DAFTAR_VIDEO_UI}>
      <div className="flex w-full flex-col items-stretch gap-5 sm:flex-row sm:justify-center" role="list" aria-label="Daftar video cerita">
        {videos.map((v, i) => {
          const sedang = aktif === v.naskah.id;
          const label = `Putar video ${i + 1}: ${v.naskah.judul}`;
          return (
            <article
              key={v.naskah.id}
              role="listitem"
              className={`${lebarKartu} mx-auto overflow-hidden rounded-3xl border-2 bg-white ${sedang ? "border-amber-400" : "border-[#1C01A5]/25"}`}
            >
              <button
                type="button"
                onClick={() => setAktif(v.naskah.id)}
                aria-label={label}
                className="group relative flex aspect-video w-full items-center justify-center bg-[#1C01A5]"
              >
                <Image src="/icon-512.png" alt="" width={512} height={512} className="h-[78%] w-auto rounded-2xl object-contain" priority={i === 0} />
                <span className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#FFE566] bg-[#1C01A5] text-2xl text-[#FFE566] shadow-lg transition group-hover:scale-105">
                  ▶
                </span>
              </button>
              <div className="space-y-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/60">
                    Video {i + 1} dari {banyak}
                  </p>
                  <h4 className="mt-1 text-lg font-black leading-tight text-[#1C01A5]">{v.naskah.judul}</h4>
                  <p className="mt-1 text-sm font-bold text-[#1C01A5]/70">
                    {v.naskah.subjudul} · {v.adegan.length} adegan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAktif(sedang ? null : v.naskah.id)}
                  className="flex min-h-[56px] w-full items-center justify-center rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-lg font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
                >
                  {sedang ? "⏹ Tutup" : ditonton.includes(v.naskah.id) ? "↻ Putar lagi" : "▶ Putar"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-sm font-black text-[#1C01A5]/70">
        Sudah ditonton: {ditonton.length} dari {banyak}
        {ditonton.length === banyak ? " ⭐ Hebat!" : ""}
      </p>

      {popup}
    </div>
  );
}
