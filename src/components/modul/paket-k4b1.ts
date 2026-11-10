import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab1.json";
import { PETA_PIKIRAN_K4B1A, PETA_PIKIRAN_K4B1B, PETA_PIKIRAN_K4B1C } from "./kit-k4b1";
import { VideoK4B1A } from "./video-k4b1a";
import { VideoK4B1B } from "./video-k4b1b";
import { VideoK4B1C } from "./video-k4b1c";
import { AbstractK4B1A, ConcreteK4B1A, InfografisK4B1AKomponen, PictureK4B1A } from "./SubBabK4B1A";
import { AbstractK4B1B, ConcreteK4B1B, InfografisK4B1BKomponen, PictureK4B1B } from "./SubBabK4B1B";
import { AbstractK4B1C, ConcreteK4B1C, InfografisK4B1CKomponen, PictureK4B1C } from "./SubBabK4B1C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B1A, peta: PETA_PIKIRAN_K4B1A, Infografis: InfografisK4B1AKomponen, Concrete: ConcreteK4B1A, Picture: PictureK4B1A, Abstract: AbstractK4B1A, uraianPeta: true },
    B: { Cerita: VideoK4B1B, peta: PETA_PIKIRAN_K4B1B, Infografis: InfografisK4B1BKomponen, Concrete: ConcreteK4B1B, Picture: PictureK4B1B, Abstract: AbstractK4B1B, uraianPeta: true },
    C: { Cerita: VideoK4B1C, peta: PETA_PIKIRAN_K4B1C, Infografis: InfografisK4B1CKomponen, Concrete: ConcreteK4B1C, Picture: PictureK4B1C, Abstract: AbstractK4B1C, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "📍" }, C: { emoji: "⚖️" } },
};
export default paket;
