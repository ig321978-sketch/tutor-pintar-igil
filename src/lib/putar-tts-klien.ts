import type { KelaminGuru } from "@/lib/guru";
import {
  ambilCacheAudioTts,
  blobDariCacheAudio,
  kunciCacheAudioTts,
  simpanCacheAudioTts,
} from "@/lib/cache-audio-tts-klien";
import type { KataWaktu } from "@/lib/tts";
import { cariAudioGuruStatis } from "@/lib/audio-guru-statis";

/**
 * Sintesis langsung ke /api/tts dimatikan untuk siswa. Hanya menyala bila penulis menyetel
 * NEXT_PUBLIC_IGIL_TTS_PENULIS=1 di server dev lokal (server produksi menolaknya juga).
 */
const IZIN_SINTESIS_PENULIS = process.env.NEXT_PUBLIC_IGIL_TTS_PENULIS === "1";

/**
 * Hanya di server dev: catat setiap ucapan yang diminta ke berkas naskah penulisan
 * (src/content-master/naskah-guru.json), supaya skrip pembuat audio tahu apa yang perlu dibuat.
 */
const SUDAH_DIREKAM = new Set<string>();
function rekamNaskahPenulis(
  kunci: string,
  isi: { teks: string; kelas: string; tanpaNotasi: boolean; suaraTetap: boolean },
): void {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return;
  if (SUDAH_DIREKAM.has(kunci)) return;
  SUDAH_DIREKAM.add(kunci);
  void fetch("/api/dev/naskah-guru", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isi),
  }).catch(() => {});
}

export type HasilAudioTts = {
  url: string;
  durasi: number;
  mime: string;
  kata: KataWaktu[];
};

const urlAktif = new Map<string, string>();
const sedangDiminta = new Map<string, Promise<HasilAudioTts | null>>();

function urlDariItem(
  kunci: string,
  item: { mime: string; audioBase64: string },
): string {
  const sudah = urlAktif.get(kunci);
  if (sudah) return sudah;
  const url = URL.createObjectURL(
    blobDariCacheAudio({
      mime: item.mime,
      audioBase64: item.audioBase64,
      durasiDetik: 0,
      kata: [],
    }),
  );
  urlAktif.set(kunci, url);
  return url;
}

export async function mintaAudioTts(
  teks: string,
  kelamin: KelaminGuru,
  kelas = "3 SD",
  opsi: {
    persist?: boolean;
    hanyaCache?: boolean;
    tanpaNotasi?: boolean;
    suaraTetap?: boolean;
  } = {},
): Promise<HasilAudioTts | null> {
  const persist = opsi.persist !== false;
  const hanyaCache = opsi.hanyaCache === true;
  const tanpaNotasi = opsi.tanpaNotasi === true;
  const suaraTetap = opsi.suaraTetap === true;
  const naskah = teks.replace(/\s+/g, " ").trim();
  if (!naskah) return null;
  const kunci = kunciCacheAudioTts(naskah, kelamin, kelas, {
    tanpaNotasi,
    suaraTetap,
  });
  rekamNaskahPenulis(kunci, { teks: naskah, kelas, tanpaNotasi, suaraTetap });
  const cached = await ambilCacheAudioTts(kunci);
  if (cached) {
    return {
      url: urlDariItem(kunci, cached),
      durasi: cached.durasiDetik,
      mime: cached.mime,
      kata: cached.kata,
    };
  }
  // Berkas audio statis yang dibuat sekali saat penulisan. Ini satu-satunya sumber untuk siswa.
  const statis = await cariAudioGuruStatis(kunci);
  if (statis) return { url: statis, durasi: 0, mime: "audio/mpeg", kata: [] };
  // Tanpa berkas statis, siswa tidak pernah meminta sintesis ke layanan berbayar:
  // pemanggil memakai suara perangkat. Sintesis langsung hanya untuk penulis (dev).
  if (!IZIN_SINTESIS_PENULIS) return null;
  const menunggu = sedangDiminta.get(kunci);
  if (menunggu) return menunggu;
  if (hanyaCache) return null;
  const permintaan = (async (): Promise<HasilAudioTts | null> => {
  try {
    const respons = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        teks: naskah,
        kelamin: kelamin === "pria" ? "male" : "female",
        kelas,
        tanpaNotasi,
        suaraTetap,
      }),
    });
    const data = (await respons.json()) as {
      berhasil?: boolean;
      mime?: string;
      audioBase64?: string;
      durasiDetik?: number;
      kata?: KataWaktu[];
    };
    if (!data.berhasil || !data.audioBase64) return null;
    const item = {
      mime: data.mime || "audio/wav",
      audioBase64: data.audioBase64,
      durasiDetik:
        typeof data.durasiDetik === "number" && data.durasiDetik > 0
          ? data.durasiDetik
          : data.kata?.[data.kata.length - 1]?.selesai ?? 1,
      kata: data.kata ?? [],
    };
    if (persist) {
      await simpanCacheAudioTts(kunci, item);
    }
    return {
      url: urlDariItem(kunci, item),
      durasi: item.durasiDetik,
      mime: item.mime,
      kata: item.kata,
    };
  } catch {
    return null;
  } finally {
    sedangDiminta.delete(kunci);
  }
  })();
  sedangDiminta.set(kunci, permintaan);
  return permintaan;
}

let elemenPendek: HTMLAudioElement | null = null;
let elemenSapaan: HTMLAudioElement | null = null;
let sapaanDipesan = false;
const pendengarHentiAudio = new Set<() => void>();

export function saatHentiAudioGuru(fn: () => void): () => void {
  pendengarHentiAudio.add(fn);
  return () => {
    pendengarHentiAudio.delete(fn);
  };
}

export function hentikanAudioGuruAktif(): void {
  sapaanDipesan = false;
  if (elemenSapaan) {
    elemenSapaan.pause();
    elemenSapaan.currentTime = 0;
  }
  if (elemenPendek) {
    elemenPendek.pause();
    elemenPendek.currentTime = 0;
  }
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel();
  }
  for (const fn of pendengarHentiAudio) fn();
}

function pasangElemen(
  el: HTMLAudioElement | null,
  url: string,
): HTMLAudioElement {
  const audio = el ?? new Audio();
  audio.preload = "auto";
  if (audio.src !== url) audio.src = url;
  return audio;
}

export async function siapkanAudioSapaan(
  teks: string,
  kelamin: KelaminGuru,
  kelas = "3 SD",
): Promise<boolean> {
  const hasil = await mintaAudioTts(teks, kelamin, kelas, { persist: true });
  if (!hasil) return false;
  elemenSapaan = pasangElemen(elemenSapaan, hasil.url);
  return true;
}

export function putarAudioSapaanSiap(): boolean {
  if (!elemenSapaan?.src) return false;
  sapaanDipesan = true;
  void elemenSapaan.play().catch(() => {
    sapaanDipesan = false;
  });
  return true;
}

export function sedangMemutarSapaan(): boolean {
  if (sapaanDipesan) return true;
  return Boolean(elemenSapaan && !elemenSapaan.paused && !elemenSapaan.ended);
}

export async function putarTtsPendek(
  teks: string,
  kelamin: KelaminGuru,
  kelas = "3 SD",
  opsi: { persist?: boolean; hanyaCache?: boolean } = {},
): Promise<boolean> {
  const hasil = await mintaAudioTts(teks, kelamin, kelas, {
    persist: opsi.persist !== false,
    hanyaCache: opsi.hanyaCache,
  });
  if (!hasil) return false;
  elemenPendek = pasangElemen(elemenPendek, hasil.url);
  try {
    await elemenPendek.play();
    return true;
  } catch {
    return false;
  }
}
