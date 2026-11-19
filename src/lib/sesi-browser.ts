/** Tanda sesi di tab/browser. Hilang saat aplikasi ditutup → user harus masuk lagi. */
export const KUNCI_SESI_BROWSER = "igil_sesi_browser_v1";

export function tandaiSesiBrowser(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KUNCI_SESI_BROWSER, "1");
  } catch {
    // mode privat / kuota penuh: biarkan penjaga menangani lewat cookie saja
  }
}

export function adaSesiBrowser(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(KUNCI_SESI_BROWSER) === "1";
  } catch {
    return false;
  }
}

export function hapusSesiBrowser(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KUNCI_SESI_BROWSER);
  } catch {
    // abaikan
  }
}
