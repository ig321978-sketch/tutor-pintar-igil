import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab3.json";

/**
 * Paket Matematika Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-4-bab3` di IgilModulePlayer.tsx
 * (cerita "Orkestra Angklung Kampung Senandung"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🎶" }, B: { emoji: "🔢" } },
};

export default paket;
