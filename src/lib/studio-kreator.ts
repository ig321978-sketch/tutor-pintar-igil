import type { IsiCacheMateri } from "@/lib/cache-materi-tutor";

export function sebagaiTeksStudio(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

export function formatWaktuCache(nilai: string): string {
  if (!nilai) return "—";
  const cocok = nilai.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/);
  if (cocok) return `${cocok[1]} ${cocok[2]}`;
  return nilai;
}

export async function kunciRuteStudio(
  params: Promise<{ kunci: string }> | { kunci: string },
): Promise<string> {
  const nilai = await Promise.resolve(params);
  return decodeURIComponent(nilai.kunci ?? "").trim();
}

export function isiDariBadanStudio(body: Record<string, unknown>): IsiCacheMateri {
  return {
    curriculum_view: sebagaiTeksStudio(body.curriculum_view),
    global_best_view: sebagaiTeksStudio(body.global_best_view),
    sketsaKartu: sebagaiTeksStudio(body.sketsaKartu ?? body.sketsa_kartu),
    svgCode: sebagaiTeksStudio(body.svgCode ?? body.svg_code),
    pertanyaan: sebagaiTeksStudio(body.pertanyaan),
    kunciJawaban: sebagaiTeksStudio(body.kunciJawaban ?? body.kunci_jawaban),
    motivasi: sebagaiTeksStudio(body.motivasi),
  };
}
