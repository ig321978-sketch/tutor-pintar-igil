import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab1.json";
import { PETA_PIKIRAN_K5B1A, PETA_PIKIRAN_K5B1B, PETA_PIKIRAN_K5B1C, PETA_PIKIRAN_K5B1D } from "./kit-k5b1";
import { VideoK5B1A } from "./video-k5b1a";
import { VideoK5B1B } from "./video-k5b1b";
import { VideoK5B1C } from "./video-k5b1c";
import { VideoK5B1D } from "./video-k5b1d";
import { AbstractK5B1A, ConcreteK5B1A, InfografisK5B1AKomponen, PictureK5B1A } from "./SubBabK5B1A";
import { AbstractK5B1B, ConcreteK5B1B, InfografisK5B1BKomponen, PictureK5B1B } from "./SubBabK5B1B";
import { AbstractK5B1C, ConcreteK5B1C, InfografisK5B1CKomponen, PictureK5B1C } from "./SubBabK5B1C";
import { AbstractK5B1D, ConcreteK5B1D, InfografisK5B1DKomponen, PictureK5B1D } from "./SubBabK5B1D";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B1A, peta: PETA_PIKIRAN_K5B1A, Infografis: InfografisK5B1AKomponen, Concrete: ConcreteK5B1A, Picture: PictureK5B1A, Abstract: AbstractK5B1A, uraianPeta: true },
    B: { Cerita: VideoK5B1B, peta: PETA_PIKIRAN_K5B1B, Infografis: InfografisK5B1BKomponen, Concrete: ConcreteK5B1B, Picture: PictureK5B1B, Abstract: AbstractK5B1B, uraianPeta: true },
    C: { Cerita: VideoK5B1C, peta: PETA_PIKIRAN_K5B1C, Infografis: InfografisK5B1CKomponen, Concrete: ConcreteK5B1C, Picture: PictureK5B1C, Abstract: AbstractK5B1C, uraianPeta: true },
    D: { Cerita: VideoK5B1D, peta: PETA_PIKIRAN_K5B1D, Infografis: InfografisK5B1DKomponen, Concrete: ConcreteK5B1D, Picture: PictureK5B1D, Abstract: AbstractK5B1D, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "⚖️" }, C: { emoji: "🧩" }, D: { emoji: "🧮" } },
};
export default paket;
