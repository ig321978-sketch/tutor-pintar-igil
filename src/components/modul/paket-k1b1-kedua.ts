import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas1-bab1-kedua.json";
import { TahapBelumSiap } from "./TahapBelumSiap";
import { VideoO2K1A } from "./video-o2k1a";

/**
 * Opsi 2 Kelas 1 Bab 1 (naskah orisinal IGIL, dunia Kampung Cemara; acuan naskah/kitab-dunia-k1.md), hanya Sub-Bab A.
 * Story (Tahap 2) sudah ditulis di dunia Kampung Cemara; tahap lain masih pengisi sementara. Opsi 1 (Modul Kesatu) tidak diubah.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoO2K1A, peta: [] as unknown as PaketBab["sub"][string]["peta"], Infografis: TahapBelumSiap, Concrete: TahapBelumSiap, Picture: TahapBelumSiap, Abstract: TahapBelumSiap, uraianPeta: true },
  },
  emoji: { A: { emoji: "🏮" } },
};
export default paket;
