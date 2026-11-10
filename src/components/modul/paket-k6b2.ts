import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas6-bab2.json";
import { PETA_PIKIRAN_K6B2A, PETA_PIKIRAN_K6B2B, PETA_PIKIRAN_K6B2C } from "./kit-k6b2";
import { VideoK6B2A } from "./video-k6b2a";
import { VideoK6B2B } from "./video-k6b2b";
import { VideoK6B2C } from "./video-k6b2c";
import { AbstractK6B2A, ConcreteK6B2A, InfografisK6B2AKomponen, PictureK6B2A } from "./SubBabK6B2A";
import { AbstractK6B2B, ConcreteK6B2B, InfografisK6B2BKomponen, PictureK6B2B } from "./SubBabK6B2B";
import { AbstractK6B2C, ConcreteK6B2C, InfografisK6B2CKomponen, PictureK6B2C } from "./SubBabK6B2C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK6B2A, peta: PETA_PIKIRAN_K6B2A, Infografis: InfografisK6B2AKomponen, Concrete: ConcreteK6B2A, Picture: PictureK6B2A, Abstract: AbstractK6B2A, uraianPeta: true },
    B: { Cerita: VideoK6B2B, peta: PETA_PIKIRAN_K6B2B, Infografis: InfografisK6B2BKomponen, Concrete: ConcreteK6B2B, Picture: PictureK6B2B, Abstract: AbstractK6B2B, uraianPeta: true },
    C: { Cerita: VideoK6B2C, peta: PETA_PIKIRAN_K6B2C, Infografis: InfografisK6B2CKomponen, Concrete: ConcreteK6B2C, Picture: PictureK6B2C, Abstract: AbstractK6B2C, uraianPeta: true },
  },
  emoji: { A: { emoji: ":" }, B: { emoji: "=" }, C: { emoji: "🥧" } },
};
export default paket;
