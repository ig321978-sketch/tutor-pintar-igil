import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab2.json";
import { PETA_PIKIRAN_K4B2A, PETA_PIKIRAN_K4B2B, PETA_PIKIRAN_K4B2C } from "./kit-k4b2";
import { VideoK4B2A } from "./video-k4b2a";
import { VideoK4B2B } from "./video-k4b2b";
import { VideoK4B2C } from "./video-k4b2c";
import { AbstractK4B2A, ConcreteK4B2A, InfografisK4B2AKomponen, PictureK4B2A } from "./SubBabK4B2A";
import { AbstractK4B2B, ConcreteK4B2B, InfografisK4B2BKomponen, PictureK4B2B } from "./SubBabK4B2B";
import { AbstractK4B2C, ConcreteK4B2C, InfografisK4B2CKomponen, PictureK4B2C } from "./SubBabK4B2C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B2A, peta: PETA_PIKIRAN_K4B2A, Infografis: InfografisK4B2AKomponen, Concrete: ConcreteK4B2A, Picture: PictureK4B2A, Abstract: AbstractK4B2A, uraianPeta: true },
    B: { Cerita: VideoK4B2B, peta: PETA_PIKIRAN_K4B2B, Infografis: InfografisK4B2BKomponen, Concrete: ConcreteK4B2B, Picture: PictureK4B2B, Abstract: AbstractK4B2B, uraianPeta: true },
    C: { Cerita: VideoK4B2C, peta: PETA_PIKIRAN_K4B2C, Infografis: InfografisK4B2CKomponen, Concrete: ConcreteK4B2C, Picture: PictureK4B2C, Abstract: AbstractK4B2C, uraianPeta: true },
  },
  emoji: { A: { emoji: "🍕" }, B: { emoji: "📏" }, C: { emoji: "🍫" } },
};
export default paket;
