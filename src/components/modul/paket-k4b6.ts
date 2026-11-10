import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab6.json";
import { PETA_PIKIRAN_K4B6A, PETA_PIKIRAN_K4B6B } from "./kit-k4b6";
import { VideoK4B6A } from "./video-k4b6a";
import { VideoK4B6B } from "./video-k4b6b";
import { AbstractK4B6A, ConcreteK4B6A, InfografisK4B6AKomponen, PictureK4B6A } from "./SubBabK4B6A";
import { AbstractK4B6B, ConcreteK4B6B, InfografisK4B6BKomponen, PictureK4B6B } from "./SubBabK4B6B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B6A, peta: PETA_PIKIRAN_K4B6A, Infografis: InfografisK4B6AKomponen, Concrete: ConcreteK4B6A, Picture: PictureK4B6A, Abstract: AbstractK4B6A, uraianPeta: true },
    B: { Cerita: VideoK4B6B, peta: PETA_PIKIRAN_K4B6B, Infografis: InfografisK4B6BKomponen, Concrete: ConcreteK4B6B, Picture: PictureK4B6B, Abstract: AbstractK4B6B, uraianPeta: true },
  },
  emoji: { A: { emoji: "🖼️" }, B: { emoji: "📊" } },
};
export default paket;
