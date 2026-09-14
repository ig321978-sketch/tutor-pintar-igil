import type { RingkasCacheMateri } from "@/lib/jenis-cache-materi";
import { identitasCacheMateri } from "@/lib/kunci-siswa";
import {
  daftarNaskahResmiPublik,
  naskahResmiJikaAda,
  type ModulTerbitPublik,
} from "@/lib/naskah-resmi";

export type { ModulTerbitPublik };

export function cacheLayakTerbitPublik(
  item: Pick<
    RingkasCacheMateri,
    "kelas" | "mapel" | "materi" | "adaCacheMateri" | "isDraft" | "isLocked"
  >,
): boolean {
  if (!item.kelas.trim() || !item.mapel.trim() || !item.materi.trim()) {
    return false;
  }
  if (!item.adaCacheMateri) return false;
  return !item.isDraft || item.isLocked;
}

export function gabungModulTerbitPublik(
  cache: Array<
    Pick<
      RingkasCacheMateri,
      "kelas" | "mapel" | "materi" | "adaCacheMateri" | "isDraft" | "isLocked"
    >
  >,
): ModulTerbitPublik[] {
  const peta = new Map<string, ModulTerbitPublik>();
  for (const item of daftarNaskahResmiPublik()) {
    peta.set(identitasCacheMateri(item.kelas, item.mapel, item.materi), item);
  }
  for (const item of cache) {
    if (!cacheLayakTerbitPublik(item)) continue;
    const id = identitasCacheMateri(item.kelas, item.mapel, item.materi);
    if (peta.has(id)) continue;
    peta.set(id, {
      kelas: item.kelas,
      mapel: item.mapel,
      materi: item.materi,
    });
  }
  return [...peta.values()];
}

export function materiAdaDiDaftarTerbit(
  kelas: string,
  mapel: string,
  materi: string,
  daftar: ModulTerbitPublik[],
): boolean {
  if (naskahResmiJikaAda(kelas, mapel, materi)) return true;
  const id = identitasCacheMateri(kelas, mapel, materi);
  return daftar.some(
    (item) => identitasCacheMateri(item.kelas, item.mapel, item.materi) === id,
  );
}
