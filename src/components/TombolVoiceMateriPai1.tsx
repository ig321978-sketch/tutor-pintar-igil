"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import {
  hentikanAudioGuruAktif,
  mintaAudioTts,
} from "@/lib/putar-tts-klien";
import { cuplikanVoicePai1Bab1 } from "@/lib/naskah-voice-pai-1-bab1";
import { bacaProgres } from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";
import { normalisasiKelaminGuru, type KelaminGuru } from "@/lib/guru";

function jedaMs(ms: number, sinyal: AbortSignal): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((selesai, gagal) => {
    if (sinyal.aborted) {
      gagal(new DOMException("Dibatalkan", "AbortError"));
      return;
    }
    const timer = window.setTimeout(selesai, ms);
    const saatBatal = () => {
      window.clearTimeout(timer);
      gagal(new DOMException("Dibatalkan", "AbortError"));
    };
    sinyal.addEventListener("abort", saatBatal, { once: true });
  });
}

function putarUrl(url: string, sinyal: AbortSignal): Promise<void> {
  return new Promise((selesai, gagal) => {
    if (sinyal.aborted) {
      gagal(new DOMException("Dibatalkan", "AbortError"));
      return;
    }
    const audio = new Audio(url);
    audio.preload = "auto";
    const bersihkan = () => {
      audio.onended = null;
      audio.onerror = null;
      sinyal.removeEventListener("abort", saatBatal);
    };
    const saatBatal = () => {
      audio.pause();
      audio.removeAttribute("src");
      bersihkan();
      gagal(new DOMException("Dibatalkan", "AbortError"));
    };
    audio.onended = () => {
      bersihkan();
      selesai();
    };
    audio.onerror = () => {
      bersihkan();
      selesai();
    };
    sinyal.addEventListener("abort", saatBatal);
    void audio.play().catch(() => {
      bersihkan();
      selesai();
    });
  });
}

function adalahBatal(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export default function TombolVoiceMateriPai1({
  kelas = "",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const [memutar, setMemutar] = useState(false);
  const batalRef = useRef<AbortController | null>(null);

  const hentikan = () => {
    batalRef.current?.abort();
    batalRef.current = null;
    setMemutar(false);
  };

  useEffect(() => {
    return () => {
      batalRef.current?.abort();
      batalRef.current = null;
    };
  }, []);

  const mulai = async () => {
    hentikanAudioGuruAktif();
    const kontrol = new AbortController();
    batalRef.current = kontrol;
    setMemutar(true);
    const profil = bacaProgres().profil;
    const guru = normalisasiKelaminGuru(kelamin ?? profil.guruKelamin);
    const kelasSuara = (kelas || profil.kelas || "1 SD").trim();
    const cuplikan = cuplikanVoicePai1Bab1(guru);
    const antrian = cuplikan.map((item) =>
      mintaAudioTts(item.teks, guru, kelasSuara, {
        persist: true,
        tanpaNotasi: true,
      }),
    );
    try {
      for (let i = 0; i < cuplikan.length; i += 1) {
        if (kontrol.signal.aborted) return;
        const hasil = await antrian[i];
        if (kontrol.signal.aborted) return;
        if (hasil?.url) {
          await putarUrl(hasil.url, kontrol.signal);
        }
        if (kontrol.signal.aborted) return;
        await jedaMs(cuplikan[i].jedaSetelahMs, kontrol.signal);
      }
    } catch (error) {
      if (!adalahBatal(error)) {
        console.warn("[voice-materi] gagal memutar naskah guru", error);
      }
    } finally {
      if (batalRef.current === kontrol) {
        batalRef.current = null;
        setMemutar(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (memutar) hentikan();
        else void mulai();
      }}
      className={`${kelasTombolUtama} flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-extrabold`}
      aria-pressed={memutar}
    >
      <Volume2 className="h-5 w-5" />
      {memutar ? "Hentikan Penjelasan Guru" : "Dengarkan Penjelasan Guru"}
    </button>
  );
}
