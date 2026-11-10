import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas6-bab1.json";
import { PETA_PIKIRAN_K6B1A, PETA_PIKIRAN_K6B1B, PETA_PIKIRAN_K6B1C } from "./kit-k6b1";
import { VideoK6B1A } from "./video-k6b1a";
import { VideoK6B1B } from "./video-k6b1b";
import { VideoK6B1C } from "./video-k6b1c";
import { AbstractK6B1A, ConcreteK6B1A, InfografisK6B1AKomponen, PictureK6B1A } from "./SubBabK6B1A";
import { AbstractK6B1B, ConcreteK6B1B, InfografisK6B1BKomponen, PictureK6B1B } from "./SubBabK6B1B";
import { AbstractK6B1C, ConcreteK6B1C, InfografisK6B1CKomponen, PictureK6B1C } from "./SubBabK6B1C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK6B1A, peta: PETA_PIKIRAN_K6B1A, Infografis: InfografisK6B1AKomponen, Concrete: ConcreteK6B1A, Picture: PictureK6B1A, Abstract: AbstractK6B1A, uraianPeta: true },
    B: { Cerita: VideoK6B1B, peta: PETA_PIKIRAN_K6B1B, Infografis: InfografisK6B1BKomponen, Concrete: ConcreteK6B1B, Picture: PictureK6B1B, Abstract: AbstractK6B1B, uraianPeta: true },
    C: { Cerita: VideoK6B1C, peta: PETA_PIKIRAN_K6B1C, Infografis: InfografisK6B1CKomponen, Concrete: ConcreteK6B1C, Picture: PictureK6B1C, Abstract: AbstractK6B1C, uraianPeta: true },
  },
  emoji: { A: { emoji: "×" }, B: { emoji: ":" }, C: { emoji: "0," } },
};
export default paket;
