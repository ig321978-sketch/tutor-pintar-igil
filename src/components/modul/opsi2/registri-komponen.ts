import type { KomponenAksi } from "./tipe-aksi";

/**
 * Registri komponen tindakan, kunci = id tindakan yang sama dengan di registri logika (src/lib/opsi2).
 * Berkas komponen tindakan memanggil daftarkanKomponen saat dimuat; berkas tahap (mis. k1b1a-concrete.tsx) mengimpornya.
 */
export const KOMPONEN_TINDAKAN: Record<string, KomponenAksi> = {};

export function daftarkanKomponen(id: string, komponen: KomponenAksi): void {
  KOMPONEN_TINDAKAN[id] = komponen;
}
