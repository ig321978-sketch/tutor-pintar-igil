import { kartuTanpaNaskah } from "@/lib/konsep-materi";
import { naskahTutorUntukSuara } from "@/lib/naskah-lisan";

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

export async function siapkanAudioModulPermanen(_opsi?: {
  kelas: string;
  mapel: string;
  materi: string;
  curriculum_view: string;
  global_best_view: string;
}): Promise<void> {
  return;
}
