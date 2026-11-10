import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab4.json";
import { PETA_PIKIRAN_K4B4A, PETA_PIKIRAN_K4B4B } from "./kit-k4b4";
import { VideoK4B4A } from "./video-k4b4a";
import { VideoK4B4B } from "./video-k4b4b";
import { AbstractK4B4A, ConcreteK4B4A, InfografisK4B4AKomponen, PictureK4B4A } from "./SubBabK4B4A";
import { AbstractK4B4B, ConcreteK4B4B, InfografisK4B4BKomponen, PictureK4B4B } from "./SubBabK4B4B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B4A, peta: PETA_PIKIRAN_K4B4A, Infografis: InfografisK4B4AKomponen, Concrete: ConcreteK4B4A, Picture: PictureK4B4A, Abstract: AbstractK4B4A, uraianPeta: true },
    B: { Cerita: VideoK4B4B, peta: PETA_PIKIRAN_K4B4B, Infografis: InfografisK4B4BKomponen, Concrete: ConcreteK4B4B, Picture: PictureK4B4B, Abstract: AbstractK4B4B, uraianPeta: true },
  },
  emoji: { A: { emoji: "🟧" }, B: { emoji: "🧴" } },
};
export default paket;
