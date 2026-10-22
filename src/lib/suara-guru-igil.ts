import { normalisasiKelaminGuru, type KelaminGuru } from "@/lib/guru";
import { bacaPerlambatVoice, lajuPutarDariPerlambat } from "@/lib/laju-suara";
import { bacaProgres } from "@/lib/progres";
import { mintaAudioTts } from "@/lib/putar-tts-klien";

let audioAktif: HTMLAudioElement | null = null;
let genSuara = 0;

function konteksSuara(kelas?: string, kelamin?: KelaminGuru) {
  const profil = typeof window === "undefined" ? { kelas: "", guruKelamin: "wanita" as const } : bacaProgres().profil;
  return {
    guru: normalisasiKelaminGuru(kelamin ?? profil.guruKelamin),
    kelas: (kelas || profil.kelas || "1 SD").trim(),
  };
}

export function hentikanSuaraGuruIgil() {
  genSuara += 1;
  audioAktif?.pause();
  audioAktif = null;
}

export function siapkanSuaraGuruIgil(
  teks: string,
  opsi?: { kelas?: string; kelamin?: KelaminGuru },
) {
  const naskah = teks.replace(/\s+/g, " ").trim();
  if (!naskah || typeof window === "undefined") return;
  const { guru, kelas } = konteksSuara(opsi?.kelas, opsi?.kelamin);
  void mintaAudioTts(naskah, guru, kelas, { persist: true, tanpaNotasi: true });
}

export async function ucapkanGuruIgil(
  teks: string,
  opsi?: {
    kelas?: string;
    kelamin?: KelaminGuru;
    onBicara?: (sedang: boolean) => void;
  },
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const naskah = teks.replace(/\s+/g, " ").trim();
  if (!naskah) return false;
  const gen = ++genSuara;
  audioAktif?.pause();
  opsi?.onBicara?.(true);
  const { guru, kelas } = konteksSuara(opsi?.kelas, opsi?.kelamin);
  const hasil = await mintaAudioTts(naskah, guru, kelas, {
    persist: true,
    tanpaNotasi: true,
  });
  if (gen !== genSuara) return false;
  if (!hasil?.url) {
    opsi?.onBicara?.(false);
    return false;
  }
  const audio = new Audio(hasil.url);
  audio.preload = "auto";
  audio.playbackRate = lajuPutarDariPerlambat(bacaPerlambatVoice());
  audioAktif = audio;
  const selesai = () => {
    if (gen === genSuara) opsi?.onBicara?.(false);
  };
  audio.onended = selesai;
  audio.onerror = selesai;
  try {
    await audio.play();
    return true;
  } catch {
    selesai();
    return false;
  }
}
