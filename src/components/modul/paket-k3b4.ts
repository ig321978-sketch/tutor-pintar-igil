import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab4.json";

/**
 * Paket Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-3-bab4` di IgilModulePlayer.tsx
 * (cerita "Festival Layang-layang Kampung"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: {
    A: { emoji: "📏" },
    B: { emoji: "📐" },
    C: { emoji: "🛤️" },
  },
};

export default paket;
