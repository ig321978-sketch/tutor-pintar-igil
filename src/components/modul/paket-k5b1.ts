import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab1.json";

/**
 * Paket Matematika Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-5-bab1` di IgilModulePlayer.tsx
 * (cerita "Hari Pertandingan di Stadion Kota"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🎫" }, B: { emoji: "📏" }, C: { emoji: "📦" }, D: { emoji: "🧮" } },
};

export default paket;
