import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab5.json";

/**
 * Paket Matematika Kelas 3 Bab 5 (Penyajian Data dalam Tabel): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-3-bab5` di IgilModulePlayer.tsx
 * (cerita "Bengkel Sepeda Pak Hasan"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: {
    A: { emoji: "📶" },
    B: { emoji: "📋" },
  },
};

export default paket;
