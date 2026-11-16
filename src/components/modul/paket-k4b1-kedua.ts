import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab1-kedua.json";
import { SUB_KA41 } from "./naskah-k4b1-kedua";
import { VideoK4B1KA } from "./video-k4b1ka";
import { AbstractK4B1KA, ConcreteK4B1KA, InfografisK4B1KAKomponen, PictureK4B1KA } from "./SubBabK4B1KA";

/** Modul Kedua Kelas 4 Bab 1 (naskah orisinal IGIL), hanya Sub-Bab A. Modul Kesatu ada di paket-k4b1.ts dan tidak diubah. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B1KA, peta: SUB_KA41.mindMaps, Infografis: InfografisK4B1KAKomponen, Concrete: ConcreteK4B1KA, Picture: PictureK4B1KA, Abstract: AbstractK4B1KA, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" } },
};
export default paket;
