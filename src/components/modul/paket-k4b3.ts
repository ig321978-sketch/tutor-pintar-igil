import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab3.json";
import { PETA_PIKIRAN_K4B3A, PETA_PIKIRAN_K4B3B } from "./kit-k4b3";
import { VideoK4B3A } from "./video-k4b3a";
import { VideoK4B3B } from "./video-k4b3b";
import { AbstractK4B3A, ConcreteK4B3A, InfografisK4B3AKomponen, PictureK4B3A } from "./SubBabK4B3A";
import { AbstractK4B3B, ConcreteK4B3B, InfografisK4B3BKomponen, PictureK4B3B } from "./SubBabK4B3B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B3A, peta: PETA_PIKIRAN_K4B3A, Infografis: InfografisK4B3AKomponen, Concrete: ConcreteK4B3A, Picture: PictureK4B3A, Abstract: AbstractK4B3A, uraianPeta: true },
    B: { Cerita: VideoK4B3B, peta: PETA_PIKIRAN_K4B3B, Infografis: InfografisK4B3BKomponen, Concrete: ConcreteK4B3B, Picture: PictureK4B3B, Abstract: AbstractK4B3B, uraianPeta: true },
  },
  emoji: { A: { emoji: "🟠" }, B: { emoji: "🔢" } },
};
export default paket;
