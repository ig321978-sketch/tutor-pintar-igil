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

function blobWavHening(milidetik: number): Blob {
  const sampleRate = 24_000;
  const sampel = Math.max(1, Math.round((sampleRate * milidetik) / 1000));
  const pcm = new ArrayBuffer(sampel * 2);
  const header = new ArrayBuffer(44);
  const lihat = new DataView(header);
  const tulis = (offset: number, teks: string) => {
    for (let i = 0; i < teks.length; i += 1) {
      lihat.setUint8(offset + i, teks.charCodeAt(i));
    }
  };
  tulis(0, "RIFF");
  lihat.setUint32(4, 36 + pcm.byteLength, true);
  tulis(8, "WAVE");
  tulis(12, "fmt ");
  lihat.setUint32(16, 16, true);
  lihat.setUint16(20, 1, true);
  lihat.setUint16(22, 1, true);
  lihat.setUint32(24, sampleRate, true);
  lihat.setUint32(28, sampleRate * 2, true);
  lihat.setUint16(32, 2, true);
  lihat.setUint16(34, 16, true);
  tulis(36, "data");
  lihat.setUint32(40, pcm.byteLength, true);
  return new Blob([header, pcm], { type: "audio/wav" });
}

function putarUrl(url: string, sinyal: AbortSignal): Promise<void> {
  return new Promise((selesai, gagal) => {
    if (sinyal.aborted) {
      gagal(new DOMException("Dibatalkan", "AbortError"));
      return;
    }
    const audio = new Audio();
    audio.preload = "auto";
    let selesaiSudah = false;
    let cadangan = 0;
    const tutup = (ok: boolean) => {
      if (selesaiSudah) return;
      selesaiSudah = true;
      window.clearTimeout(cadangan);
      audio.pause();
      audio.onended = null;
      audio.onerror = null;
      sinyal.removeEventListener("abort", saatBatal);
      if (ok) selesai();
      else gagal(new DOMException("Dibatalkan", "AbortError"));
    };
    const saatBatal = () => tutup(false);
    const saatSelesai = () => tutup(true);
    audio.onended = saatSelesai;
    audio.onerror = saatSelesai;
    sinyal.addEventListener("abort", saatBatal);
    audio.src = url;
    void audio.play().then(() => {
      const durasiMs = Number.isFinite(audio.duration)
        ? Math.ceil(audio.duration * 1000) + 80
        : 1200;
      cadangan = window.setTimeout(saatSelesai, durasiMs);
    }).catch(saatSelesai);
  });
}

async function jedaHening(ms: number, sinyal: AbortSignal): Promise<void> {
  if (ms <= 0) return;
  const url = URL.createObjectURL(blobWavHening(ms));
  try {
    await putarUrl(url, sinyal);
  } finally {
    URL.revokeObjectURL(url);
  }
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
        await jedaHening(cuplikan[i].jedaSetelahMs, kontrol.signal);
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
      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-extrabold transition-all ${
        memutar
          ? "bg-slate-400 text-white border-2 border-slate-500 hover:bg-slate-500"
          : kelasTombolUtama
      }`}
      aria-pressed={memutar}
    >
      <Volume2 className="h-5 w-5" />
      {memutar ? "Hentikan Penjelasan Guru" : "Dengarkan Penjelasan Guru"}
    </button>
  );
}
