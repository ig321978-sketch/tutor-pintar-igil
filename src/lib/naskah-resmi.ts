import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";

export type ModulTerbitPublik = {
  kelas: string;
  mapel: string;
  materi: string;
};

export function daftarNaskahResmiPublik(): ModulTerbitPublik[] {
  return [];
}

export function naskahResmiJikaAda(
  _kelas: string,
  _mapel: string,
  _materi: string,
): IsiCacheMateri | null {
  return null;
}

export function naskahTampilanResmi(_teks?: string): boolean {
  return false;
}

export function teksLisanResmiJikaAda(_teks?: string): string | null {
  return null;
}
