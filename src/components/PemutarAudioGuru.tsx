"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { KataWaktu } from "@/lib/tts";

type Props = {
  src: string | null;
  memutar: boolean;
  lajuPutar?: number;
  tanpaLiveCaption?: boolean;
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
  await el.play().catch((error) => {
    void error;
  });
  terapkanLaju(el, laju);
}

const PemutarAudioGuru = forwardRef<KontrolPemutarGuru, Props>(
  function PemutarAudioGuru(
    {
      src,
      memutar,
      lajuPutar = 1,
      tanpaLiveCaption = false,
      padaWaktu,
      padaSelesai,
      padaDurasi,
    },
    ref,
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lajuRef = useRef(lajuPutar);
    const srcRef = useRef(src);
    const memutarRef = useRef(memutar);
    const tanpaCaptionRef = useRef(tanpaLiveCaption);
    const padaWaktuRef = useRef(padaWaktu);
    const padaSelesaiRef = useRef(padaSelesai);
    const padaDurasiRef = useRef(padaDurasi);
    const ctxRef = useRef<AudioContext | null>(null);
    const sumberRef = useRef<AudioBufferSourceNode | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);
    const bufferUrlRef = useRef<string | null>(null);
    const offsetRef = useRef(0);
    const mulaiKonteksRef = useRef(0);
    const frameRef = useRef(0);

    lajuRef.current = lajuPutar;
    srcRef.current = src;
    memutarRef.current = memutar;
    tanpaCaptionRef.current = tanpaLiveCaption;
    padaWaktuRef.current = padaWaktu;
    padaSelesaiRef.current = padaSelesai;
    padaDurasiRef.current = padaDurasi;

    const hentikanSumber = () => {
      if (sumberRef.current) {
        sumberRef.current.onended = null;
        try {
          sumberRef.current.stop();
        } catch {
          // sudah berhenti
        }
        sumberRef.current.disconnect();
        sumberRef.current = null;
      }
    };

    const waktuKonteks = () => {
      const ctx = ctxRef.current;
      if (!ctx || !memutarRef.current) return offsetRef.current;
      return (
        offsetRef.current +
        Math.max(0, ctx.currentTime - mulaiKonteksRef.current) * lajuRef.current
      );
    };

    const jagaWaktu = () => {
      if (!tanpaCaptionRef.current) return;
      padaWaktuRef.current(waktuKonteks());
      if (memutarRef.current) {
        frameRef.current = window.requestAnimationFrame(jagaWaktu);
      }
    };

    const buatKonteks = () => {
      const Win = window as Window & {
        webkitAudioContext?: typeof AudioContext;
      };
      return new (window.AudioContext || Win.webkitAudioContext)();
    };

    const muatBuffer = async (url: string): Promise<AudioBuffer> => {
      if (bufferRef.current && bufferUrlRef.current === url) {
        return bufferRef.current;
      }
      const ctx = ctxRef.current ?? buatKonteks();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      const respons = await fetch(url);
      const biner = await respons.arrayBuffer();
      const buffer = await ctx.decodeAudioData(biner.slice(0));
      bufferRef.current = buffer;
      bufferUrlRef.current = url;
      padaDurasiRef.current(buffer.duration);
      return buffer;
    };

    const mainkanKonteks = async (url: string, detik = 0) => {
      const ctx = ctxRef.current ?? buatKonteks();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      const buffer = await muatBuffer(url);
      hentikanSumber();
      const aman = Math.max(0, Math.min(detik, buffer.duration));
      const sumber = ctx.createBufferSource();
      sumber.buffer = buffer;
      sumber.playbackRate.value = lajuRef.current;
      sumber.connect(ctx.destination);
      sumber.onended = () => {
        if (sumberRef.current !== sumber) return;
        sumberRef.current = null;
        offsetRef.current = buffer.duration;
        padaWaktuRef.current(buffer.duration);
        padaSelesaiRef.current();
      };
      sumberRef.current = sumber;
      offsetRef.current = aman;
      mulaiKonteksRef.current = ctx.currentTime;
      sumber.start(0, aman);
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(jagaWaktu);
    };

    useImperativeHandle(
      ref,
      () => ({
        mainkanDariAwal: async (url) => {
          const sumber = url || srcRef.current;
          if (!sumber) return;
          if (tanpaCaptionRef.current) {
            offsetRef.current = 0;
            await mainkanKonteks(sumber, 0);
            return;
          }
          const el = audioRef.current;
          if (!el) return;
          if (el.src !== sumber) {
            el.src = sumber;
            el.load();
          }
          el.currentTime = 0;
          await mainkanElemen(el, lajuRef.current);
        },
        mainkanDari: async (url, detik = 0) => {
          if (tanpaCaptionRef.current) {
            await mainkanKonteks(url, detik);
            return;
          }
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
          await el.play().catch((error) => {
            void error;
          });
          terapkanLaju(el, lajuRef.current);
        },
        lanjutkan: async () => {
          if (tanpaCaptionRef.current) {
            const url = srcRef.current;
            if (!url) return;
            await mainkanKonteks(url, offsetRef.current);
            return;
          }
          const el = audioRef.current;
          if (!el) return;
          await mainkanElemen(el, lajuRef.current);
        },
        jeda: () => {
          if (tanpaCaptionRef.current) {
            offsetRef.current = waktuKonteks();
            hentikanSumber();
            window.cancelAnimationFrame(frameRef.current);
            return;
          }
          audioRef.current?.pause();
        },
        cariKe: (detik: number) => {
          if (tanpaCaptionRef.current) {
            offsetRef.current = Math.max(0, detik);
            if (memutarRef.current && srcRef.current) {
              void mainkanKonteks(srcRef.current, offsetRef.current);
            }
            return;
          }
          const el = audioRef.current;
          if (!el) return;
          const batas = Number.isFinite(el.duration) ? el.duration : detik;
          el.currentTime = Math.max(0, Math.min(detik, batas));
        },
      }),
      [],
    );

    useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      const saatWaktu = () => padaWaktuRef.current(el.currentTime);
      const saatMeta = () => {
        if (Number.isFinite(el.duration) && el.duration > 0) {
          padaDurasiRef.current(el.duration);
        }
      };
      const saatSelesai = () => padaSelesaiRef.current();
      el.addEventListener("timeupdate", saatWaktu);
      el.addEventListener("loadedmetadata", saatMeta);
      el.addEventListener("ended", saatSelesai);
      return () => {
        el.removeEventListener("timeupdate", saatWaktu);
        el.removeEventListener("loadedmetadata", saatMeta);
        el.removeEventListener("ended", saatSelesai);
      };
    }, []);

    useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      terapkanLaju(el, lajuPutar);
      if (sumberRef.current) {
        sumberRef.current.playbackRate.value = lajuPutar;
      }
    }, [lajuPutar]);

    useEffect(() => {
      const el = audioRef.current;
      if (!el || !src) return;
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
      terapkanLaju(el, lajuRef.current);
      void el.play().catch((error) => {
        void error;
      });
    }, [src]);

    useEffect(() => {
      return () => {
        hentikanSumber();
        window.cancelAnimationFrame(frameRef.current);
        void ctxRef.current?.close();
      };
    }, []);

    return (
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        aria-hidden="true"
        className="hidden sr-only"
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
