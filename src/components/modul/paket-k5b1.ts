import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab1.json";
import { PETA_PIKIRAN_K5B1A, PETA_PIKIRAN_K5B1B } from "./kit-k5b1";
import { VideoK5B1A } from "./video-k5b1a";
import { VideoK5B1B } from "./video-k5b1b";
import { AbstractK5B1A, ConcreteK5B1A, InfografisK5B1AKomponen, PictureK5B1A } from "./SubBabK5B1A";
import { AbstractK5B1B, ConcreteK5B1B, InfografisK5B1BKomponen, PictureK5B1B } from "./SubBabK5B1B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B1A, peta: PETA_PIKIRAN_K5B1A, Infografis: InfografisK5B1AKomponen, Concrete: ConcreteK5B1A, Picture: PictureK5B1A, Abstract: AbstractK5B1A, uraianPeta: true },
    B: { Cerita: VideoK5B1B, peta: PETA_PIKIRAN_K5B1B, Infografis: InfografisK5B1BKomponen, Concrete: ConcreteK5B1B, Picture: PictureK5B1B, Abstract: AbstractK5B1B, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "⚖️" } },
};
export default paket;
