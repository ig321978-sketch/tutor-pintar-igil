import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas1-bab1-kedua.json";
import { TahapBelumSiap } from "./TahapBelumSiap";

/**
 * Opsi 2 Kelas 1 Bab 1 (naskah orisinal IGIL, dunia Pulau Lentera; acuan naskah/kitab-dunia-k1.md), hanya Sub-Bab A.
 * Rangka Tahap 1: semua tahap masih pengisi sementara. Opsi 1 (Modul Kesatu) tidak diubah.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: TahapBelumSiap, peta: [] as unknown as PaketBab["sub"][string]["peta"], Infografis: TahapBelumSiap, Concrete: TahapBelumSiap, Picture: TahapBelumSiap, Abstract: TahapBelumSiap, uraianPeta: true },
  },
  emoji: { A: { emoji: "🏮" } },
};
export default paket;
