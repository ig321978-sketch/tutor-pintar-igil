const AWALAN = "igil-pemanasan-otak";

function tanggalLokal(sekarang = new Date()): string {
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const hari = String(sekarang.getDate()).padStart(2, "0");
  return `${sekarang.getFullYear()}-${bulan}-${hari}`;
}

function kunci(moduleId: string): string {
  return `${AWALAN}:${moduleId}`;
}

export function pemanasanSelesaiHariIni(moduleId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(kunci(moduleId)) === tanggalLokal();
  } catch {
    return false;
  }
}

export function tandaiPemanasanSelesaiHariIni(moduleId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(kunci(moduleId), tanggalLokal());
  } catch {
    /* mode privat: pemanasan tetap selesai untuk kunjungan ini */
  }
}
