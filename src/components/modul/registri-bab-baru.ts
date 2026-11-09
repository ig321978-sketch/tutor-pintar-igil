import type { BabBaru, PaketBab } from "@/components/IgilModulePlayer";

/**
 * Registri bab Matematika Kelas 3 sampai 6. Tiap bab dimuat malas (import dinamis) supaya data JSON dan komponen
 * bab lain tidak ikut terunduh. Tambahkan satu baris per bab baru. Isi paket ada di paket-k<kelas>b<bab>.ts.
 */
export const MUAT_BAB_BARU: Partial<Record<BabBaru, () => Promise<{ default: PaketBab }>>> = {
  "mtk-3-bab1": () => import("./paket-k3b1"),
  "mtk-3-bab2": () => import("./paket-k3b2"),
};
