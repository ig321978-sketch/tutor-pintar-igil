"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { KataWaktu } from "@/lib/tts";

type Props = {
  src: string | null;
  memutar: boolean;
  lajuPutar?: number;
  padaWaktu: (detik: number) => void;
  padaSelesai: () => void;
  padaDurasi: (detik: number) => void;
};

export type KontrolPemutarGuru = {
  mainkanDariAwal: (url?: string | null) => Promise<void>;
  mainkanDari: (url: string, detik?: number) => Promise<void>;
  lanjutkan: () => Promise<void>;
  jeda: () => void;
  cariKe: (detik: number) => void;
};

async function siapkanElemen(el: HTMLAudioElement): Promise<void> {
  if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return;
  await new Promise<void>((selesai, gagal) => {
    const siap = () => {
      el.removeEventListener("canplay", siap);
      el.removeEventListener("error", rusak);
      selesai();
    };
    const rusak = () => {
      el.removeEventListener("canplay", siap);
      el.removeEventListener("error", rusak);
      gagal(new Error("Audio gagal dimuat."));
    };
    el.addEventListener("canplay", siap);
    el.addEventListener("error", rusak);
    el.load();
  });
}

function terapkanLaju(el: HTMLAudioElement, laju: number) {
  const aman = Number.isFinite(laju) && laju > 0 ? laju : 1;
  el.defaultPlaybackRate = aman;
  el.playbackRate = aman;
}

async function mainkanElemen(
  el: HTMLAudioElement,
  laju = 1,
): Promise<void> {
  await siapkanElemen(el);
  terapkanLaju(el, laju);
  await el.play();
  terapkanLaju(el, laju);
}

const PemutarAudioGuru = forwardRef<KontrolPemutarGuru, Props>(
  function PemutarAudioGuru(
    { src, memutar, lajuPutar = 1, padaWaktu, padaSelesai, padaDurasi },
    ref,
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lajuRef = useRef(lajuPutar);
    lajuRef.current = lajuPutar;

    useImperativeHandle(
      ref,
      () => ({
        mainkanDariAwal: async (url) => {
          const el = audioRef.current;
          const sumber = url || src;
          if (!el || !sumber) return;
          if (el.src !== sumber) {
            el.src = sumber;
            el.load();
          }
          el.currentTime = 0;
          await mainkanElemen(el, lajuRef.current);
        },
        mainkanDari: async (url, detik = 0) => {
          const el = audioRef.current;
          if (!el || !url) return;
          if (el.src !== url) {
            el.src = url;
            el.load();
          }
          await siapkanElemen(el);
          const batas = Number.isFinite(el.duration) ? el.duration : detik;
          el.currentTime = Math.max(0, Math.min(detik, batas));
          terapkanLaju(el, lajuRef.current);
          await el.play();
          terapkanLaju(el, lajuRef.current);
        },
        lanjutkan: async () => {
          const el = audioRef.current;
          if (!el) return;
          await mainkanElemen(el, lajuRef.current);
        },
        jeda: () => {
          audioRef.current?.pause();
        },
        cariKe: (detik: number) => {
          const el = audioRef.current;
          if (!el) return;
          const batas = Number.isFinite(el.duration) ? el.duration : detik;
          el.currentTime = Math.max(0, Math.min(detik, batas));
        },
      }),
      [src],
    );

    useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      const saatWaktu = () => padaWaktu(el.currentTime);
      const saatMeta = () => {
        if (Number.isFinite(el.duration) && el.duration > 0) {
          padaDurasi(el.duration);
        }
      };
      const saatSelesai = () => padaSelesai();
      el.addEventListener("timeupdate", saatWaktu);
      el.addEventListener("loadedmetadata", saatMeta);
      el.addEventListener("ended", saatSelesai);
      return () => {
        el.removeEventListener("timeupdate", saatWaktu);
        el.removeEventListener("loadedmetadata", saatMeta);
        el.removeEventListener("ended", saatSelesai);
      };
    }, [padaDurasi, padaSelesai, padaWaktu]);

    useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      terapkanLaju(el, lajuPutar);
    }, [lajuPutar]);

    useEffect(() => {
      const el = audioRef.current;
      if (!el || !src) return;
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
      terapkanLaju(el, lajuRef.current);
      if (!memutar) {
        el.pause();
      }
    }, [memutar, src]);

    return (
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        className="sr-only"
      />
    );
  },
);

export default PemutarAudioGuru;

export function indeksKataAktif(daftar: KataWaktu[], detik: number): number {
  if (daftar.length === 0) return -1;
  for (let i = 0; i < daftar.length; i += 1) {
    if (detik < daftar[i].selesai) return i;
  }
  return daftar.length - 1;
}
