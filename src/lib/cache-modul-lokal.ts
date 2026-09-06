const KUNCI = "igil-cache-modul-v3";

export function bacaModulLokal<T>(topicId: string): T | null {
  if (typeof window === "undefined" || !topicId) return null;
  try {
    const mentah = window.localStorage.getItem(KUNCI);
    if (!mentah) return null;
    const semua = JSON.parse(mentah) as Record<string, T>;
    return semua[topicId] ?? null;
  } catch {
    return null;
  }
}

export function simpanModulLokalPertama<T>(topicId: string, data: T): void {
  if (typeof window === "undefined" || !topicId || !data) return;
  try {
    const mentah = window.localStorage.getItem(KUNCI);
    const semua = mentah
      ? (JSON.parse(mentah) as Record<string, T>)
      : {};
    if (semua[topicId]) return;
    semua[topicId] = data;
    window.localStorage.setItem(KUNCI, JSON.stringify(semua));
  } catch {
    // Kuota localStorage penuh: cache server tetap jadi sumber utama.
  }
}
