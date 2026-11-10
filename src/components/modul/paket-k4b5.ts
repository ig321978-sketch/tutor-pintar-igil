import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab5.json";
import { PETA_PIKIRAN_K4B5A, PETA_PIKIRAN_K4B5B } from "./kit-k4b5";
import { VideoK4B5A } from "./video-k4b5a";
import { VideoK4B5B } from "./video-k4b5b";
import { AbstractK4B5A, ConcreteK4B5A, InfografisK4B5AKomponen, PictureK4B5A } from "./SubBabK4B5A";
import { AbstractK4B5B, ConcreteK4B5B, InfografisK4B5BKomponen, PictureK4B5B } from "./SubBabK4B5B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B5A, peta: PETA_PIKIRAN_K4B5A, Infografis: InfografisK4B5AKomponen, Concrete: ConcreteK4B5A, Picture: PictureK4B5A, Abstract: AbstractK4B5A, uraianPeta: true },
    B: { Cerita: VideoK4B5B, peta: PETA_PIKIRAN_K4B5B, Infografis: InfografisK4B5BKomponen, Concrete: ConcreteK4B5B, Picture: PictureK4B5B, Abstract: AbstractK4B5B, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔺" }, B: { emoji: "🧩" } },
};
export default paket;
