import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab2.json";
import { PETA_PIKIRAN_K4B2A, PETA_PIKIRAN_K4B2B, PETA_PIKIRAN_K4B2C, PETA_PIKIRAN_K4B2D, PETA_PIKIRAN_K4B2E } from "./kit-k4b2";
import { VideoK4B2A } from "./video-k4b2a";
import { VideoK4B2B } from "./video-k4b2b";
import { VideoK4B2C } from "./video-k4b2c";
import { VideoK4B2D } from "./video-k4b2d";
import { VideoK4B2E } from "./video-k4b2e";
import { AbstractK4B2A, ConcreteK4B2A, InfografisK4B2AKomponen, PictureK4B2A } from "./SubBabK4B2A";
import { AbstractK4B2B, ConcreteK4B2B, InfografisK4B2BKomponen, PictureK4B2B } from "./SubBabK4B2B";
import { AbstractK4B2C, ConcreteK4B2C, InfografisK4B2CKomponen, PictureK4B2C } from "./SubBabK4B2C";
import { AbstractK4B2D, ConcreteK4B2D, InfografisK4B2DKomponen, PictureK4B2D } from "./SubBabK4B2D";
import { AbstractK4B2E, ConcreteK4B2E, InfografisK4B2EKomponen, PictureK4B2E } from "./SubBabK4B2E";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B2A, peta: PETA_PIKIRAN_K4B2A, Infografis: InfografisK4B2AKomponen, Concrete: ConcreteK4B2A, Picture: PictureK4B2A, Abstract: AbstractK4B2A, uraianPeta: true },
    B: { Cerita: VideoK4B2B, peta: PETA_PIKIRAN_K4B2B, Infografis: InfografisK4B2BKomponen, Concrete: ConcreteK4B2B, Picture: PictureK4B2B, Abstract: AbstractK4B2B, uraianPeta: true },
    C: { Cerita: VideoK4B2C, peta: PETA_PIKIRAN_K4B2C, Infografis: InfografisK4B2CKomponen, Concrete: ConcreteK4B2C, Picture: PictureK4B2C, Abstract: AbstractK4B2C, uraianPeta: true },
    D: { Cerita: VideoK4B2D, peta: PETA_PIKIRAN_K4B2D, Infografis: InfografisK4B2DKomponen, Concrete: ConcreteK4B2D, Picture: PictureK4B2D, Abstract: AbstractK4B2D, uraianPeta: true },
    E: { Cerita: VideoK4B2E, peta: PETA_PIKIRAN_K4B2E, Infografis: InfografisK4B2EKomponen, Concrete: ConcreteK4B2E, Picture: PictureK4B2E, Abstract: AbstractK4B2E, uraianPeta: true },
  },
  emoji: { A: { emoji: "🍕" }, B: { emoji: "📏" }, C: { emoji: "🍫" }, D: { emoji: "🍞" }, E: { emoji: "％" } },
};
export default paket;
