import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab3.json";

/**
 * Paket Matematika Kelas 5 Bab 3 (Bilangan Pecahan): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-5-bab3` di IgilModulePlayer.tsx
 * (cerita "Toko Roti Keliling"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🥖" }, B: { emoji: "🥐" }, C: { emoji: "🍰" } },
};

export default paket;
