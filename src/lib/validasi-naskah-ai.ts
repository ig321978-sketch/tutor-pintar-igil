const POLA_NILAI_KOSONG =
  /^(undefined|null|none|n\/a|nan|true|false|error)$/i;

const POLA_GALAT_GOOGLE =
  /error fetching data|failed to fetch|internal(?:\s+server)?\s+error|RESOURCE_EXHAUSTED|PERMISSION_DENIED|UNAVAILABLE|DEADLINE_EXCEEDED|API key|quota exceeded|finishReason|MAX_TOKENS|RECITATION|blockedPrompt|safetyRatings|"error"\s*:\s*\{|candidates"\s*:\s*\[\s*\]/i;

export const PESAN_GAGAL_SUSUN_MATERI =
  "Gagal menyusun materi, silakan klik lagi.";

export function permintaanDibatalkan(error: unknown): boolean {
  if (!error) return false;
  if (error instanceof DOMException && error.name === "AbortError") return true;
  if (error instanceof Error && error.name === "AbortError") return true;
  const teks = error instanceof Error ? error.message : String(error);
  return /PERMINTAAN_DIBATALKAN|aborted|AbortError/i.test(teks);
}

export function buangTeksSampah(teks?: string | null): string {
  const t = (teks ?? "").trim();
  if (!t || POLA_NILAI_KOSONG.test(t)) return "";
  if (POLA_GALAT_GOOGLE.test(t.slice(0, 500))) return "";
  if (/sedang disiapkan|sedang disusun/i.test(t)) return "";
  return t;
}

export function teksNaskahUtuh(
  teks?: string | null,
  opsi?: { min?: number },
): boolean {
  const t = buangTeksSampah(teks);
  return t.length >= (opsi?.min ?? 40);
}

export function tolakJikaDibatalkan(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new Error("PERMINTAAN_DIBATALKAN");
  }
}
