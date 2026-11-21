import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab6.json";

/**
 * Paket Matematika Kelas 4 Bab 6 (Piktogram dan Diagram Batang): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-4-bab6` di IgilModulePlayer.tsx
 * (cerita "Bazar Kuliner Sekolah"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🖼️" }, B: { emoji: "📊" } },
};

export default paket;
