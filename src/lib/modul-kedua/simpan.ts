import type { KartuUlang } from "./pengulangan";
import type { HasilTahap, TahapId } from "./tipe";

/** Penyimpanan LOKAL (localStorage) per siswa di perangkat ini. Supabase belum dipakai (keputusan pemilik). */
export type ProgresModulKedua = {
  versi: 1;
  idModul: string;
  mulai: string;
  hasil: Partial<Record<TahapId, HasilTahap>>;
  tahapSekarang: TahapId;
  kartu: KartuUlang[];
};

const kunciModul = (id: string) => `igil.modulKedua.${id}.v1`;
const aman = () => typeof window !== "undefined" && !!window.localStorage;

export function progresBaru(idModul: string): ProgresModulKedua {
  return { versi: 1, idModul, mulai: new Date().toISOString(), hasil: {}, tahapSekarang: "pretest", kartu: [] };
}

export function bacaProgresModul(idModul: string): ProgresModulKedua {
  if (!aman()) return progresBaru(idModul);
  try {
    const mentah = window.localStorage.getItem(kunciModul(idModul));
    if (!mentah) return progresBaru(idModul);
    const d = JSON.parse(mentah) as Partial<ProgresModulKedua>;
    if (d.versi !== 1) return progresBaru(idModul);
    return { ...progresBaru(idModul), ...d };
  } catch {
    return progresBaru(idModul);
  }
}

export function simpanProgresModul(p: ProgresModulKedua): void {
  if (!aman()) return;
  try {
    window.localStorage.setItem(kunciModul(p.idModul), JSON.stringify(p));
  } catch {
    /* penyimpanan penuh atau diblokir: abaikan, modul tetap berjalan */
  }
}

export function hapusProgresModul(idModul: string): void {
  if (!aman()) return;
  try {
    window.localStorage.removeItem(kunciModul(idModul));
  } catch {
    /* abaikan */
  }
}
