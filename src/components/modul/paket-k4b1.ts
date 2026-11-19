import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab1.json";

/**
 * Paket Matematika Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000): hanya data JSON dan ikon Sub-Bab. Komponen tiap tahap
 * (Mind-map, Infografis, Concrete, Pictorial, Abstract) dipasang sebagai cabang `mtk-4-bab1` di IgilModulePlayer.tsx
 * (cerita "Penginapan Pulau Karang Indah"), dan Story di registri-cerita-baru.ts. Dimuat malas.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {},
  emoji: { A: { emoji: "🔢" }, B: { emoji: "📍" }, C: { emoji: "⚖️" }, D: { emoji: "🧩" }, E: { emoji: "➕" }, F: { emoji: "➖" }, G: { emoji: "✖️" }, H: { emoji: "➗" }, I: { emoji: "🔁" } },
};

export default paket;
