import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas1-bab1-kedua.json";
import { TahapBelumSiap } from "./TahapBelumSiap";
import { VideoO2K1A } from "./video-o2k1a";
import { ConcreteK1B1KA } from "./opsi2/k1b1a-concrete";
import { PictureK1B1KA } from "./opsi2/k1b1a-picture";
import { AbstractK1B1KA } from "./opsi2/k1b1a-abstract";

/**
 * Opsi 2 Kelas 1 Bab 1 (naskah orisinal IGIL, dunia Kampung Cemara; acuan naskah/kitab-dunia-k1.md), hanya Sub-Bab A.
 * Story, Mind-Map, Infografis (susun tab), Simulasi, Concrete, Picture, dan Abstract sudah ditulis (Mind-Map dan Infografis lewat RINGKAS_BAB,
 * Simulasi lewat SIMULASI_MATERI). Opsi 1 (Modul Kesatu) tidak diubah.
 */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: {
      Cerita: VideoO2K1A,
      peta: [] as unknown as PaketBab["sub"][string]["peta"],
      Infografis: TahapBelumSiap,
      Concrete: ConcreteK1B1KA,
      Picture: PictureK1B1KA,
      Abstract: AbstractK1B1KA,
      uraianPeta: true,
    },
  },
  emoji: { A: { emoji: "🏮" } },
};
export default paket;
