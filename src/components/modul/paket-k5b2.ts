import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab2.json";
import { PETA_PIKIRAN_K5B2A, PETA_PIKIRAN_K5B2B, PETA_PIKIRAN_K5B2C, PETA_PIKIRAN_K5B2D, PETA_PIKIRAN_K5B2E } from "./kit-k5b2";
import { VideoK5B2A } from "./video-k5b2a";
import { VideoK5B2B } from "./video-k5b2b";
import { VideoK5B2C } from "./video-k5b2c";
import { VideoK5B2D } from "./video-k5b2d";
import { VideoK5B2E } from "./video-k5b2e";
import { AbstractK5B2A, ConcreteK5B2A, InfografisK5B2AKomponen, PictureK5B2A } from "./SubBabK5B2A";
import { AbstractK5B2B, ConcreteK5B2B, InfografisK5B2BKomponen, PictureK5B2B } from "./SubBabK5B2B";
import { AbstractK5B2C, ConcreteK5B2C, InfografisK5B2CKomponen, PictureK5B2C } from "./SubBabK5B2C";
import { AbstractK5B2D, ConcreteK5B2D, InfografisK5B2DKomponen, PictureK5B2D } from "./SubBabK5B2D";
import { AbstractK5B2E, ConcreteK5B2E, InfografisK5B2EKomponen, PictureK5B2E } from "./SubBabK5B2E";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B2A, peta: PETA_PIKIRAN_K5B2A, Infografis: InfografisK5B2AKomponen, Concrete: ConcreteK5B2A, Picture: PictureK5B2A, Abstract: AbstractK5B2A, uraianPeta: true },
    B: { Cerita: VideoK5B2B, peta: PETA_PIKIRAN_K5B2B, Infografis: InfografisK5B2BKomponen, Concrete: ConcreteK5B2B, Picture: PictureK5B2B, Abstract: AbstractK5B2B, uraianPeta: true },
    C: { Cerita: VideoK5B2C, peta: PETA_PIKIRAN_K5B2C, Infografis: InfografisK5B2CKomponen, Concrete: ConcreteK5B2C, Picture: PictureK5B2C, Abstract: AbstractK5B2C, uraianPeta: true },
    D: { Cerita: VideoK5B2D, peta: PETA_PIKIRAN_K5B2D, Infografis: InfografisK5B2DKomponen, Concrete: ConcreteK5B2D, Picture: PictureK5B2D, Abstract: AbstractK5B2D, uraianPeta: true },
    E: { Cerita: VideoK5B2E, peta: PETA_PIKIRAN_K5B2E, Infografis: InfografisK5B2EKomponen, Concrete: ConcreteK5B2E, Picture: PictureK5B2E, Abstract: AbstractK5B2E, uraianPeta: true },
  },
  emoji: { A: { emoji: "👏" }, B: { emoji: "🎯" }, C: { emoji: "➗" }, D: { emoji: "🏆" }, E: { emoji: "✨" } },
};
export default paket;
