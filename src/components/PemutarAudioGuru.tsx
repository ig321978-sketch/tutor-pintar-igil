"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { KataWaktu } from "@/lib/tts";

type Props = {
  src: string | null;
  memutar: boolean;
  padaWaktu: (detik: number) => void;
  padaSelesai: () => void;
  padaDurasi: (detik: number) => void;
};

export type KontrolPemutarGuru = {
  mainkanDariAwal: (url?: string | null) => Promise<void>;
  lanjutkan: () => Promise<void>;
  jeda: () => void;
};

async function mainkanElemen(el: HTMLAudioElement): Promise<void> {
  if (el.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
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
  await el.play();
}

const PemutarAudioGuru = forwardRef<KontrolPemutarGuru, Props>(
  function PemutarAudioGuru(
    { src, memutar, padaWaktu, padaSelesai, padaDurasi },
    ref,
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
          await mainkanElemen(el);
        },
        lanjutkan: async () => {
          const el = audioRef.current;
          if (!el) return;
          await mainkanElemen(el);
        },
        jeda: () => {
          audioRef.current?.pause();
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
      if (!el || !src) return;
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
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
