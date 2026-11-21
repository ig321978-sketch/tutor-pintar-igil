import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab2.json";

/**
 * Paket Matematika Kelas 5 Bab 2 (KPK dan FPB): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-5-bab2` di IgilModulePlayer.tsx
 * (cerita "Pasar Kuliner Malam"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🔔" }, B: { emoji: "🍢" }, C: { emoji: "🥟" }, D: { emoji: "🎁" }, E: { emoji: "🏮" } },
};

export default paket;
