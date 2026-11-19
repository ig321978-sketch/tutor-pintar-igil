import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab3.json";

/**
 * Paket Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-3-bab3` di IgilModulePlayer.tsx
 * (cerita "Kebun Binatang Mini"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: {
    A: { emoji: "📏" },
    B: { emoji: "📐" },
    C: { emoji: "⚖️" },
    D: { emoji: "🏋️" },
  },
};

export default paket;
