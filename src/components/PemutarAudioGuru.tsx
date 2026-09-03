"use client";

import { useEffect, useRef } from "react";
import type { KataWaktu } from "@/lib/tts";

type Props = {
  src: string | null;
  memutar: boolean;
  padaWaktu: (detik: number) => void;
  padaSelesai: () => void;
  padaDurasi: (detik: number) => void;
};

export default function PemutarAudioGuru({
  src,
  memutar,
  padaWaktu,
  padaSelesai,
  padaDurasi,
}: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = ref.current;
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
    const el = ref.current;
    if (!el || !src) return;
    if (el.src !== src) {
      el.src = src;
      el.load();
    }
    if (memutar) {
      void el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [memutar, src]);

  return <audio ref={ref} preload="auto" className="sr-only" />;
}

export function indeksKataAktif(daftar: KataWaktu[], detik: number): number {
  if (daftar.length === 0) return -1;
  for (let i = 0; i < daftar.length; i += 1) {
    if (detik < daftar[i].selesai) return i;
  }
  return daftar.length - 1;
}
