import {
  durasiWavDetik,
  namaSuaraChirp,
  sintesisChirp,
  ttsSiapDipakai,
} from "@/lib/google-tts";
import { kartuTanpaNaskah } from "@/lib/konsep-materi";
import { naskahTutorUntukSuara } from "@/lib/naskah-lisan";
import { kunciNaskahTts, simpanCacheTts } from "@/lib/tts-cache";
import { tandaiAudioModulSiap } from "@/lib/cache-materi-tutor";
import type { KelaminTts } from "@/lib/tts";

export function naskahTubuhModul(
  penjelasan: string,
  kelas: string,
): string {
  return naskahTutorUntukSuara("", penjelasan, "", {
    tanpaSapaan: true,
    buangSubjudulVisual: kartuTanpaNaskah(kelas),
  });
}

export function potongSapaanNaskah(naskah: string): string {
  const blok = naskah
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (blok.length <= 1) return naskah.trim();
  return blok.slice(1).join("\n\n");
}

export async function siapkanAudioModulPermanen(opsi: {
  kelas: string;
  mapel: string;
  materi: string;
  curriculum_view: string;
  global_best_view: string;
}): Promise<void> {
  if (!ttsSiapDipakai()) return;

  const naskah = [
    naskahTubuhModul(opsi.curriculum_view, opsi.kelas),
    naskahTubuhModul(opsi.global_best_view, opsi.kelas),
  ].filter(Boolean);
  const klip = naskah.flatMap((teks) =>
    teks
      .split(/\n\n+/)
      .map((item) => item.trim())
      .filter(Boolean),
  );
  const suara: Array<{ kelamin: KelaminTts }> = [
    { kelamin: "female" },
    { kelamin: "male" },
  ];

  for (const teks of klip) {
    for (const item of suara) {
      const namaSuara = namaSuaraChirp(item.kelamin, opsi.kelas);
      const kunci = kunciNaskahTts(namaSuara, teks, false);
      try {
        const audio = await sintesisChirp(teks, namaSuara);
        await simpanCacheTts(kunci, audio, {
          mime: "audio/wav",
          durasiDetik: durasiWavDetik(audio),
          suara: namaSuara,
        });
      } catch (error) {
        const pesan = error instanceof Error ? error.message : String(error);
        console.warn("[audio-modul] gagal sintesis:", pesan.slice(0, 180));
      }
    }
  }

  await tandaiAudioModulSiap(opsi.kelas, opsi.mapel, opsi.materi);
}
